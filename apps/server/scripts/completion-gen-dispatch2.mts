/**
 * 书级派发生成器：每本书一个任务（代理内分多次 Write 产出全部 part 文件）。
 * 用法：npx tsx scripts/completion-gen-dispatch2.mts
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), 'completion')
const rows = readFileSync(join(ROOT, 'spec.tsv'), 'utf8').trim().split('\n').slice(1).map(l => l.split('\t'))

const tasks: Array<{ bookId: string; parts: string[]; prompt: string }> = []
for (const cols of rows) {
  const [id = '', , mode = 'B'] = cols
  const meta = JSON.parse(readFileSync(join(ROOT, id, 'meta.json'), 'utf8')) as { cur: number; target: number; parts: string[]; structure?: string }
  // 任务书从 dispatch.json（part 级）提取本书的规范文本，重组为书级
  const dispatch: Array<{ bookId: string; prompt: string }> = JSON.parse(readFileSync(join(ROOT, 'dispatch.json'), 'utf8'))
  const first = dispatch.find(d => d.bookId === id)!.prompt
  // 书级任务书：基于 first 的文本改写输出说明
  const outFiles = meta.parts.map(r => `part-${(r.split('-')[0] ?? '').padStart(2, '0')}.json（第 ${r.split('-')[0] ?? ''} 到 ${r.split('-')[1] ?? ''} 章）`).join('、')
  const bookPrompt = first
    .replace(/\*\*输出\*\*：写一个 JSON 文件（Write 工具）到 [^`]*```json[\s\S]*?```/, `**输出**：依次写 ${meta.parts.length} 个 JSON 文件（每个文件一次 Write 调用，写完一个再写下一个）到 D:\\codesolo\\taoread\\apps\\server\\scripts\\completion\\${id}\\parts\\ 目录：${outFiles}。文件格式：第一个文件含 ${mode === 'A' ? '"rewriteLast"（若有）+ ' : ''}"chapters"；后续文件只有 "chapters"。`)
  tasks.push({ bookId: id, parts: meta.parts, prompt: bookPrompt })
}
writeFileSync(join(ROOT, 'dispatch-book.json'), JSON.stringify(tasks, null, 2))
console.log(`书级任务 ${tasks.length} 个`)
