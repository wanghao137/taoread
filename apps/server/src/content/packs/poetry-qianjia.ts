import type { PackBook } from '../types'

/**
 * 《千家诗》——由 scripts/gen-corpus.mjs 从公版语料生成（2026-09-20 全面补全）。
 * 底本：千家诗（谢枋得、王相（编））。逐字来自语料数据集，译文为平台自撰白话。
 * 所收诗作者卒年均逾保护期；编者王相卒于 1687 年。注音与白话译文为平台自撰。
 */
export const qianJiaShi: PackBook = {
  id: "poetry-qianjia",
  title: "千家诗",
  author: "谢枋得 / 王相 编",
  lang: "zh",
  category: "poetry",
  ageStage: "6-8",
  intro: "谢枋得、王相编《千家诗》全本：两百多首绝句律诗，从春晓到秋思，四季都装在这一本里。",
  coverArt: "qianjia-seasons-cover",
  coverArtPrompt: "一幅四格长卷式中国水彩：春有爆竹红灯笼和绿柳，夏有西湖荷叶与阵雨，秋有枫林白雁，冬有雪山红梅，四个季节连成一条弯弯的小路",
  coverFrom: "#B71C1C",
  coverTo: "#F0E4C3",
  source: "公版古诗选本（南宋/明）全本，自撰注音与白话译文",
  chapters: [
    {
      title: "春眠 · 孟浩然",
      art: 'poetry-qianjia:ch1',
      artPrompt: "古诗《春眠》意境插画：春眠不觉晓，处处闻啼鸟。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "春眠不觉晓，处处闻啼鸟。\n夜来风雨声，花落知多少。",
        pinyin: "chūn mián bù jué xiǎo， chù chù wén tí niǎo。\nyè lái fēng yǔ shēng， huā luò zhī duō shǎo。",
        translation: "春天夜里睡得香，不知不觉天就亮了，醒来听见到处都是鸟儿的叫声。想起昨夜风声雨声不断，不知道花儿被打落了多少。",
      }
      ],
    },
    {
      title: "访袁拾遗不遇 · 孟浩然",
      art: 'poetry-qianjia:ch2',
      artPrompt: "古诗《访袁拾遗不遇》意境插画：洛阳访才子，江岭作流人。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "洛阳访才子，江岭作流人。\n闻说梅花早，何如此地春。",
        pinyin: "luò yáng fǎng cái zǐ， jiāng lǐng zuò liú rén。\nwén shuō méi huā zǎo， hé rú cǐ dì chūn。",
        translation: "到洛阳去拜访有才华的朋友，他却已经被流放到南方的江岭去了。听说那里的梅花开得早，可是再美，怎么比得上这里的春光呢？",
      }
      ],
    },
    {
      title: "送郭司仓 · 王昌龄",
      art: 'poetry-qianjia:ch3',
      artPrompt: "古诗《送郭司仓》意境插画：映门淮水绿，留骑主人心。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "映门淮水绿，留骑主人心。\n明月随良掾，春潮夜夜深。",
        pinyin: "yìng mén huái shuǐ lǜ， liú qí zhǔ rén xīn。\nmíng yuè suí liáng yuàn， chūn cháo yè yè shēn。",
        translation: "碧绿的淮水映照着门户，我挽留客人，心里满是不舍的情意。明月会一路跟随着好官远去，我的思念就像春潮，一夜比一夜深。",
      }
      ],
    },
    {
      title: "洛阳道 · 储光羲",
      art: 'poetry-qianjia:ch4',
      artPrompt: "古诗《洛阳道》意境插画：大道直如发，春来佳气多。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "大道直如发，春来佳气多。\n五陵贵公子，双双呜玉珂。",
        pinyin: "dà dào zhí rú fā， chūn lái jiā qì duō。\nwǔ líng guì gōng zǐ， shuāng shuāng wū yù kē。",
        translation: "洛阳的大路直得像头发一样，春天来了，处处是美好的气象。五陵一带的贵公子们，成双结对骑马出游，马身上的玉珂叮当作响。",
      }
      ],
    },
    {
      title: "独坐敬亭山 · 李白",
      art: 'poetry-qianjia:ch5',
      artPrompt: "古诗《独坐敬亭山》意境插画：众鸟高飞尽，孤云独去闲。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "众鸟高飞尽，孤云独去闲。\n相看两不厌，只有敬亭山。",
        pinyin: "zhòng niǎo gāo fēi jìn， gū yún dú qù xián。\nxiāng kàn liǎng bù yàn， zhǐ yǒu jìng tíng shān。",
        translation: "鸟儿们都高高地飞走了，连一片孤云也独自悠悠地飘远。和我互相凝望、怎么看也不厌倦的，只有眼前的敬亭山。",
      }
      ],
    },
    {
      title: "登鹳雀楼 · 王之涣",
      art: 'poetry-qianjia:ch6',
      artPrompt: "古诗《登鹳雀楼》意境插画：白日依山尽，黄河入海流。——中国传统水彩绘本风，画面明快温暖，适合儿童",
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
      title: "观永乐公主入番 · 孙逖",
      art: 'poetry-qianjia:ch7',
      artPrompt: "古诗《观永乐公主入番》意境插画：边地莺花少，年来未觉新。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "边地莺花少，年来未觉新。\n美人天上落，龙塞始应春。",
        pinyin: "biān dì yīng huā shǎo， nián lái wèi jué xīn。\nměi rén tiān shàng luò， lóng sāi shǐ yìng chūn。",
        translation: "边地的黄莺和鲜花都很少，年复一年感觉不出什么新鲜变化。如今美人像从天上降落一样来到，边塞这才开始有了春天的气息。",
      }
      ],
    },
    {
      title: "伊州歌 · 金昌绪",
      art: 'poetry-qianjia:ch8',
      artPrompt: "古诗《伊州歌》意境插画：打起黄莺儿，莫教枝上啼。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "打起黄莺儿，莫教枝上啼。\n啼时惊妾梦，不得到辽西。",
        pinyin: "dǎ qǐ huáng yīng ér， mò jiào zhī shàng tí。\ntí shí jīng qiè mèng， bù dé dào liáo xī。",
        translation: "快把枝头的黄莺儿赶走，别让它在树上啼叫。它的叫声会惊醒我的好梦，梦里我就到不了辽西了。",
      }
      ],
    },
    {
      title: "左掖梨花 · 丘为",
      art: 'poetry-qianjia:ch9',
      artPrompt: "古诗《左掖梨花》意境插画：冷艳全欺雪，余香乍入衣。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "冷艳全欺雪，余香乍入衣。\n春风且莫定，吹向玉阶飞。",
        pinyin: "lěng yàn quán qī xuě， yú xiāng zhà rù yī。\nchūn fēng qiě mò dìng， chuī xiàng yù jiē fēi。",
        translation: "梨花清冷艳丽，完全胜过了白雪，淡淡的香气忽然飘到衣襟上。春风啊请先不要停息，把这花瓣吹向玉阶前飞舞。",
      }
      ],
    },
    {
      title: "思君恩 · 令狐楚",
      art: 'poetry-qianjia:ch10',
      artPrompt: "古诗《思君恩》意境插画：小苑莺歌歇，长门蝶舞多。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "小苑莺歌歇，长门蝶舞多。\n眼看春又去，翠辇不曾过。",
        pinyin: "xiǎo yuàn yīng gē xiē， cháng mén dié wǔ duō。\nyǎn kàn chūn yòu qù， cuì niǎn bù céng guò。",
        translation: "小花园里黄莺的歌声停歇了，长门宫前蝴蝶还在飞舞。眼看着春天又要过去了，皇帝的车驾却始终没有来过。",
      }
      ],
    },
    {
      title: "题袁氏别业 · 贺知章",
      art: 'poetry-qianjia:ch11',
      artPrompt: "古诗《题袁氏别业》意境插画：主人不相识，偶坐为林泉。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "主人不相识，偶坐为林泉。\n莫谩愁沽酒，囊中自有钱。",
        pinyin: "zhǔ rén bù xiāng shí， ǒu zuò wèi lín quán。\nmò màn chóu gū jiǔ， náng zhōng zì yǒu qián。",
        translation: "我和主人素不相识，只为这林泉美景才坐下来歇一歇。不必发愁没钱买酒，我的口袋里自然带着钱呢。",
      }
      ],
    },
    {
      title: "夜送赵纵 · 杨炯",
      art: 'poetry-qianjia:ch12',
      artPrompt: "古诗《夜送赵纵》意境插画：赵氏连城璧，由来天下传。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "赵氏连城璧，由来天下传。\n送君还旧府，明月满前川。",
        pinyin: "zhào shì lián chéng bì， yóu lái tiān xià chuán。\nsòng jūn hái jiù fǔ， míng yuè mǎn qián chuān。",
        translation: "赵家那块价值连城的美玉，从来就名传天下。今晚送你回到家乡去，明月的光辉洒满了前面的河川。",
      }
      ],
    },
    {
      title: "竹里馆 · 王维",
      art: 'poetry-qianjia:ch13',
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
      title: "送朱大入秦 · 王维",
      art: 'poetry-qianjia:ch14',
      artPrompt: "古诗《送朱大入秦》意境插画：避人五陵去，宝剑值千金。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "避人五陵去，宝剑值千金。\n分手脱相赠，平生一片心。",
        pinyin: "bì rén wǔ líng qù， bǎo jiàn zhí qiān jīn。\nfēn shǒu tuō xiāng zèng， píng shēng yī piàn xīn。",
        translation: "你要避开世人到五陵一带去，我把这价值千金的宝剑解下来。分手的时候赠给你作纪念，这是我平生的一片真心。",
      }
      ],
    },
    {
      title: "长干行 · 崔颢",
      art: 'poetry-qianjia:ch15',
      artPrompt: "古诗《长干行》意境插画：君家在何处？妾住在横塘。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "君家在何处？妾住在横塘。\n停船暂借问，或恐是同乡。",
        pinyin: "jūn jiā zài hé chù？ qiè zhù zài héng táng。\ntíng chuán zàn jiè wèn， huò kǒng shì tóng xiāng。",
        translation: "请问您家在什么地方？我家住在横塘。停下船来暂且问一声，说不定我们是同乡呢。",
      }
      ],
    },
    {
      title: "咏史 · 高适",
      art: 'poetry-qianjia:ch16',
      artPrompt: "古诗《咏史》意境插画：尚有绨袍赠，应怜范叔寒。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "尚有绨袍赠，应怜范叔寒。\n不知天下士，犹作布衣看。",
        pinyin: "shàng yǒu tí páo zèng， yìng lián fàn shū hán。\nbù zhī tiān xià shì， yóu zuò bù yī kàn。",
        translation: "范叔临别时还有人赠送一件粗绸袍子，想必是可怜他的寒苦。谁能想到天下这样有才的士人，至今还被人当作平民看待。",
      }
      ],
    },
    {
      title: "罢相作 · 李适之",
      art: 'poetry-qianjia:ch17',
      artPrompt: "古诗《罢相作》意境插画：避贤初罢相，乐圣且衔杯。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "避贤初罢相，乐圣且衔杯。\n为问门前客，今朝几个来。",
        pinyin: "bì xián chū bà xiāng， lè shèng qiě xián bēi。\nwèi wèn mén qián kè， jīn cháo jǐ gè lái。",
        translation: "为了把位子让给贤能的人，我刚辞去宰相，正好可以天天举杯享受美酒。想问一问门前的那些客人，今天还有几个肯来呢？",
      }
      ],
    },
    {
      title: "逢侠者 · 钱起",
      art: 'poetry-qianjia:ch18',
      artPrompt: "古诗《逢侠者》意境插画：燕赵悲歌士，相逢剧孟家。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "燕赵悲歌士，相逢剧孟家。\n寸心言不尽，前路日将斜。",
        pinyin: "yān zhào bēi gē shì， xiāng féng jù mèng jiā。\ncùn xīn yán bù jìn， qián lù rì jiāng xié。",
        translation: "燕赵一带多有慷慨悲歌的侠士，我在剧孟的家乡与他们相逢。心里的话说也说不完，前方的路上太阳快要落山了。",
      }
      ],
    },
    {
      title: "江行望匡庐 · 钱起",
      art: 'poetry-qianjia:ch19',
      artPrompt: "古诗《江行望匡庐》意境插画：咫尺愁风雨，匡庐不可登。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "咫尺愁风雨，匡庐不可登。\n只疑云雾窟，犹有六朝僧。",
        pinyin: "zhǐ chǐ chóu fēng yǔ， kuāng lú bù kě dēng。\nzhī yí yún wù kū， yóu yǒu liù cháo sēng。",
        translation: "庐山近在咫尺，却因为风雨发愁没法登上去。我直疑心那云雾缭绕的山洞里，还住着六朝时候的老和尚呢。",
      }
      ],
    },
    {
      title: "答李浣 · 韦应物",
      art: 'poetry-qianjia:ch20',
      artPrompt: "古诗《答李浣》意境插画：林中观易罢，溪上对鸥闲。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "林中观易罢，溪上对鸥闲。\n楚俗饶词客，何人最往还。",
        pinyin: "lín zhōng guān yì bà， xī shàng duì ōu xián。\nchǔ sú ráo cí kè， hé rén zuì wǎng hái。",
        translation: "在树林里读罢《易经》，走到溪边悠闲地看鸥鸟。楚地多有会写诗文的人才，不知我和谁交往得最多呢。",
      }
      ],
    },
    {
      title: "秋风引 · 刘禹锡",
      art: 'poetry-qianjia:ch21',
      artPrompt: "古诗《秋风引》意境插画：何处秋风至，萧萧送雁群。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "何处秋风至，萧萧送雁群。\n朝来入庭树，孤客最先闻。",
        pinyin: "hé chù qiū fēng zhì， xiāo xiāo sòng yàn qún。\ncháo lái rù tíng shù， gū kè zuì xiān wén。",
        translation: "秋风是从哪里吹来的呀？萧萧地送来了一群大雁。清早它吹进庭前的树间，孤独的旅人最先听见了。",
      }
      ],
    },
    {
      title: "秋夜寄丘员外 · 韦应物",
      art: 'poetry-qianjia:ch22',
      artPrompt: "古诗《秋夜寄丘员外》意境插画：怀君属秋夜，散步咏凉天。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "怀君属秋夜，散步咏凉天。\n山空松子落，幽人应未眠。",
        pinyin: "huái jūn shǔ qiū yè， sàn bù yǒng liáng tiān。\nshān kōng sōng zǐ luò， yōu rén yìng wèi mián。",
        translation: "在这秋凉的夜里想念你，一边散步一边吟着诗。想来空山里松子正落下来，隐居的你应该也还没有入睡吧。",
      }
      ],
    },
    {
      title: "秋日 · 耿𣲗",
      art: 'poetry-qianjia:ch23',
      artPrompt: "古诗《秋日》意境插画：返照入闾巷，忧来谁共语。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "返照入闾巷，忧来谁共语。\n古道少人行，秋风动禾黍。",
        pinyin: "fǎn zhào rù lǘ xiàng， yōu lái shuí gòng yǔ。\ngǔ dào shǎo rén xíng， qiū fēng dòng hé shǔ。",
        translation: "夕阳的余光照进小巷，满心忧愁能跟谁诉说呢。古老的道路上很少有人行走，秋风吹动田里的庄稼沙沙作响。",
      }
      ],
    },
    {
      title: "秋日湖上 · 薛莹",
      art: 'poetry-qianjia:ch24',
      artPrompt: "古诗《秋日湖上》意境插画：落日五湖游，烟波处处愁。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "落日五湖游，烟波处处愁。\n浮沉千古事，谁与问东流。",
        pinyin: "luò rì wǔ hú yóu， yān bō chù chù chóu。\nfú chén qiān gǔ shì， shuí yǔ wèn dōng liú。",
        translation: "太阳落山的时候在湖上游玩，烟波茫茫，处处都惹人发愁。千古的往事像波浪一样浮浮沉沉，谁能向东流的湖水问个明白呢。",
      }
      ],
    },
    {
      title: "宫中题 · 李昂",
      art: 'poetry-qianjia:ch25',
      artPrompt: "古诗《宫中题》意境插画：辇路生秋草，上林花满枝。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "辇路生秋草，上林花满枝。\n凭高何限意，无复侍臣知。",
        pinyin: "niǎn lù shēng qiū cǎo， shàng lín huā mǎn zhī。\npíng gāo hé xiàn yì， wú fù shì chén zhī。",
        translation: "皇帝车驾走过的路上长出了秋草，上林苑的花儿开满枝头。登上高处，心中的感慨无限，却再没有侍臣能够明白。",
      }
      ],
    },
    {
      title: "汾上惊秋 · 苏颋",
      art: 'poetry-qianjia:ch26',
      artPrompt: "古诗《汾上惊秋》意境插画：北风吹白云，万里渡河汾。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "北风吹白云，万里渡河汾。\n心绪逢摇落，秋声不可闻。",
        pinyin: "běi fēng chuī bái yún， wàn lǐ dù hé fén。\nxīn xù féng yáo luò， qiū shēng bù kě wén。",
        translation: "北风吹动着白云，我远渡万里来到河汾。心绪正碰上草木摇落的秋天，这萧瑟的秋声真让人不忍心听。",
      }
      ],
    },
    {
      title: "寻隐者不遇 · 贾岛",
      art: 'poetry-qianjia:ch27',
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
      title: "蜀道后期 · 张说",
      art: 'poetry-qianjia:ch28',
      artPrompt: "古诗《蜀道后期》意境插画：客心争日月，来往预期程。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "客心争日月，来往预期程。\n秋风不相待，先至洛阳城。",
        pinyin: "kè xīn zhēng rì yuè， lái wǎng yù qī chéng。\nqiū fēng bù xiāng dài， xiān zhì luò yáng chéng。",
        translation: "出门在外，心里急着赶日子，来回的行程都预先算好了。偏偏秋风不肯等我，先一步吹到了洛阳城。",
      }
      ],
    },
    {
      title: "静夜思 · 李白",
      art: 'poetry-qianjia:ch29',
      artPrompt: "古诗《静夜思》意境插画：床前明月光，疑是地上霜。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "床前明月光，疑是地上霜。\n举头望明月，低头思故乡。",
        pinyin: "chuáng qián míng yuè guāng， yí shì dì shàng shuāng。\njǔ tóu wàng míng yuè， dī tóu sī gù xiāng。",
        translation: "床前洒满明亮的月光，好像地上结了一层白霜。抬起头看月亮，低下头，想起了远方的家。",
      }
      ],
    },
    {
      title: "秋浦歌 · 李白",
      art: 'poetry-qianjia:ch30',
      artPrompt: "古诗《秋浦歌》意境插画：白发三千丈，离愁似个长。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "白发三千丈，离愁似个长。\n不知明镜里，何处得秋霜。",
        pinyin: "bái fà sān qiān zhàng， lí chóu sì gè cháng。\nbù zhī míng jìng lǐ， hé chù dé qiū shuāng。",
        translation: "白发长到三千丈，心里的愁绪就像它一样长。不知道明亮的镜子里，从哪里照出这满头的秋霜。",
      }
      ],
    },
    {
      title: "赠乔侍郎 · 陈子昂",
      art: 'poetry-qianjia:ch31',
      artPrompt: "古诗《赠乔侍郎》意境插画：汉廷荣巧宦，云阁薄边功。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "汉廷荣巧宦，云阁薄边功。\n可怜骢马使，白首为谁雄。",
        pinyin: "hàn tíng róng qiǎo huàn， yún gé báo biān gōng。\nkě lián cōng mǎ shǐ， bái shǒu wèi shuí xióng。",
        translation: "朝廷只让投机取巧的官吏风光，把边关将士的功劳看得轻。可怜那骑着骢马的使者，头发白了还在为谁建功扬名呢。",
      }
      ],
    },
    {
      title: "答五陵太守 · 王昌龄",
      art: 'poetry-qianjia:ch32',
      artPrompt: "古诗《答五陵太守》意境插画：仗剑行千里，微躯敢一言。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "仗剑行千里，微躯敢一言。\n曾为大梁客，不负信陵恩。",
        pinyin: "zhàng jiàn xíng qiān lǐ， wēi qū gǎn yī yán。\ncéng wèi dà liáng kè， bù fù xìn líng ēn。",
        translation: "我仗着宝剑走千里路，斗胆向您说一句心里话。您像信陵君厚待门客那样待我，我决不会辜负您的恩情。",
      }
      ],
    },
    {
      title: "行军九日思长安故园 · 岑参",
      art: 'poetry-qianjia:ch33',
      artPrompt: "古诗《行军九日思长安故园》意境插画：强欲登高去，无人送酒来。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "强欲登高去，无人送酒来。\n遥怜故园菊，应傍战场开。",
        pinyin: "qiáng yù dēng gāo qù， wú rén sòng jiǔ lái。\nyáo lián gù yuán jú， yìng bàng zhàn chǎng kāi。",
        translation: "行军路上勉强想照重阳的习俗去登高，却没有人为我送酒来。遥遥地怜惜家乡的菊花，这会儿大概正开在战场旁边吧。",
      }
      ],
    },
    {
      title: "婕妤怨 · 皇甫冉",
      art: 'poetry-qianjia:ch34',
      artPrompt: "古诗《婕妤怨》意境插画：花枝出建章，凤管发昭阳。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "花枝出建章，凤管发昭阳。\n借问承恩者，双蛾几许长？",
        pinyin: "huā zhī chū jiàn zhāng， fèng guǎn fā zhāo yáng。\njiè wèn chéng ēn zhě， shuāng é jǐ xǔ cháng？",
        translation: "花枝般的宫人从建章宫出来，凤箫的乐声从昭阳殿传出。请问那正受恩宠的人，你的双眉能有多长呢？",
      }
      ],
    },
    {
      title: "题竹林寺 · 朱放",
      art: 'poetry-qianjia:ch35',
      artPrompt: "古诗《题竹林寺》意境插画：岁月人间促，烟霞此地多。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "岁月人间促，烟霞此地多。\n殷勤竹林寺，更得几回过？",
        pinyin: "suì yuè rén jiān cù， yān xiá cǐ dì duō。\nyīn qín zhú lín sì， gèng dé jǐ huí guò？",
        translation: "人间的岁月过得这样匆促，这里的烟霞美景却那么多。令人留恋的竹林寺啊，这一生还能再来游几回呢？",
      }
      ],
    },
    {
      title: "过三闾庙 · 戴叔伦",
      art: 'poetry-qianjia:ch36',
      artPrompt: "古诗《过三闾庙》意境插画：沅湘流不尽，屈子怨何深！——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "沅湘流不尽，屈子怨何深！\n日暮秋风起，萧萧枫树林。",
        pinyin: "yuán xiāng liú bù jìn， qū zǐ yuàn hé shēn！\nrì mù qiū fēng qǐ， xiāo xiāo fēng shù lín。",
        translation: "沅江湘江的水流也流不尽，屈原心里的怨恨有多深啊！日暮时分秋风刮起来，枫树林萧萧地响。",
      }
      ],
    },
    {
      title: "易水送别 · 骆宾王",
      art: 'poetry-qianjia:ch37',
      artPrompt: "古诗《易水送别》意境插画：此地别燕丹，壮士发冲冠。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "此地别燕丹，壮士发冲冠。\n昔时人已没，今日水犹寒。",
        pinyin: "cǐ dì bié yàn dān， zhuàng shì fā chōng guān。\nxī shí rén yǐ méi， jīn rì shuǐ yóu hán。",
        translation: "当年壮士就是在这里告别燕太子丹的，他激动得头发竖起、顶起了帽子。那时的人已经不在了，今天这里的水还让人觉得寒冷。",
      }
      ],
    },
    {
      title: "别卢秦卿 · 司空曙",
      art: 'poetry-qianjia:ch38',
      artPrompt: "古诗《别卢秦卿》意境插画：知有前期在，难分此夜中。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "知有前期在，难分此夜中。\n无将故人酒，不及石尤风。",
        pinyin: "zhī yǒu qián qī zài， nán fēn cǐ yè zhōng。\nwú jiāng gù rén jiǔ， bù jí shí yóu fēng。",
        translation: "知道改天还会再见，可今晚还是难舍难分。请别让老朋友这杯送行的酒，还比不上那阵拦住船、多留人一会儿的大风。",
      }
      ],
    },
    {
      title: "答人 · 太上隐者",
      art: 'poetry-qianjia:ch39',
      artPrompt: "古诗《答人》意境插画：偶来松树下，高枕石头眠。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "偶来松树下，高枕石头眠。\n山中无历日，寒尽不知年。",
        pinyin: "ǒu lái sōng shù xià， gāo zhěn shí tou mián。\nshān zhōng wú lì rì， hán jìn bù zhī nián。",
        translation: "我偶然来到松树下面，枕着高高的石头睡一觉。山里没有日历，寒冷的日子过完了，也不知道已经到了哪一年。",
      }
      ],
    },
    {
      title: "幸蜀回至剑门 · 李隆基",
      art: 'poetry-qianjia:ch40',
      artPrompt: "古诗《幸蜀回至剑门》意境插画：剑阁横云峻，銮舆出狩回。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "剑阁横云峻，銮舆出狩回。\n翠屏千仞合，丹嶂五丁开。\n灌木萦旗转，仙云拂马来。\n乘时方在德，嗟尔勒铭才。",
        pinyin: "jiàn gé héng yún jùn， luán yú chū shòu huí。\ncuì píng qiān rèn hé， dān zhàng wǔ dīng kāi。\nguàn mù yíng qí zhuǎn， xiān yún fú mǎ lái。\nchéng shí fāng zài dé， jiē ěr lè míng cái。",
        translation: "剑阁高高地横在云端，十分险峻，皇帝的车驾出巡回来了。翠绿的山峰像千仞高的屏风层层合拢，红色的山崖就像被大力士劈开的一样；低矮的树丛绕着行进的旌旗，轻云拂过马前。趁着这样的时势治国要靠德行，你们这些能在石壁上刻字记功的才子真令人赞叹。",
      }
      ],
    },
    {
      title: "和晋陵陆承相 · 杜审言",
      art: 'poetry-qianjia:ch41',
      artPrompt: "古诗《和晋陵陆承相》意境插画：独有宦游人，偏惊物候新。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "独有宦游人，偏惊物候新。\n云霞出海曙，梅柳渡江春。\n淑气催黄鸟，晴光转绿苹。\n忽闻歌古调，归思欲沾巾。",
        pinyin: "dú yǒu huàn yóu rén， piān jīng wù hòu xīn。\nyún xiá chū hǎi shǔ， méi liǔ dù jiāng chūn。\nshū qì cuī huáng niǎo， qíng guāng zhuǎn lǜ píng。\nhū wén gē gǔ tiáo， guī sī yù zhān jīn。",
        translation: "只有出门在外做官的人，才会特别为眼前景物的新变化而吃惊。天亮时云霞从海上升起，梅花杨柳过了江就带来春天；暖和的春气催着黄莺啼叫，晴朗的阳光让水里的青萍轻轻转动。忽然听到你吟出这样的好诗，我的思乡之情涌上来，眼泪都快打湿手巾了。",
      }
      ],
    },
    {
      title: "蓬莱三殿侍宴奉敕咏终南山 · 杜审言",
      art: 'poetry-qianjia:ch42',
      artPrompt: "古诗《蓬莱三殿侍宴奉敕咏终南山》意境插画：北斗挂城边，南山倚殿前。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "北斗挂城边，南山倚殿前。\n云标金阙回，树杪玉堂悬。\n半岭通佳气，中峰绕瑞烟。\n小臣持献寿，长此戴尧天。",
        pinyin: "běi dòu guà chéng biān， nán shān yǐ diàn qián。\nyún biāo jīn quē huí， shù miǎo yù táng xuán。\nbàn lǐng tōng jiā qì， zhōng fēng rào ruì yān。\nxiǎo chén chí xiàn shòu， cháng cǐ dài yáo tiān。",
        translation: "北斗星好像挂在京城边上，终南山就靠在宫殿前面。云里露出金色的宫殿，树梢上像悬着华美的楼阁；半山腰飘着吉祥的雾气，最高的山峰绕着祥瑞的云烟。我这个小臣举杯祝皇上长寿，愿大家永远生活在太平的日子里。",
      }
      ],
    },
    {
      title: "春夜别友人 · 陈子昂",
      art: 'poetry-qianjia:ch43',
      artPrompt: "古诗《春夜别友人》意境插画：银烛吐青烟，金尊对绮筵。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "银烛吐青烟，金尊对绮筵。\n离堂思琴瑟，别路绕山川。\n明月悬高树，长河没晓天。\n悠悠洛阳道，此会在何年。",
        pinyin: "yín zhú tǔ qīng yān， jīn zūn duì qǐ yán。\nlí táng sī qín sè， bié lù rào shān chuān。\nmíng yuè xuán gāo shù， cháng hé méi xiǎo tiān。\nyōu yōu luò yáng dào， cǐ huì zài hé nián。",
        translation: "银色的蜡烛吐着青烟，金杯对着丰盛的酒席。在这离别的厅堂里想起我们的情谊，分别后的路要绕过多少山川。明月挂在高高树梢，银河渐渐消失在天快亮的时候；去洛阳的路那么长，不知哪一年才能再相聚。",
      }
      ],
    },
    {
      title: "长宁公主东庄侍宴 · 李峤",
      art: 'poetry-qianjia:ch44',
      artPrompt: "古诗《长宁公主东庄侍宴》意境插画：别业临青甸，鸣銮降紫霄。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "别业临青甸，鸣銮降紫霄。\n长筵鹓鹭集，仙管凤凰调。\n树接南山近，烟含北渚遥。\n承恩咸已醉，恋赏未还镳。",
        pinyin: "bié yè lín qīng diàn， míng luán jiàng zǐ xiāo。\ncháng yán yuān lù jí， xiān guǎn fèng huáng tiáo。\nshù jiē nán shān jìn， yān hán běi zhǔ yáo。\nchéng ēn xián yǐ zuì， liàn shǎng wèi hái biāo。",
        translation: "美丽的庄园挨着青青的田野，皇帝的车驾从天而降。长长的宴席上大臣们整整齐齐坐在一起，美妙的音乐像凤凰的鸣叫一样动听。绿树连着南山，好像离得很近；烟雾笼罩北边的水洲，又显得那么远。受到恩待的大家都喝醉了，贪恋这里的美景，迟迟舍不得骑马回宫。",
      }
      ],
    },
    {
      title: "恩赐丽正殿书院赐宴应制得林字 · 张说",
      art: 'poetry-qianjia:ch45',
      artPrompt: "古诗《恩赐丽正殿书院赐宴应制得林字》意境插画：东壁图书府，西园翰墨林。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "东壁图书府，西园翰墨林。\n诵诗闻国政，讲易见天心。\n位窃和羹重，恩叨醉酒深。\n载歌春兴曲，情竭为知音。",
        pinyin: "dōng bì tú shū fǔ， xī yuán hàn mò lín。\nsòng shī wén guó zhèng， jiǎng yì jiàn tiān xīn。\nwèi qiè hé gēng zhòng， ēn dāo zuì jiǔ shēn。\nzǎi gē chūn xīng qǔ， qíng jié wèi zhī yīn。",
        translation: "这里像藏满图书的书府，又像长满笔墨文章的园林。在这里读诗能听到治国的道理，讲《易经》能看出上天的用心。我担着重要的职位，又蒙皇上赐宴赐酒；唱着这春天的歌，把满腔心意献给懂我的知音人。",
      }
      ],
    },
    {
      title: "送友人 · 李白",
      art: 'poetry-qianjia:ch46',
      artPrompt: "古诗《送友人》意境插画：青山横北郭，白水绕东城。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "青山横北郭，白水绕东城。\n此地一为别，孤篷万里征。\n浮云游子意，落日故人情。\n挥手自兹去，萧萧斑马鸣。",
        pinyin: "qīng shān héng běi guō， bái shuǐ rào dōng chéng。\ncǐ dì yī wèi bié， gū péng wàn lǐ zhēng。\nfú yún yóu zǐ yì， luò rì gù rén qíng。\nhuī shǒu zì zī qù， xiāo xiāo bān mǎ míng。",
        translation: "青山横亘在城郭的北面，白水环绕着城的东边。在这儿一分别，你就像孤单的蓬草踏上万里旅程；天上的浮云飘忽，像游子的心绪，将落的夕阳迟迟不去，像老朋友的深情。挥手从此告别，连马儿也萧萧嘶鸣，不肯离去。",
      }
      ],
    },
    {
      title: "送友人入蜀 · 李白",
      art: 'poetry-qianjia:ch47',
      artPrompt: "古诗《送友人入蜀》意境插画：见说蚕丛路，崎岖不易行。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "见说蚕丛路，崎岖不易行。\n山从人面起，云傍马头生。\n芳树笼秦栈，春流绕蜀城。\n升沈应已定，不必问君平。",
        pinyin: "jiàn shuō cán cóng lù， qí qū bù yì xíng。\nshān cóng rén miàn qǐ， yún bàng mǎ tóu shēng。\nfāng shù lóng qín zhàn， chūn liú rào shǔ chéng。\nshēng shěn yìng yǐ dìng， bù bì wèn jūn píng。",
        translation: "听说通往蜀地的路，崎岖不平不好走。山从人的面前高高耸起，云在马头边上升起；芳香的树遮着山间栈道，春天的江水绕着蜀地的城。人的际遇早有定数，就不必再去问算卦的人了。",
      }
      ],
    },
    {
      title: "次北固山下 · 王湾",
      art: 'poetry-qianjia:ch48',
      artPrompt: "古诗《次北固山下》意境插画：客路青山外，行舟绿水前。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "客路青山外，行舟绿水前。\n潮平两岸阔，风正一帆悬。\n海日生残夜，江春入旧年。\n乡书何处达，归雁洛阳边。",
        pinyin: "kè lù qīng shān wài， xíng zhōu lǜ shuǐ qián。\ncháo píng liǎng àn kuò， fēng zhèng yī fān xuán。\nhǎi rì shēng cán yè， jiāng chūn rù jiù nián。\nxiāng shū hé chù dá， guī yàn luò yáng biān。",
        translation: "旅客的路伸到青山之外，船儿在绿水上游行。潮水上涨，两岸显得开阔，顺风正好，一面帆高高悬挂；太阳从残夜中升起，江上的春天闯进了旧年。家书要寄到哪里呢？希望北归的大雁把它带到洛阳。",
      }
      ],
    },
    {
      title: "苏氏别业 · 祖咏",
      art: 'poetry-qianjia:ch49',
      artPrompt: "古诗《苏氏别业》意境插画：别业居幽处，到来生隐心。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "别业居幽处，到来生隐心。\n南山当户牖，澧水映园林。\n竹覆经冬雪，庭昏未夕阴。\n寥寥人境外，闲坐听春禽。",
        pinyin: "bié yè jū yōu chù， dào lái shēng yǐn xīn。\nnán shān dāng hù yǒu， lǐ shuǐ yìng yuán lín。\nzhú fù jīng dōng xuě， tíng hūn wèi xī yīn。\nliáo liáo rén jìng wài， xián zuò tīng chūn qín。",
        translation: "这座别墅坐落在幽静的地方，一来到这里就想留下来隐居。南山正对着门窗，河水映照着园林；竹子上还盖着没化的冬雪，天没到傍晚院子就暗下来了。这里安安静静像在尘世之外，正好闲闲地坐着，听春天小鸟的叫声。",
      }
      ],
    },
    {
      title: "春宿左省 · 杜甫",
      art: 'poetry-qianjia:ch50',
      artPrompt: "古诗《春宿左省》意境插画：花隐掖垣暮，啾啾栖鸟过。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "花隐掖垣暮，啾啾栖鸟过。\n星临万户动，月傍九霄多。\n不寝听金钥，因风想玉坷。\n明朝有封事，数问夜如何？",
        pinyin: "huā yǐn yè yuán mù， jiū jiū qī niǎo guò。\nxīng lín wàn hù dòng， yuè bàng jiǔ xiāo duō。\nbù qǐn tīng jīn yào， yīn fēng xiǎng yù kē。\nmíng cháo yǒu fēng shì， shù wèn yè rú hé？",
        translation: "傍晚，花朵隐没在宫墙边，栖宿的鸟儿啾啾地飞过。星光下千家万户好像都在闪动，月亮挨着高高的九重天。我睡不着，好像听见开宫门的钥匙声，又听着风响想起上朝的马饰；明天一早要上书奏事，所以一遍遍问：夜到什么时候了？",
      }
      ],
    },
    {
      title: "题玄武禅师屋壁 · 杜甫",
      art: 'poetry-qianjia:ch51',
      artPrompt: "古诗《题玄武禅师屋壁》意境插画：何年顾虎头，满壁画沧州。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "何年顾虎头，满壁画沧州。\n赤日石林气，青天江海流。\n锡飞常近鹤，杯渡不惊鸥。\n似得庐山路，真随惠远游。",
        pinyin: "hé nián gù hǔ tóu， mǎn bì huà cāng zhōu。\nchì rì shí lín qì， qīng tiān jiāng hǎi liú。\nxī fēi cháng jìn hè， bēi dù bù jīng ōu。\nsì dé lú shān lù， zhēn suí huì yuǎn yóu。",
        translation: "不知是哪一年，画师把这满墙都画成了山水：红红的太阳下石林云气缭绕，青青的天空下江海奔流。画里的高僧拄着锡杖飞过山，乘着木杯渡过水，连鸥鸟都不惊动。看着看着，就像找到了上庐山的路，真的跟着高僧去云游了。",
      }
      ],
    },
    {
      title: "终南山 · 王维",
      art: 'poetry-qianjia:ch52',
      artPrompt: "古诗《终南山》意境插画：太乙近天都，连山到海隅。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "太乙近天都，连山到海隅。\n白云回望合，青霭入看无。\n分野中峰变，阴晴众壑殊。\n欲投何处宿，隔水问樵夫。",
        pinyin: "tài yǐ jìn tiān dōu， lián shān dào hǎi yú。\nbái yún huí wàng hé， qīng ǎi rù kàn wú。\nfēn yě zhōng fēng biàn， yīn qíng zhòng hè shū。\nyù tóu hé chù sù， gé shuǐ wèn qiáo fū。",
        translation: "高高的终南山快挨着天了，连绵的山岭一直伸到海边。回头一看，白云又合拢来；走近去看，青青的雾气却不见了。山峰两边分出不同的天地，各个山谷有阴有晴各不相同。想找个人家投宿，只好隔着溪水，大声问砍柴的人。",
      }
      ],
    },
    {
      title: "登总持阁 · 岑参",
      art: 'poetry-qianjia:ch53',
      artPrompt: "古诗《登总持阁》意境插画：高阁逼诸天，登临近日边。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "高阁逼诸天，登临近日边。\n晴开万井树，愁看五陵烟。\n槛外低秦岭，窗中小渭川。\n早知清净理，常愿奉金仙。",
        pinyin: "gāo gé bī zhū tiān， dēng lín jìn rì biān。\nqíng kāi wàn jǐng shù， chóu kàn wǔ líng yān。\nkǎn wài dī qín lǐng， chuāng zhōng xiǎo wèi chuān。\nzǎo zhī qīng jìng lǐ， cháng yuàn fèng jīn xiān。",
        translation: "这座高阁高得快碰到天，登上去好像来到太阳旁边。晴天里看得到千家万户的绿树，也望得见远处五陵的烟霭；靠着栏杆，秦岭都显得低了，从窗里看，渭水也变得小小的。要是早明白这清净的道理，我愿意常常守着佛像，安安静静过日子。",
      }
      ],
    },
    {
      title: "寄左省杜拾遗 · 岑参",
      art: 'poetry-qianjia:ch54',
      artPrompt: "古诗《寄左省杜拾遗》意境插画：联步趋丹陛，分曹限紫薇。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "联步趋丹陛，分曹限紫薇。\n晓随天仗入，暮惹御香归。\n白发悲花落，青云羡鸟飞。\n圣朝无阙事，自觉谏书稀。",
        pinyin: "lián bù qū dān bì， fēn cáo xiàn zǐ wēi。\nxiǎo suí tiān zhàng rù， mù rě yù xiāng guī。\nbái fà bēi huā luò， qīng yún xiàn niǎo fēi。\nshèng cháo wú quē shì， zì jué jiàn shū xī。",
        translation: "我们并排快步走上红色的宫殿台阶，又在各自的官署里当值。清晨跟着仪仗进宫，傍晚带着御炉的香气回家；白发对着落花悲伤，仰望青天羡慕鸟儿自由飞翔。圣明的朝廷没有什么缺失的事，我也觉得劝谏的奏章越来越少了。",
      }
      ],
    },
    {
      title: "登兖州城楼 · 杜甫",
      art: 'poetry-qianjia:ch55',
      artPrompt: "古诗《登兖州城楼》意境插画：东郡趋庭日，南楼纵目初。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "东郡趋庭日，南楼纵目初。\n浮云连海岱，平野入青徐。\n孤嶂秦碑在，荒城鲁殿余。\n从来多古意，临眺独踌躇。",
        pinyin: "dōng jùn qū tíng rì， nán lóu zòng mù chū。\nfú yún lián hǎi dài， píng yě rù qīng xú。\ngū zhàng qín bēi zài， huāng chéng lǔ diàn yú。\ncóng lái duō gǔ yì， lín tiào dú chóu chú。",
        translation: "我来到东边这座城，趁着探望父亲的日子，第一次登上南楼向远处望。浮云连着大海和高山，平坦的原野一直伸向远方；孤峰上还立着古老的石碑，荒凉的城里留着旧宫殿的遗迹。这里从来就有许多古迹让人怀想，我望着望着，独自久久徘徊。",
      }
      ],
    },
    {
      title: "杜少府之任蜀州 · 王勃",
      art: 'poetry-qianjia:ch56',
      artPrompt: "古诗《杜少府之任蜀州》意境插画：城阙辅三秦，风烟望五津。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "城阙辅三秦，风烟望五津。\n与君离别意，同是宦游人。\n海内存知己，天涯若比邻。\n无为在歧路，儿女共沾巾。",
        pinyin: "chéng quē fǔ sān qín， fēng yān wàng wǔ jīn。\nyǔ jūn lí bié yì， tóng shì huàn yóu rén。\nhǎi nèi cún zhī jǐ， tiān yá ruò bǐ lín。\nwú wéi zài qí lù， ér nǚ gòng zhān jīn。",
        translation: "京城长安被三秦大地护卫着，透过风尘烟雾，能望见你去的蜀地渡口。我和你离别时心情一样，因为我们都是出门做事的人。只要四海之内有知心的朋友，就是在天边也像住在隔壁；所以我们不要在分手的路口，像小孩子一样哭湿了手帕。",
      }
      ],
    },
    {
      title: "送崔融 · 杜审言",
      art: 'poetry-qianjia:ch57',
      artPrompt: "古诗《送崔融》意境插画：君王行出将，书记远从征。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "君王行出将，书记远从征。\n祖帐连河阙，军麾动洛城。\n旌旗朝朔气，笳吹夜边声。\n坐觉烟尘少，秋风古北平。",
        pinyin: "jūn wáng xíng chū jiāng， shū jì yuǎn cóng zhēng。\nzǔ zhàng lián hé quē， jūn huī dòng luò chéng。\njīng qí cháo shuò qì， jiā chuī yè biān shēng。\nzuò jué yān chén shǎo， qiū fēng gǔ běi píng。",
        translation: "君王派大将出征，你也要远远跟着军队出发。送行的帐篷连着京城，飘动的军旗震动了洛阳城。清晨旌旗迎着寒气，夜里笳吹响起边地的声音；很快烽烟就会变少，秋风将吹遍安定的北方。",
      }
      ],
    },
    {
      title: "扈从登封途中作 · 宋之问",
      art: 'poetry-qianjia:ch58',
      artPrompt: "古诗《扈从登封途中作》意境插画：帐殿郁崔嵬，仙游实壮哉！——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "帐殿郁崔嵬，仙游实壮哉！\n晓云连幕卷，夜火杂星回。\n谷暗千旗出，山鸣万乘来。\n扈从良可赋，终乏掞天才。",
        pinyin: "zhàng diàn yù cuī wéi， xiān yóu shí zhuàng zāi！\nxiǎo yún lián mù juàn， yè huǒ zá xīng huí。\ngǔ àn qiān qí chū， shān míng wàn shèng lái。\nhù cóng liáng kě fù， zhōng fá yàn tiān cái。",
        translation: "皇帝路上的营帐高大雄伟，这次随驾出行真是壮观！早晨的云彩像帷幕一样卷起，夜里的灯火和天上的星星混在一起；山谷昏暗处飘出千面旗帜，山鸣谷应，大队人马浩浩荡荡走来。我跟着写诗赞美，只恨自己的才气不够。",
      }
      ],
    },
    {
      title: "题义公禅房 · 孟浩然",
      art: 'poetry-qianjia:ch59',
      artPrompt: "古诗《题义公禅房》意境插画：义公习禅寂，结宇依空林。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "义公习禅寂，结宇依空林。\n户外一峰秀，阶前众壑深。\n夕阳连雨足，空翠落庭阴。\n看取莲花净，方知不染心。",
        pinyin: "yì gōng xí chán jì， jié yǔ yī kōng lín。\nhù wài yī fēng xiù， jiē qián zhòng hè shēn。\nxī yáng lián yǔ zú， kōng cuì luò tíng yīn。\nkàn qǔ lián huā jìng， fāng zhī bù rǎn xīn。",
        translation: "义公喜欢安安静静地修行，把小屋建在空静的树林旁。门外一座山峰秀丽，台阶前千沟万壑深深；夕阳和雨后的水汽连在一起，青翠的山色落满庭院。看那莲花多么干净，才明白什么是颗不被沾染的心。",
      }
      ],
    },
    {
      title: "醉后赠张九旭 · 高适",
      art: 'poetry-qianjia:ch60',
      artPrompt: "古诗《醉后赠张九旭》意境插画：世上漫相识，此翁殊不然。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "世上漫相识，此翁殊不然。\n兴来书自圣，醉后语尤颠。\n白发老闲事，青云在目前。\n床头一壶酒，能更几回眠。",
        pinyin: "shì shàng màn xiāng shí， cǐ wēng shū bù rán。\nxīng lái shū zì shèng， zuì hòu yǔ yóu diān。\nbái fà lǎo xián shì， qīng yún zài mù qián。\nchuáng tóu yī hú jiǔ， néng gèng jǐ huí mián。",
        translation: "世上的人忙忙碌碌爱结交应酬，这位老爷爷却完全不一样。兴致一来，提笔写出的字就像神来之笔；喝醉以后，说起话来更加癫狂。他白发苍苍，悠闲地过日子，高官厚禄摆在眼前也不放在心上；只要床头有一壶酒，还能安安心心再睡上几场好觉。",
      }
      ],
    },
    {
      title: "玉台观 · 高适",
      art: 'poetry-qianjia:ch61',
      artPrompt: "古诗《玉台观》意境插画：浩劫因王造，平台访古游。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "浩劫因王造，平台访古游。\n彩云萧史驻，文字鲁恭留。\n宫阙通群帝，乾坤到十洲。\n人传有笙鹤，时过北山头。",
        pinyin: "hào jié yīn wáng zào， píng tái fǎng gǔ yóu。\ncǎi yún xiāo shǐ zhù， wén zì lǔ gōng liú。\ngōng quē tōng qún dì， qián kūn dào shí zhōu。\nrén chuán yǒu shēng hè， shí guò běi shān tóu。",
        translation: "这座高高的楼观是王爷建造的，我登上平台来寻访古迹。彩云像在檐前停驻，墙壁上还留着古老的题字；楼高得仿佛通到天上的仙人那里，放眼望去天地广阔无边。人们传说常有骑着仙鹤的仙人，从北山顶上飞过。",
      }
      ],
    },
    {
      title: "观李固请司马弟山水图 · 杜甫",
      art: 'poetry-qianjia:ch62',
      artPrompt: "古诗《观李固请司马弟山水图》意境插画：方丈浑连水，天台总映云。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "方丈浑连水，天台总映云。\n人间长见画，老去限空闻。\n范蠡舟偏小，王乔鹤不群。\n此生随万物，何处出尘氛。",
        pinyin: "fāng zhàng hún lián shuǐ， tiān tái zǒng yìng yún。\nrén jiān cháng jiàn huà， lǎo qù xiàn kōng wén。\nfàn lí zhōu piān xiǎo， wáng qiáo hè bù qún。\ncǐ shēng suí wàn wù， hé chù chū chén fēn。",
        translation: "画上的仙山好像连着大海，山顶总映着云霞。这样的美景，人老了只能对着画看看，空空地向往；画里的小船小小的，一只仙鹤高高飞着，和别的鸟都不一样。这一生跟着万物漂来漂去，要到哪儿才能走出这纷纷扰扰的尘世呢？",
      }
      ],
    },
    {
      title: "旅夜书怀 · 杜甫",
      art: 'poetry-qianjia:ch63',
      artPrompt: "古诗《旅夜书怀》意境插画：细草微风岸，危樯独夜舟。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "细草微风岸，危樯独夜舟。\n星垂平野阔，月涌大江流。\n名岂文章著，官因老病休。\n飘飘何所似，天地一沙鸥。",
        pinyin: "xì cǎo wēi fēng àn， wēi qiáng dú yè zhōu。\nxīng chuí píng yě kuò， yuè yǒng dà jiāng liú。\nmíng qǐ wén zhāng zhù， guān yīn lǎo bìng xiū。\npiāo piāo hé suǒ sì， tiān dì yī shā ōu。",
        translation: "微风拂着岸边的细草，夜里高高的桅杆下只泊着我一条孤舟；星星低垂，平野格外开阔，月亮涌动，大江滚滚奔流。名声哪里是靠文章得来的？做官也因为年老多病罢了休。飘飘荡荡的我，就像天地间一只小小的沙鸥。",
      }
      ],
    },
    {
      title: "登岳阳楼 · 杜甫",
      art: 'poetry-qianjia:ch64',
      artPrompt: "古诗《登岳阳楼》意境插画：昔闻洞庭水，今上岳阳楼。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "昔闻洞庭水，今上岳阳楼。\n吴楚东南坼，乾坤日月浮。\n亲朋无一字，老病有孤舟。\n戎马关山北，凭轩涕泗流。",
        pinyin: "xī wén dòng tíng shuǐ， jīn shàng yuè yáng lóu。\nwú chǔ dōng nán chè， qián kūn rì yuè fú。\nqīn péng wú yī zì， lǎo bìng yǒu gū zhōu。\nróng mǎ guān shān běi， píng xuān tì sì liú。",
        translation: "从前只听说过洞庭湖的大水，今天我终于登上了岳阳楼。大水把吴楚两地分成东西，日月星辰都好像浮在水面上。亲戚朋友一个音信也没有，我又老又病，只有一条孤舟；北方还在打仗，我靠着栏杆忍不住流下眼泪。",
      }
      ],
    },
    {
      title: "江南旅情 · 祖咏",
      art: 'poetry-qianjia:ch65',
      artPrompt: "古诗《江南旅情》意境插画：楚山不可极，归路但萧条。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "楚山不可极，归路但萧条。\n海色晴看雨，江声夜听潮。\n剑留南斗近，书寄北风遥。\n为报空潭橘，无媒寄洛桥。",
        pinyin: "chǔ shān bù kě jí， guī lù dàn xiāo tiáo。\nhǎi sè qíng kàn yǔ， jiāng shēng yè tīng cháo。\njiàn liú nán dòu jìn， shū jì běi fēng yáo。\nwèi bào kōng tán jú， wú méi jì luò qiáo。",
        translation: "楚地的山望不到尽头，回家的路上只见一片冷清。晴天看海那边一会儿晴一会儿雨，夜里听江上潮水的声音；宝剑带在身边，家书却要靠远远的北风捎去。这里也有好吃的橘子想送给家里人，可惜没有人替我捎到洛阳去。",
      }
      ],
    },
    {
      title: "宿龙兴寺 · 綦毋潜",
      art: 'poetry-qianjia:ch66',
      artPrompt: "古诗《宿龙兴寺》意境插画：香刹夜忘归，松清古殿扉。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "香刹夜忘归，松清古殿扉。\n灯明方丈室，珠系比丘衣。\n白日传心净，青莲喻法微。\n天花落不尽，处处鸟衔飞。",
        pinyin: "xiāng chà yè wàng guī， sōng qīng gǔ diàn fēi。\ndēng míng fāng zhàng shì， zhū xì bǐ qiū yī。\nbái rì chuán xīn jìng， qīng lián yù fǎ wēi。\ntiān huā luò bù jìn， chù chù niǎo xián fēi。",
        translation: "晚上住在这香火缭绕的寺庙里，忘了回家，清清的松树掩着古殿的门。灯光照亮小小的僧房，念珠挂在僧人的衣上；白天里见僧人心地纯净，讲起佛法像青莲一样美妙。天花好像落也落不完，小鸟衔着花瓣到处飞。",
      }
      ],
    },
    {
      title: "破山寺后禅院 · 常建",
      art: 'poetry-qianjia:ch67',
      artPrompt: "古诗《破山寺后禅院》意境插画：清晨入古寺，初日照高林。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "清晨入古寺，初日照高林。\n曲径通幽处，禅房花木深。\n山光悦鸟性，潭影空人心。\n万籁此俱寂，惟闻钟磬音。",
        pinyin: "qīng chén rù gǔ sì， chū rì zhào gāo lín。\nqū jìng tōng yōu chù， chán fáng huā mù shēn。\nshān guāng yuè niǎo xìng， tán yǐng kōng rén xīn。\nwàn lài cǐ jù jì， wéi wén zhōng qìng yīn。",
        translation: "清晨走进古老的寺院，初升的太阳照着高高的树林。弯弯的小路通到幽静的地方，禅师住的小屋藏在花木深处。山间的美景让鸟儿欢叫，清清潭水的倒影让人的心一片安宁。这里什么声音都静了下来，只听见悠悠的钟磬声。",
      }
      ],
    },
    {
      title: "题松汀驿 · 张佑",
      art: 'poetry-qianjia:ch68',
      artPrompt: "古诗《题松汀驿》意境插画：山色远含空，苍茫泽国东。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "山色远含空，苍茫泽国东。\n海明先见日，江白迥闻风。\n鸟道高原去，人烟小径通。\n那知旧遗逸，不在五湖中。",
        pinyin: "shān sè yuǎn hán kōng， cāng máng zé guó dōng。\nhǎi míng xiān jiàn rì， jiāng bái jiǒng wén fēng。\nniǎo dào gāo yuán qù， rén yān xiǎo jìng tōng。\nnà zhī jiù yí yì， bù zài wǔ hú zhōng。",
        translation: "远远的山色连着天空，茫茫的水乡在东边铺开。海上先亮起来，最早见到太阳；江面白茫茫，远远就听见风声。只有鸟儿飞的小路通向高原，人家的小路弯弯相通；想不到那些躲避尘世的高人，并不住在这五湖一带。",
      }
      ],
    },
    {
      title: "圣果寺 · 释处默",
      art: 'poetry-qianjia:ch69',
      artPrompt: "古诗《圣果寺》意境插画：路自中峰上，盘回出薜萝。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "路自中峰上，盘回出薜萝。\n到江吴地尽，隔岸越山多。\n古木丛青蔼，遥天浸白波。\n下方城郭近，钟磬杂笙歌。",
        pinyin: "lù zì zhōng fēng shàng， pán huí chū bì luó。\ndào jiāng wú dì jìn， gé àn yuè shān duō。\ngǔ mù cóng qīng ǎi， yáo tiān jìn bái bō。\nxià fāng chéng guō jìn， zhōng qìng zá shēng gē。",
        translation: "上山的路从最高的山峰盘旋而上，长满青青的藤萝。走到江边就是吴地的尽头，隔江的岸边越地的山很多；古老的树丛冒着青青的雾气，远处的天边浸着白色的波浪。往下看山下的城郭很近，寺里的钟磬声混着城里的笙歌传上来。",
      }
      ],
    },
    {
      title: "野望 · 王绩",
      art: 'poetry-qianjia:ch70',
      artPrompt: "古诗《野望》意境插画：东皋薄暮望，徙倚欲何依。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "东皋薄暮望，徙倚欲何依。\n树树皆秋色，山山惟落晖。\n牧人驱犊返，猎马带禽归。\n相顾无相识，长歌怀采薇。",
        pinyin: "dōng gāo bó mù wàng， xǐ yǐ yù hé yī。\nshù shù jiē qiū sè， shān shān wéi luò huī。\nmù rén qū dú fǎn， liè mǎ dài qín guī。\nxiāng gù wú xiāng shí， cháng gē huái cǎi wēi。",
        translation: "太阳快落山了，我在村东头望着远方，走来走去心里没个着落。每棵树都染上秋天的颜色，每座山都披着落日的余晖；放牛的人赶着小牛回家，打猎的人骑马带着猎物归来。大家互相望望，没有一个认识我的人，我只好放声唱歌，想念古代那些隐居的朋友。",
      }
      ],
    },
    {
      title: "送著作佐郎崔融等从梁王东征 · 陈子昂",
      art: 'poetry-qianjia:ch71',
      artPrompt: "古诗《送著作佐郎崔融等从梁王东征》意境插画：金天方肃杀，白露始专征。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "金天方肃杀，白露始专征。\n王师非乐战，之子慎佳兵。\n海气侵南部，边风扫北平。\n莫卖卢龙塞，归邀麟阁名。",
        pinyin: "jīn tiān fāng sù shā， bái lù shǐ zhuān zhēng。\nwáng shī fēi lè zhàn， zhī zǐ shèn jiā bīng。\nhǎi qì qīn nán bù， biān fēng sǎo běi píng。\nmò mài lú lóng sāi， guī yāo lín gé míng。",
        translation: "秋天刚到，白露时节，大军就要出发远征了。我们的军队不是为了喜欢打仗，将士们用兵可要小心谨慎；海上的雾气漫向南方边疆，北方的风扫过边远的城塞。千万别把守着的关口丢了，只为回来讨一个功劳的名声啊。",
      }
      ],
    },
    {
      title: "携妓纳凉晚际遇雨（其一） · 杜甫",
      art: 'poetry-qianjia:ch72',
      artPrompt: "古诗《携妓纳凉晚际遇雨（其一）》意境插画：落日放船好，轻风生浪迟。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "落日放船好，轻风生浪迟。\n竹深留客处，荷净纳凉时。\n公子调冰水，佳人雪藕丝。\n片云头上黑，应是雨催诗。",
        pinyin: "luò rì fàng chuán hǎo， qīng fēng shēng làng chí。\nzhú shēn liú kè chù， hé jìng nà liáng shí。\ngōng zǐ tiáo bīng shuǐ， jiā rén xuě ǒu sī。\npiàn yún tóu shàng hēi， yìng shì yǔ cuī shī。",
        translation: "太阳快落山时乘船出游最舒服，轻轻的风让水面慢慢起了小浪。竹林深处正好留客人歇脚，干干净净的荷花塘边正是乘凉的好时候。公子调好了冰水，美人剥开雪白的藕丝，这时头顶飘来一朵黑云，大概是雨在催人写诗呢。",
      }
      ],
    },
    {
      title: "携妓纳凉晚际遇雨（其二） · 杜甫",
      art: 'poetry-qianjia:ch73',
      artPrompt: "古诗《携妓纳凉晚际遇雨（其二）》意境插画：雨来沾席上，风急打船头。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "雨来沾席上，风急打船头。\n越女红裙湿，燕姬翠黛愁。\n缆侵堤柳系，幔卷浪花浮。\n归路翻萧飒，陂塘五月秋。",
        pinyin: "yǔ lái zhān xí shàng， fēng jí dǎ chuán tóu。\nyuè nǚ gōng qún shī， yàn jī cuì dài chóu。\nlǎn qīn dī liǔ xì， màn juàn làng huā fú。\nguī lù fān xiāo sà， bēi táng wǔ yuè qiū。",
        translation: "雨点落下来打湿了席子，急风呼呼地吹着船头。姑娘们的红裙子被淋湿了，皱着眉头发起愁来；船缆拴在堤边的柳树上，帘幔卷起，浪花在船边漂动。回家的路上风雨一片萧瑟，五月的池塘竟变得像秋天一样凉。",
      }
      ],
    },
    {
      title: "宿云门寺阁 · 孙逖",
      art: 'poetry-qianjia:ch74',
      artPrompt: "古诗《宿云门寺阁》意境插画：香阁东山下，烟花象外幽。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "香阁东山下，烟花象外幽。\n悬灯千嶂夕，卷幔五湖秋。\n画壁余鸿雁，纱窗宿斗牛。\n更疑天路近，梦与白云游。",
        pinyin: "xiāng gé dōng shān xià， yān huā xiàng wài yōu。\nxuán dēng qiān zhàng xī， juàn màn wǔ hú qiū。\nhuà bì yú hóng yàn， shā chuāng sù dòu niú。\ngèng yí tiān lù jìn， mèng yǔ bái yún yóu。",
        translation: "香火的寺阁在东山下面，雾气缭绕，幽静得像在人间之外。夜里点起灯，照着千山万岭；卷起窗帘，望见五湖的秋色。旧墙上画着大雁，纱窗边好像挨着天上的星星；我疑心上天的路就在近旁，梦里也和白云一起遨游。",
      }
      ],
    },
    {
      title: "秋登宣城谢眺北楼 · 李白",
      art: 'poetry-qianjia:ch75',
      artPrompt: "古诗《秋登宣城谢眺北楼》意境插画：江城如画里，山晚望晴空。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "江城如画里，山晚望晴空。\n两水夹明镜，双桥落彩虹。\n人烟寒橘柚，秋色老梧桐。\n谁念北楼上，临风怀谢公。",
        pinyin: "jiāng chéng rú huà lǐ， shān wǎn wàng qíng kōng。\nliǎng shuǐ jiá míng jìng， shuāng qiáo luò cǎi hóng。\nrén yān hán jú yòu， qiū sè lǎo wú tóng。\nshuí niàn běi lóu shàng， lín fēng huái xiè gōng。",
        translation: "江边的城像在画里一样美，傍晚的山上映着晴朗的天空。两条河像两面明镜，两座桥像落下的彩虹；寒烟里橘柚的叶子带着凉意，秋色让梧桐渐渐老了。谁想起这北楼上，我正迎着风，怀念从前住过这里的谢公。",
      }
      ],
    },
    {
      title: "临洞庭 · 孟浩然",
      art: 'poetry-qianjia:ch76',
      artPrompt: "古诗《临洞庭》意境插画：八月湖水平，涵虚混太清。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "八月湖水平，涵虚混太清。\n气蒸云梦泽，波撼岳阳城。\n欲济无舟楫，端居耻圣明。\n坐观垂钓者，徒有羡鱼情。",
        pinyin: "bā yuè hú shuǐ píng， hán xū hùn tài qīng。\nqì zhēng yún mèng zé， bō hàn yuè yáng chéng。\nyù jì wú zhōu jí， duān jū chǐ shèng míng。\nzuò guān chuí diào zhě， tú yǒu xiàn yú qíng。",
        translation: "八月的洞庭湖水涨得又平又满，湖水跟天空混成一片。水汽腾腾罩着云梦大泽，波浪滚滚像要撼动岳阳城。想渡过湖去却没有船，闲待着又觉得对不起这好时代；看着湖边钓鱼的人，心里只有羡慕的份儿。",
      }
      ],
    },
    {
      title: "过香积寺 · 王维",
      art: 'poetry-qianjia:ch77',
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
      title: "送郑侍御谪闽中 · 高适",
      art: 'poetry-qianjia:ch78',
      artPrompt: "古诗《送郑侍御谪闽中》意境插画：谪去君无恨，闽中我旧过。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "谪去君无恨，闽中我旧过。\n大都秋雁少，只是夜猿多。\n东路云山合，南天瘴疠和。\n自当逢雨露，行矣顺风波。",
        pinyin: "zhé qù jūn wú hèn， mǐn zhōng wǒ jiù guò。\ndà dōu qiū yàn shǎo， zhǐ shì yè yuán duō。\ndōng lù yún shān hé， nán tiān zhàng lì hé。\nzì dāng féng yǔ lù， xíng yǐ shùn fēng bō。",
        translation: "你被贬到远方去，请不要难过，那个地方我从前去过。那里秋天大雁来得少，夜里猿猴的叫声特别多；往东走云和山连成一片，南方天气又湿又热。你自然会遇上雨露般的恩典，放心去吧，一路顺风。",
      }
      ],
    },
    {
      title: "秦州杂诗 · 杜甫",
      art: 'poetry-qianjia:ch79',
      artPrompt: "古诗《秦州杂诗》意境插画：凤林戈未息，鱼海路常难。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "凤林戈未息，鱼海路常难。\n候火云峰峻，悬军幕井干。\n风连西极动，月过北庭寒。\n故老思飞将，何时议筑坛。",
        pinyin: "fèng lín gē wèi xī， yú hǎi lù cháng nán。\nhòu huǒ yún fēng jùn， xuán jūn mù jǐng gān。\nfēng lián xī jí dòng， yuè guò běi tíng hán。\ngù lǎo sī fēi jiāng， hé shí yì zhù tán。",
        translation: "边关的战火还没有停息，通向鱼海的路总是难走。烽火台高高立在云峰上，孤军在野外，营里的水井都干了；大风吹得西边天摇地动，月亮照过北庭，一片寒气。老人们都想念那位飞将军，什么时候才有人挂帅，把敌人打退呢？",
      }
      ],
    },
    {
      title: "禹庙 · 杜甫",
      art: 'poetry-qianjia:ch80',
      artPrompt: "古诗《禹庙》意境插画：禹庙空山里，秋风落日斜。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "禹庙空山里，秋风落日斜。\n荒庭垂橘柚，古屋画龙蛇。\n云气生虚壁，江深走白沙。\n早知乘四载，疏凿控三巴。",
        pinyin: "yǔ miào kōng shān lǐ， qiū fēng luò rì xié。\nhuāng tíng chuí jú yòu， gǔ wū huà lóng shé。\nyún qì shēng xū bì， jiāng shēn zǒu bái shā。\nzǎo zhī chéng sì zǎi， shū záo kòng sān bā。",
        translation: "大禹的庙宇坐落在空空的山里，秋风把落日吹斜了。荒凉的院子里挂着橘子柚子，古老的屋墙上画着龙和蛇；云气从空空的石壁间升起，深深的江水卷着白沙奔流。想起大禹当年乘着各种车船四处奔走治水，开山凿河，管住了这一带的江水。",
      }
      ],
    },
    {
      title: "望秦川 · 李颀",
      art: 'poetry-qianjia:ch81',
      artPrompt: "古诗《望秦川》意境插画：秦川朝望迥，日出正东峰。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "秦川朝望迥，日出正东峰。\n远近山河净，逶迤城阙重。\n秋声万户竹，寒色五陵松。\n有客归欤叹，凄其霜露浓。",
        pinyin: "qín chuān cháo wàng jiǒng， rì chū zhèng dōng fēng。\nyuǎn jìn shān hé jìng， wēi yí chéng quē zhòng。\nqiū shēng wàn hù zhú， hán sè wǔ líng sōng。\nyǒu kè guī yú tàn， qī qí shuāng lù nóng。",
        translation: "清早眺望秦川，大地那么辽远，太阳正从东边的山峰上升起。远远近近的山河一片明净，弯弯曲曲的城墙宫殿重重叠叠；秋风在千家万户的竹林里响，寒气落在五陵的松树上。我这个客子想回家了，叹着气，只觉得霜露越来越浓。",
      }
      ],
    },
    {
      title: "同王征君洞庭有怀 · 张谓",
      art: 'poetry-qianjia:ch82',
      artPrompt: "古诗《同王征君洞庭有怀》意境插画：八月洞庭秋，潇湘水北流。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "八月洞庭秋，潇湘水北流。\n还家万里梦，为客五更愁。\n不用开书帙，偏宜上酒楼。\n故人京洛满，何日复同游。",
        pinyin: "bā yuè dòng tíng qiū， xiāo xiāng shuǐ běi liú。\nhái jiā wàn lǐ mèng， wèi kè wǔ gēng chóu。\nbù yòng kāi shū zhì， piān yí shàng jiǔ lóu。\ngù rén jīng luò mǎn， hé rì fù tóng yóu。",
        translation: "八月的洞庭湖一片秋色，潇湘的水向北流去。梦里回了一趟万里外的家，醒来做客的愁一直缠到五更；不想打开书来读，只想登上酒楼去喝一杯。京城和洛阳满是老朋友，可哪一天才能再一起同游呢？",
      }
      ],
    },
    {
      title: "渡扬子江 · 丁仙芝",
      art: 'poetry-qianjia:ch83',
      artPrompt: "古诗《渡扬子江》意境插画：桂楫中流望，空波两岸明。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "桂楫中流望，空波两岸明。\n林开扬子驿，山出润州城。\n海尽边阴静，江寒朔吹生。\n更闻枫叶下，淅沥度秋声。",
        pinyin: "guì jí zhōng liú wàng， kōng bō liǎng àn míng。\nlín kāi yáng zǐ yì， shān chū rùn zhōu chéng。\nhǎi jìn biān yīn jìng， jiāng hán shuò chuī shēng。\ngèng wén fēng yè xià， xī lì dù qiū shēng。",
        translation: "我摇着小船到江中心眺望，空阔的水波把两岸照得发亮。树林展开的地方是扬子驿站，山露出来的地方是润州城；海的尽头一片安静，江上寒气里北风吹起。又听见枫叶飘落，淅淅沥沥，到处都是秋天的声音。",
      }
      ],
    },
    {
      title: "幽州夜歌 · 张说",
      art: 'poetry-qianjia:ch84',
      artPrompt: "古诗《幽州夜歌》意境插画：凉风吹夜雨，萧瑟动寒林。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "凉风吹夜雨，萧瑟动寒林。\n正有高堂宴，能忘迟暮心。\n军中宜剑舞，塞上重笳音。\n不作边城将，谁知恩遇深。",
        pinyin: "liáng fēng chuī yè yǔ， xiāo sè dòng hán lín。\nzhèng yǒu gāo táng yàn， néng wàng chí mù xīn。\njūn zhōng yí jiàn wǔ， sài shàng zhòng jiā yīn。\nbù zuò biān chéng jiāng， shuí zhī ēn yù shēn。",
        translation: "凉风吹着夜里的雨，沙沙地吹动着寒林。军帐里正摆着热闹的酒宴，可还是忘不了渐渐老去的愁；军中正适合舞剑助兴，边塞上最动人的是笳声。要是不来做这守边城的将军，谁能知道皇上恩待之深呢？",
      }
      ],
    },
    {
      title: "春日偶成 · 程颢",
      art: 'poetry-qianjia:ch85',
      artPrompt: "古诗《春日偶成》意境插画：云淡风轻近午天，傍花随柳过前川。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "云淡风轻近午天，傍花随柳过前川。\n时人不识余心乐，将谓偷闲学少年。",
        pinyin: "yún dàn fēng qīng jìn wǔ tiān， bàng huā suí liǔ guò qián chuān。\nshí rén bù shí yú xīn lè， jiāng wèi tōu xián xué shào nián。",
        translation: "淡淡的云、轻轻的风，快到中午了，我沿着花丛、穿过柳林，慢慢走过前面的河。旁人不懂我心里有多快乐，还以为我是学小孩子偷偷跑出来玩呢。",
      }
      ],
    },
    {
      title: "春日 · 朱熹",
      art: 'poetry-qianjia:ch86',
      artPrompt: "古诗《春日》意境插画：胜日寻芳泗水滨，无边光景一时新。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "胜日寻芳泗水滨，无边光景一时新。\n等闲识得东风面，万紫千红总是春。",
        pinyin: "shèng rì xún fāng sì shuǐ bīn， wú biān guāng jǐng yī shí xīn。\nděng xián shí dé dōng fēng miàn， wàn zǐ qiān hóng zǒng shì chūn。",
        translation: "风和日丽的好日子，我到水边去寻找美景，眼前的风光一下子焕然一新。随随便便就能认出春风的面孔，这万紫千红，到处都是春天。",
      }
      ],
    },
    {
      title: "春宵 · 苏轼",
      art: 'poetry-qianjia:ch87',
      artPrompt: "古诗《春宵》意境插画：春宵一刻值千金，花有清香月有阴。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "春宵一刻值千金，花有清香月有阴。\n歌管楼台声细细，秋千院落夜沈沈。",
        pinyin: "chūn xiāo yī kè zhí qiān jīn， huā yǒu qīng xiāng yuè yǒu yīn。\ngē guǎn lóu tái shēng xì xì， qiū qiān yuàn luò yè shěn shěn。",
        translation: "春天的夜晚，一小会儿都像千金一样宝贵，花儿散着清香，月亮照出花影。楼台上隐隐传来轻轻的歌声乐声，院子里挂着秋千，夜色安安静静。",
      }
      ],
    },
    {
      title: "城东早春 · 杨巨源",
      art: 'poetry-qianjia:ch88',
      artPrompt: "古诗《城东早春》意境插画：诗家清景在新春，绿柳才黄半未匀。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "诗家清景在新春，绿柳才黄半未匀。\n若待上林花似锦，出门俱是看花人。",
        pinyin: "shī jiā qīng jǐng zài xīn chūn， lǜ liǔ cái huáng bàn wèi yún。\nruò dài shàng lín huā sì jǐn， chū mén jù shì kàn huā rén。",
        translation: "诗人最喜欢的清新景色就在早春，绿柳才冒出嫩黄的芽，颜色深深浅浅还没均匀。要是等到花园里花开得像锦缎一样，出门就到处都是看花的人啦。",
      }
      ],
    },
    {
      title: "春夜 · 王安石",
      art: 'poetry-qianjia:ch89',
      artPrompt: "古诗《春夜》意境插画：金炉香烬漏声残，剪剪轻风阵阵寒。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "金炉香烬漏声残，剪剪轻风阵阵寒。\n春色恼人眠不得，月移花影上栏杆。",
        pinyin: "jīn lú xiāng jìn lòu shēng cán， jiǎn jiǎn qīng fēng zhèn zhèn hán。\nchūn sè nǎo rén mián bù dé， yuè yí huā yǐng shàng lán gān。",
        translation: "香炉里的香快烧完了，计时的滴漏声也稀了，一阵阵轻风带着微微的寒意。春夜的美景撩得人睡不着觉，只见月亮把花的影子慢慢移上了栏杆。",
      }
      ],
    },
    {
      title: "初春小雨 · 韩愈",
      art: 'poetry-qianjia:ch90',
      artPrompt: "古诗《初春小雨》意境插画：天街小雨润如酥，草色遥看近却无。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "天街小雨润如酥，草色遥看近却无。\n最是一年春好处，绝胜烟柳满皇都。",
        pinyin: "tiān jiē xiǎo yǔ rùn rú sū， cǎo sè yáo kàn jìn què wú。\nzuì shì yī nián chūn hǎo chù， jué shèng yān liǔ mǎn huáng dōu。",
        translation: "京城街道上下着小雨，滋润得像奶油一样，远远望去草色一片淡绿，走近了却看不清。这才是一年里春光最好的时候，远远胜过柳絮如烟罩满全城的暮春。",
      }
      ],
    },
    {
      title: "元日 · 王安石",
      art: 'poetry-qianjia:ch91',
      artPrompt: "古诗《元日》意境插画：爆竹声中一岁除，春风送暖入屠苏。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "爆竹声中一岁除，春风送暖入屠苏。\n千门万户曈曈日，总把新桃换旧符。",
        pinyin: "bào zhú shēng zhōng yī suì chú， chūn fēng sòng nuǎn rù tú sū。\nqiān mén wàn hù tóng tóng rì， zǒng bǎ xīn táo huàn jiù fú。",
        translation: "在爆竹声里，旧的一年过去了，春风把暖意送来，人们高高兴兴喝着屠苏酒。初升的太阳照得千家万户亮堂堂，家家都取下旧桃符，换上新桃符。",
      }
      ],
    },
    {
      title: "上元侍宴 · 苏轼",
      art: 'poetry-qianjia:ch92',
      artPrompt: "古诗《上元侍宴》意境插画：淡月疏星绕建章，仙风吹下御炉香。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "淡月疏星绕建章，仙风吹下御炉香。\n侍臣鹄立通明殿，一朵红云捧玉皇。",
        pinyin: "dàn yuè shū xīng rào jiàn zhāng， xiān fēng chuī xià yù lú xiāng。\nshì chén hú lì tōng míng diàn， yī duǒ hóng yún pěng yù huáng。",
        translation: "元宵节的晚上，淡淡的月亮和稀疏的星星绕着皇宫，风把宫里香炉的香气吹下来。侍候的臣子们笔直地站在通明殿前，就像一片红云捧着皇上一样。",
      }
      ],
    },
    {
      title: "立春偶成 · 张栻",
      art: 'poetry-qianjia:ch93',
      artPrompt: "古诗《立春偶成》意境插画：律回岁晚冰霜少，春到人间草木知。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "律回岁晚冰霜少，春到人间草木知。\n便觉眼前生意满，东风吹水绿参差。",
        pinyin: "lǜ huí suì wǎn bīng shuāng shǎo， chūn dào rén jiān cǎo mù zhī。\nbiàn jué yǎn qián shēng yì mǎn， dōng fēng chuī shuǐ lǜ cēn cī。",
        translation: "节气转了一圈又回到春天，年底的冰霜少了，春天一到，草木最先知道。顿时觉得眼前到处都是生机，东风吹过水面，绿波一高一低，真好看。",
      }
      ],
    },
    {
      title: "打球图 · 晁无咎",
      art: 'poetry-qianjia:ch94',
      artPrompt: "古诗《打球图》意境插画：阊阖千门万户开，三郎沉醉打球回。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "阊阖千门万户开，三郎沉醉打球回。\n九龄已老韩休死，无复明朝谏疏来。",
        pinyin: "chāng hé qiān mén wàn hù kāi， sān láng chén zuì dǎ qiú huí。\njiǔ líng yǐ lǎo hán xiū sǐ， wú fù míng cháo jiàn shū lái。",
        translation: "画上皇宫的千门万户全都打开，皇帝打完马球，醉醺醺地回来。从前敢劝他的老臣，有的老了，有的去世了，再也没有人第二天一早递上奏章来劝他了。",
      }
      ],
    },
    {
      title: "宫词（其一） · 林洪",
      art: 'poetry-qianjia:ch95',
      artPrompt: "古诗《宫词（其一）》意境插画：金殿当头紫阁重，仙人掌上玉芙蓉。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "金殿当头紫阁重，仙人掌上玉芙蓉。\n太平天子朝元日，五色云车驾六龙。",
        pinyin: "jīn diàn dāng tóu zǐ gé zhòng， xiān rén zhǎng shàng yù fú róng。\ntài píng tiān zǐ cháo yuán rì， wǔ sè yún chē jià liù lóng。",
        translation: "金色的大殿高高的，紫色的楼阁一层又一层，铜仙人掌上托着玉雕的芙蓉。天下太平的天子在朝会大典的日子里，坐着五彩云一样华美的车，由六条龙拉着前行。",
      }
      ],
    },
    {
      title: "宫词（其二） · 林洪",
      art: 'poetry-qianjia:ch96',
      artPrompt: "古诗《宫词（其二）》意境插画：殿上衮衣明日月，砚中旗影动龙蛇。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "殿上衮衣明日月，砚中旗影动龙蛇。\n纵横礼乐三千字，独对丹墀日未斜。",
        pinyin: "diàn shàng gǔn yī míng rì yuè， yàn zhōng qí yǐng dòng lóng shé。\nzòng héng lǐ yuè sān qiān zì， dú duì dān chí rì wèi xié。",
        translation: "大殿上，皇帝的礼服像日月一样光亮，砚台里映着旗帜的影子，晃动得像龙蛇。一口气写下三千字讲礼乐的文章，独自面对殿前的红色台阶时，太阳还没有偏西。",
      }
      ],
    },
    {
      title: "咏华清宫 · 王建",
      art: 'poetry-qianjia:ch97',
      artPrompt: "古诗《咏华清宫》意境插画：行尽江南数十程，晓风残月入华清。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "行尽江南数十程，晓风残月入华清。\n朝元阁上西风急，都入长杨作雨声。",
        pinyin: "xíng jìn jiāng nán shù shí chéng， xiǎo fēng cán yuè rù huá qīng。\ncháo yuán gé shàng xī fēng jí， dōu rù cháng yáng zuò yǔ shēng。",
        translation: "走完江南的几十段路程，伴着清晨的凉风和快要落下去的月亮，走进了华清宫。朝元阁上西风吹得很急，吹过长长的杨树，听起来就像下雨的声音。",
      }
      ],
    },
    {
      title: "清平调词 · 李白",
      art: 'poetry-qianjia:ch98',
      artPrompt: "古诗《清平调词》意境插画：云想衣裳花想容，春风拂槛露华浓。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "云想衣裳花想容，春风拂槛露华浓。\n若非群玉山头见，会向瑶台月下逢。",
        pinyin: "yún xiǎng yī shang huā xiǎng róng， chūn fēng fú kǎn lù huá nóng。\nruò fēi qún yù shān tóu jiàn， huì xiàng yáo tái yuè xià féng。",
        translation: "云彩想变成她的衣裳，花儿想变成她的容貌，春风轻轻吹过栏杆，露水把花儿润得亮晶晶的。这样美的人，如果不是在群玉山头见到，就一定是在瑶台的月光下才能遇到吧。",
      }
      ],
    },
    {
      title: "题邸间壁 · 郑会",
      art: 'poetry-qianjia:ch99',
      artPrompt: "古诗《题邸间壁》意境插画：酴醿香梦怯春寒，翠掩重门燕子闲。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "酴醿香梦怯春寒，翠掩重门燕子闲。\n敲断玉钗红烛冷，计程应说到常山。",
        pinyin: "tú mí xiāng mèng qiè chūn hán， cuì yǎn zhòng mén yàn zi xián。\nqiāo duàn yù chāi hóng zhú lěng， jì chéng yìng shuō dào cháng shān。",
        translation: "荼蘼花飘着香气，春夜的寒气让人睡梦都不安稳，重重绿门掩着，燕子安安静静地歇着。她拿着玉钗轻轻敲着数更点，红烛都快烧冷了，心里正盘算着，他这时候应该走到常山了吧。",
      }
      ],
    },
    {
      title: "绝句 · 杜甫",
      art: 'poetry-qianjia:ch100',
      artPrompt: "古诗《绝句》意境插画：两个黄鹂鸣翠柳，一行白鹭上青天。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "两个黄鹂鸣翠柳，一行白鹭上青天。\n窗含西岭千秋雪，门泊东吴万里船。",
        pinyin: "liǎng gè huáng lí míng cuì liǔ， yī háng bái lù shàng qīng tiān。\nchuāng hán xī lǐng qiān qiū xuě， mén bó dōng wú wàn lǐ chuán。",
        translation: "两只黄鹂在翠绿的柳树上唱歌，一行白鹭飞上蓝蓝的天空。从窗口望出去，能看见西岭上千年不化的积雪，门前停着要开往很远很远地方的大船。",
      }
      ],
    },
    {
      title: "海棠 · 苏轼",
      art: 'poetry-qianjia:ch101',
      artPrompt: "古诗《海棠》意境插画：东风袅袅泛崇光，香雾空蒙月转廊。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "东风袅袅泛崇光，香雾空蒙月转廊。\n只恐夜深花睡去，故烧高烛照红妆。",
        pinyin: "dōng fēng niǎo niǎo fàn chóng guāng， xiāng wù kōng méng yuè zhuǎn láng。\nzhī kǒng yè shēn huā shuì qù， gù shāo gāo zhú zhào hóng zhuāng。",
        translation: "暖暖的春风轻轻吹着，海棠花泛出好看的光，带香气的雾气朦朦胧胧，月亮慢慢转过了回廊。我真怕夜深了花儿会睡着，所以点上高高的蜡烛，照亮它红红的花朵。",
      }
      ],
    },
    {
      title: "清明 · 王禹偁",
      art: 'poetry-qianjia:ch102',
      artPrompt: "古诗《清明》意境插画：无花无酒过清明，兴味萧然似野僧。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "无花无酒过清明，兴味萧然似野僧。\n昨日邻家乞新火，晓窗分与读书灯。",
        pinyin: "wú huā wú jiǔ guò qīng míng， xìng wèi xiāo rán sì yě sēng。\nzuó rì lín jiā qǐ xīn huǒ， xiǎo chuāng fēn yǔ dú shū dēng。",
        translation: "过清明节的时候没有花看，也没有酒喝，冷冷清清的，就像山野里的和尚一样。昨天向邻居家讨来了新火，一大早在窗前点亮，用来点灯读书。",
      }
      ],
    },
    {
      title: "清明 · 杜牧",
      art: 'poetry-qianjia:ch103',
      artPrompt: "古诗《清明》意境插画：清明时节雨纷纷，路上行人欲断魂。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "清明时节雨纷纷，路上行人欲断魂。\n借问酒家何处有，牧童遥指杏花村。",
        pinyin: "qīng míng shí jié yǔ fēn fēn， lù shang xíng rén yù duàn hún。\njiè wèn jiǔ jiā hé chù yǒu， mù tóng yáo zhǐ xìng huā cūn。",
        translation: "清明节的时候，细雨下个不停，路上的行人心情难过，就像丢了魂一样。请问哪里有酒家呀？牧童远远地指着杏花盛开的小村庄。",
      }
      ],
    },
    {
      title: "社日 · 张演",
      art: 'poetry-qianjia:ch104',
      artPrompt: "古诗《社日》意境插画：鹅湖山下稻粱肥，豚栅鸡栖对掩扉。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "鹅湖山下稻粱肥，豚栅鸡栖对掩扉。\n桑柘影斜春社散，家家扶得醉人归。",
        pinyin: "é hú shān xià dào liáng féi， tún shān jī qī duì yǎn fēi。\nsāng zhè yǐng xié chūn shè sàn， jiā jiā fú dé zuì rén guī。",
        translation: "鹅湖山下，稻子长得又壮又饱满，猪圈和鸡窝旁边，家家户户的门都轻轻掩着。桑树的影子斜了，春社散了会，家家都有喝醉的人，被亲人扶着回家。",
      }
      ],
    },
    {
      title: "寒食 · 韩翃",
      art: 'poetry-qianjia:ch105',
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
      title: "江南春 · 杜牧",
      art: 'poetry-qianjia:ch106',
      artPrompt: "古诗《江南春》意境插画：千里莺啼绿映红，水村山郭酒旗风。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "千里莺啼绿映红，水村山郭酒旗风。\n南朝四百八十寺，多少楼台烟雨中。",
        pinyin: "qiān lǐ yīng tí lǜ yìng hóng， shuǐ cūn shān guō jiǔ qí fēng。\nnán cháo sì bǎi bā shí sì， duō shǎo lóu tái yān yǔ zhōng。",
        translation: "辽阔的江南，到处有黄莺在歌唱，绿树映着红花，水边的村庄、靠山的城郭，酒旗在风中飘扬。南朝留下的四百八十座寺庙，多少楼台都笼罩在朦朦胧胧的烟雨里。",
      }
      ],
    },
    {
      title: "上高侍郎 · 高蟾",
      art: 'poetry-qianjia:ch107',
      artPrompt: "古诗《上高侍郎》意境插画：天上碧桃和露种，日边红杏倚云栽。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "天上碧桃和露种，日边红杏倚云栽。\n芙蓉生在秋江上，不向东风怨未开。",
        pinyin: "tiān shàng bì táo hé lù zhǒng， rì biān hóng xìng yǐ yún zāi。\nfú róng shēng zài qiū jiāng shàng， bù xiàng dōng fēng yuàn wèi kāi。",
        translation: "天上碧绿的桃树带着露水栽种，太阳旁边的红杏靠着云朵生长。荷花长在秋天的江上，却不肯向着东风，抱怨自己开得晚。",
      }
      ],
    },
    {
      title: "绝句 · 僧志安",
      art: 'poetry-qianjia:ch108',
      artPrompt: "古诗《绝句》意境插画：古木阴中系短篷，杖藜扶我过桥东。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "古木阴中系短篷，杖藜扶我过桥东。\n沾衣欲湿杏花雨，吹面不寒杨柳风。",
        pinyin: "gǔ mù yīn zhōng xì duǎn péng， zhàng lí fú wǒ guò qiáo dōng。\nzhān yī yù shī xìng huā yǔ， chuī miàn bù hán yáng liǔ fēng。",
        translation: "我把小船系在老树浓浓的树荫下，拄着藜木拐杖慢慢走过桥的东边。杏花时节的细雨沾在衣服上，像要打湿又没打湿，吹到脸上的杨柳风一点儿也不冷。",
      }
      ],
    },
    {
      title: "游小园不值 · 叶绍翁",
      art: 'poetry-qianjia:ch109',
      artPrompt: "古诗《游小园不值》意境插画：应嫌屐齿印苍苔，十扣柴扉九不开。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "应嫌屐齿印苍苔，十扣柴扉九不开。\n春色满园关不住，一枝红杏出墙来。",
        pinyin: "yìng xián jī chǐ yìn cāng tái， shí kòu chái fēi jiǔ bù kāi。\nchūn sè mǎn yuán guān bù zhù， yī zhī hóng xìng chū qiáng lái。",
        translation: "大概是怕我的木屐在青苔上踩出印子吧，轻轻敲了十次柴门，九次都没有人开。可是满园的春色是关不住的呀，一枝红杏已经伸出墙外来啦。",
      }
      ],
    },
    {
      title: "客中行 · 李白",
      art: 'poetry-qianjia:ch110',
      artPrompt: "古诗《客中行》意境插画：兰陵美酒郁金香，玉碗盛来琥珀光。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "兰陵美酒郁金香，玉碗盛来琥珀光。\n但使主人能醉客，不知何处是他乡。",
        pinyin: "lán líng měi jiǔ yù jīn xiāng， yù wǎn shèng lái hǔ pò guāng。\ndàn shǐ zhǔ rén néng zuì kè， bù zhī hé chù shì tā xiāng。",
        translation: "兰陵的美酒散发着郁金香的香气，盛在玉碗里，闪着琥珀一样的光。只要主人用好酒把客人招待得开开心心，我就不觉得自己是在他乡做客啦。",
      }
      ],
    },
    {
      title: "题屏 · 刘季孙",
      art: 'poetry-qianjia:ch111',
      artPrompt: "古诗《题屏》意境插画：呢喃燕子语梁间，底事来惊梦里闲。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "呢喃燕子语梁间，底事来惊梦里闲。\n说与旁人浑不解，杖藜携酒看芝山。",
        pinyin: "ní nán yàn zi yǔ liáng jiān， dǐ shì lái jīng mèng lǐ xián。\nshuō yǔ páng rén hún bù jiě， zhàng lí xié jiǔ kàn zhī shān。",
        translation: "燕子在屋梁间叽叽喳喳地叫，为什么要来吵醒我悠闲的梦呢。我把这事说给别人听，他们全都不明白，我只好拄着拐杖、带着酒，去看看那座芝山。",
      }
      ],
    },
    {
      title: "绝句漫兴 · 杜甫",
      art: 'poetry-qianjia:ch112',
      artPrompt: "古诗《绝句漫兴》意境插画：肠断春江欲尽头，杖藜徐步立芳洲。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "肠断春江欲尽头，杖藜徐步立芳洲。\n颠狂柳絮随风舞，轻薄桃花逐水流。",
        pinyin: "cháng duàn chūn jiāng yù jìn tóu， zhàng lí xú bù lì fāng zhōu。\ndiān kuáng liǔ xù suí fēng wǔ， qīng bó táo huā zhú shuǐ liú。",
        translation: "春天快要过去，春江的水快要流到尽头，真叫人心里难受。我拄着拐杖慢慢走，站在长满花草的小洲上，看柳絮疯狂地随风乱舞，桃花一片片跟着流水漂走。",
      }
      ],
    },
    {
      title: "庆全庵桃花 · 谢枋得",
      art: 'poetry-qianjia:ch113',
      artPrompt: "古诗《庆全庵桃花》意境插画：寻得桃源好避秦，桃红又是一年春。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "寻得桃源好避秦，桃红又是一年春。\n花飞莫遣随流水，怕有渔郎来问津。",
        pinyin: "xún dé táo yuán hǎo bì qín， táo hóng yòu shì yī nián chūn。\nhuā fēi mò qiǎn suí liú shuǐ， pà yǒu yú láng lái wèn jīn。",
        translation: "找到一个像桃花源一样安静的好地方躲起来，桃花一红，又是一年春天来了。落下的花瓣千万别让它随着流水漂出去，就怕有打渔的人顺着水找到这里来。",
      }
      ],
    },
    {
      title: "玄都观桃花 · 刘禹锡",
      art: 'poetry-qianjia:ch114',
      artPrompt: "古诗《玄都观桃花》意境插画：紫陌红尘拂面来，无人不道看花回。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "紫陌红尘拂面来，无人不道看花回。\n玄都观里桃千树，尽是刘郎去后栽。",
        pinyin: "zǐ mò hóng chén fú miàn lái， wú rén bù dào kàn huā huí。\nxuán dōu guān lǐ táo qiān shù， jìn shì liú láng qù hòu zāi。",
        translation: "京城的大路上人来人往，尘土扑面而来，没有一个人不说自己是看花回来的。玄都观里上千棵桃树，都是我离开以后才栽下的呀。",
      }
      ],
    },
    {
      title: "再游玄都观 · 刘禹锡",
      art: 'poetry-qianjia:ch115',
      artPrompt: "古诗《再游玄都观》意境插画：百亩庭中半是苔，桃花净尽菜花开。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "百亩庭中半是苔，桃花净尽菜花开。\n种桃道士归何处，前度刘郎今又来。",
        pinyin: "bǎi mǔ tíng zhōng bàn shì tái， táo huā jìng jìn cài huā kāi。\nzhǒng táo dào shì guī hé chù， qián dù liú láng jīn yòu lái。",
        translation: "百亩大的庭院里，一半都长满了青苔，桃花全没有了，只开着菜花。从前种桃树的道士去哪儿了呢？上次来过的刘郎，今天又回来啦。",
      }
      ],
    },
    {
      title: "滁州西涧 · 韦应物",
      art: 'poetry-qianjia:ch116',
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
      title: "花影 · 苏轼",
      art: 'poetry-qianjia:ch117',
      artPrompt: "古诗《花影》意境插画：重重叠叠上瑶台，几度呼童扫不开。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "重重叠叠上瑶台，几度呼童扫不开。\n刚被太阳收拾去，却教明月送将来。",
        pinyin: "zhòng chóng dié dié shàng yáo tái， jǐ dù hū tóng sǎo bù kāi。\ngāng bèi tài yáng shōu shí qù， què jiào míng yuè sòng jiāng lái。",
        translation: "花影一层又一层地爬上美丽的台阶，叫小童来扫了好几次都扫不掉。太阳一下山，影子刚刚跟着不见了，月亮一升起来，影子又被送回来啦。",
      }
      ],
    },
    {
      title: "北山 · 王安石",
      art: 'poetry-qianjia:ch118',
      artPrompt: "古诗《北山》意境插画：北山输绿涨横陂，直堑回塘滟滟时。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "北山输绿涨横陂，直堑回塘滟滟时。\n细数落花因坐久，缓寻芳草得归迟。",
        pinyin: "běi shān shū lǜ zhǎng héng bēi， zhí qiàn huí táng yàn yàn shí。\nxì shǔ luò huā yīn zuò jiǔ， huǎn xún fāng cǎo dé guī chí。",
        translation: "北山把浓浓的绿色送下来，山塘的水涨得满满的，直直的水沟和弯弯的池塘闪着亮亮的水光。我坐了很久，细细地数着落下的花瓣，又慢慢地寻找青青的芳草，回家就晚了。",
      }
      ],
    },
    {
      title: "湖上 · 徐元杰",
      art: 'poetry-qianjia:ch119',
      artPrompt: "古诗《湖上》意境插画：花开红树乱莺啼，草长平湖白鹭飞。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "花开红树乱莺啼，草长平湖白鹭飞。\n风日晴和人意好，夕阳箫鼓几船归。",
        pinyin: "huā kāi hóng shù luàn yīng tí， cǎo cháng píng hú bái lù fēi。\nfēng rì qíng hé rén yì hǎo， xī yáng xiāo gǔ jǐ chuán guī。",
        translation: "红花开满树，黄莺在树上叽叽喳喳地叫，青草长得旺，白鹭飞过平静的湖面。风和日丽，天气真好，人的心情也真好，夕阳下，几只船伴着箫声鼓声回家了。",
      }
      ],
    },
    {
      title: "漫兴 · 杜甫",
      art: 'poetry-qianjia:ch120',
      artPrompt: "古诗《漫兴》意境插画：糁径杨花铺白毡，点溪荷叶叠青钱。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "糁径杨花铺白毡，点溪荷叶叠青钱。\n笋根稚子无人见，沙上凫雏傍母眠。",
        pinyin: "shēn jìng yáng huā pù bái zhān， diǎn xī hé yè dié qīng qián。\nsǔn gēn zhì zǐ wú rén jiàn， shā shàng fú chú bàng mǔ mián。",
        translation: "柳絮撒落在小路上，像铺了一层白白的毡子；圆圆的小荷叶点缀在溪水上，像一枚枚叠起来的绿色铜钱。竹笋根旁的小野鸡宝宝没有人发现，沙滩上的小鸭子正依偎着鸭妈妈睡觉呢。",
      }
      ],
    },
    {
      title: "春晴 · 王驾",
      art: 'poetry-qianjia:ch121',
      artPrompt: "古诗《春晴》意境插画：雨前初见花间蕊，雨后全无叶底花。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "雨前初见花间蕊，雨后全无叶底花。\n蜂蝶纷纷过墙去，却疑春色在邻家。",
        pinyin: "yǔ qián chū jiàn huā jiān ruǐ， yǔ hòu quán wú yè dǐ huā。\nfēng dié fēn fēn guò qiáng qù， què yí chūn sè zài lín jiā。",
        translation: "下雨前，还看见花枝上含着花蕊；下过雨，叶子底下的花全落光了。蜜蜂蝴蝶纷纷飞过墙去了，真让人怀疑，春色都跑到邻居家去了。",
      }
      ],
    },
    {
      title: "春暮 · 曹豳",
      art: 'poetry-qianjia:ch122',
      artPrompt: "古诗《春暮》意境插画：门外无人问落花，绿阴冉冉遍天涯。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "门外无人问落花，绿阴冉冉遍天涯。\n林莺啼到无声处，青草池塘独听蛙。",
        pinyin: "mén wài wú rén wèn luò huā， lǜ yīn rǎn rǎn biàn tiān yá。\nlín yīng tí dào wú shēng chù， qīng cǎo chí táng dú tīng wā。",
        translation: "门外飘落的春花没有人去理会，绿绿的树阴慢慢铺满了大地。树林里的黄莺渐渐不叫了，只有长满青草的池塘边，还能独自听青蛙呱呱地唱。",
      }
      ],
    },
    {
      title: "落花 · 朱淑贞",
      art: 'poetry-qianjia:ch123',
      artPrompt: "古诗《落花》意境插画：连理枝头花正开，妒花风雨便相催。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "连理枝头花正开，妒花风雨便相催。\n愿教青帝常为主，莫遣纷纷点翠苔。",
        pinyin: "lián lǐ zhī tóu huā zhèng kāi， dù huā fēng yǔ biàn xiāng cuī。\nyuàn jiào qīng dì cháng wéi zhǔ， mò qiǎn fēn fēn diǎn cuì tái。",
        translation: "连理枝头的花开得正好看，嫉妒花儿的风雨就赶来催它落掉。真希望掌管春天的神仙能常常做主，别让花瓣纷纷落下来，撒在绿色的青苔上。",
      }
      ],
    },
    {
      title: "春暮游小园 · 王淇",
      art: 'poetry-qianjia:ch124',
      artPrompt: "古诗《春暮游小园》意境插画：一从梅粉褪残妆，涂抹新红上海棠。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "一从梅粉褪残妆，涂抹新红上海棠。\n开到荼蘼花事了，丝丝夭棘出莓墙。",
        pinyin: "yī cóng méi fěn tuì cán zhuāng， tú mǒ xīn hóng shàng hǎi táng。\nkāi dào tú mí huā shì liǎo， sī sī yāo jí chū méi qiáng。",
        translation: "梅花的粉色像残妆一样褪去之后，海棠又涂上了新鲜的红颜色。等到荼蘼花开过，这一年的花儿就开完了，只剩一丝丝带刺的藤蔓从长满青苔的墙上探出头来。",
      }
      ],
    },
    {
      title: "莺梭 · 刘克庄",
      art: 'poetry-qianjia:ch125',
      artPrompt: "古诗《莺梭》意境插画：掷柳迁乔太有情，交交时作弄机声。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "掷柳迁乔太有情，交交时作弄机声。\n洛阳三月花如锦，多少工夫织得成。",
        pinyin: "zhì liǔ qiān qiáo tài yǒu qíng， jiāo jiāo shí zuò nòng jī shēng。\nluò yáng sān yuè huā rú jǐn， duō shǎo gōng fū zhī dé chéng。",
        translation: "黄莺在柳树间穿来穿去，又飞上高高的树，真是多情呀，它们的叫声时不时像织布机在响。三月的洛阳花开得像锦缎一样美，那是黄莺花了多少工夫才织成的呀。",
      }
      ],
    },
    {
      title: "暮春即事 · 叶采",
      art: 'poetry-qianjia:ch126',
      artPrompt: "古诗《暮春即事》意境插画：双双瓦雀行书案，点点杨花入砚池。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "双双瓦雀行书案，点点杨花入砚池。\n闲坐小窗读周易，不知春去几多时。",
        pinyin: "shuāng shuāng wǎ què xíng shū àn， diǎn diǎn yáng huā rù yàn chí。\nxián zuò xiǎo chuāng dú zhōu yì， bù zhī chūn qù jǐ duō shí。",
        translation: "一对对小麻雀在书桌上走来走去，点点的杨花飘进了砚台池里。我安安静静地坐在小窗边读书，不知不觉，春天已经过去好久了。",
      }
      ],
    },
    {
      title: "登山 · 李涉",
      art: 'poetry-qianjia:ch127',
      artPrompt: "古诗《登山》意境插画：终日昏昏醉梦间，忽闻春尽强登山。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "终日昏昏醉梦间，忽闻春尽强登山。\n因过竹院逢僧话，又得浮生半日闲。",
        pinyin: "zhōng rì hūn hūn zuì mèng jiān， hū wén chūn jìn qiáng dēng shān。\nyīn guò zhú yuàn féng sēng huà， yòu dé fú shēng bàn rì xián。",
        translation: "整天昏昏沉沉，像在醉里梦里一样，忽然听说春天快过完了，勉强打起精神去登山。路过竹院时碰到一位和尚聊了聊天，这忙忙碌碌的一生里，又得到了半天的清闲。",
      }
      ],
    },
    {
      title: "蚕妇吟 · 谢枋得",
      art: 'poetry-qianjia:ch128',
      artPrompt: "古诗《蚕妇吟》意境插画：子规啼彻四更时，起视蚕稠怕叶稀。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "子规啼彻四更时，起视蚕稠怕叶稀。\n不信楼头杨柳月，玉人歌舞未曾归。",
        pinyin: "zǐ guī tí chè sì gēng shí， qǐ shì cán chóu pà yè xī。\nbù xìn lóu tóu yáng liǔ yuè， yù rén gē wǔ wèi céng guī。",
        translation: "杜鹃鸟一直叫到四更天，养蚕的女子起床来看蚕，蚕这么多，就怕桑叶不够吃了。她怎么也不会相信，楼头的月亮已经照上杨柳，那些唱歌跳舞的美人还没有回家呢。",
      }
      ],
    },
    {
      title: "晚春 · 韩愈",
      art: 'poetry-qianjia:ch129',
      artPrompt: "古诗《晚春》意境插画：草木知春不久归，百般红紫斗芳菲。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "草木知春不久归，百般红紫斗芳菲。\n杨花榆荚无才思，惟解漫天作雪飞。",
        pinyin: "cǎo mù zhī chūn bù jiǔ guī， bǎi bān hóng zǐ dòu fāng fēi。\nyáng huā yú jiá wú cái sī， wéi jiě màn tiān zuò xuě fēi。",
        translation: "花草树木知道春天就要回去了，都想尽办法开出红的紫的花，比谁开得更美。杨花和榆荚没有什么花样，只知道像雪花一样漫天飞舞。",
      }
      ],
    },
    {
      title: "伤春 · 杨万里",
      art: 'poetry-qianjia:ch130',
      artPrompt: "古诗《伤春》意境插画：准拟今春乐事浓，依然枉却一东风。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "准拟今春乐事浓，依然枉却一东风。\n年年不带看花眼，不是愁中即病中。",
        pinyin: "zhǔn nǐ jīn chūn lè shì nóng， yī rán wǎng què yī dōng fēng。\nnián nián bù dài kàn huā yǎn， bù shì chóu zhōng jí bìng zhōng。",
        translation: "本来打算今年春天要痛痛快快地赏春，结果还是白白辜负了这一阵春风。年年都没有好好看成花，不是正发愁，就是在生病。",
      }
      ],
    },
    {
      title: "送春 · 王令",
      art: 'poetry-qianjia:ch131',
      artPrompt: "古诗《送春》意境插画：三月残花落更开，小檐日日燕飞来。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "三月残花落更开，小檐日日燕飞来。\n子规夜半犹啼血，不信东风唤不回。",
        pinyin: "sān yuè cán huā luò gèng kāi， xiǎo yán rì rì yàn fēi lái。\nzǐ guī yè bàn yóu tí xuè， bù xìn dōng fēng huàn bù huí。",
        translation: "三月的花落了又开，小小的屋檐下天天有燕子飞来。杜鹃鸟半夜里还在声声啼叫，它就是不相信，这样用力的叫声唤不回春天的东风。",
      }
      ],
    },
    {
      title: "三月晦日送春 · 贾岛",
      art: 'poetry-qianjia:ch132',
      artPrompt: "古诗《三月晦日送春》意境插画：三月正当三十日，风光别我苦吟身。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "三月正当三十日，风光别我苦吟身。\n共君今夜不须睡，未到晓钟犹是春。",
        pinyin: "sān yuè zhèng dāng sān shí rì， fēng guāng bié wǒ kǔ yín shēn。\ngòng jūn jīn yè bù xū shuì， wèi dào xiǎo zhōng yóu shì chūn。",
        translation: "今天是三月的最后一天，春天的美景就要离开我这爱吟诗的人了。咱们今晚都别睡吧，只要早晨的钟声还没敲响，就还算是春天呢。",
      }
      ],
    },
    {
      title: "客中初夏 · 司马光",
      art: 'poetry-qianjia:ch133',
      artPrompt: "古诗《客中初夏》意境插画：四月清和雨乍晴，南山当户转分明。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "四月清和雨乍晴，南山当户转分明。\n更无柳絮因风起，惟有葵花向日倾。",
        pinyin: "sì yuè qīng hé yǔ zhà qíng， nán shān dāng hù zhuǎn fēn míng。\ngèng wú liǔ xù yīn fēng qǐ， wéi yǒu kuí huā xiàng rì qīng。",
        translation: "四月的天气清爽暖和，一场雨刚停下来就放晴了，正对着的南山越来越清楚。空中再没有随风飞舞的柳絮，只有葵花一朵朵朝着太阳开放。",
      }
      ],
    },
    {
      title: "有约 · 司马光",
      art: 'poetry-qianjia:ch134',
      artPrompt: "古诗《有约》意境插画：黄梅时节家家雨，青草池塘处处蛙。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "黄梅时节家家雨，青草池塘处处蛙。\n有约不来过夜半，闲敲棋子落灯花。",
        pinyin: "huáng méi shí jié jiā jiā yǔ， qīng cǎo chí táng chù chù wā。\nyǒu yuē bù lái guò yè bàn， xián qiāo qí zǐ luò dēng huā。",
        translation: "黄梅时节，家家户户都笼罩在绵绵的细雨里，长满青草的池塘边到处是青蛙的叫声。约好的客人到了半夜还没有来，我轻轻敲着棋子，把灯花都震落了下来。",
      }
      ],
    },
    {
      title: "初夏睡起 · 杨万里",
      art: 'poetry-qianjia:ch135',
      artPrompt: "古诗《初夏睡起》意境插画：梅子流酸溅齿牙，芭蕉分绿上窗纱。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "梅子流酸溅齿牙，芭蕉分绿上窗纱。\n日长睡起无情思，闲看儿童捉柳花。",
        pinyin: "méi zǐ liú suān jiàn chǐ yá， bā jiāo fēn lǜ shàng chuāng shā。\nrì cháng shuì qǐ wú qíng sī， xián kàn ér tóng zhuō liǔ huā。",
        translation: "咬一口梅子，酸酸的味道溅到牙齿上，芭蕉的绿色映上了窗纱。白天天变长了，午睡醒来没什么事情做，就悠闲地看孩子们追捉飘飞的柳絮。",
      }
      ],
    },
    {
      title: "三衢道中 · 曾几",
      art: 'poetry-qianjia:ch136',
      artPrompt: "古诗《三衢道中》意境插画：梅子黄时日日晴，小溪泛尽却山行。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "梅子黄时日日晴，小溪泛尽却山行。\n绿阴不减来时路，添得黄鹂四五声。",
        pinyin: "méi zǐ huáng shí rì rì qíng， xiǎo xī fàn jìn què shān xíng。\nlǜ yīn bù jiǎn lái shí lù， tiān dé huáng lí sì wǔ shēng。",
        translation: "梅子黄熟的时节，天天都是好晴天，我乘小船走完了小溪，又改走山路。一路上浓浓的绿荫不比来时少，还多了四五声黄鹂好听的歌唱。",
      }
      ],
    },
    {
      title: "即景 · 朱淑贞",
      art: 'poetry-qianjia:ch137',
      artPrompt: "古诗《即景》意境插画：竹摇清影罩幽窗，两两时禽噪夕阳。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "竹摇清影罩幽窗，两两时禽噪夕阳。\n谢却海棠飞尽絮，困人天气日初长。",
        pinyin: "zhú yáo qīng yǐng zhào yōu chuāng， liǎng liǎng shí qín zào xī yáng。\nxiè què hǎi táng fēi jìn xù， kùn rén tiān qì rì chū cháng。",
        translation: "竹子摇动的清清影子罩在幽静的窗前，一对对小鸟在夕阳里叽叽喳喳地叫。海棠花谢了，柳絮也飞尽了，白天开始变长，这样的天气真让人困倦。",
      }
      ],
    },
    {
      title: "夏日 · 戴敏",
      art: 'poetry-qianjia:ch138',
      artPrompt: "古诗《夏日》意境插画：乳鸭池塘水浅深，熟梅天气半晴阴。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "乳鸭池塘水浅深，熟梅天气半晴阴。\n东园载酒西园醉，摘尽枇杷一树金。",
        pinyin: "rǔ yā chí táng shuǐ qiǎn shēn， shú méi tiān qì bàn qíng yīn。\ndōng yuán zǎi jiǔ xī yuán zuì， zhāi jìn pí pá yī shù jīn。",
        translation: "小鸭子在深浅不一的池塘里游来游去，梅子熟了的天气，一会儿晴一会儿阴。带着酒到东园游玩，又在西园喝得高高兴兴，把一树金黄金黄的枇杷都摘了下来。",
      }
      ],
    },
    {
      title: "晚楼闲坐 · 王安石",
      art: 'poetry-qianjia:ch139',
      artPrompt: "古诗《晚楼闲坐》意境插画：四顾山光接水光，凭栏十里芰荷香。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "四顾山光接水光，凭栏十里芰荷香。\n清风明月无人管，并作南来一味凉。",
        pinyin: "sì gù shān guāng jiē shuǐ guāng， píng lán shí lǐ jì hé xiāng。\nqīng fēng míng yuè wú rén guǎn， bìng zuò nán lái yī wèi liáng。",
        translation: "向四面望去，山色连着水色，靠着栏杆，能闻到十里荷花的清香。清风和明月没有人管束，一起从南边吹来、照来，带来了一片清凉。",
      }
      ],
    },
    {
      title: "山居夏日 · 高骈",
      art: 'poetry-qianjia:ch140',
      artPrompt: "古诗《山居夏日》意境插画：绿树阴浓夏日长，楼台倒影入池塘。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "绿树阴浓夏日长，楼台倒影入池塘。\n水晶帘动微风起，满架蔷薇一院香。",
        pinyin: "lǜ shù yīn nóng xià rì cháng， lóu tái dǎo yǐng rù chí táng。\nshuǐ jīng lián dòng wēi fēng qǐ， mǎn jià qiáng wēi yī yuàn xiāng。",
        translation: "夏天白天长，绿树的树阴浓浓的，楼台的影子倒映在池塘里。微风吹来，池塘的水面像水晶帘子一样轻轻晃动，满架的蔷薇开了，满院子都是香味。",
      }
      ],
    },
    {
      title: "田家 · 范成大",
      art: 'poetry-qianjia:ch141',
      artPrompt: "古诗《田家》意境插画：昼出耘田夜绩麻，村庄儿女各当家。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "昼出耘田夜绩麻，村庄儿女各当家。\n童孙未解供耕织，也傍桑阴学种瓜。",
        pinyin: "zhòu chū yún tián yè jì má， cūn zhuāng ér nǚ gè dāng jiā。\ntóng sūn wèi jiě gòng gēng zhī， yě bàng sāng yīn xué zhòng guā。",
        translation: "白天到田里除草，晚上在家搓麻线，村里的男人女人都各自当家干活。小孩子虽然还不会耕田织布，也学着大人的样子，在桑树荫下种起瓜来。",
      }
      ],
    },
    {
      title: "村居即事 · 范成大",
      art: 'poetry-qianjia:ch142',
      artPrompt: "古诗《村居即事》意境插画：绿遍山原白满川，子规声里雨如烟。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "绿遍山原白满川，子规声里雨如烟。\n乡村四月闲人少，才了蚕桑又插田。",
        pinyin: "lǜ biàn shān yuán bái mǎn chuān， zǐ guī shēng lǐ yǔ rú yān。\nxiāng cūn sì yuè xián rén shǎo， cái le cán sāng yòu chā tián。",
        translation: "山坡原野一片碧绿，稻田里的水白亮亮地映着天光，杜鹃鸟的叫声里，细雨像烟一样飘着。乡村的四月闲人很少，刚忙完养蚕采桑，又要下田插秧了。",
      }
      ],
    },
    {
      title: "题榴花 · 朱熹",
      art: 'poetry-qianjia:ch143',
      artPrompt: "古诗《题榴花》意境插画：五月榴花照眼明，枝间时见子初成。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "五月榴花照眼明，枝间时见子初成。\n可怜此地无车马，颠倒苍苔落绛英。",
        pinyin: "wǔ yuè liú huā zhào yǎn míng， zhī jiān shí jiàn zǐ chū chéng。\nkě lián cǐ dì wú chē mǎ， diān dǎo cāng tái luò jiàng yīng。",
        translation: "五月里石榴花开得火红火红，明晃晃地照人眼睛，枝叶间时不时能看到刚刚结成的小石榴。可惜这里没有车马人来观赏，红红的花瓣落满了青苔，散乱一片。",
      }
      ],
    },
    {
      title: "村晚 · 雷震",
      art: 'poetry-qianjia:ch144',
      artPrompt: "古诗《村晚》意境插画：草满池塘水满陂，山衔落日浸寒漪。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "草满池塘水满陂，山衔落日浸寒漪。\n牧童归去横牛背，短笛无腔信口吹。",
        pinyin: "cǎo mǎn chí táng shuǐ mǎn bēi， shān xián luò rì jìn hán yī。\nmù tóng guī qù héng niú bèi， duǎn dí wú qiāng xìn kǒu chuī。",
        translation: "池塘边长满了青草，池水涨得满满的，远山衔着落日，影子浸在凉凉的水波里。放牛的孩子回家去，横坐在牛背上，拿着短笛，随口吹着不成调的曲子。",
      }
      ],
    },
    {
      title: "茅檐 · 王安石",
      art: 'poetry-qianjia:ch145',
      artPrompt: "古诗《茅檐》意境插画：茅檐常扫净无苔，花木成蹊手自栽。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "茅檐常扫净无苔，花木成蹊手自栽。\n一水护田将绿绕，两山排闼送青来。",
        pinyin: "máo yán cháng sǎo jìng wú tái， huā mù chéng qī shǒu zì zāi。\nyī shuǐ hù tián jiāng lǜ rào， liǎng shān pái tà sòng qīng lái。",
        translation: "茅草屋的檐下经常打扫，干净得连一点青苔都没有，一行行花草树木都是主人亲手栽的。一条小河环绕着田地，把绿色护在中间，两座青山像推开门一样，把满眼的青翠送了进来。",
      }
      ],
    },
    {
      title: "乌衣巷 · 刘禹锡",
      art: 'poetry-qianjia:ch146',
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
      title: "送元二使安西 · 王维",
      art: 'poetry-qianjia:ch147',
      artPrompt: "古诗《送元二使安西》意境插画：渭城朝雨浥轻尘，客舍青青柳色新。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "渭城朝雨浥轻尘，客舍青青柳色新。\n劝君更尽一杯酒，西出阳关无故人。",
        pinyin: "wèi chéng cháo yǔ yì qīng chén， kè shè qīng qīng liǔ sè xīn。\nquàn jūn gèng jìn yī bēi jiǔ， xī chū yáng guān wú gù rén。",
        translation: "渭城早晨的小雨打湿了路上的尘土，客舍旁边的柳树被雨洗得青翠一新。请你再喝完这一杯酒吧，往西出了阳关，就再也见不到老朋友了。",
      }
      ],
    },
    {
      title: "与史朗中饮听黄鹤楼上吹笛 · 李白",
      art: 'poetry-qianjia:ch148',
      artPrompt: "古诗《与史朗中饮听黄鹤楼上吹笛》意境插画：一为迁客去长沙，西望长安不见家。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "一为迁客去长沙，西望长安不见家。\n黄鹤楼中吹玉笛，江城五月落梅花。",
        pinyin: "yī wèi qiān kè qù cháng shā， xī wàng cháng ān bù jiàn jiā。\nhuáng hè lóu zhōng chuī yù dí， jiāng chéng wǔ yuè luò méi huā。",
        translation: "一旦像被贬去长沙的人一样远离家乡，向西望长安，也望不见自己的家。黄鹤楼上传来玉笛声，吹的是《梅花落》，五月的江城，好像漫天飘起了片片梅花。",
      }
      ],
    },
    {
      title: "题淮南寺 · 程颢",
      art: 'poetry-qianjia:ch149',
      artPrompt: "古诗《题淮南寺》意境插画：南去北来休便休，白苹吹尽楚江秋。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "南去北来休便休，白苹吹尽楚江秋。\n道人不是悲秋客，一任晚山相对愁。",
        pinyin: "nán qù běi lái xiū biàn xiū， bái píng chuī jìn chǔ jiāng qiū。\ndào rén bù shì bēi qiū kè， yī rèn wǎn shān xiāng duì chóu。",
        translation: "南来北往的人，能歇息的时候就好好歇息，楚江上的白蘋花已经被秋风吹尽了。我可不是那种见了秋天就伤心的人，就随傍晚的山色带着愁容，你看着我、我看着你吧。",
      }
      ],
    },
    {
      title: "秋月 · 程颢",
      art: 'poetry-qianjia:ch150',
      artPrompt: "古诗《秋月》意境插画：清溪流过碧山头，空水澄鲜一色秋。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "清溪流过碧山头，空水澄鲜一色秋。\n隔断红尘三十里，白云红叶两悠悠。",
        pinyin: "qīng xī liú guò bì shān tóu， kōng shuǐ chéng xiān yī sè qiū。\ngé duàn hóng chén sān shí lǐ， bái yún hóng yè liǎng yōu yōu。",
        translation: "清清的溪水流过碧绿的山头，天空和溪水一样明净，到处都是秋天的景色。这里离热闹的地方有三十里远，只有白云和红叶悠悠地飘着、落着。",
      }
      ],
    },
    {
      title: "七夕 · 杨朴",
      art: 'poetry-qianjia:ch151',
      artPrompt: "古诗《七夕》意境插画：未会牵牛意若何，须邀织女弄金梭。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "未会牵牛意若何，须邀织女弄金梭。\n年年乞与人间巧，不道人间巧已多。",
        pinyin: "wèi huì qiān niú yì ruò hé， xū yāo zhī nǚ nòng jīn suō。\nnián nián qǐ yǔ rén jiān qiǎo， bù dào rén jiān qiǎo yǐ duō。",
        translation: "不知道牛郎心里在想什么，每年七夕都要请织女来摆弄金梭织布。织女年年把巧手的本领送给世上的人们，却不知道人间的巧心思已经够多啦。",
      }
      ],
    },
    {
      title: "立秋 · 刘翰",
      art: 'poetry-qianjia:ch152',
      artPrompt: "古诗《立秋》意境插画：乳鸦啼散玉屏空，一枕新凉一扇风。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "乳鸦啼散玉屏空，一枕新凉一扇风。\n睡起秋声无觅处，满阶梧叶月明中。",
        pinyin: "rǔ yā tí sàn yù píng kōng， yī zhěn xīn liáng yī shàn fēng。\nshuì qǐ qiū shēng wú mì chù， mǎn jiē wú yè yuè míng zhōng。",
        translation: "小乌鸦叫着飞散了，屏风旁空空的，睡在床上觉得一阵新凉，像扇子扇来的风。睡醒后想找找秋天的声音却找不到，只见明月照着落满台阶的梧桐叶。",
      }
      ],
    },
    {
      title: "秋夕 · 杜牧",
      art: 'poetry-qianjia:ch153',
      artPrompt: "古诗《秋夕》意境插画：银烛秋光冷画屏，轻罗小扇扑流萤。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "银烛秋光冷画屏，轻罗小扇扑流萤。\n天街夜色凉如水，卧看牵牛织女星。",
        pinyin: "yín zhú qiū guāng lěng huà píng， qīng luó xiǎo shàn pū liú yíng。\ntiān jiē yè sè liáng rú shuǐ， wò kàn qiān niú zhī nǚ xīng。",
        translation: "秋夜里，烛光照着画屏，透着淡淡的凉意；我拿着小小的丝扇，扑打飞来飞去的萤火虫。夜色凉凉的像水一样，我坐着仰望天上的牵牛星和织女星。",
      }
      ],
    },
    {
      title: "中秋月 · 杜牧",
      art: 'poetry-qianjia:ch154',
      artPrompt: "古诗《中秋月》意境插画：暮云收尽溢清寒，银汉无声转玉盘。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "暮云收尽溢清寒，银汉无声转玉盘。\n此生此夜不长好，明月明年何处看？",
        pinyin: "mù yún shōu jìn yì qīng hán， yín hàn wú shēng zhuǎn yù pán。\ncǐ shēng cǐ yè bù cháng hǎo， míng yuè míng nián hé chù kàn？",
        translation: "傍晚的云都散尽了，四处透着清凉的寒意，银河悄悄地转，月亮像玉盘一样。人这一生里，像今晚这样的好夜晚不常有，明年中秋，又要在哪里看这明月呢？",
      }
      ],
    },
    {
      title: "江楼有感 · 赵嘏",
      art: 'poetry-qianjia:ch155',
      artPrompt: "古诗《江楼有感》意境插画：独上江楼思渺然，月光如水水如天。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "独上江楼思渺然，月光如水水如天。\n同来玩月人何在，风景依稀似去年。",
        pinyin: "dú shàng jiāng lóu sī miǎo rán， yuè guāng rú shuǐ shuǐ rú tiān。\ntóng lái wán yuè rén hé zài， fēng jǐng yī xī sì qù nián。",
        translation: "我独自登上江边的楼，思绪飘得很远很远，月光像水一样流泻，江水又像天空一样。去年一起来赏月的人如今在哪里？风景还模模糊糊像去年一样。",
      }
      ],
    },
    {
      title: "题临安邸 · 林升",
      art: 'poetry-qianjia:ch156',
      artPrompt: "古诗《题临安邸》意境插画：山外青山楼外楼，西湖歌舞几时休。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "山外青山楼外楼，西湖歌舞几时休。\n暖风薰得游人醉，直把杭州作汴州。",
        pinyin: "shān wài qīng shān lóu wài lóu， xī hú gē wǔ jǐ shí xiū。\nnuǎn fēng xūn dé yóu rén zuì， zhí bǎ háng zhōu zuò biàn zhōu。",
        translation: "青山外面还有青山，高楼外面还有高楼，西湖边的歌舞什么时候才能停呢？暖暖的风把游人吹得醉醺醺的，简直把杭州当成了原来的京城汴州。",
      }
      ],
    },
    {
      title: "西湖 · 苏轼",
      art: 'poetry-qianjia:ch157',
      artPrompt: "古诗《西湖》意境插画：毕竟西湖六月中，风光不与四时同。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "毕竟西湖六月中，风光不与四时同。\n接天莲叶无穷碧，映日荷花别样红。",
        pinyin: "bì jìng xī hú liù yuè zhōng， fēng guāng bù yǔ sì shí tóng。\njiē tiān lián yè wú qióng bì， yìng rì hé huā bié yàng hóng。",
        translation: "到底是西湖的六月，风光和其他季节真不一样。碧绿的莲叶一眼望不到边，好像连着天，被太阳照着的荷花显得格外红。",
      }
      ],
    },
    {
      title: "饮湖上初晴后雨 · 苏轼",
      art: 'poetry-qianjia:ch158',
      artPrompt: "古诗《饮湖上初晴后雨》意境插画：水光潋滟晴方好，山色空蒙雨亦奇。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "水光潋滟晴方好，山色空蒙雨亦奇。\n欲把西湖比西子，淡妆浓抹总相宜。",
        pinyin: "shuǐ guāng liàn yàn qíng fāng hǎo， shān sè kōng méng yǔ yì qí。\nyù bǎ xī hú bǐ xī zǐ， dàn zhuāng nóng mǒ zǒng xiāng yí。",
        translation: "晴天时，湖面波光闪闪，真好看；下雨时，山色朦朦胧胧，也很奇妙。要是把西湖比作美女西施，不管是淡淡梳妆还是浓浓打扮，都很合适。",
      }
      ],
    },
    {
      title: "入直召对选德殿赐茶而退 · 周必大",
      art: 'poetry-qianjia:ch159',
      artPrompt: "古诗《入直召对选德殿赐茶而退》意境插画：绿槐夹道集昏鸦，敕使传宣坐赐茶。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "绿槐夹道集昏鸦，敕使传宣坐赐茶。\n归到玉堂清不寐，月钩初上紫薇花。",
        pinyin: "lǜ huái jiā dào jí hūn yā， chì shǐ chuán xuān zuò cì chá。\nguī dào yù táng qīng bù mèi， yuè gōu chū shàng zǐ wēi huā。",
        translation: "道路两旁种着绿槐，傍晚的乌鸦落满枝头，皇帝派使者传我进殿，让我坐下赐茶。回到值班的屋子里，清清凉凉睡不着，弯弯的月牙刚刚升上紫薇花梢。",
      }
      ],
    },
    {
      title: "夏日登车盖亭 · 蔡确",
      art: 'poetry-qianjia:ch160',
      artPrompt: "古诗《夏日登车盖亭》意境插画：纸屏石枕竹方床，手倦抛书午梦长。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "纸屏石枕竹方床，手倦抛书午梦长。\n睡起莞然成独笑，数声渔笛在沧浪。",
        pinyin: "zhǐ píng shí zhěn zhú fāng chuáng， shǒu juàn pāo shū wǔ mèng cháng。\nshuì qǐ wǎn rán chéng dú xiào， shù shēng yú dí zài cāng làng。",
        translation: "纸屏风、石枕头、竹子做的床，看书看得手都酸了，把书一抛，睡了个长长的午觉。醒来后不由得一个人笑了，远处传来几声渔笛的声音。",
      }
      ],
    },
    {
      title: "真玉堂作 · 洪咨夔",
      art: 'poetry-qianjia:ch161',
      artPrompt: "古诗《真玉堂作》意境插画：禁门深锁寂无哗，浓墨淋漓两相麻。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "禁门深锁寂无哗，浓墨淋漓两相麻。\n唱彻五更天未晓，一墀月浸紫薇花。",
        pinyin: "jìn mén shēn suǒ jì wú huá， nóng mò lín lí liǎng xiāng má。\nchàng chè wǔ gēng tiān wèi xiǎo， yī chí yuè jìn zǐ wēi huā。",
        translation: "皇宫的大门紧紧关着，安安静静没有一点喧哗，我蘸着浓浓的墨汁飞快地写诏书。五更的鼓声敲过了天还没有亮，满台阶的月光浸润着紫薇花。",
      }
      ],
    },
    {
      title: "竹楼 · 李嘉佑",
      art: 'poetry-qianjia:ch162',
      artPrompt: "古诗《竹楼》意境插画：傲吏身闲笑五侯，西江取竹起高楼。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "傲吏身闲笑五侯，西江取竹起高楼。\n南风不用蒲葵扇，纱帽闲眠对水鸥。",
        pinyin: "ào lì shēn xián xiào wǔ hóu， xī jiāng qǔ zhú qǐ gāo lóu。\nnán fēng bù yòng pú kuí shàn， shā mào xián mián duì shuǐ ōu。",
        translation: "清闲自在的小官笑着看那些显贵们，从江边取来竹子盖起高楼。南风吹来，不用摇蒲葵扇，戴着纱帽悠闲地睡觉，望着门外的水鸥。",
      }
      ],
    },
    {
      title: "直中书省 · 白居易",
      art: 'poetry-qianjia:ch163',
      artPrompt: "古诗《直中书省》意境插画：丝纶阁下文章静，钟鼓楼中刻漏长。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "丝纶阁下文章静，钟鼓楼中刻漏长。\n独坐黄昏谁是伴，紫薇花对紫薇郎。",
        pinyin: "sī lún gé xià wén zhāng jìng， zhōng gǔ lóu zhōng kè lòu cháng。\ndú zuò huáng hūn shuí shì bàn， zǐ wēi huā duì zǐ wēi láng。",
        translation: "丝纶阁里静悄悄的，我安安静静地写文章，钟鼓楼里的滴漏声响个不停，只觉得夜很长。黄昏里独自坐着，谁来陪我呢？只有紫薇花对着看花的我。",
      }
      ],
    },
    {
      title: "观书有感 · 朱熹",
      art: 'poetry-qianjia:ch164',
      artPrompt: "古诗《观书有感》意境插画：半亩方塘一鉴开，天光云影共徘徊。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "半亩方塘一鉴开，天光云影共徘徊。\n问渠那得清如许，为有源头活水来。",
        pinyin: "bàn mǔ fāng táng yī jiàn kāi， tiān guāng yún yǐng gòng pái huái。\nwèn qú nà dé qīng rú xǔ， wèi yǒu yuán tóu huó shuǐ lái。",
        translation: "半亩方形的小池塘像一面打开的镜子，天上的光和云的影子在里面一起慢慢移动。要问池水为什么这样清澈，因为有源头源源不断地送来活水呀。",
      }
      ],
    },
    {
      title: "泛舟 · 朱熹",
      art: 'poetry-qianjia:ch165',
      artPrompt: "古诗《泛舟》意境插画：昨夜江边春水生，艨艟巨舰一毛轻。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "昨夜江边春水生，艨艟巨舰一毛轻。\n向来枉费推移力，此日中流自在行。",
        pinyin: "zuó yè jiāng biān chūn shuǐ shēng， méng chōng jù jiàn yī máo qīng。\nxiàng lái wǎng fèi tuī yí lì， cǐ rì zhōng liú zì zài háng。",
        translation: "昨天夜里江边涨了春水，大船现在就像一根羽毛一样轻。从前水浅时白白花了很多人推拉它，今天它能在江心自由自在地行驶了。",
      }
      ],
    },
    {
      title: "冷泉亭 · 林稹",
      art: 'poetry-qianjia:ch166',
      artPrompt: "古诗《冷泉亭》意境插画：一泓清可沁诗脾，冷暖年来只自知。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "一泓清可沁诗脾，冷暖年来只自知。\n流出西湖载歌舞，回头不似在山时。",
        pinyin: "yī hóng qīng kě qìn shī pí， lěng nuǎn nián lái zhī zì zhī。\nliú chū xī hú zǎi gē wǔ， huí tóu bù sì zài shān shí。",
        translation: "一股清泉水凉沁人心，让人诗兴大发，可是水的冷暖这些年来只有它自己知道。等它流进西湖、载着游船歌舞以后，回头看看，就再也不像在山里那时那样清了。",
      }
      ],
    },
    {
      title: "冬景 · 苏轼",
      art: 'poetry-qianjia:ch167',
      artPrompt: "古诗《冬景》意境插画：荷尽已无擎雨盖，菊残犹有傲霜枝。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "荷尽已无擎雨盖，菊残犹有傲霜枝。\n一年好景君须记，最是橙黄橘绿时。",
        pinyin: "hé jìn yǐ wú qíng yǔ gài， jú cán yóu yǒu ào shuāng zhī。\nyī nián hǎo jǐng jūn xū jì， zuì shì chéng huáng jú lǜ shí。",
        translation: "荷花谢了，再也没有举起来挡雨的荷叶；菊花枯了，却还留着不怕霜冻的花枝。一年中最好的景致你一定要记住，那就是橙子变黄、橘子还绿的时节。",
      }
      ],
    },
    {
      title: "枫桥夜泊 · 张继",
      art: 'poetry-qianjia:ch168',
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
      title: "寒夜 · 杜小山",
      art: 'poetry-qianjia:ch169',
      artPrompt: "古诗《寒夜》意境插画：寒夜客来茶当酒，竹炉汤沸火初红。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "寒夜客来茶当酒，竹炉汤沸火初红。\n寻常一样窗前月，才有梅花便不同。",
        pinyin: "hán yè kè lái chá dāng jiǔ， zhú lú tāng fèi huǒ chū hóng。\nxún cháng yī yàng chuāng qián yuè， cái yǒu méi huā biàn bù tóng。",
        translation: "寒冷的夜里客人来了，用热茶代替酒来招待，竹炉里的水烧开了，炉火刚烧得红红的。窗前的月亮和平常一样，可是有了梅花的影子，就大不一样了。",
      }
      ],
    },
    {
      title: "霜月 · 李商隐",
      art: 'poetry-qianjia:ch170',
      artPrompt: "古诗《霜月》意境插画：初闻征雁已无蝉，百尺楼台水接天。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "初闻征雁已无蝉，百尺楼台水接天。\n青女素娥俱耐冷，月中霜里斗婵娟。",
        pinyin: "chū wén zhēng yàn yǐ wú chán， bǎi chǐ lóu tái shuǐ jiē tiān。\nqīng nǚ sù é jù nài lěng， yuè zhōng shuāng lǐ dòu chán juān。",
        translation: "刚听到大雁南飞的叫声，就再也听不见蝉声了，登上百尺高楼远望，水和天连成一片。霜神和月宫的仙女都不怕冷，在月光里、寒霜中比赛谁更美丽。",
      }
      ],
    },
    {
      title: "梅 · 王淇",
      art: 'poetry-qianjia:ch171',
      artPrompt: "古诗《梅》意境插画：不受尘埃半点侵，竹篱茅舍自甘心。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "不受尘埃半点侵，竹篱茅舍自甘心。\n只因误识林和靖，惹得诗人说到今。",
        pinyin: "bù shòu chén āi bàn diǎn qīn， zhú lí máo shè zì gān xīn。\nzhī yīn wù shí lín hé jìng， rě dé shī rén shuō dào jīn。",
        translation: "梅花不让半点尘土沾染自己，甘心在竹篱笆、茅草屋旁静静地开放。只因为结识了爱梅的林和靖，惹得诗人们一直谈论到今天。",
      }
      ],
    },
    {
      title: "早春 · 白玉蟾",
      art: 'poetry-qianjia:ch172',
      artPrompt: "古诗《早春》意境插画：南枝才放两三花，雪里吟香弄粉些。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "南枝才放两三花，雪里吟香弄粉些。\n淡淡著烟浓著月，深深笼水浅笼沙。",
        pinyin: "nán zhī cái fàng liǎng sān huā， xuě lǐ yín xiāng nòng fěn xiē。\ndàn dàn zhù yān nóng zhù yuè， shēn shēn lóng shuǐ qiǎn lóng shā。",
        translation: "向南的梅枝刚刚开出两三朵花，我在雪里吟咏它的清香，欣赏它像脂粉一样洁白的颜色。淡淡的雾气、浓浓的月色笼罩着它，深深的水面、浅浅的沙地都映着它的影子。",
      }
      ],
    },
    {
      title: "雪梅（其一） · 卢梅坡",
      art: 'poetry-qianjia:ch173',
      artPrompt: "古诗《雪梅（其一）》意境插画：梅雪争春未肯降，骚人阁笔费评章。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "梅雪争春未肯降，骚人阁笔费评章。\n梅须逊雪三分白，雪却输梅一段香。",
        pinyin: "méi xuě zhēng chūn wèi kěn jiàng， sāo rén gé bǐ fèi píng zhāng。\nméi xū xùn xuě sān fēn bái， xuě què shū méi yī duàn xiāng。",
        translation: "梅花和雪花争着说是自己带来了春天，谁也不肯认输，诗人只好放下笔，费心地去评判它们。要论白，梅花比雪花差了三分；可要论香，雪花就输给梅花一段清香啦。",
      }
      ],
    },
    {
      title: "雪梅（其二） · 卢梅坡",
      art: 'poetry-qianjia:ch174',
      artPrompt: "古诗《雪梅（其二）》意境插画：有梅无雪不精神，有雪无诗俗了人。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "有梅无雪不精神，有雪无诗俗了人。\n日暮诗成天又雪，与梅井作十分春。",
        pinyin: "yǒu méi wú xuě bù jīng shén， yǒu xuě wú shī sú le rén。\nrì mù shī chéng tiān yòu xuě， yǔ méi jǐng zuò shí fēn chūn。",
        translation: "只有梅花没有雪，看起来就不够精神；有雪却没有诗，人就变得俗气了。傍晚诗刚写好，天上又飘起了雪，雪和梅在一起，凑成了满满的春色。",
      }
      ],
    },
    {
      title: "答钟弱翁 · 牧童",
      art: 'poetry-qianjia:ch175',
      artPrompt: "古诗《答钟弱翁》意境插画：草铺横野六七里，笛弄晚风三四声。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "草铺横野六七里，笛弄晚风三四声。\n归来饱饭黄昏后，不脱蓑衣卧月明。",
        pinyin: "cǎo pù héng yě liù qī lǐ， dí nòng wǎn fēng sān sì shēng。\nguī lái bǎo fàn huáng hūn hòu， bù tuō suō yī wò yuè míng。",
        translation: "绿草铺满六七里宽的原野，晚风里传来三四声悠扬的笛声。牧童回来吃饱了饭，已经是黄昏以后，他连蓑衣都不脱，就躺在明亮的月光下睡觉了。",
      }
      ],
    },
    {
      title: "秦淮夜泊 · 杜牧",
      art: 'poetry-qianjia:ch176',
      artPrompt: "古诗《秦淮夜泊》意境插画：烟笼寒水月笼沙，夜泊秦淮近酒家。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "烟笼寒水月笼沙，夜泊秦淮近酒家。\n商女不知亡国恨，隔江犹唱后庭花。",
        pinyin: "yān lóng hán shuǐ yuè lóng shā， yè bó qín huái jìn jiǔ jiā。\nshāng nǚ bù zhī wáng guó hèn， gé jiāng yóu chàng hòu tíng huā。",
        translation: "烟雾笼罩着冰冷的河水，月光笼罩着岸边的沙，夜里船停在秦淮河边，紧挨着酒家。唱歌的女子不懂得亡国的悲痛，隔着江还在唱《后庭花》。",
      }
      ],
    },
    {
      title: "归雁 · 钱起",
      art: 'poetry-qianjia:ch177',
      artPrompt: "古诗《归雁》意境插画：潇湘何事等闲回，水碧沙明两岸苔。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "潇湘何事等闲回，水碧沙明两岸苔。\n二十五弦弹夜月，不胜清怨却飞来。",
        pinyin: "xiāo xiāng hé shì děng xián huí， shuǐ bì shā míng liǎng àn tái。\nèr shí wǔ xián tán yè yuè， bù shèng qīng yuàn què fēi lái。",
        translation: "大雁啊，你为什么随随便便就从潇水湘江飞回来？那边水那么碧绿、沙那么明亮，两岸长满青苔呀。哦，原来是因为有人在月夜里弹二十五弦的瑟，曲声太哀怨，你受不了才飞了回来。",
      }
      ],
    },
    {
      title: "题壁 · 无名氏",
      art: 'poetry-qianjia:ch178',
      artPrompt: "古诗《题壁》意境插画：一团茅草乱蓬蓬，蓦地烧天蓦地空。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "一团茅草乱蓬蓬，蓦地烧天蓦地空。\n争似满炉煨榾柮，漫腾腾地暖烘烘。",
        pinyin: "yī tuán máo cǎo luàn péng péng， mò dì shāo tiān mò dì kōng。\nzhēng sì mǎn lú wēi gǔ duò， màn téng téng dì nuǎn hōng hōng。",
        translation: "一团乱蓬蓬的茅草，猛地烧起来火焰冲天，又猛地一下烧空了。哪比得上满炉子的树疙瘩慢慢烧，不紧不慢地，屋里暖烘烘的。",
      }
      ],
    },
    {
      title: "早朝大明宫 · 贾至",
      art: 'poetry-qianjia:ch179',
      artPrompt: "古诗《早朝大明宫》意境插画：银烛朝天紫陌长，禁城春色晓苍苍。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "银烛朝天紫陌长，禁城春色晓苍苍。\n千条弱柳垂青锁，百啭流莺绕建章。\n剑佩声随玉墀步，衣冠身惹御炉香。\n共沐恩波凤池上，朝朝染翰侍君王。",
        pinyin: "yín zhú cháo tiān zǐ mò cháng， jìn chéng chūn sè xiǎo cāng cāng。\nqiān tiáo ruò liǔ chuí qīng suǒ， bǎi zhuàn liú yīng rào jiàn zhāng。\njiàn pèi shēng suí yù chí bù， yī guān shēn rě yù lú xiāng。\ngòng mù ēn bō fèng chí shàng， zhāo zhāo rǎn hàn shì jūn wáng。",
        translation: "天还没大亮，官员们点着银烛走上长长的京城大道，皇宫里春天的晨色苍苍茫茫。千万条柔柳垂在宫门前，黄莺绕着宫殿啼叫个不停。官员们走上玉阶，身上的宝剑和玉佩叮当作响，衣帽上沾了御炉的香烟。大家在皇宫里一同蒙受皇恩，天天拿起笔写文章侍奉君王。",
      }
      ],
    },
    {
      title: "和贾舍人早朝 · 杜甫",
      art: 'poetry-qianjia:ch180',
      artPrompt: "古诗《和贾舍人早朝》意境插画：五夜漏声催晓箭，九重春色醉仙桃。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "五夜漏声催晓箭，九重春色醉仙桃。\n旌旗日暖龙蛇动，宫殿风微燕雀高。\n朝罢香烟携满袖，诗成珠玉在挥毫。\n欲知世掌丝纶美，池上于今有凤毛。",
        pinyin: "wǔ yè lòu shēng cuī xiǎo jiàn， jiǔ chóng chūn sè zuì xiān táo。\njīng qí rì nuǎn lóng shé dòng， gōng diàn fēng wēi yàn què gāo。\ncháo bà xiāng yān xié mǎn xiù， shī chéng zhū yù zài huī háo。\nyù zhī shì zhǎng sī lún měi， chí shàng yú jīn yǒu fèng máo。",
        translation: "五更的滴漏声催着天快亮，皇宫里春色浓浓，仙桃红得像喝醉了一样。太阳暖洋洋地照着，旌旗上的龙蛇图案好像在舞动，微风吹着宫殿，燕子飞得高高的。早朝结束后，衣袖里还带着炉烟的香气，挥笔写出了珠玉一般的好诗。要知道世代为皇帝起草诏书多么荣耀，如今凤凰池上又有了出色的后人。",
      }
      ],
    },
    {
      title: "和贾舍人早朝 · 王维",
      art: 'poetry-qianjia:ch181',
      artPrompt: "古诗《和贾舍人早朝》意境插画：绛帻鸡人报晓筹，尚衣方进翠云裘。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "绛帻鸡人报晓筹，尚衣方进翠云裘。\n九天阊阖开宫殿，万国衣冠拜冕旒。\n日色才临仙掌动，香烟欲傍衮龙浮。\n朝罢须裁五色诏，佩声归到凤池头。",
        pinyin: "jiàng zé jī rén bào xiǎo chóu， shàng yī fāng jìn cuì yún qiú。\njiǔ tiān chāng hé kāi gōng diàn， wàn guó yī guān bài miǎn liú。\nrì sè cái lín xiān zhǎng dòng， xiāng yān yù bàng gǔn lóng fú。\ncháo bà xū cái wǔ sè zhào， pèi shēng guī dào fèng chí tóu。",
        translation: "戴红头巾的报时官报出了天亮的时辰，掌管衣物的官员正捧上翠云裘。宫殿的大门一层层打开，各国来朝拜的使臣都向着皇帝行礼。太阳刚照到宫殿的掌扇，香烟飘到皇帝的龙袍旁边。早朝结束后还要起草诏书，身上玉佩叮当响，走回凤凰池边的官署去。",
      }
      ],
    },
    {
      title: "和贾舍人早朝 · 岑参",
      art: 'poetry-qianjia:ch182',
      artPrompt: "古诗《和贾舍人早朝》意境插画：鸡鸣紫陌曙光寒，莺啭皇州春色阑。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "鸡鸣紫陌曙光寒，莺啭皇州春色阑。\n金阙晓钟开万户，玉阶仙仗拥千官。\n花迎剑佩星初落，柳拂旌旗露未干。\n独有凤凰池上客，阳春一曲和皆难。",
        pinyin: "jī míng zǐ mò shǔ guāng hán， yīng zhuàn huáng zhōu chūn sè lán。\njīn quē xiǎo zhōng kāi wàn hù， yù jiē xiān zhàng yōng qiān guān。\nhuā yíng jiàn pèi xīng chū luò， liǔ fú jīng qí lù wèi gān。\ndú yǒu fèng huáng chí shàng kè， yáng chūn yī qǔ hé jiē nán。",
        translation: "鸡叫的时候，京城的大路上曙光初露带着寒意，黄莺啼叫，京城春光正好。宫殿的晓钟一响，千万扇宫门都打开了，玉阶前仪仗齐整，围着千百位官员。星星刚刚落下，花儿迎着官员身上的剑佩，柳枝拂着旌旗，露水还没有干。只有凤凰池上的中书舍人，他写出那么好的一首诗，别人都很难和得上。",
      }
      ],
    },
    {
      title: "上元应制 · 蔡襄",
      art: 'poetry-qianjia:ch183',
      artPrompt: "古诗《上元应制》意境插画：高列千峰宝炬森，端门方喜翠华临。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "高列千峰宝炬森，端门方喜翠华临。\n宸游不为三元夜，乐事还同万众心。\n天上清光留此夕，人间和气阁春阴。\n要知尽庆华封祝，四十余年惠爱深。",
        pinyin: "gāo liè qiān fēng bǎo jù sēn， duān mén fāng xǐ cuì huá lín。\nchén yóu bù wèi sān yuán yè， lè shì hái tóng wàn zhòng xīn。\ntiān shàng qīng guāng liú cǐ xī， rén jiān hé qì gé chūn yīn。\nyào zhī jìn qìng huá fēng zhù， sì shí yú nián huì ài shēn。",
        translation: "元宵夜里，千万座灯山高高排列，像树林一样密集，皇帝正高兴地来到端门。皇上出游不只是为了元宵赏灯，还为了和万民一同欢乐。天上明亮的月光留在今夜，人间一派和气，春意融融。要知道大家都在为皇上祝福，因为他四十多年来对百姓的恩惠和爱护太深了。",
      }
      ],
    },
    {
      title: "上元应制 · 王淇",
      art: 'poetry-qianjia:ch184',
      artPrompt: "古诗《上元应制》意境插画：雪消华月满仙台，万烛当楼宝扇开。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "雪消华月满仙台，万烛当楼宝扇开。\n双凤云中扶辇下，六鳌海上驾山来。\n镐京春酒沾周宴，汾水秋风陋汉才。\n一曲升平人尽乐，君王又进紫霞杯。",
        pinyin: "xuě xiāo huá yuè mǎn xiān tái， wàn zhú dāng lóu bǎo shàn kāi。\nshuāng fèng yún zhōng fú niǎn xià， liù áo hǎi shàng jià shān lái。\nhào jīng chūn jiǔ zhān zhōu yàn， fén shuǐ qiū fēng lòu hàn cái。\nyī qǔ shēng píng rén jìn lè， jūn wáng yòu jìn zǐ xiá bēi。",
        translation: "雪化了，明亮的月光洒满宫殿的高台，楼前点着万支蜡烛，宝扇慢慢打开。皇帝的车驾像由云中的双凤扶着下来，又像海上的大鳌驮着仙山驶来。宫里摆开春酒盛宴，一曲太平之歌人人都快乐，君王又举起了紫霞杯饮酒。",
      }
      ],
    },
    {
      title: "侍宴 · 沈佺期",
      art: 'poetry-qianjia:ch185',
      artPrompt: "古诗《侍宴》意境插画：皇家贵主好神仙，别业初开云汉边。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "皇家贵主好神仙，别业初开云汉边。\n山出尽如鸣凤岭，池成不让饮龙川。\n妆楼翠幌教春住，舞阁金铺借日悬。\n敬从乘舆来此地，称觞献寿乐钧天。",
        pinyin: "huáng jiā guì zhǔ hǎo shén xiān， bié yè chū kāi yún hàn biān。\nshān chū jìn rú míng fèng lǐng， chí chéng bù ràng yǐn lóng chuān。\nzhuāng lóu cuì huǎng jiào chūn zhù， wǔ gé jīn pù jiè rì xuán。\njìng cóng chéng yú lái cǐ dì， chēng shāng xiàn shòu lè jūn tiān。",
        translation: "皇家的公主喜欢神仙一样的生活，她的别墅刚刚建好，好像坐落在天河边一样。园里的山峰像鸣凤岭，池水也不输给饮龙的川流。妆楼上翠绿的帷幔好像把春天留住了，歌舞楼阁上金色的装饰在太阳下闪闪发光。我恭敬地跟着皇帝的车驾来到这里，举杯祝寿，听着像天上仙乐一样的音乐。",
      }
      ],
    },
    {
      title: "答丁元珍 · 欧阳修",
      art: 'poetry-qianjia:ch186',
      artPrompt: "古诗《答丁元珍》意境插画：春风疑不到天涯，二月山城未见花。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "春风疑不到天涯，二月山城未见花。\n残雪压枝犹有橘，冻雷惊笋欲抽芽。\n夜闻啼雁生乡思，病入新年感物华。\n曾是洛阳花下客，野芳虽晚不须嗟。",
        pinyin: "chūn fēng yí bù dào tiān yá， èr yuè shān chéng wèi jiàn huā。\ncán xuě yā zhī yóu yǒu jú， dòng léi jīng sǔn yù chōu yá。\nyè wén tí yàn shēng xiāng sī， bìng rù xīn nián gǎn wù huá。\ncéng shì luò yáng huā xià kè， yě fāng suī wǎn bù xū jiē。",
        translation: "我怀疑春风吹不到这偏远的地方，都二月了，山城里还没看见花开。残雪压着枝头，枝上还挂着橘子，春雷一声声，惊得竹笋快要发芽。夜里听见大雁啼叫，勾起了思乡的心情，带病进入新年，看着景物悄悄变化。我曾在洛阳赏过那么多花，这里的野花虽然开得晚些，也不必叹息呀。",
      }
      ],
    },
    {
      title: "插花吟 · 邵雍",
      art: 'poetry-qianjia:ch187',
      artPrompt: "古诗《插花吟》意境插画：头上花枝照酒卮，酒卮中有好花枝。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "头上花枝照酒卮，酒卮中有好花枝。\n身经两世太平日，眼见四朝全盛时。\n况复筋骸粗康健，那堪时节正芳菲。\n酒涵花影红光溜，争忍花前不醉归。",
        pinyin: "tóu shàng huā zhī zhào jiǔ zhī， jiǔ zhī zhōng yǒu hǎo huā zhī。\nshēn jīng liǎng shì tài píng rì， yǎn jiàn sì cháo quán shèng shí。\nkuàng fù jīn hái cū kāng jiàn， nà kān shí jié zhèng fāng fēi。\njiǔ hán huā yǐng hóng guāng liū， zhēng rěn huā qián bù zuì guī。",
        translation: "头上插着的花枝映在酒杯里，酒杯中也有好看的花枝。我活过了几十年太平的日子，亲眼见到四朝全盛的时光。何况身体还算康健，又正遇上花开得最好的时节。酒里映着花影，泛着红光，怎么忍心不在花前喝醉了才回家呢？",
      }
      ],
    },
    {
      title: "寓意 · 晏殊",
      art: 'poetry-qianjia:ch188',
      artPrompt: "古诗《寓意》意境插画：油壁香车不再逢，峡云无迹任西东。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "油壁香车不再逢，峡云无迹任西东。\n梨花院落溶溶月，柳絮池塘淡淡风。\n几日寂寥伤酒后，一番萧瑟禁烟中。\n鱼书欲寄何由达，水远山长处处同。",
        pinyin: "yóu bì xiāng chē bù zài féng， xiá yún wú jì rèn xī dōng。\nlí huā yuàn luò róng róng yuè， liǔ xù chí táng dàn dàn fēng。\njǐ rì jì liáo shāng jiǔ hòu， yī fān xiāo sè jìn yān zhōng。\nyú shū yù jì hé yóu dá， shuǐ yuǎn shān cháng chù chù tóng。",
        translation: "坐着香车的那个人再也不能相逢了，她像峡中的云一样飘散，再没有踪迹。院子里梨花开放，月光溶溶，池塘边柳絮飘飘，微风淡淡。多少天来冷冷清清，借酒消愁伤了身体，寒食禁烟的日子里一片萧瑟。想写一封信寄给她，可是水远山长，怎么也送不到。",
      }
      ],
    },
    {
      title: "寒食书事 · 赵鼎",
      art: 'poetry-qianjia:ch189',
      artPrompt: "古诗《寒食书事》意境插画：寂寂柴门村落里，也教插柳纪年华。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "寂寂柴门村落里，也教插柳纪年华。\n禁烟不到粤人国，上冢亦携庞老家。\n汉寝唐陵无麦饭，山溪野径有梨花。\n一樽竟藉青苔卧，莫管城头奏暮笳。",
        pinyin: "jì jì chái mén cūn luò lǐ， yě jiào chā liǔ jì nián huá。\njìn yān bù dào yuè rén guó， shàng zhǒng yì xié páng lǎo jiā。\nhàn qǐn táng líng wú mài fàn， shān xī yě jìng yǒu lí huā。\nyī zūn jìng jiè qīng tái wò， mò guǎn chéng tóu zòu mù jiā。",
        translation: "冷冷清清的柴门小村里，人们也插上柳条，记着又是一年了。寒食禁火的习俗没有传到南方粤地，扫墓时人们也都像庞德公那样带着酒食。汉唐皇帝的陵墓已经没有人去祭供，山溪边的小路上却开满了梨花。我拿着一壶酒，索性躺在青苔上，不用去管城头傍晚传来的笳声。",
      }
      ],
    },
    {
      title: "清明 · 黄庭坚",
      art: 'poetry-qianjia:ch190',
      artPrompt: "古诗《清明》意境插画：佳节清明桃李笑，野田荒冢只生愁。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "佳节清明桃李笑，野田荒冢只生愁。\n雷惊天地龙蛇蛰，雨足郊原草木柔。\n人乞祭余骄妾妇，士甘焚死不公侯。\n贤愚千载知谁是，满眼蓬蒿共一丘。",
        pinyin: "jiā jié qīng míng táo lǐ xiào， yě tián huāng zhǒng zhī shēng chóu。\nléi jīng tiān dì lóng shé zhé， yǔ zú jiāo yuán cǎo mù róu。\nrén qǐ jì yú jiāo qiè fù， shì gān fén sǐ bù gōng hóu。\nxián yú qiān zǎi zhī shuí shì， mǎn yǎn péng hāo gòng yī qiū。",
        translation: "清明时节，桃李开花像在欢笑，可野外田间的荒坟只让人发愁。春雷震动天地，惊醒了冬眠的龙蛇，春雨下得充足，郊外的草木都变得柔嫩。有人乞讨祭祀剩下的供品，回家向妻妾炫耀；有人宁可被烧死，也不愿出来做官。一千年来看这些人是贤是愚，谁说得清呢？到头来都长满蓬蒿，埋在一样的土堆里。",
      }
      ],
    },
    {
      title: "清明 · 高菊卿",
      art: 'poetry-qianjia:ch191',
      artPrompt: "古诗《清明》意境插画：南北山头多墓田，清明祭扫各纷然。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "南北山头多墓田，清明祭扫各纷然。\n纸灰飞作白蝴蝶，泪血染成红杜鹃。\n日落狐狸眠冢上，夜归儿女笑灯前。\n人生有酒须当醉，一滴何曾到九泉。",
        pinyin: "nán běi shān tóu duō mù tián， qīng míng jì sǎo gè fēn rán。\nzhǐ huī fēi zuò bái hú dié， lèi xuè rǎn chéng hóng dù juān。\nrì luò hú li mián zhǒng shàng， yè guī ér nǚ xiào dēng qián。\nrén shēng yǒu jiǔ xū dāng zuì， yī dī hé céng dào jiǔ quán。",
        translation: "南山北山的山坡上有很多坟墓，清明这天人们纷纷去祭扫。烧过的纸灰飞起来，像白色的蝴蝶，人们伤心的眼泪染红了杜鹃花。太阳落山后，狐狸在坟里睡觉，扫墓回来的儿女晚上却在灯前说说笑笑。人活着的时候有酒就该好好喝，等死了以后，祭奠的酒一滴也到不了九泉之下呀。",
      }
      ],
    },
    {
      title: "郊行即事 · 程颢",
      art: 'poetry-qianjia:ch192',
      artPrompt: "古诗《郊行即事》意境插画：芳原绿野恣行时，春入遥山碧四围。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "芳原绿野恣行时，春入遥山碧四围。\n兴逐乱红穿柳巷，困临流水坐苔矶。\n莫辞盏酒十分劝，只恐风花一片飞。\n况是清明好天气，不妨游衍莫忘归。",
        pinyin: "fāng yuán lǜ yě zì xíng shí， chūn rù yáo shān bì sì wéi。\nxīng zhú luàn hóng chuān liǔ xiàng， kùn lín liú shuǐ zuò tái jī。\nmò cí zhǎn jiǔ shí fēn quàn， zhī kǒng fēng huā yī piàn fēi。\nkuàng shì qīng míng hǎo tiān qì， bù fáng yóu yǎn mò wàng guī。",
        translation: "在长满芳草的绿色原野上尽情游玩，春天来到远处的山里，四周一片碧绿。乘着兴致追逐飘落的花瓣，穿过柳树成行的小巷，走累了就坐在长满青苔的石头上看流水。别推辞别人殷勤劝的酒，只怕风吹花落，好时光就过去了。何况今天又是清明这样的好天气，尽情游玩吧，可别忘了回家。",
      }
      ],
    },
    {
      title: "秋千 · 僧惠洪",
      art: 'poetry-qianjia:ch193',
      artPrompt: "古诗《秋千》意境插画：画架双裁翠络偏，佳人春戏小楼前。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "画架双裁翠络偏，佳人春戏小楼前。\n飘扬血色裙拖地，断送玉容人上天。\n花皮润沾红杏雨，彩绳斜挂绿杨烟。\n下来闲处从容立，疑是蟾宫谪神仙。",
        pinyin: "huà jià shuāng cái cuì luò piān， jiā rén chūn xì xiǎo lóu qián。\npiāo yáng xuè sè qún tuō dì， duàn sòng yù róng rén shàng tiān。\nhuā pí rùn zhān hóng xìng yǔ， cǎi shéng xié guà lǜ yáng yān。\nxià lái xián chù cóng róng lì， yí shì chán gōng zhé shén xiān。",
        translation: "彩画的双架秋千上，翠绿的绳索斜斜地垂着，美丽的姑娘在春天的小楼前荡秋千玩。红色的裙子飘起来拖到地上，人随着秋千一下子升到半空。荡起来时身上沾了红杏花瓣像下了一场花雨，彩绳斜斜地挂在绿柳如烟的树间。她下来后悠闲地站着，让人怀疑是从月宫下凡的仙女。",
      }
      ],
    },
    {
      title: "曲江对酒（其一） · 杜甫",
      art: 'poetry-qianjia:ch194',
      artPrompt: "古诗《曲江对酒（其一）》意境插画：一片花飞减却春，风飘万点正愁人。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "一片花飞减却春，风飘万点正愁人。\n且看欲尽花经眼，莫厌伤多酒入唇。\n江上小堂巢翡翠，苑边高冢卧麒麟。\n细推物理须行乐，何用浮名绊此身。",
        pinyin: "yī piàn huā fēi jiǎn què chūn， fēng piāo wàn diǎn zhèng chóu rén。\nqiě kàn yù jìn huā jīng yǎn， mò yàn shāng duō jiǔ rù chún。\njiāng shàng xiǎo táng cháo fěi cuì， yuàn biān gāo zhǒng wò qí lín。\nxì tuī wù lǐ xū xíng lè， hé yòng fú míng bàn cǐ shēn。",
        translation: "一片花瓣飘落，春光就少了一分，风吹起万点落花，真叫人发愁。眼看着花儿快落尽了，就别嫌酒多，再喝一杯吧；江边的小堂里翡翠鸟筑了巢，苑墙边高高的坟前卧着石麒麟。细细想来不如趁着好时光快快活活，何必让虚浮的名声绊住自己呢。",
      }
      ],
    },
    {
      title: "曲江对酒（其二） · 杜甫",
      art: 'poetry-qianjia:ch195',
      artPrompt: "古诗《曲江对酒（其二）》意境插画：朝回日日典春衣，每日江头尽醉归。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "朝回日日典春衣，每日江头尽醉归。\n酒债寻常行处有，人生七十古来稀。\n穿花蛱蝶深深见，点水蜻蜓款款飞。\n传与风光共流转，暂时相赏莫相违。",
        pinyin: "cháo huí rì rì diǎn chūn yī， měi rì jiāng tóu jìn zuì guī。\njiǔ zhài xún cháng xíng chù yǒu， rén shēng qī shí gǔ lái xī。\nchuān huā jiá dié shēn shēn jiàn， diǎn shuǐ qīng tíng kuǎn kuǎn fēi。\nchuán yǔ fēng guāng gòng liú zhuǎn， zàn shí xiāng shǎng mò xiāng wéi。",
        translation: "上朝回来天天去典当春衣，每天在江边喝得大醉才回家；走过的地方常常欠着酒债，人生能活到七十岁，自古以来就不多。蝴蝶在花丛深处穿来穿去，蜻蜓点着水慢慢悠悠地飞。就让这大好风光和我一起流连吧，趁暂时互相欣赏，别互相辜负。",
      }
      ],
    },
    {
      title: "黄鹤楼 · 崔颢",
      art: 'poetry-qianjia:ch196',
      artPrompt: "古诗《黄鹤楼》意境插画：昔人已乘黄鹤去，此地空余黄鹤楼。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "昔人已乘黄鹤去，此地空余黄鹤楼。\n黄鹤一去不复返，白云千载空悠悠。\n晴川历历汉阳树，芳草萋萋鹦鹉州。\n日暮乡关何处是，烟波江上使人愁。",
        pinyin: "xī rén yǐ chéng huáng hè qù， cǐ dì kòng yú huáng hè lóu。\nhuáng hè yī qù bù fù fǎn， bái yún qiān zǎi kōng yōu yōu。\nqíng chuān lì lì hàn yáng shù， fāng cǎo qī qī yīng wǔ zhōu。\nrì mù xiāng guān hé chù shì， yān bō jiāng shàng shǐ rén chóu。",
        translation: "从前那位仙人已经骑着黄鹤飞走了，这里只留下一座黄鹤楼。黄鹤一去再也不回来，只有白云千百年空自在天上飘着。天气晴朗，汉阳的树木看得清清楚楚，鹦鹉洲上长满茂盛的芳草。傍晚了，我的家乡在哪里呢？江上烟雾茫茫，让人发愁。",
      }
      ],
    },
    {
      title: "旅怀 · 崔涂",
      art: 'poetry-qianjia:ch197',
      artPrompt: "古诗《旅怀》意境插画：水流花谢两无情，送尽东风过楚城。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "水流花谢两无情，送尽东风过楚城。\n蝴蝶梦中家万里，杜鹃枝上月三更。\n故园书动经年绝，华发春催两鬓生。\n自是不归归便得，五湖烟景有谁争。",
        pinyin: "shuǐ liú huā xiè liǎng wú qíng， sòng jìn dōng fēng guò chǔ chéng。\nhú dié mèng zhōng jiā wàn lǐ， dù juān zhī shàng yuè sān gēng。\ngù yuán shū dòng jīng nián jué， huá fà chūn cuī liǎng bìn shēng。\nzì shì bù guī guī biàn dé， wǔ hú yān jǐng yǒu shuí zhēng。",
        translation: "江水不停地流，花儿谢了，都这么无情，我送走一阵阵春风，走过楚地的城池。梦一醒，家还在万里之外，三更的月光照着杜鹃鸟啼叫的树枝。家乡的书信常常一整年都收不到，春天一来，两鬓又催生出白发。不是回不去，是自己没有回去，只要想回就能回去，五湖的烟水美景，又有谁来跟我争呢？",
      }
      ],
    },
    {
      title: "答李儋 · 韦应物",
      art: 'poetry-qianjia:ch198',
      artPrompt: "古诗《答李儋》意境插画：去年花里逢君别，今日花开又一年。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "去年花里逢君别，今日花开又一年。\n世事茫茫难自料，春愁黯黯独成眠。\n身多疾病思田里，邑有流亡愧俸钱。\n闻道欲来相问讯，西楼望月几回圆。",
        pinyin: "qù nián huā lǐ féng jūn bié， jīn rì huā kāi yòu yī nián。\nshì shì máng máng nán zì liào， chūn chóu àn àn dú chéng mián。\nshēn duō jí bìng sī tián lǐ， yì yǒu liú wáng kuì fèng qián。\nwén dào yù lái xiāng wèn xùn， xī lóu wàng yuè jǐ huí yuán。",
        translation: "去年花开的时候和你分别，今天花又开了，又过了一年。世间的事情茫茫无边，很难料想，春天的愁绪沉沉的，我一个人独自睡去。身上疾病多，很想回到田园去，可是县里还有流离失所的百姓，拿着俸禄让我惭愧。听说你想来看望我，我常常登上西楼望月，月亮已经圆过好几回了。",
      }
      ],
    },
    {
      title: "江村 · 杜甫",
      art: 'poetry-qianjia:ch199',
      artPrompt: "古诗《江村》意境插画：清江一曲抱村流，长夏江村事事幽。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "清江一曲抱村流，长夏江村事事幽。\n自去自来梁上燕，相亲相近水中鸥。\n老妻画纸为棋局，稚子敲针作钓钩。\n多病所须惟药物，微躯此外更何求。",
        pinyin: "qīng jiāng yī qǔ bào cūn liú， cháng xià jiāng cūn shì shì yōu。\nzì qù zì lái liáng shàng yàn， xiāng qīn xiāng jìn shuǐ zhōng ōu。\nlǎo qī huà zhǐ wèi qí jú， zhì zǐ qiāo zhēn zuò diào gōu。\nduō bìng suǒ xū wéi yào wù， wēi qū cǐ wài gèng hé qiú。",
        translation: "清清的江水弯弯地绕着村子流过，漫长的夏天里，江村的一切都那么安静清幽。燕子在堂前自由自在地飞来飞去，水鸥在水中亲亲热热地相伴。老伴在纸上画棋盘，小儿子敲弯了针做钓钩。我多病的身体需要的只是些药，除了这些，这样的日子还有什么可求的呢？",
      }
      ],
    },
    {
      title: "夏日 · 张文潜",
      art: 'poetry-qianjia:ch200',
      artPrompt: "古诗《夏日》意境插画：长夏江村风日清，檐牙燕雀已生成。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "长夏江村风日清，檐牙燕雀已生成。\n蝶衣晒粉花枝午，蛛网添丝屋角晴。\n落落疏廉邀月影，嘈嘈虚枕纳溪声。\n久斑两鬓如霜雪，直欲樵渔过此生。",
        pinyin: "cháng xià jiāng cūn fēng rì qīng， yán yá yàn què yǐ shēng chéng。\ndié yī shài fěn huā zhī wǔ， zhū wǎng tiān sī wū jiǎo qíng。\nluò luò shū lián yāo yuè yǐng， cáo cáo xū zhěn nà xī shēng。\njiǔ bān liǎng bìn rú shuāng xuě， zhí yù qiáo yú guò cǐ shēng。",
        translation: "漫长的夏天里，江村风和日丽，屋檐下的小燕子、小麻雀都已经长大了。正午时蝴蝶在花枝上晾晒翅膀上的粉，晴天里蜘蛛在屋角慢慢添着蛛丝。稀疏的帘子拢来月亮的影子，我靠在枕头上，听着潺潺的溪水声。我两鬓的头发早就白了，像霜雪一样，真想就这样砍柴打鱼，度过这一生。",
      }
      ],
    },
    {
      title: "积雨辋川庄作 · 王维",
      art: 'poetry-qianjia:ch201',
      artPrompt: "古诗《积雨辋川庄作》意境插画：积雨空林烟火迟，蒸藜炊黍饷东菑。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "积雨空林烟火迟，蒸藜炊黍饷东菑。\n漠漠水田飞白鹭，阴阴夏木啭黄鹂。\n山中习静合朝槿，松下清斋折露葵。\n野老与人争席罢，海鸥何事更相疑。",
        pinyin: "jī yǔ kōng lín yān huǒ chí， zhēng lí chuī shǔ xiǎng dōng zī。\nmò mò shuǐ tián fēi bái lù， yīn yīn xià mù zhuàn huáng lí。\nshān zhōng xí jìng hé cháo jǐn， sōng xià qīng zhāi zhé lù kuí。\nyě lǎo yǔ rén zhēng xí bà， hǎi ōu hé shì gèng xiāng yí。",
        translation: "久雨的树林里炊烟慢慢升起，农人们做好饭菜送到东边的田里去。广阔的水田上白鹭翩翩飞过，浓密的夏树里黄鹂婉转地叫。我在山里静静地看木槿花早上开放，在松树下吃着干净的素饭。我已经像乡野老人一样和人们随意相处了，海鸥为什么还要猜疑我呢？",
      }
      ],
    },
    {
      title: "新竹 · 陆游",
      art: 'poetry-qianjia:ch202',
      artPrompt: "古诗《新竹》意境插画：插棘编篱谨护持，养成寒碧映涟漪。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "插棘编篱谨护持，养成寒碧映涟漪。\n清风掠地秋先到，赤日行天午不知。\n解箨时闻声簌簌，放梢初见影离离。\n归闲我欲频来此，枕簟仍教到处随。",
        pinyin: "chā jí biān lí jǐn hù chí， yǎng chéng hán bì yìng lián yī。\nqīng fēng lüè dì qiū xiān dào， chì rì xíng tiān wǔ bù zhī。\njiě tuò shí wén shēng sù sù， fàng shāo chū jiàn yǐng lí lí。\nguī xián wǒ yù pín lái cǐ， zhěn diàn réng jiào dào chù suí。",
        translation: "插上荆棘编成篱笆，小心地保护新竹，把它们养成一片青翠，倒映在水波里。清风吹过地面，竹林最早透出秋意，太阳当头照着，人在竹林里却不知道是正午。竹笋脱壳时能听到簌簌的声音，新竹抽梢时刚见到疏疏的影子。等我回家过闲散日子后，想常常来这里，带着枕头和竹席随处躺下歇息。",
      }
      ],
    },
    {
      title: "偶成 · 程颢",
      art: 'poetry-qianjia:ch203',
      artPrompt: "古诗《偶成》意境插画：闲来无事不从容，睡觉东窗日已红。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "闲来无事不从容，睡觉东窗日已红。\n万物静观皆自得，四时佳兴与人同。\n道通天地有形外，思入风云变态中。\n富贵不淫贫贱乐，男儿到此是豪雄。",
        pinyin: "xián lái wú shì bù cóng róng， shuì jiào dōng chuāng rì yǐ hóng。\nwàn wù jìng guān jiē zì dé， sì shí jiā xīng yǔ rén tóng。\ndào tōng tiān dì yǒu xíng wài， sī rù fēng yún biàn tài zhōng。\nfù guì bù yín pín jiàn lè， nán ér dào cǐ shì háo xióng。",
        translation: "清闲下来，做什么都不慌不忙，一觉醒来，东窗外太阳已经红彤彤的了。静静地看着万物，样样都有各自的自在，四季的好景致，我也和大家一样喜爱。道理贯通在天地万物之外，思绪又飞进风云变幻之中。富贵时不迷惑放纵，贫贱时也能快快乐乐，男儿能做到这样，就是真正的豪杰英雄。",
      }
      ],
    },
    {
      title: "表兄话旧 · 窦叔向",
      art: 'poetry-qianjia:ch204',
      artPrompt: "古诗《表兄话旧》意境插画：夜合花开香满庭，夜深微雨醉初醒。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "夜合花开香满庭，夜深微雨醉初醒。\n远书珍重何由达，旧事凄凉不可听。\n去日儿童皆长大，昔年亲友半凋零。\n明朝又是孤舟别，愁见河桥酒幔青。",
        pinyin: "yè hé huā kāi xiāng mǎn tíng， yè shēn wēi yǔ zuì chū xǐng。\nyuǎn shū zhēn zhòng hé yóu dá， jiù shì qī liáng bù kě tīng。\nqù rì ér tóng jiē zhǎng dà， xī nián qīn yǒu bàn diāo líng。\nmíng cháo yòu shì gū zhōu bié， chóu jiàn hé qiáo jiǔ màn qīng。",
        translation: "夜合花开了，香气飘满庭院，深夜下着小雨，我刚从醉里醒来。远方的书信那么珍贵，可是怎样才能寄到呢？说起旧事来那么凄凉，让人不忍心再听。从前的孩子们都长大了，当年的亲友有一半已经不在了。明天又要乘孤舟分别，想到要面对河桥边青色的酒帘子，心里就发愁。",
      }
      ],
    },
    {
      title: "游月陂 · 程颢",
      art: 'poetry-qianjia:ch205',
      artPrompt: "古诗《游月陂》意境插画：月坡堤上四徘徊，北有中天百尺台。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "月坡堤上四徘徊，北有中天百尺台。\n万物已随秋气改，一樽聊为晚凉开。\n水心云影闲相照，林下泉声静自来。\n世事无端何足计，但逢佳节约重陪。",
        pinyin: "yuè pō dī shàng sì pái huái， běi yǒu zhōng tiān bǎi chǐ tái。\nwàn wù yǐ suí qiū qì gǎi， yī zūn liáo wèi wǎn liáng kāi。\nshuǐ xīn yún yǐng xián xiāng zhào， lín xià quán shēng jìng zì lái。\nshì shì wú duān hé zú jì， dàn féng jiā jié yuē zhòng péi。",
        translation: "我在月陂堤上四处漫步，北边立着一座高耸入云的百尺台。世间万物都已随着秋气改变了模样，我姑且打开一壶酒，享受傍晚的凉爽。水中映着悠闲的云影，林间泉水声静静传来；世上纷乱的事不值得计较，只盼着逢到好日子，再约你一同来游玩。",
      }
      ],
    },
    {
      title: "秋兴八首（其一） · 杜甫",
      art: 'poetry-qianjia:ch206',
      artPrompt: "古诗《秋兴八首（其一）》意境插画：千家山郭静朝晖，日日江楼坐翠微。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "千家山郭静朝晖，日日江楼坐翠微。\n信宿渔人还泛泛，清秋燕子故飞飞。\n匡衡抗疏功名薄，刘向传经心事违。\n同学少年多不贱，五陵裘马自轻肥。",
        pinyin: "qiān jiā shān guō jìng cháo huī， rì rì jiāng lóu zuò cuì wēi。\nxìn sù yú rén hái fàn fàn， qīng qiū yàn zi gù fēi fēi。\nkuāng héng kàng shū gōng míng báo， liú xiàng chuán jīng xīn shì wéi。\ntóng xué shào nián duō bù jiàn， wǔ líng qiú mǎ zì qīng féi。",
        translation: "上千户人家的山城静静沐浴在晨光里，我天天坐在江楼上，望着青翠的山色。渔人连着几夜仍漂在江上，清秋的燕子偏偏飞个不停。想当年像匡衡那样上书直言，我的功名却很微薄；像刘向那样传授经书，心愿也没能实现；从前的同学少年大多不穷不贱，在五陵一带穿着轻软的皮袍，骑着肥壮的马，好不自在。",
      }
      ],
    },
    {
      title: "秋兴八首（其二） · 杜甫",
      art: 'poetry-qianjia:ch207',
      artPrompt: "古诗《秋兴八首（其二）》意境插画：蓬莱宫阙对南山，承露金茎霄汉间。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "蓬莱宫阙对南山，承露金茎霄汉间。\n西望瑶池降王母，东来紫气满函关。\n云移雉尾开宫扇，日绕龙鳞识圣颜。\n一卧沧江惊岁晚，几回青琐点朝班。",
        pinyin: "péng lái gōng quē duì nán shān， chéng lù jīn jīng xiāo hàn jiān。\nxī wàng yáo chí jiàng wáng mǔ， dōng lái zǐ qì mǎn hán guān。\nyún yí zhì wěi kāi gōng shàn， rì rào lóng lín shí shèng yán。\nyī wò cāng jiāng jīng suì wǎn， jǐ huí qīng suǒ diǎn cháo bān。",
        translation: "蓬莱宫的宫殿正对着南山，承露的铜柱高高立在云天之间；西望瑶池，好像王母娘娘正从天上下来，东边紫气飘来，满满地笼罩着函谷关。雉尾宫扇像云一样慢慢移开，阳光绕着皇帝的龙袍，这才看清圣上的容颜。如今我独自卧在沧江边，吃惊一年又快完了，多少回想回到宫门前按次序排班上朝啊。",
      }
      ],
    },
    {
      title: "秋兴八首（其三） · 杜甫",
      art: 'poetry-qianjia:ch208',
      artPrompt: "古诗《秋兴八首（其三）》意境插画：玉露凋伤枫树林，巫山巫峡气萧森。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "玉露凋伤枫树林，巫山巫峡气萧森。\n江间波浪兼天涌，塞上风云接地阴。\n丛菊两开他日泪，孤舟一系故园心。\n寒衣处处催刀尺，白帝城高急暮砧。",
        pinyin: "yù lù diāo shāng fēng shù lín， wū shān wū xiá qì xiāo sēn。\njiāng jiān bō làng jiān tiān yǒng， sài shàng fēng yún jiē dì yīn。\ncóng jú liǎng kāi tā rì lèi， gū zhōu yī xì gù yuán xīn。\nhán yī chù chù cuī dāo chǐ， bái dì chéng gāo jí mù zhēn。",
        translation: "秋霜打伤了枫树林，巫山巫峡间雾气阴沉萧瑟；江里的波浪涌得好像连着天，塞上的风云低低地压向地面。菊花开了又开，勾起往事的眼泪，一叶孤舟系着我思念故乡的心。家家都在赶做寒衣，白帝城高处传来急促的捣衣声。",
      }
      ],
    },
    {
      title: "秋兴八首（其四） · 杜甫",
      art: 'poetry-qianjia:ch209',
      artPrompt: "古诗《秋兴八首（其四）》意境插画：昆明池水汉时功，武帝旌旗在眼中。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "昆明池水汉时功，武帝旌旗在眼中。\n织女机丝虚夜月，石鲸鳞甲动秋风。\n波飘菰米沉云黑，露冷莲房坠粉红。\n关塞极天惟鸟道，江湖满地一渔翁。",
        pinyin: "kūn míng chí shuǐ hàn shí gōng， wǔ dì jīng qí zài yǎn zhōng。\nzhī nǚ jī sī xū yè yuè， shí jīng lín jiǎ dòng qiū fēng。\nbō piāo gū mǐ chén yún hēi， lù lěng lián fáng zhuì fěn hóng。\nguān sāi jí tiān wéi niǎo dào， jiāng hú mǎn dì yī yú wēng。",
        translation: "昆明池是汉朝时开凿的，汉武帝的旌旗好像还在眼前；织女石像空对着夜月，石鲸的鳞甲在秋风中仿佛在晃动。波浪上漂着菰米，黑得像沉在水里的云，冷露打在莲蓬上，粉红的花瓣片片坠落。关塞高到天边，只有鸟儿能飞的小路；满地江湖上，只剩我一个打渔的老翁。",
      }
      ],
    },
    {
      title: "月夜舟中 · 戴复古",
      art: 'poetry-qianjia:ch210',
      artPrompt: "古诗《月夜舟中》意境插画：满船明月浸虚空，绿水无痕夜气冲。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "满船明月浸虚空，绿水无痕夜气冲。\n诗思浮沉樯影里，梦魂摇拽橹声中。\n星辰冷落碧潭水，鸿雁悲鸣红蓼风。\n数点渔灯依古岸，断桥垂露滴梧桐。",
        pinyin: "mǎn chuán míng yuè jìn xū kōng， lǜ shuǐ wú hén yè qì chōng。\nshī sī fú chén qiáng yǐng lǐ， mèng hún yáo zhuài lǔ shēng zhōng。\nxīng chén lěng luò bì tán shuǐ， hóng yàn bēi míng hóng liǎo fēng。\nshù diǎn yú dēng yī gǔ àn， duàn qiáo chuí lù dī wú tóng。",
        translation: "满船都浸着明月的光，好像浸在空明的天地里；绿水没有波纹，夜气弥漫。我的诗情在桅杆的影子里起起落落，梦魂在摇橹声中轻轻摇晃。星星倒映在冷冷的碧绿潭水里，大雁在秋风中悲鸣；几点渔灯靠着古老的水岸，断桥上的露水滴落在梧桐叶上。",
      }
      ],
    },
    {
      title: "长安秋望 · 赵嘏",
      art: 'poetry-qianjia:ch211',
      artPrompt: "古诗《长安秋望》意境插画：云物凄凉拂署流，汉家宫阙动高秋。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "云物凄凉拂署流，汉家宫阙动高秋。\n残星几点雁横塞，长笛一声人倚楼。\n紫艳半开篱菊静，红衣落尽渚莲愁。\n鲈鱼正美不归去，空戴南冠学楚囚。",
        pinyin: "yún wù qī liáng fú shǔ liú， hàn jiā gōng quē dòng gāo qiū。\ncán xīng jǐ diǎn yàn héng sāi， cháng dí yī shēng rén yǐ lóu。\nzǐ yàn bàn kāi lí jú jìng， hóng yī luò jìn zhǔ lián chóu。\nlú yú zhèng měi bù guī qù， kōng dài nán guān xué chǔ qiú。",
        translation: "拂晓时分，凄清的云霞在天空流动，长安的宫殿在深秋里显得格外高峻。天边还挂着几点残星，大雁飞过边塞；一声长笛响起，有人正倚着楼倾听。紫色的菊花静静地在篱边半开，红色花瓣落尽的莲花在水中小洲上含着愁意。家乡的鲈鱼正肥美，我却不回去，白白像被囚禁的人一样留在这里。",
      }
      ],
    },
    {
      title: "新秋 · 杜甫",
      art: 'poetry-qianjia:ch212',
      artPrompt: "古诗《新秋》意境插画：火云犹未敛奇峰，欹枕初惊一叶风。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "火云犹未敛奇峰，欹枕初惊一叶风。\n几处园林萧瑟里，谁家砧杵寂寥中。\n蝉声断续悲残月，萤焰高低照暮空。\n赋就金门期再献，夜深搔首叹飞蓬。",
        pinyin: "huǒ yún yóu wèi liǎn qí fēng， qī zhěn chū jīng yī yè fēng。\njǐ chù yuán lín xiāo sè lǐ， shuí jiā zhēn chǔ jì liáo zhōng。\nchán shēng duàn xù bēi cán yuè， yíng yàn gāo dī zhào mù kōng。\nfù jiù jīn mén qī zài xiàn， yè shēn sāo shǒu tàn fēi péng。",
        translation: "夏天火红的云还堆成奇峰没有散尽，我斜靠在枕上，被一阵吹落树叶的风惊醒。好几处园林已在秋风中变得萧瑟，不知谁家在寂静里传来捣衣声。蝉声断断续续，对着残月悲鸣；萤火虫忽高忽低，照亮傍晚的天空。我写好了文章盼着再到朝廷去进献，深夜里挠着头，感叹自己像飞蓬一样四处漂泊。",
      }
      ],
    },
    {
      title: "中秋 · 李朴",
      art: 'poetry-qianjia:ch213',
      artPrompt: "古诗《中秋》意境插画：皓魄当空宝镜升，云间仙籁寂无声。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "皓魄当空宝镜升，云间仙籁寂无声。\n平分秋色一轮满，长伴云衢千里明。\n狡兔空从弦外落，妖蟆休向眼前生。\n灵槎拟约同携手，更待银河澈底清。",
        pinyin: "hào pò dāng kōng bǎo jìng shēng， yún jiān xiān lài jì wú shēng。\npíng fēn qiū sè yī lún mǎn， cháng bàn yún qú qiān lǐ míng。\njiǎo tù kōng cóng xián wài luò， yāo ma xiū xiàng yǎn qián shēng。\nlíng chá nǐ yuē tóng xié shǒu， gèng dài yín hé chè dǐ qīng。",
        translation: "明亮的月亮升上夜空，像一面宝镜；云彩之间一片寂静，没有一点声音。一轮满月把秋色平分，长久照着云中的大路，千里之内都亮堂堂的。捣药的玉兔仿佛从月边落了下来，遮月的蟾蜍可别在眼前出现。我想约你手拉着手，乘上仙筏一同上天，只等银河变得清清澈澈的那一天。",
      }
      ],
    },
    {
      title: "九日蓝耕会饮 · 杜甫",
      art: 'poetry-qianjia:ch214',
      artPrompt: "古诗《九日蓝耕会饮》意境插画：老去悲秋强自宽，兴来今日尽君欢。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "老去悲秋强自宽，兴来今日尽君欢。\n羞将短发还吹帽，笑倩旁人为正冠。\n蓝水远从千涧落，玉山高并两峰寒。\n明年此会知谁健，醉把茱萸仔细看。",
        pinyin: "lǎo qù bēi qiū qiáng zì kuān， xīng lái jīn rì jìn jūn huān。\nxiū jiāng duǎn fà hái chuī mào， xiào qiàn páng rén wéi zhèng guān。\nlán shuǐ yuǎn cóng qiān jiàn luò， yù shān gāo bìng liǎng fēng hán。\nmíng nián cǐ huì zhī shuí jiàn， zuì bǎ zhū yú zǐ xì kàn。",
        translation: "人老了，为秋天悲伤，只好勉强宽慰自己；今天兴致来了，就和大家尽情欢乐。头发短了，怕被风吹落帽子，笑着请旁边的人帮忙把帽子扶正。蓝田的水远远地从千条山涧落下来，玉山高高地耸立，两座山峰透着寒气。明年的聚会不知还有谁健在，趁着醉意，把茱萸仔细看上一看。",
      }
      ],
    },
    {
      title: "秋思 · 陆游",
      art: 'poetry-qianjia:ch215',
      artPrompt: "古诗《秋思》意境插画：利欲驱人万火牛，江湖浪迹一沙鸥。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "利欲驱人万火牛，江湖浪迹一沙鸥。\n日长似岁闲方觉，事大如天醉亦休。\n砧杵敲残深巷月，梧桐摇落故园秋。\n欲舒老眼无高处，安得元龙百尺楼。",
        pinyin: "lì yù qū rén wàn huǒ niú， jiāng hú làng jì yī shā ōu。\nrì cháng sì suì xián fāng jué， shì dà rú tiān zuì yì xiū。\nzhēn chǔ qiāo cán shēn xiàng yuè， wú tóng yáo luò gù yuán qiū。\nyù shū lǎo yǎn wú gāo chù， ān dé yuán lóng bǎi chǐ lóu。",
        translation: "名利和欲望驱使着人们，像千万头着火的牛一样奔忙；我却像一只沙鸥，在江湖上到处漂泊。闲下来才觉得日子长得像一年，事情再大得像天，喝醉了也就放下不管了。捣衣声把深巷里的月亮都敲残了，梧桐叶飘落，故乡的秋天来了；想放眼远望却没有高处，哪里才能找到一座百尺高楼呢？",
      }
      ],
    },
    {
      title: "与朱山人 · 杜甫",
      art: 'poetry-qianjia:ch216',
      artPrompt: "古诗《与朱山人》意境插画：锦里先生乌角巾，园收芋栗未全贫。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "锦里先生乌角巾，园收芋栗未全贫。\n惯看宾客儿童喜，得食阶除鸟雀驯。\n秋水才深四五尺，野航恰受两三人。\n白沙翠竹江村暮，相送柴门月色新。",
        pinyin: "jǐn lǐ xiān shēng wū jiǎo jīn， yuán shōu yù lì wèi quán pín。\nguàn kàn bīn kè ér tóng xǐ， dé shí jiē chú niǎo què xùn。\nqiū shuǐ cái shēn sì wǔ chǐ， yě háng qià shòu liǎng sān rén。\nbái shā cuì zhú jiāng cūn mù， xiāng sòng chái mén yuè sè xīn。",
        translation: "锦里先生戴着黑色角巾，园子里收获了芋头和栗子，日子还不算穷。孩子们看惯了来客，个个欢喜；台阶上吃食的鸟雀也被人养得温驯。秋天的江水才四五尺深，小小的野船正好坐两三个人。白沙翠竹环绕的江村暮色里，先生在柴门前为我送行，月色清新明亮。",
      }
      ],
    },
    {
      title: "闻笛 · 赵嘏",
      art: 'poetry-qianjia:ch217',
      artPrompt: "古诗《闻笛》意境插画：谁家吹笛画楼中，断续声随断续风。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "谁家吹笛画楼中，断续声随断续风。\n响遏行云横碧落，清和冷月到帘栊。\n兴来三弄有桓子，赋就一篇怀马融。\n曲罢不知人在否，余音嘹亮尚飘空。",
        pinyin: "shuí jiā chuī dí huà lóu zhōng， duàn xù shēng suí duàn xù fēng。\nxiǎng è xíng yún héng bì luò， qīng hé lěng yuè dào lián lóng。\nxīng lái sān nòng yǒu huán zǐ， fù jiù yī piān huái mǎ róng。\nqǔ bà bù zhī rén zài fǒu， yú yīn liáo liàng shàng piāo kōng。",
        translation: "是谁家在画楼里吹笛子？断断续续的笛声随着断断续续的风传来。嘹亮的笛声好像把天上的行云都留住了；清脆的声音和着冷冷的月光，一起照进窗帘。兴致来时能像古人那样连吹三支曲子，写起文章来就想起那位笛子和辞赋都好的才子。一曲吹完，不知吹笛的人还在不在，嘹亮的余音还在空中飘荡。",
      }
      ],
    },
    {
      title: "冬景 · 刘克庄",
      art: 'poetry-qianjia:ch218',
      artPrompt: "古诗《冬景》意境插画：晴窗早觉爱朝曦，竹外秋声渐作威。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "晴窗早觉爱朝曦，竹外秋声渐作威。\n命仆安排新暖阁，呼童熨贴旧寒衣。\n叶浮嫩绿酒初熟，橙切香黄蟹正肥。\n蓉菊满园皆可羡，赏心从此莫相违。",
        pinyin: "qíng chuāng zǎo jué ài cháo xī， zhú wài qiū shēng jiàn zuò wēi。\nmìng pú ān pái xīn nuǎn gé， hū tóng yùn tiē jiù hán yī。\nyè fú nèn lǜ jiǔ chū shú， chéng qiè xiāng huáng xiè zhèng féi。\nróng jú mǎn yuán jiē kě xiàn， shǎng xīn cóng cǐ mò xiāng wéi。",
        translation: "晴天早晨在窗边醒来，真喜欢初升的太阳；竹林外面，秋天的风声渐渐显出威力。吩咐仆人安排好新的暖阁，又叫小童把旧棉衣熨得平平整整。新酿的酒浮着嫩绿的酒沫，切开香气扑鼻的黄橙子，螃蟹正肥。满园的芙蓉和菊花都让人喜爱，这样的赏心乐事，可别再错过了。",
      }
      ],
    },
    {
      title: "冬至 · 杜甫",
      art: 'poetry-qianjia:ch219',
      artPrompt: "古诗《冬至》意境插画：天时人事日相催，冬至阳生春又来。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "天时人事日相催，冬至阳生春又来。\n刺绣五纹添弱线，吹葭六管动飞灰。\n岸容待腊将舒柳，山意冲寒欲放梅。\n云物不殊乡国异，教儿且覆掌中杯。",
        pinyin: "tiān shí rén shì rì xiāng cuī， dōng zhì yáng shēng chūn yòu lái。\ncì xiù wǔ wén tiān ruò xiàn， chuī jiā liù guǎn dòng fēi huī。\nàn róng dài là jiāng shū liǔ， shān yì chōng hán yù fàng méi。\nyún wù bù shū xiāng guó yì， jiào ér qiě fù zhǎng zhōng bēi。",
        translation: "节气和人事天天互相催促，冬至一到，阳气升起，春天又快来了。从这天起白天变长，刺绣的姑娘每天可以多缝几根线；律管里的芦苇灰也轻轻飞动，节气到了。河岸等着腊月一到就舒展柳条，山中的梅花顶着寒气就要开放。眼前的景色和故乡没什么不同，只是家乡太远了；我让孩子把手里这杯酒干了，宽宽心吧。",
      }
      ],
    },
    {
      title: "梅花 · 林逋",
      art: 'poetry-qianjia:ch220',
      artPrompt: "古诗《梅花》意境插画：众芳摇落独鲜妍，占断风情向小园。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "众芳摇落独鲜妍，占断风情向小园。\n疏影横斜水清浅，暗香浮动月黄昏。\n霜禽欲下先偷眼，粉蝶如知合断魂。\n幸有微吟可相狎，不须檀板共金樽。",
        pinyin: "zhòng fāng yáo luò dú xiān yán， zhàn duàn fēng qíng xiàng xiǎo yuán。\nshū yǐng héng xié shuǐ qīng qiǎn， àn xiāng fú dòng yuè huáng hūn。\nshuāng qín yù xià xiān tōu yǎn， fěn dié rú zhī hé duàn hún。\nxìng yǒu wēi yín kě xiāng xiá， bù xū tán bǎn gòng jīn zūn。",
        translation: "百花都凋谢了，只有梅花开得鲜艳美丽，独占了小园的风光。疏疏的影子横斜地映在清浅的水面上，淡淡的清香在黄昏的月色里轻轻飘动。霜天的鸟儿想落下来，先偷偷地看它几眼；蝴蝶如果知道有这么美的梅花，一定会爱得失魂落魄。幸好还有我低声吟诗来陪伴它，用不着敲檀板、举金杯的热闹场面。",
      }
      ],
    },
    {
      title: "左迁至蓝关示侄孙湘 · 韩愈",
      art: 'poetry-qianjia:ch221',
      artPrompt: "古诗《左迁至蓝关示侄孙湘》意境插画：一封朝奏九重天，夕贬潮阳路八千。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "一封朝奏九重天，夕贬潮阳路八千。\n本为圣朝除弊政，敢将衰朽惜残年。\n云横秦岭家何在，雪拥蓝关马不前。\n知汝远来应有意，好收吾骨瘴江边。",
        pinyin: "yī fēng cháo zòu jiǔ chóng tiān， xī biǎn cháo yáng lù bā qiān。\nběn wèi shèng cháo chú bì zhèng， gǎn jiāng shuāi xiǔ xī cán nián。\nyún héng qín lǐng jiā hé zài， xuě yōng lán guān mǎ bù qián。\nzhī rǔ yuǎn lái yīng yǒu yì， hǎo shōu wú gǔ zhàng jiāng biān。",
        translation: "清早我向皇帝呈上一封奏章，晚上就被贬到八千里外的潮阳去。我本来是想替朝廷除去弊政，哪敢顾惜自己这把衰老的身子。云横在秦岭上，我的家不知在哪里；大雪堵住了蓝田关，连马都不肯往前走。我知道你远道赶来是有心意的，那就到瘴气弥漫的江边，替我收拾尸骨吧。",
      }
      ],
    },
    {
      title: "干戈 · 王中",
      art: 'poetry-qianjia:ch222',
      artPrompt: "古诗《干戈》意境插画：干戈未定欲何之，一事无成两鬓丝。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "干戈未定欲何之，一事无成两鬓丝。\n踪迹大纲王粲传，情怀小样杜陵诗。\n鹡鸰音断人千里，乌鹊巢寒月一枝。\n安得中山千日酒，酩然直到太平时。",
        pinyin: "gān gē wèi dìng yù hé zhī， yī shì wú chéng liǎng bìn sī。\nzōng jì dà gāng wáng càn chuán， qíng huái xiǎo yàng dù líng shī。\njí líng yīn duàn rén qiān lǐ， wū què cháo hán yuè yī zhī。\nān dé zhōng shān qiān rì jiǔ， mǐng rán zhí dào tài píng shí。",
        translation: "战争还没平息，我能到哪里去呢？一件事也没做成，两鬓已经白了。我的经历大致像当年四处漂泊的王粲，心情就像杜甫诗里写的那样忧愁。兄弟的音信断了，远隔千里；我像寒夜里的乌鹊，只守着月下一根树枝搭的窝。哪里才能得到中山的千日酒，痛痛快快一醉，一直睡到天下太平的日子啊。",
      }
      ],
    },
    {
      title: "归隐 · 陈抟",
      art: 'poetry-qianjia:ch223',
      artPrompt: "古诗《归隐》意境插画：十年踪迹走红尘，回首青山入梦频。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "十年踪迹走红尘，回首青山入梦频。\n紫绶纵荣争及睡，朱门虽富不如贫。\n愁闻剑戟扶危主，闷听笙歌聒醉人。\n携取旧书归旧隐，野花啼鸟一般春。",
        pinyin: "shí nián zōng jì zǒu hóng chén， huí shǒu qīng shān rù mèng pín。\nzǐ shòu zòng róng zhēng jí shuì， zhū mén suī fù bù rú pín。\nchóu wén jiàn jǐ fú wēi zhǔ， mēn tīng shēng gē guō zuì rén。\nxié qǔ jiù shū guī jiù yǐn， yě huā tí niǎo yī bān chūn。",
        translation: "十年来我的足迹奔走在热闹的红尘里，回头想青山，它常常进入我的梦。当官纵然荣耀，也比不上安安稳稳睡个好觉；豪门大户虽然富贵，还不如清贫自在。听说有人操着刀枪去扶持危难的君主就发愁，听到吵闹的笙歌灌醉人们就烦闷。带上旧书回到从前隐居的地方吧，那里野花开放、鸟儿啼叫，春天照样美好。",
      }
      ],
    },
    {
      title: "山中寡妇 · 杜荀鹤",
      art: 'poetry-qianjia:ch224',
      artPrompt: "古诗《山中寡妇》意境插画：夫因兵乱守蓬茅，麻苎裙衫鬓发焦。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "夫因兵乱守蓬茅，麻苎裙衫鬓发焦。\n桑柘废来犹纳税，田园荒尽尚征苗。\n时挑野菜和根煮，旋砍生柴带叶烧。\n任是深山最深处，也应无计避征徭。",
        pinyin: "fū yīn bīng luàn shǒu péng máo， má zhù qún shān bìn fà jiāo。\nsāng zhè fèi lái yóu nà shuì， tián yuán huāng jìn shàng zhēng miáo。\nshí tiāo yě cài hé gēn zhǔ， xuán kǎn shēng chái dài yè shāo。\nrèn shì shēn shān zuì shēn chù， yě yìng wú jì bì zhēng yáo。",
        translation: "丈夫因为战乱死了，她独自守着茅草屋，穿着粗麻布衣裙，鬓发都枯黄了。桑树柘树都荒废了，还要交丝绸税；田园全荒了，还要收青苗税。她常常挑来野菜连根一起煮，刚砍的生柴带着叶子就烧。就算躲在深山最深处，也逃不开官府的赋税和劳役啊。",
      }
      ],
    },
    {
      title: "送天师 · 朱权",
      art: 'poetry-qianjia:ch225',
      artPrompt: "古诗《送天师》意境插画：霜落芝城柳影疏，殷勤送客出鄱湖。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "霜落芝城柳影疏，殷勤送客出鄱湖。\n黄金甲锁雷霆印，红锦韬缠日月符。\n天上晓行骑只鹤，人间夜宿解双凫。\n匆匆归到神仙府，为问蟠桃熟也无。",
        pinyin: "shuāng luò zhī chéng liǔ yǐng shū， yīn qín sòng kè chū pó hú。\nhuáng jīn jiǎ suǒ léi tíng yìn， hóng jǐn tāo chán rì yuè fú。\ntiān shàng xiǎo xíng qí zhī hè， rén jiān yè sù jiě shuāng fú。\ncōng cōng guī dào shén xiān fǔ， wèi wèn pán táo shú yě wú。",
        translation: "霜落在芝城，柳影稀疏，我殷勤地送客人走出鄱阳湖。他随身带着锁在黄金甲里的雷霆大印，红锦套缠绕着日月神符。清早在天上赶路就骑一只仙鹤，在人间过夜就解下双凫当船。匆匆忙忙回到神仙府里，请替我问一声：蟠桃熟了没有？",
      }
      ],
    },
    {
      title: "送毛伯温 · 明世宗",
      art: 'poetry-qianjia:ch226',
      artPrompt: "古诗《送毛伯温》意境插画：大将南征胆气豪，腰横秋水雁翎刀。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "大将南征胆气豪，腰横秋水雁翎刀。\n风吹鼍鼓山河动，电闪旌旗日月高。\n天上麒麟原有种，穴中蝼蚁岂能逃。\n太平待诏归来日，朕与先生解战袍。",
        pinyin: "dà jiàng nán zhēng dǎn qì háo， yāo héng qiū shuǐ yàn líng dāo。\nfēng chuī tuó gǔ shān hé dòng， diàn shǎn jīng qí rì yuè gāo。\ntiān shàng qí lín yuán yǒu zhǒng， xué zhōng lóu yǐ qǐ néng táo。\ntài píng dài zhào guī lái rì， zhèn yǔ xiān shēng jiě zhàn páo。",
        translation: "大将军南征，胆气豪迈，腰间横着亮得像秋水的雁翎刀。风吹响战鼓，仿佛山河都在震动；旌旗像闪电一样飘动，映着高高的日月。将军是天上的麒麟将种，本领本来就大；洞里的蚂蚁般的小贼哪里逃得掉。等天下太平、接到诏书回来的那一天，我亲自替先生解开战袍。",
      }
      ],
    }
  ],
  rights: {
    workTitle: "千家诗",
    author: "谢枋得、王相（编）",
    authorDeathYear: 1687,
    translator: '桃阅读',
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: "https://github.com/chinese-poetry/chinese-poetry",
    note: "所收诗作者卒年均逾保护期；编者王相卒于 1687 年。注音与白话译文为平台自撰。",
  },
}
