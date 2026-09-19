import type { PackBook } from '../types'

/**
 * 《宋词选·大江大河》——五首适合孩子的宋词，带孩子感受长短句的节奏。
 * 选词：苏轼《水调歌头》《念奴娇》、辛弃疾《清平乐·村居》、李清照《如梦令》、岳飞《满江红》（节）。
 * 公版：诸位词人均卒于 1207 年前。
 */
export const songCi: PackBook = {
  id: 'songci-rivers',
  title: '宋词选·大江大河',
  author: '多位词人',
  lang: 'zh',
  category: 'poetry',
  ageStage: '9-12',
  intro: '诗是整整齐齐的，词是长短不一的。读宋词，像听一首有快有慢的歌。',
  coverArt: 'great-river',
  coverArtPrompt: '一条宽阔的大江在月光下奔流，江边有一叶扁舟，远处是连绵的山峰和一轮明月，画风大气而宁静',
  coverFrom: '#1A237E',
  coverTo: '#283593',
  source: '公版宋词选集，逐字注音',
  chapters: [
    {
      title: '第一课 · 水调歌头（苏轼）',
      art: 'moon-toast',
      artPrompt: '中秋月夜，一位诗人站在江边高台上举杯向天，一轮满月又大又亮，江水滔滔东去，远处楼阁灯火',
      blocks: [
        {
          kind: 'poem',
          text: '明月几时有？把酒问青天。不知天上宫阙，今夕是何年。',
          pinyin: 'míng yuè jǐ shí yǒu? bǎ jiǔ wèn qīng tiān. bù zhī tiān shàng gōng què, jīn xī shì hé nián.',
          translation: '月亮什么时候才有的呢？我端起酒杯问问青天。不知道天上的宫殿，今晚是哪一年。',
        },
        {
          kind: 'poem',
          text: '但愿人长久，千里共婵娟。',
          pinyin: 'dàn yuàn rén cháng jiǔ, qiān lǐ gòng chán juān.',
          translation: '只希望我们都平平安安、长长久久，哪怕隔着一千里，也能看着同一轮月亮。',
        },
        {
          kind: 'note',
          text: '「婵娟」在这里指月亮。这两句是全词最有名的，写的是对亲人的祝福。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'moon-toast',
          text: '月光下，一个人举杯向天，江水滔滔。',
        },
      ],
    },
    {
      title: '第二课 · 念奴娇·赤壁怀古（苏轼）',
      art: 'red-cliff',
      artPrompt: '险峻的赤壁峭壁下，大江奔涌，惊涛猛拍岸边乱石，卷起千堆雪白浪花，水雾弥漫，气势磅礴',
      blocks: [
        {
          kind: 'poem',
          text: '大江东去，浪淘尽，千古风流人物。',
          pinyin: 'dà jiāng dōng qù, làng táo jìn, qiān gǔ fēng liú rén wù.',
          translation: '大江一直向东流去，波浪把千百年来多少英雄好汉，都淘洗得干干净净。',
        },
        {
          kind: 'poem',
          text: '乱石穿空，惊涛拍岸，卷起千堆雪。',
          pinyin: 'luàn shí chuān kōng, jīng tāo pāi àn, juǎn qǐ qiān duī xuě.',
          translation: '参差的石头像要刺破天空，吓人的浪头猛拍江岸，卷起一千堆雪一样的白沫。',
        },
        {
          kind: 'note',
          text: '「淘」是冲刷、洗去。「风流人物」是杰出的英雄，不是今天说的「风流」。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'red-cliff',
          text: '陡峭的赤壁下，江水卷起白色的浪花。',
        },
      ],
    },
    {
      title: '第三课 · 清平乐·村居（辛弃疾）',
      art: 'village-life',
      artPrompt: '溪边低矮的茅草屋前，一对白发老夫妻坐在矮凳上说笑，大儿子在溪东锄豆，二儿子编鸡笼，小儿子趴在溪边剥莲蓬',
      blocks: [
        {
          kind: 'poem',
          text: '茅檐低小，溪上青青草。醉里吴音相媚好，白发谁家翁媪？',
          pinyin: 'máo yán dī xiǎo, xī shàng qīng qīng cǎo. zuì lǐ wú yīn xiāng mèi hǎo, bái fà shuí jiā wēng ǎo?',
          translation: '茅草屋檐又低又小，溪边长满了青青的草。带着酒意，老两口用柔柔的吴语说笑，这是谁家的老爷爷老奶奶呀？',
        },
        {
          kind: 'poem',
          text: '大儿锄豆溪东，中儿正织鸡笼。最喜小儿亡赖，溪头卧剥莲蓬。',
          pinyin: 'dà ér chú dòu xī dōng, zhōng ér zhèng zhī jī lóng. zuì xǐ xiǎo ér wú lài, xī tóu wò bāo lián péng.',
          translation: '大儿子在溪东边给豆子锄草，二儿子在编鸡笼。最可爱的是小儿子，啥活也不干，趴在溪边剥莲蓬吃。',
        },
        {
          kind: 'note',
          text: '「亡赖」在这里是顽皮、淘气的意思，是词人宠爱的口气，不是骂人。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'village-life',
          text: '溪边茅屋前，老夫妻说笑，三个儿子各忙各的，小的在剥莲蓬。',
        },
      ],
    },
    {
      title: '第四课 · 如梦令（李清照）',
      art: 'boat-sunset',
      artPrompt: '夕阳把溪亭染成金色，一只小船误入茂密的荷花丛深处，划桨声惊起一滩白鸥鹭鸶，纷纷飞向晚霞',
      blocks: [
        {
          kind: 'poem',
          text: '常记溪亭日暮，沉醉不知归路。兴尽晚回舟，误入藕花深处。',
          pinyin: 'cháng jì xī tíng rì mù, chén zuì bù zhī guī lù. xìng jìn wǎn huí zhōu, wù rù ǒu huā shēn chù.',
          translation: '一直记得那天傍晚在溪边亭子里玩，喝得太开心，忘了回家的路。玩够了才往回划船，一不小心，划进了荷花丛的最深处。',
        },
        {
          kind: 'poem',
          text: '争渡，争渡，惊起一滩鸥鹭。',
          pinyin: 'zhēng dù, zhēng dù, jīng qǐ yī tān ōu lù.',
          translation: '快划呀快划呀！把沙滩上歇着的白鸥和鹭鸶，吓得飞了起来。',
        },
        {
          kind: 'note',
          text: '「争渡」是「快点划过去」。「藕花」就是荷花。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'boat-sunset',
          text: '夕阳下的小船闯进荷花丛，惊起一群白鹭。',
        },
      ],
    },
    {
      title: '第五课 · 满江红（岳飞·节选）',
      art: 'river-pass',
      artPrompt: '雨后初晴的高楼上，一位披甲将军凭栏远眺，仰天长啸，身后旌旗猎猎，大江在楼下奔流',
      blocks: [
        {
          kind: 'poem',
          text: '怒发冲冠，凭栏处、潇潇雨歇。抬望眼，仰天长啸，壮怀激烈。',
          pinyin: 'nù fà chōng guān, píng lán chù、xiāo xiāo yǔ xiē. tái wàng yǎn, yǎng tiān cháng xiào, zhuàng huái jī liè.',
          translation: '气得头发都竖起来，顶起了帽子。靠着栏杆，一阵急雨刚刚停。抬起眼，对着天空长长地呼啸，心里的志向又热又烈。',
        },
        {
          kind: 'poem',
          text: '莫等闲，白了少年头，空悲切！',
          pinyin: 'mò děng xián, bái le shào nián tóu, kōng bēi qiè!',
          translation: '不要随随便便地把时间浪费掉，等头发都白了，再伤心可就来不及了！',
        },
        {
          kind: 'note',
          text: '「等闲」是随随便便、不当回事。这两句是岳飞劝大家珍惜时间的名言。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'river-pass',
          text: '雨后的高楼上，一位将军凭栏远望，神情激昂。',
        },
      ],
    },
  ],
  rights: {
    workTitle: '宋词选（五首）',
    author: '苏轼、辛弃疾、李清照、岳飞',
    authorDeathYear: 1101,
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: 'https://zh.wikisource.org',
    note: '诸位词人卒年均在 1207 年前；通行本逐字核对，译文平台自撰',
  },
}
