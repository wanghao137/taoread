import type { PackBook } from '../types'

/**
 * 《增广贤文》节选（蒙学）。
 * 底本：通行本（明代佚名所编，清代重订）。全篇辑录古人的格言俗语，
 * 此处选儿童能理解的「交友、惜时、勤学」一类句子，每句配白话与注释。
 * 公版：编者无确切姓名，成书于明代，远超保护期。
 */
export const zengGuang: PackBook = {
  id: 'zengguang-friends',
  title: '增广贤文·交友篇',
  author: '佚名（明）',
  lang: 'zh',
  category: 'primer',
  ageStage: '3-5',
  intro: '古人把一句句聪明话编成一本书，教小朋友怎么交朋友、怎么爱惜时间。念一念，心里就亮堂了。',
  coverArt: 'friendship-scroll',
  coverArtPrompt: '两个扎小髻的古代孩子坐在石凳上一起看书，旁边是一棵大柳树，树下有两个小书箱，阳光穿过柳叶洒下来',
  coverFrom: '#FFE0B2',
  coverTo: '#FFB74D',
  source: '公版古籍（明·佚名）节选，逐字注音',
  chapters: [
    {
      title: '第一课 · 近朱者赤',
      art: 'friends-ink',
      artPrompt: '两个古代孩子伏在同一张书桌上写字，一个孩子面前摊着红纸，另一个孩子手指上沾着黑墨汁，相视而笑',
      blocks: [
        {
          kind: 'poem',
          text: '近朱者赤，近墨者黑。',
          pinyin: 'jìn zhū zhě chì, jìn mò zhě hēi.',
          translation: '常常靠近红色的东西，自己也会染成红色；常常靠近黑色的东西，自己也会变黑。',
        },
        {
          kind: 'note',
          text: '「朱」是红色，「赤」也是红色。「墨」是写字用的黑墨水。这句话是告诉我们：多跟好孩子一起玩，自己也会变好。',
          art: 'friends-ink',
        },
        {
          kind: 'image',
          art: 'friends-ink',
          text: '两个孩子一起写字，一个在看红色的纸，一个手上沾了墨汁。',
        },
      ],
    },
    {
      title: '第二课 · 一寸光阴',
      art: 'sundial',
      artPrompt: '院子里的石盘日晷上，太阳的影子斜斜地指着刻度，一个孩子蹲在旁边认真看，墙角一株小桃花开了',
      blocks: [
        {
          kind: 'poem',
          text: '一寸光阴一寸金，寸金难买寸光阴。',
          pinyin: 'yī cùn guāng yīn yī cùn jīn, cùn jīn nán mǎi cùn guāng yīn.',
          translation: '一小段时间，就像一小块金子那样宝贵。可金子能买好多东西，却买不来哪怕一小段时间。',
        },
        {
          kind: 'poem',
          text: '少壮不努力，老大徒伤悲。',
          pinyin: 'shào zhuàng bù nǔ lì, lǎo dà tú shāng bēi.',
          translation: '小时候要是不用功，等长大了明白过来，就只能伤心后悔啦。',
        },
        {
          kind: 'note',
          text: '「光阴」就是时间。古人用太阳照在石盘上的影子来计时，影子移动一寸，就是「一寸光阴」。「徒」是白白地、只能。时间过去了，就再也回不来啦。',
          art: 'sundial',
        },
      ],
    },
    {
      title: '第三课 · 路遥知马力',
      art: 'horse-road',
      artPrompt: '一匹枣红色小马沿着长长的土路跑向远方，路上留下一串浅浅的蹄印，路旁几棵老树，夕阳把影子拉得很长',
      blocks: [
        {
          kind: 'poem',
          text: '路遥知马力，日久见人心。',
          pinyin: 'lù yáo zhī mǎ lì, rì jiǔ jiàn rén xīn.',
          translation: '路走远了，才知道马的力气大不大；日子久了，才看得清一个人的心好不好。',
        },
        {
          kind: 'note',
          text: '「遥」是遥远。「马力」是马的力气。真正的好朋友，要在一起待久了，才能看得出来。',
          art: 'horse-road',
        },
        {
          kind: 'image',
          art: 'horse-road',
          text: '一匹小马沿着长长的路跑向远方，路上留下浅浅的脚印。',
        },
      ],
    },
    {
      title: '第四课 · 良药苦口',
      art: 'medicine-bowl',
      artPrompt: '一只冒着热气的黑药碗旁，一个孩子皱着小脸喝药，妈妈在旁边轻轻拍他的背，桌上放着几味草药',
      blocks: [
        {
          kind: 'poem',
          text: '良药苦口利于病，忠言逆耳利于行。',
          pinyin: 'liáng yào kǔ kǒu lì yú bìng, zhōng yán nì ěr lì yú xíng.',
          translation: '治病的药喝起来苦苦的，却能治好病；别人提醒你的话，听起来不顺耳，却能帮你做得更好。',
        },
        {
          kind: 'poem',
          text: '但行好事，莫问前程。',
          pinyin: 'dàn xíng hǎo shì, mò wèn qián chéng.',
          translation: '只管做好事、帮别人，不用老想着以后会得到什么回报。',
        },
        {
          kind: 'note',
          text: '「良药」是好药。「逆耳」是听起来让耳朵不舒服。「但」是只管、只管去做的意思。爸爸妈妈批评你的时候，说的正是这种有用的话。',
          art: 'medicine-bowl',
        },
      ],
    },
    {
      title: '第五课 · 远亲不如近邻',
      art: 'neighbor-help',
      artPrompt: '小巷里一位邻居阿姨端着一碗热粥递给门口的小女孩，小女孩踮脚接过，巷口阳光明亮，晾着花衣裳',
      blocks: [
        {
          kind: 'poem',
          text: '远水难救近火，远亲不如近邻。',
          pinyin: 'yuǎn shuǐ nán jiù jìn huǒ, yuǎn qīn bù rú jìn lín.',
          translation: '着火的时候，老远的水救不了眼前的火；有急事的时候，住得近的邻居，比远方的亲戚还顶用。',
        },
        {
          kind: 'poem',
          text: '与君一席话，胜读十年书。',
          pinyin: 'yǔ jūn yī xí huà, shèng dú shí nián shū.',
          translation: '和聪明人聊一会儿天，比一个人读十年书收获还大。',
        },
        {
          kind: 'note',
          text: '「近邻」就是住在家门口的邻居。「席」是古人坐的草席。这两句都告诉我们：身边的人，常常是最能帮到我们的。',
          art: 'neighbor-help',
        },
      ],
    },
  ],
  rights: {
    workTitle: '增广贤文（节选：交友、惜时、勤学）',
    author: '佚名（明）',
    authorDeathYear: 1644,
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: 'https://zh.wikisource.org/wiki/增廣賢文',
    note: '明代蒙学读物，编者无确切姓名，成书年代远超伯尔尼公约保护期；此处为通行本节选，自校注音与白话翻译。',
  },
}
