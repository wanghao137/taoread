import type { PackBook } from '../types'

/**
 * 《四季诗选》——由 scripts/gen-corpus.mjs 从公版语料生成（2026-09-20 全面补全）。
 * 底本：四季诗选（历代诗人）。逐字来自语料数据集，译文为平台自撰白话。
 * 所选诗文作者卒年均逾保护期；注音与白话译文为平台自撰。
 */
export const poetryScenery: PackBook = {
  id: "poetry-scenery",
  title: "四季诗选",
  author: "贺知章 / 苏轼 / 杨万里 等",
  lang: "zh",
  category: "poetry",
  ageStage: "6-8",
  intro: "春夏秋冬各有一首主题曲：春风放胆来梳柳，夜雨瞒人去润花。",
  coverArt: "scenery-night",
  coverArtPrompt: "一幅中国山水小景：远处层层霜林，一叶小舟泊在平静的江面上，夜空挂着一弯月亮和满天星星，岸边几枝梅花悄悄开放，水彩绘本风格",
  coverFrom: "#C15F3C",
  coverTo: "#EBCFA8",
  source: "公版古诗选集，通行本逐字注音",
  chapters: [
    {
      title: "咏柳 · 贺知章",
      art: 'poetry-scenery:ch1',
      artPrompt: "古诗《咏柳》意境插画：碧玉妆成一树高，万条垂下绿丝绦。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "碧玉妆成一树高，万条垂下绿丝绦。\n不知细叶谁裁出，二月春风似剪刀。",
        pinyin: "bì yù zhuāng chéng yī shù gāo， wàn tiáo chuí xià lǜ sī tāo。\nbù zhī xì yè shuí cái chū， èr yuè chūn fēng sì jiǎn dāo。",
        translation: "高高的柳树像用碧玉装扮而成的，千万条柳枝垂下来，像绿色的丝带。不知道这细细的叶子是谁裁剪出来的，原来二月的春风就像一把剪刀。",
      }
      ],
    },
    {
      title: "大林寺桃花 · 白居易",
      art: 'poetry-scenery:ch2',
      artPrompt: "古诗《大林寺桃花》意境插画：人间四月芳菲尽，山寺桃花始盛开。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "人间四月芳菲尽，山寺桃花始盛开。\n长恨春归无觅处，不知转入此中来。",
        pinyin: "rén jiān sì yuè fāng fēi jìn， shān sì táo huā shǐ shèng kāi。\ncháng hèn chūn guī wú mì chù， bù zhī zhuǎn rù cǐ zhōng lái。",
        translation: "四月里山下的花都凋谢了，高山寺院的桃花才刚刚盛开。我常常惋惜春天走了找不回来，却不知道它已经转到这山里来了。",
      }
      ],
    },
    {
      title: "小池 · 杨万里",
      art: 'poetry-scenery:ch3',
      artPrompt: "古诗《小池》意境插画：泉眼无声惜细流，树阴照水爱晴柔。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "泉眼无声惜细流，树阴照水爱晴柔。\n小荷才露尖尖角，早有蜻蜓立上头。",
        pinyin: "quán yǎn wú shēng xī xì liú， shù yīn zhào shuǐ ài qíng róu。\nxiǎo hé cái lù jiān jiān jiǎo， zǎo yǒu qīng tíng lì shàng tóu。",
        translation: "泉眼悄悄地流出细细的水，好像很舍不得；树荫映在水面上，好像喜爱这晴天的柔和。小荷叶刚露出尖尖的角，早就有一只蜻蜓立在上面了。",
      }
      ],
    },
    {
      title: "晓出净慈寺送林子方 · 杨万里",
      art: 'poetry-scenery:ch4',
      artPrompt: "古诗《晓出净慈寺送林子方》意境插画：毕竟西湖六月中，风光不与四时同。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "毕竟西湖六月中，风光不与四时同。\n接天莲叶无穷碧，映日荷花别样红。",
        pinyin: "bì jìng xī hú liù yuè zhōng， fēng guāng bù yǔ sì shí tóng。\njiē tiān lián yè wú qióng bì， yìng rì hé huā bié yàng hóng。",
        translation: "六月里的西湖，风光和其他季节都不一样。莲叶一直铺到天边，绿得望不到头；荷花映着太阳，红得格外好看。",
      }
      ],
    },
    {
      title: "山行 · 杜牧",
      art: 'poetry-scenery:ch5',
      artPrompt: "古诗《山行》意境插画：远上寒山石径斜，白云生处有人家。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "远上寒山石径斜，白云生处有人家。\n停车坐爱枫林晚，霜叶红于二月花。",
        pinyin: "yuǎn shàng hán shān shí jìng xié， bái yún shēng chù yǒu rén jiā。\ntíng chē zuò ài fēng lín wǎn， shuāng yè hóng yú èr yuè huā。",
        translation: "沿着弯弯的石头小路，远远地走上寒气袭人的深山，白云升起的地方还有人家。我停下车来不走了，是因为喜爱傍晚的枫树林，经霜的枫叶比二月的花还要红。",
      }
      ],
    },
    {
      title: "赠刘景文 · 苏轼",
      art: 'poetry-scenery:ch6',
      artPrompt: "古诗《赠刘景文》意境插画：荷尽已无擎雨盖，菊残犹有傲霜枝。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "荷尽已无擎雨盖，菊残犹有傲霜枝。\n一年好景君须记，最是橙黄橘绿时。",
        pinyin: "hé jìn yǐ wú qíng yǔ gài， jú cán yóu yǒu ào shuāng zhī。\nyī nián hǎo jǐng jūn xū jì， zuì shì chéng huáng jú lǜ shí。",
        translation: "荷花凋谢了，再没有像大伞一样挡雨的荷叶；菊花枯萎了，却还留着不怕霜冻的枝条。一年中最好的景致你要记住，那正是橙子金黄、橘子还绿的时节。",
      }
      ],
    },
    {
      title: "梅花 · 王安石",
      art: 'poetry-scenery:ch7',
      artPrompt: "古诗《梅花》意境插画：墙角数枝梅，凌寒独自开。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "墙角数枝梅，凌寒独自开。\n遥知不是雪，为有暗香来。",
        pinyin: "qiáng jiǎo shù zhī méi， líng hán dú zì kāi。\nyáo zhī bù shì xuě， wèi yǒu àn xiāng lái。",
        translation: "墙角有几枝梅花，冒着严寒独自开放。远远望去就知道那不是雪，因为有淡淡的清香飘过来。",
      }
      ],
    },
    {
      title: "别董大 · 高适",
      art: 'poetry-scenery:ch8',
      artPrompt: "古诗《别董大》意境插画：千里黄云白日曛，北风吹雁雪纷纷。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "千里黄云白日曛，北风吹雁雪纷纷。\n莫愁前路无知己，天下谁人不识君。",
        pinyin: "qiān lǐ huáng yún bái rì xūn， běi fēng chuī yàn xuě fēn fēn。\nmò chóu qián lù wú zhī jǐ， tiān xià shuí rén bù shí jūn。",
        translation: "千里黄云遮住天空，太阳昏昏暗暗，北风吹着大雁，大雪纷纷扬扬。不要担心前面的路上遇不到知心朋友，天下有谁不认识你呢？",
      }
      ],
    },
    {
      title: "春日 · 朱熹",
      art: 'poetry-scenery:ch9',
      artPrompt: "古诗《春日》意境插画：胜日寻芳泗水滨，无边光景一时新。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "胜日寻芳泗水滨，无边光景一时新。\n等闲识得东风面，万紫千红总是春。",
        pinyin: "shèng rì xún fāng sì shuǐ bīn， wú biān guāng jǐng yī shí xīn。\nděng xián shí dé dōng fēng miàn， wàn zǐ qiān hóng zǒng shì chūn。",
        translation: "风和日丽的好日子，我到水边去寻找美景，眼前的风光一下子焕然一新。随随便便就能认出春风的面孔，这万紫千红，到处都是春天。",
      }
      ],
    },
    {
      title: "六月二十七日望湖楼醉书 · 苏轼",
      art: 'poetry-scenery:ch10',
      artPrompt: "古诗《六月二十七日望湖楼醉书》意境插画：黑云翻墨未遮山，白雨跳珠乱入船。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "黑云翻墨未遮山，白雨跳珠乱入船。\n卷地风来忽吹散，望湖楼下水如天。",
        pinyin: "hēi yún fān mò wèi zhē shān， bái yǔ tiào zhū luàn rù chuán。\njuàn dì fēng lái hū chuī sàn， wàng hú lóu xià shuǐ rú tiān。",
        translation: "黑云像打翻的墨汁一样涌上来，还没遮住山，白亮的雨点就像跳动的珍珠，乱蹦乱跳地打进船里。一阵大风卷地而来，忽然把乌云吹散了，望湖楼下的湖水平静得像天空一样。",
      }
      ],
    },
    {
      title: "秋夕 · 杜牧",
      art: 'poetry-scenery:ch11',
      artPrompt: "古诗《秋夕》意境插画：银烛秋光冷画屏，轻罗小扇扑流萤。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "银烛秋光冷画屏，轻罗小扇扑流萤。\n天阶夜色凉如水，坐看牵牛织女星。",
        pinyin: "yín zhú qiū guāng lěng huà píng， qīng luó xiǎo shàn pū liú yíng。\ntiān jiē yè sè liáng rú shuǐ， zuò kàn qiān niú zhī nǚ xīng。",
        translation: "秋夜里，烛光照着画屏，透着淡淡的凉意；我拿着小小的丝扇，扑打飞来飞去的萤火虫。夜色凉凉的像水一样，我坐着仰望天上的牵牛星和织女星。",
      }
      ],
    },
    {
      title: "雪梅 · 卢梅坡",
      art: 'poetry-scenery:ch12',
      artPrompt: "古诗《雪梅》意境插画：梅雪争春未肯降，骚人阁笔费评章。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "梅雪争春未肯降，骚人阁笔费评章。\n梅须逊雪三分白，雪却输梅一段香。",
        pinyin: "méi xuě zhēng chūn wèi kěn jiàng， sāo rén gé bǐ fèi píng zhāng。\nméi xū xùn xuě sān fēn bái， xuě què shū méi yī duàn xiāng。",
        translation: "梅花和雪花争着报春，谁也不肯认输，诗人放下笔，很难评判它们的高下。梅花比雪花少了三分洁白，雪花却输给梅花一段清香。",
      }
      ],
    }
  ],
  rights: {
    workTitle: "四季诗选",
    author: "历代诗人",
    authorDeathYear: 1279,
    translator: '桃阅读',
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: "https://github.com/chinese-poetry/chinese-poetry",
    note: "所选诗文作者卒年均逾保护期；注音与白话译文为平台自撰。",
  },
}
