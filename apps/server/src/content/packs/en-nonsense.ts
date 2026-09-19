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
