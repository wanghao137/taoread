import type { PackBook } from '../types'

/**
 * 《汉乐府选》——汉魏六朝民歌三首，最贴近孩子的乐府入门。
 * 底本：通行本（宋·郭茂倩《乐府诗集》所收），逐字核对，不臆造。
 * 版权：汉魏六朝民歌，作者佚名，古籍公版（basis=pd-70）；白话译文为平台自撰。
 */
export const yueFu: PackBook = {
  id: 'poetry-yuefu',
  title: '汉乐府选',
  author: '汉乐府民歌（佚名）',
  lang: 'zh',
  category: 'poetry',
  ageStage: '3-5',
  intro: '两千年前的小朋友，也爱唱荷叶下的鱼儿，也爱清晨的园子和草地上高高的大风。这三首歌，一唱就唱到了今天。',
  coverArt: 'yuefu-lotus',
  coverArtPrompt: '夏日的荷塘开满粉白莲花，大而圆的荷叶层层叠叠，几条小鱼在莲叶间穿梭游动，水面泛着细碎的金色阳光，远山如洗',
  coverFrom: '#4DB6AC',
  coverTo: '#FFF176',
  source: '汉乐府民歌（汉魏六朝），通行本（郭茂倩《乐府诗集》）',
  chapters: [
    {
      title: '江南',
      art: 'yuefu-jiangnan',
      artPrompt: '江南采莲的池塘，一个小女孩撑着小木盆浮在莲叶间，粉荷映日，绿盖如伞，四条红鱼绕着莲叶东西南北地游',
      blocks: [
        {
          kind: 'poem',
          text: '江南可采莲，莲叶何田田。',
          pinyin: 'jiāng nán kě cǎi lián， lián yè hé tián tián。',
          translation: '江南又到了采莲的季节，莲叶长得多么茂盛、多么漂亮呀。',
        },
        {
          kind: 'poem',
          text: '鱼戏莲叶间。鱼戏莲叶东，鱼戏莲叶西，鱼戏莲叶南，鱼戏莲叶北。',
          pinyin: 'yú xì lián yè jiān。 yú xì lián yè dōng， yú xì lián yè xī， yú xì lián yè nán， yú xì lián yè běi。',
          translation: '小鱼在莲叶间玩捉迷藏：一会儿游到东边，一会儿游到西边，一会儿到南边，一会儿又到北边。',
        },
        {
          kind: 'image',
          art: 'yuefu-jiangnan',
          text: '莲叶圆圆像小伞，小鱼躲在下面捉迷藏。',
        },
        {
          kind: 'note',
          text: '和宝宝一起玩：妈妈说「鱼戏莲叶东」，宝宝就往东边跳一下，再换个方向试试！',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '长歌行',
      art: 'yuefu-garden',
      artPrompt: '清晨的菜园里一畦青翠的葵菜挂着晶莹露珠，太阳刚刚升起，金色光线斜斜照过叶片，园边围着矮矮的竹篱',
      blocks: [
        {
          kind: 'poem',
          text: '青青园中葵，朝露待日晞。阳春布德泽，万物生光辉。',
          pinyin: 'qīng qīng yuán zhōng kuí， zhāo lù dài rì xī。 yáng chūn bù dé zé， wàn wù shēng guāng huī。',
          translation: '园里的葵菜绿油油，叶上的露珠等着太阳把它晒干。温暖的春天把恩泽洒向大地，万物都闪闪发光。',
        },
        {
          kind: 'poem',
          text: '常恐秋节至，焜黄华叶衰。百川东到海，何时复西归？少壮不努力，老大徒伤悲。',
          pinyin: 'cháng kǒng qiū jié zhì， kūn huáng huá yè shuāi。 bǎi chuān dōng dào hǎi， hé shí fù xī guī？ shào zhuàng bù nǔ lì， lǎo dà tú shāng bēi。',
          translation: '常担心秋天来到，花和叶子就枯黄了。千百条江河向东流进大海，什么时候才流回来呢？小时候不努力，长大了只能空自伤悲。',
        },
        {
          kind: 'image',
          art: 'yuefu-garden',
          text: '早晨的菜园，葵菜绿油油，露珠亮晶晶。',
        },
        {
          kind: 'note',
          text: '「朝露」是清晨叶子上的小露珠。「晞」是晒干。小河不回头，日子也一样，所以要好好珍惜每一天哦。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '敕勒歌',
      art: 'yuefu-grassland',
      artPrompt: '辽阔的草原连着天边，敕勒族的小牧童骑在马背上，白色羊群散落如云，风把牧草吹得弯下腰，露出吃草的牛儿，天空蓝得透亮',
      blocks: [
        {
          kind: 'poem',
          text: '敕勒川，阴山下。天似穹庐，笼盖四野。',
          pinyin: 'chì lè chuān， yīn shān xià。 tiān sì qióng lú， lǒng gài sì yě。',
          translation: '敕勒人住的大平原，就在阴山脚下。天空像一座大大的帐篷，把原野严严实实地罩在中间。',
        },
        {
          kind: 'poem',
          text: '天苍苍，野茫茫，风吹草低见牛羊。',
          pinyin: 'tiān cāng cāng， yě máng máng， fēng chuī cǎo dī xiàn niú yáng。',
          translation: '天空蓝蓝的，原野辽阔无边。风一吹，牧草弯下腰，就看见了草里一群群的牛和羊。',
        },
        {
          kind: 'image',
          art: 'yuefu-grassland',
          text: '风把草吹弯了，草原上露出好多牛和羊。',
        },
        {
          kind: 'note',
          text: '「穹庐」是游牧民族住的圆顶帐篷。「见」读 xiàn，是「露出来」的意思。这首北方民歌已唱了一千五百多年。',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: '汉乐府选',
    author: '汉乐府民歌，作者佚名',
    jurisdiction: 'CN',
    basis: 'pd-70',
    note: '汉魏六朝民歌，作者佚名，古籍公版；白话译文为平台自撰。',
  },
}
