import type { PackBook } from '../types'

/**
 * 《西游记》故事节选（故事）。
 * 底本：明·吴承恩《西游记》原著（公版）。此处为平台自撰白话改写（basis=adapted），
 * 面向 6-8 岁儿童：缩短篇幅、去掉惊悚细节、口语化重述。改写文本权利归平台。
 */
export const xiYouJi: PackBook = {
  id: 'xiyou-journey',
  title: '西游记·美猴王出世',
  author: '吴承恩 原著 · 桃阅读 改写',
  lang: 'zh',
  category: 'story',
  ageStage: '6-8',
  intro: '花果山上的一块石头，吸收了日精月华，蹦出一只石猴！它会爬树、会游泳，还当上了猴子王。',
  coverArt: 'mountain-monkey',
  coverArtPrompt: '一只可爱的小石猴站在花果山顶的巨石上，身穿虎皮小裙，背后是云海和仙山瀑布，桃树开着粉色的花，天空是黄昏的暖橙色',
  coverFrom: '#2E7D32',
  coverTo: '#66BB6A',
  source: '公版名著（明·吴承恩）白话改写',
  chapters: [
    {
      title: '第一章 · 石头里蹦出的猴子',
      art: 'magic-stone',
      artPrompt: '花果山顶一块巨石裂开，一只圆滚滚的小石猴从中蹦出，金光四射，四周桃树繁花，云海翻涌',
      blocks: [
        {
          kind: 'text',
          text: '从前，东海边有一座花果山，山上长满了桃树，一年到头都开着花。山顶上有一块大石头，有三丈多高，像个小房子那么大。',
        },
        {
          kind: 'text',
          text: '这块石头可真不一般——它天天晒太阳，夜夜照月亮，一年又一年，慢慢有了灵气。',
        },
        {
          kind: 'image',
          art: 'magic-stone',
          text: '花果山顶的仙石，日晒月沐，渐渐有了灵气。',
        },
        {
          kind: 'text',
          text: '有一天，「轰隆」一声巨响，石头裂开了！从里面蹦出一只圆滚滚的石猴。它睁开眼睛，金光一闪，把天上的玉帝都吓了一跳。',
        },
        {
          kind: 'text',
          text: '石猴落地就会跑，见风就长大。它在山上摘桃子吃，在溪里摸鱼玩，没几天，就成了山里最机灵的猴子。',
        },
      ],
    },
    {
      title: '第二章 · 水帘洞探宝',
      art: 'waterfall-cave',
      artPrompt: '一道白色大瀑布从山崖倾泻而下，小石猴纵身跳进水帘，身后群猴在岸边探头张望，水花飞溅',
      blocks: [
        {
          kind: 'text',
          text: '一天，猴子们来到一条大瀑布前。瀑布白花花的，像一幅大帘子从天上挂下来，哗啦啦地响。',
        },
        {
          kind: 'text',
          text: '老猴子说：「谁敢钻进瀑布，看看后面是什么，我们就拜他做大王！」猴子们你看看我，我看看你，都不敢动。',
        },
        {
          kind: 'image',
          art: 'waterfall-cave',
          text: '水帘洞前，瀑布像一幅白色的大帘子。',
        },
        {
          kind: 'text',
          text: '石猴挠挠腮帮子，喊了一声「我来」，纵身一跳，钻进了水帘。睁眼一看——哎呀！瀑布后面竟然有个大山洞，洞里石桌石椅样样齐全，还有一口清泉。',
        },
        {
          kind: 'text',
          text: '石猴跑出去，把猴子们带进洞。大家高兴得又蹦又跳，一齐拜它为王。从此，石猴有了一个响当当的名号——美猴王！',
        },
      ],
    },
    {
      title: '第三章 · 拜师学本领',
      art: 'master-fan',
      artPrompt: '云雾缭绕的仙洞里，孙悟空双膝跪地恭恭敬敬向须菩提祖师行礼，祖师手持拂尘含笑点头，案上摆着经卷',
      blocks: [
        {
          kind: 'text',
          text: '美猴王在花果山快快活活地过了好些年。有一天它想：猴子总会变老，我得学长生不老的本事才行。',
        },
        {
          kind: 'text',
          text: '它扎了一只小木筏，漂洋过海，走了好远好远，终于找到了须菩提祖师。祖师见它诚心，收它做了徒弟，还给它取了个名字，叫孙悟空。',
        },
        {
          kind: 'image',
          art: 'master-fan',
          text: '孙悟空跪在祖师面前，恭恭敬敬地行礼。',
        },
        {
          kind: 'text',
          text: '孙悟空学得可认真啦！别人偷懒的时候，它还在练功。没过几年，它学会了七十二变，还学会了翻筋斗云——一个筋斗，就能翻十万八千里！',
        },
        {
          kind: 'note',
          text: '十万八千里，差不多要绕地球转上一圈半呢。',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '学成本领，孙悟空回到花果山。从那以后，花果山的小猴子们，有了一位会飞天、会变化的齐天大圣。',
        },
      ],
    },
  ],
  rights: {
    workTitle: '西游记',
    author: '吴承恩',
    authorDeathYear: 1582,
    translator: '桃阅读（白话改写）',
    jurisdiction: 'CN',
    basis: 'adapted',
    sourceUrl: 'https://ctext.org/dictionary.pl?if=gb&id=35012',
    note: '原著公版（吴承恩卒于 1582 年）。本包为面向儿童的白话改写，改写文本由平台创作。',
  },
}
