/** Read-only source acquisition. Produces draft files; never seeds, publishes, generates or uploads media. */
import { mkdir, readFile, writeFile, stat } from 'node:fs/promises'
import { resolve, join } from 'node:path'
import { ALL_PACKS } from '../src/content/packs/index'
import { pinyin } from 'pinyin-pro'
import { searchPoetry, normalizedPoem, poemHash } from './lib/poetry-source.mjs'
const outputArg = process.argv.find(a => a.startsWith('--output='))?.slice(9)
if (!outputArg) throw Error('Explicit --output directory required')
const output = resolve(outputArg)
await mkdir(join(output, 'raw'), { recursive: true })
const existing = ALL_PACKS.filter(p => p.lang === 'zh' && p.category === 'poetry').flatMap(p => p.chapters.map(c => ({ bookId: p.id, title: c.title.split(' · ')[0], text: c.blocks.filter(b => b.kind === 'poem').map(b => b.text).join('\n') })))
const seen = new Set(existing.map(e => poemHash(normalizedPoem(e.text))))
const existingTitles = new Set(existing.map(e => e.title))
const queries = ['春日偶成', '春日杂兴', '雨后池上', '春游湖', '山中杂诗', '初夏即事', '夏日山中', '秋日偶成', '冬日闲居', '春游曲', '咏白莲', '冬夜即事', '题画竹', '题墨梅', '题兰花', '春日山居', '初夏睡起', '题菊花', '春日田园', '夏日田园', '秋日田园', '山居即事', '春日即事', '夏日即事', '秋日即事']
const selected: Array<Record<string, unknown>> = [], conflicts: Array<Record<string, unknown>> = []
for (const query of queries) {
  const rawPath = join(output, 'raw', encodeURIComponent(query) + '.json')
  let response
  try {
    const raw = await readFile(rawPath, 'utf8')
    response = await searchPoetry(query, { fetcher: async () => new Response(raw, { headers: { 'content-type': 'application/json' } }) })
    // Replay preserves content; actual acquisition time remains the filesystem snapshot time.
    response.fetchedAt = (await stat(rawPath)).mtime.toISOString()
  } catch (error) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error; response = await searchPoetry(query) }
  await writeFile(join(output, 'raw', encodeURIComponent(query) + '.json'), response.raw)
  for (const p of response.candidates) {
    const count = [...p.text.matchAll(/\p{Script=Han}/gu)].length
    if (!p.title.includes(query) || count < 20 || count > 40 || /酒|醉|杀|征|戍|妓|病|死|愁|恨|匈奴|汉|君王|国家|郡县|荒芜|哭|泪|寇|军|战|兵|老|仕|官|刲|刺豕|流民|醅|樽|觞|斟/.test(p.text) || !/山|水|雨|晴|花|草|树|林|云|风|鸟|燕|桃|柳|竹|春|夏|秋|冬/.test(p.text) || seen.has(p.normalizedSha256)) continue
    if (existingTitles.has(p.title)) { conflicts.push({ ...p, reason: 'Existing title with a different edition or author; never overwrite' }); continue }
    seen.add(p.normalizedSha256)
    selected.push({ ...p, source: { url: response.url, rawSha256: response.rawSha256, fetchedAt: response.fetchedAt, apiRepository: 'palemoky/chinese-poetry-api', apiSourceCommit: '6de8d1d95ad954d14bc6793b1a9c55d4bb8cd01a', dataCommitForLicenseEvidence: '4978df39f7fe687b9901125e64b3cc42fc340734', liveDataCommitVerified: false },
      publicationStatus: 'draft', publishable: false, proposedAgeStage: '6-8', humanReviewClaimed: false,
      draftChapter: { title: `${p.title} · ${p.author}`, blocks: [{ kind: 'poem', text: p.text, pinyin: pinyin(p.text), translation: null }] },
      pending: ['Independent edition and author/dynasty verification', 'Child age and topic review', 'Polyphone and rare-character pinyin proof', 'Original translation and review', 'Rights and source approval'] })
    if (selected.length === 20) break
  }
  console.log(JSON.stringify({ query, candidates: response.candidates.length, selected: selected.length }))
  if (selected.length === 20) break
}
await writeFile(join(output, 'draft-batch.json'), JSON.stringify({ preparedAt: new Date().toISOString(), publicationStatus: 'draft', publishable: false, productionModified: false, mediaGenerated: false, selected, conflicts }, null, 2))
if (selected.length !== 20) throw Error(`Only ${selected.length} distinct candidates acquired; do not claim a complete batch`)
