/** 补全进度状态：对照 spec 检查每本书 pack 章数与 parts 完整性。 */
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), 'completion')
const PACKS = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'content', 'packs')
const rows = readFileSync(join(ROOT, 'spec.tsv'), 'utf8').trim().split('\n').slice(1).map(l => l.split('\t'))

let done = 0, ready = 0, pending = 0
const readyIds: string[] = [], pendingIds: string[] = []
for (const cols of rows) {
  const [id = '', packFile = '', , targetS = '0'] = cols
  const target = Number(targetS)
  const partsDir = join(ROOT, id, 'parts')
  const hasParts = existsSync(partsDir) && readdirSync(partsDir).some(f => f.endsWith('.json'))
  const mod = await import(pathToFileURL(join(PACKS, packFile)).href)
  const pack = Object.values(mod).find(v => typeof v === 'object' && v !== null && (v as { id?: string }).id === id) as { chapters: unknown[] } | undefined
  const chapters = pack?.chapters.length ?? 0
  if (chapters >= target) { done++; console.log(`✓ done    ${id} ${chapters}/${target}`) }
  else if (hasParts) { ready++; readyIds.push(id); console.log(`● parts   ${id} ${chapters}/${target}（待组装）`) }
  else { pending++; pendingIds.push(id); console.log(`· pending ${id} ${chapters}/${target}`) }
}
console.log(`\n完成 ${done} / parts就绪 ${ready} / 待生成 ${pending}（共 ${rows.length}）`)
if (process.argv.includes('--ids')) console.log(`READY=${readyIds.join(',')} PENDING=${pendingIds.join(',')}`)
