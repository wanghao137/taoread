import type { PackBook } from '../types'

/**
 * Dorothy and the Wizard in Oz — L. Frank Baum (1856–1919), first published
 * 1908. Retold in five chapters in simple English for readers aged 6-8: an
 * earthquake opens the earth, and Dorothy falls with a buggy, a horse, and a
 * kitten into the underground lands — where the old Wizard falls after her.
 * Source: public domain text (published 1908, US pre-1929; Baum d. 1919).
 */
export const ozDorothy: PackBook = {
  id: 'oz-dorothy',
  title: 'Dorothy and the Wizard in Oz',
  author: 'L. Frank Baum',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'An earthquake splits the prairie open, and down goes Dorothy with a buggy, old Jim the horse, and her kitten Eureka. Far below they meet glass houses, wooden Gargoyles — and a very familiar Wizard.',
  coverArt: 'dorothy-glass',
  coverArtPrompt: 'a girl in a blue gingham dress standing beside a tall old man in a green frock coat inside a vast crystal cavern, glass towers glittering around them, a small pink kitten on her shoulder and a plough horse behind, glowing veins of light in the cavern walls, amethyst and gold light, luminous storybook illustration style',
  coverFrom: '#7E57C2',
  coverTo: '#FFD54F',
  source: 'Dorothy and the Wizard in Oz (L. Frank Baum, 1908), public domain (Baum d. 1919)',
  chapters: [
    {
      title: 'Chapter 1 · The Earthquake',
      art: 'dorothy-quake',
      artPrompt: 'a dusty prairie road splitting open beneath a small buggy, a plough horse rearing, a girl in a gingham dress and a boy holding the reins, a kitten clinging to the seat, rocks and wheat falling into the crack below, dusty golden daylight, dramatic but hopeful storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'Dorothy was going home to Kansas with her kitten, Eureka. At a dusty little station, her cousin Zeb waited with a buggy. Old Jim the horse carried them along the prairie road.',
        },
        {
          kind: 'image',
          art: 'dorothy-quake',
          text: 'The ground splits open beneath the little buggy.',
        },
        {
          kind: 'text',
          text: 'Then the ground rumbled like thunder. The whole earth split open under the wheels. Down went the buggy, the horse, the boy, and the kitten. Into the dark.',
        },
        {
          kind: 'note',
          text: 'Earthquakes are real, and it is all right to feel a shiver. You can hold my hand for this page, just like Zeb held the reins.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'They fell a long, long way. Strange lights glowed on the rocky walls. At last the buggy landed softly on a carpet of deep green grass. Not one of them was hurt.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Glass City',
      art: 'dorothy-mangaboo',
      artPrompt: 'a city of clear glass houses growing among enormous vines inside a glowing cavern, tall vegetable people with leafy heads watching from doorways, a girl and a boy leading a horse past them, small ripe people growing from the vines like fruit, soft amethyst light, wonder-filled storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'Around them stood houses made of clear glass. Little vegetable people watched from the doorways. They were the Mangaboos, and they grew on vines, like potatoes.',
        },
        {
          kind: 'image',
          art: 'dorothy-mangaboo',
          text: 'The Mangaboos watch the strangers from their glass doors.',
        },
        {
          kind: 'text',
          text: 'Soon something floated down from the high roof of the cave. It was a big basket balloon. In it sat a little bald old man. "I am the Wizard of Oz," he said.',
        },
        {
          kind: 'note',
          text: 'New word: wizard — a man who knows magic tricks and spells. Dorothy knew this Wizard from her very first trip to Oz.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The Mangaboo princess did not like visitors. "Strangers must go away," she said, in her cold glass voice. The Wizard whispered, "Never mind. Stick together, and we shall find a road out."',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Wooden Gargoyles',
      art: 'dorothy-gargoyle',
      artPrompt: 'grotesque wooden creatures with painted faces and jointed wooden wings gliding silently through an enormous gloomy cavern, a girl, a boy, an old wizard and a horse hurrying away along a rocky path, underground river glittering in the distance, eerie green-blue cave light with a warm lantern glow, suspenseful but not frightening storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'The Mangaboos pushed the travelers toward a dark tunnel. "Off you go, and do not come back," said the princess. So they walked into the deep caves under the mountains.',
        },
        {
          kind: 'image',
          art: 'dorothy-gargoyle',
          text: 'The wooden Gargoyles glide after the friends.',
        },
        {
          kind: 'text',
          text: 'In a huge cavern lived wooden creatures called Gargoyles. Their heads and wings were carved of wood, and they never spoke a word. They came gliding after the friends, silent as chairs.',
        },
        {
          kind: 'note',
          text: 'Ask your child: what sound would a wooden bird make? Tap gently on the table together and invent its wooden voice.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The friends ran on, past underground rivers and shining stones. At last, far ahead, they saw daylight. And in the Wizard\'s pocket, something snored: nine tiny piglets, fast asleep.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Trial of Eureka',
      art: 'dorothy-piglets',
      artPrompt: 'a tiny pink piglet curled asleep inside the lining of a tall silk hat held open in an old wizard\'s hands, an emerald throne room all around, a small purple kitten looking hopeful, green marble pillars and jewelled floors, warm festive light, charming storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'At last Ozma of Oz came to fetch them. She opened a hidden road with her fairy magic and led the way to the Emerald City. There was a feast, and soft beds, and shining green streets.',
        },
        {
          kind: 'image',
          art: 'dorothy-piglets',
          text: 'The missing piglet, asleep in the Wizard\'s hat.',
        },
        {
          kind: 'text',
          text: 'But oh dear — one little piglet could not be found! Everyone blamed Eureka the kitten. "She ate the piglet!" the people cried. Eureka only washed her pink ears and said nothing.',
        },
        {
          kind: 'note',
          text: 'What would you say to help a friend who is blamed for something? Think of one kind sentence you could say.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Then the Wizard looked inside his big hat. There was the piglet, fast asleep in the lining! Everyone said sorry to Eureka, and she forgave them at once, because kittens are kind.',
        },
      ],
    },
    {
      title: 'Chapter 5 · Homeward',
      art: 'dorothy-home',
      artPrompt: 'a girl in a gingham dress waving from beside a magic belt held by a fairy princess in green, a boy and a plough horse and a kitten fading into warm golden sparkles, an emerald throne room turning into a Kansas farmyard at the edge of the picture, glowing transition light, tender storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'After the happy days in the Emerald City, it was time to go. Jim the horse had grown round on emerald grass, and Zeb was ready for home.',
        },
        {
          kind: 'image',
          art: 'dorothy-home',
          text: 'Ozma waves the travelers home with her magic belt.',
        },
        {
          kind: 'text',
          text: 'Ozma held up her magic belt. "Wish," she said, "and home it shall be." In a flash, Zeb and Jim and Eureka stood by the big barn on the ranch.',
        },
        {
          kind: 'note',
          text: 'New word: ranch — a big farm with horses and wide open fields. Zeb lived on one, far away from fairyland.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Dorothy went home too, and the Wizard stayed in Oz, as Ozma\'s dear friend. "Goodbye, Dorothy," called the fairy people. "Come back whenever you wish." And she always did.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Dorothy and the Wizard in Oz',
    author: 'L. Frank Baum',
    authorDeathYear: 1919,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Published 1908; US public domain (pre-1929). Retold for children aged 6-8; plot follows the public-domain original.',
  },
}
