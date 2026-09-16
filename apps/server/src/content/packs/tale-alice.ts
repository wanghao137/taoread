import type { PackBook } from '../types'

/**
 * Alice's Adventures in Wonderland — Chapters I, II, VII excerpted (English reader).
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
    {
      title: 'Chapter 2 · The Pool of Tears',
      art: 'pool-tears',
      blocks: [
        {
          kind: 'text',
          text: '"Curiouser and curiouser!" cried Alice (she was so much surprised, that for the moment she quite forgot how to speak good English); "now I’m opening out like the largest telescope that ever was! Good-bye, feet!"',
        },
        {
          kind: 'text',
          text: 'Just then her head struck against the roof of the hall: in fact she was now more than nine feet high, and she at once took up the little golden key and hurried off to the garden door.',
        },
        {
          kind: 'text',
          text: '"You ought to be ashamed of yourself," said Alice, "a great girl like you, to go on crying in this way! Stop this moment, I tell you!" But she went on all the same, shedding gallons of tears, until there was a large pool all round her, about four inches deep and reaching half down the hall.',
        },
        {
          kind: 'image',
          art: 'pool-tears',
          text: 'Alice cried so much that a pool of tears spread all round her.',
        },
        {
          kind: 'text',
          text: 'It was the White Rabbit returning, splendidly dressed, with a pair of white kid gloves in one hand and a large fan in the other: he came trotting along in a great hurry, muttering to himself as he came, "Oh! the Duchess, the Duchess! Oh! won’t she be savage if I’ve kept her waiting!"',
        },
        {
          kind: 'text',
          text: 'Alice began, in a low, timid voice, "If you please, sir—" The Rabbit started violently, dropped the white kid gloves and the fan, and skurried away into the darkness as hard as he could go.',
        },
        {
          kind: 'note',
          text: 'New word: kid gloves — gloves made of very soft leather. Kid here means young-goat skin, not a child!',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"Dear, dear! How queer everything is to-day! And yesterday things went on just as usual. I wonder if I’ve been changed in the night? Let me think: was I the same when I got up this morning?"',
        },
        {
          kind: 'text',
          text: 'She soon found out that the cause of this was the fan she was holding, and she dropped it hastily, just in time to avoid shrinking away altogether. "That was a narrow escape!" said Alice, a good deal frightened at the sudden change, but very glad to find herself still in existence.',
        },
        {
          kind: 'text',
          text: 'As she said these words her foot slipped, and in another moment, splash! she was up to her chin in salt water. She soon made out that she was in the pool of tears which she had wept when she was nine feet high.',
        },
        {
          kind: 'text',
          text: '"I wish I hadn’t cried so much!" said Alice, as she swam about, trying to find her way out. "I shall be punished for it now, I suppose, by being drowned in my own tears!"',
        },
        {
          kind: 'text',
          text: 'Just then she heard something splashing about in the pool a little way off. At first she thought it must be a walrus or hippopotamus, but then she remembered how small she was now, and she soon made out that it was only a mouse that had slipped in like herself.',
        },
      ],
    },
    {
      title: 'Chapter 3 · A Mad Tea-Party',
      art: 'mad-tea',
      blocks: [
        {
          kind: 'text',
          text: 'There was a table set out under a tree in front of the house, and the March Hare and the Hatter were having tea at it: a Dormouse was sitting between them, fast asleep, and the other two were using it as a cushion, resting their elbows on it, and talking over its head.',
        },
        {
          kind: 'image',
          art: 'mad-tea',
          text: 'The Hatter and the March Hare having tea, with the Dormouse asleep between them.',
        },
        {
          kind: 'text',
          text: '"No room! No room!" cried the Hatter, when he saw Alice coming. "There’s plenty of room!" said Alice indignantly, and she sat down in a large arm-chair at one end of the table.',
        },
        {
          kind: 'text',
          text: '"Your hair wants cutting," said the Hatter. He had been looking at Alice for some time with great curiosity, and this was his first speech. "You should learn not to make personal remarks," Alice said with some severity; "it’s very rude."',
        },
        {
          kind: 'note',
          text: 'New word: rude — not polite. Alice thinks the Hatter should not talk about her hair!',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The Hatter opened his eyes very wide on hearing this; but all he said was, "Why is a raven like a writing-desk?" "Come, we shall have some fun now!" thought Alice. "I’m glad they’ve begun asking riddles. I believe I can guess that," she added aloud.',
        },
        {
          kind: 'text',
          text: '"Do you mean that you think you can find out the answer to it?" said the March Hare. "Exactly so," said Alice. "Then you should say what you mean," the March Hare went on. "I do," Alice hastily replied; "at least — at least I mean what I say — that’s the same thing, you know."',
        },
        {
          kind: 'text',
          text: '"Not the same thing a bit!" said the Hatter. "Why, you might just as well say that ‘I see what I eat’ is the same thing as ‘I eat what I see’!"',
        },
        {
          kind: 'text',
          text: '"Have some wine," the March Hare said in an encouraging tone. Alice looked all round the table, but there was nothing on it but tea. "I don’t see any wine," she remarked. "There isn’t any," said the March Hare.',
        },
        {
          kind: 'text',
          text: 'The Hatter took the watch out of his pocket, and looked at it uneasily, shaking it every now and then, and holding it to his ear. "What a funny watch!" said Alice. "It tells the day of the month, and doesn’t tell what o’clock it is!"',
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
