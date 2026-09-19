import type { PackBook } from '../types'

/**
 * The Tale of Mr. Jeremy Fisher — Beatrix Potter (1866–1943), first published 1906.
 * Retold in very simple English for ages 3-5: a frog goes fishing for minnows,
 * meets a splash and a scare, and finds that supper with friends is best of all.
 * Source: public domain original (US pre-1929; UK, Potter d. 1943, 70y pma expired 2014).
 * Scene keys use the 'mrjeremy-' prefix.
 */
export const mrJeremy: PackBook = {
  id: 'tale-mrjeremy',
  title: 'The Tale of Mr. Jeremy Fisher',
  author: 'Beatrix Potter',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro:
    'Jeremy Fisher is a frog who lives beside a quiet pond. One rainy day he goes fishing for minnows. He finds a splash, a little scare, and a cosy supper with friends instead.',
  coverArt: 'mrjeremy-pond',
  coverArtPrompt:
    'a small green frog in a yellow mackintosh standing upright on a lily pad in the middle of a quiet pond, holding a thin bamboo fishing rod over rain-dotted sparkling water, white water-lilies and tall rushes framing the edges, soft grey hills behind rainy clouds with one thin ribbon of gold light on the horizon, gentle storybook watercolour style, quiet, hopeful and cosy',
  coverFrom: '#4FC3F7',
  coverTo: '#F8BBD0',
  source: 'The Tale of Mr. Jeremy Fisher (Beatrix Potter, 1906), public domain (Potter d. 1943)',
  chapters: [
    {
      title: 'Chapter 1 · A Rainy Day',
      art: 'mrjeremy-lily',
      artPrompt:
        'a small green frog in a yellow mackintosh and shiny boots sitting in a boat made of a lily pad on a calm pond, holding a thin bamboo fishing rod, raindrops making silver rings on dark water, white water-lilies and tall green rushes all around, grey morning clouds with one soft ribbon of gold light, gently rippling, storybook watercolour style, calm and cosy',
      blocks: [
        {
          kind: 'text',
          text: 'Mr. Jeremy Fisher was a frog. He lived in a little damp house under a water-lily root. The rain went pitter-patter on his roof.',
        },
        {
          kind: 'image',
          art: 'mrjeremy-lily',
          text: 'Jeremy in his lily-pad boat, ready to fish.',
        },
        {
          kind: 'text',
          text: '"What shall I have for supper?" said Jeremy. "I will go fishing for minnows. Little fish are very nice indeed." He put on his yellow mackintosh and took his rod.',
        },
        {
          kind: 'note',
          text: 'Ask your child: If you went fishing in a pond, what would you hope to catch? You may invent the silliest fish you like.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'He pushed his lily pad out into the pond. The rain pattered, the rushes nodded, and Jeremy began to fish.',
        },
      ],
    },
    {
      title: 'Chapter 2 · A Very Big Splash',
      art: 'mrjeremy-fish',
      artPrompt:
        'a wet green frog leaping away from a big silver trout bursting out of the pond water, sparkling drops flying everywhere in a wide arc, a bamboo rod and a picnic basket tumbling from a tipped-over lily pad, reeds bending in the breeze, grey rainy light with bright white splash highlights, playful storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'For a long time Jeremy caught nothing at all. Then something tiny nipped his toe. A little spiny fish had found him!',
        },
        {
          kind: 'image',
          art: 'mrjeremy-fish',
          text: 'The little fish makes Jeremy jump.',
        },
        {
          kind: 'text',
          text: '"Ouch!" cried Jeremy, and he hopped. Just then a great fish sprang out of the water. Splash! Jeremy jumped too, straight into the pond.',
        },
        {
          kind: 'note',
          text: 'Little fact: fish that leap and splash are called trout. They like rainy days almost as much as frogs do.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The water was soft, and not too cold. Jeremy swam to the bank like a champion. But his rod was gone, and his basket was gone.',
        },
        {
          kind: 'text',
          text: 'He hopped home as wet as a sponge. "No minnows tonight," he sighed. "What a rainy, splashy day."',
        },
      ],
    },
    {
      title: 'Chapter 3 · Supper with Friends',
      art: 'mrjeremy-tea',
      artPrompt:
        'a dry green frog in a warm scarf sitting by a tiny fireplace inside a cosy home under a lily root, sharing a supper of roasted grasshoppers with a stately tortoise and a slim newt, little cups and a steaming teapot on a low table, warm amber firelight glowing on smooth wet stone walls, rain still falling past the round window, gentle storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'At home Jeremy put on a dry scarf. He lit his little fire. Soon he heard a knock and a knock.',
        },
        {
          kind: 'image',
          art: 'mrjeremy-tea',
          text: 'Jeremy and his friends share a cosy supper.',
        },
        {
          kind: 'text',
          text: 'His friends had come: Sir Isaac Newton the newt, and Alderman Ptolemy the tortoise. They brought a dish of roasted grasshopper with ladybird sauce.',
        },
        {
          kind: 'note',
          text: 'Ask your child: What would you serve to friends on a rainy evening? Would you share your favourite treat?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"No minnows tonight," said Jeremy, "but supper is better with friends." The rain pattered softly on the roof, and the little house glowed warm.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Tale of Mr. Jeremy Fisher',
    author: 'Beatrix Potter',
    authorDeathYear: 1943,
    jurisdiction: 'US',
    basis: 'pd-us',
    note:
      'Retold in simple English for young readers; plot follows the public-domain original. Published 1906; US public domain (pre-1929) and UK public domain (Potter d. 1943, 70y pma expired 2014).',
  },
}
