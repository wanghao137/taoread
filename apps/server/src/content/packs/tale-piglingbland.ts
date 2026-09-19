import type { PackBook } from '../types'

/**
 * The Tale of Pigling Bland — Beatrix Potter (1866–1943), first published 1913.
 * Retold for young children in four chapters: a small pig walks to market, is
 * nearly kept for the pot, and runs away with a new friend to a land where
 * pigs are free. Source: public domain text (published 1913, US pre-1929;
 * Potter d. 1943, EU life+70 expired 2014).
 */
export const piglingBland: PackBook = {
  id: 'tale-piglingbland',
  title: 'The Tale of Pigling Bland',
  author: 'Beatrix Potter',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: 'Pigling Bland sets off down the road with a paper licence and a full heart. He meets a farmer, a field of peas, and a little black pig named Pig-wig who needs a friend.',
  coverArt: 'pigling-road',
  coverArtPrompt: 'a small pink pig in a little red jacket standing on a winding country lane at dawn, holding a folded paper licence carefully in one trotter, rolling green hills and dry stone walls stretching to the horizon, a little black pig trotting close beside him, hedgerows with wildflowers, soft golden sunrise light with long shadows, gentle storybook watercolour style, hopeful and peaceful mood',
  coverFrom: '#8D6E63',
  coverTo: '#FFCC80',
  source: 'The Tale of Pigling Bland (Beatrix Potter, 1913), public domain (Potter d. 1943)',
  chapters: [
    {
      title: 'Chapter 1 · Eight Little Pigs',
      art: 'pigling-gate',
      artPrompt: 'an old mother pig in a white cap standing at a garden gate, two small pigs in jackets setting off down a country lane with little paper licences tied on with ribbon, a stone farmhouse and vegetable garden behind, soft morning light, warm storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'Aunt Pettitoes was a very old pig. She had eight little pigs to feed, and her garden was too small for them all.',
        },
        {
          kind: 'text',
          text: 'One morning she tied little paper licences on two of them. "Go to market, my dears," she said. "Find a kind new home, and be careful on the road."',
        },
        {
          kind: 'image',
          art: 'pigling-gate',
          text: 'Pigling Bland and Alexander set off down the lane.',
        },
        {
          kind: 'text',
          text: 'Pigling Bland and his brother Alexander went over the hill. At the first bridge, Alexander looked everywhere for his licence. It was gone! A farmer was passing by, so he took Alexander home in his cart.',
        },
        {
          kind: 'note',
          text: 'Ask your child: what would you pack for a long walk? Perhaps a snack, a warm hat, and one very important piece of paper.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Pigling Bland waved goodbye to his brother. Then he walked on alone, holding his own licence very tight. The road went over the hill and far away.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Pea Field',
      art: 'pigling-peas',
      artPrompt: 'a small pig in a red jacket sitting contentedly in a field of tall pea plants, pea pods open around him, ferns at the field edge, a kindly-looking farmer with a broad hat appearing at the gate in the background, drowsy golden afternoon light, warm storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'The sun grew warm, and Pigling Bland grew hungry. He found a field full of sweet green peas. He ate a pod, and then another, until his little round tummy was very full.',
        },
        {
          kind: 'image',
          art: 'pigling-peas',
          text: 'Pigling Bland in the pea field, feeling very sleepy.',
        },
        {
          kind: 'text',
          text: 'Sleepy and warm, he curled up in the soft ferns. He shut his eyes for just one minute. A shadow fell over him. A farmer had found him fast asleep among the peas.',
        },
        {
          kind: 'note',
          text: 'New words to taste together: peas, pod, fern. Can your child find something green in the room that grows?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"You may sleep in my woodshed tonight," said the farmer. But his eyes were not kind eyes. Pigling Bland held his licence tight, and he did not feel safe at all.',
        },
      ],
    },
    {
      title: 'Chapter 3 · Pig-wig',
      art: 'pigling-pigwig',
      artPrompt: 'a little black pig whispering through a small woodshed window at night, a small pink pig in a red jacket listening inside with wide eyes, moonlight silvering the wooden wall, a latch and a candle glowing faintly inside, quiet stars above, warm storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'In the middle of the night, a small voice whispered at the window. A little black pig looked in. Her name was Pig-wig.',
        },
        {
          kind: 'image',
          art: 'pigling-pigwig',
          text: 'Pig-wig whispers at the woodshed window.',
        },
        {
          kind: 'text',
          text: '"I am being fattened up for ham," whispered Pig-wig. "And so will you be, if you stay. Let us run away together before morning." Pigling Bland took Pig-wig\'s trotter and said, "Yes."',
        },
        {
          kind: 'note',
          text: 'New word: trotter — a pig\'s little foot. Pigs hold hands with their trotters.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'They crept down the stairs, past the sleeping house. They lifted the latch, soft as a whisper. The night was dark and the road was long. Hand in trotter, they ran.',
        },
      ],
    },
    {
      title: 'Chapter 4 · Over the Bridge',
      art: 'pigling-bridge',
      artPrompt: 'two small pigs, one pink in a red jacket and one black, trotting side by side across a long white stone bridge at sunrise, a silver river running below, mist over the water, hills beyond glowing gold and rose, wide morning sky, gentle storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'All night they trotted over the hills. When the sun came up, they saw a river and a long white bridge. "Beyond that bridge is the next county," puffed Pigling Bland. "There, pigs are free."',
        },
        {
          kind: 'image',
          art: 'pigling-bridge',
          text: 'The two friends cross the bridge as the sun rises.',
        },
        {
          kind: 'text',
          text: 'The bridge was long, and the river ran cold below. They did not stop, and they did not look back. On the other side, the morning smelled of hay and fresh bread.',
        },
        {
          kind: 'note',
          text: 'Ask your child: what makes a friend a good friend? Pig-wig had a plan, and Pigling Bland had the licence. Together they had just enough.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'They walked on, hand in trotter, into the little market town and out the other side. And there, in a land where pigs are free, their happy new story began.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Tale of Pigling Bland',
    author: 'Beatrix Potter',
    authorDeathYear: 1943,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Published 1913; US public domain (pre-1929) and EU public domain (Potter d. 1943, 70y pma expired 2014). Retold for children aged 3-5; plot follows the public-domain original.',
  },
}
