import type { PackBook } from '../types'

/**
 * 《弟子规》——由 scripts/gen-corpus.mjs 从公版语料生成（2026-09-20 全面补全）。
 * 底本：弟子规（李毓秀）。逐字来自语料数据集，译文为平台自撰白话。
 * 通行本全篇；注音与白话译文为平台自撰。
 */
export const diZiGui: PackBook = {
  id: "dizigui-xiao",
  title: "弟子规",
  author: "李毓秀（清）",
  lang: "zh",
  category: "primer",
  ageStage: "3-5",
  intro: "「弟子规，圣人训」——全本《弟子规》，教小朋友在家、出门、待人、读书的好习惯。",
  coverArt: "filial-children-scroll",
  coverArtPrompt: "古代学堂里，一位老先生拿着书卷，几个扎小髻的孩子坐在蒲团上跟着念，窗外有竹子和梅花",
  coverFrom: "#FFE0B2",
  coverTo: "#FFB74D",
  source: "公版古籍（清·李毓秀）节选，逐字注音",
  chapters: [
    {
      title: "总叙 · 李毓秀",
      art: "primer-scroll",
      artPrompt: "古诗《总叙》意境插画：弟子规 圣人训 首孝弟 次谨信——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "弟子规 圣人训 首孝弟 次谨信\n泛爱众 而亲仁 有余力 则学文",
        pinyin: "dì zǐ guī shèng rén xùn shǒu xiào dì cì jǐn xìn\nfàn ài zhòng ér qīn rén yǒu yú lì zé xué wén",
        translation: "《弟子规》是依照圣人孔子的教诲编成的。首先要孝顺父母、友爱兄弟姐妹，其次说话做事要小心谨慎、诚实守信；要平等地爱护众人，多亲近有仁德的人；这些做好了还有余力，就再去学习书本上的知识。",
      }
      ],
    },
    {
      title: "入则孝（一） · 李毓秀",
      art: "primer-scroll",
      artPrompt: "古诗《入则孝（一）》意境插画：父母呼 应勿缓 父母命 行勿懒——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "父母呼 应勿缓 父母命 行勿懒\n父母教 须敬听 父母责 须顺承\n冬则温 夏则凊 晨则省 昏则定\n出必告 反必面 居有常 业无变\n事虽小 勿擅为 苟擅为 子道亏\n物虽小 勿私藏 苟私藏 亲心伤",
        pinyin: "fù mǔ hū yìng wù huǎn fù mǔ mìng xíng wù lǎn\nfù mǔ jiào xū jìng tīng fù mǔ zé xū shùn chéng\ndōng zé wēn xià zé qìng chén zé shěng hūn zé dìng\nchū bì gào fǎn bì miàn jū yǒu cháng yè wú biàn\nshì suī xiǎo wù shàn wèi gǒu shàn wèi zǐ dào kuī\nwù suī xiǎo wù sī cáng gǒu sī cáng qīn xīn shāng",
        translation: "父母呼唤我们，要马上答应，不能慢吞吞；父母吩咐的事情，要立刻去做，不能偷懒。父母教导我们，要恭敬地听；父母责备我们，要顺从地接受。冬天要让父母睡得暖和，夏天要让父母睡得凉快；早晨起床要向父母请安，晚上要伺候父母安睡。出门要告诉父母，回家要当面报告；生活起居要有规律，做的事情不要随便改变。事情虽然小，也不要自作主张去做；如果擅自去做了，就有损做子女的本分。东西虽然小，也不要偷偷藏起来；如果私自藏起来，父母知道了会很伤心。",
      }
      ],
    },
    {
      title: "入则孝（二） · 李毓秀",
      art: "primer-scroll",
      artPrompt: "古诗《入则孝（二）》意境插画：亲所好 力为具 亲所恶 谨为去——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "亲所好 力为具 亲所恶 谨为去\n身有伤 贻亲忧 德有伤 贻亲羞\n亲爱我 孝何难 亲憎我 孝方贤\n亲有过 谏使更 怡吾色 柔吾声\n谏不入 悦复谏 号泣随 挞无怨\n亲有疾 药先尝 昼夜侍 不离床",
        pinyin: "qīn suǒ hǎo lì wèi jù qīn suǒ è jǐn wèi qù\nshēn yǒu shāng yí qīn yōu dé yǒu shāng yí qīn xiū\nqīn ài wǒ xiào hé nán qīn zēng wǒ xiào fāng xián\nqīn yǒu guò jiàn shǐ gèng yí wú sè róu wú shēng\njiàn bù rù yuè fù jiàn hào qì suí tà wú yuàn\nqīn yǒu jí yào xiān cháng zhòu yè shì bù lí chuáng",
        translation: "父母喜欢的东西，要尽力替他们准备好；父母不喜欢的东西，要小心地帮他们去掉。身体受了伤，会让父母担忧；品德有了污点，会让父母蒙羞。父母疼爱我的时候，我孝顺并不难；父母不喜欢我的时候，我还能好好孝顺，才是真正难得的好孩子。父母有了过错，要劝他们改正；劝的时候要和颜悦色，声音要轻柔。如果父母不听劝，等他们高兴的时候再劝；再不听，就哭着苦苦恳求，就算挨打也不怨恨。父母生了病，煎好的药自己先尝一尝冷热；白天黑夜都守在床边照顾，不离开。",
      }
      ],
    },
    {
      title: "入则孝（三） · 李毓秀",
      art: "primer-scroll",
      artPrompt: "古诗《入则孝（三）》意境插画：丧三年 常悲咽 居处变 酒肉绝——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "丧三年 常悲咽 居处变 酒肉绝\n丧尽礼 祭尽诚 事死者 如事生",
        pinyin: "sàng sān nián cháng bēi yàn jū chù biàn jiǔ ròu jué\nsàng jìn lǐ jì jìn chéng shì sǐ zhě rú shì shēng",
        translation: "父母去世后，要守丧三年，常常悲伤怀念；自己的住处要改变，酒肉也不要再沾。办丧事要尽到礼节，祭拜要真心诚意；对待去世的父母，要像他们在世时一样恭敬。",
      }
      ],
    },
    {
      title: "出则弟（一） · 李毓秀",
      art: "primer-scroll",
      artPrompt: "古诗《出则弟（一）》意境插画：兄道友 弟道恭 兄弟睦 孝在中——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "兄道友 弟道恭 兄弟睦 孝在中\n财物轻 怨何生 言语忍 忿自泯\n或饮食 或坐走 长者先 幼者后\n长呼人 即代叫 人不在 己即到\n称尊长 勿呼名 对尊长 勿见能\n路遇长 疾趋揖 长无言 退恭立",
        pinyin: "xiōng dào yǒu dì dào gōng xiōng dì mù xiào zài zhōng\ncái wù qīng yuàn hé shēng yán yǔ rěn fèn zì mǐn\nhuò yǐn shí huò zuò zǒu zhǎng zhě xiān yòu zhě hòu\ncháng hū rén jí dài jiào rén bù zài jǐ jí dào\nchēng zūn cháng wù hū míng duì zūn cháng wù jiàn néng\nlù yù cháng jí qū yī cháng wú yán tuì gōng lì",
        translation: "做哥哥姐姐的要友爱弟妹，做弟弟妹妹的要尊敬兄姐；兄弟姐妹和睦相处，孝顺就体现在里面了。把财物看得轻一些，怨恨就不会产生；说话互相忍让一些，怒气自然就消了。吃东西、坐座位、走路的时候，要让长辈在先，晚辈在后。长辈叫人的时候，要赶快替长辈去传唤；叫的人不在，自己要先回来帮长辈做事。称呼长辈时，不要直接叫名字；在长辈面前，不要炫耀自己的本事。路上遇见长辈，要快步上前行礼问好；长辈没有话说了，就恭敬地退后站好。",
      }
      ],
    },
    {
      title: "出则弟（二） · 李毓秀",
      art: "primer-scroll",
      artPrompt: "古诗《出则弟（二）》意境插画：骑下马 乘下车 过犹待 百步余——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "骑下马 乘下车 过犹待 百步余\n长者立 幼勿坐 长者坐 命乃坐\n尊长前 声要低 低不闻 却非宜\n进必趋 退必迟 问起对 视勿移\n事诸父 如事父 事诸兄 如事兄",
        pinyin: "qí xià mǎ chéng xià chē guò yóu dài bǎi bù yú\nzhǎng zhě lì yòu wù zuò zhǎng zhě zuò mìng nǎi zuò\nzūn cháng qián shēng yào dī dī bù wén què fēi yí\njìn bì qū tuì bì chí wèn qǐ duì shì wù yí\nshì zhū fù rú shì fù shì zhū xiōng rú shì xiōng",
        translation: "骑马遇见长辈要下马，坐车遇见长辈要下车；长辈走过去了，还要恭敬地多站一会儿，等长辈走出百步左右再离开。长辈站着的时候，晚辈不要先坐下；等长辈坐下、让晚辈坐了，才可以坐。在长辈面前说话，声音要放低一些；但低到听不见，也不合适。到长辈跟前要快步上前，告退时要慢慢退下；长辈问话要站起来回答，眼睛望着长辈，不要东张西望。对待伯伯叔叔，要像对待自己的父亲一样；对待堂兄表兄，要像对待自己的亲哥哥一样。",
      }
      ],
    },
    {
      title: "谨（一） · 李毓秀",
      art: "primer-scroll",
      artPrompt: "古诗《谨（一）》意境插画：朝起早 夜眠迟 老易至 惜此时——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "朝起早 夜眠迟 老易至 惜此时\n晨必盥 兼漱口 便溺回 辄净手\n冠必正 纽必结 袜与履 俱紧切\n置冠服 有定位 勿乱顿 致污秽\n衣贵洁 不贵华 上循分 下称家\n对饮食 勿拣择 食适可 勿过则",
        pinyin: "cháo qǐ zǎo yè mián chí lǎo yì zhì xī cǐ shí\nchén bì guàn jiān shù kǒu biàn niào huí zhé jìng shǒu\nguān bì zhèng niǔ bì jié wà yǔ lǚ jù jǐn qiè\nzhì guān fú yǒu dìng wèi wù luàn dùn zhì wū huì\nyī guì jié bù guì huá shàng xún fēn xià chēng jiā\nduì yǐn shí wù jiǎn zé shí shì kě wù guò zé",
        translation: "早晨要早点起床，晚上不要早早睡觉；人很快就会变老，要珍惜现在的时光。早晨起床一定要洗脸漱口，大小便回来要马上洗手。帽子要戴端正，扣子要扣好，袜子和鞋子都要穿得服帖整齐。帽子和衣服要放在固定的地方，不要乱丢乱放，弄脏了衣物。穿衣服贵在干净整洁，不在于华丽；既要符合自己的身份，也要和家里的条件相称。吃东西不要挑挑拣拣，吃得合适就好，不要吃得太多。",
      }
      ],
    },
    {
      title: "谨（二） · 李毓秀",
      art: "primer-scroll",
      artPrompt: "古诗《谨（二）》意境插画：年方少 勿饮酒 饮酒醉 最为丑——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "年方少 勿饮酒 饮酒醉 最为丑\n步从容 立端正 揖深圆 拜恭敬\n勿践阈 勿跛倚 勿箕踞 勿摇髀\n缓揭帘 勿有声 宽转弯 勿触棱\n执虚器 如执盈 入虚室 如有人\n事勿忙 忙多错 勿畏难 勿轻略",
        pinyin: "nián fāng shǎo wù yǐn jiǔ yǐn jiǔ zuì zuì wèi chǒu\nbù cóng róng lì duān zhèng yī shēn yuán bài gōng jìng\nwù jiàn yù wù bǒ yǐ wù jī jù wù yáo bì\nhuǎn jiē lián wù yǒu shēng kuān zhuǎn wān wù chù léng\nzhí xū qì rú zhí yíng rù xū shì rú yǒu rén\nshì wù máng máng duō cuò wù wèi nán wù qīng lüè",
        translation: "年纪还小，不要喝酒；喝醉了的样子，是最难看的。走路要从容不迫，站立要端正；作揖要躬到位，行礼要恭敬。不要踩着门槛站，不要歪歪斜斜地靠着；不要叉开腿坐，也不要抖动大腿。掀门帘动作要轻，不要发出声响；拐弯的时候留出空当，不要撞到棱角。拿着空器皿，要像拿装满东西的一样小心；走进没有人的房间，要像屋里有人一样守规矩。做事不要慌慌张张，一忙就容易出错；但也不要怕困难，更不要马虎大意。",
      }
      ],
    },
    {
      title: "谨（三） · 李毓秀",
      art: "primer-scroll",
      artPrompt: "古诗《谨（三）》意境插画：斗闹场 绝勿近 邪僻事 绝勿问——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "斗闹场 绝勿近 邪僻事 绝勿问\n将入门 问孰存 将上堂 声必扬\n人问谁 对以名 吾与我 不分明\n用人物 须明求 倘不问 即为偷\n借人物 及时还 后有急 借不难",
        pinyin: "dòu nào chǎng jué wù jìn xié pì shì jué wù wèn\njiāng rù mén wèn shú cún jiāng shàng táng shēng bì yáng\nrén wèn shuí duì yǐ míng wú yǔ wǒ bù fēn míng\nyòng rén wù xū míng qiú tǎng bù wèn jí wèi tōu\njiè rén wù jí shí hái hòu yǒu jí jiè bù nán",
        translation: "打架吵闹的场所，绝对不要靠近；不正当、古怪的事情，绝对不要打听。快进门的时候，先问问里面有没有人；快进厅堂的时候，声音要提高一些让人听见。别人问是谁，要回答自己的名字；只说“是我”，别人还是弄不清楚。要用别人的东西，一定要明明白白地请求；如果不问一声就拿来用，那就等于偷。借来的东西要按时归还；以后有急用的时候，再借就不难了。",
      }
      ],
    },
    {
      title: "信（一） · 李毓秀",
      art: "primer-scroll",
      artPrompt: "古诗《信（一）》意境插画：凡出言 信为先 诈与妄 奚可焉——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "凡出言 信为先 诈与妄 奚可焉\n话说多 不如少 惟其是 勿佞巧\n奸巧语 秽污词 市井气 切戒之\n见未真 勿轻言 知未的 勿轻传\n事非宜 勿轻诺 苟轻诺 进退错\n凡道字 重且舒 勿急疾 勿模糊",
        pinyin: "fán chū yán xìn wèi xiān zhà yǔ wàng xī kě yān\nhuà shuō duō bù rú shǎo wéi qí shì wù nìng qiǎo\njiān qiǎo yǔ huì wū cí shì jǐng qì qiè jiè zhī\njiàn wèi zhēn wù qīng yán zhī wèi de wù qīng chuán\nshì fēi yí wù qīng nuò gǒu qīng nuò jìn tuì cuò\nfán dào zì zhòng qiě shū wù jí jí wù mó hu",
        translation: "凡是开口说话，首先要讲信用；说谎骗人、随口胡说，怎么可以呢？话说得多，不如说得少；说话要实实在在，不要花言巧语。奸诈取巧的话、肮脏粗俗的话，还有街头那些不好的习气，都要切实改掉。没有看真切的事情，不要轻易去说；没有弄确实的消息，不要轻易去传。不合适的事情，不要轻易答应；随便答应了，做也不是，不做也不是。说话吐字要清楚、从容，不要太快，也不要含含糊糊。",
      }
      ],
    },
    {
      title: "信（二） · 李毓秀",
      art: "primer-scroll",
      artPrompt: "古诗《信（二）》意境插画：彼说长 此说短 不关己 莫闲管——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "彼说长 此说短 不关己 莫闲管\n见人善 即思齐 纵去远 以渐跻\n见人恶 即内省 有则改 无加警\n唯德学 唯才艺 不如人 当自砺\n若衣服 若饮食 不如人 勿生戚\n闻过怒 闻誉乐 损友来 益友却",
        pinyin: "bǐ shuō cháng cǐ shuō duǎn bù guān jǐ mò xián guǎn\njiàn rén shàn jí sī qí zòng qù yuǎn yǐ jiàn jī\njiàn rén è jí nèi xǐng yǒu zé gǎi wú jiā jǐng\nwéi dé xué wéi cái yì bù rú rén dāng zì lì\nruò yī fu ruò yǐn shí bù rú rén wù shēng qī\nwén guò nù wén yù lè sǔn yǒu lái yì yǒu què",
        translation: "别人说长道短，和自己没有关系的事情，不要去多管闲事。看见别人的长处，就要想着向他学习；即使现在差得远，也要一步步赶上。看见别人的短处，就要反省自己；自己有就改正，没有就更加警惕。只有品德、学问和才艺比不上别人时，才应当勉励自己努力赶上；吃的穿的用的不如别人，不必难过。听到别人说自己缺点就生气，听到别人夸奖就高兴，坏朋友就会来找你，好朋友就会躲开你。",
      }
      ],
    },
    {
      title: "信（三） · 李毓秀",
      art: "primer-scroll",
      artPrompt: "古诗《信（三）》意境插画：闻誉恐 闻过欣 直谅士 渐相亲——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "闻誉恐 闻过欣 直谅士 渐相亲\n无心非 名为错 有心非 名为恶\n过能改 归于无 倘掩饰 增一辜",
        pinyin: "wén yù kǒng wén guò xīn zhí liàng shì jiàn xiāng qīn\nwú xīn fēi míng wèi cuò yǒu xīn fēi míng wèi è\nguò néng gǎi guī yú wú tǎng yǎn shì zēng yī gū",
        translation: "听到夸奖反而觉得不安，听到批评反而感到高兴，正直诚信的人就会渐渐和你亲近。无意中做错了事，叫作“过错”；故意去做坏事，就叫“罪恶”。错了能够改正，就等于没有过错；如果还要掩饰，那就是错上加错。",
      }
      ],
    },
    {
      title: "泛爱众（一） · 李毓秀",
      art: "primer-scroll",
      artPrompt: "古诗《泛爱众（一）》意境插画：凡是人 皆须爱 天同覆 地同载——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "凡是人 皆须爱 天同覆 地同载\n行高者 名自高 人所重 非貌高\n才大者 望自大 人所服 非言大\n己有能 勿自私 人所能 勿轻訾\n勿谄富 勿骄贫 勿厌故 勿喜新\n人不闲 勿事搅 人不安 勿话扰",
        pinyin: "fán shì rén jiē xū ài tiān tóng fù dì tóng zǎi\nháng gāo zhě míng zì gāo rén suǒ zhòng fēi mào gāo\ncái dà zhě wàng zì dà rén suǒ fú fēi yán dà\njǐ yǒu néng wù zì sī rén suǒ néng wù qīng zī\nwù chǎn fù wù jiāo pín wù yàn gù wù xǐ xīn\nrén bù xián wù shì jiǎo rén bù ān wù huà rǎo",
        translation: "只要是人，都要相亲相爱；因为大家同顶一片天空，同住一个大地。品行高尚的人，名声自然高；人们敬重的是他的德行，不是他的外貌。才学大的人，威望自然大；人们佩服的是他的真本领，不是他的大话。自己有能力，不要只顾自己用；别人有能力，也不要随便小看人家。不要讨好奉承富人，也不要瞧不起穷人；不要厌弃老朋友，也不要只偏爱新朋友。别人忙碌的时候，不要去打搅；别人心情不好的时候，不要说闲话去打扰。",
      }
      ],
    },
    {
      title: "泛爱众（二） · 李毓秀",
      art: "primer-scroll",
      artPrompt: "古诗《泛爱众（二）》意境插画：人有短 切莫揭 人有私 切莫说——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "人有短 切莫揭 人有私 切莫说\n道人善 即是善 人知之 愈思勉\n扬人恶 即是恶 疾之甚 祸且作\n善相劝 德皆建 过不规 道两亏\n凡取与 贵分晓 与宜多 取宜少\n将加人 先问己 己不欲 即速已",
        pinyin: "rén yǒu duǎn qiè mò jiē rén yǒu sī qiè mò shuō\ndào rén shàn jí shì shàn rén zhī zhī yù sī miǎn\nyáng rén è jí shì è jí zhī shèn huò qiě zuò\nshàn xiāng quàn dé jiē jiàn guò bù guī dào liǎng kuī\nfán qǔ yǔ guì fēn xiǎo yǔ yí duō qǔ yí shǎo\njiāng jiā rén xiān wèn jǐ jǐ bù yù jí sù yǐ",
        translation: "别人的短处，千万不要去揭穿；别人的隐私，千万不要去宣扬。称赞别人的善行，本身就是善行；对方知道了，会更加努力做好。宣扬别人的坏处，本身就是坏事；过分憎恶别人，会招来祸患。朋友之间互相劝善，双方的品德都得到长进；有过错不互相规劝，双方的品德都会受损。拿东西和给东西，要分得清清楚楚；给别人的宁可多一些，拿别人的要少一些。要求别人之前，先问问自己：自己不愿意的事情，就赶快不要强加给别人。",
      }
      ],
    },
    {
      title: "泛爱众（三） · 李毓秀",
      art: "primer-scroll",
      artPrompt: "古诗《泛爱众（三）》意境插画：恩欲报 怨欲忘 报怨短 报恩长——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "恩欲报 怨欲忘 报怨短 报恩长\n待婢仆 身贵端 虽贵端 慈而宽\n势服人 心不然 理服人 方无言",
        pinyin: "ēn yù bào yuàn yù wàng bào yuàn duǎn bào ēn cháng\ndài bì pú shēn guì duān suī guì duān cí ér kuān\nshì fú rén xīn bù rán lǐ fú rén fāng wú yán",
        translation: "别人对我们的恩情，要记着报答；对别人的怨恨，要把它忘掉。记恨别人的时候越短越好，报答别人恩情的心思越长越好。对待家里的仆人，自己要品行端正；不但要端正，还要仁慈宽厚。靠权势压服别人，别人嘴上不说心里不服；用道理说服别人，别人才会心服口服。",
      }
      ],
    },
    {
      title: "亲仁 · 李毓秀",
      art: "primer-scroll",
      artPrompt: "古诗《亲仁》意境插画：同是人 类不齐 流俗众 仁者希——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "同是人 类不齐 流俗众 仁者希\n果仁者 人多畏 言不讳 色不媚\n能亲仁 无限好 德日进 过日少\n不亲仁 无限害 小人进 百事坏",
        pinyin: "tóng shì rén lèi bù qí liú sú zhòng rén zhě xī\nguǒ rén zhě rén duō wèi yán bù huì sè bù mèi\nnéng qīn rén wú xiàn hǎo dé rì jìn guò rì shǎo\nbù qīn rén wú xiàn hài xiǎo rén jìn bǎi shì huài",
        translation: "同样是人，品行却有好有坏；跟着世俗随大流的多，有仁德的人少。真正有仁德的人，大家都敬畏他；他说话坦率，不隐瞒，神色庄重，不讨好谁。能够亲近有仁德的人，好处说不完：品德会一天天进步，过错会一天天减少。不亲近有仁德的人，坏处很大：坏人就会凑过来，什么事都会变糟。",
      }
      ],
    },
    {
      title: "余力学文（一） · 李毓秀",
      art: "primer-scroll",
      artPrompt: "古诗《余力学文（一）》意境插画：不力行 但学文 长浮华 成何人——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "不力行 但学文 长浮华 成何人\n但力行 不学文 任己见 昧理真\n读书法 有三到 心眼口 信皆要\n方读此 勿慕彼 此未终 彼勿起\n宽为限 紧用功 工夫到 滞塞通\n心有疑 随札记 就人问 求确义",
        pinyin: "bù lì xíng dàn xué wén cháng fú huá chéng hé rén\ndàn lì xíng bù xué wén rèn jǐ jiàn mèi lǐ zhēn\ndú shū fǎ yǒu sān dào xīn yǎn kǒu xìn jiē yào\nfāng dú cǐ wù mù bǐ cǐ wèi zhōng bǐ wù qǐ\nkuān wèi xiàn jǐn yòng gōng gōng fū dào zhì sāi tōng\nxīn yǒu yí suí zhá jì jiù rén wèn qiú què yì",
        translation: "只肯读书却不肯实践，就会越长越浮华，将来能成为什么样的人呢？只知道埋头做事却不肯读书，就会凭自己的想法蛮干，看不明白真正的道理。读书的方法讲究“三到”：心到、眼到、口到，三者缺一不可。正在读这本书的时候，不要想着那本书；这本还没读完，就不要去开那本。读书的计划可以定得宽松一些，但用功要抓紧；功夫下到了，不通的地方自然就通了。心里有疑问，要随手记下来，再向别人请教，弄清确切的意思。",
      }
      ],
    },
    {
      title: "余力学文（二） · 李毓秀",
      art: "primer-scroll",
      artPrompt: "古诗《余力学文（二）》意境插画：房室清 墙壁净 几案洁 笔砚正——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "房室清 墙壁净 几案洁 笔砚正\n墨磨偏 心不端 字不敬 心先病\n列典籍 有定处 读看毕 还原处\n虽有急 卷束齐 有缺坏 就补之\n非圣书 屏勿视 蔽聪明 坏心志\n勿自暴 勿自弃 圣与贤 可驯致",
        pinyin: "fáng shì qīng qiáng bì jìng jī àn jié bǐ yàn zhèng\nmò mó piān xīn bù duān zì bù jìng xīn xiān bìng\nliè diǎn jí yǒu dìng chù dú kàn bì huán yuán chù\nsuī yǒu jí juàn shù qí yǒu quē huài jiù bǔ zhī\nfēi shèng shū píng wù shì bì cōng ming huài xīn zhì\nwù zì bào wù zì qì shèng yǔ xián kě xùn zhì",
        translation: "书房要收拾得清爽，墙壁要干净，书桌要整洁，笔墨砚台要摆放端正。墨磨歪了，说明心思不在学习上；字写得潦草，说明心先浮躁了。摆放书籍要有固定的地方，读完看完要放回原处。即使有急事，也要把书本收好叠齐；书有破损，就要随手修补。不是有益于身心的坏书，不要去看；看了会蒙蔽聪明，败坏心志。不要作践自己，不要自甘落后；圣人和贤人的境界，只要肯努力，人人都可以一步步达到。",
      }
      ],
    }
  ],
  rights: {
    workTitle: "弟子规",
    author: "李毓秀",
    authorDeathYear: 1729,
    translator: '桃阅读',
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: "https://github.com/chinese-poetry/chinese-poetry",
    note: "通行本全篇；注音与白话译文为平台自撰。",
  },
}
