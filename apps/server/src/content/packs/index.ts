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

/* ── docs/25 CC-BY 开放授权绘本（African Storybook Project，署名即可用） ── */
import { ccAsbAhFootball } from './cc-ah-football'
import { ccAsbAkatope } from './cc-akatope'
import { ccAsbAnansiAndWisdom } from './cc-anansi-and-wisdom'
import { ccAsbChickenAndMillipede } from './cc-chicken-and-millipede'
import { ccAsbFirstManAndFirstWoman } from './cc-first-man-and-first-woman'
import { ccAsbFoxAndRooster } from './cc-fox-and-rooster'
import { ccAsbFriendsBecomeEnemies } from './cc-friends-become-enemies'
import { ccAsbGreedyKiundu } from './cc-greedy-kiundu'
import { ccAsbHareTricksElephantAgain } from './cc-hare-tricks-elephant-again'
import { ccAsbHowAntSavedDove } from './cc-how-ant-saved-dove'
import { ccAsbKekesSwing } from './cc-kekes-swing'
import { ccAsbKhayangaAndHerGourd } from './cc-khayanga-and-her-gourd'
import { ccAsbLetterToMum } from './cc-letter-to-mum'
import { ccAsbMonkeyAndTheHuntersWife } from './cc-monkey-and-the-hunters-wife'
import { ccAsbMonkeyEatsHisOwnTail } from './cc-monkey-eats-his-own-tail'
import { ccAsbNamoratunga } from './cc-namoratunga'
import { ccAsbNanusTaxi } from './cc-nanus-taxi'
import { ccAsbOneHotSaturdayAfternoon } from './cc-one-hot-saturday-afternoon'
import { ccAsbSlyJackalTricksTheSillyDonkey } from './cc-sly-jackal-tricks-the-silly-donkey'
import { ccAsbTheBoyWhoWouldNotListen } from './cc-the-boy-who-would-not-listen'
import { ccAsbTheCleverJackalAndTheFoolishCrow } from './cc-the-clever-jackal-and-the-foolish-crow'
import { ccAsbTheJungleSchool } from './cc-the-jungle-school'

/* ── docs/25 英文公版深挖（已交付批次：Alcott/Nesbit/Burnett + 诗歌小说） ── */
import { littleWomen } from './alcott-littlewomen'
import { littleMen } from './alcott-littlemen'
import { oldFashionedGirl } from './alcott-oldfashioned'
import { fauntleroy } from './burnett-fauntleroy'
import { phoenixCarpet } from './nesbit-phoenix'
import { amulet } from './nesbit-amulet'
import { enchantedCastle } from './nesbit-enchanted'
import { puckHill } from './kipling-puck'
import { jungleBook2 } from './kipling-jungle2'
import { anneAvonlea } from './montgomery-avonlea'
import { rebeccaSunnybrook } from './wiggin-rebecca'
import { pollyanna } from './porter-pollyanna'
import { poohCorner } from './milne-poohcorner'
import { nowWeAreSix } from './milne-nowwesix'
import { childsGarden } from './stevenson-garden'
import { singSong } from './rossetti-singsong'

/* ── docs/25 英文公版深挖（第二批：Raggedy/Burgess/Baum/Twain 等） ── */
import { raggedyAnn } from './gruelle-raggedyann'
import { raggedyAndy } from './gruelle-raggedyandy'
import { peterCottontail } from './burgess-cottontail'
import { motherWestWind } from './burgess-westwind'
import { reddyFox } from './burgess-reddyfox'
import { santaClaus } from './baum-santa'
import { princePauper } from './twain-pauper'
import { nils } from './lagerlof-nils'
import { waterBabies } from './kingsley-waterbabies'
import { englishFairyTales } from './jacobs-english'
import { japaneseFairyTales } from './ozaki-japanese'

/* ── docs/25 英文公版深挖（第三批：波特收官 4 本 + 奥兹续作 5 本） ── */
import { piglingBland } from './tale-piglingbland'
import { pigRobinson } from './tale-pigrobinson'
import { appleyDapply } from './tale-appleydapply'
import { cecilyParsley } from './tale-cecilyparsley'
import { ozDorothy } from './oz-dorothy'
import { ozRoad } from './oz-road'
import { ozEmerald } from './oz-emerald'
import { ozPatchwork } from './oz-patchwork'
import { ozTiktok } from './oz-tiktok'

/* ── docs/25 英文公版深挖（第四批：波特小姐系列收官 8 本） ── */
import { mrJeremy } from './tale-mrjeremy'
import { moppet } from './tale-moppet'
import { badRabbit } from './tale-badrabbit'
import { gingerPickles } from './tale-gingerpickles'
import { timmyTiptoes } from './tale-timmytiptoes'
import { johnnyTown } from './tale-johnnytown'
import { samuelWhiskers } from './tale-samuelwhiskers'
import { mrTod } from './tale-mrtod'

/* ── docs/25 中文公版/民间（神话传说 + 历史人物故事） ── */
import { baoLianDeng } from './folktale-baoliandeng'
import { baXian } from './folktale-baxian'
import { zodiac } from './folktale-zodiac'
import { nianBeast } from './folktale-nian'
import { luBan } from './folktale-luban'
import { baiSheZhuan } from './folktale-baishe'
import { kuaFu } from './myth-kuafu'
import { changE } from './myth-chang_e'
import { daYu } from './myth-dayu'
import { dragonLegend } from './myth-dragon'
import { heroesWit } from './heroes-wit'
import { heroesVirtue } from './heroes-virtue'
import { heroesDiligent } from './heroes-diligent'

/* ── docs/25 英文公版深挖（第五批：Dolittle/神话改写/Robin Hood/Lang 彩色童话） ── */
import { dolittle } from './tale-dolittle'
import { dolittleVoyage } from './tale-dolittlevoyage'
import { millionsOfCats } from './tale-millionsofcats'
import { northWind } from './tale-northwind'
import { princessGoblin } from './tale-princessgoblin'
import { tanglewood } from './tale-tanglewood'
import { wonderBook } from './tale-wonderbook'
import { robinHood } from './tale-robinhood'
import { langBlue } from './lang-blue'
import { langRed } from './lang-red'
import { langViolet } from './lang-violet'

/* ── docs/25 英文公版深挖（第六批：奥兹收官 6 本 + Arden/Curdie/Remus/中国童话/Grimm III） ── */
import { ozScarecrow } from './oz-scarecrow'
import { ozRinkitink } from './oz-rinkitink'
import { ozLostPrincess } from './oz-lostprincess'
import { ozTinwoodman } from './oz-tinwoodman'
import { ozMagic } from './oz-magic'
import { ozGlinda } from './oz-glinda'
import { houseArden } from './nesbit-arden'
import { curdie } from './macdonald-curdie'
import { uncleRemus } from './harris-remus'
import { chineseFairyBook } from './chinfairy-wilhelm'
import { grimm3More } from './tale-grimm3'

/* ── docs/25 中文：诗词/蒙学/名著绘本化/散文/谚语/原创绘本 ── */
import { yueFu } from './poetry-yuefu'
import { shiJing } from './poetry-shijing'
import { pastoralPoems } from './poetry-pastoral'
import { mingXianJi } from './primer-mingxian'
import { daNaoTianGong } from './xiyou-wukong'
import { sanDaGuJing } from './xiyou-bonewhite'
import { fengZiKai } from './essay-fengzikai'
import { chineseProverbs } from './proverbs-chinese'
import { hugMonster } from './original-hugmonster'
import { lostTooth } from './original-losttooth'
import { firstDay } from './original-firstday'
import { turtleClimb } from './original-turtlerace'
import { starShop } from './original-starshop'
import { rainbowUmbrella } from './original-rainbowumbrella'
import { goodnightForest } from './original-goodnightforest'
import { magicSeed } from './original-magicseed'
import { fireflyLamp } from './original-fireflylamp'
import { windKite } from './original-windkite'

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
  // CC-BY 开放授权绘本（docs/25，22）
  ccAsbAhFootball,
  ccAsbAkatope,
  ccAsbAnansiAndWisdom,
  ccAsbChickenAndMillipede,
  ccAsbFirstManAndFirstWoman,
  ccAsbFoxAndRooster,
  ccAsbFriendsBecomeEnemies,
  ccAsbGreedyKiundu,
  ccAsbHareTricksElephantAgain,
  ccAsbHowAntSavedDove,
  ccAsbKekesSwing,
  ccAsbKhayangaAndHerGourd,
  ccAsbLetterToMum,
  ccAsbMonkeyAndTheHuntersWife,
  ccAsbMonkeyEatsHisOwnTail,
  ccAsbNamoratunga,
  ccAsbNanusTaxi,
  ccAsbOneHotSaturdayAfternoon,
  ccAsbSlyJackalTricksTheSillyDonkey,
  ccAsbTheBoyWhoWouldNotListen,
  ccAsbTheCleverJackalAndTheFoolishCrow,
  ccAsbTheJungleSchool,
  // 英文公版深挖·第一批（docs/25，16）
  littleWomen,
  littleMen,
  oldFashionedGirl,
  fauntleroy,
  phoenixCarpet,
  amulet,
  enchantedCastle,
  puckHill,
  jungleBook2,
  anneAvonlea,
  rebeccaSunnybrook,
  pollyanna,
  poohCorner,
  nowWeAreSix,
  childsGarden,
  singSong,
  // 英文公版深挖·第二批（docs/25，11）
  raggedyAnn,
  raggedyAndy,
  peterCottontail,
  motherWestWind,
  reddyFox,
  santaClaus,
  princePauper,
  nils,
  waterBabies,
  englishFairyTales,
  japaneseFairyTales,
  // 英文公版深挖·第三批（docs/25，9）
  piglingBland,
  pigRobinson,
  appleyDapply,
  cecilyParsley,
  ozDorothy,
  ozRoad,
  ozEmerald,
  ozPatchwork,
  ozTiktok,
  // 英文公版深挖·第四批（docs/25，8）：波特小姐系列收官
  mrJeremy,
  moppet,
  badRabbit,
  gingerPickles,
  timmyTiptoes,
  johnnyTown,
  samuelWhiskers,
  mrTod,
  // 中文民间传说与神话（docs/25，13）
  baoLianDeng,
  baXian,
  zodiac,
  nianBeast,
  luBan,
  baiSheZhuan,
  kuaFu,
  changE,
  daYu,
  dragonLegend,
  heroesWit,
  heroesVirtue,
  heroesDiligent,
  // 英文公版深挖·第五批（docs/25，11）
  dolittle,
  dolittleVoyage,
  millionsOfCats,
  northWind,
  princessGoblin,
  tanglewood,
  wonderBook,
  robinHood,
  langBlue,
  langRed,
  langViolet,
  // 英文公版深挖·第六批（docs/25，11）
  ozScarecrow,
  ozRinkitink,
  ozLostPrincess,
  ozTinwoodman,
  ozMagic,
  ozGlinda,
  houseArden,
  curdie,
  uncleRemus,
  chineseFairyBook,
  grimm3More,
  // 中文诗词/蒙学/名著/散文/谚语（docs/25，8）
  yueFu,
  shiJing,
  pastoralPoems,
  mingXianJi,
  daNaoTianGong,
  sanDaGuJing,
  fengZiKai,
  chineseProverbs,
  // 原创绘本（docs/25，10）
  hugMonster,
  lostTooth,
  firstDay,
  turtleClimb,
  starShop,
  rainbowUmbrella,
  goodnightForest,
  magicSeed,
  fireflyLamp,
  windKite,
]
