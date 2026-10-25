import type { PackBook } from '../types'

/**
 * 《百家姓》校订共读版（2026-10-23）。保持原书编号与9课顺序。
 * 底本：chinese-poetry/chinese-poetry，71行568字（含4字结语）；来源与异文见 docs/75。
 * 原文为公版；注音、姓氏分词与共读提示为桃阅读校订，不是现代出版社绘本。
 */
export const baiJiaXing: PackBook = {
  id: "baijiaxing-zhao",
  title: "百家姓",
  author: "佚名（北宋）",
  lang: "zh",
  category: "primer",
  ageStage: "3-5",
  intro: "从“赵钱孙李”读到“百家姓终”，分9课认识单姓和复姓。姓氏不分高低；书中没有收全今天所有人的姓。建议亲子每次读一两行，不要求整本背诵。",
  coverArt: "surnames-family-scroll",
  coverArtPrompt: "现代中国家庭共读《百家姓》的无字封面插画：一位家长与两名儿童围坐木桌，翻开一本没有文字的米白色书，窗外一棵枝叶舒展的大树象征不同家庭的连接，温暖晨光，人物比例自然，亲切平等，画面饱满。竖幅3:4，纯画面，无汉字、字母、标牌或水印；不把画中人物当作某一姓氏的祖先。",
  coverFrom: "#FFE0B2",
  coverTo: "#FFB74D",
  source: "公版古籍《百家姓》所选底本全篇（71行），附姓氏注音、分词与原创共读提示",
  chapters: [
    {
      title: "第一课 · 赵钱孙李 · 佚名",
      art: 'baijiaxing-zhao:ch1',
      artPrompt: "《百家姓》亲子共读主题插画：晨光里的现代家庭书桌，家长和两名儿童一起翻看无字绘本，窗外大树枝叶舒展，桌上仅有一本打开的书和两支彩笔。横幅16:9，明亮水彩绘本风，清晰线条，人物比例自然；纯画面，无汉字、字母、标牌或水印，不指定任何人物的姓氏或祖先身份。",
      blocks: [
      {
        kind: 'poem',
        text: "赵钱孙李，周吴郑王。\n冯陈褚卫，蒋沈韩杨。\n朱秦尤许，何吕施张。\n孔曹严华，金魏陶姜。\n戚谢邹喻，柏水窦章。\n云苏潘葛，奚范彭郎。\n鲁韦昌马，苗凤花方。\n俞任袁柳，酆鲍史唐。",
        pinyin: "zhào qián sūn lǐ， zhōu wú zhèng wáng。\nféng chén chǔ wèi， jiǎng shěn hán yáng。\nzhū qín yóu xǔ， hé lǚ shī zhāng。\nkǒng cáo yán huà， jīn wèi táo jiāng。\nqī xiè zōu yù， bǎi shuǐ dòu zhāng。\nyún sū pān gě， xī fàn péng láng。\nlǔ wéi chāng mǎ， miáo fèng huā fāng。\nyú rén yuán liǔ， fēng bào shǐ táng。",
        translation: "姓氏分开读：赵、钱、孙、李、周、吴、郑、王。\n姓氏分开读：冯、陈、褚、卫、蒋、沈、韩、杨。\n姓氏分开读：朱、秦、尤、许、何、吕、施、张。\n姓氏分开读：孔、曹、严、华、金、魏、陶、姜。\n姓氏分开读：戚、谢、邹、喻、柏、水、窦、章。\n姓氏分开读：云、苏、潘、葛、奚、范、彭、郎。\n姓氏分开读：鲁、韦、昌、马、苗、凤、花、方。\n姓氏分开读：俞、任、袁、柳、酆、鲍、史、唐。",
      },
      {
        kind: 'note',
        text: "《百家姓》是一部姓氏韵文，不是人口排名，也不是地位排名。“百家”表示很多家。书中没有收全今天所有人的姓，找不到自己的姓也很正常。试着介绍：“我姓……”。",
        art: 'lamp-hint',
      }
      ],
    },
    {
      title: "第二课 · 费廉岑薛 · 佚名",
      art: 'baijiaxing-zhao:ch2',
      artPrompt: "《百家姓》亲子共读主题插画：阳光下的公园草地，四名儿童围成半圆彼此介绍，成人在旁温和陪伴，衣服颜色各不相同，突出互相认识和平等尊重。横幅16:9，明亮水彩绘本风，清晰线条，人物比例自然；纯画面，无汉字、字母、标牌或水印，不指定任何人物的姓氏或祖先身份。",
      blocks: [
      {
        kind: 'poem',
        text: "费廉岑薛，雷贺倪汤。\n滕殷罗毕，郝邬安常。\n乐于时傅，皮卞齐康。\n伍余元卜，顾孟平黄。\n和穆萧尹，姚邵湛汪。\n祁毛禹狄，米贝明臧。\n计伏成戴，谈宋茅庞。\n熊纪舒屈，项祝董梁。",
        pinyin: "fèi lián cén xuē， léi hè ní tāng。\nténg yīn luó bì， hǎo wū ān cháng。\nyuè yú shí fù， pí biàn qí kāng。\nwǔ yú yuán bǔ， gù mèng píng huáng。\nhé mù xiāo yǐn， yáo shào zhàn wāng。\nqí máo yǔ dí， mǐ bèi míng zāng。\njì fú chéng dài， tán sòng máo páng。\nxióng jǐ shū qū， xiàng zhù dǒng liáng。",
        translation: "姓氏分开读：费、廉、岑、薛、雷、贺、倪、汤。\n姓氏分开读：滕、殷、罗、毕、郝、邬、安、常。\n姓氏分开读：乐、于、时、傅、皮、卞、齐、康。\n姓氏分开读：伍、余、元、卜、顾、孟、平、黄。\n姓氏分开读：和、穆、萧、尹、姚、邵、湛、汪。\n姓氏分开读：祁、毛、禹、狄、米、贝、明、臧。\n姓氏分开读：计、伏、成、戴、谈、宋、茅、庞。\n姓氏分开读：熊、纪、舒、屈、项、祝、董、梁。",
      },
      {
        kind: 'note',
        text: "认读提示：乐作姓氏时，本版读yuè；纪读jǐ。姓氏的实际读音有家族差异，认识新朋友时，可以礼貌地问对方怎么读。",
        art: 'lamp-hint',
      }
      ],
    },
    {
      title: "第三课 · 杜阮蓝闵 · 佚名",
      art: 'baijiaxing-zhao:ch3',
      artPrompt: "《百家姓》亲子共读主题插画：明亮的家庭阅读角，家长用手指指向无字书的一行，孩子认真倾听，书架与绿植作简单背景，表现遇到陌生姓氏一起查证。横幅16:9，明亮水彩绘本风，清晰线条，人物比例自然；纯画面，无汉字、字母、标牌或水印，不指定任何人物的姓氏或祖先身份。",
      blocks: [
      {
        kind: 'poem',
        text: "杜阮蓝闵，席季麻强。\n贾路娄危，江童颜郭。\n梅盛林刁，钟徐邱骆。\n高夏蔡田，樊胡凌霍。\n虞万支柯，昝管卢莫。\n经房裘缪，干解应宗。\n丁宣贲邓，郁单杭洪。\n包诸左石，崔吉钮龚。",
        pinyin: "dù ruǎn lán mǐn， xí jì má qiáng。\njiǎ lù lóu wēi， jiāng tóng yán guō。\nméi shèng lín diāo， zhōng xú qiū luò。\ngāo xià cài tián， fán hú líng huò。\nyú wàn zhī kē， zǎn guǎn lú mò。\njīng fáng qiú miào， gān xiè yīng zōng。\ndīng xuān bēn dèng， yù shàn háng hóng。\nbāo zhū zuǒ shí， cuī jí niǔ gōng。",
        translation: "姓氏分开读：杜、阮、蓝、闵、席、季、麻、强。\n姓氏分开读：贾、路、娄、危、江、童、颜、郭。\n姓氏分开读：梅、盛、林、刁、钟、徐、邱、骆。\n姓氏分开读：高、夏、蔡、田、樊、胡、凌、霍。\n姓氏分开读：虞、万、支、柯、昝、管、卢、莫。\n姓氏分开读：经、房、裘、缪、干、解、应、宗。\n姓氏分开读：丁、宣、贲、邓、郁、单、杭、洪。\n姓氏分开读：包、诸、左、石、崔、吉、钮、龚。",
      },
      {
        kind: 'note',
        text: "认读提示：缪读miào，解读xiè，应读yīng，单独作姓的单读shàn；复姓单于中的单读chán。读音要结合姓氏看，不能照普通词语猜。",
        art: 'lamp-hint',
      }
      ],
    },
    {
      title: "第四课 · 程嵇邢滑 · 佚名",
      art: 'baijiaxing-zhao:ch4',
      artPrompt: "《百家姓》亲子共读主题插画：竹影映在安静书房的窗边，亲子对照两本无字书，孩子轻轻指着书页，成人微笑回应，表现字形相近也需要认真辨别。横幅16:9，明亮水彩绘本风，清晰线条，人物比例自然；纯画面，无汉字、字母、标牌或水印，不指定任何人物的姓氏或祖先身份。",
      blocks: [
      {
        kind: 'poem',
        text: "程嵇邢滑，裴陆荣翁。\n荀羊於惠，甄麴家封。\n芮羿储靳，汲邴糜松。\n井段富巫，乌焦巴弓。\n牧隗山谷，车侯宓蓬。\n全郗班仰，秋仲伊宫。\n宁仇栾暴，甘钭厉戎。\n祖武符刘，景詹束龙。",
        pinyin: "chéng jī xíng huá， péi lù róng wēng。\nxún yáng yū huì， zhēn qū jiā fēng。\nruì yì chǔ jìn， jí bǐng mí sōng。\njǐng duàn fù wū， wū jiāo bā gōng。\nmù wěi shān gǔ， chē hóu mì péng。\nquán xī bān yǎng， qiū zhòng yī gōng。\nnìng qiú luán bào， gān tǒu lì róng。\nzǔ wǔ fú liú， jǐng zhān shù lóng。",
        translation: "姓氏分开读：程、嵇、邢、滑、裴、陆、荣、翁。\n姓氏分开读：荀、羊、於、惠、甄、麴、家、封。\n姓氏分开读：芮、羿、储、靳、汲、邴、糜、松。\n姓氏分开读：井、段、富、巫、乌、焦、巴、弓。\n姓氏分开读：牧、隗、山、谷、车、侯、宓、蓬。\n姓氏分开读：全、郗、班、仰、秋、仲、伊、宫。\n姓氏分开读：宁、仇、栾、暴、甘、钭、厉、戎。\n姓氏分开读：祖、武、符、刘、景、詹、束、龙。",
      },
      {
        kind: 'note',
        text: "本课保留“於”（yū）和“麴”（qū），不把於姓与第二课的于姓（yú）混写。宁读nìng，仇读qiú。隗、宓等姓在不同家族可能有不同读法，本版选一种常见读音。",
        art: 'lamp-hint',
      }
      ],
    },
    {
      title: "第五课 · 叶幸司韶 · 佚名",
      art: 'baijiaxing-zhao:ch5',
      artPrompt: "《百家姓》亲子共读主题插画：小桥边的社区花园，孩子和家人并肩散步，岸边柳树与远处屋舍清晰可见，蓝天柔光，画面表现来自不同家庭的人们共同生活。横幅16:9，明亮水彩绘本风，清晰线条，人物比例自然；纯画面，无汉字、字母、标牌或水印，不指定任何人物的姓氏或祖先身份。",
      blocks: [
      {
        kind: 'poem',
        text: "叶幸司韶，郜黎蓟薄。\n印宿白怀，蒲邰从鄂。\n索咸籍赖，卓蔺屠蒙。\n池乔阴郁，胥能苍双。\n闻莘党翟，谭贡劳逄。\n姬申扶堵，冉宰郦雍。\n郤璩桑桂，濮牛寿通。\n边扈燕冀，郏浦尚农。",
        pinyin: "yè xìng sī sháo， gào lí jì bó。\nyìn sù bái huái， pú tái cóng è。\nsuǒ xián jí lài， zhuó lìn tú méng。\nchí qiáo yīn yù， xū nài cāng shuāng。\nwén shēn dǎng zhái， tán gòng láo páng。\njī shēn fú dǔ， rǎn zǎi lì yōng。\nxì qú sāng guì， pú niú shòu tōng。\nbiān hù yān jì， jiá pǔ shàng nóng。",
        translation: "姓氏分开读：叶、幸、司、韶、郜、黎、蓟、薄。\n姓氏分开读：印、宿、白、怀、蒲、邰、从、鄂。\n姓氏分开读：索、咸、籍、赖、卓、蔺、屠、蒙。\n姓氏分开读：池、乔、阴、郁、胥、能、苍、双。\n姓氏分开读：闻、莘、党、翟、谭、贡、劳、逄。\n姓氏分开读：姬、申、扶、堵、冉、宰、郦、雍。\n姓氏分开读：郤、璩、桑、桂、濮、牛、寿、通。\n姓氏分开读：边、扈、燕、冀、郏、浦、尚、农。",
      },
      {
        kind: 'note',
        text: "本课按所选底本保留“池乔阴郁”；其他版本可见“池乔阳郁”。薄读bó，能作姓氏本版读nài，燕读yān。这里是姓氏表，不把“阴郁”当作一个词来解释。",
        art: 'lamp-hint',
      }
      ],
    },
    {
      title: "第六课 · 温别庄晏 · 佚名",
      art: 'baijiaxing-zhao:ch6',
      artPrompt: "《百家姓》亲子共读主题插画：暖阳里的社区图书馆，一位长者和两名孩子围坐圆桌听读，桌面只有一本无字书，背景书架整齐，表现耐心慢读与代际共读。横幅16:9，明亮水彩绘本风，清晰线条，人物比例自然；纯画面，无汉字、字母、标牌或水印，不指定任何人物的姓氏或祖先身份。",
      blocks: [
      {
        kind: 'poem',
        text: "温别庄晏，柴瞿阎充。\n慕连茹习，宦艾鱼容。\n向古易慎，戈廖庾终。\n暨居衡步，都耿满弘。\n匡国文寇，广禄阙东。\n欧殳沃利，蔚越夔隆。\n师巩厍聂，晁勾敖融。\n冷訾辛阚，那简饶空。",
        pinyin: "wēn bié zhuāng yàn， chái qú yán chōng。\nmù lián rú xí， huàn ài yú róng。\nxiàng gǔ yì shèn， gē liào yǔ zhōng。\njì jū héng bù， dū gěng mǎn hóng。\nkuāng guó wén kòu， guǎng lù quē dōng。\nōu shū wò lì， yù yuè kuí lóng。\nshī gǒng shè niè， cháo gōu áo róng。\nlěng zī xīn kàn， nā jiǎn ráo kōng。",
        translation: "姓氏分开读：温、别、庄、晏、柴、瞿、阎、充。\n姓氏分开读：慕、连、茹、习、宦、艾、鱼、容。\n姓氏分开读：向、古、易、慎、戈、廖、庾、终。\n姓氏分开读：暨、居、衡、步、都、耿、满、弘。\n姓氏分开读：匡、国、文、寇、广、禄、阙、东。\n姓氏分开读：欧、殳、沃、利、蔚、越、夔、隆。\n姓氏分开读：师、巩、厍、聂、晁、勾、敖、融。\n姓氏分开读：冷、訾、辛、阚、那、简、饶、空。",
      },
      {
        kind: 'note',
        text: "认读提示：都读dū，蔚作姓氏本版读yù，那读nā。蔚蓝的蔚通常读wèi，在姓氏里要另行确认。每次读一两行，遇到不会读的字可以停下来和家长查证。",
        art: 'lamp-hint',
      }
      ],
    },
    {
      title: "第七课 · 曾毋沙乜 · 佚名",
      art: 'baijiaxing-zhao:ch7',
      artPrompt: "《百家姓》亲子共读主题插画：现代教室的活动桌旁，四名儿童把两块相邻的空白积木并放在一起，成人耐心陪伴，表现两个字组成一个复姓的概念，积木不画文字。横幅16:9，明亮水彩绘本风，清晰线条，人物比例自然；纯画面，无汉字、字母、标牌或水印，不指定任何人物的姓氏或祖先身份。",
      blocks: [
      {
        kind: 'poem',
        text: "曾毋沙乜，养鞠须丰。\n巢关蒯相，查后荆红。\n游竺权逯，盖益桓公。\n万俟司马，上官欧阳。\n夏侯诸葛，闻人东方。\n赫连皇甫，尉迟公羊。\n澹台公冶，宗政濮阳。\n淳于单于，太叔申屠。",
        pinyin: "zēng wú shā niè， yǎng jū xū fēng。\ncháo guān kuǎi xiàng， zhā hòu jīng hóng。\nyóu zhú quán lù， gě yì huán gōng。\nmò qí sī mǎ， shàng guān ōu yáng。\nxià hóu zhū gě， wén rén dōng fāng。\nhè lián huáng fǔ， yù chí gōng yáng。\ntán tái gōng yě， zōng zhèng pú yáng。\nchún yú chán yú， tài shū shēn tú。",
        translation: "姓氏分开读：曾、毋、沙、乜、养、鞠、须、丰。\n姓氏分开读：巢、关、蒯、相、查、后、荆、红。\n姓氏分开读：游、竺、权、逯、盖、益、桓、公。\n姓氏分开读：万俟、司马、上官、欧阳。\n姓氏分开读：夏侯、诸葛、闻人、东方。\n姓氏分开读：赫连、皇甫、尉迟、公羊。\n姓氏分开读：澹台、公冶、宗政、濮阳。\n姓氏分开读：淳于、单于、太叔、申屠。",
      },
      {
        kind: 'note',
        text: "从“万俟司马”开始认识复姓：万俟、司马、上官、欧阳都是两个字合起来的姓。万俟读mò qí，尉迟读yù chí，澹台读tán tái；前面的曾读zēng，查读zhā。",
        art: 'lamp-hint',
      }
      ],
    },
    {
      title: "第八课 · 公孙仲孙 · 佚名",
      art: 'baijiaxing-zhao:ch8',
      artPrompt: "《百家姓》亲子共读主题插画：一棵枝叶展开的大树下，家长与两名儿童一起观察分叉树枝，旁边有一本打开的无字书，表现不同家庭都有自己的姓氏，避免族谱文字和身份刻板印象。横幅16:9，明亮水彩绘本风，清晰线条，人物比例自然；纯画面，无汉字、字母、标牌或水印，不指定任何人物的姓氏或祖先身份。",
      blocks: [
      {
        kind: 'poem',
        text: "公孙仲孙，轩辕令狐。\n钟离宇文，长孙慕容。\n鲜于闾丘，司徒司空。\n亓官司寇，仉督子车。\n颛孙端木，巫马公西。\n漆雕乐正，壤驷公良。\n拓跋夹谷，宰父谷梁。\n晋楚闫法，汝鄢涂钦。",
        pinyin: "gōng sūn zhòng sūn， xuān yuán líng hú。\nzhōng lí yǔ wén， zhǎng sūn mù róng。\nxiān yú lǘ qiū， sī tú sī kōng。\nqí guān sī kòu， zhǎng dū zǐ jū。\nzhuān sūn duān mù， wū mǎ gōng xī。\nqī diāo yuè zhèng， rǎng sì gōng liáng。\ntuò bá jiā gǔ， zǎi fǔ gǔ liáng。\njìn chǔ yán fǎ， rǔ yān tú qīn。",
        translation: "姓氏分开读：公孙、仲孙、轩辕、令狐。\n姓氏分开读：钟离、宇文、长孙、慕容。\n姓氏分开读：鲜于、闾丘、司徒、司空。\n姓氏分开读：亓官、司寇、仉、督、子车。\n姓氏分开读：颛孙、端木、巫马、公西。\n姓氏分开读：漆雕、乐正、壤驷、公良。\n姓氏分开读：拓跋、夹谷、宰父、谷梁。\n姓氏分开读：晋、楚、闫、法、汝、鄢、涂、钦。",
      },
      {
        kind: 'note',
        text: "复姓不要拆开：长孙读zhǎng sūn，子车读zǐ jū，乐正读yuè zhèng，宰父读zǎi fǔ。本版把“仉督”分作仉、督两个单姓；“晋楚闫法，汝鄢涂钦”也是单姓。不同版本的分姓与写法会有差异。",
        art: 'lamp-hint',
      }
      ],
    },
    {
      title: "第九课 · 段干百里 · 佚名",
      art: 'baijiaxing-zhao:ch9',
      artPrompt: "《百家姓》亲子共读主题插画：傍晚前的明亮庭院，来自不同家庭的六个人围坐圆桌分享阅读，儿童、家长与长者神情放松，桌上一本合上的无字书，表现读完全书后友好交流，暖金色日光而非夜景。横幅16:9，明亮水彩绘本风，清晰线条，人物比例自然；纯画面，无汉字、字母、标牌或水印，不指定任何人物的姓氏或祖先身份。",
      blocks: [
      {
        kind: 'poem',
        text: "段干百里，东郭南门。\n呼延归海，羊舌微生。\n岳帅缑亢，况后有琴。\n梁丘左丘，东门西门。\n商牟佘佴，伯赏南宫。\n墨哈谯笪，年爱阳佟。\n第五言福，百家姓终。",
        pinyin: "duàn gān bǎi lǐ， dōng guō nán mén。\nhū yán guī hǎi， yáng shé wēi shēng。\nyuè shuài gōu kàng， kuàng hòu yǒu qín。\nliáng qiū zuǒ qiū， dōng mén xī mén。\nshāng móu shé nài， bó shǎng nán gōng。\nmò hǎ qiáo dá， nián ài yáng tóng。\ndì wǔ yán fú， bǎi jiā xìng zhōng。",
        translation: "姓氏分开读：段干、百里、东郭、南门。\n姓氏分开读：呼延、归、海、羊舌、微生。\n姓氏分开读：岳、帅、缑、亢、况、后、有、琴。\n姓氏分开读：梁丘、左丘、东门、西门。\n姓氏分开读：商、牟、佘、佴、伯、赏、南宫。\n姓氏分开读：墨、哈、谯、笪、年、爱、阳、佟。\n第五、言、福是姓氏。“百家姓终”表示全书结束。",
      },
      {
        kind: 'note',
        text: "“段干”“百里”“南宫”“第五”都是复姓；“百家姓终”是全书的结束语，不是四个姓。本版将归、海分作单姓；“商牟佘佴，伯赏南宫”分作商、牟、佘、佴、伯、赏、南宫。不同资料有合姓记载，分姓存在版本差异。读完后，可以聊聊家人和朋友的姓，不根据姓氏猜测性格或亲疏。",
        art: 'lamp-hint',
      }
      ],
    }
  ],
  rights: {
    workTitle: "百家姓",
    author: "佚名（北宋）",
    authorDeathYear: -1,
    translator: '桃阅读',
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: "https://github.com/chinese-poetry/chinese-poetry/blob/fa1814a8044db4fb0c7a9e0a0449974e8c3463b7/蒙学/baijiaxing.json",
    note: "所选开放语料底本71行全篇，含“百家姓终”结语；不声称收全现实姓氏。保留“池乔阴郁”异文，於与于、麴与曲作姓氏时分别保留；注音、分词及共读提示由桃阅读校订，家族异读以本人确认为准。正文公版，插画另由AI生成，不复制现代绘本。",
  },
}
