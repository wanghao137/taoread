import type { PackBook } from '../types'

/**
 * The Tale of Little Pig Robinson — Beatrix Potter (1866–1943), first
 * published 1930, the last of her tales. Retold for young children in four
 * chapters: a small pig goes to market for his aunts, is carried to sea by
 * kind sailors, and finds a green island of his own. Copyright note: this is
 * a late Potter title (1930, after the US 1929 cut-off), so the pack relies
 * on the EU/UK life+70 basis — Potter died in 1943, so protection expired
 * there in 2014 — and does not rely on US public-domain status.
 */
export const pigRobinson: PackBook = {
  id: 'tale-pigrobinson',
  title: 'The Tale of Little Pig Robinson',
  author: 'Beatrix Potter',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: 'Little Pig Robinson is sent to market with butter, eggs, and a very long list. Two kind sailors share their supper with him — and that is how a small pig comes to sail away to sea.',
  coverArt: 'pigrobinson-harbor',
  coverArtPrompt: 'a small pink pig in a blue sailor jacket standing on a stone harbour quay, masts and fishing boats behind him, gulls wheeling in a soft grey-blue sky, ropes and lobster pots along the wall, a red scarf at his neck, gentle morning light over calm water, warm storybook watercolour style, curious and peaceful mood',
  coverFrom: '#0277BD',
  coverTo: '#80DEEA',
  source: 'The Tale of Little Pig Robinson (Beatrix Potter, 1930), public domain in the EU/UK (Potter d. 1943)',
  chapters: [
    {
      title: 'Chapter 1 · Errands for the Aunts',
      art: 'pigrobinson-market',
      artPrompt: 'a small pink pig with a basket walking along a cobbled street toward a busy seaside market, baskets of bread and fish on stalls, his two grand aunts in white caps waving from a farmhouse doorway far behind, laundry lines and chimneys, bright breezy morning light, warm storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'In a little seaport town lived a small pig called Robinson. He kept house for his two aunts, Miss Dorcas and Miss Porcas. They were grand pigs, and very busy.',
        },
        {
          kind: 'text',
          text: 'One washing day the aunts could not leave home. "Robinson, dear," they said, "you must go to market for us. Here is butter, and eggs, and a very long list."',
        },
        {
          kind: 'image',
          art: 'pigrobinson-market',
          text: 'Robinson sets off with his basket and his list.',
        },
        {
          kind: 'text',
          text: '"And Robinson," said the aunts at the door, "do not talk to strangers on the way." Robinson promised. He trotted off with his basket, whistling a small tune.',
        },
        {
          kind: 'note',
          text: 'Ask your child: what would you buy at a market by the sea? Make a little shopping list together, one thing at a time.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 2 · Kind Sailors',
      art: 'pigrobinson-ship',
      artPrompt: 'a small pink pig dozing on a cosy heap of sacks on a ship deck, two kindly bearded sailors in guernsey sweaters smiling over him, rigging and furled sails above, the harbour lights twinkling as evening falls, lantern glow on the deck, warm storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'The market was bright and noisy. Robinson sold the butter and bought tea, and sugar, and everything on the list. His trotters ached from carrying.',
        },
        {
          kind: 'text',
          text: 'When the shopping was done, he sat down on the quay to rest. Two kind sailors sat beside him. "You look tired, little pig," they said. "Come and share our supper."',
        },
        {
          kind: 'image',
          art: 'pigrobinson-ship',
          text: 'Robinson falls asleep on the sailors\' cosy deck.',
        },
        {
          kind: 'text',
          text: 'On the ship there was soup, and fish, and bread, and more bread. Robinson ate rather a lot. His eyes grew heavy, and he fell fast asleep in a heap of soft sacks.',
        },
        {
          kind: 'note',
          text: 'New word: quay — the stone edge of the harbour where ships are tied. Say it together: it rhymes with "key".',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The sailors smiled and pulled up the anchor. The ship slipped out of the harbour, quiet as a cloud. Nobody on shore saw little Robinson go.',
        },
      ],
    },
    {
      title: 'Chapter 3 · A Pig at Sea',
      art: 'pigrobinson-voyage',
      artPrompt: 'a small pink pig in a blue sailor jacket standing at a wooden ship rail watching green waves roll by, a curl of smoke from the galley chimney, ropes and brass fittings, a friendly sailor hauling a rope nearby, gulls above, fresh breezy daylight over open sea, warm storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'When Robinson woke up, there was water everywhere. "Never mind, little shipmate," laughed the captain. "You are one of us now." So Robinson became the small pig sailor of the good ship Pound of Candles.',
        },
        {
          kind: 'image',
          art: 'pigrobinson-voyage',
          text: 'Robinson watches the waves from the ship rail.',
        },
        {
          kind: 'text',
          text: 'He helped in the kitchen, and he learned to tie knots. He watched the waves turn silver, then green, then deep blue. At first he missed his aunts, but the sea grew kinder every day.',
        },
        {
          kind: 'note',
          text: 'Ask your child: what would you pack for a trip on a ship? Warm coats? A book? A toothbrush for a small pig?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'They sailed for weeks and weeks. The sailors taught him their songs, and Robinson taught them how to whistle through his nose.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Bong Tree Island',
      art: 'pigrobinson-island',
      artPrompt: 'a small green island with one curious tree on its hill, a small pink pig waving a handkerchief from the warm sand as a sailing ship shrinks to a dot on the horizon, gentle turquoise water, scattered shells and sweet grass, soft tropical afternoon light, warm storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'One morning the ship reached a small green island. On its hill grew one very curious tree. "A bong tree!" said the sailors. "You do not see those every day."',
        },
        {
          kind: 'image',
          art: 'pigrobinson-island',
          text: 'Robinson waves goodbye to the ship from his island.',
        },
        {
          kind: 'text',
          text: 'Robinson went ashore, and he loved it at once. There was warm sand, sweet grass, and the funny bong tree for shade. He unpacked his little trunk and made himself at home.',
        },
        {
          kind: 'note',
          text: 'Perhaps you know an old rhyme about an owl and a pussy-cat who sailed in a pea-green boat? Some people say Robinson the pig was there too, with a ring at the end of his nose.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'And so the little pig who went to market became a sailor with an island of his own. He was happy every single day — and so, they say, were his bong tree and he.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Tale of Little Pig Robinson',
    author: 'Beatrix Potter',
    authorDeathYear: 1943,
    jurisdiction: 'EU',
    basis: 'pd-70',
    note: 'Published 1930 — after the US 1929 cut-off, so this pack does not rely on US public-domain status. Basis is EU/UK life-plus-70: Potter died in 1943, so protection expired there in 2014. Retold for children aged 3-5; plot follows the public-domain original.',
  },
}
