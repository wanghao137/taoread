import type { PackBook } from '../types'

/**
 * 《千家诗·四季绝句》——八首宋人绝句，按四季风物编排。
 * 选诗：王安石《元日》《泊船瓜洲》《书湖阴先生壁》、苏轼《六月二十七日望湖楼醉书》
 *       《饮湖上初晴后雨》《题西林壁》、张籍《秋思》、陆游《游山西村》。
 * 均公版（作者卒年：王安石 1086、苏轼 1101、张籍约 830、陆游 1210），
 * 通行本逐字核对；全文拼音与白话译文由平台撰写。
 */
export const qianJiaShi: PackBook = {
  id: 'poetry-qianjia',
  title: '千家诗·四季绝句',
  author: '王安石、苏轼、张籍、陆游',
  lang: 'zh',
  category: 'poetry',
  ageStage: '6-8',
  intro: '爆竹声里的新年、春风吹绿的江岸、望湖楼上的阵雨、庐山横竖不同的样子……八首短诗，带孩子在四季里走一圈。',
  coverArt: 'qianjia-seasons-cover',
  coverArtPrompt: '一幅四格长卷式中国水彩：春有爆竹红灯笼和绿柳，夏有西湖荷叶与阵雨，秋有枫林白雁，冬有雪山红梅，四个季节连成一条弯弯的小路',
  coverFrom: '#B71C1C',
  coverTo: '#F0E4C3',
  source: '《千家诗》选篇，通行本逐字注音',
  chapters: [
    {
      title: '第一课 · 元日（王安石）',
      art: 'qianjia-newyear-firecracker',
      artPrompt: '爆竹在院子里炸开红纸屑，一家老小贴着新桃符，小孩捂耳朵又想看，春风里灯笼轻摇',
      blocks: [
        {
          kind: 'poem',
          text: '爆竹声中一岁除，春风送暖入屠苏。千门万户曈曈日，总把新桃换旧符。',
          pinyin: 'bào zhú shēng zhōng yī suì chú, chūn fēng sòng nuǎn rù tú sū. qiān mén wàn hù tóng tóng rì, zǒng bǎ xīn táo huàn jiù fú.',
          translation: '噼里啪啦的爆竹声里，旧的一年过去了；春风把暖意吹进了屠苏酒。千家万户迎来了亮堂堂的太阳，家家都把旧桃符摘下，换上崭新的桃符。',
        },
        {
          kind: 'note',
          text: '「元日」就是大年初一。「屠苏」是一种泡了药材的酒，古人过年要全家喝一口，说是能驱邪。「曈曈」是太阳刚出来时亮闪闪的样子。「桃符」就是春联的祖宗，用桃木板刻字挂在门上。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'qianjia-newyear-firecracker',
          text: '大年初一，院子里放爆竹，门上换上了新桃符。',
        },
      ],
    },
    {
      title: '第二课 · 泊船瓜洲（王安石）',
      art: 'qianjia-river-crossing',
      artPrompt: '夜晚的瓜洲渡口，一艘官船泊在江边，对岸京口的灯火隐隐可见，更远处钟山的轮廓在月光下，春风拂过江岸的青草',
      blocks: [
        {
          kind: 'poem',
          text: '京口瓜洲一水间，钟山只隔数重山。春风又绿江南岸，明月何时照我还。',
          pinyin: 'jīng kǒu guā zhōu yī shuǐ jiān, zhōng shān zhǐ gé shù chóng shān. chūn fēng yòu lǜ jiāng nán àn, míng yuè hé shí zhào wǒ huán.',
          translation: '京口和瓜洲只隔着一条长江，钟山也只隔着几重山岭。春风又一次吹绿了长江南岸，天上的明月啊，什么时候才能照着我回家呢？',
        },
        {
          kind: 'note',
          text: '「瓜洲」在长江北岸，「京口」就是今天的镇江，两座城隔着长江相望。「钟山」在南京，是诗人的家。「绿」在这里当动词用：春风把江岸吹绿了。一个字，整幅画就活了。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'qianjia-river-crossing',
          text: '月光下的渡口，船儿停着，春风悄悄绿了江岸。',
        },
      ],
    },
    {
      title: '第三课 · 书湖阴先生壁（王安石）',
      art: 'qianjia-thatched-wall',
      artPrompt: '一座干净的小茅屋，檐下无苔，院中花木成畦，一条小溪绕过绿油油的菜田，两座青山像推门而入的客人送来满眼青翠',
      blocks: [
        {
          kind: 'poem',
          text: '茅檐长扫净无苔，花木成畦手自栽。一水护田将绿绕，两山排闼送青来。',
          pinyin: 'máo yán cháng sǎo jìng wú tái, huā mù chéng qí shǒu zì zāi. yī shuǐ hù tián jiāng lǜ rào, liǎng shān pái tà sòng qīng lái.',
          translation: '茅草屋檐常常打扫，干干净净没有一点青苔；院子里的花草树木成行成列，都是主人亲手栽下的。一条小溪像在护卫着田地，把绿意绕了一圈；两座青山像推开了门，把青翠的颜色送进屋来。',
        },
        {
          kind: 'note',
          text: '这是诗人写在邻居湖阴先生家墙上的诗。「长扫」是经常打扫。「畦」是田地里一列一列的长条。「排闼」就是推门，「闼」是小门。山会推门送礼，多有趣的想象。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'qianjia-thatched-wall',
          text: '干净的小院外，一条绿水绕田，两座青山像推门进来。',
        },
      ],
    },
    {
      title: '第四课 · 六月二十七日望湖楼醉书（苏轼）',
      art: 'qianjia-lake-storm',
      artPrompt: '西湖上空乌云翻滚如泼墨，白色的雨点像珍珠砸进游船，一阵狂风卷地而来，云散雨停，湖面平静得像一面大镜子',
      blocks: [
        {
          kind: 'poem',
          text: '黑云翻墨未遮山，白雨跳珠乱入船。卷地风来忽吹散，望湖楼下水如天。',
          pinyin: 'hēi yún fān mò wèi zhē shān, bái yǔ tiào zhū luàn rù chuán. juǎn dì fēng lái hū chuī sàn, wàng hú lóu xià shuǐ rú tiān.',
          translation: '乌云像打翻的墨汁，还没遮住山头；白花花的雨点像蹦跳的珍珠，乱纷纷砸进船舱。一阵大风贴着地皮卷来，忽然把云吹散了——站在望湖楼上一看，湖水就像天空一样平静辽阔。',
        },
        {
          kind: 'note',
          text: '「跳珠」是苏轼最有名的比喻之一，雨点像珍珠一样蹦跳。「卷地风」是贴着地面卷过来的风。这首诗写的是西湖夏天的「过云雨」：来得快，去得也快。题目里的「醉书」，是诗人喝着酒写下的。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'qianjia-lake-storm',
          text: '一阵急雨砸过西湖，风一吹，云散了，湖面像天一样平。',
        },
      ],
    },
    {
      title: '第五课 · 饮湖上初晴后雨（苏轼）',
      art: 'qianjia-westlake-rain',
      artPrompt: '西湖一半晴天一半细雨，水面波光粼粼，远山如笼轻纱，一个像西施的女子在堤上撑伞缓行',
      blocks: [
        {
          kind: 'poem',
          text: '水光潋滟晴方好，山色空蒙雨亦奇。欲把西湖比西子，淡妆浓抹总相宜。',
          pinyin: 'shuǐ guāng liàn yàn qíng fāng hǎo, shān sè kōng méng yǔ yì qí. yù bǎ xī hú bǐ xī zǐ, dàn zhuāng nóng mǒ zǒng xiāng yí.',
          translation: '晴天的时候，西湖水波荡漾，波光闪闪，真是好看；下雨的时候，远山笼着薄雾，也奇妙得很。要是把西湖比作美人西施，那么淡妆也美，浓抹也美，怎么打扮都合适。',
        },
        {
          kind: 'note',
          text: '「潋滟」是水波荡漾、波光闪动的样子。「空蒙」是雾气蒙蒙。「西子」就是春秋时的美女西施。这首诗之后，西湖就有了「西子湖」的名字。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'qianjia-westlake-rain',
          text: '晴天雨天都好看的西湖，像怎么打扮都美的西施。',
        },
      ],
    },
    {
      title: '第六课 · 题西林壁（苏轼）',
      art: 'qianjia-lushan',
      artPrompt: '庐山云雾中，横看是连绵的山岭，侧看是陡峭的山峰，远近高低各不相同，一个旅人站在山路上四下张望',
      blocks: [
        {
          kind: 'poem',
          text: '横看成岭侧成峰，远近高低各不同。不识庐山真面目，只缘身在此山中。',
          pinyin: 'héng kàn chéng lǐng cè chéng fēng, yuǎn jìn gāo dī gè bù tóng. bù shí lú shān zhēn miàn mù, zhǐ yuán shēn zài cǐ shān zhōng.',
          translation: '横着看是连绵的山岭，侧着看是陡峭的山峰，从远处看、近处看、高处看、低处看，样子各不相同。为什么认不清庐山的真面目呢？只因为自己就站在这座山里面呀。',
        },
        {
          kind: 'note',
          text: '「缘」是因为。这首诗在讲一个大道理：站在事情里面，往往看不清事情的真相；跳出来远一点、换个方向，才能看清全貌。你和小朋友吵架时，是不是也「只缘身在此山中」呢？',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'qianjia-lushan',
          text: '庐山横看是岭，侧看是峰，怎么看都不一样。',
        },
      ],
    },
    {
      title: '第七课 · 秋思（张籍）',
      art: 'qianjia-homesick-letter',
      artPrompt: '洛阳城里秋风落叶，一个穿长衫的书生在灯下写家书，写了一半又停下发愁，信封拆了又封',
      blocks: [
        {
          kind: 'poem',
          text: '洛阳城里见秋风，欲作家书意万重。复恐匆匆说不尽，行人临发又开封。',
          pinyin: 'luò yáng chéng lǐ jiàn qiū fēng, yù zuò jiā shū yì wàn chóng. fù kǒng cōng cōng shuō bù jìn, xíng rén lín fā yòu kāi fēng.',
          translation: '洛阳城里刮起了秋风，想给家里写封信，心里的话有千层万层。又怕匆匆忙忙写不完、说不尽，送信的人都要出发了，又赶紧把信封拆开，再添上几句。',
        },
        {
          kind: 'note',
          text: '「意万重」是心里的话多得数不清。「行人」这里指要出发去送信的人。「开封」就是把已经封好的信封再拆开。一个「又开封」的动作，把想家的心情写得满满的。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'qianjia-homesick-letter',
          text: '秋风里写家书，信封封上了又拆开。',
        },
      ],
    },
    {
      title: '第八课 · 游山西村（陆游）',
      art: 'qianjia-mountain-village',
      artPrompt: '山重水复的村庄小路，柳树成荫、鲜花明艳，前头像没路了又转出一个村子，农人端着腊酒鸡豚招待客人',
      blocks: [
        {
          kind: 'poem',
          text: '莫笑农家腊酒浑，丰年留客足鸡豚。山重水复疑无路，柳暗花明又一村。',
          pinyin: 'mò xiào nóng jiā là jiǔ hún, fēng nián liú kè zú jī tún. shān chóng shuǐ fù yí wú lù, liǔ àn huā míng yòu yī cūn.',
          translation: '别笑话农家的腊酒浑浊不清，丰收的年头，他们拿出鸡和肉，满满地招待客人。山一重水一重，正疑心前面没有路了——柳树成荫、鲜花明艳处，又出现了一个村庄。',
        },
        {
          kind: 'note',
          text: '「腊酒」是腊月酿的酒。「豚」是小猪，这里指猪肉。「疑无路」是最有名的一联：遇到困难、觉得走不下去的时候，别灰心，接着走，前面往往就是「柳暗花明」。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'qianjia-mountain-village',
          text: '山重水复没路了，一转弯，柳暗花明又有个村子。',
        },
      ],
    },
  ],
  rights: {
    workTitle: '千家诗选八首（王安石、苏轼、张籍、陆游）',
    author: '王安石、苏轼、张籍、陆游',
    authorDeathYear: 1210,
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: 'https://zh.wikisource.org',
    note: '四位诗人卒年分别为王安石 1086、苏轼 1101、张籍约 830、陆游 1210，均远超著作权保护期；通行本逐字核对，拼音与白话译文由平台撰写',
  },
}
