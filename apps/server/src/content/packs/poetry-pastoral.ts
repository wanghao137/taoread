import type { PackBook } from '../types'

/**
 * 《田园诗选》——由 scripts/gen-corpus.mjs 从公版语料生成（2026-09-20 全面补全）。
 * 底本：田园诗选（陶渊明 等）。逐字来自语料数据集，译文为平台自撰白话。
 * 所选诗文作者卒年均逾保护期；注音与白话译文为平台自撰。
 */
export const pastoralPoems: PackBook = {
  id: "poetry-pastoral",
  title: "田园诗选",
  author: "陶渊明 / 王维 / 孟浩然 等",
  lang: "zh",
  category: "poetry",
  ageStage: "6-8",
  intro: "种豆、采菊、牧牛、插秧……田园里的每一天都值得写进诗里。",
  coverArt: "pastoral-field",
  coverArtPrompt: "黄昏的田园，金黄稻田连着青瓦农舍，一个农人牵着牛走在田埂上，远处炊烟袅袅，晚霞把天边染成橘粉色，白鹭飞过",
  coverFrom: "#8BC34A",
  coverTo: "#FFB74D",
  source: "唐宋田园诗（公版古籍）通行本，逐字注音",
  chapters: [
    {
      title: "归园田居（其三） · 陶渊明",
      art: "rice-field",
      artPrompt: "古诗《归园田居（其三）》意境插画：种豆南山下，草盛豆苗稀。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "种豆南山下，草盛豆苗稀。\n晨兴理荒秽，带月荷锄归。\n道狭草木长，夕露沾我衣。\n衣沾不足惜，但使愿无违。",
        pinyin: "zhòng dòu nán shān xià， cǎo shèng dòu miáo xī。\nchén xīng lǐ huāng huì， dài yuè hé chú guī。\ndào xiá cǎo mù cháng， xī lù zhān wǒ yī。\nyī zhān bù zú xī， dàn shǐ yuàn wú wéi。",
        translation: "我在南山脚下种豆子，野草长得旺，豆苗却很稀少。清晨起来到田里清除杂草，傍晚顶着月亮扛着锄头回家，小路窄窄的，草木高高的，晚上的露水打湿了我的衣裳。衣服湿了没什么可惜，只要不违背我的心愿就好。",
      }
      ],
    },
    {
      title: "饮酒（其五） · 陶渊明",
      art: "poetry-moon",
      artPrompt: "古诗《饮酒（其五）》意境插画：结庐在人境，而无车马喧。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "结庐在人境，而无车马喧。\n问君何能尔？心远地自偏。\n采菊东篱下，悠然见南山。\n山气日夕佳，飞鸟相与还。\n此中有真意，欲辨已忘言。",
        pinyin: "jié lú zài rén jìng， ér wú chē mǎ xuān。\nwèn jūn hé néng ěr？ xīn yuǎn dì zì piān。\ncǎi jú dōng lí xià， yōu rán jiàn nán shān。\nshān qì rì xī jiā， fēi niǎo xiāng yǔ hái。\ncǐ zhōng yǒu zhēn yì， yù biàn yǐ wàng yán。",
        translation: "我把房子盖在人来人往的地方，却听不到车马的喧闹——只要心里远离了尘世，住的地方自然就清静了。我在东边篱笆下采菊花，一抬头悠然看见了南山；傍晚的山色正好，飞鸟结伴飞回来。这里面有真正的意味，想说出来，却已经忘了该怎么说了。",
      }
      ],
    },
    {
      title: "过故人庄 · 孟浩然",
      art: "rice-field",
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
      title: "渭川田家 · 王维",
      art: "rice-field",
      artPrompt: "古诗《渭川田家》意境插画：斜阳照墟落，穷巷牛羊归。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "斜阳照墟落，穷巷牛羊归。\n野老念牧童，倚杖候荆扉。\n雉雊麦苗秀，蚕眠桑叶稀。\n田夫荷锄至，相见语依依。\n即此羡闲逸，怅然吟式微。",
        pinyin: "xié yáng zhào xū luò， qióng xiàng niú yáng guī。\nyě lǎo niàn mù tóng， yǐ zhàng hòu jīng fēi。\nzhì gòu mài miáo xiù， cán mián sāng yè xī。\ntián fū hé chú zhì， xiāng jiàn yǔ yī yī。\njí cǐ xiàn xián yì， chàng rán yín shì wēi。",
        translation: "夕阳照着村庄，深巷里牛羊都回来了。老人惦记着放牛的孩子，拄着拐杖在柴门口等。野鸡咕咕叫，麦苗正吐穗；蚕儿睡了，桑叶稀疏。农夫扛着锄头回来，见面后亲亲热热地说着话。这样的安闲真让人羡慕，我惆怅地吟起想回家的歌。",
      }
      ],
    },
    {
      title: "秋浦歌（其十五） · 李白",
      art: "poetry-moon",
      artPrompt: "古诗《秋浦歌（其十五）》意境插画：白发三千丈，缘愁似个长。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "白发三千丈，缘愁似个长。\n不知明镜里，何处得秋霜。",
        pinyin: "bái fà sān qiān zhàng， yuán chóu sì gè cháng。\nbù zhī míng jìng lǐ， hé chù dé qiū shuāng。",
        translation: "白发有三千丈那么长，是因为心里的愁思有这么长。不知道明亮的镜子里，从哪里得来这满头的秋霜。",
      }
      ],
    },
    {
      title: "乡村四月 · 翁卷",
      art: "poetry-moon",
      artPrompt: "古诗《乡村四月》意境插画：绿遍山原白满川，子规声里雨如烟。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "绿遍山原白满川，子规声里雨如烟。\n乡村四月闲人少，才了蚕桑又插田。",
        pinyin: "lǜ biàn shān yuán bái mǎn chuān， zǐ guī shēng lǐ yǔ rú yān。\nxiāng cūn sì yuè xián rén shǎo， cái le cán sāng yòu chā tián。",
        translation: "山坡和原野一片翠绿，稻田里的水色白亮亮的，杜鹃鸟啼叫着，细雨像烟一样飘洒。乡村的四月没有多少闲人，刚忙完采桑养蚕，又要去田里插秧。",
      }
      ],
    },
    {
      title: "四时田园杂兴（其二十五） · 范成大",
      art: "rice-field",
      artPrompt: "古诗《四时田园杂兴（其二十五）》意境插画：梅子金黄杏子肥，麦花雪白菜花稀。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "梅子金黄杏子肥，麦花雪白菜花稀。\n日长篱落无人过，惟有蜻蜓蛱蝶飞。",
        pinyin: "méi zǐ jīn huáng xìng zǐ féi， mài huā xuě bái cài huā xī。\nrì cháng lí luò wú rén guò， wéi yǒu qīng tíng jiá dié fēi。",
        translation: "梅子变得金黄，杏子长得肥大，麦花雪白雪白，油菜花倒稀稀落落。白天变长了，篱笆边没有人经过，只有蜻蜓和蝴蝶飞来飞去。",
      }
      ],
    },
    {
      title: "四时田园杂兴（其三十一） · 范成大",
      art: "poetry-moon",
      artPrompt: "古诗《四时田园杂兴（其三十一）》意境插画：昼出耘田夜绩麻，村庄儿女各当家。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "昼出耘田夜绩麻，村庄儿女各当家。\n童孙未解供耕织，也傍桑阴学种瓜。",
        pinyin: "zhòu chū yún tián yè jì má， cūn zhuāng ér nǚ gè dāng jiā。\ntóng sūn wèi jiě gòng gēng zhī， yě bàng sāng yīn xué zhòng guā。",
        translation: "白天出去锄草种田，晚上在家搓麻线，村里的男男女女各自担当家里的活儿。小孩子虽然还不会耕田织布，也在桑树荫下学着大人的样子种瓜。",
      }
      ],
    },
    {
      title: "江畔独步寻花（其六） · 杜甫",
      art: "river-boat",
      artPrompt: "古诗《江畔独步寻花（其六）》意境插画：黄四娘家花满蹊，千朵万朵压枝低。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "黄四娘家花满蹊，千朵万朵压枝低。\n留连戏蝶时时舞，自在娇莺恰恰啼。",
        pinyin: "huáng sì niáng jiā huā mǎn qī， qiān duǒ wàn duǒ yā zhī dī。\nliú lián xì dié shí shí wǔ， zì zài jiāo yīng qià qià tí。",
        translation: "黄四娘家的小路上开满了花，千朵万朵把枝条都压弯了。留恋花儿的蝴蝶不停地飞舞，自由自在的黄莺恰恰地欢叫着。",
      }
      ],
    },
    {
      title: "水槛遣心二首（其一） · 杜甫",
      art: "primer-scroll",
      artPrompt: "古诗《水槛遣心二首（其一）》意境插画：去郭轩楹敞，无村眺望赊。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "去郭轩楹敞，无村眺望赊。\n澄江平少岸，幽树晚多花。\n细雨鱼儿出，微风燕子斜。\n城中十万户，此地两三家。",
        pinyin: "qù guō xuān yíng chǎng， wú cūn tiào wàng shē。\nchéng jiāng píng shǎo àn， yōu shù wǎn duō huā。\nxì yǔ yú er chū， wēi fēng yàn zi xié。\nchéng zhōng shí wàn hù， cǐ dì liǎng sān jiā。",
        translation: "这里离城郭远，庭院宽敞，没有村庄遮挡，可以眺望得很远。清澈的江水涨得和岸差不多平，幽静的树木傍晚开满了花；细雨里鱼儿游出水面，微风中燕子斜斜地飞。城里有十万户人家，这里却只有两三户。",
      }
      ],
    },
    {
      title: "游山西村（节选） · 陆游",
      art: "rice-field",
      artPrompt: "古诗《游山西村（节选）》意境插画：莫笑农家腊酒浑，丰年留客足鸡豚。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "莫笑农家腊酒浑，丰年留客足鸡豚。\n山重水复疑无路，柳暗花明又一村。",
        pinyin: "mò xiào nóng jiā là jiǔ hún， fēng nián liú kè zú jī tún。\nshān zhòng shuǐ fù yí wú lù， liǔ àn huā míng yòu yī cūn。",
        translation: "不要笑话农家腊月酿的酒浑浊，丰收的年景他们招待客人有足够的鸡肉和猪肉。山重重，水弯弯，正怀疑前面没有路了，忽然柳色深绿、花色明艳，眼前又出现了一个村庄。",
      }
      ],
    },
    {
      title: "社日 · 王驾",
      art: "goose-pond",
      artPrompt: "古诗《社日》意境插画：鹅湖山下稻粱肥，豚栅鸡栖半掩扉。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "鹅湖山下稻粱肥，豚栅鸡栖半掩扉。\n桑柘影斜春社散，家家扶得醉人归。",
        pinyin: "é hú shān xià dào liáng féi， tún shān jī qī bàn yǎn fēi。\nsāng zhè yǐng xié chūn shè sàn， jiā jiā fú dé zuì rén guī。",
        translation: "鹅湖山下的庄稼长得饱满，猪圈里的猪、鸡窝里的鸡都养得肥肥的，家家户户的门半掩着。桑树和柘树的影子渐渐斜了，春社的聚会散了，家家都有人扶着喝醉的人回家。",
      }
      ],
    },
    {
      title: "雨过山村 · 王建",
      art: "river-boat",
      artPrompt: "古诗《雨过山村》意境插画：雨里鸡鸣一两家，竹溪村路板桥斜。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "雨里鸡鸣一两家，竹溪村路板桥斜。\n妇姑相唤浴蚕去，闲着中庭栀子花。",
        pinyin: "yǔ lǐ jī míng yī liǎng jiā， zhú xī cūn lù bǎn qiáo xié。\nfù gū xiāng huàn yù cán qù， xián zhe zhōng tíng zhī zǐ huā。",
        translation: "下雨的日子里，有一两户人家传出鸡叫声，竹林小溪夹着村路，一座木板桥斜斜地架着。婆婆和媳妇互相招呼着去忙养蚕的事，院子里的栀子花白白地闲开着。",
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
      title: "田园乐（其六） · 王维",
      art: "spring-bird",
      artPrompt: "古诗《田园乐（其六）》意境插画：桃红复含宿雨，柳绿更带朝烟。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "桃红复含宿雨，柳绿更带朝烟。\n花落家童未扫，莺啼山客犹眠。",
        pinyin: "táo hóng fù hán sù yǔ， liǔ lǜ gèng dài cháo yān。\nhuā luò jiā tóng wèi sǎo， yīng tí shān kè yóu mián。",
        translation: "红红的桃花上还含着夜里落下的雨珠，绿绿的柳条笼罩在清晨的雾气里。花瓣落了，家童还没有起来打扫；黄莺啼叫着，山里的人还在睡觉呢。",
      }
      ],
    }
  ],
  rights: {
    workTitle: "田园诗选",
    author: "陶渊明 等",
    authorDeathYear: 427,
    translator: '桃阅读',
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: "https://github.com/chinese-poetry/chinese-poetry",
    note: "所选诗文作者卒年均逾保护期；注音与白话译文为平台自撰。",
  },
}
