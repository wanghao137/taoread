import type { PackBook } from '../types'

/**
 * 《童趣诗选·小动物》——六首写小动物的古诗，孩子最喜欢的题材。
 * 选诗：骆宾王《咏鹅》、白居易《池上》、杨万里《小池》与《宿新市徐公店》、
 *       袁枚《所见》、高鼎《村居》。朝代跨唐宋清，均公版。
 */
export const tongQu: PackBook = {
  id: 'tongqu-animals',
  title: '童趣诗选·小动物',
  author: '多位诗人',
  lang: 'zh',
  category: 'poetry',
  ageStage: '3-5',
  intro: '大白鹅、小蜻蜓、知了、燕子……古时候的小朋友也喜欢看这些小家伙。',
  coverArt: 'goose-pond',
  coverArtPrompt: '一个中国古代小池塘，一只大白鹅正弯着脖子向水里游去，水面漂着浮萍，岸边有个扎冲天辫的小孩趴着看鹅',
  coverFrom: '#00695C',
  coverTo: '#4DB6AC',
  source: '公版古诗选集，逐字注音',
  chapters: [
    {
      title: '第一课 · 咏鹅（骆宾王）',
      art: 'goose-pond',
      artPrompt: '村边池塘里一只大白鹅弯着脖子朝天欢叫，白羽浮在漂满浮萍的绿水上，红脚掌拨出波纹，岸边小孩趴着看',
      blocks: [
        {
          kind: 'poem',
          text: '鹅，鹅，鹅，曲项向天歌。白毛浮绿水，红掌拨清波。',
          pinyin: 'é, é, é, qū xiàng xiàng tiān gē. bái máo fú lǜ shuǐ, hóng zhǎng bō qīng bō.',
          translation: '鹅啊鹅啊鹅，你弯着脖子朝着天唱歌。白色的羽毛浮在绿绿的水上，红色的脚掌拨出清清的水波。',
        },
        {
          kind: 'note',
          text: '这是骆宾王七岁时写的诗。「曲项」是弯着脖子。「拨」是用脚划水。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'goose-pond',
          text: '一只白鹅在长满浮萍的池塘里游，脖子弯成好看的弧线。',
        },
      ],
    },
    {
      title: '第二课 · 池上（白居易）',
      art: 'lotus-boat',
      artPrompt: '夏日荷塘里，一个扎冲天辫的小娃娃撑着小木船穿过白莲花，身后的浮萍被船头划开一道长长的水痕',
      blocks: [
        {
          kind: 'poem',
          text: '小娃撑小艇，偷采白莲回。不解藏踪迹，浮萍一道开。',
          pinyin: 'xiǎo wá chēng xiǎo tǐng, tōu cǎi bái lián huí. bù jiě cáng zōng jì, fú píng yī dào kāi.',
          translation: '小娃娃划着小船，偷偷摘了一朵白莲花回来。他不知道怎么藏起自己的脚印——浮萍被他划开了一道长长的口子。',
        },
        {
          kind: 'note',
          text: '「不解」是不懂、不会。「踪迹」是走过的痕迹。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'lotus-boat',
          text: '一个小孩划着小船穿过荷花池，浮萍被船分开一道水痕。',
        },
      ],
    },
    {
      title: '第三课 · 小池（杨万里）',
      art: 'lotus-dragonfly',
      artPrompt: '一眼清泉细细流入小池，池边树影倒映水面，一朵刚冒尖的小荷叶上，一只透明翅膀的蜻蜓静静立着',
      blocks: [
        {
          kind: 'poem',
          text: '泉眼无声惜细流，树阴照水爱晴柔。小荷才露尖尖角，早有蜻蜓立上头。',
          pinyin: 'quán yǎn wú shēng xī xì liú, shù yīn zhào shuǐ ài qíng róu. xiǎo hé cái lù jiān jiān jiǎo, zǎo yǒu qīng tíng lì shàng tóu.',
          translation: '泉眼安安静静，很舍不得地让细水流走。树的影子倒在水里，像是在欣赏这晴天里的温柔。小荷叶才冒出一个尖尖的小角，蜻蜓早就飞来，站在上面了。',
        },
        {
          kind: 'note',
          text: '「惜」是珍惜、舍不得。「小荷」是刚长出来的小荷叶。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'lotus-dragonfly',
          text: '一片刚冒尖的小荷叶上，立着一只蜻蜓。',
        },
      ],
    },
    {
      title: '第四课 · 宿新市徐公店（杨万里）',
      art: 'butterfly-field',
      artPrompt: '稀疏的竹篱笆后一条小路弯弯，一个小孩在金黄的油菜花田里奔跑追黄蝴蝶，蝴蝶隐入花海不见踪影',
      blocks: [
        {
          kind: 'poem',
          text: '篱落疏疏一径深，树头花落未成阴。儿童急走追黄蝶，飞入菜花无处寻。',
          pinyin: 'lí luò shū shū yī jìng shēn, shù tóu huā luò wèi chéng yīn. ér tóng jí zǒu zhuī huáng dié, fēi rù cài huā wú chù xún.',
          translation: '篱笆稀稀疏疏的，小路弯弯通向深处。树上的花落了，叶子还没长密。小孩子跑得飞快，追着一只黄蝴蝶——蝴蝶一下飞进油菜花地里，找也找不到了。',
        },
        {
          kind: 'note',
          text: '「急走」是跑得很快（古汉语里「走」就是跑）。「无处寻」是到处都找不到。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'butterfly-field',
          text: '黄灿灿的油菜花田里，一个小孩在追蝴蝶。',
        },
      ],
    },
    {
      title: '第五课 · 所见（袁枚）',
      art: 'cicada-singer',
      artPrompt: '林间小路上，一个牧童骑在老黄牛背上，忽然停住歌声，屏住呼吸望向树干上一只正在鸣叫的知了',
      blocks: [
        {
          kind: 'poem',
          text: '牧童骑黄牛，歌声振林樾。意欲捕鸣蝉，忽然闭口立。',
          pinyin: 'mù tóng qí huáng niú, gē shēng zhèn lín yuè. yì yù bǔ míng chán, hū rán bì kǒu lì.',
          translation: '放牛的孩子骑在黄牛背上，歌声把树林都震响了。他忽然想抓那只在叫的知了——立刻闭上嘴，一动不动地站住了。',
        },
        {
          kind: 'note',
          text: '「林樾」是树阴、树林。「意欲」是心里想要。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'cicada-singer',
          text: '骑在牛背上的牧童突然停住唱歌，抬头看树上的知了。',
        },
      ],
    },
    {
      title: '第六课 · 村居（高鼎）',
      art: 'kite-spring',
      artPrompt: '早春的河堤旁杨柳拂水、黄莺穿梭，几个放学的孩子迎着东风奔跑，天上一只花纸鸢高高飞起',
      blocks: [
        {
          kind: 'poem',
          text: '草长莺飞二月天，拂堤杨柳醉春烟。儿童散学归来早，忙趁东风放纸鸢。',
          pinyin: 'cǎo zhǎng yīng fēi èr yuè tiān, fú dī yáng liǔ zuì chūn yān. ér tóng sàn xué guī lái zǎo, máng chèn dōng fēng fàng zhǐ yuān.',
          translation: '农历二月，草长高了，黄莺飞来飞去。杨柳的枝条轻轻拂着河堤，像喝醉了春天的雾气。孩子们放学回来得早，赶紧趁着东风放风筝。',
        },
        {
          kind: 'note',
          text: '「纸鸢」就是风筝，古时候用纸和竹子做的。「散学」是放学。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'kite-spring',
          text: '春天的河堤边，几个孩子仰头看天上的风筝，柳枝随风飘。',
        },
      ],
    },
  ],
  rights: {
    workTitle: '童趣古诗选（六首）',
    author: '骆宾王、白居易、杨万里、袁枚、高鼎',
    authorDeathYear: 684,
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: 'https://zh.wikisource.org',
    note: '诸位诗人卒年均在 1880 年前；通行本逐字核对，译文平台自撰',
  },
}
