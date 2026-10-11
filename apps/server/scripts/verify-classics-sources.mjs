/** Verify the locked source inventory independently of translation readiness. */
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { sha, splitChapter } from './classics-shared.mjs'

const here=dirname(fileURLToPath(import.meta.url))
const out=resolve(process.argv[2]||'../../output/classics-20261010')
const inventory={andersen:[10,444],grimm:[12,242],aesop:[24,37],willows:[12,916],oz:[25,1109],alice:[12,799],garden:[65,247],nils:[55,3012],prince:[28,741]}
const locked=JSON.parse(await readFile(resolve(here,'corpus-data/classics/source-corpus.json'),'utf8'))
const working=JSON.parse(await readFile(resolve(out,'source-corpus.json'),'utf8'))
const failures=[],books=[]
if(locked.books.length!==9||working.books.length!==9)failures.push('Expected exactly nine source books')
for(const [slug,[chapterCount,paragraphCount]] of Object.entries(inventory)){
  const id=`zh-classic-${slug}`
  const book=locked.books.find(b=>b.id===id),draft=working.books.find(b=>b.id===id)
  if(!book||!draft){failures.push(`Missing locked source: ${id}`);continue}
  if(book.expected!==chapterCount||book.chapters.length!==chapterCount||book.chapters.reduce((n,c)=>n+c.paragraphs.length,0)!==paragraphCount)failures.push(`Source inventory mismatch: ${id}`)
  if(JSON.stringify(book)!==JSON.stringify(draft))failures.push(`Working corpus differs from locked corpus: ${id}`)
  for(const [i,ch] of book.chapters.entries()){
    if(ch.order!==i+1||ch.paragraphs.some((p,k)=>p.id!==`p${k+1}`||!p.text.trim()))failures.push(`Source paragraph/order mismatch: ${id}:${ch.order}`)
    if(sha(ch.paragraphs.map(p=>p.text).join('\n\n'))!==ch.sourceSha256)failures.push(`Source chapter hash mismatch: ${id}:${ch.order}`)
  }
  if(slug==='nils'){
    if(book.chapters.reduce((n,c)=>n+c.sections.length,0)!==97)failures.push('Nils requires all 97 original source sections')
    const index=await readFile(resolve(out,'sources/nils-index.txt'),'utf8')
    if(sha(index)!==book.sourceSha256)failures.push('Nils index hash mismatch')
    for(const section of book.chapters.flatMap(c=>c.sections)){
      const key=new URL(section.sourceUrl).pathname.split('/').at(-1).replace(/\.html$/,'')
      if(sha(await readFile(resolve(out,`sources/nils-${key}.txt`),'utf8'))!==section.sha256)failures.push(`Nils raw section hash mismatch: ${key}`)
    }
  }else{
    const file=slug==='prince'?'prince-french':slug
    if(sha(await readFile(resolve(out,`sources/${file}.txt`),'utf8'))!==book.sourceSha256)failures.push(`Raw source hash mismatch: ${id}`)
  }
  books.push({id,chapters:book.chapters.length,paragraphs:paragraphCount,translationUnits:book.chapters.flatMap(c=>splitChapter(book,c)).length})
}
const report={books,chapters:books.reduce((n,b)=>n+b.chapters,0),paragraphs:books.reduce((n,b)=>n+b.paragraphs,0),translationUnits:books.reduce((n,b)=>n+b.translationUnits,0),failures}
await writeFile(resolve(out,'source-readiness.json'),JSON.stringify(report,null,2)+'\n')
console.log(JSON.stringify(report))
if(failures.length)process.exitCode=1
