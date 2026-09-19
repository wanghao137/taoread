import type { PackBook } from '../types'

/**
 * 《李白诗选·月亮篇》——李白笔下最适合孩子入门的六首。
 * 底本：通行本《李太白全集》。每首逐字注音 + 童趣白话译文。
 * 公版：李白卒于 762 年，远超保护期。
 */
export const libai: PackBook = {
  id: 'libai-moon',
  title: '李白诗选·月亮篇',
  author: '李白',
  lang: 'zh',
  category: 'poetry',
  ageStage: '3-5',
  intro: '李白最喜欢月亮。小时候他以为月亮是白玉盘，长大后他还把月亮写进诗里，陪了一辈子。',
  coverArt: 'moon-river',
  coverArtPrompt: '一位穿白袍的古代诗人站在江边的小船上，抬头望着天上又大又圆的月亮，江面泛着银色的月光，远处是淡淡的山影',
  coverFrom: '#1A237E',
  coverTo: '#5C6BC0',
  source: '公版古籍（唐·李白）通行本，逐字注音',
  chapters: [
    {
      title: '第一课 · 古朗月行',
      art: 'moon-jade-plate',
      artPrompt: '一个小男孩趴在窗台上，指着天上又圆又亮的月亮，月亮像一只白玉盘嵌在青云之上，仙气飘飘',
      blocks: [
        {
          kind: 'poem',
          text: '小时不识月，呼作白玉盘。又疑瑶台镜，飞在青云端。',
          pinyin: 'xiǎo shí bù shí yuè, hū zuò bái yù pán. yòu yí yáo tái jìng, fēi zài qīng yún duān.',
          translation: '小时候不认识月亮，管它叫「白玉盘」。又觉得它像仙人的镜子，飞在蓝天和白云的上面。',
        },
        {
          kind: 'note',
          text: '「呼作」就是「把它叫作」。「疑」是「觉得好像」的意思。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'moon-jade-plate',
          text: '又圆又亮的月亮挂在云层上方，像一只白玉做成的盘子。',
        },
      ],
    },
    {
      title: '第二课 · 静夜思',
      art: 'moon-window',
      artPrompt: '深夜的木床前，一个穿白袍的诗人低头沉思，月光把地面照得像落了一层白霜，窗外一轮明月正圆',
      blocks: [
        {
          kind: 'poem',
          text: '床前明月光，疑是地上霜。举头望明月，低头思故乡。',
          pinyin: 'chuáng qián míng yuè guāng, yí shì dì shàng shuāng. jǔ tóu wàng míng yuè, dī tóu sī gù xiāng.',
          translation: '床前洒满了明亮的月光，还以为是地上落了一层白霜。抬起头看月亮，低下头，想起了远方的家。',
        },
        {
          kind: 'note',
          text: '这是全世界华人最熟的一首诗。「举头」是抬头，「低头」是垂下头。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第三课 · 月下独酌',
      art: 'moon-drink',
      artPrompt: '盛开的的花丛边，一位白衣诗人独自举杯向天上的月亮致意，月光把他的影子长长地投在地上，月、人、影恰成三个',
      blocks: [
        {
          kind: 'poem',
          text: '花间一壶酒，独酌无相亲。举杯邀明月，对影成三人。',
          pinyin: 'huā jiān yī hú jiǔ, dú zhuó wú xiāng qīn. jǔ bēi yāo míng yuè, duì yǐng chéng sān rén.',
          translation: '花丛边放着一壶酒，一个人喝，没人陪着。举起杯子邀请月亮，月亮、我、还有地上的影子，刚好三个人。',
        },
        {
          kind: 'note',
          text: '「独酌」是一个人喝酒。「邀」是邀请。李白把月亮和影子都当成了朋友。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'moon-drink',
          text: '月光下的花丛边，一个人举着杯子，天上月亮、人、地上的影子凑成三个。',
        },
      ],
    },
    {
      title: '第四课 · 关山月',
      art: 'moon-gate',
      artPrompt: '一轮明月从苍茫的雪山云海间升起，大风掠过无边的旷野，远处古老的玉门关城楼在月色下静静矗立',
      blocks: [
        {
          kind: 'poem',
          text: '明月出天山，苍茫云海间。长风几万里，吹度玉门关。',
          pinyin: 'míng yuè chū tiān shān, cāng máng yún hǎi jiān. cháng fēng jǐ wàn lǐ, chuī dù yù mén guān.',
          translation: '月亮从天山背后升起来，升进无边无际的云海里。大风刮了几万里，一直吹过玉门关。',
        },
        {
          kind: 'note',
          text: '「天山」是一座大山。「苍茫」是又大又远、看不到边的样子。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第五课 · 子夜吴歌',
      art: 'moon-loom',
      artPrompt: '月光笼罩下的长安城，一位女子在院子里举着木槌捶打石板上的衣裳，秋风卷起落叶，远处万家灯火',
      blocks: [
        {
          kind: 'poem',
          text: '长安一片月，万户捣衣声。秋风吹不尽，总是玉关情。',
          pinyin: 'cháng ān yī piàn yuè, wàn hù dǎo yī shēng. qiū fēng chuī bù jìn, zǒng shì yù guān qíng.',
          translation: '月亮照着整个长安城，千家万户都在月光下「砰砰」地捶打衣裳。秋风怎么吹也吹不散，都是对远方亲人的想念。',
        },
        {
          kind: 'note',
          text: '「捣衣」是把织好的布放在石板上用木槌捶软，古时候的人这样做衣服。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第六课 · 峨眉山月歌',
      art: 'moon-river',
      artPrompt: '秋夜峨眉山上半轮明月高悬，月光铺满平静的江面，一只小船载着诗人顺流而下，两岸青山如削',
      blocks: [
        {
          kind: 'poem',
          text: '峨眉山月半轮秋，影入平羌江水流。夜发清溪向三峡，思君不见下渝州。',
          pinyin: 'é méi shān yuè bàn lún qiū, yǐng rù píng qiāng jiāng shuǐ liú. yè fā qīng xī xiàng sān xiá, sī jūn bù jiàn xià yú zhōu.',
          translation: '秋天的夜晚，半个圆月挂在峨眉山上。月亮的影子落进江水里，跟着江水一起流。我连夜坐船出发，想看的人看不见，船一直顺流而下。',
        },
        {
          kind: 'note',
          text: '「半轮」是半个月亮。「夜发」是夜里出发。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'moon-river',
          text: '半圆的月亮悬在山上，月光铺在江面上，一只小船顺流而下。',
        },
      ],
    },
  ],
  rights: {
    workTitle: '李太白全集（选六首）',
    author: '李白',
    authorDeathYear: 762,
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: 'https://zh.wikisource.org/wiki/李太白全集',
    note: '通行本逐字核对；译文为平台自撰童趣白话',
  },
}
