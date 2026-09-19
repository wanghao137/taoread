import type { PackBook } from '../types'

/**
 * 《百家姓》节选（蒙学）。
 * 底本：通行本（相传为宋初钱塘一老儒所编）。全篇罗列姓氏，此处选最开头的常见姓。
 * 百家姓正文是无意义的姓氏罗列，孩子不易读懂，故每课都用 note 块讲一个姓氏小故事。
 * 公版：编者无确切姓名，成书于宋代，远超保护期。
 */
export const baiJiaXing: PackBook = {
  id: 'baijiaxing-zhao',
  title: '百家姓·赵钱孙李',
  author: '佚名（宋）',
  lang: 'zh',
  category: 'primer',
  ageStage: '3-5',
  intro: '古人把姓氏编成小韵文，读着读着就记住了。每个姓背后都藏着有趣的故事，我们一边念，一边听故事。',
  coverArt: 'surnames-family-scroll',
  coverArtPrompt: '一卷古朴的竹简展开，上面写着「赵钱孙李」几个字，旁边有一棵大榕树和一座小桥，远处是江南的粉墙黛瓦',
  coverFrom: '#FFE0B2',
  coverTo: '#FFB74D',
  source: '公版古籍（宋·佚名）节选，逐字注音',
  chapters: [
    {
      title: '第一课 · 赵钱孙李',
      art: 'surnames-family-scroll',
      artPrompt: '一卷古朴竹简在书桌上缓缓展开，上面写着「赵钱孙李」，窗外大榕树下孩子们追逐玩耍，江南粉墙黛瓦',
      blocks: [
        {
          kind: 'poem',
          text: '赵钱孙李，周吴郑王。',
          pinyin: 'zhào qián sūn lǐ, zhōu wú zhèng wáng.',
          translation: '这是四个最常见的姓：赵、钱、孙、李；还有周、吴、郑、王。',
        },
        {
          kind: 'poem',
          text: '冯陈褚卫，蒋沈韩杨。',
          pinyin: 'féng chén chǔ wèi, jiǎng shěn hán yáng.',
          translation: '还有这些姓：冯、陈、褚、卫；蒋、沈、韩、杨。',
        },
        {
          kind: 'note',
          text: '「赵」为什么排在第一？因为写这本书的时候是宋朝，宋朝的皇帝就姓赵。「钱」排在第二，是因为有位钱姓的国王，把杭州治理得很好，老百姓都喜欢他。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'king-rice',
          text: '一位戴着皇冠的国王，把一袋稻谷分给百姓。',
        },
      ],
    },
    {
      title: '第二课 · 朱秦尤许',
      art: 'plum-pear',
      artPrompt: '古代堂屋里，小孔融踮着脚从一筐梨里挑了最小的一个，哥哥在旁边笑着看他，案上摆着文房四宝',
      blocks: [
        {
          kind: 'poem',
          text: '朱秦尤许，何吕施张。',
          pinyin: 'zhū qín yóu xǔ, hé lǚ shī zhāng.',
          translation: '这一句的姓是：朱、秦、尤、许；何、吕、施、张。',
        },
        {
          kind: 'poem',
          text: '孔曹严华，金魏陶姜。',
          pinyin: 'kǒng cáo yán huà, jīn wèi táo jiāng.',
          translation: '还有这些姓：孔、曹、严、华；金、魏、陶、姜。',
        },
        {
          kind: 'note',
          text: '姓「孔」的最有名的人，是孔老夫子。他小时候可懂事了——客人送来一筐梨，哥哥让他先挑，他专挑最小的一个，说：「我年纪小，吃小的就够了。」这就是「孔融让梨」的故事。',
          art: 'plum-pear',
        },
      ],
    },
    {
      title: '第三课 · 戚谢邹喻',
      art: 'river-fish',
      artPrompt: '春天的西湖边，苏东坡卷着裤腿和百姓一起挖泥修堤，湖面上桃花瓣漂了一片，远处青山如黛',
      blocks: [
        {
          kind: 'poem',
          text: '戚谢邹喻，柏水窦章。',
          pinyin: 'qī xiè zōu yù, bǎi shuǐ dòu zhāng.',
          translation: '这一句的姓是：戚、谢、邹、喻；柏、水、窦、章。',
        },
        {
          kind: 'poem',
          text: '云苏潘葛，奚范彭郎。',
          pinyin: 'yún sū pān gě, xī fàn péng láng.',
          translation: '还有这些姓：云、苏、潘、葛；奚、范、彭、郎。',
        },
        {
          kind: 'note',
          text: '姓「苏」的名人有位苏东坡，是个又聪明又贪吃的大诗人。他被派到杭州做官，带着大家把西湖挖深，用挖出来的泥修了一条长长的堤，后人就叫它「苏堤」。',
          art: 'river-fish',
        },
      ],
    },
    {
      title: '第四课 · 鲁韦昌马',
      art: 'horse-meadow',
      artPrompt: '草地上一位工匠拿着刨子专心刨木头，身边散落着锯子和墨斗，一匹骏马在远处悠闲吃草',
      blocks: [
        {
          kind: 'poem',
          text: '鲁韦昌马，苗凤花方。',
          pinyin: 'lǔ wéi chāng mǎ, miáo fèng huā fāng.',
          translation: '这一句的姓是：鲁、韦、昌、马；苗、凤、花、方。',
        },
        {
          kind: 'poem',
          text: '俞任袁柳，酆鲍史唐。',
          pinyin: 'yú rèn yuán liǔ, fēng bào shǐ táng.',
          translation: '还有这些姓：俞、任、袁、柳；酆、鲍、史、唐。',
        },
        {
          kind: 'note',
          text: '「鲁」这个姓，和春秋时候的鲁国有关。鲁国有一位大圣人孔老夫子，还有一位巧匠叫鲁班，他做木工特别厉害，是木匠的祖师爷。',
          art: 'horse-meadow',
        },
      ],
    },
    {
      title: '第五课 · 费廉岑薛',
      art: 'thunder-field',
      artPrompt: '夏日雷阵雨中，两个古代书生共撑一把油纸伞在田埂上说笑，远处天空滚过隐隐雷声，稻田青青',
      blocks: [
        {
          kind: 'poem',
          text: '费廉岑薛，雷贺倪汤。',
          pinyin: 'fèi lián cén xuē, léi hè ní tāng.',
          translation: '最后这一句的姓是：费、廉、岑、薛；雷、贺、倪、汤。',
        },
        {
          kind: 'note',
          text: '「雷」这个姓真响亮，像打雷一样！古代有个叫雷义的读书人，做了官却把位子让给好朋友陈重，陈重也处处想着雷义。两人好得像亲兄弟，大家说他们「像胶和漆一样黏在一起」，叫「胶漆之交」。',
          art: 'thunder-field',
        },
        {
          kind: 'image',
          art: 'thunder-field',
          text: '两个古代书生撑着一把伞，在雨里说笑。',
        },
      ],
    },
  ],
  rights: {
    workTitle: '百家姓（节选：赵钱孙李开篇）',
    author: '佚名（宋）',
    authorDeathYear: 1100,
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: 'https://zh.wikisource.org/wiki/百家姓',
    note: '相传为宋初钱塘老儒所编，成书于宋代，远超伯尔尼公约保护期；此处为通行本节选，姓氏小故事为平台自撰童趣白话。',
  },
}
