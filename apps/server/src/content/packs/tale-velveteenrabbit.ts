import type { PackBook } from '../types'

/**
 * The Velveteen Rabbit — Margery Williams (1881–1944), first published 1922.
 * Retold for young children in five chapters: the Christmas gift, the nursery,
 * the boy’s illness, the nursery magic fairy, and the rabbit who became Real.
 * Source: Project Gutenberg eBook #11757, public domain (published 1922, US pre-1929).
 */
export const velveteenRabbit: PackBook = {
  id: 'velveteen-rabbit',
  title: 'The Velveteen Rabbit',
  author: 'Margery Williams',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: 'A soft velveteen rabbit arrives in a Christmas stocking. The other toys laugh at him — until the Skin Horse explains how a toy becomes Real.',
  coverArt: 'velveteen-rabbit',
  coverArtPrompt: 'a soft brown velveteen rabbit toy with floppy ears and a red ribbon, sitting on a nursery quilt, warm firelight',
  coverFrom: '#795548',
  coverTo: '#D7CCC8',
  source: 'Project Gutenberg eBook #11757, public domain (Williams d. 1944; published 1922)',
  chapters: [
    {
      title: 'Chapter 1 · The Christmas Stocking',
      art: 'christmas-stocking',
      artPrompt: 'a long red Christmas stocking hanging by a fireplace, a velveteen rabbit peeking out of the top, glowing embers',
      blocks: [
        {
          kind: 'text',
          text: 'Once there was a velveteen rabbit, and at first he was very splendid indeed. He was fat and bunchy, with a soft brown coat and ears lined with pink sateen.',
        },
        {
          kind: 'image',
          art: 'christmas-stocking',
          text: 'The velveteen rabbit, in his Christmas stocking.',
        },
        {
          kind: 'text',
          text: 'On Christmas morning, the Boy found him in the toe of his stocking. The rabbit was so happy that he could hardly breathe.',
        },
        {
          kind: 'note',
          text: 'New word: velveteen — a soft, fuzzy cloth, like velvet but lighter.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'For two hours the Boy played with him. Then dinner was ready, and the rabbit was put away in the nursery. He waited, and waited, for the Boy to come back.',
        },
        {
          kind: 'text',
          text: 'But the Boy did not come back that day, nor the next. The velveteen rabbit sat all alone in the toy cupboard, and he felt very small.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Skin Horse',
      art: 'nursery-shelf',
      artPrompt: 'a nursery shelf at night with a worn wooden skin horse and the velveteen rabbit side by side, moonlight from a window',
      blocks: [
        {
          kind: 'text',
          text: 'In the cupboard lived many toys. The newest was a clockwork mouse, who squeaked when you wound him. But the velveteen rabbit liked the Skin Horse best of all.',
        },
        {
          kind: 'image',
          art: 'nursery-shelf',
          text: 'The Skin Horse and the velveteen rabbit, talking on the shelf.',
        },
        {
          kind: 'text',
          text: 'The Skin Horse was old and wise, for he had lived in the nursery longer than any of the others. "What is REAL?" asked the rabbit one evening.',
        },
        {
          kind: 'note',
          text: 'New word: REAL — really and truly alive, not just a toy any more.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"Real isn’t how you are made," said the Skin Horse. "It’s a thing that happens to you. When a child loves you for a long, long time, then you become Real."',
        },
        {
          kind: 'text',
          text: '"Does it hurt?" asked the rabbit. "Sometimes," said the Skin Horse. "But when you are Real, you don’t mind being shabby." And he looked at his worn brown coat, and smiled.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Boy’s Best Friend',
      art: 'boy-rabbit',
      artPrompt: 'a small boy in pyjamas running through a garden holding a velveteen rabbit by the paw, green leaves and sunshine',
      blocks: [
        {
          kind: 'text',
          text: 'One spring day, the Boy lost his favourite toy dog. "I shall have the rabbit!" he cried, and he took the velveteen rabbit to bed with him.',
        },
        {
          kind: 'image',
          art: 'boy-rabbit',
          text: 'The Boy and the rabbit, together everywhere.',
        },
        {
          kind: 'text',
          text: 'From that night on, the rabbit never left the Boy’s side. They played in the garden, and the rabbit’s coat grew thin, and his ears lost their pink sateen.',
        },
        {
          kind: 'note',
          text: 'New word: shabby — worn and a little bit scruffy from being loved such a lot.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The rabbit did not mind at all. The Boy loved him, and that was all that mattered.',
        },
        {
          kind: 'text',
          text: 'One night the Boy was very hot, and the rabbit lay close beside his hot little cheek. The Boy was ill. Very ill. Days passed, and the Boy could not get out of bed.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Fairy',
      art: 'garden-fairy',
      artPrompt: 'a garden at moonrise, a tiny fairy in a flower-petal gown leaning over a shabby velveteen rabbit lying in the long grass',
      blocks: [
        {
          kind: 'text',
          text: 'When the Boy was better, the doctor said, "All his toys must go. They have been in a sick room." So the rabbit was carried out, and thrown into a sack in the garden.',
        },
        {
          kind: 'image',
          art: 'garden-fairy',
          text: 'The rabbit, lying in the garden in the moonlight.',
        },
        {
          kind: 'text',
          text: 'The rabbit lay in the long grass and cried. "I was happy with the Boy," he thought. "Oh, I wish I were Real."',
        },
        {
          kind: 'note',
          text: 'New word: sack — a big bag made of rough cloth.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Just then, a flower opened, and out stepped a fairy. "Little rabbit," she said, "you have been loved. Now you shall be Real."',
        },
        {
          kind: 'text',
          text: 'The fairy kissed the rabbit, and he felt himself change. His velvet coat grew soft and warm, and his heart began to beat. He was a rabbit — a real, live rabbit!',
        },
      ],
    },
    {
      title: 'Chapter 5 · Real at Last',
      art: 'real-rabbit',
      artPrompt: 'two rabbits nose to nose in a daisy-filled meadow, one slightly brown with a faint ribbon mark, bright morning sun',
      blocks: [
        {
          kind: 'text',
          text: 'The rabbit hopped away into the wood. He was free, and he was Real. But he always remembered the Boy.',
        },
        {
          kind: 'image',
          art: 'real-rabbit',
          text: 'The velveteen rabbit, now Real, in the meadow.',
        },
        {
          kind: 'text',
          text: 'One morning, the Boy was playing in the garden. He saw two rabbits watching him from the ferns, and one of them had a soft brown coat.',
        },
        {
          kind: 'note',
          text: 'New word: hopped — jumped on two feet, the way rabbits move.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The rabbit looked at the Boy for a long moment. The Boy looked back. "Why," he said slowly, "that rabbit looks just like my old velveteen rabbit."',
        },
        {
          kind: 'text',
          text: 'And the rabbit’s nose twitched, and his eyes shone, for he knew the Boy still loved him — and that love is what makes a thing Real.',
        },
        {
          kind: 'text',
          text: 'So the velveteen rabbit lived in the garden and the wood, happy and free, for ever and ever.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Velveteen Rabbit, or How Toys Become Real',
    author: 'Margery Williams',
    authorDeathYear: 1944,
    jurisdiction: 'US',
    basis: 'pd-us',
    sourceUrl: 'https://www.gutenberg.org/ebooks/11757',
    note: 'Published 1922; public domain in the US (pre-1929). Retold for young children from Project Gutenberg eBook #11757.',
  },
}
