/** Locked public-domain source corpus. Does not seed or mutate any database. */
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createHash } from 'node:crypto'

const out = resolve(process.argv.slice(2).find(a=>!a.startsWith('--')) || '../../output/classics-20261010')
await mkdir(`${out}/sources`, { recursive: true })
const sha = (s) => createHash('sha256').update(s).digest('hex')
const clean = (s, poem = false) => s.replace(/\[Illustration[^\]]*\]/g, '').replace(/_/g, '').split(/\n\s*\n/).map((p) => poem ? p.trim() : p.trim().replace(/\s+/g, ' ')).filter(Boolean)
async function source(id, url) {
  const file = `${out}/sources/${id}.txt`
  try { return await readFile(file, 'utf8') } catch { /* fetch uncached source */ }
  for (let n = 1; n <= 4; n++) {
    try {
      const r = await fetch(url, { signal: globalThis.AbortSignal.timeout(30_000) })
      if (!r.ok) throw Error(`HTTP ${r.status}`)
      const s = await r.text()
      await writeFile(file, s)
      return s
    } catch (e) { if (n === 4) throw e }
  }
}
const books = []
async function pg(id, number, meta, parse) {
  const url = `https://www.gutenberg.org/ebooks/${number}.txt.utf-8`
  const raw = await source(id, url)
  const s = raw.replace(/\r/g, '')
  const start = s.match(/^\*\*\* START OF .*\*\*\*$/m)
  const end = s.match(/^\*\*\* END OF .*\*\*\*$/m)
  if (!start || !end) throw Error(`Missing source boundaries: ${id}`)
  const body = s.slice(start.index + start[0].length, end.index)
  const chapters = parse(body)
  if (chapters.length !== meta.expected) throw Error(`${id}: ${chapters.length} chapters, expected ${meta.expected}`)
  books.push({ id: `zh-classic-${id}`, ...meta, sourceUrl: url, sourceSha256: sha(raw), chapters: chapters.map((c, i) => ({ ...c, order: i + 1, paragraphs: c.paragraphs.map((text, p) => ({ id: `p${p + 1}`, text })), sourceSha256: sha(c.paragraphs.join('\n\n')) })) })
  console.log(`${id}: ${chapters.length} chapters; ${chapters.reduce((n,c)=>n+c.paragraphs.join('').length,0)} source characters`)
}
function slices(s, re, poem = false) {
  const matches = [...s.matchAll(re)]
  return matches.map((m,i)=>({ title: m[1].trim(), paragraphs: clean(s.slice(m.index+m[0].length,matches[i+1]?.index ?? s.length),poem) }))
}
await pg('andersen',1597,{title:'安徒生童话（精选）',author:'汉斯·克里斯蒂安·安徒生',deathYear:1875,sourceLang:'en',expected:10,scope:'精选十篇，每篇完整；依据早期公版英译底本独立翻译',intermediateTranslator:'早期英译本，Project Gutenberg #1597',ageStage:'6-8'},s=>{
  s=s.slice(s.indexOf("\nTHE EMPEROR'S NEW CLOTHES\n"))
  const headings=["THE EMPEROR'S NEW CLOTHES",'THE SWINEHERD','THE REAL PRINCESS','THE SHOES OF FORTUNE','THE FIR TREE','THE SNOW QUEEN','THE LEAP-FROG','THE ELDERBUSH','THE BELL','THE OLD HOUSE','THE HAPPY FAMILY','THE STORY OF A MOTHER','THE FALSE COLLAR','THE SHADOW','THE LITTLE MATCH GIRL','THE DREAM OF LITTLE TUK','THE NAUGHTY BOY','THE RED SHOES']
  const all=slices(s,new RegExp(`\\n(${headings.join('|')})\\n\\n`,'g'))
  if(all.length!==18)throw Error('Andersen source headings incomplete')
  const selected=["THE EMPEROR'S NEW CLOTHES",'THE REAL PRINCESS','THE FIR TREE','THE SNOW QUEEN','THE LEAP-FROG','THE ELDERBUSH','THE HAPPY FAMILY','THE FALSE COLLAR','THE LITTLE MATCH GIRL','THE NAUGHTY BOY']
  return selected.map(t=>{const c=all.find(c=>c.title===t);if(!c)throw Error(`Missing ${t}`);return c})
})
await pg('grimm',5314,{title:'格林童话（精选）',author:'雅各布·格林、威廉·格林',deathYear:1863,sourceLang:'en',expected:12,scope:'精选十二篇，每篇完整；依据玛格丽特·亨特公版英译底本独立翻译',intermediateTranslator:'Margaret Hunt (1831–1912)',ageStage:'6-8'},s=>{
  s=s.slice(s.indexOf('\n1 The Frog-King'))
  const all=slices(s,/\n(\d+[*]? [^\n]+)\n\n/g)
  return [1,5,12,15,20,21,24,26,27,50,53,103].map(n=>{const c=all.find(c=>c.title.startsWith(`${n} `));if(!c)throw Error(`Missing Grimm ${n}`);return c})
})
await pg('aesop',21,{title:'伊索寓言（精选）',author:'伊索',deathYear:-564,sourceLang:'en',expected:24,scope:'精选二十四篇，每篇完整；依据汤森公版英译底本独立翻译',intermediateTranslator:'George Fyler Townsend (1814–1900)',ageStage:'6-8'},s=>{
  const toc=s.slice(s.indexOf('\nCONTENTS\n'),s.indexOf('\nPREFACE\n')).split('\n').filter(l=>l.startsWith(' The ')).map(l=>l.trim())
  s=s.slice(s.indexOf('\nThe Lion And The Mouse\n'))
  const escaped=toc.map(t=>t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'))
  const all=slices(s,new RegExp(`\\n(${escaped.join('|')})\\n\\n`,'g'))
  const selected=['The Lion And The Mouse','The Wolf And The Lamb','The Father And His Sons','The Ants and the Grasshopper','The Hare and the Tortoise','The Dog and the Shadow','The Farmer and the Snake','The Fox and the Goat','The Bear and the Two Travelers','The Wolf in Sheep’s Clothing','The Miser','The Frogs Asking for a King','The Fox and the Grapes','The North Wind and the Sun','The Goose With the Golden Eggs','The Milk-Woman and her Pail','The Crow and the Pitcher','The Fox and the Crow','The Boys and the Frogs','The Oak and the Reeds','The Shepherd’s Boy and the Wolf','The Town Mouse and the Country Mouse','The Fox and the Stork','The Bundle of Sticks']
  // The Father and His Sons is the bundle-of-sticks tale; avoid including it twice.
  selected[selected.length-1]='The Ass and the Lapdog'
  selected[selected.indexOf('The Goose With the Golden Eggs')]='The Hen and the Golden Eggs'
  selected[selected.indexOf('The Fox and the Stork')]='The Fox and the Crane'
  return selected.map(t=>{const c=all.find(c=>c.title.toLowerCase()===t.toLowerCase());if(!c)throw Error(`Missing Aesop ${t}`);return c})
})
await pg('willows',289,{title:'柳林风声',author:'肯尼斯·格雷厄姆',deathYear:1932,sourceLang:'en',expected:12,scope:'完整十二章，独立中文全译',ageStage:'9-12'},s=>{
  s=s.slice(s.indexOf('\nI.\nTHE RIVER BANK'))
  return slices(s,/\n[IVX]+\.\n([^\n]+)\n/g)
})
await pg('oz',55,{title:'绿野仙踪',author:'莱曼·弗兰克·鲍姆',deathYear:1919,sourceLang:'en',expected:25,scope:'作者序言及完整二十四章，独立中文全译',ageStage:'6-8'},s=>{
  s=s.slice(s.indexOf('\nIntroduction\n'))
  return slices(s,/\n(Introduction|Chapter [IVX]+\n[^\n]+)\n/g)
})
await pg('alice',11,{title:'爱丽丝梦游仙境',author:'刘易斯·卡罗尔',deathYear:1898,sourceLang:'en',expected:12,scope:'完整十二章，独立中文全译',ageStage:'6-8'},s=>{
  s=s.slice(s.indexOf('\nCHAPTER I.\n'))
  return slices(s,/\n(CHAPTER [IVX]+\.\n[^\n]+)\n/g)
})
await pg('garden',25609,{title:'一个孩子的诗园',author:'罗伯特·路易斯·史蒂文森',deathYear:1894,sourceLang:'en',expected:65,scope:'献诗及全部六十四首诗，独立中文全译',ageStage:'6-8'},s=>{
  const dedication=s.slice(s.indexOf('\nTO ALISON CUNNINGHAM\n'),s.indexOf('\nTHE ORIGINAL\n'))
  const d={title:'TO ALISON CUNNINGHAM',paragraphs:clean(dedication.replace(/^[\s\S]*?FROM HER BOY\n/,'').replace(/R\. L\. S\./g,''),true)}
  s=s.slice(s.indexOf('\nBED IN SUMMER\n'),s.indexOf('\nTHE SCRIBNER ILLUSTRATED CLASSICS\n'))
  s=s.replace(/^YOUNG NIGHT-THOUGHTS\s*$/gm,'YOUNG NIGHT-THOUGHTS')
  const all=slices(s,/\n([A-Z][A-Z '\-?]+)\n\n/g,true)
  const groups=new Set(['THE CHILD ALONE','GARDEN DAYS','ENVOYS'])
  const poems=all.filter(c=>!groups.has(c.title))
  return [d,...poems]
})
const decode = s => s.replace(/<[^>]*>/g,' ').replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n))).replace(/&#x([0-9a-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&ndash;/g,'–').replace(/&mdash;/g,'—').replace(/\s+/g,' ').trim()
const index=await source('nils-index','https://runeberg.org/nilsholg/')
const links=[...new Set([...index.matchAll(/href="(k([1-9]\d*)[a-z]?\.html)"/g)].map(m=>m[1]))]
const nums=[...new Set(links.map(f=>Number(f.match(/^k(\d+)/)[1])))];
if(nums.length!==55||nums.some((n,i)=>n!==i+1))throw Error('Nils original must contain all 55 chapters')
const sections=new Map();let sectionCursor=0
async function fetchSection(){while(sectionCursor<links.length){const f=links[sectionCursor++];const raw=await source(`nils-${f.slice(0,-5)}`,`https://runeberg.org/nilsholg/${f}`);const start=raw.indexOf('<h1>'),end=raw.indexOf('<br clear=all><hr');if(start<0||end<start)throw Error(`Nils text boundary ${f}`);const html=raw.slice(start,end);const h1=decode(html.match(/<h1>([\s\S]*?)<\/h1>/)?.[1]||'');const h2=decode(html.match(/<h2>([\s\S]*?)<\/h2>/)?.[1]||'');const rest=html.replace(/^[\s\S]*?<\/h[12]>/,'').replace(/<h2>[\s\S]*?<\/h2>/,'');const paragraphs=rest.split(/<p\b[^>]*>/i).map(decode).filter(Boolean);if(!h1||paragraphs.join('').length<200)throw Error(`Nils empty section ${f}`);sections.set(f,{title:h1,paragraphs:[...(h2?[h2]:[]),...paragraphs],sourceUrl:`https://runeberg.org/nilsholg/${f}`,sha256:sha(raw)});console.log(`Nils source ${sections.size}/${links.length}`)}}
await Promise.all([fetchSection(),fetchSection()])
const chapters=nums.map(n=>{const parts=links.filter(f=>Number(f.match(/^k(\d+)/)[1])===n).map(f=>sections.get(f));const texts=parts.flatMap(p=>p.paragraphs);return {order:n,title:parts[0].title,paragraphs:texts.map((text,i)=>({id:`p${i+1}`,text})),sourceSha256:sha(texts.join('\n\n')),sections:parts.map(p=>({title:p.title,sourceUrl:p.sourceUrl,sha256:p.sha256}))}})
books.push({id:'zh-classic-nils',title:'尼尔斯骑鹅旅行记',author:'塞尔玛·拉格洛夫',deathYear:1940,sourceLang:'sv',expected:55,scope:'瑞典文原作完整五十五章，独立中文全译；未采用删去十二章的早期英文版',ageStage:'9-12',sourceUrl:'https://runeberg.org/nilsholg/',sourceSha256:sha(index),chapters})
// Rights basis is the 1943 original under CN life+50, not the host's license
// on its electronic edition. No host editorial material, layout or images used.
const princeUrl='https://www.ebooksgratuits.com/html/st_exupery_le_petit_prince.html'
const prince=await source('prince-french',princeUrl)
const heads=[...prince.matchAll(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi)]
const princeChapters=heads.filter(h=>/^(PREMIER CHAPITRE|CHAPITRE [IVX]+)$/.test(decode(h[0]))).map((h,i)=>{
  const end=heads.find(x=>x.index>h.index)?.index ?? prince.length
  const paragraphs=[...prince.slice(h.index+h[0].length,end).matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].map(p=>decode(p[1])).filter(Boolean)
  if(!paragraphs.length)throw Error(`Prince empty chapter ${i+1}`)
  return {order:i+2,title:decode(h[0]),paragraphs:paragraphs.map((text,i)=>({id:`p${i+1}`,text})),sourceSha256:sha(paragraphs.join('\n\n'))}
})
if(princeChapters.length!==27)throw Error('Prince must contain exactly 27 chapters')
const dedicationStart=prince.indexOf('À LÉON WERTH',prince.indexOf('À propos de cette édition électronique')+10)
const dedicationHtml=prince.slice(dedicationStart,heads[0].index)
const dedicationTexts=[...dedicationHtml.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].map(p=>decode(p[1])).filter(Boolean)
if(!dedicationTexts.join('').includes('Je demande pardon'))throw Error('Prince dedication missing')
books.push({id:'zh-classic-prince',title:'小王子',author:'安托万·德·圣埃克苏佩里',deathYear:1944,sourceLang:'fr',expected:28,scope:'献词及原作完整二十七章，独立中文全译；公版判断限中国法域，法国仍有特殊保护期',ageStage:'9-12',sourceUrl:princeUrl,sourceSha256:sha(prince),sourceNote:'以1943年法文原作中国保护期届满为依据；不依赖来源网站电子版的非商业授权。未复制该站版式、插画、编辑说明或任何现代中文译本。',chapters:[{order:1,title:'À LÉON WERTH',paragraphs:dedicationTexts.map((text,i)=>({id:`p${i+1}`,text})),sourceSha256:sha(dedicationTexts.join('\n\n'))},...princeChapters]})
await writeFile(`${out}/source-corpus.json`,JSON.stringify({schema:1,books},null,2)+'\n')
console.log(`Saved ${books.length} books. No publication performed.`)
