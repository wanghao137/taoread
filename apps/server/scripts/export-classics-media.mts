/** Export only the current nine books' referenced files. Never copy experiments,
 * superseded narration keys, private media, or unrelated catalogue assets. */
import { readFile, writeFile, mkdir, copyFile, stat, utimes } from 'node:fs/promises'
import { resolve, join, dirname, relative, isAbsolute } from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { createHash } from 'node:crypto'
import dotenv from 'dotenv'
import { loadConfig } from '../src/config'
import { chunkText } from '../src/modules/tts/client'
import { chapterSpeakText, speakVoiceId } from '../src/modules/tts/chapterText'
import { cacheKey } from '../src/modules/tts/cache'
import { DEFAULT_SPEED } from '../src/modules/tts/voices'
import type { PackBook } from '../src/content/types'

dotenv.config({ quiet: true })
const arg = (name: string) => process.argv.find(a => a.startsWith(`--${name}=`))?.slice(name.length + 3)
const out = resolve(arg('out') || '../../output/classics-20261010')
const target = resolve(arg('target') || join(out, 'release-media'))
const child = relative(out, target)
if (!child || child.startsWith('..') || isAbsolute(child) || target === join(out, 'media')) throw Error('Export must be a separate child of this task output directory')
const here = dirname(fileURLToPath(import.meta.url))
const check = spawnSync(process.execPath, ['--import', 'tsx', join(here, 'verify-classics-draft.mts'), out], { cwd: resolve(here, '..'), encoding: 'utf8', timeout: 300_000 })
if (check.error || check.status !== 0) throw Error('Media export rejected; all nine books and current media must pass first')
const { chineseClassics: packs } = await import(pathToFileURL(join(here, '../src/content/packs/chinese-classics.ts')).href) as { chineseClassics: PackBook[] }
const snapshot = JSON.parse(await readFile(join(out, 'prepared-chapters.json'), 'utf8')) as { books: Array<{ id: string; chapters: PackBook['chapters'] }> }
const expected = ['andersen', 'grimm', 'aesop', 'willows', 'oz', 'alice', 'garden', 'nils', 'prince'].map(s => `zh-classic-${s}`)
if (packs.length !== 9 || new Set(packs.map(p => p.id)).size !== 9 || packs.some(p => !expected.includes(p.id) || JSON.stringify(p.chapters) !== JSON.stringify(snapshot.books.find(b => b.id === p.id)?.chapters))) throw Error('Export pack scope or snapshot mismatch')
const source = join(out, 'media')
const arts = JSON.parse(await readFile(join(source, '.classics-art.json'), 'utf8')) as Record<string, { urlPath: string }>
const audio = JSON.parse(await readFile(join(source, '.tts-public-state.json'), 'utf8')) as Record<string, { durationMs: number; bytes: number; uploaded: boolean }>
const selectedArt: typeof arts = {}, selectedAudio: typeof audio = {}
const files = new Set<string>()
for (const scene of new Set(packs.flatMap(p => [p.coverArt, ...p.chapters.map(c => c.art!)]))) {
  const asset = arts[scene]
  if (!asset?.urlPath.startsWith('/api/media/art/') || asset.urlPath.includes('..') || !asset.urlPath.endsWith('.webp')) throw Error('Invalid export illustration')
  selectedArt[scene] = asset
  const rel = asset.urlPath.slice('/api/media/'.length)
  files.add(rel)
  for (const suffix of ['thumb', 'reader']) files.add(rel.replace(/\.webp$/, `.${suffix}.webp`))
}
const config = loadConfig()
for (const book of packs) for (const chapter of book.chapters) for (const text of chunkText(chapterSpeakText(chapter.blocks))) {
  const key = cacheKey(text, speakVoiceId('zh'), DEFAULT_SPEED, 'mp3', 'zh', '__public__', config.TTS_MODEL)
  if (!audio[key]) throw Error('Missing export narration record')
  selectedAudio[key] = audio[key]!
  files.add(`tts-public/${key}.mp3`)
}
// Refuse overwriting an existing export, so a failed/revised release cannot
// retain orphan files or overwrite the upload evidence from a previous run.
await mkdir(target)
const hashes: Array<{ path: string; bytes: number; sha256: string }> = []
for (const rel of files) {
  const src = join(source, rel), dest = join(target, rel)
  await mkdir(dirname(dest), { recursive: true })
  await copyFile(src, dest)
  const info = await stat(src), buffer = await readFile(dest)
  if (buffer.length !== info.size || !buffer.equals(await readFile(src))) throw Error('Export changed bytes')
  // Remote/local validation compares variant freshness to its original.
  await utimes(dest, info.atime, info.mtime)
  hashes.push({ path: rel, bytes: buffer.length, sha256: createHash('sha256').update(buffer).digest('hex') })
}
await writeFile(join(target, '.classics-art.json'), JSON.stringify(selectedArt, null, 2) + '\n')
await writeFile(join(target, '.tts-public-state.json'), JSON.stringify(selectedAudio, null, 2) + '\n')
const { packContentVersion } = await import('../src/content/seed')
await writeFile(join(out, 'release-media-manifest.json'), JSON.stringify({ media: target, books: expected, contentVersions: packs.map(p => ({ id: p.id, contentVersion: packContentVersion(p) })), ttsModel: config.TTS_MODEL, illustrations: Object.keys(selectedArt).length, audioSegments: Object.keys(selectedAudio).length, files: hashes }, null, 2) + '\n')
console.log(JSON.stringify({ media: target, illustrations: Object.keys(selectedArt).length, audioSegments: Object.keys(selectedAudio).length, files: files.size }))
