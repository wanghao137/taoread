import type { PackBook } from '../types'

/**
 * 《童趣诗选·好玩的事》——六首写「小孩子在玩」的古诗，专给幼儿园小朋友。
 * 选诗：胡令能《小儿垂钓》、杨万里《舟过安仁》、杨万里《闲居初夏午睡起》、
 *       杨万里《稚子弄冰》、崔道融《溪居即事》、白居易《观游鱼》。
 * 已避开已收的《咏鹅》《池上》《小池》《宿新市徐公店》《所见》《村居》。
 * 均公版（作者卒年：胡令能约 806、杨万里 1206、崔道融约 907、白居易 846），
 * 通行本逐字核对；全文拼音与白话译文由平台撰写。
 */
export const tongQuPlay: PackBook = {
  id: 'poetry-children2',
  title: '童趣诗选·好玩的事',
  author: '胡令能、杨万里、崔道融、白居易',
  lang: 'zh',
  category: 'poetry',
  ageStage: '3-5',
  intro: '钓鱼的小孩不吭声、伞当帆的小船、敲冰块当锣敲……古时候的小朋友，玩的花样一点不比我们少。',
  coverArt: 'tongqu-play-cover',
  coverArtPrompt: '河边草地上几个古代小孩在玩耍：一个坐着钓鱼，两个在船上撑伞，一个拿冰块敲着听响，柳絮飞舞，暖融融的绘本风',
  coverFrom: '#2E7D32',
  coverTo: '#FFF3C4',
  source: '公版古诗选集，逐字注音',
  chapters: [
    {
      title: '第一课 · 小儿垂钓（胡令能）',
      art: 'tongqu-fishing-boy',
      artPrompt: '一个蓬着头发的小孩坐在河边青苔上学钓鱼，身子藏在草丛里，远远地朝路人摆手不说话',
      blocks: [
        {
          kind: 'poem',
          text: '蓬头稚子学垂纶，侧坐莓苔草映身。路人借问遥招手，怕得鱼惊不应人。',
          pinyin: 'péng tóu zhì zǐ xué chuí lún, cè zuò méi tái cǎo yìng shēn. lù rén jiè wèn yáo zhāo shǒu, pà de yú jīng bù yìng rén.',
          translation: '一个头发乱蓬蓬的小娃娃，坐在河边学钓鱼。他侧着身子坐在青苔上，身边的草把他半个身子都遮住了。过路的人向他问路，他远远地摆摆手，一句话也不答——生怕把鱼吓跑啦。',
        },
        {
          kind: 'note',
          text: '「蓬头」就是头发乱乱的。「垂纶」就是钓鱼，「纶」是钓鱼的线。「莓苔」是青苔。「不应」就是不回答。你钓鱼的时候，别人大声说话你是不是也想捂住他的嘴？',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'tongqu-fishing-boy',
          text: '钓鱼的小娃娃远远摆手，不肯说话。',
        },
      ],
    },
    {
      title: '第二课 · 舟过安仁（杨万里）',
      art: 'tongqu-boat-umbrella',
      artPrompt: '一条小渔船上坐着两个小孩，收了竹篙停了桨，一起撑开一把大伞当帆，船儿自己往前走',
      blocks: [
        {
          kind: 'poem',
          text: '一叶渔船两小童，收篙停棹坐船中。怪生无雨都张伞，不是遮头是使风。',
          pinyin: 'yī yè yú chuán liǎng xiǎo tóng, shōu gāo tíng zhào zuò chuán zhōng. guài shēng wú yǔ dōu zhāng sǎn, bù shì zhē tóu shì shǐ fēng.',
          translation: '一条小小的渔船上，坐着两个小孩子。他们把撑船的竹篙收起来，把划水的桨也停下，坐在船当中。怪了——又没下雨，他俩怎么把伞撑开了？原来不是用伞遮脑袋，是用伞兜着风，让风推着船走呀！',
        },
        {
          kind: 'note',
          text: '「篙」是撑船用的长竹竿。「棹」是划水用的桨。「怪生」是「怪不得」「真奇怪」的意思。「使风」就是利用风。这两个小孩多聪明——把伞当成了船帆！',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'tongqu-boat-umbrella',
          text: '两个小孩在船上撑开伞，用风推船走。',
        },
      ],
    },
    {
      title: '第三课 · 闲居初夏午睡起（杨万里）',
      art: 'tongqu-plum-window',
      artPrompt: '初夏午后，窗纱映着芭蕉的绿影子，诗人刚睡醒倚在窗边，几个小孩在院子里追扑柳絮，梅子青青',
      blocks: [
        {
          kind: 'poem',
          text: '梅子留酸软齿牙，芭蕉分绿与窗纱。日长睡起无情思，闲看儿童捉柳花。',
          pinyin: 'méi zi liú suān ruǎn chǐ yá, bā jiāo fēn lǜ yǔ chuāng shā. rì cháng shuì qǐ wú qíng sī, xián kàn ér tóng zhuō liǔ huā.',
          translation: '吃了梅子，酸劲儿把牙齿都软倒了；芭蕉绿油油的，把绿颜色分给了窗纱。夏天白天长，午觉醒来没什么心思做事，就靠在窗边，看院子里的小孩追着柳絮跑。',
        },
        {
          kind: 'note',
          text: '「无情思」是没什么心思、懒洋洋的意思。「柳花」是柳絮，白白的、轻飘飘的，风一吹满天飞。你吃过青青梅子吗？咬一口，牙齿都会酸软，和诗里写的一模一样。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'tongqu-plum-window',
          text: '午睡醒来，看窗外小孩追柳絮。',
        },
      ],
    },
    {
      title: '第四课 · 稚子弄冰（杨万里）',
      art: 'tongqu-ice-chime',
      artPrompt: '冬天的早晨，一个小孩从铜盆里倒出一块圆圆的冰，用彩丝穿着当锣敲，冰块忽然碎了一地',
      blocks: [
        {
          kind: 'poem',
          text: '稚子金盆脱晓冰，彩丝穿取当银铮。敲成玉磬穿林响，忽作玻璃碎地声。',
          pinyin: 'zhì zǐ jīn pén tuō xiǎo bīng, cǎi sī chuān qǔ dāng yín zhēng. qiāo chéng yù qìng chuān lín xiǎng, hū zuò bō li suì dì shēng.',
          translation: '小娃娃早上从铜盆里，把结的圆冰倒了出来，用彩色丝线穿上，当成银锣来敲。敲出的声音像玉磬一样清亮，穿过树林传出去；忽然「哗啦」一下，冰块掉在地上，碎成了玻璃一样的渣渣。',
        },
        {
          kind: 'note',
          text: '「稚子」就是小孩子。「脱晓冰」是把早上结好的冰从盆里倒出来。「铮」是一种锣。「磬」是古代用玉或石头做的乐器，敲起来声音很清脆。冬天你见过结冰的水盆吗？敲冰块玩，可是从古到今小朋友都爱做的事。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'tongqu-ice-chime',
          text: '小孩把冰块用彩丝穿着敲，碎了满地。',
        },
      ],
    },
    {
      title: '第五课 · 溪居即事（崔道融）',
      art: 'tongqu-river-gate',
      artPrompt: '春日溪边，一只没拴的小船被风吹进钓鱼湾，篱笆内的小孩以为是客人来了，急忙跑去柴门口又躲起来偷看',
      blocks: [
        {
          kind: 'poem',
          text: '篱外谁家不系船，春风吹入钓鱼湾。小童疑是有村客，急向柴门去却关。',
          pinyin: 'lí wài shuí jiā bù xì chuán, chūn fēng chuī rù diào yú wān. xiǎo tóng yí shì yǒu cūn kè, jí xiàng chái mén qù què guān.',
          translation: '篱笆外面，是谁家的船没有拴好？春风一吹，把船吹进了钓鱼湾。屋里的小孩以为有客人来了，急急忙忙跑到柴门边——又一想，赶紧把门关上，先躲起来看看。',
        },
        {
          kind: 'note',
          text: '「即事」就是写下刚刚发生的事。「不系」就是没拴绳子。「疑」是以为、猜。「去却关」是跑过去却又把门关上。这个小孩又想迎客人、又有点害羞，多有意思。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'tongqu-river-gate',
          text: '没拴的小船漂进湾里，小孩躲在柴门后偷看。',
        },
      ],
    },
    {
      title: '第六课 · 观游鱼（白居易）',
      art: 'tongqu-feeding-fish',
      artPrompt: '池塘边，诗人撒着鱼食喂鱼，不远处一个小孩划着小船在钓鱼，大鱼小鱼围过来',
      blocks: [
        {
          kind: 'poem',
          text: '绕池闲步看鱼游，正值儿童弄钓舟。一种爱鱼心各异，我来施食尔垂钩。',
          pinyin: 'rào chí xián bù kàn yú yóu, zhèng zhí ér tóng nòng diào zhōu. yī zhǒng ài yú xīn gè yì, wǒ lái shī shí ěr chuí gōu.',
          translation: '我绕着池塘散步，看鱼儿游来游去，正巧碰上小孩子在船上玩钓鱼。同样是喜欢鱼，心思却不一样——我是来喂东西给鱼吃的，你却是来下钩子钓鱼的。',
        },
        {
          kind: 'note',
          text: '「施食」是撒食物喂鱼。「尔」是你。「垂钩」是放下鱼钩。白居易写这首诗像在笑眯眯地和小孩聊天：你喜欢鱼，我也喜欢鱼，可我喜欢的方式是喂它们呀。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'tongqu-feeding-fish',
          text: '诗人喂鱼，小孩钓鱼，都喜欢鱼。',
        },
      ],
    },
  ],
  rights: {
    workTitle: '童趣诗选·好玩的事（六首）',
    author: '胡令能、杨万里、崔道融、白居易',
    authorDeathYear: 1206,
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: 'https://zh.wikisource.org',
    note: '诸位诗人卒年：胡令能约 806、杨万里 1206、崔道融约 907、白居易 846，均远超著作权保护期；通行本逐字核对，拼音与白话译文由平台撰写',
  },
}
