/** Install all bound course + sidecar media for one phonics course version into the media root.
 * 内容寻址：<sha256>.<ext>。来源目录按序查找；目标已存在且哈希一致则跳过。
 * 用法（apps/server）：npx tsx scripts/install-phonics-course-media.mts
 *   --course-dir <课程目录> --media-root <媒体根目录> --sources <目录1,目录2,...>
 */
import { existsSync, mkdirSync, readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import path from 'node:path'
import { parseArgs } from 'node:util'
import { loadCourse, courseHash } from '../src/modules/phonics/v2/courseRegistry'
import { loadSidecars } from '../src/modules/phonics/v2/sidecars'
import { copyVerifiedMedia } from './lib/installPhonicsMedia'

const { values } = parseArgs({
  options: {
    'course-dir': { type: 'string' },
    'media-root': { type: 'string' },
    sources: { type: 'string' },
  },
})
if (!values['course-dir'] || !values['media-root'] || !values.sources) throw new Error('--course-dir, --media-root and --sources are required')
const courseDir = path.resolve(values['course-dir'])
const course = await loadCourse(courseDir)
const versionId = course.manifest.versionId
const root = path.join(path.resolve(values['media-root']), 'phonics', versionId)
mkdirSync(root, { recursive: true })
const sources = values.sources.split(',').map(item => path.resolve(item.trim()))

let copied = 0, skipped = 0, failed = 0
const failures: string[] = []
const installOne = (hash: string, extension: string) => {
  const target = path.join(root, hash + '.' + extension)
  if (existsSync(target)) {
    const bytes = readFileSync(target)
    if (createHash('sha256').update(bytes).digest('hex') === hash) { skipped++; return }
  }
  for (const source of sources) {
    const candidate = path.join(source, hash + '.' + extension)
    if (!existsSync(candidate)) continue
    copyVerifiedMedia(candidate, target, hash)
    copied++
    return
  }
  failed++
  failures.push(hash + '.' + extension)
}

// 课程资产（音频+图片）
for (const asset of course.assets) {
  if (!asset.sha256) continue
  installOne(asset.sha256, asset.extension)
}

// 旁挂清单媒体（词典例句/整词英美录音/美音包）
const sidecars = await loadSidecars(courseDir, versionId, courseHash(course))
for (const entry of sidecars.lexicon?.entries ?? []) {
  if (entry.example.audio) installOne(entry.example.audio.sha256, entry.example.audio.extension ?? 'mp3')
  for (const accent of ['uk', 'us'] as const) {
    const wordAudio = entry.wordAudio?.[accent]
    if (wordAudio) installOne(wordAudio.sha256, wordAudio.extension ?? 'mp3')
  }
}
for (const asset of sidecars.usAudio?.assets ?? []) installOne(asset.sha256, 'wav')

console.log(JSON.stringify({ versionId, copied, skipped, failed, failures: failures.slice(0, 10) }))

