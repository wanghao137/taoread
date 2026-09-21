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
    {
      title: '种田谚语',
      art: 'proverb-farm',
      artPrompt: '金黄的麦田边小水渠哗哗流水，农民伯伯弯腰插秧，小孩提着小篮子跟在后面捡麦穗，远处果树成行，白云悠悠',
      blocks: [
        {
          kind: 'text',
          text: '庄稼一枝花，全靠肥当家。',
          translation: '庄稼要开得美、长得壮，肥料就是它的好营养餐。',
        },
        {
          kind: 'text',
          text: '人勤地不懒。',
          translation: '人勤快，田地也不偷懒，秋天捧出满满的收获。',
        },
        {
          kind: 'text',
          text: '种瓜得瓜，种豆得豆。',
          translation: '种下什么，就收什么。播下好种子，才有好收成。',
        },
        {
          kind: 'text',
          text: '清明断雪，谷雨断霜。',
          translation: '过了清明不下雪，过了谷雨不结霜，天气一天比一天暖和。',
        },
        {
          kind: 'text',
          text: '桃三杏四梨五年。',
          translation: '桃树三年结果，杏树四年，梨树五年——种果树，最需要耐心。',
        },
        {
          kind: 'text',
          text: '人误地一时，地误人一年。',
          translation: '播种误了时候，庄稼一年都长不好，做事要抓住好时机。',
        },
        {
          kind: 'text',
          text: '麦盖三层被，来年枕着馒头睡。',
          translation: '大雪给麦苗盖上厚厚的棉被，明年就能蒸出香喷喷的馒头。',
        },
        {
          kind: 'text',
          text: '秧好一半谷。',
          translation: '秧苗长得壮，谷子就饱满了一半——开头打好底子，事情就成了一半。',
        },
        {
          kind: 'text',
          text: '人哄地皮，地哄肚皮。',
          translation: '要是糊弄田地，田地就糊弄你的肚子——种地要实心实意。',
        },
        {
          kind: 'text',
          text: '伏里有雨多种麦。',
          translation: '三伏天里雨水足，秋天就可以放心多种麦子啦。',
        },
        {
          kind: 'image',
          art: 'proverb-farm',
          text: '风调雨顺，田里年年好收成。',
        },
        {
          kind: 'note',
          text: '夜灯悄悄话：春天种下一粒小种子，秋天会收获什么呢？和宝宝一起种一盆小豆子试试吧。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '读书谚语',
      art: 'proverb-book',
      artPrompt: '洒满阳光的小书桌上摊开几本彩色图书，小孩盘腿坐着捧书微笑，笔记本上画着小星星，窗外大树沙沙响',
      blocks: [
        {
          kind: 'text',
          text: '一日之计在于晨。',
          translation: '早晨的时光最金贵，读读书，一整天都亮晶晶。',
        },
        {
          kind: 'text',
          text: '书读百遍，其义自见。',
          translation: '好书多读几遍，里面的道理自己就蹦出来了。',
        },
        {
          kind: 'text',
          text: '好记性不如烂笔头。',
          translation: '把要紧的事写下来、画下来，比光用脑子记更牢靠。',
        },
        {
          kind: 'text',
          text: '温故而知新。',
          translation: '常常回头复习，旧知识里也能翻出新宝贝。',
        },
        {
          kind: 'text',
          text: '学如逆水行舟，不进则退。',
          translation: '学习像逆着水划船，不往前划，船就会悄悄往后退。',
        },
        {
          kind: 'text',
          text: '玉不琢，不成器；人不学，不知义。',
          translation: '美玉要打磨才成宝贝，人要学习才明白道理。',
        },
        {
          kind: 'text',
          text: '三天不念口生，三天不练手生。',
          translation: '本领要天天练，几天不练就变生疏啦。',
        },
        {
          kind: 'text',
          text: '处处留心皆学问。',
          translation: '睁大眼睛看世界，路边的小花、天上的云，都是小老师。',
        },
        {
          kind: 'text',
          text: '冰冻三尺，非一日之寒。',
          translation: '厚厚的冰不是一天冻成的，学问也是一天一天攒出来的。',
        },
        {
          kind: 'text',
          text: '学问学问，不懂就问。',
          translation: '一边学，一边问，问出来的答案记得最牢。',
        },
        {
          kind: 'image',
          art: 'proverb-book',
          text: '翻开书页，就是推开一扇小窗。',
        },
        {
          kind: 'note',
          text: '夜灯悄悄话：今晚的故事读完啦，请宝宝挑一句最喜欢的，讲给爸爸妈妈听。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '过日子谚语',
      art: 'proverb-home',
      artPrompt: '温馨小院里奶奶教小女孩缝补布娃娃的衣服，窗台上摆着一排小罐子，屋檐下挂着晒干的菜干，阳光暖暖照进来',
      blocks: [
        {
          kind: 'text',
          text: '勤是摇钱树，俭是聚宝盆。',
          translation: '勤快能挣来，节省能留下，日子越过越稳当。',
        },
        {
          kind: 'text',
          text: '一勤天下无难事。',
          translation: '肯动手、肯出力，再难的事也能办成。',
        },
        {
          kind: 'text',
          text: '细水长流，吃穿不愁。',
          translation: '省着点用，就像细细的溪水不断流，日子稳稳当当。',
        },
        {
          kind: 'text',
          text: '新三年，旧三年，缝缝补补又三年。',
          translation: '衣服破了补一补，干干净净，照样漂漂亮亮。',
        },
        {
          kind: 'text',
          text: '一顿省一口，一年省一斗。',
          translation: '每顿省下一小口，一年就能攒下一大堆。',
        },
        {
          kind: 'text',
          text: '精打细算，油盐不断。',
          translation: '会盘算着过日子，家里的油盐就不会断啦。',
        },
        {
          kind: 'text',
          text: '吃不穷，穿不穷，算计不到一世穷。',
          translation: '大手大脚不算计，再厚的家底也会花光光。',
        },
        {
          kind: 'text',
          text: '笑破不笑补。',
          translation: '带补丁的衣服不丢人，干净整齐才最体面。',
        },
        {
          kind: 'text',
          text: '家有一老，如有一宝。',
          translation: '家里的老人经验多，有事问一问，准有好主意。',
        },
        {
          kind: 'text',
          text: '众人一条心，黄土变成金。',
          translation: '一家人、一村人心往一处想，黄土也能变成金子。',
        },
        {
          kind: 'image',
          art: 'proverb-home',
          text: '省下的是小物件，攒下的是好日子。',
        },
        {
          kind: 'note',
          text: '夜灯悄悄话：和宝宝一起收拾玩具、物归原处，体验一次「管理小家」的快乐。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '做人谚语',
      art: 'proverb-heart',
      artPrompt: '村口大树下小孩们互相帮忙推小推车，一个孩子递上水壶，大家笑成一团，头顶飘着红心气球，篱笆上开满小花',
      blocks: [
        {
          kind: 'text',
          text: '人心齐，泰山移。',
          translation: '大家心往一处使、劲往一处用，连泰山都能搬得动。',
        },
        {
          kind: 'text',
          text: '一个篱笆三个桩，一个好汉三个帮。',
          translation: '篱笆要靠木桩撑，谁都离不开朋友的帮忙，互相搭把手，事情就好办。',
        },
        {
          kind: 'text',
          text: '滴水之恩，涌泉相报。',
          translation: '别人一点点的好，也要记在心里，好好报答。',
        },
        {
          kind: 'text',
          text: '人不可貌相，海水不可斗量。',
          translation: '不能只看外表下判断，大海那么深，用斗是量不完的。',
        },
        {
          kind: 'text',
          text: '路遥知马力，日久见人心。',
          translation: '路走得远，才知道马的力气；日子久了，才知道谁是真心好朋友。',
        },
        {
          kind: 'text',
          text: '良药苦口利于病。',
          translation: '好药虽然苦，却能治好病；劝我们的话不好听，却能帮我们进步。',
        },
        {
          kind: 'text',
          text: '己所不欲，勿施于人。',
          translation: '自己不喜欢的事，也不要硬塞给别人。',
        },
        {
          kind: 'text',
          text: '人敬我一尺，我敬人一丈。',
          translation: '你对别人客气一分，别人会还你十分，客气是会传染的。',
        },
        {
          kind: 'text',
          text: '若要人不知，除非己莫为。',
          translation: '事情做了，总会有人知道。堂堂正正做人，就不用偷偷摸摸。',
        },
        {
          kind: 'text',
          text: '与人方便，自己方便。',
          translation: '给别人搭把手、留个门，自己走过去也顺畅。',
        },
        {
          kind: 'image',
          art: 'proverb-heart',
          text: '帮人一把，心里开出小花。',
        },
        {
          kind: 'note',
          text: '夜灯悄悄话：今天你帮了谁？谁又帮了你？把「谢谢」和「我帮你」挂在嘴边，人缘会悄悄变好。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '时间谚语',
      art: 'proverb-time',
      artPrompt: '窗台上一只大闹钟指着清晨，小孩麻利地叠好小被子，墙上挂着日历翻到新的一页，窗外太阳刚刚爬上山头',
      blocks: [
        {
          kind: 'text',
          text: '一寸光阴一寸金，寸金难买寸光阴。',
          translation: '时间像金子一样宝贵，金子再多，也买不回过去的一分钟。',
        },
        {
          kind: 'text',
          text: '光阴似箭，日月如梭。',
          translation: '时间像飞出去的箭、织布的梭子，跑得飞快。',
        },
        {
          kind: 'text',
          text: '花有重开日，人无再少年。',
          translation: '花儿谢了明年还开，小时候的时光过去就回不来，要好好珍惜。',
        },
        {
          kind: 'text',
          text: '一年之计在于春，一日之计在于晨。',
          translation: '春天定好一年的计划，早晨安排好一天的事情。',
        },
        {
          kind: 'text',
          text: '今日事，今日毕。',
          translation: '今天的事情今天做完，不留小尾巴，睡觉都香。',
        },
        {
          kind: 'text',
          text: '明日复明日，明日何其多。',
          translation: '总说「明天再做」，明天一个接一个，事情永远做不完。',
        },
        {
          kind: 'text',
          text: '少壮不努力，老大徒伤悲。',
          translation: '小时候不努力，长大了只剩下叹气。趁现在，多学一点是一点。',
        },
        {
          kind: 'text',
          text: '白日莫闲过，青春不再来。',
          translation: '大好的白天，别白白混过去，时光可不会再来一遍。',
        },
        {
          kind: 'text',
          text: '机不可失，时不再来。',
          translation: '好机会来了就要伸手抓住，错过了就不会再回来。',
        },
        {
          kind: 'text',
          text: '时间好比河中水，只能流去不能回。',
          translation: '时间像小河水，哗哗往前流，流走了就不回头。',
        },
        {
          kind: 'image',
          art: 'proverb-time',
          text: '抓紧时间的孩子，天天都富余。',
        },
        {
          kind: 'note',
          text: '夜灯悄悄话：睡前和宝宝定一个「明日小计划」：明早起床后，第一件想做的小事是什么？',
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
