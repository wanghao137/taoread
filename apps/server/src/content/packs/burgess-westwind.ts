import type { PackBook } from '../types'

/**
 * Old Mother West Wind — Thornton W. Burgess (1874–1965), first published 1910.
 * Retold for young readers in six chapters: Mother West Wind brings her Merry
 * Little Breezes down to the Green Meadows, where they watch over Mrs. Redwing's
 * speckled egg, help Johnny Chuck look for the best thing in the world, cheer
 * Jimmy Skunk about his stripes, busy themselves on a summer day, and blow
 * everyone goodnight.
 * Source: Old Mother West Wind (Thornton W. Burgess, 1910), public domain
 * in the US (published pre-1929).
 */
export const motherWestWind: PackBook = {
  id: 'burgess-westwind',
  title: 'Old Mother West Wind',
  author: 'Thornton W. Burgess',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro:
    'Old Mother West Wind comes down from the Purple Hills every morning with her Merry Little Breezes tumbling behind her. Together they wake the Green Meadows, help the animals of the Smiling Pool and the Old Orchard, and share the gentlest secret of all: kindness blows farther than anyone thinks.',
  coverArt: 'westwind-valley',
  coverArtPrompt:
    'A smiling motherly figure in a soft grey shawl stands on a green hilltop at dawn, her shawl and long skirts streaming like a breeze, scattering a dozen small giggling wind-children with leaf-and-petal clothes into a valley of meadows, a sparkling pond and an old apple orchard. Swallows wheeling overhead, mist lifting, peach-and-mint morning light, classic storybook illustration.',
  coverFrom: '#81D4FA',
  coverTo: '#FFFDE7',
  source: 'Old Mother West Wind (Thornton W. Burgess, 1910), public domain',
  chapters: [
    {
      title: 'Chapter 1 · Mother West Wind Comes Down',
      art: 'westwind-down',
      artPrompt:
        'Early morning on the Green Meadows: a gentle motherly figure in a billowing grey shawl walks down a dewy hillside while a swirl of tiny laughing wind-children tumbles ahead of her, bending the grass in ripples and chasing a dandelion’s seeds. A rabbit and a groundhog peek from their burrows. Soft silver-gold dawn light, dreamy storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'Every morning, Old Mother West Wind came down from the Purple Hills. Behind her tumbled her children, the Merry Little Breezes.',
        },
        {
          kind: 'text',
          text: 'The Breezes rolled over the grass like happy puppies. They woke the flowers and tickled Grandfather Frog until he chuckled on his big stone in the Smiling Pool.',
        },
        {
          kind: 'image',
          art: 'westwind-down',
          text: 'The Merry Little Breezes tumble down the hill to wake the meadow.',
        },
        {
          kind: 'text',
          text: '"Good morning, Peter Rabbit! Good morning, Johnny Chuck!" they called. And everyone in the Green Meadows felt a little merrier.',
        },
        {
          kind: 'note',
          text: 'New word: breeze — a gentle little wind that makes the grass wave.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'For Old Mother West Wind had a rule for her children: be kind to every living thing, and every living thing will be kind to you.',
        },
      ],
    },
    {
      title: 'Chapter 2 · Mrs. Redwing’s Speckled Egg',
      art: 'westwind-redwing',
      artPrompt:
        'A bulrush tree by the Smiling Pool holding a woven nest with one pale speckled egg inside; a black bird with red shoulder patches perches protectively, while three tiny wind-children peek up from reeds below, hushing one another. Dragonflies over still water, luminous green-gold afternoon light, tender picture-book style.',
      blocks: [
        {
          kind: 'text',
          text: 'In the Old Orchard, Mrs. Redwing the blackbird had built her nest in a bulrush tree. And in that nest lay one speckled egg.',
        },
        {
          kind: 'text',
          text: 'The Merry Little Breezes were so proud. "We must rock the nest gently," they whispered, "and never, never roughly."',
        },
        {
          kind: 'text',
          text: 'So they rocked the nest, softly, softly, like a cradle on the sea. Mrs. Redwing sang her glad song, and the egg grew warmer and warmer.',
        },
        {
          kind: 'image',
          art: 'westwind-redwing',
          text: 'The Breezes rock the nest while Mrs. Redwing sings.',
        },
        {
          kind: 'note',
          text: 'New word: speckled — covered with tiny dots, like a wren’s egg.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'One bright morning, out of the egg came a hungry baby bird with a mouth open wide as a door. And the Breezes giggled, for they had rocked a song into the world.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Best Thing in the World',
      art: 'westwind-johnny',
      artPrompt:
        'A round brown groundhog stands on a sunny bank looking puzzled and hopeful while three tiny wind-children point toward a sunlit clover field; a cottontail rabbit hops alongside, and bees drift between wildflowers. Rolling green hills and a sparkling pool behind. Warm honeyed summer light, cheerful storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'One day Johnny Chuck the groundhog heard a strange thing. "What is the best thing in the world?" the Breezes asked.',
        },
        {
          kind: 'text',
          text: 'Johnny scratched his head. "I shall go and find out!" he said, and off he trundled across the Green Meadows.',
        },
        {
          kind: 'text',
          text: 'He asked Peter Rabbit, who was busy eating clover. Peter said, "Sweet clover!" But Johnny was not sure.',
        },
        {
          kind: 'text',
          text: 'He asked Grandfather Frog on his big stone. "A fat green fly," boomed Grandfather Frog. But Johnny was still not sure.',
        },
        {
          kind: 'note',
          text: 'Ask your child: what would you say is the best thing in the world?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Then Johnny Chuck came home tired, and there at his own front door sat his mother, with supper ready and a smile. And Johnny Chuck knew. The best thing in the world is being loved, right where you belong.',
        },
      ],
    },
    {
      title: 'Chapter 4 · Why Jimmy Skunk Wears Stripes',
      art: 'westwind-jimmy',
      artPrompt:
        'A dignified striped skunk stands proudly on a mossy log in dappled forest light, holding his black-and-white tail like a banner, while two tiny wind-children circle him admiringly and a puzzled young rabbit watches from the ferns. Fallen acorns and toadstools around. Soft green-gold afternoon light, gentle humorous storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'Jimmy Skunk walked slowly through the wood, and he was feeling very grand. For Jimmy wore the finest coat in the Green Forest: black, with a white stripe down his back.',
        },
        {
          kind: 'text',
          text: '"Why do you wear stripes?" asked Peter Rabbit one day. "So that everyone will see me coming," said Jimmy, "and be polite."',
        },
        {
          kind: 'text',
          text: 'The Merry Little Breezes laughed kindly. "Jimmy’s stripes are like a little flag," they told Peter. "The flag says: be gentle with your neighbours, and your neighbours will be gentle with you."',
        },
        {
          kind: 'image',
          art: 'westwind-jimmy',
          text: 'Jimmy Skunk wears his striped coat like a little flag.',
        },
        {
          kind: 'note',
          text: 'New word: dignified — calm and grand, the way Jimmy walks.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Peter thought about that for a long time. Then he hopped off to say something polite to Jimmy Skunk — and Jimmy, who is never in a hurry, smiled all the way home.',
        },
      ],
    },
    {
      title: 'Chapter 5 · A Busy Day for the Breezes',
      art: 'westwind-breezes',
      artPrompt:
        'A summer meadow busy with invisible helpers: ripples crossing a pond where a frog chuckles on a lily pad, dandelion seeds dancing in spirals, a kite of woven grass riding the wind over hay fields, laundry fluttering on a farmhouse line, and tiny wind-children as swirls of leaves and petals linking it all together. Bright breezy blue-and-gold daylight, joyful storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'One summer day the Merry Little Breezes were the busiest people in the Green Meadows.',
        },
        {
          kind: 'text',
          text: 'First they dried the rain off Peter Rabbit’s back. Then they carried a dandelion’s seeds to a new corner of the meadow, so there would be more gold next year.',
        },
        {
          kind: 'text',
          text: 'They cooled Grandfather Frog on his big stone. They pushed Mrs. Redwing along her way, and they brought the smell of the clover fields right up to Farmer Brown’s door.',
        },
        {
          kind: 'image',
          art: 'westwind-breezes',
          text: 'The Breezes help every friend in the meadow, all in one day.',
        },
        {
          kind: 'note',
          text: 'Ask your child: what little help could you give, quietly, like a breeze?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'By evening they were sleepy. "We did not make a sound all day," they said. But everyone in the meadow knew they had been there.',
        },
      ],
    },
    {
      title: 'Chapter 6 · Goodnight from the Green Meadows',
      art: 'westwind-goodnight',
      artPrompt:
        'Twilight over a peaceful valley: the motherly figure in the grey shawl gathers her sleepy little wind-children into her shawl like a basket, while meadow lights dim — a rabbit settled by its burrow, a blackbird tucking her head under her wing, frogs going quiet by the still pool. First stars over the Purple Hills, deep blue with rose-gold sky glow, lullaby-soft storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'When the sun went down, Old Mother West Wind called her children home.',
        },
        {
          kind: 'text',
          text: '"Time for sleep, my dears," she said. So the Merry Little Breezes blew one last gentle puff across the meadows.',
        },
        {
          kind: 'text',
          text: 'The puff tucked the flowers in. It rocked the nest in the bulrush tree. It curled around Johnny Chuck’s doorway like a blanket of air.',
        },
        {
          kind: 'image',
          art: 'westwind-goodnight',
          text: 'Mother West Wind gathers her sleepy Breezes into her shawl.',
        },
        {
          kind: 'note',
          text: 'New word: twilight — the soft, dim time just after the sun goes down.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Then up the Purple Hills she climbed, with all her children tucked in her shawl. And the Green Meadows slept, safe and quiet, until morning came again.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Old Mother West Wind',
    author: 'Thornton W. Burgess',
    authorDeathYear: 1965,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Retold for young readers; scenes follow the public-domain original stories. Published 1910; US public domain (pre-1929 publication). Burgess died in 1965, so EU protection has not expired — distribution outside the US should rely on the platform’s adapted-retelling basis.',
  },
}
