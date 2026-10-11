/** Independent translations of locked public-domain originals. No DB writes. */
import { readFile, writeFile, mkdir, rename } from 'node:fs/promises'
import { resolve } from 'node:path'
import dotenv from 'dotenv'
import { sha, splitChapter, completeTranslationTitle, untranslatedLatinParagraphIds, validateTranslation as validate } from './classics-shared.mjs'

dotenv.config({ quiet: true })
const out=resolve(process.argv.slice(2).find(a=>!a.startsWith('--')) || '../../output/classics-20261010')
const model=process.env.TAO_TRANSLATION_MODEL || 'agnes-3.0-flash'
const reviewModel=process.env.TAO_TRANSLATION_REVIEW_MODEL || 'agnes-3.0-flash'
const enableThinking=process.env.TAO_TRANSLATION_THINKING !== 'false'
const requestIntervalMs=Number(process.env.TAO_TRANSLATION_REQUEST_INTERVAL_MS||15000)
if(!Number.isFinite(requestIntervalMs)||requestIntervalMs<15000)throw Error('Translation request interval must be at least 15000 milliseconds')
const base=process.env.TAO_TRANSLATION_BASE || process.env.TAO_IMAGE_BASE
const key=process.env.TAO_TRANSLATION_KEY || process.env.TAO_IMAGE_KEY
if(!base || !key)throw Error('Translation provider missing')
const corpus=JSON.parse(await readFile(`${out}/source-corpus.json`,'utf8'))
const selected=process.argv.find(a=>a.startsWith('--book='))?.slice(7).split(',')
const requestedConcurrency=Number(process.argv.find(a=>a.startsWith('--concurrency='))?.slice(14)||4)
if(!Number.isInteger(requestedConcurrency)||requestedConcurrency<1)throw Error('Concurrency must be a positive integer')
const concurrency=Math.min(8,requestedConcurrency)
if(selected)corpus.books=corpus.books.filter(b=>selected.includes(b.id))
if(!corpus.books.length)throw Error('No matching source books')
const glossaries={
  'zh-classic-grimm':'Cinderella=灰姑娘；Snow-white=白雪公主；Briar-rose=蔷薇公主；turtle-doves=斑鸠；crop（鸟）=嗉囊；stay-laces=束腰带；kettledrum=定音鼓；猫坐炉边spin在此指呼噜呼噜地叫，并非纺线。Seven at one stroke=一下打倒七个（保留对象歧义；不要增加刀剑）。',
  'zh-classic-andersen':'《冰雪女王》Kay=凯；Gerda=格尔达；Snow Queen=冰雪女王。不要将白鸡背着小雪橇误译成背着大雪橇；presented arms=举枪敬礼。',
  'zh-classic-willows':'Mole=鼹鼠；Water Rat/Rat=水鼠；Toad=蟾蜍；Badger=獾；Otter=水獭；Portly=胖胖；Toad Hall=蟾蜍庄园。',
  'zh-classic-oz':'Dorothy=多萝西；Toto=托托；Scarecrow=稻草人；Tin Woodman=铁皮樵夫；Cowardly Lion=胆小狮；Oz=奥兹；Glinda=格琳达；Munchkins=芒奇金人；Quadlings=阔德林人；Winkies=温基人。原作鞋子是银鞋，不是红鞋。',
  'zh-classic-alice':'Alice=爱丽丝；White Rabbit=白兔；Hatter=帽匠；March Hare=三月兔；Dormouse=睡鼠；Cheshire Cat=柴郡猫；Mock Turtle=假海龟；Gryphon=鹰头狮；Queen of Hearts=红心王后；Dodo=渡渡鸟；Lory=吸蜜鹦鹉；Dinah=狄娜；Fury=怒怒（诗里的狗，不是狐狸）。原文C/D字母与罗马编号可保留；诗保留分行。',
  'zh-classic-nils':'Nils Holgersson=尼尔斯·豪尔耶松；Akka=阿卡；Mårten=莫顿；Smirre=斯密尔；Dunfin=邓芬；Gorgo=高尔果；Karr=卡尔；Gråfäll=灰皮；Åsa=奥萨；Mats=马茨；Tummetott=拇指头。tomte=小精灵；vildgäss=大雁；tamgås=家鹅；gåskarl=雄鹅（不是男爵或首领）；förargås=领雁；matmor=女主人；vessla=黄鼠狼（不是荨麻）；famn=臂弯（不是衣兜）；dikt按语境可指虚构之事，不总是诗。忠实保留全部地理历史支线。完整理解瑞典语句法与上下文，严禁逐词拼凑成不通顺的中文；数词与单复数、方位、动作和代词指代必须准确。所有人名、地名、动物名用中文，不遗留外文词。',
  'zh-classic-prince':'petit prince=小王子；aviateur=飞行员；renard=狐狸；rose=玫瑰；baobab=猴面包树；B 612=B612。',
}
glossaries['zh-classic-nils'] += ' 物种严格区分：mård=貂（不是莫顿这只鹅）；utter=水獭（不是水貂）；vessla=黄鼠狼；Sirle=西尔勒（松鼠，不是狐狸斯密尔）；kajor=寒鸦；råkor=秃鼻乌鸦；korpar=渡鸦；orrar=黑琴鸡；tjädrar=松鸡；rapphöns=灰山鹑；gravänder/grav-änder=翘鼻麻鸭；lommar=潜鸟；storlom=黑喉潜鸟；smålom=红喉潜鸟；tornuggla=仓鸮；häger=苍鹭；stork=鹳；snäppor=鹬类；rådjur=狍子；hägg=稠李。kummin=葛缕子；märgelgrav=泥灰坑；mil是瑞典里程单位，通常约十公里，绝非英里。Ronneby=龙讷比；Blekinge=布莱金厄；Vombsjön=沃姆湖；Övedskloster=厄韦兹修道院；Ermenrich=厄尔姆里希；Gripe=格里佩；bronskarlen=铜人（铜像，不是铜匠）；träkarlen=木人（木像，不是木匠）；Rosenbom=罗森布姆；högbåtsman=水手长；Dristigheten=勇敢号。'
glossaries['zh-classic-nils'] += ' älg/älgko/älgtjur/älgkalv=驼鹿/母驼鹿/公驼鹿/小驼鹿，绝不是驯鹿或麋鹿；ren=驯鹿；stamfränder=同族或同类，绝非祖先；asp=山杨；al=桤木；fura/tall=松树；risplockare=拾柴人；Kolmården=科尔莫登；Östergötland=东约特兰；Sörmland=南曼兰；Norrköping=北雪平；Göta kanal=耶塔运河；bofink=苍头燕雀；mes=山雀；sparvhök=雀鹰；gåsapiga=放鹅姑娘；famn作为长度单位=噚（约1.8米）；Gåskarlen始终指雄鹅，不能误写成老鹰高尔果；fullsövd=睡足了，不能误写吃饱了；koppel=牵狗绳；hundgrav=狗的坟坑。认真保留行为主语，不能把驼鹿跳过围栏写成狗跳过围栏。'
await mkdir(`${out}/translations`,{recursive:true})
const jobs=[]
for(const book of corpus.books)for(const ch of book.chapters)jobs.push(...splitChapter(book,ch))
if(selected)jobs.sort((a,b)=>selected.indexOf(a.bookId)-selected.indexOf(b.bookId))
const unit=process.argv.find(a=>a.startsWith('--unit='))?.slice(7)
if(unit){
  const matching=jobs.filter(job=>`${job.bookId}/${job.chapter}/${job.part}`===unit)
  if(matching.length!==1)throw Error('Unit must identify one known book/chapter/part')
  jobs.splice(0,jobs.length,...matching)
}
let halted=false
let rateQueue=Promise.resolve(),nextRequestAt=0,blockedUntil=0
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms))
async function acquireRequest(){
  const turn=rateQueue.then(async()=>{
    if(halted)throw Error('Provider unavailable; batch halted')
    while(Date.now()<Math.max(nextRequestAt,blockedUntil)){
      await delay(Math.min(1_000,Math.max(nextRequestAt,blockedUntil)-Date.now()))
      if(halted)throw Error('Provider unavailable; batch halted')
    }
    nextRequestAt=Date.now()+requestIntervalMs
  })
  rateQueue=turn.catch(()=>{})
  await turn
}
async function call(system,user,requestModel=model){
  if(halted)throw Error('Provider unavailable; batch halted')
  let r
  for(let retry=0;retry<4;retry++){
    await acquireRequest()
    if(halted)throw Error('Provider unavailable; batch halted')
    try{
      r=await fetch(`${base.replace(/\/$/,'')}/chat/completions`,{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({model:requestModel,temperature:0.1,max_tokens:24000,stream:false,response_format:{type:'json_object'},chat_template_kwargs:{enable_thinking:enableThinking},messages:[{role:'system',content:system},{role:'user',content:user}]}),signal:globalThis.AbortSignal.timeout(360_000)})
    }catch{
      if(retry===3){halted=true;throw Error('Provider network unavailable; retry budget exhausted')}
      blockedUntil=Math.max(blockedUntil,Date.now()+30_000*2**retry)
      console.warn('Provider network/timeout failure; retrying the same request with backoff')
      continue
    }
    if(r.status!==429&&r.status<500)break
    if(retry===3){halted=true;throw Error(`Provider unavailable: HTTP ${r.status}; retry budget exhausted`)}
    const header=r.headers.get('retry-after')
    const seconds=Number(header)
    const waitMs=Number.isFinite(seconds)&&seconds>0?seconds*1000:Math.max(0,Date.parse(header||'')-Date.now())||30_000*2**retry
    blockedUntil=Math.max(blockedUntil,Date.now()+waitMs)
    await r.body?.cancel()
    console.warn(`Provider HTTP ${r.status}; honoring retry delay ${Math.ceil(waitMs/1000)}s`)
  }
  if(!r.ok){
    const body=await r.json().catch(()=>({}))
    const code=body.error?.code
    // Authentication/quota errors cannot be repaired by retrying every chapter.
    // Never print provider messages: some providers echo request credentials.
    if(r.status===401 || code==='insufficient_user_quota' || code==='insufficient_quota'){
      halted=true
      throw Error(`Provider unavailable: HTTP ${r.status}; ${r.status===401?'authentication':'quota'}`)
    }
    throw Error(`Provider HTTP ${r.status}`)
  }
  const j=await r.json(),c=j.choices?.[0]
  if(!c?.message?.content || c.finish_reason==='length')throw Error('Incomplete model response')
  const text=c.message.content.trim().replace(/^```(?:json)?\s*/,'').replace(/\s*```$/,'')
  try{return JSON.parse(text)}catch{throw Error('Non-JSON translation response')}
}
let cursor=0,done=0,failed=0
async function worker(){
  while(cursor<jobs.length&&!halted){const job=jobs[cursor++],hash=sha(JSON.stringify(job)),file=`${out}/translations/${job.bookId}-${job.chapter}-${job.part}.json`
    let candidate,originalModel
    try{const old=JSON.parse(await readFile(file,'utf8'));if(old.sourceSha256===hash&&old.review?.ok===true&&Array.isArray(old.review.problems)&&!old.review.problems.length){
      try{validate(job,old.translation);done++;continue}catch(e){if(e.message!=='Untranslated Latin word in Chinese narration')throw e;candidate=old.translation;originalModel=old.model}
    }}catch{/* create or repair */}
    if(!candidate)try{
      const diagnostic=JSON.parse(await readFile(`${out}/diagnostics/${job.bookId}-${job.chapter}-${job.part}-final-review.json`,'utf8'))
      if(sha(JSON.stringify(diagnostic.job))===hash){
        validate(job,diagnostic.translation)
        candidate=diagnostic.translation
        originalModel=diagnostic.translationModel||'agnes-3.0-flash'
      }
    }catch{/* No structurally intact draft. The next call creates one. */}
    let error
    for(let attempt=1;attempt<=3&&!halted;attempt++)try{
      // Source comparisons may finish while a provider request is in flight.
      // Preserve those approved corrections when resuming a failed candidate.
      let compared
      try { compared=JSON.parse(await readFile(file,'utf8')) } catch { /* Not yet reviewed. */ }
      if(compared?.sourceSha256===hash&&compared.reviewModel==='Codex source comparison'&&compared.review?.ok===true&&Array.isArray(compared.review.problems)&&!compared.review.problems.length){
        validate(job,compared.translation)
        done++;error=null;console.log(`${done}/${jobs.length} ${job.bookId} chapter ${job.chapter} part ${job.part} source comparison retained`);break
      }
      const system=`你是严谨的儿童文学译者。独立翻译给定公版原文为自然、准确的简体中文。这是全译，禁止摘要、删节、合并段落、改写情节或增加教训。保留每句对话、重复、诗歌、叙事、日期和支线；诗保留分行。只利用输入原文，禁止借用任何现代出版中译本。人名、地名保持一致。${glossaries[job.bookId]||''} 输出JSON：{"title":"翻译输入title字段的完整中文章节名（不加编号；不可用本段内部的小标题替代）","scene":"本段的一个具体插图画面，人物外貌和环境准确，中文描述至少20字","paragraphs":[{"id":"原id","zh":"整段中文全译"}]}。保持段落id及顺序。第一段或最后一段也必须完整翻译。`
      let translation=completeTranslationTitle(job,candidate||await call(system,JSON.stringify(job)));
      candidate=translation
      const latinIds=new Set(untranslatedLatinParagraphIds(translation))
      if(latinIds.size){
        const repairJob={...job,paragraphs:job.paragraphs.filter(p=>latinIds.has(p.id))}
        const repair=await call(system,JSON.stringify({...repairJob,instruction:'完整翻译这些段落。人物和地点名字也使用中文译名；正文不夹英文。仅原文标牌或专名首次介绍可在中文译名后括注原文。'}))
        repair.title=translation.title;repair.scene=translation.scene
        validate(repairJob,repair)
        const fixes=new Map(repair.paragraphs.map(p=>[p.id,p]))
        translation={...translation,paragraphs:translation.paragraphs.map(p=>fixes.get(p.id)||p)}
      }
      candidate=translation
      await mkdir(`${out}/diagnostics`,{recursive:true})
      await writeFile(`${out}/diagnostics/${job.bookId}-${job.chapter}-${job.part}-translation.json`,JSON.stringify({job,translation,translationModel:originalModel||model},null,2)+'\n')
      validate(job,translation)
      const reviewInstruction='你是全文译文校对员。对输入每一个原文段落与译文逐句对照，检查漏译、把全文改为摘要、错译、说话人错误、添加原文不存在的情节、人名不一致、把普通外语词夹在中文句子中没有翻译。重点核实物种、数量、方向、动作、否定和指代，不能只挑措辞却漏掉情节。忽略不影响意思的措辞差异及合理的人称/语境处理，不将一种合理译法错误地改为另一种偏好译法。遵守给定术语表。瑞典语sextonhundratalet是17世纪，sjuttonhundratalet是18世纪；半月可以译半轮明月，不可因明月二字声称原文是满月。不要自行写新故事，也不要为了找问题强行否定准确译文。输出JSON：{"ok":true或false,"problems":[{"id":"有问题的原文段落id，每条只填一个id","reason":"仅用一句话描述已确认的实质性错误，并引用该id段落中的原文和译文，不输出猜测或思考过程"}]}。每条问题必须有与该id对应的明确证据；不得混入其他段落的问题。你自己判定可接受、合理或无问题的译法不得放入problems。只有没有实质性问题才ok=true。'
      let review=await call(reviewInstruction,JSON.stringify({job,translation,glossary:glossaries[job.bookId]}),reviewModel)
      await writeFile(`${out}/diagnostics/${job.bookId}-${job.chapter}-${job.part}-review.json`,JSON.stringify({job,translation,review},null,2)+'\n')
      for(let repairRound=0;review.ok!==true&&repairRound<3;repairRound++){
        if(!Array.isArray(review.problems)||!review.problems.length)throw Error('Review has no actionable paragraph IDs')
        const ids=new Set(review.problems.map(p=>p.id))
        const repairJob={...job,paragraphs:job.paragraphs.filter(p=>ids.has(p.id))}
        if(repairJob.paragraphs.length!==ids.size)throw Error('Review contains unknown paragraph IDs')
        const repaired=completeTranslationTitle(job,await call(system,JSON.stringify({...repairJob,corrections:review.problems,instruction:'根据原文与校对意见重新准确全译这些段落。返回要求的title,scene,paragraphs全部字段。'})))
        // Paragraph repair does not replace the already validated chapter
        // metadata. Some providers correctly omit it in a partial response.
        if(repaired===null || typeof repaired!=='object')throw Error('Invalid paragraph repair response')
        repaired.title=translation.title
        repaired.scene=translation.scene
        validate(repairJob,repaired)
        const fixes=new Map(repaired.paragraphs.map(p=>[p.id,p]))
        translation={...translation,paragraphs:translation.paragraphs.map(p=>fixes.get(p.id)||p)}
        validate(job,translation)
        candidate=translation
        review=await call(reviewInstruction,JSON.stringify({job,translation,glossary:glossaries[job.bookId]}),reviewModel)
        await writeFile(`${out}/diagnostics/${job.bookId}-${job.chapter}-${job.part}-final-review.json`,JSON.stringify({job,translation,review,translationModel:originalModel||model},null,2)+'\n')
      }
      await writeFile(`${out}/diagnostics/${job.bookId}-${job.chapter}-${job.part}-final-review.json`,JSON.stringify({job,translation,review,translationModel:originalModel||model},null,2)+'\n')
      if(review.ok!==true || !Array.isArray(review.problems) || review.problems.length)throw Error('Fidelity review failed')
      // A source comparison can finish during any upstream call, including
      // the last review. Do not overwrite it with an older in-flight draft.
      let latest
      try { latest=JSON.parse(await readFile(file,'utf8')) } catch { /* New unit. */ }
      if(latest?.sourceSha256===hash&&latest.reviewModel==='Codex source comparison'&&latest.review?.ok===true&&Array.isArray(latest.review.problems)&&!latest.review.problems.length){
        validate(job,latest.translation)
        done++;error=null;console.log(`${done}/${jobs.length} ${job.bookId} chapter ${job.chapter} part ${job.part} source comparison retained`);break
      }
      const record={sourceSha256:hash,model:originalModel||model,...(originalModel?{revisionModel:model}:{}),reviewModel,translation,review}
      await writeFile(`${file}.tmp`,JSON.stringify(record,null,2)+'\n');await rename(`${file}.tmp`,file)
      done++;console.log(`${done}/${jobs.length} ${job.bookId} chapter ${job.chapter} part ${job.part} reviewed`);error=null;break
    }catch(e){
      error=e
      // Keep a structurally valid candidate through a transient review outage.
      // An invalid structure must be regenerated rather than retried unchanged.
      // A fidelity review may identify another local correction after repair.
      // Keep the current full translation and repair it rather than discarding
      // already corrected paragraphs and creating new errors in a fresh draft.
      if(['Paragraph count mismatch','Paragraph identity mismatch','Suspiciously short translation','Translation contains placeholder','Translation contains output markup','Poem stanza lost line breaks','Missing Chinese title','Missing scene description'].includes(e.message))candidate=undefined
      console.warn(`${job.bookId} ${job.chapter}/${job.part}: attempt ${attempt} ${e.message}`)
    }
    if(error){failed++;console.error(`FAILED ${job.bookId} ${job.chapter}/${job.part}`)}
  }
}
console.log(`Translating ${corpus.books.length} books, ${jobs.length} units; concurrency ${concurrency}`)
await Promise.all(Array.from({length:concurrency},()=>worker()))
console.log(JSON.stringify({units:jobs.length,done,failed,halted,pending:jobs.length-done}))
if(failed||halted)process.exitCode=1
