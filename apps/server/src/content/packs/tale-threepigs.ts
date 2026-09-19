import type { PackBook } from '../types'

/**
 * The Three Little Pigs — traditional English folktale, retold for young children
 * in four chapters (straw, sticks, bricks, and the wolf). The wolf huffs and puffs,
 * but the brick house will not fall.
 * Source: traditional folk tale, public domain.
 */
export const threeLittlePigs: PackBook = {
  id: 'three-little-pigs',
  title: 'The Three Little Pigs',
  author: 'Traditional folktale',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: 'Three little pigs build three houses: one of straw, one of sticks, and one of bricks. Then a big hungry wolf comes huffing and puffing down the lane!',
  coverArt: 'three-houses',
  coverArtPrompt: 'three little pigs in a green meadow, one straw house one stick house one brick house behind them, a grey wolf peeking from behind a tree, sunny sky',
  coverFrom: '#AD1457',
  coverTo: '#F48FB1',
  source: 'Traditional English folktale, retold for young children',
  chapters: [
    {
      title: 'Chapter 1 · The House of Straw',
      art: 'straw-house',
      artPrompt: 'a round little pig building a hut of yellow straw, a bundle of straw on the grass, blue sky with small white clouds',
      blocks: [
        {
          kind: 'text',
          text: 'Once upon a time there were three little pigs. They had grown big, so their mother said, "It is time for you to go out and build your own houses."',
        },
        {
          kind: 'image',
          art: 'straw-house',
          text: 'The first little pig building his house of straw.',
        },
        {
          kind: 'text',
          text: 'The first little pig was lazy. "I will build my house quickly," he said. So he gathered armfuls of straw and stuck them together. His house was finished before lunch.',
        },
        {
          kind: 'note',
          text: 'New word: straw — the dry yellow stems of wheat. It is light and easy to carry.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The second little pig said, "Straw is too weak. I will build my house of sticks." He went to the wood and gathered sticks, and his house was finished before dinner.',
        },
        {
          kind: 'text',
          text: 'The third little pig said, "A house must be strong. I will build mine of bricks." He carried bricks, and mixed cement, and built all day long.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Wolf Comes',
      art: 'wolf-lane',
      artPrompt: 'a big grey wolf with big eyes and a long nose trotting down a country lane, a straw house in the distance, grey clouds creeping in',
      blocks: [
        {
          kind: 'text',
          text: 'One morning a big grey wolf came trotting down the lane. He was hungry, and he could smell a little pig inside the straw house.',
        },
        {
          kind: 'image',
          art: 'wolf-lane',
          text: 'The big grey wolf, trotting down the lane.',
        },
        {
          kind: 'text',
          text: '"Little pig, little pig, let me come in!" called the wolf. "Not by the hair of my chinny chin chin!" said the first little pig.',
        },
        {
          kind: 'note',
          text: 'New word: chinny chin chin — a silly little rhyme pigs say in this story. It means: "No, I will not let you in!"',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"Then I will huff, and I will puff, and I will blow your house down!" said the wolf. He took a big breath, and he huffed, and he puffed — and the straw flew everywhere.',
        },
        {
          kind: 'text',
          text: 'The first little pig squealed and ran as fast as he could to his brother’s house of sticks. The wolf ran after him.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The House of Sticks',
      art: 'stick-house',
      artPrompt: 'two little pigs peering out of a stick house window, the wolf puffing his cheeks to blow, sticks scattering into the air',
      blocks: [
        {
          kind: 'text',
          text: 'Now there were two little pigs inside the stick house, shaking with fright. "He will never blow this house down," said the second little pig.',
        },
        {
          kind: 'image',
          art: 'stick-house',
          text: 'The two little pigs inside the stick house.',
        },
        {
          kind: 'text',
          text: 'But the wolf knocked on the door. "Little pigs, let me come in!" "Not by the hair of our chinny chin chins!" they cried.',
        },
        {
          kind: 'note',
          text: 'New word: squealed — made a loud, high, frightened cry, like a pig.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'So the wolf huffed, and he puffed, and he blew with all his might. The sticks cracked and snapped, and the house fell down with a crash!',
        },
        {
          kind: 'text',
          text: 'The two little pigs ran and ran, all the way to the brick house, where their brother opened the door and pulled them inside. "You are safe here," he said.',
        },
        {
          kind: 'text',
          text: 'The wolf came to the brick house. He huffed and puffed and huffed and puffed. He blew until his face turned red. But the brick house did not move one little bit.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Brick House',
      art: 'brick-house',
      artPrompt: 'a strong red brick chimney-house, three happy pigs at the window, the wolf sitting tired and dizzy on the grass below',
      blocks: [
        {
          kind: 'text',
          text: 'The wolf was too tired to blow any more. "I will climb down the chimney and catch them that way!" he said, and up the roof he went.',
        },
        {
          kind: 'image',
          art: 'brick-house',
          text: 'The wolf climbing up to the chimney of the brick house.',
        },
        {
          kind: 'text',
          text: 'But the third little pig was clever. He filled a big pot with water and hung it over the fire. The water grew hotter, and hotter, and hotter.',
        },
        {
          kind: 'note',
          text: 'New word: chimney — the tall pipe on a roof that carries smoke from the fire outside.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Down the chimney came the wolf — splash! Right into the pot of hot water. "Ow! Ow! Ow!" he howled, and he jumped out and ran away as fast as his legs could carry him.',
        },
        {
          kind: 'text',
          text: 'He ran and ran and was never seen in that country again. The three little pigs lived together in the strong brick house, safe and happy, for ever after.',
        },
        {
          kind: 'text',
          text: 'And whenever they passed the straw and the sticks, they said, "Bricks are best — they keep the wolf out!"',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Three Little Pigs',
    author: 'Traditional folktale',
    jurisdiction: 'US',
    basis: 'adapted',
    note: 'Traditional folktale, retold for young children',
  },
}
