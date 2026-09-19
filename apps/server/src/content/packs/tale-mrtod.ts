import type { PackBook } from '../types'

/**
 * The Tale of Mr. Tod — Beatrix Potter (1866–1943), first published 1912.
 * Retold in very simple English for ages 3-5 in a witty, never-frightening way:
 * the fox Mr. Tod and the badger Tommy Brock bicker like two grumpy neighbours,
 * while Peter Rabbit and Benjamin Bunny quietly carry the bunny babies home.
 * The duel is comic noise — pillows fly, nobody is hurt, and everyone sleeps safe.
 * Source: public domain original (US pre-1929; UK, Potter d. 1943, 70y pma expired 2014).
 * Scene keys use the 'tod-' prefix.
 */
export const mrTod: PackBook = {
  id: 'tale-mrtod',
  title: 'The Tale of Mr. Tod',
  author: 'Beatrix Potter',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro:
    'Mr. Tod the fox and Tommy Brock the badger are terrible neighbours who grumble at each other all day. When the bunny babies disappear in a sack, Peter Rabbit and Benjamin Bunny follow the trail — and find them snug as buns.',
  coverArt: 'tod-bridge',
  coverArtPrompt:
    'two small rabbits in little jackets crossing a wooden footbridge over a sparkling stream, a brick house with crooked chimneys and a leafy hilltop beyond, rushes and willow trees bending at the water edge, their long shadows stretched across the planks, bright fresh morning light with drifting white clouds, gentle adventure mood, storybook watercolour style',
  coverFrom: '#AED581',
  coverTo: '#FFAB91',
  source: 'The Tale of Mr. Tod (Beatrix Potter, 1912), public domain (Potter d. 1943)',
  chapters: [
    {
      title: 'Chapter 1 · An Empty Cradle',
      art: 'tod-hill',
      artPrompt:
        'a young rabbit in a blue jacket and another young rabbit with a small brown bag standing at the foot of a green hill, looking at an empty woven-grass cradle on a burrow doorstep, a trail of sack drag marks leading uphill through the grass, breezy morning with fast white clouds and swaying buttercups, gentle adventure mood, storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'Benjamin Bunny and his wife Flopsy had a nursery full of babies. One morning the little grass cradle was empty!',
        },
        {
          kind: 'image',
          art: 'tod-hill',
          text: 'Benjamin and Peter study the drag marks.',
        },
        {
          kind: 'text',
          text: 'Benjamin ran for his cousin Peter Rabbit. Together they read the grass. Drag marks! Made by a heavy sack, going over the hill.',
        },
        {
          kind: 'note',
          text: 'Ask your child: What do you think the two friends said before setting off? Make up their brave words together.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"Follow the trail," said Peter. "Tip-toe, and keep your whiskers steady." Up the hill they went.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The House on the Hill',
      art: 'tod-hilltop',
      artPrompt:
        'a brick house with crooked chimneys and sagging gutters on a grassy hilltop, its front door standing open, two small rabbits tiptoeing up the path in the foreground, butterflies over the wildflowers, a winding trail of flattened grass behind them, bright morning light, curious and gentle, storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'The trail crossed a little bridge and climbed to a brick house. It belonged to Mr. Tod the fox. He kept two homes, and dust in both.',
        },
        {
          kind: 'image',
          art: 'tod-hilltop',
          text: 'Up the path to the fox\u2019s house on the hill.',
        },
        {
          kind: 'text',
          text: 'The door stood open. Everything inside was quiet. Peter pressed his ear to the step. "Someone is snoring," he whispered.',
        },
        {
          kind: 'note',
          text: 'Little fact: foxes often keep more than one den. They move house when one gets too dusty.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The friends tiptoed in, quiet as falling leaves, and peeped round the kitchen door.',
        },
      ],
    },
    {
      title: 'Chapter 3 · A Bed Full of Badger',
      art: 'tod-bed',
      artPrompt:
        'a tall fox in a nightcap glaring at a stout sleepy badger snoring in a grand four-poster bed, pillows and cushions flying in a comic quarrel, two small rabbits watching from behind a lace curtain in the foreground, a messy bedroom with boots and empty jam jars, golden afternoon light through the curtains, funny and noisy, storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'In the best bed lay Tommy Brock the badger, snoring like a kettle. Just then Mr. Tod came home, and saw his own blankets going in and out.',
        },
        {
          kind: 'image',
          art: 'tod-bed',
          text: 'Mr. Tod finds a badger in his bed.',
        },
        {
          kind: 'text',
          text: '"My bed!" cried the fox. "My house!" grumbled the badger. What a racket! Pillows flew, and both of them shouted at once.',
        },
        {
          kind: 'note',
          text: 'Ask your child: Have you heard a quarrel that was loud but not really dangerous? What did it sound like?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'With all that fuss, nobody watched the back door at all. Peter and Benjamin slipped past on quiet feet, towards the kitchen.',
        },
      ],
    },
    {
      title: 'Chapter 4 · Snug as Buns',
      art: 'tod-kitchen',
      artPrompt:
        'an old stone kitchen at dusk, a young rabbit in blue and another with a little bag lifting sleepy baby bunnies one by one from a big cool oven lined with soft straw, the babies yawning and cosy, warm lamplight on the copper pans, a faint quarrel still rumbling in a far room, tender and brave, storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'In the kitchen, inside the big cool oven, lay the babies — all six, asleep in the straw, snug as buns.',
        },
        {
          kind: 'image',
          art: 'tod-kitchen',
          text: 'The babies are found asleep in the straw.',
        },
        {
          kind: 'text',
          text: '"One, two, three," counted Peter, passing them out. "Four, five, six," breathed Benjamin, tucking each into the sack with the softest straw.',
        },
        {
          kind: 'note',
          text: 'Ask your child: Let us count six sleepy babies together. Can you count six of your own sleepy things?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'They closed the window softly behind them. Then they carried the bundle down the hill, quick and careful, all the way home.',
        },
      ],
    },
    {
      title: 'Chapter 5 · Counting Noses',
      art: 'tod-home',
      artPrompt:
        'a warm rabbit burrow interior in the evening, a mother rabbit counting six sleepy babies in a grass cradle and kissing each little nose, two young rabbits holding big cups of tea, a row of tiny boots by the earthen door, golden lamplight on the walls, far outside a fox and a badger still pointing at each other under the moon, warm storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'Home again, home again! Flopsy counted noses. Six little noses, six little yawns, and not one scratch on anyone.',
        },
        {
          kind: 'image',
          art: 'tod-home',
          text: 'Six sleepy noses, all counted and kissed.',
        },
        {
          kind: 'text',
          text: 'Mrs. Rabbit poured tea for the heroes, with a honey sandwich on the side. Nobody said much, because happy is quiet.',
        },
        {
          kind: 'note',
          text: 'Ask your child: What would you give two brave friends after a rescue? Draw the treat in the air with your finger.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Far off under the moon, the fox still blamed the badger, and the badger still blamed the fox. But the babies slept in their own cradle, and the hill was peaceful all night.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Tale of Mr. Tod',
    author: 'Beatrix Potter',
    authorDeathYear: 1943,
    jurisdiction: 'US',
    basis: 'pd-us',
    note:
      'Retold in simple English for young readers; plot follows the public-domain original, played as comic neighbourly squabbling with no one hurt. Published 1912; US public domain (pre-1929) and UK public domain (Potter d. 1943, 70y pma expired 2014).',
  },
}
