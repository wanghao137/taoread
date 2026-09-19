import type { PackBook } from '../types'

/**
 * A Child's Garden of Verses · 星星与月亮 — six bedtime poems by Robert Louis Stevenson
 * (1850–1894, public domain). Verses quoted from the 1885 first edition (Project
 * Gutenberg #25609); only stanza selections trimmed for bedtime length, wording
 * preserved verbatim. Chinese glosses written by the platform.
 */
export const gardenVerses: PackBook = {
  id: 'garden-verses',
  title: "A Child's Garden of Verses · 月亮与风",
  author: 'Robert Louis Stevenson',
  lang: 'en',
  category: 'poetry',
  ageStage: '6-8',
  intro: 'The moon has a face like the clock in the hall… 史蒂文森写给孩子的睡前诗集：月亮、风、雨和纸船。',
  coverArt: 'verse-moon-wind',
  coverArtPrompt: 'a child in pajamas floating a little paper boat on a moonlit stream, wind tossing kites in the sky, a friendly moon with a clock face above, dreamy watercolor',
  coverFrom: '#C15F3C',
  coverTo: '#F6E2D6',
  source: "A Child's Garden of Verses (1885), Project Gutenberg #25609, public domain (Stevenson d. 1894)",
  chapters: [
    {
      title: 'The Moon · 月亮',
      art: 'moon-clock-face',
      artPrompt: 'a big gentle moon with a clock face shining over a garden wall, a sleeping cat and mouse curled up, soft silvery light, watercolor',
      blocks: [
        {
          kind: 'poem',
          text: 'The moon has a face like the clock in the hall;\nShe shines on thieves on the garden wall,\nOn streets and fields and harbour quays,\nAnd birdies asleep in the forks of the trees.\n\nThe squalling cat and the squeaking mouse,\nThe howling dog by the door of the house,\nThe bat that lies in bed at noon,\nAll love to be out by the light of the moon.',
          translation: '月亮的脸，像大厅里的圆钟；她照亮花园墙头的小偷，照亮街道、田野和码头，照亮睡在树杈上的小鸟。喵喵叫的猫、吱吱叫的老鼠、门口汪汪叫的狗，还有中午睡大觉的蝙蝠——都喜欢在月光下出门溜达。',
        },
        {
          kind: 'note',
          text: 'New word: harbour quay — the place where boats rest by the sea.（码头）New word: fork — where a branch splits into two.（树杈）Which animal stays in bed at noon and comes out at night? The bat!',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'moon-clock-face',
          text: 'The moon shines on everyone asleep and awake. 月亮照着睡着和醒着的每一个人。',
        },
      ],
    },
    {
      title: 'Bed in Summer · 夏天也要早睡',
      art: 'bed-candlelight',
      artPrompt: 'a child in a cozy bed by yellow candlelight looking out the window where the sky is still bright and birds hop on the tree, summer evening, warm storybook scene',
      blocks: [
        {
          kind: 'poem',
          text: 'In winter I get up at night\nAnd dress by yellow candle-light.\nIn summer, quite the other way,\nI have to go to bed by day.\n\nI have to go to bed and see\nThe birds still hopping on the tree,\nOr hear the grown-up people\'s feet\nStill going past me in the street.\n\nAnd does it not seem hard to you,\nWhen all the sky is clear and blue,\nAnd I should like so much to play,\nTo have to go to bed by day?',
          translation: '冬天我天不亮就起床，就着黄黄的烛光穿衣服。夏天呢，完全反过来——天还亮着，我就得去睡觉。我躺下了，还能看见小鸟在树上蹦蹦跳，还能听见大人们的脚步声在街上走过。你说难不难？天那么蓝、那么亮，我还特别想玩，却要在白天就上床睡觉！',
        },
        {
          kind: 'note',
          text: 'New word: candle-light — the yellow light from a candle.（烛光）Stevenson wrote this more than one hundred years ago — no electric lights then, just candles! Does the sky stay bright where you live in summer?',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'bed-candlelight',
          text: 'In bed by day, listening to the birds. 天还亮就上了床，听着小鸟的歌。',
        },
      ],
    },
    {
      title: 'The Wind · 风',
      art: 'wind-kites',
      artPrompt: 'wind blowing kites high in the sky and birds tumbling, a child holding a hat, tall grass bending in long waves, breezy joyful watercolor',
      blocks: [
        {
          kind: 'poem',
          text: 'I saw you toss the kites on high\nAnd blow the birds about the sky;\nAnd all around I heard you pass,\nLike ladies\' skirts across the grass—\nO wind, a-blowing all day long,\nO wind, that sings so loud a song!',
          translation: '我看见你把风筝抛上天，把小鸟们吹得满天转；我听见你从四面八方跑过，像裙子擦过草地——哦，风啊，你整天吹呀吹，哦，风啊，你唱着这么响亮的歌！',
        },
        {
          kind: 'note',
          text: 'New word: toss — to throw up in the air.（抛起）Stevenson talks TO the wind, as if the wind were a friend running past. Next windy day, listen: what song is the wind singing?',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'wind-kites',
          text: 'The wind tosses kites high and sings its song. 风把风筝抛上天，唱着响亮的歌。',
        },
      ],
    },
    {
      title: 'Rain · 雨',
      art: 'rain-umbrella-sea',
      artPrompt: 'rain falling everywhere: on a green field, a tree, one red umbrella, and little ships on the grey sea far away, cozy rainy-day watercolor',
      blocks: [
        {
          kind: 'poem',
          text: 'The rain is raining all around,\nIt falls on field and tree,\nIt rains on the umbrellas here,\nAnd on the ships at sea.',
          translation: '雨在下呀下，下得到处都是：落在田野上、大树上，落在这儿的一把把雨伞上，也落在海上的一艘艘轮船上。',
        },
        {
          kind: 'note',
          text: 'New word: all around — everywhere.（到处）Only four lines! The rain reaches from a tiny umbrella all the way to ships far, far away. Can you say it in one breath?',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'rain-umbrella-sea',
          text: 'Rain falls on umbrellas and on ships. 雨落在雨伞上，也落在轮船上。',
        },
      ],
    },
    {
      title: 'Where Go the Boats? · 小船漂到哪',
      art: 'paper-boat-river',
      artPrompt: 'a small dark-brown river with golden sand banks carrying tiny paper boats past green leaves, a child crouching at the water edge watching, dreamy warm light',
      blocks: [
        {
          kind: 'poem',
          text: 'Dark brown is the river,\nGolden is the sand.\nIt flows along for ever,\nWith trees on either hand.\n\nGreen leaves a-floating,\nCastles of the foam,\nBoats of mine a-boating—\nWhere will all come home?\n\nOn goes the river\nAnd out past the mill,\nAway down the valley,\nAway down the hill.\n\nAway down the river,\nA hundred miles or more,\nOther little children\nShall bring my boats ashore.',
          translation: '深褐色的小河，金色的沙滩，河水一直向前流，两岸都是树。绿叶漂啊漂，白色的泡沫像小城堡，我的小船启航了——它们会从哪里回家呢？小河流啊流，流过磨坊，流下山谷，流下山冈。流下去好远好远，一百里还要多，别的了不起的小朋友，会把我的小船拉上岸。',
        },
        {
          kind: 'note',
          text: 'New word: ashore — onto the land from the water.（上岸）New word: mill — a building with a big wheel that turns in the water.（磨坊）Stevenson imagined other children finding his paper boats far away. Have you ever floated a leaf or a paper boat?',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'paper-boat-river',
          text: 'My paper boats float away down the river. 我的小纸船顺着河水漂远了。',
        },
      ],
    },
    {
      title: 'Foreign Lands · 高高看远方',
      art: 'cherry-tree-view',
      artPrompt: 'a child sitting high in a cherry tree with red cherries, looking out over gardens, a winding river like a mirror and roads leading to town, sunny curious watercolor',
      blocks: [
        {
          kind: 'poem',
          text: 'Up into the cherry tree\nWho should climb but little me?\nI held the trunk with both my hands\nAnd looked abroad on foreign lands.\n\nI saw the next door garden lie,\nAdorned with flowers, before my eye,\nAnd many pleasant places more\nThat never had been seen before.\n\nI saw the dimpling river pass\nAnd be the sky\'s blue looking-glass;\nThe dusty roads go up and down\nWith people tramping in to town.',
          translation: '爬上高高的樱桃树的是谁？是小小的我呀！我双手抱住树干，眺望远方的世界。我看见隔壁家的花园，开满了花；还有好多好多好玩的地方，是我从来没见过的。我看见亮闪闪的小河流过，像天空的蓝色镜子；弯弯的土路上，人们进城的脚步来来往往。',
        },
        {
          kind: 'note',
          text: 'New word: looking-glass — a mirror.（镜子）New word: tramp — to walk heavily, step by step.（踏步走）From high up, even the next-door garden looks like a new land. Where do you like to climb and look far?',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'cherry-tree-view',
          text: 'Little me, high in the cherry tree, looking far. 小小的我爬上樱桃树，看得很远很远。',
        },
      ],
    },
  ],
  rights: {
    workTitle: "A Child's Garden of Verses (six bedtime poems)",
    author: 'Robert Louis Stevenson (1850–1894)',
    authorDeathYear: 1894,
    jurisdiction: 'EU',
    basis: 'pd-70',
    sourceUrl: 'https://www.gutenberg.org/ebooks/25609',
    note: "First edition 1885; Stevenson died 1894 — protection expired (70y pma). Verses verbatim from Project Gutenberg #25609 with bedtime stanza trims; Chinese glosses by the platform",
  },
}
