import type { PackBook } from '../types'

/**
 * The Nightingale and Other Tales — four tales retold in simple English.
 * Text: Project Gutenberg eBook #27100 (Hans Christian Andersen). Public domain in the
 * US (pre-1929) and worldwide (Andersen d. 1875; 70y pma expired). Plots follow the
 * original stories; wording simplified into short sentences for young readers.
 */
export const andersenMore: PackBook = {
  id: 'tale-andersen2',
  title: 'The Nightingale and Other Tales',
  author: 'Hans Christian Andersen',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'A little grey bird whose song can chase away Death. A match girl on a snowy New Year’s Eve. A soldier and three magic dogs. And a princess who could feel a tiny pea through twenty mattresses!',
  coverArt: 'nightingale-palace',
  coverArtPrompt: 'a little grey bird singing on a branch outside a Chinese palace window, a golden cage hanging open inside, cherry blossoms, a soft golden moon',
  coverFrom: '#6A1B9A',
  coverTo: '#CE93D8',
  source: 'Project Gutenberg eBook #27100, public domain (Andersen d. 1875)',
  chapters: [
    {
      title: 'Chapter 1 · The Nightingale',
      art: 'nightingale-sage',
      artPrompt: 'a small grey nightingale singing in a flowering sage bush by a high palace wall, an open golden book on a marble seat, soft morning light',
      blocks: [
        {
          kind: 'text',
          text: 'In China, in the garden of the Emperor, lived a little Nightingale. She was a plain grey bird, but her song was the most beautiful thing in all the world. Travellers came from far away to hear her, and poets wrote books about her song.',
        },
        {
          kind: 'image',
          art: 'nightingale-sage',
          text: 'The plain little Nightingale, singing in the palace garden.',
        },
        {
          kind: 'note',
          text: 'New word: plain — not decorated and not fancy. The nightingale looked plain, but her voice was wonderful.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'One day the Emperor heard of the bird. "Bring me the Nightingale!" he commanded. The servants searched the garden, and at last they found her in the sage bushes. She came to the palace and sang. The Emperor was so happy that tears came into his eyes. The nightingale was allowed to come and go as she pleased.',
        },
        {
          kind: 'text',
          text: 'Then one day a present came from the Emperor of Japan: a mechanical nightingale, covered all over with diamonds and rubies. It could sing the same tune over and over, and it never grew tired. Everyone praised the new bird, and the real Nightingale was forgotten. Sadly, she flew away to her green wood.',
        },
        {
          kind: 'text',
          text: 'One evening the mechanical bird broke with a "Whirr!" and could sing no more. Years passed. The Emperor grew ill, and Death came into his great hall. The courtiers had all run away. The Emperor lay alone, and cold, and frightened.',
        },
        {
          kind: 'text',
          text: 'Then, at the window, came a little song. The real Nightingale had come back! She sang of the quiet churchyard, of the roses and the warm sun, and Death listened, and listened, and at last he turned into a cold white mist and floated away out of the window. The Emperor opened his eyes and smiled. "Sweet little bird," he said, "stay with me always, and I will give you a golden slipper to wear." But the Nightingale said, "I cannot live in a cage. Let me come when I please. I will sit on the branch by your window and sing to you, and I will ask only this: that you remember me, and remember all the good things you have seen." And so it was, and the Emperor ruled wisely for many years.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Little Match Girl',
      art: 'match-girl',
      artPrompt: 'a small barefoot girl in a thin grey dress huddled between two snow-covered houses on a New Year’s Eve, a bright warm glow rising from a single match in her hands, snowflakes falling',
      blocks: [
        {
          kind: 'text',
          text: 'It was New Year’s Eve, and it was terribly cold. The snow fell fast in the dark streets. A poor little girl walked along, barefoot and shivering. In her old apron she carried a bundle of matches. All day she had cried, "Matches for sale!" But nobody had bought any.',
        },
        {
          kind: 'image',
          art: 'match-girl',
          text: 'The little match girl in the snow, lighting her first match.',
        },
        {
          kind: 'text',
          text: 'She sat down in a corner between two houses. Her little hands were numb with cold. She drew one match out of the bundle, and struck it against the wall, and it burned with a warm clear flame. It seemed to her as if she were sitting before a great bright iron stove. She stretched out her feet to warm them, and the fire went out, and the stove was gone.',
        },
        {
          kind: 'note',
          text: 'The match was magic! Think of a warm thing you would like to see if you were cold. What would you wish for?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'She struck a second match. Now she saw a feast on the table: roast goose stuffed with apples, and steaming plum pudding. But the match went out, and only the cold wall was there. A third match, and there stood a Christmas tree, taller and brighter than any she had ever seen, with thousands of candles. The lights rose higher and higher, till they were stars in the sky.',
        },
        {
          kind: 'text',
          text: 'Then the little girl struck all the matches she had left, one after another. In the great brightness she saw her grandmother, kind and gentle, smiling down at her. "Grandmother!" cried the little girl. "Take me with you! I know you will go away when the matches go out." She held the matches in both hands, and her grandmother took her up in her arms, and they flew away, high and higher, to a place where there is no cold, and no hunger, and no fear.',
        },
        {
          kind: 'text',
          text: 'In the morning, the people found the little girl in the corner, with a whole bundle of burnt matches around her. "The poor child tried to keep warm," they said. But nobody knew what beautiful things she had seen, nor into what glory she had gone with her grandmother. And the new sun rose, and the new year began.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Tinderbox',
      art: 'tinderbox-dogs',
      artPrompt: 'a soldier in a red coat standing at the entrance of a hollow old tree in a dark forest, three little dogs with eyes big as saucers peeping out, gold coins glimmering inside',
      blocks: [
        {
          kind: 'text',
          text: 'A soldier came marching home along the high road. He had served long and hard, and now he had nothing at all. As he walked, he met an old witch. "There is a hollow tree just ahead," she said. "Climb down inside, and you will find three rooms full of money. But bring me an old tinderbox that lies there."',
        },
        {
          kind: 'image',
          art: 'tinderbox-dogs',
          text: 'The soldier and the three dogs in the hollow tree.',
        },
        {
          kind: 'note',
          text: 'New word: tinderbox — a little box of dry cloth and flint used in old days to strike a light for a fire.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The soldier climbed down and filled his pockets with gold. On the way out, he asked the witch what she wanted with the tinderbox. She would not say. So he cut off her head, kept the tinderbox, and went into the town. Now he had money, and he bought fine clothes and good dinners for everyone.',
        },
        {
          kind: 'text',
          text: 'In the town there was a beautiful princess, locked up in a tower. The King and Queen kept her there all alone. The soldier wanted to see her. He struck a light on the tinderbox, and click! A little dog with eyes as big as saucers ran up. "What are my master’s orders?" said the dog. "Bring me the princess," said the soldier. And the dog ran off and brought her, asleep on his back.',
        },
        {
          kind: 'text',
          text: 'The dog came every night, until one morning the Queen saw where the princess had been. The soldier was taken and locked up in prison. The King said he must be hanged in the morning. The soldier begged a boy to run to his room and fetch the tinderbox. The boy brought it, and the soldier struck fire, once, twice, three times. Out came the three great dogs, with eyes like saucers, like mill-wheels, and like the round tower of Copenhagen.',
        },
        {
          kind: 'text',
          text: '"Take care of me!" cried the soldier. The dogs jumped on the judges and the King and the Queen, and threw them all up into the air. Nobody dared to say a word. Then the soldier married the princess, and the three dogs sat at the table and ate off golden plates. And everyone lived happily ever after.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Princess and the Pea',
      art: 'pea-mattress',
      artPrompt: 'a tall stack of twenty mattresses and twenty eider-down quilts in a palace bedchamber, a small green pea at the very bottom, a tired princess on top in a long white nightgown, rain at the window',
      blocks: [
        {
          kind: 'text',
          text: 'There was once a prince who wanted to marry a princess. But she had to be a real princess. He travelled all over the world to find one. There were plenty of princesses, but he could never be quite sure. There was always something not quite right. So he came home again, very sad.',
        },
        {
          kind: 'image',
          art: 'pea-mattress',
          text: 'The pile of mattresses, with the little pea at the bottom.',
        },
        {
          kind: 'text',
          text: 'One evening a terrible storm came on. The rain poured down and the lightning flashed. Then there was a knock at the town gate. The King went out and opened it. There stood a princess, in such a state! The water ran down her hair and her clothes and out at her heels. But she said she was a real princess.',
        },
        {
          kind: 'note',
          text: 'Fun word: eider-down — the soft warm feathers from an eider duck, used to make the cosiest quilts.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"We shall soon see about that," thought the old Queen. She did not say a word. She went into the bedroom, took off all the bedclothes, and laid a little green pea on the bare boards. Then she put twenty mattresses on top of the pea, and twenty eider-down quilts on top of the mattresses. There the princess was to sleep.',
        },
        {
          kind: 'text',
          text: 'In the morning they asked her how she had slept. "Oh, most terribly!" said the princess. "I have hardly closed my eyes all night. Goodness knows what was in the bed. I lay on something so hard that I am black and blue all over." Now they could see she was a real princess, for no one but a true princess could be so sensitive as to feel a pea through twenty mattresses and twenty quilts.',
        },
        {
          kind: 'text',
          text: 'The prince married her, for now he knew he had found a real princess. And the pea was put into the royal museum, where it may still be seen today. And that is a true story.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Nightingale and Other Tales',
    author: 'Hans Christian Andersen',
    authorDeathYear: 1875,
    jurisdiction: 'US',
    basis: 'pd-us',
    sourceUrl: 'https://www.gutenberg.org/ebooks/27100',
    note: 'Retold in simple English for young readers; plot follows the public-domain original. Tales published 1835-1844; US public domain (pre-1929) and worldwide (Andersen d. 1875, 70y pma expired).',
  },
}
