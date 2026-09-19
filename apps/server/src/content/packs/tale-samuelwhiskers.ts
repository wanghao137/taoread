import type { PackBook } from '../types'

/**
 * The Tale of Samuel Whiskers (The Roly-Poly Pudding) — Beatrix Potter (1866–1943),
 * first published 1908. Retold in very simple English for ages 3-5 with the
 * scary parts softened: Tom Kitten goes up the old back stairs, Mother Tabitha
 * searches and finds him rolled in dough like a floury little pudding, and the
 * family ends the day warm by the fire. The rats are played for laughs and move
 * out quietly — the heart of the story is the mother's rescue and family warmth.
 * Source: public domain original (US pre-1929; UK, Potter d. 1943, 70y pma expired 2014).
 * Scene keys use the 'whiskers-' prefix.
 */
export const samuelWhiskers: PackBook = {
  id: 'tale-samuelwhiskers',
  title: 'The Tale of Samuel Whiskers',
  author: 'Beatrix Potter',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro:
    'On a rainy day in a very old house, Tom Kitten climbs the creaky back stairs to find a quiet nap — and does not come down for tea. Mother Tabitha searches every corner. Mothers always know where to look.',
  coverArt: 'whiskers-attic',
  coverArtPrompt:
    'a cozy dusty attic room under a sloped roof with a round window glowing at dusk, a small grey kitten peeking from behind an old armchair, two plump old rats with long whiskers peeking from a crack in the wooden wall, an old trunk and rolled blankets in the corners, soft grey-blue evening light with one warm lamp beam, gentle storybook watercolour style, curious and cosy',
  coverFrom: '#B0BEC5',
  coverTo: '#FFAB91',
  source: 'The Tale of Samuel Whiskers (Beatrix Potter, 1908), public domain (Potter d. 1943)',
  chapters: [
    {
      title: 'Chapter 1 · Up the Back Stairs',
      art: 'whiskers-stairs',
      artPrompt:
        'a small grey kitten in a little blue jacket climbing creaky wooden back stairs of an old hillside house, rain streaking the tall window on the landing, dusty portraits on striped wallpaper, a fluffy dust ball resting under a spindle chair at the top, soft grey light above and warm lamp glow rising from below, cosy old-fashioned storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'The rain fell on the little grey house in the hills. Mother Tabitha Twitchit was baking. The kitchen smelled of warm dough.',
        },
        {
          kind: 'image',
          art: 'whiskers-stairs',
          text: 'Tom climbs up the old back stairs.',
        },
        {
          kind: 'text',
          text: 'Moppet and Mittens helped with the flour. Tom Kitten went to find a quiet nap. Up the creaky back stairs he went, up and up.',
        },
        {
          kind: 'note',
          text: 'Ask your child: Where is your favourite quiet napping place? What makes it cosy?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'When the tea was poured, Tabitha counted heads. One, two — and where was three? One small kitten was missing.',
        },
      ],
    },
    {
      title: 'Chapter 2 · Where Is Tom?',
      art: 'whiskers-search',
      artPrompt:
        'a mother cat in a white apron and cap searching an old kitchen, bending to look under a big bed and opening a tall cupboard door, two small kittens holding a little lantern at the foot of the attic stairs, tiny flour footprints dotting the steps going up, grey stormy light outside the window with warm lamplight inside, caring storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'Tabitha looked under the beds. She looked in the cupboards. She looked behind the coal box. No Tom Kitten.',
        },
        {
          kind: 'image',
          art: 'whiskers-search',
          text: 'Mother searches every corner of the house.',
        },
        {
          kind: 'text',
          text: 'Then she spied little prints on the attic stairs. Floury prints! Tiny feet had walked up — one, two, three.',
        },
        {
          kind: 'note',
          text: 'Little fact: a mother cat knows each kitten by smell and by mew. No footstep is too small for her to notice.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'From high above came the smallest scurry, like a whisper of paws. Tabitha was not one bit afraid. Mothers know where to look.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Floury Little Pudding',
      art: 'whiskers-rescue',
      artPrompt:
        'inside a dusty attic room a mother cat gently unwrapping a sleepy grey kitten rolled up like a dumpling in soft white dough, flour dust floating in one warm shaft of light, two plump old rats peeking from a crack in the wall before scampering away up the stairs, an old sofa and trunks in the background, tender and funny, storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'In the attic, two old rats had been playing at baking. They had rolled dozing Tom Kitten up in the dough. What a big floury dumpling!',
        },
        {
          kind: 'image',
          art: 'whiskers-rescue',
          text: 'Mother finds her floury little pudding.',
        },
        {
          kind: 'text',
          text: '"Tom Kitten!" called Tabitha, and she pushed the door wide. The rats whisked away, quick as shadows, off up the wall. No one was hurt at all.',
        },
        {
          kind: 'note',
          text: 'Ask your child: How do you think Tom felt when Mother found him? Have you ever been found when you were hiding?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'She unwrapped her son and dusted him off — puff, puff. "Silly little dumpling," she said softly. And she hugged him, flour and all.',
        },
      ],
    },
    {
      title: 'Chapter 4 · Cocoa by the Fire',
      art: 'whiskers-fire',
      artPrompt:
        'a cosy kitchen hearth in the evening, three clean kittens in warm nightclothes sipping cocoa from little cups, a mother cat brushing a small grey kitten by the fire, baking tins washed and put away, rain pattering softly on the window, orange firelight glowing on copper pots, snug and happy, storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'That evening there was a warm bath, a good brushing, and cocoa for three.',
        },
        {
          kind: 'image',
          art: 'whiskers-fire',
          text: 'Cocoa and a brushing by the fire.',
        },
        {
          kind: 'text',
          text: 'Far off in the barn, the old rats agreed the house was far too busy for them. They moved out the very next day, quietly, and nobody minded.',
        },
        {
          kind: 'note',
          text: 'Ask your child: What makes a house feel safe? Maybe a light, a soft blanket, or someone sitting close by.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The rain went pitter-patter on, but the kitchen glowed. Three kittens slept in a row, and Mother sat watch until morning.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Tale of Samuel Whiskers',
    author: 'Beatrix Potter',
    authorDeathYear: 1943,
    jurisdiction: 'US',
    basis: 'pd-us',
    note:
      'Retold in simple English for young readers; plot follows the public-domain original, softened so the rats are comic and the rescue is the heart of the tale. Published 1908; US public domain (pre-1929) and UK public domain (Potter d. 1943, 70y pma expired 2014).',
  },
}
