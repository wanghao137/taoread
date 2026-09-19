import { ALL_PACKS } from '../src/content/packs/index.js'

const by = {}, age = {}, rights = {}, lang = {}
for (const p of ALL_PACKS) {
  by[p.category] = (by[p.category] ?? 0) + 1
  age[p.ageStage] = (age[p.ageStage] ?? 0) + 1
  rights[p.rights.basis] = (rights[p.rights.basis] ?? 0) + 1
  lang[p.lang] = (lang[p.lang] ?? 0) + 1
}
console.log('total', ALL_PACKS.length)
console.log('category', JSON.stringify(by))
console.log('age', JSON.stringify(age))
console.log('rights', JSON.stringify(rights))
console.log('lang', JSON.stringify(lang))
const chapters = ALL_PACKS.reduce((s, p) => s + p.chapters.length, 0)
const blocks = ALL_PACKS.reduce((s, p) => s + p.chapters.reduce((c, ch) => c + ch.blocks.length, 0), 0)
console.log('chapters', chapters, 'blocks', blocks)
