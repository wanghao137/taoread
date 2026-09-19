import type { PackBook } from '../types'

/**
 * The Adventures of Peter Cottontail — Thornton W. Burgess (1874–1965),
 * first published 1914. Retold for young readers in six chapters: Peter wants
 * a new name, tries winter napping, learns a hunger lesson in the snow,
 * outsmarts a shadow in the brambles, visits the Old Orchard, and finds that
 * his own name suits him best.
 * Source: The Adventures of Peter Cottontail (Thornton W. Burgess, 1914),
 * public domain in the US (published pre-1929).
 */
export const peterCottontail: PackBook = {
  id: 'burgess-cottontail',
  title: 'The Adventures of Peter Cottontail',
  author: 'Thornton W. Burgess',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro:
    'Peter Rabbit of the Green Meadows decides that "Peter Cottontail" sounds grander, and off he goes looking for adventures. He tries napping all winter like a woodchuck, learns what hunger means in the snow, and discovers that the best name — and the best home — is the one he already has.',
  coverArt: 'cottontail-meadow',
  coverArtPrompt:
    'A bright-eyed cottontail rabbit sits up tall in a flowery Green Meadow, one long ear cocked, white tail flag like a small puff of cloud. Wild daisies and clover surround him, an old apple tree and a stone wall in the distance, blue hills beyond. Golden late-afternoon light, gentle warm palette, classic children’s nature-book illustration.',
  coverFrom: '#A5D6A7',
  coverTo: '#F1F8E9',
  source: 'The Adventures of Peter Cottontail (Thornton W. Burgess, 1914), public domain',
  chapters: [
    {
      title: 'Chapter 1 · Peter Wants a New Name',
      art: 'cottontail-name',
      artPrompt:
        'A cottontail rabbit stands proudly on a mossy stone in a sunlit meadow, chin up, introducing himself to a plump striped skunk and a chuckled old possum hanging by his tail from a low branch. Wildflowers nod around them. Cheerful mid-morning light, storybook style with soft greens and yellows.',
      blocks: [
        {
          kind: 'text',
          text: 'In the Green Meadows lived Peter Rabbit, with long ears and a little white tail like a puff of cotton.',
        },
        {
          kind: 'text',
          text: 'One morning Peter had an idea. "Peter Rabbit is a plain name," he said. "A fine rabbit like me should be called Peter Cottontail!"',
        },
        {
          kind: 'image',
          art: 'cottontail-name',
          text: 'Peter announces his new name to Jimmy Skunk and Unc’ Billy Possum.',
        },
        {
          kind: 'text',
          text: 'Jimmy Skunk smiled his slow smile. "A name does not change the rabbit under it," he said. But Peter was too proud to listen, and he hopped away, calling himself Cottontail at the top of his voice.',
        },
        {
          kind: 'note',
          text: 'New word: meadow — an open field full of grass and wildflowers.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'And that is how the adventures of Peter Cottontail began.',
        },
      ],
    },
    {
      title: 'Chapter 2 · Sleeping All Winter',
      art: 'cottontail-burrow',
      artPrompt:
        'The inside of a cozy underground burrow in autumn: a plump woodchuck curls up asleep in dry leaves while a curious cottontail rabbit peeks in at the entrance, frost glinting on the grass outside. Roots hang overhead like wooden rafters. Amber lantern-warm light inside against cool blue twilight, snug picture-book illustration.',
      blocks: [
        {
          kind: 'text',
          text: 'Peter went to see his friend Johnny Chuck the woodchuck. Johnny was curling up in his underground bedroom, all ready to sleep all winter long.',
        },
        {
          kind: 'text',
          text: '"How lucky you are!" said Peter. "No cold, no snow, no worries. I shall sleep all winter too!"',
        },
        {
          kind: 'text',
          text: 'Johnny Chuck yawned. "Woodchucks are made for sleeping, Peter. Rabbits are made for snowshoes and sunny winter days. But try it if you like."',
        },
        {
          kind: 'image',
          art: 'cottontail-burrow',
          text: 'Johnny Chuck curls up to sleep; Peter tries to do the same.',
        },
        {
          kind: 'note',
          text: 'New word: hibernate — to sleep through the winter, the way woodchucks do.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'So Peter curled up in his burrow, shut his eyes, and waited for sleep. But Peter’s eyes would not stay shut, and his stomach rumbled like faraway thunder.',
        },
      ],
    },
    {
      title: 'Chapter 3 · A Lesson in the Snow',
      art: 'cottontail-snow',
      artPrompt:
        'A snowy Green Meadow under a pale winter sun: a thin, hungry-looking cottontail rabbit hops along a runway between snowdrifts toward a distant farmyard where cabbage leaves peek from a snow-covered garden. Tracks stitch the snow behind him. Long blue shadows, crisp cold palette warmed by soft pink light, gentle storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'Winter came, and Peter had slept instead of eating. Now he was thin and hungry, and the snow lay deep over the meadow grass.',
        },
        {
          kind: 'text',
          text: 'Peter hopped out into the cold. Everywhere was white and quiet. His tummy rumbled again, louder this time.',
        },
        {
          kind: 'text',
          text: 'Then he remembered Farmer Brown’s garden at the edge of the fields. Under the snow lay the leaves of last autumn’s cabbage.',
        },
        {
          kind: 'image',
          art: 'cottontail-snow',
          text: 'Hungry Peter follows his memory through the snow to the farm garden.',
        },
        {
          kind: 'note',
          text: 'Ask your child: why did Peter get hungry? What should he have done in autumn?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'He dug and nibbled and nibbled and dug, until his tummy was round and warm again. "Next winter," thought Peter, "I will fill my stomach with sweet bark and buds, and let the woodchucks do the sleeping."',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Shadow in the Brambles',
      art: 'cottontail-brambles',
      artPrompt:
        'A dense blackberry thicket in soft morning light: a quick cottontail rabbit slips through a hidden tunnel under the brambles, while a slim dark shape slips past harmlessly above the canes, missing him entirely. Dew beading on blackberries, shafts of low golden sun through the branches, exciting but safe storybook mood.',
      blocks: [
        {
          kind: 'text',
          text: 'One morning Peter saw a slim shadow slide along the ground near the bramble patch. Shadow the Weasel was out hunting, and he was looking for a rabbit dinner.',
        },
        {
          kind: 'text',
          text: 'Peter did not squeal and he did not dash about. He remembered what his mother taught him.',
        },
        {
          kind: 'text',
          text: 'He froze perfectly still, grey against grey. Then, quick as a wink, he slipped backward into his bramble tunnel, where the thorns were too tight for a weasel to follow.',
        },
        {
          kind: 'image',
          art: 'cottontail-brambles',
          text: 'Peter slips down his secret tunnel while the shadow slides past.',
        },
        {
          kind: 'note',
          text: 'New word: brambles — prickly bushes full of blackberries.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The shadow slid away down the Lone Little Path. Peter nibbled a blackberry and smiled. A still body and a quick mind are a rabbit’s best friends.',
        },
      ],
    },
    {
      title: 'Chapter 5 · Friends in the Old Orchard',
      art: 'cottontail-orchard',
      artPrompt:
        'A blossoming old apple orchard full of birdsong: a cottontail rabbit sits in the grass chatting with a bright cheerful robin on a low bough, a round laughing owl dozing in a hollow, and a jolly old possum grinning from a fork of the tree. Pink-white petals drifting in the breeze, warm spring sunshine, cozy storybook scene.',
      blocks: [
        {
          kind: 'text',
          text: 'Spring came to the Green Meadows, and Peter visited the Old Orchard, where all the little people of the trees were busy.',
        },
        {
          kind: 'text',
          text: 'Peter told them about his new name. "Cottontail," he said proudly, "Peter Cottontail."',
        },
        {
          kind: 'text',
          text: 'The robin laughed a merry song, and old Johnny Chuck, awake and round again, said, "Cottontail suits you, Peter. But Rabbit suits you just as well."',
        },
        {
          kind: 'image',
          art: 'cottontail-orchard',
          text: 'Peter and his orchard friends trade stories under the apple blossoms.',
        },
        {
          kind: 'note',
          text: 'Ask your child: what do you think is the best thing about Peter’s name?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Peter thought about it all afternoon, nibbling clover in the warm sun. A name, he decided, is a fine thing to share with friends — and he had plenty to share it with.',
        },
      ],
    },
    {
      title: 'Chapter 6 · The Name He Loves',
      art: 'cottontail-home',
      artPrompt:
        'Sunset over the Green Meadows: a contented cottontail rabbit sits at the mouth of his burrow on a little knoll, silhouetted against an amber sky, wild grasses glowing gold around him. The Smiling Pool sparkles in the distance and the Old Orchard darkens to purple. Warm honeyed light, peaceful homecoming mood, storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'That evening Peter sat by his own front door and watched the sun go down over the Green Meadows.',
        },
        {
          kind: 'text',
          text: 'He thought about his winter lesson, and his clever escape, and his friends in the orchard.',
        },
        {
          kind: 'text',
          text: '"I am Peter Rabbit," he said softly. "And I am Peter Cottontail too. Both names belong to me, and both belong right here."',
        },
        {
          kind: 'image',
          art: 'cottontail-home',
          text: 'Peter watches the sunset from his own front door.',
        },
        {
          kind: 'note',
          text: 'Ask your child: Peter went looking for a new self. What did he find instead?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Then he thumped his big hind feet, twice, for joy — and all the Green Meadows knew that Peter was home.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Adventures of Peter Cottontail',
    author: 'Thornton W. Burgess',
    authorDeathYear: 1965,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Retold for young readers. Published 1914; US public domain (pre-1929 publication). Burgess died in 1965, so EU protection has not expired — distribution outside the US should rely on the platform’s adapted-retelling basis.',
  },
}
