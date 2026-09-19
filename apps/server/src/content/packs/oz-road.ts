import type { PackBook } from '../types'

/**
 * The Road to Oz — L. Frank Baum (1856–1919), first published 1909. Retold
 * in five chapters in simple English for readers aged 6-8: Dorothy and the
 * Shaggy Man follow an enchanted road, collect a lost little boy and a
 * rainbow's daughter, and arrive just in time for Ozma's birthday.
 * Source: public domain text (published 1909, US pre-1929; Baum d. 1919).
 */
export const ozRoad: PackBook = {
  id: 'oz-road',
  title: 'The Road to Oz',
  author: 'L. Frank Baum',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'Dorothy takes a walk on a Kansas road and cannot find her way home — because the road has other plans. With the Shaggy Man, a small lost boy, and a rainbow\'s daughter, she walks straight to Ozma\'s birthday.',
  coverArt: 'road-golden',
  coverArtPrompt: 'a golden brick road winding across green meadows toward distant emerald towers, a girl in a gingham dress and a shaggy old man in patched clothes walking along it, a small boy and a dancing maiden in rainbow colours behind them, wildflowers in the grass, warm late-afternoon light with a faint rainbow overhead, glowing storybook illustration',
  coverFrom: '#F57F17',
  coverTo: '#FFE082',
  source: 'The Road to Oz (L. Frank Baum, 1909), public domain (Baum d. 1919)',
  chapters: [
    {
      title: 'Chapter 1 · The Wrong Road',
      art: 'road-fork',
      artPrompt: 'a Kansas country road forking into seven branching lanes under a wide summer sky, a girl in a gingham dress and a shaggy old man with a bundle on his back scratching their heads, a small boy sitting patiently in the grass at the crossroads, wheat fields and a red barn far off, bright noon light, cheerful storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'Dorothy went for a long walk one summer day, and lost her way. At a crooked crossroads sat a shaggy old man. "Which is the way to Butterfield?" he asked. Dorothy did not know.',
        },
        {
          kind: 'image',
          art: 'road-fork',
          text: 'Every road they take turns out to be wrong.',
        },
        {
          kind: 'text',
          text: 'They tried one lane, and it curled back the wrong way. They tried another, and it doubled like a knot. "This road is enchanted," said the Shaggy Man. And he was quite right.',
        },
        {
          kind: 'note',
          text: 'New word: enchanted — changed by magic, so it is not quite ordinary. An enchanted road can go anywhere it likes.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'In the grass they found a small boy with a neat sailor suit. His name was Button-Bright, and when they asked him anything, he smiled and said, "Don\'t know." He had been lost so long, he was not worried at all.',
        },
      ],
    },
    {
      title: 'Chapter 2 · Foxville and Bear Center',
      art: 'road-foxville',
      artPrompt: 'a village of tidy burrows where foxes in waistcoats bow politely, a girl in a gingham dress laughing at her own new fox face in a small mirror held by the fox king, a small boy beside her wearing a round bear head, flower-decked archways, bright playful daylight, funny gentle storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'The enchanted road brought them to Foxville, where foxes wear clothes and bow politely. King Dox of Foxville thought Dorothy\'s curls were a great honour. "You shall have a fox head!" he declared. And so she did.',
        },
        {
          kind: 'image',
          art: 'road-foxville',
          text: 'A fox head for Dorothy, and a bear head for Button-Bright.',
        },
        {
          kind: 'text',
          text: 'Farther on, at Bear Center, the Teddy Bear King gave Button-Bright the same kind of honour, only with bears. The boy looked at his new round head and said, "Don\'t know." It suited him very well.',
        },
        {
          kind: 'note',
          text: 'Talk about it: the kings meant to be kind, but the children missed their own faces. Kind gifts still need asking first.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"How do we get to the Emerald City?" asked the Shaggy Man. "Walk the enchanted road," said King Dox, "and cross the desert upon it. It goes where Oz is." So on they went, strange heads and all.',
        },
      ],
    },
    {
      title: 'Chapter 3 · Polychrome\'s Rainbow',
      art: 'road-rainbow',
      artPrompt: 'a shimmering rainbow arching down to a green hillside, a graceful maiden in floating rainbow-coloured gauze dancing down its last step, travellers watching and waving, a small fox-headed girl clapping, soft mist around the rainbow foot, silver and prismatic light over green fields, joyful storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'One bright morning a rainbow came down to the hills. Down its arch danced a maiden in colours — the Daughter of the Rainbow, Polychrome.',
        },
        {
          kind: 'image',
          art: 'road-rainbow',
          text: 'Polychrome dances down and the rainbow rises away.',
        },
        {
          kind: 'text',
          text: 'While she danced, the rainbow rose back into the sky without her. She did not cry. She simply joined the travelers, and the road felt lighter with her on it.',
        },
        {
          kind: 'note',
          text: 'Ask your child: what colour would you wear if you lived on a rainbow? Polychrome wears them all at once.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Then the road grew wide and golden, and carried them right across the Deadly Desert, where no one can live. On the far side, the air smelled of flowers. "Welcome to Oz," said the Shaggy Man.',
        },
      ],
    },
    {
      title: 'Chapter 4 · Ozma\'s Birthday',
      art: 'road-birthday',
      artPrompt: 'a grand emerald courtyard decked with garlands and banners, a fairy princess in green greeting a crowd of wonderful guests, a stout jolly man in a red fur coat carrying a sack of toys, a rainbow maiden and children with animal heads among emerald citizens, musicians and paper streamers, brilliant festive daylight, joyful storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'The Emerald City was dressed in garlands. "It is Ozma\'s birthday," everyone cried. The Wizard of Oz waved his wand, and Dorothy\'s fox face and Button-Bright\'s bear face melted away like morning mist.',
        },
        {
          kind: 'image',
          art: 'road-birthday',
          text: 'Guests from everywhere arrive for the birthday.',
        },
        {
          kind: 'text',
          text: 'Guests came from every corner of the fairy countries. And then, over the rooftops, came a stout jolly man in a red coat, with a great sack on his back. "Santa Claus!" cried Dorothy. He had come to Ozma\'s party too.',
        },
        {
          kind: 'note',
          text: 'If you could invite anyone at all to a birthday party, who would come? Name your guests one by one, and what each would bring.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'There was music, and cake, and games on the lawn. Polychrome danced, Button-Bright smiled, and the Shaggy Man told stories until the lanterns came out. It was the finest party the Emerald City had ever seen.',
        },
      ],
    },
    {
      title: 'Chapter 5 · Wishes and Goodbyes',
      art: 'road-goodbye',
      artPrompt: 'a fairy princess in green granting a wish with a raised hand, warm magic swirling around a girl in a gingham dress, a shaggy old man and a small boy holding hands, the emerald city gates behind them and a faint Kansas road appearing in sparkling air, tender golden evening light, gentle storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'On the last morning, Ozma asked each visitor for a wish. "I wish to go home," said Dorothy, "with my friends." The Shaggy Man and Button-Bright nodded their heads.',
        },
        {
          kind: 'image',
          art: 'road-goodbye',
          text: 'Ozma grants the travelers their wish.',
        },
        {
          kind: 'text',
          text: 'Ozma raised her hand, and the air filled with warm sparkles. When they cleared, the three stood on a quiet Kansas road, as if they had never left it.',
        },
        {
          kind: 'note',
          text: 'New word: wish — something you hope for with your whole heart. Some wishes come true slowly, and that is all right too.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"I shall know the way next time," said Dorothy, looking down the road. Somewhere far away, past the desert, the golden bricks waited. And that is the best kind of goodbye — the kind that keeps a door open.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Road to Oz',
    author: 'L. Frank Baum',
    authorDeathYear: 1919,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Published 1909; US public domain (pre-1929). Retold for children aged 6-8; plot follows the public-domain original.',
  },
}
