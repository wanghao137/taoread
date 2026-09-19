import type { PackBook } from '../types'

/**
 * 《弟子规·总叙与入则孝》——蒙学经典，教孩子日常礼节与孝道。
 * 底本：通行本（李毓秀 撰，清）。公版：李毓秀卒于 1760 年。
 * 选「总叙」与「入则孝」前半，内容最贴近幼儿生活。
 */
export const diZiGui: PackBook = {
  id: 'dizigui-xiao',
  title: '弟子规·入则孝',
  author: '李毓秀',
  lang: 'zh',
  category: 'primer',
  ageStage: '3-5',
  intro: '古代小朋友的「生活手册」：爸爸妈妈叫你的时候该怎么做？东西用完了放哪儿？都在这本书里。',
  coverArt: 'filial-children-scroll',
  coverArtPrompt: '古代学堂里，一位老先生拿着书卷，几个扎小髻的孩子坐在蒲团上跟着念，窗外有竹子和梅花',
  coverFrom: '#FFE0B2',
  coverTo: '#FFB74D',
  source: '公版古籍（清·李毓秀）节选，逐字注音',
  chapters: [
    {
      title: '第一课 · 总叙',
      art: 'filial-children-scroll',
      artPrompt: '古代学堂里，一位白胡子老先生拿着书卷领读，几个扎小髻的孩子坐在蒲团上跟着念，窗外竹影摇曳、梅花初绽',
      blocks: [
        {
          kind: 'poem',
          text: '弟子规，圣人训。首孝弟，次谨信。',
          pinyin: 'dì zǐ guī, shèng rén xùn. shǒu xiào tì, cì jǐn xìn.',
          translation: '《弟子规》是照着孔老夫子的话编的。最重要的，是孝敬父母、友爱兄弟姐妹；然后是做事小心、说话算话。',
        },
        {
          kind: 'poem',
          text: '泛爱众，而亲仁。有余力，则学文。',
          pinyin: 'fàn ài zhòng, ér qīn rén. yǒu yú lì, zé xué wén.',
          translation: '要爱身边的每一个人，多跟好孩子交朋友。做完这些如果还有力气，就再来读书学本领。',
        },
        {
          kind: 'note',
          text: '「弟子」是学生、徒弟。「学文」是读书学习。「余力」是剩下的力气。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'filial-children-scroll',
          text: '学堂里，老先生带着孩子们念书。',
        },
      ],
    },
    {
      title: '第二课 · 父母呼',
      art: 'mother-call',
      artPrompt: '古代庭院里，妈妈在廊下叫孩子，一个小男孩放下手中的玩具转身响亮地答应，屋檐下挂着红灯笼',
      blocks: [
        {
          kind: 'poem',
          text: '父母呼，应勿缓。父母命，行勿懒。',
          pinyin: 'fù mǔ hū, yìng wù huǎn. fù mǔ mìng, xíng wù lǎn.',
          translation: '爸爸妈妈叫你，要马上答应，别拖着。爸爸妈妈让你做事，要马上去做，别偷懒。',
        },
        {
          kind: 'poem',
          text: '父母教，须敬听。父母责，须顺承。',
          pinyin: 'fù mǔ jiào, xū jìng tīng. fù mǔ zé, xū shùn chéng.',
          translation: '爸爸妈妈教导你，要恭恭敬敬地听。爸爸妈妈批评你，要乖乖地接受。',
        },
        {
          kind: 'note',
          text: '「勿」是不要。「缓」是慢吞吞。「顺承」是顺从地接受。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第三课 · 冬则温',
      art: 'warm-quilt',
      artPrompt: '冬夜的卧房里，一个孩子蹲在床边用身子暖着被窝，窗外飘着细雪花，妈妈在一旁慈爱地微笑',
      blocks: [
        {
          kind: 'poem',
          text: '冬则温，夏则凊。晨则省，昏则定。',
          pinyin: 'dōng zé wēn, xià zé qìng. chén zé xǐng, hūn zé dìng.',
          translation: '冬天冷了，要先帮爸爸妈妈把被窝暖热；夏天热了，要把床扇凉。早上起来要问安，晚上睡前要道晚安。',
        },
        {
          kind: 'poem',
          text: '出必告，反必面。居有常，业无变。',
          pinyin: 'chū bì gào, fǎn bì miàn. jū yǒu cháng, yè wú biàn.',
          translation: '出门前一定要告诉大人一声，回来了一定要先见个面。住的地方要固定，做的事不要变来变去。',
        },
        {
          kind: 'note',
          text: '「凊」读 qìng，是让东西变凉快。「省」读 xǐng，是问候、探望。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'warm-quilt',
          text: '一个孩子正在帮妈妈暖被窝，窗外飘着雪花。',
        },
      ],
    },
    {
      title: '第四课 · 事虽小',
      art: 'small-things',
      artPrompt: '一个孩子把捡到的小玩意儿双手捧着交给妈妈，桌上摆着小竹筐，午后的阳光从木窗格照进来',
      blocks: [
        {
          kind: 'poem',
          text: '事虽小，勿擅为。苟擅为，子道亏。',
          pinyin: 'shì suī xiǎo, wù shàn wéi. gǒu shàn wéi, zǐ dào kuī.',
          translation: '事情虽然小，也不能自己随便做主。要是随便做了，做孩子的本分就亏了。',
        },
        {
          kind: 'poem',
          text: '物虽小，勿私藏。苟私藏，亲心伤。',
          pinyin: 'wù suī xiǎo, wù sī cáng. gǒu sī cáng, qīn xīn shāng.',
          translation: '东西虽然小，也不能偷偷藏起来自己要。要是偷偷藏了，爸爸妈妈会伤心的。',
        },
        {
          kind: 'note',
          text: '「擅」是擅自、自己随便来。「私藏」是偷偷藏起来。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第五课 · 亲所好',
      art: 'parents-joy',
      artPrompt: '一个孩子端着一碗热汤小心地走向爸爸妈妈，父母笑着伸手接过，屋里暖意融融，水汽袅袅',
      blocks: [
        {
          kind: 'poem',
          text: '亲所好，力为具。亲所恶，谨为去。',
          pinyin: 'qīn suǒ hào, lì wèi jù. qīn suǒ wù, jǐn wèi qù.',
          translation: '爸爸妈妈喜欢的，努力给他们准备好。爸爸妈妈不喜欢的，小心地替他们拿走、改掉。',
        },
        {
          kind: 'poem',
          text: '身有伤，贻亲忧。德有伤，贻亲羞。',
          pinyin: 'shēn yǒu shāng, yí qīn yōu. dé yǒu shāng, yí qīn xiū.',
          translation: '身体受了伤，会让爸爸妈妈担心。品行有了污点，会让爸爸妈妈丢脸。',
        },
        {
          kind: 'note',
          text: '「贻」是留下、带给。「忧」是担心，「羞」是羞愧。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'parents-joy',
          text: '孩子端着一碗热汤小心地走向爸爸妈妈。',
        },
      ],
    },
  ],
  rights: {
    workTitle: '弟子规（节选：总叙与入则孝）',
    author: '李毓秀',
    authorDeathYear: 1760,
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: 'https://zh.wikisource.org/wiki/弟子規',
    note: '通行本逐字核对；译文为平台自撰童趣白话',
  },
}
