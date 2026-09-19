import type { PackBook } from '../types'

/**
 * Jack and the Beanstalk — traditional English folktale, retold for young children
 * in five chapters. The giant is a sleepy, clumsy fellow: he grumbles and stomps,
 * but Jack always slips away, and nobody is hurt.
 * Source: traditional folk tale, public domain.
 */
export const jackBeanstalk: PackBook = {
  id: 'jack-beanstalk',
  title: 'Jack and the Beanstalk',
  author: 'Traditional folktale',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: 'Jack sells the family cow for five magic beans. Overnight they grow into a beanstalk that reaches the clouds — and at the top, a castle waits!',
  coverArt: 'beanstalk',
  coverArtPrompt: 'a giant green beanstalk twisting up into white clouds, a small boy in a red cap climbing the leaves, a tiny castle glinting in the sky',
  coverFrom: '#2E7D32',
  coverTo: '#A5D6A7',
  source: 'Traditional English folktale, retold for young children',
  chapters: [
    {
      title: 'Chapter 1 · Five Magic Beans',
      art: 'cottage-cow',
      artPrompt: 'a small thatched cottage, a boy leading a white cow by a rope, a country road and green fields',
      blocks: [
        {
          kind: 'text',
          text: 'Once upon a time, Jack lived in a little cottage with his mother. They were very poor, and all they had left was one white cow.',
        },
        {
          kind: 'image',
          art: 'cottage-cow',
          text: 'Jack leading the white cow along the road.',
        },
        {
          kind: 'text',
          text: '"Take the cow to market and sell her," said his mother. So Jack set off, leading the cow by a rope.',
        },
        {
          kind: 'note',
          text: 'New word: market — a place where people buy and sell things.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'On the way Jack met an old man. "That is a fine cow," said the man. "I will buy her — with these." He held out five beans.',
        },
        {
          kind: 'text',
          text: '"Magic beans!" said the old man. "Plant them, and see." Jack thought that was a fine trade, and he took the beans home.',
        },
        {
          kind: 'text',
          text: 'His mother was not pleased at all. "Beans!" she cried. She threw them out of the window, and Jack went to bed with no supper.',
        },
      ],
    },
    {
      title: 'Chapter 2 · Up to the Clouds',
      art: 'beanstalk',
      artPrompt: 'an enormous green beanstalk growing past the cottage window into the clouds, Jack in a red cap looking up in amazement',
      blocks: [
        {
          kind: 'text',
          text: 'When Jack woke up the next morning, the garden was dark. He looked out of the window — and there it was! A beanstalk, tall and green, growing up and up into the sky.',
        },
        {
          kind: 'image',
          art: 'beanstalk',
          text: 'The beanstalk, taller than the trees, taller than the house.',
        },
        {
          kind: 'text',
          text: 'Jack ran outside. The beanstalk reached right up through the clouds. "I will climb it and see what is up there," he said.',
        },
        {
          kind: 'note',
          text: 'New word: enormous — very, very big. Bigger than a house.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Up and up Jack climbed, through the white clouds, until he came to a road of shining stone. At the end of the road stood a great castle, with towers that touched the sky.',
        },
        {
          kind: 'text',
          text: 'Jack knocked at the door. A great big giantess opened it, and she looked down at him. "Fee-fi-fo-fum!" she said. "A little boy, and a hungry one too. Come in and have some breakfast."',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Castle Above the Clouds',
      art: 'giant-castle',
      artPrompt: 'a huge castle kitchen, a kindly giantess setting a bowl of porridge before a tiny boy, a cat sleeping by the fire',
      blocks: [
        {
          kind: 'text',
          text: 'Jack sat at the giant table and ate bread and honey. Then they heard the ground shake. Boom! Boom! Boom! It was the giant, coming home.',
        },
        {
          kind: 'image',
          art: 'giant-castle',
          text: 'The castle kitchen, where the giantess gave Jack his breakfast.',
        },
        {
          kind: 'text',
          text: '"Quick, hide!" said the giantess, and she popped Jack into the oven. The giant was big and slow and very sleepy. He sniffed the air. "I smell a boy!" he grumbled.',
        },
        {
          kind: 'note',
          text: 'New word: grumbled — complained in a low, rumbly voice, like thunder.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"Nonsense," said the giantess. "It is only the bread." The giant yawned a great yawn, and soon he was snoring — ZZZ, ZZZ, ZZZ — fast asleep by the fire.',
        },
        {
          kind: 'text',
          text: 'Jack crept out of his hiding place, as quiet as a mouse. In the corner of the room he saw something wonderful — a little hen, sitting in a nest of straw.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Little Golden Hen',
      art: 'golden-hen',
      artPrompt: 'a small white hen sitting on a golden egg in a straw nest, Jack tiptoeing away with the hen in his arms, a sleeping giant in the background',
      blocks: [
        {
          kind: 'text',
          text: 'The hen was no ordinary hen. Every time someone said, "Lay!" the hen laid an egg of shining gold.',
        },
        {
          kind: 'image',
          art: 'golden-hen',
          text: 'The little hen, and an egg of solid gold.',
        },
        {
          kind: 'text',
          text: 'Jack carried the hen to the door, as quiet as could be. "Lay," he whispered — and out rolled a golden egg, warm and bright.',
        },
        {
          kind: 'note',
          text: 'New word: ordinary — plain and usual, not special at all.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'But the egg rolled across the floor — clatter, clatter, clatter! The giant opened one eye. "My hen!" he roared. "Stop, thief!"',
        },
        {
          kind: 'text',
          text: 'Jack ran for his life. Through the castle gate, along the stone road, and — with the hen under his arm — he swung himself onto the beanstalk and slid down, down, down.',
        },
        {
          kind: 'text',
          text: 'Down, down, down, until his feet touched the garden at home. "Mother, Mother! Look what I have brought!" And he showed her the hen, and the golden egg.',
        },
      ],
    },
    {
      title: 'Chapter 5 · Safe at Home',
      art: 'jack-home',
      artPrompt: 'Jack and his mother in a sunny cottage garden with a golden egg on the table, the beanstalk far away swaying in the wind',
      blocks: [
        {
          kind: 'text',
          text: 'Now Jack and his mother were never hungry again. The little hen laid a golden egg whenever they asked, and they had bread, and milk, and new shoes.',
        },
        {
          kind: 'image',
          art: 'jack-home',
          text: 'Jack and his mother, safe and happy at home.',
        },
        {
          kind: 'text',
          text: 'But Jack wondered about the castle in the clouds. One day he climbed the beanstalk again, just to see.',
        },
        {
          kind: 'note',
          text: 'New word: wondered — thought about something and wanted to know more.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'When the giant saw him, he began to climb down after him. Boom! Boom! Boom! The whole beanstalk shook.',
        },
        {
          kind: 'text',
          text: 'Jack slid down the last leaves and ran to his mother. "The beanstalk must go!" he cried. They chopped it down — and the giant, stuck in the clouds, grumbled and climbed back to his castle.',
        },
        {
          kind: 'text',
          text: 'He never came down again. And Jack, his mother, and the little golden hen lived happily ever after.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Jack and the Beanstalk',
    author: 'Traditional folktale',
    jurisdiction: 'US',
    basis: 'adapted',
    note: 'Traditional folktale, retold for young children; the giant is softened so that no character is hurt',
  },
}
