/**
 * 《中国民俗小传说》——找故事内容扩充第四轮（2026-10-31）。
 * 底本：中国民俗传说（灶王/门神/月老/土地公/龙抬头/财神），口传民俗无单一作者，按流传版本改写
 */
import type { PackBook } from '../types'

export const minsuLegends: PackBook = {
  "id": "minsu-legends",
  "title": "中国民俗小传说",
  "author": "中国民间故事 · 桃阅读 改写",
  "lang": "zh",
  "category": "story",
  "ageStage": "6-8",
  "intro": "灶王爷为什么要在小年上天？门神为什么贴在门上？月老怎么给有缘人牵红线？六个看得见的民俗由来故事。",
  "coverArt": "minsu-door-gods",
  "coverFrom": "#F57F17",
  "coverTo": "#FFE082",
  "coverArtPrompt": "老宅木门上贴着两张威风门神年画，门边挂着红灯笼，一个小娃娃踮脚看门神，新年暖色，年画风格童话插画",
  "source": "中国民俗传说（灶王/门神/月老/土地公/龙抬头/财神），口传民俗无单一作者，按流传版本改写",
  "rights": {
    "workTitle": "中国民俗传说",
    "jurisdiction": "CN",
    "basis": "adapted",
    "note": "民俗传说为民间口传作品无单一作者；本包按流传版本由平台改写"
  },
  "chapters": [
    {
      "title": "第一章 · 灶王爷上天",
      "art": "minsu-stove-god",
      "artPrompt": "a kitchen altar with a portrait of the white-bearded kitchen god, plates of sweet malt candy melons and burning incense on the table, an old grandmother folding her hands in prayer, warm new year storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "老辈人家的灶台后头，都供着一张画像。画像上是位白胡子老公公，慈眉善目。他就是灶王爷。一年三百六十天，他守着这一家灶台。谁家做了什么，他都看在眼里，记在心上。大人孩子进厨房，都客客气气的。"
        },
        {
          "kind": "note",
          "art": "lamp-hint",
          "text": "糖瓜——麦芽糖熬成的瓜形糖块，又甜又黏，咬一口粘牙。小年这天祭灶，家家都少不了它。"
        },
        {
          "kind": "text",
          "text": "腊月二十三是小年。这天，灶王爷要上天了。他骑上高头大马，去见玉皇大帝。一家人的善恶事，他要细细汇报。说了好话，来年这家有福气。说了坏话，那家就要受罚。"
        },
        {
          "kind": "text",
          "text": "家家户户早备好了糖瓜。人们把糖瓜摆上供桌，点上三炷香。恭恭敬敬送灶王爷上路。糖瓜甜甜他的嘴，好话自然说得多。也有人说，糖瓜黏黏的，正好粘住他的嘴。坏话就说不出口啦。烧过纸马，一家人望着烟火。心里念着：「上天言好事，回宫降吉祥。」"
        },
        {
          "kind": "image",
          "art": "minsu-stove-god",
          "text": "供桌上摆着糖瓜和香烛，灶王爷画像前老奶奶合掌许愿。"
        },
        {
          "kind": "text",
          "text": "送走灶王爷，年就近了。扫屋子、磨豆腐、写春联，一样样忙起来。到除夕那天，再把新画像请回来。灶王爷回宫，接着守这一家的烟火日子。甜甜的糖瓜味，飘在忙年的空气里。"
        },
        {
          "kind": "note",
          "art": "lamp-hint",
          "text": "小年——腊月二十三，过年的开场锣。从这天起扫屋备年货，家家忙忙碌碌，欢欢喜喜迎春节。"
        }
      ]
    },
    {
      "title": "第二章 · 门神的由来",
      "art": "minsu-door-guards",
      "artPrompt": "two fierce ancient generals painted on red palace doors, one holding a mace and one a whip, a little child tiptoeing to look at the paintings, new year lanterns hanging beside the door, nianhua style storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "老话说，茫茫大海里有座度朔山。山上有棵大桃树，枝叶盖了三千里。桃树东北的枝丫间，开着一扇鬼门。天下的鬼，都从这儿进出。守门的是两位神将，一个叫神荼，一个叫郁垒。他们检查过路的鬼。碰上捣乱的恶鬼，就用苇索捆起来喂老虎。"
        },
        {
          "kind": "note",
          "art": "lamp-hint",
          "text": "门神——贴在大门上的守护神画像。老话说有门神守门，妖邪鬼怪就进不了家门，图的是一家平安。"
        },
        {
          "kind": "text",
          "text": "所以人们相信，鬼怪最怕这两位将军。很早以前，就把他们的画像贴在门上。后来又有了新传说。唐朝时候，泾河龙王逞能打赌，私改了下雨的规矩。他犯了天条，天罚下来，龙王被斩了。宫里的鬼怪也趁乱闹腾起来。一到夜里，砖头瓦块乱飞，闹得唐太宗睡不安稳。"
        },
        {
          "kind": "text",
          "text": "太宗把这事告诉了大臣。大将秦琼挺身而出：「臣杀了一辈子敌人，还怕鬼不成？愿同尉迟恭披甲守门！」尉迟恭也拍着胸脯应下。当夜，两位将军顶盔贯甲，守在宫门外。一个持锏，一个提鞭，威风凛凛。说也奇怪，那一夜风平浪静，鬼怪再没敢来。"
        },
        {
          "kind": "image",
          "art": "minsu-door-guards",
          "text": "朱红宫门前，秦琼持锏、尉迟恭提鞭，顶盔贯甲在夜色里站岗。"
        },
        {
          "kind": "text",
          "text": "一连几夜，夜夜平安。太宗舍不得让将军们天天熬夜。他请画师把两位将军的模样画下来。画得威风凛凛，贴在宫门两边。这个法子照样灵。消息传开，老百姓也学着贴。从此过年贴门神，成了家家户户的老规矩。红门上两员大将，一守就是上千年。"
        },
        {
          "kind": "note",
          "art": "lamp-hint",
          "text": "锏和鞭——古代的短兵器，没有锋刃，全凭分量砸人。传说秦琼使一对金锏，尉迟恭使一条钢鞭。"
        }
      ]
    },
    {
      "title": "第三章 · 月老牵红线",
      "art": "minsu-moon-matchmaker",
      "artPrompt": "a white-bearded old man under bright moonlight flipping through a thick book of destiny, a fine red thread floating from his bag toward two distant houses in a hillside village, soft silver light, gentle storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "传说月亮底下住着一位老人。他管着人间的姻缘，人称月下老人。他手里有本厚厚的姻缘簿。谁和谁是一对，簿上写得清清楚楚。他的布袋里装满了红线。线细细的，看着不起眼，用处可大啦。"
        },
        {
          "kind": "note",
          "art": "lamp-hint",
          "text": "月老——月下老人的简称，传说里专管人间姻缘的神仙。白胡子，笑眯眯，兜里揣满红线。"
        },
        {
          "kind": "text",
          "text": "月老翻开簿子，查到有缘的两个人。他就用红线，把两人的脚悄悄系在一起。线的那头系着你，这头系着他。两个人不管隔着千山万水，素不相识。红线一系，早晚有一天会碰面。碰了面，慢慢就成了相亲相爱的一家人。"
        },
        {
          "kind": "text",
          "text": "传说有个书生，年轻时不肯信。月老告诉他，将来的妻子是个贫家小姑娘。书生不服气，处处躲着避开着。他走南闯北，兜兜转转许多年。到娶亲那天，揭开新娘的盖头。偏偏就是老人指过的那个姑娘。书生这才服了。原来红线早就系好了，躲也躲不开。"
        },
        {
          "kind": "image",
          "art": "minsu-moon-matchmaker",
          "text": "月光下白须老人翻开姻缘簿，一根红线飘向远处两家的灯火。"
        },
        {
          "kind": "text",
          "text": "老人们讲完故事，总添一句：「千里姻缘一线牵。」这根线牵着的，是值得珍惜的缘分。真心的感情不着急。它值得等待，更值得好好珍惜。月儿的清光年年照着人间。月老的红线，也一直系着心心相印的人。"
        },
        {
          "kind": "note",
          "art": "lamp-hint",
          "text": "姻缘簿——月老随身带的厚册子。谁和谁有缘，册上写得清清楚楚，翻开来一查就知道啦。"
        }
      ]
    },
    {
      "title": "第四章 · 土地公公",
      "art": "minsu-earth-god",
      "artPrompt": "a tiny village earth god shrine at the village entrance with a smiling white-bearded god statue holding a dragon cane, an old couple placing a bowl of clear water and rice cakes before it, children watching curiously, spring countryside storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "村口有座小小的土地庙。庙只有半人多高，墙上画着彩云。庙里坐着白胡子的土地公公。他拄着根龙头拐杖，笑呵呵的。老话说，他是管这一方水土的神仙。一村的收成好坏、人口平安，都归他操心。"
        },
        {
          "kind": "note",
          "art": "lamp-hint",
          "text": "土地庙——供土地公公的小庙，村口街边常能见到。庙小得只放得下一尊笑呵呵的泥像，简朴得很。"
        },
        {
          "kind": "text",
          "text": "神仙里头，土地公公的法力数不上大。上天下海的本事他没有，打雷布雨也轮不到他。可他离人最近，天天守在村口。春天，他惦记地里的苗。夏天，他盯着河里的水。谁家娃娃出门玩耍，他也悄悄留心照看着。"
        },
        {
          "kind": "text",
          "text": "庄稼人待土地公公，像待自家长辈。逢年过节，来庙前扫扫土。供上一碗清水，再摆几块米糕。清水最干净，敬的是一片诚心。人们一边供，一边絮絮叨叨说家常。今年麦子出苗齐，托您的福。娃娃要上学了，请多照看。"
        },
        {
          "kind": "image",
          "art": "minsu-earth-god",
          "text": "村口小土地庙前，老爷爷老奶奶端着清水和米糕上供，娃娃凑近看。"
        },
        {
          "kind": "text",
          "text": "秋收时节，新米下来。头一碗饭，也要先端到庙前。土地公公笑呵呵地受了。来年，照样风调雨顺。小庙一年年立在那里，陪着村子。泥像会旧，香火不断。土地公公守着的，是庄稼人踏踏实实过日子的盼头。"
        },
        {
          "kind": "note",
          "art": "lamp-hint",
          "text": "米糕——用米粉蒸成的糕，软软的，甜甜的。逢年过节祭神供祖，总要先端上一碟敬上，图个吉利。"
        }
      ]
    },
    {
      "title": "第五章 · 龙抬头",
      "art": "minsu-dragon-head-day",
      "artPrompt": "an early spring morning with a boy getting a haircut at a street barber stall, farmers plowing a field in the distance, a constellation shaped like a dragon rising over the eastern hills at dusk, warm hopeful storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "农历二月初二，是个热闹的日子。老话说，这天是「龙抬头」。整整一个冬天，龙伏在地下睡大觉。春雷一响，龙被唤醒了。它抬起头来，抖抖鳞甲，伸出犄角。打这天起，雨水渐渐多起来。"
        },
        {
          "kind": "note",
          "art": "lamp-hint",
          "text": "苍龙七宿——古人把天上的星分成一组一组，这七组连起来，正像一条长长的巨龙。龙角就是角宿。"
        },
        {
          "kind": "text",
          "text": "天上的星象也有讲究。夜空里有一串星星，连起来像一条苍龙。早春的傍晚，龙角上的星星从东边升起。它像龙头，慢慢探出了水面。人们瞧见了，高兴地喊：「龙抬头喽！」苍龙七宿慢慢升上夜空。春天，真的到了。"
        },
        {
          "kind": "text",
          "text": "这一天，家家都讨个好彩头。男孩子清早起来剃头，叫「剃龙头」。剃了龙头，人精神，脑子灵。中午擀一碗长长的面条，叫「龙须面」。吃下肚，顺顺当当，结实有力气。有些人家还炒豆子、摊煎饼，嘴里念着：「二月二，龙抬头，大仓满，小仓流。」"
        },
        {
          "kind": "image",
          "art": "minsu-dragon-head-day",
          "text": "二月二清晨，街头剃头挑子前小男孩剃龙头，远处田里农人牵牛春耕。"
        },
        {
          "kind": "text",
          "text": "龙一抬头，就管下雨。春雨贵如油，落进田里，苗儿喝饱了水。农人们套上牛，扶起犁，春耕开始了。翻开的泥土冒着潮气。一年新的指望，就从这一犁起头。剃了龙头，吃了龙须面，看苍龙升上夜空。二月二，处处都是精气神。"
        },
        {
          "kind": "note",
          "art": "lamp-hint",
          "text": "龙须面——又细又长的面条，像龙的胡须一样。二月二吃上一碗，图个顺顺当当的好彩头。"
        }
      ]
    },
    {
      "title": "第六章 · 财神爷敲梆子",
      "art": "minsu-wealth-god",
      "artPrompt": "a wealth god disguised as an old pedlar knocking a wooden clapper along a dawn street, one house open with a woman spinning thread and a man weaving baskets while a child practices writing, festive new year morning, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "正月初五，老话叫「破五」。天还没亮，鞭炮噼里啪啦响起来。家家打开大门，迎接财神爷进门。老传说里，财神爷心地最善。他掌着金银财宝，可从不乱撒。谁家勤快本分，他就往谁家去。"
        },
        {
          "kind": "note",
          "art": "lamp-hint",
          "text": "破五——正月初五的俗称。老话说这天迎财神、开市做生意，禁忌破除，年过完了一大段。"
        },
        {
          "kind": "text",
          "text": "传说有一年正月初五，财神爷换上旧衣裳。他扮成卖货的老汉，手里敲着梆子。梆、梆、梆，走街串巷。梆子声响到东街。一户人家天蒙蒙亮就开了门。媳妇在纺线，汉子在编筐。娃娃趴在桌上描红。老汉乐呵呵卖给他们一把红枣，笑吟吟走了。"
        },
        {
          "kind": "text",
          "text": "梆子声响到西街。一户人家日头老高，还关着门。汉子睡懒觉，屋里的活计堆成山。老汉敲了半天，门缝里扔出一句：「大清早吵什么吵！」老汉摇摇头，敲着梆子走了。到了夜里，东街那家炉火旺旺的，日子越过越红火。西街那家坐吃山空，越来越冷清。"
        },
        {
          "kind": "image",
          "art": "minsu-wealth-god",
          "text": "清晨的街道上，扮成货郎的财神敲着梆子走过，一户勤快人家开门相迎。"
        },
        {
          "kind": "text",
          "text": "人们这才明白，梆子是敲给勤快人听的。财神爷发的不是横财，是勤劳的本钱。正月初五迎财神，迎的也是这股子精气神。手勤、心勤、腿勤，财路自然宽。老话说得好：财神喜欢勤劳的人家。懒汉的门槛，神仙也迈不进。"
        },
        {
          "kind": "note",
          "art": "lamp-hint",
          "text": "梆子——一块挖空的老木头，敲起来梆梆响。从前卖货郎走街串巷，全靠它招呼客人，梆梆声传得老远。"
        }
      ]
    }
  ]
}
