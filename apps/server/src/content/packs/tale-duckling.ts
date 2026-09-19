import type { PackBook } from '../types'

/**
 * The Ugly Duckling — retold for children aged 3-5 in five gentle chapters.
 * Source: Project Gutenberg eBook #27100, "Fairy Tales of Hans Christian
 * Andersen" (1843). Andersen died 1875; public domain in the EU and worldwide
 * under the 70-years-after-death rule (pd-70). Retold in short, easy English.
 */
export const uglyDuckling: PackBook = {
  id: 'andersen-duckling',
  title: 'The Ugly Duckling',
  author: 'Hans Christian Andersen',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: 'One egg in the duck’s nest is bigger than all the others. When it cracks, out steps a funny, fluffy, grey baby duck — and nobody knows who he really is…',
  coverArt: 'duckling-pond',
  coverArtPrompt: 'a mother duck with six yellow ducklings on a blue pond, one big grey fluffy duckling looking puzzled, green reeds and white water lilies, a sunny farmyard in the background',
  coverFrom: '#6A1B9A',
  coverTo: '#CE93D8',
  source: 'Project Gutenberg eBook #27100, public domain (Andersen d. 1875)',
  chapters: [
    {
      title: 'Chapter 1 · The Big Egg',
      art: 'duck-eggs',
      artPrompt: 'a mother duck sitting on a nest of five small white eggs and one much bigger egg, yellow ducklings already walking around her in the green grass by a pond',
      blocks: [
        {
          kind: 'text',
          text: 'It was lovely summer weather in the country. The corn was yellow, the oats were green, and the hay was stacked in the fields. A mother duck sat on her nest of eggs, waiting and waiting for her babies to come out.',
        },
        {
          kind: 'image',
          art: 'duck-eggs',
          text: 'Mother Duck sits on her nest of eggs — one is much bigger than the others.',
        },
        {
          kind: 'text',
          text: '"Peep! Peep!" Five bright little ducklings popped out, all yellow and fluffy. But there was still one egg left — the biggest of all, and it would not crack. The old duck next door looked at it and shook her head.',
        },
        {
          kind: 'note',
          text: 'New word: nest — the soft bowl of grass and feathers that a bird keeps her eggs in.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"It is a turkey egg," said the old duck. "Leave it alone." But the mother duck shook her head. "I have sat on it this long," she said. "I will sit a little longer."',
        },
        {
          kind: 'text',
          text: 'At last the big egg cracked. Out tumbled a big, grey, fluffy baby. "How big and grey you are!" said his mother. But she loved him just as much as the others, and took them all down to the pond.',
        },
      ],
    },
    {
      title: 'Chapter 2 · Nobody Wants Me',
      art: 'duckling-sad',
      artPrompt: 'a big grey duckling standing alone at the edge of a farmyard pond, other ducklings and chickens turning away, a sad face, autumn leaves on the ground',
      blocks: [
        {
          kind: 'text',
          text: 'At first everything was fine. The grey duckling could swim as well as any of them. "He is a fine swimmer," said his mother. But the farmyard animals were not so kind.',
        },
        {
          kind: 'text',
          text: '"Look at him!" cried the other ducklings, and they pecked him. The chickens pecked him too, and the turkey gobbled, "He is so ugly!" Even his brothers and sisters whispered, "We wish you would go away."',
        },
        {
          kind: 'note',
          text: 'New word: peck — when a bird gives a quick little bite with its beak.',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'duckling-sad',
          text: 'The poor duckling is all alone in the farmyard.',
        },
        {
          kind: 'text',
          text: 'The poor duckling was very sad. One night, when everyone was asleep, he slipped out of the farmyard and ran away over the dark fields.',
        },
        {
          kind: 'text',
          text: 'He walked and walked until he came to a wide marsh, where wild ducks lived. He was so tired that he lay down in the soft reeds and slept there all night.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Long Cold Winter',
      art: 'duckling-winter',
      artPrompt: 'a grey duckling huddled in the snow beside a frozen pond, grey sky, bare brown branches, a little cottage with smoke rising in the distance',
      blocks: [
        {
          kind: 'text',
          text: 'The wild ducks were friendly. "You are ugly," they said, "but that does not matter to us. Stay with us." But soon the hunters came with their dogs, and bang! went their guns. The duckling hid in the reeds and did not come out for days.',
        },
        {
          kind: 'image',
          art: 'duckling-winter',
          text: 'Winter comes, and the pond freezes hard.',
        },
        {
          kind: 'note',
          text: 'New word: frozen — turned hard and cold, like ice on a pond in winter.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'When he left the marsh he found a little cottage. An old woman, a cat, and a hen lived there. They looked at him sideways. "Can you lay eggs?" asked the hen. "No," said the duckling. "Then you are no use at all," she said, and the duckling went away again.',
        },
        {
          kind: 'text',
          text: 'Then winter came in earnest. The wind howled and the snow fell. The poor duckling waded in the cold water to keep from freezing, and at last he curled up under a snow-covered bush and slept through the whole long winter.',
        },
        {
          kind: 'text',
          text: 'He dreamed of warm sunshine and clear blue water — and of a family of his own, somewhere far away.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Beautiful Birds',
      art: 'duckling-swans',
      artPrompt: 'three beautiful white swans with long curved necks gliding on a blue lake in spring sunshine, a grey duckling hiding in the green reeds and watching them with big amazed eyes',
      blocks: [
        {
          kind: 'text',
          text: 'At last the warm sun came back. The snow melted, and the duckling stretched his wings. He flew up into the air, and his wings were strong — stronger than he had ever felt.',
        },
        {
          kind: 'image',
          art: 'duckling-swans',
          text: 'The duckling sees three beautiful white swans on the lake.',
        },
        {
          kind: 'note',
          text: 'New word: graceful — moving in a beautiful, easy way, like a swan on the water.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'He came down on a big blue lake. There, swimming towards him, were three beautiful white birds, with long curved necks and soft shining feathers. "I have never seen anything so beautiful," he whispered.',
        },
        {
          kind: 'text',
          text: 'The beautiful birds came close, and the duckling bowed his head. He looked down into the clear water — and saw his own picture. He was not a grey duckling any more. He was a swan!',
        },
        {
          kind: 'text',
          text: '"You are one of us!" cried the swans, and they stroked his feathers with their beaks. He had never been so happy in all his life.',
        },
      ],
    },
    {
      title: 'Chapter 5 · Home at Last',
      art: 'swan-children',
      artPrompt: 'a beautiful white swan swimming with three swan cygnets behind him in a blue pond inside a sunny garden, children standing on the bank tossing bread, red roses and green trees',
      blocks: [
        {
          kind: 'text',
          text: 'One warm day some children came running to the lake. "Look, look!" they cried. "A new swan — the most beautiful of them all!" And they threw bread and cake into the water for him.',
        },
        {
          kind: 'image',
          art: 'swan-children',
          text: 'The children feed the beautiful new swan.',
        },
        {
          kind: 'text',
          text: 'The young swan was so happy he did not know what to do. He swam round and round, and the other swans bowed to him as they passed.',
        },
        {
          kind: 'text',
          text: 'Then a little old duck waddled down to the bank with her yellow ducklings. The swan looked at her kindly. "She was never really my mother," he thought, "but she sat on my egg when no one else would." And he swam over and bowed his head to her.',
        },
        {
          kind: 'note',
          text: 'New word: hatched — the moment a baby bird comes out of its egg.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The old duck looked at him with surprise — and then with joy. "You hatched from that big egg," she said softly. "I knew you were special. How beautiful you have grown!"',
        },
        {
          kind: 'text',
          text: 'And the swan who had been an ugly duckling lived happily ever after, in the warm sunshine, with friends who loved him just as he was.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Ugly Duckling',
    author: 'Hans Christian Andersen',
    authorDeathYear: 1875,
    jurisdiction: 'EU',
    basis: 'pd-70',
    sourceUrl: 'https://www.gutenberg.org/ebooks/27100',
    note: 'Retold for young children from the 1843 original.',
  },
}
