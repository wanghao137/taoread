import type { PackBook } from '../types'

/**
 * Now We Are Six — a selection of poems by A. A. Milne (1928 collection of 1927 work),
 * for very young readers.
 * US public domain only (published 1927, pre-1929); Milne died 1956, so the
 * UK/EU term has not expired. Direct quotation is limited to short excerpts of
 * 30 words or fewer per poem, included from the US public domain edition;
 * remaining poems are retold in newly written verse of our own.
 */
export const nowWeAreSix: PackBook = {
  id: 'milne-nowwesix',
  title: 'Now We Are Six',
  author: 'A. A. Milne',
  lang: 'en',
  category: 'poetry',
  ageStage: '3-5',
  intro: 'Poems about being small and growing: birthdays and beetles, sneezles and knights, and a friend called Pooh who is always there. Short verses to say out loud, clap to, and sleep to.',
  coverArt: 'six-knights',
  coverArtPrompt: 'a small child in a homemade cardboard knight costume with a soup-pot helmet and wooden spoon sword standing proudly beside a plush bear on a nursery rug, a rag castle of chairs and blankets behind, golden nursery lamplight, warm storybook style',
  coverFrom: '#6A1B9A',
  coverTo: '#FFE082',
  source: 'Now We Are Six (A. A. Milne, 1927); short excerpts from the US public domain edition, remainder retold',
  chapters: [
    {
      title: 'Chapter 1 · Growing',
      art: 'six-growing-up',
      artPrompt: 'a little child blowing out candles on a lopsided birthday cake while a plush bear in a red shirt holds the matchbox, paper hats and six wobbly crayon drawings on the wall, warm golden nursery lamplight',
      blocks: [
        {
          kind: 'poem',
          text: 'When I was One,\nI had just begun.\nWhen I was Two,\nI was nearly new.\nWhen I was Three,\nI was hardly me.',
        },
        {
          kind: 'note',
          text: 'From "The End" — quoted (30 words or fewer) from the US public domain edition. Count on your fingers: one, two, three... and keep going to the last line, which grown-ups love best.',
          art: 'lamp-hint',
        },
        {
          kind: 'poem',
          text: 'Wherever I am, there\'s always Pooh,\nThere\'s always Pooh and Me.',
        },
        {
          kind: 'note',
          text: 'From "Us Two" — quoted (30 words or fewer) from the US public domain edition. It is a walking-along song for a bear and a boy who do everything together. Who is your Pooh? A friend, a bear, a blanket?',
          art: 'lamp-hint',
        },
        {
          kind: 'poem',
          text: 'I met a Man as I went walking;\nWe got talking, Man and I.',
        },
        {
          kind: 'note',
          text: 'From "Puppy and I" — quoted (30 words or fewer) from the US public domain edition. The child goes walking, meets a man, a horse, and a woman — but the best company at the end of the road is a puppy. Say the walking beat with your feet: ONE, two, ONE, two.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 2 · Days at Home',
      art: 'six-fireside',
      artPrompt: 'a cosy parlour at dusk with a coal fire glowing, a small boy in a nightgown writing a very long letter at a low table while a plush bear watches, a little beetle crawling up a rug, stockings drying on the fender, orange firelight',
      blocks: [
        {
          kind: 'poem',
          text: 'King John was not a good man,\nHe had his little ways.',
        },
        {
          kind: 'note',
          text: 'From "King John\'s Christmas" — quoted (30 words or fewer) from the US public domain edition. Grumpy old King John writes Santa the longest letter ever, listing every present he missed as a child. He is a very good man on Christmas morning. What would go on YOUR longest list?',
          art: 'lamp-hint',
        },
        {
          kind: 'poem',
          text: 'I found a little beetle; so that Beetle was his name,\nAnd I called him Alexander',
        },
        {
          kind: 'note',
          text: 'From "Forgiven" — quoted (30 words or fewer) from the US public domain edition. Alexander the beetle is accidentally squashed in a tablecloth shake — the poem is the long, polite apology to a broken heart. Saying sorry for small accidents is a grown-up-sized kindness.',
          art: 'lamp-hint',
        },
        {
          kind: 'poem',
          text: 'Christopher Robin\nHad wheezles and sneezles;\nThey bundled him off\nTo his bed, and they said:',
        },
        {
          kind: 'note',
          text: 'From "Sneezles" — quoted (30 words or fewer) from the US public domain edition. Doctors come running for a nose that just sneezed, and the cure is the same as always: bed, warmth, and being fussed over. The best medicine in the poem is a mother and a blanket.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 3 · Dreams and Knights',
      art: 'six-armour',
      artPrompt: 'a child under a patchwork quilt with a flashlight, a tin-foil knight helmet on the bedpost and a wooden spoon sword beside a plush bear, moonlight through curtain gap making a bright patch on the floor, deep blue cosy night',
      blocks: [
        {
          kind: 'poem',
          text: 'If I had a ship, I\'d sail away,\nOver the sea, some fine new day —\nPast the whales and the coral isles,\nTo a harbour lit with lantern-fires,\nAnd I\'d come home before the night,\nWith a shell in my pocket, holding light.',
        },
        {
          kind: 'note',
          text: 'After "The Island," retold in new words. In the original, the child imagines sailing his own ship to his very own island, where everything is arranged just as he likes — and where other little children may sail to him someday. Where would your island be?',
          art: 'lamp-hint',
        },
        {
          kind: 'poem',
          text: 'A knight had armour, bright and grand,\nBut oh — it creaked at every hand!\nHe couldn\'t creep, he couldn\'t steal,\nFor CREAK went the armour, heel on heel.\nSo he gave it one bright coat of grease,\nAnd now he\'s quiet as a sleeping mouse.',
        },
        {
          kind: 'note',
          text: 'After "The Knight Whose Armour Didn\'t Squeak," retold in new words. In the original, a boy in armour plays a knight so quietly that nobody can hear him coming — and that quiet, well-oiled knight turns out to be the bravest of all. Make your armour-creak sound. Now your quiet-knight sound.',
          art: 'lamp-hint',
        },
        {
          kind: 'poem',
          text: 'Binker is the friend I keep,\nAt my breakfast, in my sleep,\nDown the stairs and up the tree —\nBinker always is with me.\nGrown-ups never see him go,\nBut they\'re nicer, for they know.',
        },
        {
          kind: 'note',
          text: 'After "Binker," retold in new words. In the original, Binker is the secret invisible friend a child invents — and grown-ups, knowing exactly what is going on, kindly set an extra spoon. Binker is a secret of the child\'s own, and the family protects it.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Three Foxes',
      art: 'milne-nowwesix:ch4',
      artPrompt: 'three small russet fox cubs trotting in a line through a moonlit wood with their paws bare, tall ferns and a fat yellow moon behind the trees, fireflies blinking, soft green night, storybook watercolor',
      blocks: [
        {
          kind: 'poem',
          text: 'Once upon a time there were three little foxes\nWho didn\'t wear stockings, and they didn\'t wear socks.',
        },
        {
          kind: 'note',
          text: 'From "The Three Foxes" — quoted (30 words or fewer) from the US public domain edition. Three foxes trot off through the wood in Milne\'s galloping nonsense rhyme, and the tall tale runs on ahead of you. Say the two lines fast, three times in a row, and try not to giggle.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 5 · Dinner Again',
      art: 'milne-nowwesix:ch5',
      artPrompt: 'a small girl in a pinafore pushing away a bowl of rice pudding at a kitchen table with a doubtful face while her mother looks on puzzled and a little dog eyes the bowl hopefully, warm morning kitchen light, storybook watercolor',
      blocks: [
        {
          kind: 'poem',
          text: 'What is the matter with Mary Jane?\nShe\'s perfectly well, and she hasn\'t a pain;\nAnd it\'s lovely rice pudding for dinner again!\nWhat is the matter with Mary Jane?',
        },
        {
          kind: 'note',
          text: 'From "Rice-Pudding" — quoted (30 words or fewer) from the US public domain edition. Nothing at all is the matter with Mary Jane, and that is exactly the trouble: it is lovely rice pudding for dinner AGAIN. Even the nicest dinner gets tiresome on the third day — just ask around your own table.',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Now We Are Six',
    author: 'A. A. Milne',
    authorDeathYear: 1956,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Published 1927; US public domain (pre-1929). UK/EU term has not expired; short excerpts (30 words or fewer per poem) included from the US public domain edition, remaining poems retold in original simplified wording.',
  },
}
