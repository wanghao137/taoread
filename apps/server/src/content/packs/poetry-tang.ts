import type { PackBook } from '../types'

/**
 * 《唐诗三百首》——由 scripts/gen-corpus.mjs 从公版语料生成（2026-09-20 全面补全）。
 * 底本：唐诗三百首（蘅塘退士（编））。逐字来自语料数据集，译文为平台自撰白话。
 * 所收唐诗作者卒年均逾保护期；编者蘅塘退士卒于 1764 年。注音与白话译文为平台自撰。
 */
export const tangShi: PackBook = {
  id: "tangshi-300",
  title: "唐诗三百首",
  author: "蘅塘退士 编",
  lang: "zh",
  category: "poetry",
  ageStage: "3-5",
  intro: "蘅塘退士编《唐诗三百首》全本：三百多首唐诗，每首都有拼音和小画，读诗像看星星一样轻松。",
  coverArt: "poetry-moon",
  coverArtPrompt: "一幅星空下的唐诗画卷：深蓝色夜空中挂着一轮明月，月光下有古代亭子、竹林和小石桌，桌上摊开一卷古诗书卷，萤火虫在四周飞舞",
  coverFrom: "#1E2A5A",
  coverTo: "#4A5FBF",
  source: "公版古诗（唐代）全本，自撰注音与白话译文",
  chapters: [
    {
      title: "静夜思 · 李白",
      art: 'tangshi-300:ch1',
      artPrompt: "安静的深夜，一个古代小诗人坐在木床边，月光把窗纸照得亮亮的，地上像铺了一层白霜，他抬头望着窗外的大圆月亮",
      blocks: [
      {
        kind: 'poem',
        text: "床前明月光，疑是地上霜，\n举头望明月，低头思故乡。",
        pinyin: "chuáng qián míng yuè guāng， yí shì dì shàng shuāng，\njǔ tóu wàng míng yuè， dī tóu sī gù xiāng。",
        translation: "床前洒满明亮的月光，好像地上结了一层白霜。抬起头看月亮，低下头，想起了远方的家。",
      },
      {
        kind: 'note',
        text: "李白被叫做「诗仙」，他特别喜欢写月亮。这首诗是他一个人住在外地时写的。",
        art: 'lamp-hint',
      }
      ],
    },
    {
      title: "春晓 · 孟浩然",
      art: 'tangshi-300:ch2',
      artPrompt: "春天的清晨，一个孩子从被窝里探出头，窗外桃花开了满树，两只小鸟站在枝头叽叽喳喳，地上落了一层花瓣",
      blocks: [
      {
        kind: 'poem',
        text: "春眠不觉晓，处处闻啼鸟。\n夜来风雨声，花落知多少。",
        pinyin: "chūn mián bù jué xiǎo， chù chù wén tí niǎo。\nyè lái fēng yǔ shēng， huā luò zhī duō shǎo。",
        translation: "春天的早晨睡得正香，不知不觉天就亮了，到处都是小鸟叽叽喳喳的叫声。想起昨夜的风雨声，不知花瓣被吹落了多少。",
      }
      ],
    },
    {
      title: "登鹳雀楼 · 王之涣",
      art: 'tangshi-300:ch3',
      artPrompt: "高高的鹳雀楼上，一个孩子扶着栏杆远眺，一轮红日正落向群山，黄河水闪闪发亮地流向远方的大海",
      blocks: [
      {
        kind: 'poem',
        text: "白日依山尽，黄河入海流。\n欲穷千里目，更上一层楼。",
        pinyin: "bái rì yī shān jìn， huáng hé rù hǎi liú。\nyù qióng qiān lǐ mù， gèng shàng yī céng lóu。",
        translation: "太阳挨着山头慢慢落下，黄河水奔流着汇入大海。想要看到更远的地方，就再往上爬一层楼吧。",
      }
      ],
    },
    {
      title: "行宫 · 元稹",
      art: 'tangshi-300:ch4',
      artPrompt: "古诗《行宫》意境插画：寥落古行宫，宫花寂寞红。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "寥落古行宫，宫花寂寞红。\n白头宫女在，闲坐说玄宗。",
        pinyin: "liáo luò gǔ xíng gōng， gōng huā jì mò hóng。\nbái tóu gōng nǚ zài， xián zuò shuō xuán zōng。",
        translation: "空荡荡的老行宫里，宫花冷冷清清地开着红的花。几个白了头的宫女还留在那儿，闲坐着谈论当年玄宗皇帝时候的事。",
      }
      ],
    },
    {
      title: "新嫁娘词 · 王建",
      art: 'tangshi-300:ch5',
      artPrompt: "古诗《新嫁娘词》意境插画：三日入厨下，洗手作羹汤。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "三日入厨下，洗手作羹汤。\n未谙姑食性，先遣小姑尝。",
        pinyin: "sān rì rù chú xià， xǐ shǒu zuò gēng tāng。\nwèi ān gū shí xìng， xiān qiǎn xiǎo gū cháng。",
        translation: "新娘子过门第三天就下厨房，洗干净手来做汤羹。她不知道婆婆的口味，就先请小姑子尝一尝。",
      }
      ],
    },
    {
      title: "相思 · 王维",
      art: 'tangshi-300:ch6',
      artPrompt: "古诗《相思》意境插画：红豆生南国，春来发几枝。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "红豆生南国，春来发几枝。\n愿君多采撷，此物最相思。",
        pinyin: "hóng dòu shēng nán guó， chūn lái fā jǐ zhī。\nyuàn jūn duō cǎi xié， cǐ wù zuì xiāng sī。",
        translation: "红豆生长在南方，春天来了，长出几条新枝。希望你多采一些，这种小豆子最能让人想起想念的人。",
      }
      ],
    },
    {
      title: "杂诗 · 王维",
      art: 'tangshi-300:ch7',
      artPrompt: "古诗《杂诗》意境插画：君自故乡来，应知故乡事。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "君自故乡来，应知故乡事。\n来日绮窗前，寒梅著花未？",
        pinyin: "jūn zì gù xiāng lái， yìng zhī gù xiāng shì。\nlái rì qǐ chuāng qián， hán méi zhù huā wèi？",
        translation: "你从故乡来，一定知道故乡的事情。你来的时候，我家雕花窗前那棵梅花树，开花了没有？",
      }
      ],
    },
    {
      title: "鹿柴 · 王维",
      art: 'tangshi-300:ch8',
      artPrompt: "古诗《鹿柴》意境插画：空山不见人，但闻人语响。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "空山不见人，但闻人语响。\n返景入深林，复照青苔上。",
        pinyin: "kōng shān bù jiàn rén， dàn wén rén yǔ xiǎng。\nfǎn jǐng rù shēn lín， fù zhào qīng tái shàng。",
        translation: "空旷的山里看不见一个人，只听见有人说话的声音。落日的光斜斜地照进幽深的树林，又照在青青的苔藓上。",
      }
      ],
    },
    {
      title: "竹里馆 · 王维",
      art: 'tangshi-300:ch9',
      artPrompt: "古诗《竹里馆》意境插画：独坐幽篁里，弹琴复长啸。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "独坐幽篁里，弹琴复长啸。\n深林人不知，明月来相照。",
        pinyin: "dú zuò yōu huáng lǐ， tán qín fù cháng xiào。\nshēn lín rén bù zhī， míng yuè lái xiāng zhào。",
        translation: "我独自坐在幽静的竹林里，弹弹琴，又放声长啸。深深的竹林里没人知道我在这里，只有明亮的月亮来陪伴照着我。",
      }
      ],
    },
    {
      title: "山中送别 · 王维",
      art: 'tangshi-300:ch10',
      artPrompt: "古诗《山中送别》意境插画：山中相送罢，日暮掩柴扉。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "山中相送罢，日暮掩柴扉。\n春草明年绿，王孙归不归？(明年 一作：年年)",
        pinyin: "shān zhōng xiāng sòng bà， rì mù yǎn chái fēi。\nchūn cǎo míng nián lǜ， wáng sūn guī bù guī？( míng nián yī zuò： nián nián)",
        translation: "在山里送走了朋友，天黑了，我就关上柴门。明年春天青草再变绿的时候，你到底回不回来呢？",
      }
      ],
    },
    {
      title: "问刘十九 · 白居易",
      art: 'tangshi-300:ch11',
      artPrompt: "古诗《问刘十九》意境插画：绿蚁新醅酒，红泥小火炉。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "绿蚁新醅酒，红泥小火炉。\n晚来天欲雪，能饮一杯无？",
        pinyin: "lǜ yǐ xīn pēi jiǔ， hóng ní xiǎo huǒ lú。\nwǎn lái tiān yù xuě， néng yǐn yī bēi wú？",
        translation: "新酿的米酒上浮着淡淡的绿沫，小小的红泥炉子烧得正旺。天黑了，看样子要下雪了，能来我家喝一杯吗？",
      }
      ],
    },
    {
      title: "哥舒歌 · 西鄙人",
      art: 'tangshi-300:ch12',
      artPrompt: "古诗《哥舒歌》意境插画：北斗七星高，哥舒夜带刀。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "北斗七星高，哥舒夜带刀。\n至今窥牧马，不敢过临洮。",
        pinyin: "běi dòu qī xīng gāo， gē shū yè dài dāo。\nzhì jīn kuī mù mǎ， bù gǎn guò lín táo。",
        translation: "北斗七星高高挂在天上，哥舒将军夜里带着宝刀巡逻。敌人到今天只敢远远地偷看我们的牧马，再不敢跨过临洮一步。",
      }
      ],
    },
    {
      title: "怨情 · 李白",
      art: 'tangshi-300:ch13',
      artPrompt: "古诗《怨情》意境插画：美人卷珠帘，深坐颦蛾眉。(颦 一作：蹙)——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "美人卷珠帘，深坐颦蛾眉。(颦 一作：蹙)\n但见泪痕湿，不知心恨谁。",
        pinyin: "měi rén juàn zhū lián， shēn zuò pín é méi。( pín yī zuò： cù)\ndàn jiàn lèi hén shī， bù zhī xīn hèn shuí。",
        translation: "美人卷起珠帘，一个人久久地坐着，皱着弯弯的眉头。只看见她脸上沾着湿湿的泪痕，不知道她心里在恨谁。",
      }
      ],
    },
    {
      title: "登乐游原 · 李商隐",
      art: 'tangshi-300:ch14',
      artPrompt: "古诗《登乐游原》意境插画：向晚意不适，驱车登古原。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "向晚意不适，驱车登古原。\n夕阳无限好，只是近黄昏。",
        pinyin: "xiàng wǎn yì bù shì， qū chē dēng gǔ yuán。\nxī yáng wú xiàn hǎo， zhǐ shì jìn huáng hūn。",
        translation: "傍晚的时候心里不舒服，就赶着马车登上古老的高原。夕阳无限美好，只是天已经快黑了。",
      }
      ],
    },
    {
      title: "听筝 · 李端",
      art: 'tangshi-300:ch15',
      artPrompt: "古诗《听筝》意境插画：鸣筝金粟柱，素手玉房前。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "鸣筝金粟柱，素手玉房前。\n欲得周郎顾，时时误拂弦。",
        pinyin: "míng zhēng jīn sù zhù， sù shǒu yù fáng qián。\nyù dé zhōu láng gù， shí shí wù fú xián。",
        translation: "古筝发出清脆的声音，一双白白的玉手在房前弹奏。她想让心爱的人回头看一眼，就故意时不时地弹错弦。",
      }
      ],
    },
    {
      title: "渡汉江 · 宋之问",
      art: 'tangshi-300:ch16',
      artPrompt: "古诗《渡汉江》意境插画：岭外音书断，经冬复历春。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "岭外音书断，经冬复历春。\n近乡情更怯，不敢问来人。",
        pinyin: "lǐng wài yīn shū duàn， jīng dōng fù lì chūn。\njìn xiāng qíng gèng qiè， bù gǎn wèn lái rén。",
        translation: "住在离家很远的地方，家里的消息全断了，过完冬天又挨过春天。现在越靠近家乡心里越紧张，连向路上走来的人打听一下都不敢。",
      }
      ],
    },
    {
      title: "八阵图 · 杜甫",
      art: 'tangshi-300:ch17',
      artPrompt: "古诗《八阵图》意境插画：功盖三分国，名成八阵图。（名成 一作：名高）——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "功盖三分国，名成八阵图。（名成 一作：名高）\n江流石不转，遗恨失吞吴。",
        pinyin: "gōng gài sān fēn guó， míng chéng bā zhèn tú。（ míng chéng yī zuò： míng gāo）\njiāng liú shí bù zhuǎn， yí hèn shī tūn wú。",
        translation: "诸葛亮帮着建立三分天下的国家，功劳最大，摆八阵图的名声也传了开来。江水日日夜夜冲刷，石头的阵图却一动不动，只留下没能灭掉吴国的遗憾。",
      }
      ],
    },
    {
      title: "宿建德江 · 孟浩然",
      art: 'tangshi-300:ch18',
      artPrompt: "古诗《宿建德江》意境插画：移舟泊烟渚，日暮客愁新。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "移舟泊烟渚，日暮客愁新。\n野旷天低树，江清月近人。",
        pinyin: "yí zhōu bó yān zhǔ， rì mù kè chóu xīn。\nyě kuàng tiān dī shù， jiāng qīng yuè jìn rén。",
        translation: "把小船划到烟雾蒙蒙的小沙洲边停下，太阳落山了，出门在外的愁又添了一层。原野空空旷旷，天好像比树还低；江水清清亮亮，月亮好像凑近了人。",
      }
      ],
    },
    {
      title: "春怨 · 金昌绪",
      art: 'tangshi-300:ch19',
      artPrompt: "古诗《春怨》意境插画：打起黄莺儿，莫教枝上啼。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "打起黄莺儿，莫教枝上啼。\n啼时惊妾梦，不得到辽西。",
        pinyin: "dǎ qǐ huáng yīng ér， mò jiào zhī shàng tí。\ntí shí jīng qiè mèng， bù dé dào liáo xī。",
        translation: "快把黄莺鸟赶走，别让它在树枝上啼叫。它一叫就惊醒了我的好梦，害我梦不到辽西那边去了。",
      }
      ],
    },
    {
      title: "江雪 · 柳宗元",
      art: 'tangshi-300:ch20',
      artPrompt: "古诗《江雪》意境插画：千山鸟飞绝，万径人踪灭。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "千山鸟飞绝，万径人踪灭。\n孤舟蓑笠翁，独钓寒江雪。",
        pinyin: "qiān shān niǎo fēi jué， wàn jìng rén zōng miè。\ngū zhōu suō lì wēng， dú diào hán jiāng xuě。",
        translation: "千座山上，一只飞鸟的影子也没有；万条小路上，看不见一个脚印。只有一条小船上，坐着披蓑衣、戴斗笠的老爷爷，独自在大雪纷纷的寒江上钓鱼。",
      }
      ],
    },
    {
      title: "秋夜寄邱员外 · 韦应物",
      art: 'tangshi-300:ch21',
      artPrompt: "古诗《秋夜寄邱员外》意境插画：怀君属秋夜，散步咏凉天。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "怀君属秋夜，散步咏凉天。\n空山松子落，幽人应未眠。",
        pinyin: "huái jūn shǔ qiū yè， sàn bù yǒng liáng tiān。\nkōng shān sōng zǐ luò， yōu rén yìng wèi mián。",
        translation: "在这个秋天的夜里想念你，我一边散步，一边在凉爽的夜里念着诗句。空山里松子落下的声音，这时候你也应该还没有睡吧。",
      }
      ],
    },
    {
      title: "终南望余雪 · 祖咏",
      art: 'tangshi-300:ch22',
      artPrompt: "古诗《终南望余雪》意境插画：终南阴岭秀，积雪浮云端。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "终南阴岭秀，积雪浮云端。\n林表明霁色，城中增暮寒。",
        pinyin: "zhōng nán yīn lǐng xiù， jī xuě fú yún duān。\nlín biǎo míng jì sè， chéng zhōng zēng mù hán。",
        translation: "终南山的北面山岭特别秀美，山顶的积雪高高地浮在云的上面。雪停了，树林外面亮起了明净的雪光，傍晚的城里反倒更添了几分寒意。",
      }
      ],
    },
    {
      title: "宫词 · 张祜",
      art: 'tangshi-300:ch23',
      artPrompt: "古诗《宫词》意境插画：故国三千里，深宫二十年。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "故国三千里，深宫二十年。\n一声何满子，双泪落君前。",
        pinyin: "gù guó sān qiān lǐ， shēn gōng èr shí nián。\nyī shēng hé mǎn zǐ， shuāng lèi luò jūn qián。",
        translation: "离家乡三千里远，在深深的皇宫里被关了二十年。唱起一声《何满子》，两行眼泪当场落在皇帝面前。",
      }
      ],
    },
    {
      title: "寻隐者不遇 · 贾岛",
      art: 'tangshi-300:ch24',
      artPrompt: "古诗《寻隐者不遇》意境插画：松下问童子，言师采药去。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "松下问童子，言师采药去。\n只在此山中，云深不知处。",
        pinyin: "sōng xià wèn tóng zǐ， yán shī cǎi yào qù。\nzhī zài cǐ shān zhōng， yún shēn bù zhī chù。",
        translation: "我站在松树下问小童子，他说师父采药去了。就在这座大山里，可是山里的云雾太深，不知道他到底在哪儿。",
      }
      ],
    },
    {
      title: "送崔九 · 裴迪",
      art: 'tangshi-300:ch25',
      artPrompt: "古诗《送崔九》意境插画：归山深浅去，须尽丘壑美。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "归山深浅去，须尽丘壑美。\n莫学武陵人，暂游桃源里。",
        pinyin: "guī shān shēn qiǎn qù， xū jìn qiū hè měi。\nmò xué wǔ líng rén， zàn yóu táo yuán lǐ。",
        translation: "你回山里去，不管深的山浅的山，都要看尽山山水水的美景。千万别学武陵那个渔人，只在桃花源里玩了一下，就急急忙忙出来了。",
      }
      ],
    },
    {
      title: "送灵澈上人 · 刘长卿",
      art: 'tangshi-300:ch26',
      artPrompt: "古诗《送灵澈上人》意境插画：苍苍竹林寺，杳杳钟声晚。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "苍苍竹林寺，杳杳钟声晚。\n荷笠带斜阳，青山独归远。(斜阳 一作：夕阳)",
        pinyin: "cāng cāng zhú lín sì， yǎo yǎo zhōng shēng wǎn。\nhé lì dài xié yáng， qīng shān dú guī yuǎn。( xié yáng yī zuò： xī yáng)",
        translation: "青翠的竹林深处有一座寺，远远传来傍晚的钟声。他背着斗笠，披着斜阳，独自朝青山那边越走越远了。",
      }
      ],
    },
    {
      title: "听弹琴 · 刘长卿",
      art: 'tangshi-300:ch27',
      artPrompt: "古诗《听弹琴》意境插画：泠泠七弦上，静听松风寒。(七弦 一作：七丝)——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "泠泠七弦上，静听松风寒。(七弦 一作：七丝)\n古调虽自爱，今人多不弹。",
        pinyin: "líng líng qī xián shàng， jìng tīng sōng fēng hán。( qī xián yī zuò： qī sī)\ngǔ tiáo suī zì ài， jīn rén duō bù tán。",
        translation: "七弦琴发出清清脆脆的声音，静静听着，就像寒风吹过松林。这样古老的曲调我自己虽然喜爱，可如今的人大多不爱弹了。",
      }
      ],
    },
    {
      title: "送上人 · 刘长卿",
      art: 'tangshi-300:ch28',
      artPrompt: "古诗《送上人》意境插画：孤云将野鹤，岂向人间住。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "孤云将野鹤，岂向人间住。\n莫买沃洲山，时人已知处。",
        pinyin: "gū yún jiāng yě hè， qǐ xiàng rén jiān zhù。\nmò mǎi wò zhōu shān， shí rén yǐ zhī chù。",
        translation: "你像一片孤云带着一只野鹤，怎么会愿意住在拥挤的人间呢。也不要买沃洲山去住，那个地方如今人们早就都知道了。",
      }
      ],
    },
    {
      title: "玉台体 · 权德舆",
      art: 'tangshi-300:ch29',
      artPrompt: "古诗《玉台体》意境插画：昨夜裙带解，今朝蟢子飞。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "昨夜裙带解，今朝蟢子飞。\n铅华不可弃，莫是藁砧归。",
        pinyin: "zuó yè qún dài jiě， jīn cháo xǐ zǐ fēi。\nqiān huá bù kě qì， mò shì gǎo zhēn guī。",
        translation: "昨夜裙子上的带子自己松开了，今天早上又有蜘蛛飞来。脸上的妆可不能不化，莫不是丈夫要回家了？",
      }
      ],
    },
    {
      title: "芙蓉楼送辛渐 · 王昌龄",
      art: 'tangshi-300:ch30',
      artPrompt: "古诗《芙蓉楼送辛渐》意境插画：寒雨连江夜入吴，平明送客楚山孤。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "寒雨连江夜入吴，平明送客楚山孤。\n洛阳亲友如相问，一片冰心在玉壶。",
        pinyin: "hán yǔ lián jiāng yè rù wú， píng míng sòng kè chǔ shān gū。\nluò yáng qīn yǒu rú xiāng wèn， yī piàn bīng xīn zài yù hú。",
        translation: "冰冷的秋雨夜里洒满江面，天亮送你上路，望着远处的楚山，心里觉得孤单。洛阳的亲友们要是问起我，就说我的心还像玉壶里的冰一样干净透亮。",
      }
      ],
    },
    {
      title: "闺怨 · 王昌龄",
      art: 'tangshi-300:ch31',
      artPrompt: "古诗《闺怨》意境插画：闺中少妇不知愁，春日凝妆上翠楼。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "闺中少妇不知愁，春日凝妆上翠楼。\n忽见陌头杨柳色，悔教夫婿觅封侯。",
        pinyin: "guī zhōng shào fù bù zhī chóu， chūn rì níng zhuāng shàng cuì lóu。\nhū jiàn mò tóu yáng liǔ sè， huǐ jiào fū xù mì fēng hóu。",
        translation: "闺房里的年轻媳妇本来不知道什么叫愁，春天里打扮得漂漂亮亮，登上高楼看风景。忽然看见路边青青的杨柳色，心里后悔让丈夫出门去求取功名。",
      }
      ],
    },
    {
      title: "春宫曲 · 王昌龄",
      art: 'tangshi-300:ch32',
      artPrompt: "古诗《春宫曲》意境插画：昨夜风开露井桃，未央前殿月轮高。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "昨夜风开露井桃，未央前殿月轮高。\n平阳歌舞新承宠，帘外春寒赐锦袍。",
        pinyin: "zuó yè fēng kāi lù jǐng táo， wèi yāng qián diàn yuè lún gāo。\npíng yáng gē wǔ xīn chéng chǒng， lián wài chūn hán cì jǐn páo。",
        translation: "昨夜春风吹开了露井边的桃花，未央宫前殿的月亮升得高高的。平阳家的歌女刚刚得了新宠，皇帝怕帘外春寒，赐给她锦袍。",
      }
      ],
    },
    {
      title: "九月九日忆山东兄弟 · 王维",
      art: 'tangshi-300:ch33',
      artPrompt: "古诗《九月九日忆山东兄弟》意境插画：独在异乡为异客，每逢佳节倍思亲。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "独在异乡为异客，每逢佳节倍思亲。\n遥知兄弟登高处，遍插茱萸少一人。",
        pinyin: "dú zài yì xiāng wèi yì kè， měi féng jiā jié bèi sī qīn。\nyáo zhī xiōng dì dēng gāo chù， biàn chā zhū yú shǎo yī rén。",
        translation: "我一个人在外地做客，每到过节的时候就加倍想念亲人。远远想到兄弟们登高望远的地方，人人都插着茱萸，就少了我一个。",
      }
      ],
    },
    {
      title: "凉州词 · 王翰",
      art: 'tangshi-300:ch34',
      artPrompt: "古诗《凉州词》意境插画：葡萄美酒夜光杯，欲饮琵琶马上催。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "葡萄美酒夜光杯，欲饮琵琶马上催。\n醉卧沙场君莫笑，古来征战几人回？",
        pinyin: "pú táo měi jiǔ yè guāng bēi， yù yǐn pí pa mǎ shàng cuī。\nzuì wò shā chǎng jūn mò xiào， gǔ lái zhēng zhàn jǐ rén huí？",
        translation: "香喷喷的葡萄美酒斟满了夜光杯，正要喝，马上的琵琶声又催人出发了。就算醉倒在战场上也请别笑话我，自古以来出门打仗的人，有几个能回来呢？",
      }
      ],
    },
    {
      title: "后宫词 · 白居易",
      art: 'tangshi-300:ch35',
      artPrompt: "古诗《后宫词》意境插画：泪湿罗巾梦不成，夜深前殿按歌声。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "泪湿罗巾梦不成，夜深前殿按歌声。\n红颜未老恩先断，斜倚薰笼坐到明。",
        pinyin: "lèi shī luó jīn mèng bù chéng， yè shēn qián diàn àn gē shēng。\nhóng yán wèi lǎo ēn xiān duàn， xié yǐ xūn lóng zuò dào míng。",
        translation: "泪水浸湿了丝罗手巾，想做个好梦也没做成；夜已经深了，前殿还传来唱歌跳舞的声音。美貌还没有老去，皇帝的宠爱却先断了，她斜靠着熏笼，一直坐到天亮。",
      }
      ],
    },
    {
      title: "宫中词 · 朱庆余",
      art: 'tangshi-300:ch36',
      artPrompt: "古诗《宫中词》意境插画：寂寂花时闭院门，美人相并立琼轩。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "寂寂花时闭院门，美人相并立琼轩。\n含情欲说宫中事，鹦鹉前头不敢言。",
        pinyin: "jì jì huā shí bì yuàn mén， měi rén xiāng bìng lì qióng xuān。\nhán qíng yù shuō gōng zhōng shì， yīng wǔ qián tou bù gǎn yán。",
        translation: "百花开放的时候，宫院的门却紧紧关着，两个美人并肩站在华美的长廊上。她们满心的话想说说宫里的事，可是在会学舌的鹦鹉面前，谁也不敢开口。",
      }
      ],
    },
    {
      title: "近试上张水部 · 朱庆余",
      art: 'tangshi-300:ch37',
      artPrompt: "古诗《近试上张水部》意境插画：洞房昨夜停红烛，待晓堂前拜舅姑。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "洞房昨夜停红烛，待晓堂前拜舅姑。\n妆罢低声问夫婿，画眉深浅入时无。",
        pinyin: "dòng fáng zuó yè tíng hóng zhú， dài xiǎo táng qián bài jiù gū。\nzhuāng bà dī shēng wèn fū xù， huà méi shēn qiǎn rù shí wú。",
        translation: "昨夜洞房里点着红红的蜡烛，等到天亮，新娘要到堂前拜见公婆。她打扮好了，低声问丈夫：我眉毛画得深一点浅一点，合不合现在流行的样式？",
      }
      ],
    },
    {
      title: "逢入京使 · 岑参",
      art: 'tangshi-300:ch38',
      artPrompt: "古诗《逢入京使》意境插画：故园东望路漫漫，双袖龙钟泪不干。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "故园东望路漫漫，双袖龙钟泪不干。\n马上相逢无纸笔，凭君传语报平安。",
        pinyin: "gù yuán dōng wàng lù màn màn， shuāng xiù lóng zhōng lèi bù gān。\nmǎ shàng xiāng féng wú zhǐ bǐ， píng jūn chuán yǔ bào píng ān。",
        translation: "回头朝东望着家乡，长路漫漫望不到头，眼泪流下来，两条袖子都擦湿了。骑在马上和你相逢，身上没有纸和笔，只好托你捎一句话，说我一切都平安。",
      }
      ],
    },
    {
      title: "黄鹤楼送孟浩然之广陵 · 李白",
      art: 'tangshi-300:ch39',
      artPrompt: "古诗《黄鹤楼送孟浩然之广陵》意境插画：故人西辞黄鹤楼，烟花三月下扬州。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "故人西辞黄鹤楼，烟花三月下扬州。\n孤帆远影碧空尽，唯见长江天际流。 (唯 通：惟)",
        pinyin: "gù rén xī cí huáng hè lóu， yān huā sān yuè xià yáng zhōu。\ngū fān yuǎn yǐng bì kōng jìn， wéi jiàn cháng jiāng tiān jì liú。 ( wéi tōng： wéi)",
        translation: "老朋友告别了黄鹤楼，在这柳絮如烟、繁花似锦的三月，坐船下扬州去。那只孤船的帆影越走越远，最后消失在蓝天的尽头，只看见长江水浩浩荡荡向天边流去。",
      }
      ],
    },
    {
      title: "早发白帝城 · 李白",
      art: 'tangshi-300:ch40',
      artPrompt: "古诗《早发白帝城》意境插画：朝辞白帝彩云间，千里江陵一日还。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "朝辞白帝彩云间，千里江陵一日还。\n两岸猿声啼不住，轻舟已过万重山。",
        pinyin: "cháo cí bái dì cǎi yún jiān， qiān lǐ jiāng líng yī rì hái。\nliǎng àn yuán shēng tí bù zhù， qīng zhōu yǐ guò wàn chóng shān。",
        translation: "早晨告别彩云环绕的白帝城，千里以外的江陵，一天就到了。两岸猿猴的叫声还没停个够，轻快的小船已经穿过了万重青山。",
      }
      ],
    },
    {
      title: "夜上受降城闻笛 · 李益",
      art: 'tangshi-300:ch41',
      artPrompt: "古诗《夜上受降城闻笛》意境插画：回乐烽前沙似雪，受降城外月如霜。(回乐——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "回乐烽前沙似雪，受降城外月如霜。(回乐\n一作：回乐\n）\n不知何处吹芦管，一夜征人尽望乡。",
        pinyin: "huí lè fēng qián shā sì xuě， shòu xiáng chéng wài yuè rú shuāng。( huí lè\nyī zuò： huí lè\n\nbù zhī hé chù chuī lú guǎn， yī yè zhēng rén jìn wàng xiāng。",
        translation: "回乐烽前的沙地在月光下白得像雪，受降城外的月色冷得像霜。不知道哪里吹起了芦笛声，一夜之间，出门打仗的将士们都在思念故乡。",
      }
      ],
    },
    {
      title: "贾生 · 李商隐",
      art: 'tangshi-300:ch42',
      artPrompt: "古诗《贾生》意境插画：宣室求贤访逐臣，贾生才调更无伦。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "宣室求贤访逐臣，贾生才调更无伦。\n可怜夜半虚前席，不问苍生问鬼神。",
        pinyin: "xuān shì qiú xián fǎng zhú chén， jiǎ shēng cái tiáo gèng wú lún。\nkě lián yè bàn xū qián xí， bù wèn cāng shēng wèn guǐ shén。",
        translation: "皇帝在宣室访求贤才，召见了被贬走的大臣，贾谊的才华更是没有人能比得上。可惜聊到半夜，皇帝把坐席挪得再近也是空的——他不问天下百姓的事，只问鬼神的事。",
      }
      ],
    },
    {
      title: "隋宫 · 李商隐",
      art: 'tangshi-300:ch43',
      artPrompt: "古诗《隋宫》意境插画：乘兴南游不戒严，九重谁省谏书函。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "乘兴南游不戒严，九重谁省谏书函。\n春风举国裁宫锦，半作障泥半作帆。",
        pinyin: "chéng xìng nán yóu bù jiè yán， jiǔ chóng shuí shěng jiàn shū hán。\nchūn fēng jǔ guó cái gōng jǐn， bàn zuò zhàng ní bàn zuò fān。",
        translation: "皇帝乘着兴致到南方游玩，一路上一点儿防备也不加，深宫里又有谁去理会那些劝谏的奏书呢。春风里全国都在裁剪织锦，一半拿去做了马身上的遮泥，一半拿去做了船上的帆。",
      }
      ],
    },
    {
      title: "瑶池 · 李商隐",
      art: 'tangshi-300:ch44',
      artPrompt: "古诗《瑶池》意境插画：瑶池阿母绮窗开，黄竹歌声动地哀。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "瑶池阿母绮窗开，黄竹歌声动地哀。\n八骏日行三万里，穆王何事不重来。",
        pinyin: "yáo chí ā mǔ qǐ chuāng kāi， huáng zhú gē shēng dòng dì āi。\nbā jùn rì xíng sān wàn lǐ， mù wáng hé shì bù chóng lái。",
        translation: "瑶池上的王母亲手打开绮窗，只听见人间《黄竹歌》的歌声哀哀动地。周穆王的八匹骏马一天能跑三万里，他为什么一去就再也不来了呢？",
      }
      ],
    },
    {
      title: "嫦娥 · 李商隐",
      art: 'tangshi-300:ch45',
      artPrompt: "古诗《嫦娥》意境插画：云母屏风烛影深，长河渐落晓星沉。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "云母屏风烛影深，长河渐落晓星沉。\n嫦娥应悔偷灵药，碧海青天夜夜心。",
        pinyin: "yún mǔ píng fēng zhú yǐng shēn， cháng hé jiàn luò xiǎo xīng chén。\ncháng é yìng huǐ tōu líng yào， bì hǎi qīng tiān yè yè xīn。",
        translation: "云母屏风上映着幽深的烛影，银河渐渐西斜，晨星慢慢下沉。嫦娥大概后悔偷吃了长生不老的灵药吧，如今一个人对着碧海一样的青天，夜夜冷冷清清。",
      }
      ],
    },
    {
      title: "夜雨寄北 · 李商隐",
      art: 'tangshi-300:ch46',
      artPrompt: "古诗《夜雨寄北》意境插画：君问归期未有期，巴山夜雨涨秋池。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "君问归期未有期，巴山夜雨涨秋池。\n何当共剪西窗烛，却话巴山夜雨时。",
        pinyin: "jūn wèn guī qī wèi yǒu qī， bā shān yè yǔ zhǎng qiū chí。\nhé dāng gòng jiǎn xī chuāng zhú， què huà bā shān yè yǔ shí。",
        translation: "你问我什么时候回家，回家的日子还没有定下来。巴山今晚下着大雨，秋天的池塘都涨满了水。什么时候才能和你一起坐在西窗下剪去长长的烛花，再来说说今晚巴山夜雨的情景呢？",
      }
      ],
    },
    {
      title: "寄令狐郎中 · 李商隐",
      art: 'tangshi-300:ch47',
      artPrompt: "古诗《寄令狐郎中》意境插画：嵩云秦树久离居，双鲤迢迢一纸书。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "嵩云秦树久离居，双鲤迢迢一纸书。\n休问梁园旧宾客，茂陵秋雨病相如。",
        pinyin: "sōng yún qín shù jiǔ lí jū， shuāng lǐ tiáo tiáo yī zhǐ shū。\nxiū wèn liáng yuán jiù bīn kè， mào líng qiū yǔ bìng xiāng rú。",
        translation: "你像嵩山的云，我像长安的树，我们分开住得太久了，谢谢你千里迢迢寄来一封书信。别再问梁园那位老朋友怎么样了，他就像秋雨里的司马相如，正生着病呢。",
      }
      ],
    },
    {
      title: "为有 · 李商隐",
      art: 'tangshi-300:ch48',
      artPrompt: "古诗《为有》意境插画：为有云屏无限娇，凤城寒尽怕春宵。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "为有云屏无限娇，凤城寒尽怕春宵。\n无端嫁得金龟婿，辜负香衾事早朝。",
        pinyin: "wèi yǒu yún píng wú xiàn jiāo， fèng chéng hán jìn pà chūn xiāo。\nwú duān jià dé jīn guī xù， gū fù xiāng qīn shì zǎo cháo。",
        translation: "家里有云母屏风，身边有娇美的妻子，京城的冬天刚过完，他反而怕起春天的夜晚来。没来由娶了个做大官的丈夫，天天一早要去上朝，白白辜负了暖暖的锦被。",
      }
      ],
    },
    {
      title: "江南逢李龟年 · 杜甫",
      art: 'tangshi-300:ch49',
      artPrompt: "古诗《江南逢李龟年》意境插画：岐王宅里寻常见，崔九堂前几度闻。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "岐王宅里寻常见，崔九堂前几度闻。\n正是江南好风景，落花时节又逢君。",
        pinyin: "qí wáng zhái lǐ xún cháng jiàn， cuī jiǔ táng qián jǐ dù wén。\nzhèng shì jiāng nán hǎo fēng jǐng， luò huā shí jié yòu féng jūn。",
        translation: "从前在岐王的宅子里，我常常能见到你；在崔九的堂前，也好几次听你唱歌。如今正是江南风景最好的时候，在这落花纷纷的季节里，又和你重逢了。",
      }
      ],
    },
    {
      title: "赠别·其一 · 杜牧",
      art: 'tangshi-300:ch50',
      artPrompt: "古诗《赠别·其一》意境插画：娉娉袅袅十三余，豆蔻梢头二月初。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "娉娉袅袅十三余，豆蔻梢头二月初。\n春风十里扬州路，卷上珠帘总不如。",
        pinyin: "pīng pīng niǎo niǎo shí sān yú， dòu kòu shāo tóu èr yuè chū。\nchūn fēng shí lǐ yáng zhōu lù， juàn shàng zhū lián zǒng bù rú。",
        translation: "她身姿轻盈美好，才十三岁多一点，就像二月初豆蔻枝头刚绽放的花苞。看遍扬州十里长街卷起珠帘的美人，谁也比不上她。",
      }
      ],
    },
    {
      title: "赠别·其二 · 杜牧",
      art: 'tangshi-300:ch51',
      artPrompt: "古诗《赠别·其二》意境插画：多情却似总无情，唯觉樽前笑不成。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "多情却似总无情，唯觉樽前笑不成。\n蜡烛有心还惜别，替人垂泪到天明。",
        pinyin: "duō qíng què sì zǒng wú qíng， wéi jué zūn qián xiào bù chéng。\nlà zhú yǒu xīn hái xī bié， tì rén chuí lèi dào tiān míng。",
        translation: "明明满心的感情，离别时却好像什么都说不出来，只觉得举起酒杯想笑也笑不出来。蜡烛倒像是有心的一样，懂得依依惜别，替人流着眼泪，一直滴到天亮。",
      }
      ],
    },
    {
      title: "金谷园 · 杜牧",
      art: 'tangshi-300:ch52',
      artPrompt: "古诗《金谷园》意境插画：繁华事散逐香尘，流水无情草自春。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "繁华事散逐香尘，流水无情草自春。\n日暮东风怨啼鸟，落花犹似坠楼人。",
        pinyin: "fán huá shì sàn zhú xiāng chén， liú shuǐ wú qíng cǎo zì chūn。\nrì mù dōng fēng yuàn tí niǎo， luò huā yóu sì zhuì lóu rén。",
        translation: "这里繁华的往事早已散了，就像香尘一样随风飘走；流水无情地流去，芳草却照样青青地迎来春天。黄昏的东风里，鸟儿啼叫着满心哀怨，片片落花飘下来，就像当年那位坠楼的人。",
      }
      ],
    },
    {
      title: "寄扬州韩绰判官 · 杜牧",
      art: 'tangshi-300:ch53',
      artPrompt: "古诗《寄扬州韩绰判官》意境插画：青山隐隐水迢迢，秋尽江南草未凋。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "青山隐隐水迢迢，秋尽江南草未凋。\n二十四桥明月夜，玉人何处教吹箫？",
        pinyin: "qīng shān yǐn yǐn shuǐ tiáo tiáo， qiū jìn jiāng nán cǎo wèi diāo。\nèr shí sì qiáo míng yuè yè， yù rén hé chù jiào chuī xiāo？",
        translation: "青山隐隐约约，江水悠悠远远，秋天快过完了，江南的草还没有枯黄。二十四桥上洒满明月的夜里，你在什么地方教人吹箫呢？",
      }
      ],
    },
    {
      title: "遣怀 · 杜牧",
      art: 'tangshi-300:ch54',
      artPrompt: "古诗《遣怀》意境插画：落魄江南载酒行，楚腰纤细掌中轻。(江南 一作：江湖；纤细 一作：肠断)——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "落魄江南载酒行，楚腰纤细掌中轻。(江南 一作：江湖；纤细 一作：肠断)\n十年一觉扬州梦，赢得青楼薄幸名。",
        pinyin: "luò pò jiāng nán zǎi jiǔ xíng， chǔ yāo xiān xì zhǎng zhōng qīng。( jiāng nán yī zuò： jiāng hú； xiān xì yī zuò： cháng duàn)\nshí nián yī jiào yáng zhōu mèng， yíng dé qīng lóu bó xìng míng。",
        translation: "我失意地带着酒在江南四处漂泊，身边都是腰肢纤细、舞姿轻盈的歌女。扬州十年的日子像一场大梦，醒来只落下一个薄情的名声。",
      }
      ],
    },
    {
      title: "秋夕 · 杜牧",
      art: 'tangshi-300:ch55',
      artPrompt: "古诗《秋夕》意境插画：银烛秋光冷画屏，轻罗小扇扑流萤。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "银烛秋光冷画屏，轻罗小扇扑流萤。\n天阶夜色凉如水，卧看牵牛织女星。",
        pinyin: "yín zhú qiū guāng lěng huà píng， qīng luó xiǎo shàn pū liú yíng。\ntiān jiē yè sè liáng rú shuǐ， wò kàn qiān niú zhī nǚ xīng。",
        translation: "秋夜里，烛光照着画屏，透着淡淡的凉意；我拿着小小的丝扇，扑打飞来飞去的萤火虫。夜色凉凉的像水一样，我坐着仰望天上的牵牛星和织女星。",
      }
      ],
    },
    {
      title: "将赴吴兴登乐游原一绝 · 杜牧",
      art: 'tangshi-300:ch56',
      artPrompt: "古诗《将赴吴兴登乐游原一绝》意境插画：清时有味是无能，闲爱孤云静爱僧。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "清时有味是无能，闲爱孤云静爱僧。\n欲把一麾江海去，乐游原上望昭陵。",
        pinyin: "qīng shí yǒu wèi shì wú néng， xián ài gū yún jìng ài sēng。\nyù bǎ yī huī jiāng hǎi qù， lè yóu yuán shàng wàng zhāo líng。",
        translation: "太平的日子里，像我这样闲散没大本事的人反倒活得有滋味，闲时爱看天上孤单的云，安静下来爱和僧人作伴。如今我就要带着任命去远方做官了，站在乐游原上，再望一望远处的皇陵。",
      }
      ],
    },
    {
      title: "赤壁 · 杜牧",
      art: 'tangshi-300:ch57',
      artPrompt: "古诗《赤壁》意境插画：折戟沉沙铁未销，自将磨洗认前朝。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "折戟沉沙铁未销，自将磨洗认前朝。\n东风不与周郎便，铜雀春深锁二乔。",
        pinyin: "zhé jǐ chén shā tiě wèi xiāo， zì jiāng mó xǐ rèn qián cháo。\ndōng fēng bù yǔ zhōu láng biàn， tóng què chūn shēn suǒ èr qiáo。",
        translation: "一支折断的戟埋在泥沙里，铁还没有烂掉，我把它磨洗干净，认出是几百年前打仗留下的东西。要是当年东风不帮周瑜的忙，那两位美丽的女子恐怕早就被锁进铜雀台里了。",
      }
      ],
    },
    {
      title: "泊秦淮 · 杜牧",
      art: 'tangshi-300:ch58',
      artPrompt: "古诗《泊秦淮》意境插画：烟笼寒水月笼沙，夜泊秦淮近酒家。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "烟笼寒水月笼沙，夜泊秦淮近酒家。\n商女不知亡国恨，隔江犹唱后庭花。",
        pinyin: "yān lóng hán shuǐ yuè lóng shā， yè bó qín huái jìn jiǔ jiā。\nshāng nǚ bù zhī wáng guó hèn， gé jiāng yóu chàng hòu tíng huā。",
        translation: "烟雾笼罩着寒冷的河水，月光洒满了沙滩，夜里我把船停在秦淮河边，靠近酒家。卖唱的姑娘不懂得亡国的悲伤，还隔着江在唱那首《后庭花》。",
      }
      ],
    },
    {
      title: "征人怨 · 柳中庸",
      art: 'tangshi-300:ch59',
      artPrompt: "古诗《征人怨》意境插画：岁岁金河复玉关，朝朝马策与刀环。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "岁岁金河复玉关，朝朝马策与刀环。\n三春白雪归青冢，万里黄河绕黑山。",
        pinyin: "suì suì jīn hé fù yù guān， zhāo zhāo mǎ cè yǔ dāo huán。\nsān chūn bái xuě guī qīng zhǒng， wàn lǐ huáng hé rào hēi shān。",
        translation: "守边的将士年年奔波在金河和玉门关之间，天天伴着马鞭和大刀过日子。到了春天还有白雪落在青青的坟头上，万里黄河绕着黑山打转。",
      }
      ],
    },
    {
      title: "金陵图 · 韦庄",
      art: 'tangshi-300:ch60',
      artPrompt: "古诗《金陵图》意境插画：谁谓伤心画不成，画人心逐世人情。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "谁谓伤心画不成，画人心逐世人情。\n君看六幅南朝事，老木寒云满故城。",
        pinyin: "shuí wèi shāng xīn huà bù chéng， huà rén xīn zhú shì rén qíng。\njūn kàn liù fú nán cháo shì， lǎo mù hán yún mǎn gù chéng。",
        translation: "谁说伤心的事画不出来呢？你看看这六幅画南朝旧事的画——老树和寒云铺满了古城，看了真叫人难过。",
      }
      ],
    },
    {
      title: "滁州西涧 · 韦应物",
      art: 'tangshi-300:ch61',
      artPrompt: "古诗《滁州西涧》意境插画：独怜幽草涧边生，上有黄鹂深树鸣。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "独怜幽草涧边生，上有黄鹂深树鸣。\n春潮带雨晚来急，野渡无人舟自横。",
        pinyin: "dú lián yōu cǎo jiàn biān shēng， shàng yǒu huáng lí shēn shù míng。\nchūn cháo dài yǔ wǎn lái jí， yě dù wú rén zhōu zì héng。",
        translation: "我最喜欢涧边悄悄生长的青草，头顶上黄鹂鸟在深深的树丛里鸣叫。傍晚春潮带着雨水涨得急急的，没有人的渡口，一条小船独自横在水面上。",
      }
      ],
    },
    {
      title: "桃花溪 · 张旭",
      art: 'tangshi-300:ch62',
      artPrompt: "古诗《桃花溪》意境插画：隐隐飞桥隔野烟，石矶西畔问渔船。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "隐隐飞桥隔野烟，石矶西畔问渔船。\n桃花尽日随流水，洞在清溪何处边。",
        pinyin: "yǐn yǐn fēi qiáo gé yě yān， shí jī xī pàn wèn yú chuán。\ntáo huā jìn rì suí liú shuǐ， dòng zài qīng xī hé chù biān。",
        translation: "隐隐约约的高桥隔着野外的烟霭，我站在大石头西边打听打鱼的船：桃花整天顺着流水漂下来，那个山洞到底在清溪的哪一边呢？",
      }
      ],
    },
    {
      title: "寄人 · 张泌",
      art: 'tangshi-300:ch63',
      artPrompt: "古诗《寄人》意境插画：别梦依依到谢家，小廊回合曲阑斜。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "别梦依依到谢家，小廊回合曲阑斜。\n多情只有春庭月，犹为离人照落花。",
        pinyin: "bié mèng yī yī dào xiè jiā， xiǎo láng huí hé qǔ lán xié。\nduō qíng zhǐ yǒu chūn tíng yuè， yóu wèi lí rén zhào luò huā。",
        translation: "离别之后，我依依不舍地在梦里又来到你家，小廊弯弯地绕着，栏杆也斜斜地曲着。多情的只有春天院子里的月亮，还为离别的人照着满地飘落的花瓣。",
      }
      ],
    },
    {
      title: "题金陵渡 · 张祜",
      art: 'tangshi-300:ch64',
      artPrompt: "古诗《题金陵渡》意境插画：金陵津渡小山楼，一宿行人自可愁。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "金陵津渡小山楼，一宿行人自可愁。\n潮落夜江斜月里，两三星火是瓜州。",
        pinyin: "jīn líng jīn dù xiǎo shān lóu， yī sù xíng rén zì kě chóu。\ncháo luò yè jiāng xié yuè lǐ， liǎng sān xīng huǒ shì guā zhōu。",
        translation: "我住在金陵渡口的小山楼上，住了一夜，心里自然生起愁绪。潮水落下去了，斜斜的月亮照着夜里的江面，远处有两三点星火，那便是瓜州。",
      }
      ],
    },
    {
      title: "赠内人 · 张祜",
      art: 'tangshi-300:ch65',
      artPrompt: "古诗《赠内人》意境插画：禁门宫树月痕过，媚眼惟看宿鹭窠。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "禁门宫树月痕过，媚眼惟看宿鹭窠。\n斜拔玉钗灯影畔，剔开红焰救飞蛾。",
        pinyin: "jìn mén gōng shù yuè hén guò， mèi yǎn wéi kàn sù lù kē。\nxié bá yù chāi dēng yǐng pàn， tī kāi hóng yàn jiù fēi é。",
        translation: "宫门边的树影上，月亮悄悄移过，宫女只用温柔的眼睛望着树上安睡的白鹭。她在灯影旁斜斜拔下玉钗，轻轻剔开灯焰，救出扑火的飞蛾。",
      }
      ],
    },
    {
      title: "集灵台·其一 · 张祜",
      art: 'tangshi-300:ch66',
      artPrompt: "古诗《集灵台·其一》意境插画：日光斜照集灵台，红树花迎晓露开。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "日光斜照集灵台，红树花迎晓露开。\n昨夜上皇新授箓，太真含笑入帘来。",
        pinyin: "rì guāng xié zhào jí líng tái， hóng shù huā yíng xiǎo lù kāi。\nzuó yè shàng huáng xīn shòu lù， tài zhēn hán xiào rù lián lái。",
        translation: "太阳斜照着集灵台，红树上的花迎着清晨的露水开放。昨夜太上皇新授了道箓，太真妃含着笑走进帘子里来。",
      }
      ],
    },
    {
      title: "集灵台·其二 · 张祜",
      art: 'tangshi-300:ch67',
      artPrompt: "古诗《集灵台·其二》意境插画：虢国夫人承主恩，平明骑马入宫门。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "虢国夫人承主恩，平明骑马入宫门。\n却嫌脂粉污颜色，淡扫蛾眉朝至尊。",
        pinyin: "guó guó fū rén chéng zhǔ ēn， píng míng qí mǎ rù gōng mén。\nquè xián zhī fěn wū yán sè， dàn sǎo é méi cháo zhì zūn。",
        translation: "虢国夫人受到皇帝的恩宠，天刚亮就骑着马进了宫门。她嫌脂粉弄脏了自己天生的好颜色，只淡淡描了描眉毛，就去朝见皇帝。",
      }
      ],
    },
    {
      title: "枫桥夜泊 · 张继",
      art: 'tangshi-300:ch68',
      artPrompt: "古诗《枫桥夜泊》意境插画：月落乌啼霜满天，江枫渔火对愁眠。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "月落乌啼霜满天，江枫渔火对愁眠。\n姑苏城外寒山寺，夜半钟声到客船。",
        pinyin: "yuè luò wū tí shuāng mǎn tiān， jiāng fēng yú huǒ duì chóu mián。\ngū sū chéng wài hán shān sì， yè bàn zhōng shēng dào kè chuán。",
        translation: "月亮落下去，乌鸦啼叫，霜气布满天空，江边的枫树和渔船上的灯火，陪着我满怀愁绪睡不着。姑苏城外的寒山寺，半夜的钟声传到了客船上。",
      }
      ],
    },
    {
      title: "陇西行 · 陈陶",
      art: 'tangshi-300:ch69',
      artPrompt: "古诗《陇西行》意境插画：誓扫匈奴不顾身，五千貂锦丧胡尘。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "誓扫匈奴不顾身，五千貂锦丧胡尘。\n可怜无定河边骨，犹是春闺梦里人！(春闺 一作：深闺)",
        pinyin: "shì sǎo xiōng nú bù gù shēn， wǔ qiān diāo jǐn sàng hú chén。\nkě lián wú dìng hé biān gǔ， yóu shì chūn guī mèng lǐ rén！( chūn guī yī zuò： shēn guī)",
        translation: "将士们发誓要扫平敌人、不顾自己的性命，五千精兵都战死在了边地的风沙里。可怜无定河边战死者的白骨，还是家中的妻子日夜梦见的那个人啊。",
      }
      ],
    },
    {
      title: "杂诗 · 佚名",
      art: 'tangshi-300:ch70',
      artPrompt: "古诗《杂诗》意境插画：近寒食雨草萋萋，著麦苗风柳映堤。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "近寒食雨草萋萋，著麦苗风柳映堤。\n等是有家归未得，杜鹃休向耳边啼。",
        pinyin: "jìn hán shí yǔ cǎo qī qī， zhù mài miáo fēng liǔ yìng dī。\nděng shì yǒu jiā guī wèi dé， dù juān xiū xiàng ěr biān tí。",
        translation: "快到寒食节了，雨中青草长得茂密，风吹着麦苗，柳树映着河堤。同样是有家却回不去的人啊，杜鹃鸟请别再在我耳边啼叫了。",
      }
      ],
    },
    {
      title: "回乡偶书·其一 · 贺知章",
      art: 'tangshi-300:ch71',
      artPrompt: "古诗《回乡偶书·其一》意境插画：少小离家老大回，乡音无改鬓毛衰。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "少小离家老大回，乡音无改鬓毛衰。\n儿童相见不相识，笑问客从何处来。",
        pinyin: "shǎo xiǎo lí jiā lǎo dà huí， xiāng yīn wú gǎi bìn máo shuāi。\nér tóng xiāng jiàn bù xiāng shí， xiào wèn kè cóng hé chù lái。",
        translation: "我小小年纪离开家乡，老了才回来，家乡的口音没有变，两鬓的头发却已经白了。孩子们看见我都不认识，笑着问：客人您是从哪里来的呀？",
      }
      ],
    },
    {
      title: "瑶瑟怨 · 温庭筠",
      art: 'tangshi-300:ch72',
      artPrompt: "古诗《瑶瑟怨》意境插画：冰簟银床梦不成，碧天如水夜云轻。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "冰簟银床梦不成，碧天如水夜云轻。\n雁声远过潇湘去，十二楼中月自明。",
        pinyin: "bīng diàn yín chuáng mèng bù chéng， bì tiān rú shuǐ yè yún qīng。\nyàn shēng yuǎn guò xiāo xiāng qù， shí èr lóu zhōng yuè zì míng。",
        translation: "凉凉的竹席、银色的床上怎么也睡不着，碧蓝的天空像水一样，夜晚的云轻轻地飘。大雁的叫声远远地飞过潇湘去了，高楼上只有月亮静静地亮着。",
      }
      ],
    },
    {
      title: "月夜 · 刘方平",
      art: 'tangshi-300:ch73',
      artPrompt: "古诗《月夜》意境插画：更深月色半人家，北斗阑干南斗斜。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "更深月色半人家，北斗阑干南斗斜。\n今夜偏知春气暖，虫声新透绿窗纱。",
        pinyin: "gèng shēn yuè sè bàn rén jiā， běi dòu lán gān nán dòu xié。\njīn yè piān zhī chūn qì nuǎn， chóng shēng xīn tòu lǜ chuāng shā。",
        translation: "夜深了，月光斜照着半个院子的人家，北斗星和南斗星都斜斜地挂着。今晚才忽然觉得春天变暖了，虫子的叫声刚刚透过绿色的窗纱传进来。",
      }
      ],
    },
    {
      title: "春怨 · 刘方平",
      art: 'tangshi-300:ch74',
      artPrompt: "古诗《春怨》意境插画：纱窗日落渐黄昏，金屋无人见泪痕。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "纱窗日落渐黄昏，金屋无人见泪痕。\n寂寞空庭春欲晚，梨花满地不开门。",
        pinyin: "shā chuāng rì luò jiàn huáng hūn， jīn wū wú rén jiàn lèi hén。\njì mò kōng tíng chūn yù wǎn， lí huā mǎn dì bù kāi mén。",
        translation: "纱窗外太阳落山，天渐渐黑了，华美的屋子里没有人看见她的泪痕。空空的院子冷冷清清，春天就要过去了，梨花落了满地，她还是不开门。",
      }
      ],
    },
    {
      title: "乌衣巷 · 刘禹锡",
      art: 'tangshi-300:ch75',
      artPrompt: "古诗《乌衣巷》意境插画：朱雀桥边野草花，乌衣巷口夕阳斜。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "朱雀桥边野草花，乌衣巷口夕阳斜。\n旧时王谢堂前燕，飞入寻常百姓家。",
        pinyin: "zhū què qiáo biān yě cǎo huā， wū yī xiàng kǒu xī yáng xié。\njiù shí wáng xiè táng qián yàn， fēi rù xún cháng bǎi xìng jiā。",
        translation: "朱雀桥边长满了野草野花，乌衣巷口夕阳斜斜地照着。从前王、谢两家大宅堂前的燕子，如今飞进了普通老百姓的家里。",
      }
      ],
    },
    {
      title: "春词 · 刘禹锡",
      art: 'tangshi-300:ch76',
      artPrompt: "古诗《春词》意境插画：新妆宜面下朱楼，深锁春光一院愁。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "新妆宜面下朱楼，深锁春光一院愁。\n行到中庭数花朵，蜻蜓飞上玉搔头。",
        pinyin: "xīn zhuāng yí miàn xià zhū lóu， shēn suǒ chūn guāng yī yuàn chóu。\nxíng dào zhōng tíng shù huā duǒ， qīng tíng fēi shàng yù sāo tóu。",
        translation: "她化好刚刚合适的新妆，走下红楼，可满院春光锁在深宅里，满是忧愁。走到院子中间数着花朵，一只蜻蜓飞上了她头上的玉簪。",
      }
      ],
    },
    {
      title: "马嵬坡 · 郑畋",
      art: 'tangshi-300:ch77',
      artPrompt: "古诗《马嵬坡》意境插画：玄宗回马杨妃死，云雨虽亡日月新。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "玄宗回马杨妃死，云雨虽亡日月新。\n终是圣明天子事，景阳宫井又何人。",
        pinyin: "xuán zōng huí mǎ yáng fēi sǐ， yún yǔ suī wáng rì yuè xīn。\nzhōng shì shèng míng tiān zǐ shì， jǐng yáng gōng jǐng yòu hé rén。",
        translation: "唐玄宗掉转马头时，杨贵妃已经死了；虽然她不在了，国家的日子从此焕然一新。这总算是圣明天子的作为，想想当年躲进景阳宫井里的又是谁呢？",
      }
      ],
    },
    {
      title: "寒食 · 韩翃",
      art: 'tangshi-300:ch78',
      artPrompt: "古诗《寒食》意境插画：春城无处不飞花，寒食东风御柳斜。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "春城无处不飞花，寒食东风御柳斜。\n日暮汉宫传蜡烛，轻烟散入五侯家。",
        pinyin: "chūn chéng wú chù bù fēi huā， hán shí dōng fēng yù liǔ xié。\nrì mù hàn gōng chuán là zhú， qīng yān sàn rù wǔ hóu jiā。",
        translation: "春天的京城到处飘飞着花瓣，寒食节的东风吹得皇宫里的柳枝轻轻歪斜。天黑了，宫里传出赏赐的蜡烛，淡淡的轻烟飘进了权贵人家。",
      }
      ],
    },
    {
      title: "已凉 · 韩偓",
      art: 'tangshi-300:ch79',
      artPrompt: "古诗《已凉》意境插画：碧阑干外绣帘垂，猩血屏风画折枝。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "碧阑干外绣帘垂，猩血屏风画折枝。\n八尺龙须方锦褥，已凉天气未寒时。",
        pinyin: "bì lán gān wài xiù lián chuí， xīng xuè píng fēng huà zhé zhī。\nbā chǐ lóng xū fāng jǐn rù， yǐ liáng tiān qì wèi hán shí。",
        translation: "碧绿的栏杆外垂着绣花的帘子，猩红色的屏风上画着折枝花卉。八尺长的龙须草席上铺着锦绣褥子，正是天气已经转凉、还没有变冷的时节。",
      }
      ],
    },
    {
      title: "宫词 · 顾况",
      art: 'tangshi-300:ch80',
      artPrompt: "古诗《宫词》意境插画：长乐宫连上苑春，玉楼金殿艳歌新。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "长乐宫连上苑春，玉楼金殿艳歌新。\n君门一入无由出，唯有宫莺得见人。",
        pinyin: "cháng lè gōng lián shàng yuàn chūn， yù lóu jīn diàn yàn gē xīn。\njūn mén yī rù wú yóu chū， wéi yǒu gōng yīng dé jiàn rén。",
        translation: "长乐宫连着御花园，满眼春色，玉楼金殿里唱着新编的歌。可是一进宫门就再也没有办法出去，只有宫里的黄莺还能见到外面的人。",
      }
      ],
    },
    {
      title: "送杜少府之任蜀州 · 王勃",
      art: 'tangshi-300:ch81',
      artPrompt: "古诗《送杜少府之任蜀州》意境插画：城阙辅三秦，风烟望五津。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "城阙辅三秦，风烟望五津。\n与君离别意，同是宦游人。\n海内存知己，天涯若比邻。\n无为在歧路，儿女共沾巾。",
        pinyin: "chéng quē fǔ sān qín， fēng yān wàng wǔ jīn。\nyǔ jūn lí bié yì， tóng shì huàn yóu rén。\nhǎi nèi cún zhī jǐ， tiān yá ruò bǐ lín。\nwú wéi zài qí lù， ér nǚ gòng zhān jīn。",
        translation: "长安城被三秦大地护卫着，隔着风烟遥望，就是你要去的蜀地渡口。和你分别时的心情是一样的，因为我们都是在外做官的人。只要四海之内有知心朋友，远在天边也像近邻一样，所以在岔路口告别，别像小儿女那样哭湿了手帕。",
      }
      ],
    },
    {
      title: "送梓州李使君 · 王维",
      art: 'tangshi-300:ch82',
      artPrompt: "古诗《送梓州李使君》意境插画：万壑树参天，千山响杜鹃。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "万壑树参天，千山响杜鹃。\n山中一夜雨，树杪百重泉。\n汉女输橦布，巴人讼芋田。\n文翁翻教授，不敢倚先贤。",
        pinyin: "wàn hè shù cān tiān， qiān shān xiǎng dù juān。\nshān zhōng yī yè yǔ， shù miǎo bǎi chóng quán。\nhàn nǚ shū tóng bù， bā rén sòng yù tián。\nwén wēng fān jiào shòu， bù gǎn yǐ xiān xián。",
        translation: "千山万谷里的大树高得顶到天，群山中到处响着杜鹃的啼叫；山里下了一整夜的雨，树梢上仿佛挂着百重清泉。那里的妇女缴纳着木棉布，巴地的人们还为芋田打官司；你去那里做官，要像文翁那样好好教化百姓，可不能倚仗着先贤就不努力呀。",
      }
      ],
    },
    {
      title: "汉江临眺 · 王维",
      art: 'tangshi-300:ch83',
      artPrompt: "古诗《汉江临眺》意境插画：楚塞三湘接，荆门九派通。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "楚塞三湘接，荆门九派通。\n江流天地外，山色有无中。\n郡邑浮前浦，波澜动远空。\n襄阳好风日，留醉与山翁。",
        pinyin: "chǔ sāi sān xiāng jiē， jīng mén jiǔ pài tōng。\njiāng liú tiān dì wài， shān sè yǒu wú zhōng。\njùn yì fú qián pǔ， bō lán dòng yuǎn kōng。\nxiāng yáng hǎo fēng rì， liú zuì yǔ shān wēng。",
        translation: "楚地的边塞连着三湘，荆门山下众多江水相通。江水流向天地之外，远山的颜色若有若无；城郭像浮在前面的水边，波涛摇晃着远处的天空。襄阳的风光这么好，我真想留下来陪你一同畅饮。",
      }
      ],
    },
    {
      title: "终南别业 · 王维",
      art: 'tangshi-300:ch84',
      artPrompt: "古诗《终南别业》意境插画：中岁颇好道，晚家南山陲。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "中岁颇好道，晚家南山陲。\n兴来每独往，胜事空自知。\n行到水穷处，坐看云起时。\n偶然值林叟，谈笑无还期。",
        pinyin: "zhōng suì pō hǎo dào， wǎn jiā nán shān chuí。\nxīng lái měi dú wǎng， shèng shì kōng zì zhī。\nxíng dào shuǐ qióng chù， zuò kàn yún qǐ shí。\nǒu rán zhí lín sǒu， tán xiào wú hái qī。",
        translation: "我中年以后就很喜爱佛理，晚年搬到终南山边来住。兴致来了常常独自出游，快乐的事只有自己心里知道。走到水的尽头，就坐下来看云慢慢升起；偶然遇见林中的老人，谈笑起来忘了回家。",
      }
      ],
    },
    {
      title: "终南山 · 王维",
      art: 'tangshi-300:ch85',
      artPrompt: "古诗《终南山》意境插画：太乙近天都，连山接海隅。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "太乙近天都，连山接海隅。\n白云回望合，青霭入看无。\n分野中峰变，阴晴众壑殊。\n欲投人处宿，隔水问樵夫。",
        pinyin: "tài yǐ jìn tiān dōu， lián shān jiē hǎi yú。\nbái yún huí wàng hé， qīng ǎi rù kàn wú。\nfēn yě zhōng fēng biàn， yīn qíng zhòng hè shū。\nyù tóu rén chù sù， gé shuǐ wèn qiáo fū。",
        translation: "终南山高得快挨着天宫，连绵的山势一直伸到海边。回头望去白云合成一片，走近了青青的雾气又看不见；中峰两侧天地各异，群谷之中有阴有晴。想找户人家投宿，只好隔着溪水去问打柴的人。",
      }
      ],
    },
    {
      title: "酬张少府 · 王维",
      art: 'tangshi-300:ch86',
      artPrompt: "古诗《酬张少府》意境插画：晚年唯好静，万事不关心。自顾无长策，空知返旧林。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "晚年唯好静，万事不关心。自顾无长策，空知返旧林。\n松风吹解带，山月照弹琴。君问穷通理，渔歌入浦深。",
        pinyin: "wǎn nián wéi hǎo jìng， wàn shì bù guān xīn。 zì gù wú cháng cè， kōng zhī fǎn jiù lín。\nsōng fēng chuī jiě dài， shān yuè zhào tán qín。 jūn wèn qióng tōng lǐ， yú gē rù pǔ shēn。",
        translation: "晚年我只喜欢清静，什么事都不放在心上了。自己想想拿不出什么好办法，只知道回到旧日的山林；松风吹着我解开的衣带，山月照着我弹琴。你问我穷困和显达的道理，我只把渔歌唱向水浦深处。",
      }
      ],
    },
    {
      title: "过香积寺 · 王维",
      art: 'tangshi-300:ch87',
      artPrompt: "古诗《过香积寺》意境插画：不知香积寺，数里入云峰。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "不知香积寺，数里入云峰。\n古木无人径，深山何处钟。\n泉声咽危石，日色冷青松。\n薄暮空潭曲，安禅制毒龙。",
        pinyin: "bù zhī xiāng jī sì， shù lǐ rù yún fēng。\ngǔ mù wú rén jìng， shēn shān hé chù zhōng。\nquán shēng yàn wēi shí， rì sè lěng qīng sōng。\nbó mù kōng tán qǔ， ān chán zhì dú lóng。",
        translation: "不知道香积寺在哪儿，走了好几里路，进了云雾缭绕的山峰。古树之间没有行人的小路，深山里不知何处传来钟声。泉水在高险的岩石间呜咽流淌，日光照着青松透出寒意；傍晚来到空寂的潭边安然打坐，降服心里的毒龙。",
      }
      ],
    },
    {
      title: "辋川闲居赠裴秀才迪 · 王维",
      art: 'tangshi-300:ch88',
      artPrompt: "古诗《辋川闲居赠裴秀才迪》意境插画：寒山转苍翠，秋水日潺湲。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "寒山转苍翠，秋水日潺湲。\n倚杖柴门外，临风听暮蝉。\n渡头余落日，墟里上孤烟。\n复值接舆醉，狂歌五柳前。",
        pinyin: "hán shān zhuǎn cāng cuì， qiū shuǐ rì chán yuán。\nyǐ zhàng chái mén wài， lín fēng tīng mù chán。\ndù tóu yú luò rì， xū lǐ shàng gū yān。\nfù zhí jiē yú zuì， kuáng gē wǔ liǔ qián。",
        translation: "秋天的寒山变得格外苍翠，秋水日日潺潺流淌。我拄着拐杖站在柴门外，迎着风听傍晚的蝉鸣；渡口边留着落日的余晖，村子里升起一缕炊烟。又赶上你喝醉了，在我家门前放声高歌。",
      }
      ],
    },
    {
      title: "山居秋暝 · 王维",
      art: 'tangshi-300:ch89',
      artPrompt: "古诗《山居秋暝》意境插画：空山新雨后，天气晚来秋。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "空山新雨后，天气晚来秋。\n明月松间照，清泉石上流。\n竹喧归浣女，莲动下渔舟。\n随意春芳歇，王孙自可留。",
        pinyin: "kōng shān xīn yǔ hòu， tiān qì wǎn lái qiū。\nmíng yuè sōng jiān zhào， qīng quán shí shàng liú。\nzhú xuān guī huàn nǚ， lián dòng xià yú zhōu。\nsuí yì chūn fāng xiē， wáng sūn zì kě liú。",
        translation: "空旷的群山刚下过一场新雨，傍晚的天气带来了秋意。明月照进松林，清泉在石上流过；竹林里传来喧笑，是洗衣的姑娘回来了，莲叶摇动，是打渔的小船顺流而下。任凭春天的花草凋谢吧，我只愿留在这山中。",
      }
      ],
    },
    {
      title: "归嵩山作 · 王维",
      art: 'tangshi-300:ch90',
      artPrompt: "古诗《归嵩山作》意境插画：清川带长薄，车马去闲闲。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "清川带长薄，车马去闲闲。\n流水如有意，暮禽相与还。\n荒城临古渡，落日满秋山。\n迢递嵩高下，归来且闭关。",
        pinyin: "qīng chuān dài cháng báo， chē mǎ qù xián xián。\nliú shuǐ rú yǒu yì， mù qín xiāng yǔ hái。\nhuāng chéng lín gǔ dù， luò rì mǎn qiū shān。\ntiáo dì sōng gāo xià， guī lái qiě bì guān。",
        translation: "清清的河水绕着长长的草木，我的车马悠闲地前行。流水好像有情送我，傍晚的鸟儿也和我一同归去；荒凉的城挨着古老的渡口，落日的余晖铺满秋山。在遥远的嵩山脚下，回来后我就关门谢客，安心隐居。",
      }
      ],
    },
    {
      title: "次北固山下 · 王湾",
      art: 'tangshi-300:ch91',
      artPrompt: "古诗《次北固山下》意境插画：客路青山外，行舟绿水前。(青山外 一作：青山下)——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "客路青山外，行舟绿水前。(青山外 一作：青山下)\n潮平两岸阔，风正一帆悬。\n海日生残夜，江春入旧年。\n乡书何处达？归雁洛阳边。",
        pinyin: "kè lù qīng shān wài， xíng zhōu lǜ shuǐ qián。( qīng shān wài yī zuò： qīng shān xià)\ncháo píng liǎng àn kuò， fēng zhèng yī fān xuán。\nhǎi rì shēng cán yè， jiāng chūn rù jiù nián。\nxiāng shū hé chù dá？ guī yàn luò yáng biān。",
        translation: "旅客的路伸到青山之外，船儿在绿水上游行。潮水上涨，两岸显得开阔，顺风正好，一面帆高高悬挂；太阳从残夜中升起，江上的春天闯进了旧年。家书要寄到哪里呢？希望北归的大雁把它带到洛阳。",
      }
      ],
    },
    {
      title: "云阳馆与韩绅宿别 · 司空曙",
      art: 'tangshi-300:ch92',
      artPrompt: "古诗《云阳馆与韩绅宿别》意境插画：故人江海别，几度隔山川。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "故人江海别，几度隔山川。\n乍见翻疑梦，相悲各问年。\n孤灯寒照雨，深竹暗浮烟。\n更有明朝恨，离杯惜共传。",
        pinyin: "gù rén jiāng hǎi bié， jǐ dù gé shān chuān。\nzhà jiàn fān yí mèng， xiāng bēi gè wèn nián。\ngū dēng hán zhào yǔ， shēn zhú àn fú yān。\ngèng yǒu míng cháo hèn， lí bēi xī gòng chuán。",
        translation: "老朋友自从江海一别，多少年了隔着山山水水。猛然相见反而疑心是在梦里，又悲又喜地互相询问年岁。孤灯在寒夜照着细雨，深竹林里浮着暗暗的烟；想到明天又要分别，我们珍重地共同举杯。",
      }
      ],
    },
    {
      title: "喜外弟卢纶见宿 · 司空曙",
      art: 'tangshi-300:ch93',
      artPrompt: "古诗《喜外弟卢纶见宿》意境插画：静夜四无邻，荒居旧业贫。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "静夜四无邻，荒居旧业贫。\n雨中黄叶树，灯下白头人。\n以我独沉久，愧君相见频。\n平生自有分，况是蔡家亲。",
        pinyin: "jìng yè sì wú lín， huāng jū jiù yè pín。\nyǔ zhōng huáng yè shù， dēng xià bái tóu rén。\nyǐ wǒ dú chén jiǔ， kuì jūn xiāng jiàn pín。\npíng shēng zì yǒu fēn， kuàng shì cài jiā qīn。",
        translation: "静静的夜里四周没有邻居，我这荒旧的住处显出一贫如洗。雨中的树上挂着黄叶，灯光下坐着我这白头的人。因为我孤独失意得太久了，惭愧你这样常常来看我；我们平生自有缘分，何况还是表亲呢。",
      }
      ],
    },
    {
      title: "贼平后送人北归 · 司空曙",
      art: 'tangshi-300:ch94',
      artPrompt: "古诗《贼平后送人北归》意境插画：世乱同南去，时清独北还。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "世乱同南去，时清独北还。\n他乡生白发，旧国见青山。\n晓月过残垒，繁星宿故关。\n寒禽与衰草，处处伴愁颜。",
        pinyin: "shì luàn tóng nán qù， shí qīng dú běi hái。\ntā xiāng shēng bái fà， jiù guó jiàn qīng shān。\nxiǎo yuè guò cán lěi， fán xīng xiù gù guān。\nhán qín yǔ shuāi cǎo， chù chù bàn chóu yán。",
        translation: "战乱时我们一起逃到南方，太平了你独自返回北方。在异乡熬白了头发，回去将重新见到故乡的青山。你会在晓月下经过残破的营垒，在繁星下露宿在老关口；一路只有寒鸟和衰草，处处陪伴着你愁苦的面容。",
      }
      ],
    },
    {
      title: "赋得古原草送别 · 白居易",
      art: 'tangshi-300:ch95',
      artPrompt: "古诗《赋得古原草送别》意境插画：离离原上草，一岁一枯荣。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "离离原上草，一岁一枯荣。\n野火烧不尽，春风吹又生。\n远芳侵古道，晴翠接荒城。\n又送王孙去，萋萋满别情。",
        pinyin: "lí lí yuán shàng cǎo， yī suì yī kū róng。\nyě huǒ shāo bù jìn， chūn fēng chuī yòu shēng。\nyuǎn fāng qīn gǔ dào， qíng cuì jiē huāng chéng。\nyòu sòng wáng sūn qù， qī qī mǎn bié qíng。",
        translation: "原野上的草长得密密层层，每年都有一次枯黄、一次繁茂。野火烧不尽它，春风一吹它又长出来；远处的芳草蔓上古老的道路，晴日里的翠绿连接着荒城。又要送朋友远行了，这茂密的青草仿佛都充满了离别的深情。",
      }
      ],
    },
    {
      title: "题大庾岭北驿 · 宋之问",
      art: 'tangshi-300:ch96',
      artPrompt: "古诗《题大庾岭北驿》意境插画：阳月南飞雁，传闻至此回。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "阳月南飞雁，传闻至此回。\n我行殊未已，何日复归来。\n江静潮初落，林昏瘴不开。\n明朝望乡处，应见陇头梅。",
        pinyin: "yáng yuè nán fēi yàn， chuán wén zhì cǐ huí。\nwǒ xíng shū wèi yǐ， hé rì fù guī lái。\njiāng jìng cháo chū luò， lín hūn zhàng bù kāi。\nmíng cháo wàng xiāng chù， yìng jiàn lǒng tóu méi。",
        translation: "十月里南飞的大雁，听说飞到这里就要往回转。可我的行程还没有走完，不知道哪一天才能回来。江面平静，潮水刚刚退落，树林昏暗，瘴气散不开；明天早晨站在望乡的地方，应该能看见山岭上的梅花。",
      }
      ],
    },
    {
      title: "寄左省杜拾遗 · 岑参",
      art: 'tangshi-300:ch97',
      artPrompt: "古诗《寄左省杜拾遗》意境插画：联步趋丹陛，分曹限紫微。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "联步趋丹陛，分曹限紫微。\n晓随天仗入，暮惹御香归。\n白发悲花落，青云羡鸟飞。\n圣朝无阙事，自觉谏书稀。",
        pinyin: "lián bù qū dān bì， fēn cáo xiàn zǐ wēi。\nxiǎo suí tiān zhàng rù， mù rě yù xiāng guī。\nbái fà bēi huā luò， qīng yún xiàn niǎo fēi。\nshèng cháo wú quē shì， zì jué jiàn shū xī。",
        translation: "我们并排快步走上红色的宫殿台阶，又在各自的官署里当值。清晨跟着仪仗进宫，傍晚带着御炉的香气回家；白发对着落花悲伤，仰望青天羡慕鸟儿自由飞翔。圣明的朝廷没有什么缺失的事，我也觉得劝谏的奏章越来越少了。",
      }
      ],
    },
    {
      title: "听蜀僧浚弹琴 · 李白",
      art: 'tangshi-300:ch98',
      artPrompt: "古诗《听蜀僧浚弹琴》意境插画：蜀僧抱绿绮，西下峨眉峰。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "蜀僧抱绿绮，西下峨眉峰。\n为我一挥手，如听万壑松。\n客心洗流水，余响入霜钟。\n不觉碧山暮，秋云暗几重。",
        pinyin: "shǔ sēng bào lǜ qǐ， xī xià é méi fēng。\nwèi wǒ yī huī shǒu， rú tīng wàn hè sōng。\nkè xīn xǐ liú shuǐ， yú xiǎng rù shuāng zhōng。\nbù jué bì shān mù， qiū yún àn jǐ chóng。",
        translation: "四川来的僧人抱着名琴，从峨眉山那边下来。他为我挥手弹奏一曲，就像听见千山万谷中松涛阵阵。琴声像流水洗过我的心，余音伴着山寺的钟声回荡；不知不觉青山已经暮色四合，秋天的云又暗了几重。",
      }
      ],
    },
    {
      title: "夜泊牛渚怀古 · 李白",
      art: 'tangshi-300:ch99',
      artPrompt: "古诗《夜泊牛渚怀古》意境插画：牛渚西江夜，青天无片云。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "牛渚西江夜，青天无片云。\n登舟望秋月，空忆谢将军。\n余亦能高咏，斯人不可闻。\n明朝挂帆席，枫叶落纷纷。(挂帆\n一作：去)",
        pinyin: "niú zhǔ xī jiāng yè， qīng tiān wú piàn yún。\ndēng zhōu wàng qiū yuè， kōng yì xiè jiāng jūn。\nyú yì néng gāo yǒng， sī rén bù kě wén。\nmíng cháo guà fān xí， fēng yè luò fēn fēn。( guà fān\nyī zuò： qù)",
        translation: "夜晚船停在牛渚山旁的西江上，青天上没有一丝云。登上船仰望秋天的明月，空自想起那位爱惜人才的谢将军；我也会放声吟咏，可惜再遇不到那样听得懂的人。明天一早挂起船帆离开，枫叶正纷纷飘落。",
      }
      ],
    },
    {
      title: "赠孟浩然 · 李白",
      art: 'tangshi-300:ch100',
      artPrompt: "古诗《赠孟浩然》意境插画：吾爱孟夫子，风流天下闻。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "吾爱孟夫子，风流天下闻。\n红颜弃轩冕，白首卧松云。\n醉月频中圣，迷花不事君。\n高山安可仰，徒此揖清芬。",
        pinyin: "wú ài mèng fū zǐ， fēng liú tiān xià wén。\nhóng yán qì xuān miǎn， bái shǒu wò sōng yún。\nzuì yuè pín zhōng shèng， mí huā bù shì jūn。\ngāo shān ān kě yǎng， tú cǐ yī qīng fēn。",
        translation: "我敬爱的孟先生，潇洒的风度天下闻名。年纪轻轻就抛开官车官帽，到白头还卧在松风白云之间；月下常常喝得畅快，陶醉于花草不肯去做官。像高山一样让人仰慕不尽，我只能向你拱手行礼，敬你一身清雅的芬芳。",
      }
      ],
    },
    {
      title: "渡荆门送别 · 李白",
      art: 'tangshi-300:ch101',
      artPrompt: "古诗《渡荆门送别》意境插画：渡远荆门外，来从楚国游。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "渡远荆门外，来从楚国游。\n山随平野尽，江入大荒流。\n月下飞天镜，云生结海楼。\n仍怜故乡水，万里送行舟。",
        pinyin: "dù yuǎn jīng mén wài， lái cóng chǔ guó yóu。\nshān suí píng yě jìn， jiāng rù dà huāng liú。\nyuè xià fēi tiān jìng， yún shēng jié hǎi lóu。\nréng lián gù xiāng shuǐ， wàn lǐ sòng xíng zhōu。",
        translation: "乘船远远过了荆门山，来到楚地漫游。山峦随着平原的出现渐渐消失，江水流入广阔的原野；月影映在江中像天上飞下的明镜，云彩层层叠起像海上的楼阁。我最爱这来自故乡的江水，不远万里，一路送着我的行船。",
      }
      ],
    },
    {
      title: "送友人 · 李白",
      art: 'tangshi-300:ch102',
      artPrompt: "古诗《送友人》意境插画：青山横北郭，白水绕东城。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "青山横北郭，白水绕东城。\n此地一为别，孤蓬万里征。\n浮云游子意，落日故人情。\n挥手自兹去，萧萧班马鸣。",
        pinyin: "qīng shān héng běi guō， bái shuǐ rào dōng chéng。\ncǐ dì yī wèi bié， gū péng wàn lǐ zhēng。\nfú yún yóu zǐ yì， luò rì gù rén qíng。\nhuī shǒu zì zī qù， xiāo xiāo bān mǎ míng。",
        translation: "青山横亘在城郭的北面，白水环绕着城的东边。在这儿一分别，你就像孤单的蓬草踏上万里旅程；天上的浮云飘忽，像游子的心绪，将落的夕阳迟迟不去，像老朋友的深情。挥手从此告别，连马儿也萧萧嘶鸣，不肯离去。",
      }
      ],
    },
    {
      title: "喜见外弟又言别 · 李益",
      art: 'tangshi-300:ch103',
      artPrompt: "古诗《喜见外弟又言别》意境插画：十年离乱后，长大一相逢。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "十年离乱后，长大一相逢。\n问姓惊初见，称名忆旧容。\n别来沧海事，语罢暮天钟。\n明日巴陵道，秋山又几重。",
        pinyin: "shí nián lí luàn hòu， zhǎng dà yī xiāng féng。\nwèn xìng jīng chū jiàn， chēng míng yì jiù róng。\nbié lái cāng hǎi shì， yǔ bà mù tiān zhōng。\nmíng rì bā líng dào， qiū shān yòu jǐ chóng。",
        translation: "经过十年战乱分离，我们都长大了才相逢。初见时问起姓氏吃了一惊，说出名字才认出从前的面容；说起分别这些年的沧桑变化，说到傍晚寺里的钟声都响了。明天你又要走上巴陵的道路，秋天的山，又要重重地隔开我们。",
      }
      ],
    },
    {
      title: "凉思 · 李商隐",
      art: 'tangshi-300:ch104',
      artPrompt: "古诗《凉思》意境插画：客去波平槛，蝉休露满枝。永怀当此节，倚立自移时。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "客去波平槛，蝉休露满枝。永怀当此节，倚立自移时。\n北斗兼春远，南陵寓使迟。天涯占梦数，疑误有新知。",
        pinyin: "kè qù bō píng kǎn， chán xiū lù mǎn zhī。 yǒng huái dāng cǐ jié， yǐ lì zì yí shí。\nběi dòu jiān chūn yuǎn， nán líng yù shǐ chí。 tiān yá zhàn mèng shù， yí wù yǒu xīn zhī。",
        translation: "客人走后，池水涨得和栏杆一样平，蝉声停了，露水挂满了枝头。在这个时节我久久地想念你，靠着栏杆站了好久好久。你在很远很远的地方，捎来的信总是很迟，我一次次做梦猜来猜去，还担心你是不是有了新朋友，把我忘记了。",
      }
      ],
    },
    {
      title: "北青萝 · 李商隐",
      art: 'tangshi-300:ch105',
      artPrompt: "古诗《北青萝》意境插画：残阳西入崦，茅屋访孤僧。落叶人何在，寒云路几层。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "残阳西入崦，茅屋访孤僧。落叶人何在，寒云路几层。\n独敲初夜磬，闲倚一枝藤。世界微尘里，吾宁爱与憎。",
        pinyin: "cán yáng xī rù yān， máo wū fǎng gū sēng。 luò yè rén hé zài， hán yún lù jǐ céng。\ndú qiāo chū yè qìng， xián yǐ yī zhī téng。 shì jiè wēi chén lǐ， wú níng ài yǔ zēng。",
        translation: "太阳落山的时候，我去山里茅屋看望一位孤独的僧人。落叶纷纷，不知人在哪里；寒云层层，不知路有多少层。傍晚他独自敲着磬，悠闲地靠着一根藤杖，说世界小得像一粒微尘，何必还计较什么爱和恨呢。",
      }
      ],
    },
    {
      title: "蝉 · 李商隐",
      art: 'tangshi-300:ch106',
      artPrompt: "古诗《蝉》意境插画：本以高难饱，徒劳恨费声。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "本以高难饱，徒劳恨费声。\n五更疏欲断，一树碧无情。\n薄宦梗犹泛，故园芜已平。\n烦君最相警，我亦举家清。",
        pinyin: "běn yǐ gāo nán bǎo， tú láo hèn fèi shēng。\nwǔ gēng shū yù duàn， yī shù bì wú qíng。\nbáo huàn gěng yóu fàn， gù yuán wú yǐ píng。\nfán jūn zuì xiāng jǐng， wǒ yì jǔ jiā qīng。",
        translation: "蝉住在高高的树上，只喝露水难以吃饱，叫得再多也是白费力气；天快亮时叫声快要断了，满树的叶子碧绿碧绿，却没有一点同情。我做个小官像木头一样四处漂泊，家乡的田园都荒平了。多谢蝉一声声提醒我，我全家也和它一样清清苦苦。",
      }
      ],
    },
    {
      title: "风雨 · 李商隐",
      art: 'tangshi-300:ch107',
      artPrompt: "古诗《风雨》意境插画：凄凉宝剑篇，羁泊欲穷年。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "凄凉宝剑篇，羁泊欲穷年。\n黄叶仍风雨，青楼自管弦。\n新知遭薄俗，旧好隔良缘。\n心断新丰酒，销愁斗几千。",
        pinyin: "qī liáng bǎo jiàn piān， jī bó yù qióng nián。\nhuáng yè réng fēng yǔ， qīng lóu zì guǎn xián。\nxīn zhī zāo báo sú， jiù hǎo gé liáng yuán。\nxīn duàn xīn fēng jiǔ， xiāo chóu dòu jǐ qiān。",
        translation: "读着那篇凄凉的文章，我一年到头漂泊在外回不了家。黄叶还在风雨里飘落，高楼里却自顾自地奏乐唱歌。新朋友被世态冷落，老朋友又隔断了缘分，我满心愁闷，只想买来好酒，痛痛快快把愁浇走。",
      }
      ],
    },
    {
      title: "落花 · 李商隐",
      art: 'tangshi-300:ch108',
      artPrompt: "古诗《落花》意境插画：高阁客竟去，小园花乱飞。参差连曲陌，迢递送斜晖。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "高阁客竟去，小园花乱飞。参差连曲陌，迢递送斜晖。\n肠断未忍扫，眼穿仍欲归。芳心向春尽，所得是沾衣。",
        pinyin: "gāo gé kè jìng qù， xiǎo yuán huā luàn fēi。 cēn cī lián qǔ mò， tiáo dì sòng xié huī。\ncháng duàn wèi rěn sǎo， yǎn chuān réng yù guī。 fāng xīn xiàng chūn jìn， suǒ dé shì zhān yī。",
        translation: "高阁上的客人终于走了，小园里的花纷纷乱飞。落花参差不齐地铺满弯弯的小路，远远地送着西下的太阳。我伤心得舍不得扫掉它们，望穿了眼睛盼春天回来，可是春天过完，花只留下沾在我衣裳上的花瓣。",
      }
      ],
    },
    {
      title: "登岳阳楼 · 杜甫",
      art: 'tangshi-300:ch109',
      artPrompt: "古诗《登岳阳楼》意境插画：昔闻洞庭水，今上岳阳楼。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "昔闻洞庭水，今上岳阳楼。\n吴楚东南坼，乾坤日夜浮。\n亲朋无一字，老病有孤舟。\n戎马关山北，凭轩涕泗流。",
        pinyin: "xī wén dòng tíng shuǐ， jīn shàng yuè yáng lóu。\nwú chǔ dōng nán chè， qián kūn rì yè fú。\nqīn péng wú yī zì， lǎo bìng yǒu gū zhōu。\nróng mǎ guān shān běi， píng xuān tì sì liú。",
        translation: "从前只听说过洞庭湖的大水，今天我终于登上了岳阳楼。大水把吴楚两地分成东西，日月星辰都好像浮在水面上。亲戚朋友一个音信也没有，我又老又病，只有一条孤舟；北方还在打仗，我靠着栏杆忍不住流下眼泪。",
      }
      ],
    },
    {
      title: "奉济驿重送严公四韵 · 杜甫",
      art: 'tangshi-300:ch110',
      artPrompt: "古诗《奉济驿重送严公四韵》意境插画：远送从此别，青山空复情。几时杯重把，昨夜月同行。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "远送从此别，青山空复情。几时杯重把，昨夜月同行。\n列郡讴歌惜，三朝出入荣。江村独归处，寂寞养残生。",
        pinyin: "yuǎn sòng cóng cǐ bié， qīng shān kōng fù qíng。 jǐ shí bēi zhòng bǎ， zuó yè yuè tóng háng。\nliè jùn ōu gē xī， sān cháo chū rù róng。 jiāng cūn dú guī chù， jì mò yǎng cán shēng。",
        translation: "远远地送你到这里就要分别了，连青山也白白地替我含着不舍的情意。什么时候才能再和你举杯共饮？昨夜我们还一起在月光下同行。各地百姓都歌颂你、舍不得你，我独自回到江边的村子，冷冷清清度过余生。",
      }
      ],
    },
    {
      title: "别房太尉墓 · 杜甫",
      art: 'tangshi-300:ch111',
      artPrompt: "古诗《别房太尉墓》意境插画：他乡复行役，驻马别孤坟。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "他乡复行役，驻马别孤坟。\n近泪无干土，低空有断云。\n对棋陪谢傅，把剑觅徐君。\n唯见林花落，莺啼送客闻。",
        pinyin: "tā xiāng fù xíng yì， zhù mǎ bié gū fén。\njìn lèi wú gān tǔ， dī kōng yǒu duàn yún。\nduì qí péi xiè fù， bǎ jiàn mì xú jūn。\nwéi jiàn lín huā luò， yīng tí sòng kè wén。",
        translation: "我又在外地奔波，停下马，在你孤零零的坟前告别。眼泪直流，近处的泥土没有一块是干的，低低的天空飘着断碎的云。想起从前陪你下棋，如今我带着剑来寻访你；只见林中花儿飘落，黄莺的啼声一路送着离去的客人。",
      }
      ],
    },
    {
      title: "旅夜书怀 · 杜甫",
      art: 'tangshi-300:ch112',
      artPrompt: "古诗《旅夜书怀》意境插画：细草微风岸，危樯独夜舟。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "细草微风岸，危樯独夜舟。\n星垂平野阔，月涌大江流。\n名岂文章著，官应老病休。\n飘飘何所似，天地一沙鸥。",
        pinyin: "xì cǎo wēi fēng àn， wēi qiáng dú yè zhōu。\nxīng chuí píng yě kuò， yuè yǒng dà jiāng liú。\nmíng qǐ wén zhāng zhù， guān yìng lǎo bìng xiū。\npiāo piāo hé suǒ sì， tiān dì yī shā ōu。",
        translation: "微风拂着岸边的细草，夜里高高的桅杆下只泊着我一条孤舟；星星低垂，平野格外开阔，月亮涌动，大江滚滚奔流。名声哪里是靠文章得来的？做官也因为年老多病罢了休。飘飘荡荡的我，就像天地间一只小小的沙鸥。",
      }
      ],
    },
    {
      title: "至德二载甫自京金光门 · 杜甫",
      art: 'tangshi-300:ch113',
      artPrompt: "古诗《至德二载甫自京金光门》意境插画：此道昔归顺，西郊胡正繁。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "此道昔归顺，西郊胡正繁。\n至今残破胆，应有未招魂。\n近得归京邑，移官岂至尊。\n无才日衰老，驻马望千门。",
        pinyin: "cǐ dào xī guī shùn， xī jiāo hú zhèng fán。\nzhì jīn cán pò dǎn， yīng yǒu wèi zhāo hún。\njìn dé guī jīng yì， yí guān qǐ zhì zūn。\nwú cái rì shuāi lǎo， zhù mǎ wàng qiān mén。",
        translation: "从前我走这条路偷偷赶回京城，那时西郊的胡兵正闹得凶。直到今天想起来还心惊胆战，魂魄好像还没能招回来。如今有幸回到京城，调离官职又哪能怪皇帝呢；我没有才能，一天天衰老，停马回望千重宫门，心里真舍不得。",
      }
      ],
    },
    {
      title: "月夜忆舍弟 · 杜甫",
      art: 'tangshi-300:ch114',
      artPrompt: "古诗《月夜忆舍弟》意境插画：戍鼓断人行，边秋一雁声。(边秋 一作:秋边)——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "戍鼓断人行，边秋一雁声。(边秋 一作:秋边)\n露从今夜白，月是故乡明。\n有弟皆分散，无家问死生。\n寄书长不达，况乃未休兵。",
        pinyin: "shù gǔ duàn rén xíng， biān qiū yī yàn shēng。( biān qiū yī zuò: qiū biān)\nlù cóng jīn yè bái， yuè shì gù xiāng míng。\nyǒu dì jiē fēn sàn， wú jiā wèn sǐ shēng。\njì shū cháng bù dá， kuàng nǎi wèi xiū bīng。",
        translation: "戍楼的鼓声一响，路上就断了行人，边塞的秋天传来一声孤雁叫。露水从今夜起变得更白，月亮还是故乡的最亮。兄弟们各自离散，连家都没有了，上哪儿去打听他们是死是活呢？寄出的信常常到不了，何况战火还没有停息。",
      }
      ],
    },
    {
      title: "天末怀李白 · 杜甫",
      art: 'tangshi-300:ch115',
      artPrompt: "古诗《天末怀李白》意境插画：凉风起天末，君子意如何。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "凉风起天末，君子意如何。\n鸿雁几时到，江湖秋水多。\n文章憎命达，魑魅喜人过。\n应共冤魂语，投诗赠汨罗。",
        pinyin: "liáng fēng qǐ tiān mò， jūn zǐ yì rú hé。\nhóng yàn jǐ shí dào， jiāng hú qiū shuǐ duō。\nwén zhāng zēng mìng dá， chī mèi xǐ rén guò。\nyìng gòng yuān hún yǔ， tóu shī zèng mì luó。",
        translation: "凉风从天边吹来，不知道你这时心情怎么样。大雁什么时候才能把信捎到？江湖上秋水漫漫，风浪那么多。会写文章的人偏偏命途多坎坷，你该是和含冤的屈原说了话，把诗投进汨罗江送给他了吧。",
      }
      ],
    },
    {
      title: "月夜 · 杜甫",
      art: 'tangshi-300:ch116',
      artPrompt: "古诗《月夜》意境插画：今夜鄜州月，闺中只独看。遥怜小儿女，未解忆长安。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "今夜鄜州月，闺中只独看。遥怜小儿女，未解忆长安。\n香雾云鬟湿，清辉玉臂寒。何时倚虚幌，双照泪痕干。",
        pinyin: "jīn yè fū zhōu yuè， guī zhōng zhī dú kàn。 yáo lián xiǎo ér nǚ， wèi jiě yì cháng ān。\nxiāng wù yún huán shī， qīng huī yù bì hán。 hé shí yǐ xū huǎng， shuāng zhào lèi hén gān。",
        translation: "今夜鄜州的月亮，妻子一个人在闺房里看。可怜远方的小儿女，还不懂得想念在长安的爸爸。夜雾打湿了她的头发，月光让她玉一样的手臂发凉；什么时候才能一起靠着薄薄的窗帘，让月光把两人的泪痕照干呢。",
      }
      ],
    },
    {
      title: "春望 · 杜甫",
      art: 'tangshi-300:ch117',
      artPrompt: "古诗《春望》意境插画：国破山河在，城春草木深。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "国破山河在，城春草木深。\n感时花溅泪，恨别鸟惊心。\n烽火连三月，家书抵万金。\n白头搔更短，浑欲不胜簪。",
        pinyin: "guó pò shān hé zài， chéng chūn cǎo mù shēn。\ngǎn shí huā jiàn lèi， hèn bié niǎo jīng xīn。\nfēng huǒ lián sān yuè， jiā shū dǐ wàn jīn。\nbái tóu sāo gèng duǎn， hún yù bù shèng zān。",
        translation: "国都破了，山河还在，春天的城里草木长得深深的；感伤时局，看见花开也想落泪，怨恨离别，听见鸟叫也心里发惊。战火连着烧了三个月，一封家书抵得上万两黄金。白头发越搔越短，简直要插不住簪子了。",
      }
      ],
    },
    {
      title: "春宿左省 · 杜甫",
      art: 'tangshi-300:ch118',
      artPrompt: "古诗《春宿左省》意境插画：花隐掖垣暮，啾啾栖鸟过。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "花隐掖垣暮，啾啾栖鸟过。\n星临万户动，月傍九霄多。\n不寝听金钥，因风想玉珂。\n明朝有封事，数问夜如何。",
        pinyin: "huā yǐn yè yuán mù， jiū jiū qī niǎo guò。\nxīng lín wàn hù dòng， yuè bàng jiǔ xiāo duō。\nbù qǐn tīng jīn yào， yīn fēng xiǎng yù kē。\nmíng cháo yǒu fēng shì， shù wèn yè rú hé。",
        translation: "傍晚，花朵隐没在宫墙边，栖宿的鸟儿啾啾地飞过。星光下千家万户好像都在闪动，月亮挨着高高的九重天。我睡不着，好像听见开宫门的钥匙声，又听着风响想起上朝的马饰；明天一早要上书奏事，所以一遍遍问：夜到什么时候了？",
      }
      ],
    },
    {
      title: "旅宿 · 杜牧",
      art: 'tangshi-300:ch119',
      artPrompt: "古诗《旅宿》意境插画：旅馆无良伴，凝情自悄然。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "旅馆无良伴，凝情自悄然。\n寒灯思旧事，断雁警愁眠。\n远梦归侵晓，家书到隔年。\n沧江好烟月，门系钓鱼船。",
        pinyin: "lǚ guǎn wú liáng bàn， níng qíng zì qiǎo rán。\nhán dēng sī jiù shì， duàn yàn jǐng chóu mián。\nyuǎn mèng guī qīn xiǎo， jiā shū dào gé nián。\ncāng jiāng hǎo yān yuè， mén xì diào yú chuán。",
        translation: "旅馆里没有好伙伴，我静悄悄地坐着发闷。对着寒灯想起旧事，孤雁的一声鸣叫惊醒了满怀愁绪的我。梦做得再远，也要到天快亮才回到家；家书要隔上一年才能收到。眼前沧江的烟月这么美，门外正好拴着一条钓鱼船。",
      }
      ],
    },
    {
      title: "春宫怨 · 杜荀鹤",
      art: 'tangshi-300:ch120',
      artPrompt: "古诗《春宫怨》意境插画：早被婵娟误，欲妆临镜慵。承恩不在貌，教妾若为容。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "早被婵娟误，欲妆临镜慵。承恩不在貌，教妾若为容。\n风暖鸟声碎，日高花影重。年年越溪女，相忆采芙蓉。",
        pinyin: "zǎo bèi chán juān wù， yù zhuāng lín jìng yōng。 chéng ēn bù zài mào， jiào qiè ruò wèi róng。\nfēng nuǎn niǎo shēng suì， rì gāo huā yǐng zhòng。 nián nián yuè xī nǚ， xiāng yì cǎi fú róng。",
        translation: "很早就因为长得美丽被选进宫，反而耽误了自己；想打扮，对着镜子又懒懒的没心思。得宠原来不靠容貌，那我该为谁梳妆呢？暖风里鸟声细碎，太阳升高了，花影一层又一层。我年年想念越溪边的女伴，想起从前一起采莲的快乐。",
      }
      ],
    },
    {
      title: "和晋陵陆丞早春游望 · 杜审言",
      art: 'tangshi-300:ch121',
      artPrompt: "古诗《和晋陵陆丞早春游望》意境插画：独有宦游人，偏惊物候新。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "独有宦游人，偏惊物候新。\n云霞出海曙，梅柳渡江春。\n淑气催黄鸟，晴光转绿苹。\n忽闻歌古调，归思欲沾巾。",
        pinyin: "dú yǒu huàn yóu rén， piān jīng wù hòu xīn。\nyún xiá chū hǎi shǔ， méi liǔ dù jiāng chūn。\nshū qì cuī huáng niǎo， qíng guāng zhuǎn lǜ píng。\nhū wén gē gǔ tiáo， guī sī yù zhān jīn。",
        translation: "只有在外地做官的人，才特别会被新春景色的变化惊动心弦。云霞从海上升起，天亮了；梅树柳树一过江，春天就来了。暖和的天气催着黄莺鸣叫，晴朗的阳光把水里的绿苹照得发亮。忽然听到您这首格调古朴的诗，思乡的眼泪都快落下来了。",
      }
      ],
    },
    {
      title: "杂诗三首·其三 · 沈佺期",
      art: 'tangshi-300:ch122',
      artPrompt: "古诗《杂诗三首·其三》意境插画：闻道黄龙戍，频年不解兵。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "闻道黄龙戍，频年不解兵。\n可怜闺里月，长在汉家营。\n少妇今春意，良人昨夜情。\n谁能将旗鼓，一为取龙城。",
        pinyin: "wén dào huáng lóng shù， pín nián bù jiě bīng。\nkě lián guī lǐ yuè， cháng zài hàn jiā yíng。\nshào fù jīn chūn yì， liáng rén zuó yè qíng。\nshuí néng jiāng qí gǔ， yī wèi qǔ lóng chéng。",
        translation: "听说黄龙城那边，一连好多年都不停战。可怜闺房里的月亮，一年年长久地照着出征人的军营。少妇今年春天的思念，就是丈夫昨夜的梦里之情。谁能带领大军，一举打下龙城，好让他们回家团圆呢。",
      }
      ],
    },
    {
      title: "宿桐庐江寄广陵旧游 · 孟浩然",
      art: 'tangshi-300:ch123',
      artPrompt: "古诗《宿桐庐江寄广陵旧游》意境插画：山暝闻猿愁，沧江急夜流。(闻 一作：听)——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "山暝闻猿愁，沧江急夜流。(闻 一作：听)\n风鸣两岸叶，月照一孤舟。\n建德非吾土，维扬忆旧游。\n还将两行泪，遥寄海西头。",
        pinyin: "shān míng wén yuán chóu， cāng jiāng jí yè liú。( wén yī zuò： tīng)\nfēng míng liǎng àn yè， yuè zhào yī gū zhōu。\njiàn dé fēi wú tǔ， wéi yáng yì jiù yóu。\nhái jiāng liǎng háng lèi， yáo jì hǎi xī tóu。",
        translation: "山色昏暗，听见猿猴愁切的叫声，江水在夜里急急地流。风吹得两岸树叶沙沙响，月光照着一条孤零零的小船。建德不是我的家乡，我想念扬州的老朋友；就把这两行眼泪，远远地寄到海的那一头吧。",
      }
      ],
    },
    {
      title: "留别王维 · 孟浩然",
      art: 'tangshi-300:ch124',
      artPrompt: "古诗《留别王维》意境插画：寂寂竟何待，朝朝空自归。欲寻芳草去，惜与故人违。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "寂寂竟何待，朝朝空自归。欲寻芳草去，惜与故人违。\n当路谁相假，知音世所稀。只应守寂寞，还掩故园扉。",
        pinyin: "jì jì jìng hé dài， zhāo zhāo kōng zì guī。 yù xún fāng cǎo qù， xī yǔ gù rén wéi。\ndāng lù shuí xiāng jiǎ， zhī yīn shì suǒ xī。 zhī yìng shǒu jì mò， hái yǎn gù yuán fēi。",
        translation: "冷冷清清的，我到底在等什么呢？天天出门，又天天空手回来。想去寻那长满芳草的地方过日子，又舍不得和老朋友分别。当权的人没有一个肯帮我，知心朋友世上太少了。只好守着寂寞，回去把故乡园子的门关上吧。",
      }
      ],
    },
    {
      title: "早寒有怀 · 孟浩然",
      art: 'tangshi-300:ch125',
      artPrompt: "古诗《早寒有怀》意境插画：木落雁南度，北风江上寒。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "木落雁南度，北风江上寒。\n我家襄水曲，遥隔楚云端。\n乡泪客中尽，孤帆天际看。(孤帆 一作：归帆)\n迷津欲有问，平海夕漫漫。",
        pinyin: "mù luò yàn nán dù， běi fēng jiāng shàng hán。\nwǒ jiā xiāng shuǐ qǔ， yáo gé chǔ yún duān。\nxiāng lèi kè zhōng jìn， gū fān tiān jì kàn。( gū fān yī zuò： guī fān)\nmí jīn yù yǒu wèn， píng hǎi xī màn màn。",
        translation: "树叶落了，大雁向南飞去，北风吹过江面，寒气阵阵。我的家在襄水弯弯的地方，远得像隔在天边的云端。作客的眼泪已经流干，只望着天边那一片孤帆。想找人问问渡口在哪里，只见傍晚的水面白茫茫漫漫无边。",
      }
      ],
    },
    {
      title: "岁暮归南山 · 孟浩然",
      art: 'tangshi-300:ch126',
      artPrompt: "古诗《岁暮归南山》意境插画：北阙休上书，南山归敝庐。不才明主弃，多病故人疏。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "北阙休上书，南山归敝庐。不才明主弃，多病故人疏。\n白发催年老，青阳逼岁除。永怀愁不寐，松月夜窗虚。",
        pinyin: "běi quē xiū shàng shū， nán shān guī bì lú。 bù cái míng zhǔ qì， duō bìng gù rén shū。\nbái fà cuī nián lǎo， qīng yáng bī suì chú。 yǒng huái chóu bù mèi， sōng yuè yè chuāng xū。",
        translation: "不再向朝廷上书了，回南山我的破屋子去吧。没有才能，被圣明的君主搁下；多病，连老朋友也渐渐疏远。白发催着人变老，新春逼着旧年过去。我满怀愁绪睡不着，松间的月光照着空空的窗户。",
      }
      ],
    },
    {
      title: "过故人庄 · 孟浩然",
      art: 'tangshi-300:ch127',
      artPrompt: "古诗《过故人庄》意境插画：故人具鸡黍，邀我至田家。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "故人具鸡黍，邀我至田家。\n绿树村边合，青山郭外斜。\n开轩面场圃，把酒话桑麻。\n待到重阳日，还来就菊花。",
        pinyin: "gù rén jù jī shǔ， yāo wǒ zhì tián jiā。\nlǜ shù cūn biān hé， qīng shān guō wài xié。\nkāi xuān miàn chǎng pǔ， bǎ jiǔ huà sāng má。\ndài dào chóng yáng rì， hái lái jiù jú huā。",
        translation: "老朋友备好了鸡和黄米饭，请我到他家做客。绿树把村子团团围住，青山在城墙外斜斜地伸展开。推开窗子，正对着谷场和菜园，端起酒杯聊着种桑麻的农事。等到重阳节那天，我还要再来一起赏菊花。",
      }
      ],
    },
    {
      title: "秦中寄远上人 · 孟浩然",
      art: 'tangshi-300:ch128',
      artPrompt: "古诗《秦中寄远上人》意境插画：一丘常欲卧，三径苦无资。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "一丘常欲卧，三径苦无资。\n北土非吾愿，东林怀我师。\n黄金燃桂尽，壮志逐年衰。\n日夕凉风至，闻蝉但益悲。",
        pinyin: "yī qiū cháng yù wò， sān jìng kǔ wú zī。\nběi tǔ fēi wú yuàn， dōng lín huái wǒ shī。\nhuáng jīn rán guì jìn， zhuàng zhì zhú nián shuāi。\nrì xī liáng fēng zhì， wén chán dàn yì bēi。",
        translation: "我总想找一座山丘安安静静地住下，可惜穷得连田园都置办不起。留在北方京城不是我的心愿，我心里一直想念着东林的老师。在京城日子过得太贵，把黄金都花光了，雄心壮志也一年年衰退。早晚凉风吹来，听见蝉声只是更加悲伤。",
      }
      ],
    },
    {
      title: "望洞庭湖赠张丞相 · 孟浩然",
      art: 'tangshi-300:ch129',
      artPrompt: "古诗《望洞庭湖赠张丞相》意境插画：八月湖水平，涵虚混太清。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "八月湖水平，涵虚混太清。\n气蒸云梦泽，波撼岳阳城。\n欲济无舟楫，端居耻圣明。\n坐观垂钓者，徒有羡鱼情。",
        pinyin: "bā yuè hú shuǐ píng， hán xū hùn tài qīng。\nqì zhēng yún mèng zé， bō hàn yuè yáng chéng。\nyù jì wú zhōu jí， duān jū chǐ shèng míng。\nzuò guān chuí diào zhě， tú yǒu xiàn yú qíng。",
        translation: "八月的湖水涨得和岸齐平，水天混成一片。水汽蒸腾着云梦大泽，波浪摇撼着岳阳城。想渡过湖去，却没有船和桨；安闲地坐着过日子，又觉得对不起这圣明的时代。坐着看别人垂钓，空自有一片羡慕鱼儿的心情。",
      }
      ],
    },
    {
      title: "与诸子登岘山 · 孟浩然",
      art: 'tangshi-300:ch130',
      artPrompt: "古诗《与诸子登岘山》意境插画：人事有代谢，往来成古今。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "人事有代谢，往来成古今。\n江山留胜迹，我辈复登临。\n水落鱼梁浅，天寒梦泽深。\n羊公碑尚在，读罢泪沾襟。(尚在 一作：字在)",
        pinyin: "rén shì yǒu dài xiè， wǎng lái chéng gǔ jīn。\njiāng shān liú shèng jì， wǒ bèi fù dēng lín。\nshuǐ luò yú liáng qiǎn， tiān hán mèng zé shēn。\nyáng gōng bēi shàng zài， dú bà lèi zhān jīn。( shàng zài yī zuò： zì zài)",
        translation: "人间的事总在更换交替，来来往往就成了古往今来。江山留下许多名胜古迹，我们这一辈人又来登临。水落下去，鱼梁洲露出浅浅的滩；天气冷了，云梦泽显得又深又远。羊公的碑还立在那里，读完了碑文，泪水沾湿了衣襟。",
      }
      ],
    },
    {
      title: "宴梅道士山房 · 孟浩然",
      art: 'tangshi-300:ch131',
      artPrompt: "古诗《宴梅道士山房》意境插画：林卧愁春尽，开轩览物华。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "林卧愁春尽，开轩览物华。\n忽逢青鸟使，邀入赤松家。\n金灶初开火，仙桃正发花。\n童颜若可驻，何惜醉流霞。",
        pinyin: "lín wò chóu chūn jìn， kāi xuān lǎn wù huá。\nhū féng qīng niǎo shǐ， yāo rù chì sōng jiā。\njīn zào chū kāi huǒ， xiān táo zhèng fā huā。\ntóng yán ruò kě zhù， hé xī zuì liú xiá。",
        translation: "躺在林子里，发愁春天就要过完，推开窗子欣赏美好的景色。忽然有青鸟一样的信使来，邀我到赤松仙人家里做客。炼丹的炉子刚生起火，仙桃正开着花。如果童年的脸色真的能留住，那我就不惜喝醉，把这流霞美酒饮个痛快。",
      }
      ],
    },
    {
      title: "章台夜思 · 韦庄",
      art: 'tangshi-300:ch132',
      artPrompt: "古诗《章台夜思》意境插画：清瑟怨遥夜，绕弦风雨哀。孤灯闻楚角，残月下章台。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "清瑟怨遥夜，绕弦风雨哀。孤灯闻楚角，残月下章台。\n芳草已云暮，故人殊未来。乡书不可寄，秋雁又南回。",
        pinyin: "qīng sè yuàn yáo yè， rào xián fēng yǔ āi。 gū dēng wén chǔ jiǎo， cán yuè xià zhāng tái。\nfāng cǎo yǐ yún mù， gù rén shū wèi lái。 xiāng shū bù kě jì， qiū yàn yòu nán huí。",
        translation: "凄清的瑟声埋怨着漫漫长夜，风雨绕着琴弦呜呜作哀。孤灯下听见楚地的号角，残月正落向章台。芳草已经枯暮，老朋友却一直没有来；家书没法寄出去，秋雁又向南飞回来了。",
      }
      ],
    },
    {
      title: "淮上喜会梁州故人 · 韦应物",
      art: 'tangshi-300:ch133',
      artPrompt: "古诗《淮上喜会梁州故人》意境插画：江汉曾为客，相逢每醉还。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "江汉曾为客，相逢每醉还。\n浮云一别后，流水十年间。\n欢笑情如旧，萧疏鬓已斑。\n何因不归去？淮上有秋山。",
        pinyin: "jiāng hàn céng wèi kè， xiāng féng měi zuì hái。\nfú yún yī bié hòu， liú shuǐ shí nián jiān。\nhuān xiào qíng rú jiù， xiāo shū bìn yǐ bān。\nhé yīn bù guī qù？ huái shàng yǒu qiū shān。",
        translation: "从前我们同在江汉一带做客，每次相逢总要喝得大醉才回去。像浮云一样一别之后，像流水一样十年过去了。欢笑中情谊还像从前一样，只是两边的鬓发已经斑白稀疏了。为什么不回家去呢？因为淮上有美丽的秋山啊。",
      }
      ],
    },
    {
      title: "赋得暮雨送李曹 · 韦应物",
      art: 'tangshi-300:ch134',
      artPrompt: "古诗《赋得暮雨送李曹》意境插画：楚江微雨里，建业暮钟时。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "楚江微雨里，建业暮钟时。\n漠漠帆来重，冥冥鸟去迟。\n海门深不见，浦树远含滋。\n相送情无限，沾襟比散丝。",
        pinyin: "chǔ jiāng wēi yǔ lǐ， jiàn yè mù zhōng shí。\nmò mò fān lái zhòng， míng míng niǎo qù chí。\nhǎi mén shēn bù jiàn， pǔ shù yuǎn hán zī。\nxiāng sòng qíng wú xiàn， zhān jīn bǐ sàn sī。",
        translation: "楚江上飘着细细的雨，建业城正敲响傍晚的钟。帆被雨打湿沉甸甸地驶来，鸟儿在昏暗的天色里慢慢地飞。海门深深地望不见，水边的树远远地含着湿气。送你的情意没有尽头，泪水沾湿衣襟，就像这满天密密的雨丝。",
      }
      ],
    },
    {
      title: "经邹鲁祭孔子而叹之 · 李隆基",
      art: 'tangshi-300:ch135',
      artPrompt: "古诗《经邹鲁祭孔子而叹之》意境插画：夫子何为者，栖栖一代中。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "夫子何为者，栖栖一代中。\n地犹鄹氏邑，宅即鲁王宫。\n叹凤嗟身否，伤麟怨道穷。\n今看两楹奠，当与梦时同。",
        pinyin: "fū zǐ hé wèi zhě， qī qī yī dài zhōng。\ndì yóu zōu shì yì， zhái jí lǔ wáng gōng。\ntàn fèng jiē shēn fǒu， shāng lín yuàn dào qióng。\njīn kàn liǎng yíng diàn， dāng yǔ mèng shí tóng。",
        translation: "孔夫子这样忙碌奔走一生，到底是为了什么呢？这里还是鄹人的城邑，他的老宅却成了鲁王的宫殿。他叹凤鸟不来，感叹生不逢时；伤心麒麟被捉，怨恨自己的大道走不通。如今两楹之间举行了隆重的祭礼，正和他当年梦见的情形一样啊。",
      }
      ],
    },
    {
      title: "灞上秋居 · 马戴",
      art: 'tangshi-300:ch136',
      artPrompt: "古诗《灞上秋居》意境插画：灞原风雨定，晚见雁行频。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "灞原风雨定，晚见雁行频。\n落叶他乡树，寒灯独夜人。\n空园白露滴，孤壁野僧邻。\n寄卧郊扉久，何年致此身。",
        pinyin: "bà yuán fēng yǔ dìng， wǎn jiàn yàn xíng pín。\nluò yè tā xiāng shù， hán dēng dú yè rén。\nkōng yuán bái lù dī， gū bì yě sēng lín。\njì wò jiāo fēi jiǔ， hé nián zhì cǐ shēn。",
        translation: "灞原上的风雨停了，傍晚看见一行行大雁频频飞过。落叶是别乡树上的落叶，寒灯下坐着独守长夜的人。空园里听得见白露滴落的声音，只有一位野僧住在隔壁。我寄居在这郊外已经很久很久，哪一年才能出去施展抱负呢。",
      }
      ],
    },
    {
      title: "楚江怀古三首·其一 · 马戴",
      art: 'tangshi-300:ch137',
      artPrompt: "古诗《楚江怀古三首·其一》意境插画：露气寒光集，微阳下楚丘。猿啼洞庭树，人在木兰舟。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "露气寒光集，微阳下楚丘。猿啼洞庭树，人在木兰舟。\n广泽生明月，苍山夹乱流。云中君不见，竟夕自悲秋。",
        pinyin: "lù qì hán guāng jí， wēi yáng xià chǔ qiū。 yuán tí dòng tíng shù， rén zài mù lán zhōu。\nguǎng zé shēng míng yuè， cāng shān jiá luàn liú。 yún zhōng jūn bù jiàn， jìng xī zì bēi qiū。",
        translation: "露水带着寒气聚起来，微弱的夕阳落向楚地的山丘。猿猴在洞庭湖边的树上啼叫，人正坐在木兰木的小舟里。宽阔的湖泽上升起了明月，苍青的山峦夹着乱流的江水。云中的神灵终究看不见，我整夜整夜独自对着秋天悲伤。",
      }
      ],
    },
    {
      title: "除夜有怀 · 崔涂",
      art: 'tangshi-300:ch138',
      artPrompt: "古诗《除夜有怀》意境插画：迢递三巴路，羁危万里身。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "迢递三巴路，羁危万里身。\n乱山残雪夜，孤烛异乡人。\n渐与骨肉远，转于僮仆亲。\n那堪正飘泊，明日岁华新。",
        pinyin: "tiáo dì sān bā lù， jī wēi wàn lǐ shēn。\nluàn shān cán xuě yè， gū zhú yì xiāng rén。\njiàn yǔ gǔ ròu yuǎn， zhuǎn yú tóng pú qīn。\nnà kān zhèng piāo bó， míng rì suì huá xīn。",
        translation: "三巴的路遥远漫长，我这漂泊万里的人孤单又危险。乱山之中落着残雪的夜里，一支孤烛照着异乡的我。和骨肉亲人越来越远，反倒和僮仆越来越亲。怎受得了还在四处漂泊——明天，新的一年就要开始了。",
      }
      ],
    },
    {
      title: "孤雁 · 崔涂",
      art: 'tangshi-300:ch139',
      artPrompt: "古诗《孤雁》意境插画：几行归塞尽，念尔独何之。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "几行归塞尽，念尔独何之。\n暮雨相呼失，寒塘欲下迟。\n渚云低暗度，关月冷相随。\n未必逢矰缴，孤飞自可疑。",
        pinyin: "jǐ háng guī sāi jìn， niàn ěr dú hé zhī。\nmù yǔ xiāng hū shī， hán táng yù xià chí。\nzhǔ yún dī àn dù， guān yuè lěng xiāng suí。\nwèi bì féng zēng jiǎo， gū fēi zì kě yí。",
        translation: "几行大雁都飞回边塞去了，可怜你独自飞向哪里呢？暮雨里你呼唤走散的伙伴，想在寒塘边落下又迟迟犹豫。你低低地穿过小洲上的云，只有关山的冷月冷冷地相随。就算未必碰上射雁的箭，这样孤零零地飞，也让人替你担心啊。",
      }
      ],
    },
    {
      title: "题破山寺后禅院 · 常建",
      art: 'tangshi-300:ch140',
      artPrompt: "古诗《题破山寺后禅院》意境插画：清晨入古寺，初日照高林。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "清晨入古寺，初日照高林。\n曲径通幽处，禅房花木深。\n山光悦鸟性，潭影空人心。\n万籁此俱寂，唯闻钟磬音。",
        pinyin: "qīng chén rù gǔ sì， chū rì zhào gāo lín。\nqū jìng tōng yōu chù， chán fáng huā mù shēn。\nshān guāng yuè niǎo xìng， tán yǐng kōng rén xīn。\nwàn lài cǐ jù jì， wéi wén zhōng qìng yīn。",
        translation: "清晨走进古老的寺院，初升的太阳照着高高的树林。弯弯的小路通向幽静的地方，禅房藏在花木的深处。山色让鸟儿也欢悦起来，潭水的清影让人心里一片安静空明。这时万物都没有一点声响，只听见寺里的钟磬声。",
      }
      ],
    },
    {
      title: "望月怀远 · 张九龄",
      art: 'tangshi-300:ch141',
      artPrompt: "古诗《望月怀远》意境插画：海上生明月，天涯共此时。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "海上生明月，天涯共此时。\n情人怨遥夜，竟夕起相思。\n灭烛怜光满，披衣觉露滋。\n不堪盈手赠，还寝梦佳期。",
        pinyin: "hǎi shàng shēng míng yuè， tiān yá gòng cǐ shí。\nqíng rén yuàn yáo yè， jìng xī qǐ xiāng sī。\nmiè zhú lián guāng mǎn， pī yī jué lù zī。\nbù kān yíng shǒu zèng， hái qǐn mèng jiā qī。",
        translation: "大海上升起一轮明月，远在天边的人这时都望着它。多情的人埋怨这夜太长，整晚整晚地想念亲人。吹灭蜡烛，更爱这满屋的月光；披衣出门，才发现露水打湿了衣裳。没法捧满一把月光送给你，只好回去睡下，盼着在梦里和你相见。",
      }
      ],
    },
    {
      title: "书边事 · 张乔",
      art: 'tangshi-300:ch142',
      artPrompt: "古诗《书边事》意境插画：调角断清秋，征人倚戍楼。春风对青冢，白日落梁州。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "调角断清秋，征人倚戍楼。春风对青冢，白日落梁州。\n大汉无兵阻，穷边有客游。蕃情似此水，长愿向南流。",
        pinyin: "tiáo jiǎo duàn qīng qiū， zhēng rén yǐ shù lóu。 chūn fēng duì qīng zhǒng， bái rì luò liáng zhōu。\ndà hàn wú bīng zǔ， qióng biān yǒu kè yóu。 fān qíng sì cǐ shuǐ， cháng yuàn xiàng nán liú。",
        translation: "号角声在清爽的秋天里响起，守边的战士靠在戍楼上。春风吹拂着青青的坟冢，白太阳正照着梁州。大汉的边境不再有战争的阻隔，遥远的边疆也有游人来往。蕃人的心愿就像这江水一样，但愿它永远一直向南流。",
      }
      ],
    },
    {
      title: "没蕃故人 · 张籍",
      art: 'tangshi-300:ch143',
      artPrompt: "古诗《没蕃故人》意境插画：前年伐月支，城下没全师。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "前年伐月支，城下没全师。\n蕃汉断消息，死生长别离。\n无人收废帐，归马识残旗。\n欲祭疑君在，天涯哭此时。",
        pinyin: "qián nián fá yuè zhī， chéng xià méi quán shī。\nfān hàn duàn xiāo xī， sǐ shēng zhǎng bié lí。\nwú rén shōu fèi zhàng， guī mǎ shí cán qí。\nyù jì yí jūn zài， tiān yá kū cǐ shí。",
        translation: "前年出征去打月支，全军在城下覆没了。蕃地和汉地断了消息，是死是生，从此永远分离。没有人去收拾废弃的营帐，跑回来的战马还认得残破的军旗。想祭奠你，又猜你也许还活着；我在这天涯，只有放声痛哭。",
      }
      ],
    },
    {
      title: "秋日赴阙题潼关驿楼 · 许浑",
      art: 'tangshi-300:ch144',
      artPrompt: "古诗《秋日赴阙题潼关驿楼》意境插画：红叶晚萧萧，长亭酒一瓢。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "红叶晚萧萧，长亭酒一瓢。\n残云归太华，疏雨过中条。\n树色随山迥，河声入海遥。\n帝乡明日到，犹自梦渔樵。",
        pinyin: "hóng yè wǎn xiāo xiāo， cháng tíng jiǔ yī piáo。\ncán yún guī tài huá， shū yǔ guò zhōng tiáo。\nshù sè suí shān jiǒng， hé shēng rù hǎi yáo。\ndì xiāng míng rì dào， yóu zì mèng yú qiáo。",
        translation: "红叶在晚风里萧萧作响，长亭里我喝着一瓢酒。残云飘回华山，稀疏的雨掠过中条山。树色随着山势伸向远方，黄河的水声一路响到入海的地方。明天就要到京城了，我还做着打鱼砍柴的梦呢。",
      }
      ],
    },
    {
      title: "早秋 · 许浑",
      art: 'tangshi-300:ch145',
      artPrompt: "古诗《早秋》意境插画：遥夜泛清瑟，西风生翠萝。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "遥夜泛清瑟，西风生翠萝。\n残萤委玉露，早雁拂金河。\n高树晓还密，远山晴更多。\n淮南一叶下，自觉洞庭波。",
        pinyin: "yáo yè fàn qīng sè， xī fēng shēng cuì luó。\ncán yíng wěi yù lù， zǎo yàn fú jīn hé。\ngāo shù xiǎo hái mì， yuǎn shān qíng gèng duō。\nhuái nán yī yè xià， zì jué dòng tíng bō。",
        translation: "长夜里弹起凄清的瑟，西风从翠绿的藤萝间吹生出来。残存的萤火虫落在白白的露水里，早归的大雁掠过秋夜的银河。高高的树在拂晓还显得茂密，远处晴朗的天看得见更多的山。淮南落下一片叶子，我就感觉到洞庭湖涌起了秋天的波浪。",
      }
      ],
    },
    {
      title: "送人东游 · 温庭筠",
      art: 'tangshi-300:ch146',
      artPrompt: "古诗《送人东游》意境插画：荒戍落黄叶，浩然离故关。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "荒戍落黄叶，浩然离故关。\n高风汉阳渡，初日郢门山。\n江上几人在，天涯孤棹还。\n何当重相见，樽酒慰离颜。",
        pinyin: "huāng shù luò huáng yè， hào rán lí gù guān。\ngāo fēng hàn yáng dù， chū rì yǐng mén shān。\njiāng shàng jǐ rén zài， tiān yá gū zhào hái。\nhé dāng zhòng xiāng jiàn， zūn jiǔ wèi lí yán。",
        translation: "荒凉的营垒上落满黄叶，你意气昂扬地辞别故关。高风正送你的船过汉阳渡，初升的太阳照着郢门山。江上的老朋友还剩下几个呢？你一个人驾着孤舟回向天涯。什么时候才能再相见，端起一杯酒来安慰离别后的愁容。",
      }
      ],
    },
    {
      title: "寻陆鸿渐不遇 · 皎然",
      art: 'tangshi-300:ch147',
      artPrompt: "古诗《寻陆鸿渐不遇》意境插画：移家虽带郭，野径入桑麻。近种篱边菊，秋来未著花。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "移家虽带郭，野径入桑麻。近种篱边菊，秋来未著花。\n扣门无犬吠，欲去问西家。报道山中去，归时每日斜。",
        pinyin: "yí jiā suī dài guō， yě jìng rù sāng má。 jìn zhǒng lí biān jú， qiū lái wèi zhù huā。\nkòu mén wú quǎn fèi， yù qù wèn xī jiā。 bào dào shān zhōng qù， guī shí měi rì xié。",
        translation: "他新搬的家虽然靠近城墙，田野的小路却一直伸进桑麻地里去。篱笆边新种的菊花，到了秋天还没有开花。敲门，也没有狗叫声，只好去问一问西边的邻居。邻居说他进山里去了，回来时总是太阳已经西斜。",
      }
      ],
    },
    {
      title: "寻南溪常道士 · 刘长卿",
      art: 'tangshi-300:ch148',
      artPrompt: "古诗《寻南溪常道士》意境插画：一路经行处，莓苔见履痕。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "一路经行处，莓苔见履痕。\n白云依静渚，春草闭闲门。\n过雨看松色，随山到水源。\n溪花与禅意，相对亦忘言。",
        pinyin: "yī lù jīng xíng chù， méi tái jiàn lǚ hén。\nbái yún yī jìng zhǔ， chūn cǎo bì xián mén。\nguò yǔ kàn sōng sè， suí shān dào shuǐ yuán。\nxī huā yǔ chán yì， xiāng duì yì wàng yán。",
        translation: "一路走过来，青莓苔上留着鞋印的痕迹。白云依着静静的小洲，春草掩着闲闭的门。下过雨，看松色更加青翠；顺着山，一直走到水的源头。面对溪边的野花，心里生出一种禅意，相互对望，忘记了说话。",
      }
      ],
    },
    {
      title: "新年作 · 刘长卿",
      art: 'tangshi-300:ch149',
      artPrompt: "古诗《新年作》意境插画：乡心新岁切，天畔独潸然。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "乡心新岁切，天畔独潸然。\n老至居人下，春归在客先。\n岭猿同旦暮，江柳共风烟。\n已似长沙傅，从今又几年。",
        pinyin: "xiāng xīn xīn suì qiè， tiān pàn dú shān rán。\nlǎo zhì jū rén xià， chūn guī zài kè xiān。\nlǐng yuán tóng dàn mù， jiāng liǔ gòng fēng yān。\nyǐ sì cháng shā fù， cóng jīn yòu jǐ nián。",
        translation: "新年到了，想家的心更加急切，独自在天边流下眼泪。年纪老了还屈居人下，春天回来，比漂泊在外的我先到家。早晚只有岭上的猿猴相伴，江边的柳树和我一同沐着风烟。我就像当年谪居长沙的太傅，从今往后，又要这样过多少年呢。",
      }
      ],
    },
    {
      title: "秋日登吴公台上寺远眺 · 刘长卿",
      art: 'tangshi-300:ch150',
      artPrompt: "古诗《秋日登吴公台上寺远眺》意境插画：古台摇落后，秋日望乡心。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "古台摇落后，秋日望乡心。\n野寺来人少，云峰隔水深。\n夕阳依旧垒，寒磬满空林。\n惆怅南朝事，长江独至今。",
        pinyin: "gǔ tái yáo luò hòu， qiū rì wàng xiāng xīn。\nyě sì lái rén shǎo， yún fēng gé shuǐ shēn。\nxī yáng yī jiù lěi， hán qìng mǎn kōng lín。\nchóu chàng nán cháo shì， cháng jiāng dú zhì jīn。",
        translation: "古老的台榭在风雨飘摇后荒废了，秋日里我登高眺望，思念家乡。野外的小寺来人很少，云雾的山峰隔着重重深水。夕阳照着旧日的营垒，清寒的磬声响遍空寂的树林。南朝的旧事让人惆怅，只有长江的水独自流到今天。",
      }
      ],
    },
    {
      title: "送李中丞归汉阳别业 · 刘长卿",
      art: 'tangshi-300:ch151',
      artPrompt: "古诗《送李中丞归汉阳别业》意境插画：流落征南将，曾驱十万师。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "流落征南将，曾驱十万师。\n罢归无旧业，老去恋明时。\n独立三边静，轻生一剑知。\n茫茫江汉上，日暮欲何之。",
        pinyin: "liú luò zhēng nán jiāng， céng qū shí wàn shī。\nbà guī wú jiù yè， lǎo qù liàn míng shí。\ndú lì sān biān jìng， qīng shēng yī jiàn zhī。\nmáng máng jiāng hàn shàng， rì mù yù hé zhī。",
        translation: "你这位流落多年的征南将军，曾经统率过十万大军。如今罢官回乡，没有一点旧日的产业，人老了还眷恋着圣明的时代。你独立镇守的日子，三边安静无事；把生死看得轻轻的，只有随身的宝剑知道。茫茫的江汉水面上，天黑了，你将要到哪里去呢？",
      }
      ],
    },
    {
      title: "饯别王十一南游 · 刘长卿",
      art: 'tangshi-300:ch152',
      artPrompt: "古诗《饯别王十一南游》意境插画：望君烟水阔，挥手泪沾巾。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "望君烟水阔，挥手泪沾巾。\n飞鸟没何处，青山空向人。\n长江一帆远，落日五湖春。\n谁见汀洲上，相思愁白苹。",
        pinyin: "wàng jūn yān shuǐ kuò， huī shǒu lèi zhān jīn。\nfēi niǎo méi hé chù， qīng shān kōng xiàng rén。\ncháng jiāng yī fān yuǎn， luò rì wǔ hú chūn。\nshuí jiàn tīng zhōu shàng， xiāng sī chóu bái píng。",
        translation: "望着你的身影消失在烟水茫茫的远处，我挥着手，泪水沾湿了手巾。飞鸟飞向哪里没去了呢？青山空空地对着送行的人。长江上一片帆影远去，落日照着五湖的春水。有谁看见汀洲上的我，正对着白苹花愁苦地想念你呢？",
      }
      ],
    },
    {
      title: "蜀先主庙 · 刘禹锡",
      art: 'tangshi-300:ch153',
      artPrompt: "古诗《蜀先主庙》意境插画：天地英雄气，千秋尚凛然。势分三足鼎，业复五铢钱。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "天地英雄气，千秋尚凛然。势分三足鼎，业复五铢钱。\n得相能开国，生儿不象贤。凄凉蜀故妓，来舞魏宫前。",
        pinyin: "tiān dì yīng xióng qì， qiān qiū shàng lǐn rán。 shì fēn sān zú dǐng， yè fù wǔ zhū qián。\ndé xiāng néng kāi guó， shēng ér bù xiàng xián。 qī liáng shǔ gù jì， lái wǔ wèi gōng qián。",
        translation: "天地间英雄的气概，过了一千年还是凛凛有生气。天下分成了三足鼎立的局面，大业是恢复汉家的江山。得到好丞相，开创了国家；生下的儿子，却不像先人那样贤明。蜀国旧日的歌妓，凄凄凉凉地来到魏国宫殿前歌舞。",
      }
      ],
    },
    {
      title: "阙题 · 刘昚虚",
      art: 'tangshi-300:ch154',
      artPrompt: "古诗《阙题》意境插画：道由白云尽，春与青溪长。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "道由白云尽，春与青溪长。\n时有落花至，远随流水香。\n闲门向山路，深柳读书堂。\n幽映每白日，清辉照衣裳。",
        pinyin: "dào yóu bái yún jìn， chūn yǔ qīng xī cháng。\nshí yǒu luò huā zhì， yuǎn suí liú shuǐ xiāng。\nxián mén xiàng shān lù， shēn liǔ dú shū táng。\nyōu yìng měi bái rì， qīng huī zhào yī shang。",
        translation: "山路在白云深处到了头，春天和青青的溪水一样长长的。不时有落花飘下来，顺着远远的流水送来阵阵花香。门朝山路、藏在深深柳树里的读书堂，白天也有清亮的树影月光照在衣裳上。",
      }
      ],
    },
    {
      title: "送李端 · 卢纶",
      art: 'tangshi-300:ch155',
      artPrompt: "古诗《送李端》意境插画：故关衰草遍，离别自堪悲。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "故关衰草遍，离别自堪悲。\n路出寒云外，人归暮雪时。\n少孤为客早，多难识君迟。\n掩泪空相向，风尘何处期。",
        pinyin: "gù guān shuāi cǎo biàn， lí bié zì kān bēi。\nlù chū hán yún wài， rén guī mù xuě shí。\nshǎo gū wèi kè zǎo， duō nán shí jūn chí。\nyǎn lèi kōng xiāng xiàng， fēng chén hé chù qī。",
        translation: "古老的关口长满枯草，就要分别了，心里真难过。路伸到寒冷的云那边去，朋友回家时天正下着傍晚的雪。我从小没了父亲、早早在外漂泊，吃了许多苦才认识你，真是太晚了；如今含着眼泪面对面站着，这一去风尘仆仆，不知什么时候才能再见面。",
      }
      ],
    },
    {
      title: "送僧归日本 · 钱起",
      art: 'tangshi-300:ch156',
      artPrompt: "古诗《送僧归日本》意境插画：上国随缘住，来途若梦行。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "上国随缘住，来途若梦行。\n浮天沧海远，去世法舟轻。\n水月通禅寂，鱼龙听梵声。\n惟怜一灯影，万里眼中明。",
        pinyin: "shàng guó suí yuán zhù， lái tú ruò mèng xíng。\nfú tiān cāng hǎi yuǎn， qù shì fǎ zhōu qīng。\nshuǐ yuè tōng chán jì， yú lóng tīng fàn shēng。\nwéi lián yī dēng yǐng， wàn lǐ yǎn zhōng míng。",
        translation: "师父随缘住在我们国家，来时的旅途就像做梦一样。大海又远又宽，你回去的小船轻轻漂去，水上的月亮、海里的鱼龙都静静听着诵经的声音。只有那一盏小小的灯光，隔着万里，还亮在我们的眼睛里。",
      }
      ],
    },
    {
      title: "谷口书斋寄杨补阙 · 钱起",
      art: 'tangshi-300:ch157',
      artPrompt: "古诗《谷口书斋寄杨补阙》意境插画：泉壑带茅茨，云霞生薜帷。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "泉壑带茅茨，云霞生薜帷。\n竹怜新雨后，山爱夕阳时。\n闲鹭栖常早，秋花落更迟。\n家僮扫萝径，昨与故人期。",
        pinyin: "quán hè dài máo cí， yún xiá shēng bì wéi。\nzhú lián xīn yǔ hòu， shān ài xī yáng shí。\nxián lù qī cháng zǎo， qiū huā luò gèng chí。\njiā tóng sǎo luó jìng， zuó yǔ gù rén qī。",
        translation: "泉水和山谷绕着我的小茅屋，云霞映在藤萝做的帘子上。新雨后的竹子最可爱，夕阳下的山最好看。悠闲的白鹭早早回来休息，秋天的花也落得很慢。小僮仆已经把长满藤萝的小路扫干净了，因为昨天就约好了老朋友要来。",
      }
      ],
    },
    {
      title: "在狱咏蝉 · 骆宾王",
      art: 'tangshi-300:ch158',
      artPrompt: "古诗《在狱咏蝉》意境插画：西陆蝉声唱，南冠客思深。(客思深 一作：客思侵)——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "西陆蝉声唱，南冠客思深。(客思深 一作：客思侵)\n不堪玄鬓影，来对白头吟。(不堪 一作：那堪)\n露重飞难进，风多响易沉。\n无人信高洁，谁为表予心？",
        pinyin: "xī lù chán shēng chàng， nán guān kè sī shēn。( kè sī shēn yī zuò： kè sī qīn)\nbù kān xuán bìn yǐng， lái duì bái tóu yín。( bù kān yī zuò： nà kān)\nlù zhòng fēi nán jìn， fēng duō xiǎng yì chén。\nwú rén xìn gāo jié， shuí wèi biǎo yǔ xīn？",
        translation: "秋天里蝉儿声声叫，我在牢里更加想念家乡。露水太重，蝉想飞也飞不动；风声太响，它的叫声也被淹没了。没有人相信蝉和我一样清白高洁，谁能替我说出这颗心呢？",
      }
      ],
    },
    {
      title: "江乡故人偶集客舍 · 戴叔伦",
      art: 'tangshi-300:ch159',
      artPrompt: "古诗《江乡故人偶集客舍》意境插画：天秋月又满，城阙夜千重。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "天秋月又满，城阙夜千重。\n还作江南会，翻疑梦里逢。\n风枝惊暗鹊，露草覆寒蛩。\n羁旅长堪醉，相留畏晓钟。",
        pinyin: "tiān qiū yuè yòu mǎn， chéng quē yè qiān chóng。\nhái zuò jiāng nán huì， fān yí mèng lǐ féng。\nfēng zhī jīng àn què， lù cǎo fù hán qióng。\njī lǚ cháng kān zuì， xiāng liú wèi xiǎo zhōng。",
        translation: "秋天的夜晚月亮又圆了，城里的夜色一层又一层。江南的老朋友居然在旅店里碰面，真让人怀疑是在梦里相逢。风吹树枝惊起了躲着的鹊鸟，露水打湿的草丛里蟋蟀在叫。出门在外的人难得相聚，只想一醉方休，互相挽留着，真怕听见天亮的钟声。",
      }
      ],
    },
    {
      title: "酬程延秋夜即事见赠 · 韩翃",
      art: 'tangshi-300:ch160',
      artPrompt: "古诗《酬程延秋夜即事见赠》意境插画：长簟迎风早，空城澹月华。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "长簟迎风早，空城澹月华。\n星河秋一雁，砧杵夜千家。\n节候看应晚，心期卧亦赊。\n向来吟秀句，不觉已鸣鸦。",
        pinyin: "cháng diàn yíng fēng zǎo， kōng chéng dàn yuè huá。\nxīng hé qiū yī yàn， zhēn chǔ yè qiān jiā。\njié hòu kàn yìng wǎn， xīn qī wò yì shē。\nxiàng lái yín xiù jù， bù jué yǐ míng yā。",
        translation: "长长的竹席早早迎来凉风，安静的城里洒着淡淡的月光。秋夜的银河边飞过一只孤雁，夜里千家万户传来捣衣的声音。看节令已经是深秋了，想着盼着见面的事，躺下也迟迟睡不着。刚才还在吟诵你写来的好诗句，不知不觉乌鸦都叫起来，天快亮了。",
      }
      ],
    },
    {
      title: "遣悲怀三首·其一 · 元稹",
      art: 'tangshi-300:ch161',
      artPrompt: "古诗《遣悲怀三首·其一》意境插画：谢公最小偏怜女，自嫁黔娄百事乖。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "谢公最小偏怜女，自嫁黔娄百事乖。\n顾我无衣搜荩箧，泥他沽酒拔金钗。(荩箧 一作：画箧)\n野蔬充膳甘长藿，落叶添薪仰古槐。\n今日俸钱过十万，与君营奠复营斋。",
        pinyin: "xiè gōng zuì xiǎo piān lián nǚ， zì jià qián lóu bǎi shì guāi。\ngù wǒ wú yī sōu jìn qiè， ní tā gū jiǔ bá jīn chāi。( jìn qiè yī zuò： huà qiè)\nyě shū chōng shàn gān cháng huò， luò yè tiān xīn yǎng gǔ huái。\njīn rì fèng qián guò shí wàn， yǔ jūn yíng diàn fù yíng zhāi。",
        translation: "你是家里最受疼爱的小女儿，却嫁给了我这样的穷书生，样样都跟着受苦。见我没有衣裳就翻遍箱子去找，想请客打酒你就拔下金钗去换；你吃着野菜也觉得香甜，捡落叶当柴烧。如今我的俸钱多了，却只能拿它来祭奠你，为你做法事，你再也看不到了。",
      }
      ],
    },
    {
      title: "遣悲怀三首·其二 · 元稹",
      art: 'tangshi-300:ch162',
      artPrompt: "古诗《遣悲怀三首·其二》意境插画：昔日戏言身后事，今朝都到眼前来。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "昔日戏言身后事，今朝都到眼前来。\n衣裳已施行看尽，针线犹存未忍开。\n尚想旧情怜婢仆，也曾因梦送钱财。\n诚知此恨人人有，贫贱夫妻百事哀。",
        pinyin: "xī rì xì yán shēn hòu shì， jīn cháo dōu dào yǎn qián lái。\nyī shang yǐ shī xíng kàn jìn， zhēn xiàn yóu cún wèi rěn kāi。\nshàng xiǎng jiù qíng lián bì pú， yě céng yīn mèng sòng qián cái。\nchéng zhī cǐ hèn rén rén yǒu， pín jiàn fū qī bǎi shì āi。",
        translation: "当年开玩笑说起死后的事，今天全都摆在眼前了。你穿过的衣裳眼看都要送人了，你做的针线盒我一直不忍心打开。这样的生死离别人人都会遇到，可是一起过过苦日子的夫妻，想起哪一件事都让人难过啊。",
      }
      ],
    },
    {
      title: "遣悲怀三首·其三 · 元稹",
      art: 'tangshi-300:ch163',
      artPrompt: "古诗《遣悲怀三首·其三》意境插画：闲坐悲君亦自悲，百年都是几多时。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "闲坐悲君亦自悲，百年都是几多时。\n邓攸无子寻知命，潘岳悼亡犹费词。\n同穴窅冥何所望，他生缘会更难期。\n惟将终夜常开眼，报答平生未展眉。",
        pinyin: "xián zuò bēi jūn yì zì bēi， bǎi nián dōu shì jǐ duō shí。\ndèng yōu wú zǐ xún zhī mìng， pān yuè dào wáng yóu fèi cí。\ntóng xué yǎo míng hé suǒ wàng， tā shēng yuán huì gèng nán qī。\nwéi jiāng zhōng yè cháng kāi yǎn， bào dá píng shēng wèi zhǎn méi。",
        translation: "闲坐着为你悲伤，也为自己悲伤，人就算活到一百岁又能有多久呢。想死后和你同葬一处也是黑漆漆的没有指望，说来生再见面更难盼望。我只能整夜睁着眼睛想你，来报答你跟着我、一辈子眉头都没舒展过的辛劳。",
      }
      ],
    },
    {
      title: "赠郭给事 · 王维",
      art: 'tangshi-300:ch164',
      artPrompt: "古诗《赠郭给事》意境插画：洞门高阁霭余辉，桃李阴阴柳絮飞。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "洞门高阁霭余辉，桃李阴阴柳絮飞。\n禁里疏钟官舍晚，省中啼鸟吏人稀。\n晨摇玉佩趋金殿，夕奉天书拜琐闱。\n强欲从君无那老，将因卧病解朝衣。",
        pinyin: "dòng mén gāo gé ǎi yú huī， táo lǐ yīn yīn liǔ xù fēi。\njìn lǐ shū zhōng guān shè wǎn， shěng zhōng tí niǎo lì rén xī。\nchén yáo yù pèi qū jīn diàn， xī fèng tiān shū bài suǒ wéi。\nqiáng yù cóng jūn wú nà lǎo， jiāng yīn wò bìng jiě cháo yī。",
        translation: "高高的门楼阁沐浴着落日的余光，桃树李树绿荫浓浓，柳絮在飞。宫里传来稀疏的钟声，天色晚了，官署里鸟儿啼叫，官员们快走光了。您早晨戴着玉佩赶去金殿，傍晚又捧着皇帝的文书出门。我很想一直跟随您，无奈年纪老了，就要因为生病脱下朝服回去了。",
      }
      ],
    },
    {
      title: "和贾至舍人早朝大明宫 · 王维",
      art: 'tangshi-300:ch165',
      artPrompt: "古诗《和贾至舍人早朝大明宫》意境插画：绛帻鸡人送晓筹，尚衣方进翠云裘。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "绛帻鸡人送晓筹，尚衣方进翠云裘。\n九天阊阖开宫殿，万国衣冠拜冕旒。\n日色才临仙掌动，香烟欲傍衮龙浮。\n朝罢须裁五色诏，佩声归向凤池头。",
        pinyin: "jiàng zé jī rén sòng xiǎo chóu， shàng yī fāng jìn cuì yún qiú。\njiǔ tiān chāng hé kāi gōng diàn， wàn guó yī guān bài miǎn liú。\nrì sè cái lín xiān zhǎng dòng， xiāng yān yù bàng gǔn lóng fú。\ncháo bà xū cái wǔ sè zhào， pèi shēng guī xiàng fèng chí tóu。",
        translation: "天还没亮，报时的官员报出了更次，管衣服的官员刚捧上翠云裘。宫殿的大门一层层打开，各国来的使者穿着礼服，朝拜戴皇冠的皇帝。太阳刚照到宫殿，仪仗的掌扇慢慢转动，香烟缭绕在龙袍旁边。早朝结束还要起草诏书，官员们身上玉佩叮当作响，回凤凰池去了。",
      }
      ],
    },
    {
      title: "奉和圣制从蓬莱向兴庆阁道 · 王维",
      art: 'tangshi-300:ch166',
      artPrompt: "古诗《奉和圣制从蓬莱向兴庆阁道》意境插画：渭水自萦秦塞曲，黄山旧绕汉宫斜。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "渭水自萦秦塞曲，黄山旧绕汉宫斜。\n銮舆迥出千门柳，阁道回看上苑花。\n云里帝城双凤阙，雨中春树万人家。\n为乘阳气行时令，不是宸游玩物华。(玩 一作：重)",
        pinyin: "wèi shuǐ zì yíng qín sāi qǔ， huáng shān jiù rào hàn gōng xié。\nluán yú jiǒng chū qiān mén liǔ， gé dào huí kàn shàng yuàn huā。\nyún lǐ dì chéng shuāng fèng quē， yǔ zhōng chūn shù wàn rén jiā。\nwèi chéng yáng qì xíng shí lìng， bù shì chén yóu wán wù huá。( wán yī zuò： zhòng)",
        translation: "渭水弯弯曲曲绕着秦地的边塞，山岭斜斜地环抱着汉代的宫殿。皇帝的车驾走过千门万户的柳树，在高高的阁道上回头就能看见御花园里的花。云里是京城对峙的凤阙，春雨中绿树围着千家万户。皇帝是趁着春光出巡、宣布农时的政令，可不是为了出来游玩赏景呀。",
      }
      ],
    },
    {
      title: "积雨辋川庄作 · 王维",
      art: 'tangshi-300:ch167',
      artPrompt: "古诗《积雨辋川庄作》意境插画：积雨空林烟火迟，蒸藜炊黍饷东菑。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "积雨空林烟火迟，蒸藜炊黍饷东菑。\n漠漠水田飞白鹭，阴阴夏木啭黄鹂。\n山中习静观朝槿，松下清斋折露葵。\n野老与人争席罢，海鸥何事更相疑。",
        pinyin: "jī yǔ kōng lín yān huǒ chí， zhēng lí chuī shǔ xiǎng dōng zī。\nmò mò shuǐ tián fēi bái lù， yīn yīn xià mù zhuàn huáng lí。\nshān zhōng xí jìng guān cháo jǐn， sōng xià qīng zhāi zhé lù kuí。\nyě lǎo yǔ rén zhēng xí bà， hǎi ōu hé shì gèng xiāng yí。",
        translation: "久雨的树林里炊烟慢慢升起，农人们做好饭菜送到东边的田里去。广阔的水田上白鹭翩翩飞过，浓密的夏树里黄鹂婉转地叫。我在山里静静地看木槿花早上开放，在松树下吃着干净的素饭。我已经像乡野老人一样和人们随意相处了，海鸥为什么还要猜疑我呢？",
      }
      ],
    },
    {
      title: "望月有感 · 白居易",
      art: 'tangshi-300:ch168',
      artPrompt: "古诗《望月有感》意境插画：时难年荒世业空，弟兄羁旅各西东。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "时难年荒世业空，弟兄羁旅各西东。\n田园寥落干戈后，骨肉流离道路中。\n吊影分为千里雁，辞根散作九秋蓬。\n共看明月应垂泪，一夜乡心五处同。",
        pinyin: "shí nán nián huāng shì yè kōng， dì xiong jī lǚ gè xī dōng。\ntián yuán liáo luò gān gē hòu， gǔ ròu liú lí dào lù zhōng。\ndiào yǐng fēn wéi qiān lǐ yàn， cí gēn sàn zuò jiǔ qiū péng。\ngòng kàn míng yuè yìng chuí lèi， yī yè xiāng xīn wǔ chù tóng。",
        translation: "年成不好、世道艰难，家里的产业都空了，兄弟们逃荒在外，各奔东西。战乱过后田园荒凉，亲人们流离失所走在路上。我们像失群的大雁一样孤单，像断了根的蓬草一样飘散。今晚大家望着同一轮明月，应该都会掉眼泪吧——虽然人在五个不同的地方，想念家乡的心是一样的。",
      }
      ],
    },
    {
      title: "奉和中书舍人贾至早朝 · 岑参",
      art: 'tangshi-300:ch169',
      artPrompt: "古诗《奉和中书舍人贾至早朝》意境插画：鸡鸣紫陌曙光寒，莺啭皇州春色阑。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "鸡鸣紫陌曙光寒，莺啭皇州春色阑。\n金阙晓钟开万户，玉阶仙仗拥千官。\n花迎剑珮星初落，柳拂旌旗露未干。\n独有凤凰池上客，阳春一曲和皆难。",
        pinyin: "jī míng zǐ mò shǔ guāng hán， yīng zhuàn huáng zhōu chūn sè lán。\njīn quē xiǎo zhōng kāi wàn hù， yù jiē xiān zhàng yōng qiān guān。\nhuā yíng jiàn pèi xīng chū luò， liǔ fú jīng qí lù wèi gān。\ndú yǒu fèng huáng chí shàng kè， yáng chūn yī qǔ hé jiē nán。",
        translation: "鸡叫了，京城的大路上曙光带着寒意，黄莺啼叫着，皇城的春天快过完了。宫殿的晨钟一响，千家万户都打开了，白玉台阶前仪仗队簇拥着千百位官员。花儿迎着佩戴宝剑的官员开放，星星刚刚落下；柳枝轻拂着旌旗，露水还没干。只有凤凰池上的贾舍人写的那首诗太高妙了，大家都觉得很难跟上。",
      }
      ],
    },
    {
      title: "登金陵凤凰台 · 李白",
      art: 'tangshi-300:ch170',
      artPrompt: "古诗《登金陵凤凰台》意境插画：凤凰台上凤凰游，凤去台空江自流。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "凤凰台上凤凰游，凤去台空江自流。\n吴宫花草埋幽径，晋代衣冠成古丘。\n三山半落青天外，二水中分白鹭洲。(二水 一作：一水)\n总为浮云能蔽日，长安不见使人愁。",
        pinyin: "fèng huáng tái shàng fèng huáng yóu， fèng qù tái kōng jiāng zì liú。\nwú gōng huā cǎo mái yōu jìng， jìn dài yī guān chéng gǔ qiū。\nsān shān bàn luò qīng tiān wài， èr shuǐ zhōng fēn bái lù zhōu。( èr shuǐ yī zuò： yī shuǐ)\nzǒng wèi fú yún néng bì rì， cháng ān bù jiàn shǐ rén chóu。",
        translation: "凤凰台上曾经有凤凰来游玩，凤凰飞走了，台子空着，江水照样流。吴国宫殿的花草埋没了幽静的小路，东晋的达官贵人也都变成了古坟。三山有一半落在青天外，江水被白鹭洲分成两道。只因为浮云能遮住太阳，望不见长安，真让人发愁。",
      }
      ],
    },
    {
      title: "无题·重帏深下莫愁堂 · 李商隐",
      art: 'tangshi-300:ch171',
      artPrompt: "古诗《无题·重帏深下莫愁堂》意境插画：重帏深下莫愁堂，卧后清宵细细长。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "重帏深下莫愁堂，卧后清宵细细长。\n神女生涯原是梦，小姑居处本无郎。\n风波不信菱枝弱，月露谁教桂叶香。\n直道相思了无益，未妨惆怅是清狂。",
        pinyin: "zhòng wéi shēn xià mò chóu táng， wò hòu qīng xiāo xì xì cháng。\nshén nǚ shēng yá yuán shì mèng， xiǎo gū jū chù běn wú láng。\nfēng bō bù xìn líng zhī ruò， yuè lù shuí jiào guì yè xiāng。\nzhí dào xiāng sī le wú yì， wèi fáng chóu chàng shì qīng kuáng。",
        translation: "层层帘幕深深垂下，躺下以后，静静的长夜显得特别长。神女的故事原来只是一场梦，姑娘的住处本来就没有情郎。就算说相思完全没有用处，也不妨碍我怀着这份惆怅，痴痴地想着。",
      }
      ],
    },
    {
      title: "无题·凤尾香罗薄几重 · 李商隐",
      art: 'tangshi-300:ch172',
      artPrompt: "古诗《无题·凤尾香罗薄几重》意境插画：凤尾香罗薄几重，碧文圆顶夜深缝。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "凤尾香罗薄几重，碧文圆顶夜深缝。\n扇裁月魄羞难掩，车走雷声语未通。\n曾是寂寥金烬暗，断无消息石榴红。\n斑骓只系垂杨岸，何处西南任好风。(任 一作：待)",
        pinyin: "fèng wěi xiāng luó báo jǐ chóng， bì wén yuán dǐng yè shēn fèng。\nshàn cái yuè pò xiū nán yǎn， chē zǒu léi shēng yǔ wèi tōng。\ncéng shì jì liáo jīn jìn àn， duàn wú xiāo xī shí liú hóng。\nbān zhuī zhī xì chuí yáng àn， hé chù xī nán rèn hǎo fēng。( rèn yī zuò： dài)",
        translation: "深夜里她还在缝着薄薄的香罗帐子。那次她用圆扇半遮着脸，害羞也遮不住，对方的车像雷声一样匆匆驶过，连一句话都没说上。多少个寂寞的夜晚蜡烛烧暗了，石榴花又开了，还是没有一点消息。心上人的马就拴在长着垂杨的岸边，什么时候西南方吹来好风，能送到他身边呢？",
      }
      ],
    },
    {
      title: "无题·相见时难别亦难 · 李商隐",
      art: 'tangshi-300:ch173',
      artPrompt: "古诗《无题·相见时难别亦难》意境插画：相见时难别亦难，东风无力百花残。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "相见时难别亦难，东风无力百花残。\n春蚕到死丝方尽，蜡炬成灰泪始干。\n晓镜但愁云鬓改，夜吟应觉月光寒。\n蓬山此去无多路，青鸟殷勤为探看。(蓬山 一作：蓬莱)",
        pinyin: "xiāng jiàn shí nán bié yì nán， dōng fēng wú lì bǎi huā cán。\nchūn cán dào sǐ sī fāng jìn， là jù chéng huī lèi shǐ gān。\nxiǎo jìng dàn chóu yún bìn gǎi， yè yín yìng jué yuè guāng hán。\npéng shān cǐ qù wú duō lù， qīng niǎo yīn qín wèi tàn kàn。( péng shān yī zuò： péng lái)",
        translation: "见面本来就难，分别时更舍不得，东风无力吹着，百花都凋谢了。春蚕直到死去才把丝吐完，蜡烛烧成灰烛泪才流干。早上照镜子只担心头发变白，夜里吟诗会觉得月光寒冷。好在从这里到对方住的地方不算太远，希望青鸟替我去探望。",
      }
      ],
    },
    {
      title: "无题·来是空言去绝踪 · 李商隐",
      art: 'tangshi-300:ch174',
      artPrompt: "古诗《无题·来是空言去绝踪》意境插画：来是空言去绝踪，月斜楼上五更钟。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "来是空言去绝踪，月斜楼上五更钟。\n梦为远别啼难唤，书被催成墨未浓。\n蜡照半笼金翡翠，麝薰微度绣芙蓉。\n刘郎已恨蓬山远，更隔蓬山一万重！",
        pinyin: "lái shì kōng yán qù jué zōng， yuè xié lóu shàng wǔ gēng zhōng。\nmèng wèi yuǎn bié tí nán huàn， shū bèi cuī chéng mò wèi nóng。\nlà zhào bàn lóng jīn fěi cuì， shè xūn wēi dù xiù fú róng。\nliú láng yǐ hèn péng shān yuǎn， gèng gé péng shān yī wàn chóng！",
        translation: "说好要来却只是空话，一走就再没有踪影，月亮斜照着小楼，五更的钟声响起来。梦里因为远别哭得叫不出声，醒来急忙写信，墨都来不及磨浓。烛光半照着绣有金翡翠的帷帐，麝香淡淡地飘过绣着芙蓉花的被子。已经嫌蓬山太远了，谁想到还隔着一万重蓬山呢！",
      }
      ],
    },
    {
      title: "无题·飒飒东风细雨来 · 李商隐",
      art: 'tangshi-300:ch175',
      artPrompt: "古诗《无题·飒飒东风细雨来》意境插画：飒飒东风细雨来，芙蓉塘外有轻雷。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "飒飒东风细雨来，芙蓉塘外有轻雷。\n金蟾啮锁烧香入，玉虎牵丝汲井回。\n贾氏窥帘韩掾少，宓妃留枕魏王才。\n春心莫共花争发，一寸相思一寸灰！",
        pinyin: "sà sà dōng fēng xì yǔ lái， fú róng táng wài yǒu qīng léi。\njīn chán niè suǒ shāo xiāng rù， yù hǔ qiān sī jí jǐng huí。\njiǎ shì kuī lián hán yuàn shǎo， mì fēi liú zhěn wèi wáng cái。\nchūn xīn mò gòng huā zhēng fā， yī cùn xiāng sī yī cùn huī！",
        translation: "东风沙沙地吹着细雨来了，荷花塘外响着轻轻的雷声。香烟从锁着的香炉里飘出来，井上辘轳牵着井绳打水回来。就像贾家姑娘隔着帘子看上了年轻的韩郎，洛水女神留下了枕头给有才的魏王。思念的心不要和春花一起争着开放，因为一寸相思，就会烧成一寸冷灰！",
      }
      ],
    },
    {
      title: "无题·昨夜星辰昨夜风 · 李商隐",
      art: 'tangshi-300:ch176',
      artPrompt: "古诗《无题·昨夜星辰昨夜风》意境插画：昨夜星辰昨夜风，画楼西畔桂堂东。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "昨夜星辰昨夜风，画楼西畔桂堂东。\n身无彩凤双飞翼，心有灵犀一点通。\n隔座送钩春酒暖，分曹射覆蜡灯红。\n嗟余听鼓应官去，走马兰台类转蓬。",
        pinyin: "zuó yè xīng chén zuó yè fēng， huà lóu xī pàn guì táng dōng。\nshēn wú cǎi fèng shuāng fēi yì， xīn yǒu líng xī yī diǎn tōng。\ngé zuò sòng gōu chūn jiǔ nuǎn， fēn cáo shè fù là dēng hóng。\njiē yú tīng gǔ yìng guān qù， zǒu mǎ lán tái lèi zhuǎn péng。",
        translation: "昨夜有星星有晚风，就在画楼的西边、桂堂的东边。可惜我身上没有彩凤那样的双翅，飞不到你身边，可是我们心里像有灵犀一点就相通。宴席上大家隔着座位玩游戏，春酒暖暖的，蜡烛红红的。可叹鼓声一响我就要去当差了，骑着马赶去官署，像随风打转的蓬草。",
      }
      ],
    },
    {
      title: "春雨 · 李商隐",
      art: 'tangshi-300:ch177',
      artPrompt: "古诗《春雨》意境插画：怅卧新春白夹衣，白门寥落意多违。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "怅卧新春白夹衣，白门寥落意多违。\n红楼隔雨相望冷，珠箔飘灯独自归。\n远路应悲春晼晚，残霄犹得梦依稀。\n玉珰缄札何由达，万里云罗一雁飞。",
        pinyin: "chàng wò xīn chūn bái jiá yī， bái mén liáo luò yì duō wéi。\nhóng lóu gé yǔ xiāng wàng lěng， zhū bó piāo dēng dú zì guī。\nyuǎn lù yìng bēi chūn wǎn wǎn， cán xiāo yóu dé mèng yī xī。\nyù dāng jiān zhá hé yóu dá， wàn lǐ yún luó yī yàn fēi。",
        translation: "新春的时节，我穿着白夹衣失意地躺着，这座城里冷冷清清，多少事都不顺心。隔着细雨望着她住的红楼，只觉得一片冷清；提着飘摇的灯，看着珠帘，只好一个人回去。远路上春天快要过完叫人悲伤，剩下的夜里还能在梦中隐隐约约见到你。玉珰和书信要怎样送到呢？万里云天像罗网一样，只有一只孤雁飞过去了。",
      }
      ],
    },
    {
      title: "筹笔驿 · 李商隐",
      art: 'tangshi-300:ch178',
      artPrompt: "古诗《筹笔驿》意境插画：猿鸟犹疑畏简书，风云常为护储胥。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "猿鸟犹疑畏简书，风云常为护储胥。\n徒令上将挥神笔，终见降王走传车。\n管乐有才原不忝，关张无命欲何如？\n他年锦里经祠庙，梁父吟成恨有余。",
        pinyin: "yuán niǎo yóu yí wèi jiǎn shū， fēng yún cháng wèi hù chǔ xū。\ntú lìng shàng jiàng huī shén bǐ， zhōng jiàn jiàng wáng zǒu chuán chē。\nguǎn yuè yǒu cái yuán bù tiǎn， guān zhāng wú mìng yù hé rú？\ntā nián jǐn lǐ jīng cí miào， liáng fù yín chéng hèn yǒu yú。",
        translation: "猿猴和飞鸟好像还害怕他当年的军令，风云也常年来守护着他营垒的遗迹。他白白挥动神妙的笔墨用心谋划，最后还是眼看着君王乘车去投降了。他的才干本来比得上管仲、乐毅，可是关羽、张飞相继亡故，大势已去又有什么办法呢？后来的人路过锦里的祠庙，读着他的诗篇，心里的遗憾久久不散。",
      }
      ],
    },
    {
      title: "锦瑟 · 李商隐",
      art: 'tangshi-300:ch179',
      artPrompt: "古诗《锦瑟》意境插画：锦瑟无端五十弦，一弦一柱思华年。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "锦瑟无端五十弦，一弦一柱思华年。\n庄生晓梦迷蝴蝶，望帝春心托杜鹃。\n沧海月明珠有泪，蓝田日暖玉生烟。\n此情可待成追忆，只是当时已惘然。",
        pinyin: "jǐn sè wú duān wǔ shí xián， yī xián yī zhù sī huá nián。\nzhuāng shēng xiǎo mèng mí hú dié， wàng dì chūn xīn tuō dù juān。\ncāng hǎi yuè míng zhū yǒu lèi， lán tián rì nuǎn yù shēng yān。\ncǐ qíng kě dài chéng zhuī yì， zhǐ shì dāng shí yǐ wǎng rán。",
        translation: "华美的瑟呀，你为什么有五十根弦，每一根弦、每一个柱都让人想起美好的年华。那往事像庄子早上做的梦，分不清是人是蝴蝶；像望帝的心事，托付给了啼叫的杜鹃。沧海月明，眼泪凝成了珍珠；蓝田日暖，美玉升起蒙蒙的烟。这样的情哪里要等到今天才回忆，就在当时，也已经叫人迷惘了。",
      }
      ],
    },
    {
      title: "隋宫 · 李商隐",
      art: 'tangshi-300:ch180',
      artPrompt: "古诗《隋宫》意境插画：紫泉宫殿锁烟霞，欲取芜城作帝家。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "紫泉宫殿锁烟霞，欲取芜城作帝家。\n玉玺不缘归日角，锦帆应是到天涯。\n于今腐草无萤火，终古垂杨有暮鸦。\n地下若逢陈后主，岂宜重问后庭花。",
        pinyin: "zǐ quán gōng diàn suǒ yān xiá， yù qǔ wú chéng zuò dì jiā。\nyù xǐ bù yuán guī rì jiǎo， jǐn fān yìng shì dào tiān yá。\nyú jīn fǔ cǎo wú yíng huǒ， zhōng gǔ chuí yáng yǒu mù yā。\ndì xià ruò féng chén hòu zhǔ， qǐ yí zhòng wèn hòu tíng huā。",
        translation: "长安的宫殿锁在烟霞里不用，他却想把扬州当作自己的家。要不是江山换了主人，他坐着锦帆的大船，怕是一直要游到天边去。如今当年放萤火虫的地方连萤火虫都没有了，只有垂杨柳上永远停着黄昏的乌鸦。他如果在地下遇见了陈后主，哪好意思再问《后庭花》那支曲子呢？",
      }
      ],
    },
    {
      title: "送魏万之京 · 李颀",
      art: 'tangshi-300:ch181',
      artPrompt: "古诗《送魏万之京》意境插画：朝闻游子唱离歌，昨夜微霜初渡河。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "朝闻游子唱离歌，昨夜微霜初渡河。\n鸿雁不堪愁里听，云山况是客中过。\n关城树色催寒近，御苑砧声向晚多。(\n色 一作：曙)\n莫见长安行乐处，空令岁月易蹉跎。",
        pinyin: "cháo wén yóu zǐ chàng lí gē， zuó yè wēi shuāng chū dù hé。\nhóng yàn bù kān chóu lǐ tīng， yún shān kuàng shì kè zhōng guò。\nguān chéng shù sè cuī hán jìn， yù yuàn zhēn shēng xiàng wǎn duō。(\nsè yī zuò： shǔ)\nmò jiàn cháng ān xíng lè chù， kōng lìng suì yuè yì cuō tuó。",
        translation: "早晨听到你唱着离别的歌，昨夜你刚踏着微微的霜渡过河去。心里发愁的时候，最不忍听鸿雁的叫声；何况你还要一个人经过云雾里的山。关城的树色催着寒气越来越近，京城傍晚捣衣的声音也多起来。千万别把长安当成享乐的地方，白白让美好的岁月虚度了。",
      }
      ],
    },
    {
      title: "咏怀古迹·其一 · 杜甫",
      art: 'tangshi-300:ch182',
      artPrompt: "古诗《咏怀古迹·其一》意境插画：支离东北风尘际，漂泊西南天地间。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "支离东北风尘际，漂泊西南天地间。\n三峡楼台淹日月，五溪衣服共云山。\n羯胡事主终无赖，词客哀时且未还。\n庾信平生最萧瑟，暮年诗赋动江关。",
        pinyin: "zhī lí dōng běi fēng chén jì， piāo bó xī nán tiān dì jiān。\nsān xiá lóu tái yān rì yuè， wǔ xī yī fu gòng yún shān。\njié hú shì zhǔ zhōng wú lài， cí kè āi shí qiě wèi hái。\nyǔ xìn píng shēng zuì xiāo sè， mù nián shī fù dòng jiāng guān。",
        translation: "战乱中我在东北一带颠沛流离，如今又漂泊在西南的天地之间。三峡的楼台留住了我一个又一个月日夜夜，我和五溪的百姓一同住在云山里。叛乱的人背叛主子，终究无耻；写诗的我哀伤时局，还不能回家。想起庾信一生最是凄凉，晚年写的诗赋却震动天下。",
      }
      ],
    },
    {
      title: "咏怀古迹·其二 · 杜甫",
      art: 'tangshi-300:ch183',
      artPrompt: "古诗《咏怀古迹·其二》意境插画：摇落深知宋玉悲，风流儒雅亦吾师。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "摇落深知宋玉悲，风流儒雅亦吾师。\n怅望千秋一洒泪，萧条异代不同时。\n江山故宅空文藻，云雨荒台岂梦思。\n最是楚宫俱泯灭，舟人指点到今疑。",
        pinyin: "yáo luò shēn zhī sòng yù bēi， fēng liú rú yǎ yì wú shī。\nchàng wàng qiān qiū yī sǎ lèi， xiāo tiáo yì dài bù tóng shí。\njiāng shān gù zhái kōng wén zǎo， yún yǔ huāng tái qǐ mèng sī。\nzuì shì chǔ gōng jù mǐn miè， zhōu rén zhǐ diǎn dào jīn yí。",
        translation: "在草木凋零的秋天里，我最懂宋玉的悲伤，他风度文雅，也是我的老师。怅望着千年前的往事不禁落泪，我们生在不同的时代，不能相见。江山里他的旧宅还在，可是满腹文才都白白流传了；那荒废的高台，哪里只是一场梦呢。最可惜楚国的宫殿全都消失了，船夫们指着那一带，到今天还在疑惑呢。",
      }
      ],
    },
    {
      title: "咏怀古迹·其三 · 杜甫",
      art: 'tangshi-300:ch184',
      artPrompt: "古诗《咏怀古迹·其三》意境插画：群山万壑赴荆门，生长明妃尚有村。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "群山万壑赴荆门，生长明妃尚有村。\n一去紫台连朔漠，独留青冢向黄昏。\n画图省识春风面，环佩空归夜月魂。(夜月 一作：月夜 环\n一作：环\n)\n千载琵琶作胡语，分明怨恨曲中论。",
        pinyin: "qún shān wàn hè fù jīng mén， shēng zhǎng míng fēi shàng yǒu cūn。\nyī qù zǐ tái lián shuò mò， dú liú qīng zhǒng xiàng huáng hūn。\nhuà tú shěng shí chūn fēng miàn， huán pèi kōng guī yè yuè hún。( yè yuè yī zuò： yuè yè huán\nyī zuò： huán\n\nqiān zǎi pí pa zuò hú yǔ， fēn míng yuàn hèn qǔ zhōng lùn。",
        translation: "千山万谷一路奔向荆门，那里还有王昭君生长过的小村庄。她一离开汉宫就去了北方的大沙漠，最后只留下一座青色的坟，孤零零地对着黄昏。皇帝只凭画像认人，没能认出她美丽的模样；月亮夜里，她的魂魄空空地回到家乡。千年来琵琶弹着胡地的曲子，那里面分明在诉说她的怨恨啊。",
      }
      ],
    },
    {
      title: "咏怀古迹·其四 · 杜甫",
      art: 'tangshi-300:ch185',
      artPrompt: "古诗《咏怀古迹·其四》意境插画：蜀主窥吴幸三峡，崩年亦在永安宫。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "蜀主窥吴幸三峡，崩年亦在永安宫。\n翠华想像空山里，玉殿虚无野寺中。\n古庙杉松巢水鹤，岁时伏腊走村翁。\n武侯祠堂常邻近，一体君臣祭祀同。",
        pinyin: "shǔ zhǔ kuī wú xìng sān xiá， bēng nián yì zài yǒng ān gōng。\ncuì huá xiǎng xiàng kōng shān lǐ， yù diàn xū wú yě sì zhōng。\ngǔ miào shān sōng cháo shuǐ hè， suì shí fú là zǒu cūn wēng。\nwǔ hóu cí táng cháng lín jìn， yī tǐ jūn chén jì sì tóng。",
        translation: "蜀主刘备去攻打吴国，来到三峡，最后死在永安宫。想象中，他的仪仗飘在空山里；玉做的宫殿已经不见了，只剩野地里的一座寺庙。古庙的杉松树上，水鹤做了窝；逢年过节，村里的老人都来祭祀。武侯的祠堂就在旁边，君臣二人受着乡亲们同样的祭拜。",
      }
      ],
    },
    {
      title: "咏怀古迹·其五 · 杜甫",
      art: 'tangshi-300:ch186',
      artPrompt: "古诗《咏怀古迹·其五》意境插画：诸葛大名垂宇宙，宗臣遗像肃清高。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "诸葛大名垂宇宙，宗臣遗像肃清高。\n三分割据纡筹策，万古云霄一羽毛。\n伯仲之间见伊吕，指挥若定失萧曹。\n运移汉祚终难复，志决身歼军务劳。",
        pinyin: "zhū gě dà míng chuí yǔ zhòu， zōng chén yí xiàng sù qīng gāo。\nsān fēn gē jù yū chóu cè， wàn gǔ yún xiāo yī yǔ máo。\nbó zhòng zhī jiān jiàn yī lǚ， zhǐ huī ruò dìng shī xiāo cáo。\nyùn yí hàn zuò zhōng nán fù， zhì jué shēn jiān jūn wù láo。",
        translation: "诸葛亮的大名传遍天地，祠堂里他的遗像庄严肃穆又清高。他用心谋划，才有了天下三分的格局；他就像万古云霄上高高飞翔的一只大鸟。他的才德和伊尹、吕尚不相上下，他从容指挥，连萧何、曹参也比不上。可惜汉朝的气数尽了，终究难以恢复；他下定决心尽忠，在劳累的军务中耗尽了一生。",
      }
      ],
    },
    {
      title: "宿府 · 杜甫",
      art: 'tangshi-300:ch187',
      artPrompt: "古诗《宿府》意境插画：清秋幕府井梧寒，独宿江城蜡炬残。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "清秋幕府井梧寒，独宿江城蜡炬残。\n永夜角声悲自语，中天月色好谁看。\n风尘荏苒音书绝，关塞萧条行路难。\n已忍伶俜十年事，强移栖息一枝安。",
        pinyin: "qīng qiū mù fǔ jǐng wú hán， dú sù jiāng chéng là jù cán。\nyǒng yè jiǎo shēng bēi zì yǔ， zhōng tiān yuè sè hǎo shuí kàn。\nfēng chén rěn rǎn yīn shū jué， guān sāi xiāo tiáo xíng lù nán。\nyǐ rěn líng pīng shí nián shì， qiáng yí qī xī yī zhī ān。",
        translation: "清冷的秋天，幕府井边的梧桐带着寒意，我独自睡在江城，蜡烛快烧完了。漫漫长夜里号角声像人在悲伤地自言自语，天上月色这么好，又有谁来看呢。战乱这么久，亲人的书信都断了；关塞荒凉，路这么难走。我已经忍受了十年的孤苦，如今不过是像鸟儿勉强找一根树枝，暂时安身罢了。",
      }
      ],
    },
    {
      title: "阁夜 · 杜甫",
      art: 'tangshi-300:ch188',
      artPrompt: "古诗《阁夜》意境插画：岁暮阴阳催短景，天涯霜雪霁寒宵。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "岁暮阴阳催短景，天涯霜雪霁寒宵。\n五更鼓角声悲壮，三峡星河影动摇。\n野哭几家闻战伐，夷歌数处起渔樵。\n卧龙跃马终黄土，人事依依漫寂寥。",
        pinyin: "suì mù yīn yáng cuī duǎn jǐng， tiān yá shuāng xuě jì hán xiāo。\nwǔ gēng gǔ jiǎo shēng bēi zhuàng， sān xiá xīng hé yǐng dòng yáo。\nyě kū jǐ jiā wén zhàn fá， yí gē shù chù qǐ yú qiáo。\nwò lóng yuè mǎ zhōng huáng tǔ， rén shì yī yī màn jì liáo。",
        translation: "年底了，冬天的白日短短的，时光催人；天涯的霜雪刚停，正是寒冷的夜。五更天军营的鼓角声那么悲壮，三峡上空银河的影子随水动摇。听见几家在野外为打仗痛哭，又有几处渔人樵夫唱着歌。卧龙诸葛亮、跃马公孙述那样的英雄，最后都变成了黄土，我又何必为这些事烦心，独自寂寥呢。",
      }
      ],
    },
    {
      title: "闻官军收河南河北 · 杜甫",
      art: 'tangshi-300:ch189',
      artPrompt: "古诗《闻官军收河南河北》意境插画：剑外忽传收蓟北，初闻涕泪满衣裳。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "剑外忽传收蓟北，初闻涕泪满衣裳。\n却看妻子愁何在，漫卷诗书喜欲狂。\n白日放歌须纵酒，青春作伴好还乡。\n即从巴峡穿巫峡，便下襄阳向洛阳。",
        pinyin: "jiàn wài hū chuán shōu jì běi， chū wén tì lèi mǎn yī shang。\nquè kàn qī zǐ chóu hé zài， màn juàn shī shū xǐ yù kuáng。\nbái rì fàng gē xū zòng jiǔ， qīng chūn zuò bàn hǎo huán xiāng。\njí cóng bā xiá chuān wū xiá， biàn xià xiāng yáng xiàng luò yáng。",
        translation: "剑门关外忽然传来收复蓟北的好消息，刚一听见，高兴的泪水就沾满了衣裳。回头看妻子儿女，脸上的愁云都不见了；我胡乱地把诗书卷起来，欢喜得快要发狂。大白天放声唱歌、开怀喝酒，趁着明媚的春光，正好一起回家乡。马上从巴峡穿过巫峡，再下襄阳，直奔洛阳！",
      }
      ],
    },
    {
      title: "登高 · 杜甫",
      art: 'tangshi-300:ch190',
      artPrompt: "古诗《登高》意境插画：风急天高猿啸哀，渚清沙白鸟飞回。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "风急天高猿啸哀，渚清沙白鸟飞回。\n无边落木萧萧下，不尽长江滚滚来。\n万里悲秋常作客，百年多病独登台。\n艰难苦恨繁霜鬓，潦倒新停浊酒杯。",
        pinyin: "fēng jí tiān gāo yuán xiào āi， zhǔ qīng shā bái niǎo fēi huí。\nwú biān luò mù xiāo xiāo xià， bù jìn cháng jiāng gǔn gǔn lái。\nwàn lǐ bēi qiū cháng zuò kè， bǎi nián duō bìng dú dēng tái。\njiān nán kǔ hèn fán shuāng bìn， liáo dǎo xīn tíng zhuó jiǔ bēi。",
        translation: "风又急，天又高，猿猴的叫声那么悲哀；小洲清清，沙岸雪白，鸟儿来回地飞。无边无际的树叶萧萧落下，望不到头的长江滚滚流来。悲凉的秋天里，我常常离家万里、漂泊在外；老了又多病，还独自登上高台。一辈子艰难困苦，两鬓都白了；穷困潦倒，连这杯浊酒也刚刚停下不能喝了。",
      }
      ],
    },
    {
      title: "登楼 · 杜甫",
      art: 'tangshi-300:ch191',
      artPrompt: "古诗《登楼》意境插画：花近高楼伤客心，万方多难此登临。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "花近高楼伤客心，万方多难此登临。\n锦江春色来天地，玉垒浮云变古今。\n北极朝廷终不改，西山寇盗莫相侵。\n可怜后主还祠庙，日暮聊为梁甫吟。(梁甫 一作：梁父)",
        pinyin: "huā jìn gāo lóu shāng kè xīn， wàn fāng duō nán cǐ dēng lín。\njǐn jiāng chūn sè lái tiān dì， yù lěi fú yún biàn gǔ jīn。\nběi jí cháo tíng zhōng bù gǎi， xī shān kòu dào mò xiāng qīn。\nkě lián hòu zhǔ hái cí miào， rì mù liáo wèi liáng fǔ yín。( liáng fǔ yī zuò： liáng fù)",
        translation: "高楼边开满了花，却让在外的我更加伤心；天下这么多灾难，我偏偏在这时候登上楼来。锦江的春色铺满天地，玉垒山上的浮云从古到今变幻不停。朝廷像北极星一样永远不会改变，西山的强盗们不要再来侵犯。可怜亡国的后主居然还有祠庙，太阳落山了，我姑且学着他的样子吟一首诗吧。",
      }
      ],
    },
    {
      title: "蜀相 · 杜甫",
      art: 'tangshi-300:ch192',
      artPrompt: "古诗《蜀相》意境插画：丞相祠堂何处寻，锦官城外柏森森。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "丞相祠堂何处寻，锦官城外柏森森。\n映阶碧草自春色，隔叶黄鹂空好音。\n三顾频烦天下计，两朝开济老臣心。(频烦 一作：频繁)\n出师未捷身先死，长使英雄泪满襟。",
        pinyin: "chéng xiàng cí táng hé chù xún， jǐn guān chéng wài bǎi sēn sēn。\nyìng jiē bì cǎo zì chūn sè， gé yè huáng lí kōng hǎo yīn。\nsān gù pín fán tiān xià jì， liǎng cháo kāi jì lǎo chén xīn。( pín fán yī zuò： pín fán)\nchū shī wèi jié shēn xiān sǐ， cháng shǐ yīng xióng lèi mǎn jīn。",
        translation: "到哪里去寻找诸葛丞相的祠堂呢？就在锦官城外那片苍翠的柏树林里。碧绿的草映着台阶，白白地展现着春色；树叶深处的黄鹂，白白地唱着好听的歌。先主三次登门拜访，请您出山共商天下大计；您辅佐两代君王，一片老臣的忠心。可惜出师还没打胜仗，您就先去世了，千百年来总让英雄们泪水湿透衣襟。",
      }
      ],
    },
    {
      title: "客至 · 杜甫",
      art: 'tangshi-300:ch193',
      artPrompt: "古诗《客至》意境插画：舍南舍北皆春水，但见群鸥日日来。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "舍南舍北皆春水，但见群鸥日日来。\n花径不曾缘客扫，蓬门今始为君开。\n盘飧市远无兼味，樽酒家贫只旧醅。\n肯与邻翁相对饮，隔篱呼取尽余杯。(余 通：余)",
        pinyin: "shè nán shè běi jiē chūn shuǐ， dàn jiàn qún ōu rì rì lái。\nhuā jìng bù céng yuán kè sǎo， péng mén jīn shǐ wèi jūn kāi。\npán sūn shì yuǎn wú jiān wèi， zūn jiǔ jiā pín zhī jiù pēi。\nkěn yǔ lín wēng xiāng duì yǐn， gé lí hū qǔ jìn yú bēi。( yú tōng： yú)",
        translation: "我的屋子南边北边都是春天的水，只看见一群群鸥鸟天天飞来。长满花草的小路，从来没有为客人扫过；今天这扇柴门，第一次为你打开。集市太远，盘子里的菜没有几样；家里穷，酒也只是没过滤的陈酒。要是你不嫌弃，我就隔着篱笆喊邻家的老翁过来，把剩下的酒一起喝干。",
      }
      ],
    },
    {
      title: "野望 · 杜甫",
      art: 'tangshi-300:ch194',
      artPrompt: "古诗《野望》意境插画：西山白雪三城戍，南浦清江万里桥。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "西山白雪三城戍，南浦清江万里桥。\n海内风尘诸弟隔，天涯涕泪一身遥。\n惟将迟暮供多病，未有涓埃答圣朝。(惟 通：唯)\n跨马出郊时极目，不堪人事日萧条。",
        pinyin: "xī shān bái xuě sān chéng shù， nán pǔ qīng jiāng wàn lǐ qiáo。\nhǎi nèi fēng chén zhū dì gé， tiān yá tì lèi yī shēn yáo。\nwéi jiāng chí mù gòng duō bìng， wèi yǒu juān āi dá shèng cháo。( wéi tōng： wéi)\nkuà mǎ chū jiāo shí jí mù， bù kān rén shì rì xiāo tiáo。",
        translation: "西山顶上白雪覆盖，那里有三座城在驻守；南边水边是清澈的江水，江上有万里桥。战乱让弟弟们隔在天各一方，我在遥远的天边独自流泪。我只能把晚年交给一身疾病，没有一点点功劳来报答朝廷。骑马出到郊外，常常放眼远望；世间的事一天天萧条，真叫人看不下去啊。",
      }
      ],
    },
    {
      title: "登柳州城楼寄漳汀封连四州 · 柳宗元",
      art: 'tangshi-300:ch195',
      artPrompt: "古诗《登柳州城楼寄漳汀封连四州》意境插画：城上高楼接大荒，海天愁思正茫茫。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "城上高楼接大荒，海天愁思正茫茫。\n惊风乱飐芙蓉水，密雨斜侵薜荔墙。\n岭树重遮千里目，江流曲似九回肠。\n共来百越文身地，犹自音书滞一乡。",
        pinyin: "chéng shàng gāo lóu jiē dà huāng， hǎi tiān chóu sī zhèng máng máng。\njīng fēng luàn zhǎn fú róng shuǐ， mì yǔ xié qīn bì lì qiáng。\nlǐng shù zhòng zhē qiān lǐ mù， jiāng liú qǔ sì jiǔ huí cháng。\ngòng lái bǎi yuè wén shēn dì， yóu zì yīn shū zhì yī xiāng。",
        translation: "城上的高楼连着辽阔的荒野，我的愁思像海和天一样茫茫无边。急风把长着荷花的水面吹得乱摇，密雨斜斜地打在长满薜荔的墙上。山岭上层层叠叠的树林，遮住了望向千里的眼睛；江水弯弯曲曲，就像我的愁肠打了好多个结。我们几个一起来到这百越之地，可还是音信不通，各在一方。",
      }
      ],
    },
    {
      title: "春思 · 皇甫冉",
      art: 'tangshi-300:ch196',
      artPrompt: "古诗《春思》意境插画：莺啼燕语报新年，马邑龙堆路几千。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "莺啼燕语报新年，马邑龙堆路几千。\n家住层城临汉苑，心随明月到胡天。(层城 一作：秦城)\n机中锦字论长恨，楼上花枝笑独眠。\n为问元戎窦车骑，何时返旆勒燕然。",
        pinyin: "yīng tí yàn yǔ bào xīn nián， mǎ yì lóng duī lù jǐ qiān。\njiā zhù céng chéng lín hàn yuàn， xīn suí míng yuè dào hú tiān。( céng chéng yī zuò： qín chéng)\njī zhōng jǐn zì lùn cháng hèn， lóu shàng huā zhī xiào dú mián。\nwèi wèn yuán róng dòu chē qí， hé shí fǎn pèi lè yàn rán。",
        translation: "黄莺啼、燕子叫，报告新年的来到；可丈夫远在边地，路有几千里的远。她的家住在京城，靠着皇家的园林，心却跟着明月飞到了丈夫所在的北方。织机上织出的锦字回文，写尽了长长的怨恨；楼上的花枝，好像在笑话她一个人睡觉。请问领兵的将军，你们什么时候打了胜仗，把旗帜插上燕然山回来呢？",
      }
      ],
    },
    {
      title: "寄李儋元锡 · 韦应物",
      art: 'tangshi-300:ch197',
      artPrompt: "古诗《寄李儋元锡》意境插画：去年花里逢君别，今日花开又一年。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "去年花里逢君别，今日花开又一年。\n世事茫茫难自料，春愁黯黯独成眠。\n身多疾病思田里，邑有流亡愧俸钱。\n闻道欲来相问讯，西楼望月几回圆。",
        pinyin: "qù nián huā lǐ féng jūn bié， jīn rì huā kāi yòu yī nián。\nshì shì máng máng nán zì liào， chūn chóu àn àn dú chéng mián。\nshēn duō jí bìng sī tián lǐ， yì yǒu liú wáng kuì fèng qián。\nwén dào yù lái xiāng wèn xùn， xī lóu wàng yuè jǐ huí yuán。",
        translation: "去年花开的时候和你分别，今年花又开了，又过了一年。世间的事茫茫无边，真是难以预料；春天的愁绪暗暗的，我只有一个人睡去。自己多病，想回乡下去；可城里还有逃难的百姓，拿着俸钱心里实在惭愧。听说你想来问候我，我天天在西楼望月，月亮已经圆过好几回了。",
      }
      ],
    },
    {
      title: "望蓟门 · 祖咏",
      art: 'tangshi-300:ch198',
      artPrompt: "古诗《望蓟门》意境插画：燕台一望客心惊，笳鼓喧喧汉将营。(笳鼓 一作：箫鼓)——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "燕台一望客心惊，笳鼓喧喧汉将营。(笳鼓 一作：箫鼓)\n万里寒光生积雪，三边曙色动危旌。\n沙场烽火侵胡月，海畔云山拥蓟城。\n少小虽非投笔吏，论功还欲请长缨。",
        pinyin: "yàn tái yī wàng kè xīn jīng， jiā gǔ xuān xuān hàn jiāng yíng。( jiā gǔ yī zuò： xiāo gǔ)\nwàn lǐ hán guāng shēng jī xuě， sān biān shǔ sè dòng wēi jīng。\nshā chǎng fēng huǒ qīn hú yuè， hǎi pàn yún shān yōng jì chéng。\nshǎo xiǎo suī fēi tóu bǐ lì， lùn gōng hái yù qǐng cháng yīng。",
        translation: "登上燕台一望，游子心里不禁震动，军营里胡笳战鼓响成一片。万里雪地闪着寒光，边关的曙色中高高的军旗在飘动。战场上的烽火连月亮都像被熏暗了，海边的云山簇拥着蓟城。我小时候虽然不是投笔从戎的人，可论到立功，也想请求一根长缨，为国家出力。",
      }
      ],
    },
    {
      title: "贫女 · 秦韬玉",
      art: 'tangshi-300:ch199',
      artPrompt: "古诗《贫女》意境插画：蓬门未识绮罗香，拟托良媒益自伤。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "蓬门未识绮罗香，拟托良媒益自伤。\n谁爱风流高格调，共怜时世俭梳妆。\n敢将十指夸针巧，不把双眉斗画长。\n苦恨年年压金线，为他人作嫁衣裳。",
        pinyin: "péng mén wèi shí qǐ luó xiāng， nǐ tuō liáng méi yì zì shāng。\nshuí ài fēng liú gāo gé diào， gòng lián shí shì jiǎn shū zhuāng。\ngǎn jiāng shí zhǐ kuā zhēn qiǎo， bù bǎ shuāng méi dòu huà cháng。\nkǔ hèn nián nián yā jīn xiàn， wèi tā rén zuò jià yī shang。",
        translation: "穷人家的姑娘从没见过绫罗绸缎，想托个好媒人说亲，反而更加伤心。如今人们都爱时髦俭朴的打扮，有谁欣赏她清高的品格呢。她敢用灵巧的十指夸自己的针线活，却不肯把眉毛画得长长的去跟人比美。最苦的是年年做着金线刺绣的活儿，都是替别人缝制出嫁的衣裳。",
      }
      ],
    },
    {
      title: "送李少府贬峡中王少府贬 · 高适",
      art: 'tangshi-300:ch200',
      artPrompt: "古诗《送李少府贬峡中王少府贬》意境插画：嗟君此别意何如，驻马衔杯问谪居。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "嗟君此别意何如，驻马衔杯问谪居。\n巫峡啼猿数行泪，衡阳归雁几封书。\n青枫江上秋帆远，白帝城边古木疏。\n圣代即今多雨露，暂时分手莫踌躇。",
        pinyin: "jiē jūn cǐ bié yì hé rú， zhù mǎ xián bēi wèn zhé jū。\nwū xiá tí yuán shù xíng lèi， héng yáng guī yàn jǐ fēng shū。\nqīng fēng jiāng shàng qiū fān yuǎn， bái dì chéng biān gǔ mù shū。\nshèng dài jí jīn duō yǔ lù， zàn shí fēn shǒu mò chóu chú。",
        translation: "叹息你们这次分别远去，心里是什么滋味？我停下马来，举着酒杯问候你们要去的地方。去巫峡的人听了猿啼会掉眼泪，去衡阳的人可以托回雁捎几封家书。青枫江上秋天的帆影渐渐远了，白帝城边的古树显得稀疏。如今是圣明时代，朝廷的恩泽多，暂时分别一下，不要难过犹豫。",
      }
      ],
    },
    {
      title: "九日登望仙台呈刘明府 · 崔曙",
      art: 'tangshi-300:ch201',
      artPrompt: "古诗《九日登望仙台呈刘明府》意境插画：汉文皇帝有高台，此日登临曙色开。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "汉文皇帝有高台，此日登临曙色开。\n三晋云山皆北向，二陵风雨自东来。\n关门令尹谁能识，河上仙翁去不回。\n且欲近寻彭泽宰，陶然共醉菊花杯。",
        pinyin: "hàn wén huáng dì yǒu gāo tái， cǐ rì dēng lín shǔ sè kāi。\nsān jìn yún shān jiē běi xiàng， èr líng fēng yǔ zì dōng lái。\nguān mén lìng yǐn shuí néng shí， hé shàng xiān wēng qù bù huí。\nqiě yù jìn xún péng zé zǎi， táo rán gòng zuì jú huā bēi。",
        translation: "汉文帝当年建了这座高台，今天重阳节登上来，曙光正好散开。三晋的云山都朝着北方，两座山陵的风雨从东边吹来。守关的令尹成了神仙，有谁能认出来呢？河上的仙翁一去就再没回来。我还是就近找一找像陶渊明那样的县令朋友，痛痛快快地一起干菊花酒吧。",
      }
      ],
    },
    {
      title: "登黄鹤楼 · 崔颢",
      art: 'tangshi-300:ch202',
      artPrompt: "古诗《登黄鹤楼》意境插画：昔人已乘黄鹤去，此地空余黄鹤楼。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "昔人已乘黄鹤去，此地空余黄鹤楼。\n黄鹤一去不复返，白云千载空悠悠。\n晴川历历汉阳树，芳草萋萋鹦鹉洲。\n日暮乡关何处是？烟波江上使人愁。",
        pinyin: "xī rén yǐ chéng huáng hè qù， cǐ dì kòng yú huáng hè lóu。\nhuáng hè yī qù bù fù fǎn， bái yún qiān zǎi kōng yōu yōu。\nqíng chuān lì lì hàn yáng shù， fāng cǎo qī qī yīng wǔ zhōu。\nrì mù xiāng guān hé chù shì？ yān bō jiāng shàng shǐ rén chóu。",
        translation: "从前的人已经骑着黄鹤飞走了，这里只剩下空空的黄鹤楼。黄鹤一去再也不回来，千百年来只有白云在空中飘啊飘。晴天里汉阳的树木看得清清楚楚，鹦鹉洲上长满了茂盛的芳草。太阳落山了，我的家乡在哪儿呢？江上烟波茫茫，真叫人发愁。",
      }
      ],
    },
    {
      title: "行经华阴 · 崔颢",
      art: 'tangshi-300:ch203',
      artPrompt: "古诗《行经华阴》意境插画：岧峣太华俯咸京，天外三峰削不成。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "岧峣太华俯咸京，天外三峰削不成。\n武帝祠前云欲散，仙人掌上雨初晴。\n河山北枕秦关险，驿树西连汉畤平。\n借问路傍名利客，无如此处学长生。",
        pinyin: "tiáo yáo tài huá fǔ xián jīng， tiān wài sān fēng xiāo bù chéng。\nwǔ dì cí qián yún yù sàn， xiān rén zhǎng shàng yǔ chū qíng。\nhé shān běi zhěn qín guān xiǎn， yì shù xī lián hàn zhì píng。\njiè wèn lù bàng míng lì kè， wú rú cǐ chù xué zhǎng shēng。",
        translation: "高高的华山俯视着长安城，天边三座山峰像刀削的一样，不是人能削出来的。武帝祠前云彩快要散了，仙人掌峰上雨刚停、天放晴。黄河华山北靠着险要的关口，路边的树往西连着平坦的原野。请问路上那些追名逐利的人啊，都不如在这华山里安心修仙、求得长生呢。",
      }
      ],
    },
    {
      title: "利州南渡 · 温庭筠",
      art: 'tangshi-300:ch204',
      artPrompt: "古诗《利州南渡》意境插画：澹然空水对斜晖，曲岛苍茫接翠微。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "澹然空水对斜晖，曲岛苍茫接翠微。\n波上马嘶看棹去，柳边人歇待船归。\n数丛沙草群鸥散，万顷江田一鹭飞。\n谁解乘舟寻范蠡，五湖烟水独忘机。",
        pinyin: "dàn rán kōng shuǐ duì xié huī， qǔ dǎo cāng máng jiē cuì wēi。\nbō shàng mǎ sī kàn zhào qù， liǔ biān rén xiē dài chuán guī。\nshù cóng shā cǎo qún ōu sàn， wàn qǐng jiāng tián yī lù fēi。\nshuí jiě chéng zhōu xún fàn lí， wǔ hú yān shuǐ dú wàng jī。",
        translation: "傍晚的江水静静映着斜阳，弯弯的小岛远远连着青翠的山。马儿在船上嘶叫着渡江而去，柳树下有人歇着等船回来。沙草丛里鸥鸟一群群飞散，宽阔的江田上空有一只白鹭飞过。谁懂得乘船去寻访范蠡，在五湖烟水里独自忘掉心机呢。",
      }
      ],
    },
    {
      title: "苏武庙 · 温庭筠",
      art: 'tangshi-300:ch205',
      artPrompt: "古诗《苏武庙》意境插画：苏武魂销汉使前，古祠高树两茫然。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "苏武魂销汉使前，古祠高树两茫然。\n云边雁断胡天月，陇上羊归塞草烟。\n回日楼台非甲帐，去时冠剑是丁年。\n茂陵不见封侯印，空向秋波哭逝川。",
        pinyin: "sū wǔ hún xiāo hàn shǐ qián， gǔ cí gāo shù liǎng máng rán。\nyún biān yàn duàn hú tiān yuè， lǒng shàng yáng guī sāi cǎo yān。\nhuí rì lóu tái fēi jiǎ zhàng， qù shí guān jiàn shì dīng nián。\nmào líng bù jiàn fēng hóu yìn， kōng xiàng qiū bō kū shì chuān。",
        translation: "苏武当年见到汉朝使者，激动得心都要碎了；如今古庙前只有高高的树，一片冷清。云边雁影断绝，胡地的月亮照着；山坡上羊群归来，塞外的草笼罩着烟雾。他回来时楼台已不是当年的样子，离开时还正是戴冠佩剑的壮年。茂陵里的皇帝再也看不到他封侯的印，他只能空对着秋天的江水，哭那流逝的岁月。",
      }
      ],
    },
    {
      title: "江州重别薛六柳 · 刘长卿",
      art: 'tangshi-300:ch206',
      artPrompt: "古诗《江州重别薛六柳》意境插画：生涯岂料承优诏，世事空知学醉歌。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "生涯岂料承优诏，世事空知学醉歌。\n江上月明胡雁过，淮南木落楚山多。\n寄身且喜沧洲近，顾影无如白发何。\n今日龙钟人共弃，愧君犹遣慎风波。",
        pinyin: "shēng yá qǐ liào chéng yōu zhào， shì shì kōng zhī xué zuì gē。\njiāng shàng yuè míng hú yàn guò， huái nán mù luò chǔ shān duō。\njì shēn qiě xǐ cāng zhōu jìn， gù yǐng wú rú bái fà hé。\njīn rì lóng zhōng rén gòng qì， kuì jūn yóu qiǎn shèn fēng bō。",
        translation: "没想到这一生还能得到朝廷宽厚的诏书，世事难料，只知道学人喝酒唱歌。江上月光明亮，大雁飞过；淮南树叶落了，楚山显得更多。住的地方靠近水边，心里觉得欢喜；可看看自己的影子，拿满头白发没有办法。今天我年老体衰被人嫌弃，惭愧你还叮嘱我小心风浪。",
      }
      ],
    },
    {
      title: "长沙过贾谊宅 · 刘长卿",
      art: 'tangshi-300:ch207',
      artPrompt: "古诗《长沙过贾谊宅》意境插画：三年谪宦此栖迟，万古惟留楚客悲。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "三年谪宦此栖迟，万古惟留楚客悲。\n秋草独寻人去后，寒林空见日斜时。\n汉文有道恩犹薄，湘水无情吊岂知。\n寂寂江山摇落处，怜君何事到天涯。",
        pinyin: "sān nián zhé huàn cǐ qī chí， wàn gǔ wéi liú chǔ kè bēi。\nqiū cǎo dú xún rén qù hòu， hán lín kōng jiàn rì xié shí。\nhàn wén yǒu dào ēn yóu báo， xiāng shuǐ wú qíng diào qǐ zhī。\njì jì jiāng shān yáo luò chù， lián jūn hé shì dào tiān yá。",
        translation: "你被贬到这里住了三年，千百年只留下游子的悲哀。秋天的草里我独自寻访你住过的痕迹，寒冷的树林里只看见太阳西斜。汉文帝算是贤明的君主，给你的恩情还是太薄；湘水无情，凭吊它又哪里知道。寂静的江山草木凋落，可怜你因为什么来到这么远的地方。",
      }
      ],
    },
    {
      title: "自夏口至鹦鹉洲夕望岳阳 · 刘长卿",
      art: 'tangshi-300:ch208',
      artPrompt: "古诗《自夏口至鹦鹉洲夕望岳阳》意境插画：汀洲无浪复无烟，楚客相思益渺然。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "汀洲无浪复无烟，楚客相思益渺然。\n汉口夕阳斜渡鸟，洞庭秋水远连天。\n孤城背岭寒吹角，独树临江夜泊船。(独树 一作：独戍)\n贾谊上书忧汉室，长沙谪去古今怜。",
        pinyin: "tīng zhōu wú làng fù wú yān， chǔ kè xiāng sī yì miǎo rán。\nhàn kǒu xī yáng xié dù niǎo， dòng tíng qiū shuǐ yuǎn lián tiān。\ngū chéng bèi lǐng hán chuī jiǎo， dú shù lín jiāng yè bó chuán。( dú shù yī zuò： dú shù)\njiǎ yì shàng shū yōu hàn shì， cháng shā zhé qù gǔ jīn lián。",
        translation: "水中的小洲没有波浪也没有烟雾，漂泊的人思念得更远了。汉口的夕阳里，鸟儿斜斜地飞过江去；洞庭湖的秋水远远连着天。孤城背靠山岭，寒风中吹响号角；一棵树临着江，夜里泊下船。贾谊上书忧心汉室，被贬到长沙，古往今来都让人怜惜。",
      }
      ],
    },
    {
      title: "西塞山怀古 · 刘禹锡",
      art: 'tangshi-300:ch209',
      artPrompt: "古诗《西塞山怀古》意境插画：王濬楼船下益州，金陵王气黯然收。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "王濬楼船下益州，金陵王气黯然收。\n千寻铁锁沉江底，一片降幡出石头。\n人世几回伤往事，山形依旧枕寒流。\n今逢四海为家日，故垒萧萧芦荻秋。",
        pinyin: "wáng jùn lóu chuán xià yì zhōu， jīn líng wáng qì àn rán shōu。\nqiān xún tiě suǒ chén jiāng dǐ， yī piàn jiàng fān chū shí tou。\nrén shì jǐ huí shāng wǎng shì， shān xíng yī jiù zhěn hán liú。\njīn féng sì hǎi wéi jiā rì， gù lěi xiāo xiāo lú dí qiū。",
        translation: "王濬的楼船从益州顺流而下，金陵的帝王气数一下子黯淡了。千寻长的铁锁沉到江底，一片投降的白旗从石头城上升起。人世间多少次为往事伤心，山还是老样子，靠着寒冷的江水。如今正逢四海成一家的时候，旧时的营垒冷冷清清，芦苇在秋风里摇晃。",
      }
      ],
    },
    {
      title: "晚次鄂州 · 卢纶",
      art: 'tangshi-300:ch210',
      artPrompt: "古诗《晚次鄂州》意境插画：云开远见汉阳城，犹是孤帆一日程。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "云开远见汉阳城，犹是孤帆一日程。\n估客昼眠知浪静，舟人夜语觉潮生。\n三湘愁鬓逢秋色，万里归心对月明。\n旧业已随征战尽，更堪江上鼓鼙声。",
        pinyin: "yún kāi yuǎn jiàn hàn yáng chéng， yóu shì gū fān yī rì chéng。\ngū kè zhòu mián zhī làng jìng， zhōu rén yè yǔ jué cháo shēng。\nsān xiāng chóu bìn féng qiū sè， wàn lǐ guī xīn duì yuè míng。\njiù yè yǐ suí zhēng zhàn jìn， gèng kān jiāng shàng gǔ pí shēng。",
        translation: "云散开了，远远望见汉阳城，可还隔着孤帆一天的航程。商人在白天睡得香，知道浪很平静；船工夜里说话，听出潮水涨了。三湘的秋色让我两鬓生出愁来，对着明月，更想回万里外的家。旧日的家业已经毁在战乱里，怎么受得了江上又传来战鼓声。",
      }
      ],
    },
    {
      title: "赠阙下裴舍人 · 钱起",
      art: 'tangshi-300:ch211',
      artPrompt: "古诗《赠阙下裴舍人》意境插画：二月黄莺飞上林，春城紫禁晓阴阴。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "二月黄莺飞上林，春城紫禁晓阴阴。\n长乐钟声花外尽，龙池柳色雨中深。\n阳和不散穷途恨，霄汉长怀捧日心。\n献赋十年犹未遇，羞将白发对华簪。",
        pinyin: "èr yuè huáng yīng fēi shàng lín， chūn chéng zǐ jìn xiǎo yīn yīn。\ncháng lè zhōng shēng huā wài jìn， lóng chí liǔ sè yǔ zhōng shēn。\nyáng hé bù sàn qióng tú hèn， xiāo hàn cháng huái pěng rì xīn。\nxiàn fù shí nián yóu wèi yù， xiū jiāng bái fà duì huá zān。",
        translation: "二月里黄莺飞过上林苑，春天的京城紫禁城清晨一片阴凉。长乐宫的钟声到花外就听不见了，龙池的柳色在雨中显得更深。和暖的春光散不去我穷困失意的愁，可我一心还怀着捧日效力君王的心愿。献赋十年还没有遇到机会，惭愧用满头白发面对做官的你。",
      }
      ],
    },
    {
      title: "宫词 · 薛逢",
      art: 'tangshi-300:ch212',
      artPrompt: "古诗《宫词》意境插画：十二楼中尽晓妆，望仙楼上望君王。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "十二楼中尽晓妆，望仙楼上望君王。\n锁衔金兽连环冷，水滴铜龙昼漏长。\n云髻罢梳还对镜，罗衣欲换更添香。\n遥窥正殿帘开处，袍袴宫人扫御床。",
        pinyin: "shí èr lóu zhōng jìn xiǎo zhuāng， wàng xiān lóu shàng wàng jūn wáng。\nsuǒ xián jīn shòu lián huán lěng， shuǐ dī tóng lóng zhòu lòu cháng。\nyún jì bà shū hái duì jìng， luó yī yù huàn gèng tiān xiāng。\nyáo kuī zhèng diàn lián kāi chù， páo kù gōng rén sǎo yù chuáng。",
        translation: "十二座楼里的宫女一早都梳好了妆，在望仙楼上望着君王。门上衔着环的金兽冷冰冰，铜龙滴漏，白天觉得特别长。头发梳完了还对着镜子看，想换罗衣又再添上香。远远望见正殿帘子开着的地方，穿袍裤的宫人正在收拾御床。",
      }
      ],
    },
    {
      title: "同题仙游观 · 韩翃",
      art: 'tangshi-300:ch213',
      artPrompt: "古诗《同题仙游观》意境插画：仙台初见五城楼，风物凄凄宿雨收。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "仙台初见五城楼，风物凄凄宿雨收。\n山色遥连秦树晚，砧声近报汉宫秋。\n疏松影落空坛静，细草香闲小洞幽。\n何用别寻方外去，人间亦自有丹丘。",
        pinyin: "xiān tái chū jiàn wǔ chéng lóu， fēng wù qī qī sù yǔ shōu。\nshān sè yáo lián qín shù wǎn， zhēn shēng jìn bào hàn gōng qiū。\nshū sōng yǐng luò kōng tán jìng， xì cǎo xiāng xián xiǎo dòng yōu。\nhé yòng bié xún fāng wài qù， rén jiān yì zì yǒu dān qiū。",
        translation: "在仙台上初次见到高高的道观楼台，夜里的雨刚停，景物带着凉意。远处的山色连着秦地的树，天色已晚；近处的捣衣声报告着京城的秋天。稀疏的松影落在安静的祭坛上，细草闲闲地发着香，小洞十分幽静。何必另外去山外寻找仙境，人间也有这样的美好地方。",
      }
      ],
    },
    {
      title: "贼退示官吏 · 元结",
      art: 'tangshi-300:ch214',
      artPrompt: "古诗《贼退示官吏》意境插画：昔岁逢太平，山林二十年。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "昔岁逢太平，山林二十年。\n泉源在庭户，洞壑当门前。\n井税有常期，日晏犹得眠。\n忽然遭世变，数岁亲戎旃。\n今来典斯郡，山夷又纷然。\n城小贼不屠，人贫伤可怜。\n是以陷邻境，此州独见全。\n使臣将王命，岂不如贼焉？\n今彼征敛者，迫之如火煎。\n谁能绝人命，以作时世贤！\n思欲委符节，引竿自刺船。\n将家就鱼麦，归老江湖边。",
        pinyin: "xī suì féng tài píng， shān lín èr shí nián。\nquán yuán zài tíng hù， dòng hè dāng mén qián。\njǐng shuì yǒu cháng qī， rì yàn yóu dé mián。\nhū rán zāo shì biàn， shù suì qīn róng zhān。\njīn lái diǎn sī jùn， shān yí yòu fēn rán。\nchéng xiǎo zéi bù tú， rén pín shāng kě lián。\nshì yǐ xiàn lín jìng， cǐ zhōu dú jiàn quán。\nshǐ chén jiāng wáng mìng， qǐ bù rú zéi yān？\njīn bǐ zhēng liǎn zhě， pò zhī rú huǒ jiān。\nshuí néng jué rén mìng， yǐ zuò shí shì xián！\nsī yù wěi fú jié， yǐn gān zì cì chuán。\njiāng jiā jiù yú mài， guī lǎo jiāng hú biān。",
        translation: "从前赶上太平年月，我在山林里住了二十年。泉水流到庭前，山洞溪谷正对家门。收赋税有固定的日子，天晚了还能安稳睡觉。忽然世道变了，我几年跟着军队奔波。如今管理这个郡，山里的贼人又纷纷作乱。城太小，贼不来攻打；百姓贫穷，实在可怜。因此邻县被攻陷，这个州独自保全。使臣带着朝廷的命令来，难道还不如贼吗？如今那些收税的人，逼迫百姓像火煎一样。谁能断送百姓的活命，来争做当今的贤能！我想丢下官印，撑着竹竿刺船，带着家人去打鱼种麦，在江湖边过完这一生。",
      }
      ],
    },
    {
      title: "同从弟销南斋玩月忆山阴 · 王昌龄",
      art: 'tangshi-300:ch215',
      artPrompt: "古诗《同从弟销南斋玩月忆山阴》意境插画：高卧南斋时，开帷月初吐。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "高卧南斋时，开帷月初吐。\n清辉澹水木，演漾在窗户。\n冉冉几盈虚，澄澄变今古。\n美人清江畔，是夜越吟苦。\n千里共如何，微风吹兰杜。",
        pinyin: "gāo wò nán zhāi shí， kāi wéi yuè chū tǔ。\nqīng huī dàn shuǐ mù， yǎn yàng zài chuāng hù。\nrǎn rǎn jǐ yíng xū， chéng chéng biàn jīn gǔ。\nměi rén qīng jiāng pàn， shì yè yuè yín kǔ。\nqiān lǐ gòng rú hé， wēi fēng chuī lán dù。",
        translation: "我闲躺在南斋里，拉开帘子，月亮刚刚升起来。清光淡淡洒在水上树上，微微荡漾映在窗户上。月亮慢慢圆了又缺，澄澈的光里古今变换。远方的朋友在清江边，今晚一定苦苦地吟着思念的诗。千里之外共同对着月亮会怎样呢？微风吹送着兰草杜若的香气。",
      }
      ],
    },
    {
      title: "渭川田家 · 王维",
      art: 'tangshi-300:ch216',
      artPrompt: "古诗《渭川田家》意境插画：斜阳照墟落，穷巷牛羊归。(斜阳 一作：斜光)——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "斜阳照墟落，穷巷牛羊归。(斜阳 一作：斜光)\n野老念牧童，倚杖候荆扉。\n雉雊麦苗秀，蚕眠桑叶稀。\n田夫荷锄至，相见语依依。\n即此羡闲逸，怅然吟式微。",
        pinyin: "xié yáng zhào xū luò， qióng xiàng niú yáng guī。( xié yáng yī zuò： xié guāng)\nyě lǎo niàn mù tóng， yǐ zhàng hòu jīng fēi。\nzhì gòu mài miáo xiù， cán mián sāng yè xī。\ntián fū hé chú zhì， xiāng jiàn yǔ yī yī。\njí cǐ xiàn xián yì， chàng rán yín shì wēi。",
        translation: "夕阳照着村庄，深巷里牛羊都回来了。老人惦记着放牛的孩子，拄着拐杖在柴门口等。野鸡咕咕叫，麦苗正吐穗；蚕儿睡了，桑叶稀疏。农夫扛着锄头回来，见面后亲亲热热地说着话。这样的安闲真让人羡慕，我惆怅地吟起想回家的歌。",
      }
      ],
    },
    {
      title: "西施咏 · 王维",
      art: 'tangshi-300:ch217',
      artPrompt: "古诗《西施咏》意境插画：艳色天下重，西施宁久微。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "艳色天下重，西施宁久微。\n朝为越溪女，暮作吴宫妃。\n贱日岂殊众，贵来方悟稀。\n邀人傅香粉，不自著罗衣。\n君宠益娇态，君怜无是非。\n当时浣纱伴，莫得同车归。\n持谢邻家子，效颦安可希。",
        pinyin: "yàn sè tiān xià zhòng， xī shī níng jiǔ wēi。\ncháo wèi yuè xī nǚ， mù zuò wú gōng fēi。\njiàn rì qǐ shū zhòng， guì lái fāng wù xī。\nyāo rén fù xiāng fěn， bù zì zhù luó yī。\njūn chǒng yì jiāo tài， jūn lián wú shì fēi。\ndāng shí huàn shā bàn， mò dé tóng chē guī。\nchí xiè lín jiā zǐ， xiào pín ān kě xī。",
        translation: "天下人都喜爱美色，西施哪里会长久卑微。早上还是越溪边的浣纱女，晚上就成了吴宫里的妃子。贫贱时她和众人有什么不同，尊贵了才觉得这样的人稀少。叫别人替她搽香抹粉，自己都不用动手穿衣。君王宠爱，她就更加娇态；君王怜爱，就没有是非可言。当年一同浣纱的伙伴，再没有谁能同她一起坐车回家。奉劝邻家的女子，学西施皱眉怎么能指望得到同样的结果。",
      }
      ],
    },
    {
      title: "送别 · 王维",
      art: 'tangshi-300:ch218',
      artPrompt: "古诗《送别》意境插画：下马饮君酒，问君何所之？——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "下马饮君酒，问君何所之？\n君言不得意，归卧南山陲。\n但去莫复问，白云无尽时。",
        pinyin: "xià mǎ yǐn jūn jiǔ， wèn jūn hé suǒ zhī？\njūn yán bù dé yì， guī wò nán shān chuí。\ndàn qù mò fù wèn， bái yún wú jìn shí。",
        translation: "我下马请你喝酒，问你这是要去哪里。你说生活不如意，要回南山边上去住了。只管去吧，我不再多问，白云悠悠，没有尽头。",
      }
      ],
    },
    {
      title: "送綦毋潜落第还乡 · 王维",
      art: 'tangshi-300:ch219',
      artPrompt: "古诗《送綦毋潜落第还乡》意境插画：圣代无隐者，英灵尽来归。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "圣代无隐者，英灵尽来归。\n遂令东山客，不得顾采薇。\n既至金门远，孰云吾道非。\n江淮度寒食，京洛缝春衣。\n置酒长安道，同心与我违。\n行当浮桂棹，未几拂荆扉。\n远树带行客，孤城当落晖。\n吾谋适不用，勿谓知音稀。",
        pinyin: "shèng dài wú yǐn zhě， yīng líng jìn lái guī。\nsuì lìng dōng shān kè， bù dé gù cǎi wēi。\njì zhì jīn mén yuǎn， shú yún wú dào fēi。\njiāng huái dù hán shí， jīng luò fèng chūn yī。\nzhì jiǔ cháng ān dào， tóng xīn yǔ wǒ wéi。\nháng dang fú guì zhào， wèi jǐ fú jīng fēi。\nyuǎn shù dài xíng kè， gū chéng dāng luò huī。\nwú móu shì bù yòng， wù wèi zhī yīn xī。",
        translation: "圣明的时代没有隐士，有才的人都出来做官，所以你不能再去过隐居的生活。到京城应考没有成功，谁说你的才学不行呢。你在江淮一带度过寒食节，又在京城缝制春衣。我在长安道上摆下酒宴送你，知心的朋友就要分别。你就要乘船回去，不久就能推开自家的柴门。远处的树林带着远行的人，孤城对着落日的余晖。这次只是你的谋划刚好没被采用，不要说世上知音太少了。",
      }
      ],
    },
    {
      title: "青溪 · 王维",
      art: 'tangshi-300:ch220',
      artPrompt: "古诗《青溪》意境插画：言入黄花川，每逐清溪水。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "言入黄花川，每逐清溪水。\n随山将万转，趣途无百里。\n声喧乱石中，色静深松里。\n漾漾泛菱荇，澄澄映葭苇。\n我心素已闲，清川澹如此。\n请留磐石上，垂钓将已矣。(磐石 一作：盘石)",
        pinyin: "yán rù huáng huā chuān， měi zhú qīng xī shuǐ。\nsuí shān jiāng wàn zhuǎn， qù tú wú bǎi lǐ。\nshēng xuān luàn shí zhōng， sè jìng shēn sōng lǐ。\nyàng yàng fàn líng xìng， chéng chéng yìng jiā wěi。\nwǒ xīn sù yǐ xián， qīng chuān dàn rú cǐ。\nqǐng liú pán shí shàng， chuí diào jiāng yǐ yǐ。( pán shí yī zuò： pán shí)",
        translation: "一走进黄花川，我总是沿着那清清的溪水走。溪水随着山势千回百转，走过的路却不到百里。水声在乱石间喧闹，水色在深松里安静。水波荡漾着菱叶荇菜，澄澈的水面映出芦苇。我的心本来已经安闲，清清的溪水也这样恬淡。我想留在大石头上，垂着钓竿度过一生。",
      }
      ],
    },
    {
      title: "与高适薛据同登慈恩寺 · 岑参",
      art: 'tangshi-300:ch221',
      artPrompt: "古诗《与高适薛据同登慈恩寺》意境插画：塔势如涌出，孤高耸天宫。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "塔势如涌出，孤高耸天宫。\n登临出世界，磴道盘虚空。\n突兀压神州，峥嵘如鬼工。\n四角碍白日，七层摩苍穹。\n下窥指高鸟，俯听闻惊风。\n连山若波涛，奔凑似朝东。(凑 一作：走；似 一作：如)\n青槐夹驰道，宫馆何玲珑。(馆 一作：观)\n秋色从西来，苍然满关中。\n五陵北原上，万古青蒙蒙。\n净理了可悟，胜因夙所宗。\n誓将挂冠去，觉道资无穷。",
        pinyin: "tǎ shì rú yǒng chū， gū gāo sǒng tiān gōng。\ndēng lín chū shì jiè， dèng dào pán xū kōng。\ntū wù yā shén zhōu， zhēng róng rú guǐ gōng。\nsì jiǎo ài bái rì， qī céng mó cāng qióng。\nxià kuī zhǐ gāo niǎo， fǔ tīng wén jīng fēng。\nlián shān ruò bō tāo， bēn còu sì cháo dōng。( còu yī zuò： zǒu； sì yī zuò： rú)\nqīng huái jiá chí dào， gōng guǎn hé líng lóng。( guǎn yī zuò： guān)\nqiū sè cóng xī lái， cāng rán mǎn guān zhōng。\nwǔ líng běi yuán shàng， wàn gǔ qīng méng méng。\njìng lǐ le kě wù， shèng yīn sù suǒ zōng。\nshì jiāng guà guān qù， jué dào zī wú qióng。",
        translation: "宝塔像从地里涌出来一样，孤零零高高地耸向天空。登上塔顶就像走出了人世，石阶盘旋在半空里。它高高地立在神州大地上，雄伟得像鬼斧神工。四角挡住了白天的太阳，七层塔一直摸到青天。往下看能指点高飞的鸟，俯下身能听到吓人的风声。连绵的群山像波涛，奔涌着好像朝东流去。青槐夹着大路，宫殿楼台多么精巧。秋色从西边来了，苍苍茫茫铺满关中。北边原上的五座陵墓，千秋万代一片青蒙蒙。清净的道理可以领悟，美好的因缘我早就信奉。我发誓要挂起官帽离开，觉悟的大道给我无穷的滋养。",
      }
      ],
    },
    {
      title: "下终南山过斛斯山人宿置酒 · 李白",
      art: 'tangshi-300:ch222',
      artPrompt: "古诗《下终南山过斛斯山人宿置酒》意境插画：暮从碧山下，山月随人归。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "暮从碧山下，山月随人归。\n却顾所来径，苍苍横翠微。\n相携及田家，童稚开荆扉。\n绿竹入幽径，青萝拂行衣。\n欢言得所憩，美酒聊共挥。\n长歌吟松风，曲尽河星稀。\n我醉君复乐，陶然共忘机。",
        pinyin: "mù cóng bì shān xià， shān yuè suí rén guī。\nquè gù suǒ lái jìng， cāng cāng héng cuì wēi。\nxiāng xié jí tián jiā， tóng zhì kāi jīng fēi。\nlǜ zhú rù yōu jìng， qīng luó fú xíng yī。\nhuān yán dé suǒ qì， měi jiǔ liáo gòng huī。\ncháng gē yín sōng fēng， qǔ jìn hé xīng xī。\nwǒ zuì jūn fù lè， táo rán gòng wàng jī。",
        translation: "傍晚我从碧绿的山上下来，山月一路跟着人回家。回头看走过的山路，青苍苍地横在山坡上。和朋友手拉手到了田家，小孩子打开柴门。绿竹遮着幽静的小路，青萝轻轻拂过衣裳。欢欢喜喜地休息下来，拿出美酒一起畅饮。对着松风放声歌唱，唱完了，银河的星星已经稀落。我醉了你也很快乐，大家高兴得忘了世间的机巧之心。",
      }
      ],
    },
    {
      title: "月下独酌四首·其一 · 李白",
      art: 'tangshi-300:ch223',
      artPrompt: "古诗《月下独酌四首·其一》意境插画：花间一壶酒，独酌无相亲。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "花间一壶酒，独酌无相亲。\n举杯邀明月，对影成三人。\n月既不解饮，影徒随我身。\n暂伴月将影，行乐须及春。\n我歌月徘徊，我舞影零乱。\n醒时同交欢，醉后各分散。(同交欢 一作：相交欢)\n永结无情游，相期邈云汉。",
        pinyin: "huā jiān yī hú jiǔ， dú zhuó wú xiāng qīn。\njǔ bēi yāo míng yuè， duì yǐng chéng sān rén。\nyuè jì bù jiě yǐn， yǐng tú suí wǒ shēn。\nzàn bàn yuè jiāng yǐng， xíng lè xū jí chūn。\nwǒ gē yuè pái huái， wǒ wǔ yǐng líng luàn。\nxǐng shí tóng jiāo huān， zuì hòu gè fēn sàn。( tóng jiāo huān yī zuò： xiāng jiāo huān)\nyǒng jié wú qíng yóu， xiāng qī miǎo yún hàn。",
        translation: "花丛间摆着一壶酒，独自喝，没有亲近的人。举起杯邀请明月，加上影子就成了三个人。月亮不懂得喝酒，影子也只白白跟着我。暂且和月亮、影子做伴，行乐要趁着春光正好。我唱歌，月亮在空中徘徊；我跳舞，影子摇摇晃晃。清醒的时候一起欢乐，醉了以后就各自散开。愿意永远结成不带世情的游乐，约定在遥远的天河再相见。",
      }
      ],
    },
    {
      title: "春思 · 李白",
      art: 'tangshi-300:ch224',
      artPrompt: "古诗《春思》意境插画：燕草如碧丝，秦桑低绿枝。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "燕草如碧丝，秦桑低绿枝。\n当君怀归日，是妾断肠时。\n春风不相识，何事入罗帏。",
        pinyin: "yàn cǎo rú bì sī， qín sāng dī lǜ zhī。\ndāng jūn huái guī rì， shì qiè duàn cháng shí。\nchūn fēng bù xiāng shí， hé shì rù luó wéi。",
        translation: "燕地的春草像碧丝一样刚刚发芽，秦地的桑树已经压弯了绿枝。当你想着回家的时候，正是我想你想得心碎的时候。春风啊，我和你并不相识，为什么要吹进我的罗帐里来。",
      }
      ],
    },
    {
      title: "梦李白·其一 · 杜甫",
      art: 'tangshi-300:ch225',
      artPrompt: "古诗《梦李白·其一》意境插画：死别已吞声，生别常恻恻。江南瘴疠地，逐客无消息。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "死别已吞声，生别常恻恻。江南瘴疠地，逐客无消息。\n故人入我梦，明我长相忆。恐非平生魂，路远不可测。\n魂来枫叶青，魂返关塞黑。君今在罗网，何以有羽翼。\n落月满屋梁，犹疑照颜色。水深波浪阔，无使蛟龙得。",
        pinyin: "sǐ bié yǐ tūn shēng， shēng bié cháng cè cè。 jiāng nán zhàng lì dì， zhú kè wú xiāo xī。\ngù rén rù wǒ mèng， míng wǒ zhǎng xiàng yì。 kǒng fēi píng shēng hún， lù yuǎn bù kě cè。\nhún lái fēng yè qīng， hún fǎn guān sāi hēi。 jūn jīn zài luó wǎng， hé yǐ yǒu yǔ yì。\nluò yuè mǎn wū liáng， yóu yí zhào yán sè。 shuǐ shēn bō làng kuò， wú shǐ jiāo lóng dé。",
        translation: "死别让人哭得说不出声，生别却常常让人悲伤。你在南方瘴气流行的地方，被放逐的人一直没有消息。老朋友走进我的梦里，说明我一直在想念你。我怕那不是你活着的魂魄，路这么远，实在难料。魂魄来时枫叶正青，回去时关塞一片漆黑。你如今落在罗网里，哪里来的翅膀飞来飞去。落月的清光照满屋梁，我恍恍惚惚觉得照着你的脸。江水深波浪大，愿你不要被蛟龙夺去。",
      }
      ],
    },
    {
      title: "梦李白·其二 · 杜甫",
      art: 'tangshi-300:ch226',
      artPrompt: "古诗《梦李白·其二》意境插画：浮云终日行，游子久不至。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "浮云终日行，游子久不至。\n三夜频梦君，情亲见君意。\n告归常局促，苦道来不易。\n江湖多风波，舟楫恐失坠。\n出门搔白首，若负平生志。\n冠盖满京华，斯人独憔悴。\n孰云网恢恢，将老身反累。\n千秋万岁名，寂寞身后事。",
        pinyin: "fú yún zhōng rì xíng， yóu zǐ jiǔ bù zhì。\nsān yè pín mèng jūn， qíng qīn jiàn jūn yì。\ngào guī cháng jú cù， kǔ dào lái bù yì。\njiāng hú duō fēng bō， zhōu jí kǒng shī zhuì。\nchū mén sāo bái shǒu， ruò fù píng shēng zhì。\nguān gài mǎn jīng huá， sī rén dú qiáo cuì。\nshú yún wǎng huī huī， jiāng lǎo shēn fǎn lèi。\nqiān qiū wàn suì míng， jì mò shēn hòu shì。",
        translation: "天上的浮云整天飘来飘去，远方的游子却久久不来。接连三个夜里梦见你，见面那么亲切，看得见你的心意。你每次告别都匆匆忙忙，总诉说来的路不容易。江湖上风波多，怕小船会翻掉。出门时你搔着满头白发，好像辜负了平生的志向。京城里满是高官显贵，偏偏你这样憔悴。谁说天网恢恢不会漏，到老了你反而被牵累。千秋万代的好名声，那也是死后寂寞的事情。",
      }
      ],
    },
    {
      title: "望岳 · 杜甫",
      art: 'tangshi-300:ch227',
      artPrompt: "古诗《望岳》意境插画：岱宗夫如何？齐鲁青未了。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "岱宗夫如何？齐鲁青未了。\n造化钟神秀，阴阳割昏晓。\n荡胸生曾云，决眦入归鸟。( 曾 通：层)\n会当凌绝顶，一览众山小。",
        pinyin: "dài zōng fū rú hé？ qí lǔ qīng wèi liǎo。\nzào huà zhōng shén xiù， yīn yáng gē hūn xiǎo。\ndàng xiōng shēng céng yún， jué zì rù guī niǎo。( céng tōng： céng)\nhuì dāng líng jué dǐng， yī lǎn zhòng shān xiǎo。",
        translation: "泰山到底怎么样呢？齐鲁大地上它青翠的山色望不到尽头。大自然把神奇和秀美都给了它，山南山北，一明一暗像分了黄昏和清晨。层层云气在心中激荡，睁大眼睛远望归巢的飞鸟。我一定要登上最高的山顶，到那时看群山，都会显得矮小。",
      }
      ],
    },
    {
      title: "赠卫八处士 · 杜甫",
      art: 'tangshi-300:ch228',
      artPrompt: "古诗《赠卫八处士》意境插画：人生不相见，动如参与商。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "人生不相见，动如参与商。\n今夕复何夕，共此灯烛光！\n少壮能几时？鬓发各已苍！\n访旧半为鬼，惊呼热中肠。",
        pinyin: "rén shēng bù xiāng jiàn， dòng rú cān yù shāng。\njīn xī fù hé xī， gòng cǐ dēng zhú guāng！\nshào zhuàng néng jǐ shí？ bìn fà gè yǐ cāng！\nfǎng jiù bàn wèi guǐ， jīng hū rè zhōng cháng。",
        translation: "人生中老朋友难以相见，就像参星和商星，这个升起那个就落下。今晚是什么样的夜晚啊，能一同坐在这盏烛光下！年轻力壮能有多少时候，如今我们的鬓发都已经花白。打听旧日的老友，一半已经去世，听到消息禁不住惊叫，心里火热火热的。",
      }
      ],
    },
    {
      title: "佳人 · 杜甫",
      art: 'tangshi-300:ch229',
      artPrompt: "古诗《佳人》意境插画：绝代有佳人，幽居在空谷。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "绝代有佳人，幽居在空谷。\n自云良家女，零落依草木。\n关中昔丧乱，兄弟遭杀戮。\n官高何足论，不得收骨肉。\n世情恶衰歇，万事随转烛。\n夫婿轻薄儿，新人美如玉。\n合昏尚知时，鸳鸯不独宿。\n但见新人笑，那闻旧人哭。\n在山泉水清，出山泉水浊。\n侍婢卖珠回，牵萝补茅屋。\n摘花不插发，采柏动盈掬。\n天寒翠袖薄，日暮倚修竹。",
        pinyin: "jué dài yǒu jiā rén， yōu jū zài kōng gǔ。\nzì yún liáng jiā nǚ， líng luò yī cǎo mù。\nguān zhōng xī sāng luàn， xiōng dì zāo shā lù。\nguān gāo hé zú lùn， bù dé shōu gǔ ròu。\nshì qíng è shuāi xiē， wàn shì suí zhuǎn zhú。\nfū xù qīng bó ér， xīn rén měi rú yù。\nhé hūn shàng zhī shí， yuān yāng bù dú sù。\ndàn jiàn xīn rén xiào， nà wén jiù rén kū。\nzài shān quán shuǐ qīng， chū shān quán shuǐ zhuó。\nshì bì mài zhū huí， qiān luó bǔ máo wū。\nzhāi huā bù chā fā， cǎi bǎi dòng yíng jū。\ntiān hán cuì xiù báo， rì mù yǐ xiū zhú。",
        translation: "有一位绝代佳人，静静地住在空旷的山谷里。她说自己本是好人家的女儿，如今流落荒野，靠着草木过活。当年关中发生战乱，兄弟都被杀害。家里做高官又有什么用，连亲人的尸骨都没能收回来。世道人情讨厌衰败的人家，万事就像风中蜡烛，说变就变。丈夫是个轻薄儿，又娶了美如玉石的新人。合欢花尚且知道朝开夜合，鸳鸯也不肯单独过夜。他只听得见新人的笑声，哪里听得到旧人的哭声。在山里的泉水是清的，流出山去泉水就浑了。侍女卖掉珍珠回来，牵些藤萝来补茅屋。摘下花来也不插在头上，常常采满一把把柏枝。天冷了，翠绿的衣裳还那么单薄；天黑了，她独自倚着长长的竹子。",
      }
      ],
    },
    {
      title: "秋登兰山寄张五 · 孟浩然",
      art: 'tangshi-300:ch230',
      artPrompt: "古诗《秋登兰山寄张五》意境插画：北山白云里，隐者自怡悦。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "北山白云里，隐者自怡悦。\n相望试登高，心随雁飞灭。(试 一作 始)\n愁因薄暮起，兴是清秋发。\n时见归村人，沙行渡头歇。\n天边树若荠，江畔洲如月。\n何当载酒来，共醉重阳节。",
        pinyin: "běi shān bái yún lǐ， yǐn zhě zì yí yuè。\nxiāng wàng shì dēng gāo， xīn suí yàn fēi miè。( shì yī zuò shǐ)\nchóu yīn bó mù qǐ， xīng shì qīng qiū fā。\nshí jiàn guī cūn rén， shā xíng dù tóu xiē。\ntiān biān shù ruò qí， jiāng pàn zhōu rú yuè。\nhé dāng zǎi jiǔ lái， gòng zuì chóng yáng jié。",
        translation: "北山上白云缭绕，隐居的人自己觉得快乐。为了望见你，我试着登上高处，心随着大雁飞远消失。忧愁在傍晚时升起，兴致因清秋而高涨。时时看见回村的人，沿着沙滩在渡口歇脚。天边的树小得像荠菜，江边的沙洲像一弯月亮。你什么时候带着酒来，我们在重阳节一起畅饮大醉。",
      }
      ],
    },
    {
      title: "夏日南亭怀辛大 · 孟浩然",
      art: 'tangshi-300:ch231',
      artPrompt: "古诗《夏日南亭怀辛大》意境插画：山光忽西落，池月渐东上。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "山光忽西落，池月渐东上。\n散发乘夕凉，开轩卧闲敞。\n荷风送香气，竹露滴清响。\n欲取鸣琴弹，恨无知音赏。\n感此怀故人，中宵劳梦想。(\n宵 一作：终)",
        pinyin: "shān guāng hū xī luò， chí yuè jiàn dōng shàng。\nsàn fā chéng xī liáng， kāi xuān wò xián chǎng。\nhé fēng sòng xiāng qì， zhú lù dī qīng xiǎng。\nyù qǔ míng qín tán， hèn wú zhī yīn shǎng。\ngǎn cǐ huái gù rén， zhōng xiāo láo mèng xiǎng。(\nxiāo yī zuò： zhōng)",
        translation: "山上的太阳忽然落向西边，池上的月亮慢慢从东边升起来。我散开头发乘着晚上的凉风，推开窗子躺在宽敞的地方。荷花的风送来香气，竹叶上的露水滴出清脆的响声。想拿来鸣琴弹一曲，只可惜没有知音欣赏。想到这些就怀念老朋友，半夜里还在梦中苦苦想念。",
      }
      ],
    },
    {
      title: "宿业师山房待丁大不至 · 孟浩然",
      art: 'tangshi-300:ch232',
      artPrompt: "古诗《宿业师山房待丁大不至》意境插画：夕阳度西岭，群壑倏已暝。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "夕阳度西岭，群壑倏已暝。\n松月生夜凉，风泉满清听。\n樵人归欲尽，烟鸟栖初定。\n之子期宿来，孤琴候萝径。",
        pinyin: "xī yáng dù xī lǐng， qún hè shū yǐ míng。\nsōng yuè shēng yè liáng， fēng quán mǎn qīng tīng。\nqiáo rén guī yù jìn， yān niǎo qī chū dìng。\nzhī zǐ qī sù lái， gū qín hòu luó jìng。",
        translation: "夕阳翻过西边的山岭，群山一下子暗了下来。松间的月亮带来夜的凉意，风声泉声一片清脆。打柴的人差不多都回去了，暮霭里的鸟儿刚刚安顿下来。你约好了今夜来住，我抱着琴，在长满藤萝的小路上等你。",
      }
      ],
    },
    {
      title: "寻西山隐者不遇 · 丘为",
      art: 'tangshi-300:ch233',
      artPrompt: "古诗《寻西山隐者不遇》意境插画：绝顶一茅茨，直上三十里。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "绝顶一茅茨，直上三十里。\n扣关无僮仆，窥室唯案几。\n若非巾柴车，应是钓秋水。\n差池不相见，黾勉空仰止。\n草色新雨中，松声晚窗里。\n及兹契幽绝，自足荡心耳。\n虽无宾主意，颇得清净理。\n兴尽方下山，何必待之子。",
        pinyin: "jué dǐng yī máo cí， zhí shàng sān shí lǐ。\nkòu guān wú tóng pú， kuī shì wéi àn jǐ。\nruò fēi jīn chái chē， yìng shì diào qiū shuǐ。\nchā chí bù xiāng jiàn， miǎn miǎn kōng yǎng zhǐ。\ncǎo sè xīn yǔ zhōng， sōng shēng wǎn chuāng lǐ。\njí zī qì yōu jué， zì zú dàng xīn ěr。\nsuī wú bīn zhǔ yì， pō dé qīng jìng lǐ。\nxīng jìn fāng xià shān， hé bì dài zhī zǐ。",
        translation: "高高的山顶上有一间茅屋，一直往上走三十里才能到。敲门没有童仆应声，往屋里看只有桌案茶几。他如果不是驾着柴车出门，就是到秋水边钓鱼去了。错过没见着，空空地仰慕了一场。可是新雨中的草色多好看，傍晚窗外的松声多好听。来到这里正合这清幽的景致，自然让心胸舒畅。虽然没有宾主相聚的情意，却领会了不少清净的道理。兴致尽了就下山去，何必一定要见到他呢。",
      }
      ],
    },
    {
      title: "晨诣超师院读禅经 · 柳宗元",
      art: 'tangshi-300:ch234',
      artPrompt: "古诗《晨诣超师院读禅经》意境插画：汲井漱寒齿，清心拂尘服。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "汲井漱寒齿，清心拂尘服。\n闲持贝叶书，步出东斋读。\n真源了无取，妄迹世所逐。\n遗言冀可冥，缮性何由熟。\n道人庭宇静，苔色连深竹。\n日出雾露余，青松如膏沐。\n澹然离言说，悟悦心自足。",
        pinyin: "jí jǐng shù hán chǐ， qīng xīn fú chén fú。\nxián chí bèi yè shū， bù chū dōng zhāi dú。\nzhēn yuán le wú qǔ， wàng jì shì suǒ zhú。\nyí yán jì kě míng， shàn xìng hé yóu shú。\ndào rén tíng yǔ jìng， tái sè lián shēn zhú。\nrì chū wù lù yú， qīng sōng rú gāo mù。\ndàn rán lí yán shuō， wù yuè xīn zì zú。",
        translation: "清早打来井水漱口，拂去衣服上的尘土，让心里也清净下来。手里闲闲地拿着佛经，走出东斋去读。书里真正的道理世人没有领会，世人追逐的只是虚妄的痕迹。希望能领悟先人留下的言语，可修养本性又从哪里做得纯熟呢。道人的庭院很安静，青苔的颜色连着深深的竹丛。太阳出来，雾气露水还没散，青松像洗过一样青翠。这时心里安静恬淡，说不出话来，领悟的快乐让自己满足。",
      }
      ],
    },
    {
      title: "溪居 · 柳宗元",
      art: 'tangshi-300:ch235',
      artPrompt: "古诗《溪居》意境插画：久为簪组累，幸此南夷谪。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "久为簪组累，幸此南夷谪。\n闲依农圃邻，偶似山林客。\n晓耕翻露草，夜榜响溪石。\n来往不逢人，长歌楚天碧。",
        pinyin: "jiǔ wèi zān zǔ lèi， xìng cǐ nán yí zhé。\nxián yī nóng pǔ lín， ǒu sì shān lín kè。\nxiǎo gēng fān lù cǎo， yè bǎng xiǎng xī shí。\nlái wǎng bù féng rén， cháng gē chǔ tiān bì。",
        translation: "长久被官帽官服束缚，幸好被贬到这南方的山水间。悠闲地和农人菜园做邻居，有时真像山林里的客人。清早耕田，翻开带露的青草；夜里荡船，船桨敲响溪石。来来往往碰不见别人，对着碧蓝的天空放声长歌。",
      }
      ],
    },
    {
      title: "送杨氏女 · 韦应物",
      art: 'tangshi-300:ch236',
      artPrompt: "古诗《送杨氏女》意境插画：永日方戚戚，出行复悠悠。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "永日方戚戚，出行复悠悠。\n女子今有行，大江溯轻舟。\n尔辈苦无恃，抚念益慈柔。\n幼为长所育，两别泣不休。\n对此结中肠，义往难复留。\n自小阙内训，事姑贻我忧。\n赖兹托令门，任恤庶无尤。\n贫俭诚所尚，资从岂待周。\n孝恭遵妇道，容止顺其猷。\n别离在今晨，见尔当何秋。\n居闲始自遣，临感忽难收。\n归来视幼女，零泪缘缨流。",
        pinyin: "yǒng rì fāng qī qī， chū xíng fù yōu yōu。\nnǚ zǐ jīn yǒu xíng， dà jiāng sù qīng zhōu。\něr bèi kǔ wú shì， fǔ niàn yì cí róu。\nyòu wèi cháng suǒ yù， liǎng bié qì bù xiū。\nduì cǐ jié zhōng cháng， yì wǎng nán fù liú。\nzì xiǎo quē nèi xùn， shì gū yí wǒ yōu。\nlài zī tuō lìng mén， rèn xù shù wú yóu。\npín jiǎn chéng suǒ shàng， zī cóng qǐ dài zhōu。\nxiào gōng zūn fù dào， róng zhǐ shùn qí yóu。\nbié lí zài jīn chén， jiàn ěr dāng hé qiū。\njū xián shǐ zì qiǎn， lín gǎn hū nán shōu。\nguī lái shì yòu nǚ， líng lèi yuán yīng liú。",
        translation: "一整天我心里都悲伤，因为你这一去路途遥远。女儿今天要出嫁了，大江上逆水坐着轻快的小船。你们姐妹苦在从小没有母亲，我越想越加疼爱你们。你从小是姐姐带大的，如今姐妹分别，两人哭个不停。面对这些我愁肠纠结，可是出嫁是正理，难以再留。你从小缺少母亲的教导，将来怎么侍奉婆婆，我很担心。好在嫁的是好人家，人家会体谅你，希望不致有什么过错。贫穷节俭本来是好事，嫁妆哪能办得样样齐全。要孝顺恭敬，遵守妇道，容貌举止都合规矩。分别就在今天早晨，再见到你不知是哪一年。平日闲着还能自己排解，一到伤心的时候就忍不住了。回来看见家里的小女儿，眼泪顺着帽带往下流。",
      }
      ],
    },
    {
      title: "长安遇冯著 · 韦应物",
      art: 'tangshi-300:ch237',
      artPrompt: "古诗《长安遇冯著》意境插画：客从东方来，衣上灞陵雨。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "客从东方来，衣上灞陵雨。\n问客何为来，采山因买斧。\n冥冥花正开，飏飏燕新乳。\n昨别今已春，鬓丝生几缕。",
        pinyin: "kè cóng dōng fāng lái， yī shàng bà líng yǔ。\nwèn kè hé wèi lái， cǎi shān yīn mǎi fǔ。\nmíng míng huā zhèng kāi， yáng yáng yàn xīn rǔ。\nzuó bié jīn yǐ chūn， bìn sī shēng jǐ lǚ。",
        translation: "客人从东边来，衣服上还带着灞陵的雨。问客人来做什么，他说是为了进山采货，所以来买斧子。百花悄悄地盛开，燕子带着新孵出的小燕子欢快地飞。去年分别，转眼又是一个春天，你的鬓角又添了几缕白发。",
      }
      ],
    },
    {
      title: "夕次盱眙县 · 韦应物",
      art: 'tangshi-300:ch238',
      artPrompt: "古诗《夕次盱眙县》意境插画：落帆逗淮镇，停舫临孤驿。浩浩风起波，冥冥日沉夕。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "落帆逗淮镇，停舫临孤驿。浩浩风起波，冥冥日沉夕。\n人归山郭暗，雁下芦洲白。独夜忆秦关，听钟未眠客。",
        pinyin: "luò fān dòu huái zhèn， tíng fǎng lín gū yì。 hào hào fēng qǐ bō， míng míng rì chén xī。\nrén guī shān guō àn， yàn xià lú zhōu bái。 dú yè yì qín guān， tīng zhōng wèi mián kè。",
        translation: "落下船帆，停在淮水边的小镇上，小船靠着孤零零的驿站。大风浩浩吹起波浪，太阳暗暗沉入黄昏。人们回城，山城暗了下来；大雁落下，芦苇洲泛着白色。孤独的夜里思念长安，听着远处的钟声，整夜睡不着。",
      }
      ],
    },
    {
      title: "东郊 · 韦应物",
      art: 'tangshi-300:ch239',
      artPrompt: "古诗《东郊》意境插画：吏舍跼终年，出郊旷清曙。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "吏舍跼终年，出郊旷清曙。\n杨柳散和风，青山澹吾虑。\n依丛适自憩，缘涧还复去。\n微雨霭芳原，春鸠鸣何处。\n乐幽心屡止，遵事迹犹遽。\n终罢斯结庐，慕陶直可庶。",
        pinyin: "lì shè jú zhōng nián， chū jiāo kuàng qīng shǔ。\nyáng liǔ sàn hé fēng， qīng shān dàn wú lǜ。\nyī cóng shì zì qì， yuán jiàn hái fù qù。\nwēi yǔ ǎi fāng yuán， chūn jiū míng hé chù。\nlè yōu xīn lǚ zhǐ， zūn shì jì yóu jù。\nzhōng bà sī jié lú， mù táo zhí kě shù。",
        translation: "整年局促在官署里，清早来到郊外，只觉得天地清爽开阔。杨柳间吹散着和暖的风，青山让我的思虑安静下来。靠着树丛正好休息，沿着溪涧走过去又走回来。细雨蒙蒙，罩着芳香的草原，不知哪里传来春鸠的叫声。喜欢这里的幽静，可这念头一次次打消；因为公事在身，脚步还是匆匆。将来终要辞官在这里盖间草屋，仰慕陶渊明那样的生活，也许能达到。",
      }
      ],
    },
    {
      title: "郡斋雨中与诸文士燕集 · 韦应物",
      art: 'tangshi-300:ch240',
      artPrompt: "古诗《郡斋雨中与诸文士燕集》意境插画：兵卫森画戟，宴寝凝清香。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "兵卫森画戟，宴寝凝清香。\n海上风雨至，逍遥池阁凉。\n烦疴近消散，嘉宾复满堂。\n自惭居处崇，未睹斯民康。\n理会是非遣，性达形迹忘。\n鲜肥属时禁，蔬果幸见尝。\n俯饮一杯酒，仰聆金玉章。\n神欢体自轻，意欲凌风翔。\n吴中盛文史，群彦今汪洋。\n方知大藩地，岂曰财赋强。",
        pinyin: "bīng wèi sēn huà jǐ， yàn qǐn níng qīng xiāng。\nhǎi shàng fēng yǔ zhì， xiāo yáo chí gé liáng。\nfán kē jìn xiāo sàn， jiā bīn fù mǎn táng。\nzì cán jū chù chóng， wèi dǔ sī mín kāng。\nlǐ huì shì fēi qiǎn， xìng dá xíng jì wàng。\nxiān féi shǔ shí jìn， shū guǒ xìng jiàn cháng。\nfǔ yǐn yī bēi jiǔ， yǎng líng jīn yù zhāng。\nshén huān tǐ zì qīng， yì yù líng fēng xiáng。\nwú zhōng shèng wén shǐ， qún yàn jīn wāng yáng。\nfāng zhī dà fān dì， qǐ yuē cái fù qiáng。",
        translation: "卫兵举着画戟排列整齐，内室里凝聚着清香。海上风雨刮来，池边楼阁一片清凉。心里的烦闷病痛快消散了，贵客又坐满了厅堂。惭愧自己住得这么高贵，却还没看见百姓个个安康。道理想通了，是非就消散；性情通达了，就忘了计较形迹。鲜鱼肥肉正是禁吃的时节，蔬菜瓜果请大家尝一尝。低头喝下一杯酒，抬头听美好的文章。精神畅快身体轻松，真想乘风飞翔。吴中地方文风昌盛，众多才士像江海一样浩大。这才知道大郡的可贵，怎么能说只在于财赋强盛呢。",
      }
      ],
    },
    {
      title: "初发扬子寄元大校书 · 韦应物",
      art: 'tangshi-300:ch241',
      artPrompt: "古诗《初发扬子寄元大校书》意境插画：凄凄去亲爱，泛泛入烟雾。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "凄凄去亲爱，泛泛入烟雾。\n归棹洛阳人，残钟广陵树。\n今朝此为别，何处还相遇。\n世事波上舟，沿洄安得住。",
        pinyin: "qī qī qù qīn ài， fàn fàn rù yān wù。\nguī zhào luò yáng rén， cán zhōng guǎng líng shù。\njīn cháo cǐ wèi bié， hé chù hái xiāng yù。\nshì shì bō shàng zhōu， yán huí ān dé zhù。",
        translation: "凄凄凉凉地告别亲爱的朋友，小船漂漂荡荡驶入烟雾。乘船回洛阳的是我这个游子，广陵的树林间还传来残留的钟声。今天在这里分别，不知道以后在哪儿还能相遇。世事就像波涛上的小船，顺流逆流，哪里停得住呢。",
      }
      ],
    },
    {
      title: "寄全椒山中道士 · 韦应物",
      art: 'tangshi-300:ch242',
      artPrompt: "古诗《寄全椒山中道士》意境插画：今朝郡斋冷，忽念山中客。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "今朝郡斋冷，忽念山中客。\n涧底束荆薪，归来煮白石。\n欲持一瓢酒，远慰风雨夕。\n落叶满空山，何处寻行迹。",
        pinyin: "jīn cháo jùn zhāi lěng， hū niàn shān zhōng kè。\njiàn dǐ shù jīng xīn， guī lái zhǔ bái shí。\nyù chí yī piáo jiǔ， yuǎn wèi fēng yǔ xī。\nluò yè mǎn kōng shān， hé chù xún xíng jì。",
        translation: "今天郡斋里很冷，忽然想起山中的朋友。你大概在涧底捆好了柴草，回来煮白石当饭吃吧。想带上一瓢酒，远远地慰问你风雨的夜晚。可是落叶铺满空山，到哪里去找你的脚印呢。",
      }
      ],
    },
    {
      title: "宿王昌龄隐居 · 常建",
      art: 'tangshi-300:ch243',
      artPrompt: "古诗《宿王昌龄隐居》意境插画：清溪深不测，隐处唯孤云。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "清溪深不测，隐处唯孤云。\n松际露微月，清光犹为君。\n茅亭宿花影，药院滋苔纹。\n余亦谢时去，西山鸾鹤群。",
        pinyin: "qīng xī shēn bù cè， yǐn chù wéi gū yún。\nsōng jì lù wēi yuè， qīng guāng yóu wèi jūn。\nmáo tíng sù huā yǐng， yào yuàn zī tái wén。\nyú yì xiè shí qù， xī shān luán hè qún。",
        translation: "清清的溪水深深看不见底，隐居的地方只有一朵孤云。松树梢头露出淡淡的月亮，那清亮的光好像特意照着你。茅亭里花影伴人过夜，种药的院子里长满青苔。我也想辞别这世俗的时光，去西山和鸾鸟仙鹤作伴。",
      }
      ],
    },
    {
      title: "感遇·孤鸿海上来 · 张九龄",
      art: 'tangshi-300:ch244',
      artPrompt: "古诗《感遇·孤鸿海上来》意境插画：孤鸿海上来，池潢不敢顾。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "孤鸿海上来，池潢不敢顾。\n侧见双翠鸟，巢在三珠树。\n矫矫珍木巅，得无金丸惧？\n美服患人指，高明逼神恶。\n今我游冥冥，弋者何所慕！",
        pinyin: "gū hóng hǎi shàng lái， chí huáng bù gǎn gù。\ncè jiàn shuāng cuì niǎo， cháo zài sān zhū shù。\njiǎo jiǎo zhēn mù diān， dé wú jīn wán jù？\nměi fú huàn rén zhǐ， gāo míng bī shén è。\njīn wǒ yóu míng míng， yì zhě hé suǒ mù！",
        translation: "孤独的大雁从大海那边飞来，看见小小的池塘都不敢停留。斜着眼看见一对翠鸟，在高高的三珠树上筑巢。站在珍贵树木的顶上那么显眼，不怕人们用弹丸打吗？穿华美衣服的人怕人指指点点，地位太高连神鬼都要嫌恶。如今我飞向高远的天空，那些打鸟的人又能把我怎么样！",
      }
      ],
    },
    {
      title: "感遇·兰叶春葳蕤 · 张九龄",
      art: 'tangshi-300:ch245',
      artPrompt: "古诗《感遇·兰叶春葳蕤》意境插画：兰叶春葳蕤，桂华秋皎洁。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "兰叶春葳蕤，桂华秋皎洁。\n欣欣此生意，自尔为佳节。\n谁知林栖者，闻风坐相悦。\n草木有本心，何求美人折！",
        pinyin: "lán yè chūn wēi ruí， guì huá qiū jiǎo jié。\nxīn xīn cǐ shēng yì， zì ěr wèi jiā jié。\nshuí zhī lín qī zhě， wén fēng zuò xiāng yuè。\ncǎo mù yǒu běn xīn， hé qiú měi rén zhé！",
        translation: "兰草的叶子在春天茂盛，桂花在秋天皎洁芬芳。它们欣欣向荣，自然形成了美好的季节。谁想到山林里的隐士，闻到这芬芳就满心喜爱。草木散发香气是它们自己的天性，哪里是求美人来攀折呢！",
      }
      ],
    },
    {
      title: "感遇·幽人归独卧 · 张九龄",
      art: 'tangshi-300:ch246',
      artPrompt: "古诗《感遇·幽人归独卧》意境插画：幽人归独卧，滞虑洗孤清。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "幽人归独卧，滞虑洗孤清。\n持此谢高鸟，因之传远情。\n日夕怀空意，人谁感至精？\n飞沈理自隔，何所慰吾诚?",
        pinyin: "yōu rén guī dú wò， zhì lǜ xǐ gū qīng。\nchí cǐ xiè gāo niǎo， yīn zhī chuán yuǎn qíng。\nrì xī huái kōng yì， rén shuí gǎn zhì jīng？\nfēi shěn lǐ zì gé， hé suǒ wèi wú chéng?",
        translation: "隐士回去独自安卧，洗去心中的杂念，独自清静。凭着这份心意谢谢高飞的鸟，请它把我的深情带给远方的人。从早到晚怀着诚挚的心意，可谁能感受到这份精诚呢？飞鸟和沉在水里的鱼本来就互相隔绝，又拿什么来安慰我的诚意呢？",
      }
      ],
    },
    {
      title: "感遇·江南有丹橘 · 张九龄",
      art: 'tangshi-300:ch247',
      artPrompt: "古诗《感遇·江南有丹橘》意境插画：江南有丹橘，经冬犹绿林。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "江南有丹橘，经冬犹绿林。\n岂伊地气暖？自有岁寒心。\n可以荐嘉客，奈何阻重深。\n运命惟所遇，循环不可寻。\n徒言树桃李，此木岂无阴？",
        pinyin: "jiāng nán yǒu dān jú， jīng dōng yóu lù lín。\nqǐ yī dì qì nuǎn？ zì yǒu suì hán xīn。\nkě yǐ jiàn jiā kè， nài hé zǔ zhòng shēn。\nyùn mìng wéi suǒ yù， xún huán bù kě xún。\ntú yán shù táo lǐ， cǐ mù qǐ wú yīn？",
        translation: "江南有红红的橘子树，经过冬天还是一片绿。难道只是因为那里地气暖吗？是它自己有一颗耐住严寒的心。橘子可以献给贵客品尝，无奈被重重山岭挡住，运不过去。命运只是看遇上什么，来来回回，没法说清。人们只知道夸种桃树李树，这橘树难道就没有绿荫吗？",
      }
      ],
    },
    {
      title: "春泛若耶溪 · 綦毋潜",
      art: 'tangshi-300:ch248',
      artPrompt: "古诗《春泛若耶溪》意境插画：幽意无断绝，此去随所偶。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "幽意无断绝，此去随所偶。\n晚风吹行舟，花路入溪口。\n际夜转西壑，隔山望南斗。\n潭烟飞溶溶，林月低向后。\n生事且弥漫，愿为持竿叟。",
        pinyin: "yōu yì wú duàn jué， cǐ qù suí suǒ ǒu。\nwǎn fēng chuī xíng zhōu， huā lù rù xī kǒu。\njì yè zhuǎn xī hè， gé shān wàng nán dòu。\ntán yān fēi róng róng， lín yuè dī xiàng hòu。\nshēng shì qiě mí màn， yuàn wèi chí gān sǒu。",
        translation: "清幽的兴致不断，这一去随着所遇的景色漂。晚风吹着小船，沿着开满花的路进入溪口。到了夜里转过西边的山坳，隔着山望见南斗星。潭上的雾气轻轻弥漫，林间的月亮低低地退到身后。世事茫茫看不清楚，我宁愿做一个拿着钓竿的老头儿。",
      }
      ],
    },
    {
      title: "石鱼湖上醉歌 · 元结",
      art: 'tangshi-300:ch249',
      artPrompt: "古诗《石鱼湖上醉歌》意境插画：石鱼湖，似洞庭，夏水欲满君山青。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "石鱼湖，似洞庭，夏水欲满君山青。\n山为樽，水为沼，酒徒历历坐洲岛。\n长风连日作大浪，不能废人运酒舫。\n我持长瓢坐巴丘，酌饮四坐以散愁。",
        pinyin: "shí yú hú， sì dòng tíng， xià shuǐ yù mǎn jūn shān qīng。\nshān wèi zūn， shuǐ wèi zhǎo， jiǔ tú lì lì zuò zhōu dǎo。\ncháng fēng lián rì zuò dà làng， bù néng fèi rén yùn jiǔ fǎng。\nwǒ chí cháng piáo zuò bā qiū， zhuó yǐn sì zuò yǐ sàn chóu。",
        translation: "石鱼湖好像洞庭湖，夏天水快涨满，山像君山一样青翠。把山当作酒杯，把水当作酒池，喝酒的人一个个坐在洲岛上。连日大风掀起巨浪，也不能挡住运酒的船。我拿着长柄酒瓢坐在巴丘上，给满座的人斟酒，用来消散忧愁。",
      }
      ],
    },
    {
      title: "长恨歌 · 白居易",
      art: 'tangshi-300:ch250',
      artPrompt: "古诗《长恨歌》意境插画：汉皇重色思倾国，御宇多年求不得。杨家有女初长成，养在深闺人未识。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "汉皇重色思倾国，御宇多年求不得。杨家有女初长成，养在深闺人未识。\n天生丽质难自弃，一朝选在君王侧。回眸一笑百媚生，六宫粉黛无颜色。\n春寒赐浴华清池，温泉水滑洗凝脂。侍儿扶起娇无力，始是新承恩泽时。\n云鬓花颜金步摇，芙蓉帐暖度春宵。春宵苦短日高起，从此君王不早朝。\n承欢侍宴无闲暇，春从春游夜专夜。后宫佳丽三千人，三千宠爱在一身。\n金屋妆成娇侍夜，玉楼宴罢醉和春。姊妹弟兄皆列土，可怜光彩生门户。\n遂令天下父母心，不重生男重生女。骊宫高处入青云，仙乐风飘处处闻。\n缓歌慢舞凝丝竹，尽日君王看不足。渔阳鼙鼓动地来，惊破霓裳羽衣曲。\n九重城阙烟尘生，千乘万骑西南行。翠华摇摇行复止，西出都门百余里。\n六军不发无奈何，宛转蛾眉马前死。花钿委地无人收，翠翘金雀玉搔头。\n君王掩面救不得，回看血泪相和流。黄埃散漫风萧索，云栈萦纡登剑阁。\n峨嵋山下少人行，旌旗无光日色薄。蜀江水碧蜀山青，圣主朝朝暮暮情。\n行宫见月伤心色，夜雨闻铃肠断声。天旋地转回龙驭，到此踌躇不能去。\n马嵬坡下泥土中，不见玉颜空死处。君臣相顾尽沾衣，东望都门信马归。\n归来池苑皆依旧，太液芙蓉未央柳。芙蓉如面柳如眉，对此如何不泪垂。\n春风桃李花开日，秋雨梧桐叶落时。西宫南内多秋草，落叶满阶红不扫。(花开日 一作：花开夜；南内 一作：南苑)\n梨园弟子白发新，椒房阿监青娥老。夕殿萤飞思悄然，孤灯挑尽未成眠。\n迟迟钟鼓初长夜，耿耿星河欲曙天。鸳鸯瓦冷霜华重，翡翠衾寒谁与共。\n悠悠生死别经年，魂魄不曾来入梦。临邛道士鸿都客，能以精诚致魂魄。\n为感君王辗转思，遂教方士殷勤觅。排空驭气奔如电，升天入地求之遍。\n上穷碧落下黄泉，两处茫茫皆不见。忽闻海上有仙山，山在虚无缥渺间。\n楼阁玲珑五云起，其中绰约多仙子。中有一人字太真，雪肤花貌参差是。\n金阙西厢叩玉扃，转教小玉报双成。闻道汉家天子使，九华帐里梦魂惊。\n揽衣推枕起徘徊，珠箔银屏迤逦开。云鬓半偏新睡觉，花冠不整下堂来。\n风吹仙袂飘飘举，犹似霓裳羽衣舞。玉容寂寞泪阑干，梨花一枝春带雨。(阑 通：栏；飘飘 一作：飘飖)\n含情凝睇谢君王，一别音容两渺茫。昭阳殿里恩爱绝，蓬莱宫中日月长。\n回头下望人寰处，不见长安见尘雾。惟将旧物表深情，钿合金钗寄将去。\n钗留一股合一扇，钗擘黄金合分钿。但教心似金钿坚，天上人间会相见。\n临别殷勤重寄词，词中有誓两心知。七月七日长生殿，夜半无人私语时。\n在天愿作比翼鸟，在地愿为连理枝。天长地久有时尽，此恨绵绵无绝期。",
        pinyin: "hàn huáng zhòng sè sī qīng guó， yù yǔ duō nián qiú bù dé。 yáng jiā yǒu nǚ chū cháng chéng， yǎng zài shēn guī rén wèi shí。\ntiān shēng lì zhì nán zì qì， yī cháo xuǎn zài jūn wáng cè。 huí móu yī xiào bǎi mèi shēng， liù gōng fěn dài wú yán sè。\nchūn hán cì yù huá qīng chí， wēn quán shuǐ huá xǐ níng zhī。 shì ér fú qǐ jiāo wú lì， shǐ shì xīn chéng ēn zé shí。\nyún bìn huā yán jīn bù yáo， fú róng zhàng nuǎn dù chūn xiāo。 chūn xiāo kǔ duǎn rì gāo qǐ， cóng cǐ jūn wáng bù zǎo cháo。\nchéng huān shì yàn wú xián xiá， chūn cóng chūn yóu yè zhuān yè。 hòu gōng jiā lì sān qiān rén， sān qiān chǒng ài zài yī shēn。\njīn wū zhuāng chéng jiāo shì yè， yù lóu yàn bà zuì hé chūn。 zǐ mèi dì xiong jiē liè tǔ， kě lián guāng cǎi shēng mén hù。\nsuì lìng tiān xià fù mǔ xīn， bù chóng shēng nán chóng shēng nǚ。 lí gōng gāo chù rù qīng yún， xiān lè fēng piāo chù chù wén。\nhuǎn gē màn wǔ níng sī zhú， jìn rì jūn wáng kàn bù zú。 yú yáng pí gǔ dòng dì lái， jīng pò ní cháng yǔ yī qǔ。\njiǔ chóng chéng quē yān chén shēng， qiān chéng wàn qí xī nán xíng。 cuì huá yáo yáo xíng fù zhǐ， xī chū dōu mén bǎi yú lǐ。\nliù jūn bù fā wú nài hé， wǎn zhuǎn é méi mǎ qián sǐ。 huā diàn wěi dì wú rén shōu， cuì qiào jīn què yù sāo tóu。\njūn wáng yǎn miàn jiù bù dé， huí kàn xuè lèi xiāng hé liú。 huáng āi sǎn màn fēng xiāo suǒ， yún zhàn yíng yū dēng jiàn gé。\né méi shān xià shǎo rén xíng， jīng qí wú guāng rì sè báo。 shǔ jiāng shuǐ bì shǔ shān qīng， shèng zhǔ zhāo zhāo mù mù qíng。\nxíng gōng jiàn yuè shāng xīn sè， yè yǔ wén líng cháng duàn shēng。 tiān xuán dì zhuàn huí lóng yù， dào cǐ chóu chú bù néng qù。\nmǎ wéi pō xià ní tǔ zhōng， bù jiàn yù yán kōng sǐ chù。 jūn chén xiāng gù jìn zhān yī， dōng wàng dōu mén xìn mǎ guī。\nguī lái chí yuàn jiē yī jiù， tài yè fú róng wèi yāng liǔ。 fú róng rú miàn liǔ rú méi， duì cǐ rú hé bù lèi chuí。\nchūn fēng táo lǐ huā kāi rì， qiū yǔ wú tóng yè luò shí。 xī gōng nán nèi duō qiū cǎo， luò yè mǎn jiē hóng bù sǎo。( huā kāi rì yī zuò： huā kāi yè； nán nèi yī zuò： nán yuàn)\nlí yuán dì zǐ bái fà xīn， jiāo fáng ā jiān qīng é lǎo。 xī diàn yíng fēi sī qiǎo rán， gū dēng tiāo jìn wèi chéng mián。\nchí chí zhōng gǔ chū cháng yè， gěng gěng xīng hé yù shǔ tiān。 yuān yāng wǎ lěng shuāng huá zhòng， fěi cuì qīn hán shuí yǔ gòng。\nyōu yōu shēng sǐ bié jīng nián， hún pò bù céng lái rù mèng。 lín qióng dào shì hóng dōu kè， néng yǐ jīng chéng zhì hún pò。\nwèi gǎn jūn wáng niǎn zhuǎn sī， suì jiào fāng shì yīn qín mì。 pái kōng yù qì bēn rú diàn， shēng tiān rù dì qiú zhī biàn。\nshàng qióng bì luò xià huáng quán， liǎng chù máng máng jiē bù jiàn。 hū wén hǎi shàng yǒu xiān shān， shān zài xū wú piǎo miǎo jiān。\nlóu gé líng lóng wǔ yún qǐ， qí zhōng chuò yuē duō xiān zǐ。 zhōng yǒu yī rén zì tài zhēn， xuě fū huā mào cēn cī shì。\njīn quē xī xiāng kòu yù jiōng， zhuǎn jiào xiǎo yù bào shuāng chéng。 wén dào hàn jiā tiān zǐ shǐ， jiǔ huá zhàng lǐ mèng hún jīng。\nlǎn yī tuī zhěn qǐ pái huái， zhū bó yín píng yǐ lǐ kāi。 yún bìn bàn piān xīn shuì jiào， huā guān bù zhěng xià táng lái。\nfēng chuī xiān mèi piāo piāo jǔ， yóu sì ní cháng yǔ yī wǔ。 yù róng jì mò lèi lán gān， lí huā yī zhī chūn dài yǔ。( lán tōng： lán； piāo piāo yī zuò： piāo yáo)\nhán qíng níng dì xiè jūn wáng， yī bié yīn róng liǎng miǎo máng。 zhāo yáng diàn lǐ ēn ài jué， péng lái gōng zhōng rì yuè cháng。\nhuí tóu xià wàng rén huán chù， bù jiàn cháng ān jiàn chén wù。 wéi jiāng jiù wù biǎo shēn qíng， diàn hé jīn chāi jì jiāng qù。\nchāi liú yī gǔ hé yī shàn， chāi bò huáng jīn hé fēn diàn。 dàn jiào xīn sì jīn diàn jiān， tiān shàng rén jiān huì xiāng jiàn。\nlín bié yīn qín zhòng jì cí， cí zhōng yǒu shì liǎng xīn zhī。 qī yuè qī rì cháng shēng diàn， yè bàn wú rén sī yǔ shí。\nzài tiān yuàn zuò bǐ yì niǎo， zài dì yuàn wèi lián lǐ zhī。 tiān cháng dì jiǔ yǒu shí jìn， cǐ hèn mián mián wú jué qī。",
        translation: "汉家的皇帝看重美色，一心想找一位绝代佳人，可统治多年也没有找到。杨家有个女儿刚刚长大，养在深闺里，被选到了君王身边，她回头一笑千娇百媚，宫里所有的美女都显得没有颜色。从此君王天天宠爱她，连早朝都不上了，她的姐妹兄弟也都封了高官。后来渔阳的战鼓忽然打响，惊破了宫中的歌舞，皇帝带着千军万马向西南逃去，走到半路将士不肯前行，她被处死在马前，皇帝掩着脸救不了她。战乱平定后皇帝回到京城，池水园子还是老样子，看见芙蓉想起她的脸，看见柳叶想起她的眉，从此日日夜夜想念，孤灯不眠。后来有一位道士说她成了仙，在海上虚无缥缈的仙山找到了她。她托道士把金钗钿盒分成两半带去作信物，还说起当年七夕夜里无人时的誓言：在天上愿做比翼双飞的鸟，在地上愿做枝干相连的树。天长地久总有个尽头，这悔恨却绵绵不断，永远没有结束的一天。",
      }
      ],
    },
    {
      title: "琵琶行 · 白居易",
      art: 'tangshi-300:ch251',
      artPrompt: "古诗《琵琶行》意境插画：浔阳江头夜送客，枫叶荻花秋瑟瑟。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "浔阳江头夜送客，枫叶荻花秋瑟瑟。\n主人下马客在船，举酒欲饮无管弦。\n醉不成欢惨将别，别时茫茫江浸月。\n忽闻水上琵琶声，主人忘归客不发。\n寻声暗问弹者谁？琵琶声停欲语迟。\n移船相近邀相见，添酒回灯重开宴。\n千呼万唤始出来，犹抱琵琶半遮面。\n转轴拨弦三两声，未成曲调先有情。\n弦弦掩抑声声思，似诉平生不得志。（不得志 一作：意）\n低眉信手续续弹，说尽心中无限事。\n轻拢慢捻抹复挑，初为《霓裳》后《六幺》（六幺 一作：绿腰）。\n大弦嘈嘈如急雨，小弦切切如私语。\n嘈嘈切切错杂弹，大珠小珠落玉盘。\n间关莺语花底滑，幽咽泉流冰下难。\n冰泉冷涩弦凝绝，凝绝不通声暂歇。(暂歇 一作：渐歇)\n别有幽愁暗恨生，此时无声胜有声。\n银瓶乍破水浆迸，铁骑突出刀枪鸣。\n曲终收拨当心画，四弦一声如裂帛。\n东船西舫悄无言，唯见江心秋月白。\n沉吟放拨插弦中，整顿衣裳起敛容。\n自言本是京城女，家在虾蟆陵下住。\n十三学得琵琶成，名属教坊第一部。\n曲罢曾教善才服，妆成每被秋娘妒。\n五陵年少争缠头，一曲红绡不知数。\n钿头银篦击节碎，血色罗裙翻酒污。(银篦 一作：云)\n今年欢笑复明年，秋月春风等闲度。\n弟走从军阿姨死，暮去朝来颜色故。\n门前冷落鞍马稀，老大嫁作商人妇。\n商人重利轻别离，前月浮梁买茶去。\n去来江口守空船，绕船月明江水寒。\n夜深忽梦少年事，梦啼妆泪红阑干。\n我闻琵琶已叹息，又闻此语重唧唧。\n同是天涯沦落人，相逢何必曾相识！\n我从去年辞帝京，谪居卧病浔阳城。\n浔阳地僻无音乐，终岁不闻丝竹声。\n住近湓江地低湿，黄芦苦竹绕宅生。\n其间旦暮闻何物？杜鹃啼血猿哀鸣。\n春江花朝秋月夜，往往取酒还独倾。\n岂无山歌与村笛？呕哑嘲哳难为听。\n今夜闻君琵琶语，如听仙乐耳暂明。\n莫辞更坐弹一曲，为君翻作《琵琶行》。\n感我此言良久立，却坐促弦弦转急。\n凄凄不似向前声，满座重闻皆掩泣。\n座中泣下谁最多？江州司马青衫湿。",
        pinyin: "xún yáng jiāng tóu yè sòng kè， fēng yè dí huā qiū sè sè。\nzhǔ rén xià mǎ kè zài chuán， jǔ jiǔ yù yǐn wú guǎn xián。\nzuì bù chéng huān cǎn jiāng bié， bié shí máng máng jiāng jìn yuè。\nhū wén shuǐ shàng pí pa shēng， zhǔ rén wàng guī kè bù fā。\nxún shēng àn wèn tán zhě shuí？ pí pa shēng tíng yù yǔ chí。\nyí chuán xiāng jìn yāo xiāng jiàn， tiān jiǔ huí dēng zhòng kāi yàn。\nqiān hū wàn huàn shǐ chū lái， yóu bào pí pa bàn zhē miàn。\nzhuǎn zhóu bō xián sān liǎng shēng， wèi chéng qǔ diào xiān yǒu qíng。\nxián xián yǎn yì shēng shēng sī， sì sù píng shēng bù dé zhì。（ bù dé zhì yī zuò： yì）\ndī méi xìn shǒu xù xù tán， shuō jìn xīn zhōng wú xiàn shì。\nqīng lǒng màn niǎn mǒ fù tiāo， chū wèi《 ní cháng》 hòu《 liù yāo》（ liù yāo yī zuò： lǜ yāo）。\ndà xián cáo cáo rú jí yǔ， xiǎo xián qiè qiè rú sī yǔ。\ncáo cáo qiè qiè cuò zá tán， dà zhū xiǎo zhū luò yù pán。\njiān guān yīng yǔ huā dǐ huá， yōu yàn quán liú bīng xià nán。\nbīng quán lěng sè xián níng jué， níng jué bù tōng shēng zàn xiē。( zàn xiē yī zuò： jiàn xiē)\nbié yǒu yōu chóu àn hèn shēng， cǐ shí wú shēng shèng yǒu shēng。\nyín píng zhà pò shuǐ jiāng bèng， tiě qí tū chū dāo qiāng míng。\nqǔ zhōng shōu bō dāng xīn huà， sì xián yī shēng rú liè bó。\ndōng chuán xī fǎng qiāo wú yán， wéi jiàn jiāng xīn qiū yuè bái。\nchén yín fàng bō chā xián zhōng， zhěng dùn yī shang qǐ liǎn róng。\nzì yán běn shì jīng chéng nǚ， jiā zài há má líng xià zhù。\nshí sān xué dé pí pa chéng， míng shǔ jiào fāng dì yī bù。\nqǔ bà céng jiào shàn cái fú， zhuāng chéng měi bèi qiū niáng dù。\nwǔ líng nián shào zhēng chán tóu， yī qǔ hóng xiāo bù zhī shù。\ndiàn tóu yín bì jī jié suì， xuè sè luó qún fān jiǔ wū。( yín bì yī zuò： yún)\njīn nián huān xiào fù míng nián， qiū yuè chūn fēng děng xián dù。\ndì zǒu cóng jūn ā yí sǐ， mù qù cháo lái yán sè gù。\nmén qián lěng luò ān mǎ xī， lǎo dà jià zuò shāng rén fù。\nshāng rén zhòng lì qīng bié lí， qián yuè fú liáng mǎi chá qù。\nqù lái jiāng kǒu shǒu kōng chuán， rào chuán yuè míng jiāng shuǐ hán。\nyè shēn hū mèng shào nián shì， mèng tí zhuāng lèi hóng lán gān。\nwǒ wén pí pa yǐ tàn xī， yòu wén cǐ yǔ zhòng jī jī。\ntóng shì tiān yá lún luò rén， xiāng féng hé bì céng xiāng shí！\nwǒ cóng qù nián cí dì jīng， zhé jū wò bìng xún yáng chéng。\nxún yáng dì pì wú yīn yuè， zhōng suì bù wén sī zhú shēng。\nzhù jìn pén jiāng dì dī shī， huáng lú kǔ zhú rào zhái shēng。\nqí jiān dàn mù wén hé wù？ dù juān tí xuè yuán āi míng。\nchūn jiāng huā cháo qiū yuè yè， wǎng wǎng qǔ jiǔ hái dú qīng。\nqǐ wú shān gē yǔ cūn dí？ ǒu yǎ cháo zhā nán wéi tīng。\njīn yè wén jūn pí pa yǔ， rú tīng xiān lè ěr zàn míng。\nmò cí gèng zuò tán yī qǔ， wèi jūn fān zuò《 pí pa xíng》。\ngǎn wǒ cǐ yán liáng jiǔ lì， què zuò cù xián xián zhuǎn jí。\nqī qī bù sì xiàng qián shēng， mǎn zuò zhòng wén jiē yǎn qì。\nzuò zhōng qì xià shuí zuì duō？ jiāng zhōu sī mǎ qīng shān shī。",
        translation: "夜里在浔阳江边送客，秋风吹得枫叶和荻花沙沙响，忽然听见水上传来琵琶声，主人和客人都忘了走。弹琵琶的原来是一位商人妇，她说自己年轻时在京城是弹琵琶的名手，公子哥儿们争着送她礼物；后来年华老去，嫁给了商人，丈夫买茶去了，她一个人守着空船，望着明月，常常梦见从前的日子。诗人听了连连叹气，说同是流落天涯的人，见面何必曾经相识，他自己也被贬到这偏僻的江城，一年到头听不见音乐，如今听到这琵琶声，就像听到仙乐一样。请她再弹一曲，声音变得凄凄切切，满座的人听了都掩面哭泣，谁的泪水最多？江州司马的青衫都被打湿了。",
      }
      ],
    },
    {
      title: "走马川行奉送封大夫出师 · 岑参",
      art: 'tangshi-300:ch252',
      artPrompt: "古诗《走马川行奉送封大夫出师》意境插画：君不见走马川行雪海边，平沙莽莽黄入天。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "君不见走马川行雪海边，平沙莽莽黄入天。\n轮台九月风夜吼，一川碎石大如斗，随风满地石乱走。\n匈奴草黄马正肥，金山西见烟尘飞，汉家大将西出师。\n将军金甲夜不脱，半夜军行戈相拨，风头如刀面如割。\n马毛带雪汗气蒸，五花连钱旋作冰，幕中草檄砚水凝。\n虏骑闻之应胆慑，料知短兵不敢接，车师西门伫献捷。",
        pinyin: "jūn bù jiàn zǒu mǎ chuān xíng xuě hǎi biān， píng shā mǎng mǎng huáng rù tiān。\nlún tái jiǔ yuè fēng yè hǒu， yī chuān suì shí dà rú dòu， suí fēng mǎn dì shí luàn zǒu。\nxiōng nú cǎo huáng mǎ zhèng féi， jīn shān xī jiàn yān chén fēi， hàn jiā dà jiàng xī chū shī。\njiāng jūn jīn jiǎ yè bù tuō， bàn yè jūn xíng gē xiāng bō， fēng tou rú dāo miàn rú gē。\nmǎ máo dài xuě hàn qì zhēng， wǔ huā lián qián xuán zuò bīng， mù zhōng cǎo xí yàn shuǐ níng。\nlǔ qí wén zhī yìng dǎn shè， liào zhī duǎn bīng bù gǎn jiē， chē shī xī mén zhù xiàn jié。",
        translation: "你没看见吗，走马川在雪海旁边，茫茫平沙一直黄到天边。九月轮台的夜里狂风怒吼，一川的碎石大得像斗，随风满地乱滚。敌人的草正黄，战马正肥，金山西边烟尘滚滚，汉家的大将带兵向西出征。将军夜里不脱金甲，半夜行军兵器相碰，风头像刀子一样割着脸。马毛上带着雪，汗气一蒸马上结冰，军帐中写檄文，砚台里的水都冻住了。敌人听了应该吓破胆，料想不敢短兵相接，我们就在车师西门外等着捷报。",
      }
      ],
    },
    {
      title: "轮台歌奉送封大夫出师 · 岑参",
      art: 'tangshi-300:ch253',
      artPrompt: "古诗《轮台歌奉送封大夫出师》意境插画：轮台城头夜吹角，轮台城北旄头落。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "轮台城头夜吹角，轮台城北旄头落。\n羽书昨夜过渠黎，单于已在金山西。\n戍楼西望烟尘黑，汉军屯在轮台北。\n上将拥旄西出征，平明吹笛大军行。\n四边伐鼓雪海涌，三军大呼阴山动。\n虏塞兵气连云屯，战场白骨缠草根。\n剑河风急雪片阔，沙口石冻马蹄脱。(雪片阔 一作：云片阔)\n亚相勤王甘苦辛，誓将报主静边尘。\n古来青史谁不见，今见功名胜古人。",
        pinyin: "lún tái chéng tóu yè chuī jiǎo， lún tái chéng běi máo tóu luò。\nyǔ shū zuó yè guò qú lí， chán yú yǐ zài jīn shān xī。\nshù lóu xī wàng yān chén hēi， hàn jūn tún zài lún tái běi。\nshàng jiàng yōng máo xī chū zhēng， píng míng chuī dí dà jūn xíng。\nsì biān fá gǔ xuě hǎi yǒng， sān jūn dà hū yīn shān dòng。\nlǔ sāi bīng qì lián yún tún， zhàn chǎng bái gǔ chán cǎo gēn。\njiàn hé fēng jí xuě piàn kuò， shā kǒu shí dòng mǎ tí tuō。( xuě piàn kuò yī zuò： yún piàn kuò)\nyà xiāng qín wáng gān kǔ xīn， shì jiāng bào zhǔ jìng biān chén。\ngǔ lái qīng shǐ shuí bù jiàn， jīn jiàn gōng míng shèng gǔ rén。",
        translation: "轮台城头夜里吹起号角，轮台城北的将星坠落了。昨夜紧急军书经过渠黎，敌军已在金山西边。从戍楼上向西望，烟尘一片黑，汉军驻扎在轮台北边。主将举着旌旗向西出征，天刚亮吹着笛子大军出发。四面战鼓擂动，像雪海翻涌，三军齐声大喊，震得阴山摇动。敌营的杀气连着云聚起来，战场上白骨缠着草根。剑河风急雪片又大又宽，沙口的石头冻得梆硬，马蹄都会脱落。主帅勤劳王事不怕辛苦，发誓报答君王，平定边地的战尘。青史留名的事古来谁没见过，今天的功名胜过古人。",
      }
      ],
    },
    {
      title: "白雪歌送武判官归京 · 岑参",
      art: 'tangshi-300:ch254',
      artPrompt: "古诗《白雪歌送武判官归京》意境插画：北风卷地白草折，胡天八月即飞雪。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "北风卷地白草折，胡天八月即飞雪。\n忽如一夜春风来，千树万树梨花开。\n散入珠帘湿罗幕，狐裘不暖锦衾薄。\n将军角弓不得控，都护铁衣冷难着。(难着 一作：犹著)\n瀚海阑干百丈冰，愁云惨淡万里凝。\n中军置酒饮归客，胡琴琵琶与羌笛。\n纷纷暮雪下辕门，风掣红旗冻不翻。\n轮台东门送君去，去时雪满天山路。\n山回路转不见君，雪上空留马行处。",
        pinyin: "běi fēng juàn dì bái cǎo zhé， hú tiān bā yuè jí fēi xuě。\nhū rú yī yè chūn fēng lái， qiān shù wàn shù lí huā kāi。\nsàn rù zhū lián shī luó mù， hú qiú bù nuǎn jǐn qīn báo。\njiāng jūn jiǎo gōng bù dé kòng， dū hù tiě yī lěng nán zhe。( nán zhe yī zuò： yóu zhù)\nhàn hǎi lán gān bǎi zhàng bīng， chóu yún cǎn dàn wàn lǐ níng。\nzhōng jūn zhì jiǔ yǐn guī kè， hú qín pí pa yǔ qiāng dí。\nfēn fēn mù xuě xià yuán mén， fēng chè hóng qí dòng bù fān。\nlún tái dōng mén sòng jūn qù， qù shí xuě mǎn tiān shān lù。\nshān huí lù zhuǎn bù jiàn jūn， xuě shàng kōng liú mǎ xíng chù。",
        translation: "北风卷过大地，把白草都吹折了，塞外的八月就纷纷扬扬下起了大雪，就像一夜之间春风吹来，千万棵树上开满了梨花似的雪。雪落在珠帘罗幕上，狐皮袍子也不暖了，将军的角弓冻得拉不开，红旗冻在风里翻也不翻。诗人在轮台东门送朋友远行，山路弯弯转转，再也望不见朋友了，雪地上只剩下马走过的蹄印。",
      }
      ],
    },
    {
      title: "宣州谢脁楼饯别校书叔云 · 李白",
      art: 'tangshi-300:ch255',
      artPrompt: "古诗《宣州谢脁楼饯别校书叔云》意境插画：弃我去者，昨日之日不可留；——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "弃我去者，昨日之日不可留；\n乱我心者，今日之日多烦忧。\n长风万里送秋雁，对此可以酣高楼。\n蓬莱文章建安骨，中间小谢又清发。\n俱怀逸兴壮思飞，欲上青天揽明月。(览 通：揽；明月 一作：日月)\n抽刀断水水更流，举杯消愁愁更愁。\n人生在世不称意，明朝散发弄扁舟。",
        pinyin: "qì wǒ qù zhě， zuó rì zhī rì bù kě liú；\nluàn wǒ xīn zhě， jīn rì zhī rì duō fán yōu。\ncháng fēng wàn lǐ sòng qiū yàn， duì cǐ kě yǐ hān gāo lóu。\npéng lái wén zhāng jiàn ān gǔ， zhōng jiān xiǎo xiè yòu qīng fā。\njù huái yì xīng zhuàng sī fēi， yù shàng qīng tiān lǎn míng yuè。( lǎn tōng： lǎn； míng yuè yī zuò： rì yuè)\nchōu dāo duàn shuǐ shuǐ gèng liú， jǔ bēi xiāo chóu chóu gèng chóu。\nrén shēng zài shì bù chēng yì， míng cháo sàn fā nòng piān zhōu。",
        translation: "昨天抛弃我而去的日子再也留不住，今天扰乱我心的日子又有许多烦忧。万里长风送来南飞的秋雁，对着这景色正好在高楼上痛痛快快喝酒写诗，大家都豪情满怀，想飞上青天摘明月。愁绪就像流水，抽出刀来砍不断，举起酒杯解愁反而更愁，人生在世不如意，不如明天披散头发，坐上一叶小船自由自在地去漂游。",
      }
      ],
    },
    {
      title: "庐山谣寄卢侍御虚舟 · 李白",
      art: 'tangshi-300:ch256',
      artPrompt: "古诗《庐山谣寄卢侍御虚舟》意境插画：我本楚狂人，凤歌笑孔丘。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "我本楚狂人，凤歌笑孔丘。\n手持绿玉杖，朝别黄鹤楼。\n五岳寻仙不辞远，一生好入名山游。\n庐山秀出南斗傍，屏风九叠云锦张。\n影落明湖青黛光，金阙前开二峰长，银河倒挂三石梁。\n香炉瀑布遥相望，回崖沓嶂凌苍苍。\n翠影红霞映朝日，鸟飞不到吴天长。\n登高壮观天地间，大江茫茫去不还。\n黄云万里动风色，白波九道流雪山。\n好为庐山谣，兴因庐山发。\n闲窥石镜清我心，谢公行处苍苔没。\n早服还丹无世情，琴心三叠道初成。\n遥见仙人彩云里，手把芙蓉朝玉京。\n先期汗漫九垓上，愿接卢敖游太清。",
        pinyin: "wǒ běn chǔ kuáng rén， fèng gē xiào kǒng qiū。\nshǒu chí lǜ yù zhàng， cháo bié huáng hè lóu。\nwǔ yuè xún xiān bù cí yuǎn， yī shēng hǎo rù míng shān yóu。\nlú shān xiù chū nán dòu bàng， píng fēng jiǔ dié yún jǐn zhāng。\nyǐng luò míng hú qīng dài guāng， jīn quē qián kāi èr fēng cháng， yín hé dǎo guà sān shí liáng。\nxiāng lú pù bù yáo xiāng wàng， huí yá tà zhàng líng cāng cāng。\ncuì yǐng hóng xiá yìng cháo rì， niǎo fēi bù dào wú tiān cháng。\ndēng gāo zhuàng guān tiān dì jiān， dà jiāng máng máng qù bù hái。\nhuáng yún wàn lǐ dòng fēng sè， bái bō jiǔ dào liú xuě shān。\nhǎo wèi lú shān yáo， xīng yīn lú shān fā。\nxián kuī shí jìng qīng wǒ xīn， xiè gōng xíng chù cāng tái méi。\nzǎo fú hái dān wú shì qíng， qín xīn sān dié dào chū chéng。\nyáo jiàn xiān rén cǎi yún lǐ， shǒu bǎ fú róng cháo yù jīng。\nxiān qī hàn màn jiǔ gāi shàng， yuàn jiē lú áo yóu tài qīng。",
        translation: "我本来就是个狂放的人，手里拿着绿玉杖，早晨辞别黄鹤楼，为寻仙不怕路远，一生最爱到名山大川游玩。庐山秀美地立在星空旁边，瀑布像银河倒挂在石梁上，登上高处看天地，大江茫茫流去不再回头。远远望见仙人站在彩云里，手里拿着莲花朝拜天宫，我真愿意带着朋友一起到天上去遨游啊。",
      }
      ],
    },
    {
      title: "梦游天姥吟留别 · 李白",
      art: 'tangshi-300:ch257',
      artPrompt: "古诗《梦游天姥吟留别》意境插画：海客谈瀛洲，烟涛微茫信难求；——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "海客谈瀛洲，烟涛微茫信难求；\n越人语天姥，云霞明灭或可睹。\n天姥连天向天横，势拔五岳掩赤城。\n天台四万八千丈，对此欲倒东南倾。(四万 一作：一万)\n我欲因之梦吴越，一夜飞度镜湖月。(度 通：渡)\n湖月照我影，送我至剡溪。\n谢公宿处今尚在，渌水荡漾清猿啼。\n脚著谢公屐，身登青云梯。\n半壁见海日，空中闻天鸡。\n千岩万转路不定，迷花倚石忽已暝。\n熊咆龙吟殷岩泉，栗深林兮惊层巅。\n云青青兮欲雨，水澹澹兮生烟。\n列缺霹雳，丘峦崩摧。\n洞天石扉，訇然中开。\n青冥浩荡不见底，日月照耀金银台。\n霓为衣兮风为马，云之君兮纷纷而来下。\n虎鼓瑟兮鸾回车，仙之人兮列如麻。\n忽魂悸以魄动，恍惊起而长嗟。\n惟觉时之枕席，失向来之烟霞。\n世间行乐亦如此，古来万事东流水。\n别君去兮何时还？且放白鹿青崖间，须行即骑访名山。\n安能摧眉折腰事权贵，使我不得开心颜!",
        pinyin: "hǎi kè tán yíng zhōu， yān tāo wēi máng xìn nán qiú；\nyuè rén yǔ tiān lǎo， yún xiá míng miè huò kě dǔ。\ntiān lǎo lián tiān xiàng tiān héng， shì bá wǔ yuè yǎn chì chéng。\ntiān tái sì wàn bā qiān zhàng， duì cǐ yù dǎo dōng nán qīng。( sì wàn yī zuò： yī wàn)\nwǒ yù yīn zhī mèng wú yuè， yī yè fēi dù jìng hú yuè。( dù tōng： dù)\nhú yuè zhào wǒ yǐng， sòng wǒ zhì yǎn xī。\nxiè gōng sù chù jīn shàng zài， lù shuǐ dàng yàng qīng yuán tí。\njiǎo zhù xiè gōng jī， shēn dēng qīng yún tī。\nbàn bì jiàn hǎi rì， kōng zhōng wén tiān jī。\nqiān yán wàn zhuǎn lù bù dìng， mí huā yǐ shí hū yǐ míng。\nxióng páo lóng yín yīn yán quán， lì shēn lín xī jīng céng diān。\nyún qīng qīng xī yù yǔ， shuǐ dàn dàn xī shēng yān。\nliè quē pī lì， qiū luán bēng cuī。\ndòng tiān shí fēi， hōng rán zhōng kāi。\nqīng míng hào dàng bù jiàn dǐ， rì yuè zhào yào jīn yín tái。\nní wèi yī xī fēng wèi mǎ， yún zhī jūn xī fēn fēn ér lái xià。\nhǔ gǔ sè xī luán huí chē， xiān zhī rén xī liè rú má。\nhū hún jì yǐ pò dòng， huǎng jīng qǐ ér cháng jiē。\nwéi jué shí zhī zhěn xí， shī xiàng lái zhī yān xiá。\nshì jiān xíng lè yì rú cǐ， gǔ lái wàn shì dōng liú shuǐ。\nbié jūn qù xī hé shí hái？ qiě fàng bái lù qīng yá jiān， xū xíng jí qí fǎng míng shān。\nān néng cuī méi zhé yāo shì quán guì， shǐ wǒ bù dé kāi xīn yán!",
        translation: "海上回来的人说仙山瀛洲隔着烟雾波涛，实在难找；越人说天姥山高得连着天，云霞忽明忽暗，有时还能望见。诗人夜里做了个梦，一夜飞过月光下的镜湖，穿着木屐登上青云梯，看见海上日出、听见天上雄鸡啼叫；忽然电闪雷鸣，山石大门訇然打开，仙人穿着彩虹衣裳、驾着风马纷纷下来，猛地一惊，梦醒了，枕席还在，满山的烟霞都不见了。诗人说：怎么能低眉弯腰去伺候有权有势的人，让自己不开心不快活呢！",
      }
      ],
    },
    {
      title: "金陵酒肆留别 · 李白",
      art: 'tangshi-300:ch258',
      artPrompt: "古诗《金陵酒肆留别》意境插画：风吹柳花满店香，吴姬压酒唤客尝。(劝客 一作：唤客)——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "风吹柳花满店香，吴姬压酒唤客尝。(劝客 一作：唤客)\n金陵子弟来相送，欲行不行各尽觞。\n请君试问东流水，别意与之谁短长。",
        pinyin: "fēng chuī liǔ huā mǎn diàn xiāng， wú jī yā jiǔ huàn kè cháng。( quàn kè yī zuò： huàn kè)\njīn líng zǐ dì lái xiāng sòng， yù xíng bù xíng gè jìn shāng。\nqǐng jūn shì wèn dōng liú shuǐ， bié yì yǔ zhī shuí duǎn cháng。",
        translation: "风吹着柳絮，满店里都是香气，酒店的姑娘压好新酒，请客人尝一尝。金陵的年轻人来给我送行，要走的不走的都干尽了杯中的酒。请你们问问向东奔流的江水，离别的情意和它比一比，到底谁短谁长呢？",
      }
      ],
    },
    {
      title: "韩碑 · 李商隐",
      art: 'tangshi-300:ch259',
      artPrompt: "古诗《韩碑》意境插画：元和天子神武姿，彼何人哉轩与羲。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "元和天子神武姿，彼何人哉轩与羲。\n誓将上雪列圣耻，坐法宫中朝四夷。\n淮西有贼五十载，封狼生䝙䝙生罴。\n不据山河据平地，长戈利矛日可麾。\n帝得圣相相曰度，贼斫不死神扶持。\n腰悬相印作都统，阴风惨澹天王旗。\n愬武古通作牙爪，仪曹外郎载笔随。\n行军司马智且勇，十四万众犹虎貔。\n入蔡缚贼献太庙，功无与让恩不訾。\n帝曰汝度功第一，汝从事愈宜为辞。\n愈拜稽首蹈且舞，金石刻画臣能为。\n古者世称大手笔，此事不系于职司。\n当仁自古有不让，言讫屡颔天子颐。\n公退斋戒坐小阁，濡染大笔何淋漓。\n点窜尧典舜典字，涂改清庙生民诗。\n文成破体书在纸，清晨再拜铺丹墀。\n表曰臣愈昧死上，咏神圣功书之碑。\n碑高三丈字如斗，负以灵鳌蟠以螭。\n句奇语重喻者少，谗之天子言其私。\n长绳百尺拽碑倒，粗砂大石相磨治。\n公之斯文若元气，先时已入人肝脾。\n汤盘孔鼎有述作，今无其器存其辞。\n呜呼圣王及圣相，相与烜赫流淳熙。\n公之斯文不示后，曷与三五相攀追。\n愿书万本诵万遍，口角流沫右手胝。\n传之七十有二代，以为封禅玉检明堂基。",
        pinyin: "yuán hé tiān zǐ shén wǔ zī， bǐ hé rén zāi xuān yǔ xī。\nshì jiāng shàng xuě liè shèng chǐ， zuò fǎ gōng zhōng cháo sì yí。\nhuái xī yǒu zéi wǔ shí zǎi， fēng láng shēng chū chū shēng pí。\nbù jù shān hé jù píng dì， cháng gē lì máo rì kě huī。\ndì dé shèng xiāng xiāng yuē dù， zéi zhuó bù sǐ shén fú chí。\nyāo xuán xiāng yìn zuò dōu tǒng， yīn fēng cǎn dàn tiān wáng qí。\nshuò wǔ gǔ tōng zuò yá zhuǎ， yí cáo wài láng zǎi bǐ suí。\nxíng jūn sī mǎ zhì qiě yǒng， shí sì wàn zhòng yóu hǔ pí。\nrù cài fù zéi xiàn tài miào， gōng wú yǔ ràng ēn bù zī。\ndì yuē rǔ dù gōng dì yī， rǔ cóng shì yù yí wèi cí。\nyù bài qǐ shǒu dǎo qiě wǔ， jīn shí kè huà chén néng wèi。\ngǔ zhě shì chēng dà shǒu bǐ， cǐ shì bù xì yú zhí sī。\ndāng rén zì gǔ yǒu bù ràng， yán qì lǚ hàn tiān zǐ yí。\ngōng tuì zhāi jiè zuò xiǎo gé， rú rǎn dà bǐ hé lín lí。\ndiǎn cuàn yáo diǎn shùn diǎn zì， tú gǎi qīng miào shēng mín shī。\nwén chéng pò tǐ shū zài zhǐ， qīng chén zài bài pù dān chí。\nbiǎo yuē chén yù mèi sǐ shàng， yǒng shén shèng gōng shū zhī bēi。\nbēi gāo sān zhàng zì rú dòu， fù yǐ líng áo pán yǐ chī。\njù qí yǔ zhòng yù zhě shǎo， chán zhī tiān zǐ yán qí sī。\ncháng shéng bǎi chǐ zhuài bēi dǎo， cū shā dà shí xiāng mó zhì。\ngōng zhī sī wén ruò yuán qì， xiān shí yǐ rù rén gān pí。\ntāng pán kǒng dǐng yǒu shù zuò， jīn wú qí qì cún qí cí。\nwū hū shèng wáng jí shèng xiāng， xiāng yǔ xuān hè liú chún xī。\ngōng zhī sī wén bù shì hòu， hé yǔ sān wǔ xiāng pān zhuī。\nyuàn shū wàn běn sòng wàn biàn， kǒu jiǎo liú mò yòu shǒu zhī。\nchuán zhī qī shí yǒu èr dài， yǐ wéi fēng chán yù jiǎn míng táng jī。",
        translation: "元和年间的天子神明威武，发誓要为历代先帝雪洗耻辱；淮西的叛贼割据了五十年，皇帝任裴度挂帅，十四万大军像虎豹一样勇猛，攻进蔡州活捉叛贼，立下没人能比的功劳。皇帝说裴度功劳第一，叫韩愈写文章，把这场神圣的功业刻在高三丈的大石碑上；后来有人进谗言，用长绳把碑拉倒，粗砂大石磨掉了它，可韩愈的文章早就像天地间的元气一样进入了人心。这样的大文章应该刻上万本、诵读万遍，一代一代永远传下去。",
      }
      ],
    },
    {
      title: "听董大弹胡笳声兼寄语 · 李颀",
      art: 'tangshi-300:ch260',
      artPrompt: "古诗《听董大弹胡笳声兼寄语》意境插画：蔡女昔造胡笳声，一弹一十有八拍。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "蔡女昔造胡笳声，一弹一十有八拍。\n胡人落泪沾边草，汉使断肠对归客。\n古戍苍苍烽火寒，大荒沉沉飞雪白。\n先拂商弦后角羽，四郊秋叶惊摵摵。\n董夫子，通神明，深山窃听来妖精。\n言迟更速皆应手，将往复旋如有情。\n空山百鸟散还合，万里浮云阴且晴。\n嘶酸雏雁失群夜，断绝胡儿恋母声。\n川为静其波，鸟亦罢其鸣。\n乌孙部落家乡远，逻娑沙尘哀怨生。\n幽音变调忽飘洒，长风吹林雨堕瓦。\n迸泉飒飒飞木末，野鹿呦呦走堂下。\n长安城连东掖垣，凤凰池对青琐门。\n高才脱略名与利，日夕望君抱琴至。",
        pinyin: "cài nǚ xī zào hú jiā shēng， yī tán yī shí yǒu bā pāi。\nhú rén luò lèi zhān biān cǎo， hàn shǐ duàn cháng duì guī kè。\ngǔ shù cāng cāng fēng huǒ hán， dà huāng chén chén fēi xuě bái。\nxiān fú shāng xián hòu jiǎo yǔ， sì jiāo qiū yè jīng sè sè。\ndǒng fū zǐ， tōng shén míng， shēn shān qiè tīng lái yāo jīng。\nyán chí gèng sù jiē yìng shǒu， jiāng wǎng fù xuán rú yǒu qíng。\nkōng shān bǎi niǎo sàn hái hé， wàn lǐ fú yún yīn qiě qíng。\nsī suān chú yàn shī qún yè， duàn jué hú ér liàn mǔ shēng。\nchuān wèi jìng qí bō， niǎo yì bà qí míng。\nwū sūn bù luò jiā xiāng yuǎn， luó suō shā chén āi yuàn shēng。\nyōu yīn biàn diào hū piāo sǎ， cháng fēng chuī lín yǔ duò wǎ。\nbèng quán sà sà fēi mù mò， yě lù yōu yōu zǒu táng xià。\ncháng ān chéng lián dōng yè yuán， fèng huáng chí duì qīng suǒ mén。\ngāo cái tuō lüè míng yǔ lì， rì xī wàng jūn bào qín zhì。",
        translation: "从前蔡文姬造出胡笳的曲子，一弹就是十八拍，胡人听了眼泪打湿边草，汉家使者对着归客伤心欲绝。董夫子弹琴的本领高得通神，深山里的精灵都偷偷来听：琴声像空山中百鸟散了又合，万里浮云转阴转晴，又像失群的雏雁夜里的哀鸣，川水静了波，鸟儿也停了鸣叫。幽咽的曲调忽然变得飘洒，像长风吹过树林、雨点打落屋瓦、泉水飞上树梢、野鹿呦呦跑进堂前；长安城里看淡名利的高人们，从早到晚盼着他抱着琴来呢。",
      }
      ],
    },
    {
      title: "听安万善吹觱篥歌 · 李颀",
      art: 'tangshi-300:ch261',
      artPrompt: "古诗《听安万善吹觱篥歌》意境插画：南山截竹为觱篥，此乐本自龟兹出。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "南山截竹为觱篥，此乐本自龟兹出。\n流传汉地曲转奇，凉州胡人为我吹。\n傍邻闻者多叹息，远客思乡皆泪垂。\n世人解听不解赏，长飙风中自来往。\n枯桑老柏寒飕飗，九雏鸣凤乱啾啾。\n龙吟虎啸一时发，万籁百泉相与秋。\n忽然更作渔阳掺，黄云萧条白日暗。\n变调如闻杨柳春，上林繁花照眼新。\n岁夜高堂列明烛，美酒一杯声一曲。",
        pinyin: "nán shān jié zhú wèi bì lì， cǐ lè běn zì qiū cí chū。\nliú chuán hàn dì qǔ zhuǎn qí， liáng zhōu hú rén wéi wǒ chuī。\nbàng lín wén zhě duō tàn xī， yuǎn kè sī xiāng jiē lèi chuí。\nshì rén jiě tīng bù jiě shǎng， cháng biāo fēng zhōng zì lái wǎng。\nkū sāng lǎo bǎi hán sōu liú， jiǔ chú míng fèng luàn jiū jiū。\nlóng yín hǔ xiào yī shí fā， wàn lài bǎi quán xiāng yǔ qiū。\nhū rán gèng zuò yú yáng chān， huáng yún xiāo tiáo bái rì àn。\nbiàn diào rú wén yáng liǔ chūn， shàng lín fán huā zhào yǎn xīn。\nsuì yè gāo táng liè míng zhú， měi jiǔ yī bēi shēng yī qǔ。",
        translation: "从南山截下竹子做成觱篥，这乐声本来出自龟兹，流传到中原，曲调愈发奇妙，凉州的胡人乐师为我吹奏；旁边听见的人多叹息，远方来的客人想起家乡都掉眼泪。世人只听热闹，不懂得欣赏：乐声忽而像寒风穿过枯桑老柏嗖嗖作响，忽而像九只雏凤啾啾乱鸣、龙吟虎啸一齐发作，忽然又变成杨柳春风的调子，眼前仿佛繁花一新。除夕夜高堂上点起明烛，喝一杯美酒，听一曲觱篥。",
      }
      ],
    },
    {
      title: "古意 · 李颀",
      art: 'tangshi-300:ch262',
      artPrompt: "古诗《古意》意境插画：男儿事长征，少小幽燕客。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "男儿事长征，少小幽燕客。\n赌胜马蹄下，由来轻七尺。\n杀人莫敢前，须如猬毛磔。\n黄云陇底白云飞，未得报恩不能归。\n辽东小妇年十五，惯弹琵琶解歌舞。\n今为羌笛出塞声，使我三军泪如雨。",
        pinyin: "nán ér shì cháng zhēng， shǎo xiǎo yōu yàn kè。\ndǔ shèng mǎ tí xià， yóu lái qīng qī chǐ。\nshā rén mò gǎn qián， xū rú wèi máo zhé。\nhuáng yún lǒng dǐ bái yún fēi， wèi dé bào ēn bù néng guī。\nliáo dōng xiǎo fù nián shí wǔ， guàn tán pí pa jiě gē wǔ。\njīn wèi qiāng dí chū sài shēng， shǐ wǒ sān jūn lèi rú yǔ。",
        translation: "好男儿去远方从军，小小年纪就成了幽燕边地的客，在马蹄下赌胜争强，从来把七尺身躯看得很轻。他凶猛得没人敢上前，胡须张开像刺猬的刺；陇下的黄云间白云飞，没有报答恩情就不能回家。辽东十五岁的小妇人惯会弹琵琶、能歌善舞，如今羌笛吹出出塞的曲子，听得三军将士的眼泪像下雨一样落下来。",
      }
      ],
    },
    {
      title: "送陈章甫 · 李颀",
      art: 'tangshi-300:ch263',
      artPrompt: "古诗《送陈章甫》意境插画：四月南风大麦黄，枣花未落桐阴长。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "四月南风大麦黄，枣花未落桐阴长。\n青山朝别暮还见，嘶马出门思旧乡。\n陈侯立身何坦荡，虬须虎眉仍大颡。\n腹中贮书一万卷，不肯低头在草莽。\n东门酤酒饮我曹，心轻万事如鸿毛。\n醉卧不知白日暮，有时空望孤云高。\n长河浪头连天黑，津口停舟渡不得。\n郑国游人未及家，洛阳行子空叹息。\n闻道故林相识多，罢官昨日今如何。",
        pinyin: "sì yuè nán fēng dà mài huáng， zǎo huā wèi luò tóng yīn cháng。\nqīng shān cháo bié mù hái jiàn， sī mǎ chū mén sī jiù xiāng。\nchén hóu lì shēn hé tǎn dàng， qiú xū hǔ méi réng dà sǎng。\nfù zhōng zhù shū yī wàn juàn， bù kěn dī tóu zài cǎo mǎng。\ndōng mén gū jiǔ yǐn wǒ cáo， xīn qīng wàn shì rú hóng máo。\nzuì wò bù zhī bái rì mù， yǒu shí kōng wàng gū yún gāo。\ncháng hé làng tou lián tiān hēi， jīn kǒu tíng zhōu dù bù dé。\nzhèng guó yóu rén wèi jí jiā， luò yáng xíng zǐ kōng tàn xī。\nwén dào gù lín xiāng shí duō， bà guān zuó rì jīn rú hé。",
        translation: "四月南风吹着，大麦黄了，枣花还没落，梧桐的树荫长长的。陈侯立身多么坦荡，虬曲的胡须、虎一样浓的眉毛、大大的额头，肚子里装着一万卷书，不肯低头埋没在草野之间；他买酒请我们喝，把万事看得像鸿毛一样轻，醉了躺着不知道天黑。如今黄河浪头黑得连着天，渡口停船渡不过去，你要回家还没到家，我们只能空自叹息。",
      }
      ],
    },
    {
      title: "琴歌 · 李颀",
      art: 'tangshi-300:ch264',
      artPrompt: "古诗《琴歌》意境插画：主人有酒欢今夕，请奏鸣琴广陵客。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "主人有酒欢今夕，请奏鸣琴广陵客。\n月照城头乌半飞，霜凄万树风入衣。(万树 一作：万木)\n铜炉华烛烛增辉，初弹渌水后楚妃。\n一声已动物皆静，四座无言星欲稀。\n清淮奉使千余里，敢告云山从此始。",
        pinyin: "zhǔ rén yǒu jiǔ huān jīn xī， qǐng zòu míng qín guǎng líng kè。\nyuè zhào chéng tóu wū bàn fēi， shuāng qī wàn shù fēng rù yī。( wàn shù yī zuò： wàn mù)\ntóng lú huá zhú zhú zēng huī， chū tán lù shuǐ hòu chǔ fēi。\nyī shēng yǐ dòng wù jiē jìng， sì zuò wú yán xīng yù xī。\nqīng huái fèng shǐ qiān yú lǐ， gǎn gào yún shān cóng cǐ shǐ。",
        translation: "主人今晚备下美酒请大家欢聚，请来善弹琴的客人奏琴。月光照着城头，乌鸦惊飞起来，霜气凄凄，风吹进衣裳；铜炉和花烛添了光亮，先弹一曲《渌水》，再弹一曲《楚妃》。琴声一响，万物都安静下来，满座的人不说话，星星也渐渐稀疏；我这远行千里的人说：从此要归隐云山了。",
      }
      ],
    },
    {
      title: "古柏行 · 杜甫",
      art: 'tangshi-300:ch265',
      artPrompt: "古诗《古柏行》意境插画：孔明庙前有老柏，柯如青铜根如石。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "孔明庙前有老柏，柯如青铜根如石。\n霜皮溜雨四十围，黛色参天二千尺。\n君臣已与时际会，树木犹为人爱惜。\n云来气接巫峡长，月出寒通雪山白。\n忆昨路绕锦亭东，先主武侯同閟宫。\n崔嵬枝干郊原古，窈窕丹青户牖空。\n落落盘踞虽得地，冥冥孤高多烈风。\n扶持自是神明力，正直原因造化工。\n大厦如倾要梁栋，万牛回首丘山重。\n不露文章世已惊，未辞翦伐谁能送？\n苦心岂免容蝼蚁，香叶终经宿鸾凤。\n志士幽人莫怨嗟：古来材大难为用。",
        pinyin: "kǒng míng miào qián yǒu lǎo bǎi， kē rú qīng tóng gēn rú shí。\nshuāng pí liū yǔ sì shí wéi， dài sè cān tiān èr qiān chǐ。\njūn chén yǐ yǔ shí jì huì， shù mù yóu wèi rén ài xī。\nyún lái qì jiē wū xiá cháng， yuè chū hán tōng xuě shān bái。\nyì zuó lù rào jǐn tíng dōng， xiān zhǔ wǔ hóu tóng bì gōng。\ncuī wéi zhī gàn jiāo yuán gǔ， yǎo tiǎo dān qīng hù yǒu kōng。\nluò luò pán jù suī dé dì， míng míng gū gāo duō liè fēng。\nfú chí zì shì shén míng lì， zhèng zhí yuán yīn zào huà gōng。\ndà shà rú qīng yào liáng dòng， wàn niú huí shǒu qiū shān zhòng。\nbù lù wén zhāng shì yǐ jīng， wèi cí jiǎn fá shuí néng sòng？\nkǔ xīn qǐ miǎn róng lóu yǐ， xiāng yè zhōng jīng sù luán fèng。\nzhì shì yōu rén mò yuàn jiē： gǔ lái cái dà nán wéi yòng。",
        translation: "诸葛亮庙前有一棵老柏树，枝干像青铜，树皮像石头，霜白的树皮溜滑，青黑的树色高高直插云天。云来时它的气息接上长长的巫峡，月亮出来时它的寒意通向皑皑雪山；大厦要是倾倒，正需要它这样的栋梁，重得万头牛也拉不动。自古以来才干太大的人往往难被任用，志士们不要空自怨叹啊。",
      }
      ],
    },
    {
      title: "观公孙大娘弟子舞剑器行 · 杜甫",
      art: 'tangshi-300:ch266',
      artPrompt: "古诗《观公孙大娘弟子舞剑器行》意境插画：昔有佳人公孙氏，一舞剑器动四方。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "昔有佳人公孙氏，一舞剑器动四方。\n观者如山色沮丧，天地为之久低昂。\n霍如羿射九日落，矫如群帝骖龙翔。\n来如雷霆收震怒，罢如江海凝清光。\n绛唇珠袖两寂寞，晚有弟子传芬芳。\n临颍美人在白帝，妙舞此曲神扬扬。\n与余问答既有以，感时抚事增惋伤。\n先帝侍女八千人，公孙剑器初第一。\n五十年间似反掌，风尘澒洞昏王室。\n梨园弟子散如烟，女乐余姿映寒日。\n金粟堆南木已拱，瞿唐石城草萧瑟。\n玳筵急管曲复终，乐极哀来月东出。\n老夫不知其所往，足茧荒山转愁疾。",
        pinyin: "xī yǒu jiā rén gōng sūn shì， yī wǔ jiàn qì dòng sì fāng。\nguān zhě rú shān sè jǔ sàng， tiān dì wèi zhī jiǔ dī áng。\nhuò rú yì shè jiǔ rì luò， jiǎo rú qún dì cān lóng xiáng。\nlái rú léi tíng shōu zhèn nù， bà rú jiāng hǎi níng qīng guāng。\njiàng chún zhū xiù liǎng jì mò， wǎn yǒu dì zǐ chuán fēn fāng。\nlín yǐng měi rén zài bái dì， miào wǔ cǐ qǔ shén yáng yáng。\nyǔ yú wèn dá jì yǒu yǐ， gǎn shí fǔ shì zēng wǎn shāng。\nxiān dì shì nǚ bā qiān rén， gōng sūn jiàn qì chū dì yī。\nwǔ shí nián jiān sì fǎn zhǎng， fēng chén hòng dòng hūn wáng shì。\nlí yuán dì zǐ sàn rú yān， nǚ lè yú zī yìng hán rì。\njīn sù duī nán mù yǐ gǒng， qú táng shí chéng cǎo xiāo sè。\ndài yán jí guǎn qǔ fù zhōng， lè jí āi lái yuè dōng chū。\nlǎo fū bù zhī qí suǒ wǎng， zú jiǎn huāng shān zhuǎn chóu jí。",
        translation: "从前有位美丽的公孙大娘，一舞起剑器就震动四方，观看的人围得像山，天地也随她的舞姿久久起伏；她的舞迅疾得像羿射落九个太阳，来时像雷霆发怒，停时像江海凝着一片清光。她晚年有弟子把舞艺传了下来，如今临颍美人在白帝城跳起这曲剑舞，还是神采飞扬。诗人同她问答之间，想起五十年间世事翻覆、歌舞艺人散如轻烟，乐极生悲，月亮已从东边升起，自己漂泊荒山，更添愁病。",
      }
      ],
    },
    {
      title: "韦讽录事宅观曹将军画马 · 杜甫",
      art: 'tangshi-300:ch267',
      artPrompt: "古诗《韦讽录事宅观曹将军画马》意境插画：国初已来画鞍马，神妙独数江都王。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "国初已来画鞍马，神妙独数江都王。\n将军得名三十载，人间又见真乘黄。\n曾貌先帝照夜白，龙池十日飞霹雳。\n内府殷红玛瑙盘，婕妤传诏才人索。\n盘赐将军拜舞归，轻纨细绮相追飞。\n贵戚权门得笔迹，始觉屏障生光辉。\n昔日太宗拳毛䯄，近时郭家狮子花。\n今之新图有二马，复令识者久叹嗟。\n此皆骑战一敌万，缟素漠漠开风沙。\n其余七匹亦殊绝，迥若寒空动烟雪。\n霜蹄蹴踏长楸间，马官厮养森成列。\n可怜九马争神骏，顾视清高气深稳。\n借问苦心爱者谁，后有韦讽前支遁。\n忆昔巡幸新丰宫，翠华拂天来向东。\n腾骧磊落三万匹，皆与此图筋骨同。\n自从献宝朝河宗，无复射蛟江水中。\n君不见金粟堆前松柏里，龙媒去尽鸟呼风。",
        pinyin: "guó chū yǐ lái huà ān mǎ， shén miào dú shù jiāng dōu wáng。\njiāng jūn dé míng sān shí zǎi， rén jiān yòu jiàn zhēn chéng huáng。\ncéng mào xiān dì zhào yè bái， lóng chí shí rì fēi pī lì。\nnèi fǔ yān hóng mǎ nǎo pán， jié yú chuán zhào cái rén suǒ。\npán cì jiāng jūn bài wǔ guī， qīng wán xì qǐ xiāng zhuī fēi。\nguì qī quán mén dé bǐ jì， shǐ jué píng zhàng shēng guāng huī。\nxī rì tài zōng quán máo 䯄， jìn shí guō jiā shī zi huā。\njīn zhī xīn tú yǒu èr mǎ， fù lìng shí zhě jiǔ tàn jiē。\ncǐ jiē qí zhàn yī dí wàn， gǎo sù mò mò kāi fēng shā。\nqí yú qī pǐ yì shū jué， jiǒng ruò hán kōng dòng yān xuě。\nshuāng tí cù tà cháng qiū jiān， mǎ guān sī yǎng sēn chéng liè。\nkě lián jiǔ mǎ zhēng shén jùn， gù shì qīng gāo qì shēn wěn。\njiè wèn kǔ xīn ài zhě shuí， hòu yǒu wéi fěng qián zhī dùn。\nyì xī xún xìng xīn fēng gōng， cuì huá fú tiān lái xiàng dōng。\nténg xiāng lěi luò sān wàn pǐ， jiē yǔ cǐ tú jīn gǔ tóng。\nzì cóng xiàn bǎo cháo hé zōng， wú fù shè jiāo jiāng shuǐ zhōng。\njūn bù jiàn jīn sù duī qián sōng bǎi lǐ， lóng méi qù jìn niǎo hū fēng。",
        translation: "开国以来画鞍马的高手里，最神妙的是曹将军，他画先帝的宝马照夜白，好像龙池上十日飞起霹雳，皇帝把玛瑙盘赏赐给他。如今这幅新画上九匹骏马个个神异，像寒空中翻动的烟雪，霜白的蹄子踏过长楸大道，养马的官员整齐排列。回想当年皇帝出行，三万匹骏马奔腾，都和这画上的一样雄壮；如今宝马去尽了，金粟堆前的松柏里，只有鸟儿叫着风。",
      }
      ],
    },
    {
      title: "丹青引赠曹霸将军 · 杜甫",
      art: 'tangshi-300:ch268',
      artPrompt: "古诗《丹青引赠曹霸将军》意境插画：将军魏武之子孙，于今为庶为清门。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "将军魏武之子孙，于今为庶为清门。\n英雄割据虽已矣，文采风流今尚存。\n学书初学卫夫人，但恨无过王右军。\n丹青不知老将至，富贵于我如浮云。\n开元之中常引见，承恩数上南薰殿。\n凌烟功臣少颜色，将军下笔开生面。\n良相头上进贤冠，猛将腰间大羽箭。\n褒公鄂公毛发动，英姿飒爽来酣战。\n先帝御马五花骢，画工如山貌不同。\n是日牵来赤墀下，迥立阊阖生长风。\n诏谓将军拂绢素，意匠惨澹经营中。\n斯须九重真龙出，一洗万古凡马空。\n玉花却在御榻上，榻上庭前屹相向。\n至尊含笑催赐金，圉人太仆皆惆怅。\n弟子韩干早入室，亦能画马穷殊相。\n干惟画肉不画骨，忍使骅骝气凋丧。\n将军画善盖有神，必逢佳士亦写真。\n即今漂泊干戈际，屡貌寻常行路人。\n途穷反遭俗眼白，世上未有如公贫。\n但看古来盛名下，终日坎壈缠其身。",
        pinyin: "jiāng jūn wèi wǔ zhī zǐ sūn， yú jīn wèi shù wèi qīng mén。\nyīng xióng gē jù suī yǐ yǐ， wén cǎi fēng liú jīn shàng cún。\nxué shū chū xué wèi fū rén， dàn hèn wú guò wáng yòu jūn。\ndān qīng bù zhī lǎo jiàng zhì， fù guì yú wǒ rú fú yún。\nkāi yuán zhī zhōng cháng yǐn jiàn， chéng ēn shù shàng nán xūn diàn。\nlíng yān gōng chén shǎo yán sè， jiāng jūn xià bǐ kāi shēng miàn。\nliáng xiāng tóu shàng jìn xián guān， měng jiàng yāo jiān dà yǔ jiàn。\nbāo gōng è gōng máo fà dòng， yīng zī sà shuǎng lái hān zhàn。\nxiān dì yù mǎ wǔ huā cōng， huà gōng rú shān mào bù tóng。\nshì rì qiān lái chì chí xià， jiǒng lì chāng hé shēng zhǎng fēng。\nzhào wèi jiāng jūn fú juàn sù， yì jiàng cǎn dàn jīng yíng zhōng。\nsī xū jiǔ chóng zhēn lóng chū， yī xǐ wàn gǔ fán mǎ kōng。\nyù huā què zài yù tà shàng， tà shàng tíng qián yì xiāng xiàng。\nzhì zūn hán xiào cuī cì jīn， yǔ rén tài pú jiē chóu chàng。\ndì zǐ hán gān zǎo rù shì， yì néng huà mǎ qióng shū xiāng。\ngān wéi huà ròu bù huà gǔ， rěn shǐ huá liú qì diāo sàng。\njiāng jūn huà shàn gài yǒu shén， bì féng jiā shì yì xiě zhēn。\njí jīn piāo bó gān gē jì， lǚ mào xún cháng xíng lù rén。\ntú qióng fǎn zāo sú yǎn bái， shì shàng wèi yǒu rú gōng pín。\ndàn kàn gǔ lái shèng míng xià， zhōng rì kǎn lǎn chán qí shēn。",
        translation: "曹将军是魏武帝曹操的子孙，如今成了平民寒门，可英雄的功业虽已过去，文采风流还留到今天。他专心画画，不知老之将至，把富贵看得像天上的浮云；重画凌烟阁功臣像，一下笔就让良相猛将眉目一新、毛发欲动，画御马五花骢，一转眼真马就从素绢上跃出，把万古的凡马都比空了。如今他在战乱里漂泊，常给寻常路人画像，穷途中反遭俗人白眼——看古来有大名声的人，哪有一生不坎坷的呢。",
      }
      ],
    },
    {
      title: "寄韩谏议 · 杜甫",
      art: 'tangshi-300:ch269',
      artPrompt: "古诗《寄韩谏议》意境插画：今我不乐思岳阳，身欲奋飞病在床。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "今我不乐思岳阳，身欲奋飞病在床。\n美人娟娟隔秋水，濯足洞庭望八荒。\n鸿飞冥冥日月白，青枫叶赤天雨霜。\n玉京群帝集北斗，或骑麒麟翳凤凰。\n芙蓉旌旗烟雾落，影动倒景摇潇湘。\n星宫之君醉琼浆，羽人稀少不在旁。\n似闻昨者赤松子，恐是汉代韩张良。\n昔随刘氏定长安，帷幄未改神惨伤。\n国家成败吾岂敢，色难腥腐餐枫香。\n周南留滞古所惜，南极老人应寿昌。\n美人胡为隔秋水，焉得置之贡玉堂。",
        pinyin: "jīn wǒ bù lè sī yuè yáng， shēn yù fèn fēi bìng zài chuáng。\nměi rén juān juān gé qiū shuǐ， zhuó zú dòng tíng wàng bā huāng。\nhóng fēi míng míng rì yuè bái， qīng fēng yè chì tiān yǔ shuāng。\nyù jīng qún dì jí běi dòu， huò qí qí lín yì fèng huáng。\nfú róng jīng qí yān wù luò， yǐng dòng dǎo jǐng yáo xiāo xiāng。\nxīng gōng zhī jūn zuì qióng jiāng， yǔ rén xī shǎo bù zài páng。\nsì wén zuó zhě chì sōng zǐ， kǒng shì hàn dài hán zhāng liáng。\nxī suí liú shì dìng cháng ān， wéi wò wèi gǎi shén cǎn shāng。\nguó jiā chéng bài wú qǐ gǎn， sè nán xīng fǔ cān fēng xiāng。\nzhōu nán liú zhì gǔ suǒ xī， nán jí lǎo rén yìng shòu chāng。\nměi rén hú wèi gé qiū shuǐ， yān dé zhì zhī gòng yù táng。",
        translation: "如今我心里不快活，想念在岳阳的朋友，人想振翅飞去，病却压在床上。那位美好的人隔在秋水那边，在洞庭湖边洗洗脚，遥望八方；鸿雁高飞在白日青天里，青枫叶红了，天上降下寒霜。听说他像汉代的张良一样为国立过大功，如今却宁愿远远避开污浊，像仙人一样餐食枫香——这样的人才，怎么能让他一直隔在秋水那边，不迎他回到朝廷里来呢。",
      }
      ],
    },
    {
      title: "夜归鹿门山歌 · 孟浩然",
      art: 'tangshi-300:ch270',
      artPrompt: "古诗《夜归鹿门山歌》意境插画：山寺钟鸣昼已昏，渔梁渡头争渡喧。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "山寺钟鸣昼已昏，渔梁渡头争渡喧。\n人随沙岸向江村，余亦乘舟归鹿门。\n鹿门月照开烟树，忽到庞公栖隐处。\n岩扉松径长寂寥，惟有幽人自来去。",
        pinyin: "shān sì zhōng míng zhòu yǐ hūn， yú liáng dù tóu zhēng dù xuān。\nrén suí shā àn xiàng jiāng cūn， yú yì chéng zhōu guī lù mén。\nlù mén yuè zhào kāi yān shù， hū dào páng gōng qī yǐn chù。\nyán fēi sōng jìng cháng jì liáo， wéi yǒu yōu rén zì lái qù。",
        translation: "山寺的钟声敲响，白天已经过去，渔梁渡口一片争着渡船的喧闹。人们沿着沙岸走回江边的村子，我也乘着小船回鹿门山。月光照开烟雾中的树影，不知不觉到了从前隐士住的地方，岩门和松间小路长年寂静，只有幽居的人独自来来去去。",
      }
      ],
    },
    {
      title: "渔翁 · 柳宗元",
      art: 'tangshi-300:ch271',
      artPrompt: "古诗《渔翁》意境插画：渔翁夜傍西岩宿，晓汲清湘燃楚竹。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "渔翁夜傍西岩宿，晓汲清湘燃楚竹。\n烟销日出不见人，欸乃一声山水绿。\n回看天际下中流，岩上无心云相逐。",
        pinyin: "yú wēng yè bàng xī yán sù， xiǎo jí qīng xiāng rán chǔ zhú。\nyān xiāo rì chū bù jiàn rén， ǎi nǎi yī shēng shān shuǐ lǜ。\nhuí kàn tiān jì xià zhōng liú， yán shàng wú xīn yún xiāng zhú。",
        translation: "渔翁夜里靠着西边的山岩睡觉，清早汲来清清的湘水，烧起楚竹做饭。太阳出来，烟雾散尽，却看不见人影，只听欸乃一声摇橹响，山水顿时一片青绿。回头望去，船已下到江心，岩石上只有白云无心地互相追逐。",
      }
      ],
    },
    {
      title: "登幽州台歌 · 陈子昂",
      art: 'tangshi-300:ch272',
      artPrompt: "古诗《登幽州台歌》意境插画：前不见古人，后不见来者。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "前不见古人，后不见来者。\n念天地之悠悠，独怆然而涕下。",
        pinyin: "qián bù jiàn gǔ rén， hòu bù jiàn lái zhě。\nniàn tiān dì zhī yōu yōu， dú chuàng rán ér tì xià。",
        translation: "往前望，望不见古时候的贤人；往后看，也看不见后来的贤人。想到天地这样辽阔、这样长久，我孤零零的一个人，忍不住悲伤得流下泪来。",
      }
      ],
    },
    {
      title: "石鼓歌 · 韩愈",
      art: 'tangshi-300:ch273',
      artPrompt: "古诗《石鼓歌》意境插画：张生手持石鼓文，劝我试作石鼓歌。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "张生手持石鼓文，劝我试作石鼓歌。\n少陵无人谪仙死，才薄将奈石鼓何。\n周纲凌迟四海沸，宣王愤起挥天戈。\n大开明堂受朝贺，诸侯剑佩鸣相磨。\n搜于岐阳骋雄俊，万里禽兽皆遮罗。\n镌功勒成告万世，凿石作鼓隳嵯峨。\n从臣才艺咸第一，拣选撰刻留山阿。\n雨淋日灸野火燎，鬼物守护烦㧑呵。\n公从何处得纸本，毫发尽备无差讹。\n辞严义密读难晓，字体不类隶与蝌。\n年深岂免有缺画，快剑斫断生蛟鼍。\n鸾翔凤翥众仙下，珊瑚碧树交枝柯。\n金绳铁索锁钮壮，古鼎跃水龙腾梭。\n陋儒编诗不收入，二雅褊迫无委蛇。\n孔子西行不到秦，掎摭星宿遗羲娥。\n嗟余好古生苦晚，对此涕泪双滂沱。\n忆昔初蒙博士征，其年始改称元和。\n故人从军在右辅，为我度量掘臼科。\n濯冠沐浴告祭酒，如此至宝存岂多。\n毡包席裹可立致，十鼓只载数骆驼。\n荐诸太庙比郜鼎，光价岂止百倍过。\n圣恩若许留太学，诸生讲解得切磋。\n观经鸿都尚填咽，坐见举国来奔波。\n剜苔剔藓露节角，安置妥帖平不颇。\n大厦深檐与盖覆，经历久远期无佗。\n中朝大官老于事，讵肯感激徒媕婀。\n牧童敲火牛砺角，谁复著手为摩挲。\n日销月铄就埋没，六年西顾空吟哦。\n羲之俗书趁姿媚，数纸尚可博白鹅。\n继周八代争战罢，无人收拾理则那。\n方今太平日无事，柄任儒术崇丘轲。\n安能以此尚论列，愿借辩口如悬河。\n石鼓之歌止于此，呜呼吾意其蹉跎。",
        pinyin: "zhāng shēng shǒu chí shí gǔ wén， quàn wǒ shì zuò shí gǔ gē。\nshǎo líng wú rén zhé xiān sǐ， cái báo jiāng nài shí gǔ hé。\nzhōu gāng líng chí sì hǎi fèi， xuān wáng fèn qǐ huī tiān gē。\ndà kāi míng táng shòu cháo hè， zhū hóu jiàn pèi míng xiāng mó。\nsōu yú qí yáng chěng xióng jùn， wàn lǐ qín shòu jiē zhē luó。\njuān gōng lè chéng gào wàn shì， záo shí zuò gǔ huī cuó é。\ncóng chén cái yì xián dì yī， jiǎn xuǎn zhuàn kè liú shān ā。\nyǔ lín rì jiǔ yě huǒ liáo， guǐ wù shǒu hù fán huī hē。\ngōng cóng hé chù dé zhǐ běn， háo fā jìn bèi wú chà é。\ncí yán yì mì dú nán xiǎo， zì tǐ bù lèi lì yǔ kē。\nnián shēn qǐ miǎn yǒu quē huà， kuài jiàn zhuó duàn shēng jiāo tuó。\nluán xiáng fèng zhù zhòng xiān xià， shān hú bì shù jiāo zhī kē。\njīn shéng tiě suǒ suǒ niǔ zhuàng， gǔ dǐng yuè shuǐ lóng téng suō。\nlòu rú biān shī bù shōu rù， èr yǎ biǎn pò wú wěi shé。\nkǒng zǐ xī xíng bù dào qín， jǐ zhí xīng xiù yí xī é。\njiē yú hǎo gǔ shēng kǔ wǎn， duì cǐ tì lèi shuāng pāng tuó。\nyì xī chū méng bó shì zhēng， qí nián shǐ gǎi chēng yuán hé。\ngù rén cóng jūn zài yòu fǔ， wèi wǒ dù liàng jué jiù kē。\nzhuó guān mù yù gào jì jiǔ， rú cǐ zhì bǎo cún qǐ duō。\nzhān bāo xí guǒ kě lì zhì， shí gǔ zhī zǎi shù luò tuó。\njiàn zhū tài miào bǐ gào dǐng， guāng jià qǐ zhǐ bǎi bèi guò。\nshèng ēn ruò xǔ liú tài xué， zhū shēng jiǎng jiě dé qiē cuō。\nguān jīng hóng dōu shàng tián yàn， zuò jiàn jǔ guó lái bēn bō。\nwān tái tī xiǎn lù jié jiǎo， ān zhì tuǒ tiē píng bù pō。\ndà shà shēn yán yǔ gài fù， jīng lì jiǔ yuǎn qī wú tuó。\nzhōng cháo dà guān lǎo yú shì， jù kěn gǎn jī tú ān ē。\nmù tóng qiāo huǒ niú lì jiǎo， shuí fù zhù shǒu wèi mó suō。\nrì xiāo yuè shuò jiù mái mò， liù nián xī gù kōng yín é。\nxī zhī sú shū chèn zī mèi， shù zhǐ shàng kě bó bái é。\njì zhōu bā dài zhēng zhàn bà， wú rén shōu shí lǐ zé nà。\nfāng jīn tài píng rì wú shì， bǐng rèn rú shù chóng qiū kē。\nān néng yǐ cǐ shàng lùn liè， yuàn jiè biàn kǒu rú xuán hé。\nshí gǔ zhī gē zhǐ yú cǐ， wū hū wú yì qí cuō tuó。",
        translation: "张生手里拿着石鼓文的拓本，劝我试写一首石鼓歌，可杜甫、李白都不在了，我才疏学浅，真拿这石鼓没办法。相传石鼓记着周宣王中兴时在岐阳打猎、刻石记功的事，字句庄严细密却很难读懂，年头久了笔画也有缺损；我生来爱好古物，只恨生得太晚，对着石鼓泪水直流。我建议把石鼓包好运进太学，让大家学习切磋，可是大官们不肯办理，石鼓任凭日晒雨淋、牧童敲火，渐渐销蚀埋没——唉，只怕我的心意终究要白白落空了。",
      }
      ],
    },
    {
      title: "山石 · 韩愈",
      art: 'tangshi-300:ch274',
      artPrompt: "古诗《山石》意境插画：山石荦确行径微，黄昏到寺蝙蝠飞。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "山石荦确行径微，黄昏到寺蝙蝠飞。\n升堂坐阶新雨足，芭蕉叶大栀子肥。\n僧言古壁佛画好，以火来照所见稀。\n铺床拂席置羹饭，疏粝亦足饱我饥。\n夜深静卧百虫绝，清月出岭光入扉。\n天明独去无道路，出入高下穷烟霏。\n山红涧碧纷烂漫，时见松枥皆十围。\n当流赤足踏涧石，水声激激风吹衣。\n人生如此自可乐，岂必局束为人鞿？(鞿 一作：靰)\n嗟哉吾党二三子，安得至老不更归。",
        pinyin: "shān shí luò què xíng jìng wēi， huáng hūn dào sì biān fú fēi。\nshēng táng zuò jiē xīn yǔ zú， bā jiāo yè dà zhī zǐ féi。\nsēng yán gǔ bì fó huà hǎo， yǐ huǒ lái zhào suǒ jiàn xī。\npū chuáng fú xí zhì gēng fàn， shū lì yì zú bǎo wǒ jī。\nyè shēn jìng wò bǎi chóng jué， qīng yuè chū lǐng guāng rù fēi。\ntiān míng dú qù wú dào lù， chū rù gāo xià qióng yān fēi。\nshān hóng jiàn bì fēn làn màn， shí jiàn sōng lì jiē shí wéi。\ndāng liú chì zú tà jiàn shí， shuǐ shēng jī jī fēng chuī yī。\nrén shēng rú cǐ zì kě lè， qǐ bì jú shù wèi rén jī？( jī yī zuò： wù)\njiē zāi wú dǎng èr sān zǐ， ān dé zhì lǎo bù gèng guī。",
        translation: "山石乱杂高低不平，小路细细的，黄昏时走到寺里，蝙蝠飞来飞去；新雨之后坐在台阶上，芭蕉叶子大大的，栀子花开得肥美，僧人说古壁上的佛画好，点起火把来看，果然稀罕。夜里静静躺着，百虫都停了声，清清的月亮出了山岭，光照进门来；天亮独自上路，山花红艳、涧水碧绿，光着脚踩着涧里的石头过水，水声激激，风吹动衣裳。人生这样自有无穷快乐，何必受拘束、被人拴住呢？",
      }
      ],
    },
    {
      title: "八月十五夜赠张功曹 · 韩愈",
      art: 'tangshi-300:ch275',
      artPrompt: "古诗《八月十五夜赠张功曹》意境插画：纤云四卷天无河，清风吹空月舒波。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "纤云四卷天无河，清风吹空月舒波。\n沙平水息声影绝，一杯相属君当歌。\n君歌声酸辞且苦，不能听终泪如雨。\n洞庭连天九疑高，蛟龙出没猩鼯号。\n十生九死到官所，幽居默默如藏逃。\n下床畏蛇食畏药，海气湿蛰薰腥臊。\n昨者州前捶大鼓，嗣皇继圣登夔皋。\n赦书一日行万里，罪从大辟皆除死。\n迁者追回流者还，涤瑕荡垢清朝班。\n州家申名使家抑，坎轲只得移荆蛮。\n判司卑官不堪说，未免捶楚尘埃间。\n同时辈流多上道，天路幽险难追攀。\n君歌且休听我歌，我歌今与君殊科。\n一年明月今宵多，人生由命非由他。\n有酒不饮奈明何。",
        pinyin: "xiān yún sì juàn tiān wú hé， qīng fēng chuī kōng yuè shū bō。\nshā píng shuǐ xī shēng yǐng jué， yī bēi xiāng shǔ jūn dāng gē。\njūn gē shēng suān cí qiě kǔ， bù néng tīng zhōng lèi rú yǔ。\ndòng tíng lián tiān jiǔ yí gāo， jiāo lóng chū mò xīng wú hào。\nshí shēng jiǔ sǐ dào guān suǒ， yōu jū mò mò rú cáng táo。\nxià chuáng wèi shé shí wèi yào， hǎi qì shī zhé xūn xīng sào。\nzuó zhě zhōu qián chuí dà gǔ， sì huáng jì shèng dēng kuí gāo。\nshè shū yī rì xíng wàn lǐ， zuì cóng dà pì jiē chú sǐ。\nqiān zhě zhuī huí liú zhě hái， dí xiá dàng gòu qīng cháo bān。\nzhōu jiā shēn míng shǐ jiā yì， kǎn kē zhī dé yí jīng mán。\npàn sī bēi guān bù kān shuō， wèi miǎn chuí chǔ chén āi jiān。\ntóng shí bèi liú duō shàng dào， tiān lù yōu xiǎn nán zhuī pān。\njūn gē qiě xiū tīng wǒ gē， wǒ gē jīn yǔ jūn shū kē。\nyī nián míng yuè jīn xiāo duō， rén shēng yóu mìng fēi yóu tā。\nyǒu jiǔ bù yǐn nài míng hé。",
        translation: "薄薄的云向四面收起，天上不见银河，清风吹着夜空，月亮洒开清波；沙平水静，人声人影都停了，我举杯请你唱支歌。你的歌声辛酸、言辞愁苦，我没听完就泪下如雨——你被贬到洞庭、九疑那样荒远的地方，九死一生才到任所，新皇登基大赦天下，你的名字却被压下，只能再迁往更远的荆蛮。你先别唱，听我唱：一年里的明月数今晚最好，人生自有命运安排，有酒不喝，怎么对得起这明月呢？",
      }
      ],
    },
    {
      title: "谒衡岳庙遂宿岳寺题门楼 · 韩愈",
      art: 'tangshi-300:ch276',
      artPrompt: "古诗《谒衡岳庙遂宿岳寺题门楼》意境插画：五岳祭秩皆三公，四方环镇嵩当中。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "五岳祭秩皆三公，四方环镇嵩当中。\n火维地荒足妖怪，天假神柄专其雄。\n喷云泄雾藏半腹，虽有绝顶谁能穷？\n我来正逢秋雨节，阴气晦昧无清风。\n潜心默祷若有应，岂非正直能感通！\n须臾静扫众峰出，仰见突兀撑青空。\n紫盖连延接天柱，石廪腾掷堆祝融。\n森然魄动下马拜，松柏一径趋灵宫。\n粉墙丹柱动光彩，鬼物图画填青红。\n升阶伛偻荐脯酒，欲以菲薄明其衷。\n庙令老人识神意，睢盱侦伺能鞠躬。\n手持杯珓导我掷，云此最吉余难同。\n窜逐蛮荒幸不死，衣食才足甘长终。\n侯王将相望久绝，神纵欲福难为功。\n夜投佛寺上高阁，星月掩映云曈昽。\n猿鸣钟动不知曙，杲杲寒日生于东。",
        pinyin: "wǔ yuè jì zhì jiē sān gōng， sì fāng huán zhèn sōng dāng zhōng。\nhuǒ wéi dì huāng zú yāo guài， tiān jiǎ shén bǐng zhuān qí xióng。\npēn yún xiè wù cáng bàn fù， suī yǒu jué dǐng shuí néng qióng？\nwǒ lái zhèng féng qiū yǔ jié， yīn qì huì mèi wú qīng fēng。\nqián xīn mò dǎo ruò yǒu yìng， qǐ fēi zhèng zhí néng gǎn tōng！\nxū yú jìng sǎo zhòng fēng chū， yǎng jiàn tū wù chēng qīng kōng。\nzǐ gài lián yán jiē tiān zhù， shí lǐn téng zhì duī zhù róng。\nsēn rán pò dòng xià mǎ bài， sōng bǎi yī jìng qū líng gōng。\nfěn qiáng dān zhù dòng guāng cǎi， guǐ wù tú huà tián qīng hóng。\nshēng jiē yǔ lǚ jiàn pú jiǔ， yù yǐ fěi bó míng qí zhōng。\nmiào lìng lǎo rén shí shén yì， suī xū zhēn sì néng jū gōng。\nshǒu chí bēi jiào dǎo wǒ zhì， yún cǐ zuì jí yú nán tóng。\ncuàn zhú mán huāng xìng bù sǐ， yī shí cái zú gān cháng zhōng。\nhóu wáng jiàng xiàng wàng jiǔ jué， shén zòng yù fú nán wéi gōng。\nyè tóu fó sì shàng gāo gé， xīng yuè yǎn yìng yún tóng lóng。\nyuán míng zhōng dòng bù zhī shǔ， gǎo gǎo hán rì shēng yú dōng。",
        translation: "五岳受祭祀的礼数都和三公一样，四面山岳环镇，嵩山正当中央；南岳地处荒远的南方，上天把神权交给它，让它独独称雄。我来正碰上秋雨时节，天色阴沉没有清风，诚心默祷竟像有了感应，一会儿云雾静静扫开，群峰齐齐露出，高高撑住青天；我惊讶得下马就拜，沿着松柏小路走进灵宫，献上菲薄的酒肉，庙里的老人教我掷杯珓占卜，说这一卦最吉利。我被贬到蛮荒之地幸而不死，有吃有穿就甘愿这样到老；夜里投宿佛寺高阁，猿啼钟响都不知天亮，明亮的寒日已从东方升起。",
      }
      ],
    },
    {
      title: "凉州词 · 王之涣",
      art: 'tangshi-300:ch277',
      artPrompt: "古诗《凉州词》意境插画：黄河远上白云间，一片孤城万仞山。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "黄河远上白云间，一片孤城万仞山。\n羌笛何须怨杨柳，春风不度玉门关。",
        pinyin: "huáng hé yuǎn shàng bái yún jiān， yī piàn gū chéng wàn rèn shān。\nqiāng dí hé xū yuàn yáng liǔ， chūn fēng bù dù yù mén guān。",
        translation: "黄河远远地伸上去，好像流进白云中间，万丈高山里坐落着一座孤零零的城。羌笛何必吹那哀怨的杨柳曲呢，春风本来就吹不到玉门关外啊。",
      }
      ],
    },
    {
      title: "出塞·秦时明月汉时关 · 王昌龄",
      art: 'tangshi-300:ch278',
      artPrompt: "古诗《出塞·秦时明月汉时关》意境插画：秦时明月汉时关，万里长征人未还。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "秦时明月汉时关，万里长征人未还。\n但使龙城飞将在，不教胡马度阴山。",
        pinyin: "qín shí míng yuè hàn shí guān， wàn lǐ cháng zhēng rén wèi hái。\ndàn shǐ lóng chéng fēi jiāng zài， bù jiào hú mǎ dù yīn shān。",
        translation: "明月还是秦汉时的明月，边关还是秦汉时的边关，远征万里的人们还没有回家。只要还有像飞将军那样英勇的将军守卫，就绝不让敌人的战马越过阴山。",
      }
      ],
    },
    {
      title: "塞上曲·蝉鸣空桑林 · 王昌龄",
      art: 'tangshi-300:ch279',
      artPrompt: "古诗《塞上曲·蝉鸣空桑林》意境插画：蝉鸣空桑林，八月萧关道。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "蝉鸣空桑林，八月萧关道。\n出塞入塞寒，处处黄芦草。\n从来幽并客，皆共尘沙老。\n莫学游侠儿，矜夸紫骝好。",
        pinyin: "chán míng kōng sāng lín， bā yuè xiāo guān dào。\nchū sài rù sāi hán， chù chù huáng lú cǎo。\ncóng lái yōu bìng kè， jiē gòng chén shā lǎo。\nmò xué yóu xiá ér， jīn kuā zǐ liú hǎo。",
        translation: "蝉在空空的桑林里鸣叫，八月里走的正是萧关道。出塞又入塞，一路寒凉，到处是枯黄的芦草。自古幽州并州的战士，都在风尘黄沙里慢慢变老；不要学那些游侠少年，只知道夸耀自己的紫骝骏马好。",
      }
      ],
    },
    {
      title: "塞下曲·饮马渡秋水 · 王昌龄",
      art: 'tangshi-300:ch280',
      artPrompt: "古诗《塞下曲·饮马渡秋水》意境插画：饮马渡秋水，水寒风似刀。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "饮马渡秋水，水寒风似刀。\n平沙日未没，黯黯见临洮。\n昔日长城战，咸言意气高。\n黄尘足今古，白骨乱蓬蒿。",
        pinyin: "yǐn mǎ dù qiū shuǐ， shuǐ hán fēng sì dāo。\npíng shā rì wèi méi， àn àn jiàn lín táo。\nxī rì cháng chéng zhàn， xián yán yì qì gāo。\nhuáng chén zú jīn gǔ， bái gǔ luàn péng hāo。",
        translation: "牵马饮水，渡过秋天的河水，水冰冷冰的，风刮在脸上像刀子一样。平沙上太阳还没落，昏昏沉沉地望得见远处的临洮。想当年长城边上的那场大战，人人都说将士们意气高昂；可从古到今这里黄尘漫漫，只见白骨乱蓬蓬地散在荒草里。",
      }
      ],
    },
    {
      title: "长信怨 · 王昌龄",
      art: 'tangshi-300:ch281',
      artPrompt: "古诗《长信怨》意境插画：金井梧桐秋叶黄，珠帘不卷夜来霜。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "金井梧桐秋叶黄，珠帘不卷夜来霜。\n熏笼玉枕无颜色，卧听南宫清漏长。\n高殿秋砧响夜阑，霜深犹忆御衣寒。\n银灯青琐裁缝歇，还向金城明主看。\n奉帚平明金殿开，暂将团扇共徘徊。\n玉颜不及寒鸦色，犹带昭阳日影来。\n真成薄命久寻思，梦见君王觉后疑。\n火照西宫知夜饮，分明复道奉恩时。\n长信宫中秋月明，昭阳殿下捣衣声。\n白露堂中细草迹，红罗帐里不胜情。",
        pinyin: "jīn jǐng wú tóng qiū yè huáng， zhū lián bù juàn yè lái shuāng。\nxūn lóng yù zhěn wú yán sè， wò tīng nán gōng qīng lòu cháng。\ngāo diàn qiū zhēn xiǎng yè lán， shuāng shēn yóu yì yù yī hán。\nyín dēng qīng suǒ cái feng xiē， hái xiàng jīn chéng míng zhǔ kàn。\nfèng zhǒu píng míng jīn diàn kāi， zàn jiāng tuán shàn gòng pái huái。\nyù yán bù jí hán yā sè， yóu dài zhāo yáng rì yǐng lái。\nzhēn chéng bó mìng jiǔ xún si， mèng jiàn jūn wáng jué hòu yí。\nhuǒ zhào xī gōng zhī yè yǐn， fēn míng fù dào fèng ēn shí。\ncháng xìn gōng zhōng qiū yuè míng， zhāo yáng diàn xià dǎo yī shēng。\nbái lù táng zhōng xì cǎo jì， hóng luó zhàng lǐ bù shèng qíng。",
        translation: "金井边梧桐的叶子秋天黄了，珠帘不卷，夜里降了霜，抱着熏笼、枕着玉枕什么兴致都没有，躺着听南宫里清冷的更漏声声长。天刚亮金殿开门，失宠的宫女拿着扫帚，又拿着团扇独自徘徊；她叹自己美丽的容颜还不如寒鸦——乌鸦身上还带着昭阳殿的日影飞来呢。真说自己命薄，夜里梦见君王，醒来还将信将疑；长信宫中秋月明亮，昭阳殿下传来捣衣声，她的心事说不完。",
      }
      ],
    },
    {
      title: "渭城曲 · 王维",
      art: 'tangshi-300:ch282',
      artPrompt: "古诗《渭城曲》意境插画：渭城朝雨浥轻尘，客舍青青柳色新。(一作：客舍依依杨柳春)——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "渭城朝雨浥轻尘，客舍青青柳色新。(一作：客舍依依杨柳春)\n劝君更尽一杯酒，西出阳关无故人。",
        pinyin: "wèi chéng cháo yǔ yì qīng chén， kè shè qīng qīng liǔ sè xīn。( yī zuò： kè shè yī yī yáng liǔ chūn)\nquàn jūn gèng jìn yī bēi jiǔ， xī chū yáng guān wú gù rén。",
        translation: "渭城早晨的细雨打湿了路上的尘土，客舍旁的柳枝被洗得青青的、格外新鲜。请你再喝尽这一杯酒吧，向西出了阳关，就再也见不到老朋友了。",
      }
      ],
    },
    {
      title: "秋夜曲 · 王维",
      art: 'tangshi-300:ch283',
      artPrompt: "古诗《秋夜曲》意境插画：桂魄初生秋露微，轻罗已薄未更衣。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "桂魄初生秋露微，轻罗已薄未更衣。\n银筝夜久殷勤弄，心怯空房不忍归。",
        pinyin: "guì pò chū shēng qiū lù wēi， qīng luó yǐ báo wèi gēng yī。\nyín zhēng yè jiǔ yīn qín nòng， xīn qiè kōng fáng bù rěn guī。",
        translation: "月亮刚升起来，秋夜的露水轻轻的，身上的轻罗衣已经嫌薄，也懒得再添换。夜深了，还在殷勤地拨弄银筝，只是心里害怕那空荡荡的房间，不忍心一个人回去。",
      }
      ],
    },
    {
      title: "洛阳女儿行 · 王维",
      art: 'tangshi-300:ch284',
      artPrompt: "古诗《洛阳女儿行》意境插画：洛阳女儿对门居，才可颜容十五余。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "洛阳女儿对门居，才可颜容十五余。\n良人玉勒乘骢马，侍女金盘脍鲤鱼。\n画阁朱楼尽相望，红桃绿柳垂檐向。\n罗帷送上七香车，宝扇迎归九华帐。\n狂夫富贵在青春，意气骄奢剧季伦。\n自怜碧玉亲教舞，不惜珊瑚持与人。\n春窗曙灭九微火，九微片片飞花琐。\n戏罢曾无理曲时，妆成祗是薰香坐。\n城中相识尽繁华，日夜经过赵李家。\n谁怜越女颜如玉，贫贱江头自浣纱。",
        pinyin: "luò yáng nǚ ér duì mén jū， cái kě yán róng shí wǔ yú。\nliáng rén yù lè chéng cōng mǎ， shì nǚ jīn pán kuài lǐ yú。\nhuà gé zhū lóu jìn xiāng wàng， hóng táo lǜ liǔ chuí yán xiàng。\nluó wéi sòng shàng qī xiāng chē， bǎo shàn yíng guī jiǔ huá zhàng。\nkuáng fū fù guì zài qīng chūn， yì qì jiāo shē jù jì lún。\nzì lián bì yù qīn jiào wǔ， bù xī shān hú chí yǔ rén。\nchūn chuāng shǔ miè jiǔ wēi huǒ， jiǔ wēi piàn piàn fēi huā suǒ。\nxì bà céng wú lǐ qǔ shí， zhuāng chéng zhī shì xūn xiāng zuò。\nchéng zhōng xiāng shí jìn fán huá， rì yè jīng guò zhào lǐ jiā。\nshuí lián yuè nǚ yán rú yù， pín jiàn jiāng tóu zì huàn shā。",
        translation: "洛阳有位姑娘住在对门，容颜正好十五六岁；丈夫骑着玉饰的骏马，侍女用金盘端上细切的鲤鱼，她出门有七香车，回家有宝扇迎进九华帐。丈夫年纪轻轻就大富大贵，骄奢得赛过古时最豪富的人家，亲手教美人跳舞，舍得把珊瑚宝物送人；她戏耍完了也不去练曲，妆成后只坐着熏香，来往的朋友全是城中最豪华的人家。可有谁怜惜那容颜如玉的越地姑娘，正贫贱地在江边独自洗纱呢。",
      }
      ],
    },
    {
      title: "老将行 · 王维",
      art: 'tangshi-300:ch285',
      artPrompt: "古诗《老将行》意境插画：少年十五二十时，步行夺得胡马骑。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "少年十五二十时，步行夺得胡马骑。\n射杀山中白额虎，肯数邺下黄须儿！\n一身转战三千里，一剑曾当百万师。\n汉兵奋迅如霹雳，虏骑崩腾畏蒺藜。\n卫青不败由天幸，李广无功缘数奇。\n自从弃置便衰朽，世事蹉跎成白首。\n昔时飞箭无全目，今日垂杨生左肘。\n路旁时卖故侯瓜，门前学种先生柳。\n苍茫古木连穷巷，寥落寒山对虚牖。\n誓令疏勒出飞泉，不似颍川空使酒。\n贺兰山下阵如云，羽檄交驰日夕闻。\n节使三河募年少，诏书五道出将军。\n试拂铁衣如雪色，聊持宝剑动星文。\n愿得燕弓射大将，耻令越甲鸣吾君。\n莫嫌旧日云中守，犹堪一战取功勋。",
        pinyin: "shào nián shí wǔ èr shí shí， bù xíng duó dé hú mǎ qí。\nshè shā shān zhōng bái é hǔ， kěn shù yè xià huáng xū ér！\nyī shēn zhuǎn zhàn sān qiān lǐ， yī jiàn céng dāng bǎi wàn shī。\nhàn bīng fèn xùn rú pī lì， lǔ qí bēng téng wèi jí lí。\nwèi qīng bù bài yóu tiān xìng， lǐ guǎng wú gōng yuán shù qí。\nzì cóng qì zhì biàn shuāi xiǔ， shì shì cuō tuó chéng bái shǒu。\nxī shí fēi jiàn wú quán mù， jīn rì chuí yáng shēng zuǒ zhǒu。\nlù páng shí mài gù hóu guā， mén qián xué zhǒng xiān shēng liǔ。\ncāng máng gǔ mù lián qióng xiàng， liáo luò hán shān duì xū yǒu。\nshì lìng shū lè chū fēi quán， bù sì yǐng chuān kōng shǐ jiǔ。\nhè lán shān xià zhèn rú yún， yǔ xí jiāo chí rì xī wén。\njié shǐ sān hé mù nián shào， zhào shū wǔ dào chū jiāng jūn。\nshì fú tiě yī rú xuě sè， liáo chí bǎo jiàn dòng xīng wén。\nyuàn dé yàn gōng shè dà jiàng， chǐ lìng yuè jiǎ míng wú jūn。\nmò xián jiù rì yún zhōng shǒu， yóu kān yī zhàn qǔ gōng xūn。",
        translation: "老将军十五二十岁的时候，能徒步夺得胡人的战马，射杀过山中白额虎，一身转战三千里，一杆剑挡过百万大军。后来被弃置不用，渐渐衰老白了头，在路边卖瓜、门前种柳，住进古木穷巷，对着寒山空窗。如今边境战阵如云、军书日夜奔驰，他把铁衣擦得雪亮，拿起宝剑说：别嫌我是旧日的云中太守，我还能够上战场再立一次功勋。",
      }
      ],
    },
    {
      title: "桃源行 · 王维",
      art: 'tangshi-300:ch286',
      artPrompt: "古诗《桃源行》意境插画：渔舟逐水爱山春，两岸桃花夹古津。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "渔舟逐水爱山春，两岸桃花夹古津。\n坐看红树不知远，行尽青溪不见人。\n山口潜行始隈隩，山开旷望旋平陆。\n遥看一处攒云树，近入千家散花竹。\n樵客初传汉姓名，居人未改秦衣服。\n居人共住武陵源，还从物外起田园。\n月明松下房栊静，日出云中鸡犬喧。\n惊闻俗客争来集，竞引还家问都邑。\n平明闾巷扫花开，薄暮渔樵乘水入。\n初因避地去人间，及至成仙遂不还。\n峡里谁知有人事，世中遥望空云山。\n不疑灵境难闻见，尘心未尽思乡县。\n出洞无论隔山水，辞家终拟长游衍。\n自谓经过旧不迷，安知峰壑今来变。\n当时只记入山深，青溪几度到云林。\n春来遍是桃花水，不辨仙源何处寻。",
        pinyin: "yú zhōu zhú shuǐ ài shān chūn， liǎng àn táo huā jiá gǔ jīn。\nzuò kàn hóng shù bù zhī yuǎn， xíng jìn qīng xī bù jiàn rén。\nshān kǒu qián xíng shǐ wēi yù， shān kāi kuàng wàng xuán píng lù。\nyáo kàn yī chù zǎn yún shù， jìn rù qiān jiā sàn huā zhú。\nqiáo kè chū chuán hàn xìng míng， jū rén wèi gǎi qín yī fu。\njū rén gòng zhù wǔ líng yuán， hái cóng wù wài qǐ tián yuán。\nyuè míng sōng xià fáng lóng jìng， rì chū yún zhōng jī quǎn xuān。\njīng wén sú kè zhēng lái jí， jìng yǐn hái jiā wèn dōu yì。\npíng míng lǘ xiàng sǎo huā kāi， bó mù yú qiáo chéng shuǐ rù。\nchū yīn bì dì qù rén jiān， jí zhì chéng xiān suì bù hái。\nxiá lǐ shuí zhī yǒu rén shì， shì zhōng yáo wàng kōng yún shān。\nbù yí líng jìng nán wén jiàn， chén xīn wèi jìn sī xiāng xiàn。\nchū dòng wú lùn gé shān shuǐ， cí jiā zhōng nǐ cháng yóu yǎn。\nzì wèi jīng guò jiù bù mí， ān zhī fēng hè jīn lái biàn。\ndāng shí zhī jì rù shān shēn， qīng xī jǐ dù dào yún lín。\nchūn lái biàn shì táo huā shuǐ， bù biàn xiān yuán hé chù xún。",
        translation: "渔船顺着溪水走，因为爱这山间春色，两岸桃花正夹着古老的渡口；坐看红树忘了路远，走尽青溪也不见人烟。从山口悄悄钻进去，眼前豁然开朗：远处云树丛聚，近处千家万户满种花竹，人们说着汉家的姓名、穿着秦朝的衣裳——原来是先人为躲避战乱来到这世外田园，后来成了神仙就再没回去。渔人住了一阵动了乡心，出洞后再来寻，青溪转过几度、云林依旧，春来满地桃花水，再也认不得仙源在哪儿了。",
      }
      ],
    },
    {
      title: "清平调·云想衣裳花想容 · 李白",
      art: 'tangshi-300:ch287',
      artPrompt: "古诗《清平调·云想衣裳花想容》意境插画：云想衣裳花想容，春风拂槛露华浓。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "云想衣裳花想容，春风拂槛露华浓。\n若非群玉山头见，会向瑶台月下逢。",
        pinyin: "yún xiǎng yī shang huā xiǎng róng， chūn fēng fú kǎn lù huá nóng。\nruò fēi qún yù shān tóu jiàn， huì xiàng yáo tái yuè xià féng。",
        translation: "看见云彩就想起她华美的衣裳，看见花儿就想起她娇美的容颜，春风拂过栏杆，露水把花色润得更加浓艳。这样美的人，不是在群玉山头见到，就一定是在瑶台月下才能相逢吧。",
      }
      ],
    },
    {
      title: "清平调·一枝红艳露凝香 · 李白",
      art: 'tangshi-300:ch288',
      artPrompt: "古诗《清平调·一枝红艳露凝香》意境插画：一枝红艳露凝香，云雨巫山枉断肠。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "一枝红艳露凝香，云雨巫山枉断肠。\n借问汉宫谁得似，可怜飞燕倚新妆。",
        pinyin: "yī zhī hóng yàn lù níng xiāng， yún yǔ wū shān wǎng duàn cháng。\njiè wèn hàn gōng shuí dé sì， kě lián fēi yàn yǐ xīn zhuāng。",
        translation: "一枝红艳艳的名花，凝着露水、带着香气；巫山云雨那样的旧事，也不过是白白叫人伤心罢了。请问汉宫里谁能和她相比？大概只有那刚刚倚着新妆的赵飞燕吧。",
      }
      ],
    },
    {
      title: "清平调·名花倾国两相欢 · 李白",
      art: 'tangshi-300:ch289',
      artPrompt: "古诗《清平调·名花倾国两相欢》意境插画：名花倾国两相欢，常得君王带笑看。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "名花倾国两相欢，常得君王带笑看。\n解释春风无限恨，沉香亭北倚栏杆。",
        pinyin: "míng huā qīng guó liǎng xiāng huān， cháng dé jūn wáng dài xiào kàn。\njiě shì chūn fēng wú xiàn hèn， chén xiāng tíng běi yǐ lán gān。",
        translation: "名贵的牡丹和倾国的美人互相辉映，两相欢悦，君王总是带着笑意欣赏。春风把心中的无限愁恨都消解了，君王正倚着沉香亭北的栏杆赏花呢。",
      }
      ],
    },
    {
      title: "行路难·金樽清酒斗十千 · 李白",
      art: 'tangshi-300:ch290',
      artPrompt: "古诗《行路难·金樽清酒斗十千》意境插画：金樽清酒斗十千，玉盘珍羞直万钱。(羞 通：馐；直 通 值)——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "金樽清酒斗十千，玉盘珍羞直万钱。(羞 通：馐；直 通 值)\n停杯投箸不能食，拔剑四顾心茫然。\n欲渡黄河冰塞川，将登太行雪满山。(雪满山 一作：雪暗天)\n闲来垂钓碧溪上，忽复乘舟梦日边。\n行路难！行路难！多歧路，今安在？\n长风破浪会有时，直挂云帆济沧海。",
        pinyin: "jīn zūn qīng jiǔ dòu shí qiān， yù pán zhēn xiū zhí wàn qián。( xiū tōng： xiū； zhí tōng zhí)\ntíng bēi tóu zhù bù néng shí， bá jiàn sì gù xīn máng rán。\nyù dù huáng hé bīng sāi chuān， jiāng dēng tài háng xuě mǎn shān。( xuě mǎn shān yī zuò： xuě àn tiān)\nxián lái chuí diào bì xī shàng， hū fù chéng zhōu mèng rì biān。\nxíng lù nán！ xíng lù nán！ duō qí lù， jīn ān zài？\ncháng fēng pò làng huì yǒu shí， zhí guà yún fān jì cāng hǎi。",
        translation: "金杯里的清酒一斗值十千钱，玉盘里的美味值一万钱，可我停下杯子、放下筷子吃不下去，拔出剑来四下张望，心里一片茫然。想渡黄河，冰雪堵住了河道；想登太行山，大雪铺满了山路。行路难啊，行路难！岔路这么多，我如今在哪里？总有一天要乘长风破万里浪，高高挂起云帆，横渡沧海。",
      }
      ],
    },
    {
      title: "行路难·大道如青天 · 李白",
      art: 'tangshi-300:ch291',
      artPrompt: "古诗《行路难·大道如青天》意境插画：大道如青天，我独不得出。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "大道如青天，我独不得出。\n羞逐长安社中儿，赤鸡白雉赌梨栗。\n弹剑作歌奏苦声，曳裾王门不称情。\n淮阴市井笑韩信，汉朝公卿忌贾生。\n君不见昔时燕家重郭隗，拥篲折节无嫌猜。\n剧辛乐毅感恩分，输肝剖胆效英才。\n昭王白骨萦蔓草，谁人更扫黄金台？\n行路难，归去来！",
        pinyin: "dà dào rú qīng tiān， wǒ dú bù dé chū。\nxiū zhú cháng ān shè zhōng ér， chì jī bái zhì dǔ lí lì。\ntán jiàn zuò gē zòu kǔ shēng， yè jū wáng mén bù chēng qíng。\nhuái yīn shì jǐng xiào hán xìn， hàn cháo gōng qīng jì jiǎ shēng。\njūn bù jiàn xī shí yàn jiā zhòng guō wěi， yōng huì zhé jié wú xián cāi。\njù xīn lè yì gǎn ēn fēn， shū gān pōu dǎn xiào yīng cái。\nzhāo wáng bái gǔ yíng màn cǎo， shuí rén gèng sǎo huáng jīn tái？\nxíng lù nán， guī qù lái！",
        translation: "大路宽广得像青天一样，偏偏只有我走不出去。我不愿跟着长安市井的少年们斗鸡赌梨栗，也不愿在王侯门下弹剑悲歌、看人脸色过日子。当年燕昭王那么敬重贤才，贤士们便剖心沥胆为他效力；如今昭王的白骨已被野草缠绕，还有谁去打扫黄金台？行路难啊，还是回去吧！",
      }
      ],
    },
    {
      title: "行路难·有耳莫洗颍川水 · 李白",
      art: 'tangshi-300:ch292',
      artPrompt: "古诗《行路难·有耳莫洗颍川水》意境插画：有耳莫洗颍川水，有口莫食首阳蕨。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "有耳莫洗颍川水，有口莫食首阳蕨。\n含光混世贵无名，何用孤高比云月？\n吾观自古贤达人，功成不退皆殒身。\n子胥既弃吴江上，屈原终投湘水滨。\n陆机雄才岂自保？李斯税驾苦不早。\n华亭鹤唳讵可闻？上蔡苍鹰何足道？\n君不见吴中张翰称达生，秋风忽忆江东行。\n且乐生前一杯酒，何须身后千载名？",
        pinyin: "yǒu ěr mò xǐ yǐng chuān shuǐ， yǒu kǒu mò shí shǒu yáng jué。\nhán guāng hùn shì guì wú míng， hé yòng gū gāo bǐ yún yuè？\nwú guān zì gǔ xián dá rén， gōng chéng bù tuì jiē yǔn shēn。\nzǐ xū jì qì wú jiāng shàng， qū yuán zhōng tóu xiāng shuǐ bīn。\nlù jī xióng cái qǐ zì bǎo？ lǐ sī shuì jià kǔ bù zǎo。\nhuá tíng hè lì jù kě wén？ shàng cài cāng yīng hé zú dào？\njūn bù jiàn wú zhōng zhāng hàn chēng dá shēng， qiū fēng hū yì jiāng dōng xíng。\nqiě lè shēng qián yī bēi jiǔ， hé xū shēn hòu qiān zǎi míng？",
        translation: "有耳朵不必去洗颍川的水，有嘴不必去吃首阳山的蕨菜，含着光混在人世间，贵在不求名声。我看自古贤能通达的人，成了功还不知道退下来的，都丢掉了性命。不如生前快快活活喝上一杯酒，何必在乎身后千年的名声呢？",
      }
      ],
    },
    {
      title: "将进酒 · 李白",
      art: 'tangshi-300:ch293',
      artPrompt: "古诗《将进酒》意境插画：君不见，黄河之水天上来，奔流到海不复回。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "君不见，黄河之水天上来，奔流到海不复回。\n君不见，高堂明镜悲白发，朝如青丝暮成雪。\n人生得意须尽欢，莫使金樽空对月。\n天生我材必有用，千金散尽还复来。\n烹羊宰牛且为乐，会须一饮三百杯。\n岑夫子，丹丘生，将进酒，杯莫停。\n与君歌一曲，请君为我倾耳听。(倾耳听 一作：侧耳听)\n钟鼓馔玉不足贵，但愿长醉不复醒。(不足贵 一作：何足贵；不复醒 一作：不愿醒/不用醒)\n古来圣贤皆寂寞，惟有饮者留其名。(古来 一作：自古；惟 通：唯)\n陈王昔时宴平乐，斗酒十千恣欢谑。\n主人何为言少钱，径须沽取对君酌。\n五花马，千金裘，呼儿将出换美酒，与尔同销万古愁。",
        pinyin: "jūn bù jiàn， huáng hé zhī shuǐ tiān shàng lái， bēn liú dào hǎi bù fù huí。\njūn bù jiàn， gāo táng míng jìng bēi bái fà， cháo rú qīng sī mù chéng xuě。\nrén shēng dé yì xū jìn huān， mò shǐ jīn zūn kōng duì yuè。\ntiān shēng wǒ cái bì yǒu yòng， qiān jīn sàn jìn hái fù lái。\npēng yáng zǎi niú qiě wèi lè， huì xū yī yǐn sān bǎi bēi。\ncén fū zǐ， dān qiū shēng， jiāng jìn jiǔ， bēi mò tíng。\nyǔ jūn gē yī qǔ， qǐng jūn wèi wǒ qīng ěr tīng。( qīng ěr tīng yī zuò： cè ěr tīng)\nzhōng gǔ zhuàn yù bù zú guì， dàn yuàn cháng zuì bù fù xǐng。( bù zú guì yī zuò： hé zú guì； bù fù xǐng yī zuò： bù yuàn xǐng/ bù yòng xǐng)\ngǔ lái shèng xián jiē jì mò， wéi yǒu yǐn zhě liú qí míng。( gǔ lái yī zuò： zì gǔ； wéi tōng： wéi)\nchén wáng xī shí yàn píng lè， dòu jiǔ shí qiān zì huān xuè。\nzhǔ rén hé wèi yán shǎo qián， jìng xū gū qǔ duì jūn zhuó。\nwǔ huā mǎ， qiān jīn qiú， hū ér jiāng chū huàn měi jiǔ， yǔ ěr tóng xiāo wàn gǔ chóu。",
        translation: "你没看见黄河的水从天上来，奔流到大海就再也不回头吗？你没看见高堂上的人对着明镜悲叹白发，早晨还黑如青丝，傍晚已白得像雪——人生得意就要尽情欢乐，莫让金杯空对着月亮，天生我这样的人才必定有用处，千金散尽了还会再回来。来来来，喝酒吧，杯子不要停！我为你们唱一曲：自古以来圣贤都寂寞无闻，只有会喝酒的人留下名声；主人说钱不够？只管买酒来对饮，叫孩子牵出五花马、拿出千金裘去换美酒，让我们一起消掉这万古的忧愁。",
      }
      ],
    },
    {
      title: "玉阶怨 · 李白",
      art: 'tangshi-300:ch294',
      artPrompt: "古诗《玉阶怨》意境插画：玉阶生白露，夜久侵罗袜。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "玉阶生白露，夜久侵罗袜。\n却下水晶帘，玲珑望秋月。(水晶 一作 水精)",
        pinyin: "yù jiē shēng bái lù， yè jiǔ qīn luó wà。\nquè xià shuǐ jīng lián， líng lóng wàng qiū yuè。( shuǐ jīng yī zuò shuǐ jīng)",
        translation: "玉石台阶上生起了白露，夜深了，露水把罗袜都浸湿了。回到屋里放下水晶帘子，还隔着帘子呆呆地望着秋天的明月。",
      }
      ],
    },
    {
      title: "长相思·其一 · 李白",
      art: 'tangshi-300:ch295',
      artPrompt: "古诗《长相思·其一》意境插画：长相思，在长安。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "长相思，在长安。\n络纬秋啼金井阑，微霜凄凄簟色寒。\n孤灯不明思欲绝，卷帷望月空长叹。\n美人如花隔云端！\n上有青冥之长天，下有渌水之波澜。\n天长路远魂飞苦，梦魂不到关山难。\n长相思，摧心肝！",
        pinyin: "zhǎng xiàng sī， zài cháng ān。\nluò wěi qiū tí jīn jǐng lán， wēi shuāng qī qī diàn sè hán。\ngū dēng bù míng sī yù jué， juàn wéi wàng yuè kōng cháng tàn。\nměi rén rú huā gé yún duān！\nshàng yǒu qīng míng zhī cháng tiān， xià yǒu lù shuǐ zhī bō lán。\ntiān cháng lù yuǎn hún fēi kǔ， mèng hún bù dào guān shān nán。\nzhǎng xiàng sī， cuī xīn gān！",
        translation: "长长的想念啊，想念的人在长安。秋虫在井边的栏杆上啼叫，微霜凄凄，竹席透着寒意；孤灯昏暗，想念得要断了气，卷起帘子望着月亮空自长叹。心上的人像花儿一样，却隔在遥远的云端：上有青冥的长天，下有绿水的波澜，天长路远，连梦魂也飞不过重重关山。长长的想念啊，真叫人心肝欲碎！",
      }
      ],
    },
    {
      title: "长相思·其二 · 李白",
      art: 'tangshi-300:ch296',
      artPrompt: "古诗《长相思·其二》意境插画：日色欲尽花含烟，月明欲素愁不眠。(欲素 一作：如素)——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "日色欲尽花含烟，月明欲素愁不眠。(欲素 一作：如素)\n赵瑟初停凤凰柱，蜀琴欲奏鸳鸯弦。\n此曲有意无人传，愿随春风寄燕然。\n忆君迢迢隔青天，昔日横波目，今作流泪泉。\n不信妾断肠，归来看取明镜前。(断肠 一作：肠断)",
        pinyin: "rì sè yù jìn huā hán yān， yuè míng yù sù chóu bù mián。( yù sù yī zuò： rú sù)\nzhào sè chū tíng fèng huáng zhù， shǔ qín yù zòu yuān yāng xián。\ncǐ qǔ yǒu yì wú rén chuán， yuàn suí chūn fēng jì yàn rán。\nyì jūn tiáo tiáo gé qīng tiān， xī rì héng bō mù， jīn zuò liú lèi quán。\nbù xìn qiè duàn cháng， guī lái kàn qǔ míng jìng qián。( duàn cháng yī zuò： cháng duàn)",
        translation: "太阳快要落了，花色朦胧像含着烟霭；明月皎洁，人却愁得睡不着觉。她刚弹完瑟，又想奏琴，可这一曲里的情意没有人传送，只愿它随着春风寄到遥远的燕然山。想念的人遥遥地隔在青天外，从前顾盼生辉的眼睛，如今变成了流不尽的泪水泉。若不信她想得肝肠寸断，等你回来，到明镜前看看她的脸就知道了。",
      }
      ],
    },
    {
      title: "长干行·其一 · 李白",
      art: 'tangshi-300:ch297',
      artPrompt: "古诗《长干行·其一》意境插画：妾发初覆额，折花门前剧。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "妾发初覆额，折花门前剧。\n郎骑竹马来，绕床弄青梅。\n同居长干里，两小无嫌猜，\n十四为君妇，羞颜未尝开。\n低头向暗壁，千唤不一回。\n十五始展眉，愿同尘与灰。\n常存抱柱信，岂上望夫台。\n十六君远行，瞿塘滟滪堆。\n五月不可触，猿声天上哀。(猿\n一作：鸣)\n门前迟行迹，一一生绿苔。\n苔深不能扫，落叶秋风早。\n八月蝴蝶来，双飞西园草。\n感此伤妾心，坐愁红颜老。\n早晚下三巴，预将书报家。\n相迎不道远，直至长风沙。",
        pinyin: "qiè fā chū fù é， zhé huā mén qián jù。\nláng qí zhú mǎ lái， rào chuáng nòng qīng méi。\ntóng jū cháng gān lǐ， liǎng xiǎo wú xián cāi，\nshí sì wèi jūn fù， xiū yán wèi cháng kāi。\ndī tóu xiàng àn bì， qiān huàn bù yī huí。\nshí wǔ shǐ zhǎn méi， yuàn tóng chén yǔ huī。\ncháng cún bào zhù xìn， qǐ shàng wàng fū tái。\nshí liù jūn yuǎn xíng， qú táng yàn yù duī。\nwǔ yuè bù kě chù， yuán shēng tiān shàng āi。( yuán\nyī zuò： míng)\nmén qián chí xíng jì， yī yī shēng lǜ tái。\ntái shēn bù néng sǎo， luò yè qiū fēng zǎo。\nbā yuè hú dié lái， shuāng fēi xī yuán cǎo。\ngǎn cǐ shāng qiè xīn， zuò chóu hóng yán lǎo。\nzǎo wǎn xià sān bā， yù jiāng shū bào jiā。\nxiāng yíng bù dào yuǎn， zhí zhì cháng fēng shā。",
        translation: "我的头发刚盖住额头的时候，常在门前折花玩耍，你骑着竹马过来，绕着井栏和我一起玩青梅，我们同住长干里，两小无猜。十四岁嫁给你做妻子，害羞得低下头朝着暗墙，千呼万唤也不肯回一次头；十五岁才舒展眉头，愿意和你同尘共灰，十六岁你出远门，要过瞿塘峡凶险的滟滪堆，五月里那地方碰不得，两岸猿声悲哀。你走后，门前留下的脚印一一生了青苔，苔深得扫不掉，秋风里叶子早早落了；八月蝴蝶双飞西园草地，看得我心里难过，只怕红颜就这样白白老去——你早晚会回家，请预先捎信来，不管多远我都去接你，一直接到长风沙。",
      }
      ],
    },
    {
      title: "蜀道难 · 李白",
      art: 'tangshi-300:ch298',
      artPrompt: "古诗《蜀道难》意境插画：噫吁嚱，危乎高哉！——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "噫吁嚱，危乎高哉！\n蜀道之难，难于上青天！\n蚕丛及鱼凫，开国何茫然！\n尔来四万八千岁，不与秦塞通人烟。\n西当太白有鸟道，可以横绝峨眉巅。\n地崩山摧壮士死，然后天梯石栈相钩连。\n上有六龙回日之高标，下有冲波逆折之回川。\n黄鹤之飞尚不得过，猿猱欲度愁攀援。(攀援 一作：攀缘)\n青泥何盘盘，百步九折萦岩峦。\n扪参历井仰胁息，以手抚膺坐长叹。\n问君西游何时还？畏途巉岩不可攀。\n但见悲鸟号古木，雄飞雌从绕林间。\n又闻子规啼夜月，愁空山。\n蜀道之难,难于上青天，使人听此凋朱颜！\n连峰去天不盈尺，枯松倒挂倚绝壁。\n飞湍瀑流争喧豗，砯崖转石万壑雷。\n其险也如此，嗟尔远道之人胡为乎来哉！(也如此 一作：也若此)\n剑阁峥嵘而崔嵬，一夫当关，万夫莫开。\n所守或匪亲，化为狼与豺。\n朝避猛虎，夕避长蛇；磨牙吮血，杀人如麻。\n锦城虽云乐，不如早还家。\n蜀道之难,难于上青天，侧身西望长咨嗟！",
        pinyin: "yī xū xī， wēi hū gāo zāi！\nshǔ dào zhī nán， nán yú shàng qīng tiān！\ncán cóng jí yú fú， kāi guó hé máng rán！\něr lái sì wàn bā qiān suì， bù yǔ qín sāi tōng rén yān。\nxī dāng tài bái yǒu niǎo dào， kě yǐ héng jué é méi diān。\ndì bēng shān cuī zhuàng shì sǐ， rán hòu tiān tī shí zhàn xiāng gōu lián。\nshàng yǒu liù lóng huí rì zhī gāo biāo， xià yǒu chōng bō nì zhé zhī huí chuān。\nhuáng hè zhī fēi shàng bù dé guò， yuán náo yù dù chóu pān yuán。( pān yuán yī zuò： pān yuán)\nqīng ní hé pán pán， bǎi bù jiǔ zhé yíng yán luán。\nmén shēn lì jǐng yǎng xié xī， yǐ shǒu fǔ yīng zuò cháng tàn。\nwèn jūn xī yóu hé shí hái？ wèi tú chán yán bù kě pān。\ndàn jiàn bēi niǎo hào gǔ mù， xióng fēi cí cóng rào lín jiān。\nyòu wén zǐ guī tí yè yuè， chóu kōng shān。\nshǔ dào zhī nán, nán yú shàng qīng tiān， shǐ rén tīng cǐ diāo zhū yán！\nlián fēng qù tiān bù yíng chǐ， kū sōng dǎo guà yǐ jué bì。\nfēi tuān pù liú zhēng xuān huī， pīng yá zhuǎn shí wàn hè léi。\nqí xiǎn yě rú cǐ， jiē ěr yuǎn dào zhī rén hú wèi hū lái zāi！( yě rú cǐ yī zuò： yě ruò cǐ)\njiàn gé zhēng róng ér cuī wéi， yī fū dāng guān， wàn fū mò kāi。\nsuǒ shǒu huò fěi qīn， huà wéi láng yǔ chái。\ncháo bì měng hǔ， xī bì cháng shé； mó yá shǔn xuè， shā rén rú má。\njǐn chéng suī yún lè， bù rú zǎo hái jiā。\nshǔ dào zhī nán, nán yú shàng qīng tiān， cè shēn xī wàng cháng zī jiē！",
        translation: "哎呀呀，多么高峻、多么险啊！蜀道难走，比上青天还难！山路上黄鹤飞不过去，猿猴想攀也发愁，悲鸟在古树间哀号，杜鹃在夜月下啼鸣，听得人脸色都变了；连绵的山峰离天不到一尺，枯松倒挂在绝壁上，飞泻的瀑布轰隆隆响，山石滚动像万壑雷鸣。剑阁高峻险要，一个人把守关口，一万个人也打不开；锦官城虽说快乐，也不如早早回家——我侧身向西遥望，忍不住长长叹息。",
      }
      ],
    },
    {
      title: "子夜吴歌·春歌 · 李白",
      art: 'tangshi-300:ch299',
      artPrompt: "古诗《子夜吴歌·春歌》意境插画：秦地罗敷女，采桑绿水边。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "秦地罗敷女，采桑绿水边。\n素手青条上，红妆白日鲜。\n蚕饥妾欲去，五马莫留连。",
        pinyin: "qín dì luó fū nǚ， cǎi sāng lǜ shuǐ biān。\nsù shǒu qīng tiáo shàng， hóng zhuāng bái rì xiān。\ncán jī qiè yù qù， wǔ mǎ mò liú lián。",
        translation: "秦地的姑娘罗敷在绿水边采桑，雪白的手抓着青青的枝条，红扑扑的脸在白日下格外鲜亮。蚕儿饿了，她急着要回去喂蚕，请贵人们的马车不要把她留住。",
      }
      ],
    },
    {
      title: "子夜吴歌·夏歌 · 李白",
      art: 'tangshi-300:ch300',
      artPrompt: "古诗《子夜吴歌·夏歌》意境插画：镜湖三百里，菡萏发荷花。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "镜湖三百里，菡萏发荷花。\n五月西施采，人看隘若耶。\n回舟不待月，归去越王家。",
        pinyin: "jìng hú sān bǎi lǐ， hàn dàn fā hé huā。\nwǔ yuè xī shī cǎi， rén kàn ài ruò yē。\nhuí zhōu bù dài yuè， guī qù yuè wáng jiā。",
        translation: "三百里镜湖上，荷花全都开放了。五月里西施在这里采莲，看她的人多得把若耶溪都挤窄了。她不等月亮出来就掉转船头回家去，被迎进了越王的宫殿。",
      }
      ],
    },
    {
      title: "子夜吴歌·秋歌 · 李白",
      art: 'tangshi-300:ch301',
      artPrompt: "古诗《子夜吴歌·秋歌》意境插画：长安一片月，万户捣衣声。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "长安一片月，万户捣衣声。\n秋风吹不尽，总是玉关情。\n何日平胡虏，良人罢远征。",
        pinyin: "cháng ān yī piàn yuè， wàn hù dǎo yī shēng。\nqiū fēng chuī bù jìn， zǒng shì yù guān qíng。\nhé rì píng hú lǔ， liáng rén bà yuǎn zhēng。",
        translation: "长安城上空挂着一片明月，千家万户传来捣衣的声音。秋风吹呀吹也吹不尽，声声都是思念玉门关外亲人的深情。什么时候才能平定胡虏，让丈夫结束远征回家来呢？",
      }
      ],
    },
    {
      title: "子夜吴歌·冬歌 · 李白",
      art: 'tangshi-300:ch302',
      artPrompt: "古诗《子夜吴歌·冬歌》意境插画：明朝驿使发，一夜絮征袍。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "明朝驿使发，一夜絮征袍。\n素手抽针冷，那堪把剪刀。\n裁缝寄远道，几日到临洮。",
        pinyin: "míng cháo yì shǐ fā， yī yè xù zhēng páo。\nsù shǒu chōu zhēn lěng， nà kān bǎ jiǎn dāo。\ncái feng jì yuǎn dào， jǐ rì dào lín táo。",
        translation: "明天早晨驿使就要出发，思妇连夜往丈夫的征袍里絮上绵絮。她的素手抽针都觉得冷，哪里还经得住再握冰凉的剪刀。裁好缝好寄向远方，要过几天才能送到临洮呢？",
      }
      ],
    },
    {
      title: "关山月 · 李白",
      art: 'tangshi-300:ch303',
      artPrompt: "古诗《关山月》意境插画：明月出天山，苍茫云海间。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "明月出天山，苍茫云海间。\n长风几万里，吹度玉门关。\n汉下白登道，胡窥青海湾。\n由来征战地，不见有人还。\n戍客望边邑，思归多苦颜。(望边邑 一作：望边色)\n高楼当此夜，叹息未应闲。",
        pinyin: "míng yuè chū tiān shān， cāng máng yún hǎi jiān。\ncháng fēng jǐ wàn lǐ， chuī dù yù mén guān。\nhàn xià bái dēng dào， hú kuī qīng hǎi wān。\nyóu lái zhēng zhàn dì， bù jiàn yǒu rén hái。\nshù kè wàng biān yì， sī guī duō kǔ yán。( wàng biān yì yī zuò： wàng biān sè)\ngāo lóu dāng cǐ yè， tàn xī wèi yìng xián。",
        translation: "明月从天山上升起来，出没在苍茫的云海之间；长风从几万里外吹来，吹过了玉门关。这些征战的地方，从来很少有人能活着回家。守边的将士望着边城，个个愁容满面思念家乡；今夜家中高楼上的妻子，叹息也一定不会停歇。",
      }
      ],
    },
    {
      title: "江南曲 · 李益",
      art: 'tangshi-300:ch304',
      artPrompt: "古诗《江南曲》意境插画：嫁得瞿塘贾，朝朝误妾期。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "嫁得瞿塘贾，朝朝误妾期。\n早知潮有信，嫁与弄潮儿。",
        pinyin: "jià dé qú táng jiǎ， zhāo zhāo wù qiè qī。\nzǎo zhī cháo yǒu xìn， jià yǔ nòng cháo ér。",
        translation: "嫁给了一个在瞿塘做买卖的商人，他天天耽误我盼望的归期。早知道潮水涨落那样守信用，真该嫁给弄潮的少年郎。",
      }
      ],
    },
    {
      title: "古从军行 · 李颀",
      art: 'tangshi-300:ch305',
      artPrompt: "古诗《古从军行》意境插画：白日登山望烽火，黄昏饮马傍交河。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "白日登山望烽火，黄昏饮马傍交河。\n行人刁斗风沙暗，公主琵琶幽怨多。\n野云万里无城郭，雨雪纷纷连大漠。\n胡雁哀鸣夜夜飞，胡儿眼泪双双落。\n闻道玉门犹被遮，应将性命逐轻车。\n年年战骨埋荒外，空见蒲桃入汉家。",
        pinyin: "bái rì dēng shān wàng fēng huǒ， huáng hūn yǐn mǎ bàng jiāo hé。\nxíng rén diāo dòu fēng shā àn， gōng zhǔ pí pa yōu yuàn duō。\nyě yún wàn lǐ wú chéng guō， yǔ xuě fēn fēn lián dà mò。\nhú yàn āi míng yè yè fēi， hú ér yǎn lèi shuāng shuāng luò。\nwén dào yù mén yóu bèi zhē， yìng jiāng xìng mìng zhú qīng chē。\nnián nián zhàn gǔ mái huāng wài， kōng jiàn pú táo rù hàn jiā。",
        translation: "白天士兵登上山头瞭望烽火，黄昏时到交河边给战马饮水，昏暗的风沙里传来打更声，还有公主琵琶弹出的许多幽怨。荒野万里没有城郭，雨雪纷纷连着大沙漠，胡地的雁儿夜夜哀叫着飞，胡人的孩子成双成对落泪；听说玉门关还被拦着不让回，大家只好拼着性命跟随战车出征。年年的战士尸骨埋在荒野之外，换来的葡萄却只是送进了汉家宫廷。",
      }
      ],
    },
    {
      title: "哀王孙 · 杜甫",
      art: 'tangshi-300:ch306',
      artPrompt: "古诗《哀王孙》意境插画：长安城头头白乌，夜飞延秋门上呼。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "长安城头头白乌，夜飞延秋门上呼。\n又向人家啄大屋，屋底达官走避胡。\n金鞭断折九马死，骨肉不得同驰驱。\n腰下宝玦青珊瑚，可怜王孙泣路隅。\n问之不肯道姓名，但道困苦乞为奴。\n已经百日窜荆棘，身上无有完肌肤。\n高帝子孙尽隆准，龙种自与常人殊。\n豺狼在邑龙在野，王孙善保千金躯。\n不敢长语临交衢，且为王孙立斯须。\n昨夜东风吹血腥，东来橐驼满旧都。\n朔方健儿好身手，昔何勇锐今何愚。\n窃闻天子已传位，圣德北服南单于。\n花门剺面请雪耻，慎勿出口他人狙。\n哀哉王孙慎勿疏，五陵佳气无时无。",
        pinyin: "cháng ān chéng tóu tóu bái wū， yè fēi yán qiū mén shàng hū。\nyòu xiàng rén jiā zhuó dà wū， wū dǐ dá guān zǒu bì hú。\njīn biān duàn zhé jiǔ mǎ sǐ， gǔ ròu bù dé tóng chí qū。\nyāo xià bǎo jué qīng shān hú， kě lián wáng sūn qì lù yú。\nwèn zhī bù kěn dào xìng míng， dàn dào kùn kǔ qǐ wèi nú。\nyǐ jīng bǎi rì cuàn jīng jí， shēn shàng wú yǒu wán jī fū。\ngāo dì zǐ sūn jìn lóng zhǔn， lóng zhǒng zì yǔ cháng rén shū。\nchái láng zài yì lóng zài yě， wáng sūn shàn bǎo qiān jīn qū。\nbù gǎn cháng yǔ lín jiāo qú， qiě wèi wáng sūn lì sī xū。\nzuó yè dōng fēng chuī xuè xīng， dōng lái tuó tuó mǎn jiù dōu。\nshuò fāng jiàn ér hǎo shēn shǒu， xī hé yǒng ruì jīn hé yú。\nqiè wén tiān zǐ yǐ chuán wèi， shèng dé běi fú nán chán yú。\nhuā mén lí miàn qǐng xuě chǐ， shèn wù chū kǒu tā rén jū。\nāi zāi wáng sūn shèn wù shū， wǔ líng jiā qì wú shí wú。",
        translation: "长安城头的白头乌鸦夜里飞到延秋门上啼叫，又飞到人家的大宅前啄食，原来宅里的达官贵人都逃躲避难去了。一位可怜的王孙在路边哭泣，问他不肯说出姓名，只说自己困苦得愿意给人做奴仆，在荆棘丛里逃亡已经一百多天，身上没有一块完好的皮肤。诗人悄悄叮嘱他：天子已经传位，各方纷纷请战雪耻，千万小心保重，帝王的佳气什么时候都不会消失。",
      }
      ],
    },
    {
      title: "兵车行 · 杜甫",
      art: 'tangshi-300:ch307',
      artPrompt: "古诗《兵车行》意境插画：车辚辚，马萧萧，行人弓箭各在腰。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "车辚辚，马萧萧，行人弓箭各在腰。\n耶娘妻子走相送，尘埃不见咸阳桥。(\n娘 一作：“爷”)\n牵衣顿足拦道哭，哭声直上干云霄。\n道旁过者问行人，行人但云点行频。\n或从十五北防河，便至四十西营田。\n去时里正与裹头，归来头白还戍边。\n边庭流血成海水，武皇开边意未已。\n君不闻，汉家山东二百州，千村万落生荆杞。\n纵有健妇把锄犁，禾生陇亩无东西。\n况复秦兵耐苦战，被驱不异犬与鸡。\n长者虽有问，役夫敢申恨？\n且如今年冬，未休关西卒。\n县官急索租，租税从何出？\n信知生男恶，反是生女好。\n生女犹得嫁比邻，生男埋没随百草。\n君不见，青海头，古来白骨无人收。\n新鬼烦冤旧鬼哭，天阴雨湿声啾啾！",
        pinyin: "chē lín lín， mǎ xiāo xiāo， xíng rén gōng jiàn gè zài yāo。\nyē niáng qī zǐ zǒu xiāng sòng， chén āi bù jiàn xián yáng qiáo。(\nniáng yī zuò：“ yé”)\nqiān yī dùn zú lán dào kū， kū shēng zhí shàng gān yún xiāo。\ndào páng guò zhě wèn xíng rén， xíng rén dàn yún diǎn xíng pín。\nhuò cóng shí wǔ běi fáng hé， biàn zhì sì shí xī yíng tián。\nqù shí lǐ zhèng yǔ guǒ tóu， guī lái tou bái hái shù biān。\nbiān tíng liú xuè chéng hǎi shuǐ， wǔ huáng kāi biān yì wèi yǐ。\njūn bù wén， hàn jiā shān dōng èr bǎi zhōu， qiān cūn wàn luò shēng jīng qǐ。\nzòng yǒu jiàn fù bǎ chú lí， hé shēng lǒng mǔ wú dōng xī。\nkuàng fù qín bīng nài kǔ zhàn， bèi qū bù yì quǎn yǔ jī。\nzhǎng zhě suī yǒu wèn， yì fū gǎn shēn hèn？\nqiě rú jīn nián dōng， wèi xiū guān xī zú。\nxiàn guān jí suǒ zū， zū shuì cóng hé chū？\nxìn zhī shēng nán è， fǎn shì shēng nǚ hǎo。\nshēng nǚ yóu dé jià bǐ lín， shēng nán mái mò suí bǎi cǎo。\njūn bù jiàn， qīng hǎi tóu， gǔ lái bái gǔ wú rén shōu。\nxīn guǐ fán yuān jiù guǐ kū， tiān yīn yǔ shī shēng jiū jiū！",
        translation: "战车隆隆响，战马萧萧叫，出征的人把弓箭挂在腰上，爹娘妻子儿女跑来送行，扬起的灰尘遮住了咸阳桥；拉住衣服、跺着脚拦在道上痛哭，哭声直冲云霄。征人诉说被一次次点名出征：有人十五岁就去北方驻防，四十岁还在西边屯田，边关流血像海水一样多，可皇上开拓边疆的心思还不停止；家乡千村万落长满荆棘，官府又急着催租，租税从哪里出呢？人们这才觉得生男不如生女好，男孩大多战死埋进荒草；青海头上自古白骨没人收，天阴下雨时新鬼旧鬼哭声啾啾。",
      }
      ],
    },
    {
      title: "丽人行 · 杜甫",
      art: 'tangshi-300:ch308',
      artPrompt: "古诗《丽人行》意境插画：三月三日天气新，长安水边多丽人。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "三月三日天气新，长安水边多丽人。\n态浓意远淑且真，肌理细腻骨肉匀。\n绣罗衣裳照暮春，蹙金孔雀银麒麟。\n头上何所有？翠微盍叶垂鬓唇。\n背后何所见？珠压腰衱稳称身。\n就中云幕椒房亲，赐名大国虢与秦。\n紫驼之峰出翠釜，水精之盘行素鳞。\n犀箸厌饫久未下，鸾刀缕切空纷纶。\n黄门飞鞚不动尘，御厨络绎送八珍。\n箫鼓哀吟感鬼神，宾从杂遝实要津。\n后来鞍马何逡巡，当轩下马入锦茵。\n杨花雪落覆白苹，青鸟飞去衔红巾。\n炙手可热势绝伦，慎莫近前丞相嗔！",
        pinyin: "sān yuè sān rì tiān qì xīn， cháng ān shuǐ biān duō lì rén。\ntài nóng yì yuǎn shū qiě zhēn， jī lǐ xì nì gǔ ròu yún。\nxiù luó yī shang zhào mù chūn， cù jīn kǒng què yín qí lín。\ntóu shàng hé suǒ yǒu？ cuì wēi hé yè chuí bìn chún。\nbèi hòu hé suǒ jiàn？ zhū yā yāo jié wěn chēng shēn。\njiù zhōng yún mù jiāo fáng qīn， cì míng dà guó guó yǔ qín。\nzǐ tuó zhī fēng chū cuì fǔ， shuǐ jīng zhī pán xíng sù lín。\nxī zhù yàn yù jiǔ wèi xià， luán dāo lǚ qiè kōng fēn lún。\nhuáng mén fēi kòng bù dòng chén， yù chú luò yì sòng bā zhēn。\nxiāo gǔ āi yín gǎn guǐ shén， bīn cóng zá tà shí yào jīn。\nhòu lái ān mǎ hé qūn xún， dāng xuān xià mǎ rù jǐn yīn。\nyáng huā xuě luò fù bái píng， qīng niǎo fēi qù xián hóng jīn。\nzhì shǒu kě rè shì jué lún， shèn mò jìn qián chéng xiàng chēn！",
        translation: "三月初三天气清新，长安曲江水边有许多美丽的女子，她们神态娴雅端庄，肌肤细腻，绣着金孔雀银麒麟的罗衣映着暮春的阳光。杨家的贵夫人设下华美的筵席，翠锅里炖着驼峰，水晶盘里盛着白鱼，吃腻了的筷子久久没有动，御厨还在络绎不绝地送来山珍海味。最后来的丞相骑马慢慢走近，直到轩前才下马踏进锦毯，他权势大得烫手，千万别走近去惹他生气。",
      }
      ],
    },
    {
      title: "哀江头 · 杜甫",
      art: 'tangshi-300:ch309',
      artPrompt: "古诗《哀江头》意境插画：少陵野老吞声哭，春日潜行曲江曲。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "少陵野老吞声哭，春日潜行曲江曲。\n江头宫殿锁千门，细柳新蒲为谁绿？\n忆昔霓旌下南苑，苑中万物生颜色。\n昭阳殿里第一人，同辇随君侍君侧。\n辇前才人带弓箭，白马嚼啮黄金勒。\n翻身向天仰射云，一笑正坠双飞翼。\n明眸皓齿今何在？血污游魂归不得。\n清渭东流剑阁深，去住彼此无消息。\n人生有情泪沾臆，江水江花岂终极！\n黄昏胡骑尘满城，欲往城南望城北。",
        pinyin: "shǎo líng yě lǎo tūn shēng kū， chūn rì qián xíng qǔ jiāng qǔ。\njiāng tóu gōng diàn suǒ qiān mén， xì liǔ xīn pú wèi shuí lǜ？\nyì xī ní jīng xià nán yuàn， yuàn zhōng wàn wù shēng yán sè。\nzhāo yáng diàn lǐ dì yī rén， tóng niǎn suí jūn shì jūn cè。\nniǎn qián cái rén dài gōng jiàn， bái mǎ jiáo niè huáng jīn lè。\nfān shēn xiàng tiān yǎng shè yún， yī xiào zhèng zhuì shuāng fēi yì。\nmíng móu hào chǐ jīn hé zài？ xuè wū yóu hún guī bù dé。\nqīng wèi dōng liú jiàn gé shēn， qù zhù bǐ cǐ wú xiāo xī。\nrén shēng yǒu qíng lèi zhān yì， jiāng shuǐ jiāng huā qǐ zhōng jí！\nhuáng hūn hú qí chén mǎn chéng， yù wǎng chéng nán wàng chéng běi。",
        translation: "少陵的老人忍着不敢放声哭，在春天里悄悄走过曲江曲折的岸边，江头的宫殿千门紧锁，细柳新蒲不知为谁变绿。回想当年皇家仪仗开进南苑，苑里万物都添了光彩，昭阳殿里最受宠的妃子陪着皇帝同车出行，才人翻身向天一箭射落双飞的鸟儿。如今明眸皓齿的人在哪里，只留下含冤的游魂回不了家；人有情，眼泪沾湿了衣襟，江水江花却流不尽开不败，黄昏时胡人骑兵扬起满城尘土，我要去城南，却望向了城北。",
      }
      ],
    },
    {
      title: "金缕衣 · 佚名",
      art: 'tangshi-300:ch310',
      artPrompt: "古诗《金缕衣》意境插画：劝君莫惜金缕衣，劝君惜取少年时。(惜取 一作：须取)——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "劝君莫惜金缕衣，劝君惜取少年时。(惜取 一作：须取)\n花开堪折直须折，莫待无花空折枝。(花开 一作：有花)",
        pinyin: "quàn jūn mò xī jīn lǚ yī， quàn jūn xī qǔ shào nián shí。( xī qǔ yī zuò： xū qǔ)\nhuā kāi kān zhé zhí xū zhé， mò dài wú huā kōng zhé zhī。( huā kāi yī zuò： yǒu huā)",
        translation: "我劝你不要可惜那金线织的衣裳，要爱惜少年时的光阴。花开正好该摘就去摘，不要等到花谢了，只对着空空的枝条。",
      }
      ],
    },
    {
      title: "独不见 · 沈佺期",
      art: 'tangshi-300:ch311',
      artPrompt: "古诗《独不见》意境插画：卢家少妇郁金堂，海燕双栖玳瑁梁。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "卢家少妇郁金堂，海燕双栖玳瑁梁。\n九月寒砧催木叶，十年征戍忆辽阳。\n白狼河北音书断，丹凤城南秋夜长。\n谁谓含愁独不见，更教明月照流黄。",
        pinyin: "lú jiā shào fù yù jīn táng， hǎi yàn shuāng qī dài mào liáng。\njiǔ yuè hán zhēn cuī mù yè， shí nián zhēng shù yì liáo yáng。\nbái láng hé běi yīn shū duàn， dān fèng chéng nán qiū yè cháng。\nshuí wèi hán chóu dú bù jiàn， gèng jiào míng yuè zhào liú huáng。",
        translation: "卢家少妇住在熏过郁金香的屋子里，海燕双双栖在玳瑁装饰的房梁上。九月里寒凉的捣衣声催着树叶落，她思念远戍辽阳十年的丈夫；白狼河北边音信全断，城南的秋夜又特别长。谁说满腹愁苦见不到亲人不难过，偏偏那明月还照着她织布的帷帐。",
      }
      ],
    },
    {
      title: "烈女操 · 孟郊",
      art: 'tangshi-300:ch312',
      artPrompt: "古诗《烈女操》意境插画：梧桐相待老，鸳鸯会双死。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "梧桐相待老，鸳鸯会双死。\n贞女贵殉夫，舍生亦如此。\n波澜誓不起，妾心古井水。(古井水 一作：井中水)",
        pinyin: "wú tóng xiāng dài lǎo， yuān yāng huì shuāng sǐ。\nzhēn nǚ guì xùn fū， shè shēng yì rú cǐ。\nbō lán shì bù qǐ， qiè xīn gǔ jǐng shuǐ。( gǔ jǐng shuǐ yī zuò： jǐng zhōng shuǐ)",
        translation: "梧桐树相伴着一起到老，鸳鸯鸟总会成双成对地死去。贞烈的女子看重以死随夫，连舍弃生命也心甘情愿。心里发誓再不起波澜，就像古井里的水一样平静。",
      }
      ],
    },
    {
      title: "游子吟 · 孟郊",
      art: 'tangshi-300:ch313',
      artPrompt: "古诗《游子吟》意境插画：慈母手中线，游子身上衣。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "慈母手中线，游子身上衣。\n临行密密缝，意恐迟迟归。\n谁言寸草心，报得三春晖。",
        pinyin: "cí mǔ shǒu zhōng xiàn， yóu zǐ shēn shàng yī。\nlín xíng mì mì fèng， yì kǒng chí chí guī。\nshuí yán cùn cǎo xīn， bào dé sān chūn huī。",
        translation: "慈爱的母亲手里拿着针线，缝着孩子远行要穿的衣裳。临走时缝得又密又结实，心里怕孩子迟迟回不来。谁说小草那样微小的心意，能报答得了春天太阳般的母爱呢？",
      }
      ],
    },
    {
      title: "燕歌行 · 高适",
      art: 'tangshi-300:ch314',
      artPrompt: "古诗《燕歌行》意境插画：汉家烟尘在东北，汉将辞家破残贼。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "汉家烟尘在东北，汉将辞家破残贼。\n男儿本自重横行，天子非常赐颜色。\n摐金伐鼓下榆关，旌旆逶迤碣石间。\n校尉羽书飞瀚海，单于猎火照狼山。\n山川萧条极边土，胡骑凭陵杂风雨。\n战士军前半死生，美人帐下犹歌舞。\n大漠穷秋塞草腓，孤城落日斗兵稀。\n身当恩遇恒轻敌，力尽关山未解围。\n铁衣远戍辛勤久，玉箸应啼别离后。\n少妇城南欲断肠，征人蓟北空回首。\n边庭飘飖那可度，绝域苍茫更何有。\n杀气三时作阵云，寒声一夜传刁斗。\n相看白刃血纷纷，死节从来岂顾勋。\n君不见沙场征战苦，至今犹忆李将军。",
        pinyin: "hàn jiā yān chén zài dōng běi， hàn jiāng cí jiā pò cán zéi。\nnán ér běn zì zhòng héng xíng， tiān zǐ fēi cháng cì yán sè。\nchuāng jīn fá gǔ xià yú guān， jīng pèi wēi yí jié shí jiān。\nxiào wèi yǔ shū fēi hàn hǎi， chán yú liè huǒ zhào láng shān。\nshān chuān xiāo tiáo jí biān tǔ， hú qí píng líng zá fēng yǔ。\nzhàn shì jūn qián bàn sǐ shēng， měi rén zhàng xià yóu gē wǔ。\ndà mò qióng qiū sāi cǎo féi， gū chéng luò rì dòu bīng xī。\nshēn dāng ēn yù héng qīng dí， lì jìn guān shān wèi jiě wéi。\ntiě yī yuǎn shù xīn qín jiǔ， yù zhù yìng tí bié lí hòu。\nshào fù chéng nán yù duàn cháng， zhēng rén jì běi kōng huí shǒu。\nbiān tíng piāo yáo nà kě dù， jué yù cāng máng gèng hé yǒu。\nshā qì sān shí zuò zhèn yún， hán shēng yī yè chuán diāo dòu。\nxiāng kàn bái rèn xuè fēn fēn， sǐ jié cóng lái qǐ gù xūn。\njūn bù jiàn shā chǎng zhēng zhàn kǔ， zhì jīn yóu yì lǐ jiāng jūn。",
        translation: "将士们辞别家人去东北边疆攻打残敌，敲锣打鼓浩浩荡荡开出榆关，旌旗在碣石间蜿蜒前进；紧急的军书飞越大漠，敌方的猎火照亮了狼山。边地山川一片萧条，敌人骑兵像风雨一样凶猛扑来，战士在阵前死伤大半，将军帐子里美人却还在唱歌跳舞；孤城落日能战斗的兵越来越少，力战到底也没能解围。将士们白刃相拼、血染沙场，从来是为报国而不是为个人功勋，直到今天人们还想念那位爱护士兵的李将军。",
      }
      ],
    },
    {
      title: "长干行·君家何处住 · 崔颢",
      art: 'tangshi-300:ch315',
      artPrompt: "古诗《长干行·君家何处住》意境插画：君家何处住，妾住在横塘。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "君家何处住，妾住在横塘。\n停船暂借问，或恐是同乡。",
        pinyin: "jūn jiā hé chù zhù， qiè zhù zài héng táng。\ntíng chuán zàn jiè wèn， huò kǒng shì tóng xiāng。",
        translation: "请问您家住在哪里？我家住在横塘。停船来问一声，说不定我们还是同乡呢。",
      }
      ],
    },
    {
      title: "长干行·家临九江水 · 崔颢",
      art: 'tangshi-300:ch316',
      artPrompt: "古诗《长干行·家临九江水》意境插画：家临九江水，来去九江侧。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "家临九江水，来去九江侧。\n同是长干人，生小不相识。",
        pinyin: "jiā lín jiǔ jiāng shuǐ， lái qù jiǔ jiāng cè。\ntóng shì cháng gān rén， shēng xiǎo bù xiāng shí。",
        translation: "我家就住在九江水边，来来去去都在九江上。咱们原来同是长干人，只可惜从小不认识。",
      }
      ],
    },
    {
      title: "塞下曲·鹫翎金仆姑 · 卢纶",
      art: 'tangshi-300:ch317',
      artPrompt: "古诗《塞下曲·鹫翎金仆姑》意境插画：鹫翎金仆姑，燕尾绣蝥弧。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "鹫翎金仆姑，燕尾绣蝥弧。\n独立扬新令，千营共一呼。",
        pinyin: "jiù líng jīn pú gū， yàn wěi xiù máo hú。\ndú lì yáng xīn lìng， qiān yíng gòng yī hū。",
        translation: "将军的箭杆上装饰着鹫鸟的羽毛，军旗绣着燕尾形的花边。他独立在高处发布新的号令，上千座军营的士兵齐声欢呼。",
      }
      ],
    },
    {
      title: "塞下曲·林暗草惊风 · 卢纶",
      art: 'tangshi-300:ch318',
      artPrompt: "古诗《塞下曲·林暗草惊风》意境插画：林暗草惊风，将军夜引弓。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "林暗草惊风，将军夜引弓。\n平明寻白羽，没在石棱中。",
        pinyin: "lín àn cǎo jīng fēng， jiāng jūn yè yǐn gōng。\npíng míng xún bái yǔ， méi zài shí léng zhōng。",
        translation: "昏暗的树林里草儿被风惊得摇晃，将军趁夜搭弓射箭。天亮了去找那支白羽箭，箭头已经深深射进石头的棱缝里。",
      }
      ],
    },
    {
      title: "塞下曲·月黑雁飞高 · 卢纶",
      art: 'tangshi-300:ch319',
      artPrompt: "古诗《塞下曲·月黑雁飞高》意境插画：月黑雁飞高，单于夜遁逃。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "月黑雁飞高，单于夜遁逃。\n欲将轻骑逐，大雪满弓刀。",
        pinyin: "yuè hēi yàn fēi gāo， chán yú yè dùn táo。\nyù jiāng qīng qí zhú， dà xuě mǎn gōng dāo。",
        translation: "没有月亮的黑夜里大雁高高飞起，敌军首领趁着黑夜悄悄逃走了。将军正要带领轻骑兵去追赶，纷纷的大雪已经落满了弓和刀。",
      }
      ],
    },
    {
      title: "塞下曲·野幕敞琼筵 · 卢纶",
      art: 'tangshi-300:ch320',
      artPrompt: "古诗《塞下曲·野幕敞琼筵》意境插画：野幕敞琼筵，羌戎贺劳旋。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "野幕敞琼筵，羌戎贺劳旋。\n醉和金甲舞，雷鼓动山川。",
        pinyin: "yě mù chǎng qióng yán， qiāng róng hè láo xuán。\nzuì hé jīn jiǎ wǔ， léi gǔ dòng shān chuān。",
        translation: "野外的大营帐里摆开丰盛的筵席，边疆各族前来庆贺慰劳凯旋的将士。大家喝醉了还披着铠甲跳舞，擂响的战鼓震动了山川。",
      }
      ],
    }
  ],
  rights: {
    workTitle: "唐诗三百首",
    author: "蘅塘退士（编）",
    authorDeathYear: 1764,
    translator: '桃阅读',
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: "https://github.com/chinese-poetry/chinese-poetry",
    note: "所收唐诗作者卒年均逾保护期；编者蘅塘退士卒于 1764 年。注音与白话译文为平台自撰。",
  },
}
