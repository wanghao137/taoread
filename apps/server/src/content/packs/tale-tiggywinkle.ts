import type { PackBook } from '../types'

/**
 * The Tale of Mrs. Tiggy-Winkle — retold in short simple sentences for very young readers.
 * Text: The Tale of Mrs. Tiggy-Winkle (Beatrix Potter, 1905). Public domain in the US
 * (pre-1929) and in the UK (Potter died 1943; 70y pma expired 2014). Plot follows the
 * original story; wording simplified for children aged 3-5.
 */
export const mrsTiggyWinkle: PackBook = {
  id: 'tale-tiggywinkle',
  title: 'Mrs. Tiggy-Winkle',
  author: 'Beatrix Potter',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: 'Little Lucie has lost her pocket-handkerchiefs. She climbs up the hill, and up the hill, until she finds a tiny door — and the most wonderful little washhouse in the world.',
  coverArt: 'tiggy-washhouse',
  coverArtPrompt: 'a tiny whitewashed cottage with a little door set into a green hillside, small linen garments drying on a line, a hedgehog in a striped petticoat and a white cap ironing at a low window',
  coverFrom: '#2E7D32',
  coverTo: '#A5D6A7',
  source: 'The Tale of Mrs. Tiggy-Winkle (Beatrix Potter, 1905), public domain (Potter d. 1943)',
  chapters: [
    {
      title: 'Chapter 1 · Lucie Looks for Her Handkerchiefs',
      art: 'lucie-hill',
      artPrompt: 'a small girl in a blue pinafore climbing a steep green hill among rocks and sheep, calling out, a flock of sheep and a little crow on a gate, soft hillside light',
      blocks: [
        {
          kind: 'text',
          text: 'Once there was a little girl called Lucie. She lived on a farm called Little-town. Lucie had lost three pocket-handkerchiefs and a pinafore. She looked everywhere.',
        },
        {
          kind: 'image',
          art: 'lucie-hill',
          text: 'Lucie climbing up the hill, calling for her handkerchiefs.',
        },
        {
          kind: 'text',
          text: 'She asked the cock, and the hen, and the turkeys. Nobody had seen them. She asked the sheep on the hill, but they only said "Baa!" So Lucie climbed up the hill, and up the hill, and up the hill.',
        },
        {
          kind: 'note',
          text: 'Fun word: handkerchief — a little cloth for your nose and pocket. Have you ever lost one?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'At the very top of the hill, Lucie found a little door in the rock. It was a very small door, hardly big enough for a girl. Lucie knocked. Nobody came. So she lifted the latch, and went in.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Little Washhouse',
      art: 'washhouse-ironing',
      artPrompt: 'a tiny kitchen with a low ceiling, a copper wash-boiler over a fire, small linen petticoats and stockings hanging from a line, a hedgehog laundress with a long nose ironing at a table',
      blocks: [
        {
          kind: 'text',
          text: 'Inside it was a tiny kitchen, clean and white. A fire was burning, and little clothes were drying on a line. And there, at the table, stood a little old woman. She had a long nose, and a striped petticoat, and a white cap.',
        },
        {
          kind: 'image',
          art: 'washhouse-ironing',
          text: 'Mrs. Tiggy-Winkle ironing the tiny clothes.',
        },
        {
          kind: 'text',
          text: '"Who are you?" asked Lucie. "I am Mrs. Tiggy-Winkle," said the little woman. Oh! Lucie saw it now. Mrs. Tiggy-Winkle was a hedgehog! Her prickles were all wrapped up in a big shawl, so they would not tear the clothes.',
        },
        {
          kind: 'note',
          text: 'Fun word: laundress — someone who washes and irons clothes. Mrs. Tiggy-Winkle is the best laundress on the hill.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Mrs. Tiggy-Winkle showed Lucie the clean clothes. Here were the pinafores and handkerchiefs, all folded and white! Lucie was very glad. She helped to shake out the stockings, and they pegged them on the line together.',
        },
        {
          kind: 'text',
          text: 'They had a little tea together — bread and butter and a saucer of milk. And then Mrs. Tiggy-Winkle tied up the bundle of clean clothes.',
        },
      ],
    },
    {
      title: 'Chapter 3 · Up the Hill and Away',
      art: 'hedgehog-cap',
      artPrompt: 'a hedgehog in a striped petticoat and white cap running up a green hill on short legs, carrying a bundle tied in a cloth, a small girl with a basket following, a bright sunset',
      blocks: [
        {
          kind: 'text',
          text: '"Come along," said Mrs. Tiggy-Winkle. "I will carry the bundle part of the way." And away they went, up the hill, the little hedgehog running on her short legs, and Lucie behind her.',
        },
        {
          kind: 'image',
          art: 'hedgehog-cap',
          text: 'Mrs. Tiggy-Winkle running up the hill with the bundle.',
        },
        {
          kind: 'text',
          text: 'They came to a high place where the sheep were. "Goodbye, little girl!" said Mrs. Tiggy-Winkle. She gave Lucie the bundle, and ran back down the hill, faster and faster, till she was only a small brown ball rolling away.',
        },
        {
          kind: 'note',
          text: 'Hedgehogs roll up into a ball when they are in a hurry. Can you curl up small like a hedgehog?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Lucie walked home with her clean handkerchiefs. And when she got back, she found the sheep had all come down the hill, and there were pins and pegs in the strangest places. But she never told anyone where she had been.',
        },
        {
          kind: 'text',
          text: 'Some people say that Mrs. Tiggy-Winkle is only a hedgehog, and that Lucie dreamed it all. But Lucie has the clean handkerchiefs to this day. And if you go up the hill on a washing day, you may still find the little door.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Tale of Mrs. Tiggy-Winkle',
    author: 'Beatrix Potter',
    authorDeathYear: 1943,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Retold in simple English for young readers; plot follows the public-domain original. Published 1905; US public domain (pre-1929) and UK public domain (Potter d. 1943, 70y pma expired).',
  },
}
