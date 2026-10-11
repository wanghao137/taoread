/** Regenerate flagged narration without changing the runtime text or cache key.
 * Run alone as a TTS manifest writer, then rerun the content verifier. */
import dotenv from 'dotenv'
import { readFile, writeFile, readdir, rename, mkdir } from 'node:fs/promises'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { resolve, join } from 'node:path'
import { createHash } from 'node:crypto'
import { loadConfig } from '../src/config'
import { synthesizeSegment, TtsError, chunkText, narrationInput as classicNarrationInput } from '../src/modules/tts/client'
import { findVoice, DEFAULT_SPEED } from '../src/modules/tts/voices'
import { chapterSpeakText, speakVoiceId } from '../src/modules/tts/chapterText'
import { cacheKey } from '../src/modules/tts/cache'
import { parseMp3 } from '../src/modules/tts/mp3duration'
import type { PackChapter } from '../src/content/types'
dotenv.config({ quiet: true })
const out=resolve(process.argv.slice(2).find(a=>!a.startsWith('--'))||'../../output/classics-20261010')
const media=join(out,'media'), config=loadConfig()
const ffmpegArg = process.argv.find(a => a.startsWith('--ffmpeg='))?.slice(9)
if (!ffmpegArg) throw Error('Provide --ffmpeg=path for valid MP3 concatenation')
const ffmpeg: string = ffmpegArg
const run = promisify(execFile)
const chunkChars=Number(process.argv.find(a=>a.startsWith('--chunk-chars='))?.slice(14)||100)
if(!Number.isInteger(chunkChars)||chunkChars<20||chunkChars>100)throw Error('Repair chunk size must be between 20 and 100 characters')
const snapshot: {books:Array<{chapters:PackChapter[]}>}=JSON.parse(await readFile(join(out,'prepared-chapters.json'),'utf8'))
const state:Record<string,{bytes:number;durationMs:number;uploaded:boolean}>=JSON.parse(await readFile(join(media,'.tts-public-state.json'),'utf8'))
const sha=(s:string|Buffer)=>createHash('sha256').update(s).digest('hex')
const texts=new Map<string,string>()
const selectedKeysArg=process.argv.find(a=>a.startsWith('--keys='))?.slice(7)
const selectedKeys=selectedKeysArg?new Set(selectedKeysArg.split(',')):null
if(selectedKeys&&[...selectedKeys].some(key=>!/^[a-f0-9]{64}$/.test(key)))throw Error('Invalid selected narration key')
for(const book of snapshot.books)for(const ch of book.chapters)for(const text of chunkText(chapterSpeakText(ch.blocks)))texts.set(cacheKey(text,speakVoiceId('zh'),DEFAULT_SPEED,'mp3','zh','__public__',config.TTS_MODEL),text)
const jobs:Array<{key:string;text:string}>=[]
for(const file of await readdir(join(out,'narration-checks'))){
  if(!/^[a-f0-9]{64}\.json$/.test(file))continue
  const check=JSON.parse(await readFile(join(out,'narration-checks',file),'utf8'))
  if(selectedKeys&&!selectedKeys.has(check.key))continue
  const text=texts.get(check.key)
  if(!text||check.textSha256!==sha(text)||(!selectedKeys&&!(check.needsReview||check.similarity<.90||check.tailSimilarity<.70||check.maxMissingChars>=7||check.maxExtraChars>=7)))continue
  const audio=await readFile(join(media,'tts-public',`${check.key}.mp3`))
  if(check.audioSha256!==sha(audio)||(!selectedKeys&&check.manualReview?.audioSha256===check.audioSha256))continue
  jobs.push({key:check.key,text})
}
console.log(`Repairing ${jobs.length} flagged runtime segments`)
let cursor=0,failed=0,done=0,saves=Promise.resolve(),halted=false
const pause=(ms:number)=>new Promise(r=>setTimeout(r,ms))
const retryFetch:typeof fetch=async(url,init)=>{
  for(let attempt=0;;attempt++){
    let response:Response
    try{response=await fetch(url,{...init,signal:AbortSignal.timeout(180000)})}catch{
      if(attempt>=2)throw Error('Audio network retry budget exhausted')
      await pause(10000*(attempt+1));continue
    }
    if(response.ok||attempt>=2||!(response.status===429||response.status>=500||response.status===401))return response
    await response.body?.cancel();await pause(10000*(attempt+1))
  }
}
async function worker(){
  while(cursor<jobs.length&&!halted){
    const {key,text}=jobs[cursor++]!,voice=findVoice(speakVoiceId('zh'))
    try{
      // Some valid 220-character responses repeat or stop halfway through.
      // Synthesize shorter utterances, retaining the original runtime key and
      // every spoken word. The final combined audio is rechecked by full ASR.
      const pieces:Buffer[]=[]
      const pronunciation = (text.includes('哞') ? ' 拟声词也只朗读汉字，不模仿动物叫声。哞读mōu、第一声，每个音节都必须读出。' : '')
        + (text.includes('凯布讷') ? ' 地名凯布讷读kǎi bù nè，讷念nè而不是lè、nuò。领雁读lǐng yàn，完整读出ng韵尾。' : '')
        + (text.includes('希-啰') || text.includes('埃-佩') ? ' 咒语是中文音译，每个汉字都逐字朗读。不要读成英语，不省略任何音节。' : '')
      for(const piece of chunkText(classicNarrationInput(text),chunkChars)){
        const result=await synthesizeSegment({base:config.TTS_BASE!,apiKey:config.TTS_API_KEY!,model:config.TTS_MODEL,fetch:retryFetch},{text:piece,voice:{...voice,instruction:voice.instruction+' 完整、准确地朗读scripts中的全部文字，读完最后一句。只朗读，不改写、不跳过句子、不重复，不加音乐或音效。'+pronunciation},speed:DEFAULT_SPEED,lang:'zh'})
        if(!parseMp3(result.audio)?.durationMs)throw Error('Invalid MP3 piece')
        pieces.push(result.audio)
      }
      const pieceDir = join(out, 'narration-repair-pieces', key)
      await mkdir(pieceDir, { recursive: true })
      for (const [index, piece] of pieces.entries()) await writeFile(join(pieceDir, `${index}.mp3`), piece)
      await writeFile(join(pieceDir, 'list.txt'), pieces.map((_, index) => `file '${index}.mp3'`).join('\n') + '\n')
      const combined = join(pieceDir, 'combined.mp3')
      await run(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-xerror', '-err_detect', 'explode', '-y',
        '-f', 'concat', '-safe', '1', '-i', join(pieceDir, 'list.txt'), '-codec:a', 'libmp3lame', '-b:a', '128k', combined])
      const audio = await readFile(combined)
      const info=parseMp3(audio)
      if(!info?.durationMs)throw Error('Invalid MP3')
      const path=join(media,'tts-public',`${key}.mp3`)
      await writeFile(`${path}.tmp`,audio);await rename(`${path}.tmp`,path)
      state[key]={bytes:audio.length,durationMs:info.durationMs,uploaded:false}
      saves=saves.then(async()=>{
        const path=join(media,'.tts-public-state.json')
        await writeFile(`${path}.tmp`,JSON.stringify(state,null,2)+'\n');await rename(`${path}.tmp`,path)
      });await saves
      done++;console.log(`Repaired ${done}/${jobs.length}: ${key}`)
    }catch(err){
      failed++
      const status=err instanceof TtsError?err.message.match(/返回 (\d{3})/)?.[1]:undefined
      if(status==='401'||status==='402'||status==='403')halted=true
      console.error(`Repair failed ${key}: ${status?`HTTP ${status}`:'network/invalid audio'}`)
    }
  }
}
await Promise.all([worker(),worker()]);await saves
console.log(JSON.stringify({selected:jobs.length,done,failed,halted}))
if(failed||halted)process.exitCode=1
