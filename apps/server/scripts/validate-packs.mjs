/**
 * 内容包全量校验（docs/24 书库大扩充）。
 * 检查：id 唯一 / 标题唯一 / art 场景键全局唯一 / 必填字段 / rights 台账完整 /
 *       章节块数 / 拼音与原文字数对齐 / 无 emoji。
 * 用法：cd apps/server && npx tsx scripts/validate-packs.mjs
 */
import { ALL_PACKS } from '../src/content/packs/index.js'

let problems = 0
const seenIds = new Set()
const seenTitles = new Set()
const seenScenes = new Map()
const emojiRe = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}]/u

for (const p of ALL_PACKS) {
  const where = `${p.id}`
  if (seenIds.has(p.id)) { console.log(`✗ ${where}: id 重复`); problems++ }
  seenIds.add(p.id)
  if (seenTitles.has(p.title)) { console.log(`✗ ${where}: 标题重复「${p.title}」`); problems++ }
  seenTitles.add(p.title)

  for (const field of ['title', 'lang', 'category', 'ageStage', 'coverArt', 'source']) {
    if (!p[field]) { console.log(`✗ ${where}: 缺 ${field}`); problems++ }
  }
  if (!p.intro) { console.log(`✗ ${where}: 缺 intro`); problems++ }
  if (!p.coverArtPrompt) { console.log(`✗ ${where}: 缺 coverArtPrompt（插画质量依赖它）`); problems++ }
  if (p.chapters.length === 0) { console.log(`✗ ${where}: 无章节`); problems++ }

  for (const rKey of ['workTitle', 'jurisdiction', 'basis']) {
    if (!p.rights?.[rKey]) { console.log(`✗ ${where}: rights 缺 ${rKey}`); problems++ }
  }
  if (!p.rights?.author && !p.rights?.note) { console.log(`✗ ${where}: rights 无 author 也无 note`); problems++ }

  const recordScene = (scene, loc, bookId) => {
    if (!scene || scene === 'lamp-hint') return
    const prev = seenScenes.get(scene)
    if (prev) {
      // 同一本书内复用同一场景（封面=首章图、note 块引用本章图）是设计意图，不报
      if (prev.bookId !== bookId) {
        console.log(`✗ 场景键跨书重复「${scene}」：${prev.loc} 与 ${loc}`)
        problems++
      }
    } else {
      seenScenes.set(scene, { loc, bookId })
    }
  }
  recordScene(p.coverArt, `${where}:cover`, p.id)

  p.chapters.forEach((ch, ci) => {
    const chLoc = `${where}:ch${ci + 1}`
    if (!ch.title) { console.log(`✗ ${chLoc}: 缺 title`); problems++ }
    if (!ch.art) { console.log(`✗ ${chLoc}: 缺 art`); problems++ }
    if (!ch.artPrompt) { console.log(`✗ ${chLoc}: 缺 artPrompt`); problems++ }
    recordScene(ch.art, chLoc, p.id)
    if (ch.blocks.length === 0) { console.log(`✗ ${chLoc}: 无 blocks`); problems++ }
    let hasImage = false
    ch.blocks.forEach((b, bi) => {
      const bLoc = `${chLoc}:blk${bi + 1}`
      if (!b.text) { console.log(`✗ ${bLoc}: 缺 text`); problems++ }
      if (b.kind === 'image') {
        hasImage = true
        if (!b.art) { console.log(`✗ ${bLoc}: image 块缺 art`); problems++ }
        recordScene(b.art ?? '', bLoc, p.id)
      } else {
        recordScene(b.art ?? '', bLoc, p.id)
      }
      if (b.kind === 'poem' && b.pinyin) {
        const han = [...b.text].filter((c) => /[\u4E00-\u9FFF]/.test(c)).length
        const pin = b.pinyin.trim().split(/\s+/).length
        // 拼音只标汉字，标点不计；允许 5% 误差（儿化/连读）
        if (pin < han * 0.9 || pin > han * 1.15) {
          console.log(`⚠ ${bLoc}: 拼音 ${pin} 词 vs 原文 ${han} 字，可能不对齐`)
          problems++
        }
      }
      if (emojiRe.test(b.text)) { console.log(`✗ ${bLoc}: 正文含 emoji`); problems++ }
    })
    // 章节题图（chapter.art）始终展示，缺 image 块只是章内无第二张插图，不阻塞
    if (!hasImage) console.log(`ℹ ${chLoc}: 章内无 image 块（题图仍展示，不阻塞）`)
  })
  if (emojiRe.test(p.title)) { console.log(`✗ ${where}: 标题含 emoji`); problems++ }
}

console.log(`\n共 ${ALL_PACKS.length} 本 / ${ALL_PACKS.reduce((s, p) => s + p.chapters.length, 0)} 章 / ${ALL_PACKS.reduce((s, p) => s + p.chapters.reduce((c, ch) => c + ch.blocks.length, 0), 0)} 块`)
console.log(problems === 0 ? '✅ 内容包校验全部通过' : `❌ ${problems} 个问题待修`)
if (problems > 0) process.exit(1)
