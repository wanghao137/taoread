import type { PackBook } from '../types'

/**
 * Japanese Fairy Tales — Yei Theodora Ozaki (1871–1932), first published 1908.
 * Four tales retold for young readers, one per chapter: Momotaro, or the Story
 * of the Son of a Peach; The Urashima Taro (retold with a gentler ending);
 * The Tongue-Cut Sparrow (the sparrow's mishap softened); and The Mouse's
 * Wedding. Plots follow the public-domain originals.
 * Source: Japanese Fairy Tales (Yei Theodora Ozaki, 1908), public domain
 * (Ozaki d. 1932; EU pma expired 2003).
 */
export const japaneseFairyTales: PackBook = {
  id: 'ozaki-japanese',
  title: 'Japanese Fairy Tales',
  author: 'Yei Theodora Ozaki',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro:
    'Four beloved Japanese tales: Momotaro, born from a peach, who marches to Oni Island with a dog, a monkey and a pheasant; the fisher Urashima Taro, who saves a tortoise and visits the Dragon Palace under the sea; a sparrow who repays an old man’s kindness; and the mouse parents who search the world for the mightiest son-in-law — and find him close to home.',
  coverArt: 'ozaki-peach',
  coverArtPrompt:
    'A giant glowing peach drifts down a sunlit mountain stream toward a smiling old washerwoman who kneels to catch it, pink blossom petals on the water; behind her, far hills, a torii gate and a little thatched farmhouse, peach trees in full bloom on the banks. Warm pink-and-gold spring light, joyful storybook style.',
  coverFrom: '#F06292',
  coverTo: '#FFF9C4',
  source: 'Japanese Fairy Tales (Yei Theodora Ozaki, 1908), public domain',
  chapters: [
    {
      title: 'Chapter 1 · Momotaro, or the Story of the Son of a Peach',
      art: 'ozaki-momotaro',
      artPrompt:
        'A small brave boy in a peach-patterned vest marches up a green mountain path waving a banner, a spotted dog at his heel carrying the satchel, a monkey tumbling playfully alongside and a pheasant flying overhead; cherry trees and a distant island fort in sea mist. Bright adventurous morning light, cheerful dynamic storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'Long ago an old woman went to the river to wash clothes, and down the stream came the biggest peach she had ever seen.',
        },
        {
          kind: 'text',
          text: 'She carried it home, and when she and her old husband cut it open — out stepped a fine baby boy! They named him Momotaro, Son of a Peach, and loved him with all their hearts.',
        },
        {
          kind: 'text',
          text: 'When Momotaro grew up, he heard of the oni — the naughty ogres of Oni Island — who stole the villagers’ treasures. "I will fetch them back," he said, and set off with the best millet dumplings in Japan.',
        },
        {
          kind: 'image',
          art: 'ozaki-momotaro',
          text: 'Momotaro marches to Oni Island with dog, monkey and pheasant.',
        },
        {
          kind: 'note',
          text: 'New word: oni — an ogre, a big noisy troublemaker of Japanese tales.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'A dog, a monkey and a pheasant each begged for a dumpling and joined him. When the oni saw such a determined little band, they gave up their stolen treasure at once, promised to be good, and Momotaro carried the jewels and the silver home in triumph to his old parents.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Urashima Taro',
      art: 'ozaki-urashima',
      artPrompt:
        'An underwater Dragon Palace of coral and mother-of-pearl: a young fisherman in country clothes gazes in wonder at a graceful sea princess who welcomes him beneath towering shell gates, golden fish streaming past like banners, the sea floor glittering with treasure chests; jellyfish lanterns hang in the blue. Luminous aqua-gold palette, dreamy magnificent storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'Urashima Taro was the kindest fisherman on the shore. One day he saw boys teasing a poor tortoise, and bought its freedom with the day’s catch.',
        },
        {
          kind: 'text',
          text: 'The tortoise, most grateful of creatures, said, "Come and see the Dragon Palace under the sea," and carried him down through the blue water.',
        },
        {
          kind: 'text',
          text: 'The palace was more splendid than a dream: walls of coral, gates of pearl, and the Princess Otohime to welcome him. Fish streamed by like banners, and every day was a festival.',
        },
        {
          kind: 'image',
          art: 'ozaki-urashima',
          text: 'Otohime welcomes Urashima Taro to the Dragon Palace.',
        },
        {
          kind: 'note',
          text: 'New word: festival — a day of feasting and celebration.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'After what seemed three happy days, Urashima remembered his old parents and his village, and went home. But under the sea the years flow differently, and three hundred had passed. He opened the princess’s parting gift, the little lacquer box — and white mist swirled round him, and his hair turned silver as foam. And the tortoise rose from the waves and said, "The palace has kept your place by the Princess all these years — come back where your story is remembered." And Urashima climbed on the tortoise’s back and returned to the sea, where they say he smiles to this day, the honoured guest of the Dragon King.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Tongue-Cut Sparrow',
      art: 'ozaki-sparrow',
      artPrompt:
        'A sparrow’s bamboo home inside a hollow tree, door open in welcome: a gentle old man bows as a cheerful sparrow in a tiny kimono offers him a small humble wicker basket, sparrows bowing in a line behind; sun-dappled forest clearing, petals drifting. Soft green-gold light, courteous sweet storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'An old man kept a pet sparrow, and loved it like his own child. But the old woman of the house was cross, and one day she shooed the sparrow so roughly that its little tongue was hurt — and the frightened bird flew away.',
        },
        {
          kind: 'text',
          text: 'The old man searched the forest, calling, until he came to the sparrow’s bamboo home, where the sparrow lived safe and well with all its sparrow family.',
        },
        {
          kind: 'text',
          text: 'The sparrows feasted him kindly and offered him a choice of baskets. "Take the small one," said the sparrow, "it holds what is best."',
        },
        {
          kind: 'image',
          art: 'ozaki-sparrow',
          text: 'The sparrow in her tiny kimono offers the small basket.',
        },
        {
          kind: 'note',
          text: 'Ask your child: the old man took the small basket. Was that greedy or wise?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'In the small basket were gold coins and bolts of silk — enough for a gentle old age. The old woman, hearing this, hurried for the big basket instead; but it held nothing but dry leaves, which scattered to the wind. She went home and apologized to the old man, and the sparrow came back to sing on their eaves every morning after.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Mouse’s Wedding',
      art: 'ozaki-mice',
      artPrompt:
        'A joyful mouse wedding procession under a full moon: bride and groom mice in tiny ceremonial kimono ride in a palanquin of woven grass carried by four mice attendants, lanterns strung between rice stalks, drummers drumming on acorn caps; the full moon smiles over the rice field. Silver-blue night with warm lantern gold, festive whimsical storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'Papa Mouse and Mama Mouse had one beloved daughter, and when she grew up they set out to find the mightiest bridegroom in the world.',
        },
        {
          kind: 'text',
          text: 'They climbed to the Sun. "You are mightiest," they said. But the Sun sighed, "A cloud can cover me — ask the Cloud." And the Cloud said, "The Wind pushes me — ask the Wind." And the Wind said, "I cannot blow through a Wall — ask the Wall."',
        },
        {
          kind: 'text',
          text: 'And the Wall listened politely and said, "I fear only the mouse who lives behind me. Ask him."',
        },
        {
          kind: 'image',
          art: 'ozaki-mice',
          text: 'The mouse parents ride home: the mightiest groom was behind the wall.',
        },
        {
          kind: 'note',
          text: 'Ask your child: which is mightiest — the Sun, the Cloud, the Wind, the Wall, or the little mouse? Why?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'So the mightiest bridegroom in all the world turned out to be the fine young mouse next door. And the wedding was held under the full moon, with lanterns between the rice stalks, and the whole field was invited.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Japanese Fairy Tales',
    author: 'Yei Theodora Ozaki',
    authorDeathYear: 1932,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Four tales retold for young readers. Published 1908; US public domain (pre-1929) and PD in the EU (Ozaki d. 1932, 70y pma expired 2003). The Urashima Taro ending is softened to a gentle homecoming in the sea palace.',
  },
}
