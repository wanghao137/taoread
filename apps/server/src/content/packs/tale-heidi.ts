import type { PackBook } from '../types'

/**
 * Heidi — four chapters retold for young English readers.
 * Text: Project Gutenberg eBook #144 (Johanna Spyri, "Heidis Lehr- und Wanderjahre",
 * English translation by Helen B. Dole, 1884 English edition). Public domain worldwide
 * (Spyri died 1901; 70y pma expired). Plot follows the original story; wording
 * simplified into short sentences for children aged 6–8.
 */
export const heidi: PackBook = {
  id: 'heidi',
  title: 'Heidi',
  author: 'Johanna Spyri',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'A little Swiss girl goes to live with her strange grandfather high on the mountain, and brings sunshine with her wherever she goes.',
  coverArt: 'alp-hut',
  coverArtPrompt: 'a little girl in a red dress and straw hat standing in a green alpine meadow full of wildflowers, a small wooden hut and tall fir trees behind her, snowy mountain peaks and blue sky above',
  coverFrom: '#5E35B1',
  coverTo: '#B39DDB',
  source: 'Project Gutenberg eBook #144, public domain (Spyri d. 1901)',
  chapters: [
    {
      title: 'Chapter 1 · Up the Mountain to Grandfather',
      art: 'alpine-path',
      artPrompt: 'a little girl in a red dress climbing a steep green mountain path, dark fir trees and snowy peaks above, a wooden hut at the top with an old bearded man outside',
      blocks: [
        {
          kind: 'text',
          text: 'On a bright June morning, Aunt Deta led a little girl up the steep path that wound up the side of the mountain. The girl was Heidi, and she was five years old. She wore a thick red dress, and she had been brought from her old home to be left with her grandfather.',
        },
        {
          kind: 'image',
          art: 'alpine-path',
          text: 'The steep path that led up to the grandfather’s hut.',
        },
        {
          kind: 'text',
          text: 'Higher and higher they climbed. The mountain grew greener, and the fir trees stood up tall and dark against the blue sky. Heidi looked at everything with wide eyes, and she was not a bit tired.',
        },
        {
          kind: 'note',
          text: 'New word: hut — a small, simple house, often made of wood.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'At the very top of the slope stood a little wooden hut, and beside it an old man with a gray beard sat on a bench. The people of the village below said he was strange and cross, and that no one could live with him.',
        },
        {
          kind: 'text',
          text: 'Aunt Deta left Heidi with the old man and hurried away. The grandfather looked at the child for a long time in silence. "What is your name?" he said at last. "Heidi," said the little girl. "I have come to stay with you." The grandfather made a bed of straw, and from that day Heidi had a home on the mountain.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Mountain Pasture',
      art: 'goat-pasture',
      artPrompt: 'a girl in a red dress skipping across a green alpine pasture dotted with yellow and blue flowers, a boy with a flock of white and brown goats, golden sunset on the peaks',
      blocks: [
        {
          kind: 'text',
          text: 'Very early the next morning, Heidi heard a loud whistle. It was Peter, the goat-boy, who came up the mountain every day with his flock. He had many goats — Greenfinch, Little Swan, Little Bear, and the others.',
        },
        {
          kind: 'image',
          art: 'goat-pasture',
          text: 'Peter the goat-boy with his goats on the green pasture.',
        },
        {
          kind: 'text',
          text: 'Heidi was to go with Peter to the high pasture. Grandfather packed her lunch — bread and a big slice of cheese — and filled a little cup with milk, fresh and warm from the goats.',
        },
        {
          kind: 'note',
          text: 'New word: pasture — a green mountain field where animals come to eat the grass.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Up and up they climbed, and Heidi skipped like a young goat, for she was never afraid of anything. At the top, the green slope was covered with little yellow and blue flowers, and the wind was sweet and warm.',
        },
        {
          kind: 'text',
          text: 'When the sun began to go down, the mountainsides turned red and golden. Heidi thought a great fire must be burning on the peaks. "Look, Peter!" she cried. "The mountains are all on fire!" But it was only the last light of the sun, and Heidi watched it until the colors faded away.',
        },
      ],
    },
    {
      title: 'Chapter 3 · Grandfather’s Hut',
      art: 'hay-loft',
      artPrompt: 'a girl asleep on a bed of golden hay under a round attic window, stars and fir branches visible outside, a wooden sleigh leaning against the hut below',
      blocks: [
        {
          kind: 'text',
          text: 'Heidi slept in the loft of the hut, on a bed of sweet dry hay. Through the little round window she could see the sky and the stars, and she could hear the fir trees whispering in the wind. She was the happiest child in all the world.',
        },
        {
          kind: 'image',
          art: 'hay-loft',
          text: 'Heidi’s little bed of hay under the round window.',
        },
        {
          kind: 'note',
          text: 'New word: hay — grass that has been cut and dried, to feed animals or to sleep on.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'When the first snow came, Peter could no longer bring his goats so high. Grandfather made a little wooden sleigh, covered it with a warm blanket, and took Heidi down the mountain to visit Peter’s grandmother.',
        },
        {
          kind: 'text',
          text: 'The old grandmother was nearly blind and could not work. Heidi sat beside her and told her all about the mountains, the goats, and the red sunsets. "You bring the sunshine into my dark room," said the grandmother.',
        },
        {
          kind: 'text',
          text: 'Heidi wanted to read to the grandmother, so grandfather gave her a beautiful book with pictures of shepherds and sheep on the hills. She practiced her letters every evening, until she could read the songs aloud by herself.',
        },
      ],
    },
    {
      title: 'Chapter 4 · Frankfurt',
      art: 'frankfurt-house',
      artPrompt: 'a great gray stone house with rows of tall windows on a city street, a girl in a stiff white dress looking out of an upstairs window toward distant mountains',
      blocks: [
        {
          kind: 'text',
          text: 'One autumn day, Aunt Deta came back to the mountain. "Heidi must go to Frankfurt," she said. "There is a rich lady who wants a companion for her daughter Clara, who cannot walk and sits all day in a wheelchair. Heidi will learn fine things, and wear good clothes."',
        },
        {
          kind: 'image',
          art: 'frankfurt-house',
          text: 'The great stone house in Frankfurt, with its rows of windows.',
        },
        {
          kind: 'note',
          text: 'New word: wheelchair — a chair with wheels, for someone who cannot walk.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'In Frankfurt, Heidi wore a stiff white dress and learned to sit still at table. Clara was gentle and kind, and the two girls soon loved each other. But Heidi missed her mountains. She could not see a single tree from the tall windows, and she grew quiet and sad.',
        },
        {
          kind: 'text',
          text: 'The kind grandmamma came to visit. She read Heidi stories and taught her to pray for what she needed. But Heidi’s heart still ached for the fir trees and the green pasture above the clouds.',
        },
        {
          kind: 'image',
          art: 'alpine-path',
          text: 'Heidi riding home through the snow, with her basket of white bread rolls.',
        },
        {
          kind: 'text',
          text: 'At last Heidi grew so homesick that she walked in her sleep, and the doctor said she must go home at once. She carried a basket of soft white bread rolls — for the grandmother up the mountain, whose teeth could no longer chew hard bread. Heidi kissed Clara good-bye and rode home through the snow, her heart singing.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Heidi',
    author: 'Johanna Spyri',
    authorDeathYear: 1901,
    translator: 'Helen B. Dole (English translation, 1884)',
    jurisdiction: 'EU',
    basis: 'pd-70',
    sourceUrl: 'https://www.gutenberg.org/ebooks/144',
    note: 'Published 1881 in German; public domain worldwide (Spyri d. 1901, 70y pma expired). English text from Project Gutenberg eBook #144; wording simplified into short sentences for young English readers.',
  },
}
