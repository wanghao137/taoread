import type { PackBook } from '../types'

/**
 * The Tale of Jemima Puddle-Duck — Beatrix Potter (1866–1943), first published 1908.
 * Retold for young children in four chapters: Jemima wants a quiet nest, a sly
 * gentleman fox offers her his shed, and Kep the collie comes to the rescue.
 * Source: Project Gutenberg eBook #14844, public domain (published 1908, US pre-1929).
 */
export const jemimaPuddleDuck: PackBook = {
  id: 'jemima-puddleduck',
  title: 'The Tale of Jemima Puddle-Duck',
  author: 'Beatrix Potter',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: 'Jemima Puddle-Duck wants to hatch her eggs in a quiet place, far from the noisy farmyard. A polite gentleman fox says he can help — but Kep the collie is watching!',
  coverArt: 'puddle-pond',
  coverArtPrompt: 'a plump white duck with a bonnet and shawl standing by a farmyard pond, green hills and reeds behind her, soft morning mist',
  coverFrom: '#00695C',
  coverTo: '#80CBC4',
  source: 'Project Gutenberg eBook #14844, public domain (Potter d. 1943; published 1908)',
  chapters: [
    {
      title: 'Chapter 1 · A Quiet Place',
      art: 'farmyard-pond',
      artPrompt: 'a busy farmyard with hens and a farmer’s wife carrying a basket, Jemima the duck looking cross beside a wheelbarrow full of eggs',
      blocks: [
        {
          kind: 'text',
          text: 'Jemima Puddle-Duck was a simpleton. She was a fat white duck, and she laid eggs every morning in the hay-loft.',
        },
        {
          kind: 'image',
          art: 'farmyard-pond',
          text: 'Jemima in the farmyard, with the farmer’s wife.',
        },
        {
          kind: 'text',
          text: 'But she was not allowed to keep her eggs. Every day the farmer’s wife took them away, and Jemima felt very cross.',
        },
        {
          kind: 'note',
          text: 'New word: simpleton — someone who is a little bit silly, and easy to fool.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"I will make a nest far away from the farm," said Jemima. "Then nobody can take my eggs." So she waddled off down the lane.',
        },
        {
          kind: 'text',
          text: 'At the top of the lane she met a gentleman with sandy whiskers and a long tail. "Good morning, ma’am," said the gentleman fox. "Where are you going?"',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Sandy-Whiskered Gentleman',
      art: 'fox-wood',
      artPrompt: 'a fox with sandy whiskers and a bushy tail leaning on a gate, Jemima the duck looking up at him politely, dappled woodland light',
      blocks: [
        {
          kind: 'text',
          text: '"I am looking for a quiet, dry place to build my nest," said Jemima. The fox smiled a wide smile.',
        },
        {
          kind: 'image',
          art: 'fox-wood',
          text: 'The sandy-whiskered gentleman and Jemima.',
        },
        {
          kind: 'text',
          text: '"I know the very place," said the fox. "My house is in the wood, among the fox-gloves. It is dry and warm, and nobody ever goes there."',
        },
        {
          kind: 'note',
          text: 'New word: waddled — walked with short, rocking steps, the way ducks walk.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Jemima thought that sounded perfect. The fox led her through the wood to a shed, and she got to work at once.',
        },
        {
          kind: 'text',
          text: 'All afternoon she carried sticks and straw and soft feathers, until the nest was snug and round. Then she laid her eggs in it, and sat down to keep them warm.',
        },
      ],
    },
    {
      title: 'Chapter 3 · Kep the Collie',
      art: 'kep-collie',
      artPrompt: 'a black-and-white collie dog peeping through the fox-gloves at Jemima sitting on her nest, a worried look on his wise face',
      blocks: [
        {
          kind: 'text',
          text: 'While Jemima was out looking for food one day, she met Kep. Kep was a collie dog, and he was very wise.',
        },
        {
          kind: 'image',
          art: 'kep-collie',
          text: 'Kep the collie, listening to Jemima.',
        },
        {
          kind: 'text',
          text: '"Quack, quack!" said Jemima. "A kind gentleman has given me a shed for my nest." Kep’s ears stood straight up.',
        },
        {
          kind: 'note',
          text: 'New word: snug — warm, cosy, and comfortable all over.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Kep said nothing. He trotted down to the farm, and he told the farmer’s son. "A fox!" said the farmer’s son. "We will come at once."',
        },
        {
          kind: 'text',
          text: 'Back to the wood they went, Kep and the farmer’s son, and two fox-hound puppies ran along behind.',
        },
      ],
    },
    {
      title: 'Chapter 4 · Home Again',
      art: 'jemima-home',
      artPrompt: 'Jemima the duck waddling happily back up the farmyard lane, the collie and the farmer’s son behind her, evening sun over the hills',
      blocks: [
        {
          kind: 'text',
          text: 'When they came to the shed, the fox was not at home. "Out, shoo!" cried the farmer’s son, and the puppies barked and barked.',
        },
        {
          kind: 'image',
          art: 'jemima-home',
          text: 'Jemima, safe and on her way home.',
        },
        {
          kind: 'text',
          text: 'Kep found Jemima hiding behind the fox-gloves. "Come along, my dear," he said. "You must never trust a fox."',
        },
        {
          kind: 'note',
          text: 'New word: trust — to believe someone is good and will not hurt you.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Jemima waddled home as fast as her short legs could carry her. She was very glad to see the farmyard again.',
        },
        {
          kind: 'text',
          text: 'That summer, Jemima laid her eggs in the farmyard, where the farmer’s wife could keep her safe. And she never, ever spoke to sandy-whiskered gentlemen again.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Tale of Jemima Puddle-Duck',
    author: 'Beatrix Potter',
    authorDeathYear: 1943,
    jurisdiction: 'EU',
    basis: 'pd-70',
    sourceUrl: 'https://www.gutenberg.org/ebooks/14844',
    note: 'Published 1908; public domain in the EU (Potter d. 1943, 70y pma expired 2014) and in the US (pre-1929). Retold for young children from Project Gutenberg eBook #14844.',
  },
}
