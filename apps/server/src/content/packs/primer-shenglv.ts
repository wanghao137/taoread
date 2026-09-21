import type { PackBook } from '../types'

/**
 * 《声律启蒙·上卷》——由 scripts/gen-corpus.mjs 从公版语料生成（2026-09-20 全面补全）。
 * 底本：声律启蒙（车万育）。逐字来自语料数据集，译文为平台自撰白话。
 * 通行本全篇；注音与白话译文为平台自撰。
 */
export const shenglvDong: PackBook = {
  id: "shenglv-east",
  title: "声律启蒙·上卷",
  author: "车万育（清）",
  lang: "zh",
  category: "primer",
  ageStage: "6-8",
  intro: "云对雨，雪对风，晚照对晴空。上卷十五个韵部，读着读着就会对对子了。",
  coverArt: "cloud-rain-pair",
  coverArtPrompt: "画面分成两半的可爱小景：一边是白云和太阳，一边是雨点和彩虹，中间一个扎冲天辫的小孩开心地张着手臂，水彩绘本风",
  coverFrom: "#B9835C",
  coverTo: "#EBCFA8",
  source: "《声律启蒙》通行本（车万育，卒 1705），公版",
  chapters: [
    {
      title: "一 东 · 车万育",
      art: 'shenglv-east:ch1',
      artPrompt: "《声律启蒙》一 东韵插画：对联里的山水花鸟，古风贴纸绘本",
      blocks: [
      {
        kind: 'poem',
        text: "云对雨，雪对风，晚照对晴空。来鸿对去燕，宿鸟对鸣虫。三尺剑，六钧弓，岭北对江东。人间清暑殿，天上广寒宫。两岸晓烟杨柳绿，一园春雨杏花红。两鬓风霜，途次早行之客；一蓑烟雨，溪边晚钓之翁。\n沿对革，异对同，白叟对黄童。江风对海雾，牧子对渔翁。颜巷陋，阮途穷，冀北对辽东。池中濯足水，门外打头风。梁帝讲经同泰寺，汉皇置酒未央宫。尘虑萦心，懒抚七弦绿绮；霜华满鬓，羞看百炼青铜。\n贫对富，塞对通，野叟对溪童。鬓皤对眉绿，齿皓对唇红。天浩浩，日融融，佩剑对弯弓。半溪流水绿，千树落花红。野渡燕穿杨柳雨，芳池鱼戏芰荷风。女子眉纤，额下现一弯新月；男儿气壮，胸中吐万丈长虹。",
        pinyin: "yún duì yǔ， xuě duì fēng， wǎn zhào duì qíng kōng。 lái hóng duì qù yàn， sù niǎo duì míng chóng。 sān chǐ jiàn， liù jūn gōng， lǐng běi duì jiāng dōng。 rén jiān qīng shǔ diàn， tiān shàng guǎng hán gōng。 liǎng àn xiǎo yān yáng liǔ lǜ， yī yuán chūn yǔ xìng huā hóng。 liǎng bìn fēng shuāng， tú cì zǎo xíng zhī kè； yī suō yān yǔ， xī biān wǎn diào zhī wēng。\nyán duì gé， yì duì tóng， bái sǒu duì huáng tóng。 jiāng fēng duì hǎi wù， mù zǐ duì yú wēng。 yán xiàng lòu， ruǎn tú qióng， jì běi duì liáo dōng。 chí zhōng zhuó zú shuǐ， mén wài dǎ tóu fēng。 liáng dì jiǎng jīng tóng tài sì， hàn huáng zhì jiǔ wèi yāng gōng。 chén lǜ yíng xīn， lǎn fǔ qī xián lǜ qǐ； shuāng huá mǎn bìn， xiū kàn bǎi liàn qīng tóng。\npín duì fù， sāi duì tōng， yě sǒu duì xī tóng。 bìn pó duì méi lǜ， chǐ hào duì chún hóng。 tiān hào hào， rì róng róng， pèi jiàn duì wān gōng。 bàn xī liú shuǐ lǜ， qiān shù luò huā hóng。 yě dù yàn chuān yáng liǔ yǔ， fāng chí yú xì jì hé fēng。 nǚ zǐ méi xiān， é xià xiàn yī wān xīn yuè； nán ér qì zhuàng， xiōng zhōng tǔ wàn zhàng cháng hóng。",
        translation: "云对雨，雪对风，傍晚的霞光对晴朗的天空。飞来的鸿雁对飞去的燕子，睡着的鸟儿对鸣叫的虫儿。三尺长的剑对六钧重的弓，岭北对江东。人间有清凉的殿，天上有月亮住的宫。两岸清晨的轻烟里杨柳绿了，满园的春雨中杏花红了。风霜染白了鬓角，是清早赶路的客人；披着蓑衣冒雨，是溪边傍晚钓鱼的老翁。白发老人对黄口小儿，江风对海雾，放牛的孩子对打渔的爷爷。颜回住的巷子很简陋，阮籍的路走到了尽头。心头的事缠缠绕绕，懒得去弹那把绿绮琴；霜雪爬满了鬓发，不好意思照那面青铜镜。贫穷对富有，阻塞对通畅，山里的老人对溪边的小孩。雪白的鬓对乌黑的眉，洁白的牙对红润的唇。天空那么广阔，阳光那么温暖，佩带的剑对拉开的弓。半溪流水绿了，千树落花红了。燕子在杨柳雨中穿过野外的渡口，鱼儿在菱荷风里游戏芳香的池塘。小姑娘眉毛细细，额下像挂着一弯新月；小男孩气概壮，胸中像吐出万丈长虹。",
      }
      ],
    },
    {
      title: "二 冬 · 车万育",
      art: 'shenglv-east:ch2',
      artPrompt: "《声律启蒙》二 冬韵插画：对联里的山水花鸟，古风贴纸绘本",
      blocks: [
      {
        kind: 'poem',
        text: "春对夏，秋对冬，暮鼓对晨钟。观山对玩水，绿竹对苍松。冯妇虎，叶公龙，舞蝶对鸣蛩。衔泥双紫燕，课蜜几黄蜂。春日园中莺恰恰，秋天塞外雁雍雍。秦岭云横，迢递八千远路；巫山雨洗，嵯峨十二危峰。\n明对暗，淡对浓，上智对中庸。镜奁对衣笥，野杵对村舂。花灼烁，草蒙茸，九夏对三冬。台高名戏马，斋小号蟠龙。手擘蟹螯从毕卓，身披鹤氅自王恭。五老峰高，秀插云霄如玉笔；三姑石大，响传风雨若金镛。\n仁对义，让对恭，禹舜对羲农。雪花对云叶，芍药对芙蓉。陈后主，汉中宗，绣虎对雕龙。柳塘风淡淡，花圃月浓浓。春日正宜朝看蝶，秋风那更夜闻蛩。战士邀功，必借干戈成勇武；逸民适志，须凭诗酒养疏慵。",
        pinyin: "chūn duì xià， qiū duì dōng， mù gǔ duì chén zhōng。 guān shān duì wán shuǐ， lǜ zhú duì cāng sōng。 féng fù hǔ， yè gōng lóng， wǔ dié duì míng qióng。 xián ní shuāng zǐ yàn， kè mì jǐ huáng fēng。 chūn rì yuán zhōng yīng qià qià， qiū tiān sài wài yàn yōng yōng。 qín lǐng yún héng， tiáo dì bā qiān yuǎn lù； wū shān yǔ xǐ， cuó é shí èr wēi fēng。\nmíng duì àn， dàn duì nóng， shàng zhì duì zhōng yōng。 jìng lián duì yī sì， yě chǔ duì cūn chōng。 huā zhuó shuò， cǎo méng róng， jiǔ xià duì sān dōng。 tái gāo míng xì mǎ， zhāi xiǎo hào pán lóng。 shǒu bò xiè áo cóng bì zhuó， shēn pī hè chǎng zì wáng gōng。 wǔ lǎo fēng gāo， xiù chā yún xiāo rú yù bǐ； sān gū shí dà， xiǎng chuán fēng yǔ ruò jīn yōng。\nrén duì yì， ràng duì gōng， yǔ shùn duì xī nóng。 xuě huā duì yún yè， sháo yào duì fú róng。 chén hòu zhǔ， hàn zhōng zōng， xiù hǔ duì diāo lóng。 liǔ táng fēng dàn dàn， huā pǔ yuè nóng nóng。 chūn rì zhèng yí cháo kàn dié， qiū fēng nà gèng yè wén qióng。 zhàn shì yāo gōng， bì jiè gān gē chéng yǒng wǔ； yì mín shì zhì， xū píng shī jiǔ yǎng shū yōng。",
        translation: "春天对夏天，秋天对冬天，晚上的鼓对早晨的钟。看山对玩水，绿竹对苍松。冯妇敢徒手打虎，叶公满屋子画龙，飞舞的蝴蝶对鸣叫的蟋蟀。双双紫燕衔着泥筑巢，几只黄蜂忙着采花酿蜜。春天园子里黄莺恰恰地叫，秋天塞外大雁雍雍地鸣。秦岭上云雾横着，路远得有八千里；巫山被雨水洗过，高高地立着十二座险峰。明亮对昏暗，淡薄对浓厚，最高的智慧对平平的常人。梳妆的镜匣对放衣的竹箱，野外的捣衣声对村里的舂米声。花开得鲜艳，草长得蓬松，盛夏对隆冬。高台名叫戏马台，小书斋号叫蟠龙斋。掰开蟹脚喝酒的毕卓，身披鹤羽大氅的王恭。五老峰高高的，像玉笔一样插进云霄；三姑石大大的，风声雨声里响得像一口大钟。仁爱对道义，谦让对恭敬，大禹虞舜对伏羲神农。雪花对云叶，芍药对芙蓉。柳塘边风儿淡淡，花圃里月色浓浓。春天的早晨正好看蝴蝶，秋天的夜里正好听蟋蟀。战士要立功，得靠打仗显出勇敢；隐士要自在，得凭诗和酒养出悠闲。",
      }
      ],
    },
    {
      title: "三 江 · 车万育",
      art: 'shenglv-east:ch3',
      artPrompt: "《声律启蒙》三 江韵插画：对联里的山水花鸟，古风贴纸绘本",
      blocks: [
      {
        kind: 'poem',
        text: "楼对阁，户对窗，巨海对长江。蓉裳对蕙帐，玉斝对银釭。青布幔，碧油幢，宝剑对金缸。忠心安社稷，利口覆家邦。世祖中兴延马武，桀王失道杀龙逄。秋雨潇潇，漫烂黄花都满径；春风袅袅，扶疏绿竹正盈窗。\n旌对旆，盖对幢，故国对他邦。千山对万水，九泽对三江。山岌岌，水淙淙，鼓振对钟撞。清风生酒舍，皓月照书窗。阵上倒戈辛纣战，道旁系剑子婴降。夏日池塘，出没浴波鸥对对；春风帘幕，往来营垒燕双双。\n铢对两，只对双，华岳对湘江。朝车对禁鼓，宿火对寒缸。青琐闼，碧纱窗，汉社对周邦。笙箫鸣细细，钟鼓响摐摐。主簿栖鸾名有览，治中展骥姓惟庞。苏武牧羊，雪屡餐于北海；庄周活鲋，水必决于西江。",
        pinyin: "lóu duì gé， hù duì chuāng， jù hǎi duì cháng jiāng。 róng shang duì huì zhàng， yù jiǎ duì yín gāng。 qīng bù màn， bì yóu zhuàng， bǎo jiàn duì jīn gāng。 zhōng xīn ān shè jì， lì kǒu fù jiā bāng。 shì zǔ zhōng xīng yán mǎ wǔ， jié wáng shī dào shā lóng páng。 qiū yǔ xiāo xiāo， màn làn huáng huā dōu mǎn jìng； chūn fēng niǎo niǎo， fú shū lǜ zhú zhèng yíng chuāng。\njīng duì pèi， gài duì zhuàng， gù guó duì tā bāng。 qiān shān duì wàn shuǐ， jiǔ zé duì sān jiāng。 shān jí jí， shuǐ cóng cóng， gǔ zhèn duì zhōng zhuàng。 qīng fēng shēng jiǔ shè， hào yuè zhào shū chuāng。 zhèn shàng dǎo gē xīn zhòu zhàn， dào páng xì jiàn zǐ yīng jiàng。 xià rì chí táng， chū mò yù bō ōu duì duì； chūn fēng lián mù， wǎng lái yíng lěi yàn shuāng shuāng。\nzhū duì liǎng， zhī duì shuāng， huá yuè duì xiāng jiāng。 cháo chē duì jìn gǔ， sù huǒ duì hán gāng。 qīng suǒ tà， bì shā chuāng， hàn shè duì zhōu bāng。 shēng xiāo míng xì xì， zhōng gǔ xiǎng chuāng chuāng。 zhǔ bó qī luán míng yǒu lǎn， zhì zhōng zhǎn jì xìng wéi páng。 sū wǔ mù yáng， xuě lǚ cān yú běi hǎi； zhuāng zhōu huó fù， shuǐ bì jué yú xī jiāng。",
        translation: "楼对阁，门对窗，大海对长江。莲花裙对兰草帐，玉杯对银灯。青布的帐幔，碧油的伞盖，宝剑对金缸。忠心让国家安稳，巧言让家国倾覆。光武帝中兴时收用了猛将马武，夏桀王失了道杀了忠臣关龙逢。秋雨潇潇下，黄花铺满小路；春风轻轻吹，绿竹正长得高过窗户。旌对旆，伞盖对旌幢，故国对他乡。千山对万水，九泽对三江。山高高的，水淙淙地流，擂鼓对撞钟。清风吹过小酒馆，明月照着读书窗。纣王的士兵在阵前倒戈，子婴在道旁系着剑投降。夏天的池塘里，鸥鸟成双成对出没戏水；春风的帘幕外，燕子成双成对飞来筑巢。铢对两，一只对一双，华山对湘江。上朝的车对宫里的鼓，隔夜的火对寒夜的灯。笙箫细细地吹，钟鼓咚咚地响。苏武在北海牧羊，饿了只能吞雪充饥；庄子说的车辙里的小鱼，要引来西江的大水才能救活。",
      }
      ],
    },
    {
      title: "四 支 · 车万育",
      art: 'shenglv-east:ch4',
      artPrompt: "《声律启蒙》四 支韵插画：对联里的山水花鸟，古风贴纸绘本",
      blocks: [
      {
        kind: 'poem',
        text: "茶对酒，赋对诗，燕子对莺儿。栽花对种竹，落絮对游丝。四目颉，一足夔，鸲鹆对鹭鸶。半池红菡萏，一架白荼蘼。几阵秋风能应候，一犁春雨甚知时。智伯恩深，国士吞变形之炭；羊公德大，邑人竖堕泪之碑。\n行对止，速对迟，舞剑对围棋。花笺对草字，竹简对毛锥。汾水鼎，岘山碑，虎豹对熊罴。花开红锦绣，水漾碧琉璃。去妇因探邻舍枣，出妻为种后园葵。笛韵和谐，仙管恰从云里降；橹声咿轧，渔舟正向雪中移。\n戈对甲，鼓对旗，紫燕对黄鹂。梅酸对李苦，青眼对白眉。三弄笛，一围棋，雨打对风吹。海棠春睡早，杨柳昼眠迟。张骏曾为槐树赋，杜陵不作海棠诗。晋士特奇，可比一斑之豹；唐儒博识，堪为五总之龟。",
        pinyin: "chá duì jiǔ， fù duì shī， yàn zi duì yīng ér。 zāi huā duì zhǒng zhú， luò xù duì yóu sī。 sì mù jié， yī zú kuí， qú yù duì lù sī。 bàn chí hóng hàn dàn， yī jià bái tú mí。 jǐ zhèn qiū fēng néng yìng hòu， yī lí chūn yǔ shèn zhī shí。 zhì bó ēn shēn， guó shì tūn biàn xíng zhī tàn； yáng gōng dé dà， yì rén shù duò lèi zhī bēi。\nxíng duì zhǐ， sù duì chí， wǔ jiàn duì wéi qí。 huā jiān duì cǎo zì， zhú jiǎn duì máo zhuī。 fén shuǐ dǐng， xiàn shān bēi， hǔ bào duì xióng pí。 huā kāi hóng jǐn xiù， shuǐ yàng bì liú lí。 qù fù yīn tàn lín shè zǎo， chū qī wèi zhǒng hòu yuán kuí。 dí yùn hé xié， xiān guǎn qià cóng yún lǐ jiàng； lǔ shēng yī yà， yú zhōu zhèng xiàng xuě zhōng yí。\ngē duì jiǎ， gǔ duì qí， zǐ yàn duì huáng lí。 méi suān duì lǐ kǔ， qīng yǎn duì bái méi。 sān nòng dí， yī wéi qí， yǔ dǎ duì fēng chuī。 hǎi táng chūn shuì zǎo， yáng liǔ zhòu mián chí。 zhāng jùn céng wèi huái shù fù， dù líng bù zuò hǎi táng shī。 jìn shì tè qí， kě bǐ yī bān zhī bào； táng rú bó shí， kān wèi wǔ zǒng zhī guī。",
        translation: "茶对酒，赋对诗，燕子对黄莺。栽花对种竹，飘落的柳絮对飘动的游丝。仓颉有四只眼睛，乐官夔只有一只脚，会说话的八哥对白鹭鸶。半池红色的荷花，一架白色的荼蘼。几阵秋风按时节来了，一场春雨正合耕田的时令。智伯待国士恩情深，豫让吞下炭变了形也要为他报仇；羊祜德行大，百姓立起堕泪碑想念他。行走对停止，迅速对缓慢，舞剑对下棋。花笺纸对草书字，竹简对毛笔。汾水出土的鼎，岘山立的碑，虎豹对熊罴。花开得像红色的锦绣，水漾得像碧绿的琉璃。笛声和谐，像仙人的管乐从云里飘下来；橹声咿呀，渔船正往茫茫白雪里摇去。干戈对铠甲，战鼓对军旗，紫燕对黄鹂。梅子酸对李子苦，青眼待人的对眉生白毫的。吹一遍梅花三弄的笛，下一盘围棋，雨打对风吹。海棠花在春晨早早睡去，杨柳在白昼迟迟午眠。晋朝人的见识奇特，一眼能看出豹身上的一块斑纹；唐朝的学者学问广，被比作博学的灵龟。",
      }
      ],
    },
    {
      title: "五 微 · 车万育",
      art: 'shenglv-east:ch5',
      artPrompt: "《声律启蒙》五 微韵插画：对联里的山水花鸟，古风贴纸绘本",
      blocks: [
      {
        kind: 'poem',
        text: "来对往，密对稀，燕舞对莺飞。风清对月朗，露重对烟微。霜菊瘦，雨梅肥，客路对渔矶。晚霞舒锦绣，朝露缀珠玑。夏暑客思欹石枕，秋寒妇念寄边衣。春水才深，青草岸边渔父去；夕阳半落，绿莎原上牧童归。\n宽对猛，是对非，服美对乘肥。珊瑚对玳瑁，锦绣对珠玑。桃灼灼，柳依依，绿暗对红稀。窗前莺并语，帘外燕双飞。汉致太平三尺剑，周臻大定一戎衣。吟成赏月之诗，只愁月堕；斟满送春之酒，惟憾春归。\n声对色，饱对饥，虎节对龙旗。杨花对桂叶，白简对朱衣。尨也吠，燕于飞，荡荡对巍巍。春暄资日气，秋冷借霜威。出使振威冯奉世，治民异等尹翁归。燕我弟兄，载咏棣棠韡韡；命伊将帅，为歌杨柳依依。",
        pinyin: "lái duì wǎng， mì duì xī， yàn wǔ duì yīng fēi。 fēng qīng duì yuè lǎng， lù zhòng duì yān wēi。 shuāng jú shòu， yǔ méi féi， kè lù duì yú jī。 wǎn xiá shū jǐn xiù， cháo lù zhuì zhū jī。 xià shǔ kè sī qī shí zhěn， qiū hán fù niàn jì biān yī。 chūn shuǐ cái shēn， qīng cǎo àn biān yú fù qù； xī yáng bàn luò， lǜ shā yuán shàng mù tóng guī。\nkuān duì měng， shì duì fēi， fú měi duì chéng féi。 shān hú duì dài mào， jǐn xiù duì zhū jī。 táo zhuó zhuó， liǔ yī yī， lǜ àn duì hóng xī。 chuāng qián yīng bìng yǔ， lián wài yàn shuāng fēi。 hàn zhì tài píng sān chǐ jiàn， zhōu zhēn dà dìng yī róng yī。 yín chéng shǎng yuè zhī shī， zhī chóu yuè duò； zhēn mǎn sòng chūn zhī jiǔ， wéi hàn chūn guī。\nshēng duì sè， bǎo duì jī， hǔ jié duì lóng qí。 yáng huā duì guì yè， bái jiǎn duì zhū yī。 méng yě fèi， yàn yú fēi， dàng dàng duì wēi wēi。 chūn xuān zī rì qì， qiū lěng jiè shuāng wēi。 chū shǐ zhèn wēi féng fèng shì， zhì mín yì děng yǐn wēng guī。 yàn wǒ dì xiong， zǎi yǒng dì táng wěi wěi； mìng yī jiàng shuài， wèi gē yáng liǔ yī yī。",
        translation: "来对往，稠密对稀少，跳舞的燕子对飞行的黄莺。风清对月朗，露水重对烟雾轻。霜打的菊花清瘦，雨润的梅子肥大，旅人的路对钓鱼的石矶。晚霞展开像一幅锦绣，朝露点缀像一串珍珠。夏天暑热，客人斜倚石枕想念家乡；秋天寒凉，妻子惦记着给戍边的丈夫寄棉衣。春水刚涨深，青草岸边渔父摇船去了；夕阳落了一半，绿草原上牧童回家了。宽厚对严厉，正确对错误，穿着华美的对骑着肥马的。珊瑚对玳瑁，锦绣对珍珠。桃花开得鲜艳，柳条依依摆动，绿色浓对红色稀。窗前黄莺成对说话，帘外燕子双双飞舞。汉家用三尺剑换来太平，周武王一身戎装成就安定。吟成了赏月的诗，只愁月亮西落；斟满了送春的酒，只恨春天要归。声音对颜色，吃饱对饥饿，虎形的符节对龙的旗帜。杨花对桂叶，白色竹简对红色官服。狗汪汪叫，燕子双双飞，平坦对高峻。春天的温暖靠太阳的热气，秋天的寒冷借了霜的威风。冯奉世出使扬威，尹翁归治民政绩出众。宴请自家的兄弟，唱着棣棠花开得多么繁盛；任命将帅出征，唱着杨柳依依送行。",
      }
      ],
    },
    {
      title: "六 鱼 · 车万育",
      art: 'shenglv-east:ch6',
      artPrompt: "《声律启蒙》六 鱼韵插画：对联里的山水花鸟，古风贴纸绘本",
      blocks: [
      {
        kind: 'poem',
        text: "无对有，实对虚，作赋对观书。绿窗对朱户，宝马对香车。伯乐马，浩然驴，弋雁对求鱼。分金齐鲍叔，奉璧蔺相如。掷地金声孙绰赋，回文锦字窦滔书。未遇殷宗，胥靡困傅岩之筑；既逢周后，太公舍渭水之渔。\n终对始，疾对徐，短褐对华裾。六朝对三国，天禄对石渠。千字策，八行书，有若对相如。花残无戏蝶，藻密有潜鱼。落叶舞风高复下，小荷浮水卷还舒。爱见人长，共服宣尼休假盖；恐彰己吝，谁知阮裕竟焚车。\n麟对凤，鳖对鱼，内史对中书。犁锄对耒耜，畎浍对郊墟。犀角带，象牙梳，驷马对安车。青衣能报赦，黄耳解传书。庭畔有人持短剑，门前无客曳长裾。波浪拍船，骇舟人之水宿；峰峦绕舍，乐隐者之山居。",
        pinyin: "wú duì yǒu， shí duì xū， zuò fù duì guān shū。 lǜ chuāng duì zhū hù， bǎo mǎ duì xiāng chē。 bó lè mǎ， hào rán lǘ， yì yàn duì qiú yú。 fēn jīn qí bào shū， fèng bì lìn xiāng rú。 zhì dì jīn shēng sūn chuò fù， huí wén jǐn zì dòu tāo shū。 wèi yù yīn zōng， xū mí kùn fù yán zhī zhù； jì féng zhōu hòu， tài gōng shè wèi shuǐ zhī yú。\nzhōng duì shǐ， jí duì xú， duǎn hè duì huá jū。 liù cháo duì sān guó， tiān lù duì shí qú。 qiān zì cè， bā háng shū， yǒu ruò duì xiāng rú。 huā cán wú xì dié， zǎo mì yǒu qián yú。 luò yè wǔ fēng gāo fù xià， xiǎo hé fú shuǐ juàn hái shū。 ài jiàn rén cháng， gòng fú xuān ní xiū jià gài； kǒng zhāng jǐ lìn， shuí zhī ruǎn yù jìng fén chē。\nlín duì fèng， biē duì yú， nèi shǐ duì zhōng shū。 lí chú duì lěi sì， quǎn huì duì jiāo xū。 xī jiǎo dài， xiàng yá shū， sì mǎ duì ān chē。 qīng yī néng bào shè， huáng ěr jiě chuán shū。 tíng pàn yǒu rén chí duǎn jiàn， mén qián wú kè yè cháng jū。 bō làng pāi chuán， hài zhōu rén zhī shuǐ sù； fēng luán rào shè， lè yǐn zhě zhī shān jū。",
        translation: "没有对有，实在对空虚，作赋对读书。绿色的窗对朱红的门，宝马对香车。伯乐相的马，孟浩然骑的驴，用绳箭射雁对下水去捉鱼。管仲和鲍叔分金多让给别人，蔺相如把宝玉完好地送回赵国。孙绰作的赋掷在地上有金石声，窦滔的妻子织出回文的锦字诗。傅说没被君王发现时，是在傅岩筑墙的苦工；姜太公遇上周文王，才放下渭水边的鱼竿。终结对开始，急速对缓慢，粗布短衣对华美的衣襟。六朝对三国，天禄阁对石渠阁。千字的对策，八行的书信，有若对蔺相如。花残了没有蝴蝶来嬉戏，水草密的地方有鱼儿藏身。落叶在风里高高低低地飞舞，小荷叶浮在水面卷了又张开。大家佩服孔子不向人借伞，是为了不说破别人的短处；谁知道阮裕怕人家说他小气，索性把好车烧掉了。麒麟对凤凰，甲鱼对鱼，内史对中书。犁和锄对翻土的耒耜，田间的小沟对郊外的空地。犀角的腰带，象牙的梳子，四马拉的车对安稳坐车。穿青衣的能报来大赦的喜讯，小狗黄耳会替主人送家书。庭院里有人提着短剑，大门前没有客人拖着长长的衣摆。波浪拍打船身，夜里睡在船上的人心惊；山峰环绕着房屋，山中隐居的人真快乐。",
      }
      ],
    },
    {
      title: "七 虞 · 车万育",
      art: 'shenglv-east:ch7',
      artPrompt: "《声律启蒙》七 虞韵插画：对联里的山水花鸟，古风贴纸绘本",
      blocks: [
      {
        kind: 'poem',
        text: "金对玉，宝对珠，玉兔对金乌。孤舟对短棹，一雁对双凫。横醉眼，捻吟须，李白对杨朱。秋霜多过雁，夜月有啼乌。日暧园林花易赏，雪寒村舍酒难沽。人处岭南，善探巨象口中齿；客居江右，偶夺骊龙颔下珠。\n贤对圣，智对愚，傅粉对施朱。名缰对利锁，挈榼对提壶。鸠哺子，燕调雏，石帐对郇厨。烟轻笼岸柳，风急撼庭梧。鸜眼一方端石砚，龙涎三炷博山垆。曲沼鱼多，可使渔人结网；平田兔少，漫劳耕者守株。\n秦对赵，越对吴，钓客对耕夫。箕裘对杖履，杞梓对桑榆。天欲晓，日将晡，狡兔对妖狐。读书甘刺股，煮粥惜焚须。韩信武能平四海，左思文足赋三都。嘉遁幽人，适志竹篱茅舍；胜游公子，玩情柳陌花衢。",
        pinyin: "jīn duì yù， bǎo duì zhū， yù tù duì jīn wū。 gū zhōu duì duǎn zhào， yī yàn duì shuāng fú。 héng zuì yǎn， niǎn yín xū， lǐ bái duì yáng zhū。 qiū shuāng duō guò yàn， yè yuè yǒu tí wū。 rì ài yuán lín huā yì shǎng， xuě hán cūn shè jiǔ nán gū。 rén chù lǐng nán， shàn tàn jù xiàng kǒu zhōng chǐ； kè jū jiāng yòu， ǒu duó lí lóng hàn xià zhū。\nxián duì shèng， zhì duì yú， fù fěn duì shī zhū。 míng jiāng duì lì suǒ， qiè kē duì tí hú。 jiū bǔ zǐ， yàn tiáo chú， shí zhàng duì huán chú。 yān qīng lóng àn liǔ， fēng jí hàn tíng wú。 qú yǎn yī fāng duān shí yàn， lóng xián sān zhù bó shān lú。 qǔ zhǎo yú duō， kě shǐ yú rén jié wǎng； píng tián tù shǎo， màn láo gēng zhě shǒu zhū。\nqín duì zhào， yuè duì wú， diào kè duì gēng fū。 jī qiú duì zhàng lǚ， qǐ zǐ duì sāng yú。 tiān yù xiǎo， rì jiāng bū， jiǎo tù duì yāo hú。 dú shū gān cì gǔ， zhǔ zhōu xī fén xū。 hán xìn wǔ néng píng sì hǎi， zuǒ sī wén zú fù sān dōu。 jiā dùn yōu rén， shì zhì zhú lí máo shè； shèng yóu gōng zǐ， wán qíng liǔ mò huā qú。",
        translation: "金子对美玉，宝贝对珍珠，月宫的玉兔对日头的金乌。孤单的小船对短短的木桨，一只大雁对一对野鸭。眯着醉眼，捻着胡须，李白对杨朱。秋霜降了大雁飞过，夜月里乌鸦啼叫。天气暖和，园林里的花好欣赏；雪天寒冷，村子里的酒难买到。住在岭南的人，善于探取大象口中的牙；客居江边的人，偶然夺得骊龙下巴下的宝珠。贤人对圣人，聪明人对愚笨人，涂粉对抹红。名是缰绳、利是枷锁，挎着酒榼对提着酒壶。斑鸠哺喂小鸟，燕子教小燕飞翔，石崇的锦帐对郇家的盛宴。轻烟笼罩岸边的柳树，急风摇撼院里的梧桐。一方带鸲鹆眼纹的端石砚，博山炉里点着三炷龙涎香。弯弯的池水里鱼多，渔人可以结网去捕；平平的田地上兔少，种田人白费功夫守着树桩等兔子。秦地对赵地，越地对吴地，钓鱼的人对耕田的人。继承父业对扶杖漫步，杞树梓树对桑树榆树。天快亮了，太阳快落了，狡猾的兔子对妖气的狐狸。发奋读书的人甘愿用锥子刺自己的大腿，疼爱姐姐的人为煮粥烧了胡须也不心疼。韩信有武功能平定四海，左思有文才写成了《三都赋》。隐士过得自在，在竹篱茅舍里称心如意；游春的公子尽兴，在花街柳巷中玩耍。",
      }
      ],
    },
    {
      title: "八 齐 · 车万育",
      art: 'shenglv-east:ch8',
      artPrompt: "《声律启蒙》八 齐韵插画：对联里的山水花鸟，古风贴纸绘本",
      blocks: [
      {
        kind: 'poem',
        text: "岩对岫，涧对溪，远岸对危堤。鹤长对凫短，水雁对山鸡。星拱北，月流西，汉露对汤霓。桃林牛已放，虞阪马长嘶。叔侄去官闻广受，弟兄让国有夷齐。三月春浓，芍药丛中蝴蝶舞；五更天晓，海棠枝上子规啼。\n云对雨，水对泥，白璧对玄圭。献瓜对投李，禁鼓对征鼙。徐稚榻，鲁班梯，凤翥对鸾栖，有官清似水，无客醉如泥。截发惟闻陶侃母，断机只有乐羊妻。秋望佳人，目送楼头千里雁；早行远客，梦惊枕上五更鸡。\n熊对虎，象对犀，霹雳对虹霓。杜鹃对孔雀，桂岭对梅溪。萧史凤，宋宗鸡，远近对高低。水寒鱼不跃，林茂鸟频栖。杨柳和烟彭泽县，桃花流水武陵溪。公子追欢，闲骤玉骢游绮陌；佳人倦绣，闷欹珊枕掩香闺。",
        pinyin: "yán duì xiù， jiàn duì xī， yuǎn àn duì wēi dī。 hè cháng duì fú duǎn， shuǐ yàn duì shān jī。 xīng gǒng běi， yuè liú xī， hàn lù duì tāng ní。 táo lín niú yǐ fàng， yú bǎn mǎ cháng sī。 shū zhí qù guān wén guǎng shòu， dì xiong ràng guó yǒu yí qí。 sān yuè chūn nóng， sháo yào cóng zhōng hú dié wǔ； wǔ gēng tiān xiǎo， hǎi táng zhī shàng zǐ guī tí。\nyún duì yǔ， shuǐ duì ní， bái bì duì xuán guī。 xiàn guā duì tóu lǐ， jìn gǔ duì zhēng pí。 xú zhì tà， lǔ bān tī， fèng zhù duì luán qī， yǒu guān qīng sì shuǐ， wú kè zuì rú ní。 jié fā wéi wén táo kǎn mǔ， duàn jī zhǐ yǒu lè yáng qī。 qiū wàng jiā rén， mù sòng lóu tóu qiān lǐ yàn； zǎo xíng yuǎn kè， mèng jīng zhěn shàng wǔ gēng jī。\nxióng duì hǔ， xiàng duì xī， pī lì duì hóng ní。 dù juān duì kǒng què， guì lǐng duì méi xī。 xiāo shǐ fèng， sòng zōng jī， yuǎn jìn duì gāo dī。 shuǐ hán yú bù yuè， lín mào niǎo pín qī。 yáng liǔ hé yān péng zé xiàn， táo huā liú shuǐ wǔ líng xī。 gōng zǐ zhuī huān， xián zhòu yù cōng yóu qǐ mò； jiā rén juàn xiù， mēn qī shān zhěn yǎn xiāng guī。",
        translation: "山岩对峰峦，山涧对小溪，远处的岸对高高的堤。鹤腿长对凫腿短，水里的大雁对山里的野鸡。星星拱卫着北斗，月亮向西边流去，汉武帝承下的甘露对商汤祷来的彩虹。桃林里放归了拉车的老牛，虞阪上驾车的马在长声嘶鸣。叔侄一起辞官的是疏广疏受，兄弟互相让出王位的是伯夷叔齐。三月里春意正浓，芍药丛中蝴蝶飞舞；五更时天快亮了，海棠枝上杜鹃啼叫。云对雨，水对泥，白玉璧对黑玉圭。献上瓜果对投赠李子，宫里的禁鼓对出征的战鼓。徐孺子的木榻，鲁班的云梯，凤凰飞翔对鸾鸟栖息。做官清白得像水，没有客人来时醉得像烂泥。剪下头发换酒菜招待客人的，是陶侃的母亲；剪断织布机上的布劝勉丈夫的，是乐羊子的妻子。秋天思念远方的人，在楼头目送千里的大雁；清早赶路的客人，睡梦里被五更的鸡叫惊醒。熊对虎，大象对犀牛，霹雳对彩虹。杜鹃对孔雀，桂树的山岭对梅花的溪水。萧史会吹箫引来凤凰，宋处宗养的鸡会说人话，远对近，高对低。水太冷了鱼不跳出，林子茂密鸟儿频频栖息。杨柳含着轻烟是彭泽县，桃花流水是武陵溪。公子寻欢作乐，骑着玉花骏马在漂亮的街道上跑；佳人绣花绣累了，倚着珊瑚枕掩上闺房的门。",
      }
      ],
    },
    {
      title: "九 佳 · 车万育",
      art: 'shenglv-east:ch9',
      artPrompt: "《声律启蒙》九 佳韵插画：对联里的山水花鸟，古风贴纸绘本",
      blocks: [
      {
        kind: 'poem',
        text: "河对海，汉对淮，赤岸对朱崖。鹭飞对鱼跃，宝钿对金钗。鱼圉圉，鸟喈喈，草履对芒鞋。古贤尝笃厚，时辈喜诙谐。孟训文公谈性善，颜师孔子问心斋。缓抚琴弦，像流莺而并语；斜排筝柱。类过雁之相挨。\n丰对俭，等对差，布袄对荆钗。雁行对鱼阵，榆塞对兰崖。挑荠女，采莲娃，菊径对苔阶。诗成六义备，乐奏八音谐。造律吏哀秦法酷，知音人说郑声哇。天欲飞霜，塞上有鸿行已过；云将作雨，庭前多蚁阵先排。\n城对市，巷对街，破屋对空阶。桃枝对桂叶，砌蚓对墙蜗。梅可望，橘堪怀，季路对高柴。花藏沽酒市，竹映读书斋。马首不容孤竹扣，车轮终就洛阳埋。朝宰锦衣，贵束乌犀之带；宫人宝髻，宜簪白燕之钗。",
        pinyin: "hé duì hǎi， hàn duì huái， chì àn duì zhū yá。 lù fēi duì yú yuè， bǎo diàn duì jīn chāi。 yú yǔ yǔ， niǎo jiē jiē， cǎo lǚ duì máng xié。 gǔ xián cháng dǔ hòu， shí bèi xǐ huī xié。 mèng xùn wén gōng tán xìng shàn， yán shī kǒng zǐ wèn xīn zhāi。 huǎn fǔ qín xián， xiàng liú yīng ér bìng yǔ； xié pái zhēng zhù。 lèi guò yàn zhī xiāng āi。\nfēng duì jiǎn， děng duì chà， bù ǎo duì jīng chāi。 yàn xíng duì yú zhèn， yú sāi duì lán yá。 tiāo qí nǚ， cǎi lián wá， jú jìng duì tái jiē。 shī chéng liù yì bèi， lè zòu bā yīn xié。 zào lǜ lì āi qín fǎ kù， zhī yīn rén shuō zhèng shēng wā。 tiān yù fēi shuāng， sài shàng yǒu hóng xíng yǐ guò； yún jiāng zuò yǔ， tíng qián duō yǐ zhèn xiān pái。\nchéng duì shì， xiàng duì jiē， pò wū duì kōng jiē。 táo zhī duì guì yè， qì yǐn duì qiáng wō。 méi kě wàng， jú kān huái， jì lù duì gāo chái。 huā cáng gū jiǔ shì， zhú yìng dú shū zhāi。 mǎ shǒu bù róng gū zhú kòu， chē lún zhōng jiù luò yáng mái。 cháo zǎi jǐn yī， guì shù wū xī zhī dài； gōng rén bǎo jì， yí zān bái yàn zhī chāi。",
        translation: "河对海，汉水对淮河，红石岸对朱砂崖。白鹭飞对鱼儿跃，宝钿对金钗。鱼在缸里转不开身，鸟在枝头喈喈地叫，草鞋对芒鞋。古代的贤人忠厚老实，今天的人们喜欢诙谐逗趣。孟子教滕文公讲人性本善，颜回向孔子请教心斋的功夫。缓缓地抚着琴弦，琴音像流莺在一起歌唱；斜斜地排着筝柱，像飞行的大雁一只挨着一只。丰盛对俭朴，相等对相差，布棉袄对荆木钗。雁群排成行对鱼群列成阵，榆关的塞对兰花的崖。挑荠菜的姑娘，采莲蓬的娃娃，菊花的小径对青苔的台阶。诗写成了，六义样样齐备；乐奏起来，八音个个和谐。制定法律的官吏哀叹秦朝的法太残酷，懂音乐的人说郑国的乐声不正派。天要降霜了，塞外已有大雁排成行飞过；云要下雨了，庭前的蚂蚁先排好阵搬家。城对市，小巷对大街，破屋子对空台阶。桃枝对桂叶，砖缝的蚯蚓对墙上的蜗牛。望梅止渴的是曹操，怀橘留给母亲的是陆绩，季路和高柴都是孔子的学生。花丛里藏着卖酒的热闹市集，竹影映着安静的书斋。伯夷叔齐拉住马头劝谏没有被听，张纲在洛阳埋住车轮坚决直言。上朝的大臣穿锦绣衣裳，腰里束着乌犀带；宫中的美人梳着宝髻，簪着白燕形状的金钗。",
      }
      ],
    },
    {
      title: "十 灰 · 车万育",
      art: 'shenglv-east:ch10',
      artPrompt: "《声律启蒙》十 灰韵插画：对联里的山水花鸟，古风贴纸绘本",
      blocks: [
      {
        kind: 'poem',
        text: "增对损，闭对开，碧草对苍苔。书签对笔架，两曜对三台。周召虎，宋桓魋，阆苑对蓬莱。薰风生殿阁，皓月照楼台。却马汉文思罢献，吞蝗唐太冀移灾。照耀八荒，赫赫丽天秋日；震惊百里，轰轰出地春雷。\n沙对水，火对灰，雨雪对风雷。书淫对传癖，水浒对岩隈。歌旧曲，酿新醅，舞馆对歌台。春棠经雨放，秋菊傲霜开。作酒固难忘曲蘖，调羹必要用盐梅。月满庾楼，据胡床而可玩；花开唐苑，轰羯鼓以奚催。\n休对咎，福对灾，象箸对犀杯。宫花对御柳，峻阁对高台。花蓓蕾，草根荄，剔藓对剜苔。雨前庭蚁闹，霜后阵鸿哀。元亮南窗今日傲，孙弘东阁几时开。平展青茵，野外茸茸软草；高张翠幄，庭前郁郁凉槐。",
        pinyin: "zēng duì sǔn， bì duì kāi， bì cǎo duì cāng tái。 shū qiān duì bǐ jià， liǎng yào duì sān tái。 zhōu zhào hǔ， sòng huán tuí， láng yuàn duì péng lái。 xūn fēng shēng diàn gé， hào yuè zhào lóu tái。 què mǎ hàn wén sī bà xiàn， tūn huáng táng tài jì yí zāi。 zhào yào bā huāng， hè hè lì tiān qiū rì； zhèn jīng bǎi lǐ， hōng hōng chū dì chūn léi。\nshā duì shuǐ， huǒ duì huī， yǔ xuě duì fēng léi。 shū yín duì chuán pǐ， shuǐ hǔ duì yán wēi。 gē jiù qǔ， niàng xīn pēi， wǔ guǎn duì gē tái。 chūn táng jīng yǔ fàng， qiū jú ào shuāng kāi。 zuò jiǔ gù nán wàng qǔ niè， tiáo gēng bì yào yòng yán méi。 yuè mǎn yǔ lóu， jù hú chuáng ér kě wán； huā kāi táng yuàn， hōng jié gǔ yǐ xī cuī。\nxiū duì jiù， fú duì zāi， xiàng zhù duì xī bēi。 gōng huā duì yù liǔ， jùn gé duì gāo tái。 huā bèi lěi， cǎo gēn gāi， tī xiǎn duì wān tái。 yǔ qián tíng yǐ nào， shuāng hòu zhèn hóng āi。 yuán liàng nán chuāng jīn rì ào， sūn hóng dōng gé jǐ shí kāi。 píng zhǎn qīng yīn， yě wài róng róng ruǎn cǎo； gāo zhāng cuì wò， tíng qián yù yù liáng huái。",
        translation: "增添对减损，关闭对打开，绿草对青苔。书签对笔架，太阳月亮对三台星。周朝的召虎，宋国的桓魋，神仙的阆苑对蓬莱。暖和的风吹过宫殿楼阁，洁白的月亮照着高台。汉文帝退回了进献的千里马，盼大家别再送礼；唐太宗吞下蝗虫，宁愿灾祸落到自己身上。光耀四方，秋日的太阳明晃晃挂在天上；声震百里，春天的雷轰隆隆冲出地面。沙对水，火对灰，雨雪对风雷。爱书如命的人对爱书成癖的人，水边对山湾。唱着旧曲子，酿着新醅酒，跳舞的馆对唱歌的台。春海棠经了雨开放，秋菊花迎着霜盛开。酿酒自然少不了酒曲，调羹一定要用盐和梅。月光洒满庾亮的南楼，靠着胡床正好赏月；唐宫里花儿开了，敲响羯鼓催花开得更快。善对恶，福气对灾祸，象牙筷对犀角杯。宫里的花对御苑的柳，高峻的阁对高大的台。花刚打骨朵，草根刚发芽，剔去青藓对剜掉旧苔。下雨前庭前蚂蚁乱哄哄，下霜后天上雁阵声声哀。陶渊明靠着南窗今天多得意，公孙弘的东阁什么时候才打开。野外铺开青青的软草像地毯，庭前张起绿绿的槐荫像帷帐。",
      }
      ],
    },
    {
      title: "十一 真 · 车万育",
      art: 'shenglv-east:ch11',
      artPrompt: "《声律启蒙》十一 真韵插画：对联里的山水花鸟，古风贴纸绘本",
      blocks: [
      {
        kind: 'poem',
        text: "邪对正，假对真，獬豸对麒麟。韩卢对苏雁，陆橘对庄椿。韩五鬼，李三人，北魏对西秦。蝉鸣哀暮夏，莺啭怨残春。野烧焰腾红烁烁，溪流波皱碧粼粼。行无踪，居无庐，颂成酒德；动有时，藏有节，论著钱神。\n哀对乐，富对贫，好友对嘉宾。弹冠对结绶，白日对青春。金翡翠，玉麒麟，虎爪对龙麟。柳塘生细浪，花径起香尘。闲爱登山穿谢屐，醉思漉酒脱陶巾。雪冷霜严，倚槛松筠同傲岁；日迟风暖，满园花柳各争春。\n香对火，炭对薪，日观对天津。禅心对道眼，野妇对宫嫔。仁无敌，德有邻，万石对千钧。滔滔三峡水，冉冉一溪冰。充国功名当画阁，子张言行贵书绅。笃志诗书，思入圣贤绝域；忘情官爵，羞沾名利纤尘。",
        pinyin: "xié duì zhèng， jiǎ duì zhēn， xiè zhì duì qí lín。 hán lú duì sū yàn， lù jú duì zhuāng chūn。 hán wǔ guǐ， lǐ sān rén， běi wèi duì xī qín。 chán míng āi mù xià， yīng zhuàn yuàn cán chūn。 yě shāo yàn téng hóng shuò shuò， xī liú bō zhòu bì lín lín。 xíng wú zōng， jū wú lú， sòng chéng jiǔ dé； dòng yǒu shí， cáng yǒu jié， lùn zhù qián shén。\nāi duì lè， fù duì pín， hǎo yǒu duì jiā bīn。 tán guān duì jié shòu， bái rì duì qīng chūn。 jīn fěi cuì， yù qí lín， hǔ zhuǎ duì lóng lín。 liǔ táng shēng xì làng， huā jìng qǐ xiāng chén。 xián ài dēng shān chuān xiè jī， zuì sī lù jiǔ tuō táo jīn。 xuě lěng shuāng yán， yǐ kǎn sōng yún tóng ào suì； rì chí fēng nuǎn， mǎn yuán huā liǔ gè zhēng chūn。\nxiāng duì huǒ， tàn duì xīn， rì guān duì tiān jīn。 chán xīn duì dào yǎn， yě fù duì gōng pín。 rén wú dí， dé yǒu lín， wàn shí duì qiān jūn。 tāo tāo sān xiá shuǐ， rǎn rǎn yī xī bīng。 chōng guó gōng míng dāng huà gé， zǐ zhāng yán xíng guì shū shēn。 dǔ zhì shī shū， sī rù shèng xián jué yù； wàng qíng guān jué， xiū zhān míng lì xiān chén。",
        translation: "邪恶对正直，虚假对真实，独角的神羊獬豸对仁兽麒麟。韩卢是追兔的猎犬，苏武靠大雁传书信，陆绩怀里的橘子对庄子说的大椿树。韩愈写文章赶走五个穷鬼，李白举杯邀月对影成三人。北魏对西秦。蝉在夏末鸣叫，声音透着悲哀；莺在残春啼啭，像在埋怨春天将尽。野火烧得红彤彤，溪水皱起绿粼粼的波。走路没有踪影，住处没有房屋，那是刘伶写的《酒德颂》；出动有定时，收藏有节气，那是鲁褒写的《钱神论》。悲哀对快乐，富有对贫穷，好朋友对贵客。拂去帽子上的灰对系好印绶带，白日对青春。金色的翡翠鸟，玉色的麒麟，虎爪对龙鳞。柳塘里漾起细细的水波，花径上飘起香香的尘土。闲时爱穿上谢公木屐去登山，醉了想起陶渊明滤酒时脱下的头巾。雪冷霜严，倚着栏杆的松竹一起傲对寒冬；日暖风和，满园的花草树木各自争着报春。香对火，炭对柴，日观峰对天津桥。参禅的心对修道的眼，乡野的妇女对宫中的妃嫔。有仁德的人天下无敌，有德行的人必有邻居，万石对千钧。三峡的水滔滔奔流，一条溪的冰缓缓浮动。赵充国的功名画像挂在麒麟阁，子张把重要的言行写在衣带上。立志读诗书，思想走进圣贤的高妙境界；不贪恋官位爵禄，一点名利的灰尘也不沾身。",
      }
      ],
    },
    {
      title: "十二 文 · 车万育",
      art: 'shenglv-east:ch12',
      artPrompt: "《声律启蒙》十二 文韵插画：对联里的山水花鸟，古风贴纸绘本",
      blocks: [
      {
        kind: 'poem',
        text: "家对国，武对文，四辅对三军。九经对三史，菊馥对兰芬。歌北鄙，咏南薰，迩听对遥闻。召公周太保，李广汉将军。闻化蜀民皆草偃，争权晋土已瓜分。巫峡夜深，猿啸苦哀巴地月；衡峰秋早，雁飞高贴楚天云。\n欹对正，见对闻，偃武对修文。羊车对鹤驾，朝旭对晚曛。花有艳，竹成文，马燧对羊欣。山中梁宰相，树下汉将军。施帐解围嘉道韫，当垆沽酒叹文君。好景有期，北岭几枝梅似雪；丰年先兆，西郊千顷稼如云。\n尧对舜，夏对殷，蔡惠对刘蕡。山明对水秀，五典对三坟。唐李杜，晋机云，事父对忠君。雨晴鸠唤妇，霜冷雁呼群。酒量洪深周仆射，诗才俊逸鲍参军。鸟翼长随，凤兮洵众禽长；狐威不假，虎也真百兽尊。",
        pinyin: "jiā duì guó， wǔ duì wén， sì fǔ duì sān jūn。 jiǔ jīng duì sān shǐ， jú fù duì lán fēn。 gē běi bǐ， yǒng nán xūn， ěr tīng duì yáo wén。 zhào gōng zhōu tài bǎo， lǐ guǎng hàn jiāng jūn。 wén huà shǔ mín jiē cǎo yǎn， zhēng quán jìn tǔ yǐ guā fēn。 wū xiá yè shēn， yuán xiào kǔ āi bā dì yuè； héng fēng qiū zǎo， yàn fēi gāo tiē chǔ tiān yún。\nqī duì zhèng， jiàn duì wén， yǎn wǔ duì xiū wén。 yáng chē duì hè jià， cháo xù duì wǎn xūn。 huā yǒu yàn， zhú chéng wén， mǎ suì duì yáng xīn。 shān zhōng liáng zǎi xiàng， shù xià hàn jiāng jūn。 shī zhàng jiě wéi jiā dào yùn， dāng lú gū jiǔ tàn wén jūn。 hǎo jǐng yǒu qī， běi lǐng jǐ zhī méi sì xuě； fēng nián xiān zhào， xī jiāo qiān qǐng jià rú yún。\nyáo duì shùn， xià duì yīn， cài huì duì liú fén。 shān míng duì shuǐ xiù， wǔ diǎn duì sān fén。 táng lǐ dù， jìn jī yún， shì fù duì zhōng jūn。 yǔ qíng jiū huàn fù， shuāng lěng yàn hū qún。 jiǔ liàng hóng shēn zhōu pú shè， shī cái jùn yì bào cān jūn。 niǎo yì cháng suí， fèng xī xún zhòng qín cháng； hú wēi bù jiǎ， hǔ yě zhēn bǎi shòu zūn。",
        translation: "家对国，武对文，四辅大臣对三军将士。九部经典对三部史书，菊花的芬芳对兰草的清香。唱北方的悲歌，咏南风的雅曲，近处听到对远处听闻。召公是周朝的太保，李广是汉朝的将军。蜀地百姓听到教化，像青草随风低头一样归顺；晋国大臣争夺权力，国土像瓜一样被切开分掉。巫峡的深夜，猿猴对着巴山的月亮悲声长啸；衡山的早秋，大雁高高地贴着楚天的云飞。歪斜对端正，看见对听见，停息武备对振兴文教。羊拉的小车对仙人骑的鹤，早晨的太阳对傍晚的霞光。花有艳丽的颜色，竹有漂亮的纹路，马燧对羊欣。山里住了位宰相陶弘景，树下站了位将军冯异。谢道韫隔着青绫帐幕替小叔子答话解围，卓文君当垆卖酒让人叹息。好景有了约期，北岭的几枝梅花开得像雪；丰年早有预兆，西郊千顷的庄稼长得像云。尧对舜，夏朝对殷朝，蔡惠对刘蕡。山明亮对水秀丽，五典对三坟。唐朝有李白杜甫，晋朝有张翰陆云，孝顺父亲对忠于君主。雨后初晴斑鸠呼唤伴侣，霜夜寒冷大雁呼唤同伴。周仆射酒量又洪又深，鲍参军诗才清新飘逸。鸟儿都愿意跟着凤凰飞，凤凰真是众鸟之王；狐狸假借老虎的威风，老虎真是百兽之尊。",
      }
      ],
    },
    {
      title: "十三 元 · 车万育",
      art: 'shenglv-east:ch13',
      artPrompt: "《声律启蒙》十三 元韵插画：对联里的山水花鸟，古风贴纸绘本",
      blocks: [
      {
        kind: 'poem',
        text: "幽对显，寂对喧，柳岸对桃源。莺朋对燕友，早暮对寒暄。鱼跃沼，鹤乘轩，醉胆对吟魂。轻尘生范甑，积雪拥袁门。缕缕轻烟芳草渡，丝丝微雨杏花村。诣阙王通，献太平十二策；出关老子，著道德五千言。\n儿对女，子对孙，药圃对花村。高楼对邃阁，赤豹对玄猿。妃子骑，夫人轩，旷野对平原。匏巴能鼓瑟，伯氏善吹埙。馥馥早梅思驿使，萋萋芳草怨王孙。秋夕月明，苏子黄岗游绝壁；春朝花发，石家金谷启芳园。\n歌对舞，德对恩，犬马对鸡豚。龙池对凤沼，雨骤对云屯。刘向阁，李膺门，唳鹤对啼猿。柳摇春白昼，梅弄月黄昏，岁冷松筠皆有节，春喧桃李本无言。噪晚齐蝉，岁岁秋来泣恨；啼宵蜀鸟，年年春去伤魂。",
        pinyin: "yōu duì xiǎn， jì duì xuān， liǔ àn duì táo yuán。 yīng péng duì yàn yǒu， zǎo mù duì hán xuān。 yú yuè zhǎo， hè chéng xuān， zuì dǎn duì yín hún。 qīng chén shēng fàn zèng， jī xuě yōng yuán mén。 lǚ lǚ qīng yān fāng cǎo dù， sī sī wēi yǔ xìng huā cūn。 yì quē wáng tōng， xiàn tài píng shí èr cè； chū guān lǎo zǐ， zhù dào dé wǔ qiān yán。\nér duì nǚ， zǐ duì sūn， yào pǔ duì huā cūn。 gāo lóu duì suì gé， chì bào duì xuán yuán。 fēi zi qí， fū rén xuān， kuàng yě duì píng yuán。 páo bā néng gǔ sè， bó shì shàn chuī xūn。 fù fù zǎo méi sī yì shǐ， qī qī fāng cǎo yuàn wáng sūn。 qiū xī yuè míng， sū zǐ huáng gǎng yóu jué bì； chūn cháo huā fā， shí jiā jīn gǔ qǐ fāng yuán。\ngē duì wǔ， dé duì ēn， quǎn mǎ duì jī tún。 lóng chí duì fèng zhǎo， yǔ zhòu duì yún tún。 liú xiàng gé， lǐ yīng mén， lì hè duì tí yuán。 liǔ yáo chūn bái zhòu， méi nòng yuè huáng hūn， suì lěng sōng yún jiē yǒu jié， chūn xuān táo lǐ běn wú yán。 zào wǎn qí chán， suì suì qiū lái qì hèn； tí xiāo shǔ niǎo， nián nián chūn qù shāng hún。",
        translation: "幽暗对明显，寂静对喧闹，柳树岸边对桃花源头。黄莺做伴对燕子为友，清晨对傍晚。鱼儿跃出水池，仙鹤乘坐轩车，酒后的胆气对吟诗的情怀。范丹家的饭甑积了灰尘，袁安家门口积雪深深。缕缕轻烟飘在长满芳草的渡口，丝丝细雨落在开满杏花的村庄。王通来到皇宫，献上使天下太平的十二条计策；老子走出函谷关，写下《道德经》五千字。儿子对女儿，儿子对孙儿，药草园对花果村。高楼对深阁，红色的豹对黑色的猿。妃子骑快马送荔枝，夫人坐着鱼皮装饰的车，旷野对平原。匏巴弹瑟弹得好，伯氏吹埙吹得妙。香气扑鼻的早梅盼着驿使寄信，茂密的芳草埋怨远行的人还不回家。秋夜月明，苏东坡在黄冈游览赤壁；春天早晨花开，石崇在金谷园开办芳园。唱歌对跳舞，恩德对恩情，犬马对鸡猪。龙池对凤沼，急雨对密云。刘向校书的天禄阁，李膺接待名士的门庭，长鸣的鹤对哀啼的猿。柳枝在春日里摇曳，梅花在黄昏的月下弄影。岁末严寒松竹都有节操，春天喧闹桃李默默无言。傍晚齐地的蝉，年年秋天来时声声悲啼；夜里蜀地的杜鹃，年年春天去时声声哀伤。",
      }
      ],
    },
    {
      title: "十四 寒 · 车万育",
      art: 'shenglv-east:ch14',
      artPrompt: "《声律启蒙》十四 寒韵插画：对联里的山水花鸟，古风贴纸绘本",
      blocks: [
      {
        kind: 'poem',
        text: "多对少，易对难，虎踞对龙蟠。龙舟对凤辇，白鹤对青鸾。风淅淅，露漙漙，绣毂对雕鞍。鱼游荷叶沼，鹭立蓼花滩。有酒阮貂奚用解，无鱼冯铗必须弹。丁固梦松，柯叶忽然生腹上；文郎画竹，枝梢倏尔长毫端。\n寒对暑，湿对干，鲁隐对齐桓。寒毡对暖席，夜饮对晨餐。叔子带，仲由冠，郏鄏对邯郸。嘉禾忧夏旱，衰柳耐秋寒。杨柳绿遮元亮宅，杏花红映仲尼坛。江水流长，环绕似青罗带；海蟾轮满，澄明如白玉盘。\n横对竖，窄对宽，黑志对弹丸。朱帘对画栋，彩槛对雕栏。春既老，夜将阑，百辟对千官。怀仁称足足，抱义美般般。好马君王曾市骨，食猪处士仅思肝。世仰双仙，元礼舟中携郭泰，人称连壁，夏侯车上并潘安。",
        pinyin: "duō duì shǎo， yì duì nán， hǔ jù duì lóng pán。 lóng zhōu duì fèng niǎn， bái hè duì qīng luán。 fēng xī xī， lù tuán tuán， xiù gū duì diāo ān。 yú yóu hé yè zhǎo， lù lì liǎo huā tān。 yǒu jiǔ ruǎn diāo xī yòng jiě， wú yú féng jiá bì xū tán。 dīng gù mèng sōng， kē yè hū rán shēng fù shàng； wén láng huà zhú， zhī shāo shū ěr cháng háo duān。\nhán duì shǔ， shī duì gān， lǔ yǐn duì qí huán。 hán zhān duì nuǎn xí， yè yǐn duì chén cān。 shū zǐ dài， zhòng yóu guān， jiá rǔ duì hán dān。 jiā hé yōu xià hàn， shuāi liǔ nài qiū hán。 yáng liǔ lǜ zhē yuán liàng zhái， xìng huā hóng yìng zhòng ní tán。 jiāng shuǐ liú cháng， huán rào sì qīng luó dài； hǎi chán lún mǎn， chéng míng rú bái yù pán。\nhéng duì shù， zhǎi duì kuān， hēi zhì duì dàn wán。 zhū lián duì huà dòng， cǎi kǎn duì diāo lán。 chūn jì lǎo， yè jiāng lán， bǎi pì duì qiān guān。 huái rén chēng zú zú， bào yì měi bān bān。 hǎo mǎ jūn wáng céng shì gǔ， shí zhū chǔ shì jǐn sī gān。 shì yǎng shuāng xiān， yuán lǐ zhōu zhōng xié guō tài， rén chēng lián bì， xià hóu chē shàng bìng pān ān。",
        translation: "多对少，容易对困难，猛虎蹲踞对蛟龙盘曲。龙舟对凤车，白鹤对青鸾。风淅淅地下，露漙漙地滴，绣车对雕鞍。鱼游在荷叶池里，鹭立在蓼花滩上。阮孚拿貂裘换酒喝，冯谖没有鱼吃就弹剑唱歌。丁固梦见松树，枝叶忽然从肚子上长出来；文同画竹，枝梢一下从笔尖长出。寒冷对暑热，潮湿对干燥，鲁隐公对齐桓公。寒毡对暖席，夜里饮酒对早晨吃饭。叔子的衣带，仲由的帽子，郏鄏对邯郸。好庄稼担心夏天的旱，衰弱的柳树却耐得住秋寒。绿杨柳遮着陶渊明的宅院，红杏花映着孔子讲学的讲坛。江水流得长远，弯弯环绕像青罗带；海上的月亮圆了，清清亮亮像白玉盘。横对竖，窄对宽，像黑痣那么小的地方对像弹丸那么小的地方。红帘对画栋，彩栏对雕栏。春天快要过完，夜晚快到尽头，百位诸侯对千员官员。怀有仁德的麒麟叫足足，抱有道义的麒麟叫般般。君王曾买回死马的骨头寻访千里马，隐士吃猪肉只想要猪肝。世人敬仰的两位贤士，李元礼的船中带着郭泰；人们称赞的一双璧人，夏侯玄车上并坐着潘安。",
      }
      ],
    },
    {
      title: "十五 删 · 车万育",
      art: 'shenglv-east:ch15',
      artPrompt: "《声律启蒙》十五 删韵插画：对联里的山水花鸟，古风贴纸绘本",
      blocks: [
      {
        kind: 'poem',
        text: "兴对废，附对攀，露草对霜菅，歌廉对借寇，习孔对希颜。山垒垒，水潺潺，奉壁对探镮。礼由公旦作，诗本仲尼删。驴困客方经灞水，鸡鸣人已出函关。几夜霜飞，已有苍鸿辞北塞；数朝雾暗，岂无玄豹隐南山。\n犹对尚，侈对悭，雾髻对烟鬟。莺啼对鹊噪，独鹤对双鹇。黄牛峡，金马山，结草对衔环。昆山惟玉集，合浦有珠还。阮籍旧能为眼白，老莱新爱着衣斑。栖迟避世人，草衣木食；窈窕倾城女，云鬓花颜。\n姚对宋，柳对颜，赏善对惩奸。愁中对梦里，巧慧对痴顽。孔北海，谢东山，使越对征蛮，淫声闻濮上，离曲听阳关。骁将袍披仁贵白，小儿衣着老莱斑。茅舍无人，难却尘埃生榻上；竹亭有客，尚留风月在窗间。",
        pinyin: "xīng duì fèi， fù duì pān， lù cǎo duì shuāng jiān， gē lián duì jiè kòu， xí kǒng duì xī yán。 shān lěi lěi， shuǐ chán chán， fèng bì duì tàn huán。 lǐ yóu gōng dàn zuò， shī běn zhòng ní shān。 lǘ kùn kè fāng jīng bà shuǐ， jī míng rén yǐ chū hán guān。 jǐ yè shuāng fēi， yǐ yǒu cāng hóng cí běi sāi； shù cháo wù àn， qǐ wú xuán bào yǐn nán shān。\nyóu duì shàng， chǐ duì qiān， wù jì duì yān huán。 yīng tí duì què zào， dú hè duì shuāng xián。 huáng niú xiá， jīn mǎ shān， jié cǎo duì xián huán。 kūn shān wéi yù jí， hé pǔ yǒu zhū hái。 ruǎn jí jiù néng wèi yǎn bái， lǎo lái xīn ài zhe yī bān。 qī chí bì shì rén， cǎo yī mù shí； yǎo tiǎo qīng chéng nǚ， yún bìn huā yán。\nyáo duì sòng， liǔ duì yán， shǎng shàn duì chéng jiān。 chóu zhōng duì mèng lǐ， qiǎo huì duì chī wán。 kǒng běi hǎi， xiè dōng shān， shǐ yuè duì zhēng mán， yín shēng wén pú shàng， lí qǔ tīng yáng guān。 xiāo jiàng páo pī rén guì bái， xiǎo ér yī zhuó lǎo lái bān。 máo shè wú rén， nán què chén āi shēng tà shàng； zhú tíng yǒu kè， shàng liú fēng yuè zài chuāng jiān。",
        translation: "兴起对废弛，依附对攀援，带露的草对挂霜的菅草。歌颂廉范对挽留寇恂，学习孔子对仰慕颜回。山重重叠叠，水潺潺流淌，奉还宝璧对探取玉镯。礼仪制度由周公旦制定，《诗经》由孔子删定成书。驴子困乏，客人正经过灞水；雄鸡一叫，行人已经出了函谷关。几夜霜飞，大雁已经辞别北方的边塞；几天雾暗，南山的黑豹正好隐身。仍然对尚且，奢侈对吝啬，雾样的发髻对烟样的鬟鬓。黄莺啼叫对喜鹊聒噪，孤单的鹤对成双的白鹇。黄牛峡，金马山，结草报恩对黄雀衔环报恩。昆仑山上聚集着美玉，合浦海里的珍珠又回来了。阮籍爱翻白眼看人，老莱子七十岁还爱穿五彩衣逗父母笑。避世隐居的人，穿草衣、吃野果；美丽动人的姑娘，云一样的鬓发、花一样的容颜。姚崇对宋璟，柳公权对颜真卿，奖赏善良对惩治奸恶。忧愁中对梦境里，乖巧伶俐对憨傻顽皮。孔融曾任北海相，谢安居于东山，出使南越对征讨蛮夷。靡靡之音在濮水边听到，离别的曲子在阳关响起。勇将薛仁贵披着白袍，小儿老莱子穿着彩衣。茅屋里没有人，只得任灰尘落在床榻上；竹亭里有客人作伴，还留着清风明月映在窗间。",
      }
      ],
    }
  ],
  rights: {
    workTitle: "声律启蒙",
    author: "车万育",
    authorDeathYear: 1715,
    translator: '桃阅读',
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: "https://github.com/chinese-poetry/chinese-poetry",
    note: "通行本全篇；注音与白话译文为平台自撰。",
  },
}
