import type { PackBook } from '../types'

/**
 * 《百家姓》——由 scripts/gen-corpus.mjs 从公版语料生成（2026-09-20 全面补全）。
 * 底本：百家姓（佚名（北宋））。逐字来自语料数据集，译文为平台自撰白话。
 * 北宋蒙学课本，作者佚名；注音与白话译文为平台自撰。
 */
export const baiJiaXing: PackBook = {
  id: "baijiaxing-zhao",
  title: "百家姓",
  author: "佚名（北宋）",
  lang: "zh",
  category: "primer",
  ageStage: "3-5",
  intro: "赵钱孙李、周吴郑王——全本《百家姓》，看看你的姓排第几？",
  coverArt: "surnames-family-scroll",
  coverArtPrompt: "一卷古朴的竹简展开，上面写着「赵钱孙李」几个字，旁边有一棵大榕树和一座小桥，远处是江南的粉墙黛瓦",
  coverFrom: "#FFE0B2",
  coverTo: "#FFB74D",
  source: "公版古籍（宋·佚名）节选，逐字注音",
  chapters: [
    {
      title: "第一课 · 赵钱孙李 · 佚名",
      art: 'baijiaxing-zhao:ch1',
      artPrompt: "《三字经》第1课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "赵钱孙李，周吴郑王。\n冯陈褚卫，蒋沈韩杨。\n朱秦尤许，何吕施张。\n孔曹严华，金魏陶姜。\n戚谢邹喻，柏水窦章。\n云苏潘葛，奚范彭郎。\n鲁韦昌马，苗凤花方。\n俞任袁柳，酆鲍史唐。",
        pinyin: "zhào qián sūn lǐ， zhōu wú zhèng wáng。\nféng chén chǔ wèi， jiǎng shěn hán yáng。\nzhū qín yóu xǔ， hé lǚ shī zhāng。\nkǒng cáo yán huá， jīn wèi táo jiāng。\nqī xiè zōu yù， bǎi shuǐ dòu zhāng。\nyún sū pān gě， xī fàn péng láng。\nlǔ wéi chāng mǎ， miáo fèng huā fāng。\nyú rèn yuán liǔ， fēng bào shǐ táng。",
        translation: "这一句都是姓氏：赵钱孙李、周吴郑王。\n这一句都是姓氏：冯陈褚卫、蒋沈韩杨。\n这一句都是姓氏：朱秦尤许、何吕施张。\n这一句都是姓氏：孔曹严华、金魏陶姜。\n这一句都是姓氏：戚谢邹喻、柏水窦章。\n这一句都是姓氏：云苏潘葛、奚范彭郎。\n这一句都是姓氏：鲁韦昌马、苗凤花方。\n这一句都是姓氏：俞任袁柳、酆鲍史唐。",
      },
      {
        kind: 'note',
        text: "这一句都是姓氏：赵钱孙李、冯陈褚卫、朱秦尤许、孔曹严华、戚谢邹喻、云苏潘葛、鲁韦昌马、俞任袁柳……你的姓在第几课？",
        art: 'lamp-hint',
      }
      ],
    },
    {
      title: "第二课 · 费廉岑薛 · 佚名",
      art: 'baijiaxing-zhao:ch2',
      artPrompt: "《三字经》第2课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "费廉岑薛，雷贺倪汤。\n滕殷罗毕，郝邬安常。\n乐于时傅，皮卞齐康。\n伍余元卜，顾孟平黄。\n和穆萧尹，姚邵湛汪。\n祁毛禹狄，米贝明臧。\n计伏成戴，谈宋茅庞。\n熊纪舒屈，项祝董梁。",
        pinyin: "fèi lián cén xuē， léi hè ní tāng。\nténg yīn luó bì， hǎo wū ān cháng。\nlè yú shí fù， pí biàn qí kāng。\nwǔ yú yuán bǔ， gù mèng píng huáng。\nhé mù xiāo yǐn， yáo shào zhàn wāng。\nqí máo yǔ dí， mǐ bèi míng zāng。\njì fú chéng dài， tán sòng máo páng。\nxióng jì shū qū， xiàng zhù dǒng liáng。",
        translation: "这一句都是姓氏：费廉岑薛、雷贺倪汤。\n这一句都是姓氏：滕殷罗毕、郝邬安常。\n这一句都是姓氏：乐于时傅、皮卞齐康。\n这一句都是姓氏：伍余元卜、顾孟平黄。\n这一句都是姓氏：和穆萧尹、姚邵湛汪。\n这一句都是姓氏：祁毛禹狄、米贝明臧。\n这一句都是姓氏：计伏成戴、谈宋茅庞。\n这一句都是姓氏：熊纪舒屈、项祝董梁。",
      },
      {
        kind: 'note',
        text: "这一句都是姓氏：费廉岑薛、滕殷罗毕、乐于时傅、伍余元卜、和穆萧尹、祁毛禹狄、计伏成戴、熊纪舒屈……你的姓在第几课？",
        art: 'lamp-hint',
      }
      ],
    },
    {
      title: "第三课 · 杜阮蓝闵 · 佚名",
      art: 'baijiaxing-zhao:ch3',
      artPrompt: "《三字经》第3课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "杜阮蓝闵，席季麻强。\n贾路娄危，江童颜郭。\n梅盛林刁，钟徐邱骆。\n高夏蔡田，樊胡凌霍。\n虞万支柯，昝管卢莫。\n经房裘缪，干解应宗。\n丁宣贲邓，郁单杭洪。\n包诸左石，崔吉钮龚。",
        pinyin: "dù ruǎn lán mǐn， xí jì má qiáng。\njiǎ lù lóu wēi， jiāng tóng yán guō。\nméi shèng lín diāo， zhōng xú qiū luò。\ngāo xià cài tián， fán hú líng huò。\nyú wàn zhī kē， zǎn guǎn lú mò。\njīng fáng qiú miù， gān jiě yìng zōng。\ndīng xuān bēn dèng， yù dān háng hóng。\nbāo zhū zuǒ shí， cuī jí niǔ gōng。",
        translation: "这一句都是姓氏：杜阮蓝闵、席季麻强。\n这一句都是姓氏：贾路娄危、江童颜郭。\n这一句都是姓氏：梅盛林刁、钟徐邱骆。\n这一句都是姓氏：高夏蔡田、樊胡凌霍。\n这一句都是姓氏：虞万支柯、昝管卢莫。\n这一句都是姓氏：经房裘缪、干解应宗。\n这一句都是姓氏：丁宣贲邓、郁单杭洪。\n这一句都是姓氏：包诸左石、崔吉钮龚。",
      },
      {
        kind: 'note',
        text: "这一句都是姓氏：杜阮蓝闵、贾路娄危、梅盛林刁、高夏蔡田、虞万支柯、经房裘缪、丁宣贲邓、包诸左石……你的姓在第几课？",
        art: 'lamp-hint',
      }
      ],
    },
    {
      title: "第四课 · 程嵇邢滑 · 佚名",
      art: 'baijiaxing-zhao:ch4',
      artPrompt: "《三字经》第4课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "程嵇邢滑，裴陆荣翁。\n荀羊于惠，甄曲家封。\n芮羿储靳，汲邴糜松。\n井段富巫，乌焦巴弓。\n牧隗山谷，车侯宓蓬。\n全郗班仰，秋仲伊宫。\n宁仇栾暴，甘钭厉戎。\n祖武符刘，景詹束龙。",
        pinyin: "chéng jī xíng huá， péi lù róng wēng。\nxún yáng yú huì， zhēn qǔ jiā fēng。\nruì yì chǔ jìn， jí bǐng mí sōng。\njǐng duàn fù wū， wū jiāo bā gōng。\nmù wěi shān gǔ， chē hóu mì péng。\nquán chī bān yǎng， qiū zhòng yī gōng。\nníng chóu luán bào， gān tǒu lì róng。\nzǔ wǔ fú liú， jǐng zhān shù lóng。",
        translation: "这一句都是姓氏：程嵇邢滑、裴陆荣翁。\n这一句都是姓氏：荀羊于惠、甄曲家封。\n这一句都是姓氏：芮羿储靳、汲邴糜松。\n这一句都是姓氏：井段富巫、乌焦巴弓。\n这一句都是姓氏：牧隗山谷、车侯宓蓬。\n这一句都是姓氏：全郗班仰、秋仲伊宫。\n这一句都是姓氏：宁仇栾暴、甘钭厉戎。\n这一句都是姓氏：祖武符刘、景詹束龙。",
      },
      {
        kind: 'note',
        text: "这一句都是姓氏：程嵇邢滑、荀羊于惠、芮羿储靳、井段富巫、牧隗山谷、全郗班仰、宁仇栾暴、祖武符刘……你的姓在第几课？",
        art: 'lamp-hint',
      }
      ],
    },
    {
      title: "第五课 · 叶幸司韶 · 佚名",
      art: 'baijiaxing-zhao:ch5',
      artPrompt: "《三字经》第5课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "叶幸司韶，郜黎蓟薄。\n印宿白怀，蒲邰从鄂。\n索咸籍赖，卓蔺屠蒙。\n池乔阴郁，胥能苍双。\n闻莘党翟，谭贡劳逄。\n姬申扶堵，冉宰郦雍。\n郤璩桑桂，濮牛寿通。\n边扈燕冀，郏浦尚农。",
        pinyin: "yè xìng sī sháo， gào lí jì báo。\nyìn sù bái huái， pú tái cóng è。\nsuǒ xián jí lài， zhuó lìn tú méng。\nchí qiáo yīn yù， xū néng cāng shuāng。\nwén shēn dǎng zhái， tán gòng láo páng。\njī shēn fú dǔ， rǎn zǎi lì yōng。\nxì qú sāng guì， pú niú shòu tōng。\nbiān hù yàn jì， jiá pǔ shàng nóng。",
        translation: "这一句都是姓氏：叶幸司韶、郜黎蓟薄。\n这一句都是姓氏：印宿白怀、蒲邰从鄂。\n这一句都是姓氏：索咸籍赖、卓蔺屠蒙。\n这一句都是姓氏：池乔阴郁、胥能苍双。\n这一句都是姓氏：闻莘党翟、谭贡劳逄。\n这一句都是姓氏：姬申扶堵、冉宰郦雍。\n这一句都是姓氏：郤璩桑桂、濮牛寿通。\n这一句都是姓氏：边扈燕冀、郏浦尚农。",
      },
      {
        kind: 'note',
        text: "这一句都是姓氏：叶幸司韶、印宿白怀、索咸籍赖、池乔阴郁、闻莘党翟、姬申扶堵、郤璩桑桂、边扈燕冀……你的姓在第几课？",
        art: 'lamp-hint',
      }
      ],
    },
    {
      title: "第六课 · 温别庄晏 · 佚名",
      art: 'baijiaxing-zhao:ch6',
      artPrompt: "《三字经》第6课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "温别庄晏，柴瞿阎充。\n慕连茹习，宦艾鱼容。\n向古易慎，戈廖庾终。\n暨居衡步，都耿满弘。\n匡国文寇，广禄阙东。\n欧殳沃利，蔚越夔隆。\n师巩厍聂，晁勾敖融。\n冷訾辛阚，那简饶空。",
        pinyin: "wēn bié zhuāng yàn， chái qú yán chōng。\nmù lián rú xí， huàn ài yú róng。\nxiàng gǔ yì shèn， gē liào yǔ zhōng。\njì jū héng bù， dōu gěng mǎn hóng。\nkuāng guó wén kòu， guǎng lù quē dōng。\nōu shū wò lì， wèi yuè kuí lóng。\nshī gǒng shè niè， cháo gōu áo róng。\nlěng zī xīn kàn， nà jiǎn ráo kōng。",
        translation: "这一句都是姓氏：温别庄晏、柴瞿阎充。\n这一句都是姓氏：慕连茹习、宦艾鱼容。\n这一句都是姓氏：向古易慎、戈廖庾终。\n这一句都是姓氏：暨居衡步、都耿满弘。\n这一句都是姓氏：匡国文寇、广禄阙东。\n这一句都是姓氏：欧殳沃利、蔚越夔隆。\n这一句都是姓氏：师巩厍聂、晁勾敖融。\n这一句都是姓氏：冷訾辛阚、那简饶空。",
      },
      {
        kind: 'note',
        text: "这一句都是姓氏：温别庄晏、慕连茹习、向古易慎、暨居衡步、匡国文寇、欧殳沃利、师巩厍聂、冷訾辛阚……你的姓在第几课？",
        art: 'lamp-hint',
      }
      ],
    },
    {
      title: "第七课 · 曾毋沙乜 · 佚名",
      art: 'baijiaxing-zhao:ch7',
      artPrompt: "《三字经》第7课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "曾毋沙乜，养鞠须丰。\n巢关蒯相，查后荆红。\n游竺权逯，盖益桓公。\n万俟司马，上官欧阳。\n夏侯诸葛，闻人东方。\n赫连皇甫，尉迟公羊。\n澹台公冶，宗政濮阳。\n淳于单于，太叔申屠。",
        pinyin: "céng wú shā niè， yǎng jū xū fēng。\ncháo guān kuǎi xiāng， chá hòu jīng hóng。\nyóu zhú quán lù， gài yì huán gōng。\nwàn sì sī mǎ， shàng guān ōu yáng。\nxià hóu zhū gě， wén rén dōng fāng。\nhè lián huáng fǔ， wèi chí gōng yáng。\ndàn tái gōng yě， zōng zhèng pú yáng。\nchún yú chán yú， tài shū shēn tú。",
        translation: "这一句都是姓氏：曾毋沙乜、养鞠须丰。\n这一句都是姓氏：巢关蒯相、查后荆红。\n这一句都是姓氏：游竺权逯、盖益桓公。\n这一句都是姓氏：万俟司马、上官欧阳。\n这一句都是姓氏：夏侯诸葛、闻人东方。\n这一句都是姓氏：赫连皇甫、尉迟公羊。\n这一句都是姓氏：澹台公冶、宗政濮阳。\n这一句都是姓氏：淳于单于、太叔申屠。",
      },
      {
        kind: 'note',
        text: "这一句都是姓氏：曾毋沙乜、巢关蒯相、游竺权逯、万俟司马、夏侯诸葛、赫连皇甫、澹台公冶、淳于单于……你的姓在第几课？",
        art: 'lamp-hint',
      }
      ],
    },
    {
      title: "第八课 · 公孙仲孙 · 佚名",
      art: 'baijiaxing-zhao:ch8',
      artPrompt: "《三字经》第8课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "公孙仲孙，轩辕令狐。\n钟离宇文，长孙慕容。\n鲜于闾丘，司徒司空。\n亓官司寇，仉督子车。\n颛孙端木，巫马公西。\n漆雕乐正，壤驷公良。\n拓跋夹谷，宰父谷梁。\n晋楚闫法，汝鄢涂钦。",
        pinyin: "gōng sūn zhòng sūn， xuān yuán líng hú。\nzhōng lí yǔ wén， zhǎng sūn mù róng。\nxiān yú lǘ qiū， sī tú sī kōng。\nqí guān sī kòu， zhǎng dū zǐ chē。\nzhuān sūn duān mù， wū mǎ gōng xī。\nqī diāo lè zhèng， rǎng sì gōng liáng。\ntuò bá jiá gǔ， zǎi fù gǔ liáng。\njìn chǔ yán fǎ， rǔ yān tú qīn。",
        translation: "这一句都是姓氏：公孙仲孙、轩辕令狐。\n这一句都是姓氏：钟离宇文、长孙慕容。\n这一句都是姓氏：鲜于闾丘、司徒司空。\n这一句都是姓氏：亓官司寇、仉督子车。\n这一句都是姓氏：颛孙端木、巫马公西。\n这一句都是姓氏：漆雕乐正、壤驷公良。\n这一句都是姓氏：拓跋夹谷、宰父谷梁。\n这一句都是姓氏：晋楚闫法、汝鄢涂钦。",
      },
      {
        kind: 'note',
        text: "这一句都是姓氏：公孙仲孙、钟离宇文、鲜于闾丘、亓官司寇、颛孙端木、漆雕乐正、拓跋夹谷、晋楚闫法……你的姓在第几课？",
        art: 'lamp-hint',
      }
      ],
    },
    {
      title: "第九课 · 段干百里 · 佚名",
      art: 'baijiaxing-zhao:ch9',
      artPrompt: "《三字经》第9课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "段干百里，东郭南门。\n呼延归海，羊舌微生。\n岳帅缑亢，况后有琴。\n梁丘左丘，东门西门。\n商牟佘佴，伯赏南宫。\n墨哈谯笪，年爱阳佟。\n第五言福，百家姓终。",
        pinyin: "duàn gān bǎi lǐ， dōng guō nán mén。\nhū yán guī hǎi， yáng shé wēi shēng。\nyuè shuài gōu kàng， kuàng hòu yǒu qín。\nliáng qiū zuǒ qiū， dōng mén xī mén。\nshāng mù shé èr， bó shǎng nán gōng。\nmò hā qiáo dá， nián ài yáng tóng。\ndì wǔ yán fú， bǎi jiā xìng zhōng。",
        translation: "这一句都是姓氏：段干百里、东郭南门。\n这一句都是姓氏：呼延归海、羊舌微生。\n这一句都是姓氏：岳帅缑亢、况后有琴。\n这一句都是姓氏：梁丘左丘、东门西门。\n这一句都是姓氏：商牟佘佴、伯赏南宫。\n这一句都是姓氏：墨哈谯笪、年爱阳佟。\n这一句都是姓氏：第五言福、百家姓终。",
      },
      {
        kind: 'note',
        text: "这一句都是姓氏：段干百里、呼延归海、岳帅缑亢、梁丘左丘、商牟佘佴、墨哈谯笪、第五言福……你的姓在第几课？",
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
    sourceUrl: "https://github.com/chinese-poetry/chinese-poetry",
    note: "北宋蒙学课本，作者佚名；注音与白话译文为平台自撰。",
  },
}
