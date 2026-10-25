import type { AgeStage, PackBook } from '../types'

/** API candidates are corrected against the named historical editions.
 * Translations and reading notes are written for TaoRead, not copied from websites.
 * Pinyin uses dictionary tones (一 yī / 不 bù); actual speech may use tone sandhi.
 * See docs/55 for the edition decisions and agent-review boundary.
 */
export interface SpringPoem {
  sourceId: number
  title: string
  author: string
  dynasty: '宋'
  minStage: AgeStage
  edition: string
  sourceUrl: string
  editionNote: string
  text: string
  pinyin: string
  translation: string
  note: string
}
const editions = {
  chen: ['蒙隐集卷一（四库全书本）', 'https://zh.wikisource.org/zh-hans/蒙隠集_(四庫全書本)/卷1'],
  han: ['南涧甲乙稿卷六（四库全书本）', 'https://zh.wikisource.org/zh-hant/南澗甲乙稿_(四庫全書本)/卷06'],
  lu: ['剑南诗稿卷八十一', 'https://www.shidianguji.com/zh/book/HY7116/chapter/1ksj2ysqf8aw2'],
  biao: ['涧泉集卷四（四库全书本）', 'https://hhl.cnkgraph.com/Book/561/KR4d0342_004'],
  gao: ['菊涧集', 'https://www.shidianguji.com/book/SK2586/chapter/1jpgoes5kc8wr'],
  wang: ['两宋名贤小集卷三百四（四库全书本）', 'https://zh.wikisource.org/zh-hans/兩宋名賢小集_(四庫全書本)/卷304'],
  liu: ['彭城集卷十八（四库全书本）', 'https://zh.wikisource.org/zh-hant/彭城集_(四庫全書本)/卷18'],
  cheng: ['江湖后集卷十四（四库全书本）', 'https://zh.wikisource.org/zh-hans/江湖後集_(四庫全書本)/卷14'],
  yang: ['诚斋集卷第四十一（退休集）', 'https://ctext.org/wiki.pl?chapter=977957&if=gb&remap=gb'],
} as const
function poem(sourceId: number, title: string, author: string, minStage: AgeStage, edition: keyof typeof editions, text: string, pinyin: string, translation: string, note: string, editionNote = '按所列底本核对，繁体与异体字改为通用字形，标点与分行由桃阅读整理。'): SpringPoem {
  return { sourceId, title, author, dynasty: '宋', minStage, edition: editions[edition][0], sourceUrl: editions[edition][1], editionNote, text, pinyin, translation, note }
}
export const SPRING_POEMS: readonly SpringPoem[] = [
  poem(18938, '春日偶成三首·其三', '陈棣', '9-12', 'chen',
    '陋巷逢春日，生涯亦足夸。\n堆钱聚榆荚，积絮扑杨花。\n旌旆千行竹，笙歌两部蛙。\n凭谁为商榷，何似五侯家。',
    'lòu xiàng féng chūn rì shēng yá yì zú kuā\nduī qián jù yú jiá jī xù pū yáng huā\njīng pèi qiān háng zhú shēng gē liǎng bù wā\npíng shuí wèi shāng què hé sì wǔ hóu jiā',
    '春天来到简陋的小巷，我的生活也有值得夸耀的地方。榆树结满像钱币的榆荚，杨花飞来像堆起的棉絮。一行行竹子像迎风的旗帜，两处青蛙合唱如同奏乐。请谁来评评看：这样的春光，比起富贵人家的生活又怎样呢？',
    '榆荚：榆树的果实，圆薄似钱。旌旆（jīng pèi）：旗帜。商榷：讨论比较。五侯家：借指富贵人家。共读时可以找找诗中的比喻。'),
  poem(18942, '叠韵春日杂兴五首·其一', '陈棣', '9-12', 'chen',
    '南陌游人少，东城去路赊。\n寻芳闲趁蝶，失喜漫占鸦。\n着物春犹浅，薰人气自华。\n夜来风雨急，惊动阿香车。',
    'nán mò yóu rén shǎo dōng chéng qù lù shē\nxún fāng xián chèn dié shī xǐ màn zhān yā\nzhuó wù chūn yóu qiǎn xūn rén qì zì huá\nyè lái fēng yǔ jí jīng dòng ā xiāng chē',
    '城南小路上游人很少，通往东城的路还长。我悠闲地追随蝴蝶寻找花朵，听到鸦声，意外高兴起来，随意猜猜是否有喜事。草木上的春色还浅，扑面而来的气息已经芬芳。夜里风雨骤急，仿佛惊动了传说中阿香的雷车。',
    '赊（shē）：这里指遥远。占（zhān）鸦：古人根据鸦声猜吉凶，是旧时习俗。着（zhuó）物：附着在草木上。阿香车：古代神话中的雷车，用来描写雷声。'),
  poem(18945, '叠韵春日杂兴五首·其四', '陈棣', '9-12', 'chen',
    '经春衣带剩，过午食箪垂。\n嫩绿方迷眼，轻黄未上眉。\n世情无足语，节物总堪诗。\n未展抟风翼，鹪鹩且一枝。',
    'jīng chūn yī dài shèng guò wǔ shí dān chuí\nnèn lǜ fāng mí yǎn qīng huáng wèi shàng méi\nshì qíng wú zú yǔ jié wù zǒng kān shī\nwèi zhǎn tuán fēng yì jiāo liáo qiě yī zhī',
    '一春过去，人瘦了，衣带显得宽松；午时已过，盛饭的竹筐仍挂着。嫩绿的春景刚让人看得入迷，淡黄的愁容还没有浮上眉头。人情世事不值得多说，时令中的风物却处处可以写诗。还没能像大鹏那样乘风展翅，暂且像小鸟一样，有一根树枝栖身也好。',
    '食箪（dān）：盛饭的竹器。节物：随季节变化的景物。抟（tuán）风：乘着旋风。鹪鹩（jiāo liáo）：一种小鸟。末联用《庄子》的大鹏与鹪鹩作比，宜亲子共读。',
    '底本“賸”整理为“剩”，不改诗意。'),
  poem(29723, '次韵子云春日杂兴五首·其一', '韩元吉', '6-8', 'han',
    '马上还逢江上春，冷烟和雨作红尘。\n不堪柳絮催行客，也有桃花似故人。',
    'mǎ shàng hái féng jiāng shàng chūn lěng yān hé yǔ zuò hóng chén\nbù kān liǔ xù cuī xíng kè yě yǒu táo huā sì gù rén',
    '骑马赶路，又遇上江边的春天；清冷的烟雾和细雨笼罩着尘世。纷飞的柳絮仿佛催促旅人，让我不忍离去；还有盛开的桃花，像老朋友一样亲切。',
    '次韵：沿用别人诗中的韵字写诗。红尘：这里指尘世。行客：旅人。故人：老朋友。'),
  poem(29724, '次韵子云春日杂兴五首·其二', '韩元吉', '9-12', 'han',
    '鶗鴂鸣时春事空，菰蒲叶小未成丛。\n已拚江草无情绿，不奈山花恣意红。',
    'tí jué míng shí chūn shì kōng gū pú yè xiǎo wèi chéng cóng\nyǐ pàn jiāng cǎo wú qíng lǜ bù nài shān huā zì yì hóng',
    '听见鶗鴂的叫声，我感到春光快要消逝；水边菰和蒲的叶子还小，没有长成茂密的一丛。我已甘愿任江边的草无情地绿着，却又舍不得山花这样尽情开放。',
    '鶗鴂（tí jué）：古诗中的鸟名，常与春去相联系。菰蒲：水边植物。拚（pàn）：舍弃、不顾。这里写惜春的复杂心情，宜共读。',
    '按《南涧甲乙稿》保留“鶗鴂”；接口“𫛸”的机器注音未识别，不沿用。“拚”取舍弃义读 pàn；底本“不柰”整理为“不奈”。'),
  poem(29726, '次韵子云春日杂兴五首·其四', '韩元吉', '9-12', 'han',
    '绿阴池沼乱莺流，眼底春来鬓却秋。\n不用黄金买白日，待寻三径作归休。',
    'lǜ yīn chí zhǎo luàn yīng liú yǎn dǐ chūn lái bìn què qiū\nbù yòng huáng jīn mǎi bái rì dài xún sān jìng zuò guī xiū',
    '绿树成荫，池塘边黄莺飞来飞去。眼前春天又到了，我的鬓发却像秋天一样衰老。不必拿黄金去买回流逝的时光，我准备寻找幽静的家园，归去休息。',
    '池沼：池塘。鬓：脸两旁靠近耳朵的头发。三径：借指隐居的家园。“春来鬓却秋”把春景和人的衰老作对比。',
    '按底本“鶯”用简体“莺”，不沿用接口异体“鶑”。'),
  poem(42266, '春日杂兴十二首·其一', '陆游', '6-8', 'lu',
    '方塘盎盎带泥浑，远草青青没烧痕。\n只道雨晴春昼永，归时不觉已黄昏。',
    'fāng táng àng àng dài ní hún yuǎn cǎo qīng qīng mò shāo hén\nzhǐ dào yǔ qíng chūn zhòu yǒng guī shí bù jué yǐ huáng hūn',
    '方形池塘涨满了水，混着泥土有些浑浊；远处青草长得茂盛，盖住了从前烧过的痕迹。我以为雨后放晴，春天的白昼很长；回家时才发现，不知不觉已经黄昏了。',
    '盎盎（àng àng）：充盈的样子。没（mò）：掩盖。永：长。可以想想：专心看春景时，时间是不是过得特别快？'),
  poem(86357, '春日杂兴·其六', '韩淲', '9-12', 'biao',
    '种田图得米，终岁亦勤劳。\n当春把锄犁，和风满东皋。\n岂忘水旱忧，流离至逋逃。\n未必可就食，往来徒嗷嗷。',
    'zhòng tián tú dé mǐ zhōng suì yì qín láo\ndāng chūn bǎ chú lí hé fēng mǎn dōng gāo\nqǐ wàng shuǐ hàn yōu liú lí zhì bū táo\nwèi bì kě jiù shí wǎng lái tú áo áo',
    '种田是为了收获粮食，农人整年辛勤劳动。春天，他们拿起锄头和犁，和暖的风吹遍东边的田地。可是水灾、旱灾的忧虑怎能忘掉？有人因此失去安定生活，不得不逃离家乡。即使四处寻找，也未必能得到食物，只留下饥饿的呼声。',
    '韩淲读 hán biāo。东皋（gāo）：东边的田地。逋（bū）逃：逃亡。嗷嗷：哀呼声。此诗关心古代农人的困境，建议家长陪读，理解粮食与劳动。',
    '“鉏”“臯”分别整理为“锄”“皋”；种田读 zhòng，不能沿用机器的 zhǒng。'),
  poem(86362, '春日杂兴·其十一', '韩淲', '9-12', 'biao',
    '古人善为治，焉得常继之。\n施为须臾间，乱之以参差。\n请观一岁年，阴晴每如兹。\n大抵正自难，君子易忧思。',
    'gǔ rén shàn wéi zhì yān dé cháng jì zhī\nshī wéi xū yú jiān luàn zhī yǐ cēn cī\nqǐng guān yī suì nián yīn qíng měi rú zī\ndà dǐ zhèng zì nán jūn zǐ yì yōu sī',
    '古人擅长治理，怎样才能一直继承他们的好办法呢？办事的时候，稍有不一致，转眼就可能把秩序弄乱。看看一年的天气吧，阴晴变化也常常如此。大体说来，让事情始终合宜确实很难，所以有责任心的人容易为此忧虑。',
    '为治：治理。须臾：很短的时间。参差（cēn cī）：不一致。兹：这样。此诗由天气谈到治理，属于进阶理解，宜亲子讨论。'),
  poem(86363, '春日杂兴·其十二', '韩淲', '9-12', 'biao',
    '茫茫天地宽，山水多回礴。\n一山复一水，又尔为聚落。\n聚落成城郭，贵贱分忧乐。\n岂不知其然，何苦生厌薄。',
    'máng máng tiān dì kuān shān shuǐ duō huí bó\nyī shān fù yī shuǐ yòu ěr wéi jù luò\njù luò chéng chéng guō guì jiàn fēn yōu lè\nqǐ bù zhī qí rán hé kǔ shēng yàn bó',
    '天地广阔，山水曲折环绕。一座山、一条水之间，人们又聚居成村落。村落发展成城镇，人们境遇不同，各有忧愁与快乐。既然知道世间有这样的差别，又何必心生厌弃、轻视呢？',
    '回礴（huí bó）：回旋盘绕。聚落：人们聚居的地方。厌薄（yàn bó）：厌弃、轻视。贵贱是古代社会的身份用语；共读时可讨论尊重不同境遇的人。'),
  poem(97496, '春日杂兴二首·其一', '高翥', '6-8', 'gao',
    '檐铃奏曲响珊珊，尽日重门不启关。\n多插瓶花供宴坐，为渠消受一春闲。',
    'yán líng zòu qǔ xiǎng shān shān jìn rì chóng mén bù qǐ guān\nduō chā píng huā gōng yàn zuò wèi qú xiāo shòu yī chūn xián',
    '屋檐下的铃铛叮当响，像在奏乐；一整天，层层院门都没有打开。我多插几瓶花，陪伴自己安静地坐着，借着这些花，好好享受春天的闲适。',
    '重（chóng）门：层层院门。宴坐：安静地坐着。渠：这里指花。檐铃和瓶花让安静的小院也有声音与颜色。',
    '按《菊涧集》用“檐”“瓶”；重门读 chóng，供宴坐的“供”读 gōng。'),
  poem(125752, '春日杂兴·其一', '王同祖', '6-8', 'wang',
    '迢迢清夜静无哗，月色千门噪乱鸦。\n坐久忽惊寒力重，不知残雪在梅花。',
    'tiáo tiáo qīng yè jìng wú huá yuè sè qiān mén zào luàn yā\nzuò jiǔ hū jīng hán lì zhòng bù zhī cán xuě zài méi huā',
    '漫长清冷的夜晚没有人声喧哗，月光照着千家门户，乌鸦忽然纷纷啼叫。我坐久了，才惊觉寒意很重，原来梅花上还留着没有化尽的雪。',
    '迢迢：这里写夜长。寒力：寒冷的力量。底本原注说吴山月明时群鸦会叫，因此“静无哗”与“噪乱鸦”写的是不同声音。'),
  poem(125753, '春日杂兴·其二', '王同祖', '6-8', 'wang',
    '粉墙红杏半离披，春满人间花自知。\n幽鸟不言如有思，等闲飞上海棠枝。',
    'fěn qiáng hóng xìng bàn lí pī chūn mǎn rén jiān huā zì zhī\nyōu niǎo bù yán rú yǒu sī děng xián fēi shàng hǎi táng zhī',
    '白墙旁的红杏花已经有些散落，花朵仿佛自己知道，春天已来到人间。幽静的小鸟不叫，像在想心事，随后轻轻飞上了海棠树枝。',
    '粉墙：刷白的墙，并不是粉红色的墙。离披：散开、零落的样子。等闲：随意、轻轻松松。'),
  poem(125754, '春日杂兴·其三', '王同祖', '6-8', 'wang',
    '轻寒漠漠雨霏霏，春院人闲半掩扉。\n风力不知多几许，出门只见杏花飞。',
    'qīng hán mò mò yǔ fēi fēi chūn yuàn rén xián bàn yǎn fēi\nfēng lì bù zhī duō jǐ xǔ chū mén zhǐ jiàn xìng huā fēi',
    '微微的寒意中，细雨纷纷飘落；春天的小院里，人悠闲地待着，门半掩着。不知道外面的风有多大，走出门，只看见杏花花瓣在空中飞舞。',
    '霏霏：雨雪纷纷的样子。扉（fēi）：门。几许：多少。看不见风，却能从飞舞的花瓣知道风来了。'),
  poem(125755, '春日杂兴·其四', '王同祖', '6-8', 'wang',
    '百花时节燕莺忙，尽日如年懒课香。\n午枕梦回人悄悄，一声啼鸟傍斜阳。',
    'bǎi huā shí jié yàn yīng máng jìn rì rú nián lǎn kè xiāng\nwǔ zhěn mèng huí rén qiāo qiāo yī shēng tí niǎo bàng xié yáng',
    '百花开放的时节，燕子和黄莺十分忙碌；我却觉得一天长得像一年，懒得计算焚香经过的时间。午睡醒来，四周悄无声息，斜阳中传来一声鸟鸣。',
    '课香：以焚香计时。梦回：从梦中醒来。悄悄：这里指安静，读 qiāo qiāo。诗里忙碌的鸟与安闲的人形成对照。',
    '选《两宋名贤小集》“尽日如年”本；接口“昼日”作为异文记录，不混用。'),
  poem(125756, '春日杂兴·其五', '王同祖', '6-8', 'wang',
    '清明过了柳花飞，帘外萋萋草正肥。\n唤起惜春情绪处，空山残月杜鹃啼。',
    'qīng míng guò le liǔ huā fēi lián wài qī qī cǎo zhèng féi\nhuàn qǐ xī chūn qíng xù chù kōng shān cán yuè dù juān tí',
    '清明已经过去，柳絮随风飞舞；帘外的青草正长得茂盛。是什么唤起了我舍不得春天离去的心情？是空山里、残月下传来的杜鹃啼声。',
    '柳花：柳絮。萋萋（qī qī）：草木茂盛的样子。惜春：珍惜春光，舍不得它离去。'),
  poem(184106, '雨后池上', '刘攽', '6-8', 'liu',
    '一雨池塘水面平，澹磨明镜照檐楹。\n东风忽起垂杨舞，更作荷心万点声。',
    'yī yǔ chí táng shuǐ miàn píng dàn mó míng jìng zhào yán yíng\ndōng fēng hū qǐ chuí yáng wǔ gèng zuò hé xīn wàn diǎn shēng',
    '一场雨后，池塘水面平静得像轻轻磨亮的镜子，映照着屋檐和柱子。东风忽然吹来，垂柳随风舞动，雨滴落到荷叶上，发出许多细碎的声响。',
    '刘攽读 liú bān。澹（dàn）：这里写水面安静。楹（yíng）：柱子。荷心：荷叶上。诗从平静的画面写到动听的声音。'),
  poem(132482, '山中杂诗·其一', '程炎子', '9-12', 'cheng',
    '侧耳桥边听，声声在翠微。\n自甘留此坐，何苦劝人归。\n院悄惊春昼，山空恋夕晖。\n得如鸥与鹭，对我欲忘机。',
    'cè ěr qiáo biān tīng shēng shēng zài cuì wēi\nzì gān liú cǐ zuò hé kǔ quàn rén guī\nyuàn qiǎo jīng chūn zhòu shān kōng liàn xī huī\ndé rú ōu yǔ lù duì wǒ yù wàng jī',
    '我在桥边侧耳倾听，一声声鸟鸣来自青翠的山间。我情愿留在这里坐着，何必苦苦催我回去呢？庭院安静，春日的白昼使人惊觉；空山里的夕阳又让我留恋。要是能像鸥鹭一样自在，与它们相对，便会忘掉计较得失的心。',
    '翠微：青翠的山色，也指山间。劝人归：借鸟声表达归去之意。夕晖：傍晚阳光。忘机：忘掉算计、计较的心思。'),
  poem(132483, '山中杂诗·其二', '程炎子', '9-12', 'cheng',
    '昆仑初凿破，大巧夺天真。\n竹锁三更月，桃酣几度春。\n山空闻鹤唳，溪绕卜鸥邻。\n为拂留题石，松摇露滴身。',
    'kūn lún chū záo pò dà qiǎo duó tiān zhēn\nzhú suǒ sān gēng yuè táo hān jǐ dù chūn\nshān kōng wén hè lì xī rào bǔ ōu lín\nwèi fú liú tí shí sōng yáo lù dī shēn',
    '山石仿佛刚从昆仑凿开，巧妙的景致胜过天然。深夜的月光被竹影围住，桃花在一度度春天里盛开。空山中听见鹤鸣，溪流环绕，我想择居于此，与鸥鸟为邻。我拂拭题诗的石头，松枝摇动，露水滴到身上。',
    '昆仑：古代传说中的山名。三更（gēng）：深夜。酣：这里形容桃花盛开。唳（lì）：鹤鸣。卜（bǔ）邻：选择邻居、居所。天真：天然的样子，不是现代所说的幼稚。',
    '选《江湖后集》“溪绕”本；接口“溪远”为异文。'),
  poem(49813, '初夏即事十二解·其一', '杨万里', '9-12', 'yang',
    '莲叶头巾道样裁，仙桃扇子午时回。\n扑蝇堕地犹能旋，闭阁生尘底处来。',
    'lián yè tóu jīn dào yàng cái xiān táo shàn zi wǔ shí huí\npū yíng duò dì yóu néng xuán bì gé shēng chén dǐ chù lái',
    '莲叶般的头巾，照着道士头巾的样式裁成；桃形的扇子，到中午又拿来使用。扑赶苍蝇时扇子掉在地上，还能旋转；阁门关着，里面积了尘，这些苍蝇又是从哪里来的呢？',
    '道样：道士的样式。底处：哪里。旋（xuán）：转动。此处描写头巾、扇子和赶蝇的小事，不把“仙桃”解释成真的仙果。',
    '据《诚斋集》退休集整理本保留“裁／闭阁生尘底处来”；另一四库录文有“栽／向底来”等异文，不拼接两个版本。'),
]

const springScenes: Record<number, string> = {
  18938: '春日宋代小巷，榆荚挂满枝头，杨絮轻飞，竹林沿池塘排列，池边两只青蛙。以真实植物表现诗意，不画钱币、棉被、旗帜和乐队。',
  18942: '宋代城南的春日小路，稀疏行人中一位成年诗人追随蝴蝶赏花，一只乌鸦在远树上。草木新绿、白天清朗，不画神话雷车。',
  18945: '春日宋代庭院，嫩绿树叶和初生花苞，一位成年诗人安坐，竹制饭筐挂在屋檐下，小鸟栖在细枝上。不把大鹏的比喻画成巨鸟。',
  29723: '细雨轻雾中的春日江岸，一位宋代成年旅人骑马缓行，柳絮飞舞，岸边桃花盛开，画面温柔而清新。',
  29724: '暮春江岸，菰和蒲抽出稀疏嫩叶，草色翠绿，山花红艳，小鸟在树枝上鸣叫；春日白天，不画人物。',
  29726: '春日池塘绿树成荫，黄莺在枝叶间飞动，一位鬓发灰白的宋代成年诗人站在小径边观景，不画金币和秋叶。',
  42266: '雨后放晴的春日傍晚，方形池塘涨水略浑，岸边青青小草覆盖泥地，远天暖色黄昏，一位宋代成年旅人沿田埂归家。',
  86357: '宋代春日田野，成年农人持锄、扶犁辛勤劳作，和风吹过新绿田地，朴素农舍在远处；尊重劳动，不把农事画成玩耍。',
  86362: '适合亲子理解的象征画面：同一片宋代田野上空晴云与雨云相接，一位成年诗人在窗前观察天气。只表现阴晴变化，不画朝堂和文字。',
  86363: '辽阔山水层层回环，溪流沿山脚经过村落，远处城墙和聚居屋舍，一位宋代成年旅人在小路停步远望；表现不同人共同生活的家园。',
  97496: '宋代春日安静小院，屋檐挂着小铃铛，院门关闭，室内桌上插着几瓶鲜花，一位成年诗人静坐赏花。清明白昼。',
  125752: '清冷春夜，月光照着宋代院落的白墙灰瓦，梅花枝头留着薄薄残雪，远处几只乌鸦，一位成年诗人披衣坐在窗边。',
  125753: '春日白色粉墙旁，红杏花瓣略有散落，一只安静小鸟停在海棠枝上，阳光明亮柔和。粉墙必须白色，不画粉红色墙。',
  125754: '微寒春日，细雨飘过宋代小院，木门半掩，风吹杏花花瓣飞舞，一位穿长袍的成年诗人刚走出门。',
  125755: '春日斜阳，宋代院子里燕子和黄莺在花树间活动，成年诗人午睡醒来坐在窗边，桌上细香轻烟，气氛宁静。',
  125756: '宋代江南清明后的黎明，空旷无人小院的竹帘外青草茂盛，柳絮飘飞，远处空山上方残月渐淡，一只杜鹃鸟停在树枝上。纯自然与庭院风景，画面没有人，没有儿童，没有现代服装，不画盛夏荷塘。',
  184106: '雨后池塘水平如镜，清楚倒映宋代屋檐与柱子，风起时垂柳轻摆，柳叶上的雨滴落在荷叶中心形成小水珠。',
  132482: '春日傍晚，山间小桥旁一位宋代成年诗人坐着侧耳听鸟，青山、安静院落与夕阳相映，溪边白鸥和白鹭自在停歇。',
  132483: '明确的春日深夜，深蓝夜空上方清楚可见一轮月亮，山间溪流和竹林只受冷色月光照亮，桃花盛开，一只白鹤在溪边，一位宋代成年诗人用手拂拭岩石，松枝露水滴落。不是白昼，没有太阳，没有夕阳，没有书板，石上不绘制文字。',
  49813: '初夏中午宋代书房，一位成年诗人戴黑灰色布制的道士头巾，柔软布巾裁成莲叶形轮廓。画面唯一的一把桃形团扇掉在地板上旋转，诗人双手空着，窗边一只很小的苍蝇。头巾必须是黑灰织物，不是绿色植物莲叶；不画绿色叶子帽，不画仙桃果实，不画悬空或第二把扇子。',
}

function pack(id: string, title: string, ageStage: AgeStage, intro: string): PackBook {
  const poems = SPRING_POEMS.filter(p => p.minStage === ageStage)
  return {
    id, title, ageStage, author: [...new Set(poems.map(p => p.author))].join(' / '),
    lang: 'zh', category: 'poetry', intro, coverArt: 'scenery-night',
    coverFrom: '#6C865E', coverTo: '#EBCFA8',
    coverArtPrompt: ageStage === '6-8'
      ? '宋代春日江南小院和池塘，白墙红杏、垂柳、海棠上的小鸟，雨后晴光水色清亮，清新水彩绘本，无文字封面。'
      : '宋代春日山水间，一位鬓发灰白的成年诗人沿小桥看绿树、田野和远山，竹影与春花相映，温柔明亮水彩，无文字封面。',
    source: '宋代公版诗文；按作者诗集核对，逐字注音与白话译文由桃阅读整理。',
    chapters: poems.map(p => ({ title: `${p.title} · ${p.author}`, art: `chapter:${id}:${p.sourceId}`, artPrompt: springScenes[p.sourceId], blocks: [
      { kind: 'poem', text: p.text, pinyin: p.pinyin, translation: p.translation },
      { kind: 'note', text: `宋 · ${p.author}。${p.note}\n底本：${p.edition}。` },
    ] })),
    rights: { workTitle: title, author: [...new Set(poems.map(p => p.author))].join(' / '), translator: '桃阅读自撰白话译文', jurisdiction: 'CN', basis: 'pd-70',
      sourceUrl: 'https://github.com/palemoky/chinese-poetry',
      note: '作者均为宋代人（公元960—1279年），古诗原文已进入公版；逐首底本与异文见 poetry-song-spring.ts 及 docs/55。未复制现代译注或 GPL API 服务端代码。候选数据的 MIT 许可见 docs/licenses/chinese-poetry-MIT.txt；译文和阅读提示由平台自撰。' },
  }
}
export const songSpringPacks: PackBook[] = [
  pack('poetry-song-spring', '宋诗里的春天', '6-8', '九首春日小诗，听檐铃、看杏花、追着春风找鸟鸣。带上拼音和白话，一起慢慢读。'),
  pack('poetry-song-spring-deep', '春日宋诗·进阶共读', '9-12', '十一首宋诗，从春光读到惜时、农事与人生。生僻词和典故有小提示，适合亲子一起讨论。'),
]
