import type { PackBook } from '../types'

/**
 * Peter Pan — Chapters 1–3 excerpted (English reader).
 * Text: Project Gutenberg eBook #16 (J.M. Barrie, "Peter and Wendy", 1911).
 * Public domain in the US (pre-1929). Excerpted verbatim; quotation marks
 * modernized to curly form only.
 */
export const peterPan: PackBook = {
  id: 'peter-pan',
  title: 'Peter Pan',
  author: 'J. M. Barrie',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'The boy who never grows up. One night he flies in through an open window, looking for his shadow…',
  coverArt: 'peter-pan',
  coverArtPrompt: 'a joyful boy in a green tunic and pointed hat flying over a pirate ship at sunset, golden fairy dust trailing behind him, a big moon and clouds in an orange and purple sky',
  coverFrom: '#1565C0',
  coverTo: '#64B5F6',
  source: 'Project Gutenberg eBook #16, public domain (published 1911)',
  chapters: [
    {
      title: 'Chapter 1 · The Boy Who Never Grew Up',
      art: 'nursery-window',
      blocks: [
        {
          kind: 'text',
          text: 'All children, except one, grow up. They soon know that they will grow up, and the way Wendy knew was this. One day when she was two years old she was playing in a garden, and she plucked another flower and ran with it to her mother.',
        },
        {
          kind: 'image',
          art: 'peter-pan',
          text: 'A boy flew in through the nursery window, with a little light beside him.',
        },
        {
          kind: 'text',
          text: 'Mrs. Darling put her hand to her heart and cried, "Oh, why can’t you remain like this for ever!" This was all that passed between them on the subject, but henceforth Wendy knew that she must grow up. You always know after you are two. Two is the beginning of the end.',
        },
        {
          kind: 'text',
          text: 'Wendy came first, then John, then Michael. They lived at number 14, and their mother was the loveliest lady in the world.',
        },
        {
          kind: 'text',
          text: 'One night, Mrs. Darling fell asleep in the nursery, dreaming of the Neverland. And while she was dreaming, the window of the nursery blew open, and a boy did drop on the floor.',
        },
        {
          kind: 'text',
          text: 'He was accompanied by a strange light, no bigger than your fist, which darted about the room like a living thing — and I think it must have been this light that wakened Mrs. Darling.',
        },
        {
          kind: 'note',
          text: 'New word: nursery — a special room in a house where little children sleep and play.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'She started up with a cry, and saw the boy, and somehow she knew at once that he was Peter Pan. He was a lovely boy, clad in skeleton leaves and the juices that ooze out of trees, but the most entrancing thing about him was that he had all his first teeth.',
        },
        {
          kind: 'text',
          text: 'When he saw she was a grown-up, he gnashed the little pearls at her. And then — slam! — the window shut behind him, and something stayed outside in the dark: it was Peter’s shadow, and the window had snapped it right off!',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Shadow in the Drawer',
      art: 'peter-shadow',
      blocks: [
        {
          kind: 'text',
          text: 'Mrs. Darling screamed, and, as if in answer to a bell, the door opened, and Nana entered, returned from her evening out. She growled and sprang at the boy, who leapt lightly through the window.',
        },
        {
          kind: 'image',
          art: 'peter-shadow',
          text: 'The window snapped shut — and Peter’s shadow stayed outside!',
        },
        {
          kind: 'text',
          text: 'Mrs. Darling returned to the nursery, and found Nana with something in her mouth, which proved to be the boy’s shadow. As he leapt at the window Nana had closed it quickly, too late to catch him, but his shadow had not had time to get out; slam went the window and snapped it off.',
        },
        {
          kind: 'text',
          text: 'You may be sure Mrs. Darling examined the shadow carefully, but it was quite the ordinary kind.',
        },
        {
          kind: 'text',
          text: 'Nana had no doubt of what was the best thing to do with this shadow. She hung it out at the window, meaning "He is sure to come back for it; let us put it where he can get it easily without disturbing the children."',
        },
        {
          kind: 'note',
          text: 'New word: shadow — the dark shape your body makes on the ground when a light shines behind you.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'But unfortunately Mrs. Darling could not leave it hanging out at the window, it looked so like the washing and lowered the whole tone of the house. She decided to roll the shadow up and put it away carefully in a drawer, until a fitting opportunity came for telling her husband.',
        },
        {
          kind: 'text',
          text: 'The opportunity came a week later, on that never-to-be-forgotten Friday. Of course it was a Friday.',
        },
      ],
    },
    {
      title: 'Chapter 3 · Sewn On Again',
      art: 'fairy-dust',
      blocks: [
        {
          kind: 'text',
          text: 'There was another light in the room now, a thousand times brighter than the night-lights. When it came to rest for a second you saw it was a fairy, no longer than your hand, but still growing. It was a girl called Tinker Bell, exquisitely gowned in a skeleton leaf.',
        },
        {
          kind: 'image',
          art: 'fairy-dust',
          text: 'Tinker Bell, the fairy, flashing about the nursery like a little light.',
        },
        {
          kind: 'text',
          text: 'A moment after the fairy’s entrance the window was blown open by the breathing of the little stars, and Peter dropped in. He had carried Tinker Bell part of the way, and his hand was still messy with the fairy dust.',
        },
        {
          kind: 'text',
          text: 'In a moment he had recovered his shadow, and in his delight he forgot that he had shut Tinker Bell up in the drawer.',
        },
        {
          kind: 'text',
          text: 'Wendy saw the shadow on the floor, looking so draggled, and she was frightfully sorry for Peter. "How awful!" she said, but she could not help smiling when she saw that he had been trying to stick it on with soap. How exactly like a boy!',
        },
        {
          kind: 'note',
          text: 'New word: soap — the slippery thing you wash your hands with. It does NOT stick shadows on!',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"It must be sewn on," she said. "I shall sew it on for you, my little man," she said, and she got out her housewife, and sewed the shadow on to Peter’s foot.',
        },
        {
          kind: 'text',
          text: '"I daresay it will hurt a little," she warned him. "Oh, I shan’t cry," said Peter. And he clenched his teeth and did not cry, and soon his shadow was behaving properly, though still a little creased.',
        },
        {
          kind: 'text',
          text: 'He was now jumping about in the wildest glee. "How clever I am!" he crowed rapturously, "oh, the cleverness of me!" — for he had already forgotten that Wendy had sewn it on.',
        },
        {
          kind: 'text',
          text: '"Wendy," he said, "don’t withdraw. I can’t help crowing, Wendy, when I’m pleased with myself. Wendy, one girl is more use than twenty boys."',
        },
        {
          kind: 'text',
          text: '"Second to the right," said Peter, "and then straight on till morning." "What a funny address!" said Wendy.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Peter Pan (Peter and Wendy)',
    author: 'J. M. Barrie',
    authorDeathYear: 1937,
    jurisdiction: 'US',
    basis: 'pd-us',
    sourceUrl: 'https://www.gutenberg.org/ebooks/16',
    note: 'Published 1911, US public domain (pre-1929). Text verbatim from Project Gutenberg eBook #16; excerpted only.',
  },
}
