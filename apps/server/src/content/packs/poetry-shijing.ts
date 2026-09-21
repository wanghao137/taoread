import type { PackBook } from '../types'

/**
 * 《诗经·亲子诵读本》——由 scripts/gen-corpus.mjs 从公版语料生成（2026-09-20 全面补全）。
 * 底本：诗经（佚名（先秦））。逐字来自语料数据集，译文为平台自撰白话。
 * 先秦歌谣，远超保护期。注音与白话译文为平台自撰。
 */
export const shiJing: PackBook = {
  id: "poetry-shijing",
  title: "诗经·亲子诵读本",
  author: "佚名（先秦）",
  lang: "zh",
  category: "poetry",
  ageStage: "6-8",
  intro: "三百篇最古老的歌谣：关关雎鸠、蒹葭苍苍，四字一句，像唱歌一样。",
  coverArt: "shijing-peach",
  coverArtPrompt: "春日山坡上一树盛开的粉桃花，花瓣随风飘落，树下穿古装的小姑娘伸手接花瓣，远处是青青的田野和炊烟，画面柔和明亮",
  coverFrom: "#F48FB1",
  coverTo: "#FFE082",
  source: "公版古籍（先秦）全本，自撰注音与白话译文",
  chapters: [
    {
      title: "关雎 · 佚名",
      art: "river-boat",
      artPrompt: "古诗《关雎》意境插画：关关雎鸠，在河之洲。窈窕淑女，君子好逑。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "关关雎鸠，在河之洲。窈窕淑女，君子好逑。\n参差荇菜，左右流之。窈窕淑女，寤寐求之。\n求之不得，寤寐思服。悠哉悠哉，辗转反侧。\n参差荇菜，左右采之。窈窕淑女，琴瑟友之。\n参差荇菜，左右芼之。窈窕淑女，钟鼓乐之。",
        pinyin: "guān guān jū jiū， zài hé zhī zhōu。 yǎo tiǎo shū nǚ， jūn zǐ hǎo qiú。\ncēn cī xìng cài， zuǒ yòu liú zhī。 yǎo tiǎo shū nǚ， wù mèi qiú zhī。\nqiú zhī bù dé， wù mèi sī fú。 yōu zāi yōu zāi， niǎn zhuǎn fǎn cè。\ncēn cī xìng cài， zuǒ yòu cǎi zhī。 yǎo tiǎo shū nǚ， qín sè yǒu zhī。\ncēn cī xìng cài， zuǒ yòu mào zhī。 yǎo tiǎo shū nǚ， zhōng gǔ yuè zhī。",
        translation: "雎鸠鸟关关地叫着，住在河中的小洲上，那文静美好的好姑娘，是君子的好伴侣。长长短短的荇菜，顺着水流左边右边去采它，那文静美好的好姑娘，醒着睡着都在追求她。追求她却得不到，醒着睡着都想她，想啊想啊，翻来覆去睡不着。长长短短的荇菜，左边右边地采它，那文静美好的好姑娘，弹琴鼓瑟来亲近她。长长短短的荇菜，左边右边地挑它，那文静美好的好姑娘，敲钟打鼓让她快乐。",
      }
      ],
    },
    {
      title: "葛覃 · 佚名",
      art: "spring-bird",
      artPrompt: "古诗《葛覃》意境插画：葛之覃兮，施于中谷，维叶萋萋。黄鸟于飞，集于灌木，其鸣喈喈。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "葛之覃兮，施于中谷，维叶萋萋。黄鸟于飞，集于灌木，其鸣喈喈。\n葛之覃兮，施于中谷，维叶莫莫。是刈是濩，为𫄨为绤，服之无斁。\n言告师氏，言告言归。薄污我私，薄浣我衣。害浣害否，归宁父母。",
        pinyin: "gě zhī qín xī， shī yú zhōng gǔ， wéi yè qī qī。 huáng niǎo yú fēi， jí yú guàn mù， qí míng jiē jiē。\ngě zhī qín xī， shī yú zhōng gǔ， wéi yè mò mò。 shì yì shì hù， wèi chī wèi xì， fú zhī wú yì。\nyán gào shī shì， yán gào yán guī。 báo wū wǒ sī， báo huàn wǒ yī。 hài huàn hài fǒu， guī níng fù mǔ。",
        translation: "葛草长长的藤蔓，一直蔓延到山谷里，叶子长得密密层层。黄鹂鸟飞来飞去，落在灌木丛上，叽叽喳喳叫得真欢快。姑娘割下葛草，煮了织成细布和粗布，穿在身上舒服又喜欢；她把衣裳洗得干干净净，欢欢喜喜回家去看爹娘。",
      }
      ],
    },
    {
      title: "卷耳 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《卷耳》意境插画：采采卷耳，不盈顷筐。嗟我怀人，置彼周行。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "采采卷耳，不盈顷筐。嗟我怀人，置彼周行。\n陟彼崔嵬，我马虺𬯎。我姑酌彼金罍，维以不永怀。\n陟彼高冈，我马玄黄。我姑酌彼兕觥，维以不永伤。\n陟彼砠矣，我马瘏矣，我仆痡矣，云何吁矣。",
        pinyin: "cǎi cǎi juàn ěr， bù yíng qǐng kuāng。 jiē wǒ huái rén， zhì bǐ zhōu xíng。\nzhì bǐ cuī wéi， wǒ mǎ huī tuí。 wǒ gū zhuó bǐ jīn léi， wéi yǐ bù yǒng huái。\nzhì bǐ gāo gāng， wǒ mǎ xuán huáng。 wǒ gū zhuó bǐ sì gōng， wéi yǐ bù yǒng shāng。\nzhì bǐ jū yǐ， wǒ mǎ tú yǐ， wǒ pú pū yǐ， yún hé xū yǐ。",
        translation: "采呀采卷耳，采了半天，浅浅的小筐还装不满。我心里想念着远行的人，索性把筐放在大路边。骑马翻过高山，马儿都累坏了，只好倒满一杯酒，让自己别再那么想念。",
      }
      ],
    },
    {
      title: "樛木 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《樛木》意境插画：南有樛木，葛藟累之。乐只君子，福履绥之。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "南有樛木，葛藟累之。乐只君子，福履绥之。\n南有樛木，葛藟荒之。乐只君子，福履将之。\n南有樛木，葛藟萦之。乐只君子，福履成之。",
        pinyin: "nán yǒu jiū mù， gě lěi lèi zhī。 lè zhī jūn zǐ， fú lǚ suí zhī。\nnán yǒu jiū mù， gě lěi huāng zhī。 lè zhī jūn zǐ， fú lǚ jiāng zhī。\nnán yǒu jiū mù， gě lěi yíng zhī。 lè zhī jūn zǐ， fú lǚ chéng zhī。",
        translation: "南方有一棵树枝向下弯的大树，葛藤爬上去缠绕着它。快乐美好的君子啊，福气安安稳稳地陪伴着他。",
      }
      ],
    },
    {
      title: "螽斯 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《螽斯》意境插画：螽斯羽，诜诜兮。宜尔子孙，振振兮。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "螽斯羽，诜诜兮。宜尔子孙，振振兮。\n螽斯羽，薨薨兮。宜尔子孙。绳绳兮。\n螽斯羽，揖揖兮。宜尔子孙，蛰蛰兮。",
        pinyin: "zhōng sī yǔ， shēn shēn xī。 yí ěr zǐ sūn， zhèn zhèn xī。\nzhōng sī yǔ， hōng hōng xī。 yí ěr zǐ sūn。 shéng shéng xī。\nzhōng sī yǔ， yī yī xī。 yí ěr zǐ sūn， zhé zhé xī。",
        translation: "蝈蝈扇着翅膀，多得数也数不清。愿你的子孙像它们一样又多又兴旺，一家子热热闹闹。",
      }
      ],
    },
    {
      title: "桃夭 · 佚名",
      art: "spring-bird",
      artPrompt: "古诗《桃夭》意境插画：桃之夭夭，灼灼其华。之子于归，宜其室家。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "桃之夭夭，灼灼其华。之子于归，宜其室家。\n桃之夭夭，有蕡其实。之子于归，宜其家室。\n桃之夭夭，其叶蓁蓁。之子于归，宜其家人。",
        pinyin: "táo zhī yāo yāo， zhuó zhuó qí huá。 zhī zǐ yú guī， yí qí shì jiā。\ntáo zhī yāo yāo， yǒu fén qí shí。 zhī zǐ yú guī， yí qí jiā shì。\ntáo zhī yāo yāo， qí yè zhēn zhēn。 zhī zǐ yú guī， yí qí jiā rén。",
        translation: "桃树长得嫩嫩壮壮，开满了红艳艳的花。这位美丽的姑娘要出嫁了，和和美美地把新家安顿好。",
      }
      ],
    },
    {
      title: "兔罝 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《兔罝》意境插画：肃肃兔罝，椓之丁丁。赳赳武夫，公侯干城。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "肃肃兔罝，椓之丁丁。赳赳武夫，公侯干城。\n肃肃兔罝，施于中逵。赳赳武夫，公侯好仇。\n肃肃免罝，施于中林。赳赳武夫，公侯腹心。",
        pinyin: "sù sù tù jū， zhuó zhī dīng dīng。 jiū jiū wǔ fū， gōng hóu gān chéng。\nsù sù tù jū， shī yú zhōng kuí。 jiū jiū wǔ fū， gōng hóu hǎo chóu。\nsù sù miǎn jū， shī yú zhōng lín。 jiū jiū wǔ fū， gōng hóu fù xīn。",
        translation: "认认真真布下捕兔的网，木桩敲得叮叮响。那威武雄壮的武士，是保护公侯的好帮手、好卫士。",
      }
      ],
    },
    {
      title: "芣苡 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《芣苡》意境插画：采采芣苡，薄言采之。采采芣苡，薄言有之。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "采采芣苡，薄言采之。采采芣苡，薄言有之。\n采采芣苡，薄言掇之。采采芣苡，薄言捋之。\n采采芣苡，薄言袺之。采采芣苡，薄言襭之。",
        pinyin: "cǎi cǎi fú yǐ， báo yán cǎi zhī。 cǎi cǎi fú yǐ， báo yán yǒu zhī。\ncǎi cǎi fú yǐ， báo yán duō zhī。 cǎi cǎi fú yǐ， báo yán lǚ zhī。\ncǎi cǎi fú yǐ， báo yán jié zhī。 cǎi cǎi fú yǐ， báo yán xié zhī。",
        translation: "车前草长得多茂盛呀，大家快快去采它。一颗颗拾起来，一把把捋下来，用衣襟兜住，用衣带掖好，满满地带回家。",
      }
      ],
    },
    {
      title: "汉广 · 佚名",
      art: "river-boat",
      artPrompt: "古诗《汉广》意境插画：南有乔木，不可休息。汉有游女，不可求思。汉之广矣，不可泳思。江之永矣，不可方思。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "南有乔木，不可休息。汉有游女，不可求思。汉之广矣，不可泳思。江之永矣，不可方思。\n翘翘错薪，言刈其楚。之子于归，言秣其马。汉之广矣，不可泳思。江之永矣，不可方思。\n翘翘错薪，言刈其蒌。之子于归。言秣其驹。汉之广矣，不可泳思。江之永矣，不可方思。",
        pinyin: "nán yǒu qiáo mù， bù kě xiū xi。 hàn yǒu yóu nǚ， bù kě qiú sī。 hàn zhī guǎng yǐ， bù kě yǒng sī。 jiāng zhī yǒng yǐ， bù kě fāng sī。\nqiào qiào cuò xīn， yán yì qí chǔ。 zhī zǐ yú guī， yán mò qí mǎ。 hàn zhī guǎng yǐ， bù kě yǒng sī。 jiāng zhī yǒng yǐ， bù kě fāng sī。\nqiào qiào cuò xīn， yán yì qí lóu。 zhī zǐ yú guī。 yán mò qí jū。 hàn zhī guǎng yǐ， bù kě yǒng sī。 jiāng zhī yǒng yǐ， bù kě fāng sī。",
        translation: "南方有高高的树木，不能到树下休息；汉水边的姑娘啊，追求也追求不到。汉水宽宽的，游不过去；江水长长的，渡不过去。等她出嫁的那天，我甘愿替她把马喂得饱饱的。",
      }
      ],
    },
    {
      title: "汝坟 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《汝坟》意境插画：遵彼汝坟，伐其条枚。未见君子，惄如调饥。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "遵彼汝坟，伐其条枚。未见君子，惄如调饥。\n遵彼汝坟，伐其条肄。既见君子，不我遐弃。\n鲂鱼赪尾，王室如毁。虽则如毁，父母孔迩。",
        pinyin: "zūn bǐ rǔ fén， fá qí tiáo méi。 wèi jiàn jūn zǐ， nì rú tiáo jī。\nzūn bǐ rǔ fén， fá qí tiáo yì。 jì jiàn jūn zǐ， bù wǒ xiá qì。\nfáng yú chēng wěi， wáng shì rú huǐ。 suī zé rú huǐ， fù mǔ kǒng ěr。",
        translation: "沿着汝水的大堤砍柴，见不到心上人的时候，想念得就像清早没吃饭一样难受；终于见到他回来，他没有抛下我远走。虽然官家的事急得像火烧，但好在父母就在身边，心里踏实多了。",
      }
      ],
    },
    {
      title: "麟之趾 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《麟之趾》意境插画：麟之趾，振振公子，于嗟麟兮。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "麟之趾，振振公子，于嗟麟兮。\n麟之定，振振公姓，于嗟麟兮。\n麟之角，振振公族，于嗟麟兮。",
        pinyin: "lín zhī zhǐ， zhèn zhèn gōng zǐ， yú jiē lín xī。\nlín zhī dìng， zhèn zhèn gōng xìng， yú jiē lín xī。\nlín zhī jiǎo， zhèn zhèn gōng zú， yú jiē lín xī。",
        translation: "麒麟的蹄子不踢人，就像那诚实仁厚的公子，哎呀，真是麒麟一样的好儿郎！麒麟的额头和角尖都不伤人，就像那仁厚的子孙和族人，哎呀，真叫人赞叹呀！",
      }
      ],
    },
    {
      title: "鹊巢 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《鹊巢》意境插画：维鹊有巢，维鸠居之。之子于归，百两御之。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "维鹊有巢，维鸠居之。之子于归，百两御之。\n维鹊有巢，维鸠方之。之子于归，百两将之。\n维鹊有巢，维鸠盈之。之子于归，百两成之。",
        pinyin: "wéi què yǒu cháo， wéi jiū jū zhī。 zhī zǐ yú guī， bǎi liǎng yù zhī。\nwéi què yǒu cháo， wéi jiū fāng zhī。 zhī zǐ yú guī， bǎi liǎng jiāng zhī。\nwéi què yǒu cháo， wéi jiū yíng zhī。 zhī zǐ yú guī， bǎi liǎng chéng zhī。",
        translation: "喜鹊辛苦搭好的窝，斑鸠住了进去。这位姑娘要出嫁了，一百辆车热热闹闹地来迎接她。",
      }
      ],
    },
    {
      title: "采蘩 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《采蘩》意境插画：于以采蘩？于沼于沚。于以用之？公侯之事。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "于以采蘩？于沼于沚。于以用之？公侯之事。\n于以采蘩？于涧之中。于以用之？公侯之宫。\n被之僮僮，夙夜在公。被之祁祁，薄言还归。",
        pinyin: "yú yǐ cǎi fán？ yú zhǎo yú zhǐ。 yú yǐ yòng zhī？ gōng hóu zhī shì。\nyú yǐ cǎi fán？ yú jiàn zhī zhōng。 yú yǐ yòng zhī？ gōng hóu zhī gōng。\nbèi zhī tóng tóng， sù yè zài gōng。 bèi zhī qí qí， báo yán hái guī。",
        translation: "到哪里去采白蒿呢？在池塘边、在小洲上、在山涧里。采来做什么用呢？是替公侯家操办事事用的。夫人们起早贪黑地忙公事，忙完了才披着松松的头发回家去。",
      }
      ],
    },
    {
      title: "草虫 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《草虫》意境插画：喓喓草虫，趯趯阜螽。未见君子，忧心忡忡。亦既见止，亦既觏止，我心则降。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "喓喓草虫，趯趯阜螽。未见君子，忧心忡忡。亦既见止，亦既觏止，我心则降。\n陟彼南山，言采其蕨。未见君子，忧心惙惙。亦既见止，亦既觏止，我心则说。\n陟彼南山，言采其薇。未见君子，我心伤悲。亦既见止，亦既觏止，我心则夷。",
        pinyin: "yāo yāo cǎo chóng， yuè yuè fù zhōng。 wèi jiàn jūn zǐ， yōu xīn chōng chōng。 yì jì jiàn zhǐ， yì jì gòu zhǐ， wǒ xīn zé jiàng。\nzhì bǐ nán shān， yán cǎi qí jué。 wèi jiàn jūn zǐ， yōu xīn chuò chuò。 yì jì jiàn zhǐ， yì jì gòu zhǐ， wǒ xīn zé shuō。\nzhì bǐ nán shān， yán cǎi qí wēi。 wèi jiàn jūn zǐ， wǒ xīn shāng bēi。 yì jì jiàn zhǐ， yì jì gòu zhǐ， wǒ xīn zé yí。",
        translation: "草虫喓喓地叫，蚂蚱蹦蹦地跳。见不到心上的人，心里又愁又慌；等到见到了面，我的心里一下子就欢喜、就踏实了。",
      }
      ],
    },
    {
      title: "采苹 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《采苹》意境插画：于以采苹？南涧之滨。于以采藻？于彼行潦。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "于以采苹？南涧之滨。于以采藻？于彼行潦。\n于以盛之？维筐及筥。于以湘之？维锜及釜。\n于以奠之？宗室牖下。谁其尸之？有齐季女。",
        pinyin: "yú yǐ cǎi píng？ nán jiàn zhī bīn。 yú yǐ cǎi zǎo？ yú bǐ xíng liáo。\nyú yǐ shèng zhī？ wéi kuāng jí jǔ。 yú yǐ xiāng zhī？ wéi qí jí fǔ。\nyú yǐ diàn zhī？ zōng shì yǒu xià。 shuí qí shī zhī？ yǒu qí jì nǚ。",
        translation: "在南边山涧的水边采蘋菜，在流动的浅水里采水藻，用方筐圆筐装好，用锅煮好，端端正正摆在宗庙的窗户下。主持这件事的，是那位又恭敬又认真的少女。",
      }
      ],
    },
    {
      title: "甘棠 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《甘棠》意境插画：蔽芾甘棠，勿翦勿伐，召伯所茇。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "蔽芾甘棠，勿翦勿伐，召伯所茇。\n蔽芾甘棠，勿翦勿败，召伯所憩。\n蔽芾甘棠，勿翦勿拜，召伯所说。",
        pinyin: "bì fèi gān táng， wù jiǎn wù fá， zhào bó suǒ bá。\nbì fèi gān táng， wù jiǎn wù bài， zhào bó suǒ qì。\nbì fèi gān táng， wù jiǎn wù bài， zhào bó suǒ shuō。",
        translation: "那棵小小的甘棠树，不要剪它、不要砍它，那是召伯住过的地方。不要折损它、不要扳弯它，那是召伯歇过脚、停留过的地方呀。",
      }
      ],
    },
    {
      title: "行露 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《行露》意境插画：厌浥行露，岂不夙夜，谓行多露。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "厌浥行露，岂不夙夜，谓行多露。\n谁谓雀无角？何以穿我屋？谁谓女无家？何以速我狱？虽速我狱，室家不足！\n谁谓鼠无牙？何以穿我墉？谁谓女无家？何以速我讼？虽速我讼，亦不女从！",
        pinyin: "yàn yì xíng lù， qǐ bù sù yè， wèi xíng duō lù。\nshuí wèi què wú jiǎo？ hé yǐ chuān wǒ wū？ shuí wèi nǚ wú jiā？ hé yǐ sù wǒ yù？ suī sù wǒ yù， shì jiā bù zú！\nshuí wèi shǔ wú yá？ hé yǐ chuān wǒ yōng？ shuí wèi nǚ wú jiā？ hé yǐ sù wǒ sòng？ suī sù wǒ sòng， yì bù nǚ cóng！",
        translation: "路上的露水湿漉漉的，不是我不想赶早赶夜，只怕一路上露水太多。谁说麻雀没有嘴？不然它怎么啄穿我的屋子？就算逼我去打官司，我也决不依从你！",
      }
      ],
    },
    {
      title: "羔羊 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《羔羊》意境插画：羔羊之皮，素丝五紽。退食自公，委蛇委蛇。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "羔羊之皮，素丝五紽。退食自公，委蛇委蛇。\n羔羊之革，素丝五緎。委蛇委蛇，自公退食。\n羔羊之缝，素丝五总。委蛇委蛇，退食自公。",
        pinyin: "gāo yáng zhī pí， sù sī wǔ tuó。 tuì shí zì gōng， wěi shé wěi shé。\ngāo yáng zhī gé， sù sī wǔ yù。 wěi shé wěi shé， zì gōng tuì shí。\ngāo yáng zhī fèng， sù sī wǔ zǒng。 wěi shé wěi shé， tuì shí zì gōng。",
        translation: "大夫穿着羔羊皮做的衣裳，用白丝线缝得整整齐齐。从公家吃完饭，慢悠悠、乐悠悠地往家走。",
      }
      ],
    },
    {
      title: "殷其雷 · 佚名",
      art: "sunrise-hills",
      artPrompt: "古诗《殷其雷》意境插画：殷其雷，在南山之阳。何斯违斯，莫敢或遑？振振君子，归哉归哉！——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "殷其雷，在南山之阳。何斯违斯，莫敢或遑？振振君子，归哉归哉！\n殷其雷，在南山之侧。何斯违斯，莫敢遑息？振振君子，归哉归哉！\n殷其雷，在南山之下。何斯违斯，莫或遑处？振振君子，归哉归哉！",
        pinyin: "yīn qí léi， zài nán shān zhī yáng。 hé sī wéi sī， mò gǎn huò huáng？ zhèn zhèn jūn zǐ， guī zāi guī zāi！\nyīn qí léi， zài nán shān zhī cè。 hé sī wéi sī， mò gǎn huáng xī？ zhèn zhèn jūn zǐ， guī zāi guī zāi！\nyīn qí léi， zài nán shān zhī xià。 hé sī wéi sī， mò huò huáng chù？ zhèn zhèn jūn zǐ， guī zāi guī zāi！",
        translation: "轰隆隆的雷声，响在南山南面、南山旁边、南山下面。丈夫在外奔忙，一刻也不得空闲，妻子在家里盼着他：快回家吧，快回家吧！",
      }
      ],
    },
    {
      title: "摽有梅 · 佚名",
      art: "nursery-window",
      artPrompt: "古诗《摽有梅》意境插画：摽有梅，其实七兮。求我庶士，迨其吉兮。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "摽有梅，其实七兮。求我庶士，迨其吉兮。\n摽有梅，其实三兮。求我庶士，迨其今兮。\n摽有梅，顷筐塈之。求我庶士，迨其谓之。",
        pinyin: "biāo yǒu méi， qí shí qī xī。 qiú wǒ shù shì， dài qí jí xī。\nbiāo yǒu méi， qí shí sān xī。 qiú wǒ shù shì， dài qí jīn xī。\nbiāo yǒu méi， qǐng kuāng jì zhī。 qiú wǒ shù shì， dài qí wèi zhī。",
        translation: "梅子熟了往下落，树上还留着七成，想娶我的小伙子呀，趁着好日子快来吧。梅子落得只剩三成了，趁着就在今天快来吧；树上的梅子快落光了，用筐子装起来，只要你肯开口，一切就好说啦。",
      }
      ],
    },
    {
      title: "小星 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《小星》意境插画：嘒彼小星，三五在东。肃肃宵征，夙夜在公。寔命不同！——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "嘒彼小星，三五在东。肃肃宵征，夙夜在公。寔命不同！\n嘒彼小星，维参与昴。肃肃宵征，抱衾与裯。寔命不犹！",
        pinyin: "huì bǐ xiǎo xīng， sān wǔ zài dōng。 sù sù xiāo zhēng， sù yè zài gōng。 shí mìng bù tóng！\nhuì bǐ xiǎo xīng， wéi cān yù mǎo。 sù sù xiāo zhēng， bào qīn yǔ dāo。 shí mìng bù yóu！",
        translation: "小小的星星闪着微光，三个五个挂在东方。急急忙忙赶夜路，从早到晚为公事奔忙，只叹息人和人的命运不一样。",
      }
      ],
    },
    {
      title: "江有汜 · 佚名",
      art: "river-boat",
      artPrompt: "古诗《江有汜》意境插画：江有汜，之子归，不我以。不我以，其后也悔。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "江有汜，之子归，不我以。不我以，其后也悔。\n江有渚，之子归，不我与。不我与，其后也处。\n江有沱，之子归，不我过。不我过，其啸也歌。",
        pinyin: "jiāng yǒu sì， zhī zǐ guī， bù wǒ yǐ。 bù wǒ yǐ， qí hòu yě huǐ。\njiāng yǒu zhǔ， zhī zǐ guī， bù wǒ yǔ。 bù wǒ yǔ， qí hòu yě chù。\njiāng yǒu tuó， zhī zǐ guī， bù wǒ guò。 bù wǒ guò， qí xiào yě gē。",
        translation: "大江有分出去的支流，那个人回家去却不带上我，不带我，他以后一定会后悔的。江水绕过小洲、分出汊汊，他路过也不来看我，往后他总会想起我，长叹着唱歌的。",
      }
      ],
    },
    {
      title: "野有死麕 · 佚名",
      art: "spring-bird",
      artPrompt: "古诗《野有死麕》意境插画：野有死麕，白茅包之。有女怀春，吉士诱之。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "野有死麕，白茅包之。有女怀春，吉士诱之。\n林有朴樕，野有死鹿。白茅纯束，有女如玉。\n舒而脱脱兮，无感我帨兮，无使尨也吠。",
        pinyin: "yě yǒu sǐ jūn， bái máo bāo zhī。 yǒu nǚ huái chūn， jí shì yòu zhī。\nlín yǒu pǔ sù， yě yǒu sǐ lù。 bái máo chún shù， yǒu nǚ rú yù。\nshū ér tuō tuō xī， wú gǎn wǒ shuì xī， wú shǐ méng yě fèi。",
        translation: "野地里有一头猎来的獐子，用白茅草把它包起来；有位姑娘动了心，小伙子献上礼物去追求她。姑娘轻轻地说：慢慢来呀别着急，不要动我的佩巾，也不要惊得小狗汪汪叫。",
      }
      ],
    },
    {
      title: "何彼襛矣 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《何彼襛矣》意境插画：何彼襛矣，唐棣之华？曷不肃雍？王姬之车。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "何彼襛矣，唐棣之华？曷不肃雍？王姬之车。\n何彼襛矣，华如桃李？平王之孙，齐侯之子。\n其钓维何？维丝伊缗。齐侯之子，平王之孙。",
        pinyin: "hé bǐ nóng yǐ， táng dì zhī huá？ hé bù sù yōng？ wáng jī zhī chē。\nhé bǐ nóng yǐ， huá rú táo lǐ？ píng wáng zhī sūn， qí hóu zhī zǐ。\nqí diào wéi hé？ wéi sī yī mín。 qí hóu zhī zǐ， píng wáng zhī sūn。",
        translation: "怎么开得这样浓艳呀，像唐棣花一样漂亮，原来是王姬出嫁的车子，又庄严又和睦。她是平王的孙女、齐侯的女儿，像丝线合成钓绳那样，结成了美满的姻缘。",
      }
      ],
    },
    {
      title: "驺虞 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《驺虞》意境插画：彼茁者葭，壹发五豝，于嗟乎驺虞！——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "彼茁者葭，壹发五豝，于嗟乎驺虞！\n彼茁者蓬，壹发五豵，于嗟乎驺虞！",
        pinyin: "bǐ zhuó zhě jiā， yī fā wǔ bā， yú jiē hū zōu yú！\nbǐ zhuó zhě péng， yī fā wǔ zōng， yú jiē hū zōu yú！",
        translation: "那芦苇长得壮壮的，一箭就射中五只母野猪，哎呀，真是了不起的猎手！那蓬草长得壮壮的，一箭又射中五只小野猪，哎呀，真叫人佩服呀！",
      }
      ],
    },
    {
      title: "柏舟 · 佚名",
      art: "river-boat",
      artPrompt: "古诗《柏舟》意境插画：泛彼柏舟，亦泛其流。耿耿不寐，如有隐忧。微我无酒，以敖以游。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "泛彼柏舟，亦泛其流。耿耿不寐，如有隐忧。微我无酒，以敖以游。\n我心匪鉴，不可以茹。亦有兄弟，不可以据。薄言往诉，逢彼之怒。\n我心匪石，不可转也。我心匪席，不可卷也。威仪棣棣，不可选也。\n忧心悄悄，愠于群小。觏闵既多，受侮不少。静言思之，寤辟有摽。\n日居月诸，胡迭而微？心之忧矣，如匪浣衣。静言思之，不能奋飞。",
        pinyin: "fàn bǐ bǎi zhōu， yì fàn qí liú。 gěng gěng bù mèi， rú yǒu yǐn yōu。 wēi wǒ wú jiǔ， yǐ áo yǐ yóu。\nwǒ xīn fěi jiàn， bù kě yǐ rú。 yì yǒu xiōng dì， bù kě yǐ jù。 báo yán wǎng sù， féng bǐ zhī nù。\nwǒ xīn fěi shí， bù kě zhuǎn yě。 wǒ xīn fěi xí， bù kě juàn yě。 wēi yí dì dì， bù kě xuǎn yě。\nyōu xīn qiāo qiāo， yùn yú qún xiǎo。 gòu mǐn jì duō， shòu wǔ bù shǎo。 jìng yán sī zhī， wù pì yǒu biāo。\nrì jū yuè zhū， hú dié ér wēi？ xīn zhī yōu yǐ， rú fěi huàn yī。 jìng yán sī zhī， bù néng fèn fēi。",
        translation: "柏木的小船在水面上漂着，我心里藏着忧愁，翻来覆去睡不着。我的心不是镜子、不是石头、也不是席子，不能什么都装、任人翻动卷起；忧愁像堆着没洗的衣裳，多想张开翅膀飞出去呀。",
      }
      ],
    },
    {
      title: "绿衣 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《绿衣》意境插画：绿兮衣兮，绿衣黄裹。心之忧矣，曷维其已！——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "绿兮衣兮，绿衣黄裹。心之忧矣，曷维其已！\n绿兮衣兮，绿衣黄裳。心之忧矣，曷维其亡！\n绿兮丝兮，女所治兮。我思古人，俾无訧兮！\n𫄨兮绤兮，凄其以风。我思古人，实获我心！",
        pinyin: "lǜ xī yī xī， lǜ yī huáng guǒ。 xīn zhī yōu yǐ， hé wéi qí yǐ！\nlǜ xī yī xī， lǜ yī huáng shang。 xīn zhī yōu yǐ， hé wéi qí wáng！\nlǜ xī sī xī， nǚ suǒ zhì xī。 wǒ sī gǔ rén， bǐ wú yóu xī！\nchī xī xì xī， qī qí yǐ fēng。 wǒ sī gǔ rén， shí huò wǒ xīn！",
        translation: "绿衣裳呀绿衣裳，绿面子黄里子，看到它心里就忧愁，这难过什么时候才有个完。这件绿丝衣是你亲手缝的，想起你，我总是少犯错；如今风一吹薄衣更觉凉，思念故人，你最懂我的心。",
      }
      ],
    },
    {
      title: "燕燕 · 佚名",
      art: "spring-bird",
      artPrompt: "古诗《燕燕》意境插画：燕燕于飞，差池其羽。之子于归，远送于野。瞻望弗及，泣涕如雨。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "燕燕于飞，差池其羽。之子于归，远送于野。瞻望弗及，泣涕如雨。\n燕燕于飞，颉之颃之。之子于归，远于将之。瞻望弗及，伫立以泣。\n燕燕于飞，下上其音。之子于归，远送于南。瞻望弗及，实劳我心。\n仲氏任只，其心塞渊。终温且惠，淑慎其身。先君之思，以勖寡人。",
        pinyin: "yàn yàn yú fēi， chà chí qí yǔ。 zhī zǐ yú guī， yuǎn sòng yú yě。 zhān wàng fú jí， qì tì rú yǔ。\nyàn yàn yú fēi， jié zhī háng zhī。 zhī zǐ yú guī， yuǎn yú jiāng zhī。 zhān wàng fú jí， zhù lì yǐ qì。\nyàn yàn yú fēi， xià shàng qí yīn。 zhī zǐ yú guī， yuǎn sòng yú nán。 zhān wàng fú jí， shí láo wǒ xīn。\nzhòng shì rèn zhī， qí xīn sāi yuān。 zhōng wēn qiě huì， shū shèn qí shēn。 xiān jūn zhī sī， yǐ xù guǎ rén。",
        translation: "燕子飞呀飞，翅膀忽上忽下。她要出嫁到远方去了，我送呀送，一直送到郊外，望着她再也看不见，眼泪落得像下雨。她心地诚实又温厚，临别还劝我别忘了先人的心愿。",
      }
      ],
    },
    {
      title: "日月 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《日月》意境插画：日居月诸，照临下土。乃如之人兮，逝不古处？胡能有定？宁不我顾。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "日居月诸，照临下土。乃如之人兮，逝不古处？胡能有定？宁不我顾。\n日居月诸，下土是冒。乃如之人兮，逝不相好。胡能有定？宁不我报。\n日居月诸，出自东方。乃如之人兮，德音无良。胡能有定？俾也可忘。\n日居月诸，东方自出。父兮母兮，畜我不卒。胡能有定？报我不述。",
        pinyin: "rì jū yuè zhū， zhào lín xià tǔ。 nǎi rú zhī rén xī， shì bù gǔ chù？ hú néng yǒu dìng？ níng bù wǒ gù。\nrì jū yuè zhū， xià tǔ shì mào。 nǎi rú zhī rén xī， shì bù xiāng hǎo。 hú néng yǒu dìng？ níng bù wǒ bào。\nrì jū yuè zhū， chū zì dōng fāng。 nǎi rú zhī rén xī， dé yīn wú liáng。 hú néng yǒu dìng？ bǐ yě kě wàng。\nrì jū yuè zhū， dōng fāng zì chū。 fù xī mǔ xī， chù wǒ bù zú。 hú néng yǒu dìng？ bào wǒ bù shù。",
        translation: "太阳月亮照着大地，可你这样的人呀，不像从前那样好好待我。我问太阳和月亮：你什么时候才能定下心来？爹呀娘呀，你们没有疼我到底，他待我总是变了样。",
      }
      ],
    },
    {
      title: "终风 · 佚名",
      art: "cloud-flight",
      artPrompt: "古诗《终风》意境插画：终风且暴，顾我则笑，谑浪笑敖，中心是悼。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "终风且暴，顾我则笑，谑浪笑敖，中心是悼。\n终风且霾，惠然肯来，莫往莫来，悠悠我思。\n终风且曀，不日有曀，寤言不寐，愿言则嚏。\n曀曀其阴，虺虺其雷，寤言不寐，愿言则怀。",
        pinyin: "zhōng fēng qiě bào， gù wǒ zé xiào， xuè làng xiào áo， zhōng xīn shì dào。\nzhōng fēng qiě mái， huì rán kěn lái， mò wǎng mò lái， yōu yōu wǒ sī。\nzhōng fēng qiě yì， bù rì yǒu yì， wù yán bù mèi， yuàn yán zé tì。\nyì yì qí yīn， huī huī qí léi， wù yán bù mèi， yuàn yán zé huái。",
        translation: "又刮风又下大雨，他望着我嘻嘻笑，玩笑没个正经，我心里又难过又害怕。风刮得阴沉沉的，他好久不来，我日夜想念他，想得直打喷嚏，夜里翻来覆去睡不着。",
      }
      ],
    },
    {
      title: "击鼓 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《击鼓》意境插画：击鼓其镗，踊跃用兵。土国城漕，我独南行。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "击鼓其镗，踊跃用兵。土国城漕，我独南行。\n从孙子仲，平陈与宋。不我以归，忧心有忡。\n爰居爰处？爰丧其马？于以求之？于林之下。\n死生契阔，与子成说。执子之手，与子偕老。\n于嗟阔兮，不我活兮。于嗟洵兮，不我信兮。",
        pinyin: "jī gǔ qí táng， yǒng yuè yòng bīng。 tǔ guó chéng cáo， wǒ dú nán xíng。\ncóng sūn zi zhòng， píng chén yǔ sòng。 bù wǒ yǐ guī， yōu xīn yǒu chōng。\nyuán jū yuán chù？ yuán sàng qí mǎ？ yú yǐ qiú zhī？ yú lín zhī xià。\nsǐ shēng qì kuò， yǔ zǐ chéng shuō。 zhí zǐ zhī shǒu， yǔ zǐ xié lǎo。\nyú jiē kuò xī， bù wǒ huó xī。 yú jiē xún xī， bù wǒ xìn xī。",
        translation: "战鼓咚咚敲得震天响，大家踊跃操练兵器。别人留在国内修城筑墙，只有我独自往南出征。我们曾经说好：生死永远不分离，牵着你的手，和你一起白头到老；可如今相隔那么远，我怕这约定实现不了了。",
      }
      ],
    },
    {
      title: "凯风 · 佚名",
      art: "cloud-flight",
      artPrompt: "古诗《凯风》意境插画：凯风自南，吹彼棘心。棘心夭夭，母氏劬劳。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "凯风自南，吹彼棘心。棘心夭夭，母氏劬劳。\n凯风自南，吹彼棘薪。母氏圣善，我无令人。\n爰有寒痊？在浚之下。有子七人，母氏劳苦。\n𪾢睆黄鸟，载好其音。有子七人，莫慰母心。",
        pinyin: "kǎi fēng zì nán， chuī bǐ jí xīn。 jí xīn yāo yāo， mǔ shì qú láo。\nkǎi fēng zì nán， chuī bǐ jí xīn。 mǔ shì shèng shàn， wǒ wú lìng rén。\nyuán yǒu hán quán？ zài jùn zhī xià。 yǒu zǐ qī rén， mǔ shì láo kǔ。\nxiàn huàn huáng niǎo， zǎi hǎo qí yīn。 yǒu zǐ qī rén， mò wèi mǔ xīn。",
        translation: "和暖的南风吹来，吹拂着嫩嫩的酸枣树芽，母亲辛辛苦苦把我们七个孩子养大。可爱的黄鸟叫得那样好听，我们却没有一个能安慰娘的心。",
      }
      ],
    },
    {
      title: "雄雉 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《雄雉》意境插画：雄雉于飞，泄泄其羽。我之怀矣，自诒伊阻。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "雄雉于飞，泄泄其羽。我之怀矣，自诒伊阻。\n雄雉于飞，下上其音。展矣君子，实劳我心。\n瞻彼日月，悠悠我思。道之云远，曷云能来？\n百尔君子，不知德行。不忮不求，何用不臧。",
        pinyin: "xióng zhì yú fēi， xiè xiè qí yǔ。 wǒ zhī huái yǐ， zì yí yī zǔ。\nxióng zhì yú fēi， xià shàng qí yīn。 zhǎn yǐ jūn zǐ， shí láo wǒ xīn。\nzhān bǐ rì yuè， yōu yōu wǒ sī。 dào zhī yún yuǎn， hé yún néng lái？\nbǎi ěr jūn zǐ， bù zhī dé xíng。 bù zhì bù qiú， hé yòng bù zāng。",
        translation: "雄野鸡展翅飞起来，翅膀慢悠悠地扇动，我想念远方的丈夫，心里烦闷难安。望着太阳月亮一天天过去，思念长长的；道路那么远，他什么时候才能回来呢？",
      }
      ],
    },
    {
      title: "匏有苦叶 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《匏有苦叶》意境插画：匏有苦叶，济有深涉。深则厉，浅则揭。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "匏有苦叶，济有深涉。深则厉，浅则揭。\n有弥济盈，有鷕雉鸣。济盈不濡轨，雉鸣求其牡。\n雍雍鸣雁，旭日始旦。士如归妻，迨冰未泮。\n招招舟子，人涉卬否。不涉卬否，卬须我友。",
        pinyin: "páo yǒu kǔ yè， jì yǒu shēn shè。 shēn zé lì， qiǎn zé jiē。\nyǒu mí jì yíng， yǒu yǎo zhì míng。 jì yíng bù rú guǐ， zhì míng qiú qí mǔ。\nyōng yōng míng yàn， xù rì shǐ dàn。 shì rú guī qī， dài bīng wèi pàn。\nzhāo zhāo zhōu zǐ， rén shè áng fǒu。 bù shè áng fǒu， áng xū wǒ yǒu。",
        translation: "葫芦的叶子苦苦的，济河渡口的水有深有浅，水深就脱衣蹚过去，水浅就提起衣裳走。大雁嘎嘎叫，太阳刚升起，你要娶我就趁河水没结冰快来吧。船夫招手催人上船，别人都渡过去了，我偏不走，我要等我的人。",
      }
      ],
    },
    {
      title: "谷风 · 佚名",
      art: "cloud-flight",
      artPrompt: "古诗《谷风》意境插画：习习谷风，以阴以雨。黾勉同心，不宜有怒。采葑采菲，无以下体？德音莫违，及尔同死。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "习习谷风，以阴以雨。黾勉同心，不宜有怒。采葑采菲，无以下体？德音莫违，及尔同死。\n行道迟迟，中心有违。不远伊迩，薄送我畿。谁谓荼苦，其甘如荠。宴尔新婚，如兄如弟。\n泾以渭浊，湜湜其沚。宴尔新婚，不我屑以。毋逝我梁，毋发我笱。我躬不阅，遑恤我后。\n就其深矣，方之舟之。就其浅矣，泳之游之。何有何亡，黾勉求之。凡民有丧，匍匐救之。\n不我能畜，反以我为仇。既阻我德，贾用不售。昔育恐育鞫，及尔颠覆。既生既育，比予于毒。\n我有旨蓄，亦以御冬。宴尔新婚，以我御穷。有洸有溃，既诒我肄。不念昔者，伊余来塈。",
        pinyin: "xí xí gǔ fēng， yǐ yīn yǐ yǔ。 miǎn miǎn tóng xīn， bù yí yǒu nù。 cǎi fēng cǎi fēi， wú yǐ xià tǐ？ dé yīn mò wéi， jí ěr tóng sǐ。\nháng dào chí chí， zhōng xīn yǒu wéi。 bù yuǎn yī ěr， báo sòng wǒ jī。 shuí wèi tú kǔ， qí gān rú qí。 yàn ěr xīn hūn， rú xiōng rú dì。\njīng yǐ wèi zhuó， shí shí qí zhǐ。 yàn ěr xīn hūn， bù wǒ xiè yǐ。 wú shì wǒ liáng， wú fā wǒ gǒu。 wǒ gōng bù yuè， huáng xù wǒ hòu。\njiù qí shēn yǐ， fāng zhī zhōu zhī。 jiù qí qiǎn yǐ， yǒng zhī yóu zhī。 hé yǒu hé wáng， miǎn miǎn qiú zhī。 fán mín yǒu sàng， pú fú jiù zhī。\nbù wǒ néng chù， fǎn yǐ wǒ wèi chóu。 jì zǔ wǒ dé， jiǎ yòng bù shòu。 xī yù kǒng yù jū， jí ěr diān fù。 jì shēng jì yù， bǐ yǔ yú dú。\nwǒ yǒu zhǐ xù， yì yǐ yù dōng。 yàn ěr xīn hūn， yǐ wǒ yù qióng。 yǒu guāng yǒu kuì， jì yí wǒ yì。 bù niàn xī zhě， yī yú lái jì。",
        translation: "山谷里刮来大风，又是阴天又是下雨，我们本该同心合力过日子，你不该对我发脾气。想当年苦日子我们一起熬，如今你娶了新人高兴得像过节，却把我看成仇人赶走，还拿我储下的粮食去抵挡穷困。",
      }
      ],
    },
    {
      title: "式微 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《式微》意境插画：式微，式微，胡不归？微君之故，胡为乎中露！——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "式微，式微，胡不归？微君之故，胡为乎中露！\n式微，式微，胡不归？微君之躬，胡为乎泥中！",
        pinyin: "shì wēi， shì wēi， hú bù guī？ wēi jūn zhī gù， hú wèi hū zhōng lù！\nshì wēi， shì wēi， hú bù guī？ wēi jūn zhī gōng， hú wèi hū ní zhōng！",
        translation: "天黑了，天黑了，为什么还不回家？若不是为了主子的事，怎么会泡在露水里！天黑了，天黑了，为什么还不回家？若不是为了主子的身子，怎么会踩在泥水里！",
      }
      ],
    },
    {
      title: "旄丘 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《旄丘》意境插画：旄丘之葛兮，何诞之节兮。叔兮伯兮，何多日也？——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "旄丘之葛兮，何诞之节兮。叔兮伯兮，何多日也？\n何其处也？必有与也！何其久也？必有以也！\n狐裘蒙戎，匪车不东。叔兮伯兮，靡所与同。\n琐兮尾兮，流离之子。叔兮伯兮，褎如充耳。",
        pinyin: "máo qiū zhī gě xī， hé dàn zhī jié xī。 shū xī bó xī， hé duō rì yě？\nhé qí chù yě？ bì yǒu yǔ yě！ hé qí jiǔ yě？ bì yǒu yǐ yě！\nhú qiú méng róng， fěi chē bù dōng。 shū xī bó xī， mí suǒ yǔ tóng。\nsuǒ xī wěi xī， liú lí zhī zǐ。 shū xī bó xī， xiù rú chōng ěr。",
        translation: "旄丘上的葛藤一节一节长得多长呀，叔叔伯伯们，为什么这么多天还不来帮我们？我们这些流落在外、孤苦无依的人向他们呼救，他们却像捂着耳朵一样不作声。",
      }
      ],
    },
    {
      title: "简兮 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《简兮》意境插画：简兮简兮，方将万舞。日之方中，在前上处。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "简兮简兮，方将万舞。日之方中，在前上处。\n硕人俣俣，公庭万舞。有力如虎，执辔如组。\n左手执龠，右手秉翟。赫如渥赭，公言锡爵。\n山有榛，隰有苓。云谁之思？西方美人。彼美人兮，西方之人兮。",
        pinyin: "jiǎn xī jiǎn xī， fāng jiāng wàn wǔ。 rì zhī fāng zhōng， zài qián shàng chù。\nshuò rén yǔ yǔ， gōng tíng wàn wǔ。 yǒu lì rú hǔ， zhí pèi rú zǔ。\nzuǒ shǒu zhí yuè， yòu shǒu bǐng zhái。 hè rú wò zhě， gōng yán xī jué。\nshān yǒu zhēn， xí yǒu líng。 yún shuí zhī sī？ xī fāng měi rén。 bǐ měi rén xī， xī fāng zhī rén xī。",
        translation: "鼓点咚咚响，盛大的舞蹈就要开始了，魁梧的舞师站在公庭前，力气大得像老虎。他左手拿着乐器，右手举着野鸡毛，脸膛红得像朱砂，公爷高兴地赐他一杯酒。我心里想的是：那位英俊的人呀，是西方来的呀。",
      }
      ],
    },
    {
      title: "泉水 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《泉水》意境插画：毖彼泉水，亦流于淇。有怀于卫，靡日不思。娈彼诸姬，聊与之谋。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "毖彼泉水，亦流于淇。有怀于卫，靡日不思。娈彼诸姬，聊与之谋。\n出宿于泲，饮饯于祢。女子有行，远父母兄弟，问我诸姑，遂及伯姊。\n出宿于干，饮饯于言。载脂载辖，还车言迈。遄臻于卫，不瑕有害？\n我思肥泉，兹之永叹。思须与漕，我心悠悠。驾言出游，以写我忧。",
        pinyin: "bì bǐ quán shuǐ， yì liú yú qí。 yǒu huái yú wèi， mí rì bù sī。 luán bǐ zhū jī， liáo yǔ zhī móu。\nchū sù yú jǐ， yǐn jiàn yú mí。 nǚ zǐ yǒu xíng， yuǎn fù mǔ xiōng dì， wèn wǒ zhū gū， suì jí bó zǐ。\nchū sù yú gān， yǐn jiàn yú yán。 zǎi zhī zǎi xiá， hái chē yán mài。 chuán zhēn yú wèi， bù xiá yǒu hài？\nwǒ sī féi quán， zī zhī yǒng tàn。 sī xū yǔ cáo， wǒ xīn yōu yōu。 jià yán chū yóu， yǐ xiě wǒ yōu。",
        translation: "清清的泉水咕嘟咕嘟流，一直流进淇水里。想起卫国我的家，没有一天不想念，只好跟嫁到别处的姐妹们商量商量。可路远难行回不去，我驾着车出门游一游，散散心头的忧愁。",
      }
      ],
    },
    {
      title: "北门 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《北门》意境插画：出自北门，忧心殷殷。终窭且贫，莫知我艰。已焉哉！天实为之，谓之何哉！——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "出自北门，忧心殷殷。终窭且贫，莫知我艰。已焉哉！天实为之，谓之何哉！\n王事适我，政事一埤益我。我入自外，室人交遍谪我。已焉哉！天实为之，谓之何哉！\n王事敦我，政事一埤遗我。我入自外，室人交遍摧我。已焉哉！天实为之，谓之何哉！",
        pinyin: "chū zì běi mén， yōu xīn yīn yīn。 zhōng jù qiě pín， mò zhī wǒ jiān。 yǐ yān zāi！ tiān shí wèi zhī， wèi zhī hé zāi！\nwáng shì shì wǒ， zhèng shì yī pí yì wǒ。 wǒ rù zì wài， shì rén jiāo biàn zhé wǒ。 yǐ yān zāi！ tiān shí wèi zhī， wèi zhī hé zāi！\nwáng shì dūn wǒ， zhèng shì yī pí yí wǒ。 wǒ rù zì wài， shì rén jiāo biàn cuī wǒ。 yǐ yān zāi！ tiān shí wèi zhī， wèi zhī hé zāi！",
        translation: "走出城北门，心里忧愁又沉重，家里又穷又苦，没人知道我的艰难。公家的事一件件压给我，回到家，家人还个个埋怨我，唉，这都是老天爷安排的，还有什么好说呢！",
      }
      ],
    },
    {
      title: "北风 · 佚名",
      art: "nursery-window",
      artPrompt: "古诗《北风》意境插画：北风其凉，雨雪其雱。惠而好我，携手同行。其虚其邪？既亟只且！——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "北风其凉，雨雪其雱。惠而好我，携手同行。其虚其邪？既亟只且！\n北风其喈，雨雪其霏。惠而好我，携手同归。其虚其邪？既亟只且！\n莫赤匪狐，莫黑匪乌。惠而好我，携手同车。其虚其邪？既亟只且！",
        pinyin: "běi fēng qí liáng， yǔ xuě qí pāng。 huì ér hǎo wǒ， xié shǒu tóng háng。 qí xū qí xié？ jì jí zhī qiě！\nběi fēng qí jiē， yǔ xuě qí fēi。 huì ér hǎo wǒ， xié shǒu tóng guī。 qí xū qí xié？ jì jí zhī qiě！\nmò chì fěi hú， mò hēi fěi wū。 huì ér hǎo wǒ， xié shǒu tóng chē。 qí xū qí xié？ jì jí zhī qiě！",
        translation: "北风刮得凉飕飕，大雪下得纷纷扬扬，凡是爱我的好朋友，我们手拉手一起走，事情紧急，不能再慢慢等啦！没有狐狸不红，没有乌鸦不黑，大家拉着手一起坐上车，赶快一同离开吧。",
      }
      ],
    },
    {
      title: "静女 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《静女》意境插画：静女其姝，俟我于城隅。爱而不见，搔首踟蹰。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "静女其姝，俟我于城隅。爱而不见，搔首踟蹰。\n静女其娈，贻我彤管。彤管有炜，说怿女美。\n自牧归荑，洵美且异。匪女之为美，美人之贻。",
        pinyin: "jìng nǚ qí shū， sì wǒ yú chéng yú。 ài ér bù jiàn， sāo shǒu chí chú。\njìng nǚ qí luán， yí wǒ tóng guǎn。 tóng guǎn yǒu wěi， shuō yì nǚ měi。\nzì mù guī yí， xún měi qiě yì。 fěi nǚ zhī wèi měi， měi rén zhī yí。",
        translation: "文静的姑娘真漂亮，约我在城角相会，她却躲起来不肯露面，急得我抓着头来回打转。她送我一支红彤彤的管子，亮闪闪的真好看；她送我的嫩茅草也确实又美又特别——不是草儿有多美，是因为它是心上人送的呀。",
      }
      ],
    },
    {
      title: "新台 · 佚名",
      art: "river-boat",
      artPrompt: "古诗《新台》意境插画：新台有泚，河水弥弥。燕婉之求，蘧篨不鲜。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "新台有泚，河水弥弥。燕婉之求，蘧篨不鲜。\n新台有洒，河水浼浼。燕婉之求，蘧篨不殄。\n鱼网之设，鸿则离之。燕婉之求，得此戚施。",
        pinyin: "xīn tái yǒu cǐ， hé shuǐ mí mí。 yàn wǎn zhī qiú， qú chú bù xiān。\nxīn tái yǒu sǎ， hé shuǐ měi měi。 yàn wǎn zhī qiú， qú chú bù tiǎn。\nyú wǎng zhī shè， hóng zé lí zhī。 yàn wǎn zhī qiú， dé cǐ qī shī。",
        translation: "新台造得高又鲜明，河水涨得满满的。本想嫁个温柔俊俏的好郎君，却碰上个丑陋难看的人。本盼着如意的好夫妻，得到的却是个驼背缩脖的家伙。",
      }
      ],
    },
    {
      title: "二子乘舟 · 佚名",
      art: "river-boat",
      artPrompt: "古诗《二子乘舟》意境插画：二子乘舟，泛泛其景。愿言思子，中心养养！——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "二子乘舟，泛泛其景。愿言思子，中心养养！\n二子乘舟，泛泛其逝。愿言思子，不瑕有害？",
        pinyin: "èr zǐ chéng zhōu， fàn fàn qí jǐng。 yuàn yán sī zǐ， zhōng xīn yǎng yǎng！\nèr zǐ chéng zhōu， fàn fàn qí shì。 yuàn yán sī zǐ， bù xiá yǒu hài？",
        translation: "两个孩子坐上小船，船儿晃晃悠悠漂向远方。心里牵挂着他们呀，七上八下不安宁，只盼着他们平平安安，别遇上什么灾祸。",
      }
      ],
    },
    {
      title: "柏舟 · 佚名",
      art: "river-boat",
      artPrompt: "古诗《柏舟》意境插画：泛彼柏舟，在彼中河。髧彼两髦，实维我仪。之死矢靡它。母也天只，不谅人只！——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "泛彼柏舟，在彼中河。髧彼两髦，实维我仪。之死矢靡它。母也天只，不谅人只！\n泛彼柏舟，在彼河侧。髧彼两髦，实维我特。之死矢靡慝。母也天只，不谅人只！",
        pinyin: "fàn bǐ bǎi zhōu， zài bǐ zhōng hé。 dàn bǐ liǎng máo， shí wéi wǒ yí。 zhī sǐ shǐ mí tā。 mǔ yě tiān zhī， bù liàng rén zhī！\nfàn bǐ bǎi zhōu， zài bǐ hé cè。 dàn bǐ liǎng máo， shí wéi wǒ tè。 zhī sǐ shǐ mí tè。 mǔ yě tiān zhī， bù liàng rén zhī！",
        translation: "柏木船儿漂呀漂，漂在河中间。那个垂着两绺头发的小伙子，正是我心上的人。我到死也不变心！娘呀天呀，为什么不体谅我呀！",
      }
      ],
    },
    {
      title: "墙有茨 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《墙有茨》意境插画：墙有茨，不可扫也。中冓之言，不可道也。所可道也，言之丑也。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "墙有茨，不可扫也。中冓之言，不可道也。所可道也，言之丑也。\n墙有茨，不可襄也。中冓之言，不可详也。所可详也，言之长也。\n墙有茨，不可束也。中冓之言，不可读也。所可读也，言之辱也。",
        pinyin: "qiáng yǒu cí， bù kě sǎo yě。 zhōng gòu zhī yán， bù kě dào yě。 suǒ kě dào yě， yán zhī chǒu yě。\nqiáng yǒu cí， bù kě xiāng yě。 zhōng gòu zhī yán， bù kě xiáng yě。 suǒ kě xiáng yě， yán zhī cháng yě。\nqiáng yǒu cí， bù kě shù yě。 zhōng gòu zhī yán， bù kě dú yě。 suǒ kě dú yě， yán zhī rǔ yě。",
        translation: "墙上长了蒺藜，没法把它扫干净。宫里头的那些话，不能随便往外说，说出去实在太难听。那些话不能细细去讲，讲出来叫人害臊又丢人。",
      }
      ],
    },
    {
      title: "君子偕老 · 佚名",
      art: "river-boat",
      artPrompt: "古诗《君子偕老》意境插画：君子偕老，副笄六珈。委委佗佗，如山如河，象服是宜。子之不淑，云如之何？——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "君子偕老，副笄六珈。委委佗佗，如山如河，象服是宜。子之不淑，云如之何？\n玼兮玼兮，其之翟也。鬒发如云，不屑髢也。玉之瑱也，象之揥也，扬且之晳也。胡然而天也！胡然而帝也。\n瑳兮瑳兮，其之展也。蒙彼绉𫄨，是绁袢也。子之清扬，扬且之颜也。展如之人兮，邦之媛也！",
        pinyin: "jūn zǐ xié lǎo， fù jī liù jiā。 wěi wěi tuó tuó， rú shān rú hé， xiàng fú shì yí。 zǐ zhī bù shū， yún rú zhī hé？\ncī xī cī xī， qí zhī zhái yě。 zhěn fā rú yún， bù xiè dí yě。 yù zhī tiàn yě， xiàng zhī dì yě， yáng qiě zhī xī yě。 hú rán ér tiān yě！ hú rán ér dì yě。\ncuō xī cuō xī， qí zhī zhǎn yě。 méng bǐ zhòu chī， shì xiè pàn yě。 zǐ zhī qīng yáng， yáng qiě zhī yán yě。 zhǎn rú zhī rén xī， bāng zhī yuàn yě！",
        translation: "本该同君子白头到老的夫人，头戴华美的首饰，举止从容又庄重，像山一样稳，像河一样静。她浓黑的头发像云彩，不用戴假发，玉坠子、象牙簪子衬着白净的脸，美得像天仙一样。只是她若做了不好的事，唉，那可怎么说呢！",
      }
      ],
    },
    {
      title: "桑中 · 佚名",
      art: "cloud-flight",
      artPrompt: "古诗《桑中》意境插画：爰采唐矣？沬之乡矣。云谁之思？美孟姜矣。期我乎桑中，要我乎上宫，送我乎淇之上矣。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "爰采唐矣？沬之乡矣。云谁之思？美孟姜矣。期我乎桑中，要我乎上宫，送我乎淇之上矣。\n爰采麦矣？沬之北矣。云谁之思？美孟弋矣。期我乎桑中，要我乎上宫，送我乎淇之上矣。\n爰采葑矣？沬之东矣。云谁之思？美孟庸矣。期我乎桑中，要我乎上宫，送我乎淇之上矣。",
        pinyin: "yuán cǎi táng yǐ？ mèi zhī xiāng yǐ。 yún shuí zhī sī？ měi mèng jiāng yǐ。 qī wǒ hū sāng zhōng， yào wǒ hū shàng gōng， sòng wǒ hū qí zhī shàng yǐ。\nyuán cǎi mài yǐ？ mèi zhī běi yǐ。 yún shuí zhī sī？ měi mèng yì yǐ。 qī wǒ hū sāng zhōng， yào wǒ hū shàng gōng， sòng wǒ hū qí zhī shàng yǐ。\nyuán cǎi fēng yǐ？ mèi zhī dōng yǐ。 yún shuí zhī sī？ měi mèng yōng yǐ。 qī wǒ hū sāng zhōng， yào wǒ hū shàng gōng， sòng wǒ hū qí zhī shàng yǐ。",
        translation: "到沫乡采菟丝子，到沫北收麦子，到沫东挖蔓菁，心里想念的都是那位美丽的姑娘。她约我在桑林中见面，请我到上宫相会，又送我到淇水岸边。",
      }
      ],
    },
    {
      title: "鹑之奔奔 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《鹑之奔奔》意境插画：鹑之奔奔，鹊之彊彊。人之无良，我以为兄！——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "鹑之奔奔，鹊之彊彊。人之无良，我以为兄！\n鹊之彊彊，鹑之奔奔。人之无良，我以为君！",
        pinyin: "chún zhī bēn bēn， què zhī qiáng qiáng。 rén zhī wú liáng， wǒ yǐ wéi xiōng！\nquè zhī qiáng qiáng， chún zhī bēn bēn。 rén zhī wú liáng， wǒ yǐ wéi jūn！",
        translation: "鹌鹑双双齐飞，喜鹊双双齐跳，小鸟都成双成对。那个人品行这样坏，我却还把他当作兄长，当作敬重的君长呀！",
      }
      ],
    },
    {
      title: "定之方中 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《定之方中》意境插画：定之方中，作于楚宫。揆之以日，作于楚室。树之榛栗，椅桐梓漆，爰伐琴桑。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "定之方中，作于楚宫。揆之以日，作于楚室。树之榛栗，椅桐梓漆，爰伐琴桑。\n升彼虚矣，以望楚矣。望楚与堂，景山与京。降观于桑，卜云其吉，终然允臧。\n灵雨既零，命彼倌人，星言夙驾，说于桑田。匪直也人，秉心塞渊，騋牝三千。",
        pinyin: "dìng zhī fāng zhōng， zuò yú chǔ gōng。 kuí zhī yǐ rì， zuò yú chǔ shì。 shù zhī zhēn lì， yǐ tóng zǐ qī， yuán fá qín sāng。\nshēng bǐ xū yǐ， yǐ wàng chǔ yǐ。 wàng chǔ yǔ táng， jǐng shān yǔ jīng。 jiàng guān yú sāng， bǔ yún qí jí， zhōng rán yǔn zāng。\nlíng yǔ jì líng， mìng bǐ guān rén， xīng yán sù jià， shuō yú sāng tián。 fěi zhí yě rén， bǐng xīn sāi yuān， lái pìn sān qiān。",
        translation: "傍晚定星升上中天，人们在楚丘建造新的宫室，测好日影定方位，又种下榛、栗、梓、桐各种树，留着以后做琴做器物。爬上山丘眺望，看中了好地方，占卜说是吉利的，结果果然很好。喜雨刚下过就早早套车去看桑田，他心思又实又深，养起了三千匹好马。",
      }
      ],
    },
    {
      title: "蝃𬟽 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《蝃𬟽》意境插画：蝃𬟽在东，莫之敢指。女子有行，远父母兄弟。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "蝃𬟽在东，莫之敢指。女子有行，远父母兄弟。\n朝𬯀于西，崇朝其雨。女子有行，远兄弟父母。\n乃如之人也，怀婚姻也。大无信也，不知命也！",
        pinyin: "dì dōng zài dōng， mò zhī gǎn zhǐ。 nǚ zǐ yǒu xíng， yuǎn fù mǔ xiōng dì。\ncháo jī yú xī， chóng cháo qí yǔ。 nǚ zǐ yǒu xíng， yuǎn xiōng dì fù mǔ。\nnǎi rú zhī rén yě， huái hūn yīn yě。 dà wú xìn yě， bù zhī mìng yě！",
        translation: "彩虹出现在东边天空，没有人敢用手指它。姑娘出了嫁，就要离开父母兄弟，好好到新家去过日子。可那个人呀，只讲私情不讲诚信，让人叹息，也不懂得守好自己的本分呀。",
      }
      ],
    },
    {
      title: "相鼠 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《相鼠》意境插画：相鼠有皮，人而无仪！人而无仪，不死何为？——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "相鼠有皮，人而无仪！人而无仪，不死何为？\n相鼠有齿，人而无止！人而无止，不死何俟？\n相鼠有体，人而无礼，人而无礼！胡不遄死？",
        pinyin: "xiàng shǔ yǒu pí， rén ér wú yí！ rén ér wú yí， bù sǐ hé wèi？\nxiāng shǔ yǒu chǐ， rén ér wú zhǐ！ rén ér wú zhǐ， bù sǐ hé sì？\nxiāng shǔ yǒu tǐ， rén ér wú lǐ， rén ér wú lǐ！ hú bù chuán sǐ？",
        translation: "你看老鼠还有一层皮呢，人却不能没有礼貌和样子！人要是没有礼貌，还活着做什么呢？还不如快些死去。",
      }
      ],
    },
    {
      title: "干旄 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《干旄》意境插画：孑孑干旄，在浚之郊。素丝纰之，良马四之。彼姝者子，何以畀之？——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "孑孑干旄，在浚之郊。素丝纰之，良马四之。彼姝者子，何以畀之？\n孑孑干旟，在浚之都。素丝组之，良马五之。彼姝者子，何以予之？\n孑孑干旌，在浚之城。素丝祝之，良马六之。彼姝者子，何以告之？",
        pinyin: "jié jié gān máo， zài jùn zhī jiāo。 sù sī pī zhī， liáng mǎ sì zhī。 bǐ shū zhě zǐ， hé yǐ bì zhī？\njié jié gān yú， zài jùn zhī dōu。 sù sī zǔ zhī， liáng mǎ wǔ zhī。 bǐ shū zhě zǐ， hé yǐ yǔ zhī？\njié jié gān jīng， zài jùn zhī chéng。 sù sī zhù zhī， liáng mǎ liù zhī。 bǐ shū zhě zǐ， hé yǐ gào zhī？",
        translation: "旗帜高高飘扬在浚城的郊外，用白丝线镶着边，还驾着四匹骏马。那位美好的姑娘啊，我该拿什么送给她才好呢？",
      }
      ],
    },
    {
      title: "载驰 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《载驰》意境插画：载驰载驱，归唁卫侯。驱马悠悠，言至于漕。大夫跋涉，我心则忧。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "载驰载驱，归唁卫侯。驱马悠悠，言至于漕。大夫跋涉，我心则忧。\n既不我嘉，不能旋反。视尔不臧，我思不远。\n既不我嘉，不能旋济？视尔不臧，我思不閟。\n陟彼阿丘，言采其蝱。女子善怀，亦各有行。许人尤之，众稚且狂。\n我行其野，芃芃其麦。控于大邦，谁因谁极？大夫君子，无我有尤。百尔所思，不如我所之。",
        pinyin: "zǎi chí zǎi qū， guī yàn wèi hóu。 qū mǎ yōu yōu， yán zhì yú cáo。 dài fu bá shè， wǒ xīn zé yōu。\njì bù wǒ jiā， bù néng xuán fǎn。 shì ěr bù zāng， wǒ sī bù yuǎn。\njì bù wǒ jiā， bù néng xuán jì？ shì ěr bù zāng， wǒ sī bù bì。\nzhì bǐ ā qiū， yán cǎi qí méng。 nǚ zǐ shàn huái， yì gè yǒu xíng。 xǔ rén yóu zhī， zhòng zhì qiě kuáng。\nwǒ xíng qí yě， péng péng qí mài。 kòng yú dà bāng， shuí yīn shuí jí？ dài fu jūn zǐ， wú wǒ yǒu yóu。 bǎi ěr suǒ sī， bù rú wǒ suǒ zhī。",
        translation: "我驾着车马快快赶路，回去慰问亡了国的卫侯，沿着长长的路赶到漕邑。许国的大夫们都赶来劝阻、责备我，可我心里一直放不下祖国。我的主意是向大国求救，你们想来想去，都不如我拿定的主意好。",
      }
      ],
    },
    {
      title: "淇奥 · 佚名",
      art: "forest-path",
      artPrompt: "古诗《淇奥》意境插画：瞻彼淇奥，绿竹猗猗。有匪君子，如切如磋，如琢如磨，瑟兮僴兮，赫兮咺兮。有匪君子，终不可谖兮。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "瞻彼淇奥，绿竹猗猗。有匪君子，如切如磋，如琢如磨，瑟兮僴兮，赫兮咺兮。有匪君子，终不可谖兮。\n瞻彼淇奥，绿竹青青。有匪君子，充耳秀莹，会弁如星。瑟兮僴兮。赫兮咺兮，有匪君子，终不可谖兮。\n瞻彼淇奥，绿竹如箦。有匪君子，如金如锡，如圭如璧。宽兮绰兮，猗重较兮。善戏谑兮，不为虐兮。",
        pinyin: "zhān bǐ qí ào， lǜ zhú yī yī。 yǒu fěi jūn zǐ， rú qiē rú cuō， rú zhuó rú mó， sè xī xiàn xī， hè xī xuān xī。 yǒu fěi jūn zǐ， zhōng bù kě xuān xī。\nzhān bǐ qí ào， lǜ zhú qīng qīng。 yǒu fěi jūn zǐ， chōng ěr xiù yíng， huì biàn rú xīng。 sè xī xiàn xī。 hè xī xuān xī， yǒu fěi jūn zǐ， zhōng bù kě xuān xī。\nzhān bǐ qí ào， lǜ zhú rú zé。 yǒu fěi jūn zǐ， rú jīn rú xī， rú guī rú bì。 kuān xī chuò xī， yī zhòng jiào xī。 shàn xì xuè xī， bù wèi nüè xī。",
        translation: "看那淇水的弯弯里，绿竹长得又密又美。有一位文雅的君子，像切磋琢磨过的象牙和美玉一样精致，他庄重又开朗、光明又大方，让人永远忘不了。他宽厚随和，爱开玩笑却不过分。",
      }
      ],
    },
    {
      title: "考槃 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《考槃》意境插画：考槃在涧，硕人之宽。独寐寤言，永矢弗谖。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "考槃在涧，硕人之宽。独寐寤言，永矢弗谖。\n考槃在阿，硕人之薖。独寐寤歌，永矢弗过。\n考槃在六，硕人之轴。独寐寤宿，永矢弗告。",
        pinyin: "kǎo pán zài jiàn， shuò rén zhī kuān。 dú mèi wù yán， yǒng shǐ fú xuān。\nkǎo pán zài ā， shuò rén zhī kē。 dú mèi wù gē， yǒng shǐ fú guò。\nkǎo pán zài liù， shuò rén zhī zhóu。 dú mèi wù sù， yǒng shǐ fú gào。",
        translation: "贤人在山涧旁盖了间小屋，日子过得宽宽自自在。他独自睡觉、醒来、说话、唱歌，还发誓永远不忘这份快乐。",
      }
      ],
    },
    {
      title: "硕人 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《硕人》意境插画：硕人其颀，衣锦褧衣。齐侯之子，卫侯之妻。东宫之妹，邢侯之姨，谭公维私。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "硕人其颀，衣锦褧衣。齐侯之子，卫侯之妻。东宫之妹，邢侯之姨，谭公维私。\n手如柔荑，肤如凝脂，领如蝤蛴，齿如瓠犀，螓首蛾眉，巧笑倩兮，美目盼兮。\n硕人敖敖，说于农郊。四牡有骄，朱幩镳镳。翟茀以朝。大夫夙退，无使君劳。\n河水洋洋，北流活活。施罛濊濊，鳣鲔发发。葭菼揭揭，庶姜孽孽，庶士有朅。",
        pinyin: "shuò rén qí qí， yī jǐn jiǒng yī。 qí hóu zhī zǐ， wèi hóu zhī qī。 dōng gōng zhī mèi， xíng hóu zhī yí， tán gōng wéi sī。\nshǒu rú róu yí， fū rú níng zhī， lǐng rú yóu qí， chǐ rú hù xī， qín shǒu é méi， qiǎo xiào qiàn xī， měi mù pàn xī。\nshuò rén áo áo， shuō yú nóng jiāo。 sì mǔ yǒu jiāo， zhū fén biāo biāo。 zhái fú yǐ cháo。 dài fu sù tuì， wú shǐ jūn láo。\nhé shuǐ yáng yáng， běi liú huó huó。 shī gū huì huì， zhān wěi fā fā。 jiā tǎn jiē jiē， shù jiāng niè niè， shù shì yǒu qiè。",
        translation: "那位美人个子高高的，锦衣外面罩着纱衣，她是齐国国君的女儿、卫国国君的妻子。她的手指像嫩草芽，皮肤像凝住的油脂又白又滑，脖子又白又长，牙齿又白又齐，一笑露出小酒窝，眼睛黑白分明真好看。",
      }
      ],
    },
    {
      title: "氓 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《氓》意境插画：氓之蚩蚩，抱布贸丝。匪来贸丝，来即我谋。送子涉淇，至于顿丘。匪我愆期，子无良媒。将子无怒，秋以为期。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "氓之蚩蚩，抱布贸丝。匪来贸丝，来即我谋。送子涉淇，至于顿丘。匪我愆期，子无良媒。将子无怒，秋以为期。\n乘彼垝垣，以望复关。不见复关，泣涕涟涟。既见复关，载笑载言。尔卜尔筮，体无咎言。以尔车来，以我贿迁。\n桑之未落，其叶沃若。于嗟鸠兮！无食桑葚。于嗟女兮！无与士耽。士之耽兮，犹可说也。女之耽兮，不可说也。\n桑之落矣，其黄而陨。自我徂尔，三岁食贫。淇水汤汤，渐车帷裳。女也不爽，士二其行。士也罔极，二三其德。\n三岁为妇，靡室劳矣。夙兴夜寐，靡有朝矣。言既遂矣，至于暴矣。兄弟不知，咥其笑矣。静言思之，躬自悼矣。\n及尔偕老，老使我怨。淇则有岸，隰则有泮。总角之宴，言笑晏晏，信誓旦旦，不思其反。反是不思，亦已焉哉！",
        pinyin: "máng zhī chī chī， bào bù mào sī。 fěi lái mào sī， lái jí wǒ móu。 sòng zǐ shè qí， zhì yú dùn qiū。 fěi wǒ qiān qī， zǐ wú liáng méi。 jiāng zǐ wú nù， qiū yǐ wéi qī。\nchéng bǐ guǐ yuán， yǐ wàng fù guān。 bù jiàn fù guān， qì tì lián lián。 jì jiàn fù guān， zǎi xiào zǎi yán。 ěr bǔ ěr shì， tǐ wú jiù yán。 yǐ ěr chē lái， yǐ wǒ huì qiān。\nsāng zhī wèi luò， qí yè wò ruò。 yú jiē jiū xī！ wú shí sāng shèn。 yú jiē nǚ xī！ wú yǔ shì dān。 shì zhī dān xī， yóu kě shuō yě。 nǚ zhī dān xī， bù kě shuō yě。\nsāng zhī luò yǐ， qí huáng ér yǔn。 zì wǒ cú ěr， sān suì shí pín。 qí shuǐ tāng tāng， jiàn chē wéi shang。 nǚ yě bù shuǎng， shì èr qí xíng。 shì yě wǎng jí， èr sān qí dé。\nsān suì wèi fù， mí shì láo yǐ。 sù xīng yè mèi， mí yǒu cháo yǐ。 yán jì suì yǐ， zhì yú bào yǐ。 xiōng dì bù zhī， xì qí xiào yǐ。 jìng yán sī zhī， gōng zì dào yǐ。\njí ěr xié lǎo， lǎo shǐ wǒ yuàn。 qí zé yǒu àn， xí zé yǒu pàn。 zǒng jiǎo zhī yàn， yán xiào yàn yàn， xìn shì dàn dàn， bù sī qí fǎn。 fǎn shì bù sī， yì yǐ yān zāi！",
        translation: "一个男子笑嘻嘻地抱着布来换丝，其实是来向姑娘求婚，两人约定秋天成亲。姑娘嫁过去后起早贪黑操劳了好几年，男子却变了心，还对她粗声粗气。姑娘想起小时候的欢笑和他发誓白头到老的样子，伤心地说：既然他不念旧情，那就算了吧！",
      }
      ],
    },
    {
      title: "竹竿 · 佚名",
      art: "forest-path",
      artPrompt: "古诗《竹竿》意境插画：籊籊竹竿，以钓于淇。岂不尔思？远莫致之。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "籊籊竹竿，以钓于淇。岂不尔思？远莫致之。\n泉源在左，淇水在右。女子有行，远兄弟父母。\n淇水在右，泉源在左。巧笑之瑳，佩玉之傩。\n淇水滺滺，桧楫松舟。驾言出游，以写我忧。",
        pinyin: "tì tì zhú gān， yǐ diào yú qí。 qǐ bù ěr sī？ yuǎn mò zhì zhī。\nquán yuán zài zuǒ， qí shuǐ zài yòu。 nǚ zǐ yǒu xíng， yuǎn xiōng dì fù mǔ。\nqí shuǐ zài yòu， quán yuán zài zuǒ。 qiǎo xiào zhī cuō， pèi yù zhī nuó。\nqí shuǐ yōu yōu， guì jí sōng zhōu。 jià yán chū yóu， yǐ xiě wǒ yōu。",
        translation: "细细长长的竹竿，在淇水边钓鱼。我怎么不想念家乡呢？只是路太远回不去了。只好驾起小船出游，排解心里的忧愁。",
      }
      ],
    },
    {
      title: "芄兰 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《芄兰》意境插画：芄兰之支，童子佩觿。虽则佩觿，能不我知。容兮遂兮，垂带悸兮。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "芄兰之支，童子佩觿。虽则佩觿，能不我知。容兮遂兮，垂带悸兮。\n芄兰之叶，童子佩韘。虽则佩韘，能不我甲。容兮遂兮，垂带悸兮。",
        pinyin: "wán lán zhī zhī， tóng zǐ pèi xī。 suī zé pèi xī， néng bù wǒ zhī。 róng xī suì xī， chuí dài jì xī。\nwán lán zhī yè， tóng zǐ pèi shè。 suī zé pèi shè， néng bù wǒ jiǎ。 róng xī suì xī， chuí dài jì xī。",
        translation: "芄兰的枝头结着荚，小家伙也挂上了大人的角锥，虽然戴着却不明白我的心，还慢悠悠地摆着垂带装样子。芄兰的叶子底下，他又挂上大人的扳指，装出大人的模样，其实什么都不懂。",
      }
      ],
    },
    {
      title: "河广 · 佚名",
      art: "river-boat",
      artPrompt: "古诗《河广》意境插画：谁谓河广？一苇杭之。谁谓宋远？跂予望之。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "谁谓河广？一苇杭之。谁谓宋远？跂予望之。\n谁谓河广？曾不容刀。谁谓宋远？曾不崇朝。",
        pinyin: "shuí wèi hé guǎng？ yī wěi háng zhī。 shuí wèi sòng yuǎn？ qí yǔ wàng zhī。\nshuí wèi hé guǎng？ céng bù róng dāo。 shuí wèi sòng yuǎn？ céng bù chóng cháo。",
        translation: "谁说黄河宽？一束芦苇扎的筏子就能渡过去。谁说宋国远？踮起脚尖就能望得见。谁说黄河宽？它小得连一条小船都容不下；谁说宋国远？用不了一个早晨就能走到。",
      }
      ],
    },
    {
      title: "伯兮 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《伯兮》意境插画：伯兮朅兮，邦之桀兮。伯也执殳，为王前驱。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "伯兮朅兮，邦之桀兮。伯也执殳，为王前驱。\n自伯之东，首如飞蓬。岂无膏沐？谁适为容！\n其雨其雨，杲杲出日。愿言思伯，甘心首疾。\n焉得谖草？言树之背。愿言思伯。使我心痗。",
        pinyin: "bó xī qiè xī， bāng zhī jié xī。 bó yě zhí shū， wèi wáng qián qū。\nzì bó zhī dōng， shǒu rú fēi péng。 qǐ wú gāo mù？ shuí shì wèi róng！\nqí yǔ qí yǔ， gǎo gǎo chū rì。 yuàn yán sī bó， gān xīn shǒu jí。\nyān dé xuān cǎo？ yán shù zhī bèi。 yuàn yán sī bó。 shǐ wǒ xīn mèi。",
        translation: "我的哥哥真英武，是全国数一数二的英雄。他手拿兵器，为君王打先锋。自从他往东出征，我的头发就乱得像飞蓬，不是没有梳头的膏油，是打扮了给谁看呢？想他想得头疼也甘心，只盼找到一株忘忧草来解忧。",
      }
      ],
    },
    {
      title: "有狐 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《有狐》意境插画：有狐绥绥，在彼淇梁。心之忧矣，之子无裳。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "有狐绥绥，在彼淇梁。心之忧矣，之子无裳。\n有狐绥绥，在彼淇厉。心之忧矣，之子无带。\n有狐绥绥，在彼淇侧。心之忧矣，之子无服。",
        pinyin: "yǒu hú suí suí， zài bǐ qí liáng。 xīn zhī yōu yǐ， zhī zǐ wú shang。\nyǒu hú suí suí， zài bǐ qí lì。 xīn zhī yōu yǐ， zhī zǐ wú dài。\nyǒu hú suí suí， zài bǐ qí cè。 xīn zhī yōu yǐ， zhī zǐ wú fú。",
        translation: "一只狐狸慢慢悠悠地走，走在淇水的石桥上。我心里发愁：我惦记的那个人，连下衣都没有啊。狐狸走过淇水的浅滩、淇水的旁边，我都在担心他没有衣带、没有衣裳。",
      }
      ],
    },
    {
      title: "木瓜 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《木瓜》意境插画：投我以木瓜，报之以琼琚。匪报也，永以为好也！——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "投我以木瓜，报之以琼琚。匪报也，永以为好也！\n投我以木桃，报之以琼瑶。匪报也，永以为好也！\n投我以木李，报之以琼九。匪报也，永以为好也！",
        pinyin: "tóu wǒ yǐ mù guā， bào zhī yǐ qióng jū。 fěi bào yě， yǒng yǐ wéi hǎo yě！\ntóu wǒ yǐ mù táo， bào zhī yǐ qióng yáo。 fěi bào yě， yǒng yǐ wéi hǎo yě！\ntóu wǒ yǐ mù lǐ， bào zhī yǐ qióng jiǔ。 fěi bào yě， yǒng yǐ wéi hǎo yě！",
        translation: "你送我一个木瓜，我回送你一块美玉。这可不是简单的回礼，是想和你永远相好呀！你送我木桃，我回送琼瑶；你送我木李，我回送美玉，都是为了我们永远要好。",
      }
      ],
    },
    {
      title: "黍离 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《黍离》意境插画：彼黍离离，彼稷之苗。行迈靡靡，中心摇摇。知我者，谓我心忧；不知我者，谓我何求。悠悠苍天，此何人哉？——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "彼黍离离，彼稷之苗。行迈靡靡，中心摇摇。知我者，谓我心忧；不知我者，谓我何求。悠悠苍天，此何人哉？\n彼黍离离，彼稷之穗。行迈靡靡，中心如醉。知我者，谓我心忧；不知我者，谓我何求。悠悠苍天，此何人哉？\n彼黍离离，彼稷之实。行迈靡靡，中心如噎。知我者，谓我心忧；不知我者，谓我何求。悠悠苍天，此何人哉？",
        pinyin: "bǐ shǔ lí lí， bǐ jì zhī miáo。 xíng mài mí mí， zhōng xīn yáo yáo。 zhī wǒ zhě， wèi wǒ xīn yōu； bù zhī wǒ zhě， wèi wǒ hé qiú。 yōu yōu cāng tiān， cǐ hé rén zāi？\nbǐ shǔ lí lí， bǐ jì zhī suì。 xíng mài mí mí， zhōng xīn rú zuì。 zhī wǒ zhě， wèi wǒ xīn yōu； bù zhī wǒ zhě， wèi wǒ hé qiú。 yōu yōu cāng tiān， cǐ hé rén zāi？\nbǐ shǔ lí lí， bǐ jì zhī shí。 xíng mài mí mí， zhōng xīn rú yē。 zhī wǒ zhě， wèi wǒ xīn yōu； bù zhī wǒ zhě， wèi wǒ hé qiú。 yōu yōu cāng tiān， cǐ hé rén zāi？",
        translation: "那边的黍子长得多整齐，高粱也冒出了苗。我慢慢走着，心里晃晃悠悠很难受。懂我的人说我心里忧愁，不懂我的人问我到底想要什么。老天爷呀，这到底是谁造成的呀！",
      }
      ],
    },
    {
      title: "君子于役 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《君子于役》意境插画：君子于役，不知其期。曷至哉？鸡栖于埘。日之夕矣，羊牛下来。君子于役，如之何勿思！——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "君子于役，不知其期。曷至哉？鸡栖于埘。日之夕矣，羊牛下来。君子于役，如之何勿思！\n君子于役，不日不月。曷其有佸？鸡栖于桀。日之夕矣，羊牛下括。君子于役，苟无饥渴？",
        pinyin: "jūn zǐ yú yì， bù zhī qí qī。 hé zhì zāi？ jī qī yú shí。 rì zhī xī yǐ， yáng niú xià lái。 jūn zǐ yú yì， rú zhī hé wù sī！\njūn zǐ yú yì， bù rì bù yuè。 hé qí yǒu huó？ jī qī yú jié。 rì zhī xī yǐ， yáng niú xià kuò。 jūn zǐ yú yì， gǒu wú jī kě？",
        translation: "丈夫出门服役去了，不知道什么时候才能回来。鸡已经进窝了，太阳落山了，牛羊也从坡上走下来了，我怎么能够不想他呢？只盼他在外头别挨饿、别受渴。",
      }
      ],
    },
    {
      title: "君子阳阳 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《君子阳阳》意境插画：君子阳阳，左执簧，右招我由房，其乐只且！——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "君子阳阳，左执簧，右招我由房，其乐只且！\n君子陶陶，左执翿，右招我由敖，其乐只且！",
        pinyin: "jūn zǐ yáng yáng， zuǒ zhí huáng， yòu zhāo wǒ yóu fáng， qí lè zhī qiě！\njūn zǐ táo táo， zuǒ zhí dào， yòu zhāo wǒ yóu áo， qí lè zhī qiě！",
        translation: "丈夫乐洋洋的，左手捧着笙簧，右手招我去跳舞，多么快活呀！他乐陶陶的，左手举着羽毛舞具，右手招我一起去游玩，多么快活呀！",
      }
      ],
    },
    {
      title: "扬之水 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《扬之水》意境插画：扬之水，不流束薪。彼其之子，不与我戍申。怀哉怀哉，曷月予还归哉？——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "扬之水，不流束薪。彼其之子，不与我戍申。怀哉怀哉，曷月予还归哉？\n扬之水，不流束楚。彼其之子，不与我戍甫。怀哉怀哉，曷月予还归哉？\n扬之水，不流束蒲。彼其之子，不与我戍许。怀哉怀哉，曷月予还归哉？",
        pinyin: "yáng zhī shuǐ， bù liú shù xīn。 bǐ qí zhī zǐ， bù yǔ wǒ shù shēn。 huái zāi huái zāi， hé yuè yǔ hái guī zāi？\nyáng zhī shuǐ， bù liú shù chǔ。 bǐ qí zhī zǐ， bù yǔ wǒ shù fǔ。 huái zāi huái zāi， hé yuè yǔ hái guī zāi？\nyáng zhī shuǐ， bù liú shù pú。 bǐ qí zhī zǐ， bù yǔ wǒ shù xǔ。 huái zāi huái zāi， hé yuè yǔ hái guī zāi？",
        translation: "流水哗哗地淌，却冲不走一捆柴草。我牵挂的那个人，不和我一起驻守申地。想啊想啊，哪个月我才能回家去呢？",
      }
      ],
    },
    {
      title: "中谷有蓷 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《中谷有蓷》意境插画：中谷有蓷，暵其干矣。有女仳离，慨其叹矣。慨其叹矣，遇人之艰难矣。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "中谷有蓷，暵其干矣。有女仳离，慨其叹矣。慨其叹矣，遇人之艰难矣。\n中谷有蓷，暵其修矣。有女仳离，条其歗矣。条其歗矣，遇人之不淑矣。\n中谷有蓷，暵其湿矣。有女仳离，啜其泣矣。啜其泣矣，何嗟及矣。",
        pinyin: "zhōng gǔ yǒu tuī， hàn qí gān yǐ。 yǒu nǚ pǐ lí， kǎi qí tàn yǐ。 kǎi qí tàn yǐ， yù rén zhī jiān nán yǐ。\nzhōng gǔ yǒu tuī， hàn qí xiū yǐ。 yǒu nǚ pǐ lí， tiáo qí xiào yǐ。 tiáo qí xiào yǐ， yù rén zhī bù shū yǐ。\nzhōng gǔ yǒu tuī， hàn qí shī yǐ。 yǒu nǚ pǐ lí， chuò qí qì yǐ。 chuò qí qì yǐ， hé jiē jí yǐ。",
        translation: "山谷里的益母草，被晒得干枯了。有个女子被丈夫离弃了，她伤心地叹气，感叹遇上好人真难啊。她长声叹息、抽抽泣泣地哭，后悔也来不及了。",
      }
      ],
    },
    {
      title: "兔爰 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《兔爰》意境插画：有兔爰爰，雉离于罗。我生之初，尚无为；我生之后，逢此百罹。尚寐无吪。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "有兔爰爰，雉离于罗。我生之初，尚无为；我生之后，逢此百罹。尚寐无吪。\n有兔爰爰，雉离于罦。我生之初，尚无造；我生之后，逢此百忧。尚寐无觉。\n有兔爰爰，雉离于罿。我生之初，尚无庸；我生之后，逢此百凶。尚寐无聪。",
        pinyin: "yǒu tù yuán yuán， zhì lí yú luó。 wǒ shēng zhī chū， shàng wú wéi； wǒ shēng zhī hòu， féng cǐ bǎi lí。 shàng mèi wú é。\nyǒu tù yuán yuán， zhì lí yú fú。 wǒ shēng zhī chū， shàng wú zào； wǒ shēng zhī hòu， féng cǐ bǎi yōu。 shàng mèi wú jué。\nyǒu tù yuán yuán， zhì lí yú chōng。 wǒ shēng zhī chū， shàng wú yōng； wǒ shēng zhī hòu， féng cǐ bǎi xiōng。 shàng mèi wú cōng。",
        translation: "兔子安安稳稳地慢慢走，野鸡却撞进了网里。我小时候还没有这么多灾难，长大以后却遇上了种种忧患，真想长睡下去，什么也看不见、听不见。",
      }
      ],
    },
    {
      title: "葛藟 · 佚名",
      art: "river-boat",
      artPrompt: "古诗《葛藟》意境插画：绵绵葛藟，在河之浒。终远兄弟，谓他人父。谓他人父，亦莫我顾！——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "绵绵葛藟，在河之浒。终远兄弟，谓他人父。谓他人父，亦莫我顾！\n绵绵葛爰，在河之藟。终远兄弟，谓他人母。谓他人母，亦莫我有！\n绵绵葛藟，在河之漘。终远兄弟，谓他人昆。谓他人昆，亦莫我闻！",
        pinyin: "mián mián gě lěi， zài hé zhī hǔ。 zhōng yuǎn xiōng dì， wèi tā rén fù。 wèi tā rén fù， yì mò wǒ gù！\nmián mián gě yuán， zài hé zhī lěi。 zhōng yuǎn xiōng dì， wèi tā rén mǔ。 wèi tā rén mǔ， yì mò wǒ yǒu！\nmián mián gě lěi， zài hé zhī chún。 zhōng yuǎn xiōng dì， wèi tā rén kūn。 wèi tā rén kūn， yì mò wǒ wén！",
        translation: "长长的葛藤，爬满了河的岸边。我远离了兄弟亲人，只好叫别人做父亲，可别人不理我；叫别人做母亲、做哥哥，也没有一个人疼我、听我说话。",
      }
      ],
    },
    {
      title: "采葛 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《采葛》意境插画：彼采葛兮，一日不见，如三月兮！——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "彼采葛兮，一日不见，如三月兮！\n彼采萧兮，一日不见，如三秋兮！\n彼采艾兮！一日不见，如三岁兮！",
        pinyin: "bǐ cǎi gě xī， yī rì bù jiàn， rú sān yuè xī！\nbǐ cǎi xiāo xī， yī rì bù jiàn， rú sān qiū xī！\nbǐ cǎi ài xī！ yī rì bù jiàn， rú sān suì xī！",
        translation: "那个采葛的姑娘呀，一天没见到她，就好像过了三个月！采蒿草的姑娘，一天不见就像过了三个秋天；采艾草的姑娘，一天不见就像过了三年！",
      }
      ],
    },
    {
      title: "大车 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《大车》意境插画：大车槛槛，毳衣如菼。岂不尔思？畏子不敢。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "大车槛槛，毳衣如菼。岂不尔思？畏子不敢。\n大车啍啍，毳衣如𫞩，岂不尔思？畏子不奔。\n谷则异室，死则同穴。谓予不信，有如皎日。",
        pinyin: "dà chē kǎn kǎn， cuì yī rú tǎn。 qǐ bù ěr sī？ wèi zǐ bù gǎn。\ndà chē tūn tūn， cuì yī rú mén， qǐ bù ěr sī？ wèi zǐ bù bēn。\ngǔ zé yì shì， sǐ zé tóng xué。 wèi yú bù xìn， yǒu rú jiǎo rì。",
        translation: "大车走得咯噔咯噔响，你穿的衣服绿得像嫩芦苇。难道我不想你吗？是怕你不敢跟我走。活着不能同住一间屋，死了也要埋进一个坟坑。你要说我不真心，明亮的太阳为我作证！",
      }
      ],
    },
    {
      title: "丘中有麻 · 佚名",
      art: "rice-field",
      artPrompt: "古诗《丘中有麻》意境插画：丘中有麻，彼留子嗟。彼留子嗟，将其来施施。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "丘中有麻，彼留子嗟。彼留子嗟，将其来施施。\n丘中有麦，彼留子国。彼留子国，将其来食。\n丘中有李，彼留之子。彼留之子，贻我佩九。",
        pinyin: "qiū zhōng yǒu má， bǐ liú zǐ jiē。 bǐ liú zǐ jiē， jiāng qí lái shī shī。\nqiū zhōng yǒu mài， bǐ liú zǐ guó。 bǐ liú zǐ guó， jiāng qí lái shí。\nqiū zhōng yǒu lǐ， bǐ liú zhī zǐ。 bǐ liú zhī zǐ， yí wǒ pèi jiǔ。",
        translation: "山坡上有麻地，留郎在那里，慢慢走来和我相会。山坡上有麦地，留郎来了，我们正好一起吃饭。山坡上有李树，留郎送了我一块佩玉。",
      }
      ],
    },
    {
      title: "缁衣 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《缁衣》意境插画：缁衣之宜兮，敝予又改为兮。适子之馆兮。还予授子之粲兮。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "缁衣之宜兮，敝予又改为兮。适子之馆兮。还予授子之粲兮。\n缁衣之好兮，敝予又改造兮。适子之馆兮，还予授子之粲兮。\n缁衣之席兮，敝予又改作兮。适子之馆兮，还予授子之粲兮。",
        pinyin: "zī yī zhī yí xī， bì yǔ yòu gǎi wéi xī。 shì zǐ zhī guǎn xī。 hái yǔ shòu zǐ zhī càn xī。\nzī yī zhī hǎo xī， bì yǔ yòu gǎi zào xī。 shì zǐ zhī guǎn xī， hái yǔ shòu zǐ zhī càn xī。\nzī yī zhī xí xī， bì yǔ yòu gǎi zuò xī。 shì zǐ zhī guǎn xī， hái yǔ shòu zǐ zhī càn xī。",
        translation: "你的黑色朝服穿得多合身，破了我就给你再做一件。到你住的地方去，回来再给你准备好饭菜。你的朝服多好看，破了我就给你改做一件，就是这样疼你呀。",
      }
      ],
    },
    {
      title: "将仲子 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《将仲子》意境插画：将仲子兮，无逾我里，无折我树杞。岂敢爱之？畏我父母。仲可怀也，父母之言亦可畏也。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "将仲子兮，无逾我里，无折我树杞。岂敢爱之？畏我父母。仲可怀也，父母之言亦可畏也。\n将仲子兮，无逾我墙，无折我树桑。岂敢爱之？畏我诸兄。仲可怀也，诸兄之言亦可畏也。\n将仲子兮，无逾我园，无折我树檀。岂敢爱之？畏人之多言。仲可怀也，人之多言亦可畏也。",
        pinyin: "jiāng zhòng zǐ xī， wú yú wǒ lǐ， wú zhé wǒ shù qǐ。 qǐ gǎn ài zhī？ wèi wǒ fù mǔ。 zhòng kě huái yě， fù mǔ zhī yán yì kě wèi yě。\njiāng zhòng zǐ xī， wú yú wǒ qiáng， wú zhé wǒ shù sāng。 qǐ gǎn ài zhī？ wèi wǒ zhū xiōng。 zhòng kě huái yě， zhū xiōng zhī yán yì kě wèi yě。\njiāng zhòng zǐ xī， wú yú wǒ yuán， wú zhé wǒ shù tán。 qǐ gǎn ài zhī？ wèi rén zhī duō yán。 zhòng kě huái yě， rén zhī duō yán yì kě wèi yě。",
        translation: "仲子哥呀，别翻我家里的墙头，别折我种的杞树。我哪里是舍不得树呀，是怕爹娘说闲话。仲子哥我很想念你，可爹娘的话也实在让人害怕呀。哥哥们的话、左邻右舍的闲话，也都让人害怕呀。",
      }
      ],
    },
    {
      title: "叔于田 · 佚名",
      art: "rice-field",
      artPrompt: "古诗《叔于田》意境插画：叔于田，巷无居人。岂无居人？不如叔也。洵美且仁。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "叔于田，巷无居人。岂无居人？不如叔也。洵美且仁。\n叔于狩，巷无饮酒。岂无饮酒？不如叔也。洵美且好。\n叔适野，巷无服马。岂无服马？不如叔也。洵美且武。",
        pinyin: "shū yú tián， xiàng wú jū rén。 qǐ wú jū rén？ bù rú shū yě。 xún měi qiě rén。\nshū yú shòu， xiàng wú yǐn jiǔ。 qǐ wú yǐn jiǔ？ bù rú shū yě。 xún měi qiě hǎo。\nshū shì yě， xiàng wú fú mǎ。 qǐ wú fú mǎ？ bù rú shū yě。 xún měi qiě wǔ。",
        translation: "阿叔出门打猎去了，巷子里就像没有了人。不是真没有人，是谁都比不上阿叔，他真是俊美又仁厚。他饮酒、驾马的本领，巷里没有人比得上，他又好看又威武。",
      }
      ],
    },
    {
      title: "大叔于田 · 佚名",
      art: "rice-field",
      artPrompt: "古诗《大叔于田》意境插画：叔于田，乘乘马。执辔如组，两骖如舞。叔在薮，火烈具举。襢裼暴虎，献于公所。将叔勿狃，戒其伤女。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "叔于田，乘乘马。执辔如组，两骖如舞。叔在薮，火烈具举。襢裼暴虎，献于公所。将叔勿狃，戒其伤女。\n叔于田，乘乘黄。两服上襄，两骖雁行。叔在薮，火烈具扬。叔善射忌，又良御忌。抑罄控忌，抑纵送忌。\n叔于田，乘乘鸨。两服齐首，两骖如手。叔在薮，火烈具阜。叔马慢忌，叔发罕忌，抑释掤忌，抑鬯弓忌。",
        pinyin: "shū yú tián， chéng chéng mǎ。 zhí pèi rú zǔ， liǎng cān rú wǔ。 shū zài sǒu， huǒ liè jù jǔ。 tǎn tì bào hǔ， xiàn yú gōng suǒ。 jiāng shū wù niǔ， jiè qí shāng nǚ。\nshū yú tián， chéng chéng huáng。 liǎng fú shàng xiāng， liǎng cān yàn xíng。 shū zài sǒu， huǒ liè jù yáng。 shū shàn shè jì， yòu liáng yù jì。 yì qìng kòng jì， yì zòng sòng jì。\nshū yú tián， chéng chéng bǎo。 liǎng fú qí shǒu， liǎng cān rú shǒu。 shū zài sǒu， huǒ liè jù fù。 shū mǎ màn jì， shū fā hǎn jì， yì shì bīng jì， yì chàng gōng jì。",
        translation: "阿叔去打猎，四匹马驾着车，他手握缰绳像拿着织带，两边的马跑得像跳舞。草泽里猎火烧得旺旺的，他竟赤着膊空手去打老虎，献给国君。请别再冒险了，小心伤着你自己呀！他会射箭会驾车，收放自如，打完猎才慢慢收起弓来。",
      }
      ],
    },
    {
      title: "清人 · 佚名",
      art: "river-boat",
      artPrompt: "古诗《清人》意境插画：清人在彭，驷介旁旁。二矛重英，河上乎翱翔。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "清人在彭，驷介旁旁。二矛重英，河上乎翱翔。\n清人在消，驷介麃麃。二矛重乔，河上乎逍遥。\n清人在轴，驷介陶陶。左旋右抽，中军作好。",
        pinyin: "qīng rén zài péng， sì jiè páng páng。 èr máo zhòng yīng， hé shàng hū áo xiáng。\nqīng rén zài xiāo， sì jiè biāo biāo。 èr máo zhòng qiáo， hé shàng hū xiāo yáo。\nqīng rén zài zhóu， sì jiè táo táo。 zuǒ xuán yòu chōu， zhōng jūn zuò hǎo。",
        translation: "清邑的军队驻在彭地，四匹披甲的战马跑得雄赳赳，两杆长矛插着红缨，在黄河边上遨游。他们驾着战车逍遥自在，左边回旋右边抽刀，主帅的样子真神气。",
      }
      ],
    },
    {
      title: "羔裘 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《羔裘》意境插画：羔裘如濡，洵直且侯。彼其之子，舍命不渝。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "羔裘如濡，洵直且侯。彼其之子，舍命不渝。\n羔裘豹饰，孔武有力。彼其之子，邦之司直。\n羔裘晏兮，三英粲兮。彼其之子，邦之彦兮。",
        pinyin: "gāo qiú rú rú， xún zhí qiě hóu。 bǐ qí zhī zǐ， shě mìng bù yú。\ngāo qiú bào shì， kǒng wǔ yǒu lì。 bǐ qí zhī zǐ， bāng zhī sī zhí。\ngāo qiú yàn xī， sān yīng càn xī。 bǐ qí zhī zǐ， bāng zhī yàn xī。",
        translation: "羔羊皮袍又滑又润，穿它的人正直又美好。那个人啊，舍出性命也不改变操守。皮袍上镶着豹皮做装饰，他威武有力，是国中主持公道的人，是国家的杰出人才。",
      }
      ],
    },
    {
      title: "遵大路 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《遵大路》意境插画：遵大路兮，掺执子之袪兮。无我恶兮，不蓵故也！——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "遵大路兮，掺执子之袪兮。无我恶兮，不蓵故也！\n遵大路兮，掺执子之手兮。无我魗兮，不蓵好也！",
        pinyin: "zūn dà lù xī， chān zhí zǐ zhī qū xī。 wú wǒ è xī， bù jié gù yě！\nzūn dà lù xī， chān zhí zǐ zhī shǒu xī。 wú wǒ chǒu xī， bù jié hǎo yě！",
        translation: "沿着大路走呀，我拉住你的衣袖：请不要讨厌我，别断了老交情呀！我拉住你的手：请不要嫌弃我，别丢了好情谊呀！",
      }
      ],
    },
    {
      title: "女曰鸡鸣 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《女曰鸡鸣》意境插画：女曰鸡鸣，士曰昧旦。子兴视夜，明星有烂。将翱将翔，弋凫与雁。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "女曰鸡鸣，士曰昧旦。子兴视夜，明星有烂。将翱将翔，弋凫与雁。\n弋言加之，与子宜之。宜言饮酒，与子偕老。琴瑟在御，莫不静好。\n知子之来之，杂佩以赠之。知子之顺之，杂佩以问之。知子之好之，杂佩以报之。",
        pinyin: "nǚ yuē jī míng， shì yuē mèi dàn。 zǐ xīng shì yè， míng xīng yǒu làn。 jiāng áo jiāng xiáng， yì fú yǔ yàn。\nyì yán jiā zhī， yǔ zǐ yí zhī。 yí yán yǐn jiǔ， yǔ zǐ xié lǎo。 qín sè zài yù， mò bù jìng hǎo。\nzhī zǐ zhī lái zhī， zá pèi yǐ zèng zhī。 zhī zǐ zhī shùn zhī， zá pèi yǐ wèn zhī。 zhī zǐ zhī hǎo zhī， zá pèi yǐ bào zhī。",
        translation: "妻子说：鸡叫了，快起来。丈夫说：天还没亮呢。妻子说：你起来看看，启明星亮亮的，野鸭和大雁快要飞起来了，快去射吧。射回来一起做菜、喝点酒，和你白头到老，弹琴鼓瑟，日子安安静静多美好。你对我这么好，我把成串的佩玉送给你。",
      }
      ],
    },
    {
      title: "有女同车 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《有女同车》意境插画：有女同车，颜如舜华。将翱将翔，佩玉琼琚。彼美孟姜，洵美且都。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "有女同车，颜如舜华。将翱将翔，佩玉琼琚。彼美孟姜，洵美且都。\n有女同行，颜如舜英。将翱将翔，佩玉将将。彼美孟姜，德音不忘。",
        pinyin: "yǒu nǚ tóng chē， yán rú shùn huá。 jiāng áo jiāng xiáng， pèi yù qióng jū。 bǐ měi mèng jiāng， xún měi qiě dōu。\nyǒu nǚ tóng háng， yán rú shùn yīng。 jiāng áo jiāng xiáng， pèi yù jiāng jiāng。 bǐ měi mèng jiāng， dé yīn bù wàng。",
        translation: "有位姑娘和我同坐一辆车，脸儿像木槿花一样好看。她像要飞起来一样轻盈，身上的佩玉叮当作响。美丽的姜家大姑娘呀，真是漂亮又文雅，美好的名声让人忘不了。",
      }
      ],
    },
    {
      title: "山有扶苏 · 佚名",
      art: "sunrise-hills",
      artPrompt: "古诗《山有扶苏》意境插画：山有扶苏，隰有荷华。不见子都，乃见狂且。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "山有扶苏，隰有荷华。不见子都，乃见狂且。\n山有乔松，隰有游龙，不见子充，乃见狡童。",
        pinyin: "shān yǒu fú sū， xí yǒu hé huá。 bù jiàn zǐ dōu， nǎi jiàn kuáng qiě。\nshān yǒu qiáo sōng， xí yǒu yóu lóng， bù jiàn zǐ chōng， nǎi jiàn jiǎo tóng。",
        translation: "山上有亭亭的扶苏树，洼地里开满荷花。没有遇见美男子子都，偏偏遇见你这个坏小子。山上有高高的松树，洼地里长着红红的游龙草，没遇见子充那样的人，倒遇见你这个滑头的小家伙。",
      }
      ],
    },
    {
      title: "萚兮 · 佚名",
      art: "cloud-flight",
      artPrompt: "古诗《萚兮》意境插画：萚兮萚兮，风其吹女。叔兮伯兮，倡予和女。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "萚兮萚兮，风其吹女。叔兮伯兮，倡予和女。\n萚兮萚兮，风其漂女。叔兮伯兮，倡予要女。",
        pinyin: "tuò xī tuò xī， fēng qí chuī nǚ。 shū xī bó xī， chàng yǔ hé nǚ。\ntuò xī tuò xī， fēng qí piāo nǚ。 shū xī bó xī， chàng yǔ yào nǚ。",
        translation: "枯叶呀枯叶，风把你吹得飘起来。小伙子们呀，你们先起头唱，我来跟着和。枯叶呀枯叶，风把你吹得飘呀飘，你们领着唱，我和着你们一起唱到底。",
      }
      ],
    },
    {
      title: "狡童 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《狡童》意境插画：彼狡童兮，不与我言兮。维子之故，使我不能餐兮。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "彼狡童兮，不与我言兮。维子之故，使我不能餐兮。\n彼狡童兮，不与我食兮。维子之故，使我不能息兮。",
        pinyin: "bǐ jiǎo tóng xī， bù yǔ wǒ yán xī。 wéi zǐ zhī gù， shǐ wǒ bù néng cān xī。\nbǐ jiǎo tóng xī， bù yǔ wǒ shí xī。 wéi zǐ zhī gù， shǐ wǒ bù néng xī xī。",
        translation: "那个滑头的小家伙，不肯和我说话了。都是为了你呀，害我连饭都吃不下。你不肯和我一起吃饭，都是为了你呀，害我连觉都睡不安稳。",
      }
      ],
    },
    {
      title: "褰裳 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《褰裳》意境插画：子惠思我，褰裳涉溱。子不我思，岂无他人？狂童之狂也且！——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "子惠思我，褰裳涉溱。子不我思，岂无他人？狂童之狂也且！\n子惠思我，褰裳涉洧。子不我思，岂无他士？狂童之狂也且！",
        pinyin: "zǐ huì sī wǒ， qiān shang shè zhēn。 zǐ bù wǒ sī， qǐ wú tā rén？ kuáng tóng zhī kuáng yě qiě！\nzǐ huì sī wǒ， qiān shang shè wěi。 zǐ bù wǒ sī， qǐ wú tā shì？ kuáng tóng zhī kuáng yě qiě！",
        translation: "你若是爱我想我，就撩起衣裳蹚过溱水来。你若是不想我，难道就没有别人了吗？你这傻里傻气的小子呀！",
      }
      ],
    },
    {
      title: "丰 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《丰》意境插画：子之丰兮，俟我乎巷兮，悔予不送兮。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "子之丰兮，俟我乎巷兮，悔予不送兮。\n子之昌兮，俟我乎堂兮，悔予不将兮。\n衣锦褧衣，裳锦褧裳。叔兮伯兮，驾予与行。\n裳锦褧裳，衣锦褧衣。叔兮伯兮，驾予与归。",
        pinyin: "zǐ zhī fēng xī， sì wǒ hū xiàng xī， huǐ yǔ bù sòng xī。\nzǐ zhī chāng xī， sì wǒ hū táng xī， huǐ yǔ bù jiāng xī。\nyī jǐn jiǒng yī， shang jǐn jiǒng shang。 shū xī bó xī， jià yǔ yǔ xíng。\nshang jǐn jiǒng shang， yī jǐn jiǒng yī。 shū xī bó xī， jià yǔ yǔ guī。",
        translation: "你体态这样丰俊，曾在巷口等过我，我真后悔没有跟了你去。你这样健壮，曾在堂前等过我，我真后悔没有和你一起走。现在穿好锦衣、罩上纱衣，叔叔伯伯们呀，快驾车来，我和你们一同回家。",
      }
      ],
    },
    {
      title: "东门之𫮃 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《东门之𫮃》意境插画：东门之𫮃，茹藘在阪。其室则迩，其人甚远。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "东门之𫮃，茹藘在阪。其室则迩，其人甚远。\n东门之栗，有践家室。岂不尔思？子不我即！",
        pinyin: "dōng mén zhī shàn， rú lǘ zài bǎn。 qí shì zé ěr， qí rén shèn yuǎn。\ndōng mén zhī lì， yǒu jiàn jiā shì。 qǐ bù ěr sī？ zǐ bù wǒ jí！",
        translation: "东门外的广场边，土坡上长着红红的茜草。你家离得那么近，人却好像离得那么远。东门外有栗树，一排排房屋整整齐齐。我怎么能不想你呢？只是你从来不来找呀！",
      }
      ],
    },
    {
      title: "风雨 · 佚名",
      art: "cloud-flight",
      artPrompt: "古诗《风雨》意境插画：风雨凄凄，鸡鸣喈喈，既见君子。云胡不夷？——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "风雨凄凄，鸡鸣喈喈，既见君子。云胡不夷？\n风雨潇潇，鸡鸣胶胶。既见君子，云胡不瘳？\n风雨如晦，鸡鸣不已。既见君子，云胡不喜？",
        pinyin: "fēng yǔ qī qī， jī míng jiē jiē， jì jiàn jūn zǐ。 yún hú bù yí？\nfēng yǔ xiāo xiāo， jī míng jiāo jiāo。 jì jiàn jūn zǐ， yún hú bù chōu？\nfēng yǔ rú huì， jī míng bù yǐ。 jì jiàn jūn zǐ， yún hú bù xǐ？",
        translation: "风雨冷冷凄凄，鸡叫喈喈不停，这时候见到了心上人，心里怎么会不平静！风雨潇潇，鸡叫声不停，见到了他，心病都好了。风雨天黑得像夜晚，鸡还在叫，见到了他，怎么不欢喜呢！",
      }
      ],
    },
    {
      title: "子衿 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《子衿》意境插画：青青子衿，悠悠我心。纵我不往，子宁不嗣音？——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "青青子衿，悠悠我心。纵我不往，子宁不嗣音？\n青青子佩，悠悠我思。纵我不往，子宁不来？\n挑兮达兮，在城阙兮。一日不见，如三月兮。",
        pinyin: "qīng qīng zǐ jīn， yōu yōu wǒ xīn。 zòng wǒ bù wǎng， zǐ níng bù sì yīn？\nqīng qīng zǐ pèi， yōu yōu wǒ sī。 zòng wǒ bù wǎng， zǐ níng bù lái？\ntiāo xī dá xī， zài chéng quē xī。 yī rì bù jiàn， rú sān yuè xī。",
        translation: "青青的是你的衣领，悠悠不尽的是我的思念。就算我没去找你，你就不能捎个音信来吗？青青的是你的佩带，就算我没去找你，你就不能主动来吗？我走来走去地张望，站在高高的城楼上，一天没见到你，就像过了三个月一样长。",
      }
      ],
    },
    {
      title: "扬之水 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《扬之水》意境插画：扬之水，不流束楚。终鲜兄弟，维予与女。无信人之言，人实诳女。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "扬之水，不流束楚。终鲜兄弟，维予与女。无信人之言，人实诳女。\n扬之水，不流束薪。终鲜兄弟，维予二人。无信人之言，人实不信。",
        pinyin: "yáng zhī shuǐ， bù liú shù chǔ。 zhōng xiān xiōng dì， wéi yǔ yǔ nǚ。 wú xìn rén zhī yán， rén shí kuáng nǚ。\nyáng zhī shuǐ， bù liú shù xīn。 zhōng xiān xiōng dì， wéi yǔ èr rén。 wú xìn rén zhī yán， rén shí bù xìn。",
        translation: "流水哗哗地流，却冲不动成捆的荆条。我们兄弟本来就少，只有我和你两个人。不要相信别人的闲话，别人其实在骗你。别信人家的挑拨，人家实在靠不住呀。",
      }
      ],
    },
    {
      title: "出其东门 · 佚名",
      art: "cloud-flight",
      artPrompt: "古诗《出其东门》意境插画：出其东门，有女如云。虽则如云。匪我思存。缟衣綦巾，聊乐我员。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "出其东门，有女如云。虽则如云。匪我思存。缟衣綦巾，聊乐我员。\n出其𬮱阇，有女如荼。虽则如荼，匪我思且。缟衣茹藘，聊可与娱。",
        pinyin: "chū qí dōng mén， yǒu nǚ rú yún。 suī zé rú yún。 fěi wǒ sī cún。 gǎo yī qí jīn， liáo lè wǒ yuán。\nchū qí yīn dū， yǒu nǚ rú tú。 suī zé rú tú， fěi wǒ sī qiě。 gǎo yī rú lǘ， liáo kě yǔ yú。",
        translation: "走出东门，姑娘多得像天上的云。虽然姑娘像云一样多，却没有一个是我心里想的。只有那位穿白衣、系绿佩巾的姑娘，才让我心里喜欢。走出外城门，姑娘多得像白茅花，只有那位白衣红巾的，才能和我一同欢乐。",
      }
      ],
    },
    {
      title: "野有蔓草 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《野有蔓草》意境插画：野有蔓草，零露漙兮。有美一人，清扬婉兮。邂逅相遇，适我愿兮。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "野有蔓草，零露漙兮。有美一人，清扬婉兮。邂逅相遇，适我愿兮。\n野有蔓草，零露瀼瀼。有美一人，婉如清扬。邂逅相遇，与子偕臧。",
        pinyin: "yě yǒu màn cǎo， líng lù tuán xī。 yǒu měi yī rén， qīng yáng wǎn xī。 xiè hòu xiāng yù， shì wǒ yuàn xī。\nyě yǒu màn cǎo， líng lù ráng ráng。 yǒu měi yī rén， wǎn rú qīng yáng。 xiè hòu xiāng yù， yǔ zǐ xié zāng。",
        translation: "野地里长满蔓延的青草，露珠儿又圆又亮。有个美丽的人儿，眼睛清亮眉目弯弯。不期而遇正好碰上了她，正合我的心愿。",
      }
      ],
    },
    {
      title: "溱洧 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《溱洧》意境插画：溱与洧，方涣涣兮。士与女，方秉蕳兮。女曰观乎？士曰既且。且往观乎？——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "溱与洧，方涣涣兮。士与女，方秉蕳兮。女曰观乎？士曰既且。且往观乎？\n洧之外，洵𬣙且乐。维士与女，伊其相谑，赠之以勺药。\n溱与洧，浏其清矣。士与女，殷其盈矣。女曰观乎？士曰既且。且往观乎？\n洧之外，洵𬣙且乐。维士与女，伊其将谑，赠之以勺药。",
        pinyin: "zhēn yǔ wěi， fāng huàn huàn xī。 shì yǔ nǚ， fāng bǐng jiān xī。 nǚ yuē guān hū？ shì yuē jì qiě。 qiě wǎng guān hū？\nwěi zhī wài， xún xū qiě lè。 wéi shì yǔ nǚ， yī qí xiāng xuè， zèng zhī yǐ sháo yào。\nzhēn yǔ wěi， liú qí qīng yǐ。 shì yǔ nǚ， yīn qí yíng yǐ。 nǚ yuē guān hū？ shì yuē jì qiě。 qiě wǎng guān hū？\nwěi zhī wài， xún xū qiě lè。 wéi shì yǔ nǚ， yī qí jiāng xuè， zèng zhī yǐ sháo yào。",
        translation: "溱水和洧水的河水涨起来了，青年男女手里都拿着兰花。姑娘说：去那边看看好不好？小伙子说：已经去过了。姑娘说：再陪我去看一回嘛！洧水边上又宽敞又热闹，男男女女互相说笑打趣，还互相赠送芍药花。",
      }
      ],
    },
    {
      title: "鸡鸣 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《鸡鸣》意境插画：鸡既鸣矣，朝既盈矣。匪鸡则鸣，苍蝇之声。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "鸡既鸣矣，朝既盈矣。匪鸡则鸣，苍蝇之声。\n东方明矣，朝既昌矣。匪东方则明，月出之光。\n虫飞薨薨，甘与子同梦。会且归矣，无庶予子憎。",
        pinyin: "jī jì míng yǐ， cháo jì yíng yǐ。 fěi jī zé míng， cāng yíng zhī shēng。\ndōng fāng míng yǐ， cháo jì chāng yǐ。 fěi dōng fāng zé míng， yuè chū zhī guāng。\nchóng fēi hōng hōng， gān yǔ zǐ tóng mèng。 huì qiě guī yǐ， wú shù yǔ zǐ zēng。",
        translation: "妻子说：鸡都叫了，朝堂上人该满了。丈夫说：那不是鸡叫，是苍蝇嗡嗡响。妻子说：东方天都亮了。丈夫说：那不是天亮，是月亮的光。虫子嗡嗡地飞，多想和你一起再睡个回笼觉，可你快上朝散了回来吧，免得人家说你我惹人嫌。",
      }
      ],
    },
    {
      title: "还 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《还》意境插画：子之还兮，遭我乎狃之间兮。并驱从两肩兮，揖我谓我儇兮。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "子之还兮，遭我乎狃之间兮。并驱从两肩兮，揖我谓我儇兮。\n子之茂兮，遭我乎狃之道兮。并驱从两牡兮，揖我谓我好兮。\n子之昌兮，遭我乎狃之阳兮。并驱从两狼兮，揖我谓我臧兮。",
        pinyin: "zǐ zhī hái xī， zāo wǒ hū niǔ zhī jiān xī。 bìng qū cóng liǎng jiān xī， yī wǒ wèi wǒ xuān xī。\nzǐ zhī mào xī， zāo wǒ hū niǔ zhī dào xī。 bìng qū cóng liǎng mǔ xī， yī wǒ wèi wǒ hǎo xī。\nzǐ zhī chāng xī， zāo wǒ hū niǔ zhī yáng xī。 bìng qū cóng liǎng láng xī， yī wǒ wèi wǒ zāng xī。",
        translation: "你真敏捷呀，在峱山里遇见我，咱们一起追赶两只公兽，你作揖夸我身手灵巧。你真出色呀，在峱山道上遇见我，并肩追两只公兽，你拱手夸我本领高。你真健壮呀，在峱山南边遇见我，一起追赶两只狼，你作揖夸我干得漂亮。",
      }
      ],
    },
    {
      title: "着 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《着》意境插画：俟我于着乎而，充耳以素乎而，尚之以琼华乎而。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "俟我于着乎而，充耳以素乎而，尚之以琼华乎而。\n俟我于庭乎而，充耳以青乎而，尚之以琼莹乎而。\n俟我于堂乎而，充耳以黄乎而，尚之以琼英乎而。",
        pinyin: "sì wǒ yú zhe hū ér， chōng ěr yǐ sù hū ér， shàng zhī yǐ qióng huá hū ér。\nsì wǒ yú tíng hū ér， chōng ěr yǐ qīng hū ér， shàng zhī yǐ qióng yíng hū ér。\nsì wǒ yú táng hū ér， chōng ěr yǐ huáng hū ér， shàng zhī yǐ qióng yīng hū ér。",
        translation: "他等在门屏前呀，耳朵旁垂着白丝线，还坠着亮闪闪的美玉。他等在庭院里呀，垂着青丝线，坠着晶莹的美玉。他等在堂屋前呀，垂着黄丝线，坠着美玉闪闪发光。",
      }
      ],
    },
    {
      title: "东方之日 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《东方之日》意境插画：东方之日兮，彼姝者子，在我室兮。在我室兮，履我即兮。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "东方之日兮，彼姝者子，在我室兮。在我室兮，履我即兮。\n东方之月兮，彼姝者子，在我闼兮。在我闼兮，履我发兮。",
        pinyin: "dōng fāng zhī rì xī， bǐ shū zhě zǐ， zài wǒ shì xī。 zài wǒ shì xī， lǚ wǒ jí xī。\ndōng fāng zhī yuè xī， bǐ shū zhě zǐ， zài wǒ tà xī。 zài wǒ tà xī， lǚ wǒ fā xī。",
        translation: "东方的太阳升起来了，那位美丽的姑娘来到我的屋里。她在我屋里，轻轻地踩着我的脚印走。东方的月亮升起来了，美丽的姑娘来到我的门里，轻轻地踩着我的脚印走。",
      }
      ],
    },
    {
      title: "东方未明 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《东方未明》意境插画：东方未明，颠倒衣裳。颠之倒之，自公召之。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "东方未明，颠倒衣裳。颠之倒之，自公召之。\n东方未晞，颠倒裳衣。倒之颠之，自公令之。\n折柳樊圃，狂夫瞿瞿。不能辰夜，不夙则莫。",
        pinyin: "dōng fāng wèi míng， diān dǎo yī cháng。 diān zhī dǎo zhī， zì gōng zhào zhī。\ndōng fāng wèi xī， diān dǎo shang yī。 dǎo zhī diān zhī， zì gōng lìng zhī。\nzhé liǔ fán pǔ， kuáng fū qú qú。 bù néng chén yè， bù sù zé mò。",
        translation: "东方还没亮，就把衣裳穿颠倒了。慌慌张张地穿衣，是官府来叫他当差呀。天还没露白又把衣裳穿反了，是官府的命令催得紧。折下柳条围起菜园，狂夫看了直瞪眼；他分不清白天黑夜，不是起得太早，就是回来得太晚。",
      }
      ],
    },
    {
      title: "南山 · 佚名",
      art: "sunrise-hills",
      artPrompt: "古诗《南山》意境插画：南山崔崔，雄狐绥绥。鲁道有荡，齐子由归。既曰归止，曷又怀止？——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "南山崔崔，雄狐绥绥。鲁道有荡，齐子由归。既曰归止，曷又怀止？\n葛屦五两，冠緌双止。鲁道有荡，齐子庸止。既曰庸止，曷又从止？\n蓺麻如之何？衡从其亩。取妻如之何？必告父母。既曰告止，曷又鞠止？\n析薪如之何？匪斧不克。取妻如之何？匪媒不得。既曰得止，曷又极止？",
        pinyin: "nán shān cuī cuī， xióng hú suí suí。 lǔ dào yǒu dàng， qí zǐ yóu guī。 jì yuē guī zhǐ， hé yòu huái zhǐ？\ngě jù wǔ liǎng， guān ruí shuāng zhǐ。 lǔ dào yǒu dàng， qí zǐ yōng zhǐ。 jì yuē yōng zhǐ， hé yòu cóng zhǐ？\nyì má rú zhī hé？ héng cóng qí mǔ。 qǔ qī rú zhī hé？ bì gào fù mǔ。 jì yuē gào zhǐ， hé yòu jū zhǐ？\nxī xīn rú zhī hé？ fěi fǔ bù kè。 qǔ qī rú zhī hé？ fěi méi bù dé。 jì yuē dé zhǐ， hé yòu jí zhǐ？",
        translation: "南山高高耸立，公狐狸慢慢地走。鲁国的大道平又平，齐国的姑娘从这里出嫁。既然已经嫁了人，为什么还惦记着她？种麻要怎样种？把田垄横横竖竖整好。娶妻该怎样娶？一定要禀告父母。劈柴要怎样劈？没有斧头劈不动。娶妻该怎样娶？没有媒人娶不成。既然已经娶到手了，为什么还由着她没个够？",
      }
      ],
    },
    {
      title: "甫田 · 佚名",
      art: "rice-field",
      artPrompt: "古诗《甫田》意境插画：无田甫田，维莠骄骄。无思远人，劳心忉忉。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "无田甫田，维莠骄骄。无思远人，劳心忉忉。\n无田甫田，维莠桀桀。无思远人，劳心怛怛。\n婉兮娈兮。总角丱兮。未几见兮，突而弁兮！",
        pinyin: "wú tián fǔ tián， wéi yǒu jiāo jiāo。 wú sī yuǎn rén， láo xīn dāo dāo。\nwú tián fǔ tián， wéi yǒu jié jié。 wú sī yuǎn rén， láo xīn dá dá。\nwǎn xī luán xī。 zǒng jiǎo guàn xī。 wèi jǐ jiàn xī， tū ér biàn xī！",
        translation: "不要去耕太大的田，田里会长满高高的野草；不要总想念远方的人，白白让心里难过。瞧那个扎着小发髻的孩子，没多久没见，就长成戴帽子的大孩子啦！",
      }
      ],
    },
    {
      title: "卢令 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《卢令》意境插画：卢令令，其人美且仁。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "卢令令，其人美且仁。\n卢重环，其人美且鬈。\n卢重鋂，其人美且偲。",
        pinyin: "lú lìng lìng， qí rén měi qiě rén。\nlú zhòng huán， qí rén měi qiě quán。\nlú zhòng méi， qí rén měi qiě cāi。",
        translation: "猎狗脖子上的铃铛叮当叮当响，牵狗的猎人又英俊又善良。狗儿戴上大铜环、套上双环，猎人更是漂亮又能干。",
      }
      ],
    },
    {
      title: "敝笱 · 佚名",
      art: "cloud-flight",
      artPrompt: "古诗《敝笱》意境插画：敝笱在梁，其鱼鲂鳏。齐子归止，其从如云。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "敝笱在梁，其鱼鲂鳏。齐子归止，其从如云。\n敝笱在梁，其鱼鲂鱮。齐子归止，其从如雨。\n敝笱在梁，其鱼唯唯。齐子归止，其从如水。",
        pinyin: "bì gǒu zài liáng， qí yú fáng guān。 qí zǐ guī zhǐ， qí cóng rú yún。\nbì gǒu zài liáng， qí yú fáng xù。 qí zǐ guī zhǐ， qí cóng rú yǔ。\nbì gǒu zài liáng， qí yú wéi wéi。 qí zǐ guī zhǐ， qí cóng rú shuǐ。",
        translation: "破旧的鱼笼架在拦鱼坝上，大鱼都随便游来游去，根本拦不住。齐国来的姑娘回娘家，跟车的随从多得像云、像雨、像流水。",
      }
      ],
    },
    {
      title: "载驱 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《载驱》意境插画：载驱薄薄，簟茀朱鞹。鲁道有荡，齐子发夕。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "载驱薄薄，簟茀朱鞹。鲁道有荡，齐子发夕。\n四骊济济，垂辔沵沵。鲁道有荡，齐子岂弟。\n汶水汤汤，行人彭彭。鲁道有荡，齐子翱翔。\n汶水滔滔，行人儦儦。鲁道有荡，齐了游敖。",
        pinyin: "zǎi qū báo báo， diàn fú zhū kuò。 lǔ dào yǒu dàng， qí zǐ fā xī。\nsì lí jì jì， chuí pèi mǐ mǐ。 lǔ dào yǒu dàng， qí zǐ qǐ dì。\nwèn shuǐ tāng tāng， xíng rén péng péng。 lǔ dào yǒu dàng， qí zǐ áo xiáng。\nwèn shuǐ tāo tāo， xíng rén biāo biāo。 lǔ dào yǒu dàng， qí le yóu áo。",
        translation: "马车咕噜噜跑得快，车上有竹帘和红色的皮篷。通向鲁国的大路平平坦坦，齐国姑娘天不亮就上了路。汶水滚滚流，路上行人多，她却一路逍遥游逛。",
      }
      ],
    },
    {
      title: "猗嗟 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《猗嗟》意境插画：猗嗟昌兮，颀而长兮。抑若扬兮，美目扬兮。巧趋跄兮，射则臧兮。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "猗嗟昌兮，颀而长兮。抑若扬兮，美目扬兮。巧趋跄兮，射则臧兮。\n猗嗟名兮，美目清兮。仪既成兮，终日射侯，不出正兮，展我甥兮。\n猗嗟娈兮，清扬婉兮。舞则选兮，射则贯兮，四矢反兮，以御乱兮。",
        pinyin: "yī jiē chāng xī， qí ér cháng xī。 yì ruò yáng xī， měi mù yáng xī。 qiǎo qū qiàng xī， shè zé zāng xī。\nyī jiē míng xī， měi mù qīng xī。 yí jì chéng xī， zhōng rì shè hóu， bù chū zhèng xī， zhǎn wǒ shēng xī。\nyī jiē luán xī， qīng yáng wǎn xī。 wǔ zé xuǎn xī， shè zé guàn xī， sì shǐ fǎn xī， yǐ yù luàn xī。",
        translation: "哎呀这小伙真健壮，个子高高，额头方方，眼睛明亮，脚步灵巧，射箭的本领真高强。他整天对着箭靶射箭，箭箭都射中靶心；舞姿优美，四支箭射中同一个地方，真是个能保家卫国的好儿郎。",
      }
      ],
    },
    {
      title: "葛屦 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《葛屦》意境插画：纠纠葛屦，可以履霜？掺掺女手，可以缝裳？要之襋之，好人服之。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "纠纠葛屦，可以履霜？掺掺女手，可以缝裳？要之襋之，好人服之。\n好人提提，宛然左辟，佩其象揥。维是褊心，是以为刺。",
        pinyin: "jiū jiū gé jù， kě yǐ lǚ shuāng？ chān chān nǚ shǒu， kě yǐ fèng shang？ yào zhī jí zhī， hǎo rén fú zhī。\nhǎo rén tí tí， wǎn rán zuǒ pì， pèi qí xiàng dì。 wéi shì biǎn xīn， shì yǐ wéi cì。",
        translation: "细葛布的鞋儿，怎么能在霜地上走？姑娘纤细的手，忙着缝好衣裳，提好领口系好带子，给美人穿上。美人却傲慢地转过身去，心眼儿太窄，人们就编了这首歌笑话她。",
      }
      ],
    },
    {
      title: "汾沮洳 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《汾沮洳》意境插画：彼汾沮洳，言采其莫。彼其之子，美无度。美无度，殊异乎公路。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "彼汾沮洳，言采其莫。彼其之子，美无度。美无度，殊异乎公路。\n彼汾一方，言采其桑。彼其之子，美如英。美如英，殊异乎公行。\n彼汾一曲，言采其藚。彼其之子，美如玉。美如玉，殊异乎公族。",
        pinyin: "bǐ fén jǔ rù， yán cǎi qí mò。 bǐ qí zhī zǐ， měi wú dù。 měi wú dù， shū yì hū gōng lù。\nbǐ fén yī fāng， yán cǎi qí sāng。 bǐ qí zhī zǐ， měi rú yīng。 měi rú yīng， shū yì hū gōng xíng。\nbǐ fén yī qǔ， yán cǎi qí xù。 bǐ qí zhī zǐ， měi rú yù。 měi rú yù， shū yì hū gōng zú。",
        translation: "在汾河边低湿的地方，有人采着野菜。那个人儿呀，美好得没法形容，跟那些贵族官爷完全不一样；他美得像朵花、像块玉，比公家的子弟们强多啦。",
      }
      ],
    },
    {
      title: "园有桃 · 佚名",
      art: "spring-bird",
      artPrompt: "古诗《园有桃》意境插画：园有桃，其实之肴。心之忧矣，我歌且谣。不知我者，谓我士也骄。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "园有桃，其实之肴。心之忧矣，我歌且谣。不知我者，谓我士也骄。\n彼人是哉，子曰何其？心之忧矣，其谁知之？其谁知之，盖亦勿思！\n园有棘，其实之食。心之忧矣，聊以行国。不知我者，谓我士也罔极。\n彼人是哉，子曰何其？心之忧矣，其谁知之？其谁知之，盖亦勿思！",
        pinyin: "yuán yǒu táo， qí shí zhī yáo。 xīn zhī yōu yǐ， wǒ gē qiě yáo。 bù zhī wǒ zhě， wèi wǒ shì yě jiāo。\nbǐ rén shì zāi， zǐ yuē hé qí？ xīn zhī yōu yǐ， qí shuí zhī zhī？ qí shuí zhī zhī， gài yì wù sī！\nyuán yǒu jí， qí shí zhī shí。 xīn zhī yōu yǐ， liáo yǐ xíng guó。 bù zhī wǒ zhě， wèi wǒ shì yě wǎng jí。\nbǐ rén shì zāi， zǐ yuē hé qí？ xīn zhī yōu yǐ， qí shuí zhī zhī？ qí shuí zhī zhī， gài yì wù sī！",
        translation: "园里的桃子可以吃，我心里忧愁，就唱唱歌来散散心，不了解我的人还说我骄傲。园里的枣子也可以吃，我还是发愁，只好到外头走走。我的忧愁有谁知道呢？没人懂，也就不去想了。",
      }
      ],
    },
    {
      title: "陟岵 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《陟岵》意境插画：陟彼岵兮，瞻望父兮。父曰：嗟！予子行役，夙夜无已。上慎旃哉，犹来！无止！——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "陟彼岵兮，瞻望父兮。父曰：嗟！予子行役，夙夜无已。上慎旃哉，犹来！无止！\n陟彼屺兮，瞻望母兮。母曰：嗟！予季行役，夙夜无寐。上慎旃哉，犹来！无弃！\n陟彼冈兮，瞻望兄兮。兄曰：嗟！予弟行役，夙夜必偕。上慎旃哉，犹来！无死！",
        pinyin: "zhì bǐ hù xī， zhān wàng fù xī。 fù yuē： jiē！ yǔ zǐ xíng yì， sù yè wú yǐ。 shàng shèn zhān zāi， yóu lái！ wú zhǐ！\nzhì bǐ qǐ xī， zhān wàng mǔ xī。 mǔ yuē： jiē！ yǔ jì xíng yì， sù yè wú mèi。 shàng shèn zhān zāi， yóu lái！ wú qì！\nzhì bǐ gāng xī， zhān wàng xiōng xī。 xiōng yuē： jiē！ yǔ dì xíng yì， sù yè bì xié。 shàng shèn zhān zāi， yóu lái！ wú sǐ！",
        translation: "我爬上高高的山冈，远远望着亲人，好像听见他们叮咛：唉，我的孩子在外面当差，从早到晚不得歇，千万要小心保重，早点回家，别留在那儿，别出事呀！",
      }
      ],
    },
    {
      title: "十亩之间 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《十亩之间》意境插画：十亩之间兮，桑者闲闲兮，行与子还兮。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "十亩之间兮，桑者闲闲兮，行与子还兮。\n十亩之外兮，桑者泄泄兮，行与子逝兮。",
        pinyin: "shí mǔ zhī jiān xī， sāng zhě xián xián xī， xíng yǔ zǐ hái xī。\nshí mǔ zhī wài xī， sāng zhě xiè xiè xī， xíng yǔ zǐ shì xī。",
        translation: "十亩桑园里，采桑的人儿多悠闲，来吧，咱们一起回家去。桑园外面，采桑的人儿说说笑笑，来吧，咱们一起往回走。",
      }
      ],
    },
    {
      title: "伐檀 · 佚名",
      art: "river-boat",
      artPrompt: "古诗《伐檀》意境插画：坎坎伐檀兮，置之河之干兮。河水清且涟猗。不稼不穑，胡取禾三百廛兮？——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "坎坎伐檀兮，置之河之干兮。河水清且涟猗。不稼不穑，胡取禾三百廛兮？\n不狩不猎，胡瞻尔庭有县貆兮？彼君子兮，不素餐兮！\n坎坎伐辐兮，置之河之侧兮。河水清且直猗。不稼不穑，胡取禾三百亿兮？\n不狩不猎，胡瞻尔庭有县特兮？彼君子兮，不素食兮！\n坎坎伐轮兮，置之河之漘兮。河水清且沦猗。不稼不穑，胡取禾三百囷兮？\n不狩不猎，胡瞻尔庭有县鹑兮？彼君子兮，不素飧兮！",
        pinyin: "kǎn kǎn fá tán xī， zhì zhī hé zhī gān xī。 hé shuǐ qīng qiě lián yī。 bù jià bù sè， hú qǔ hé sān bǎi chán xī？\nbù shòu bù liè， hú zhān ěr tíng yǒu xiàn huān xī？ bǐ jūn zǐ xī， bù sù cān xī！\nkǎn kǎn fá fú xī， zhì zhī hé zhī cè xī。 hé shuǐ qīng qiě zhí yī。 bù jià bù sè， hú qǔ hé sān bǎi yì xī？\nbù shòu bù liè， hú zhān ěr tíng yǒu xiàn tè xī？ bǐ jūn zǐ xī， bù sù shí xī！\nkǎn kǎn fá lún xī， zhì zhī hé zhī chún xī。 hé shuǐ qīng qiě lún yī。 bù jià bù sè， hú qǔ hé sān bǎi qūn xī？\nbù shòu bù liè， hú zhān ěr tíng yǒu xiàn chún xī？ bǐ jūn zǐ xī， bù sù sūn xī！",
        translation: "砍树的人坎坎地辛苦干活，把檀木搬到清清的河边。可那些人不种庄稼，凭什么拿走一车车粮食？不去打猎，凭什么院子里挂着野味？那些大人老爷呀，难道真的不白吃饭吗？",
      }
      ],
    },
    {
      title: "硕鼠 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《硕鼠》意境插画：硕鼠硕鼠，无食我黍！三岁贯女，莫我肯顾。逝将去女，适彼乐土。乐土乐土，爰得我所。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "硕鼠硕鼠，无食我黍！三岁贯女，莫我肯顾。逝将去女，适彼乐土。乐土乐土，爰得我所。\n硕鼠硕鼠，无食我麦！三岁贯女，莫我肯德。逝将去女，适彼乐国。乐国乐国，爰得我直。\n硕鼠硕鼠，无食我苗！三岁贯女，莫我肯劳。逝将去女，适彼乐郊。乐郊乐郊，谁之永号？",
        pinyin: "shuò shǔ shuò shǔ， wú shí wǒ shǔ！ sān suì guàn nǚ， mò wǒ kěn gù。 shì jiāng qù nǚ， shì bǐ lè tǔ。 lè tǔ lè tǔ， yuán dé wǒ suǒ。\nshuò shǔ shuò shǔ， wú shí wǒ mài！ sān suì guàn nǚ， mò wǒ kěn dé。 shì jiāng qù nǚ， shì bǐ lè guó。 lè guó yuè guó， yuán dé wǒ zhí。\nshuò shǔ shuò shǔ， wú shí wǒ miáo！ sān suì guàn nǚ， mò wǒ kěn láo。 shì jiāng qù nǚ， shì bǐ lè jiāo。 lè jiāo lè jiāo， shuí zhī yǒng hào？",
        translation: "大老鼠呀大老鼠，别再吃我的黍子！这么多年我养活你，你却一点儿不心疼我。我发誓要离开你，搬到那快活的乐土去——乐土乐土，在那里才能过上安生的日子。",
      }
      ],
    },
    {
      title: "蟋蟀 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《蟋蟀》意境插画：蟋蟀在堂，岁聿其莫。今我不乐，日月其除。无已大康，职思其居。好乐无荒，良士瞿瞿。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "蟋蟀在堂，岁聿其莫。今我不乐，日月其除。无已大康，职思其居。好乐无荒，良士瞿瞿。\n蟋蟀在堂，岁聿其逝。今我不乐，日月其迈。无已大康，职思其外。好乐无荒，良士蹶蹶。\n蟋蟀在堂，役车其休。今我不乐，日月其慆。无以大康。职思其忧。好乐无荒，良士休休。",
        pinyin: "xī shuài zài táng， suì yù qí mò。 jīn wǒ bù lè， rì yuè qí chú。 wú yǐ dà kāng， zhí sī qí jū。 hǎo lè wú huāng， liáng shì qú qú。\nxī shuài zài táng， suì yù qí shì。 jīn wǒ bù lè， rì yuè qí mài。 wú yǐ dà kāng， zhí sī qí wài。 hǎo lè wú huāng， liáng shì juě juě。\nxī shuài zài táng， yì chē qí xiū。 jīn wǒ bù lè， rì yuè qí tāo。 wú yǐ dà kāng。 zhí sī qí yōu。 hǎo lè wú huāng， liáng shì xiū xiū。",
        translation: "蟋蟀在屋里叫，一年快要到头了。要是不趁现在乐一乐，日子就白白溜走啦。可也不能太贪玩，还得想着自己的事情；又快活又不耽误正事，才是让人佩服的好人呀。",
      }
      ],
    },
    {
      title: "山有枢 · 佚名",
      art: "sunrise-hills",
      artPrompt: "古诗《山有枢》意境插画：山有枢，隰有榆。子有衣裳，弗曳弗娄。子有车马，弗驰弗驱。宛其死矣，他人是愉。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "山有枢，隰有榆。子有衣裳，弗曳弗娄。子有车马，弗驰弗驱。宛其死矣，他人是愉。\n山有栲，隰有杻。子有廷内，弗洒弗扫。子有钟鼓，弗鼓弗考。宛其死矣，他人是保。\n山有漆，隰有栗。子有酒食，何不日鼓瑟？且以喜乐，且以永日。宛其死矣，他人入室。",
        pinyin: "shān yǒu shū， xí yǒu yú。 zǐ yǒu yī shang， fú yè fú lóu。 zǐ yǒu chē mǎ， fú chí fú qū。 wǎn qí sǐ yǐ， tā rén shì yú。\nshān yǒu kǎo， xí yǒu niǔ。 zǐ yǒu tíng nèi， fú sǎ fú sǎo。 zǐ yǒu zhōng gǔ， fú gǔ fú kǎo。 wǎn qí sǐ yǐ， tā rén shì bǎo。\nshān yǒu qī， xí yǒu lì。 zǐ yǒu jiǔ shí， hé bù rì gǔ sè？ qiě yǐ xǐ lè， qiě yǐ yǒng rì。 wǎn qí sǐ yǐ， tā rén rù shì。",
        translation: "山上有树，洼地有树。你有漂亮衣裳舍不得穿，有好车好马舍不得坐，有厅堂不打扫，有钟鼓不敲打，有酒有肉不享受，等你一死，可都让别人占去享用啦。",
      }
      ],
    },
    {
      title: "扬之水 · 佚名",
      art: "cloud-flight",
      artPrompt: "古诗《扬之水》意境插画：扬之水，白石凿凿。素衣朱襮，从子于沃。既见君子，云何不乐？——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "扬之水，白石凿凿。素衣朱襮，从子于沃。既见君子，云何不乐？\n扬之水，白石皓皓。素衣朱绣，从子于鹄。既见君子，云何其忧？\n扬之水，白石粼粼。我闻有命，不敢以告人。",
        pinyin: "yáng zhī shuǐ， bái shí záo záo。 sù yī zhū bó， cóng zǐ yú wò。 jì jiàn jūn zǐ， yún hé bù lè？\nyáng zhī shuǐ， bái shí hào hào。 sù yī zhū xiù， cóng zǐ yú hú。 jì jiàn jūn zǐ， yún hé qí yōu？\nyáng zhī shuǐ， bái shí lín lín。 wǒ wén yǒu mìng， bù gǎn yǐ gào rén。",
        translation: "缓缓的河水，冲得白石子亮闪闪。我穿着白上衣红领边，跟着你去了沃地，见到了心里惦记的人，怎么能不高兴呢？后来我听说了件大事，可不敢告诉别人呀。",
      }
      ],
    },
    {
      title: "椒聊 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《椒聊》意境插画：椒聊之实，蕃衍盈升。彼其之子，硕大无朋。椒聊且，远条且。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "椒聊之实，蕃衍盈升。彼其之子，硕大无朋。椒聊且，远条且。\n椒聊之实，蕃衍盈匊。彼其之子，硕大且笃。椒聊且，远条且。",
        pinyin: "jiāo liáo zhī shí， fān yǎn yíng shēng。 bǐ qí zhī zǐ， shuò dà wú péng。 jiāo liáo qiě， yuǎn tiáo qiě。\njiāo liáo zhī shí， fān yǎn yíng jū。 bǐ qí zhī zǐ， shuò dà qiě dǔ。 jiāo liáo qiě， yuǎn tiáo qiě。",
        translation: "花椒结的籽儿密密麻麻，装满了一升又一捧。那个人儿呀，长得高大结实，谁也比不上。愿他像花椒树一样，香气远远飘散，子子孙孙兴旺。",
      }
      ],
    },
    {
      title: "绸缪 · 佚名",
      art: "star-sea",
      artPrompt: "古诗《绸缪》意境插画：绸缪束薪，三星在天。今夕何夕，见此良人？子兮子兮，如此良人何？——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "绸缪束薪，三星在天。今夕何夕，见此良人？子兮子兮，如此良人何？\n绸缪束刍，三星在隅。今夕何夕，见此邂逅？子兮子兮，如此邂逅何？\n绸缪束楚，三星在户。今夕何夕，见此粲者？子兮子兮，如此粲者何？",
        pinyin: "chóu móu shù xīn， sān xīng zài tiān。 jīn xī hé xī， jiàn cǐ liáng rén？ zǐ xī zǐ xī， rú cǐ liáng rén hé？\nchóu móu shù chú， sān xīng zài yú。 jīn xī hé xī， jiàn cǐ xiè hòu？ zǐ xī zǐ xī， rú cǐ xiè hòu hé？\nchóu móu shù chǔ， sān xīng zài hù。 jīn xī hé xī， jiàn cǐ càn zhě？ zǐ xī zǐ xī， rú cǐ càn zhě hé？",
        translation: "把柴草捆成捆儿，天上的星星亮晶晶。今晚到底是什么好日子，能见到这么好的人？你呀你呀，遇见这么好的人，欢喜得都不知道怎么办才好了！",
      }
      ],
    },
    {
      title: "杕杜 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《杕杜》意境插画：有杕之杜，其叶湑湑。独行踽踽。岂无他人？不如我同父。嗟行之人，胡不比焉？人无兄弟，胡不佽焉？——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "有杕之杜，其叶湑湑。独行踽踽。岂无他人？不如我同父。嗟行之人，胡不比焉？人无兄弟，胡不佽焉？\n有杕之杜，其叶箐箐。独行睘睘。岂无他人？不如我同姓。嗟行之人，胡不比焉？人无兄弟，胡不佽焉？",
        pinyin: "yǒu dì zhī dù， qí yè xǔ xǔ。 dú xíng jǔ jǔ。 qǐ wú tā rén？ bù rú wǒ tóng fù。 jiē xíng zhī rén， hú bù bǐ yān？ rén wú xiōng dì， hú bù cì yān？\nyǒu dì zhī dù， qí yè jīng jīng。 dú xíng qióng qióng。 qǐ wú tā rén？ bù rú wǒ tóng xìng。 jiē xíng zhī rén， hú bù bǐ yān？ rén wú xiōng dì， hú bù cì yān？",
        translation: "一株杜梨树孤零零地站着，叶子倒是长得很茂盛。我独自赶路孤孤单单，路上不是没有人，可比不上自己的亲兄弟亲。唉，路上的行人呀，为什么不亲近我、帮帮我这个没有兄弟的人呢？",
      }
      ],
    },
    {
      title: "羔裘 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《羔裘》意境插画：羔裘豹祛，自我人居居。岂无他人？维子之故。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "羔裘豹祛，自我人居居。岂无他人？维子之故。\n羔裘豹褎，自我人究究。岂无他人？维子之好。",
        pinyin: "gāo qiú bào qū， zì wǒ rén jū jū。 qǐ wú tā rén？ wéi zǐ zhī gù。\ngāo qiú bào xiù， zì wǒ rén jiū jiū。 qǐ wú tā rén？ wéi zǐ zhī hǎo。",
        translation: "你穿着豹皮袖口的羔皮袍子，对我却傲慢又冷淡。难道我就没有别的朋友了吗？只是因为念着旧日的情分呀。",
      }
      ],
    },
    {
      title: "鸨羽 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《鸨羽》意境插画：肃肃鸨羽，集于苞栩。王事靡盬，不能蓺稷黍。父母何怙？悠悠苍天，曷其有所？——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "肃肃鸨羽，集于苞栩。王事靡盬，不能蓺稷黍。父母何怙？悠悠苍天，曷其有所？\n肃肃鸨翼，集于苞棘。王事靡盬，不能蓺黍稷。父母何食？悠悠苍天，曷其有极？\n肃肃鸨行，集于苞桑，王事靡盬，不能蓺稻梁。父母何尝？悠悠苍天，曷其有常？",
        pinyin: "sù sù bǎo yǔ， jí yú bāo xǔ。 wáng shì mí gǔ， bù néng yì jì shǔ。 fù mǔ hé hù？ yōu yōu cāng tiān， hé qí yǒu suǒ？\nsù sù bǎo yì， jí yú bāo jí。 wáng shì mí gǔ， bù néng yì shǔ jì。 fù mǔ hé shí？ yōu yōu cāng tiān， hé qí yǒu jí？\nsù sù bǎo xíng， jí yú bāo sāng， wáng shì mí gǔ， bù néng yì dào liáng。 fù mǔ hé cháng？ yōu yōu cāng tiān， hé qí yǒu cháng？",
        translation: "大野雁扑棱棱扇着翅膀，落在丛生的柞树上。官家的差事没完没了，田里的庄稼都种不上，爹娘靠什么生活呢？老天爷呀老天爷，什么时候才能有个安定的日子？",
      }
      ],
    },
    {
      title: "无衣 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《无衣》意境插画：岂曰无衣七兮？不如子之衣，安且吉兮！——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "岂曰无衣七兮？不如子之衣，安且吉兮！\n岂曰无衣六兮？不如子之衣，安且燠兮！",
        pinyin: "qǐ yuē wú yī qī xī？ bù rú zǐ zhī yī， ān qiě jí xī！\nqǐ yuē wú yī liù xī？ bù rú zǐ zhī yī， ān qiě yù xī！",
        translation: "谁说我没有衣裳穿？我的衣裳有七件呢。可它们都比不上你送的那件，穿在身上又舒服又吉利。",
      }
      ],
    },
    {
      title: "有杕之杜 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《有杕之杜》意境插画：有杕之杜，生于道左。彼君子兮，噬肯适我？中心好之，曷饮食之？——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "有杕之杜，生于道左。彼君子兮，噬肯适我？中心好之，曷饮食之？\n有杕之杜，生于道周。彼君子兮，噬肯来游？中心好之，曷饮食之？",
        pinyin: "yǒu dì zhī dù， shēng yú dào zuǒ。 bǐ jūn zǐ xī， shì kěn shì wǒ？ zhōng xīn hǎo zhī， hé yǐn shí zhī？\nyǒu dì zhī dù， shēng yú dào zhōu。 bǐ jūn zǐ xī， shì kěn lái yóu？ zhōng xīn hǎo zhī， hé yǐn shí zhī？",
        translation: "一株杜梨树，长在大路旁边。那位好人儿呀，肯不肯来看看我呢？我心里这么喜欢他，该拿什么好吃的招待他呀？",
      }
      ],
    },
    {
      title: "葛生 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《葛生》意境插画：葛生蒙楚，蔹蔓于野。予美亡此，谁与？独处？——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "葛生蒙楚，蔹蔓于野。予美亡此，谁与？独处？\n葛生蒙棘，蔹蔓于域。予美亡此，谁与？独息？\n角枕粲兮，锦衾烂兮。予美亡此，谁与？独旦？\n夏之日，冬之夜。百岁之后，归于其居。\n冬之夜，夏之日。百岁之后，归于其室。",
        pinyin: "gě shēng méng chǔ， liǎn màn yú yě。 yǔ měi wáng cǐ， shuí yǔ？ dú chǔ？\ngě shēng méng jí， liǎn màn yú yù。 yǔ měi wáng cǐ， shuí yǔ？ dú xī？\njiǎo zhěn càn xī， jǐn qīn làn xī。 yǔ měi wáng cǐ， shuí yǔ？ dú dàn？\nxià zhī rì， dōng zhī yè。 bǎi suì zhī hòu， guī yú qí jū。\ndōng zhī yè， xià zhī rì。 bǎi suì zhī hòu， guī yú qí shì。",
        translation: "葛藤爬满了荆条，蔹草爬满了荒野，我爱的人不在了，有谁陪着我呢？只能一个人孤单单。夏天的白天好长，冬天的夜里好长，等到百年之后，我就去你安睡的地方，永远和你在一起。",
      }
      ],
    },
    {
      title: "采苓 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《采苓》意境插画：采苓采苓，首阳之巅。人之为言，苟亦无信。舍旃舍旃，苟亦无然。人之为言，胡得焉？——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "采苓采苓，首阳之巅。人之为言，苟亦无信。舍旃舍旃，苟亦无然。人之为言，胡得焉？\n采苦采苦，首阳之下。人之为言，苟亦无与。舍旃舍旃，苟亦无然。人之为言，胡得焉？\n采葑采葑，首阳之东。人之为言，苟亦无从。舍旃舍旃，苟亦无然。人之为言，胡得焉？",
        pinyin: "cǎi líng cǎi líng， shǒu yáng zhī diān。 rén zhī wèi yán， gǒu yì wú xìn。 shè zhān shè zhān， gǒu yì wú rán。 rén zhī wèi yán， hú dé yān？\ncǎi kǔ cǎi kǔ， shǒu yáng zhī xià。 rén zhī wèi yán， gǒu yì wú yǔ。 shè zhān shè zhān， gǒu yì wú rán。 rén zhī wèi yán， hú dé yān？\ncǎi fēng cǎi fēng， shǒu yáng zhī dōng。 rén zhī wèi yán， gǒu yì wú cóng。 shè zhān shè zhān， gǒu yì wú rán。 rén zhī wèi yán， hú dé yān？",
        translation: "采甘草呀采甘草，到那首阳山顶上去采。别人说的闲话瞎话，可不能随便相信；丢开它丢开它，别当真。那些瞎话，又能骗得了谁呢？",
      }
      ],
    },
    {
      title: "车邻 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《车邻》意境插画：有车邻邻，有马白颠。未见君子，寺人之令。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "有车邻邻，有马白颠。未见君子，寺人之令。\n阪有漆，隰有栗。既见君子，并坐鼓瑟。今者不乐，逝者其耋。\n阪有桑，隰有杨。既见君子，并坐鼓簧。今者不乐，逝者其亡。",
        pinyin: "yǒu chē lín lín， yǒu mǎ bái diān。 wèi jiàn jūn zǐ， sì rén zhī lìng。\nbǎn yǒu qī， xí yǒu lì。 jì jiàn jūn zǐ， bìng zuò gǔ sè。 jīn zhě bù lè， shì zhě qí dié。\nbǎn yǒu sāng， xí yǒu yáng。 jì jiàn jūn zǐ， bìng zuò gǔ huáng。 jīn zhě bù lè， shì zhě qí wáng。",
        translation: "车儿辚辚驶过来，马儿额头白白的。还没见到好朋友，先请守门人去通报。山坡上有漆树，洼地上有栗树，见到好朋友，咱们坐在一起弹琴敲鼓；今天不趁早快活快活，转眼人就老啦。",
      }
      ],
    },
    {
      title: "驷驖 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《驷驖》意境插画：驷驖孔阜，六辔在手。公之媚子，从公于狩。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "驷驖孔阜，六辔在手。公之媚子，从公于狩。\n奉时辰牡，辰牡孔硕。公曰左之，舍拔则获。\n游于北园，四马既闲。𬨎车鸾镳，载猃歇骄。",
        pinyin: "sì tiě kǒng fù， liù pèi zài shǒu。 gōng zhī mèi zǐ， cóng gōng yú shòu。\nfèng shí chén mǔ， chén mǔ kǒng shuò。 gōng yuē zuǒ zhī， shè bá zé huò。\nyóu yú běi yuán， sì mǎ jì xián。 yóu chē luán biāo， zǎi xiǎn xiē jiāo。",
        translation: "四匹黑色大马又高又壮，六条缰绳握在手里，跟着国君去打猎。肥壮的野兽被赶出来，国君一声令下往左射，箭一放就射中了。打猎回来在北园游玩，马儿走得稳稳当当，轻快的小车上还载着猎狗。",
      }
      ],
    },
    {
      title: "小戎 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《小戎》意境插画：小戎俴收，五楘梁辀。游环胁驱，阴靷鋈续。文茵畅毂，驾我骐馵。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "小戎俴收，五楘梁辀。游环胁驱，阴靷鋈续。文茵畅毂，驾我骐馵。\n言念君子，温其如玉。在其板屋，乱我心曲。\n四牡孔阜，六辔在手。骐骝是中，䯄骊是骖。龙盾之合，鋈以觼軜。\n言念君子，温其在邑。方何为期？胡然我念之！\n俴驷孔群，厹矛鋈𬭚。蒙伐有苑，虎韔镂膺。交韔二弓，竹闭绲縢。\n言念君子，载寝载兴。厌厌良人，秩秩德音。",
        pinyin: "xiǎo róng jiàn shōu， wǔ mù liáng zhōu。 yóu huán xié qū， yīn yǐn wù xù。 wén yīn chàng gū， jià wǒ qí zhù。\nyán niàn jūn zǐ， wēn qí rú yù。 zài qí bǎn wū， luàn wǒ xīn qǔ。\nsì mǔ kǒng fù， liù pèi zài shǒu。 qí liú shì zhōng， 䯄 lí shì cān。 lóng dùn zhī hé， wù yǐ jué nà。\nyán niàn jūn zǐ， wēn qí zài yì。 fāng hé wéi qī？ hú rán wǒ niàn zhī！\njiàn sì kǒng qún， qiú máo wù chún。 méng fá yǒu yuàn， hǔ chàng lòu yīng。 jiāo chàng èr gōng， zhú bì gǔn téng。\nyán niàn jūn zǐ， zǎi qǐn zǎi xīng。 yàn yàn liáng rén， zhì zhì dé yīn。",
        translation: "战车轻巧，马儿雄壮，装备样样齐整。我思念着我的人呀，他温和得像块美玉；他在西边的营房里，让我心里乱糟糟的。什么时候才是他回家的日子呢？想他想到睡也睡不安稳。",
      }
      ],
    },
    {
      title: "蒹葭 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《蒹葭》意境插画：蒹葭苍苍，白露为霜。所谓伊人，在水一方。溯洄从之，道阻且长。溯游从之，宛在水中央。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "蒹葭苍苍，白露为霜。所谓伊人，在水一方。溯洄从之，道阻且长。溯游从之，宛在水中央。\n蒹葭萋萋，白露未晞。所谓伊人，在水之湄。溯洄从之，道阻且跻。溯游从之，宛在水中坻。\n蒹葭采采，白露未已。所谓伊人，在水之涘。溯洄从之，道阻且右。溯游从之，宛在水中沚。",
        pinyin: "jiān jiā cāng cāng， bái lù wèi shuāng。 suǒ wèi yī rén， zài shuǐ yī fāng。 sù huí cóng zhī， dào zǔ qiě cháng。 sù yóu cóng zhī， wǎn zài shuǐ zhōng yāng。\njiān jiā qī qī， bái lù wèi xī。 suǒ wèi yī rén， zài shuǐ zhī méi。 sù huí cóng zhī， dào zǔ qiě jī。 sù yóu cóng zhī， wǎn zài shuǐ zhōng dǐ。\njiān jiā cǎi cǎi， bái lù wèi yǐ。 suǒ wèi yī rén， zài shuǐ zhī sì。 sù huí cóng zhī， dào zǔ qiě yòu。 sù yóu cóng zhī， wǎn zài shuǐ zhōng zhǐ。",
        translation: "河边的芦苇苍苍茫茫，清晨的白露结成了霜。我心里想念的那个人呀，就在河的那一边。逆流上去找她，路又险又长；顺流下去找她，她好像又站在水的中央。",
      }
      ],
    },
    {
      title: "终南 · 佚名",
      art: "sunrise-hills",
      artPrompt: "古诗《终南》意境插画：终南何有？有条有梅。君子至止，锦衣狐裘。颜如渥丹，其君也哉！——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "终南何有？有条有梅。君子至止，锦衣狐裘。颜如渥丹，其君也哉！\n终南何有？有纪有堂。君子至止，黻衣绣裳。佩玉将将，寿考不忘！",
        pinyin: "zhōng nán hé yǒu？ yǒu tiáo yǒu méi。 jūn zǐ zhì zhǐ， jǐn yī hú qiú。 yán rú wò dān， qí jūn yě zāi！\nzhōng nán hé yǒu？ yǒu jì yǒu táng。 jūn zǐ zhì zhǐ， fú yī xiù shang。 pèi yù jiāng jiāng， shòu kǎo bù wàng！",
        translation: "终南山上有什么呀？有山楸树和野梅树。君子来到了这里，穿着锦缎衣、狐皮袍，脸色红润润的，真是一位好君王！他身上的佩玉叮当作响，愿他健康长寿，永远被人们记着。",
      }
      ],
    },
    {
      title: "黄鸟 · 佚名",
      art: "spring-bird",
      artPrompt: "古诗《黄鸟》意境插画：交交黄鸟，止于棘。谁从穆公？子车奄息。维此奄息，百夫之特。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "交交黄鸟，止于棘。谁从穆公？子车奄息。维此奄息，百夫之特。\n临其穴，惴惴其栗。彼苍者天，歼我良人！如可赎兮，人百其身！\n交交黄鸟，止于桑。谁从穆公？子车仲行。维此仲行，百夫之防。\n临其穴，惴惴其栗。彼苍者天，歼我良人！如可赎兮，人百其身！\n交交黄鸟，止于楚。谁从穆公？子车针虎。维此针虎，百夫之御。\n临其穴，惴惴其栗。彼苍者天，歼我良人！如可赎兮，人百其身！",
        pinyin: "jiāo jiāo huáng niǎo， zhǐ yú jí。 shuí cóng mù gōng？ zǐ chē yǎn xī。 wéi cǐ yǎn xī， bǎi fū zhī tè。\nlín qí xué， zhuì zhuì qí lì。 bǐ cāng zhě tiān， jiān wǒ liáng rén！ rú kě shú xī， rén bǎi qí shēn！\njiāo jiāo huáng niǎo， zhǐ yú sāng。 shuí cóng mù gōng？ zǐ chē zhòng xíng。 wéi cǐ zhòng xíng， bǎi fū zhī fáng。\nlín qí xué， zhuì zhuì qí lì。 bǐ cāng zhě tiān， jiān wǒ liáng rén！ rú kě shú xī， rén bǎi qí shēn！\njiāo jiāo huáng niǎo， zhǐ yú chǔ。 shuí cóng mù gōng？ zǐ chē zhēn hǔ。 wéi cǐ zhēn hǔ， bǎi fū zhī yù。\nlín qí xué， zhuì zhuì qí lì。 bǐ cāng zhě tiān， jiān wǒ liáng rén！ rú kě shú xī， rén bǎi qí shēn！",
        translation: "黄鸟叽叽叫，落在枣树上。谁要跟着穆公去陪葬？是子车家的奄息，他一个人能顶一百个人。人们走到墓坑边，吓得浑身直哆嗦：苍天呀苍天，为什么要害死这样的好人！要是能换回他的命，我们一百个人都愿意替他去！",
      }
      ],
    },
    {
      title: "晨风 · 佚名",
      art: "forest-path",
      artPrompt: "古诗《晨风》意境插画：鴥彼晨风，郁彼北林。未见君子，忧心钦钦。如何如何，忘我实多！——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "鴥彼晨风，郁彼北林。未见君子，忧心钦钦。如何如何，忘我实多！\n山有苞栎，隰有六駮。未见君子，忧心靡乐。如何如何，忘我实多！\n山有苞棣，隰有树檖。未见君子，忧心如醉。如何如何，忘我实多！",
        pinyin: "yù bǐ chén fēng， yù bǐ běi lín。 wèi jiàn jūn zǐ， yōu xīn qīn qīn。 rú hé rú hé， wàng wǒ shí duō！\nshān yǒu bāo lì， xí yǒu liù bó。 wèi jiàn jūn zǐ， yōu xīn mí lè。 rú hé rú hé， wàng wǒ shí duō！\nshān yǒu bāo dì， xí yǒu shù suì。 wèi jiàn jūn zǐ， yōu xīn rú zuì。 rú hé rú hé， wàng wǒ shí duō！",
        translation: "晨风鸟飞得又快又急，北边的树林郁郁葱葱。一直见不到那个人，我心里忧愁得放不下。这是怎么了呀？他把我忘得太多了！",
      }
      ],
    },
    {
      title: "无衣 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《无衣》意境插画：岂曰无衣？与子同袍。王于兴师，修我戈矛。与子同仇！——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "岂曰无衣？与子同袍。王于兴师，修我戈矛。与子同仇！\n岂曰无衣？与子同泽。王于兴师，修我矛戟。与子偕作！\n岂曰无衣？与子同裳。王于兴师，修我甲兵。与子偕行！",
        pinyin: "qǐ yuē wú yī？ yǔ zǐ tóng páo。 wáng yú xīng shī， xiū wǒ gē máo。 yǔ zǐ tóng chóu！\nqǐ yuē wú yī？ yǔ zǐ tóng zé。 wáng yú xīng shī， xiū wǒ máo jǐ。 yǔ zǐ xié zuò！\nqǐ yuē wú yī？ yǔ zǐ tóng shang。 wáng yú xīng shī， xiū wǒ jiǎ bīng。 yǔ zǐ xié xíng！",
        translation: "谁说没有衣裳穿？我和你同披一件战袍。君王要出兵打仗了，快把我们的戈和矛修好，咱们对付的是同一个敌人，一起准备，一起出发！",
      }
      ],
    },
    {
      title: "渭阳 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《渭阳》意境插画：我送舅氏，曰至渭阳。何以赠之？路车乘黄。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "我送舅氏，曰至渭阳。何以赠之？路车乘黄。\n我送舅氏，悠悠我思。何以赠之？琼瑰玉佩。",
        pinyin: "wǒ sòng jiù shì， yuē zhì wèi yáng。 hé yǐ zèng zhī？ lù chē chéng huáng。\nwǒ sòng jiù shì， yōu yōu wǒ sī。 hé yǐ zèng zhī？ qióng guī yù pèi。",
        translation: "我送舅舅回家，一直送到渭河的北岸。拿什么送他呢？一辆大车和四匹黄马。送舅舅的时候，我心里久久想念着他，再拿美玉和玉佩送给他作纪念。",
      }
      ],
    },
    {
      title: "权舆 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《权舆》意境插画：于我乎，夏屋渠渠，今也每食无余。于嗟乎，不承权舆！——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "于我乎，夏屋渠渠，今也每食无余。于嗟乎，不承权舆！\n于我乎，每食四簋，今也每食不饱。于嗟乎，不承权舆！",
        pinyin: "yú wǒ hū， xià wū qú qú， jīn yě měi shí wú yú。 yú jiē hū， bù chéng quán yú！\nyú wǒ hū， měi shí sì guǐ， jīn yě měi shí bù bǎo。 yú jiē hū， bù chéng quán yú！",
        translation: "从前呀，我住着高大的房子，每顿饭都吃不完；如今每顿饭都所剩无几。唉，这样的日子，跟从前没法比啦！从前每顿饭摆满四大碗，如今连肚子都填不饱了。",
      }
      ],
    },
    {
      title: "宛丘 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《宛丘》意境插画：子之汤兮，宛丘之上兮。洵有情兮，而无望兮。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "子之汤兮，宛丘之上兮。洵有情兮，而无望兮。\n坎其击鼓，宛丘之下。无冬无夏，值其鹭羽。\n坎其击缶，宛丘之道。无冬无夏，值其鹭翿。",
        pinyin: "zǐ zhī tāng xī， wǎn qiū zhī shàng xī。 xún yǒu qíng xī， ér wú wàng xī。\nkǎn qí jī gǔ， wǎn qiū zhī xià。 wú dōng wú xià， zhí qí lù yǔ。\nkǎn qí jī fǒu， wǎn qiū zhī dào。 wú dōng wú xià， zhí qí lù dào。",
        translation: "你跳舞跳得多欢快呀，就在宛丘的高坡上。我真是打心底里喜欢，却不敢抱什么指望。咚咚的鼓声、嗡嗡的缶声里，不管冬天还是夏天，你都举着鹭鸶羽毛跳呀跳。",
      }
      ],
    },
    {
      title: "东门之枌 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《东门之枌》意境插画：东门之枌，宛丘之栩。子仲之子，婆娑其下。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "东门之枌，宛丘之栩。子仲之子，婆娑其下。\n谷旦于差，南方之原。不绩其麻，市也婆娑。\n谷旦于逝，越以鬷迈。视尔如荍，贻我握椒。",
        pinyin: "dōng mén zhī fén， wǎn qiū zhī xǔ。 zǐ zhòng zhī zǐ， pó suō qí xià。\ngǔ dàn yú chà， nán fāng zhī yuán。 bù jì qí má， shì yě pó suō。\ngǔ dàn yú shì， yuè yǐ zōng mài。 shì ěr rú qiáo， yí wǒ wò jiāo。",
        translation: "东门外长着白榆树，宛丘上有柞树，子仲家的好姑娘在树底下翩翩起舞。挑了个好日子，大家聚在南边的旷野上，姑娘放下手里的麻活儿，也赶到集市上跳舞。我看你美得像朵锦葵花，你送我一把香香的花椒。",
      }
      ],
    },
    {
      title: "衡门 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《衡门》意境插画：衡门之下，可以栖迟。泌之洋洋，可以乐饥。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "衡门之下，可以栖迟。泌之洋洋，可以乐饥。\n岂其食鱼，必河之鲂？岂其取妻，必齐之姜？\n岂其食鱼，必河之鲤？岂其取妻，必宋之子？",
        pinyin: "héng mén zhī xià， kě yǐ qī chí。 mì zhī yáng yáng， kě yǐ lè jī。\nqǐ qí shí yú， bì hé zhī fáng？ qǐ qí qǔ qī， bì qí zhī jiāng？\nqǐ qí shí yú， bì hé zhī lǐ？ qǐ qí qǔ qī， bì sòng zhī zǐ？",
        translation: "横木搭成的简陋小门下，也可以悠闲地歇脚玩耍；哗哗流的泉水，看看也能解解心里的饿。吃鱼何必一定要黄河的鳊鱼？娶妻何必一定要齐国的姜家姑娘？吃鲤鱼也行，娶宋国的子家姑娘也很好呀。",
      }
      ],
    },
    {
      title: "东门之池 · 佚名",
      art: "rice-field",
      artPrompt: "古诗《东门之池》意境插画：东门之池，可以沤麻。彼美淑姬，可与晤歌。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "东门之池，可以沤麻。彼美淑姬，可与晤歌。\n东门之池，可以沤纻。彼美淑姬，可与晤语。\n东门之池，可以沤菅。彼美淑姬，可与晤言。",
        pinyin: "dōng mén zhī chí， kě yǐ ōu má。 bǐ měi shū jī， kě yǔ wù gē。\ndōng mén zhī chí， kě yǐ ōu zhù。 bǐ měi shū jī， kě yǔ wù yǔ。\ndōng mén zhī chí， kě yǐ ōu jiān。 bǐ měi shū jī， kě yǔ wù yán。",
        translation: "东门外的池塘水清清，可以泡麻、泡苎麻、泡菅草。那位美丽善良的好姑娘，可以和她面对面地唱歌，面对面地说说心里话。",
      }
      ],
    },
    {
      title: "东门之杨 · 佚名",
      art: "star-sea",
      artPrompt: "古诗《东门之杨》意境插画：东门之杨，其叶牂牂。昏以为期，明星煌煌。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "东门之杨，其叶牂牂。昏以为期，明星煌煌。\n东门之杨，其叶肺肺。昏以为期，明星晢晢。",
        pinyin: "dōng mén zhī yáng， qí yè zāng zāng。 hūn yǐ wéi qī， míng xīng huáng huáng。\ndōng mén zhī yáng， qí yè fèi fèi。 hūn yǐ wéi qī， míng xīng zhé zhé。",
        translation: "东门外的白杨树，叶子在风里沙沙响。我们约好了黄昏见面，可如今星星都亮晶晶了，人还没有来。",
      }
      ],
    },
    {
      title: "墓门 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《墓门》意境插画：墓门有棘，斧以斯之。夫也不良，国人知之。知而不已，谁昔然矣。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "墓门有棘，斧以斯之。夫也不良，国人知之。知而不已，谁昔然矣。\n墓门有梅，有鸮萃止。夫也不良，歌以讯之。讯予不顾，颠倒思予。",
        pinyin: "mù mén yǒu jí， fǔ yǐ sī zhī。 fū yě bù liáng， guó rén zhī zhī。 zhī ér bù yǐ， shuí xī rán yǐ。\nmù mén yǒu méi， yǒu xiāo cuì zhǐ。 fū yě bù liáng， gē yǐ xùn zhī。 xùn yǔ bù gù， diān dǎo sī yǔ。",
        translation: "墓门长着酸枣树，拿斧头把它砍掉。那个人不是好人，全国的人都知道，知道了还不改，一直就是这么坏。墓门的梅树上，猫头鹰蹲在上头，人们编歌儿劝他，他偏偏不听，等到栽了大跟头，才想起当初的劝告。",
      }
      ],
    },
    {
      title: "防有鹊巢 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《防有鹊巢》意境插画：防有鹊巢，邛有旨苕。谁侜予美？心焉忉忉。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "防有鹊巢，邛有旨苕。谁侜予美？心焉忉忉。\n中唐有甓，邛有旨鹝。谁侜予美？心焉惕惕。",
        pinyin: "fáng yǒu què cháo， qióng yǒu zhǐ tiáo。 shuí zhōu yǔ měi？ xīn yān dāo dāo。\nzhōng táng yǒu pì， qióng yǒu zhǐ yì。 shuí zhōu yǔ měi？ xīn yān tì tì。",
        translation: "高高的堤坝上怎么会有喜鹊窝？土坡上怎么会长出香甜的水草？是谁在挑拨离间，欺骗我的心上人？害得我心里又愁又慌。",
      }
      ],
    },
    {
      title: "月出 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《月出》意境插画：月出皎兮。佼人僚兮。舒窈纠兮。劳心悄兮。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "月出皎兮。佼人僚兮。舒窈纠兮。劳心悄兮。\n月出皓兮。佼人懰兮。舒忧受兮。劳心慅兮。\n月出照兮。佼人燎兮。舒夭绍兮。劳心惨兮。",
        pinyin: "yuè chū jiǎo xī。 jiǎo rén liáo xī。 shū yǎo jiū xī。 láo xīn qiāo xī。\nyuè chū hào xī。 jiǎo rén liú xī。 shū yōu shòu xī。 láo xīn cǎo xī。\nyuè chū zhào xī。 jiǎo rén liáo xī。 shū yāo shào xī。 láo xīn cǎn xī。",
        translation: "月亮出来亮又圆，姑娘的脸儿真好看。她迈着轻轻柔柔的步子，让我想她想得心里发酸。",
      }
      ],
    },
    {
      title: "株林 · 佚名",
      art: "forest-path",
      artPrompt: "古诗《株林》意境插画：胡为乎株林？从夏南！匪适株林，从夏南！——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "胡为乎株林？从夏南！匪适株林，从夏南！\n驾我乘马，说于株野。乘我乘驹，朝食于株！",
        pinyin: "hú wèi hū zhū lín？ cóng xià nán！ fěi shì zhū lín， cóng xià nán！\njià wǒ chéng mǎ， shuō yú zhū yě。 chéng wǒ chéng jū， cháo shí yú zhū！",
        translation: "他为什么去株林？说是去找夏南！可哪里真是去株林，是去找夏南家呀。驾着四匹马拉的大车，在株野停下来歇脚，再换上小马车，一早赶到株邑去了。",
      }
      ],
    },
    {
      title: "泽陂 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《泽陂》意境插画：彼泽之陂，有蒲与荷。有美一人，伤如之何？寤寐无为，涕泗滂沱。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "彼泽之陂，有蒲与荷。有美一人，伤如之何？寤寐无为，涕泗滂沱。\n彼泽之陂，有蒲与蕳。有美一人，硕大且卷。寤寐无为，中心悁悁。\n彼泽之陂，有蒲菡萏。有美一人，硕大且俨。寤寐无为，辗转伏枕。",
        pinyin: "bǐ zé zhī bēi， yǒu pú yǔ hé。 yǒu měi yī rén， shāng rú zhī hé？ wù mèi wú wéi， tì sì pāng tuó。\nbǐ zé zhī bēi， yǒu pú yǔ jiān。 yǒu měi yī rén， shuò dà qiě juàn。 wù mèi wú wéi， zhōng xīn yuān yuān。\nbǐ zé zhī bēi， yǒu pú hàn dàn。 yǒu měi yī rén， shuò dà qiě yǎn。 wù mèi wú wéi， niǎn zhuǎn fú zhěn。",
        translation: "池塘的岸边，长着蒲草和荷花。那儿有个美丽的人儿，害得我日夜想念怎么办？觉也睡不好，眼泪哗哗地往下流。",
      }
      ],
    },
    {
      title: "羔裘 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《羔裘》意境插画：羔裘逍遥，狐裘以朝。岂不尔思？劳心忉忉。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "羔裘逍遥，狐裘以朝。岂不尔思？劳心忉忉。\n羔裘翱翔，狐裘在堂。岂不尔思？我心忧伤。\n羔裘如膏，日出有曜。岂不尔思？中心是悼。",
        pinyin: "gāo qiú xiāo yáo， hú qiú yǐ cháo。 qǐ bù ěr sī？ láo xīn dāo dāo。\ngāo qiú áo xiáng， hú qiú zài táng。 qǐ bù ěr sī？ wǒ xīn yōu shāng。\ngāo qiú rú gāo， rì chū yǒu yào。 qǐ bù ěr sī？ zhōng xīn shì dào。",
        translation: "你穿着白羔皮袍到处游逛，又穿狐皮袍上朝去。难道我不想念你吗？想你想到心里发愁。你那油亮亮的羔皮袍在太阳底下闪光，我一心想着你，心里却满是悲伤。",
      }
      ],
    },
    {
      title: "素冠 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《素冠》意境插画：庶见素冠兮，棘人栾栾兮。劳心慱慱兮。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "庶见素冠兮，棘人栾栾兮。劳心慱慱兮。\n庶见素衣兮，我心伤悲兮。聊与子同归兮。\n庶见素韠兮，我心蕴结兮。聊与子如一兮。",
        pinyin: "shù jiàn sù guān xī， jí rén luán luán xī。 láo xīn tuán tuán xī。\nshù jiàn sù yī xī， wǒ xīn shāng bēi xī。 liáo yǔ zǐ tóng guī xī。\nshù jiàn sù bì xī， wǒ xīn yùn jié xī。 liáo yǔ zǐ rú yī xī。",
        translation: "真希望见到那戴白帽的人，他守孝守得又瘦又憔悴，我心里为他忧愁难过。见到他穿一身白衣裳，我心中悲伤，愿意和他同去同归、心连着心。",
      }
      ],
    },
    {
      title: "隰有苌楚 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《隰有苌楚》意境插画：隰有苌楚，猗傩其枝，夭之沃沃，乐子之无知。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "隰有苌楚，猗傩其枝，夭之沃沃，乐子之无知。\n隰有苌楚，猗傩其华，夭之沃沃。乐子之无家。\n隰有苌楚，猗傩其实，夭之沃沃。乐子之无室。",
        pinyin: "xí yǒu cháng chǔ， yī nuó qí zhī， yāo zhī wò wò， lè zi zhī wú zhī。\nxí yǒu cháng chǔ， yī nuó qí huá， yāo zhī wò wò。 lè zi zhī wú jiā。\nxí yǒu cháng chǔ， yī nuó qí shí， yāo zhī wò wò。 lè zi zhī wú shì。",
        translation: "低湿的地上长着猕猴桃藤，柔美的枝条随风摇曳，叶儿花儿果实都水灵灵的。真羡慕你呀，没有心事，没有烦恼；真羡慕你呀，无家无室，没有牵挂。",
      }
      ],
    },
    {
      title: "匪风 · 佚名",
      art: "cloud-flight",
      artPrompt: "古诗《匪风》意境插画：匪风发兮，匪车偈兮。顾瞻周道，中心怛兮。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "匪风发兮，匪车偈兮。顾瞻周道，中心怛兮。\n匪风飘兮，匪车嘌兮。顾瞻周道，中心吊兮。\n谁能亨鱼？溉之釜鬵。谁将西归？怀之好音。",
        pinyin: "fěi fēng fā xī， fěi chē jì xī。 gù zhān zhōu dào， zhōng xīn dá xī。\nfěi fēng piāo xī， fěi chē piào xī。 gù zhān zhōu dào， zhōng xīn diào xī。\nshuí néng hēng yú？ gài zhī fǔ xín。 shuí jiāng xī guī？ huái zhī hǎo yīn。",
        translation: "风儿刮得呼呼响，车儿跑得急匆匆。回头望望那条大道，心里一阵发慌难过。谁能煮鱼？我愿意替他洗锅；谁要回西边老家去？请替我捎个平安的好消息。",
      }
      ],
    },
    {
      title: "蜉蝣 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《蜉蝣》意境插画：蜉蝣之羽，衣裳楚楚。心之忧矣，于我归处。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "蜉蝣之羽，衣裳楚楚。心之忧矣，于我归处。\n蜉蝣之翼，采采衣服。心之忧矣，于我归息。\n蜉蝣掘阅，麻衣如雪。心之忧矣，于我归说。",
        pinyin: "fú yóu zhī yǔ， yī shang chǔ chǔ。 xīn zhī yōu yǐ， yú wǒ guī chù。\nfú yóu zhī yì， cǎi cǎi yī fu。 xīn zhī yōu yǐ， yú wǒ guī xī。\nfú yóu jué yuè， má yī rú xuě。 xīn zhī yōu yǐ， yú wǒ guī shuō。",
        translation: "蜉蝣的翅膀又薄又亮，像穿着崭新的漂亮衣裳。可是它活不了多久呀，我心里不禁难过起来：我最终的归宿又在哪里呢？",
      }
      ],
    },
    {
      title: "候人 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《候人》意境插画：彼候人兮，何戈与祋。彼其之子，三百赤芾。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "彼候人兮，何戈与祋。彼其之子，三百赤芾。\n维鹈在梁，不濡其翼。彼其之子，不称其服。\n维鹈在梁，不濡其咮。彼其之子，不遂其媾。\n荟兮蔚兮，南山朝𬯀。婉兮娈兮，季女斯饥。",
        pinyin: "bǐ hòu rén xī， hé gē yǔ duì。 bǐ qí zhī zǐ， sān bǎi chì fèi。\nwéi tí zài liáng， bù rú qí yì。 bǐ qí zhī zǐ， bù chēng qí fú。\nwéi tí zài liáng， bù rú qí zhòu。 bǐ qí zhī zǐ， bù suì qí gòu。\nhuì xī wèi xī， nán shān cháo jī。 wǎn xī luán xī， jì nǚ sī jī。",
        translation: "那个在路口迎送宾客的小官，肩上扛着长戈和棍子；而那些穿红色官服的大官，竟有三百个之多。鹈鹕蹲在鱼坝上，翅膀都不用沾湿就有鱼吃；那些人穿着不称职的官服，白白享着俸禄。云霞聚在南山上，可怜的小姑娘还在挨饿呢。",
      }
      ],
    },
    {
      title: "鸤鸠 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《鸤鸠》意境插画：鸤鸠在桑，其子七兮。淑人君子，其仪一兮。其仪一兮，心如结兮。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "鸤鸠在桑，其子七兮。淑人君子，其仪一兮。其仪一兮，心如结兮。\n鸤鸠在桑，其子在梅。淑人君子，其带伊丝。其带伊丝，其弁伊骐。\n鸤鸠在桑，其子在棘。淑人君子，其仪不忒。其仪不忒，正是四国。\n鸤鸠在桑，其子在榛。淑人君子，正是国人，正是国人。胡不万年？",
        pinyin: "shī jiū zài sāng， qí zǐ qī xī。 shū rén jūn zǐ， qí yí yī xī。 qí yí yī xī， xīn rú jié xī。\nshī jiū zài sāng， qí zǐ zài méi。 shū rén jūn zǐ， qí dài yī sī。 qí dài yī sī， qí biàn yī qí。\nshī jiū zài sāng， qí zǐ zài jí。 shū rén jūn zǐ， qí yí bù tè。 qí yí bù tè， zhèng shì sì guó。\nshī jiū zài sāng， qí zǐ zài zhēn。 shū rén jūn zǐ， zhèng shì guó rén， zhèng shì guó rén。 hú bù wàn nián？",
        translation: "布谷鸟在桑树上，它的雏鸟有七只。那位善良的君子，仪容举止始终如一，心像打成了结一样坚定。他立身端正，成为四方各国的榜样，人们祝愿他享寿万年。",
      }
      ],
    },
    {
      title: "下泉 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《下泉》意境插画：冽彼下泉，浸彼苞稂。忾我寤叹，念彼周京。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "冽彼下泉，浸彼苞稂。忾我寤叹，念彼周京。\n冽彼下泉，浸彼苞萧。忾我寤叹，念彼京周。\n冽彼下泉，浸彼苞蓍。忾我寤叹，念彼京师。\n芃芃黍苗，阴雨膏之。四国有王，郇伯劳之。",
        pinyin: "liè bǐ xià quán， jìn bǐ bāo láng。 kài wǒ wù tàn， niàn bǐ zhōu jīng。\nliè bǐ xià quán， jìn bǐ bāo xiāo。 kài wǒ wù tàn， niàn bǐ jīng zhōu。\nliè bǐ xià quán， jìn bǐ bāo shī。 kài wǒ wù tàn， niàn bǐ jīng shī。\npéng péng shǔ miáo， yīn yǔ gāo zhī。 sì guó yǒu wáng， huán bó láo zhī。",
        translation: "冰凉的泉水往下流，浸湿了丛丛野草。我醒来长声叹息，想念着那周朝的京城。茂盛的黍苗靠阴雨来滋润，四方诸侯有王可奉，全靠郇伯辛勤操劳。",
      }
      ],
    },
    {
      title: "七月 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《七月》意境插画：七月流火，九月授衣。一之日觱发，二之日栗烈。无衣无褐，何以卒岁？——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "七月流火，九月授衣。一之日觱发，二之日栗烈。无衣无褐，何以卒岁？\n三之日于耜，四之日举趾。同我妇子，馌彼南亩。田畯至喜。\n七月流火，九月授衣。春日载阳，有鸣仓庚。女执懿筐，遵彼微行，爰求柔桑。\n春日迟迟，采蘩祁祁。女心伤悲，殆及公子同归。\n七月流火，八月萑苇。蚕月条桑，取彼斧斨。以伐远扬，猗彼女桑。\n七月鸣鵙，八月载绩。载玄载黄，我朱孔阳，为公子裳。\n四月秀葽，五月鸣蜩。八月其获，十月陨萚。一之日于貉，取彼狐狸，为公子裘。\n二之日其同，载缵武功。言私其豵，献豜于公。\n五月斯螽动股，六月莎鸡振羽。七月在野，八月在宇，九月在户，十月蟋蟀，入我床下。\n穹窒熏鼠，塞向墐户。嗟我妇子，曰为改岁，入此室处。\n六月食郁及薁，七月亨葵及菽。八月剥枣，十月获稻。为此春酒，以介眉寿。\n七月食瓜，八月断壶，九月叔苴，采荼薪樗。食我农夫。\n九月筑场圃，十月纳禾稼。黍稷重穋，禾麻菽麦。嗟我农夫，我稼既同，上入执宫功。\n昼尔于茅，宵尔索绹，亟其乘屋，其始播百谷。\n二之日凿冰冲冲，三之日纳于凌阴。四之日其蚤，献羔祭韭。九月肃霜，十月涤场。\n朋酒斯飨，曰杀羔羊，跻彼公堂。称彼兕觥：万寿无疆！",
        pinyin: "qī yuè liú huǒ， jiǔ yuè shòu yī。 yī zhī rì bì fā， èr zhī rì lì liè。 wú yī wú hè， hé yǐ zú suì？\nsān zhī rì yú sì， sì zhī rì jǔ zhǐ。 tóng wǒ fù zǐ， yè bǐ nán mǔ。 tián jùn zhì xǐ。\nqī yuè liú huǒ， jiǔ yuè shòu yī。 chūn rì zǎi yáng， yǒu míng cāng gēng。 nǚ zhí yì kuāng， zūn bǐ wēi xíng， yuán qiú róu sāng。\nchūn rì chí chí， cǎi fán qí qí。 nǚ xīn shāng bēi， dài jí gōng zǐ tóng guī。\nqī yuè liú huǒ， bā yuè huán wěi。 cán yuè tiáo sāng， qǔ bǐ fǔ qiāng。 yǐ fá yuǎn yáng， yī bǐ nǚ sāng。\nqī yuè míng jú， bā yuè zǎi jì。 zǎi xuán zǎi huáng， wǒ zhū kǒng yáng， wèi gōng zǐ shang。\nsì yuè xiù yāo， wǔ yuè míng tiáo。 bā yuè qí huò， shí yuè yǔn tuò。 yī zhī rì yú mò， qǔ bǐ hú li， wèi gōng zǐ qiú。\nèr zhī rì qí tóng， zǎi zuǎn wǔ gōng。 yán sī qí zōng， xiàn jiān yú gōng。\nwǔ yuè sī zhōng dòng gǔ， liù yuè shā jī zhèn yǔ。 qī yuè zài yě， bā yuè zài yǔ， jiǔ yuè zài hù， shí yuè xī shuài， rù wǒ chuáng xià。\nqióng zhì xūn shǔ， sāi xiàng jìn hù。 jiē wǒ fù zǐ， yuē wèi gǎi suì， rù cǐ shì chù。\nliù yuè shí yù jí yù， qī yuè hēng kuí jí shū。 bā yuè bāo zǎo， shí yuè huò dào。 wèi cǐ chūn jiǔ， yǐ jiè méi shòu。\nqī yuè shí guā， bā yuè duàn hú， jiǔ yuè shū jū， cǎi tú xīn chū。 shí wǒ nóng fū。\njiǔ yuè zhù chǎng pǔ， shí yuè nà hé jià。 shǔ jì zhòng lù， hé má shū mài。 jiē wǒ nóng fū， wǒ jià jì tóng， shàng rù zhí gōng gōng。\nzhòu ěr yú máo， xiāo ěr suǒ táo， jí qí chéng wū， qí shǐ bō bǎi gǔ。\nèr zhī rì záo bīng chōng chōng， sān zhī rì nà yú líng yīn。 sì zhī rì qí zǎo， xiàn gāo jì jiǔ。 jiǔ yuè sù shuāng， shí yuè dí chǎng。\npéng jiǔ sī xiǎng， yuē shā gāo yáng， jī bǐ gōng táng。 chēng bǐ sì gōng： wàn shòu wú jiāng！",
        translation: "七月火星向西落，九月就该发放冬衣了。农民们一年到头忙个不停：春天耕地下种，采桑养蚕、纺线织布，秋天收庄稼、打枣子、酿春酒，冬天打猎、凿冰、修屋子，还得去给公家干活。到了年终，大家聚在一起宰羊设宴，举起酒杯祝愿：万寿无疆！",
      }
      ],
    },
    {
      title: "鸱鸮 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《鸱鸮》意境插画：鸱鸮鸱鸮，既取我子，无毁我室。恩斯勤斯，鬻子之闵斯。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "鸱鸮鸱鸮，既取我子，无毁我室。恩斯勤斯，鬻子之闵斯。\n迨天之未阴雨，彻彼桑土，绸缪牖户。今女下民，或敢侮予？\n予手拮据，予所捋荼。予所蓄租，予口卒瘏，曰予未有室家。\n予羽谯谯，予尾翛翛，予室翘翘。风雨所漂摇，予维音哓哓！",
        pinyin: "chī xiāo chī xiāo， jì qǔ wǒ zǐ， wú huǐ wǒ shì。 ēn sī qín sī， yù zǐ zhī mǐn sī。\ndài tiān zhī wèi yīn yǔ， chè bǐ sāng tǔ， chóu móu yǒu hù。 jīn nǚ xià mín， huò gǎn wǔ yǔ？\nyǔ shǒu jié jù， yǔ suǒ lǚ tú。 yǔ suǒ xù zū， yǔ kǒu zú tú， yuē yǔ wèi yǒu shì jiā。\nyǔ yǔ qiáo qiáo， yǔ wěi xiāo xiāo， yǔ shì qiào qiào。 fēng yǔ suǒ piāo yáo， yǔ wéi yīn xiāo xiāo！",
        translation: "猫头鹰啊猫头鹰，你已经夺走了我的小鸟，别再毁坏我的窝啦。趁着天还没下雨，我剥来桑树根上的皮，把门窗缠得紧紧的。我的手累得发麻，嘴也磨破了，羽毛枯焦，窝还在风雨里摇晃，我吓得吱吱乱叫。",
      }
      ],
    },
    {
      title: "东山 · 佚名",
      art: "sunrise-hills",
      artPrompt: "古诗《东山》意境插画：我徂东山，慆慆不归。我来自东，零雨其蒙。我东曰归，我心西悲。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "我徂东山，慆慆不归。我来自东，零雨其蒙。我东曰归，我心西悲。\n制彼裳衣，勿士行枚。蜎蜎者蠋，烝在桑野。敦彼独宿，亦在车下。\n我徂东山，慆慆不归。我来自东，零雨其蒙。果臝之实，亦施于宇。\n伊威在室，蟏蛸在户。町畽鹿场，熠耀宵行。不可畏也，伊可怀也。\n我徂东山，慆慆不归。我来自东，零雨其蒙。鹳鸣于垤，妇叹于室。\n洒扫穹窒，我征聿至。有敦瓜苦，烝在栗薪。自我不见，于今三年。\n我徂东山，慆慆不归。我来自东，零雨其蒙。仓庚于飞，熠耀其羽。\n之子于归，皇驳其马。亲结其缡，九十其仪。其新孔嘉，其旧如之何？",
        pinyin: "wǒ cú dōng shān， tāo tāo bù guī。 wǒ lái zì dōng， líng yǔ qí méng。 wǒ dōng yuē guī， wǒ xīn xī bēi。\nzhì bǐ shang yī， wù shì xíng méi。 yuān yuān zhě zhú， zhēng zài sāng yě。 dūn bǐ dú sù， yì zài chē xià。\nwǒ cú dōng shān， tāo tāo bù guī。 wǒ lái zì dōng， líng yǔ qí méng。 guǒ luǒ zhī shí， yì shī yú yǔ。\nyī wēi zài shì， xiāo shāo zài hù。 tǐng tuǎn lù chǎng， yì yào xiāo xíng。 bù kě wèi yě， yī kě huái yě。\nwǒ cú dōng shān， tāo tāo bù guī。 wǒ lái zì dōng， líng yǔ qí méng。 guàn míng yú dié， fù tàn yú shì。\nsǎ sǎo qióng zhì， wǒ zhēng yù zhì。 yǒu dūn guā kǔ， zhēng zài lì xīn。 zì wǒ bù jiàn， yú jīn sān nián。\nwǒ cú dōng shān， tāo tāo bù guī。 wǒ lái zì dōng， líng yǔ qí méng。 cāng gēng yú fēi， yì yào qí yǔ。\nzhī zǐ yú guī， huáng bó qí mǎ。 qīn jié qí lí， jiǔ shí qí yí。 qí xīn kǒng jiā， qí jiù rú zhī hé？",
        translation: "我到东山去出征，好久好久没回家，如今从东边回来，天上飘着蒙蒙细雨。想象家里院子爬满了野瓜藤，屋里藏着虫子，门口结着蜘蛛网，可那毕竟是让人想念的家。妻子听见我要回来，忙着打扫屋子；想起当年新婚的热闹，如今分别三年，重逢不知会怎样。",
      }
      ],
    },
    {
      title: "破斧 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《破斧》意境插画：既破我斧，又缺我斨。周公东征，四国是皇。哀我人斯，亦孔之将。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "既破我斧，又缺我斨。周公东征，四国是皇。哀我人斯，亦孔之将。\n既破我斧，又缺我锜。周公东征，四国是遒。哀我人斯，亦孔之嘉。\n既破我斧，又缺我𨱇。周公东征，四国是遒。哀我人斯，亦孔之休。",
        pinyin: "jì pò wǒ fǔ， yòu quē wǒ qiāng。 zhōu gōng dōng zhēng， sì guó shì huáng。 āi wǒ rén sī， yì kǒng zhī jiāng。\njì pò wǒ fǔ， yòu quē wǒ qí。 zhōu gōng dōng zhēng， sì guó shì qiú。 āi wǒ rén sī， yì kǒng zhī jiā。\njì pò wǒ fǔ， yòu quē wǒ qiú。 zhōu gōng dōng zhēng， sì guó shì qiú。 āi wǒ rén sī， yì kǒng zhī xiū。",
        translation: "我的斧头砍破了，我的锛子也砍出了缺口，跟着周公东征，四方各国都得到了整顿。可怜我们这些人，如今能平安归来，这真是莫大的幸运啊。",
      }
      ],
    },
    {
      title: "伐柯 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《伐柯》意境插画：伐柯如何？匪斧不克。取妻如何？匪媒不得。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "伐柯如何？匪斧不克。取妻如何？匪媒不得。\n伐柯伐柯，其则不远。我觏之子，笾豆有践。",
        pinyin: "fá kē rú hé？ fěi fǔ bù kè。 qǔ qī rú hé？ fěi méi bù dé。\nfá kē fá kē， qí zé bù yuǎn。 wǒ gòu zhī zǐ， biān dòu yǒu jiàn。",
        translation: "要砍一根斧柄怎么办？没有斧头可不行；要娶一位妻子怎么办？没有媒人可不成。砍斧柄照着手里旧斧柄的样子砍，榜样就在眼前；我遇到了那位中意的人，摆好食器，热热闹闹地招待他。",
      }
      ],
    },
    {
      title: "九罭 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《九罭》意境插画：九罭之鱼，鳟鲂。我觏之子，衮衣绣裳。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "九罭之鱼，鳟鲂。我觏之子，衮衣绣裳。\n鸿飞遵渚，公归无所，于女信处。鸿飞遵六，公归不复，于女信宿。\n是以有衮衣兮，无以我公归兮，无使我心悲兮。",
        pinyin: "jiǔ yù zhī yú， zūn fáng。 wǒ gòu zhī zǐ， gǔn yī xiù shang。\nhóng fēi zūn zhǔ， gōng guī wú suǒ， yú nǚ xìn chù。 hóng fēi zūn liù， gōng guī bù fù， yú nǚ xìn sù。\nshì yǐ yǒu gǔn yī xī， wú yǐ wǒ gōng guī xī， wú shǐ wǒ xīn bēi xī。",
        translation: "细密的渔网里捕到鳟鱼和鲂鱼，我遇见了那位贵人，他穿着绣花的礼服。大雁沿着水边飞，您要是回不去，就在这里再住一两夜吧。我们留下您的礼服，不让您回去，免得我们心里悲伤。",
      }
      ],
    },
    {
      title: "狼跋 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《狼跋》意境插画：狼跋其胡，载疐其尾。公孙硕肤，赤舄几几。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "狼跋其胡，载疐其尾。公孙硕肤，赤舄几几。\n狼疐其尾，载跋其胡。公孙硕肤，德音不瑕？",
        pinyin: "láng bá qí hú， zǎi dì qí wěi。 gōng sūn shuò fū， chì xì jǐ jǐ。\nláng dì qí wěi， zǎi bá qí hú。 gōng sūn shuò fū， dé yīn bù xiá？",
        translation: "老狼往前走，踩着自己的下巴肉，往后退又被尾巴绊住。公孙大人胸宽体胖，穿着红红的鞋子，走得稳稳当当，美好的名声一点儿也没有差错。",
      }
      ],
    },
    {
      title: "鹿鸣 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《鹿鸣》意境插画：呦呦鹿鸣，食野之苹。我有嘉宾，鼓瑟吹笙。吹笙鼓簧，承筐是将。人之好我，示我周行。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "呦呦鹿鸣，食野之苹。我有嘉宾，鼓瑟吹笙。吹笙鼓簧，承筐是将。人之好我，示我周行。\n呦呦鹿鸣，食野之蒿。我有嘉宾，德音孔昭。视民不恌，君子是则是效。我有旨酒，嘉宾式燕以敖。\n呦呦鹿鸣，食野之芩。我有嘉宾，鼓瑟鼓琴。鼓瑟鼓琴，和乐且湛。我有旨酒，以燕乐嘉宾之心。",
        pinyin: "yōu yōu lù míng， shí yě zhī píng。 wǒ yǒu jiā bīn， gǔ sè chuī shēng。 chuī shēng gǔ huáng， chéng kuāng shì jiāng。 rén zhī hǎo wǒ， shì wǒ zhōu xíng。\nyōu yōu lù míng， shí yě zhī hāo。 wǒ yǒu jiā bīn， dé yīn kǒng zhāo。 shì mín bù tiāo， jūn zǐ shì zé shì xiào。 wǒ yǒu zhǐ jiǔ， jiā bīn shì yàn yǐ áo。\nyōu yōu lù míng， shí yě zhī qín。 wǒ yǒu jiā bīn， gǔ sè gǔ qín。 gǔ sè gǔ qín， hé lè qiě zhàn。 wǒ yǒu zhǐ jiǔ， yǐ yàn lè jiā bīn zhī xīn。",
        translation: "鹿儿呦呦欢叫，在野地里吃苹草。我迎来满座嘉宾，弹起瑟、吹起笙来招待。吹笙振动簧片，捧上满筐的礼物，嘉宾们待我真好，给我指点光明大道，大家奏乐饮酒，和和乐乐。",
      }
      ],
    },
    {
      title: "四牡 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《四牡》意境插画：四牡𬴂𬴂，周道倭迟。岂不怀归？王事靡盬，我心伤悲。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "四牡𬴂𬴂，周道倭迟。岂不怀归？王事靡盬，我心伤悲。\n四牡𬴂𬴂，啴啴骆马。岂不怀归？王事靡盬，不遑启处。\n翩翩者鵻，载飞载下，集于苞栩。王事靡盬，不遑将父。\n翩翩者鵻，载飞载止，集于苞杞。王事靡盬，不遑将母。\n驾彼四骆，载骤骎骎。岂不怀归？是用作歌，将母来谂。",
        pinyin: "sì mǔ fēi fēi， zhōu dào wō chí。 qǐ bù huái guī？ wáng shì mí gǔ， wǒ xīn shāng bēi。\nsì mǔ fēi fēi， tān tān luò mǎ。 qǐ bù huái guī？ wáng shì mí gǔ， bù huáng qǐ chǔ。\npiān piān zhě zhuī， zǎi fēi zǎi xià， jí yú bāo xǔ。 wáng shì mí gǔ， bù huáng jiāng fù。\npiān piān zhě zhuī， zǎi fēi zǎi zhǐ， jí yú bāo qǐ。 wáng shì mí gǔ， bù huáng jiāng mǔ。\njià bǐ sì luò， zǎi zhòu qīn qīn。 qǐ bù huái guī？ shì yòng zuò gē， jiāng mǔ lái shěn。",
        translation: "四匹公马跑得急，大路弯弯通向远方。难道不想回家吗？只是国王的差事没完没了，我心里实在悲伤。连奉养父亲母亲的时间都没有，只好写下这首歌，唱出对母亲的思念。",
      }
      ],
    },
    {
      title: "皇皇者华 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《皇皇者华》意境插画：皇皇者华，于彼原隰。𬳽𬳽征夫，每怀靡及。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "皇皇者华，于彼原隰。𬳽𬳽征夫，每怀靡及。\n我马维驹，六辔如濡。载驰载驱，周爰咨诹。\n我马维骐，六辔如丝。载驰载驱，周爰咨谋。\n我马维骆，六辔沃若。载驰载驱，周爰咨度。\n我马维骃，六辔既均。载驰载驱，周爰咨询。",
        pinyin: "huáng huáng zhě huá， yú bǐ yuán xí。 shēn shēn zhēng fū， měi huái mí jí。\nwǒ mǎ wéi jū， liù pèi rú rú。 zǎi chí zǎi qū， zhōu yuán zī zōu。\nwǒ mǎ wéi qí， liù pèi rú sī。 zǎi chí zǎi qū， zhōu yuán zī móu。\nwǒ mǎ wéi luò， liù pèi wò ruò。 zǎi chí zǎi qū， zhōu yuán zī dù。\nwǒ mǎ wéi yīn， liù pèi jì jūn。 zǎi chí zǎi qū， zhōu yuán zī xún。",
        translation: "鲜亮的花朵，开在高原和洼地上。出差的使者骑马奔驰，总怕有办不到的地方。赶着马儿快快跑，到处去访问、请教、商量。",
      }
      ],
    },
    {
      title: "棠棣 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《棠棣》意境插画：棠棣之华，鄂不韡韡。凡今之人，莫如兄弟。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "棠棣之华，鄂不韡韡。凡今之人，莫如兄弟。\n死丧之威，兄弟孔怀。原隰裒矣，兄弟求矣。\n脊令在原，兄弟急难。每有良朋，况也永叹。\n兄弟阋于墙，外御其务。每有良朋，烝也无戎。\n丧乱既平，既安且宁。虽有兄弟，不如友生？\n傧尔笾豆，饮酒之饫。兄弟既具，和乐且孺。\n妻子好合，如鼓瑟琴。兄弟既翕，和乐且湛。\n宜尔室家，乐尔妻帑。是究是图，亶其然乎？",
        pinyin: "táng dì zhī huá， è bù wěi wěi。 fán jīn zhī rén， mò rú xiōng dì。\nsǐ sàng zhī wēi， xiōng dì kǒng huái。 yuán xí póu yǐ， xiōng dì qiú yǐ。\njǐ lìng zài yuán， xiōng dì jí nán。 měi yǒu liáng péng， kuàng yě yǒng tàn。\nxiōng dì xì yú qiáng， wài yù qí wù。 měi yǒu liáng péng， zhēng yě wú róng。\nsāng luàn jì píng， jì ān qiě níng。 suī yǒu xiōng dì， bù rú yǒu shēng？\nbīn ěr biān dòu， yǐn jiǔ zhī yù。 xiōng dì jì jù， hé lè qiě rú。\nqī zǐ hǎo hé， rú gǔ sè qín。 xiōng dì jì xī， hé lè qiě zhàn。\nyí ěr shì jiā， lè ěr qī tǎng。 shì jiū shì tú， dǎn qí rán hū？",
        translation: "棠棣花开得多明艳，如今世上的人，谁也比不上兄弟亲。遇上死丧凶险的事，兄弟最是牵挂；兄弟们平时也会在家里争吵，可外人来欺负时，就会同心抵挡。大家摆好酒菜，兄弟团聚，夫妻和睦像琴瑟合奏，全家和乐，真是幸福啊。",
      }
      ],
    },
    {
      title: "伐木 · 佚名",
      art: "spring-bird",
      artPrompt: "古诗《伐木》意境插画：伐木丁丁，鸟鸣嘤嘤。出自幽谷，迁于乔木。嘤其鸣矣，求其友声。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "伐木丁丁，鸟鸣嘤嘤。出自幽谷，迁于乔木。嘤其鸣矣，求其友声。\n相彼鸟矣，犹求友声。矧伊人矣，不求友生？神之听之，终和且平。\n伐木许许，酾酒有藇！既有肥羜，以速诸父。宁适不来，微我弗顾。\n于粲洒扫，陈馈八簋。既有肥牡，以速诸舅。宁适不来，微我有咎。\n伐木于阪，酾酒有衍。笾豆有践，兄弟无远。民之失德，干糇以愆。\n有酒湑我，无酒酤我。坎坎鼓我，蹲蹲舞我。迨我暇矣，饮此湑矣。",
        pinyin: "fá mù dīng dīng， niǎo míng yīng yīng。 chū zì yōu gǔ， qiān yú qiáo mù。 yīng qí míng yǐ， qiú qí yǒu shēng。\nxiāng bǐ niǎo yǐ， yóu qiú yǒu shēng。 shěn yī rén yǐ， bù qiú yǒu shēng？ shén zhī tīng zhī， zhōng hé qiě píng。\nfá mù xǔ xǔ， shāi jiǔ yǒu yù！ jì yǒu féi zhù， yǐ sù zhū fù。 níng shì bù lái， wēi wǒ fú gù。\nyú càn sǎ sǎo， chén kuì bā guǐ。 jì yǒu féi mǔ， yǐ sù zhū jiù。 níng shì bù lái， wēi wǒ yǒu jiù。\nfá mù yú bǎn， shāi jiǔ yǒu yǎn。 biān dòu yǒu jiàn， xiōng dì wú yuǎn。 mín zhī shī dé， gān hóu yǐ qiān。\nyǒu jiǔ xǔ wǒ， wú jiǔ gū wǒ。 kǎn kǎn gǔ wǒ， dūn dūn wǔ wǒ。 dài wǒ xiá yǐ， yǐn cǐ xǔ yǐ。",
        translation: "砍树咚咚响，鸟儿嘤嘤叫，鸟儿从深谷飞出，迁到高高的树上，还鸣叫着寻找同伴。鸟儿尚且知道找朋友，人怎么能不交朋友呢？洒扫屋子摆好酒饭，请亲友们快来；有酒就斟上，没酒就去买，敲起鼓、跳起舞，趁大家有空，一起畅饮欢聚。",
      }
      ],
    },
    {
      title: "天保 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《天保》意境插画：天保定尔，亦孔之固。俾尔单厚，何福不除？俾尔多益，以莫不庶。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "天保定尔，亦孔之固。俾尔单厚，何福不除？俾尔多益，以莫不庶。\n天保定尔，俾尔戬谷。罄无不宜，受天百禄。降尔遐福，维日不足。\n天保定尔，以莫不兴。如山如阜，如冈如陵，如川之方至，以莫不增。\n吉蠲为饎，是用孝享。禴祠烝尝，于公先王。君曰：卜尔，万寿无疆。\n神之吊矣，诒尔多福。民之质矣，日用饮食。群黎百姓，遍为尔德。\n如月之恒，如日之升。如南山之寿，不骞不崩。如松柏之茂，无不尔或承。",
        pinyin: "tiān bǎo dìng ěr， yì kǒng zhī gù。 bǐ ěr dān hòu， hé fú bù chú？ bǐ ěr duō yì， yǐ mò bù shù。\ntiān bǎo dìng ěr， bǐ ěr jiǎn gǔ。 qìng wú bù yí， shòu tiān bǎi lù。 jiàng ěr xiá fú， wéi rì bù zú。\ntiān bǎo dìng ěr， yǐ mò bù xīng。 rú shān rú fù， rú gāng rú líng， rú chuān zhī fāng zhì， yǐ mò bù zēng。\njí juān wèi xī， shì yòng xiào xiǎng。 yuè cí zhēng cháng， yú gōng xiān wáng。 jūn yuē： bǔ ěr， wàn shòu wú jiāng。\nshén zhī diào yǐ， yí ěr duō fú。 mín zhī zhì yǐ， rì yòng yǐn shí。 qún lí bǎi xìng， biàn wèi ěr dé。\nrú yuè zhī héng， rú rì zhī shēng。 rú nán shān zhī shòu， bù qiān bù bēng。 rú sōng bǎi zhī mào， wú bù ěr huò chéng。",
        translation: "上天保佑你，安又牢，什么福气都送到。愿你像山冈丘陵那样安稳，像江河之水一样源源增多；像月亮渐渐圆满，像太阳步步升起，像南山那样长寿，像松柏那样常青，福泽代代传下去。",
      }
      ],
    },
    {
      title: "采薇 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《采薇》意境插画：采薇采薇，薇亦作止。曰归曰归，岁亦莫止。靡室靡家，玁狁之故。不遑启居，玁狁之故。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "采薇采薇，薇亦作止。曰归曰归，岁亦莫止。靡室靡家，玁狁之故。不遑启居，玁狁之故。\n采薇采薇，薇亦柔止。曰归曰归，心亦忧止。忧心烈烈，载饥载渴。我戍未定，靡使归聘。\n采薇采薇，薇亦刚止。曰归曰归，岁亦阳止。王事靡盬，不遑启处。忧心孔疚，我行不来！\n彼尔维何？维常之华。彼路斯何？君子之车。戎车既驾，四牡业业。岂敢定居？一月三捷。\n驾彼四牡，四牡骙骙。君子所依，小人所腓。四牡翼翼，象弭鱼服。岂不日戒？玁狁孔棘！\n昔我往矣，杨柳依依。今我来思，雨雪霏霏。行道迟迟，载渴载饥。我心伤悲，莫知我哀！",
        pinyin: "cǎi wēi cǎi wēi， wēi yì zuò zhǐ。 yuē guī yuē guī， suì yì mò zhǐ。 mí shì mí jiā， xiǎn yǔn zhī gù。 bù huáng qǐ jū， xiǎn yǔn zhī gù。\ncǎi wēi cǎi wēi， wēi yì róu zhǐ。 yuē guī yuē guī， xīn yì yōu zhǐ。 yōu xīn liè liè， zǎi jī zǎi kě。 wǒ shù wèi dìng， mí shǐ guī pìn。\ncǎi wēi cǎi wēi， wēi yì gāng zhǐ。 yuē guī yuē guī， suì yì yáng zhǐ。 wáng shì mí gǔ， bù huáng qǐ chǔ。 yōu xīn kǒng jiù， wǒ xíng bù lái！\nbǐ ěr wéi hé？ wéi cháng zhī huá。 bǐ lù sī hé？ jūn zǐ zhī chē。 róng chē jì jià， sì mǔ yè yè。 qǐ gǎn dìng jū？ yī yuè sān jié。\njià bǐ sì mǔ， sì mǔ kuí kuí。 jūn zǐ suǒ yī， xiǎo rén suǒ féi。 sì mǔ yì yì， xiàng mǐ yú fú。 qǐ bù rì jiè？ xiǎn yǔn kǒng jí！\nxī wǒ wǎng yǐ， yáng liǔ yī yī。 jīn wǒ lái sī， yǔ xuě fēi fēi。 háng dào chí chí， zǎi kě zǎi jī。 wǒ xīn shāng bēi， mò zhī wǒ āi！",
        translation: "采薇菜呀采薇菜，薇菜从冒芽长到又老又硬，说回家呀说回家，还是回不去，都是为了防御玁狁。当年出征时，杨柳依依随风摆；如今回来时，大雪纷纷满天飞。一路上又渴又饿，我心里悲伤，没有人知道我的哀愁！",
      }
      ],
    },
    {
      title: "出车 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《出车》意境插画：我出我车，于彼牧矣。自天子所，谓我来矣。召彼仆夫，谓之载矣。王事多难，维其棘矣。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "我出我车，于彼牧矣。自天子所，谓我来矣。召彼仆夫，谓之载矣。王事多难，维其棘矣。\n我出我车，于彼郊矣。设此旐矣，建彼旄矣。彼旟旐斯，胡不旆旆？忧心悄悄，仆夫况瘁。\n王命南仲，往城于方。出车彭彭，旗旐央央。天子命我，城彼朔方。赫赫南仲，玁狁于襄。\n昔我往矣，黍稷方华。今我来思，雨雪载途。王事多难，不遑启居。岂不怀归？畏此简书。\n喓喓草虫，趯趯阜螽。未见君子，忧心忡忡。既见君子，我心则降。赫赫南仲，薄伐西戎。\n春日迟迟，卉木萋萋。仓庚喈喈，采蘩祁祁。执讯获丑，薄言还归。赫赫南仲，玁狁于夷。",
        pinyin: "wǒ chū wǒ chē， yú bǐ mù yǐ。 zì tiān zǐ suǒ， wèi wǒ lái yǐ。 zhào bǐ pú fū， wèi zhī zǎi yǐ。 wáng shì duō nán， wéi qí jí yǐ。\nwǒ chū wǒ chē， yú bǐ jiāo yǐ。 shè cǐ zhào yǐ， jiàn bǐ máo yǐ。 bǐ yú zhào sī， hú bù pèi pèi？ yōu xīn qiāo qiāo， pú fū kuàng cuì。\nwáng mìng nán zhòng， wǎng chéng yú fāng。 chū chē péng péng， qí zhào yāng yāng。 tiān zǐ mìng wǒ， chéng bǐ shuò fāng。 hè hè nán zhòng， xiǎn yǔn yú xiāng。\nxī wǒ wǎng yǐ， shǔ jì fāng huá。 jīn wǒ lái sī， yǔ xuě zǎi tú。 wáng shì duō nán， bù huáng qǐ jū。 qǐ bù huái guī？ wèi cǐ jiǎn shū。\nyāo yāo cǎo chóng， yuè yuè fù zhōng。 wèi jiàn jūn zǐ， yōu xīn chōng chōng。 jì jiàn jūn zǐ， wǒ xīn zé jiàng。 hè hè nán zhòng， báo fá xī róng。\nchūn rì chí chí， huì mù qī qī。 cāng gēng jiē jiē， cǎi fán qí qí。 zhí xùn huò chǒu， báo yán hái guī。 hè hè nán zhòng， xiǎn yǔn yú yí。",
        translation: "我驾着战车出发，集合到郊野，军旗高高飘扬。天子命令南仲，到北方去筑城抗敌，威名赫赫的南仲，把玁狁赶跑了。出征时庄稼正开花，回来时大雪铺满路；打了胜仗，春日里草木茂盛，黄鹂欢叫，俘虏了敌人，大家高高兴兴回家乡。",
      }
      ],
    },
    {
      title: "杕杜 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《杕杜》意境插画：有杕之杜，有睆其实。王事靡盬，继嗣我日。日月阳止，女心伤止，征夫遑止。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "有杕之杜，有睆其实。王事靡盬，继嗣我日。日月阳止，女心伤止，征夫遑止。\n有杕之杜，其叶萋萋。王事靡盬，我心伤悲。卉木萋止，女心悲止，征夫归止！\n陟彼北山，言采其杞。王事靡盬，忧我父母。檀车幝幝，四牡痯痯，征夫不远！\n匪载匪来，忧心孔疚。斯逝不至，而多为恤。卜筮偕止，会言近止，征夫迩止！",
        pinyin: "yǒu dì zhī dù， yǒu huàn qí shí。 wáng shì mí gǔ， jì sì wǒ rì。 rì yuè yáng zhǐ， nǚ xīn shāng zhǐ， zhēng fū huáng zhǐ。\nyǒu dì zhī dù， qí yè qī qī。 wáng shì mí gǔ， wǒ xīn shāng bēi。 huì mù qī zhǐ， nǚ xīn bēi zhǐ， zhēng fū guī zhǐ！\nzhì bǐ běi shān， yán cǎi qí qǐ。 wáng shì mí gǔ， yōu wǒ fù mǔ。 tán chē chǎn chǎn， sì mǔ guǎn guǎn， zhēng fū bù yuǎn！\nfěi zǎi fěi lái， yōu xīn kǒng jiù。 sī shì bù zhì， ér duō wèi xù。 bǔ shì xié zhǐ， huì yán jìn zhǐ， zhēng fū ěr zhǐ！",
        translation: "一株孤零零的杜树，结着圆亮亮的果子。官家的差事没完没了，妻子的心里悲伤，盼着出征的人能回家。登上北山去采枸杞，心里惦记着父母；占卜又问卦，都说人快到了，出征的人果然离家不远啦！",
      }
      ],
    },
    {
      title: "鱼丽 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《鱼丽》意境插画：鱼丽于罶，鲿鲨。君子有酒，旨且多。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "鱼丽于罶，鲿鲨。君子有酒，旨且多。\n鱼丽于罶，鲂鳢。君子有酒，多且旨。\n鱼丽于罶，鰋鲤。君子有酒，旨且有。物其多矣，\n维其嘉矣！物其旨矣，维其偕矣！物其有矣，维其时矣！",
        pinyin: "yú lì yú liǔ， cháng shā。 jūn zǐ yǒu jiǔ， zhǐ qiě duō。\nyú lì yú liǔ， fáng lǐ。 jūn zǐ yǒu jiǔ， duō qiě zhǐ。\nyú lì yú liǔ， yǎn lǐ。 jūn zǐ yǒu jiǔ， zhǐ qiě yǒu。 wù qí duō yǐ，\nwéi qí jiā yǐ！ wù qí zhǐ yǐ， wéi qí xié yǐ！ wù qí yǒu yǐ， wéi qí shí yǐ！",
        translation: "鱼儿游进竹篓里，有鲿鱼鲨鱼、鲂鱼鳢鱼、鲇鱼鲤鱼。君子备下了美酒，味道又好数量又多。东西这样丰盛，样样都味美，样样都齐全，又赶上了好时节！",
      }
      ],
    },
    {
      title: "南有嘉鱼 · 佚名",
      art: "spring-bird",
      artPrompt: "古诗《南有嘉鱼》意境插画：南有嘉鱼，烝然罩罩。君子有酒，嘉宾式燕以乐。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "南有嘉鱼，烝然罩罩。君子有酒，嘉宾式燕以乐。\n南有嘉鱼，烝然汕汕。君子有酒，嘉宾式燕以衎。\n南有樛木，甘瓠累之。君子有酒，嘉宾式燕绥之。\n翩翩者鵻，烝然来思。君子有酒，嘉宾式燕又思。",
        pinyin: "nán yǒu jiā yú， zhēng rán zhào zhào。 jūn zǐ yǒu jiǔ， jiā bīn shì yàn yǐ lè。\nnán yǒu jiā yú， zhēng rán shàn shàn。 jūn zǐ yǒu jiǔ， jiā bīn shì yàn yǐ kàn。\nnán yǒu jiū mù， gān hù lèi zhī。 jūn zǐ yǒu jiǔ， jiā bīn shì yàn suí zhī。\npiān piān zhě zhuī， zhēng rán lái sī。 jūn zǐ yǒu jiǔ， jiā bīn shì yàn yòu sī。",
        translation: "南方有好鱼，成群地游进鱼罩和鱼网。君子备下美酒，请嘉宾们快乐地宴饮。南边弯弯的树上，缠着香甜的葫芦；翩翩的斑鸠飞来了，嘉宾们又安又乐，喝了一杯又一杯。",
      }
      ],
    },
    {
      title: "南山有台 · 佚名",
      art: "sunrise-hills",
      artPrompt: "古诗《南山有台》意境插画：南山有台，北山有莱。乐只君子，邦家之基。乐只君子，万寿无期。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "南山有台，北山有莱。乐只君子，邦家之基。乐只君子，万寿无期。\n南山有桑，北山有杨。乐只君子，邦家之光。乐只君子，万寿无疆。\n南山有杞，北山有李。乐只君子，民之父母。乐只君子，德音不已。\n南山有栲，北山有杻。乐只君子，遐不眉寿。乐只君子，德音是茂。\n南山有枸，北山有楰。乐只君子，遐不黄耇。乐只君子，保艾尔后。",
        pinyin: "nán shān yǒu tái， běi shān yǒu lái。 lè zhī jūn zǐ， bāng jiā zhī jī。 lè zhī jūn zǐ， wàn shòu wú qī。\nnán shān yǒu sāng， běi shān yǒu yáng。 lè zhī jūn zǐ， bāng jiā zhī guāng。 lè zhī jūn zǐ， wàn shòu wú jiāng。\nnán shān yǒu qǐ， běi shān yǒu lǐ。 lè zhī jūn zǐ， mín zhī fù mǔ。 lè zhī jūn zǐ， dé yīn bù yǐ。\nnán shān yǒu kǎo， běi shān yǒu niǔ。 lè zhī jūn zǐ， xiá bù méi shòu。 lè zhī jūn zǐ， dé yīn shì mào。\nnán shān yǒu gǒu， běi shān yǒu yú。 lè zhī jūn zǐ， xiá bù huáng gǒu。 lè zhī jūn zǐ， bǎo ài ěr hòu。",
        translation: "南山上有莎草，北山上有藜草。快乐的君子，是国家的根基，祝愿您万寿无期。南山有桑北山有杨，君子是国家的光荣，祝您万寿无疆；您像百姓的父母，美好的名声传不完，还庇佑着子孙后代。",
      }
      ],
    },
    {
      title: "蓼萧 · 佚名",
      art: "spring-bird",
      artPrompt: "古诗《蓼萧》意境插画：蓼彼萧斯，零露湑兮。既见君子，我心写兮。燕笑语兮，是以有誉处兮。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "蓼彼萧斯，零露湑兮。既见君子，我心写兮。燕笑语兮，是以有誉处兮。\n蓼彼萧斯，零露瀼瀼。既见君子，为龙为光。其德不爽，寿考不忘。\n蓼彼萧斯，零露泥泥。既见君子，孔燕岂弟。宜兄宜弟，令德寿岂。\n蓼彼萧斯，零露浓浓。既见君子，鞗革忡忡。和鸾雍雍，万福攸同。",
        pinyin: "liǎo bǐ xiāo sī， líng lù xǔ xī。 jì jiàn jūn zǐ， wǒ xīn xiě xī。 yàn xiào yǔ xī， shì yǐ yǒu yù chù xī。\nliǎo bǐ xiāo sī， líng lù ráng ráng。 jì jiàn jūn zǐ， wèi lóng wèi guāng。 qí dé bù shuǎng， shòu kǎo bù wàng。\nliǎo bǐ xiāo sī， líng lù ní ní。 jì jiàn jūn zǐ， kǒng yàn qǐ dì。 yí xiōng yí dì， lìng dé shòu qǐ。\nliǎo bǐ xiāo sī， líng lù nóng nóng。 jì jiàn jūn zǐ， tiáo gé chōng chōng。 hé luán yōng yōng， wàn fú yōu tóng。",
        translation: "高高的艾蒿，沾着圆滚滚的露水。见到了君子，我心里舒畅，又说又笑地宴饮，快乐又光彩。他品德端正不差分毫，长寿的名声不会忘记；兄弟和睦，家和美满，万福一起汇集到他身上。",
      }
      ],
    },
    {
      title: "湛露 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《湛露》意境插画：湛湛露斯，匪阳不晞。厌厌夜饮，不醉无归。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "湛湛露斯，匪阳不晞。厌厌夜饮，不醉无归。\n湛湛露斯，在彼丰草。厌厌夜饮，在宗载考。\n湛湛露斯，在彼杞棘。显允君子，莫不令德。\n其桐其椅，其实离离。岂弟君子，莫不令仪。",
        pinyin: "zhàn zhàn lù sī， fěi yáng bù xī。 yàn yàn yè yǐn， bù zuì wú guī。\nzhàn zhàn lù sī， zài bǐ fēng cǎo。 yàn yàn yè yǐn， zài zōng zǎi kǎo。\nzhàn zhàn lù sī， zài bǐ qǐ jí。 xiǎn yǔn jūn zǐ， mò bù lìng dé。\nqí tóng qí yǐ， qí shí lí lí。 kǎi tì jūn zǐ， mò bù lìng yí。",
        translation: "浓浓的露水，没有太阳晒不干。安安稳稳的夜宴，不醉就不回家。露水落在茂草和枸杞酸枣上，光明磊落的君子，个个品德美好；桐树椅树果实累累，和乐的君子，个个仪态端庄。",
      }
      ],
    },
    {
      title: "彤弓 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《彤弓》意境插画：彤弓弨兮，受言藏之。我有嘉宾，中心贶之。钟鼓既设，一朝飨之。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "彤弓弨兮，受言藏之。我有嘉宾，中心贶之。钟鼓既设，一朝飨之。\n彤弓弨兮，受言载之。我有嘉宾，中心喜之。钟鼓既设，一朝右之。\n彤弓弨兮，受言櫜之。我有嘉宾，中心好之。钟鼓既设，一朝酬之。",
        pinyin: "tóng gōng chāo xī， shòu yán cáng zhī。 wǒ yǒu jiā bīn， zhōng xīn kuàng zhī。 zhōng gǔ jì shè， yī cháo xiǎng zhī。\ntóng gōng chāo xī， shòu yán zǎi zhī。 wǒ yǒu jiā bīn， zhōng xīn xǐ zhī。 zhōng gǔ jì shè， yī cháo yòu zhī。\ntóng gōng chāo xī， shòu yán gāo zhī。 wǒ yǒu jiā bīn， zhōng xīn hǎo zhī。 zhōng gǔ jì shè， yī cháo chóu zhī。",
        translation: "红彤彤的弓弦已放松，您接受后好好收藏。我有尊贵的嘉宾，真心实意地嘉奖他、喜欢他，钟鼓都摆设好，当天就大摆宴席，一次次举杯劝酒。",
      }
      ],
    },
    {
      title: "菁菁者莪 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《菁菁者莪》意境插画：菁菁者莪，在彼中阿。既见君子，乐且有仪。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "菁菁者莪，在彼中阿。既见君子，乐且有仪。\n菁菁者莪，在彼中沚。既见君子，我心则喜。\n菁菁者莪，在彼中陵。既见君子，锡我百朋。\n泛泛杨舟，载沉载浮。既见君子，我心则休。",
        pinyin: "jīng jīng zhě é， zài bǐ zhōng ā。 jì jiàn jūn zǐ， lè qiě yǒu yí。\njīng jīng zhě é， zài bǐ zhōng zhǐ。 jì jiàn jūn zǐ， wǒ xīn zé xǐ。\njīng jīng zhě é， zài bǐ zhōng líng。 jì jiàn jūn zǐ， xī wǒ bǎi péng。\nfàn fàn yáng zhōu， zài chén zài fú。 jì jiàn jūn zǐ， wǒ xīn zé xiū。",
        translation: "茂密的莪蒿，长在半山腰里。见到了那位君子，他快乐又有礼仪。见到君子，我心里欢喜，像得到了许多钱财宝物；又像杨木小舟随水漂荡，心里安安稳稳。",
      }
      ],
    },
    {
      title: "六月 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《六月》意境插画：六月栖栖，戎车既饬。四牡骙骙，载是常服。玁狁孔炽，我是用急。王于出征，以匡王国。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "六月栖栖，戎车既饬。四牡骙骙，载是常服。玁狁孔炽，我是用急。王于出征，以匡王国。\n比物四骊，闲之维则。维此六月，既成我服。我服既成，于三十里。王于出征，以佐天子。\n四牡修广，其大有颙。薄伐玁狁，以奏肤公。有严有翼，共武之服。共武之服，以定王国。\n玁狁匪茹，整居焦获。侵镐及方，至于泾阳。织文鸟章，白旆央央。元戎十乘，以先启行。\n戎车既安，如轾如轩。四牡既佶，既佶且闲。薄伐玁狁，至于大原。文武吉甫，万邦为宪。\n吉甫燕喜，既多受祉。来归自镐，我行永久。饮御诸友，炰鳖脍鲤。侯谁在矣？张仲孝友。",
        pinyin: "liù yuè qī qī， róng chē jì chì。 sì mǔ kuí kuí， zǎi shì cháng fú。 xiǎn yǔn kǒng chì， wǒ shì yòng jí。 wáng yú chū zhēng， yǐ kuāng wáng guó。\nbǐ wù sì lí， xián zhī wéi zé。 wéi cǐ liù yuè， jì chéng wǒ fú。 wǒ fú jì chéng， yú sān shí lǐ。 wáng yú chū zhēng， yǐ zuǒ tiān zǐ。\nsì mǔ xiū guǎng， qí dà yǒu yóng。 báo fá xiǎn yǔn， yǐ zòu fū gōng。 yǒu yán yǒu yì， gòng wǔ zhī fú。 gòng wǔ zhī fú， yǐ dìng wáng guó。\nxiǎn yǔn fěi rú， zhěng jū jiāo huò。 qīn hào jí fāng， zhì yú jīng yáng。 zhī wén niǎo zhāng， bái pèi yāng yāng。 yuán róng shí chéng， yǐ xiān qǐ xíng。\nróng chē jì ān， rú zhì rú xuān。 sì mǔ jì jí， jì jí qiě xián。 báo fá xiǎn yǔn， zhì yú dà yuán。 wén wǔ jí fǔ， wàn bāng wèi xiàn。\njí fǔ yàn xǐ， jì duō shòu zhǐ。 lái guī zì hào， wǒ xíng yǒng jiǔ。 yǐn yù zhū yǒu， fǒu biē kuài lǐ。 hóu shuí zài yǐ？ zhāng zhòng xiào yǒu。",
        translation: "六月里兵车已备好，四匹公马壮又高。玁狁来势凶凶，情况紧急，周王下令出征，保卫王国。战车冲杀，一路追击到大原，文武双全的尹吉甫，是万国的榜样。打了胜仗回来摆酒庆功，请来好友，炖鳖鱼切鲤鱼，孝敬父母、友爱兄弟的张仲也在座。",
      }
      ],
    },
    {
      title: "采芑 · 佚名",
      art: "rice-field",
      artPrompt: "古诗《采芑》意境插画：薄言采芑，于彼新田，呈此菑亩。方叔涖止，其车三千。师干之试，方叔率止。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "薄言采芑，于彼新田，呈此菑亩。方叔涖止，其车三千。师干之试，方叔率止。\n乘其四骐，四骐翼翼。路车有奭，簟茀鱼服，钩膺鞗革。\n薄言采芑，于彼新田，于此中乡。方叔涖止，其车三千。旗旐央央，方叔率止。\n约軧错衡，八鸾玱玱。服其命服，朱芾斯皇，有玱葱珩。\n鴥彼飞隼，其飞戾天，亦集爰止。方叔涖止，其车三千。师干之试，方叔率止。\n钲人伐鼓，陈师鞠旅。显允方叔，伐鼓渊渊，振旅阗阗。\n蠢尔蛮荆，大邦为仇。方叔元老，克壮其犹。方叔率止，执讯获丑。戎车啴啴，\n啴啴焞焞，如霆如雷。显允方叔，征伐玁狁，蛮荆来威。",
        pinyin: "báo yán cǎi qǐ， yú bǐ xīn tián， chéng cǐ zī mǔ。 fāng shū lì zhǐ， qí chē sān qiān。 shī gān zhī shì， fāng shū lǜ zhǐ。\nchéng qí sì qí， sì qí yì yì。 lù chē yǒu shì， diàn fú yú fú， gōu yīng tiáo gé。\nbáo yán cǎi qǐ， yú bǐ xīn tián， yú cǐ zhōng xiāng。 fāng shū lì zhǐ， qí chē sān qiān。 qí zhào yāng yāng， fāng shū lǜ zhǐ。\nyuē dǐ cuò héng， bā luán qiāng qiāng。 fú qí mìng fú， zhū fèi sī huáng， yǒu qiāng cōng héng。\nyù bǐ fēi sǔn， qí fēi lì tiān， yì jí yuán zhǐ。 fāng shū lì zhǐ， qí chē sān qiān。 shī gān zhī shì， fāng shū lǜ zhǐ。\nzhēng rén fá gǔ， chén shī jū lǚ。 xiǎn yǔn fāng shū， fá gǔ yuān yuān， zhèn lǚ tián tián。\nchǔn ěr mán jīng， dà bāng wèi chóu。 fāng shū yuán lǎo， kè zhuàng qí yóu。 fāng shū lǜ zhǐ， zhí xùn huò chǒu。 róng chē tān tān，\ntān tān tūn tūn， rú tíng rú léi。 xiǎn yǔn fāng shū， zhēng fá xiǎn yǔn， mán jīng lái wēi。",
        translation: "在那新开的田里采芑菜，方叔来到军中，他的战车有三千辆，军旗鲜明。他乘着四匹骏马拉的车，穿上天子赐的礼服，艳红蔽膝闪闪发光。军队摆开阵势，击鼓进兵，浩浩荡荡；无知的蛮荆敢和大国作对，方叔年高望重，出征像雷霆万钧，吓得蛮荆都来畏服。",
      }
      ],
    },
    {
      title: "车攻 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《车攻》意境插画：我车既攻，我马既同。四牡庞庞，驾言徂东。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "我车既攻，我马既同。四牡庞庞，驾言徂东。\n田车既好，田牡孔阜。东有甫草，驾言行狩。\n之子于苗，选徒嚣嚣。建旐设旄，搏兽于敖。\n驾彼四牡，四牡奕奕。赤芾金舄，会同有绎。\n决拾既佽，弓矢既调。射夫既同，助我举柴。\n四黄既驾，两骖不猗。不失其驰，舍矢如破。\n萧萧马鸣，悠悠旆旌。徒御不惊，大庖不盈。\n之子于征，有闻无声。允矣君子，展也大成。",
        pinyin: "wǒ chē jì gōng， wǒ mǎ jì tóng。 sì mǔ páng páng， jià yán cú dōng。\ntián chē jì hǎo， tián mǔ kǒng fù。 dōng yǒu fǔ cǎo， jià yán xíng shòu。\nzhī zǐ yú miáo， xuǎn tú áo áo。 jiàn zhào shè máo， bó shòu yú áo。\njià bǐ sì mǔ， sì mǔ yì yì。 chì fèi jīn xì， huì tóng yǒu yì。\njué shí jì cì， gōng shǐ jì tiáo。 shè fū jì tóng， zhù wǒ jǔ chái。\nsì huáng jì jià， liǎng cān bù yī。 bù shī qí chí， shè shǐ rú pò。\nxiāo xiāo mǎ míng， yōu yōu pèi jīng。 tú yù bù jīng， dà páo bù yíng。\nzhī zǐ yú zhēng， yǒu wén wú shēng。 yǔn yǐ jūn zǐ， zhǎn yě dà chéng。",
        translation: "我的猎车已修好，猎马也挑选整齐，驾着车往东边去打猎。猎车好，猎马肥壮，大家竖起旗帜，到敖山去围猎。四匹黄马步子整齐，车跑得不歪不斜，箭射出去没有不中的。马儿萧萧嘶鸣，旌旗悠悠飘动，猎物装满了厨房；君子这样办事，真的大有成就。",
      }
      ],
    },
    {
      title: "吉日 · 佚名",
      art: "rice-field",
      artPrompt: "古诗《吉日》意境插画：吉日维戊，既伯既祷。田车既好，四牡孔阜。升彼大阜，从其群丑。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "吉日维戊，既伯既祷。田车既好，四牡孔阜。升彼大阜，从其群丑。\n吉日庚午，既差我马。兽之所同，麀鹿麌麌。漆沮之从，天子之所。\n瞻彼中原，其祁孔有。儦儦俟俟，或群或友。悉率左右，以燕天子。\n既张我弓，既挟我矢。发彼小豝，殪此大兕。以御宾客，且以酌醴。",
        pinyin: "jí rì wéi wù， jì bó jì dǎo。 tián chē jì hǎo， sì mǔ kǒng fù。 shēng bǐ dà fù， cóng qí qún chǒu。\njí rì gēng wǔ， jì chà wǒ mǎ。 shòu zhī suǒ tóng， yōu lù yǔ yǔ。 qī jǔ zhī cóng， tiān zǐ zhī suǒ。\nzhān bǐ zhōng yuán， qí qí kǒng yǒu。 biāo biāo sì sì， huò qún huò yǒu。 xī lǜ zuǒ yòu， yǐ yàn tiān zǐ。\njì zhāng wǒ gōng， jì xié wǒ shǐ。 fā bǐ xiǎo bā， yì cǐ dà sì。 yǐ yù bīn kè， qiě yǐ zhuó lǐ。",
        translation: "戊日是个好日子，祭了马祖又祈福。猎车备得妥妥当当，四匹马高大肥壮，赶上大土坡，追赶成群的野兽。拉满弓，搭上箭，射倒小野猪和大野牛；拿来招待宾客，还斟上甜甜的美酒。",
      }
      ],
    },
    {
      title: "鸿雁 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《鸿雁》意境插画：鸿雁于飞，肃肃其羽。之子于征，劬劳于野。爰及矜人，哀此鳏寡。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "鸿雁于飞，肃肃其羽。之子于征，劬劳于野。爰及矜人，哀此鳏寡。\n鸿雁于飞，集于中泽。之子于垣，百堵皆作。虽则劬劳，其究安宅？\n鸿雁于飞，哀鸣嗷嗷。维此哲人，谓我劬劳。维彼愚人，谓我宣骄。",
        pinyin: "hóng yàn yú fēi， sù sù qí yǔ。 zhī zǐ yú zhēng， qú láo yú yě。 yuán jí jīn rén， āi cǐ guān guǎ。\nhóng yàn yú fēi， jí yú zhōng zé。 zhī zǐ yú yuán， bǎi dǔ jiē zuò。 suī zé qú láo， qí jiū ān zhái？\nhóng yàn yú fēi， āi míng áo áo。 wéi cǐ zhé rén， wèi wǒ qú láo。 wéi bǐ yú rén， wèi wǒ xuān jiāo。",
        translation: "鸿雁天上飞，翅膀沙沙响。那个人在外奔忙，辛劳在旷野，救济穷苦可怜的人，连无依无靠的孤儿寡母都怜惜。他带着大家筑起百堵墙，让人们辛苦过后有房住；明白的人说他辛苦，糊涂的人却说他是逞强。",
      }
      ],
    },
    {
      title: "庭燎 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《庭燎》意境插画：夜如何其？夜未央，庭燎之光。君子至止，鸾声将将。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "夜如何其？夜未央，庭燎之光。君子至止，鸾声将将。\n夜如何其？夜未艾，庭燎晣晣。君子至止，鸾声哕哕。\n夜如何其？夜乡晨，庭燎有辉。君子至止，言观其旗。",
        pinyin: "yè rú hé qí？ yè wèi yāng， tíng liáo zhī guāng。 jūn zǐ zhì zhǐ， luán shēng jiāng jiāng。\nyè rú hé qí？ yè wèi ài， tíng liáo zhé zhé。 jūn zǐ zhì zhǐ， luán shēng yuě yuě。\nyè rú hé qí？ yè xiāng chén， tíng liáo yǒu huī。 jūn zǐ zhì zhǐ， yán guān qí qí。",
        translation: "夜里到了什么时辰？夜还长着呢，庭前火炬亮堂堂。君子来到了，车上的鸾铃锵锵响。天快亮了，烛光渐渐发白，远远只望见他的旌旗了。",
      }
      ],
    },
    {
      title: "沔水 · 佚名",
      art: "river-boat",
      artPrompt: "古诗《沔水》意境插画：沔彼流水，朝宗于海。鴥彼飞隼，载飞载止。嗟我兄弟，邦人诸友。莫肯念乱，谁无父母？——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "沔彼流水，朝宗于海。鴥彼飞隼，载飞载止。嗟我兄弟，邦人诸友。莫肯念乱，谁无父母？\n沔彼流水，其流汤汤。鴥彼飞隼，载飞载扬。念彼不迹，载起载行。心之忧矣，不可弭忘。\n鴥彼飞隼，率彼中陵。民之讹言，宁莫之惩？我友敬矣，谗言其兴。",
        pinyin: "miǎn bǐ liú shuǐ， cháo zōng yú hǎi。 yù bǐ fēi sǔn， zǎi fēi zǎi zhǐ。 jiē wǒ xiōng dì， bāng rén zhū yǒu。 mò kěn niàn luàn， shuí wú fù mǔ？\nmiǎn bǐ liú shuǐ， qí liú tāng tāng。 yù bǐ fēi sǔn， zǎi fēi zǎi yáng。 niàn bǐ bù jì， zǎi qǐ zǎi xíng。 xīn zhī yōu yǐ， bù kě mǐ wàng。\nyù bǐ fēi sǔn， lǜ bǐ zhōng líng。 mín zhī é yán， níng mò zhī chéng？ wǒ yǒu jìng yǐ， chán yán qí xīng。",
        translation: "满溢的流水，奔向大海。疾飞的鹰隼，飞飞停停。唉，我的兄弟们、同乡和朋友们，没有人肯把乱子放在心上，可谁家没有父母呢？谣言四起没人制止，我的朋友可要当心，谗言就要兴起来了。",
      }
      ],
    },
    {
      title: "鹤鸣 · 佚名",
      art: "goose-pond",
      artPrompt: "古诗《鹤鸣》意境插画：鹤鸣于九皋，声闻于野。鱼潜在渊，或在于渚。乐彼之园，爰有树檀，其下维萚。他山之石，可以为错。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "鹤鸣于九皋，声闻于野。鱼潜在渊，或在于渚。乐彼之园，爰有树檀，其下维萚。他山之石，可以为错。\n鹤鸣于九皋，声闻于天。鱼在于渚，或潜在渊。乐彼之园，爰有树檀，其下维谷。他山之石，可以攻玉。",
        pinyin: "hè míng yú jiǔ gāo， shēng wén yú yě。 yú qián zài yuān， huò zài yú zhǔ。 lè bǐ zhī yuán， yuán yǒu shù tán， qí xià wéi tuò。 tā shān zhī shí， kě yǐ wéi cuò。\nhè míng yú jiǔ gāo， shēng wén yú tiān。 yú zài yú zhǔ， huò qián zài yuān。 lè bǐ zhī yuán， yuán yǒu shù tán， qí xià wéi gǔ。 tā shān zhī shí， kě yǐ gōng yù。",
        translation: "鹤在曲折的水泽里鸣叫，声音传遍了旷野，直传到天上。鱼儿有时潜在深水里，有时游到小洲边。那可爱的园子里长着高高的檀树，别的山上的石头，可以拿来磨玉。",
      }
      ],
    },
    {
      title: "祈父 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《祈父》意境插画：祈父，予王之爪牙。胡转予于恤，靡所止居？——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "祈父，予王之爪牙。胡转予于恤，靡所止居？\n祈父，予王之爪士。胡转予于恤，靡所厎止？\n祈父，亶不聪。胡转予于恤？有母之尸饔。",
        pinyin: "qí fù， yǔ wáng zhī zhǎo yá。 hú zhuǎn yǔ yú xù， mí suǒ zhǐ jū？\nqí fù， yǔ wáng zhī zhuǎ shì。 hú zhuǎn yǔ yú xù， mí suǒ dǐ zhǐ？\nqí fù， dǎn bù cōng。 hú zhuǎn yǔ yú xù？ yǒu mǔ zhī shī yōng。",
        translation: "司马大人呀，我是王的爪牙卫士，为什么把我调来调去，连个安身的住处都没有？司马大人真是没弄明白：把我弄得这样苦，家里还有老母亲等着，谁来给她做饭送饭呢！",
      }
      ],
    },
    {
      title: "白驹 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《白驹》意境插画：皎皎白驹，食我场苗。絷之维之，以永今朝。所谓伊人，于焉逍遥？——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "皎皎白驹，食我场苗。絷之维之，以永今朝。所谓伊人，于焉逍遥？\n皎皎白驹，食我场藿。絷之维之，以永今夕。所谓伊人，于焉嘉客？\n皎皎白驹，贲然来思。尔公尔侯，逸豫无期？慎尔优游，勉尔遁思。\n皎皎白驹，在彼空谷。生刍一束，其人如玉。毋金玉尔音，而有遐心。",
        pinyin: "jiǎo jiǎo bái jū， shí wǒ chǎng miáo。 zhí zhī wéi zhī， yǐ yǒng jīn cháo。 suǒ wèi yī rén， yú yān xiāo yáo？\njiǎo jiǎo bái jū， shí wǒ chǎng huò。 zhí zhī wéi zhī， yǐ yǒng jīn xī。 suǒ wèi yī rén， yú yān jiā kè？\njiǎo jiǎo bái jū， bēn rán lái sī。 ěr gōng ěr hóu， yì yù wú qī？ shèn ěr yōu yóu， miǎn ěr dùn sī。\njiǎo jiǎo bái jū， zài bǐ kōng gǔ。 shēng chú yī shù， qí rén rú yù。 wú jīn yù ěr yīn， ér yǒu xiá xīn。",
        translation: "皎皎的白马，在我菜园里吃豆苗，把它拴住绊住，让这个早晨过得长久些。心里想念的那位客人，正在这儿逍遥做客呢。白马去了空旷的山谷，我割一捆青草喂它，那人的品德像玉一样美。请您别把音信看得像金玉一样贵重，不要疏远我呀。",
      }
      ],
    },
    {
      title: "黄鸟 · 佚名",
      art: "spring-bird",
      artPrompt: "古诗《黄鸟》意境插画：黄鸟黄鸟，无集于谷，无啄我粟。此邦之人，不我肯谷。言旋言归，复我邦族。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "黄鸟黄鸟，无集于谷，无啄我粟。此邦之人，不我肯谷。言旋言归，复我邦族。\n黄鸟黄鸟，无集于桑，无啄我粱。此邦之人，不可与明。言旋言归，复我诸兄。\n黄鸟黄鸟，无集于栩，无啄我黍。此邦之人，不可与处。言旋言归，复我诸父。",
        pinyin: "huáng niǎo huáng niǎo， wú jí yú gǔ， wú zhuó wǒ sù。 cǐ bāng zhī rén， bù wǒ kěn gǔ。 yán xuán yán guī， fù wǒ bāng zú。\nhuáng niǎo huáng niǎo， wú jí yú sāng， wú zhuó wǒ liáng。 cǐ bāng zhī rén， bù kě yǔ míng。 yán xuán yán guī， fù wǒ zhū xiōng。\nhuáng niǎo huáng niǎo， wú jí yú xǔ， wú zhuó wǒ shǔ。 cǐ bāng zhī rén， bù kě yǔ chù。 yán xuán yán guī， fù wǒ zhū fù。",
        translation: "黄鸟黄鸟，别落在楮树上，别啄我的谷子。这个地方的人，不肯善待我，我还是转身回去，回到我的故国族人那里去。别啄我的粱和黍，这里的人没法讲道理、没法相处，我要回去找我的兄弟和父老。",
      }
      ],
    },
    {
      title: "我行其野 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《我行其野》意境插画：我行其野，蔽芾其樗。婚姻之故，言就尔居。尔不我畜，复我邦家。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "我行其野，蔽芾其樗。婚姻之故，言就尔居。尔不我畜，复我邦家。\n我行其野，言采其蓫。婚姻之故，言就尔宿。尔不我畜，言归斯复。\n我行其野，言采其葍。不思旧姻，求尔新特。成不以富，亦祗以异。",
        pinyin: "wǒ xíng qí yě， bì fèi qí chū。 hūn yīn zhī gù， yán jiù ěr jū。 ěr bù wǒ chù， fù wǒ bāng jiā。\nwǒ xíng qí yě， yán cǎi qí zhú。 hūn yīn zhī gù， yán jiù ěr sù。 ěr bù wǒ chù， yán guī sī fù。\nwǒ xíng qí yě， yán cǎi qí fú。 bù sī jiù yīn， qiú ěr xīn tè。 chéng bù yǐ fù， yì zhī yǐ yì。",
        translation: "我走在野地里，臭椿树长着小小的叶子。因为婚姻的缘故，我来投奔你同住；你却不肯收留我，我只好回到老家去。你不念旧日的情分，另寻新欢；并不是人家真比谁都富有，是你自己变了心。",
      }
      ],
    },
    {
      title: "斯干 · 佚名",
      art: "sunrise-hills",
      artPrompt: "古诗《斯干》意境插画：秩秩斯干，幽幽南山。如竹苞矣，如松茂矣。兄及弟矣，式相好矣，无相犹矣。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "秩秩斯干，幽幽南山。如竹苞矣，如松茂矣。兄及弟矣，式相好矣，无相犹矣。\n似续妣祖，筑室百堵，西南其户。爰居爰处，爰笑爰语。\n约之阁阁，椓之橐橐。风雨攸除，鸟鼠攸去，君子攸芋。\n如跂斯翼，如矢斯棘，如鸟斯革，如翚斯飞，君子攸跻。\n殖殖其庭，有觉其楹。哙哙其正，哕哕其冥。君子攸宁。\n下莞上簟，乃安斯寝。乃寝乃兴，乃占我梦。吉梦维何？维熊维罴，维虺维蛇。\n大人占之：维熊维罴，男子之祥；维虺维蛇，女子之祥。\n乃生男子，载寝之床。载衣之裳，载弄之璋。其泣喤喤，朱芾斯皇，室家君王。\n乃生女子，载寝之地。载衣之裼，载弄之瓦。无非无仪，唯酒食是议，无父母诒罹。",
        pinyin: "zhì zhì sī gān， yōu yōu nán shān。 rú zhú bāo yǐ， rú sōng mào yǐ。 xiōng jí dì yǐ， shì xiāng hǎo yǐ， wú xiāng yóu yǐ。\nsì xù bǐ zǔ， zhù shì bǎi dǔ， xī nán qí hù。 yuán jū yuán chù， yuán xiào yuán yǔ。\nyuē zhī gé gé， zhuó zhī tuó tuó。 fēng yǔ yōu chú， niǎo shǔ yōu qù， jūn zǐ yōu yù。\nrú qí sī yì， rú shǐ sī jí， rú niǎo sī gé， rú huī sī fēi， jūn zǐ yōu jī。\nzhí zhí qí tíng， yǒu jué qí yíng。 kuài kuài qí zhèng， yuě yuě qí míng。 jūn zǐ yōu níng。\nxià wǎn shàng diàn， nǎi ān sī qǐn。 nǎi qǐn nǎi xīng， nǎi zhàn wǒ mèng。 jí mèng wéi hé？ wéi xióng wéi pí， wéi huī wéi shé。\ndà rén zhàn zhī： wéi xióng wéi pí， nán zǐ zhī xiáng； wéi huī wéi shé， nǚ zǐ zhī xiáng。\nnǎi shēng nán zǐ， zǎi qǐn zhī chuáng。 zǎi yī zhī shang， zǎi nòng zhī zhāng。 qí qì huáng huáng， zhū fèi sī huáng， shì jiā jūn wáng。\nnǎi shēng nǚ zǐ， zǎi qǐn zhī dì。 zǎi yī zhī tì， zǎi nòng zhī wǎ。 wú fēi wú yí， wéi jiǔ shí shì yì， wú fù mǔ yí lí。",
        translation: "涧水清清地流，南山幽幽深远。家像竹子一样紧固，像松树一样茂盛，兄弟们互相友爱。筑起高大的新屋，风雨不透，鸟鼠都进不来，一家人住在里面说说笑笑。夜里睡得香，还占个好梦：梦见熊罴是要生男孩，梦见虺蛇是要生女孩；生下男孩睡在床上给他玩玉璋，生下女孩睡在地上给她玩纺锤，只求她操持好家务，不给爹娘添忧愁。",
      }
      ],
    },
    {
      title: "无羊 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《无羊》意境插画：谁谓尔无羊？三百维群。谁谓尔无牛？九十其犉。尔羊来思，其角濈濈。尔牛来思，其耳湿湿。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "谁谓尔无羊？三百维群。谁谓尔无牛？九十其犉。尔羊来思，其角濈濈。尔牛来思，其耳湿湿。\n或降于阿，或饮于池，或寝或讹。尔牧来思，何蓑何笠，或负其糇。三十维物，尔牲则具。\n尔牧来思，以薪以蒸，以雌以雄。尔羊来思，矜矜兢兢，不骞不崩。麾之以肱，毕来既升。\n牧人乃梦，众维鱼矣，旐维旟矣，大人占之；众维鱼矣，实维丰年；旐维旟矣，室家溱溱。",
        pinyin: "shuí wèi ěr wú yáng？ sān bǎi wéi qún。 shuí wèi ěr wú niú？ jiǔ shí qí chún。 ěr yáng lái sī， qí jiǎo jí jí。 ěr niú lái sī， qí ěr shī shī。\nhuò jiàng yú ā， huò yǐn yú chí， huò qǐn huò é。 ěr mù lái sī， hé suō hé lì， huò fù qí hóu。 sān shí wéi wù， ěr shēng zé jù。\něr mù lái sī， yǐ xīn yǐ zhēng， yǐ cí yǐ xióng。 ěr yáng lái sī， jīn jīn jīng jīng， bù qiān bù bēng。 huī zhī yǐ gōng， bì lái jì shēng。\nmù rén nǎi mèng， zhòng wéi yú yǐ， zhào wéi yú yǐ， dà rén zhàn zhī； zhòng wéi yú yǐ， shí wéi fēng nián； zhào wéi yú yǐ， shì jiā zhēn zhēn。",
        translation: "谁说你没有羊？三百只一大群呢；谁说你没有牛？九十头大黄牛呢。羊儿来了角挨着角，牛儿来了耳朵摆啊摆，有的下山坡，有的池边饮水，有的睡着有的醒。牧人披蓑衣戴斗笠来了，挥一挥胳膊，牛羊全都乖乖进圈。牧人还做了个梦，梦见鱼虾成群、旗子飘扬，占梦的人说：这预示着丰年，人丁兴旺啊。",
      }
      ],
    },
    {
      title: "节南山 · 佚名",
      art: "sunrise-hills",
      artPrompt: "古诗《节南山》意境插画：节彼南山，维石岩岩。赫赫师尹，民具尔瞻。忧心如惔，不敢戏谈。国既卒斩，何用不监！——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "节彼南山，维石岩岩。赫赫师尹，民具尔瞻。忧心如惔，不敢戏谈。国既卒斩，何用不监！\n节彼南山，有实其猗。赫赫师尹，不平谓何。天方荐瘥，丧乱弘多。民言无嘉，惨莫惩嗟。\n尹氏大师，维周之氐；秉国之钧，四方是维。天子是毗，俾民不迷。不吊昊天，不宜空我师。\n弗躬弗亲，庶民弗信。弗问弗仕，勿罔君子。式夷式已，无小人殆。琐琐姻亚，则无膴仕。\n昊天不佣，降此鞠讻。昊天不惠，降此大戾。君子如届，俾民心阕。君子如夷，恶怒是违。\n不吊昊天，乱靡有定。式月斯生，俾民不宁。忧心如酲，谁秉国成？不自为政，卒劳百姓。\n驾彼四牡，四牡项领。我瞻四方，蹙蹙靡所骋。\n方茂尔恶，相尔矛矣。既夷既怿，如相酬矣。\n昊天不平，我王不宁。不惩其心，覆怨其正。\n家父作诵，以究王讻。式讹尔心，以畜万邦。",
        pinyin: "jié bǐ nán shān， wéi shí yán yán。 hè hè shī yǐn， mín jù ěr zhān。 yōu xīn rú dàn， bù gǎn xì tán。 guó jì zú zhǎn， hé yòng bù jiān！\njié bǐ nán shān， yǒu shí qí yī。 hè hè shī yǐn， bù píng wèi hé。 tiān fāng jiàn chài， sāng luàn hóng duō。 mín yán wú jiā， cǎn mò chéng jiē。\nyǐn shì dà shī， wéi zhōu zhī dī； bǐng guó zhī jūn， sì fāng shì wéi。 tiān zǐ shì pí， bǐ mín bù mí。 bù diào hào tiān， bù yí kōng wǒ shī。\nfú gōng fú qīn， shù mín fú xìn。 fú wèn fú shì， wù wǎng jūn zǐ。 shì yí shì yǐ， wú xiǎo rén dài。 suǒ suǒ yīn yà， zé wú wǔ shì。\nhào tiān bù yōng， jiàng cǐ jū xiōng。 hào tiān bù huì， jiàng cǐ dà lì。 jūn zǐ rú jiè， bǐ mín xīn què。 jūn zǐ rú yí， è nù shì wéi。\nbù diào hào tiān， luàn mí yǒu dìng。 shì yuè sī shēng， bǐ mín bù níng。 yōu xīn rú chéng， shuí bǐng guó chéng？ bù zì wéi zhèng， zú láo bǎi xìng。\njià bǐ sì mǔ， sì mǔ xiàng lǐng。 wǒ zhān sì fāng， cù cù mí suǒ chěng。\nfāng mào ěr è， xiāng ěr máo yǐ。 jì yí jì yì， rú xiāng chóu yǐ。\nhào tiān bù píng， wǒ wáng bù níng。 bù chéng qí xīn， fù yuàn qí zhèng。\njiā fù zuò sòng， yǐ jiū wáng xiōng。 shì é ěr xīn， yǐ chù wàn bāng。",
        translation: "高高的终南山，石崖又高又陡；赫赫有名的太师尹氏，百姓都瞪眼看着你。你掌管着国家大权，却办事不公平，闹得百姓忧心如焚，连说笑都不敢。天下大乱没有个安定，谁来主持国政？不亲自管事，最后还是苦了百姓。我写下这首诗，要追究这祸根，但愿能改变你的心，让天下都安定。",
      }
      ],
    },
    {
      title: "正月 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《正月》意境插画：正月繁霜，我心忧伤。民之讹言，亦孔之将。念我独兮，忧心京京。哀我小心，癙忧以痒。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "正月繁霜，我心忧伤。民之讹言，亦孔之将。念我独兮，忧心京京。哀我小心，癙忧以痒。\n父母生我，胡俾我瘉？不自我先，不自我后。好言自口，莠言自口。忧心愈愈，是以有侮。\n忧心惸惸，念我无禄。民之无辜，并其臣仆。哀我人斯，于何从禄？瞻乌爰止？于谁之屋？\n瞻彼中林，侯薪侯蒸。民今方殆，视天梦梦。既克有定，靡人弗胜。有皇上帝，伊谁云憎？\n谓山盖卑，为冈为陵。民之讹言，宁莫之惩。召彼故老，讯之占梦。具曰予圣，谁知乌之雌雄！\n谓天盖高，不敢不局。谓地盖厚，不敢不蹐。维号斯言，有伦有脊。哀今之人，胡为虺蜴？\n瞻彼阪田，有菀其特。天之杌我，如不我克。彼求我则，如不我得。执我仇仇，亦不我力。\n心之忧矣，如或结之。今兹之正，胡然厉矣？燎之方扬，宁或灭之？赫赫宗周，褒姒灭之！\n终其永怀，又窘阴雨。其车既载，乃弃尔辅。载输尔载，将伯助予！\n无弃尔辅，员于尔辐。屡顾尔仆，不输尔载。终逾绝险，曾是不意。\n鱼在于沼，亦匪克乐。潜虽伏矣，亦孔之炤。忧心惨惨，念国之为虐！\n彼有旨酒，又有嘉肴。洽比其邻，婚姻孔云。念我独兮，忧心殷殷。\n佌佌彼有屋，蔌蔌方有谷。民今之无禄，天夭是椓。哿矣富人，哀此惸独。",
        pinyin: "zhēng yuè fán shuāng， wǒ xīn yōu shāng。 mín zhī é yán， yì kǒng zhī jiāng。 niàn wǒ dú xī， yōu xīn jīng jīng。 āi wǒ xiǎo xīn， shǔ yōu yǐ yǎng。\nfù mǔ shēng wǒ， hú bǐ wǒ yù？ bù zì wǒ xiān， bù zì wǒ hòu。 hǎo yán zì kǒu， yǒu yán zì kǒu。 yōu xīn yù yù， shì yǐ yǒu wǔ。\nyōu xīn qióng qióng， niàn wǒ wú lù。 mín zhī wú gū， bìng qí chén pú。 āi wǒ rén sī， yú hé cóng lù？ zhān wū yuán zhǐ？ yú shuí zhī wū？\nzhān bǐ zhōng lín， hóu xīn hóu zhēng。 mín jīn fāng dài， shì tiān mèng mèng。 jì kè yǒu dìng， mí rén fú shèng。 yǒu huáng shang dì， yī shuí yún zēng？\nwèi shān gài bēi， wèi gāng wèi líng。 mín zhī é yán， níng mò zhī chéng。 zhào bǐ gù lǎo， xùn zhī zhàn mèng。 jù yuē yǔ shèng， shuí zhī wū zhī cí xióng！\nwèi tiān gài gāo， bù gǎn bù jú。 wèi dì gài hòu， bù gǎn bù jí。 wéi hào sī yán， yǒu lún yǒu jǐ。 āi jīn zhī rén， hú wèi huī yì？\nzhān bǐ bǎn tián， yǒu wǎn qí tè。 tiān zhī wù wǒ， rú bù wǒ kè。 bǐ qiú wǒ zé， rú bù wǒ dé。 zhí wǒ chóu chóu， yì bù wǒ lì。\nxīn zhī yōu yǐ， rú huò jié zhī。 jīn zī zhī zhèng， hú rán lì yǐ？ liáo zhī fāng yáng， níng huò miè zhī？ hè hè zōng zhōu， bāo sì miè zhī！\nzhōng qí yǒng huái， yòu jiǒng yīn yǔ。 qí chē jì zǎi， nǎi qì ěr fǔ。 zǎi shū ěr zǎi， jiāng bó zhù yǔ！\nwú qì ěr fǔ， yuán yú ěr fú。 lǚ gù ěr pú， bù shū ěr zǎi。 zhōng yú jué xiǎn， céng shì bù yì。\nyú zài yú zhǎo， yì fěi kè lè。 qián suī fú yǐ， yì kǒng zhī zhāo。 yōu xīn cǎn cǎn， niàn guó zhī wèi nüè！\nbǐ yǒu zhǐ jiǔ， yòu yǒu jiā yáo。 qià bǐ qí lín， hūn yīn kǒng yún。 niàn wǒ dú xī， yōu xīn yīn yīn。\ncǐ cǐ bǐ yǒu wū， sù sù fāng yǒu gǔ。 mín jīn zhī wú lù， tiān yāo shì zhuó。 gě yǐ fù rén， āi cǐ qióng dú。",
        translation: "正月里霜下得又多又重，我心里非常忧伤；谣言四处传，越来越厉害。说天高吧，人们不敢不弯着腰；说地厚吧，人们不敢不迈小步。赫赫的宗周镐京，竟要被褒姒毁掉！有钱的人有屋有谷吃好喝好，可怜那些孤苦零丁、没依没靠的人。",
      }
      ],
    },
    {
      title: "十月之交 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《十月之交》意境插画：十月之交，朔月辛卯。日有食之，亦孔之丑。彼月而微，此日而微；今此下民，亦孔之哀。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "十月之交，朔月辛卯。日有食之，亦孔之丑。彼月而微，此日而微；今此下民，亦孔之哀。\n日月告凶，不用其行。四国无政，不用其良。彼月而食，则维其常；此日而食，于何不臧。\n烨烨震电，不宁不令。百川沸腾，山冢崒崩。高岸为谷，深谷为陵。哀今之人，胡惨莫惩？\n皇父卿士，番维司徒，家伯维宰，仲允膳夫，棸子内史，蹶维趣马，楀维师氏。醘妻煽方处。\n抑此皇父，岂曰不时？胡为我作，不即我谋？彻我墙屋，田卒污莱。曰予不戕，礼则然矣。\n皇父孔圣，作都于向。择三有事，亶侯多藏。不慭遗一老，俾守我王。择有车马，以居徂向。\n黾勉从事，不敢告劳。无罪无辜，谗口嚣嚣。下民之孽，匪降自天。噂沓背憎，职竞由人。\n悠悠我里，亦孔之痗。四方有羡，我独居忧。民莫不逸，我独不敢休。天命不彻，我不敢效我友自逸。",
        pinyin: "shí yuè zhī jiāo， shuò yuè xīn mǎo。 rì yǒu shí zhī， yì kǒng zhī chǒu。 bǐ yuè ér wēi， cǐ rì ér wēi； jīn cǐ xià mín， yì kǒng zhī āi。\nrì yuè gào xiōng， bù yòng qí xíng。 sì guó wú zhèng， bù yòng qí liáng。 bǐ yuè ér shí， zé wéi qí cháng； cǐ rì ér shí， yú hé bù zāng。\nyè yè zhèn diàn， bù níng bù lìng。 bǎi chuān fèi téng， shān zhǒng zú bēng。 gāo àn wèi gǔ， shēn gǔ wéi líng。 āi jīn zhī rén， hú cǎn mò chéng？\nhuáng fù qīng shì， fān wéi sī tú， jiā bó wéi zǎi， zhòng yǔn shàn fū， zōu zǐ nèi shǐ， juě wéi qù mǎ， yǔ wéi shī shì。 kē qī shān fāng chù。\nyì cǐ huáng fù， qǐ yuē bù shí？ hú wèi wǒ zuò， bù jí wǒ móu？ chè wǒ qiáng wū， tián zú wū lái。 yuē yǔ bù qiāng， lǐ zé rán yǐ。\nhuáng fù kǒng shèng， zuò dōu yú xiàng。 zé sān yǒu shì， dǎn hóu duō cáng。 bù yìn yí yī lǎo， bǐ shǒu wǒ wáng。 zé yǒu chē mǎ， yǐ jū cú xiàng。\nmiǎn miǎn cóng shì， bù gǎn gào láo。 wú zuì wú gū， chán kǒu áo áo。 xià mín zhī niè， fěi jiàng zì tiān。 zǔn tà bèi zēng， zhí jìng yóu rén。\nyōu yōu wǒ lǐ， yì kǒng zhī mèi。 sì fāng yǒu xiàn， wǒ dú jū yōu。 mín mò bù yì， wǒ dú bù gǎn xiū。 tiān mìng bù chè， wǒ bù gǎn xiào wǒ yǒu zì yì。",
        translation: "十月初一辛卯这天，发生了日食，这是多么凶险的事。雷电轰鸣，河水沸腾，山崖崩塌，高岸变成深谷，深谷变成山丘。当权的皇父这些人，拆了百姓的墙屋，让田地荒芜，还说什么合乎礼制。百姓遭的灾祸不是天上掉下来的，都是人闹出来的；我独自不敢安逸偷闲。",
      }
      ],
    },
    {
      title: "雨无正 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《雨无正》意境插画：浩浩昊天，不骏其德。降丧饥馑，斩伐四国。旻天疾威，弗虑弗图。舍彼有罪，既伏其辜。若此无罪，沦胥以铺。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "浩浩昊天，不骏其德。降丧饥馑，斩伐四国。旻天疾威，弗虑弗图。舍彼有罪，既伏其辜。若此无罪，沦胥以铺。\n周宗既灭，靡所止戾。正大夫离居，莫知我勚。三事大夫，莫肯夙夜。邦君诸侯，莫肯朝夕。庶曰式臧，覆出为恶。\n如何昊天，辟言不信。如彼行迈，则靡所臻。凡百君子，各敬尔身。胡不相畏，不畏于天？\n戎成不退，饥成不遂。曾我暬御，惨惨日瘁。凡百君子，莫肯用讯。听言则答，谮言则退。\n哀哉不能言，匪舌是出，维躬是瘁。哿矣能言，巧言如流，俾躬处休！\n维曰予仕，孔棘且殆。云不何使，得罪于天子；亦云可使，怨及朋友。\n谓尔迁于王都。曰予未有室家。鼠思泣血，无言不疾。昔尔出居，谁从作尔室？",
        pinyin: "hào hào hào tiān， bù jùn qí dé。 jiàng sàng jī jǐn， zhǎn fá sì guó。 mín tiān jí wēi， fú lǜ fú tú。 shè bǐ yǒu zuì， jì fú qí gū。 ruò cǐ wú zuì， lún xū yǐ pù。\nzhōu zōng jì miè， mí suǒ zhǐ lì。 zhèng dài fu lí jū， mò zhī wǒ yì。 sān shì dài fu， mò kěn sù yè。 bāng jūn zhū hóu， mò kěn zhāo xī。 shù yuē shì zāng， fù chū wèi è。\nrú hé hào tiān， pì yán bù xìn。 rú bǐ xíng mài， zé mí suǒ zhēn。 fán bǎi jūn zǐ， gè jìng ěr shēn。 hú bù xiāng wèi， bù wèi yú tiān？\nróng chéng bù tuì， jī chéng bù suì。 céng wǒ xiè yù， cǎn cǎn rì cuì。 fán bǎi jūn zǐ， mò kěn yòng xùn。 tīng yán zé dá， zèn yán zé tuì。\nāi zāi bù néng yán， fěi shé shì chū， wéi gōng shì cuì。 gě yǐ néng yán， qiǎo yán rú liú， bǐ gōng chù xiū！\nwéi yuē yǔ shì， kǒng jí qiě dài。 yún bù hé shǐ， dé zuì yú tiān zǐ； yì yún kě shǐ， yuàn jí péng yǒu。\nwèi ěr qiān yú wáng dū。 yuē yǔ wèi yǒu shì jiā。 shǔ sī qì xuè， wú yán bù jí。 xī ěr chū jū， shuí cóng zuò ěr shì？",
        translation: "浩浩苍天，不肯施恩，降下饥荒和死亡，残害四方百姓。有罪的人躲过了惩罚，无罪的人却一个接一个受苦。大夫们各奔东西，没有谁肯早晚为公家办事；人们不肯说真话，爱听奉承的话，说正直话的人倒遭罪。请大家搬回王都来吧，他们却说自己在那儿没有房子住。",
      }
      ],
    },
    {
      title: "小旻 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《小旻》意境插画：旻天疾威，敷于下土。谋犹回遹，何日斯沮？谋臧不从，不臧覆用。我视谋犹，亦孔之邛。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "旻天疾威，敷于下土。谋犹回遹，何日斯沮？谋臧不从，不臧覆用。我视谋犹，亦孔之邛。\n潝潝訿訿，亦孔之哀。谋之其臧，则具是违。谋之不臧，则具是依。我视谋犹，伊于胡厎。\n我龟既厌，不我告犹。谋夫孔多，是用不集。发言盈庭，谁敢执其咎？如匪行迈谋，是用不得于道。\n哀哉为犹，匪先民是程，匪大犹是经。维迩言是听，维迩言是争。如彼筑室于道谋，是用不溃于成。\n国虽靡止，或圣或否。民虽靡膴，或哲或谋，或肃或艾。如彼泉流，无沦胥以败。\n不敢暴虎，不敢冯河。人知其一，莫知其他。战战兢兢，如临深渊，如履薄冰。",
        pinyin: "mín tiān jí wēi， fū yú xià tǔ。 móu yóu huí yù， hé rì sī jǔ？ móu zāng bù cóng， bù zāng fù yòng。 wǒ shì móu yóu， yì kǒng zhī qióng。\nxì xì zǐ zǐ， yì kǒng zhī āi。 móu zhī qí zāng， zé jù shì wéi。 móu zhī bù zāng， zé jù shì yī。 wǒ shì móu yóu， yī yú hú dǐ。\nwǒ guī jì yàn， bù wǒ gào yóu。 móu fū kǒng duō， shì yòng bù jí。 fā yán yíng tíng， shuí gǎn zhí qí jiù？ rú fěi xíng mài móu， shì yòng bù dé yú dào。\nāi zāi wèi yóu， fěi xiān mín shì chéng， fěi dà yóu shì jīng。 wéi ěr yán shì tīng， wéi ěr yán shì zhēng。 rú bǐ zhù shì yú dào móu， shì yòng bù kuì yú chéng。\nguó suī mí zhǐ， huò shèng huò fǒu。 mín suī mí wǔ， huò zhé huò móu， huò sù huò ài。 rú bǐ quán liú， wú lún xū yǐ bài。\nbù gǎn bào hǔ， bù gǎn féng hé。 rén zhī qí yī， mò zhī qí tā。 zhàn zhàn jīng jīng， rú lín shēn yuān， rú lǚ bó bīng。",
        translation: "苍天暴虐，把灾祸撒满大地。好的计谋不采纳，坏的计谋倒全用上。出主意的人一大堆，谁也不敢担责任，就像盖房子时听满路人七嘴八舌，房子永远盖不成。人们不敢空手打虎，不敢蹚水过河，只知道这一点，别的就不管了。我整天战战兢兢，像面对深渊，像踩着薄冰。",
      }
      ],
    },
    {
      title: "小宛 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《小宛》意境插画：宛彼鸣鸠，翰飞戾天。我心忧伤，念昔先人。明发不寐，有怀二人。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "宛彼鸣鸠，翰飞戾天。我心忧伤，念昔先人。明发不寐，有怀二人。\n人之齐圣，饮酒温克。彼昏不知，一醉日富。各敬尔仪，天命不又。\n中原有菽，庶民采之。螟蛉有子，蜾蠃负之。教诲尔子，式谷似之。\n题彼脊令，载飞载鸣。我日斯迈，而月斯征。夙兴夜寐，毋忝尔所生。\n交交桑扈，率场啄粟。哀我填寡，宜岸宜狱。握粟出卜，自何能谷？\n温温恭人，如集于木。惴惴小心，如临于谷。战战兢兢，如履薄冰。",
        pinyin: "wǎn bǐ míng jiū， hàn fēi lì tiān。 wǒ xīn yōu shāng， niàn xī xiān rén。 míng fā bù mèi， yǒu huái èr rén。\nrén zhī qí shèng， yǐn jiǔ wēn kè。 bǐ hūn bù zhī， yī zuì rì fù。 gè jìng ěr yí， tiān mìng bù yòu。\nzhōng yuán yǒu shū， shù mín cǎi zhī。 míng líng yǒu zǐ， guǒ luǒ fù zhī。 jiào huì ěr zǐ， shì gǔ sì zhī。\ntí bǐ jǐ lìng， zǎi fēi zǎi míng。 wǒ rì sī mài， ér yuè sī zhēng。 sù xīng yè mèi， wú tiǎn ěr suǒ shēng。\njiāo jiāo sāng hù， lǜ chǎng zhuó sù。 āi wǒ tián guǎ， yí àn yí yù。 wò sù chū bǔ， zì hé néng gǔ？\nwēn wēn gōng rén， rú jí yú mù。 zhuì zhuì xiǎo xīn， rú lín yú gǔ。 zhàn zhàn jīng jīng， rú lǚ bó bīng。",
        translation: "小小的斑鸠鸟，展翅直飞到天上。我心里忧伤，想念去世的父母，整夜睁着眼睡不着。田里的大豆，人人可以去采；蜾蠃捉来螟蛉的幼虫喂养，教育儿女也要这样尽心。要早起晚睡地努力，别辱没了生养你的父母；恭敬温和地做人，小心又小心，像踩着薄冰、面对深谷一样谨慎。",
      }
      ],
    },
    {
      title: "小弁 · 佚名",
      art: "cloud-flight",
      artPrompt: "古诗《小弁》意境插画：弁彼鸴斯，归飞提提。民莫不谷，我独于罹。何辜于天？我罪伊何？心之忧矣，云如之何？——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "弁彼鸴斯，归飞提提。民莫不谷，我独于罹。何辜于天？我罪伊何？心之忧矣，云如之何？\n踧踧周道，鞫为茂草。我心忧伤，惄焉如捣。假寐永叹，维忧用老。心之忧矣，疢如疾首。\n维桑与梓，必恭敬止。靡瞻匪父，靡依匪母。不属于毛？不罹于里？天之生我，我辰安在？\n菀彼柳斯，鸣蜩嘒嘒，有漼者渊，萑苇淠淠。譬彼舟流，不知所届，心之忧矣，不遑假寐。\n鹿斯之奔，维足伎伎。雉之朝雊，尚求其雌。譬彼坏木，疾用无枝。心之忧矣，宁莫之知？\n相彼投兔，尚或先之。行有死人，尚或墐之。君子秉心，维其忍之。心之忧矣，涕既陨之。\n君子信谗，如或酬之。君子不惠，不舒究之。伐木掎矣，析薪扡矣。舍彼有罪，予之佗矣。\n莫高匪山，莫浚匪泉。君子无易由言，耳属于垣。无逝我梁，无发我笱。我躬不阅，遑恤我后。",
        pinyin: "biàn bǐ xué sī， guī fēi tí tí。 mín mò bù gǔ， wǒ dú yú lí。 hé gū yú tiān？ wǒ zuì yī hé？ xīn zhī yōu yǐ， yún rú zhī hé？\ncù cù zhōu dào， jū wèi mào cǎo。 wǒ xīn yōu shāng， nì yān rú dǎo。 jiǎ mèi yǒng tàn， wéi yōu yòng lǎo。 xīn zhī yōu yǐ， chèn rú jí shǒu。\nwéi sāng yǔ zǐ， bì gōng jìng zhǐ。 mí zhān fěi fù， mí yī fěi mǔ。 bù shǔ yú máo？ bù lí yú lǐ？ tiān zhī shēng wǒ， wǒ chén ān zài？\nwǎn bǐ liǔ sī， míng tiáo huì huì， yǒu cuǐ zhě yuān， huán wěi pì pì。 pì bǐ zhōu liú， bù zhī suǒ jiè， xīn zhī yōu yǐ， bù huáng jiǎ mèi。\nlù sī zhī bēn， wéi zú jì jì。 zhì zhī cháo gòu， shàng qiú qí cí。 pì bǐ huài mù， jí yòng wú zhī。 xīn zhī yōu yǐ， níng mò zhī zhī？\nxiāng bǐ tóu tù， shàng huò xiān zhī。 xíng yǒu sǐ rén， shàng huò jìn zhī。 jūn zǐ bǐng xīn， wéi qí rěn zhī。 xīn zhī yōu yǐ， tì jì yǔn zhī。\njūn zǐ xìn chán， rú huò chóu zhī。 jūn zǐ bù huì， bù shū jiū zhī。 fá mù jǐ yǐ， xī xīn tuō yǐ。 shè bǐ yǒu zuì， yǔ zhī tuó yǐ。\nmò gāo fěi shān， mò jùn fěi quán。 jūn zǐ wú yì yóu yán， ěr shǔ yú yuán。 wú shì wǒ liáng， wú fā wǒ gǒu。 wǒ gōng bù yuè， huáng xù wǒ hòu。",
        translation: "寒鸦快快活活地飞回巢，别人都过得好好的，只有我遭了难；我问心无罪，忧伤得不知怎么办。平坦的大道，长满了荒草，忧伤像捣心一样痛，人都愁老了。看见桑树梓树都要恭恭敬敬，谁不敬父亲、谁不依恋母亲呢？心里的话要小心，隔墙有耳朵啊。",
      }
      ],
    },
    {
      title: "巧言 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《巧言》意境插画：悠悠昊天，曰父母且。无罪无辜，乱如此幠。昊天已威，予慎无罪。昊天大幠，予慎无辜。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "悠悠昊天，曰父母且。无罪无辜，乱如此幠。昊天已威，予慎无罪。昊天大幠，予慎无辜。\n乱之初生，僭始既涵。乱之又生，君子信谗。君子如怒，乱庶遄沮。君子如祉，乱庶遄已。\n君子屡盟，乱是用长。君子信盗，乱是用暴。盗言孔甘，乱是用餤。匪其止共，维王之邛。\n奕奕寝庙，君子作之。秩秩大猷，圣人莫之。他人有心，予忖度之。跃跃毚兔，遇犬获之。\n荏染柔木，君子树之。往来行言，心焉数之。蛇蛇硕言，出自口矣。巧言如簧，颜之厚矣。\n彼何人斯？居河之麋。无拳无勇，职为乱阶。既微且尰，尔勇伊何？为犹将多，尔居徒几何？",
        pinyin: "yōu yōu hào tiān， yuē fù mǔ qiě。 wú zuì wú gū， luàn rú cǐ hū。 hào tiān yǐ wēi， yǔ shèn wú zuì。 hào tiān dà hū， yǔ shèn wú gū。\nluàn zhī chū shēng， jiàn shǐ jì hán。 luàn zhī yòu shēng， jūn zǐ xìn chán。 jūn zǐ rú nù， luàn shù chuán jǔ。 jūn zǐ rú zhǐ， luàn shù chuán yǐ。\njūn zǐ lǚ méng， luàn shì yòng cháng。 jūn zǐ xìn dào， luàn shì yòng bào。 dào yán kǒng gān， luàn shì yòng dàn。 fěi qí zhǐ gòng， wéi wáng zhī qióng。\nyì yì qǐn miào， jūn zǐ zuò zhī。 zhì zhì dà yóu， shèng rén mò zhī。 tā rén yǒu xīn， yǔ cǔn duó zhī。 yuè yuè chán tù， yù quǎn huò zhī。\nrěn rǎn róu mù， jūn zǐ shù zhī。 wǎng lái xíng yán， xīn yān shù zhī。 shé shé shuò yán， chū zì kǒu yǐ。 qiǎo yán rú huáng， yán zhī hòu yǐ。\nbǐ hé rén sī？ jū hé zhī mí。 wú quán wú yǒng， zhí wèi luàn jiē。 jì wēi qiě zhǒng， ěr yǒng yī hé？ wèi yóu jiāng duō， ěr jū tú jǐ hé？",
        translation: "悠悠苍天，就像人的父母呀。我没有罪过，乱子却这么大。乱子刚起头，是因为谗言被容忍；乱子闹大了，是因为君子听信谗言。君子如果发怒去阻止，乱子很快就会平息；谗话像蜜一样甜，乱子就越闹越凶。说大话、巧言如簧的人，脸皮实在太厚了。",
      }
      ],
    },
    {
      title: "何人斯 · 佚名",
      art: "cloud-flight",
      artPrompt: "古诗《何人斯》意境插画：彼何人斯？其心孔艰。胡逝我梁，不入我门？伊谁云从？维暴之云。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "彼何人斯？其心孔艰。胡逝我梁，不入我门？伊谁云从？维暴之云。\n二人从行，谁为此祸？胡逝我梁，不入唁我？始者不如今，云不我可\n彼何人斯？胡逝我陈？我闻其声，不见其身。不愧于人？不畏于天？\n彼何人斯？其为飘风。胡不自北？胡不自南？胡逝我梁？𫄨搅我心。\n尔之安行，亦不遑舍。尔之亟行，遑脂尔车。一者之来，云何其盱。\n尔还而入，我心易也。还而不入，否难知也。一者之来，俾我𫄨也。\n伯氏吹埙，仲氏吹篪。及尔如贯，谅不我郑出此三物，以诅尔斯。\n为鬼为蜮，则不可得。有腼面目，视人罔极。作此好歌，以极反侧。",
        pinyin: "bǐ hé rén sī？ qí xīn kǒng jiān。 hú shì wǒ liáng， bù rù wǒ mén？ yī shuí yún cóng？ wéi bào zhī yún。\nèr rén cóng xíng， shuí wèi cǐ huò？ hú shì wǒ liáng， bù rù yàn wǒ？ shǐ zhě bù rú jīn， yún bù wǒ kě\nbǐ hé rén sī？ hú shì wǒ chén？ wǒ wén qí shēng， bù jiàn qí shēn。 bù kuì yú rén？ bù wèi yú tiān？\nbǐ hé rén sī？ qí wèi piāo fēng。 hú bù zì běi？ hú bù zì nán？ hú shì wǒ liáng？ chī jiǎo wǒ xīn。\něr zhī ān xíng， yì bù huáng shè。 ěr zhī jí xíng， huáng zhī ěr chē。 yī zhě zhī lái， yún hé qí xū。\něr hái ér rù， wǒ xīn yì yě。 hái ér bù rù， fǒu nán zhī yě。 yī zhě zhī lái， bǐ wǒ chī yě。\nbó shì chuī xūn， zhòng shì chuī chí。 jí ěr rú guàn， liàng bù wǒ zhèng chū cǐ sān wù， yǐ zǔ ěr sī。\nwéi guǐ wéi yù， zé bù kě dé。 yǒu miǎn miàn mù， shì rén wǎng jí。 zuò cǐ hǎo gē， yǐ jí fǎn cè。",
        translation: "那是个什么样的人呀？他的心思很难捉摸。他经过我的鱼梁，却不进我的门，来去像一阵旋风，不知从北边来还是从南边来，真是搅乱了我的心。你回家进门来，我心里就舒坦；回来却不进门，真叫人猜不透。你像鬼像魅，看得见脸面，摸不着心眼；我写下这首好歌，来揭穿你的反复无常。",
      }
      ],
    },
    {
      title: "巷伯 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《巷伯》意境插画：萋兮斐兮，成是贝锦。彼谮人者，亦已大甚！——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "萋兮斐兮，成是贝锦。彼谮人者，亦已大甚！\n哆兮侈兮，成是南箕。彼谮人者，谁适与谋。\n缉缉翩翩，谋欲谮人。慎尔言也，谓尔不信。\n捷捷幡幡，谋欲谮言。岂不尔受？既其女迁。\n骄人好好，劳人草草。苍天苍天，视彼骄人，矜此劳人。\n彼谮人者，谁适与谋？取彼谮人，投畀豺虎。豺虎不食，投畀有北。有北不受，投畀有昊！\n杨园之道，猗于亩丘。寺人孟子，作为此诗。凡百君子，敬而听之。",
        pinyin: "qī xī fěi xī， chéng shì bèi jǐn。 bǐ zèn rén zhě， yì yǐ dà shèn！\nduō xī chǐ xī， chéng shì nán jī。 bǐ zèn rén zhě， shuí shì yǔ móu。\njī jī piān piān， móu yù zèn rén。 shèn ěr yán yě， wèi ěr bù xìn。\njié jié fān fān， móu yù zèn yán。 qǐ bù ěr shòu？ jì qí nǚ qiān。\njiāo rén hǎo hǎo， láo rén cǎo cǎo。 cāng tiān cāng tiān， shì bǐ jiāo rén， jīn cǐ láo rén。\nbǐ zèn rén zhě， shuí shì yǔ móu？ qǔ bǐ zèn rén， tóu bì chái hǔ。 chái hǔ bù shí， tóu bì yǒu běi。 yǒu běi bù shòu， tóu bì yǒu hào！\nyáng yuán zhī dào， yī yú mǔ qiū。 sì rén mèng zǐ， zuò wéi cǐ shī。 fán bǎi jūn zǐ， jìng ér tīng zhī。",
        translation: "彩丝织得花花绿绿，织成贝纹的锦缎；那些诬陷好人的人，实在太过分了！造谣的人得意洋洋，被谗言伤害的人忧心忡忡。苍天苍天，请你看着那些骄横的人，可怜可怜受苦的人！抓住那造谣的人，扔给豺虎；豺虎不吃，扔到北方荒野；北方不受，就交给苍天！寺人孟子写下这首诗，请大家恭敬地听一听。",
      }
      ],
    },
    {
      title: "谷风 · 佚名",
      art: "cloud-flight",
      artPrompt: "古诗《谷风》意境插画：习习谷风，维风及雨。将恐将惧，维予与女。将安将乐，女转弃予。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "习习谷风，维风及雨。将恐将惧，维予与女。将安将乐，女转弃予。\n习习谷风，维风及颓。将恐将惧，置予于怀。将安将乐，弃予如遗。\n习习谷风，维山崔嵬。无草不死，无木不萎。忘我大德，思我小怨。",
        pinyin: "xí xí gǔ fēng， wéi fēng jí yǔ。 jiāng kǒng jiāng jù， wéi yǔ yǔ nǚ。 jiāng ān jiāng lè， nǚ zhuǎn qì yǔ。\nxí xí gǔ fēng， wéi fēng jí tuí。 jiāng kǒng jiāng jù， zhì yǔ yú huái。 jiāng ān jiāng lè， qì yǔ rú yí。\nxí xí gǔ fēng， wéi shān cuī wéi。 wú cǎo bù sǐ， wú mù bù wěi。 wàng wǒ dà dé， sī wǒ xiǎo yuàn。",
        translation: "山谷里大风呼呼吹，又是风又是雨。在担惊受怕的日子，只有我跟你在一起；到了安乐的时候，你却把我抛弃，像丢东西一样把我丢开。你忘掉我的大恩大德，只记得我的小小怨处。",
      }
      ],
    },
    {
      title: "蓼莪 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《蓼莪》意境插画：蓼蓼者莪，匪莪伊蒿。哀哀父母，生我劬劳。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "蓼蓼者莪，匪莪伊蒿。哀哀父母，生我劬劳。\n蓼蓼者莪，匪莪伊蔚。哀哀父母，生我劳瘁。\n瓶之罄矣，维罍之耻。鲜民之生，不如死之久矣。无父何怙？无母何恃？出则衔恤，入则靡至。\n父兮生我，母兮鞠我。抚我畜我，长我育我，顾我复我，出入腹我。欲报之德。昊天罔极！\n南山烈烈，飘风发发。民莫不谷，我独何害！南山律律，飘风弗弗。民莫不谷，我独不卒！",
        pinyin: "liǎo liǎo zhě é， fěi é yī hāo。 āi āi fù mǔ， shēng wǒ qú láo。\nliǎo liǎo zhě é， fěi é yī wèi。 āi āi fù mǔ， shēng wǒ láo cuì。\npíng zhī qìng yǐ， wéi léi zhī chǐ。 xiān mín zhī shēng， bù rú sǐ zhī jiǔ yǐ。 wú fù hé hù？ wú mǔ hé shì？ chū zé xián xù， rù zé mí zhì。\nfù xī shēng wǒ， mǔ xī jū wǒ。 fǔ wǒ chù wǒ， cháng wǒ yù wǒ， gù wǒ fù wǒ， chū rù fù wǒ。 yù bào zhī dé。 hào tiān wǎng jí！\nnán shān liè liè， piāo fēng fā fā。 mín mò bù gǔ， wǒ dú hé hài！ nán shān lǜ lǜ， piāo fēng fú fú。 mín mò bù gǔ， wǒ dú bù zú！",
        translation: "那长得高高的是莪菜呀，我却把它当成了野蒿。可怜我的爹娘，生养我受尽了辛苦劳累。爹娘生我养我、抚我育我，这份恩情大得像天，我想报答也报答不完啊！",
      }
      ],
    },
    {
      title: "大东 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《大东》意境插画：有饛簋飧，有捄棘匕。周道如砥，其直如矢。君子所履，小人所视。眷言顾之，潸焉出涕。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "有饛簋飧，有捄棘匕。周道如砥，其直如矢。君子所履，小人所视。眷言顾之，潸焉出涕。\n小东大东，杼柚其空。纠纠葛屦，可以履霜。佻佻公子，行彼周行。既往既来，使我心疚。\n有冽氿泉，无浸获薪。契契寤叹，哀我惮人。薪是获薪，尚可载也。哀我惮人，亦可息也。\n东人之子，职劳不来。西人之子，粲粲衣服。舟人之子，熊罴是裘。私人之子，百僚是试。\n或以其酒，不以其浆。鞙鞙佩璲，不以其长。维天有汉，监亦有光。跂彼织女，终日七襄。\n虽则七襄，不成报章。睆彼牵牛，不以服箱。东有启明，西有长庚。有捄天毕，载施之行。\n维南有箕，不可以簸扬。维北有斗，不可以挹酒浆。维南有箕，载翕其舌。维北有斗，西柄之揭。",
        pinyin: "yǒu méng guǐ sūn， yǒu jiù jí bǐ。 zhōu dào rú dǐ， qí zhí rú shǐ。 jūn zǐ suǒ lǚ， xiǎo rén suǒ shì。 juàn yán gù zhī， shān yān chū tì。\nxiǎo dōng dà dōng， zhù yòu qí kōng。 jiū jiū gé jù， kě yǐ lǚ shuāng。 tiāo tiāo gōng zǐ， xíng bǐ zhōu xíng。 jì wǎng jì lái， shǐ wǒ xīn jiù。\nyǒu liè guǐ quán， wú jìn huò xīn。 qì qì wù tàn， āi wǒ dàn rén。 xīn shì huò xīn， shàng kě zǎi yě。 āi wǒ dàn rén， yì kě xī yě。\ndōng rén zhī zǐ， zhí láo bù lái。 xī rén zhī zǐ， càn càn yī fu。 zhōu rén zhī zǐ， xióng pí shì qiú。 sī rén zhī zǐ， bǎi liáo shì shì。\nhuò yǐ qí jiǔ， bù yǐ qí jiāng。 juān juān pèi suì， bù yǐ qí cháng。 wéi tiān yǒu hàn， jiān yì yǒu guāng。 qí bǐ zhī nǚ， zhōng rì qī xiāng。\nsuī zé qī xiāng， bù chéng bào zhāng。 huàn bǐ qiān niú， bù yǐ fú xiāng。 dōng yǒu qǐ míng， xī yǒu cháng gēng。 yǒu jiù tiān bì， zǎi shī zhī xíng。\nwéi nán yǒu jī， bù kě yǐ bò yáng。 wéi běi yǒu dòu， bù kě yǐ yì jiǔ jiāng。 wéi nán yǒu jī， zǎi xī qí shé。 wéi běi yǒu dòu， xī bǐng zhī jiē。",
        translation: "竹篮里盛着满满的饭食，长长的荆木勺子放在旁边。大路平得像磨刀石、直得像箭，可东方的人被繁重的差事压得织机都空了，想到这里就忍不住落泪。天上的织女整日忙碌也织不出布，牵牛不能拉车，箕星不能簸米，北斗不能舀酒。",
      }
      ],
    },
    {
      title: "四月 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《四月》意境插画：四月维夏，六月徂署。先祖匪人，胡宁忍予？——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "四月维夏，六月徂署。先祖匪人，胡宁忍予？\n秋日凄凄，百卉具腓。乱离瘼矣，爰其适归？\n冬日烈烈，飘风发发。民莫不谷，我独何害？\n山有嘉卉，侯栗侯梅。废为残贼，莫知其尤！\n相彼泉水，载清载浊。我日构祸，曷云能谷？\n滔滔江汉，南国之纪。尽瘁以仕，宁莫我有？\n匪鹑匪鸢，翰飞戾天。匪鳣匪鲔，潜逃于渊。\n山有蕨薇，隰有杞桋。君子作歌，维以告哀。",
        pinyin: "sì yuè wéi xià， liù yuè cú shǔ。 xiān zǔ fěi rén， hú níng rěn yǔ？\nqiū rì qī qī， bǎi huì jù féi。 luàn lí mò yǐ， yuán qí shì guī？\ndōng rì liè liè， piāo fēng fā fā。 mín mò bù gǔ， wǒ dú hé hài？\nshān yǒu jiā huì， hóu lì hóu méi。 fèi wèi cán zéi， mò zhī qí yóu！\nxiāng bǐ quán shuǐ， zǎi qīng zǎi zhuó。 wǒ rì gòu huò， hé yún néng gǔ？\ntāo tāo jiāng hàn， nán guó zhī jì。 jìn cuì yǐ shì， níng mò wǒ yǒu？\nfěi chún fěi yuān， hàn fēi lì tiān。 fěi zhān fěi wěi， qián táo yú yuān。\nshān yǒu jué wēi， xí yǒu qǐ yí。 jūn zǐ zuò gē， wéi yǐ gào āi。",
        translation: "四月进入夏天，六月夏天就要过完了。秋天凄凄凉凉，花草全都枯萎；冬天寒风呼呼地刮，别人都好好的，只有我在遭难。只好作一首歌，来诉说心里的悲伤。",
      }
      ],
    },
    {
      title: "北山 · 佚名",
      art: "sunrise-hills",
      artPrompt: "古诗《北山》意境插画：陟彼北山，言采其杞。偕偕士子，朝夕从事。王事靡盬，忧我父母。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "陟彼北山，言采其杞。偕偕士子，朝夕从事。王事靡盬，忧我父母。\n溥天之下，莫非王土；率土之滨，莫非王臣。大夫不均，我从事独贤。\n四牡彭彭，王事傍傍。嘉我未老，鲜我方将。旅力方刚，经营四方。\n或燕燕居息，或尽瘁事国；或息偃在床，或不已于行。\n或不知叫号，或惨惨劬劳；或栖迟偃仰，或王事鞅掌。\n或湛乐饮酒，或惨惨畏咎；或出入风议，或靡事不为。",
        pinyin: "zhì bǐ běi shān， yán cǎi qí qǐ。 xié xié shì zǐ， zhāo xī cóng shì。 wáng shì mí gǔ， yōu wǒ fù mǔ。\npǔ tiān zhī xià， mò fēi wáng tǔ； lǜ tǔ zhī bīn， mò fēi wáng chén。 dài fu bù jūn， wǒ cóng shì dú xián。\nsì mǔ péng péng， wáng shì bàng bàng。 jiā wǒ wèi lǎo， xiān wǒ fāng jiāng。 lǚ lì fāng gāng， jīng yíng sì fāng。\nhuò yàn yàn jū xī， huò jìn cuì shì guó； huò xī yǎn zài chuáng， huò bù yǐ yú xíng。\nhuò bù zhī jiào hào， huò cǎn cǎn qú láo； huò qī chí yǎn yǎng， huò wáng shì yāng zhǎng。\nhuò zhàn lè yǐn jiǔ， huò cǎn cǎn wèi jiù； huò chū rù fēng yì， huò mí shì bù wèi。",
        translation: "我爬上北山去采枸杞，从早到晚忙于王家的差事，忙得没完没了，心里还惦记着爹娘。普天之下没有一处不是王的土地，土地上的人个个都是王的臣子。可有的人在家躺着歇息、喝酒享乐，有的人却从早忙到晚，实在太不公平啦。",
      }
      ],
    },
    {
      title: "无将大车 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《无将大车》意境插画：无将大车，祇自尘兮。无思百忧，祇自疧兮。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "无将大车，祇自尘兮。无思百忧，祇自疧兮。\n无将大车，维尘冥冥。无思百忧，不出于颎。\n无将大车，维尘雍兮。无思百忧，祇自重兮。",
        pinyin: "wú jiāng dà chē， qí zì chén xī。 wú sī bǎi yōu， qí zì qí xī。\nwú jiāng dà chē， wéi chén míng míng。 wú sī bǎi yōu， bù chū yú jiǒng。\nwú jiāng dà chē， wéi chén yōng xī。 wú sī bǎi yōu， qí zì zhòng xī。",
        translation: "不要去推那辆大车，只会扬起尘土弄脏自己；不要去想那些忧烦的事，只会让自己难过生病。",
      }
      ],
    },
    {
      title: "小明 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《小明》意境插画：明明上天，照临下土。我征徂西，至于艽野。二月初吉，载离寒暑。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "明明上天，照临下土。我征徂西，至于艽野。二月初吉，载离寒暑。\n心之忧矣，其毒大苦。念彼共人，涕零如雨。岂不怀归？畏此罪罟！\n昔我往矣，日月方除。曷云其还？岁聿云莫。念我独兮，我事孔庶。\n心之忧矣，惮我不暇。念彼共人，眷眷怀顾！岂不怀归？畏此谴怒。\n昔我往矣，日月方奥。曷云其还？政事愈蹙。岁聿云莫，采萧获菽。\n心之忧矣，自诒伊戚。念彼共人，兴言出宿。岂不怀归？畏此反复。\n嗟尔君子，无恒安处。靖共尔位，正直是与。神之听之，式谷以女。\n嗟尔君子，无恒安息。靖共尔位，好是正直。神之听之，介尔景福。",
        pinyin: "míng míng shàng tiān， zhào lín xià tǔ。 wǒ zhēng cú xī， zhì yú jiāo yě。 èr yuè chū jí， zǎi lí hán shǔ。\nxīn zhī yōu yǐ， qí dú dà kǔ。 niàn bǐ gòng rén， tì líng rú yǔ。 qǐ bù huái guī？ wèi cǐ zuì gǔ！\nxī wǒ wǎng yǐ， rì yuè fāng chú。 hé yún qí hái？ suì yù yún mò。 niàn wǒ dú xī， wǒ shì kǒng shù。\nxīn zhī yōu yǐ， dàn wǒ bù xiá。 niàn bǐ gòng rén， juàn juàn huái gù！ qǐ bù huái guī？ wèi cǐ qiǎn nù。\nxī wǒ wǎng yǐ， rì yuè fāng ào。 hé yún qí hái？ zhèng shì yù cù。 suì yù yún mò， cǎi xiāo huò shū。\nxīn zhī yōu yǐ， zì yí yī qī。 niàn bǐ gòng rén， xīng yán chū sù。 qǐ bù huái guī？ wèi cǐ fǎn fù。\njiē ěr jūn zǐ， wú héng ān chù。 jìng gòng ěr wèi， zhèng zhí shì yǔ。 shén zhī tīng zhī， shì gǔ yǐ nǚ。\njiē ěr jūn zǐ， wú héng ān xī。 jìng gòng ěr wèi， hǎo shì zhèng zhí。 shén zhī tīng zhī， jiè ěr jǐng fú。",
        translation: "明亮的上天照着大地，我出差去遥远的西方野地，从二月初出发，熬过了一个又一个寒暑。一年到头回不了家，想起家里的人，眼泪像雨点一样落下来。君子们啊，不要老是贪图安逸，要守好本分、做个正直的人，老天会保佑你的。",
      }
      ],
    },
    {
      title: "鼓钟 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《鼓钟》意境插画：鼓钟将将，淮水汤汤，忧心且伤。淑人君子，怀允不忘。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "鼓钟将将，淮水汤汤，忧心且伤。淑人君子，怀允不忘。\n鼓钟喈喈，淮水湝湝，忧心且悲。淑人君子，其德不回。\n鼓钟伐鼛，淮有三洲，忧心且妯。淑人君子，其德不犹。\n鼓钟钦钦，鼓瑟鼓琴，笙磬同音。以雅以南，以龠不僭。",
        pinyin: "gǔ zhōng jiāng jiāng， huái shuǐ tāng tāng， yōu xīn qiě shāng。 shū rén jūn zǐ， huái yǔn bù wàng。\ngǔ zhōng jiē jiē， huái shuǐ jiē jiē， yōu xīn qiě bēi。 shū rén jūn zǐ， qí dé bù huí。\ngǔ zhōng fá gāo， huái yǒu sān zhōu， yōu xīn qiě zhóu。 shū rén jūn zǐ， qí dé bù yóu。\ngǔ zhōng qīn qīn， gǔ sè gǔ qín， shēng qìng tóng yīn。 yǐ yǎ yǐ nán， yǐ yuè bù jiàn。",
        translation: "钟儿敲得锵锵响，淮河水浩浩荡荡，我的心里又忧愁又悲伤。那些善良的君子让人怀念不忘，他们的品德端正没有偏差。敲钟打鼓，又弹瑟又弹琴，笙和磬的声音和谐，一起奏出好听的乐章。",
      }
      ],
    },
    {
      title: "楚茨 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《楚茨》意境插画：楚楚者茨，言抽其棘，自昔何为？我蓺黍稷。我黍与与，我稷翼翼。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "楚楚者茨，言抽其棘，自昔何为？我蓺黍稷。我黍与与，我稷翼翼。\n我仓既盈，我庾维亿。以为酒食，以享以祀，以妥以侑，以介景福。\n济济跄跄，絜尔牛羊，以往烝尝。或剥或亨，或四或将。祝祭于祊，\n祀事孔明。先祖是皇，神保是飨。孝孙有庆，报以介福，万寿无疆！\n执爨踖踖，为俎孔硕，或燔或炙。君妇莫莫，为豆孔庶。为宾为客，\n献酬交错。礼仪卒度，笑语卒获。神保是格，报以介福，万寿攸酢！\n我孔戁矣，式礼莫愆。工祝致告，徂赉孝孙。苾芬孝祀，神嗜饮食。\n卜尔百福，如几如式。既齐既稷，既匡既敕。永锡尔极，时万时亿！\n礼仪既备，钟鼓既戒，孝孙徂位，工祝致告，神具醉止，皇尸载起。\n鼓钟送尸，神保聿归。诸宰君妇，废彻不迟。诸父兄弟，备言燕私。\n乐具入奏，以绥后禄。尔肴既将，莫怨具庆。既醉既饱，小大稽首。\n神嗜饮食，使君寿考。孔惠孔时，维其尽之。子子孙孙，勿替引之！",
        pinyin: "chǔ chǔ zhě cí， yán chōu qí jí， zì xī hé wèi？ wǒ yì shǔ jì。 wǒ shǔ yǔ yǔ， wǒ jì yì yì。\nwǒ cāng jì yíng， wǒ yǔ wéi yì。 yǐ wéi jiǔ shí， yǐ xiǎng yǐ sì， yǐ tuǒ yǐ yòu， yǐ jiè jǐng fú。\njì jì qiàng qiàng， jié ěr niú yáng， yǐ wǎng zhēng cháng。 huò bāo huò hēng， huò sì huò jiāng。 zhù jì yú bēng，\nsì shì kǒng míng。 xiān zǔ shì huáng， shén bǎo shì xiǎng。 xiào sūn yǒu qìng， bào yǐ jiè fú， wàn shòu wú jiāng！\nzhí cuàn jí jí， wèi zǔ kǒng shuò， huò fán huò zhì。 jūn fù mò mò， wèi dòu kǒng shù。 wèi bīn wèi kè，\nxiàn chóu jiāo cuò。 lǐ yí zú dù， xiào yǔ zú huò。 shén bǎo shì gé， bào yǐ jiè fú， wàn shòu yōu cù！\nwǒ kǒng nǎn yǐ， shì lǐ mò qiān。 gōng zhù zhì gào， cú lài xiào sūn。 bì fēn xiào sì， shén shì yǐn shí。\nbǔ ěr bǎi fú， rú jǐ rú shì。 jì qí jì jì， jì kuāng jì chì。 yǒng xī ěr jí， shí wàn shí yì！\nlǐ yí jì bèi， zhōng gǔ jì jiè， xiào sūn cú wèi， gōng zhù zhì gào， shén jù zuì zhǐ， huáng shī zǎi qǐ。\ngǔ zhōng sòng shī， shén bǎo yù guī。 zhū zǎi jūn fù， fèi chè bù chí。 zhū fù xiōng dì， bèi yán yàn sī。\nlè jù rù zòu， yǐ suí hòu lù。 ěr yáo jì jiāng， mò yuàn jù qìng。 jì zuì jì bǎo， xiǎo dà qǐ shǒu。\nshén shì yǐn shí， shǐ jūn shòu kǎo。 kǒng huì kǒng shí， wéi qí jìn zhī。 zǐ zǐ sūn sūn， wù tì yǐn zhī！",
        translation: "田里的蒺藜密密地长，我们把它们连根拔掉，种上黍子和稷子。庄稼丰收，粮仓装得满满当当，就拿来酿美酒、做好饭，恭恭敬敬祭祀祖先，求上天赐下大福气。祭祀办得整整齐齐，钟鼓一齐响，全家又吃又喝，高高兴兴，子子孙孙都要把这样的礼节传下去。",
      }
      ],
    },
    {
      title: "信南山 · 佚名",
      art: "rice-field",
      artPrompt: "古诗《信南山》意境插画：信彼南山，维禹甸之。畇畇原隰，曾孙田之。我疆我理，南东其亩。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "信彼南山，维禹甸之。畇畇原隰，曾孙田之。我疆我理，南东其亩。\n上天同云。雨雪雰雰，益之以霡霂。既优既渥，既沾既足。生我百谷。\n疆埸翼翼，黍稷彧彧。曾孙之穑，以为酒食。畀我尸宾，寿考万年。\n中田有庐，疆埸有瓜。是剥是菹，献之皇祖。曾孙寿考，受天之祜。\n祭以清酒，从以骍牡，享于祖考。执其鸾刀，以启其毛，取其血膋。\n是烝是享，苾苾芬芬。祀事孔明，先祖是皇。报以介福。万寿无疆。",
        pinyin: "xìn bǐ nán shān， wéi yǔ diàn zhī。 yún yún yuán xí， zēng sūn tián zhī。 wǒ jiāng wǒ lǐ， nán dōng qí mǔ。\nshàng tiān tóng yún。 yǔ xuě fēn fēn， yì zhī yǐ mài mù。 jì yōu jì wò， jì zhān jì zú。 shēng wǒ bǎi gǔ。\njiāng yì yì yì， shǔ jì yù yù。 zēng sūn zhī sè， yǐ wéi jiǔ shí。 bì wǒ shī bīn， shòu kǎo wàn nián。\nzhōng tián yǒu lú， jiāng yì yǒu guā。 shì bāo shì zū， xiàn zhī huáng zǔ。 zēng sūn shòu kǎo， shòu tiān zhī hù。\njì yǐ qīng jiǔ， cóng yǐ xīng mǔ， xiǎng yú zǔ kǎo。 zhí qí luán dāo， yǐ qǐ qí máo， qǔ qí xuè liáo。\nshì zhēng shì xiǎng， bì bì fēn fēn。 sì shì kǒng míng， xiān zǔ shì huáng。 bào yǐ jiè fú。 wàn shòu wú jiāng。",
        translation: "终南山坡绵延伸展，大禹治过水，子孙在田里耕种。天上浓云密布，雪花纷纷落下，又添上细细的小雨，土地湿润肥足，长出了百样庄稼。田埂上还种着瓜，摘来腌好献给祖先，祭祀办得干净周到，祖先赐福，让人万寿无疆。",
      }
      ],
    },
    {
      title: "甫田 · 佚名",
      art: "rice-field",
      artPrompt: "古诗《甫田》意境插画：倬彼甫田，岁取十千。我取其陈，食我农人。自古有年。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "倬彼甫田，岁取十千。我取其陈，食我农人。自古有年。\n今适南亩，或耘或耔。黍稷薿薿，攸介攸止，烝我髦士。\n以我齐明，与我牺羊，以社以方。我田既臧，农夫之庆。\n琴瑟击鼓，以御田祖。以祈甘雨，以介我稷黍，以谷我士女。\n曾孙来止，以其妇子。馌彼南亩，田畯至喜。攘其左右，\n尝其旨否。禾易长亩，终善且有。曾孙不怒，农夫克敏。\n曾孙之稼，如茨如梁。曾孙之庾，如坻如京。乃求千斯仓，\n乃求万斯箱。黍稷稻粱，农夫之庆。报以介福，万寿无疆。",
        pinyin: "zhuō bǐ fǔ tián， suì qǔ shí qiān。 wǒ qǔ qí chén， shí wǒ nóng rén。 zì gǔ yǒu nián。\njīn shì nán mǔ， huò yún huò zǐ。 shǔ jì nǐ nǐ， yōu jiè yōu zhǐ， zhēng wǒ máo shì。\nyǐ wǒ qí míng， yǔ wǒ xī yáng， yǐ shè yǐ fāng。 wǒ tián jì zāng， nóng fū zhī qìng。\nqín sè jī gǔ， yǐ yù tián zǔ。 yǐ qí gān yǔ， yǐ jiè wǒ jì shǔ， yǐ gǔ wǒ shì nǚ。\ncéng sūn lái zhǐ， yǐ qí fù zǐ。 yè bǐ nán mǔ， tián jùn zhì xǐ。 rǎng qí zuǒ yòu，\ncháng qí zhǐ fǒu。 hé yì cháng mǔ， zhōng shàn qiě yǒu。 zēng sūn bù nù， nóng fū kè mǐn。\ncéng sūn zhī jià， rú cí rú liáng。 zēng sūn zhī yǔ， rú dǐ rú jīng。 nǎi qiú qiān sī cāng，\nnǎi qiú wàn sī xiāng。 shǔ jì dào liáng， nóng fū zhī qìng。 bào yǐ jiè fú， wàn shòu wú jiāng。",
        translation: "那宽阔的大田，每年收成上万。人们到南边的田里除草培土，黍稷长得又密又壮；弹琴打鼓迎接田祖，祈求好雨，盼着庄稼长好、男女老少都吃饱。庄稼堆得像屋顶像小山，要上千座仓、上万辆车才装得下，这是农夫的大喜事，大家一起祝愿万寿无疆。",
      }
      ],
    },
    {
      title: "大田 · 佚名",
      art: "rice-field",
      artPrompt: "古诗《大田》意境插画：大田多稼，既种既戒，既备乃事。以我覃耜，俶载南亩。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "大田多稼，既种既戒，既备乃事。以我覃耜，俶载南亩。\n播厥百谷，既庭且硕，曾孙是若。\n既方既皂，既坚既好，不稂不莠。去其螟螣，及其蟊贼，\n无害我田稚。田祖有神，秉畀炎火。\n有渰萋萋，兴雨祈祈。雨我公田，遂及我私。彼有不获稚，\n此有不敛穧，彼有遗秉，此有滞穗，伊寡妇之利。\n曾孙来止，以其妇子。馌彼南亩，田畯至喜。来方禋祀，\n以其骍黑，与其黍稷。以享以祀，以介景福。",
        pinyin: "dà tián duō jià， jì zhǒng jì jiè， jì bèi nǎi shì。 yǐ wǒ qín sì， chù zǎi nán mǔ。\nbō jué bǎi gǔ， jì tíng qiě shuò， zēng sūn shì ruò。\njì fāng jì zào， jì jiān jì hǎo， bù láng bù yǒu。 qù qí míng téng， jí qí máo zéi，\nwú hài wǒ tián zhì。 tián zǔ yǒu shén， bǐng bì yán huǒ。\nyǒu yǎn qī qī， xīng yǔ qí qí。 yǔ wǒ gōng tián， suì jí wǒ sī。 bǐ yǒu bù huò zhì，\ncǐ yǒu bù liǎn jì， bǐ yǒu yí bǐng， cǐ yǒu zhì suì， yī guǎ fù zhī lì。\ncéng sūn lái zhǐ， yǐ qí fù zǐ。 yè bǐ nán mǔ， tián jùn zhì xǐ。 lái fāng yīn sì，\nyǐ qí xīng hēi， yǔ qí shǔ jì。 yǐ xiǎng yǐ sì， yǐ jiè jǐng fú。",
        translation: "大田里要种好多庄稼，种子选好、农具备齐，用锋利的犁翻开南边的田，播下百样谷子，苗儿长得又直又大。抽穗结实，颗粒饱满，没有稂草没有莠草，还要除去那些害虫，别让它们伤害我的小苗；大雨下到公田里，也跟着下到我的私田里。收割时落下的谷穗，就留给寡妇去捡吧。",
      }
      ],
    },
    {
      title: "瞻彼洛矣 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《瞻彼洛矣》意境插画：瞻彼洛矣，维水泱泱。君子至止，福禄如茨。韎韐有奭，以作六师。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "瞻彼洛矣，维水泱泱。君子至止，福禄如茨。韎韐有奭，以作六师。\n瞻彼洛矣，维水泱泱。君子至止，鞸琫有珌。君子万年，保其家室。\n瞻彼洛矣，维水泱泱。君子至止，福禄既同。君子万年，保其家邦。",
        pinyin: "zhān bǐ luò yǐ， wéi shuǐ yāng yāng。 jūn zǐ zhì zhǐ， fú lù rú cí。 mèi gé yǒu shì， yǐ zuò liù shī。\nzhān bǐ luò yǐ， wéi shuǐ yāng yāng。 jūn zǐ zhì zhǐ， bì běng yǒu bì。 jūn zǐ wàn nián， bǎo qí jiā shì。\nzhān bǐ luò yǐ， wéi shuǐ yāng yāng。 jūn zǐ zhì zhǐ， fú lù jì tóng。 jūn zǐ wàn nián， bǎo qí jiā bāng。",
        translation: "看那洛水呀，河水浩浩荡荡。君子来到了，福禄多得像堆起来的草垛；愿君子万年长寿，守住他的家室、护住他的家邦。",
      }
      ],
    },
    {
      title: "裳裳者华 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《裳裳者华》意境插画：裳裳者华，其叶湑兮。我觏之子，我心写兮。我心写兮，是以有誉处兮。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "裳裳者华，其叶湑兮。我觏之子，我心写兮。我心写兮，是以有誉处兮。\n裳裳者华，芸其黄矣。我觏之子，维其有章矣。维其有章矣，是以有庆矣。\n裳裳者华，或黄或白。我觏之子，乘其四骆。乘其四骆，六辔沃若。\n左之左之，君子宜之。右之右之，君子有之。维其有之，是以似之。",
        pinyin: "shang shang zhě huá， qí yè xǔ xī。 wǒ gòu zhī zǐ， wǒ xīn xiě xī。 wǒ xīn xiě xī， shì yǐ yǒu yù chù xī。\nshang shang zhě huá， yún qí huáng yǐ。 wǒ gòu zhī zǐ， wéi qí yǒu zhāng yǐ。 wéi qí yǒu zhāng yǐ， shì yǐ yǒu qìng yǐ。\nshang shang zhě huá， huò huáng huò bái。 wǒ gòu zhī zǐ， chéng qí sì luò。 chéng qí sì luò， liù pèi wò ruò。\nzuǒ zhī zuǒ zhī， jūn zǐ yí zhī。 yòu zhī yòu zhī， jūn zǐ yǒu zhī。 wéi qí yǒu zhī， shì yǐ sì zhī。",
        translation: "花儿开得亮堂堂，叶子长得又密又好。我遇见了那个人，心里的欢喜全都舒展开来。他左也能行，右也能行，有这样的本领，做什么都合适。",
      }
      ],
    },
    {
      title: "桑扈 · 佚名",
      art: "spring-bird",
      artPrompt: "古诗《桑扈》意境插画：交交桑扈，有莺其羽。君子乐胥，受天之祜。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "交交桑扈，有莺其羽。君子乐胥，受天之祜。\n交交桑扈，有莺其领。君子乐胥，万邦之屏。\n之屏之翰，百辟为宪。不戢不难，受福不那。\n兕觥其觩，旨酒思柔。彼交匪敖，万福来求。",
        pinyin: "jiāo jiāo sāng hù， yǒu yīng qí yǔ。 jūn zǐ lè xū， shòu tiān zhī hù。\njiāo jiāo sāng hù， yǒu yīng qí lǐng。 jūn zǐ lè xū， wàn bāng zhī píng。\nzhī píng zhī hàn， bǎi pì wèi xiàn。 bù jí bù nán， shòu fú bù nà。\nsì gōng qí qiú， zhǐ jiǔ sī róu。 bǐ jiāo fěi áo， wàn fú lái qiú。",
        translation: "桑扈鸟叽叽地叫，羽毛真漂亮。君子快乐又欢喜，承受上天的福禄，做万国的屏障。举起弯弯的牛角酒杯，美酒柔和香醇，他不骄傲不自大，各样的福气都来归他。",
      }
      ],
    },
    {
      title: "鸳鸯 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《鸳鸯》意境插画：鸳鸯于飞，毕之罗之。君子万年，福禄宜之。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "鸳鸯于飞，毕之罗之。君子万年，福禄宜之。\n鸳鸯在梁，戢其左翼。君子万年，\n宜其遐福。乘马在厩，摧之秣之。君子万年，福禄艾之。\n乘马在厩，秣之摧之。君子万年，福禄绥之。",
        pinyin: "yuān yāng yú fēi， bì zhī luó zhī。 jūn zǐ wàn nián， fú lù yí zhī。\nyuān yāng zài liáng， jí qí zuǒ yì。 jūn zǐ wàn nián，\nyí qí xiá fú。 chéng mǎ zài jiù， cuī zhī mò zhī。 jūn zǐ wàn nián， fú lù ài zhī。\nchéng mǎ zài jiù， mò zhī cuī zhī。 jūn zǐ wàn nián， fú lù suí zhī。",
        translation: "鸳鸯双双地飞，用小网大网把它们捉住。祝愿君子万年长寿，福禄正合适。马儿喂饱养在厩里，愿君子万年长寿，福禄安安稳稳地跟着他。",
      }
      ],
    },
    {
      title: "𫠆弁 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《𫠆弁》意境插画：有𫠆者弁，实维伊何？尔酒既旨，尔肴既嘉。岂伊异人？兄弟匪他。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "有𫠆者弁，实维伊何？尔酒既旨，尔肴既嘉。岂伊异人？兄弟匪他。\n茑与女萝，施于松柏。未见君子，忧心奕奕；既见君子，庶几说怿。\n有𫠆者弁，实维何期？尔酒既旨，尔肴既时。岂伊异人？兄弟具来。\n茑与女萝，施于松上。未见君子，忧心怲怲；既见君子，庶几有臧。\n有𫠆者弁，实维在首。尔酒既旨，尔肴既阜。岂伊异人？兄弟甥舅。\n如彼雨雪，先集维霰。死丧无日，无几相见。乐酒今夕，君子维宴。",
        pinyin: "yǒu kuǐ zhě biàn， shí wéi yī hé？ ěr jiǔ jì zhǐ， ěr yáo jì jiā。 qǐ yī yì rén？ xiōng dì fěi tā。\nniǎo yǔ nǚ luó， shī yú sōng bǎi。 wèi jiàn jūn zǐ， yōu xīn yì yì； jì jiàn jūn zǐ， shù jī shuō yì。\nyǒu kuǐ zhě biàn， shí wéi hé qī？ ěr jiǔ jì zhǐ， ěr yáo jì shí。 qǐ yī yì rén？ xiōng dì jù lái。\nniǎo yǔ nǚ luó， shī yú sōng shàng。 wèi jiàn jūn zǐ， yōu xīn bǐng bǐng； jì jiàn jūn zǐ， shù jī yǒu zāng。\nyǒu kuǐ zhě biàn， shí wéi zài shǒu。 ěr jiǔ jì zhǐ， ěr yáo jì fù。 qǐ yī yì rén？ xiōng dì shēng jiù。\nrú bǐ yǔ xuě， xiān jí wéi xiàn。 sǐ sàng wú rì， wú jǐ xiāng jiàn。 lè jiǔ jīn xī， jūn zǐ wéi yàn。",
        translation: "头上戴着圆圆的皮帽，是为了什么呢？您的酒那么美，菜那么香，来的不是外人，都是自家兄弟和亲戚。没见到君子时，心里忧虑不安；见到了就满心欢喜。今晚就快快乐乐地喝酒吧，谁知道往后还能见上几次呢。",
      }
      ],
    },
    {
      title: "车舝 · 佚名",
      art: "spring-bird",
      artPrompt: "古诗《车舝》意境插画：间关车之舝兮，思娈季女逝兮。匪饥匪渴，德音来括。虽无好友？式燕且喜。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "间关车之舝兮，思娈季女逝兮。匪饥匪渴，德音来括。虽无好友？式燕且喜。\n依彼平林，有集维鷮。辰彼硕女，令德来教。式燕且誉，好尔无射。\n虽无旨酒？式饮庶几。虽无嘉肴？式食庶几。虽无德与女？式歌且舞？\n陟彼高冈，析其柞薪。析其柞薪，其叶湑兮。鲜我觏尔，我心写兮。\n高山仰止，景行行止。四牡𬴂𬴂，六辔如琴。觏尔新婚，以慰我心。",
        pinyin: "jiān guān chē zhī xiá xī， sī luán jì nǚ shì xī。 fěi jī fěi kě， dé yīn lái kuò。 suī wú hǎo yǒu？ shì yàn qiě xǐ。\nyī bǐ píng lín， yǒu jí wéi jiāo。 chén bǐ shuò nǚ， lìng dé lái jiào。 shì yàn qiě yù， hǎo ěr wú shè。\nsuī wú zhǐ jiǔ？ shì yǐn shù jī。 suī wú jiā yáo？ shì shí shù jī。 suī wú dé yǔ nǚ？ shì gē qiě wǔ？\nzhì bǐ gāo gāng， xī qí zhà xīn。 xī qí zhà xīn， qí yè xǔ xī。 xiān wǒ gòu ěr， wǒ xīn xiě xī。\ngāo shān yǎng zhǐ， jǐng xíng xíng zhǐ。 sì mǔ fēi fēi， liù pèi rú qín。 gòu ěr xīn hūn， yǐ wèi wǒ xīn。",
        translation: "车上的闸吱吱地响，美丽的姑娘要出嫁啦。不饿也不渴，是盼着同她那美好的名声相聚。高山要抬头仰望，大路要大步前行；四匹马跑得轻快，六条缰绳像琴弦一样和谐，迎到新婚的你，心里真安慰。",
      }
      ],
    },
    {
      title: "青蝇 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《青蝇》意境插画：营营青蝇，止于樊。岂弟君子，无信谗言。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "营营青蝇，止于樊。岂弟君子，无信谗言。\n营营青蝇，止于棘。谗人罔极，交乱四国。\n营营青蝇，止于榛。谗人罔极，构我二人。",
        pinyin: "yíng yíng qīng yíng， zhǐ yú fán。 kǎi tì jūn zǐ， wú xìn chán yán。\nyíng yíng qīng yíng， zhǐ yú jí。 chán rén wǎng jí， jiāo luàn sì guó。\nyíng yíng qīng yíng， zhǐ yú zhēn。 chán rén wǎng jí， gòu wǒ èr rén。",
        translation: "嗡嗡乱飞的青苍蝇，落在篱笆上。和乐的君子呀，不要听信谗言。说坏话的人没完没了，会搅乱四方国家，还会挑拨我们两个人。",
      }
      ],
    },
    {
      title: "宾之初筵 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《宾之初筵》意境插画：宾之初筵，左右秩秩。笾豆有楚，殽核维旅。酒既和旨，饮酒孔偕。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "宾之初筵，左右秩秩。笾豆有楚，殽核维旅。酒既和旨，饮酒孔偕。\n钟鼓既设，举酬逸逸。大侯既抗，弓矢斯张。射夫既同，献尔发功。\n发彼有的，以祈尔爵。\n籥舞笙鼓，乐既和奏。烝衎烈祖，以洽百礼。百礼既至，有壬有林。\n锡尔纯嘏，子孙其湛。其湛曰乐，各奏尔能。宾载手仇，室人入又。\n酌彼康爵，以奏尔时。\n宾之初筵，温温其恭。其未醉止，威仪反反。曰既醉止，威仪幡幡。\n舍其坐迁，屡舞仙仙。其未醉止，威仪抑抑。曰既醉止，威仪抑抑。\n是曰既醉，不知其秩。\n宾既醉止，载号载呶。乱我笾豆，屡舞僛僛。是曰既醉，不知其邮。\n侧弁之俄，屡舞傞傞。既醉而出，并受其福。醉而不出，是谓伐德。\n饮酒孔嘉，维其令仪。\n凡此饮酒，或醉或否。既立之监，或佐之史。彼醉不臧，不醉反耻。\n式勿从谓，无俾大怠。匪言勿言，匪由勿语。由醉之言，俾出童羖。\n三爵不识，矧敢多又。",
        pinyin: "bīn zhī chū yán， zuǒ yòu zhì zhì。 biān dòu yǒu chǔ， yáo hé wéi lǚ。 jiǔ jì hé zhǐ， yǐn jiǔ kǒng xié。\nzhōng gǔ jì shè， jǔ chóu yì yì。 dà hóu jì kàng， gōng shǐ sī zhāng。 shè fū jì tóng， xiàn ěr fā gōng。\nfā bǐ yǒu de， yǐ qí ěr jué。\nyuè wǔ shēng gǔ， lè jì hé zòu。 zhēng kàn liè zǔ， yǐ qià bǎi lǐ。 bǎi lǐ jì zhì， yǒu rén yǒu lín。\nxī ěr chún gǔ， zǐ sūn qí zhàn。 qí zhàn yuē lè， gè zòu ěr néng。 bīn zǎi shǒu chóu， shì rén rù yòu。\nzhuó bǐ kāng jué， yǐ zòu ěr shí。\nbīn zhī chū yán， wēn wēn qí gōng。 qí wèi zuì zhǐ， wēi yí fǎn fǎn。 yuē jì zuì zhǐ， wēi yí fān fān。\nshè qí zuò qiān， lǚ wǔ xiān xiān。 qí wèi zuì zhǐ， wēi yí yì yì。 yuē jì zuì zhǐ， wēi yí yì yì。\nshì yuē jì zuì， bù zhī qí zhì。\nbīn jì zuì zhǐ， zǎi hào zǎi náo。 luàn wǒ biān dòu， lǚ wǔ qī qī。 shì yuē jì zuì， bù zhī qí yóu。\ncè biàn zhī é， lǚ wǔ suō suō。 jì zuì ér chū， bìng shòu qí fú。 zuì ér bù chū， shì wèi fá dé。\nyǐn jiǔ kǒng jiā， wéi qí lìng yí。\nfán cǐ yǐn jiǔ， huò zuì huò fǒu。 jì lì zhī jiān， huò zuǒ zhī shǐ。 bǐ zuì bù zāng， bù zuì fǎn chǐ。\nshì wù cóng wèi， wú bǐ dà dài。 fěi yán wù yán， fěi yóu wù yǔ。 yóu zuì zhī yán， bǐ chū tóng gǔ。\nsān jué bù shí， shěn gǎn duō yòu。",
        translation: "客人刚入席时，左右都规规矩矩，杯盘摆得整整齐齐，酒香人和，举杯行礼都有秩序。可是一喝醉就变了样：离了座位乱摇乱跳，帽子也歪了，还大吵大叫。喝酒本来是件好事，可一定要保持好样子才对呀。",
      }
      ],
    },
    {
      title: "鱼藻 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《鱼藻》意境插画：鱼在在藻，有颁其首。王在在镐，岂乐饮酒。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "鱼在在藻，有颁其首。王在在镐，岂乐饮酒。\n鱼在在藻，有莘其尾。王在在镐，饮酒乐岂。\n鱼在在藻，依于其蒲。王在在镐，有那其居。",
        pinyin: "yú zài zài zǎo， yǒu bān qí shǒu。 wáng zài zài hào， qǐ lè yǐn jiǔ。\nyú zài zài zǎo， yǒu shēn qí wěi。 wáng zài zài hào， yǐn jiǔ lè qǐ。\nyú zài zài zǎo， yī yú qí pú。 wáng zài zài hào， yǒu nà qí jū。",
        translation: "鱼儿待在哪里？待在水草里，大大的脑袋摆来摆去。王在哪里？王在镐京，欢欢喜喜地喝酒；他的宫殿又宽又大，安乐又自在。",
      }
      ],
    },
    {
      title: "采菽 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《采菽》意境插画：采菽采菽，筐之莒之。君子来朝，何锡予之？虽无予之？路车乘马。又何予之？玄衮及黼。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "采菽采菽，筐之莒之。君子来朝，何锡予之？虽无予之？路车乘马。又何予之？玄衮及黼。\n觱沸槛泉，言采其芹。君子来朝，言观其旗。其旗淠淠，鸾声嘒嘒。载骖载驷，君子所届。\n赤芾在股，邪幅在下。彼交匪纾，天子所予。乐只君子，天子命之。乐只君子，福禄申之。\n维柞之枝，其叶蓬蓬。乐只君子，殿天子之邦。乐只君子，万福攸同。平平左右，亦是率从。\n泛泛杨舟，绋纚维之。乐只君子，天子葵之。乐只君子，福禄膍之。优哉游哉，亦是戾矣。",
        pinyin: "cǎi shū cǎi shū， kuāng zhī jǔ zhī。 jūn zǐ lái cháo， hé xī yǔ zhī？ suī wú yǔ zhī？ lù chē chéng mǎ。 yòu hé yǔ zhī？ xuán gǔn jí fǔ。\nbì fèi kǎn quán， yán cǎi qí qín。 jūn zǐ lái cháo， yán guān qí qí。 qí qí pì pì， luán shēng huì huì。 zǎi cān zǎi sì， jūn zǐ suǒ jiè。\nchì fèi zài gǔ， xié fú zài xià。 bǐ jiāo fěi shū， tiān zǐ suǒ yǔ。 lè zhī jūn zǐ， tiān zǐ mìng zhī。 lè zhī jūn zǐ， fú lù shēn zhī。\nwéi zhà zhī zhī， qí yè péng péng。 lè zhī jūn zǐ， diàn tiān zǐ zhī bāng。 lè zhī jūn zǐ， wàn fú yōu tóng。 píng píng zuǒ yòu， yì shì lǜ cóng。\nfàn fàn yáng zhōu， fú lí wéi zhī。 lè zhī jūn zǐ， tiān zǐ kuí zhī。 lè zhī jūn zǐ， fú lù pí zhī。 yōu zāi yóu zāi， yì shì lì yǐ。",
        translation: "采大豆呀采大豆，用方筐圆筐来装。诸侯来朝见天子，天子赏给他大车骏马，还有黑色的龙袍和绣花的礼服。快乐的君子是天子任命的，福禄重重，又安稳又自在。",
      }
      ],
    },
    {
      title: "角弓 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《角弓》意境插画：骍骍角弓，翩其反矣。兄弟婚姻，无胥远矣。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "骍骍角弓，翩其反矣。兄弟婚姻，无胥远矣。\n尔之远矣，民胥然矣。尔之教矣，民胥效矣。\n此令兄弟，绰绰有裕。不令兄弟，交相为愈。\n民之无良，相怨一方。受爵不让，至于已斯亡。\n老马反为驹，不顾其后。如食宜饇，如酌孔取。\n毋教猱升木，如涂涂附。君子有徽猷，小人与属。\n雨雪瀌瀌，见𬀪曰消。莫肯下遗，式居娄骄。\n雨雪浮浮，见𬀪曰流。如蛮如髦，我是用忧。",
        pinyin: "xīng xīng jiǎo gōng， piān qí fǎn yǐ。 xiōng dì hūn yīn， wú xū yuǎn yǐ。\něr zhī yuǎn yǐ， mín xū rán yǐ。 ěr zhī jiào yǐ， mín xū xiào yǐ。\ncǐ lìng xiōng dì， chuò chuò yǒu yù。 bù lìng xiōng dì， jiāo xiāng wèi yù。\nmín zhī wú liáng， xiāng yuàn yī fāng。 shòu jué bù ràng， zhì yú yǐ sī wáng。\nlǎo mǎ fǎn wèi jū， bù gù qí hòu。 rú shí yí yù， rú zhuó kǒng qǔ。\nwú jiāo náo shēng mù， rú tú tú fù。 jūn zǐ yǒu huī yóu， xiǎo rén yǔ shǔ。\nyǔ xuě biāo biāo， jiàn xiàn yuē xiāo。 mò kěn xià yí， shì jū lóu jiāo。\nyǔ xuě fú fú， jiàn xiàn yuē liú。 rú mán rú máo， wǒ shì yòng yōu。",
        translation: "调好的角弓，一放松就往外翻。兄弟和亲戚之间，不要互相疏远；你若疏远他们，百姓也会跟着学。好兄弟相处宽厚从容，坏兄弟却互相伤害，让人多么担忧啊。",
      }
      ],
    },
    {
      title: "菀柳 · 佚名",
      art: "forest-path",
      artPrompt: "古诗《菀柳》意境插画：有菀者柳，不尚息焉。上帝甚蹈，无自暱焉。俾予靖之，后予极焉。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "有菀者柳，不尚息焉。上帝甚蹈，无自暱焉。俾予靖之，后予极焉。\n有菀者柳，不尚愒焉。上帝甚蹈，无自瘵焉。俾予靖之，后予迈焉。\n有鸟高飞，亦傅于天。彼人之心，于何其臻。曷予靖之，居以凶矜。",
        pinyin: "yǒu wǎn zhě liǔ， bù shàng xī yān。 shàng dì shèn dǎo， wú zì nì yān。 bǐ yǔ jìng zhī， hòu yǔ jí yān。\nyǒu wǎn zhě liǔ， bù shàng kài yān。 shàng dì shèn dǎo， wú zì zhài yān。 bǐ yǔ jìng zhī， hòu yǔ mài yān。\nyǒu niǎo gāo fēi， yì fù yú tiān。 bǐ rén zhī xīn， yú hé qí zhēn。 hé yǔ jìng zhī， jū yǐ xiōng jīn。",
        translation: "那茂盛的大柳树，谁不想在树下歇一歇？可那人喜怒无常，不要去亲近他。他叫我去办事，过后却惩罚我；鸟儿飞得再高也有天拦着，那个人的心思却没有个尽头。",
      }
      ],
    },
    {
      title: "都人士 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《都人士》意境插画：彼都人士，狐裘黄黄。其容不改，出言有章。行归于周，万民所望。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "彼都人士，狐裘黄黄。其容不改，出言有章。行归于周，万民所望。\n彼都人士，台笠缁撮。彼君子女，绸直如发。我不见兮，我心不说。\n彼都人士，充耳琇实。彼君子女，谓之尹吉。我不见兮，我心苑结。\n彼都人士，垂带而厉。彼君子女，卷发如虿。我不见兮，言从之迈。\n匪伊垂之，带则有余。匪伊卷之，发则有旟。我不见兮，云何盱矣。",
        pinyin: "bǐ dōu rén shì， hú qiú huáng huáng。 qí róng bù gǎi， chū yán yǒu zhāng。 xíng guī yú zhōu， wàn mín suǒ wàng。\nbǐ dōu rén shì， tái lì zī cuō。 bǐ jūn zǐ nǚ， chóu zhí rú fā。 wǒ bù jiàn xī， wǒ xīn bù shuō。\nbǐ dōu rén shì， chōng ěr xiù shí。 bǐ jūn zǐ nǚ， wèi zhī yǐn jí。 wǒ bù jiàn xī， wǒ xīn yuàn jié。\nbǐ dōu rén shì， chuí dài ér lì。 bǐ jūn zǐ nǚ， juǎn fà rú chài。 wǒ bù jiàn xī， yán cóng zhī mài。\nfěi yī chuí zhī， dài zé yǒu yú。 fěi yī juàn zhī， fā zé yǒu yú。 wǒ bù jiàn xī， yún hé xū yǐ。",
        translation: "那些京城的人士，穿着黄黄的狐皮袍，举止从容不变样，说话文雅有章法。还有那些姑娘们，头发又直又美，鬓发翘翘的真好看。如今见不到他们，我心里难过又伤感啊。",
      }
      ],
    },
    {
      title: "采绿 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《采绿》意境插画：终朝采绿，不盈一匊。予发曲局，薄言归沐。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "终朝采绿，不盈一匊。予发曲局，薄言归沐。\n终朝采蓝，不盈一襜。五日为期，六日不詹。\n之子于狩，言韔其弓。之子于钓，言纶之绳。\n其钓维何？维鲂及鱮。维鲂及鱮，薄言观者。",
        pinyin: "zhōng cháo cǎi lǜ， bù yíng yī jū。 yǔ fā qǔ jú， báo yán guī mù。\nzhōng cháo cǎi lán， bù yíng yī chān。 wǔ rì wéi qī， liù rì bù zhān。\nzhī zǐ yú shòu， yán chàng qí gōng。 zhī zǐ yú diào， yán lún zhī shéng。\nqí diào wéi hé？ wéi fáng jí xù。 wéi fáng jí xù， báo yán guān zhě。",
        translation: "整个早上采荩草，采不满一小捧，我的头发乱蓬蓬，还是回家洗一洗吧。说好五天就回来，过了六天还不见人影。你要是去打猎，我为你装好弓；你要是去钓鱼，我为你理好线，钓来鲂鱼和鲢鱼，让大家都来看。",
      }
      ],
    },
    {
      title: "黍苗 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《黍苗》意境插画：芃芃黍苗，阴雨膏之。悠悠南行，召伯劳之。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "芃芃黍苗，阴雨膏之。悠悠南行，召伯劳之。\n我任我辇，我车我牛。我行既集，盖云归哉。\n我徒我御，我师我旅。我行既集，盖云归处。\n肃肃谢功，召伯营之。烈烈征师，召伯成之。\n原隰既平，泉流既清。召伯有成，王心则宁。",
        pinyin: "péng péng shǔ miáo， yīn yǔ gāo zhī。 yōu yōu nán xíng， zhào bó láo zhī。\nwǒ rèn wǒ niǎn， wǒ chē wǒ niú。 wǒ xíng jì jí， gài yún guī zāi。\nwǒ tú wǒ yù， wǒ shī wǒ lǚ。 wǒ xíng jì jí， gài yún guī chù。\nsù sù xiè gōng， zhào bó yíng zhī。 liè liè zhēng shī， zhào bó chéng zhī。\nyuán xí jì píng， quán liú jì qīng。 zhào bó yǒu chéng， wáng xīn zé níng。",
        translation: "茂盛的黍苗，靠绵绵细雨滋润；我们长途往南走，有召伯来慰劳。拉车的拉车，赶牛的赶牛，事办好了，大家高高兴兴回家去。土地平整了，泉水疏通了，召伯把事情办成，王的心也就安定了。",
      }
      ],
    },
    {
      title: "隰桑 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《隰桑》意境插画：隰桑有阿，其叶有难。既见君子，其乐如何。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "隰桑有阿，其叶有难。既见君子，其乐如何。\n隰桑有阿，其叶有沃。既见君子，云何不乐。\n隰桑有阿，其叶有幽。既见君子，德音孔胶。\n心乎爱矣，遐不谓矣？中心藏之，何日忘之！",
        pinyin: "xí sāng yǒu ā， qí yè yǒu nán。 jì jiàn jūn zǐ， qí lè rú hé。\nxí sāng yǒu ā， qí yè yǒu wò。 jì jiàn jūn zǐ， yún hé bù lè。\nxí sāng yǒu ā， qí yè yǒu yōu。 jì jiàn jūn zǐ， dé yīn kǒng jiāo。\nxīn hū ài yǐ， xiá bù wèi yǐ？ zhōng xīn cáng zhī， hé rì wàng zhī！",
        translation: "洼地的桑树多柔美，叶子又多又嫩。见到了那位君子，那快乐真是说不完。心里深深爱着他，把他藏在心底，哪一天能忘记呢！",
      }
      ],
    },
    {
      title: "白华 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《白华》意境插画：白华菅兮，白茅束兮。之子之远，俾我独兮。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "白华菅兮，白茅束兮。之子之远，俾我独兮。\n英英白云，露彼菅茅。天步艰难，之子不犹。\n滮池北流，浸彼稻田。啸歌伤怀，念彼硕人。\n樵彼桑薪，卬烘于煁。维彼硕人，实劳我心。\n鼓钟于宫，声闻于外。念子懆懆，视我迈迈。\n有鹙在梁，有鹤在林。维彼硕人，实劳我心。\n鸳鸯在梁，戢其左翼。之子无良，二三其德。\n有扁斯石，履之卑兮。之子之远，俾我疧兮。",
        pinyin: "bái huá jiān xī， bái máo shù xī。 zhī zǐ zhī yuǎn， bǐ wǒ dú xī。\nyīng yīng bái yún， lù bǐ jiān máo。 tiān bù jiān nán， zhī zǐ bù yóu。\nbiāo chí běi liú， jìn bǐ dào tián。 xiào gē shāng huái， niàn bǐ shuò rén。\nqiáo bǐ sāng xīn， áng hōng yú chén。 wéi bǐ shuò rén， shí láo wǒ xīn。\ngǔ zhōng yú gōng， shēng wén yú wài。 niàn zǐ cǎo cǎo， shì wǒ mài mài。\nyǒu qiū zài liáng， yǒu hè zài lín。 wéi bǐ shuò rén， shí láo wǒ xīn。\nyuān yāng zài liáng， jí qí zuǒ yì。 zhī zǐ wú liáng， èr sān qí dé。\nyǒu biǎn sī shí， lǚ zhī bēi xī。 zhī zǐ zhī yuǎn， bǐ wǒ qí xī。",
        translation: "白色的菅草花，用白茅草捆起来；那个人疏远了我，让我孤单单一个人。宫里敲钟，外面都听得见，我苦苦想念他，他却对我冷冰冰。鸳鸯还成双成对，那个人却不学好，三心二意变了心。",
      }
      ],
    },
    {
      title: "绵蛮 · 佚名",
      art: "spring-bird",
      artPrompt: "古诗《绵蛮》意境插画：绵蛮黄鸟，止于丘阿。道之云远，我劳如何。饮之食之，教之诲之。命彼后车，谓之载之。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "绵蛮黄鸟，止于丘阿。道之云远，我劳如何。饮之食之，教之诲之。命彼后车，谓之载之。\n绵蛮黄鸟，止于丘隅。岂敢惮行，畏不能趋。饮之食之。教之诲之。命彼后车，谓之载之。\n绵蛮黄鸟，止于丘侧。岂敢惮行，畏不能极。饮之食之，教之诲之。命彼后车，谓之载之。",
        pinyin: "mián mán huáng niǎo， zhǐ yú qiū ā。 dào zhī yún yuǎn， wǒ láo rú hé。 yǐn zhī shí zhī， jiào zhī huì zhī。 mìng bǐ hòu chē， wèi zhī zǎi zhī。\nmián mán huáng niǎo， zhǐ yú qiū yú。 qǐ gǎn dàn xíng， wèi bù néng qū。 yǐn zhī shí zhī。 jiào zhī huì zhī。 mìng bǐ hòu chē， wèi zhī zǎi zhī。\nmián mán huáng niǎo， zhǐ yú qiū cè。 qǐ gǎn dàn xíng， wèi bù néng jí。 yǐn zhī shí zhī， jiào zhī huì zhī。 mìng bǐ hòu chē， wèi zhī zǎi zhī。",
        translation: "小小的黄鸟叫得动听，停在山坳里。路途那么遥远，我累得走不动了。请给我喝的吃的，教我劝我，叫后面的车捎上我一段吧。",
      }
      ],
    },
    {
      title: "瓠叶 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《瓠叶》意境插画：幡幡瓠叶，采之亨之。君子有酒，酌言尝之。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "幡幡瓠叶，采之亨之。君子有酒，酌言尝之。\n有兔斯首，炮之燔之。君子有酒，酌言献之。\n有兔斯首，燔之炙之。君子有酒，酌言酢之。\n有兔斯首，燔之炮之。君子有酒，酌言酬之。",
        pinyin: "fān fān hù yè， cǎi zhī hēng zhī。 jūn zǐ yǒu jiǔ， zhuó yán cháng zhī。\nyǒu tù sī shǒu， pào zhī fán zhī。 jūn zǐ yǒu jiǔ， zhuó yán xiàn zhī。\nyǒu tù sī shǒu， fán zhī zhì zhī。 jūn zǐ yǒu jiǔ， zhuó yán cù zhī。\nyǒu tù sī shǒu， fán zhī pào zhī。 jūn zǐ yǒu jiǔ， zhuó yán chóu zhī。",
        translation: "葫芦叶儿随风摆动，采来煮一煮。君子有美酒，斟满请客人尝一尝。兔肉烧一烧、烤一烤，斟酒敬客，客人回敬，大家你来我往，欢欢喜喜。",
      }
      ],
    },
    {
      title: "渐渐之石 · 佚名",
      art: "sunrise-hills",
      artPrompt: "古诗《渐渐之石》意境插画：渐渐之石，维其高矣。山川悠远，维其劳矣。武人东征，不遑朝矣。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "渐渐之石，维其高矣。山川悠远，维其劳矣。武人东征，不遑朝矣。\n渐渐之石，维其卒矣。山川悠远，曷其没矣？武人东征，不遑出矣。\n有豕白蹢，烝涉波矣。月离于毕，俾滂沱矣。武人东征，不皇他矣。",
        pinyin: "jiàn jiàn zhī shí， wéi qí gāo yǐ。 shān chuān yōu yuǎn， wéi qí láo yǐ。 wǔ rén dōng zhēng， bù huáng cháo yǐ。\njiàn jiàn zhī shí， wéi qí zú yǐ。 shān chuān yōu yuǎn， hé qí méi yǐ？ wǔ rén dōng zhēng， bù huáng chū yǐ。\nyǒu shǐ bái dí， zhēng shè bō yǐ。 yuè lí yú bì， bǐ pāng tuó yǐ。 wǔ rén dōng zhēng， bù huáng tā yǐ。",
        translation: "险峻的山石多么高，山川多么遥远，走得多么劳苦。将士们往东出征，连早晨的空隙都没有，没有一刻能歇息。眼看要下大雨了，将士们还是顾不上别的，一心赶路。",
      }
      ],
    },
    {
      title: "苕之华 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《苕之华》意境插画：苕之华，芸其黄矣。心之忧矣，维其伤矣！——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "苕之华，芸其黄矣。心之忧矣，维其伤矣！\n苕之华，其叶青青。知我如此，不如无生！\n牂羊坟首，三星在罶。人可以食，鲜可以饱！",
        pinyin: "tiáo zhī huá， yún qí huáng yǐ。 xīn zhī yōu yǐ， wéi qí shāng yǐ！\ntiáo zhī huá， qí yè qīng qīng。 zhī wǒ rú cǐ， bù rú wú shēng！\nzāng yáng fén shǒu， sān xīng zài liǔ。 rén kě yǐ shí， xiān kě yǐ bǎo！",
        translation: "凌霄花开了，一朵朵黄澄澄，我心里忧愁又悲伤。早知道活得这样苦，还不如不生下来。瘦羊长着大脑袋，鱼篓里空空的映着星光，人虽然有东西吃，却很少能吃饱。",
      }
      ],
    },
    {
      title: "何草不黄 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《何草不黄》意境插画：何草不黄？何日不行？何人不将？经营四方。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "何草不黄？何日不行？何人不将？经营四方。\n何草不玄？何人不矜？哀我征夫，独为匪民。\n匪兕匪虎，率彼旷野。哀我征夫，朝夕不暇。\n有芃者狐，率彼幽草。有栈之车，行彼周道。",
        pinyin: "hé cǎo bù huáng？ hé rì bù xíng？ hé rén bù jiāng？ jīng yíng sì fāng。\nhé cǎo bù xuán？ hé rén bù jīn？ āi wǒ zhēng fū， dú wèi fěi mín。\nfěi sì fěi hǔ， lǜ bǐ kuàng yě。 āi wǒ zhēng fū， zhāo xī bù xiá。\nyǒu péng zhě hú， lǜ bǐ yōu cǎo。 yǒu zhàn zhī chē， xíng bǐ zhōu dào。",
        translation: "什么草不枯黄？哪一天不奔走、哪个人不出征？我们不是犀牛也不是老虎，却整天在旷野里奔波，从早到晚没有空闲。蓬着尾巴的狐狸窜过深草，破旧的车子走在漫长的大道上。",
      }
      ],
    },
    {
      title: "文王 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《文王》意境插画：文王在上，于昭于天。周虽旧邦，其命维新。有周不显，帝命不时。文王陟降，在帝左右。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "文王在上，于昭于天。周虽旧邦，其命维新。有周不显，帝命不时。文王陟降，在帝左右。\n亹亹文王，令闻不已。陈锡哉周，侯文王孙子。文王孙子，本支百世，凡周之士，不显亦世。\n世之不显，厥犹翼翼。思皇多士，生此王国。王国克生，维周之桢；济济多士，文王以宁。\n穆穆文王，于缉熙敬止。假哉天命。有商孙子。商之孙子，其丽不亿。上帝既命，侯于周服。\n侯服于周，天命靡常。殷士肤敏。裸将于京。厥作裸将，常服黼冔。王之荩臣。无念尔祖。\n无念尔祖，聿修厥德。永言配命，自求多福。殷之未丧师，克配上帝。宜鉴于殷，骏命不易！\n命之不易，无遏尔躬。宣昭义问，有虞殷自天。上天之载，无声无臭。仪刑文王，万邦作孚。",
        pinyin: "wén wáng zài shàng， yú zhāo yú tiān。 zhōu suī jiù bāng， qí mìng wéi xīn。 yǒu zhōu bù xiǎn， dì mìng bù shí。 wén wáng zhì jiàng， zài dì zuǒ yòu。\nwěi wěi wén wáng， lìng wén bù yǐ。 chén xī zāi zhōu， hóu wén wáng sūn zi。 wén wáng sūn zi， běn zhī bǎi shì， fán zhōu zhī shì， bù xiǎn yì shì。\nshì zhī bù xiǎn， jué yóu yì yì。 sī huáng duō shì， shēng cǐ wáng guó。 wáng guó kè shēng， wéi zhōu zhī zhēn； jì jì duō shì， wén wáng yǐ níng。\nmù mù wén wáng， yú jī xī jìng zhǐ。 jiǎ zāi tiān mìng。 yǒu shāng sūn zi。 shāng zhī sūn zi， qí lì bù yì。 shàng dì jì mìng， hóu yú zhōu fú。\nhóu fú yú zhōu， tiān mìng mí cháng。 yīn shì fū mǐn。 luǒ jiāng yú jīng。 jué zuò luǒ jiāng， cháng fú fǔ xǔ。 wáng zhī jìn chén。 wú niàn ěr zǔ。\nwú niàn ěr zǔ， yù xiū jué dé。 yǒng yán pèi mìng， zì qiú duō fú。 yīn zhī wèi sàng shī， kè pèi shàng dì。 yí jiàn yú yīn， jùn mìng bù yì！\nmìng zhī bù yì， wú è ěr gōng。 xuān zhāo yì wèn， yǒu yú yīn zì tiān。 shàng tiān zhī zǎi， wú shēng wú xiù。 yí xíng wén wáng， wàn bāng zuò fú。",
        translation: "文王的神灵在天上，光明显耀；周虽然是古老的邦国，天命却是崭新的。文王勤勉不懈，好名声流传不断，众多贤才济济一堂，国家因此安宁。要怀念自己的祖先，修养自己的德行，顺应天命，自己为自己求来福气；大家都效法文王，万邦就会信服。",
      }
      ],
    },
    {
      title: "大明 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《大明》意境插画：明明在下，赫赫在上。天难忱斯，不易维王。天位殷适，使不挟四方。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "明明在下，赫赫在上。天难忱斯，不易维王。天位殷适，使不挟四方。\n挚仲氏任，自彼殷商，来嫁于周，曰嫔于京。乃及王季，维德之行。\n大任有身，生此文王。维此文王，小心翼翼。昭事上帝，聿怀多福。厥德不回，以受方国。\n天监在下，有命既集。文王初载，天作之合。在洽之阳，在渭之涘。\n文王嘉止，大邦有子。大邦有子，伣天之妹。文定厥祥，亲迎于渭。造舟为梁，不显其光。\n有命自天，命此文王。于周于京，缵女维莘。长子维行，笃生武王。保右命尔，燮伐大商。\n殷商之旅，其会如林。矢于牧野，维予侯兴。上帝临女，无二尔心。\n牧野洋洋，檀车煌煌，驷𫘪彭彭。维师尚父，时维鹰扬。凉彼武王，四伐大商，会朝清明。",
        pinyin: "míng míng zài xià， hè hè zài shàng。 tiān nán chén sī， bù yì wéi wáng。 tiān wèi yīn shì， shǐ bù xié sì fāng。\nzhì zhòng shì rèn， zì bǐ yīn shāng， lái jià yú zhōu， yuē pín yú jīng。 nǎi jí wáng jì， wéi dé zhī xíng。\ndà rèn yǒu shēn， shēng cǐ wén wáng。 wéi cǐ wén wáng， xiǎo xīn yì yì。 zhāo shì shàng dì， yù huái duō fú。 jué dé bù huí， yǐ shòu fāng guó。\ntiān jiān zài xià， yǒu mìng jì jí。 wén wáng chū zǎi， tiān zuò zhī hé。 zài qià zhī yáng， zài wèi zhī sì。\nwén wáng jiā zhǐ， dà bāng yǒu zǐ。 dà bāng yǒu zǐ， qiàn tiān zhī mèi。 wén dìng jué xiáng， qīn yíng yú wèi。 zào zhōu wèi liáng， bù xiǎn qí guāng。\nyǒu mìng zì tiān， mìng cǐ wén wáng。 yú zhōu yú jīng， zuǎn nǚ wéi shēn。 zhǎng zǐ wéi xíng， dǔ shēng wǔ wáng。 bǎo yòu mìng ěr， xiè fá dà shāng。\nyīn shāng zhī lǚ， qí huì rú lín。 shǐ yú mù yě， wéi yǔ hóu xīng。 shàng dì lín nǚ， wú èr ěr xīn。\nmù yě yáng yáng， tán chē huáng huáng， sì yuán péng péng。 wéi shī shàng fù， shí wéi yīng yáng。 liáng bǐ wǔ wáng， sì fá dà shāng， huì cháo qīng míng。",
        translation: "光明照在下面，显耀在天上；天意难测，做王真不容易。挚国的姑娘大任从殷商嫁到周国，生了文王；文王小心翼翼地敬奉上帝，品德端正，得到四方国家。上帝还为文王选定了新娘，他到渭水边亲迎，把船连起来做桥；后来武王出世，牧野大战，商军像树林一样多也挡不住，一朝得胜，天下清平。",
      }
      ],
    },
    {
      title: "绵 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《绵》意境插画：绵绵瓜瓞。民之初生，自土沮漆。古公亶父，陶复陶冗，未有家室。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "绵绵瓜瓞。民之初生，自土沮漆。古公亶父，陶复陶冗，未有家室。\n古公亶父，来朝走马。率西水浒，至于岐下。爰及姜女，聿来胥宇。\n周原膴膴，堇荼如饴。爰始爰谋，爰契我龟，曰止曰时，筑室于兹。\n乃慰乃止，乃左乃右，乃疆乃理，乃宣乃亩。自西徂东，周爰执事。\n乃召司空，乃召司徒，俾立室家。其绳则直，缩版以载，作庙翼翼。\n捄之陾陾，度之薨薨，筑之登登，削屡冯冯。百堵皆兴，鼛鼓弗胜。\n乃立皋门，皋门有伉。乃立应门，应门将将。乃立冢土，戎丑攸行。\n四不殄厥愠，亦不陨厥问。柞棫拔矣，行道兑矣。混夷駾矣，维其喙矣！\n虞芮质厥成，文王蹶厥生。予曰有疏附，予曰有先后。予曰有奔奏，予曰有御侮！",
        pinyin: "mián mián guā dié。 mín zhī chū shēng， zì tǔ jǔ qī。 gǔ gōng dǎn fù， táo fù táo rǒng， wèi yǒu jiā shì。\ngǔ gōng dǎn fù， lái cháo zǒu mǎ。 lǜ xī shuǐ hǔ， zhì yú qí xià。 yuán jí jiāng nǚ， yù lái xū yǔ。\nzhōu yuán wǔ wǔ， jǐn tú rú yí。 yuán shǐ yuán móu， yuán qì wǒ guī， yuē zhǐ yuē shí， zhù shì yú zī。\nnǎi wèi nǎi zhǐ， nǎi zuǒ nǎi yòu， nǎi jiāng nǎi lǐ， nǎi xuān nǎi mǔ。 zì xī cú dōng， zhōu yuán zhí shì。\nnǎi zhào sī kōng， nǎi zhào sī tú， bǐ lì shì jiā。 qí shéng zé zhí， suō bǎn yǐ zǎi， zuò miào yì yì。\njiù zhī réng réng， dù zhī hōng hōng， zhù zhī dēng dēng， xiāo lǚ féng féng。 bǎi dǔ jiē xīng， gāo gǔ fú shèng。\nnǎi lì gāo mén， gāo mén yǒu kàng。 nǎi lì yìng mén， yìng mén jiàng jiāng。 nǎi lì zhǒng tǔ， róng chǒu yōu xíng。\nsì bù tiǎn jué yùn， yì bù yǔn jué wèn。 zhà yù bá yǐ， háng dào duì yǐ。 hùn yí tuì yǐ， wéi qí huì yǐ！\nyú ruì zhì jué chéng， wén wáng juě jué shēng。 yǔ yuē yǒu shū fù， yǔ yuē yǒu xiān hòu。 yǔ yuē yǒu bēn zòu， yǔ yuē yǒu yù wǔ！",
        translation: "大瓜小瓜结了一串又一串，周人最早住在杜水漆水边。古公亶父清早赶着马，沿着河边向西走，来到岐山脚下，同姜氏女一起察看住处；这里的土地肥沃，长出的苦菜也甜得像糖。于是筑室建庙、划田定界，众人打土筑墙，一堵堵墙立起来，鼓声都盖不住打夯声，周人从此兴旺起来。",
      }
      ],
    },
    {
      title: "棫朴 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《棫朴》意境插画：芃芃棫朴，薪之槱之。济济辟王，左右趣之。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "芃芃棫朴，薪之槱之。济济辟王，左右趣之。\n济济辟王，左右奉璋。奉璋峨峨，髦士攸宜。\n淠彼泾舟，烝徒楫之。周王于迈，六师及之。\n倬彼云汉，为章于天。周王寿考，遐不作人？\n追琢其章，金玉其相。勉勉我王，纲纪四方。",
        pinyin: "péng péng yù pǔ， xīn zhī yǒu zhī。 jì jì pì wáng， zuǒ yòu qù zhī。\njì jì pì wáng， zuǒ yòu fèng zhāng。 fèng zhāng é é， máo shì yōu yí。\npì bǐ jīng zhōu， zhēng tú jí zhī。 zhōu wáng yú mài， liù shī jí zhī。\nzhuō bǐ yún hàn， wèi zhāng yú tiān。 zhōu wáng shòu kǎo， xiá bù zuò rén？\nzhuī zhuó qí zhāng， jīn yù qí xiāng。 miǎn miǎn wǒ wáng， gāng jì sì fāng。",
        translation: "茂密的棫树朴树，砍下来堆成柴火。恭敬庄严的周王来了，左右的人们紧紧跟随着；捧着玉璋的士人整整齐齐，个个都是好人才。泾河的船儿水中行，众人一起划桨；周王出行，六军跟随，他勤勉地治理着四方天下。",
      }
      ],
    },
    {
      title: "旱麓 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《旱麓》意境插画：瞻彼旱麓，榛楛济济。岂弟君子，干禄岂弟。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "瞻彼旱麓，榛楛济济。岂弟君子，干禄岂弟。\n瑟彼玉瓒，黄流在中。岂弟君子，福禄攸降。\n鸢飞戾天，鱼跃于渊。岂弟君子，遐不作人？\n清酒既载，骍牡既备。以享以祀，以介景福。\n瑟彼柞棫，民所燎矣。岂弟君子，神所劳矣。\n莫莫葛藟，施于条枚。岂弟君子，求福不回。",
        pinyin: "zhān bǐ hàn lù， zhēn kǔ jì jì。 kǎi tì jūn zǐ， gān lù qǐ dì。\nsè bǐ yù zàn， huáng liú zài zhōng。 kǎi tì jūn zǐ， fú lù yōu jiàng。\nyuān fēi lì tiān， yú yuè yú yuān。 kǎi tì jūn zǐ， xiá bù zuò rén？\nqīng jiǔ jì zǎi， xīng mǔ jì bèi。 yǐ xiǎng yǐ sì， yǐ jiè jǐng fú。\nsè bǐ zhà yù， mín suǒ liáo yǐ。 kǎi tì jūn zǐ， shén suǒ láo yǐ。\nmò mò gě lěi， shī yú tiáo méi。 kǎi tì jūn zǐ， qiú fú bù huí。",
        translation: "看那旱山脚下，榛树楛树长得多茂盛。和乐平易的君子，求福也这样和乐；老鹰展翅飞上蓝天，鱼儿摆尾跳进深渊。清酒摆好了，红色的公牛也备好了，拿来祭祀，求得大大的福气；君子求福，不走歪门邪道。",
      }
      ],
    },
    {
      title: "思齐 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《思齐》意境插画：思齐大任，文王之母，思媚周姜，京室之妇。大姒嗣徽音，则百斯男。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "思齐大任，文王之母，思媚周姜，京室之妇。大姒嗣徽音，则百斯男。\n惠于宗公，神罔时怨，神罔时恫。刑于寡妻，至于兄弟，以御于家邦。\n雍雍在宫，肃肃在庙。不显亦临，无射亦保。\n四戎疾不殄，烈假不瑕。不闻亦式，不谏亦入。四成人有德，小子有造。古之人无斁，誉髦斯士。",
        pinyin: "sī qí dà rèn， wén wáng zhī mǔ， sī mèi zhōu jiāng， jīng shì zhī fù。 dà sì sì huī yīn， zé bǎi sī nán。\nhuì yú zōng gōng， shén wǎng shí yuàn， shén wǎng shí dòng。 xíng yú guǎ qī， zhì yú xiōng dì， yǐ yù yú jiā bāng。\nyōng yōng zài gōng， sù sù zài miào。 bù xiǎn yì lín， wú shè yì bǎo。\nsì róng jí bù tiǎn， liè jiǎ bù xiá。 bù wén yì shì， bù jiàn yì rù。 sì chéng rén yǒu dé， xiǎo zi yǒu zào。 gǔ zhī rén wú yì， yù máo sī shì。",
        translation: "端庄的大任是文王的母亲，贤美的周姜是周家的先祖母；太姒继承了她们的好名声，养下许多好几郎。她们在家室里和睦，在宗庙里恭敬。文王以身作则，好品德先感化妻子，再推广到兄弟，一直到全家全国。",
      }
      ],
    },
    {
      title: "皇矣 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《皇矣》意境插画：皇矣上帝，临下有赫。监观四方，求民之莫。维此二国，其政不获。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "皇矣上帝，临下有赫。监观四方，求民之莫。维此二国，其政不获。\n维彼四国，爰究爰度。上帝耆之，憎其式廓。乃眷西顾，此维与宅。\n作之屏之，其菑其翳。修之平之，其灌其栵。启之辟之，其柽其椐。\n攘之剔之，其檿其柘。帝迁明德，串夷载路。天立厥配，受命既固。\n帝省其山，柞棫斯拔，松柏斯兑。帝作邦作对，自大伯王季。维此王季，\n因心则友。则友其兄，则笃其庆，载锡之光。受禄无丧，奄有四方。\n维此王季，帝度其心。貊其德音，其德克明。克明克类，克长克君。\n王此大邦，克顺克比。比于文王，其德靡悔。既受帝祉，施于孙子。\n帝谓文王：无然畔援，无然歆羡，诞先登于岸。密人不恭，敢距大邦，\n侵阮徂共。王赫斯怒，爰整其旅，以按徂旅。以笃于周祜，以对于天下。\n依其在京，侵自阮疆。陟我高冈，无矢我陵。我陵我阿，无饮我泉，\n我泉我池。度其鲜原，居岐之阳，在渭之将。万邦之方，下民之王。\n帝谓文王：予怀明德，不大声以色，不长夏以革。不识不知，顺帝之则。\n帝谓文王：訽尔仇方，同尔弟兄。以尔钩援，与尔临冲，以伐崇墉。\n临冲闲闲，崇墉言言。执讯连连，攸馘安安。是类是祃，是致是附，\n四方以无侮。临冲茀茀，崇墉仡仡。是伐是四，是绝是忽。四方以无拂。",
        pinyin: "huáng yǐ shàng dì， lín xià yǒu hè。 jiān guān sì fāng， qiú mín zhī mò。 wéi cǐ èr guó， qí zhèng bù huò。\nwéi bǐ sì guó， yuán jiū yuán dù。 shàng dì qí zhī， zēng qí shì kuò。 nǎi juàn xī gù， cǐ wéi yǔ zhái。\nzuò zhī píng zhī， qí zī qí yì。 xiū zhī píng zhī， qí guàn qí liè。 qǐ zhī pì zhī， qí chēng qí jū。\nrǎng zhī tī zhī， qí yǎn qí zhè。 dì qiān míng dé， chuàn yí zǎi lù。 tiān lì jué pèi， shòu mìng jì gù。\ndì shěng qí shān， zhà yù sī bá， sōng bǎi sī duì。 dì zuò bāng zuò duì， zì dà bó wáng jì。 wéi cǐ wáng jì，\nyīn xīn zé yǒu。 zé yǒu qí xiōng， zé dǔ qí qìng， zǎi xī zhī guāng。 shòu lù wú sàng， yǎn yǒu sì fāng。\nwéi cǐ wáng jì， dì dù qí xīn。 mò qí dé yīn， qí dé kè míng。 kè míng kè lèi， kè cháng kè jūn。\nwáng cǐ dà bāng， kè shùn kè bǐ。 bǐ yú wén wáng， qí dé mí huǐ。 jì shòu dì zhǐ， shī yú sūn zi。\ndì wèi wén wáng： wú rán pàn yuán， wú rán xīn xiàn， dàn xiān dēng yú àn。 mì rén bù gōng， gǎn jù dà bāng，\nqīn ruǎn cú gòng。 wáng hè sī nù， yuán zhěng qí lǚ， yǐ àn cú lǚ。 yǐ dǔ yú zhōu hù， yǐ duì yú tiān xià。\nyī qí zài jīng， qīn zì ruǎn jiāng。 zhì wǒ gāo gāng， wú shǐ wǒ líng。 wǒ líng wǒ ā， wú yǐn wǒ quán，\nwǒ quán wǒ chí。 dù qí xiān yuán， jū qí zhī yáng， zài wèi zhī jiāng。 wàn bāng zhī fāng， xià mín zhī wáng。\ndì wèi wén wáng： yǔ huái míng dé， bù dà shēng yǐ sè， bù cháng xià yǐ gé。 bù shí bù zhī， shùn dì zhī zé。\ndì wèi wén wáng： gòu ěr chóu fāng， tóng ěr dì xiong。 yǐ ěr gōu yuán， yǔ ěr lín chōng， yǐ fá chóng yōng。\nlín chōng xián xián， chóng yōng yán yán。 zhí xùn lián lián， yōu guó ān ān。 shì lèi shì mà， shì zhì shì fù，\nsì fāng yǐ wú wǔ。 lín chōng fú fú， chóng yōng yì yì。 shì fá shì sì， shì jué shì hū。 sì fāng yǐ wú fú。",
        translation: "伟大的上帝居高临下，明明白白地看着四方，为百姓寻找安居的地方。他看中了西方的周原，把天命交给有德的人。上帝对文王说：不要贪羡别人，要顺着上天的法则行事；又叫文王联合兄弟邦国，架起云梯、推着战车去攻打崇国的城墙，从此四方再没有人敢来欺侮。",
      }
      ],
    },
    {
      title: "灵台 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《灵台》意境插画：经始灵台，经之营之。庶民攻之，不日成之。经始勿亟，庶民子来。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "经始灵台，经之营之。庶民攻之，不日成之。经始勿亟，庶民子来。\n王在灵囿，麀鹿攸伏。麀鹿濯濯，白鸟翯翯。王在灵沼，于牣鱼跃。\n虡业维枞，贲鼓维镛。于论鼓钟，于乐辟雍。\n于论鼓钟，于乐辟雍。鼍鼓逢逢。蒙瞍奏公。",
        pinyin: "jīng shǐ líng tái， jīng zhī yíng zhī。 shù mín gōng zhī， bù rì chéng zhī。 jīng shǐ wù jí， shù mín zǐ lái。\nwáng zài líng yòu， yōu lù yōu fú。 yōu lù zhuó zhuó， bái niǎo hè hè。 wáng zài líng zhǎo， yú rèn yú yuè。\njù yè wéi cōng， bēn gǔ wéi yōng。 yú lùn gǔ zhōng， yú lè pì yōng。\nyú lùn gǔ zhōng， yú lè pì yōng。 tuó gǔ féng féng。 méng sǒu zòu gōng。",
        translation: "开始修建灵台，又是规划又是经营，老百姓争着来干活，没有几天就建成了。文王说不用着急，百姓却像儿子帮爹娘一样踊跃。王在灵园里，母鹿安卧，白鸟洁白；王在灵沼边，满池的鱼儿欢蹦乱跳，敲钟击鼓，音乐多么和谐。",
      }
      ],
    },
    {
      title: "下武 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《下武》意境插画：下武维周，世有哲王。三后在天，王配于京。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "下武维周，世有哲王。三后在天，王配于京。\n王配于京，世德作求。永言配命，成王之孚。\n成王之孚，下土之式。永言孝思，孝思维则。\n媚兹一人，应侯顺德。永言孝思，昭哉嗣服。\n昭兹来许，绳其祖武。于万斯年，受天之祜。\n受天之祜，四方来贺。于万斯年，不遐有佐。",
        pinyin: "xià wǔ wéi zhōu， shì yǒu zhé wáng。 sān hòu zài tiān， wáng pèi yú jīng。\nwáng pèi yú jīng， shì dé zuò qiú。 yǒng yán pèi mìng， chéng wáng zhī fú。\nchéng wáng zhī fú， xià tǔ zhī shì。 yǒng yán xiào sī， xiào sī wéi zé。\nmèi zī yī rén， yìng hóu shùn dé。 yǒng yán xiào sī， zhāo zāi sì fú。\nzhāo zī lái xǔ， shéng qí zǔ wǔ。 yú wàn sī nián， shòu tiān zhī hù。\nshòu tiān zhī hù， sì fāng lái hè。 yú wàn sī nián， bù xiá yǒu zuǒ。",
        translation: "周朝后代继承先业，代代都有英明的君王。太王、王季、文王在天上，武王配得上在镐京称王。他永远孝顺祖先，遵循先人的榜样，继承并发扬先王的事业。上天保佑他千年万年，四方都来朝贺。",
      }
      ],
    },
    {
      title: "文王有声 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《文王有声》意境插画：文王有声，遹骏有声。遹求厥宁，遹观厥成。文王烝哉！——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "文王有声，遹骏有声。遹求厥宁，遹观厥成。文王烝哉！\n文王受命，有此武功。既伐于崇，作邑于丰。文王烝哉！\n筑城伊淢，作丰伊匹。匪棘其欲，遹追来孝。王后烝哉！\n王公伊濯，维丰之垣。四方攸同，王后维翰。王后烝哉！\n丰水东注，维禹之绩。四方攸同，皇王维辟。皇王烝哉！\n镐京辟雍，自西自东，自南自北，无思不服。皇王烝哉！\n考卜维王，宅是镐京。维龟正之，武王成之。武王烝哉！\n丰水有芑，武王岂不仕？诒厥孙谋，以燕翼子。武王烝哉！",
        pinyin: "wén wáng yǒu shēng， yù jùn yǒu shēng。 yù qiú jué níng， yù guān jué chéng。 wén wáng zhēng zāi！\nwén wáng shòu mìng， yǒu cǐ wǔ gōng。 jì fá yú chóng， zuò yì yú fēng。 wén wáng zhēng zāi！\nzhù chéng yī yù， zuò fēng yī pǐ。 fěi jí qí yù， yù zhuī lái xiào。 wáng hòu zhēng zāi！\nwáng gōng yī zhuó， wéi fēng zhī yuán。 sì fāng yōu tóng， wáng hòu wéi hàn。 wáng hòu zhēng zāi！\nfēng shuǐ dōng zhù， wéi yǔ zhī jì。 sì fāng yōu tóng， huáng wáng wéi pì。 huáng wáng zhēng zāi！\nhào jīng pì yōng， zì xī zì dōng， zì nán zì běi， wú sī bù fú。 huáng wáng zhēng zāi！\nkǎo bǔ wéi wáng， zhái shì hào jīng。 wéi guī zhèng zhī， wǔ wáng chéng zhī。 wǔ wáng zhēng zāi！\nfēng shuǐ yǒu qǐ， wǔ wáng qǐ bù shì？ yí jué sūn móu， yǐ yàn yì zǐ。 wǔ wáng zhēng zāi！",
        translation: "文王有好名声，他求得天下的安宁，人人都看得见他的成功。他讨伐了崇国，在丰地建起都城，筑起城墙，这是为了继承先人的孝道。后来武王又在镐京建起学宫，东西南北四方的人没有一个不服从；武王还为子孙深谋远虑，留下安稳的基业。",
      }
      ],
    },
    {
      title: "生民 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《生民》意境插画：厥初生民，时维姜嫄。生民如何？克禋克祀，以弗无子。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "厥初生民，时维姜嫄。生民如何？克禋克祀，以弗无子。\n履帝武敏歆，攸介攸止，载震载夙。载生载育，时维后稷。\n诞弥厥月，先生如达。不拆不副，无菑无害。以赫厥灵。\n上帝不宁，不康禋祀，居然生子。\n诞寘之隘巷，牛羊腓字之。诞寘之平林，会伐平林。\n诞寘之寒冰，鸟覆翼之。鸟乃去矣，后稷呱矣。\n实覃实𬣙，厥声载路。诞实匍匐，克岐克嶷。以就口食。\n蓺之荏菽，荏菽旆旆。禾役穟穟，麻麦幪幪，瓜瓞唪唪。\n诞后稷之穑，有相之道。茀厥丰草，种之黄茂。实方实苞，实种实褎。\n实发实秀，实坚实好。实颖实栗，即有邰家室。\n诞降嘉种，维秬维秠，维穈维芑。恒之秬秠，是获是亩。\n恒之穈芑，是任是负。以归肇祀。\n诞我祀如何？或舂或揄，或簸或蹂。释之叟叟，烝之浮浮。\n载谋载惟。取萧祭脂，取羝以軷，载燔载烈，以兴嗣岁。\n卬盛于豆，于豆于登。其香始升，上帝居歆。胡臭亶时。\n后稷肇祀。庶无罪悔，以迄于今。",
        pinyin: "jué chū shēng mín， shí wéi jiāng yuán。 shēng mín rú hé？ kè yīn kè sì， yǐ fú wú zǐ。\nlǚ dì wǔ mǐn xīn， yōu jiè yōu zhǐ， zǎi zhèn zǎi sù。 zǎi shēng zǎi yù， shí wéi hòu jì。\ndàn mí jué yuè， xiān shēng rú dá。 bù chāi bù fù， wú zī wú hài。 yǐ hè jué líng。\nshàng dì bù níng， bù kāng yīn sì， jū rán shēng zǐ。\ndàn zhì zhī ài xiàng， niú yáng féi zì zhī。 dàn zhì zhī píng lín， huì fá píng lín。\ndàn zhì zhī hán bīng， niǎo fù yì zhī。 niǎo nǎi qù yǐ， hòu jì guā yǐ。\nshí qín shí xū， jué shēng zǎi lù。 dàn shí pú fú， kè qí kè yí。 yǐ jiù kǒu shí。\nyì zhī rěn shū， rěn shū pèi pèi。 hé yì suì suì， má mài méng méng， guā dié fěng fěng。\ndàn hòu jì zhī sè， yǒu xiāng zhī dào。 fú jué fēng cǎo， zhǒng zhī huáng mào。 shí fāng shí bāo， shí zhǒng shí xiù。\nshí fā shí xiù， shí jiān shí hǎo。 shí yǐng shí lì， jí yǒu tái jiā shì。\ndàn jiàng jiā zhǒng， wéi jù wéi pī， wéi mén wéi qǐ。 héng zhī jù pī， shì huò shì mǔ。\nhéng zhī mén qǐ， shì rèn shì fù。 yǐ guī zhào sì。\ndàn wǒ sì rú hé？ huò chōng huò yú， huò bò huò róu。 shì zhī sǒu sǒu， zhēng zhī fú fú。\nzǎi móu zǎi wéi。 qǔ xiāo jì zhī， qǔ dī yǐ bá， zǎi fán zǎi liè， yǐ xīng sì suì。\náng shèng yú dòu， yú dòu yú dēng。 qí xiāng shǐ shēng， shàng dì jū xīn。 hú chòu dǎn shí。\nhòu jì zhào sì。 shù wú zuì huǐ， yǐ qì yú jīn。",
        translation: "最初生出周人的是姜嫄，她虔诚祭祀求子，踩着上帝的脚印怀了孕，顺利生下后稷。她把孩子丢在小巷里，牛羊来喂他；丢在寒冰上，大鸟张开翅膀来温暖他。后稷长大后会种豆、种谷、种麻麦瓜果，庄稼长得又壮又好，他教大家耕种、带领人们祭祀，香香的祭品让上天高兴，一代一代传到今天。",
      }
      ],
    },
    {
      title: "行苇 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《行苇》意境插画：敦彼行苇，牛羊勿践履。方苞方体，维叶泥泥。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "敦彼行苇，牛羊勿践履。方苞方体，维叶泥泥。\n戚戚兄弟，莫远具尔。或四之筵，或授之几。\n四筵设席，授几有缉御。或献或酢，洗爵奠斝。\n醓醢以荐，或燔或炙。嘉肴脾臄，或歌或咢。\n敦弓既坚，四𬭤既均，舍矢既均，序宾以贤。\n敦弓既句，既挟四𬭤。四𬭤如树，序宾以不侮。\n曾孙维主，酒醴维醽，酌以大斗，以祈黄耇。\n黄耇台背，以引以翼。寿考维祺，以介景福。",
        pinyin: "dūn bǐ xíng wěi， niú yáng wù jiàn lǚ。 fāng bāo fāng tǐ， wéi yè ní ní。\nqī qī xiōng dì， mò yuǎn jù ěr。 huò sì zhī yán， huò shòu zhī jǐ。\nsì yán shè xí， shòu jǐ yǒu jī yù。 huò xiàn huò cù， xǐ jué diàn jiǎ。\ntǎn hǎi yǐ jiàn， huò fán huò zhì。 jiā yáo pí jué， huò gē huò è。\ndūn gōng jì jiān， sì hóu jì jūn， shè shǐ jì jūn， xù bīn yǐ xián。\ndūn gōng jì jù， jì xié sì hóu。 sì hóu rú shù， xù bīn yǐ bù wǔ。\nzēng sūn wéi zhǔ， jiǔ lǐ wéi líng， zhuó yǐ dà dòu， yǐ qí huáng gǒu。\nhuáng gǒu tái bèi， yǐ yǐn yǐ yì。 shòu kǎo wéi qí， yǐ jiè jǐng fú。",
        translation: "路边的芦苇成丛地长，牛羊不要去踩踏它，让它好好地长出叶来。兄弟们亲亲热热，谁也不疏远谁，摆好席子、递上小几，献酒回敬，又烤肉又唱歌。拉开硬弓比射箭，一支支箭都射得准，主人斟满大杯美酒，敬祝老人家长寿吉祥。",
      }
      ],
    },
    {
      title: "既醉 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《既醉》意境插画：既醉以酒，既饱以德。君子万年，介尔景福。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "既醉以酒，既饱以德。君子万年，介尔景福。\n既醉以酒，尔肴既将。君子万年，介尔昭明。\n昭明有融，高朗令终，令终有俶。公尸嘉告。\n其告维何？笾豆静嘉。朋友攸摄，摄以威仪。\n威仪孔时，君子有孝子。孝子不匮，永锡尔类。\n其类维何？室家之壶。君子万年，永锡祚胤。\n其胤维何？天被尔禄。君子万年，景命有仆。\n其仆维何？厘尔女士。厘尔女士，从以孙子。",
        pinyin: "jì zuì yǐ jiǔ， jì bǎo yǐ dé。 jūn zǐ wàn nián， jiè ěr jǐng fú。\njì zuì yǐ jiǔ， ěr yáo jì jiāng。 jūn zǐ wàn nián， jiè ěr zhāo míng。\nzhāo míng yǒu róng， gāo lǎng lìng zhōng， lìng zhōng yǒu chù。 gōng shī jiā gào。\nqí gào wéi hé？ biān dòu jìng jiā。 péng yǒu yōu shè， shè yǐ wēi yí。\nwēi yí kǒng shí， jūn zǐ yǒu xiào zǐ。 xiào zǐ bù kuì， yǒng xī ěr lèi。\nqí lèi wéi hé？ shì jiā zhī hú。 jūn zǐ wàn nián， yǒng xī zuò yìn。\nqí yìn wéi hé？ tiān bèi ěr lù。 jūn zǐ wàn nián， jǐng mìng yǒu pú。\nqí pú wéi hé？ lí ěr nǚ shì。 lí ěr nǚ shì， cóng yǐ sūn zi。",
        translation: "美酒喝足了，道理也听饱了，祝愿君子万年长寿，赐给你大大的福气。你的威仪那么好，家里还有孝顺的好儿孙。孝子不会缺少，好福气会一代一代传下去，永远陪伴着你的子孙。",
      }
      ],
    },
    {
      title: "凫鹥 · 佚名",
      art: "spring-bird",
      artPrompt: "古诗《凫鹥》意境插画：凫鹥在泾，公尸在燕来宁。尔酒既清，尔肴既馨。公尸燕饮，福禄来成。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "凫鹥在泾，公尸在燕来宁。尔酒既清，尔肴既馨。公尸燕饮，福禄来成。\n凫鹥在沙，公尸来燕来宜。尔酒既多，尔肴既嘉。公尸燕饮，福禄来为。\n凫鹥在渚，公尸来燕来处。尔酒既湑，尔肴伊脯。公尸燕饮，福禄来下。\n凫鹥在潀，公尸来燕来宗，既燕于宗，福禄攸降。公尸燕饮，福禄来崇。\n凫鹥在亹，公尸来止熏熏。旨酒欣欣，燔炙芬芬。公尸燕饮，无有后艰。",
        pinyin: "fú yī zài jīng， gōng shī zài yàn lái níng。 ěr jiǔ jì qīng， ěr yáo jì xīn。 gōng shī yàn yǐn， fú lù lái chéng。\nfú yī zài shā， gōng shī lái yàn lái yí。 ěr jiǔ jì duō， ěr yáo jì jiā。 gōng shī yàn yǐn， fú lù lái wèi。\nfú yī zài zhǔ， gōng shī lái yàn lái chù。 ěr jiǔ jì xǔ， ěr yáo yī pú。 gōng shī yàn yǐn， fú lù lái xià。\nfú yī zài cóng， gōng shī lái yàn lái zōng， jì yàn yú zōng， fú lù yōu jiàng。 gōng shī yàn yǐn， fú lù lái chóng。\nfú yī zài wěi， gōng shī lái zhǐ xūn xūn。 zhǐ jiǔ xīn xīn， fán zhì fēn fēn。 gōng shī yàn yǐn， wú yǒu hòu jiān。",
        translation: "野鸭鸥鸟在河水里游，祖先高高兴兴来赴宴。酒又清菜又香，大家陪祖先宴饮，福禄就会来到。祖先受用又欢喜，愿今后再没有灾祸临头。",
      }
      ],
    },
    {
      title: "假乐 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《假乐》意境插画：假乐君子，显显令德，宜民宜人。受禄于天，保右命之，自天申之。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "假乐君子，显显令德，宜民宜人。受禄于天，保右命之，自天申之。\n千禄百福，子孙千亿。穆穆皇皇，宜君宜王。不愆不忘，率由旧章。\n威仪抑抑，德音秩秩。无怨无恶，率由群匹。受福无疆，四方之纲。\n之纲之纪，燕及朋友。百辟卿士，媚于天子。不解于位，民之攸塈。",
        pinyin: "jiǎ lè jūn zǐ， xiǎn xiǎn lìng dé， yí mín yí rén。 shòu lù yú tiān， bǎo yòu mìng zhī， zì tiān shēn zhī。\nqiān lù bǎi fú， zǐ sūn qiān yì。 mù mù huáng huáng， yí jūn yí wáng。 bù qiān bù wàng， shuài yóu jiù zhāng。\nwēi yí yì yì， dé yīn zhì zhì。 wú yuàn wú è， lǜ yóu qún pǐ。 shòu fú wú jiāng， sì fāng zhī gāng。\nzhī gāng zhī jì， yàn jí péng yǒu。 bǎi pì qīng shì， mèi yú tiān zǐ。 bù jiě yú wèi， mín zhī yōu jì。",
        translation: "赞美这位君子，他光明的德行人人都看得见，让百姓过得安乐。他从上天承受福禄，上天保佑他、任命他；他有千种福、百种禄，子孙多得数不清。他一切照着先王的规矩办事，勤勤恳恳守在岗位上，百姓都安安稳稳地依靠他。",
      }
      ],
    },
    {
      title: "公刘 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《公刘》意境插画：笃公刘，匪居匪康。乃埸乃疆，乃积乃仓；乃裹糇粮，于橐于囊。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "笃公刘，匪居匪康。乃埸乃疆，乃积乃仓；乃裹糇粮，于橐于囊。\n思辑用光，弓矢斯张；干戈戚扬，爰方启行。\n笃公刘，于胥斯原。既庶既繁，既顺乃宣，而无永叹。陟则在𪩘，\n复降在原。何以舟之？维玉及瑶，鞞琫容刀。\n笃公刘，逝彼百泉。瞻彼溥原，乃陟南冈。乃觏于京，京师之野。\n于时处处，于时庐旅，于时言言，于时语语。\n笃公刘，于京斯依。跄跄济济，俾筵俾几。既登乃依，乃造其曹。\n执豕于牢，酌之用匏。食之饮之，君之宗之。\n笃公刘，既溥既长。既景乃冈，相其阴阳，观其流泉。其军三单，\n度其隰原。彻田为粮，度其夕阳。豳居允荒。\n笃公刘，于豳斯馆。涉渭为乱，取厉取锻，止基乃理。爰众爰有，\n夹其皇涧。溯其过涧。止旅乃密，芮鞫之即。",
        pinyin: "dǔ gōng liú， fěi jū fěi kāng。 nǎi yì nǎi jiāng， nǎi jī nǎi cāng； nǎi guǒ hóu liáng， yú tuó yú náng。\nsī jí yòng guāng， gōng shǐ sī zhāng； gān gē qī yáng， yuán fāng qǐ xíng。\ndǔ gōng liú， yú xū sī yuán。 jì shù jì fán， jì shùn nǎi xuān， ér wú yǒng tàn。 zhì zé zài yǎn，\nfù jiàng zài yuán。 hé yǐ zhōu zhī？ wéi yù jí yáo， pí běng róng dāo。\ndǔ gōng liú， shì bǐ bǎi quán。 zhān bǐ pǔ yuán， nǎi zhì nán gāng。 nǎi gòu yú jīng， jīng shī zhī yě。\nyú shí chù chù， yú shí lú lǚ， yú shí yán yán， yú shí yǔ yǔ。\ndǔ gōng liú， yú jīng sī yī。 qiàng qiàng jì jì， bǐ yán bǐ jǐ。 jì dēng nǎi yī， nǎi zào qí cáo。\nzhí shǐ yú láo， zhuó zhī yòng páo。 shí zhī yǐn zhī， jūn zhī zōng zhī。\ndǔ gōng liú， jì pǔ jì cháng。 jì jǐng nǎi gāng， xiāng qí yīn yáng， guān qí liú quán。 qí jūn sān dān，\ndù qí xí yuán。 chè tián wèi liáng， dù qí xī yáng。 bīn jū yǔn huāng。\ndǔ gōng liú， yú bīn sī guǎn。 shè wèi wèi luàn， qǔ lì qǔ duàn， zhǐ jī nǎi lǐ。 yuán zhòng yuán yǒu，\njiá qí huáng jiàn。 sù qí guò jiàn。 zhǐ lǚ nǎi mì， ruì jū zhī jí。",
        translation: "忠诚厚道的公刘不肯安居享福，他划好田界、囤足粮食，裹好干粮、拿起弓箭，带领大家出发找新家。他察看平原、登上山冈，找到京师这块好地方，人们盖房安家、说说笑笑，又杀猪斟酒，公刘做了大家的君长。他把家园越建越大，开田种粮，百姓一天天多起来，周人在豳地兴旺起来。",
      }
      ],
    },
    {
      title: "泂酌 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《泂酌》意境插画：泂酌彼行潦，挹彼注兹，可以餴饎。岂弟君子，民之父母。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "泂酌彼行潦，挹彼注兹，可以餴饎。岂弟君子，民之父母。\n泂酌彼行潦，挹彼注兹，可以濯罍。岂弟君子，民之攸归。\n泂酌彼行潦，挹彼注兹，可以濯溉。岂弟君子，民之攸墍。",
        pinyin: "jiǒng zhuó bǐ xíng liáo， yì bǐ zhù zī， kě yǐ fēn xī。 kǎi tì jūn zǐ， mín zhī fù mǔ。\njiǒng zhuó bǐ xíng liáo， yì bǐ zhù zī， kě yǐ zhuó léi。 kǎi tì jūn zǐ， mín zhī yōu guī。\njiǒng zhuó bǐ xíng liáo， yì bǐ zhù zī， kě yǐ zhuó gài。 kǎi tì jūn zǐ， mín zhī yōu xì。",
        translation: "从远处的路上舀来流水，倒进这里，可以用来蒸饭做菜。和乐平易的君子，是百姓的父母。这水还可以洗酒器、洗器皿，君子是百姓归依、百姓喜爱的人。",
      }
      ],
    },
    {
      title: "卷阿 · 佚名",
      art: "cloud-flight",
      artPrompt: "古诗《卷阿》意境插画：有卷者阿，飘风自南。岂弟君子，来游来歌，以矢其音。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "有卷者阿，飘风自南。岂弟君子，来游来歌，以矢其音。\n伴奂尔游矣，优游尔休矣。岂弟君子，俾尔弥尔性，似先公酋矣。\n尔土宇昄章，亦孔之厚矣。岂弟君子，俾尔弥尔性，百神尔主矣。\n尔受命长矣，茀禄尔康矣。岂弟君子，俾尔弥尔性，纯嘏尔常矣。\n有冯有翼，有孝有德，以引以翼。岂弟君子，四方为则。\n颙颙卬卬，如圭如璋，令闻令望。岂弟君子，四方为纲。\n凤凰于飞，翙翙其羽，亦集爰止。蔼蔼王多吉士，维君子使，媚于天子。\n凤凰于飞，翙翙其羽，亦傅于天。蔼蔼王多吉人，维君子命，媚于庶人。\n凤凰鸣矣，于彼高冈。梧桐生矣，于彼朝阳。菶菶萋萋，雍雍喈喈。\n君子之车，既庶且多。君子之马，既闲且驰。矢诗不多，维以遂歌。",
        pinyin: "yǒu juàn zhě ā， piāo fēng zì nán。 kǎi tì jūn zǐ， lái yóu lái gē， yǐ shǐ qí yīn。\nbàn huàn ěr yóu yǐ， yōu yóu ěr xiū yǐ。 kǎi tì jūn zǐ， bǐ ěr mí ěr xìng， sì xiān gōng qiú yǐ。\něr tǔ yǔ bǎn zhāng， yì kǒng zhī hòu yǐ。 kǎi tì jūn zǐ， bǐ ěr mí ěr xìng， bǎi shén ěr zhǔ yǐ。\něr shòu mìng cháng yǐ， fú lù ěr kāng yǐ。 kǎi tì jūn zǐ， bǐ ěr mí ěr xìng， chún gǔ ěr cháng yǐ。\nyǒu féng yǒu yì， yǒu xiào yǒu dé， yǐ yǐn yǐ yì。 kǎi tì jūn zǐ， sì fāng wèi zé。\nyóng yóng áng áng， rú guī rú zhāng， lìng wén lìng wàng。 kǎi tì jūn zǐ， sì fāng wèi gāng。\nfèng huáng yú fēi， huì huì qí yǔ， yì jí yuán zhǐ。 ǎi ǎi wáng duō jí shì， wéi jūn zǐ shǐ， mèi yú tiān zǐ。\nfèng huáng yú fēi， huì huì qí yǔ， yì fù yú tiān。 ǎi ǎi wáng duō jí rén， wéi jūn zǐ mìng， mèi yú shù rén。\nfèng huáng míng yǐ， yú bǐ gāo gāng。 wú tóng shēng yǐ， yú bǐ cháo yáng。 běng běng qī qī， yōng yōng jiē jiē。\njūn zǐ zhī chē， jì shù qiě duō。 jūn zǐ zhī mǎ， jì xián qiě chí。 shǐ shī bù duō， wéi yǐ suì gē。",
        translation: "弯曲的大山坡上，南风轻轻吹来。和乐平易的君子来这里游赏、唱歌，献上美妙的歌声。凤凰在高冈上飞舞鸣叫，梧桐树在向阳的山坡上长得茂茂盛盛，君子的车马又多又矫健。",
      }
      ],
    },
    {
      title: "民劳 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《民劳》意境插画：民亦劳止，汔可小康。惠此中国，以绥四方。无纵诡随，以谨无良。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "民亦劳止，汔可小康。惠此中国，以绥四方。无纵诡随，以谨无良。\n式遏寇虐，憯不畏明。柔远能迩，以定我王。\n民亦劳止，汔可小休。惠此中国，以为民逑。无纵诡随，以谨惛怓。\n式遏寇虐，无俾民忧。无弃尔劳，以为王休。\n民亦劳止，汔可小息。惠此京师，以绥四国。无纵诡随，以谨罔极。\n式遏寇虐，无俾作慝。敬慎威仪，以近有德。\n民亦劳止，汔可小愒。惠此中国，俾民忧泄。无纵诡随，以谨丑厉。\n式遏寇虐，无俾正败。戎虽小子，而式弘大。\n民亦劳止，汔可小安。惠此中国，国无有残。无纵诡随，以谨缱绻。\n式遏寇虐，无俾正反。王欲玉女，是用大谏。",
        pinyin: "mín yì láo zhǐ， qì kě xiǎo kāng。 huì cǐ zhōng guó， yǐ suí sì fāng。 wú zòng guǐ suí， yǐ jǐn wú liáng。\nshì è kòu nüè， cǎn bù wèi míng。 róu yuǎn néng ěr， yǐ dìng wǒ wáng。\nmín yì láo zhǐ， qì kě xiǎo xiū。 huì cǐ zhōng guó， yǐ wéi mín qiú。 wú zòng guǐ suí， yǐ jǐn hūn náo。\nshì è kòu nüè， wú bǐ mín yōu。 wú qì ěr láo， yǐ wéi wáng xiū。\nmín yì láo zhǐ， qì kě xiǎo xī。 huì cǐ jīng shī， yǐ suí sì guó。 wú zòng guǐ suí， yǐ jǐn wǎng jí。\nshì è kòu nüè， wú bǐ zuò tè。 jìng shèn wēi yí， yǐ jìn yǒu dé。\nmín yì láo zhǐ， qì kě xiǎo kài。 huì cǐ zhōng guó， bǐ mín yōu xiè。 wú zòng guǐ suí， yǐ jǐn chǒu lì。\nshì è kòu nüè， wú bǐ zhèng bài。 róng suī xiǎo zi， ér shì hóng dà。\nmín yì láo zhǐ， qì kě xiǎo ān。 huì cǐ zhōng guó， guó wú yǒu cán。 wú zòng guǐ suí， yǐ jǐn qiǎn quǎn。\nshì è kòu nüè， wú bǐ zhèng fǎn。 wáng yù yù nǚ， shì yòng dà jiàn。",
        translation: "百姓实在太劳苦了，只求稍稍安息一下。请爱护天下的百姓，安抚四方，不要放纵奸诈谄媚的人，要制止残害大家的坏事。君王啊，请您谨慎勤勉，守住祖先的功业，让天下安宁。",
      }
      ],
    },
    {
      title: "板 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《板》意境插画：上帝板板，下民卒瘅。出话不然，为犹不远。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "上帝板板，下民卒瘅。出话不然，为犹不远。\n靡圣管管。不实于亶。犹之未远，是用大谏。\n天之方难，无然宪宪。天之方蹶，无然泄泄。\n辞之辑矣，民之洽矣。辞之怿矣，民之莫矣。\n我虽异事，及尔同僚。我即尔谋，听我嚣嚣。\n我言维服，勿以为笑。先民有言，询于刍荛。\n天之方虐，无然谑谑。老夫灌灌，小子蹻蹻。\n匪我言耄，尔用忧谑。多将熇熇，不可救药。\n天之方懠。无为夸毗。威仪卒迷，善人载尸。\n民之方殿屎，则莫我敢葵？丧乱蔑资，曾莫惠我师？\n天之牖民，如埙如篪，如璋如圭，如取如携。\n携无曰益，牖民孔易。民之多辟，无自立辟。\n价人维藩，大师维垣，大邦维屏，大宗维翰，\n怀德维宁，宗子维城。无俾城坏，无独斯畏。\n敬天之怒，无敢戏豫。敬天之渝，无敢驰驱。\n昊天曰明，及尔出王。昊天曰旦，及尔游衍。",
        pinyin: "shàng dì bǎn bǎn， xià mín zú dān。 chū huà bù rán， wèi yóu bù yuǎn。\nmí shèng guǎn guǎn。 bù shí yú dǎn。 yóu zhī wèi yuǎn， shì yòng dà jiàn。\ntiān zhī fāng nán， wú rán xiàn xiàn。 tiān zhī fāng juě， wú rán xiè xiè。\ncí zhī jí yǐ， mín zhī qià yǐ。 cí zhī yì yǐ， mín zhī mò yǐ。\nwǒ suī yì shì， jí ěr tóng liáo。 wǒ jí ěr móu， tīng wǒ áo áo。\nwǒ yán wéi fú， wù yǐ wéi xiào。 xiān mín yǒu yán， xún yú chú ráo。\ntiān zhī fāng nüè， wú rán xuè xuè。 lǎo fū guàn guàn， xiǎo zi qiāo qiāo。\nfěi wǒ yán mào， ěr yòng yōu xuè。 duō jiāng hè hè， bù kě jiù yào。\ntiān zhī fāng qí。 wú wéi kuā pí。 wēi yí zú mí， shàn rén zǎi shī。\nmín zhī fāng diàn shǐ， zé mò wǒ gǎn kuí？ sāng luàn miè zī， céng mò huì wǒ shī？\ntiān zhī yǒu mín， rú xūn rú chí， rú zhāng rú guī， rú qǔ rú xié。\nxié wú yuē yì， yǒu mín kǒng yì。 mín zhī duō pì， wú zì lì pì。\njià rén wéi fān， dà shī wéi yuán， dà bāng wéi píng， dà zōng wéi hàn，\nhuái dé wéi níng， zōng zǐ wéi chéng。 wú bǐ chéng huài， wú dú sī wèi。\njìng tiān zhī nù， wú gǎn xì yù。 jìng tiān zhī yú， wú gǎn chí qū。\nhào tiān yuē míng， jí ěr chū wáng。 hào tiān yuē dàn， jí ěr yóu yǎn。",
        translation: "上天反反复复变了脸色，百姓们受尽苦难。老臣诚恳地劝告君王：说话要小心，仪态要庄重，做事要敬畏上天，不能嬉戏怠慢。上天又明又亮，一直跟着你，看着你的一举一动呢。",
      }
      ],
    },
    {
      title: "荡 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《荡》意境插画：荡荡上帝，下民之辟。疾威上帝，其命多辟。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "荡荡上帝，下民之辟。疾威上帝，其命多辟。\n天生烝民，其命匪谌。靡不有初，鲜克有终。\n文王曰咨，咨汝殷商。曾是彊御？曾是掊克？\n曾是在位？曾是在服？天降滔德，女兴是力。\n文王曰咨，咨女殷商。而秉义类，彊御多怼。\n流言以对。寇攘式内。侯作侯祝，靡届靡究。\n文王曰咨，咨女殷商。女炰烋于中国。敛怨以为德。\n不明尔德，时无背无侧。尔德不明，以无陪无卿。\n文王曰咨，咨女殷商。天不湎尔以酒，不义从式。\n既衍尔止。靡明靡晦。式号式呼。俾昼作夜。\n文王曰咨，咨女殷商。如蜩如螗，如沸如羹。\n小大近丧，人尚乎由行。内奰于中国，覃及鬼方。\n文王曰咨，咨女殷商。匪上帝不时，殷不用旧。\n虽无老成人，尚有典刑。曾是莫听，大命以倾。\n文王曰咨，咨女殷商。人亦有言：颠沛之揭，\n枝叶未有害，本实先拨。殷鉴不远，在夏后之世。",
        pinyin: "dàng dàng shàng dì， xià mín zhī pì。 jí wēi shàng dì， qí mìng duō pì。\ntiān shēng zhēng mín， qí mìng fěi chén。 mí bù yǒu chū， xiān kè yǒu zhōng。\nwén wáng yuē zī， zī rǔ yīn shāng。 céng shì qiáng yù？ céng shì póu kè？\ncéng shì zài wèi？ céng shì zài fú？ tiān jiàng tāo dé， nǚ xīng shì lì。\nwén wáng yuē zī， zī nǚ yīn shāng。 ér bǐng yì lèi， qiáng yù duō duì。\nliú yán yǐ duì。 kòu rǎng shì nèi。 hóu zuò hóu zhù， mí jiè mí jiū。\nwén wáng yuē zī， zī nǚ yīn shāng。 nǚ páo xiāo yú zhōng guó。 liǎn yuàn yǐ wéi dé。\nbù míng ěr dé， shí wú bèi wú cè。 ěr dé bù míng， yǐ wú péi wú qīng。\nwén wáng yuē zī， zī nǚ yīn shāng。 tiān bù miǎn ěr yǐ jiǔ， bù yì cóng shì。\njì yǎn ěr zhǐ。 mí míng mí huì。 shì hào shì hū。 bǐ zhòu zuò yè。\nwén wáng yuē zī， zī nǚ yīn shāng。 rú tiáo rú táng， rú fèi rú gēng。\nxiǎo dà jìn sàng， rén shàng hū yóu xíng。 nèi bì yú zhōng guó， qín jí guǐ fāng。\nwén wáng yuē zī， zī nǚ yīn shāng。 fěi shàng dì bù shí， yīn bù yòng jiù。\nsuī wú lǎo chéng rén， shàng yǒu diǎn xíng。 céng shì mò tīng， dà mìng yǐ qīng。\nwén wáng yuē zī， zī nǚ yīn shāng。 rén yì yǒu yán： diān pèi zhī jiē，\nzhī yè wèi yǒu hài， běn shí xiān bō。 yīn jiàn bù yuǎn， zài xià hòu zhī shì。",
        translation: "周文王叹息地说：殷商啊，你们为什么让强暴贪婪的人掌权，还昼夜喝酒喧哗，把白天当成黑夜？凡事都有个好的开头，却很少能坚持到好的结尾。殷商的镜子并不远，就是那个灭亡了的夏朝啊。",
      }
      ],
    },
    {
      title: "抑 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《抑》意境插画：抑抑威仪，维德之隅。人亦有言：靡哲不愚，庶人之愚，亦职维疾。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "抑抑威仪，维德之隅。人亦有言：靡哲不愚，庶人之愚，亦职维疾。\n哲人之愚，亦维斯戾。无竞维人，四方其训之。有觉德行，四国顺之。\n𬣙谟定命，远犹辰告。敬慎威仪，维民之则。其在于今，兴迷乱于政。\n颠覆厥德，荒湛于酒。女虽湛乐从，弗念厥绍。罔敷求先王，克共明刑。\n四皇天弗尚，如彼泉流，无沦胥以亡。夙兴夜寐，洒扫庭内，维民之章。\n修尔车马，弓矢戎兵，用戒戎作，用逷蛮方。质尔人民，谨尔侯度，用戒不虞。\n慎尔出话，敬尔威仪，无不柔嘉。白圭之玷，尚可磨也；斯言之玷，不可为也！\n无易由言，无曰苟矣，莫扪朕舌，言不可逝矣。无言不仇，无德不报。\n惠于朋友，庶民小子。子孙绳绳，万民靡不承。视尔友君子，辑柔尔颜，不遐有愆。\n相在尔室，尚不愧于屋漏。无曰不显，莫予云觏。神之格思，不可度思，矧可射思！\n辟尔为德，俾臧俾嘉。淑慎尔止，不愆于仪。不僭不贼，鲜不为则。投我以桃，报之以李。\n彼童而角，实虹小子。荏染柔木，言缗之丝。温温恭人，维德之基。\n其维哲人，告之话言，顺德之行。其维愚人，覆谓我僭。民各有心。\n于乎小子，未知臧否。匪手携之，言示之事。匪面命之，言提其耳。\n借曰未知，亦既抱子。民之靡盈，谁夙知而莫成？昊天孔昭，我生靡乐。\n视尔梦梦，我心惨惨。诲尔谆谆，听我藐藐。匪用为教，覆用为虐。\n借曰未知，亦聿既耄。于乎，小子，告尔旧止。听用我谋，庶无大悔。\n天方艰难，曰丧厥国。取譬不远，昊天不忒。回遹其德，俾民大棘。",
        pinyin: "yì yì wēi yí， wéi dé zhī yú。 rén yì yǒu yán： mí zhé bù yú， shù rén zhī yú， yì zhí wéi jí。\nzhé rén zhī yú， yì wéi sī lì。 wú jìng wéi rén， sì fāng qí xùn zhī。 yǒu jué dé xíng， sì guó shùn zhī。\nxū mó dìng mìng， yuǎn yóu chén gào。 jìng shèn wēi yí， wéi mín zhī zé。 qí zài yú jīn， xīng mí luàn yú zhèng。\ndiān fù jué dé， huāng zhàn yú jiǔ。 nǚ suī zhàn lè cóng， fú niàn jué shào。 wǎng fū qiú xiān wáng， kè gòng míng xíng。\nsì huáng tiān fú shàng， rú bǐ quán liú， wú lún xū yǐ wáng。 sù xīng yè mèi， sǎ sǎo tíng nèi， wéi mín zhī zhāng。\nxiū ěr chē mǎ， gōng shǐ róng bīng， yòng jiè róng zuò， yòng tì mán fāng。 zhì ěr rén mín， jǐn ěr hóu dù， yòng jiè bù yú。\nshèn ěr chū huà， jìng ěr wēi yí， wú bù róu jiā。 bái guī zhī diàn， shàng kě mó yě； sī yán zhī diàn， bù kě wèi yě！\nwú yì yóu yán， wú yuē gǒu yǐ， mò mén zhèn shé， yán bù kě shì yǐ。 wú yán bù chóu， wú dé bù bào。\nhuì yú péng yǒu， shù mín xiǎo zi。 zǐ sūn shéng shéng， wàn mín mí bù chéng。 shì ěr yǒu jūn zǐ， jí róu ěr yán， bù xiá yǒu qiān。\nxiāng zài ěr shì， shàng bù kuì yú wū lòu。 wú yuē bù xiǎn， mò yǔ yún gòu。 shén zhī gé sī， bù kě dù sī， shěn kě shè sī！\npì ěr wèi dé， bǐ zāng bǐ jiā。 shū shèn ěr zhǐ， bù qiān yú yí。 bù jiàn bù zéi， xiān bù wèi zé。 tóu wǒ yǐ táo， bào zhī yǐ lǐ。\nbǐ tóng ér jiǎo， shí hóng xiǎo zi。 rěn rǎn róu mù， yán mín zhī sī。 wēn wēn gōng rén， wéi dé zhī jī。\nqí wéi zhé rén， gào zhī huà yán， shùn dé zhī xíng。 qí wéi yú rén， fù wèi wǒ jiàn。 mín gè yǒu xīn。\nyú hū xiǎo zi， wèi zhī zāng pǐ。 fěi shǒu xié zhī， yán shì zhī shì。 fěi miàn mìng zhī， yán tí qí ěr。\njiè yuē wèi zhī， yì jì bào zǐ。 mín zhī mí yíng， shuí sù zhī ér mò chéng？ hào tiān kǒng zhāo， wǒ shēng mí lè。\nshì ěr mèng mèng， wǒ xīn cǎn cǎn。 huì ěr zhūn zhūn， tīng wǒ miǎo miǎo。 fěi yòng wèi jiào， fù yòng wèi nüè。\njiè yuē wèi zhī， yì yù jì mào。 yú hū， xiǎo zi， gào ěr jiù zhǐ。 tīng yòng wǒ móu， shù wú dà huǐ。\ntiān fāng jiān nán， yuē sàng jué guó。 qǔ pì bù yuǎn， hào tiān bù tè。 huí yù qí dé， bǐ mín dà jí。",
        translation: "端正的仪态，来自美好的品德。老臣恳切地劝告年轻的君王：说话要谨慎，白玉上的斑点还可以磨掉，话说错了可就收不回来了。别人赠我桃子，我要回赠李子；要日夜勤勉，一天天进步，学得光明美好的德行。",
      }
      ],
    },
    {
      title: "桑柔 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《桑柔》意境插画：菀彼桑柔，其下侯旬，捋采其刘，瘼此下民。不殄心忧，仓兄填兮。倬彼昊天，宁不我矜？——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "菀彼桑柔，其下侯旬，捋采其刘，瘼此下民。不殄心忧，仓兄填兮。倬彼昊天，宁不我矜？\n四牡骙骙，旟旐有翩。乱生不夷，靡国不泯。民靡有黎，具祸以烬。于乎有哀，国步斯频。\n国步灭资，天不我将。靡所止疑，云徂何往？君子实维，秉心无竞。谁生厉阶，至今为梗？\n忧心殷殷，念我土宇。我生不辰，逢天𫢸怒。自西徂东，靡所定处。多我觏痻，孔棘我圉。\n为谋为毖，乱况斯削。告尔忧恤，诲尔序爵。谁能执热，逝不以濯？其何能淑，载胥及溺。\n如彼溯风，亦孔之僾。民有肃心，荓云不逮。好是稼穑，力民代食。稼穑维宝，代食维好？\n天降丧乱，灭我立王。降此蟊贼，稼穑卒痒。哀恫中国，具赘卒荒。靡有旅力，以念穹苍。\n维此惠君，民人所瞻。秉心宣犹，考慎其相。维彼不顺，自独俾臧。自有肺肠，俾民卒狂。\n瞻彼中林，甡甡其鹿。朋友已谮，不胥以谷。人亦有言：进退维谷。\n维此圣人，瞻言百里。维彼愚人，覆狂以喜。匪言不能，胡斯畏忌？\n维此良人，弗求弗迪。维彼忍心，是顾是复。民之贪乱，宁为荼毒。\n大风有隧，有空大谷。维此良人，作为式谷。维彼不顺，征以中垢。\n大风有隧，贪人败类。听言则对，诵言如醉。匪用其良，复俾我悖。\n嗟尔朋友，予岂不知而作。如彼飞虫，时亦弋获。既之阴女，反予来赫。\n民之罔极，职凉善背。为民不利，如云不克。民之回遹，职竞用力。\n民之未戾，职盗为寇。凉曰不可，覆背善詈。虽曰匪予，既作尔歌！",
        pinyin: "wǎn bǐ sāng róu， qí xià hóu xún， lǚ cǎi qí liú， mò cǐ xià mín。 bù tiǎn xīn yōu， cāng xiōng tián xī。 zhuō bǐ hào tiān， níng bù wǒ jīn？\nsì mǔ kuí kuí， yú zhào yǒu piān。 luàn shēng bù yí， mí guó bù mǐn。 mín mí yǒu lí， jù huò yǐ jìn。 yú hū yǒu āi， guó bù sī pín。\nguó bù miè zī， tiān bù wǒ jiāng。 mí suǒ zhǐ yí， yún cú hé wǎng？ jūn zǐ shí wéi， bǐng xīn wú jìng。 shuí shēng lì jiē， zhì jīn wèi gěng？\nyōu xīn yīn yīn， niàn wǒ tǔ yǔ。 wǒ shēng bù chén， féng tiān dàn nù。 zì xī cú dōng， mí suǒ dìng chù。 duō wǒ gòu mín， kǒng jí wǒ yǔ。\nwèi móu wèi bì， luàn kuàng sī xiāo。 gào ěr yōu xù， huì ěr xù jué。 shuí néng zhí rè， shì bù yǐ zhuó？ qí hé néng shū， zǎi xū jí nì。\nrú bǐ sù fēng， yì kǒng zhī ài。 mín yǒu sù xīn， píng yún bù dǎi。 hǎo shì jià sè， lì mín dài shí。 jià sè wéi bǎo， dài shí wéi hǎo？\ntiān jiàng sāng luàn， miè wǒ lì wáng。 jiàng cǐ máo zéi， jià sè zú yǎng。 āi dòng zhōng guó， jù zhuì zú huāng。 mí yǒu lǚ lì， yǐ niàn qióng cāng。\nwéi cǐ huì jūn， mín rén suǒ zhān。 bǐng xīn xuān yóu， kǎo shèn qí xiāng。 wéi bǐ bù shùn， zì dú bǐ zāng。 zì yǒu fèi cháng， bǐ mín zú kuáng。\nzhān bǐ zhōng lín， shēn shēn qí lù。 péng yǒu yǐ zèn， bù xū yǐ gǔ。 rén yì yǒu yán： jìn tuì wéi gǔ。\nwéi cǐ shèng rén， zhān yán bǎi lǐ。 wéi bǐ yú rén， fù kuáng yǐ xǐ。 fěi yán bù néng， hú sī wèi jì？\nwéi cǐ liáng rén， fú qiú fú dí。 wéi bǐ rěn xīn， shì gù shì fù。 mín zhī tān luàn， níng wèi tú dú。\ndà fēng yǒu suì， yǒu kōng dà gǔ。 wéi cǐ liáng rén， zuò wéi shì gǔ。 wéi bǐ bù shùn， zhēng yǐ zhōng gòu。\ndà fēng yǒu suì， tān rén bài lèi。 tīng yán zé duì， sòng yán rú zuì。 fěi yòng qí liáng， fù bǐ wǒ bèi。\njiē ěr péng yǒu， yǔ qǐ bù zhī ér zuò。 rú bǐ fēi chóng， shí yì yì huò。 jì zhī yīn nǚ， fǎn yǔ lái hè。\nmín zhī wǎng jí， zhí liáng shàn bèi。 wèi mín bù lì， rú yún bù kè。 mín zhī huí yù， zhí jìng yòng lì。\nmín zhī wèi lì， zhí dào wèi kòu。 liáng yuē bù kě， fù bèi shàn lì。 suī yuē fěi yǔ， jì zuò ěr gē！",
        translation: "茂密的桑树枝叶柔软，树下的百姓却把叶子都摘光了，日子困苦忧伤。天下大乱，没有一处安宁的地方，好人就像掉进了深谷，进也不是退也不是。我满心愁苦，只能把这首歌儿唱出来。",
      }
      ],
    },
    {
      title: "云汉 · 佚名",
      art: "cloud-flight",
      artPrompt: "古诗《云汉》意境插画：倬彼云汉，昭回于天。王曰：于乎！何辜今之人？天降丧乱，饥馑荐臻。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "倬彼云汉，昭回于天。王曰：于乎！何辜今之人？天降丧乱，饥馑荐臻。\n靡神不举，靡爱斯牲。圭壁既卒，宁莫我听？\n旱既大甚，蕴隆虫虫。不殄禋祀，自郊徂宫。上下奠瘗，靡神不宗。\n后稷不克，上帝不临。耗斁下土，宁丁我梗\n旱既大甚，则不可推。兢兢业业，如霆如雷。周余黎民，靡有孑遗。\n昊天上帝，则不我遗。胡不相畏？先祖于摧。\n旱既大甚，则不可沮。赫赫炎炎，云我无所。大命近止，靡瞻靡顾。\n群公先正，则不我助。父母先祖，胡宁忍予？\n旱既大甚，涤涤山川。旱魃为虐，如惔如焚。我心惮暑，忧心如熏。\n群公先正，则不我闻。昊天上帝，宁俾我遁？\n旱既大甚，黾勉畏去。胡宁瘨我以旱？憯不知其故。祈年孔夙，方社不莫。\n昊天上帝，则不我虞。\n敬恭明神，宜无悔怒。旱既大甚，散无友纪。鞫哉庶正，疚哉冢宰。\n趣马师氏，膳夫左右。靡人不周。无不能止，瞻卬昊天，云如何里！\n瞻卬昊天，有嘒其星。大夫君子，昭假无赢。大命近止，无弃尔成。\n何求为我。以戾庶正。瞻卬昊天，曷惠其宁？",
        pinyin: "zhuō bǐ yún hàn， zhāo huí yú tiān。 wáng yuē： yú hū！ hé gū jīn zhī rén？ tiān jiàng sāng luàn， jī jǐn jiàn zhēn。\nmí shén bù jǔ， mí ài sī shēng。 guī bì jì zú， níng mò wǒ tīng？\nhàn jì dà shèn， yùn lóng chóng chóng。 bù tiǎn yīn sì， zì jiāo cú gōng。 shàng xià diàn yì， mí shén bù zōng。\nhòu jì bù kè， shàng dì bù lín。 hào yì xià tǔ， níng dīng wǒ gěng\nhàn jì dà shèn， zé bù kě tuī。 jīng jīng yè yè， rú tíng rú léi。 zhōu yú lí mín， mǐ yǒu jié yí。\nhào tiān shàng dì， zé bù wǒ yí。 hú bù xiāng wèi？ xiān zǔ yú cuī。\nhàn jì dà shèn， zé bù kě jǔ。 hè hè yán yán， yún wǒ wú suǒ。 dà mìng jìn zhǐ， mí zhān mí gù。\nqún gōng xiān zhèng， zé bù wǒ zhù。 fù mǔ xiān zǔ， hú níng rěn yǔ？\nhàn jì dà shèn， dí dí shān chuān。 hàn bá wèi nüè， rú dàn rú fén。 wǒ xīn dàn shǔ， yōu xīn rú xūn。\nqún gōng xiān zhèng， zé bù wǒ wén。 hào tiān shàng dì， níng bǐ wǒ dùn？\nhàn jì dà shèn， miǎn miǎn wèi qù。 hú níng diān wǒ yǐ hàn？ cǎn bù zhī qí gù。 qí nián kǒng sù， fāng shè bù mò。\nhào tiān shàng dì， zé bù wǒ yú。\njìng gōng míng shén， yí wú huǐ nù。 hàn jì dà shèn， sàn wú yǒu jì。 jū zāi shù zhèng， jiù zāi zhǒng zǎi。\nqù mǎ shī shì， shàn fū zuǒ yòu。 mí rén bù zhōu。 wú bù néng zhǐ， zhān áng hào tiān， yún rú hé lǐ！\nzhān áng hào tiān， yǒu huì qí xīng。 dài fu jūn zǐ， zhāo jiǎ wú yíng。 dà mìng jìn zhǐ， wú qì ěr chéng。\nhé qiú wèi wǒ。 yǐ lì shù zhèng。 zhān áng hào tiān， hé huì qí níng？",
        translation: "明亮的银河横在天上，大地上却闹起了大旱灾。君王把各种祭祀都办了，牲口和玉器都献上了，可是神灵好像都没有听见。百姓眼看活不下去了，君王忧心忡忡，仰头问苍天：什么时候才肯赐下安宁？",
      }
      ],
    },
    {
      title: "崧高 · 佚名",
      art: "sunrise-hills",
      artPrompt: "古诗《崧高》意境插画：崧高维岳，骏极于天。维岳降神，生甫及申。维申及甫，维周之翰。四国于蕃。四方于宣。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "崧高维岳，骏极于天。维岳降神，生甫及申。维申及甫，维周之翰。四国于蕃。四方于宣。\n亹亹申伯，王缵之事。于邑于谢，南国是式。王命召伯，定申伯之宅。登是南邦，世执其功。\n王命申伯，式是南邦。因是谢人，以作尔庸。王命召伯，彻申伯土田。王命傅御，迁其私人。\n申伯之功，召伯是营。有俶其城，寝庙既成。既成藐藐，王锡申伯。四牡蹻蹻，钩膺濯濯。\n王遣申伯，路车乘马。我图尔居，莫如南土。锡尔介圭，以作尔宝。往近王舅，南土是保。\n申伯信迈，王饯于郿。申伯还南，谢于诚归。王命召伯，彻申伯土疆。以峙其粻，式遄其行。\n申伯番番，既入于谢。徒御啴啴。周邦咸喜，戎有良翰。不显申伯，王之元舅，文武是宪。\n申伯之德，柔惠且直。揉此万邦，闻于四国。吉甫作诵，其诗孔硕。其风四好，以赠申伯。",
        pinyin: "sōng gāo wéi yuè， jùn jí yú tiān。 wéi yuè jiàng shén， shēng fǔ jí shēn。 wéi shēn jí fǔ， wéi zhōu zhī hàn。 sì guó yú fān。 sì fāng yú xuān。\nwěi wěi shēn bó， wáng zuǎn zhī shì。 yú yì yú xiè， nán guó shì shì。 wáng mìng zhào bó， dìng shēn bó zhī zhái。 dēng shì nán bāng， shì zhí qí gōng。\nwáng mìng shēn bó， shì shì nán bāng。 yīn shì xiè rén， yǐ zuò ěr yōng。 wáng mìng zhào bó， chè shēn bó tǔ tián。 wáng mìng fù yù， qiān qí sī rén。\nshēn bó zhī gōng， zhào bó shì yíng。 yǒu chù qí chéng， qǐn miào jì chéng。 jì chéng miǎo miǎo， wáng xī shēn bó。 sì mǔ qiāo qiāo， gōu yīng zhuó zhuó。\nwáng qiǎn shēn bó， lù chē chéng mǎ。 wǒ tú ěr jū， mò rú nán tǔ。 xī ěr jiè guī， yǐ zuò ěr bǎo。 wǎng jìn wáng jiù， nán tǔ shì bǎo。\nshēn bó xìn mài， wáng jiàn yú méi。 shēn bó hái nán， xiè yú chéng guī。 wáng mìng zhào bó， chè shēn bó tǔ jiāng。 yǐ zhì qí zhāng， shì chuán qí xíng。\nshēn bó fān fān， jì rù yú xiè。 tú yù tān tān。 zhōu bāng xián xǐ， róng yǒu liáng hàn。 bù xiǎn shēn bó， wáng zhī yuán jiù， wén wǔ shì xiàn。\nshēn bó zhī dé， róu huì qiě zhí。 róu cǐ wàn bāng， wén yú sì guó。 jí fǔ zuò sòng， qí shī kǒng shuò。 qí fēng sì hǎo， yǐ zèng shēn bó。",
        translation: "高高的四岳高耸入云，山岳降下神灵，生下了贤能的甫侯和申伯。周宣王派申伯去南方的谢城建起城邑，赐给他宝玉、车马和仆从。尹吉甫写下这首又长又好的诗，赠给申伯作纪念。",
      }
      ],
    },
    {
      title: "烝民 · 佚名",
      art: "sunrise-hills",
      artPrompt: "古诗《烝民》意境插画：天生烝民，有物有则。民之秉彝，好是懿德。天监有周，昭假于下。保兹天子，生仲山甫。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "天生烝民，有物有则。民之秉彝，好是懿德。天监有周，昭假于下。保兹天子，生仲山甫。\n仲山甫之德，柔嘉维则。令仪令色。小心翼翼。古训是式。威仪是力。天子是若，明命使赋。\n王命仲山甫，式是百辟，缵戎祖考，王躬是保。出纳王命，王之喉舌。赋政于外，四方爰发。\n肃肃王命，仲山甫将之。邦国若否，仲山甫明之。既明且哲，以保其身。夙夜匪解，以事一人。\n人亦有言，柔则茹之，刚则吐之。维仲山甫，柔亦不茹，刚亦不吐。不侮矜寡，不畏强御。\n人亦有言，德𬨎如毛，民鲜克举之。我仪图之，维仲山甫举之。爱莫助之。衮职有阙，维仲山甫补之。\n仲山甫出祖。四牡业业。征夫捷捷，每怀靡及。四牡彭彭，八鸾锵锵。王命仲山甫，城彼东方。\n四牡骙骙，八鸾喈喈。仲山甫徂齐，式遄其归。吉甫作诵，穆如清风。仲山甫永怀，以慰其心。",
        pinyin: "tiān shēng zhēng mín， yǒu wù yǒu zé。 mín zhī bǐng yí， hǎo shì yì dé。 tiān jiān yǒu zhōu， zhāo jiǎ yú xià。 bǎo zī tiān zǐ， shēng zhòng shān fǔ。\nzhòng shān fǔ zhī dé， róu jiā wéi zé。 lìng yí lìng sè。 xiǎo xīn yì yì。 gǔ xùn shì shì。 wēi yí shì lì。 tiān zǐ shì ruò， míng mìng shǐ fù。\nwáng mìng zhòng shān fǔ， shì shì bǎi pì， zuǎn róng zǔ kǎo， wáng gōng shì bǎo。 chū nà wáng mìng， wáng zhī hóu shé。 fù zhèng yú wài， sì fāng yuán fā。\nsù sù wáng mìng， zhòng shān fǔ jiāng zhī。 bāng guó ruò fǒu， zhòng shān fǔ míng zhī。 jì míng qiě zhé， yǐ bǎo qí shēn。 sù yè fěi jiě， yǐ shì yī rén。\nrén yì yǒu yán， róu zé rú zhī， gāng zé tǔ zhī。 wéi zhòng shān fǔ， róu yì bù rú， gāng yì bù tǔ。 bù wǔ jīn guǎ， bù wèi qiáng yù。\nrén yì yǒu yán， dé yóu rú máo， mín xiān kè jǔ zhī。 wǒ yí tú zhī， wéi zhòng shān fǔ jǔ zhī。 ài mò zhù zhī。 gǔn zhí yǒu quē， wéi zhòng shān fǔ bǔ zhī。\nzhòng shān fǔ chū zǔ。 sì mǔ yè yè。 zhēng fū jié jié， měi huái mí jí。 sì mǔ péng péng， bā luán qiāng qiāng。 wáng mìng zhòng shān fǔ， chéng bǐ dōng fāng。\nsì mǔ kuí kuí， bā luán jiē jiē。 zhòng shān fǔ cú qí， shì chuán qí guī。 jí fǔ zuò sòng， mù rú qīng fēng。 zhòng shān fǔ yǒng huái， yǐ wèi qí xīn。",
        translation: "上天生下众多百姓，每样事物都有它的法则，人们天生喜爱美好的品德。仲山甫温和美善、小心谨慎，不欺侮弱小孤单的人，也不害怕强横的人。尹吉甫作了这首诗，像清风一样温和，安慰他的心。",
      }
      ],
    },
    {
      title: "韩奕 · 佚名",
      art: "sunrise-hills",
      artPrompt: "古诗《韩奕》意境插画：奕奕梁山，维禹甸之，有倬其道。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "奕奕梁山，维禹甸之，有倬其道。\n韩侯受命，王亲命之：缵戎祖考，无废朕命。\n夙夜匪解，虔共尔位，朕命不易。\n粲不庭方，以佐戎辟。四牡奕奕，孔修且张。\n韩侯入觐，以其介圭，入觐于王。\n王锡韩侯，淑旗绥章，簟茀错衡。\n玄衮赤舄，钩膺镂锡，鞹鞃浅幭，鞗革金厄。\n韩侯出祖，出宿于屠。显父饯之，清酒百壶。\n其殽维何？炰鳖鲜鱼。其蔌维何？维笋及蒲。\n其赠维何？乘马路车。笾豆有且。侯氏燕胥。\n韩侯取妻，汾王之甥，蹶父之子。\n韩侯迎止，于蹶之里。\n百两彭彭，八鸾锵锵，不显其光。\n诸娣从之，祁祁如云。韩侯顾之，烂其盈门。\n蹶父孔武，靡国不到。为韩姞相攸，莫如韩乐。\n孔乐韩土，川泽𬣙𬣙，鲂鱮甫甫，麀鹿噳噳。\n有熊有罴，有猫有虎。庆既令居，韩姞燕誉。\n溥彼韩城，燕师所完。以先祖受命，因时百蛮。\n王锡韩侯，其追其貊。奄受北国，因以其伯。\n实墉实壑，实亩实藉。献其貔皮，赤豹黄罴。",
        pinyin: "yì yì liáng shān， wéi yǔ diàn zhī， yǒu zhuō qí dào。\nhán hóu shòu mìng， wáng qīn mìng zhī： zuǎn róng zǔ kǎo， wú fèi zhèn mìng。\nsù yè fěi jiě， qián gòng ěr wèi， zhèn mìng bù yì。\ncàn bù tíng fāng， yǐ zuǒ róng pì。 sì mǔ yì yì， kǒng xiū qiě zhāng。\nhán hóu rù jìn， yǐ qí jiè guī， rù jìn yú wáng。\nwáng xī hán hóu， shū qí suí zhāng， diàn fú cuò héng。\nxuán gǔn chì xì， gōu yīng lòu xī， kuò hóng qiǎn miè， tiáo gé jīn è。\nhán hóu chū zǔ， chū sù yú tú。 xiǎn fù jiàn zhī， qīng jiǔ bǎi hú。\nqí yáo wéi hé？ páo biē xiān yú。 qí sù wéi hé？ wéi sǔn jí pú。\nqí zèng wéi hé？ chéng mǎ lù chē。 biān dòu yǒu qiě。 hóu shì yàn xū。\nhán hóu qǔ qī， fén wáng zhī shēng， juě fù zhī zǐ。\nhán hóu yíng zhǐ， yú juě zhī lǐ。\nbǎi liǎng péng péng， bā luán qiāng qiāng， bù xiǎn qí guāng。\nzhū dì cóng zhī， qí qí rú yún。 hán hóu gù zhī， làn qí yíng mén。\njuě fù kǒng wǔ， mí guó bù dào。 wèi hán jí xiāng yōu， mò rú hán lè。\nkǒng lè hán tǔ， chuān zé xū xū， fáng xù fǔ fǔ， yōu lù yǔ yǔ。\nyǒu xióng yǒu pí， yǒu māo yǒu hǔ。 qìng jì lìng jū， hán jí yàn yù。\npǔ bǐ hán chéng， yàn shī suǒ wán。 yǐ xiān zǔ shòu mìng， yīn shí bǎi mán。\nwáng xī hán hóu， qí zhuī qí mò。 yǎn shòu běi guó， yīn yǐ qí bó。\nshí yōng shí hè， shí mǔ shí jiè。 xiàn qí pí pí， chì bào huáng pí。",
        translation: "高大的梁山上有宽阔的大道，韩侯进京朝见周王，接受了册命和许多赏赐。后来他娶了美丽的妻子，迎亲的车子有一百辆，铃声叮叮当当，排场可大了。他回到封地韩城，修好城墙沟渠，教百姓种田，北方的国家都来进贡。",
      }
      ],
    },
    {
      title: "江汉 · 佚名",
      art: "river-boat",
      artPrompt: "古诗《江汉》意境插画：江汉浮浮，武夫滔滔。匪安匪游，淮夷来求。既出我车，既设我旟。匪安匪舒，淮夷来铺。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "江汉浮浮，武夫滔滔。匪安匪游，淮夷来求。既出我车，既设我旟。匪安匪舒，淮夷来铺。\n江汉汤汤，武夫洸洸。经营四方，告成于王。四方既平，王国庶定。时靡有争，王心载宁。\n江汉之浒，王命召虎：式辟四方，彻我疆土。匪疚匪棘，王国来极。于疆于理，至于南海。\n王命召虎：来旬来宣。文武受命，召公维翰。无曰予小子，召公是似。肇敏戎公，用锡尔祉。\n厘尔圭瓒，秬鬯一卣。告于文人，锡山土田。于周受命，自召祖命，虎拜稽首：天子万年！\n虎拜稽首，对扬王休。作召公考：天子万寿！明明天子，令闻不已，矢其文德，洽此四国。",
        pinyin: "jiāng hàn fú fú， wǔ fū tāo tāo。 fěi ān fěi yóu， huái yí lái qiú。 jì chū wǒ chē， jì shè wǒ yú。 fěi ān fěi shū， huái yí lái pù。\njiāng hàn tāng tāng， wǔ fū guāng guāng。 jīng yíng sì fāng， gào chéng yú wáng。 sì fāng jì píng， wáng guó shù dìng。 shí mí yǒu zhēng， wáng xīn zǎi níng。\njiāng hàn zhī hǔ， wáng mìng zhào hǔ： shì pì sì fāng， chè wǒ jiāng tǔ。 fěi jiù fěi jí， wáng guó lái jí。 yú jiāng yú lǐ， zhì yú nán hǎi。\nwáng mìng zhào hǔ： lái xún lái xuān。 wén wǔ shòu mìng， zhào gōng wéi hàn。 wú yuē yǔ xiǎo zi， zhào gōng shì sì。 zhào mǐn róng gōng， yòng xī ěr zhǐ。\nlí ěr guī zàn， jù chàng yī yǒu。 gào yú wén rén， xī shān tǔ tián。 yú zhōu shòu mìng， zì zhào zǔ mìng， hǔ bài qǐ shǒu： tiān zǐ wàn nián！\nhǔ bài qǐ shǒu， duì yáng wáng xiū。 zuò zhào gōng kǎo： tiān zǐ wàn shòu！ míng míng tiān zǐ， lìng wén bù yǐ， shǐ qí wén dé， qià cǐ sì guó。",
        translation: "长江汉水浩浩荡荡，勇武的将士们奔赴战场去平定淮夷。召虎指挥大军平定四方，向周王报告胜利。周王赐给他玉酒器和土地田产，召虎叩头拜谢，祝愿天子万年长寿。",
      }
      ],
    },
    {
      title: "常武 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《常武》意境插画：赫赫明明。王命卿士，南仲大祖，大师皇父。整我六师，以修我戎。既敬既戒，惠此南国。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "赫赫明明。王命卿士，南仲大祖，大师皇父。整我六师，以修我戎。既敬既戒，惠此南国。\n王谓尹氏，命程伯休父，左右陈行。戒我师旅，率彼淮浦，省此徐土。不留不处，三事就绪。\n赫赫业业，有严天子。王舒保作，匪绍匪游。徐方绎骚，震惊徐方。如雷如霆，徐方震惊。\n王奋厥武，如震如怒。进厥虎臣，阚如虓虎。铺敦淮𣸣，仍执丑虏。截彼淮浦，王师之所。\n王旅啴啴，如飞如翰。如江如汉，如山之苞。如川之流，绵绵翼翼。不测不克，濯征徐国。\n王犹允塞，徐方既来。徐方既同，天子之功。四方既平，徐方来庭。徐方不回，王曰还归。",
        pinyin: "hè hè míng míng。 wáng mìng qīng shì， nán zhòng dà zǔ， dà shī huáng fù。 zhěng wǒ liù shī， yǐ xiū wǒ róng。 jì jìng jì jiè， huì cǐ nán guó。\nwáng wèi yǐn shì， mìng chéng bó xiū fù， zuǒ yòu chén xíng。 jiè wǒ shī lǚ， lǜ bǐ huái pǔ， shěng cǐ xú tǔ。 bù liú bù chù， sān shì jiù xù。\nhè hè yè yè， yǒu yán tiān zǐ。 wáng shū bǎo zuò， fěi shào fěi yóu。 xú fāng yì sāo， zhèn jīng xú fāng。 rú léi rú tíng， xú fāng zhèn jīng。\nwáng fèn jué wǔ， rú zhèn rú nù。 jìn jué hǔ chén， kàn rú xiāo hǔ。 pù dūn huái fén， réng zhí chǒu lǔ。 jié bǐ huái pǔ， wáng shī zhī suǒ。\nwáng lǚ tān tān， rú fēi rú hàn。 rú jiāng rú hàn， rú shān zhī bāo。 rú chuān zhī liú， mián mián yì yì。 bù cè bù kè， zhuó zhēng xú guó。\nwáng yóu yǔn sāi， xú fāng jì lái。 xú fāng jì tóng， tiān zǐ zhī gōng。 sì fāng jì píng， xú fāng lái tíng。 xú fāng bù huí， wáng yuē hái guī。",
        translation: "威名赫赫的周王命令卿士整顿六军，小心谨慎地去平定南方的徐国。王师像雷霆一样震怒，像猛虎一样威猛，徐国的兵士都惊慌不安。徐国归顺了，四方安定，天子得胜凯旋。",
      }
      ],
    },
    {
      title: "瞻卬 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《瞻卬》意境插画：瞻卬昊天，则不我惠。孔填不宁，降此大厉。邦靡有定，士民其瘵。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "瞻卬昊天，则不我惠。孔填不宁，降此大厉。邦靡有定，士民其瘵。\n蟊贼蟊疾，靡有夷届。罪罟不收，靡有夷瘳。\n人有土田，女反有之。人有民人，女覆夺之。此宜无罪，女反收之。\n彼宜有罪，女覆说之。\n哲夫成城，哲妇倾城。懿厥哲妇，为枭为鸱。妇有长舌，维厉之阶。\n乱匪降自天，生自妇人。匪教匪诲，时维妇寺。\n鞫人忮忒。谮始竞背。岂曰不极？伊胡为慝？如贾三倍，君子是识。\n妇无公事，休其蚕织。\n天何以剌？何神不富？舍尔介狄，维予胥忌。不吊不祥，威仪不类。\n人之云亡，邦国殄瘁。\n天之降罔，维其优矣。人之云亡，心之忧矣。天之降罔，维其几矣。\n人之云亡，心之悲矣。\n觱沸槛泉，维其深矣。心之忧矣，宁自今矣？不自我先，不自我后。\n藐藐昊天，无不克巩。无忝皇祖，式救尔后。",
        pinyin: "zhān áng hào tiān， zé bù wǒ huì。 kǒng tián bù níng， jiàng cǐ dà lì。 bāng mí yǒu dìng， shì mín qí zhài。\nmáo zéi máo jí， mí yǒu yí jiè。 zuì gǔ bù shōu， mí yǒu yí chōu。\nrén yǒu tǔ tián， nǚ fǎn yǒu zhī。 rén yǒu mín rén， nǚ fù duó zhī。 cǐ yí wú zuì， nǚ fǎn shōu zhī。\nbǐ yí yǒu zuì， nǚ fù shuō zhī。\nzhé fū chéng chéng， zhé fù qīng chéng。 yì jué zhé fù， wèi xiāo wèi chī。 fù yǒu cháng shé， wéi lì zhī jiē。\nluàn fěi jiàng zì tiān， shēng zì fù rén。 fěi jiào fěi huì， shí wéi fù sì。\njū rén zhì tè。 zèn shǐ jìng bèi。 qǐ yuē bù jí？ yī hú wèi tè？ rú jiǎ sān bèi， jūn zǐ shì shí。\nfù wú gōng shì， xiū qí cán zhī。\ntiān hé yǐ là？ hé shén bù fù？ shè ěr jiè dí， wéi yǔ xū jì。 bù diào bù xiáng， wēi yí bù lèi。\nrén zhī yún wáng， bāng guó tiǎn cuì。\ntiān zhī jiàng wǎng， wéi qí yōu yǐ。 rén zhī yún wáng， xīn zhī yōu yǐ。 tiān zhī jiàng wǎng， wéi qí jǐ yǐ。\nrén zhī yún wáng， xīn zhī bēi yǐ。\nbì fèi kǎn quán， wéi qí shēn yǐ。 xīn zhī yōu yǐ， níng zì jīn yǐ？ bù zì wǒ xiān， bù zì wǒ hòu。\nmiǎo miǎo hào tiān， wú bù kè gǒng。 wú tiǎn huáng zǔ， shì jiù ěr hòu。",
        translation: "抬头仰望苍天，上天却不肯怜惜我们，降下这么大的灾祸。好人的田地和百姓被坏人夺走，国家乱得不得安宁。诗人悲伤地劝告：不要辱没了光荣的祖先，要赶紧醒悟，救救子孙后代。",
      }
      ],
    },
    {
      title: "召旻 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《召旻》意境插画：旻天疾威，天笃降丧。瘨我饥馑，民卒流亡。我居圉卒荒。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "旻天疾威，天笃降丧。瘨我饥馑，民卒流亡。我居圉卒荒。\n天降罪罟，蟊贼内讧。昏椓靡共，溃溃回遹，实靖夷我邦。\n皋皋訿訿，曾不知其玷。兢兢业业，孔填不宁，我位孔贬。\n如彼岁旱，草不溃茂，如彼栖苴。我相此邦，无不溃止。\n维昔之富不如时，维今之疚不如兹。彼疏斯粺，胡不自替？职兄斯引。\n池之竭矣，不云自频。泉之竭矣，不云自中。溥斯害矣，职兄斯弘，不灾我躬。\n昔先王受命，有如召公，日辟国百里，今也日蹙国百里。于乎哀哉！维今之人，不尚有旧！",
        pinyin: "mín tiān jí wēi， tiān dǔ jiàng sàng。 diān wǒ jī jǐn， mín zú liú wáng。 wǒ jū yǔ zú huāng。\ntiān jiàng zuì gǔ， máo zéi nèi hòng。 hūn zhuó mí gòng， kuì kuì huí yù， shí jìng yí wǒ bāng。\ngāo gāo zǐ zǐ， céng bù zhī qí diàn。 jīng jīng yè yè， kǒng tián bù níng， wǒ wèi kǒng biǎn。\nrú bǐ suì hàn， cǎo bù kuì mào， rú bǐ qī jū。 wǒ xiāng cǐ bāng， wú bù kuì zhǐ。\nwéi xī zhī fù bù rú shí， wéi jīn zhī jiù bù rú zī。 bǐ shū sī bài， hú bù zì tì？ zhí xiōng sī yǐn。\nchí zhī jié yǐ， bù yún zì pín。 quán zhī jié yǐ， bù yún zì zhōng。 pǔ sī hài yǐ， zhí xiōng sī hóng， bù zāi wǒ gōng。\nxī xiān wáng shòu mìng， yǒu rú zhào gōng， rì pì guó bǎi lǐ， jīn yě rì cù guó bǎi lǐ。 yú hū āi zāi！ wéi jīn zhī rén， bù shàng yǒu jiù！",
        translation: "秋天阴沉的天降下大灾，饥荒让百姓四处逃亡，国土一片荒凉。坏人互相争斗捣乱，好好一个国家眼看就要崩溃。从前每天开拓百里土地，如今却每天丧失百里，多么令人悲哀啊！",
      }
      ],
    },
    {
      title: "清庙 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《清庙》意境插画：于穆清庙，肃雍显相。济济多士，秉文之德。对越在天，骏奔走在庙。不显不承，无射于人斯。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "于穆清庙，肃雍显相。济济多士，秉文之德。对越在天，骏奔走在庙。不显不承，无射于人斯。",
        pinyin: "yú mù qīng miào， sù yōng xiǎn xiāng。 jì jì duō shì， bǐng wén zhī dé。 duì yuè zài tiān， jùn bēn zǒu zài miào。 bù xiǎn bù chéng， wú shè yú rén sī。",
        translation: "多么庄严清静的宗庙，助祭的人们恭敬又和睦。众多士人秉持着文王的美德，在庙里快步奔走祭祀，一点也不懈怠。文王的光辉德行，人们永远敬仰，永远不会厌弃。",
      }
      ],
    },
    {
      title: "维天之命 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《维天之命》意境插画：维天之命，于穆不已。于乎不显，文王之德之纯。假以溢我，我其收之。骏惠我文王，曾孙笃之。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "维天之命，于穆不已。于乎不显，文王之德之纯。假以溢我，我其收之。骏惠我文王，曾孙笃之。",
        pinyin: "wéi tiān zhī mìng， yú mù bù yǐ。 yú hū bù xiǎn， wén wáng zhī dé zhī chún。 jiǎ yǐ yì wǒ， wǒ qí shōu zhī。 jùn huì wǒ wén wáng， zēng sūn dǔ zhī。",
        translation: "上天的教化运转不停，多么深远啊，文王的品德纯正光明。他安定了我们的心，我们收下他的恩泽，要让子子孙孙都忠诚地继承下去。",
      }
      ],
    },
    {
      title: "维清 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《维清》意境插画：维清缉熙，文王之典。肇禋，迄用有成，维周之祯。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "维清缉熙，文王之典。肇禋，迄用有成，维周之祯。",
        pinyin: "wéi qīng jī xī， wén wáng zhī diǎn。 zhào yīn， qì yòng yǒu chéng， wéi zhōu zhī zhēn。",
        translation: "这法度多么清明光明，是文王留下的典范。从祭祀上天开始，最终成就了大功业，这是周朝的吉兆。",
      }
      ],
    },
    {
      title: "烈文 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《烈文》意境插画：烈文辟公，锡兹祉福。惠我无疆，子孙保之。无封靡于尔邦，维王其崇之。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "烈文辟公，锡兹祉福。惠我无疆，子孙保之。无封靡于尔邦，维王其崇之。\n念兹戎功，继序其皇之。无竞维人，四方其训之。不显维德，百辟其刑之。于乎，前王不忘！",
        pinyin: "liè wén pì gōng， xī zī zhǐ fú。 huì wǒ wú jiāng， zǐ sūn bǎo zhī。 wú fēng mí yú ěr bāng， wéi wáng qí chóng zhī。\nniàn zī róng gōng， jì xù qí huáng zhī。 wú jìng wéi rén， sì fāng qí xùn zhī。 bù xiǎn wéi dé， bǎi pì qí xíng zhī。 yú hū， qián wáng bù wàng！",
        translation: "有功劳有文德的诸侯们，接受了周王赐下的福分，愿这福气无边无际，让子孙世世代代保住它。大家要把先王的功业记在心上，继承发扬光大。先王的恩德，我们不能忘啊！",
      }
      ],
    },
    {
      title: "天作 · 佚名",
      art: "sunrise-hills",
      artPrompt: "古诗《天作》意境插画：天作高山，大王荒之。彼作矣，文王康之。彼徂矣，岐有夷之行。子孙保之。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "天作高山，大王荒之。彼作矣，文王康之。彼徂矣，岐有夷之行。子孙保之。",
        pinyin: "tiān zuò gāo shān， dà wáng huāng zhī。 bǐ zuò yǐ， wén wáng kāng zhī。 bǐ cú yǐ， qí yǒu yí zhī xíng。 zǐ sūn bǎo zhī。",
        translation: "上天造就了高高的岐山，太王来到这里开垦荒地。文王又让百姓在这里安居，通往岐山的路变得平坦好走。子子孙孙要把这份基业守护好。",
      }
      ],
    },
    {
      title: "昊天有成命 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《昊天有成命》意境插画：昊天有成命，二后受之。成王不敢康，夙夜基命宥密。于缉熙！单厥心，四其靖之。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "昊天有成命，二后受之。成王不敢康，夙夜基命宥密。于缉熙！单厥心，四其靖之。",
        pinyin: "hào tiān yǒu chéng mìng， èr hòu shòu zhī。 chéng wáng bù gǎn kāng， sù yè jī mìng yòu mì。 yú jī xī！ dān jué xīn， sì qí jìng zhī。",
        translation: "上天有安排好的使命，文王和武王接受了它。成王不敢贪图安逸，日日夜夜勤勤恳恳治理国家。他诚心诚意尽心尽力，让天下安安稳稳。",
      }
      ],
    },
    {
      title: "我将 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《我将》意境插画：我将我享，维羊维牛，维天其右之。仪式刑文王之典，日靖四方。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "我将我享，维羊维牛，维天其右之。仪式刑文王之典，日靖四方。\n伊嘏文王，既右飨之。我其夙夜，畏天之威，于时保之。",
        pinyin: "wǒ jiāng wǒ xiǎng， wéi yáng wéi niú， wéi tiān qí yòu zhī。 yí shì xíng wén wáng zhī diǎn， rì jìng sì fāng。\nyī gǔ wén wáng， jì yòu xiǎng zhī。 wǒ qí sù yè， wèi tiān zhī wēi， yú shí bǎo zhī。",
        translation: "我把牛羊献上祭祀，请上天来保佑周邦。我们遵照文王的典章法度，天天安定四方。从早到晚都敬畏上天的威严，才能保住这天下。",
      }
      ],
    },
    {
      title: "时迈 · 佚名",
      art: "river-boat",
      artPrompt: "古诗《时迈》意境插画：时迈其邦，昊天其子之，实右序有周。薄言震之，莫不震叠。怀柔百神，及河乔岳，允王维后。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "时迈其邦，昊天其子之，实右序有周。薄言震之，莫不震叠。怀柔百神，及河乔岳，允王维后。\n明昭有周，式序在位。载戢干戈，载橐弓矢。我求懿德，四于时夏，允王保之。",
        pinyin: "shí mài qí bāng， hào tiān qí zǐ zhī， shí yòu xù yǒu zhōu。 báo yán zhèn zhī， mò bù zhèn dié。 huái róu bǎi shén， jí hé qiáo yuè， yǔn wáng wéi hòu。\nmíng zhāo yǒu zhōu， shì xù zài wèi。 zǎi jí gān gē， zǎi tuó gōng shǐ。 wǒ qiú yì dé， sì yú shí xià， yǔn wáng bǎo zhī。",
        translation: "武王巡视各个邦国，上天把他当作儿子一样保佑。天下都被震动了，武王安抚百神和名山大河。他收起干戈弓箭，追求美好的德行，让天下处处和平。",
      }
      ],
    },
    {
      title: "执竞 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《执竞》意境插画：执竞武王，无竞维烈。不显成康，上帝是皇。自彼成康，奄有四方，斤斤其明。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "执竞武王，无竞维烈。不显成康，上帝是皇。自彼成康，奄有四方，斤斤其明。\n钟鼓喤喤，磬莞将将，降福穰穰。降福简简，威仪反反。既醉既饱，福禄来反。",
        pinyin: "zhí jìng wǔ wáng， wú jìng wéi liè。 bù xiǎn chéng kāng， shàng dì shì huáng。 zì bǐ chéng kāng， yǎn yǒu sì fāng， jīn jīn qí míng。\nzhōng gǔ huáng huáng， qìng wǎn jiāng jiāng， jiàng fú ráng ráng。 jiàng fú jiǎn jiǎn， wēi yí fǎn fǎn。 jì zuì jì bǎo， fú lù lái fǎn。",
        translation: "自强不息的武王，功业无人能比。成王康王继承了他，治理得光明堂皇，拥有四方。祭祀时钟鼓齐鸣、磬声铿锵，神灵降下满满的福气，人们吃饱喝足，福禄又回到身边。",
      }
      ],
    },
    {
      title: "思文 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《思文》意境插画：思文后稷，克配彼天。立我烝民，莫菲尔极。贻我来牟，帝命率育，无此疆尔界。陈常于时夏。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "思文后稷，克配彼天。立我烝民，莫菲尔极。贻我来牟，帝命率育，无此疆尔界。陈常于时夏。",
        pinyin: "sī wén hòu jì， kè pèi bǐ tiān。 lì wǒ zhēng mín， mò fēi ěr jí。 yí wǒ lái mù， dì mìng lǜ yù， wú cǐ jiāng ěr jiè。 chén cháng yú shí xià。",
        translation: "德行光明的后稷啊，他的功德可以配享上天。他养育了天下百姓，没有谁不受到他的恩惠。上天赐下良种麦子，吩咐四面八方都去种，不分你的地我的地，让全国的农事都兴旺。",
      }
      ],
    },
    {
      title: "臣工 · 佚名",
      art: "spring-bird",
      artPrompt: "古诗《臣工》意境插画：嗟嗟臣工，敬尔在公。王厘尔成，来咨来茹。嗟嗟保介，维莫之春，亦又何求？如何新畲？——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "嗟嗟臣工，敬尔在公。王厘尔成，来咨来茹。嗟嗟保介，维莫之春，亦又何求？如何新畲？\n于皇来牟，将受厥明。明昭上帝，迄用康年。命我众人：庤乃钱镈，奄观铚艾。",
        pinyin: "jiē jiē chén gōng， jìng ěr zài gōng。 wáng lí ěr chéng， lái zī lái rú。 jiē jiē bǎo jiè， wéi mò zhī chūn， yì yòu hé qiú？ rú hé xīn shē？\nyú huáng lái mù， jiāng shòu jué míng。 míng zhāo shàng dì， qì yòng kāng nián。 mìng wǒ zhòng rén： zhì nǎi qián bó， yǎn guān zhì ài。",
        translation: "周王招呼百官们：要恭敬地办好公事，办成了记得来汇报，有困难也来商量。他又问田官：如今暮春三月，新田旧地整治得怎么样了？快让大家备好锄头镰刀，麦子熟了好一起收割。",
      }
      ],
    },
    {
      title: "噫嘻 · 佚名",
      art: "rice-field",
      artPrompt: "古诗《噫嘻》意境插画：噫嘻成王，既昭假尔。率时农夫，播厥百谷。骏发尔私，终三十里。亦服尔耕，十千维耦。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "噫嘻成王，既昭假尔。率时农夫，播厥百谷。骏发尔私，终三十里。亦服尔耕，十千维耦。",
        pinyin: "yī xī chéng wáng， jì zhāo jiǎ ěr。 lǜ shí nóng fū， bō jué bǎi gǔ。 jùn fā ěr sī， zhōng sān shí lǐ。 yì fú ěr gēng， shí qiān wéi ǒu。",
        translation: "啊，成王已经向天祷告过了，他带领着农夫们去播种百谷。把田地都耕起来，方圆三十里全都种上。上万个农夫两人一对，一起在田里卖力耕作。",
      }
      ],
    },
    {
      title: "振鹭 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《振鹭》意境插画：振鹭于飞，于彼西雍。我客戾止，亦有斯容。在彼无恶，在此无斁。庶几夙夜，以永终誉。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "振鹭于飞，于彼西雍。我客戾止，亦有斯容。在彼无恶，在此无斁。庶几夙夜，以永终誉。",
        pinyin: "zhèn lù yú fēi， yú bǐ xī yōng。 wǒ kè lì zhǐ， yì yǒu sī róng。 zài bǐ wú è， zài cǐ wú yì。 shù jī sù yè， yǐ yǒng zhōng yù。",
        translation: "一群白鹭展翅飞起，落在西边的水泽上。尊贵的客人来到这里，也有白鹭一样高洁的仪容。他们在本国不招人厌恶，在这里也不让人厌烦，愿他们日夜勤勉，让好名声永远保持下去。",
      }
      ],
    },
    {
      title: "丰年 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《丰年》意境插画：丰年多黍多稌，亦有高廪，万亿及秭。为酒为醴，烝畀祖妣。以洽百礼，降福孔皆。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "丰年多黍多稌，亦有高廪，万亿及秭。为酒为醴，烝畀祖妣。以洽百礼，降福孔皆。",
        pinyin: "fēng nián duō shǔ duō tú， yì yǒu gāo lǐn， wàn yì jí zǐ。 wèi jiǔ wèi lǐ， zhēng bì zǔ bǐ。 yǐ qià bǎi lǐ， jiàng fú kǒng jiē。",
        translation: "丰收的年成，黍子和稻子打得特别多，高大的粮仓装得满满的，成万成亿数也数不清。人们用粮食酿成清酒和甜酒，恭敬地献给祖先。各种祭祀的礼数都办得妥妥当当，神灵降下普遍的大福。",
      }
      ],
    },
    {
      title: "有瞽 · 佚名",
      art: "rice-field",
      artPrompt: "古诗《有瞽》意境插画：有瞽有瞽，在周之庭。设业设虡，崇牙树羽。应田县鼓，鞉磬柷圉。既备——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "有瞽有瞽，在周之庭。设业设虡，崇牙树羽。应田县鼓，鞉磬柷圉。既备\n乃奏，箫管备举。喤喤厥声，肃雍和鸣，先祖是听。我客戾止，永观厥成。",
        pinyin: "yǒu gǔ yǒu gǔ， zài zhōu zhī tíng。 shè yè shè jù， chóng yá shù yǔ。 yìng tián xiàn gǔ， táo qìng zhù yǔ。 jì bèi\nnǎi zòu， xiāo guǎn bèi jǔ。 huáng huáng jué shēng， sù yōng hé míng， xiān zǔ shì tīng。 wǒ kè lì zhǐ， yǒng guān jué chéng。",
        translation: "盲人乐师们坐在周朝的庙庭里，架子上摆好了鼓、磬、箫、管各种乐器。大家一起奏乐，声音洪亮又和谐，祖先们都来聆听。客人们也赶来看这盛大的演奏，一直看到乐曲圆满结束。",
      }
      ],
    },
    {
      title: "潜 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《潜》意境插画：猗与漆沮，潜有多鱼。有鳣有鲔，鲦鲿鰋鲤。以享以祀，以介景福。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "猗与漆沮，潜有多鱼。有鳣有鲔，鲦鲿鰋鲤。以享以祀，以介景福。",
        pinyin: "yī yǔ qī jǔ， qián yǒu duō yú。 yǒu zhān yǒu wěi， tiáo cháng yǎn lǐ。 yǐ xiǎng yǐ sì， yǐ jiè jǐng fú。",
        translation: "漆水和沮水多好啊，水潭里养着许许多多的鱼。有大鳣鱼有鲔鱼，还有鲦鱼、鲿鱼、鲇鱼和鲤鱼。拿来祭祀祖先，祈求降下大大的福气。",
      }
      ],
    },
    {
      title: "雝 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《雝》意境插画：有来雝雝，至止肃肃。相维辟公，天子穆穆。于荐广牡，相予四祀。假哉皇考！绥予孝子。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "有来雝雝，至止肃肃。相维辟公，天子穆穆。于荐广牡，相予四祀。假哉皇考！绥予孝子。\n宣哲维人，文武维后。燕及皇天，克昌厥后。绥我眉寿，介以繁祉，既右烈考，亦右文母。",
        pinyin: "yǒu lái yōng yōng， zhì zhǐ sù sù。 xiāng wéi pì gōng， tiān zǐ mù mù。 yú jiàn guǎng mǔ， xiāng yǔ sì sì。 jiǎ zāi huáng kǎo！ suí yǔ xiào zǐ。\nxuān zhé wéi rén， wén wǔ wéi hòu。 yàn jí huáng tiān， kè chāng jué hòu。 suí wǒ méi shòu， jiè yǐ fán zhǐ， jì yòu liè kǎo， yì yòu wén mǔ。",
        translation: "诸侯们和和睦睦地来了，到庙里恭恭敬敬地助祭，天子庄严又肃穆。大家献上肥壮的牛羊，愿先父保佑尽孝的儿子。愿我们长寿安康、多福多子，先父和先母都来享用这祭礼。",
      }
      ],
    },
    {
      title: "载见 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《载见》意境插画：载见辟王，曰求厥章。龙旗阳阳，和铃央央。鞗革有鸧，休有烈光。率见昭考，以孝以享。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "载见辟王，曰求厥章。龙旗阳阳，和铃央央。鞗革有鸧，休有烈光。率见昭考，以孝以享。\n以介眉寿，永言保之，思皇多祜。烈文辟公，绥以多福，俾缉熙于纯嘏。",
        pinyin: "zǎi jiàn pì wáng， yuē qiú jué zhāng。 lóng qí yáng yáng， hé líng yāng yāng。 tiáo gé yǒu cāng， xiū yǒu liè guāng。 lǜ jiàn zhāo kǎo， yǐ xiào yǐ xiǎng。\nyǐ jiè méi shòu， yǒng yán bǎo zhī， sī huáng duō hù。 liè wén pì gōng， suí yǐ duō fú， bǐ jī xī yú chún gǔ。",
        translation: "诸侯前来看望周王，说要学习典章礼仪。绘着蛟龙的旗帜鲜艳明亮，车上的铃铛响成一片。大家跟着天子到宗庙里，恭恭敬敬祭祀先王，祈求长寿，把大福好好保住。",
      }
      ],
    },
    {
      title: "有客 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《有客》意境插画：有客有客，亦白其马。有萋有且，敦琢其旅。有客宿宿，有客信信。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "有客有客，亦白其马。有萋有且，敦琢其旅。有客宿宿，有客信信。\n言授之絷，以絷其马。薄言追之，左右绥之。既有淫威，降福孔夷。",
        pinyin: "yǒu kè yǒu kè， yì bái qí mǎ。 yǒu qī yǒu qiě， dūn zhuó qí lǚ。 yǒu kè sù sù， yǒu kè xìn xìn。\nyán shòu zhī zhí， yǐ zhí qí mǎ。 báo yán zhuī zhī， zuǒ yòu suí zhī。 jì yǒu yín wēi， jiàng fú kǒng yí。",
        translation: "贵客来了贵客来了，骑着雪白的骏马，随从们个个衣着鲜亮整齐。主人留客住了一天又一天，还替他拴好马匹，热情地送了一程又一程。客人德行这样美好，愿大福平平安安地降到他身上。",
      }
      ],
    },
    {
      title: "武 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《武》意境插画：于皇武王！无竞维烈。允文文王，克开厥后。嗣武受之，胜殷遏刘，耆定尔功。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "于皇武王！无竞维烈。允文文王，克开厥后。嗣武受之，胜殷遏刘，耆定尔功。",
        pinyin: "yú huáng wǔ wáng！ wú jìng wéi liè。 yǔn wén wén wáng， kè kāi jué hòu。 sì wǔ shòu zhī， shèng yīn è liú， qí dìng ěr gōng。",
        translation: "啊，伟大的武王！你的功业天下无敌。文王为后代开创了基业，武王继承了它。战胜殷商，制止了杀戮，稳稳地成就了天下太平的大功。",
      }
      ],
    },
    {
      title: "闵予小子 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《闵予小子》意境插画：闵予小子，遭家不造，嬛嬛在疚。于乎皇考，永世克孝。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "闵予小子，遭家不造，嬛嬛在疚。于乎皇考，永世克孝。\n念兹皇祖，陟降庭止。维予小子，夙夜敬止。于乎皇王，继序思不忘。",
        pinyin: "mǐn yǔ xiǎo zi， zāo jiā bù zào， qióng qióng zài jiù。 yú hū huáng kǎo， yǒng shì kè xiào。\nniàn zī huáng zǔ， zhì jiàng tíng zhǐ。 wéi yǔ xiǎo zi， sù yè jìng zhǐ。 yú hū huáng wáng， jì xù sī bù wàng。",
        translation: "可怜我这个年幼的人，家遭大难，孤零零地守在悲伤里。伟大的父亲一生都孝顺，我要想着先王的教导。从早到晚恭敬办事，继承大位的心思，一刻也不敢忘记。",
      }
      ],
    },
    {
      title: "访落 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《访落》意境插画：访予落止，率时昭考。于乎悠哉，朕未有艾。将予就之，继犹判涣。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "访予落止，率时昭考。于乎悠哉，朕未有艾。将予就之，继犹判涣。\n维予小子，未堪家多难。绍庭上下，陟降厥家。休矣皇考，以保明其身。",
        pinyin: "fǎng yǔ luò zhǐ， lǜ shí zhāo kǎo。 yú hū yōu zāi， zhèn wèi yǒu ài。 jiāng yǔ jiù zhī， jì yóu pàn huàn。\nwéi yǔ xiǎo zi， wèi kān jiā duō nán。 shào tíng shàng xià， zhì jiàng jué jiā。 xiū yǐ huáng kǎo， yǐ bǎo míng qí shēn。",
        translation: "我刚一开始执政，就向先王的神灵请教，遵循英明父亲的道路。我还太年轻，没有治理的经验，请扶助我跟上先人的脚步。如今家中多灾多难，愿伟大的先父在上天保佑我平安。",
      }
      ],
    },
    {
      title: "敬之 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《敬之》意境插画：敬之敬之，天维显思，命不易哉。无曰高高在上，陟降厥士，日监在兹。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "敬之敬之，天维显思，命不易哉。无曰高高在上，陟降厥士，日监在兹。\n维予小子，不聪敬止。日就月将，学有缉熙于光明。佛时仔肩，示我显德行。",
        pinyin: "jìng zhī jìng zhī， tiān wéi xiǎn sī， mìng bù yì zāi。 wú yuē gāo gāo zài shàng， zhì jiàng jué shì， rì jiān zài zī。\nwéi yǔ xiǎo zi， bù cōng jìng zhǐ。 rì jiù yuè jiāng， xué yǒu jī xī yú guāng míng。 fó shí zǎi jiān， shì wǒ xiǎn dé xíng。",
        translation: "要敬畏啊要敬畏，上天明明白白，天命可不容易守住啊。不要说天高高在上就不管事，它天天在人间上上下下，时刻监察着呢。我年轻不懂事，要一天一月地积累着学习，走向光明，请贤臣帮我分担重任，教我明白的德行。",
      }
      ],
    },
    {
      title: "小毖 · 佚名",
      art: "spring-bird",
      artPrompt: "古诗《小毖》意境插画：予其惩，而毖后患。莫予荓蜂，自求辛螫。肇允彼桃虫，拼飞维鸟。未堪家多难，予又集于蓼。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "予其惩，而毖后患。莫予荓蜂，自求辛螫。肇允彼桃虫，拼飞维鸟。未堪家多难，予又集于蓼。",
        pinyin: "yǔ qí chéng， ér bì hòu huàn。 mò yǔ píng fēng， zì qiú xīn shì。 zhào yǔn bǐ táo chóng， pīn fēi wéi niǎo。 wèi kān jiā duō nán， yǔ yòu jí yú liǎo。",
        translation: "我要接受教训，小心提防以后的祸患，不让自己再吃这种苦头。小小的鹪鹩鸟看着不起眼，飞起来也是一只厉害的鸟啊。家中正逢多难，我又陷入困苦，千万要谨慎小心了。",
      }
      ],
    },
    {
      title: "载芟 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《载芟》意境插画：载芟载柞，其耕泽泽。千耦其耘，徂隰徂畛。侯主侯伯，侯亚侯旅，侯彊侯以。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "载芟载柞，其耕泽泽。千耦其耘，徂隰徂畛。侯主侯伯，侯亚侯旅，侯彊侯以。\n有嗿其馌，思媚其妇，有依其士。有略其耜，俶载南亩，播厥百谷。实函斯活，驿驿其达。\n有厌其杰，厌厌其苗，绵绵其麃。载获济济，有实其积，万亿及秭。为酒为醴，烝畀祖妣，不洽百礼。\n有飶其香。邦家之光。有椒其馨，胡考之宁。匪且有且，匪今斯今，振古如兹。",
        pinyin: "zǎi shān zǎi zhà， qí gēng zé zé。 qiān ǒu qí yún， cú xí cú zhěn。 hóu zhǔ hóu bó， hóu yà hóu lǚ， hóu qiáng hóu yǐ。\nyǒu tǎn qí yè， sī mèi qí fù， yǒu yī qí shì。 yǒu lüè qí sì， chù zǎi nán mǔ， bō jué bǎi gǔ。 shí hán sī huó， yì yì qí dá。\nyǒu yàn qí jié， yàn yàn qí miáo， mián mián qí biāo。 zǎi huò jì jì， yǒu shí qí jī， wàn yì jí zǐ。 wèi jiǔ wèi lǐ， zhēng bì zǔ bǐ， bù qià bǎi lǐ。\nyǒu bì qí xiāng。 bāng jiā zhī guāng。 yǒu jiāo qí xīn， hú kǎo zhī níng。 fěi qiě yǒu qiě， fěi jīn sī jīn， zhèn gǔ rú zī。",
        translation: "拔掉野草砍去杂树，把田土耕得松软，上千对农夫一起在田里播种百谷。庄稼出了苗，又密又壮，收获的粮食堆得成万成亿数不清。酿成香喷喷的美酒献给祖先，家国有光彩，老人得安宁，这样的丰收从古以来就是这样。",
      }
      ],
    },
    {
      title: "良耜 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《良耜》意境插画：畟畟良耜，俶载南亩。播厥百谷，实函斯活。或来瞻女，载筐及莒，其饟伊黍。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "畟畟良耜，俶载南亩。播厥百谷，实函斯活。或来瞻女，载筐及莒，其饟伊黍。\n其笠伊纠，其镈斯赵，以薅荼蓼。荼蓼朽止，黍稷茂止。获之挃挃，积之栗栗。\n其崇如墉，其比如栉。以开百室，百室盈止，妇子宁止。杀时犉牡，有捄其角。以似以续，续古之人。",
        pinyin: "cè cè liáng sì， chù zǎi nán mǔ。 bō jué bǎi gǔ， shí hán sī huó。 huò lái zhān nǚ， zǎi kuāng jí jǔ， qí xiǎng yī shǔ。\nqí lì yī jiū， qí bó sī zhào， yǐ hāo tú liǎo。 tú liǎo xiǔ zhǐ， shǔ jì mào zhǐ。 huò zhī zhì zhì， jī zhī lì lì。\nqí chóng rú yōng， qí bǐ rú zhì。 yǐ kāi bǎi shì， bǎi shì yíng zhǐ， fù zǐ níng zhǐ。 shā shí chún mǔ， yǒu jiù qí jiǎo。 yǐ sì yǐ xù， xù gǔ zhī rén。",
        translation: "锋利的犁头翻开南边的田地，播下百谷的种子，种子都发了芽。人们戴着斗笠除草培土，妻子提着方筐圆篮送来香喷喷的小米饭。庄稼茂盛，收下的谷子堆得像城墙、密得像梳齿，家家粮仓都装满，杀牛祭祀，像古人一样年年丰收。",
      }
      ],
    },
    {
      title: "丝衣 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《丝衣》意境插画：丝衣其紑，载弁俅俅。自堂徂基，自羊徂牛，鼐鼎及鼒，兕觥其觩。旨酒思柔。不吴不敖，胡考之休。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "丝衣其紑，载弁俅俅。自堂徂基，自羊徂牛，鼐鼎及鼒，兕觥其觩。旨酒思柔。不吴不敖，胡考之休。",
        pinyin: "sī yī qí fóu， zǎi biàn qiú qiú。 zì táng cú jī， zì yáng cú niú， nài dǐng jí zī， sì gōng qí qiú。 zhǐ jiǔ sī róu。 bù wú bù áo， hú kǎo zhī xiū。",
        translation: "祭祀的人穿着洁白的丝衣，戴着端正的皮帽，从庙堂走到门基查看祭品。祭祀用的有羊有牛，还有大大小小的鼎和弯弯的犀角酒杯。美酒温和味美，大家安静庄重不喧哗，求得老人的洪福。",
      }
      ],
    },
    {
      title: "酌 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《酌》意境插画：于铄王师，遵养时晦。时纯熙矣，是用大介。我龙受之，蹻蹻王之造。载用有嗣，实维尔公允师。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "于铄王师，遵养时晦。时纯熙矣，是用大介。我龙受之，蹻蹻王之造。载用有嗣，实维尔公允师。",
        pinyin: "yú shuò wáng shī， zūn yǎng shí huì。 shí chún xī yǐ， shì yòng dà jiè。 wǒ lóng shòu zhī， qiāo qiāo wáng zhī zào。 zǎi yòng yǒu sì， shí wéi ěr gōng yǔn shī。",
        translation: "多么光辉的周王军队，当初按着时势休养生息。等到天下大势明朗，就大举兴兵，一举成功。英勇的将士们建立了功业，后人要把这份公正的功业当作榜样传承下去。",
      }
      ],
    },
    {
      title: "桓 · 佚名",
      art: "primer-scroll",
      artPrompt: "古诗《桓》意境插画：绥万邦，屡丰年。天命匪解，桓桓武王。保有厥士，于以四方，克定厥家。于昭于天，皇以间之。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "绥万邦，屡丰年。天命匪解，桓桓武王。保有厥士，于以四方，克定厥家。于昭于天，皇以间之。",
        pinyin: "suí wàn bāng， lǚ fēng nián。 tiān mìng fěi jiě， huán huán wǔ wáng。 bǎo yǒu jué shì， yú yǐ sì fāng， kè dìng jué jiā。 yú zhāo yú tiān， huáng yǐ jiān zhī。",
        translation: "安定万邦，连年丰收，上天的眷顾从不停歇。英武的武王拥有贤明的臣子，平定四方，安定了自己的家国。他的光辉直达上天，上天立他为天下的君主。",
      }
      ],
    },
    {
      title: "赉 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《赉》意境插画：文王既勤止，我应受之。敷时绎思，我徂维求定。时周之命，于绎思。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "文王既勤止，我应受之。敷时绎思，我徂维求定。时周之命，于绎思。",
        pinyin: "wén wáng jì qín zhǐ， wǒ yìng shòu zhī。 fū shí yì sī， wǒ cú wéi qiú dìng。 shí zhōu zhī mìng， yú yì sī。",
        translation: "文王一生勤劳创业，这份基业该由我来继承。我要把他的恩泽广布四方，出兵征战只求天下安定。这是周家承受的天命啊，要永远记在心间。",
      }
      ],
    },
    {
      title: "般 · 佚名",
      art: "river-boat",
      artPrompt: "古诗《般》意境插画：于皇时周！陟其高山，嶞山乔岳，允犹翕河。敷天之下，裒时之对。时周之命。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "于皇时周！陟其高山，嶞山乔岳，允犹翕河。敷天之下，裒时之对。时周之命。",
        pinyin: "yú huáng shí zhōu！ zhì qí gāo shān， tuò shān qiáo yuè， yǔn yóu xī hé。 fū tiān zhī xià， póu shí zhī duì。 shí zhōu zhī mìng。",
        translation: "啊，壮美的周家天下！登上高高的山顶，小山大山都在脚下，百川顺着河道汇进黄河。普天之下，诸侯们都来应命朝会。这就是周家承受的天命啊。",
      }
      ],
    },
    {
      title: "𬳶 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《𬳶》意境插画：𬳶𬳶牡马，在坰之野。薄言𬳶者，有驈有皇，有骊有黄，以车彭彭。思无疆思，马斯臧。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "𬳶𬳶牡马，在坰之野。薄言𬳶者，有驈有皇，有骊有黄，以车彭彭。思无疆思，马斯臧。\n𬳶𬳶牡马，在坰之野。薄言𬳶者，有骓有𬳵，有骍有骐，以车伾伾。思无期思，马斯才。\n𬳶𬳶牡马，在坰之野。溥言𬳶者，有驒有骆，有骝有雒，以车绎绎。思无斁思，马斯作。\n𬳶𬳶牡马，在坰之野。薄言𬳶者，有骃有騢，有驔有鱼，以车祛祛。思无邪思，马斯徂。",
        pinyin: "jiōng jiōng mǔ mǎ， zài jiōng zhī yě。 báo yán jiōng zhě， yǒu yù yǒu huáng， yǒu lí yǒu huáng， yǐ chē péng péng。 sī wú jiāng sī， mǎ sī zāng。\njiōng jiōng mǔ mǎ， zài jiōng zhī yě。 báo yán jiōng zhě， yǒu zhuī yǒu pī， yǒu xīng yǒu qí， yǐ chē pī pī。 sī wú qī sī， mǎ sī cái。\njiōng jiōng mǔ mǎ， zài jiōng zhī yě。 pǔ yán jiōng zhě， yǒu tuó yǒu luò， yǒu liú yǒu luò， yǐ chē yì yì。 sī wú yì sī， mǎ sī zuò。\njiōng jiōng mǔ mǎ， zài jiōng zhī yě。 báo yán jiōng zhě， yǒu yīn yǒu xiá， yǒu diàn yǒu yú， yǐ chē qū qū。 sī wú xié sī， mǎ sī cú。",
        translation: "又高又肥的骏马放牧在远郊的旷野上。有黑身白胯的，有黄白杂色的，还有纯黑和纯黄的，驾起车来雄壮有力。养马的心思没有止境，马儿就长得越来越壮实。",
      }
      ],
    },
    {
      title: "有駜 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《有駜》意境插画：有駜有駜，駜彼乘黄。夙夜在公，在公明明。振振鹭，鹭于下。鼓咽咽，醉言舞。于胥乐兮！——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "有駜有駜，駜彼乘黄。夙夜在公，在公明明。振振鹭，鹭于下。鼓咽咽，醉言舞。于胥乐兮！\n有駜有駜，駜彼乘牡。夙夜在公，在公饮酒。振振鹭，鹭于飞。鼓咽咽，醉言归。于胥乐兮！\n有駜有駜，駜彼乘駽。夙夜在公，在公载燕。自今以始，岁其有。君子有谷，诒孙子。于胥乐兮！",
        pinyin: "yǒu bì yǒu bì， bì bǐ chéng huáng。 sù yè zài gōng， zài gōng míng míng。 zhèn zhèn lù， lù yú xià。 gǔ yàn yàn， zuì yán wǔ。 yú xū lè xī！\nyǒu bì yǒu bì， bì bǐ chéng mǔ。 sù yè zài gōng， zài gōng yǐn jiǔ。 zhèn zhèn lù， lù yú fēi。 gǔ yàn yàn， zuì yán guī。 yú xū lè xī！\nyǒu bì yǒu bì， bì bǐ chéng xuān。 sù yè zài gōng， zài gōng zǎi yàn。 zì jīn yǐ shǐ， suì qí yǒu。 jūn zǐ yǒu gǔ， yí sūn zi。 yú xū lè xī！",
        translation: "马儿吃饱了肥又壮，拉车的四匹黄马真漂亮。官员们日夜忙着公事，尽心又尽力。宴席上鼓声咚咚，像白鹭一样的舞队翩翩起舞，大家一同欢乐，愿年年有余粮，把福泽留给子孙。",
      }
      ],
    },
    {
      title: "泮水 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《泮水》意境插画：思乐泮水，薄采其芹。鲁侯戾止，言观其旗。其旗茷茷，鸾声哕哕。无小无大，从公于迈。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "思乐泮水，薄采其芹。鲁侯戾止，言观其旗。其旗茷茷，鸾声哕哕。无小无大，从公于迈。\n思乐泮水，薄采其藻。鲁侯戾止，其马蹻蹻。其马蹻蹻，其音昭昭。载色载笑，匪怒伊教。\n思乐泮水，薄采其茆。鲁侯戾止，在泮饮酒。既饮旨酒，永锡难老。顺彼长道，屈此群丑。\n穆穆鲁侯，敬明其德。敬慎威仪，维民之则。允文允武，昭假烈祖。靡有不孝，自求伊祜。\n明明鲁侯，克明其德。既作泮宫，淮夷攸服。矫矫虎臣，在泮献馘。淑问如皋陶，在泮献囚。\n济济多士，克广德心。桓桓于征，狄彼东南。烝烝皇皇，不吴不扬。不告于讻，在泮献功。\n角弓其觩。束矢其搜。戎车孔博。徒御无斁。既克淮夷，孔淑不逆。式固尔犹，淮夷卒获。\n翩彼飞鸮，集于泮林。食我桑黮，怀我好音。憬彼淮夷，来献其琛。元龟象齿，大赂南金。",
        pinyin: "sī lè pàn shuǐ， báo cǎi qí qín。 lǔ hóu lì zhǐ， yán guān qí qí。 qí qí fá fá， luán shēng yuě yuě。 wú xiǎo wú dà， cóng gōng yú mài。\nsī lè pàn shuǐ， báo cǎi qí zǎo。 lǔ hóu lì zhǐ， qí mǎ qiāo qiāo。 qí mǎ qiāo qiāo， qí yīn zhāo zhāo。 zǎi sè zǎi xiào， fěi nù yī jiào。\nsī lè pàn shuǐ， báo cǎi qí máo。 lǔ hóu lì zhǐ， zài pàn yǐn jiǔ。 jì yǐn zhǐ jiǔ， yǒng xī nán lǎo。 shùn bǐ cháng dào， qū cǐ qún chǒu。\nmù mù lǔ hóu， jìng míng qí dé。 jìng shèn wēi yí， wéi mín zhī zé。 yǔn wén yǔn wǔ， zhāo jiǎ liè zǔ。 mí yǒu bù xiào， zì qiú yī hù。\nmíng míng lǔ hóu， kè míng qí dé。 jì zuò pàn gōng， huái yí yōu fú。 jiǎo jiǎo hǔ chén， zài pàn xiàn guó。 shū wèn rú gāo táo， zài pàn xiàn qiú。\njì jì duō shì， kè guǎng dé xīn。 huán huán yú zhēng， dí bǐ dōng nán。 zhēng zhēng huáng huáng， bù wú bù yáng。 bù gào yú xiōng， zài pàn xiàn gōng。\njiǎo gōng qí qiú。 shù shǐ qí sōu。 róng chē kǒng bó。 tú yù wú yì。 jì kè huái yí， kǒng shū bù nì。 shì gù ěr yóu， huái yí zú huò。\npiān bǐ fēi xiāo， jí yú pàn lín。 shí wǒ sāng dàn， huái wǒ hǎo yīn。 jǐng bǐ huái yí， lái xiàn qí chēn。 yuán guī xiàng chǐ， dà lù nán jīn。",
        translation: "快乐的泮水边，人们采下鲜嫩的芹菜，鲁侯来到了，旗帜飘扬，铃声悦耳，大小官员都跟着他走。鲁侯建起泮宫，教化百姓，自己敬慎德行，和和气气，做百姓的榜样。他平定了淮夷，在泮宫献功庆贺，连淮夷也来进贡大龟、象牙和南方的好金子。",
      }
      ],
    },
    {
      title: "閟宫 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《閟宫》意境插画：閟宫有侐，实实枚枚。赫赫姜嫄，其德不回。上帝是依，无灾无害。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "閟宫有侐，实实枚枚。赫赫姜嫄，其德不回。上帝是依，无灾无害。\n弥月不迟，是生后稷。降之百福。黍稷重穋，稙稚菽麦。奄有下国，俾民稼穑。\n有稷有黍，有稻有秬。奄有下土，缵禹之绪。后稷之孙，实维大王。\n居岐之阳，实始剪商。至于文武，缵大王之绪，致天之届，于牧之野。\n无二无虞，上帝临女。敦商之旅，克咸厥功。王曰叔父，建尔元子，俾侯于鲁。\n大启尔宇，为周室辅。乃命鲁公，俾侯于东。锡之山川，土田附庸。\n周公之孙，庄公之子。龙旗承祀。六辔耳耳。春秋匪解，享祀不忒。\n皇皇后帝！皇祖后稷！享以骍牺，是飨是宜。降福既多，周公皇祖，亦其福女。\n秋而载尝，夏而楅衡，白牡骍刚。牺尊将将，毛炰胾羹。笾豆大房，万舞洋洋。\n孝孙有庆。俾尔炽而昌，俾尔寿而臧。保彼东方，鲁邦是尝。不亏不崩，不震不腾。\n三寿作朋，如冈如陵。公车千乘，朱英绿縢。二矛重弓。公徒三万，贝胄朱綅。\n烝徒增增，戎狄是膺，荆舒是惩，则莫我敢承！俾尔昌而炽，俾尔寿而富。\n黄发台背，寿胥与试。俾尔昌而大，俾尔耆而艾。万有千岁，眉寿无有害。\n泰山岩岩，鲁邦所詹。奄有龟蒙，遂荒大东。至于海邦，淮夷来同。\n莫不率从，鲁侯之功。保有凫绎，遂荒徐宅。至于海邦，淮夷蛮貊。\n及彼南夷，莫不率从。莫敢不诺，鲁侯是若。天锡公纯嘏，眉寿保鲁。\n居常与许，复周公之宇。鲁侯燕喜，令妻寿母。宜大夫庶士，邦国是有。\n既多受祉，黄发儿齿。徂徕之松，新甫之柏。是断是度，是寻是尺。\n松桷有舄，路寝孔硕，新庙奕奕。奚斯所作，孔曼且硕，万民是若。",
        pinyin: "bì gōng yǒu xù， shí shí méi méi。 hè hè jiāng yuán， qí dé bù huí。 shàng dì shì yī， wú zāi wú hài。\nmí yuè bù chí， shì shēng hòu jì。 jiàng zhī bǎi fú。 shǔ jì zhòng lù， zhī zhì shū mài。 yǎn yǒu xià guó， bǐ mín jià sè。\nyǒu jì yǒu shǔ， yǒu dào yǒu jù。 yǎn yǒu xià tǔ， zuǎn yǔ zhī xù。 hòu jì zhī sūn， shí wéi dà wáng。\njū qí zhī yáng， shí shǐ jiǎn shāng。 zhì yú wén wǔ， zuǎn dà wáng zhī xù， zhì tiān zhī jiè， yú mù zhī yě。\nwú èr wú yú， shàng dì lín nǚ。 dūn shāng zhī lǚ， kè xián jué gōng。 wáng yuē shū fù， jiàn ěr yuán zǐ， bǐ hóu yú lǔ。\ndà qǐ ěr yǔ， wèi zhōu shì fǔ。 nǎi mìng lǔ gōng， bǐ hóu yú dōng。 xī zhī shān chuān， tǔ tián fù yōng。\nzhōu gōng zhī sūn， zhuāng gōng zhī zǐ。 lóng qí chéng sì。 liù pèi ěr ěr。 chūn qiū fěi jiě， xiǎng sì bù tè。\nhuáng huáng hòu dì！ huáng zǔ hòu jì！ xiǎng yǐ xīng xī， shì xiǎng shì yí。 jiàng fú jì duō， zhōu gōng huáng zǔ， yì qí fú nǚ。\nqiū ér zǎi cháng， xià ér bī héng， bái mǔ xīng gāng。 xī zūn jiāng jiāng， máo páo zì gēng。 biān dòu dà fáng， wàn wǔ yáng yáng。\nxiào sūn yǒu qìng。 bǐ ěr chì ér chāng， bǐ ěr shòu ér zāng。 bǎo bǐ dōng fāng， lǔ bāng shì cháng。 bù kuī bù bēng， bù zhèn bù téng。\nsān shòu zuò péng， rú gāng rú líng。 gōng chē qiān chéng， zhū yīng lǜ téng。 èr máo zhòng gōng。 gōng tú sān wàn， bèi zhòu zhū qīn。\nzhēng tú zēng zēng， róng dí shì yīng， jīng shū shì chéng， zé mò wǒ gǎn chéng！ bǐ ěr chāng ér chì， bǐ ěr shòu ér fù。\nhuáng fā tái bèi， shòu xū yǔ shì。 bǐ ěr chāng ér dà， bǐ ěr qí ér ài。 wàn yǒu qiān suì， méi shòu wú yǒu hài。\ntài shān yán yán， lǔ bāng suǒ zhān。 yǎn yǒu guī méng， suì huāng dà dōng。 zhì yú hǎi bāng， huái yí lái tóng。\nmò bù lǜ cóng， lǔ hóu zhī gōng。 bǎo yǒu fú yì， suì huāng xú zhái。 zhì yú hǎi bāng， huái yí mán mò。\njí bǐ nán yí， mò bù lǜ cóng。 mò gǎn bù nuò， lǔ hóu shì ruò。 tiān xī gōng chún gǔ， méi shòu bǎo lǔ。\njū cháng yǔ xǔ， fù zhōu gōng zhī yǔ。 lǔ hóu yàn xǐ， lìng qī shòu mǔ。 yí dài fu shù shì， bāng guó shì yǒu。\njì duō shòu zhǐ， huáng fā ér chǐ。 cú lái zhī sōng， xīn fǔ zhī bǎi。 shì duàn shì dù， shì xún shì chǐ。\nsōng jué yǒu xì， lù qǐn kǒng shuò， xīn miào yì yì。 xī sī suǒ zuò， kǒng màn qiě shuò， wàn mín shì ruò。",
        translation: "清静幽深的宫室里，住着品德端正的姜嫄，她虔诚依靠上天，平平安安生下了后稷。后稷教百姓种五谷，子孙一代代传下基业，传到文王武王，在牧野打败了商朝。周公分封鲁国，鲁侯建起宏伟的宗庙，四季祭祀从不懈怠，国家强盛，人寿年丰，万民都称颂他。",
      }
      ],
    },
    {
      title: "那 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《那》意境插画：猗与那与！置我鞉鼓。奏鼓简简，衎我烈祖。汤孙奏假，绥我思成。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "猗与那与！置我鞉鼓。奏鼓简简，衎我烈祖。汤孙奏假，绥我思成。\n鞉鼓渊渊，嘒嘒管声。既和且平，依我磬声。于赫汤孙！穆穆厥声。\n庸鼓有斁，万舞有奕。我有嘉客，亦不夷怿。自古在昔，先民有作。\n温恭朝夕，执事有恪，顾予烝尝，汤孙之将。",
        pinyin: "yī yǔ nà yǔ！ zhì wǒ táo gǔ。 zòu gǔ jiǎn jiǎn， kàn wǒ liè zǔ。 tāng sūn zòu jiǎ， suí wǒ sī chéng。\ntáo gǔ yuān yuān， huì huì guǎn shēng。 jì hé qiě píng， yī wǒ qìng shēng。 yú hè tāng sūn！ mù mù jué shēng。\nyōng gǔ yǒu yì， wàn wǔ yǒu yì。 wǒ yǒu jiā kè， yì bù yí yì。 zì gǔ zài xī， xiān mín yǒu zuò。\nwēn gōng zhāo xī， zhí shì yǒu kè， gù yǔ zhēng cháng， tāng sūn zhī jiāng。",
        translation: "多盛大呀多美呀，摆好了我们的鞉鼓。咚咚的鼓声敲起来，鼓声、管乐和磬声配合得又和谐又平缓，让英明的祖先欢欣快乐。商汤的子孙恭恭敬敬地祭祀，还献上盛大的万舞，请祖先来享用这祭礼吧。",
      }
      ],
    },
    {
      title: "烈祖 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《烈祖》意境插画：嗟嗟烈祖！有秩斯祜。申锡无疆，及尔斯所。既载清酤，赉我思成。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "嗟嗟烈祖！有秩斯祜。申锡无疆，及尔斯所。既载清酤，赉我思成。\n亦有和羹，既戒既平。鬷假无言，时靡有争。绥我眉寿，黄耇无疆。\n约軧错衡，八鸾鸧鸧。以假以享，我受命溥将。自天降康，丰年穰穰。\n来假来飨，降福无疆。顾予烝尝，汤孙之将。",
        pinyin: "jiē jiē liè zǔ！ yǒu zhì sī hù。 shēn xī wú jiāng， jí ěr sī suǒ。 jì zǎi qīng gū， lài wǒ sī chéng。\nyì yǒu hé gēng， jì jiè jì píng。 zōng jiǎ wú yán， shí mí yǒu zhēng。 suí wǒ méi shòu， huáng gǒu wú jiāng。\nyuē dǐ cuò héng， bā luán cāng cāng。 yǐ jiǎ yǐ xiǎng， wǒ shòu mìng pǔ jiāng。 zì tiān jiàng kāng， fēng nián ráng ráng。\nlái jiǎ lái xiǎng， jiàng fú wú jiāng。 gù yǔ zhēng cháng， tāng sūn zhī jiāng。",
        translation: "了不起的祖先啊，赐给我们大大的福气。人们备好清清的酒、调好味道的羹汤，恭恭敬敬地祭祀，没有一点争吵，只求祖先赐我们长命百岁，让老人平平安安。驾着挂满铃铛的漂亮马车来祭献，感谢上天降下安康，让庄稼年年丰收。祖先请来享用祭品，降下数不清的福气，看顾我们这些子孙的祭祀吧。",
      }
      ],
    },
    {
      title: "玄鸟 · 佚名",
      art: "spring-bird",
      artPrompt: "古诗《玄鸟》意境插画：天命玄鸟，降而生商，宅殷土芒芒。古帝命武汤，正域彼四方。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "天命玄鸟，降而生商，宅殷土芒芒。古帝命武汤，正域彼四方。\n方命厥后，奄有九有。商之先后，受命不殆，在武丁孙子。武丁孙子，武王靡不胜。\n龙旗十乘，大糦是承。邦畿千里，维民所止，肇域彼四海。\n四海来假，来假祁祁。景员维河。殷受命咸宜，百禄是何。",
        pinyin: "tiān mìng xuán niǎo， jiàng ér shēng shāng， zhái yīn tǔ máng máng。 gǔ dì mìng wǔ tāng， zhèng yù bǐ sì fāng。\nfāng mìng jué hòu， yǎn yǒu jiǔ yǒu。 shāng zhī xiān hòu， shòu mìng bù dài， zài wǔ dīng sūn zi。 wǔ dīng sūn zi， wǔ wáng mí bù shèng。\nlóng qí shí chéng， dà xī shì chéng。 bāng jī qiān lǐ， wéi mín suǒ zhǐ， zhào yù bǐ sì hǎi。\nsì hǎi lái jiǎ， lái jiǎ qí qí。 jǐng yuán wéi hé。 yīn shòu mìng xián yí， bǎi lù shì hé。",
        translation: "天帝派一只黑色的燕子飞到人间，生下了商族的祖先，他们在广大的土地上安了家。后来天帝又选中成汤，让他治理四方、拥有九州。商王受命从不敢懈怠，一直传到能干的武丁。十辆插着龙旗的大车装满祭品，千里都城住着百姓，疆土一直伸到四海。四面八方的人都来朝见，殷商顺应天命，享着数不清的福气。",
      }
      ],
    },
    {
      title: "长发 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《长发》意境插画：浚哲维商，长发其祥。洪水芒芒，禹敷下土方。外大国是疆，幅陨既长。有娀方将，帝立子生商。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "浚哲维商，长发其祥。洪水芒芒，禹敷下土方。外大国是疆，幅陨既长。有娀方将，帝立子生商。\n玄王桓拨，受小国是达，受大国是达。率履不越，遂视既发。相士烈烈。海外有截。\n帝命不违，至于汤齐。汤降不迟，圣敬日跻。昭假迟迟，上帝是祗，帝命式于九围。\n受小球大球，为下国缀旒，何天之休。不竞不絿，不刚不柔。敷政优优。百禄是遒。\n受小共大共，为下国骏厖。何天之龙，敷奏其勇。不震不动，不戁不竦，百禄是总。\n武王载旆，有虔秉钺。如火烈烈，则莫我敢曷。苞有三蘖，莫遂莫达。九有有截，韦顾既伐，昆吾夏桀。\n昔在中叶，有震且业。允也天子，降予卿士。实维阿衡，实左右商王。",
        pinyin: "jùn zhé wéi shāng， cháng fà qí xiáng。 hóng shuǐ máng máng， yǔ fū xià tǔ fāng。 wài dà guó shì jiāng， fú yǔn jì cháng。 yǒu sōng fāng jiāng， dì lì zǐ shēng shāng。\nxuán wáng huán bō， shòu xiǎo guó shì dá， shòu dà guó shì dá。 lǜ lǚ bù yuè， suì shì jì fā。 xiàng shì liè liè。 hǎi wài yǒu jié。\ndì mìng bù wéi， zhì yú tāng qí。 tāng jiàng bù chí， shèng jìng rì jī。 zhāo jiǎ chí chí， shàng dì shì zhī， dì mìng shì yú jiǔ wéi。\nshòu xiǎo qiú dà qiú， wèi xià guó zhuì liú， hé tiān zhī xiū。 bù jìng bù qiú， bù gāng bù róu。 fū zhèng yōu yōu。 bǎi lù shì qiú。\nshòu xiǎo gòng dà gòng， wèi xià guó jùn máng。 hé tiān zhī lóng， fū zòu qí yǒng。 bù zhèn bù dòng， bù nǎn bù sǒng， bǎi lù shì zǒng。\nwǔ wáng zǎi pèi， yǒu qián bǐng yuè。 rú huǒ liè liè， zé mò wǒ gǎn hé。 bāo yǒu sān niè， mò suì mò dá。 jiǔ yǒu yǒu jié， wéi gù jì fá， kūn wú xià jié。\nxī zài zhōng yè， yǒu zhèn qiě yè。 yǔn yě tiān zǐ， jiàng yǔ qīng shì。 shí wéi ā héng， shí zuǒ yòu shāng wáng。",
        translation: "商族的祖先又聪明又有智慧，福运绵长。洪水茫茫的时候，大禹治水，分好了大地。天帝看中有娀氏的女儿，让她生下了商的始祖契。契很能干，小国大国交给他都治理得好，做事守规矩。后代相士也很威风，连海外都归服了。天帝又看中成汤，他圣明又恭敬，天天进步，被派去做九州的表率。汤不争不抢、不刚不软，把政事办得妥妥当当，福气都聚了过来。他举着大旗、拿着大斧出征，像烈火一样没人敢挡，先后讨平了韦、顾、昆吾和夏桀。还有贤臣伊尹，一直在左右辅佐商王。",
      }
      ],
    },
    {
      title: "殷武 · 佚名",
      art: "poetry-moon",
      artPrompt: "古诗《殷武》意境插画：挞彼殷武，奋伐荆楚。深入其阻，裒荆之旅。有截其所，汤孙之绪。——中国传统水彩绘本风，画面明快温暖，适合儿童",
      blocks: [
      {
        kind: 'poem',
        text: "挞彼殷武，奋伐荆楚。深入其阻，裒荆之旅。有截其所，汤孙之绪。\n维女荆楚，居国南乡。昔有成汤，自彼氐羌，莫敢不来享，莫敢不来王。曰商是常。\n天命多辟，设都于禹之绩。岁事来辟，勿予祸适，稼穑匪解。\n天命降监，下民有严。不僭不滥，不敢怠遑。命于下国，封建厥福。\n商邑翼翼，四方之极。赫赫厥声，濯濯厥灵。寿考且宁，以保我后生。\n陟彼景山，松伯丸丸。是断是迁，方斫是虔。松桷有梴，旅楹有闲，寝成孔安。",
        pinyin: "tà bǐ yīn wǔ， fèn fá jīng chǔ。 shēn rù qí zǔ， póu jīng zhī lǚ。 yǒu jié qí suǒ， tāng sūn zhī xù。\nwéi nǚ jīng chǔ， jū guó nán xiāng。 xī yǒu chéng tāng， zì bǐ dī qiāng， mò gǎn bù lái xiǎng， mò gǎn bù lái wáng。 yuē shāng shì cháng。\ntiān mìng duō pì， shè dōu yú yǔ zhī jì。 suì shì lái pì， wù yǔ huò shì， jià sè fěi jiě。\ntiān mìng jiàng jiān， xià mín yǒu yán。 bù jiàn bù làn， bù gǎn dài huáng。 mìng yú xià guó， fēng jiàn jué fú。\nshāng yì yì yì， sì fāng zhī jí。 hè hè jué shēng， zhuó zhuó jué líng。 shòu kǎo qiě níng， yǐ bǎo wǒ hòu shēng。\nzhì bǐ jǐng shān， sōng bó wán wán。 shì duàn shì qiān， fāng zhuó shì qián。 sōng jué yǒu chān， lǚ yíng yǒu xián， qǐn chéng kǒng ān。",
        translation: "殷商的军队威武勇猛，奋勇讨伐荆楚，一直打到险要的地方，平定了那里，这是成汤子孙的功业。荆楚住在国家的南方，从前成汤在位时，连远方的氐族羌族都不敢不来进贡、不来朝见。天帝命令各国诸侯在大禹走过的土地上建都，年年按时来朝见，好好种田不敢偷懒。上天看着下面，人们不敢胡作非为、不敢怠慢。商的都城整整齐齐，是四方的榜样，名声响亮、威望远播，保佑着子孙后代。人们登上景山，砍下又高又直的松柏，做成粗粗的柱子和长长的椽子，盖起了安稳的大庙。",
      }
      ],
    }
  ],
  rights: {
    workTitle: "诗经",
    author: "佚名（先秦）",
    authorDeathYear: undefined,
    translator: '桃阅读',
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: "https://github.com/chinese-poetry/chinese-poetry",
    note: "先秦歌谣，远超保护期。注音与白话译文为平台自撰。",
  },
}
