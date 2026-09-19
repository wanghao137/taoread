import type { PackBook } from '../types'

/**
 * The Story of a Fierce Bad Rabbit — Beatrix Potter (1866–1943), first published 1906.
 * Retold in very simple English for ages 3-5: a rude rabbit snatches a carrot,
 * a loud bang sends him hopping home without his whiskers, and the good rabbit
 * finds supper in the quiet evening. Written calmly, more funny than frightening.
 * Source: public domain original (US pre-1929; UK, Potter d. 1943, 70y pma expired 2014).
 * Scene keys use the 'badrabbit-' prefix.
 */
export const badRabbit: PackBook = {
  id: 'tale-badrabbit',
  title: 'The Fierce Bad Rabbit',
  author: 'Beatrix Potter',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro:
    'On a green hill, two rabbits sit on a bench with one fine carrot. The bad rabbit snatches it and is very rude. A loud bang, a windy run, and a peaceful evening put everything right.',
  coverArt: 'badrabbit-scarf',
  coverArtPrompt:
    'a grumpy brown rabbit with pointed ears and a small red scarf sitting stiffly on a wooden bench on a green hillock, paws crossed, a bright orange carrot lying on the bench just out of reach, daisies and soft grass all around, pale blue sky with a few small white clouds, gentle morning sunshine, simple sweet storybook watercolour style',
  coverFrom: '#A5D6A7',
  coverTo: '#FFF9C4',
  source: 'The Story of a Fierce Bad Rabbit (Beatrix Potter, 1906), public domain (Potter d. 1943)',
  chapters: [
    {
      title: 'Chapter 1 · One Carrot on a Bench',
      art: 'badrabbit-bench',
      artPrompt:
        'a calm white rabbit with pink ears sitting on a wooden bench on a grassy hillock, holding a long orange carrot, a stern brown rabbit with pointed ears standing beside the bench and reaching for the carrot, rolling green meadow with daisies behind, morning sunshine in soft gold, simple and gentle, storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'A good rabbit sat on a bench on a hill. It held a fine carrot, and it nibbled quietly. Munch, munch, munch.',
        },
        {
          kind: 'image',
          art: 'badrabbit-bench',
          text: 'The good rabbit shares the bench with the bad rabbit.',
        },
        {
          kind: 'text',
          text: 'Along came a bad rabbit. He did not say good morning. He snatched the carrot, and he pushed the good rabbit hard.',
        },
        {
          kind: 'note',
          text: 'Ask your child: What could the bad rabbit have said instead? Let us try the kind words together.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The good rabbit did not fight. It hopped under a stone and hid. The hill was quiet again, and the wind hummed in the grass.',
        },
      ],
    },
    {
      title: 'Chapter 2 · A Loud Bang',
      art: 'badrabbit-field',
      artPrompt:
        'a brown rabbit running very fast across a wide meadow, its short tail and whiskers blown away behind like tiny feathers on the wind, a tiny faraway figure with a walking stick on the distant hill, grass bending in a whoosh of air, big soft afternoon clouds, quick and breezy, storybook watercolour style, more funny than frightening',
      blocks: [
        {
          kind: 'text',
          text: 'Soon a man came over the hill with a gun. BANG went the gun, loud as thunder!',
        },
        {
          kind: 'image',
          art: 'badrabbit-field',
          text: 'The bad rabbit runs and runs.',
        },
        {
          kind: 'text',
          text: 'The bad rabbit ran so fast that his ears streamed back. He ran until the bang was only a faraway click in the wind.',
        },
        {
          kind: 'note',
          text: 'Little fact: rabbits are very fast runners. Some can outrun a big dog, straight home to their burrows.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'When the bad rabbit stopped to rest, he felt very light indeed. Where were his whiskers? Where was his tail? The wind had whisked them off in the hurry!',
        },
      ],
    },
    {
      title: 'Chapter 3 · Quiet on the Hill',
      art: 'badrabbit-home',
      artPrompt:
        'a polite brown rabbit with no whiskers and no tail hopping gently up a path towards a burrow under a hawthorn bush, a white rabbit sitting nearby in the last warm light nibbling a long carrot, long soft shadows across the meadow, rosy evening sky with the first star, peaceful and forgiving, storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'The bad rabbit hopped home very slowly. He felt quiet and polite now. "Good evening," he said to the grass.',
        },
        {
          kind: 'image',
          art: 'badrabbit-home',
          text: 'Two rabbits at peace in the evening light.',
        },
        {
          kind: 'text',
          text: 'The good rabbit came out of its hiding place. There lay the carrot on the bench. Supper was found after all!',
        },
        {
          kind: 'note',
          text: 'Ask your child: How do you think the good rabbit felt when it found the carrot? What does happy nibbling sound like?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The stars came out over the hill. One rabbit munched, one rabbit rested, and the whole meadow fell fast asleep.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Story of a Fierce Bad Rabbit',
    author: 'Beatrix Potter',
    authorDeathYear: 1943,
    jurisdiction: 'US',
    basis: 'pd-us',
    note:
      'Retold in simple English for young readers; plot follows the public-domain original, kept calm and gentle. Published 1906; US public domain (pre-1929) and UK public domain (Potter d. 1943, 70y pma expired 2014).',
  },
}
