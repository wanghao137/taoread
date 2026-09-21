import type { PackBook } from '../types'

/**
 * A Book of Nonsense (Edward Lear, 1846) — six of the most famous limericks,
 * for ages 3–5. Text: Project Gutenberg eBook #982, quoted verbatim. The
 * "Old Man on the Border" limerick is from Lear's More Nonsense (1872),
 * Project Gutenberg eBook #13648; its four-line original wording is kept and
 * the third line split to make the usual five-line form. Lear died in 1888,
 * so every poem is public domain in the US (pre-1929) and worldwide.
 * Chinese glosses written by the platform.
 */
export const bookOfNonsense: PackBook = {
  id: 'en-nonsense',
  title: 'A Book of Nonsense · 打油诗',
  author: 'Edward Lear',
  lang: 'en',
  category: 'poetry',
  ageStage: '3-5',
  intro: 'There was an Old Man with a beard... 英国画家爱德华·李尔的一百多首「胡说诗」里最有名的六首，短短五句，句句押韵，专门逗孩子笑。',
  coverArt: 'book-of-nonsense-cover',
  coverArtPrompt: 'a tall old man with an enormously long white beard full of little birds and nests, standing in a green field under a blue sky, a bee and a kite and a strange umbrella floating around him, jolly old-fashioned storybook art',
  coverFrom: '#922B21',
  coverTo: '#FADBD8',
  source: 'A Book of Nonsense (1846), Project Gutenberg #982; More Nonsense (1872), #13648; public domain (Lear d. 1888)',
  chapters: [
    {
      title: 'The Old Man with a Beard · 长胡子的老爷爷',
      art: 'old-man-beard-birds',
      artPrompt: 'a kind old man with a white beard reaching to the ground, tiny owls and a hen and wrens nesting in the curls of his beard, a lark perched on his nose, funny and gentle storybook scene',
      blocks: [
        {
          kind: 'poem',
          text: 'There was an Old Man with a beard,\nWho said, "It is just as I feared!\nTwo Owls and a Hen,\nFour Larks and a Wren,\nHave all built their nests in my beard!"',
          translation: '有位老爷爷，胡子长又长。他说：「我最担心的事还是发生啦——两只猫头鹰、一只母鸡、四只云雀，还有一只鹪鹩，都在我的胡子里做了窝！」',
        },
        {
          kind: 'note',
          text: 'New word: beard — the hair on a man\'s chin and cheeks.（胡子）New word: nest — the little home a bird builds.（鸟窝）Say it out loud: beard-feared-hen-wren... the whole poem ends with the same sound. That is what makes it a limerick!',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'birds-in-beard',
          text: 'The birds have moved into the Old Man\'s beard. 小鸟们搬进了老爷爷的胡子。',
        },
      ],
    },
    {
      title: 'The Old Man in a Tree · 树上的老爷爷',
      art: 'old-man-tree-bee',
      artPrompt: 'a grumpy old man sitting in the branches of a big green tree, one enormous fuzzy bee hovering by his ear, his hands flapping, a second bee arriving, sunny and silly storybook scene',
      blocks: [
        {
          kind: 'poem',
          text: 'There was an Old Man in a tree,\nWho was horribly bored by a Bee;\nWhen they said, "Does it buzz?"\nHe replied, "Yes, it does!\nIt\'s a regular brute of a Bee!"',
          translation: '有位老爷爷，坐在大树桠。一只蜜蜂烦得他呀——人家问他：「它嗡嗡叫吗？」他回答：「叫，它叫！它是一只十足讨厌的蜜蜂！」',
        },
        {
          kind: 'note',
          text: 'New word: buzz — the sound a bee makes.（嗡嗡）New word: brute — a big rough fellow; here it means the bee is a terrible pest.（粗鲁的家伙）Listen: tree-Bee-buzz-does-Bee. The same song, five times!',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'tree-bee-buzz',
          text: 'The bee buzzes, and the Old Man grumbles. 蜜蜂嗡嗡叫，老爷爷直嘟囔。',
        },
      ],
    },
    {
      title: 'The Young Lady whose Chin · 尖下巴的姑娘',
      art: 'young-lady-chin-harp',
      artPrompt: 'a young lady in an old-fashioned dress whose chin is long and pointy like a needle, sitting at a harp and playing with her chin resting on the strings, amazed onlookers at the door, whimsical storybook scene',
      blocks: [
        {
          kind: 'poem',
          text: 'There was a Young Lady whose chin,\nResembled the point of a pin:\nSo she had it made sharp,\nAnd purchased a harp,\nAnd played several tunes with her chin.',
          translation: '有位小姑娘，下巴尖又尖，尖得就像大头针。于是她把下巴磨得更尖，又买了一把竖琴，用下巴弹了好几支曲子呢。',
        },
        {
          kind: 'note',
          text: 'New word: harp — a tall musical instrument with many strings.（竖琴）New word: purchase — to buy.（购买）Chin-pin-sharp-harp-chin: the poem begins and ends with the very same word. Can you hear it?',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'chin-harp-tunes',
          text: 'The young lady plays tunes with her pointy chin. 尖下巴姑娘用下巴弹琴。',
        },
      ],
    },
    {
      title: 'The Old Man of the Nile · 尼罗河畔的老爷爷',
      art: 'old-man-nile-file',
      artPrompt: 'an old man in a loose robe sitting on the bank of a wide blue river under palm trees, filing his nails with a long metal file, pyramids in the distance, warm golden light, funny storybook scene',
      blocks: [
        {
          kind: 'poem',
          text: 'There was an Old Man of the Nile,\nWho sharpened his nails with a file;\nTill he cut off his thumbs,\nAnd said calmly, "This comes\nOf sharpening one\'s nails with a file!"',
          translation: '尼罗河畔有位老爷爷，用锉刀把指甲磨呀磨。直到把两个大拇指都磨掉了，他才平静地说：「这就是用锉刀磨指甲的下场！」',
        },
        {
          kind: 'note',
          text: 'New word: file — a rough tool for making nails or metal smooth and sharp.（锉刀）New word: calmly — in a quiet, unhurried way.（平静地）The Nile is a great river in Egypt. Nile-file-thumbs-comes-file: the poem chases its own tail!',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'nile-nail-file',
          text: 'The Old Man of the Nile files his nails by the river. 尼罗河畔的老爷爷在磨指甲。',
        },
      ],
    },
    {
      title: 'The Old Man on the Border · 边境上的老爷爷',
      art: 'old-man-border-tea',
      artPrompt: 'an old man in a tall hat dancing a jig with a surprised cat in a messy old room, a hat upside down on the table with steam rising from it like a teapot, neighbours staring through the window, hilarious storybook scene',
      blocks: [
        {
          kind: 'poem',
          text: 'There was an Old Man on the Border,\nWho lived in the utmost disorder;\nHe danced with the cat,\nAnd made tea in his hat,\nWhich vexed all the folks on the Border.',
          translation: '边境上有位老爷爷，日子过得乱糟糟。他抱着猫跳起舞，又用帽子泡起茶，气坏了边境上的街坊四邻。',
        },
        {
          kind: 'note',
          text: 'New word: disorder — a terrible mess.（乱糟糟）New word: vex — to make someone cross and annoyed.（惹人生气）Border-disorder-cat-hat-Border: the poem starts and finishes in the very same place, with a hat for a teapot in between.',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'hat-tea-cat-dance',
          text: 'The Old Man dances with the cat and makes tea in his hat. 老爷爷抱着猫跳舞，还用帽子泡茶。',
        },
      ],
    },
    {
      title: 'The Old Person whose Habits · 吃兔子的怪人',
      art: 'old-person-habits-rabbits',
      artPrompt: 'a prim old person in a long coat and spectacles sitting at a table eating a carrot while eighteen rabbits peek out from behind curtains and chairs, one rabbit holding a sign, funny and absurd storybook scene',
      blocks: [
        {
          kind: 'poem',
          text: 'There was an Old Person whose habits,\nInduced him to feed upon Rabbits;\nWhen he\'d eaten eighteen,\nHe turned perfectly green,\nUpon which he relinquished those habits.',
          translation: '有个怪老头，习惯很稀奇——他只爱吃兔子。等他吃够十八只，整个人都变绿啦！吓得他赶紧把这个坏习惯给戒了。',
        },
        {
          kind: 'note',
          text: 'New word: habit — something you do again and again without thinking.（习惯）New word: relinquish — to give something up.（放弃）Count with the poem: one, two, three... eighteen rabbits! Then green. What would turn YOU green?',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'eighteen-rabbits-room',
          text: 'Eighteen rabbits watch the Old Person eat his carrots. 十八只兔子看着怪老头吃胡萝卜。',
        },
      ],
    },
    {
      title: 'The Old Man and the Cow · 怕牛的老爷爷',
      art: 'en-nonsense:ch7',
      artPrompt: 'a worried old man in a tall hat perched stiffly on a wooden stile in a green meadow, smiling hard while an enormous friendly cow stares at him from very close, funny storybook scene',
      blocks: [
        {
          kind: 'poem',
          text: 'There was an Old Man who said, "How\nShall I flee from this horrible Cow?\nI will sit on this stile, and continue to smile,\nWhich may soften the heart of that Cow."',
          translation: '有个老爷爷说：「哎呀，我该怎么逃开这头可怕的牛？我要坐在这个梯凳上，一直保持微笑，这样也许能打动那头牛的心。」',
        },
        {
          kind: 'note',
          text: 'New word: stile — steps for climbing over a fence.（篱笆梯凳）New word: soften — to make gentle and kind.（软化）The old man has a plan: keep smiling! Does the cow look softened to you?',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'en-nonsense:ch7',
          text: 'The Old Man keeps smiling at the horrible Cow. 老爷爷对可怕的牛保持微笑。',
        },
      ],
    },
    {
      title: 'The Young Lady of Norway · 门缝里的姑娘',
      art: 'en-nonsense:ch8',
      artPrompt: 'a young lady flattened flat as a pancake in a doorway with a bright smile, the door half open on her, surprised neighbours peeking in, absurd and cheerful storybook scene',
      blocks: [
        {
          kind: 'poem',
          text: 'There was a Young Lady of Norway,\nWho casually sat in a doorway;\nWhen the door squeezed her flat,\nShe exclaimed, "What of that?"\nThis courageous Young Lady of Norway.',
          translation: '挪威有位小姑娘，随随便便坐在门口。门把她挤扁了，她只说了声：「那有什么关系？」——这就是勇敢的挪威小姑娘。',
        },
        {
          kind: 'note',
          text: 'New word: casually — in a careless, easy way.（随随便便地）New word: courageous — very brave.（勇敢的）Flat as a pancake, and she only says "What of that?" — now that is courage!',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'en-nonsense:ch8',
          text: 'The courageous Young Lady is squeezed quite flat. 勇敢的小姑娘被挤得扁扁的。',
        },
      ],
    },
    {
      title: 'The Old Man and the Bird · 大过灌木的鸟',
      art: 'en-nonsense:ch9',
      artPrompt: 'an astonished old man lifting his hat before a huge young bird sitting in a tiny round bush that is far too small for it, its tail feathers poking out everywhere, absurd funny storybook scene',
      blocks: [
        {
          kind: 'poem',
          text: 'There was an Old Man who said, "Hush!\nI perceive a young bird in this bush!"\nWhen they said, "Is it small?"\nHe replied, "Not at all!\nIt is four times as big as the bush!"',
          translation: '有个老爷爷说：「嘘！我看见这灌木丛里有只小鸟！」人家问：「它很小吗？」他回答：「一点也不小！它比灌木丛还要大四倍！」',
        },
        {
          kind: 'note',
          text: 'New word: perceive — to see or notice something.（看见）New word: bush — a low plant like a little tree.（灌木丛）A bird bigger than its own bush — hush! How big would four bushes be?',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'en-nonsense:ch9',
          text: 'A young bird four times as big as the bush. 一只比灌木丛还大四倍的小鸟。',
        },
      ],
    },
    {
      title: 'The Old Man on whose Nose · 鼻尖上的鸟',
      art: 'en-nonsense:ch10',
      artPrompt: 'a patient old man with a long pink nose where dozens of little birds of every kind perch side by side, at sunset they all fly away together and he wipes his brow, whimsical storybook scene',
      blocks: [
        {
          kind: 'poem',
          text: 'There was an Old Man on whose nose,\nMost birds of the air could repose;\nBut they all flew away,\nAt the closing of day,\nWhich relieved that Old Man and his nose.',
          translation: '有位老爷爷的鼻子上，天上的鸟儿差不多都能歇脚；可到了天黑的时候，它们全都飞走了——老爷爷和他的鼻子都松了一口气。',
        },
        {
          kind: 'note',
          text: 'New word: repose — to rest.（歇息）New word: relieve — to take a weight away and make someone comfortable.（解脱）His nose was a bird hotel! At the closing of day, everyone checks out.',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'en-nonsense:ch10',
          text: 'Most birds of the air repose on the Old Man\'s nose. 天上的鸟儿都来老爷爷的鼻尖歇脚。',
        },
      ],
    },
    {
      title: 'The Young Person of Smyrna · 倔强的姑娘',
      art: 'en-nonsense:ch11',
      artPrompt: 'a bold little girl hugging a large tabby cat and holding it out toward a cross old grandmother by a fireplace, in a tiny old-town house, hilarious storybook scene',
      blocks: [
        {
          kind: 'poem',
          text: 'There was a Young Person of Smyrna,\nWhom Grandmother threatened to burn her;\nBut she seized on the cat,\nAnd said, "Granny, burn that!\nYou incongruous old woman of Smyrna!"',
          translation: '士麦那有位小姑娘，奶奶威胁说要把她烧掉；她一把抱起猫咪，说：「奶奶，烧它吧！你这个不伦不类的士麦那老太婆！」',
        },
        {
          kind: 'note',
          text: 'New word: seize — to grab something suddenly.（抓住）New word: incongruous — odd, not fitting in.（不搭调的）Smyrna is a city in Turkey. The quick-witted girl saves herself with one clever move!',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'en-nonsense:ch11',
          text: '"Granny, burn that!" says the quick girl. 「奶奶，烧它吧！」机灵的姑娘说。',
        },
      ],
    },
    {
      title: 'The Old Person of Dover · 多佛的老先生',
      art: 'en-nonsense:ch12',
      artPrompt: 'an old gentleman in a frock coat dashing through a field of blue clover with enormous cartoon bees buzzing right behind him, one bee close to his nose, slapstick storybook scene',
      blocks: [
        {
          kind: 'poem',
          text: 'There was an Old Person of Dover,\nWho rushed through a field of blue Clover;\nBut some very large Bees,\nStung his nose and his knees,\nSo he very soon went back to Dover.',
          translation: '多佛有位老先生，飞奔着穿过一片蓝苜蓿地；几只大大的蜜蜂，蜇了他的鼻子和膝盖，于是他飞快地逃回了多佛。',
        },
        {
          kind: 'note',
          text: 'New word: rush — to run very fast.（飞奔）New word: sting — to prick with a sharp point, as a bee does.（蜇）Dover is a town by the sea in England. Out and back to Dover — that was a quick trip!',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'en-nonsense:ch12',
          text: 'Big bees chase the Old Person back to Dover. 大蜜蜂把老先生追回了多佛。',
        },
      ],
    },
    {
      title: 'The Young Lady of Parma · 装哑的姑娘',
      art: 'en-nonsense:ch13',
      artPrompt: 'a very calm young lady with folded hands and closed eyes humming, while a crowd of puzzled people lean in and ask her questions, in an Italian square, funny storybook scene',
      blocks: [
        {
          kind: 'poem',
          text: 'There was a Young Lady of Parma,\nWhose conduct grew calmer and calmer;\nWhen they said, "Are you dumb?"\nShe merely said, "Hum!"\nThat provoking Young Lady of Parma.',
          translation: '帕尔马有位小姑娘，举止越来越安静；人家问她：「你是哑巴吗？」她只说了声：「哼！」——这个气人的帕尔马小姑娘。',
        },
        {
          kind: 'note',
          text: 'New word: conduct — the way you behave.（举止）New word: provoking — annoying on purpose.（气人的）Parma is a city in Italy. Her whole answer is "Hum!" — very calm, or very stubborn?',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'en-nonsense:ch13',
          text: '"Hum!" says the Young Lady of Parma. 「哼！」帕尔马小姑娘说。',
        },
      ],
    },
    {
      title: 'The Young Lady of Bute · 吹笛的姑娘',
      art: 'en-nonsense:ch14',
      artPrompt: 'a young lady playing a shiny silver-gilt flute to a row of white pigs listening politely outside a stone cottage on a green Scottish island, a delighted uncle at the window, jolly storybook scene',
      blocks: [
        {
          kind: 'poem',
          text: 'There was a Young Lady of Bute,\nWho played on a silver-gilt flute;\nShe played several jigs\nTo her uncle\'s white pigs,\nWhich amused that Young Lady of Bute.',
          translation: '波特岛有位小姑娘，吹着一支包银的小笛子；她给舅舅的白猪吹了好几支快步舞曲，乐坏了这位波特岛小姑娘。',
        },
        {
          kind: 'note',
          text: 'New word: flute — a long musical instrument you blow across.（笛子）New word: jig — a quick, lively dance tune.（快步舞曲）Bute is a little island in Scotland. A concert for pigs! Did the pigs clap their trotters?',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'en-nonsense:ch14',
          text: 'The Young Lady plays jigs to her uncle\'s white pigs. 小姑娘给舅舅的白猪吹快步舞曲。',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'A Book of Nonsense (six limericks)',
    author: 'Edward Lear',
    authorDeathYear: 1888,
    jurisdiction: 'US',
    basis: 'pd-us',
    sourceUrl: 'https://www.gutenberg.org/ebooks/982',
    note: 'First published 1846; US public domain (pre-1929) and worldwide (Lear d. 1888, 70y pma expired). Limericks quoted verbatim from Project Gutenberg #982; "The Old Man on the Border" from More Nonsense (1872), Project Gutenberg #13648, with its original four-line wording kept in five-line form; Chinese glosses by the platform',
  },
}
