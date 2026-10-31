import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const dirs = fs.readdirSync(root).filter((d) => fs.existsSync(path.join(root, d, 'meta.json')))
const KEYS = new Set(['id', 'packFile', 'target', 'parts', 'book', 'plan', 'title', 'beats', 'sourceRef', 'art', 'intro', 'coverArt', 'coverArtPrompt', 'coverFrom', 'coverTo', 'source', 'rights', 'lang', 'category', 'ageStage', 'author', 'jurisdiction', 'basis', 'note', 'workTitle', 'authorDeathYear', 'sourceUrl'])
let valid = 0
for (const d of dirs) {
  const p = path.join(root, d, 'meta.json')
  let lines = fs.readFileSync(p, 'utf8').split('\n')
  const out = []
  for (const raw of lines) {
    let l = raw
    // 1) 引号键带 "空格+数字" 尾缀且键不在白名单 → 丢弃
    const junkQuoted = l.match(/"([^"]+?) (\d+)":/)
    if (junkQuoted && !KEYS.has(junkQuoted[1])) { out.push('    __DROP__'); continue }
    // 2) 无引号键（CJK 开头 + 冒号）→ 丢弃
    if (/^\s*[\u4e00-\u9fff《》]+\s*\d*:\s/.test(l)) { out.push('    __DROP__'); continue }
    // 3) 缺引号修复
    l = l.replace(/"(\w+): \[/g, '"$1": [')
    l = l.replace(/"(book|plan|rights): \{/g, '"$1": {')
    // 4) 修复值内漏引号开头的键（"lang": "中".replace(...) → 已被 1 兜不住的特例）
    l = l.replace(/"lang": "[^"]*"\.replace\([^)]*\),/g, '"lang": "zh",')
    out.push(l)
  }
  let s = out.filter((l) => !l.includes('__DROP__')).join('\n')
  for (let i = 0; i < 3; i++) s = s.replace(/,(\s*[}\]])/g, '$1')
  fs.writeFileSync(p, s)
  try {
    const d = JSON.parse(s)
    console.log('OK  ', d.id, d.target + '章', (d.plan?.length ?? '?') + '项')
    valid++
  } catch (e) {
    console.log('FAIL', d, e.message.slice(0, 90))
  }
}
console.log('valid:', valid + '/' + dirs.length)
