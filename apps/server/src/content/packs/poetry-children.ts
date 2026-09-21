import type { PackBook } from '../types'

/**
 * 《童趣诗选·小动物》——由 scripts/gen-corpus.mjs 从公版语料生成（2026-09-20 全面补全）。
 * 底本：童趣诗选（历代诗人）。逐字来自语料数据集，译文为平台自撰白话。
 * 所选诗文作者卒年均逾保护期；注音与白话译文为平台自撰。
 */
export const tongQu: PackBook = {
  id: "tongqu-animals",
  title: "童趣诗选·小动物",
  author: "骆宾王 / 袁枚 / 杨万里 等",
  lang: "zh",
  category: "poetry",
  ageStage: "3-5",
  intro: "鹅、蝉、牛、蜻蜓……诗人把这些小家伙写得比画还好玩。",
  coverArt: "goose-pond",
  coverArtPrompt: "一个中国古代小池塘，一只大白鹅正弯着脖子向水里游去，水面漂着浮萍，岸边有个扎冲天辫的小孩趴着看鹅",
  coverFrom: "#00695C",
  coverTo: "#4DB6AC",
  source: "公版古诗选集，逐字注音",
  chapters: [
    {
      title: "所见 · 袁枚",
      art: "forest-path",
      artPrompt: "古诗《所见》意境插画：牧童骑黄牛，歌声振林樾。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "牧童骑黄牛，歌声振林樾。\n意欲捕鸣蝉，忽然闭口立。",
        pinyin: "mù tóng qí huáng niú， gē shēng zhèn lín yuè。\nyì yù bǔ míng chán， hū rán bì kǒu lì。",
        translation: "牧童骑在黄牛背上，嘹亮的歌声在树林里回荡。他想去捉树上鸣叫的知了，忽然闭上嘴巴，一声不响地站在那里。",
      }
      ],
    },
    {
      title: "池上 · 白居易",
      art: "poetry-moon",
      artPrompt: "古诗《池上》意境插画：小娃撑小艇，偷采白莲回。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "小娃撑小艇，偷采白莲回。\n不解藏踪迹，浮萍一道开。",
        pinyin: "xiǎo wá chēng xiǎo tǐng， tōu cǎi bái lián huí。\nbù jiě cáng zōng jì， fú píng yī dào kāi。",
        translation: "小娃娃撑着一条小船，偷偷采了白莲回来。他不懂得藏起自己的踪迹，船后的浮萍被划开了一道长长的水路。",
      }
      ],
    },
    {
      title: "小儿垂钓 · 胡令能",
      art: "poetry-moon",
      artPrompt: "古诗《小儿垂钓》意境插画：蓬头稚子学垂纶，侧坐莓苔草映身。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "蓬头稚子学垂纶，侧坐莓苔草映身。\n路人借问遥招手，怕得鱼惊不应人。",
        pinyin: "péng tóu zhì zǐ xué chuí lún， cè zuò méi tái cǎo yìng shēn。\nlù rén jiè wèn yáo zhāo shǒu， pà dé yú jīng bù yìng rén。",
        translation: "头发乱蓬蓬的小孩子学着钓鱼，侧身坐在长满青苔的地方，野草把他的身影遮住了。过路人向他问路，他远远地摆摆手，怕惊跑了鱼，不敢回应问话的人。",
      }
      ],
    },
    {
      title: "舟过安仁 · 杨万里",
      art: "river-boat",
      artPrompt: "古诗《舟过安仁》意境插画：一叶渔船两小童，收篙停棹坐船中。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "一叶渔船两小童，收篙停棹坐船中。\n怪生无雨都张伞，不是遮头是使风。",
        pinyin: "yī yè yú chuán liǎng xiǎo tóng， shōu gāo tíng zhào zuò chuán zhōng。\nguài shēng wú yǔ dōu zhāng sǎn， bù shì zhē tóu shì shǐ fēng。",
        translation: "一条小小的渔船上坐着两个小孩子，他们收起竹篙，停下船桨，坐在船里。真奇怪，没有下雨他们怎么都撑开了伞？原来不是为了遮雨，是想用伞借着风力让船走。",
      }
      ],
    },
    {
      title: "宿新市徐公店 · 杨万里",
      art: "poetry-moon",
      artPrompt: "古诗《宿新市徐公店》意境插画：篱落疏疏一径深，树头新绿未成阴。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "篱落疏疏一径深，树头新绿未成阴。\n儿童急走追黄蝶，飞入菜花无处寻。",
        pinyin: "lí luò shū shū yī jìng shēn， shù tóu xīn lǜ wèi chéng yīn。\nér tóng jí zǒu zhuī huáng dié， fēi rù cài huā wú chù xún。",
        translation: "稀稀落落的篱笆旁，一条小路伸向远方，树上的新叶还没长成浓密的树荫。小孩子飞快地跑去追黄色的蝴蝶，蝴蝶飞进金黄的菜花丛里，再也找不到了。",
      }
      ],
    },
    {
      title: "村居 · 高鼎",
      art: "poetry-moon",
      artPrompt: "古诗《村居》意境插画：草长莺飞二月天，拂堤杨柳醉春烟。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "草长莺飞二月天，拂堤杨柳醉春烟。\n儿童散学归来早，忙趁东风放纸鸢。",
        pinyin: "cǎo zhǎng yīng fēi èr yuè tiān， fú dī yáng liǔ zuì chūn yān。\nér tóng sàn xué guī lái zǎo， máng chèn dōng fēng fàng zhǐ yuān。",
        translation: "二月里青草生长、黄莺飞舞，杨柳轻轻拂着堤岸，好像沉醉在春天的烟雾里。孩子们放学回来得早，赶忙趁着东风放起了风筝。",
      }
      ],
    },
    {
      title: "夜书所见（节选） · 叶绍翁",
      art: "poetry-moon",
      artPrompt: "古诗《夜书所见（节选）》意境插画：萧萧梧叶送寒声，江上秋风动客情。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "萧萧梧叶送寒声，江上秋风动客情。\n知有儿童挑促织，夜深篱落一灯明。",
        pinyin: "xiāo xiāo wú yè sòng hán shēng， jiāng shàng qiū fēng dòng kè qíng。\nzhī yǒu ér tóng tiāo cù zhī， yè shēn lí luò yī dēng míng。",
        translation: "梧桐树叶沙沙作响，送来阵阵寒意，江上的秋风让漂泊在外的人想起了家乡。料想是孩子们在捉蟋蟀吧，夜深了，篱笆边还亮着一盏灯。",
      }
      ],
    },
    {
      title: "幼女词 · 施肩吾",
      art: "poetry-moon",
      artPrompt: "古诗《幼女词》意境插画：幼女才六岁，未知巧与拙。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "幼女才六岁，未知巧与拙。\n向夜在堂前，学人拜新月。",
        pinyin: "yòu nǚ cái liù suì， wèi zhī qiǎo yǔ zhuō。\nxiàng yè zài táng qián， xué rén bài xīn yuè。",
        translation: "小女儿才六岁，还分不清什么是灵巧、什么是笨拙。天快黑的时候，她在堂前学着大人的样子，拜起新月来。",
      }
      ],
    },
    {
      title: "与小女 · 韦庄",
      art: "primer-scroll",
      artPrompt: "古诗《与小女》意境插画：见人初解语呕哑，不肯归眠恋小车。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "见人初解语呕哑，不肯归眠恋小车。\n一夜娇啼缘底事，为嫌衣少缕金华。",
        pinyin: "jiàn rén chū jiě yǔ ǒu yǎ， bù kěn guī mián liàn xiǎo chē。\nyī yè jiāo tí yuán dǐ shì， wèi xián yī shǎo lǚ jīn huá。",
        translation: "小女儿刚学会说话，咿咿呀呀地跟着人学，还不肯去睡觉，因为贪恋那辆小玩具车。一整夜娇声啼哭是为什么呢？原来是嫌衣服上少绣了几朵金线花。",
      }
      ],
    },
    {
      title: "夜宿山寺 · 李白",
      art: "poetry-moon",
      artPrompt: "古诗《夜宿山寺》意境插画：危楼高百尺，手可摘星辰。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "危楼高百尺，手可摘星辰。\n不敢高声语，恐惊天上人。",
        pinyin: "wēi lóu gāo bǎi chǐ， shǒu kě zhāi xīng chén。\nbù gǎn gāo shēng yǔ， kǒng jīng tiān shàng rén。",
        translation: "山上寺院的楼非常高，好像有一百尺，站在楼上伸手就能摘到星星。我不敢大声说话，怕惊动了天上的仙人。",
      }
      ],
    },
    {
      title: "溪居即事 · 崔道融",
      art: "river-boat",
      artPrompt: "古诗《溪居即事》意境插画：篱外谁家不系船，春风吹入钓鱼湾。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "篱外谁家不系船，春风吹入钓鱼湾。\n小童疑是有村客，急向柴门去却关。",
        pinyin: "lí wài shuí jiā bù xì chuán， chūn fēng chuī rù diào yú wān。\nxiǎo tóng yí shì yǒu cūn kè， jí xiàng chái mén qù què guān。",
        translation: "篱笆外不知是谁家的小船没有拴住，被春风吹进了钓鱼湾。小孩子以为是村里来了客人，急忙跑向柴门，去把门打开迎接。",
      }
      ],
    }
  ],
  rights: {
    workTitle: "童趣诗选",
    author: "历代诗人",
    authorDeathYear: 1279,
    translator: '桃阅读',
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: "https://github.com/chinese-poetry/chinese-poetry",
    note: "所选诗文作者卒年均逾保护期；注音与白话译文为平台自撰。",
  },
}
