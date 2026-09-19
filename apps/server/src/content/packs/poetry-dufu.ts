import type { PackBook } from '../types'

/**
 * 《杜甫诗选·春风篇》——杜甫笔下明朗、适合孩子的五首（避开沉郁之作）。
 * 底本：通行本《杜工部集》。公版：杜甫卒于 770 年。
 */
export const duFu: PackBook = {
  id: 'dufu-spring',
  title: '杜甫诗选·春风篇',
  author: '杜甫',
  lang: 'zh',
  category: 'poetry',
  ageStage: '6-8',
  intro: '杜甫爷爷的眼睛很亮：春天的雨、江边的花、屋顶上的小鸟，他都写进了诗里。',
  coverArt: 'spring-rain',
  coverArtPrompt: '春天的夜晚，细雨轻轻落在江边的小村庄里，屋顶和柳树都蒙着一层水汽，远处有几点暖黄的灯火',
  coverFrom: '#2E7D32',
  coverTo: '#81C784',
  source: '公版古籍（唐·杜甫）通行本，逐字注音',
  chapters: [
    {
      title: '第一课 · 春夜喜雨',
      art: 'spring-rain',
      artPrompt: '春天的夜晚，细细的雨丝随风落在江边小村庄的屋顶和柳树上，万物静默，远处几点暖黄灯火，水汽氤氲',
      blocks: [
        {
          kind: 'poem',
          text: '好雨知时节，当春乃发生。随风潜入夜，润物细无声。',
          pinyin: 'hǎo yǔ zhī shí jié, dāng chūn nǎi fā shēng. suí fēng qián rù yè, rùn wù xì wú shēng.',
          translation: '好雨好像知道什么时候该下，春天一到就来了。它跟着风悄悄地落在夜里，把花草树木喂饱，却一点声音都没有。',
        },
        {
          kind: 'note',
          text: '「潜」是偷偷地、悄悄地。「润」是让东西变得湿润。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'spring-rain',
          text: '春天的细雨落在村庄和柳树上，一切都被雨水打湿了。',
        },
      ],
    },
    {
      title: '第二课 · 绝句',
      art: 'oriole-willow',
      artPrompt: '翠绿的柳枝间两只黄鹂相对鸣唱，一行白鹭正向蓝天飞去，木窗框住远处雪山，门前江边停着一只旧木船',
      blocks: [
        {
          kind: 'poem',
          text: '两个黄鹂鸣翠柳，一行白鹭上青天。窗含西岭千秋雪，门泊东吴万里船。',
          pinyin: 'liǎng gè huáng lí míng cuì liǔ, yī xíng bái lù shàng qīng tiān. chuāng hán xī lǐng qiān qiū xuě, mén bó dōng wú wàn lǐ chuán.',
          translation: '两只黄鹂在绿绿的柳树上唱歌，一行白鹭飞上蓝天。窗户框住西边山上的千年积雪，门口停着一艘要走万里的大船。',
        },
        {
          kind: 'note',
          text: '「含」是含在嘴里，这里说窗户像嘴巴把雪山「含」住了，是杜甫很有名的写法。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'oriole-willow',
          text: '柳树上两只黄色的小鸟，远处一行白鹭飞向蓝天。',
        },
      ],
    },
    {
      title: '第三课 · 江畔独步寻花',
      art: 'flowers-path',
      artPrompt: '江边小路两旁繁花压弯了枝头，蝴蝶在花间转圈飞舞，一只小黄莺站在枝头啼鸣，春意热闹',
      blocks: [
        {
          kind: 'poem',
          text: '黄四娘家花满蹊，千朵万朵压枝低。留连戏蝶时时舞，自在娇莺恰恰啼。',
          pinyin: 'huáng sì niáng jiā huā mǎn xī, qiān duǒ wàn duǒ yā zhī dī. liú lián xì dié shí shí wǔ, zì zài jiāo yīng qià qià tí.',
          translation: '黄四娘家的小路两边开满了花，千朵万朵把树枝都压弯了。蝴蝶舍不得走，一直转着圈飞；小黄莺自由自在地叫着，声音真好听。',
        },
        {
          kind: 'note',
          text: '「蹊」是小路。「恰恰」是形容鸟叫声好听的样子。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第四课 · 春水',
      art: 'river-spring',
      artPrompt: '三月将尽的江畔，一江春水浩荡东去，岸边茅屋被绿水环抱，一位白发诗人倚门望着满眼春色出神',
      blocks: [
        {
          kind: 'poem',
          text: '三月尽是头白日，与春能得几回头。旁人错比扬雄宅，懒惰无心作解嘲。',
          pinyin: 'sān yuè jìn shì tóu bái rì, yǔ chūn néng dé jǐ huí tóu. páng rén cuò bǐ yáng xióng zhái, lǎn duò wú xīn zuò jiě cháo.',
          translation: '三月一过，春天就要走了，它还能回几次头呢？别人把我住的地方比作大作家的房子，我可懒得解释。',
        },
        {
          kind: 'note',
          text: '「能得几回头」是杜甫在问：春天你还能再回几次头呀？',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第五课 · 客至',
      art: 'guest-arrival',
      artPrompt: '春水环绕的茅屋前，一位拄杖的主人笑着推开柴门迎接远来的客人，花径落满花瓣，天上白鸥点点',
      blocks: [
        {
          kind: 'poem',
          text: '舍南舍北皆春水，但见群鸥日日来。花径不曾缘客扫，蓬门今始为君开。',
          pinyin: 'shè nán shè běi jiē chūn shuǐ, dàn jiàn qún ōu rì rì lái. huā jìng bù céng yuán kè sǎo, péng mén jīn shǐ wèi jūn kāi.',
          translation: '我家南边北边都被春水围着，每天都能看见一群群白鸥飞来。长满花的小路还没为客人打扫过，今天这扇柴门，第一次为你打开。',
        },
        {
          kind: 'note',
          text: '「蓬门」是用草编的门，说明杜甫家不富裕，但他是真心欢迎朋友。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'guest-arrival',
          text: '水边的小茅屋门前，一位客人刚到，主人笑着迎接。',
        },
      ],
    },
  ],
  rights: {
    workTitle: '杜工部集（选五首）',
    author: '杜甫',
    authorDeathYear: 770,
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: 'https://zh.wikisource.org/wiki/杜工部集',
    note: '通行本逐字核对；译文为平台自撰童趣白话',
  },
}
