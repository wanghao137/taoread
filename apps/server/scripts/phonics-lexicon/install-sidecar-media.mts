/**
 * 安装旁挂媒体到 media 目录：{mediaRoot}/phonics/taoread-phonics-gb-v1/。
 *  - 美音整词 89 个 WAV（output/phonics-sync-20261028/us-audio，台账逐文件校验 sha256）
 *  - 例句朗读 72 个 MP3（词光仓库 public/atlas/audio/ex，CC BY 4.0）
 * 幂等：目标已存在且哈希一致则跳过。不写 Git；dev/e2e/生产各自执行一次。
 * 用法：npx tsx apps/server/scripts/phonics-lexicon/install-sidecar-media.mts --media-root <dir>
 */
import { createHash } from 'node:crypto'
import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { candidateDirectory } from '../../src/modules/phonics/v2/courseRegistry.js'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..')
const arg = (name: string) => process.argv.includes(name) ? process.argv[process.argv.indexOf(name) + 1]! : undefined
const mediaRoot = arg('--media-root') ?? process.env.TAO_MEDIA_DIR
if (!mediaRoot) throw new Error('需要 --media-root 或 TAO_MEDIA_DIR')
const root = path.resolve(path.join(mediaRoot.replace(/[\\/]+$/, ''), 'phonics', candidateDirectory.replace(/[\\/]+$/, '').split(/[\\/]/).pop()!))
mkdirSync(root, { recursive: true })

const sha256 = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex')
const copyVerified = (source: string, hash: string, extension: string) => {
  const bytes = readFileSync(source)
  if (sha256(bytes) !== hash) throw new Error(`哈希不符: ${source}`)
  const target = path.join(root, `${hash}.${extension}`)
  if (existsSync(target)) return 'skip'
  copyFileSync(source, target)
  return 'copy'
}

const usDir = path.join(repoRoot, 'output', 'phonics-sync-20261028', 'us-audio')
const atlasDir = process.argv.includes('--atlas') ? process.argv[process.argv.indexOf('--atlas') + 1]! : path.join(repoRoot, 'output', 'word-atlas-src')
let copied = 0, skipped = 0

const us = JSON.parse(readFileSync(path.join(usDir, 'word-audio-candidates.json'), 'utf8'))
for (const item of Object.values(us.assets as Record<string, { sha256: string }>)) {
  if (copyVerified(path.join(usDir, `${item.sha256}.wav`), item.sha256, 'wav') === 'copy') copied++
  else skipped++
}

const lexicon = JSON.parse(readFileSync(path.join(candidateDirectory.replace(/[\\/]+$/, ''), 'lexicon.json'), 'utf8'))
const edgeDir = path.join(repoRoot, 'apps', 'output', 'phonics-edge-20261028', 'phonics', candidateDirectory.replace(/[\\/]+$/, '').split(/[\\/]/).pop()!)
for (const entry of lexicon.entries as Array<{ word: string; example: { audio: { sha256: string } | null }; wordAudio?: { uk?: { sha256: string } | null; us?: { sha256: string } | null } }>) {
  if (entry.example.audio) {
    const source = path.join(atlasDir, 'public', 'atlas', 'audio', 'ex', `${entry.word.toLowerCase()}.mp3`)
    if (copyVerified(source, entry.example.audio.sha256, 'mp3') === 'copy') copied++
    else skipped++
  }
  for (const accent of ['uk', 'us'] as const) {
    const audio = entry.wordAudio?.[accent]
    if (!audio) continue
    // 词光来源走词光目录；Edge 来源文件名即 sha，直接从 Edge 输出目录取
    const candidates = [
      path.join(atlasDir, 'public', 'atlas', 'audio', accent, `${entry.word.toLowerCase()}.mp3`),
      path.join(edgeDir, `${audio.sha256}.mp3`),
    ]
    const source = candidates.find(p => existsSync(p))
    if (!source) throw new Error(`音频源不存在: ${entry.word} ${accent}`)
    if (copyVerified(source, audio.sha256, 'mp3') === 'copy') copied++
    else skipped++
  }
}
console.log(JSON.stringify({ root, copied, skipped, total: copied + skipped }))
