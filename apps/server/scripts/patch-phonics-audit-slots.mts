/**
 * 词光对齐审计补丁（docs/91 审计轮）：Sam 专属词义图槽 + 三本小书 9 页配图槽。
 * 词光原则「画面讲的就是例句里的事」——caption 小书页此前无图，属功能缺口。
 * 一次性执行；幂等（已存在的槽跳过）。绑定由 gen-phonics-art-image.mts 完成。
 */
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { candidateDirectory, courseHash, loadCourse } from '../src/modules/phonics/v2/courseRegistry'

const dir = candidateDirectory
const readJson = async (name: string) => JSON.parse(await readFile(path.join(dir, `${name}.json`), 'utf8'))
const writeJson = async (name: string, data: unknown) => writeFile(path.join(dir, `${name}.json`), JSON.stringify(data, null, 2) + '\n', 'utf8')

const assets = await readJson('assets') as Array<Record<string, unknown>>
const tasks = await readJson('tasks') as Array<Record<string, unknown>>
const readers = await readJson('readers') as Array<{ id: string; pages: Array<{ text: string; wordIds: string[]; audioAssetId: string; imageAssetId?: string }> }>

const slot = (id: string) => ({ id, purpose: 'image', accent: 'GB', sha256: null, extension: 'webp', durationMs: null, speakerId: null, revision: 1, sourceLicense: null, reviewStatus: 'pending', fixture: false })
let added = 0
const ensure = (id: string) => {
  if (!assets.some(a => a.id === id)) { assets.push(slot(id)); added++ }
}

// Sam 专属词义图 + capital-S 任务挂图
ensure('w-sam-meaning-image')
const capitalS = tasks.find(t => t.id === 'L07-capital-S')
if (capitalS && !capitalS.imageAssetId) capitalS.imageAssetId = 'w-sam-meaning-image'

// 三本小书每页配图槽
for (const reader of readers) {
  if (!['r-l24', 'r-l37', 'r-l41'].includes(reader.id)) continue
  reader.pages.forEach((page, i) => { if (!page.imageAssetId) { page.imageAssetId = `${reader.id}-image-${i + 1}`; ensure(page.imageAssetId) } })
}

await writeJson('assets', assets)
await writeJson('tasks', tasks)
await writeJson('readers', readers)

// manifest.assetIds 重排 + rehash（MANIFEST_INDEX 要求与 assets 精确一致）
const course = await loadCourse(dir)
const manifestPath = path.join(dir, 'manifest.json')
const manifest = JSON.parse(await readFile(manifestPath, 'utf8')) as Record<string, unknown>
manifest.assetIds = course.assets.map(a => a.id)
const reloaded = await loadCourse(dir)
manifest.contentHash = courseHash(reloaded)
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8')
console.log(JSON.stringify({ addedSlots: added, assets: assets.length, contentHash: manifest.contentHash }))
