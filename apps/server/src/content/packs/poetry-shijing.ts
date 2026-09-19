import type { PackBook } from '../types'

/**
 * 《诗经·儿童选》——四首最适合孩子的《诗经》篇目。
 * 底本：通行本《毛诗》（十三经注疏本），逐字核对。
 * 版权：先秦古籍，作者佚名，公版（basis=pd-70）；白话译文为平台自撰。
 * 拼音逐字注音，字与拼音词一一对应。
 */
export const shiJing: PackBook = {
  id: 'poetry-shijing',
  title: '诗经·儿童选',
  author: '佚名（先秦）',
  lang: 'zh',
  category: 'poetry',
  ageStage: '6-8',
  intro: '两千多年前的人，把桃花唱成歌，把车前草唱成歌，把河边的芦苇也唱成歌。这些歌后来有了一个名字，叫《诗经》。',
  coverArt: 'shijing-peach',
  coverArtPrompt: '春日山坡上一树盛开的粉桃花，花瓣随风飘落，树下穿古装的小姑娘伸手接花瓣，远处是青青的田野和炊烟，画面柔和明亮',
  coverFrom: '#F48FB1',
  coverTo: '#FFE082',
  source: '《诗经》（先秦，佚名）通行本，逐字注音',
  chapters: [
    {
      title: '桃夭',
      art: 'shijing-peach-bloom',
      artPrompt: '一株开满繁花的大桃树占满画面，粉红花瓣纷纷扬扬落下，树下几个古装孩童追着花瓣跑，喜鹊在枝头跳跃',
      blocks: [
        {
          kind: 'poem',
          text: '桃之夭夭，灼灼其华。之子于归，宜其室家。',
          pinyin: 'táo zhī yāo yāo， zhuó zhuó qí huā。 zhī zǐ yú guī， yí qí shì jiā。',
          translation: '桃树长得多么茂盛，花开得像火一样明亮。这位姑娘要出嫁啦，定让全家和和美美。',
        },
        {
          kind: 'poem',
          text: '桃之夭夭，有蕡其实。之子于归，宜其家室。',
          pinyin: 'táo zhī yāo yāo， yǒu fén qí shí。 zhī zǐ yú guī， yí qí jiā shì。',
          translation: '桃树长得多么茂盛，结出的桃子又大又多。这位姑娘要出嫁啦，定让家里圆圆满满。',
        },
        {
          kind: 'poem',
          text: '桃之夭夭，其叶蓁蓁。之子于归，宜其家人。',
          pinyin: 'táo zhī yāo yāo， qí yè zhēn zhēn。 zhī zǐ yú guī， yí qí jiā rén。',
          translation: '桃树长得多么茂盛，叶子密密层层。这位姑娘要出嫁啦，定让一家人都幸福。',
        },
        {
          kind: 'image',
          art: 'shijing-peach-bloom',
          text: '桃花开得像一片粉红色的云。',
        },
        {
          kind: 'note',
          text: '「夭夭」是茂盛的样子，「灼灼」是花开得亮亮的。「华」就是「花」。这首歌是祝新娘子像桃花一样美，日子像桃子一样甜。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '芣苢',
      art: 'shijing-plantain',
      artPrompt: '春天的小山坡上长着一丛丛车前草，几个古装小女孩挎着竹篮蹲下采草叶，一边采一边笑，蓝天上飘着几朵白云',
      blocks: [
        {
          kind: 'poem',
          text: '采采芣苢，薄言采之。采采芣苢，薄言有之。',
          pinyin: 'cǎi cǎi fú yǐ， bó yán cǎi zhī。 cǎi cǎi fú yǐ， bó yán yǒu zhī。',
          translation: '车前草啊茂盛鲜亮，我们快来采呀。车前草啊茂盛鲜亮，采下来收好呀。',
        },
        {
          kind: 'poem',
          text: '采采芣苢，薄言掇之。采采芣苢，薄言捋之。',
          pinyin: 'cǎi cǎi fú yǐ， bó yán duō zhī。 cǎi cǎi fú yǐ， bó yán luō zhī。',
          translation: '车前草啊茂盛鲜亮，一颗一颗拾起来呀。车前草啊茂盛鲜亮，捋下叶子一大把呀。',
        },
        {
          kind: 'poem',
          text: '采采芣苢，薄言袺之。采采芣苢，薄言襭之。',
          pinyin: 'cǎi cǎi fú yǐ， bó yán jié zhī。 cǎi cǎi fú yǐ， bó yán xié zhī。',
          translation: '车前草啊茂盛鲜亮，用衣角兜住它呀。车前草啊茂盛鲜亮，掖起衣襟满载回家呀。',
        },
        {
          kind: 'image',
          art: 'shijing-plantain',
          text: '小姑娘们采了满满一衣兜的车前草。',
        },
        {
          kind: 'note',
          text: '「芣苢」就是车前草。「掇」是拾，「捋」是顺着茎抹下来，「襭」是把衣襟掖在腰带上兜东西。这首歌像劳动号子，唱着唱着，草就采满啦。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '木瓜',
      art: 'shijing-papaya',
      artPrompt: '古风小院里，两个古装孩童面对面递送礼物，一个捧着木瓜，一个捧着发光的玉佩，两人都笑弯了眼睛，篱边挂着藤果',
      blocks: [
        {
          kind: 'poem',
          text: '投我以木瓜，报之以琼琚。匪报也，永以为好也！',
          pinyin: 'tóu wǒ yǐ mù guā， bào zhī yǐ qióng jū。 fěi bào yě， yǒng yǐ wéi hǎo yě！',
          translation: '你送我一个木瓜，我回赠一块美玉。不是为了回礼呀，是想和你永远做好朋友！',
        },
        {
          kind: 'poem',
          text: '投我以木桃，报之以琼瑶。匪报也，永以为好也！',
          pinyin: 'tóu wǒ yǐ mù táo， bào zhī yǐ qióng yáo。 fěi bào yě， yǒng yǐ wéi hǎo yě！',
          translation: '你送我一个木桃，我回赠一块美玉。不是为了回礼呀，是想和你永远好下去！',
        },
        {
          kind: 'poem',
          text: '投我以木李，报之以琼玖。匪报也，永以为好也！',
          pinyin: 'tóu wǒ yǐ mù lǐ， bào zhī yǐ qióng jiǔ。 fěi bào yě， yǒng yǐ wéi hǎo yě！',
          translation: '你送我一个木李，我回赠一块美玉。不是为了回礼呀，是情谊要长长久久！',
        },
        {
          kind: 'image',
          art: 'shijing-papaya',
          text: '你送我果子，我还你美玉，友情比礼物更珍贵。',
        },
        {
          kind: 'note',
          text: '「琼琚」「琼瑶」「琼玖」都是美玉。「匪」是「不是」。你给我一颗小糖，我还你一幅画——朋友之间的心意，礼物大小不重要。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '蒹葭',
      art: 'shijing-reeds',
      artPrompt: '深秋清晨的河湾，大片芦苇开满灰白芦花，水面上浮着薄薄的晨雾，露珠在苇叶上闪光，远方水边有一个朦胧的人影',
      blocks: [
        {
          kind: 'poem',
          text: '蒹葭苍苍，白露为霜。所谓伊人，在水一方。溯洄从之，道阻且长。溯游从之，宛在水中央。',
          pinyin: 'jiān jiā cāng cāng， bái lù wéi shuāng。 suǒ wèi yī rén， zài shuǐ yī fāng。 sù huí cóng zhī， dào zǔ qiě cháng。 sù yóu cóng zhī， wǎn zài shuǐ zhōng yāng。',
          translation: '芦苇密密又苍苍，白露凝成了霜。我心里想念的人，就在河的那一方。逆着水流去找她，道路又险又长。顺着水流去找她，她好像就在水中央。',
        },
        {
          kind: 'poem',
          text: '蒹葭萋萋，白露未晞。所谓伊人，在水之湄。溯洄从之，道阻且跻。溯游从之，宛在水中坻。',
          pinyin: 'jiān jiā qī qī， bái lù wèi xī。 suǒ wèi yī rén， zài shuǐ zhī méi。 sù huí cóng zhī， dào zǔ qiě jī。 sù yóu cóng zhī， wǎn zài shuǐ zhōng chí。',
          translation: '芦苇密密又青青，露水还没有干。我心里想念的人，站在河水边上。逆流去找她，路又陡又难走。顺流去找她，她好像就在小岛上。',
        },
        {
          kind: 'poem',
          text: '蒹葭采采，白露未已。所谓伊人，在水之涘。溯洄从之，道阻且右。溯游从之，宛在水中沚。',
          pinyin: 'jiān jiā cǎi cǎi， bái lù wèi yǐ。 suǒ wèi yī rén， zài shuǐ zhī sì。 sù huí cóng zhī， dào zǔ qiě yòu。 sù yóu cóng zhī， wǎn zài shuǐ zhōng zhǐ。',
          translation: '芦苇密密又鲜亮，露水还没收干。我心里想念的人，就在河岸边。逆流去找她，路又弯又绕。顺流去找她，她好像就在沙洲上。',
        },
        {
          kind: 'image',
          art: 'shijing-reeds',
          text: '晨雾里的芦苇荡，像蒙着一层薄薄的白纱。',
        },
        {
          kind: 'note',
          text: '「蒹葭」是芦苇。「伊人」是心里想念的那个人。「溯洄」是逆流而上，「溯游」是顺流而下。隔着雾雾的水面望过去，这种轻轻的想念，两千年后我们也能懂。',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: '诗经·儿童选',
    author: '佚名（先秦）',
    jurisdiction: 'CN',
    basis: 'pd-70',
    note: '先秦古籍，作者佚名，古籍公版；白话译文与注音为平台自撰。',
  },
}
