/** Stage only these nine books in an isolated SQLite database. Never seed demo,
 * families, or the full catalogue; do not infer human review from AI checks. */
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve, relative, isAbsolute } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { spawnSync } from 'node:child_process'
import { PrismaClient, type Prisma } from '@prisma/client'
import { seedPackTransaction, packContentVersion } from '../src/content/seed'
import type { PackBook } from '../src/content/types'

const here=dirname(fileURLToPath(import.meta.url))
const out=resolve(process.argv.find(a=>a.startsWith('--out='))?.slice(6)||'../../output/classics-20261010')
const database=process.argv.find(a=>a.startsWith('--database='))?.slice(11)
if(!database?.startsWith('file:'))throw Error('An explicit isolated --database=file:ABSOLUTE_PATH is required')
const target=resolve(database.slice(5))
const child=relative(out,target)
if(!child||child.startsWith('..')||isAbsolute(child)||!target.endsWith('.db'))throw Error('Staging database must be inside this task output directory')

// Re-run source/translation/media gates immediately before the first DB write.
for(const script of ['verify-classics-sources.mjs','import-classics.mjs','verify-classics-draft.mts']){
  const args=script.endsWith('.mts')?['--import','tsx',join(here,script),out]:[join(here,script),out,...(script==='import-classics.mjs'?['--validate-only']:[])]
  const result=spawnSync(process.execPath,args,{cwd:resolve(here,'..'),encoding:'utf8',timeout:240_000})
  if(result.error||result.status!==0)throw Error(`Staging rejected by ${script}; inspect this task readiness reports`)
}
const generated=await import(pathToFileURL(resolve(here,'../src/content/packs/chinese-classics.ts')).href) as {chineseClassics:PackBook[]}
const packs=generated.chineseClassics
const expected=['andersen','grimm','aesop','willows','oz','alice','garden','nils','prince'].map(s=>`zh-classic-${s}`)
if(packs.length!==9||new Set(packs.map(p=>p.id)).size!==9||packs.some(p=>!expected.includes(p.id)))throw Error('Unexpected classics release scope')
const snapshot=JSON.parse(await readFile(join(out,'prepared-chapters.json'),'utf8')) as {books:Array<{id:string;chapters:PackBook['chapters']}>}
for(const pack of packs){
  if(JSON.stringify(snapshot.books.find(b=>b.id===pack.id)?.chapters)!==JSON.stringify(pack.chapters))throw Error(`Generated pack is stale: ${pack.id}`)
}
const art=JSON.parse(await readFile(join(out,'media/.classics-art.json'),'utf8')) as Record<string,{scene:string;kind:string;urlPath:string;width:number;height:number;bytes:number;prompt:string;model:string;inputSha256:string}>
const scenes=[...new Set(packs.flatMap(p=>[p.coverArt,...p.chapters.map(c=>c.art!)]))]
const assets:Prisma.ArtAssetCreateManyInput[]=[]
for(const scene of scenes){
  const a=art[scene]
  if(!a||a.scene!==scene||!a.urlPath.startsWith('/api/media/art/')||a.urlPath.includes('..'))throw Error(`Invalid staged illustration: ${scene}`)
  const bytes=(await readFile(join(out,'media',a.urlPath.slice('/api/media/'.length)))).length
  // Generation ledger byte count may precede required AI labelling/compression.
  // Seed the actual current bytes, never the stale response size.
  assets.push({scene:a.scene,kind:a.kind,urlPath:a.urlPath,width:a.width,height:a.height,bytes,prompt:a.prompt,model:a.model})
}
const db=new PrismaClient({datasources:{db:{url:`file:${target.replace(/\\/g,'/')}`}}})
try{
  if(await db.family.count()||await db.childProfile.count()||await db.book.count({where:{id:{notIn:expected}}}))throw Error('Staging target contains unrelated user/catalogue data')
  await db.$transaction(async tx=>{
    for(const pack of packs)await seedPackTransaction(tx,pack)
    for(const a of assets)await tx.artAsset.upsert({where:{scene:a.scene},create:a,update:a})
  },{timeout:300_000})
  for(const pack of packs){
    const book=await db.book.findUniqueOrThrow({where:{id:pack.id},include:{chapters:{orderBy:{order:'asc'},include:{blocks:{orderBy:{order:'asc'}}}}}})
    if(book.contentVersion!==packContentVersion(pack)||book.chapters.length!==pack.chapters.length||book.reviewStatus!=='pending')throw Error(`Invalid staged book/version/review state: ${pack.id}`)
    for(const [i,ch] of book.chapters.entries()){
      const source=pack.chapters[i]
      if(!source)throw Error(`Unexpected staged chapter: ${pack.id}:${ch.order}`)
      if(ch.title!==source.title||ch.art!==(source.art??null)||JSON.stringify(ch.blocks.map(b=>({kind:b.kind,text:b.text,art:b.art??null})))!==JSON.stringify(source.blocks.map(b=>({kind:b.kind,text:b.text,art:b.art??null}))))throw Error(`Staged text differs from pack: ${pack.id}:${ch.order}`)
    }
  }
  const integrity=await db.$queryRawUnsafe<Array<{integrity_check:string}>>('PRAGMA integrity_check')
  if(integrity[0]?.integrity_check!=='ok')throw Error('Staging integrity check failed')
  const report={books:packs.map(p=>({id:p.id,contentVersion:packContentVersion(p),chapters:p.chapters.length})),illustrations:assets.length,integrity:'ok',reviewStatus:'pending',note:'Independent AI-assisted translations; no professional human review claimed.'}
  await writeFile(join(out,'staging-readiness.json'),JSON.stringify(report,null,2)+'\n')
  console.log(JSON.stringify(report))
}finally{await db.$disconnect()}
