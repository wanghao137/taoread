/** docs/110: acquire famous-poem candidates from the live poetry API (read-only, drafts only).
 * Output: output/poetry-classics-20261107/draft-batch.json (never seeds, never publishes). */
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { searchPoetry, normalizedPoem, poemHash } from './lib/poetry-source.mjs'
import { pinyin } from 'pinyin-pro'

const output = 'output/poetry-classics-20261107'
await mkdir(join(output, 'raw'), { recursive: true })

const BOOKS = {
  'poetry-sushi-kids': {
    title: '苏轼诗选·儿童诵读本',
    author: '苏轼',
    dynasty: '宋',
    queries: [{ q: '题西林壁' }, { q: '饮湖上初晴后雨' }, { q: '惠崇春江晚景' }, { q: '六月二十七日望湖楼醉书' }, { q: '赠刘景文' }, { q: '东栏梨花' }, { q: '东风袅袅泛崇光', title: '海棠' }, { q: '水光潋滟晴方好' }, { q: '庐山烟雨浙江潮' }, { q: '人生到处知何似' }],
  },
  'poetry-festival': {
    title: '节日诗选·跟着诗过日子',
    author: null,
    dynasty: null,
    queries: [{ q: '爆竹声中一岁除', title: '元日' }, { q: '清明时节雨纷纷', title: '清明' }, { q: '火树银花合', title: '正月十五夜' }, { q: '春城无处不飞花', title: '寒食' }, { q: '九月九日忆山东兄弟' }, { q: '七夕今宵看碧霄', title: '乞巧' }, { q: '银烛秋光冷画屏', title: '秋夕' }, { q: '节分端午自谁言', title: '端午' }, { q: '天竺寺八月十五日夜桂子' }, { q: '锦里开芳宴', title: '十五夜观灯' }, { q: '和田郎中端午', title: '端午即事', author: '文天祥' }],
  },
}

// famous canonical poems: short jueju/lvshi, child-safe subjects
const BLOCK = /醉|杀|征|戍|妓|死|愁|恨|寇|军|战|兵|泪|哭|病|仕/
const existing = new Set() // dedupe within this batch; cross-book dedupe happens at assemble time vs ALL_PACKS

for (const [bookId, cfg] of Object.entries(BOOKS)) {
  const picked = []
  for (const item of cfg.queries) {
    const q = item.q
    if (picked.length >= 12) break
    let response = null
    for (let attempt = 1; attempt <= 4 && !response; attempt++) {
      try {
        response = await searchPoetry(q, { pageSize: 20 })
      } catch (e) {
        if (attempt === 4) { console.log(`SKIP query "${q}": ${String(e.message).slice(0, 60)}`); break }
        await new Promise((r) => setTimeout(r, 4000 * attempt))
      }
    }
    if (!response) continue
    await writeFile(join(output, 'raw', `${bookId}--${encodeURIComponent(q)}.json`), response.raw)
    // prefer exact title match + expected author when given
    const titleKey = item.title ?? item.q
    const wantedAuthor = item.author ?? cfg.author
    const cand = response.candidates.find((p) => {
      if (!p.title.includes(titleKey)) return false
      if (wantedAuthor && p.author !== wantedAuthor) return false
      const n = [...p.text.matchAll(/\p{Script=Han}/gu)].length
      if (n < 20 || n > 60) return false
      if (BLOCK.test(p.text)) return false
      const h = poemHash(normalizedPoem(p.text))
      if (existing.has(h)) return false
      return true
    })
    if (!cand) {
      console.log(`MISS query "${q}" (no candidate passed filters)`)
      continue
    }
    const h = poemHash(normalizedPoem(cand.text))
    existing.add(h)
    picked.push({
      bookId,
      sourceId: cand.sourceId,
      title: cand.title,
      author: cand.author,
      dynasty: cfg.dynasty ?? cand.unverifiedDynasty,
      text: cand.text,
      pinyin: pinyin(cand.text),
      source: { url: response.url, rawSha256: response.rawSha256, fetchedAt: response.fetchedAt, apiRepository: 'palemoky/chinese-poetry-api' },
      pending: ['Edition cross-check against canonical text', 'Polyphone pinyin proof', 'Translation and note authoring', 'Child age review'],
    })
    console.log(`OK "${q}" -> #${cand.sourceId} ${cand.title} / ${cand.author}`)
  }
  console.log(`${bookId}: picked ${picked.length}`)
  await writeFile(join(output, `${bookId}.draft.json`), JSON.stringify({ bookId, ...cfg, picked }, null, 2))
}
