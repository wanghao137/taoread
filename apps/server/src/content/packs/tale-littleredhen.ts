import type { PackBook } from '../types'

/**
 * The Little Red Hen — traditional English folktale, retold for young children
 * in four short chapters. Animal helpers who refuse to work get no bread at the end.
 * Source: traditional folk tale (first printed US school readers, 19th c.), public domain.
 */
export const littleRedHen: PackBook = {
  id: 'little-red-hen',
  title: 'The Little Red Hen',
  author: 'Traditional folktale',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: 'A little red hen finds some seeds. Who will help her plant them, cut the wheat, and bake the bread? "Not I," say all the others!',
  coverArt: 'hen-field',
  coverArtPrompt: 'a plump little red hen in a sunlit farmyard holding a tiny wheat stalk, a cat, a dog and a pig watching lazily from a fence, big blue sky with fluffy clouds',
  coverFrom: '#D84315',
  coverTo: '#FFAB91',
  source: 'Traditional English folktale, retold for young children',
  chapters: [
    {
      title: 'Chapter 1 · Some Seeds',
      art: 'hen-field',
      artPrompt: 'a red hen scratching in brown farmyard soil, three wheat seeds glinting on the ground, morning sun',
      blocks: [
        {
          kind: 'text',
          text: 'Once upon a time there was a little red hen. She lived in a farmyard with a lazy cat, a lazy dog, and a lazy pig.',
        },
        {
          kind: 'image',
          art: 'hen-field',
          text: 'The little red hen scratching in the farmyard soil.',
        },
        {
          kind: 'text',
          text: 'One day the little red hen found some seeds. "Who will plant these seeds?" she asked. "Not I," said the cat. "Not I," said the dog. "Not I," said the pig.',
        },
        {
          kind: 'note',
          text: 'New word: seeds — tiny things that grow into plants. Wheat seeds grow into wheat.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"Then I will plant them myself," said the little red Hen. And she did. She scratched a hole in the ground, dropped the seeds in, and covered them up with soil.',
        },
        {
          kind: 'text',
          text: 'Soon the seeds pushed up thin green shoots. The shoots grew taller, and taller, until the field was full of golden wheat.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Golden Wheat',
      art: 'wheat-field',
      artPrompt: 'a field of tall golden wheat swaying in the wind, the little red hen standing among the stalks, bright yellow sun',
      blocks: [
        {
          kind: 'text',
          text: 'The wheat grew golden and tall. "Now the wheat is ripe," said the little red hen. "Who will cut the wheat?"',
        },
        {
          kind: 'image',
          art: 'wheat-field',
          text: 'The golden wheat, tall and ripe in the field.',
        },
        {
          kind: 'text',
          text: '"Not I," said the cat, and she went back to sleep. "Not I," said the dog, and he went back to sleep. "Not I," said the pig, and he rolled in the mud.',
        },
        {
          kind: 'note',
          text: 'New word: ripe — ready to be picked or cut. Ripe wheat is golden, not green.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"Then I will cut it myself," said the little red hen. She cut the wheat with a sharp little sickle, and she tied it into a bundle.',
        },
        {
          kind: 'text',
          text: '"Who will take the wheat to the miller, to be ground into flour?" she asked. But the cat, the dog, and the pig all said, "Not I."',
        },
        {
          kind: 'text',
          text: 'So the little red hen carried the heavy bundle all the way to the mill, and the miller ground the wheat into fine white flour.',
        },
      ],
    },
    {
      title: 'Chapter 3 · Baking Day',
      art: 'kitchen-bread',
      artPrompt: 'a cosy country kitchen, the little red hen in a white apron kneading dough on a floury table, a big stone oven glowing warm behind her',
      blocks: [
        {
          kind: 'text',
          text: 'The little red hen came home with a sack of flour. "Who will help me bake the bread?" she asked.',
        },
        {
          kind: 'image',
          art: 'kitchen-bread',
          text: 'The little red hen kneading dough in her kitchen.',
        },
        {
          kind: 'text',
          text: '"Not I," said the cat. "Not I," said the dog. "Not I," said the pig. Nobody wanted to help.',
        },
        {
          kind: 'note',
          text: 'New word: dough — soft, squishy bread-before-it-is-cooked. Dough goes in the oven and comes out as bread.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"Then I will bake it myself," said the little red hen. She mixed the flour with water and a pinch of salt, and she kneaded the dough with her little red feet.',
        },
        {
          kind: 'text',
          text: 'She shaped a round loaf, put it in the warm oven, and soon the whole farmyard smelled of fresh bread. It smelled so good that the cat, the dog, and the pig all came running.',
        },
      ],
    },
    {
      title: 'Chapter 4 · Who Gets the Bread?',
      art: 'bread-table',
      artPrompt: 'a golden loaf of bread on a wooden table in the farmyard, the hen standing proudly behind it, cat dog and pig waiting with hopeful faces',
      blocks: [
        {
          kind: 'text',
          text: 'The little red hen took the loaf out of the oven. It was golden and crusty and hot.',
        },
        {
          kind: 'image',
          art: 'bread-table',
          text: 'The golden loaf, fresh from the oven.',
        },
        {
          kind: 'text',
          text: '"Now," said the little red hen, "who will eat this bread?" "I will!" said the cat. "I will!" said the dog. "I will!" said the pig. All of them wanted some.',
        },
        {
          kind: 'note',
          text: 'New word: crusty — covered in a hard, crunchy outside. Bread crust goes brown in the oven.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"Oh no," said the little red hen. "Nobody helped me plant the seeds, or cut the wheat, or carry the flour, or bake the bread. So nobody shall have any."',
        },
        {
          kind: 'text',
          text: 'And she sat down with her family of little chicks, and they ate the whole loaf together. It was the best bread they had ever tasted.',
        },
        {
          kind: 'text',
          text: 'After that, the cat, the dog, and the pig always said, "I will!" whenever the little red hen asked for help.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Little Red Hen',
    author: 'Traditional folktale',
    jurisdiction: 'US',
    basis: 'adapted',
    note: 'Traditional folktale, retold for young children',
  },
}
