import type { PackBook } from '../types'

/**
 * 《朱子家训》——由 scripts/gen-corpus.mjs 从公版语料生成（2026-09-20 全面补全）。
 * 底本：朱子家训（朱柏庐）。逐字来自语料数据集，译文为平台自撰白话。
 * 通行本全篇；注音与白话译文为平台自撰。
 */
export const zhuziJiaxun: PackBook = {
  id: "primer-zhuzi",
  title: "朱子家训",
  author: "朱柏庐（清）",
  lang: "zh",
  category: "primer",
  ageStage: "6-8",
  intro: "黎明即起，洒扫庭除——治家格言全本，一粥一饭当思来处不易。",
  coverArt: "dawn-courtyard-sweep",
  coverArtPrompt: "清晨的古代四合院，一个孩子拿着竹扫帚认真地扫院子，屋檐下挂着灯笼，公鸡在角落打鸣，朝霞刚刚染红屋顶，安静温暖的绘本风",
  coverFrom: "#6D4C41",
  coverTo: "#EFEBE9",
  source: "《朱子家训》通行本（朱柏庐，卒 1688），公版",
  chapters: [
    {
      title: "第一课 · 黎明即起 · 佚名",
      art: 'primer-zhuzi:ch1',
      artPrompt: "《三字经》第1课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "黎明即起，洒扫庭除，要内外整洁；\n既昏便息，关锁门户，必亲自检点。\n一粥一饭，当思来处不易；",
        pinyin: "lí míng jí qǐ， sǎ sǎo tíng chú， yào nèi wài zhěng jié；\njì hūn biàn xī， guān suǒ mén hù， bì qīn zì jiǎn diǎn。\nyī zhōu yī fàn， dāng sī lái chù bù yì；",
        translation: "天刚亮就要起床，把庭院打扫得干干净净，屋里屋外都要整洁；天黑了就休息，关好门窗、锁好门锁，一定要亲自检查一遍。一碗粥、一碗饭，要想到它们来得不容易；半根丝、半根线，要常常想到这些东西做起来多辛苦。要在下雨之前先修好房屋，不要等到口渴了才去挖井。自己过日子一定要节俭，请客吃饭不要拖拖拉拉舍不得散席。",
      }
      ],
    },
    {
      title: "第二课 · 半丝半缕 · 佚名",
      art: 'primer-zhuzi:ch2',
      artPrompt: "《三字经》第2课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "半丝半缕，恒念物力维艰。\n宜未雨而绸缪，毋临渴而掘井。\n自奉必须俭约，宴客切勿流连。",
        pinyin: "bàn sī bàn lǚ， héng niàn wù lì wéi jiān。\nyí wèi yǔ ér chóu móu， wú lín kě ér jué jǐng。\nzì fèng bì xū jiǎn yuē， yàn kè qiè wù liú lián。",
        translation: "半根丝、半条线，也要常常想到东西来得多么不容易。要趁没下雨的时候先把门窗修好，不要等口渴了才去挖井。自己平常过日子一定要节俭，请客应酬也不要太铺张、太久不散。",
      }
      ],
    },
    {
      title: "第三课 · 器具质而 · 佚名",
      art: 'primer-zhuzi:ch3',
      artPrompt: "《三字经》第3课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "器具质而洁，瓦缶胜金玉；\n饮食约而精，园蔬愈珍馐。\n勿营华屋，勿谋良田。",
        pinyin: "qì jù zhì ér jié， wǎ fǒu shèng jīn yù；\nyǐn shí yuē ér jīng， yuán shū yù zhēn xiū。\nwù yíng huá wū， wù móu liáng tián。",
        translation: "餐具只要质地干净结实，瓦罐也比金玉的好；饭菜只要简单又用心，园子里的青菜也比山珍海味更香。不要去盖豪华的房子，不要去谋人家的好田地。",
      }
      ],
    },
    {
      title: "第四课 · 三姑六婆 · 佚名",
      art: 'primer-zhuzi:ch4',
      artPrompt: "《三字经》第4课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "三姑六婆，实淫盗之媒；\n婢美妾娇，非闺房之福。\n僮仆勿用俊美，妻妾切忌艳装。",
        pinyin: "sān gū liù pó， shí yín dào zhī méi；\nbì měi qiè jiāo， fēi guī fáng zhī fú。\ntóng pú wù yòng jùn měi， qī qiè qiè jì yàn zhuāng。",
        translation: "三姑六婆这样的人，最容易惹出邪门歪道和偷盗的事；婢女长得美、小妾长得娇，并不是家里的福气。家里的仆人不要挑太俊美的，家里的女眷千万忌讳穿得花枝招展。",
      }
      ],
    },
    {
      title: "第五课 · 祖宗虽远 · 佚名",
      art: 'primer-zhuzi:ch5',
      artPrompt: "《三字经》第5课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "祖宗虽远，祭祀不可不诚；\n子孙虽愚，经书不可不读。\n居身务期质朴，教子要有义方。",
        pinyin: "zǔ zōng suī yuǎn， jì sì bù kě bù chéng；\nzǐ sūn suī yú， jīng shū bù kě bù dú。\njū shēn wù qī zhì pǔ， jiào zǐ yào yǒu yì fāng。",
        translation: "祖宗虽然离我们已经很远，祭祀的时候不可以不诚心；子孙就算天资笨一些，圣贤的书不可以不读。自己做人一定要朴实厚道，教育孩子要有正当的好方法。",
      }
      ],
    },
    {
      title: "第六课 · 勿贪意外 · 佚名",
      art: 'primer-zhuzi:ch6',
      artPrompt: "《三字经》第6课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "勿贪意外之财，勿饮过量之酒。\n与肩挑贸易，毋占便宜；\n见贫苦亲邻，须加温恤。",
        pinyin: "wù tān yì wài zhī cái， wù yǐn guò liàng zhī jiǔ。\nyǔ jiān tiāo mào yì， wú zhàn pián yi；\njiàn pín kǔ qīn lín， xū jiā wēn xù。",
        translation: "不要贪图意外得来的钱财，不要喝过量的酒。和挑担做小买卖的人交易，不要占人家的便宜；看到贫苦的亲戚邻居，要热情体恤、真心帮助他们。",
      }
      ],
    },
    {
      title: "第七课 · 刻薄成家 · 佚名",
      art: 'primer-zhuzi:ch7',
      artPrompt: "《三字经》第7课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "刻薄成家，理无久享；\n伦常乖舛，立见消亡。\n兄弟叔侄，需分多润寡；",
        pinyin: "kè bó chéng jiā， lǐ wú jiǔ xiǎng；\nlún cháng guāi chuǎn， lì jiàn xiāo wáng。\nxiōng dì shū zhí， xū fēn duō rùn guǎ；",
        translation: "靠刻薄待人攒下的家业，照道理不会长久享用；一家人伦理乱了套，很快就会衰败。兄弟叔侄之间，要多分给少的，帮补穷的。",
      }
      ],
    },
    {
      title: "第八课 · 长幼内外 · 佚名",
      art: 'primer-zhuzi:ch8',
      artPrompt: "《三字经》第8课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "长幼内外，宜法肃辞严。\n听妇言乖骨肉，岂是丈夫？\n重资财薄父母，不成人子。",
        pinyin: "cháng yòu nèi wài， yí fǎ sù cí yán。\ntīng fù yán guāi gǔ ròu， qǐ shì zhàng fu？\nzhòng zī cái báo fù mǔ， bù chéng rén zǐ。",
        translation: "家里长辈晚辈、里里外外，都应该规矩严明、言辞庄重。只听妻子的话就疏远骨肉亲人，哪里算得上大丈夫？看重钱财而薄待父母，就不配做人家的儿女。",
      }
      ],
    },
    {
      title: "第九课 · 嫁女择佳 · 佚名",
      art: 'primer-zhuzi:ch9',
      artPrompt: "《三字经》第9课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "嫁女择佳婿，毋索重聘；\n娶媳求淑女，勿计厚奁。\n见富贵而生谄容者最可耻；",
        pinyin: "jià nǚ zé jiā xù， wú suǒ zhòng pìn；\nqǔ xí qiú shū nǚ， wù jì hòu lián。\njiàn fù guì ér shēng chǎn róng zhě zuì kě chǐ；",
        translation: "嫁女儿要挑人品好的女婿，不要索要贵重的聘礼；娶媳妇要找贤淑的姑娘，不要计较丰厚的嫁妆。见了富贵人家就露出巴结讨好的脸色，最可耻。",
      }
      ],
    },
    {
      title: "第十课 · 遇贫穷而 · 佚名",
      art: 'primer-zhuzi:ch10',
      artPrompt: "《三字经》第10课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "遇贫穷而作骄态者贱莫甚。\n居家戒争讼，讼则终凶；\n处世戒多言，言多必失。",
        pinyin: "yù pín qióng ér zuò jiāo tài zhě jiàn mò shèn。\njū jiā jiè zhēng sòng， sòng zé zhōng xiōng；\nchǔ shì jiè duō yán， yán duō bì shī。",
        translation: "遇到贫穷的人就摆出骄傲的样子，没有比这更低贱的了。在家里切忌争斗打官司，打了官司到头来准没好结果；在社会上切忌多说话，话多了必定会出错。",
      }
      ],
    },
    {
      title: "第十一课 · 勿恃势力 · 佚名",
      art: 'primer-zhuzi:ch11',
      artPrompt: "《三字经》第11课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "勿恃势力而凌逼孤寡，毋贪口腹而恣杀生禽。\n乖僻自是，悔误必多；\n颓惰自甘，家道难成。",
        pinyin: "wù shì shì lì ér líng bī gū guǎ， wú tān kǒu fù ér zì shā shēng qín。\nguāi pì zì shì， huǐ wù bì duō；\ntuí duò zì gān， jiā dào nán chéng。",
        translation: "不要仗着势力去欺负孤儿寡母，也不要贪图口腹就随便宰杀禽畜。性情怪僻又自以为是，将来后悔和出错的事一定很多；甘心懒惰不振作，家业就很难成就。",
      }
      ],
    },
    {
      title: "第十二课 · 狎昵恶少 · 佚名",
      art: 'primer-zhuzi:ch12',
      artPrompt: "《三字经》第12课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "狎昵恶少，久必受其累；\n屈志老成，急则可相依。\n轻听发言，安知非人之谮诉，当忍耐三思；",
        pinyin: "xiá nì è shào， jiǔ bì shòu qí lèi；\nqū zhì lǎo chéng， jí zé kě xiāng yī。\nqīng tīng fā yán， ān zhī fēi rén zhī zèn sù， dāng rěn nài sān sī；",
        translation: "跟品行不好的年轻人太亲近，日子久了准会被他连累；诚心敬重老成持重的人，遇到急事时才有依靠。轻易听信别人的话就跟着传出去，怎么知道不是有人在说坏话害人呢？应当忍耐着多想一想。",
      }
      ],
    },
    {
      title: "第十三课 · 因事相争 · 佚名",
      art: 'primer-zhuzi:ch13',
      artPrompt: "《三字经》第13课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "因事相争，焉知非我之不是，需平心暗想。\n施惠无念，受恩莫忘。\n凡事当留余地，得意不宜再往。",
        pinyin: "yīn shì xiāng zhēng， yān zhī fēi wǒ zhī bù shì， xū píng xīn àn xiǎng。\nshī huì wú niàn， shòu ēn mò wàng。\nfán shì dāng liú yú dì， dé yì bù yí zài wǎng。",
        translation: "因为事情和别人争吵，怎么知道就不是自己的不对呢？要平心静气地暗暗想一想。给了别人好处不要记在心里，受了别人的恩情不要忘记。凡事都要留有余地，得意的事做过一次，就不要再去一次。",
      }
      ],
    },
    {
      title: "第十四课 · 人有喜庆 · 佚名",
      art: 'primer-zhuzi:ch14',
      artPrompt: "《三字经》第14课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "人有喜庆，不可生嫉妒心；\n人有祸患，不可生喜幸心。\n善欲人见，不是真善；",
        pinyin: "rén yǒu xǐ qìng， bù kě shēng jí dù xīn；\nrén yǒu huò huàn， bù kě shēng xǐ xìng xīn。\nshàn yù rén jiàn， bù shì zhēn shàn；",
        translation: "别人有喜庆的事，不可以生嫉妒的心；别人有灾祸的事，不可以有幸灾乐祸的心。做了好事一心想让人看见，那就不是真善良。",
      }
      ],
    },
    {
      title: "第十五课 · 恶恐人知 · 佚名",
      art: 'primer-zhuzi:ch15',
      artPrompt: "《三字经》第15课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "恶恐人知，便是大恶。\n见色而起淫心，报在妻女；\n匿怨而用暗箭，祸延子孙。",
        pinyin: "è kǒng rén zhī， biàn shì dà è。\njiàn sè ér qǐ yín xīn， bào zài qī nǚ；\nnì yuàn ér yòng àn jiàn， huò yán zǐ sūn。",
        translation: "做了坏事生怕别人知道，那就是大坏事了。见到美色就起坏念头，报应会落到自己的妻女身上；心里藏着怨恨，暗地里放冷箭害人，祸事会连累到子孙。",
      }
      ],
    },
    {
      title: "第十六课 · 家门和顺 · 佚名",
      art: 'primer-zhuzi:ch16',
      artPrompt: "《三字经》第16课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "家门和顺，虽饔飧不继，亦有余欢；\n国课早完，即囊橐无余，自得至乐。\n读书志在圣贤，非徒科第；",
        pinyin: "jiā mén hé shùn， suī yōng sūn bù jì， yì yǒu yú huān；\nguó kè zǎo wán， jí náng tuó wú yú， zì dé zhì lè。\ndú shū zhì zài shèng xián， fēi tú kē dì；",
        translation: "一家人和和顺顺，就算吃了上顿没下顿，也仍有满满的欢喜；早早交清国家的赋税，就算口袋里不剩什么钱，自己也觉得最大的安乐。读书立志要做圣贤那样的人，不只是为了科举考试中榜。",
      }
      ],
    },
    {
      title: "第十七课 · 为官心存 · 佚名",
      art: 'primer-zhuzi:ch17',
      artPrompt: "《三字经》第17课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "为官心存君国，岂计身家？\n守分安命，顺时听天。\n为人若此，庶乎近焉。",
        pinyin: "wèi guān xīn cún jūn guó， qǐ jì shēn jiā？\nshǒu fēn ān mìng， shùn shí tīng tiān。\nwèi rén ruò cǐ， shù hū jìn yān。",
        translation: "做官的人，心里要装着国家和百姓，怎么能只计较自己的身家？守好自己的本分，安于自己的命运，顺应时势，听从天意。做人能到这个地步，就差不多接近正道了。",
      }
      ],
    }
  ],
  rights: {
    workTitle: "朱子家训",
    author: "朱柏庐",
    authorDeathYear: 1698,
    translator: '桃阅读',
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: "https://github.com/chinese-poetry/chinese-poetry",
    note: "通行本全篇；注音与白话译文为平台自撰。",
  },
}
