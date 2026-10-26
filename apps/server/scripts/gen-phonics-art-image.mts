/**
 * 用生图模型重做全部词义插图（docs/91：弃 SVG，统一生图画风——词光「统一图鉴画风」原则）。
 *
 * 复用项目校准链路：ImageGenerator（mascot 档 2K 1:1）+ retry fetch + compressPngToWebP + AI 隐式标识。
 * 生成后 sharp 缩到 768 WebP，写入课程媒体目录并绑定 assets.json 的全部词义图槽
 * （w-*-meaning-image 与旧 r-lXX-image-N 槽按 readers 推导词后同源绑定）。
 * 幂等：默认只补空槽；--force 全量重做（本轮画风切换用）。
 *
 * 用法：npx tsx scripts/gen-phonics-art-image.mts --media-root <dir> [--force]
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import path from 'node:path'
import { parseArgs } from 'node:util'
import sharp from 'sharp'
import 'dotenv/config'
import { ImageGenerator } from '../src/modules/media/imagegen'
import { compressPngToWebP } from '../src/modules/media/compress'
import { loadConfig, imageGenAvailable } from '../src/config'
import { candidateDirectory, courseHash, loadCourse } from '../src/modules/phonics/v2/courseRegistry'

const { values } = parseArgs({ options: { 'media-root': { type: 'string' }, force: { type: 'boolean', default: false } } })
if (!values['media-root']) throw Error('Explicit --media-root is required')
const mediaRoot = path.resolve(values['media-root'])
const config = loadConfig()
if (!imageGenAvailable(config)) throw Error('TAO_IMAGE_BASE/KEY 未配置')

// ── 80 词场景表：画「词义明确的一个瞬间」，具体实物/动作，可一眼看懂 ───────────
const SCENES: Record<string, string> = {
  at: '一只小猫安静地坐在圆形小垫子上', sat: '一个小男孩刚刚坐到木台阶上', pat: '一只大手温柔地轻拍小狗的头',
  tap: '一根手指轻轻敲桌上的水杯', it: '一个小孩伸手指着面前的玩具箱', sit: '两个小朋友肩并肩坐好看书',
  sip: '一个小女孩用吸管小口喝橙汁', in: '一只玩具熊坐在打开的纸箱里面', pin: '一枚扣好的别针别着一块小布片',
  nap: '一个小宝宝盖着毯子在小床上午睡', pan: '平底锅里煎着一颗煎蛋', mat: '门口铺着一块条纹进门垫',
  map: '一张摊开的地图上画着弯弯的小路线', man: '一位高高的爸爸牵着小孩的手散步', Sam: '一个戴蓝色帽子的小男孩开心挥手',
  tip: '一根手指的指尖轻轻碰到一只气球', dad: '爸爸把小孩扛在肩膀上', sad: '一个小孩坐在地上眼泪汪汪',
  dip: '一根手指伸进蜂蜜罐蘸蜂蜜', dig: '一只小狗在沙坑里兴奋地刨土', pig: '一只粉红色小猪站在农场栅栏边',
  gap: '两块大石头中间有一条窄窄的缝', dog: '一只摇着尾巴的小狗嘴里叼着球', dot: '一只红色瓢虫翅膀上有黑色圆点',
  pot: '灶台上的炖锅冒着热气', top: '绿色小山顶上插着一面小红旗', cat: '一只橘猫坐着舔爪子',
  cap: '一顶红色鸭舌帽放在木桌上', can: '一个打开的罐头旁边摆着小鱼干', kid: '一个小孩开心地荡秋千',
  kit: '一个打开的工具箱里有锤子和扳手', pen: '一支铅笔在纸上画出彩色弧线', pet: '一个小女孩温柔地抱着小兔子',
  net: '一个捕虫网兜住了一只蝴蝶', sun: '明亮的太阳照着一朵向日葵', cup: '一杯冒着热气的牛奶',
  mud: '一只小猪踩进泥坑溅起泥点', run: '一个小男孩张开双臂在草地上奔跑', ran: '一个小男孩刚刚跑过终点线',
  rat: '一只灰色小老鼠探头看一块奶酪', red: '枝头挂着一个熟透的红苹果', hat: '一顶草帽挂在木挂钩上',
  hen: '一只母鸡带着两只小鸡走', hop: '一只袋鼠妈妈带着小袋鼠蹦跳', hid: '一个小孩躲在树后探出头笑',
  bag: '一个小书包挂在挂钩上', bed: '铺得整整齐齐的小床上有枕头', bus: '一辆黄色校车停在站牌旁',
  fan: '夏天小桌上放着一台转着的小风扇', fin: '一只海豚露出水面露出背鳍', fun: '滑梯上的小孩张开手臂大笑',
  leg: '一双小腿和运动鞋跳过小水洼', lip: '一个小婴儿嘟着嘴吹泡泡', log: '溪边横放着一截圆木',
  jam: '一片吐司上抹着红色草莓酱', jet: '一架喷气式飞机在天上拖着白线', jog: '一位爸爸穿着运动服慢跑',
  van: '一辆白色小货车停在路边', vet: '一位兽医拿着听诊器给小猫检查', wet: '雨天一个小孩打着伞踩水花',
  web: '一张蜘蛛网上挂着晶莹露珠', wig: '派对假发套在一个发模头上', yak: '一头毛茸茸的牦牛站在山坡上',
  yes: '一个小孩笑着竖起大拇指', zip: '一只手拉开书包的拉链', zap: '一个玩具机器人旁边有一道小闪电',
  box: '一个打开的纸箱里装满玩具', fox: '一只橙色小狐狸竖着大尾巴', six: '六只小鸭子排成一队游',
  quiz: '两个小孩玩举卡片问答游戏', quit: '一个小孩放下玩具摆摆手休息', off: '一只手按灭电灯开关房间变暗',
  bell: '一辆自行车把手上挂着亮闪闪的铃', doll: '一个穿裙子的布娃娃坐在架子上', sock: '一只条纹小袜子搭在椅背',
  duck: '鸭妈妈带三只小鸭子游泳', kick: '一个小孩抬脚踢足球的瞬间', ship: '一艘大轮船在蓝色海面航行',
  shop: '一间带条纹遮阳棚的小商店门面', fish: '鱼缸里三条橙色小鱼游来游去',
  chip: '一小盘金黄的炸薯条配番茄酱', chin: '一个小孩托着下巴认真想', chat: '两个小朋友面对面开心聊天',
  thin: '一根细树枝和一棵粗树干并排站着', moth: '一只浅褐色飞蛾停在树叶上', bath: '浴缸里飘着一只小黄鸭和泡泡',
  ring: '一个丝绒小盒里放着一枚亮闪闪的戒指', wing: '一只小鸟张开翅膀落在树枝上', sing: '一只小鸟站在树枝上张嘴唱歌',
}

const course = await loadCourse(candidateDirectory)
// 词义图槽 → 词：w-<word>-meaning-image 直取；r-lXX-image-N 从 readers 页反查。
// 词条 text 保留大小写（Sam），场景表键用词条原文——统一经 canonical 归一
const lowerToText = new Map(course.words.map(w => [w.text.toLowerCase(), w.text] as const))
const canon = (word: string) => lowerToText.get(word.toLowerCase()) ?? word
const slotWord = new Map<string, string>()
for (const asset of course.assets.filter(a => a.purpose === 'image')) {
  const m = /^w-(.+)-meaning-image$/.exec(asset.id)
  if (m?.[1]) { slotWord.set(asset.id, canon(m[1])); continue }
  const reader = course.readers.find(r => r.pages.some(p => p.imageAssetId === asset.id))
  const page = reader?.pages.find(p => p.imageAssetId === asset.id)
  const word = page?.wordIds[0]?.replace(/^w-/, '')
  if (word) slotWord.set(asset.id, canon(word))
}
const targets = course.assets.filter(a => a.purpose === 'image' && (values.force || !a.sha256) && slotWord.has(a.id))
const missingScenes = [...new Set(targets.map(a => slotWord.get(a.id)!))].filter(w => !SCENES[w])
if (missingScenes.length) throw Error(`Missing scene for: ${missingScenes.join(', ')}`)

const genDir = path.resolve('..', '..', 'output', 'phonics-imagegen-20261026')
const gen = new ImageGenerator(
  { base: config.TAO_IMAGE_BASE!, apiKey: config.TAO_IMAGE_KEY!, model: config.TAO_IMAGE_MODEL,
    fetch: async (url, init) => {
      for (let attempt = 1; ; attempt++) {
        let response: Response
        try {
          response = await fetch(url, { ...init, signal: AbortSignal.timeout(180_000) })
        } catch (error) {
          // 国际网间歇抖动：fetch 网络层异常按可重试处理（gen-art 同款策略）
          console.warn(JSON.stringify({ provider: `network ${error instanceof Error ? error.name : 'error'}`, attempt }))
          if (attempt >= 5) throw error
          await new Promise(r => setTimeout(r, Math.min(60, 10 * attempt) * 1000))
          continue
        }
        if (response.ok) return response
        console.warn(JSON.stringify({ provider: `HTTP ${response.status}`, attempt }))
        if (attempt >= 3 || !(response.status === 429 || response.status >= 500)) return response
        await response.body?.cancel()
        await new Promise(r => setTimeout(r, Math.min(60, Math.max(10 * attempt, Number(response.headers.get('retry-after')) || 0)) * 1000))
      }
    } },
  genDir, compressPngToWebP,
  (webp, scene, kind) => {
    void kind
    // 标识由 generate 内部完成；这里复用其签名写回（scene 即词场景键）
    return Promise.resolve(webp)
  },
)

const destDir = path.join(mediaRoot, 'phonics', course.manifest.versionId)
await mkdir(destDir, { recursive: true })
let done = 0, failed: string[] = []
// 按唯一词生成（同词多槽复用一张图），生成后绑定到该词的全部槽
const uniqueWords = [...new Set(targets.map(a => slotWord.get(a.id)!))]
const queue = [...uniqueWords]
async function worker() {
  for (;;) {
    const word = queue.shift()
    if (!word) return
    const scene = `phonics-word-${word}`
    // 断点续传：已生成的词图直接复用（本轮画风全量替换，重启不重花钱）
    const genPath = path.join(genDir, 'art', 'mascots', `${scene}.webp`)
    let raw: Buffer
    try { raw = await readFile(genPath) } catch {
      const art = await gen.generate({ kind: 'mascot', scene, description: SCENES[word]!, titleZh: word })
      if (!art) { failed.push(word); console.error(JSON.stringify({ word, failed: true })); continue }
      raw = await readFile(genPath)
    }
    const webp = await sharp(raw).resize(768, 768, { fit: 'cover' }).webp({ quality: 82 }).toBuffer()
    const sha256 = createHash('sha256').update(webp).digest('hex')
    await writeFile(path.join(destDir, `${sha256}.webp`), webp)
    for (const slot of targets.filter(a => slotWord.get(a.id) === word)) {
      slot.sha256 = sha256
      slot.extension = 'webp'
      slot.durationMs = null
      slot.speakerId = null
      slot.revision += 1
      slot.sourceLicense = `AI-generated via ${config.TAO_IMAGE_MODEL} for taoread phonics; teaching and rights review pending`
      slot.reviewStatus = 'pending'
    }
    done++
    if (done % 10 === 0) console.log(JSON.stringify({ done, of: uniqueWords.length }))
  }
}
await Promise.all([worker(), worker(), worker()])
if (failed.length) throw Error(`Generation failed for: ${failed.join(', ')}（可重跑续传，已成功的槽会跳过）`)

await writeFile(path.join(candidateDirectory, 'assets.json'), JSON.stringify(course.assets, null, 2) + '\n', 'utf8')
const manifestPath = path.join(candidateDirectory, 'manifest.json')
const manifest = JSON.parse(await readFile(manifestPath, 'utf8')) as Record<string, unknown>
manifest.contentHash = courseHash(course)
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8')
console.log(JSON.stringify({ bound: done, slots: targets.length, contentHash: manifest.contentHash }))
