/** docs/110-2: acquire famous-poem candidates from the live poetry API (read-only, drafts only).
 * Round 2: 4 more books. Cross-dedupes against ALL_PACKS poem text hashes (iron law: never
 * duplicate an existing catalogue poem). Output: apps/server/output/poetry-classics-20261107/. */
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { searchPoetry, normalizedPoem, poemHash } from './lib/poetry-source.mjs'
import { pinyin } from 'pinyin-pro'
import { ALL_PACKS } from '../src/content/packs/index'

const output = 'output/poetry-classics-20261107'
await mkdir(join(output, 'raw'), { recursive: true })

const existing = new Set(
  ALL_PACKS.filter((p) => p.lang === 'zh' && p.category === 'poetry').flatMap((p) =>
    p.chapters.map((c) => poemHash(normalizedPoem(c.blocks.filter((b) => b.kind === 'poem').map((b) => b.text).join('\n'))))),
)
console.log('existing poem hashes:', existing.size)

const BOOKS = {
  'poetry-yongwu': {
    title: '咏物诗选·身边的小事物',
    ageStage: '3-5',
    author: null,
    queries: [
      { q: '鹅鹅鹅曲项向天歌', title: '咏鹅' },
      { q: '解落三秋叶', title: '风' },
      { q: '碧玉妆成一树高', title: '咏柳' },
      { q: '不论平地与山尖', title: '蜂' },
      { q: '墙角数枝梅', title: '梅花' },
      { q: '泉眼无声惜细流', title: '小池' },
      { q: '垂緌饮清露', title: '蝉' },
      { q: '头上红冠不用裁', title: '画鸡' },
      { q: '吾家洗砚池头树', title: '墨梅' },
      { q: '草长莺飞二月天', title: '村居' },
      { q: '白日不到处', title: '苔' },
      { q: '牧童骑黄牛', title: '所见' },
      { q: '梅雪争春未肯降', title: '雪梅' },
    ],
  },
  'poetry-baijuyi': {
    title: '白居易诗选·儿童诵读本',
    ageStage: '6-8',
    author: '白居易',
    queries: [
      { q: '小娃撑小艇', title: '池上' },
      { q: '离离原上草', title: '草' },
      { q: '一道残阳铺水中', title: '暮江吟' },
      { q: '人间四月芳菲尽', title: '大林寺桃花' },
      { q: '弄石临溪坐', title: '遗爱寺' },
      { q: '已讶衾枕冷', title: '夜雪' },
      { q: '天平山上白云泉', title: '白云泉' },
      { q: '邯郸驿里逢冬至', title: '邯郸冬至夜思家' },
    ],
  },
  'poetry-yangwanli': {
    title: '杨万里诗选·夏天的小事',
    ageStage: '6-8',
    author: '杨万里',
    queries: [
      { q: '毕竟西湖六月中', title: '晓出净慈寺送林子方' },
      { q: '篱落疏疏一径深', title: '宿新市徐公店' },
      { q: '梅子留酸软齿牙', title: '闲居初夏午睡起' },
      { q: '一叶渔船两小童', title: '舟过安仁' },
      { q: '稚子金盆脱晓冰', title: '稚子弄冰' },
      { q: '莫言下岭便无难', title: '过松源晨炊漆公店' },
      { q: '夜热依然午热同', title: '夏夜追凉' },
      { q: '晴明风日雨干时', title: '桑茶坑道中' },
      { q: '梅子留酸软齿牙', title: '闲居初夏午睡起' },
      { q: '一叶渔船两小童', title: '舟过安仁' },
      { q: '篱落疏疏一径深', title: '宿新市徐公店' },
      { q: '田夫抛秧田妇接', title: '插秧歌' },
    ],
  },
  'poetry-tianyuan': {
    title: '田园诗选·大人和孩子一起干活',
    ageStage: '6-8',
    author: null,
    queries: [
      { q: '昼出耘田夜绩麻', title: '四时田园杂兴' },
      { q: '梅子金黄杏子肥', title: '四时田园杂兴' },
      { q: '蝴蝶双双入菜花', title: '四时田园杂兴' },
      { q: '胡蝶双双入菜花', title: '四时田园杂兴' },
      { q: '新筑场泥镜面平', title: '四时田园杂兴' },
      { q: '土膏欲动雨频催', title: '春日田园杂兴' },
      { q: '垂成穑事苦艰难', title: '秋日田园杂兴' },
      { q: '锄禾日当午', title: '悯农' },
      { q: '春种一粒粟', title: '悯农' },
      { q: '绿遍山原白满川', title: '乡村四月' },
      { q: '种豆南山下', title: '归园田居' },
    ],
  },
}

const BLOCK = /醉|杀|征|戍|妓|死|愁|恨|寇|军|战|兵|泪|哭|病|仕/
const seen = new Set()

for (const [bookId, cfg] of Object.entries(BOOKS)) {
  const picked = []
  for (const item of cfg.queries) {
    if (picked.length >= 10) break
    let response = null
    for (let attempt = 1; attempt <= 4 && !response; attempt++) {
      try {
        response = await searchPoetry(item.q, { pageSize: 20 })
      } catch (e) {
        if (attempt === 4) { console.log(`SKIP query "${item.q}": ${String(e.message).slice(0, 60)}`); break }
        await new Promise((r) => setTimeout(r, 4000 * attempt))
      }
    }
    if (!response) continue
    await writeFile(join(output, 'raw', `${bookId}--${encodeURIComponent(item.q)}.json`), response.raw)
    const wantedAuthor = item.author ?? cfg.author
    const cand = response.candidates.find((p) => {
      if (!p.title.includes(item.title ?? item.q)) return false
      if (wantedAuthor && p.author !== wantedAuthor) return false
      const n = [...p.text.matchAll(/\p{Script=Han}/gu)].length
      if (n < 16 || n > 72) return false
      if (BLOCK.test(p.text)) return false
      const h = poemHash(normalizedPoem(p.text))
      if (existing.has(h) || seen.has(h)) return false
      return true
    })
    if (!cand) {
      console.log(`MISS query "${item.q}"`)
      continue
    }
    const h = poemHash(normalizedPoem(cand.text))
    seen.add(h)
    picked.push({
      bookId,
      sourceId: cand.sourceId,
      title: cand.title,
      author: cand.author,
      dynasty: cand.unverifiedDynasty,
      text: cand.text,
      pinyin: pinyin(cand.text),
      source: { url: response.url, rawSha256: response.rawSha256, fetchedAt: response.fetchedAt, apiRepository: 'palemoky/chinese-poetry-api' },
      pending: ['Edition cross-check against canonical text', 'Polyphone pinyin proof', 'Translation and note authoring', 'Child age review'],
    })
    console.log(`OK "${item.q}" -> #${cand.sourceId} ${cand.title} / ${cand.author}`)
  }
  console.log(`${bookId}: picked ${picked.length}`)
  await writeFile(join(output, `${bookId}.draft.json`), JSON.stringify({ bookId, title: cfg.title, ageStage: cfg.ageStage, picked }, null, 2))
}
