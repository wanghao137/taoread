import type { PackBook } from '../types'

/**
 * 《李白诗选》——由 scripts/gen-corpus.mjs 从公版语料生成（2026-09-20 全面补全）。
 * 底本：李白诗选（李白）。逐字来自语料数据集，译文为平台自撰白话。
 * 所选诗作者卒年逾保护期；注音与白话译文为平台自撰。
 */
export const libai: PackBook = {
  id: "libai-moon",
  title: "李白诗选",
  author: "李白（唐）",
  lang: "zh",
  category: "poetry",
  ageStage: "3-5",
  intro: "「诗仙」李白的名篇选：月亮、美酒、大瀑布，还有一肚子想象力。",
  coverArt: "moon-river",
  coverArtPrompt: "一位穿白袍的古代诗人站在江边的小船上，抬头望着天上又大又圆的月亮，江面泛着银色的月光，远处是淡淡的山影",
  coverFrom: "#1A237E",
  coverTo: "#5C6BC0",
  source: "公版古籍（唐·李白）通行本，逐字注音",
  chapters: [
    {
      title: "早发白帝城 · 李白",
      art: 'libai-moon:ch1',
      artPrompt: "古诗《早发白帝城》意境插画：朝辞白帝彩云间，千里江陵一日还。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "朝辞白帝彩云间，千里江陵一日还。\n两岸猨声啼不尽，轻舟已过万重山。",
        pinyin: "cháo cí bái dì cǎi yún jiān， qiān lǐ jiāng líng yī rì hái。\nliǎng àn yuán shēng tí bù jìn， qīng zhōu yǐ guò wàn chóng shān。",
        translation: "早晨告别彩云环绕的白帝城，千里以外的江陵，一天就到了。两岸猿猴的叫声还没停个够，轻快的小船已经穿过了万重青山。",
      }
      ],
    },
    {
      title: "望天门山 · 李白",
      art: 'libai-moon:ch2',
      artPrompt: "古诗《望天门山》意境插画：天门中断楚江开，碧水东流至北回。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "天门中断楚江开，碧水东流至北回。\n两岸青山相对出，孤帆一片日边来。",
        pinyin: "tiān mén zhōng duàn chǔ jiāng kāi， bì shuǐ dōng liú zhì běi huí。\nliǎng àn qīng shān xiāng duì chū， gū fān yī piàn rì biān lái。",
        translation: "天门山从中间断开，让长江的水流过，碧绿的江水向东流去，到这里又折向北。两岸的青山面对面地立着，一只小帆船从太阳那边驶了过来。",
      }
      ],
    },
    {
      title: "赠汪伦 · 李白",
      art: 'libai-moon:ch3',
      artPrompt: "古诗《赠汪伦》意境插画：李白乘舟将欲行，忽闻岸上踏歌声。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "李白乘舟将欲行，忽闻岸上踏歌声。\n桃花潭水深千尺，不及汪伦送我情。",
        pinyin: "lǐ bái chéng zhōu jiāng yù xíng， hū wén àn shàng tà gē shēng。\ntáo huā tán shuǐ shēn qiān chǐ， bù jí wāng lún sòng wǒ qíng。",
        translation: "李白乘着小船正要出发，忽然听见岸上传来踏着节拍唱歌送行的声音。桃花潭的水就算有千尺那么深，也比不上汪伦送我的这份情谊。",
      }
      ],
    },
    {
      title: "黄鹤楼送孟浩然之广陵 · 李白",
      art: 'libai-moon:ch4',
      artPrompt: "古诗《黄鹤楼送孟浩然之广陵》意境插画：故人西辞黄鹤楼，烟花三月下扬州。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "故人西辞黄鹤楼，烟花三月下扬州。\n孤帆远影碧山尽，唯见长江天际流。",
        pinyin: "gù rén xī cí huáng hè lóu， yān huā sān yuè xià yáng zhōu。\ngū fān yuǎn yǐng bì shān jìn， wéi jiàn cháng jiāng tiān jì liú。",
        translation: "老朋友告别了黄鹤楼，在这柳絮如烟、繁花似锦的三月，坐船下扬州去。那只孤船的帆影越走越远，最后消失在蓝天的尽头，只看见长江水浩浩荡荡向天边流去。",
      }
      ],
    },
    {
      title: "独坐敬亭山 · 李白",
      art: 'libai-moon:ch5',
      artPrompt: "古诗《独坐敬亭山》意境插画：众鸟高飞尽，孤云独去闲。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "众鸟高飞尽，孤云独去闲。\n相看两不厌，只有敬亭山。",
        pinyin: "zhòng niǎo gāo fēi jìn， gū yún dú qù xián。\nxiāng kàn liǎng bù yàn， zhǐ yǒu jìng tíng shān。",
        translation: "鸟儿们都高高地飞走了，连一片孤云也独自悠悠地飘远。和我互相凝望、怎么看也不厌倦的，只有眼前的敬亭山。",
      }
      ],
    },
    {
      title: "古朗月行 · 李白",
      art: 'libai-moon:ch6',
      artPrompt: "古诗《古朗月行》意境插画：小时不识月，呼作白玉盘。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "小时不识月，呼作白玉盘。\n又疑瑶台镜，飞在白云端。\n仙人垂两足，桂树作团团。\n白兔捣药成，问言与谁餐。\n蟾蜍蚀圆影，大明夜已残。\n羿昔落九乌，天人清且安。\n阴精此沦惑，去去不足观。\n忧来其如何，凄怆摧心肝。",
        pinyin: "xiǎo shí bù shí yuè， hū zuò bái yù pán。\nyòu yí yáo tái jìng， fēi zài bái yún duān。\nxiān rén chuí liǎng zú， guì shù zuò tuán tuán。\nbái tù dǎo yào chéng， wèn yán yǔ shuí cān。\nchán chú shí yuán yǐng， dà míng yè yǐ cán。\nyì xī luò jiǔ wū， tiān rén qīng qiě ān。\nyīn jīng cǐ lún huò， qù qù bù zú guān。\nyōu lái qí rú hé， qī chuàng cuī xīn gān。",
        translation: "小时候不知道月亮是什么，把它叫做白玉盘；又猜它是仙人用的镜子，飞挂在白云的那一头。月亮里，仙人垂下两只脚，桂树长得圆圆的，白兔捣好了仙药，不知道请谁来一起吃。后来蟾蜍把月亮咬得缺了角，月光渐渐暗了。传说后羿射下九个太阳，天上人间才清静安宁。月亮变成这样让人迷惑，再看下去也不值得了。心里又是忧愁又难过，几乎要把心肠都揪碎了。",
      }
      ],
    },
    {
      title: "客中行 · 李白",
      art: 'libai-moon:ch7',
      artPrompt: "古诗《客中行》意境插画：兰陵美酒郁金香，玉椀盛来琥珀光。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "兰陵美酒郁金香，玉椀盛来琥珀光。\n但使主人能醉客，不知何处是他乡。",
        pinyin: "lán líng měi jiǔ yù jīn xiāng， yù wǎn shèng lái hǔ pò guāng。\ndàn shǐ zhǔ rén néng zuì kè， bù zhī hé chù shì tā xiāng。",
        translation: "兰陵的美酒飘着郁金花的香气，盛在玉碗里闪着琥珀一样的光。只要主人能陪客人喝得痛痛快快，就不觉得这里是别人的家乡了。",
      }
      ],
    },
    {
      title: "山中问荅 · 李白",
      art: 'libai-moon:ch8',
      artPrompt: "古诗《山中问荅》意境插画：问余何意栖碧山，笑而不荅心自闲。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "问余何意栖碧山，笑而不荅心自闲。\n桃花流水窅然去，别有天地非人间。",
        pinyin: "wèn yú hé yì qī bì shān， xiào ér bù dá xīn zì xián。\ntáo huā liú shuǐ yǎo rán qù， bié yǒu tiān dì fēi rén jiān。",
        translation: "有人问我为什么住在青翠的山里，我笑一笑不回答，心里自自在在。桃花瓣落在流水上，慢慢漂向远方，这里另有一番天地，真不像人间。",
      }
      ],
    },
    {
      title: "劳劳亭 · 李白",
      art: 'libai-moon:ch9',
      artPrompt: "古诗《劳劳亭》意境插画：天下伤心处，劳劳送客亭。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "天下伤心处，劳劳送客亭。\n春风知别苦，不遣柳条青。",
        pinyin: "tiān xià shāng xīn chù， láo láo sòng kè tíng。\nchūn fēng zhī bié kǔ， bù qiǎn liǔ tiáo qīng。",
        translation: "天下最叫人伤心的地方，就是送别客人的劳劳亭。春风好像也知道离别的痛苦，故意不让柳条变青。",
      }
      ],
    },
    {
      title: "怨情 · 李白",
      art: 'libai-moon:ch10',
      artPrompt: "古诗《怨情》意境插画：新人如花虽可宠，故人似玉由来重。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "新人如花虽可宠，故人似玉由来重。\n花性飘扬不自持，玉心皎洁终不移。\n故人昔新今尚故，还见新人有故时。\n请看陈后黄金屋，寂寂珠帘生网丝。",
        pinyin: "xīn rén rú huā suī kě chǒng， gù rén sì yù yóu lái zhòng。\nhuā xìng piāo yáng bù zì chí， yù xīn jiǎo jié zhōng bù yí。\ngù rén xī xīn jīn shàng gù， hái jiàn xīn rén yǒu gù shí。\nqǐng kàn chén hòu huáng jīn wū， jì jì zhū lián shēng wǎng sī。",
        translation: "新的美人像花儿一样惹人疼爱，可从前的故人像美玉一样，一直被看重。花儿随风飘摆，管不住自己；玉一样的心却洁白干净，永远不会变。故人从前也曾是新人，总有一天，新人也会变成故人。你看当年住在黄金屋里的陈皇后，如今珠帘冷冷清清，都结上了蛛网。",
      }
      ],
    },
    {
      title: "相和歌辞 玉阶怨 · 李白",
      art: 'libai-moon:ch11',
      artPrompt: "古诗《相和歌辞 玉阶怨》意境插画：玉阶生白露，夜久侵罗袜。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "玉阶生白露，夜久侵罗袜。\n却下水精帘，玲珑望秋月。",
        pinyin: "yù jiē shēng bái lù， yè jiǔ qīn luó wà。\nquè xià shuǐ jīng lián， líng lóng wàng qiū yuè。",
        translation: "玉石台阶上落满了白露，她在夜里站得太久，露水都浸湿了丝罗袜子。回到屋里放下水晶帘子，隔着帘子，呆呆地望着那玲珑的秋月。",
      }
      ],
    },
    {
      title: "送友人 · 李白",
      art: 'libai-moon:ch12',
      artPrompt: "古诗《送友人》意境插画：青山横北郭，白水绕东城。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "青山横北郭，白水绕东城。\n此地一为别，孤蓬万里征。\n浮云游子意，落日故人情。\n挥手自兹去，萧萧班马鸣。",
        pinyin: "qīng shān héng běi guō， bái shuǐ rào dōng chéng。\ncǐ dì yī wèi bié， gū péng wàn lǐ zhēng。\nfú yún yóu zǐ yì， luò rì gù rén qíng。\nhuī shǒu zì zī qù， xiāo xiāo bān mǎ míng。",
        translation: "青山横亘在城郭的北面，白水环绕着城的东边。在这儿一分别，你就像孤单的蓬草踏上万里旅程；天上的浮云飘忽，像游子的心绪，将落的夕阳迟迟不去，像老朋友的深情。挥手从此告别，连马儿也萧萧嘶鸣，不肯离去。",
      }
      ],
    },
    {
      title: "渡荆门送别 · 李白",
      art: 'libai-moon:ch13',
      artPrompt: "古诗《渡荆门送别》意境插画：渡远荆门外，来从楚国游。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "渡远荆门外，来从楚国游。\n山随平野尽，江入大荒流。\n月下飞天镜，云生结海楼。\n仍连故乡水，万里送行舟。",
        pinyin: "dù yuǎn jīng mén wài， lái cóng chǔ guó yóu。\nshān suí píng yě jìn， jiāng rù dà huāng liú。\nyuè xià fēi tiān jìng， yún shēng jié hǎi lóu。\nréng lián gù xiāng shuǐ， wàn lǐ sòng xíng zhōu。",
        translation: "乘船远远过了荆门山，来到楚地漫游。山峦随着平原的出现渐渐消失，江水流入广阔的原野；月影映在江中像天上飞下的明镜，云彩层层叠起像海上的楼阁。我最爱这来自故乡的江水，不远万里，一路送着我的行船。",
      }
      ],
    },
    {
      title: "横吹曲辞 关山月 · 李白",
      art: 'libai-moon:ch14',
      artPrompt: "古诗《横吹曲辞 关山月》意境插画：明月出天山，苍茫云海间。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "明月出天山，苍茫云海间。\n长风几万里，吹度玉门关。\n汉下白登道，胡窥青海湾。\n由来征战地，不见有人还。\n戍客望边色，思归多苦颜。\n高楼当此夜，叹息未应闲。",
        pinyin: "míng yuè chū tiān shān， cāng máng yún hǎi jiān。\ncháng fēng jǐ wàn lǐ， chuī dù yù mén guān。\nhàn xià bái dēng dào， hú kuī qīng hǎi wān。\nyóu lái zhēng zhàn dì， bù jiàn yǒu rén hái。\nshù kè wàng biān sè， sī guī duō kǔ yán。\ngāo lóu dāng cǐ yè， tàn xī wèi yìng xián。",
        translation: "明月从天山上升起，出没在苍茫的云海之间；长风浩浩荡荡，吹过几万里，一直吹过玉门关。自古以来打仗的地方，很少有人能活着回来。守边的将士望着边地的景色，愁着脸想回家；这天夜里，家里高楼上的亲人，也一定在不停地叹息想念。",
      }
      ],
    },
    {
      title: "峨眉山月歌 · 李白",
      art: 'libai-moon:ch15',
      artPrompt: "古诗《峨眉山月歌》意境插画：峨眉山月半轮秋，影入平羌江水流。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "峨眉山月半轮秋，影入平羌江水流。\n夜发清溪向三峡，思君不见下渝州。",
        pinyin: "é méi shān yuè bàn lún qiū， yǐng rù píng qiāng jiāng shuǐ liú。\nyè fā qīng xī xiàng sān xiá， sī jūn bù jiàn xià yú zhōu。",
        translation: "峨眉山上挂着半轮秋天的月亮，月影落进平羌江，跟着江水一起流动。夜里乘船从清溪出发去三峡，想念你却见不到你，船一路往渝州驶去。",
      }
      ],
    },
    {
      title: "春夜洛城闻笛 · 李白",
      art: 'libai-moon:ch16',
      artPrompt: "古诗《春夜洛城闻笛》意境插画：谁家玉笛暗飞声，散入春风满洛城。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "谁家玉笛暗飞声，散入春风满洛城。\n此夜曲中闻折柳，何人不起故园情。",
        pinyin: "shuí jiā yù dí àn fēi shēng， sàn rù chūn fēng mǎn luò chéng。\ncǐ yè qǔ zhōng wén zhé liǔ， hé rén bù qǐ gù yuán qíng。",
        translation: "不知谁家在夜里吹起了玉笛，笛声随着春风飘散，飞满了洛阳城。今晚听到这支《折柳》的曲子，谁能不想起自己的家乡呢。",
      }
      ],
    },
    {
      title: "闻王昌龄左迁龙标遥有此寄 · 李白",
      art: 'libai-moon:ch17',
      artPrompt: "古诗《闻王昌龄左迁龙标遥有此寄》意境插画：杨花落尽子规啼，闻道龙标过五溪。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "杨花落尽子规啼，闻道龙标过五溪。\n我寄愁心与明月，随风直到夜郎西。",
        pinyin: "yáng huā luò jìn zǐ guī tí， wén dào lóng biāo guò wǔ xī。\nwǒ jì chóu xīn yǔ míng yuè， suí fēng zhí dào yè láng xī。",
        translation: "柳絮都落光了，杜鹃鸟一声声啼叫，听说你被贬到遥远的龙标，要经过五条溪水。我把牵挂你的这颗心交给天上的明月，让它随风向西，一直陪着你到夜郎西边。",
      }
      ],
    },
    {
      title: "把酒问月 · 李白",
      art: 'libai-moon:ch18',
      artPrompt: "古诗《把酒问月》意境插画：青天有月来几时，我今停杯一问之。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "青天有月来几时，我今停杯一问之。\n人攀明月不可得，月行却与人相随。\n皎如飞镜临丹阙，绿烟灭尽清辉发。\n但见宵从海上来，宁知晓向云间没。\n白兔捣药秋复春，嫦娥孤栖与谁邻。\n今人不见古时月，今月曾经照古人。\n古人今人若流水，共看明月皆如此。\n唯愿当歌对酒时，月光长照金樽里。",
        pinyin: "qīng tiān yǒu yuè lái jǐ shí， wǒ jīn tíng bēi yī wèn zhī。\nrén pān míng yuè bù kě dé， yuè xíng què yǔ rén xiāng suí。\njiǎo rú fēi jìng lín dān quē， lǜ yān miè jìn qīng huī fā。\ndàn jiàn xiāo cóng hǎi shàng lái， níng zhī xiǎo xiàng yún jiān méi。\nbái tù dǎo yào qiū fù chūn， cháng é gū qī yǔ shuí lín。\njīn rén bù jiàn gǔ shí yuè， jīn yuè céng jīng zhào gǔ rén。\ngǔ rén jīn rén ruò liú shuǐ， gòng kàn míng yuè jiē rú cǐ。\nwéi yuàn dāng gē duì jiǔ shí， yuè guāng cháng zhào jīn zūn lǐ。",
        translation: "青天上的月亮是什么时候来的？我停下酒杯问一问它。人想攀上月亮攀不到，月亮却总是跟着人走。它亮得像一面飞来的镜子照着宫殿，雾气散尽，清光闪闪。只见它晚上从海上升起，又谁知道它早晨悄悄躲进云里不见了。白兔捣药春去秋来不停歇，嫦娥孤零零的和谁做伴呢？今天的人看不见古时候的月亮，可今天的月亮照过古时候的人。古人和今人都像流水一样过去了，他们看到的都是这同一轮明月。只愿在唱歌喝酒的时候，月光长长久久地照进我的金杯里。",
      }
      ],
    },
    {
      title: "杂曲歌辞 行路难三首 一 · 李白",
      art: 'libai-moon:ch19',
      artPrompt: "古诗《杂曲歌辞 行路难三首 一》意境插画：金尊清酒斗十千，玉盘珍羞直万钱。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "金尊清酒斗十千，玉盘珍羞直万钱。\n停杯投筯不能食，拔劒四顾心茫然。\n欲渡黄河冰塞川，将登太行雪暗天。\n闲来垂钓坐溪上，忽复乘舟梦日边。\n行路难，行路难，多岐路，今安在？\n长风破浪会有时，直挂云帆济沧海。",
        pinyin: "jīn zūn qīng jiǔ dòu shí qiān， yù pán zhēn xiū zhí wàn qián。\ntíng bēi tóu zhù bù néng shí， bá jiàn sì gù xīn máng rán。\nyù dù huáng hé bīng sāi chuān， jiāng dēng tài háng xuě àn tiān。\nxián lái chuí diào zuò xī shàng， hū fù chéng zhōu mèng rì biān。\nxíng lù nán， xíng lù nán， duō qí lù， jīn ān zài？\ncháng fēng pò làng huì yǒu shí， zhí guà yún fān jì cāng hǎi。",
        translation: "金杯里的清酒一斗值十千钱，玉盘里的好菜贵上万钱。我却停下杯子、放下筷子吃不下，拔出剑来四处看看，心里一片茫然。想渡黄河，冰堵住了河道；想登太行山，大雪铺满了天。闲暇时像古人那样在溪边钓鱼，又忽然梦见乘船来到太阳旁边。行路难啊，行路难，岔路这么多，我要走的大路在哪里？总有一天会乘着长风破开大浪，到那时就挂起高高的云帆，渡过大海。",
      }
      ],
    },
    {
      title: "鼓吹曲辞 将进酒 · 李白",
      art: 'libai-moon:ch20',
      artPrompt: "古诗《鼓吹曲辞 将进酒》意境插画：君不见黄河之水天上来，奔流到海不复回。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "君不见黄河之水天上来，奔流到海不复回。\n君不见高堂明镜悲白发，朝如青丝暮成雪。\n人生得意须尽欢，莫使金尊空对月。\n天生我材必有用，千金散尽还复来。\n烹羊宰牛且为乐，会须一饮三百杯。\n岑夫子，丹丘生，将进酒，杯莫停。\n与君歌一曲，请君为我侧耳听。\n钟鼓馔玉不足贵，但愿长醉不复醒。\n古来圣贤皆寂寞，惟有饮者留其名。\n陈王昔时宴平乐，斗酒十千恣欢谑。\n主人何为言少钱，径须酤取对君酌。\n五花马，千金裘，呼儿将出换美酒，与尔同销万古愁。",
        pinyin: "jūn bù jiàn huáng hé zhī shuǐ tiān shàng lái， bēn liú dào hǎi bù fù huí。\njūn bù jiàn gāo táng míng jìng bēi bái fà， cháo rú qīng sī mù chéng xuě。\nrén shēng dé yì xū jìn huān， mò shǐ jīn zūn kōng duì yuè。\ntiān shēng wǒ cái bì yǒu yòng， qiān jīn sàn jìn hái fù lái。\npēng yáng zǎi niú qiě wèi lè， huì xū yī yǐn sān bǎi bēi。\ncén fū zǐ， dān qiū shēng， jiāng jìn jiǔ， bēi mò tíng。\nyǔ jūn gē yī qǔ， qǐng jūn wèi wǒ cè ěr tīng。\nzhōng gǔ zhuàn yù bù zú guì， dàn yuàn cháng zuì bù fù xǐng。\ngǔ lái shèng xián jiē jì mò， wéi yǒu yǐn zhě liú qí míng。\nchén wáng xī shí yàn píng lè， dòu jiǔ shí qiān zì huān xuè。\nzhǔ rén hé wèi yán shǎo qián， jìng xū gū qǔ duì jūn zhuó。\nwǔ huā mǎ， qiān jīn qiú， hū ér jiāng chū huàn měi jiǔ， yǔ ěr tóng xiāo wàn gǔ chóu。",
        translation: "你难道没看见，黄河的水像从天上倾泻下来，一路奔向大海再也不回头？你难道没看见，高堂上的人对着明镜悲叹白发，早上还像青丝，傍晚就白得像雪？人生得意的时候就要尽情欢乐，别让金杯空空地对着明月。老天生下我这样的人才一定有用处，千金散尽了还会再回来。煮羊宰牛咱们尽情快乐，一起喝它三百杯也别停下杯子。古来的圣贤都冷冷清清没人记得，只有爱喝酒的人留下了名声。主人别说钱不够，只管买酒来对饮；名贵的马、千金的皮裘，都叫孩子拿出去换美酒，让我们一起消解这万古的愁绪。",
      }
      ],
    },
    {
      title: "相和歌辞 蜀道难 · 李白",
      art: 'libai-moon:ch21',
      artPrompt: "古诗《相和歌辞 蜀道难》意境插画：噫吁嚱！危乎高哉！蜀道之难难于上青天！蚕丛及鱼凫，开国何茫然。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "噫吁嚱！危乎高哉！蜀道之难难于上青天！蚕丛及鱼凫，开国何茫然。\n尔来四万八千岁，乃与秦塞通人烟。\n西当太白有鸟道，可以横绝峨眉巅。\n地崩山摧壮士死，然后天梯石栈方钩连。\n上有六龙回日之高标，下有冲波逆折之回川。\n黄鹤之飞尚不得，猨猱欲度愁攀缘。\n青泥何盘盘，百步九折萦岩峦。\n扪参历井仰胁息，以手抚膺坐长叹。\n问君西游何时还？畏途巉岩不可攀。\n但见悲鸟号枯木，雄飞呼雌绕林间。\n又闻子规啼夜月，愁空山，蜀道之难难于上青天！使人听此雕朱颜。\n连峰去天不盈尺，枯松倒挂倚绝壁。\n飞湍瀑流相喧豗，砅崖转石万壑雷。\n其崄也若此，嗟尔远道之人胡为乎来哉？\n劒阁峥嵘而崔嵬，一夫当关，万夫莫开。\n所守或匪亲，化为狼与豺。\n朝避猛虎，夕避长蛇。\n磨牙吮血，杀人如麻。\n锦城虽云乐，不如早还家。\n蜀道之难难于上青天，侧身西望长咨嗟。",
        pinyin: "yī xū xī！ wēi hū gāo zāi！ shǔ dào zhī nán nán yú shàng qīng tiān！ cán cóng jí yú fú， kāi guó hé máng rán。\něr lái sì wàn bā qiān suì， nǎi yǔ qín sāi tōng rén yān。\nxī dāng tài bái yǒu niǎo dào， kě yǐ héng jué é méi diān。\ndì bēng shān cuī zhuàng shì sǐ， rán hòu tiān tī shí zhàn fāng gōu lián。\nshàng yǒu liù lóng huí rì zhī gāo biāo， xià yǒu chōng bō nì zhé zhī huí chuān。\nhuáng hè zhī fēi shàng bù dé， yuán náo yù dù chóu pān yuán。\nqīng ní hé pán pán， bǎi bù jiǔ zhé yíng yán luán。\nmén shēn lì jǐng yǎng xié xī， yǐ shǒu fǔ yīng zuò cháng tàn。\nwèn jūn xī yóu hé shí hái？ wèi tú chán yán bù kě pān。\ndàn jiàn bēi niǎo hào kū mù， xióng fēi hū cí rào lín jiān。\nyòu wén zǐ guī tí yè yuè， chóu kōng shān， shǔ dào zhī nán nán yú shàng qīng tiān！ shǐ rén tīng cǐ diāo zhū yán。\nlián fēng qù tiān bù yíng chǐ， kū sōng dǎo guà yǐ jué bì。\nfēi tuān pù liú xiāng xuān huī， lì yá zhuǎn shí wàn hè léi。\nqí xiǎn yě ruò cǐ， jiē ěr yuǎn dào zhī rén hú wèi hū lái zāi？\njiàn gé zhēng róng ér cuī wéi， yī fū dāng guān， wàn fū mò kāi。\nsuǒ shǒu huò fěi qīn， huà wéi láng yǔ chái。\ncháo bì měng hǔ， xī bì cháng shé。\nmó yá shǔn xuè， shā rén rú má。\njǐn chéng suī yún lè， bù rú zǎo hái jiā。\nshǔ dào zhī nán nán yú shàng qīng tiān， cè shēn xī wàng cháng zī jiē。",
        translation: "唉呀呀，多么高、多么险！入蜀的道路比上青天还难。从蚕丛、鱼凫开国以来四万八千年，蜀地才和秦地有人烟相通。山高得太阳都要绕着走，山下激流回旋打转；善飞的黄鹤尚且飞不过去，猿猴想攀过去也发愁。青泥岭的路弯弯曲曲，走一百步要转九道弯，行人仰着头喘气，只好手摸胸口坐下长叹。悲鸟在枯树上啼叫，杜鹃在月夜里哀鸣，蜀道难走，比上青天还难，叫人听了脸色都变了。山峰连着山峰，离天不到一尺，枯松倒挂在绝壁上；飞泻的瀑布撞在山岩上，转动石头，像万千山谷里打雷。剑阁又高又险，一个人守着关口，一万人也打不开；守关的要是靠不住的人，他就会变成豺狼。早上要躲猛虎，傍晚要避长蛇，磨着牙吸着血，杀人多得像麻。锦城虽说快乐，不如早点回家——蜀道难走，比上青天还难，叫人侧身西望，长长叹息。",
      }
      ],
    },
    {
      title: "梦游天姥吟留别 · 李白",
      art: 'libai-moon:ch22',
      artPrompt: "古诗《梦游天姥吟留别》意境插画：海客谈瀛洲，烟涛微茫信难求。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "海客谈瀛洲，烟涛微茫信难求。\n越人语天姥，云霓明灭或可覩。\n天姥连天向天横，势拔五岳掩赤城。\n天台四万八千丈，对此欲倒东南倾。\n我欲因之梦吴越，一夜飞度镜湖月。\n湖月照我影，送我至剡溪。\n谢公宿处今尚在，渌水荡漾清猨啼。\n脚著谢公屐，身登青云梯。\n半壁见海日，空中闻天鸡。\n千岩万转路不定，迷花倚石忽已暝。\n熊咆龙吟殷岩泉，栗深林兮惊层巅。\n云青青兮欲雨，水澹澹兮生烟。\n列缺霹雳，丘峦崩摧。\n洞天石扇，訇然中开。\n青冥浩荡不见底，日月照耀金银台。\n霓为衣兮风为马，云之君兮纷纷而来下。\n虎鼓瑟兮鸾回车，仙之人兮列如麻。\n忽魂悸以魄动，怳惊起而长嗟。\n惟觉时之枕席，失向来之烟霞。\n世间行乐亦如此，古来万事东流水。\n别君去时何时还，且放白鹿青崖间，须行即骑访名山。\n安能摧眉折腰事权贵？\n使我不得开心颜。",
        pinyin: "hǎi kè tán yíng zhōu， yān tāo wēi máng xìn nán qiú。\nyuè rén yǔ tiān lǎo， yún ní míng miè huò kě dǔ。\ntiān lǎo lián tiān xiàng tiān héng， shì bá wǔ yuè yǎn chì chéng。\ntiān tái sì wàn bā qiān zhàng， duì cǐ yù dǎo dōng nán qīng。\nwǒ yù yīn zhī mèng wú yuè， yī yè fēi dù jìng hú yuè。\nhú yuè zhào wǒ yǐng， sòng wǒ zhì yǎn xī。\nxiè gōng sù chù jīn shàng zài， lù shuǐ dàng yàng qīng yuán tí。\njiǎo zhù xiè gōng jī， shēn dēng qīng yún tī。\nbàn bì jiàn hǎi rì， kōng zhōng wén tiān jī。\nqiān yán wàn zhuǎn lù bù dìng， mí huā yǐ shí hū yǐ míng。\nxióng páo lóng yín yīn yán quán， lì shēn lín xī jīng céng diān。\nyún qīng qīng xī yù yǔ， shuǐ dàn dàn xī shēng yān。\nliè quē pī lì， qiū luán bēng cuī。\ndòng tiān shí shàn， hōng rán zhōng kāi。\nqīng míng hào dàng bù jiàn dǐ， rì yuè zhào yào jīn yín tái。\nní wèi yī xī fēng wèi mǎ， yún zhī jūn xī fēn fēn ér lái xià。\nhǔ gǔ sè xī luán huí chē， xiān zhī rén xī liè rú má。\nhū hún jì yǐ pò dòng， huǎng jīng qǐ ér cháng jiē。\nwéi jué shí zhī zhěn xí， shī xiàng lái zhī yān xiá。\nshì jiān xíng lè yì rú cǐ， gǔ lái wàn shì dōng liú shuǐ。\nbié jūn qù shí hé shí hái， qiě fàng bái lù qīng yá jiān， xū xíng jí qí fǎng míng shān。\nān néng cuī méi zhé yāo shì quán guì？\nshǐ wǒ bù dé kāi xīn yán。",
        translation: "海上回来的人说仙山瀛洲隔着烟雾波涛，实在难找；越人说天姥山高得连着天，云霞忽明忽暗，有时还能望见。诗人夜里做了个梦，一夜飞过月光下的镜湖，穿着木屐登上青云梯，看见海上日出、听见天上雄鸡啼叫；忽然电闪雷鸣，山石大门訇然打开，仙人穿着彩虹衣裳、驾着风马纷纷下来，猛地一惊，梦醒了，枕席还在，满山的烟霞都不见了。诗人说：怎么能低眉弯腰去伺候有权有势的人，让自己不开心不快活呢！",
      }
      ],
    },
    {
      title: "赠孟浩然 · 李白",
      art: 'libai-moon:ch23',
      artPrompt: "古诗《赠孟浩然》意境插画：吾爱孟夫子，风流天下闻。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "吾爱孟夫子，风流天下闻。\n红颜弃轩冕，白首卧松云。\n醉月频中圣，迷花不事君。\n高山安可仰，徒此揖清芬。",
        pinyin: "wú ài mèng fū zǐ， fēng liú tiān xià wén。\nhóng yán qì xuān miǎn， bái shǒu wò sōng yún。\nzuì yuè pín zhōng shèng， mí huā bù shì jūn。\ngāo shān ān kě yǎng， tú cǐ yī qīng fēn。",
        translation: "我敬爱的孟先生，潇洒的风度天下闻名。年纪轻轻就抛开官车官帽，到白头还卧在松风白云之间；月下常常喝得畅快，陶醉于花草不肯去做官。像高山一样让人仰慕不尽，我只能向你拱手行礼，敬你一身清雅的芬芳。",
      }
      ],
    },
    {
      title: "沙丘城下寄杜甫 · 李白",
      art: 'libai-moon:ch24',
      artPrompt: "古诗《沙丘城下寄杜甫》意境插画：我来竟何事，高卧沙丘城。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "我来竟何事，高卧沙丘城。\n城边有古树，日夕连秋声。\n鲁酒不可醉，齐歌空复情。\n思君若汶水，浩荡寄南征。",
        pinyin: "wǒ lái jìng hé shì， gāo wò shā qiū chéng。\nchéng biān yǒu gǔ shù， rì xī lián qiū shēng。\nlǔ jiǔ bù kě zuì， qí gē kōng fù qíng。\nsī jūn ruò wèn shuǐ， hào dàng jì nán zhēng。",
        translation: "我来这里是为了什么呢，只好在沙丘城里闲住。城边有古老的树，从早到晚响着秋天的风声。这里的酒喝不醉我，这里的歌也空有深情。想念你的心思就像汶水，浩浩荡荡地随着你往南流去。",
      }
      ],
    },
    {
      title: "杂曲歌辞 清平调 一 · 李白",
      art: 'libai-moon:ch25',
      artPrompt: "古诗《杂曲歌辞 清平调 一》意境插画：云想衣裳花想容，春风拂槛露华浓。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "云想衣裳花想容，春风拂槛露华浓。\n若非群玉山头见，会向瑶台月下逢。",
        pinyin: "yún xiǎng yī shang huā xiǎng róng， chūn fēng fú kǎn lù huá nóng。\nruò fēi qún yù shān tóu jiàn， huì xiàng yáo tái yuè xià féng。",
        translation: "看见云就想起你的衣裳，看见花就想起你的容貌，春风吹过栏杆，露水把花儿润得更美。这样美的人，要不是在群玉山头见到，就只能在瑶台的月光下才能遇到。",
      }
      ],
    },
    {
      title: "相和歌辞 长门怨二首 一 · 李白",
      art: 'libai-moon:ch26',
      artPrompt: "古诗《相和歌辞 长门怨二首 一》意境插画：天回北斗挂西楼，金屋无人萤火流。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "天回北斗挂西楼，金屋无人萤火流。\n月光欲到长门殿，别作深宫一段愁。",
        pinyin: "tiān huí běi dòu guà xī lóu， jīn wū wú rén yíng huǒ liú。\nyuè guāng yù dào cháng mén diàn， bié zuò shēn gōng yī duàn chóu。",
        translation: "北斗星斜挂在西楼上，金屋里没有人，只有萤火虫飞来飞去。月光想照进长门殿，却变成了深宫里的一段忧愁。",
      }
      ],
    },
    {
      title: "金陵酒肆留别 · 李白",
      art: 'libai-moon:ch27',
      artPrompt: "古诗《金陵酒肆留别》意境插画：风吹柳花满店香，吴姬压酒唤客尝。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "风吹柳花满店香，吴姬压酒唤客尝。\n金陵子弟来相送，欲行不行各尽觞。\n请君试问东流水，别意与之谁短长。",
        pinyin: "fēng chuī liǔ huā mǎn diàn xiāng， wú jī yā jiǔ huàn kè cháng。\njīn líng zǐ dì lái xiāng sòng， yù xíng bù xíng gè jìn shāng。\nqǐng jūn shì wèn dōng liú shuǐ， bié yì yǔ zhī shuí duǎn cháng。",
        translation: "风吹着柳絮，满店里都是香气，酒店的姑娘压好新酒，请客人尝一尝。金陵的年轻人来给我送行，要走的不走的都干尽了杯中的酒。请你们问问向东奔流的江水，离别的情意和它比一比，到底谁短谁长呢？",
      }
      ],
    },
    {
      title: "夜泊牛渚怀古 · 李白",
      art: 'libai-moon:ch28',
      artPrompt: "古诗《夜泊牛渚怀古》意境插画：牛渚西江夜，青天无片云。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "牛渚西江夜，青天无片云。\n登舟望秋月，空忆谢将军。\n余亦能高咏，斯人不可闻。\n明朝挂帆席，枫叶落纷纷。",
        pinyin: "niú zhǔ xī jiāng yè， qīng tiān wú piàn yún。\ndēng zhōu wàng qiū yuè， kōng yì xiè jiāng jūn。\nyú yì néng gāo yǒng， sī rén bù kě wén。\nmíng cháo guà fān xí， fēng yè luò fēn fēn。",
        translation: "夜晚船停在牛渚山旁的西江上，青天上没有一丝云。登上船仰望秋天的明月，空自想起那位爱惜人才的谢将军；我也会放声吟咏，可惜再遇不到那样听得懂的人。明天一早挂起船帆离开，枫叶正纷纷飘落。",
      }
      ],
    }
  ],
  rights: {
    workTitle: "李白诗选",
    author: "李白",
    authorDeathYear: 762,
    translator: '桃阅读',
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: "https://github.com/chinese-poetry/chinese-poetry",
    note: "所选诗作者卒年逾保护期；注音与白话译文为平台自撰。",
  },
}
