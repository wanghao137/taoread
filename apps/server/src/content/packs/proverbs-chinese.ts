import type { PackBook } from '../types'

/**
 * 《中国谚语儿歌选》——二十四节气农谚、天气谚语、生活谚语各一章。
 * 版权：民间谚语口耳相传，无确定作者（basis=adapted，选编本）；
 * 白话解释为平台自撰，选编面向 3-5 岁儿童。
 */
export const chineseProverbs: PackBook = {
  id: 'proverbs-chinese',
  title: '中国谚语儿歌选',
  author: '民间谚语（佚名）',
  lang: 'zh',
  category: 'poetry',
  ageStage: '3-5',
  intro: '爷爷奶奶的嘴巴里，藏着好多短短的智慧歌。看云识天气，看雪知年成，念一念，你就是小小的生活家。',
  coverArt: 'proverb-swallows',
  coverArtPrompt: '春日屋檐下两只燕子低低飞过，天边堆着大朵积雨云，田里秧苗青青，一个小孩仰头指着天空，奶奶在旁边摇着蒲扇笑',
  coverFrom: '#4FC3F7',
  coverTo: '#FFF59D',
  source: '中国民间谚语（口耳相传，无确定作者）',
  chapters: [
    {
      title: '二十四节气农谚',
      art: 'proverb-season',
      artPrompt: '四季轮转的小村庄拼图画面：春天桃花开、夏天稻浪翻、冬天雪花飘，屋檐下挂着金黄玉米串，小孩蹲在菜地边看冒头的豆芽',
      blocks: [
        {
          kind: 'text',
          text: '立春一日，百草回芽。',
          translation: '立春刚过，小草就探出小脑袋，春天来啦。',
        },
        {
          kind: 'text',
          text: '春雨贵如油。',
          translation: '春天的雨可金贵啦，像油一样，浇得庄稼咕嘟咕嘟往上长。',
        },
        {
          kind: 'text',
          text: '清明前后，种瓜点豆。',
          translation: '清明那几天，土地暖暖的，正好种瓜、点豆，埋下小种子。',
        },
        {
          kind: 'text',
          text: '惊蛰春雷响，农夫闲转忙。',
          translation: '第一声春雷「轰隆」响，把小虫子都叫醒了，田里的人们也忙起来啦。',
        },
        {
          kind: 'text',
          text: '白露身不露，寒露脚不露。',
          translation: '天一凉，肚子和脚丫都要盖好、穿暖，凉空气就欺负不了你。',
        },
        {
          kind: 'text',
          text: '霜降吃柿子，不会流鼻涕。',
          translation: '霜降时节的柿子红又甜，老人说吃了它，冬天鼻子不感冒。',
        },
        {
          kind: 'text',
          text: '立冬补冬，补嘴空。',
          translation: '立冬这天，炖一锅热乎乎的汤，把一年的力气补回来。',
        },
        {
          kind: 'text',
          text: '小雪腌菜，大雪腌肉。',
          translation: '小雪腌白菜，大雪腌咸肉，屋檐下挂起来，是过年的味道。',
        },
        {
          kind: 'text',
          text: '冬至不端饺子碗，冻掉耳朵没人管。',
          translation: '冬至要吃热腾腾的饺子，不然耳朵要被冻得红通通喽。',
        },
        {
          kind: 'text',
          text: '瑞雪兆丰年。',
          translation: '冬天的大雪像给麦子盖棉被，明年准是个好收成。',
        },
        {
          kind: 'image',
          art: 'proverb-season',
          text: '节气轮流转，村庄的日子香喷喷。',
        },
        {
          kind: 'note',
          text: '夜灯悄悄话：一年有二十四个节气，就像二十四个老朋友排着队来看我们。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '天气谚语',
      art: 'proverb-sky',
      artPrompt: '雨后天空挂着一道彩虹，大朵白云像鱼鳞一样排开，燕子贴着稻田低飞，小孩撑着小伞站在田埂上仰望天空，风把伞带吹得飘起',
      blocks: [
        {
          kind: 'text',
          text: '朝霞不出门，晚霞行千里。',
          translation: '早上的天边红彤彤，今天可能要下雨；傍晚的天边红彤彤，明天准是好天气。',
        },
        {
          kind: 'text',
          text: '燕子低飞蛇过道，大雨不久要来到。',
          translation: '燕子贴着地皮飞，是大雨来敲门的小信号。',
        },
        {
          kind: 'text',
          text: '天上钩钩云，地上雨淋淋。',
          translation: '天上出现弯钩一样的云，就快哗啦啦下雨啦。',
        },
        {
          kind: 'text',
          text: '日晕三更雨，月晕午时风。',
          translation: '太阳月亮戴上圆圆的光圈，风雨就在路上了。',
        },
        {
          kind: 'text',
          text: '东虹日头西虹雨。',
          translation: '彩虹在东边，太阳要露脸；彩虹在西边，雨还在排队。',
        },
        {
          kind: 'text',
          text: '天上鱼鳞斑，晒谷不用翻。',
          translation: '云像鱼鳞一片片，明天太阳大，晒谷子都省事。',
        },
        {
          kind: 'text',
          text: '久晴大雾必阴，久雨大雾必晴。',
          translation: '晴久了起大雾，天要变脸；雨久了起大雾，太阳快出来喽。',
        },
        {
          kind: 'text',
          text: '雷公先唱歌，有雨也不多。',
          translation: '先打雷后下雨，这场雨闹个小脾气就走了。',
        },
        {
          kind: 'text',
          text: '一场秋雨一场寒，十场秋雨要穿棉。',
          translation: '秋雨下一场，凉一天；下上十场，棉袄就该上身啦。',
        },
        {
          kind: 'text',
          text: '蚂蚁搬家晴必雨。',
          translation: '蚂蚁排着队搬新家，是在提醒：雨要来啦。',
        },
        {
          kind: 'image',
          art: 'proverb-sky',
          text: '抬头看看天，云朵里有天气预报。',
        },
        {
          kind: 'note',
          text: '夜灯悄悄话：明天出门前，和宝宝一起看看云是什么形状，猜猜会不会下雨。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '生活谚语',
      art: 'proverb-life',
      artPrompt: '温馨的农家厨房里，一家人围着桌子包饺子，小孩踮脚递面皮，窗外邻居隔着篱笆递来一篮青菜，锅里冒着白白的热气',
      blocks: [
        {
          kind: 'text',
          text: '早睡早起，精神百倍。',
          translation: '太阳公公起床，我也起床，一整天都亮晶晶。',
        },
        {
          kind: 'text',
          text: '笑一笑，十年少；愁一愁，白了头。',
          translation: '多笑一笑，人就轻松；总皱眉头，心里会累哦。',
        },
        {
          kind: 'text',
          text: '冬吃萝卜夏吃姜，不劳医生开药方。',
          translation: '冬天萝卜甜，夏天姜暖暖，好好吃饭，医生都夸你。',
        },
        {
          kind: 'text',
          text: '饭后百步走，活到九十九。',
          translation: '吃完饭散散步，肚子舒服，腿脚也有劲。',
        },
        {
          kind: 'text',
          text: '一分耕耘，一分收获。',
          translation: '浇一滴水，长一颗苗；你付出的每一点努力，都会慢慢结果。',
        },
        {
          kind: 'text',
          text: '不怕慢，就怕站。',
          translation: '走得慢不要紧，一直往前走，就能到；停下来不动，才是真耽误。',
        },
        {
          kind: 'text',
          text: '心急吃不了热豆腐。',
          translation: '热豆腐要吹一吹再吃，急急忙忙，反而烫了嘴巴。',
        },
        {
          kind: 'text',
          text: '良言一句三冬暖。',
          translation: '一句好话，像冬天里的小太阳，听了心里暖乎乎。',
        },
        {
          kind: 'text',
          text: '远亲不如近邻。',
          translation: '住得近的邻居帮起忙来，比远方的亲戚还快呢。',
        },
        {
          kind: 'text',
          text: '众人拾柴火焰高。',
          translation: '大家一起添柴，火苗蹿得高高的；大家一起动手，事情很快就办好。',
        },
        {
          kind: 'image',
          art: 'proverb-life',
          text: '一家人围着桌子，日子热气腾腾。',
        },
        {
          kind: 'note',
          text: '夜灯悄悄话：今天你对谁说过一句「暖暖的话」？明天再说一句试试。',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: '中国谚语儿歌选',
    author: '民间谚语，无确定作者',
    jurisdiction: 'CN',
    basis: 'adapted',
    note: '民间谚语无确定作者；白话解释为平台自撰。',
  },
}
