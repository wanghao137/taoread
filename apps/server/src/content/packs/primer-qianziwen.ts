import type { PackBook } from '../types'

/**
 * 《千字文》节选（蒙学）。
 * 底本：通行本（周兴嗣 撰，南朝梁）。全篇千字，字字不重，此处选「天地玄黄」开篇，
 * 从天地宇宙讲到四季物产与人文始祖，是蒙学开篇最广为传诵的部分。逐字注音，便于孩子跟读。
 * 公版：周兴嗣卒于 521 年，远超保护期。
 */
export const qianZiWen: PackBook = {
  id: 'qianziwen-tiandi',
  title: '千字文·天地玄黄',
  author: '周兴嗣',
  lang: 'zh',
  category: 'primer',
  ageStage: '3-5',
  intro: '一千个字，一个都不重复！古时候的小朋友，读完这一篇就能认好多字，还能知道天地日月、四季花草的故事。',
  coverArt: 'qianziwen-heaven-earth',
  coverArtPrompt: '一卷缓缓展开的古籍长卷，上面写着「天地玄黄」四个大字，背景是深蓝色的星空与大地，金色阳光从卷轴上方洒下',
  coverFrom: '#FFE0B2',
  coverTo: '#FFB74D',
  source: '公版古籍（南朝梁·周兴嗣）节选，逐字注音',
  chapters: [
    {
      title: '第一课 · 天地玄黄',
      art: 'qianziwen-sunrise',
      artPrompt: '深蓝色星空下大地苍茫，一轮金日从地平线升起，月亮高悬，满天星辰排成队列，远古洪荒的壮阔景象',
      blocks: [
        {
          kind: 'poem',
          text: '天地玄黄，宇宙洪荒。',
          pinyin: 'tiān dì xuán huáng, yǔ zhòu hóng huāng.',
          translation: '天是深黑色的，地是黄色的。很久很久以前的宇宙，又大又荒凉，什么都没有。',
        },
        {
          kind: 'poem',
          text: '日月盈昃，辰宿列张。',
          pinyin: 'rì yuè yíng zè, chén xiù liè zhāng.',
          translation: '太阳出来又落下，月亮圆了又缺。满天的星星，排着队、亮晶晶地挂在天上。',
        },
        {
          kind: 'note',
          text: '「玄」是深黑色。「洪荒」是说远古时候又大又荒凉。「昃」是太阳偏西。「辰宿」就是天上的星星。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'starry-sky',
          text: '深蓝色的夜空里，圆圆的月亮和亮晶晶的星星。',
        },
      ],
    },
    {
      title: '第二课 · 寒来暑往',
      art: 'four-seasons',
      artPrompt: '一幅四格画卷：春日插秧、夏日蝉鸣、秋日金黄稻谷堆满仓、冬日雪地里孩子堆雪人，四季轮回',
      blocks: [
        {
          kind: 'poem',
          text: '寒来暑往，秋收冬藏。',
          pinyin: 'hán lái shǔ wǎng, qiū shōu dōng cáng.',
          translation: '冬天来了，夏天又过去，一年一年轮流转。秋天把粮食收回家，冬天把它们藏好。',
        },
        {
          kind: 'poem',
          text: '闰余成岁，律吕调阳。',
          pinyin: 'rùn yú chéng suì, lǜ lǚ tiáo yáng.',
          translation: '多出来的日子攒一攒，就凑成了一年。古人听着乐器的声音，就能知道节气的变化。',
        },
        {
          kind: 'note',
          text: '「闰」是多出来的日子。「律吕」是古代的乐器，古人说它能测出天气冷暖的变化。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第三课 · 云腾致雨',
      art: 'cloud-rain',
      artPrompt: '天空中浓浓的乌云蓄满雨水，雨点落进山下的小河，河岸边沙砾里闪着金色光点，远处昆仑山岗隐约可见',
      blocks: [
        {
          kind: 'poem',
          text: '云腾致雨，露结为霜。',
          pinyin: 'yún téng zhì yǔ, lù jié wéi shuāng.',
          translation: '云彩飘到天上，就变成雨落下来。夜里的小露水，天冷了就结成白白的霜。',
        },
        {
          kind: 'poem',
          text: '金生丽水，玉出昆冈。',
          pinyin: 'jīn shēng lí shuǐ, yù chū kūn gāng.',
          translation: '金子是从美丽的河水里淘出来的，玉石是从昆仑山上采出来的。',
        },
        {
          kind: 'note',
          text: '「丽水」是古代出产金子的河。「昆冈」就是昆仑山，那里出产美丽的玉石。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'cloud-rain',
          text: '天上飘着云，雨点落进小河里，河边有闪亮的小金粒。',
        },
      ],
    },
    {
      title: '第四课 · 果珍李柰',
      art: 'fruits-orchard',
      artPrompt: '果实累累的果园里，枝头挂着红李子和柰子，地上竹筐装着芥菜和生姜，远处河里鱼儿游、天上鸟儿飞',
      blocks: [
        {
          kind: 'poem',
          text: '果珍李柰，菜重芥姜。',
          pinyin: 'guǒ zhēn lǐ nài, cài zhòng jiè jiāng.',
          translation: '水果里最珍贵的是李子和柰子，蔬菜里最重要的是芥菜和生姜。',
        },
        {
          kind: 'poem',
          text: '海咸河淡，鳞潜羽翔。',
          pinyin: 'hǎi xián hé dàn, lín qián yǔ xiáng.',
          translation: '海水是咸的，河水是淡的。鱼儿在水里游，鸟儿在天上飞。',
        },
        {
          kind: 'note',
          text: '「柰」是一种小小的果子，像苹果。「鳞」是鱼身上的鳞片，这里指鱼。「羽」是鸟的羽毛，这里指鸟。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第五课 · 龙师火帝',
      art: 'ancient-sage',
      artPrompt: '一位远古先人跪坐在火堆旁，拿着毛笔在龟甲上刻画文字，身后有人披着兽皮衣裳，山洞外曙光初现',
      blocks: [
        {
          kind: 'poem',
          text: '龙师火帝，鸟官人皇。',
          pinyin: 'lóng shī huǒ dì, niǎo guān rén huáng.',
          translation: '远古的帝王，有的用龙、用火、用鸟来给官长起名字，他们都是了不起的祖先。',
        },
        {
          kind: 'poem',
          text: '始制文字，乃服衣裳。',
          pinyin: 'shǐ zhì wén zì, nǎi fú yī shang.',
          translation: '后来，人们造出了文字，学会了做衣服穿，日子越过越明白、越体面。',
        },
        {
          kind: 'note',
          text: '「始」是开始。「制」是创造、发明。「乃」是于是、就。「衣裳」是身上穿的衣服。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'ancient-sage',
          text: '一位远古的先人拿着毛笔，在龟壳上画着文字。',
        },
      ],
    },
  ],
  rights: {
    workTitle: '千字文（节选：天地玄黄开篇）',
    author: '周兴嗣',
    authorDeathYear: 521,
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: 'https://zh.wikisource.org/wiki/千字文',
    note: '南朝梁蒙学经典，作者卒年远超伯尔尼公约保护期；此处为通行本节选，自校注音与白话翻译。',
  },
}
