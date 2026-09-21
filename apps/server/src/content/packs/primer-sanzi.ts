import type { PackBook } from '../types'

/**
 * 《三字经》——由 scripts/gen-corpus.mjs 从公版语料生成（2026-09-20 全面补全）。
 * 底本：三字经（王应麟）。逐字来自语料数据集，译文为平台自撰白话。
 * 通行本全篇；注音与白话译文为平台自撰。
 */
export const sanziJing: PackBook = {
  id: "sanzi-jing",
  title: "三字经",
  author: "王应麟（宋）",
  lang: "zh",
  category: "primer",
  ageStage: "3-5",
  intro: "三字一句，朗朗上口。全本《三字经》，从「人之初」一直读到「宜勉力」，古时候小朋友的识字课本。",
  coverArt: "primer-scroll",
  coverArtPrompt: "一幅古代学堂场景：木质书桌上摊开一卷三字经竹简，旁边放着毛笔和砚台，窗外是桃花和远山，温暖的自然光洒进来",
  coverFrom: "#FFE0B2",
  coverTo: "#FFB74D",
  source: "公版古籍（南宋·王应麟）节选，逐字注音",
  chapters: [
    {
      title: "第一课 · 人之初 · 佚名",
      art: 'sanzi-jing:ch1',
      artPrompt: "《三字经》第1课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "人之初，性本善，性相近，习相远。\n茍不教，性乃迁，教之道，贵以专。\n昔孟母，择邻处，子不学，断机杼。\n窦燕山，有义方，教五子，名俱扬。\n养不教，父之过，教不严，师之惰。\n子不学，非所宜，幼不学，老何为？\n玉不琢，不成器，人不学，不知义。\n为人子，方少时，亲师友，习礼仪。",
        pinyin: "rén zhī chū， xìng běn shàn， xìng xiāng jìn， xí xiāng yuǎn。\njì bù jiào， xìng nǎi qiān， jiào zhī dào， guì yǐ zhuān。\nxī mèng mǔ， zé lín chù， zǐ bù xué， duàn jī zhù。\ndòu yān shān， yǒu yì fāng， jiào wǔ zǐ， míng jù yáng。\nyǎng bù jiào， fù zhī guò， jiào bù yán， shī zhī duò。\nzǐ bù xué， fēi suǒ yí， yòu bù xué， lǎo hé wèi？\nyù bù zhuó， bù chéng qì， rén bù xué， bù zhī yì。\nwèi rén zǐ， fāng shǎo shí， qīn shī yǒu， xí lǐ yí。",
        translation: "人刚出生的时候，本性都是善良的；天性本来差不多，只因后天的学习和环境不同，差别才越来越大。如果不好好教导，善良的本性就会变坏；教育孩子，最要紧的是专心坚持。从前孟子的母亲为了给孩子找个好环境，特地挑选邻居搬家；孟子逃学，她就剪断织布机上的布来教育他。五代的窦燕山教子有方，五个儿子都很有出息，名声传遍四方。只生养孩子却不好好教育，是父亲的过错；教育学生却不严格，是老师偷懒。孩子不肯学习，是很不应该的；小时候不学习，长大了能有什么用呢？玉不打磨雕刻，成不了精美的器物；人不学习，就不懂得道理。做子女的，从小就要亲近老师和益友，学习礼仪。",
      }
      ],
    },
    {
      title: "第二课 · 香九龄 · 佚名",
      art: 'sanzi-jing:ch2',
      artPrompt: "《三字经》第2课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "香九龄，能温席，孝于亲，所当执。\n融四岁，能让梨，弟于长，宜先知。\n首孝弟，次见闻，知某数，识某文。\n一而十，十而百，百而千，千而万。\n三才者，天地人，三光者，日月星。\n三纲者，君臣义，父子亲，夫妇顺。\n曰春夏，曰秋冬，此四时，运不穷。\n曰南北，曰西东，此四方，应乎中。",
        pinyin: "xiāng jiǔ líng， néng wēn xí， xiào yú qīn， suǒ dāng zhí。\nróng sì suì， néng ràng lí， dì yú cháng， yí xiān zhī。\nshǒu xiào dì， cì jiàn wén， zhī mǒu shù， shí mǒu wén。\nyī ér shí， shí ér bǎi， bǎi ér qiān， qiān ér wàn。\nsān cái zhě， tiān dì rén， sān guāng zhě， rì yuè xīng。\nsān gāng zhě， jūn chén yì， fù zǐ qīn， fū fù shùn。\nyuē chūn xià， yuē qiū dōng， cǐ sì shí， yùn bù qióng。\nyuē nán běi， yuē xī dōng， cǐ sì fāng， yìng hū zhōng。",
        translation: "黄香九岁时，冬天能用身体把父亲的被窝先暖热，孝顺父母，就应该这样做。孔融四岁时，就把大梨让给哥哥，敬爱兄长的道理，要从小就知道。首先要孝敬父母、友爱兄弟，其次是增长见闻，学会数数，认识文字。一而十，十而百，百而千，千而万。天、地、人合称“三才”；太阳、月亮、星星合称“三光”。三纲是：君臣之间要有礼义，父子之间要相亲，夫妻之间要和顺。春夏秋冬合称四季，季节轮转，永不停歇；东南西北合称四方，都对着中央的位置。",
      }
      ],
    },
    {
      title: "第三课 · 曰水火 · 佚名",
      art: 'sanzi-jing:ch3',
      artPrompt: "《三字经》第3课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "曰水火，木金土，此五行，本乎数。\n十干者，甲至癸，十二支，子至亥。\n曰黄道，日所躔，曰赤道，当中权。\n赤道下，温暖极，我中华，在东北。\n寒燠均，霜露改，右高原，左大海。\n曰江河，曰淮济，此四渎，水之纪。\n曰岱华，嵩恒衡，此五岳，山之名。\n古九州，今改制，称行省，三十五。",
        pinyin: "yuē shuǐ huǒ， mù jīn tǔ， cǐ wǔ háng， běn hū shù。\nshí gān zhě， jiǎ zhì guǐ， shí èr zhī， zǐ zhì hài。\nyuē huáng dào， rì suǒ chán， yuē chì dào， dāng zhōng quán。\nchì dào xià， wēn nuǎn jí， wǒ zhōng huá， zài dōng běi。\nhán yù jūn， shuāng lù gǎi， yòu gāo yuán， zuǒ dà hǎi。\nyuē jiāng hé， yuē huái jì， cǐ sì dú， shuǐ zhī jì。\nyuē dài huá， sōng héng héng， cǐ wǔ yuè， shān zhī míng。\ngǔ jiǔ zhōu， jīn gǎi zhì， chēng xíng shěng， sān shí wǔ。",
        translation: "水、火、木、金、土，合称“五行”，它们来自大自然的规律。天干有十个，从甲到癸；地支有十二个，从子到亥。黄道是太阳走的轨道，赤道在地球的正中间。赤道附近最温暖，我们中国位于它的东北方。这里冷热均匀，霜露随季节变换，右边是高原，左边是大海。长江、黄河、淮河、济水合称“四渎”，是水流的代表。泰山、华山、嵩山、恒山、衡山合称“五岳”，是五座大山的名字。古时候天下分为九州，如今改成行省，一共有三十五个。",
      }
      ],
    },
    {
      title: "第四课 · 曰士农 · 佚名",
      art: 'sanzi-jing:ch4',
      artPrompt: "《三字经》第4课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "曰士农，曰工商，此四民，国之良。\n地所生，有草木，此植物，遍水陆。\n有虫鱼，有鸟兽，此动物，能飞走。\n稻粱菽，麦黍稷，此六谷，人所食。\n马牛羊，鸡犬豕，此六畜，人所饲。\n曰喜怒，曰哀惧，爱恶欲，七情具。\n曰仁义，礼智信，此五常，不容紊。\n青赤黄，及白黑，此五色，目所识。",
        pinyin: "yuē shì nóng， yuē gōng shāng， cǐ sì mín， guó zhī liáng。\ndì suǒ shēng， yǒu cǎo mù， cǐ zhí wù， biàn shuǐ lù。\nyǒu chóng yú， yǒu niǎo shòu， cǐ dòng wù， néng fēi zǒu。\ndào liáng shū， mài shǔ jì， cǐ liù gǔ， rén suǒ shí。\nmǎ niú yáng， jī quǎn shǐ， cǐ liù chù， rén suǒ sì。\nyuē xǐ nù， yuē āi jù， ài è yù， qī qíng jù。\nyuē rén yì， lǐ zhì xìn， cǐ wǔ cháng， bù róng wěn。\nqīng chì huáng， jí bái hēi， cǐ wǔ sè， mù suǒ shí。",
        translation: "读书人、农民、工人、商人，这四种人是国家的好百姓。大地上生长着花草树木，这些植物遍布水中和陆地；还有虫、鱼、鸟、兽，这些动物有的会飞，有的会走。稻子、高粱、豆子、麦子、黍、稷，这“六谷”是人吃的粮食；马、牛、羊、鸡、狗、猪，这“六畜”是人饲养的动物。高兴、生气、悲伤、害怕，加上喜爱、讨厌、想要，人人都有这“七情”。仁、义、礼、智、信，这“五常”是做人的准则，不能搞乱。青、红、黄，加上白和黑，这五种颜色，是眼睛认得出来的。",
      }
      ],
    },
    {
      title: "第五课 · 酸甘甘 · 佚名",
      art: 'sanzi-jing:ch5',
      artPrompt: "《三字经》第5课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "酸甘甘，及辛咸，此五味，口所含。\n膻焦香，及腥朽，此五臭，鼻所嗅。\n宫商角，及征羽，此五音，耳所取。\n匏土革，木石金，与丝竹，乃八音。\n曰平上，曰去入，此四声，宜调叶。\n九族者，序宗亲，高曾祖，父而身。\n身而子，子而孙，自子孙，至曾玄。\n五伦者，始夫妇，父子先，君臣后。",
        pinyin: "suān gān gān， jí xīn xián， cǐ wǔ wèi， kǒu suǒ hán。\nshān jiāo xiāng， jí xīng xiǔ， cǐ wǔ chòu， bí suǒ xiù。\ngōng shāng jiǎo， jí zhēng yǔ， cǐ wǔ yīn， ěr suǒ qǔ。\npáo tǔ gé， mù shí jīn， yǔ sī zhú， nǎi bā yīn。\nyuē píng shàng， yuē qù rù， cǐ sì shēng， yí tiáo yè。\njiǔ zú zhě， xù zōng qīn， gāo zēng zǔ， fù ér shēn。\nshēn ér zǐ， zǐ ér sūn， zì zǐ sūn， zhì céng xuán。\nwǔ lún zhě， shǐ fū fù， fù zǐ xiān， jūn chén hòu。",
        translation: "酸、甜，加上辣和咸，这“五味”是嘴巴尝出来的；羊膻味、焦味、香味、腥味、腐朽味，这“五臭”是鼻子闻出来的。宫、商、角、徵、羽，这“五音”是耳朵听出来的。匏、土、革、木、石、金，加上丝和竹，八类材料做的乐器合称“八音”。平、上、去、入，这四种声调要读得协调顺口。“九族”是按次序排列的家族亲人：高祖父、曾祖父、祖父、父亲，再到自己；自己生儿子，儿子生孙子，往下传到曾孙、玄孙。“五伦”从夫妻开始，先是父子，再后是君臣。",
      }
      ],
    },
    {
      title: "第六课 · 次兄弟 · 佚名",
      art: 'sanzi-jing:ch6',
      artPrompt: "《三字经》第6课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "次兄弟，及朋友，当顺叙，勿违背。\n有伯叔，有舅甥，婿妇翁，三党名。\n凡训蒙，须讲究，详训故，明句读。\n礼乐射，御书数，古六艺，今不具。\n帷书学，人共遵，既识字，讲说文。\n有古文，大小篆，隶草继，不可乱。\n若广学，惧其繁，但略说，能知源。\n为学者，必有初，小学终，至四书。",
        pinyin: "cì xiōng dì， jí péng yǒu， dāng shùn xù， wù wéi bèi。\nyǒu bó shū， yǒu jiù shēng， xù fù wēng， sān dǎng míng。\nfán xùn méng， xū jiǎng jiū， xiáng xùn gù， míng jù dòu。\nlǐ yuè shè， yù shū shù， gǔ liù yì， jīn bù jù。\nwéi shū xué， rén gòng zūn， jì shí zì， jiǎng shuō wén。\nyǒu gǔ wén， dà xiǎo zhuàn， lì cǎo jì， bù kě luàn。\nruò guǎng xué， jù qí fán， dàn lüè shuō， néng zhī yuán。\nwèi xué zhě， bì yǒu chū， xiǎo xué zhōng， zhì sì shū。",
        translation: "接着是兄弟、朋友之间的情分，要按次序好好相处，不能违背。有伯伯叔叔，有舅舅外甥，还有女婿和岳父，这些是三方面亲属的称呼。凡是教小孩子读书，必须讲求方法，把字句的意思讲解详细，弄明白怎么断句。礼、乐、射、御、书、数，是古时候的“六艺”，现在不全有了。只有书法这一门，人人都遵照学习；认识了字，还要讲讲《说文解字》。文字先有古文、大篆、小篆，后来又有隶书、草书，先后的次序不能弄乱。想学得广，又怕内容太多，这里只简单说说，能知道源头就好。求学必须有开头：先学完小学的知识，再读四书。",
      }
      ],
    },
    {
      title: "第七课 · 论语者 · 佚名",
      art: 'sanzi-jing:ch7',
      artPrompt: "《三字经》第7课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "论语者，二十篇，群弟子，记善言。\n孟子者，七篇止，辨王载，说仁义。\n中庸者，子思笔，中不偏，庸不易。\n大学者，乃曾子，自修齐，至治平。\n此二篇，在礼记，今单行，至治平。\n四书通，孝经熟，如六经，始可读。\n六经者，统儒术，文作周，孔子述。\n易诗书，礼春秋，乐经亡，余可求。",
        pinyin: "lún yǔ zhě， èr shí piān， qún dì zǐ， jì shàn yán。\nmèng zǐ zhě， qī piān zhǐ， biàn wáng zǎi， shuō rén yì。\nzhōng yōng zhě， zǐ sī bǐ， zhōng bù piān， yōng bù yì。\ndà xué zhě， nǎi céng zǐ， zì xiū qí， zhì zhì píng。\ncǐ èr piān， zài lǐ jì， jīn dān háng， zhì zhì píng。\nsì shū tōng， xiào jīng shú， rú liù jīng， shǐ kě dú。\nliù jīng zhě， tǒng rú shù， wén zuò zhōu， kǒng zǐ shù。\nyì shī shū， lǐ chūn qiū， lè jīng wáng， yú kě qiú。",
        translation: "《论语》这部书共有二十篇，是孔子的学生们记下的好言论。《孟子》这部书共有七篇，讲的是仁义和王道。《中庸》是子思写的，“中”是不偏不倚，“庸”是永远不变。《大学》是曾子写的，讲从修养自己、管理家庭，一直讲到治理国家、平定天下。中庸、大学这两篇原来收在《礼记》里，现在单独流行。把四书读通了，把《孝经》读熟了，才可以去读六经那样深的大书。六经总括儒家的学问，文章创自周公，由孔子传述。《易》《诗》《书》《礼》《春秋》还在，《乐经》失传了，其余的都可以求得。",
      }
      ],
    },
    {
      title: "第八课 · 有连山 · 佚名",
      art: 'sanzi-jing:ch8',
      artPrompt: "《三字经》第8课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "有连山，有归藏，有周易，三易详。\n有典谟，有训诰，有誓命，书之奥。\n有国风，有雅颂，号四诗，当讽诵。\n周礼者，箸六官，仪礼者，十七篇。\n大小戴，集礼记，述圣言，礼法备。\n王迹息，春秋作，寓褒贬，别善恶。\n王传者，有公羊，有左氏，有谷梁。\n尔雅者，善辨言，求经训，此莫先。",
        pinyin: "yǒu lián shān， yǒu guī cáng， yǒu zhōu yì， sān yì xiáng。\nyǒu diǎn mó， yǒu xùn gào， yǒu shì mìng， shū zhī ào。\nyǒu guó fēng， yǒu yǎ sòng， hào sì shī， dāng fěng sòng。\nzhōu lǐ zhě， zhù liù guān， yí lǐ zhě， shí qī piān。\ndà xiǎo dài， jí lǐ jì， shù shèng yán， lǐ fǎ bèi。\nwáng jì xī， chūn qiū zuò， yù bāo biǎn， bié shàn è。\nwáng chuán zhě， yǒu gōng yáng， yǒu zuǒ shì， yǒu gǔ liáng。\něr yǎ zhě， shàn biàn yán， qiú jīng xùn， cǐ mò xiān。",
        translation: "有《连山》、有《归藏》、有《周易》，三种“易”书讲得很详细。《书经》里有典、谟、训、诰、誓、命各种文体，内容十分深奥。《诗经》里有国风、大雅、小雅和颂，号称“四诗”，应当常常诵读。《周礼》记载着六官的制度，《仪礼》有十七篇。大戴和小戴汇编了《礼记》，传述圣人的话，礼法都齐备了。周王室的功业衰落后，孔子写作《春秋》，把赞扬和批评藏在文字里，分辨善与恶。为《春秋》作传的有《公羊传》《左传》《谷梁传》三部。《尔雅》善于辨析文字词句，要查考经书的词义，没有比它更要先读的。",
      }
      ],
    },
    {
      title: "第九课 · 古圣著 · 佚名",
      art: 'sanzi-jing:ch9',
      artPrompt: "《三字经》第9课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "古圣著，先贤传，注疏备，十三经。\n左传外，有国语，合群经，数十五。\n经既明，方读子，撮其要，记其事。\n古九流，多亡佚，取五种，修文质。\n五子者，有荀扬，文中子，及老庄。\n经子通，读诸史，考世系，知终始。\n自羲农，至黄帝，号三皇，在上世。\n尧舜兴，禅尊位，号唐虞，为二帝。",
        pinyin: "gǔ shèng zhù， xiān xián chuán， zhù shū bèi， shí sān jīng。\nzuǒ chuán wài， yǒu guó yǔ， hé qún jīng， shù shí wǔ。\njīng jì míng， fāng dú zǐ， cuō qí yào， jì qí shì。\ngǔ jiǔ liú， duō wáng yì， qǔ wǔ zhǒng， xiū wén zhì。\nwǔ zǐ zhě， yǒu xún yáng， wén zhōng zǐ， jí lǎo zhuāng。\njīng zǐ tōng， dú zhū shǐ， kǎo shì xì， zhī zhōng shǐ。\nzì xī nóng， zhì huáng dì， hào sān huáng， zài shàng shì。\nyáo shùn xīng， chán zūn wèi， hào táng yú， wèi èr dì。",
        translation: "古代圣人著的书、先贤传的书，经过注释讲解，合称“十三经”。《左传》之外还有《国语》，把这些经书合在一起，共有十五部。经书读明白了，才去读诸子的书，选取要点，记住里面的道理。古时候的九个学派大多失传了，选取五种来增进学问修养。诸子中有荀子、扬雄、《文中子》，还有老子和庄子。经书、子书读通了，再去读各朝的历史，考查帝王世系，知道兴亡的始末。从伏羲、神农到黄帝，号称“三皇”，都在远古时代。尧和舜先后兴起，把王位禅让给贤人，号称“唐虞”，是“二帝”。",
      }
      ],
    },
    {
      title: "第十课 · 夏有禹 · 佚名",
      art: 'sanzi-jing:ch10',
      artPrompt: "《三字经》第10课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "夏有禹，商有汤，周文武，称三王。\n夏传子，家天下，四百载，迁夏社。\n汤伐夏，国号商，六百载，至纣亡。\n周武王，始诛纣，八百载，最长久。\n周共和，始纪年，历宣幽，遂东迁。\n周道衰，王纳坠，逞士戈，尚游说。\n始春秋，终战国，五霸强，七雄出。\n蠃秦氏，始兼并，传二世，楚汉争。",
        pinyin: "xià yǒu yǔ， shāng yǒu tāng， zhōu wén wǔ， chēng sān wáng。\nxià chuán zǐ， jiā tiān xià， sì bǎi zǎi， qiān xià shè。\ntāng fá xià， guó hào shāng， liù bǎi zǎi， zhì zhòu wáng。\nzhōu wǔ wáng， shǐ zhū zhòu， bā bǎi zǎi， zuì cháng jiǔ。\nzhōu gòng hé， shǐ jì nián， lì xuān yōu， suì dōng qiān。\nzhōu dào shuāi， wáng nà zhuì， chěng shì gē， shàng yóu shuì。\nshǐ chūn qiū， zhōng zhàn guó， wǔ bà qiáng， qī xióng chū。\nluǒ qín shì， shǐ jiān bìng， chuán èr shì， chǔ hàn zhēng。",
        translation: "夏朝有禹，商朝有汤，周朝有文王和武王，他们合称“三王”。夏禹把王位传给儿子，天下变成了一家的天下；过了四百年，夏朝就结束了。商汤讨伐夏桀，国号定为商；传了六百年，到纣王时灭亡。周武王起兵讨伐纣王，周朝享国八百年，是最长久的朝代。周朝“共和”时开始有明确的纪年，经历宣王、幽王，后来都城向东迁走。周朝的王道衰落了，天子的命令没人听从，诸侯们动起刀枪，游说之士到处宣扬主张。这段时期从春秋开始，到战国结束：五个霸主强大起来，七个强国并立争雄。秦始皇兼并六国，传到二世，楚和汉又起来争夺天下。",
      }
      ],
    },
    {
      title: "第十一课 · 高祖兴 · 佚名",
      art: 'sanzi-jing:ch11',
      artPrompt: "《三字经》第11课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "高祖兴，汉业建，至孝平，王莽篡。\n先武兴，为东汉，四百年，终于献。\n魏蜀吴，争汉鼎，号三国，迄两晋。\n宋齐继，梁陈承，为南朝，都金陵。\n北元魏，分东西，宇文周，与高齐。\n迨至隋，一土宇，不再传，失统绪。\n唐高祖，起义师，除隋乱，创国基。\n二十传，三百载，梁灭之，国乃改。",
        pinyin: "gāo zǔ xīng， hàn yè jiàn， zhì xiào píng， wáng mǎng cuàn。\nxiān wǔ xīng， wèi dōng hàn， sì bǎi nián， zhōng yú xiàn。\nwèi shǔ wú， zhēng hàn dǐng， hào sān guó， qì liǎng jìn。\nsòng qí jì， liáng chén chéng， wèi nán cháo， dōu jīn líng。\nběi yuán wèi， fēn dōng xī， yǔ wén zhōu， yǔ gāo qí。\ndài zhì suí， yī tǔ yǔ， bù zài chuán， shī tǒng xù。\ntáng gāo zǔ， qǐ yì shī， chú suí luàn， chuàng guó jī。\nèr shí chuán， sān bǎi zǎi， liáng miè zhī， guó nǎi gǎi。",
        translation: "汉高祖兴起，建立汉朝的基业；传到孝平帝时，王莽篡夺了皇位。光武帝中兴汉室，建立东汉；汉朝前后四百年，到汉献帝时结束。魏、蜀、吴争夺汉朝的天下，号称“三国”，直到两晋才统一。刘宋、南齐相继，梁、陈接着承续，这四个朝代合称南朝，都城都定在金陵。北方的北魏后来分为东魏和西魏，还有宇文家的周、高家的齐。到了隋朝，天下重新统一；可只传了一代，就失去了帝位。唐高祖起义兵，平定隋朝的战乱，开创了唐朝的基业。唐朝传了二十位皇帝、约三百年，被后梁灭掉，国号就改了。",
      }
      ],
    },
    {
      title: "第十二课 · 梁唐晋 · 佚名",
      art: 'sanzi-jing:ch12',
      artPrompt: "《三字经》第12课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "梁唐晋，及汉周，称五代，皆有由。\n赵宋兴，受周祥，十八传，南北混。\n辽兴金，皆夷裔，元灭之，绝宋世。\n莅中国，兼戎狄，九十年，返沙碛。\n太祖兴，称大明，纪洪武，都金陵。\n迨成祖，迁宛平，十六世，至崇祯。\n权阉肆，流寇起，自成入，神器毁。\n清太祖，兴辽东，金之后，受明封。",
        pinyin: "liáng táng jìn， jí hàn zhōu， chēng wǔ dài， jiē yǒu yóu。\nzhào sòng xīng， shòu zhōu xiáng， shí bā chuán， nán běi hùn。\nliáo xīng jīn， jiē yí yì， yuán miè zhī， jué sòng shì。\nlì zhōng guó， jiān róng dí， jiǔ shí nián， fǎn shā qì。\ntài zǔ xīng， chēng dà míng， jì hóng wǔ， dōu jīn líng。\ndài chéng zǔ， qiān wǎn píng， shí liù shì， zhì chóng zhēn。\nquán yān sì， liú kòu qǐ， zì chéng rù， shén qì huǐ。\nqīng tài zǔ， xīng liáo dōng， jīn zhī hòu， shòu míng fēng。",
        translation: "后梁、后唐、后晋，加上后汉、后周，合称“五代”，每个朝代的更换都有缘由。赵家宋朝兴起，接受了后周的禅让；传了十八位皇帝，后来南方北方陷入混乱。辽和金先后兴起，都是外族的后代；元朝灭了金，又灭了宋。元朝统治中国，兼并周边各族；九十年之后，又退回了北方的沙漠。明太祖兴起，国号叫大明，年号纪元洪武，定都在金陵。到明成祖时迁都北京，传了十六代，到崇祯皇帝为止。掌权的宦官胡作非为，流寇四处起来，李自成打进京城，皇位被毁掉了。清太祖在辽东兴起，是金人的后代，曾受过明朝的封号。",
      }
      ],
    },
    {
      title: "第十三课 · 至世祖 · 佚名",
      art: 'sanzi-jing:ch13',
      artPrompt: "《三字经》第13课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "至世祖，乃大同，十二世，清祚终。\n凡正史，廿四部，益以清，成廿五。\n史虽繁，读有次，史记一，汉书二。\n后汉三，国志四，此四史，最精致。\n先四史，兼证经，参通鉴，约而精。\n历代事，全在兹，载治乱，知兴衰。\n读史者，考实录，通古今，若亲目。\n汉贾董，及许郑，皆经师，能述圣。",
        pinyin: "zhì shì zǔ， nǎi dà tóng， shí èr shì， qīng zuò zhōng。\nfán zhèng shǐ， niàn sì bù， yì yǐ qīng， chéng niàn wǔ。\nshǐ suī fán， dú yǒu cì， shǐ jì yī， hàn shū èr。\nhòu hàn sān， guó zhì sì， cǐ sì shǐ， zuì jīng zhì。\nxiān sì shǐ， jiān zhèng jīng， cān tōng jiàn， yuē ér jīng。\nlì dài shì， quán zài zī， zǎi zhì luàn， zhī xīng shuāi。\ndú shǐ zhě， kǎo shí lù， tōng gǔ jīn， ruò qīn mù。\nhàn jiǎ dǒng， jí xǔ zhèng， jiē jīng shī， néng shù shèng。",
        translation: "到清世祖时天下归于安定，传了十二代，清朝就结束了。正史共有二十四部，加上清史，就成为二十五部。史书虽然繁多，读起来要有次序：《史记》第一，《汉书》第二，《后汉书》第三，《三国志》第四，这“四史”写得最精致。先读四史，再对照经书，参读《资治通鉴》，既简要又精当。历代的大事全在这里面，记载着太平与动乱，让人懂得兴盛和衰败的道理。读历史的人还要查考历朝实录，通晓古今的事，就像亲眼看见一样。汉代的贾谊、董仲舒，还有许慎、郑玄，都是经学大师，能传述圣人的学问。",
      }
      ],
    },
    {
      title: "第十四课 · 宋周程 · 佚名",
      art: 'sanzi-jing:ch14',
      artPrompt: "《三字经》第14课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "宋周程，张朱陆，明王氏，皆道学。\n屈原赋，本风人，逮邹枚，暨卿云。\n韩与柳，并文雄，李若杜，为诗宗。\n凡学者，宜兼通，翼圣教，振民风。\n口而诵，心而帷，朝于斯，夕于斯。\n昔仲尼，师项橐，古圣贤，尚勤学。\n赵中令，读鲁论，彼既仕，学且勤。\n披薄编，削竹简，彼无书，且知勉。",
        pinyin: "sòng zhōu chéng， zhāng zhū lù， míng wáng shì， jiē dào xué。\nqū yuán fù， běn fēng rén， dǎi zōu méi， jì qīng yún。\nhán yǔ liǔ， bìng wén xióng， lǐ ruò dù， wèi shī zōng。\nfán xué zhě， yí jiān tōng， yì shèng jiào， zhèn mín fēng。\nkǒu ér sòng， xīn ér wéi， cháo yú sī， xī yú sī。\nxī zhòng ní， shī xiàng tuó， gǔ shèng xián， shàng qín xué。\nzhào zhōng lìng， dú lǔ lùn， bǐ jì shì， xué qiě qín。\npī báo biān， xiāo zhú jiǎn， bǐ wú shū， qiě zhī miǎn。",
        translation: "宋代的周敦颐、程氏兄弟、张载、朱熹、陆九渊，加上明代的王守仁，都是道学大家。屈原的辞赋继承《诗经》的传统，后来有邹阳、枚乘，还有司马相如、扬雄等名家。韩愈和柳宗元都是文章大家，李白和杜甫是诗坛的宗师。求学的人应当全面贯通，辅佐圣人的教化，振奋民间的风气。口中要诵读，心里要思考，从早到晚都专心用功。从前孔子曾拜七岁的项橐为老师，古代的圣贤尚且这样勤学好问。宋朝的赵普做官做到宰相，还在读《论语》，他已经是做大官的人了，学习还是这么勤奋。还有把书抄在蒲草编的本子上读的，把竹简削光了抄书读的，他们没有书，还知道努力苦读。",
      }
      ],
    },
    {
      title: "第十五课 · 头悬梁 · 佚名",
      art: 'sanzi-jing:ch15',
      artPrompt: "《三字经》第15课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "头悬梁，锥刺股，彼不教，自勤苦。\n如囊萤，如映雪，家虽贫，学不辍。\n如负薪，如挂角，身虽劳，犹苦卓。\n苏明允，二十七，始发愤，读书籍。\n彼既老，犹悔迟，尔小生，宜早思。\n若荀卿，年五十，游稷下，习儒业。\n彼既成，众称异，尔小生，宜立志。\n莹八岁，能咏诗，泌七岁，能赋棋。",
        pinyin: "tóu xuán liáng， zhuī cì gǔ， bǐ bù jiào， zì qín kǔ。\nrú náng yíng， rú yìng xuě， jiā suī pín， xué bù chuò。\nrú fù xīn， rú guà jiǎo， shēn suī láo， yóu kǔ zhuó。\nsū míng yǔn， èr shí qī， shǐ fā fèn， dú shū jí。\nbǐ jì lǎo， yóu huǐ chí， ěr xiǎo shēng， yí zǎo sī。\nruò xún qīng， nián wǔ shí， yóu jì xià， xí rú yè。\nbǐ jì chéng， zhòng chēng yì， ěr xiǎo shēng， yí lì zhì。\nyíng bā suì， néng yǒng shī， mì qī suì， néng fù qí。",
        translation: "有人把头发系在房梁上防止打瞌睡，有人用锥子刺自己的大腿提神，他们没有人督促，自己就知道刻苦学习。有人把萤火虫装进纱袋里借光读书，有人借着雪地反射的光读书，家里虽然贫穷，学习却从不停止。有人背着柴火还坚持读书，有人把书挂在牛角上一边放牛一边读，身体虽然劳累，仍然刻苦自立。苏洵二十七岁才开始发愤读书，他年纪那么大了还后悔读得太迟，你们小孩子更应当早点打算。荀子五十岁还去稷下游学，专心学习儒家学问；他终于学有所成，人人称赞，你们小孩子应当早立志向。祖莹八岁就会吟诗，李泌七岁就能写棋赋。",
      }
      ],
    },
    {
      title: "第十六课 · 彼颖悟 · 佚名",
      art: 'sanzi-jing:ch16',
      artPrompt: "《三字经》第16课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "彼颖悟，人称奇，尔幼学，当效之。\n蔡文姬，能辩琴，谢道韫，能咏吟。\n彼女子，且聪敏，尔男子，当自警。\n唐刘晏，方七岁，举神童，作正字。\n彼虽幼，身已仕，尔细学，勉而致。\n犬守夜，鸡司晨，茍不学，曷为人？\n蚕吐丝，蜂酿蜜，人不学，不如物。\n幼习业，壮致身，上匡国，下利民。",
        pinyin: "bǐ yǐng wù， rén chēng qí， ěr yòu xué， dāng xiào zhī。\ncài wén jī， néng biàn qín， xiè dào yùn， néng yǒng yín。\nbǐ nǚ zǐ， qiě cōng mǐn， ěr nán zǐ， dāng zì jǐng。\ntáng liú yàn， fāng qī suì， jǔ shén tóng， zuò zhèng zì。\nbǐ suī yòu， shēn yǐ shì， ěr xì xué， miǎn ér zhì。\nquǎn shǒu yè， jī sī chén， jì bù xué， hé wèi rén？\ncán tǔ sī， fēng niàng mì， rén bù xué， bù rú wù。\nyòu xí yè， zhuàng zhì shēn， shàng kuāng guó， xià lì mín。",
        translation: "他们那样聪明，人人都觉得了不起，你们这些小孩子应当向他们学习。蔡文姬能分辨琴声，谢道韫能吟诗作文；她们是女子，都这样聪敏，你们是男孩子，更要自己警醒努力。唐朝的刘晏才七岁，就被举荐为神童，做了正字的官。他年纪虽然小，已经做了官，你们年幼求学，也要努力做到。狗会看家守夜，鸡会打鸣报晓，人如果不好好学习，凭什么算是个人呢？蚕会吐丝，蜜蜂会酿蜜，人不学习，就连这些小动物都比不上了。小时候学好本领，长大后施展才干，对上能辅佐国家，对下能给百姓带来好处。",
      }
      ],
    },
    {
      title: "第十七课 · 扬名声 · 佚名",
      art: 'sanzi-jing:ch17',
      artPrompt: "《三字经》第17课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风",
      blocks: [
      {
        kind: 'poem',
        text: "扬名声，显父母，光于前，裕于后。\n人遗子，金满籯，我教子，帷一经。\n勤有功，戏无益，戒之哉，宜勉力。",
        pinyin: "yáng míng shēng， xiǎn fù mǔ， guāng yú qián， yù yú hòu。\nrén yí zǐ， jīn mǎn yíng， wǒ jiào zǐ， wéi yī jīng。\nqín yǒu gōng， xì wú yì， jiè zhī zāi， yí miǎn lì。",
        translation: "做出成绩，名声传扬开来，父母也跟着荣耀，既为祖先增添光彩，又给后代留下福泽。别人留给子孙的是满箱满筐的金银，我教育子孙的只有一部经书。勤奋学习才有真本事，贪玩嬉戏没有一点好处，要时刻警惕，好好努力啊。",
      }
      ],
    }
  ],
  rights: {
    workTitle: "三字经",
    author: "王应麟",
    authorDeathYear: 1296,
    translator: '桃阅读',
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: "https://github.com/chinese-poetry/chinese-poetry",
    note: "通行本全篇；注音与白话译文为平台自撰。",
  },
}
