import type { PackBook } from '../types'

/**
 * The Tale of Timmy Tiptoes — Beatrix Potter (1866–1943), first published 1911.
 * Retold in very simple English for ages 3-5: a squirrel is blamed for missing
 * nuts, waits out a mix-up inside a hollow tree with a giggly chipmunk, and a
 * big wind sets everything right. Kept cosy and gently funny throughout.
 * Source: public domain original (US pre-1929; UK, Potter d. 1943, 70y pma expired 2014).
 * Scene keys use the 'tiptoes-' prefix.
 */
export const timmyTiptoes: PackBook = {
  id: 'tale-timmytiptoes',
  title: 'The Tale of Timmy Tiptoes',
  author: 'Beatrix Potter',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro:
    'Timmy and Goody Tiptoes are squirrels who hide nuts for winter. When nuts go missing, the whispers start. A hollow tree, a giggly chipmunk, and one big wind put everything right again.',
  coverArt: 'tiptoes-tree',
  coverArtPrompt:
    'a chubby grey squirrel hugging a fat acorn while perched in the fork of a big old oak tree with a round hollow in its trunk, heaps of golden leaves along the branches, autumn wood rolling away below in soft greens and rust, late afternoon sun slanting through the leaves in warm rays, cosy storybook watercolour style, warm and snug',
  coverFrom: '#C5E1A5',
  coverTo: '#FFAB91',
  source: 'The Tale of Timmy Tiptoes (Beatrix Potter, 1911), public domain (Potter d. 1943)',
  chapters: [
    {
      title: 'Chapter 1 · Hiding the Nuts',
      art: 'tiptoes-autumn',
      artPrompt:
        'two round grey squirrels carrying acorns under their chins across a golden autumn wood, one squirrel tucking nuts into a hollow oak tree, amber and rust leaves drifting down through slanting afternoon sun, mossy roots and red toadstools below, a small songbird watching from a branch above, busy and warm, storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'Timmy Tiptoes was a little round squirrel. He and his wife Goody gathered nuts all autumn. Nut by nut, they filled the hollow trees.',
        },
        {
          kind: 'image',
          art: 'tiptoes-autumn',
          text: 'Timmy and Goody carry nuts through the wood.',
        },
        {
          kind: 'text',
          text: 'The little birds watched from the branches. "Who sat on nuts? Who dug up nuts?" they sang, because they loved to tease.',
        },
        {
          kind: 'note',
          text: 'Ask your child: Why do squirrels hide nuts for winter? Where would you keep your winter snacks?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Timmy patted his nuts goodnight and went home to Goody. The wood rustled softly, full of secrets.',
        },
      ],
    },
    {
      title: 'Chapter 2 · Inside the Hollow Tree',
      art: 'tiptoes-hollow',
      artPrompt:
        'inside a dim hollow oak tree, a chubby grey squirrel looking surprised at a small striped chipmunk sitting on a heap of nuts and giggling with both cheeks full, one thin beam of light falling from a small round hole far above, cracked acorn shells scattered like treasure, warm brown shadows, cosy and gently funny, storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'One morning the squirrels found their nut heaps looking thin. "Who has been nibbling?" they whispered. They looked at Timmy, because he was easy to find.',
        },
        {
          kind: 'image',
          art: 'tiptoes-hollow',
          text: 'Timmy meets the giggly chipmunk inside the tree.',
        },
        {
          kind: 'text',
          text: 'Timmy climbed into a hollow tree to count his own store. Inside sat Chippy Hackee the chipmunk, giggling, with both cheeks full of Timmy\u2019s nuts!',
        },
        {
          kind: 'note',
          text: 'Little fact: a chipmunk can stuff its cheeks with seeds until it looks like a small balloon.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"Excuse me," said Timmy. But the tree was deep and dark. Chippy tumbled more nuts about, and the round hole above looked very small indeed.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Big Wind',
      art: 'tiptoes-wind',
      artPrompt:
        'a big old oak tree bending in a strong night wind, leaves streaming sideways like ribbons, a small grey squirrel squeezing out of a round hole in the trunk, a tiny chipmunk clinging to a nearby branch, a little dog with a lantern digging at the roots far below, silver moonlight on swaying grass, breezy and exciting, storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'Goody waited at home and gathered on, brave and busy. Every night she set one nut by the door for Timmy.',
        },
        {
          kind: 'image',
          art: 'tiptoes-wind',
          text: 'The wind shakes the hollow tree.',
        },
        {
          kind: 'text',
          text: 'Then one night the wind came up the hill, big and strong. The old tree rocked and creaked. The round hole gave a little stretch!',
        },
        {
          kind: 'note',
          text: 'Ask your child: What does the wind sound like on a windy night? Can you make a tree-creak sound?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Timmy squeezed out at last, thin from waiting, and slid down the trunk. Chippy Hackee scampered home too, with cheeks as round as plums.',
        },
      ],
    },
    {
      title: 'Chapter 4 · Supper Together',
      art: 'tiptoes-home',
      artPrompt:
        'a warm squirrel home inside a tree trunk at night, two grey squirrels sharing a supper of hazelnuts at a small round table, a tiny chipmunk visitor with very full cheeks sitting politely on a stool, other squirrels peeking in at the doorway looking sorry and smiling, candlelight glowing amber on the wooden walls, gentle and forgiving, storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: '"Timmy!" cried Goody. She hugged him twice, once for each cold ear. The kettle sang, and supper was nuts, of course.',
        },
        {
          kind: 'image',
          art: 'tiptoes-home',
          text: 'Goody welcomes Timmy home at last.',
        },
        {
          kind: 'text',
          text: 'Soon Chippy\u2019s cheeks gave a wobble. Out rolled the missing nuts, one by one. Now everyone could see who had been nibbling.',
        },
        {
          kind: 'note',
          text: 'Ask your child: What would you say to a friend before supper? Let us practise a friendly hello.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The squirrels said sorry with a bowl of best hazelnuts. Outside, the wind hummed in the chimney, and the little house stayed warm.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Tale of Timmy Tiptoes',
    author: 'Beatrix Potter',
    authorDeathYear: 1943,
    jurisdiction: 'US',
    basis: 'pd-us',
    note:
      'Retold in simple English for young readers; plot follows the public-domain original, kept light and friendly. Published 1911; US public domain (pre-1929) and UK public domain (Potter d. 1943, 70y pma expired 2014).',
  },
}
