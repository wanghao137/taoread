/**
 * 修复 pinyin 字段里全角标点后缺空格导致的词粘连（docs/25 校验器告警）。
 * 只处理 pinyin: '...' 字面量内部；text 字段不动。
 * 用法：node scripts/fix-pinyin.mjs <file...>
 */
import fs from 'node:fs'

const CJK_PUNCT = '，。？！；：、）」』'
for (const file of process.argv.slice(2)) {
  const src = fs.readFileSync(file, 'utf8')
  const fixed = src.replace(/(pinyin:\s*')([^']+)(')/g, (_m, head, body, tail) => {
    const repaired = body.replace(
      new RegExp(`([${CJK_PUNCT}])(?=[^\\s${CJK_PUNCT}])`, 'g'),
      '$1 ',
    )
    return head + repaired + tail
  })
  if (fixed !== src) {
    fs.writeFileSync(file, fixed)
    console.log(`✅ ${file} 已修复`)
  } else {
    console.log(`— ${file} 无需修改`)
  }
}
