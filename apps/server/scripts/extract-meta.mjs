// 从 git 历史 fb3ebff 恢复 22 个生成书包的原始元数据 → corpus-data/original-meta.json
import { execSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'

const files = [
  'poetry-tang.ts', 'poetry-qianjia.ts', 'poetry-songci.ts', 'poetry-shijing.ts',
  'poetry-libai.ts', 'poetry-dufu.ts', 'poetry-wangwei.ts', 'poetry-yuanqu.ts',
  'poetry-yuefu.ts', 'poetry-pastoral.ts', 'poetry-scenery.ts',
  'poetry-children.ts', 'poetry-children2.ts',
  'primer-sanzi.ts', 'primer-dizigui.ts', 'primer-qianziwen.ts', 'primer-baijiaxing.ts',
  'primer-shenglv.ts', 'primer-shenglv2.ts', 'primer-zhuzi.ts', 'primer-zengguang.ts',
  'primer-youxue.ts',
]
const grab = (s, field) => {
  const m = s.match(new RegExp(`${field}:\\s*['"\`]([^'"\`]+)['"\`]`))
  return m ? m[1] : null
}
const out = {}
for (const f of files) {
  const s = execSync(`git show fb3ebff:apps/server/src/content/packs/${f}`, {
    encoding: 'utf8',
    maxBuffer: 10e6,
  })
  out[f] = {
    id: grab(s, 'id'),
    title: grab(s, 'title'),
    author: grab(s, 'author'),
    category: grab(s, 'category'),
    ageStage: grab(s, 'ageStage'),
    intro: grab(s, 'intro'),
    coverArt: grab(s, 'coverArt'),
    coverArtPrompt: grab(s, 'coverArtPrompt'),
    coverFrom: grab(s, 'coverFrom'),
    coverTo: grab(s, 'coverTo'),
    source: grab(s, 'source'),
  }
}
writeFileSync(new URL('./corpus-data/original-meta.json', import.meta.url), JSON.stringify(out, null, 1), 'utf8')
console.log('written', Object.keys(out).length)
for (const [f, m] of Object.entries(out)) if (!m.id) console.log('MISSING id:', f)
