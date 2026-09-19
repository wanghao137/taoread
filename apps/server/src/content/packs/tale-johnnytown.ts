import type { PackBook } from '../types'

/**
 * The Tale of Johnny Town-Mouse — Beatrix Potter (1866–1943), first published 1918.
 * Retold in very simple English for ages 3-5: a country mouse takes a nap in a
 * vegetable basket and wakes up in town. Cake and chandeliers are wonderful,
 * but the noises are terrible — and in the end, home is best, while friendship
 * travels both ways. Warm, quiet, and a little funny.
 * Source: public domain original (US pre-1929; UK, Potter d. 1943, 70y pma expired 2014).
 * Scene keys use the 'townmouse-' prefix.
 */
export const johnnyTown: PackBook = {
  id: 'tale-johnnytown',
  title: 'The Tale of Johnny Town-Mouse',
  author: 'Beatrix Potter',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro:
    'Timmy Willie the country mouse falls asleep in a vegetable basket and wakes up in town. Johnny Town-Mouse shows him cake and chandeliers — and terrible noises. Each mouse finds that home is best, and friendship travels both ways.',
  coverArt: 'townmouse-city',
  coverArtPrompt:
    'a cheerful plump town mouse in a smart bow tie standing proudly on cobblestones beside tall brick houses with glowing windows, a grand doorway and a street lamp behind him, deep blue evening sky with warm golden window light, a country lane with green hedgerows visible far away at the street corner, welcoming and bright, storybook watercolour style',
  coverFrom: '#B3E5FC',
  coverTo: '#FFE082',
  source: 'The Tale of Johnny Town-Mouse (Beatrix Potter, 1918), public domain (Potter d. 1943)',
  chapters: [
    {
      title: 'Chapter 1 · A Ride in the Basket',
      art: 'townmouse-basket',
      artPrompt:
        'a small brown field mouse fast asleep curled in a big wicker vegetable basket full of cauliflower, carrots and lettuce, the basket riding on the back of a rattling cart along a dusty lane, hedgerows blurring past, morning sunshine with floating dust motes, green fields beyond, sleepy and sweet, storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'Timmy Willie was a country mouse. One day he took a nap in a vegetable basket. It was a very cosy nest.',
        },
        {
          kind: 'image',
          art: 'townmouse-basket',
          text: 'Timmy Willie naps in the basket.',
        },
        {
          kind: 'text',
          text: 'Rumble, rumble went the cart. When Timmy Willie woke up, the hedges were gone. The basket was tipping out into a grand town kitchen!',
        },
        {
          kind: 'note',
          text: 'Ask your child: How would you feel waking up somewhere new? What is the first thing you would look for?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'He crept under the kitchen skirting board, where it was quiet and dark. Then he heard tiny footsteps coming to say hello.',
        },
      ],
    },
    {
      title: 'Chapter 2 · Cake and Noises',
      art: 'townmouse-party',
      artPrompt:
        'two mice sharing cake and cheese on the polished floor of a grand dining room at night, one sleek town mouse in a smart pose and one shy country mouse, a crystal chandelier sparkling high above, tall chair legs like a forest around them, golden candlelight and long soft shadows, festive but a little overwhelming, storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: '"Welcome!" said Johnny Town-Mouse. "You must try the cake." There was cake, and cheese, and crumbs of everything nice.',
        },
        {
          kind: 'image',
          art: 'townmouse-party',
          text: 'Johnny shows Timmy Willie the town treats.',
        },
        {
          kind: 'text',
          text: 'But oh, the noises! The cat padded by, soft as a cloud. The cook banged the doors. Something huge went whirr in the night.',
        },
        {
          kind: 'note',
          text: 'Little fact: a country mouse hears owls and rain. A town mouse hears carts and clocks. Everyone grows fond of the sounds of home.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Timmy Willie lay under the sofa and listened. "I miss my quiet hedge," he whispered. "I miss the sound of grass."',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Quiet Green',
      art: 'townmouse-country',
      artPrompt:
        'a town mouse in smart city clothes standing bewildered on a dewy green bank beside a country mouse, a huge friendly cow chewing grass in the background, bees bumbling over clover flowers, morning mist and fresh pale sunlight over rolling fields, a cosy mouse hole under a tree root nearby, fresh and peaceful, storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'Soon Timmy Willie rode home in the empty basket. The grass smelled of rain. His little door was just as he had left it.',
        },
        {
          kind: 'image',
          art: 'townmouse-country',
          text: 'Johnny visits the green and quiet country.',
        },
        {
          kind: 'text',
          text: 'In spring, Johnny Town-Mouse came to visit the country. But the cow said moo, the bees said buzz, and the dark said hush.',
        },
        {
          kind: 'note',
          text: 'Ask your child: Which do you like better, the town or the country? Which sounds would you miss?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"It is very green," said Johnny politely. "And very quiet." Timmy Willie nodded. The two friends waved goodbye, each one going home.',
        },
      ],
    },
    {
      title: 'Chapter 4 · Home Is Best',
      art: 'townmouse-home',
      artPrompt:
        'a split cosy scene of two tiny mouse homes at dusk, on the left a snug town mouse asleep in a soft cotton nest beside a warm hearth, on the right a country mouse curled in a mossy bed under a hedge root, one round moon shining gently over both the rooftops and the meadows, soft blue night with warm window glow, tender storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'So Johnny stayed in the town, with cake and clatter. And Timmy Willie stayed in the country, with clover and calm.',
        },
        {
          kind: 'image',
          art: 'townmouse-home',
          text: 'Two good friends, happy in their own homes.',
        },
        {
          kind: 'text',
          text: 'Sometimes they thought of each other. "I hope his supper is good," they said, one in the town, one under the hedge.',
        },
        {
          kind: 'note',
          text: 'Ask your child: Where do you feel most at home? Who would you like to send a kind thought to tonight?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The moon shone on the town and on the hedge. Both little beds were warm. Home is best — and friends make it sweeter.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Tale of Johnny Town-Mouse',
    author: 'Beatrix Potter',
    authorDeathYear: 1943,
    jurisdiction: 'US',
    basis: 'pd-us',
    note:
      'Retold in simple English for young readers; plot follows the public-domain original. Published 1918; US public domain (pre-1929) and UK public domain (Potter d. 1943, 70y pma expired 2014).',
  },
}
