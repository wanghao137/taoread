/**
 * 触达红线巡检（docs/11 P0-4，V8 校准 2026-09-22，审计 F29）：
 * 扫描 pages/components 里所有 <button>，按 V8 贴纸绘本实际计算尺寸判定——
 * 主 CTA ≥56px、常规 ≥48px、圆形小钮 ≥44px（v8.css Phase 8），家长小胶囊 40px。
 * 判据（按优先级）：
 *   1. 解析 apps/web/src/v8.css 的 min-height 级联（后写覆盖先写），按钮的类
 *      全部命中某条复合选择器时取其 px；与 Tailwind min-h/h 取最大值
 *   2. className 含 min-h-touch（=64px）或 min-h-[Npx]/h-[Npx]/h-N → 按映射判定
 *   3. 否则 → 违规（交给人工/T07 处置，这类常是真实小目标，如换人浮钮）
 * className 在下一行的按钮取后续 3 行窗口内查找。
 *
 * 阈值是产品目标而非统一法规：孩子端下限 44（圆钮），家长端下限 40（sm 胶囊）。
 * 退出码：发现违规时 1，供 npm run verify 前置调用。
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const PARENT_MIN_PX = 40
const CHILD_MIN_PX = 44
const V8_CSS = 'apps/web/src/v8.css'

/** 从 v8.css 提取「类选择器 → 最小高度 px」映射（简单类与 .a.b 复合；后代选择器不解析） */
function loadV8MinHeights() {
  const map = new Map()
  if (!existsSync(V8_CSS)) return map
  const css = readFileSync(V8_CSS, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')
  const re = /([^{}]+)\{([^{}]*)\}/g
  let m
  while ((m = re.exec(css))) {
    const mh = m[2].match(/min-height:\s*(\d+(?:\.\d+)?)px/) ?? m[2].match(/[^-]height:\s*(\d+(?:\.\d+)?)px/)
    if (!mh) continue
    const px = Number(mh[1])
    for (const part of m[1].split(',')) {
      const sel = part.trim()
      if (!sel.startsWith('.') || /[\s>~+]/.test(sel)) continue
      const classes = (sel.match(/\.[A-Za-z0-9_-]+/g) ?? []).map((c) => c.slice(1))
      if (classes.length === 0) continue
      map.set(classes.sort().join('.'), px) // CSS 级联：后写覆盖先写
    }
  }
  return map
}

const V8_MIN_HEIGHTS = loadV8MinHeights()

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

/** 按钮类串命中的 v8 min-height 最大值（复合选择器要求全部类出现） */
function pxFromV8Classes(cls) {
  const tokens = cls.split(/\s+/)
  let best = null
  for (const [key, px] of V8_MIN_HEIGHTS) {
    if (key.split('.').every((c) => tokens.includes(c))) {
      best = best === null ? px : Math.max(best, px)
    }
  }
  return best
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
    const px = pxFromMinHeight(cls) ?? pxFromV8Classes(cls) ?? pxFromTailwindHeight(cls)
    if (px !== null && px >= childMin) continue
    const line = src.slice(0, m.index).split('\n').length
    bad.push(`${f.replace(/[\\]/g, '/')}:${line} | 需要 ≥${childMin}px，当前 ${px ?? '未声明'} | ${cls.replace(/\s+/g, ' ').slice(0, 70)}`)
  }
}

console.log(`触达巡检（V8 校准）：扫描 ${files.length} 个 tsx，发现 ${bad.length} 处违规（孩子端下限 ${CHILD_MIN_PX}px / 家长端 ${PARENT_MIN_PX}px，v8.css 级联已识别）`)
bad.forEach((b) => console.log('  ' + b))
if (bad.length > 0) process.exitCode = 1
