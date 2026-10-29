/**
 * 生成注音驱动发音层（2026-10-29，docs/97）。
 *
 * 契约：凡是 pack 注音（显示层给孩子看的拼音）与单字默认读音不同的字符，
 * 朗读必须按注音读。本脚本扫全部中文 pack 的对位注音块，生成：
 *   - entries：行级「位置→单读音同音字」替换表（确定性，直接改语音输入文本）
 *   - hints：  找不到干净同音字的，生成指令提示表（参照百家姓姓氏提示的成熟模式）
 *
 * 规则：
 *   - 一/不变调由引擎处理，不生成条目
 *   - 轻声注音（无调号）不生成条目
 *   - 同音字必须声调完全一致且单读音；同音字优先选语料高频字
 *   - 行为键：行出现在段中才生效；应用时校验位置上的字，不符则跳过（幂等）
 *
 * 用法（apps/server）：npx tsx scripts/generate-ruby-pronunciation.mts
 */
import { pinyin as py } from 'pinyin-pro'
import fs from 'node:fs'
import { ALL_PACKS } from '../src/content/packs/index'

const HAN = /\p{Script=Han}/u
const SYL = /^[a-züvāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]+$/i
const TONED = /[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/
const strip = (t: string) => t.replace(/^[^A-Za-züvāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]+/, '').replace(/[^A-Za-züvāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]+$/, '')

// 同音字池：语料字（按频次）+ CJK 基本区
const freq = new Map<string, number>()
for (const p of ALL_PACKS) for (const ch of p.chapters) for (const b of ch.blocks) for (const c of b.text) {
  if (HAN.test(c)) freq.set(c, (freq.get(c) ?? 0) + 1)
}
const pool: string[] = [...freq.entries()].sort((a, b) => b[1] - a[1]).map(([c]) => c)
for (let cp = 0x4e00; cp <= 0x9fa5; cp++) { const c = String.fromCodePoint(cp); if (!freq.has(c)) pool.push(c) }
const exactSingle = new Map<string, string>()
for (const c of pool) {
  const r = [...new Set(py(c, { multiple: true, type: 'array' }) as string[])]
  const s0 = r[0]
  if (r.length !== 1 || s0 === undefined) continue
  if (!exactSingle.has(s0)) exactSingle.set(s0, c)
}

interface Sub { pos: number; from: string; to: string; ann: string }
interface Entry { line: string; subs: Sub[]; books: Set<string> }
const byLine = new Map<string, Entry>()
let blocksAligned = 0, blocksSkipped = 0, mismatches = 0

for (const pack of ALL_PACKS) {
  if (pack.lang !== 'zh') continue
  for (const ch of pack.chapters) {
    for (const b of ch.blocks) {
      if ((b.kind !== 'text' && b.kind !== 'poem') || !b.pinyin) continue
      const chars = [...b.text]
      const hanCount = chars.filter(c => HAN.test(c)).length
      const tokens = b.pinyin.split(/\s+/).map(strip).filter(Boolean)
      if (tokens.length !== hanCount || /[A-Za-z0-9]/.test(b.text)) { blocksSkipped++; continue }
      blocksAligned++
      let ti = 0
      let lineStart = 0
      for (const line of b.text.split('\n')) {
        // pos 用 UTF-16 索引（与运行时 indexOf 坐标系一致；𪾢 等扩展区字符占 2 个码元）
        let unitOffset = 0
        const lineChars = [...line]
        for (let i = 0; i < lineChars.length; i++) {
          const c = chars[lineStart + i] ?? ''
          const unitPos = unitOffset
          unitOffset += c.length
          if (!c || !HAN.test(c)) continue
          const ann = tokens[ti++]
          if (!ann || !SYL.test(ann)) continue
          if (!TONED.test(ann)) continue // 轻声注音不保护
          if (c === '一' || c === '不') continue
          const def = (py(c, { type: 'array' }) as string[])[0]
          if (!def || !SYL.test(def) || ann === def) continue
          mismatches++
          const to = exactSingle.get(ann)
          const key = line
          const e = byLine.get(key) ?? { line, subs: [], books: new Set<string>() }
          if (!e.subs.some(s => s.pos === unitPos)) e.subs.push({ pos: unitPos, from: c, to: to && to !== c ? to : c /*占位：无同音字时 to=from，走 hints*/, ann })
          e.books.add(pack.id)
          byLine.set(key, e)
        }
        lineStart += lineChars.length + 1
      }
    }
  }
}

const entries = [...byLine.values()]
// 替换条目：有干净同音字的字符
const subEntries = entries
  .map(e => ({ line: e.line, subs: e.subs.filter(s => s.to !== s.from && s.to !== e.line.substr(s.pos, s.from.length)) }))
  .filter(e => e.subs.length > 0)
// 提示条目：无干净同音字的字符（可与替换同行并存）
const hintEntries = entries
  .map(e => ({ line: e.line, items: e.subs.filter(s => s.to === s.from || s.to === e.line.substr(s.pos, s.from.length)).map(s => [s.from, s.ann] as [string, string]) }))
  .filter(e => e.items.length > 0)

const header = `/**
 * 由 scripts/generate-ruby-pronunciation.mts 从内容包注音生成——勿手改。
 * 契约见生成脚本头注释（docs/97）：注音≠默认音的字符，朗读必须按注音读。
 * 生成时间：${new Date().toISOString()}
 * 条目：替换行 ${subEntries.length}（${subEntries.reduce((n, e) => n + e.subs.length, 0)} 字），提示行 ${hintEntries.length}（${hintEntries.reduce((n, e) => n + e.items.length, 0)} 字）
 */
export interface RubySubEntry { line: string; subs: Array<{ pos: number; from: string; to: string }> }
export interface RubyHintEntry { line: string; items: Array<[string, string]> }

export const rubySubEntries: RubySubEntry[] = ${JSON.stringify(subEntries.map(e => ({ line: e.line, subs: e.subs.map(s => ({ pos: s.pos, from: s.from, to: s.to })) })), null, 0)}

export const rubyHintEntries: RubyHintEntry[] = ${JSON.stringify(hintEntries.map(e => ({ line: e.line, items: e.items })), null, 0)}
`
fs.writeFileSync('D:/codesolo/taoread/apps/server/src/modules/tts/rubyPronunciation.generated.ts', header)
console.log(JSON.stringify({
  blocksAligned, blocksSkipped, mismatches,
  subEntries: subEntries.length, subCount: subEntries.reduce((n, e) => n + e.subs.length, 0),
  hintEntries: hintEntries.length, hintCount: hintEntries.reduce((n, e) => n + e.items.length, 0),
}, null, 1))
