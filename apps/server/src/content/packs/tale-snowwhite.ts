import type { PackBook } from '../types'

/**
 * Snow White — the Grimm brothers' "Schneewittchen", retold for children aged 3-5
 * in five chapters. Source: Project Gutenberg eBook #2591, "Grimm's Fairy
 * Tales" (Jacob & Wilhelm Grimm). The brothers died in 1859 and 1863; public
 * domain in the EU and worldwide under the 70-years-after-death rule (pd-70).
 * Retold in short, easy English, with the frightening parts made gentle.
 */
export const snowWhite: PackBook = {
  id: 'grimm-snowwhite',
  title: 'Snow White',
  author: 'Jacob and Wilhelm Grimm',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: 'A princess with skin as white as snow, lips as red as a rose, and hair as black as ebony has to run away from a wicked queen. Deep in the forest she finds a tiny house — and seven little beds!',
  coverArt: 'snowwhite-house',
  coverArtPrompt: 'a smiling girl in a blue and yellow dress standing at the door of a tiny wooden cottage in a forest clearing, seven little beds visible through the window, deer and rabbits nearby',
  coverFrom: '#1565C0',
  coverTo: '#90CAF9',
  source: 'Project Gutenberg eBook #2591, public domain (Grimm brothers d. 1859/1863)',
  chapters: [
    {
      title: 'Chapter 1 · White as Snow, Red as Blood',
      art: 'snowwhite-queen',
      artPrompt: 'a beautiful dark-haired queen in a purple dress sewing at a window with a black embroidery frame, snow falling outside, drops of red blood on the snow, a magic mirror on the wall',
      blocks: [
        {
          kind: 'text',
          text: 'It was a cold winter day, and snowflakes fell like white feathers. A queen sat at her window sewing. As she looked at the snow, she pricked her finger, and three drops of blood fell on the white ground.',
        },
        {
          kind: 'image',
          art: 'snowwhite-queen',
          text: 'The queen sews by the snowy window.',
        },
        {
          kind: 'note',
          text: 'New word: ebony — a dark wood, almost black, used to make fine combs and boxes.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"If only I had a child as white as snow, as red as blood, and as black as the wood of my ebony frame," she wished. Soon after, a little daughter was born — with skin white as snow, lips red as blood, and hair black as ebony. They called her Snow White.',
        },
        {
          kind: 'text',
          text: 'But the good queen fell ill and died. When Snow White was still small, her father married a proud and jealous woman. The new queen had a magic mirror, and every day she asked it: "Mirror, mirror, on the wall, who is the fairest of us all?"',
        },
        {
          kind: 'text',
          text: 'And the mirror always answered: "You, O Queen, are the fairest of us all." And the queen was happy — for she knew the mirror always told the truth.',
        },
      ],
    },
    {
      title: 'Chapter 2 · Into the Forest',
      art: 'snowwhite-forest',
      artPrompt: 'a frightened girl in a blue dress running through a dark green forest, a huntsman with a kind face standing behind her holding back his dog, tall pine trees and a shaft of sunlight',
      blocks: [
        {
          kind: 'text',
          text: 'The years passed, and Snow White grew prettier and prettier. One day, when she was seven years old, the mirror answered the queen in a new way: "You are fair, but Snow White is a thousand times fairer than you."',
        },
        {
          kind: 'image',
          art: 'snowwhite-forest',
          text: 'The huntsman lets Snow White run into the forest.',
        },
        {
          kind: 'note',
          text: 'New word: jealous — feeling angry or sad because someone else has something you want.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The queen was wild with jealousy. She called her huntsman. "Take the child into the forest," she said, "so that I never see her face again." The huntsman took Snow White by the hand and led her away.',
        },
        {
          kind: 'text',
          text: 'But the huntsman was a good man. When he drew his knife, the girl begged, "Spare my life, and I will run far away and never come back." He was glad to let her go, and he thought, "The wild beasts will surely be kinder than the queen."',
        },
        {
          kind: 'text',
          text: 'To fool the queen, the huntsman killed a wild boar and took it back to the palace. But Snow White ran deeper and deeper into the great wood, far from everyone she knew.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Seven Little Beds',
      art: 'snowwhite-dwarfs',
      artPrompt: 'a tiny cottage room with a long wooden table and seven little chairs and bowls, a girl in a blue dress sleeping across seven little beds, seven dwarfs with coloured hats standing in the doorway looking surprised',
      blocks: [
        {
          kind: 'text',
          text: 'Snow White ran until evening. Then she saw a little house in a clearing. The door was open, and inside everything was tiny and neat — seven little cups, seven little plates, and seven little beds all in a row.',
        },
        {
          kind: 'image',
          art: 'snowwhite-dwarfs',
          text: 'Snow White finds the house of the seven dwarfs.',
        },
        {
          kind: 'note',
          text: 'New word: dwarf — a little person, smaller than a child, who digs for treasure in the mountains.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'She was so hungry and so tired. She ate a little from each plate, and then she laid down across the seven little beds and fell asleep.',
        },
        {
          kind: 'text',
          text: 'When it was quite dark, the owners came home — seven little dwarfs, with pickaxes over their shoulders, for they dug for gold and jewels in the mountain. "Who has been sitting in my chair? Who has been eating from my plate?" they said, one after another.',
        },
        {
          kind: 'text',
          text: 'Then the seventh one looked at his bed and cried, "Look! A beautiful girl is sleeping here!" Snow White woke up and told them her story, and the kind dwarfs said, "If you will keep the house for us, you may stay, and nothing shall harm you."',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Poisoned Apple',
      art: 'snowwhite-apple',
      artPrompt: 'an old woman in a shawl holding out a big red apple to a girl in a blue dress at a cottage window, the magic mirror shown far away in the queen’s palace, dark green forest',
      blocks: [
        {
          kind: 'text',
          text: 'At the palace, the queen asked her mirror who was fairest — and the mirror answered, "Snow White, who lives with the seven dwarfs, is a thousand times fairer than you." The queen knew then that Snow White was alive.',
        },
        {
          kind: 'image',
          art: 'snowwhite-apple',
          text: 'The queen, disguised as an old woman, offers Snow White an apple.',
        },
        {
          kind: 'note',
          text: 'New word: poisoned — when something dangerous to eat has been made to look sweet and good.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'She painted her face and dressed as an old apple-woman, and she went to the dwarfs’ cottage. "Pretty apples, sweet apples!" she called. Snow White was afraid of strangers, but the old woman was so friendly that at last she took a bite of the red apple.',
        },
        {
          kind: 'text',
          text: 'The apple was poisoned, and Snow White fell down as if asleep. The wicked queen hurried away, but she dropped her red shoe in the mud — and the dwarfs came home to find their dear Snow White on the ground.',
        },
        {
          kind: 'text',
          text: 'They could not wake her, and they were very sad. But she looked so sweet, and so like a rose, that they could not bear to bury her. They laid her gently in a glass coffin on the hillside, and wrote her name in golden letters above it, and watched over her day and night.',
        },
      ],
    },
    {
      title: 'Chapter 5 · A Kiss and a Wedding',
      art: 'snowwhite-awakes',
      artPrompt: 'a girl in a blue dress sitting up in a glass coffin on a green hillside, a prince in a green cloak beside her, seven dwarfs cheering, bright spring sunshine and birds flying',
      blocks: [
        {
          kind: 'text',
          text: 'A long time passed. One day a prince rode through the forest and saw the glass coffin and the beautiful girl inside it. He fell deeply in love, and begged the dwarfs, "Give me the coffin, and I will care for her always."',
        },
        {
          kind: 'image',
          art: 'snowwhite-awakes',
          text: 'Snow White wakes up in the prince’s arms.',
        },
        {
          kind: 'note',
          text: 'New word: coffin — a special box, here made of clear glass, where a sleeping person is laid.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The dwarfs were sorry to part with her, but they saw how good the prince was, and at last they agreed. As his servants carried the coffin carefully through the wood, they stumbled over a root — and the jolt shook the piece of poisoned apple right out of Snow White’s mouth.',
        },
        {
          kind: 'text',
          text: 'She opened her eyes and sat up. "Where am I?" she asked. "You are with me," said the prince, and he asked her to be his wife. Snow White said yes, for he was as kind as he was handsome.',
        },
        {
          kind: 'text',
          text: 'The wicked queen was invited to the wedding. When she saw Snow White, she knew her wickedness was done, and she could never harm anyone again. And Snow White and the prince lived happily, and were good to everyone, all their days.',
        },
      ],
    },
  ],
  rights: {
    workTitle: "Grimm's Fairy Tales — Schneewittchen (Snow White)",
    author: 'Jacob and Wilhelm Grimm',
    authorDeathYear: 1863,
    jurisdiction: 'EU',
    basis: 'pd-70',
    sourceUrl: 'https://www.gutenberg.org/ebooks/2591',
    note: 'Grimm brothers died 1859 and 1863; public domain under the 70-years-after-death rule. Retold for young children in simple English from Project Gutenberg eBook #2591.',
  },
}
