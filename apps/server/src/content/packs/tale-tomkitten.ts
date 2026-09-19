import type { PackBook } from '../types'

/**
 * The Tale of Tom Kitten — retold in short simple sentences for very young readers.
 * Text: The Tale of Tom Kitten (Beatrix Potter, 1907). Public domain in the US
 * (pre-1929) and in the UK (Potter died 1943; 70y pma expired 2014). Plot follows the
 * original story; wording simplified for children aged 3-5.
 */
export const tomKitten: PackBook = {
  id: 'tale-tomkitten',
  title: 'The Tale of Tom Kitten',
  author: 'Beatrix Potter',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: 'Tabitha Twitchit has three little kittens. She wants them clean and neat for her tea party. But Tom Kitten and his sisters love to play. And the rats are waiting.',
  coverArt: 'tom-kitten-garden',
  coverArtPrompt: 'a small grey kitten in a too-large blue jacket and a little mouse-sized cap sitting on a low stone wall, white pinafores hanging from a gooseberry net, a cottage garden with flowers',
  coverFrom: '#5D4037',
  coverTo: '#BCAAA4',
  source: 'The Tale of Tom Kitten (Beatrix Potter, 1907), public domain (Potter d. 1943)',
  chapters: [
    {
      title: 'Chapter 1 · Clean and Neat',
      art: 'mittens-moppet',
      artPrompt: 'three small kittens in white pinafores and mittens sitting on a garden wall, one kitten trying to burst his buttons, a clothesline of small garments, sunshine and a red brick cottage',
      blocks: [
        {
          kind: 'text',
          text: 'Once upon a time there were three little kittens. Their names were Mittens, Tom Kitten, and Moppet. Their mother was Tabitha Twitchit. She had invited friends to tea, and she wanted the kittens to be clean.',
        },
        {
          kind: 'image',
          art: 'mittens-moppet',
          text: 'Mittens, Tom Kitten, and Moppet on the garden wall.',
        },
        {
          kind: 'text',
          text: 'Tabitha washed them, and brushed them, and combed them. She put a clean pinafore on each kitten. Mittens had a pair of blue mittens, and Moppet had a pair of white ones. Then she sent them into the garden.',
        },
        {
          kind: 'note',
          text: 'Fun word: pinafore — a little apron that ties over a dress to keep it clean. Have you ever worn one?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"Keep your mittens on, and keep out of the dirt!" said their mother. But the kittens did not want to keep clean. They climbed on the garden wall. Their pinafores got dirty. Tom’s buttons burst off, one by one. And then they rolled in the dirt, all three of them!',
        },
        {
          kind: 'text',
          text: 'They hid their dirty pinafores in the gooseberry net, and they ran away to play. But two big rats were watching from the wall. They had sharp little teeth and bright little eyes, and they had a plan.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Rats and the Pudding',
      art: 'rat-pudding',
      artPrompt: 'two big rats in aprons rolling a small grey kitten in dough on a wooden table, a round pudding basin and a rolling pin, a pot bubbling on the hearth, a narrow dark kitchen',
      blocks: [
        {
          kind: 'text',
          text: 'Tom Kitten was hiding in the middle of a big pile of clothes. He could not get out, for all his buttons had burst off. Then the rats came, the two big rats. They looked at Tom with bright little eyes.',
        },
        {
          kind: 'image',
          art: 'rat-pudding',
          text: 'The rats rolling Tom Kitten in the pudding dough.',
        },
        {
          kind: 'text',
          text: '"What a fine little pudding he would make!" said the big rats. So they took Tom, and they rolled him in a great lump of dough. They put butter and sugar and currants on him. Tom was very much frightened, but he could not say a word, for the dough was over his mouth.',
        },
        {
          kind: 'note',
          text: 'Oh dear! Tom Kitten is being made into a dumpling! What would you do if you were Tom?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'One rat lit the fire, and the other went to fetch a pudding cloth. They were going to boil Tom for their dinner. But Tom gave one great squirm, and the dough began to crack.',
        },
      ],
    },
    {
      title: 'Chapter 3 · Saved Just in Time',
      art: 'tom-washed',
      artPrompt: 'a grey kitten wrapped in a towel on a kitchen chair being washed by a cat in a bonnet, a wet pudding cloth on the floor, two rats running down the garden path, warm lamplight',
      blocks: [
        {
          kind: 'text',
          text: 'Just then there was a knock at the door. It was Tabitha Twitchit, and the neighbours, the Ribbys. They came in, and they saw the rats, and the dough, and poor Tom. The two rats ran down the path as fast as they could.',
        },
        {
          kind: 'image',
          art: 'tom-washed',
          text: 'Tom Kitten washed clean, and the rats running away.',
        },
        {
          kind: 'text',
          text: 'They pulled Tom out of the dough. They washed him, and they dried him, and they wrapped him in a warm towel. Tom was very glad to be safe.',
        },
        {
          kind: 'note',
          text: 'Fun word: squirm — to wiggle and twist your whole body, like a kitten in a towel!',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The kittens’ pinafores were never found, for the rats had carried them away. And Tom Kitten did not get any currant buns for tea. He went to bed early, while Mittens and Moppet ate scones with their mother. And he never played with rats again.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Tale of Tom Kitten',
    author: 'Beatrix Potter',
    authorDeathYear: 1943,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Retold in simple English for young readers; plot follows the public-domain original. Published 1907; US public domain (pre-1929) and UK public domain (Potter d. 1943, 70y pma expired).',
  },
}
