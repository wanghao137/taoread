import type { PackBook } from '../types'

/* ── 蒙学 ── */
import { sanziJing } from './primer-sanzi'
import { diZiGui } from './primer-dizigui'
import { qianZiWen } from './primer-qianziwen'
import { baiJiaXing } from './primer-baijiaxing'
import { zengGuang } from './primer-zengguang'

/* ── 诗词 ── */
import { tangShi } from './poetry-tang'
import { libai } from './poetry-libai'
import { duFu } from './poetry-dufu'
import { wangWei } from './poetry-wangwei'
import { tongQu } from './poetry-children'
import { songCi } from './poetry-songci'

/* ── 神话 / 寓言 / 成语 ── */
import { mythPangu } from './myth-pangu'
import { mythNuWa } from './myth-nuwa'
import { mythHouYi } from './myth-houyi'
import { mythJingWei } from './myth-jingwei'
import { mythYuGong } from './myth-yugong'
import { xiYouJi } from './story-xiyou'
import { keZhouQiuJian } from './story-fable'
import { idiomWisdom } from './idiom-wisdom'
import { idiomAnimals } from './idiom-animals'

/* ── 原创童话（平台自撰） ── */
import { originalMoonBoat } from './original-moonboat'
import { originalCottonCandy } from './original-cottoncandy'
import { originalBackpack } from './original-backpack'

/* ── 英文童书 ── */
import { alice } from './tale-alice'
import { peterPan } from './tale-peterpan'
import { littleRedCap } from './tale-grimm'
import { peterRabbit } from './tale-peterrabbit'
import { jemimaPuddleDuck } from './tale-jemima'
import { squirrelNutkin } from './tale-nutkin'
import { aesopFables } from './tale-aesop'
import { littleMermaid } from './tale-mermaid'
import { uglyDuckling } from './tale-duckling'
import { emperorsNewClothes } from './tale-emperor'
import { thumbelina } from './tale-thumbelina'
import { cinderella } from './tale-cinderella'
import { snowWhite } from './tale-snowwhite'
import { frogPrince } from './tale-frogprince'
import { bremenMusicians } from './tale-bremen'
import { hanselGretel } from './tale-hansel'
import { littleRedHen } from './tale-littleredhen'
import { threeLittlePigs } from './tale-threepigs'
import { goldilocks } from './tale-goldilocks'
import { jackBeanstalk } from './tale-jackbeanstalk'
import { velveteenRabbit } from './tale-velveteenrabbit'
import { wizardOfOz } from './tale-oz'
import { winniePooh } from './tale-pooh'
import { jungleBook } from './tale-junglebook'
import { justSoStories } from './tale-justso'
import { windInWillows } from './tale-windwillows'
import { pinocchio } from './tale-pinocchio'
import { heidi } from './tale-heidi'
import { blackBeauty } from './tale-blackbeauty'

/* ── 第七夜扩充（docs/23）：山水诗 / 声律启蒙 / 成语草木 / 英文童谣与诗 / 节气 ── */
import { poetryScenery } from './poetry-scenery'
import { shenglvDong } from './primer-shenglv'
import { idiomPlants } from './idiom-plants'
import { nurseryBedtime } from './en-nursery'
import { gardenVerses } from './en-verses'
import { solarBedtime } from './solar-bedtime'

/* ── docs/24 书库大扩充（45 本）：成语三篇 / 蒙学三本 / 神话民间 / 四大名著儿童版 /
 *   诗词元曲 / 现代散文 / 英文经典童话与小说 / 英文诗歌童谣 ── */
import { studyIdioms } from './idiom-study'
import { courageIdioms } from './idiom-courage'
import { honestyIdioms } from './idiom-honesty'
import { youxueQionglin } from './primer-youxue'
import { zhuziJiaxun } from './primer-zhuzi'
import { shenglvJiang } from './primer-shenglv2'
import { shanhaiJing } from './myth-shanhaijing'
import { huaMulan } from './folktale-mulan'
import { tianLuoGirl } from './folktale-snailgirl'
import { niuLangZhiNu } from './folktale-cowherd'
import { liangZhu } from './folktale-liangzhu'
import { chineseFestivals } from './festivals-chinese'
import { sanguoJourney } from './sanguo-journey'
import { shuihuHeroes } from './shuihu-heroes'
import { honglouDream } from './honglou-dream'
import { nezhaNaohai } from './fengshen-nezha'
import { liaozhaiTales } from './liaozhai-tales'
import { qianJiaShi } from './poetry-qianjia'
import { yuanQu } from './poetry-yuanqu'
import { tongQuPlay } from './poetry-children2'
import { luxunBaicao } from './essay-luxun'
import { zhuZiqing } from './essay-zhu'
import { laoShePets } from './essay-lao'
import { xuDiShan } from './essay-xu'
import { happyPrince } from './tale-happyprince'
import { snowQueen } from './tale-snowqueen'
import { andersenMore } from './tale-andersen2'
import { grimmMore } from './tale-grimm2'
import { tailorGloucester } from './tale-tailor'
import { tomKitten } from './tale-tomkitten'
import { mrsTiggyWinkle } from './tale-tiggywinkle'
import { twoBadMice } from './tale-twobadmice'
import { lookingGlass } from './tale-lookingglass'
import { secretGarden } from './tale-secretgarden'
import { littlePrincess } from './tale-littleprincess'
import { railwayChildren } from './tale-railway'
import { fiveChildren } from './tale-fivechildren'
import { tomSawyer } from './tale-tomsawyer'
import { treasureIsland } from './tale-treasure'
import { anneGreenGables } from './tale-anne'
import { ozmaOfOz } from './tale-ozma'
import { robinsonCrusoe } from './tale-robinson'
import { gulliverTravels } from './tale-gulliver'
import { bookOfNonsense } from './en-nonsense'
import { wynkenBlynken } from './en-wynken'

/**
 * 全部内容包。新增书只需在此注册，seedAllPacks 幂等写入。
 * 每本书的 rights 字段是版权台账的入库凭据（docs/07 §2 修改三）。
 */
export const ALL_PACKS: PackBook[] = [
  // 蒙学（9）
  sanziJing,
  diZiGui,
  qianZiWen,
  baiJiaXing,
  zengGuang,
  shenglvDong,
  youxueQionglin,
  zhuziJiaxun,
  shenglvJiang,
  // 诗词（10）
  tangShi,
  libai,
  duFu,
  wangWei,
  tongQu,
  songCi,
  poetryScenery,
  qianJiaShi,
  yuanQu,
  tongQuPlay,
  // 神话与民间传说（11）
  mythPangu,
  mythNuWa,
  mythHouYi,
  mythJingWei,
  mythYuGong,
  shanhaiJing,
  huaMulan,
  tianLuoGirl,
  niuLangZhiNu,
  liangZhu,
  chineseFestivals,
  // 寓言与成语（8）
  xiYouJi,
  keZhouQiuJian,
  idiomWisdom,
  idiomAnimals,
  idiomPlants,
  studyIdioms,
  courageIdioms,
  honestyIdioms,
  // 古典名著儿童版（4）
  sanguoJourney,
  shuihuHeroes,
  honglouDream,
  nezhaNaohai,
  liaozhaiTales,
  // 现代散文（4）
  luxunBaicao,
  zhuZiqing,
  laoShePets,
  xuDiShan,
  // 原创故事（4）
  originalMoonBoat,
  originalCottonCandy,
  originalBackpack,
  solarBedtime,
  // 英文童书（29）
  aesopFables,
  littleMermaid,
  uglyDuckling,
  emperorsNewClothes,
  thumbelina,
  cinderella,
  snowWhite,
  frogPrince,
  bremenMusicians,
  hanselGretel,
  littleRedHen,
  threeLittlePigs,
  goldilocks,
  jackBeanstalk,
  alice,
  peterPan,
  littleRedCap,
  peterRabbit,
  jemimaPuddleDuck,
  squirrelNutkin,
  velveteenRabbit,
  wizardOfOz,
  winniePooh,
  jungleBook,
  justSoStories,
  windInWillows,
  pinocchio,
  heidi,
  blackBeauty,
  // 英文经典扩充（docs/24，15）
  happyPrince,
  snowQueen,
  andersenMore,
  grimmMore,
  tailorGloucester,
  tomKitten,
  mrsTiggyWinkle,
  twoBadMice,
  lookingGlass,
  secretGarden,
  littlePrincess,
  railwayChildren,
  fiveChildren,
  tomSawyer,
  treasureIsland,
  anneGreenGables,
  ozmaOfOz,
  robinsonCrusoe,
  gulliverTravels,
  // 英文诗歌童谣（4）
  nurseryBedtime,
  gardenVerses,
  bookOfNonsense,
  wynkenBlynken,
]
