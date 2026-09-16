/**
 * 触达红线巡检（docs/11 P0-4）：扫描 pages/components 里所有 <button>，
 * 要求高度不低于家长端 48px、孩子端 64px（design-system 红线）。
 *
 * 判据（按优先级）：
 *   1. className 含 min-h-touch（=64px）或 min-h-[Npx]/min-h-[Nrem] 且换算 ≥ 阈值 → 通过
 *   2. className 含显式高度 h-12（48px）…h-24 → 按阈值判定
 *   3. 否则 → 违规
 * className 在下一行的按钮取后续 3 行窗口内查找。
 *
 * 退出码：发现违规时 1，供 npm run verify 前置调用。
 */
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const PARENT_MIN_PX = 48
const CHILD_MIN_PX = 64

function walk(d) {
  return readdirSync(d, { withFileTypes: true }).flatMap((e) => {
    const p = join(d, e.name)
    return e.isDirectory() ? walk(p) : p.endsWith('.tsx') ? [p] : []
  })
}

function pxFromTailwindHeight(cls) {
  const map = { 10: 40, 11: 44, 12: 48, 13: 52, 14: 56, 15: 60, 16: 64, 20: 80, 24: 96 }
  const m = cls.match(/(?:^|\s)h-(\d+)(?!\S)/)
  if (m && map[m[1]]) return map[m[1]]
  const arb = cls.match(/(?:^|\s)h-\[(\d+)(px|rem)\]/)
  if (arb) return arb[2] === 'rem' ? Number(arb[1]) * 16 : Number(arb[1])
  return null
}

function pxFromMinHeight(cls) {
  const arb = cls.match(/(?:^|\s)min-h-\[(\d+)(px|rem)\]/)
  if (arb) return arb[2] === 'rem' ? Number(arb[1]) * 16 : Number(arb[1])
  if (/(?:^|\s)min-h-touch(?!\S)/.test(cls)) return 64
  return null
}

function isChildFacing(file) {
  const f = file.replace(/[\\]/g, '/')
  return /\/pages\/child\/|\/pages\/ChildHome|\/pages\/LoginPage|\/pages\/child\//.test(f)
}

const files = [...walk('apps/web/src/pages'), ...walk('apps/web/src/components')]
const bad = []

for (const f of files) {
  const src = readFileSync(f, 'utf8')
  const childMin = isChildFacing(f) ? CHILD_MIN_PX : PARENT_MIN_PX
  const re = /<button\b[^>]*>/g
  let m
  while ((m = re.exec(src))) {
    const tag = m[0]
    // className 可能在开标签内，也可能在紧接的几行（多行属性写法）
    const window_ = src.slice(m.index, Math.min(src.length, m.index + 400)).split('\n').slice(0, 4).join('\n')
    let cls = ''
    const inline = tag.match(/className="([^"]*)"/)
    if (inline) {
      cls = inline[1]
    } else {
      // 模板字面量 className={`${base} ...`}：取到反引号闭合为止
      const start = window_.indexOf('className=')
      if (start !== -1) {
        const tail = window_.slice(start)
        // 形如 className={`${base} ...`}（大括号包模板字面量），大括号可选
        const tmpl = tail.match(/className=\{?`([^`]*)`/)
        const braced = tail.match(/className=\{([^}]*)\}/)
        cls = tmpl ? tmpl[1] : braced ? braced[1] : ''
      }
    }
    if (!cls) continue // 无 className（如第三方组件）交给人工
    const px = pxFromMinHeight(cls) ?? pxFromTailwindHeight(cls)
    if (px !== null && px >= childMin) continue
    const line = src.slice(0, m.index).split('\n').length
    bad.push(`${f.replace(/[\\]/g, '/')}:${line} | 需要 ≥${childMin}px，当前 ${px ?? '未声明'} | ${cls.replace(/\s+/g, ' ').slice(0, 70)}`)
  }
}

console.log(`触达巡检：扫描 ${files.length} 个 tsx，发现 ${bad.length} 处违规`)
bad.forEach((b) => console.log('  ' + b))
if (bad.length > 0) process.exitCode = 1
