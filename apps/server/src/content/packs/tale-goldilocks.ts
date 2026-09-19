import type { PackBook } from '../types'

/**
 * Goldilocks and the Three Bears — traditional English folktale, retold for young
 * children in four chapters. A little girl with golden hair walks into the bears’
 * cottage while they are out, and tries everything that is "just right".
 * Source: traditional folk tale ("The Story of the Three Bears", 1837), public domain.
 */
export const goldilocks: PackBook = {
  id: 'goldilocks',
  title: 'Goldilocks and the Three Bears',
  author: 'Traditional folktale',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: 'While the three bears are out for a walk, a little girl with golden curls slips into their cottage. She tastes the porridge, sits in the chairs, and tries all the beds!',
  coverArt: 'bears-cottage',
  coverArtPrompt: 'a cosy wooden cottage in a green forest clearing, three bears of different sizes walking away down a path, golden afternoon light',
  coverFrom: '#F9A825',
  coverTo: '#FFE082',
  source: 'Traditional English folktale, retold for young children',
  chapters: [
    {
      title: 'Chapter 1 · A Walk in the Forest',
      art: 'bears-cottage',
      artPrompt: 'three brown bears — a big one a middle one and a tiny one — walking along a forest path, their cottage with smoke from the chimney behind them',
      blocks: [
        {
          kind: 'text',
          text: 'Once upon a time, three brown bears lived in a cottage in the forest. There was a great big Papa Bear, a middle-sized Mama Bear, and a tiny little Baby Bear.',
        },
        {
          kind: 'image',
          art: 'bears-cottage',
          text: 'The three bears, out for a walk in the forest.',
        },
        {
          kind: 'text',
          text: 'One morning they made three bowls of porridge for breakfast. But the porridge was too hot, so they left it to cool and went for a walk.',
        },
        {
          kind: 'note',
          text: 'New word: porridge — a warm, soft breakfast food made by boiling oats in milk or water.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'While they were gone, a little girl came to the cottage. Her hair was the colour of gold, and everyone called her Goldilocks.',
        },
        {
          kind: 'text',
          text: 'She knocked on the door. Nobody answered. So she pushed it open and walked right in.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Three Bowls',
      art: 'porridge-table',
      artPrompt: 'a wooden table with three bowls of porridge of different sizes, Goldilocks tasting from the tiny bowl, a spoon in her hand',
      blocks: [
        {
          kind: 'text',
          text: 'Goldilocks saw three bowls of porridge on the table. "I am so hungry," she said, and she tasted the porridge in the great big bowl.',
        },
        {
          kind: 'image',
          art: 'porridge-table',
          text: 'The three bowls of porridge on the bears’ table.',
        },
        {
          kind: 'text',
          text: '"Ouch! This porridge is too hot!" she cried. Then she tasted the middle-sized bowl. "This porridge is too cold."',
        },
        {
          kind: 'note',
          text: 'New word: too — more than you want. Too hot means it is hotter than you would like.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Then she tasted the tiny little bowl. "Mmm! This porridge is just right!" And she ate it all up, every last spoonful.',
        },
        {
          kind: 'text',
          text: 'After her breakfast, Goldilocks felt tired. She went into the parlour and found three chairs.',
        },
      ],
    },
    {
      title: 'Chapter 3 · Chairs and Beds',
      art: 'bear-bedroom',
      artPrompt: 'a bedroom with three beds of different sizes, Goldilocks fast asleep in the tiny bed, three colourful quilts',
      blocks: [
        {
          kind: 'text',
          text: 'Goldilocks sat in the great big chair. "This chair is too hard!" Then she sat in the middle-sized chair. "This chair is too soft!"',
        },
        {
          kind: 'image',
          art: 'bear-bedroom',
          text: 'The three beds, all made and waiting.',
        },
        {
          kind: 'text',
          text: 'Then she sat in the tiny little chair. "This chair is just right!" But she wiggled and wiggled until — crack! — the little chair broke to pieces.',
        },
        {
          kind: 'note',
          text: 'New word: wiggled — moved from side to side, small and quick.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Upstairs she found three beds. The great big bed was too hard. The middle-sized bed was too soft. But the tiny little bed was just right.',
        },
        {
          kind: 'text',
          text: 'Goldilocks laid her head on the small pillow, pulled up the quilt, and fell fast asleep.',
        },
      ],
    },
    {
      title: 'Chapter 4 · Somebody Has Been Here!',
      art: 'bears-home',
      artPrompt: 'three bears standing around the tiny bed looking surprised, Goldilocks just waking up with wide eyes, morning light through the window',
      blocks: [
        {
          kind: 'text',
          text: 'Soon the three bears came home, and their porridge had gone cold. "Somebody has been eating my porridge!" grumbled Papa Bear.',
        },
        {
          kind: 'image',
          art: 'bears-home',
          text: 'The three bears come home and find the little bed is not empty.',
        },
        {
          kind: 'text',
          text: '"Somebody has been sitting in my chair!" said Mama Bear. "And somebody has broken my little chair!" wailed Baby Bear.',
        },
        {
          kind: 'note',
          text: 'New word: wailed — cried out in a loud, sad voice.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Up they went to the bedroom. "Somebody has been sleeping in my bed — and she is still here!" whispered Baby Bear.',
        },
        {
          kind: 'text',
          text: 'Goldilocks woke up and saw three bears looking down at her. She jumped out of bed, ran down the stairs, out of the door, and into the forest — and the three bears never saw her again.',
        },
        {
          kind: 'text',
          text: 'After that day, Goldilocks always knocked and waited before she went into anybody’s house.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Goldilocks and the Three Bears',
    author: 'Traditional folktale',
    jurisdiction: 'US',
    basis: 'adapted',
    note: 'Traditional folktale, retold for young children',
  },
}
