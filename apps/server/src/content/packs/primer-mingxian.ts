import type { PackBook } from '../types'

/**
 * 《名贤集》儿童选——古代蒙学读物，辑录历代贤人格言。
 * 底本：通行本《名贤集》（编者佚名，约成书于南宋以后），选句逐字核对通行本。
 * 版权：古代蒙学典籍，编者佚名，古籍公版（basis=pd-70）；白话释义为平台自撰。
 */
export const mingXianJi: PackBook = {
  id: 'primer-mingxian',
  title: '名贤集·儿童选',
  author: '佚名（古代蒙学典籍）',
  lang: 'zh',
  category: 'primer',
  ageStage: '6-8',
  intro: '古人把一颗颗聪明的心，装进一句句短短的话里。念一念，就像牵着许多古代好朋友的温柔的手。',
  coverArt: 'mingxian-scroll',
  coverArtPrompt: '展开的泛黄长卷上写着工整的毛笔字，一个扎小髻的孩童踮脚指着一行字，爷爷在旁边含笑捋须，案上青瓷笔洗与烛台，暖光柔和',
  coverFrom: '#A1887F',
  coverTo: '#FFF59D',
  source: '《名贤集》（古代蒙学典籍，佚名）通行本选句',
  chapters: [
    {
      title: '第一章 · 心里有善念',
      art: 'mingxian-kind',
      artPrompt: '古风庭院里一个小男孩扶起摔倒的小伙伴，两人相视而笑，屋檐下挂着一串风铃，阳光把两个小影子拉得很长',
      blocks: [
        {
          kind: 'text',
          text: '但行好事，莫问前程。',
          translation: '只管去做对的事、帮别人的事，不用一直惦记着能得到什么。',
        },
        {
          kind: 'text',
          text: '人有善愿，天必佑之。',
          translation: '心里怀有善良的愿望，连天空都会温柔地护着你。',
        },
        {
          kind: 'text',
          text: '救人一命，胜造七级浮屠。',
          translation: '帮助别人渡过难关，比盖一座七层的高塔还要了不起。',
        },
        {
          kind: 'text',
          text: '善有善报，恶有恶报。不是不报，时辰未到。',
          translation: '善良会有善良的回音，慢慢来，好事总会悄悄回到你身边。',
        },
        {
          kind: 'text',
          text: '知己知彼，将心比心。',
          translation: '懂自己，也懂别人；用自己的心，去体谅别人的心。',
        },
        {
          kind: 'text',
          text: '责人之心责己，恕己之心恕人。',
          translation: '像提醒自己那样去提醒自己做得更好，像原谅自己那样去原谅别人。',
        },
        {
          kind: 'text',
          text: '静坐常思己过，闲谈莫论人非。',
          translation: '安静时想一想自己哪里可以更好；聊天时不去说别人的坏话。',
        },
        {
          kind: 'text',
          text: '来说是非者，便是是非人。',
          translation: '跑来跟你说别人坏话的人，自己往往正嚼着是非。听听就好，别跟着传。',
        },
        {
          kind: 'image',
          art: 'mingxian-kind',
          text: '扶起摔倒的伙伴，心里也亮堂堂。',
        },
        {
          kind: 'note',
          text: '夜灯悄悄话：今天你做过哪件小小的「好事」？说给身边的人听听吧。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第二章 · 做事有恒心',
      art: 'mingxian-diligent',
      artPrompt: '清晨薄雾中一个古装少年背着书包赶路，路上已有早行人的脚印，路边一株小树苗被木棍细心扶正，天边泛起鱼肚白',
      blocks: [
        {
          kind: 'text',
          text: '一年之计在于春，一日之计在于寅。一家之计在于和，一生之计在于勤。',
          translation: '一年最好的开端是春天，一天最好的开端是清晨；家最要紧的是和睦，一辈子最要紧的是勤快。',
        },
        {
          kind: 'text',
          text: '人无远虑，必有近忧。',
          translation: '平时不想一想明天的事，小事也可能变成眼前的麻烦。',
        },
        {
          kind: 'text',
          text: '事要三思，免劳后悔。',
          translation: '做事前多想一想，想清楚了再动手，就不用事后叹气啦。',
        },
        {
          kind: 'text',
          text: '得忍且忍，得耐且耐。不忍不耐，小事成大。',
          translation: '能忍一忍、耐一耐的事，就轻轻放过去；忍不住，小事也会吵成大事。',
        },
        {
          kind: 'text',
          text: '莫道君行早，更有早行人。',
          translation: '别以为自己起得早，路上早就有比你更早出发的人啦。',
        },
        {
          kind: 'text',
          text: '长江后浪推前浪，世上新人赶旧人。',
          translation: '江水一浪推着一浪，世界上的小朋友会一茬比一茬棒。',
        },
        {
          kind: 'text',
          text: '人老心未老，人穷志莫穷。',
          translation: '头发白了，心还可以年轻；日子紧一点，志气不能少。',
        },
        {
          kind: 'text',
          text: '若要人不知，除非己莫为。',
          translation: '只要做过了，就总会有人知道，所以悄悄地也要做对的事。',
        },
        {
          kind: 'image',
          art: 'mingxian-diligent',
          text: '清晨赶路的少年，脚下带着小跑的风。',
        },
        {
          kind: 'note',
          text: '夜灯悄悄话：明天清晨，你想早点起床做完哪一件小事？',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第三章 · 相处有暖意',
      art: 'mingxian-friends',
      artPrompt: '长长的小路上两个古装孩童并肩同行，一匹枣红小马在前面走，远处青山连绵，路边野花开着，白云悠悠飘过',
      blocks: [
        {
          kind: 'text',
          text: '路遥知马力，日久见人心。',
          translation: '路走得远，才知道马的力气；日子处得久，才看得清一个人的真心。',
        },
        {
          kind: 'text',
          text: '近朱者赤，近墨者黑。',
          translation: '挨着红色的东西会染红，挨着黑的会染黑。和爱笑爱帮忙的朋友在一起，自己也会越来越好。',
        },
        {
          kind: 'text',
          text: '一人传虚，百人传实。',
          translation: '一句没有影儿的话，传的人多了，好像就变成真的了。所以别轻信、别乱传。',
        },
        {
          kind: 'text',
          text: '得宠思辱，居安思危。',
          translation: '被夸奖的时候想想还能更努力，日子安稳的时候也留一点点小心。',
        },
        {
          kind: 'text',
          text: '知足常足，终身不辱。知止常止，终身不耻。',
          translation: '懂得满足，心里就常常是满的；知道什么时候该停下来，走起路来才稳稳当当。',
        },
        {
          kind: 'text',
          text: '自恨枝无叶，莫怨太阳偏。',
          translation: '树先看看自己有没有长叶子，别怪太阳照得不公平。遇事先从自己身上找原因。',
        },
        {
          kind: 'text',
          text: '白云朝朝过，青天日日闲。',
          translation: '白云每天飘过，蓝天天天舒舒服服。心放宽一点，日子就悠悠的、亮亮的。',
        },
        {
          kind: 'text',
          text: '送君千里，终须一别。',
          translation: '好朋友送了再送，也终究要说再见。好好道别，是为了下次笑着重逢。',
        },
        {
          kind: 'image',
          art: 'mingxian-friends',
          text: '长长的路上，好朋友慢慢地一起走。',
        },
        {
          kind: 'note',
          text: '夜灯悄悄话：这二十句里，你最喜欢哪一句？明天说给好朋友听。',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: '名贤集·儿童选',
    author: '佚名（古代蒙学典籍）',
    jurisdiction: 'CN',
    basis: 'pd-70',
    note: '古籍公版；白话释义为平台自撰。',
  },
}
