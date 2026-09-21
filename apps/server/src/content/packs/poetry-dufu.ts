import type { PackBook } from '../types'

/**
 * 《杜甫诗选》——由 scripts/gen-corpus.mjs 从公版语料生成（2026-09-20 全面补全）。
 * 底本：杜甫诗选（杜甫）。逐字来自语料数据集，译文为平台自撰白话。
 * 所选诗作者卒年逾保护期；注音与白话译文为平台自撰。
 */
export const duFu: PackBook = {
  id: "dufu-spring",
  title: "杜甫诗选",
  author: "杜甫（唐）",
  lang: "zh",
  category: "poetry",
  ageStage: "6-8",
  intro: "「诗圣」杜甫的名篇选：春雨、黄鹂、大山河，也有他牵挂的天下。",
  coverArt: "spring-rain",
  coverArtPrompt: "春天的夜晚，细雨轻轻落在江边的小村庄里，屋顶和柳树都蒙着一层水汽，远处有几点暖黄的灯火",
  coverFrom: "#2E7D32",
  coverTo: "#81C784",
  source: "公版古籍（唐·杜甫）通行本，逐字注音",
  chapters: [
    {
      title: "绝句 · 杜甫",
      art: "river-boat",
      artPrompt: "古诗《绝句》意境插画：江边踏青罢，回首见旌旗。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "江边踏青罢，回首见旌旗。\n风起春城暮，高楼鼓角悲。",
        pinyin: "jiāng biān tà qīng bà， huí shǒu jiàn jīng qí。\nfēng qǐ chūn chéng mù， gāo lóu gǔ jiǎo bēi。",
        translation: "在江边踏青回来，一回头看见了旌旗。风吹起来，春天的城里天色已晚，高楼上响起悲哀的鼓角声。",
      }
      ],
    },
    {
      title: "春夜喜雨 · 杜甫",
      art: "poetry-moon",
      artPrompt: "古诗《春夜喜雨》意境插画：好雨知时节，当春乃发生。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "好雨知时节，当春乃发生。\n随风潜入夜，润物细无声。\n野径云俱黑，江船火独明。\n晓看红湿处，花重锦官城。",
        pinyin: "hǎo yǔ zhī shí jié， dāng chūn nǎi fā shēng。\nsuí fēng qián rù yè， rùn wù xì wú shēng。\nyě jìng yún jù hēi， jiāng chuán huǒ dú míng。\nxiǎo kàn hóng shī chù， huā zhòng jǐn guān chéng。",
        translation: "好雨像知道时节一样，一到春天就下起来。它随着风在夜里悄悄落下，细细地滋润着万物，一点声音也没有。田野的小路和天上的云都是黑黑的，只有江船上的灯火亮着。等到早上去看，那些被雨打湿的红红的地方，锦官城里的花开得又多又沉。",
      }
      ],
    },
    {
      title: "赠花卿 · 杜甫",
      art: "river-boat",
      artPrompt: "古诗《赠花卿》意境插画：锦城丝管日纷纷，半入江风半入云。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "锦城丝管日纷纷，半入江风半入云。\n此曲秪应天上有，人间能得几回闻。",
        pinyin: "jǐn chéng sī guǎn rì fēn fēn， bàn rù jiāng fēng bàn rù yún。\ncǐ qǔ dī yìng tiān shàng yǒu， rén jiān néng dé jǐ huí wén。",
        translation: "锦官城里的音乐天天热热闹闹，一半随着江风吹散，一半飘上了云天。这样的曲子只该天上有，人间能听到几回呢。",
      }
      ],
    },
    {
      title: "江南逢李龟年 · 杜甫",
      art: "river-boat",
      artPrompt: "古诗《江南逢李龟年》意境插画：歧王宅里寻常见，崔九堂前几度闻。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "歧王宅里寻常见，崔九堂前几度闻。\n正是江南好风景，落花时节又逢君。",
        pinyin: "qí wáng zhái lǐ xún cháng jiàn， cuī jiǔ táng qián jǐ dù wén。\nzhèng shì jiāng nán hǎo fēng jǐng， luò huā shí jié yòu féng jūn。",
        translation: "从前在歧王的宅子里常见到您，在崔九的堂前也多次听过您唱歌。如今正是江南风景最好的时候，在这落花的季节，又遇见了您。",
      }
      ],
    },
    {
      title: "八阵图 · 杜甫",
      art: "poetry-moon",
      artPrompt: "古诗《八阵图》意境插画：功盖三分国，名高八阵图。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "功盖三分国，名高八阵图。\n江流石不转，遗恨失吞吴。",
        pinyin: "gōng gài sān fēn guó， míng gāo bā zhèn tú。\njiāng liú shí bù zhuǎn， yí hèn shī tūn wú。",
        translation: "您建立的功劳，盖过了三国鼎立的天下；八阵图的名声，更加响亮。江水日夜冲刷，江边的石头却始终不转，只留下没能吞灭东吴的千古遗憾。",
      }
      ],
    },
    {
      title: "春望 · 杜甫",
      art: "river-boat",
      artPrompt: "古诗《春望》意境插画：国破山河在，城春草木深。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "国破山河在，城春草木深。\n感时花溅泪，恨别鸟惊心。\n烽火连三月，家书抵万金。\n白头搔更短，浑欲不胜簪。",
        pinyin: "guó pò shān hé zài， chéng chūn cǎo mù shēn。\ngǎn shí huā jiàn lèi， hèn bié niǎo jīng xīn。\nfēng huǒ lián sān yuè， jiā shū dǐ wàn jīn。\nbái tóu sāo gèng duǎn， hún yù bù shèng zān。",
        translation: "国都破了，山河还在，春天的城里草木长得深深的；感伤时局，看见花开也想落泪，怨恨离别，听见鸟叫也心里发惊。战火连着烧了三个月，一封家书抵得上万两黄金。白头发越搔越短，简直要插不住簪子了。",
      }
      ],
    },
    {
      title: "月夜 · 杜甫",
      art: "poetry-moon",
      artPrompt: "古诗《月夜》意境插画：今夜鄜州月，闺中只独看。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "今夜鄜州月，闺中只独看。\n遥怜小儿女，未解忆长安。\n香雾云鬟湿，清辉玉臂寒。\n何时倚虚幌，双照泪痕干。",
        pinyin: "jīn yè fū zhōu yuè， guī zhōng zhī dú kàn。\nyáo lián xiǎo ér nǚ， wèi jiě yì cháng ān。\nxiāng wù yún huán shī， qīng huī yù bì hán。\nhé shí yǐ xū huǎng， shuāng zhào lèi hén gān。",
        translation: "今夜鄜州的月亮，妻子一个人在闺房里看。可怜远方的小儿女，还不懂得想念在长安的爸爸。夜雾打湿了她的头发，月光让她玉一样的手臂发凉；什么时候才能一起靠着薄薄的窗帘，让月光把两人的泪痕照干呢。",
      }
      ],
    },
    {
      title: "望岳 · 杜甫",
      art: "sunrise-hills",
      artPrompt: "古诗《望岳》意境插画：岱宗夫如何，齐鲁青未了。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "岱宗夫如何，齐鲁青未了。\n造化钟神秀，阴阳割昏晓。\n荡胷生曾云，决眦入归鸟。\n会当凌绝顶，一览众山小。",
        pinyin: "dài zōng fū rú hé， qí lǔ qīng wèi liǎo。\nzào huà zhōng shén xiù， yīn yáng gē hūn xiǎo。\ndàng xiōng shēng céng yún， jué zì rù guī niǎo。\nhuì dāng líng jué dǐng， yī lǎn zhòng shān xiǎo。",
        translation: "泰山到底怎么样呢？青翠的山色，在齐鲁大地之外还望不到尽头。大自然把神奇秀丽都聚在它身上，山南山北，一边明亮一边昏暗。层层云气在山间升起，让人心胸激荡；睁大眼睛远望，追着归巢的飞鸟。总有一天我要登上最高的山顶，把周围的小山全都看小。",
      }
      ],
    },
    {
      title: "房兵曹胡马诗 · 杜甫",
      art: "poetry-moon",
      artPrompt: "古诗《房兵曹胡马诗》意境插画：胡马大宛名，锋棱瘦骨成。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "胡马大宛名，锋棱瘦骨成。\n竹批双耳峻，风入四蹄轻。\n所向无空阔，真堪托死生。\n骁腾有如此，万里可横行。",
        pinyin: "hú mǎ dà wǎn míng， fēng léng shòu gǔ chéng。\nzhú pī shuāng ěr jùn， fēng rù sì tí qīng。\nsuǒ xiàng wú kōng kuò， zhēn kān tuō sǐ shēng。\nxiāo téng yǒu rú cǐ， wàn lǐ kě héng xíng。",
        translation: "大宛出产的胡马名声远扬，瘦瘦的骨架棱角分明。两只耳朵像斜削的竹片一样尖挺，四个蹄子轻快得像风一样。它跑起来再远的地方也不觉得远，真是能把生死都托付给它的好马。有这样骏马奔腾着，横越万里也不在话下。",
      }
      ],
    },
    {
      title: "横吹曲辞 前出塞九首 一 · 杜甫",
      art: "river-boat",
      artPrompt: "古诗《横吹曲辞 前出塞九首 一》意境插画：戚戚去故里，悠悠赴交河。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "戚戚去故里，悠悠赴交河。\n公家有程期，亡命婴祸罗。\n君已富土境，开边一何多？\n弃绝父母恩，吞声行负戈。",
        pinyin: "qī qī qù gù lǐ， yōu yōu fù jiāo hé。\ngōng jia yǒu chéng qī， wáng mìng yīng huò luó。\njūn yǐ fù tǔ jìng， kāi biān yī hé duō？\nqì jué fù mǔ ēn， tūn shēng xíng fù gē。",
        translation: "心里难过地离开家乡，路途遥远地去交河打仗。官家有规定的日期，逃跑就会闯进祸事的大网。你的国土已经够大了，为什么还要开边打这么多仗？只好丢下父母的恩情，忍住哭声，扛起兵器上路。",
      }
      ],
    },
    {
      title: "旅夜书怀 · 杜甫",
      art: "poetry-moon",
      artPrompt: "古诗《旅夜书怀》意境插画：细草微风岸，危樯独夜舟。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "细草微风岸，危樯独夜舟。\n星垂平野阔，月涌大江流。\n名岂文章著，官因老病休。\n飘飘何所似，天地一沙鸥。",
        pinyin: "xì cǎo wēi fēng àn， wēi qiáng dú yè zhōu。\nxīng chuí píng yě kuò， yuè yǒng dà jiāng liú。\nmíng qǐ wén zhāng zhù， guān yīn lǎo bìng xiū。\npiāo piāo hé suǒ sì， tiān dì yī shā ōu。",
        translation: "微风拂着岸边的细草，夜里高高的桅杆下只泊着我一条孤舟；星星低垂，平野格外开阔，月亮涌动，大江滚滚奔流。名声哪里是靠文章得来的？做官也因为年老多病罢了休。飘飘荡荡的我，就像天地间一只小小的沙鸥。",
      }
      ],
    },
    {
      title: "登高 · 杜甫",
      art: "spring-bird",
      artPrompt: "古诗《登高》意境插画：风急天高猨啸哀，渚清沙白鸟飞回。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "风急天高猨啸哀，渚清沙白鸟飞回。\n无边落木萧萧下，不尽长江衮衮来。\n万里悲秋常作客，百年多病独登台。\n艰难苦恨繁霜鬓，潦倒新停浊酒桮。",
        pinyin: "fēng jí tiān gāo yuán xiào āi， zhǔ qīng shā bái niǎo fēi huí。\nwú biān luò mù xiāo xiāo xià， bù jìn cháng jiāng gǔn gǔn lái。\nwàn lǐ bēi qiū cháng zuò kè， bǎi nián duō bìng dú dēng tái。\njiān nán kǔ hèn fán shuāng bìn， liáo dǎo xīn tíng zhuó jiǔ bēi。",
        translation: "风又急，天又高，猿猴的叫声十分悲哀；水中的小洲清清，沙岸白白，鸟儿在江上盘旋。望不到边的落叶萧萧飘下，流不尽的长江滚滚涌来。离家万里，在悲凉的秋天里常年漂泊作客，年老多病，还独自登上高台。一生艰难，两鬓的白发越来越多；穷困潦倒，连浊酒也因为生病刚刚停杯不喝了。",
      }
      ],
    },
    {
      title: "登岳阳楼 · 杜甫",
      art: "waterfall-cave",
      artPrompt: "古诗《登岳阳楼》意境插画：昔闻洞庭水，今上岳阳楼。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "昔闻洞庭水，今上岳阳楼。\n吴楚东南坼，乾坤日夜浮。\n亲朋无一字，老病有孤舟。\n戎马关山北，凭轩涕泗流。",
        pinyin: "xī wén dòng tíng shuǐ， jīn shàng yuè yáng lóu。\nwú chǔ dōng nán chè， qián kūn rì yè fú。\nqīn péng wú yī zì， lǎo bìng yǒu gū zhōu。\nróng mǎ guān shān běi， píng xuān tì sì liú。",
        translation: "从前只听说过洞庭湖的大水，今天我终于登上了岳阳楼。大水把吴楚两地分成东西，日月星辰都好像浮在水面上。亲戚朋友一个音信也没有，我又老又病，只有一条孤舟；北方还在打仗，我靠着栏杆忍不住流下眼泪。",
      }
      ],
    },
    {
      title: "闻官军收河南河北 · 杜甫",
      art: "river-boat",
      artPrompt: "古诗《闻官军收河南河北》意境插画：劒外忽传收蓟北，初闻涕泪满衣裳。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "劒外忽传收蓟北，初闻涕泪满衣裳。\n却看妻子愁何在，漫卷诗书喜欲狂。\n白日放歌须纵酒，青春作伴好还乡。\n即从巴峡穿巫峡，便下襄阳向洛阳。",
        pinyin: "jiàn wài hū chuán shōu jì běi， chū wén tì lèi mǎn yī shang。\nquè kàn qī zǐ chóu hé zài， màn juàn shī shū xǐ yù kuáng。\nbái rì fàng gē xū zòng jiǔ， qīng chūn zuò bàn hǎo huán xiāng。\njí cóng bā xiá chuān wū xiá， biàn xià xiāng yáng xiàng luò yáng。",
        translation: "剑门关外忽然传来收复蓟北的消息，刚一听见，激动的泪水就沾满了衣裳。回头看看妻子儿女，满心的忧愁一下子都不见了，胡乱卷起诗书，高兴得简直要发狂。大白天放声高歌，开怀畅饮，趁着明媚的春光结伴回到家乡。心里想马上从巴峡穿过巫峡，再顺流下襄阳，一路奔向洛阳。",
      }
      ],
    },
    {
      title: "石壕吏 · 杜甫",
      art: "poetry-moon",
      artPrompt: "古诗《石壕吏》意境插画：暮投石壕邨，有吏夜捉人。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "暮投石壕邨，有吏夜捉人。\n老翁逾墙走，老妇出门看。\n吏呼一何怒，妇啼一何苦。\n听妇前致词，三男邺城戍。\n一男附书致，二男新战死。\n存者且偷生，死者长已矣。\n室中更无人，惟有乳下孙。\n有孙母未去，出入无完帬。\n老妪力虽衰，请从吏夜归。\n急应河阳役，犹得备晨炊。\n夜久语声绝，如闻泣幽咽。\n天明登前途，独与老翁别。",
        pinyin: "mù tóu shí háo cūn， yǒu lì yè zhuō rén。\nlǎo wēng yú qiáng zǒu， lǎo fù chū mén kàn。\nlì hū yī hé nù， fù tí yī hé kǔ。\ntīng fù qián zhì cí， sān nán yè chéng shù。\nyī nán fù shū zhì， èr nán xīn zhàn sǐ。\ncún zhě qiě tōu shēng， sǐ zhě cháng yǐ yǐ。\nshì zhōng gèng wú rén， wéi yǒu rǔ xià sūn。\nyǒu sūn mǔ wèi qù， chū rù wú wán qún。\nlǎo yù lì suī shuāi， qǐng cóng lì yè guī。\njí yìng hé yáng yì， yóu dé bèi chén chuī。\nyè jiǔ yǔ shēng jué， rú wén qì yōu yàn。\ntiān míng dēng qián tú， dú yǔ lǎo wēng bié。",
        translation: "傍晚投宿在石壕村，差役夜里来抓人。老爷爷翻墙逃走了，老奶奶出门去应付。差役喊得多么凶，老奶奶哭得多么苦。听她上前诉说：三个儿子都去邺城打仗了，一个儿子捎信回来，说另外两个刚战死了。活着的暂且活着，死去的永远完了。家里再没有别人，只有个还在吃奶的小孙子；孙子还在，他的妈妈没有离开，进出连条完整的裙子都没有。老奶奶说自己虽然老了没力气，愿意跟差役连夜回去，赶去河阳当差，还来得及做早饭。夜深了，说话声停了，好像还听见低低的哭声。天亮后我继续赶路，只能和老爷爷一个人告别了。",
      }
      ],
    },
    {
      title: "月夜忆舍弟 · 杜甫",
      art: "poetry-moon",
      artPrompt: "古诗《月夜忆舍弟》意境插画：戍鼓断人行，秋边一雁声。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "戍鼓断人行，秋边一雁声。\n露从今夜白，月是故乡明。\n有弟皆分散，无家问死生。\n寄书长不避，况乃未休兵。",
        pinyin: "shù gǔ duàn rén xíng， qiū biān yī yàn shēng。\nlù cóng jīn yè bái， yuè shì gù xiāng míng。\nyǒu dì jiē fēn sàn， wú jiā wèn sǐ shēng。\njì shū cháng bù bì， kuàng nǎi wèi xiū bīng。",
        translation: "戍楼上的鼓声一响，路上就断了行人；秋天的边地，传来一声孤雁的啼叫。从今夜起露水更白了，月亮还是故乡的最明。兄弟们都流散在各处，连家也没有了，到哪儿去打听他们的死活呢？寄出去的家信总是收不到，何况战乱到现在还没有停息。",
      }
      ],
    },
    {
      title: "客至 · 杜甫",
      art: "spring-bird",
      artPrompt: "古诗《客至》意境插画：舍南舍北皆春水，但见群鸥日日来。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "舍南舍北皆春水，但见群鸥日日来。\n花径不曾缘客扫，蓬门今始为君开。\n盘餐市远无兼味，樽酒家贫只旧醅。\n肯与邻翁相对饮，隔篱呼取尽余桮。",
        pinyin: "shè nán shè běi jiē chūn shuǐ， dàn jiàn qún ōu rì rì lái。\nhuā jìng bù céng yuán kè sǎo， péng mén jīn shǐ wèi jūn kāi。\npán cān shì yuǎn wú jiān wèi， zūn jiǔ jiā pín zhī jiù pēi。\nkěn yǔ lín wēng xiāng duì yǐn， gé lí hū qǔ jìn yú bēi。",
        translation: "我的屋子南边北边都是春天的水，只看见一群群鸥鸟天天飞来。长满花草的小路，从来没有为客人扫过；今天这扇柴门，第一次为你打开。集市太远，盘子里的菜没有几样；家里穷，酒也只是没过滤的陈酒。要是你不嫌弃，我就隔着篱笆喊邻家的老翁过来，把剩下的酒一起喝干。",
      }
      ],
    },
    {
      title: "江村 · 杜甫",
      art: "river-boat",
      artPrompt: "古诗《江村》意境插画：清江一曲抱村流，长夏江村事事幽。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "清江一曲抱村流，长夏江村事事幽。\n自去自来堂上燕，相亲相近水中鸥。\n老妻画纸为碁局，稚子敲针作钓钩。\n多病所须唯药物，微躯此外更何求。",
        pinyin: "qīng jiāng yī qǔ bào cūn liú， cháng xià jiāng cūn shì shì yōu。\nzì qù zì lái táng shàng yàn， xiāng qīn xiāng jìn shuǐ zhōng ōu。\nlǎo qī huà zhǐ wèi qí jú， zhì zǐ qiāo zhēn zuò diào gōu。\nduō bìng suǒ xū wéi yào wù， wēi qū cǐ wài gèng hé qiú。",
        translation: "清清的江水弯弯地绕着村子流过，漫长的夏天里，江村的一切都那么安静清幽。燕子在堂前自由自在地飞来飞去，水鸥在水中亲亲热热地相伴。老伴在纸上画棋盘，小儿子敲弯了针做钓钩。我多病的身体需要的只是些药，除了这些，这样的日子还有什么可求的呢？",
      }
      ],
    },
    {
      title: "春宿左省 · 杜甫",
      art: "spring-bird",
      artPrompt: "古诗《春宿左省》意境插画：花隐掖垣暮，啾啾栖鸟过。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "花隐掖垣暮，啾啾栖鸟过。\n星临万户动，月傍九霄多。\n不寝听金钥，因风想玉珂。\n明朝有封事，数问夜如何。",
        pinyin: "huā yǐn yè yuán mù， jiū jiū qī niǎo guò。\nxīng lín wàn hù dòng， yuè bàng jiǔ xiāo duō。\nbù qǐn tīng jīn yào， yīn fēng xiǎng yù kē。\nmíng cháo yǒu fēng shì， shù wèn yè rú hé。",
        translation: "傍晚，花朵隐没在宫墙边，栖宿的鸟儿啾啾地飞过。星光下千家万户好像都在闪动，月亮挨着高高的九重天。我睡不着，好像听见开宫门的钥匙声，又听着风响想起上朝的马饰；明天一早要上书奏事，所以一遍遍问：夜到什么时候了？",
      }
      ],
    },
    {
      title: "野望 · 杜甫",
      art: "poetry-moon",
      artPrompt: "古诗《野望》意境插画：清秋望不极，迢遰起曾阴。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "清秋望不极，迢遰起曾阴。\n远水兼天净，孤城隐雾深。\n叶稀风更落，山迥日初沈。\n独鹤归何晚，昏鸦已满林。",
        pinyin: "qīng qiū wàng bù jí， tiáo dì qǐ céng yīn。\nyuǎn shuǐ jiān tiān jìng， gū chéng yǐn wù shēn。\nyè xī fēng gèng luò， shān jiǒng rì chū shěn。\ndú hè guī hé wǎn， hūn yā yǐ mǎn lín。",
        translation: "清冷的秋天，怎么望也望不到边，远处升起了一层层阴云。远处的江水和天空一样明净，孤零零的小城深深藏在雾里。树叶稀了，风一吹落得更多；山那么远，太阳刚开始往下沉。那只孤单的鹤为什么这么晚还不回来？黄昏的乌鸦已经落满了树林。",
      }
      ],
    },
    {
      title: "佳人 · 杜甫",
      art: "poetry-moon",
      artPrompt: "古诗《佳人》意境插画：绝代有佳人，幽居在空谷。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "绝代有佳人，幽居在空谷。\n自云良家子，零落依草木。\n关中昔丧败，兄弟遭杀戮。\n官高何足论，不得收骨肉。\n世情恶衰歇，万事随转烛。\n夫壻轻薄儿，新人已如玉。\n合昏尚知时，鸳鸯不独宿。\n但见新人笑，那闻旧人哭。\n在山泉水清，出山泉水浊。\n侍婢卖珠回，牵萝补茅屋。\n摘花不插发，采柏动盈匊。\n天寒翠袖薄，日暮倚修竹。",
        pinyin: "jué dài yǒu jiā rén， yōu jū zài kōng gǔ。\nzì yún liáng jiā zǐ， líng luò yī cǎo mù。\nguān zhōng xī sàng bài， xiōng dì zāo shā lù。\nguān gāo hé zú lùn， bù dé shōu gǔ ròu。\nshì qíng è shuāi xiē， wàn shì suí zhuǎn zhú。\nfū xù qīng bó ér， xīn rén yǐ rú yù。\nhé hūn shàng zhī shí， yuān yāng bù dú sù。\ndàn jiàn xīn rén xiào， nà wén jiù rén kū。\nzài shān quán shuǐ qīng， chū shān quán shuǐ zhuó。\nshì bì mài zhū huí， qiān luó bǔ máo wū。\nzhāi huā bù chā fā， cǎi bǎi dòng yíng jū。\ntiān hán cuì xiù báo， rì mù yǐ xiū zhú。",
        translation: "有一位绝代佳人，静静地住在空旷的山谷里。她说自己本是好人家的女儿，如今流落荒野，靠着草木过活。当年关中发生战乱，兄弟都被杀害。家里做高官又有什么用，连亲人的尸骨都没能收回来。世道人情讨厌衰败的人家，万事就像风中蜡烛，说变就变。丈夫是个轻薄儿，又娶了美如玉石的新人。合欢花尚且知道朝开夜合，鸳鸯也不肯单独过夜。他只听得见新人的笑声，哪里听得到旧人的哭声。在山里的泉水是清的，流出山去泉水就浑了。侍女卖掉珍珠回来，牵些藤萝来补茅屋。摘下花来也不插在头上，常常采满一把把柏枝。天冷了，翠绿的衣裳还那么单薄；天黑了，她独自倚着长长的竹子。",
      }
      ],
    },
    {
      title: "天末忆李白 · 杜甫",
      art: "cloud-flight",
      artPrompt: "古诗《天末忆李白》意境插画：凉风起天末，君子意如何。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "凉风起天末，君子意如何。\n鸿雁几时到，江湖秋水多。\n文章憎命达，魑魅喜人过。\n应共冤魂语，投诗赠汩罗。",
        pinyin: "liáng fēng qǐ tiān mò， jūn zǐ yì rú hé。\nhóng yàn jǐ shí dào， jiāng hú qiū shuǐ duō。\nwén zhāng zēng mìng dá， chī mèi xǐ rén guò。\nyìng gòng yuān hún yǔ， tóu shī zèng gǔ luó。",
        translation: "凉风从天边吹起，不知道你如今心境怎么样。捎信的大雁什么时候才能到，江湖上的风浪那么多。有才华的人偏偏命运不顺，山里的鬼怪就爱等人经过。你应该正在和含冤的屈原说话，把写好的诗投进汨罗江送给他。",
      }
      ],
    },
    {
      title: "别房太尉墓 · 杜甫",
      art: "poetry-moon",
      artPrompt: "古诗《别房太尉墓》意境插画：他乡复行役，驻马别孤坟。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "他乡复行役，驻马别孤坟。\n近泪无干土，低空有断云。\n对碁陪谢傅，把劒觅徐君。\n唯见林花落，鸎啼送客闻。",
        pinyin: "tā xiāng fù xíng yì， zhù mǎ bié gū fén。\njìn lèi wú gān tǔ， dī kōng yǒu duàn yún。\nduì qí péi xiè fù， bǎ jiàn mì xú jūn。\nwéi jiàn lín huā luò， yīng tí sòng kè wén。",
        translation: "我又在外地奔波，停下马，在你孤零零的坟前告别。眼泪直流，近处的泥土没有一块是干的，低低的天空飘着断碎的云。想起从前陪你下棋，如今我带着剑来寻访你；只见林中花儿飘落，黄莺的啼声一路送着离去的客人。",
      }
      ],
    },
    {
      title: "新安吏 · 杜甫",
      art: "poetry-moon",
      artPrompt: "古诗《新安吏》意境插画：客行新安道，喧呼闻点兵。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "客行新安道，喧呼闻点兵。\n借问新安吏，县小更无丁。\n府帖昨夜下，次选中男行。\n中男绝短小，何以守王城。\n肥男有母送，瘦男独伶俜。\n白水暮东流，青山犹哭声。\n莫自使眼枯，收汝泪纵横。\n眼枯即见骨，天地终无情。\n我军取相州，日夕望其平。\n岂意贼难料，归军星散营。\n就粮近故垒，练卒依旧京。\n掘壕不到水，牧马役亦轻。\n况乃王师顺，抚养甚分明。\n送行勿泣血，仆射如父兄。",
        pinyin: "kè xíng xīn ān dào， xuān hū wén diǎn bīng。\njiè wèn xīn ān lì， xiàn xiǎo gèng wú dīng。\nfǔ tiē zuó yè xià， cì xuǎn zhōng nán xíng。\nzhōng nán jué duǎn xiǎo， hé yǐ shǒu wáng chéng。\nféi nán yǒu mǔ sòng， shòu nán dú líng pīng。\nbái shuǐ mù dōng liú， qīng shān yóu kū shēng。\nmò zì shǐ yǎn kū， shōu rǔ lèi zòng héng。\nyǎn kū jí jiàn gǔ， tiān dì zhōng wú qíng。\nwǒ jūn qǔ xiāng zhōu， rì xī wàng qí píng。\nqǐ yì zéi nán liào， guī jūn xīng sàn yíng。\njiù liáng jìn gù lěi， liàn zú yī jiù jīng。\njué háo bù dào shuǐ， mù mǎ yì yì qīng。\nkuàng nǎi wáng shī shùn， fǔ yǎng shèn fēn míng。\nsòng xíng wù qì xuè， pú shè rú fù xiōng。",
        translation: "我路过新安的路上，听见一片喧哗，是在点名征兵。问一问新安的官吏，他说县里小，再也抽不出壮丁了；征兵的文书昨晚下来，只好选那些个子还没长成的少年出发。他们又瘦又小，怎么守得住王城呢。壮实一点的还有妈妈来送，瘦弱的孤零零一个人。白水在暮色里向东流去，青山里还传来哭声。别把眼泪哭干了，哭干了也没有用，天地终究是无情的。我军攻打相州，日夜盼着打下来；谁想到敌人难以预料，官兵一下子被打散了。如今就到旧营垒附近取粮，在京城附近操练士兵，挖的战壕不深，放马的活儿也轻。何况我们的军队堂堂正正，对士兵照顾得很周到。送行的人别哭坏了身子，带兵的将军待士兵就像自家的父兄。",
      }
      ],
    },
    {
      title: "潼关吏 · 杜甫",
      art: "poetry-moon",
      artPrompt: "古诗《潼关吏》意境插画：士卒何草草，筑城潼关道。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "士卒何草草，筑城潼关道。\n大城铁不如，小城万丈余。\n借问潼关吏，修关还备胡。\n要我下马行，为我指山隅。\n连云列战格，飞鸟不能逾。\n胡来但自守，岂复忧西都。\n丈人视要处，窄狭容单车。\n艰难奋长戟，万古用一夫。\n哀哉桃林战，百万化为鱼。\n请嘱防关将，慎勿学哥舒。",
        pinyin: "shì zú hé cǎo cǎo， zhù chéng tóng guān dào。\ndài chéng tiě bù rú， xiǎo chéng wàn zhàng yú。\njiè wèn tóng guān lì， xiū guān hái bèi hú。\nyào wǒ xià mǎ xíng， wèi wǒ zhǐ shān yú。\nlián yún liè zhàn gé， fēi niǎo bù néng yú。\nhú lái dàn zì shǒu， qǐ fù yōu xī dōu。\nzhàng rén shì yào chù， zhǎi xiá róng dān chē。\njiān nán fèn cháng jǐ， wàn gǔ yòng yī fū。\nāi zāi táo lín zhàn， bǎi wàn huà wéi yú。\nqǐng zhǔ fáng guān jiāng， shèn wù xué gē shū。",
        translation: "士兵们多么辛苦啊，在潼关道上修筑城墙。大城修得比铁还结实，小城高得有万丈。我问守潼关的官吏，他说修关是为了防备胡人再来。他请我下马走一走，指给我看山边的险要地方：栏栅一层层排到云里，连飞鸟都飞不过去。只要牢牢守住，胡人来也不用怕，更不必担忧长安。老人家你看这要害的地方，窄得只能过一辆车，危急时一个人拿长戟把守，就能挡住千军万马。可叹当年桃林那一场败仗，百万将士都葬身在乱军里。请告诉守关的将军，千万要小心，别再学哥舒翰啊。",
      }
      ],
    },
    {
      title: "垂老别 · 杜甫",
      art: "poetry-moon",
      artPrompt: "古诗《垂老别》意境插画：四郊未宁静，垂老不得安。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "四郊未宁静，垂老不得安。\n子孙阵亡尽，焉用身独完。\n投杖出门去，同行为辛酸。\n幸有牙齿存，所悲骨髓干。\n男儿既介胄，长揖别上官。\n老妻卧路啼，岁暮衣裳单。\n孰知是死别，且复伤其寒。\n此去必不归，还闻劝加餐。\n土门壁甚坚，杏园度亦难。\n势异邺城下，纵死时犹宽。\n人生有离合，岂择衰老端。\n忆昔少壮日，迟回竟长叹。\n万国尽征戍，烽火被冈峦。\n积尸草木腥，流血川原丹。\n何乡为乐土，安敢尚盘桓。\n弃绝蓬室居，塌然摧肺肝。",
        pinyin: "sì jiāo wèi níng jìng， chuí lǎo bù dé ān。\nzǐ sūn zhèn wáng jìn， yān yòng shēn dú wán。\ntóu zhàng chū mén qù， tóng háng wèi xīn suān。\nxìng yǒu yá chǐ cún， suǒ bēi gǔ suǐ gān。\nnán ér jì jiè zhòu， cháng yī bié shàng guān。\nlǎo qī wò lù tí， suì mù yī shang dān。\nshú zhī shì sǐ bié， qiě fù shāng qí hán。\ncǐ qù bì bù guī， hái wén quàn jiā cān。\ntǔ mén bì shèn jiān， xìng yuán dù yì nán。\nshì yì yè chéng xià， zòng sǐ shí yóu kuān。\nrén shēng yǒu lí hé， qǐ zé shuāi lǎo duān。\nyì xī shào zhuàng rì， chí huí jìng cháng tàn。\nwàn guó jìn zhēng shù， fēng huǒ bèi gāng luán。\njī shī cǎo mù xīng， liú xuè chuān yuán dān。\nhé xiāng wèi lè tǔ， ān gǎn shàng pán huán。\nqì jué péng shì jū， tā rán cuī fèi gān。",
        translation: "城外四郊还不太平，人到老年也不得安生。子孙都在战场上死光了，我又何必独自保全自己呢。老人扔掉拐杖出了门，一起出发的人都为他心酸。还好牙齿还在能吃饭，只是悲伤年纪老了、骨头都枯了。既然穿上了军装，就向上官深深作揖道别。老伴儿躺在路边哭哭啼啼，年底了还穿着单薄的衣裳。明知道这一别就是死别，还只心疼她天冷会受冻。这一去一定回不来，还听见她劝我路上多吃点饭。土门的营垒很坚固，杏园渡口也很难渡过，形势和邺城那时不一样，就算死也不会死得太快。人生本来就有离有合，哪管你是不是年老体衰。想起年轻力壮的日子，徘徊不前，长声叹息。如今到处都在打仗，烽火烧遍了山冈，尸首让草木都带着腥气，鲜血把平原染成了红色。哪里还有安乐的家乡？怎么敢再犹豫停留。一狠心告别了住惯的茅草屋，心里像被揪碎了一样痛。",
      }
      ],
    },
    {
      title: "无家别 · 杜甫",
      art: "primer-scroll",
      artPrompt: "古诗《无家别》意境插画：寂寞天宝后，园庐但蒿藜。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "寂寞天宝后，园庐但蒿藜。\n我里百余家，世乱各东西。\n存者无消息，死者为尘泥。\n贱子因阵败，归来寻旧蹊。\n人行见空巷，日瘦气惨凄。\n但对狐与狸，竖毛怒我啼。\n四邻何所有，一二老寡妻。\n宿鸟恋本枝，安辞且穷栖。\n方春独荷锄，日暮还灌畦。\n县吏知我至，召令习鼓鞞。\n虽从本州役，内顾无所携。\n近行止一身，远去终转迷。\n家乡既荡尽，远近理亦齐。\n永痛长病母，五年委沟溪。\n生我不得力，终身两酸嘶。\n人生无家别，何以为烝黎。",
        pinyin: "jì mò tiān bǎo hòu， yuán lú dàn hāo lí。\nwǒ lǐ bǎi yú jiā， shì luàn gè dōng xī。\ncún zhě wú xiāo xī， sǐ zhě wèi chén ní。\njiàn zǐ yīn zhèn bài， guī lái xún jiù qī。\nrén xíng jiàn kōng xiàng， rì shòu qì cǎn qī。\ndàn duì hú yǔ lí， shù máo nù wǒ tí。\nsì lín hé suǒ yǒu， yī èr lǎo guǎ qī。\nsù niǎo liàn běn zhī， ān cí qiě qióng qī。\nfāng chūn dú hé chú， rì mù hái guàn qí。\nxiàn lì zhī wǒ zhì， zhào lìng xí gǔ pí。\nsuī cóng běn zhōu yì， nèi gù wú suǒ xié。\njìn xíng zhǐ yī shēn， yuǎn qù zhōng zhuǎn mí。\njiā xiāng jì dàng jìn， yuǎn jìn lǐ yì qí。\nyǒng tòng cháng bìng mǔ， wǔ nián wěi gōu xī。\nshēng wǒ bù dé lì， zhōng shēn liǎng suān sī。\nrén shēng wú jiā bié， hé yǐ wéi zhēng lí。",
        translation: "天宝年间以后，到处冷冷清清，家园里长满了野草。我们村里一百多户人家，遭了乱世各奔东西，活着的没有消息，死去的化成了尘泥。我打了败仗回来，找着旧日的小路回家。走进的是空空的巷子，太阳惨白，一片凄凉；只碰见狐狸，竖起毛来冲我叫。四邻还剩下什么呢？只有一两个老寡妇。鸟儿尚且恋着自己的旧枝头，我怎么不能留下来，凑合着安身呢。开春独自扛着锄头下地，天黑了回来浇菜园。谁知县吏知道我回来了，又叫我去当兵操练。虽然只是在本州服役，可是看看家里，什么也带不上。走得近只有孤零零一个我，走得远也终究没有牵挂——家乡已经全毁了，远走近走反正都一样。最痛心的是长年生病的母亲，去世五年还没有安葬，一直丢在沟边。她生了我，我却没能照顾她，母子俩一辈子都是苦。人活到连家都没有、连告别都没处告别，还怎么做个百姓呢。",
      }
      ],
    }
  ],
  rights: {
    workTitle: "杜甫诗选",
    author: "杜甫",
    authorDeathYear: 770,
    translator: '桃阅读',
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: "https://github.com/chinese-poetry/chinese-poetry",
    note: "所选诗作者卒年逾保护期；注音与白话译文为平台自撰。",
  },
}
