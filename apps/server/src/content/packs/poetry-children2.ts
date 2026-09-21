import type { PackBook } from '../types'

/**
 * 《童趣诗选·好玩的事》——由 scripts/gen-corpus.mjs 从公版语料生成（2026-09-20 全面补全）。
 * 底本：童趣诗选·好玩的事（历代诗人）。逐字来自语料数据集，译文为平台自撰白话。
 * 所选诗文作者卒年均逾保护期；注音与白话译文为平台自撰。
 */
export const tongQuPlay: PackBook = {
  id: "poetry-children2",
  title: "童趣诗选·好玩的事",
  author: "范成大 / 杨万里 / 白居易 等",
  lang: "zh",
  category: "poetry",
  ageStage: "3-5",
  intro: "放风筝、捉蝴蝶、偷采莲、学种瓜——古代小朋友的游戏都在这里。",
  coverArt: "tongqu-play-cover",
  coverArtPrompt: "河边草地上几个古代小孩在玩耍：一个坐着钓鱼，两个在船上撑伞，一个拿冰块敲着听响，柳絮飞舞，暖融融的绘本风",
  coverFrom: "#2E7D32",
  coverTo: "#FFF3C4",
  source: "公版古诗选集，逐字注音",
  chapters: [
    {
      title: "稚子弄冰 · 杨万里",
      art: 'poetry-children2:ch1',
      artPrompt: "古诗《稚子弄冰》意境插画：稚子金盆脱晓冰，彩丝穿取当银钲。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "稚子金盆脱晓冰，彩丝穿取当银钲。\n敲成玉磬穿林响，忽作玻璃碎地声。",
        pinyin: "zhì zǐ jīn pén tuō xiǎo bīng， cǎi sī chuān qǔ dāng yín zhēng。\nqiāo chéng yù qìng chuān lín xiǎng， hū zuò bō lí suì dì shēng。",
        translation: "清晨，小孩子从金属盆里取出夜里冻好的冰块，用彩色的丝线穿起来，当作银锣来敲。敲出的声音像玉磬一样清脆，穿过树林，忽然冰块掉下来，像玻璃一样摔碎在地上。",
      }
      ],
    },
    {
      title: "桑茶坑道中 · 杨万里",
      art: 'poetry-children2:ch2',
      artPrompt: "古诗《桑茶坑道中》意境插画：晴明风日雨干时，草满花堤水满溪。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "晴明风日雨干时，草满花堤水满溪。\n童子柳阴眠正着，一牛吃过柳阴西。",
        pinyin: "qíng míng fēng rì yǔ gān shí， cǎo mǎn huā dī shuǐ mǎn xī。\ntóng zǐ liǔ yīn mián zhèng zháo， yī niú chī guò liǔ yīn xī。",
        translation: "雨后放晴，风和日丽，堤上长满了青草和野花，溪水满满的。放牛的孩子在柳荫下睡得正香，一头牛已经把草吃到柳荫的西边去了。",
      }
      ],
    },
    {
      title: "闲居初夏午睡起 · 杨万里",
      art: 'poetry-children2:ch3',
      artPrompt: "古诗《闲居初夏午睡起》意境插画：梅子留酸软齿牙，芭蕉分绿与窗纱。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "梅子留酸软齿牙，芭蕉分绿与窗纱。\n日长睡起无情思，闲看儿童捉柳花。",
        pinyin: "méi zǐ liú suān ruǎn chǐ yá， bā jiāo fēn lǜ yǔ chuāng shā。\nrì cháng shuì qǐ wú qíng sī， xián kàn ér tóng zhuō liǔ huā。",
        translation: "吃过梅子，牙齿还留着一股酸味，软软的；芭蕉的绿色映上了窗纱。白天变长了，午睡醒来没什么心思，闲闲地看孩子们扑捉飘飞的柳絮。",
      }
      ],
    },
    {
      title: "清明 · 杜牧",
      art: 'poetry-children2:ch4',
      artPrompt: "古诗《清明》意境插画：清明时节雨纷纷，路上行人欲断魂。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "清明时节雨纷纷，路上行人欲断魂。\n借问酒家何处有？牧童遥指杏花村。",
        pinyin: "qīng míng shí jié yǔ fēn fēn， lù shang xíng rén yù duàn hún。\njiè wèn jiǔ jiā hé chù yǒu？ mù tóng yáo zhǐ xìng huā cūn。",
        translation: "清明节的时候，细雨下个不停，路上的行人心情难过，就像丢了魂一样。请问哪里有酒家呀？牧童远远地指着杏花盛开的小村庄。",
      }
      ],
    },
    {
      title: "回乡偶书 · 贺知章",
      art: 'poetry-children2:ch5',
      artPrompt: "古诗《回乡偶书》意境插画：少小离家老大回，乡音无改鬓毛衰。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "少小离家老大回，乡音无改鬓毛衰。\n儿童相见不相识，笑问客从何处来。",
        pinyin: "shǎo xiǎo lí jiā lǎo dà huí， xiāng yīn wú gǎi bìn máo shuāi。\nér tóng xiāng jiàn bù xiāng shí， xiào wèn kè cóng hé chù lái。",
        translation: "年轻时离开家乡，年纪大了才回来，家乡的口音没有变，头发却白了、稀少了。村里的孩子们见到我都不认识，笑着问我：客人是从哪里来的呀？",
      }
      ],
    },
    {
      title: "牧童 · 吕岩",
      art: 'poetry-children2:ch6',
      artPrompt: "古诗《牧童》意境插画：草铺横野六七里，笛弄晚风三四声。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "草铺横野六七里，笛弄晚风三四声。\n归来饱饭黄昏后，不脱蓑衣卧月明。",
        pinyin: "cǎo pù héng yě liù qī lǐ， dí nòng wǎn fēng sān sì shēng。\nguī lái bǎo fàn huáng hūn hòu， bù tuō suō yī wò yuè míng。",
        translation: "青草铺满了六七里宽的原野，晚风中传来三四声悠扬的笛声。黄昏放牛回来吃饱了饭，他连蓑衣都不脱，就躺在明亮的月光下睡觉。",
      }
      ],
    },
    {
      title: "观游鱼 · 白居易",
      art: 'poetry-children2:ch7',
      artPrompt: "古诗《观游鱼》意境插画：绕池闲步看鱼游，正值儿童弄钓舟。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "绕池闲步看鱼游，正值儿童弄钓舟。\n一种爱鱼心各异，我来施食尔垂钩。",
        pinyin: "rào chí xián bù kàn yú yóu， zhèng zhí ér tóng nòng diào zhōu。\nyī zhǒng ài yú xīn gè yì， wǒ lái shī shí ěr chuí gōu。",
        translation: "绕着池塘散步，看鱼儿游来游去，正碰上孩子们在钓鱼的小船上玩耍。同样是爱鱼，心意却各不相同：我来给鱼喂食，你们却下钩去钓。",
      }
      ],
    },
    {
      title: "牧童词（节选） · 李涉",
      art: 'poetry-children2:ch8',
      artPrompt: "古诗《牧童词（节选）》意境插画：朝牧牛，牧牛下江曲。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "朝牧牛，牧牛下江曲。\n夜牧牛，牧牛度村谷。",
        pinyin: "cháo mù niú， mù niú xià jiāng qǔ。\nyè mù niú， mù niú dù cūn gǔ。",
        translation: "早晨去放牛，把牛赶到江边弯弯的地方；晚上放牛，又带着牛走过村庄和山谷。",
      }
      ],
    },
    {
      title: "巴女谣 · 于鹄",
      art: 'poetry-children2:ch9',
      artPrompt: "古诗《巴女谣》意境插画：巴女骑牛唱竹枝，藕丝菱叶傍江时。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "巴女骑牛唱竹枝，藕丝菱叶傍江时。\n不愁日暮还家错，记得芭蕉出槿篱。",
        pinyin: "bā nǚ qí niú chàng zhú zhī， ǒu sī líng yè bàng jiāng shí。\nbù chóu rì mù hái jiā cuò， jì de bā jiāo chū jǐn lí。",
        translation: "巴地的女孩骑着牛，唱着竹枝歌，正是荷叶像细丝、菱叶漂浮在江边的时候。她不担心天黑回家会走错路，因为她记得家门口有一棵芭蕉，长出在木槿篱笆上面。",
      }
      ],
    },
    {
      title: "淮上渔者 · 郑谷",
      art: 'poetry-children2:ch10',
      artPrompt: "古诗《淮上渔者》意境插画：白头波上白头翁，家逐船移江浦风。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "白头波上白头翁，家逐船移江浦风。\n一尺鲈鱼新钓得，儿孙吹火荻花中。",
        pinyin: "bái tóu bō shàng bái tóu wēng， jiā zhú chuán yí jiāng pǔ fēng。\nyī chǐ lú yú xīn diào dé， ér sūn chuī huǒ dí huā zhōng。",
        translation: "白色的浪花上，有一位白发苍苍的老渔翁，他的家跟着渔船移动，伴着江边的风。刚钓到一条一尺长的鲈鱼，儿孙们就在荻花丛中吹火，准备煮鱼吃。",
      }
      ],
    }
  ],
  rights: {
    workTitle: "童趣诗选·好玩的事",
    author: "历代诗人",
    authorDeathYear: 1279,
    translator: '桃阅读',
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: "https://github.com/chinese-poetry/chinese-poetry",
    note: "所选诗文作者卒年均逾保护期；注音与白话译文为平台自撰。",
  },
}
