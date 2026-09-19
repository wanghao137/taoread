import type { PackBook } from '../types'

/**
 * The Wonderful Wizard of Oz — five chapters retold for young English readers.
 * Text: Project Gutenberg eBook #55 (L. Frank Baum, 1900). Public domain in the US
 * (pre-1929) and worldwide (Baum died 1919). Plot and characters follow the original
 * book (silver shoes, Wicked Witches of East and West); wording simplified into
 * short sentences for children aged 6–8.
 */
export const wizardOfOz: PackBook = {
  id: 'wizard-oz',
  title: 'The Wonderful Wizard of Oz',
  author: 'L. Frank Baum',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'A cyclone carries Dorothy and her little dog Toto far away to a strange land. To get home, she must follow the yellow brick road to the wonderful Wizard of Oz.',
  coverArt: 'yellow-brick-road',
  coverArtPrompt: 'a girl in a blue and white checked dress and silver shoes walking on a sparkling yellow brick road with a scarecrow, a tin woodman and a lion, green towers and a shining emerald city in the distance',
  coverFrom: '#1B5E20',
  coverTo: '#A5D6A7',
  source: 'Project Gutenberg eBook #55, public domain (Baum d. 1919)',
  chapters: [
    {
      title: 'Chapter 1 · The Cyclone',
      art: 'kansas-prairie',
      artPrompt: 'a little gray house on a flat prairie with a girl and her dog at the door, a dark whirling cyclone funnel in the gray sky behind it',
      blocks: [
        {
          kind: 'text',
          text: 'Dorothy lived in the middle of the great gray prairie of Kansas with Uncle Henry and Aunt Em. The sun made the long grass gray, and the paint on the little house was gray too.',
        },
        {
          kind: 'image',
          art: 'kansas-prairie',
          text: 'The little gray house on the prairie, and Dorothy with her dog Toto.',
        },
        {
          kind: 'text',
          text: 'One day the sky grew very dark. The wind began to howl. Uncle Henry cried, "There’s a cyclone coming! Run for the cellar!" Dorothy could not reach the cellar in time.',
        },
        {
          kind: 'note',
          text: 'New word: cyclone — a very strong wind that spins round and round and can lift a house into the air.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Dorothy caught Toto in her arms and sat down on the floor. The house rose up in the air and spun around and around, higher and higher, until it was carried far, far away.',
        },
        {
          kind: 'text',
          text: 'At last the house came down with a soft bump. Dorothy opened the door and looked out. She saw a beautiful green country, full of bright flowers and little streams. It was the Land of the Munchkins.',
        },
        {
          kind: 'text',
          text: 'A little old woman in a white hat thanked Dorothy. The house had fallen right on the Wicked Witch of the East, and the little people were free at last! On the witch’s feet Dorothy found a pair of silver shoes.',
        },
      ],
    },
    {
      title: 'Chapter 2 · Meeting the Scarecrow',
      art: 'scarecrow-field',
      artPrompt: 'a smiling straw scarecrow on a pole in a golden cornfield, a girl in a blue dress waving up at him, a yellow brick road in the distance',
      blocks: [
        {
          kind: 'text',
          text: 'The little woman told Dorothy to follow the road of yellow brick to the Emerald City. There the great Wizard, Oz himself, might tell her how to go home again.',
        },
        {
          kind: 'image',
          art: 'scarecrow-field',
          text: 'A scarecrow on a pole in a cornfield, waving one stuffed hand at Dorothy.',
        },
        {
          kind: 'text',
          text: 'On the way, Dorothy saw a Scarecrow stuck on a high pole. "Good day," it said in a cheerful voice. "Please let me down, and I will come with you." Dorothy lifted the Scarecrow over the corn and set him on the road.',
        },
        {
          kind: 'note',
          text: 'New word: pole — a long, round wooden stick. The Scarecrow was tied to one in the field.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"I have no brains," said the Scarecrow, "only straw. If the Wizard of Oz will give me brains, I shall be the happiest man in the world." So Dorothy and the Scarecrow walked on together.',
        },
        {
          kind: 'text',
          text: 'That night they slept in a little house by the road. In the morning they would go on to the Emerald City, where the Wizard lived behind walls of green marble.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Tin Woodman and the Cowardly Lion',
      art: 'tin-woodman',
      artPrompt: 'a shiny tin woodman standing rusted among green trees with his axe raised, a girl oiling his arm with a little oil-can',
      blocks: [
        {
          kind: 'text',
          text: 'The next day they heard a strange groan from the trees. A man made all of shiny tin stood there, his axe raised and his jaw stuck fast. He could not move.',
        },
        {
          kind: 'image',
          art: 'tin-woodman',
          text: 'The Tin Woodman, stuck in the wood with his axe raised high.',
        },
        {
          kind: 'text',
          text: 'Dorothy found an oil-can and oiled his joints. "Thank you!" said the Tin Woodman. "I have rusted here for a whole year. I am going to ask the Wizard for a heart, for I have none."',
        },
        {
          kind: 'note',
          text: 'New word: rust — the rough red-brown stuff that grows on metal when it gets wet. Oil makes it go away.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'A little later a great Lion jumped out at them and roared. Toto hid behind Dorothy. But the Lion began to cry, for he was a coward. "I have no courage at all," he said. "May I come with you to the Wizard?"',
        },
        {
          kind: 'text',
          text: 'Now they were four: Dorothy and Toto, the Scarecrow who wanted brains, the Tin Woodman who wanted a heart, and the Lion who wanted courage. Together they followed the yellow brick road.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Wicked Witch of the West',
      art: 'witch-castle',
      artPrompt: 'a dark stone castle door where a green-skinned witch peers out at a girl holding a basin of water, winged monkeys circling the towers',
      blocks: [
        {
          kind: 'text',
          text: 'The Wicked Witch of the West saw them coming. She blew once on her silver whistle, and forty wolves ran at them. The Tin Woodman chopped their heads off, one after another.',
        },
        {
          kind: 'image',
          art: 'witch-castle',
          text: 'The Witch of the West looking out from the door of her dark castle.',
        },
        {
          kind: 'text',
          text: 'She blew again, and a swarm of black crows filled the sky. The Scarecrow caught them and twisted their necks. Then the Witch called her Winged Monkeys, who carried them all away to her castle.',
        },
        {
          kind: 'note',
          text: 'New word: capture — to catch someone and not let them go. The Monkeys captured Dorothy and her friends.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The Witch put a silver basin in the corner of the kitchen. "Wash these pots," she told Dorothy, and made her work hard, for the girl had the silver shoes and the Witch was afraid of the dark mark on her forehead, left by the kiss of the good Witch of the North.',
        },
        {
          kind: 'text',
          text: 'One day the Witch tried to take one of the silver shoes. Dorothy was so angry that she seized the basin of water and threw it over the Witch. "Look what you have done!" screamed the Witch. "I am melting!" And she melted away like brown sugar.',
        },
        {
          kind: 'text',
          text: 'Dorothy took the Witch’s Golden Cap. When she spoke the charm, the Winged Monkeys came and carried her and all her friends safely back toward the Emerald City.',
        },
      ],
    },
    {
      title: 'Chapter 5 · Going Home',
      art: 'silver-shoes',
      artPrompt: 'a pair of silver shoes glinting in green grass, a girl with a dog in her arms standing before a good witch in a white dress and a silk balloon in the distance',
      blocks: [
        {
          kind: 'text',
          text: 'In the Emerald City the great Wizard Oz made the Scarecrow a head full of pins and needles, gave the Tin Woodman a beautiful silk heart, and poured courage for the Lion out of a green bottle. But when Dorothy asked to go home, Oz was slow to answer.',
        },
        {
          kind: 'image',
          art: 'silver-shoes',
          text: 'Dorothy’s silver shoes, shining in the grass.',
        },
        {
          kind: 'text',
          text: 'At last Oz built a great balloon of green silk to carry them both home. But when it rose into the sky, Toto ran after a butterfly, and Dorothy ran after Toto. The ropes broke, and Oz floated away alone.',
        },
        {
          kind: 'note',
          text: 'New word: humbug — someone who pretends to be something he is not. The Wizard was a humbug, but a kind one.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Dorothy called the Winged Monkeys again, but they could not cross the desert. So they went south, to the country of the Quadlings, to ask Glinda, the Good Witch of the South.',
        },
        {
          kind: 'text',
          text: 'Glinda smiled at Dorothy. "The silver shoes have carried you over the desert," she said. "If you had known their power, you could have gone home the very first day!"',
        },
        {
          kind: 'text',
          text: 'Dorothy kissed her friends good-bye. Then she clicked the heels of the silver shoes together three times and said, "Take me home to Aunt Em!" In three swift steps she was back on the gray prairie, and Aunt Em folded her in her arms at last.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Wonderful Wizard of Oz',
    author: 'L. Frank Baum',
    authorDeathYear: 1919,
    jurisdiction: 'US',
    basis: 'pd-70',
    sourceUrl: 'https://www.gutenberg.org/ebooks/55',
    note: 'Published 1900; US public domain (pre-1929) and worldwide (Baum d. 1919, 70y pma expired). Plot follows Project Gutenberg eBook #55; wording simplified into short sentences for young English readers.',
  },
}
