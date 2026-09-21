import type { PackBook } from '../types'

/**
 * 《汉乐府与古诗选》——由 scripts/gen-corpus.mjs 从公版语料生成（2026-09-20 全面补全）。
 * 底本：乐府诗集（选）（汉乐府 等）。逐字来自语料数据集，译文为平台自撰白话。
 * 汉魏六朝乐府与古诗，均远超保护期；注音与白话译文为平台自撰。
 */
export const yueFu: PackBook = {
  id: "poetry-yuefu",
  title: "汉乐府与古诗选",
  author: "汉乐府 / 北朝民歌 等",
  lang: "zh",
  category: "poetry",
  ageStage: "3-5",
  intro: "江南可采莲、青青园中葵……最古老的歌谣，句句像唱歌。",
  coverArt: "yuefu-lotus",
  coverArtPrompt: "夏日的荷塘开满粉白莲花，大而圆的荷叶层层叠叠，几条小鱼在莲叶间穿梭游动，水面泛着细碎的金色阳光，远山如洗",
  coverFrom: "#4DB6AC",
  coverTo: "#FFF176",
  source: "汉乐府民歌（汉魏六朝），通行本（郭茂倩《乐府诗集》）",
  chapters: [
    {
      title: "江南 · 汉乐府",
      art: "river-boat",
      artPrompt: "古诗《江南》意境插画：江南可采莲，——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "江南可采莲，\n莲叶何田田。\n鱼戏莲叶间。\n鱼戏莲叶东，鱼戏莲叶西，\n鱼戏莲叶南，鱼戏莲叶北。",
        pinyin: "jiāng nán kě cǎi lián，\nlián yè hé tián tián。\nyú xì lián yè jiān。\nyú xì lián yè dōng， yú xì lián yè xī，\nyú xì lián yè nán， yú xì lián yè běi。",
        translation: "江南正是采莲的好时候，莲叶挨挨挤挤，多么茂盛。鱼儿在莲叶中间游来游去做游戏：一会儿游到莲叶的东边，一会儿游到莲叶的西边，一会儿游到莲叶的南边，一会儿又游到莲叶的北边。",
      }
      ],
    },
    {
      title: "长歌行 · 汉乐府",
      art: "primer-scroll",
      artPrompt: "古诗《长歌行》意境插画：青青园中葵，朝露待日晞。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "青青园中葵，朝露待日晞。\n阳春布德泽，万物生光辉。\n常恐秋节至，焜黄华叶衰。\n百川东到海，何时复西归？\n少壮不努力，老大徒伤悲。",
        pinyin: "qīng qīng yuán zhōng kuí， cháo lù dài rì xī。\nyáng chūn bù dé zé， wàn wù shēng guāng huī。\ncháng kǒng qiū jié zhì， kūn huáng huá yè shuāi。\nbǎi chuān dōng dào hǎi， hé shí fù xī guī？\nshào zhuàng bù nǔ lì， lǎo dà tú shāng bēi。",
        translation: "园子里的葵菜绿油油的，叶上的露水等着太阳晒干。温暖的春天把恩泽洒给万物，一切都亮闪闪地生长。可又常常担心秋天来到，花和叶子都要枯黄衰败。千百条河向东流进大海，什么时候才能再向西流回来？年轻的时候不努力，到老了只剩白白地悲伤。",
      }
      ],
    },
    {
      title: "敕勒歌 · 北朝民歌",
      art: "sunrise-hills",
      artPrompt: "古诗《敕勒歌》意境插画：敕勒川，阴山下。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "敕勒川，阴山下。\n天似穹庐，笼盖四野。\n天苍苍，野茫茫，风吹草低见牛羊。",
        pinyin: "chì lè chuān， yīn shān xià。\ntiān sì qióng lú， lóng gài sì yě。\ntiān cāng cāng， yě máng máng， fēng chuī cǎo dī jiàn niú yáng。",
        translation: "敕勒族人住的大平原，就在高高的阴山脚下。天空像一顶圆圆的大帐篷，把原野四面八方都罩住。天蓝蓝的，原野茫茫的，风一吹，草低下头，就看见了满地的牛羊。",
      }
      ],
    },
    {
      title: "七步诗 · 曹植",
      art: "poetry-moon",
      artPrompt: "古诗《七步诗》意境插画：煮豆持作羹，漉菽以为汁。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "煮豆持作羹，漉菽以为汁。\n萁在釜下燃，豆在釜中泣。\n本自同根生，相煎何太急？",
        pinyin: "zhǔ dòu chí zuò gēng， lù shū yǐ wéi zhī。\nqí zài fǔ xià rán， dòu zài fǔ zhōng qì。\nběn zì tóng gēn shēng， xiāng jiān hé tài jí？",
        translation: "锅里煮着豆子做豆羹，滤出豆子留下豆汁。豆秸在锅底下烧得正旺，豆子在锅里哭着说：我们本来是同一条根上长出来的，你为什么这样急急地煎熬我呢？",
      }
      ],
    },
    {
      title: "大风歌 · 刘邦",
      art: "cloud-flight",
      artPrompt: "古诗《大风歌》意境插画：大风起兮云飞扬，——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "大风起兮云飞扬，\n威加海内兮归故乡，\n安得猛士兮守四方！",
        pinyin: "dà fēng qǐ xī yún fēi yáng，\nwēi jiā hǎi nèi xī guī gù xiāng，\nān dé měng shì xī shǒu sì fāng！",
        translation: "大风猛地刮起来啊，白云满天飞扬；威名传遍天下啊，我回到了故乡；到哪里去找勇士啊，替我守住四面八方！",
      }
      ],
    },
    {
      title: "垓下歌 · 项羽",
      art: "sunrise-hills",
      artPrompt: "古诗《垓下歌》意境插画：力拔山兮气盖世，时不利兮骓不逝。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "力拔山兮气盖世，时不利兮骓不逝。\n骓不逝兮可奈何，虞兮虞兮奈若何！",
        pinyin: "lì bá shān xī qì gài shì， shí bù lì xī zhuī bù shì。\nzhuī bù shì xī kě nài hé， yú xī yú xī nài ruò hé！",
        translation: "我的力气能拔起大山啊，豪气盖过天下，可是时运不济啊，乌骓马也不肯奔跑。乌骓马不肯跑，我又能怎么办？虞姬啊虞姬，我该把你怎么办呢！",
      }
      ],
    },
    {
      title: "易水歌 · 荆轲",
      art: "nursery-window",
      artPrompt: "古诗《易水歌》意境插画：风萧萧兮易水寒，壮士一去兮不复还。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "风萧萧兮易水寒，壮士一去兮不复还。",
        pinyin: "fēng xiāo xiāo xī yì shuǐ hán， zhuàng shì yī qù xī bù fù hái。",
        translation: "风呼呼地吹着啊，易水是那么寒冷；壮士这一去啊，就再也不回来了。",
      }
      ],
    },
    {
      title: "古朗月行（节选） · 李白",
      art: "poetry-moon",
      artPrompt: "古诗《古朗月行（节选）》意境插画：小时不识月，呼作白玉盘。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "小时不识月，呼作白玉盘。\n又疑瑶台镜，飞在青云端。",
        pinyin: "xiǎo shí bù shí yuè， hū zuò bái yù pán。\nyòu yí yáo tái jìng， fēi zài qīng yún duān。",
        translation: "小时候不认识月亮，把它叫作白玉做的盘子。又怀疑它是仙人的镜子，飞挂在青色的云端上。",
      }
      ],
    },
    {
      title: "长干行（节选） · 李白",
      art: "nursery-window",
      artPrompt: "古诗《长干行（节选）》意境插画：郎骑竹马来，绕床弄青梅。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "郎骑竹马来，绕床弄青梅。\n同居长干里，两小无嫌猜。",
        pinyin: "láng qí zhú mǎ lái， rào chuáng nòng qīng méi。\ntóng jū cháng gān lǐ， liǎng xiǎo wú xián cāi。",
        translation: "你骑着竹马跑过来，绕着井栏追着玩，手里拿着青梅。我们都住在长干里，两个小孩子从不互相猜疑打闹。",
      }
      ],
    },
    {
      title: "十五从军征（节选） · 汉乐府",
      art: "primer-scroll",
      artPrompt: "古诗《十五从军征（节选）》意境插画：十五从军征，八十始得归。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "十五从军征，八十始得归。\n道逢乡里人：家中有阿谁？",
        pinyin: "shí wǔ cóng jūn zhēng， bā shí shǐ dé guī。\ndào féng xiāng lǐ rén： jiā zhōng yǒu ā shuí？",
        translation: "十五岁就出去当兵打仗，八十岁才得以回家。半路上遇到乡里的人，问：我家里还有谁在呢？",
      }
      ],
    },
    {
      title: "饮马长城窟行（节选） · 汉乐府",
      art: "river-boat",
      artPrompt: "古诗《饮马长城窟行（节选）》意境插画：青青河畔草，绵绵思远道。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "青青河畔草，绵绵思远道。",
        pinyin: "qīng qīng hé pàn cǎo， mián mián sī yuǎn dào。",
        translation: "河边长满青青的草，望着这连绵不断的绿草，思念起远方的亲人。",
      }
      ],
    },
    {
      title: "上邪 · 汉乐府",
      art: "poetry-moon",
      artPrompt: "古诗《上邪》意境插画：上邪！我欲与君相知，长命无绝衰。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "上邪！我欲与君相知，长命无绝衰。\n山无陵，江水为竭，冬雷震震，夏雨雪，天地合，乃敢与君绝。",
        pinyin: "shàng xié！ wǒ yù yǔ jūn xiāng zhī， cháng mìng wú jué shuāi。\nshān wú líng， jiāng shuǐ wèi jié， dōng léi zhèn zhèn， xià yǔ xuě， tiān dì hé， nǎi gǎn yǔ jūn jué。",
        translation: "天啊！我要和你相亲相爱，让这份感情永不衰减。除非高山变成平地，江水流干了，冬天打雷，夏天下雪，天和地合在一起，我才敢和你断绝情意。",
      }
      ],
    }
  ],
  rights: {
    workTitle: "乐府诗集（选）",
    author: "汉乐府 等",
    authorDeathYear: -1,
    translator: '桃阅读',
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: "https://github.com/chinese-poetry/chinese-poetry",
    note: "汉魏六朝乐府与古诗，均远超保护期；注音与白话译文为平台自撰。",
  },
}
