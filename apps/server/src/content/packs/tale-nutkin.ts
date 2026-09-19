import type { PackBook } from '../types'

/**
 * The Tale of Squirrel Nutkin — Beatrix Potter (1866–1943), first published 1903.
 * Retold for young children in four chapters: the squirrels row to Owl Island,
 * Nutkin teases Old Brown with riddles, and the owl finally loses patience.
 * Source: Project Gutenberg eBook #14847, public domain (published 1903, US pre-1929).
 */
export const squirrelNutkin: PackBook = {
  id: 'squirrel-nutkin',
  title: 'The Tale of Squirrel Nutkin',
  author: 'Beatrix Potter',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: 'Nutkin is a cheeky little red squirrel. When the squirrels row to Owl Island to gather nuts, Nutkin sings riddles at old Mr. Brown the owl — and he is not amused!',
  coverArt: 'owl-island',
  coverArtPrompt: 'a tiny island in a blue lake covered with oak and nut trees, a family of red squirrels rowing a small boat towards it, morning mist',
  coverFrom: '#BF360C',
  coverTo: '#FF8A65',
  source: 'Project Gutenberg eBook #14847, public domain (Potter d. 1943; published 1903)',
  chapters: [
    {
      title: 'Chapter 1 · Off to Owl Island',
      art: 'squirrels-boat',
      artPrompt: 'red squirrels in a small wooden boat on a blue lake, one squirrel with a curly tail rowing, an island with oak trees ahead',
      blocks: [
        {
          kind: 'text',
          text: 'Once upon a time, there was a little red squirrel whose name was Nutkin. He had a brother called Twinkleberry, and many, many cousins.',
        },
        {
          kind: 'image',
          art: 'squirrels-boat',
          text: 'The squirrels, rowing across the lake.',
        },
        {
          kind: 'text',
          text: 'They all lived at the edge of a wood, by a big lake. In the middle of the lake was an island, covered with oak trees and nut bushes.',
        },
        {
          kind: 'note',
          text: 'New word: island — land all the way round with water on every side.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"The nuts are ripe on the island," said Twinkleberry. "We will ask old Mr. Brown if we may gather some." So they made a little boat, and rowed across the water.',
        },
        {
          kind: 'text',
          text: 'Nutkin sat in the middle of the boat, singing at the top of his voice. He was a very noisy little squirrel.',
        },
      ],
    },
    {
      title: 'Chapter 2 · A Gift for Old Brown',
      art: 'old-brown-tree',
      artPrompt: 'a big grey owl with tufted ears sitting in an old hollow oak tree, three polite squirrels offering a fat vole on a leaf',
      blocks: [
        {
          kind: 'text',
          text: 'Old Brown lived in a hollow tree in the middle of the island. He was a great big owl, and he was very fierce.',
        },
        {
          kind: 'image',
          art: 'old-brown-tree',
          text: 'Old Brown the owl, in his hollow tree.',
        },
        {
          kind: 'text',
          text: 'The squirrels brought him a gift. "Good morning, Old Brown," said Twinkleberry. "Please may we gather nuts on your island?" Old Brown looked at the gift, and he nodded once.',
        },
        {
          kind: 'note',
          text: 'New word: fierce — looking cross and scary, like an owl when it is angry.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'So the squirrels ran about, filling their sacks with nuts. All of them worked hard — except Nutkin.',
        },
        {
          kind: 'text',
          text: 'Nutkin did not gather any nuts at all. He sat on a branch above Old Brown, and he sang a silly riddle: "Riddle me, riddle me, rot-tot-tine! Little brown brother, how do you dine?"',
        },
      ],
    },
    {
      title: 'Chapter 3 · Riddle Me, Riddle Me',
      art: 'nutkin-tease',
      artPrompt: 'Nutkin the squirrel hanging by his tail from a branch and blowing a dandelion puff at the owl, oak leaves floating down',
      blocks: [
        {
          kind: 'text',
          text: 'Every day the squirrels went back to the island, and every day they brought Old Brown a gift. And every day Nutkin teased him.',
        },
        {
          kind: 'image',
          art: 'nutkin-tease',
          text: 'Nutkin, teasing Old Brown with a silly riddle.',
        },
        {
          kind: 'text',
          text: 'One day Nutkin brought a green beetle, and he danced on the branch. The next day he brought a pine cone, and he sang louder than ever.',
        },
        {
          kind: 'note',
          text: 'New word: riddle — a clever little question or rhyme with an answer to guess.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Old Brown said nothing at all. He just blinked his great yellow eyes, and his feathers ruffled up around his neck.',
        },
        {
          kind: 'text',
          text: '"Old Brown is getting cross," whispered Twinkleberry. "Be quiet, Nutkin." But Nutkin would not be quiet.',
        },
        {
          kind: 'text',
          text: 'On the sixth day, Nutkin jumped right onto Old Brown’s head! "Riddle me, riddle me, rot-tot-tine!" he shouted, and he pulled the owl’s ears.',
        },
      ],
    },
    {
      title: 'Chapter 4 · Nutkin Runs for It',
      art: 'nutkin-escape',
      artPrompt: 'a squirrel scampering up a twisted tree root out of the water, a tuft of red fur in an owl’s paw above, lake and island behind',
      blocks: [
        {
          kind: 'text',
          text: 'That was too much! Old Brown grabbed Nutkin by the tail, and held him fast. "I will have you for my dinner," said the owl.',
        },
        {
          kind: 'image',
          art: 'nutkin-escape',
          text: 'Nutkin, pulling himself up the tree root to safety.',
        },
        {
          kind: 'text',
          text: 'Nutkin pulled, and pulled, and twisted this way and that — POP! His tail came off in Old Brown’s paw, and Nutkin was free!',
        },
        {
          kind: 'note',
          text: 'New word: scampered — ran with quick, light little steps, the way squirrels run.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Nutkin scrambled up the tree, jumped over the water, and ran home as fast as his legs could carry him. He never stopped once.',
        },
        {
          kind: 'text',
          text: 'After that, Nutkin was a much quieter squirrel. He never sang riddles at owls again — and if you see a red squirrel with a short, stumpy tail, it may be Nutkin himself.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Tale of Squirrel Nutkin',
    author: 'Beatrix Potter',
    authorDeathYear: 1943,
    jurisdiction: 'EU',
    basis: 'pd-70',
    sourceUrl: 'https://www.gutenberg.org/ebooks/14847',
    note: 'Published 1903; public domain in the EU (Potter d. 1943, 70y pma expired 2014) and in the US (pre-1929). Retold for young children from Project Gutenberg eBook #14847.',
  },
}
