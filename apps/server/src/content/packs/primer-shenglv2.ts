import type { PackBook } from '../types'

/**
 * 《声律启蒙·二冬三江》——清代车万育《声律启蒙》「二冬」「三江」各一节。
 * 底本：通行本逐字核对（车万育，1632—1705，公版）。
 * 每章：原文注音 + 白话讲解 + image + 亲子对对子玩法 note。
 */
export const shenglvJiang: PackBook = {
  id: 'primer-shenglv2',
  title: '声律启蒙·二冬三江',
  author: '车万育（清）',
  lang: 'zh',
  category: 'primer',
  ageStage: '6-8',
  intro: '春对夏，秋对冬；奇对偶，只对双。跟着节拍念起来，嘴巴像在唱歌，心里像在画画。',
  coverArt: 'seasons-rhythm',
  coverArtPrompt: '四个角分别画着春花、夏荷、秋叶、冬雪，中间一个孩子开心地敲着小鼓，节奏欢快，水彩绘本风',
  coverFrom: '#00695C',
  coverTo: '#E0F2F1',
  source: '《声律启蒙》通行本（车万育，卒 1705），公版',
  chapters: [
    {
      title: '第一节 · 春对夏，秋对冬（二冬）',
      art: 'spring-summer-drum',
      artPrompt: '春天桃花和夏天荷花、秋天枫叶和冬天雪花两两相对，中间一座古寺的晨钟和暮鼓，紫燕衔泥、黄蜂采蜜，色彩明丽',
      blocks: [
        {
          kind: 'poem',
          text: '春对夏，秋对冬，暮鼓对晨钟。观山对玩水，绿竹对苍松。冯妇虎，叶公龙，舞蝶对鸣蛩。衔泥双紫燕，课蜜几黄蜂。春日园中莺恰恰，秋天塞外雁雍雍。秦岭云横，迢递八千远路；巫山雨洗，嵯峨十二危峰。',
          pinyin: 'chūn duì xià, qiū duì dōng, mù gǔ duì chén zhōng. guān shān duì wán shuǐ, lǜ zhú duì cāng sōng. féng fù hǔ, yè gōng lóng, wǔ dié duì míng qióng. xián ní shuāng zǐ yàn, kè mì jǐ huáng fēng. chūn rì yuán zhōng yīng qià qià, qiū tiān sài wài yàn yōng yōng. qín lǐng yún héng, tiáo dì bā qiān yuǎn lù; wū shān yǔ xǐ, cuó é shí èr wēi fēng.',
          translation: '春对夏，秋对冬，傍晚的鼓对清晨的钟。看山对玩水，绿竹对苍松。冯妇敢打虎，叶公偏说爱龙，飞舞的蝴蝶对鸣叫的秋虫。两只紫燕衔着泥筑巢，几只黄蜂忙着采花蜜。春日园子里黄莺叫个不停，秋天边塞外大雁应和着鸣叫。秦岭上云海连绵，迢迢八千里的长路；巫山被雨洗过，高高低低十二座险峰。',
        },
        {
          kind: 'note',
          text: '【怎么读】两个字一组地拍手读：春对——夏，秋对——冬！读到「恰恰」「雍雍」的时候，声音也跟着跳一跳。【亲子小玩法】你出「春」，爸爸妈妈对「夏」；你出「鼓」，他们对「钟」。再试试难的：你出「燕子」，他们对什么？「蜜蜂」「蝴蝶」「黄莺」都行，只要会飞，就算对上啦。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'spring-summer-drum',
          text: '春夏秋冬、鼓和钟，全都能配成对。',
        },
      ],
    },
    {
      title: '第二节 · 奇对偶，只对双（三江）',
      art: 'sea-river-odd-even',
      artPrompt: '一半是大海翻涌的浪花，一半是长江上行驶的帆船，金盘玉盏摆在岸边的桌上，远处一只凤凰拉着仙人飞过楼台，气韵生动',
      blocks: [
        {
          kind: 'poem',
          text: '奇对偶，只对双，大海对长江。金盘对玉盏，宝烛对银釭。朱漆槛，碧纱窗，舞调对歌腔。兴汉推马武，谏夏著龙逄。四收列国群王伏，三筑高城众敌降。跨凤登台，潇洒仙姬秦弄玉；斩蛇当道，英雄天子汉刘邦。',
          pinyin: 'qí duì ǒu, zhǐ duì shuāng, dà hǎi duì cháng jiāng. jīn pán duì yù zhǎn, bǎo zhú duì yín gāng. zhū qī jiàn, bì shā chuāng, wǔ diào duì gē qiāng. xīng hàn tuī mǎ wǔ, jiàn xià zhù lóng páng. sì shōu liè guó qún wáng fú, sān zhù gāo chéng zhòng dí xiáng. kuà fèng dēng tái, xiāo sǎ xiān jī qín nòng yù; zhǎn shé dāng dào, yīng xióng tiān zǐ hàn liú bāng.',
          translation: '单数对双数，一个对一对，大海对长江。金盘子对玉杯盏，宝烛对银灯。红漆的栏杆对绿纱的窗户，舞曲对歌谣。帮助汉朝兴起的要推马武，冒死劝谏夏王的有关龙逄。四面收服列国，各国君王都归伏；三面筑起高城，众多敌人都投降。跨上凤凰登上高台，潇洒自在的仙女秦弄玉；当道斩杀大蛇，英雄的天子汉刘邦。',
        },
        {
          kind: 'note',
          text: '【字词小知识】「奇」读 qí，是单数；「偶」是双数。「只」是一只，「双」是一对。「釭」读 gāng，是古代的灯。后面藏着两个故事：秦弄玉是传说中骑着凤凰飞走的仙女；汉刘邦年轻时在路上斩了一条大白蛇，后来成了开国皇帝。【亲子小玩法】考考你：一个苹果对几个苹果？一只袜子对什么？对了，袜子、鞋子、筷子都是成双成对的好朋友！',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'sea-river-odd-even',
          text: '大海对长江，一只对一双，世界都配成了对。',
        },
      ],
    },
  ],
  rights: {
    workTitle: '声律启蒙·二冬三江（各一节）',
    author: '车万育（1632—1705）',
    authorDeathYear: 1705,
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: 'https://zh.wikisource.org/wiki/聲律啟蒙',
    note: '作者卒年 1705，公版；通行本逐字核对，讲解与亲子游戏文案由平台撰写',
  },
}
