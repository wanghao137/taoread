import type { PackBook } from '../types'

/**
 * 《田园诗选》——四首田园诗，写村庄、田野和雨天赶路的夜。
 * 底本：通行本（《孟浩然集》《石湖居士诗集》《西江月》通行辑本），逐字核对。
 * 版权：孟浩然（689-740）、范成大（1126-1193）、翁卷（南宋）、辛弃疾（1140-1207），
 * 均为古代公版（basis=pd-70）；白话译文为平台自撰。
 */
export const pastoralPoems: PackBook = {
  id: 'poetry-pastoral',
  title: '田园诗选',
  author: '孟浩然、范成大、翁卷、辛弃疾',
  lang: 'zh',
  category: 'poetry',
  ageStage: '6-8',
  intro: '村里的饭香，田里的瓜苗，雨里的子规鸟，还有月亮底下的稻花香。四位诗人把田园写成了一幅幅会呼吸的画。',
  coverArt: 'pastoral-field',
  coverArtPrompt: '黄昏的田园，金黄稻田连着青瓦农舍，一个农人牵着牛走在田埂上，远处炊烟袅袅，晚霞把天边染成橘粉色，白鹭飞过',
  coverFrom: '#8BC34A',
  coverTo: '#FFB74D',
  source: '唐宋田园诗（公版古籍）通行本，逐字注音',
  chapters: [
    {
      title: '过故人庄 · 孟浩然',
      art: 'pastoral-village',
      artPrompt: '绿树环绕的村庄，一位老友站在柴门外迎接来访的诗人，桌上摆着黄米饭和炖鸡，窗外是青色山影和打谷场，气氛亲切温暖',
      blocks: [
        {
          kind: 'poem',
          text: '故人具鸡黍，邀我至田家。绿树村边合，青山郭外斜。',
          pinyin: 'gù rén jù jī shǔ， yāo wǒ zhì tián jiā。 lǜ shù cūn biān hé， qīng shān guō wài xiá。',
          translation: '老朋友备好了黄米饭和鸡肉，邀请我到村里做客。绿树把村子团团围住，青山在城外斜斜地延伸。',
        },
        {
          kind: 'poem',
          text: '开轩面场圃，把酒话桑麻。待到重阳日，还来就菊花。',
          pinyin: 'kāi xuān miàn cháng pǔ， bǎ jiǔ huà sāng má。 dài dào chóng yáng rì， huán lái jiù jú huā。',
          translation: '推开窗对着打谷场和菜园，端着酒聊起种桑种麻的事。等到重阳节那天，我还要再来赏菊花。',
        },
        {
          kind: 'image',
          art: 'pastoral-village',
          text: '绿树抱着小村，老朋友笑着迎出门来。',
        },
        {
          kind: 'note',
          text: '「具」是备好。「黍」是黄米。「轩」是窗户。「斜」读 xiá，为了押韵。最好的请客就是：家常饭，说不完的话，还有「下次再来」的约定。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '四时田园杂兴 · 范成大',
      art: 'pastoral-hemp',
      artPrompt: '农家小院白天大人在田里耘田，晚上灯下妇人捻麻线，白天画面里一个小孩蹲在桑树荫下学大人挖坑种瓜苗，泥土翻新',
      blocks: [
        {
          kind: 'poem',
          text: '昼出耘田夜绩麻，村庄儿女各当家。',
          pinyin: 'zhòu chū yún tián yè jì má， cūn zhuāng ér nǚ gè dāng jiā。',
          translation: '白天出去锄草耘田，晚上搓麻线，村里的年轻人个个都会当家过日子。',
        },
        {
          kind: 'poem',
          text: '童孙未解供耕织，也傍桑阴学种瓜。',
          pinyin: 'tóng sūn wèi jiě gōng gēng zhī， yě bàng sāng yīn xué zhòng guā。',
          translation: '小孩子还不懂耕田织布，也学着大人的样子，蹲在桑树荫下种起了瓜。',
        },
        {
          kind: 'image',
          art: 'pastoral-hemp',
          text: '桑树荫下，小娃娃有模有样地学种瓜。',
        },
        {
          kind: 'note',
          text: '「耘田」是给庄稼锄草，「绩麻」是把麻搓成线。「供」读 gōng，是「从事」的意思。你有没有像小娃娃一样，学着大人的样子做过什么事？',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '乡村四月 · 翁卷',
      art: 'pastoral-rain',
      artPrompt: '江南四月烟雨迷蒙，山冈绿意铺满，水田映着天光白茫茫一片，细雨如丝，子规鸟立在枝头鸣叫，农人弯腰插秧',
      blocks: [
        {
          kind: 'poem',
          text: '绿遍山原白满川，子规声里雨如烟。',
          pinyin: 'lǜ biàn shān yuán bái mǎn chuān， zǐ guī shēng lǐ yǔ rú yān。',
          translation: '绿色铺满了山坡原野，稻田里的水映着天光白茫茫，子规鸟的叫声里，细雨像烟雾一样轻轻落着。',
        },
        {
          kind: 'poem',
          text: '乡村四月闲人少，才了蚕桑又插田。',
          pinyin: 'xiāng cūn sì yuè xián rén shǎo， cái liáo cán sāng yòu chā tián。',
          translation: '乡村的四月很少有闲人，刚刚忙完采桑养蚕，又要下田插秧了。',
        },
        {
          kind: 'image',
          art: 'pastoral-rain',
          text: '细雨像轻烟，田里的人们忙着插秧。',
        },
        {
          kind: 'note',
          text: '「子规」是杜鹃鸟。「川」这里指稻田。「才了」是刚忙完。四月是村里最忙的时候，可是在诗人耳朵里，雨声、鸟声都是好听的歌。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '西江月·夜行黄沙道中 · 辛弃疾',
      art: 'pastoral-night',
      artPrompt: '夏夜的稻田间小路上，一轮明月照着惊飞的喜鹊，稻花低垂香气浮动，青蛙蹲在田边鼓腮鸣叫，远处小桥流水与茅屋灯火',
      blocks: [
        {
          kind: 'poem',
          text: '明月别枝惊鹊，清风半夜鸣蝉。稻花香里说丰年，听取蛙声一片。',
          pinyin: 'míng yuè bié zhī jīng què， qīng fēng bàn yè míng chán。 dào huā xiāng lǐ shuō fēng nián， tīng qǔ wā shēng yī piàn。',
          translation: '明亮的月光惊起了枝头的喜鹊，半夜的清风吹来蝉的鸣叫。在稻花的香气里，青蛙呱呱地叫成一片，好像在说今年准是好收成。',
        },
        {
          kind: 'poem',
          text: '七八个星天外，两三点雨山前。旧时茅店社林边，路转溪桥忽见。',
          pinyin: 'qī bā gè xīng tiān wài， liǎng sān diǎn yǔ shān qián。 jiù shí máo diàn shè lín biān， lù zhuǎn xī qiáo hū xiàn。',
          translation: '天边挂着七八颗星星，山前飘来两三点雨滴。土地庙树林旁那家熟悉的茅店，转过小溪上的桥，忽然出现在眼前。',
        },
        {
          kind: 'image',
          art: 'pastoral-night',
          text: '月亮底下，稻田飘香，青蛙唱成一片。',
        },
        {
          kind: 'note',
          text: '「别枝」是斜伸的树枝。「见」读 xiàn，是「出现」。走夜路一点也不害怕，因为稻花香、蛙声、星星都在陪着诗人。',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: '田园诗选',
    author: '孟浩然、范成大、翁卷、辛弃疾',
    jurisdiction: 'CN',
    basis: 'pd-70',
    note: '唐宋古代诗人作品，均为古籍公版；白话译文与注音为平台自撰。',
  },
}
