import type { PackBook } from '../types'

/**
 * 《宋词三百首·亲子读本》——由 scripts/gen-corpus.mjs 从公版语料生成（2026-09-20 全面补全）。
 * 底本：宋词三百首（朱祖谋（编））。逐字来自语料数据集，译文为平台自撰白话。
 * 所收词作者卒年均逾保护期；编者朱祖谋卒于 1931 年，编选内容无独创性。注音与白话译文为平台自撰。
 */
export const songCi: PackBook = {
  id: "songci-rivers",
  title: "宋词三百首·亲子读本",
  author: "朱祖谋 编",
  lang: "zh",
  category: "poetry",
  ageStage: "9-12",
  intro: "朱祖谋编《宋词三百首》通行本：长短句里的月亮、江水和思念，跟着旋律轻轻读。",
  coverArt: "great-river",
  coverArtPrompt: "一条宽阔的大江在月光下奔流，江边有一叶扁舟，远处是连绵的山峰和一轮明月，画风大气而宁静",
  coverFrom: "#1A237E",
  coverTo: "#283593",
  source: "公版词选（清末编选，词作为宋代作品）全本，自撰注音与白话译文",
  chapters: [
    {
      title: "湘春夜月 · 黄孝迈",
      art: 'songci-rivers:ch1',
      artPrompt: "古诗《湘春夜月》意境插画：近清明。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "近清明。\n翠禽枝上消魂。\n可惜一片清歌，都付与黄昏。\n欲共柳花低诉，怕柳花轻薄，不解伤春。\n念楚乡旅宿，柔情别绪，谁与温存。\n空樽夜泣，青山不语，残月当门。\n翠玉楼前，惟是有、一波湘水，摇荡湘云。\n天长梦短，问甚时、重见桃根。\n这次第，算人间没个并刀，翦断心上愁痕。",
        pinyin: "jìn qīng míng。\ncuì qín zhī shàng xiāo hún。\nkě xī yī piàn qīng gē， dōu fù yǔ huáng hūn。\nyù gòng liǔ huā dī sù， pà liǔ huā qīng bó， bù jiě shāng chūn。\nniàn chǔ xiāng lǚ sù， róu qíng bié xù， shuí yǔ wēn cún。\nkōng zūn yè qì， qīng shān bù yǔ， cán yuè dāng mén。\ncuì yù lóu qián， wéi shì yǒu、 yī bō xiāng shuǐ， yáo dàng xiāng yún。\ntiān cháng mèng duǎn， wèn shèn shí、 zhòng jiàn táo gēn。\nzhè cì dì， suàn rén jiān méi gè bìng dāo， jiǎn duàn xīn shàng chóu hén。",
        translation: "快到清明了，翠鸟在枝头的啼叫让人伤心；可惜那一片清亮的歌声，都白白交给了黄昏。想跟柳花低声说说心事，又怕它轻浮不懂伤春；夜里空酒杯像在流泪，青山不说话，残月照着门，只有湘水摇荡着湘云。天长梦短，不知何时才能再见到心上人；这样的愁，人间找不出一把快刀，把它从心上剪断。",
      }
      ],
    },
    {
      title: "瑞鹤仙 · 陆叡",
      art: 'songci-rivers:ch2',
      artPrompt: "古诗《瑞鹤仙》意境插画：湿云黏雁影。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "湿云黏雁影。\n望征路愁迷，离绪难整。\n千金买光景。\n但疏钟催晓，乱鸦啼暝。\n花暗省。\n许多情、相逢梦境。\n便行云、都不归来，也合寄将音信。\n孤迥。\n盟鸾心在，跨鹤程高，后期无准。\n情丝待翦。\n翻惹得，旧时恨。\n怕天教何处，参差双燕，还染残朱剩粉。\n对菱花、与说相思，看谁瘦损。",
        pinyin: "shī yún nián yàn yǐng。\nwàng zhēng lù chóu mí， lí xù nán zhěng。\nqiān jīn mǎi guāng jǐng。\ndàn shū zhōng cuī xiǎo， luàn yā tí míng。\nhuā àn shěng。\nxǔ duō qíng、 xiāng féng mèng jìng。\nbiàn xíng yún、 dōu bù guī lái， yě hé jì jiāng yīn xìn。\ngū jiǒng。\nméng luán xīn zài， kuà hè chéng gāo， hòu qī wú zhǔn。\nqíng sī dài jiǎn。\nfān rě dé， jiù shí hèn。\npà tiān jiào hé chù， cēn cī shuāng yàn， hái rǎn cán zhū shèng fěn。\nduì líng huā、 yǔ shuō xiāng sī， kàn shuí shòu sǔn。",
        translation: "湿漉漉的云仿佛黏住了大雁的影子，望着远行的路满心愁闷，离愁怎么也理不清。稀疏的钟声催着天亮，乱鸦啼叫着天黑，多少深情只能在相逢的梦里；就算你像行云一样不回来，也该捎个音信来啊。想剪断情丝，反而惹起旧日的怨恨，对着镜子诉说相思，看看到底是谁更瘦了。",
      }
      ],
    },
    {
      title: "渡江云三犯・渡江云 · 吴文英",
      art: 'songci-rivers:ch3',
      artPrompt: "古诗《渡江云三犯・渡江云》意境插画：羞红颦浅恨，晚风为落，片绣点重茵。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "羞红颦浅恨，晚风为落，片绣点重茵。\n旧堤分燕尾，桂棹轻鸥，宝勒倚残云。\n千丝怨碧，渐路入、仙坞迷津。\n肠漫回，隔花时见，背面楚腰身。\n逡巡。\n题门惆怅，堕履牵萦，数幽期难准。\n还始觉、留情缘眼，宽带因春。\n明朝事与孤烟冷，做满湖、风雨愁人。\n山黛暝，尘波澹绿无痕。",
        pinyin: "xiū hóng pín qiǎn hèn， wǎn fēng wèi luò， piàn xiù diǎn zhòng yīn。\njiù dī fēn yàn wěi， guì zhào qīng ōu， bǎo lè yǐ cán yún。\nqiān sī yuàn bì， jiàn lù rù、 xiān wù mí jīn。\ncháng màn huí， gé huā shí jiàn， bèi miàn chǔ yāo shēn。\nqūn xún。\ntí mén chóu chàng， duò lǚ qiān yíng， shù yōu qī nán zhǔn。\nhái shǐ jué、 liú qíng yuán yǎn， kuān dài yīn chūn。\nmíng cháo shì yǔ gū yān lěng， zuò mǎn hú、 fēng yǔ chóu rén。\nshān dài míng， chén bō dàn lǜ wú hén。",
        translation: "花儿羞红着带一点浅恨，晚风把它吹落，像片片绣花点缀在绿茵上。旧堤分开像燕子尾巴，桂木的小船伴着轻鸥，斜倚在残云边。千万条碧绿的柳丝含着幽怨，小路渐渐走进像仙境一样叫人迷路的地方；隔着花丛，时时能望见她纤细的背影。在门上题了诗满怀惆怅，心事缠绕，约好的相会总难以准定；明天的一切都会像孤烟一样冷，满湖的风雨真叫人发愁。",
      }
      ],
    },
    {
      title: "霜叶飞 · 吴文英",
      art: 'songci-rivers:ch4',
      artPrompt: "古诗《霜叶飞》意境插画：断烟离绪。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "断烟离绪。\n关心事，斜阳红隐霜树。\n半壶秋水荐黄花，香西风雨。\n纵玉勒、轻飞迅羽。\n凄凉谁吊荒台古。\n记醉蹋南屏，彩扇咽、寒蝉倦梦，不知蛮素。\n聊对旧节传杯，尘笺蠹管，断阕经岁慵赋。\n小蟾斜影转东篱，夜冷残蛩语。\n早白发、缘愁万缕。\n惊飙从卷乌纱去。\n漫细将、茱萸看，但约明年，翠微高处。",
        pinyin: "duàn yān lí xù。\nguān xīn shì， xié yáng hóng yǐn shuāng shù。\nbàn hú qiū shuǐ jiàn huáng huā， xiāng xī fēng yǔ。\nzòng yù lè、 qīng fēi xùn yǔ。\nqī liáng shuí diào huāng tái gǔ。\njì zuì tà nán píng， cǎi shàn yàn、 hán chán juàn mèng， bù zhī mán sù。\nliáo duì jiù jié chuán bēi， chén jiān dù guǎn， duàn què jīng suì yōng fù。\nxiǎo chán xié yǐng zhuǎn dōng lí， yè lěng cán qióng yǔ。\nzǎo bái fà、 yuán chóu wàn lǚ。\njīng biāo cóng juàn wū shā qù。\nmàn xì jiāng、 zhū yú kàn， dàn yuē míng nián， cuì wēi gāo chù。",
        translation: "断续的炊烟勾起离愁，牵动人心的，是斜阳的红光隐没在霜后的树林里。用半壶秋水供着菊花，香气在西风细雨中飘散；只记得从前醉踏南屏山，寒蝉声里彩扇低唱，像一场疲倦的梦，如今荒凉的古台已没有人来凭吊。旧日的信纸落满灰尘，写了半截的词一年也懒得续完；夜里残月斜影转过东篱，冷冷的蟋蟀在叫。早早的白发都是愁出来的，狂风爱卷走帽子就随它去吧，只约定明年，再登上青山高处相见。",
      }
      ],
    },
    {
      title: "瑞鹤仙 · 吴文英",
      art: 'songci-rivers:ch5',
      artPrompt: "古诗《瑞鹤仙》意境插画：晴丝牵绪乱。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "晴丝牵绪乱。\n对沧江斜日，花飞人远。\n垂杨暗吴苑。\n正旗亭烟冷，河桥风暖。\n兰情蕙盼。\n惹相思、春根酒畔。\n又争知、吟骨萦销，渐把旧衫重翦。\n凄断。\n流红千浪，缺月孤楼，总难留燕。\n歌尘凝扇。\n待凭信，拌分钿。\n试挑灯欲写，还依不忍，笺幅偷和泪卷。\n寄残云、剩雨蓬莱，也应梦见。",
        pinyin: "qíng sī qiān xù luàn。\nduì cāng jiāng xié rì， huā fēi rén yuǎn。\nchuí yáng àn wú yuàn。\nzhèng qí tíng yān lěng， hé qiáo fēng nuǎn。\nlán qíng huì pàn。\nrě xiāng sī、 chūn gēn jiǔ pàn。\nyòu zhēng zhī、 yín gǔ yíng xiāo， jiàn bǎ jiù shān zhòng jiǎn。\nqī duàn。\nliú hóng qiān làng， quē yuè gū lóu， zǒng nán liú yàn。\ngē chén níng shàn。\ndài píng xìn， bàn fēn diàn。\nshì tiǎo dēng yù xiě， hái yī bù rěn， jiān fú tōu hé lèi juàn。\njì cán yún、 shèng yǔ péng lái， yě yìng mèng jiàn。",
        translation: "晴天的游丝牵得心绪纷乱；对着沧江的斜阳，花儿在飞，人在远方。垂杨遮暗了吴地的园苑，酒楼上炊烟冷落，河桥上春风正暖。她多情的目光惹起相思，谁知道我这个吟诗的人被思念折磨得渐渐消瘦，旧衣衫都要重新裁剪了。落花随着千层浪流去，缺月照着孤楼，总也留不住燕子；想挑灯写信，又忍住不忍心，信纸偷偷和着泪水卷了起来。把这些寄给远方的她吧，就算见不着，也该在梦里相见。",
      }
      ],
    },
    {
      title: "宴清都 · 吴文英",
      art: 'songci-rivers:ch6',
      artPrompt: "古诗《宴清都》意境插画：绣幄鸳鸯柱。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "绣幄鸳鸯柱。\n红情密，腻云低护秦树。\n芳根兼倚，花梢钿合，锦屏人妒。\n东风睡足交枝，正梦花、瑶钗燕股。\n障滟蜡、满照欢丛，嫠蟾冷落羞度。\n人间万感幽单，华清惯浴，春盎风露。\n连鬟并暖，同心共结，向承恩处。\n凭谁为歌长恨，暗殿锁、秋灯夜语。\n叙旧期、不负春盟，红朝翠暮。",
        pinyin: "xiù wò yuān yāng zhù。\nhóng qíng mì， nì yún dī hù qín shù。\nfāng gēn jiān yǐ， huā shāo diàn hé， jǐn píng rén dù。\ndōng fēng shuì zú jiāo zhī， zhèng mèng huā、 yáo chāi yàn gǔ。\nzhàng yàn là、 mǎn zhào huān cóng， lí chán lěng luò xiū dù。\nrén jiān wàn gǎn yōu dān， huá qīng guàn yù， chūn àng fēng lù。\nlián huán bìng nuǎn， tóng xīn gòng jié， xiàng chéng ēn chù。\npíng shuí wèi gē cháng hèn， àn diàn suǒ、 qiū dēng yè yǔ。\nxù jiù qī、 bù fù chūn méng， hóng cháo cuì mù。",
        translation: "锦绣的帷帐围着成双的鸳鸯柱，红色花朵开得繁密，浓密的绿叶低低护着海棠树。花根双双相靠，花梢像钿盒一样相合，惹得深闺中的人嫉妒。东风里它们在交缠的花枝间睡足，正做着一双花钗的好梦；烛光照着欢聚的花丛，只有孤零零的月亮冷冷地走过。人间多少人孤独寂寞，哪儿比得上花开成双成对；只好唱一曲长恨歌，说说不尽的旧情，但愿它们朝朝暮暮，永远不负春日的盟约。",
      }
      ],
    },
    {
      title: "齐天乐 · 吴文英",
      art: 'songci-rivers:ch7',
      artPrompt: "古诗《齐天乐》意境插画：烟波桃叶西陵路，十年断魂潮尾。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "烟波桃叶西陵路，十年断魂潮尾。\n古柳重攀，轻鸥聚别，陈迹危亭独倚。\n凉飔乍起。\n渺烟碛飞帆，暮山横翠。\n但有江花，共临秋镜照憔悴。\n华堂烛暗送客，眼波回盼处，芳艳流水。\n素骨凝冰，柔葱蘸雪，犹忆分瓜深意。\n清尊未洗。\n梦不湿行云，漫沾残泪。\n可惜秋宵，乱蛩疏雨里。",
        pinyin: "yān bō táo yè xī líng lù， shí nián duàn hún cháo wěi。\ngǔ liǔ zhòng pān， qīng ōu jù bié， chén jì wēi tíng dú yǐ。\nliáng sī zhà qǐ。\nmiǎo yān qì fēi fān， mù shān héng cuì。\ndàn yǒu jiāng huā， gòng lín qiū jìng zhào qiáo cuì。\nhuá táng zhú àn sòng kè， yǎn bō huí pàn chù， fāng yàn liú shuǐ。\nsù gǔ níng bīng， róu cōng zhàn xuě， yóu yì fēn guā shēn yì。\nqīng zūn wèi xǐ。\nmèng bù shī xíng yún， màn zhān cán lèi。\nkě xī qiū xiāo， luàn qióng shū yǔ lǐ。",
        translation: "烟波茫茫的西陵渡口，十年前的伤心事像潮水一样涌来。重新攀着古柳，轻鸥聚了又散，我独自倚着旧亭，凉风忽然吹起；眼前是雾中的沙洲、远去的帆影和暮色里的青山，只有江边的花陪我照见憔悴的容颜。还记得她眼波流转如水、素手又白又嫩的样子，如今酒杯没洗，梦也难成，只白白沾了泪水；可惜这秋天的夜晚，只有蟋蟀在稀疏的雨里叫。",
      }
      ],
    },
    {
      title: "风入松 · 吴文英",
      art: 'songci-rivers:ch8',
      artPrompt: "古诗《风入松》意境插画：听风听雨过清明。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "听风听雨过清明。\n愁草瘗花铭。\n楼前绿暗分携路，一丝柳、一寸柔情。\n料峭春寒中酒，交加晓梦啼莺。\n西园日日扫林亭。\n依旧赏新晴。\n黄蜂频扑秋千索，有当时、纤手香凝。\n惆怅双鸳不到，幽阶一夜苔生。",
        pinyin: "tīng fēng tīng yǔ guò qīng míng。\nchóu cǎo yì huā míng。\nlóu qián lǜ àn fēn xié lù， yī sī liǔ、 yī cùn róu qíng。\nliào qiào chūn hán zhōng jiǔ， jiāo jiā xiǎo mèng tí yīng。\nxī yuán rì rì sǎo lín tíng。\nyī jiù shǎng xīn qíng。\nhuáng fēng pín pū qiū qiān suǒ， yǒu dāng shí、 qiàn shǒu xiāng níng。\nchóu chàng shuāng yuān bù dào， yōu jiē yī yè tái shēng。",
        translation: "听着风声雨声，熬过了清明。愁里写下葬花的铭文；楼前绿荫深处，是我们分别的路，一丝柳条就是一寸柔情。春寒里借酒消愁，清晨的梦被啼莺搅醒。西园的林亭天天打扫，还是照旧盼着雨后新晴；黄蜂频频扑向秋千的绳索，因为那儿还留着她当年纤手的香气。惆怅啊，她的脚步再也到不了这里，幽静的台阶一夜之间长满了青苔。",
      }
      ],
    },
    {
      title: "莺啼序 · 吴文英",
      art: 'songci-rivers:ch9',
      artPrompt: "古诗《莺啼序》意境插画：残寒正欺病酒，掩沉香绣户。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "残寒正欺病酒，掩沉香绣户。\n燕来晚、飞入西城，似说春事迟暮。\n画船载、清明过却，晴烟冉冉吴宫树。\n念羁情游荡，随风化为轻絮。\n十载西湖，傍柳系马，趁娇尘软雾。\n溯红渐、招入仙溪，锦儿偷寄幽素。\n倚银屏、春宽梦窄，断红湿、歌纨金缕。\n暝堤空，轻把斜阳，总还鸥鹭。\n幽兰旋老，杜若还生，水乡尚寄旅。\n别后访、六桥无信，事往花委，瘗玉埋香，几番风雨。\n长波妒盼，遥山羞黛，渔灯分影春江宿，记当时、短楫桃根渡。\n青楼彷佛，临分败壁题诗，泪墨惨澹尘土。\n危亭望极，草色天涯，吹鬓侵半苎。\n暗点检、离痕欢唾，尚染鲛绡，凤迷归，破鸾慵舞。\n殷勤待写，书中长恨，蓝霞辽海沈过雁，漫相思、弹入哀筝柱。\n伤心千里江南，怨曲重招，断魂在否。",
        pinyin: "cán hán zhèng qī bìng jiǔ， yǎn chén xiāng xiù hù。\nyàn lái wǎn、 fēi rù xī chéng， sì shuō chūn shì chí mù。\nhuà chuán zǎi、 qīng míng guò què， qíng yān rǎn rǎn wú gōng shù。\nniàn jī qíng yóu dàng， suí fēng huà wéi qīng xù。\nshí zǎi xī hú， bàng liǔ xì mǎ， chèn jiāo chén ruǎn wù。\nsù hóng jiàn、 zhāo rù xiān xī， jǐn ér tōu jì yōu sù。\nyǐ yín píng、 chūn kuān mèng zhǎi， duàn hóng shī、 gē wán jīn lǚ。\nmíng dī kōng， qīng bǎ xié yáng， zǒng hái ōu lù。\nyōu lán xuán lǎo， dù ruò hái shēng， shuǐ xiāng shàng jì lǚ。\nbié hòu fǎng、 liù qiáo wú xìn， shì wǎng huā wěi， yì yù mái xiāng， jǐ fān fēng yǔ。\ncháng bō dù pàn， yáo shān xiū dài， yú dēng fēn yǐng chūn jiāng sù， jì dāng shí、 duǎn jí táo gēn dù。\nqīng lóu páng fó， lín fēn bài bì tí shī， lèi mò cǎn dàn chén tǔ。\nwēi tíng wàng jí， cǎo sè tiān yá， chuī bìn qīn bàn zhù。\nàn diǎn jiǎn、 lí hén huān tuò， shàng rǎn jiāo xiāo， fèng mí guī， pò luán yōng wǔ。\nyīn qín dài xiě， shū zhōng cháng hèn， lán xiá liáo hǎi shěn guò yàn， màn xiāng sī、 tán rù āi zhēng zhù。\nshāng xīn qiān lǐ jiāng nán， yuàn qǔ zhòng zhāo， duàn hún zài fǒu。",
        translation: "残冬的寒气欺负着病中带酒的我，我关上了沉香木的绣户；燕子来得晚，飞进西城，好像在说春天已经迟暮。画船载着清明过去，晴烟慢慢飘过吴宫的树；十年的西湖边，我曾在柳下系马，趁着她娇美的身影走近，如今旧地重访，六桥没有消息，她已在几番风雨中香消玉殒。分别时她曾在破墙上题诗，泪水和着墨迹，惨淡地蒙上尘土；我登上高亭望到天涯，满头鬓发已白了一半。想把满腹长恨写进书里寄给远方的她，把漫天相思弹进哀伤的筝声；千里江南叫人伤心，用怨恨的曲子重新把魂招回来——她的魂还在吗？",
      }
      ],
    },
    {
      title: "惜黄花慢 · 吴文英",
      art: 'songci-rivers:ch10',
      artPrompt: "古诗《惜黄花慢》意境插画：送客吴皋。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "送客吴皋。\n正试霜夜冷，枫落长桥。\n望天不尽，背城渐杳，离亭黯黯，恨水迢迢。\n翠香零落红衣老，暮愁锁、残柳眉梢。\n念瘦腰。\n沈郎旧日，曾系兰桡。\n仙人凤咽琼箫。\n怅断魂送远，九辨难招。\n醉鬟留盼，小窗翦烛，歌云载恨，飞上银霄。\n素秋不解随船去，败红趁、一叶寒涛。\n梦翠翘。\n怨鸿料过南谯。",
        pinyin: "sòng kè wú gāo。\nzhèng shì shuāng yè lěng， fēng luò cháng qiáo。\nwàng tiān bù jìn， bèi chéng jiàn yǎo， lí tíng àn àn， hèn shuǐ tiáo tiáo。\ncuì xiāng líng luò hóng yī lǎo， mù chóu suǒ、 cán liǔ méi shāo。\nniàn shòu yāo。\nshěn láng jiù rì， céng xì lán ráo。\nxiān rén fèng yàn qióng xiāo。\nchàng duàn hún sòng yuǎn， jiǔ biàn nán zhāo。\nzuì huán liú pàn， xiǎo chuāng jiǎn zhú， gē yún zǎi hèn， fēi shàng yín xiāo。\nsù qiū bù jiě suí chuán qù， bài hóng chèn、 yī yè hán tāo。\nmèng cuì qiào。\nyuàn hóng liào guò nán qiáo。",
        translation: "在吴地江边送别客人，正是初下霜的寒冷夜晚，枫叶飘落在长桥边。望不到尽头的天边，身后的城渐渐远去，离亭昏暗，恨这流水迢迢；翠叶零落，红花衰老，暮愁锁在残柳的眉梢。想起从前的才子也曾在这里系过小船；笙箫呜咽像仙人送别，断魂远去再也招不回来。醉中她回眸相留，小窗下剪着烛花，歌声载着离恨飞上天空；秋色不肯随船离去，凋落的花瓣追着一叶小船在寒涛里，梦里又见到她的翠翘，那传信的大雁一定飞过了南面的城楼。",
      }
      ],
    },
    {
      title: "瑞鹤仙 · 袁去华",
      art: 'songci-rivers:ch11',
      artPrompt: "古诗《瑞鹤仙》意境插画：郊原初过雨。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "郊原初过雨。\n见败叶零乱，风定犹舞。\n斜阳挂深树。\n映浓愁浅黛，遥山眉妩。\n来时旧路。\n尚岩花、娇黄半吐。\n到而今，唯有溪边流水，见人如故。\n无语。\n邮亭深静，下马还寻，旧曾题处。\n无聊倦旅。\n伤离恨，最愁苦。\n纵收香藏镜，他年重到，人面桃花在否。\n念沈沈、小阁幽窗，有时梦去。",
        pinyin: "jiāo yuán chū guò yǔ。\njiàn bài yè líng luàn， fēng dìng yóu wǔ。\nxié yáng guà shēn shù。\nyìng nóng chóu qiǎn dài， yáo shān méi wǔ。\nlái shí jiù lù。\nshàng yán huā、 jiāo huáng bàn tǔ。\ndào ér jīn， wéi yǒu xī biān liú shuǐ， jiàn rén rú gù。\nwú yǔ。\nyóu tíng shēn jìng， xià mǎ hái xún， jiù céng tí chù。\nwú liáo juàn lǚ。\nshāng lí hèn， zuì chóu kǔ。\nzòng shōu xiāng cáng jìng， tā nián zhòng dào， rén miàn táo huā zài fǒu。\nniàn shěn shěn、 xiǎo gé yōu chuāng， yǒu shí mèng qù。",
        translation: "郊外的原野刚下过雨，败叶零乱飘飞，风停了还在舞动。斜阳挂在深深的树梢，映着远山，像秀美的眉毛。来时的旧路上，山岩间的野花还半开着娇黄；到如今，只有溪边的流水，还像从前一样见人。下马走进静静的驿站，还去寻找从前题诗的地方；旅途中人倦心灰，最愁苦的莫过于离别。就算收藏着香囊和镜子，他年重来，人面桃花还在不在呢？想念那深深的小阁幽窗，有时只能在梦里回去看看。",
      }
      ],
    },
    {
      title: "剑器近 · 袁去华",
      art: 'songci-rivers:ch12',
      artPrompt: "古诗《剑器近》意境插画：夜来雨。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "夜来雨。\n赖倩得、东风吹住。\n海棠正妖饶处。\n且留取。\n悄庭户。\n试细听、莺啼燕语。\n分明共人愁绪。\n怕春去。\n佳树。\n翠阴初转午。\n重帘未卷，乍睡起、寂寞看风絮。\n偷弹清泪寄烟波，见江头故人，为言憔悴如许。\n彩笺无数。\n去却寒暄，到了浑无定据。\n断肠落日千山暮。",
        pinyin: "yè lái yǔ。\nlài qiàn dé、 dōng fēng chuī zhù。\nhǎi táng zhèng yāo ráo chù。\nqiě liú qǔ。\nqiāo tíng hù。\nshì xì tīng、 yīng tí yàn yǔ。\nfēn míng gòng rén chóu xù。\npà chūn qù。\njiā shù。\ncuì yīn chū zhuǎn wǔ。\nzhòng lián wèi juàn， zhà shuì qǐ、 jì mò kàn fēng xù。\ntōu tán qīng lèi jì yān bō， jiàn jiāng tóu gù rén， wèi yán qiáo cuì rú xǔ。\ncǎi jiān wú shù。\nqù què hán xuān， dào le hún wú dìng jù。\nduàn cháng luò rì qiān shān mù。",
        translation: "夜里下了一场雨，幸好东风把雨吹停了；海棠花正开得娇艳，且把它留住。静静的庭院里，细听黄莺啼叫、燕子呢喃，分明和人一样满怀愁绪，害怕春天离去。绿荫渐渐转过正午，重重帘子还没卷起，睡起来寂寞地看风中飘飞的柳絮。偷偷弹着清泪寄给烟波，见了江头的老朋友，就说我已经憔悴成这样；来信虽然多，寒暄之后，归期终究没有定准。夕阳西下，千山渐渐昏暗，真叫人断肠。",
      }
      ],
    },
    {
      title: "安公子 · 袁去华",
      art: 'songci-rivers:ch13',
      artPrompt: "古诗《安公子》意境插画：弱柳丝千缕。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "弱柳丝千缕。\n嫩黄匀遍鸦啼处。\n寒入罗衣春尚浅，过一番风雨。\n问燕子来时，绿水桥边路。\n曾画楼、见个人人否。\n料静掩云窗，尘满哀弦危柱。\n庾信愁如许。\n为谁都著眉端聚。\n独立东风弹泪眼，寄烟波东去。\n念永昼春闲，人倦如何度。\n闲傍枕、百啭黄鹂语。\n唤觉来厌厌，残照依然花坞。",
        pinyin: "ruò liǔ sī qiān lǚ。\nnèn huáng yún biàn yā tí chù。\nhán rù luó yī chūn shàng qiǎn， guò yī fān fēng yǔ。\nwèn yàn zi lái shí， lǜ shuǐ qiáo biān lù。\ncéng huà lóu、 jiàn gè rén rén fǒu。\nliào jìng yǎn yún chuāng， chén mǎn āi xián wēi zhù。\nyǔ xìn chóu rú xǔ。\nwèi shuí dōu zhù méi duān jù。\ndú lì dōng fēng tán lèi yǎn， jì yān bō dōng qù。\nniàn yǒng zhòu chūn xián， rén juàn rú hé dù。\nxián bàng zhěn、 bǎi zhuàn huáng lí yǔ。\nhuàn jué lái yàn yàn， cán zhào yī rán huā wù。",
        translation: "柔弱的柳丝有千万缕，嫩黄的颜色均匀地涂满乌鸦啼叫的枝头。寒气钻进罗衣，春天还浅，又刚经过一场风雨。问一问飞来的燕子，绿水桥边的那条路上，可曾在画楼见过那个人？料想她静静掩着门窗，琴上落满了灰尘。我的愁像古人一样多，是为了谁聚在眉头？独自站在东风里抹眼泪，把泪水寄给东去的烟波。漫长的春日闲得无聊，人疲倦了可怎么过；靠着枕头听黄鹂婉转地叫，醒来还是没精打采，夕阳照着开满花的园子。",
      }
      ],
    },
    {
      title: "卜算子 · 陆游",
      art: 'songci-rivers:ch14',
      artPrompt: "古诗《卜算子》意境插画：驿外断桥边，寂寞开无主。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "驿外断桥边，寂寞开无主。\n已是黄昏独自愁，更著风和雨。\n无意苦争春，一任群芳妒。\n零落成泥碾作尘，只有香如故。",
        pinyin: "yì wài duàn qiáo biān， jì mò kāi wú zhǔ。\nyǐ shì huáng hūn dú zì chóu， gèng zhù fēng hé yǔ。\nwú yì kǔ zhēng chūn， yī rèn qún fāng dù。\nlíng luò chéng ní niǎn zuò chén， zhǐ yǒu xiāng rú gù。",
        translation: "驿站外面，断桥旁边，梅花寂寞地开放，没有人来欣赏。已经是黄昏，它正独自发愁，又加上风吹雨打。它无意苦苦争抢春天的风光，任凭百花嫉妒；凋谢飘落，被碾成泥土和灰尘，只有那清香还和从前一样。",
      }
      ],
    },
    {
      title: "凤箫吟・芳草 · 韩缜",
      art: 'songci-rivers:ch15',
      artPrompt: "古诗《凤箫吟・芳草》意境插画：锁离愁，连绵无际，来时陌上初熏。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "锁离愁，连绵无际，来时陌上初熏。\n绣帏人念远，暗垂珠泪，泣送征轮。\n长亭长在眼，更重重、远水孤云。\n但望极楼高，尽日目断王孙。\n消魂。\n池塘别后，曾行处、绿妒轻裙。\n恁时携素手，乱花飞絮里，缓步香。\n朱颜空自改，向年年、芳意长新。\n遍绿野，嬉游醉眠，莫负青春。",
        pinyin: "suǒ lí chóu， lián mián wú jì， lái shí mò shàng chū xūn。\nxiù wéi rén niàn yuǎn， àn chuí zhū lèi， qì sòng zhēng lún。\ncháng tíng cháng zài yǎn， gèng chóng chóng、 yuǎn shuǐ gū yún。\ndàn wàng jí lóu gāo， jìn rì mù duàn wáng sūn。\nxiāo hún。\nchí táng bié hòu， céng xíng chù、 lǜ dù qīng qún。\nnèn shí xié sù shǒu， luàn huā fēi xù lǐ， huǎn bù xiāng。\nzhū yán kōng zì gǎi， xiàng nián nián、 fāng yì cháng xīn。\nbiàn lǜ yě， xī yóu zuì mián， mò fù qīng chūn。",
        translation: "离愁像连绵无边的芳草，来的时候，小路上的青草正散发着香气。闺中的人思念远方的人，暗暗流着泪，哭送远行的车轮。长亭总在眼前浮现，眼前还有重重远水和孤云；登上高楼望到天边，一整天也望不见远去的人的影子。真叫人伤心，分别以后，从前一起走过的地方，绿草都要嫉妒她的绿裙。那时牵着她白嫩的手，在乱花飞絮里慢慢散步；如今容颜白白地变老了，只有芳草年年长出新绿。愿在绿色的原野上尽情游玩、醉眠，不要辜负了青春。",
      }
      ],
    },
    {
      title: "桂枝香 · 王安石",
      art: 'songci-rivers:ch16',
      artPrompt: "古诗《桂枝香》意境插画：登临送目。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "登临送目。\n正故国晚秋，天气初肃。\n千里澄江似练，翠峰如簇。\n归帆去棹残阳里，背西风、酒旗斜矗。\n彩舟云淡，星河鹭起，画图难足。\n念往昔、繁华竞逐。\n叹门外楼头，悲恨相续。\n千古凭高，对此漫嗟荣辱。\n六朝旧事随流水，但寒烟、芳草凝绿。\n至今商女，时时犹唱，后庭遗曲。",
        pinyin: "dēng lín sòng mù。\nzhèng gù guó wǎn qiū， tiān qì chū sù。\nqiān lǐ chéng jiāng sì liàn， cuì fēng rú cù。\nguī fān qù zhào cán yáng lǐ， bèi xī fēng、 jiǔ qí xié chù。\ncǎi zhōu yún dàn， xīng hé lù qǐ， huà tú nán zú。\nniàn wǎng xī、 fán huá jìng zhú。\ntàn mén wài lóu tóu， bēi hèn xiāng xù。\nqiān gǔ píng gāo， duì cǐ màn jiē róng rǔ。\nliù cháo jiù shì suí liú shuǐ， dàn hán yān、 fāng cǎo níng lǜ。\nzhì jīn shāng nǚ， shí shí yóu chàng， hòu tíng yí qǔ。",
        translation: "登上高处放眼远望，正是故都的晚秋，天气刚刚变得清爽。千里澄澈的江水像一条白练，青翠的山峰密密聚集。夕阳里船来船往，背着西风，酒旗斜斜地竖着；彩船在淡淡的云影里，白鹭从江面飞起，这美景画笔都画不出来。回想当年，这里的人争着追逐繁华，可叹门外的敌兵、楼头的歌舞，悲恨一场接着一场。千古以来登高的人，对此白白地感叹兴亡；六朝旧事随流水去了，只剩寒烟里的芳草一片暗绿。直到如今，歌女还时时唱着那支亡国的旧曲子。",
      }
      ],
    },
    {
      title: "清平乐 · 王安石",
      art: 'songci-rivers:ch17',
      artPrompt: "古诗《清平乐》意境插画：留春不住。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "留春不住。\n费尽莺儿语。\n满地残红宫锦污。\n昨夜南园风雨。\n小怜初上琵琶。\n晓来思绕天涯。\n不肯画堂朱户，春风自在杨花。",
        pinyin: "liú chūn bù zhù。\nfèi jìn yīng ér yǔ。\nmǎn dì cán hóng gōng jǐn wū。\nzuó yè nán yuán fēng yǔ。\nxiǎo lián chū shàng pí pa。\nxiǎo lái sī rào tiān yá。\nbù kěn huà táng zhū hù， chūn fēng zì zài yáng huā。",
        translation: "想留住春天，却留不住，黄莺儿把好话说尽了也没用。满地残红，像被弄脏的宫锦，原来是昨夜南园里刮风下雨。歌女初次抱起琵琶弹奏，天亮时的思念绕遍了天涯。杨花不肯飘进画堂朱门，宁愿在春风里自由自在地飞。",
      }
      ],
    },
    {
      title: "千秋岁引 · 王安石",
      art: 'songci-rivers:ch18',
      artPrompt: "古诗《千秋岁引》意境插画：别馆寒砧，孤城画角。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "别馆寒砧，孤城画角。\n一派秋声入寥廓。\n东归燕从海上去，南来雁向沙头落。\n楚台风，庾楼月，宛如昨。\n无奈被些名利缚。\n无奈被他情担阁。\n可惜风流总闲却。\n当初漫留华表语，而今误我秦楼约。\n梦阑时，酒醒后，思量著。",
        pinyin: "bié guǎn hán zhēn， gū chéng huà jiǎo。\nyī pài qiū shēng rù liáo kuò。\ndōng guī yàn cóng hǎi shàng qù， nán lái yàn xiàng shā tóu luò。\nchǔ tái fēng， yǔ lóu yuè， wǎn rú zuó。\nwú nài bèi xiē míng lì fù。\nwú nài bèi tā qíng dān gé。\nkě xī fēng liú zǒng xián què。\ndāng chū màn liú huá biǎo yǔ， ér jīn wù wǒ qín lóu yuē。\nmèng lán shí， jiǔ xǐng hòu， sī liang zhù。",
        translation: "客馆里传来捣衣的砧声，孤城中响起画角声，一片秋声飘进辽阔的天空。燕子往东飞回海上，大雁向南落在沙头；楚台的风、庾楼的月，都还和从前一样。无奈被人间的名利束缚，无奈被儿女情长耽误，可惜满身才情都白白闲置了。当初白白许下回归的诺言，如今误了我楼前的约会。梦醒的时候，酒醒以后，好好想一想吧。",
      }
      ],
    },
    {
      title: "清平乐 · 王安国",
      art: 'songci-rivers:ch19',
      artPrompt: "古诗《清平乐》意境插画：留春不住。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "留春不住。\n费尽莺儿语。\n满地残红宫锦污。\n昨夜南园风雨。\n小怜初上琵琶。\n晓来思绕天涯。\n不肯画堂朱户，春风自在梨花。",
        pinyin: "liú chūn bù zhù。\nfèi jìn yīng ér yǔ。\nmǎn dì cán hóng gōng jǐn wū。\nzuó yè nán yuán fēng yǔ。\nxiǎo lián chū shàng pí pa。\nxiǎo lái sī rào tiān yá。\nbù kěn huà táng zhū hù， chūn fēng zì zài lí huā。",
        translation: "想留住春天，却留不住，黄莺儿把话说尽了也没用。满地落花残红，像弄脏的宫锦，是昨夜南园的风雨造成的。歌女初次弹起琵琶，天亮时的思念绕遍天涯。梨花不肯开在画堂朱门里，宁愿在春风里自在地飘舞。",
      }
      ],
    },
    {
      title: "临江仙 · 晏几道",
      art: 'songci-rivers:ch20',
      artPrompt: "古诗《临江仙》意境插画：梦后楼台高锁，酒醒帘幕低垂。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "梦后楼台高锁，酒醒帘幕低垂。\n去年春恨却来时。\n落花人独立，微雨燕双飞。\n记得小苹初见，两重心字罗衣。\n琵琶弦上说相思。\n当时明月在，曾照彩云归。",
        pinyin: "mèng hòu lóu tái gāo suǒ， jiǔ xǐng lián mù dī chuí。\nqù nián chūn hèn què lái shí。\nluò huā rén dú lì， wēi yǔ yàn shuāng fēi。\njì de xiǎo píng chū jiàn， liǎng chóng xīn zì luó yī。\npí pa xián shàng shuō xiāng sī。\ndāng shí míng yuè zài， céng zhào cǎi yún guī。",
        translation: "梦醒后，高楼深锁；酒醒时，帘幕低垂。去年春天的愁恨，这时又涌上心头。人在落花中独自站着，微雨里燕子成双成对地飞。记得和小苹初次见面，她穿着绣着两个心字的罗衣；琵琶弦上，弹出了心里的相思。当时的明月还在天上，曾照着她像彩云一样归去。",
      }
      ],
    },
    {
      title: "蝶恋花 · 晏几道",
      art: 'songci-rivers:ch21',
      artPrompt: "古诗《蝶恋花》意境插画：卷絮风头寒欲尽。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "卷絮风头寒欲尽。\n坠粉飘红，日日香成阵。\n新酒又添残酒困。\n今春不减前春恨。\n蝶去莺飞无处问。\n隔水高楼，望断双鱼信。\n恼乱层波横一寸。\n斜阳只与黄昏近。",
        pinyin: "juàn xù fēng tou hán yù jìn。\nzhuì fěn piāo hóng， rì rì xiāng chéng zhèn。\nxīn jiǔ yòu tiān cán jiǔ kùn。\njīn chūn bù jiǎn qián chūn hèn。\ndié qù yīng fēi wú chù wèn。\ngé shuǐ gāo lóu， wàng duàn shuāng yú xìn。\nnǎo luàn céng bō héng yī cùn。\nxié yáng zhī yǔ huáng hūn jìn。",
        translation: "风吹卷着柳絮，寒意快到头了；落花飘粉，天天香气一阵一阵。新添的酒又加重了残酒的困倦，今年春天的愁恨不比去年少。蝴蝶飞走了，黄莺飞远了，无处打听消息；隔着水登上高楼，望穿了，也盼不来一封信。愁得心波翻腾不安，斜阳只和黄昏越靠越近。",
      }
      ],
    },
    {
      title: "蝶恋花 · 晏几道",
      art: 'songci-rivers:ch22',
      artPrompt: "古诗《蝶恋花》意境插画：醉别西楼醒不记。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "醉别西楼醒不记。\n春梦秋云，聚散真容易。\n斜月半窗还少睡。\n画屏闲展吴山翠。\n衣上酒痕诗里字。\n点点行行，总是凄凉意。\n红烛自怜无好计。\n夜寒空替人垂泪。",
        pinyin: "zuì bié xī lóu xǐng bù jì。\nchūn mèng qiū yún， jù sàn zhēn róng yì。\nxié yuè bàn chuāng hái shǎo shuì。\nhuà píng xián zhǎn wú shān cuì。\nyī shàng jiǔ hén shī lǐ zì。\ndiǎn diǎn xíng xíng， zǒng shì qī liáng yì。\nhóng zhú zì lián wú hǎo jì。\nyè hán kōng tì rén chuí lèi。",
        translation: "醉中告别西楼，醒来全不记得了；春梦和秋云一样，聚散真是太容易了。斜月照着半扇窗，还没有睡意，画屏上闲闲地展开吴山的翠色。衣上的酒痕、诗里的字，一点一行，都是凄凉的意味。红烛可怜自己没有办法，夜寒里白白地替人流泪。",
      }
      ],
    },
    {
      title: "蝶恋花 · 晏几道",
      art: 'songci-rivers:ch23',
      artPrompt: "古诗《蝶恋花》意境插画：梦入江南烟水路。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "梦入江南烟水路。\n行尽江南，不与离人遇。\n睡里消魂无说处。\n觉来惆怅消魂误。\n欲尽此情书尺素。\n浮雁沈鱼，终了无凭据。\n却倚缓弦歌别绪。\n断肠移破秦筝柱。",
        pinyin: "mèng rù jiāng nán yān shuǐ lù。\nxíng jìn jiāng nán， bù yǔ lí rén yù。\nshuì lǐ xiāo hún wú shuō chù。\njué lái chóu chàng xiāo hún wù。\nyù jìn cǐ qíng shū chǐ sù。\nfú yàn shěn yú， zhōng liǎo wú píng jù。\nquè yǐ huǎn xián gē bié xù。\nduàn cháng yí pò qín zhēng zhù。",
        translation: "梦里走上江南烟水迷蒙的路，走遍了江南，也没能和想念的人相遇。梦里的伤心没处诉说，醒来更是惆怅。想把这一片深情写进书信，可雁儿飞远了、鱼儿沉底了，信终究送不到。只好倚着缓慢的琴弦唱出离愁，弹到伤心处，把筝柱都移破了。",
      }
      ],
    },
    {
      title: "鹧鸪天 · 晏几道",
      art: 'songci-rivers:ch24',
      artPrompt: "古诗《鹧鸪天》意境插画：彩袖殷勤捧玉锺。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "彩袖殷勤捧玉锺。\n当年拼却醉颜红。\n舞低杨柳楼心月，歌尽桃花扇影风。\n从别后，忆相逢。\n几回魂梦与君同。\n今宵剩把银釭照，犹恐相逢是梦中。",
        pinyin: "cǎi xiù yīn qín pěng yù zhōng。\ndāng nián pīn què zuì yán hóng。\nwǔ dī yáng liǔ lóu xīn yuè， gē jìn táo huā shàn yǐng fēng。\ncóng bié hòu， yì xiāng féng。\njǐ huí hún mèng yǔ jūn tóng。\njīn xiāo shèng bǎ yín gāng zhào， yóu kǒng xiāng féng shì mèng zhōng。",
        translation: "她舞动着彩袖，殷勤地捧着玉杯，当年我甘愿喝得满脸通红。舞姿摇曳，把楼心的月亮都跳低了；歌声悠扬，把桃花扇影里的春风都唱尽了。分别以后，总盼着相逢，多少回梦里和你在一起。今晚我举起银灯细细照看，还怕这次相逢是在梦里。",
      }
      ],
    },
    {
      title: "生查子 · 晏几道",
      art: 'songci-rivers:ch25',
      artPrompt: "古诗《生查子》意境插画：关山魂梦长，鱼雁音尘少。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "关山魂梦长，鱼雁音尘少。\n两鬓可怜青，只为相思老。\n归梦碧纱窗，说与人人道。\n真个别离难，不似相逢好。",
        pinyin: "guān shān hún mèng cháng， yú yàn yīn chén shǎo。\nliǎng bìn kě lián qīng， zhī wèi xiāng sī lǎo。\nguī mèng bì shā chuāng， shuō yǔ rén rén dào。\nzhēn gè bié lí nán， bù sì xiāng féng hǎo。",
        translation: "关山重重，梦也显得漫长，书信却少得可怜。可怜那两鬓的青丝，只为相思变老了。归乡的梦里，在碧纱窗前，说给你听：离别的滋味实在太难熬，真不如相逢在一起好。",
      }
      ],
    },
    {
      title: "清平乐 · 晏几道",
      art: 'songci-rivers:ch26',
      artPrompt: "古诗《清平乐》意境插画：留人不住。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "留人不住。\n醉解兰舟去。\n一棹碧涛春水路。\n过尽晓莺啼处。\n渡头杨柳青青。\n枝枝叶叶离情。\n此后锦书休寄，画楼云雨无凭。",
        pinyin: "liú rén bù zhù。\nzuì jiě lán zhōu qù。\nyī zhào bì tāo chūn shuǐ lù。\nguò jìn xiǎo yīng tí chù。\ndù tóu yáng liǔ qīng qīng。\nzhī zhī yè yè lí qíng。\ncǐ hòu jǐn shū xiū jì， huà lóu yún yǔ wú píng。",
        translation: "想留人，留不住，他喝醉了，解开小船走了。一桨划开碧绿的春水，路过一个个清晨黄莺啼叫的地方。渡口的杨柳青青，枝枝叶叶都是离情。从今以后书信不必再寄了，画楼里的恩恩爱爱，本来就没有凭据。",
      }
      ],
    },
    {
      title: "木兰花・玉楼春 · 晏几道",
      art: 'songci-rivers:ch27',
      artPrompt: "古诗《木兰花・玉楼春》意境插画：秋千院落重帘暮。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "秋千院落重帘暮。\n彩笔闲来题绣户。\n墙头丹杏雨馀花，门外绿杨风后絮。\n朝云信断知何处。\n应作襄王春梦去。\n紫骝认得旧游踪，嘶过画桥东畔路。",
        pinyin: "qiū qiān yuàn luò zhòng lián mù。\ncǎi bǐ xián lái tí xiù hù。\nqiáng tóu dān xìng yǔ yú huā， mén wài lǜ yáng fēng hòu xù。\ncháo yún xìn duàn zhī hé chù。\nyìng zuò xiāng wáng chūn mèng qù。\nzǐ liú rèn de jiù yóu zōng， sī guò huà qiáo dōng pàn lù。",
        translation: "秋千院落里，重重帘子掩着暮色；闲来拿起彩笔，在绣户上题诗。墙头的红杏是雨后剩下的花，门外的绿杨絮是风后飘的絮。她像朝云一样断了音信，不知去了哪里，大概到梦里去相会了吧。紫骝马还认得旧日游玩的踪迹，嘶叫着走过画桥东边的小路。",
      }
      ],
    },
    {
      title: "菩萨蛮 · 晏几道",
      art: 'songci-rivers:ch28',
      artPrompt: "古诗《菩萨蛮》意境插画：哀筝一弄湘江曲。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "哀筝一弄湘江曲。\n声声写尽湘波绿。\n纤指十三弦。\n细将幽恨传。\n当筵秋水慢。\n玉柱斜飞雁。\n弹到断肠时。\n春山眉黛低。",
        pinyin: "āi zhēng yī nòng xiāng jiāng qǔ。\nshēng shēng xiě jìn xiāng bō lǜ。\nxiān zhǐ shí sān xián。\nxì jiāng yōu hèn chuán。\ndāng yán qiū shuǐ màn。\nyù zhù xié fēi yàn。\ntán dào duàn cháng shí。\nchūn shān méi dài dī。",
        translation: "弹起哀婉的筝曲《湘江曲》，一声声写尽了湘水的碧绿。纤细的手指拨弄着十三根弦，细细地把满腹心事传出来。宴席上，她的目光像秋水一样缓缓流转，筝柱斜排，像一行斜飞的雁。弹到最叫人断肠的时候，她那春山般的眉毛，深深地低垂下去。",
      }
      ],
    },
    {
      title: "玉楼春 · 晏几道",
      art: 'songci-rivers:ch29',
      artPrompt: "古诗《玉楼春》意境插画：东风又作无情计。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "东风又作无情计。\n艳粉娇红吹满地。\n碧楼帘影不遮愁，还似去年今日意。\n谁知错管春残事。\n到处登临曾费泪。\n此时金盏直须深，看尽落花能几醉。",
        pinyin: "dōng fēng yòu zuò wú qíng jì。\nyàn fěn jiāo hóng chuī mǎn dì。\nbì lóu lián yǐng bù zhē chóu， hái sì qù nián jīn rì yì。\nshuí zhī cuò guǎn chūn cán shì。\ndào chù dēng lín céng fèi lèi。\ncǐ shí jīn zhǎn zhí xū shēn， kàn jìn luò huā néng jǐ zuì。",
        translation: "东风又拿出无情的手段，把娇艳的花瓣吹得满地都是。碧楼的帘影遮不住愁，还是像去年今天那样的愁。谁知自己多事，去管春天将残的闲事，到处登临都白白流了泪。这时就该把金杯斟得满满的，看尽落花，还能醉上几回呢。",
      }
      ],
    },
    {
      title: "阮郎归 · 晏几道",
      art: 'songci-rivers:ch30',
      artPrompt: "古诗《阮郎归》意境插画：旧香残粉似当初。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "旧香残粉似当初。\n人情恨不如。\n一春犹有数行书。\n秋来书更疏。\n衾凤冷，枕鸳孤。\n愁肠待酒舒。\n梦魂纵有也成虚。\n那堪和梦无。",
        pinyin: "jiù xiāng cán fěn sì dāng chū。\nrén qíng hèn bù rú。\nyī chūn yóu yǒu shù xíng shū。\nqiū lái shū gèng shū。\nqīn fèng lěng， zhěn yuān gū。\nchóu cháng dài jiǔ shū。\nmèng hún zòng yǒu yě chéng xū。\nnà kān hé mèng wú。",
        translation: "旧日的香、残剩的粉，还和当初一样，只恨人的情意不如从前。春天里还有几行书信，到了秋天，信就更稀少了。被上绣的凤凰是冷的，枕上绣的鸳鸯是孤单的，满腹愁肠只有靠酒来舒展。梦里的相见本来就是虚的，更何况如今连梦都没有。",
      }
      ],
    },
    {
      title: "阮郎归 · 晏几道",
      art: 'songci-rivers:ch31',
      artPrompt: "古诗《阮郎归》意境插画：天边金掌露成霜。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "天边金掌露成霜。\n云随雁字长。\n绿杯红袖称重阳。\n人情似故乡。\n兰佩紫，菊簪黄。\n殷勤理旧狂。\n欲将沉醉换悲凉。\n清歌莫断肠。",
        pinyin: "tiān biān jīn zhǎng lù chéng shuāng。\nyún suí yàn zì cháng。\nlǜ bēi hóng xiù chēng chóng yáng。\nrén qíng sì gù xiāng。\nlán pèi zǐ， jú zān huáng。\nyīn qín lǐ jiù kuáng。\nyù jiāng chén zuì huàn bēi liáng。\nqīng gē mò duàn cháng。",
        translation: "天边金铜仙人的掌盘上，露水结成了霜；云彩跟着雁阵，排得长长的。绿杯里有酒，红袖旁有歌，正逢重阳，这里的人情就像故乡一样温暖。身上佩着兰草，头上插着菊花，殷勤地整理起旧日的疏狂。想用沉醉换走悲凉，请唱一曲清歌，可别叫人断了肠。",
      }
      ],
    },
    {
      title: "六么令 · 晏几道",
      art: 'songci-rivers:ch32',
      artPrompt: "古诗《六么令》意境插画：绿阴春尽，飞絮绕香阁。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "绿阴春尽，飞絮绕香阁。\n晚来翠眉宫样，巧把远山学。\n一寸狂心未说，已向横波觉。\n画帘遮币。\n新翻曲妙，暗许闲人带偷掏。\n前度书多隐语，意浅愁难答。\n昨夜诗有回纹，韵险还慵押。\n都待笙歌散了，记取留时霎。\n不消红蜡。\n闲云归后，月在庭花旧阑角。",
        pinyin: "lǜ yīn chūn jìn， fēi xù rào xiāng gé。\nwǎn lái cuì méi gōng yàng， qiǎo bǎ yuǎn shān xué。\nyī cùn kuáng xīn wèi shuō， yǐ xiàng héng bō jué。\nhuà lián zhē bì。\nxīn fān qǔ miào， àn xǔ xián rén dài tōu tāo。\nqián dù shū duō yǐn yǔ， yì qiǎn chóu nán dá。\nzuó yè shī yǒu huí wén， yùn xiǎn hái yōng yā。\ndōu dài shēng gē sàn le， jì qǔ liú shí shà。\nbù xiāo hóng là。\nxián yún guī hòu， yuè zài tíng huā jiù lán jiǎo。",
        translation: "绿树成荫，春天快过完了，柳絮绕着小楼飞来飞去。她照着远山的样式细细画好眉毛，心里的小心事还没说出口，眼睛里早已流露出来。等笙歌都散了，要记住把她多留一小会儿，到那时闲云归去，月亮正照着庭花和旧栏杆的一角。",
      }
      ],
    },
    {
      title: "御街行 · 晏几道",
      art: 'songci-rivers:ch33',
      artPrompt: "古诗《御街行》意境插画：街南绿树春饶絮。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "街南绿树春饶絮。\n雪满游春路。\n树头花艳杂娇云，树底人家朱户。\n北楼闲上，疏帘高卷，直见街南树。\n阑干倚尽犹慵去。\n几度黄昏雨。\n晚春盘马踏青苔，曾傍绿阴深驻。\n落花犹在，香屏空掩，人面知何处。",
        pinyin: "jiē nán lǜ shù chūn ráo xù。\nxuě mǎn yóu chūn lù。\nshù tóu huā yàn zá jiāo yún， shù dǐ rén jiā zhū hù。\nběi lóu xián shàng， shū lián gāo juàn， zhí jiàn jiē nán shù。\nlán gān yǐ jìn yóu yōng qù。\njǐ dù huáng hūn yǔ。\nwǎn chūn pán mǎ tà qīng tái， céng bàng lǜ yīn shēn zhù。\nluò huā yóu zài， xiāng píng kōng yǎn， rén miàn zhī hé chù。",
        translation: "春天街南的绿树飘出漫天柳絮，像雪一样落满游春的路，树头花开得像娇艳的云。我几次在黄昏的雨后登上北楼，倚着栏杆久久舍不得走。落花还在，可当年住在树底朱门里的那个人，不知去了哪里。",
      }
      ],
    },
    {
      title: "虞美人 · 晏几道",
      art: 'songci-rivers:ch34',
      artPrompt: "古诗《虞美人》意境插画：曲阑干外天如水。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "曲阑干外天如水。\n昨夜还曾倚。\n初将明月比佳期。\n长向月圆时候、望人归。\n罗衣著破前香在。\n旧意谁教改。\n一春离恨懒调弦。\n犹有两行闲泪、宝筝前。",
        pinyin: "qǔ lán gān wài tiān rú shuǐ。\nzuó yè hái céng yǐ。\nchū jiāng míng yuè bǐ jiā qī。\ncháng xiàng yuè yuán shí hòu、 wàng rén guī。\nluó yī zhù pò qián xiāng zài。\njiù yì shuí jiào gǎi。\nyī chūn lí hèn lǎn tiáo xián。\nyóu yǒu liǎng háng xián lèi、 bǎo zhēng qián。",
        translation: "弯弯的栏杆外天空像水一样明净，昨夜我也曾在这里倚栏望月。人们总在月圆的时候盼着亲人回来，我也一样。旧衣裳还留着从前的香气，可整整一个春天我都懒得弹筝，只在宝筝前流下两行眼泪。",
      }
      ],
    },
    {
      title: "留春令 · 晏几道",
      art: 'songci-rivers:ch35',
      artPrompt: "古诗《留春令》意境插画：画屏天畔，梦回依约，十洲云水。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "画屏天畔，梦回依约，十洲云水。\n手拈红笺寄人书，写无限、伤春事。\n别浦高楼曾漫倚。\n对江南千里。\n楼下分流水声中，有当日、凭高泪。",
        pinyin: "huà píng tiān pàn， mèng huí yī yuē， shí zhōu yún shuǐ。\nshǒu niān hóng jiān jì rén shū， xiě wú xiàn、 shāng chūn shì。\nbié pǔ gāo lóu céng màn yǐ。\nduì jiāng nán qiān lǐ。\nlóu xià fēn liú shuǐ shēng zhōng， yǒu dāng rì、 píng gāo lèi。",
        translation: "从梦中醒来，画屏上好像还是天边的云和水。我拈起红信纸给远方的人写信，写不尽这一春的伤心事。当年在江边高楼随手倚望，楼下分流的流水声里，还藏着那时流下的眼泪。",
      }
      ],
    },
    {
      title: "思远人 · 晏几道",
      art: 'songci-rivers:ch36',
      artPrompt: "古诗《思远人》意境插画：红叶黄花秋意晚，千里念行客。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "红叶黄花秋意晚，千里念行客。\n飞云过尽，归鸿无信，何处寄书得。\n泪弹不尽临窗滴。\n就砚旋研墨。\n渐写到别来，此情深处，红笺为无色。",
        pinyin: "hóng yè huáng huā qiū yì wǎn， qiān lǐ niàn xíng kè。\nfēi yún guò jìn， guī hóng wú xìn， hé chù jì shū dé。\nlèi tán bù jìn lín chuāng dī。\njiù yàn xuán yán mò。\njiàn xiě dào bié lái， cǐ qíng shēn chù， hóng jiān wèi wú sè。",
        translation: "红叶黄花开，深秋到了，我想念千里之外远行的人，可是飞云过尽，大雁也没有捎来一点消息，往哪里寄信呢。眼泪流不尽，就着窗前滴落的泪水磨墨写信。写到分别后的伤心处，泪水把红信纸都泡得褪了颜色。",
      }
      ],
    },
    {
      title: "生查子 · 王观",
      art: 'songci-rivers:ch37',
      artPrompt: "古诗《生查子》意境插画：关山魂梦长，塞雁音书少。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "关山魂梦长，塞雁音书少。\n两鬓可怜青，一夜相思老。\n归傍碧纱窗，说与人人道。\n真个别离难，不似相逢好。",
        pinyin: "guān shān hún mèng cháng， sāi yàn yīn shū shǎo。\nliǎng bìn kě lián qīng， yī yè xiāng sī lǎo。\nguī bàng bì shā chuāng， shuō yǔ rén rén dào。\nzhēn gè bié lí nán， bù sì xiāng féng hǎo。",
        translation: "关山遥远，梦里思念那样长，边塞的大雁很少捎来书信。两鬓原本还是青黑的，一夜相思就好像变老了。回到碧纱窗前，对亲爱的人说：离别真是难受，哪里比得上相逢好。",
      }
      ],
    },
    {
      title: "水龙吟 · 苏轼",
      art: 'songci-rivers:ch38',
      artPrompt: "古诗《水龙吟》意境插画：似花还似非花，也无人惜从教坠。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "似花还似非花，也无人惜从教坠。\n抛家傍路，思量却是，无情有思。\n萦损柔肠，困酣娇眼，欲开还闭。\n梦随风万里，寻郎去处，又还被、莺呼起。\n不恨此花飞尽，恨西园、落红难缀。\n晓来雨过，遗踪何在，一池萍碎。\n春色三分，二分尘土，一分流水。\n细看来，不是杨花点点，是离人泪。",
        pinyin: "sì huā hái sì fēi huā， yě wú rén xī cóng jiào zhuì。\npāo jiā bàng lù， sī liang què shì， wú qíng yǒu sī。\nyíng sǔn róu cháng， kùn hān jiāo yǎn， yù kāi hái bì。\nmèng suí fēng wàn lǐ， xún láng qù chù， yòu hái bèi、 yīng hū qǐ。\nbù hèn cǐ huā fēi jìn， hèn xī yuán、 luò hóng nán zhuì。\nxiǎo lái yǔ guò， yí zōng hé zài， yī chí píng suì。\nchūn sè sān fēn， èr fēn chén tǔ， yī fēn liú shuǐ。\nxì kàn lái， bù shì yáng huā diǎn diǎn， shì lí rén lèi。",
        translation: "杨花像花又不像花，没有人怜惜，任它四处飘落。它像做梦一样随风飘出万里，去寻找远方的人，又被莺声惊醒。清晨雨过后，它化成一池碎萍；细细看来，那点点杨花哪里是杨花，分明是离别的人的眼泪。",
      }
      ],
    },
    {
      title: "水调歌头 · 苏轼",
      art: 'songci-rivers:ch39',
      artPrompt: "古诗《水调歌头》意境插画：明月几时有，把酒问青天。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "明月几时有，把酒问青天。\n不知天上宫阙，今夕是何年。\n我欲乘风归去，又恐琼楼玉宇，高处不胜寒。\n起舞弄清影，何似在人间。\n转朱阁，低绮户，照无眠。\n不应有恨，何事长向别时圆。\n人有悲欢离合，月有阴晴圆缺，此事古难全。\n但愿人长久，千里共婵娟。",
        pinyin: "míng yuè jǐ shí yǒu， bǎ jiǔ wèn qīng tiān。\nbù zhī tiān shàng gōng quē， jīn xī shì hé nián。\nwǒ yù chéng fēng guī qù， yòu kǒng qióng lóu yù yǔ， gāo chù bù shèng hán。\nqǐ wǔ nòng qīng yǐng， hé sì zài rén jiān。\nzhuǎn zhū gé， dī qǐ hù， zhào wú mián。\nbù yīng yǒu hèn， hé shì cháng xiàng bié shí yuán。\nrén yǒu bēi huān lí hé， yuè yǒu yīn qíng yuán quē， cǐ shì gǔ nán quán。\ndàn yuàn rén cháng jiǔ， qiān lǐ gòng chán juān。",
        translation: "明月是什么时候才有的？我端起酒杯问青天，想乘着风飞回天上的宫阙，又怕那里的玉楼太高太冷，不如在月光下跳舞、陪着自己的影子留在人间。月亮转过红楼、照进窗户，照着睡不着的人，为什么总在人们离别的时候偏偏团圆呢。人有悲欢离合，月有阴晴圆缺，这样的事自古就难两全，只愿亲人平安长久，隔着千里也共赏这轮明月。",
      }
      ],
    },
    {
      title: "临江仙 · 苏轼",
      art: 'songci-rivers:ch40',
      artPrompt: "古诗《临江仙》意境插画：夜饮东坡醒复醉，归来仿佛三更。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "夜饮东坡醒复醉，归来仿佛三更。\n家童鼻息已雷鸣。\n敲门都不应，倚杖听江声。\n长恨此身非我有，何时忘却营营。\n夜阑风静縠纹平。\n小舟从此逝，江海寄馀生。",
        pinyin: "yè yǐn dōng pō xǐng fù zuì， guī lái fǎng fú sān gēng。\njiā tóng bí xī yǐ léi míng。\nqiāo mén dōu bù yìng， yǐ zhàng tīng jiāng shēng。\ncháng hèn cǐ shēn fēi wǒ yǒu， hé shí wàng què yíng yíng。\nyè lán fēng jìng hú wén píng。\nxiǎo zhōu cóng cǐ shì， jiāng hǎi jì yú shēng。",
        translation: "夜里在东坡喝酒，醒了又醉，回来时大约已是三更，家童睡得鼾声像打雷，敲门没人应，我只好拄着拐杖听江水的声音。总遗憾这身子由不得自己，什么时候才能忘掉为名利奔忙。夜深了，风停了，江面平平的，真想坐上小船从此漂走，把余生寄托给江海。",
      }
      ],
    },
    {
      title: "定风波 · 苏轼",
      art: 'songci-rivers:ch41',
      artPrompt: "古诗《定风波》意境插画：莫听穿林打叶声。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "莫听穿林打叶声。\n何妨吟啸且徐行。\n竹杖芒鞋轻胜马。\n谁怕。\n一蓑烟雨任平生。\n料峭春风吹酒醒。\n微冷。\n山头斜照却相迎。\n回首向来萧瑟处。\n归去。\n也无风雨也无晴。",
        pinyin: "mò tīng chuān lín dǎ yè shēng。\nhé fáng yín xiào qiě xú xíng。\nzhú zhàng máng xié qīng shèng mǎ。\nshuí pà。\nyī suō yān yǔ rèn píng shēng。\nliào qiào chūn fēng chuī jiǔ xǐng。\nwēi lěng。\nshān tóu xié zhào què xiāng yíng。\nhuí shǒu xiàng lái xiāo sè chù。\nguī qù。\nyě wú fēng yǔ yě wú qíng。",
        translation: "别听雨点穿过树林打在叶子上的声音，一边吟诗长啸一边慢慢走，拄竹杖、穿草鞋比骑马还轻快，披一件蓑衣任凭风吹雨打。春风吹醒酒意，微微有点冷，山头的斜阳却来迎接我。回头望望刚才风雨萧瑟的地方，回家去吧——其实既没有风雨，也没有晴天。",
      }
      ],
    },
    {
      title: "卜算子 · 苏轼",
      art: 'songci-rivers:ch42',
      artPrompt: "古诗《卜算子》意境插画：缺月挂疏桐，漏断人初静。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "缺月挂疏桐，漏断人初静。\n时见幽人独往来，缥缈孤鸿影。\n惊起却回头，有恨无人省。\n拣尽寒枝不肯栖，枫落吴江冷。",
        pinyin: "quē yuè guà shū tóng， lòu duàn rén chū jìng。\nshí jiàn yōu rén dú wǎng lái， piāo miǎo gū hóng yǐng。\njīng qǐ què huí tóu， yǒu hèn wú rén shěng。\njiǎn jìn hán zhī bù kěn qī， fēng luò wú jiāng lěng。",
        translation: "缺月挂在稀疏的梧桐上，夜深人静，只见幽居的人独自来来往往，像孤雁缥缈的身影。孤雁受惊飞起又回头，心里的愁恨没有人懂得。它挑遍了寒冷的树枝也不肯栖落——枫叶落满吴江，一片清冷。",
      }
      ],
    },
    {
      title: "贺新郎 · 苏轼",
      art: 'songci-rivers:ch43',
      artPrompt: "古诗《贺新郎》意境插画：乳燕飞华屋。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "乳燕飞华屋。\n悄无人、桐阴转午，晚凉新浴。\n手弄生绡白团扇，扇手一时似玉。\n渐困倚、孤眠清熟。\n帘外谁来推绣户，枉教人、梦断瑶台曲。\n又却是，风敲竹。\n石榴半吐红巾蹙。\n待浮花、浪蕊都尽，伴君幽独。\n艳一枝细看取，芳心千重似束。\n又恐被、秋风惊绿。\n若待得君来向此，花前对酒不忍触。\n共粉泪，两蔌蔌。",
        pinyin: "rǔ yàn fēi huá wū。\nqiāo wú rén、 tóng yīn zhuǎn wǔ， wǎn liáng xīn yù。\nshǒu nòng shēng xiāo bái tuán shàn， shàn shǒu yī shí sì yù。\njiàn kùn yǐ、 gū mián qīng shú。\nlián wài shuí lái tuī xiù hù， wǎng jiào rén、 mèng duàn yáo tái qǔ。\nyòu què shì， fēng qiāo zhú。\nshí liú bàn tǔ hóng jīn cù。\ndài fú huā、 làng ruǐ dōu jìn， bàn jūn yōu dú。\nyàn yī zhī xì kàn qǔ， fāng xīn qiān chóng sì shù。\nyòu kǒng bèi、 qiū fēng jīng lǜ。\nruò dài dé jūn lái xiàng cǐ， huā qián duì jiǔ bù rěn chù。\ngòng fěn lèi， liǎng sù sù。",
        translation: "小燕子在华屋里飞，桐荫悄悄移过午后，傍晚凉快，她摇着白团扇渐渐睡熟，忽然帘外有响动惊断了好梦，原来只是风敲竹子。石榴花半开着，像揉皱的红巾，等轻浮的花都开尽了才开，来陪伴孤单的人。等到那个人来看花对酒，又不忍心碰它，怕秋风惊落绿叶，花上的露珠和人的眼泪一起簌簌落下。",
      }
      ],
    },
    {
      title: "洞仙歌 · 苏轼",
      art: 'songci-rivers:ch44',
      artPrompt: "古诗《洞仙歌》意境插画：冰肌玉骨，自清凉无汗。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "冰肌玉骨，自清凉无汗。\n水殿风来暗香满。\n绣帘开、一点明月窥人，人未寝、枕钗横鬓乱。\n起来携素手，庭户无声，时见疏星渡河汉。\n试问夜如何，夜已三更，金波淡、玉绳低转。\n但屈指、西风几时来，又不道、流年暗中偷换。",
        pinyin: "bīng jī yù gǔ， zì qīng liáng wú hàn。\nshuǐ diàn fēng lái àn xiāng mǎn。\nxiù lián kāi、 yī diǎn míng yuè kuī rén， rén wèi qǐn、 zhěn chāi héng bìn luàn。\nqǐ lái xié sù shǒu， tíng hù wú shēng， shí jiàn shū xīng dù hé hàn。\nshì wèn yè rú hé， yè yǐ sān gēng， jīn bō dàn、 yù shéng dī zhuǎn。\ndàn qū zhǐ、 xī fēng jǐ shí lái， yòu bù dào、 liú nián àn zhōng tōu huàn。",
        translation: "她肌肤像冰一样洁白清凉，水殿里吹来带着暗香的风。绣帘开处，明月偷偷往里看，两人牵着手在无声的庭院里散步，看流星悄悄渡过银河。夜已三更，月光淡了，星星也低了；屈指数着秋风几时来，不知不觉，好时光已暗暗溜走了。",
      }
      ],
    },
    {
      title: "江神子・江城子 · 苏轼",
      art: 'songci-rivers:ch45',
      artPrompt: "古诗《江神子・江城子》意境插画：十年生死两茫茫。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "十年生死两茫茫。\n不思量。\n自难忘。\n千里孤坟，无处话凄凉。\n纵使相逢应不识，尘满面，鬓如霜。\n夜来幽梦忽还乡。\n小轩窗。\n正梳妆。\n相顾无言，惟有泪千行。\n料得年年断肠处，明月夜，短松冈。",
        pinyin: "shí nián shēng sǐ liǎng máng máng。\nbù sī liang。\nzì nán wàng。\nqiān lǐ gū fén， wú chù huà qī liáng。\nzòng shǐ xiāng féng yìng bù shí， chén mǎn miàn， bìn rú shuāng。\nyè lái yōu mèng hū huán xiāng。\nxiǎo xuān chuāng。\nzhèng shū zhuāng。\nxiāng gù wú yán， wéi yǒu lèi qiān háng。\nliào dé nián nián duàn cháng chù， míng yuè yè， duǎn sōng gāng。",
        translation: "十年了，一个生一个死，两边都渺茫，不用去想也自然难忘。千里外那座孤零零的坟，没处诉说凄凉，就算相逢，我风尘满面、两鬓如霜，你也认不出了。昨夜梦里忽然回到家乡，你正坐在小窗前梳妆，我们相看无言，只有泪水千行。",
      }
      ],
    },
    {
      title: "永遇乐 · 苏轼",
      art: 'songci-rivers:ch46',
      artPrompt: "古诗《永遇乐》意境插画：明月如霜，好风如水，清景无限。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "明月如霜，好风如水，清景无限。\n曲港跳鱼，圆荷泻露，寂寞无人见。\n如三鼓，铿然一叶，黯黯梦云惊断。\n夜茫茫，重寻无处，觉来小园行遍。\n天涯倦客，山中归路，望断故园心眼。\n燕子楼空，佳人何在，空锁楼中燕。\n古今如梦，何曾梦觉，但有旧欢新怨。\n异时对，黄楼夜景，为余浩叹。",
        pinyin: "míng yuè rú shuāng， hǎo fēng rú shuǐ， qīng jǐng wú xiàn。\nqǔ gǎng tiào yú， yuán hé xiè lù， jì mò wú rén jiàn。\nrú sān gǔ， kēng rán yī yè， àn àn mèng yún jīng duàn。\nyè máng máng， zhòng xún wú chù， jué lái xiǎo yuán xíng biàn。\ntiān yá juàn kè， shān zhōng guī lù， wàng duàn gù yuán xīn yǎn。\nyàn zi lóu kōng， jiā rén hé zài， kōng suǒ lóu zhōng yàn。\ngǔ jīn rú mèng， hé céng mèng jué， dàn yǒu jiù huān xīn yuàn。\nyì shí duì， huáng lóu yè jǐng， wèi yú hào tàn。",
        translation: "明月像霜，好风像水，夜里的清景无限美好。深夜一片叶子落下的声音惊断了我的梦，梦醒后走遍小园，也找不回刚才的梦境。漂泊的倦客望断故园，想起燕子楼空空荡荡，佳人早已不在。古往今来都像一场大梦，人从来没有真正梦醒过——将来的人对着这里的黄楼夜景，也会替我长长叹息。",
      }
      ],
    },
    {
      title: "青玉案 · 苏轼",
      art: 'songci-rivers:ch47',
      artPrompt: "古诗《青玉案》意境插画：三年枕上吴中路。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "三年枕上吴中路。\n遣黄耳、随君去。\n若到松江呼小渡。\n莫惊鸥鹭，四桥尽是，老子经行处。\n辋川图上看春暮。\n常记高人右丞句。\n作个归期天已许。\n春衫犹是，小蛮针线，曾湿西湖雨。",
        pinyin: "sān nián zhěn shàng wú zhōng lù。\nqiǎn huáng ěr、 suí jūn qù。\nruò dào sōng jiāng hū xiǎo dù。\nmò jīng ōu lù， sì qiáo jìn shì， lǎo zǐ jīng xíng chù。\nwǎng chuān tú shàng kàn chūn mù。\ncháng jì gāo rén yòu chéng jù。\nzuò gè guī qī tiān yǐ xǔ。\nchūn shān yóu shì， xiǎo mán zhēn xiàn， céng shī xī hú yǔ。",
        translation: "三年来梦里都想着回江南吴中的路，正好托你回去捎信。你若到了松江口叫小渡船，别惊飞了鸥鹭，四桥一带都是我从前走过的地方。归期定下来了，连老天也答应——身上这件春衫还是亲人缝的针线，曾被西湖的雨淋湿过。",
      }
      ],
    },
    {
      title: "谢池春 · 李之仪",
      art: 'songci-rivers:ch48',
      artPrompt: "古诗《谢池春》意境插画：残寒销尽，疏雨过、清明后。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "残寒销尽，疏雨过、清明后。\n花径敛馀红，风沼萦新皱。\n乳燕穿庭户，飞絮沾襟袖。\n正佳时，仍晚昼。\n著人滋味，真个浓如酒。\n频移带眼，空只恁、厌厌瘦。\n不见又思量，见了还依旧。\n为问频相见，何似长相守。\n天不老，人未偶。\n且将此恨，分付庭前柳。",
        pinyin: "cán hán xiāo jìn， shū yǔ guò、 qīng míng hòu。\nhuā jìng liǎn yú hóng， fēng zhǎo yíng xīn zhòu。\nrǔ yàn chuān tíng hù， fēi xù zhān jīn xiù。\nzhèng jiā shí， réng wǎn zhòu。\nzhù rén zī wèi， zhēn gè nóng rú jiǔ。\npín yí dài yǎn， kōng zhī nèn、 yàn yàn shòu。\nbù jiàn yòu sī liang， jiàn le hái yī jiù。\nwèi wèn pín xiāng jiàn， hé sì zhǎng xiàng shǒu。\ntiān bù lǎo， rén wèi ǒu。\nqiě jiāng cǐ hèn， fēn fù tíng qián liǔ。",
        translation: "清明过后残寒消尽，细雨下过，落花收尽余红，风里池水起了新皱，小燕子穿过庭院，飞絮沾上衣袖，正是好时节，那滋味真像浓酒一样醉人。人却因思念一天天消瘦，不见面又想念，见了面还是留不住。常相见哪比得上长相守？天不老，人不成双，且把这离愁交给庭前的杨柳吧。",
      }
      ],
    },
    {
      title: "卜算子 · 李之仪",
      art: 'songci-rivers:ch49',
      artPrompt: "古诗《卜算子》意境插画：我住长江头，君住长江尾。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "我住长江头，君住长江尾。\n日日思君不见君，共饮长江水。\n此水几时休，此恨何时已。\n只愿君心似我心，定不负相思意。",
        pinyin: "wǒ zhù cháng jiāng tóu， jūn zhù cháng jiāng wěi。\nrì rì sī jūn bù jiàn jūn， gòng yǐn cháng jiāng shuǐ。\ncǐ shuǐ jǐ shí xiū， cǐ hèn hé shí yǐ。\nzhī yuàn jūn xīn sì wǒ xīn， dìng bù fù xiāng sī yì。",
        translation: "我住在长江的上头，你住在长江的末尾，天天想念你却见不到你，好在我们喝的是同一条长江的水。这江水什么时候流完，我的思念才什么时候停止。只愿你的心像我的心，一定不辜负这份相思。",
      }
      ],
    },
    {
      title: "虞美人 · 舒亶",
      art: 'songci-rivers:ch50',
      artPrompt: "古诗《虞美人》意境插画：芙蓉落尽天涵水。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "芙蓉落尽天涵水。\n日暮沧波起。\n背飞双燕帖云寒。\n独向小楼东畔、倚阑看。\n浮生只合尊前老。\n雪满长安道。\n故人早晚上高台。\n赠我江南春色、一枝梅。",
        pinyin: "fú róng luò jìn tiān hán shuǐ。\nrì mù cāng bō qǐ。\nbèi fēi shuāng yàn tiē yún hán。\ndú xiàng xiǎo lóu dōng pàn、 yǐ lán kàn。\nfú shēng zhī hé zūn qián lǎo。\nxuě mǎn cháng ān dào。\ngù rén zǎo wǎn shàng gāo tái。\nzèng wǒ jiāng nán chūn sè、 yī zhī méi。",
        translation: "荷花落尽，天色连着水面，傍晚苍茫的水波涌起，我独自在小楼东边倚着栏杆，看双燕贴着微寒的云背向飞去。人这一生只该在酒杯前慢慢老去，可大雪已铺满长安的道路。老朋友这时候也该登上高台想念我，会折一枝江南春色的梅花寄给我吧。",
      }
      ],
    },
    {
      title: "高阳台 · 韩",
      art: 'songci-rivers:ch51',
      artPrompt: "古诗《高阳台》意境插画：频听银签，重燃绛蜡，年华衮衮惊心。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "频听银签，重燃绛蜡，年华衮衮惊心。\n饯旧迎新，能消几刻光阴。\n老来可惯通宵饮，待不眠、还怕寒侵。\n掩清尊。\n多谢梅花，伴我微吟。\n邻娃已试春妆了，更蜂腰簇翠，燕股横金。\n勾引东风，也知芳思难禁。\n朱颜那有年年好，逞艳游、赢取如今。\n恣登临。\n残雪楼台，迟日园林。",
        pinyin: "pín tīng yín qiān， zhòng rán jiàng là， nián huá gǔn gǔn jīng xīn。\njiàn jiù yíng xīn， néng xiāo jǐ kè guāng yīn。\nlǎo lái kě guàn tōng xiāo yǐn， dài bù mián、 hái pà hán qīn。\nyǎn qīng zūn。\nduō xiè méi huā， bàn wǒ wēi yín。\nlín wá yǐ shì chūn zhuāng le， gèng fēng yāo cù cuì， yàn gǔ héng jīn。\ngōu yǐn dōng fēng， yě zhī fāng sī nán jìn。\nzhū yán nà yǒu nián nián hǎo， chěng yàn yóu、 yíng qǔ rú jīn。\nzì dēng lín。\ncán xuě lóu tái， chí rì yuán lín。",
        translation: "除夕夜里频频听更漏，重新点燃红蜡烛，年华滚滚流逝真叫人心惊。想守岁不睡，又怕寒气侵人，只好掩上酒杯，幸好有梅花伴着我轻轻吟诗。邻家小姑娘已试起了新春的打扮，把东风都勾引来了。青春容颜哪能年年都好，趁如今尽情登高游玩，看残雪里的楼台、春日迟迟的园林。",
      }
      ],
    },
    {
      title: "玉楼春 · 严仁",
      art: 'songci-rivers:ch52',
      artPrompt: "古诗《玉楼春》意境插画：春风只在园西畔。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "春风只在园西畔。\n荠菜花繁胡蝶乱。\n冰池晴绿照还空，香径落红吹已断。\n意长翻恨游丝短。\n尽日相思罗带缓。\n宝奁明月不欺人，明日归来君试看。",
        pinyin: "chūn fēng zhī zài yuán xī pàn。\nqí cài huā fán hú dié luàn。\nbīng chí qíng lǜ zhào hái kōng， xiāng jìng luò hóng chuī yǐ duàn。\nyì cháng fān hèn yóu sī duǎn。\njìn rì xiāng sī luó dài huǎn。\nbǎo lián míng yuè bù qī rén， míng rì guī lái jūn shì kàn。",
        translation: "春风就藏在园子的西边，荠菜花开得正繁，蝴蝶乱飞，晴光下池水绿莹莹地映着天，小路上的落花已被风吹断。我的情意那么长，反而恨游丝太短，整日相思，人也瘦了，衣带一天天松。明亮的镜子不会骗人，等你明天回来看看我就知道了。",
      }
      ],
    },
    {
      title: "生查子 · 刘克庄",
      art: 'songci-rivers:ch53',
      artPrompt: "古诗《生查子》意境插画：繁灯夺霁华。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "繁灯夺霁华。\n戏鼓侵明发。\n物色旧时同，情味中年别。\n浅画镜中眉，深拜楼西月。\n人散市声收，渐入愁时节。",
        pinyin: "fán dēng duó jì huá。\nxì gǔ qīn míng fā。\nwù sè jiù shí tóng， qíng wèi zhōng nián bié。\nqiǎn huà jìng zhōng méi， shēn bài lóu xī yuè。\nrén sàn shì shēng shōu， jiàn rù chóu shí jié。",
        translation: "满街的花灯比雨后晴空的月光还亮，戏鼓声一直闹到天亮。景物还和从前一样，可人到中年，滋味完全不同了。我对着镜子淡淡画眉，向楼西的明月深深下拜。人散了，街市安静下来，愁绪也慢慢涌上心头。",
      }
      ],
    },
    {
      title: "高阳台 · 张炎",
      art: 'songci-rivers:ch54',
      artPrompt: "古诗《高阳台》意境插画：接叶巢莺，平波卷絮，断桥斜日归船。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "接叶巢莺，平波卷絮，断桥斜日归船。\n能几番游，看花又是明年。\n东风且伴蔷薇住，到蔷薇、春已堪怜。\n更凄然。\n万绿西泠，一抹荒烟。\n当年燕子知何处，但苔深韦曲，草暗斜川。\n见说新愁，如今也到鸥边。\n无心再续笙歌梦，掩重门、浅醉闲眠。\n莫开帘。\n怕见飞花，怕听啼鹃。",
        pinyin: "jiē yè cháo yīng， píng bō juàn xù， duàn qiáo xié rì guī chuán。\nnéng jǐ fān yóu， kàn huā yòu shì míng nián。\ndōng fēng qiě bàn qiáng wēi zhù， dào qiáng wēi、 chūn yǐ kān lián。\ngèng qī rán。\nwàn lǜ xī líng， yī mǒ huāng yān。\ndāng nián yàn zi zhī hé chù， dàn tái shēn wéi qǔ， cǎo àn xié chuān。\njiàn shuō xīn chóu， rú jīn yě dào ōu biān。\nwú xīn zài xù shēng gē mèng， yǎn zhòng mén、 qiǎn zuì xián mián。\nmò kāi lián。\npà jiàn fēi huā， pà tīng tí juān。",
        translation: "黄莺在浓密的叶子里筑巢，平缓的水波卷着柳絮，断桥的斜阳里归船缓缓驶来。还能有几回春游呢？再想看花又要等明年。西泠桥边万绿丛中只剩一抹荒烟，当年筑巢的燕子也不知去了哪里。我掩上重门浅醉闲眠，不敢开帘——怕看见飞花，怕听见杜鹃啼。",
      }
      ],
    },
    {
      title: "贺新郎 · 刘克庄",
      art: 'songci-rivers:ch55',
      artPrompt: "古诗《贺新郎》意境插画：深院榴花吐。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "深院榴花吐。\n画帘开、衣纨扇，午风清暑。\n儿女纷纷夸结束，新样钗符艾虎。\n早已有、游人观渡。\n老大逢场慵作戏，任陌头、年少争旗鼓。\n溪雨急，浪花舞。\n灵均标致高如许。\n忆生平、既纫兰佩，更怀椒糈。\n谁信骚魂千载后，波底垂涎角黍。\n又说是、蛟馋龙怒。\n把似而今醒到了，料当年、醉死差无苦。\n聊一笑，吊千古。",
        pinyin: "shēn yuàn liú huā tǔ。\nhuà lián kāi、 yī wán shàn， wǔ fēng qīng shǔ。\nér nǚ fēn fēn kuā jié shù， xīn yàng chāi fú ài hǔ。\nzǎo yǐ yǒu、 yóu rén guān dù。\nlǎo dà féng chǎng yōng zuò xì， rèn mò tóu、 nián shào zhēng qí gǔ。\nxī yǔ jí， làng huā wǔ。\nlíng jūn biāo zhì gāo rú xǔ。\nyì shēng píng、 jì rèn lán pèi， gèng huái jiāo xǔ。\nshuí xìn sāo hún qiān zǎi hòu， bō dǐ chuí xián jiǎo shǔ。\nyòu shuō shì、 jiāo chán lóng nù。\nbǎ sì ér jīn xǐng dào le， liào dāng nián、 zuì sǐ chà wú kǔ。\nliáo yī xiào， diào qiān gǔ。",
        translation: "深深的院子里石榴花开了，午风带来清凉，孩子们纷纷夸耀新装扮，头上戴着艾虎彩符，江边早已有游人等着看赛龙舟。我上了年纪，懒得凑热闹，任凭年轻人争旗擂鼓，只见溪上雨急，浪花飞舞。想起屈原那样高洁的人，谁能想到千年之后，人们把粽子投进江底，说是怕蛟龙嘴馋发怒。姑且一笑，凭吊这位千古诗人。",
      }
      ],
    },
    {
      title: "贺新郎 · 刘克庄",
      art: 'songci-rivers:ch56',
      artPrompt: "古诗《贺新郎》意境插画：湛湛长空黑。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "湛湛长空黑。\n更那堪、斜风细雨，乱愁如织。\n老眼平生空四海，赖有高楼百尺。\n看浩荡、千崖秋色。\n白发书生神州泪，尽凄凉、不向牛山滴。\n追往事，去无迹。\n少年自负凌云笔。\n到而今、春华落尽，满怀萧瑟。\n常恨世人新意少，爱说南朝狂客。\n把破帽、年年拈出。\n若对黄花孤负酒，怕黄花、也笑人岑寂。\n鸿北去，日西匿。",
        pinyin: "zhàn zhàn cháng kōng hēi。\ngèng nà kān、 xié fēng xì yǔ， luàn chóu rú zhī。\nlǎo yǎn píng shēng kōng sì hǎi， lài yǒu gāo lóu bǎi chǐ。\nkàn hào dàng、 qiān yá qiū sè。\nbái fà shū shēng shén zhōu lèi， jìn qī liáng、 bù xiàng niú shān dī。\nzhuī wǎng shì， qù wú jì。\nshào nián zì fù líng yún bǐ。\ndào ér jīn、 chūn huá luò jìn， mǎn huái xiāo sè。\ncháng hèn shì rén xīn yì shǎo， ài shuō nán cháo kuáng kè。\nbǎ pò mào、 nián nián niān chū。\nruò duì huáng huā gū fù jiǔ， pà huáng huā、 yě xiào rén cén jì。\nhóng běi qù， rì xī nì。",
        translation: "长空黑沉沉的，又添斜风细雨，愁绪像乱麻一样织满心头。登上百尺高楼，看千山万岭浩浩荡荡的秋色。我这白发书生为神州流泪，满心凄凉，却不为自己伤心。年轻时自负有一支凌云的笔，到如今春花落尽，满怀萧瑟。总恨世人写诗缺少新意，年年只会把落帽那顶破帽拈出来说；对着菊花若不肯喝酒，怕菊花也要笑人冷清。大雁向北飞去，太阳向西落藏。",
      }
      ],
    },
    {
      title: "玉楼春 · 刘克庄",
      art: 'songci-rivers:ch57',
      artPrompt: "古诗《玉楼春》意境插画：年年跃马长安市。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "年年跃马长安市。\n客舍似家家似寄。\n青钱换酒日无何，红烛呼庐宵不寐。\n易挑锦妇机中字。\n难得玉人心下事。\n男儿西北有神州，莫滴水西桥畔泪。",
        pinyin: "nián nián yuè mǎ cháng ān shì。\nkè shè sì jiā jiā sì jì。\nqīng qián huàn jiǔ rì wú hé， hóng zhú hū lú xiāo bù mèi。\nyì tiāo jǐn fù jī zhōng zì。\nnán dé yù rén xīn xià shì。\nnán ér xī běi yǒu shén zhōu， mò dī shuǐ xī qiáo pàn lèi。",
        translation: "他年年在京城街上跃马游乐，住客舍像回了家，真正的家倒像借宿。白天拿铜钱换酒喝，夜里点着红烛掷骰赌博，一宿不睡。妻子织锦寄来的心事容易读懂，歌女的心思却难猜。男儿要记得西北还有大好国土，别把眼泪滴在水西桥畔的风月里。",
      }
      ],
    },
    {
      title: "好事近 · 韩元吉",
      art: 'songci-rivers:ch58',
      artPrompt: "古诗《好事近》意境插画：凝碧旧池头，一听管弦凄切。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "凝碧旧池头，一听管弦凄切。\n多少梨园声在，总不堪华发。\n杏花无处避春愁，也傍野烟发。\n惟有御沟声断，似知人呜咽。",
        pinyin: "níng bì jiù chí tóu， yī tīng guǎn xián qī qiè。\nduō shǎo lí yuán shēng zài， zǒng bù kān huá fà。\nxìng huā wú chù bì chūn chóu， yě bàng yě yān fā。\nwéi yǒu yù gōu shēng duàn， sì zhī rén wū yàn。",
        translation: "站在旧日凝碧池边，一听管弦乐声就满心凄切。当年宫廷的乐声还有多少留在耳边，可人已白发苍苍承受不起了。杏花无处躲避春愁，只好在荒野的烟霭旁开放。只有御沟的水声断断续续，像懂得人的呜咽。",
      }
      ],
    },
    {
      title: "六州歌头 · 韩元吉",
      art: 'songci-rivers:ch59',
      artPrompt: "古诗《六州歌头》意境插画：东风著意。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "东风著意。\n先上小桃枝。\n红粉腻。\n娇如醉。\n倚朱扉。\n记年时。\n隐映新妆，面临水岸。\n春将半。\n云日暖。\n斜桥转。\n夹城西。\n草软莎平跋马，垂杨渡、玉勒争嘶。\n认蛾眉凝笑，脸薄拂燕支。\n绣户曾窥。\n恨依依。\n共携手处。\n香如雾。\n红随步。\n怨春迟。\n消瘦损。\n凭谁问。\n只花知。\n泪空垂。\n旧日堂前燕，和烟雨，又双飞。\n人自老。\n春长好。\n梦佳期。\n前度刘郎，几许风流地，花也应悲。\n但茫茫暮霭，目断武陵溪。\n往事难追。",
        pinyin: "dōng fēng zhù yì。\nxiān shàng xiǎo táo zhī。\nhóng fěn nì。\njiāo rú zuì。\nyǐ zhū fēi。\njì nián shí。\nyǐn yìng xīn zhuāng， miàn lín shuǐ àn。\nchūn jiāng bàn。\nyún rì nuǎn。\nxié qiáo zhuǎn。\njiá chéng xī。\ncǎo ruǎn shā píng bá mǎ， chuí yáng dù、 yù lè zhēng sī。\nrèn é méi níng xiào， liǎn báo fú yàn zhī。\nxiù hù céng kuī。\nhèn yī yī。\ngòng xié shǒu chù。\nxiāng rú wù。\nhóng suí bù。\nyuàn chūn chí。\nxiāo shòu sǔn。\npíng shuí wèn。\nzhī huā zhī。\nlèi kōng chuí。\njiù rì táng qián yàn， hé yān yǔ， yòu shuāng fēi。\nrén zì lǎo。\nchūn cháng hǎo。\nmèng jiā qī。\nqián dù liú láng， jǐ xǔ fēng liú dì， huā yě yìng bēi。\ndàn máng máng mù ǎi， mù duàn wǔ líng xī。\nwǎng shì nán zhuī。",
        translation: "春风有意，先吹上小桃枝，粉嫩的花娇得像喝醉了，倚着红色的门扉。记得去年，她新妆的笑脸映着水岸，我们携手走过软草平沙，垂杨渡口骏马争嘶。如今旧日堂前的燕子冒着烟雨又双双飞回，人却在一天天老去，春光还是那么好。望断茫茫暮霭，往事再也追不回来了。",
      }
      ],
    },
    {
      title: "烛影摇红 · 张抡",
      art: 'songci-rivers:ch60',
      artPrompt: "古诗《烛影摇红》意境插画：双阙中天，凤楼十二春寒浅。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "双阙中天，凤楼十二春寒浅。\n去年元夜奉宸游，曾侍瑶池宴。\n玉殿珠帘尽卷。\n拥群仙、蓬壶阆苑。\n五云深处，万烛光中，揭天丝管。\n驰隙流年，恍如一瞬星霜换。\n今宵谁念泣孤臣，回首长安远。\n可是尘缘未断。\n谩惆怅、华胥梦短。\n满怀幽恨，数点寒灯，几声归雁。",
        pinyin: "shuāng quē zhōng tiān， fèng lóu shí èr chūn hán qiǎn。\nqù nián yuán yè fèng chén yóu， céng shì yáo chí yàn。\nyù diàn zhū lián jìn juàn。\nyōng qún xiān、 péng hú láng yuàn。\nwǔ yún shēn chù， wàn zhú guāng zhōng， jiē tiān sī guǎn。\nchí xì liú nián， huǎng rú yī shùn xīng shuāng huàn。\njīn xiāo shuí niàn qì gū chén， huí shǒu zhǎng ān yuǎn。\nkě shì chén yuán wèi duàn。\nmàn chóu chàng、 huá xū mèng duǎn。\nmǎn huái yōu hèn， shù diǎn hán dēng， jǐ shēng guī yàn。",
        translation: "宫门高耸入云，凤楼上春寒还浅。去年元宵夜我侍从皇帝出游，在珠帘尽卷的玉殿里赴宴，万烛光中丝竹管乐响彻云天。时光像从缝隙里跑过的骏马，一转眼一年又过去了。今晚谁还惦念这个流泪的孤臣？回首望，故都长安那么遥远。满怀幽恨，只有几点寒灯、几声归雁。",
      }
      ],
    },
    {
      title: "永遇乐 · 辛弃疾",
      art: 'songci-rivers:ch61',
      artPrompt: "古诗《永遇乐》意境插画：千古江山，英雄无觅，孙仲谋处。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "千古江山，英雄无觅，孙仲谋处。\n舞榭歌台，风流总被，雨打风吹去。\n斜阳草树，寻常巷陌，人道寄奴曾住。\n想当年，金戈铁马，气吞万里如虎。\n元嘉草草，封狼居胥，赢得仓皇北顾。\n四十三年，望中犹记，烽火扬州路。\n可堪回首，佛狸祠下，一片神鸦社鼓。\n凭谁问，廉颇老矣，尚能饭否。",
        pinyin: "qiān gǔ jiāng shān， yīng xióng wú mì， sūn zhòng móu chù。\nwǔ xiè gē tái， fēng liú zǒng bèi， yǔ dǎ fēng chuī qù。\nxié yáng cǎo shù， xún cháng xiàng mò， rén dào jì nú céng zhù。\nxiǎng dāng nián， jīn gē tiě mǎ， qì tūn wàn lǐ rú hǔ。\nyuán jiā cǎo cǎo， fēng láng jū xū， yíng dé cāng huáng běi gù。\nsì shí sān nián， wàng zhōng yóu jì， fēng huǒ yáng zhōu lù。\nkě kān huí shǒu， fó lí cí xià， yī piàn shén yā shè gǔ。\npíng shuí wèn， lián pō lǎo yǐ， shàng néng fàn fǒu。",
        translation: "千古江山依旧，却再也找不到孙权那样的英雄，当年的歌舞楼台都被雨打风吹去了。想当年刘裕金戈铁马，气吞万里如虎；可草草出兵，只落得仓皇败逃、频频北望。四十三年了，望中还记得扬州一带的烽火，如今佛狸祠下是一片神鸦的叫声和社日的鼓声，叫人不忍回首。还有谁来问一句：廉颇老了，饭量还好吗？",
      }
      ],
    },
    {
      title: "绿意・疏影 · 张炎",
      art: 'songci-rivers:ch62',
      artPrompt: "古诗《绿意・疏影》意境插画：碧圆自洁。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "碧圆自洁。\n向浅洲远渚，亭亭清绝。\n犹有遗簪，不展秋心，能卷几多炎热。\n鸳鸯密语同倾盖，且莫与、浣纱人说。\n恐怨歌、忽断花风，碎却翠云千叠。\n回首当年汉舞，怕飞去、谩皱留仙裙折。\n恋恋青衫，犹染枯香，还叹鬓丝飘雪。\n盘心清露如铅水，又一夜、西风吹折。\n喜静看、匹练秋光，倒泻半湖明月。",
        pinyin: "bì yuán zì jié。\nxiàng qiǎn zhōu yuǎn zhǔ， tíng tíng qīng jué。\nyóu yǒu yí zān， bù zhǎn qiū xīn， néng juàn jǐ duō yán rè。\nyuān yāng mì yǔ tóng qīng gài， qiě mò yǔ、 huàn shā rén shuō。\nkǒng yuàn gē、 hū duàn huā fēng， suì què cuì yún qiān dié。\nhuí shǒu dāng nián hàn wǔ， pà fēi qù、 màn zhòu liú xiān qún zhé。\nliàn liàn qīng shān， yóu rǎn kū xiāng， hái tàn bìn sī piāo xuě。\npán xīn qīng lù rú qiān shuǐ， yòu yī yè、 xī fēng chuī zhé。\nxǐ jìng kàn、 pǐ liàn qiū guāng， dǎo xiè bàn hú míng yuè。",
        translation: "碧绿圆圆的荷叶自己长得很洁净，亭亭立在浅洲远渚上，卷着叶子像要卷住一夏的炎热。鸳鸯在荷叶下悄悄说着话，像同撑一把绿伞。夜里清露像铅水一样躺在叶心，一夜西风又把它吹折。最爱静静看着秋光像一匹白绢，把半湖明月倒映在水中。",
      }
      ],
    },
    {
      title: "绿头鸭・多丽 · 晁端礼",
      art: 'songci-rivers:ch63',
      artPrompt: "古诗《绿头鸭・多丽》意境插画：晚云收，淡天一片琉璃。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "晚云收，淡天一片琉璃。\n烂银盘、来从海底，皓色千里澄辉。\n莹无尘、素娥淡伫，静可数、丹桂参差。\n玉露初零，金风未凛，一年无似此佳时。\n露坐久，疏莹时度，乌鹊正南飞。\n瑶台冷，栏干凭暖，玉下迟迟。\n念佳人，音尘别后，对此应解相思。\n最关情、漏声正永，暗断肠、花影偷移。\n料得来宵，清光未减，阴晴天气又争知。\n共凝恋、如今别后，还是隔年期。\n人强健，清尊素影，长愿相随。",
        pinyin: "wǎn yún shōu， dàn tiān yī piàn liú lí。\nlàn yín pán、 lái cóng hǎi dǐ， hào sè qiān lǐ chéng huī。\nyíng wú chén、 sù é dàn zhù， jìng kě shù、 dān guì cēn cī。\nyù lù chū líng， jīn fēng wèi lǐn， yī nián wú sì cǐ jiā shí。\nlù zuò jiǔ， shū yíng shí dù， wū què zhèng nán fēi。\nyáo tái lěng， lán gān píng nuǎn， yù xià chí chí。\nniàn jiā rén， yīn chén bié hòu， duì cǐ yìng jiě xiāng sī。\nzuì guān qíng、 lòu shēng zhèng yǒng， àn duàn cháng、 huā yǐng tōu yí。\nliào dé lái xiāo， qīng guāng wèi jiǎn， yīn qíng tiān qì yòu zhēng zhī。\ngòng níng liàn、 rú jīn bié hòu， hái shì gé nián qī。\nrén qiáng jiàn， qīng zūn sù yǐng， cháng yuàn xiāng suí。",
        translation: "傍晚的云收起来了，淡蓝的天空像一片琉璃，明月像银盘从海底升上来，皎洁的清辉照澈千里。露水刚落，秋风还不冷，一年里没有比这更好的时光。想念远方的人，对着这轮月该也一样相思；漏声长长，花影悄悄移动，让人暗暗伤心。只愿远方的人都平安强健，能与这清酒和明月长久相随。",
      }
      ],
    },
    {
      title: "洞仙歌 · 李元膺",
      art: 'songci-rivers:ch64',
      artPrompt: "古诗《洞仙歌》意境插画：雪云散尽，放晓晴池院。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "雪云散尽，放晓晴池院。\n杨柳于人便青眼。\n更风流多处，一点梅心、相映远。\n约略轻笑浅。\n一年春好处，不在浓芳，小艳疏香最娇软。\n到清明时候，百紫千红花正乱。\n已失春风一半。\n蚤占取韶光，共追游，但莫管春寒，醉红自暖。",
        pinyin: "xuě yún sàn jìn， fàng xiǎo qíng chí yuàn。\nyáng liǔ yú rén biàn qīng yǎn。\ngèng fēng liú duō chù， yī diǎn méi xīn、 xiāng yìng yuǎn。\nyuē lüè qīng xiào qiǎn。\nyī nián chūn hǎo chù， bù zài nóng fāng， xiǎo yàn shū xiāng zuì jiāo ruǎn。\ndào qīng míng shí hòu， bǎi zǐ qiān hóng huā zhèng luàn。\nyǐ shī chūn fēng yī bàn。\nzǎo zhàn qǔ sháo guāng， gòng zhuī yóu， dàn mò guǎn chūn hán， zuì hóng zì nuǎn。",
        translation: "雪云散尽，清晨的池院放了晴，杨柳早早对人吐出青青新芽，梅花远远映衬，像浅浅含笑。一年里春光最好的时候，不在浓艳的繁花，而在早春这淡淡的清香里。趁早占住这好春光一起去游赏吧，别管春寒料峭，喝了酒脸自然红暖。",
      }
      ],
    },
    {
      title: "渔家傲 · 朱服",
      art: 'songci-rivers:ch65',
      artPrompt: "古诗《渔家傲》意境插画：小雨廉纤风细细。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "小雨廉纤风细细。\n万家杨柳轻烟里。\n恋树湿花飞不起。\n愁无比。\n和春付与西流水。\n九十光阴能有几。\n金龟解尽留无计。\n寄语东城沽酒市。\n拼一醉。\n而今乐事他年泪。",
        pinyin: "xiǎo yǔ lián xiān fēng xì xì。\nwàn jiā yáng liǔ qīng yān lǐ。\nliàn shù shī huā fēi bù qǐ。\nchóu wú bǐ。\nhé chūn fù yǔ xī liú shuǐ。\njiǔ shí guāng yīn néng yǒu jǐ。\njīn guī jiě jìn liú wú jì。\njì yǔ dōng chéng gū jiǔ shì。\npīn yī zuì。\nér jīn lè shì tā nián lèi。",
        translation: "小雨细细，微风轻轻，千家万户的杨柳都笼罩在轻烟里，留恋树枝的湿花飞不起来。九十天的春光能有几天呢？就算解下金龟换酒也留不住春天。捎话给东城卖酒的市场：拼一醉吧！只是今天的乐事，到将来回想都是眼泪。",
      }
      ],
    },
    {
      title: "青门饮 · 时彦",
      art: 'songci-rivers:ch66',
      artPrompt: "古诗《青门饮》意境插画：胡马嘶风，汉旗翻雪，彤云又吐，一竿残照。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "胡马嘶风，汉旗翻雪，彤云又吐，一竿残照。\n古木连空，乱山无数，行尽暮沙衰草。\n星斗横幽馆，夜无眠、灯花空老。\n雾浓香鸭，冰凝泪烛，霜天难晓。\n长记晓妆才了，一杯未尽，离怀多少。\n醉里秋波，梦中朝雨，都是醒时烦恼。\n料有牵情处，忍思量、耳边曾道。\n甚时跃马归来，认得迎门轻笑。",
        pinyin: "hú mǎ sī fēng， hàn qí fān xuě， tóng yún yòu tǔ， yī gān cán zhào。\ngǔ mù lián kōng， luàn shān wú shù， xíng jìn mù shā shuāi cǎo。\nxīng dòu héng yōu guǎn， yè wú mián、 dēng huā kōng lǎo。\nwù nóng xiāng yā， bīng níng lèi zhú， shuāng tiān nán xiǎo。\ncháng jì xiǎo zhuāng cái le， yī bēi wèi jìn， lí huái duō shǎo。\nzuì lǐ qiū bō， mèng zhōng cháo yǔ， dōu shì xǐng shí fán nǎo。\nliào yǒu qiān qíng chù， rěn sī liang、 ěr biān céng dào。\nshèn shí yuè mǎ guī lái， rèn de yíng mén qīng xiào。",
        translation: "胡马迎风嘶叫，军旗在风雪里翻卷，红云透出，一竿高的残阳照着大地。古树连着天空，乱山无数，走尽了暮色里的沙地衰草，夜里在客馆睡不着，灯花白白烧尽，霜天难熬到亮。总记得你早晨刚梳好妆，一杯酒还没喝完，满心都是离愁。最记得你在耳边说过：等你骑马回来那天，还认得你迎门的轻笑。",
      }
      ],
    },
    {
      title: "望海潮 · 秦观",
      art: 'songci-rivers:ch67',
      artPrompt: "古诗《望海潮》意境插画：梅英疏淡，冰澌溶泄，东风暗换年华。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "梅英疏淡，冰澌溶泄，东风暗换年华。\n金谷俊游，铜驼巷陌，新晴细履平沙。\n长记误随车。\n正絮翻蝶舞，芳思交加。\n柳下桃蹊，乱分春色到人家。\n西园夜饮鸣笳。\n有华灯碍月，飞盖妨花。\n兰苑未空，行人渐老，重来是事堪嗟。\n烟暝酒旗斜。\n但倚楼极目，时见栖鸦。\n无奈归心。\n暗随流水到天涯。",
        pinyin: "méi yīng shū dàn， bīng sī róng xiè， dōng fēng àn huàn nián huá。\njīn gǔ jùn yóu， tóng tuó xiàng mò， xīn qíng xì lǚ píng shā。\ncháng jì wù suí chē。\nzhèng xù fān dié wǔ， fāng sī jiāo jiā。\nliǔ xià táo qī， luàn fēn chūn sè dào rén jiā。\nxī yuán yè yǐn míng jiā。\nyǒu huá dēng ài yuè， fēi gài fáng huā。\nlán yuàn wèi kōng， xíng rén jiàn lǎo， chóng lái shì shì kān jiē。\nyān míng jiǔ qí xié。\ndàn yǐ lóu jí mù， shí jiàn qī yā。\nwú nài guī xīn。\nàn suí liú shuǐ dào tiān yá。",
        translation: "梅花稀疏淡了，冰凌消融，东风暗暗换走了年华。记得当年趁新晴出游，柳絮翻飞、蝴蝶起舞，柳下桃边把春色乱分到人家；西园夜宴，华灯挡住了月色，飞驰的车盖遮住了花。如今园林还在，人却渐渐老了，重游时样样都值得叹息。回家的念头，早暗暗随着流水去了天涯。",
      }
      ],
    },
    {
      title: "满庭芳 · 秦观",
      art: 'songci-rivers:ch68',
      artPrompt: "古诗《满庭芳》意境插画：山抹微云，天连衰草，画角声断谯门。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "山抹微云，天连衰草，画角声断谯门。\n暂停征棹，聊共引离尊。\n多少蓬莱旧事，空回首、烟霭纷纷。\n斜阳外，寒鸦万点，流水绕孤村。\n销魂。\n当此际，香囊暗解，罗带轻分。\n谩赢得、青楼薄名存。\n此去何时见也，襟袖上、空惹啼痕。\n伤情处，高城望断，灯火已黄昏。",
        pinyin: "shān mǒ wēi yún， tiān lián shuāi cǎo， huà jiǎo shēng duàn qiáo mén。\nzàn tíng zhēng zhào， liáo gòng yǐn lí zūn。\nduō shǎo péng lái jiù shì， kōng huí shǒu、 yān ǎi fēn fēn。\nxié yáng wài， hán yā wàn diǎn， liú shuǐ rào gū cūn。\nxiāo hún。\ndāng cǐ jì， xiāng náng àn jiě， luó dài qīng fēn。\nmàn yíng dé、 qīng lóu báo míng cún。\ncǐ qù hé shí jiàn yě， jīn xiù shàng、 kōng rě tí hén。\nshāng qíng chù， gāo chéng wàng duàn， dēng huǒ yǐ huáng hūn。",
        translation: "远山抹着一缕淡淡的云，天边连着枯黄的秋草，城楼上号角声停了。暂时停下远行的船，姑且一起喝杯离别的酒，多少往事回头看已是烟雾纷纷，斜阳外，寒鸦万点，流水绕着孤村。分别时解下香囊相赠，这一去不知何时再见，回头望高城，只见黄昏的灯火。",
      }
      ],
    },
    {
      title: "浣溪沙 · 秦观",
      art: 'songci-rivers:ch69',
      artPrompt: "古诗《浣溪沙》意境插画：漠漠轻寒上小楼。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "漠漠轻寒上小楼。\n晓阴无赖似穷秋。\n淡烟流水画屏幽。\n自在飞花轻似梦，无边丝雨细如愁。\n宝帘闲挂小银钩。",
        pinyin: "mò mò qīng hán shàng xiǎo lóu。\nxiǎo yīn wú lài sì qióng qiū。\ndàn yān liú shuǐ huà píng yōu。\nzì zài fēi huā qīng sì mèng， wú biān sī yǔ xì rú chóu。\nbǎo lián xián guà xiǎo yín gōu。",
        translation: "淡淡的轻寒漫上小楼，清晨的阴天闷得像深秋，画屏上是一幅烟水流水的幽静图画。自在飘飞的落花轻得像梦，无边无际的细雨细得像愁，珠帘闲闲地挂在银钩上。",
      }
      ],
    },
    {
      title: "阮郎归 · 秦观",
      art: 'songci-rivers:ch70',
      artPrompt: "古诗《阮郎归》意境插画：湘天风雨破寒初。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "湘天风雨破寒初。\n深沉庭院虚。\n丽谯吹罢《小单于》。\n迢迢清夜徂。\n乡梦断，旅魂孤。\n峥嵘岁又除。\n衡阳犹有雁传书。\n郴阳和雁无。",
        pinyin: "xiāng tiān fēng yǔ pò hán chū。\nshēn chén tíng yuàn xū。\nlì qiáo chuī bà《 xiǎo chán yú》。\ntiáo tiáo qīng yè cú。\nxiāng mèng duàn， lǚ hún gū。\nzhēng róng suì yòu chú。\nhéng yáng yóu yǒu yàn chuán shū。\nchēn yáng hé yàn wú。",
        translation: "湘地的风雨刚破开严寒，深深的庭院空荡荡的。城楼上吹完了曲子，清冷的长夜慢慢过去。回乡的梦断了，孤身漂泊在外，艰难的一年又过完了。衡阳还有大雁传书，郴阳这地方却连大雁都不来。",
      }
      ],
    },
    {
      title: "满庭芳 · 秦观",
      art: 'songci-rivers:ch71',
      artPrompt: "古诗《满庭芳》意境插画：晓色云开，春随人意，骤雨才过还晴。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "晓色云开，春随人意，骤雨才过还晴。\n古台芳榭，飞燕蹴红英。\n舞困榆钱自落，秋千外、绿水桥平。\n东风里，朱门映柳，低底按小秦筝。\n多情。\n行乐处，珠钿翠盖，玉辔红缨。\n渐酒空金，花困蓬瀛。\n豆蔻梢头旧恨，十年梦，屈指堪惊。\n凭阑久，疏烟淡日，寂寞下芜城。",
        pinyin: "xiǎo sè yún kāi， chūn suí rén yì， zhòu yǔ cái guò hái qíng。\ngǔ tái fāng xiè， fēi yàn cù hóng yīng。\nwǔ kùn yú qián zì luò， qiū qiān wài、 lǜ shuǐ qiáo píng。\ndōng fēng lǐ， zhū mén yìng liǔ， dī dǐ àn xiǎo qín zhēng。\nduō qíng。\nxíng lè chù， zhū diàn cuì gài， yù pèi hóng yīng。\njiàn jiǔ kōng jīn， huā kùn péng yíng。\ndòu kòu shāo tóu jiù hèn， shí nián mèng， qū zhǐ kān jīng。\npíng lán jiǔ， shū yān dàn rì， jì mò xià wú chéng。",
        translation: "清晨云开了，骤雨刚过天又晴了，燕子掠过古台边的花枝，踢落片片红花。秋千架外绿水涨得平平的，东风里朱门映着绿柳，门里低低传来小秦筝的声音。当年行乐的热闹渐渐散了，十年像一场梦，屈指数来叫人心惊。久久倚着栏杆，看疏烟淡日寂寞地沉下芜城。",
      }
      ],
    },
    {
      title: "帝台春 · 李甲",
      art: 'songci-rivers:ch72',
      artPrompt: "古诗《帝台春》意境插画：芳草碧色，萋萋遍南陌。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "芳草碧色，萋萋遍南陌。\n暖絮乱红，也知人、春愁无力。\n忆得盈盈拾翠侣，共携赏、凤城寒食。\n到今来，海角逢春，天涯为客。\n愁旋释。\n还似织。\n泪暗拭。\n又偷滴。\n谩伫立、遍倚危阑，尽黄昏，也只是、暮云凝碧。\n拼则而已今拼了，忘则怎生便忘得。\n又还问鳞鸿，试重寻消息。",
        pinyin: "fāng cǎo bì sè， qī qī biàn nán mò。\nnuǎn xù luàn hóng， yě zhī rén、 chūn chóu wú lì。\nyì dé yíng yíng shí cuì lǚ， gòng xié shǎng、 fèng chéng hán shí。\ndào jīn lái， hǎi jiǎo féng chūn， tiān yá wèi kè。\nchóu xuán shì。\nhái sì zhī。\nlèi àn shì。\nyòu tōu dī。\nmàn zhù lì、 biàn yǐ wēi lán， jìn huáng hūn， yě zhǐ shì、 mù yún níng bì。\npīn zé ér yǐ jīn pīn le， wàng zé zěn shēng biàn wàng dé。\nyòu hái wèn lín hóng， shì zhòng xún xiāo xī。",
        translation: "碧绿的芳草茂茂盛盛，长满了南边的小路，乱飞的柳絮落花也懂得人的春愁。记得从前和你一起在京城游赏寒食节，如今却在大海边、天尽头作客逢春。愁绪刚松开又密密地缠上来，眼泪擦了又偷偷落下；倚遍高楼的栏杆直到黄昏，眼前只有凝碧的暮云。该舍的已经舍了，可思念怎么也忘不掉，只好再托鱼雁去打听你的消息。",
      }
      ],
    },
    {
      title: "蝶恋花 · 赵令",
      art: 'songci-rivers:ch73',
      artPrompt: "古诗《蝶恋花》意境插画：欲减罗衣寒未去。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "欲减罗衣寒未去。\n不卷珠帘，人在深深处。\n红杏枝头花几许。\n啼痕止恨清明雨。\n尽日沈烟香一缕。\n宿酒醒迟，恼破春情绪。\n飞燕又将归信误。\n小屏风上西江路。",
        pinyin: "yù jiǎn luó yī hán wèi qù。\nbù juàn zhū lián， rén zài shēn shēn chù。\nhóng xìng zhī tóu huā jǐ xǔ。\ntí hén zhǐ hèn qīng míng yǔ。\njìn rì shěn yān xiāng yī lǚ。\nsù jiǔ xǐng chí， nǎo pò chūn qíng xù。\nfēi yàn yòu jiāng guī xìn wù。\nxiǎo píng fēng shàng xī jiāng lù。",
        translation: "想换下厚厚的罗衣，可寒气还没退尽，我不卷珠帘，躲在小楼最深处。红杏枝头的花还剩多少呢？脸上的泪痕只能怪清明的雨。整天守着一缕沉香发呆，宿酒醒得迟，春愁搅得人心烦。飞燕又没捎来他的归信，只好望着小屏风上画的西江远路出神。",
      }
      ],
    },
    {
      title: "醉中真・浣溪沙 · 贺铸",
      art: 'songci-rivers:ch74',
      artPrompt: "古诗《醉中真・浣溪沙》意境插画：不信芳春厌老人。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "不信芳春厌老人。\n老人几度送春归。\n惜春行乐莫辞频。\n巧笑艳歌皆我意，恼花颠酒拼君嗔。\n物情惟有醉中真。",
        pinyin: "bù xìn fāng chūn yàn lǎo rén。\nlǎo rén jǐ dù sòng chūn guī。\nxī chūn xíng lè mò cí pín。\nqiǎo xiào yàn gē jiē wǒ yì， nǎo huā diān jiǔ pīn jūn chēn。\nwù qíng wéi yǒu zuì zhōng zhēn。",
        translation: "我不信芳春会嫌弃老人，老人也送走过好几回春天呢。爱惜春光就要及时行乐，别推辞。美妙的笑靥和艳歌都合我的心意，赏花赏到忘形、喝酒喝到尽兴，任凭别人嗔怪。人间只有醉里才有真心。",
      }
      ],
    },
    {
      title: "人南渡・感皇恩 · 贺铸",
      art: 'songci-rivers:ch75',
      artPrompt: "古诗《人南渡・感皇恩》意境插画：兰芷满芳洲，游思横路。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "兰芷满芳洲，游思横路。\n罗袜尘生步。\n迎顾。\n整鬟颦黛，脉脉两情难语。\n细风吹柳絮。\n人南渡。\n回首旧游，山无重数。\n花底深朱户。\n何处。\n半黄梅子，向晚一帘疏雨。\n断魂分付与。\n春将去。",
        pinyin: "lán zhǐ mǎn fāng zhōu， yóu sī héng lù。\nluó wà chén shēng bù。\nyíng gù。\nzhěng huán pín dài， mò mò liǎng qíng nán yǔ。\nxì fēng chuī liǔ xù。\nrén nán dù。\nhuí shǒu jiù yóu， shān wú zhòng shù。\nhuā dǐ shēn zhū hù。\nhé chù。\nbàn huáng méi zǐ， xiàng wǎn yī lián shū yǔ。\nduàn hún fēn fù yǔ。\nchūn jiāng qù。",
        translation: "兰草白芷长满芳洲，她莲步轻移走来，我上前相迎。她整着鬓发、皱着眉，两情脉脉却难以开口，细风吹着柳絮，人就渡江南去了。回头望旧日同游的地方，山峦重重，那花丛深处的朱门人家，如今在哪里呢？傍晚一帘细雨，梅子半黄，把这让人心碎的思念，交付给即将归去的春天吧。",
      }
      ],
    },
    {
      title: "薄幸 · 贺铸",
      art: 'songci-rivers:ch76',
      artPrompt: "古诗《薄幸》意境插画：艳真多态。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "艳真多态。\n更的的，频回眄睐。\n便认得、琴心相许，与写宜男双带。\n记画堂、斜月朦胧，轻颦微笑娇无奈。\n便翡翠屏开，芙蓉帐掩，与把香罗偷解。\n自过了收灯后，都不见、踏青挑菜。\n几回凭双燕，丁宁深意，往来翻恨重帘碍。\n约何时再。\n正春浓酒暖，人闲昼永无聊赖。\n厌厌睡起，犹有花梢日在。",
        pinyin: "yàn zhēn duō tài。\ngèng de de， pín huí miǎn lài。\nbiàn rèn de、 qín xīn xiāng xǔ， yǔ xiě yí nán shuāng dài。\njì huà táng、 xié yuè méng lóng， qīng pín wēi xiào jiāo wú nài。\nbiàn fěi cuì píng kāi， fú róng zhàng yǎn， yǔ bǎ xiāng luó tōu jiě。\nzì guò le shōu dēng hòu， dōu bù jiàn、 tà qīng tiāo cài。\njǐ huí píng shuāng yàn， dīng níng shēn yì， wǎng lái fān hèn zhòng lián ài。\nyuē hé shí zài。\nzhèng chūn nóng jiǔ nuǎn， rén xián zhòu yǒng wú liáo lài。\nyàn yàn shuì qǐ， yóu yǒu huā shāo rì zài。",
        translation: "她美艳而多情态，眼波频频回头顾盼，两心悄悄相许。记得画堂前斜月朦胧，她轻皱眉头微笑，娇美得让人无可奈何。可自从灯节过后，就再也没见她出来踏青；多少回托燕子传信叮咛心意，来往都被重重帘幕挡住，重新相约不知要等到什么时候。如今春浓酒暖，人闲得白天漫长，百无聊赖，懒懒睡起，日头还挂在花梢上。",
      }
      ],
    },
    {
      title: "伴云来・天香 · 贺铸",
      art: 'songci-rivers:ch77',
      artPrompt: "古诗《伴云来・天香》意境插画：烟络横林，山沈远照，逦迤黄昏钟鼓。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "烟络横林，山沈远照，逦迤黄昏钟鼓。\n烛映帘栊，蛩催机杼，共苦清秋风露。\n不眠思妇，齐应和、几声砧杵。\n惊动天涯倦宦，岁华行暮。\n当年酒狂自负。\n谓东君、已春相付。\n流浪征骖北道，客墙南浦。\n幽恨无人晤语。\n赖明月曾知旧游处。\n好伴云来，还将梦去。",
        pinyin: "yān luò héng lín， shān shěn yuǎn zhào， lǐ yǐ huáng hūn zhōng gǔ。\nzhú yìng lián lóng， qióng cuī jī zhù， gòng kǔ qīng qiū fēng lù。\nbù mián sī fù， qí yìng hé、 jǐ shēng zhēn chǔ。\njīng dòng tiān yá juàn huàn， suì huá xíng mù。\ndāng nián jiǔ kuáng zì fù。\nwèi dōng jūn、 yǐ chūn xiāng fù。\nliú làng zhēng cān běi dào， kè qiáng nán pǔ。\nyōu hèn wú rén wù yǔ。\nlài míng yuè céng zhī jiù yóu chù。\nhǎo bàn yún lái， hái jiāng mèng qù。",
        translation: "暮烟缠绕着横陈的树林，远山沉进残照里，黄昏的钟鼓声远远传来。烛光映着窗帘，蟋蟀声催着织机，思妇们彻夜捣衣，惊动了漂泊在外的疲倦官人——一年又要过去了。当年以酒狂自负，以为好时光自然属于自己，谁知一路流浪南北，满心愁苦没人诉说。幸好还有明月记得旧日同游的地方，好伴着云来，再把梦带回去。",
      }
      ],
    },
    {
      title: "青玉案 · 无名氏",
      art: 'songci-rivers:ch78',
      artPrompt: "古诗《青玉案》意境插画：一年春事都来几。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "一年春事都来几。\n早过了、三之二。\n绿暗红嫣浑可事。\n绿杨庭院，暖风帘幕，有个人憔悴。\n买花载酒长安市。\n又争似家山见桃李。\n不枉东风吹客泪，相思难表，梦魂无据，惟有归来是。",
        pinyin: "yī nián chūn shì dōu lái jǐ。\nzǎo guò le、 sān zhī èr。\nlǜ àn hóng yān hún kě shì。\nlǜ yáng tíng yuàn， nuǎn fēng lián mù， yǒu gè rén qiáo cuì。\nmǎi huā zǎi jiǔ cháng ān shì。\nyòu zhēng sì jiā shān jiàn táo lǐ。\nbù wǎng dōng fēng chuī kè lèi， xiāng sī nán biǎo， mèng hún wú jù， wéi yǒu guī lái shì。",
        translation: "一年的春光能有多少？早过去了三分之二，绿柳暗了、红花艳着，都还是好景致。绿杨庭院、暖风帘幕里，却有人憔悴。在京城买花载酒，又怎么比得上回家乡看桃李。相思难以表达，梦魂又没有凭据，只有归来才是正路。",
      }
      ],
    },
    {
      title: "高阳台 · 吴文英",
      art: 'songci-rivers:ch79',
      artPrompt: "古诗《高阳台》意境插画：修竹凝妆，垂杨驻马，凭阑浅画成图。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "修竹凝妆，垂杨驻马，凭阑浅画成图。\n山色谁题，楼前有雁斜书。\n东风紧送斜阳下，弄旧寒、晚酒醒馀。\n自销凝，能几花前，顿老相如。\n伤春不在高楼上，在灯前攲枕，雨外熏炉。\n怕舣游船，临流可奈清臞。\n飞红若到西湖底，搅翠澜、总是愁鱼。\n莫重来，吹尽香绵，泪满平芜。",
        pinyin: "xiū zhú níng zhuāng， chuí yáng zhù mǎ， píng lán qiǎn huà chéng tú。\nshān sè shuí tí， lóu qián yǒu yàn xié shū。\ndōng fēng jǐn sòng xié yáng xià， nòng jiù hán、 wǎn jiǔ xǐng yú。\nzì xiāo níng， néng jǐ huā qián， dùn lǎo xiāng rú。\nshāng chūn bù zài gāo lóu shàng， zài dēng qián jī zhěn， yǔ wài xūn lú。\npà yǐ yóu chuán， lín liú kě nài qīng qú。\nfēi hóng ruò dào xī hú dǐ， jiǎo cuì lán、 zǒng shì chóu yú。\nmò chóng lái， chuī jìn xiāng mián， lèi mǎn píng wú。",
        translation: "修长的竹子像凝妆的美人，垂杨下拴着马，凭栏望去像一幅浅浅画成的小图。东风紧送斜阳落下去，旧寒又起，晚间酒也醒了；独自出神，人生在花前还能有几回？一转眼就老了。伤春的愁不在高楼上，而在灯前枕边、雨外的熏炉边。落花若飘进西湖，搅起的绿波里连鱼都满是愁。劝人莫要再来——柳絮吹尽的时候，泪会洒满平野。",
      }
      ],
    },
    {
      title: "高阳台 · 吴文英",
      art: 'songci-rivers:ch80',
      artPrompt: "古诗《高阳台》意境插画：宫粉雕痕，仙云堕影，无人野水荒湾。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "宫粉雕痕，仙云堕影，无人野水荒湾。\n古石埋香，金沙锁骨连环。\n南楼不恨吹横笛，恨晓风、千里关山。\n半飘零，庭上黄昏，月冷阑干。\n寿阳空理愁鸾。\n问谁调玉髓，暗补香瘢。\n细雨归鸿，孤山无限春寒。\n离魂难倩招清些，梦缟衣、解佩溪边。\n最愁人，啼鸟晴明，叶底青圆。",
        pinyin: "gōng fěn diāo hén， xiān yún duò yǐng， wú rén yě shuǐ huāng wān。\ngǔ shí mái xiāng， jīn shā suǒ gǔ lián huán。\nnán lóu bù hèn chuī héng dí， hèn xiǎo fēng、 qiān lǐ guān shān。\nbàn piāo líng， tíng shàng huáng hūn， yuè lěng lán gān。\nshòu yáng kōng lǐ chóu luán。\nwèn shuí tiáo yù suǐ， àn bǔ xiāng bān。\nxì yǔ guī hóng， gū shān wú xiàn chūn hán。\nlí hún nán qiàn zhāo qīng xiē， mèng gǎo yī、 jiě pèi xī biān。\nzuì chóu rén， tí niǎo qíng míng， yè dǐ qīng yuán。",
        translation: "梅花像宫粉雕出的痕迹、仙云落下的影子，开在无人的野水荒湾。不恨有人在楼上吹起横笛，只恨清晨的风把花瓣吹过千里关山；半树飘零，黄昏的庭院里，月光冷冷照着栏杆。最愁人的是，等到天晴鸟啼，叶子底下梅子已经青圆——花早就谢了。",
      }
      ],
    },
    {
      title: "三姝媚 · 吴文英",
      art: 'songci-rivers:ch81',
      artPrompt: "古诗《三姝媚》意境插画：湖山经醉惯。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "湖山经醉惯。\n溃春衫、啼痕酒痕无限。\n又客长安，叹断襟零袂，尘谁浣。\n紫曲门荒，沿败井、风摇青蔓。\n对语东邻，犹是曾巢，谢堂双燕。\n春梦人间须断。\n但怪得、当年梦缘能短。\n绣屋秦筝，傍海棠偏爱，夜深开宴。\n舞歇歌沈，花未减、红颜先变。\n伫久河桥欲去，斜阳泪满。",
        pinyin: "hú shān jīng zuì guàn。\nkuì chūn shān、 tí hén jiǔ hén wú xiàn。\nyòu kè cháng ān， tàn duàn jīn líng mèi， chén shuí huàn。\nzǐ qǔ mén huāng， yán bài jǐng、 fēng yáo qīng màn。\nduì yǔ dōng lín， yóu shì céng cháo， xiè táng shuāng yàn。\nchūn mèng rén jiān xū duàn。\ndàn guài dé、 dāng nián mèng yuán néng duǎn。\nxiù wū qín zhēng， bàng hǎi táng piān ài， yè shēn kāi yàn。\nwǔ xiē gē shěn， huā wèi jiǎn、 hóng yán xiān biàn。\nzhù jiǔ hé qiáo yù qù， xié yáng lèi mǎn。",
        translation: "看惯了湖山的醉人春色，春衫上满是啼痕和酒痕。又客居京城，破旧的衣衫落满尘土，没有人替我洗；旧居的门庭荒芜了，破井边风吹青蔓，只有东邻檐下那对燕子还在呢喃，还是从前堂前的旧燕。人间的春梦总要断，只怪当年的梦缘太短。在河桥边伫立很久，想要离去，斜阳里已是泪流满面。",
      }
      ],
    },
    {
      title: "八声甘州 · 吴文英",
      art: 'songci-rivers:ch82',
      artPrompt: "古诗《八声甘州》意境插画：渺空烟四远，是何年、青天坠长星。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "渺空烟四远，是何年、青天坠长星。\n幻苍崖云树，名娃金屋，残霸宫城。\n箭径酸风射眼，腻水染花腥。\n时靸双鸳响，廊叶秋声。\n宫里吴王沉醉，倩五湖倦客，独钓醒醒。\n问苍波无语，华发奈山青。\n水涵空、阑干高处，送乱鸦、斜日落渔汀。\n连呼酒，上琴台去，秋与云平。",
        pinyin: "miǎo kōng yān sì yuǎn， shì hé nián、 qīng tiān zhuì cháng xīng。\nhuàn cāng yá yún shù， míng wá jīn wū， cán bà gōng chéng。\njiàn jìng suān fēng shè yǎn， nì shuǐ rǎn huā xīng。\nshí sǎ shuāng yuān xiǎng， láng yè qiū shēng。\ngōng lǐ wú wáng chén zuì， qiàn wǔ hú juàn kè， dú diào xǐng xǐng。\nwèn cāng bō wú yǔ， huá fà nài shān qīng。\nshuǐ hán kōng、 lán gān gāo chù， sòng luàn yā、 xié rì luò yú tīng。\nlián hū jiǔ， shàng qín tái qù， qiū yǔ yún píng。",
        translation: "空濛的烟霭远远罩住四面，不知是哪一年，青天上落下一颗大星，化成了山崖云树，还有吴王旧日的宫城。当年宫里的吴王整天喝得醉醺醺，只有那像在五湖上垂钓的隐士独自清醒。我连连唤人拿酒来，一同登上琴台去，看秋色高得和云一样平。",
      }
      ],
    },
    {
      title: "夜合花 · 吴文英",
      art: 'songci-rivers:ch83',
      artPrompt: "古诗《夜合花》意境插画：柳暝河桥，莺晴台苑，短策频惹春香。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "柳暝河桥，莺晴台苑，短策频惹春香。\n当时夜泊，温柔便入深乡。\n词韵窄，酒杯长。\n翦蜡花、壶箭催忙。\n共追游处，凌波翠陌，连棹横塘。\n十年一梦凄凉。\n似西湖燕去，吴馆巢荒。\n重来万感，依前唤酒银罂。\n溪雨急，岸花狂。\n趁残鸦、飞过苍茫。\n故人楼上，凭谁指与，芳草斜阳。",
        pinyin: "liǔ míng hé qiáo， yīng qíng tái yuàn， duǎn cè pín rě chūn xiāng。\ndāng shí yè bó， wēn róu biàn rù shēn xiāng。\ncí yùn zhǎi， jiǔ bēi cháng。\njiǎn là huā、 hú jiàn cuī máng。\ngòng zhuī yóu chù， líng bō cuì mò， lián zhào héng táng。\nshí nián yī mèng qī liáng。\nsì xī hú yàn qù， wú guǎn cháo huāng。\nchóng lái wàn gǎn， yī qián huàn jiǔ yín yīng。\nxī yǔ jí， àn huā kuáng。\nchèn cán yā、 fēi guò cāng máng。\ngù rén lóu shàng， píng shuí zhǐ yǔ， fāng cǎo xié yáng。",
        translation: "柳荫暗了河桥，黄莺在晴日的台苑里啼叫，我骑着小马出游，一路沾着春花香气。想起当年夜里泊船，温柔乡里写词饮酒，剪着烛花，直到壶里的刻箭催着夜深；一晃十年像一场凄凉的梦，像燕子飞去、屋子空了，如今重来，还是像从前一样唤人取酒。急雨落在溪上，岸边的花被吹得乱舞，残鸦飞过苍茫的天色，故人楼上，还有谁替我指点那芳草斜阳呢。",
      }
      ],
    },
    {
      title: "蹋莎行・踏莎行 · 吴文英",
      art: 'songci-rivers:ch84',
      artPrompt: "古诗《蹋莎行・踏莎行》意境插画：润玉笼绡，檀樱倚扇。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "润玉笼绡，檀樱倚扇。\n绣圈犹带脂香浅。\n榴心空叠舞裙红，艾枝应压愁鬟乱。\n午梦千山，窗阴一箭。\n香瘢新褪红丝腕。\n隔江人在雨声中，晚风菰叶生秋怨。",
        pinyin: "rùn yù lóng xiāo， tán yīng yǐ shàn。\nxiù quān yóu dài zhī xiāng qiǎn。\nliú xīn kōng dié wǔ qún hóng， ài zhī yìng yā chóu huán luàn。\nwǔ mèng qiān shān， chuāng yīn yī jiàn。\nxiāng bān xīn tuì hóng sī wàn。\ngé jiāng rén zài yǔ shēng zhōng， wǎn fēng gū yè shēng qiū yuàn。",
        translation: "像润玉一样的人儿罩着薄薄的纱衣，樱桃小口靠着罗扇，绣花的领圈上还带着淡淡的脂粉香。石榴红的舞裙空空叠着，艾枝压着发髻，愁得都乱了。午睡的梦一下子越过千山，窗前的日影才移过一箭远；隔着江的人正在雨声里，晚风吹动菰叶，生出满腹秋天的愁。",
      }
      ],
    },
    {
      title: "夜游宫 · 吴文英",
      art: 'songci-rivers:ch85',
      artPrompt: "古诗《夜游宫》意境插画：人去西楼雁杳。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "人去西楼雁杳。\n叙别梦、扬州一觉。\n云澹星疏楚山晓。\n听啼乌，立河桥，话未了。\n雨外蛩声早。\n细织就、霜丝多少。\n说与萧娘未知道。\n向长安，对秋灯，几人老。",
        pinyin: "rén qù xī lóu yàn yǎo。\nxù bié mèng、 yáng zhōu yī jiào。\nyún dàn xīng shū chǔ shān xiǎo。\ntīng tí wū， lì hé qiáo， huà wèi liǎo。\nyǔ wài qióng shēng zǎo。\nxì zhī jiù、 shuāng sī duō shǎo。\nshuō yǔ xiāo niáng wèi zhī dào。\nxiàng cháng ān， duì qiū dēng， jǐ rén lǎo。",
        translation: "人一去西楼，连大雁的音信也没有了，梦里叙别，像扬州一场大梦；淡淡的云、稀疏的星，楚山已经天亮了，乌鸦啼叫着，我站在河桥上，话还没有说完。雨外蟋蟀早早地叫起来，细细地织出了多少白发；这些心事说给心上人听，她还不知道呢。对着长安的方向，对着秋夜的孤灯，多少人就这样慢慢变老了。",
      }
      ],
    },
    {
      title: "鹧鸪天 · 吴文英",
      art: 'songci-rivers:ch86',
      artPrompt: "古诗《鹧鸪天》意境插画：池上红衣伴倚阑。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "池上红衣伴倚阑。\n栖鸦常带夕阳还。\n殷云度雨疏桐落，明月生凉宝扇闲。\n乡梦窄，水天宽。\n小窗愁黛澹秋山。\n吴鸿好为传归信，杨柳阊门屋数间。",
        pinyin: "chí shàng hóng yī bàn yǐ lán。\nqī yā cháng dài xī yáng hái。\nyīn yún dù yǔ shū tóng luò， míng yuè shēng liáng bǎo shàn xián。\nxiāng mèng zhǎi， shuǐ tiān kuān。\nxiǎo chuāng chóu dài dàn qiū shān。\nwú hóng hǎo wèi chuán guī xìn， yáng liǔ chāng mén wū shù jiān。",
        translation: "池塘上的红荷花伴着我靠着栏杆，栖息的乌鸦常常带着夕阳一同归来；浓云度雨，疏疏的桐叶落下，明月生出凉意，宝扇也闲置起来。梦里回乡的路那么窄，眼前的水天却那么宽，小窗前愁眉淡淡，像一抹秋山。南飞的鸿雁啊，请替我捎个回家的信——杨柳依依的阊门边，还有我那几间屋子。",
      }
      ],
    },
    {
      title: "唐多令 · 吴文英",
      art: 'songci-rivers:ch87',
      artPrompt: "古诗《唐多令》意境插画：何处合成愁。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "何处合成愁。\n离人心上秋。\n纵芭蕉、不雨也飕飕。\n都道晚凉天气好，有明月、怕登楼。\n年事梦中休。\n花空烟水流。\n燕辞归、客尚淹留。\n垂柳不萦裙带住，漫长是、系行舟。",
        pinyin: "hé chù hé chéng chóu。\nlí rén xīn shàng qiū。\nzòng bā jiāo、 bù yǔ yě sōu sōu。\ndōu dào wǎn liáng tiān qì hǎo， yǒu míng yuè、 pà dēng lóu。\nnián shì mèng zhōng xiū。\nhuā kōng yān shuǐ liú。\nyàn cí guī、 kè shàng yān liú。\nchuí liǔ bù yíng qún dài zhù， màn cháng shì、 xì xíng zhōu。",
        translation: "愁是从哪里来的呢？就是离别的人，心上添了一个秋，就算芭蕉不淋雨，风吹来也飕飕地响。人人都说晚凉天气好，可有明月我却怕登楼；年华像梦一样过去，花落空了，烟水长流，燕子都辞归了，做客的人还留在这里，垂柳系不住她的裙带，偏偏长长的柳丝总系着我的行舟。",
      }
      ],
    },
    {
      title: "金缕歌・贺新郎 · 吴文英",
      art: 'songci-rivers:ch88',
      artPrompt: "古诗《金缕歌・贺新郎》意境插画：乔木生云气。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "乔木生云气。\n访中兴、英雄陈迹，暗追前事。\n战舰东风悭借便，梦断神州故里。\n旋小筑、吴宫闲地。\n华表月明归夜鹤，叹当时、花竹今如此。\n枝上露，溅清泪。\n遨头小簇行春队。\n步苍苔、寻幽别坞，问梅开未。\n重唱梅边吸度曲，催发寒梢冻蕊。\n此心与、东君同意。\n后不如今非昔，两无言、相对沧浪水。\n怀此恨，寄残醉。",
        pinyin: "qiáo mù shēng yún qì。\nfǎng zhōng xīng、 yīng xióng chén jì， àn zhuī qián shì。\nzhàn jiàn dōng fēng qiān jiè biàn， mèng duàn shén zhōu gù lǐ。\nxuán xiǎo zhù、 wú gōng xián dì。\nhuá biǎo yuè míng guī yè hè， tàn dāng shí、 huā zhú jīn rú cǐ。\nzhī shàng lù， jiàn qīng lèi。\náo tóu xiǎo cù xíng chūn duì。\nbù cāng tái、 xún yōu bié wù， wèn méi kāi wèi。\nchóng chàng méi biān xī dù qǔ， cuī fā hán shāo dòng ruǐ。\ncǐ xīn yǔ、 dōng jūn tóng yì。\nhòu bù rú jīn fēi xī， liǎng wú yán、 xiāng duì cāng làng shuǐ。\nhuái cǐ hèn， jì cán zuì。",
        translation: "高大的树木间升起云气，我来寻访中兴英雄留下的旧迹，暗暗追想当年：战舰借不到东风，恢复故国的梦断了，后来只好在吴宫的空地上盖起小屋。如今太守带着小小的游春队伍，踏着苍苔去幽静的坞里，问梅花开了没有，在梅边重新唱起曲子，催开寒枝上冻住的花蕊——这心意正和司春的东君相同。只怕往后不如现在、现在不如从前，两人相对无言，只看着沧浪亭的流水，把满腹的遗憾寄在一樽残醉里。",
      }
      ],
    },
    {
      title: "大有 · 潘希白",
      art: 'songci-rivers:ch89',
      artPrompt: "古诗《大有》意境插画：戏马台前，采花篱下，问岁华、还是重九。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "戏马台前，采花篱下，问岁华、还是重九。\n恰归来、南山翠色依旧。\n帘栊昨夜听风雨，都不似、登归时候。\n一片宋玉情怀，十分卫郎清瘦。\n红萸佩、空对酒。\n砧杆动微寒，暗欺罗袖。\n秋已无多，早是败荷衰柳。\n强整帽檐侧，曾经向、天涯搔首。\n几回忆、故国莼鲈，霜前雁后。",
        pinyin: "xì mǎ tái qián， cǎi huā lí xià， wèn suì huá、 hái shì chóng jiǔ。\nqià guī lái、 nán shān cuì sè yī jiù。\nlián lóng zuó yè tīng fēng yǔ， dōu bù sì、 dēng guī shí hòu。\nyī piàn sòng yù qíng huái， shí fēn wèi láng qīng shòu。\nhóng yú pèi、 kōng duì jiǔ。\nzhēn gān dòng wēi hán， àn qī luó xiù。\nqiū yǐ wú duō， zǎo shì bài hé shuāi liǔ。\nqiáng zhěng mào yán cè， céng jīng xiàng、 tiān yá sāo shǒu。\njǐ huí yì、 gù guó chún lú， shuāng qián yàn hòu。",
        translation: "在戏马台前、篱笆下采着菊花，问一问时节，原来又到重阳；恰好归来，南山的翠色还和从前一样。佩着红茱萸，空对着一杯酒，捣衣声里透出微微寒气，暗暗侵袭着罗袖；秋天已经剩得不多了，眼前早是残荷衰柳。多少次回想故乡的莼菜和鲈鱼，那是在秋霜之前、大雁南飞之后的日子啊。",
      }
      ],
    },
    {
      title: "兰陵王 · 刘辰翁",
      art: 'songci-rivers:ch90',
      artPrompt: "古诗《兰陵王》意境插画：送春去。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "送春去。\n春去人间无路。\n秋千外、芳草连天，谁遣风沙暗南浦。\n依依甚意绪。\n漫忆海门飞絮。\n乱鸦过，斗转城荒，不见来时试灯处。\n春去。\n最谁苦。\n但箭雁沉边，梁燕无主。\n杜鹃声里长门暮。\n想玉树凋土，泪盘如露。\n咸阳送客屡回顾。\n斜日未能度。\n春去。\n尚来否。\n正江令恨别，庾信愁赋。\n苏堤尽日风和雨。\n叹神游故国，花记前度。\n人生流落，顾孺子，共夜雨。",
        pinyin: "sòng chūn qù。\nchūn qù rén jiān wú lù。\nqiū qiān wài、 fāng cǎo lián tiān， shuí qiǎn fēng shā àn nán pǔ。\nyī yī shèn yì xù。\nmàn yì hǎi mén fēi xù。\nluàn yā guò， dòu zhuǎn chéng huāng， bù jiàn lái shí shì dēng chù。\nchūn qù。\nzuì shuí kǔ。\ndàn jiàn yàn chén biān， liáng yàn wú zhǔ。\ndù juān shēng lǐ cháng mén mù。\nxiǎng yù shù diāo tǔ， lèi pán rú lù。\nxián yáng sòng kè lǚ huí gù。\nxié rì wèi néng dù。\nchūn qù。\nshàng lái fǒu。\nzhèng jiāng lìng hèn bié， yǔ xìn chóu fù。\nsū dī jìn rì fēng hé yǔ。\ntàn shén yóu gù guó， huā jì qián dù。\nrén shēng liú luò， gù rú zǐ， gòng yè yǔ。",
        translation: "送春归去，春一去，人间就没有了路；秋千外芳草连天，是谁叫风沙遮暗了南浦，乱鸦飞过，城池荒芜，再也看不见从前张灯的地方。春去了谁最苦呢，中箭的大雁沉落边地，梁上的燕子没了主人，杜鹃声里长门宫的暮色暗暗。春去了还会再来吗，苏堤整日风风雨雨，人生这样流落，只好陪着小孩子，一起听夜里的雨。",
      }
      ],
    },
    {
      title: "宝鼎现 · 刘辰翁",
      art: 'songci-rivers:ch91',
      artPrompt: "古诗《宝鼎现》意境插画：红妆春骑。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "红妆春骑。\n踏月影、竿旗穿市。\n望不尽、楼台歌舞，习习香尘莲步底。\n箫声断、约彩鸾归去，未怕金吾呵醉。\n甚辇路、喧阗且止。\n听得念奴歌起。\n父老犹记宣和事。\n抱铜仙、清泪如水。\n还转盼、沙河多丽。\n漾明光连邸第。\n帘影冻、散红光成绮。\n月浸葡萄十里。\n看往来、神仙才子。\n肯把菱花扑碎。\n肠断竹马儿童，空见说、三千乐指。\n等多时春不归来，到春时欲睡。\n又说向、灯前拥髻。\n暗滴鲛珠坠。\n便当日、亲见霓裳，天上人间梦里。",
        pinyin: "hóng zhuāng chūn qí。\ntà yuè yǐng、 gān qí chuān shì。\nwàng bù jìn、 lóu tái gē wǔ， xí xí xiāng chén lián bù dǐ。\nxiāo shēng duàn、 yuē cǎi luán guī qù， wèi pà jīn wú hē zuì。\nshèn niǎn lù、 xuān tián qiě zhǐ。\ntīng dé niàn nú gē qǐ。\nfù lǎo yóu jì xuān hé shì。\nbào tóng xiān、 qīng lèi rú shuǐ。\nhái zhuǎn pàn、 shā hé duō lì。\nyàng míng guāng lián dǐ dì。\nlián yǐng dòng、 sàn hóng guāng chéng qǐ。\nyuè jìn pú táo shí lǐ。\nkàn wǎng lái、 shén xiān cái zǐ。\nkěn bǎ líng huā pū suì。\ncháng duàn zhú mǎ ér tóng， kōng jiàn shuō、 sān qiān lè zhǐ。\nděng duō shí chūn bù guī lái， dào chūn shí yù shuì。\nyòu shuō xiàng、 dēng qián yōng jì。\nàn dī jiāo zhū zhuì。\nbiàn dāng rì、 qīn jiàn ní cháng， tiān shàng rén jiān mèng lǐ。",
        translation: "盛装的男女骑着春马出游，踏着月影，旗竿穿过街市，望不尽的楼台歌舞，香尘在莲步下轻轻扬起。父老们还记得宣和年间的盛事，抱着铜人清泪如水；月色浸着十里水面，往来的都是神仙般的才子，谁肯把菱花镜扑碎呢。最叫人断肠的是：骑竹马的小孩子，只能空空听人讲起当年三千人的乐队；等了许久春天也不回来，就算亲眼见过那霓裳羽衣的盛景，也像天上人间的一场梦了。",
      }
      ],
    },
    {
      title: "永遇乐 · 刘辰翁",
      art: 'songci-rivers:ch92',
      artPrompt: "古诗《永遇乐》意境插画：璧月初晴，黛云远澹，春事谁主。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "璧月初晴，黛云远澹，春事谁主。\n禁苑娇寒，湖堤倦暖，前度遽如许。\n香尘暗陌，华灯明昼，长是懒携手去。\n谁知道，断烟禁夜，满城似愁风雨。\n宣和旧日，临安南渡，芳景犹自如故。\n缃帙流离，风鬟三五，能赋词最苦。\n江南无路，州今夜，此苦又谁知否。\n空相对，残无寐，满村社鼓。",
        pinyin: "bì yuè chū qíng， dài yún yuǎn dàn， chūn shì shuí zhǔ。\njìn yuàn jiāo hán， hú dī juàn nuǎn， qián dù jù rú xǔ。\nxiāng chén àn mò， huá dēng míng zhòu， cháng shì lǎn xié shǒu qù。\nshuí zhī dào， duàn yān jìn yè， mǎn chéng sì chóu fēng yǔ。\nxuān hé jiù rì， lín ān nán dù， fāng jǐng yóu zì rú gù。\nxiāng zhì liú lí， fēng huán sān wǔ， néng fù cí zuì kǔ。\njiāng nán wú lù， zhōu jīn yè， cǐ kǔ yòu shuí zhī fǒu。\nkōng xiāng duì， cán wú mèi， mǎn cūn shè gǔ。",
        translation: "雨后初晴，月亮像璧玉，远处的云淡淡的，这满眼春色由谁做主呢。从前香尘暗了街道、华灯亮得像白昼，我总懒得携手去游；谁知道如今烟雾断绝、夜里戒严，满城都像在愁风愁雨。宣和旧日、南渡后的临安，好景致还和从前一样，可是书卷流离，鬓发凌乱，写出的词最苦；江南已经没有路可回，这苦又有谁知道呢，空空相对，残灯不眠，只听得满村社日的鼓声。",
      }
      ],
    },
    {
      title: "摸鱼儿 · 刘辰翁",
      art: 'songci-rivers:ch93',
      artPrompt: "古诗《摸鱼儿》意境插画：怎知他、春归何处，相逢且尽尊酒。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "怎知他、春归何处，相逢且尽尊酒。\n少年袅袅天涯恨，长结西湖烟柳。\n休回首。\n但细雨断桥，憔悴人归后。\n东风似旧。\n问前度桃花，刘郎能记，花复认郎否。\n君且住，草草留君翦韭。\n前宵更恁时候。\n深杯欲共歌声滑，翻湿春衫半袖。\n空眉皱。\n看白发尊前，已似人人有。\n临分把手。\n叹一笑论文，清狂顾曲，此会几时又。",
        pinyin: "zěn zhī tā、 chūn guī hé chù， xiāng féng qiě jìn zūn jiǔ。\nshào nián niǎo niǎo tiān yá hèn， cháng jié xī hú yān liǔ。\nxiū huí shǒu。\ndàn xì yǔ duàn qiáo， qiáo cuì rén guī hòu。\ndōng fēng sì jiù。\nwèn qián dù táo huā， liú láng néng jì， huā fù rèn láng fǒu。\njūn qiě zhù， cǎo cǎo liú jūn jiǎn jiǔ。\nqián xiāo gèng nèn shí hòu。\nshēn bēi yù gòng gē shēng huá， fān shī chūn shān bàn xiù。\nkōng méi zhòu。\nkàn bái fà zūn qián， yǐ sì rén rén yǒu。\nlín fēn bǎ shǒu。\ntàn yī xiào lùn wén， qīng kuáng gù qǔ， cǐ huì jǐ shí yòu。",
        translation: "哪里知道春天回到了哪里，朋友相逢，先干了杯中的酒吧；少年时袅袅的天涯离恨，长久地拴在西湖的烟柳上，不要回头，只看细雨里的断桥，憔悴的人归来后，东风还像从前——问从前的桃花，刘郎还记得花，花还认得刘郎吗。您且留一留，我匆匆剪些韭菜备饭；前一夜也是这样的时候，深杯对饮歌声正欢，酒却翻湿了半只衣袖。空皱着眉，看酒前的白发，已经人人都有了；临别握着手，叹这样谈文听曲的聚会，不知什么时候才能再有。",
      }
      ],
    },
    {
      title: "绣鸾凤花犯・花犯 · 周密",
      art: 'songci-rivers:ch94',
      artPrompt: "古诗《绣鸾凤花犯・花犯》意境插画：楚江湄，湘娥乍见，无言洒清泪。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "楚江湄，湘娥乍见，无言洒清泪。\n淡然春意。\n空独倚东风，芳思谁寄。\n凌波路冷秋无际。\n香云随步起。\n谩记得，汉宫仙掌，亭亭明月底。\n冰弦写怨更多情，骚人恨，枉赋芳兰幽芷。\n春思远，谁叹赏、国香风味。\n相将共、岁寒伴侣。\n小窗净、沈烟熏翠袂。\n幽梦觉，涓涓清露，一枝灯影里。",
        pinyin: "chǔ jiāng méi， xiāng é zhà jiàn， wú yán sǎ qīng lèi。\ndàn rán chūn yì。\nkōng dú yǐ dōng fēng， fāng sī shuí jì。\nlíng bō lù lěng qiū wú jì。\nxiāng yún suí bù qǐ。\nmàn jì de， hàn gōng xiān zhǎng， tíng tíng míng yuè dǐ。\nbīng xián xiě yuàn gèng duō qíng， sāo rén hèn， wǎng fù fāng lán yōu zhǐ。\nchūn sī yuǎn， shuí tàn shǎng、 guó xiāng fēng wèi。\nxiāng jiāng gòng、 suì hán bàn lǚ。\nxiǎo chuāng jìng、 shěn yān xūn cuì mèi。\nyōu mèng jué， juān juān qīng lù， yī zhī dēng yǐng lǐ。",
        translation: "楚江边上，像湘水女神一样的梅花忽然出现，默默洒下清泪，透出淡淡的春意；她空自独自倚着东风，芬芳的心思寄给谁呢，凌波的路冷冷的，香云随着脚步轻轻升起。还记得汉宫仙人掌上托着的花，亭亭立在那明月底下；冰弦弹出的怨更多情，诗人白白为芳兰幽芷写了许多诗，谁来叹赏这国香的风味呢。但愿有岁寒的伴侣相陪伴，小窗洁净，沉香熏着翠袖；幽梦醒来，涓涓清露里，一枝梅花正立在灯影里。",
      }
      ],
    },
    {
      title: "瑶花慢 · 周密",
      art: 'songci-rivers:ch95',
      artPrompt: "古诗《瑶花慢》意境插画：朱钿宝。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "朱钿宝。\n天上飞琼，比人间春别。\n江南江北，曾未见，谩拟梨云梅雪。\n淮山春晚，问谁识、芳心高洁。\n消几番、花落花开，老了玉关豪杰。\n金壶翦送琼枝，看一骑红尘，香度瑶阙。\n韶华正好，应自喜、初识长安蜂蝶。\n杜郎老矣，想旧事、花须能说。\n记少年，一梦扬州，二十四桥明月。",
        pinyin: "zhū diàn bǎo。\ntiān shàng fēi qióng， bǐ rén jiān chūn bié。\njiāng nán jiāng běi， céng wèi jiàn， màn nǐ lí yún méi xuě。\nhuái shān chūn wǎn， wèn shuí shí、 fāng xīn gāo jié。\nxiāo jǐ fān、 huā luò huā kāi， lǎo le yù guān háo jié。\njīn hú jiǎn sòng qióng zhī， kàn yī qí hóng chén， xiāng dù yáo quē。\nsháo huá zhèng hǎo， yìng zì xǐ、 chū shí cháng ān fēng dié。\ndù láng lǎo yǐ， xiǎng jiù shì、 huā xū néng shuō。\njì shào nián， yī mèng yáng zhōu， èr shí sì qiáo míng yuè。",
        translation: "像珠钗宝玉一样的琼花，像天上飞来的仙女，和人间春色不一样；江南江北都不曾见过，只能把它比作梨花云、梅花雪，淮山的春晚了，问谁知道它芳心的高洁，几番花开花落，把关外的豪杰也催老了。剪下琼枝用金壶送上，看一骑红尘飞驰，香气一路飘进宫阙；韶华正好，它该暗自欢喜初次认识长安的蜂蝶吧。杜牧已经老了，想那些旧事，只有花能说出来：记得少年时，做了一场扬州梦，梦里是二十四桥的明月。",
      }
      ],
    },
    {
      title: "玉京秋 · 周密",
      art: 'songci-rivers:ch96',
      artPrompt: "古诗《玉京秋》意境插画：烟水阔。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "烟水阔。\n高林弄残照，晚蜩凄切。\n碧砧度韵，银床飘叶。\n衣湿桐阴露冷，采凉花、时赋秋雪。\n叹轻别。\n一襟幽事，砌蛩能说。\n客思吟商还怯。\n怨歌长、琼壶暗缺。\n翠扇恩疏，红衣香褪，翻成消歇。\n玉骨西风，恨最恨、闲却新凉时节。\n楚箫咽。\n谁倚西楼淡月。",
        pinyin: "yān shuǐ kuò。\ngāo lín nòng cán zhào， wǎn tiáo qī qiè。\nbì zhēn dù yùn， yín chuáng piāo yè。\nyī shī tóng yīn lù lěng， cǎi liáng huā、 shí fù qiū xuě。\ntàn qīng bié。\nyī jīn yōu shì， qì qióng néng shuō。\nkè sī yín shāng hái qiè。\nyuàn gē cháng、 qióng hú àn quē。\ncuì shàn ēn shū， hóng yī xiāng tuì， fān chéng xiāo xiē。\nyù gǔ xī fēng， hèn zuì hèn、 xián què xīn liáng shí jié。\nchǔ xiāo yàn。\nshuí yǐ xī lóu dàn yuè。",
        translation: "烟水辽阔，高林里摇着落日余光，晚蝉叫得凄切；捣衣石上送来声声脆响，井栏边飘下落叶，衣裳在桐荫里被冷露打湿，采着凉秋的花，写下像秋雪一样的句子。叹息就这样轻易分别了，满怀幽幽心事，只有台阶下的蟋蟀能说；作客的人吟起秋曲还有些胆怯，怨歌那么长，连玉壶都悄悄碰出了缺口。翠扇被疏远，红衣褪了香，最恨西风里白白错过了这新凉的好时节；楚地的箫声呜咽，是谁倚在西楼淡淡的月色里。",
      }
      ],
    },
    {
      title: "曲游春 · 周密",
      art: 'songci-rivers:ch97',
      artPrompt: "古诗《曲游春》意境插画：楚苑东风外，暖丝情絮，春思如织。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "楚苑东风外，暖丝情絮，春思如织。\n燕约莺期，恼芳情偏在，翠深红隙。\n漠漠香尘隔。\n沸十里、乱弦丛笛。\n看画船，尽入西泠，闲却半湖春色。\n柳陌。\n新烟凝碧。\n映帘底宫眉，堤上游勒。\n轻暝笼寒，怕梨云梦冷，杏香愁幂。\n歌管酬寒食。\n奈蝶怨、良宵岑寂。\n正满湖、碎月摇花，怎生去得。",
        pinyin: "chǔ yuàn dōng fēng wài， nuǎn sī qíng xù， chūn sī rú zhī。\nyàn yuē yīng qī， nǎo fāng qíng piān zài， cuì shēn hóng xì。\nmò mò xiāng chén gé。\nfèi shí lǐ、 luàn xián cóng dí。\nkàn huà chuán， jìn rù xī líng， xián què bàn hú chūn sè。\nliǔ mò。\nxīn yān níng bì。\nyìng lián dǐ gōng méi， dī shàng yóu lè。\nqīng míng lóng hán， pà lí yún mèng lěng， xìng xiāng chóu mì。\ngē guǎn chóu hán shí。\nnài dié yuàn、 liáng xiāo cén jì。\nzhèng mǎn hú、 suì yuè yáo huā， zěn shēng qù dé。",
        translation: "园林外东风吹着，暖暖的游丝、多情的柳絮，春思像织布一样又密又乱；燕子黄莺像约好了相会，撩人的春情偏藏在翠绿深红的小缝里。茫茫香尘隔开了远近，十里之内笙笛喧闹，可画船全都驶进了西泠桥，倒让半湖春色闲着没人看；柳荫路上新烟凝碧，映着帘底的宫眉、堤上的马勒，轻薄的暮色笼着寒意，怕梨花的梦冷了、杏花的香被愁罩住。歌吹管乐正酬答寒食节，无奈蝴蝶埋怨这样好的夜太冷清，看满湖碎月摇着花影，叫人怎么舍得回去呢。",
      }
      ],
    },
    {
      title: "高阳台 · 周密",
      art: 'songci-rivers:ch98',
      artPrompt: "古诗《高阳台》意境插画：照野旌旗，朝天车马，平沙万里天低。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "照野旌旗，朝天车马，平沙万里天低。\n宝带金章，尊前茸帽风。\n秦关汴水经行地，想登临、都付新诗。\n纵英游，叠鼓清笳，骏马名姬。\n酒酣应对燕山雪，正冰河月冻，晓陇云飞。\n投老残年，江南谁念方回。\n东风渐绿西湖柳，雁已还、人未南归。\n最关情，折尽梅花，难寄相思。",
        pinyin: "zhào yě jīng qí， cháo tiān chē mǎ， píng shā wàn lǐ tiān dī。\nbǎo dài jīn zhāng， zūn qián róng mào fēng。\nqín guān biàn shuǐ jīng xíng dì， xiǎng dēng lín、 dōu fù xīn shī。\nzòng yīng yóu， dié gǔ qīng jiā， jùn mǎ míng jī。\njiǔ hān yìng duì yān shān xuě， zhèng bīng hé yuè dòng， xiǎo lǒng yún fēi。\ntóu lǎo cán nián， jiāng nán shuí niàn fāng huí。\ndōng fēng jiàn lǜ xī hú liǔ， yàn yǐ hái、 rén wèi nán guī。\nzuì guān qíng， zhé jìn méi huā， nán jì xiāng sī。",
        translation: "旌旗照亮原野，车马朝天而行，平沙万里天显得那样低；束着宝带、挂着金印，在秦关汴水这些经过的地方纵情游赏，登临的感想都写进了新诗，叠鼓清笳，骏马名姬。酒兴正浓时面对燕山白雪，正是冰河冻月、晓陇云飞的时候；可叹垂老残年，江南有谁还惦念着我。东风渐渐吹绿西湖的柳，大雁已经南回，人却还没能南归；最牵动情怀的是，折尽了梅花，也难把相思寄去。",
      }
      ],
    },
    {
      title: "摸鱼儿 · 朱嗣发",
      art: 'songci-rivers:ch99',
      artPrompt: "古诗《摸鱼儿》意境插画：对西风、鬓摇烟碧，参差前事流水。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "对西风、鬓摇烟碧，参差前事流水。\n紫丝罗带鸳鸯结，的的镜盟钗誓。\n浑不记、漫手织回文，几度欲心碎。\n安花著蒂。\n奈雨覆云翻，情宽分窄，石上玉簪脆。\n朱楼外。\n愁压空云欲坠。\n月痕犹照无寐。\n阴晴也只随天意。\n枉了玉消香碎。\n君且醉。\n君不见、长门青草春风泪。\n一时左计。\n悔不早荆钗，暮天修竹，头白倚寒翠。",
        pinyin: "duì xī fēng、 bìn yáo yān bì， cēn cī qián shì liú shuǐ。\nzǐ sī luó dài yuān yāng jié， de de jìng méng chāi shì。\nhún bù jì、 màn shǒu zhī huí wén， jǐ dù yù xīn suì。\nān huā zhù dì。\nnài yǔ fù yún fān， qíng kuān fēn zhǎi， shí shàng yù zān cuì。\nzhū lóu wài。\nchóu yā kōng yún yù zhuì。\nyuè hén yóu zhào wú mèi。\nyīn qíng yě zhī suí tiān yì。\nwǎng le yù xiāo xiāng suì。\njūn qiě zuì。\njūn bù jiàn、 cháng mén qīng cǎo chūn fēng lèi。\nyī shí zuǒ jì。\nhuǐ bù zǎo jīng chāi， mù tiān xiū zhú， tóu bái yǐ hán cuì。",
        translation: "对着西风，鬓发像烟一样碧绿凌乱，参差的前事像流水一样过去了；紫丝罗带打着鸳鸯结，镜盟钗誓都记得清清楚楚，可他全不记得，她徒然手织回文诗，几次差点心碎，无奈他翻云覆雨情意变薄，石上的玉簪也脆得容易折断。朱楼外愁云沉沉像要坠下来，月亮还照着睡不着的人；阴晴只能随天意，白白地玉消香碎，您且醉吧，没看见长门宫的青草浸着春风里的泪。只恨一时想错了，不如早些戴上粗荆的钗，在暮天的竹林里，靠着一丛寒翠，安安稳稳白头到老。",
      }
      ],
    },
    {
      title: "解佩环・疏影 · 彭元逊",
      art: 'songci-rivers:ch100',
      artPrompt: "古诗《解佩环・疏影》意境插画：江空不渡，恨蘼芜杜若，零落无数。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "江空不渡，恨蘼芜杜若，零落无数。\n远道荒寒，婉娩流年，望望美人迟暮。\n风烟雨雪阴晴晚，更何须，春风千树。\n尽孤城、落木萧萧，日夜江声流去。\n日晏山深闻笛，恐他年流落，与子同赋。\n事阔心违，交淡媒劳，蔓草沾衣多露。\n汀洲窈窕馀醒寐，遗浮沉沣浦。\n有白鸥淡月，微波寄语，逍遥容与。",
        pinyin: "jiāng kōng bù dù， hèn mí wú dù ruò， líng luò wú shù。\nyuǎn dào huāng hán， wǎn miǎn liú nián， wàng wàng měi rén chí mù。\nfēng yān yǔ xuě yīn qíng wǎn， gèng hé xū， chūn fēng qiān shù。\njìn gū chéng、 luò mù xiāo xiāo， rì yè jiāng shēng liú qù。\nrì yàn shān shēn wén dí， kǒng tā nián liú luò， yǔ zǐ tóng fù。\nshì kuò xīn wéi， jiāo dàn méi láo， màn cǎo zhān yī duō lù。\ntīng zhōu yǎo tiǎo yú xǐng mèi， yí fú chén fēng pǔ。\nyǒu bái ōu dàn yuè， wēi bō jì yǔ， xiāo yáo róng yǔ。",
        translation: "江上空空不能渡过去，只恨蘼芜杜若这些香草零落了无数；远道荒寒，美好的年华慢慢过去，眼望着美人也到了迟暮，风烟雨雪、阴晴早晚都经历遍了，更何须春风里千树繁花。孤城里落叶萧萧，日夜只听江声流去；天晚了，深山里传来笛声，只怕他年流落，和您写下一样的赋，世事违心、交情淡薄，蔓草上的浓露沾湿了衣裳。汀洲幽深，还留着半醒半睡的梦意；有白鸥伴着淡月，用微微的水波寄语，逍遥自在。",
      }
      ],
    },
    {
      title: "六丑 · 彭元逊",
      art: 'songci-rivers:ch101',
      artPrompt: "古诗《六丑》意境插画：似东风老大，那复有、当时风气。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "似东风老大，那复有、当时风气。\n有情不收，江山身是寄。\n浩荡何世。\n但忆临官道，暂来不住，便出门千里。\n痴心指望回风坠。\n扇底相逢，钗头微缀。\n他家万条千缕，解遮亭障驿，不隔江水。\n瓜洲曾舣，等行人岁岁。\n日下长秋，城乌夜起。\n帐庐好在春睡。\n共飞归湖上，草青无地。\n雨、春心如腻。\n欲待化、丰乐楼前，青门都废。\n何人念、流落无几。\n点点抟作，雪绵松润，为君泪。",
        pinyin: "sì dōng fēng lǎo dà， nà fù yǒu、 dāng shí fēng qì。\nyǒu qíng bù shōu， jiāng shān shēn shì jì。\nhào dàng hé shì。\ndàn yì lín guān dào， zàn lái bù zhù， biàn chū mén qiān lǐ。\nchī xīn zhǐ wàng huí fēng zhuì。\nshàn dǐ xiāng féng， chāi tóu wēi zhuì。\ntā jiā wàn tiáo qiān lǚ， jiě zhē tíng zhàng yì， bù gé jiāng shuǐ。\nguā zhōu céng yǐ， děng xíng rén suì suì。\nrì xià cháng qiū， chéng wū yè qǐ。\nzhàng lú hǎo zài chūn shuì。\ngòng fēi guī hú shàng， cǎo qīng wú dì。\nyǔ、 chūn xīn rú nì。\nyù dài huà、 fēng lè lóu qián， qīng mén dōu fèi。\nhé rén niàn、 liú luò wú jǐ。\ndiǎn diǎn tuán zuò， xuě mián sōng rùn， wèi jūn lèi。",
        translation: "东风已经老了，再没有当年的意气；这柳絮有情却不被收留，把江山当作寄身的地方，痴心指望随着回风坠下，好在小扇底下、钗头边上和旧人相逢。别人家的柳树万条千缕，懂得遮住亭台驿站，却隔不断江水；它曾在瓜洲泊船，年年等着远行的人，如今想化作飞絮在丰乐楼前起舞，可青门都已荒废，有谁怜念它流落无几的身世呢。最后点点团作雪绵般松软的东西，为君落泪。",
      }
      ],
    },
    {
      title: "瑞鹤仙 · 陆淞",
      art: 'songci-rivers:ch102',
      artPrompt: "古诗《瑞鹤仙》意境插画：脸霞红印枕。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "脸霞红印枕。\n睡觉来、冠儿还是不整。\n屏间麝煤冷。\n但眉峰压翠，泪珠弹粉。\n堂深昼永。\n燕交飞、风帘露井。\n恨无人，与说相思，近日带围宽尽。\n重省。\n残灯朱幌，淡月纱窗，那时风景。\n阳台路迥。\n云雨梦，便无准。\n待归来，先指花梢教看，却把心期细问。\n问因循、过了青春，怎生意稳。",
        pinyin: "liǎn xiá hóng yìn zhěn。\nshuì jiào lái、 guān ér hái shì bù zhěng。\npíng jiān shè méi lěng。\ndàn méi fēng yā cuì， lèi zhū tán fěn。\ntáng shēn zhòu yǒng。\nyàn jiāo fēi、 fēng lián lù jǐng。\nhèn wú rén， yǔ shuō xiāng sī， jìn rì dài wéi kuān jìn。\nzhòng shěng。\ncán dēng zhū huǎng， dàn yuè shā chuāng， nà shí fēng jǐng。\nyáng tái lù jiǒng。\nyún yǔ mèng， biàn wú zhǔn。\ndài guī lái， xiān zhǐ huā shāo jiào kàn， què bǎ xīn qī xì wèn。\nwèn yīn xún、 guò le qīng chūn， zěn shēng yì wěn。",
        translation: "脸霞般的红印还留在枕上，一觉醒来，冠儿还没整理；屏风后的香冷冷的，只见她眉头压着翠黛，泪珠弹落了脂粉。厅堂深深，白天长长的，燕子在风帘露井间双双飞舞；恨没有人可以说说相思，近日腰间的衣带都宽松到了头。又想起残灯、红帐、淡月、纱窗那时的情景，可相会的路那么远，云雨的梦也没个准；等他回来，要先指着花梢让他看，再把心事细细问他——问他一拖再拖，把青春都错过了，怎么还能心安呢。",
      }
      ],
    },
    {
      title: "减字浣溪沙・浣溪沙 · 贺铸",
      art: 'songci-rivers:ch103',
      artPrompt: "古诗《减字浣溪沙・浣溪沙》意境插画：楼角初销一缕霞。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "楼角初销一缕霞。\n淡黄杨柳暗栖鸦。\n玉人和月摘梅花。\n笑拈粉香归洞户，更垂帘幕护窗纱。\n东风寒似夜来些。",
        pinyin: "lóu jiǎo chū xiāo yī lǚ xiá。\ndàn huáng yáng liǔ àn qī yā。\nyù rén hé yuè zhāi méi huā。\nxiào niān fěn xiāng guī dòng hù， gèng chuí lián mù hù chuāng shā。\ndōng fēng hán sì yè lái xiē。",
        translation: "楼角上一缕晚霞刚刚消散，淡黄的杨柳里暗藏着栖息的乌鸦，美人在月色里摘下梅花。她笑着拈着粉香回到内室，又垂下帘幕护住窗纱。东风比昨天夜里又凉了一些。",
      }
      ],
    },
    {
      title: "天门谣 · 贺铸",
      art: 'songci-rivers:ch104',
      artPrompt: "古诗《天门谣》意境插画：牛渚天门险。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "牛渚天门险。\n限南北、七雄豪占。\n清雾敛。\n与闲人登览。\n待月上潮平波滟滟。\n塞管轻吹新《阿滥》。\n风满槛。\n历历数、西州更点。",
        pinyin: "niú zhǔ tiān mén xiǎn。\nxiàn nán běi、 qī xióng háo zhàn。\nqīng wù liǎn。\nyǔ xián rén dēng lǎn。\ndài yuè shàng cháo píng bō yàn yàn。\nsāi guǎn qīng chuī xīn《 ā làn》。\nfēng mǎn kǎn。\nlì lì shǔ、 xī zhōu gèng diǎn。",
        translation: "牛渚的天门山多么险峻，隔开南北，被一代代豪雄轮流占据；清雾收起，正好让闲人登上来看看。等月亮升起来、潮水平了、波光闪闪，边塞的笛管轻轻吹起新的《阿滥》曲。风灌满了栏杆，可以清清楚楚数出西州的更点声。",
      }
      ],
    },
    {
      title: "石州引・石州慢 · 贺铸",
      art: 'songci-rivers:ch105',
      artPrompt: "古诗《石州引・石州慢》意境插画：薄雨初寒，斜照弄晴，春意空阔。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "薄雨初寒，斜照弄晴，春意空阔。\n长亭柳色缠黄，远客一枝先折。\n烟横水际，映带几点归鸦，东风销尽龙沙雪。\n还记初关来，恰而今时节。\n将发。\n画楼芳酒，红泪清歌，顿成清别。\n已是经年，杳杳音尘多绝。\n欲知方寸，共有几许清愁，芭蕉不展丁香结。\n枉望断天涯，两厌厌风月。",
        pinyin: "báo yǔ chū hán， xié zhào nòng qíng， chūn yì kōng kuò。\ncháng tíng liǔ sè chán huáng， yuǎn kè yī zhī xiān zhé。\nyān héng shuǐ jì， yìng dài jǐ diǎn guī yā， dōng fēng xiāo jìn lóng shā xuě。\nhái jì chū guān lái， qià ér jīn shí jié。\njiāng fā。\nhuà lóu fāng jiǔ， hóng lèi qīng gē， dùn chéng qīng bié。\nyǐ shì jīng nián， yǎo yǎo yīn chén duō jué。\nyù zhī fāng cùn， gòng yǒu jǐ xǔ qīng chóu， bā jiāo bù zhǎn dīng xiāng jié。\nwǎng wàng duàn tiān yá， liǎng yàn yàn fēng yuè。",
        translation: "薄薄的雨带来初寒，斜阳弄晴，春意空阔；长亭的柳色缠着鹅黄，远行的人先把一枝折下，烟横在水边，映着几点归鸦，东风把塞外的积雪都销尽了。还记得当初出门的时候，正像如今这样的时节；临出发时画楼里的美酒、和泪的清歌，转眼成了清冷的离别，已经过了一年，音信杳杳几乎断绝。要知道我心里共有多少清愁，就像芭蕉不展、丁香打着结；白白望断天涯，两个人都恹恹地对着风月。",
      }
      ],
    },
    {
      title: "望湘人 · 贺铸",
      art: 'songci-rivers:ch106',
      artPrompt: "古诗《望湘人》意境插画：厌莺声到枕，花气动帘，醉魂愁梦相半。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "厌莺声到枕，花气动帘，醉魂愁梦相半。\n被惜馀薰，带惊剩眼。\n几许伤春春晚。\n泪竹痕鲜，佩兰香老，湘天浓暖。\n记小江、风月佳时，屡约非烟游伴。\n须信鸾弦易断。\n奈云和再鼓，曲终人远。\n认罗袜无踪，旧处弄波清浅。\n青翰棹舣，白苹洲畔。\n尽木临皋飞观。\n不解寄、一字相思，幸有归来双燕。",
        pinyin: "yàn yīng shēng dào zhěn， huā qì dòng lián， zuì hún chóu mèng xiāng bàn。\nbèi xī yú xūn， dài jīng shèng yǎn。\njǐ xǔ shāng chūn chūn wǎn。\nlèi zhú hén xiān， pèi lán xiāng lǎo， xiāng tiān nóng nuǎn。\njì xiǎo jiāng、 fēng yuè jiā shí， lǚ yuē fēi yān yóu bàn。\nxū xìn luán xián yì duàn。\nnài yún hé zài gǔ， qǔ zhōng rén yuǎn。\nrèn luó wà wú zōng， jiù chù nòng bō qīng qiǎn。\nqīng hàn zhào yǐ， bái píng zhōu pàn。\njìn mù lín gāo fēi guān。\nbù jiě jì、 yī zì xiāng sī， xìng yǒu guī lái shuāng yàn。",
        translation: "讨厌莺声吵到枕边、花气吹动帘幕，醉魂和愁梦各占一半；看见衣带上多出的扣眼才惊觉又瘦了，有多少伤春的愁，春又快要完了。泪竹的斑点还鲜，佩的兰草香已老，湘天一片浓暖；记得在小江边风月好的时候，多次约了心上人同游，可要相信鸾弦容易断，再弹起云和，曲子终了人已走远。寻不见罗袜的踪影，只在旧地弄着清浅的水波；把船停在白苹洲畔，登上临皋的高楼，他不懂寄来一个字的相思，幸好还有归来的双燕。",
      }
      ],
    },
    {
      title: "蝶恋花 · 贺铸",
      art: 'songci-rivers:ch107',
      artPrompt: "古诗《蝶恋花》意境插画：几许伤春春复暮。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "几许伤春春复暮。\n杨柳清阴，偏碍游丝度。\n天际小山桃叶步。\n白苹花满湔裙处。\n竟日微吟长短句。\n帘影灯昏，心寄胡琴语。\n数点雨声风约住。\n朦胧淡月云来去。",
        pinyin: "jǐ xǔ shāng chūn chūn fù mù。\nyáng liǔ qīng yīn， piān ài yóu sī dù。\ntiān jì xiǎo shān táo yè bù。\nbái píng huā mǎn jiān qún chù。\njìng rì wēi yín cháng duǎn jù。\nlián yǐng dēng hūn， xīn jì hú qín yǔ。\nshù diǎn yǔ shēng fēng yuē zhù。\nméng lóng dàn yuè yún lái qù。",
        translation: "多少伤春的愁绪，春天又到了迟暮；杨柳的清阴偏挡着游丝飘度，天边小山般的是桃叶渡口，白苹花开满她洗裙子的地方。整日低声吟着长短句，帘影里灯光昏昏，心事都寄托在胡琴的话语里。几点雨声被风拦住了，朦胧的淡月伴着云来来去去。",
      }
      ],
    },
    {
      title: "夏云峰 · 仲殊",
      art: 'songci-rivers:ch108',
      artPrompt: "古诗《夏云峰》意境插画：天阔云高，溪横水远。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "天阔云高，溪横水远。\n晚日寒生轻晕。\n闲阶静、杨花渐少，朱门掩、莺声犹嫩。\n悔匆匆、过却清明，旋占得馀芳，已成幽恨。\n都几日阴沈，连宵慵困。\n起来韶华都尽。\n怨入双眉闲斗损。\n乍品得情怀，看承全近。\n深深态、无非自许。\n厌厌意、终羞人间。\n争知道、梦里蓬莱，待忘了馀香，时传音信。\n纵留得莺花，东风不住，也则眼前愁闷。",
        pinyin: "tiān kuò yún gāo， xī héng shuǐ yuǎn。\nwǎn rì hán shēng qīng yūn。\nxián jiē jìng、 yáng huā jiàn shǎo， zhū mén yǎn、 yīng shēng yóu nèn。\nhuǐ cōng cōng、 guò què qīng míng， xuán zhàn dé yú fāng， yǐ chéng yōu hèn。\ndōu jǐ rì yīn shěn， lián xiāo yōng kùn。\nqǐ lái sháo huá dōu jìn。\nyuàn rù shuāng méi xián dòu sǔn。\nzhà pǐn dé qíng huái， kàn chéng quán jìn。\nshēn shēn tài、 wú fēi zì xǔ。\nyàn yàn yì、 zhōng xiū rén jiān。\nzhēng zhī dào、 mèng lǐ péng lái， dài wàng le yú xiāng， shí chuán yīn xìn。\nzòng liú dé yīng huā， dōng fēng bù zhù， yě zé yǎn qián chóu mèn。",
        translation: "天宽云高，溪水横流去得远远，晚日的寒气生出一圈轻晕；闲静的台阶上杨花渐渐少了，朱门掩着，莺声还很娇嫩。后悔匆匆过了清明，才占得一点残花，已成幽幽的恨事；连日阴沉，通宵慵困，起来时春光已经全过尽了，怨气积在双眉之间，深深的态度不过是自我期许，恹恹的心意终究羞于让人知道。哪里知道梦里还想忘掉余香、时时传个音信；就算留得住莺声花影，东风不肯停住，眼前也还是愁闷。",
      }
      ],
    },
    {
      title: "汉宫春 · 李邴",
      art: 'songci-rivers:ch109',
      artPrompt: "古诗《汉宫春》意境插画：潇洒江梅，向竹梢疏处，横两三枝。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "潇洒江梅，向竹梢疏处，横两三枝。\n东君也不爱惜，雪压霜欺。\n无情燕子，怕春寒、轻失花期。\n却是有，年年塞雁，归来曾见开时。\n清浅小溪如练，问玉堂何似，茅舍疏篱。\n伤心故人去后，冷落新诗。\n微云淡月，对江天、分付他谁。\n空自忆，清香未减，风流不在人知。",
        pinyin: "xiāo sǎ jiāng méi， xiàng zhú shāo shū chù， héng liǎng sān zhī。\ndōng jūn yě bù ài xī， xuě yā shuāng qī。\nwú qíng yàn zi， pà chūn hán、 qīng shī huā qī。\nquè shì yǒu， nián nián sāi yàn， guī lái céng jiàn kāi shí。\nqīng qiǎn xiǎo xī rú liàn， wèn yù táng hé sì， máo shè shū lí。\nshāng xīn gù rén qù hòu， lěng luò xīn shī。\nwēi yún dàn yuè， duì jiāng tiān、 fēn fù tā shuí。\nkōng zì yì， qīng xiāng wèi jiǎn， fēng liú bù zài rén zhī。",
        translation: "潇洒的江边梅花，向着竹梢稀疏的地方，横斜伸出两三枝；司春的东君也不爱惜它，任凭雪压霜欺，无情的燕子怕春寒，轻易错过了花期，倒是年年南来的塞雁，归来时曾见过它开放的样子。清浅的小溪像一条白练，问玉堂华屋哪里比得上茅舍疏篱；伤心的是故人去后，新诗也冷落了，微云淡月对着江天，这份心情托付给谁呢。空自回忆，清香没有减少，风韵本就不在乎人知不知道。",
      }
      ],
    },
    {
      title: "贺新郎 · 潘汾",
      art: 'songci-rivers:ch110',
      artPrompt: "古诗《贺新郎》意境插画：篆缕销香鼎。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "篆缕销香鼎。\n翠沈沈、庭阴转午，画堂人静。\n芳草王孙知何处，惟有杨花糁径。\n正玉枕、瞢腾初醒。\n门外残红春已去，镇无聊、酒厌厌病。\n云髻，未整。\n江南旧事休重省。\n但天涯、寻消问息，断鸿难倩。\n月满西楼凭阑久，依旧归期未定。\n便只恐、瓶沈金井。\n嘶骑不来银烛暗，枉教人、立尽梧桐影。\n谁伴我，对鸾镜。",
        pinyin: "zhuàn lǚ xiāo xiāng dǐng。\ncuì shěn shěn、 tíng yīn zhuǎn wǔ， huà táng rén jìng。\nfāng cǎo wáng sūn zhī hé chù， wéi yǒu yáng huā shēn jìng。\nzhèng yù zhěn、 méng téng chū xǐng。\nmén wài cán hóng chūn yǐ qù， zhèn wú liáo、 jiǔ yàn yàn bìng。\nyún jì， wèi zhěng。\njiāng nán jiù shì xiū zhòng shěng。\ndàn tiān yá、 xún xiāo wèn xī， duàn hóng nán qiàn。\nyuè mǎn xī lóu píng lán jiǔ， yī jiù guī qī wèi dìng。\nbiàn zhī kǒng、 píng shěn jīn jǐng。\nsī qí bù lái yín zhú àn， wǎng jiào rén、 lì jìn wú tóng yǐng。\nshuí bàn wǒ， duì luán jìng。",
        translation: "篆香一缕缕在香炉里慢慢烧尽；翠色沉沉，庭荫转过正午，画堂里安安静静，芳草丛中的游人在哪里呢，只有杨花撒满小径，她正靠着玉枕昏昏沉沉刚醒。门外残红满地，春天已经去了，终日无聊，酒喝得恹恹像病，云髻也没心思梳理；江南旧事不要重新提起了，只是走遍天涯打听消息，连只孤雁也托不到。月满西楼，靠着栏杆站了很久，归期依旧没定，又只怕像瓶沉金井一样再没指望；马的嘶声不来，银烛昏暗，白白让人站尽了梧桐的影子，谁来陪我一起对着鸾镜呢。",
      }
      ],
    },
    {
      title: "忆王孙 · 李重元",
      art: 'songci-rivers:ch111',
      artPrompt: "古诗《忆王孙》意境插画：萋萋芳草忆王孙。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "萋萋芳草忆王孙。\n柳外楼高空断魂。\n杜宇声声不忍闻。\n欲黄昏。\n雨打梨花深闭门。",
        pinyin: "qī qī fāng cǎo yì wáng sūn。\nliǔ wài lóu gāo kōng duàn hún。\ndù yǔ shēng shēng bù rěn wén。\nyù huáng hūn。\nyǔ dǎ lí huā shēn bì mén。",
        translation: "茂密的芳草，让人想念远行的人；柳外的楼台空空荡荡，叫人伤心，杜鹃一声声啼叫，实在不忍心听。快到黄昏了，雨打着梨花，门深深地关着。",
      }
      ],
    },
    {
      title: "贺新郎 · 李玉",
      art: 'songci-rivers:ch112',
      artPrompt: "古诗《贺新郎》意境插画：篆缕销金鼎。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "篆缕销金鼎。\n醉沈沈、庭阴转午，画堂人静。\n芳草王孙知何处，惟有杨花糁径。\n渐玉枕、腾腾春醒。\n帘外残红春已透，镇无聊、酒厌厌病。\n云鬓乱，未整。\n江南旧事休重省。\n遍天涯、寻消问息，断鸿难倩。\n月满西楼凭栏久，依旧归期未定。\n又只恐、瓶沈金井。\n嘶骑不来银烛暗，枉教人、立尽梧桐影。\n谁伴我，对鸾镜。",
        pinyin: "zhuàn lǚ xiāo jīn dǐng。\nzuì shěn shěn、 tíng yīn zhuǎn wǔ， huà táng rén jìng。\nfāng cǎo wáng sūn zhī hé chù， wéi yǒu yáng huā shēn jìng。\njiàn yù zhěn、 téng téng chūn xǐng。\nlián wài cán hóng chūn yǐ tòu， zhèn wú liáo、 jiǔ yàn yàn bìng。\nyún bìn luàn， wèi zhěng。\njiāng nán jiù shì xiū zhòng shěng。\nbiàn tiān yá、 xún xiāo wèn xī， duàn hóng nán qiàn。\nyuè mǎn xī lóu píng lán jiǔ， yī jiù guī qī wèi dìng。\nyòu zhī kǒng、 píng shěn jīn jǐng。\nsī qí bù lái yín zhú àn， wǎng jiào rén、 lì jìn wú tóng yǐng。\nshuí bàn wǒ， duì luán jìng。",
        translation: "篆香一缕缕在金炉里烧尽；醉意沉沉，庭荫转过正午，画堂里静静的，芳草中的游人在哪里呢，只有杨花撒满小径，她渐渐靠着玉枕，昏昏沉沉从春梦中醒来。帘外残红满地，春意已经透尽，终日无聊，酒喝得恹恹成病，云鬓散乱也没心思整理；江南旧事不要重新提起了，只是遍天涯打听消息，连只孤雁也托不到。月满西楼，凭栏许久，归期依旧没定，又只怕像瓶沉金井再没有指望；马的嘶声不来，银烛昏暗，白白让人站尽了梧桐的影子，谁来陪我一起对着鸾镜呢。",
      }
      ],
    },
    {
      title: "临江仙 · 陈与义",
      art: 'songci-rivers:ch113',
      artPrompt: "古诗《临江仙》意境插画：高咏楚词酬午日，天涯节序匆匆。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "高咏楚词酬午日，天涯节序匆匆。\n榴花不似舞裙红。\n无人知此意，歌罢满帘风。\n万事一身伤老矣，戌葵凝笑墙东。\n酒杯深浅去年同。\n试浇桥下水，今夕到湘中。",
        pinyin: "gāo yǒng chǔ cí chóu wǔ rì， tiān yá jié xù cōng cōng。\nliú huā bù sì wǔ qún hóng。\nwú rén zhī cǐ yì， gē bà mǎn lián fēng。\nwàn shì yī shēn shāng lǎo yǐ， xū kuí níng xiào qiáng dōng。\njiǔ bēi shēn qiǎn qù nián tóng。\nshì jiāo qiáo xià shuǐ， jīn xī dào xiāng zhōng。",
        translation: "高声吟咏楚辞来度过端午，感叹天涯时节匆匆；石榴花也不像当年舞裙那样红了，没有人懂得我这份心意，一曲歌罢，满帘都是风。万事都压在一身，我真是老了，墙东的葵花仿佛凝着笑看我。酒杯的深浅还和去年一样；试把酒浇到桥下的水里，今晚它就流到湘江，去祭奠屈原吧。",
      }
      ],
    },
    {
      title: "临江仙 · 陈与义",
      art: 'songci-rivers:ch114',
      artPrompt: "古诗《临江仙》意境插画：忆昔午桥桥上饮，坐中多是豪英。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "忆昔午桥桥上饮，坐中多是豪英。\n长沟流月去无声。\n杏花疏影里，吹笛到天明。\n二十馀年如一梦，此身虽在堪惊。\n闲登小阁看新晴。\n古今多少事，渔唱起三更。",
        pinyin: "yì xī wǔ qiáo qiáo shàng yǐn， zuò zhōng duō shì háo yīng。\ncháng gōu liú yuè qù wú shēng。\nxìng huā shū yǐng lǐ， chuī dí dào tiān míng。\nèr shí yú nián rú yī mèng， cǐ shēn suī zài kān jīng。\nxián dēng xiǎo gé kàn xīn qíng。\ngǔ jīn duō shǎo shì， yú chàng qǐ sān gēng。",
        translation: "回忆从前在午桥桥上饮酒，坐中多是英雄豪杰；长沟的流水带着月光悄悄流去，在杏花疏疏的影子里，吹笛一直吹到天亮。二十多年像一场大梦，这身子虽然还在，想起来也心惊。闲着登上小阁看雨后新晴；古往今来多少事，都化作渔人的歌，在三更天飘起来。",
      }
      ],
    },
    {
      title: "兰陵王 · 张元干",
      art: 'songci-rivers:ch115',
      artPrompt: "古诗《兰陵王》意境插画：卷朱箔。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "卷朱箔。\n朝雨轻阴乍阁。\n阑干外，烟柳弄晴，芳草侵阶映红药。\n东风妒花恶。\n吹落。\n梢头嫩萼。\n屏山掩，沈水倦熏，中酒心情怕杯勺。\n寻思旧京洛。\n正年少疏狂，歌笑迷著。\n障泥油壁催梳掠。\n曾驰道同载，上林携手，灯夜初过早共约。\n又争信漂泊。\n寂寞。\n念行乐。\n甚粉淡衣襟，音断弦索。\n琼枝璧月春如昨。\n怅别后华表，那回双鹤。\n相思除是，向醉里、暂忘却。",
        pinyin: "juàn zhū bó。\ncháo yǔ qīng yīn zhà gé。\nlán gān wài， yān liǔ nòng qíng， fāng cǎo qīn jiē yìng hóng yào。\ndōng fēng dù huā è。\nchuī luò。\nshāo tóu nèn è。\npíng shān yǎn， shěn shuǐ juàn xūn， zhōng jiǔ xīn qíng pà bēi sháo。\nxún si jiù jīng luò。\nzhèng nián shào shū kuáng， gē xiào mí zhù。\nzhàng ní yóu bì cuī shū lüè。\ncéng chí dào tóng zǎi， shàng lín xié shǒu， dēng yè chū guò zǎo gòng yuē。\nyòu zhēng xìn piāo bó。\njì mò。\nniàn xíng lè。\nshèn fěn dàn yī jīn， yīn duàn xián suǒ。\nqióng zhī bì yuè chūn rú zuó。\nchàng bié hòu huá biǎo， nà huí shuāng hè。\nxiāng sī chú shì， xiàng zuì lǐ、 zàn wàng què。",
        translation: "卷起朱红的帘子，晨雨初晴，栏杆外烟柳弄晴，芳草漫上台阶映着红芍药；可恨东风嫉妒花，把梢头的嫩萼都吹落了，人也带着酒意，怕再碰酒杯。回想旧日京城年少疏狂的时光，歌笑入迷，香车催着梳妆，曾在御道上同车、上林苑里携手，灯夜早早相约——谁料到后来竟这样漂泊。如今寂寞，想起当年的欢乐，音信已断，琼枝璧月般的人不在了，这相思只有到醉里才能暂时忘却。",
      }
      ],
    },
    {
      title: "石州慢 · 张元干",
      art: 'songci-rivers:ch116',
      artPrompt: "古诗《石州慢》意境插画：寒水依痕，春意渐回，沙际烟阔。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "寒水依痕，春意渐回，沙际烟阔。\n溪梅晴照生香，冷芯数枝争发。\n天涯旧恨，试看几许消魂，长亭门外山重叠。\n不尽眼中青，是愁来时节。\n情切。\n画楼深闭，想见东风，暗销肌雪。\n辜负枕前云雨，尊前花月。\n心期切处，更有多少凄凉，殷勤留与归时说。\n到得却相逢，恰经年离别。",
        pinyin: "hán shuǐ yī hén， chūn yì jiàn huí， shā jì yān kuò。\nxī méi qíng zhào shēng xiāng， lěng xīn shù zhī zhēng fā。\ntiān yá jiù hèn， shì kàn jǐ xǔ xiāo hún， cháng tíng mén wài shān chóng dié。\nbù jìn yǎn zhōng qīng， shì chóu lái shí jié。\nqíng qiè。\nhuà lóu shēn bì， xiǎng jiàn dōng fēng， àn xiāo jī xuě。\ngū fù zhěn qián yún yǔ， zūn qián huā yuè。\nxīn qī qiè chù， gèng yǒu duō shǎo qī liáng， yīn qín liú yǔ guī shí shuō。\ndào dé què xiāng féng， qià jīng nián lí bié。",
        translation: "寒水留着水痕，春意渐渐回来，沙际烟水辽阔；溪边的梅在晴光下生出香气，冷冷的几枝争着开放。天涯旧日的离恨叫人消魂，长亭门外山重重叠叠，眼中望不尽的青色，正是愁上来的时候；想见画楼深深关闭，东风暗暗消损了她的肌肤，辜负了枕前的恩爱、樽前的花月。心里的期盼伴着多少凄凉，都留到归来时细细说吧；等到真见面，却已经过了一场长长的离别。",
      }
      ],
    },
    {
      title: "薄幸 · 吕渭老",
      art: 'songci-rivers:ch117',
      artPrompt: "古诗《薄幸》意境插画：青楼春晚。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "青楼春晚。\n昼寂寂、梳匀又懒。\n乍听得、鸦啼莺弄，惹起新愁无限。\n记年时、偷掷春心，花间隔雾遥相见。\n便角枕题诗，宝钗贳酒，共醉青苔深院。\n怎忘得、回廊下，携手处、花明月满。\n如今但暮雨，蜂愁蝶恨，小窗闲对芭蕉展。\n却谁拘管。\n尽无言、闲品秦筝，泪满参差雁。\n腰支渐小，心与杨花共远。",
        pinyin: "qīng lóu chūn wǎn。\nzhòu jì jì、 shū yún yòu lǎn。\nzhà tīng dé、 yā tí yīng nòng， rě qǐ xīn chóu wú xiàn。\njì nián shí、 tōu zhì chūn xīn， huā jiàn gé wù yáo xiāng jiàn。\nbiàn jiǎo zhěn tí shī， bǎo chāi shì jiǔ， gòng zuì qīng tái shēn yuàn。\nzěn wàng dé、 huí láng xià， xié shǒu chù、 huā míng yuè mǎn。\nrú jīn dàn mù yǔ， fēng chóu dié hèn， xiǎo chuāng xián duì bā jiāo zhǎn。\nquè shuí jū guǎn。\njìn wú yán、 xián pǐn qín zhēng， lèi mǎn cēn cī yàn。\nyāo zhī jiàn xiǎo， xīn yǔ yáng huā gòng yuǎn。",
        translation: "青楼里春已深，白天静悄悄的，梳妆都懒得做；忽然听见鸦啼莺叫，惹起无限新愁。记得那年偷偷把春心掷过去，隔着花雾远远相见，于是在角枕上题诗，用宝钗换酒，一起醉倒在青苔深院；怎么忘得了回廊下携手的地方，花好月圆。如今只有暮雨，蜂愁蝶恨，小窗前闲对着芭蕉；只是无言地闲弹秦筝，泪落满了参差的筝柱，腰肢渐渐瘦小，心已随杨花飘向远方。",
      }
      ],
    },
    {
      title: "满江红 · 岳飞",
      art: 'songci-rivers:ch118',
      artPrompt: "古诗《满江红》意境插画：怒发冲冠，凭阑处、潇潇雨歇。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "怒发冲冠，凭阑处、潇潇雨歇。\n抬望眼、仰天长啸，壮怀激烈。\n三十功名尘与土，八千里路云和月。\n莫等闲、白了少年头，空悲切。\n靖康耻，犹未雪。\n臣子恨，何时灭。\n驾长车踏破，贺兰山缺。\n壮志饥餐胡虏肉，笑谈渴饮匈奴血。\n待从头、收拾旧山河，朝天阙。",
        pinyin: "nù fà chōng guān， píng lán chù、 xiāo xiāo yǔ xiē。\ntái wàng yǎn、 yǎng tiān cháng xiào， zhuàng huái jī liè。\nsān shí gōng míng chén yǔ tǔ， bā qiān lǐ lù yún hé yuè。\nmò děng xián、 bái le shào nián tóu， kōng bēi qiè。\njìng kāng chǐ， yóu wèi xuě。\nchén zǐ hèn， hé shí miè。\njià cháng chē tà pò， hè lán shān quē。\nzhuàng zhì jī cān hú lǔ ròu， xiào tán kě yǐn xiōng nú xuè。\ndài cóng tóu、 shōu shí jiù shān hé， cháo tiān quē。",
        translation: "我怒得头发竖起来顶住了帽子，靠着栏杆，潇潇的雨刚停；抬眼望天，仰天长啸，胸怀壮烈——三十年的功名像尘土，八千里的路伴着云和月，不要随随便便让少年头变白，到头来空自悲切。靖康年的耻辱还没有洗雪，做臣子的恨何时才能消除；要驾着战车踏破贺兰山的缺口，饿了恨不能吃敌人的肉，渴了恨不能喝敌人的血。等从头收整旧日的山河，再朝拜皇宫。",
      }
      ],
    },
    {
      title: "水龙吟 · 陈亮",
      art: 'songci-rivers:ch119',
      artPrompt: "古诗《水龙吟》意境插画：闹花深处层楼，画帘半卷东风软。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "闹花深处层楼，画帘半卷东风软。\n春归翠陌，平莎茸嫩，垂杨金浅。\n迟日催花，淡云阁雨，轻寒轻暖。\n恨芳菲世界，游人未赏，都付与、莺和燕。\n寂寞凭高念远。\n向南楼、一声归雁。\n金钗斗草，青丝勒马，风流云散。\n罗绶分香，翠绡封泪，几多幽怨。\n正销魂，又是疏烟淡月，子规声断。",
        pinyin: "nào huā shēn chù céng lóu， huà lián bàn juàn dōng fēng ruǎn。\nchūn guī cuì mò， píng shā róng nèn， chuí yáng jīn qiǎn。\nchí rì cuī huā， dàn yún gé yǔ， qīng hán qīng nuǎn。\nhèn fāng fēi shì jiè， yóu rén wèi shǎng， dōu fù yǔ、 yīng hé yàn。\njì mò píng gāo niàn yuǎn。\nxiàng nán lóu、 yī shēng guī yàn。\njīn chāi dòu cǎo， qīng sī lè mǎ， fēng liú yún sàn。\nluó shòu fēn xiāng， cuì xiāo fēng lèi， jǐ duō yōu yuàn。\nzhèng xiāo hún， yòu shì shū yān dàn yuè， zǐ guī shēng duàn。",
        translation: "繁花闹闹的深处有一座层楼，画帘半卷，东风软软的；春天回到翠绿的田间，平地上嫩草茸茸，垂柳浅浅的金色，迟迟的春日催着花开，淡淡的云把雨留住，天气轻寒轻暖。只恨这芬芳美好的世界，游人还没来欣赏，都交给莺和燕了；寂寞地登高怀远，向南楼听见一声归雁，当年斗草的金钗、勒马的青丝，那些风流都像云一样散了。分别时赠香的罗带、封着泪的翠巾，藏着多少幽怨；正伤心的时分，又是疏烟淡月，杜鹃的叫声断断续续。",
      }
      ],
    },
    {
      title: "宴山亭・燕山亭 · 张",
      art: 'songci-rivers:ch120',
      artPrompt: "古诗《宴山亭・燕山亭》意境插画：幽梦初回，重阴未开，晓色吹成疏雨。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "幽梦初回，重阴未开，晓色吹成疏雨。\n竹槛气寒，蕙畹声摇，新绿暗通南浦。\n未有人行，才半启、回廊朱户。\n无绪。\n空望极霓旌，锦书难据。\n苔径追忆曾游，念谁伴、秋千采绳芳柱。\n犀奁黛卷，凤枕云孤，应也几番凝伫。\n怎得伊来，花雾绕、小堂深处。\n留住。\n直到老、不教归去。",
        pinyin: "yōu mèng chū huí， zhòng yīn wèi kāi， xiǎo sè chuī chéng shū yǔ。\nzhú kǎn qì hán， huì wǎn shēng yáo， xīn lǜ àn tōng nán pǔ。\nwèi yǒu rén xíng， cái bàn qǐ、 huí láng zhū hù。\nwú xù。\nkōng wàng jí ní jīng， jǐn shū nán jù。\ntái jìng zhuī yì céng yóu， niàn shuí bàn、 qiū qiān cǎi shéng fāng zhù。\nxī lián dài juàn， fèng zhěn yún gū， yìng yě jǐ fān níng zhù。\nzěn dé yī lái， huā wù rào、 xiǎo táng shēn chù。\nliú zhù。\nzhí dào lǎo、 bù jiào guī qù。",
        translation: "幽梦刚刚醒来，浓云还没散开，晓色被吹成了疏疏的雨；竹栏边气寒，兰圃里声摇，新绿暗暗通向南浦，还没有人走动，回廊的朱户才半开着。心情无聊，空望着远处的仪仗，锦书也不可靠；在长苔的小路上追忆曾经同游，想那时谁伴着秋千、彩绳芳柱，妆匣的黛眉卷起，凤枕边像云一样孤单，想必她也几次凝神伫立。怎样才能让她来，让花雾绕着小堂深处，把她留住，直到老，也不放她回去。",
      }
      ],
    },
    {
      title: "唐多令 · 刘过",
      art: 'songci-rivers:ch121',
      artPrompt: "古诗《唐多令》意境插画：芦叶满汀洲。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "芦叶满汀洲。\n塞沙带浅流。\n二十年、重过南楼。\n柳下系舟犹未稳，能几日、又中秋。\n黄鹤断矶头。\n故人今不在。\n旧江山，浑是新愁。\n欲买桂花同载酒，终不似、少年游。",
        pinyin: "lú yè mǎn tīng zhōu。\nsāi shā dài qiǎn liú。\nèr shí nián、 zhòng guò nán lóu。\nliǔ xià xì zhōu yóu wèi wěn， néng jǐ rì、 yòu zhōng qiū。\nhuáng hè duàn jī tóu。\ngù rén jīn bù zài。\njiù jiāng shān， hún shì xīn chóu。\nyù mǎi guì huā tóng zǎi jiǔ， zhōng bù sì、 shào nián yóu。",
        translation: "芦叶落满小洲，寒沙带着浅浅的水流；二十年后重新经过南楼，船在柳下还没系稳，算来过不了几天又是中秋。黄鹤矶头，故人如今不在，眼前的旧江山，全成了新愁。想买一枝桂花、载一船酒去游玩，可终究不像少年时候的滋味了。",
      }
      ],
    },
    {
      title: "点绛唇 · 姜夔",
      art: 'songci-rivers:ch122',
      artPrompt: "古诗《点绛唇》意境插画：燕雁无心，太湖西畔随云去。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "燕雁无心，太湖西畔随云去。\n数峰清苦。\n商略黄昏雨。\n第四桥边，拟共天随住。\n今何许。\n凭栏怀古。\n残柳参差舞。",
        pinyin: "yàn yàn wú xīn， tài hú xī pàn suí yún qù。\nshù fēng qīng kǔ。\nshāng lüè huáng hūn yǔ。\ndì sì qiáo biān， nǐ gòng tiān suí zhù。\njīn hé xǔ。\npíng lán huái gǔ。\ncán liǔ cēn cī wǔ。",
        translation: "燕雁无心机，随着云在太湖西畔飞去；几座山峰清瘦愁苦，好像在商量着黄昏要下雨。想就在第四桥边，像天随子那样住下来，可如今他在哪里呢；凭着栏杆怀想古人，只有残柳参差起舞。",
      }
      ],
    },
    {
      title: "鹧鸪天 · 姜夔",
      art: 'songci-rivers:ch123',
      artPrompt: "古诗《鹧鸪天》意境插画：肥水东流无尽期。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "肥水东流无尽期。\n当初不合种相思。\n梦中未比丹青见，暗里忽惊山鸟啼。\n春未绿，鬓先丝。\n人间别久不成悲。\n谁教岁岁红莲夜，两处沉吟各自知。",
        pinyin: "féi shuǐ dōng liú wú jìn qī。\ndāng chū bù hé zhǒng xiāng sī。\nmèng zhōng wèi bǐ dān qīng jiàn， àn lǐ hū jīng shān niǎo tí。\nchūn wèi lǜ， bìn xiān sī。\nrén jiān bié jiǔ bù chéng bēi。\nshuí jiào suì suì hóng lián yè， liǎng chù chén yín gè zì zhī。",
        translation: "肥水向东流去没有尽头，当初真不该种下这相思；梦里的相见还不如画上看得清楚，正沉在梦里，忽然被山鸟的啼声惊醒。春天还没绿，鬓发先白了；人间分别久了，连悲哀都好像不成悲哀了。可谁叫每年挂红莲灯的元宵夜里，两边的人都各自在心里暗暗想念，只有自己知道。",
      }
      ],
    },
    {
      title: "杏花天 · 姜夔",
      art: 'songci-rivers:ch124',
      artPrompt: "古诗《杏花天》意境插画：绿丝低拂鸳鸯浦。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "绿丝低拂鸳鸯浦。\n想桃叶、当时唤渡。\n又将愁眼与春风，待去。\n倚兰桡、更少驻。\n金陵路。\n莺吟燕舞。\n算潮水、知人最苦。\n满汀芳草不成归，日暮。\n更移舟、向甚处。",
        pinyin: "lǜ sī dī fú yuān yāng pǔ。\nxiǎng táo yè、 dāng shí huàn dù。\nyòu jiāng chóu yǎn yǔ chūn fēng， dài qù。\nyǐ lán ráo、 gèng shǎo zhù。\njīn líng lù。\nyīng yín yàn wǔ。\nsuàn cháo shuǐ、 zhī rén zuì kǔ。\nmǎn tīng fāng cǎo bù chéng guī， rì mù。\ngèng yí zhōu、 xiàng shèn chù。",
        translation: "绿色的柳丝低低拂着鸳鸯浦，想当年桃叶就是在这里唤渡船的；又把这双含愁的眼睛交给春风，要走了，还倚着船桨再多停留一会儿。金陵路上莺歌燕舞，算来只有潮水最懂得人的愁苦。满洲的芳草青青，人还是不能归去；天晚了，再把船移向哪里呢。",
      }
      ],
    },
    {
      title: "踏莎行 · 姜夔",
      art: 'songci-rivers:ch125',
      artPrompt: "古诗《踏莎行》意境插画：燕燕轻盈，莺莺娇软。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "燕燕轻盈，莺莺娇软。\n分明又向华胥见。\n夜长争得薄情知，春初早被相思染。\n别后书辞，别时针线。\n离魂暗逐郎行远。\n淮南皓月冷千山，冥冥归去无人管。",
        pinyin: "yàn yàn qīng yíng， yīng yīng jiāo ruǎn。\nfēn míng yòu xiàng huá xū jiàn。\nyè cháng zhēng dé bó qíng zhī， chūn chū zǎo bèi xiāng sī rǎn。\nbié hòu shū cí， bié shí zhēn xiàn。\nlí hún àn zhú láng xíng yuǎn。\nhuái nán hào yuè lěng qiān shān， míng míng guī qù wú rén guǎn。",
        translation: "她像燕子一样轻盈，像黄莺一样娇软，分明又在梦里见到了她；长夜漫漫，薄情的人哪里知道，春还没深，早就被相思沾染了。分别后的书信还在，分别时针线的活计还在，她的魂魄暗暗跟着你越走越远。淮南的皓月冷冷照着千山，她孤零零地归去，没有人照管。",
      }
      ],
    },
    {
      title: "霓裳中序第一 · 姜夔",
      art: 'songci-rivers:ch126',
      artPrompt: "古诗《霓裳中序第一》意境插画：亭皋正望极。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "亭皋正望极。\n乱落江莲归未得。\n多病却无气力。\n况纨扇渐疏，罗衣初萦。\n流光过隙。\n叹杏梁、双燕如客。\n人何在，一帘淡月，仿佛照颜色。\n幽寂。\n乱蛩吟壁。\n动庾信、清愁似织。\n沉思年少浪迹。\n笛里关山，柳下坊陌。\n坠红无信息。\n漫暗水，涓涓溜碧。\n漂零久，而今何意，醉卧酒垆侧。",
        pinyin: "tíng gāo zhèng wàng jí。\nluàn luò jiāng lián guī wèi dé。\nduō bìng què wú qì lì。\nkuàng wán shàn jiàn shū， luó yī chū yíng。\nliú guāng guò xì。\ntàn xìng liáng、 shuāng yàn rú kè。\nrén hé zài， yī lián dàn yuè， fǎng fú zhào yán sè。\nyōu jì。\nluàn qióng yín bì。\ndòng yǔ xìn、 qīng chóu sì zhī。\nchén sī nián shào làng jì。\ndí lǐ guān shān， liǔ xià fāng mò。\nzhuì hóng wú xìn xī。\nmàn àn shuǐ， juān juān liū bì。\npiāo líng jiǔ， ér jīn hé yì， zuì wò jiǔ lú cè。",
        translation: "站在亭边水岸极目远望，江边莲花纷纷乱落，我还没有回去；多病又没有力气，何况纨扇渐渐收起，罗衣也刚换上厚的，光阴像从缝隙里溜过去，叹那屋梁上的双燕也像客人一样要走了。人在哪里呢，一帘淡月仿佛还照着她的容颜；幽静寂寞，乱蟋蟀在墙根吟叫，牵动像庾信那样的清愁，密密地织着。沉思少年时四处浪游，笛声里有关山，柳荫下有坊巷小路；坠落的红花没有消息，漂零久了，如今哪还有心思醉倒在酒垆边呢。",
      }
      ],
    },
    {
      title: "庆宫春・高阳台 · 姜夔",
      art: 'songci-rivers:ch127',
      artPrompt: "古诗《庆宫春・高阳台》意境插画：双桨莼波，一蓑松雨，暮愁渐满空阔。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "双桨莼波，一蓑松雨，暮愁渐满空阔。\n呼我盟鸥，翩翩欲下，背人还过木末。\n那回归去，荡云雪、孤舟夜发。\n伤心重见，依约眉山，黛痕低压。\n采香径里春寒，老子婆娑，自歌谁答。\n垂虹西望，飘然引去，此兴平生难遏。\n酒醒波远，政凝想、明素袜。\n如今安在，唯有阑干，伴人一霎。",
        pinyin: "shuāng jiǎng chún bō， yī suō sōng yǔ， mù chóu jiàn mǎn kōng kuò。\nhū wǒ méng ōu， piān piān yù xià， bèi rén hái guò mù mò。\nnà huí guī qù， dàng yún xuě、 gū zhōu yè fā。\nshāng xīn zhòng jiàn， yī yuē méi shān， dài hén dī yā。\ncǎi xiāng jìng lǐ chūn hán， lǎo zǐ pó suō， zì gē shuí dá。\nchuí hóng xī wàng， piāo rán yǐn qù， cǐ xīng píng shēng nán è。\njiǔ xǐng bō yuǎn， zhèng níng xiǎng、 míng sù wà。\nrú jīn ān zài， wéi yǒu lán gān， bàn rén yī shà。",
        translation: "双桨划过莼菜的水波，一蓑衣的松雨，暮愁渐渐充满了空阔的天地；呼唤我的鸥鹭朋友，翩翩像要下来，又背着我飞过了树梢。那次归去，在云雪里孤舟夜发；伤心地重新见到，隐隐约约像眉山低压的一道黛痕。采香径里春寒，我独自婆娑起舞，自己唱歌没有谁应答；从垂虹桥向西望去，飘飘然引舟而去，这样的兴致平生难以遏止——酒醒时波涛已远，还凝想她明亮的素袜，如今她在哪里呢，只有栏杆陪伴我一会儿。",
      }
      ],
    },
    {
      title: "齐天乐 · 姜夔",
      art: 'songci-rivers:ch128',
      artPrompt: "古诗《齐天乐》意境插画：庾郎先自吟愁赋。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "庾郎先自吟愁赋。\n凄凄更闻私语。\n露湿铜铺，苔侵石井，都是曾听伊处。\n哀音似诉。\n正思妇无眠，起寻机杼。\n曲曲屏山，夜凉独自甚情绪。\n西窗又吹暗雨。\n为谁频断续，相和砧杵。\n候馆迎秋，离宫吊月，别有伤心无数。\n豳诗漫与。\n笑篱落呼灯，世间儿女。\n写入琴丝，一声声更苦。",
        pinyin: "yǔ láng xiān zì yín chóu fù。\nqī qī gèng wén sī yǔ。\nlù shī tóng pù， tái qīn shí jǐng， dōu shì céng tīng yī chù。\nāi yīn sì sù。\nzhèng sī fù wú mián， qǐ xún jī zhù。\nqǔ qǔ píng shān， yè liáng dú zì shèn qíng xù。\nxī chuāng yòu chuī àn yǔ。\nwèi shuí pín duàn xù， xiāng hé zhēn chǔ。\nhòu guǎn yíng qiū， lí gōng diào yuè， bié yǒu shāng xīn wú shù。\nbīn shī màn yǔ。\nxiào lí luò hū dēng， shì jiān ér nǚ。\nxiě rù qín sī， yī shēng shēng gèng kǔ。",
        translation: "庾信本来就在吟愁赋，又凄凄地听见私语似的声音；露水打湿了铜铺门环，青苔爬上石井，都是从前听蟋蟀叫的地方，哀音像在诉说，正是思妇睡不着，起身寻找织布机，曲曲的屏风像远山，夜凉时独自一个是什么情绪。西窗外又吹着暗暗的雨，蟋蟀声为谁断断续续，和捣衣的砧杵声相应和；候馆里迎着秋，离宫里对着月，别有无数的伤心。《豳风》里的诗句随意写下；可笑那篱落间呼灯捉蟋蟀的，正是世间的小儿女，把这些声音写进琴丝，一声一声更苦。",
      }
      ],
    },
    {
      title: "一萼红 · 姜夔",
      art: 'songci-rivers:ch129',
      artPrompt: "古诗《一萼红》意境插画：古城阴。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "古城阴。\n有官梅几许，红萼未宜簪。\n池面冰胶，墙腰雪老，云意还又沈沈。\n翠藤共、闲穿径竹，渐笑语、惊起卧沙禽。\n野老林泉，故王台榭，呼唤登临。\n南去北来何事，荡湘云楚水，目极伤心。\n朱户黏鸡，金盘簇燕，空叹时序侵寻。\n记曾共，西楼雅集，想垂杨、还袅万丝金。\n待得归鞍到时，只怕春深。",
        pinyin: "gǔ chéng yīn。\nyǒu guān méi jǐ xǔ， hóng è wèi yí zān。\nchí miàn bīng jiāo， qiáng yāo xuě lǎo， yún yì hái yòu shěn shěn。\ncuì téng gòng、 xián chuān jìng zhú， jiàn xiào yǔ、 jīng qǐ wò shā qín。\nyě lǎo lín quán， gù wáng tái xiè， hū huàn dēng lín。\nnán qù běi lái hé shì， dàng xiāng yún chǔ shuǐ， mù jí shāng xīn。\nzhū hù nián jī， jīn pán cù yàn， kōng tàn shí xù qīn xún。\njì céng gòng， xī lóu yǎ jí， xiǎng chuí yáng、 hái niǎo wàn sī jīn。\ndài dé guī ān dào shí， zhǐ pà chūn shēn。",
        translation: "古城的背阴处，有几树官家的梅花，红花萼还不适合簪戴；池面结着冰，墙腰堆着残雪，云意又沉沉的，翠藤和我们一起闲闲地穿过竹径，渐渐的笑语惊起了沙洲上卧着的禽鸟，山野老人的林泉、故王的台榭，正招呼我们去登临。南来北往为了什么呢，漂荡在湘云楚水之间，望到极处只有伤心；朱户上贴着鸡形剪纸，金盘里簇着春燕，空自叹息时节慢慢过去。记得曾经一同在西楼雅集，想那垂杨如今还袅袅垂着万缕金丝吧；等骑马回来的时候，只怕春已经深了。",
      }
      ],
    },
    {
      title: "念奴娇 · 姜夔",
      art: 'songci-rivers:ch130',
      artPrompt: "古诗《念奴娇》意境插画：闹红一舸，记来时、尝与鸳鸯为侣。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "闹红一舸，记来时、尝与鸳鸯为侣。\n三十六陂人未到，水佩风裳无数。\n翠叶吹凉，玉容销酒，更洒菰蒲雨。\n嫣然摇动，冷香飞上诗句。\n日暮。\n青盖亭亭，情人不见，争忍凌波去。\n只恐舞衣寒易落，愁入西风南浦。\n高柳垂阴，老鱼吹浪，留我花间住。\n田田多少，几回沙际归路。",
        pinyin: "nào hóng yī gě， jì lái shí、 cháng yǔ yuān yāng wèi lǚ。\nsān shí liù bēi rén wèi dào， shuǐ pèi fēng shang wú shù。\ncuì yè chuī liáng， yù róng xiāo jiǔ， gèng sǎ gū pú yǔ。\nyān rán yáo dòng， lěng xiāng fēi shàng shī jù。\nrì mù。\nqīng gài tíng tíng， qíng rén bù jiàn， zhēng rěn líng bō qù。\nzhī kǒng wǔ yī hán yì luò， chóu rù xī fēng nán pǔ。\ngāo liǔ chuí yīn， lǎo yú chuī làng， liú wǒ huā jiān zhù。\ntián tián duō shǎo， jǐ huí shā jì guī lù。",
        translation: "我坐一条小船穿行在闹闹的红荷花里，记得来的时候，曾和鸳鸯作伴；三十六陂人迹未到，像佩饰的流水、像衣裳的风荷无数，翠叶吹来凉风，玉容上的酒意渐渐消了，又洒下一阵菰蒲间的雨，荷花嫣然摇动，冷冷的香气飞上了我的诗句。日暮了，青翠的伞盖亭亭，心上的人不在，荷花怎么忍心踏波而去呢；只怕舞衣般的荷瓣禁不住寒容易落，愁随着西风到了南浦。高柳垂下浓阴，老鱼吹起浪花，留我住在花间；多少田田的荷叶啊，记着我几回沿沙岸归去的路。",
      }
      ],
    },
    {
      title: "琵琶仙・自度曲 · 姜夔",
      art: 'songci-rivers:ch131',
      artPrompt: "古诗《琵琶仙・自度曲》意境插画：双桨来时，有人似、旧曲桃根桃叶。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "双桨来时，有人似、旧曲桃根桃叶。\n歌扇轻约飞花，蛾眉正奇绝。\n春渐远、汀洲自绿，更添了、几声啼。\n十里扬州，三生杜牧，前事休说。\n又还是、宫烛分烟，奈愁里、匆匆换时节。\n都把一襟芳思，与空阶榆荚。\n千万缕、藏鸦细柳，为玉尊、起舞回雪。\n想见西出阳关，故人初别。",
        pinyin: "shuāng jiǎng lái shí， yǒu rén sì、 jiù qǔ táo gēn táo yè。\ngē shàn qīng yuē fēi huā， é méi zhèng qí jué。\nchūn jiàn yuǎn、 tīng zhōu zì lǜ， gèng tiān le、 jǐ shēng tí。\nshí lǐ yáng zhōu， sān shēng dù mù， qián shì xiū shuō。\nyòu hái shì、 gōng zhú fēn yān， nài chóu lǐ、 cōng cōng huàn shí jié。\ndōu bǎ yī jīn fāng sī， yǔ kōng jiē yú jiá。\nqiān wàn lǚ、 cáng yā xì liǔ， wèi yù zūn、 qǐ wǔ huí xuě。\nxiǎng jiàn xī chū yáng guān， gù rén chū bié。",
        translation: "双桨划来时，船上有人像旧曲里的桃根桃叶，她用歌扇轻轻挡着飞花，蛾眉正美到极点；春光渐渐远了，汀洲自顾自绿着，又添了几声啼叫，十里扬州，杜牧三生的情事，前尘休再说了。又还是宫烛分烟的寒食时节，偏偏在愁里匆匆换了季节，把一襟的芳春情思，都交给空阶前的榆荚吧。千丝万缕的细柳藏得住乌鸦，为人举杯时，柳絮像回雪一样起舞；想起当年西出阳关，与故人初别的情景。",
      }
      ],
    },
    {
      title: "八归 · 姜夔",
      art: 'songci-rivers:ch132',
      artPrompt: "古诗《八归》意境插画：芳莲坠粉，蔬桐吹绿，庭院暗雨乍歇。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "芳莲坠粉，蔬桐吹绿，庭院暗雨乍歇。\n无端抱影销魂处，还见筱墙萤暗，藓阶蛩切。\n送客重寻西去路，问水面、琵琶谁拨。\n最可惜、一片江山，总付与啼。\n长恨相从未款，而今何事，又对西风离别。\n渚寒烟淡，棹移人远，缥缈行舟如叶。\n想文君望久，倚竹愁生步罗袜。\n归来后、翠尊双饮，下了珠帘，玲珑闲看月。",
        pinyin: "fāng lián zhuì fěn， shū tóng chuī lǜ， tíng yuàn àn yǔ zhà xiē。\nwú duān bào yǐng xiāo hún chù， hái jiàn xiǎo qiáng yíng àn， xiǎn jiē qióng qiè。\nsòng kè zhòng xún xī qù lù， wèn shuǐ miàn、 pí pa shuí bō。\nzuì kě xī、 yī piàn jiāng shān， zǒng fù yǔ tí。\ncháng hèn xiāng cóng wèi kuǎn， ér jīn hé shì， yòu duì xī fēng lí bié。\nzhǔ hán yān dàn， zhào yí rén yuǎn， piāo miǎo xíng zhōu rú yè。\nxiǎng wén jūn wàng jiǔ， yǐ zhú chóu shēng bù luó wà。\nguī lái hòu、 cuì zūn shuāng yǐn， xià le zhū lián， líng lóng xián kàn yuè。",
        translation: "荷花落下了粉红的花瓣，庭院里的一阵阴雨刚刚停歇。我在水边送朋友远行，小船像一片叶子慢慢漂远，心里满是不舍。盼着他早些回来，我们一起放下珠帘，安安静静地看月亮。",
      }
      ],
    },
    {
      title: "扬州慢 · 姜夔",
      art: 'songci-rivers:ch133',
      artPrompt: "古诗《扬州慢》意境插画：淮左名都，竹西佳处，解鞍少驻初程。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "淮左名都，竹西佳处，解鞍少驻初程。\n过春风十里，尽荠麦青青。\n自胡马窥江去后，废池乔木，犹厌言兵。\n渐黄昏，清角吹寒，都在空城。\n杜郎俊赏，算而今，重到须惊。\n纵豆蔻词工，青楼梦好，难赋深情。\n二十四桥仍在，波心荡、冷月无声。\n念桥边红药，年年知为谁生。",
        pinyin: "huái zuǒ míng dōu， zhú xī jiā chù， jiě ān shǎo zhù chū chéng。\nguò chūn fēng shí lǐ， jìn qí mài qīng qīng。\nzì hú mǎ kuī jiāng qù hòu， fèi chí qiáo mù， yóu yàn yán bīng。\njiàn huáng hūn， qīng jiǎo chuī hán， dōu zài kōng chéng。\ndù láng jùn shǎng， suàn ér jīn， zhòng dào xū jīng。\nzòng dòu kòu cí gōng， qīng lóu mèng hǎo， nán fù shēn qíng。\nèr shí sì qiáo réng zài， bō xīn dàng、 lěng yuè wú shēng。\nniàn qiáo biān hóng yào， nián nián zhī wèi shuí shēng。",
        translation: "扬州本是著名的好地方，可自从战乱过后，到处长满了野菜和麦子，只剩下一座空城。二十四桥还在，冷冷的月亮在水波里晃动，没有一点声音。桥边的红芍药年年开放，又是为谁开的呢？",
      }
      ],
    },
    {
      title: "长亭怨慢 · 姜夔",
      art: 'songci-rivers:ch134',
      artPrompt: "古诗《长亭怨慢》意境插画：渐吹尽、枝头香絮。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "渐吹尽、枝头香絮。\n是处人家，绿深门户。\n远浦萦回，暮帆零乱向何许。\n阅人多矣，谁得似、长亭树。\n树若有情时，不会得、青青如此。\n日暮。\n望高城不见，只见乱山无数。\n韦郎去也，怎忘得、玉环分付。\n第一是、早早归来，怕红萼、无人为主。\n算空有并刀，难翦离愁千缕。",
        pinyin: "jiàn chuī jìn、 zhī tóu xiāng xù。\nshì chù rén jiā， lǜ shēn mén hù。\nyuǎn pǔ yíng huí， mù fān líng luàn xiàng hé xǔ。\nyuè rén duō yǐ， shuí dé sì、 cháng tíng shù。\nshù ruò yǒu qíng shí， bù huì dé、 qīng qīng rú cǐ。\nrì mù。\nwàng gāo chéng bù jiàn， zhǐ jiàn luàn shān wú shù。\nwéi láng qù yě， zěn wàng dé、 yù huán fēn fù。\ndì yī shì、 zǎo zǎo guī lái， pà hóng è、 wú rén wéi zhǔ。\nsuàn kōng yǒu bìng dāo， nán jiǎn lí chóu qiān lǚ。",
        translation: "柳絮被风吹尽了，我在长亭边送你远去，黄昏时回头望，看不见城池，只见数不清的乱山。你要记得早点回来，怕家里的花儿没人疼爱。这离愁像千条丝线，就算有再快的剪刀也剪不断。",
      }
      ],
    },
    {
      title: "淡黄柳 · 姜夔",
      art: 'songci-rivers:ch135',
      artPrompt: "古诗《淡黄柳》意境插画：空城晓月。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "空城晓月。\n吹入垂杨陌。\n马上单衣寒恻恻。\n看尽鹅黄嫩绿，都是江南旧相识。\n正岑寂。\n明朝又寒食。\n强携酒、小桥宅，怕梨花落尽成秋色。\n燕燕飞来，问春何在，唯有池塘自碧。",
        pinyin: "kōng chéng xiǎo yuè。\nchuī rù chuí yáng mò。\nmǎ shàng dān yī hán cè cè。\nkàn jìn é huáng nèn lǜ， dōu shì jiāng nán jiù xiāng shí。\nzhèng cén jì。\nmíng cháo yòu hán shí。\nqiáng xié jiǔ、 xiǎo qiáo zhái， pà lí huā luò jìn chéng qiū sè。\nyàn yàn fēi lái， wèn chūn hé zài， wéi yǒu chí táng zì bì。",
        translation: "清晨的月亮照着空城，我骑马走在杨柳成荫的小路上，穿着单衣觉得阵阵发冷。路边鹅黄嫩绿的柳色，都像我在江南见过的老朋友。燕子飞来问春天在哪里，只有池塘的水还自顾自地泛着碧绿。",
      }
      ],
    },
    {
      title: "暗香 · 姜夔",
      art: 'songci-rivers:ch136',
      artPrompt: "古诗《暗香》意境插画：旧时月色。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "旧时月色。\n算几番照我，梅边吹笛。\n唤起玉人，不管清寒与攀摘。\n何逊而今渐老，都忘却、春风词笔。\n但怪得、竹外疏花，香冷入瑶席。\n江国。\n正寂寂。\n叹寄与路遥，夜雪初积。\n翠尊易泣。\n红萼无言耿相忆。\n长记曾携手处，千树压、西湖寒碧。\n又片片、吹尽也，几时见得。",
        pinyin: "jiù shí yuè sè。\nsuàn jǐ fān zhào wǒ， méi biān chuī dí。\nhuàn qǐ yù rén， bù guǎn qīng hán yǔ pān zhāi。\nhé xùn ér jīn jiàn lǎo， dōu wàng què、 chūn fēng cí bǐ。\ndàn guài dé、 zhú wài shū huā， xiāng lěng rù yáo xí。\njiāng guó。\nzhèng jì jì。\ntàn jì yǔ lù yáo， yè xuě chū jī。\ncuì zūn yì qì。\nhóng è wú yán gěng xiāng yì。\ncháng jì céng xié shǒu chù， qiān shù yā、 xī hú hán bì。\nyòu piàn piàn、 chuī jìn yě， jǐ shí jiàn dé。",
        translation: "记得从前的月色，多少次照着我在梅边吹笛，还唤来心上人，不怕清寒去攀折梅花。如今想折一枝梅花寄给远方的人，可是路太远，夜雪又厚。梅花被风吹得一片片落尽，什么时候才能再看到满树花开呢？",
      }
      ],
    },
    {
      title: "疏影 · 姜夔",
      art: 'songci-rivers:ch137',
      artPrompt: "古诗《疏影》意境插画：苔枝缀玉。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "苔枝缀玉。\n有翠禽小小，枝上同宿。\n客里相逢，篱角黄昏，无言自倚修竹。\n昭君不惯胡沙远，但暗忆、江南江北。\n想佩环、月夜归来，化作此花幽独。\n犹记深宫旧事，那人正睡里，飞近蛾绿。\n莫似春风，不管盈盈，早与安排金屋。\n还教一片随波去，又却怨、玉龙哀曲。\n等恁时、重觅幽香，已入小窗横幅。",
        pinyin: "tái zhī zhuì yù。\nyǒu cuì qín xiǎo xiǎo， zhī shàng tóng sù。\nkè lǐ xiāng féng， lí jiǎo huáng hūn， wú yán zì yǐ xiū zhú。\nzhāo jūn bù guàn hú shā yuǎn， dàn àn yì、 jiāng nán jiāng běi。\nxiǎng pèi huán、 yuè yè guī lái， huà zuò cǐ huā yōu dú。\nyóu jì shēn gōng jiù shì， nà rén zhèng shuì lǐ， fēi jìn é lǜ。\nmò sì chūn fēng， bù guǎn yíng yíng， zǎo yǔ ān pái jīn wū。\nhái jiào yī piàn suí bō qù， yòu què yuàn、 yù lóng āi qǔ。\nděng nèn shí、 zhòng mì yōu xiāng， yǐ rù xiǎo chuāng héng fú。",
        translation: "长满青苔的梅枝上缀着玉一样的白花，小小的翠鸟在枝头一同安睡。黄昏里，梅花静静开在篱笆角，默默倚着修长的竹子。等花瓣随水漂走，再想寻找这幽幽的清香，它已经画进了小窗边的图画里。",
      }
      ],
    },
    {
      title: "翠楼吟 · 姜夔",
      art: 'songci-rivers:ch138',
      artPrompt: "古诗《翠楼吟》意境插画：月冷龙沙，尘轻虎落，今年汉初赐。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "月冷龙沙，尘轻虎落，今年汉初赐。\n新翻胡部曲，听毡幕、元戎歌吹。\n层楼高峙。\n看栏曲萦红，檐牙飞翠。\n人姝丽。\n粉香吹下，夜寒风细。\n此地。\n宜有词仙，拥素云黄鹤，与君游戏。\n玉梯凝望久，叹芳草、萋萋千里。\n天涯情味。\n仗酒清愁，花销英气。\n西山外。\n晚来还卷，一帘秋霁。",
        pinyin: "yuè lěng lóng shā， chén qīng hǔ luò， jīn nián hàn chū cì。\nxīn fān hú bù qǔ， tīng zhān mù、 yuán róng gē chuī。\ncéng lóu gāo zhì。\nkàn lán qǔ yíng hóng， yán yá fēi cuì。\nrén shū lì。\nfěn xiāng chuī xià， yè hán fēng xì。\ncǐ dì。\nyí yǒu cí xiān， yōng sù yún huáng hè， yǔ jūn yóu xì。\nyù tī níng wàng jiǔ， tàn fāng cǎo、 qī qī qiān lǐ。\ntiān yá qíng wèi。\nzhàng jiǔ qīng chóu， huā xiāo yīng qì。\nxī shān wài。\nwǎn lái hái juàn， yī lián qiū jì。",
        translation: "月光冷冷地照着边地，新起的高楼高高地耸立，红色的栏杆曲折环绕，翠绿的檐角高高翘起。我在楼上久久远望，只见芳草萋萋，绵延千里。傍晚卷起帘子，西边山外正是一帘雨后晴朗的秋色。",
      }
      ],
    },
    {
      title: "木兰花・玉楼春 · 钱惟演",
      art: 'songci-rivers:ch139',
      artPrompt: "古诗《木兰花・玉楼春》意境插画：城上风光莺语乱。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "城上风光莺语乱。\n城下烟波春拍岸。\n绿杨芳草几时休，泪眼愁肠先已断。\n情怀渐变成衰晚。\n鸾鉴朱颜惊暗换。\n昔年多病厌芳尊，今日芳尊惟恐浅。",
        pinyin: "chéng shàng fēng guāng yīng yǔ luàn。\nchéng xià yān bō chūn pāi àn。\nlǜ yáng fāng cǎo jǐ shí xiū， lèi yǎn chóu cháng xiān yǐ duàn。\nqíng huái jiàn biàn chéng shuāi wǎn。\nluán jiàn zhū yán jīng àn huàn。\nxī nián duō bìng yàn fāng zūn， jīn rì fāng zūn wéi kǒng qiǎn。",
        translation: "城墙上春光正好，黄莺啼个不停，城下烟波浩渺，春水拍打着堤岸。我的心情却渐渐衰老，镜子里红润的容颜不知不觉变了样。从前多病不爱端酒杯，如今却只怕酒杯斟得太浅。",
      }
      ],
    },
    {
      title: "苏幕遮 · 范仲淹",
      art: 'songci-rivers:ch140',
      artPrompt: "古诗《苏幕遮》意境插画：碧云天，黄叶地。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "碧云天，黄叶地。\n秋色连波，波上寒烟翠。\n山映斜阳天接水。\n芳草无情，更在斜阳外。\n黯乡魂，追旅思。\n夜夜除非，好梦留人睡。\n明月楼高休独倚。\n酒入愁肠，化作相思泪。",
        pinyin: "bì yún tiān， huáng yè dì。\nqiū sè lián bō， bō shàng hán yān cuì。\nshān yìng xié yáng tiān jiē shuǐ。\nfāng cǎo wú qíng， gèng zài xié yáng wài。\nàn xiāng hún， zhuī lǚ sī。\nyè yè chú fēi， hǎo mèng liú rén shuì。\nmíng yuè lóu gāo xiū dú yǐ。\njiǔ rù chóu cháng， huà zuò xiāng sī lèi。",
        translation: "蓝天上飘着碧云，地上铺满黄叶，秋色连着江波，波上浮着翠绿的寒烟。思念家乡，愁绪缠人，只有夜里做上个好梦，才能睡得安稳。月光下不要独自倚着高楼，因为酒进了愁肠，都会化作思念的泪水。",
      }
      ],
    },
    {
      title: "御街行 · 范仲淹",
      art: 'songci-rivers:ch141',
      artPrompt: "古诗《御街行》意境插画：纷纷堕叶飘香砌。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "纷纷堕叶飘香砌。\n夜寂静、寒声碎。\n真珠帘卷玉楼空，天淡银河垂地。\n年年今夜，月华如练，长是人千里。\n愁肠已断无由醉。\n酒未到、先成泪。\n残灯明灭枕头欹。\n谙尽孤眠滋味。\n都来此事，眉间心上，无计相回避。",
        pinyin: "fēn fēn duò yè piāo xiāng qì。\nyè jì jìng、 hán shēng suì。\nzhēn zhū lián juàn yù lóu kōng， tiān dàn yín hé chuí dì。\nnián nián jīn yè， yuè huá rú liàn， cháng shì rén qiān lǐ。\nchóu cháng yǐ duàn wú yóu zuì。\njiǔ wèi dào、 xiān chéng lèi。\ncán dēng míng miè zhěn tou qī。\nān jìn gū mián zī wèi。\ndōu lái cǐ shì， méi jiān xīn shàng， wú jì xiāng huí bì。",
        translation: "树叶纷纷飘落在台阶上，夜深人静，只听见沙沙的冷声。年年今夜的月光都像白绢一样皎洁，可想念的人却在千里之外。愁得酒还没沾唇就先变成了泪，这点心事挂在眉间、记在心上，怎么也躲不开。",
      }
      ],
    },
    {
      title: "曲玉管 · 柳永",
      art: 'songci-rivers:ch142',
      artPrompt: "古诗《曲玉管》意境插画：陇首云飞，江边日晚，烟波满目凭阑久。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "陇首云飞，江边日晚，烟波满目凭阑久。\n立望关河萧索，千里清秋。\n忍凝眸。\n杳杳神京，盈盈仙子，别来锦字终难偶。\n断雁无凭，冉冉飞下汀洲。\n思悠悠。\n暗想当初，有多少、幽欢佳会，岂知聚散难期，翻成雨恨云愁。\n阻追游。\n每登山临水，惹起平生心事，一场消黯，永日无言，却下层楼。",
        pinyin: "lǒng shǒu yún fēi， jiāng biān rì wǎn， yān bō mǎn mù píng lán jiǔ。\nlì wàng guān hé xiāo suǒ， qiān lǐ qīng qiū。\nrěn níng móu。\nyǎo yǎo shén jīng， yíng yíng xiān zǐ， bié lái jǐn zì zhōng nán ǒu。\nduàn yàn wú píng， rǎn rǎn fēi xià tīng zhōu。\nsī yōu yōu。\nàn xiǎng dāng chū， yǒu duō shǎo、 yōu huān jiā huì， qǐ zhī jù sàn nán qī， fān chéng yǔ hèn yún chóu。\nzǔ zhuī yóu。\nměi dēng shān lín shuǐ， rě qǐ píng shēng xīn shì， yī chǎng xiāo àn， yǒng rì wú yán， què xià céng lóu。",
        translation: "山头白云飘飞，江边日头西沉，我久久靠着栏杆远望，满眼是千里清秋的萧条。想起京城里心上的人，分别后连书信也没有收到，只见一只孤雁慢慢飞落在水边沙洲。每次登山临水，都会勾起平生的心事，只好默默无言地下楼回去。",
      }
      ],
    },
    {
      title: "雨霖铃 · 柳永",
      art: 'songci-rivers:ch143',
      artPrompt: "古诗《雨霖铃》意境插画：寒蝉凄切。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "寒蝉凄切。\n对长亭晚，骤雨初歇。\n都门帐饮无绪，留恋处、兰舟催发。\n执手相看泪眼，竟无语凝噎。\n念去去、千里烟波，暮霭沈沈楚天阔。\n多情自古伤离别。\n更那堪、冷落清秋节。\n今宵酒醒何处，杨柳岸、晓风残月。\n此去经年，应是良辰、好景虚设。\n便纵有、千种风情，更与何人说。",
        pinyin: "hán chán qī qiè。\nduì cháng tíng wǎn， zhòu yǔ chū xiē。\ndōu mén zhàng yǐn wú xù， liú liàn chù、 lán zhōu cuī fā。\nzhí shǒu xiàng kàn lèi yǎn， jìng wú yǔ níng yē。\nniàn qù qù、 qiān lǐ yān bō， mù ǎi shěn shěn chǔ tiān kuò。\nduō qíng zì gǔ shāng lí bié。\ngèng nà kān、 lěng luò qīng qiū jié。\njīn xiāo jiǔ xǐng hé chù， yáng liǔ àn、 xiǎo fēng cán yuè。\ncǐ qù jīng nián， yìng shì liáng chén、 hǎo jǐng xū shè。\nbiàn zòng yǒu、 qiān zhǒng fēng qíng， gèng yǔ hé rén shuō。",
        translation: "秋蝉凄凉地叫着，傍晚的长亭外，一场大雨刚刚停了。我们握着手泪眼相望，千言万语哽在喉咙里说不出来；今夜酒醒时，身边大概只有杨柳岸的晨风和一弯残月。这一去要好几年，就算有千种深情，又能对谁说呢？",
      }
      ],
    },
    {
      title: "采莲令 · 柳永",
      art: 'songci-rivers:ch144',
      artPrompt: "古诗《采莲令》意境插画：月华收，云淡霜天曙。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "月华收，云淡霜天曙。\n西征客、此时情苦。\n翠娥执手送临歧，轧轧开朱户。\n千娇面、盈盈伫立，无言有泪，断肠争忍回顾。\n一叶兰舟，便恁急桨凌波去。\n贪行色、岂知离绪。\n万般方寸，但饮恨，脉脉同谁语。\n更回首、重城不见，寒江天外，隐隐两三烟树。",
        pinyin: "yuè huá shōu， yún dàn shuāng tiān shǔ。\nxī zhēng kè、 cǐ shí qíng kǔ。\ncuì é zhí shǒu sòng lín qí， yà yà kāi zhū hù。\nqiān jiāo miàn、 yíng yíng zhù lì， wú yán yǒu lèi， duàn cháng zhēng rěn huí gù。\nyī yè lán zhōu， biàn nèn jí jiǎng líng bō qù。\ntān xíng sè、 qǐ zhī lí xù。\nwàn bān fāng cùn， dàn yǐn hèn， mò mò tóng shuí yǔ。\ngèng huí shǒu、 zhòng chéng bù jiàn， hán jiāng tiān wài， yǐn yǐn liǎng sān yān shù。",
        translation: "月亮落下，霜天的清晨亮了，西行的旅人心里最苦。她握着我的手在岔路口送别，站在那儿一句话也说不出来，只有眼泪往下掉。小船急急地划走，回头再望，城郭已经看不见，只有寒江天边隐隐约约几棵烟蒙蒙的树。",
      }
      ],
    },
    {
      title: "凤栖梧・蝶恋花 · 柳永",
      art: 'songci-rivers:ch145',
      artPrompt: "古诗《凤栖梧・蝶恋花》意境插画：伫倚危楼风细细。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "伫倚危楼风细细。\n望极春愁，黯黯生天际。\n草色烟光残照里。\n无言谁会凭阑意。\n拟把疏狂图一醉。\n对酒当歌，强乐还无味。\n衣带渐宽终不悔。\n为伊消得人憔悴。",
        pinyin: "zhù yǐ wēi lóu fēng xì xì。\nwàng jí chūn chóu， àn àn shēng tiān jì。\ncǎo sè yān guāng cán zhào lǐ。\nwú yán shuí huì píng lán yì。\nnǐ bǎ shū kuáng tú yī zuì。\nduì jiǔ dāng gē， qiáng lè hái wú wèi。\nyī dài jiàn kuān zhōng bù huǐ。\nwèi yī xiāo dé rén qiáo cuì。",
        translation: "我久久倚在高楼上，微风吹拂，春天的愁绪从天边暗暗升起。本想借酒醉忘掉愁闷，可对着酒勉强欢乐，还是没有味道。为了她，我衣带渐宽、人渐渐消瘦也始终不后悔，甘愿为她这样憔悴。",
      }
      ],
    },
    {
      title: "浪淘沙 · 柳永",
      art: 'songci-rivers:ch146',
      artPrompt: "古诗《浪淘沙》意境插画：梦觉、透窗风一线，寒灯吹息。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "梦觉、透窗风一线，寒灯吹息。\n那堪酒醒，又闻空阶，夜雨频滴。\n嗟因循、久作天涯客。\n负佳人、几许盟言，便忍把、从前欢会，陡顿翻成忧戚。\n愁极。\n再三追思，洞房深处，几度饮散歌阑，香暖鸳鸯被，岂暂时疏散，费伊心力。\n云尤雨，有万般千种，相怜相惜。\n恰到如今，天长漏永，无端自家疏隔。\n知何时、却拥秦云态，愿低帏昵枕，轻轻细说与，江乡夜夜，数寒更思忆。",
        pinyin: "mèng jué、 tòu chuāng fēng yī xiàn， hán dēng chuī xī。\nnà kān jiǔ xǐng， yòu wén kōng jiē， yè yǔ pín dī。\njiē yīn xún、 jiǔ zuò tiān yá kè。\nfù jiā rén、 jǐ xǔ méng yán， biàn rěn bǎ、 cóng qián huān huì， dǒu dùn fān chéng yōu qī。\nchóu jí。\nzài sān zhuī sī， dòng fáng shēn chù， jǐ dù yǐn sàn gē lán， xiāng nuǎn yuān yāng bèi， qǐ zàn shí shū sàn， fèi yī xīn lì。\nyún yóu yǔ， yǒu wàn bān qiān zhǒng， xiāng lián xiāng xī。\nqià dào rú jīn， tiān cháng lòu yǒng， wú duān zì jiā shū gé。\nzhī hé shí、 què yōng qín yún tài， yuàn dī wéi nì zhěn， qīng qīng xì shuō yǔ， jiāng xiāng yè yè， shù hán gèng sī yì。",
        translation: "半夜梦醒，一线冷风吹熄了灯，又听见夜雨点点滴滴落在空台阶上。叹自己长年漂泊在天涯，辜负了心上人的许多誓言。不知什么时候才能回到她身边，在低垂的帐子里、贴身的枕头边，轻轻细说这些夜晚里对她的想念。",
      }
      ],
    },
    {
      title: "定风波 · 柳永",
      art: 'songci-rivers:ch147',
      artPrompt: "古诗《定风波》意境插画：自春来、惨绿愁红，芳心是事可可。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "自春来、惨绿愁红，芳心是事可可。\n日上花梢，莺穿柳带，犹压香衾卧。\n暖酥消，腻云。\n终日厌厌倦梳裹。\n无那。\n恨薄情一去，音书无个。\n早知恁么。\n悔当初、不把雕鞍锁。\n向鸡窗、只与蛮笺象管，拘束教吟课。\n镇相随，莫抛躲。\n针线闲拈伴伊坐。\n和我。\n免使年少，光阴虚过。",
        pinyin: "zì chūn lái、 cǎn lǜ chóu hóng， fāng xīn shì shì kě kě。\nrì shàng huā shāo， yīng chuān liǔ dài， yóu yā xiāng qīn wò。\nnuǎn sū xiāo， nì yún。\nzhōng rì yàn yàn juàn shū guǒ。\nwú nà。\nhèn bó qíng yī qù， yīn shū wú gè。\nzǎo zhī nèn me。\nhuǐ dāng chū、 bù bǎ diāo ān suǒ。\nxiàng jī chuāng、 zhī yǔ mán jiān xiàng guǎn， jū shù jiào yín kè。\nzhèn xiāng suí， mò pāo duǒ。\nzhēn xiàn xián niān bàn yī zuò。\nhé wǒ。\nmiǎn shǐ nián shào， guāng yīn xū guò。",
        translation: "自从春天来了，我看什么都没有心思，太阳升上花梢，莺儿在柳条间穿飞，我还懒懒地盖着被子躺着，一整天也不想梳妆。恨那薄情的人一走就断了音信，早知道这样，当初真该把他留在家里。让他坐在窗前读书写字，我拿着针线活陪在他身边，免得让年少的时光白白虚度。",
      }
      ],
    },
    {
      title: "少年游 · 柳永",
      art: 'songci-rivers:ch148',
      artPrompt: "古诗《少年游》意境插画：长安古道马迟迟。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "长安古道马迟迟。\n高柳乱蝉栖。\n夕阳岛外，秋风原上，目断四天垂。\n归云一去无踪迹，何处是前期。\n狎兴生疏，酒徒萧索，不似去年时。",
        pinyin: "cháng ān gǔ dào mǎ chí chí。\ngāo liǔ luàn chán qī。\nxī yáng dǎo wài， qiū fēng yuán shàng， mù duàn sì tiān chuí。\nguī yún yī qù wú zōng jì， hé chù shì qián qī。\nxiá xīng shēng shū， jiǔ tú xiāo suǒ， bù sì qù nián shí。",
        translation: "长安古道上，我骑着马慢慢走，高高的柳树上蝉声乱响。夕阳落在山外，秋风吹过原野，抬头望去，天四面低垂，望不到尽头。往事像飞云一去无踪，游兴淡了，酒友也散了，一切都不同于去年。",
      }
      ],
    },
    {
      title: "戚氏 · 柳永",
      art: 'songci-rivers:ch149',
      artPrompt: "古诗《戚氏》意境插画：晚秋天。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "晚秋天。\n一霎微雨洒庭轩。\n槛菊萧疏，井梧零乱惹残烟。\n凄然。\n望江关。\n飞云黯淡夕阳间。\n当时宋玉悲感，向此临水与登山。\n远道迢递，行人凄楚，倦听陇水潺。\n正蝉吟败叶，蛩响衰草，相应喧喧。\n孤馆度日如年。\n风露渐变，悄悄至更阑。\n长天净，绛河清浅，皓月婵娟。\n思绵绵。\n夜永对景，那堪屈指，暗想从前。\n未名未禄，绮陌红楼，往往经岁迁延。\n帝里风光好，当年少日，暮宴朝欢。\n况有狂朋怪侣，遇当歌、对酒竞留连。\n别来迅景如梭，旧游似梦，烟水程何限。\n念利名、憔悴长萦绊。\n追往事、空惨愁颜。\n漏箭移、稍觉轻寒。\n渐呜咽、画角数声残。\n对闲窗畔，停灯向晓，抱影无眠。",
        pinyin: "wǎn qiū tiān。\nyī shà wēi yǔ sǎ tíng xuān。\nkǎn jú xiāo shū， jǐng wú líng luàn rě cán yān。\nqī rán。\nwàng jiāng guān。\nfēi yún àn dàn xī yáng jiān。\ndāng shí sòng yù bēi gǎn， xiàng cǐ lín shuǐ yǔ dēng shān。\nyuǎn dào tiáo dì， xíng rén qī chǔ， juàn tīng lǒng shuǐ chán。\nzhèng chán yín bài yè， qióng xiǎng shuāi cǎo， xiāng yìng xuān xuān。\ngū guǎn dù rì rú nián。\nfēng lù jiàn biàn， qiāo qiāo zhì gèng lán。\ncháng tiān jìng， jiàng hé qīng qiǎn， hào yuè chán juān。\nsī mián mián。\nyè yǒng duì jǐng， nà kān qū zhǐ， àn xiǎng cóng qián。\nwèi míng wèi lù， qǐ mò hóng lóu， wǎng wǎng jīng suì qiān yán。\ndì lǐ fēng guāng hǎo， dāng nián shào rì， mù yàn cháo huān。\nkuàng yǒu kuáng péng guài lǚ， yù dāng gē、 duì jiǔ jìng liú lián。\nbié lái xùn jǐng rú suō， jiù yóu sì mèng， yān shuǐ chéng hé xiàn。\nniàn lì míng、 qiáo cuì cháng yíng bàn。\nzhuī wǎng shì、 kōng cǎn chóu yán。\nlòu jiàn yí、 shāo jué qīng hán。\njiàn wū yàn、 huà jiǎo shù shēng cán。\nduì xián chuāng pàn， tíng dēng xiàng xiǎo， bào yǐng wú mián。",
        translation: "晚秋时节，一阵细雨洒在庭院，栏外的菊花稀稀落落，井边的梧桐叶凌乱地飘着残烟。我独自在客舍里度日如年，长夜里对着明月，忍不住回想当年在京城里朝欢暮宴的日子。如今为名利奔波憔悴，只听画角声声呜咽，守着灯到天亮，抱着影子睡不着。",
      }
      ],
    },
    {
      title: "夜半乐 · 柳永",
      art: 'songci-rivers:ch150',
      artPrompt: "古诗《夜半乐》意境插画：冻云黯淡天气，扁舟一叶，乘兴离江渚。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "冻云黯淡天气，扁舟一叶，乘兴离江渚。\n渡万壑千岩，越溪深处。\n怒涛渐息，樵风乍起，更闻商旅相呼。\n片帆高举。\n泛画鹢、翩翩过南浦。\n望中酒旆闪闪，一簇烟村，数行霜树。\n残日下，渔人鸣榔归去。\n败荷零落，衰杨掩映，岸边两两三三，浣沙游女。\n避行客、含羞笑相语。\n到此因念，绣阁轻抛，浪萍难驻。\n叹后约丁宁竟何据。\n惨离怀，空恨岁晚归期阻。\n凝泪眼、杳杳神京路。\n断鸿声远长天暮。",
        pinyin: "dòng yún àn dàn tiān qì， piān zhōu yī yè， chéng xìng lí jiāng zhǔ。\ndù wàn hè qiān yán， yuè xī shēn chù。\nnù tāo jiàn xī， qiáo fēng zhà qǐ， gèng wén shāng lǚ xiāng hū。\npiàn fān gāo jǔ。\nfàn huà yì、 piān piān guò nán pǔ。\nwàng zhōng jiǔ pèi shǎn shǎn， yī cù yān cūn， shù xíng shuāng shù。\ncán rì xià， yú rén míng láng guī qù。\nbài hé líng luò， shuāi yáng yǎn yìng， àn biān liǎng liǎng sān sān， huàn shā yóu nǚ。\nbì xíng kè、 hán xiū xiào xiāng yǔ。\ndào cǐ yīn niàn， xiù gé qīng pāo， làng píng nán zhù。\ntàn hòu yuē dīng níng jìng hé jù。\ncǎn lí huái， kōng hèn suì wǎn guī qī zǔ。\nníng lèi yǎn、 yǎo yǎo shén jīng lù。\nduàn hóng shēng yuǎn cháng tiān mù。",
        translation: "天色阴沉，我乘一叶小舟乘兴离开江边，渡过千岩万壑，一路听见风声起处商旅们的呼唤。夕阳下渔人敲着船帮回家，岸边有三三两两的浣纱姑娘，笑着说着躲开来客。看到这些，我忽然悔恨轻易抛下了家中的亲人，泪水凝在眼里，只听见孤雁的叫声远远消失在暮色里。",
      }
      ],
    },
    {
      title: "玉蝴蝶 · 柳永",
      art: 'songci-rivers:ch151',
      artPrompt: "古诗《玉蝴蝶》意境插画：望处雨收云断，凭阑悄悄，目送秋光。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "望处雨收云断，凭阑悄悄，目送秋光。\n晚景萧疏，堪动宋玉悲凉。\n水风轻、苹花渐老，月露冷、梧叶飘黄。\n遣情伤。\n故人何在，烟水茫茫。\n难忘。\n文期酒会，几孤风月，屡变星霜。\n海阔山遥，未知何处是潇湘。\n念双燕、难凭远信，指暮天、空识归航。\n黯相望。\n断鸿声里，立尽斜阳。",
        pinyin: "wàng chù yǔ shōu yún duàn， píng lán qiāo qiāo， mù sòng qiū guāng。\nwǎn jǐng xiāo shū， kān dòng sòng yù bēi liáng。\nshuǐ fēng qīng、 píng huā jiàn lǎo， yuè lù lěng、 wú yè piāo huáng。\nqiǎn qíng shāng。\ngù rén hé zài， yān shuǐ máng máng。\nnán wàng。\nwén qī jiǔ huì， jǐ gū fēng yuè， lǚ biàn xīng shuāng。\nhǎi kuò shān yáo， wèi zhī hé chù shì xiāo xiāng。\nniàn shuāng yàn、 nán píng yuǎn xìn， zhǐ mù tiān、 kōng shí guī háng。\nàn xiāng wàng。\nduàn hóng shēng lǐ， lì jìn xié yáng。",
        translation: "雨停云散，我静静倚着栏杆，目送秋光远去。水面的风轻轻吹着，苹花渐渐老了，月下的露水冰凉，梧桐叶一片片飘黄。不知老朋友们都在哪里，眼前只有烟水茫茫；我站在孤雁的叫声里，一直站到夕阳落尽。",
      }
      ],
    },
    {
      title: "八声甘州 · 柳永",
      art: 'songci-rivers:ch152',
      artPrompt: "古诗《八声甘州》意境插画：对潇潇、暮雨洒江天，一番洗清秋。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "对潇潇、暮雨洒江天，一番洗清秋。\n渐霜风凄惨，关河冷落，残照当楼。\n是处红衰翠减，苒苒物华休。\n惟有长江水，无语东流。\n不忍登高临远，望故乡渺邈，归思难收。\n叹年来踪迹，何事苦淹留。\n想佳人、妆楼望，误几回、天际识归舟。\n争知我、倚阑干处，正恁凝愁。",
        pinyin: "duì xiāo xiāo、 mù yǔ sǎ jiāng tiān， yī fān xǐ qīng qiū。\njiàn shuāng fēng qī cǎn， guān hé lěng luò， cán zhào dāng lóu。\nshì chù hóng shuāi cuì jiǎn， rǎn rǎn wù huá xiū。\nwéi yǒu cháng jiāng shuǐ， wú yǔ dōng liú。\nbù rěn dēng gāo lín yuǎn， wàng gù xiāng miǎo miǎo， guī sī nán shōu。\ntàn nián lái zōng jì， hé shì kǔ yān liú。\nxiǎng jiā rén、 zhuāng lóu wàng， wù jǐ huí、 tiān jì shí guī zhōu。\nzhēng zhī wǒ、 yǐ lán gān chù， zhèng nèn níng chóu。",
        translation: "傍晚的雨潇潇洒过江天，把清秋洗得干干净净。霜风渐渐凄冷，关山河流一片冷落，残阳正照着高楼，只有长江水一句话不说，默默向东流去。我想心上人此刻正在妆楼上望着我，多少回把远处开来的船错认成我坐的船；她哪里知道，我也正倚着栏杆，为她发愁呢。",
      }
      ],
    },
    {
      title: "竹马子・竹马儿 · 柳永",
      art: 'songci-rivers:ch153',
      artPrompt: "古诗《竹马子・竹马儿》意境插画：登孤垒荒凉，危亭旷望，静临烟渚。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "登孤垒荒凉，危亭旷望，静临烟渚。\n对雌霓挂雨，雄风拂槛，微收烦暑。\n渐觉一叶惊秋，残蝉噪晚，素商时序。\n览景想前欢，指神京，非雾非烟深处。\n向此成追感，新愁易积，故人难聚。\n凭高尽日凝伫。\n赢得消魂无语。\n极目霁霭霏微，暝鸦零乱，萧索江城暮。\n南楼画角，又送残阳去。",
        pinyin: "dēng gū lěi huāng liáng， wēi tíng kuàng wàng， jìng lín yān zhǔ。\nduì cí ní guà yǔ， xióng fēng fú kǎn， wēi shōu fán shǔ。\njiàn jué yī yè jīng qiū， cán chán zào wǎn， sù shāng shí xù。\nlǎn jǐng xiǎng qián huān， zhǐ shén jīng， fēi wù fēi yān shēn chù。\nxiàng cǐ chéng zhuī gǎn， xīn chóu yì jī， gù rén nán jù。\npíng gāo jìn rì níng zhù。\nyíng dé xiāo hún wú yǔ。\njí mù jì ǎi fēi wēi， míng yā líng luàn， xiāo suǒ jiāng chéng mù。\nnán lóu huà jiǎo， yòu sòng cán yáng qù。",
        translation: "我登上荒凉的土丘，在高亭上远远眺望，静静面对烟雾蒙蒙的水边沙洲。雨后天边挂着彩虹，风拂过栏杆，暑热渐渐退去，残蝉在暮色里鸣叫，让人惊觉秋天已经来了。想到老朋友难以相聚，新愁不断堆上心头，我在楼上站了一整天，直到画角声又送走了西沉的太阳。",
      }
      ],
    },
    {
      title: "迷神引 · 柳永",
      art: 'songci-rivers:ch154',
      artPrompt: "古诗《迷神引》意境插画：一叶扁舟轻帆卷。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "一叶扁舟轻帆卷。\n暂泊楚江南岸。\n孤城暮角，引胡茄怨。\n水茫茫，平沙雁、旋惊散。\n烟敛寒林簇，画屏展。\n天际遥山小，黛眉浅。\n旧赏轻抛，到此成游宦。\n觉客程劳，年光晚。\n异乡风物，忍萧索、当愁眼。\n帝城赊，秦楼阻，旅魂乱。\n芳草连空阔，残照满。\n佳人无消息，断云远。",
        pinyin: "yī yè piān zhōu qīng fān juàn。\nzàn bó chǔ jiāng nán àn。\ngū chéng mù jiǎo， yǐn hú qié yuàn。\nshuǐ máng máng， píng shā yàn、 xuán jīng sàn。\nyān liǎn hán lín cù， huà píng zhǎn。\ntiān jì yáo shān xiǎo， dài méi qiǎn。\njiù shǎng qīng pāo， dào cǐ chéng yóu huàn。\njué kè chéng láo， nián guāng wǎn。\nyì xiāng fēng wù， rěn xiāo suǒ、 dāng chóu yǎn。\ndì chéng shē， qín lóu zǔ， lǚ hún luàn。\nfāng cǎo lián kōng kuò， cán zhào mǎn。\njiā rén wú xiāo xī， duàn yún yuǎn。",
        translation: "一只小船卷起轻帆，暂时停在楚江南岸。黄昏里孤城传来号角声，茫茫水面上，大雁被惊得四散飞起，天边的远山小小的，像淡淡的一抹眉。我为了做官远离家乡，只觉得旅途劳顿、年岁渐晚；心上人没有消息，就像远去的孤云一样渺茫。",
      }
      ],
    },
    {
      title: "醉垂鞭 · 张先",
      art: 'songci-rivers:ch155',
      artPrompt: "古诗《醉垂鞭》意境插画：双蝶绣罗裙。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "双蝶绣罗裙。\n东池宴。\n初相见。\n朱粉不深匀。\n闲花淡淡春。\n细看诸处好。\n人人道。\n柳腰身。\n昨日乱山昏。\n来时衣上云。",
        pinyin: "shuāng dié xiù luó qún。\ndōng chí yàn。\nchū xiāng jiàn。\nzhū fěn bù shēn yún。\nxián huā dàn dàn chūn。\nxì kàn zhū chù hǎo。\nrén rén dào。\nliǔ yāo shēn。\nzuó rì luàn shān hūn。\nlái shí yī shàng yún。",
        translation: "她的罗裙上绣着一双蝴蝶，我们在东池的宴席上初次相见。她只淡淡地搽了点脂粉，就像一朵朴素的花，自带三分春色。人人都夸她腰身像柳条一样苗条，她走来时，衣裳上好像还带着山间飘动的云。",
      }
      ],
    },
    {
      title: "一丛花令・一丛花 · 张先",
      art: 'songci-rivers:ch156',
      artPrompt: "古诗《一丛花令・一丛花》意境插画：伤高怀远几时穷。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "伤高怀远几时穷。\n无物似情浓。\n离愁正引千丝乱，更东陌、飞絮。\n嘶骑渐遥，征尘不断，何处认郎踪。\n双鸳池沼水溶溶。\n南北小桡通。\n梯横画阁黄昏后，又还是、斜月帘栊。\n沈恨细思，不如桃杏，犹解嫁东风。",
        pinyin: "shāng gāo huái yuǎn jǐ shí qióng。\nwú wù sì qíng nóng。\nlí chóu zhèng yǐn qiān sī luàn， gèng dōng mò、 fēi xù。\nsī qí jiàn yáo， zhēng chén bù duàn， hé chù rèn láng zōng。\nshuāng yuān chí zhǎo shuǐ róng róng。\nnán běi xiǎo ráo tōng。\ntī héng huà gé huáng hūn hòu， yòu hái shì、 xié yuè lián lóng。\nshěn hèn xì sī， bù rú táo xìng， yóu jiě jià dōng fēng。",
        translation: "登高怀远，这样的伤心什么时候才是尽头？心上人骑马越走越远，到哪儿去寻他的踪影呢？细细想来，人还不如桃花杏花，它们还懂得嫁给东风、随春风飞去呢。",
      }
      ],
    },
    {
      title: "天仙子 · 张先",
      art: 'songci-rivers:ch157',
      artPrompt: "古诗《天仙子》意境插画：水调数声持酒听。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "水调数声持酒听。\n午醉醒来愁未醒。\n送春春去几时回，临晚镜。\n伤流景。\n往事后期空记省。\n沙上并禽池上暝。\n云破月来花弄影。\n重重帘幕密遮灯，风不定。\n人初静。\n明日落红应满径。",
        pinyin: "shuǐ tiáo shù shēng chí jiǔ tīng。\nwǔ zuì xǐng lái chóu wèi xǐng。\nsòng chūn chūn qù jǐ shí huí， lín wǎn jìng。\nshāng liú jǐng。\nwǎng shì hòu qī kōng jì shěng。\nshā shàng bìng qín chí shàng míng。\nyún pò yuè lái huā nòng yǐng。\nchóng chóng lián mù mì zhē dēng， fēng bù dìng。\nrén chū jìng。\nmíng rì luò hóng yìng mǎn jìng。",
        translation: "我端着酒听了几支曲子，午间的醉意醒了，愁却没有醒。送走了春天，春天什么时候能回来呢？池塘边双宿的水鸟在暮色中相依，风吹破云层，月亮出来了，花枝在月下摆弄着自己的影子；明早落花一定会铺满小路吧。",
      }
      ],
    },
    {
      title: "千秋岁 · 张先",
      art: 'songci-rivers:ch158',
      artPrompt: "古诗《千秋岁》意境插画：数声鶗鴂。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "数声鶗鴂。\n又报芳菲歇。\n惜春更把残红折。\n雨轻风色暴，梅子青时节。\n永丰柳，无人尽日飞花雪。\n莫把幺弦拨。\n怨极弦能说。\n天不老，情难绝。\n心似双丝网，中有千千结。\n夜过也，东窗未白凝残月。",
        pinyin: "shù shēng tí jué。\nyòu bào fāng fēi xiē。\nxī chūn gèng bǎ cán hóng zhé。\nyǔ qīng fēng sè bào， méi zǐ qīng shí jié。\nyǒng fēng liǔ， wú rén jìn rì fēi huā xuě。\nmò bǎ yāo xián bō。\nyuàn jí xián néng shuō。\ntiān bù lǎo， qíng nán jué。\nxīn sì shuāng sī wǎng， zhōng yǒu qiān qiān jié。\nyè guò yě， dōng chuāng wèi bái níng cán yuè。",
        translation: "杜鹃鸟叫了几声，又来报告花期快过了，爱惜春天的人只好折下一枝残花。天上不会老，人的情意也断不了；心就像双丝结成的网，里面有上千个解不开的结。长夜过去，东窗还没有发白，残月还挂在天上。",
      }
      ],
    },
    {
      title: "青门引・青门饮 · 张先",
      art: 'songci-rivers:ch159',
      artPrompt: "古诗《青门引・青门饮》意境插画：乍暖还轻冷。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "乍暖还轻冷。\n风雨晚来方定。\n庭轩寂寞近清明，残花中酒，又是去年病。\n楼头画角风吹醒。\n入夜重门静。\n那堪更被明月，隔墙送过秋千影。",
        pinyin: "zhà nuǎn hái qīng lěng。\nfēng yǔ wǎn lái fāng dìng。\ntíng xuān jì mò jìn qīng míng， cán huā zhōng jiǔ， yòu shì qù nián bìng。\nlóu tóu huà jiǎo fēng chuī xǐng。\nrù yè zhòng mén jìng。\nnà kān gèng bèi míng yuè， gé qiáng sòng guò qiū qiān yǐng。",
        translation: "天气刚刚回暖还有点冷，晚来的风雨才停歇。快到清明了，庭院里冷冷清清，对着残花喝闷酒，又犯了像去年一样的愁病。入夜后重重门户一片安静，最难受的是明月隔着墙，把秋千的影子送了过来。",
      }
      ],
    },
    {
      title: "浣溪沙 · 晏殊",
      art: 'songci-rivers:ch160',
      artPrompt: "古诗《浣溪沙》意境插画：一曲新词酒一杯。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "一曲新词酒一杯。\n去年天气旧亭台。\n夕阳西下几时回。\n无可奈何花落去，似曾相识燕归来。\n小园香径独徘徊。",
        pinyin: "yī qǔ xīn cí jiǔ yī bēi。\nqù nián tiān qì jiù tíng tái。\nxī yáng xī xià jǐ shí huí。\nwú kě nài hé huā luò qù， sì céng xiāng shí yàn guī lái。\nxiǎo yuán xiāng jìng dú pái huái。",
        translation: "听一曲新词，饮一杯美酒，天气和亭台都还是去年的样子，夕阳西下了，什么时候才会回来？花儿落去让人无可奈何，燕子又飞回来了，好像去年见过似的。我在小园飘着花香的小路上，独自走来走去。",
      }
      ],
    },
    {
      title: "浣溪沙 · 晏殊",
      art: 'songci-rivers:ch161',
      artPrompt: "古诗《浣溪沙》意境插画：一向年光有限身。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "一向年光有限身。\n等闲离别易消魂。\n酒筵歌席莫辞频。\n满目山河空念远，落花风雨更伤春。\n不如怜取眼前人。",
        pinyin: "yī xiàng nián guāng yǒu xiàn shēn。\nděng xián lí bié yì xiāo hún。\njiǔ yán gē xí mò cí pín。\nmǎn mù shān hé kōng niàn yuǎn， luò huā fēng yǔ gèng shāng chūn。\nbù rú lián qǔ yǎn qián rén。",
        translation: "人的时光有限，平常的离别也够让人伤心，所以有酒宴歌会时不要推辞，要尽情欢乐。满眼山河，空自想念远方的人，风雨中落花满地，更让人为春天难过。不如好好珍惜眼前的人吧。",
      }
      ],
    },
    {
      title: "清平乐 · 晏殊",
      art: 'songci-rivers:ch162',
      artPrompt: "古诗《清平乐》意境插画：金风细细。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "金风细细。\n叶叶梧桐坠。\n绿酒初尝人易醉。\n一枕小窗浓睡。\n紫微朱槿花残。\n斜阳却照阑干。\n双燕欲归时节，银屏昨夜微寒。",
        pinyin: "jīn fēng xì xì。\nyè yè wú tóng zhuì。\nlǜ jiǔ chū cháng rén yì zuì。\nyī zhěn xiǎo chuāng nóng shuì。\nzǐ wēi zhū jǐn huā cán。\nxié yáng què zhào lán gān。\nshuāng yàn yù guī shí jié， yín píng zuó yè wēi hán。",
        translation: "秋风细细地吹，梧桐叶一片一片落下来。新酿的酒刚尝就容易醉，我在小窗边美美地睡了一觉。紫花和朱槿已经凋残，斜阳照着栏杆，正是双燕要飞回南方的时候，昨夜屏风后也已透出微微的寒意。",
      }
      ],
    },
    {
      title: "清平乐 · 晏殊",
      art: 'songci-rivers:ch163',
      artPrompt: "古诗《清平乐》意境插画：红笺小字。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "红笺小字。\n说尽平生意。\n鸿雁在云鱼在水。\n惆怅此情难寄。\n斜阳独倚西楼。\n遥山恰对帘钩。\n人面不知何处，绿波依旧东流。",
        pinyin: "hóng jiān xiǎo zì。\nshuō jìn píng shēng yì。\nhóng yàn zài yún yú zài shuǐ。\nchóu chàng cǐ qíng nán jì。\nxié yáng dú yǐ xī lóu。\nyáo shān qià duì lián gōu。\nrén miàn bù zhī hé chù， lǜ bō yī jiù dōng liú。",
        translation: "我在红色小笺上写下小小的字，想把一生的情意都说尽。可是鸿雁在云里、鱼儿在水里，这满怀的惆怅却难以寄出。夕阳下我独自倚在西楼，远山正对着帘钩；想念的人不知在哪里，只有绿水依旧向东流。",
      }
      ],
    },
    {
      title: "木兰花・玉楼春 · 晏殊",
      art: 'songci-rivers:ch164',
      artPrompt: "古诗《木兰花・玉楼春》意境插画：燕鸿过后莺归去。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "燕鸿过后莺归去。\n细算浮生千万绪。\n长于春梦几多时，散似秋云无觅处。\n闻琴解佩神仙侣。\n挽断罗衣留不住。\n劝君莫作独醒人，烂醉花间应有数。",
        pinyin: "yàn hóng guò hòu yīng guī qù。\nxì suàn fú shēng qiān wàn xù。\ncháng yú chūn mèng jǐ duō shí， sàn sì qiū yún wú mì chù。\nwén qín jiě pèi shén xiān lǚ。\nwǎn duàn luó yī liú bù zhù。\nquàn jūn mò zuò dú xǐng rén， làn zuì huā jiān yīng yǒu shù。",
        translation: "燕子大雁飞走了，黄莺也归去了，细想人生总有千万种愁绪。欢乐比春梦长不了多少，散了又像秋天的云，再也无处寻觅。这样的相聚怎么挽留也留不住，不如趁着花开，尽情醉一场吧。",
      }
      ],
    },
    {
      title: "木兰花・玉楼春 · 晏殊",
      art: 'songci-rivers:ch165',
      artPrompt: "古诗《木兰花・玉楼春》意境插画：池塘水绿风微暖。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "池塘水绿风微暖。\n记得玉真初见面。\n重头歌韵响铮琮，入破舞腰红乱旋。\n玉钩阑下香阶畔。\n醉后不知斜日晚。\n当时共我赏花人，点检如今无一半。",
        pinyin: "chí táng shuǐ lǜ fēng wēi nuǎn。\njì de yù zhēn chū jiàn miàn。\nzhòng tóu gē yùn xiǎng zhēng cóng， rù pò wǔ yāo hóng luàn xuán。\nyù gōu lán xià xiāng jiē pàn。\nzuì hòu bù zhī xié rì wǎn。\ndāng shí gòng wǒ shǎng huā rén， diǎn jiǎn rú jīn wú yī bàn。",
        translation: "池塘的水绿了，微风带着暖意，记得就是在这里初次和她相见。她把歌一遍遍重唱，声音清脆响亮，舞到快处红裙飞旋。当年和我一起赏花的人，如今数一数，连一半都不到啦。",
      }
      ],
    },
    {
      title: "踏莎行 · 晏殊",
      art: 'songci-rivers:ch166',
      artPrompt: "古诗《踏莎行》意境插画：祖席离歌，长亭别宴。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "祖席离歌，长亭别宴。\n香尘已隔犹回面。\n居人匹马映林嘶，行人去棹依波转。\n画阁魂消，高楼目断。\n斜阳只送平波远。\n无穷无尽是离愁，天涯地角寻思遍。",
        pinyin: "zǔ xí lí gē， cháng tíng bié yàn。\nxiāng chén yǐ gé yóu huí miàn。\njū rén pǐ mǎ yìng lín sī， xíng rén qù zhào yī bō zhuǎn。\nhuà gé hún xiāo， gāo lóu mù duàn。\nxié yáng zhī sòng píng bō yuǎn。\nwú qióng wú jìn shì lí chóu， tiān yá dì jiǎo xún si biàn。",
        translation: "送别的酒宴上唱着离歌，车马扬起的尘土已经隔开了，她还在回头张望。远行人的船随着波浪渐渐转远，斜阳把一江春水送向天边。只有离愁没有穷尽，从天涯到地角，到处都想得见。",
      }
      ],
    },
    {
      title: "踏莎行 · 晏殊",
      art: 'songci-rivers:ch167',
      artPrompt: "古诗《踏莎行》意境插画：小径红稀，芳郊绿遍。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "小径红稀，芳郊绿遍。\n高台树色阴阴见。\n春风不解禁杨花，乱扑行人面。\n翠叶藏莺，朱帘隔燕。\n炉香静逐游丝转。\n一场愁梦酒醒时，斜阳却照深深院。",
        pinyin: "xiǎo jìng hóng xī， fāng jiāo lǜ biàn。\ngāo tái shù sè yīn yīn jiàn。\nchūn fēng bù jiě jìn yáng huā， luàn pū xíng rén miàn。\ncuì yè cáng yīng， zhū lián gé yàn。\nlú xiāng jìng zhú yóu sī zhuǎn。\nyī chǎng chóu mèng jiǔ xǐng shí， xié yáng què zhào shēn shēn yuàn。",
        translation: "小路上的花已经稀疏，郊野到处都是绿色，高台边树影浓浓。春风不懂得拦住杨花，任它乱扑到行人脸上。一场带着愁的梦醒来时，斜阳正照着深深的庭院。",
      }
      ],
    },
    {
      title: "玉楼春 · 晏殊",
      art: 'songci-rivers:ch168',
      artPrompt: "古诗《玉楼春》意境插画：绿杨芳草长亭路。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "绿杨芳草长亭路。\n年少抛人容易去。\n楼头残梦五更钟，花底离情三月雨。\n无情不似多情苦。\n一寸还成千万缕。\n天涯地角有穷时，只有相思无尽处。",
        pinyin: "lǜ yáng fāng cǎo cháng tíng lù。\nnián shào pāo rén róng yì qù。\nlóu tóu cán mèng wǔ gēng zhōng， huā dǐ lí qíng sān yuè yǔ。\nwú qíng bù sì duō qíng kǔ。\nyī cùn hái chéng qiān wàn lǚ。\ntiān yá dì jiǎo yǒu qióng shí， zhǐ yǒu xiāng sī wú jìn chù。",
        translation: "绿杨芳草掩着长亭大路，年轻的人就这样轻易地离开了。五更的钟声惊醒楼头的残梦，三月细雨在花下滴着离情。天涯地角总有个尽头，只有相思没有穷尽的时候。",
      }
      ],
    },
    {
      title: "玉楼春 · 宋祁",
      art: 'songci-rivers:ch169',
      artPrompt: "古诗《玉楼春》意境插画：东城渐觉风光好。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "东城渐觉风光好。\n皱波纹迎客棹。\n绿杨烟外晓寒轻，红杏枝头春意闹。\n浮生长恨欢娱少。\n肯爱千金轻一笑。\n为君持酒劝斜阳，且向花间留晚照。",
        pinyin: "dōng chéng jiàn jué fēng guāng hǎo。\nzhòu bō wén yíng kè zhào。\nlǜ yáng yān wài xiǎo hán qīng， hóng xìng zhī tóu chūn yì nào。\nfú shēng zhǎng hèn huān yú shǎo。\nkěn ài qiān jīn qīng yī xiào。\nwèi jūn chí jiǔ quàn xié yáng， qiě xiàng huā jiān liú wǎn zhào。",
        translation: "城东的风光渐渐好了，春水微波迎接着游人的船，绿柳如烟，红杏枝头开满了花，春意热热闹闹。人生总是欢乐太少，怎么能舍不得千金而错过一笑呢？我举起酒杯劝斜阳慢些落下，把金色的余光多留在花丛里。",
      }
      ],
    },
    {
      title: "采桑子 · 欧阳修",
      art: 'songci-rivers:ch170',
      artPrompt: "古诗《采桑子》意境插画：群芳过后西湖好，狼籍残红。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "群芳过后西湖好，狼籍残红。\n飞絮蒙蒙。\n垂柳阑干尽日风。\n笙歌散尽游人去，始觉春空。\n垂下帘栊。\n双燕归来细雨中。",
        pinyin: "qún fāng guò hòu xī hú hǎo， láng jí cán hóng。\nfēi xù méng méng。\nchuí liǔ lán gān jìn rì fēng。\nshēng gē sàn jìn yóu rén qù， shǐ jué chūn kōng。\nchuí xià lián lóng。\nshuāng yàn guī lái xì yǔ zhōng。",
        translation: "百花开过之后，西湖照样很美，地上散落着残花，柳絮飘飘蒙蒙，垂柳整天在风中摇曳。笙歌散尽，游人都回去了，才觉得春光已经空了。放下帘子，看见一双燕子在细雨中飞了回来。",
      }
      ],
    },
    {
      title: "诉衷情 · 欧阳修",
      art: 'songci-rivers:ch171',
      artPrompt: "古诗《诉衷情》意境插画：清晨帘幕卷轻霜。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "清晨帘幕卷轻霜。\n呵手试梅妆。\n都缘自有离恨，故画作远山长。\n思往事，惜流芳。\n易成伤。\n拟歌先敛，欲笑还颦，最断人肠。",
        pinyin: "qīng chén lián mù juàn qīng shuāng。\nhē shǒu shì méi zhuāng。\ndōu yuán zì yǒu lí hèn， gù huà zuò yuǎn shān cháng。\nsī wǎng shì， xī liú fāng。\nyì chéng shāng。\nnǐ gē xiān liǎn， yù xiào hái pín， zuì duàn rén cháng。",
        translation: "清晨卷起帘幕，霜气微微，她呵着冻僵的手试画梅花妆。只因心里藏着离愁，才把眉毛画成远山那样又弯又长。想唱歌先收起了声音，想笑却又皱起眉头，最让人心碎。",
      }
      ],
    },
    {
      title: "踏莎行 · 欧阳修",
      art: 'songci-rivers:ch172',
      artPrompt: "古诗《踏莎行》意境插画：候馆梅残，溪桥柳细。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "候馆梅残，溪桥柳细。\n草熏风暖摇征辔。\n离愁渐远渐无穷，迢迢不断如春水。\n寸寸柔肠，盈盈粉泪。\n楼高莫近危阑倚。\n平芜尽处是春山，行人更在春山外。",
        pinyin: "hòu guǎn méi cán， xī qiáo liǔ xì。\ncǎo xūn fēng nuǎn yáo zhēng pèi。\nlí chóu jiàn yuǎn jiàn wú qióng， tiáo tiáo bù duàn rú chūn shuǐ。\ncùn cùn róu cháng， yíng yíng fěn lèi。\nlóu gāo mò jìn wēi lán yǐ。\npíng wú jìn chù shì chūn shān， xíng rén gèng zài chūn shān wài。",
        translation: "驿馆边的梅花落了，溪桥边的柳条细细，草香风暖，我摇着马缰赶路。离愁越走越远却越积越多，像春水一样绵绵不断。平旷的草地尽头是春山，远行的人还在春山那边呢。",
      }
      ],
    },
    {
      title: "蝶恋花 · 欧阳修",
      art: 'songci-rivers:ch173',
      artPrompt: "古诗《蝶恋花》意境插画：独倚危楼风细细。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "独倚危楼风细细。\n望极离愁，黯黯生天际。\n草色山光残照里。\n无人会得凭阑意。\n也拟疏狂图一醉。\n对酒当歌，强饮还无味。\n衣带渐宽都不悔。\n况伊销得人憔悴。",
        pinyin: "dú yǐ wēi lóu fēng xì xì。\nwàng jí lí chóu， àn àn shēng tiān jì。\ncǎo sè shān guāng cán zhào lǐ。\nwú rén huì dé píng lán yì。\nyě nǐ shū kuáng tú yī zuì。\nduì jiǔ dāng gē， qiáng yǐn hái wú wèi。\nyī dài jiàn kuān dōu bù huǐ。\nkuàng yī xiāo dé rén qiáo cuì。",
        translation: "我独自倚在高楼上，微风吹拂，离愁从天边暗暗升起，草色山光都笼罩在夕阳里，没有人懂得我凭栏的心事。本想借酒醉忘掉忧愁，可对着酒勉强去喝，还是觉得没有味道。为了她，衣带渐宽人也消瘦，我却一点儿也不后悔，甘愿这样为她憔悴。",
      }
      ],
    },
    {
      title: "玉楼春 · 欧阳修",
      art: 'songci-rivers:ch174',
      artPrompt: "古诗《玉楼春》意境插画：池塘水绿春微暖。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "池塘水绿春微暖。\n记得玉真初见面。\n从头歌韵响铮鏦，入破舞腰红乱旋。\n玉钩帘下香阶畔。\n醉后不知红日晚。\n当时共我赏花人，点检如今无一半。",
        pinyin: "chí táng shuǐ lǜ chūn wēi nuǎn。\njì de yù zhēn chū jiàn miàn。\ncóng tóu gē yùn xiǎng zhēng cōng， rù pò wǔ yāo hóng luàn xuán。\nyù gōu lián xià xiāng jiē pàn。\nzuì hòu bù zhī hóng rì wǎn。\ndāng shí gòng wǒ shǎng huā rén， diǎn jiǎn rú jīn wú yī bàn。",
        translation: "池塘的水绿了，春天微微回暖，记得就是在这里初次见到她。她的歌声清脆响亮，舞到快处红裙飞旋，喝酒赏花，不知不觉太阳已经落山。当年和我一起赏花的人，如今数一数，连一半都没有了。",
      }
      ],
    },
    {
      title: "玉楼春 · 欧阳修",
      art: 'songci-rivers:ch175',
      artPrompt: "古诗《玉楼春》意境插画：燕鸿过后春归去。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "燕鸿过后春归去。\n细算浮生千万绪。\n来如春梦几多时，去似朝云无觅处。\n闻琴解神仙侣。\n挽断罗衣留不住。\n劝君莫作独醒人，烂醉花间应有数。",
        pinyin: "yàn hóng guò hòu chūn guī qù。\nxì suàn fú shēng qiān wàn xù。\nlái rú chūn mèng jǐ duō shí， qù sì cháo yún wú mì chù。\nwén qín jiě shén xiān lǚ。\nwǎn duàn luó yī liú bù zhù。\nquàn jūn mò zuò dú xǐng rén， làn zuì huā jiān yīng yǒu shù。",
        translation: "燕子大雁飞走后，春天也回去了，细想人生真有千万种愁绪。欢乐来时像春梦一样短，去时像清晨的云彩，再也无处寻觅。这美好的相聚怎么也留不住，不如在花间痛快地醉一场吧。",
      }
      ],
    },
    {
      title: "玉楼春 · 欧阳修",
      art: 'songci-rivers:ch176',
      artPrompt: "古诗《玉楼春》意境插画：别后不知君远近。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "别后不知君远近。\n触目凄凉多少闷。\n渐行渐远渐无书，水阔鱼沈何处问。\n夜深风竹敲秋韵。\n万叶千声皆是恨。\n故欹单枕梦中寻，梦又不成灯又尽。",
        pinyin: "bié hòu bù zhī jūn yuǎn jìn。\nchù mù qī liáng duō shǎo mēn。\njiàn xíng jiàn yuǎn jiàn wú shū， shuǐ kuò yú shěn hé chù wèn。\nyè shēn fēng zhú qiāo qiū yùn。\nwàn yè qiān shēng jiē shì hèn。\ngù qī dān zhěn mèng zhōng xún， mèng yòu bù chéng dēng yòu jìn。",
        translation: "分别以后不知道你去了哪里，满眼凄凉，多少烦闷压在心头；你越走越远，连书信也断了，叫人到哪儿去打听呢？深夜里风吹竹叶，敲出阵阵秋声，万叶千声都像在诉说怨恨。我斜靠孤枕想到梦里寻你，梦却没做成，灯又燃尽了。",
      }
      ],
    },
    {
      title: "浪淘沙 · 欧阳修",
      art: 'songci-rivers:ch177',
      artPrompt: "古诗《浪淘沙》意境插画：把酒祝东风。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "把酒祝东风。\n且共从容。\n垂杨紫陌洛城东。\n总是当时携手处，游遍芳丛。\n聚散苦匆匆。\n此恨无穷。\n今年花胜去年红。\n可惜明年花更好，知与谁同。",
        pinyin: "bǎ jiǔ zhù dōng fēng。\nqiě gòng cóng róng。\nchuí yáng zǐ mò luò chéng dōng。\nzǒng shì dāng shí xié shǒu chù， yóu biàn fāng cóng。\njù sàn kǔ cōng cōng。\ncǐ hèn wú qióng。\njīn nián huā shèng qù nián hóng。\nkě xī míng nián huā gèng hǎo， zhī yǔ shuí tóng。",
        translation: "我举起酒杯祝告东风：请你慢些吹，让我们从容地再聚一会儿。洛阳城东杨柳夹道的小路上，处处是当年携手同游、赏遍花丛的地方。今年的花开得比去年更红，可惜明年花开得更好时，又不知能和谁同赏呢。",
      }
      ],
    },
    {
      title: "风入松 · 俞国宝",
      art: 'songci-rivers:ch178',
      artPrompt: "古诗《风入松》意境插画：一春长费买花钱。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "一春长费买花钱。\n日日醉花边。\n玉骢惯识西湖路，骄嘶过、沽酒垆前。\n红杏香中箫鼓，绿杨影里秋千。\n暖风十里丽人天。\n花压髻云偏。\n画船载取春归去，馀情寄、湖水湖烟。\n明日重扶残醉，来寻陌上花钿。",
        pinyin: "yī chūn cháng fèi mǎi huā qián。\nrì rì zuì huā biān。\nyù cōng guàn shí xī hú lù， jiāo sī guò、 gū jiǔ lú qián。\nhóng xìng xiāng zhōng xiāo gǔ， lǜ yáng yǐng lǐ qiū qiān。\nnuǎn fēng shí lǐ lì rén tiān。\nhuā yā jì yún piān。\nhuà chuán zǎi qǔ chūn guī qù， yú qíng jì、 hú shuǐ hú yān。\nmíng rì zhòng fú cán zuì， lái xún mò shàng huā diàn。",
        translation: "一整个春天，我的钱都花在买花赏花上，天天醉倒在花边，连马儿都认得西湖路，撒着欢儿跑过酒垆前。红杏香里传来箫鼓声，绿柳影下荡着秋千，暖风吹了十里，正是美人游春的好天气。画船把满湖春色载走了，余情都寄托在湖水湖烟里，明天带着余醉再来，寻访路上的春光。",
      }
      ],
    },
    {
      title: "绮罗香 · 史达祖",
      art: 'songci-rivers:ch179',
      artPrompt: "古诗《绮罗香》意境插画：做冷欺花，将烟困柳，千里偷催春暮。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "做冷欺花，将烟困柳，千里偷催春暮。\n尽日冥迷，愁里欲飞还住。\n惊粉重、蝶宿西园，喜泥润、燕归南浦。\n最妨它、佳约风流，钿车不到杜陵路。\n沈沈江上望极，还被春潮晚急，难寻官渡。\n隐约遥峰，和泪谢娘眉妩。\n临断岸、新绿生时，是落红、带愁流处。\n记当日、门掩梨花，翦灯深夜语。",
        pinyin: "zuò lěng qī huā， jiāng yān kùn liǔ， qiān lǐ tōu cuī chūn mù。\njìn rì míng mí， chóu lǐ yù fēi hái zhù。\njīng fěn zhòng、 dié sù xī yuán， xǐ ní rùn、 yàn guī nán pǔ。\nzuì fáng tā、 jiā yuē fēng liú， diàn chē bù dào dù líng lù。\nshěn shěn jiāng shàng wàng jí， hái bèi chūn cháo wǎn jí， nán xún guān dù。\nyǐn yuē yáo fēng， hé lèi xiè niáng méi wǔ。\nlín duàn àn、 xīn lǜ shēng shí， shì luò hóng、 dài chóu liú chù。\njì dāng rì、 mén yǎn lí huā， jiǎn dēng shēn yè yǔ。",
        translation: "春雨带着寒气欺负花儿，像烟一样困住杨柳，偷偷把春天催向迟暮；蝴蝶嫌翅膀被雨打湿变重，留在西园歇宿，燕子却喜欢春泥润湿，飞回南边水滨。远山隐隐约约，像美人含泪的眉，落花正带着愁绪随水漂去。还记得那天掩着门看梨花，深夜里剪亮灯花轻轻说话的情景。",
      }
      ],
    },
    {
      title: "双双燕 · 史达祖",
      art: 'songci-rivers:ch180',
      artPrompt: "古诗《双双燕》意境插画：过春社了，度帘幕中间，去年尘冷。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "过春社了，度帘幕中间，去年尘冷。\n差池欲住，试入旧巢相并。\n还相雕梁藻井。\n又软语、商量不定。\n飘然快拂花梢，翠尾分开红影。\n芳径。\n芹泥雨润。\n爱贴地争飞，竞夸轻俊。\n红楼归晚，看足柳昏花暝。\n应自栖香正稳。\n便忘了、天涯芳信。\n愁损翠黛双蛾，日日画阑独凭。",
        pinyin: "guò chūn shè le， dù lián mù zhōng jiān， qù nián chén lěng。\nchā chí yù zhù， shì rù jiù cháo xiāng bìng。\nhái xiāng diāo liáng zǎo jǐng。\nyòu ruǎn yǔ、 shāng liáng bù dìng。\npiāo rán kuài fú huā shāo， cuì wěi fēn kāi hóng yǐng。\nfāng jìng。\nqín ní yǔ rùn。\nài tiē dì zhēng fēi， jìng kuā qīng jùn。\nhóng lóu guī wǎn， kàn zú liǔ hūn huā míng。\nyìng zì qī xiāng zhèng wěn。\nbiàn wàng le、 tiān yá fāng xìn。\nchóu sǔn cuì dài shuāng é， rì rì huà lán dú píng。",
        translation: "春社过后，燕子穿过帘幕飞了回来，试着并排住进落了尘土的旧巢，又打量雕梁画栋，软语商量个不停。它们贴着地面轻快地飞舞，翠尾分开花影，玩够了才飞回红楼，安安稳稳地睡在香巢里，竟忘了捎回远方的书信。愁坏了楼上那位美人，她天天独自倚着画栏眺望。",
      }
      ],
    },
    {
      title: "东风第一枝 · 史达祖",
      art: 'songci-rivers:ch181',
      artPrompt: "古诗《东风第一枝》意境插画：巧沁兰心，偷黏草甲，东风欲障新暖。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "巧沁兰心，偷黏草甲，东风欲障新暖。\n谩凝碧瓦难留，信知暮寒轻浅。\n行天入镜，做弄出、轻松纤软。\n料故园、不卷重帘，误了乍来双燕。\n青未了、柳回白眼。\n红欲断、杏开素面。\n旧游忆著山阴，厚盟遂妨上苑。\n寒炉重暖，便放慢春衫针线。\n恐凤靴、挑菜归来，万一灞桥相见。",
        pinyin: "qiǎo qìn lán xīn， tōu nián cǎo jiǎ， dōng fēng yù zhàng xīn nuǎn。\nmàn níng bì wǎ nán liú， xìn zhī mù hán qīng qiǎn。\nxíng tiān rù jìng， zuò nòng chū、 qīng sōng xiān ruǎn。\nliào gù yuán、 bù juàn zhòng lián， wù le zhà lái shuāng yàn。\nqīng wèi liǎo、 liǔ huí bái yǎn。\nhóng yù duàn、 xìng kāi sù miàn。\njiù yóu yì zhù shān yīn， hòu méng suì fáng shàng yuàn。\nhán lú zhòng nuǎn， biàn fàng màn chūn shān zhēn xiàn。\nkǒng fèng xuē、 tiāo cài guī lái， wàn yī bà qiáo xiāng jiàn。",
        translation: "雪巧妙地沁进兰花的花心，偷偷粘在草芽上，想挡住东风送来的暖意；雪在碧瓦上难以久留，可见傍晚的寒意并不重。柳枝还没有绿透就白了头，杏花将开却盖上一层素白的脸。家里人重新生起炉火，放慢了缝制春衫的针线，怕人从挑菜节回来时，万一在灞桥遇上风雪。",
      }
      ],
    },
    {
      title: "喜迁莺 · 史达祖",
      art: 'songci-rivers:ch182',
      artPrompt: "古诗《喜迁莺》意境插画：月波疑滴。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "月波疑滴。\n望玉壶天近，了无尘隔。\n翠眼圈花，冰丝织练，黄道宝光相直。\n自怜诗酒瘦，难应接、许多春色。\n最无赖，是随香趁烛，曾伴狂客。\n踪迹。\n谩记忆。\n老了杜郎，忍听东风笛。\n柳院灯疏，梅厅雪在，谁与细倾春碧。\n旧情拘未定，犹自学、当年游历。\n怕万一，误玉人、夜寒帘隙。",
        pinyin: "yuè bō yí dī。\nwàng yù hú tiān jìn， liǎo wú chén gé。\ncuì yǎn quān huā， bīng sī zhī liàn， huáng dào bǎo guāng xiāng zhí。\nzì lián shī jiǔ shòu， nán yìng jiē、 xǔ duō chūn sè。\nzuì wú lài， shì suí xiāng chèn zhú， céng bàn kuáng kè。\nzōng jì。\nmàn jì yì。\nlǎo le dù láng， rěn tīng dōng fēng dí。\nliǔ yuàn dēng shū， méi tīng xuě zài， shuí yǔ xì qīng chūn bì。\njiù qíng jū wèi dìng， yóu zì xué、 dāng nián yóu lì。\npà wàn yī， wù yù rén、 yè hán lián xì。",
        translation: "月光洒在水面上，好像快要滴下来，天空干净得像玉壶，没有一点灰尘阻隔。我因吟诗饮酒而消瘦，难以应付这满眼春色，想起从前提香举烛陪伴朋友游玩的日子，如今人已老去，旧情难舍，还学着当年四处游历，只怕耽误了心上人在寒夜里隔着帘缝的等候。",
      }
      ],
    },
    {
      title: "三姝媚 · 史达祖",
      art: 'songci-rivers:ch183',
      artPrompt: "古诗《三姝媚》意境插画：烟光摇缥瓦。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "烟光摇缥瓦。\n望晴檐多风，柳花如洒。\n锦瑟横床，想泪痕尘影，凤弦常下。\n倦出犀帷，频梦见、王孙骄马。\n讳道相思，偷理绡裙，自惊腰衩。\n惆怅南楼遥夜。\n记翠箔张灯，枕肩歌罢。\n又入铜驼，遍旧家门巷，首询声价。\n可惜东风，将恨与、闲花俱谢。\n记取崔徽模样，归来暗写。",
        pinyin: "yān guāng yáo piǎo wǎ。\nwàng qíng yán duō fēng， liǔ huā rú sǎ。\njǐn sè héng chuáng， xiǎng lèi hén chén yǐng， fèng xián cháng xià。\njuàn chū xī wéi， pín mèng jiàn、 wáng sūn jiāo mǎ。\nhuì dào xiāng sī， tōu lǐ xiāo qún， zì jīng yāo chà。\nchóu chàng nán lóu yáo yè。\njì cuì bó zhāng dēng， zhěn jiān gē bà。\nyòu rù tóng tuó， biàn jiù jiā mén xiàng， shǒu xún shēng jià。\nkě xī dōng fēng， jiāng hèn yǔ、 xián huā jù xiè。\njì qǔ cuī huī mú yàng， guī lái àn xiě。",
        translation: "阳光在青瓦上轻轻晃动，晴日檐前风起，柳絮像雨点一样洒落。床上的锦瑟蒙着尘土和泪痕，她常常垂着弦流泪，梦里见远行的人，醒来偷偷整理裙子，吃惊自己瘦了。想起当年南楼点灯、枕肩唱歌的日子，如今重回旧巷人已不在，东风把恨和闲花一起吹谢，只能暗暗记住那人的模样。",
      }
      ],
    },
    {
      title: "夜合花 · 史达祖",
      art: 'songci-rivers:ch184',
      artPrompt: "古诗《夜合花》意境插画：柳锁莺魂，花翻蝶梦，自知愁染潘郎。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "柳锁莺魂，花翻蝶梦，自知愁染潘郎。\n轻衫未揽，犹将泪点偷藏。\n念前事，怯流光。\n早春窥、酥雨池塘。\n向销凝里，梅开半面，情满徐妆。\n风丝一寸柔肠。\n曾在歌边惹恨，烛底萦香。\n芳机瑞锦，如何未织鸳鸯。\n人扶醉，月依墙。\n是当初、谁敢疏狂。\n把闲言语，花房夜久，各自思量。",
        pinyin: "liǔ suǒ yīng hún， huā fān dié mèng， zì zhī chóu rǎn pān láng。\nqīng shān wèi lǎn， yóu jiāng lèi diǎn tōu cáng。\nniàn qián shì， qiè liú guāng。\nzǎo chūn kuī、 sū yǔ chí táng。\nxiàng xiāo níng lǐ， méi kāi bàn miàn， qíng mǎn xú zhuāng。\nfēng sī yī cùn róu cháng。\ncéng zài gē biān rě hèn， zhú dǐ yíng xiāng。\nfāng jī ruì jǐn， rú hé wèi zhī yuān yāng。\nrén fú zuì， yuè yī qiáng。\nshì dāng chū、 shuí gǎn shū kuáng。\nbǎ xián yán yǔ， huā fáng yè jiǔ， gè zì sī liang。",
        translation: "柳丝缠住黄莺，花间蝴蝶翻飞，我自知忧愁已染白了鬓发，只好偷偷藏起泪珠。想起旧日歌边烛下的情意，芳香织机上的鸳鸯还没有织成，如今醉倚着墙边明月，深夜花房里，两个人各自思量。",
      }
      ],
    },
    {
      title: "八归 · 史达祖",
      art: 'songci-rivers:ch185',
      artPrompt: "古诗《八归》意境插画：秋江带雨，寒沙萦水，人瞰画阁愁独。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "秋江带雨，寒沙萦水，人瞰画阁愁独。\n烟蓑散响惊诗思，还被乱鸥飞去，秀句难续。\n冷眼尽归图画上，认隔岸、微茫云屋。\n想半属、渔市樵村，欲暮竞然竹。\n须信风流未老，凭持酒、慰此凄凉心目。\n一鞭南陌，几篙官渡，赖有歌眉舒绿。\n只匆匆眺远，早觉闲愁挂乔木。\n应难奈，故人天际，望彻淮山，相思无雁足。",
        pinyin: "qiū jiāng dài yǔ， hán shā yíng shuǐ， rén kàn huà gé chóu dú。\nyān suō sàn xiǎng jīng shī sī， hái bèi luàn ōu fēi qù， xiù jù nán xù。\nlěng yǎn jìn guī tú huà shàng， rèn gé àn、 wēi máng yún wū。\nxiǎng bàn shǔ、 yú shì qiáo cūn， yù mù jìng rán zhú。\nxū xìn fēng liú wèi lǎo， píng chí jiǔ、 wèi cǐ qī liáng xīn mù。\nyī biān nán mò， jǐ gāo guān dù， lài yǒu gē méi shū lǜ。\nzhī cōng cōng tiào yuǎn， zǎo jué xián chóu guà qiáo mù。\nyìng nán nài， gù rén tiān jì， wàng chè huái shān， xiāng sī wú yàn zú。",
        translation: "秋天的江面飘着雨，寒沙围着流水，我独自在画阁上发愁，望见对岸渔村樵舍，天黑时家家点起灯火。只好相信兴致还未老去，借一杯酒安慰凄凉的心，可是老朋友远在天边，望遍了淮山，相思却连大雁也无法传递。",
      }
      ],
    },
    {
      title: "玉胡蝶・玉蝴蝶 · 史达祖",
      art: 'songci-rivers:ch186',
      artPrompt: "古诗《玉胡蝶・玉蝴蝶》意境插画：晚雨未摧宫树，可怜闲叶，犹抱凉蝉。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "晚雨未摧宫树，可怜闲叶，犹抱凉蝉。\n短景归秋，吟思又接愁边。\n漏初长、梦魂难禁，人渐老、风月俱寒。\n想幽欢。\n土花庭，虫网阑干。\n无端。\n啼蛄搅夜，恨随团扇，苦近秋莲。\n一笛当楼，谢娘悬泪立风前。\n故园晚、强留诗酒，新雁远、不致寒暄。\n隔苍烟。\n楚香罗袖，谁伴婵娟。",
        pinyin: "wǎn yǔ wèi cuī gōng shù， kě lián xián yè， yóu bào liáng chán。\nduǎn jǐng guī qiū， yín sī yòu jiē chóu biān。\nlòu chū cháng、 mèng hún nán jìn， rén jiàn lǎo、 fēng yuè jù hán。\nxiǎng yōu huān。\ntǔ huā tíng， chóng wǎng lán gān。\nwú duān。\ntí gū jiǎo yè， hèn suí tuán shàn， kǔ jìn qiū lián。\nyī dí dāng lóu， xiè niáng xuán lèi lì fēng qián。\ngù yuán wǎn、 qiáng liú shī jiǔ， xīn yàn yuǎn、 bù zhì hán xuān。\ngé cāng yān。\nchǔ xiāng luó xiù， shuí bàn chán juān。",
        translation: "晚来的雨没有打落宫树，可怜的叶子还抱着凉蝉，白天变短了，人渐渐老去，风月都带着寒意。深夜里虫鸣搅得人难眠，楼头笛声响起，有人含泪立在风前，故乡已远，新雁飞过也无法捎来问候，隔着苍茫烟水，谁来陪伴那位月下的佳人呢。",
      }
      ],
    },
    {
      title: "秋霁 · 史达祖",
      art: 'songci-rivers:ch187',
      artPrompt: "古诗《秋霁》意境插画：江水苍苍，望倦柳愁荷，共感秋色。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "江水苍苍，望倦柳愁荷，共感秋色。\n废阁先凉，古帘空暮，雁程最嫌风力。\n故园信息。\n爱渠入眼南山碧。\n念上国。\n谁是、脍鲈江汉未归客。\n还又岁晚，瘦骨临风，夜闻秋声，吹动岑寂。\n露蛩悲、清灯冷屋，翻书愁上鬓毛白。\n年少俊游浑断得。\n但可怜处，无奈苒苒魂惊，采香南浦，翦梅烟驿。",
        pinyin: "jiāng shuǐ cāng cāng， wàng juàn liǔ chóu hé， gòng gǎn qiū sè。\nfèi gé xiān liáng， gǔ lián kōng mù， yàn chéng zuì xián fēng lì。\ngù yuán xìn xī。\nài qú rù yǎn nán shān bì。\nniàn shàng guó。\nshuí shì、 kuài lú jiāng hàn wèi guī kè。\nhái yòu suì wǎn， shòu gǔ lín fēng， yè wén qiū shēng， chuī dòng cén jì。\nlù qióng bēi、 qīng dēng lěng wū， fān shū chóu shàng bìn máo bái。\nnián shào jùn yóu hún duàn dé。\ndàn kě lián chù， wú nài rǎn rǎn hún jīng， cǎi xiāng nán pǔ， jiǎn méi yān yì。",
        translation: "江水一片苍茫，柳树和残荷都带着倦意，一起染上了秋色，我住在先凉下来的破阁里，盼着故园的消息，最爱那映入眼里的南山青色。夜里瘦骨迎风，听秋声吹动寂静，清灯冷屋下翻书，愁得两鬓都白了，少年时一同游玩的好朋友早已断了音信。",
      }
      ],
    },
    {
      title: "宴清都 · 卢祖皋",
      art: 'songci-rivers:ch188',
      artPrompt: "古诗《宴清都》意境插画：春讯飞琼管。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "春讯飞琼管。\n风日薄、度墙啼鸟声乱。\n江城次第，笙歌翠合，绮罗香暖。\n溶溶涧渌冰泮。\n醉梦里、年华暗换。\n料黛眉重锁隋堤，芳心还动梁苑。\n新来雁阔云音，鸾分槛影，无计重见。\n啼春细雨，笼愁澹月，恁时庭院。\n离肠未语先断。\n算犹有、凭高望眼。\n更那堪、芳草连天，飞梅弄晚。",
        pinyin: "chūn xùn fēi qióng guǎn。\nfēng rì báo、 dù qiáng tí niǎo shēng luàn。\njiāng chéng cì dì， shēng gē cuì hé， qǐ luó xiāng nuǎn。\nróng róng jiàn lù bīng pàn。\nzuì mèng lǐ、 nián huá àn huàn。\nliào dài méi zhòng suǒ suí dī， fāng xīn hái dòng liáng yuàn。\nxīn lái yàn kuò yún yīn， luán fēn kǎn yǐng， wú jì zhòng jiàn。\ntí chūn xì yǔ， lóng chóu dàn yuè， nèn shí tíng yuàn。\nlí cháng wèi yǔ xiān duàn。\nsuàn yóu yǒu、 píng gāo wàng yǎn。\ngèng nà kān、 fāng cǎo lián tiān， fēi méi nòng wǎn。",
        translation: "春的消息从玉管里飞出来，鸟声嘈杂地飞过墙头，江城里渐渐笙歌四起、罗绮飘香，涧水也解冻了，醉梦里年华已暗暗换去。可如今鸿雁稀少、音信断绝，无法重见，只有细雨啼春、淡月笼愁，离愁未说先断肠，好在还能登高望远，只是那连天的芳草、晚风里的飞梅，更叫人难受。",
      }
      ],
    },
    {
      title: "江城子 · 卢祖皋",
      art: 'songci-rivers:ch189',
      artPrompt: "古诗《江城子》意境插画：画楼帘幕卷新晴。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "画楼帘幕卷新晴。\n掩银屏。\n晓寒轻。\n坠粉飘香，日日唤愁生。\n暗数十年湖上路，能几度，著娉婷。\n年华空自感飘零。\n拥春酲。\n对谁醒。\n天阔云闲，无处觅箫声。\n载酒买花年少事，浑不似，旧心情。",
        pinyin: "huà lóu lián mù juàn xīn qíng。\nyǎn yín píng。\nxiǎo hán qīng。\nzhuì fěn piāo xiāng， rì rì huàn chóu shēng。\nàn shù shí nián hú shàng lù， néng jǐ dù， zhù pīng tíng。\nnián huá kōng zì gǎn piāo líng。\nyōng chūn chéng。\nduì shuí xǐng。\ntiān kuò yún xián， wú chù mì xiāo shēng。\nzǎi jiǔ mǎi huā nián shào shì， hún bù sì， jiù xīn qíng。",
        translation: "画楼的帘幕卷起，迎来晴朗的天气，早晨寒意轻轻，可飘落的花瓣、散去的香气，天天都唤起愁绪。暗暗数着十年湖上走过的路，能有几次美人相伴呢，如今载酒买花的年少乐事，全都再没有旧时的心情了。",
      }
      ],
    },
    {
      title: "小重山 · 章良能",
      art: 'songci-rivers:ch190',
      artPrompt: "古诗《小重山》意境插画：柳暗花明春事深。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "柳暗花明春事深。\n小阑红芍药，已抽簪。\n雨馀风软碎鸣禽。\n迟迟日，犹带一分阴。\n往事莫沉吟。\n身闲时序好，且登临。\n旧游无处不堪寻。\n无寻处，惟有少年心。",
        pinyin: "liǔ àn huā míng chūn shì shēn。\nxiǎo lán hóng sháo yào， yǐ chōu zān。\nyǔ yú fēng ruǎn suì míng qín。\nchí chí rì， yóu dài yī fēn yīn。\nwǎng shì mò chén yín。\nshēn xián shí xù hǎo， qiě dēng lín。\njiù yóu wú chù bù kān xún。\nwú xún chù， wéi yǒu shào nián xīn。",
        translation: "柳色浓、花色明，春光已经很深，小栏杆边的红芍药抽出了簪子似的花苞，雨后风软，鸟鸣细细碎碎，春日迟迟还带一点阴。往事不必再沉吟，趁着身闲时节正好，暂且登高游赏，旧日游玩的地方处处都能寻到，只有那颗少年心再也寻不回了。",
      }
      ],
    },
    {
      title: "满庭芳 · 张",
      art: 'songci-rivers:ch191',
      artPrompt: "古诗《满庭芳》意境插画：月洗高梧，露幽草，宝钗楼外秋深。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "月洗高梧，露幽草，宝钗楼外秋深。\n土花沿翠，萤火坠墙阴。\n静听寒声断续，微韵转、凄咽悲沈。\n争求侣，殷勤劝织，促破晓机心。\n儿时，曾记得，呼灯灌穴，敛步随音。\n任满身花影，犹自追寻。\n携向花堂戏斗，亭台小、笼巧妆金。\n今休说，从渠床下，凉夜伴孤吟。",
        pinyin: "yuè xǐ gāo wú， lù yōu cǎo， bǎo chāi lóu wài qiū shēn。\ntǔ huā yán cuì， yíng huǒ zhuì qiáng yīn。\njìng tīng hán shēng duàn xù， wēi yùn zhuǎn、 qī yàn bēi shěn。\nzhēng qiú lǚ， yīn qín quàn zhī， cù pò xiǎo jī xīn。\nér shí， céng jì de， hū dēng guàn xué， liǎn bù suí yīn。\nrèn mǎn shēn huā yǐng， yóu zì zhuī xún。\nxié xiàng huā táng xì dòu， tíng tái xiǎo、 lóng qiǎo zhuāng jīn。\njīn xiū shuō， cóng qú chuáng xià， liáng yè bàn gū yín。",
        translation: "月光洗过高高的梧桐，露水打湿幽草，楼外秋意已深，静静听着蟋蟀断断续续的叫声，越转越凄凉悲伤，它们争着求伴，声声催人织布直到天亮。记得儿时呼伴提灯、灌水进洞捉蟋蟀，放轻脚步跟着声音找，满身花影也要追，带回去放进小小的金笼里斗着玩，如今不必说了，蟋蟀只在床下，在凉夜里伴我独自吟诗。",
      }
      ],
    },
    {
      title: "花犯 · 吴文英",
      art: 'songci-rivers:ch192',
      artPrompt: "古诗《花犯》意境插画：小娉婷，清铅素靥，蜂黄暗偷晕。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "小娉婷，清铅素靥，蜂黄暗偷晕。\n翠翘敧鬓。\n昨夜冷中庭，月下相认。\n睡浓更苦凄风紧。\n惊回心未稳。\n送晓色、一壶葱茜，才知花梦准。\n湘娥化作此幽芳，凌波路，古岸云沙遗恨。\n临砌影，寒香乱、冻梅藏韵。\n熏炉畔、旋移傍枕，还又见、玉人垂绀鬒。\n料唤赏、清华池馆，台杯须满引。",
        pinyin: "xiǎo pīng tíng， qīng qiān sù yè， fēng huáng àn tōu yūn。\ncuì qiào qī bìn。\nzuó yè lěng zhōng tíng， yuè xià xiāng rèn。\nshuì nóng gèng kǔ qī fēng jǐn。\njīng huí xīn wèi wěn。\nsòng xiǎo sè、 yī hú cōng qiàn， cái zhī huā mèng zhǔn。\nxiāng é huà zuò cǐ yōu fāng， líng bō lù， gǔ àn yún shā yí hèn。\nlín qì yǐng， hán xiāng luàn、 dòng méi cáng yùn。\nxūn lú pàn、 xuán yí bàng zhěn， hái yòu jiàn、 yù rén chuí gàn zhěn。\nliào huàn shǎng、 qīng huá chí guǎn， tái bēi xū mǎn yǐn。",
        translation: "清秀小小的水仙，素净的脸淡淡妆，鹅黄的花心暗暗晕染，昨夜月光下的冷庭院里梦里相认，凄紧的风把人惊醒，心里还不安稳。清晨一壶青翠的花送到眼前，才知道梦是准的，那幽香像凌波而过的仙子，把花移到枕边再看，又像见玉人垂着长长的黑发。",
      }
      ],
    },
    {
      title: "浣溪沙 · 吴文英",
      art: 'songci-rivers:ch193',
      artPrompt: "古诗《浣溪沙》意境插画：门隔花深梦旧游。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "门隔花深梦旧游。\n夕阳无语燕归愁。\n玉纤香动小帘钩。\n落絮无声春堕泪，行云有影月含羞。\n东风临夜冷于秋。",
        pinyin: "mén gé huā shēn mèng jiù yóu。\nxī yáng wú yǔ yàn guī chóu。\nyù xiān xiāng dòng xiǎo lián gōu。\nluò xù wú shēng chūn duò lèi， xíng yún yǒu yǐng yuè hán xiū。\ndōng fēng lín yè lěng yú qiū。",
        translation: "深深的花丛隔住了门，我在梦里回到旧日游玩的地方，夕阳默默无语，燕子归来也带着愁，她纤纤玉手的香气拂动了小小的帘钩。柳絮无声飘落，像春天在落泪，行云带着影子，像月亮含着羞，夜里的东风，比秋天还冷。",
      }
      ],
    },
    {
      title: "浣溪沙 · 吴文英",
      art: 'songci-rivers:ch194',
      artPrompt: "古诗《浣溪沙》意境插画：波面铜花冷不收。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "波面铜花冷不收。\n玉人垂钓理纤钩。\n月明池阁夜来秋。\n江燕话归成晓别，水花红减似春休。\n西风梧井叶先愁。",
        pinyin: "bō miàn tóng huā lěng bù shōu。\nyù rén chuí diào lǐ xiān gōu。\nyuè míng chí gé yè lái qiū。\njiāng yàn huà guī chéng xiǎo bié， shuǐ huā hóng jiǎn sì chūn xiū。\nxī fēng wú jǐng yè xiān chóu。",
        translation: "池水平得像面铜镜，冷冷地映着月色，美人在月光下垂钓，理着细细的鱼钩，池阁的夜晚已经有了凉意。江上燕子刚说着要归来，清晨却成了分别，水上的红花颜色减退，像春天快要完了，西风吹过梧桐井，叶子先自发愁了。",
      }
      ],
    },
    {
      title: "点绛唇 · 吴文英",
      art: 'songci-rivers:ch195',
      artPrompt: "古诗《点绛唇》意境插画：卷尽愁云，素娥临夜新梳洗。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "卷尽愁云，素娥临夜新梳洗。\n暗尘不起。\n酥润凌波地。\n辇路重来，仿佛灯前事。\n情如水。\n小楼熏被。\n春梦笙歌里。",
        pinyin: "juàn jìn chóu yún， sù é lín yè xīn shū xǐ。\nàn chén bù qǐ。\nsū rùn líng bō dì。\nniǎn lù chóng lái， fǎng fú dēng qián shì。\nqíng rú shuǐ。\nxiǎo lóu xūn bèi。\nchūn mèng shēng gē lǐ。",
        translation: "愁云都卷走了，月亮像刚梳洗过一样，趁夜升上天空，雨后的地面润泽，连尘土也不飞扬。旧日帝王的车路上重游，往事仿佛就在灯前，这情怀平静如水，小楼里熏着被子，春梦就融在一片笙歌里。",
      }
      ],
    },
    {
      title: "祝英台近 · 吴文英",
      art: 'songci-rivers:ch196',
      artPrompt: "古诗《祝英台近》意境插画：采幽香，巡古苑，竹冷翠微路。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "采幽香，巡古苑，竹冷翠微路。\n斗草溪根，沙印小莲步。\n自怜两鬓清霜，一年寒食，又身在、云山深处。\n昼闲度。\n因甚天也悭春，轻阴便成雨。\n绿暗长亭，归梦趁风絮。\n有情花影阑干，莺声门径，解留我、霎时凝伫。",
        pinyin: "cǎi yōu xiāng， xún gǔ yuàn， zhú lěng cuì wēi lù。\ndòu cǎo xī gēn， shā yìn xiǎo lián bù。\nzì lián liǎng bìn qīng shuāng， yī nián hán shí， yòu shēn zài、 yún shān shēn chù。\nzhòu xián dù。\nyīn shèn tiān yě qiān chūn， qīng yīn biàn chéng yǔ。\nlǜ àn cháng tíng， guī mèng chèn fēng xù。\nyǒu qíng huā yǐng lán gān， yīng shēng mén jìng， jiě liú wǒ、 shà shí níng zhù。",
        translation: "采一枝幽香的花，走遍古老的园苑，竹林的翠路上冷冷清清，溪边斗草的地方，沙上还印着小小的脚印。自怜两鬓已生白发，又是一年寒食，人还在云山深处，白天闲闲度过，天也吝惜春光，天一阴就下雨，只有栏杆边的花影、门径上的莺声，懂得留我站一会儿。",
      }
      ],
    },
    {
      title: "祝英台近 · 吴文英",
      art: 'songci-rivers:ch197',
      artPrompt: "古诗《祝英台近》意境插画：翦红情，裁绿意，花信上钗股。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "翦红情，裁绿意，花信上钗股。\n残日东风，不放岁华去。\n有人添烛西窗，不眠侵晓，笑声转、新年莺语。\n旧尊俎。\n玉纤曾擘黄柑，柔香系幽素。\n归梦湖边，还迷镜中路。\n可怜千点吴霜，寒销不尽，又相对、落梅如雨。",
        pinyin: "jiǎn hóng qíng， cái lǜ yì， huā xìn shàng chāi gǔ。\ncán rì dōng fēng， bù fàng suì huá qù。\nyǒu rén tiān zhú xī chuāng， bù mián qīn xiǎo， xiào shēng zhuǎn、 xīn nián yīng yǔ。\njiù zūn zǔ。\nyù xiān céng bò huáng gān， róu xiāng xì yōu sù。\nguī mèng hú biān， hái mí jìng zhōng lù。\nkě lián qiān diǎn wú shuāng， hán xiāo bù jìn， yòu xiāng duì、 luò méi rú yǔ。",
        translation: "剪下红花、配上绿叶，把报春的花枝插上金钗，残日里东风吹着，好像舍不得旧年过去。除夕夜里有人在西窗添烛守岁，一直笑闹到天亮，笑声像新年的莺啼，可我鬓边已有千点白霜，寒意消不尽，又对着落梅像下雨一样飘落。",
      }
      ],
    },
    {
      title: "澡兰香 · 吴文英",
      art: 'songci-rivers:ch198',
      artPrompt: "古诗《澡兰香》意境插画：盘丝系腕，巧篆垂簪，玉隐绀纱睡觉。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "盘丝系腕，巧篆垂簪，玉隐绀纱睡觉。\n银瓶露井，彩云窗，往事少年依约。\n为当时、曾写榴裙，伤心红绡褪萼。\n黍梦光阴渐老，汀洲烟箬。\n莫唱江南古调，怨抑难招，楚江沈魄。\n薰风燕乳，暗雨梅黄，午镜澡兰帘幕。\n念秦楼、也拟人归，应翦菖浦自酌。\n但怅望、一屡新蟾，随人天角。",
        pinyin: "pán sī xì wàn， qiǎo zhuàn chuí zān， yù yǐn gàn shā shuì jiào。\nyín píng lù jǐng， cǎi yún chuāng， wǎng shì shào nián yī yuē。\nwèi dāng shí、 céng xiě liú qún， shāng xīn hóng xiāo tuì è。\nshǔ mèng guāng yīn jiàn lǎo， tīng zhōu yān ruò。\nmò chàng jiāng nán gǔ tiáo， yuàn yì nán zhāo， chǔ jiāng shěn pò。\nxūn fēng yàn rǔ， àn yǔ méi huáng， wǔ jìng zǎo lán lián mù。\nniàn qín lóu、 yě nǐ rén guī， yìng jiǎn chāng pǔ zì zhuó。\ndàn chàng wàng、 yī lǚ xīn chán， suí rén tiān jiǎo。",
        translation: "五彩丝系上手腕，巧巧的符篆垂在簪头，玉人在深色纱帐里睡醒，庭院井边、彩窗之前，少年往事依稀在目，为当年写在石榴裙上的诗句，如今红裙褪色让人伤心。不要唱江南的古调了，哀怨难把远去的魂魄招回，暖风里燕子育雏，梅雨昏沉，午间用兰汤沐浴，想她也剪着菖蒲独自饮酒盼我归去，只剩一弯新月，随人来到天边。",
      }
      ],
    },
    {
      title: "燕山亭 · 赵佶",
      art: 'songci-rivers:ch199',
      artPrompt: "古诗《燕山亭》意境插画：裁翦冰绡，打叠数重，冷淡燕脂匀注。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "裁翦冰绡，打叠数重，冷淡燕脂匀注。\n新样靓妆，艳溢香融，羞杀蕊珠宫女。\n易得凋零，更多少、无情风雨。\n愁苦。\n闲院落凄凉，几番春暮。\n凭寄离恨重重，这双燕，何曾会人言语。\n天遥地远，万水千山，知他故宫何处。\n怎不思量，除梦里、有时会去。\n无据。\n和梦也、有时不做。",
        pinyin: "cái jiǎn bīng xiāo， dǎ dié shù zhòng， lěng dàn yàn zhī yún zhù。\nxīn yàng liàng zhuāng， yàn yì xiāng róng， xiū shā ruǐ zhū gōng nǚ。\nyì dé diāo líng， gèng duō shǎo、 wú qíng fēng yǔ。\nchóu kǔ。\nxián yuàn luò qī liáng， jǐ fān chūn mù。\npíng jì lí hèn chóng chóng， zhè shuāng yàn， hé céng huì rén yán yǔ。\ntiān yáo dì yuǎn， wàn shuǐ qiān shān， zhī tā gù gōng hé chù。\nzěn bù sī liang， chú mèng lǐ、 yǒu shí huì qù。\nwú jù。\nhé mèng yě、 yǒu shí bù zuò。",
        translation: "杏花像裁剪好的白丝绸叠了几重，淡淡胭脂均匀点染，艳色流溢、香气融融，羞煞天上的仙女，可是花容易凋零，更禁不起多少无情风雨，闲静的院落凄凄凉凉，过了几个春暮。想托双燕寄去重重离恨，燕子哪里懂得人的话，天遥地远、万水千山，不知故国宫殿在何处，想回去只能在梦里相见，可有时连梦也做不成。",
      }
      ],
    },
    {
      title: "烛影摇红 · 廖世美",
      art: 'songci-rivers:ch200',
      artPrompt: "古诗《烛影摇红》意境插画：霭霭春空，画楼森耸凌云渚。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "霭霭春空，画楼森耸凌云渚。\n紫薇登览最关情，绝妙夸能赋。\n惆怅相思迟暮。\n记当日、朱阑共语。\n塞鸿难问，岸柳何穷，别愁纷絮。\n催促年光，旧来流水知何处。\n断肠何必更残阳，极目伤平楚。\n晚霁波声带雨。\n悄无人、舟横野渡。\n数峰江上，芳草天涯，参差烟树。",
        pinyin: "ǎi ǎi chūn kōng， huà lóu sēn sǒng líng yún zhǔ。\nzǐ wēi dēng lǎn zuì guān qíng， jué miào kuā néng fù。\nchóu chàng xiāng sī chí mù。\njì dāng rì、 zhū lán gòng yǔ。\nsāi hóng nán wèn， àn liǔ hé qióng， bié chóu fēn xù。\ncuī cù nián guāng， jiù lái liú shuǐ zhī hé chù。\nduàn cháng hé bì gèng cán yáng， jí mù shāng píng chǔ。\nwǎn jì bō shēng dài yǔ。\nqiāo wú rén、 zhōu héng yě dù。\nshù fēng jiāng shàng， fāng cǎo tiān yá， cēn cī yān shù。",
        translation: "春天的天空云气霭霭，高高的画楼立在江边，登高望景最牵动情怀，使人想起当年和友人靠着朱栏一起说话的日子。塞外鸿雁难问消息，岸边柳丝无穷无尽，离愁像纷飞的柳絮，流水不知流向何处，傍晚雨停，江上静悄悄的，小船横在野渡口，只见几座山峰、连天的芳草和高高低低的烟树。",
      }
      ],
    },
    {
      title: "凤凰台上忆吹箫 · 李清照",
      art: 'songci-rivers:ch201',
      artPrompt: "古诗《凤凰台上忆吹箫》意境插画：香冷金猊，被翻红浪，起来人未梳头。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "香冷金猊，被翻红浪，起来人未梳头。\n任宝奁闲掩，日上帘钩。\n生怕闲愁暗恨，多少事、欲说还休。\n今年瘦，非干病酒，不是悲秋。\n明朝，这回去也，千万遍阳关，也即难留。\n念武陵春晚，云锁重楼。\n记取楼前绿水，应念我、终日凝眸。\n凝眸处，从今更数，几段新愁。",
        pinyin: "xiāng lěng jīn ní， bèi fān hóng làng， qǐ lái rén wèi shū tóu。\nrèn bǎo lián xián yǎn， rì shàng lián gōu。\nshēng pà xián chóu àn hèn， duō shǎo shì、 yù shuō hái xiū。\njīn nián shòu， fēi gān bìng jiǔ， bù shì bēi qiū。\nmíng cháo， zhè huí qù yě， qiān wàn biàn yáng guān， yě jí nán liú。\nniàn wǔ líng chūn wǎn， yún suǒ zhòng lóu。\njì qǔ lóu qián lǜ shuǐ， yìng niàn wǒ、 zhōng rì níng móu。\nníng móu chù， cóng jīn gèng shù， jǐ duàn xīn chóu。",
        translation: "香炉里的香冷了，红被胡乱翻着，起来后人也无心梳头，任宝镜匣子闲掩着，太阳升上了帘钩，心里有多少事，想说又咽下，今年人瘦了，不是因为病酒，也不是因为悲秋。明朝这一去，就是把离歌唱千万遍也留不住人，只有楼前的绿水会念着我终日凝望，凝望之处，从今又添几段新愁。",
      }
      ],
    },
    {
      title: "醉花阴 · 李清照",
      art: 'songci-rivers:ch202',
      artPrompt: "古诗《醉花阴》意境插画：薄雾浓云愁永昼。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "薄雾浓云愁永昼。\n瑞脑消金兽。\n佳节又重阳，玉枕纱厨，半夜凉初透。\n东篱把洒黄昏后，有暗香盈袖。\n莫道不消魂，帘卷西风，人似黄花瘦。",
        pinyin: "bó wù nóng yún chóu yǒng zhòu。\nruì nǎo xiāo jīn shòu。\njiā jié yòu chóng yáng， yù zhěn shā chú， bàn yè liáng chū tòu。\ndōng lí bǎ sǎ huáng hūn hòu， yǒu àn xiāng yíng xiù。\nmò dào bù xiāo hún， lián juàn xī fēng， rén sì huáng huā shòu。",
        translation: "薄雾浓云让漫长的白天满是愁闷，兽形香炉里的香料慢慢烧尽，又到重阳佳节，纱帐里半夜已透进凉气。黄昏后在东篱边端着酒，满袖都是菊花的暗香，不要说不伤心，西风卷起帘子，人比那黄菊花还瘦。",
      }
      ],
    },
    {
      title: "念奴娇 · 李清照",
      art: 'songci-rivers:ch203',
      artPrompt: "古诗《念奴娇》意境插画：萧条庭院，有斜风细雨，重门须闭。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "萧条庭院，有斜风细雨，重门须闭。\n宠柳娇花寒食近，种种恼人天气。\n险韵诗成，扶头酒醒，别是闲滋味。\n征鸿过尽，万千心事难寄。\n楼上几日春寒，帘垂四面，玉阑干慵倚。\n被冷香消新梦觉，不许愁人不起。\n清露晨流，新桐初引，多少游春意。\n日高烟敛，更看今日晴未。",
        pinyin: "xiāo tiáo tíng yuàn， yǒu xié fēng xì yǔ， zhòng mén xū bì。\nchǒng liǔ jiāo huā hán shí jìn， zhǒng zhǒng nǎo rén tiān qì。\nxiǎn yùn shī chéng， fú tóu jiǔ xǐng， bié shì xián zī wèi。\nzhēng hóng guò jìn， wàn qiān xīn shì nán jì。\nlóu shàng jǐ rì chūn hán， lián chuí sì miàn， yù lán gān yōng yǐ。\nbèi lěng xiāng xiāo xīn mèng jué， bù xǔ chóu rén bù qǐ。\nqīng lù chén liú， xīn tóng chū yǐn， duō shǎo yóu chūn yì。\nrì gāo yān liǎn， gèng kàn jīn rì qíng wèi。",
        translation: "庭院冷冷清清，斜风细雨，重重门户都关着，寒食将近，娇柳嫩花遇上这恼人天气，诗写成、酒也醒了，只觉得一阵冷清，大雁都飞过去了，千万心事没法寄出去。楼上连日春寒，四面帘子垂着，夜里被冷香消、新梦惊醒，不由愁人不起，清晨露水滚圆，新桐抽芽，倒有多少游春的兴致，太阳升高、烟霭散了，且看今天到底晴不晴。",
      }
      ],
    },
    {
      title: "永遇乐 · 李清照",
      art: 'songci-rivers:ch204',
      artPrompt: "古诗《永遇乐》意境插画：落日熔金，暮云合璧，人在何处。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "落日熔金，暮云合璧，人在何处。\n染柳烟浓，吹梅笛怨，春意知几许。\n元宵佳节，融和天气，次第岂无风雨。\n来相召、香车宝马，谢他酒朋诗侣。\n中州盛日，闺门多暇，记得偏重三五。\n铺翠冠儿，拈金雪柳，簇带争济楚。\n如今憔悴，风鬟霜鬓，怕见夜间出去。\n不如向、帘儿底下，听人笑语。",
        pinyin: "luò rì róng jīn， mù yún hé bì， rén zài hé chù。\nrǎn liǔ yān nóng， chuī méi dí yuàn， chūn yì zhī jǐ xǔ。\nyuán xiāo jiā jié， róng hé tiān qì， cì dì qǐ wú fēng yǔ。\nlái xiāng zhào、 xiāng chē bǎo mǎ， xiè tā jiǔ péng shī lǚ。\nzhōng zhōu shèng rì， guī mén duō xiá， jì de piān zhòng sān wǔ。\npù cuì guān ér， niān jīn xuě liǔ， cù dài zhēng jì chǔ。\nrú jīn qiáo cuì， fēng huán shuāng bìn， pà jiàn yè jiān chū qù。\nbù rú xiàng、 lián ér dǐ xià， tīng rén xiào yǔ。",
        translation: "落日像熔化的金子，暮云像合拢的美玉，可我思念的人在哪里呢，柳色被烟染浓，笛声吹出梅花似的哀怨，春意不知有多少，元宵佳节天气融和，谁知道转眼会不会有风雨。有人驾着香车宝马来邀我，我谢绝了那些酒朋诗友，记得当年闺中闲暇，最看重元宵，戴着翠冠、插着雪柳，打扮得整整齐齐去游玩，如今憔悴了，鬓发斑白，怕夜里出门，不如躲在帘子底下，听听别人的欢声笑语。",
      }
      ],
    },
    {
      title: "声声慢 · 李清照",
      art: 'songci-rivers:ch205',
      artPrompt: "古诗《声声慢》意境插画：寻寻觅觅，冷冷清清，凄凄惨惨戚戚。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "寻寻觅觅，冷冷清清，凄凄惨惨戚戚。\n乍暖还寒时候，最难将息。\n三杯两盏淡酒，怎敌他、晚来风急。\n雁过也，正伤心，却是旧时相识。\n满地黄花堆积。\n憔悴损，如今有谁摘。\n守著窗儿，独自怎生得黑。\n梧桐更兼细雨，到黄昏、点点滴滴。\n这次第，怎一个、愁字了得。",
        pinyin: "xún xún mì mì， lěng lěng qīng qīng， qī qī cǎn cǎn qī qī。\nzhà nuǎn hái hán shí hòu， zuì nán jiāng xī。\nsān bēi liǎng zhǎn dàn jiǔ， zěn dí tā、 wǎn lái fēng jí。\nyàn guò yě， zhèng shāng xīn， què shì jiù shí xiāng shí。\nmǎn dì huáng huā duī jī。\nqiáo cuì sǔn， rú jīn yǒu shuí zhāi。\nshǒu zhù chuāng ér， dú zì zěn shēng dé hēi。\nwú tóng gèng jiān xì yǔ， dào huáng hūn、 diǎn diǎn dī dī。\nzhè cì dì， zěn yī gè、 chóu zì liǎo dé。",
        translation: "寻寻觅觅，四下里冷冷清清，心里凄凄惨惨，忽暖忽寒的天气最难保养，两三杯淡酒怎么抵挡傍晚的急风。大雁飞过正叫人伤心，它们却是旧时相识，满地菊花堆积，人已憔悴，还有谁来摘呢。守着窗儿独自怎么挨到天黑，细雨点点滴滴打在梧桐上直到黄昏，这情形，一个愁字怎么说得完呢。",
      }
      ],
    },
    {
      title: "苏武慢 · 蔡伸",
      art: 'songci-rivers:ch206',
      artPrompt: "古诗《苏武慢》意境插画：雁落平沙，烟笼寒水，古垒鸣笳声断。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "雁落平沙，烟笼寒水，古垒鸣笳声断。\n青山隐隐，败叶萧萧，天际暝鸦零乱。\n楼上黄昏，片帆千里归程，年华将晚。\n望碧云空暮，佳人何处，梦魂俱远。\n忆旧游、邃馆朱扉，小园香径，尚想桃花人面。\n书盈锦轴，恨满金徽，难写寸心幽怨。\n两地离愁，一尊芳酒，凄凉危阑倚遍。\n尽迟留、凭仗西风，吹干泪眼。",
        pinyin: "yàn luò píng shā， yān lóng hán shuǐ， gǔ lěi míng jiā shēng duàn。\nqīng shān yǐn yǐn， bài yè xiāo xiāo， tiān jì míng yā líng luàn。\nlóu shàng huáng hūn， piàn fān qiān lǐ guī chéng， nián huá jiāng wǎn。\nwàng bì yún kōng mù， jiā rén hé chù， mèng hún jù yuǎn。\nyì jiù yóu、 suì guǎn zhū fēi， xiǎo yuán xiāng jìng， shàng xiǎng táo huā rén miàn。\nshū yíng jǐn zhóu， hèn mǎn jīn huī， nán xiě cùn xīn yōu yuàn。\nliǎng dì lí chóu， yī zūn fāng jiǔ， qī liáng wēi lán yǐ biàn。\njìn chí liú、 píng zhàng xī fēng， chuī gān lèi yǎn。",
        translation: "大雁落在平沙，烟雾笼罩寒水，古垒里号角声断断续续，青山隐隐，落叶萧萧，天边归鸦零乱。黄昏时独自登楼，望一片帆走千里归程，年华已晚，碧云满天，心上人在哪里呢，连梦魂也够不着，回忆旧日深馆朱门、小园香径和桃花般的面容，写满书信也诉不尽幽怨，只能倚遍高楼的栏杆，凭西风吹干泪眼。",
      }
      ],
    },
    {
      title: "柳梢青 · 蔡伸",
      art: 'songci-rivers:ch207',
      artPrompt: "古诗《柳梢青》意境插画：数声鶗鴂。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "数声鶗鴂。\n可怜又是，春归时节。\n满院东风，海棠铺绣，梨花飘雪。\n丁香露泣残枝，算未比、愁肠寸结。\n自是休文，多情多感，不干风月。",
        pinyin: "shù shēng tí jué。\nkě lián yòu shì， chūn guī shí jié。\nmǎn yuàn dōng fēng， hǎi táng pù xiù， lí huā piāo xuě。\ndīng xiāng lù qì cán zhī， suàn wèi bǐ、 chóu cháng cùn jié。\nzì shì xiū wén， duō qíng duō gǎn， bù gān fēng yuè。",
        translation: "几声鸟儿啼叫，可怜又是春天归去的时节，满院东风里，落下的海棠像铺开的红绣，飘飞的梨花像雪。带露的丁香在残枝上哭泣，也比不上我愁肠寸寸打结，是我自己太多情善感，不关风和月的事。",
      }
      ],
    },
    {
      title: "摸鱼儿 · 辛弃疾",
      art: 'songci-rivers:ch208',
      artPrompt: "古诗《摸鱼儿》意境插画：更能消、几番风雨。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "更能消、几番风雨。\n匆匆春又归去。\n惜春长恨花开早，何况落红无数。\n春且住。\n见说道、天涯芳草迷归路。\n怨春不语。\n算只有殷勤，画檐珠网，尽日惹飞絮。\n长门事，准拟佳期又误。\n蛾眉曾有人妒。\n千金纵买相如赋，脉脉此情谁诉。\n君莫舞。\n君不见、玉环飞燕皆尘土。\n闲愁最苦。\n休去倚危楼，斜阳正在，烟柳断肠处。",
        pinyin: "gèng néng xiāo、 jǐ fān fēng yǔ。\ncōng cōng chūn yòu guī qù。\nxī chūn cháng hèn huā kāi zǎo， hé kuàng luò hóng wú shù。\nchūn qiě zhù。\njiàn shuō dào、 tiān yá fāng cǎo mí guī lù。\nyuàn chūn bù yǔ。\nsuàn zhǐ yǒu yīn qín， huà yán zhū wǎng， jìn rì rě fēi xù。\ncháng mén shì， zhǔn nǐ jiā qī yòu wù。\né méi céng yǒu rén dù。\nqiān jīn zòng mǎi xiāng rú fù， mò mò cǐ qíng shuí sù。\njūn mò wǔ。\njūn bù jiàn、 yù huán fēi yàn jiē chén tǔ。\nxián chóu zuì kǔ。\nxiū qù yǐ wēi lóu， xié yáng zhèng zài， yān liǔ duàn cháng chù。",
        translation: "还能经得住几番风雨呢，匆匆的春天又要回去了，爱惜春光总恨花开太早，何况如今落红无数。春天请留一留吧，听说天涯芳草迷了归路，可春天不答话，只有画檐下的蛛网整天殷勤地沾惹飞絮；长门宫佳期又误，美人遭人妒忌，纵然千金买来名赋，脉脉深情向谁诉说。你们不要起舞了，没见玉环、飞燕都化作了尘土，闲愁最苦，别去倚高楼，斜阳正照着烟柳，看得人断肠。",
      }
      ],
    },
    {
      title: "水龙吟 · 辛弃疾",
      art: 'songci-rivers:ch209',
      artPrompt: "古诗《水龙吟》意境插画：楚天千里清秋，水随天去秋无际。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "楚天千里清秋，水随天去秋无际。\n遥岑远目，献愁供恨，玉簪螺髻。\n落日楼头，断鸿声里，江南游子。\n把吴钩看了，栏干拍遍，无人会、登临意。\n休说鲈鱼堪。\n尽西风、季鹰归未。\n求田问舍，怕应羞见，刘郎才气。\n可惜流年，忧愁风雨，树犹如此。\n倩何人，唤取盈盈翠袖，英雄泪。",
        pinyin: "chǔ tiān qiān lǐ qīng qiū， shuǐ suí tiān qù qiū wú jì。\nyáo cén yuǎn mù， xiàn chóu gòng hèn， yù zān luó jì。\nluò rì lóu tóu， duàn hóng shēng lǐ， jiāng nán yóu zǐ。\nbǎ wú gōu kàn le， lán gān pāi biàn， wú rén huì、 dēng lín yì。\nxiū shuō lú yú kān。\njìn xī fēng、 jì yīng guī wèi。\nqiú tián wèn shè， pà yìng xiū jiàn， liú láng cái qì。\nkě xī liú nián， yōu chóu fēng yǔ， shù yóu rú cǐ。\nqiàn hé rén， huàn qǔ yíng yíng cuì xiù， yīng xióng lèi。",
        translation: "楚地天空千里清秋，江水随着天边流去，秋色无边无际，远远的山峰像玉簪、像螺髻，献出满眼愁恨。落日下站在楼头，孤雁声里，我这个江南游子把宝剑看了又看，栏杆拍了又拍，没有人懂得登临的心意。不要说鲈鱼正肥美，西风吹尽，季鹰回家了没有，只想着置田买屋，怕要羞见刘郎的才气，可惜年年在忧愁风雨中流逝，树都长得这么高了，请什么人唤来盈盈的翠袖，为英雄擦去眼泪。",
      }
      ],
    },
    {
      title: "念奴娇 · 辛弃疾",
      art: 'songci-rivers:ch210',
      artPrompt: "古诗《念奴娇》意境插画：野棠花落，又匆匆、过了青明时节。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "野棠花落，又匆匆、过了青明时节。\n地东风欺客梦，一夜云屏寒怯。\n曲岸持觞，垂杨系马，此地曾轻别。\n楼空人去，旧游飞燕能说。\n闻道绮陌东头，行人长见，帘底纤纤月。\n旧恨春江流未断，新恨云山千叠。\n料得明朝，尊前重见，镜里花难折。\n也应惊问，近来多少华发。",
        pinyin: "yě táng huā luò， yòu cōng cōng、 guò le qīng míng shí jié。\ndì dōng fēng qī kè mèng， yī yè yún píng hán qiè。\nqǔ àn chí shāng， chuí yáng xì mǎ， cǐ dì céng qīng bié。\nlóu kōng rén qù， jiù yóu fēi yàn néng shuō。\nwén dào qǐ mò dōng tóu， xíng rén cháng jiàn， lián dǐ xiān xiān yuè。\njiù hèn chūn jiāng liú wèi duàn， xīn hèn yún shān qiān dié。\nliào dé míng cháo， zūn qián zhòng jiàn， jìng lǐ huā nán zhé。\nyě yìng jīng wèn， jìn lái duō shǎo huá fà。",
        translation: "野棠花落，又匆匆过了清明时节，东风一路欺负旅客的梦，整夜在屏风后觉得寒冷。当年在这弯曲的岸边举杯、垂杨下系马，就这样轻易分别了，如今楼空人去，只有旧时的燕子能说出当年的情景。旧恨像春江的水流不断，新恨像云山千重万叠，想来日酒杯前重逢，她也像镜中的花难以攀折，她该会惊讶地问：近来添了多少白头发。",
      }
      ],
    },
    {
      title: "鹧鸪天 · 辛弃疾",
      art: 'songci-rivers:ch211',
      artPrompt: "古诗《鹧鸪天》意境插画：枕簟溪堂冷欲秋。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "枕簟溪堂冷欲秋。\n断云依水晚来收。\n红莲相倚浑如醉，白鸟无言定自愁。\n书咄咄，且休休。\n一丘一壑也风流。\n不知筋力衰多少，但觉新来懒上楼。",
        pinyin: "zhěn diàn xī táng lěng yù qiū。\nduàn yún yī shuǐ wǎn lái shōu。\nhóng lián xiāng yǐ hún rú zuì， bái niǎo wú yán dìng zì chóu。\nshū duō duō， qiě xiū xiū。\nyī qiū yī hè yě fēng liú。\nbù zhī jīn lì shuāi duō shǎo， dàn jué xīn lái lǎn shàng lóu。",
        translation: "枕着竹席躺在溪边堂屋，凉意里秋天快到了，傍晚天边的云贴着水面渐渐收起。红莲相互依偎，像全醉了，白鸟默默无言，一定自己发愁。不要写不平的牢骚了，暂且罢休吧，有一座山、一道谷也很自在，不知筋力衰减了多少，只觉得近来懒得爬楼了。",
      }
      ],
    },
    {
      title: "菩萨蛮 · 辛弃疾",
      art: 'songci-rivers:ch212',
      artPrompt: "古诗《菩萨蛮》意境插画：郁孤台下清江水。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "郁孤台下清江水。\n中间多少行人泪。\n西北是长安。\n可怜无数山。\n青山遮不住。\n毕竟江流去。\n江晚正愁予。\n山深闻鹧鸪。",
        pinyin: "yù gū tái xià qīng jiāng shuǐ。\nzhōng jiān duō shǎo xíng rén lèi。\nxī běi shì cháng ān。\nkě lián wú shù shān。\nqīng shān zhē bù zhù。\nbì jìng jiāng liú qù。\njiāng wǎn zhèng chóu yǔ。\nshān shēn wén zhè gū。",
        translation: "郁孤台下清清的江水，里面有多少行路人的眼泪，抬头西北望是长安，可怜被无数座青山遮住。青山毕竟遮不住，江水终究向东流去，江上暮色正让我发愁，深山里又传来鹧鸪的啼叫。",
      }
      ],
    },
    {
      title: "木兰花慢 · 辛弃疾",
      art: 'songci-rivers:ch213',
      artPrompt: "古诗《木兰花慢》意境插画：老来情味减，对别酒、怯流年。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "老来情味减，对别酒、怯流年。\n况屈指中秋，十分好月，不照人圆。\n无情水、都不管，共西风、只等送归船。\n秋晚莼鲈江上，夜深儿女灯前。\n征衫。\n便好去朝天。\n玉殿正思贤。\n想夜半承明，留教视草，却遣筹边。\n长安故人问我，道寻常、泥酒只依然。\n目断秋霄落雁，醉来时响空弦。",
        pinyin: "lǎo lái qíng wèi jiǎn， duì bié jiǔ、 qiè liú nián。\nkuàng qū zhǐ zhōng qiū， shí fēn hǎo yuè， bù zhào rén yuán。\nwú qíng shuǐ、 dōu bù guǎn， gòng xī fēng、 zhī děng sòng guī chuán。\nqiū wǎn chún lú jiāng shàng， yè shēn ér nǚ dēng qián。\nzhēng shān。\nbiàn hǎo qù cháo tiān。\nyù diàn zhèng sī xián。\nxiǎng yè bàn chéng míng， liú jiào shì cǎo， què qiǎn chóu biān。\ncháng ān gù rén wèn wǒ， dào xún cháng、 ní jiǔ zhī yī rán。\nmù duàn qiū xiāo luò yàn， zuì lái shí xiǎng kōng xián。",
        translation: "人老了兴致也淡了，对着送别的酒害怕年华流逝，何况屈指数来中秋又到，十分圆好的月亮偏不照人团圆；无情的江水一概不管，只和西风一起等着送归船，秋晚江上有莼鲈美味，深夜里儿女围坐灯前。穿上征衣正好去朝见天子，朝廷正思念贤才，长安的故人若问起我，只说和往常一样醉得沉沉，望断秋霄落雁，醉里还拉响空弦。",
      }
      ],
    },
    {
      title: "祝英台令 · 辛弃疾",
      art: 'songci-rivers:ch214',
      artPrompt: "古诗《祝英台令》意境插画：宝钗分，桃叶渡。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "宝钗分，桃叶渡。\n烟柳暗南浦。\n怕上层楼，十日九风雨。\n断肠片片飞红，都无人管，倩谁唤、流莺声住。\n鬓边觑。\n试把花卜心期，才簪又重数。\n罗帐灯昏，呜咽梦中语。\n是他春带愁来，春归何处。\n却不解、将愁归去。",
        pinyin: "bǎo chāi fēn， táo yè dù。\nyān liǔ àn nán pǔ。\npà shàng céng lóu， shí rì jiǔ fēng yǔ。\nduàn cháng piàn piàn fēi hóng， dōu wú rén guǎn， qiàn shuí huàn、 liú yīng shēng zhù。\nbìn biān qù。\nshì bǎ huā bǔ xīn qī， cái zān yòu zhòng shù。\nluó zhàng dēng hūn， wū yàn mèng zhōng yǔ。\nshì tā chūn dài chóu lái， chūn guī hé chù。\nquè bù jiě、 jiāng chóu guī qù。",
        translation: "分钗告别在桃叶渡，烟柳把南浦都遮暗了，怕上高楼去望，因为十天里有九天风雨。片片飞红让人断肠，也没有人理会，请谁去唤住黄莺的啼叫呢。看看鬓边的花，拿花瓣来占卜归期，才簪上又取下来重数，罗帐里灯光昏暗，梦里呜咽着说：是春天把愁带来的，春天如今回到哪里去了，怎么不懂得把愁也一起带走。",
      }
      ],
    },
    {
      title: "青玉案 · 辛弃疾",
      art: 'songci-rivers:ch215',
      artPrompt: "古诗《青玉案》意境插画：东风夜放花千树。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "东风夜放花千树。\n更吹落、星如雨。\n宝马雕车香满路。\n凤箫声动，玉壶光转，一夜鱼龙舞。\n蛾儿雪柳黄金缕。\n笑语盈盈暗香去。\n众里寻他千百度。\n蓦然回首，那人却在，灯火阑珊处。",
        pinyin: "dōng fēng yè fàng huā qiān shù。\ngèng chuī luò、 xīng rú yǔ。\nbǎo mǎ diāo chē xiāng mǎn lù。\nfèng xiāo shēng dòng， yù hú guāng zhuǎn， yī yè yú lóng wǔ。\né ér xuě liǔ huáng jīn lǚ。\nxiào yǔ yíng yíng àn xiāng qù。\nzhòng lǐ xún tā qiān bǎi dù。\nmò rán huí shǒu， nà rén què zài， dēng huǒ lán shān chù。",
        translation: "东风夜里吹开千树万树的灯花，又吹落烟花像满天星雨，华贵的车马来来往往，满路飘香，凤箫声里月光流转，鱼灯龙灯欢舞了一夜。姑娘们头戴蛾儿雪柳，说说笑着过去了，留下一阵暗香，我在人群里找了她千百回，忽然一回头，那人却静静站在灯火稀少的地方。",
      }
      ],
    },
    {
      title: "贺新郎 · 辛弃疾",
      art: 'songci-rivers:ch216',
      artPrompt: "古诗《贺新郎》意境插画：凤尾龙香拨。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "凤尾龙香拨。\n自开元、霓裳曲罢，几番风月。\n最苦浔阳江头客，画舸亭亭待发。\n记出塞、黄云堆雪。\n马上离愁三万里，望昭阳、宫殿孤鸿没。\n弦解语，恨难说。\n辽阳驿使音尘绝。\n琐窗寒、轻拢慢拈，泪珠盈睫。\n推手含情还却手，一抹梁州哀彻。\n千古事、云飞烟灭。\n贺老定场无消息，想沉香亭北繁华歇。\n弹到此，为呜咽。",
        pinyin: "fèng wěi lóng xiāng bō。\nzì kāi yuán、 ní cháng qǔ bà， jǐ fān fēng yuè。\nzuì kǔ xún yáng jiāng tóu kè， huà gě tíng tíng dài fā。\njì chū sài、 huáng yún duī xuě。\nmǎ shàng lí chóu sān wàn lǐ， wàng zhāo yáng、 gōng diàn gū hóng méi。\nxián jiě yǔ， hèn nán shuō。\nliáo yáng yì shǐ yīn chén jué。\nsuǒ chuāng hán、 qīng lǒng màn niān， lèi zhū yíng jié。\ntuī shǒu hán qíng hái què shǒu， yī mǒ liáng zhōu āi chè。\nqiān gǔ shì、 yún fēi yān miè。\nhè lǎo dìng chǎng wú xiāo xī， xiǎng chén xiāng tíng běi fán huá xiē。\ntán dào cǐ， wèi wū yàn。",
        translation: "琵琶是凤尾琴身、龙香木拨子，从开元年间霓裳曲之后，经历了多少风月。最苦的是浔阳江头的客子，画船静静待发，记得昭君出塞，黄云堆着白雪，马上的离愁三万里，回头望宫阙，孤雁渐渐飞没，琴弦能解话语，满腔的恨却难说出。辽阳的驿使音信断绝，琐窗里清寒，轻拢慢捻，泪珠挂满睫毛，一曲弹尽千古事，都像云飞烟灭，当年的繁华也停歇了，弹到这里，琴声化作呜咽。",
      }
      ],
    },
    {
      title: "贺新郎 · 辛弃疾",
      art: 'songci-rivers:ch217',
      artPrompt: "古诗《贺新郎》意境插画：绿树听鹈。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "绿树听鹈。\n更那堪、鹧鸪声住，杜鹃声切。\n啼到春归无寻处，苦恨芳菲都歇。\n算未抵、人间离别。\n马上琵琶关塞黑，更长门、翠辇辞金阙。\n看燕燕，送归妾。\n将军百战身名裂。\n向河梁、回头万里，故人长绝。\n易水萧萧西风冷，满座衣冠似雪。\n正壮士、悲歌未彻。\n啼鸟还知如许恨，料不啼清泪长啼血。\n谁共我，醉明月。",
        pinyin: "lǜ shù tīng tí。\ngèng nà kān、 zhè gū shēng zhù， dù juān shēng qiè。\ntí dào chūn guī wú xún chù， kǔ hèn fāng fēi dōu xiē。\nsuàn wèi dǐ、 rén jiān lí bié。\nmǎ shàng pí pa guān sāi hēi， gèng cháng mén、 cuì niǎn cí jīn quē。\nkàn yàn yàn， sòng guī qiè。\njiāng jūn bǎi zhàn shēn míng liè。\nxiàng hé liáng、 huí tóu wàn lǐ， gù rén cháng jué。\nyì shuǐ xiāo xiāo xī fēng lěng， mǎn zuò yī guān sì xuě。\nzhèng zhuàng shì、 bēi gē wèi chè。\ntí niǎo hái zhī rú xǔ hèn， liào bù tí qīng lèi cháng tí xuè。\nshuí gòng wǒ， zuì míng yuè。",
        translation: "绿树上鸟儿啼叫，更受不了鹧鸪声刚停，杜鹃又声声凄切，啼到春天归去无处寻找，苦恨百花都凋谢了，可这还比不上人间的离别。马背上弹着琵琶，关塞一片昏黑，宫车辞别金殿，看燕子双双飞去送走归家的妾；将军百战落得身败名裂，在桥头回头万里与故人永别，易水边西风萧萧，满座送行的人衣白似雪，壮士的悲歌还没有唱完。啼鸟若知道人间有这么多离恨，料想不再啼清泪，而要长啼出血，今后还有谁陪我，在明月下饮酒呢。",
      }
      ],
    },
    {
      title: "汉宫春 · 辛弃疾",
      art: 'songci-rivers:ch218',
      artPrompt: "古诗《汉宫春》意境插画：春已归来，看美人头上，袅袅春幡。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "春已归来，看美人头上，袅袅春幡。\n无端风雨，未肯收尽馀寒。\n年时燕子，料今宵、梦到西园。\n浑未办、黄柑荐酒，更传青韭堆盘。\n却笑东风从此，便薰梅染柳，更没些闲。\n闲时又来镜里，转变朱颜。\n清愁不断，问何人、会解连环。\n生怕见、花开花落，朝来塞雁先还。",
        pinyin: "chūn yǐ guī lái， kàn měi rén tóu shàng， niǎo niǎo chūn fān。\nwú duān fēng yǔ， wèi kěn shōu jìn yú hán。\nnián shí yàn zi， liào jīn xiāo、 mèng dào xī yuán。\nhún wèi bàn、 huáng gān jiàn jiǔ， gèng chuán qīng jiǔ duī pán。\nquè xiào dōng fēng cóng cǐ， biàn xūn méi rǎn liǔ， gèng méi xiē xián。\nxián shí yòu lái jìng lǐ， zhuǎn biàn zhū yán。\nqīng chóu bù duàn， wèn hé rén、 huì jiě lián huán。\nshēng pà jiàn、 huā kāi huā luò， cháo lái sāi yàn xiān hái。",
        translation: "春天已经回来了，看美人头上袅袅颤动的春幡，可没来由的风雨不肯把余寒收尽，去年的燕子料想今夜正梦到西园，家里还没备办黄柑美酒和堆着青韭的春盘。可笑东风从此忙着薰梅染柳，一刻不闲，闲下来又钻进镜子里把人的红颜偷偷变老，清愁不断，问有谁能解开连环。只怕眼看花开花落，早晨塞外的大雁倒先回来了。",
      }
      ],
    },
    {
      title: "水龙吟 · 程垓",
      art: 'songci-rivers:ch219',
      artPrompt: "古诗《水龙吟》意境插画：夜来风雨匆匆，故园定是花无几。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "夜来风雨匆匆，故园定是花无几。\n愁多愁极，等闲孤负，一年芳意。\n柳困花慵，杏青梅小，对人容易。\n算好春长在，好花长见，元只是、人憔悴。\n回首池南旧事。\n恨星星、不堪重记。\n如今但有，看花老眼，伤时清泪。\n不怕逢花瘦，只愁怕、老来风味。\n待繁红乱处，留云借月，也须拼醉。",
        pinyin: "yè lái fēng yǔ cōng cōng， gù yuán dìng shì huā wú jǐ。\nchóu duō chóu jí， děng xián gū fù， yī nián fāng yì。\nliǔ kùn huā yōng， xìng qīng méi xiǎo， duì rén róng yì。\nsuàn hǎo chūn cháng zài， hǎo huā cháng jiàn， yuán zhǐ shì、 rén qiáo cuì。\nhuí shǒu chí nán jiù shì。\nhèn xīng xīng、 bù kān zhòng jì。\nrú jīn dàn yǒu， kàn huā lǎo yǎn， shāng shí qīng lèi。\nbù pà féng huā shòu， zhī chóu pà、 lǎo lái fēng wèi。\ndài fán hóng luàn chù， liú yún jiè yuè， yě xū pīn zuì。",
        translation: "夜里风雨匆匆，故乡园里的花一定没剩几朵了，愁多到了极点，轻易辜负了一年的芳意，柳也困、花也懒，杏子青、梅子小，转眼就对人流谢。其实好春天年都在、好花年年能见，原来只是看花的人自己憔悴，回头想池南旧事，恨白发点点，不忍再记起，如今只剩看花的老眼和伤时的清泪，不怕逢着花瘦，只怕老了的心境，等繁花开到烂漫处，留云借月，也要拼上一醉。",
      }
      ],
    },
    {
      title: "绿头鸭・多丽 · 贺铸",
      art: 'songci-rivers:ch220',
      artPrompt: "古诗《绿头鸭・多丽》意境插画：玉人家，画楼珠箔临津。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "玉人家，画楼珠箔临津。\n托微风、彩箫流怨，断肠马上曾闻。\n燕堂开、艳妆丛里，调琴思、认歌颦。\n麝蜡烟浓，玉莲漏短，更衣不待酒初醺。\n绣屏掩、枕鸳相就，香气渐暾暾。\n回廊影，疏钟淡月，几许销魂。\n翠钗分、银笺封泪，舞鞋从此生尘。\n住兰舟、载将离恨，转南浦、背西曛。\n记取明年，蔷薇谢后，佳期应未误行云。\n凤城远，楚梅香嫩，先寄一枝春。\n青门外，祗凭芳草，寻访郎君。",
        pinyin: "yù rén jiā， huà lóu zhū bó lín jīn。\ntuō wēi fēng、 cǎi xiāo liú yuàn， duàn cháng mǎ shàng céng wén。\nyàn táng kāi、 yàn zhuāng cóng lǐ， tiáo qín sī、 rèn gē pín。\nshè là yān nóng， yù lián lòu duǎn， gēng yī bù dài jiǔ chū xūn。\nxiù píng yǎn、 zhěn yuān xiāng jiù， xiāng qì jiàn tūn tūn。\nhuí láng yǐng， shū zhōng dàn yuè， jǐ xǔ xiāo hún。\ncuì chāi fēn、 yín jiān fēng lèi， wǔ xié cóng cǐ shēng chén。\nzhù lán zhōu、 zǎi jiāng lí hèn， zhuǎn nán pǔ、 bèi xī xūn。\njì qǔ míng nián， qiáng wēi xiè hòu， jiā qī yìng wèi wù xíng yún。\nfèng chéng yuǎn， chǔ méi xiāng nèn， xiān jì yī zhī chūn。\nqīng mén wài， zhī píng fāng cǎo， xún fǎng láng jūn。",
        translation: "临着渡口的画楼里住着美人，彩箫的怨曲托微风传送，在马背上也曾听到这断肠的曲子；华堂开宴，她在艳妆丛里弹琴唱歌两情相悦，烛影香雾里不等酒醉就悄悄更衣，绣屏掩映，鸳鸯枕相依。分别后翠钗分作两半，书信里封着泪，舞鞋从此蒙尘，小船载着离恨转过南浦，背向西下的夕阳；记住明年蔷薇谢后佳期不会误，京城虽远，先折一枝香嫩的春梅寄来，青门外只凭芳草去寻访郎君。",
      }
      ],
    },
    {
      title: "水龙吟 · 晁补之",
      art: 'songci-rivers:ch221',
      artPrompt: "古诗《水龙吟》意境插画：问春何苦匆匆，带风伴雨如驰骤。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "问春何苦匆匆，带风伴雨如驰骤。\n幽葩细萼，小园低槛，壅培未就。\n吹尽繁红，占春长久，不如垂柳。\n算春常不老，人愁春老，愁只是、人间有。\n春恨十常八九。\n忍轻辜、芳醪经口。\n那知自是，桃花结子，不因春瘦。\n世上功名，老来风味，春归时候。\n纵樽前痛饮，狂歌似旧，情难依旧。",
        pinyin: "wèn chūn hé kǔ cōng cōng， dài fēng bàn yǔ rú chí zhòu。\nyōu pā xì è， xiǎo yuán dī kǎn， yōng péi wèi jiù。\nchuī jìn fán hóng， zhàn chūn cháng jiǔ， bù rú chuí liǔ。\nsuàn chūn cháng bù lǎo， rén chóu chūn lǎo， chóu zhǐ shì、 rén jiān yǒu。\nchūn hèn shí cháng bā jiǔ。\nrěn qīng gū、 fāng láo jīng kǒu。\nnà zhī zì shì， táo huā jié zǐ， bù yīn chūn shòu。\nshì shàng gōng míng， lǎo lái fēng wèi， chūn guī shí hòu。\nzòng zūn qián tòng yǐn， kuáng gē sì jiù， qíng nán yī jiù。",
        translation: "问春天何苦这样匆匆，带着风、伴着雨像奔驰一样赶路，小园低栏边的幽花细萼，培土还没完成就被吹尽了繁花，论长久占住春色，还不如垂柳。想来春天本不会老，是人愁春老，愁只在人间才有，人间的春恨十有八九，怎么忍心辜负口中的美酒，哪里知道桃花落是为结桃子，并不是因春消瘦。世上的功名、老来的滋味，正像这春归的时候，纵然在杯前痛饮，狂歌还像从前，情意却难像从前了。",
      }
      ],
    },
    {
      title: "忆少年 · 晁补之",
      art: 'songci-rivers:ch222',
      artPrompt: "古诗《忆少年》意境插画：无穷官柳，无情画舸，无根行客。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "无穷官柳，无情画舸，无根行客。\n南山尚相送，只高城人隔。\n罨画园林溪绀碧。\n算重来、尽成陈迹。\n刘郎鬓如此，况桃花颜色。",
        pinyin: "wú qióng guān liǔ， wú qíng huà gě， wú gēn xíng kè。\nnán shān shàng xiāng sòng， zhī gāo chéng rén gé。\nyǎn huà yuán lín xī gàn bì。\nsuàn chóng lái、 jìn chéng chén jì。\nliú láng bìn rú cǐ， kuàng táo huā yán sè。",
        translation: "官道两旁的柳树没有穷尽，画船无情地载走我这个漂泊无根的旅客，只有南山还远远相送，可惜高城里的人已被隔开。如画的园林、碧蓝的溪水，想来日重游时都成了旧迹，刘郎的鬓发尚且白成这样，何况那桃花般的红润颜色呢。",
      }
      ],
    },
    {
      title: "洞仙歌 · 晁补之",
      art: 'songci-rivers:ch223',
      artPrompt: "古诗《洞仙歌》意境插画：青烟幂处，碧海飞金镜。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "青烟幂处，碧海飞金镜。\n永夜闲阶卧桂影。\n露凉时、零乱多少寒，神京远，惟有蓝桥路近。\n水晶帘不下，云母屏开，冷浸佳人淡脂粉。\n待都将许多明，付与金尊，投晓共、流霞倾尽。\n更携取、胡床上南楼，看玉做人间，素秋千倾。",
        pinyin: "qīng yān mì chù， bì hǎi fēi jīn jìng。\nyǒng yè xián jiē wò guì yǐng。\nlù liáng shí、 líng luàn duō shǎo hán， shén jīng yuǎn， wéi yǒu lán qiáo lù jìn。\nshuǐ jīng lián bù xià， yún mǔ píng kāi， lěng jìn jiā rén dàn zhī fěn。\ndài dōu jiāng xǔ duō míng， fù yǔ jīn zūn， tóu xiǎo gòng、 liú xiá qīng jìn。\ngèng xié qǔ、 hú chuáng shàng nán lóu， kàn yù zuò rén jiān， sù qiū qiān qīng。",
        translation: "青烟散尽的地方，碧海似的天空飞起一轮金镜般的明月，长夜里空闲的台阶上卧着桂树的影子，露水凉时，蟋蟀的叫声零乱，京城遥远，只有蓝桥的路近在眼前。水晶帘不下，云母屏打开，清冷的月光浸着佳人淡淡的脂粉，要把这许多月色都倒进金杯，到天亮和流霞一齐饮尽，再搬着坐具登上南楼，看那白玉砌成的人间，一片千顷素白的秋色。",
      }
      ],
    },
    {
      title: "瑞龙吟 · 周邦彦",
      art: 'songci-rivers:ch224',
      artPrompt: "古诗《瑞龙吟》意境插画：章台路。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "章台路。\n还见褪粉梅梢，试花桃树。\n坊陌人家，定巢燕子，归来旧处。\n暗凝伫。\n因念个人痴小，乍窥门户。\n侵晨浅约宫黄，障风映袖，盈盈笑语。\n前度刘郎重到，访邻寻里，同时歌舞。\n唯有旧家秋娘，声价如故。\n吟笺赋笔，犹记燕台句。\n知谁伴，名园露饮，东城闲步。\n事与孤鸿去。\n探春尽是，伤离意绪。\n官柳低金缕。\n归骑晚，纤纤池塘飞雨。\n断肠院落，一帘风絮。",
        pinyin: "zhāng tái lù。\nhái jiàn tuì fěn méi shāo， shì huā táo shù。\nfāng mò rén jiā， dìng cháo yàn zi， guī lái jiù chù。\nàn níng zhù。\nyīn niàn gè rén chī xiǎo， zhà kuī mén hù。\nqīn chén qiǎn yuē gōng huáng， zhàng fēng yìng xiù， yíng yíng xiào yǔ。\nqián dù liú láng zhòng dào， fǎng lín xún lǐ， tóng shí gē wǔ。\nwéi yǒu jiù jiā qiū niáng， shēng jià rú gù。\nyín jiān fù bǐ， yóu jì yàn tái jù。\nzhī shuí bàn， míng yuán lù yǐn， dōng chéng xián bù。\nshì yǔ gū hóng qù。\ntàn chūn jìn shì， shāng lí yì xù。\nguān liǔ dī jīn lǚ。\nguī qí wǎn， xiān xiān chí táng fēi yǔ。\nduàn cháng yuàn luò， yī lián fēng xù。",
        translation: "又走在章台路上，梅梢的花粉褪了，桃树正试放花朵，街坊人家，定了巢的燕子也回到旧处。我默默伫立，想起当年那个天真痴小的姑娘，清晨淡淡画着额黄，用袖子挡着风，盈盈地说笑。如今旧地重访，同时歌舞的人都还在，只有她的身价名声依然如故，可谁还陪我在名园里露天饮酒、东城闲步呢，往事随孤鸿远去，寻春到处都是伤离的情绪，傍晚骑马归来，池塘上飞着细雨，令人断肠的院落里，一帘飞絮。",
      }
      ],
    },
    {
      title: "锁窗寒・琐寒窗 · 周邦彦",
      art: 'songci-rivers:ch225',
      artPrompt: "古诗《锁窗寒・琐寒窗》意境插画：暗柳啼鸦，单衣伫立，小帘朱户。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "暗柳啼鸦，单衣伫立，小帘朱户。\n桐花半亩，静锁一庭愁雨。\n洒空阶，夜阑未休，故人剪烛西窗语。\n似楚江暝宿，风灯零乱，少年羁旅。\n迟暮。\n嬉游处。\n正店舍无烟，禁城百五。\n旗亭唤酒，付与高阳俦侣。\n想东园，桃李自春，小唇秀靥今在否。\n到归时，定有残英，待客携尊俎。",
        pinyin: "àn liǔ tí yā， dān yī zhù lì， xiǎo lián zhū hù。\ntóng huā bàn mǔ， jìng suǒ yī tíng chóu yǔ。\nsǎ kōng jiē， yè lán wèi xiū， gù rén jiǎn zhú xī chuāng yǔ。\nsì chǔ jiāng míng sù， fēng dēng líng luàn， shào nián jī lǚ。\nchí mù。\nxī yóu chù。\nzhèng diàn shè wú yān， jìn chéng bǎi wǔ。\nqí tíng huàn jiǔ， fù yǔ gāo yáng chóu lǚ。\nxiǎng dōng yuán， táo lǐ zì chūn， xiǎo chún xiù yè jīn zài fǒu。\ndào guī shí， dìng yǒu cán yīng， dài kè xié zūn zǔ。",
        translation: "暗柳上乌鸦啼叫，我穿着单衣伫立在小帘朱户前，半亩桐花，静静锁着一庭愁雨，雨洒空阶到深夜还没停，想起当年故人在西窗剪烛夜话，像在楚江夜宿时风灯零乱的少年行旅。如今迟暮，住处在客店里，正逢寒食禁火，旗亭唤酒的乐事都让给那些豪饮的同伴吧。想那东园的桃李自顾开着春花，那小唇秀靥的人如今还在不在，等我归去时，一定有残留的花，等着客人带着酒来赏。",
      }
      ],
    },
    {
      title: "风流子 · 周邦彦",
      art: 'songci-rivers:ch226',
      artPrompt: "古诗《风流子》意境插画：新绿小池塘。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "新绿小池塘。\n风帘动，碎影舞斜阳。\n羡金屋去来，旧时巢燕，土花缭绕，前度莓墙。\n绣阁凤帏深几许，曾听得理丝簧。\n欲说又休，虑乖芳信，未歌先咽，愁近清觞。\n遥知新妆了，开朱户，应自待月西厢。\n最苦梦魂，今宵不到伊行。\n问甚时说与，佳音密耗，寄将秦镜，偷换韩香。\n天便教人，霎时厮见何妨。",
        pinyin: "xīn lǜ xiǎo chí táng。\nfēng lián dòng， suì yǐng wǔ xié yáng。\nxiàn jīn wū qù lái， jiù shí cháo yàn， tǔ huā liáo rào， qián dù méi qiáng。\nxiù gé fèng wéi shēn jǐ xǔ， céng tīng dé lǐ sī huáng。\nyù shuō yòu xiū， lǜ guāi fāng xìn， wèi gē xiān yàn， chóu jìn qīng shāng。\nyáo zhī xīn zhuāng le， kāi zhū hù， yìng zì dài yuè xī xiāng。\nzuì kǔ mèng hún， jīn xiāo bù dào yī xíng。\nwèn shèn shí shuō yǔ， jiā yīn mì hào， jì jiāng qín jìng， tōu huàn hán xiāng。\ntiān biàn jiào rén， shà shí sī jiàn hé fáng。",
        translation: "小池塘一片新绿，风帘晃动，碎影在斜阳里飞舞，羡慕旧时的燕子能飞进那金屋来去，羡慕青苔绕着旧日的墙。那绣阁凤帏不知有多深，曾听到里面隐隐的琴声，她想说又不说，怕耽误了佳期，没唱歌先哽咽，对着酒杯发愁。遥想她新妆已好，打开朱红门户，正独自等着月照西厢，最苦的是我的梦魂，今夜也到不了她身边，问什么时候才能互诉衷肠、暗递信物，老天啊，让人霎时相见一面又何妨。",
      }
      ],
    },
    {
      title: "应天长 · 周邦彦",
      art: 'songci-rivers:ch227',
      artPrompt: "古诗《应天长》意境插画：条风布暖，霏雾弄晴，池塘遍满春色。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "条风布暖，霏雾弄晴，池塘遍满春色。\n正是夜堂无月，沈沈暗寒食。\n梁间燕，前社客。\n似笑我、闭门愁寂。\n乱花过，隔院芸香，满地狼藉。\n长记那回时，邂逅相逢，郊外驻油壁。\n又见汉宫传烛，飞烟五候宅。\n青青草，迷路陌。\n强带酒，细寻前迹。\n市桥远，柳下人家，犹自相识。",
        pinyin: "tiáo fēng bù nuǎn， fēi wù nòng qíng， chí táng biàn mǎn chūn sè。\nzhèng shì yè táng wú yuè， shěn shěn àn hán shí。\nliáng jiān yàn， qián shè kè。\nsì xiào wǒ、 bì mén chóu jì。\nluàn huā guò， gé yuàn yún xiāng， mǎn dì láng jí。\ncháng jì nà huí shí， xiè hòu xiāng féng， jiāo wài zhù yóu bì。\nyòu jiàn hàn gōng chuán zhú， fēi yān wǔ hòu zhái。\nqīng qīng cǎo， mí lù mò。\nqiáng dài jiǔ， xì xún qián jì。\nshì qiáo yuǎn， liǔ xià rén jiā， yóu zì xiāng shí。",
        translation: "春风送来温暖，薄雾里透出晴光，池塘上到处是春色，正是夜里没有月亮、沉沉暗暗的寒食节，梁间的燕子却像旧客，似笑我闭门独自愁寂。乱花飞过，隔院飘来香气，满地落花乱糟糟。总记得那一年在郊外邂逅相逢，她的车儿停在路旁，如今青青的芳草迷了路径，我勉强带着酒，细细寻找前次的足迹，好在远处市桥、柳下的人家，还认得我。",
      }
      ],
    },
    {
      title: "解连环 · 周邦彦",
      art: 'songci-rivers:ch228',
      artPrompt: "古诗《解连环》意境插画：怨怀无托。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "怨怀无托。\n嗟情人断绝，信音辽邈。\n信妙手、能解连环，似风散雨收，雾轻云薄。\n燕子楼空，暗尘锁、一床弦索。\n想移根换叶。\n尽是旧时，手种红药。\n汀洲渐生杜若。\n料舟依岸曲，人在天角。\n谩记得、当日音书，把闲语闲言，待总烧却。\n水驿春回，望寄我、江南梅萼。\n拼今生，对花对酒，为伊落泪。",
        pinyin: "yuàn huái wú tuō。\njiē qíng rén duàn jué， xìn yīn liáo miǎo。\nxìn miào shǒu、 néng jiě lián huán， sì fēng sàn yǔ shōu， wù qīng yún báo。\nyàn zi lóu kōng， àn chén suǒ、 yī chuáng xián suǒ。\nxiǎng yí gēn huàn yè。\njìn shì jiù shí， shǒu zhǒng hóng yào。\ntīng zhōu jiàn shēng dù ruò。\nliào zhōu yī àn qǔ， rén zài tiān jiǎo。\nmàn jì de、 dāng rì yīn shū， bǎ xián yǔ xián yán， dài zǒng shāo què。\nshuǐ yì chūn huí， wàng jì wǒ、 jiāng nán méi è。\npīn jīn shēng， duì huā duì jiǔ， wèi yī luò lèi。",
        translation: "满怀幽怨无处寄托，可叹情人断绝了来往，音信那么遥远，如果真有妙手能解开这连环，就让情事像风散雨收、雾轻云薄一样了结吧。如今燕子楼空空，暗尘锁住满床乐器，连眼前移植的花草，都是旧时亲手种的红芍药。水边洲上渐渐长出香草，想那船正靠在弯曲的岸边，人却在天涯，白白记得当年的书信，把那些闲话闲言，准备一把烧光，只盼春回水驿时，她能寄我江南的梅花，我甘愿这一生对着花、对着酒，为她落泪。",
      }
      ],
    },
    {
      title: "瑞鹤仙 · 周邦彦",
      art: 'songci-rivers:ch229',
      artPrompt: "古诗《瑞鹤仙》意境插画：悄郊原带郭。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "悄郊原带郭。\n行路永，客去车尘漠漠。\n斜阳映山落。\n敛馀红、犹恋孤城栏角。\n凌波步弱。\n过短亭、何用素约。\n有流莺劝我，重解绣鞍，缓引春酌。\n不记归时早暮，上马谁扶，醒眠朱阁。\n惊飙动幕。\n扶残醉，绕红药。\n叹西园、已是花深无地，东风何事又恶。\n任流光过却。\n犹喜洞天自乐。",
        pinyin: "qiāo jiāo yuán dài guō。\nxíng lù yǒng， kè qù chē chén mò mò。\nxié yáng yìng shān luò。\nliǎn yú hóng、 yóu liàn gū chéng lán jiǎo。\nlíng bō bù ruò。\nguò duǎn tíng、 hé yòng sù yuē。\nyǒu liú yīng quàn wǒ， zhòng jiě xiù ān， huǎn yǐn chūn zhuó。\nbù jì guī shí zǎo mù， shàng mǎ shuí fú， xǐng mián zhū gé。\njīng biāo dòng mù。\nfú cán zuì， rào hóng yào。\ntàn xī yuán、 yǐ shì huā shēn wú dì， dōng fēng hé shì yòu è。\nrèn liú guāng guò què。\nyóu xǐ dòng tiān zì lè。",
        translation: "郊原静悄悄地连着城郭，路途遥远，客人去了，车尘茫茫，斜阳映着山落下去，收拢的余红还留恋着孤城的栏杆一角。她步履轻柔地赶来，路过短亭相见，又何必事先约定，有莺声般的人劝我解下绣鞍，慢慢再饮几杯春酒。不记得回去的早晚，上马时谁扶的，醒来已睡在朱阁里，大风掀动帘幕，带着残醉绕着栏杆看红芍药，感叹西园已经落花满地，东风为什么又这样凶狠，任凭流光过去吧，还喜这小天地自有乐趣。",
      }
      ],
    },
    {
      title: "浪涛沙・浪淘沙 · 周邦彦",
      art: 'songci-rivers:ch230',
      artPrompt: "古诗《浪涛沙・浪淘沙》意境插画：昼阴重，霜凋岸草，雾隐城堞。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "昼阴重，霜凋岸草，雾隐城堞。\n南陌脂车待发。\n东门帐饮乍阕。\n正拂面垂杨堪缆结。\n掩红泪、玉手亲折。\n念汉浦离鸿去何许，经时信音绝。\n情切。\n望中地远天阔。\n向露冷风清，无人处、耿耿寒漏咽。\n嗟万事难忘，唯是轻别。\n翠尊未竭。\n凭断云留取，西楼残月。\n罗带光销纹衾叠。\n连环解、旧香顿歇。\n怨歌永、琼壶敲尽缺。\n恨春去、不与人期，弄夜色，空馀满地梨花雪。",
        pinyin: "zhòu yīn zhòng， shuāng diāo àn cǎo， wù yǐn chéng dié。\nnán mò zhī chē dài fā。\ndōng mén zhàng yǐn zhà què。\nzhèng fú miàn chuí yáng kān lǎn jié。\nyǎn hóng lèi、 yù shǒu qīn zhé。\nniàn hàn pǔ lí hóng qù hé xǔ， jīng shí xìn yīn jué。\nqíng qiè。\nwàng zhōng dì yuǎn tiān kuò。\nxiàng lù lěng fēng qīng， wú rén chù、 gěng gěng hán lòu yàn。\njiē wàn shì nán wàng， wéi shì qīng bié。\ncuì zūn wèi jié。\npíng duàn yún liú qǔ， xī lóu cán yuè。\nluó dài guāng xiāo wén qīn dié。\nlián huán jiě、 jiù xiāng dùn xiē。\nyuàn gē yǒng、 qióng hú qiāo jìn quē。\nhèn chūn qù、 bù yǔ rén qī， nòng yè sè， kōng yú mǎn dì lí huā xuě。",
        translation: "白天阴云沉沉，霜打岸边草，雾遮了城楼，南陌上车马等着出发，东门外饯别的酒刚散，垂杨正拂面，她掩着泪，玉手亲手折下柳条送别。想那从汉浦离去的鸿雁飞到哪里去了，这么久音信全无，情意切切，望着天远地阔，在露冷风清无人处，听得寒漏声声呜咽。可叹万事难忘，只有这轻易的分别，杯里的酒还没喝完，就凭几缕断云留下西楼残月吧，怨歌没完没了，玉壶敲得全是缺口，恨春天去了不与人相约，只摆弄着夜色，空留满地梨花像雪。",
      }
      ],
    },
    {
      title: "满庭芳 · 周邦彦",
      art: 'songci-rivers:ch231',
      artPrompt: "古诗《满庭芳》意境插画：风老莺雏，雨肥梅子，午阴嘉树清圆。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "风老莺雏，雨肥梅子，午阴嘉树清圆。\n地卑山近，衣润费垆烟。\n人静乌鸢自乐，小桥外、新绿溅溅。\n凭栏久，黄芦苦竹，拟泛九江船。\n年年。\n如社燕，飘流瀚海，来寄修椽。\n且莫思身外，长近尊前。\n憔悴江南倦客，不堪听、急管繁弦。\n歌筵畔，先安簟枕，容我醉时眠。",
        pinyin: "fēng lǎo yīng chú， yǔ féi méi zǐ， wǔ yīn jiā shù qīng yuán。\ndì bēi shān jìn， yī rùn fèi lú yān。\nrén jìng wū yuān zì lè， xiǎo qiáo wài、 xīn lǜ jiàn jiàn。\npíng lán jiǔ， huáng lú kǔ zhú， nǐ fàn jiǔ jiāng chuán。\nnián nián。\nrú shè yàn， piāo liú hàn hǎi， lái jì xiū chuán。\nqiě mò sī shēn wài， cháng jìn zūn qián。\nqiáo cuì jiāng nán juàn kè， bù kān tīng、 jí guǎn fán xián。\ngē yán pàn， xiān ān diàn zhěn， róng wǒ zuì shí mián。",
        translation: "春风把雏莺吹大，雨水把梅子催肥，正午的树影清圆可爱，这里地低近山，衣服潮湿，要费炉火烘炕，人静下来，乌鸢自在快活，小桥外新绿的流水哗哗地淌。久久倚着栏杆，满眼黄芦苦竹，想学古人泛舟江湖。年年像社日前后飞来的燕子，飘流过辽远的地方，寄居在长长的屋椽下，暂且不要想身外的事，多在酒杯前坐坐，憔悴的江南倦客，实在听不得急促繁杂的管弦，就在歌筵旁边先安放好席子和枕头，容我醉了就睡。",
      }
      ],
    },
    {
      title: "过秦楼 · 周邦彦",
      art: 'songci-rivers:ch232',
      artPrompt: "古诗《过秦楼》意境插画：水浴清蟾，叶喧凉吹，巷陌马声初断。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "水浴清蟾，叶喧凉吹，巷陌马声初断。\n闲依露井，笑扑流萤，惹破画罗轻扇。\n人静夜久凭阑，愁不归眠，立残更箭。\n叹年华一瞬，人今千里，梦沈书远。\n空见说、鬓怯琼梳，容销金镜，渐懒趁时匀染。\n梅风地溽，虹雨苔滋，一架舞红都变。\n谁信无，为伊才减江淹，情伤荀倩。\n但明河影下，还看稀星数点。",
        pinyin: "shuǐ yù qīng chán， yè xuān liáng chuī， xiàng mò mǎ shēng chū duàn。\nxián yī lù jǐng， xiào pū liú yíng， rě pò huà luó qīng shàn。\nrén jìng yè jiǔ píng lán， chóu bù guī mián， lì cán gèng jiàn。\ntàn nián huá yī shùn， rén jīn qiān lǐ， mèng shěn shū yuǎn。\nkōng jiàn shuō、 bìn qiè qióng shū， róng xiāo jīn jìng， jiàn lǎn chèn shí yún rǎn。\nméi fēng dì rù， hóng yǔ tái zī， yī jià wǔ hóng dōu biàn。\nshuí xìn wú， wèi yī cái jiǎn jiāng yān， qíng shāng xún qiàn。\ndàn míng hé yǐng xià， hái kàn xī xīng shù diǎn。",
        translation: "月亮清亮得像在水里洗过，凉风吹得树叶沙沙响，街上的马蹄声刚刚停下来。人闲靠在露井边，笑着扑打飞舞的萤火虫，把画着花的扇子也扑破了。夜深了他还倚着栏杆不肯回去睡，叹时光一下子就过去了，心里的人远在千里之外，梦也难见，信也寄不到。",
      }
      ],
    },
    {
      title: "夜游宫 · 周邦彦",
      art: 'songci-rivers:ch233',
      artPrompt: "古诗《夜游宫》意境插画：叶下斜阳照水。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "叶下斜阳照水。\n卷轻浪、沈沈千里。\n桥上酸风射眸子。\n立多时，看黄昏，灯火市。\n古屋寒窗底。\n听几片、井桐飞坠。\n不恋单衾再三起。\n有谁知，为萧娘，书一纸。",
        pinyin: "yè xià xié yáng zhào shuǐ。\njuàn qīng làng、 shěn shěn qiān lǐ。\nqiáo shàng suān fēng shè móu zǐ。\nlì duō shí， kàn huáng hūn， dēng huǒ shì。\ngǔ wū hán chuāng dǐ。\ntīng jǐ piàn、 jǐng tóng fēi zhuì。\nbù liàn dān qīn zài sān qǐ。\nyǒu shuí zhī， wèi xiāo niáng， shū yī zhǐ。",
        translation: "斜阳照着落叶飘下的水面，小浪卷向沉沉的千里之外。桥上冷风吹得眼睛发酸，他站了许久，看黄昏里亮起灯火的街市。回到古屋寒窗下，听梧桐叶一片片落下，裹着薄被怎么也睡不稳，起来了好几回——有谁知道呢，只是为了心上人寄来的一封信。",
      }
      ],
    },
    {
      title: "解语花 · 周邦彦",
      art: 'songci-rivers:ch234',
      artPrompt: "古诗《解语花》意境插画：风销焰蜡，露烘炉。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "风销焰蜡，露烘炉。\n花市光相射。\n桂华流瓦。\n纤云散，耿耿素娥欲下。\n衣裳淡雅。\n看楚女、纤腰一把。\n箫鼓喧，人影参差，满路飘香麝。\n因念都城放夜。\n望千门如昼，嬉笑游冶。\n钿车罗帕。\n相逢处，自有暗尘随马。\n年光是也。\n唯只见、旧情衰谢。\n清漏移，飞盖归来，从舞休歌罢。",
        pinyin: "fēng xiāo yàn là， lù hōng lú。\nhuā shì guāng xiāng shè。\nguì huá liú wǎ。\nxiān yún sàn， gěng gěng sù é yù xià。\nyī shang dàn yǎ。\nkàn chǔ nǚ、 xiān yāo yī bǎ。\nxiāo gǔ xuān， rén yǐng cēn cī， mǎn lù piāo xiāng shè。\nyīn niàn dū chéng fàng yè。\nwàng qiān mén rú zhòu， xī xiào yóu yě。\ndiàn chē luó pà。\nxiāng féng chù， zì yǒu àn chén suí mǎ。\nnián guāng shì yě。\nwéi zhǐ jiàn、 jiù qíng shuāi xiè。\nqīng lòu yí， fēi gài guī lái， cóng wǔ xiū gē bà。",
        translation: "风吹得蜡烛的火苗摇晃，花市里灯光互相辉映，月光像流水淌在屋瓦上。云散了，月亮亮得好像嫦娥要下凡来，街上箫鼓喧闹，姑娘们衣裳淡雅，人影纷杂，满路飘着香。想起京城元宵夜里千门万户亮得像白天，人们笑着游玩，如今节令还是一样，只是旧日的情怀淡了，就让歌声舞影早点歇了吧。",
      }
      ],
    },
    {
      title: "大 · 周邦彦",
      art: 'songci-rivers:ch235',
      artPrompt: "古诗《大》意境插画：对宿烟收，春禽静，飞雨时鸣高屋。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "对宿烟收，春禽静，飞雨时鸣高屋。\n墙头青玉旆，洗铅霜都尽，嫩梢相触。\n润逼琴丝，寒侵枕障，虫网吹沾帘竹。\n邮亭无人处，听檐声不断，困眠初熟。\n奈愁极顿惊，梦轻难记，自怜幽独。\n行人归意速。\n最先念、流潦妨车毂。\n怎奈向、兰成憔悴，卫清羸，等闲时、易伤心目。\n未怪平阳客，双泪落、笛中哀曲。\n况萧索、青芜国。\n红糁铺地，门外荆桃如菽。\n夜游共谁秉烛。",
        pinyin: "duì sù yān shōu， chūn qín jìng， fēi yǔ shí míng gāo wū。\nqiáng tóu qīng yù pèi， xǐ qiān shuāng dōu jìn， nèn shāo xiāng chù。\nrùn bī qín sī， hán qīn zhěn zhàng， chóng wǎng chuī zhān lián zhú。\nyóu tíng wú rén chù， tīng yán shēng bù duàn， kùn mián chū shú。\nnài chóu jí dùn jīng， mèng qīng nán jì， zì lián yōu dú。\nxíng rén guī yì sù。\nzuì xiān niàn、 liú liáo fáng chē gū。\nzěn nài xiàng、 lán chéng qiáo cuì， wèi qīng léi， děng xián shí、 yì shāng xīn mù。\nwèi guài píng yáng kè， shuāng lèi luò、 dí zhōng āi qǔ。\nkuàng xiāo suǒ、 qīng wú guó。\nhóng shēn pù dì， mén wài jīng táo rú shū。\nyè yóu gòng shuí bǐng zhú。",
        translation: "隔夜的烟霭收了起来，春天的鸟儿静静的，只有飞来飞去的雨不时在高屋上沙沙作响。雨水打湿了琴弦，寒气钻进枕头帐子，旅店里没有别人，听着檐前雨声不断，困了刚睡着又被愁惊醒，梦浅浅的记不清，只好自己怜惜自己的孤单。赶路的人一心只想快回家，最惦记的是积水挡住车轮；如今落花铺满一地，夜里想赏花，又能和谁一起点蜡烛呢。",
      }
      ],
    },
    {
      title: "花犯 · 周邦彦",
      art: 'songci-rivers:ch236',
      artPrompt: "古诗《花犯》意境插画：粉墙低，梅花照眼，依然旧风味。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "粉墙低，梅花照眼，依然旧风味。\n露痕轻缀。\n疑净洗铅华，无限佳丽。\n去年胜赏曾孤倚。\n冰盘同宴喜。\n更可惜，雪中高树，香篝熏素被。\n今年对花最匆匆，相逢似有恨，依依愁悴。\n吟望久，青苔上、旋看飞坠。\n相将见、脆丸荐酒，人正在、空江烟浪里。\n但梦想、一枝潇洒，黄昏斜照水。",
        pinyin: "fěn qiáng dī， méi huā zhào yǎn， yī rán jiù fēng wèi。\nlù hén qīng zhuì。\nyí jìng xǐ qiān huá， wú xiàn jiā lì。\nqù nián shèng shǎng céng gū yǐ。\nbīng pán tóng yàn xǐ。\ngèng kě xī， xuě zhōng gāo shù， xiāng gōu xūn sù bèi。\njīn nián duì huā zuì cōng cōng， xiāng féng sì yǒu hèn， yī yī chóu cuì。\nyín wàng jiǔ， qīng tái shàng、 xuán kàn fēi zhuì。\nxiāng jiāng jiàn、 cuì wán jiàn jiǔ， rén zhèng zài、 kōng jiāng yān làng lǐ。\ndàn mèng xiǎng、 yī zhī xiāo sǎ， huáng hūn xié zhào shuǐ。",
        translation: "低低的粉墙边，梅花亮得照眼，还是从前那样的风韵，花瓣带着轻轻的露痕，像洗净了脂粉的美人，说不出的好看。去年赏花曾一个人靠着树，今年对花来去匆匆，梅花好像也含着愁，眼看着花瓣一片片落在青苔上。等梅子熟了可以下酒的时候，我却在空阔的江上漂泊，只能在梦里想那枝潇洒的梅花，在黄昏里斜照着水面。",
      }
      ],
    },
    {
      title: "六丑 · 周邦彦",
      art: 'songci-rivers:ch237',
      artPrompt: "古诗《六丑》意境插画：正单衣试酒，恨客里、光阴虚掷。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "正单衣试酒，恨客里、光阴虚掷。\n愿春暂留，春归如过翼。\n一去无迹。\n为问花何在，夜来风雨，葬楚宫倾国。\n钗钿堕处遗香泽。\n乱点桃蹊，轻翻柳陌。\n多情为谁追惜。\n但蜂媒蝶使，时叩窗隔。\n东园岑寂。\n渐蒙笼暗碧。\n静绕珍丛底，成叹息。\n长条故惹行客。\n似牵衣待话，别情无极。\n残英小、强簪巾帻。\n终不似一朵，钗头颤袅，向人侧。\n漂流处、莫趁潮汐。\n恐断红、尚有相思字，何由见得。",
        pinyin: "zhèng dān yī shì jiǔ， hèn kè lǐ、 guāng yīn xū zhì。\nyuàn chūn zàn liú， chūn guī rú guò yì。\nyī qù wú jì。\nwèi wèn huā hé zài， yè lái fēng yǔ， zàng chǔ gōng qīng guó。\nchāi diàn duò chù yí xiāng zé。\nluàn diǎn táo qī， qīng fān liǔ mò。\nduō qíng wèi shuí zhuī xī。\ndàn fēng méi dié shǐ， shí kòu chuāng gé。\ndōng yuán cén jì。\njiàn méng lóng àn bì。\njìng rào zhēn cóng dǐ， chéng tàn xī。\ncháng tiáo gù rě xíng kè。\nsì qiān yī dài huà， bié qíng wú jí。\ncán yīng xiǎo、 qiáng zān jīn zé。\nzhōng bù sì yī duǒ， chāi tóu chàn niǎo， xiàng rén cè。\npiāo liú chù、 mò chèn cháo xī。\nkǒng duàn hóng、 shàng yǒu xiāng sī zì， hé yóu jiàn dé。",
        translation: "正是穿单衣尝新酒的时节，恨自己客居在外，白白虚度了光阴。想留春天多住几天，春天却像飞鸟一样，一去没有踪影。夜里一场风雨，把满树的花都埋葬了，花瓣飘落还带着香气，只有蜜蜂蝴蝶时不时来敲窗，好像替人惋惜。东园冷冷清清，蔷薇的长条故意勾住行人的衣裳，像拉着人有说不完的话；摘一朵小残花插在帽子上吧，花漂走时千万别跟着潮水去，怕那花瓣上还写着相思的字，就再也看不见了。",
      }
      ],
    },
    {
      title: "兰陵王 · 周邦彦",
      art: 'songci-rivers:ch238',
      artPrompt: "古诗《兰陵王》意境插画：柳阴直。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "柳阴直。\n烟里丝丝弄碧。\n隋堤上、曾见几番，拂水飘绵送行色。\n登临望故国。\n谁识。\n京华倦客。\n长亭路，年去岁来，应折柔条过千尺。\n闲寻旧踪迹。\n又酒趁哀弦，灯照离席。\n梨花榆火催寒食。\n愁一箭风快，半篙波暖，回头迢递便数驿。\n望人在天北。\n凄恻。\n恨堆积。\n渐别浦萦回，津堠岑寂。\n斜阳冉冉春无极。\n念月榭携手，露桥闻笛。\n沉思前事，似梦里，泪暗滴。",
        pinyin: "liǔ yīn zhí。\nyān lǐ sī sī nòng bì。\nsuí dī shàng、 céng jiàn jǐ fān， fú shuǐ piāo mián sòng xíng sè。\ndēng lín wàng gù guó。\nshuí shí。\njīng huá juàn kè。\ncháng tíng lù， nián qù suì lái， yìng zhé róu tiáo guò qiān chǐ。\nxián xún jiù zōng jì。\nyòu jiǔ chèn āi xián， dēng zhào lí xí。\nlí huā yú huǒ cuī hán shí。\nchóu yī jiàn fēng kuài， bàn gāo bō nuǎn， huí tóu tiáo dì biàn shù yì。\nwàng rén zài tiān běi。\nqī cè。\nhèn duī jī。\njiàn bié pǔ yíng huí， jīn hòu cén jì。\nxié yáng rǎn rǎn chūn wú jí。\nniàn yuè xiè xié shǒu， lù qiáo wén dí。\nchén sī qián shì， sì mèng lǐ， lèi àn dī。",
        translation: "堤上柳树的影子笔直，烟霭里丝丝柳条摆弄着新绿。在隋堤上，多少次看见柳枝拂水、柳絮飘飞，送走一行行离别的人。我这个在京城住倦了的游人回头望故乡，谁还认得我呢；长亭路上年年送别，折下的柳条怕已有千尺长。如今船趁风快得像箭，一回头就过了好几个驿站，望那人已在天的北边。愁恨渐渐堆满心头，斜阳慢慢落下去，春色无边无际，想起从前月下携手、桥上听笛，往事像做梦一样，眼泪暗暗往下掉。",
      }
      ],
    },
    {
      title: "西河 · 周邦彦",
      art: 'songci-rivers:ch239',
      artPrompt: "古诗《西河》意境插画：佳丽地。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "佳丽地。\n南朝盛事谁记。\n山围故国绕清江，髻鬟对起。\n怒涛寂寞打孤城，风樯遥度天际。\n断崖树，犹倒倚。\n莫愁艇子曾系。\n空馀旧迹郁苍苍，雾沈半垒。\n夜深月过女墙来，赏心东望淮水。\n酒旗戏鼓甚处市。\n想依稀、王谢邻里。\n燕子不知何世。\n入寻常、巷陌人家，相对如说兴亡，斜阳里。",
        pinyin: "jiā lì dì。\nnán cháo shèng shì shuí jì。\nshān wéi gù guó rào qīng jiāng， jì huán duì qǐ。\nnù tāo jì mò dǎ gū chéng， fēng qiáng yáo dù tiān jì。\nduàn yá shù， yóu dǎo yǐ。\nmò chóu tǐng zǐ céng xì。\nkōng yú jiù jì yù cāng cāng， wù shěn bàn lěi。\nyè shēn yuè guò nǚ qiáng lái， shǎng xīn dōng wàng huái shuǐ。\njiǔ qí xì gǔ shèn chù shì。\nxiǎng yī xī、 wáng xiè lín lǐ。\nyàn zi bù zhī hé shì。\nrù xún cháng、 xiàng mò rén jiā， xiāng duì rú shuō xīng wáng， xié yáng lǐ。",
        translation: "多么美丽的金陵啊，南朝的繁华还有谁记得。青山围着旧都城，清江绕城流过，两座山峰像发髻一样对峙着，怒涛寂寞地拍打孤城，船帆远远驶向天边。悬崖上的老树还倒挂着，当年莫愁女的小船曾在这里系过；夜深了，月光翻过城上的矮墙照进来。酒旗戏鼓如今在哪个街市？燕子不知道朝代已经换了几回，飞进寻常百姓家，在斜阳里面对面，好像正说着世道的兴亡。",
      }
      ],
    },
    {
      title: "绮寮怨 · 周邦彦",
      art: 'songci-rivers:ch240',
      artPrompt: "古诗《绮寮怨》意境插画：上马人扶残醉，晓风吹未醒。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "上马人扶残醉，晓风吹未醒。\n映水曲、翠瓦朱檐，垂杨里、乍见津亭。\n当时曾题败壁，蛛丝罩、淡墨苔晕青。\n念去来、岁月如流，徘徊久、叹息愁思盈。\n去去倦寻路程。\n江陵旧事，何曾再问杨琼。\n旧曲凄清。\n敛愁黛、与谁听。\n尊前故人如在，想念我、最关情。\n何须渭城。\n歌声未尽处，先泪零。",
        pinyin: "shàng mǎ rén fú cán zuì， xiǎo fēng chuī wèi xǐng。\nyìng shuǐ qǔ、 cuì wǎ zhū yán， chuí yáng lǐ、 zhà jiàn jīn tíng。\ndāng shí céng tí bài bì， zhū sī zhào、 dàn mò tái yūn qīng。\nniàn qù lái、 suì yuè rú liú， pái huái jiǔ、 tàn xī chóu sī yíng。\nqù qù juàn xún lù chéng。\njiāng líng jiù shì， hé céng zài wèn yáng qióng。\njiù qǔ qī qīng。\nliǎn chóu dài、 yǔ shuí tīng。\nzūn qián gù rén rú zài， xiǎng niàn wǒ、 zuì guān qíng。\nhé xū wèi chéng。\ngē shēng wèi jìn chù， xiān lèi líng。",
        translation: "别人扶着我带着醉意上马，清晨的风也吹不醒。水湾里映着翠瓦红檐，在垂杨树里忽然看见渡口的亭子。当年曾在残破的墙壁上题过字，如今蛛丝罩住，淡墨痕上生了青苔。想来来去去，岁月像流水一样，徘徊了很久，叹息和愁思装了满怀。这一去懒得再问路程，旧曲凄清，皱着愁眉还能弹给谁听；要是酒前的故人还在，一定最想念我。哪里还用唱送别的曲子，歌声还没完，眼泪先落下来了。",
      }
      ],
    },
    {
      title: "拜星月・拜星月慢 · 周邦彦",
      art: 'songci-rivers:ch241',
      artPrompt: "古诗《拜星月・拜星月慢》意境插画：夜色催更，清尘收露，小曲幽坊月暗。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "夜色催更，清尘收露，小曲幽坊月暗。\n竹槛灯窗，识秋娘庭院。\n笑相遇，似觉琼枝玉树相倚，暖日明霞光烂。\n水眄兰情，总平生稀见。\n画图中、旧识春风面。\n谁知道、自到瑶台畔。\n眷恋雨润云温，苦惊风吹散。\n念荒寒、寄宿无人馆。\n重门闭、败壁秋虫叹。\n怎奈向、一缕相思，隔溪山不断。",
        pinyin: "yè sè cuī gèng， qīng chén shōu lù， xiǎo qǔ yōu fāng yuè àn。\nzhú kǎn dēng chuāng， shí qiū niáng tíng yuàn。\nxiào xiāng yù， sì jué qióng zhī yù shù xiāng yǐ， nuǎn rì míng xiá guāng làn。\nshuǐ miǎn lán qíng， zǒng píng shēng xī jiàn。\nhuà tú zhōng、 jiù shí chūn fēng miàn。\nshuí zhī dào、 zì dào yáo tái pàn。\njuàn liàn yǔ rùn yún wēn， kǔ jīng fēng chuī sàn。\nniàn huāng hán、 jì sù wú rén guǎn。\nzhòng mén bì、 bài bì qiū chóng tàn。\nzěn nài xiàng、 yī lǚ xiāng sī， gé xī shān bù duàn。",
        translation: "夜色催着打更的鼓声，干净的路上收了露水，小巷深处月色昏暗。竹栏边、灯窗下，我认得了秋娘住的庭院。笑着相逢，她像琼枝玉树一样美好，又像暖日明霞那样光彩照人，这样美丽的人一生都少见。谁知道后来好时光像被一阵惊风吹散，如今我寄宿在荒凉寒冷、没有别人的客馆里，重重门关着，秋虫在破墙根叹气。可这一缕相思，隔着溪水山岭也断不了。",
      }
      ],
    },
    {
      title: "尉迟杯 · 周邦彦",
      art: 'songci-rivers:ch242',
      artPrompt: "古诗《尉迟杯》意境插画：隋堤路。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "隋堤路。\n渐日晚、密霭生深树。\n阴阴淡月笼沙，还宿河桥深处。\n无情画舸，都不管、烟波隔南浦。\n等行人、醉拥重衾，载将离恨归去。\n因念旧客京华，长偎傍、疏林小槛欢聚。\n冶叶倡条俱相识，仍惯见、珠歌翠舞。\n如今向、渔村水驿，夜如岁、焚香独自语。\n有何人、念我无，梦魂凝想鸳侣。",
        pinyin: "suí dī lù。\njiàn rì wǎn、 mì ǎi shēng shēn shù。\nyīn yīn dàn yuè lóng shā， hái sù hé qiáo shēn chù。\nwú qíng huà gě， dōu bù guǎn、 yān bō gé nán pǔ。\nděng xíng rén、 zuì yōng zhòng qīn， zǎi jiāng lí hèn guī qù。\nyīn niàn jiù kè jīng huá， cháng wēi bàng、 shū lín xiǎo kǎn huān jù。\nyě yè chàng tiáo jù xiāng shí， réng guàn jiàn、 zhū gē cuì wǔ。\nrú jīn xiàng、 yú cūn shuǐ yì， yè rú suì、 fén xiāng dú zì yǔ。\nyǒu hé rén、 niàn wǒ wú， mèng hún níng xiǎng yuān lǚ。",
        translation: "隋堤路上天渐渐晚了，浓浓的暮霭从深树里升起，淡淡的月光笼着沙岸，船就宿在河桥深处。无情的画船，不管烟波隔着送别的渡口，让醉了的行人裹着厚厚的被子，把一船离恨载了回去。想起从前客居京城，常常在疏林小轩旁欢聚歌舞；如今对着渔村水驿，夜长得像一年，点着香自言自语。有谁惦记我呢，梦里还凝想着心爱的人。",
      }
      ],
    },
    {
      title: "蝶恋花 · 周邦彦",
      art: 'songci-rivers:ch243',
      artPrompt: "古诗《蝶恋花》意境插画：月皎惊乌栖不定。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "月皎惊乌栖不定。\n更漏将残，辘，牵金井。\n唤起两眸清炯炯。\n泪花落枕红棉泠。\n执手霜风吹鬓影。\n去意徊徨，别语愁难听。\n楼上阑干横斗柄。\n露寒人远鸡相应。",
        pinyin: "yuè jiǎo jīng wū qī bù dìng。\ngèng lòu jiāng cán， lù， qiān jīn jǐng。\nhuàn qǐ liǎng móu qīng jiǒng jiǒng。\nlèi huā lào zhěn hóng mián líng。\nzhí shǒu shuāng fēng chuī bìn yǐng。\nqù yì huái huáng， bié yǔ chóu nán tīng。\nlóu shàng lán gān héng dòu bǐng。\nlù hán rén yuǎn jī xiāng yìng。",
        translation: "月光太亮，惊得乌鸦在树上落不安稳。更漏快滴完了，井上的辘轳吱呀转着，把屋里的人唤醒，她的眼睛清亮亮的，泪花落在枕头上。手拉着手送别，秋风吹动鬓发，要走的人来来回回舍不得，离别的愁话让人听不下去。楼上望见北斗星已经横斜，露水寒凉，人走远了，只剩远远近近的鸡叫声一声接一声。",
      }
      ],
    },
    {
      title: "夜飞鹊・夜飞鹊慢 · 周邦彦",
      art: 'songci-rivers:ch244',
      artPrompt: "古诗《夜飞鹊・夜飞鹊慢》意境插画：河桥送人处，凉夜何其。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "河桥送人处，凉夜何其。\n斜月远堕馀辉。\n铜盘烛泪已流尽，霏霏凉露沾衣。\n相将散离会，探风前津鼓，树杪参旗。\n华骢会意，纵扬鞭、亦自行迟。\n迢递路回清野，人语渐无闻，空带愁归。\n何意重红满地，遗钿不见，斜径都迷。\n兔葵燕麦，向残阳、欲与人齐。\n但徘徊班草，欷酹酒，极望天西。",
        pinyin: "hé qiáo sòng rén chù， liáng yè hé qí。\nxié yuè yuǎn duò yú huī。\ntóng pán zhú lèi yǐ liú jìn， fēi fēi liáng lù zhān yī。\nxiāng jiāng sàn lí huì， tàn fēng qián jīn gǔ， shù miǎo cān qí。\nhuá cōng huì yì， zòng yáng biān、 yì zì xíng chí。\ntiáo dì lù huí qīng yě， rén yǔ jiàn wú wén， kōng dài chóu guī。\nhé yì zhòng hóng mǎn dì， yí diàn bù jiàn， xié jìng dōu mí。\ntù kuí yàn mài， xiàng cán yáng、 yù yǔ rén qí。\ndàn pái huái bān cǎo， xī lèi jiǔ， jí wàng tiān xī。",
        translation: "在河桥送别的地方，夜又凉又深，斜月远远落下去只剩一点余光，烛泪流尽，凉凉的露水沾湿了衣裳。送别的酒席散了，马像懂得人的心事，扬着鞭它也走得慢慢的；一路走过清冷的原野，人声渐渐听不见了，只能白白带着愁回去。没想到旧地落红铺满地面，小路都认不清了，野草迎着残阳长得快跟人一样高，我只能徘徊坐在草上，叹着气洒酒遥望，一直望向天的西边。",
      }
      ],
    },
    {
      title: "关河令・清商怨 · 周邦彦",
      art: 'songci-rivers:ch245',
      artPrompt: "古诗《关河令・清商怨》意境插画：秋阴时晴渐向暝，变一庭凄冷。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "秋阴时晴渐向暝，变一庭凄冷。\n伫听寒声，云深无雁影。\n更深人去寂静。\n但照壁、孤灯相映。\n酒已都醒，如何消夜永。",
        pinyin: "qiū yīn shí qíng jiàn xiàng míng， biàn yī tíng qī lěng。\nzhù tīng hán shēng， yún shēn wú yàn yǐng。\ngèng shēn rén qù jì jìng。\ndàn zhào bì、 gū dēng xiāng yìng。\njiǔ yǐ dōu xǐng， rú hé xiāo yè yǒng。",
        translation: "秋天的阴天偶尔放晴，天色渐渐黑下来，满院子变得凄凉冷清。站着听寒风的声音，云层深厚，看不见大雁的影子。夜更深，人走净了，一片寂静，只有一盏孤灯照着墙壁。酒意全都醒了，这漫漫的长夜要怎么挨过去啊。",
      }
      ],
    },
    {
      title: "南浦 · 孔夷",
      art: 'songci-rivers:ch246',
      artPrompt: "古诗《南浦》意境插画：风悲画角，听单于、三弄落谯门。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "风悲画角，听单于、三弄落谯门。\n投宿征骑，飞雪满孤村。\n酒市渐闲灯火，正敲窗、乱叶舞纷纷。\n送数声惊雁，下离烟水，嘹唳度寒云。\n好在半胧溪月，到如今、无处不销魂。\n故国梅花归梦，愁损绿罗裙。\n为问暗香闲艳，也相思、万点付啼痕。\n算翠屏应是，两眉馀恨倚黄昏。",
        pinyin: "fēng bēi huà jiǎo， tīng chán yú、 sān nòng luò qiáo mén。\ntóu sù zhēng qí， fēi xuě mǎn gū cūn。\njiǔ shì jiàn xián dēng huǒ， zhèng qiāo chuāng、 luàn yè wǔ fēn fēn。\nsòng shù shēng jīng yàn， xià lí yān shuǐ， liáo lì dù hán yún。\nhǎo zài bàn lóng xī yuè， dào rú jīn、 wú chù bù xiāo hún。\ngù guó méi huā guī mèng， chóu sǔn lǜ luó qún。\nwèi wèn àn xiāng xián yàn， yě xiāng sī、 wàn diǎn fù tí hén。\nsuàn cuì píng yìng shì， liǎng méi yú hèn yǐ huáng hūn。",
        translation: "风里传来悲凉的号角声，城楼上把曲子吹了一遍又一遍。赶路的人骑马去投宿，飞雪落满孤单的村子。酒市的灯火渐渐稀了，乱叶纷纷敲打着窗户，几声惊起的雁叫着飞过寒云。还好有半弯朦胧的溪月，可到如今，见月就处处叫人心碎。梦里回到故乡看梅花，愁坏了家里穿绿裙的人；那梅花也带着相思，万点花像万点泪痕，她此刻大概正倚着屏风，双眉含恨立在黄昏里。",
      }
      ],
    },
    {
      title: "临江仙 · 晁冲之",
      art: 'songci-rivers:ch247',
      artPrompt: "古诗《临江仙》意境插画：忆昔西池池上饮，年年多少欢娱。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "忆昔西池池上饮，年年多少欢娱。\n别来不寄一行书。\n寻常相见了，犹道不如初。\n安稳锦屏今夜梦，月明好度江湖。\n相思休问定何如。\n情知春去后，管得落花无。",
        pinyin: "yì xī xī chí chí shàng yǐn， nián nián duō shǎo huān yú。\nbié lái bù jì yī háng shū。\nxún cháng xiāng jiàn le， yóu dào bù rú chū。\nān wěn jǐn píng jīn yè mèng， yuè míng hǎo dù jiāng hú。\nxiāng sī xiū wèn dìng hé rú。\nqíng zhī chūn qù hòu， guǎn dé luò huā wú。",
        translation: "记得从前在西池上喝酒，年年有多少欢乐；分别以后连一行字、一封信也没有寄来。就算平常见了面，也回不到当初那样亲热了。今夜但愿在安稳的好梦里，趁着明月渡过江湖去看你。相思的事不必多问，明知道春天都过去了，谁还管得住落花不落呢。",
      }
      ],
    },
    {
      title: "惜分飞 · 毛滂",
      art: 'songci-rivers:ch248',
      artPrompt: "古诗《惜分飞》意境插画：泪湿阑干花著露。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "泪湿阑干花著露。\n愁到眉峰碧聚。\n此恨平分取。\n更无言语。\n空相觑。\n短雨残云无意绪。\n寂寞朝朝暮暮。\n今夜山深处。\n断魂分付。\n潮回去。",
        pinyin: "lèi shī lán gān huā zhù lù。\nchóu dào méi fēng bì jù。\ncǐ hèn píng fēn qǔ。\ngèng wú yán yǔ。\nkōng xiāng qù。\nduǎn yǔ cán yún wú yì xù。\njì mò zhāo zhāo mù mù。\njīn yè shān shēn chù。\nduàn hún fēn fù。\ncháo huí qù。",
        translation: "泪水流满脸，像花儿挂着露水；愁压着眉头，像两个碧绿的山峰聚在一起。这份离愁，咱们两人平分。再没有别的话，只是呆呆地你看着我、我看着你。此后风雨连天，没心没绪，朝朝暮暮都是寂寞；今夜我在这大山深处，把断肠的心事托付给潮水，让它带回去给你。",
      }
      ],
    },
    {
      title: "天香 · 王沂孙",
      art: 'songci-rivers:ch249',
      artPrompt: "古诗《天香》意境插画：孤峤蟠烟，层涛蜕月，骊宫夜采铅水。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "孤峤蟠烟，层涛蜕月，骊宫夜采铅水。\n讯远槎风，梦深薇露，化作断魂心字。\n红瓷候火，还乍识、冰环玉指。\n一缕萦帘翠影，依稀海天云气。\n几回娇半醉。\n翦春灯、夜寒花碎。\n更好故溪飞雪，小窗深闭。\n荀令如今顿老，总忘却、樽前旧风味。\n谩惜馀熏，空篝素被。",
        pinyin: "gū qiáo pán yān， céng tāo tuì yuè， lí gōng yè cǎi qiān shuǐ。\nxùn yuǎn chá fēng， mèng shēn wēi lù， huà zuò duàn hún xīn zì。\nhóng cí hòu huǒ， hái zhà shí、 bīng huán yù zhǐ。\nyī lǚ yíng lián cuì yǐng， yī xī hǎi tiān yún qì。\njǐ huí jiāo bàn zuì。\njiǎn chūn dēng、 yè hán huā suì。\ngèng hǎo gù xī fēi xuě， xiǎo chuāng shēn bì。\nxún lìng rú jīn dùn lǎo， zǒng wàng què、 zūn qián jiù fēng wèi。\nmàn xī yú xūn， kōng gōu sù bèi。",
        translation: "孤耸的山峰盘绕着烟，层层海涛上月亮像从壳里蜕出来，人们夜里下海采回制香的材料。远方的消息顺着海风传来，梦里化成香料，做成一炷袅袅的香。红瓷盒守着火候，点起来烟像冰环玉指，一缕翠色的影子绕着帘子，像海天之间的云气。多少回她带着微醺剪亮春灯，夜寒里灯花碎闪，更好的是小溪飞雪的夜里，小窗紧紧关着，熏着一炉香。如今人老了，早忘了酒席前的旧日香气，只空空地怜惜熏笼素被上剩下的一点香。",
      }
      ],
    },
    {
      title: "眉妩 · 王沂孙",
      art: 'songci-rivers:ch250',
      artPrompt: "古诗《眉妩》意境插画：渐新痕悬柳，澹彩穿花，依约破初暝。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "渐新痕悬柳，澹彩穿花，依约破初暝。\n便有团圆意，深深拜，相逢谁在香径。\n画眉未稳，料素娥、犹带离恨。\n最堪爱、一曲银钩小，宝帘挂秋冷。\n千古盈亏休问。\n叹慢磨玉斧，难补金镜。\n太液池犹在，凄凉处、何人重赋清景。\n故山夜永。\n试待他、窥户端正。\n看云外山河，还老尽、桂花影。",
        pinyin: "jiàn xīn hén xuán liǔ， dàn cǎi chuān huā， yī yuē pò chū míng。\nbiàn yǒu tuán yuán yì， shēn shēn bài， xiāng féng shuí zài xiāng jìng。\nhuà méi wèi wěn， liào sù é、 yóu dài lí hèn。\nzuì kān ài、 yī qǔ yín gōu xiǎo， bǎo lián guà qiū lěng。\nqiān gǔ yíng kuī xiū wèn。\ntàn màn mó yù fǔ， nán bǔ jīn jìng。\ntài yè chí yóu zài， qī liáng chù、 hé rén zhòng fù qīng jǐng。\ngù shān yè yǒng。\nshì dài tā、 kuī hù duān zhèng。\nkàn yún wài shān hé， hái lǎo jìn、 guì huā yǐng。",
        translation: "一弯新月渐渐挂在柳梢，淡淡的光穿过花丛，天刚黑就把夜照亮了。像有了团圆的意思，人们深深下拜，可是当年一起赏月的香径里还有谁呢。新月亮得像没画完的眉毛，想来月里的嫦娥也还带着离恨；最可爱的是那弯小小的银钩，像宝帘上挂着的一钩秋凉。月亮的圆了缺了，千古以来不必去问，叹就算把玉斧磨快了，也难把金镜补圆。故乡的山中长夜漫漫，等它长得端端正正来照窗户吧，那时看云外的山河，连桂花的影子都一同变老了。",
      }
      ],
    },
    {
      title: "齐天乐 · 王沂孙",
      art: 'songci-rivers:ch251',
      artPrompt: "古诗《齐天乐》意境插画：一襟馀恨宫魂断，年年翠阴庭树。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "一襟馀恨宫魂断，年年翠阴庭树。\n乍咽凉柯，还移暗叶，重把离愁深诉。\n西窗过雨。\n怪瑶佩流空，玉筝调柱。\n镜暗妆残，为谁娇鬓尚如许。\n铜仙铅泪似洗，叹携盘去远，难贮零露。\n病翼惊秋，枯形阅世，消得斜阳几度。\n馀音更苦。\n甚独抱清高，顿成凄楚。\n谩想薰风，柳丝千万缕。",
        pinyin: "yī jīn yú hèn gōng hún duàn， nián nián cuì yīn tíng shù。\nzhà yàn liáng kē， hái yí àn yè， zhòng bǎ lí chóu shēn sù。\nxī chuāng guò yǔ。\nguài yáo pèi liú kōng， yù zhēng tiáo zhù。\njìng àn zhuāng cán， wèi shuí jiāo bìn shàng rú xǔ。\ntóng xiān qiān lèi sì xǐ， tàn xié pán qù yuǎn， nán zhù líng lù。\nbìng yì jīng qiū， kū xíng yuè shì， xiāo dé xié yáng jǐ dù。\nyú yīn gèng kǔ。\nshèn dú bào qīng gāo， dùn chéng qī chǔ。\nmàn xiǎng xūn fēng， liǔ sī qiān wàn lǚ。",
        translation: "满腔的遗恨随着宫女的魂魄断去了，年年的蝉都躲在庭树的绿荫里。它刚在凉凉的枝头呜咽，又移进暗暗的树叶里，把离愁深深地诉说；西窗下刚下过雨，它的叫声像玉佩在空中流动，又像玉筝在调弦。铜人载着承露盘远远离去，泪水像铅水一样流个不停，从此再难承接花叶上的清露。病了的翅膀惊觉秋天来了，枯瘦的身体看着世间变换，还能禁得住几次斜阳呢。剩下的叫声更苦，独独抱着一身清高，转眼变成凄凉，空回想当年南风吹拂、柳丝千万条的时候。",
      }
      ],
    },
    {
      title: "高阳台 · 王沂孙",
      art: 'songci-rivers:ch252',
      artPrompt: "古诗《高阳台》意境插画：残雪庭阴，轻寒帘影，霏霏玉管春葭。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "残雪庭阴，轻寒帘影，霏霏玉管春葭。\n小帖金泥，不知春在谁家。\n相思一夜窗前梦，奈个人、水隔天遮。\n但凄然，满树幽香，满地横斜。\n江南自是离愁苦，况游骢古道，归雁平沙。\n怎得银笺，殷勤与说年华。\n如今处处生芳草，纵凭高、不见天涯。\n更消他，几度东风，几度飞花。",
        pinyin: "cán xuě tíng yīn， qīng hán lián yǐng， fēi fēi yù guǎn chūn jiā。\nxiǎo tiē jīn ní， bù zhī chūn zài shuí jiā。\nxiāng sī yī yè chuāng qián mèng， nài gè rén、 shuǐ gé tiān zhē。\ndàn qī rán， mǎn shù yōu xiāng， mǎn dì héng xié。\njiāng nán zì shì lí chóu kǔ， kuàng yóu cōng gǔ dào， guī yàn píng shā。\nzěn dé yín jiān， yīn qín yǔ shuō nián huá。\nrú jīn chù chù shēng fāng cǎo， zòng píng gāo、 bù jiàn tiān yá。\ngèng xiāo tā， jǐ dù dōng fēng， jǐ dù fēi huā。",
        translation: "残雪积在庭院的阴处，轻寒透过帘子，玉管吹出春天要来的消息。金泥小帖子传着春讯，却不知道春天到了谁家。相思了一夜，梦到窗前，无奈那个人隔着水、隔着天，只剩满树梅花的幽香、满地横斜的影子，叫人凄然。江南的离愁本来就苦，何况古道上有奔马，平沙上有归雁，想用银色的信纸把这些年的光阴细细说一说。如今处处长满芳草，登得再高也望不见天涯，怎么经得起一遍遍的东风、一阵阵的飞花。",
      }
      ],
    },
    {
      title: "法曲献仙音 · 王沂孙",
      art: 'songci-rivers:ch253',
      artPrompt: "古诗《法曲献仙音》意境插画：层绿峨峨，纤琼皎皎，倒压波痕清浅。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "层绿峨峨，纤琼皎皎，倒压波痕清浅。\n过眼年华，动人幽意，相逢几番春换。\n记唤酒寻芳处，盈盈褪妆晚。\n已销黯。\n况凄凉、近来离思，应忘却、明月夜深归辇。\n荏苒一枝春，恨东风、人似天远。\n纵有残花，洒征衣、铅泪都满。\n但殷勤折取，自遣一襟幽怨。",
        pinyin: "céng lǜ é é， xiān qióng jiǎo jiǎo， dǎo yā bō hén qīng qiǎn。\nguò yǎn nián huá， dòng rén yōu yì， xiāng féng jǐ fān chūn huàn。\njì huàn jiǔ xún fāng chù， yíng yíng tuì zhuāng wǎn。\nyǐ xiāo àn。\nkuàng qī liáng、 jìn lái lí sī， yìng wàng què、 míng yuè yè shēn guī niǎn。\nrěn rǎn yī zhī chūn， hèn dōng fēng、 rén sì tiān yuǎn。\nzòng yǒu cán huā， sǎ zhēng yī、 qiān lèi dōu mǎn。\ndàn yīn qín zhé qǔ， zì qiǎn yī jīn yōu yuàn。",
        translation: "层层绿萼高高的，洁白的花瓣像细细的白玉，倒映在清浅的水波上。年华从眼前流过，动人的心事，相逢时春天已换了几回。记得当年唤酒寻芳的地方，她盈盈的晚妆久久才褪。如今情景黯淡，加上近来凄凉的离思，明月夜深回宫的旧事早该忘了。一枝春光慢慢过去，恨东风里人远得像隔着天，纵然有残花洒在行衣上、泪痕满面，也只好殷勤地折下一枝，排遣自己满心的幽怨。",
      }
      ],
    },
    {
      title: "长亭怨・长亭怨慢 · 王沂孙",
      art: 'songci-rivers:ch254',
      artPrompt: "古诗《长亭怨・长亭怨慢》意境插画：泛孤艇、东皋过遍。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "泛孤艇、东皋过遍。\n尚记当日，绿阴门掩。\n屐齿莓阶，酒痕罗袖事何限。\n欲寻前迹，空惆怅、成秋苑。\n自约赏花人，别后总、风流云散。\n水远。\n怎知流水外，却是乱山尤远。\n天涯梦短。\n想忘了、绮疏雕槛。\n望不尽、苒苒斜阳，抚乔木、年华将晚。\n但数点红英，犹识西园凄婉。",
        pinyin: "fàn gū tǐng、 dōng gāo guò biàn。\nshàng jì dāng rì， lǜ yīn mén yǎn。\njī chǐ méi jiē， jiǔ hén luó xiù shì hé xiàn。\nyù xún qián jì， kōng chóu chàng、 chéng qiū yuàn。\nzì yuē shǎng huā rén， bié hòu zǒng、 fēng liú yún sàn。\nshuǐ yuǎn。\nzěn zhī liú shuǐ wài， què shì luàn shān yóu yuǎn。\ntiān yá mèng duǎn。\nxiǎng wàng le、 qǐ shū diāo kǎn。\nwàng bù jìn、 rǎn rǎn xié yáng， fǔ qiáo mù、 nián huá jiāng wǎn。\ndàn shù diǎn hóng yīng， yóu shí xī yuán qī wǎn。",
        translation: "划着一只小船，把东皋一带都走遍了。还记得当年绿荫掩着门，木鞋踩过长满青苔的台阶，衣袖上留着酒痕，往事说不完。想寻找从前的踪迹，只空自惆怅，园子已经像深秋一样荒凉；当年约好一起赏花的人，分别后都像风一样飘走、云一样散了。水已经远了，可谁想到流水之外，还有更远的乱山。人在天涯，梦也短，望不尽慢慢移去的斜阳，抚摸着高大的树，只觉得年华已晚，只剩下几点红花，还认得西园的凄凉。",
      }
      ],
    },
    {
      title: "紫萸香慢 · 姚云文",
      art: 'songci-rivers:ch255',
      artPrompt: "古诗《紫萸香慢》意境插画：近重阳、偏多风雨，绝怜此日暄明。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "近重阳、偏多风雨，绝怜此日暄明。\n问秋香浓未，待携客、出西城。\n正自羁怀多感，怕荒台高处，更不胜情。\n向尊前、又忆洒酒插花人。\n只座上、已无老兵。\n凄情。\n浅醉还醒。\n愁不肯、与诗平。\n记长楸走马，雕弓笮柳，前事休评。\n紫萸一枝传赐，梦谁到、汉家陵。\n尽乌纱、便随风去，要天知道，华发如此星星。\n歌罢涕零。",
        pinyin: "jìn chóng yáng、 piān duō fēng yǔ， jué lián cǐ rì xuān míng。\nwèn qiū xiāng nóng wèi， dài xié kè、 chū xī chéng。\nzhèng zì jī huái duō gǎn， pà huāng tái gāo chù， gèng bù shèng qíng。\nxiàng zūn qián、 yòu yì sǎ jiǔ chā huā rén。\nzhī zuò shàng、 yǐ wú lǎo bīng。\nqī qíng。\nqiǎn zuì hái xǐng。\nchóu bù kěn、 yǔ shī píng。\njì cháng qiū zǒu mǎ， diāo gōng zé liǔ， qián shì xiū píng。\nzǐ yú yī zhī chuán cì， mèng shuí dào、 hàn jiā líng。\njìn wū shā、 biàn suí fēng qù， yào tiān zhī dào， huá fà rú cǐ xīng xīng。\ngē bà tì líng。",
        translation: "快到重阳，偏偏风雨多，更爱怜今天这样温暖晴明的日子。问问秋香浓不浓，想带着客人出西城走走。可漂泊在外的愁绪太多，怕登上荒台高处更受不住；对着酒杯，又想念从前一起斟酒、头上插花的人，如今座上已经没有那些老朋友了。心里凄凉，浅浅醉了又醒，愁不肯跟诗和解；从前骑马奔驰、张弓射柳的旧事都不要再提了。重阳赐茱萸的荣耀只在梦里，谁还能梦到汉家的陵园。随乌纱帽被风吹去吧，只要老天知道，我这白发已经这么星星点点了，唱完歌，眼泪落了下来。",
      }
      ],
    },
    {
      title: "贺新郎 · 蒋捷",
      art: 'songci-rivers:ch256',
      artPrompt: "古诗《贺新郎》意境插画：梦冷黄金屋。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "梦冷黄金屋。\n叹秦筝、斜鸿阵里，素弦尘扑。\n化作娇莺飞归去，犹认纱窗旧绿。\n正过雨、荆桃如菽。\n此恨难平君知否，似琼台、涌起弹棋局。\n消瘦影，嫌明烛。\n鸳楼碎泻东西玉。\n问芳、何时再展，翠钗难卜。\n待把宫眉横云样，描上生绡画幅。\n怕不是、新来妆束。\n彩扇红牙今都在，恨无人、解听开元曲。\n空掩袖，倚寒竹。",
        pinyin: "mèng lěng huáng jīn wū。\ntàn qín zhēng、 xié hóng zhèn lǐ， sù xián chén pū。\nhuà zuò jiāo yīng fēi guī qù， yóu rèn shā chuāng jiù lǜ。\nzhèng guò yǔ、 jīng táo rú shū。\ncǐ hèn nán píng jūn zhī fǒu， sì qióng tái、 yǒng qǐ tán qí jú。\nxiāo shòu yǐng， xián míng zhú。\nyuān lóu suì xiè dōng xī yù。\nwèn fāng、 hé shí zài zhǎn， cuì chāi nán bǔ。\ndài bǎ gōng méi héng yún yàng， miáo shàng shēng xiāo huà fú。\npà bù shì、 xīn lái zhuāng shù。\ncǎi shàn hóng yá jīn dōu zài， hèn wú rén、 jiě tīng kāi yuán qǔ。\nkōng yǎn xiù， yǐ hán zhú。",
        translation: "梦醒了，连黄金屋也是冷的。叹那张秦筝斜排的弦柱上，素白的弦落满尘土。我像一只娇莺飞回去，还认得纱窗上的旧绿；刚下过雨，樱桃结的小果子只有豆子大。这恨难平你知道吗，就像平整的棋盘上突然涌起棋局，瘦瘦的影子连明亮的烛光都嫌刺眼。鸳鸯楼碎了，问芬芳什么时候能再见，连翠钗占卜也难说准。想把宫眉如云的样子描在画幅上，又怕描出来的不是如今的新妆束；彩扇红牙板都还在，恨没有人能听懂当年的旧曲，只好空掩着袖子，倚着寒冷的竹子。",
      }
      ],
    },
    {
      title: "女冠子 · 蒋捷",
      art: 'songci-rivers:ch257',
      artPrompt: "古诗《女冠子》意境插画：蕙花香也。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "蕙花香也。\n雪晴池馆如画。\n春风飞到，宝钗楼上，一片笙箫，琉璃光射。\n而今灯漫挂。\n不是暗尘明月，那时元夜。\n况年来、心懒意怯，羞与蛾儿争要。\n江城人悄初更打。\n问繁华谁解，再向天公借。\n剔残红灺。\n但梦里隐隐，钿车罗帕。\n吴笺银粉砑。\n待把旧家风景，写成闲话。\n笑绿鬟邻女，倚窗犹唱，夕阳西下。",
        pinyin: "huì huā xiāng yě。\nxuě qíng chí guǎn rú huà。\nchūn fēng fēi dào， bǎo chāi lóu shàng， yī piàn shēng xiāo， liú lí guāng shè。\nér jīn dēng màn guà。\nbù shì àn chén míng yuè， nà shí yuán yè。\nkuàng nián lái、 xīn lǎn yì qiè， xiū yǔ é ér zhēng yào。\njiāng chéng rén qiāo chū gèng dǎ。\nwèn fán huá shuí jiě， zài xiàng tiān gōng jiè。\ntī cán hóng xiè。\ndàn mèng lǐ yǐn yǐn， diàn chē luó pà。\nwú jiān yín fěn yà。\ndài bǎ jiù jiā fēng jǐng， xiě chéng xián huà。\nxiào lǜ huán lín nǚ， yǐ chuāng yóu chàng， xī yáng xī xià。",
        translation: "蕙花香啊，雪后晴朗的池馆像画一样。那时春风吹到宝钗楼上，一片笙箫声，琉璃灯的光四处放射；如今灯只是随随便便挂着，再不是当年人马踏起暗尘、明月满街的那个元宵夜了。何况这几年来心懒意怯，羞于跟姑娘们争着凑热闹。江城寂静，刚打了初更，这样的繁华，谁能向老天爷再借回来。挑尽残灯的余烬，只在梦里隐隐约约看见华美的车子和罗帕；想在光洁的吴纸上，把旧家的风景写成闲闲的话语。笑那邻家的小姑娘，还倚着窗口唱个不停，直到夕阳西下。",
      }
      ],
    },
    {
      title: "瑞鹤仙 · 蒋捷",
      art: 'songci-rivers:ch258',
      artPrompt: "古诗《瑞鹤仙》意境插画：绀烟迷雁迹。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "绀烟迷雁迹。\n渐断鼓零钟，街喧初息。\n风檠背寒壁。\n放冰蜍飞到，丝丝窗隙。\n琼瑰暗泣。\n念乡关、霜芜似织。\n漫将身、化鹤归来，忘却旧游端的。\n欢极。\n蓬壶蕖浸，花院梨溶，醉连春夕。\n柯云罢弈。\n樱桃在，梦难觅。\n劝清光，乍可幽窗相伴，休照红楼夜笛。\n怕人间、换谱伊凉，素娥未识。",
        pinyin: "gàn yān mí yàn jì。\njiàn duàn gǔ líng zhōng， jiē xuān chū xī。\nfēng qíng bèi hán bì。\nfàng bīng chú fēi dào， sī sī chuāng xì。\nqióng guī àn qì。\nniàn xiāng guān、 shuāng wú sì zhī。\nmàn jiāng shēn、 huà hè guī lái， wàng què jiù yóu duān de。\nhuān jí。\npéng hú qú jìn， huā yuàn lí róng， zuì lián chūn xī。\nkē yún bà yì。\nyīng táo zài， mèng nán mì。\nquàn qīng guāng， zhà kě yōu chuāng xiāng bàn， xiū zhào hóng lóu yè dí。\npà rén jiān、 huàn pǔ yī liáng， sù é wèi shí。",
        translation: "深青的烟霭迷住大雁飞过的痕迹，断续的鼓声钟声渐渐停了，街上的喧闹才息。风里的孤灯背着寒冷的墙，月光从丝丝窗缝里照进来，我暗暗流泪，想念家乡那里密得像织的霜草。就算把身子化成鹤飞回去，也早已忘了旧日游玩的地方。当年的欢乐到了极点：水上荷花浸着月色，花院里梨花像雪，连着几个春夜都喝醉；如今棋局散了，樱桃还在，那样的梦却再难找到。劝月光还是陪着幽静的窗子吧，别去照红楼里的夜笛，怕人间已经换了曲子，连月里嫦娥也不认得了。",
      }
      ],
    },
    {
      title: "甘州・八声甘州 · 张炎",
      art: 'songci-rivers:ch259',
      artPrompt: "古诗《甘州・八声甘州》意境插画：记玉关、踏雪事清游。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "记玉关、踏雪事清游。\n寒气脆貂裘。\n傍枯林古道，长河饮马，此意悠悠。\n短梦依然江表，老泪洒西州。\n一字无题处，落叶都愁。\n载取白云归去，问谁留楚佩，弄影中洲。\n折芦花赠远，零落一身秋。\n向寻常野桥流水，待招来、不是旧沙鸥。\n空怀感，有斜阳处，却怕登楼。",
        pinyin: "jì yù guān、 tà xuě shì qīng yóu。\nhán qì cuì diāo qiú。\nbàng kū lín gǔ dào， cháng hé yǐn mǎ， cǐ yì yōu yōu。\nduǎn mèng yī rán jiāng biǎo， lǎo lèi sǎ xī zhōu。\nyī zì wú tí chù， luò yè dōu chóu。\nzǎi qǔ bái yún guī qù， wèn shuí liú chǔ pèi， nòng yǐng zhōng zhōu。\nzhé lú huā zèng yuǎn， líng luò yī shēn qiū。\nxiàng xún cháng yě qiáo liú shuǐ， dài zhāo lái、 bù shì jiù shā ōu。\nkōng huái gǎn， yǒu xié yáng chù， què pà dēng lóu。",
        translation: "还记得在玉门关外踏雪清游，寒气把貂裘都冻脆了。靠着枯林古道，在长河边饮马，那时的意兴多么悠长。如今短梦醒来还在江南，老泪洒在西州，一个字也没处题，连落叶都带着愁。如今载着一片白云归去，折一枝芦花送给远方的友人，自己落得一身秋意。对着寻常的野桥流水，招来的也不是旧日的沙鸥了；空怀着感慨，凡是斜阳照着的地方，反倒怕去登楼远望。",
      }
      ],
    },
    {
      title: "渡江云 · 张炎",
      art: 'songci-rivers:ch260',
      artPrompt: "古诗《渡江云》意境插画：山空天入海，倚楼望极，风急暮潮初。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "山空天入海，倚楼望极，风急暮潮初。\n一帘鸠外雨，几处闲田，隔水动春锄。\n新烟禁柳，想如今、绿到西湖。\n犹记得、当年深隐，门掩两三株。\n愁余。\n荒洲古溆，断梗疏萍，更漂流何处。\n空自觉、围羞带减，影怯灯孤。\n常疑即见桃花面，甚近来、翻笑无书。\n书纵远，如何也都无。",
        pinyin: "shān kōng tiān rù hǎi， yǐ lóu wàng jí， fēng jí mù cháo chū。\nyī lián jiū wài yǔ， jǐ chù xián tián， gé shuǐ dòng chūn chú。\nxīn yān jìn liǔ， xiǎng rú jīn、 lǜ dào xī hú。\nyóu jì de、 dāng nián shēn yǐn， mén yǎn liǎng sān zhū。\nchóu yú。\nhuāng zhōu gǔ xù， duàn gěng shū píng， gèng piāo liú hé chù。\nkōng zì jué、 wéi xiū dài jiǎn， yǐng qiè dēng gū。\ncháng yí jí jiàn táo huā miàn， shèn jìn lái、 fān xiào wú shū。\nshū zòng yuǎn， rú hé yě dōu wú。",
        translation: "山空空的，天像接进大海，倚着楼望到最远处，风很急，暮潮刚刚起来。一帘雨声里斑鸠叫着，几处闲田隔着水开始春耕。宫苑里新烟笼罩的柳树，想来如今已经绿到西湖了吧，还记得当年深深隐居，掩着的门前有两三株树。发愁啊，像荒洲古岸边的断梗浮萍，还要漂到哪里去；只觉得自己腰围瘦了、衣带松了，影子怕见孤灯。常常觉得马上就能见到那张桃花般的脸，怎么近来反而连信都没有；就算路远难寄信，可怎么连一点消息也没有呢。",
      }
      ],
    },
    {
      title: "解连环 · 张炎",
      art: 'songci-rivers:ch261',
      artPrompt: "古诗《解连环》意境插画：楚江空晚。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "楚江空晚。\n怅离群万里，恍然惊散。\n自顾影、欲下寒塘，正沙净草枯，水平天远。\n写不成书，只寄得、相思一点。\n料因循误了，残毡拥雪，故人心眼。\n谁怜旅愁荏苒。\n谩长门夜悄，锦筝弹怨。\n想伴侣、犹宿芦花，也曾念春前，去程应转。\n暮雨相呼，怕蓦地、玉关重见。\n未羞他、双燕归来，画帘半卷。",
        pinyin: "chǔ jiāng kōng wǎn。\nchàng lí qún wàn lǐ， huǎng rán jīng sàn。\nzì gù yǐng、 yù xià hán táng， zhèng shā jìng cǎo kū， shuǐ píng tiān yuǎn。\nxiě bù chéng shū， zhī jì dé、 xiāng sī yī diǎn。\nliào yīn xún wù le， cán zhān yōng xuě， gù rén xīn yǎn。\nshuí lián lǚ chóu rěn rǎn。\nmàn cháng mén yè qiāo， jǐn zhēng tán yuàn。\nxiǎng bàn lǚ、 yóu sù lú huā， yě céng niàn chūn qián， qù chéng yìng zhuǎn。\nmù yǔ xiāng hū， pà mò dì、 yù guān zhòng jiàn。\nwèi xiū tā、 shuāng yàn guī lái， huà lián bàn juàn。",
        translation: "楚江的傍晚空空荡荡。恨自己离了雁群万里，忽然被惊散，看着自己的影子想落进寒冷的池塘，正赶上沙子干净、野草枯黄、水连着天远。孤单得排不成雁字、写不成书信，只能寄出一点相思，怕是一再耽误，辜负了远方老朋友的心意。有谁怜惜这绵长的旅愁，空听长门宫夜里静悄悄，锦筝弹着哀怨。想旧日的伴侣还在芦花里过夜，也许也想着开春以前就往回飞；暮雨里互相呼唤，就怕忽然在玉门关重新见面，那样的话，也不怕羞那画帘半卷里双双归来的燕子。",
      }
      ],
    },
    {
      title: "月下笛 · 张炎",
      art: 'songci-rivers:ch262',
      artPrompt: "古诗《月下笛》意境插画：万里孤云，清游渐远，故人何处。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "万里孤云，清游渐远，故人何处。\n寒窗梦里，犹记经行旧时路。\n连昌约略无多柳，第一是、难听夜雨。\n谩惊回凄悄，相看烛影，拥衾谁语。\n张绪。\n归何暮。\n半零落，依依断桥鸥鹭。\n天涯倦旅。\n此时心事良苦。\n只愁重洒西州泪，问杜曲、人家在否。\n恐翠袖、正天寒，犹倚梅花那树。",
        pinyin: "wàn lǐ gū yún， qīng yóu jiàn yuǎn， gù rén hé chù。\nhán chuāng mèng lǐ， yóu jì jīng xíng jiù shí lù。\nlián chāng yuē lüè wú duō liǔ， dì yī shì、 nán tīng yè yǔ。\nmàn jīng huí qī qiāo， xiāng kàn zhú yǐng， yōng qīn shuí yǔ。\nzhāng xù。\nguī hé mù。\nbàn líng luò， yī yī duàn qiáo ōu lù。\ntiān yá juàn lǚ。\ncǐ shí xīn shì liáng kǔ。\nzhī chóu zhòng sǎ xī zhōu lèi， wèn dù qǔ、 rén jiā zài fǒu。\nkǒng cuì xiù、 zhèng tiān hán， yóu yǐ méi huā nà shù。",
        translation: "万里天上挂着一朵孤云，清雅的游历越来越远，老朋友你在哪里。寒窗下的梦里，还记得从前走过的旧路；连昌宫的柳树大约剩得不多了，最难受的是夜里听雨。惊醒回过神来一片凄凉，对着烛影，拥着被子能跟谁说话。为什么回去得这么晚呢，桥边的鸥鹭已经零落一半，还在那里依依不舍。漂泊天涯的人疲倦了，这时候心里的事真是苦，只怕再洒下伤心的泪，想问问从前住过的那些人家还在不在。恐怕那人衣袖单薄，正在天寒里，倚着梅花那一棵树等我。",
      }
      ],
    },
    {
      title: "点绛唇 · 苏过",
      art: 'songci-rivers:ch263',
      artPrompt: "古诗《点绛唇》意境插画：新月娟娟，夜寒江静山衔斗。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "新月娟娟，夜寒江静山衔斗。\n起来搔首。\n梅影横窗瘦。\n好个霜天，闲却传杯手。\n君知否。\n乱鸦啼后。\n归兴浓如酒。",
        pinyin: "xīn yuè juān juān， yè hán jiāng jìng shān xián dòu。\nqǐ lái sāo shǒu。\nméi yǐng héng chuāng shòu。\nhǎo gè shuāng tiān， xián què chuán bēi shǒu。\njūn zhī fǒu。\nluàn yā tí hòu。\nguī xīng nóng rú jiǔ。",
        translation: "细细的新月弯弯，夜寒里江水安静，远山衔着北斗星。起身搔搔头，梅花的影子横在窗上，清清瘦瘦。好一个霜天，却把举杯传饮的手闲着。你知道吗，乱鸦啼过之后，回乡的兴致比酒还浓。",
      }
      ],
    },
    {
      title: "贺新郎 · 叶梦得",
      art: 'songci-rivers:ch264',
      artPrompt: "古诗《贺新郎》意境插画：睡起啼莺语。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "睡起啼莺语。\n掩青苔、房栊向晚，乱红无数。\n吹尽残花无人见，惟有垂杨自舞。\n渐暖霭、初回轻暑。\n宝扇重寻明月影，暗尘侵、尚有乘鸾女。\n惊旧恨，遽如许。\n江南梦断横江渚。\n浪黏天、葡萄涨绿，半空烟雨。\n无限楼前沧波意，谁采苹花寄取。\n但怅望、兰舟容与。\n万里云帆何时到，送孤鸿、目断千山阻。\n谁为我，唱金缕。",
        pinyin: "shuì qǐ tí yīng yǔ。\nyǎn qīng tái、 fáng lóng xiàng wǎn， luàn hóng wú shù。\nchuī jìn cán huā wú rén jiàn， wéi yǒu chuí yáng zì wǔ。\njiàn nuǎn ǎi、 chū huí qīng shǔ。\nbǎo shàn zhòng xún míng yuè yǐng， àn chén qīn、 shàng yǒu chéng luán nǚ。\njīng jiù hèn， jù rú xǔ。\njiāng nán mèng duàn héng jiāng zhǔ。\nlàng nián tiān、 pú táo zhǎng lǜ， bàn kōng yān yǔ。\nwú xiàn lóu qián cāng bō yì， shuí cǎi píng huā jì qǔ。\ndàn chàng wàng、 lán zhōu róng yǔ。\nwàn lǐ yún fān hé shí dào， sòng gū hóng、 mù duàn qiān shān zǔ。\nshuí wèi wǒ， chàng jīn lǚ。",
        translation: "午睡醒来听见黄莺在叫，青苔掩着门窗，天色向晚，落花已经无数。残花吹尽也没有人看见，只有垂杨自顾自地舞动，暖意渐渐回来，带来初夏的轻暑。重寻宝扇上明月的影子，暗尘里还画着乘鸾的仙女，旧恨猛地涌上心头。江南的梦断在横江的洲渚上，浪头黏着天，绿水涨起来，半空都是烟雨。楼前无限的苍波，有谁采了苹花替我寄去，只能惆怅地望着小船慢慢飘。万里的云帆什么时候才能到，望着孤鸿，目光被千山挡住，有谁为我唱一支金缕曲。",
      }
      ],
    },
    {
      title: "虞美人 · 叶梦得",
      art: 'songci-rivers:ch265',
      artPrompt: "古诗《虞美人》意境插画：落花已作风前舞。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "落花已作风前舞。\n又送黄昏雨。\n晓来庭院半残红。\n惟有游丝千丈、晴空。\n殷勤花下同携手。\n更尽杯中酒。\n美人不用敛蛾眉。\n我亦多情、无奈酒阑时。",
        pinyin: "luò huā yǐ zuò fēng qián wǔ。\nyòu sòng huáng hūn yǔ。\nxiǎo lái tíng yuàn bàn cán hóng。\nwéi yǒu yóu sī qiān zhàng、 qíng kōng。\nyīn qín huā xià tóng xié shǒu。\ngèng jìn bēi zhōng jiǔ。\nměi rén bù yòng liǎn é méi。\nwǒ yì duō qíng、 wú nài jiǔ lán shí。",
        translation: "落花已经在风里跳完舞，又送走黄昏一场雨。早晨的庭院里一半是残红，只有千丈长的游丝飘在晴空。想起从前在花下殷勤地手拉着手，一杯接一杯喝尽杯中的酒。美人不用皱起眉头，我也是多情的人，无奈酒席快散的时候。",
      }
      ],
    },
    {
      title: "喜迁莺 · 刘一止",
      art: 'songci-rivers:ch266',
      artPrompt: "古诗《喜迁莺》意境插画：晓光催角。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "晓光催角。\n听宿鸟未惊，邻鸡先觉。\n迤逦烟村，马嘶人起，残月尚穿林薄。\n泪痕带霜微凝，酒力冲寒犹弱。\n叹倦客、悄不禁，重染风尘京洛。\n追念，人别后，心事万重，难觅孤鸿托。\n翠幌娇深，曲屏香暖，争念岁寒飘泊。\n怨月恨花烦恼，不是不曾经著。\n这情味，望一成消减，新来还恶。",
        pinyin: "xiǎo guāng cuī jiǎo。\ntīng sù niǎo wèi jīng， lín jī xiān jué。\nyǐ lǐ yān cūn， mǎ sī rén qǐ， cán yuè shàng chuān lín báo。\nlèi hén dài shuāng wēi níng， jiǔ lì chōng hán yóu ruò。\ntàn juàn kè、 qiāo bù jīn， zhòng rǎn fēng chén jīng luò。\nzhuī niàn， rén bié hòu， xīn shì wàn chóng， nán mì gū hóng tuō。\ncuì huǎng jiāo shēn， qǔ píng xiāng nuǎn， zhēng niàn suì hán piāo bó。\nyuàn yuè hèn huā fán nǎo， bù shì bù céng jīng zhù。\nzhè qíng wèi， wàng yī chéng xiāo jiǎn， xīn lái hái è。",
        translation: "晨光催响了号角，宿鸟还没惊醒，邻家的鸡先叫了。弯弯的烟村里马嘶人起，残月还照着稀疏的树林。脸上的泪痕带着霜微微凝结，酒力敌不过清晨的寒气，叹我这个疲倦的旅人，禁不住又要去京城沾染风尘。追想分别以后心事重重，难找一只孤雁替我捎信；家里的翠帘深深、屏风香暖，她哪里知道我在寒天里漂泊。怨月恨花的烦恼不是没经历过，这滋味本指望慢慢消减，谁知近来反而更重。",
      }
      ],
    },
    {
      title: "点绛唇 · 汪藻",
      art: 'songci-rivers:ch267',
      artPrompt: "古诗《点绛唇》意境插画：新月娟娟，夜寒江静山衔斗。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "新月娟娟，夜寒江静山衔斗。\n起来搔首。\n梅影横窗瘦。\n好个霜天，闲却传杯手。\n君知否。\n乱鸦啼后。\n归兴浓于酒。",
        pinyin: "xīn yuè juān juān， yè hán jiāng jìng shān xián dòu。\nqǐ lái sāo shǒu。\nméi yǐng héng chuāng shòu。\nhǎo gè shuāng tiān， xián què chuán bēi shǒu。\njūn zhī fǒu。\nluàn yā tí hòu。\nguī xīng nóng yú jiǔ。",
        translation: "细细的新月弯弯，夜寒里江水安静，远山衔着北斗星。起身搔搔头，梅花的影子横在窗上，清清瘦瘦。好一个霜天，却把举杯传饮的手闲着。你知道吗，乱鸦啼过之后，回乡的兴致比酒还浓。",
      }
      ],
    },
    {
      title: "蓦山溪 · 曹组",
      art: 'songci-rivers:ch268',
      artPrompt: "古诗《蓦山溪》意境插画：洗妆真态，不作铅华御。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "洗妆真态，不作铅华御。\n竹外一枝斜，想佳人、天寒日暮。\n黄昏小院，无处著清香，风细细，雪垂垂，何况江头路。\n月边疏影，梦到消魂处。\n结子欲黄时，又须著、廉纤细雨。\n孤芳一世，供断有情愁，销瘦却，东阳也，试问花知否。",
        pinyin: "xǐ zhuāng zhēn tài， bù zuò qiān huá yù。\nzhú wài yī zhī xié， xiǎng jiā rén、 tiān hán rì mù。\nhuáng hūn xiǎo yuàn， wú chù zhù qīng xiāng， fēng xì xì， xuě chuí chuí， hé kuàng jiāng tóu lù。\nyuè biān shū yǐng， mèng dào xiāo hún chù。\njié zǐ yù huáng shí， yòu xū zhù、 lián xiān xì yǔ。\ngū fāng yī shì， gòng duàn yǒu qíng chóu， xiāo shòu què， dōng yáng yě， shì wèn huā zhī fǒu。",
        translation: "梅花像洗去脂粉露出本来面目，不用胭脂水粉打扮，竹子外斜出一枝，像天寒日暮里站着的佳人。黄昏的小院里，清香没处安放，风细细、雪垂垂，更别说江头路上的梅花了。月边稀疏的梅影，梦到最伤心处，等到梅子要黄的时候，又得下着细细的雨。一辈子孤芳自赏，惹尽了有情人的愁，人都瘦了，试问花知道吗。",
      }
      ],
    },
    {
      title: "三台 · 万俟咏",
      art: 'songci-rivers:ch269',
      artPrompt: "古诗《三台》意境插画：见梨花初带夜月，海棠半含朝雨。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "见梨花初带夜月，海棠半含朝雨。\n内苑春、不禁过青门，御沟涨、潜通南浦。\n东风静、细柳垂金缕。\n望凤阙、非烟非雾。\n好时代、朝野多欢，遍九陌、太平箫鼓。\n乍莺儿百啭断续，燕子飞来飞去。\n近绿水、台榭映秋千，斗草聚、双双游女。\n饧香更、酒冷踏青路。\n会暗识、夭桃朱户。\n向晚骤、宝马雕鞍，醉襟惹、乱花飞絮。\n正轻寒轻暖漏永，半阴半晴云暮。\n禁火天、已是试新妆，岁华到、三分佳处。\n清明看、汉宫传蜡炬。\n散翠烟、飞入槐府。\n敛兵卫、阊阖门开，住传宣、又还休务。",
        pinyin: "jiàn lí huā chū dài yè yuè， hǎi táng bàn hán cháo yǔ。\nnèi yuàn chūn、 bù jīn guò qīng mén， yù gōu zhǎng、 qián tōng nán pǔ。\ndōng fēng jìng、 xì liǔ chuí jīn lǚ。\nwàng fèng quē、 fēi yān fēi wù。\nhǎo shí dài、 cháo yě duō huān， biàn jiǔ mò、 tài píng xiāo gǔ。\nzhà yīng ér bǎi zhuàn duàn xù， yàn zi fēi lái fēi qù。\njìn lǜ shuǐ、 tái xiè yìng qiū qiān， dòu cǎo jù、 shuāng shuāng yóu nǚ。\ntáng xiāng gèng、 jiǔ lěng tà qīng lù。\nhuì àn shí、 yāo táo zhū hù。\nxiàng wǎn zhòu、 bǎo mǎ diāo ān， zuì jīn rě、 luàn huā fēi xù。\nzhèng qīng hán qīng nuǎn lòu yǒng， bàn yīn bàn qíng yún mù。\njìn huǒ tiān、 yǐ shì shì xīn zhuāng， suì huá dào、 sān fēn jiā chù。\nqīng míng kàn、 hàn gōng chuán là jù。\nsàn cuì yān、 fēi rù huái fǔ。\nliǎn bīng wèi、 chāng hé mén kāi， zhù chuán xuān、 yòu hái xiū wù。",
        translation: "梨花初带上夜月的清光，海棠半含着早晨的雨。宫苑的春色关不住，御沟的水涨了，悄悄通向远处的河浦；东风静静的，细柳垂下金色丝缕，远远望宫阙，非烟非雾。好时代里朝野都欢喜，京城大街小巷到处是太平的箫鼓；黄莺百啭，燕子飞来飞去，绿水边台榭映着秋千，游女成双成对玩斗草的游戏，踏青的路上飘着饴糖的甜香。傍晚宝马雕鞍飞驰，醉了的衣襟沾满乱花飞絮。正是轻寒轻暖、白天长长的时节，半阴半晴的云到了傍晚；寒食禁火的日子已有人试穿新妆，一年好时光到了三分妙处。清明时宫里传赐新火，翠烟飞进大臣的宅第；撤去卫兵，宫门大开，宣布放假，百官也休息了。",
      }
      ],
    },
    {
      title: "江神子慢・江城子慢 · 田为",
      art: 'songci-rivers:ch270',
      artPrompt: "古诗《江神子慢・江城子慢》意境插画：玉台挂秋月。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "玉台挂秋月。\n铅素浅，梅花傅香雪。\n冰姿洁。\n金莲衬、小小凌波罗袜。\n雨初歇。\n楼外孤鸿声渐远，远山外、行人音信绝。\n此恨对语犹难，那堪更寄书说。\n教人红销翠减，觉衣宽金缕，都为轻别。\n太情切。\n消魂处、画角黄昏时节。\n声呜咽。\n落尽庭花春去也，银蟾迥、无情圆又缺。\n恨伊不似馀香，惹鸳鸯结。",
        pinyin: "yù tái guà qiū yuè。\nqiān sù qiǎn， méi huā fù xiāng xuě。\nbīng zī jié。\njīn lián chèn、 xiǎo xiǎo líng bō luó wà。\nyǔ chū xiē。\nlóu wài gū hóng shēng jiàn yuǎn， yuǎn shān wài、 xíng rén yīn xìn jué。\ncǐ hèn duì yǔ yóu nán， nà kān gèng jì shū shuō。\njiào rén hóng xiāo cuì jiǎn， jué yī kuān jīn lǚ， dōu wèi qīng bié。\ntài qíng qiè。\nxiāo hún chù、 huà jiǎo huáng hūn shí jié。\nshēng wū yàn。\nluò jìn tíng huā chūn qù yě， yín chán jiǒng、 wú qíng yuán yòu quē。\nhèn yī bù sì yú xiāng， rě yuān yāng jié。",
        translation: "玉楼上挂着秋天的月亮。她淡淡妆束，脸像梅花抹着香雪，冰一样洁白，小小的金莲衬着凌波罗袜。雨刚停，楼外孤鸿的叫声渐渐远了，远山外，行人的音信断绝。这样的恨意当面都难以开口，何况靠书信去说。叫人红颜消退、衣带渐松，都为了那次轻易的离别；太让人伤心，最难受是黄昏画角呜咽的时节。庭花落尽，春天去了，月亮遥远又无情，圆了又缺。恨他不像香炉里的余香，还能缠住鸳鸯结。",
      }
      ],
    },
    {
      title: "菩萨蛮 · 陈克",
      art: 'songci-rivers:ch271',
      artPrompt: "古诗《菩萨蛮》意境插画：赤阑桥尽香街直。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "赤阑桥尽香街直。\n笼街细柳娇无力。\n金碧上青空。\n花晴帘影红。\n黄衫飞白马。\n日日青楼下。\n醉眼不逢人。\n午香吹暗尘。",
        pinyin: "chì lán qiáo jìn xiāng jiē zhí。\nlóng jiē xì liǔ jiāo wú lì。\njīn bì shàng qīng kōng。\nhuā qíng lián yǐng hóng。\nhuáng shān fēi bái mǎ。\nrì rì qīng lóu xià。\nzuì yǎn bù féng rén。\nwǔ xiāng chuī àn chén。",
        translation: "红栏杆的桥走到头，是一条笔直的香街，笼罩着街的细柳娇弱无力。金碧辉煌的楼台上接青天，晴天里花影把帘子映得红红的。穿黄衫的少年骑着飞跑的白马，天天在青楼下面转。醉眼朦胧不看人，中午的香气里吹起了暗尘。",
      }
      ],
    },
    {
      title: "菩萨蛮 · 陈克",
      art: 'songci-rivers:ch272',
      artPrompt: "古诗《菩萨蛮》意境插画：绿芜墙绕青苔院。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "绿芜墙绕青苔院。\n中庭日淡芭蕉卷。\n蝴蝶上阶飞。\n烘帘自在垂。\n玉钩双语燕。\n宝甃杨花转。\n几处簸钱声。\n绿窗春睡轻。",
        pinyin: "lǜ wú qiáng rào qīng tái yuàn。\nzhōng tíng rì dàn bā jiāo juàn。\nhú dié shàng jiē fēi。\nhōng lián zì zài chuí。\nyù gōu shuāng yǔ yàn。\nbǎo zhòu yáng huā zhuǎn。\njǐ chù bò qián shēng。\nlǜ chuāng chūn shuì qīng。",
        translation: "绿草的墙绕着长满青苔的院子，院子里日光淡淡，芭蕉的叶子卷着。蝴蝶飞上台阶，帘子自在地垂着。玉帘钩边燕子呢喃着好像在说话，井栏边杨花打着转。几处传来玩簸钱游戏的声音，绿窗里有人春睡正轻。",
      }
      ],
    },
    {
      title: "鹧鸪天 · 周紫芝",
      art: 'songci-rivers:ch273',
      artPrompt: "古诗《鹧鸪天》意境插画：一点残红欲尽时。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "一点残红欲尽时。\n乍凉秋气满屏帏。\n梧桐叶上三更雨，叶叶声声是别离。\n调宝瑟，拨金猊。\n那时同唱鹧鸪词。\n如今风雨西楼夜，不听清歌也泪垂。",
        pinyin: "yī diǎn cán hóng yù jìn shí。\nzhà liáng qiū qì mǎn píng wéi。\nwú tóng yè shàng sān gēng yǔ， yè yè shēng shēng shì bié lí。\ntiáo bǎo sè， bō jīn ní。\nnà shí tóng chàng zhè gū cí。\nrú jīn fēng yǔ xī lóu yè， bù tīng qīng gē yě lèi chuí。",
        translation: "一盏残灯的火苗快熄的时候，秋凉的寒气忽然漫满屏风帷帐。三更的雨落在梧桐叶上，一片叶、一声声，都是别离。想起那时调好宝瑟、拨亮香炉，一起唱着鹧鸪词。如今在西楼的风雨夜里，不用听那清歌，眼泪也自己掉下来。",
      }
      ],
    },
    {
      title: "踏莎行 · 周紫芝",
      art: 'songci-rivers:ch274',
      artPrompt: "古诗《踏莎行》意境插画：情似游丝，人如飞絮。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "情似游丝，人如飞絮。\n泪珠阁定空相觑。\n一溪烟柳万丝垂，无因系得兰舟住。\n雁过斜阳，草迷烟渚。\n如今已是愁无数。\n明朝且做莫思量，如何过得今宵去。",
        pinyin: "qíng sì yóu sī， rén rú fēi xù。\nlèi zhū gé dìng kōng xiāng qù。\nyī xī yān liǔ wàn sī chuí， wú yīn xì dé lán zhōu zhù。\nyàn guò xié yáng， cǎo mí yān zhǔ。\nrú jīn yǐ shì chóu wú shù。\nmíng cháo qiě zuò mò sī liang， rú hé guò dé jīn xiāo qù。",
        translation: "情意像空中飘飘的游丝，人像风中乱飞的柳絮。泪珠含在眼里，只是白白地你望我、我望你。一溪烟柳垂着万条丝，也没法系住将要开走的船。大雁飞过斜阳，草色遮住雾中的小洲，如今已是数不清的愁。明天的事暂且不去想，可今晚这一夜怎么熬得过去啊。",
      }
      ],
    },
    {
      title: "青玉案 · 无名氏",
      art: 'songci-rivers:ch275',
      artPrompt: "古诗《青玉案》意境插画：年年社日停针线。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "年年社日停针线。\n怎忍见、双飞燕。\n今日江城春已半。\n一身犹在，乱山深处，寂寞溪桥畔。\n春衫著破谁针线。\n点点行行泪痕满。\n落日解鞍芳草岸。\n花无人戴，酒无人劝，醉也无人管。",
        pinyin: "nián nián shè rì tíng zhēn xiàn。\nzěn rěn jiàn、 shuāng fēi yàn。\njīn rì jiāng chéng chūn yǐ bàn。\nyī shēn yóu zài， luàn shān shēn chù， jì mò xī qiáo pàn。\nchūn shān zhù pò shuí zhēn xiàn。\ndiǎn diǎn xíng xíng lèi hén mǎn。\nluò rì jiě ān fāng cǎo àn。\nhuā wú rén dài， jiǔ wú rén quàn， zuì yě wú rén guǎn。",
        translation: "每年春社这一天，妇女们都停下针线活，可怎么忍心看见双双飞舞的燕子呢。如今江城的春天已过半，我孤身一人还在乱山深处、冷清的溪桥边。春衫穿破了谁来缝补，破处点点行行，倒像满是泪痕。落日时在长满芳草的岸边解下马鞍：花没有人给戴，酒没有人来劝，醉了也没有人管。",
      }
      ],
    },
    {
      title: "秦楼月・忆秦娥 · 范成大",
      art: 'songci-rivers:ch276',
      artPrompt: "古诗《秦楼月・忆秦娥》意境插画：楼阴缺。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "楼阴缺。\n阑干影卧东厢月。\n东厢月。\n一天风露，杏花如雪。\n隔烟催漏金虬咽。\n罗帏暗淡灯花结。\n灯花结。\n片时春梦，江南天阔。",
        pinyin: "lóu yīn quē。\nlán gān yǐng wò dōng xiāng yuè。\ndōng xiāng yuè。\nyī tiān fēng lù， xìng huā rú xuě。\ngé yān cuī lòu jīn qiú yàn。\nluó wéi àn dàn dēng huā jié。\ndēng huā jié。\npiàn shí chūn mèng， jiāng nán tiān kuò。",
        translation: "楼的影子缺了一角，栏杆的影子躺在东厢的月光里。东厢的月下，满天风露，杏花白得像雪。隔着烟霭，只听见漏壶的水声呜呜咽咽，罗帐昏暗，灯芯结了灯花。就靠着这片刻的春梦，梦到那辽阔的江南。",
      }
      ],
    },
    {
      title: "霜天晓角 · 范成大",
      art: 'songci-rivers:ch277',
      artPrompt: "古诗《霜天晓角》意境插画：晚晴风歇。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "晚晴风歇。\n一夜春折威。\n脉脉花疏天淡，云来去、数枝雪。\n胜绝。\n愁亦绝。\n此情谁共说。\n惟有两行低雁，知人倚、画楼月。",
        pinyin: "wǎn qíng fēng xiē。\nyī yè chūn zhé wēi。\nmò mò huā shū tiān dàn， yún lái qù、 shù zhī xuě。\nshèng jué。\nchóu yì jué。\ncǐ qíng shuí gòng shuō。\nwéi yǒu liǎng háng dī yàn， zhī rén yǐ、 huà lóu yuè。",
        translation: "晚上天放晴了，风也停了，一夜之间春寒的威力就退了。含情脉脉的疏花映着淡淡的天色，云朵来来去去，几枝白花像雪。景色美到极点，愁也浓到极点，这份心情跟谁去说呢。只有两行低飞的大雁，知道有人正倚着画楼看月。",
      }
      ],
    },
    {
      title: "眼儿媚 · 范成大",
      art: 'songci-rivers:ch278',
      artPrompt: "古诗《眼儿媚》意境插画：酣酣日脚紫烟浮。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "酣酣日脚紫烟浮。\n妍暖破轻裘。\n困人天色，醉人花气，午梦扶头。\n春慵恰似春塘水，一片縠纹愁。\n溶溶泄泄，东风无力，欲皱还休。",
        pinyin: "hān hān rì jiǎo zǐ yān fú。\nyán nuǎn pò qīng qiú。\nkùn rén tiān sè， zuì rén huā qì， wǔ mèng fú tóu。\nchūn yōng qià sì chūn táng shuǐ， yī piàn hú wén chóu。\nróng róng xiè xiè， dōng fēng wú lì， yù zhòu hái xiū。",
        translation: "暖融融的日光带着紫色的轻烟浮动，天气暖美得让人脱下厚皮袄。这困人的天气、醉人的花香里，午后的梦昏昏沉沉。春困就像春塘的水，一片细细的波纹都带着愁：水面荡漾，东风没有力气，想把水吹皱又停下来。",
      }
      ],
    },
    {
      title: "六州歌头 · 张孝祥",
      art: 'songci-rivers:ch279',
      artPrompt: "古诗《六州歌头》意境插画：长怀望断，关塞莽然平。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "长怀望断，关塞莽然平。\n征尘暗，霜风劲，悄边声。\n黯销凝。\n追想当年事，殆天数，非人力，洙泗上，弦歌地，亦膻腥。\n隔水毡乡，落日牛羊下，区脱纵横。\n看名王宵猎，骑火一川明。\n笳鼓悲鸣。\n遣人惊。\n念腰间箭，匣中剑，空埃蠹，竟何成。\n时易失，心徒壮，岁将零。\n渺神京。\n干羽方怀远，静烽燧，且休兵。\n冠盖使，纷驰骛，若为情。\n闻道中原遗老，常南望，羽葆霓旌。\n使行人到此，忠愤气填膺。\n有泪如倾。",
        pinyin: "cháng huái wàng duàn， guān sāi mǎng rán píng。\nzhēng chén àn， shuāng fēng jìn， qiāo biān shēng。\nàn xiāo níng。\nzhuī xiǎng dāng nián shì， dài tiān shù， fēi rén lì， zhū sì shàng， xián gē dì， yì shān xīng。\ngé shuǐ zhān xiāng， luò rì niú yáng xià， qū tuō zòng héng。\nkàn míng wáng xiāo liè， qí huǒ yī chuān míng。\njiā gǔ bēi míng。\nqiǎn rén jīng。\nniàn yāo jiān jiàn， xiá zhōng jiàn， kōng āi dù， jìng hé chéng。\nshí yì shī， xīn tú zhuàng， suì jiāng líng。\nmiǎo shén jīng。\ngān yǔ fāng huái yuǎn， jìng fēng suì， qiě xiū bīng。\nguān gài shǐ， fēn chí wù， ruò wèi qíng。\nwén dào zhōng yuán yí lǎo， cháng nán wàng， yǔ bǎo ní jīng。\nshǐ xíng rén dào cǐ， zhōng fèn qì tián yīng。\nyǒu lèi rú qīng。",
        translation: "远远怀想望到天边，关塞都长满荒草，征途的尘土昏暗，霜风猛吹，边境静悄悄的，叫人黯然神伤。回想当年的事，好像是天意不是人力能挽回：连讲学奏乐的礼乐之地，也沾满了腥膻。隔水的敌营毡帐连片，落日下牛羊回圈，哨所纵横；看敌军将领夜里打猎，骑兵的火把照亮整条河，胡笳战鼓悲哀地响，叫人心惊。想腰间的箭、匣中的剑，白白落满灰尘虫蛀，到底成了什么功业；时机容易流失，心里空自壮志，岁月将尽，遥远的京城更渺茫。朝廷正用礼乐去怀柔远人，烽火台安静了暂且休兵，使臣们纷纷奔走，叫人心里怎么过得去。听说中原的遗老们，常常向南张望故国的仪仗，让过路的人到这里，满腔忠愤填在胸口，眼泪像倒出来一样倾泻。",
      }
      ],
    },
    {
      title: "念奴娇 · 张孝祥",
      art: 'songci-rivers:ch280',
      artPrompt: "古诗《念奴娇》意境插画：洞庭青草，近中秋、更无一点风色。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "洞庭青草，近中秋、更无一点风色。\n玉鉴琼田三万顷，著我扁舟一叶。\n素月分辉，明河共影，表里俱澄澈。\n悠然心会，妙处难与君说。\n应念岭海经年，孤光自照，肝肺皆冰雪。\n短发萧骚襟袖冷，稳泛沧浪空阔。\n尽吸西江，细斟北斗，万象为宾客。\n扣舷独笑，不知今夕何夕。",
        pinyin: "dòng tíng qīng cǎo， jìn zhōng qiū、 gèng wú yī diǎn fēng sè。\nyù jiàn qióng tián sān wàn qǐng， zhù wǒ piān zhōu yī yè。\nsù yuè fēn huī， míng hé gòng yǐng， biǎo lǐ jù chéng chè。\nyōu rán xīn huì， miào chù nán yǔ jūn shuō。\nyìng niàn lǐng hǎi jīng nián， gū guāng zì zhào， gān fèi jiē bīng xuě。\nduǎn fà xiāo sāo jīn xiù lěng， wěn fàn cāng làng kōng kuò。\njìn xī xī jiāng， xì zhēn běi dòu， wàn xiàng wèi bīn kè。\nkòu xián dú xiào， bù zhī jīn xī hé xī。",
        translation: "洞庭湖和青草湖连成一片，快到中秋了，湖上一点风也没有。三万顷湖面像玉做的镜子、琼玉的田地，托着我一叶小船；月亮分着光辉，银河一同倒映，里里外外都澄澈透明。这妙处只有心里悠然领会，难以对你说清楚。该想到我在岭南海边过了一年，只有孤月照着我，可我的肝胆都像冰雪一样洁净；稀疏的短发、冷冷的衣袖，我却稳稳地漂在这空阔的波浪上。舀尽西江的水当酒，拿北斗星当勺子细细斟，请天地万物都来做宾客，敲着船舷独自大笑，忘了今晚是哪一天。",
      }
      ],
    }
  ],
  rights: {
    workTitle: "宋词三百首",
    author: "朱祖谋（编）",
    authorDeathYear: 1931,
    translator: '桃阅读',
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: "https://github.com/chinese-poetry/chinese-poetry",
    note: "所收词作者卒年均逾保护期；编者朱祖谋卒于 1931 年，编选内容无独创性。注音与白话译文为平台自撰。",
  },
}
