/** Local application-path audio lab. Never connects to the production database. */
import { readFile, writeFile, mkdir, copyFile, stat, open } from 'node:fs/promises'
import { resolve, join } from 'node:path'
import { execFileSync } from 'node:child_process'
import { parse } from 'dotenv'
import { buildApp } from '../../apps/server/src/app'
import { createDb } from '../../apps/server/src/lib/db'
import { tokenSecretFrom } from '../../apps/server/src/modules/family/service'
import { seedDemoFamily } from '../../apps/server/src/demo/seed'
import { createDemoGateway } from '../../apps/server/src/demo/mock-gateway'
import { seedAllPacks, seedPack } from '../../apps/server/src/content/seed'
import { ALL_PACKS } from '../../apps/server/src/content/packs'
import { chapterSpeakText, speakVoiceId } from '../../apps/server/src/modules/tts/chapterText'
import { chunkText, type TtsClientDeps } from '../../apps/server/src/modules/tts/client'
import { cacheKey } from '../../apps/server/src/modules/tts/cache'
import { DEFAULT_SPEED } from '../../apps/server/src/modules/tts/voices'
import { TTS_PUBLIC_NS, type PublicSegmentInfo } from '../../apps/server/src/modules/tts/publicCache'
import { IpRateLimiter } from '../../apps/server/src/lib/ipRateLimit'

const root = resolve(import.meta.dirname, '../..')
const run = process.env.TAO_PERF_RUN ?? ''
if (!/^[a-z0-9-]{1,50}$/.test(run)) throw Error('TAO_PERF_RUN_REQUIRED')
const port = Number(process.env.PORT ?? 16243)
if (![16243, 16244].includes(port)) throw Error('ISOLATED_AUDIO_PORT_REQUIRED')
const live = process.env.TAO_PERF_LIVE_TTS === '1'
// Read only the explicitly selected provider configuration; do not inherit its
// DB, token secret, family records, or any other runtime settings.
const provider = process.env.TAO_PERF_PROVIDER_ENV ? parse(await readFile(resolve(process.env.TAO_PERF_PROVIDER_ENV), 'utf8')) : {}
if (live && (!provider.TTS_BASE || !provider.TTS_API_KEY)) throw Error('LIVE_PROVIDER_NOT_CONFIGURED')
const model = provider.TTS_MODEL ?? 'stepaudio-3-gen-preview'
process.env.TTS_MODEL = model
delete process.env.TAO_TTS_PUBLIC_BASE
delete process.env.TAO_MEDIA_PUBLIC_BASE
const useCdn = process.env.TAO_PERF_AUDIO_CDN === '1'
if (useCdn) {
  const base = provider.TAO_TTS_PUBLIC_BASE || provider.TAO_MEDIA_PUBLIC_BASE
  if (!base || !/^https:\/\//.test(base)) throw Error('PUBLIC_AUDIO_CDN_REQUIRED')
  process.env.TAO_TTS_PUBLIC_BASE = base
}
const media = join(root, 'output/playwright/r24-20261014', run, 'media')
await mkdir(join(media, 'tts-public'), { recursive: true })
const source = process.env.TAO_PERF_MEDIA_SOURCE
if (!source) throw Error('PUBLIC_MEDIA_SOURCE_REQUIRED')
const manifest = JSON.parse(await readFile(join(resolve(source), '.tts-public-state.json'), 'utf8')) as Record<string, PublicSegmentInfo>
const poem = ALL_PACKS.find(p => p.id === 'poetry-song-spring')!
const subset: Record<string, PublicSegmentInfo> = {}
for (const text of chunkText(chapterSpeakText(poem.chapters[0]!.blocks))) {
  const key = cacheKey(text, speakVoiceId('zh'), DEFAULT_SPEED, 'mp3', 'zh', TTS_PUBLIC_NS, model)
  const entry = manifest[key]
  if (!entry) throw Error('PUBLIC_NARRATION_NOT_FOUND')
  const from = join(resolve(source), 'tts-public', `${key}.mp3`)
  if ((await stat(from)).size !== entry.bytes) throw Error('PUBLIC_NARRATION_SIZE_MISMATCH')
  await copyFile(from, join(media, 'tts-public', `${key}.mp3`))
  subset[key] = { ...entry, uploaded: useCdn }
}
await writeFile(join(media, '.tts-public-state.json'), JSON.stringify(subset))

const database = `file:./e2e-run-r24-audio-${run}.db`
await (await open(join(root, 'apps/server/prisma', database.slice('file:./'.length)), 'a')).close()
try {
  execFileSync(process.execPath, [join(root, 'node_modules/prisma/build/index.js'), 'migrate', 'deploy'], {
    cwd: join(root, 'apps/server'), env: { ...process.env, TAO_DATABASE_URL: database }, stdio: 'pipe', windowsHide: true,
  })
} catch { throw Error('ISOLATED_AUDIO_MIGRATION_FAILED') }
const db = createDb(database)
const masterKey = 'r24-local-audio-lab-key-0001'
await seedDemoFamily(db, masterKey)
await seedAllPacks(db, ALL_PACKS)
await seedPack(db, {
  id: 'r24-audio-original', title: '首音频验收原创短句', lang: 'zh', category: 'story', ageStage: '3-5', coverArt: 'test', source: 'Synthetic performance fixture',
  rights: { workTitle: '首音频验收原创短句', basis: 'original', jurisdiction: 'CN' },
  chapters: ['小兔翻开书，朋友正在桥边等她。', '小熊坐在窗边，轻轻读完一段故事。', '小鸟收起翅膀，听朋友讲今天的发现。'.repeat(8)].map((text, i) => ({ title: `验收段落${i + 1}`, blocks: [{ kind: 'text', text }] })),
})
// This dedicated fixture DB has no production review workflow or user records.
await db.book.updateMany({ data: { publicationStatus: 'published' } })
const calls: Array<{ status: number; durationMs: number }> = []
const ttsDeps: TtsClientDeps | null = live ? {
  base: provider.TTS_BASE!, apiKey: provider.TTS_API_KEY!, model,
  fetch: async (input, init) => {
    if (calls.length >= 3) throw Error('LIVE_AUDIO_LAB_LIMIT_REACHED')
    const metric = { status: 0, durationMs: 0 }
    calls.push(metric)
    const start = performance.now()
    try { const response = await fetch(input, init); metric.status = response.status; return response }
    finally { metric.durationMs = Math.round(performance.now() - start) }
  },
} : null
const app = await buildApp({ db, tokenSecret: tokenSecretFrom(masterKey), masterKey, probeKey: async () => 'active', wereadCall: () => createDemoGateway(), bedTimeMin: null,
  mediaDir: media, staticDir: join(root, 'apps/web/dist'), logger: false, ttsDeps, imageDeps: null, videoDeps: null,
  ipLimiter: new IpRateLimiter({ capacity: 1000, refillPerMinute: 10000 }),
})
app.get('/__r24/metrics', async () => ({ mode: live ? 'live-provider' : 'cached-only', useCdn, calls }))
await app.listen({ port, host: '127.0.0.1' })
console.log(JSON.stringify({ ready: true, port, mode: live ? 'live-provider' : 'cached-only', useCdn, publicSegments: Object.keys(subset).length, productionDatabaseUsed: false }))
let closing = false
const stop = async () => { if (closing) return; closing = true; await app.close(); await db.$disconnect(); process.exit(0) }
process.on('SIGINT', () => { void stop() })
process.on('SIGTERM', () => { void stop() })
