import type { PackBook } from '../types'

/**
 * 《朱子家训·晨昏格言》——明末清初朱柏庐《朱子家训》中浅白易懂的三段。
 * 底本：通行本逐字核对（朱柏庐，1617—1688，卒年远超保护期，公版）。
 * 每章：原文（poem 块带拼音与白话）+ image + note 联系生活讲道理。
 */
export const zhuziJiaxun: PackBook = {
  id: 'primer-zhuzi',
  title: '朱子家训·晨昏格言',
  author: '朱柏庐（1617—1688）',
  lang: 'zh',
  category: 'primer',
  ageStage: '6-8',
  intro: '天亮了就起床扫地，吃一碗饭也要想想种稻人的辛苦，做好事不是做给人看的……三百年前的一封家书，说的全是我们今天的生活。',
  coverArt: 'dawn-courtyard-sweep',
  coverArtPrompt: '清晨的古代四合院，一个孩子拿着竹扫帚认真地扫院子，屋檐下挂着灯笼，公鸡在角落打鸣，朝霞刚刚染红屋顶，安静温暖的绘本风',
  coverFrom: '#6D4C41',
  coverTo: '#EFEBE9',
  source: '《朱子家训》通行本（朱柏庐，卒 1688），公版',
  chapters: [
    {
      title: '第一章 · 黎明即起',
      art: 'dawn-broom-yard',
      artPrompt: '清晨院子里，孩子踮着脚扫地，屋里桌椅擦得干干净净，大门上挂着一把铜锁，大人正在亲手检查门闩，朝阳刚刚升起',
      blocks: [
        {
          kind: 'poem',
          text: '黎明即起，洒扫庭除，要内外整洁；既昏便息，关锁门户，必亲自检点。',
          pinyin: 'lí míng jí qǐ, sǎ sǎo tíng chú, yào nèi wài zhěng jié; jì hūn biàn xī, guān suǒ mén hù, bì qīn zì jiǎn diǎn.',
          translation: '天刚亮就起床，洒水扫地，把屋子里外都收拾整齐；天黑了就休息，关门落锁，一定要亲自检查一遍。',
        },
        {
          kind: 'note',
          text: '【讲一讲】「庭除」就是院子里外，「既」是「已经、到了」的意思。早起、爱干净、自己的事自己做——这三条，放在今天也是好习惯。今晚你来当「门户检点员」，检查家里的门窗锁好没有，好不好？',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'dawn-broom-yard',
          text: '天一亮就起床扫地，屋子收拾得整整齐齐。',
        },
      ],
    },
    {
      title: '第二章 · 一粥一饭',
      art: 'rice-bowl-thrift',
      artPrompt: '木桌上摆着一碗白粥、一碟简单的小菜，孩子双手捧着碗认真吃饭，窗外是水田里弯腰插秧的农人，阳光照着稻穗，温馨感恩氛围',
      blocks: [
        {
          kind: 'poem',
          text: '一粥一饭，当思来处不易；半丝半缕，恒念物力维艰。',
          pinyin: 'yī zhōu yī fàn, dāng sī lái chù bù yì; bàn sī yī lǚ, héng niàn wù lì wéi jiān.',
          translation: '喝一碗粥、吃一碗饭，都应当想到它来得不容易；哪怕半根丝、半根线，也要常常记着做成这些东西有多辛苦。',
        },
        {
          kind: 'note',
          text: '【讲一讲】「恒」是常常、总是，「维」是那么、这样。一碗米饭，从插秧、除草、收割，到脱壳、运输、生火煮饭，要经过好多人的手。下次吃饭把碗底扒得干干净净，就是对种稻人最好的「谢谢」。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'rice-bowl-thrift',
          text: '每一粒米，都来得不容易。',
        },
      ],
    },
    {
      title: '第三章 · 真善与大恶',
      art: 'kindness-in-heart',
      artPrompt: '夜里一个孩子悄悄把自己的棉被盖在睡着的小猫身上，没人看见，月亮从窗外照着他微笑的脸庞，安静温柔的画风',
      blocks: [
        {
          kind: 'poem',
          text: '善欲人见，不是真善；恶恐人知，便是大恶。',
          pinyin: 'shàn yù rén jiàn, bú shì zhēn shàn; è kǒng rén zhī, biàn shì dà è.',
          translation: '做了好事，总想着让别人看见，就不是真正的好心；做了坏事，生怕别人知道，那才是真正的大坏事。',
        },
        {
          kind: 'note',
          text: '【讲一讲】「欲」是想、希望，「恶」在这里读 è，指坏事。真正的好心，是没人看见也照样做：捡起走廊上的香蕉皮、把座位让给更需要的人——不是为了被夸，而是因为这样做心里踏实。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'kindness-in-heart',
          text: '没人看见的时候，你也愿意做好事吗？',
        },
      ],
    },
  ],
  rights: {
    workTitle: '朱子家训（选段三则）',
    author: '朱柏庐（1617—1688）',
    authorDeathYear: 1688,
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: 'https://zh.wikisource.org/wiki/朱子家训',
    note: '作者卒年 1688，远超著作权保护期，公版；原文为《朱子家训》通行本选段，逐字核对，拼音、白话译文与讲解由平台撰写',
  },
}
