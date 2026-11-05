// docs/105 方案C-lite：cdn 模式构建后处理。
// vite base 只重写构建产物引用；public/ 下资源的 CSS url() 绝对路径（/fonts/...）不归 base 管，
// 这里统一把 dist 内 CSS 的 /fonts/ 与 /brand/ 引用改写到资产基址，并输出上传清单。
// 用法：node scripts/postbuild-webcdn.mjs   （在 npm run build:webcdn 链内执行）
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const BASE = readFileSync('apps/web/.env.cdn', 'utf8').match(/VITE_ASSET_BASE=(.*)/)?.[1]?.trim()
if (!BASE) throw new Error('.env.cdn 缺 VITE_ASSET_BASE')
const DIST = 'apps/web/dist'
const cssDir = join(DIST, 'assets')
let cssFiles = 0
let rewritten = 0
for (const f of readdirSync(cssDir)) {
  if (!f.endsWith('.css')) continue
  const p = join(cssDir, f)
  let s = readFileSync(p, 'utf8')
  const before = s
  s = s.split('url(/fonts/').join(`url(${BASE}fonts/`)
  s = s.split('url(/brand/').join(`url(${BASE}brand/`)
  if (s !== before) { writeFileSync(p, s); cssFiles += 1; rewritten += (before.match(/url\(\/(fonts|brand)\//g) || []).length }
}
console.log(`postbuild: css rewritten files=${cssFiles} urls=${rewritten} base=${BASE}`)

// 上传清单：assets + fonts + brand + 顶层 icons（index.html 若引用则需；先列出实际引用）
const refs = new Set()
const html = readFileSync(join(DIST, 'index.html'), 'utf8')
for (const m of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  const u = m[1]
  if (u.startsWith(BASE)) refs.add(u.slice(BASE.length))
  else if (u.startsWith('/')) refs.add(u.slice(1))
}
console.log('index.html refs summary:', JSON.stringify([...refs].slice(0, 20)))
