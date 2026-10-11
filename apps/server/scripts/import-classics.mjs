/** Publication fails closed: no pack is emitted until all selected originals
 * have a reviewed translation for every source paragraph in original order. */
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { sha, splitChapter, validateTranslation, untranslatedLatinParagraphIds, willowsTitles, aliceTitles, ozTitles, gardenTitles, nilsTitles, princeTitles } from './classics-shared.mjs'
import { checkedClassicScene, checkedClassicCover } from './classics-art-scenes.mjs'

const here=dirname(fileURLToPath(import.meta.url))
const out=resolve(process.argv.slice(2).find(a=>!a.startsWith('--'))||'../../output/classics-20261010')
const corpus=JSON.parse(await readFile(`${out}/source-corpus.json`,'utf8'))
const packs=[],draftBooks=[],failures=[],manifest=[]
const andersenTitles=['皇帝的新衣','豌豆公主','枞树','冰雪女王','跳高者','接骨木树妈妈','幸福的家庭','衬衫领子','卖火柴的小女孩','顽皮的孩子']
const grimmTitles=['青蛙王子（铁亨利）','狼和七只小山羊','长发姑娘','汉塞尔与格蕾特','勇敢的小裁缝','灰姑娘','霍勒大妈','小红帽','不来梅的城市乐队','睡美人','白雪公主','甜粥']
const aesopTitles=['狮子和老鼠','狼和小羊','父亲和儿子们','蚂蚁和蚱蜢','龟兔赛跑','狗和影子','农夫和蛇','狐狸和山羊','熊和两个旅人','披着羊皮的狼','守财奴','青蛙求王','狐狸和葡萄','北风和太阳','母鸡和金蛋','挤奶女和她的奶桶','乌鸦和水罐','狐狸和乌鸦','男孩们和青蛙','橡树和芦苇','牧童和狼','城里老鼠和乡下老鼠','狐狸和鹤','驴和小狗']
const alicePoems={2:[11,12],3:[34],5:[27,28,29,30,31,32,33,34],6:[36,40],7:[49,53],10:[24,25,26,58,59,69,70,76,77],11:[12],12:[41,42,43,44,45,46]}
const andersenSourceNote='十篇英译措辞分别有1847年《幸运的套鞋及其他童话》、1848年《没有图画的画册及其他故事》、十九世纪《圣诞问候》等早期出版见证。《豌豆公主》沿用此底本的三颗豌豆版本。'
for(const book of corpus.books){
  const chapters=[]
  for(const ch of book.chapters){
    if(sha(ch.paragraphs.map(p=>p.text).join('\n\n'))!==ch.sourceSha256){failures.push({book:book.id,chapter:ch.order,reason:'locked source paragraph hash mismatch'});continue}
    const jobs=splitChapter(book,ch)
    const translated=[];let title,scene
    for(const job of jobs){
      const path=`${out}/translations/${book.id}-${ch.order}-${job.part}.json`
      try{
        const r=JSON.parse(await readFile(path,'utf8'))
        if(r.sourceSha256!==sha(JSON.stringify(job)))throw Error('source changed')
        if(r.review?.ok!==true||!Array.isArray(r.review.problems)||r.review.problems.length)throw Error('fidelity review missing or failed')
        validateTranslation(job,r.translation)
        const ps=r.translation?.paragraphs
        if(!Array.isArray(ps)||ps.length!==job.paragraphs.length||ps.some((p,i)=>p.id!==job.paragraphs[i].id||typeof p.zh!=='string'||!p.zh.trim()))throw Error('paragraph coverage mismatch')
        translated.push(...ps)
        title??=r.translation.title;scene??=r.translation.scene
      }catch(e){failures.push({book:book.id,chapter:ch.order,part:job.part,reason:e.code==='ENOENT'?'translation missing':e.message})}
    }
    if(translated.length!==ch.paragraphs.length)continue
    if(book.id==='zh-classic-andersen')title=andersenTitles[ch.order-1]
    if(book.id==='zh-classic-grimm')title=grimmTitles[ch.order-1]
    if(book.id==='zh-classic-aesop')title=aesopTitles[ch.order-1]
    if(book.id==='zh-classic-willows')title=willowsTitles[ch.order-1]
    if(book.id==='zh-classic-alice')title=aliceTitles[ch.order-1]
    if(book.id==='zh-classic-oz')title=ozTitles[ch.order-1]
    if(book.id==='zh-classic-garden')title=gardenTitles[ch.order-1]
    if(book.id==='zh-classic-nils')title=nilsTitles[ch.order-1]
    if(book.id==='zh-classic-prince')title=princeTitles[ch.order-1]
    if(!/\p{Script=Han}/u.test(title)||untranslatedLatinParagraphIds({paragraphs:[{id:'title',zh:title}]}).length){failures.push({book:book.id,chapter:ch.order,reason:'chapter title missing Chinese'});continue}
    const art=`${book.id}:ch${ch.order}`
    scene=checkedClassicScene(book.id,ch.order,scene)
    const notes=book.id==='zh-classic-alice'&&ch.order===3?[{kind:'note',text:'译注：原文的 dry 既表示“干燥”，也表示“枯燥”；tale（故事）和 tail（尾巴）、not（没有）和 knot（结）各自同音，因此爱丽丝接连听错。C 和 D 是 cat（猫）与 dog（狗）的首字母，她怕老鼠生气，故意只说字母。'}]:book.id==='zh-classic-garden'&&ch.order===1?[{kind:'note',text:'译注：本诗献给照料作者童年的保姆艾莉森·坎宁安。“第二位母亲”“第一位妻子”是原诗表达亲近与感激的称呼。'}]:book.id==='zh-classic-garden'&&ch.order===29?[{kind:'note',text:'阅读提示：这首十九世纪的诗用英国孩子的口吻想象其他地方，带有当时的民族偏见，也使用了一些如今不再通行的称呼。不同地方的孩子都同样值得尊重。'}]:[]
    chapters.push({title,art,artPrompt:scene,blocks:[{kind:'image',art,text:`${title}插图`},...translated.map(p=>({kind:book.id.endsWith('garden')||(book.id==='zh-classic-alice'&&alicePoems[ch.order]?.includes(Number(p.id.slice(1))))?'poem':'text',text:p.zh})),...notes]})
    manifest.push({book:book.id,chapter:ch.order,title,paragraphs:translated.length,sourceSha256:ch.sourceSha256,translationSha256:sha(translated.map(p=>p.zh).join('\n\n'))})
  }
  const coverArtPrompt=chapters.length?checkedClassicCover(book.id,book.title,chapters[0].artPrompt):undefined
  draftBooks.push({id:book.id,title:book.title,lang:'zh',coverArtPrompt,complete:chapters.length===book.expected,chapters})
  if(chapters.length!==book.expected)continue
  packs.push({id:book.id,title:book.title,author:`${book.author} · 桃阅读 AI 辅助全译`,lang:'zh',category:book.id.endsWith('garden')?'poetry':'tale',ageStage:book.ageStage,intro:`${book.scope}。本版译文为 AI 辅助独立翻译，配桃阅读 AI 插图。`,coverArt:`cover:${book.id}`,coverArtPrompt,coverFrom:'#F6C667',coverTo:'#8ED4C2',source:`公版原作／${book.intermediateTranslator||'原文'}；桃阅读 AI 辅助中文全译`,chapters,rights:{workTitle:book.title,author:book.author,authorDeathYear:book.deathYear,translator:'桃阅读（AI 辅助独立翻译）',jurisdiction:'CN',basis:'pd-70',sourceUrl:book.sourceUrl,note:`${book.scope}。未使用受保护的现代中文译文；插图另行 AI 生成。${book.sourceNote||''}${book.id==='zh-classic-andersen'?andersenSourceNote:''}`}})
}
const report={books:corpus.books.length,completeBooks:packs.length,chapters:manifest.length,pendingUnits:failures.length,failures}
await writeFile(`${out}/import-readiness.json`,JSON.stringify(report,null,2)+'\n')
// Isolated media preparation only. This snapshot is never registered or seeded.
await writeFile(`${out}/prepared-chapters.json`,JSON.stringify({draft:true,books:draftBooks},null,2)+'\n')
console.log(JSON.stringify({...report,failures:failures.slice(0,8)}))
const expectedIds=['andersen','grimm','aesop','willows','oz','alice','garden','nils','prince'].map(id=>`zh-classic-${id}`)
if(failures.length||packs.length!==9||new Set(packs.map(p=>p.id)).size!==9||packs.some(p=>!expectedIds.includes(p.id))){console.error('Incomplete corpus: no pack emitted or database mutated.');process.exitCode=1}else if(process.argv.includes('--validate-only')){
  console.log('All nine translations complete; validation only, no pack emitted.')
}else{
  await mkdir(`${here}/corpus-data/classics`,{recursive:true})
  await writeFile(`${here}/corpus-data/classics/manifest.json`,JSON.stringify(manifest,null,2)+'\n')
  await writeFile(`${here}/../src/content/packs/chinese-classics.ts`,`import type { PackBook } from '../types'\n\n/** Independent full translations of verified public-domain originals. */\nexport const chineseClassics: PackBook[] = ${JSON.stringify(packs,null,2)}\n`)
  console.log('All nine complete source packs emitted; media and publication gates still required.')
}
