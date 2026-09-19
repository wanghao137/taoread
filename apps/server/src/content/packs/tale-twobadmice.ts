import type { PackBook } from '../types'

/**
 * The Tale of Two Bad Mice — retold in short simple sentences for very young readers.
 * Text: The Tale of Two Bad Mice (Beatrix Potter, 1904). Public domain in the US
 * (pre-1929) and in the UK (Potter died 1943; 70y pma expired 2014). Plot follows the
 * original story; wording simplified for children aged 3-5.
 */
export const twoBadMice: PackBook = {
  id: 'tale-twobadmice',
  title: 'The Tale of Two Bad Mice',
  author: 'Beatrix Potter',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: 'Tom Thumb and Hunca Munca are two little mice. They creep into a beautiful dollhouse while the dolls are out. The food looks good — but will it taste good?',
  coverArt: 'two-mice-dollhouse',
  coverArtPrompt: 'a pretty pink and white dollhouse with its front wall open, a dining table set with tiny plates, two small mice peeping out from behind a sofa, a doll’s hat on a chair',
  coverFrom: '#AD1457',
  coverTo: '#F8BBD0',
  source: 'The Tale of Two Bad Mice (Beatrix Potter, 1904), public domain (Potter d. 1943)',
  chapters: [
    {
      title: 'Chapter 1 · The Beautiful Dollhouse',
      art: 'dollhouse-room',
      artPrompt: 'a grand dollhouse parlour with red curtains and a long table, two mice standing on the table among tiny dishes, a lump of plaster ham and a painted fish, bright morning light',
      blocks: [
        {
          kind: 'text',
          text: 'Once upon a time there was a very beautiful dollhouse. It belonged to two dolls called Lucinda and Jane. The dollhouse was red, with a white roof, and it had real windows and curtains.',
        },
        {
          kind: 'image',
          art: 'dollhouse-room',
          text: 'The two mice inside the beautiful dollhouse.',
        },
        {
          kind: 'text',
          text: 'One morning Lucinda and Jane went out for a drive in the doll’s carriage. Nobody was at home. And in through the window came two little mice. Their names were Tom Thumb and Hunca Munca.',
        },
        {
          kind: 'note',
          text: 'Fun word: carriage — a little car or cart with wheels that people rode in long ago.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Tom Thumb and Hunca Munca went straight to the dining room. There was the dinner, all set out on the table. A ham, a fish, a pudding, and some pears and oranges. The mice were very hungry.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Mice Taste Everything',
      art: 'hunca-munca',
      artPrompt: 'a mouse in a white apron smashing a plaster pudding with a hammer, broken dishes and a fake roast scattered on a little table, feathers flying from a torn bolster, cross little faces',
      blocks: [
        {
          kind: 'text',
          text: 'But oh dear! The dinner was not real food at all. The ham was a lump of plaster. The fish was painted. The cheese would not cut. Tom Thumb was very cross. He took the fish and put it in the fire.',
        },
        {
          kind: 'image',
          art: 'hunca-munca',
          text: 'Hunca Munca smashing the plaster pudding.',
        },
        {
          kind: 'text',
          text: 'Hunca Munca tried the ham, and the cheese, and the butter. None of it was any good. So she smashed the pudding with a hammer, and threw the oranges out of the window. The mice were in a very bad temper.',
        },
        {
          kind: 'note',
          text: 'Oh dear! The food was all pretend. How do you think the dolls will feel when they come home?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Then they went upstairs, and pulled the clothes off the dolls’ beds, and threw them out of the window. Tom Thumb carried off a chair, and Hunca Munca took the baby’s cradle. "I shall take the birdcage," said Tom Thumb.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Mice Make Amends',
      art: 'mice-tidy',
      artPrompt: 'two mice in aprons sweeping a dollhouse floor with tiny brooms, a sixpence beside a stocking, a mouse climbing a curtain with a cradle on its back, morning sun through the window',
      blocks: [
        {
          kind: 'text',
          text: 'When the dolls came home, Lucinda sat down on the stairs and cried. Jane found the fish burned black in the fire. But then they looked in the stockings, and there was money inside. A bright sixpence for Lucinda, and one for Jane.',
        },
        {
          kind: 'image',
          art: 'mice-tidy',
          text: 'The mice tidying the dollhouse the next morning.',
        },
        {
          kind: 'text',
          text: 'The next morning, when the dolls were out, the mice came back. But this time they were good. Tom Thumb swept the floor, and Hunca Munca dusted the furniture. They brought a little broom and a dustpan of their own.',
        },
        {
          kind: 'note',
          text: 'Fun word: amends — when you were bad, and then you do something good to make it better.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'They put back the cradle and the birdcage. And they swept and dusted until the dollhouse was clean again. So Tom Thumb and Hunca Munca were not so very bad after all — only hungry, and then sorry.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Tale of Two Bad Mice',
    author: 'Beatrix Potter',
    authorDeathYear: 1943,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Retold in simple English for young readers; plot follows the public-domain original. Published 1904; US public domain (pre-1929) and UK public domain (Potter d. 1943, 70y pma expired).',
  },
}
