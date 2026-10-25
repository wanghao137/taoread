import type { PackBook } from '../types'

/** Candidates: palemoky/chinese-poetry-api; originals checked against the
 * complete 四时田园杂兴 in 石湖诗集卷27 and the named common-text transcription.
 * Modern translations, notes and illustration directions are original TaoRead work.
 * Dictionary tones are used for character-aligned pinyin. See docs/60.
 */
export const SEASONS_EDITION_URL = 'https://www.xuge.org/mj/f/fcd/tyzx/00.htm'
export const SEASONS_COLLATION_URL = 'https://zh.wikisource.org/zh-hans/石湖詩集_(四庫全書本)/卷27'
export interface SeasonPoem {
  sourceId: number
  season: 'autumn' | 'winter'
  number: number
  text: string
  pinyin: string
  translation: string
  note: string
  artPrompt: string
}
export const SEASON_POEMS: readonly SeasonPoem[] = [
  { sourceId: 44414, season: 'autumn', number: 1,
    text: '杞菊垂珠滴露红，两蛩相应语莎丛。\n虫丝罥尽黄葵叶，寂历高花侧晚风。',
    pinyin: 'qǐ jú chuí zhū dī lù hóng liǎng qióng xiāng yìng yǔ suō cóng\nchóng sī juàn jìn huáng kuí yè jì lì gāo huā cè wǎn fēng',
    translation: '枸杞和菊花上挂着珠子般的露水，在花果映衬下透出红意；两只蟋蟀在莎草丛里一唱一和。细细的虫丝缠绕着黄葵叶，疏疏的高花在晚风里侧着身子。',
    note: '蛩（qióng）：蟋蟀。相应（yìng）：互相应和。莎（suō）丛：莎草丛。罥（juàn）：缠绕、挂住。寂历：稀疏的样子。读一读，找出眼睛看到和耳朵听到的秋天。',
    artPrompt: '秋日傍晚近景，枸杞红果和菊花上挂着透明露珠，莎草丛里两只蟋蟀，黄葵叶上细虫丝，稀疏高花随风倾侧。宋代乡野自然画面，没有人。' },
  { sourceId: 44415, season: 'autumn', number: 2,
    text: '朱门巧夕沸欢声，田舍黄昏静掩扃。\n男解牵牛女能织，不须徼福渡河星。',
    pinyin: 'zhū mén qiǎo xī fèi huān shēng tián shè huáng hūn jìng yǎn jiōng\nnán jiě qiān niú nǚ néng zhī bù xū jiǎo fú dù hé xīng',
    translation: '七夕夜，富贵人家热闹欢笑，农家的门却在黄昏安静地关上。农家的男子会牵牛耕田，女子会织布，不必向传说中渡过银河的星神求赐本领和福气。',
    note: '巧夕：七夕。扃（jiōng）：门，这里指关门。解（jiě）：懂得、会。徼（jiǎo）福：求福。末句借牛郎织女传说，赞美农人已有的劳动本领；传说与实际农事要分清。',
    artPrompt: '宋代农舍黄昏，成年农夫牵牛回家，成年农妇在窗内织布，木门将掩，天空初现星光。只表现农家劳动，不画神仙渡河，不画牛在天上。' },
  { sourceId: 44416, season: 'autumn', number: 3,
    text: '橘蠹如蚕入化机，枝间垂茧似蓑衣。\n忽然蜕作多花蝶，翅粉才干便学飞。',
    pinyin: 'jú dù rú cán rù huà jī zhī jiān chuí jiǎn sì suō yī\nhū rán tuì zuò duō huā dié chì fěn cái gān biàn xué fēi',
    translation: '橘树上的小虫像蚕一样，进入变化的过程；枝间垂挂的茧，看起来像小小的蓑衣。忽然间，它变成花纹斑斓的蝶，翅膀上的粉刚干，就开始试着飞翔。',
    note: '蠹（dù）：蛀食植物的小虫。化机：生命变化的过程。蓑（suō）衣：旧时用草编的雨衣。诗人观察虫的变化，用的是古人的说法；实际昆虫种类和发育过程需要自然科学知识来辨认。',
    artPrompt: '秋日橘树枝叶间，一只花纹斑斓的蝴蝶刚展开翅膀，旁边枝条有小小空茧壳。阳光轻透，清楚表现昆虫与植物的比例，不画成穿蓑衣的人。' },
  { sourceId: 44417, season: 'autumn', number: 4,
    text: '静看檐蛛结网低，无端妨碍小虫飞。\n蜻蜓倒挂蜂儿窘，催唤山童为解围。',
    pinyin: 'jìng kàn yán zhū jié wǎng dī wú duān fáng ài xiǎo chóng fēi\nqīng tíng dào guà fēng ér jiǒng cuī huàn shān tóng wèi jiě wéi',
    translation: '静静看着屋檐下的蜘蛛把网织得很低，挡住了小虫飞行的路。蜻蜓倒挂在网上，蜜蜂也被困住，诗人赶快唤山里的孩子来，帮这些小虫解围。',
    note: '檐：屋顶伸出的边沿。窘（jiǒng）：困住、为难。解围：帮助摆脱困境。诗写怜惜小虫的心情；蜘蛛捕虫也是自然现象，观察时保持距离，不随意触摸蜂或破坏蛛网。',
    artPrompt: '宋代农舍屋檐下低垂的细蛛网，一只蜻蜓和一只蜜蜂被轻轻挂住，一位成年诗人在旁关切观看。小虫完整无伤，不画儿童伸手碰蜂，不画恐怖巨大蜘蛛。' },
  { sourceId: 44419, season: 'autumn', number: 6,
    text: '秋来只怕雨垂垂，甲子无云万事宜。\n获稻毕工随晒谷，直须晴到入仓时。',
    pinyin: 'qiū lái zhǐ pà yǔ chuí chuí jiǎ zǐ wú yún wàn shì yí\nhuò dào bì gōng suí shài gǔ zhí xū qíng dào rù cāng shí',
    translation: '秋天到了，农人最怕雨水接连不停；到了甲子日，看见晴朗无云，便觉得收成有望。稻子收割完，紧接着就要晒谷，真盼望晴天一直持续到粮食收进仓里。',
    note: '垂垂：这里写雨水不断。甲子：古代干支纪日中的一天。古人用天气谚语盼丰收，不是准确的天气预报。毕工：完成工作。想想粮食入仓前为什么需要晴天。',
    artPrompt: '宋代晴朗秋日晒谷场，成年农人把金黄稻谷摊开晾晒，旁边稻束与粮仓，远处成熟田地，天空无云，表现收获与珍惜粮食。' },
  { sourceId: 44420, season: 'autumn', number: 7,
    text: '中秋全景属潜夫，棹入空明看太湖。\n身外水天银一色，城中有此月明无。',
    pinyin: 'zhōng qiū quán jǐng shǔ qián fū zhào rù kōng míng kàn tài hú\nshēn wài shuǐ tiān yín yī sè chéng zhōng yǒu cǐ yuè míng wú',
    translation: '中秋的美景，好像全都属于这位隐居的人。我划船进入月光照亮的太湖。身外的湖水与天空，连成一片银白色；城里也能看见这样明亮的月色吗？',
    note: '属（shǔ）：属于。潜夫：隐居的人，这里诗人自指。棹（zhào）：船桨，这里指划船。空明：月光下澄澈明亮的水天。无：放在句末表示询问，相当于“吗”。',
    artPrompt: '深蓝夜空下的宋代中秋太湖，明确是黑夜而不是白天，只有一轮明亮圆月和少量星点。一位成年诗人坐在小船中，一位成年船夫划桨，银白月光照亮深蓝湖水，远岸城廓极淡。低亮度月夜，没有太阳，没有白昼天空。' },
  { sourceId: 44421, season: 'autumn', number: 8,
    text: '新筑场泥镜面平，家家打稻趁霜晴。\n笑歌声里轻雷动，一夜连枷响到明。',
    pinyin: 'xīn zhù cháng ní jìng miàn píng jiā jiā dǎ dào chèn shuāng qíng\nxiào gē shēng lǐ qīng léi dòng yī yè lián jiā xiǎng dào míng',
    translation: '刚修好的打谷场，泥地平整得像镜面。家家趁着霜后晴天忙着打稻。笑声歌声中，打谷的声音像轻轻的雷声，连枷整夜响着，一直忙到天亮。',
    note: '场（cháng）：打谷、晒粮的平地。连枷（jiā）：旧时用来拍打谷物脱粒的农具。轻雷：比喻打稻声，不是真的打雷。按通行录文取“新筑场泥／轻雷”；四库录文“春雷”为异文。',
    artPrompt: '宋代秋收的深蓝夜晚，平整打谷场铺着稻穗，只有两位成年农人轮流用连枷脱粒。连枷的结构是细长木柄顶端用绳环活动连接一根短木条，短木条放低拍打地面的稻穗，绝不是锤头、斧头或铁镐。农人站得疏远，稻束排在一旁，灯光温暖。不画雷电，不画儿童。' },
  { sourceId: 44425, season: 'autumn', number: 12,
    text: '新霜彻晓报秋深，染尽青林作缬林。\n惟有橘园风景异，碧丛丛里万黄金。',
    pinyin: 'xīn shuāng chè xiǎo bào qiū shēn rǎn jìn qīng lín zuò xié lín\nwéi yǒu jú yuán fēng jǐng yì bì cóng cóng lǐ wàn huáng jīn',
    translation: '清晨的新霜，告诉人们秋意已经很深；原本青绿的树林，如今染成斑斓的颜色。只有橘园的景色与众不同，浓绿的叶丛里，挂满了像黄金一样的橘子。',
    note: '彻晓：到天亮。缬（xié）：有花纹的丝织品，这里形容树叶色彩斑斓。万黄金：比喻满树金黄橘子，不是真金。找找树林与橘园的颜色有什么不同。',
    artPrompt: '深秋清晨薄霜覆盖小径，远处树林红黄斑斓，近处橘园依旧碧绿，枝叶间满是金黄成熟橘子。只画果实，不画黄金钱币，晨光清亮。' },
  { sourceId: 44426, season: 'winter', number: 1,
    text: '斜日低山片月高，睡余行药绕江郊。\n霜风扫尽千林叶，闲倚筇枝数鹳巢。',
    pinyin: 'xié rì dī shān piàn yuè gāo shuì yú xíng yào rào jiāng jiāo\nshuāng fēng sǎo jìn qiān lín yè xián yǐ qióng zhī shǔ guàn cháo',
    translation: '夕阳低垂在山边，一弯月亮已挂上高空。睡醒后，我沿着江边郊野散步。霜风吹落了树林中的叶子，我悠闲地拄着竹杖，数一数枝头的鹳鸟巢。',
    note: '行药：古人服药后散步，这里指散步活动，不是让孩子自行服药。筇（qióng）枝：竹杖。数（shǔ）：点数。鹳（guàn）：一种大水鸟。本篇取四库“扫尽”，另有“捣尽”异文。',
    artPrompt: '冬日傍晚江郊，夕阳低近山边，一弯淡月在高空，落尽叶子的树上有鹳鸟大巢，一位宋代成年老人拄竹杖沿岸散步。没有药瓶，不画儿童。' },
  { sourceId: 44427, season: 'winter', number: 2,
    text: '炙背檐前日似烘，暖醺醺后困蒙蒙。\n过门走马何官职，侧帽笼鞭战北风。',
    pinyin: 'zhì bèi yán qián rì sì hōng nuǎn xūn xūn hòu kùn méng méng\nguò mén zǒu mǎ hé guān zhí cè mào lóng biān zhàn běi fēng',
    translation: '屋檐前晒着背，太阳像火炉一样暖，晒得人暖洋洋、困蒙蒙。门外有个骑马赶路的人，不知担任何种职务；他歪着帽子、把马鞭拢着，正迎着北风奔忙。',
    note: '炙（zhì）背：晒背取暖。暖醺醺（xūn）：暖得舒适。走马：骑马疾行。战北风：迎着寒风赶路，不是打仗。诗中屋前的闲适与门外的奔忙形成对照。',
    artPrompt: '晴朗冬日宋代农舍，一位成年老人在檐前背朝阳光悠闲坐着，门外道路上一位成年骑马旅人裹紧衣服迎风赶路。只画两个成年人，没有战斗。' },
  { sourceId: 44428, season: 'winter', number: 3,
    text: '屋上添高一把茅，密泥房壁似僧寮。\n从教屋外阴风吼，卧听篱头响玉箫。',
    pinyin: 'wū shàng tiān gāo yī bǎ máo mì ní fáng bì sì sēng liáo\ncóng jiào wū wài yīn fēng hǒu wò tīng lí tóu xiǎng yù xiāo',
    translation: '屋顶添厚了一层茅草，墙壁也用泥密密抹好，房子像僧人的小屋一样朴素。任凭屋外寒风呼啸，我安稳地躺着，听篱笆上的风声，仿佛悠扬的玉箫。',
    note: '僧寮（liáo）：僧人的小屋。从教（jiào）：任凭。玉箫：美好的箫声，这里比喻风吹篱笆的声音。诗人把寒风声想成音乐，写出安居的快乐。',
    artPrompt: '冬日宋代朴素茅屋剖开式一角，厚茅草屋顶与抹泥的墙挡住寒风，成年老人盖被安卧，屋外竹篱枝条随风摆动。画风温暖，不画真实玉箫乐器。' },
  { sourceId: 44429, season: 'winter', number: 4,
    text: '松节然膏当烛笼，凝烟如墨暗房栊。\n晚来拭净南窗纸，便觉斜阳一倍红。',
    pinyin: 'sōng jié rán gāo dàng zhú lóng níng yān rú mò àn fáng lóng\nwǎn lái shì jìng nán chuāng zhǐ biàn jué xié yáng yī bèi hóng',
    translation: '用含油的松木节燃烧照明，像用灯烛一样，聚积的烟灰却把门窗熏暗了。傍晚把南窗的窗纸擦干净，便觉得照进来的夕阳，比先前红亮了一倍。',
    note: '然：同“燃”，燃烧。膏：油脂。房栊（lóng）：房屋的门窗。拭（shì）：擦。按通行录文取“拭净”，四库录文作“拭尽”。这是古人照明的生活记录，不能照着在室内烧松木。',
    artPrompt: '冬日宋代农舍傍晚，一位成年人用布擦净南窗纸，红色夕阳透过干净窗纸照亮室内，窗框一角留有旧烟痕。聚焦清洁和光线，不画明火或冒烟的炉子。' },
  { sourceId: 44431, season: 'winter', number: 6,
    text: '放船闲看雪山晴，风定奇寒晚更凝。\n坐听一篙珠玉碎，不知湖面已成冰。',
    pinyin: 'fàng chuán xián kàn xuě shān qíng fēng dìng qí hán wǎn gèng níng\nzuò tīng yī gāo zhū yù suì bù zhī hú miàn yǐ chéng bīng',
    translation: '乘着小船，悠闲地看雪后放晴的山。风停了，天气格外寒冷，到了傍晚更像凝住了一样。坐在船上，忽然听到竹篙碰碎冰片，声音像珠玉破碎，才知道湖面已经结了薄冰。',
    note: '奇寒：格外寒冷。篙（gāo）：撑船的长竹竿。珠玉碎：比喻碰碎薄冰的清脆声。本篇取“闲看”，另有“开看”异文。薄冰上的活动很危险，读诗欣赏即可，不照着尝试。',
    artPrompt: '冬日雪后放晴的湖面，远山覆雪，一位宋代成年诗人坐在小船中，成年船夫的竹篙轻触水面薄冰，近处细小透明冰片。只有船上两位成人，不画儿童上冰，不画珠宝。' },
  { sourceId: 44432, season: 'winter', number: 7,
    text: '拨雪挑来踏地菘，味如蜜藕更肥醲。\n朱门肉食无风味，只作寻常菜把供。',
    pinyin: 'bō xuě tiāo lái tà dì sōng wèi rú mì ǒu gèng féi nóng\nzhū mén ròu shí wú fēng wèi zhǐ zuò xún cháng cài bǎ gōng',
    translation: '拨开积雪，挑取紧贴地面生长的白菜，味道像甜藕一样香甜，而且更加鲜厚。富贵人家常吃肉，未必懂得这种菜的好滋味，只把它当作普通的一把蔬菜来用。',
    note: '挑（tiāo）：这里指挑菜、挖取。踏地菘（sōng）：贴地生长的塌棵菜，属于白菜类。醲（nóng）：味道浓厚。菜把：一把蔬菜。诗人珍爱寻常食物的滋味，并不是说所有菜都能在雪地里找到。',
    artPrompt: '宋代冬日菜园近景，一位穿棉袍的成年农人拨开薄雪，采下一棵贴地生长的翠绿白菜，旁边竹篮放着白菜，雪与绿叶对比清新。不画莲藕或肉食宴席。' },
  { sourceId: 44436, season: 'winter', number: 11,
    text: '探梅公子款柴门，枝北枝南总未春。\n忽见小桃红似锦，却疑侬是武陵人。',
    pinyin: 'tàn méi gōng zǐ kuǎn chái mén zhī běi zhī nán zǒng wèi chūn\nhū jiàn xiǎo táo hóng sì jǐn què yí nóng shì wǔ líng rén',
    translation: '前来寻梅的客人轻叩柴门，梅枝的北面南面都还没有春天的花意。忽然看见一丛小桃花红得像锦绣，他便疑心我像传说中住进桃花源的人。',
    note: '款：叩、敲。侬（nóng）：我。武陵人：借《桃花源记》的故事说人住在桃花源般的地方。这里写眼前意外的花景，不表示冬日处处都有桃花。',
    artPrompt: '宋代冬日乡间柴门，聚焦诗中忽见小桃红似锦的瞬间：一位穿古代长袍的成年客人在木门前惊喜地看着庭内一小丛粉红桃花，一位成年主人迎客。只画一小丛桃花，花瓣淡粉红；其余背景只有朴素的墙与木门，不画其他树木，不画梅花，不把整片环境画成春天。' },
  { sourceId: 44437, season: 'winter', number: 12,
    text: '村巷冬年见俗情，邻翁讲礼拜柴荆。\n长衫布缕如霜雪，云是家机自织成。',
    pinyin: 'cūn xiàng dōng nián jiàn sú qíng lín wēng jiǎng lǐ bài chái jīng\ncháng shān bù lǚ rú shuāng xuě yún shì jiā jī zì zhī chéng',
    translation: '村巷里到了冬天年节，更能见到淳朴的人情。邻居老翁依着礼俗，来到柴门前拜访。他身上的长衫，布丝洁白得像霜雪，说是自家织机织出来的。',
    note: '冬年：冬日年节。柴荆：柴门。布缕（lǚ）：布上的丝线。云是：说是。家机：家中的织布机。诗写邻里来往，也写对自家劳动成果的珍爱。',
    artPrompt: '宋代冬日农舍柴门前，一位穿洁白布长衫的成年老翁与成年主人拱手相问，窗内可见木织机，院子朴素温暖，表现邻里礼貌往来。白衣是布，不画成覆盖霜雪的人。' },
]

function pack(season: SeasonPoem['season'], title: string, intro: string, coverArtPrompt: string): PackBook {
  const id = `poetry-song-${season}`
  return {
    id, title, author: '范成大', lang: 'zh', category: 'poetry', ageStage: '6-8', intro,
    coverArt: 'scenery-night', coverFrom: season === 'autumn' ? '#A36B32' : '#688D98', coverTo: '#F1E4CC', coverArtPrompt,
    source: '宋代公版诗文；《石湖诗集》卷二十七参校，采用注明异文的通行录文；拼音、白话与提示由桃阅读整理。',
    chapters: SEASON_POEMS.filter(p => p.season === season).map(p => ({
      title: `${season === 'autumn' ? '秋日' : '冬日'}田园杂兴·其${['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'][p.number]} · 范成大`,
      art: `chapter:${id}:${p.sourceId}`, artPrompt: p.artPrompt,
      blocks: [ { kind: 'poem', text: p.text, pinyin: p.pinyin, translation: p.translation },
        { kind: 'note', text: `宋 · 范成大。《四时田园杂兴》${season === 'autumn' ? '秋日' : '冬日'}十二绝选读。${p.note}\n底本：通行完整录文（太玄书阁），参校《石湖诗集》卷二十七。` } ],
    })),
    rights: { workTitle: title, author: '范成大', authorDeathYear: 1193, translator: '桃阅读自撰白话译文', jurisdiction: 'CN', basis: 'pd-70', sourceUrl: SEASONS_EDITION_URL,
      note: '宋代范成大古诗原文为公版；候选来自 palemoky/chinese-poetry-api，仅使用诗文数据，不引入其 GPL 服务端代码。候选源 MIT 许可见 docs/licenses/chinese-poetry-MIT.txt；现代白话、注释、分龄与画面描述由桃阅读自撰。底本及异文决策见 docs/60。' },
  }
}
export const songSeasonsPacks: PackBook[] = [
  pack('autumn', '秋日田园·宋诗共读', '八首秋日田园诗，听虫鸣、看橘园、赏月色、认识秋收。配逐字拼音与白话，适合亲子慢读。',
    '宋代秋日田园全景，近处金黄橘子挂在绿叶间，远处稻田和晒谷场，成年农人收获，清新秋光，水彩绘本，无文字封面。'),
  pack('winter', '冬日晴雪·宋诗共读', '八首冬日田园诗，读晴雪、菜园与窗前暖阳，也看看古人的邻里生活。配拼音、白话与共读提示。',
    '中国宋代雪后初晴乡村，白雪围着朴素农舍，窗上暖阳，门边一篮翠绿白菜，远山晴雪。一位成年老人穿宋代交领长袍，袍摆长至脚踝，束布腰带，戴古代布巾沿小路散步。人物服饰明确为古代长袍，不穿现代夹克、外套、羽绒服、棒球帽或西裤，水彩绘本，无文字封面。'),
]
