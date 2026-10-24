import type { PackBook } from '../types'

/**
 * 《笠翁对韵·诵读精选》——scripts/gen-liweng.mts 生成（2026-10-24）。
 * 底本：李渔《笠翁对韵》通行本原文（公版，卒 1680），30 韵各取「其一」一则。
 * 红线：原文逐字来自底本数据（仅取 lines 字段）；注音 pinyin-pro 课本口径；
 * 白话译文为平台自撰（底本仓库的译文/注释有版权，未采用）。
 */
export const liwengYun: PackBook = {
  "id": "liweng-yun",
  "title": "笠翁对韵·诵读精选",
  "author": "李渔（清）",
  "lang": "zh",
  "category": "primer",
  "ageStage": "6-8",
  "intro": "天对地，雨对风，大陆对长空。声律启蒙的姊妹篇，三十个韵部各选一则，读着读着就会对对子了。",
  "coverArt": "poetry-moon-pair",
  "coverArtPrompt": "对联意境：左边一位小书生、右边一轮明月与青山遥遥相对，中间一行竖排小字，古风水墨贴纸绘本风",
  "coverFrom": "#7A9E9F",
  "coverTo": "#EFE6D5",
  "source": "《笠翁对韵》通行本（李渔，卒 1680），公版；注音与白话译文为平台自撰",
  "rights": {
    "workTitle": "笠翁对韵",
    "author": "李渔",
    "authorDeathYear": 1680,
    "translator": "桃阅读",
    "jurisdiction": "CN",
    "basis": "pd-70",
    "sourceUrl": "https://github.com/ghostcode/liwengduiyun",
    "note": "底本原文（公版）逐字收录 30 韵各一则；注音 pinyin-pro 课本口径；白话译文为平台自撰。"
  },
  "chapters": [
    {
      "title": "一东 · 李渔",
      "art": "liweng-yun:ch1",
      "artPrompt": "《笠翁对韵》一东韵诵读插画：对联意境的水墨花鸟小景，古风贴纸绘本，色彩明快",
      "blocks": [
        {
          "kind": "poem",
          "text": "天对地，雨对风。大陆对长空。\n山花对海树，赤日对苍穹。\n雷隐隐，雾蒙蒙。日下对天中。\n风高秋月白，雨霁晚霞红。\n牛女二星河左右，参商两曜斗西东。\n十月塞边，飒飒寒霜惊戍旅；三冬江上，漫漫朔雪冷渔翁。",
          "pinyin": "tiān duì dì， yǔ duì fēng。 dà lù duì cháng kōng。\nshān huā duì hǎi shù， chì rì duì cāng qióng。\nléi yǐn yǐn， wù méng méng。 rì xià duì tiān zhōng。\nfēng gāo qiū yuè bái， yǔ jì wǎn xiá hóng。\nniú nǚ èr xīng hé zuǒ yòu， cān shāng liǎng yào dòu xī dōng。\nshí yuè sāi biān， sà sà hán shuāng jīng shù lǚ； sān dōng jiāng shàng， màn màn shuò xuě lěng yú wēng。",
          "translation": "天对地，雨对风。大地对长空。山间的花对海边的树，初升的红日对辽远的苍穹。雷声隐隐，大雾蒙蒙，天底下对天空中央。秋夜风高，月亮显得格外洁白；雨后初晴，晚霞红得格外好看。牛郎织女两颗星隔着银河遥遥相望，参星商星一个升起另一个就落下，永远见不着面。十月里塞外寒风飒飒，霜天惊动了守边的队伍；三冬时江上白雪漫漫，冷得钓鱼的老翁缩紧了身子。"
        }
      ]
    },
    {
      "title": "二冬 · 李渔",
      "art": "liweng-yun:ch2",
      "artPrompt": "《笠翁对韵》二冬韵诵读插画：对联意境的水墨花鸟小景，古风贴纸绘本，色彩明快",
      "blocks": [
        {
          "kind": "poem",
          "text": "晨对午，夏对冬。下饷对高舂。\n青春对白昼，古柏对苍松。\n垂钓客，荷锄翁。仙鹤对神龙。\n凤冠珠闪烁，螭带玉玲珑。\n三元及第才千顷，一品当朝禄万钟。\n花萼楼前，仙李盘根调国脉；沉香亭畔，娇杨擅宠起边风。",
          "pinyin": "chén duì wǔ， xià duì dōng。 xià xiǎng duì gāo chōng。\nqīng chūn duì bái zhòu， gǔ bǎi duì cāng sōng。\nchuí diào kè， hé chú wēng。 xiān hè duì shén lóng。\nfèng guān zhū shǎn shuò， chī dài yù líng lóng。\nsān yuán jí dì cái qiān qǐng， yī pǐn dāng cháo lù wàn zhōng。\nhuā è lóu qián， xiān lǐ pán gēn tiáo guó mài； chén xiāng tíng pàn， jiāo yáng shàn chǒng qǐ biān fēng。",
          "translation": "清晨对正午，夏天对冬天。下午的活计对傍晚的舂米声。青春年少对白头到老，古老的柏树对苍劲的青松。垂钓的客人，扛锄的老翁，仙鹤对神龙。凤冠上的珠子闪闪发亮，盘龙的腰带玉器玲珑。连中三元的人才能像千顷田野，官居一品的人俸禄有万钟粮食。花萼楼前，仙李盘根延续着国运；沉香亭畔，得宠的杨贵妃惹起了边关的风波。"
        }
      ]
    },
    {
      "title": "三江 · 李渔",
      "art": "liweng-yun:ch3",
      "artPrompt": "《笠翁对韵》三江韵诵读插画：对联意境的水墨花鸟小景，古风贴纸绘本，色彩明快",
      "blocks": [
        {
          "kind": "poem",
          "text": "奇对偶，只对双。大海对长江。\n金盘对玉盏，宝烛对银釭。\n朱漆槛，碧纱窗。舞调对歌腔。\n兴汉推马武，谏夏著龙逄。\n四收列国群王伏，三筑高城众敌降。\n跨凤登台，潇洒仙姬秦弄玉；斩蛇当道，英雄天子汉刘邦。",
          "pinyin": "qí duì ǒu， zhī duì shuāng。 dà hǎi duì cháng jiāng。\njīn pán duì yù zhǎn， bǎo zhú duì yín gāng。\nzhū qī kǎn， bì shā chuāng。 wǔ tiáo duì gē qiāng。\nxīng hàn tuī mǎ wǔ， jiàn xià zhù lóng páng。\nsì shōu liè guó qún wáng fú， sān zhù gāo chéng zhòng dí jiàng。\nkuà fèng dēng tái， xiāo sǎ xiān jī qín nòng yù； zhǎn shé dāng dào， yīng xióng tiān zǐ hàn liú bāng。",
          "translation": "单对双，一只对一双。大海对长江。金盘对玉杯，红烛对银灯。朱红的栏杆，碧绿的纱窗，舞姿对歌声。帮着兴起汉朝的要数猛将马武，敢劝谏夏桀的是忠臣关龙逢。四征收服了列国让群王拜服，三度高筑城墙叫敌人来降。乘着凤凰登上高台的是潇洒的仙女秦弄玉；斩掉白蛇拦路的是英雄天子汉刘邦。"
        }
      ]
    },
    {
      "title": "四支 · 李渔",
      "art": "liweng-yun:ch4",
      "artPrompt": "《笠翁对韵》四支韵诵读插画：对联意境的水墨花鸟小景，古风贴纸绘本，色彩明快",
      "blocks": [
        {
          "kind": "poem",
          "text": "泉对石，干对枝。吹竹对弹丝。\n山亭对水榭，鹦鹉对鸬鹚。\n五色笔，十香词。泼墨对传卮。\n神奇韩干画，雄浑李陵诗。\n几处花街新夺锦，有人香径淡凝脂。\n万里烽烟，战士边头争保塞；一犁膏雨，农夫村外尽乘时。",
          "pinyin": "quán duì shí， gān duì zhī。 chuī zhú duì tán sī。\nshān tíng duì shuǐ xiè， yīng wǔ duì lú cí。\nwǔ sè bǐ， shí xiāng cí。 pō mò duì chuán zhī。\nshén qí hán gān huà， xióng hún lǐ líng shī。\njǐ chù huā jiē xīn duó jǐn， yǒu rén xiāng jìng dàn níng zhī。\nwàn lǐ fēng yān， zhàn shì biān tóu zhēng bǎo sāi； yī lí gāo yǔ， nóng fū cūn wài jìn chéng shí。",
          "translation": "泉水对山石，树干对树枝。吹竹笛对弹琴弦。山间的凉亭对水边的台榭，学舌的鹦鹉对捕鱼的鸬鹚。五色笔下生花，十香词里传情，挥毫泼墨对举杯传饮。韩干画的马出神入化，李陵写的诗雄浑有力。几处花街上有人新写出夺锦的好文章，有人在小路上淡淡地上了妆。万里烽烟里，战士在边关争夺要塞；一场好雨下，农夫在村外赶着农时耕田。"
        }
      ]
    },
    {
      "title": "五微 · 李渔",
      "art": "liweng-yun:ch5",
      "artPrompt": "《笠翁对韵》五微韵诵读插画：对联意境的水墨花鸟小景，古风贴纸绘本，色彩明快",
      "blocks": [
        {
          "kind": "poem",
          "text": "贤对圣，是对非。觉奥对参微。\n鱼书对雁字，草舍对柴扉。\n鸡晓唱，雉朝飞。红瘦对绿肥。\n举杯邀月饮，骑马踏花归。\n黄盖能成赤壁捷，陈平善解白登危。\n太白书堂，瀑泉垂地三千丈；孔明祀庙，老柏参天四十围。",
          "pinyin": "xián duì shèng， shì duì fēi。 jué ào duì cān wēi。\nyú shū duì yàn zì， cǎo shè duì chái fēi。\njī xiǎo chàng， zhì cháo fēi。 hóng shòu duì lǜ féi。\njǔ bēi yāo yuè yǐn， qí mǎ tà huā guī。\nhuáng gài néng chéng chì bì jié， chén píng shàn jiě bái dēng wēi。\ntài bái shū táng， pù quán chuí dì sān qiān zhàng； kǒng míng sì miào， lǎo bǎi cān tiān sì shí wéi。",
          "translation": "贤人对圣人，正确对错误。领悟深奥的道理对研究精微的学问。装在鱼腹里的书信对雁脚系的家书，简陋的草舍对柴编的门扉。公鸡在拂晓啼唱，野鸡在清晨飞起，花变得红瘦对叶变得绿肥。举起酒杯邀明月共饮，骑着马儿从落花上踏过。老将黄盖促成了赤壁大捷，谋士陈平化解了白登之围。李白的书堂前，瀑布飞流直下三千丈；诸葛亮的祠庙里，老柏高耸参天四十围。"
        }
      ]
    },
    {
      "title": "六鱼 · 李渔",
      "art": "liweng-yun:ch6",
      "artPrompt": "《笠翁对韵》六鱼韵诵读插画：对联意境的水墨花鸟小景，古风贴纸绘本，色彩明快",
      "blocks": [
        {
          "kind": "poem",
          "text": "羹对饭，柳对榆。短袖对长裾。\n鸡冠对凤尾，芍药对芙蕖。\n周有若，汉相如。王屋对匡庐。\n月明山寺远，风细水亭虚。\n壮士腰间三尺剑，男儿腹内五车书。\n疏影暗香，和靖孤山梅蕊放；轻阴清昼，渊明旧宅柳条舒。",
          "pinyin": "gēng duì fàn， liǔ duì yú。 duǎn xiù duì cháng jū。\njī guān duì fèng wěi， sháo yào duì fú qú。\nzhōu yǒu ruò， hàn xiāng rú。 wáng wū duì kuāng lú。\nyuè míng shān sì yuǎn， fēng xì shuǐ tíng xū。\nzhuàng shì yāo jiān sān chǐ jiàn， nán ér fù nèi wǔ chē shū。\nshū yǐng àn xiāng， hé jìng gū shān méi ruǐ fàng； qīng yīn qīng zhòu， yuān míng jiù zhái liǔ tiáo shū。",
          "translation": "汤羹对米饭，柳树对榆树。短小的衣袖对长长的衣摆。鸡冠花对凤尾竹，芍药对荷花。周朝有贤人若，汉朝有辞赋大家司马相如。王屋山对匡庐山。月光照着远处的山寺，微风吹着空寂的水亭。壮士腰间挂着三尺宝剑，男儿肚里装着五车诗书。梅花疏影、暗香浮动，是林和靖在孤山赏梅；清荫淡淡、白昼悠悠，是陶渊明旧宅的柳条舒展。"
        }
      ]
    },
    {
      "title": "七虞 · 李渔",
      "art": "liweng-yun:ch7",
      "artPrompt": "《笠翁对韵》七虞韵诵读插画：对联意境的水墨花鸟小景，古风贴纸绘本，色彩明快",
      "blocks": [
        {
          "kind": "poem",
          "text": "红对白，有对无。布谷对提壶。\n毛锥对羽扇，天阙对皇都。\n谢蝴蝶，郑鹧鸪。蹈海对归湖。\n花肥春雨润，竹瘦晚风疏。\n麦饭豆麋终创汉，莼羹鲈脍竟归吴。\n琴调轻弹，杨柳月中潜去听；酒旗斜挂，杏花村里共来沽。",
          "pinyin": "hóng duì bái， yǒu duì wú。 bù gǔ duì tí hú。\nmáo zhuī duì yǔ shàn， tiān quē duì huáng dōu。\nxiè hú dié， zhèng zhè gū。 dǎo hǎi duì guī hú。\nhuā féi chūn yǔ rùn， zhú shòu wǎn fēng shū。\nmài fàn dòu mí zhōng chuàng hàn， chún gēng lú kuài jìng guī wú。\nqín tiáo qīng tán， yáng liǔ yuè zhōng qián qù tīng； jiǔ qí xié guà， xìng huā cūn lǐ gòng lái gū。",
          "translation": "红对白，有对无。布谷鸟对提壶鸟。毛笔对羽扇，天上的宫阙对皇家的都城。爱蝶的谢逸被人叫作谢蝴蝶，爱写鹧鸪诗的郑谷被人唤作郑鹧鸪；鲁仲连宁可蹈海也不做秦民，范蠡功成身退泛舟五湖。春雨滋润花儿肥，晚风疏朗竹子瘦。一碗麦饭一顿豆粥养育了创汉的人；一碗莼羹一盘鲈鱼美味让人辞官回了吴地。轻弹琴曲的人躲进杨柳月色里悄悄听，斜挂的酒旗底下，人们到杏花村来打酒。"
        }
      ]
    },
    {
      "title": "八齐 · 李渔",
      "art": "liweng-yun:ch8",
      "artPrompt": "《笠翁对韵》八齐韵诵读插画：对联意境的水墨花鸟小景，古风贴纸绘本，色彩明快",
      "blocks": [
        {
          "kind": "poem",
          "text": "鸾对凤，犬对鸡。塞北对关西。\n长生对益智，老幼对旄倪。\n颁竹策，剪桐圭。剥枣对蒸梨。\n绵腰如弱柳，嫩手似柔荑。\n狡兔能穿三穴隐，鹪鹩权借一枝栖。\n甪里先生，策杖垂绅扶少主；於陵仲子，辟纑织履赖贤妻。",
          "pinyin": "luán duì fèng， quǎn duì jī。 sài běi duì guān xī。\ncháng shēng duì yì zhì， lǎo yòu duì máo ní。\nbān zhú cè， jiǎn tóng guī。 bāo zǎo duì zhēng lí。\nmián yāo rú ruò liǔ， nèn shǒu sì róu yí。\njiǎo tù néng chuān sān xué yǐn， jiāo liáo quán jiè yī zhī qī。\nlù lǐ xiān shēng， cè zhàng chuí shēn fú shǎo zhǔ； wū líng zhòng zǐ， pì lú zhī lǚ lài xián qī。",
          "translation": "鸾鸟对凤凰，小狗对公鸡。塞北对关西。长生草对益智果，老人对孩童。颁发竹简的策书，剪桐叶封弟为圭，剥枣对蒸梨。绵软的腰肢像柔弱的柳条，嫩嫩的手好像初生的茅芽。狡猾的兔子能挖三个洞穴藏身，小小的鹪鹩不过借一根树枝栖息。南山四皓里的甪里先生拄着杖、垂着衣带辅佐少主；战国贤人陈仲子辟纑织履，靠贤惠的妻子度日。"
        }
      ]
    },
    {
      "title": "九佳 · 李渔",
      "art": "liweng-yun:ch9",
      "artPrompt": "《笠翁对韵》九佳韵诵读插画：对联意境的水墨花鸟小景，古风贴纸绘本，色彩明快",
      "blocks": [
        {
          "kind": "poem",
          "text": "门对户，陌对街。枝叶对根荄。\n斗鸡对挥麈，凤髻对鸾钗。\n登楚岫，渡秦淮。子犯对夫差。\n石鼎龙头缩，银筝雁翅排。\n百年诗礼延余庆，万里风云入壮怀。\n莫辨名伦，死矣野哉悲季路；不由径窦，生乎愚也有高柴。",
          "pinyin": "mén duì hù， mò duì jiē。 zhī yè duì gēn gāi。\ndòu jī duì huī zhǔ， fèng jì duì luán chāi。\ndēng chǔ xiù， dù qín huái。 zǐ fàn duì fū chà。\nshí dǐng lóng tóu suō， yín zhēng yàn chì pái。\nbǎi nián shī lǐ yán yú qìng， wàn lǐ fēng yún rù zhuàng huái。\nmò biàn míng lún， sǐ yǐ yě zāi bēi jì lù； bù yóu jìng dòu， shēng hū yú yě yǒu gāo chái。",
          "translation": "大门对小户，田间小路对街市。枝叶对根须。斗鸡的游戏对挥麈的清谈，凤形的发髻对鸾形的钗。登上楚地的山峰，渡过秦淮的河水，子犯对夫差。石鼎上雕的龙头缩着，银筝上架的雁翅排开。百年诗书传家延绵福泽，万里风云扑面激起壮志豪情。分不清名分的季路死得悲壮；不走邪径的高柴生性愚直却是贤人。"
        }
      ]
    },
    {
      "title": "十灰 · 李渔",
      "art": "liweng-yun:ch10",
      "artPrompt": "《笠翁对韵》十灰韵诵读插画：对联意境的水墨花鸟小景，古风贴纸绘本，色彩明快",
      "blocks": [
        {
          "kind": "poem",
          "text": "春对夏，喜对哀。大手对长才。\n风清对月朗，地阔对天开。\n游阆苑，醉蓬莱。七政对三台。\n青龙壶老杖，白燕玉人钗。\n香风十里望仙阁，明月一天思子台。\n玉洁冰桃，王母几因求道降；莲舟藜杖，真人原为读书来。",
          "pinyin": "chūn duì xià， xǐ duì āi。 dà shǒu duì cháng cái。\nfēng qīng duì yuè lǎng， dì kuò duì tiān kāi。\nyóu láng yuàn， zuì péng lái。 qī zhèng duì sān tái。\nqīng lóng hú lǎo zhàng， bái yàn yù rén chāi。\nxiāng fēng shí lǐ wàng xiān gé， míng yuè yī tiān sī zǐ tái。\nyù jié bīng táo， wáng mǔ jǐ yīn qiú dào jiàng； lián zhōu lí zhàng， zhēn rén yuán wèi dú shū lái。",
          "translation": "春天对夏天，欢喜对悲哀。大手笔对栋梁才。清风对明月，大地开阔对天空敞亮。游览阆苑仙宫，醉倒在蓬莱仙境，日月五星对三台星。骑青龙的是壶公老人，戴白燕钗的是仙女玉人。香风飘过十里的望仙阁，明月照着一天的思子台。玉一样纯洁、桃一样鲜美的仙果，王母娘娘为求道几度降临；坐着莲舟、拄着藜杖的仙人，原本是为了读书而来。"
        }
      ]
    },
    {
      "title": "十一真 · 李渔",
      "art": "liweng-yun:ch11",
      "artPrompt": "《笠翁对韵》十一真韵诵读插画：对联意境的水墨花鸟小景，古风贴纸绘本，色彩明快",
      "blocks": [
        {
          "kind": "poem",
          "text": "莲对菊，凤对麟。浊富对清贫。\n渔庄对佛舍，松盖对花茵。\n萝月叟，葛天民。国宝对家珍。\n草迎金埒马，花醉玉楼人。\n巢燕三春尝唤友，塞鸿八月始来宾。\n古往今来，谁见泰山曾作砺；天长地久，人传沧海几扬尘。",
          "pinyin": "lián duì jú， fèng duì lín。 zhuó fù duì qīng pín。\nyú zhuāng duì fó shè， sōng gài duì huā yīn。\nluó yuè sǒu， gě tiān mín。 guó bǎo duì jiā zhēn。\ncǎo yíng jīn liè mǎ， huā zuì yù lóu rén。\ncháo yàn sān chūn cháng huàn yǒu， sāi hóng bā yuè shǐ lái bīn。\ngǔ wǎng jīn lái， shuí jiàn tài shān céng zuò lì； tiān cháng dì jiǔ， rén chuán cāng hǎi jǐ yáng chén。",
          "translation": "莲花对菊花，凤凰对麒麟。不义之财的富有对清白守节的贫穷。渔庄对佛寺，松树如伞对花草如垫。月下采藤的老翁，葛天氏治下的无忧百姓，国之瑰宝对家中珍宝。青草迎着金埒里奔跑的马，鲜花醉倒了玉楼里的人。筑巢的燕子三春里常常呼唤朋友，塞外的大雁到八月才来做客。古往今来，谁见过泰山变磨刀石；天长地久，人传说沧海几次变桑田。"
        }
      ]
    },
    {
      "title": "十二文 · 李渔",
      "art": "liweng-yun:ch12",
      "artPrompt": "《笠翁对韵》十二文韵诵读插画：对联意境的水墨花鸟小景，古风贴纸绘本，色彩明快",
      "blocks": [
        {
          "kind": "poem",
          "text": "忧对喜，戚对欣。五典对三坟。\n佛经对仙语，夏耨对春耘。\n烹早韭，剪春芹。暮雨对朝云。\n竹间斜白接，花下醉红裙。\n掌握灵符五岳箓，腰悬宝剑七星纹。\n金锁未开，上相趋听宫漏水；珠帘半卷，群僚仰对御炉薰。",
          "pinyin": "yōu duì xǐ， qī duì xīn。 wǔ diǎn duì sān fén。\nfó jīng duì xiān yǔ， xià nòu duì chūn yún。\npēng zǎo jiǔ， jiǎn chūn qín。 mù yǔ duì cháo yún。\nzhú jiān xié bái jiē， huā xià zuì hóng qún。\nzhǎng wò líng fú wǔ yuè lù， yāo xuán bǎo jiàn qī xīng wén。\njīn suǒ wèi kāi， shàng xiāng qū tīng gōng lòu shuǐ； zhū lián bàn juàn， qún liáo yǎng duì yù lú xūn。",
          "translation": "忧愁对欢喜，悲伤对欣喜。五典对三坟。佛经对仙语，夏天锄草对春天耕耘。煮一把早韭，剪一把春芹，傍晚的雨对早晨的云。竹林间斜戴白帽的名士，花丛下醉倒的红裙佳人。手里握着五岳灵符，腰间挂着七星宝剑。宫门金锁未开，宰相赶着去听宫漏报时；珍珠帘子半卷，百官仰望着御炉的香烟。"
        }
      ]
    },
    {
      "title": "十三元 · 李渔",
      "art": "liweng-yun:ch13",
      "artPrompt": "《笠翁对韵》十三元韵诵读插画：对联意境的水墨花鸟小景，古风贴纸绘本，色彩明快",
      "blocks": [
        {
          "kind": "poem",
          "text": "卑对长，季对昆。永巷对长门。\n山亭对水阁，旅舍对军屯。\n杨子渡，谢公墩。德重对年尊。\n承乾对出震，叠坎对重坤。\n志士报君思犬马，仁王养老察鸡豚。\n远水平沙，有客泛舟桃叶渡；斜风细雨，何人携榼杏花村。",
          "pinyin": "bēi duì cháng， jì duì kūn。 yǒng xiàng duì cháng mén。\nshān tíng duì shuǐ gé， lǚ shè duì jūn tún。\nyáng zǐ dù， xiè gōng dūn。 dé zhòng duì nián zūn。\nchéng qián duì chū zhèn， dié kǎn duì zhòng kūn。\nzhì shì bào jūn sī quǎn mǎ， rén wáng yǎng lǎo chá jī tún。\nyuǎn shuǐ píng shā， yǒu kè fàn zhōu táo yè dù； xié fēng xì yǔ， hé rén xié kē xìng huā cūn。",
          "translation": "低对高，弟弟对兄长。深长的宫巷对冷落的宫门。山亭对水阁，旅店对军营。扬子江渡口，谢公墩，德行厚重对年高望尊。承乾对出震，重重坎卦对重重坤卦。有志之士报答君王，甘愿效犬马之劳；仁德的君王养老，细心体察鸡猪的饲养。远处水平如沙，有客人泛舟桃叶渡；斜风细雨里，是谁提着酒壶走向杏花村。"
        }
      ]
    },
    {
      "title": "十四寒 · 李渔",
      "art": "liweng-yun:ch14",
      "artPrompt": "《笠翁对韵》十四寒韵诵读插画：对联意境的水墨花鸟小景，古风贴纸绘本，色彩明快",
      "blocks": [
        {
          "kind": "poem",
          "text": "家对国，治对安。地主对天官。\n坎男对离女，周诰对殷盘。\n三三暖，九九寒。杜撰对包弹。\n古壁蛩声匝，闲亭鹤影单。\n燕出帘边春寂寂，莺闻枕上漏珊珊。\n池柳烟飘，日夕郎归青琐闼；阶花雨过，月明人倚玉栏杆。",
          "pinyin": "jiā duì guó， zhì duì ān。 dì zhǔ duì tiān guān。\nkǎn nán duì lí nǚ， zhōu gào duì yīn pán。\nsān sān nuǎn， jiǔ jiǔ hán。 dù zhuàn duì bāo tán。\ngǔ bì qióng shēng zā， xián tíng hè yǐng dān。\nyàn chū lián biān chūn jì jì， yīng wén zhěn shàng lòu shān shān。\nchí liǔ yān piāo， rì xī láng guī qīng suǒ tà； jiē huā yǔ guò， yuè míng rén yǐ yù lán gān。",
          "translation": "家对国，治理对安定。地主对天官。坎卦的男对离卦的女，周公的告诫对殷商的盘铭。三三虽暖还有九九之寒，随口杜撰对随意褒贬。古墙下蟋蟀声四起，闲亭里鹤影孤单。燕子飞出帘外春天静悄悄，黄莺在枕边听见更漏声声。池塘边的柳树笼着轻烟，傍晚郎官归了宫门；台阶前的花被雨打过，月明之夜有人倚着玉栏杆。"
        }
      ]
    },
    {
      "title": "十五删 · 李渔",
      "art": "liweng-yun:ch15",
      "artPrompt": "《笠翁对韵》十五删韵诵读插画：对联意境的水墨花鸟小景，古风贴纸绘本，色彩明快",
      "blocks": [
        {
          "kind": "poem",
          "text": "林对坞，岭对峦。昼永对春闲。\n谋深对望重，任大对投艰。\n裙袅袅，佩珊珊。守塞对当关。\n密云千里合，新月一钩弯。\n叔宝君臣皆纵逸，重华父母是嚚顽。\n名动帝畿，西蜀三苏来日下；壮游京洛，东吴二陆起云间。",
          "pinyin": "lín duì wù， lǐng duì luán。 zhòu yǒng duì chūn xián。\nmóu shēn duì wàng zhòng， rèn dà duì tóu jiān。\nqún niǎo niǎo， pèi shān shān。 shǒu sāi duì dāng guān。\nmì yún qiān lǐ hé， xīn yuè yī gōu wān。\nshū bǎo jūn chén jiē zòng yì， zhòng huá fù mǔ shì yín wán。\nmíng dòng dì jī， xī shǔ sān sū lái rì xià； zhuàng yóu jīng luò， dōng wú èr lù qǐ yún jiān。",
          "translation": "树林对山坞，山岭对峰峦。白昼漫长对春天清闲。谋略深远对声望隆重，担子重大对路途艰难。裙摆袅袅，玉佩珊珊，守卫边塞对把守关隘。千里的密云聚拢，一弯新月弯弯。陈后主的君臣全都纵情享乐，虞舜的父亲父母顽固不贤。名震京城的是从西蜀来的三苏；壮游京洛的是东吴出身的二陆。"
        }
      ]
    },
    {
      "title": "一先 · 李渔",
      "art": "liweng-yun:ch16",
      "artPrompt": "《笠翁对韵》一先韵诵读插画：对联意境的水墨花鸟小景，古风贴纸绘本，色彩明快",
      "blocks": [
        {
          "kind": "poem",
          "text": "寒对暑，日对年。蹴踘对秋千。\n丹山对碧水，淡雨对轻烟。\n歌宛转，貌婵娟。雪赋对云笺。\n荒芦栖宿雁，疏柳噪秋蝉。\n洗耳尚逢高士笑，折腰肯受小儿怜。\n郭泰泛舟，折角半垂梅子雨；山涛骑马，接篱倒著杏花天。",
          "pinyin": "hán duì shǔ， rì duì nián。 cù jū duì qiū qiān。\ndān shān duì bì shuǐ， dàn yǔ duì qīng yān。\ngē wǎn zhuǎn， mào chán juān。 xuě fù duì yún jiān。\nhuāng lú qī sù yàn， shū liǔ zào qiū chán。\nxǐ ěr shàng féng gāo shì xiào， zhé yāo kěn shòu xiǎo ér lián。\nguō tài fàn zhōu， zhé jiǎo bàn chuí méi zǐ yǔ； shān tāo qí mǎ， jiē lí dǎo zhù xìng huā tiān。",
          "translation": "寒冷对炎热，一天对一年。踢蹴鞠对荡秋千。红色的山对碧绿的水，淡淡的雨对轻轻的烟。歌声宛转，容貌美丽，雪赋对云笺。荒芦丛里栖息着过夜的雁，稀疏的柳枝上秋蝉噪鸣。许由洗耳还遇上高士笑话，陶潜不为五斗米折腰谁肯受小儿怜。郭泰泛舟，帽子被梅子雨打湿半折；山涛骑马，接篱帽倒戴在杏花天里。"
        }
      ]
    },
    {
      "title": "二萧 · 李渔",
      "art": "liweng-yun:ch17",
      "artPrompt": "《笠翁对韵》二萧韵诵读插画：对联意境的水墨花鸟小景，古风贴纸绘本，色彩明快",
      "blocks": [
        {
          "kind": "poem",
          "text": "琴对管，斧对瓢。水怪对花妖。\n秋声对春色，白缣对红绡。\n臣五代，事三朝。斗柄对弓腰。\n醉客歌金缕，佳人品玉箫。\n风定落花闲不扫，霜余残叶湿难烧。\n千载兴周，尚父一竿投渭水；百年霸越，钱王万弩射江潮。",
          "pinyin": "qín duì guǎn， fǔ duì piáo。 shuǐ guài duì huā yāo。\nqiū shēng duì chūn sè， bái jiān duì hóng xiāo。\nchén wǔ dài， shì sān cháo。 dòu bǐng duì gōng yāo。\nzuì kè gē jīn lǚ， jiā rén pǐn yù xiāo。\nfēng dìng luò huā xián bù sǎo， shuāng yú cán yè shī nán shāo。\nqiān zǎi xīng zhōu， shàng fù yī gān tóu wèi shuǐ； bǎi nián bà yuè， qián wáng wàn nǔ shè jiāng cháo。",
          "translation": "琴对管乐，斧头对瓢勺。水中的妖怪对花草的精怪。秋天的声音对春天的景色，白绢对红绡。侍奉过五个朝代的冯道，历事三个王朝的宰相，北斗的柄对女子的腰。醉了的客人唱着金缕曲，佳人吹起玉箫。风停了落花闲着不去扫，霜后的残叶湿了难烧。千年兴起的周朝，是尚父姜太公一竿钓在渭水边；百年霸业在越国，是钱王万支弩箭射向江潮。"
        }
      ]
    },
    {
      "title": "三肴 · 李渔",
      "art": "liweng-yun:ch18",
      "artPrompt": "《笠翁对韵》三肴韵诵读插画：对联意境的水墨花鸟小景，古风贴纸绘本，色彩明快",
      "blocks": [
        {
          "kind": "poem",
          "text": "诗对礼，卦对爻。燕引对莺调。\n晨钟对暮鼓，野馔对山肴。\n雉方乳，鹊始巢。猛虎对神獒。\n疏星浮荇叶，皓月上松梢。\n为邦自古推瑚琏，从政于今愧斗筲。\n管鲍相知，能交忘形胶漆友；蔺廉有隙，终为刎颈死生交。",
          "pinyin": "shī duì lǐ， guà duì yáo。 yàn yǐn duì yīng tiáo。\nchén zhōng duì mù gǔ， yě zhuàn duì shān yáo。\nzhì fāng rǔ， què shǐ cháo。 měng hǔ duì shén áo。\nshū xīng fú xìng yè， hào yuè shàng sōng shāo。\nwèi bāng zì gǔ tuī hú liǎn， cóng zhèng yú jīn kuì dòu shāo。\nguǎn bào xiāng zhī， néng jiāo wàng xíng jiāo qī yǒu； lìn lián yǒu xì， zhōng wèi wěn jǐng sǐ shēng jiāo。",
          "translation": "诗经的风对雅，卦象对爻辞。燕子引路对黄莺调嗓。早晨的钟对傍晚的鼓，野外的饭食对山中的佳肴。野鸡正孵卵，喜鹊开始筑巢，猛虎对神犬。稀疏的星浮在荇菜叶上，洁白的月挂上松树梢头。治国自古推崇瑚琏之器，做官到今天惭愧于斗筲之器。管仲鲍叔牙相互知心，是忘形的胶漆之交；蔺相如廉颇曾有嫌隙，终成刎颈的生死之交。"
        }
      ]
    },
    {
      "title": "四豪 · 李渔",
      "art": "liweng-yun:ch19",
      "artPrompt": "《笠翁对韵》四豪韵诵读插画：对联意境的水墨花鸟小景，古风贴纸绘本，色彩明快",
      "blocks": [
        {
          "kind": "poem",
          "text": "茭对茨，荻对蒿。山麓对江皋。\n莺簧对蝶板，麦浪对桃涛。\n骐骥足，凤凰毛。美誉对嘉褒。\n文人窥蠹简，学士书兔毫。\n马援南征载薏苡，张骞西使进葡萄。\n辩口悬河，万语千言常亹亹；词源倒峡，连篇累牍自滔滔。",
          "pinyin": "jiāo duì cí， dí duì hāo。 shān lù duì jiāng gāo。\nyīng huáng duì dié bǎn， mài làng duì táo tāo。\nqí jì zú， fèng huáng máo。 měi yù duì jiā bāo。\nwén rén kuī dù jiǎn， xué shì shū tù háo。\nmǎ yuán nán zhēng zǎi yì yǐ， zhāng qiān xī shǐ jìn pú táo。\nbiàn kǒu xuán hé， wàn yǔ qiān yán cháng wěi wěi； cí yuán dǎo xiá， lián piān lěi dú zì tāo tāo。",
          "translation": "茭白对茨菰，芦荻对蒿草。山脚下对江岸边。黄莺的簧音对蝴蝶的翅板，翻滚的麦浪对桃花的春涛。千里马的脚力，凤凰的羽毛，美好的名声对嘉奖的赞誉。文人翻看虫蛀的书简，学士手握兔毫的笔。马援南征载回薏苡，张骞西使带回葡萄。口才如悬河，万语千言滔滔不绝；文思如倒峡，连篇累牍奔涌而来。"
        }
      ]
    },
    {
      "title": "五歌 · 李渔",
      "art": "liweng-yun:ch20",
      "artPrompt": "《笠翁对韵》五歌韵诵读插画：对联意境的水墨花鸟小景，古风贴纸绘本，色彩明快",
      "blocks": [
        {
          "kind": "poem",
          "text": "微对巨，少对多。直干对平柯。\n蜂媒对蝶使，雨笠对烟蓑。\n眉淡扫，面微酡。妙舞对清歌。\n轻衫裁夏葛，薄袂剪春罗。\n将相兼行唐李靖，霸王杂用汉萧何。\n月本阴精，岂有羿妻曾窃药；星为夜宿，浪传织女漫投梭。",
          "pinyin": "wēi duì jù， shǎo duì duō。 zhí gān duì píng kē。\nfēng méi duì dié shǐ， yǔ lì duì yān suō。\nméi dàn sǎo， miàn wēi tuó。 miào wǔ duì qīng gē。\nqīng shān cái xià gě， báo mèi jiǎn chūn luó。\njiàng xiàng jiān xíng táng lǐ jìng， bà wáng zá yòng hàn xiāo hé。\nyuè běn yīn jīng， qǐ yǒu yì qī céng qiè yào； xīng wèi yè sù， làng chuán zhī nǚ màn tóu suō。",
          "translation": "微小对巨大，少对多。笔直的树干对平整的枝柯。蜜蜂做媒对蝴蝶当使者，雨天的斗笠对烟雾里的蓑衣。淡淡地描眉，微微地醉酒，曼妙的舞对清亮的歌。轻衫裁的是夏天的葛布，薄袖剪的是春天的罗纱。出将入相兼而有之的是唐朝李靖，王道霸道混合施用的是汉朝萧何。月亮本是阴精，哪有羿妻真的偷了仙药；星星是夜宿，听传说织女白白投梭罢了。"
        }
      ]
    },
    {
      "title": "六麻 · 李渔",
      "art": "liweng-yun:ch21",
      "artPrompt": "《笠翁对韵》六麻韵诵读插画：对联意境的水墨花鸟小景，古风贴纸绘本，色彩明快",
      "blocks": [
        {
          "kind": "poem",
          "text": "清对浊，美对嘉。鄙吝对矜夸。\n花须对柳眼，屋角对檐牙。\n志和宅，博望槎。秋实对春华。\n乾炉烹白雪，坤鼎炼丹砂。\n深宵望冷沙场月，边塞听残野戍笳。\n满院松风，钟声隐隐为僧舍；半窗花月，锡影依依是道家。",
          "pinyin": "qīng duì zhuó， měi duì jiā。 bǐ lìn duì jīn kuā。\nhuā xū duì liǔ yǎn， wū jiǎo duì yán yá。\nzhì hé zhái， bó wàng chá。 qiū shí duì chūn huá。\nqián lú pēng bái xuě， kūn dǐng liàn dān shā。\nshēn xiāo wàng lěng shā chǎng yuè， biān sài tīng cán yě shù jiā。\nmǎn yuàn sōng fēng， zhōng shēng yǐn yǐn wèi sēng shè； bàn chuāng huā yuè， xī yǐng yī yī shì dào jiā。",
          "translation": "清对浊，美好对嘉奖。粗俗吝啬对骄傲自夸。花蕊对柳叶，屋角对檐牙。张志和的宅子，博望侯的木筏，秋天的果实对春天的花。天炉烹煮白雪，地鼎炼制丹砂。深夜里望着沙场的冷月，边塞上听尽悲凉的胡笳。满院松风吹来钟声隐隐，那是僧人的寺院；半窗花月照着锡杖身影依依，那是修道的人家。"
        }
      ]
    },
    {
      "title": "七阳 · 李渔",
      "art": "liweng-yun:ch22",
      "artPrompt": "《笠翁对韵》七阳韵诵读插画：对联意境的水墨花鸟小景，古风贴纸绘本，色彩明快",
      "blocks": [
        {
          "kind": "poem",
          "text": "台对阁，沼对塘。朝雨对夕阳。\n游人对隐士，谢女对秋娘。\n三寸舌，九回肠。玉液对琼浆。\n秦皇照胆镜，徐肇返魂香。\n青萍夜啸芙蓉匣，黄卷时摊薜荔床。\n元亨利贞，天地一机成化育；仁义礼智，圣贤千古立纲常。",
          "pinyin": "tái duì gé， zhǎo duì táng。 cháo yǔ duì xī yáng。\nyóu rén duì yǐn shì， xiè nǚ duì qiū niáng。\nsān cùn shé， jiǔ huí cháng。 yù yè duì qióng jiāng。\nqín huáng zhào dǎn jìng， xú zhào fǎn hún xiāng。\nqīng píng yè xiào fú róng xiá， huáng juàn shí tān bì lì chuáng。\nyuán hēng lì zhēn， tiān dì yī jī chéng huà yù； rén yì lǐ zhì， shèng xián qiān gǔ lì gāng cháng。",
          "translation": "高台对楼阁，水池对池塘。早晨的雨对傍晚的阳。游子对隐士，才女谢道韫对歌女秋娘。三寸不烂之舌，九曲回肠，美玉的液对琼浆。秦始皇有照胆的宝镜，徐肇有返魂的奇香。青萍剑夜里在芙蓉匣中长啸，黄卷书时常摊放在薜荔床上。元亨利贞，天地靠这一机制化育万物；仁义礼智，圣贤用它立起千古纲常。"
        }
      ]
    },
    {
      "title": "八庚 · 李渔",
      "art": "liweng-yun:ch23",
      "artPrompt": "《笠翁对韵》八庚韵诵读插画：对联意境的水墨花鸟小景，古风贴纸绘本，色彩明快",
      "blocks": [
        {
          "kind": "poem",
          "text": "形对貌，色对声。夏邑对周京。\n江云对涧树，玉磬对银筝。\n人老老，我卿卿。晓燕对春莺。\n玄霜舂玉杵，白露贮金茎。\n贾客君山秋弄笛，仙人缑岭夜吹笙。\n帝业独兴，尽道汉高能用将；父书空读，谁言赵括善知兵。",
          "pinyin": "xíng duì mào， sè duì shēng。 xià yì duì zhōu jīng。\njiāng yún duì jiàn shù， yù qìng duì yín zhēng。\nrén lǎo lǎo， wǒ qīng qīng。 xiǎo yàn duì chūn yīng。\nxuán shuāng chōng yù chǔ， bái lù zhù jīn jīng。\njiǎ kè jūn shān qiū nòng dí， xiān rén gōu lǐng yè chuī shēng。\ndì yè dú xīng， jìn dào hàn gāo néng yòng jiāng； fù shū kōng dú， shuí yán zhào kuò shàn zhī bīng。",
          "translation": "形体对容貌，颜色对声音。夏朝的都邑对周朝的京城。江上的云对山涧的树，玉磬对银筝。尊敬老人的老人，亲爱贤者的贤者，春天的燕对春天的莺。舂捣玄霜用玉杵，贮放白露用金茎。商人在君山秋夜吹笛，仙人在缑山夜半吹笙。汉朝帝业独兴，人人说汉高祖会用人；赵括空读父亲兵书，谁信他真的会带兵。"
        }
      ]
    },
    {
      "title": "九青 · 李渔",
      "art": "liweng-yun:ch24",
      "artPrompt": "《笠翁对韵》九青韵诵读插画：对联意境的水墨花鸟小景，古风贴纸绘本，色彩明快",
      "blocks": [
        {
          "kind": "poem",
          "text": "庚对甲，乙对丁。魏阙对彤庭。\n梅妻对鹤子，珠箔对银屏。\n鸳浴沼，鹭飞汀。鸿雁对鹡鸰。\n人间寿者相，天上老人星。\n八月好修攀桂斧，三春须系护花铃。\n江阁凭临，一水净连天际碧；石栏闲倚，群山秀向雨余青。",
          "pinyin": "gēng duì jiǎ， yǐ duì dīng。 wèi quē duì tóng tíng。\nméi qī duì hè zǐ， zhū bó duì yín píng。\nyuān yù zhǎo， lù fēi tīng。 hóng yàn duì jí líng。\nrén jiān shòu zhě xiāng， tiān shàng lǎo rén xīng。\nbā yuè hǎo xiū pān guì fǔ， sān chūn xū xì hù huā líng。\njiāng gé píng lín， yī shuǐ jìng lián tiān jì bì； shí lán xián yǐ， qún shān xiù xiàng yǔ yú qīng。",
          "translation": "庚对甲，乙对丁。宫门对宫廷。以梅为妻对以鹤为子，珍珠帘对银屏风。鸳鸯在池里沐浴，白鹭在沙洲飞翔，鸿雁对鹡鸰。人间有长寿者的相貌，天上有寿星的星光。八月里好修攀桂的斧头，三春里须系护花的铃铛。江阁凭栏远望，一江碧水连着天边；石栏闲倚，群山在雨后显得格外青翠。"
        }
      ]
    },
    {
      "title": "十蒸 · 李渔",
      "art": "liweng-yun:ch25",
      "artPrompt": "《笠翁对韵》十蒸韵诵读插画：对联意境的水墨花鸟小景，古风贴纸绘本，色彩明快",
      "blocks": [
        {
          "kind": "poem",
          "text": "苹对蓼，芡对菱。雁弋对鱼罾。\n齐纨对鲁缟，蜀锦对吴绫。\n星渐没，日初升。九聘对三征。\n萧何曾作吏，贾岛昔为僧。\n贤人视履循规矩，大匠挥斤按准绳。\n野渡春风，人喜乘潮移酒舫；江天暮雨，客愁隔岸对渔灯。",
          "pinyin": "píng duì liǎo， qiàn duì líng。 yàn yì duì yú zēng。\nqí wán duì lǔ gǎo， shǔ jǐn duì wú líng。\nxīng jiàn méi， rì chū shēng。 jiǔ pìn duì sān zhēng。\nxiāo hé céng zuò lì， jiǎ dǎo xī wèi sēng。\nxián rén shì lǚ xún guī jǔ， dà jiàng huī jīn àn zhǔn shéng。\nyě dù chūn fēng， rén xǐ chéng cháo yí jiǔ fǎng； jiāng tiān mù yǔ， kè chóu gé àn duì yú dēng。",
          "translation": "苹对蓼，芡实对菱角。用绳箭射雁对用渔网捕鱼。齐地的白绢对鲁地的素绢，蜀地的锦对吴地的绫。星星渐渐隐没，太阳刚刚升起，九次礼聘对三次征召。萧何曾经做过小吏，贾岛从前当过僧人。贤人走路遵循规矩，大匠挥斧合于准绳。野外的渡口春风拂面，人们喜欢趁涨潮搬动酒船；江天日暮细雨蒙蒙，旅人的愁绪隔岸对着渔灯。"
        }
      ]
    },
    {
      "title": "十一尤 · 李渔",
      "art": "liweng-yun:ch26",
      "artPrompt": "《笠翁对韵》十一尤韵诵读插画：对联意境的水墨花鸟小景，古风贴纸绘本，色彩明快",
      "blocks": [
        {
          "kind": "poem",
          "text": "荣对辱，喜对忧。缱绻对绸缪。\n吴娃对越女，野马对沙鸥。\n茶解渴，酒消愁。白眼对苍头。\n马迁修史记，孔子作春秋。\n莘野耕夫闲举耜，磻溪渔父晚垂钩。\n龙马游河，羲圣因图而画卦；神龟出洛，禹王取法以明畴。",
          "pinyin": "róng duì rǔ， xǐ duì yōu。 qiǎn quǎn duì chóu móu。\nwú wá duì yuè nǚ， yě mǎ duì shā ōu。\nchá jiě kě， jiǔ xiāo chóu。 bái yǎn duì cāng tóu。\nmǎ qiān xiū shǐ jì， kǒng zǐ zuò chūn qiū。\nshēn yě gēng fū xián jǔ sì， pán xī yú fù wǎn chuí gōu。\nlóng mǎ yóu hé， xī shèng yīn tú ér huà guà； shén guī chū luò， yǔ wáng qǔ fǎ yǐ míng chóu。",
          "translation": "荣耀对屈辱，欢喜对忧愁。夜里的宴会对春天的出游。燕地的关对楚地的水，蜀地的狗对吴地的牛。茶能解渴，酒能消愁，青眼看人对白头相守。司马迁修撰《史记》，孔子写作《春秋》。莘野里耕田的农夫悠闲地举起耒耜，磻溪边钓鱼的渔父傍晚垂下钓钩。龙马游出黄河，伏羲依照图纹画出八卦；神龟浮出洛水，大禹取法龟纹定下田畴。"
        }
      ]
    },
    {
      "title": "十二侵 · 李渔",
      "art": "liweng-yun:ch27",
      "artPrompt": "《笠翁对韵》十二侵韵诵读插画：对联意境的水墨花鸟小景，古风贴纸绘本，色彩明快",
      "blocks": [
        {
          "kind": "poem",
          "text": "歌对曲，啸对吟。往古对来今。\n山头对水面，远浦对遥岑。\n勤三上，惜寸阴。茂树对平林。\n卞和三献玉，杨震四知金。\n青皇风暖催芳草，白帝城高急暮砧。\n绣虎雕龙，才子窗前挥彩笔；描鸾刺凤，佳人帘下度金针。",
          "pinyin": "gē duì qǔ， xiào duì yín。 wǎng gǔ duì lái jīn。\nshān tóu duì shuǐ miàn， yuǎn pǔ duì yáo cén。\nqín sān shàng， xī cùn yīn。 mào shù duì píng lín。\nbiàn hé sān xiàn yù， yáng zhèn sì zhī jīn。\nqīng huáng fēng nuǎn cuī fāng cǎo， bái dì chéng gāo jí mù zhēn。\nxiù hǔ diāo lóng， cái zǐ chuāng qián huī cǎi bǐ； miáo luán cì fèng， jiā rén lián xià dù jīn zhēn。",
          "translation": "唱歌对乐曲，长啸对低吟。过去的古代对来到的今天。山的头对水的面，远的浦对远的山。勤于三上，珍惜寸阴，茂密的树对平展的林。卞和三次献玉，杨震以四知拒金。青帝风暖催着芳草生长，白帝城高催着暮砧捣衣。绣虎般的才子在窗前挥动彩笔，描鸾刺凤的佳人在帘下飞针走线。"
        }
      ]
    },
    {
      "title": "十三覃 · 李渔",
      "art": "liweng-yun:ch28",
      "artPrompt": "《笠翁对韵》十三覃韵诵读插画：对联意境的水墨花鸟小景，古风贴纸绘本，色彩明快",
      "blocks": [
        {
          "kind": "poem",
          "text": "宫对阙，座对龛。水北对天南。\n蜃楼对蚁郡，伟论对高谈。\n遴杞梓，树楩楠。得一对函三。\n八宝珊瑚枕，双珠玳瑁簪。\n萧王待士心惟赤，卢相欺君面独蓝。\n贾岛诗狂，手拟敲门行处想；张颠草圣，头能濡墨写时酣。",
          "pinyin": "gōng duì quē， zuò duì kān。 shuǐ běi duì tiān nán。\nshèn lóu duì yǐ jùn， wěi lùn duì gāo tán。\nlín qǐ zǐ， shù pián nán。 dé yī duì hán sān。\nbā bǎo shān hú zhěn， shuāng zhū dài mào zān。\nxiāo wáng dài shì xīn wéi chì， lú xiāng qī jūn miàn dú lán。\njiǎ dǎo shī kuáng， shǒu nǐ qiāo mén xíng chù xiǎng； zhāng diān cǎo shèng， tóu néng rú mò xiě shí hān。",
          "translation": "宫殿对宫阙，座位对佛龛。水的北面对天的南面。海市蜃楼对蚁穴楼台，伟大的议论对高深的谈吐。挑选杞梓良木，培植楩楠大树，得一对待函三。八宝的珊瑚枕，双珠的玳瑁簪。萧王待士的心一片赤诚，卢杞欺君的脸色独呈阴蓝。贾岛作诗入迷，路上还比划着推敲敲门；张旭草书如圣，蘸着头发的墨写来正酣。"
        }
      ]
    },
    {
      "title": "十四盐 · 李渔",
      "art": "liweng-yun:ch29",
      "artPrompt": "《笠翁对韵》十四盐韵诵读插画：对联意境的水墨花鸟小景，古风贴纸绘本，色彩明快",
      "blocks": [
        {
          "kind": "poem",
          "text": "宽对猛，冷对炎。清直对尊严。\n云头对雨脚，鹤发对龙髯。\n风台谏，肃堂廉。保泰对鸣谦。\n五湖归范蠡，三径隐陶潜。\n一剑成功堪佩印，百钱满卦便垂帘。\n浊酒停杯，容我半酣愁际饮；好花傍座，看他微笑悟时拈。",
          "pinyin": "kuān duì měng， lěng duì yán。 qīng zhí duì zūn yán。\nyún tóu duì yǔ jiǎo， hè fā duì lóng rán。\nfēng tái jiàn， sù táng lián。 bǎo tài duì míng qiān。\nwǔ hú guī fàn lí， sān jìng yǐn táo qián。\nyī jiàn chéng gōng kān pèi yìn， bǎi qián mǎn guà biàn chuí lián。\nzhuó jiǔ tíng bēi， róng wǒ bàn hān chóu jì yǐn； hǎo huā bàng zuò， kàn tā wēi xiào wù shí niān。",
          "translation": "宽厚对严厉，寒冷对炎热。清白正直对庄严尊贵。云的头对雨的脚，白鹤的发对龙的胡须。风台的谏官，肃穆的堂廉，保泰对鸣谦。泛舟五湖归隐的是范蠡，隐居三径的是陶渊明。一剑成功的人可以佩印，百钱满卦的人便垂帘卖卜。浊酒停下杯来，容我在半醉的愁绪里畅饮；好花挨着座位，看它微笑着被人拈起。"
        }
      ]
    },
    {
      "title": "十五咸 · 李渔",
      "art": "liweng-yun:ch30",
      "artPrompt": "《笠翁对韵》十五咸韵诵读插画：对联意境的水墨花鸟小景，古风贴纸绘本，色彩明快",
      "blocks": [
        {
          "kind": "poem",
          "text": "栽对植，薙对芟。二伯对三监。\n朝臣对国老，职事对官衔。\n鹿麌麌，兔毚毚。启牍对开缄。\n绿杨莺睍睆，红杏燕呢喃。\n半篱白酒娱陶令，一枕黄粱度吕岩。\n九夏炎飙，长日风亭留客骑；三冬寒冽，漫天雪浪驻征帆。",
          "pinyin": "zāi duì zhí， tì duì shān。 èr bó duì sān jiān。\ncháo chén duì guó lǎo， zhí shì duì guān xián。\nlù yǔ yǔ， tù chán chán。 qǐ dú duì kāi jiān。\nlǜ yáng yīng xiàn huàn， hóng xìng yàn ní nán。\nbàn lí bái jiǔ yú táo lìng， yī zhěn huáng liáng dù lǚ yán。\njiǔ xià yán biāo， cháng rì fēng tíng liú kè qí； sān dōng hán liè， màn tiān xuě làng zhù zhēng fān。",
          "translation": "栽种对培植，割草对除草。二伯对三监。朝中的臣子对国家的元老，职责事务对官阶头衔。母鹿慢慢走，兔子轻快跳，开启信牍对打开封缄。绿杨里的黄莺叫声婉转，红杏枝头的燕子呢喃细语。半篱白酒让陶渊明自得其乐，一枕黄粱让吕洞宾梦醒成仙。九夏的炎风里，长长的白天在风亭留住客人的马；三冬的严寒中，漫天的雪浪让远行的帆船停驻。"
        }
      ]
    }
  ]
}
