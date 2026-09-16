import type { PackBook } from '../types'

/**
 * Alice's Adventures in Wonderland — Chapter I excerpt (English reader).
 * Text: Project Gutenberg eBook #11 (Lewis Carroll, 1865). Public domain in the US
 * (pre-1929) and worldwide (Carroll died 1898). Lightly excerpted for young readers;
 * wording preserved verbatim from the source text.
 */
export const alice: PackBook = {
  id: 'alice-wonderland',
  title: "Alice in Wonderland",
  author: 'Lewis Carroll',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'A little girl follows a talking White Rabbit down a hole — and finds a world where nothing behaves the way it should.',
  coverArt: 'alice-rabbit',
  coverFrom: '#7B5EA7',
  coverTo: '#C9A6E8',
  source: 'Project Gutenberg eBook #11, public domain (Carroll d. 1898)',
  chapters: [
    {
      title: 'Chapter 1 · Down the Rabbit Hole',
      art: 'rabbit-hole',
      blocks: [
        {
          kind: 'text',
          text: 'Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, "and what is the use of a book," thought Alice, "without pictures or conversations?"',
        },
        {
          kind: 'image',
          art: 'white-rabbit',
          text: 'A White Rabbit with pink eyes ran close by her.',
        },
        {
          kind: 'text',
          text: 'So she was considering in her own mind whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.',
        },
        {
          kind: 'text',
          text: 'There was nothing so very remarkable in that; nor did Alice think it so very much out of the way to hear the Rabbit say to itself, "Oh dear! Oh dear! I shall be late!" But when the Rabbit actually took a watch out of its waistcoat-pocket, and looked at it, and then hurried on, Alice started to her feet.',
        },
        {
          kind: 'text',
          text: 'It flashed across her mind that she had never before seen a rabbit with either a waistcoat-pocket, or a watch to take out of it, and burning with curiosity, she ran across the field after it, and fortunately was just in time to see it pop down a large rabbit-hole under the hedge.',
        },
        {
          kind: 'text',
          text: 'In another moment down went Alice after it, never once considering how in the world she was to get out again.',
        },
        {
          kind: 'note',
          text: 'New word: waistcoat — a small jacket worn over a shirt. Rabbits do not wear them, which is exactly why Alice was so surprised!',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The rabbit-hole went straight on like a tunnel for some way, and then dipped suddenly down, so suddenly that Alice had not a moment to think about stopping herself before she found herself falling down a very deep well.',
        },
        {
          kind: 'text',
          text: 'Either the well was very deep, or she fell very slowly, for she had plenty of time as she went down to look about her and to wonder what was going to happen next.',
        },
        {
          kind: 'text',
          text: 'She looked at the sides of the well, and noticed that they were filled with cupboards and book-shelves; here and there she saw maps and pictures hung upon pegs. She took down a jar from one of the shelves as she passed; it was labelled "ORANGE MARMALADE", but to her great disappointment it was empty.',
        },
        {
          kind: 'text',
          text: '"Well!" thought Alice to herself, "after such a fall as this, I shall think nothing of tumbling down stairs! How brave they’ll all think me at home!"',
        },
        {
          kind: 'text',
          text: 'Down, down, down. Would the fall never come to an end? "I wonder how many miles I’ve fallen by this time?" she said aloud. "I must be getting somewhere near the centre of the earth."',
        },
      ],
    },
  ],
  rights: {
    workTitle: "Alice's Adventures in Wonderland",
    author: 'Lewis Carroll',
    authorDeathYear: 1898,
    jurisdiction: 'US',
    basis: 'pd-us',
    sourceUrl: 'https://www.gutenberg.org/ebooks/11',
    note: 'Published 1865; US public domain (pre-1929). Text taken verbatim from Project Gutenberg eBook #11; light excerpting only.',
  },
}
