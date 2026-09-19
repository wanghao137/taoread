import type { PackBook } from '../types'

/**
 * Just So Stories — four tales retold for very young English readers.
 * Text: Project Gutenberg eBook #2781 (Rudyard Kipling, 1902). Public domain worldwide
 * (Kipling died 1936; 70y pma expired). Plot and animal explanations follow the original
 * stories; wording simplified into short sentences for children aged 3–5.
 */
export const justSoStories: PackBook = {
  id: 'just-so',
  title: 'Just So Stories',
  author: 'Rudyard Kipling',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: 'How did the whale get his throat? Why does the camel have a hump? Long, long ago, things were quite different — and here are the stories of how they came to be.',
  coverArt: 'just-so-animals',
  coverArtPrompt: 'a big blue whale in a sparkling sea, a camel with a hump, a rhinoceros with folded skin and a spotted leopard all sitting together on a golden beach under a tall striped sun',
  coverFrom: '#E65100',
  coverTo: '#FFAB91',
  source: 'Project Gutenberg eBook #2781, public domain (Kipling d. 1936)',
  chapters: [
    {
      title: 'Chapter 1 · How the Whale Got His Throat',
      art: 'whale-sea',
      artPrompt: 'a huge blue whale swimming in a deep green sea, a tiny fish nearby and a small raft with a mariner in a blue jersey on the waves',
      blocks: [
        {
          kind: 'text',
          text: 'In the sea, once upon a time, there was a Whale. He ate all the fishes he could find, until only one little fish was left in all the sea. It was a small, clever fish called the "Stute Fish.',
        },
        {
          kind: 'image',
          art: 'whale-sea',
          text: 'The great Whale swimming in the deep green sea.',
        },
        {
          kind: 'text',
          text: 'The Whale told the "Stute Fish he was hungry. The little fish said, "If you want something different, swim to latitude Fifty North and longitude Forty West. There you will find a shipwrecked Mariner, with a knitted raft and a blue jersey."',
        },
        {
          kind: 'note',
          text: 'New word: raft — a little boat made of logs tied together with rope.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The Whale swam and swam. When he came to the place, he opened his mouth wide — and swallowed the Mariner, and the raft, and the knitted jacket, and the little "Stute Fish hid behind the raft.',
        },
        {
          kind: 'text',
          text: 'Inside the whale it was dark and wet. The Mariner was very angry. He stamped up and down, and he danced a hornpipe on the floor of the whale’s stomach. "Hiccough! Hiccough!" went the Whale. "Take me home!" cried the Mariner.',
        },
        {
          kind: 'text',
          text: 'So the Whale swam to the shore of England. As soon as he was close, the Mariner slipped out. But first he made a grating of wood and thrust it crosswise into the whale’s throat. From that day to this, a whale can only eat very small things — and that is why he can never swallow a man.',
        },
      ],
    },
    {
      title: 'Chapter 2 · How the Camel Got His Hump',
      art: 'camel-desert',
      artPrompt: 'a camel with a great big hump standing on yellow desert sand dunes, a horse, a dog and an ox watching him, a huge striped sun setting low',
      blocks: [
        {
          kind: 'text',
          text: 'In the middle of the Howling Desert, where nothing grew and nobody came, there lived a Camel. He had no hump at all. He did no work, and when anyone spoke to him he only said, "Humph!"',
        },
        {
          kind: 'image',
          art: 'camel-desert',
          text: 'The Camel in the desert, with the hot sun high above him.',
        },
        {
          kind: 'text',
          text: 'The Horse came to him. "Camel, come out and trot like me." The Camel said, "Humph!" The Dog came. "Camel, come and fetch and carry like me." "Humph!" said the Camel. The Ox came too. "Camel, come and plough like me." "Humph!"',
        },
        {
          kind: 'note',
          text: 'New word: humph — a grumpy little grunt that means "I will not do any work at all!"',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The three animals went to Man and told him. Man said, "Very well. Since the Camel will not work, the three of you must do double work to make up for him." The Horse, the Dog, and the Ox were very angry.',
        },
        {
          kind: 'text',
          text: 'At the end of the world there lived the Djinn of All Deserts. He came rolling in a cloud of dust. The animals told him about the lazy Camel. The Djinn went to find him.',
        },
        {
          kind: 'text',
          text: '"Camel," said the Djinn, "why do you do no work?" "Humph!" said the Camel. Then the Djinn put a strong magic on him. Right there on his back, a great big humph grew up! "Now," said the Djinn, "you can go three days without eating, for you have your humph to live on. And you will work!" From that day to this, the Camel has a hump — and he has never caught up with the three days of work he missed.',
        },
      ],
    },
    {
      title: 'Chapter 3 · How the Rhinoceros Got His Skin',
      art: 'rhino-beach',
      artPrompt: 'a rhinoceros on warm sand by a blue sea, his skin hanging in wrinkled folds, cake crumbs and dates scattered around him, a striped sun above',
      blocks: [
        {
          kind: 'text',
          text: 'Long ago, the Rhinoceros had a smooth, tight skin, with no folds in it at all. He had three buttons down the middle of it, and he looked very fine.',
        },
        {
          kind: 'image',
          art: 'rhino-beach',
          text: 'The Rhinoceros on the warm sand of the Red Sea shore.',
        },
        {
          kind: 'text',
          text: 'On a little island in the Red Sea there lived a Parsee. One hot day he took off his shiny hat, for it was very warm, and he baked a most beautiful rich currant cake on the sand.',
        },
        {
          kind: 'note',
          text: 'New word: smooth — flat and even, with no bumps and no wrinkles at all.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The Rhinoceros came up out of the sea. He smelled the cake, and he ate it all up, and the Parsee was very angry indeed. But the Rhino only winked, and went back into the water. The Parsee said nothing, and waited.',
        },
        {
          kind: 'text',
          text: 'One day the Rhinoceros came to the shore to bathe. He took off his skin and laid it on the sand while he splashed in the water. The Parsee crept up and filled the skin, from top to bottom, with stale cake-crumbs, burnt raisins, and sticky dates.',
        },
        {
          kind: 'text',
          text: 'When the Rhinoceros put his skin on again, it itched and itched! He scratched and rolled, and the crumbs rubbed in deeper and deeper. The skin wrinkled and folded, and it never got smooth again. And from that day to this, every rhinoceros wears his skin in folds, and is short-tempered and itchy.',
        },
      ],
    },
    {
      title: 'Chapter 4 · How the Leopard Got His Spots',
      art: 'leopard-spots',
      artPrompt: 'a leopard with five-finger black spots lying in the striped shadows of a dark forest, an Ethiopian with black skin pressing painted fingers onto his fur',
      blocks: [
        {
          kind: 'text',
          text: 'In the High Veldt, the great yellow plain of South Africa, there lived a Leopard and an Ethiopian. They were both the colour of the dry grass — a yellowy-brownish colour — and they hunted the giraffes and the zebras together.',
        },
        {
          kind: 'image',
          art: 'leopard-spots',
          text: 'The Leopard standing in the striped shadows of the forest.',
        },
        {
          kind: 'text',
          text: 'But after a long time, the giraffes and the zebras went away. They went to the great forest, where the trees and the shadows were striped and spotted. And there they turned brown and striped and dappled too.',
        },
        {
          kind: 'note',
          text: 'New word: camouflage — colours or patterns that make an animal very hard to see.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The Leopard and the Ethiopian followed them into the forest. But on the dark ground, their yellow-brown skins stood out like bright lamps, and the animals ran away laughing. They could not catch anything at all.',
        },
        {
          kind: 'text',
          text: 'The Ethiopian said, "We must change our skins too." First he made himself a new black skin and put it on. Then he took his five fingers, dipped them in black, and pressed them all over the Leopard’s fur.',
        },
        {
          kind: 'text',
          text: 'Each finger-mark made a spot, close together, like the print of five little black fingers. Now the Leopard could lie in the shadows of the forest, and you could look straight at him and never see him at all, until he moved. And that is how the Leopard got his spots.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Just So Stories',
    author: 'Rudyard Kipling',
    authorDeathYear: 1936,
    jurisdiction: 'EU',
    basis: 'pd-70',
    sourceUrl: 'https://www.gutenberg.org/ebooks/2781',
    note: 'Published 1902; public domain worldwide (Kipling d. 1936, 70y pma expired). Tales follow Project Gutenberg eBook #2781; wording simplified into short sentences for very young English readers.',
  },
}
