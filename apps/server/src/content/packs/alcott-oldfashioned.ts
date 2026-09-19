import type { PackBook } from '../types'

/**
 * An Old-Fashioned Girl — five chapters retold in simple English for
 * young readers. Original: Louisa May Alcott, published 1870. Public
 * domain in the US (pre-1929) and worldwide (Alcott died 1888). Polly
 * Milton's visit to the rich Shaw family, the party, her friendship with
 * Tom, the bank trouble, and the warm ending follow the original novel;
 * wording simplified into short sentences for children aged 9-12.
 */
export const oldFashionedGirl: PackBook = {
  id: 'alcott-oldfashioned',
  title: 'An Old-Fashioned Girl',
  author: 'Louisa May Alcott',
  lang: 'en',
  category: 'tale',
  ageStage: '9-12',
  intro: 'Polly Milton, a country girl with old-fashioned ways, comes to visit her rich friend Fanny in the city. Fine gowns and grand parties cannot match Polly\'s simple cheer - and when trouble comes to the great Shaw house, it is old-fashioned love that holds the family together.',
  coverArt: 'polly-visit',
  coverArtPrompt: 'a girl of fourteen in a plain country dress and shawl holding a small worn trunk on the marble steps of a tall city townhouse, her friend in silk and lace waiting at the ornate door, a grandmother watching kindly from an upstairs window, hansom cabs on the street, soft afternoon light, warm storybook illustration',
  coverFrom: '#6D4C41',
  coverTo: '#FFE0B2',
  source: 'An Old-Fashioned Girl (Louisa May Alcott, 1870), public domain (Alcott d. 1888)',
  chapters: [
    {
      title: 'Chapter 1 · Polly Comes to the City',
      art: 'polly-arrival',
      artPrompt: 'a small girl in a plain quilted gray hood and cloak stepping down from a stagecoach onto a busy city street, holding a little trunk, tall brick townhouses and shop windows around her, her city friend in a silk dress running to meet her, snow-dusted pavement, bright winter morning, storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'Polly Milton grew up in a small country village, where people worked hard and loved each other. One winter day she rode the stagecoach to the great city, to visit her friend Fanny Shaw for six whole weeks. The Shaws lived in a tall, grand house with soft carpets and a marble hall.',
        },
        {
          kind: 'image',
          art: 'polly-parlor',
          text: 'Polly\'s simple hood and cloak look odd among the silk gowns.',
        },
        {
          kind: 'text',
          text: 'Fanny was kind, but she dressed in the newest fashion and spoke of parties and beaus. Polly\'s quilted hood looked so plain that the servants smiled. Polly felt like a duckling among peacocks, and for one homesick minute she longed for the farm. Then she remembered her mother\'s words: "Keep cheerful, and be yourself."',
        },
        {
          kind: 'note',
          text: 'New word: fashion - the style of clothes and manners that people think fine right now. It changes fast; kindness never does.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The youngest Shaw, little Maud, pouted and demanded. Tom, the boy, teased Polly and hid her hat. But Polly only laughed, and helped Maud dress her doll, and soon even Tom could not tease her out of temper. Upstairs, old Grandma watched from her cozy room and thought, "Here is a girl worth knowing."',
        },
      ],
    },
    {
      title: 'Chapter 2 · Old-Fashioned Fun',
      art: 'polly-party',
      artPrompt: 'a grand parlor party with girls in silk gowns and boys in stiff suits, one girl in a plain old-fashioned muslin dress and smooth hair standing bravely among them, chandeliers and mirrors, a boy in the doorway giggling behind his hand, warm candlelight, gentle storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'Fanny took Polly to her first grand party, with music and mirrors and dancing. Polly wore her plain old-fashioned muslin dress and smooth hair, for she had nothing else. Some of the girls whispered, and a rude boy called out that she looked like a grandma. Polly\'s cheeks burned, but she did not run away.',
        },
        {
          kind: 'image',
          art: 'polly-kitchen-games',
          text: 'Blind-man\'s buff in the warm kitchen beats the stiff parlor party.',
        },
        {
          kind: 'text',
          text: '"You looked like a lady all the same," said Tom, "because you were not afraid." Polly smiled and forgave. The next evening she made her own fun: blind-man\'s buff in the kitchen, candy pulled over the fire, and singing round games with Maud and even Grandma. The young Shaws found that they had never laughed so much in that stiff, beautiful parlor.',
        },
        {
          kind: 'note',
          text: 'Talk together: Polly had no fine gown at the party. What made her grand anyway? What makes a person truly pleasant to be with?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'By lamplight Polly often sat with Grandma, sewing and listening to old stories. "The new fashion is to hurry," said Grandma, "and the old fashion is to care." Polly carried that saying in her heart like a smooth stone in a pocket. Slowly the whole house began to feel more like a home.',
        },
      ],
    },
    {
      title: 'Chapter 3 · A Friend for Tom',
      art: 'polly-tom',
      artPrompt: 'a boy of about sixteen with a sheepish grin sitting on a garden wall nursing a scraped knee, a country girl in a plain dress offering him a clean handkerchief, autumn leaves on the path, a grand townhouse garden behind them, late golden afternoon light, friendly storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'Tom Shaw was always in scrapes - lost money, torn coats, ruined lessons. His father scolded, his sisters sighed, and Tom grew more reckless every week. Only Polly scolded him honestly, to his face, and then helped him muddle through. "You are better than your scrapes," she told him, "and you know it."',
        },
        {
          kind: 'image',
          art: 'polly-tea',
          text: 'Polly and Tom settle their friendship over a quiet plate of tea and toast.',
        },
        {
          kind: 'text',
          text: 'No one had ever believed in Tom before, and it did him more good than a hundred lectures. He began to bring his troubles to Polly instead of hiding them. When Fanny was teased by careless young men, it was Polly who stood by her till the tears were dried. Polly\'s visit ended all too soon, and she went back to her village with warm good-byes.',
        },
        {
          kind: 'note',
          text: 'Question for you: Tom met many people who flattered him and one who told him the truth. Which friend helped him more? Why?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Six years slipped by in the city and in the village. Polly learned music and taught the village children to sing. Fanny grew grander and lonelier. Tom grew steadier, and often thought of a plain muslin dress and a honest pair of eyes. Then a letter came to the village: Polly was wanted in the city again, to teach music.',
        },
      ],
    },
    {
      title: 'Chapter 4 · Six Years Later',
      art: 'polly-music-room',
      artPrompt: 'a modest upstairs room with an upright piano, sheet music on the stand, a young woman of twenty in a simple neat dress giving a lesson to a small girl at the keys, a shawl on the chair, winter light through a tall narrow window, rooftops beyond the glass, quiet warm storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'Polly came back to the city as a music teacher, with her own little room and her own hard-earned pennies. Work was slow and rent was high, but Polly held her head up. "I earn my bread," she said, "and that is not old-fashioned at all - it is the oldest fashion there is."',
        },
        {
          kind: 'image',
          art: 'polly-bad-news',
          text: 'Mr. Shaw reads the morning paper, and his face falls like a stone.',
        },
        {
          kind: 'text',
          text: 'Then trouble swept through the grand house like a winter storm. The bank where Mr. Shaw kept his money failed, and in one morning the rich family found itself poor. Servants left, gowns were packed away, and Mr. Shaw sat with his head in his hands. Fanny wept, Maud cried, and Tom came home from his work to help.',
        },
        {
          kind: 'note',
          text: 'New word: bank failure - when a bank loses its money, and the people who trusted it with savings lose too.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Polly rolled up her sleeves. She found the family a smaller, warmer way of living, cooked, comforted, and kept little Maud\'s birthday with paper garlands and homemade cake. "Riches go and come," she said. "A family that loves each other is the fortune that never fails." One by one, the Shaws began to believe her.',
        },
      ],
    },
    {
      title: 'Chapter 5 · The Old-Fashioned Way Home',
      art: 'polly-hearth',
      artPrompt: 'a small cozy parlor with a glowing fireplace, a family of five gathered close on wooden chairs, a young woman in a plain dress playing hymns on a little piano, a gray-haired father smiling in an old easy chair, paper garlands on the shelf, snow at the window, warm lamplight, contented storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'Hard work and true friends slowly mended Mr. Shaw\'s fortunes. He learned to laugh over plain suppers and to read to his children at night, things his riches had long crowded out. "I have lost my money and found my family," he said. "On the whole, a good bargain."',
        },
        {
          kind: 'image',
          art: 'polly-church-walk',
          text: 'The whole family walks to Sunday singing, shoulder to shoulder in the snow.',
        },
        {
          kind: 'text',
          text: 'Tom had grown into a strong, kind man, and everyone could see he had one wish left. Polly blushed and laughed, for her heart had been quietly his for years. There was no grand wedding party, only the family, Grandma\'s blessing, and the old-fashioned words that join two lives. Grandma said Polly had been old-fashioned in the very best way: faithful, cheerful, and true.',
        },
        {
          kind: 'note',
          text: 'Question for you: The Shaws were richest when they were poorest. What did poverty teach them that money never had?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'And so the girl from the country made her home in the city after all, with music in the house and love at the fire. Fanny learned to be useful, Maud to be kind, and Tom to be true. Whoever visits them finds the same rule on the wall: keep cheerful, work honestly, care for each other. It is an old-fashioned rule, and it never wears out.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'An Old-Fashioned Girl',
    author: 'Louisa May Alcott',
    authorDeathYear: 1888,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Retold for children; plot follows the public-domain original. Published 1870; worldwide public domain.',
  },
}
