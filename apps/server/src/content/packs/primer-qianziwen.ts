import type { PackBook } from '../types'

/**
 * 《千字文》——由 scripts/gen-corpus.mjs 从公版语料生成（2026-09-20 全面补全）。
 * 底本：千字文（周兴嗣）。逐字来自语料数据集，译文为平台自撰白话。
 * 通行本全篇；注音与白话译文为平台自撰。
 */
export const qianZiWen: PackBook = {
  id: "qianziwen-tiandi",
  title: "千字文",
  author: "周兴嗣（南朝梁）",
  lang: "zh",
  category: "primer",
  ageStage: "3-5",
  intro: "一千个不重复的字，写成二百五十句四字韵语，从天地玄黄讲到治家治国。",
  coverArt: "qianziwen-heaven-earth",
  coverArtPrompt: "一卷缓缓展开的古籍长卷，上面写着「天地玄黄」四个大字，背景是深蓝色的星空与大地，金色阳光从卷轴上方洒下",
  coverFrom: "#FFE0B2",
  coverTo: "#FFB74D",
  source: "公版古籍（南朝梁·周兴嗣）节选，逐字注音",
  chapters: [
    {
      title: "第一课 · 天地玄黄 · 佚名",
      art: "primer-scroll",
      artPrompt: "《三字经》第1课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "天地玄黄，宇宙洪荒，日月盈昃，辰宿列张。\n寒来暑往，秋收冬藏，闰余成岁，律吕调阳。\n云腾致雨，露结为霜，金生丽水，玉出崐冈。\n剑号巨阙，珠称夜光，果珍李柰，菜重芥姜。",
        pinyin: "tiān dì xuán huáng， yǔ zhòu hóng huāng， rì yuè yíng zè， chén sù liè zhāng。\nhán lái shǔ wǎng， qiū shōu dōng cáng， rùn yú chéng suì， lǜ lǚ tiáo yáng。\nyún téng zhì yǔ， lù jié wèi shuāng， jīn shēng lí shuǐ， yù chū kūn gāng。\njiàn hào jù quē， zhū chēng yè guāng， guǒ zhēn lǐ nài， cài zhòng jiè jiāng。",
        translation: "天空是深青色的，大地是黄色的；茫茫宇宙无边无际。太阳升了又落，月亮圆了又缺；繁星布满夜空，排列得整整齐齐。寒冬来了，酷暑过去；秋天收割庄稼，冬天把粮食储藏起来。历法中设置闰月，把多出的日子凑成一年；用乐律调和阴阳，四季才有规律。云气上升凝聚就变成雨，露水遇冷就结成霜；黄金产在丽水，美玉出在昆仑山。最有名的宝剑叫“巨阙”，最贵重的珍珠叫“夜光”；果子中最珍贵的是李子和柰子，蔬菜里最受看重的是芥菜和生姜。",
      }
      ],
    },
    {
      title: "第二课 · 海咸河淡 · 佚名",
      art: "primer-scroll",
      artPrompt: "《三字经》第2课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "海咸河淡，鳞潜羽翔，龙师火帝，鸟官人皇。\n始制文字，乃服衣裳，推位让国，有虞陶唐。\n吊民伐罪，周发殷汤，坐朝问道，垂拱平章。\n爱育黎首，臣伏戎羌，遐迩壹体，率宾归王。",
        pinyin: "hǎi xián hé dàn， lín qián yǔ xiáng， lóng shī huǒ dì， niǎo guān rén huáng。\nshǐ zhì wén zì， nǎi fú yī shang， tuī wèi ràng guó， yǒu yú táo táng。\ndiào mín fá zuì， zhōu fā yīn tāng， zuò cháo wèn dào， chuí gǒng píng zhāng。\nài yù lí shǒu， chén fú róng qiāng， xiá ěr yī tǐ， lǜ bīn guī wáng。",
        translation: "海水是咸的，河水是淡的；鱼儿在水里游动，鸟儿在天上飞翔。龙师、火帝、鸟官、人皇，这些都是远古传说里的帝王和官号。仓颉创造了文字，人们才穿上了衣裳。把王位让给贤人而不传给自己儿子的，是尧和舜。安抚受害的百姓、讨伐有罪的暴君，是周武王和商汤。贤明的君主坐在朝堂上向大臣询问治国的道理，垂衣拱手就能把天下治理得井井有条。他们爱护天下百姓，使四方部族都来归服；远近连成一体，普天之下的百姓都归顺了贤德的君王。",
      }
      ],
    },
    {
      title: "第三课 · 鸣凤在树 · 佚名",
      art: "primer-scroll",
      artPrompt: "《三字经》第3课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "鸣凤在树，白驹食场，化被草木，赖及万方。\n盖此身发，四大五常，恭惟鞠养，岂敢毁伤。\n女慕贞絜，男效才良，知过必改，得能莫忘。\n罔谈彼短，靡恃己长，信使可覆，器欲难量。",
        pinyin: "míng fèng zài shù， bái jū shí chǎng， huà bèi cǎo mù， lài jí wàn fāng。\ngài cǐ shēn fā， sì dà wǔ cháng， gōng wéi jū yǎng， qǐ gǎn huǐ shāng。\nnǚ mù zhēn jié， nán xiào cái liáng， zhī guò bì gǎi， dé néng mò wàng。\nwǎng tán bǐ duǎn， mí shì jǐ cháng， xìn shǐ kě fù， qì yù nán liáng。",
        translation: "凤凰在树上欢快地鸣叫，小白马在草场上自在地吃草。圣明的教化像雨露润泽草木，恩德遍及天下四方。人的身体发肤都是天地和父母给的，恭敬地想着他们的养育之恩，怎么敢随便伤害自己呢。女孩子要仰慕贞洁干净的好品行，男孩子要学习有才有德的好榜样；知道自己错了就一定要改正，学会了好本领不要忘记。不要去说别人的短处，也不要仗着自己的长处骄傲；说话要诚实、经得起检验，做人的气量要大得难以测量。",
      }
      ],
    },
    {
      title: "第四课 · 墨悲丝染 · 佚名",
      art: "primer-scroll",
      artPrompt: "《三字经》第4课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "墨悲丝染，诗赞羔羊，景行维贤，克念作圣。\n德建名立，形端表正，空谷传声，虚堂习听。\n祸因恶积，福缘善庆，尺璧非宝，寸阴是竞。\n资父事君，曰严与敬，孝当竭力，忠则尽命。",
        pinyin: "mò bēi sī rǎn， shī zàn gāo yáng， jǐng xíng wéi xián， kè niàn zuò shèng。\ndé jiàn míng lì， xíng duān biǎo zhèng， kōng gǔ chuán shēng， xū táng xí tīng。\nhuò yīn è jī， fú yuán shàn qìng， chǐ bì fēi bǎo， cùn yīn shì jìng。\nzī fù shì jūn， yuē yán yǔ jìng， xiào dāng jié lì， zhōng zé jìn mìng。",
        translation: "墨子看见雪白的丝被染黑，心里很难过；《诗经》赞美小羊羔，因为它又干净又温顺。人要沿着贤人走过的正路走，把好念头坚持到底，就能成为品德高尚的人。品德建好了，好名声自然立起来；自己站得端，影子才正。空旷的山谷里喊一声，回声传得远远的；空荡的大厅里说话，听得格外清楚。灾祸是坏事一点一点积起来的，福气是多做善事换来的；一尺长的玉璧不算最宝贝，一寸短短的光阴才最值得珍惜。奉养父母、为国家做事，都要认真又恭敬；孝敬父母要拿出全部力量，为国家尽力要不惜一切。",
      }
      ],
    },
    {
      title: "第五课 · 临深履薄 · 佚名",
      art: "primer-scroll",
      artPrompt: "《三字经》第5课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "临深履薄，夙兴温凊，似兰斯馨，如松之盛。\n川流不息，渊澄取映，容止若思，言辞安定。\n笃初诚美，慎终宜令，荣业所基，籍甚无竟。\n学优登仕，摄职从政，存以甘棠，去而益咏。",
        pinyin: "lín shēn lǚ bó， sù xīng wēn qìng， sì lán sī xīn， rú sōng zhī shèng。\nchuān liú bù xī， yuān chéng qǔ yìng， róng zhǐ ruò sī， yán cí ān dìng。\ndǔ chū chéng měi， shèn zhōng yí lìng， róng yè suǒ jī， jí shèn wú jìng。\nxué yōu dēng shì， shè zhí cóng zhèng， cún yǐ gān táng， qù ér yì yǒng。",
        translation: "做事要像站在深水边、踩着薄冰上一样小心；一大早就起来，冬天让父母睡得暖，夏天让父母睡得凉快。品德要像兰花一样香，像松树一样常年青翠。像河水一样日夜不停地奔流，像清清的潭水一样照得见人影；一举一动都端庄沉静，说话从容又安定。开头认真固然很好，到结尾也谨慎才更完美；这是荣耀事业的根基，好名声会传得很远很久。学问学好了去做官，认认真真办好事；就像百姓舍不得甘棠树一样，好官离开了，人们还一直想念他、歌颂他。",
      }
      ],
    },
    {
      title: "第六课 · 乐殊贵贱 · 佚名",
      art: "primer-scroll",
      artPrompt: "《三字经》第6课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "乐殊贵贱，礼别尊卑，上和下睦，夫唱妇随。\n外受傅训，入奉母仪，诸姑伯叔，犹子比儿。\n孔怀兄弟，同气连枝，交友投分，切磨箴规。\n仁慈隐恻，造次弗离，节义廉退，颠沛匪亏。",
        pinyin: "lè shū guì jiàn， lǐ bié zūn bēi， shàng hé xià mù， fū chàng fù suí。\nwài shòu fù xùn， rù fèng mǔ yí， zhū gū bó shū， yóu zǐ bǐ ér。\nkǒng huái xiōng dì， tóng qì lián zhī， jiāo yǒu tóu fēn， qiè mó zhēn guī。\nrén cí yǐn cè， zào cì fú lí， jié yì lián tuì， diān pèi fěi kuī。",
        translation: "音乐的使用各有不同，礼仪分清尊长的次序；长辈晚辈和和睦睦，家里的事大家商量着来。在外面听老师的教导，在家里听母亲的教诲；对待姑姑、叔伯这些长辈要恭敬，对待侄儿外甥要像自己的孩子一样疼爱。兄弟之间感情要最深，他们就像同一棵树上的枝条；交朋友要心意相投，互相切磋学习、诚恳地提意见。仁爱怜悯的心，再忙再急也不能丢掉；气节、道义、廉洁、谦让这些好品质，就算吃苦受难也不会减少。",
      }
      ],
    },
    {
      title: "第七课 · 性静情逸 · 佚名",
      art: "primer-scroll",
      artPrompt: "《三字经》第7课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "性静情逸，心动神疲，守真志满，逐物意移。\n坚持雅操，好爵自縻，都邑华夏，东西二京。\n背邙面洛，浮渭据泾，宫殿盘郁，楼观飞惊。\n图写禽兽，画彩仙灵，丙舍旁启，甲帐对楹。",
        pinyin: "xìng jìng qíng yì， xīn dòng shén pí， shǒu zhēn zhì mǎn， zhú wù yì yí。\njiān chí yǎ cāo， hǎo jué zì mí， dōu yì huá xià， dōng xī èr jīng。\nbèi máng miàn luò， fú wèi jù jīng， gōng diàn pán yù， lóu guān fēi jīng。\ntú xiě qín shòu， huà cǎi xiān líng， bǐng shè páng qǐ， jiǎ zhàng duì yíng。",
        translation: "内心安静了，心情就轻松自在；心里乱糟糟，人就会疲惫不堪。守住纯真的本心，志向就充实；光想着追外面的东西，心思就跑偏了。坚持高雅的操守，好的位置自然会来到你身边。华夏的都城，有东、西两座京城。西京背靠北邙山、面对洛水，城边有渭水、泾河流过。宫殿弯弯曲曲连成一片，高高的楼阁像要飞起来，让人看了心惊。殿墙上画着飞禽走兽，还有彩色的神仙画像；偏殿在旁边开门，华丽的帐幕对着高大的柱子。",
      }
      ],
    },
    {
      title: "第八课 · 肆筵设席 · 佚名",
      art: "primer-scroll",
      artPrompt: "《三字经》第8课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "肆筵设席，鼓瑟吹笙，升阶纳陛，弁转疑星。\n右通广内，左达承明，既集坟典，亦聚群英。\n杜稿钟隶，漆书壁经，府罗将相，路侠槐卿。\n户封八县，家给千兵，高冠陪辇，驱毂振缨。",
        pinyin: "sì yán shè xí， gǔ sè chuī shēng， shēng jiē nà bì， biàn zhuǎn yí xīng。\nyòu tōng guǎng nèi， zuǒ dá chéng míng， jì jí fén diǎn， yì jù qún yīng。\ndù gǎo zhōng lì， qī shū bì jīng， fǔ luó jiàng xiàng， lù xiá huái qīng。\nhù fēng bā xiàn， jiā gěi qiān bīng， gāo guān péi niǎn， qū gū zhèn yīng。",
        translation: "摆开筵席，弹起瑟、吹起笙；官员们沿着台阶走进大殿，帽子上的装饰一闪一闪，像满天的星星。右边通向藏书的广内殿，左边通向大臣们办公的承明殿。这里既收藏着古老的典籍，也聚集着许多杰出的人才。有杜度的草书、钟繇的隶书，还有写在漆板上的古书、藏在墙壁里的经书。官府里排满了文臣武将，大路两旁站着戴高帽的大官。有的封地有八个县，有的家里配有上千的兵士。他们戴着高高的帽子跟在皇帝的车驾旁边，车马跑起来，帽带随风飘扬。",
      }
      ],
    },
    {
      title: "第九课 · 世禄侈富 · 佚名",
      art: "primer-scroll",
      artPrompt: "《三字经》第9课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "世禄侈富，车驾肥轻，策功茂实，勒碑刻铭。\n磻溪伊尹，佐时阿衡，奄宅曲阜，微旦孰营。\n桓公匡合，济弱扶倾，绮回汉惠，说感武丁。\n俊乂密勿，多士寔宁，晋楚更霸，赵魏困横。",
        pinyin: "shì lù chǐ fù， chē jià féi qīng， cè gōng mào shí， lè bēi kè míng。\npán xī yī yǐn， zuǒ shí ā héng， yǎn zhái qū fù， wēi dàn shú yíng。\nhuán gōng kuāng hé， jì ruò fú qīng， qǐ huí hàn huì， shuō gǎn wǔ dīng。\njùn yì mì wù， duō shì shí níng， jìn chǔ gèng bà， zhào wèi kùn héng。",
        translation: "这些功臣家世代享受俸禄，生活又奢侈又富足，坐着轻快的马车；他们的功劳又大又实在，被刻在石碑上，永远留给后人。姜太公在磻溪边钓鱼，后来成了开国的大功臣；伊尹辅佐商汤，人们尊称他为阿衡。周公旦受封住在曲阜，要不是他，谁来把国家治理好呢。齐桓公会合诸侯、匡扶天下，帮助弱小的国家；四位老先生出山救了汉惠帝，傅说凭着一番话感动了君王武丁。能干的人们勤勤恳恳做事，国家因此安宁；晋国、楚国先后称霸，赵国、魏国被围困的策略困住了。",
      }
      ],
    },
    {
      title: "第十课 · 假途灭虢 · 佚名",
      art: "primer-scroll",
      artPrompt: "《三字经》第10课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "假途灭虢，践土会盟，何遵约法，韩弊烦刑。\n起翦颇牧，用军最精，宣威沙漠，驰誉丹青。\n九州禹迹，百郡秦并，岳宗恒岱，禅主云亭。\n雁门紫塞，鸡田赤城，昆池碣石，巨野洞庭。",
        pinyin: "jiǎ tú miè guó， jiàn tǔ huì méng， hé zūn yuē fǎ， hán bì fán xíng。\nqǐ jiǎn pō mù， yòng jūn zuì jīng， xuān wēi shā mò， chí yù dān qīng。\njiǔ zhōu yǔ jì， bǎi jùn qín bìng， yuè zōng héng dài， chán zhǔ yún tíng。\nyàn mén zǐ sāi， jī tián chì chéng， kūn chí jié shí， jù yě dòng tíng。",
        translation: "晋国向虞国借路去灭了虢国；晋文公在践土大会诸侯、订立盟约。萧何遵照简约的法令把国家治理好，韩国却因为刑法太苛刻吃了亏。白起、王翦、廉颇、李牧四位将军，用兵的本领最高明；他们的威名传遍沙漠，好名声留在了画册史书里。九州大地都是大禹走过的足迹，天下百郡被秦始皇统一。五岳当中最尊崇的是恒山和泰山，帝王祭天的大典在云云山、亭亭山举行。北边有雁门关、万里长城，还有鸡田驿、赤城山，昆明的滇池、碣石山，巨野的大泽和浩浩荡荡的洞庭湖。",
      }
      ],
    },
    {
      title: "第十一课 · 旷远绵邈 · 佚名",
      art: "primer-scroll",
      artPrompt: "《三字经》第11课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "旷远绵邈，岩岫杳冥，治本于农，务兹稼穑。\n俶载南亩，我艺黍稷，税熟贡新，劝赏黜陟。\n孟轲敦素，史鱼秉直，庶几中庸，劳谦谨敕。\n聆音察理，鉴貌辨色，贻厥嘉猷，勉其祗植。",
        pinyin: "kuàng yuǎn mián miǎo， yán xiù yǎo míng， zhì běn yú nóng， wù zī jià sè。\nchù zǎi nán mǔ， wǒ yì shǔ jì， shuì shú gòng xīn， quàn shǎng chù zhì。\nmèng kē dūn sù， shǐ yú bǐng zhí， shù jī zhōng yōng， láo qiān jǐn chì。\nlíng yīn chá lǐ， jiàn mào biàn sè， yí jué jiā yóu， miǎn qí zhī zhí。",
        translation: "国土辽阔又遥远，高山幽谷又深又暗；治国的根本在农业，要一心一意种好庄稼。春天到南边的田里开始耕作，种上黍子和稷这些粮食；庄稼熟了交公粮、献新米，官府据此奖励勤劳的、提拔能干的。孟子崇尚朴实节俭，史鱼一辈子坚持正直；做人要尽量不偏不倚，勤劳谦虚、小心谨慎。听人说话要听明白其中的道理，看人的脸色要猜得出他的心情；把好的谋略和道理留给子孙，勉励他们老老实实做人、端端正正做事。",
      }
      ],
    },
    {
      title: "第十二课 · 省躬讥诫 · 佚名",
      art: "primer-scroll",
      artPrompt: "《三字经》第12课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "省躬讥诫，宠增抗极，殆辱近耻，林臯幸即。\n两疏见机，解徂谁逼，索居闲处，沉默寂寥。\n求古寻论，散虑逍遥，欣奏累遣，戚谢欢招。\n渠荷的历，园莽抽条，枇杷晚翠，梧桐早雕。",
        pinyin: "shěng gōng jī jiè， chǒng zēng kàng jí， dài rǔ jìn chǐ， lín gāo xìng jí。\nliǎng shū jiàn jī， jiě cú shuí bī， suǒ jū xián chù， chén mò jì liáo。\nqiú gǔ xún lùn， sàn lǜ xiāo yáo， xīn zòu lèi qiǎn， qī xiè huān zhāo。\nqú hé de lì， yuán mǎng chōu tiáo， pí pá wǎn cuì， wú tóng zǎo diāo。",
        translation: "听到别人的讥笑和劝诫，要回头检查自己；宠爱和荣耀到了顶点，危险和耻辱也就近了，不如早早退到山林湖边，那倒是件幸运的事。汉朝的疏广、疏受叔侄看准了时机，主动辞官回家，没有谁逼迫他们。一个人安安静静地住着，虽然冷清，却正好去古书里寻找古人谈论的道理，把烦恼散开，自在逍遥。欢喜的事一件件来了，烦恼就一件件抛开；忧愁走开了，快乐就被请来了。池子里的荷花开得亮晶晶，园子里的草木抽出新的枝条；枇杷到深秋还是翠绿的，梧桐一入秋就早早落了叶。",
      }
      ],
    },
    {
      title: "第十三课 · 陈根委翳 · 佚名",
      art: "primer-scroll",
      artPrompt: "《三字经》第13课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "陈根委翳，落叶飘摇，游鹍独运，凌摩绛霄。\n耽读玩市，寓目囊箱，易𬨎攸，畏属耳垣，墙\n具膳餐饭，适口充肠，饱饫烹宰，饥厌糟糠。\n亲戚故旧，老少异粮，妾御绩纺，侍巾帷房。",
        pinyin: "chén gēn wěi yì， luò yè piāo yáo， yóu kūn dú yùn， líng mó jiàng xiāo。\ndān dú wán shì， yù mù náng xiāng， yì yóu yōu， wèi shǔ ěr yuán， qiáng\njù shàn cān fàn， shì kǒu chōng cháng， bǎo yù pēng zǎi， jī yàn zāo kāng。\nqīn qi gù jiù， lǎo shào yì liáng， qiè yù jì fǎng， shì jīn wéi fáng。",
        translation: "老树根慢慢枯萎，落叶随风飘呀飘；大鹏鸟独自向远方高飞，一直冲上红红的云霄。在热闹的街市上也能专心读书，眼睛只盯着书箱和书本；再小的话也要谨慎，说话怕被隔壁墙根的耳朵听见。平常的一日三餐，合口味、吃得饱就好；吃饱的时候，大鱼大肉也觉得腻，饿的时候，粗茶淡饭也觉得香。亲戚和老朋友来了，老人小孩要准备不一样的饭菜；家中妇人纺纱织布，在屋里捧巾伺候、料理家务。",
      }
      ],
    },
    {
      title: "第十四课 · 纨扇圆洁 · 佚名",
      art: "primer-scroll",
      artPrompt: "《三字经》第14课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "纨扇圆洁，银烛炜煌，昼眠夕寐，蓝笋象床。\n弦歌酒宴，接杯举觞，矫手顿足，悦豫且康。\n嫡后嗣续，祭祀烝尝，稽颡再拜，悚惧恐惶。\n笺牒简要，顾答审详，骸垢想浴，执热愿凉。",
        pinyin: "wán shàn yuán jié， yín zhú wěi huáng， zhòu mián xī mèi， lán sǔn xiàng chuáng。\nxián gē jiǔ yàn， jiē bēi jǔ shāng， jiǎo shǒu dùn zú， yuè yù qiě kāng。\ndí hòu sì xù， jì sì zhēng cháng， jī sǎng zài bài， sǒng jù kǒng huáng。\njiān dié jiǎn yào， gù dá shěn xiáng， hái gòu xiǎng yù， zhí rè yuàn liáng。",
        translation: "圆圆的绢扇又白又干净，银白的蜡烛亮堂堂；白天歇晌，夜里安睡，铺的是青竹凉席，躺的是象牙大床。宴会上弹琴唱歌，你敬我一杯、我举一盏，高兴得又拍手又跺脚，又欢喜又安康。正妻生的长子接续家业，一年四季按时祭祀祖先；叩头下拜的时候，心里恭恭敬敬、又认真又敬畏。写公文信件要简明扼要，回答别人的问题要细致周详。身上脏了就想洗澡，捧着热东西就盼着凉快。",
      }
      ],
    },
    {
      title: "第十五课 · 驴骡犊特 · 佚名",
      art: "primer-scroll",
      artPrompt: "《三字经》第15课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "驴骡犊特，骇跃超骧，诛斩贼盗，捕获叛亡。\n布射僚丸，嵇琴阮啸，恬笔伦纸，钧巧任钓。\n释纷利俗，竝皆佳妙，毛施淑姿，工颦妍笑。\n年矢每催，曦晖朗曜，璇玑悬斡，晦魄环照。",
        pinyin: "lǘ luó dú tè， hài yuè chāo xiāng， zhū zhǎn zéi dào， bǔ huò pàn wáng。\nbù shè liáo wán， jī qín ruǎn xiào， tián bǐ lún zhǐ， jūn qiǎo rèn diào。\nshì fēn lì sú， bìng jiē jiā miào， máo shī shū zī， gōng pín yán xiào。\nnián shǐ měi cuī， xī huī lǎng yào， xuán jī xuán wò， huì pò huán zhào。",
        translation: "小驴、骡子、牛犊受了惊，会又蹦又跳、撒腿飞奔；官府惩处杀掉做强盗的坏人，捉住抓获叛乱逃跑的人。吕布的箭射得好，宜僚的弹丸玩得妙；嵇康会弹琴，阮籍会长啸。蒙恬造了毛笔，蔡伦造了纸；马钧手最巧，任公子善钓鱼。他们帮人们解开难题、让生活更方便，个个都做得又好又妙。毛嫱和西施长得美，皱皱眉也好看，笑一笑更动人。光阴像箭一样一年年催着人，太阳的光辉明明亮亮；北斗星在天上转呀转，月亮缺了又圆、圆了又缺。",
      }
      ],
    },
    {
      title: "第十六课 · 指薪修祜 · 佚名",
      art: "primer-scroll",
      artPrompt: "《三字经》第16课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "指薪修祜，永绥吉劭，矩步引领，俯仰廊庙。\n束带矜庄，徘徊瞻眺，孤陋寡闻，愚蒙等诮。\n谓语助者，焉哉乎也。",
        pinyin: "zhǐ xīn xiū hù， yǒng suí jí shào， jǔ bù yǐn lǐng， fǔ yǎng láng miào。\nshù dài jīn zhuāng， pái huái zhān tiào， gū lòu guǎ wén， yú méng děng qiào。\nwèi yǔ zhù zhě， yān zāi hū yě。",
        translation: "像火把传给火把一样，一代代做好事、积福气，就能永远平平安安、吉祥美好。走路脚步要方方正正，抬头挺胸；一低头一抬头都端庄，就像站在朝廷大殿上。束好衣带，神情庄重，走一走、站一站，瞻前望后都稳重。如果见识少、听得少，又糊里糊涂不学习，就会被人笑话。最后说说那些常挂在嘴边的语气词，就是'焉、哉、乎、也'。",
      }
      ],
    }
  ],
  rights: {
    workTitle: "千字文",
    author: "周兴嗣",
    authorDeathYear: 521,
    translator: '桃阅读',
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: "https://github.com/chinese-poetry/chinese-poetry",
    note: "通行本全篇；注音与白话译文为平台自撰。",
  },
}
