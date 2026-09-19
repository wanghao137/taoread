import type { PackBook } from '../types'

/**
 * 《四季诗选·山水晚安》——七首写山、水、星、雪的短诗，全部一读就出画面。
 * 选诗：杜牧《山行》、柳宗元《江雪》、王安石《梅花》、杨万里《晓出净慈寺送林子方》、
 *       李白《夜宿山寺》、查慎行《舟夜书所见》、唐寅《画鸡》。
 * 均公版（最晚卒年查慎行 1727），通行本逐字核对；拼音与白话译文由平台撰写。
 */
export const poetryScenery: PackBook = {
  id: 'poetry-scenery',
  title: '四季诗选·山水晚安',
  author: '杜牧、柳宗元、王安石、杨万里、李白、查慎行、唐寅',
  lang: 'zh',
  category: 'poetry',
  ageStage: '6-8',
  intro: '霜叶红红的山、下雪天的江、墙角的梅花、满是星星的河……七首小诗，七个安静的画面前。',
  coverArt: 'scenery-night',
  coverArtPrompt: '一幅中国山水小景：远处层层霜林，一叶小舟泊在平静的江面上，夜空挂着一弯月亮和满天星星，岸边几枝梅花悄悄开放，水彩绘本风格',
  coverFrom: '#C15F3C',
  coverTo: '#EBCFA8',
  source: '公版古诗选集，通行本逐字注音',
  chapters: [
    {
      title: '第一课 · 山行（杜牧）',
      art: 'frost-hills',
      artPrompt: '深秋的山中石板小路蜿蜒向上，白云深处有几户人家，路边的枫叶红得像火，一个孩子坐在马车边看枫叶',
      blocks: [
        {
          kind: 'poem',
          text: '远上寒山石径斜，白云生处有人家。停车坐爱枫林晚，霜叶红于二月花。',
          pinyin: 'yuǎn shàng hán shān shí jìng xié, bái yún shēng chù yǒu rén jiā. tíng chē zuò ài fēng lín wǎn, shuāng yè hóng yú èr yuè huā.',
          translation: '一条石头小路弯弯地伸向远处的深山，白云飘起的地方住着人家。我把车停下来，只因太喜欢这傍晚的枫树林——被霜打过的叶子，比二月的鲜花还要红。',
        },
        {
          kind: 'note',
          text: '「坐」在这里是「因为」的意思，不是说坐下来哦。「石径」就是石头铺的小路。「斜」古时候读 xiá，和「家」「花」押韵，现在我们读 xié 也可以。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'frost-hills',
          text: '弯弯的石头小路爬上秋天的山，枫叶红红的一片。',
        },
      ],
    },
    {
      title: '第二课 · 江雪（柳宗元）',
      art: 'snow-river',
      artPrompt: '大雪天的江面，所有的山上没有一只鸟，一个披蓑衣戴斗笠的老爷爷独自在小船上钓鱼，雪花轻轻落下，非常安静',
      blocks: [
        {
          kind: 'poem',
          text: '千山鸟飞绝，万径人踪灭。孤舟蓑笠翁，独钓寒江雪。',
          pinyin: 'qiān shān niǎo fēi jué, wàn jìng rén zōng miè. gū zhōu suō lì wēng, dú diào hán jiāng xuě.',
          translation: '千座山上看不见一只飞鸟，万条小路上没有一个人的脚印。一条小船上，坐着披蓑衣、戴斗笠的老爷爷，一个人在大雪天的江上钓鱼。',
        },
        {
          kind: 'note',
          text: '「绝」和「灭」都是「没有」的意思。「蓑笠」是蓑衣和斗笠，古人用草做的雨衣雨帽。你觉得老爷爷冷不冷？他钓的真是鱼吗？也许他是在安安静静地看雪。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'snow-river',
          text: '下雪的江面上一条小船，老爷爷安安静静地钓鱼。',
        },
      ],
    },
    {
      title: '第三课 · 梅花（王安石）',
      art: 'plum-corner',
      artPrompt: '冬日墙角几枝白色梅花独自开放，远处一片白雪，一只小蜜蜂般的小鸟飞来闻花香，清冷的月光',
      blocks: [
        {
          kind: 'poem',
          text: '墙角数枝梅，凌寒独自开。遥知不是雪，为有暗香来。',
          pinyin: 'qiáng jiǎo shù zhī méi, líng hán dú zì kāi. yáo zhī bù shì xuě, wèi yǒu àn xiāng lái.',
          translation: '墙角有几枝梅花，冒着寒冷独自开放。远远望去像雪又不是雪，因为有一阵淡淡的香气飘过来。',
        },
        {
          kind: 'note',
          text: '「凌寒」是不怕寒冷。「暗香」是淡淡的、若有若无的香味。梅花是冬天最勇敢的花，天越冷，它开得越好。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'plum-corner',
          text: '墙角的梅花开了，白白的像雪，还有淡淡香味。',
        },
      ],
    },
    {
      title: '第四课 · 晓出净慈寺送林子方（杨万里）',
      art: 'west-lake-lotus',
      artPrompt: '清晨的西湖，莲叶一大片一大片铺到天边，绿得发亮，荷花在朝阳下粉粉的特别好看，远处有青山和小船',
      blocks: [
        {
          kind: 'poem',
          text: '毕竟西湖六月中，风光不与四时同。接天莲叶无穷碧，映日荷花别样红。',
          pinyin: 'bì jìng xī hú liù yuè zhōng, fēng guāng bù yǔ sì shí tóng. jiē tiān lián yè wú qióng bì, yìng rì hé huā bié yàng hóng.',
          translation: '六月的西湖风光，到底和其他季节不一样：莲叶一大片一大片，绿得一直铺到天边；荷花被朝阳一照，红得特别好看。',
        },
        {
          kind: 'note',
          text: '「毕竟」是「到底是」的意思。「无穷碧」是绿得看不到边。「别样红」是特别地红。杨万里最爱写荷花，他还写过「小荷才露尖尖角」。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'west-lake-lotus',
          text: '西湖的荷花开了，绿叶子一直铺到天边。',
        },
      ],
    },
    {
      title: '第五课 · 夜宿山寺（李白）',
      art: 'mountain-temple',
      artPrompt: '一座高山上的小楼阁高得快碰到星星和月亮，一个小孩子凭栏伸手想去摘星星，云在脚下飘',
      blocks: [
        {
          kind: 'poem',
          text: '危楼高百尺，手可摘星辰。不敢高声语，恐惊天上人。',
          pinyin: 'wēi lóu gāo bǎi chǐ, shǒu kě zhāi xīng chén. bù gǎn gāo shēng yǔ, kǒng jīng tiān shàng rén.',
          translation: '山上这座楼高得不得了，一伸手好像就能摘到星星。我不敢大声说话，怕吵醒了天上的仙人。',
        },
        {
          kind: 'note',
          text: '「危楼」是很高很高的楼，不是危房哦。「恐」是担心、怕。李白晚上住在山里的寺庙，写下了这串「伸手摘星星」的奇思妙想。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'mountain-temple',
          text: '山顶的小楼高得挨着星星，小孩伸手去摘星星。',
        },
      ],
    },
    {
      title: '第六课 · 舟夜书所见（查慎行）',
      art: 'river-stars',
      artPrompt: '夜晚的河面，一盏小小的渔灯像萤火虫，微风吹起细细的波浪，灯光散开变成满河的星星，水彩夜景',
      blocks: [
        {
          kind: 'poem',
          text: '月黑见渔灯，孤光一点萤。微微风簇浪，散作满河星。',
          pinyin: 'yuè hēi jiàn yú dēng, gū guāng yī diǎn yíng. wēi wēi fēng cù làng, sàn zuò mǎn hé xīng.',
          translation: '没有月亮的夜里，江上有一点渔灯的光，孤零零的像一只小萤火虫。微风把水面吹出细细的波浪，那点灯光散开来，变成了满河的星星。',
        },
        {
          kind: 'note',
          text: '「簇」是拥起、吹起。「孤光」是孤单的一点光。这是小朋友最容易喜欢的诗之一——一盏灯变成一河星星，像不像你把小夜灯调暗的时候？',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'river-stars',
          text: '河面上一点渔灯的光，被风吹成满河星星。',
        },
      ],
    },
    {
      title: '第七课 · 画鸡（唐寅）',
      art: 'rooster-crow',
      artPrompt: '一只雪白羽毛、红色鸡冠的大公鸡站在院子里，头顶红冠特别神气，天刚亮，身后千家万户的窗户亮起灯',
      blocks: [
        {
          kind: 'poem',
          text: '头上红冠不用裁，满身雪白走将来。平生不敢轻言语，一叫千门万户开。',
          pinyin: 'tóu shàng hóng guān bù yòng cái, mǎn shēn xuě bái zǒu jiāng lái. píng shēng bù gǎn qīng yán yǔ, yī jiào qiān mén wàn hù kāi.',
          translation: '大公鸡头上的红冠子天生就长好了，不用裁剪；一身雪白的羽毛，大步走过来。它平时从不随便乱叫，可一开口打鸣，千家万户都开门迎接早晨。',
        },
        {
          kind: 'note',
          text: '这是画家唐伯虎题在自己画上的诗。「轻言语」是随便说话。公鸡像不像一个特别守时的小朋友？平时安安静静，一到早上准时叫大家起床。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'rooster-crow',
          text: '神气的大公鸡一叫，千家万户都亮灯了。',
        },
      ],
    },
  ],
  rights: {
    workTitle: '四季诗选·山水晚安（七首）',
    author: '杜牧、柳宗元、王安石、杨万里、李白、查慎行、唐寅',
    authorDeathYear: 1727,
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: 'https://zh.wikisource.org',
    note: '诸位诗人卒年均在 1727 年及以前，远超著作权保护期；通行本逐字核对，拼音与白话译文由平台撰写',
  },
}
