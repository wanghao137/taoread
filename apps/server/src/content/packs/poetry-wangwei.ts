import type { PackBook } from '../types'

/**
 * 《王维诗选·山水篇》——王维「诗中有画」的五首，最适合孩子想象画面。
 * 底本：通行本《王右丞集》。公版：王维卒于 761 年。
 */
export const wangWei: PackBook = {
  id: 'wangwei-hills',
  title: '王维诗选·山水篇',
  author: '王维',
  lang: 'zh',
  category: 'poetry',
  ageStage: '6-8',
  intro: '读王维的诗像在看画：空山、明月、清泉、红色的落叶，每一首都是一幅画。',
  coverArt: 'empty-mountain',
  coverArtPrompt: '傍晚的空山，松林间月光洒落，一条小溪在石头上流淌，溪边开着几朵小小的花，远处有若隐若现的山峰',
  coverFrom: '#37474F',
  coverTo: '#78909C',
  source: '公版古籍（唐·王维）通行本，逐字注音',
  chapters: [
    {
      title: '第一课 · 鹿柴',
      art: 'empty-mountain',
      artPrompt: '傍晚空寂的深山，一束金色夕阳穿过密林，斜斜照在石头上的绿苔花，远处隐约传来人语声',
      blocks: [
        {
          kind: 'poem',
          text: '空山不见人，但闻人语响。返景入深林，复照青苔上。',
          pinyin: 'kōng shān bù jiàn rén, dàn wén rén yǔ xiǎng. fǎn yǐng rù shēn lín, fù zhào qīng tái shàng.',
          translation: '空空的山里看不见人影，只听见有人在远处说话。傍晚的阳光照进深林，又落在绿绿的青苔上。',
        },
        {
          kind: 'note',
          text: '「但闻」是只听见。「返景」是傍晚回照的阳光，「景」在这里读 yǐng，同「影」。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'empty-mountain',
          text: '空山深林里，一束夕阳照在青苔上，四周静悄悄的。',
        },
      ],
    },
    {
      title: '第二课 · 山中',
      art: 'red-leaves',
      artPrompt: '秋日的山涧溪水变浅，白色的鹅卵石露出来，岸边几株红叶树，满山苍翠欲滴，仿佛能洇湿行人的衣裳',
      blocks: [
        {
          kind: 'poem',
          text: '荆溪白石出，天寒红叶稀。山路元无雨，空翠湿人衣。',
          pinyin: 'jīng xī bái shí chū, tiān hán hóng yè xī. shān lù yuán wú yǔ, kōng cuì shī rén yī.',
          translation: '溪水变浅，白色的石头露了出来。天冷了，红色的叶子越来越少。山路上本来没有下雨，可满山的绿色，好像把人的衣服都弄湿了。',
        },
        {
          kind: 'note',
          text: '「空翠」是山里那种浓浓的、好像能摸得到的绿色。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'red-leaves',
          text: '秋天的山溪，白石、红叶、满山的绿意。',
        },
      ],
    },
    {
      title: '第三课 · 相思',
      art: 'red-bean',
      artPrompt: '南国春日，一株红豆树抽出嫩绿新枝，枝头挂满鲜红的小豆子，一个孩子踮脚采摘，阳光明媚',
      blocks: [
        {
          kind: 'poem',
          text: '红豆生南国，春来发几枝。愿君多采撷，此物最相思。',
          pinyin: 'hóng dòu shēng nán guó, chūn lái fā jǐ zhī. yuàn jūn duō cǎi xié, cǐ wù zuì xiāng sī.',
          translation: '红豆长在南方，春天一到就发了新枝。希望你多摘一些带着，这颗小豆子，最能让人想念远方的朋友。',
        },
        {
          kind: 'note',
          text: '「采撷」就是摘下来、捡起来。「相思」是想念。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第四课 · 鸟鸣涧',
      art: 'moon-spring',
      artPrompt: '春夜的山涧，一轮明月从山头升起，金黄的桂花纷纷飘落，一只小鸟被月光惊动，在溪边枝头啼鸣',
      blocks: [
        {
          kind: 'poem',
          text: '人闲桂花落，夜静春山空。月出惊山鸟，时鸣春涧中。',
          pinyin: 'rén xián guì huā luò, yè jìng chūn shān kōng. yuè chū jīng shān niǎo, shí míng chūn jiàn zhōng.',
          translation: '人很安静，桂花一朵一朵往下落。春天的夜里，整座山都空了。月亮忽然出来，把山里的小鸟吓了一跳，它们时不时就叫一声，叫声在山涧里荡来荡去。',
        },
        {
          kind: 'note',
          text: '「涧」是山间的小溪。「惊」是被吓一跳——月亮太亮，小鸟以为天亮了呢。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'moon-spring',
          text: '月亮升起，桂花飘落，一只小鸟在溪边的枝头叫。',
        },
      ],
    },
    {
      title: '第五课 · 竹里馆',
      art: 'bamboo-hut',
      artPrompt: '幽深的竹林里，一位诗人盘坐在竹亭中抚琴，明月穿过竹叶洒下斑驳光影，四周万籁俱寂',
      blocks: [
        {
          kind: 'poem',
          text: '独坐幽篁里，弹琴复长啸。深林人不知，明月来相照。',
          pinyin: 'dú zuò yōu huáng lǐ, tán qín fù cháng xiào. shēn lín rén bù zhī, míng yuè lái xiāng zhào.',
          translation: '一个人坐在深深的竹林里，弹弹琴，再痛快地长啸一声。这片林子没人来，只有月亮，安安静静地来陪我。',
        },
        {
          kind: 'note',
          text: '「幽篁」是幽深的竹林。「啸」是撮着嘴发出长长的、清亮的声音。',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: '王右丞集（选五首）',
    author: '王维',
    authorDeathYear: 761,
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: 'https://zh.wikisource.org/wiki/王右丞集',
    note: '通行本逐字核对；译文为平台自撰童趣白话',
  },
}
