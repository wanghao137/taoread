import type { PackBook } from '../types'

/**
 * The Story of Miss Moppet — Beatrix Potter (1866–1943), first published 1906.
 * Retold in very simple English for ages 3-5: a kitten and a mouse play a
 * gentle game of hide-and-seek on the kitchen dresser. Nobody gets hurt,
 * and both friends end the day safe and warm.
 * Source: public domain original (US pre-1929; UK, Potter d. 1943, 70y pma expired 2014).
 * Scene keys use the 'moppet-' prefix.
 */
export const moppet: PackBook = {
  id: 'tale-moppet',
  title: 'The Story of Miss Moppet',
  author: 'Beatrix Potter',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro:
    'Miss Moppet is a kitten who loves to play games. A quick little mouse teases her on the dresser all day. By supper time, both of them agree it was a splendid game.',
  coverArt: 'moppet-dresser',
  coverArtPrompt:
    'a small white and brown kitten with big surprised eyes sitting on the floor in front of a tall wooden kitchen dresser full of blue plates and jam jars, a tiny brown mouse peeking from behind a jar on the middle shelf, soft morning light falling across the stone floor, copper pans hanging above, warm gentle storybook watercolour style, curious and playful',
  coverFrom: '#FFE0B2',
  coverTo: '#F8BBD0',
  source: 'The Story of Miss Moppet (Beatrix Potter, 1906), public domain (Potter d. 1943)',
  chapters: [
    {
      title: 'Chapter 1 · The Teasing Mouse',
      art: 'moppet-kitchen',
      artPrompt:
        'a small white and brown kitten crouching on a kitchen dresser shelf, staring eye to eye at a cheeky brown mouse standing beside a glass jar, wooden spoons and stacked blue plates around them, warm morning light from a small window, cosy old kitchen with copper pans on the wall, bright and funny, storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'This is Miss Moppet. She is a kitten. She can hear a little mouse walking on the dresser, far across the kitchen.',
        },
        {
          kind: 'image',
          art: 'moppet-kitchen',
          text: 'Miss Moppet meets the teasing mouse on the dresser.',
        },
        {
          kind: 'text',
          text: 'The mouse popped out and teased her. "Too slow, kitten!" it seemed to say. Moppet jumped — bump! She tapped her head on the cupboard door.',
        },
        {
          kind: 'note',
          text: 'Ask your child: Have you ever jumped too fast and bumped something? What did you say next?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The mouse ran away, laughing. Moppet sat down and rubbed her poor head. "That mouse is very quick," she said. "But I have a plan."',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Wrapped-Up Kitten',
      art: 'moppet-towel',
      artPrompt:
        'a small kitten sitting very still on a stone kitchen floor, a big striped duster tied round its head like a bandage with only two eyes peeking out, a little brown mouse creeping closer across the tiles from a hole in the wall, soft afternoon light through a doorway, quiet old kitchen corner, gentle and funny, storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'Moppet had a plan. She took the big duster and tied it round her head. Now she looked poorly, and very still.',
        },
        {
          kind: 'image',
          art: 'moppet-towel',
          text: 'The kitten pretends to be poorly.',
        },
        {
          kind: 'text',
          text: 'The mouse peeked out of its hole. "Is the kitten hurt?" it wondered. It tiptoed nearer, and nearer, to see what was the matter.',
        },
        {
          kind: 'note',
          text: 'Little fact: mice have very quick ears. They can hear a cat purring from far away.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The mouse came quite close. It looked at the bandage. It looked at the two quiet eyes. Something felt very funny about this.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Nose Dance',
      art: 'moppet-fire',
      artPrompt:
        'a cheeky little brown mouse dancing happily on top of a tall wooden cupboard, a white and brown kitten sitting below on a red cushion beside a glowing fire, looking up with wide surprised eyes, a striped duster lying on the floor with a small mouse-shaped hole in it, warm orange firelight in a cosy evening kitchen, playful storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'The mouse ran right up onto Moppet\u2019s nose. It danced on the tip of her nose. Tip-tap, tip-tap!',
        },
        {
          kind: 'image',
          art: 'moppet-fire',
          text: 'The mouse dances somewhere very tickly.',
        },
        {
          kind: 'text',
          text: 'Snap! The duster flew over the mouse. But there was a little hole in the duster. Out popped the mouse, and off it ran.',
        },
        {
          kind: 'note',
          text: 'Ask your child: Where would you hide if you were a quick little mouse? Draw your hiding place in the air.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The mouse danced safely on top of the cupboard. Moppet curled up on her cushion by the fire. What a good game it had been.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Story of Miss Moppet',
    author: 'Beatrix Potter',
    authorDeathYear: 1943,
    jurisdiction: 'US',
    basis: 'pd-us',
    note:
      'Retold in simple English for young readers; plot follows the public-domain original, softened into a gentle game. Published 1906; US public domain (pre-1929) and UK public domain (Potter d. 1943, 70y pma expired 2014).',
  },
}
