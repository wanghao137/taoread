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
    {
      title: 'My Shadow · 我的影子',
      art: 'garden-verses:ch7',
      artPrompt: 'a child skipping along a sunny garden path with a long faithful shadow copying every move, and the same shadow dancing on the bedroom wall by lamplight, playful golden-hour watercolor',
      blocks: [
        {
          kind: 'poem',
          text: 'I have a little shadow that goes in and out with me,\nAnd what can be the use of him is more than I can see.\nHe is very, very like me from the heels up to the head;\nAnd I see him jump before me, when I jump into my bed.\n\nThe funniest thing about him is the way he likes to grow—\nNot at all like proper children, which is always very slow;\nFor he sometimes shoots up taller like an india-rubber ball,\nAnd he sometimes gets so little that there\'s none of him at all.\n\nHe hasn\'t got a notion of how children ought to play,\nAnd can only make a fool of me in every sort of way.\nHe stays so close beside me, he\'s a coward, you can see;\nI\'d think shame to stick to nurse as that shadow sticks to me!\n\nOne morning, very early, before the sun was up,\nI rose and found the shining dew on every buttercup;\nBut my lazy little shadow, like an errant sleepy-head,\nHad stayed at home behind me and was fast asleep in bed.',
          translation: '我有一个小影子，跟我进进出出。他有什么用呢，我可说不出。他从脚后跟到脑袋，都跟我一模一样；我跳上床的时候，他总是先一步跳进被窝。最好笑的是他喜欢乱长：一点也不像乖孩子慢慢长大——他有时像皮球一样猛蹿老高，有时又缩得小小的，一点儿也找不着。他不知道小朋友该怎么玩，只会笨手笨脚地出我的洋相。他紧紧粘着我，胆子小得很——我才不像保姆走到哪儿跟到哪儿那样粘人呢！一天清早，太阳还没出来，我起个大早，看见毛茛花上的露珠亮闪闪——可我那懒影子，像个贪睡的小懒虫，还待在家里，在床上睡得正香。',
        },
        {
          kind: 'note',
          text: 'New word: shadow — the dark shape that follows you in the light.（影子）New word: india-rubber ball — a bouncy ball made of rubber.（皮球）Why was the shadow still asleep in bed? Before the sun is up, there is no light — and no shadow at all!',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'garden-verses:ch7',
          text: 'My little shadow copies everything I do. 我的小影子学我做每件事。',
        },
      ],
    },
    {
      title: 'The Swing · 秋千',
      art: 'garden-verses:ch8',
      artPrompt: 'a child on a rope swing flying high above a garden wall, looking out over rivers, trees and cattle in the wide countryside, wind in the hair, joyful airy watercolor',
      blocks: [
        {
          kind: 'poem',
          text: 'How do you like to go up in a swing,\nUp in the air so blue?\nOh, I do think it the pleasantest thing\nEver a child can do!\n\nUp in the air and over the wall,\nTill I can see so wide,\nRivers and trees and cattle and all\nOver the countryside—\n\nTill I look down on the garden green,\nDown on the roof so brown—\nUp in the air I go flying again,\nUp in the air and down!',
          translation: '坐在秋千上飞上天，飞上蓝蓝的天空——你觉得怎么样？我想呀，这是孩子能做的最开心的事！飞过墙头，看得好远好远：小河、大树、牛群，还有整个乡下。低头看看绿色的花园，看看褐色的屋顶——我又飞起来啦，飞上去，又落下来！',
        },
        {
          kind: 'note',
          text: 'New word: swing — a seat hanging on ropes that moves back and forth.（秋千）New word: pleasantest — the most pleasant, the nicest.（最愉快的）Read the last line while swinging your arm: up in the air I go flying again — up in the air and DOWN!',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'garden-verses:ch8',
          text: 'Up in the air I go flying again. 我又飞到天上啦。',
        },
      ],
    },
    {
      title: 'The Land of Counterpane · 床单上的国土',
      art: 'garden-verses:ch9',
      artPrompt: 'a child tucked in a big bed like a gentle giant on a pillow hill, leaden soldiers marching between the folds of the bed-clothes, little ships sailing across the sheets and tiny cities of blocks, cozy imaginative watercolor',
      blocks: [
        {
          kind: 'poem',
          text: 'When I was sick and lay a-bed,\nI had two pillows at my head,\nAnd all my toys beside me lay,\nTo keep me happy all the day.\n\nAnd sometimes for an hour or so\nI watched my leaden soldiers go,\nWith different uniforms and drills,\nAmong the bed-clothes, through the hills;\n\nAnd sometimes sent my ships in fleets\nAll up and down among the sheets;\nOr brought my trees and houses out,\nAnd planted cities all about.\n\nI was the giant great and still\nThat sits upon the pillow-hill,\nAnd sees before him, dale and plain,\nThe pleasant land of counterpane.',
          translation: '我生病躺在床上的时候，头底下枕着两个枕头，玩具们都躺在我身边，陪我快活一整天。有时我一个钟头接一个钟头，看我的铅兵们行军，穿着不同的军装操练，在被单的群山间穿行。有时我派出一队队小军舰，在被单上开来开去；或者把小树和小房子摆出来，到处建起一座座城市。我就是那个又高大又不动的巨人，坐在枕头山上，看着眼前的山谷和平原——那片快活的床单国土。',
        },
        {
          kind: 'note',
          text: 'New word: counterpane — a bedspread, the cloth that covers a bed.（床罩）New word: leaden — made of lead, a heavy grey metal.（铅做的）The bed becomes a whole country! What hills and rivers are hiding in YOUR blanket tonight?',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'garden-verses:ch9',
          text: 'The bed becomes the pleasant land of counterpane. 床变成了快活的床单国土。',
        },
      ],
    },
    {
      title: 'Time to Rise · 该起床啦',
      art: 'garden-verses:ch10',
      artPrompt: 'a little yellow-beaked bird hopping on a window sill, cocking a shiny eye at a child still curled up in bed, morning sunshine through the curtains, funny gentle watercolor',
      blocks: [
        {
          kind: 'poem',
          text: 'A birdie with a yellow bill\nHopped upon the window sill,\nCocked his shining eye and said:\n\'Ain\'t you \'shamed, you sleepy-head!\'',
          translation: '一只黄嘴巴的小鸟，跳上了窗台，眨着亮晶晶的眼睛说：「你羞不羞呀，小懒虫！」',
        },
        {
          kind: 'note',
          text: 'New word: sill — the flat ledge at the bottom of a window.（窗台）New word: cocked his eye — turned his eye to look closely.（歪头看）The little bird is the morning alarm clock! What wakes YOU up?',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'garden-verses:ch10',
          text: 'A birdie scolds the sleepy-head at the window. 小鸟在窗台上数落小懒虫。',
        },
      ],
    },
    {
      title: 'At the Sea-Side · 在海边',
      art: 'garden-verses:ch11',
      artPrompt: 'a child digging little round holes in the wet sand with a wooden spade, each hole filling up with sea water like little cups, gentle waves and a wide sky, fresh seaside watercolor',
      blocks: [
        {
          kind: 'poem',
          text: 'When I was down beside the sea\nA wooden spade they gave to me\nTo dig the sandy shore.\n\nMy holes were empty like a cup,\nIn every hole the sea came up,\nTill it could come no more.',
          translation: '我到海边去玩，他们给了我一把小木铲，让我在沙滩上挖呀挖。我挖的坑空空的，像一只只小杯子；每个坑里，海水都涌上来，一直涌到再也装不下。',
        },
        {
          kind: 'note',
          text: 'New word: spade — a tool for digging.（铲子）New word: shore — the land along the edge of the sea.（海岸）Every hole becomes a little cup for the sea to fill. Next time at the beach, dig one and watch!',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'garden-verses:ch11',
          text: 'Little cups of sand fill up with the sea. 沙子做的小杯子盛满了海水。',
        },
      ],
    },
    {
      title: 'Windy Nights · 起风的夜晚',
      art: 'garden-verses:ch12',
      artPrompt: 'a mysterious cloaked rider on a horse galloping down a dark wet lane at night, bare trees bending and shutters rattling, a small child watching from an upstairs window by candlelight, moody gentle watercolor',
      blocks: [
        {
          kind: 'poem',
          text: 'Whenever the moon and stars are set,\nWhenever the wind is high,\nAll night long in the dark and wet,\nA man goes riding by.\nLate in the night when the fires are out,\nWhy does he gallop and gallop about?\n\nWhenever the trees are crying aloud,\nAnd ships are tossed at sea,\nBy, on the highway, low and loud,\nBy at the gallop goes he.\nBy at the gallop he goes, and then\nBy at the gallop he goes again.',
          translation: '每当月亮和星星都躲起来，每当风刮得高高的，整夜整夜，又黑又湿，一个人骑着马跑过。夜深了，灯火都熄了，他为什么还跑呀跑呀不停蹄？每当大树呜呜地哭喊，海上的船摇摇晃晃，大路上就传来低低的、响亮的声音——他骑着马奔驰而过。奔驰而过，接着又是——奔驰而过，他又来了。',
        },
        {
          kind: 'note',
          text: 'New word: gallop — the fastest way a horse runs.（飞奔）New word: set — (of the sun, moon or stars) gone down for the night.（落下）Listen on a windy night: the hoofbeats are really the wind and the rattling shutters. Who do YOU think the rider is?',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'garden-verses:ch12',
          text: 'A mysterious rider gallops by in the windy night. 起风的夜里，神秘的骑士奔驰而过。',
        },
      ],
    },
    {
      title: 'The Cow · 奶牛',
      art: 'garden-verses:ch13',
      artPrompt: 'a friendly red and white cow munching flowers in a green meadow full of buttercups, wind blowing her ears, a child offering an apple tart from a picnic cloth, sunny pastoral watercolor',
      blocks: [
        {
          kind: 'poem',
          text: 'The friendly cow, all red and white,\nI love with all my heart:\nShe gives me cream with all her might,\nTo eat with apple-tart.\n\nShe wanders lowing here and there,\nAnd yet she cannot stray,\nAll in the pleasant open air,\nThe pleasant light of day;\n\nAnd blown by all the winds that pass\nAnd wet with all the showers,\nShe walks among the meadow grass\nAnd eats the meadow flowers.',
          translation: '那头友善的奶牛，红白花相间，我打心底里喜欢她：她使出全身劲儿给我奶油，好让我蘸着苹果馅饼吃。她哞哞叫着四处溜达，却从来不会走丢，在快活的露天里，在快活的日光下；风吹过她，雨点打湿她，她走在草地上，吃着草地上开的花。',
        },
        {
          kind: 'note',
          text: 'New word: low — (said of a cow) to moo.（哞哞叫）New word: tart — an open pie with fruit in it.（果馅饼）The cream on your apple-tart comes from the cow! Say thank you to a cow today.',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'garden-verses:ch13',
          text: 'The friendly red and white cow eats the meadow flowers. 友善的红白花奶牛吃着草地的花。',
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
