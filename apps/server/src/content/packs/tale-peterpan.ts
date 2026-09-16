import type { PackBook } from '../types'

/**
 * Peter Pan — opening excerpt (English reader).
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
