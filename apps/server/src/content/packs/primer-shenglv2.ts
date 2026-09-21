import type { PackBook } from '../types'

/**
 * 《声律启蒙·下卷》——由 scripts/gen-corpus.mjs 从公版语料生成（2026-09-20 全面补全）。
 * 底本：声律启蒙（车万育）。逐字来自语料数据集，译文为平台自撰白话。
 * 通行本全篇；注音与白话译文为平台自撰。
 */
export const shenglvJiang: PackBook = {
  id: "primer-shenglv2",
  title: "声律启蒙·下卷",
  author: "车万育（清）",
  lang: "zh",
  category: "primer",
  ageStage: "6-8",
  intro: "十五个新韵部，从「来对往」到「规对矩」，继续对对子。",
  coverArt: "seasons-rhythm",
  coverArtPrompt: "四个角分别画着春花、夏荷、秋叶、冬雪，中间一个孩子开心地敲着小鼓，节奏欢快，水彩绘本风",
  coverFrom: "#00695C",
  coverTo: "#E0F2F1",
  source: "《声律启蒙》通行本（车万育，卒 1705），公版",
  chapters: [
    {
      title: "一 先 · 车万育",
      art: "primer-scroll",
      artPrompt: "《声律启蒙》一 先韵插画：对联里的山水花鸟，古风贴纸绘本",
      blocks: [
      {
        kind: 'poem',
        text: "晴对雨，地对天，天地对山川。山川对草木，赤壁对青田。郏鄏鼎，武城弦，木笔对苔钱。金城三月柳，玉井九秋莲。何处春朝风景好，谁家秋夜月华圆。珠缀花梢，千点蔷薇香露；练横树杪，几丝杨柳残烟。\n前对后，后对先，众丑对孤妍。莺簧对蝶板，虎穴对龙渊。击石磬，观韦编，鼠目对鸢肩。春园花柳地，秋沼芰荷天。白羽频挥闲客坐，乌纱半坠醉翁眠。野店几家，羊角风摇沽酒旆；长川一带，鸭头波泛卖鱼船。\n离对坎，震对干，一日对千年，尧天对舜日，蜀水对秦川。苏武节，郑虔毡，涧壑对林泉。挥戈能退日，持管莫窥天。寒食芳辰花烂熳，中秋佳节月婵娟。梦里荣华，飘忽枕中之客；壶中日月，安闲市上之仙。",
        pinyin: "qíng duì yǔ， dì duì tiān， tiān dì duì shān chuān。 shān chuān duì cǎo mù， chì bì duì qīng tián。 jiá rǔ dǐng， wǔ chéng xián， mù bǐ duì tái qián。 jīn chéng sān yuè liǔ， yù jǐng jiǔ qiū lián。 hé chù chūn cháo fēng jǐng hǎo， shuí jiā qiū yè yuè huá yuán。 zhū zhuì huā shāo， qiān diǎn qiáng wēi xiāng lù； liàn héng shù miǎo， jǐ sī yáng liǔ cán yān。\nqián duì hòu， hòu duì xiān， zhòng chǒu duì gū yán。 yīng huáng duì dié bǎn， hǔ xué duì lóng yuān。 jī shí qìng， guān wéi biān， shǔ mù duì yuān jiān。 chūn yuán huā liǔ dì， qiū zhǎo jì hé tiān。 bái yǔ pín huī xián kè zuò， wū shā bàn zhuì zuì wēng mián。 yě diàn jǐ jiā， yáng jiǎo fēng yáo gū jiǔ pèi； cháng chuān yī dài， yā tóu bō fàn mài yú chuán。\nlí duì kǎn， zhèn duì gān， yī rì duì qiān nián， yáo tiān duì shùn rì， shǔ shuǐ duì qín chuān。 sū wǔ jié， zhèng qián zhān， jiàn hè duì lín quán。 huī gē néng tuì rì， chí guǎn mò kuī tiān。 hán shí fāng chén huā làn màn， zhōng qiū jiā jié yuè chán juān。 mèng lǐ róng huá， piāo hū zhěn zhōng zhī kè； hú zhōng rì yuè， ān xián shì shàng zhī xiān。",
        translation: "晴天对雨天，地对天，天地对山川。山川对草木，赤壁对青田。郏鄏的宝鼎，武城的琴声，木笔花对苔钱。金城三月天的柳树，玉井九秋天的莲花。哪里春天的早晨风景最好？谁家秋天的夜里月儿最圆？花梢上缀着千点蔷薇般的香露，树梢上横着几丝杨柳似的轻烟。前对后，后对先，许多平常的对一个出色的。黄莺叫得像簧片，蝴蝶飞得像琴板，虎穴对龙潭。敲打石磬，翻看编联的书简，老鼠的眼睛对鸢鸟的肩膀。春天的园子是花柳的世界，秋天的池沼是荷花的天空。白羽扇频频挥动，闲适的客人坐着；乌纱帽半边歪斜，喝醉的老翁睡着。野外有几家小店，旋风吹动卖酒的幌子；长长的河川像一条带子，鸭头绿的波浪里漂着卖鱼的小船。离对坎，震对乾，一天对千年。尧的天对舜的日，蜀地的水对秦地的川。苏武的节杖，郑虔的毡毯，山涧沟壑对树林泉水。挥动戈矛能把太阳赶回去，拿着管子哪能看尽天。寒食节百花烂漫，中秋节月色美好。梦里荣华，是枕头上转眼消失的客人；壶中日月，是街市上安闲自在的仙人。",
      }
      ],
    },
    {
      title: "二 萧 · 车万育",
      art: "primer-scroll",
      artPrompt: "《声律启蒙》二 萧韵插画：对联里的山水花鸟，古风贴纸绘本",
      blocks: [
      {
        kind: 'poem',
        text: "恭对慢，吝对骄，水远对山遥。松轩对竹槛，雪赋对风谣。乘五马，贯双雕，烛灭对香消。明蟾常彻夜，骤雨不终朝。楼阁天凉风飒飒，关河地隔雨潇潇。几点鹭鸶，日暮常飞红蓼岸；一双㶉鶒，春朝频泛绿杨桥。\n开对落，暗对昭，赵瑟对虞韶。轺车对驿骑，锦绣对琼瑶。羞攘臂，懒折腰，范甑对颜瓢。寒天鸳帐酒，夜月凤台箫。舞女腰肢杨柳软，佳人颜貌海棠娇。豪客寻春，南陌草青香阵阵；闲人避暑，东堂蕉绿影摇摇。\n班对马，董对晁，夏昼对春宵。雷声对电影，麦穗对禾苗。八千路，廿四桥，总角对垂髫。露桃匀嫩脸，风柳舞纤腰。贾谊赋成伤鵩鸟，周公诗就托鸱鸮。幽寺寻僧，逸兴岂知俄尔尽；长亭送客，离魂不觉黯然消。",
        pinyin: "gōng duì màn， lìn duì jiāo， shuǐ yuǎn duì shān yáo。 sōng xuān duì zhú kǎn， xuě fù duì fēng yáo。 chéng wǔ mǎ， guàn shuāng diāo， zhú miè duì xiāng xiāo。 míng chán cháng chè yè， zhòu yǔ bù zhōng cháo。 lóu gé tiān liáng fēng sà sà， guān hé dì gé yǔ xiāo xiāo。 jǐ diǎn lù sī， rì mù cháng fēi hóng liǎo àn； yī shuāng 㶉 chì， chūn cháo pín fàn lǜ yáng qiáo。\nkāi duì luò， àn duì zhāo， zhào sè duì yú sháo。 yáo chē duì yì qí， jǐn xiù duì qióng yáo。 xiū rǎng bì， lǎn zhé yāo， fàn zèng duì yán piáo。 hán tiān yuān zhàng jiǔ， yè yuè fèng tái xiāo。 wǔ nǚ yāo zhī yáng liǔ ruǎn， jiā rén yán mào hǎi táng jiāo。 háo kè xún chūn， nán mò cǎo qīng xiāng zhèn zhèn； xián rén bì shǔ， dōng táng jiāo lǜ yǐng yáo yáo。\nbān duì mǎ， dǒng duì cháo， xià zhòu duì chūn xiāo。 léi shēng duì diàn yǐng， mài suì duì hé miáo。 bā qiān lù， niàn sì qiáo， zǒng jiǎo duì chuí tiáo。 lù táo yún nèn liǎn， fēng liǔ wǔ xiān yāo。 jiǎ yì fù chéng shāng fú niǎo， zhōu gōng shī jiù tuō chī xiāo。 yōu sì xún sēng， yì xīng qǐ zhī é ěr jìn； cháng tíng sòng kè， lí hún bù jué àn rán xiāo。",
        translation: "恭敬对怠慢，吝啬对骄傲，水路远对山路遥。松木的窗对竹子的栏，咏雪的赋对民间的歌谣。骑着五匹马拉的车，一箭射穿两只雕，蜡烛熄灭对香火燃尽。明月常常亮整夜，骤雨不会下一早晨。楼阁上天凉风飒飒，关河上地远雨潇潇。几只白鹭，天黑时常飞到红蓼岸边；一对紫鸳鸯，春天早晨常游过绿杨桥。开放对凋落，昏暗对明亮，赵国的瑟对虞舜的韶乐。轻便的轺车对驿站的快马，锦绣对美玉。羞于挥臂逞强，懒于弯腰屈从，范丹的饭甑对颜回的竹瓢。寒冷的天气在鸳鸯帐里喝酒，夜月下在凤凰台上吹箫。舞女的腰肢像杨柳一样柔软，佳人的容貌像海棠一样娇美。豪客寻春，南边的小路上青草飘香一阵阵；闲人避暑，东边的堂前芭蕉绿影摇曳。班固对司马迁，董仲舒对晁错，夏天的白昼对春天的夜晚。雷声对闪电，麦穗对禾苗。八千里路，二十四桥，扎着总角的孩童对垂着短发的幼儿。带露的桃花匀着嫩嫩的脸，迎风的柳枝舞着细细的腰。贾谊作赋伤感鵩鸟飞来，周公作诗借鸱鸮表明心迹。幽静的寺院里寻访僧人，兴致不知不觉就散了；长亭外送别客人，离愁不知不觉就浓了。",
      }
      ],
    },
    {
      title: "三 肴 · 车万育",
      art: "primer-scroll",
      artPrompt: "《声律启蒙》三 肴韵插画：对联里的山水花鸟，古风贴纸绘本",
      blocks: [
      {
        kind: 'poem',
        text: "风对雅，象对爻，巨蟒对长蛟。天文对地理，蟋蟀对螵蛸。龙生矫，虎咆哮，北学对东胶。筑台须垒土，成屋必诛茅。潘岳不忘秋兴赋，边韶常被昼眠嘲。抚养群黎，已见国家隆治；滋生万物，方知天地泰交。\n蛇对虺，蜃对蛟，麟薮对鹊巢。风声对月色，麦穗对桑苞。何妥难，子云嘲，楚甸对商郊。五音惟耳听，万虑在心包。葛被汤征因仇饷，楚遭齐伐责包茅。高矣若天，洵是圣人大道；淡而如水，实为君子神交。\n牛对马，犬对猫，旨酒对嘉肴。桃红对柳绿，竹叶对松梢，藜杖叟，布衣樵，北野对东郊。白驹形皎皎，黄鸟语交交。花圃春残无客到，柴门夜永有僧敲。墙畔佳人，飘扬竞把秋千舞；楼前公子，笑语争将蹴踘抛。",
        pinyin: "fēng duì yǎ， xiàng duì yáo， jù mǎng duì cháng jiāo。 tiān wén duì dì lǐ， xī shuài duì piāo shāo。 lóng shēng jiǎo， hǔ páo xiào， běi xué duì dōng jiāo。 zhù tái xū lěi tǔ， chéng wū bì zhū máo。 pān yuè bù wàng qiū xīng fù， biān sháo cháng bèi zhòu mián cháo。 fǔ yǎng qún lí， yǐ jiàn guó jiā lóng zhì； zī shēng wàn wù， fāng zhī tiān dì tài jiāo。\nshé duì huī， shèn duì jiāo， lín sǒu duì què cháo。 fēng shēng duì yuè sè， mài suì duì sāng bāo。 hé tuǒ nán， zǐ yún cháo， chǔ diàn duì shāng jiāo。 wǔ yīn wéi ěr tīng， wàn lǜ zài xīn bāo。 gě bèi tāng zhēng yīn chóu xiǎng， chǔ zāo qí fá zé bāo máo。 gāo yǐ ruò tiān， xún shì shèng rén dà dào； dàn ér rú shuǐ， shí wèi jūn zǐ shén jiāo。\nniú duì mǎ， quǎn duì māo， zhǐ jiǔ duì jiā yáo。 táo hóng duì liǔ lǜ， zhú yè duì sōng shāo， lí zhàng sǒu， bù yī qiáo， běi yě duì dōng jiāo。 bái jū xíng jiǎo jiǎo， huáng niǎo yǔ jiāo jiāo。 huā pǔ chūn cán wú kè dào， chái mén yè yǒng yǒu sēng qiāo。 qiáng pàn jiā rén， piāo yáng jìng bǎ qiū qiān wǔ； lóu qián gōng zǐ， xiào yǔ zhēng jiāng cù jū pāo。",
        translation: "《诗经》的风对雅，卦象对爻辞，大蟒对长蛟。天文对地理，蟋蟀对螵蛸。小龙腾跃，老虎咆哮，北方的学宫对东面的学校。筑高台要一层层垒土，盖房子要先割除茅草。潘岳不忘写《秋兴赋》，边韶常被学生嘲笑白天打盹。安抚天下的百姓，就能看到国家兴旺太平；让万物生长繁衍，才知道天地安泰交融。蛇对虺蛇，海市蜃楼对蛟龙，麒麟聚集的原野对喜鹊筑巢的树。风声对月色，麦穗对桑葚。何妥善于设问辩难，扬雄爱写文章嘲讽，楚地的原野对商朝的郊野。五音要靠耳朵听，万般思虑都包在心里。葛伯不祭祀、抢夺饭食，被商汤征讨；楚国不进贡包茅，遭齐国问罪讨伐。高得像天一样，那真是圣人伟大的道理；淡得像白水一样，那才是君子真诚的交情。牛对马，狗对猫，美酒对好菜。桃花红对柳叶绿，竹叶对松针。拄着藜杖的老人，穿布衣的樵夫，北边的野地对东边的郊外。白色小马毛色亮亮的，黄色小鸟叫声交交。花圃里春色将尽没有客人来，柴门边深夜里有僧人轻轻敲门。墙边的佳人欢欢喜喜荡着秋千，楼前的公子说说笑笑抢着踢球。",
      }
      ],
    },
    {
      title: "四 豪 · 车万育",
      art: "primer-scroll",
      artPrompt: "《声律启蒙》四 豪韵插画：对联里的山水花鸟，古风贴纸绘本",
      blocks: [
      {
        kind: 'poem',
        text: "琴对瑟，剑对刀，地迥对天高。峨冠对博带，紫绶对绯袍。煎异茗，酌香醪，虎兕对猿猱。武夫攻骑射，野妇务蚕缫。秋雨一川淇澳竹，春风两岸武陵桃。螺髻青浓，楼外晚山千仞；鸭头绿腻，溪中春水半篙。\n刑对赏，贬对褒，破斧对征袍。梧桐对橘柚，枳棘对蓬蒿。雷焕剑，吕虔刀，橄榄对葡萄。一椽书舍小，百尺酒楼高。李白能诗时秉笔，刘伶爱酒每馎糟。礼别尊卑，拱北众星常灿灿；势分高下，朝东万水自滔滔。\n瓜对果，李对桃，犬子对羊羔。春分对夏至，谷水对山涛。双凤翼，九牛毛，主逸对臣劳。水流无限阔，山耸有余高。雨打村童新牧笠，尘生边将旧征袍。俊士居官，荣引鹓鸿之序；忠臣报国，誓殚犬马之劳。",
        pinyin: "qín duì sè， jiàn duì dāo， dì jiǒng duì tiān gāo。 é guān duì bó dài， zǐ shòu duì fēi páo。 jiān yì míng， zhuó xiāng láo， hǔ sì duì yuán náo。 wǔ fū gōng qí shè， yě fù wù cán sāo。 qiū yǔ yī chuān qí ào zhú， chūn fēng liǎng àn wǔ líng táo。 luó jì qīng nóng， lóu wài wǎn shān qiān rèn； yā tóu lǜ nì， xī zhōng chūn shuǐ bàn gāo。\nxíng duì shǎng， biǎn duì bāo， pò fǔ duì zhēng páo。 wú tóng duì jú yòu， zhǐ jí duì péng hāo。 léi huàn jiàn， lǚ qián dāo， gǎn lǎn duì pú táo。 yī chuán shū shè xiǎo， bǎi chǐ jiǔ lóu gāo。 lǐ bái néng shī shí bǐng bǐ， liú líng ài jiǔ měi bó zāo。 lǐ bié zūn bēi， gǒng běi zhòng xīng cháng càn càn； shì fēn gāo xià， cháo dōng wàn shuǐ zì tāo tāo。\nguā duì guǒ， lǐ duì táo， quǎn zǐ duì yáng gāo。 chūn fēn duì xià zhì， gǔ shuǐ duì shān tāo。 shuāng fèng yì， jiǔ niú máo， zhǔ yì duì chén láo。 shuǐ liú wú xiàn kuò， shān sǒng yǒu yú gāo。 yǔ dǎ cūn tóng xīn mù lì， chén shēng biān jiāng jiù zhēng páo。 jùn shì jū guān， róng yǐn yuān hóng zhī xù； zhōng chén bào guó， shì dān quǎn mǎ zhī láo。",
        translation: "琴对瑟，剑对刀，大地辽远对天空高阔。高高的帽子对宽宽的衣带，紫色的绶带对红色的官袍。煎上品的好茶，斟香醇的美酒，老虎犀牛对猿猴。武人练习骑马射箭，村妇忙着养蚕缫丝。秋雨洒过一川淇水岸的竹子，春风吹开两岸武陵源的桃花。螺壳样的发髻又青又浓，楼外的晚山有千仞高；鸭头样的绿水又浓又亮，溪中的春水涨了半篙深。刑罚对奖赏，贬责对褒扬，破斧对征袍。梧桐对橘柚，荆棘对蓬蒿。雷焕的宝剑，吕虔的宝刀，橄榄对葡萄。一间小书舍很矮小，百尺酒楼很高大。李白会作诗随时拿起笔，刘伶爱喝酒常趴在酒糟边。礼节分清尊卑，众星常常灿烂地拱卫北斗；地势分出高下，万条河水自然滔滔向东流。瓜对果，李对桃，小狗对羊羔。春分对夏至，谷地的水对山中的涛。凤凰的一对翅膀，九牛的一撮毛，主上安逸对臣下辛劳。水流得无限宽阔，山峰耸立格外高。雨点敲打村童新戴的斗笠，尘土落满边将旧了的征袍。才俊之人做官，气派像鹓鸾鸿雁那样排列成行；忠臣报效国家，发誓尽犬马一样的辛劳。",
      }
      ],
    },
    {
      title: "五 歌 · 车万育",
      art: "primer-scroll",
      artPrompt: "《声律启蒙》五 歌韵插画：对联里的山水花鸟，古风贴纸绘本",
      blocks: [
      {
        kind: 'poem',
        text: "山对水，海对河，雪竹对烟萝。新欢对旧恨，痛饮对高歌。琴再抚，剑重磨，媚柳对枯荷。荷盘从雨洗，柳线任风搓。饮酒岂知欹醉帽，观棋不觉烂樵柯。山寺清幽，直踞千寻云岭；江楼宏敞，遥临万顷烟波。\n繁对简，少对多，里咏对途歌。宦情对旅况，银鹿对铜驼。刺史鸭，将军鹅，玉律对金科。古堤垂亸柳，曲沼长新荷。命驾吕因思叔夜，引车蔺为避廉颇。千尺水帘，今古无人能手卷；一轮月镜，乾坤何匠用功磨。\n霜对露，浪对波，径菊对池荷。酒阑对歌罢，日暖对风和。梁父咏，楚狂歌，放鹤对观鹅。史才推永叔，刀笔仰萧何。种橘犹嫌千树少，寄梅谁信一枝多。林下风生，黄发村童推牧笠；江头日出，皓眉溪叟晒渔蓑。",
        pinyin: "shān duì shuǐ， hǎi duì hé， xuě zhú duì yān luó。 xīn huān duì jiù hèn， tòng yǐn duì gāo gē。 qín zài fǔ， jiàn zhòng mó， mèi liǔ duì kū hé。 hé pán cóng yǔ xǐ， liǔ xiàn rèn fēng cuō。 yǐn jiǔ qǐ zhī qī zuì mào， guān qí bù jué làn qiáo kē。 shān sì qīng yōu， zhí jù qiān xún yún lǐng； jiāng lóu hóng chǎng， yáo lín wàn qǐng yān bō。\nfán duì jiǎn， shǎo duì duō， lǐ yǒng duì tú gē。 huàn qíng duì lǚ kuàng， yín lù duì tóng tuó。 cì shǐ yā， jiāng jūn é， yù lǜ duì jīn kē。 gǔ dī chuí duǒ liǔ， qǔ zhǎo cháng xīn hé。 mìng jià lǚ yīn sī shū yè， yǐn chē lìn wèi bì lián pō。 qiān chǐ shuǐ lián， jīn gǔ wú rén néng shǒu juàn； yī lún yuè jìng， qián kūn hé jiàng yòng gōng mó。\nshuāng duì lù， làng duì bō， jìng jú duì chí hé。 jiǔ lán duì gē bà， rì nuǎn duì fēng hé。 liáng fù yǒng， chǔ kuáng gē， fàng hè duì guān é。 shǐ cái tuī yǒng shū， dāo bǐ yǎng xiāo hé。 zhǒng jú yóu xián qiān shù shǎo， jì méi shuí xìn yī zhī duō。 lín xià fēng shēng， huáng fā cūn tóng tuī mù lì； jiāng tóu rì chū， hào méi xī sǒu shài yú suō。",
        translation: "山对水，海对河，雪中的竹对烟中的藤萝。新添的欢喜对旧日的怨恨，痛快畅饮对放声高歌。琴重新弹起，剑重新磨过，柔媚的柳对枯老的荷。荷叶任凭雨水清洗，柳条任凭风儿搓弄。喝酒的人不知不觉帽子都歪了，看下棋的人看得入了迷，连斧柄烂掉都不知道。山里的寺庙清静幽深，高高地踞在千寻云岭上；江边的楼阁高大宽敞，远远地对着万顷烟波。繁多对简单，少对多，里巷的歌咏对路上的欢歌。做官的情怀对旅途的景况，银鹿对铜驼。刺史养的鸭，将军养的鹅，玉做的律对金做的科。古堤上垂着长长的柳条，弯池里长出圆圆的新荷。吕安想念嵇康，立刻命人驾车去看他；蔺相如躲避廉颇，掉转车头让开路。千尺高的水帘，古往今来没人能用手卷起；一轮圆月像镜子，天地间是哪位匠人磨出来的。秋霜对露水，波浪对水波，园径的菊花对池中的荷花。酒喝到席终对歌唱到曲罢，日子暖和对天气和。梁父的吟咏，楚狂人的放歌，放鹤对观鹅。写史的才气推重欧阳修，判案的笔法敬仰萧何。种橘子的人还嫌一千棵太少，寄一枝梅花给朋友谁会嫌多呢。树林间起风了，白发苍苍的村童推着放牧的斗笠；江边日出时，白眉白发的溪翁晒着打渔的蓑衣。",
      }
      ],
    },
    {
      title: "六 麻 · 车万育",
      art: "primer-scroll",
      artPrompt: "《声律启蒙》六 麻韵插画：对联里的山水花鸟，古风贴纸绘本",
      blocks: [
      {
        kind: 'poem',
        text: "松对柏，缕对麻，蚁阵对蜂衙。頳鳞对白鹭，冻雀对昏鸦，白堕酒，碧沉茶，品笛对吹笳。秋凉梧堕叶，春暖杏开花。雨长苔痕侵壁砌，月移梅影上窗纱。飒飒秋风，度城头之筚篥；迟迟晚照，动江上之琵琶。\n优对劣，凸对凹，翠竹对黄花。松杉对杞梓，菽麦对桑麻。山不断，水无涯，煮酒对烹茶。鱼游池面水，鹭立岸头沙。百亩风翻陶令秫，一畦雨熟邵平瓜。闲捧竹根，饮李白一壶之酒；偶擎桐叶，啜卢仝七碗之茶。\n吴对楚，蜀对巴，落日对流霞。酒钱对诗债，柏叶对松花。驰驿骑，泛仙槎，碧玉对丹砂。设桥偏送笋，开道竟还瓜。楚国大夫沉汨水，洛阳才子谪长沙。书箧琴囊，乃士流活计；药炉茶鼎，实闲客生涯。",
        pinyin: "sōng duì bǎi， lǚ duì má， yǐ zhèn duì fēng yá。 chēng lín duì bái lù， dòng què duì hūn yā， bái duò jiǔ， bì chén chá， pǐn dí duì chuī jiā。 qiū liáng wú duò yè， chūn nuǎn xìng kāi huā。 yǔ cháng tái hén qīn bì qì， yuè yí méi yǐng shàng chuāng shā。 sà sà qiū fēng， dù chéng tóu zhī bì lì； chí chí wǎn zhào， dòng jiāng shàng zhī pí pa。\nyōu duì liè， tū duì āo， cuì zhú duì huáng huā。 sōng shān duì qǐ zǐ， shū mài duì sāng má。 shān bù duàn， shuǐ wú yá， zhǔ jiǔ duì pēng chá。 yú yóu chí miàn shuǐ， lù lì àn tóu shā。 bǎi mǔ fēng fān táo lìng shú， yī qí yǔ shú shào píng guā。 xián pěng zhú gēn， yǐn lǐ bái yī hú zhī jiǔ； ǒu qíng tóng yè， chuò lú tóng qī wǎn zhī chá。\nwú duì chǔ， shǔ duì bā， luò rì duì liú xiá。 jiǔ qián duì shī zhài， bǎi yè duì sōng huā。 chí yì qí， fàn xiān chá， bì yù duì dān shā。 shè qiáo piān sòng sǔn， kāi dào jìng hái guā。 chǔ guó dài fu chén mì shuǐ， luò yáng cái zǐ zhé cháng shā。 shū qiè qín náng， nǎi shì liú huó jì； yào lú chá dǐng， shí xián kè shēng yá。",
        translation: "松对柏，丝缕对麻线，蚂蚁排队对蜜蜂朝王。红色的鱼鳞对白鹭的羽毛，受冻的麻雀对黄昏的乌鸦。白堕是美酒，碧沉是好茶，细细品笛对悠悠吹笳。秋天凉了梧桐落下叶子，春天暖了杏树开出花朵。雨水把青苔长上了墙壁台阶，月光把梅影移上了窗纱。飒飒的秋风，吹送城头的筚篥声；迟迟的晚照，牵动江上的琵琶声。优对劣，凸对凹，翠竹对黄花。松树杉树对杞树梓树，豆麦对桑麻。山连绵不断，水无边无涯，煮酒对烹茶。鱼在池面上游，鹭在沙滩上站。百亩田里风吹动陶渊明种的高粱，一畦地里雨浇熟邵平种的瓜。闲来捧起竹根杯，喝李白那样的一壶酒；偶尔端起桐叶盏，品卢仝那样的七碗茶。吴地对楚地，蜀地对巴地，落日对晚霞。酒钱对诗债，柏叶对松花。骑着驿马奔驰，乘着仙筏漂游，碧玉对丹砂。造桥的人有人送来鲜笋，让路的人最后有人还回甜瓜。楚国的三闾大夫屈原沉入汨罗江，洛阳的才子贾谊被贬谪到长沙。书箱和琴袋，是读书人的家当；药炉和茶鼎，真是闲人的生涯。",
      }
      ],
    },
    {
      title: "七 阳 · 车万育",
      art: "primer-scroll",
      artPrompt: "《声律启蒙》七 阳韵插画：对联里的山水花鸟，古风贴纸绘本",
      blocks: [
      {
        kind: 'poem',
        text: "高对下，短对长，柳影对花香。词人对赋客，五帝对三王。深院落，小池塘，晚眺对晨妆。绛霄唐帝殿，绿野晋公堂。寒集谢庄衣上雪，秋添潘岳鬓边霜。人浴兰汤，事不忘于端午；客斟菊酒，兴常记于重阳。\n尧对舜，禹对汤，晋宋对隋唐。奇花对异卉，夏日对秋霜。八叉手，九回肠，地久对天长。一堤杨柳绿，三径菊花黄。闻鼓塞兵方战斗，听钟宫女正梳妆。春饮方归，纱帽半淹邻舍酒；早朝初退，衮衣微惹御炉香。\n荀对孟，老对庄，亸柳对垂杨。仙宫对梵宇，小阁对长廊。风月窟，水云乡，蟋蟀对螳螂。暖烟香霭霭，寒烛影煌煌。伍子欲酬渔父剑，韩生尝窃贾公香。三月韶光，常忆花明柳媚；一年好景，难忘橘绿橙黄。",
        pinyin: "gāo duì xià， duǎn duì cháng， liǔ yǐng duì huā xiāng。 cí rén duì fù kè， wǔ dì duì sān wáng。 shēn yuàn luò， xiǎo chí táng， wǎn tiào duì chén zhuāng。 jiàng xiāo táng dì diàn， lǜ yě jìn gōng táng。 hán jí xiè zhuāng yī shàng xuě， qiū tiān pān yuè bìn biān shuāng。 rén yù lán tāng， shì bù wàng yú duān wǔ； kè zhēn jú jiǔ， xīng cháng jì yú chóng yáng。\nyáo duì shùn， yǔ duì tāng， jìn sòng duì suí táng。 qí huā duì yì huì， xià rì duì qiū shuāng。 bā chā shǒu， jiǔ huí cháng， dì jiǔ duì tiān cháng。 yī dī yáng liǔ lǜ， sān jìng jú huā huáng。 wén gǔ sāi bīng fāng zhàn dòu， tīng zhōng gōng nǚ zhèng shū zhuāng。 chūn yǐn fāng guī， shā mào bàn yān lín shè jiǔ； zǎo cháo chū tuì， gǔn yī wēi rě yù lú xiāng。\nxún duì mèng， lǎo duì zhuāng， duǒ liǔ duì chuí yáng。 xiān gōng duì fàn yǔ， xiǎo gé duì cháng láng。 fēng yuè kū， shuǐ yún xiāng， xī shuài duì táng láng。 nuǎn yān xiāng ǎi ǎi， hán zhú yǐng huáng huáng。 wǔ zǐ yù chóu yú fù jiàn， hán shēng cháng qiè jiǎ gōng xiāng。 sān yuè sháo guāng， cháng yì huā míng liǔ mèi； yī nián hǎo jǐng， nán wàng jú lǜ chéng huáng。",
        translation: "高对下，短对长，柳影对花香。写词的人对作赋的客，五帝对三王。深深的院落，小小的池塘，傍晚远望对清晨梳妆。绛霄殿是唐朝天子的宫殿，绿野堂是晋公的厅堂。谢庄的衣上落满寒雪，潘岳的鬓边添了秋霜。人们用兰草汤沐浴，总记得那是端午节；客人斟上菊花酒，兴致总让人想起重阳节。尧对舜，禹对汤，晋朝宋朝对隋朝唐朝。奇花对异草，夏天的烈日对秋天的寒霜。八叉手便成一诗，愁肠九曲，地久对天长。一堤的杨柳绿，满径的菊花黄。听见战鼓，边塞的士兵正在战斗；听见钟声，宫中的女子正在梳妆。春天喝酒才回家，纱帽半截泡在邻家的酒瓮里；早朝刚退下，礼服上微微沾着御炉的香气。荀子对孟子，老子对庄子，低垂的柳对飘荡的杨。仙家的宫对佛家的寺，小小的阁对长长的廊。风月窟，水云乡，蟋蟀对螳螂。暖暖的炊烟香雾弥漫，寒夜的烛影明明亮亮。伍子胥想拿剑报答渔父的恩情，韩寿偷来了贾充家的奇香。三月的美好时光，常让人记起花开柳绿；一年的好景致，最难忘橘儿绿橙儿黄。",
      }
      ],
    },
    {
      title: "八 庚 · 车万育",
      art: "primer-scroll",
      artPrompt: "《声律启蒙》八 庚韵插画：对联里的山水花鸟，古风贴纸绘本",
      blocks: [
      {
        kind: 'poem',
        text: "深对浅，重对轻，有影对无声。蜂腰对蝶翅，宿醉对余酲。天北缺，日东生，独卧对同行。寒冰三尺厚，秋月十分明。万卷书容闲客览，一樽酒待故人倾。心侈唐玄，厌看霓裳之曲；意骄陈主，饱闻玉树之赓。\n虚对实，送对迎，后甲对先庚。鼓琴对舍瑟，搏虎对骑鲸。金匼匝，玉瑽琤，玉宇对金茎。花间双粉蝶，柳内几黄莺。贫里每甘藜藿味，醉中厌听管弦声。肠断秋闺，凉吹已侵重被冷；梦惊晓枕，残蟾犹照半窗明。\n渔对猎，钓对耕，玉振对金声。雉城对雁塞，柳袅对葵倾。吹玉笛，弄银笙，阮杖对桓筝。墨呼松处士，纸号楮先生。露浥好花潘岳县，风搓细柳亚夫营。抚动琴弦，遽觉座中风雨至；哦成诗句，应知窗外鬼神惊。",
        pinyin: "shēn duì qiǎn， zhòng duì qīng， yǒu yǐng duì wú shēng。 fēng yāo duì dié chì， sù zuì duì yú chéng。 tiān běi quē， rì dōng shēng， dú wò duì tóng háng。 hán bīng sān chǐ hòu， qiū yuè shí fēn míng。 wàn juàn shū róng xián kè lǎn， yī zūn jiǔ dài gù rén qīng。 xīn chǐ táng xuán， yàn kàn ní cháng zhī qǔ； yì jiāo chén zhǔ， bǎo wén yù shù zhī gēng。\nxū duì shí， sòng duì yíng， hòu jiǎ duì xiān gēng。 gǔ qín duì shè sè， bó hǔ duì qí jīng。 jīn kē zā， yù cōng chēng， yù yǔ duì jīn jīng。 huā jiān shuāng fěn dié， liǔ nèi jǐ huáng yīng。 pín lǐ měi gān lí huò wèi， zuì zhōng yàn tīng guǎn xián shēng。 cháng duàn qiū guī， liáng chuī yǐ qīn zhòng bèi lěng； mèng jīng xiǎo zhěn， cán chán yóu zhào bàn chuāng míng。\nyú duì liè， diào duì gēng， yù zhèn duì jīn shēng。 zhì chéng duì yàn sāi， liǔ niǎo duì kuí qīng。 chuī yù dí， nòng yín shēng， ruǎn zhàng duì huán zhēng。 mò hū sōng chǔ shì， zhǐ hào chǔ xiān shēng。 lù yì hǎo huā pān yuè xiàn， fēng cuō xì liǔ yà fū yíng。 fǔ dòng qín xián， jù jué zuò zhòng fēng yǔ zhì； ò chéng shī jù， yìng zhī chuāng wài guǐ shén jīng。",
        translation: "深对浅，重对轻，有影对无声。蜂的细腰对蝶的薄翅，昨夜的醉对残存的酒意。天的西北角缺了，太阳从东边升起，独自躺着对结伴同行。寒冰有三尺厚，秋月有十分明。万卷的书由闲客慢慢浏览，一樽的酒等老朋友来共饮。唐玄宗心意奢靡，看厌了霓裳羽衣的曲子；陈后主意气骄纵，听够了玉树后庭的歌声。虚对实，相送对相迎，后甲对先庚。弹琴对鼓瑟，搏击猛虎对骑鲸入海。金饰灿烂，玉声清脆，玉宇对金茎。花间飞着一双粉蝶，柳里藏着几只黄莺。贫穷时甘心吃野菜豆叶，酒醉后厌烦听管弦之声。秋天的闺房叫人肠断，凉风吹进层层被褥已觉寒冷；拂晓的枕边梦被惊醒，残月还照着半扇窗子透着光明。渔对猎，垂钓对耕种，玉振对金声。雉形的城对雁门的关，柳条轻摆对葵花倾向太阳。吹起玉笛，奏响银笙，阮修的手杖对桓伊的筝。墨叫松处士，纸称楮先生。露水沾湿好花，是潘岳做过县令的河阳县；风吹弯细柳，是周亚夫治军严整的细柳营。手指抚动琴弦，立刻觉得座中刮起了风雨；口中吟成诗句，应知窗外的鬼神都感到吃惊。",
      }
      ],
    },
    {
      title: "九 青 · 车万育",
      art: "primer-scroll",
      artPrompt: "《声律启蒙》九 青韵插画：对联里的山水花鸟，古风贴纸绘本",
      blocks: [
      {
        kind: 'poem',
        text: "红对紫，白对青，渔火对禅灯。唐诗对汉史，释典对仙经。龟曳尾，鹤梳翎，月榭对风亭。一轮秋夜月，几点晓天星。晋士只知山简醉，楚人谁识屈原醒。绣倦佳人，慵把鸳鸯文作枕；吮毫画者，思将孔雀写为屏。\n行对坐，醉对醒，佩紫对纡青。棋枰对笔架，雨雪对雷霆。狂蛱蝶，小蜻蜓，水岸对沙汀。天台孙绰赋，剑阁孟阳铭。传信子卿千里雁，照书车胤一囊萤。冉冉白云，夜半高遮千里月；澄澄碧水，宵中寒映一天星。\n书对史，传对经，鹦鹉对鹡鸰。黄茅对白荻，绿草对青萍。风绕铎，雨淋铃，水阁对山亭。渚莲千朵白，岸柳两行青。汉代宫中生秀柞，尧时阶畔长祥蓂。一枰决胜，棋子分黑白；半幅通灵，画色间丹青。",
        pinyin: "hóng duì zǐ， bái duì qīng， yú huǒ duì chán dēng。 táng shī duì hàn shǐ， shì diǎn duì xiān jīng。 guī yè wěi， hè shū líng， yuè xiè duì fēng tíng。 yī lún qiū yè yuè， jǐ diǎn xiǎo tiān xīng。 jìn shì zhī zhī shān jiǎn zuì， chǔ rén shuí shí qū yuán xǐng。 xiù juàn jiā rén， yōng bǎ yuān yāng wén zuò zhěn； shǔn háo huà zhě， sī jiāng kǒng què xiě wèi píng。\nxíng duì zuò， zuì duì xǐng， pèi zǐ duì yū qīng。 qí píng duì bǐ jià， yǔ xuě duì léi tíng。 kuáng jiá dié， xiǎo qīng tíng， shuǐ àn duì shā tīng。 tiān tái sūn chuò fù， jiàn gé mèng yáng míng。 chuán xìn zǐ qīng qiān lǐ yàn， zhào shū chē yìn yī náng yíng。 rǎn rǎn bái yún， yè bàn gāo zhē qiān lǐ yuè； chéng chéng bì shuǐ， xiāo zhōng hán yìng yī tiān xīng。\nshū duì shǐ， chuán duì jīng， yīng wǔ duì jí líng。 huáng máo duì bái dí， lǜ cǎo duì qīng píng。 fēng rào duó， yǔ lín líng， shuǐ gé duì shān tíng。 zhǔ lián qiān duǒ bái， àn liǔ liǎng háng qīng。 hàn dài gōng zhōng shēng xiù zhà， yáo shí jiē pàn cháng xiáng mì。 yī píng jué shèng， qí zǐ fēn hēi bái； bàn fú tōng líng， huà sè jiān dān qīng。",
        translation: "红色对紫色，白色对青色，渔家的灯火对佛前的禅灯。唐诗对汉史，佛家的典籍对道家的经书。老龟拖着尾巴爬行，白鹤梳理着羽毛，月亮下的台榭对清风中的亭子。一轮秋夜的明月，几点破晓的星星。晋朝人只知道山简喝得酩酊大醉，楚国人谁能理解屈原偏偏独自清醒。绣花的佳人绣倦了，懒地把鸳鸯绣成枕头；提笔的画师构思着，想把孔雀画上屏风。行走对端坐，酒醉对清醒，佩紫色的绶对系青色的印。棋盘对笔架，雨雪对雷霆。狂舞的蝴蝶，小小的蜻蜓，水边对沙洲。天台山有孙绰作的赋，剑阁有孟阳写的铭。传信的大雁替苏武飞越千里，装在囊里的萤火虫照亮车胤的书。慢慢飘动的白云，半夜里高高遮住千里的月光；清清澄澈的碧水，深夜里寒冷地映照满天星辰。书对史，传记对经书，鹦鹉对鹡鸰。黄茅对白荻，绿草对青萍。风绕着檐铃转，雨打着雨铃响，水上的阁对山中的亭。水洲的莲花开千朵白，岸边的柳树两行青。汉代宫中长出吉祥的柞树，尧帝阶前长出祥瑞的蓂荚。一局棋决出胜负，棋子分成黑和白；半幅画灵动传神，颜色用丹砂和石青。",
      }
      ],
    },
    {
      title: "十 蒸 · 车万育",
      art: "primer-scroll",
      artPrompt: "《声律启蒙》十 蒸韵插画：对联里的山水花鸟，古风贴纸绘本",
      blocks: [
      {
        kind: 'poem',
        text: "新对旧，降对升，白犬对苍鹰。葛巾对藜杖，涧水对池冰。张兔网，挂鱼罾，燕雀对鹍鹏。炉中煎药火，窗下读书灯。织锦逐梭成舞凤，画屏误笔作飞蝇。宴客刘公，座上满斟三雅爵；迎仙汉帝，宫中高插九光灯。\n儒对士，佛对僧，面友对心朋。春残对夏老，夜寝对晨兴。千里马，九霄鹏，霞蔚对云蒸。寒堆阴岭雪，春泮水池冰。亚父愤生撞玉斗，周公誓死作金縢。将军元晖，莫怪人讥为饿虎；侍中卢昶，难逃世号作饥鹰。\n规对矩，墨对绳，独步对同登。吟哦对讽咏，访友对寻僧。风绕屋，水襄陵，紫鹄对苍鹰。鸟寒惊夜月，鱼暖上春冰。扬子口中飞白凤，何郎鼻上集青蝇。巨鲤跃池，翻几重之密藻；颠猿饮涧，挂百尺之垂藤。",
        pinyin: "xīn duì jiù， jiàng duì shēng， bái quǎn duì cāng yīng。 gě jīn duì lí zhàng， jiàn shuǐ duì chí bīng。 zhāng tù wǎng， guà yú zēng， yàn què duì kūn péng。 lú zhōng jiān yào huǒ， chuāng xià dú shū dēng。 zhī jǐn zhú suō chéng wǔ fèng， huà píng wù bǐ zuò fēi yíng。 yàn kè liú gōng， zuò shàng mǎn zhēn sān yǎ jué； yíng xiān hàn dì， gōng zhōng gāo chā jiǔ guāng dēng。\nrú duì shì， fó duì sēng， miàn yǒu duì xīn péng。 chūn cán duì xià lǎo， yè qǐn duì chén xīng。 qiān lǐ mǎ， jiǔ xiāo péng， xiá wèi duì yún zhēng。 hán duī yīn lǐng xuě， chūn pàn shuǐ chí bīng。 yà fù fèn shēng zhuàng yù dòu， zhōu gōng shì sǐ zuò jīn téng。 jiāng jūn yuán huī， mò guài rén jī wèi è hǔ； shì zhōng lú chǎng， nán táo shì hào zuò jī yīng。\nguī duì jǔ， mò duì shéng， dú bù duì tóng dēng。 yín é duì fěng yǒng， fǎng yǒu duì xún sēng。 fēng rào wū， shuǐ xiāng líng， zǐ hú duì cāng yīng。 niǎo hán jīng yè yuè， yú nuǎn shàng chūn bīng。 yáng zǐ kǒu zhōng fēi bái fèng， hé láng bí shàng jí qīng yíng。 jù lǐ yuè chí， fān jǐ chóng zhī mì zǎo； diān yuán yǐn jiàn， guà bǎi chǐ zhī chuí téng。",
        translation: "新对旧，下降对上升，白狗对苍鹰。葛布的头巾对藜木的手杖，山涧的水对池面的冰。张起捕兔的网，挂上捞鱼的罾，小小的燕雀对巨大的鲲鹏。炉子里煎药的火，窗子下读书的灯。织锦随梭子织出飞舞的凤凰，画屏上误落的笔点成了苍蝇。刘公宴请客人，座上斟满三雅大杯；汉武帝迎接仙人，宫中高插九光灯。读书人对志士，佛家的和尚对寺里的僧人，表面相好的朋友对知心的朋友。春天将残对夏天将老，夜里安睡对清晨早起。日行千里的骏马，飞上九霄的大鹏，云霞灿烂对云气升腾。寒冷在阴岭上堆成雪，春天在水池边化成冰。亚父范增气得撞碎玉斗，周公对天立誓藏起金縢之册。将军元晖，别怪人们讥笑他是饿虎；侍中卢昶，难逃世人叫他做饥鹰。圆规对曲尺，墨斗对绳线，独自领先对一同登高。低声吟哦对高声诵读，拜访朋友对寻访僧人。风绕着屋子吹，水漫过山陵涨，紫色的天鹅对苍色的雄鹰。鸟儿在寒夜里惊望明月，鱼儿在暖水里寻找春冰。扬雄的文章好，口中像飞出白凤；何晏貌美爱修饰，鼻上像集了青蝇。巨大的鲤鱼跃出池塘，翻起几重密密的绿藻；山巅的猿猴下山饮水，挂在百尺长的垂藤上。",
      }
      ],
    },
    {
      title: "十一 尤 · 车万育",
      art: "primer-scroll",
      artPrompt: "《声律启蒙》十一 尤韵插画：对联里的山水花鸟，古风贴纸绘本",
      blocks: [
      {
        kind: 'poem',
        text: "荣对辱，喜对忧，夜宴对春游。燕关对楚水，蜀犬对吴牛。茶敌睡，酒消愁，青眼对白头。马迁修史记，孔子作春秋。适兴子猷常泛棹，思归王粲强登楼。窗下佳人，妆罢重将金插鬓；筵前舞妓，曲终还要锦缠头。\n唇对齿，角对头，策马对骑牛。毫尖对笔底，绮阁对雕镂。杨柳岸，荻芦洲，语燕对啼鸠。客乘金络马，人泛木兰舟。绿野耕夫春举耜，碧池渔父晚垂钩。波浪千层，喜见蛟龙得水；云霄万里，惊看雕鹗横秋。\n庵对寺，殿对楼，酒艇对渔舟。金龙对彩凤，豮豕对童牛。王郎帽，苏子裘，四季对三秋。峰峦扶地秀，江汉接天流。一湾绿水渔村小，万里青山佛寺幽。龙马呈河，羲皇阐微而画卦；神龟出洛，禹王取法以陈畴。",
        pinyin: "róng duì rǔ， xǐ duì yōu， yè yàn duì chūn yóu。 yàn guān duì chǔ shuǐ， shǔ quǎn duì wú niú。 chá dí shuì， jiǔ xiāo chóu， qīng yǎn duì bái tóu。 mǎ qiān xiū shǐ jì， kǒng zǐ zuò chūn qiū。 shì xīng zǐ yóu cháng fàn zhào， sī guī wáng càn qiáng dēng lóu。 chuāng xià jiā rén， zhuāng bà zhòng jiāng jīn chā bìn； yán qián wǔ jì， qǔ zhōng hái yào jǐn chán tóu。\nchún duì chǐ， jiǎo duì tóu， cè mǎ duì qí niú。 háo jiān duì bǐ dǐ， qǐ gé duì diāo lòu。 yáng liǔ àn， dí lú zhōu， yǔ yàn duì tí jiū。 kè chéng jīn luò mǎ， rén fàn mù lán zhōu。 lǜ yě gēng fū chūn jǔ sì， bì chí yú fù wǎn chuí gōu。 bō làng qiān céng， xǐ jiàn jiāo lóng dé shuǐ； yún xiāo wàn lǐ， jīng kàn diāo è héng qiū。\nān duì sì， diàn duì lóu， jiǔ tǐng duì yú zhōu。 jīn lóng duì cǎi fèng， fén shǐ duì tóng niú。 wáng láng mào， sū zǐ qiú， sì jì duì sān qiū。 fēng luán fú dì xiù， jiāng hàn jiē tiān liú。 yī wān lǜ shuǐ yú cūn xiǎo， wàn lǐ qīng shān fó sì yōu。 lóng mǎ chéng hé， xī huáng chǎn wēi ér huà guà； shén guī chū luò， yǔ wáng qǔ fǎ yǐ chén chóu。",
        translation: "荣耀对耻辱，欢喜对忧愁，夜里的宴会对春天的郊游。燕地的关隘对楚地的江水，蜀地的狗对吴地的牛。茶能驱赶瞌睡，酒能消解忧愁，青眼看人对白发苍苍。司马迁编著《史记》，孔子写作《春秋》。兴致来了，王子猷常常驾着小船出游；思念故乡，王粲强打精神登上高楼。窗下的佳人，梳妆完了又把金钗插上鬓发；筵前的舞女，曲子跳完了还要主人赏缠头的锦缎。唇对齿，角对头，策马对骑牛。笔尖对笔下，绮丽的楼阁对雕花的门户。杨柳的岸边，荻芦的沙洲，呢喃的燕子对啼叫的斑鸠。客人骑着金络头的骏马，人乘着木兰树的木船。绿野里耕田的农夫春天举起耒耜，碧池边打鱼的渔父傍晚垂下钓钩。波浪翻起千层，高兴地看见蛟龙得了水；云霄高有万里，惊叹地望着雕鹗横飞秋空。小庵对大寺，前殿对高楼，酒船对渔舟。金龙对彩凤，阉过的猪对小牛。王郎的帽子，苏秦的裘衣，四季对三秋。山峰连着大地那样秀美，江水和汉水接着天一样奔流。一湾绿水绕着小小的渔村，万里青山藏着幽深的佛寺。龙马从黄河里献出图，伏羲领悟奥妙画成了八卦；神龟从洛水中背负着书，大禹依据它排列出九畴。",
      }
      ],
    },
    {
      title: "十二 侵 · 车万育",
      art: "primer-scroll",
      artPrompt: "《声律启蒙》十二 侵韵插画：对联里的山水花鸟，古风贴纸绘本",
      blocks: [
      {
        kind: 'poem',
        text: "眉对目，口对心，锦瑟对瑶琴。晓耕对寒钓，晚笛对秋砧。松郁郁，竹森森，闵损对曾参。秦王亲击缶，虞帝自挥琴。三献卞和尝泣玉，四知杨震固辞金。寂寂秋朝，庭叶因霜摧嫩色；沉沉春夜，砌花随月转清阴。\n前对后，古对今，野兽对山禽。犍牛对牝马，水浅对山深。曾点瑟，戴逵琴，璞玉对浑金。艳红花弄色，浓绿柳敷阴。不雨汤王方剪爪，有风楚子正披襟。书生惜壮岁韶华，寸阴尺璧；游子爱良宵光景，一刻千金。\n丝对竹，剑对琴，素志对丹心。千愁对一醉，虎啸对龙吟。子罕玉，不疑金，往古对来今。天寒邹吹律，岁旱傅为霖。渠说子规为帝魄，侬知孔雀是家禽。屈子沉江，处处舟中争系粽；牛郎渡渚，家家台上竞穿针。",
        pinyin: "méi duì mù， kǒu duì xīn， jǐn sè duì yáo qín。 xiǎo gēng duì hán diào， wǎn dí duì qiū zhēn。 sōng yù yù， zhú sēn sēn， mǐn sǔn duì céng cān。 qín wáng qīn jī fǒu， yú dì zì huī qín。 sān xiàn biàn hé cháng qì yù， sì zhī yáng zhèn gù cí jīn。 jì jì qiū cháo， tíng yè yīn shuāng cuī nèn sè； chén chén chūn yè， qì huā suí yuè zhuǎn qīng yīn。\nqián duì hòu， gǔ duì jīn， yě shòu duì shān qín。 jiān niú duì pìn mǎ， shuǐ qiǎn duì shān shēn。 céng diǎn sè， dài kuí qín， pú yù duì hún jīn。 yàn hóng huā nòng sè， nóng lǜ liǔ fū yīn。 bù yǔ tāng wáng fāng jiǎn zhuǎ， yǒu fēng chǔ zǐ zhèng pī jīn。 shū shēng xī zhuàng suì sháo huá， cùn yīn chǐ bì； yóu zǐ ài liáng xiāo guāng jǐng， yī kè qiān jīn。\nsī duì zhú， jiàn duì qín， sù zhì duì dān xīn。 qiān chóu duì yī zuì， hǔ xiào duì lóng yín。 zǐ hǎn yù， bù yí jīn， wǎng gǔ duì lái jīn。 tiān hán zōu chuī lǜ， suì hàn fù wèi lín。 qú shuō zǐ guī wèi dì pò， nóng zhī kǒng què shì jiā qín。 qū zǐ chén jiāng， chù chù zhōu zhōng zhēng xì zòng； niú láng dù zhǔ， jiā jiā tái shàng jìng chuān zhēn。",
        translation: "眉毛对眼睛，口对心，锦瑟对瑶琴。清晨耕田对寒江垂钓，晚上的笛声对秋天捣衣。松树郁郁葱葱，竹林密密层层，闵损对曾参都是孝子。秦王亲自敲瓦缶，虞舜亲自弹五弦琴。三次献玉的卞和曾抱着玉石痛哭，深夜送金的杨震坚决地不收。寂静的秋天早晨，庭前的树叶被霜摧落了嫩绿；沉沉的春夜，台阶下的花随着月亮转动出清阴。前面对后面，古代对今天，野兽对山禽。壮实的公牛对母马，水浅对山深。曾点弹瑟，戴逵弹琴，没雕的璞玉对没炼的浑金。红花艳艳显出美色，绿柳浓浓铺开树阴。天不下雨，商汤剪下指甲向神祈雨；风起之时，楚王敞开衣襟迎风。书生爱惜壮年的美好时光，一寸光阴像一尺璧玉；游子留恋良宵的美丽景色，一刻时间值一千两黄金。丝弦对竹管，宝剑对瑶琴，平素的志向对赤诚的心。千种愁对一醉解，猛虎长啸对蛟龙低吟。子罕把不贪当作宝贝，直不疑不辩白买金的误会，遥远的古代对将来的今天。天冷了邹衍吹律管带来暖气回升，天旱了人们盼傅说像甘霖降临。他们说杜鹃是望帝的魂魄变的，我知道孔雀本是我们家的家禽。屈原沉江之后，家家户户的龙舟上争着系粽子；牛郎渡过银河的晚上，家家户户的彩楼上比赛穿针。",
      }
      ],
    },
    {
      title: "十三 覃 · 车万育",
      art: "primer-scroll",
      artPrompt: "《声律启蒙》十三 覃韵插画：对联里的山水花鸟，古风贴纸绘本",
      blocks: [
      {
        kind: 'poem',
        text: "千对百，两对三，地北对天南。佛堂对仙洞，道院对禅庵。山泼黛，水浮蓝，雪岭对云潭。凤飞方翙翙，虎视已眈眈。窗下书生时讽咏，筵前酒客日耽酣。白草满郊，秋日牧征人之马；绿桑盈亩，春时供农妇之蚕。\n将对欲，可对堪，德被对恩覃。权衡对尺度，雪寺对云庵。安邑枣，洞庭柑，不愧对无惭。魏徵能直谏，王衍善清谈。紫梨摘去从山北，丹荔传来自海南。攘鸡非君子所为，但当月一；养狙是山公之智，止用朝三。\n中对外，北对南，贝母对宜男。移山对浚井，谏苦对言甘。千取百，二为三，魏尚对周堪。海门翻夕浪，山市拥晴岚。新缔直投公子纻，旧交犹脱馆人骖。文达淹通，已咏冰兮寒过水；永和博雅，可知青者胜于蓝。",
        pinyin: "qiān duì bǎi， liǎng duì sān， dì běi duì tiān nán。 fó táng duì xiān dòng， dào yuàn duì chán ān。 shān pō dài， shuǐ fú lán， xuě lǐng duì yún tán。 fèng fēi fāng huì huì， hǔ shì yǐ dān dān。 chuāng xià shū shēng shí fěng yǒng， yán qián jiǔ kè rì dān hān。 bái cǎo mǎn jiāo， qiū rì mù zhēng rén zhī mǎ； lǜ sāng yíng mǔ， chūn shí gòng nóng fù zhī cán。\njiāng duì yù， kě duì kān， dé bèi duì ēn qín。 quán héng duì chǐ dù， xuě sì duì yún ān。 ān yì zǎo， dòng tíng gān， bù kuì duì wú cán。 wèi zhǐ néng zhí jiàn， wáng yǎn shàn qīng tán。 zǐ lí zhāi qù cóng shān běi， dān lì chuán lái zì hǎi nán。 rǎng jī fēi jūn zǐ suǒ wèi， dàn dāng yuè yī； yǎng jū shì shān gōng zhī zhì， zhǐ yòng cháo sān。\nzhōng duì wài， běi duì nán， bèi mǔ duì yí nán。 yí shān duì jùn jǐng， jiàn kǔ duì yán gān。 qiān qǔ bǎi， èr wèi sān， wèi shàng duì zhōu kān。 hǎi mén fān xī làng， shān shì yōng qíng lán。 xīn dì zhí tóu gōng zǐ zhù， jiù jiāo yóu tuō guǎn rén cān。 wén dá yān tōng， yǐ yǒng bīng xī hán guò shuǐ； yǒng hé bó yǎ， kě zhī qīng zhě shèng yú lán。",
        translation: "一千对一百，两对三，大地的北面对天空的南面。佛家的堂对神仙的洞，道家的院对禅师的庵。山像泼洒的黛色，水像漂浮的蓝色，雪的山岭对云的深潭。凤凰飞翔鸣声悦耳，老虎瞪眼注视凶狠。窗下的书生时时吟诵诗书，筵前的酒客天天纵情畅饮。白草长满郊野，秋日里牧放远行人的马；绿桑长满田亩，春天里供农妇养蚕。将要对想要，可以对能够，恩德广被对恩惠深广。秤和权对尺和度，雪中的寺对云中的庵。安邑的枣子，洞庭的柑橘，问心不愧对毫不羞惭。魏徵能够直言进谏，王衍善于清谈玄理。紫色的梨从山北摘来，红色的荔枝从海南送来。偷鸡不是君子做的事，那就每月只偷一只吧；驯养猴子用养猴人的智巧，早上给三个、晚上给四个。里面对外面，北面对南面，贝母草对宜男草。愚公移山对虞舜浚井，苦苦的劝谏对甜甜的言语。从千中取百，从二算作三，魏尚对周堪。海门翻卷傍晚的浪涛，山城拥聚晴天的雾气。新交的朋友直接赠上纻麻衣，老交情还解下驾车的骖马相送。盖文达学问贯通，已经咏过'冰生于水而寒于水'；李谧博学高雅，可知'青出于蓝而胜于蓝'。",
      }
      ],
    },
    {
      title: "十四 盐 · 车万育",
      art: "primer-scroll",
      artPrompt: "《声律启蒙》十四 盐韵插画：对联里的山水花鸟，古风贴纸绘本",
      blocks: [
      {
        kind: 'poem',
        text: "悲对乐，爱对嫌，玉兔对银蟾。醉侯对诗史，眼底对眉尖。风飁飁，雨绵绵，李苦对瓜甜。画堂施锦帐，酒市舞青帘。横槊赋诗传孟德，引壶酌酒尚陶潜。两曜迭明，日东生而月西出；五行式序，水下润而火上炎。\n如对似，减对添，绣幕对朱帘。探珠对献玉，鹭立对鱼潜。玉屑饭，水晶盐，手剑对腰镰。燕巢依邃阁，蛛网挂虚檐。夺槊至三唐敬德，弈棋第一晋王恬。南浦客归，湛湛春波千顷净；西楼人悄，弯弯夜月一钩纤。\n逢对遇，仰对瞻，市井对闾阎。投簪对结绶，握发对掀髯。张绣幕，卷珠帘，石碏对江淹。宵征方肃肃，夜饮已厌厌。心褊小人长戚戚，礼多君子屡谦谦。美刺殊文，备三百五篇诗咏；吉凶异画，变六十四卦爻占。",
        pinyin: "bēi duì lè， ài duì xián， yù tù duì yín chán。 zuì hóu duì shī shǐ， yǎn dǐ duì méi jiān。 fēng xí xí， yǔ mián mián， lǐ kǔ duì guā tián。 huà táng shī jǐn zhàng， jiǔ shì wǔ qīng lián。 héng shuò fù shī chuán mèng dé， yǐn hú zhuó jiǔ shàng táo qián。 liǎng yào dié míng， rì dōng shēng ér yuè xī chū； wǔ háng shì xù， shuǐ xià rùn ér huǒ shàng yán。\nrú duì sì， jiǎn duì tiān， xiù mù duì zhū lián。 tàn zhū duì xiàn yù， lù lì duì yú qián。 yù xiè fàn， shuǐ jīng yán， shǒu jiàn duì yāo lián。 yàn cháo yī suì gé， zhū wǎng guà xū yán。 duó shuò zhì sān táng jìng dé， yì qí dì yī jìn wáng tián。 nán pǔ kè guī， zhàn zhàn chūn bō qiān qǐng jìng； xī lóu rén qiāo， wān wān yè yuè yī gōu xiān。\nféng duì yù， yǎng duì zhān， shì jǐng duì lǘ yán。 tóu zān duì jié shòu， wò fā duì xiān rán。 zhāng xiù mù， juàn zhū lián， shí què duì jiāng yān。 xiāo zhēng fāng sù sù， yè yǐn yǐ yàn yàn。 xīn biǎn xiǎo rén cháng qī qī， lǐ duō jūn zǐ lǚ qiān qiān。 měi cì shū wén， bèi sān bǎi wǔ piān shī yǒng； jí xiōng yì huà， biàn liù shí sì guà yáo zhàn。",
        translation: "悲伤对快乐，喜爱对嫌弃，玉兔对银蟾。好酒的醉侯对善诗的诗史，眼底对眉尖。风飁飁地吹，雨绵绵地下，李子的苦对瓜儿的甜。画堂里张挂锦缎的帐幕，酒市上飘扬青布的酒帘。横握长矛赋诗的是曹操，提壶饮酒自得的是陶渊明。太阳和月亮轮换着照明，太阳从东边升起月亮向西边落下；五行按次序运转，水向下滋润火向上炎热。相像对相似，减少对增添，绣花的幕对朱红的帘。探取骊龙颔下珠对捧献和氏璧，白鹭站立对鱼儿潜游。玉屑拌的饭，水晶似的盐，手提的剑对腰挂的镰。燕子在深深的楼阁里筑巢，蛛网挂在空空的屋檐下。唐将尉迟敬德三次夺下敌槊，晋人王恬下棋天下第一。南浦的游子回来了，深深的春水千顷洁净；西楼的人安静了，弯弯的夜月像一钩细细的眉。相逢对遇见，仰望对瞻望，市井对里巷。丢掉官簪对系上印绶，握发待客对掀髯大笑。张起绣花的帐幕，卷起珍珠的帘子，石碏对江淹。清早赶路肃肃地响，夜里喝酒厌厌地畅快。心胸狭窄的小人总是忧忧戚戚，彬彬有礼的君子常常谦谦和和。赞美和讽刺用的是不同的文字，《诗经》三百零五篇咏唱都齐备了；吉利和凶险画的是不同的卦象，六十四卦的爻辞都可以占问。",
      }
      ],
    },
    {
      title: "十五 咸 · 车万育",
      art: "primer-scroll",
      artPrompt: "《声律启蒙》十五 咸韵插画：对联里的山水花鸟，古风贴纸绘本",
      blocks: [
      {
        kind: 'poem',
        text: "清对浊，苦对咸，一启对三缄。烟蓑对雨笠，月榜对风帆。莺𪾢睆，燕呢喃，柳杞对松杉。情深悲素扇，泪痛湿青衫。汉室既能分四姓，周朝何用叛三监。破的而探牛心，豪矜王济；竖竿以挂犊鼻，贫笑阮咸。\n能对否，圣对贤，卫瓘对浑瑊。雀罗对鱼网，翠𪩘对苍岩。红罗帐，白布衫，笔格对书函。蕊香蜂竞采，泥软燕争衔。凶孽誓清闻祖逖，王家能义有巫咸。溪叟新居，渔舍清幽临水岸；山僧久隐，梵宫寂寞倚云岩。\n冠对带，帽对衫，议鲠对言谗。行舟对御马，俗弊对民岩。鼠且硕，兔多毚，史册对书缄。塞城闻奏角，江浦认归帆。河水一源形弥弥，泰山万仞势岩岩。郑为武公，赋缁衣而美德；周因巷伯，歌贝锦以伤谗。",
        pinyin: "qīng duì zhuó， kǔ duì xián， yī qǐ duì sān jiān。 yān suō duì yǔ lì， yuè bǎng duì fēng fān。 yīng xiàn huàn， yàn ní nán， liǔ qǐ duì sōng shān。 qíng shēn bēi sù shàn， lèi tòng shī qīng shān。 hàn shì jì néng fēn sì xìng， zhōu cháo hé yòng pàn sān jiān。 pò de ér tàn niú xīn， háo jīn wáng jì； shù gān yǐ guà dú bí， pín xiào ruǎn xián。\nnéng duì fǒu， shèng duì xián， wèi guàn duì hún jiān。 què luó duì yú wǎng， cuì yǎn duì cāng yán。 hóng luó zhàng， bái bù shān， bǐ gé duì shū hán。 ruǐ xiāng fēng jìng cǎi， ní ruǎn yàn zhēng xián。 xiōng niè shì qīng wén zǔ tì， wáng jiā néng yì yǒu wū xián。 xī sǒu xīn jū， yú shè qīng yōu lín shuǐ àn； shān sēng jiǔ yǐn， fàn gōng jì mò yǐ yún yán。\nguān duì dài， mào duì shān， yì gěng duì yán chán。 xíng zhōu duì yù mǎ， sú bì duì mín yán。 shǔ qiě shuò， tù duō chán， shǐ cè duì shū jiān。 sāi chéng wén zòu jiǎo， jiāng pǔ rèn guī fān。 hé shuǐ yī yuán xíng mí mí， tài shān wàn rèn shì yán yán。 zhèng wèi wǔ gōng， fù zī yī ér měi dé； zhōu yīn xiàng bó， gē bèi jǐn yǐ shāng chán。",
        translation: "清水对浊水，苦味对咸味，一开口对三缄其口。烟里的蓑衣对雨中的斗笠，月下的船桨对风里的船帆。黄莺叫得清脆婉转，燕子呢喃细语，柳树和杞树对松树和杉树。深情地悲叹被弃的白扇，伤心地泪水湿了青衫。汉王室既然能分辨四姓的贵贱，周朝为什么还会有三监的叛乱。射中牛心夸耀豪爽的是王济，竖起竹竿挂着犊鼻裤、被笑穷酸的是阮咸。能不能对贤不贤，卫瓘对浑瑊。捉雀的罗网对捕鱼的渔网，翠绿的山峰对苍青的岩壁。红罗做的帐，白布做的衫，笔架对书函。花蕊飘香蜜蜂争着采，春泥松软燕子争着衔。立誓扫清中原妖孽的是祖逖，殷王家里能行忠义的贤臣有巫咸。溪边老人的新居，渔家小屋清清幽幽临着水岸；山中老僧久居隐修，佛寺静静寞寞靠着云岩。帽子对衣带，头巾对衣衫，直言进谏对谗言陷害。行舟对驾马，风俗败坏对百姓困苦。田鼠长得肥大，狡猾的兔子又多，史册对书信。边塞的城头传来号角声，江边的水口认出归来的帆影。黄河只有一个源头，水面浩浩荡荡；泰山高达万仞，山势巍巍峨峨。郑武公治国有德，人们赋《缁衣》歌颂他的美德；周朝的巷伯遭受谗害，人们唱《贝锦》诉说谗言的伤心。",
      }
      ],
    }
  ],
  rights: {
    workTitle: "声律启蒙",
    author: "车万育",
    authorDeathYear: 1715,
    translator: '桃阅读',
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: "https://github.com/chinese-poetry/chinese-poetry",
    note: "通行本全篇；注音与白话译文为平台自撰。",
  },
}
