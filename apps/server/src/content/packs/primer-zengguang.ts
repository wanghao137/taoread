import type { PackBook } from '../types'

/**
 * 《增广贤文》——由 scripts/gen-corpus.mjs 从公版语料生成（2026-09-20 全面补全）。
 * 底本：增广贤文（佚名（明清））。逐字来自语料数据集，译文为平台自撰白话。
 * 明清通行本；注音与白话译文为平台自撰。
 */
export const zengGuang: PackBook = {
  id: "zengguang-friends",
  title: "增广贤文",
  author: "佚名（明清）",
  lang: "zh",
  category: "primer",
  ageStage: "3-5",
  intro: "「一年之计在于春，一日之计在于寅」——古人的人生智慧，全本读来句句在理。",
  coverArt: "friendship-scroll",
  coverArtPrompt: "两个扎小髻的古代孩子坐在石凳上一起看书，旁边是一棵大柳树，树下有两个小书箱，阳光穿过柳叶洒下来",
  coverFrom: "#FFE0B2",
  coverTo: "#FFB74D",
  source: "公版古籍（明·佚名）节选，逐字注音",
  chapters: [
    {
      title: " · 昔时贤文 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 昔时贤文》意境插画：昔时贤文，诲汝谆谆。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "昔时贤文，诲汝谆谆。\n集韵增广，多见多闻。\n观今宜鉴古，无古不成今。\n知己知彼，将心比心。\n酒逢知己饮，诗向会人吟。\n相识满天下，知心能几人？\n相逢好似初相识，到老终无怨恨心。\n近水知鱼性，近山识鸟音。\n易涨易退山溪水，易反易覆小人心。\n运去金成铁，时来铁似金。\n读书须用意，一字值千金。\n逢人且说三分话，未可全抛一片心。\n有意栽花花不发，无心插柳柳成荫。\n画虎画皮难画骨，知人知面不知心。\n钱财如粪土，仁义值千金。\n流水下滩非有意，白云出岫本无心。\n当时若不登高望，谁信东流海洋深？\n路遥知马力，日久见人心。\n两人一般心，无钱堪买金；\n一人一般心，有钱难买针。",
        pinyin: "xī shí xián wén， huì rǔ zhūn zhūn。\njí yùn zēng guǎng， duō jiàn duō wén。\nguān jīn yí jiàn gǔ， wú gǔ bù chéng jīn。\nzhī jǐ zhī bǐ， jiāng xīn bǐ xīn。\njiǔ féng zhī jǐ yǐn， shī xiàng huì rén yín。\nxiāng shí mǎn tiān xià， zhī xīn néng jǐ rén？\nxiāng féng hǎo sì chū xiāng shí， dào lǎo zhōng wú yuàn hèn xīn。\njìn shuǐ zhī yú xìng， jìn shān shí niǎo yīn。\nyì zhǎng yì tuì shān xī shuǐ， yì fǎn yì fù xiǎo rén xīn。\nyùn qù jīn chéng tiě， shí lái tiě sì jīn。\ndú shū xū yòng yì， yī zì zhí qiān jīn。\nféng rén qiě shuō sān fēn huà， wèi kě quán pāo yī piàn xīn。\nyǒu yì zāi huā huā bù fā， wú xīn chā liǔ liǔ chéng yìn。\nhuà hǔ huà pí nán huà gǔ， zhī rén zhī miàn bù zhī xīn。\nqián cái rú fèn tǔ， rén yì zhí qiān jīn。\nliú shuǐ xià tān fēi yǒu yì， bái yún chū xiù běn wú xīn。\ndāng shí ruò bù dēng gāo wàng， shuí xìn dōng liú hǎi yáng shēn？\nlù yáo zhī mǎ lì， rì jiǔ jiàn rén xīn。\nliǎng rén yī bān xīn， wú qián kān mǎi jīn；\nyī rén yī bān xīn， yǒu qián nán mǎi zhēn。",
        translation: "古时候圣贤的文句，一遍遍恳切地教导我们；把它们收集整理起来，就能见得多、听得广。看今天的事应该拿古代来对照，没有过去就没有现在。了解自己也要了解别人，拿自己的心去比别人的心。酒要和知己一起喝，诗要念给懂的人听。认识的人满天下，真正知心的能有几个呢？每次见面都像第一次那样客气，到老也不会有怨恨。住在水边就懂得鱼的习性，住在山边就听得懂鸟的叫声。山溪水容易涨也容易退，小人的心思说变就变。运气不好的时候金子也会变成铁，时运来了铁也变得像金子。读书要用心，一个字能值千金。跟人说话只说三分，不能把心全掏出来。用心栽的花不一定开，无意插的柳树却长成了树荫。画老虎画得出皮毛，画不出骨头；认识一个人认得出脸，猜不透心。钱财像粪土，仁义才值千金。水流下滩不是有意的，白云飘出山谷也本无心。当初要不是登上高处眺望，谁能相信东流的水汇成了深深的海洋？路远了才知道马的力气，日子久了才看得出人心。两个人一条心，没有钱也能买到金子；两个人两条心，有了钱也难买一根针。",
      }
      ],
    },
    {
      title: " · 相见易得 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 相见易得》意境插画：相见易得好，久住难为人。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "相见易得好，久住难为人。\n马行无力皆因瘦，人不风流只为贫。\n饶人不是痴汉，痴汉不会饶人。\n是亲不是亲，非亲却是亲。\n美不美，乡中水；亲不亲，故乡人。\n莺花犹怕春光老，岂可教人枉度春？\n相逢不饮空归去，洞口桃花也笑人。\n红粉佳人休使老，风流浪子莫教贫。\n在家不会迎宾客，出门方知少主人。\n黄芩无假，阿魏无真。\n客来主不顾，自是无良宾。\n良宾方不顾，应恐是痴人。\n贫居闹市无人问，富在深山有远亲。\n谁人背后无人说，哪个人前不说人？\n有钱道真语，无钱语不真。\n不信但看筵中酒，杯杯先劝有钱人。\n闹里挣钱，静处安身。\n来如风雨，去似微尘。\n长江后浪推前浪，世上新人赶旧人。\n近水楼台先得月，向阳花木早逢春。",
        pinyin: "xiāng jiàn yì dé hǎo， jiǔ zhù nán wéi rén。\nmǎ xíng wú lì jiē yīn shòu， rén bù fēng liú zhī wèi pín。\nráo rén bù shì chī hàn， chī hàn bù huì ráo rén。\nshì qīn bù shì qīn， fēi qīn què shì qīn。\nměi bù měi， xiāng zhōng shuǐ； qīn bù qīn， gù xiāng rén。\nyīng huā yóu pà chūn guāng lǎo， qǐ kě jiào rén wǎng dù chūn？\nxiāng féng bù yǐn kōng guī qù， dòng kǒu táo huā yě xiào rén。\nhóng fěn jiā rén xiū shǐ lǎo， fēng liú làng zǐ mò jiào pín。\nzài jiā bù huì yíng bīn kè， chū mén fāng zhī shǎo zhǔ rén。\nhuáng qín wú jiǎ， ā wèi wú zhēn。\nkè lái zhǔ bù gù， zì shì wú liáng bīn。\nliáng bīn fāng bù gù， yìng kǒng shì chī rén。\npín jū nào shì wú rén wèn， fù zài shēn shān yǒu yuǎn qīn。\nshuí rén bèi hòu wú rén shuō， nǎ gè rén qián bù shuō rén？\nyǒu qián dào zhēn yǔ， wú qián yǔ bù zhēn。\nbù xìn dàn kàn yán zhōng jiǔ， bēi bēi xiān quàn yǒu qián rén。\nnào lǐ zhèng qián， jìng chù ān shēn。\nlái rú fēng yǔ， qù sì wēi chén。\ncháng jiāng hòu làng tuī qián làng， shì shàng xīn rén gǎn jiù rén。\njìn shuǐ lóu tái xiān dé yuè， xiàng yáng huā mù zǎo féng chūn。",
        translation: "见面容易处得友好，住得久了就难做好人。马走路没力气是因为瘦，人不够体面只因为穷。肯饶恕别人的不是傻子，傻子才不会饶恕人。是亲的倒不像亲的，不是亲的反而像亲人。水甜不甜，总觉得家乡的水好；亲不亲，见了故乡人格外亲。黄莺和花儿都怕春天过去，人怎么能让大好春光白白度过？朋友相逢不喝几杯空手回去，连洞口的桃花也会笑话你。别让美丽的佳人老去，别让风流的人变穷。在家不会招待客人，出了门才知道想遇上热心主人的难。黄芩这种药没有假的，阿魏这种药没有真的——越常见的东西越真，越难得的东西假货越多。客人来了主人不理睬，那是主人不会待客；懂礼的客人受到了冷落，只怕也是主人糊涂。穷的时候住在闹市也没人搭理，富的时候住在深山也有远房亲戚来。哪个人背后没人议论，哪个人在人前不议论别人？有钱人说的都是真话，没钱人说话就不算数。不信你看酒席上，杯杯酒都先敬有钱的人。在热闹的地方挣钱，到安静的地方安身。来的时候像风雨一样大，走的时候像微尘一样轻。长江的后浪推着前浪，世上新人换旧人；靠近水的楼台先照到月光，朝着太阳的花木早迎来春天。",
      }
      ],
    },
    {
      title: " · 古人不见 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 古人不见》意境插画：古人不见今时月，今月曾经照古人。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "古人不见今时月，今月曾经照古人。\n先到为君，后到为臣。\n莫道君行早，更有早行人。\n莫信直中直，须防仁不仁。\n山中有直树，世上无直人。\n自恨枝无叶，莫怨太阳偏。\n一切都是命，半点不由人。\n一年之计在于春，一日之计在于寅。\n一家之计在于和，一生之计在于勤。\n责人之心责己，恕己之心恕人。\n守口如瓶，防意如城。\n宁可人负我，切莫我负人。\n再三须慎意，第一莫欺心。\n虎身犹可近，人毒不堪亲。\n来说是非者，便是是非人。\n远水难救近火，远亲不如近邻。\n有酒有肉多兄弟，急难何曾见一人？\n人情似纸张张薄，世事如棋局局新。\n山中也有千年树，世上难逢百岁人。\n力微休负重，言轻莫劝人。",
        pinyin: "gǔ rén bù jiàn jīn shí yuè， jīn yuè céng jīng zhào gǔ rén。\nxiān dào wèi jūn， hòu dào wèi chén。\nmò dào jūn xíng zǎo， gèng yǒu zǎo xíng rén。\nmò xìn zhí zhōng zhí， xū fáng rén bù rén。\nshān zhōng yǒu zhí shù， shì shàng wú zhí rén。\nzì hèn zhī wú yè， mò yuàn tài yáng piān。\nyī qiè dōu shì mìng， bàn diǎn bù yóu rén。\nyī nián zhī jì zài yú chūn， yī rì zhī jì zài yú yín。\nyī jiā zhī jì zài yú hé， yī shēng zhī jì zài yú qín。\nzé rén zhī xīn zé jǐ， shù jǐ zhī xīn shù rén。\nshǒu kǒu rú píng， fáng yì rú chéng。\nnìng kě rén fù wǒ， qiè mò wǒ fù rén。\nzài sān xū shèn yì， dì yī mò qī xīn。\nhǔ shēn yóu kě jìn， rén dú bù kān qīn。\nlái shuō shì fēi zhě， biàn shì shì fēi rén。\nyuǎn shuǐ nán jiù jìn huǒ， yuǎn qīn bù rú jìn lín。\nyǒu jiǔ yǒu ròu duō xiōng dì， jí nán hé céng jiàn yī rén？\nrén qíng sì zhǐ zhāng zhāng báo， shì shì rú qí jú jú xīn。\nshān zhōng yě yǒu qiān nián shù， shì shàng nán féng bǎi suì rén。\nlì wēi xiū fù zhòng， yán qīng mò quàn rén。",
        translation: "古人见不到今天的月亮，可今天的月亮曾经照过古人。先到的做君王，后到的做臣子。别说自己出门走得早，还有人走得比你更早。不要轻信表面上正直的人，要提防假仁假义。山里有笔直的树，世上却少有真正正直的人。树要怪就怪自己枝上没长叶子，别埋怨太阳偏心。有的一切都是命里注定，半点也由不得人。一年的打算要在春天做好，一天的打算要在清晨做好；一家的兴旺在于和睦，一生的成就在于勤劳。用责备别人的心来责备自己，用原谅自己的心去原谅别人。嘴要像瓶子口一样闭得紧，心里防坏念头要像守城一样严。宁可别人对不起我，千万别我对不起别人。做事要再三小心，最重要的是不要昧着良心。老虎身边还可以靠近，心肠歹毒的人千万别亲近。上门来说别人是非的人，他自己就是爱惹是非的人。远处的河水救不了近处的火，远方的亲戚不如身边的邻居。有酒有肉的时候兄弟多，遇到急难的时候一个人也见不着。人情像纸一样，一张比一张薄；世事像下棋一样，一局和一局都不同。山里也有活千年的树，世上却难碰到活百岁的人。力气小就别背重东西，说话没分量就别去劝人。",
      }
      ],
    },
    {
      title: " · 无钱休入 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 无钱休入》意境插画：无钱休入众，遭难莫寻亲。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "无钱休入众，遭难莫寻亲。\n平生不做皱眉事，世上应无切齿人。\n士者国之宝，儒为席上珍。\n若要断酒法，醒眼看醉人。\n求人须求大丈夫，济人须济急时无。\n渴时一滴如甘露，醉后添杯不如无。\n久住令人贱，频来亲也疏。\n酒中不语真君子，财上分明大丈夫。\n出家如初，成佛有余。\n积金千两，不如明解经书。\n养子不教如养驴，养女不教如养猪。\n有田不耕仓廪虚，有书不读子孙愚。\n仓廪虚兮岁月乏，子孙愚兮礼仪疏。\n听君一席话，胜读十年书。\n人不通今古，马牛如襟裾。\n茫茫四海人无数，哪个男儿是丈夫？\n白酒酿成缘好客，黄金散尽为收书。\n救人一命，胜造七级浮屠。\n城门失火，殃及池鱼。\n庭前生瑞草，好事不如无。",
        pinyin: "wú qián xiū rù zhòng， zāo nán mò xún qīn。\npíng shēng bù zuò zhòu méi shì， shì shàng yìng wú qiè chǐ rén。\nshì zhě guó zhī bǎo， rú wèi xí shàng zhēn。\nruò yào duàn jiǔ fǎ， xǐng yǎn kàn zuì rén。\nqiú rén xū qiú dà zhàng fu， jì rén xū jì jí shí wú。\nkě shí yī dī rú gān lù， zuì hòu tiān bēi bù rú wú。\njiǔ zhù lìng rén jiàn， pín lái qīn yě shū。\njiǔ zhōng bù yǔ zhēn jūn zǐ， cái shàng fēn míng dà zhàng fu。\nchū jiā rú chū， chéng fó yǒu yú。\njī jīn qiān liǎng， bù rú míng jiě jīng shū。\nyǎng zǐ bù jiào rú yǎng lǘ， yǎng nǚ bù jiào rú yǎng zhū。\nyǒu tián bù gēng cāng lǐn xū， yǒu shū bù dú zǐ sūn yú。\ncāng lǐn xū xī suì yuè fá， zǐ sūn yú xī lǐ yí shū。\ntīng jūn yī xí huà， shèng dú shí nián shū。\nrén bù tōng jīn gǔ， mǎ niú rú jīn jū。\nmáng máng sì hǎi rén wú shù， nǎ gè nán ér shì zhàng fu？\nbái jiǔ niàng chéng yuán hào kè， huáng jīn sàn jìn wèi shōu shū。\njiù rén yī mìng， shèng zào qī jí fú tú。\nchéng mén shī huǒ， yāng jí chí yú。\ntíng qián shēng ruì cǎo， hǎo shì bù rú wú。",
        translation: "没有钱就别往人堆里凑，遇到灾难不要去求亲戚。一辈子不做让人皱眉的坏事，世上就不会有咬牙恨你的人。读书有才干的人是国家的宝贝，有学问的人像席上的珍宝一样难得。想戒酒有个好办法：清醒的时候去看看喝醉的人是什么样子。求人要求堂堂正正的男子汉，帮人要帮在人家正着急缺什么的时候。口渴时的一滴水像甘露一样甜，喝醉之后再添一杯不如不要。在别人家住久了会让人看轻，亲戚来得太频繁也会疏远。喝酒时不多说话的是真君子，钱财上清清楚楚的是大丈夫。做事能一直像开始时那样用心，就没有做不成的。攒下千两金子，不如明白地读懂圣贤书。养儿子不教育就像养头驴，养女儿不教育就像养头猪。有田不种粮仓就空，有书不读子孙就笨。粮仓空了日子就艰难，子孙笨了就不懂礼节。听您一番话，胜过读十年书。人要是不懂古往今来的道理，就像牛马披着人的衣裳。茫茫四海人数不清，哪一个才算真正的男子汉？酿成白酒是为了款待客人，散尽黄金是为了收藏好书。救别人一条命，胜过造七层宝塔。城门着了火，护城河里的鱼也跟着遭殃。院子里长出好看的仙草，这种中看不中用的事还不如没有。",
      }
      ],
    },
    {
      title: " · 欲求生富 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 欲求生富》意境插画：欲求生富贵，须下死工夫。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "欲求生富贵，须下死工夫。\n百年成之不足，一旦坏之有余。\n人心似铁，官法如炉。\n善化不足，恶化有余。\n水至清则无鱼，人太急则无智。\n知者减半，愚者全无。\n在家由父，出嫁从夫。\n痴人畏妇，贤女敬夫。\n是非终日有，不听自然无。\n竹篱茅舍风光好，道院僧房终不如。\n宁可正而不足，不可邪而有余。\n宁可信其有，不可信其无。\n命里有时终须有，命里无时莫强求。\n道院迎仙客，书堂隐相儒。\n庭栽栖凤竹，池养化龙鱼。\n结交须胜己，似我不如无。\n但看三五日，相见不如初。\n人情似水分高下，世事如云任卷舒。\n会说说都是，不会说无理。\n磨刀恨不利，刀利伤人指；",
        pinyin: "yù qiú shēng fù guì， xū xià sǐ gōng fū。\nbǎi nián chéng zhī bù zú， yī dàn huài zhī yǒu yú。\nrén xīn sì tiě， guān fǎ rú lú。\nshàn huà bù zú， è huà yǒu yú。\nshuǐ zhì qīng zé wú yú， rén tài jí zé wú zhì。\nzhī zhě jiǎn bàn， yú zhě quán wú。\nzài jiā yóu fù， chū jià cóng fū。\nchī rén wèi fù， xián nǚ jìng fū。\nshì fēi zhōng rì yǒu， bù tīng zì rán wú。\nzhú lí máo shè fēng guāng hǎo， dào yuàn sēng fáng zhōng bù rú。\nnìng kě zhèng ér bù zú， bù kě xié ér yǒu yú。\nnìng kě xìn qí yǒu， bù kě xìn qí wú。\nmìng lǐ yǒu shí zhōng xū yǒu， mìng lǐ wú shí mò qiǎng qiú。\ndào yuàn yíng xiān kè， shū táng yǐn xiāng rú。\ntíng zāi qī fèng zhú， chí yǎng huà lóng yú。\njié jiāo xū shèng jǐ， sì wǒ bù rú wú。\ndàn kàn sān wǔ rì， xiāng jiàn bù rú chū。\nrén qíng sì shuǐ fèn gāo xià， shì shì rú yún rèn juàn shū。\nhuì shuō shuō dōu shì， bù huì shuō wú lǐ。\nmó dāo hèn bù lì， dāo lì shāng rén zhǐ；",
        translation: "想要过上富贵的日子，必须下真功夫。一件事情花一百年也未必做得完，毁掉它只要一天就够了。人心像铁一样，国法像火炉一样，再硬的铁进了炉也得熔化。用善心去感化还不够的话，用恶法去对付就足够了。水太清了就没有鱼，人太急躁了就没有智慧。明白的人烦恼会减去一半，糊涂的人则一点好处都没有。在父母身边要听父亲的，出嫁以后要顺着丈夫。糊涂人反而怕老婆，贤惠的女子敬重丈夫。是非闲话天天都有，不去听它自然就没有。竹子篱笆茅草屋的风光很好，道观和僧房也比不上。宁可正正当当而日子不宽裕，也不要歪门邪道而钱财有余。宁可相信世上有报应，也不要全当作没有。命里该有的终究会有，命里没有的别去强求。道院里迎来成仙的客人，书堂里藏着能做宰相的读书人。院子里种着凤凰栖息的竹子，池塘里养着能化龙的鱼。交朋友要交比自己强的，和自己差不多的不如不交。只要相处三五天，就会觉得还不如刚见面时好。人情像水一样有高有低，世事像云一样随它舒卷。会说话的人说什么都有道理，不会说话的人怎么说都没理。磨刀时嫌刀磨得不够快，刀太快了倒会割伤手指。",
      }
      ],
    },
    {
      title: " · 求财恨不 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 求财恨不》意境插画：求财恨不多，财多害自己。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "求财恨不多，财多害自己。\n知足常足，终身不辱；\n知止常止，终身不耻。\n有福伤财，无福伤己。\n差之毫厘，失之千里。\n若登高必自卑，若涉远必自迩。\n三思而行，再思可矣。\n动口不如亲为，求人不如求己。\n小时是兄弟，长大各乡里。\n嫉财莫嫉食，怨生莫怨死。\n人见白头嗔，我见白头喜。\n多少少年郎，不到白头死。\n墙有缝，壁有耳。\n好事不出门，坏事传千里。\n若要人不知，除非己莫为。\n为人不做亏心事，半夜敲门心不惊。\n贼是小人，智过君子。\n君子固穷，小人穷斯滥矣。\n富贵多忧，贫穷自在。\n不以我为德，反以我为仇。",
        pinyin: "qiú cái hèn bù duō， cái duō hài zì jǐ。\nzhī zú cháng zú， zhōng shēn bù rǔ；\nzhī zhǐ cháng zhǐ， zhōng shēn bù chǐ。\nyǒu fú shāng cái， wú fú shāng jǐ。\nchà zhī háo lí， shī zhī qiān lǐ。\nruò dēng gāo bì zì bēi， ruò shè yuǎn bì zì ěr。\nsān sī ér xíng， zài sī kě yǐ。\ndòng kǒu bù rú qīn wèi， qiú rén bù rú qiú jǐ。\nxiǎo shí shì xiōng dì， zhǎng dà gè xiāng lǐ。\njí cái mò jí shí， yuàn shēng mò yuàn sǐ。\nrén jiàn bái tóu chēn， wǒ jiàn bái tóu xǐ。\nduō shǎo shào nián láng， bù dào bái tóu sǐ。\nqiáng yǒu fèng， bì yǒu ěr。\nhǎo shì bù chū mén， huài shì chuán qiān lǐ。\nruò yào rén bù zhī， chú fēi jǐ mò wèi。\nwèi rén bù zuò kuī xīn shì， bàn yè qiāo mén xīn bù jīng。\nzéi shì xiǎo rén， zhì guò jūn zǐ。\njūn zǐ gù qióng， xiǎo rén qióng sī làn yǐ。\nfù guì duō yōu， pín qióng zì zài。\nbù yǐ wǒ wèi dé， fǎn yǐ wǒ wèi chóu。",
        translation: "求财的时候总嫌钱不多，钱太多了反而会害了自己。知道满足的人常常觉得满足，一辈子不会受辱；知道适可而止的人常常懂得停手，一辈子不会丢脸。有福气的人遇到灾祸只损失钱财，没福气的人就会伤到自己。开头差一点点，结果就会差出千里远。要登高山必须从低处起步，要走远路必须从近处开始。做事要再三想好了再做，多想一想总是对的。光动嘴不如亲自动手，求别人不如求自己。小时候是兄弟，长大了各住各村各乡。嫉妒别人的钱财可以，别嫉妒人家的饭食；埋怨活人可以，别埋怨死人。别人看见头上有了白发就生气，我看见白发反而高兴——有多少年轻小伙子，还没活到白头发就死了。墙上有了缝，隔壁就有耳朵。好事不容易传出门，坏事一传就是千里。要想别人不知道，除非自己不去做。做人不做亏心事，半夜有人敲门也不心慌。做贼的是小人，可他的小聪明往往超过君子。君子穷了也能守本分，小人一穷就什么坏事都干得出来。富贵的人忧愁多，贫穷的人倒自在。有人不把我的好意当恩德，反而把我当成仇人。",
      }
      ],
    },
    {
      title: " · 宁可直中 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 宁可直中》意境插画：宁可直中取，不可曲中求。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "宁可直中取，不可曲中求。\n人无远虑，必有近忧。\n知我者谓我心忧，不知我者谓我何求？\n晴天不肯去，直待雨淋头。\n成事莫说，覆水难收。\n是非只为多开口，烦恼皆因强出头。\n忍得一时之气，免得百日之忧。\n近来学得乌龟法，得缩头时且缩头。\n惧法朝朝乐，欺公日日忧。\n人生一世，草长一春。\n黑发不知勤学早，转眼便是白头翁。\n月过十五光明少，人到中年万事休。\n儿孙自有儿孙福，莫为儿孙做马牛。\n人生不满百，常怀千岁忧。\n今朝有酒今朝醉，明日愁来明日忧。\n路逢险处须回避，事到临头不自由。\n人贫不语，水平不流。\n一家养女百家求，一马不行百马忧。\n有花方酌酒，无月不登楼。\n三杯通大道，一醉解千愁。",
        pinyin: "nìng kě zhí zhōng qǔ， bù kě qǔ zhōng qiú。\nrén wú yuǎn lǜ， bì yǒu jìn yōu。\nzhī wǒ zhě wèi wǒ xīn yōu， bù zhī wǒ zhě wèi wǒ hé qiú？\nqíng tiān bù kěn qù， zhí dài yǔ lín tóu。\nchéng shì mò shuō， fù shuǐ nán shōu。\nshì fēi zhī wèi duō kāi kǒu， fán nǎo jiē yīn qiáng chū tóu。\nrěn dé yī shí zhī qì， miǎn de bǎi rì zhī yōu。\njìn lái xué dé wū guī fǎ， dé suō tóu shí qiě suō tóu。\njù fǎ zhāo zhāo lè， qī gōng rì rì yōu。\nrén shēng yī shì， cǎo cháng yī chūn。\nhēi fā bù zhī qín xué zǎo， zhuǎn yǎn biàn shì bái tóu wēng。\nyuè guò shí wǔ guāng míng shǎo， rén dào zhōng nián wàn shì xiū。\nér sūn zì yǒu ér sūn fú， mò wèi ér sūn zuò mǎ niú。\nrén shēng bù mǎn bǎi， cháng huái qiān suì yōu。\njīn cháo yǒu jiǔ jīn cháo zuì， míng rì chóu lái míng rì yōu。\nlù féng xiǎn chù xū huí bì， shì dào lín tóu bù zì yóu。\nrén pín bù yǔ， shuǐ píng bù liú。\nyī jiā yǎng nǚ bǎi jiā qiú， yī mǎ bù xíng bǎi mǎ yōu。\nyǒu huā fāng zhuó jiǔ， wú yuè bù dēng lóu。\nsān bēi tōng dà dào， yī zuì jiě qiān chóu。",
        translation: "宁可堂堂正正地直接去取，也不要拐弯抹角地去求。人要是没有长远的打算，眼前就会有忧愁。了解我的人说我心里忧愁，不了解我的人问我还想求什么。晴天不肯动身，非要等到被雨淋头。事情已经办成了就别再议论，泼出去的水收不回来。惹是非都是因为话多，添烦恼都是因为爱出风头。忍住一时的火气，就能免去一百天的忧愁。近来学会了乌龟的办法，该缩头的时候就缩一缩头。敬畏法纪的人天天快乐，欺负公道的人天天担忧。人活一辈子，就像草儿绿一个春天。黑头发的时候不知道早点用功，一转眼就成了白头老头。月亮过了十五就光亮渐少，人到了中年就觉得干什么都晚了。儿孙自有儿孙的福气，别为儿孙当牛做马。人活不满一百岁，却常常怀着一千年的忧愁。今天有酒就今天喝醉，明天的愁明天再愁。路上遇到危险的地方要绕着走，事情到了眼前就由不得自己了。人穷了说话没人听，就像水平静了不会流动。一家养了女儿，一百家来提亲；一匹马不肯走，一百匹马都发愁。有花儿的时候才喝酒助兴，没有月亮就不上楼赏景。喝上三杯酒就通了大道理，大醉一场能解千般愁。",
      }
      ],
    },
    {
      title: " · 深山毕竟 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 深山毕竟》意境插画：深山毕竟藏猛虎，大海终须纳细流。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "深山毕竟藏猛虎，大海终须纳细流。\n惜花须检点，爱月不梳头。\n大抵选她肌骨好，不搽红粉也风流。\n受恩深处宜先退，得意浓时便可休。\n莫待是非来入耳，从前恩爱反为仇。\n留得五湖明月在，不愁无处下金钩。\n休别有鱼处，莫恋浅滩头。\n去时终须去，再三留不住。\n忍一句，息一怒，饶一着，退一步。\n三十不豪，四十不富，五十将来寻死路。\n生不认魂，死不认尸。\n一寸光阴一寸金，寸金难买寸光阴。\n父母恩深终有别，夫妻义重也分离。\n人生似鸟同林宿，大难来时各自飞。\n人善被人欺，马善被人骑。\n人无横财不富，马无夜草不肥。\n人恶人怕天不怕，人善人欺天不欺。\n善恶到头终有报，只盼来早与来迟。\n黄河尚有澄清日，岂能人无得运时？\n得宠思辱，居安思危。",
        pinyin: "shēn shān bì jìng cáng měng hǔ， dà hǎi zhōng xū nà xì liú。\nxī huā xū jiǎn diǎn， ài yuè bù shū tóu。\ndà dǐ xuǎn tā jī gǔ hǎo， bù chá hóng fěn yě fēng liú。\nshòu ēn shēn chù yí xiān tuì， dé yì nóng shí biàn kě xiū。\nmò dài shì fēi lái rù ěr， cóng qián ēn ài fǎn wèi chóu。\nliú dé wǔ hú míng yuè zài， bù chóu wú chù xià jīn gōu。\nxiū bié yǒu yú chù， mò liàn qiǎn tān tóu。\nqù shí zhōng xū qù， zài sān liú bù zhù。\nrěn yī jù， xī yī nù， ráo yī zhe， tuì yī bù。\nsān shí bù háo， sì shí bù fù， wǔ shí jiāng lái xún sǐ lù。\nshēng bù rèn hún， sǐ bù rèn shī。\nyī cùn guāng yīn yī cùn jīn， cùn jīn nán mǎi cùn guāng yīn。\nfù mǔ ēn shēn zhōng yǒu bié， fū qī yì zhòng yě fēn lí。\nrén shēng sì niǎo tóng lín sù， dà nàn lái shí gè zì fēi。\nrén shàn bèi rén qī， mǎ shàn bèi rén qí。\nrén wú hèng cái bù fù， mǎ wú yè cǎo bù féi。\nrén è rén pà tiān bù pà， rén shàn rén qī tiān bù qī。\nshàn è dào tóu zhōng yǒu bào， zhī pàn lái zǎo yǔ lái chí。\nhuáng hé shàng yǒu chéng qīng rì， qǐ néng rén wú dé yùn shí？\ndé chǒng sī rǔ， jū ān sī wēi。",
        translation: "深山里终究藏着猛虎，大海也终究要容纳细小的水流。爱惜花的人要举止检点，真心爱月的人顾不上梳妆打扮。只要她天生模样好看，不搽胭脂也漂亮。受人恩惠深了就应该早点退让，正得意的时候就该收手。别等是非传进耳朵里，那时从前的恩爱反而会变成仇怨。只要五湖的明月还在，就不愁没有地方下金钩钓鱼。别的地方有鱼就去，别死守着浅滩头不放。该走的时候终究要走，再三挽留也留不住。少说一句气话，平息一场怒气，让人一着棋，退后一步路。三十岁不豪爽努力，四十岁不富足，到了五十岁就要走投无路了。活着的时候人认不得自己的魂，死了以后魂也认不得尸身。一寸光阴就像一寸金子，可一寸金子难买一寸光阴。父母恩情再深也终有分别的一天，夫妻情义再重也会有分离的时候。人活着像鸟儿同住一片树林，大难来的时候就各自飞散了。人太善良容易被欺负，马太温顺容易被骑。人没有意外之财富不起来，马不吃夜草长不肥。人坏，人人怕他，老天却不怕他；人善，人人欺负他，老天却不欺负他。善和恶到头来终究有报应，只看报应来得早还是来得迟。黄河还有水清的日子，人怎么会没有走运的时候？得宠的时候要想到失宠，平安的时候要想到危险。",
      }
      ],
    },
    {
      title: " · 念念有如 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 念念有如》意境插画：念念有如临敌日，心心常似过桥时。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "念念有如临敌日，心心常似过桥时。\n英雄行险道，富贵似花枝。\n人情莫道春光好，只怕秋来有冷时。\n送君千里，终有一别。\n但将冷眼观螃蟹，看你横行到几时。\n见事莫说，问事不知。\n闲事莫管，无事早归。\n假缎染就真红色，也被旁人说是非。\n善事可做，恶事莫为。\n许人一物，千金不移。\n龙生龙子，虎生虎儿。\n龙游浅水遭虾戏，虎落平原被犬欺。\n一举首登龙虎榜，十年身到凤凰池。\n十年寒窗无人问，一举成名天下知。\n酒债寻常处处有，人生七十古来稀！\n养儿防老，积谷防饥。\n鸡豚狗彘之畜，无失其时，数口之家，可以无饥矣。\n当家才知盐米贵，养子方知父母恩。\n常将有日思无日，莫把无时当有时。\n树欲静而风不止，子欲养而亲不待。",
        pinyin: "niàn niàn yǒu rú lín dí rì， xīn xīn cháng sì guò qiáo shí。\nyīng xióng xíng xiǎn dào， fù guì sì huā zhī。\nrén qíng mò dào chūn guāng hǎo， zhǐ pà qiū lái yǒu lěng shí。\nsòng jūn qiān lǐ， zhōng yǒu yī bié。\ndàn jiāng lěng yǎn guān páng xiè， kàn nǐ héng xíng dào jǐ shí。\njiàn shì mò shuō， wèn shì bù zhī。\nxián shì mò guǎn， wú shì zǎo guī。\njiǎ duàn rǎn jiù zhēn hóng sè， yě bèi páng rén shuō shì fēi。\nshàn shì kě zuò， è shì mò wèi。\nxǔ rén yī wù， qiān jīn bù yí。\nlóng shēng lóng zǐ， hǔ shēng hǔ ér。\nlóng yóu qiǎn shuǐ zāo xiā xì， hǔ luò píng yuán bèi quǎn qī。\nyī jǔ shǒu dēng lóng hǔ bǎng， shí nián shēn dào fèng huáng chí。\nshí nián hán chuāng wú rén wèn， yī jǔ chéng míng tiān xià zhī。\njiǔ zhài xún cháng chù chù yǒu， rén shēng qī shí gǔ lái xī！\nyǎng ér fáng lǎo， jī gǔ fáng jī。\njī tún gǒu zhì zhī chù， wú shī qí shí， shù kǒu zhī jiā， kě yǐ wú jī yǐ。\ndāng jiā cái zhī yán mǐ guì， yǎng zǐ fāng zhī fù mǔ ēn。\ncháng jiāng yǒu rì sī wú rì， mò bǎ wú shí dāng yǒu shí。\nshù yù jìng ér fēng bù zhǐ， zǐ yù yǎng ér qīn bù dài。",
        translation: "每一个念头都要像面对敌人一样小心，每一颗心都要像过独木桥一样谨慎。英雄走的是危险的路，富贵就像枝头的花一样容易谢。别说人情总像春光那样好，就怕秋天来了有冷落的时候。送您送到千里之外，终究还是要分别一次。只用冷眼去看那横着走的螃蟹，看它还能横行到什么时候。看见事情别乱说，别人问起就说不知道；闲事不要管，没事早点回家。假缎子就算染成真正的红色，也会被别人说三道四。好事可以做，坏事不要干。答应给人的东西，就是千金也不能反悔。龙生的是龙子，虎生的是虎儿。龙游到浅水里会遭小虾戏弄，老虎落到平原上会被狗欺负。一举考中龙虎榜，十年就能升到凤凰池。十年苦读没人过问，一举成名天下都知道。欠下的酒债到处都有，人能活到七十岁自古就稀少！养儿是为了防老，囤粮是为了防饥荒。鸡、猪、狗这些家畜，该养的时候好好养，一家人就不会挨饿了。自己当了家才知道盐和米的贵，自己养了孩子才知道父母的恩。日子好过的时候要常想想没有的日子，别把没有的时候当成有的时候。树想安静下来，风却停不下来；儿女想奉养父母，父母却等不到那一天。",
      }
      ],
    },
    {
      title: " · 时来风送 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 时来风送》意境插画：时来风送滕王阁，运去雷轰荐福碑。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "时来风送滕王阁，运去雷轰荐福碑。\n入门休问荣枯事，且看容颜便得知。\n官清司吏瘦，神灵庙祝肥。\n息却雷霆之怒，罢却虎豹之威。\n饶人算之本，输人算之机。\n好言难得，恶语易施。\n一言既出，驷马难追。\n道吾好者是吾贼，道吾恶者是吾师。\n路逢侠客须呈剑，不是才人莫献诗。\n三人行必有我师焉。\n择其善者而从之，其不善者而改之。\n欲昌和顺须为善，要振家声在读书。\n少壮不努力，老大徒伤悲。\n人有善愿，天必佑之。\n莫饮卯时酒，昏昏醉到酉。\n莫骂酉时妻，一夜受孤凄。\n种麻得麻，种豆得豆。\n天眼恢恢，疏而不漏。\n见官莫向前，作客莫在后。\n宁添一斗，莫添一口。",
        pinyin: "shí lái fēng sòng téng wáng gé， yùn qù léi hōng jiàn fú bēi。\nrù mén xiū wèn róng kū shì， qiě kàn róng yán biàn dé zhī。\nguān qīng sī lì shòu， shén líng miào zhù féi。\nxī què léi tíng zhī nù， bà què hǔ bào zhī wēi。\nráo rén suàn zhī běn， shū rén suàn zhī jī。\nhǎo yán nán dé， è yǔ yì shī。\nyī yán jì chū， sì mǎ nán zhuī。\ndào wú hǎo zhě shì wú zéi， dào wú è zhě shì wú shī。\nlù féng xiá kè xū chéng jiàn， bù shì cái rén mò xiàn shī。\nsān rén xíng bì yǒu wǒ shī yān。\nzé qí shàn zhě ér cóng zhī， qí bù shàn zhě ér gǎi zhī。\nyù chāng hé shùn xū wèi shàn， yào zhèn jiā shēng zài dú shū。\nshào zhuàng bù nǔ lì， lǎo dà tú shāng bēi。\nrén yǒu shàn yuàn， tiān bì yòu zhī。\nmò yǐn mǎo shí jiǔ， hūn hūn zuì dào yǒu。\nmò mà yǒu shí qī， yī yè shòu gū qī。\nzhǒng má dé má， zhòng dòu dé dòu。\ntiān yǎn huī huī， shū ér bù lòu。\njiàn guān mò xiàng qián， zuò kè mò zài hòu。\nníng tiān yī dǒu， mò tiān yī kǒu。",
        translation: "运气好的时候，大风会把你一路送到滕王阁；运气背的时候，好碑也会被雷轰掉。进了门不用问人家的日子过得怎么样，看看脸上的气色就知道了。当官的清廉，手下的小吏就清瘦；庙里的神仙灵验，管香火的人就养得肥。压下雷霆一样的怒气，收起虎豹一样的威风。肯饶恕别人是打算的根本，肯让人一步是打算的妙处。好话难得听到，坏话容易出口。一句话说出了口，就是四匹马拉的车也追不回来。总说你好话的人，其实是害你的人；肯说你毛病的人，才是你的老师。路上遇见侠客应该献上宝剑，不是有才的人就不要献诗。三个人一起走路，其中一定有可以当我老师的人。挑他们好的地方跟着学，他们不好的地方就改掉自己。想让家里和顺就要多做好事，想光耀门第就要好好读书。年轻力壮时不努力，老了只剩下白白悲伤。人只要怀着善良的心愿，老天一定会保佑他。别在清早就喝酒，会昏昏沉沉醉到傍晚；别在傍晚骂妻子，会孤单冷清一整夜。种下麻就收麻，种下豆就收豆。老天爷的眼睛又大又亮，看起来稀疏，其实什么都漏不掉。见官的时候别抢到前面，做客的时候别落在后面。宁可多添一斗粮食，也不要多添一张吃饭的嘴。",
      }
      ],
    },
    {
      title: " · 螳螂捕蝉 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 螳螂捕蝉》意境插画：螳螂捕蝉，岂知黄雀在后？——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "螳螂捕蝉，岂知黄雀在后？\n不求金玉重重贵，但愿儿孙个个贤。\n一日夫妻，百世姻缘。\n百世修来同船渡，千世修来共枕眠。\n杀人一万，自损三千。\n伤人一语，利如刀割。\n枯木逢春犹再发，人无两度再少年。\n未晚先投宿，鸡鸣早看天。\n将相顶头堪走马，公侯肚内好撑船。\n富人思来年，穷人想眼前。\n世上若要人情好，赊去物品莫取钱。\n生死有命，富贵在天。\n击石原有火，不击乃无烟。\n人学始知道，不学亦徒然。\n莫笑他人老，终须还到老。\n和得邻里好，犹如拾片宝。\n但能守本分，终身无烦恼。\n大家做事寻常，小家做事慌张。\n大家礼义教子弟，小家凶恶训儿郎。\n君子爱财，取之有道。",
        pinyin: "táng láng bǔ chán， qǐ zhī huáng què zài hòu？\nbù qiú jīn yù chóng chóng guì， dàn yuàn ér sūn gè gè xián。\nyī rì fū qī， bǎi shì yīn yuán。\nbǎi shì xiū lái tóng chuán dù， qiān shì xiū lái gòng zhěn mián。\nshā rén yī wàn， zì sǔn sān qiān。\nshāng rén yī yǔ， lì rú dāo gē。\nkū mù féng chūn yóu zài fā， rén wú liǎng dù zài shào nián。\nwèi wǎn xiān tóu sù， jī míng zǎo kàn tiān。\njiàng xiàng dǐng tóu kān zǒu mǎ， gōng hóu dù nèi hǎo chēng chuán。\nfù rén sī lái nián， qióng rén xiǎng yǎn qián。\nshì shàng ruò yào rén qíng hǎo， shē qù wù pǐn mò qǔ qián。\nshēng sǐ yǒu mìng， fù guì zài tiān。\njī shí yuán yǒu huǒ， bù jī nǎi wú yān。\nrén xué shǐ zhī dào， bù xué yì tú rán。\nmò xiào tā rén lǎo， zhōng xū hái dào lǎo。\nhé dé lín lǐ hǎo， yóu rú shí piàn bǎo。\ndàn néng shǒu běn fèn， zhōng shēn wú fán nǎo。\ndà jiā zuò shì xún cháng， xiǎo jiā zuò shì huāng zhāng。\ndà jiā lǐ yì jiào zǐ dì， xiǎo jiā xiōng è xùn ér láng。\njūn zǐ ài cái， qǔ zhī yǒu dào。",
        translation: "螳螂正要捉蝉，哪里知道黄雀就跟在后面？不求家里金子玉器堆得贵重，只愿儿孙个个贤明能干。做一天夫妻，也是百世结下的姻缘。一百辈子修来的缘分才能同船过渡，一千辈子修来的缘分才能同床共枕。杀敌一万，自己也要损失三千；伤人一句话，像刀割一样疼。枯树遇到春天还能再发芽，人却不能有第二次少年。天没黑就先找好住处，鸡叫了就早早看看天气。将相的头顶宽得能跑马，公侯的肚量大得能撑船。富人操心的是来年的事，穷人只想眼前的事。世上要想人情处得好，东西赊给别人就别再催着要钱。生死是命中注定的，富贵是老天安排的。石头敲一敲本有火星，不去敲就没有烟。人学习了才懂道理，不学习就白活了。别笑话别人老，自己终究也会老。和邻居处得好，就像捡到一块宝贝。只要守住自己的本分，一辈子没有烦恼。大户人家做事从容不迫，小户人家做事慌慌张张。大户人家用礼义教导子弟，小户人家用打骂训斥孩子。君子也爱钱财，但取钱要走正道。",
      }
      ],
    },
    {
      title: " · 贞妇爱色 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 贞妇爱色》意境插画：贞妇爱色，纳之以礼。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "贞妇爱色，纳之以礼。\n善有善报，恶有恶报。\n不是不报，时候未到。\n万恶淫为首，百行孝当先。\n人而无信，不知其可也。\n一人道虚，千人传实。\n凡事要好，须问三老。\n若争小利，便失大道。\n家中不和邻里欺，邻里不和说是非。\n年年防饥，夜夜防盗。\n学者是好，不学不好。\n学者如禾如稻，不学如草如蒿。\n遇饮酒时须防醉，得高歌处且高歌。\n因风吹火，用力不多。\n不因渔夫引，怎能见波涛？\n无求到处人情好，不饮任他酒价高。\n知事少时烦恼少，识人多处是非多。\n进山不怕伤人虎，只怕人情两面刀。\n强中更有强中手，恶人须用恶人磨。\n会使不在家富豪，风流不用衣着佳。",
        pinyin: "zhēn fù ài sè， nà zhī yǐ lǐ。\nshàn yǒu shàn bào， è yǒu è bào。\nbù shì bù bào， shí hòu wèi dào。\nwàn è yín wéi shǒu， bǎi háng xiào dāng xiān。\nrén ér wú xìn， bù zhī qí kě yě。\nyī rén dào xū， qiān rén chuán shí。\nfán shì yào hǎo， xū wèn sān lǎo。\nruò zhēng xiǎo lì， biàn shī dà dào。\njiā zhōng bù hé lín lǐ qī， lín lǐ bù hé shuō shì fēi。\nnián nián fáng jī， yè yè fáng dào。\nxué zhě shì hǎo， bù xué bù hǎo。\nxué zhě rú hé rú dào， bù xué rú cǎo rú hāo。\nyù yǐn jiǔ shí xū fáng zuì， dé gāo gē chù qiě gāo gē。\nyīn fēng chuī huǒ， yòng lì bù duō。\nbù yīn yú fū yǐn， zěn néng jiàn bō tāo？\nwú qiú dào chù rén qíng hǎo， bù yǐn rèn tā jiǔ jià gāo。\nzhī shì shǎo shí fán nǎo shǎo， shí rén duō chù shì fēi duō。\njìn shān bù pà shāng rén hǔ， zhǐ pà rén qíng liǎng miàn dāo。\nqiáng zhōng gèng yǒu qiáng zhōng shǒu， è rén xū yòng è rén mó。\nhuì shǐ bù zài jiā fù háo， fēng liú bù yòng yī zhuó jiā。",
        translation: "正派的女子也爱美，但一切都要按礼数来对待。做好事有好报，做坏事有恶报；不是不报应，只是时候还没到。万般坏事里放纵胡为最坏，一百样品行里孝顺排第一。一个人要是没有信用，真不知道他还能做什么。一个人说了句不实的话，传到一千个人嘴里就成了真的。事情要想办好，得请教经验多的老人家。只顾争小便宜，就会失去大道理。一家人不和睦会被邻居欺负，和邻居不和睦就会被说闲话。年年要防备饥荒，夜夜要提防盗贼。肯学习是好事，不学习就不好。学习的人像禾苗稻谷，不学习的人像野草蒿草。该喝酒的时候要防着自己喝醉，该放声高歌的地方就放声高歌。顺着风去点火，用不了多大力气。没有渔夫引路，怎么能见到大风大浪？没有所求的时候到处人情都好，不喝酒的人酒价再高也不怕。知道的事情少，烦恼就少；认识的人多，是非就多。进山不怕伤人的老虎，只怕那两面三刀的人情。强手里面还有更强的强手，对付恶人就得用恶人去磨。会过日子的人不靠家里富有，体面也不全靠衣裳漂亮。",
      }
      ],
    },
    {
      title: " · 光阴似箭 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 光阴似箭》意境插画：光阴似箭，日月如梭。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "光阴似箭，日月如梭。\n天时不如地利，地利不如人和。\n黄金未为贵，安乐值钱多。\n为善最乐，作恶难逃。\n羊有跪乳之恩，鸦有反哺之情。\n孝顺还生孝顺子，忤逆还生忤逆儿。\n不信但看檐前水，点点滴滴旧窝池。\n隐恶扬善，执其两端。\n妻贤夫祸少，子孝父心宽。\n已覆之水，收之实难。\n人生知足时常足，人老偷闲且是闲。\n处处绿杨堪系马，家家有路通长安。\n既坠釜甑，反顾何益。\n见者易，学者难。\n厌静还思喧，嫌喧又忆山。\n自从心定后，无处不安然。\n莫将容易得，便作等闲看。\n用心计较般般错，退后思量事事宽。\n道路各别，养家一般。\n由俭入奢易，从奢入俭难。",
        pinyin: "guāng yīn sì jiàn， rì yuè rú suō。\ntiān shí bù rú dì lì， dì lì bù rú rén hé。\nhuáng jīn wèi wèi guì， ān lè zhí qián duō。\nwéi shàn zuì lè， zuò è nán táo。\nyáng yǒu guì rǔ zhī ēn， yā yǒu fǎn bǔ zhī qíng。\nxiào shùn hái shēng xiào shùn zǐ， wǔ nì hái shēng wǔ nì ér。\nbù xìn dàn kàn yán qián shuǐ， diǎn diǎn dī dī jiù wō chí。\nyǐn è yáng shàn， zhí qí liǎng duān。\nqī xián fū huò shǎo， zǐ xiào fù xīn kuān。\nyǐ fù zhī shuǐ， shōu zhī shí nán。\nrén shēng zhī zú shí cháng zú， rén lǎo tōu xián qiě shì xián。\nchù chù lǜ yáng kān xì mǎ， jiā jiā yǒu lù tōng cháng ān。\njì zhuì fǔ zèng， fǎn gù hé yì。\njiàn zhě yì， xué zhě nán。\nyàn jìng hái sī xuān， xián xuān yòu yì shān。\nzì cóng xīn dìng hòu， wú chù bù ān rán。\nmò jiāng róng yì dé， biàn zuò děng xián kàn。\nyòng xīn jì jiào bān bān cuò， tuì hòu sī liang shì shì kuān。\ndào lù gè bié， yǎng jiā yī bān。\nyóu jiǎn rù shē yì， cóng shē rù jiǎn nán。",
        translation: "光阴像射出去的箭，日月像织布的梭子，一晃就过去。好天时不如好地利，好地利不如人和睦。黄金算不上最贵重，平安快乐才最值钱。做好事最快乐，做坏事逃不掉惩罚。小羊有跪着吃奶报答母恩的心，乌鸦有长大后反过来喂养老乌鸦的情。孝顺的人家养出孝顺的孩子，不孝顺的人家也养出不孝顺的儿孙。不信你看屋檐前的水，一滴一滴，落下的还是旧日的窝池。别人的坏处别去宣扬，别人的好处要传扬，处理事情要不偏不倚、把握分寸。妻子贤惠丈夫的祸事就少，孩子孝顺父亲的心就宽。已经泼翻在地上的水，想收回来实在很难。人一生知足就常常觉得满足，人老了偷个闲就算清闲。处处有绿杨柳树可以拴马，家家都有路通向京城。锅既然已经摔破了，回头再看又有什么用呢。看别人做觉得容易，自己学起来才知难。嫌安静又想念热闹，嫌热闹又想念山林；自从心里安定了以后，在哪儿都自在。别把容易得到的东西，就随便不当回事。样样都要斤斤计较，反而样样都错；退一步想一想，事事都宽绰。各家走的路不一样，过日子养家的道理是一样的。从节俭变得奢侈容易，从奢侈回到节俭就难了。",
      }
      ],
    },
    {
      title: " · 知音说与 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 知音说与》意境插画：知音说与知音听，不是知音莫与谈。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "知音说与知音听，不是知音莫与谈。\n点石化为金，人心犹未足。\n信了赌，卖了屋。\n他人观花，不涉你目。\n他人碌碌，不涉你足。\n谁人不爱子孙贤，谁人不爱千锺粟。\n奈五行，不是这般题目。\n莫把真心空计较，儿孙自有儿孙福。\n书到用时方恨少，事非经过不知难。\n天下无不是的父母，世上最难得者兄弟。\n与人不和，劝人养鹅；与人不睦，劝人架屋。\n但行好事，莫问前程。不交僧道，便是好人。\n河狭水激，人急计生。\n明知山有虎，莫向虎山行。\n路不铲不平，事不为不成。\n无钱方断酒，临老始读经。\n点塔七层，不如暗处一灯。\n堂上二老是活佛，何用灵山朝世尊。\n万事劝人休瞒昧，举头三尺有神明。\n但存方寸土，留与子孙耕。",
        pinyin: "zhī yīn shuō yǔ zhī yīn tīng， bù shì zhī yīn mò yǔ tán。\ndiǎn shí huà wéi jīn， rén xīn yóu wèi zú。\nxìn le dǔ， mài le wū。\ntā rén guān huā， bù shè nǐ mù。\ntā rén lù lù， bù shè nǐ zú。\nshuí rén bù ài zǐ sūn xián， shuí rén bù ài qiān zhōng sù。\nnài wǔ háng， bù shì zhè bān tí mù。\nmò bǎ zhēn xīn kōng jì jiào， ér sūn zì yǒu ér sūn fú。\nshū dào yòng shí fāng hèn shǎo， shì fēi jīng guò bù zhī nán。\ntiān xià wú bù shì de fù mǔ， shì shàng zuì nán dé zhě xiōng dì。\nyǔ rén bù hé， quàn rén yǎng é； yǔ rén bù mù， quàn rén jià wū。\ndàn xíng hǎo shì， mò wèn qián chéng。 bù jiāo sēng dào， biàn shì hǎo rén。\nhé xiá shuǐ jī， rén jí jì shēng。\nmíng zhī shān yǒu hǔ， mò xiàng hǔ shān xíng。\nlù bù chǎn bù píng， shì bù wèi bù chéng。\nwú qián fāng duàn jiǔ， lín lǎo shǐ dú jīng。\ndiǎn tǎ qī céng， bù rú àn chù yī dēng。\ntáng shàng èr lǎo shì huó fó， hé yòng líng shān cháo shì zūn。\nwàn shì quàn rén xiū mán mèi， jǔ tóu sān chǐ yǒu shén míng。\ndàn cún fāng cùn tǔ， liú yǔ zǐ sūn gēng。",
        translation: "知心的话要说给知心的人听，不是知心的人就不要跟他说。就算有人能把石头点化成金子，人心还是不会满足。信了赌博，连屋子都会卖掉。别人看花，进不了你的眼睛；别人忙忙碌碌，也碍不着你的脚。谁不疼爱贤明的儿孙？谁不喜欢堆满千钟的粮食？可惜命中注定的事，不会都由着人来。别为儿孙的事白白费尽心思，儿孙自有儿孙的福气。书到要用的时候才恨读得太少，事情没有亲身经过就不知道有多难。天底下没有不对的父母，世上最难得的是好兄弟。和人闹了别扭，就去养养鹅、搭搭屋，试试大家一起做事的难处，就知道和睦有多难得。只管做好事，别问以后的前程；不跟和尚道士瞎混，就算是个好人。河道窄了水流就急，人到了急处就会想出办法。明知山上有老虎，就别往虎山上走。路不铲除就不会平，事不去做就不会成。戒不了酒的人往往到没了钱才戒，读经的人往往到老了才开始。给七层宝塔点灯，不如在暗处点一盏灯实在。家里的两位老人就是活佛，何必去灵山拜佛祖。劝人什么事都别隐瞒昧良心，抬头三尺就有神明看着。只要留下这一小块心地干净的土地，留给子孙慢慢耕种。",
      }
      ],
    },
    {
      title: " · 灭却心头 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 灭却心头》意境插画：灭却心头火，剔起佛前灯。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "灭却心头火，剔起佛前灯。\n惺惺多不足，蒙蒙作公卿。\n众星朗朗，不如孤月独明。\n兄弟相害，不如友生。\n合理可作，小利不争。\n牡丹花好空入目，枣花虽小结实多。\n欺老莫欺小，欺人心不明。\n勤奋耕锄收地利，他时饱暖谢苍天。\n得忍且忍，得耐且耐，不忍不耐，小事成灾。\n相论逞英豪，家计渐渐退。\n贤妇令夫贵，恶妇令夫败。\n一人有庆，兆民咸赖。\n人老心未老，人穷志莫穷。\n人无千日好，花无百日红。\n黄蜂一口针，橘子两边分。\n世间痛恨事，最毒淫妇心。\n杀人可恕，情理不容。\n乍富不知新受用，乍贫难改旧家风。\n座上客常满，杯中酒不空。\n屋漏更遭连夜雨，行船又遇打头风。",
        pinyin: "miè què xīn tóu huǒ， tī qǐ fó qián dēng。\nxīng xīng duō bù zú， méng méng zuò gōng qīng。\nzhòng xīng lǎng lǎng， bù rú gū yuè dú míng。\nxiōng dì xiāng hài， bù rú yǒu shēng。\nhé lǐ kě zuò， xiǎo lì bù zhēng。\nmǔ dān huā hǎo kōng rù mù， zǎo huā suī xiǎo jiē shi duō。\nqī lǎo mò qī xiǎo， qī rén xīn bù míng。\nqín fèn gēng chú shōu dì lì， tā shí bǎo nuǎn xiè cāng tiān。\ndé rěn qiě rěn， dé nài qiě nài， bù rěn bù nài， xiǎo shì chéng zāi。\nxiāng lùn chěng yīng háo， jiā jì jiàn jiàn tuì。\nxián fù lìng fū guì， è fù lìng fū bài。\nyī rén yǒu qìng， zhào mín xián lài。\nrén lǎo xīn wèi lǎo， rén qióng zhì mò qióng。\nrén wú qiān rì hǎo， huā wú bǎi rì hóng。\nhuáng fēng yī kǒu zhēn， jú zǐ liǎng biān fēn。\nshì jiān tòng hèn shì， zuì dú yín fù xīn。\nshā rén kě shù， qíng lǐ bù róng。\nzhà fù bù zhī xīn shòu yòng， zhà pín nán gǎi jiù jiā fēng。\nzuò shàng kè cháng mǎn， bēi zhōng jiǔ bù kōng。\nwū lòu gèng zāo lián yè yǔ， xíng chuán yòu yù dǎ tóu fēng。",
        translation: "灭掉心里那团怒火，点亮佛前的油灯。精明的人常常觉得不够用，糊里糊涂的人反倒做了大官。满天的星星再亮，也比不上一轮明月独自明亮。兄弟之间互相伤害，还不如普通朋友。合乎道理的事可以做，小便宜不要去争。牡丹花虽然好看，只够看着好玩；枣花虽然小，结的果实却多。宁可惹老人，也别去欺负小孩；总想欺负别人，是心里不明事理。勤奋耕种收成好，将来吃饱穿暖要感谢老天。能忍就忍一忍，能耐就耐一耐；不忍不耐，小事也会变成灾祸。朋友聚在一起就逞强斗嘴，家里的日子会越过越差。贤惠的妻子让丈夫显贵，凶恶的妻子让丈夫败落。一个人有了喜庆，千万百姓都跟着沾光。人老了心不能老，人穷了志气不能穷。人没有一千天的顺心，花没有一百天的红。黄蜂有一根毒针，橘子要分成两半大家吃。世上最让人痛恨的，是那心肠狠毒的坏女人。杀了人有时还可以原谅，伤天害理的事情情理不容。刚刚富起来的人还不懂新的受用，刚刚穷下去的人很难改掉旧日的排场。家里座位上常常坐满客人，杯子里的酒不要让它空着。屋顶漏雨偏偏又赶上连夜下雨，行船偏偏又遇上顶头的风。",
      }
      ],
    },
    {
      title: " · 笋因落箨 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 笋因落箨》意境插画：笋因落箨方成竹，鱼为奔波始化龙。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "笋因落箨方成竹，鱼为奔波始化龙。\n记得少年骑竹马，转眼又是白头翁。\n礼义生于富足，盗贼出于赌博。\n天上众星皆拱北，世间无水不朝东。\n士为知己者死，女为悦己者容。\n色即是空，空即是色。\n君子安贫，达人知命。\n良药苦口利于病，忠言逆耳利于行。\n顺天者昌，逆天者亡。\n有缘千里来相会，无缘对面不相逢。\n有福者昌，无福者亡。\n人为财死，鸟为食亡。\n夫妻相和好，琴瑟与笙簧。\n红粉易妆娇态女，无钱难作好儿郎。\n有子之人贫不久，无儿无女富不长。\n善必寿老，恶必早亡。\n爽口食多偏作病，快心事过恐遭殃。\n富贵定要依本分，贫穷不必再思量。\n画水无风空作浪，绣花虽好不闻香。\n贪他一斗米，失却半年粮。",
        pinyin: "sǔn yīn luò tuò fāng chéng zhú， yú wèi bēn bō shǐ huà lóng。\njì de shào nián qí zhú mǎ， zhuǎn yǎn yòu shì bái tóu wēng。\nlǐ yì shēng yú fù zú， dào zéi chū yú dǔ bó。\ntiān shàng zhòng xīng jiē gǒng běi， shì jiān wú shuǐ bù cháo dōng。\nshì wèi zhī jǐ zhě sǐ， nǚ wèi yuè jǐ zhě róng。\nsè jí shì kōng， kōng jí shì sè。\njūn zǐ ān pín， dá rén zhī mìng。\nliáng yào kǔ kǒu lì yú bìng， zhōng yán nì ěr lì yú xíng。\nshùn tiān zhě chāng， nì tiān zhě wáng。\nyǒu yuán qiān lǐ lái xiāng huì， wú yuán duì miàn bù xiāng féng。\nyǒu fú zhě chāng， wú fú zhě wáng。\nrén wéi cái sǐ， niǎo wèi shí wáng。\nfū qī xiāng hé hǎo， qín sè yǔ shēng huáng。\nhóng fěn yì zhuāng jiāo tài nǚ， wú qián nán zuò hǎo ér láng。\nyǒu zǐ zhī rén pín bù jiǔ， wú ér wú nǚ fù bù cháng。\nshàn bì shòu lǎo， è bì zǎo wáng。\nshuǎng kǒu shí duō piān zuò bìng， kuài xīn shì guò kǒng zāo yāng。\nfù guì dìng yào yī běn fèn， pín qióng bù bì zài sī liang。\nhuà shuǐ wú fēng kōng zuò làng， xiù huā suī hǎo bù wén xiāng。\ntān tā yī dǒu mǐ， shī què bàn nián liáng。",
        translation: "竹笋脱掉一层层外壳才长成竹子，鲤鱼经过千里奔波才化成龙。还记得小时候骑着竹马玩耍，一转眼已经是白头老翁了。礼义是从富足的日子里生出来的，盗贼往往是从赌博里学出来的。天上的星星都围着北极星转，世间的江水没有不朝东流的。有本事的人肯为知己自己的人献出生命，女子愿意为喜爱自己的人打扮。看得见的美色到头来是一场空，空里头又生出种种景象。君子安于贫穷，通达的人听天由命。良药苦口，却能治好病；忠言听着不顺耳，却能帮人把事做好。顺应天理的兴旺，违背天理的灭亡。有缘分的人隔着千里也会来相会，没有缘分的人面对面也认不出。有福的人家兴旺，没福的人家衰败。人为钱财丢了性命，鸟为食物丢了性命。夫妻和和好好，就像琴瑟笙簧一起合奏。胭脂水粉容易把姑娘打扮得娇美，没有钱小伙子就难以体面。有儿女的人穷不了多久，没儿没女的家富不长。善良的人一定长寿，作恶的人必定早亡。爽口的东西吃多了反而生病，痛快的事过了头恐怕要遭殃。富贵了也一定要守本分，贫穷了也不必再苦苦盘算。画出来的水没有风也起空浪，绣出来的花再好看也闻不到香。贪图人家一斗米，反而丢了半年的口粮。",
      }
      ],
    },
    {
      title: " · 争他一脚 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 争他一脚》意境插画：争他一脚豚，反失一肘羊。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "争他一脚豚，反失一肘羊。\n龙归晚洞云犹湿，麝过春山草木香。\n平生只会说人短，何不回头把己量？\n见善如不及，见恶如探汤。\n人穷志短，马瘦毛长。\n自家心里急，他人未知忙。\n贫无达士将金赠，病有高人说药方。\n触来莫与竞，事过心清凉。\n秋来满山多秀色，春来无处不花香。\n凡人不可貌相，海水不可斗量。\n清清之水为土所防，济济之士为酒所伤。\n蒿草之下或有兰香，茅茨之屋或有侯王。\n无限朱门生饿殍，几多白屋出公卿。\n酒里乾坤大，壶中日月长。\n拂石坐来春衫冷，踏花归去马蹄香。\n万事前身定，浮生空自忙。\n叫月子规喉舌冷，宿花蝴蝶梦魂香。\n一言不中，千言不用。\n一人传虚，百人传实。\n万金良药，不如无疾。",
        pinyin: "zhēng tā yī jiǎo tún， fǎn shī yī zhǒu yáng。\nlóng guī wǎn dòng yún yóu shī， shè guò chūn shān cǎo mù xiāng。\npíng shēng zhī huì shuō rén duǎn， hé bù huí tóu bǎ jǐ liáng？\njiàn shàn rú bù jí， jiàn è rú tàn tāng。\nrén qióng zhì duǎn， mǎ shòu máo cháng。\nzì jiā xīn lǐ jí， tā rén wèi zhī máng。\npín wú dá shì jiāng jīn zèng， bìng yǒu gāo rén shuō yào fāng。\nchù lái mò yǔ jìng， shì guò xīn qīng liáng。\nqiū lái mǎn shān duō xiù sè， chūn lái wú chù bù huā xiāng。\nfán rén bù kě mào xiāng， hǎi shuǐ bù kě dòu liáng。\nqīng qīng zhī shuǐ wèi tǔ suǒ fáng， jì jì zhī shì wèi jiǔ suǒ shāng。\nhāo cǎo zhī xià huò yǒu lán xiāng， máo cí zhī wū huò yǒu hóu wáng。\nwú xiàn zhū mén shēng è piǎo， jǐ duō bái wū chū gōng qīng。\njiǔ lǐ qián kūn dà， hú zhōng rì yuè cháng。\nfú shí zuò lái chūn shān lěng， tà huā guī qù mǎ tí xiāng。\nwàn shì qián shēn dìng， fú shēng kōng zì máng。\njiào yuè zǐ guī hóu shé lěng， sù huā hú dié mèng hún xiāng。\nyī yán bù zhōng， qiān yán bù yòng。\nyī rén chuán xū， bǎi rén chuán shí。\nwàn jīn liáng yào， bù rú wú jí。",
        translation: "为了争一块小猪肉，反而丢掉了一大块羊肉。龙晚上回到洞里，带来的云还是湿的；麝香兽走过春天的山，草木都跟着香了。有的人一辈子只会说别人的短处，为什么不回头看看自己呢？见到好事要赶紧去学，像怕赶不上一样；见到坏事要赶紧躲开，像手碰到滚烫的水一样。人一穷志气就变小，就像马瘦了毛显得更长。自己心里再急，别人也不知道你在忙什么。穷的时候没有人送金子来，生病了倒有明白人来说药方。别人冒犯你时不要跟他争，事情过去了，心里自然清凉。秋天到了，满山都是好看的景色；春天来了，到处都有花香。看人不能只看外表，海水是不能用斗来量的。清清的河水会被泥土挡住，很多有本事的人却被酒伤害。野草底下也许藏着兰花，茅草屋里也许住着将来的王侯。多少富贵人家出了饿死的人，多少穷苦人家走出了大官。爱喝酒的人觉得酒里的世界很大，壶里的日子很长。坐在石头上觉得春衫发冷，踏着落花回家，马蹄都带着香气。万事好像前世就定好了，人这一辈子白忙一场。夜里啼叫的杜鹃喉咙是冷的，睡在花里的蝴蝶梦中都是香的。一句话说不中，后面一千句话都不用说了。一个人传出假话，一百个人传，假的就变成真的了。再值钱的良药，也不如从来不生病。",
      }
      ],
    },
    {
      title: " · 千里送鹅 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 千里送鹅》意境插画：千里送鹅毛，礼轻情义重。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "千里送鹅毛，礼轻情义重。\n世事如明镜，前程暗似漆。\n君子怀刑，小人怀惠。\n架上碗儿轮流转，媳妇自有做婆时。\n人生一世，如驹过隙。\n良田万顷，日食一升。\n大厦千间，夜眠八尺。\n千经万典，孝义为先。\n天上人间，方便第一。\n一字入公门，九牛拔不出。\n八字衙门向南开，有理无钱莫进来。\n欲求天下事，须用世间财。\n富从升合起，贫因不算来。\n近河不得枉使水，近山不得枉烧柴。\n家无读书子，官从何处来？\n慈不掌兵，义不掌财。\n一夫当关，万夫莫开。\n万事不由人计较，一生都是命安排。\n白云本是无心物，却被清风引出来。\n慢行急行，逆取顺取。",
        pinyin: "qiān lǐ sòng é máo， lǐ qīng qíng yì zhòng。\nshì shì rú míng jìng， qián chéng àn sì qī。\njūn zǐ huái xíng， xiǎo rén huái huì。\njià shàng wǎn ér lún liú zhuǎn， xí fù zì yǒu zuò pó shí。\nrén shēng yī shì， rú jū guò xì。\nliáng tián wàn qǐng， rì shí yī shēng。\ndà shà qiān jiān， yè mián bā chǐ。\nqiān jīng wàn diǎn， xiào yì wèi xiān。\ntiān shàng rén jiān， fāng biàn dì yī。\nyī zì rù gōng mén， jiǔ niú bá bù chū。\nbā zì yá mén xiàng nán kāi， yǒu lǐ wú qián mò jìn lái。\nyù qiú tiān xià shì， xū yòng shì jiān cái。\nfù cóng shēng hé qǐ， pín yīn bù suàn lái。\njìn hé bù dé wǎng shǐ shuǐ， jìn shān bù dé wǎng shāo chái。\njiā wú dú shū zǐ， guān cóng hé chù lái？\ncí bù zhǎng bīng， yì bù zhǎng cái。\nyī fū dāng guān， wàn fū mò kāi。\nwàn shì bù yóu rén jì jiào， yī shēng dōu shì mìng ān pái。\nbái yún běn shì wú xīn wù， què bèi qīng fēng yǐn chū lái。\nmàn xíng jí xíng， nì qǔ shùn qǔ。",
        translation: "从千里外送来一根鹅毛，礼物虽然轻，情义却很重。世间的事像明镜一样看得见，前面的路却像涂了漆一样黑，谁也说不准。君子心里装着规矩法度，小人心里只想着得到好处。架子上的碗轮流着流转，做媳妇的总有当婆婆的那一天。人活一辈子，就像白马跳过一条小缝隙，一下子就过去了。有万顷好田，一天也只能吃一升米；有千间大房子，夜里也只睡八尺长的床。千万种经典书里，都把孝顺和情义放在第一位；天上人间，帮助人、给人方便是头等大事。一个字写进了官府的文书，九头牛也拔不出来。衙门大门朝南开，没有钱，再有理也别进去。想办天下的事情，就得用世上的钱财。富有是一升一斗攒起来的，贫穷是因为不会算计。住在河边不要随便浪费水，住在山边不要随便烧柴。家里没有读书的孩子，官从哪里来呢？太心软的人带不了兵，太讲情义的人管不好钱财。一个人守住关口，一万人也攻不开。很多事不完全由人打算，一生好像都是命安排好的。白云本来是没有心的事物，却被清风引了出来。慢慢走也好，快快走也好；顺着取得的也好，逆着取得的也好，路都得自己走。",
      }
      ],
    },
    {
      title: " · 命中只有 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 命中只有》意境插画：命中只有如许财，丝毫不可有闪失。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "命中只有如许财，丝毫不可有闪失。\n人间私语，天闻若雷。\n暗室亏心，神目如电。\n一毫之恶，劝人莫作。一毫之善，与人方便。\n亏人是祸，饶人是福，天眼恢恢，报应甚速。\n圣贤言语，神钦鬼服。\n人各有心，心各有见。\n口说不如身逢，耳闻不如目见。\n见人富贵生欢喜，莫把心头似火烧。\n养兵千日，用在一时。\n国清才子贵，家富小儿娇。\n利刀割体疮犹使，恶语伤人恨不消。\n公道世间唯白发，贵人头上不曾饶。\n有才堪出众，无衣懒出门。\n为官须作相，及第必争先。\n苗从地发，树由枝分。\n宅里燃火，烟气成云。\n以直报怨，知恩报恩。\n红颜今日虽欺我，白发他时不放君。\n借问酒家何处有，牧童遥指杏花村。",
        pinyin: "mìng zhòng zhǐ yǒu rú xǔ cái， sī háo bù kě yǒu shǎn shī。\nrén jiān sī yǔ， tiān wén ruò léi。\nàn shì kuī xīn， shén mù rú diàn。\nyī háo zhī è， quàn rén mò zuò。 yī háo zhī shàn， yǔ rén fāng biàn。\nkuī rén shì huò， ráo rén shì fú， tiān yǎn huī huī， bào yìng shèn sù。\nshèng xián yán yǔ， shén qīn guǐ fú。\nrén gè yǒu xīn， xīn gè yǒu jiàn。\nkǒu shuō bù rú shēn féng， ěr wén bù rú mù jiàn。\njiàn rén fù guì shēng huān xǐ， mò bǎ xīn tóu sì huǒ shāo。\nyǎng bīng qiān rì， yòng zài yī shí。\nguó qīng cái zǐ guì， jiā fù xiǎo ér jiāo。\nlì dāo gē tǐ chuāng yóu shǐ， è yǔ shāng rén hèn bù xiāo。\ngōng dào shì jiān wéi bái fà， guì rén tóu shàng bù céng ráo。\nyǒu cái kān chū zhòng， wú yī lǎn chū mén。\nwèi guān xū zuò xiāng， jí dì bì zhēng xiān。\nmiáo cóng dì fā， shù yóu zhī fēn。\nzhái lǐ rán huǒ， yān qì chéng yún。\nyǐ zhí bào yuàn， zhī ēn bào ēn。\nhóng yán jīn rì suī qī wǒ， bái fà tā shí bù fàng jūn。\njiè wèn jiǔ jiā hé chù yǒu， mù tóng yáo zhǐ xìng huā cūn。",
        translation: "命里只有这么多钱财，一丝一毫都不能出差错。人在地上悄悄说话，天上听着像打雷一样响；在黑屋子里做了亏心事，神仙的眼睛像闪电一样看得清清楚楚。一丝一毫的坏事，劝人都不要做；一丝一毫的好事，都要去做，给人方便。欺负别人是祸，原谅别人是福；老天的眼睛亮亮的，报应来得飞快。圣贤说的话，神也敬佩，鬼也服气。每个人都有自己的心思，每个人的想法都不一样。听人说不如今亲身碰上，耳朵听见不如亲眼看见。看见别人富贵要真心替他高兴，不要心里像着了火一样难受。养兵一千天，就是为了用在那关键的一时。国家清平的时候读书人才显贵，家里太富小孩子容易娇气。快刀割伤了身体，伤口还能长好；恶毒的话伤了人，心里的恨却消不掉。世上最公道的是白头发，再尊贵的人头上它也照长不误。有才能的人才能出人头地，没有好衣服的人懒得出门。做官就要做到宰相，赶考就要争第一。禾苗从地里长出来，树枝从树干上分出来。屋子里生火，烟气升上去变成了云。别人对不起自己，也要公正地对待他；受人恩惠，就要报答恩情。今天年轻漂亮可以小看我，将来老了，时间可不会放过你。请问哪里有酒家？牧童远远地指着杏花村。",
      }
      ],
    },
    {
      title: " · 父子和而 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 父子和而》意境插画：父子和而家不退，兄弟和而家不分。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "父子和而家不退，兄弟和而家不分。\n一片云间不相识，三千里外却逢君。\n官有公法，民有私约。\n平时不烧香，临时抱佛脚。\n幸生太平无事日，恐防年老不多时。\n国乱思良将，家贫思良妻。\n池塘积水须防旱，田地深耕足养家。\n根深不怕风摇动，树正何愁月影斜。\n争得猫儿，失却牛脚。\n愚者千虑，必有一得，智者千虑，必有一失。\n始吾于人也，听其言而信其行。\n今吾于人也，听其言而观其行。\n哪个梳头无乱发，情人眼里出西施。\n珠沉渊而川媚，玉韫石而山辉。\n夕阳无限好，只恐不多时。\n久旱逢甘霖，他乡遇故知；洞房花烛夜，金榜题名时。\n惜花春起早，爱月夜眠迟。\n掬水月在手，弄花香满衣。\n桃红李白蔷薇紫，问着东君总不知。\n教子教孙须教义，栽桑栽柘少栽花。",
        pinyin: "fù zǐ hé ér jiā bù tuì， xiōng dì hé ér jiā bù fēn。\nyī piàn yún jiān bù xiāng shí， sān qiān lǐ wài què féng jūn。\nguān yǒu gōng fǎ， mín yǒu sī yuē。\npíng shí bù shāo xiāng， lín shí bào fó jiǎo。\nxìng shēng tài píng wú shì rì， kǒng fáng nián lǎo bù duō shí。\nguó luàn sī liáng jiàng， jiā pín sī liáng qī。\nchí táng jī shuǐ xū fáng hàn， tián dì shēn gēng zú yǎng jiā。\ngēn shēn bù pà fēng yáo dòng， shù zhèng hé chóu yuè yǐng xié。\nzhēng dé māo ér， shī què niú jiǎo。\nyú zhě qiān lǜ， bì yǒu yī dé， zhì zhě qiān lǜ， bì yǒu yī shī。\nshǐ wú yú rén yě， tīng qí yán ér xìn qí xíng。\njīn wú yú rén yě， tīng qí yán ér guān qí xíng。\nnǎ gè shū tóu wú luàn fā， qíng rén yǎn lǐ chū xī shī。\nzhū chén yuān ér chuān mèi， yù yùn shí ér shān huī。\nxī yáng wú xiàn hǎo， zhī kǒng bù duō shí。\njiǔ hàn féng gān lín， tā xiāng yù gù zhī； dòng fáng huā zhú yè， jīn bǎng tí míng shí。\nxī huā chūn qǐ zǎo， ài yuè yè mián chí。\njū shuǐ yuè zài shǒu， nòng huā xiāng mǎn yī。\ntáo hóng lǐ bái qiáng wēi zǐ， wèn zhe dōng jūn zǒng bù zhī。\njiào zǐ jiào sūn xū jiào yì， zāi sāng zāi zhè shǎo zāi huā。",
        translation: "父子和和气气，家业就不会衰败；兄弟和和气气，家就不会分开。在同一片云下不曾相识，隔着三千里路却遇见了你。官府有公家的法律，百姓有私下的约定。平时不烧香，急了才抱佛脚。有幸生在太平无事的年月，也要当心年老的好日子不会太久。国家乱了才想念好将军，家里穷了才想念好妻子。池塘里蓄满水，防着天旱；田地耕得深，足够养活一家人。根扎得深，不怕大风吹；树干长得正，不怕月下影子歪。为了一只小猫争来争去，结果丢了一头牛。愚笨的人想一千次，总有一次想得对；聪明的人想一千次，也总有一次想错。从前我对人，听他说什么就相信他会怎么做；如今我对人，听他说什么，还要看他实际做得怎么样。哪个梳头的没有乱头发？相爱的人眼里，对方总是最美的。珍珠沉在深水里，河水更显得美；美玉藏在石头里，整座山都有了光彩。夕阳无限美好，只怕好不了多久了。大旱天碰到一场好雨，在异地遇到老朋友，办喜事的花烛之夜，考中金榜题名——这些都是人间顶高兴的事。爱花的人春天起得早，爱月亮的人夜里睡得晚。捧起一捧水，月亮就在手里；摆弄一阵花，香气沾满衣裳。桃花红、李花白、蔷薇紫，问司春的神这是为什么，它也答不上来。教训儿孙要教他们道义，种树要多种有用的桑树柘树，少种只好看的花。",
      }
      ],
    },
    {
      title: " · 休念故乡 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 休念故乡》意境插画：休念故乡生处好，受恩深处便为家。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "休念故乡生处好，受恩深处便为家。\n学在一人之下，用在万人之上。\n一日为师，终生为父。\n忘恩负义，禽兽之徒。\n劝君莫将油炒菜，留与儿孙夜读书。\n书中自有千锺粟，书中自有颜如玉。\n莫怨天来莫怨人，五行八字命生成。\n莫怨自己穷，穷要穷得干净；莫羡他人富，富要富得清高。\n别人骑马我骑驴，仔细思量我不如，\n待我回头看，还有挑脚汉。\n路上有饥人，家中有剩饭。\n积德与儿孙，要广行方便。\n作善鬼神钦，作恶遭天遣。\n积钱积谷不如积德，买田买地不如买书。\n一日春工十日粮，十日春工半年粮。\n疏懒人没吃，勤俭粮满仓。\n人亲财不亲，财利要分清。\n十分伶俐使七分，常留三分与儿孙，\n若要十分都使尽，远在儿孙近在身。\n君子乐得做君子，小人枉自做小人。",
        pinyin: "xiū niàn gù xiāng shēng chù hǎo， shòu ēn shēn chù biàn wèi jiā。\nxué zài yī rén zhī xià， yòng zài wàn rén zhī shàng。\nyī rì wèi shī， zhōng shēng wèi fù。\nwàng ēn fù yì， qín shòu zhī tú。\nquàn jūn mò jiāng yóu chǎo cài， liú yǔ ér sūn yè dú shū。\nshū zhōng zì yǒu qiān zhōng sù， shū zhōng zì yǒu yán rú yù。\nmò yuàn tiān lái mò yuàn rén， wǔ háng bā zì mìng shēng chéng。\nmò yuàn zì jǐ qióng， qióng yào qióng dé gān jìng； mò xiàn tā rén fù， fù yào fù dé qīng gāo。\nbié rén qí mǎ wǒ qí lǘ， zǐ xì sī liang wǒ bù rú，\ndài wǒ huí tóu kàn， hái yǒu tiāo jiǎo hàn。\nlù shang yǒu jī rén， jiā zhōng yǒu shèng fàn。\njī dé yǔ ér sūn， yào guǎng xíng fāng biàn。\nzuò shàn guǐ shén qīn， zuò è zāo tiān qiǎn。\njī qián jī gǔ bù rú jī dé， mǎi tián mǎi dì bù rú mǎi shū。\nyī rì chūn gōng shí rì liáng， shí rì chūn gōng bàn nián liáng。\nshū lǎn rén méi chī， qín jiǎn liáng mǎn cāng。\nrén qīn cái bù qīn， cái lì yào fēn qīng。\nshí fēn líng lì shǐ qī fēn， cháng liú sān fēn yǔ ér sūn，\nruò yào shí fēn dōu shǐ jìn， yuǎn zài ér sūn jìn zài shēn。\njūn zǐ lè dé zuò jūn zǐ， xiǎo rén wǎng zì zuò xiǎo rén。",
        translation: "不要总念着家乡好，哪里受人恩惠多，哪里就是家。学问跟一个人学，本事用到千万人身上。哪怕只当过一天老师，也要一辈子像尊敬父亲一样尊敬他。忘了别人的恩、辜负别人的义，就跟禽兽一样。劝你不要把灯油都拿去炒菜，留给儿孙夜里读书点灯用。书读好了，自然有用不完的粮食，也有美好的前程。不要怨天也不要怨人，一切都像是生来注定的。不要抱怨自己穷，穷也要穷得干干净净；不要羡慕别人富，富也要富得清清白白。别人骑马我骑驴，仔细想想我是不如人家；可等我回头看，后面还有挑着担子赶路的人呢。路上有挨饿的人，家里有剩饭就分给他。给儿孙积德，就要多帮人做好事。做好事，鬼神都敬佩；做坏事，要遭上天惩罚。攒钱攒粮不如积德，买田买地不如买书。春天干一天农活，能顶十天的口粮；干十天的农活，能顶半年的口粮。又懒又不节俭的人没饭吃，勤劳节俭的人粮食满仓。人再亲，钱财也要分得清清楚楚。十分聪明只用七分，常留三分给儿孙；要是十分全用光，近了自己遭殃，远了害了儿孙。君子高高兴兴地做君子，小人白白忙活做小人。",
      }
      ],
    },
    {
      title: " · 好学者则 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 好学者则》意境插画：好学者则庶民之子为公卿，不好学者则公卿之子为庶民。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "好学者则庶民之子为公卿，不好学者则公卿之子为庶民。\n惜钱莫教子，护短莫从师。\n记得旧文章，便是新举子。\n人在家中坐，祸从天上落。\n但求心无愧，不怕有后灾。\n只有和气去迎人，哪有相打得太平。\n忠厚自有忠厚报，豪强一定受官刑。\n人到公门正好修，留些阴德在后头。\n为人何必争高下，一旦无命万事休。\n山高不算高，人心比天高。\n白水变酒卖，还嫌猪无糟。\n贫寒休要怨，宝贵不须骄。\n善恶随人作，祸福自己招。\n奉劝君子，各宜守己。\n只此呈示，万无一失。",
        pinyin: "hào xué zhě zé shù mín zhī zǐ wèi gōng qīng， bù hào xué zhě zé gōng qīng zhī zǐ wèi shù mín。\nxī qián mò jiào zǐ， hù duǎn mò cóng shī。\njì de jiù wén zhāng， biàn shì xīn jǔ zǐ。\nrén zài jiā zhōng zuò， huò cóng tiān shàng luò。\ndàn qiú xīn wú kuì， bù pà yǒu hòu zāi。\nzhǐ yǒu hé qì qù yíng rén， nǎ yǒu xiāng dǎ dé tài píng。\nzhōng hòu zì yǒu zhōng hòu bào， háo qiáng yī dìng shòu guān xíng。\nrén dào gōng mén zhèng hǎo xiū， liú xiē yīn dé zài hòu tou。\nwèi rén hé bì zhēng gāo xià， yī dàn wú mìng wàn shì xiū。\nshān gāo bù suàn gāo， rén xīn bǐ tiān gāo。\nbái shuǐ biàn jiǔ mài， hái xián zhū wú zāo。\npín hán xiū yào yuàn， bǎo guì bù xū jiāo。\nshàn è suí rén zuò， huò fú zì jǐ zhāo。\nfèng quàn jūn zǐ， gè yí shǒu jǐ。\nzhī cǐ chéng shì， wàn wú yī shī。",
        translation: "爱读书的人，普通人家的孩子也能当上大官；不爱读书的人，大官家的孩子也会变成普通人。舍不得花钱，就别教孩子；总护短的，就别拜老师。记熟了前人的文章，就能考中新的举人。人坐在家里，灾祸也可能从天上掉下来。只要问心无愧，就不怕将来再有灾祸。只有和和气气待人，哪有打来打去还能太平的。忠厚老实自有忠厚的回报，横行霸道的人一定受官府惩罚。人进了官府做事，正好多做好事，给以后留些德。做人何必争高比低，一旦没了性命，什么事都完了。山高不算真的高，人的心思比天还高。把白水当酒卖，还嫌没有酒糟喂猪，这就是贪心。贫寒不要抱怨，富贵不要骄傲。好事坏事都是自己做的，灾祸福气都是自己招来的。奉劝各位正人君子，各自安分守己。照这些话去做，就万无一失。",
      }
      ],
    },
    {
      title: " · 前人俗语 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 前人俗语》意境插画：前人俗语，言浅理深。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "前人俗语，言浅理深。\n补遗增广，集成书文。\n世上无难事，只怕不专心。\n成人不自在，自在不成人；\n金凭火炼方知色，与人交财便知心。\n乞丐无粮，懒惰而成。\n勤俭为无价之宝，节粮乃众妙之门。\n省事俭用，免得求人。\n量大祸不在，机深祸亦深。\n善为至宝深深用，心作良田世世耕。\n群居防口，独坐防心。\n体无病为富贵，身平安莫怨贫。\n败家子弟挥金如土，贫家子弟积土成金。\n富贵非关天地，祸福不是鬼神。\n安分贫一时，本分终不贫。\n不拜父母拜干亲，弟兄不和结外人。\n人过留名，雁过留声。\n择子莫择父，择亲莫择邻。\n爱妻之心是主，爱子之心是亲。\n事从根起，藕叶连心。",
        pinyin: "qián rén sú yǔ， yán qiǎn lǐ shēn。\nbǔ yí zēng guǎng， jí chéng shū wén。\nshì shàng wú nán shì， zhǐ pà bù zhuān xīn。\nchéng rén bù zì zài， zì zài bù chéng rén；\njīn píng huǒ liàn fāng zhī sè， yǔ rén jiāo cái biàn zhī xīn。\nqǐ gài wú liáng， lǎn duò ér chéng。\nqín jiǎn wèi wú jià zhī bǎo， jié liáng nǎi zhòng miào zhī mén。\nshěng shì jiǎn yòng， miǎn de qiú rén。\nliáng dà huò bù zài， jī shēn huò yì shēn。\nshàn wèi zhì bǎo shēn shēn yòng， xīn zuò liáng tián shì shì gēng。\nqún jū fáng kǒu， dú zuò fáng xīn。\ntǐ wú bìng wèi fù guì， shēn píng ān mò yuàn pín。\nbài jiā zǐ dì huī jīn rú tǔ， pín jiā zǐ dì jī tǔ chéng jīn。\nfù guì fēi guān tiān dì， huò fú bù shì guǐ shén。\nān fèn pín yī shí， běn fèn zhōng bù pín。\nbù bài fù mǔ bài gān qīn， dì xiong bù hé jié wài rén。\nrén guò liú míng， yàn guò liú shēng。\nzé zǐ mò zé fù， zé qīn mò zé lín。\nài qī zhī xīn shì zhǔ， ài zǐ zhī xīn shì qīn。\nshì cóng gēn qǐ， ǒu yè lián xīn。",
        translation: "前人留下的俗话，话虽说得浅，道理却很深。把这些话补上遗漏、加以扩充，编成了一本书。世上没有难办的事，只怕人不专心。要成大器就不能贪图舒服，贪图舒服就成不了大器。金子要经过火炼才知道成色，和人打交道、经手钱财才能看清人心。乞丐没饭吃，是懒惰造成的。勤劳节俭是无价之宝，省吃俭用是各种好办法的门路。少惹事、省着用，就不用去求人。度量大的人不会有大的灾祸，心机太深的人灾祸也深。善良是最宝贵的宝贝，要好好地用；把心当作良田，世世代代耕耘。和大家在一起要管住嘴，一个人独处要管住心。身上没病就是富贵，平平安安就不要抱怨穷。败家的子弟花钱像撒土，穷家的子弟一点一点攒成金。富贵不是天地注定的，祸福也不是鬼神安排的。安分守己也许穷一阵子，本本分分终究不会一直穷。不敬父母却去拜干爹干妈，兄弟不和却去结交外人。人走过要留下好名声，大雁飞过还要留下叫声呢。儿子没法挑选父亲，娶亲嫁女不必挑选邻居。疼爱妻子的心是一家之主，疼爱儿女的心是天生的骨肉亲情。事情都有根由，就像藕的叶子和心是连在一起的。",
      }
      ],
    },
    {
      title: " · 祸与福同 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 祸与福同》意境插画：祸与福同门，利与害同城。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "祸与福同门，利与害同城。\n清酒红人脸，财帛动人心！\n宁可荤口念佛，不可素口骂人。\n有钱能说话，无钱话不灵。\n岂能尽如人意？但求不愧吾心。\n不说自己井绳短，反说他人箍井深。\n恩爱多生病，无钱便觉贫。\n只学斟酒意，莫学下棋心。\n孝莫假意，转眼便为人父母。\n善休望报，回头只看汝儿孙！\n口开神气散，舌出是非生！\n弹琴费指甲，说话费精神。\n千贯买田，万贯结邻。\n人言未必犹尽，听话只听三分。\n隔壁岂无耳，窗外岂无人？\n财可养生须注意，事不关己不劳心。\n酒不护贤，色不护病；\n财不护亲，气不护命！\n一日不可无常业，安闲便易起邪心！\n炎凉世态，富贵更甚于贫贱；",
        pinyin: "huò yǔ fú tóng mén， lì yǔ hài tóng chéng。\nqīng jiǔ hóng rén liǎn， cái bó dòng rén xīn！\nnìng kě hūn kǒu niàn fó， bù kě sù kǒu mà rén。\nyǒu qián néng shuō huà， wú qián huà bù líng。\nqǐ néng jìn rú rén yì？ dàn qiú bù kuì wú xīn。\nbù shuō zì jǐ jǐng shéng duǎn， fǎn shuō tā rén gū jǐng shēn。\nēn ài duō shēng bìng， wú qián biàn jué pín。\nzhī xué zhēn jiǔ yì， mò xué xià qí xīn。\nxiào mò jiǎ yì， zhuǎn yǎn biàn wèi rén fù mǔ。\nshàn xiū wàng bào， huí tóu zhī kàn rǔ ér sūn！\nkǒu kāi shén qì sàn， shé chū shì fēi shēng！\ntán qín fèi zhǐ jiǎ， shuō huà fèi jīng shén。\nqiān guàn mǎi tián， wàn guàn jié lín。\nrén yán wèi bì yóu jìn， tīng huà zhī tīng sān fēn。\ngé bì qǐ wú ěr， chuāng wài qǐ wú rén？\ncái kě yǎng shēng xū zhù yì， shì bù guān jǐ bù láo xīn。\njiǔ bù hù xián， sè bù hù bìng；\ncái bù hù qīn， qì bù hù mìng！\nyī rì bù kě wú cháng yè， ān xián biàn yì qǐ xié xīn！\nyán liáng shì tài， fù guì gèng shèn yú pín jiàn；",
        translation: "祸和福出在同一个门里，利和害住在同一座城里，它们常常连在一起。好酒喝了会红人脸，钱财见了会动人心。宁可吃着荤菜念佛，也不要吃着素菜骂人。有钱的时候说话有人听，没钱的时候说什么都不灵。事情哪能件件都称心？只求自己问心无愧。不说自己的井绳短，反倒说别人家的井太深。恩爱太深操心多，容易生病；没有钱，就觉出穷来。只学给人斟酒的殷勤，别学下棋争输赢的心。孝顺不要装样子，转眼你也会做父母；行善不要指望报答，回头看看你的儿孙就知道了。嘴张得太大，精神就散了；舌头伸出太长，是非就来了。弹琴费指甲，说话费精神。花一千贯买田地，花一万贯也要挑个好邻居。别人的话不一定都对，听个三分就好。隔壁哪会没有耳朵？窗外哪会没有人？钱财能养活人，用的时候要当心；和自己不相干的事，不必太劳心。酒护不住贤德，好色护不住身体；钱财护不住亲人，动气护不住性命。人不能一天没有正经事做，太闲了容易起坏念头。世态的冷冷热热，人富贵的时候比贫贱的时候看得更清楚。",
      }
      ],
    },
    {
      title: " · 嫉妒人心 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 嫉妒人心》意境插画：嫉妒人心，骨肉更甚于外人！——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "嫉妒人心，骨肉更甚于外人！\n瓜熟蒂落，水到渠成。\n人情送匹马，买卖不饶针！\n过头饭好吃，过头话难听！\n事多累了自己，田多养了众人。\n怕事忍事不生事自然无事；\n平心静心不欺心何等放心！\n天子至尊不过于理，在理良心天下通行。\n好话不在多说，有理不在高声！\n一朝权在手，便把令来行。\n甘草味甜人可食，巧言妄语不可听。\n当场不论，过后枉然。\n贫莫与富斗，富莫与官争！\n官清难逃猾吏手，衙门少有念佛人！\n家有千口，主事一人。\n父子竭力山成玉，弟兄同心土变金。\n当事者迷，旁观者清。\n怪人不知理，知理不怪人。\n未富先富终不富，未贫先贫终不贫。\n少当少取，少输当赢！",
        pinyin: "jí dù rén xīn， gǔ ròu gèng shèn yú wài rén！\nguā shú dì luò， shuǐ dào qú chéng。\nrén qíng sòng pǐ mǎ， mǎi mài bù ráo zhēn！\nguò tóu fàn hǎo chī， guò tóu huà nán tīng！\nshì duō lèi le zì jǐ， tián duō yǎng le zhòng rén。\npà shì rěn shì bù shēng shì zì rán wú shì；\npíng xīn jìng xīn bù qī xīn hé děng fàng xīn！\ntiān zǐ zhì zūn bù guò yú lǐ， zài lǐ liáng xīn tiān xià tōng xíng。\nhǎo huà bù zài duō shuō， yǒu lǐ bù zài gāo shēng！\nyī cháo quán zài shǒu， biàn bǎ lìng lái xíng。\ngān cǎo wèi tián rén kě shí， qiǎo yán wàng yǔ bù kě tīng。\ndāng chǎng bù lùn， guò hòu wǎng rán。\npín mò yǔ fù dòu， fù mò yǔ guān zhēng！\nguān qīng nán táo huá lì shǒu， yá mén shǎo yǒu niàn fó rén！\njiā yǒu qiān kǒu， zhǔ shì yī rén。\nfù zǐ jié lì shān chéng yù， dì xiong tóng xīn tǔ biàn jīn。\ndāng shì zhě mí， páng guān zhě qīng。\nguài rén bù zhī lǐ， zhī lǐ bù guài rén。\nwèi fù xiān fù zhōng bù fù， wèi pín xiān pín zhōng bù pín。\nshǎo dāng shǎo qǔ， shǎo shū dāng yíng！",
        translation: "嫉妒人的心，亲骨肉之间比外人之间还要厉害。瓜熟了，蒂自然就落；水流到了，渠自然就成。送人情的时候，大方得能送出一匹马；做买卖的时候，一根针也不肯让。饭煮过头了还能吃，话说过头了就难听了。事情管得太多，累的是自己；田地多了，倒能养活众人。怕事、忍事、不惹事，自然没事；平心、静心、不欺心，多么安心。天子再尊贵也不能不讲理，讲理、凭良心，天下都通行。好话不在说得多，有理不用嗓门高。一朝大权在手，就开始发号施令。甘草味甜，人人可以吃；花言巧语、胡说八道，可不能听。当时不讲清道理，过后再说也是白说。穷人不要和富人斗，富人不要和官府争。官再清廉，也难躲过狡猾小吏的手；衙门里很少有念经行善的人。家里有上千口人，主事的也只能是一个人。父子齐心尽力，石头也能变成玉；兄弟一条心，泥土也能变成金。当事的人糊涂，旁边看的人清楚。乱怪人的人不懂道理，懂道理的人不乱怪人。还没富就先摆阔，终究富不了；还没穷就先省着，终究穷不了。该少拿的就少拿，把少输当作赢。",
      }
      ],
    },
    {
      title: " · 饱暖思淫 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 饱暖思淫》意境插画：饱暖思淫欲，饥寒起盗心！——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "饱暖思淫欲，饥寒起盗心！\n蚊虫遭扇打，只因嘴伤人！\n欲多伤神，财多累心！\n布衣得暖真为福，千金平安即是春。\n家贫出孝子，国乱显忠臣！\n宁做太平犬，莫做离乱人！\n人有几等，官有几品。\n理不卫亲，法不为民。\n自重者然后人重，人轻者便是自轻。\n自身不谨，扰乱四邻。\n快意事过非快意，自古败名因败事。\n伤身事莫做，伤心话莫说。\n小人肥口，君子肥身。\n地不生无名之辈，天不生无路之人。\n一苗露水一苗草，一朝天子一朝臣。\n读未见书，如得良友；见已读书，如逢故人。\n福满须防有祸，凶多料必无争。\n不怕三十而死，只怕死后无名。\n但知江湖者，都是薄命人。\n不怕方中打死人，只知方中无好人。",
        pinyin: "bǎo nuǎn sī yín yù， jī hán qǐ dào xīn！\nwén chóng zāo shàn dǎ， zhī yīn zuǐ shāng rén！\nyù duō shāng shén， cái duō lèi xīn！\nbù yī dé nuǎn zhēn wèi fú， qiān jīn píng ān jí shì chūn。\njiā pín chū xiào zǐ， guó luàn xiǎn zhōng chén！\nníng zuò tài píng quǎn， mò zuò lí luàn rén！\nrén yǒu jǐ děng， guān yǒu jǐ pǐn。\nlǐ bù wèi qīn， fǎ bù wèi mín。\nzì zhòng zhě rán hòu rén zhòng， rén qīng zhě biàn shì zì qīng。\nzì shēn bù jǐn， rǎo luàn sì lín。\nkuài yì shì guò fēi kuài yì， zì gǔ bài míng yīn bài shì。\nshāng shēn shì mò zuò， shāng xīn huà mò shuō。\nxiǎo rén féi kǒu， jūn zǐ féi shēn。\ndì bù shēng wú míng zhī bèi， tiān bù shēng wú lù zhī rén。\nyī miáo lù shuǐ yī miáo cǎo， yī cháo tiān zǐ yī cháo chén。\ndú wèi jiàn shū， rú dé liáng yǒu； jiàn yǐ dú shū， rú féng gù rén。\nfú mǎn xū fáng yǒu huò， xiōng duō liào bì wú zhēng。\nbù pà sān shí ér sǐ， zhǐ pà sǐ hòu wú míng。\ndàn zhī jiāng hú zhě， dōu shì bó mìng rén。\nbù pà fāng zhōng dǎ sǐ rén， zhī zhī fāng zhōng wú hǎo rén。",
        translation: "吃得饱穿得暖了，容易生出不好的念头；又冷又饿的时候，容易起偷东西的心。蚊子挨扇子打，只因为它那张嘴专门伤人。欲望太多伤精神，钱财太多累人心。粗布衣服穿得暖，就是真福气；一家人平平安安，比千金还珍贵。家里穷，才显出孝子；国家乱，才看得出忠臣。宁可做太平年月的狗，也不做战乱年月的人。人分好几等，官分好几品。道理有时护不住自家的亲人，法律有时也顾不上百姓。自己先尊重自己，别人才会尊重你；被人看轻，往往是自己先看轻了自己。自己行为不检点，就会搅得四邻不安。只图一时痛快的事，过后就不痛快了；自古以来，坏名声都是坏事情带来的。伤身体的事不要做，伤人心的话不要说。小人只顾嘴上痛快，君子注重修养自身。大地上不会生出无名无姓的人，老天爷不会断绝任何人的路。一滴露水养一棵草，一个天子换一朝臣子。读一本没读过的书，像得到一位好朋友；重读读过的书，像遇见老朋友。福气太满的时候要提防有祸，凶险多的时候自然也没人来争。不怕三十岁就死，只怕死后留下坏名声。懂得江湖深浅的人，都是吃过苦头、命途坎坷的人。不怕道门里闹出人命，只说道门里没有一个好人。",
      }
      ],
    },
    {
      title: " · 说长说短 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 说长说短》意境插画：说长说短，宁说人长莫说短；——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "说长说短，宁说人长莫说短；\n施恩施怨，宁施人恩莫施怨。\n育林养虎，虎大伤人。\n冤家抱头死，事要解交人。\n卷帘归乳燕，开扇出苍蝇。\n爱鼠常留饭，怜蛾灯罩纱。\n人命在天，物命在人。\n奸不通父母，贼不通地邻。\n盗贼多出赌博，人命常出奸情。\n治国信谗必杀忠臣，治家信谗必疏其亲。\n治国不用佞臣，治家不用佞妇。\n好臣一国之宝，好妇一家之珍。\n稳的不滚，滚的不稳。\n儿不嫌母丑，狗不嫌家贫。\n君子千钱不计较，小人一钱恼人心。\n人前显贵，闹里夺争。\n要知江湖深，一个不做声。\n知止自当出妄想，安贫须是禁奢心。\n初入行业，三年事成；\n初吃馒头，三年口生。",
        pinyin: "shuō cháng shuō duǎn， níng shuō rén cháng mò shuō duǎn；\nshī ēn shī yuàn， níng shī rén ēn mò shī yuàn。\nyù lín yǎng hǔ， hǔ dà shāng rén。\nyuān jiā bào tóu sǐ， shì yào jiě jiāo rén。\njuàn lián guī rǔ yàn， kāi shàn chū cāng yíng。\nài shǔ cháng liú fàn， lián é dēng zhào shā。\nrén mìng zài tiān， wù mìng zài rén。\njiān bù tōng fù mǔ， zéi bù tōng dì lín。\ndào zéi duō chū dǔ bó， rén mìng cháng chū jiān qíng。\nzhì guó xìn chán bì shā zhōng chén， zhì jiā xìn chán bì shū qí qīn。\nzhì guó bù yòng nìng chén， zhì jiā bù yòng nìng fù。\nhǎo chén yī guó zhī bǎo， hǎo fù yī jiā zhī zhēn。\nwěn de bù gǔn， gǔn de bù wěn。\nér bù xián mǔ chǒu， gǒu bù xián jiā pín。\njūn zǐ qiān qián bù jì jiào， xiǎo rén yī qián nǎo rén xīn。\nrén qián xiǎn guì， nào lǐ duó zhēng。\nyào zhī jiāng hú shēn， yī gè bù zuò shēng。\nzhī zhǐ zì dāng chū wàng xiǎng， ān pín xū shì jìn shē xīn。\nchū rù háng yè， sān nián shì chéng；\nchū chī mán tou， sān nián kǒu shēng。",
        translation: "议论别人时，宁可说人家的长处，不要说短处；对待别人时，宁可给人恩惠，不要结怨。养大一只老虎，老虎长大要伤人。冤仇不解，会闹得两败俱伤；有了过节，要请明白人来解开。卷起帘子，放小燕子飞回去；打开扇子，把苍蝇赶出去。疼爱老鼠，常给它留点饭；可怜飞蛾，给灯罩上一层纱。人的寿命由天定，小动物的命在人手里。做坏事的不敢让父母知道，做贼的不敢让邻居知道。做强盗的多半因为赌钱，闹出人命的常因为奸情。治国的人听信坏话，一定会害死忠臣；治家的人听信坏话，一定会疏远亲人。治国不要用奸臣，治家不要用奸诈的媳妇。好大臣是一国的宝贝，好媳妇是一家的珍宝。放得稳的东西不滚，会滚的东西放不稳。儿子不嫌母亲丑，狗不嫌家里穷。君子丢了一千个钱也不计较，小人丢一个钱就气得不行。在人前显富贵，在热闹处争高低。要想知道江湖水有多深，先学会不吭声。知道满足，就不会胡思乱想；安于贫穷，就要管住奢侈的心。刚入一行，要三年才能学好本事；就像刚学吃馒头，三年都吃不利索。",
      }
      ],
    },
    {
      title: " · 家无生活 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 家无生活》意境插画：家无生活计，坐吃如山崩。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "家无生活计，坐吃如山崩。\n家有良田万顷，不如薄艺在身；\n艺多不养家，食多嚼不赢。\n命中只有八合米，走遍天下不满升。\n使心用心，反害自身。\n国家无空地，世上无闲人。\n妙药难医怨逆病，混财不富穷命人。\n耽误一年春，十年补不清；\n人能处处能，草能处处生。\n会打三班鼓，也要几个人。\n人不走不亲，水不打不浑。\n三贫三富不到老，十年兴败多少人！\n买货买得真，折本折得轻；\n不怕问到，只怕倒问。\n人强不如货强，价高不如口便。\n会买买怕人，会卖卖怕人。\n只只船上有梢公，天子足下有贫亲。\n既知莫望，不知莫向。\n在一行，练一行；\n穷莫失志，富莫癫狂。",
        pinyin: "jiā wú shēng huó jì， zuò chī rú shān bēng。\njiā yǒu liáng tián wàn qǐng， bù rú báo yì zài shēn；\nyì duō bù yǎng jiā， shí duō jiáo bù yíng。\nmìng zhòng zhǐ yǒu bā hé mǐ， zǒu biàn tiān xià bù mǎn shēng。\nshǐ xīn yòng xīn， fǎn hài zì shēn。\nguó jiā wú kòng dì， shì shàng wú xián rén。\nmiào yào nán yī yuàn nì bìng， hùn cái bù fù qióng mìng rén。\ndān wù yī nián chūn， shí nián bǔ bù qīng；\nrén néng chù chù néng， cǎo néng chù chù shēng。\nhuì dǎ sān bān gǔ， yě yào jǐ gè rén。\nrén bù zǒu bù qīn， shuǐ bù dǎ bù hún。\nsān pín sān fù bù dào lǎo， shí nián xīng bài duō shǎo rén！\nmǎi huò mǎi dé zhēn， zhé běn zhé dé qīng；\nbù pà wèn dào， zhǐ pà dǎo wèn。\nrén qiáng bù rú huò qiáng， jià gāo bù rú kǒu biàn。\nhuì mǎi mǎi pà rén， huì mài mài pà rén。\nzhī zhī chuán shàng yǒu shāo gōng， tiān zǐ zú xià yǒu pín qīn。\njì zhī mò wàng， bù zhī mò xiàng。\nzài yī háng， liàn yī háng；\nqióng mò shī zhì， fù mò diān kuáng。",
        translation: "家里没有谋生的活路，坐吃山空就像山崩一样快。家里有万顷良田，不如身上有一门手艺；可手艺学得太多太杂，反而养不了家，就像东西吃太多嚼不过来。命里只有八合米，走遍天下也凑不满一升。玩心眼算计别人，反而害了自己。国家没有一块空地，世上不该有闲着的人。再好的药也难治心里的怨恨，意外得来的钱财富不了命里受穷的人。耽误了一年的春天，十年也补不回来；有本事的人到哪里都能行，就像草到哪里都能生长。会打三班鼓，也要好几个人配合。人常走动才亲近，水常搅动才会浑。人一辈子穷了又富、富了又穷，十年之间不知多少人起起落落。买东西买到真货，亏本也亏得少。不怕人家来问自己，就怕自己反过来问人家。人能干不如货好，价开得高不如嘴上会说。会买的买家让卖家发怵，会卖的卖家让买家发怵。条条船上都得有艄公，天子脚下也有穷亲戚。知道不可能的就别再指望，不清楚的就别瞎张望。干一行，就把这一行练精；穷的时候不要丢了志气，富的时候不要得意发狂。",
      }
      ],
    },
    {
      title: " · 天欲令其 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 天欲令其》意境插画：天欲令其灭亡，必先让其疯狂。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "天欲令其灭亡，必先让其疯狂。\n梢长人胆大，梢短人心慌。\n隔行莫贪利，久炼必成钢。\n瓶花虽好艳，相看不耐长。\n早起三光，迟起三慌。\n未来休指望，过去莫思量；\n时来遇好友，病去遇良方。\n布得春风有夏雨，哈得秋风大家凉。\n晴带雨伞，饱带饥粮。\n满壶全不响，半壶响叮当。\n久利之事莫为，众争之地莫往。\n老医迷旧疾，朽药误良方；\n该在水中死，不在岸上亡。\n舍财不如少取，施药不如传方。\n倒了城墙丑了县官，打了梅香丑了姑娘。\n燕子不进愁门，耗子不钻空仓。\n苍蝇不叮无缝蛋，谣言不找谨慎人。\n一人舍死，万人难当。\n人争一口气，佛争一炷香。\n门为小人而设，锁乃君子之防。",
        pinyin: "tiān yù lìng qí miè wáng， bì xiān ràng qí fēng kuáng。\nshāo cháng rén dǎn dà， shāo duǎn rén xīn huāng。\ngé háng mò tān lì， jiǔ liàn bì chéng gāng。\npíng huā suī hǎo yàn， xiāng kàn bù nài cháng。\nzǎo qǐ sān guāng， chí qǐ sān huāng。\nwèi lái xiū zhǐ wàng， guò qù mò sī liang；\nshí lái yù hǎo yǒu， bìng qù yù liáng fāng。\nbù dé chūn fēng yǒu xià yǔ， hā dé qiū fēng dà jiā liáng。\nqíng dài yǔ sǎn， bǎo dài jī liáng。\nmǎn hú quán bù xiǎng， bàn hú xiǎng dīng dāng。\njiǔ lì zhī shì mò wèi， zhòng zhēng zhī dì mò wǎng。\nlǎo yī mí jiù jí， xiǔ yào wù liáng fāng；\ngāi zài shuǐ zhōng sǐ， bù zài àn shàng wáng。\nshè cái bù rú shǎo qǔ， shī yào bù rú chuán fāng。\ndǎo le chéng qiáng chǒu le xiàn guān， dǎ le méi xiāng chǒu le gū niáng。\nyàn zi bù jìn chóu mén， hào zǐ bù zuàn kōng cāng。\ncāng yíng bù dīng wú fèng dàn， yáo yán bù zhǎo jǐn shèn rén。\nyī rén shè sǐ， wàn rén nán dāng。\nrén zhēng yī kǒu qì， fó zhēng yī zhù xiāng。\nmén wèi xiǎo rén ér shè， suǒ nǎi jūn zǐ zhī fáng。",
        translation: "上天要叫一个人灭亡，会先让他疯狂。船桨长，撑船人就胆大；船桨短，撑船人就心慌。不要贪别的行当的便宜，在本行里久练一定成精钢。瓶子里的花虽然艳丽，看着看着就谢了。起得早，能把几件事都办得亮亮堂堂；起得晚，就手忙脚乱。还没来的事别空指望，过去的事别老惦记。时运来了遇到好朋友，病好了遇到好药方。春天肯给人送暖风，夏天就有好雨来回报；轻轻哈出一口秋风，大家都跟着凉快。晴天带好雨伞，吃饱带上干粮。满壶的水不响，半壶的水响叮当。长久都赚钱的事不要去做，大家争抢的地方不要去凑。老医生也会被老毛病难住，变质的药会误了好药方。命里该在水里遇险的，就不会死在岸上。舍掉钱财不如少占便宜，送人药不如把药方传给人。城墙倒了，县官脸上无光；打了丫环，小姐也没脸。燕子不进整天发愁人家的门，耗子不钻空空的仓。苍蝇不叮没有缝的鸡蛋，谣言不找行得正的人。一个人豁出性命，一万人也挡不住。人活着就争一口气，佛也争一炷香。门是为防小人设的，锁是提醒君子要防备的。",
      }
      ],
    },
    {
      title: " · 舌咬只为 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 舌咬只为》意境插画：舌咬只为揉，齿落皆因眶。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "舌咬只为揉，齿落皆因眶。\n硬弩弦先断，钢刀刃自伤。\n贼名难受，龟名难当。\n好事他人未见讲，错处他偏说得长。\n男子无志纯铁无钢，女子无志烂草无瓤。\n生男欲得成龙犹恐成獐，生女欲得成凤犹恐成虎。\n养男莫听狂言，养女莫叫离母。\n男子失教必愚顽，女子失教定粗鲁。\n生男莫教弓与弩，生女莫教歌与舞。\n学成弓弩沙场灾，学成歌舞为人妾。\n财交者密，财尽者疏。\n婚姻论财，夫妻之道。\n色娇者亲，色衰者疏。\n少实胜虚，巧不如拙。\n百战百胜不如无争，万言万中不如一默。\n有钱不置怨逆产，冤家宜解不宜结。\n近朱者赤，近墨者黑。\n一个山头一只虎，恶龙难斗地头蛇。\n出门看天色，进门看脸色。\n商贾买卖如施舍，买卖公平如积德。",
        pinyin: "shé yǎo zhī wèi róu， chǐ luò jiē yīn kuàng。\nyìng nǔ xián xiān duàn， gāng dāo rèn zì shāng。\nzéi míng nán shòu， guī míng nán dāng。\nhǎo shì tā rén wèi jiàn jiǎng， cuò chù tā piān shuō dé cháng。\nnán zǐ wú zhì chún tiě wú gāng， nǚ zǐ wú zhì làn cǎo wú ráng。\nshēng nán yù dé chéng lóng yóu kǒng chéng zhāng， shēng nǚ yù dé chéng fèng yóu kǒng chéng hǔ。\nyǎng nán mò tīng kuáng yán， yǎng nǚ mò jiào lí mǔ。\nnán zǐ shī jiào bì yú wán， nǚ zǐ shī jiào dìng cū lǔ。\nshēng nán mò jiào gōng yǔ nǔ， shēng nǚ mò jiào gē yǔ wǔ。\nxué chéng gōng nǔ shā chǎng zāi， xué chéng gē wǔ wèi rén qiè。\ncái jiāo zhě mì， cái jìn zhě shū。\nhūn yīn lùn cái， fū qī zhī dào。\nsè jiāo zhě qīn， sè shuāi zhě shū。\nshǎo shí shèng xū， qiǎo bù rú zhuō。\nbǎi zhàn bǎi shèng bù rú wú zhēng， wàn yán wàn zhōng bù rú yī mò。\nyǒu qián bù zhì yuàn nì chǎn， yuān jiā yí jiě bù yí jié。\njìn zhū zhě chì， jìn mò zhě hēi。\nyī gè shān tóu yī zhī hǔ， è lóng nán dòu dì tóu shé。\nchū mén kàn tiān sè， jìn mén kàn liǎn sè。\nshāng jiǎ mǎi mài rú shī shě， mǎi mài gōng píng rú jī dé。",
        translation: "舌头会被咬伤，牙齿会掉落；硬弩的弦先断，钢刀的刃先伤了自己——太刚太硬的东西反而先吃亏。“贼”这个名声谁也难受，“龟”这个名声谁也当不起。别人做的好事他看不见也不说，别人的错处他偏偏说个没完。男人没有志气，就像熟铁里没有钢；女人没有志气，就像烂草没有芯。生了儿子盼他成龙，又怕他不成器；生了女儿盼她成凤，又怕她学坏。养儿子不要让他听狂妄的话，养女儿不要让她早早离开母亲。男孩子不受教育，一定愚昧顽劣；女孩子不受教育，一定粗鲁。不要教儿子一味学弓弩，不要教女儿一味学歌舞：弓弩学成，上战场就有杀身之祸；歌舞学成，容易沦落给人做妾。靠钱财交往的，钱财在就亲密，钱财没了就疏远。谈婚论嫁躲不开钱财，这也是夫妻过日子的事。人年轻漂亮时就亲近，年老色衰时就疏远。一点点实实在在，胜过许多虚头巴脑；太乖巧不如本本分分。百战百胜，不如大家不争；一万句话都说得准，不如一句不说。有钱不要买结了仇怨的产业；冤仇要解开，不要越结越深。靠近朱砂的会变红，靠近墨的会变黑。一座山头只有一只老虎，厉害的龙也斗不过当地的蛇。出门要看天色，进人家的门要看人家的脸色。做买卖像给人方便，公平交易就是积德。",
      }
      ],
    },
    {
      title: " · 天生一人 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 天生一人》意境插画：天生一人，地生一穴。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "天生一人，地生一穴。\n家无三年之积不成其家，国无九年之积不成其国。\n男子有德便是才，女子无才便是德。\n有钱难买子孙贤，女儿不请上门客。\n男大当婚女大当嫁，不婚不嫁惹出笑话。\n谦虚美德，过谦即诈。\n自己跌倒自己爬，望人扶持都是假。\n人不知己过，牛不知力大。\n一家饱暖千家怨，一物不见赖千家。\n当面论人惹恨最大，是与不是随他说吧！\n谁人做得千年主，转眼流传八百家。\n满载芝麻都漏了，还在水里捞油花！\n皇帝坐北京，以理统天下。\n五百年前共一家，不同祖宗也同华！\n学堂大如官厅，人情大过王法。\n找钱犹如针挑土，用钱犹如水推沙！\n害人之心不可有，防人之心不可无！\n不愁无路，就怕不做。\n须向根头寻活计，莫从体面下功夫！\n祸从口出，病从口入。",
        pinyin: "tiān shēng yī rén， dì shēng yī xué。\njiā wú sān nián zhī jī bù chéng qí jiā， guó wú jiǔ nián zhī jī bù chéng qí guó。\nnán zǐ yǒu dé biàn shì cái， nǚ zǐ wú cái biàn shì dé。\nyǒu qián nán mǎi zǐ sūn xián， nǚ ér bù qǐng shàng mén kè。\nnán dà dāng hūn nǚ dà dāng jià， bù hūn bù jià rě chū xiào huà。\nqiān xū měi dé， guò qiān jí zhà。\nzì jǐ diē dǎo zì jǐ pá， wàng rén fú chí dōu shì jiǎ。\nrén bù zhī jǐ guò， niú bù zhī lì dà。\nyī jiā bǎo nuǎn qiān jiā yuàn， yī wù bù jiàn lài qiān jiā。\ndāng miàn lùn rén rě hèn zuì dà， shì yǔ bù shì suí tā shuō ba！\nshuí rén zuò dé qiān nián zhǔ， zhuǎn yǎn liú chuán bā bǎi jiā。\nmǎn zài zhī má dōu lòu le， hái zài shuǐ lǐ lāo yóu huā！\nhuáng dì zuò běi jīng， yǐ lǐ tǒng tiān xià。\nwǔ bǎi nián qián gòng yī jiā， bù tóng zǔ zōng yě tóng huá！\nxué táng dà rú guān tīng， rén qíng dà guò wáng fǎ。\nzhǎo qián yóu rú zhēn tiāo tǔ， yòng qián yóu rú shuǐ tuī shā！\nhài rén zhī xīn bù kě yǒu， fáng rén zhī xīn bù kě wú！\nbù chóu wú lù， jiù pà bù zuò。\nxū xiàng gēn tóu xún huó jì， mò cóng tǐ miàn xià gōng fū！\nhuò cóng kǒu chū， bìng cóng kǒu rù。",
        translation: "天生下一个人，地上就有一个安身的地方。家里没有三年的积蓄，成不了像样的家；国家没有九年的积蓄，成不了像样的国。男人有德行就是才干；女人不显露才气，就是德行——这是旧时候的说法。再有钱也买不到子孙贤惠；女儿家不招待上门的男客。男大当婚，女大当嫁，不婚不嫁会惹出笑话。谦虚是美德，谦虚过了头就变成虚伪。自己跌倒自己爬起来，指望别人来扶多半靠不住。人看不见自己的过错，就像牛不知道自己的力气有多大。一家吃饱穿暖，招来千家抱怨；一样东西找不着，就怀疑到千家人头上。当面议论别人最容易招恨，说得对不对，随他去说吧。谁能做一千年的主人呢？转眼之间江山换了八百家。满满一船芝麻都漏光了，还在水里捞那点油花。皇帝坐镇北京，靠道理治理天下。五百年前我们原是一家，祖宗不同也都是中华人。学堂的势力大过官厅，人情大过王法。挣钱像用针挑土一样慢，花钱像大水冲沙一样快。害人的心不能有，防人的心不能没有。不愁没有路走，就怕不肯动手去做。谋生要从根本上下功夫，不要只在表面体面上做文章。灾祸从嘴里说出来，疾病从嘴里吃进去。",
      }
      ],
    },
    {
      title: " · 药补不如 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 药补不如》意境插画：药补不如肉补，肉补不如养补。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "药补不如肉补，肉补不如养补。\n思虑之害甚于酒色，日日劳力上床呼疾。\n人怕不是福，人欺不是辱。\n能言不是真君子，善处方为大丈夫！\n为人莫犯法，犯法身无主。\n姊妹同肝胆，弟兄同骨肉。\n慈母多误子，悍妇必欺夫！\n君子千里同舟，小人隔墙易宿。\n文钱逼死英雄汉，财不归身恰是无。\n妻子如衣服，弟兄似手足。\n衣服补易新，手足断难续。\n盗贼怨失主，不孝怨父母。\n一时劝人以口，百世劝人以书。\n我不如人我无其福，人不如我我常知足！\n捡金不忘失金人，三两黄铜四两福。\n因祸得福，求赌必输。\n一言而让他人之祸，一忿而折平生之福。\n天有不测风云，人有旦夕祸福。\n不淫当斋，淡饱当肉。\n缓步当车，无祸当福。",
        pinyin: "yào bǔ bù rú ròu bǔ， ròu bǔ bù rú yǎng bǔ。\nsī lǜ zhī hài shèn yú jiǔ sè， rì rì láo lì shàng chuáng hū jí。\nrén pà bù shì fú， rén qī bù shì rǔ。\nnéng yán bù shì zhēn jūn zǐ， shàn chǔ fāng wèi dà zhàng fu！\nwèi rén mò fàn fǎ， fàn fǎ shēn wú zhǔ。\nzǐ mèi tóng gān dǎn， dì xiong tóng gǔ ròu。\ncí mǔ duō wù zǐ， hàn fù bì qī fū！\njūn zǐ qiān lǐ tóng zhōu， xiǎo rén gé qiáng yì sù。\nwén qián bī sǐ yīng xióng hàn， cái bù guī shēn qià shì wú。\nqī zǐ rú yī fu， dì xiong sì shǒu zú。\nyī fu bǔ yì xīn， shǒu zú duàn nán xù。\ndào zéi yuàn shī zhǔ， bù xiào yuàn fù mǔ。\nyī shí quàn rén yǐ kǒu， bǎi shì quàn rén yǐ shū。\nwǒ bù rú rén wǒ wú qí fú， rén bù rú wǒ wǒ cháng zhī zú！\njiǎn jīn bù wàng shī jīn rén， sān liǎng huáng tóng sì liǎng fú。\nyīn huò dé fú， qiú dǔ bì shū。\nyī yán ér ràng tā rén zhī huò， yī fèn ér zhé píng shēng zhī fú。\ntiān yǒu bù cè fēng yún， rén yǒu dàn xī huò fú。\nbù yín dāng zhāi， dàn bǎo dāng ròu。\nhuǎn bù dāng chē， wú huò dāng fú。",
        translation: "吃药补身体，不如吃肉补身体；吃肉补身体，不如好好休养。思虑太多比喝酒纵欲更伤人；天天卖苦力的人，一上床就喊身上疼。让人害怕不是福气，被人欺负也不算耻辱。能说会道的不算真君子，会待人处事才是大丈夫。做人不要犯法，犯了法就身不由己了。姐妹像肝和胆一样一条心，兄弟像骨和肉一样分不开。太溺爱的母亲容易耽误孩子，凶悍的妻子一定会欺负丈夫。君子哪怕同船走一千里也放得下心，小人隔着墙住一夜都互相提防。一文钱能逼死英雄汉，钱财没到自己手里就等于没有。妻子像身上的衣服，兄弟像自己的手脚；衣服破了容易补、容易换新，手脚断了却难接上。做强盗的反倒埋怨失主，不孝子反倒埋怨父母。用嘴劝人，只能管一时；用书劝人，能传百世。我不如别人，是我没有那份福气；别人不如我，我要常怀知足。捡到金子，不要忘记丢金子的人有多着急；三两黄铜，也要想着四两是自己的福分。有时因祸得福，可去赌钱一定输。一句话说不好，会把祸事让给自己；一次发脾气，会折掉半生的福气。天有说不准的风云，人有转眼间的祸福。不放纵自己，就等于天天吃斋；粗茶淡饭吃得饱，就当吃肉。慢慢走路就当坐车，没有灾祸就是福气。",
      }
      ],
    },
    {
      title: " · 男无良友 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 男无良友》意境插画：男无良友不知己之有过，女无明镜不知面之精粗。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "男无良友不知己之有过，女无明镜不知面之精粗。\n事非亲做，不知难处。\n十年易读举子，百年难淘江湖！\n积钱不如积德，闲坐不如看书。\n思量挑担苦，空手做是福。\n时来易借银千两，运去难赊酒半壶。\n天晴打过落雨铺，少时享过老来福。\n与人方便自己方便，一家打墙两家好看。\n当面留一线，过后好相见。\n入门掠虎易，开口告人难。\n手指要往内撇，家丑不可外传。\n浪子出于祖无德，孝子出于前人贤。\n货离乡贵，人离乡贱。\n树挪死，人挪活。\n在家千日好，出门处处难。\n三员长者当官员，几个明人当知县？\n明人自断，愚人官断。\n人怕三见面，树怕一墨线。\n村夫硬似铁，光棍软如棉。\n不是撑船手，怎敢拿篙竿！",
        pinyin: "nán wú liáng yǒu bù zhī jǐ zhī yǒu guò， nǚ wú míng jìng bù zhī miàn zhī jīng cū。\nshì fēi qīn zuò， bù zhī nán chù。\nshí nián yì dú jǔ zǐ， bǎi nián nán táo jiāng hú！\njī qián bù rú jī dé， xián zuò bù rú kàn shū。\nsī liang tiāo dàn kǔ， kōng shǒu zuò shì fú。\nshí lái yì jiè yín qiān liǎng， yùn qù nán shē jiǔ bàn hú。\ntiān qíng dǎ guò luò yǔ pù， shǎo shí xiǎng guò lǎo lái fú。\nyǔ rén fāng biàn zì jǐ fāng biàn， yī jiā dǎ qiáng liǎng jiā hǎo kàn。\ndāng miàn liú yī xiàn， guò hòu hǎo xiāng jiàn。\nrù mén lüè hǔ yì， kāi kǒu gào rén nán。\nshǒu zhǐ yào wǎng nèi piě， jiā chǒu bù kě wài zhuàn。\nlàng zǐ chū yú zǔ wú dé， xiào zǐ chū yú qián rén xián。\nhuò lí xiāng guì， rén lí xiāng jiàn。\nshù nuó sǐ， rén nuó huó。\nzài jiā qiān rì hǎo， chū mén chù chù nán。\nsān yuán zhǎng zhě dāng guān yuán， jǐ gè míng rén dāng zhī xiàn？\nmíng rén zì duàn， yú rén guān duàn。\nrén pà sān jiàn miàn， shù pà yī mò xiàn。\ncūn fū yìng sì tiě， guāng gùn ruǎn rú mián。\nbù shì chēng chuán shǒu， zěn gǎn ná gāo gān！",
        translation: "男人没有好朋友，就不知道自己有什么过错；女人没有明镜，就不知道自己的脸洗得干净不干净。事情不是亲手做过，就不知道难在哪里。花十年功夫读书考功名还算容易，要在江湖上站住脚，一百年也难学成。攒钱不如积德，闲坐着不如看书。想想挑担子的苦，空着手走路就是福气。时运好时，一千两银子都好借；时运差时，半壶酒都赊不到。趁天晴修好漏雨的屋顶，年轻时肯吃苦，老了才有福享。给人方便，自己也方便；一家打墙，两家都好看。当面给人留一点情面，以后见面才好说话。进门去捉老虎还容易些，开口向人张口求告最难。手指要朝里弯，护着自家人；家里的丑事不要往外传。败家子多出在祖上没德的人家，孝子多出在前辈贤良的人家。货物离开家乡就金贵，人离开家乡就卑微。树挪一挪会死，人挪一挪反而活出路来。在家千日好，出门处处难。三个忠厚长者能出一个官员，可几个明白人里才出一个清正知县呢？明白人有事自己了断，愚笨的人才闹到官府去断。人经不起几次见面就被看清底细，树经不起墨线一弹来检验直不直。乡下人硬得像铁，耍无赖的人软得像棉花。不是撑船的好手，怎么敢去拿那根船篙！",
      }
      ],
    },
    {
      title: " · 天下礼仪 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 天下礼仪》意境插画：天下礼仪无穷，一人知识有限。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "天下礼仪无穷，一人知识有限。\n一人不得二人计，宋江难结万人缘。\n家有三亩田，不离衙门前，乡间无强汉，衙门就饿饭。\n人人依礼仪，天下不设官。\n衙门钱，眼睛钱；\n田禾钱，千万年。\n诗书必读，不可做官。\n为人莫当官，当官皆一般。\n换了你我去，恐比他还贪。\n官吏清廉如修行，书差方便如行善。\n靠山吃山，种田吃田。\n吃尽美味还是盐，穿尽绫罗还是棉。\n一夫不耕，全家饿饭，一女不织，全家受寒。\n金银到手非容易，用时方知来时难。\n先讲断，后不乱，免得藕断丝不断。\n听人劝，得一半。\n不怕慢，只怕站。\n逢快莫赶，逢贱莫懒。\n谋事在人，成事在天！\n长路人挑担，短路人赚钱。",
        pinyin: "tiān xià lǐ yí wú qióng， yī rén zhī shi yǒu xiàn。\nyī rén bù dé èr rén jì， sòng jiāng nán jié wàn rén yuán。\njiā yǒu sān mǔ tián， bù lí yá mén qián， xiāng jiān wú qiáng hàn， yá mén jiù è fàn。\nrén rén yī lǐ yí， tiān xià bù shè guān。\nyá mén qián， yǎn jīng qián；\ntián hé qián， qiān wàn nián。\nshī shū bì dú， bù kě zuò guān。\nwèi rén mò dāng guān， dāng guān jiē yī bān。\nhuàn le nǐ wǒ qù， kǒng bǐ tā hái tān。\nguān lì qīng lián rú xiū xíng， shū chà fāng biàn rú xíng shàn。\nkào shān chī shān， zhǒng tián chī tián。\nchī jìn měi wèi hái shì yán， chuān jìn líng luó hái shì mián。\nyī fū bù gēng， quán jiā è fàn， yī nǚ bù zhī， quán jiā shòu hán。\njīn yín dào shǒu fēi róng yì， yòng shí fāng zhī lái shí nán。\nxiān jiǎng duàn， hòu bù luàn， miǎn de ǒu duàn sī bù duàn。\ntīng rén quàn， dé yī bàn。\nbù pà màn， zhǐ pà zhàn。\nféng kuài mò gǎn， féng jiàn mò lǎn。\nmóu shì zài rén， chéng shì zài tiān！\ncháng lù rén tiāo dàn， duǎn lù rén zhuàn qián。",
        translation: "天下的礼节学问没有穷尽，一个人的见识却很有限。一个人的主意顶不上两个人的，宋江那样会交朋友的人也难讨好一万个人。家里只有三亩田，也常守在衙门前；乡下要是没有横行闹事的人，衙门就没有案子办、要饿饭了。人人都讲礼义，天下就用不着设官府了。衙门里的钱像眼前晃一晃的钱，田里种出来的钱才是传千万年的钱。诗书一定要读，官却不一定要做。做人不要去当官，当官的都一个样；换了你我去当，恐怕比他们还贪。官吏能清廉，就像出家人修行一样难得；书吏差役肯给人方便，就像做善事。靠山就吃山，种田就吃田。吃遍美味离不开盐，穿遍绫罗离不开棉。一个人不耕田，全家要挨饿；一个人不织布，全家要受冻。金银到了手才知道来得不容易，花钱的时候才知道挣钱难。先把界限讲清楚，往后才不会乱，免得藕断丝连。听人劝告，等于得了一半的好处。不怕走得慢，就怕站着不动。行情好的时候别一窝蜂去赶，行情差的时候也别偷懒。谋事靠人，成事靠天。走长路的人挑着重担，走短路的人倒赚到了钱。",
      }
      ],
    },
    {
      title: " · 宁卖现二 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 宁卖现二》意境插画：宁卖现二，莫卖赊三。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "宁卖现二，莫卖赊三。\n赚钱往前算，折本往后算。\n小小生意赚大钱，七十二行出状元。\n自己无运至，却怨世界难。\n胆大不如胆小，心宽甚如屋宽。\n妻贤何愁家不富，子孙何须受祖田。\n是儿不死，是财不散。\n财来生我易，我去生财难。\n十月滩头坐，一日下九滩。\n结交一人难上难，得罪一人一时间。\n借债经商，卖田还债；\n赊钱起屋，卖屋还钱。\n修起庙来鬼都老，拾得秤来姜卖完。\n不嫖莫转，不赌莫看。\n节食以去病，少食以延年。\n豆腐多了是包水，梢公多了打烂船。\n无口过是，无眼过难。\n无身过易，无心过难。\n不会凫水怨河湾，不会犁田怨枷担。\n他马莫骑，他弓莫挽。",
        pinyin: "níng mài xiàn èr， mò mài shē sān。\nzhuàn qián wǎng qián suàn， zhé běn wǎng hòu suàn。\nxiǎo xiǎo shēng yì zhuàn dà qián， qī shí èr háng chū zhuàng yuán。\nzì jǐ wú yùn zhì， què yuàn shì jiè nán。\ndǎn dà bù rú dǎn xiǎo， xīn kuān shèn rú wū kuān。\nqī xián hé chóu jiā bù fù， zǐ sūn hé xū shòu zǔ tián。\nshì ér bù sǐ， shì cái bù sàn。\ncái lái shēng wǒ yì， wǒ qù shēng cái nán。\nshí yuè tān tóu zuò， yī rì xià jiǔ tān。\njié jiāo yī rén nán shàng nán， dé zuì yī rén yī shí jiān。\njiè zhài jīng shāng， mài tián huán zhài；\nshē qián qǐ wū， mài wū hái qián。\nxiū qǐ miào lái guǐ dōu lǎo， shí dé chèng lái jiāng mài wán。\nbù piáo mò zhuǎn， bù dǔ mò kàn。\njié shí yǐ qù bìng， shǎo shí yǐ yán nián。\ndòu fu duō le shì bāo shuǐ， shāo gōng duō le dǎ làn chuán。\nwú kǒu guò shì， wú yǎn guò nán。\nwú shēn guò yì， wú xīn guò nán。\nbù huì fú shuǐ yuàn hé wān， bù huì lí tián yuàn jiā dān。\ntā mǎ mò qí， tā gōng mò wǎn。",
        translation: "宁可现钱便宜点卖，也不要赊账卖高价。赚了钱要往前打算，亏了本要往后慢慢扳。小小的生意也能赚大钱，七十二行里行行都能出状元。自己运气不好，却埋怨世道艰难。胆子大不如胆子小来得稳妥，心宽比屋子宽敞更要紧。妻子贤惠，还愁家里不富？子孙有本事，何须靠祖上的田产。命里该活的儿死不了，命里该有的财散不掉。钱财养活人容易，人去挣钱财难。十个月稳稳守在滩头等，一天就能连闯九道险滩。结交一个知心人难上加难，得罪一个人只要一眨眼的功夫。借了债去做生意，落得卖田还债；赊了钱去盖房子，落得卖屋还钱。庙修好了，鬼都等老了；秤捡起来了，姜早就卖完了。不沾那种事，就不要在那儿转；不赌博，连看都不要看。少吃一点能少生病，节制饮食能延年益寿。豆腐做多了就是一团水，艄公多了反而把船划翻。嘴上不出错还算容易，眼睛不看出错就难了；身上不出错容易，心里不起坏念头才真难。不会游泳就怪河湾拐得急，不会犁田就怪牛轭不好用。别人的马不要骑，别人的弓不要拉。",
      }
      ],
    },
    {
      title: " · 要知心腹 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 要知心腹》意境插画：要知心腹事，但听口中言。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "要知心腹事，但听口中言。\n宁在人前全不会，莫在人前会不全。\n事非亲见，切莫乱谈。\n打人莫打脸，骂人莫骂短。\n好言一句三冬暖，话不投机六月寒。\n人上十口难盘，帐上万元难还。\n放债如施，收债如讨。\n告状讨钱，海底摸盐。\n衙门深似海，弊病大如天。\n银钱莫欺骗，牛马不好变。\n好汉莫被人识破，看破不值半文钱。\n狗咬对头人，雷打三世冤。\n不卖香烧无剩钱，井水不打不满边。\n事宽则园，太久则偏。\n高人求低易，低人求高难。\n有钱就是男子汉，无钱就是汉子难。\n人上一百，手艺齐全。\n难者不会，会者不难。\n生就木头造就船，砍的没得车的圆。\n心不得满，事不得全。",
        pinyin: "yào zhī xīn fù shì， dàn tīng kǒu zhōng yán。\nníng zài rén qián quán bù huì， mò zài rén qián huì bù quán。\nshì fēi qīn jiàn， qiè mò luàn tán。\ndǎ rén mò dǎ liǎn， mà rén mò mà duǎn。\nhǎo yán yī jù sān dōng nuǎn， huà bù tóu jī liù yuè hán。\nrén shàng shí kǒu nán pán， zhàng shàng wàn yuán nán hái。\nfàng zhài rú shī， shōu zhài rú tǎo。\ngào zhuàng tǎo qián， hǎi dǐ mō yán。\nyá mén shēn sì hǎi， bì bìng dà rú tiān。\nyín qián mò qī piàn， niú mǎ bù hǎo biàn。\nhǎo hàn mò bèi rén shí pò， kàn pò bù zhí bàn wén qián。\ngǒu yǎo duì tóu rén， léi dǎ sān shì yuān。\nbù mài xiāng shāo wú shèng qián， jǐng shuǐ bù dǎ bù mǎn biān。\nshì kuān zé yuán， tài jiǔ zé piān。\ngāo rén qiú dī yì， dī rén qiú gāo nán。\nyǒu qián jiù shì nán zǐ hàn， wú qián jiù shì hàn zǐ nán。\nrén shàng yī bǎi， shǒu yì qí quán。\nnán zhě bù huì， huì zhě bù nán。\nshēng jiù mù tou zào jiù chuán， kǎn de méi dé chē de yuán。\nxīn bù dé mǎn， shì bù dé quán。",
        translation: "要想知道一个人心里的秘密，听他嘴里说的话就知道了。宁可当着人说自己全不会，也不要一知半解地逞能。不是亲眼看见的事，千万不要乱说。打人不要打脸，骂人不要揭人短处。一句好话，让人寒冬腊月也觉得暖；一句话说不到一起，让人大热六月也觉得寒。家里人口多了难以安排，欠账上万就难还清。放债的时候像施舍一样痛快，收债的时候像讨饭一样艰难。靠打官司去讨钱，就像到海底去摸盐。衙门深得像大海，弊病大得像天。在银钱上不要骗人，欠下的债，变牛变马也难还清。好汉不要被人看破底细，一旦被看破，就不值半文钱了。狗专咬对头人，雷专劈三世冤。不卖香，就没有烧香换来的钱；井水不往上打，就不会满到井口。事情缓一缓就容易办圆满，拖得太久反而会生变故。地位高的人求地位低的人容易，地位低的人求地位高的人难。有钱的才算得上男子汉，没钱的汉子做人也难。人凑够一百个，什么样的手艺都有了。觉得难的人是不会，会做的人不觉得难。天生的木头天生造船的料，刀砍出来的总没有车出来的圆。心不要想着样样满足，事情也很难十全十美。",
      }
      ],
    },
    {
      title: " · 鸟飞不尽 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 鸟飞不尽》意境插画：鸟飞不尽，话说不完。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "鸟飞不尽，话说不完。\n人无喜色休开店，事不遂心莫怨天。\n选婿莫选田园，选女莫选嫁奁。\n红颜女子多薄命，福人出在丑人边。\n人将礼义为先，树将花果为园。\n临危许行善，过后心又变。\n天意违可以人回，命早定可以心挽。\n强盗口内出赦书，君子口中无戏言。\n贵人语少，贫子话多。\n快里须斟酌，耽误莫迟春。\n读过古华佗，不如见症多。\n东屋未补西屋破，前帐未还后又拖。\n今年又说明年富，待到明年差不多。\n志不同己，不必强合。\n莫道坐中安乐少，须知世上苦情多。\n本少利微强如坐，屋檐水也滴得多。\n勤俭持家富，谦恭受益多。\n细处不断粗处断，黄梅不落青梅落。\n见钱起意便是贼，顺手牵羊乃为盗。\n要做快活人，切莫寻烦恼。",
        pinyin: "niǎo fēi bù jìn， huà shuō bù wán。\nrén wú xǐ sè xiū kāi diàn， shì bù suì xīn mò yuàn tiān。\nxuǎn xù mò xuǎn tián yuán， xuǎn nǚ mò xuǎn jià lián。\nhóng yán nǚ zǐ duō bó mìng， fú rén chū zài chǒu rén biān。\nrén jiāng lǐ yì wèi xiān， shù jiāng huā guǒ wèi yuán。\nlín wēi xǔ xíng shàn， guò hòu xīn yòu biàn。\ntiān yì wéi kě yǐ rén huí， mìng zǎo dìng kě yǐ xīn wǎn。\nqiáng dào kǒu nèi chū shè shū， jūn zǐ kǒu zhōng wú xì yán。\nguì rén yǔ shǎo， pín zǐ huà duō。\nkuài lǐ xū zhēn zhuó， dān wù mò chí chūn。\ndú guò gǔ huà tuó， bù rú jiàn zhèng duō。\ndōng wū wèi bǔ xī wū pò， qián zhàng wèi hái hòu yòu tuō。\njīn nián yòu shuō míng nián fù， dài dào míng nián chà bù duō。\nzhì bù tóng jǐ， bù bì qiáng hé。\nmò dào zuò zhōng ān lè shǎo， xū zhī shì shàng kǔ qíng duō。\nběn shǎo lì wēi qiáng rú zuò， wū yán shuǐ yě dī dé duō。\nqín jiǎn chí jiā fù， qiān gōng shòu yì duō。\nxì chù bù duàn cū chù duàn， huáng méi bù luò qīng méi luò。\njiàn qián qǐ yì biàn shì zéi， shùn shǒu qiān yáng nǎi wèi dào。\nyào zuò kuài huó rén， qiè mò xún fán nǎo。",
        translation: "天上的鸟飞不尽，人间的话说不完。脸上没有喜气，就不要开店做生意；事情不顺心，不要怨老天。挑女婿不要挑他家的田产，挑媳妇不要挑她家的嫁妆。漂亮女子常常命苦，有福气的人往往长在相貌平常的人家。人活着要把礼义放在头里，树把自己的花果当作园子里的宝贝。危急时许愿要做好事，危险一过心又变了。天意不顺，可以靠人的努力挽回；命虽然早定，也可以用真心去改变。强盗嘴里说不出赦免人的好话，君子嘴里没有开玩笑不算数的话。尊贵的人话少，穷苦的人话多。顺利的时候要多加斟酌，已经耽误的事，别再错过春天。把华佗的医书都读遍了，不如多见几个病人长见识。东屋还没补好，西屋又破了；前一笔账还没还清，后一笔又欠下了。今年总说明年就富了，等到明年还是老样子。志向合不来的人，不必勉强凑在一起。不要只说身边安乐的事少，要知道世上苦命的人多。本钱小利润薄，也比干坐着强；屋檐水一点一点滴，也能滴出一个大坑。见钱起坏心就是贼，顺手拿走别人的东西就是盗。要做快活的人，千万不要自寻烦恼。",
      }
      ],
    },
    {
      title: " · 要做长寿 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《 · 要做长寿》意境插画：要做长寿人，莫做短命事。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "要做长寿人，莫做短命事。\n要做有后人，莫做无后事。\n不经一事，不长一智。\n宁可无钱使，不可无行止。\n栽树要栽松柏，结交要结君子。\n秀才不出门，能知天下事。\n钱多不经用，儿多不耐死。\n弟兄争财家不穷不止，妻妾争风夫不死不止。\n男人有志，妇人有势。\n夫人死百将临门，将军死一卒不至。\n天旱误甲子，人穷误口齿。\n百岁无多日，光阴能几时？\n父母养其身，自己立其志。\n待有余而济人，终无济人之日；\n待有闲而读书，终无读书之时。\n此书传后世，句句必精读，其中礼和义，奉劝告世人。\n勤奋读，苦发奋，走遍天涯如游刃。",
        pinyin: "yào zuò cháng shòu rén， mò zuò duǎn mìng shì。\nyào zuò yǒu hòu rén， mò zuò wú hòu shì。\nbù jīng yī shì， bù cháng yī zhì。\nnìng kě wú qián shǐ， bù kě wú xíng zhǐ。\nzāi shù yào zāi sōng bǎi， jié jiāo yào jié jūn zǐ。\nxiù cái bù chū mén， néng zhī tiān xià shì。\nqián duō bù jīng yòng， ér duō bù nài sǐ。\ndì xiong zhēng cái jiā bù qióng bù zhǐ， qī qiè zhēng fēng fū bù sǐ bù zhǐ。\nnán rén yǒu zhì， fù rén yǒu shì。\nfū rén sǐ bǎi jiāng lín mén， jiāng jūn sǐ yī zú bù zhì。\ntiān hàn wù jiǎ zǐ， rén qióng wù kǒu chǐ。\nbǎi suì wú duō rì， guāng yīn néng jǐ shí？\nfù mǔ yǎng qí shēn， zì jǐ lì qí zhì。\ndài yǒu yú ér jì rén， zhōng wú jì rén zhī rì；\ndài yǒu xián ér dú shū， zhōng wú dú shū zhī shí。\ncǐ shū chuán hòu shì， jù jù bì jīng dú， qí zhōng lǐ hé yì， fèng quàn gào shì rén。\nqín fèn dú， kǔ fā fèn， zǒu biàn tiān yá rú yóu rèn。",
        translation: "要做长寿的人，就不要做折损寿命的事。要让后代兴旺，就不要做断绝后代的事。不经一事，不长一智。宁可没有钱花，也不能没有端正的品行。栽树要栽松柏，交朋友要交正人君子。读书人不出门，也能知道天下的事。钱再多也有不经用的时候，儿女再多也未必个个靠得住。兄弟争家产，家不到穷光不止；妻妾争宠爱，丈夫不到死不休。男人有志气成了事，家里的女眷也跟着有地位。将军的夫人去世，一百位将军登门吊唁；将军自己去世，一个小兵都不来。天旱时连节气都算不准，人穷时连说话都没了底气。活到一百岁也没有多少天，光阴到底能有多少呢？父母养大我的身体，志向要自己立起来。等钱多得用不完再去帮人，就永远没有帮人的那一天；等有了空再去读书，就永远没有读书的时候。这本书传给后世，句句都要用心读，其中的礼和义，奉劝世人记在心间。勤奋地读，刻苦地学，走遍天涯都驾轻就熟。",
      }
      ],
    }
  ],
  rights: {
    workTitle: "增广贤文",
    author: "佚名（明清）",
    authorDeathYear: -1,
    translator: '桃阅读',
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: "https://github.com/chinese-poetry/chinese-poetry",
    note: "明清通行本；注音与白话译文为平台自撰。",
  },
}
