import type { PackBook } from '../types'

/**
 * The Frog Prince — the Grimm brothers' tale, retold for children aged 3-5
 * in four chapters. Source: Project Gutenberg eBook #2591, "Grimm's Fairy
 * Tales" (Jacob & Wilhelm Grimm). The brothers died in 1859 and 1863; public
 * domain in the EU and worldwide under the 70-years-after-death rule (pd-70).
 * Retold in short, easy English, with the spell broken by a kept promise.
 */
export const frogPrince: PackBook = {
  id: 'grimm-frogprince',
  title: 'The Frog Prince',
  author: 'Jacob and Wilhelm Grimm',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: 'A princess drops her favourite golden ball into a deep well. A green frog offers to fetch it — but first she must make him a promise. Will she keep her word?',
  coverArt: 'frog-princess',
  coverArtPrompt: 'a little princess in a pink dress and golden crown sitting on the grass by a stone well, a friendly green frog wearing a tiny crown standing at the edge and looking up at her',
  coverFrom: '#2E7D32',
  coverTo: '#A5D6A7',
  source: 'Project Gutenberg eBook #2591, public domain (Grimm brothers d. 1859/1863)',
  chapters: [
    {
      title: 'Chapter 1 · The Golden Ball',
      art: 'frog-well',
      artPrompt: 'a stone well in a forest with moss on its rim, a golden ball sparkling at the bottom, a green frog sitting on the rim looking down, afternoon sun through the leaves',
      blocks: [
        {
          kind: 'text',
          text: 'Once there was a princess who loved nothing more than her golden ball. Every day she played with it in the dark wood, near the king’s castle, and she threw it higher and higher into the air.',
        },
        {
          kind: 'image',
          art: 'frog-well',
          text: 'The princess drops her golden ball into the deep well.',
        },
        {
          kind: 'note',
          text: 'New word: well — a deep round hole in the ground, where people get fresh water.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'One day the ball flew too far. It rolled to the edge of an old well and fell in — plunk! The well was deep, deep, deep, and the water was cold and dark. The princess sat down on the grass and began to cry.',
        },
        {
          kind: 'text',
          text: 'Then a voice said, "What is the matter, princess? Your tears would move a stone." She looked up — and there on the rim of the well sat a big green frog.',
        },
      ],
    },
    {
      title: 'Chapter 2 · A Promise',
      art: 'frog-promise',
      artPrompt: 'a green frog with a lily pad in hand bowing to a princess by a well, the princess pressing her hand to her heart as she makes a promise, golden sun setting behind the trees',
      blocks: [
        {
          kind: 'text',
          text: '"I can fetch your ball," said the frog. "But what will you give me if I do?" "Anything!" cried the princess. "My dresses, my pearls, my golden crown!"',
        },
        {
          kind: 'image',
          art: 'frog-promise',
          text: 'The princess makes a promise to the frog.',
        },
        {
          kind: 'note',
          text: 'New word: promise — when you say you will do something, and then you really do it.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"I do not want your jewels," said the frog. "I only ask this: let me be your companion. Let me sit at your table, eat from your little golden plate, and sleep in your room. If you promise me this, I will bring back your ball."',
        },
        {
          kind: 'text',
          text: 'The princess thought, "That is a silly thing to promise! A frog can do nothing but croak in the water." But she said, "Yes, I promise — if you fetch my ball."',
        },
        {
          kind: 'text',
          text: 'Splash! The frog dived into the well. Soon he came up again with the golden ball in his mouth, and dropped it into the grass. The princess was so happy she picked up her ball and ran away home, forgetting all about the poor frog.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Frog at the Door',
      art: 'frog-table',
      artPrompt: 'a green frog sitting on a golden plate at a long banquet table, a king and a princess looking at him, tall candles and a crown, palace dining room',
      blocks: [
        {
          kind: 'text',
          text: 'The next evening, the princess was eating her supper with the king and all his court. Then — knock, knock, knock — came a sound at the palace door. She opened it, and there stood the frog!',
        },
        {
          kind: 'image',
          art: 'frog-table',
          text: 'The frog eats from the princess’s golden plate.',
        },
        {
          kind: 'note',
          text: 'New word: companion — a friend who stays by your side and keeps you company.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The princess was frightened and shut the door fast. But the king, her father, saw her pale face. "What is that at the door, my child?" She told him the whole story — about the golden ball, and the well, and the promise she had made.',
        },
        {
          kind: 'text',
          text: '"A promise must be kept," said the king gently but firmly. "You gave your word, and you must do as you said." So the princess opened the door, and the frog hopped in after her.',
        },
        {
          kind: 'text',
          text: 'The frog ate from her golden plate, and she gave him water to drink from her little golden cup. Then he said, "I am tired. Carry me to your room and let me sleep on your soft pillow." The princess was unhappy, but her father nodded, and so she did.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Spell Is Broken',
      art: 'frog-prince',
      artPrompt: 'a handsome young prince in green and gold bowing before a princess in a sunny palace room, a frog skin lying on the floor nearby, a golden crown on a cushion, morning light',
      blocks: [
        {
          kind: 'text',
          text: 'In the morning, when the sun came up and the birds began to sing, the princess woke — and there, standing beside her bed, was no frog, but a handsome young prince, with kind brown eyes.',
        },
        {
          kind: 'image',
          art: 'frog-prince',
          text: 'The frog has become a handsome prince.',
        },
        {
          kind: 'note',
          text: 'New word: spell — magic words that change a person into something else, until someone breaks them.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"Do not be afraid," he said, and he told her his story. "A wicked fairy bewitched me long ago. She said I must stay a frog until a princess let me be her companion and keep her promise. You kept your word — and so the spell is broken."',
        },
        {
          kind: 'text',
          text: 'The princess was ashamed of how she had run away, but the prince thanked her. "You were unkind to me at the well," he said, "but in the end you did what was right. That is the thing that matters most."',
        },
        {
          kind: 'text',
          text: 'The king gave them his blessing. The prince took the princess home to his own golden kingdom, where the birds sang in the gardens and the fountains played all day. And they were faithful companions, and true friends, all their lives long.',
        },
      ],
    },
  ],
  rights: {
    workTitle: "Grimm's Fairy Tales — The Frog Prince",
    author: 'Jacob and Wilhelm Grimm',
    authorDeathYear: 1863,
    jurisdiction: 'EU',
    basis: 'pd-70',
    sourceUrl: 'https://www.gutenberg.org/ebooks/2591',
    note: 'Grimm brothers died 1859 and 1863; public domain under the 70-years-after-death rule. Retold for young children in simple English from Project Gutenberg eBook #2591.',
  },
}
