import type { PackBook } from '../types'

/**
 * 《元曲选》——由 scripts/gen-corpus.mjs 从公版语料生成（2026-09-20 全面补全）。
 * 底本：元曲选（元代曲家）。逐字来自语料数据集，译文为平台自撰白话。
 * 所选元曲作者卒年均逾保护期；注音与白话译文为平台自撰。
 */
export const yuanQu: PackBook = {
  id: "poetry-yuanqu",
  title: "元曲选",
  author: "马致远 / 张养浩 等",
  lang: "zh",
  category: "poetry",
  ageStage: "9-12",
  intro: "天净沙、山坡羊……元代的「歌词」，句子歪歪扭扭却特别好听。",
  coverArt: "yuanqu-cover",
  coverArtPrompt: "一幅元曲意境长卷：枯藤老树昏鸦与小桥流水人家，远处夕阳西下，一个骑瘦马的人走在古道上，白草红叶黄花点缀山间",
  coverFrom: "#5D4037",
  coverTo: "#D7A86E",
  source: "元人散曲选，通行本逐字注音",
  chapters: [
    {
      title: "草桥店梦莺莺(第四本)・折桂令 · 王实甫",
      art: "poetry-moon",
      artPrompt: "古诗《草桥店梦莺莺(第四本)・折桂令》意境插画：想人生最苦离别，可怜见千里关山，独自跋涉。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "想人生最苦离别，可怜见千里关山，独自跋涉。\n似这般割肚牵肠，倒不如义断恩绝。\n虽然是一时间花残月缺，休猜做瓶坠簪折。\n不恋豪杰，不羡骄奢；自愿的生则同衾，死则同穴。",
        pinyin: "xiǎng rén shēng zuì kǔ lí bié， kě lián jiàn qiān lǐ guān shān， dú zì bá shè。\nsì zhè bān gē dù qiān cháng， dǎo bù rú yì duàn ēn jué。\nsuī rán shì yī shí jiān huā cán yuè quē， xiū cāi zuò píng zhuì zān zhé。\nbù liàn háo jié， bù xiàn jiāo shē； zì yuàn de shēng zé tóng qīn， sǐ zé tóng xué。",
        translation: "人生最苦的是离别，可怜她独自跋涉，走过千里关山。像这样牵肠挂肚地痛苦，倒不如把情义干脆断绝。虽然一时像花儿凋残、月亮缺了，可不要猜疑情意真的碎了；不爱恋豪杰，不羡慕富贵，只愿意活着的时候同盖一床被子，死了也要葬在同一个墓穴。",
      }
      ],
    },
    {
      title: "双调・百字折桂令 · 白贲",
      art: "poetry-moon",
      artPrompt: "古诗《双调・百字折桂令》意境插画：弊裘尘土压征鞍鞭倦袅芦花，弓剑萧萧，一径入烟霞。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "弊裘尘土压征鞍鞭倦袅芦花，弓剑萧萧，一径入烟霞。\n动羁怀西风木叶秋水兼葭，千点万点老树昏鸦，三行两行写长空哑哑雁落平沙。\n曲岸西边近水湾鱼网纶竿钓槎，断桥东壁傍溪山竹篱茅舍人家。\n满山满谷，红叶黄花，正是伤感凄凉时候，离人又在天涯。\n套数。",
        pinyin: "bì qiú chén tǔ yā zhēng ān biān juàn niǎo lú huā， gōng jiàn xiāo xiāo， yī jìng rù yān xiá。\ndòng jī huái xī fēng mù yè qiū shuǐ jiān jiā， qiān diǎn wàn diǎn lǎo shù hūn yā， sān háng liǎng háng xiě cháng kōng yǎ yǎ yàn luò píng shā。\nqǔ àn xī biān jìn shuǐ wān yú wǎng lún gān diào chá， duàn qiáo dōng bì bàng xī shān zhú lí máo shè rén jiā。\nmǎn shān mǎn gǔ， hóng yè huáng huā， zhèng shì shāng gǎn qī liáng shí hòu， lí rén yòu zài tiān yá。\ntào shù。",
        translation: "破旧的皮裘沾满尘土，压在马鞍上，赶路的人连马鞭都懒得挥动，带着弓和剑，沿着小路走进烟霞深处。西风吹落树叶，秋水边的芦苇勾起游子的愁思；老树上落满成群的乌鸦，天上的大雁一行行叫着落到沙洲上。弯弯的岸边，近水的湾里停着渔网钓竿和小船；断桥的东边，靠着溪山有竹篱茅舍的人家。满山满谷都是红叶黄花，正是伤感凄凉的时节，远行的人又飘零在天涯。",
      }
      ],
    },
    {
      title: "李云英风送梧桐叶・沉醉东风 · 李唐宾",
      art: "cloud-flight",
      artPrompt: "古诗《李云英风送梧桐叶・沉醉东风》意境插画：为兵戈担惊受恐，折夫妻断梗飘蓬。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "为兵戈担惊受恐，折夫妻断梗飘蓬。\n泣枕鸳，悲衾凤，谁知道这搭儿重逢。\n犹道相看是梦中，挨了些凄凉万种。",
        pinyin: "wèi bīng gē dān jīng shòu kǒng， zhé fū qī duàn gěng piāo péng。\nqì zhěn yuān， bēi qīn fèng， shuí zhī dào zhè dā ér chóng féng。\nyóu dào xiāng kàn shì mèng zhōng， āi le xiē qī liáng wàn zhǒng。",
        translation: "因为战乱担惊受怕，夫妻俩像断了的草茎、飘飞的蓬草一样各自漂泊。枕上哭泣，被中悲伤，谁知道居然在这里重新相逢。还互相看着，以为是在梦里，原来彼此都挨过了千种万种凄凉的滋味。",
      }
      ],
    },
    {
      title: "双调・沉醉东风秋日湘阴道中 · 赵善庆",
      art: "sunrise-hills",
      artPrompt: "古诗《双调・沉醉东风秋日湘阴道中》意境插画：山对面蓝堆翠岫，草齐腰绿染沙洲。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "山对面蓝堆翠岫，草齐腰绿染沙洲。\n傲霜橘柚青，濯雨蒹葭秀。\n隔沧波隐隐江楼，点破萧湘万顷秋，是几叶儿傅黄败柳？昭君出塞图毡帐冷柔情挽挽，黑河秋塞草斑斑。\n丹青误写情，环佩难归汉。\n抱琵琶怨杀和番，比似丹青旧玉颜，又越添愁眉泪眼。",
        pinyin: "shān duì miàn lán duī cuì xiù， cǎo qí yāo lǜ rǎn shā zhōu。\nào shuāng jú yòu qīng， zhuó yǔ jiān jiā xiù。\ngé cāng bō yǐn yǐn jiāng lóu， diǎn pò xiāo xiāng wàn qǐng qiū， shì jǐ yè ér fù huáng bài liǔ？ zhāo jūn chū sài tú zhān zhàng lěng róu qíng wǎn wǎn， hēi hé qiū sāi cǎo bān bān。\ndān qīng wù xiě qíng， huán pèi nán guī hàn。\nbào pí pa yuàn shā hé fān， bǐ sì dān qīng jiù yù yán， yòu yuè tiān chóu méi lèi yǎn。",
        translation: "对面的山层层叠叠，堆满青翠的峰峦，草长得齐腰高，把沙洲染成一片绿。经得起霜打的橘柚还青青的，雨水洗过的芦苇格外秀美；隔着苍茫的江水，隐隐约约能望见江边的楼阁，几点枯黄的柳叶，点破了湘江万顷秋色。再看昭君出塞的图画：毡帐冷冷清清，黑河边的秋草斑斑驳驳；只怪画师画错了她的容颜，戴着环佩的她再也回不了汉朝，抱着琵琶满怀怨恨地出塞和亲，比起画上从前的美丽模样，更添了愁眉和泪眼。",
      }
      ],
    },
    {
      title: "双调・寿阳曲 · 严忠济",
      art: "poetry-moon",
      artPrompt: "古诗《双调・寿阳曲》意境插画：三闾些，伍子歌，利名阳几人参破？算来都不如蓝采和，被这几文钱把这小儿瞒过。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "三闾些，伍子歌，利名阳几人参破？算来都不如蓝采和，被这几文钱把这小儿瞒过。",
        pinyin: "sān lǘ xiē， wǔ zǐ gē， lì míng yáng jǐ rén cān pò？ suàn lái dōu bù rú lán cǎi hé， bèi zhè jǐ wén qián bǎ zhè xiǎo ér mán guò。",
        translation: "屈原写过楚辞，伍子胥的故事也被编成了歌，可是名利这条路上，能有几个人真正看破呢？算来算去都不如蓝采和，他装作痴迷的孩子，笑看世人被区区几文钱哄得团团转。",
      }
      ],
    },
    {
      title: "双调・寿阳曲 · 姚燧",
      art: "poetry-moon",
      artPrompt: "古诗《双调・寿阳曲》意境插画：酒可红双颊，愁能白二毛，对樽前尽可开怀χ。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "酒可红双颊，愁能白二毛，对樽前尽可开怀χ。\n天若有情天亦老，且休教少年知道。\n红颜褪，绿鬓凋，酒席上渐疏了欢笑。\n风流近来都忘了，谁信道也曾年少？襄王梦，神女情，多般儿酿成愁病。\n琵琶慢调弦上声，相思字越弹着不应。\n咏李白贵妃亲擎砚，力士与脱靴，御调羹就飧不谢。\n醉模糊将吓蛮书便写，写着甚杨柳岸晓风残月。",
        pinyin: "jiǔ kě hóng shuāng jiá， chóu néng bái èr máo， duì zūn qián jìn kě kāi huáiχ。\ntiān ruò yǒu qíng tiān yì lǎo， qiě xiū jiào shào nián zhī dào。\nhóng yán tuì， lǜ bìn diāo， jiǔ xí shàng jiàn shū le huān xiào。\nfēng liú jìn lái dōu wàng le， shuí xìn dào yě céng nián shào？ xiāng wáng mèng， shén nǚ qíng， duō bān ér niàng chéng chóu bìng。\npí pa màn tiáo xián shàng shēng， xiāng sī zì yuè tán zhe bù yìng。\nyǒng lǐ bái guì fēi qīn qíng yàn， lì shì yǔ tuō xuē， yù tiáo gēng jiù sūn bù xiè。\nzuì mó hu jiāng xià mán shū biàn xiě， xiě zhe shèn yáng liǔ àn xiǎo fēng cán yuè。",
        translation: "酒能把两边脸颊喝得通红，忧愁能把头发愁得花白，对着酒杯正可以开怀畅饮。天如果有感情，天也会变老，这些愁事别让少年人知道才好。容颜渐渐褪去，黑发渐渐凋零，酒席上的欢笑也一天比一天少；那些风流往事近来都忘了，谁肯相信我也曾经年少呢？巫山的梦、神女的情，种种愁绪酿成了一场病；慢慢调着琵琶弦上的声音，满纸相思的字句，越弹越没有回应。咏李白：杨贵妃亲自为他捧砚台，高力士为他脱靴子，皇帝亲自为他调好汤羹；他醉醺醺地写下吓退蛮人的书信，写的正是“杨柳岸晓风残月”这样的句子。",
      }
      ],
    },
    {
      title: "诈妮子调风月・殿前欢 · 关汉卿",
      art: "poetry-moon",
      artPrompt: "古诗《诈妮子调风月・殿前欢》意境插画：俺千户跨龙驹，称得上的敢望七香车。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "俺千户跨龙驹，称得上的敢望七香车。\n愿结同心结，永挂合欢树。\n蛮凤娇雏，连理枝比目鱼。\n千载相完聚，花发无风雨。\n头白相守，眼黑处全无。",
        pinyin: "ǎn qiān hù kuà lóng jū， chēng dé shàng de gǎn wàng qī xiāng chē。\nyuàn jié tóng xīn jié， yǒng guà hé huān shù。\nmán fèng jiāo chú， lián lǐ zhī bǐ mù yú。\nqiān zǎi xiāng wán jù， huā fā wú fēng yǔ。\ntóu bái xiāng shǒu， yǎn hēi chù quán wú。",
        translation: "我家千户骑着高大的骏马，配得上坐七香车的美人。愿两人结成同心结，永远挂在合欢树上；像娇美的凤凰小鸟，像连理枝、比目鱼一样成双成对。千百年永远团聚在一起，花开的日子再没有风雨；白头到老互相守着，直到眼睛闭上也不分开。",
      }
      ],
    },
    {
      title: "庞涓夜走马陵道・殿前欢 · 无名氏",
      art: "poetry-moon",
      artPrompt: "古诗《庞涓夜走马陵道・殿前欢》意境插画：那唤我的却为谁？(卜商云)先生，你在那里来？(正末唱)在那摘星楼上我便做筵席。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "那唤我的却为谁？(卜商云)先生，你在那里来？(正末唱)在那摘星楼上我便做筵席。\n安排下脱壳金蝉计，我则索躲是逃非。\n(卜商云)庞涓贼，你好狠也。\n(正末唱)这的是他下的我也下的。\n(卜商云)先生，庞涓又来了也。\n(正末唱)哎！缠杀我也天魔祟，我便似小鬼般合扑地。\n(卜商云)你躲时节谁知道来？(正末唱)这公事则除天知地知，(带云)庞涓。\n你怎知我在这里吃茶饭哩。\n(唱)只半合儿使碎我这心机。",
        pinyin: "nà huàn wǒ de què wèi shuí？( bǔ shāng yún) xiān shēng， nǐ zài nà lǐ lái？( zhèng mò chàng) zài nà zhāi xīng lóu shàng wǒ biàn zuò yán xí。\nān pái xià tuō ké jīn chán jì， wǒ zé suǒ duǒ shì táo fēi。\nbǔ shāng yún) páng juān zéi， nǐ hǎo hěn yě。\nzhèng mò chàng) zhè de shì tā xià de wǒ yě xià de。\nbǔ shāng yún) xiān shēng， páng juān yòu lái le yě。\nzhèng mò chàng) āi！ chán shā wǒ yě tiān mó suì， wǒ biàn sì xiǎo guǐ bān hé pū dì。\nbǔ shāng yún) nǐ duǒ shí jié shuí zhī dào lái？( zhèng mò chàng) zhè gōng shì zé chú tiān zhī dì zhī，( dài yún) páng juān。\nnǐ zěn zhī wǒ zài zhè lǐ chī chá fàn lī。\nchàng) zhī bàn hé ér shǐ suì wǒ zhè xīn jī。",
        translation: "是誰在喊我呢？（卜商说：）先生，您从哪里来？（正末唱：）刚才我在摘星楼上摆着筵席，设下金蝉脱壳的计策，只好躲避这场是非。（卜商说：）庞涓这贼，你好狠毒啊。（正末唱：）他能下毒手，我也能下这样的手段。（卜商说：）先生，庞涓又追来了。（正末唱：）哎呀，真被这恶鬼缠得受不了，我像小鬼一样扑倒在地。（卜商说：）您躲起来的时候，谁知道呢？（正末唱：）这件事只有天知道、地知道，庞涓啊，你怎么知道我在这里喝茶吃饭呢？就这么一小会儿，把我的心机都快使碎了。",
      }
      ],
    },
    {
      title: "双调・蟾宫曲怀古 · 查德卿",
      art: "rice-field",
      artPrompt: "古诗《双调・蟾宫曲怀古》意境插画：问从来谁是英雄？一个农夫，一个渔翁。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "问从来谁是英雄？一个农夫，一个渔翁。\n晦迹南阳，栖身东海，一举成功。\n八阵图名成卧龙，《六韬》书功在非熊。\n霸业成空，遗恨无穷。\n蜀道寒云，渭水秋风。\n层楼有感倚西风百尺层楼，一道秦淮，九点齐州。\n塞雁南来，夕阳西下，江水东流。\n愁极处消除是酒，酒醒时依旧多愁。\n山岳糟丘，糊海杯瓯。\n醉了方休，醒后从头。",
        pinyin: "wèn cóng lái shuí shì yīng xióng？ yī gè nóng fū， yī gè yú wēng。\nhuì jì nán yáng， qī shēn dōng hǎi， yī jǔ chéng gōng。\nbā zhèn tú míng chéng wò lóng，《 liù tāo》 shū gōng zài fēi xióng。\nbà yè chéng kōng， yí hèn wú qióng。\nshǔ dào hán yún， wèi shuǐ qiū fēng。\ncéng lóu yǒu gǎn yǐ xī fēng bǎi chǐ céng lóu， yī dào qín huái， jiǔ diǎn qí zhōu。\nsāi yàn nán lái， xī yáng xī xià， jiāng shuǐ dōng liú。\nchóu jí chù xiāo chú shì jiǔ， jiǔ xǐng shí yī jiù duō chóu。\nshān yuè zāo qiū， hú hǎi bēi ōu。\nzuì le fāng xiū， xǐng hòu cóng tóu。",
        translation: "要问自古以来谁是英雄？一个是农夫，一个是渔翁。诸葛亮从前藏身在南阳种田，姜太公栖居在东海边钓鱼，一旦出山就大功告成。诸葛亮凭八阵图名扬天下，人称卧龙；姜太公写下《六韬》立下大功。可惜霸业到头来都成了一场空，遗恨无穷无尽，只剩下蜀道上寒冷的云、渭水上萧瑟的秋风。登楼有感：迎着西风登上百尺高楼，看见一道秦淮河、辽阔的九州大地；大雁从北方飞来，夕阳向西落下，江水向东流去。愁到极点时想用酒来消愁，可酒醒之后照样满怀忧愁；恨不得把山岳当酒糟堆、把大海当酒杯，喝醉了才算罢休，醒后又从头愁起。",
      }
      ],
    },
    {
      title: "双调・蟾宫曲 · 刘唐卿",
      art: "sunrise-hills",
      artPrompt: "古诗《双调・蟾宫曲》意境插画：博山铜细袅香风，两行纱笼，烛影摇红。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "博山铜细袅香风，两行纱笼，烛影摇红。\n翠袖殷勤捧金钟，半露春葱。\n畅好是会受用文章巨公，绮罗业醉眼朦胧。\n夜宴将终，十二帘栊，月转梧桐。",
        pinyin: "bó shān tóng xì niǎo xiāng fēng， liǎng háng shā lóng， zhú yǐng yáo hóng。\ncuì xiù yīn qín pěng jīn zhōng， bàn lù chūn cōng。\nchàng hǎo shì huì shòu yòng wén zhāng jù gōng， qǐ luó yè zuì yǎn méng lóng。\nyè yàn jiāng zhōng， shí èr lián lóng， yuè zhuǎn wú tóng。",
        translation: "铜香炉里细细地飘出袅袅香烟，两行纱灯排开，烛光摇曳泛红。穿着翠绿衣袖的侍女殷勤地捧着金杯，露出半截白嫩的手指。这位大文人真会享受，在绫罗环绕中醉眼朦胧。夜宴快结束时，一道道帘幕之间，月亮已经悄悄转过梧桐树梢。",
      }
      ],
    },
    {
      title: "正宫・鹦鹉曲 · 白贲",
      art: "primer-scroll",
      artPrompt: "古诗《正宫・鹦鹉曲》意境插画：侬家鹦鹉洲边住，是个不识字渔父。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "侬家鹦鹉洲边住，是个不识字渔父。\n浪花中一叶扁舟，睡煞江南烟雨。",
        pinyin: "nóng jiā yīng wǔ zhōu biān zhù， shì gè bù shí zì yú fù。\nlàng huā zhōng yī yè piān zhōu， shuì shà jiāng nán yān yǔ。",
        translation: "我家住在鹦鹉洲边，是个不识字的打渔老人。驾着一叶小舟出没在浪花里，在江南迷蒙的烟雨中睡得又香又甜。",
      }
      ],
    },
    {
      title: "・倚西风目断行云，懒唱大江东去 · 张可久",
      art: "poetry-moon",
      artPrompt: "古诗《・倚西风目断行云，懒唱大江东去》意境插画：幺相从一月秦邮住，笑我是不耕种村父。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "幺相从一月秦邮住，笑我是不耕种村父。\n话醒吟酒不成欢，灯下怯云羞雨。",
        pinyin: "yāo xiāng cóng yī yuè qín yóu zhù， xiào wǒ shì bù gēng zhòng cūn fù。\nhuà xǐng yín jiǔ bù chéng huān， dēng xià qiè yún xiū yǔ。",
        translation: "跟你在一起，在秦邮住了一个多月，你笑我是个不会耕种的乡下老头。清醒时说话、吟诗、喝酒都不痛快，灯下相见还羞羞怯怯的。",
      }
      ],
    },
    {
      title: "中吕・阳春曲别情 · 王伯成",
      art: "river-boat",
      artPrompt: "古诗《中吕・阳春曲别情》意境插画：多情去后香留枕，好梦回时冷透衾，闷愁山重海来深。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "多情去后香留枕，好梦回时冷透衾，闷愁山重海来深。\n独自寝，夜雨百年心。",
        pinyin: "duō qíng qù hòu xiāng liú zhěn， hǎo mèng huí shí lěng tòu qīn， mēn chóu shān zhòng hǎi lái shēn。\ndú zì qǐn， yè yǔ bǎi nián xīn。",
        translation: "心爱的人走后，枕头上还留着香气；好梦醒来时，冷意透过了被子。愁闷像山一样重、像海一样深。一个人孤零零地睡，听着夜里的雨声，这颗心一辈子都牵挂着他。",
      }
      ],
    },
    {
      title: "中吕・阳春曲 · 薛昂夫",
      art: "spring-bird",
      artPrompt: "古诗《中吕・阳春曲》意境插画：坐听西掖钟声动，睡起东窗日影红，山林朝市两无穷。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "坐听西掖钟声动，睡起东窗日影红，山林朝市两无穷。\n一梦中，樽有酒且从容。\n耐惊耐怕黄齑瓮，长满长干老酒盆，一贫尽可张吾军。\n休忘本，樽有酒且论文。\n胸中太华身难憾，舌底狂澜口且缄，看渠暮四与朝三。\n呆大胆，樽有酒且醺酣。\n周郎赤壁鏖兵后，苏子扁舟载月秋，千年慷慨一时酬。\n今在否？樽有酒且绸缪。\n芸窗月影吟情荡，纸帐梅花醉梦香，觉来身世两相忘。\n休妄想，樽有酒且疏狂。\n岁云暮矣虽无补，时复中之尽有余，老来吾亦爱吾庐。\n清债苦，樽有酒且消除。",
        pinyin: "zuò tīng xī yè zhōng shēng dòng， shuì qǐ dōng chuāng rì yǐng hóng， shān lín cháo shì liǎng wú qióng。\nyī mèng zhōng， zūn yǒu jiǔ qiě cóng róng。\nnài jīng nài pà huáng jī wèng， cháng mǎn cháng gān lǎo jiǔ pén， yī pín jìn kě zhāng wú jūn。\nxiū wàng běn， zūn yǒu jiǔ qiě lùn wén。\nxiōng zhōng tài huá shēn nán hàn， shé dǐ kuáng lán kǒu qiě jiān， kàn qú mù sì yǔ cháo sān。\ndāi dà dǎn， zūn yǒu jiǔ qiě xūn hān。\nzhōu láng chì bì áo bīng hòu， sū zǐ piān zhōu zǎi yuè qiū， qiān nián kāng kǎi yī shí chóu。\njīn zài fǒu？ zūn yǒu jiǔ qiě chóu móu。\nyún chuāng yuè yǐng yín qíng dàng， zhǐ zhàng méi huā zuì mèng xiāng， jué lái shēn shì liǎng xiāng wàng。\nxiū wàng xiǎng， zūn yǒu jiǔ qiě shū kuáng。\nsuì yún mù yǐ suī wú bǔ， shí fù zhōng zhī jìn yǒu yú， lǎo lái wú yì ài wú lú。\nqīng zhài kǔ， zūn yǒu jiǔ qiě xiāo chú。",
        translation: "坐着听宫门外钟声响起来，睡起时东窗已映着红日，山林和朝廷各有各的乐趣，都说不完。人生就像一场梦，杯中有酒，且慢慢享用。一瓮腌菜让人不再担心害怕，一盆老酒常满常空，再穷也够我挺起腰杆。别忘本，杯中有酒，且边喝边谈文章。胸中有泰山，谁也撼不动；舌底下虽有大波浪，也要闭口不说，任凭别人朝三暮四耍花样。做个大胆的“呆子”，杯中有酒，且喝个酣畅。周郎在赤壁大战之后，苏东坡乘着小船在秋夜月下泛游，千年豪情一时得到回应。如今他们还在吗？杯中有酒，且尽情尽兴。书窗下月影摇晃，吟诗的兴致荡漾；纸帐外梅花飘香，醉梦香甜，醒来后连自己的身世都忘了。别胡思乱想，杯中有酒，且自在疏狂。一年将尽，虽然帮不上什么忙，随时做点该做的事也绰绰有余，年纪大了我也爱我这间小屋。还债的日子清苦，杯中有酒，且用来消愁解闷。",
      }
      ],
    },
    {
      title: "江州司马青衫泪・喜春来 · 马致远",
      art: "river-boat",
      artPrompt: "古诗《江州司马青衫泪・喜春来》意境插画：既道是江州亡化白司马，因此上飞入寻常百姓家。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "既道是江州亡化白司马，因此上飞入寻常百姓家。\n俺那爱钱娘一日坐八番衙，不由妾不随顺他，有分看些个驼腰柳钓鱼槎。",
        pinyin: "jì dào shì jiāng zhōu wáng huà bái sī mǎ， yīn cǐ shàng fēi rù xún cháng bǎi xìng jiā。\nǎn nà ài qián niáng yī rì zuò bā fān yá， bù yóu qiè bù suí shùn tā， yǒu fēn kàn xiē gè tuó yāo liǔ diào yú chá。",
        translation: "既然说白司马已经死在江州，我便像燕子一样飞入了寻常百姓家。我那贪钱的妈妈一天里像升堂一样逼我八回，由不得我不顺从他，只怕我落得个在弯腰的柳树边看人家钓鱼船的凄凉下场。",
      }
      ],
    },
    {
      title: "晋文公火烧介子推・喜春来 · 狄君厚",
      art: "spring-bird",
      artPrompt: "古诗《晋文公火烧介子推・喜春来》意境插画：你今日修文治国平天下，你如今待演武安邦定杀伐。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "你今日修文治国平天下，你如今待演武安邦定杀伐。\n儿呵，你如今修文演武未通达。\n(带云)罢，罢，至如你便不成呵，(唱)似我也退朝，准肯将你货与帝王家？。",
        pinyin: "nǐ jīn rì xiū wén zhì guó píng tiān xià， nǐ rú jīn dài yǎn wǔ ān bāng dìng shā fá。\nér hē， nǐ rú jīn xiū wén yǎn wǔ wèi tōng dá。\ndài yún) bà， bà， zhì rú nǐ biàn bù chéng hē，( chàng) sì wǒ yě tuì cháo， zhǔn kěn jiāng nǐ huò yǔ dì wáng jiā？。",
        translation: "你如今讲文治，要治国平天下；又要演习武艺，安邦定国去征战。孩子啊，你的文才武艺还没有通达。罢了，罢了，就算你成不了才，像我这样退隐不去做官的人，又怎么肯把你像货物一样卖给帝王家呢？",
      }
      ],
    }
  ],
  rights: {
    workTitle: "元曲选",
    author: "元代曲家",
    authorDeathYear: 1400,
    translator: '桃阅读',
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: "https://github.com/chinese-poetry/chinese-poetry",
    note: "所选元曲作者卒年均逾保护期；注音与白话译文为平台自撰。",
  },
}
