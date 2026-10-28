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

const { values } = parseArgs({ options: { 'media-root': { type: 'string' }, force: { type: 'boolean', default: false }, ids: { type: 'string' } } })
if (!values['media-root']) throw Error('Explicit --media-root is required')
const mediaRoot = path.resolve(values['media-root'])
const config = loadConfig()
if (!imageGenAvailable(config)) throw Error('TAO_IMAGE_BASE/KEY 未配置')

// ── 80 词场景表：画「词义明确的一个瞬间」，具体实物/动作，可一眼看懂 ───────────
const SCENES: Record<string, string> = {
  at: '一个小孩站在红房子的大门口敲门，门牌很显眼', sat: '一个小男孩刚刚坐到木台阶上', pat: '一只大手温柔地轻拍小狗的头',
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
  // ── 阶段四（docs/95 续）：长元音体系 48 词 ──────────────────────────────
  cake: '一块插着蜡烛的生日蛋糕放在小桌上', name: '一个小孩在画架上写下自己的名字卡片', game: '两个小孩在地上玩掷骰子棋盘游戏',
  bike: '一辆红色小自行车靠在树下', kite: '一只蝴蝶风筝飞在蓝天上小孩仰头看', five: '五只气球绑在小女孩的手腕上',
  home: '一栋带烟囱的小房子前有一条小路', nose: '一个小孩闻一朵花的香味', use: '一双小手正在用剪刀剪纸',
  cute: '一只大眼睛的小猫歪着头坐着', rain: '一朵乌云下面落下雨滴小孩打伞', tail: '一只小狗回头看自己摇着的尾巴',
  wait: '一个小孩背着书包站在站牌下等车', play: '两个小孩在草地上开心地抛接球', day: '太阳从山后升起照亮一片草地',
  tree: '一棵绿色大树结着红苹果', green: '一片绿色草叶上有一只小青蛙', three: '三个红色苹果排成一排',
  sea: '蓝色大海边有一把遮阳伞和贝壳', tea: '一套小茶壶和茶杯冒着热气', boat: '一只小帆船在池塘上航行',
  coat: '一件黄色外套挂在衣帽钩上', road: '一条弯曲的柏油马路通向远处', snow: '雪花落在戴帽子的小雪人上',
  moon: '弯弯的月亮挂在夜空中有星星', food: '餐盘里有米饭蔬菜和一块鱼', zoo: '动物园大门里有一只长颈鹿',
  school: '一栋带钟楼的小学校和飘扬的旗子', book: '一本打开的故事书旁边有玩具', look: '一个小孩用望远镜看向远处',
  good: '一个小孩举起画着大拇指的奖状', foot: '一双小脚丫和一双小鞋印', car: '一辆蓝色小汽车开在街道上',
  park: '公园里有长椅大树和喷泉', farm: '农场上有一座红谷仓和栅栏', arm: '一个小孩伸直手臂举着风车',
  card: '一张贺卡上画着爱心和星星', fork: '叉子叉着一块西瓜', short: '一长一短两支铅笔并排摆放',
  sport: '一个足球和一个篮球放在球网上', her: '一个小女孩抱着她的小猫', girl: '一个扎辫子的小女孩在跳绳',
  bird: '一只红色小鸟站在树枝上', shirt: '一件条纹衬衫叠放在床上', what: '一个小孩顶着问号举手提问',
  when: '一个闹钟旁边有一个小孩指着手表', white: '一只白色小兔坐在白云旁边', wheel: '一辆玩具卡车的轮子特写',
  // ── 阶段五（二轮扩课）：复合元音等 33 词 ────────────────────────────────
  cow: '一头黑白花纹的奶牛站在草地栅栏边', how: '一个小孩摊开双手歪头提问', now: '一个闹钟指着三点小孩指着它',
  down: '一只小鸟飞落到台阶下面', out: '一个小孩从帐篷里探出身子张开手', cloud: '蓝天上飘着一朵白云像棉花糖',
  oil: '一瓶金黄的食用油和一个小油壶', coin: '一枚金色硬币放在存钱罐旁边', boy: '一个短发小男孩开心挥手',
  toy: '一只木质小玩具马坐在架子上', joy: '一个小孩举起双臂开心大笑', saw: '一把木工锯放在木板上',
  paw: '一只小狗毛茸茸的爪子特写', draw: '一个小孩用蜡笔画太阳和房子', new: '一个礼盒打开露出崭新的球鞋',
  few: '三颗糖果放在大盘子旁边', ice: '一块晶莹的冰块和雪花', rice: '一碗白米饭冒着热气',
  nice: '一个小孩笑着竖起大拇指点赞', light: '一盏亮着的小台灯放在书桌上', night: '夜晚的天空有月亮和星星',
  right: '一个向右指的红色箭头路牌', high: '一座高山顶上有小旗白云在山腰', sky: '蓝天白云下一只风筝高飞',
  fly: '一只小鸟张开翅膀飞过花丛', my: '一个小孩抱着自己的书包', spring: '春天桃花开枝头小鸟站在枝上',
  string: '一卷彩色风筝线放在地上', street: '一条小街道两旁有商店和路灯',
}

// 小书页整句场景（词光原则：画面讲的就是这句话的事），按图槽 id 精确指定
const CAPTION_SCENES: Record<string, string> = {
  'r-l24-image-1': '一个戴蓝色帽子的小男孩在草地上开心奔跑，张开双臂',
  'r-l24-image-2': '一个戴蓝色帽子的小男孩躲在大树后面探出头笑',
  'r-l24-image-3': '一位爸爸坐在门口台阶上轻轻叹气，一个小孩在旁边拍拍他的肩膀安慰',
  'r-l37-image-1': '一只橙色小狐狸在林间小路上轻快奔跑',
  'r-l37-image-2': '一只橙色小狐狸躲在灌木丛后面，只露出大尾巴和耳朵',
  'r-l37-image-3': '六条橙色小鱼在水草间排成一队游泳',
  'r-l41-image-1': '两只圆滚滚的小鸟站在树枝上一起张嘴唱歌',
  'r-l41-image-2': '一枚金色戒指放在打开的丝绒小礼盒里闪闪发光',
  'r-l41-image-3': '两个小朋友面对面坐着开心聊天',
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
const onlyIds = values.ids ? new Set(values.ids.split(',')) : null
const targets = course.assets.filter(a => {
  if (a.purpose !== 'image') return false
  if (onlyIds) {
    // 指定词重做：只动 w-<word>-meaning-image 词义槽（reader 页图槽按首词派生，避免误伤）
    const word = slotWord.get(a.id)
    return Boolean(word && onlyIds.has(word) && /^w-.+-meaning-image$/.test(a.id))
  }
  return (values.force || !a.sha256) && (slotWord.has(a.id) || Boolean(CAPTION_SCENES[a.id]))
})
const missingScenes = [...new Set(targets.map(a => slotWord.get(a.id) ?? a.id))].filter(k => !SCENES[k] && !CAPTION_SCENES[k])
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
let done = 0
const failed: string[] = []
// 按唯一 key 生成（词或 caption 页槽，同图多槽复用），生成后绑定到对应全部槽
const uniqueKeys = [...new Set(targets.map(a => CAPTION_SCENES[a.id] ? a.id : slotWord.get(a.id)!))]
const queue = [...uniqueKeys]
const sceneOf = (key: string) => `phonics-${CAPTION_SCENES[key] ? 'page' : 'word'}-${key}`
const descriptionOf = (key: string) => CAPTION_SCENES[key] ?? SCENES[key]!
async function worker() {
  for (;;) {
    const key = queue.shift()
    if (!key) return
    const scene = sceneOf(key)
    // 断点续传：已生成的图直接复用（重启不重花钱）
    const genPath = path.join(genDir, 'art', 'mascots', `${scene}.webp`)
    let raw: Buffer
    const cached = values.force ? null : await readFile(genPath).catch(() => null)
    if (cached) {
      raw = cached
    } else {
      const art = await gen.generate({ kind: 'mascot', scene, description: descriptionOf(key), label: `自然拼读配图 ${key}`, lang: 'zh' })
      if (!art) { failed.push(key); console.error(JSON.stringify({ key, failed: true })); continue }
      raw = await readFile(genPath)
    }
    const webp = await sharp(raw).resize(768, 768, { fit: 'cover' }).webp({ quality: 82 }).toBuffer()
    const sha256 = createHash('sha256').update(webp).digest('hex')
    await writeFile(path.join(destDir, `${sha256}.webp`), webp)
    for (const slot of targets.filter(a => (CAPTION_SCENES[a.id] ? a.id : slotWord.get(a.id)) === key)) {
      slot.sha256 = sha256
      slot.extension = 'webp'
      slot.durationMs = null
      slot.speakerId = null
      slot.revision += 1
      slot.sourceLicense = `AI-generated via ${config.TAO_IMAGE_MODEL} for taoread phonics; teaching and rights review pending`
      slot.reviewStatus = 'pending'
    }
    done++
    if (done % 10 === 0) console.log(JSON.stringify({ done, of: uniqueKeys.length }))
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
