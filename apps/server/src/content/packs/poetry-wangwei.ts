import type { PackBook } from '../types'

/**
 * 《王维诗选》——由 scripts/gen-corpus.mjs 从公版语料生成（2026-09-20 全面补全）。
 * 底本：王维诗选（王维）。逐字来自语料数据集，译文为平台自撰白话。
 * 所选诗作者卒年逾保护期；注音与白话译文为平台自撰。
 */
export const wangWei: PackBook = {
  id: "wangwei-hills",
  title: "王维诗选",
  author: "王维（唐）",
  lang: "zh",
  category: "poetry",
  ageStage: "6-8",
  intro: "「诗中有画」的王维：空山、竹林、明月，读他的诗像走进一幅画。",
  coverArt: "empty-mountain",
  coverArtPrompt: "傍晚的空山，松林间月光洒落，一条小溪在石头上流淌，溪边开着几朵小小的花，远处有若隐若现的山峰",
  coverFrom: "#37474F",
  coverTo: "#78909C",
  source: "公版古籍（唐·王维）通行本，逐字注音",
  chapters: [
    {
      title: "辋川集 鹿柴 · 王维",
      art: "sunrise-hills",
      artPrompt: "古诗《辋川集 鹿柴》意境插画：空山不见人，但闻人语响。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "空山不见人，但闻人语响。\n返景入深林，复照青苔上。",
        pinyin: "kōng shān bù jiàn rén， dàn wén rén yǔ xiǎng。\nfǎn jǐng rù shēn lín， fù zhào qīng tái shàng。",
        translation: "空空的山里看不见一个人影，只偶尔听见有人说话的声音。夕阳的余光射进深深的山林，又照在绿绿的青苔上。",
      }
      ],
    },
    {
      title: "辋川集 竹里馆 · 王维",
      art: "forest-path",
      artPrompt: "古诗《辋川集 竹里馆》意境插画：独坐幽篁里，弹琴复长啸。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "独坐幽篁里，弹琴复长啸。\n深林人不知，明月来相照。",
        pinyin: "dú zuò yōu huáng lǐ， tán qín fù cháng xiào。\nshēn lín rén bù zhī， míng yuè lái xiāng zhào。",
        translation: "我独自坐在幽深的竹林里，一会儿弹琴，一会儿放声长啸。竹林深处没有人知道我在这里，只有一轮明月来把我照亮。",
      }
      ],
    },
    {
      title: "送别 · 王维",
      art: "poetry-moon",
      artPrompt: "古诗《送别》意境插画：下马饮君酒，问君何所之。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "下马饮君酒，问君何所之。\n君言不得意，归卧南山陲。\n但去莫复问，白云无尽时。",
        pinyin: "xià mǎ yǐn jūn jiǔ， wèn jūn hé suǒ zhī。\njūn yán bù dé yì， guī wò nán shān chuí。\ndàn qù mò fù wèn， bái yún wú jìn shí。",
        translation: "我下马请你喝酒，问你这是要去哪里。你说生活不如意，要回南山边上去住了。只管去吧，我不再多问，白云悠悠，没有尽头。",
      }
      ],
    },
    {
      title: "相思 · 王维",
      art: "poetry-moon",
      artPrompt: "古诗《相思》意境插画：红豆生南国，秋来发故枝。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "红豆生南国，秋来发故枝。\n愿君多采撷，此物最相思。",
        pinyin: "hóng dòu shēng nán guó， qiū lái fā gù zhī。\nyuàn jūn duō cǎi xié， cǐ wù zuì xiāng sī。",
        translation: "红豆生长在南方，秋天来了，在老枝上发出新芽。希望你多多采摘它，这小红豆最惹人想念。",
      }
      ],
    },
    {
      title: "杂诗 · 王维",
      art: "spring-bird",
      artPrompt: "古诗《杂诗》意境插画：双燕初命子，五桃新作花。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "双燕初命子，五桃新作花。\n王昌是东舍，宋玉次西家。\n小小能织绮，时时出浣纱。\n亲劳使君问，南陌驻香车。",
        pinyin: "shuāng yàn chū mìng zǐ， wǔ táo xīn zuò huā。\nwáng chāng shì dōng shè， sòng yù cì xī jiā。\nxiǎo xiǎo néng zhī qǐ， shí shí chū huàn shā。\nqīn láo shǐ jūn wèn， nán mò zhù xiāng chē。",
        translation: "屋檐下的双燕刚刚带着小燕子，五棵新栽的桃树刚刚开花。东边的隔壁住着王昌，西边的隔壁就是宋玉家。小小的姑娘已经会织漂亮的绸子，还常常出门到溪边去洗纱。连州里的使君都亲自来探望，在南边的大路上停下了香车。",
      }
      ],
    },
    {
      title: "皇甫岳云溪杂题五首 鸟鸣涧 · 王维",
      art: "poetry-moon",
      artPrompt: "古诗《皇甫岳云溪杂题五首 鸟鸣涧》意境插画：人闲桂花落，夜静春山空。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "人闲桂花落，夜静春山空。\n月出惊山鸟，时鸣春涧中。",
        pinyin: "rén xián guì huā luò， yè jìng chūn shān kōng。\nyuè chū jīng shān niǎo， shí míng chūn jiàn zhōng。",
        translation: "人闲静下来，桂花悄悄地落，夜里静静的，春天的山空空荡荡。月亮出来，惊动了山里的鸟儿，它们不时在春天的溪涧边叫几声。",
      }
      ],
    },
    {
      title: "山中示弟 · 王维",
      art: "sunrise-hills",
      artPrompt: "古诗《山中示弟》意境插画：山林吾丧我，冠带尔成人。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "山林吾丧我，冠带尔成人。\n莫学嵇康懒，且安原宪贫。\n山阴多北户，泉水在东邻。\n缘合妄相有，性空无所亲。\n安知广成子，不是老夫身。",
        pinyin: "shān lín wú sàng wǒ， guān dài ěr chéng rén。\nmò xué jī kāng lǎn， qiě ān yuán xiàn pín。\nshān yīn duō běi hù， quán shuǐ zài dōng lín。\nyuán hé wàng xiāng yǒu， xìng kōng wú suǒ qīn。\nān zhī guǎng chéng zǐ， bù shì lǎo fū shēn。",
        translation: "我住在山林里，把心里那个世俗的自己都忘了；你穿戴好衣冠，已经长成大人了。不要学嵇康那样懒散，暂且安于原宪那样的清贫日子。山里的屋子多朝北开，清清的泉水就在东边邻居家。世上的一切都是因缘凑成的虚影，本性是空的，没有什么可执着留恋的。你怎么知道那位广成子，不是我这个老头儿呢？",
      }
      ],
    },
    {
      title: "九月九日忆山东兄弟 · 王维",
      art: "poetry-moon",
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
      title: "杂曲歌辞 少年行四首 一 · 王维",
      art: "poetry-moon",
      artPrompt: "古诗《杂曲歌辞 少年行四首 一》意境插画：新丰美酒斗十千，咸阳游侠多少年。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "新丰美酒斗十千，咸阳游侠多少年。\n相逢意气为君饮，系马高楼垂柳边。",
        pinyin: "xīn fēng měi jiǔ dòu shí qiān， xián yáng yóu xiá duō shào nián。\nxiāng féng yì qì wèi jūn yǐn， xì mǎ gāo lóu chuí liǔ biān。",
        translation: "新丰的美酒一斗就值十千钱，咸阳城里的游侠多是少年郎。一见面就意气相投，为你干杯痛饮，把马拴在高楼边的垂柳下。",
      }
      ],
    },
    {
      title: "使至塞上 · 王维",
      art: "poetry-moon",
      artPrompt: "古诗《使至塞上》意境插画：单车欲问边，属国过居延。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "单车欲问边，属国过居延。\n征蓬出汉塞，归雁入胡天。\n大漠孤烟直，长河落日圆。\n萧关逢候吏，都护在燕然。",
        pinyin: "dān chē yù wèn biān， shǔ guó guò jū yán。\nzhēng péng chū hàn sāi， guī yàn rù hú tiān。\ndà mò gū yān zhí， cháng hé luò rì yuán。\nxiāo guān féng hòu lì， dū hù zài yàn rán。",
        translation: "我乘着一辆轻车去边塞慰问，作为使者路过居延。自己像随风飘飞的蓬草，出了汉朝的边塞；又像回家的大雁，飞进了胡地的天空。茫茫沙漠里，一柱烽烟笔直地升上天空；长长的黄河上，一轮落日又圆又大。到了萧关碰上巡逻的兵士，说将军还在燕然山那边呢。",
      }
      ],
    },
    {
      title: "山居秋暝 · 王维",
      art: "sunrise-hills",
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
      title: "终南山 · 王维",
      art: "river-boat",
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
      title: "汉江临泛 · 王维",
      art: "river-boat",
      artPrompt: "古诗《汉江临泛》意境插画：楚塞三湘接，荆门九派通。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "楚塞三湘接，荆门九派通。\n江流天地外，山色有无中。\n郡邑浮前浦，波澜动远空。\n襄阳好风日，留醉与山翁。",
        pinyin: "chǔ sāi sān xiāng jiē， jīng mén jiǔ pài tōng。\njiāng liú tiān dì wài， shān sè yǒu wú zhōng。\njùn yì fú qián pǔ， bō lán dòng yuǎn kōng。\nxiāng yáng hǎo fēng rì， liú zuì yǔ shān wēng。",
        translation: "楚地的边界和三湘连在一起，荆门山下九条大水相通。江水一直流到天地之外，两岸的山色若有若无。城郭好像浮在水面上，波涛摇动着远处的天空。襄阳的风光这么好，真想留下来，和山翁一起喝个痛快。",
      }
      ],
    },
    {
      title: "终南别业 · 王维",
      art: "sunrise-hills",
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
      title: "酬张少府 · 王维",
      art: "poetry-moon",
      artPrompt: "古诗《酬张少府》意境插画：晚年唯好静，万事不关心。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "晚年唯好静，万事不关心。\n自顾无长策，空知返旧林。\n松风吹解带，山月照弹琴。\n君问穷通理，渔歌入浦深。",
        pinyin: "wǎn nián wéi hǎo jìng， wàn shì bù guān xīn。\nzì gù wú cháng cè， kōng zhī fǎn jiù lín。\nsōng fēng chuī jiě dài， shān yuè zhào tán qín。\njūn wèn qióng tōng lǐ， yú gē rù pǔ shēn。",
        translation: "晚年我只喜欢清静，什么事都不放在心上了。自己想想拿不出什么好办法，只知道回到旧日的山林；松风吹着我解开的衣带，山月照着我弹琴。你问我穷困和显达的道理，我只把渔歌唱向水浦深处。",
      }
      ],
    },
    {
      title: "辋川闲居赠裴秀才迪 · 王维",
      art: "sunrise-hills",
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
      title: "辋川集 白石滩 · 王维",
      art: "poetry-moon",
      artPrompt: "古诗《辋川集 白石滩》意境插画：清浅白石滩，绿蒲向堪把。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "清浅白石滩，绿蒲向堪把。\n家住水东西，浣纱明月下。",
        pinyin: "qīng qiǎn bái shí tān， lǜ pú xiàng kān bǎ。\njiā zhù shuǐ dōng xī， huàn shā míng yuè xià。",
        translation: "清清浅浅的白石滩，绿绿的菖蒲长得快要能一把抓住了。住在水东水西的人家，趁着明月出来洗洗衣纱。",
      }
      ],
    },
    {
      title: "辋川集 辛夷坞 · 王维",
      art: "sunrise-hills",
      artPrompt: "古诗《辋川集 辛夷坞》意境插画：木末芙蓉花，山中发红萼。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "木末芙蓉花，山中发红萼。\n涧户寂无人，纷纷开且落。",
        pinyin: "mù mò fú róng huā， shān zhōng fā hóng è。\njiàn hù jì wú rén， fēn fēn kāi qiě luò。",
        translation: "枝头顶上的辛夷花，在山里绽出红红的花苞。山涧边静静的没有人来，花儿自己纷纷开放，又自己纷纷落掉。",
      }
      ],
    },
    {
      title: "辋川集 栾家濑 · 王维",
      art: "primer-scroll",
      artPrompt: "古诗《辋川集 栾家濑》意境插画：飒飒秋雨中，浅浅石溜泻。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "飒飒秋雨中，浅浅石溜泻。\n跳波自相溅，白鹭惊复下。",
        pinyin: "sà sà qiū yǔ zhōng， qiǎn qiǎn shí liū xiè。\ntiào bō zì xiāng jiàn， bái lù jīng fù xià。",
        translation: "秋雨飒飒地下着，浅浅的急水从石滩上泻下来。翻起的水波互相飞溅，白鹭吓了一跳飞起来，又落了回去。",
      }
      ],
    },
    {
      title: "杂曲歌辞 渭城曲 · 王维",
      art: "spring-bird",
      artPrompt: "古诗《杂曲歌辞 渭城曲》意境插画：谓城朝雨浥轻尘，客舍青青柳色春。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "谓城朝雨浥轻尘，客舍青青柳色春。\n劝君更尽一杯酒，西出阳关无故人。",
        pinyin: "wèi chéng cháo yǔ yì qīng chén， kè shè qīng qīng liǔ sè chūn。\nquàn jūn gèng jìn yī bēi jiǔ， xī chū yáng guān wú gù rén。",
        translation: "渭城的早晨下了一场小雨，打湿了路上的轻尘；客舍旁的柳树青青，一片春天的颜色。请你再喝干这一杯酒吧，往西出了阳关，就再也见不到老朋友了。",
      }
      ],
    },
    {
      title: "皇甫岳云溪杂题五首 莲花坞 · 王维",
      art: "river-boat",
      artPrompt: "古诗《皇甫岳云溪杂题五首 莲花坞》意境插画：日日采莲去，洲长多暮归。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "日日采莲去，洲长多暮归。\n弄篙莫溅水，畏湿红莲衣。",
        pinyin: "rì rì cǎi lián qù， zhōu cháng duō mù guī。\nnòng gāo mò jiàn shuǐ， wèi shī hóng lián yī。",
        translation: "天天撑着船去采莲，沙洲长长的，常常天快黑了才回家。撑篙的时候小心别溅起水花，怕打湿了红莲像衣裳一样的花瓣。",
      }
      ],
    },
    {
      title: "书事 · 王维",
      art: "poetry-moon",
      artPrompt: "古诗《书事》意境插画：轻阴阁小雨，深院昼慵开。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "轻阴阁小雨，深院昼慵开。\n坐看苍苔色，欲上人衣来。",
        pinyin: "qīng yīn gé xiǎo yǔ， shēn yuàn zhòu yōng kāi。\nzuò kàn cāng tái sè， yù shàng rén yī lái。",
        translation: "天色微阴，小雨刚停，深深的院子里，白天也懒得开门。坐着看青苔的颜色，那绿色仿佛要爬到人的衣裳上来。",
      }
      ],
    },
    {
      title: "过香积寺 · 王维",
      art: "cloud-flight",
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
      title: "青溪 · 王维",
      art: "river-boat",
      artPrompt: "古诗《青溪》意境插画：言入黄花川，每逐青溪水。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "言入黄花川，每逐青溪水。\n随山将万转，趣途无百里。\n声喧乱石中，色静深松里。\n漾漾泛菱荇，澄澄映葭苇。\n我心素已闲，清川澹如此。\n请留盘石上，垂钓将已矣。",
        pinyin: "yán rù huáng huā chuān， měi zhú qīng xī shuǐ。\nsuí shān jiāng wàn zhuǎn， qù tú wú bǎi lǐ。\nshēng xuān luàn shí zhōng， sè jìng shēn sōng lǐ。\nyàng yàng fàn líng xìng， chéng chéng yìng jiā wěi。\nwǒ xīn sù yǐ xián， qīng chuān dàn rú cǐ。\nqǐng liú pán shí shàng， chuí diào jiāng yǐ yǐ。",
        translation: "我要进入黄花川，一路上总追随着那条青青的溪水。溪水随着山势千回百转，路程却不到一百里。水声在乱石中哗哗作响，流进幽深的松林就变得安安静静。水面上轻轻漂着菱叶和荇菜，清澈的水里映出岸边的芦苇。我的心一向恬静悠闲，就像这条清淡平静的溪水。真想永远留在这块大石头上，从此在这里垂钓，一直过下去。",
      }
      ],
    },
    {
      title: "积雨辋川庄作 · 王维",
      art: "forest-path",
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
      title: "秋夜独坐 · 王维",
      art: "poetry-moon",
      artPrompt: "古诗《秋夜独坐》意境插画：独坐悲双鬓，空堂欲二更。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "独坐悲双鬓，空堂欲二更。\n雨中山果落，灯下草虫鸣。\n白发终难变，黄金不可成。\n欲知除老病，唯有学无生。",
        pinyin: "dú zuò bēi shuāng bìn， kōng táng yù èr gēng。\nyǔ zhōng shān guǒ luò， dēng xià cǎo chóng míng。\nbái fà zhōng nán biàn， huáng jīn bù kě chéng。\nyù zhī chú lǎo bìng， wéi yǒu xué wú shēng。",
        translation: "独自坐着，为两鬓变白而难过，空空的堂屋里快到二更天了。雨声里，山上的果子掉落下来；灯光下，草丛里的小虫在鸣叫。白了的头发终究变不回黑色，长生不老的仙丹也炼不成。要想摆脱老和病的烦恼，只有去学那不生不灭的道理。",
      }
      ],
    },
    {
      title: "归嵩山作 · 王维",
      art: "sunrise-hills",
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
      title: "山居即事 · 王维",
      art: "sunrise-hills",
      artPrompt: "古诗《山居即事》意境插画：寂寞掩柴扉，苍茫对落晖。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "寂寞掩柴扉，苍茫对落晖。\n鹤巢松树遍，人访荜门稀。\n绿竹含新粉，红莲落故衣。\n渡头烟火起，处处采菱归。",
        pinyin: "jì mò yǎn chái fēi， cāng máng duì luò huī。\nhè cháo sōng shù biàn， rén fǎng bì mén xī。\nlǜ zhú hán xīn fěn， hóng lián luò gù yī。\ndù tóu yān huǒ qǐ， chù chù cǎi líng guī。",
        translation: "静静地关上柴门，对着苍茫的落日余光。白鹤在松树上做了窝，来敲柴门的人却很少。绿竹穿着新长的粉衣，红莲花落下了旧的花瓣。渡口升起了炊烟，处处是采菱回来的人。",
      }
      ],
    },
    {
      title: "酬郭给事 · 王维",
      art: "waterfall-cave",
      artPrompt: "古诗《酬郭给事》意境插画：洞门高阁霭余辉，桃李阴阴柳絮飞。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "洞门高阁霭余辉，桃李阴阴柳絮飞。\n禁里疎钟官舍晚，省中啼鸟吏人稀。\n晨摇玉佩趋金殿，夕奉天书拜琐闱。\n强欲从君无那老，将因卧病解朝衣。",
        pinyin: "dòng mén gāo gé ǎi yú huī， táo lǐ yīn yīn liǔ xù fēi。\njìn lǐ shū zhōng guān shè wǎn， shěng zhōng tí niǎo lì rén xī。\nchén yáo yù pèi qū jīn diàn， xī fèng tiān shū bài suǒ wéi。\nqiáng yù cóng jūn wú nà lǎo， jiāng yīn wò bìng jiě cháo yī。",
        translation: "宫门高阁里映着夕阳的余光，桃树李树绿荫浓浓，柳絮飞舞。宫里稀疏的钟声响起，官舍天色已晚；官署里鸟儿啼叫，当差的已经稀少。你早晨摇着玉佩快步走上金殿，傍晚捧着皇上的文书拜出宫门。我想跟着你一起做官，无奈年纪老了，打算因病辞官，脱下这身朝服。",
      }
      ],
    },
    {
      title: "奉和圣制从蓬莱向兴庆阁道中留春雨中春望之作应制 · 王维",
      art: "spring-bird",
      artPrompt: "古诗《奉和圣制从蓬莱向兴庆阁道中留春雨中春望之作应制》意境插画：渭水自萦秦塞曲，黄山旧绕汉宫斜。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "渭水自萦秦塞曲，黄山旧绕汉宫斜。\n銮舆迥出千门柳，阁道廻看上苑花。\n云里帝城双凤阙，雨中春树万人家。\n为乘阳气行时令，不是宸游玩物华。",
        pinyin: "wèi shuǐ zì yíng qín sāi qǔ， huáng shān jiù rào hàn gōng xié。\nluán yú jiǒng chū qiān mén liǔ， gé dào huí kàn shàng yuàn huā。\nyún lǐ dì chéng shuāng fèng quē， yǔ zhōng chūn shù wàn rén jiā。\nwèi chéng yáng qì xíng shí lìng， bù shì chén yóu wán wù huá。",
        translation: "渭水弯弯地绕着秦地流，黄山斜斜地环着旧时的汉宫。皇上的车驾远远地驶出千门柳荫，从阁道上回望，御花园里繁花盛开。云雾里立着帝城高高的凤阙，春雨中是千万户人家的绿树。皇上是趁着春天阳气生发出来颁布农时的，不是为了游玩赏景。",
      }
      ],
    }
  ],
  rights: {
    workTitle: "王维诗选",
    author: "王维",
    authorDeathYear: 761,
    translator: '桃阅读',
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: "https://github.com/chinese-poetry/chinese-poetry",
    note: "所选诗作者卒年逾保护期；注音与白话译文为平台自撰。",
  },
}
