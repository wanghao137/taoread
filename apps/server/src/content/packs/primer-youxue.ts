import type { PackBook } from '../types'

/**
 * 《幼学琼林·卷一》——由 scripts/gen-corpus.mjs 从公版语料生成（2026-09-20 全面补全）。
 * 底本：幼学琼林（程登吉）。逐字来自语料数据集，译文为平台自撰白话。
 * 明代通行本卷一；注音与白话译文为平台自撰。
 */
export const youxueQionglin: PackBook = {
  id: "primer-youxue",
  title: "幼学琼林·卷一",
  author: "程登吉（明）",
  lang: "zh",
  category: "primer",
  ageStage: "6-8",
  intro: "「混沌初开，乾坤始奠」——古代小百科，天文地舆岁时朝廷，样样都有。",
  coverArt: "cosmos-ordered",
  coverArtPrompt: "画面一半是旋转的星云和发光的太阳月亮，一半是青山绿水和田垄，一个古代小孩站在中间仰头看天、低头看地，水墨绘本风",
  coverFrom: "#455A64",
  coverTo: "#ECEFF1",
  source: "《幼学琼林》通行本（程登吉，明代），公版",
  chapters: [
    {
      title: "天文（1） · 程登吉",
      art: 'primer-youxue:ch1',
      artPrompt: "古诗《天文（1）》意境插画：混沌初开，乾坤始奠。气之轻清上浮者为天，气之重浊下凝者为地。日月五星，谓之七政；天地与人，谓之三才。日为众阳之宗，月乃太阴之象。虹名䗖𬟽，乃天地之淫气；月里蟾蜍是月魄之精光。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "混沌初开，乾坤始奠。气之轻清上浮者为天，气之重浊下凝者为地。日月五星，谓之七政；天地与人，谓之三才。日为众阳之宗，月乃太阴之象。虹名䗖𬟽，乃天地之淫气；月里蟾蜍是月魄之精光。\n风欲起而石燕飞，天将雨而商羊舞。旋风名为羊角，闪电号曰雷鞭。青女乃霜之神，素娥即月之号。雷部至捷之鬼曰律令，雷部推车之女曰阿香。云师系是丰隆，雪神乃是滕六。歘火、谢仙，俱掌雷火；飞廉、箕伯，悉是风神。",
        pinyin: "hùn dùn chū kāi， qián kūn shǐ diàn。 qì zhī qīng qīng shàng fú zhě wèi tiān， qì zhī zhòng zhuó xià níng zhě wèi dì。 rì yuè wǔ xīng， wèi zhī qī zhèng； tiān dì yǔ rén， wèi zhī sān cái。 rì wèi zhòng yáng zhī zōng， yuè nǎi tài yīn zhī xiàng。 hóng míng dì dōng， nǎi tiān dì zhī yín qì； yuè lǐ chán chú shì yuè pò zhī jīng guāng。\nfēng yù qǐ ér shí yàn fēi， tiān jiāng yǔ ér shāng yáng wǔ。 xuán fēng míng wèi yáng jiǎo， shǎn diàn hào yuē léi biān。 qīng nǚ nǎi shuāng zhī shén， sù é jí yuè zhī hào。 léi bù zhì jié zhī guǐ yuē lǜ lìng， léi bù tuī chē zhī nǚ yuē ā xiāng。 yún shī xì shì fēng lóng， xuě shén nǎi shì téng liù。 xū huǒ、 xiè xiān， jù zhǎng léi huǒ； fēi lián、 jī bó， xī shì fēng shén。",
        translation: "天地刚刚分开的时候，宇宙才安定下来。又轻又清的气向上浮，变成了天；又重又浊的气向下沉，凝成了地。太阳、月亮和金、木、水、火、土五颗星，合起来叫“七政”；天、地、人，合起来叫“三才”。太阳是所有阳气的主宰，月亮是太阴的代表。彩虹又叫“䗖𬟽”，是天地间多余的水气变的；月亮里的蟾蜍，是月亮精气的光芒。风要刮起来，石燕就飞起来；天要下雨，商羊鸟就屈起一脚跳舞。打转的旋风叫“羊角”，闪电号称“雷鞭”。青女是掌管霜的神，素娥是月亮的别名。雷部跑得最快的鬼叫“律令”，雷部推车的仙女叫“阿香”。云师是丰隆，雪神是滕六。歘火和谢仙，都掌管雷火；飞廉和箕伯，都是风神。",
      }
      ],
    },
    {
      title: "天文（2） · 程登吉",
      art: 'primer-youxue:ch2',
      artPrompt: "古诗《天文（2）》意境插画：列缺乃电之神，望舒是月之御。甘霖、甘澍，仅指时雨；玄穹、彼苍，悉称上天。雪花飞六出，先兆丰年；日上已三竿，乃云时晏。蜀犬吠日，比人所见甚稀；吴牛喘月，笑人畏惧过甚。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "列缺乃电之神，望舒是月之御。甘霖、甘澍，仅指时雨；玄穹、彼苍，悉称上天。雪花飞六出，先兆丰年；日上已三竿，乃云时晏。蜀犬吠日，比人所见甚稀；吴牛喘月，笑人畏惧过甚。\n望切者，若云霓之望；恩深者，如雨露之恩。参商二星，其出没不相见；牛女两宿，惟七夕一相逢。后羿妻，奔月宫而为嫦娥；傅说死，其精神托于箕尾。披星戴月，谓早夜之奔驰；沐雨栉风，谓风尘之劳苦。事非有意，譬如云出无心；恩可遍施，乃曰阳春有脚。",
        pinyin: "liè quē nǎi diàn zhī shén， wàng shū shì yuè zhī yù。 gān lín、 gān shù， jǐn zhǐ shí yǔ； xuán qióng、 bǐ cāng， xī chēng shàng tiān。 xuě huā fēi liù chū， xiān zhào fēng nián； rì shàng yǐ sān gān， nǎi yún shí yàn。 shǔ quǎn fèi rì， bǐ rén suǒ jiàn shèn xī； wú niú chuǎn yuè， xiào rén wèi jù guò shèn。\nwàng qiè zhě， ruò yún ní zhī wàng； ēn shēn zhě， rú yǔ lù zhī ēn。 cān shāng èr xīng， qí chū mò bù xiāng jiàn； niú nǚ liǎng sù， wéi qī xī yī xiāng féng。 hòu yì qī， bēn yuè gōng ér wèi cháng é； fù shuō sǐ， qí jīng shén tuō yú jī wěi。 pī xīng dài yuè， wèi zǎo yè zhī bēn chí； mù yǔ zhì fēng， wèi fēng chén zhī láo kǔ。 shì fēi yǒu yì， pì rú yún chū wú xīn； ēn kě biàn shī， nǎi yuē yáng chūn yǒu jiǎo。",
        translation: "列缺是闪电之神，望舒是给月亮驾车的神。甘霖、甘澍，都是指及时的好雨；玄穹、彼苍，都是指上天。雪花是六个瓣的，预兆着丰收年；太阳升到三根竹竿高，就是说时候不早了。四川的狗见了太阳就叫，笑人见识太少；吴地的水牛见了月亮也喘气，笑人害怕得太过分。盼望得急切，就像大旱时盼望云彩和雨一样；恩情深重，就像雨露滋润万物一样。参星和商星，一个升起来另一个就落下去，永远碰不上面；牛郎星和织女星，一年只有七月初七相会一次。后羿的妻子飞进了月宫，成了嫦娥；傅说死后，灵魂升天，托在箕星和尾星之间。披星戴月，是说从早到晚赶路奔忙；沐雨栉风，是说在外面风里雨里地辛苦。做事不是故意的，就像白云飘出山间并没有心思；恩惠能普遍给到每个人，就说“阳春有脚”——春天长着脚，把温暖送到了每个角落。",
      }
      ],
    },
    {
      title: "天文（3） · 程登吉",
      art: 'primer-youxue:ch3',
      artPrompt: "古诗《天文（3）》意境插画：馈物致敬，曰敢效献曝之忱；托人转移，曰全赖回天之力。感救死之恩，曰再造；诵再生之德，曰二天。势易尽者若冰山，事相悬者如天壤。晨星谓贤人廖落，雷同谓言语相符。心多过虑，何异杞人忧天；事不量力，不殊夸父追日。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "馈物致敬，曰敢效献曝之忱；托人转移，曰全赖回天之力。感救死之恩，曰再造；诵再生之德，曰二天。势易尽者若冰山，事相悬者如天壤。晨星谓贤人廖落，雷同谓言语相符。心多过虑，何异杞人忧天；事不量力，不殊夸父追日。\n如夏日之可畏，是谓赵盾；如冬日之可爱，是谓赵衰。齐妇含冤，三年不雨；邹衍下狱，六月飞霜。父仇不共戴天，子道须当爱日。",
        pinyin: "kuì wù zhì jìng， yuē gǎn xiào xiàn pù zhī chén； tuō rén zhuǎn yí， yuē quán lài huí tiān zhī lì。 gǎn jiù sǐ zhī ēn， yuē zài zào； sòng zài shēng zhī dé， yuē èr tiān。 shì yì jìn zhě ruò bīng shān， shì xiāng xuán zhě rú tiān rǎng。 chén xīng wèi xián rén liào luò， léi tóng wèi yán yǔ xiāng fú。 xīn duō guò lǜ， hé yì qǐ rén yōu tiān； shì bù liàng lì， bù shū kuā fù zhuī rì。\nrú xià rì zhī kě wèi， shì wèi zhào dùn； rú dōng rì zhī kě ài， shì wèi zhào shuāi。 qí fù hán yuān， sān nián bù yǔ； zōu yǎn xià yù， liù yuè fēi shuāng。 fù chóu bù gòng dài tiān， zǐ dào xū dāng ài rì。",
        translation: "送东西给人表示敬意，说自己这是学“献曝”的一片诚心，就像献上晒太阳的暖和一样，东西虽薄心意真；托人去办难办的事，说全靠他有回天的大力。感谢救命的恩情，说是“再造之恩”，像重新给了自己一次生命；感念再生的恩德，说恩人就是自己的第二个老天爷。容易垮掉的权势像冰山，一见太阳就化了；相差悬殊的事，就像天和地隔得那么远。“晨星”是说贤德的人像清晨的星星一样稀少；“雷同”是说人说话随声附和，一个腔调。忧虑得没有道理，就像杞国人担心天塌下来；做事不自量力，就像夸父追赶太阳。像夏天的太阳一样令人畏惧，说的是赵盾；像冬天的太阳一样令人喜爱，说的是赵衰。齐国女子含冤而死，那地方三年没下雨；邹衍被冤枉下狱，六月里落了霜。杀父之仇，不能和仇人同在一个天底下活着；做儿女的道理，是要珍惜父母在世的日子，赶紧尽孝。",
      }
      ],
    },
    {
      title: "天文（4） · 程登吉",
      art: 'primer-youxue:ch4',
      artPrompt: "古诗《天文（4）》意境插画：盛世黎民，嬉游于光天化日之下；太平天子，上召夫景星庆云之祥。夏时大禹在位，上天雨金；春秋孝经既成，赤虹化玉。箕好风，毕好雨，比庶人愿欲不同；风从虎，云从龙，比君臣会合不偶。雨旸时若，系是休征；天地交泰，称斯盛世。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "盛世黎民，嬉游于光天化日之下；太平天子，上召夫景星庆云之祥。夏时大禹在位，上天雨金；春秋孝经既成，赤虹化玉。箕好风，毕好雨，比庶人愿欲不同；风从虎，云从龙，比君臣会合不偶。雨旸时若，系是休征；天地交泰，称斯盛世。",
        pinyin: "shèng shì lí mín， xī yóu yú guāng tiān huà rì zhī xià； tài píng tiān zǐ， shàng zhào fū jǐng xīng qìng yún zhī xiáng。 xià shí dà yǔ zài wèi， shàng tiān yǔ jīn； chūn qiū xiào jīng jì chéng， chì hóng huà yù。 jī hǎo fēng， bì hǎo yǔ， bǐ shù rén yuàn yù bù tóng； fēng cóng hǔ， yún cóng lóng， bǐ jūn chén huì hé bù ǒu。 yǔ yáng shí ruò， xì shì xiū zhēng； tiān dì jiāo tài， chēng sī shèng shì。",
        translation: "太平盛世的百姓，在明亮的阳光下快乐地游玩；太平的天子，上天会降下景星和吉祥彩云来应和他。夏朝大禹在位时，天上落下过金子；春秋时《孝经》写成，红色的长虹化成了美玉。箕星爱起风，毕星爱下雨，好比普通人的愿望各不相同；风跟着虎走，云跟着龙跑，好比贤明的君臣碰在一起绝非偶然。下雨、放晴都合节令，是好兆头；天地之气交融和顺，这样才称得上盛世。",
      }
      ],
    },
    {
      title: "地舆（5） · 程登吉",
      art: 'primer-youxue:ch5',
      artPrompt: "古诗《地舆（5）》意境插画：黄帝画野，始分都邑；夏禹治水，初奠山川。宇宙之江山不改，古今之称谓各殊。北京原属幽燕，金台是其异号；南京原为建业，金陵又是别名。浙江是武林之区，原为越国；江西是豫章之地，又曰吴皋。福建省属闽中，湖广地名三楚。东鲁西鲁，即山东山西之分；东粤西粤，乃广东广西之域。河南在华夏之中，故曰中州；陕西即长安之地，原为秦境。四川为西蜀，云南为古滇。贵州省近蛮方，自古名为黔地。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "黄帝画野，始分都邑；夏禹治水，初奠山川。宇宙之江山不改，古今之称谓各殊。北京原属幽燕，金台是其异号；南京原为建业，金陵又是别名。浙江是武林之区，原为越国；江西是豫章之地，又曰吴皋。福建省属闽中，湖广地名三楚。东鲁西鲁，即山东山西之分；东粤西粤，乃广东广西之域。河南在华夏之中，故曰中州；陕西即长安之地，原为秦境。四川为西蜀，云南为古滇。贵州省近蛮方，自古名为黔地。\n东岳泰山，西岳华山，南岳衡山，北岳恒山，中岳嵩山，此为天下之五岳；饶州之鄱阳，岳州之青草，润州之丹阳，鄂州之洞庭，苏州之太湖，此为天下之五湖。",
        pinyin: "huáng dì huà yě， shǐ fēn dōu yì； xià yǔ zhì shuǐ， chū diàn shān chuān。 yǔ zhòu zhī jiāng shān bù gǎi， gǔ jīn zhī chēng wèi gè shū。 běi jīng yuán shǔ yōu yàn， jīn tái shì qí yì hào； nán jīng yuán wèi jiàn yè， jīn líng yòu shì bié míng。 zhè jiāng shì wǔ lín zhī qū， yuán wèi yuè guó； jiāng xī shì yù zhāng zhī dì， yòu yuē wú gāo。 fú jiàn shěng shǔ mǐn zhōng， hú guǎng dì míng sān chǔ。 dōng lǔ xī lǔ， jí shān dōng shān xī zhī fēn； dōng yuè xī yuè， nǎi guǎng dōng guǎng xī zhī yù。 hé nán zài huá xià zhī zhōng， gù yuē zhōng zhōu； shǎn xī jí cháng ān zhī dì， yuán wèi qín jìng。 sì chuān wèi xī shǔ， yún nán wèi gǔ diān。 guì zhōu shěng jìn mán fāng， zì gǔ míng wèi qián dì。\ndōng yuè tài shān， xī yuè huà shān， nán yuè héng shān， běi yuè héng shān， zhōng yuè sōng shān， cǐ wèi tiān xià zhī wǔ yuè； ráo zhōu zhī pó yáng， yuè zhōu zhī qīng cǎo， rùn zhōu zhī dān yáng， è zhōu zhī dòng tíng， sū zhōu zhī tài hú， cǐ wèi tiān xià zhī wǔ hú。",
        translation: "黄帝划分天下的疆界，才有了城邑；夏禹治理洪水，才安定了山川。宇宙间的江山没有变，古往今来的叫法却各不相同。北京古时候属幽燕之地，又叫金台；南京古时叫建业，别名金陵。浙江是杭州一带，古时是越国；江西是古时豫章的地方，又叫吴皋。福建属于古时的闽地，湖广古时叫三楚。东鲁、西鲁，就是山东、山西的分别；东粤、西粤，就是广东、广西的地界。河南在华夏大地的中间，所以叫中州；陕西就是长安一带，原是秦国的地界。四川古称西蜀，云南是古时的滇国。贵州靠近南方边远地区，自古称黔地。东岳泰山、西岳华山、南岳衡山、北岳恒山、中岳嵩山，这是天下的五岳；饶州的鄱阳湖、岳州的青草湖、润州的丹阳湖、鄂州的洞庭湖、苏州的太湖，这是天下的五湖。",
      }
      ],
    },
    {
      title: "地舆（6） · 程登吉",
      art: 'primer-youxue:ch6',
      artPrompt: "古诗《地舆（6）》意境插画：金城汤池，谓城池之巩固；砺山带河，乃封建之誓盟。帝都曰京师，故乡曰梓里。蓬莱弱水，惟飞仙可渡；方壶员峤，乃仙子所居。沧海桑田，谓世事之多变；河清海晏，兆天下之升平。水神曰冯夷，又曰阳侯，火神曰祝融，又曰回禄。海神曰海若，海眼曰尾闾。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "金城汤池，谓城池之巩固；砺山带河，乃封建之誓盟。帝都曰京师，故乡曰梓里。蓬莱弱水，惟飞仙可渡；方壶员峤，乃仙子所居。沧海桑田，谓世事之多变；河清海晏，兆天下之升平。水神曰冯夷，又曰阳侯，火神曰祝融，又曰回禄。海神曰海若，海眼曰尾闾。\n望人包容曰海涵，谢人思泽曰河润。无系累者曰江湖散人，负豪气者曰湖海之士。问舍求田，原无大志；掀天揭地，方是奇才。凭空起事，谓之平地风波；独立不移，谓之中流砥柱。黑子、弹丸，漫言至小之邑；咽喉、右臂，皆言要害之区。",
        pinyin: "jīn chéng tāng chí， wèi chéng chí zhī gǒng gù； lì shān dài hé， nǎi fēng jiàn zhī shì méng。 dì dū yuē jīng shī， gù xiāng yuē zǐ lǐ。 péng lái ruò shuǐ， wéi fēi xiān kě dù； fāng hú yuán qiáo， nǎi xiān zǐ suǒ jū。 cāng hǎi sāng tián， wèi shì shì zhī duō biàn； hé qīng hǎi yàn， zhào tiān xià zhī shēng píng。 shuǐ shén yuē féng yí， yòu yuē yáng hóu， huǒ shén yuē zhù róng， yòu yuē huí lù。 hǎi shén yuē hǎi ruò， hǎi yǎn yuē wěi lǘ。\nwàng rén bāo róng yuē hǎi hán， xiè rén sī zé yuē hé rùn。 wú xì lèi zhě yuē jiāng hú sàn rén， fù háo qì zhě yuē hú hǎi zhī shì。 wèn shè qiú tián， yuán wú dà zhì； xiān tiān jiē dì， fāng shì qí cái。 píng kōng qǐ shì， wèi zhī píng dì fēng bō； dú lì bù yí， wèi zhī zhōng liú dǐ zhù。 hēi zǐ、 dàn wán， màn yán zhì xiǎo zhī yì； yān hóu、 yòu bì， jiē yán yào hài zhī qū。",
        translation: "“金城汤池”——金属铸的城墙、开水一样的护城河，形容城防特别坚固；“砺山带河”——拿泰山当磨刀石、黄河当衣带，是分封诸侯时的誓言，意思是江山要传到永远。京城叫京师，故乡叫梓里。蓬莱的弱水，只有会飞的神仙才渡得过去；方壶、员峤，是神仙住的地方。“沧海桑田”，大海变成桑田，是说世事变化很大；“河清海晏”，黄河水清、大海平静，预示天下太平。水神叫冯夷，又叫阳侯；火神叫祝融，又叫回禄；海神叫海若，海底泄水的地方叫尾闾。请人包容，叫“海涵”；感谢别人的恩惠，叫“河润”。无牵无挂的人叫江湖散人，有豪气的人叫湖海之士。只想置房子买田地的人，本来就没有大志向；能做掀天揭地大事的，才是奇才。无缘无故生出事端，叫“平地风波”；独自屹立绝不动摇，叫“中流砥柱”。“黑子”“弹丸”，都是形容极小的城邑；“咽喉”“右臂”，都是形容顶要紧的地方。",
      }
      ],
    },
    {
      title: "地舆（7） · 程登吉",
      art: 'primer-youxue:ch7',
      artPrompt: "古诗《地舆（7）》意境插画：独立难持，曰一木焉能支大厦；英雄自恃，曰丸泥亦可封函关。事先败而后成，曰失之东隅，收之桑榆；事将成而终止，曰为山九仞，功亏一篑。以蠡测海，喻人之见小；精卫衔石，比人之徒劳。跋涉谓行路艰难，康庄谓道路平坦。硗地曰不毛之地，美田曰膏腴之田。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "独立难持，曰一木焉能支大厦；英雄自恃，曰丸泥亦可封函关。事先败而后成，曰失之东隅，收之桑榆；事将成而终止，曰为山九仞，功亏一篑。以蠡测海，喻人之见小；精卫衔石，比人之徒劳。跋涉谓行路艰难，康庄谓道路平坦。硗地曰不毛之地，美田曰膏腴之田。\n得物无所用，曰如获石田；为学己大成，曰诞登道岸。淄渑之滋味可辨，泾渭之清浊当分。泌水乐饥，隐居不仕；东山高卧，谢职求安。圣人出则黄河清，太守廉则越石见。美俗曰仁里，恶俗曰互乡。里名胜母，曾子不入；邑号朝歌，墨翟回车。",
        pinyin: "dú lì nán chí， yuē yī mù yān néng zhī dà shà； yīng xióng zì shì， yuē wán ní yì kě fēng hán guān。 shì xiān bài ér hòu chéng， yuē shī zhī dōng yú， shōu zhī sāng yú； shì jiāng chéng ér zhōng zhǐ， yuē wèi shān jiǔ rèn， gōng kuī yī kuì。 yǐ lí cè hǎi， yù rén zhī jiàn xiǎo； jīng wèi xián shí， bǐ rén zhī tú láo。 bá shè wèi xíng lù jiān nán， kāng zhuāng wèi dào lù píng tǎn。 qiāo dì yuē bù máo zhī dì， měi tián yuē gāo yú zhī tián。\ndé wù wú suǒ yòng， yuē rú huò shí tián； wèi xué jǐ dà chéng， yuē dàn dēng dào àn。 zī miǎn zhī zī wèi kě biàn， jīng wèi zhī qīng zhuó dāng fēn。 mì shuǐ lè jī， yǐn jū bù shì； dōng shān gāo wò， xiè zhí qiú ān。 shèng rén chū zé huáng hé qīng， tài shǒu lián zé yuè shí jiàn。 měi sú yuē rén lǐ， è sú yuē hù xiāng。 lǐ míng shèng mǔ， céng zǐ bù rù； yì hào cháo gē， mò zhái huí chē。",
        translation: "一个人的力量撑不住大局，就说“一根木头哪能撑起大厦”；英雄自负，就说“一团泥巴也能封住函谷关”。事情先失败后来成功，叫“失之东隅，收之桑榆”——早晨丢了，傍晚又收回来；事情快成了却停了下来，叫“堆九仞高的山，差一筐土没堆成”。用瓢去量海水，比喻人见识短浅；精卫鸟衔着石子去填海，比喻人白费力气。“跋涉”是说走路艰难，“康庄”是说道路平坦宽阔。长不出庄稼的地叫不毛之地，肥得流油的田叫膏腴之田。得到一样没用的东西，叫“如获石田”，像得了一块尽是石头的田；学问大有成就，叫“诞登道岸”，像登上了大道的彼岸。淄水和渑水的味道不同也能分辨出来；泾水浊、渭水清，应当分得清楚。在泌水边喝泉水也觉得快乐，是说隐居不做官；在东山高枕安卧，是说辞官求清静。圣人一出现，黄河水就变清；太守一廉洁，越王石就露出水面。风俗好的地方叫仁里，风俗坏的地方叫互乡。有个地方叫“胜母”——胜过母亲，曾子不肯进去；有个城叫“朝歌”——清早唱歌享乐，墨子掉转车头就走。",
      }
      ],
    },
    {
      title: "地舆（8） · 程登吉",
      art: 'primer-youxue:ch8',
      artPrompt: "古诗《地舆（8）》意境插画：击壤而歌，尧帝黎民之自得；让畔而耕，文王百姓之相推。费长房有缩地之方，秦始皇有鞭石之法。尧有九年之水患，汤有七年之旱灾。商鞅不仁而阡陌开，夏桀无道而伊洛竭。道不拾遗，由在上有善政；海不扬波，知中国有圣人。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "击壤而歌，尧帝黎民之自得；让畔而耕，文王百姓之相推。费长房有缩地之方，秦始皇有鞭石之法。尧有九年之水患，汤有七年之旱灾。商鞅不仁而阡陌开，夏桀无道而伊洛竭。道不拾遗，由在上有善政；海不扬波，知中国有圣人。",
        pinyin: "jī rǎng ér gē， yáo dì lí mín zhī zì dé； ràng pàn ér gēng， wén wáng bǎi xìng zhī xiāng tuī。 fèi cháng fáng yǒu suō dì zhī fāng， qín shǐ huáng yǒu biān shí zhī fǎ。 yáo yǒu jiǔ nián zhī shuǐ huàn， tāng yǒu qī nián zhī hàn zāi。 shāng yāng bù rén ér qiān mò kāi， xià jié wú dào ér yī luò jié。 dào bù shí yí， yóu zài shàng yǒu shàn zhèng； hǎi bù yáng bō， zhī zhōng guó yǒu shèng rén。",
        translation: "敲着土块唱歌，是尧帝时百姓自得其乐的样子；耕田时互相让地界，是文王时百姓互相谦让的风气。费长房有把千里路缩成一步的法术，秦始皇有鞭打石头铺成桥的传说。尧帝时有九年大水的水患，商汤时有七年大旱的灾荒。商鞅不讲仁德，开出了新的田界；夏桀荒淫无道，伊水和洛水都枯竭了。路上丢了东西没人捡走，是因为在上位的政治好；大海风平浪静不兴风浪，就知道中国有圣人在世。",
      }
      ],
    },
    {
      title: "岁时（9） · 程登吉",
      art: 'primer-youxue:ch9',
      artPrompt: "古诗《岁时（9）》意境插画：爆竹一声除旧，桃符万户更新。履端是初一元旦，人日是初七灵辰。元日献君以《椒花颂》，为祝遐龄；元日饮人以屠苏酒，可除疠疫。新岁曰王春，去年曰客岁。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "爆竹一声除旧，桃符万户更新。履端是初一元旦，人日是初七灵辰。元日献君以《椒花颂》，为祝遐龄；元日饮人以屠苏酒，可除疠疫。新岁曰王春，去年曰客岁。\n火树银花合，谓元宵灯火之辉煌；星桥铁锁开，调元夕金吾之不禁。二月朔为中和节，三月三为上巳辰。冬至百六是清明，立春五戊为春社。寒食节是清明前一日，初伏日是夏至第三庚。四月乃是麦秋，端午却为蒲节。",
        pinyin: "bào zhú yī shēng chú jiù， táo fú wàn hù gēng xīn。 lǚ duān shì chū yī yuán dàn， rén rì shì chū qī líng chén。 yuán rì xiàn jūn yǐ《 jiāo huā sòng》， wèi zhù xiá líng； yuán rì yǐn rén yǐ tú sū jiǔ， kě chú lì yì。 xīn suì yuē wáng chūn， qù nián yuē kè suì。\nhuǒ shù yín huā hé， wèi yuán xiāo dēng huǒ zhī huī huáng； xīng qiáo tiě suǒ kāi， tiáo yuán xī jīn wú zhī bù jīn。 èr yuè shuò wèi zhōng hé jié， sān yuè sān wèi shàng sì chén。 dōng zhì bǎi liù shì qīng míng， lì chūn wǔ wù wèi chūn shè。 hán shí jié shì qīng míng qián yī rì， chū fú rì shì xià zhì dì sān gēng。 sì yuè nǎi shì mài qiū， duān wǔ què wèi pú jié。",
        translation: "爆竹一响，送走旧岁；千家万户换上新桃符，万象更新。“履端”指的是正月初一元旦，“人日”是正月初七的好日子。正月初一献上《椒花颂》，是祝人长寿；正月初一请人喝屠苏酒，可以驱除疾病。新的一年叫“王春”，去年叫“客岁”。“火树银花合”，形容元宵节的灯火辉煌；“星桥铁锁开”，是说元宵夜解除了宵禁，大家尽情游玩。二月初一是中和节，三月初三是上巳节。冬至后一百零六天是清明，立春后第五个戊日是春社。寒食节在清明的前一天，初伏的日子是夏至后第三个庚日。四月是麦子成熟的时节，叫麦秋；端午又叫蒲节。",
      }
      ],
    },
    {
      title: "岁时（10） · 程登吉",
      art: 'primer-youxue:ch10',
      artPrompt: "古诗《岁时（10）》意境插画：六月六日，节名天贶；五月五日，序号天中。端阳竞渡，吊屈原之溺水；重九登高，效桓景之避灾。五戊鸡豚宴社，处处饮治聋之酒；七夕牛女渡河，家家穿乞巧之针。中秋月朗，明皇亲游于月殿；九日风高，孟嘉帽落于龙山。秦人岁终祭神曰腊，故至今以十二月为腊；故皇当年御讳曰政，故至今读正月为征。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "六月六日，节名天贶；五月五日，序号天中。端阳竞渡，吊屈原之溺水；重九登高，效桓景之避灾。五戊鸡豚宴社，处处饮治聋之酒；七夕牛女渡河，家家穿乞巧之针。中秋月朗，明皇亲游于月殿；九日风高，孟嘉帽落于龙山。秦人岁终祭神曰腊，故至今以十二月为腊；故皇当年御讳曰政，故至今读正月为征。\n东方之神曰太皞，乘震而司春，甲乙属木，木则旺于春，其色青，故春帝曰青帝。南方之神曰祝融，居高而司夏，丙丁属火，火则旺于夏，其色赤，故夏帝曰赤帝。西方之神曰蓐收，当兑而司秋，庚辛属金，金则旺于秋，其色白，故秋帝曰白帝。北方之神曰玄冥，乘坎而司冬，壬癸属水，水则旺于冬，其色黑，放冬帝曰黑帝。中央戊己属土，其色黄，故中央帝曰黄帝。",
        pinyin: "liù yuè liù rì， jié míng tiān kuàng； wǔ yuè wǔ rì， xù hào tiān zhōng。 duān yáng jìng dù， diào qū yuán zhī nì shuǐ； chóng jiǔ dēng gāo， xiào huán jǐng zhī bì zāi。 wǔ wù jī tún yàn shè， chù chù yǐn zhì lóng zhī jiǔ； qī xī niú nǚ dù hé， jiā jiā chuān qǐ qiǎo zhī zhēn。 zhōng qiū yuè lǎng， míng huáng qīn yóu yú yuè diàn； jiǔ rì fēng gāo， mèng jiā mào luò yú lóng shān。 qín rén suì zhōng jì shén yuē là， gù zhì jīn yǐ shí èr yuè wèi là； gù huáng dāng nián yù huì yuē zhèng， gù zhì jīn dú zhēng yuè wèi zhēng。\ndōng fāng zhī shén yuē tài hào， chéng zhèn ér sī chūn， jiǎ yǐ shǔ mù， mù zé wàng yú chūn， qí sè qīng， gù chūn dì yuē qīng dì。 nán fāng zhī shén yuē zhù róng， jū gāo ér sī xià， bǐng dīng shǔ huǒ， huǒ zé wàng yú xià， qí sè chì， gù xià dì yuē chì dì。 xī fāng zhī shén yuē rù shōu， dāng duì ér sī qiū， gēng xīn shǔ jīn， jīn zé wàng yú qiū， qí sè bái， gù qiū dì yuē bái dì。 běi fāng zhī shén yuē xuán míng， chéng kǎn ér sī dōng， rén guǐ shǔ shuǐ， shuǐ zé wàng yú dōng， qí sè hēi， fàng dōng dì yuē hēi dì。 zhōng yāng wù jǐ shǔ tǔ， qí sè huáng， gù zhōng yāng dì yuē huáng dì。",
        translation: "六月六日的节名叫“天贶节”；五月初五叫“天中节”。端午节赛龙舟，是悼念投江的屈原；重阳节登高，是学桓景躲避灾祸。春社日家家杀鸡宰猪设宴，到处喝着“治聋”的社酒；七夕牛郎织女渡河相会，家家姑娘穿针引线“乞巧”。中秋月光明亮，传说唐明皇游过月宫；重九风大，孟嘉的帽子被吹落在龙山。秦朝人年底祭神叫“腊”，所以至今农历十二月叫腊月；秦始皇名叫嬴政，为避他的名讳，“正月”至今读作“征月”。东方之神叫太皞，掌管春天；甲乙属木，木在春天最旺，颜色是青色，所以春帝叫青帝。南方之神叫祝融，掌管夏天；丙丁属火，火在夏天最旺，颜色是红色，所以夏帝叫赤帝。西方之神叫蓐收，掌管秋天；庚辛属金，金在秋天最旺，颜色是白色，所以秋帝叫白帝。北方之神叫玄冥，掌管冬天；壬癸属水，水在冬天最旺，颜色是黑色，所以冬帝叫黑帝。中央戊己属土，颜色是黄色，所以中央的天帝叫黄帝。",
      }
      ],
    },
    {
      title: "岁时（11） · 程登吉",
      art: 'primer-youxue:ch11',
      artPrompt: "古诗《岁时（11）》意境插画：夏至一阴生，是以天时渐短；冬至一阳生，是以日晷初长。冬至到而葭灰飞，立秋至而梧叶落。上弦谓月圆其半，系初八、九；下弦谓月缺其半，系廿二、三。月光都尽谓之晦，三十日之名；月光复苏谓之朔，初一日之号；月与日对谓之望，十五日之称。初一是死魄，初二旁死魄，初三哉生明，十六始生魄。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "夏至一阴生，是以天时渐短；冬至一阳生，是以日晷初长。冬至到而葭灰飞，立秋至而梧叶落。上弦谓月圆其半，系初八、九；下弦谓月缺其半，系廿二、三。月光都尽谓之晦，三十日之名；月光复苏谓之朔，初一日之号；月与日对谓之望，十五日之称。初一是死魄，初二旁死魄，初三哉生明，十六始生魄。\n翌日、诘朝，言皆明日；榖旦、吉旦，悉是良辰。片晌即谓片时，日曛乃云日暮。畴昔、曩者，俱前日之谓；黎明、昧爽，皆将曙之时。月有三浣：初旬十日为上浣，中旬十日为中浣，下旬十日为下浣；学足三余：夜者日之余，冬者岁之余，雨者睛之余。",
        pinyin: "xià zhì yī yīn shēng， shì yǐ tiān shí jiàn duǎn； dōng zhì yī yáng shēng， shì yǐ rì guǐ chū cháng。 dōng zhì dào ér jiā huī fēi， lì qiū zhì ér wú yè luò。 shàng xián wèi yuè yuán qí bàn， xì chū bā、 jiǔ； xià xián wèi yuè quē qí bàn， xì niàn èr、 sān。 yuè guāng dōu jìn wèi zhī huì， sān shí rì zhī míng； yuè guāng fù sū wèi zhī shuò， chū yī rì zhī hào； yuè yǔ rì duì wèi zhī wàng， shí wǔ rì zhī chēng。 chū yī shì sǐ pò， chū èr páng sǐ pò， chū sān zāi shēng míng， shí liù shǐ shēng pò。\nyì rì、 jié cháo， yán jiē míng rì； gǔ dàn、 jí dàn， xī shì liáng chén。 piàn shǎng jí wèi piàn shí， rì xūn nǎi yún rì mù。 chóu xī、 nǎng zhě， jù qián rì zhī wèi； lí míng、 mèi shuǎng， jiē jiāng shǔ zhī shí。 yuè yǒu sān huàn： chū xún shí rì wèi shàng huàn， zhōng xún shí rì wèi zhōng huàn， xià xún shí rì wèi xià huàn； xué zú sān yú： yè zhě rì zhī yú， dōng zhě suì zhī yú， yǔ zhě jīng zhī yú。",
        translation: "夏至那天阴气开始生长，所以白天渐渐变短；冬至那天阳气开始生长，所以白天渐渐变长。冬至一到，律管里的葭灰就飞起来了；立秋一到，梧桐叶就开始落了。“上弦”是说月亮圆了一半，在初八初九；“下弦”是说月亮缺了一半，在二十二、二十三。月光全没有了叫“晦”，是三十日的名字；月光重新亮起来叫“朔”，是初一的称号；月亮和太阳遥遥相对叫“望”，是十五的叫法。初一叫“死魄”，月亮没有光；初三叫“哉生明”，月光开始亮起来；十六叫“始生魄”，月亮开始缺了。“翌日”“诘朝”都是说明天；“榖旦”“吉旦”都是好日子。“片晌”就是一小会儿，“日曛”是说太阳落山了。“畴昔”“曩者”都是说从前；“黎明”“昧爽”都是天快亮的时候。一个月分三浣：上旬十天叫上浣，中旬十天叫中浣，下旬十天叫下浣。读书要用好“三余”：晚上是一天剩下的时光，冬天是一年剩下的时光，雨天是晴天之外的时光。",
      }
      ],
    },
    {
      title: "岁时（12） · 程登吉",
      art: 'primer-youxue:ch12',
      artPrompt: "古诗《岁时（12）》意境插画：以术愚人，曰朝三暮四；为学求益，曰日就月将。焚膏继晷，日夜辛勤；俾昼作夜，晨昏颠倒。自愧无成，曰虚延岁月；与人共语，曰少叙寒暄。可憎者，人情冷暖；可厌者，世态炎凉。周末无寒年，因东周之懦弱；秦亡无燠岁，由嬴氏之凶残。泰阶星平曰泰平，时序调和曰玉烛。岁歉曰饥馑之岁，年丰曰大有之年。唐德宗之饥年，醉人为瑞；梁惠王之凶岁，野莩堪怜。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "以术愚人，曰朝三暮四；为学求益，曰日就月将。焚膏继晷，日夜辛勤；俾昼作夜，晨昏颠倒。自愧无成，曰虚延岁月；与人共语，曰少叙寒暄。可憎者，人情冷暖；可厌者，世态炎凉。周末无寒年，因东周之懦弱；秦亡无燠岁，由嬴氏之凶残。泰阶星平曰泰平，时序调和曰玉烛。岁歉曰饥馑之岁，年丰曰大有之年。唐德宗之饥年，醉人为瑞；梁惠王之凶岁，野莩堪怜。\n丰年玉，荒年谷，言人品之可珍；薪如桂，食如玉，言薪米之腾贵。春祈秋报，农夫之常规；夜寐夙兴，吾人之勤事。韶华不再，吾辈须当惜阴；日月其除，志士正宜待旦。",
        pinyin: "yǐ shù yú rén， yuē cháo sān mù sì； wèi xué qiú yì， yuē rì jiù yuè jiāng。 fén gāo jì guǐ， rì yè xīn qín； bǐ zhòu zuò yè， chén hūn diān dǎo。 zì kuì wú chéng， yuē xū yán suì yuè； yǔ rén gòng yǔ， yuē shǎo xù hán xuān。 kě zēng zhě， rén qíng lěng nuǎn； kě yàn zhě， shì tài yán liáng。 zhōu mò wú hán nián， yīn dōng zhōu zhī nuò ruò； qín wáng wú yù suì， yóu yíng shì zhī xiōng cán。 tài jiē xīng píng yuē tài píng， shí xù tiáo hé yuē yù zhú。 suì qiàn yuē jī jǐn zhī suì， nián fēng yuē dà yǒu zhī nián。 táng dé zōng zhī jī nián， zuì rén wéi ruì； liáng huì wáng zhī xiōng suì， yě piǎo kān lián。\nfēng nián yù， huāng nián gǔ， yán rén pǐn zhī kě zhēn； xīn rú guì， shí rú yù， yán xīn mǐ zhī téng guì。 chūn qí qiū bào， nóng fū zhī cháng guī； yè mèi sù xīng， wú rén zhī qín shì。 sháo huá bù zài， wú bèi xū dāng xī yīn； rì yuè qí chú， zhì shì zhèng yí dài dàn。",
        translation: "用花招耍弄人，叫“朝三暮四”；做学问天天进步，叫“日就月将”。“焚膏继晷”，点上灯油接着白天学习，是说日夜辛勤；“俾昼作夜”，把白天当黑夜过，是晨昏颠倒。惭愧自己没有成就，说“虚延岁月”，白白耽误了光阴；和别人说话聊天，叫“少叙寒暄”。让人寒心的是人情的冷暖，让人讨厌的是世态的炎凉。周朝末年没有寒冷的年份，是说东周王室软弱；秦朝没有温暖的年份，是因为嬴氏太凶残。泰阶星平稳叫“泰平”，四时调和叫“玉烛”。歉收的年份叫“饥馑之岁”，丰收的年份叫“大有之年”。唐德宗时的饥荒年，路边有个喝醉的人竟被当作祥瑞；梁惠王时的荒年，路边饿死的人实在可怜。“丰年的玉，荒年的谷”，是说人品像它们一样珍贵；“柴贵得像桂木，米贵得像白玉”，是说柴米价格飞涨。春天祈求丰收，秋天祭祀报答，是农民的老规矩；晚睡早起，是我们的勤快本分。美好年华一去不回，我们要珍惜光阴；日月一天天过去，有志气的人应当天不亮就起来努力。",
      }
      ],
    },
    {
      title: "朝廷（13） · 程登吉",
      art: 'primer-youxue:ch13',
      artPrompt: "古诗《朝廷（13）》意境插画：三皇为皇，五帝为帝。以德行仁者王，以力假仁者霸。天子天下之主，诸侯一国之君。官天下，乃以位让贤；家天下，是以位传子。陛下尊称天子，殿下尊重宗藩。皇帝即位曰龙飞，人臣觐君曰虎拜。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "三皇为皇，五帝为帝。以德行仁者王，以力假仁者霸。天子天下之主，诸侯一国之君。官天下，乃以位让贤；家天下，是以位传子。陛下尊称天子，殿下尊重宗藩。皇帝即位曰龙飞，人臣觐君曰虎拜。\n皇帝之言，谓之纶音；皇后之命，乃称懿旨。椒房是皇后所居，枫宸乃人君所莅。天子尊崇，故称元首；臣邻辅翼，故日股肱。龙之种，麟之角，俱誉宗藩；君之储，国之贰，首称太子。帝子爰立青宫，帝印乃是玉玺。",
        pinyin: "sān huáng wèi huáng， wǔ dì wèi dì。 yǐ dé xíng rén zhě wáng， yǐ lì jiǎ rén zhě bà。 tiān zǐ tiān xià zhī zhǔ， zhū hóu yī guó zhī jūn。 guān tiān xià， nǎi yǐ wèi ràng xián； jiā tiān xià， shì yǐ wèi chuán zǐ。 bì xià zūn chēng tiān zǐ， diàn xià zūn zhòng zōng fān。 huáng dì jí wèi yuē lóng fēi， rén chén jìn jūn yuē hǔ bài。\nhuáng dì zhī yán， wèi zhī lún yīn； huáng hòu zhī mìng， nǎi chēng yì zhǐ。 jiāo fáng shì huáng hòu suǒ jū， fēng chén nǎi rén jūn suǒ lì。 tiān zǐ zūn chóng， gù chēng yuán shǒu； chén lín fǔ yì， gù rì gǔ gōng。 lóng zhī zhǒng， lín zhī jiǎo， jù yù zōng fān； jūn zhī chǔ， guó zhī èr， shǒu chēng tài zǐ。 dì zǐ yuán lì qīng gōng， dì yìn nǎi shì yù xǐ。",
        translation: "三皇称为“皇”，五帝称为“帝”。靠德行施行仁义的称“王”，靠武力假借仁义的称“霸”。天子是天下的共主，诸侯是一国的国君。“官天下”，是把王位让给贤能的人；“家天下”，是把王位传给自己的儿子。“陛下”是对天子的尊称，“殿下”是对亲王的尊称。皇帝登基叫“龙飞”，大臣朝见皇帝叫“虎拜”。皇帝的话叫“纶音”，皇后的命令叫“懿旨”。椒房是皇后住的地方，枫宸是皇帝坐朝的地方。天子至尊至贵，所以叫“元首”；大臣辅佐天子，所以叫“股肱”，像大腿和手臂一样得力。“龙的后代”“麒麟的角”，都是称赞皇族子弟；君主的接班人、国家的第二人，首先是指太子。太子住在青宫，皇帝的印是玉玺。",
      }
      ],
    },
    {
      title: "朝廷（14） · 程登吉",
      art: 'primer-youxue:ch14',
      artPrompt: "古诗《朝廷（14）》意境插画：宗室之派，演于天潢；帝胄之谱，名为玉牒。前星耀彩，共祝太子以千秋；嵩岳效灵，三呼天子以万岁。神器大宝，皆言帝位；妃嫔媵嫱，总是宫娥。姜后脱簪而待罪，世称哲后；马后练服以鸣俭，共仰贤妃。唐放勋德配昊天，遂动华封之三祝；汉太子恩覃少海，乃兴乐府之四歌。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "宗室之派，演于天潢；帝胄之谱，名为玉牒。前星耀彩，共祝太子以千秋；嵩岳效灵，三呼天子以万岁。神器大宝，皆言帝位；妃嫔媵嫱，总是宫娥。姜后脱簪而待罪，世称哲后；马后练服以鸣俭，共仰贤妃。唐放勋德配昊天，遂动华封之三祝；汉太子恩覃少海，乃兴乐府之四歌。",
        pinyin: "zōng shì zhī pài， yǎn yú tiān huáng； dì zhòu zhī pǔ， míng wèi yù dié。 qián xīng yào cǎi， gòng zhù tài zǐ yǐ qiān qiū； sōng yuè xiào líng， sān hū tiān zǐ yǐ wàn suì。 shén qì dà bǎo， jiē yán dì wèi； fēi pín yìng qiáng， zǒng shì gōng é。 jiāng hòu tuō zān ér dài zuì， shì chēng zhé hòu； mǎ hòu liàn fú yǐ míng jiǎn， gòng yǎng xián fēi。 táng fàng xūn dé pèi hào tiān， suì dòng huá fēng zhī sān zhù； hàn tài zǐ ēn qín shǎo hǎi， nǎi xīng yuè fǔ zhī sì gē。",
        translation: "皇族的世系，像天上的银河，叫“天潢”；皇帝的家谱，叫“玉牒”。前星放出光彩，大家一起祝太子千秋；嵩山显出灵验，人们三次高呼天子万岁。“神器”“大宝”，都是指皇帝的宝座；“妃嫔媵嫱”，都是宫里的女子。姜后摘下首饰、脱去盛装等候处罚，世人称她贤明的王后；马皇后穿粗布衣裳标榜节俭，大家都敬仰这位贤妃。唐尧的德行比得上上天，感动了华封人连祝他三愿；汉代太子的恩德像海一样深广，乐府为他作了四首歌。",
      }
      ],
    },
    {
      title: "文臣（15） · 程登吉",
      art: 'primer-youxue:ch15',
      artPrompt: "古诗《文臣（15）》意境插画：帝王有出震向离之象，大臣有补天浴日之功。三公上应三台，郎官上应列宿。宰相位居台铉，吏部职掌铨衡。吏部天官大冢宰，户部地官大司徒。礼部春官大宗伯，兵部夏官大司马。刑部秋官大司寇，工部冬官大司空。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "帝王有出震向离之象，大臣有补天浴日之功。三公上应三台，郎官上应列宿。宰相位居台铉，吏部职掌铨衡。吏部天官大冢宰，户部地官大司徒。礼部春官大宗伯，兵部夏官大司马。刑部秋官大司寇，工部冬官大司空。\n都宪中丞，都御史之号；内翰学士，翰林院之称。天使誉称行人，司成尊称祭酒。称都堂曰大抚台，称巡按曰大柱史。方伯、藩侯，左右布政之号；宪台、廉宪，提刑按察之称。宗师称为大文衡，副使称为大宪副。郡侯、邦伯，知府名尊；郡丞、贰候，同知誉美。郡宰、别驾，乃称通判；司理、豸史，赞美推官。刺史、州牧，乃知州之两号；豸史、台谏，即知县之以称。乡宦曰乡绅，农官曰田畯。钧座、台座，皆称仕宦；帐下、麾下，并美武官。秩官既分九品，命妇亦有七阶。一品曰夫人，二品亦夫人，三品曰淑人，四品曰恭人，五品曰宜人，六品曰安人，七品曰孺人。",
        pinyin: "dì wáng yǒu chū zhèn xiàng lí zhī xiàng， dà chén yǒu bǔ tiān yù rì zhī gōng。 sān gōng shàng yìng sān tái， láng guān shàng yìng liè sù。 zǎi xiàng wèi jū tái xuàn， lì bù zhí zhǎng quán héng。 lì bù tiān guān dà zhǒng zǎi， hù bù dì guān dà sī tú。 lǐ bù chūn guān dà zōng bó， bīng bù xià guān dà sī mǎ。 xíng bù qiū guān dà sī kòu， gōng bù dōng guān dà sī kōng。\ndōu xiàn zhōng chéng， dōu yù shǐ zhī hào； nèi hàn xué shì， hàn lín yuàn zhī chēng。 tiān shǐ yù chēng xíng rén， sī chéng zūn chēng jì jiǔ。 chēng dōu táng yuē dà fǔ tái， chēng xún àn yuē dà zhù shǐ。 fāng bó、 fān hóu， zuǒ yòu bù zhèng zhī hào； xiàn tái、 lián xiàn， tí xíng àn chá zhī chēng。 zōng shī chēng wéi dà wén héng， fù shǐ chēng wéi dà xiàn fù。 jùn hóu、 bāng bó， zhī fǔ míng zūn； jùn chéng、 èr hòu， tóng zhī yù měi。 jùn zǎi、 bié jià， nǎi chēng tōng pàn； sī lǐ、 zhì shǐ， zàn měi tuī guān。 cì shǐ、 zhōu mù， nǎi zhī zhōu zhī liǎng hào； zhì shǐ、 tái jiàn， jí zhī xiàn zhī yǐ chēng。 xiāng huàn yuē xiāng shēn， nóng guān yuē tián jùn。 jūn zuò、 tái zuò， jiē chēng shì huàn； zhàng xià、 huī xià， bìng měi wǔ guān。 zhì guān jì fēn jiǔ pǐn， mìng fù yì yǒu qī jiē。 yī pǐn yuē fū rén， èr pǐn yì fū rén， sān pǐn yuē shū rén， sì pǐn yuē gōng rén， wǔ pǐn yuē yí rén， liù pǐn yuē ān rén， qī pǐn yuē rú rén。",
        translation: "帝王有“出震向离”的气象，像太阳从东方升起照向南方；大臣有“补天浴日”的大功，像补好天、洗净太阳一样挽救江山。三公对应天上的三台星，郎官对应天上的众星宿。宰相位居“台铉”，像鼎杠一样执掌大政；吏部掌管选拔衡量人才。吏部称天官、大冢宰，户部称地官、大司徒，礼部称春官、大宗伯，兵部称夏官、大司马，刑部称秋官、大司寇，工部称冬官、大司空。“都宪”“中丞”是都御史的称号，“内翰”“学士”是翰林院的称呼。“天使”是对使臣的美称，“司成”是对祭酒的尊称。称都堂为“大抚台”，称巡按为“大柱史”。“方伯”“藩侯”是布政使的称号，“宪台”“廉宪”是提刑按察使的称呼。学政称“大文衡”，副使称“大宪副”。“郡侯”“邦伯”是对知府的尊称，“郡丞”“贰候”是对同知的美称。“郡宰”“别驾”是通判的称呼，“司理”“豸史”是称赞推官。“刺史”“州牧”是知州的两个称号，“豸史”“台谏”也是对知县的称呼。乡里的官员叫乡绅，管农事的官叫田畯。“钧座”“台座”都是对文官的尊称，“帐下”“麾下”都是对武官的美称。官员分九品，受封的妇人也分七等：一品叫夫人，二品也叫夫人，三品叫淑人，四品叫恭人，五品叫宜人，六品叫安人，七品叫孺人。",
      }
      ],
    },
    {
      title: "文臣（16） · 程登吉",
      art: 'primer-youxue:ch16',
      artPrompt: "古诗《文臣（16）》意境插画：妇人受封曰金花诰，状元报捷曰紫泥封。唐玄宗以金瓯覆宰相之名，宋真宗以美珠箝谏臣之口。金马玉堂，羡翰林之声价；朱幡皂盖，仰郡守之威仪。台辅曰紫阁名公，知府曰黄堂太守。府尹之禄二千石，太守之马五花骢。代天巡狩，赞称巡按；指日高升，预贺官僚。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "妇人受封曰金花诰，状元报捷曰紫泥封。唐玄宗以金瓯覆宰相之名，宋真宗以美珠箝谏臣之口。金马玉堂，羡翰林之声价；朱幡皂盖，仰郡守之威仪。台辅曰紫阁名公，知府曰黄堂太守。府尹之禄二千石，太守之马五花骢。代天巡狩，赞称巡按；指日高升，预贺官僚。\n初到任曰下车，告致仕曰解组。藩垣屏翰，方伯犹古诸侯之国；墨绶铜章，令尹即古子男之帮。太监掌阉门之禁令，放曰阉宦；朝臣皆缙笏于绅间，故曰缙绅。萧曹相汉高，曾为刀笔吏；汲黯相汉武，真是社稷臣。",
        pinyin: "fù rén shòu fēng yuē jīn huā gào， zhuàng yuán bào jié yuē zǐ ní fēng。 táng xuán zōng yǐ jīn ōu fù zǎi xiàng zhī míng， sòng zhēn zōng yǐ měi zhū qián jiàn chén zhī kǒu。 jīn mǎ yù táng， xiàn hàn lín zhī shēng jià； zhū fān zào gài， yǎng jùn shǒu zhī wēi yí。 tái fǔ yuē zǐ gé míng gōng， zhī fǔ yuē huáng táng tài shǒu。 fǔ yǐn zhī lù èr qiān shí， tài shǒu zhī mǎ wǔ huā cōng。 dài tiān xún shòu， zàn chēng xún àn； zhǐ rì gāo shēng， yù hè guān liáo。\nchū dào rèn yuē xià chē， gào zhì shì yuē jiě zǔ。 fān yuán píng hàn， fāng bó yóu gǔ zhū hóu zhī guó； mò shòu tóng zhāng， lìng yǐn jí gǔ zǐ nán zhī bāng。 tài jian zhǎng yān mén zhī jìn lìng， fàng yuē yān huàn； cháo chén jiē jìn hù yú shēn jiān， gù yuē jìn shēn。 xiāo cáo xiāng hàn gāo， céng wèi dāo bǐ lì； jí àn xiāng hàn wǔ， zhēn shì shè jì chén。",
        translation: "妇人受封的文书叫“金花诰”，状元报喜的文书叫“紫泥封”。唐玄宗用金杯盖住宰相候选人的名字来挑选，宋真宗用宝珠堵住提意见大臣的嘴。“金马玉堂”，是羡慕翰林的高贵身价；“朱幡皂盖”，是仰望郡守的威风仪仗。“台辅”称紫阁名公，知府称黄堂太守。府尹的俸禄有二千石，太守的仪仗是五匹花马。“代天巡狩”，是称赞巡按御史；“指日高升”，是预先祝贺官员升官。刚到任叫“下车”，辞官退休叫“解组”。“藩垣屏翰”，是说布政使像古时的诸侯；“墨绶铜章”，是说县令像古时的小国君。太监掌管宫门的禁令，所以叫“阉宦”；朝臣都把笏板插在腰带上，所以叫“缙绅”。萧何、曹参辅佐汉高祖，从前不过是些刀笔小吏；汲黯辅佐汉武帝，真是国家的栋梁之臣。",
      }
      ],
    },
    {
      title: "文臣（17） · 程登吉",
      art: 'primer-youxue:ch17',
      artPrompt: "古诗《文臣（17）》意境插画：召伯布文王之政，尝合甘棠之下，后人思其遗爱，不忍伐其树；孔明有王佐之才，尝隐草庐之中，先主慕其令名，乃三顾其庐。鱼头参政，鲁宗道秉性骨鲠；伴食宰相，卢怀慎居位无能。王德用，人称黑王相公；赵清献，世号铁面御史。汉刘宽责民，蒲鞭示辱；项仲山洁己，饮马投钱。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "召伯布文王之政，尝合甘棠之下，后人思其遗爱，不忍伐其树；孔明有王佐之才，尝隐草庐之中，先主慕其令名，乃三顾其庐。鱼头参政，鲁宗道秉性骨鲠；伴食宰相，卢怀慎居位无能。王德用，人称黑王相公；赵清献，世号铁面御史。汉刘宽责民，蒲鞭示辱；项仲山洁己，饮马投钱。\n李善感直言不讳，竟称鸣凤朝阳；汉张纲弹劾无私，直斥豺狼当道。民爱邓侯之政，挽之不留；人言谢令之贪，推之不去。廉范守蜀郡，民歌五裤；张堪守渔阳，麦穗两歧。",
        pinyin: "zhào bó bù wén wáng zhī zhèng， cháng hé gān táng zhī xià， hòu rén sī qí yí ài， bù rěn fá qí shù； kǒng míng yǒu wáng zuǒ zhī cái， cháng yǐn cǎo lú zhī zhōng， xiān zhǔ mù qí lìng míng， nǎi sān gù qí lú。 yú tóu cān zhèng， lǔ zōng dào bǐng xìng gǔ gěng； bàn shí zǎi xiàng， lú huái shèn jū wèi wú néng。 wáng dé yòng， rén chēng hēi wáng xiàng gong； zhào qīng xiàn， shì hào tiě miàn yù shǐ。 hàn liú kuān zé mín， pú biān shì rǔ； xiàng zhòng shān jié jǐ， yǐn mǎ tóu qián。\nlǐ shàn gǎn zhí yán bù huì， jìng chēng míng fèng cháo yáng； hàn zhāng gāng tán hé wú sī， zhí chì chái láng dāng dào。 mín ài dèng hóu zhī zhèng， wǎn zhī bù liú； rén yán xiè lìng zhī tān， tuī zhī bù qù。 lián fàn shǒu shǔ jùn， mín gē wǔ kù； zhāng kān shǒu yú yáng， mài suì liǎng qí。",
        translation: "召伯推行文王的政令，曾在甘棠树下休息办公，后人感念他的恩泽，舍不得砍那棵树；诸葛亮有辅佐帝王的大才，曾隐居在草屋里，刘备仰慕他的美名，三次到草庐去拜访。“鱼头参政”，是说鲁宗道性格刚直得像鱼骨头；“伴食宰相”，是说卢怀慎身居高位却没有主见。王德用人称“黑王相公”，赵抃世称“铁面御史”。汉朝刘宽处罚百姓，只用蒲草鞭子，打不疼，只让人知道羞愧；项仲山清廉自律，让马喝泉水也要先投下一枚钱，不白占便宜。李善感敢于直话直说，人们赞他“鸣凤朝阳”；汉朝张纲弹劾不徇私情，直指“豺狼当道”。百姓爱戴邓侯的政绩，拉着车挽留也留不住他；人们恨前任谢县令贪财，想推他走也推不走。廉范治理蜀郡，百姓唱着“五条裤子”的歌谣夸他；张堪治理渔阳，麦子长出双穗，年年丰收。",
      }
      ],
    },
    {
      title: "文臣（18） · 程登吉",
      art: 'primer-youxue:ch18',
      artPrompt: "古诗《文臣（18）》意境插画：鲁恭为中牟令，桑下有驯雉之异；郭汲为并州守，儿童有竹马之迎。鲜于子骏，宁非一路福星；司马温公，真是万家生佛。鸾凤不栖枳棘，羡仇香之为主簿；河阳遍种桃花，乃潘岳之为县官。刘昆宰江陵，昔日反风灭火；龚遂守渤海，令民卖刀买牛。此皆德政可歌，是以令名攸著。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "鲁恭为中牟令，桑下有驯雉之异；郭汲为并州守，儿童有竹马之迎。鲜于子骏，宁非一路福星；司马温公，真是万家生佛。鸾凤不栖枳棘，羡仇香之为主簿；河阳遍种桃花，乃潘岳之为县官。刘昆宰江陵，昔日反风灭火；龚遂守渤海，令民卖刀买牛。此皆德政可歌，是以令名攸著。",
        pinyin: "lǔ gōng wèi zhōng mù lìng， sāng xià yǒu xùn zhì zhī yì； guō jí wèi bīng zhōu shǒu， ér tóng yǒu zhú mǎ zhī yíng。 xiān yú zǐ jùn， níng fēi yī lù fú xīng； sī mǎ wēn gōng， zhēn shì wàn jiā shēng fó。 luán fèng bù qī zhǐ jí， xiàn chóu xiāng zhī wéi zhǔ bó； hé yáng biàn zhǒng táo huā， nǎi pān yuè zhī wèi xiàn guān。 liú kūn zǎi jiāng líng， xī rì fǎn fēng miè huǒ； gōng suì shǒu bó hǎi， lìng mín mài dāo mǎi niú。 cǐ jiē dé zhèng kě gē， shì yǐ lìng míng yōu zhù。",
        translation: "鲁恭当中牟县令，德政感化了天地，桑树下的野鸡都温驯不怕人；郭伋做并州刺史，孩子们骑着竹马来欢迎他。鲜于侁难道不是一路的福星吗？司马光真是万千人家的活菩萨。鸾凤不肯落在带刺的荆棘上，是赞叹仇香这样的大才只当了个小主簿；河阳县满城种满桃花，是潘岳当县官时留下的美景。刘昆治理江陵，大火之中风向逆转，自己灭了火；龚遂治理渤海，劝百姓卖掉刀剑买牛耕田。这些都是值得歌颂的德政，所以他们的好名声流传得很远。",
      }
      ],
    },
    {
      title: "武职（19） · 程登吉",
      art: 'primer-youxue:ch19',
      artPrompt: "古诗《武职（19）》意境插画：韩柳欧苏，固文人之最著；起翦颇牧，乃武将之多奇。范仲淹胸中具数万甲兵，楚项羽江东有八千子弟。孙膑吴起，将略堪夸；穰苴尉缭，兵机莫测。姜太公有《六韬》，黄石公有《三略》。韩信将兵，多多益善；毛遂讥众，碌碌无奇。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "韩柳欧苏，固文人之最著；起翦颇牧，乃武将之多奇。范仲淹胸中具数万甲兵，楚项羽江东有八千子弟。孙膑吴起，将略堪夸；穰苴尉缭，兵机莫测。姜太公有《六韬》，黄石公有《三略》。韩信将兵，多多益善；毛遂讥众，碌碌无奇。\n大将曰干城，武士曰武弁。都督称为大镇国，总兵称为大总戎。都阃即是都司，参戎即是参将。千户有户侯之仰，百户有百宰之称。以车为户曰辕门，显揭战功曰露布。下杀上谓之弑，上伐下谓之征。",
        pinyin: "hán liǔ ōu sū， gù wén rén zhī zuì zhù； qǐ jiǎn pō mù， nǎi wǔ jiàng zhī duō qí。 fàn zhòng yān xiōng zhōng jù shù wàn jiǎ bīng， chǔ xiàng yǔ jiāng dōng yǒu bā qiān zǐ dì。 sūn bìn wú qǐ， jiāng lüè kān kuā； ráng jū wèi liáo， bīng jī mò cè。 jiāng tài gōng yǒu《 liù tāo》， huáng shí gōng yǒu《 sān lüè》。 hán xìn jiāng bīng， duō duō yì shàn； máo suì jī zhòng， lù lù wú qí。\ndà jiàng yuē gān chéng， wǔ shì yuē wǔ biàn。 dū du chēng wéi dà zhèn guó， zǒng bīng chēng wéi dà zǒng róng。 dōu kǔn jí shì dōu sī， cān róng jí shì cān jiāng。 qiān hù yǒu hù hóu zhī yǎng， bǎi hù yǒu bǎi zǎi zhī chēng。 yǐ chē wèi hù yuē yuán mén， xiǎn jiē zhàn gōng yuē lù bù。 xià shā shàng wèi zhī shì， shàng fá xià wèi zhī zhēng。",
        translation: "韩愈、柳宗元、欧阳修、苏轼，是文人中最有名的；白起、王翦、廉颇、李牧，是武将中最多奇功的。范仲淹胸中好像藏着几万兵马，楚霸王项羽在江东有八千子弟兵。孙膑和吴起，用兵的谋略值得夸赞；司马穰苴和尉缭，兵法机谋深不可测。姜太公著有《六韬》，黄石公著有《三略》。韩信带兵，越多越好；毛遂讥讽同去的人，都是平平常常之辈。大将是国家的“干城”，像盾牌和城墙一样护着国家；武士叫“武弁”。都督称为“大镇国”，总兵称为“大总戎”。“都阃”就是都司，“参戎”就是参将。千户有“户侯”的尊称，百户有“百宰”的称呼。用车围成营门叫“辕门”，把战功写成文告四处宣扬叫“露布”。下级杀上级叫“弑”，上级讨伐下级叫“征”。",
      }
      ],
    },
    {
      title: "武职（20） · 程登吉",
      art: 'primer-youxue:ch20',
      artPrompt: "古诗《武职（20）》意境插画：交锋为对垒，求和曰求成。战胜而回，谓之凯旋；战败而走，谓之奔北。为君泄恨曰敌忾；为国救难曰勤王。胆破心寒，比敌人慑服之状；风声鹤唳，惊士卒败北之魂。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "交锋为对垒，求和曰求成。战胜而回，谓之凯旋；战败而走，谓之奔北。为君泄恨曰敌忾；为国救难曰勤王。胆破心寒，比敌人慑服之状；风声鹤唳，惊士卒败北之魂。\n汉冯异当论功，独立大树下，不夸己绩；汉文帝尝劳军，亲幸细柳营，按辔徐行。苻坚自夸将广，投鞭可以断流；毛遂自荐才奇，处囊便当脱颖。羞与哙等伍，韩信降作淮阴；无面见江东，项羽羞归故里。韩信受胯下之辱，张良有进履之谦。卫青为牧猪之奴，樊哙为屠狗之辈。求士莫求全，毋以二卵弃干城之将；用人如用木，毋以寸朽弃连抱之材。总之君子之身，可大可小；丈夫之志，能屈能伸。自古英雄，难以枚举；欲详将略，须读《武经》。",
        pinyin: "jiāo fēng wèi duì lěi， qiú hé yuē qiú chéng。 zhàn shèng ér huí， wèi zhī kǎi xuán； zhàn bài ér zǒu， wèi zhī bēn běi。 wèi jūn xiè hèn yuē dí kài； wèi guó jiù nán yuē qín wáng。 dǎn pò xīn hán， bǐ dí rén shè fú zhī zhuàng； fēng shēng hè lì， jīng shì zú bài běi zhī hún。\nhàn féng yì dāng lùn gōng， dú lì dà shù xià， bù kuā jǐ jì； hàn wén dì cháng láo jūn， qīn xìng xì liǔ yíng， àn pèi xú xíng。 fú jiān zì kuā jiāng guǎng， tóu biān kě yǐ duàn liú； máo suì zì jiàn cái qí， chù náng biàn dāng tuō yǐng。 xiū yǔ kuài děng wǔ， hán xìn jiàng zuò huái yīn； wú miàn jiàn jiāng dōng， xiàng yǔ xiū guī gù lǐ。 hán xìn shòu kuà xià zhī rǔ， zhāng liáng yǒu jìn lǚ zhī qiān。 wèi qīng wèi mù zhū zhī nú， fán kuài wèi tú gǒu zhī bèi。 qiú shì mò qiú quán， wú yǐ èr luǎn qì gān chéng zhī jiàng； yòng rén rú yòng mù， wú yǐ cùn xiǔ qì lián bào zhī cái。 zǒng zhī jūn zǐ zhī shēn， kě dà kě xiǎo； zhàng fu zhī zhì， néng qū néng shēn。 zì gǔ yīng xióng， nán yǐ méi jǔ； yù xiáng jiāng lüè， xū dú《 wǔ jīng》。",
        translation: "两军交锋叫“对垒”，求和叫“求成”。打了胜仗回来，叫“凯旋”；打了败仗逃跑，叫“奔北”。替君主报仇雪恨叫“敌忾”，为国家解救危难叫“勤王”。“胆破心寒”，形容敌人被吓服的样子；“风声鹤唳”，形容败兵听到风声鹤叫都疑心是追兵。汉朝冯异到论功行赏时，独自站在大树下，从不夸自己的功劳；汉文帝慰劳军队，亲自到细柳营，也只得拉紧马缰慢慢走，遵守军营的规矩。苻坚自夸兵多，说士兵把马鞭投进长江就能截断水流；毛遂自荐有才，说自己像放进袋子里的锥子，尖马上就会露出来。韩信羞于同樊哙这样的人同列，后来被降为淮阴侯；项羽没有脸面见江东父老，不好意思回故乡。韩信受过从人胯下钻过去的羞辱，张良有给老人捡鞋穿鞋的谦恭。卫青做过放猪的奴仆，樊哙本是杀狗卖肉的屠夫。挑选人才不要苛求完美，不要因为人家有两个小毛病，就舍弃能保家卫国的大将；用人就像用木头，不要因为一小块朽坏，就扔掉合抱的大树。总之君子的立身，可以担当大事也可以屈居小位；大丈夫的志向，能受委屈也能施展抱负。自古以来的英雄多得数不过来，想详细了解用兵的谋略，就要去读《武经》。",
      }
      ],
    }
  ],
  rights: {
    workTitle: "幼学琼林",
    author: "程登吉",
    authorDeathYear: -1,
    translator: '桃阅读',
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: "https://github.com/chinese-poetry/chinese-poetry",
    note: "明代通行本卷一；注音与白话译文为平台自撰。",
  },
}
