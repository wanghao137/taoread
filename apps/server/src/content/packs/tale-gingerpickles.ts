import type { PackBook } from '../types'

/**
 * Ginger and Pickles — Beatrix Potter (1866–1943), first published 1909.
 * Retold in very simple English for ages 3-5: a cat and a dog keep a village
 * shop and let everyone pay "another day" — until the till is empty. They close,
 * rest, think of a better way, and open again with pennies first. Warm and funny.
 * Source: public domain original (US pre-1929; UK, Potter d. 1943, 70y pma expired 2014).
 * Scene keys use the 'ginger-' prefix.
 */
export const gingerPickles: PackBook = {
  id: 'tale-gingerpickles',
  title: 'Ginger and Pickles',
  author: 'Beatrix Potter',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro:
    'Ginger the cat and Pickles the terrier open a little village shop. Everyone may buy now and pay another day. But another day keeps coming, and the money box stays quiet — until the two friends think of a better way.',
  coverArt: 'ginger-shop',
  coverArtPrompt:
    'a yellow tabby cat in a shop apron and a small brown terrier in a waistcoat standing behind a wooden counter of a tiny village shop, shelves stacked with sugar bags, candles, boots and buttons behind them, a brass bell above the door and a little cash till on the counter, morning sunlight streaming through the shop window onto jars of sweets, jolly warm storybook watercolour style',
  coverFrom: '#FFCC80',
  coverTo: '#B3E5FC',
  source: 'Ginger and Pickles (Beatrix Potter, 1909), public domain (Potter d. 1943)',
  chapters: [
    {
      title: 'Chapter 1 · The Shop Opens',
      art: 'ginger-shopfront',
      artPrompt:
        'the open front of a tiny village shop with a brass bell above the door, a yellow tabby cat in an apron weighing sugar and a brown terrier in a waistcoat wrapping a parcel on the counter, shelves of candles boots and buttons behind, mice and hens and rabbits arriving with baskets, bright fresh morning light, cheerful storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'Ginger and Pickles kept a very little shop. Ginger sold sugar and candles. Pickles sold boots and buttons.',
        },
        {
          kind: 'image',
          art: 'ginger-shopfront',
          text: 'The little shop is open and busy.',
        },
        {
          kind: 'text',
          text: 'Everybody came to buy. The mice came for breadcrumbs. The hens came for corn. The rabbits came for tea.',
        },
        {
          kind: 'note',
          text: 'Ask your child: What would you sell in your own little shop? What would the shop look like?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"Pay us another day," said kind Ginger. "Pay us next week," said easy Pickles. Everyone smiled, and took a little more.',
        },
      ],
    },
    {
      title: 'Chapter 2 · Pay Us Another Day',
      art: 'ginger-customers',
      artPrompt:
        'a busy village shop counter with mice and hens and a mother rabbit holding out baskets while a tired yellow cat wraps parcels and a terrier counts long paper bills, the counter bare of coins, shelves looking thin at the edges, soft midday light through the window, warm and busy, storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'Weeks went by. The baskets went out full. The money box stayed as empty as an eggshell.',
        },
        {
          kind: 'image',
          art: 'ginger-customers',
          text: 'Everyone buys, and promises to pay another day.',
        },
        {
          kind: 'text',
          text: 'At night the mice crept along the shelves and nibbled a little of everything. Ginger yawned. Pickles yawned. Shop-keeping is tiring work.',
        },
        {
          kind: 'note',
          text: 'Little fact: the money box in a shop is called a till. It sings when coins drop in — chink, chink!',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'One evening Ginger counted the till twice. "Not one penny," he said. Pickles looked at the empty biscuit tin. Their tummies rumbled together.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Closed Door',
      art: 'ginger-closed',
      artPrompt:
        'a yellow cat and a small terrier sitting side by side on a doormat outside a shut shop door, a big paper notice pinned to the door, both looking hungry and thoughtful with their chins on their paws, last warm light of afternoon on a quiet village street, one street lamp just beginning to glow, gentle and funny, storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'The next morning Ginger wrote a notice. It said: SHOP CLOSED. He hung it neatly on the door.',
        },
        {
          kind: 'image',
          art: 'ginger-closed',
          text: 'Ginger and Pickles rest and think.',
        },
        {
          kind: 'text',
          text: 'The two friends sat at home by the fire. They had toast without butter, and a very long think.',
        },
        {
          kind: 'note',
          text: 'Ask your child: If your money box stayed empty, what would you try? Maybe you have a clever idea.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"I know," said Pickles at last. "Let us open again — but this time, pennies first!" Ginger\u2019s tail stood up with joy.',
        },
      ],
    },
    {
      title: 'Chapter 4 · Pennies in the Till',
      art: 'ginger-open',
      artPrompt:
        'the little shop swept and shining with a new notice in the window and prices written on a small blackboard, happy mice and hens and rabbits counting out bright pennies at the counter, the yellow cat weighing sugar and the terrier wrapping boots, the till drawer open and glowing, fresh morning light, cheerful cosy storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'The shop opened again with a shine and a sweep. The new notice said: PAY TODAY, PLEASE.',
        },
        {
          kind: 'image',
          art: 'ginger-open',
          text: 'Pennies go chink in the till.',
        },
        {
          kind: 'text',
          text: 'The mice brought their pennies. The hens brought their pennies. Chink, chink went the till, like a tiny song.',
        },
        {
          kind: 'note',
          text: 'Ask your child: What might Ginger and Pickles buy with their first coins? Toast, perhaps — with plenty of butter.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'That night there was butter for the toast, and a biscuit for two. Ginger and Pickles were comfortable at last — and so was everyone in the village.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Ginger and Pickles',
    author: 'Beatrix Potter',
    authorDeathYear: 1943,
    jurisdiction: 'US',
    basis: 'pd-us',
    note:
      'Retold in simple English for young readers; plot follows the public-domain original. Published 1909; US public domain (pre-1929) and UK public domain (Potter d. 1943, 70y pma expired 2014).',
  },
}
