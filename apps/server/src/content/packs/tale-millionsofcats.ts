import type { PackBook } from '../types'

/**
 * Millions of Cats — four short chapters retold for very young readers.
 * Text: Wanda Gág, 1928. US public domain (published pre-1929) and worldwide
 * (Gág d. 1946, 70y pma expired). Plot follows the picture book; wording kept
 * short, warm and simple for children aged 3-5.
 */
export const millionsOfCats: PackBook = {
  id: 'tale-millionsofcats',
  title: 'Millions of Cats',
  author: 'Wanda Gág',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: 'A very old man and a very old woman live all alone on a hill. They wish for one sweet little cat — but when the old man goes to find one, every cat in the world follows him home. In the end, the smallest, plainest cat becomes the loveliest of all.',
  coverArt: 'millcats-hill',
  coverArtPrompt: 'a round green hill with a tiny cottage and flower garden on top, an old man with a walking stick and white beard walking down a winding path while hundreds of small cats trail behind him in a long wavy line, soft rolling hills beyond, gentle pastel morning light',
  coverFrom: '#F48FB1',
  coverTo: '#FFE082',
  source: 'Millions of Cats (Wanda Gág, 1928), public domain',
  chapters: [
    {
      title: 'Chapter 1 · A Little Wish',
      art: 'millcats-hill',
      artPrompt: 'a tiny tidy cottage with a flower garden on top of a round green hill, a very old woman watering flowers and a very old man with a white beard sitting on the doorstep, two teacups on a little table, wide empty hills around, soft warm afternoon light',
      blocks: [
        {
          kind: 'text',
          text: 'Once upon a time there was a very old man and a very old woman. They lived in a clean little house on a hill, with flowers all around it. They had plenty to eat and a fire to sit by. But their house felt quiet, and they felt lonely.',
        },
        {
          kind: 'image',
          art: 'millcats-hill',
          text: 'The little house on the hill, where two quiet people wished for one small friend.',
        },
        {
          kind: 'text',
          text: '"If only we had a sweet little cat," said the very old woman, "it would be just right." "A cat to sit on the step and purr," said the very old man. And he put on his hat, and took his walking stick, and set off down the hill to look for one.',
        },
        {
          kind: 'note',
          text: 'Talk together: the old people wish for one small thing — a cat. Ask your child: if you could wish for one small pet, what would it be?',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 2 · Hundreds and Millions of Cats',
      art: 'millcats-cats',
      artPrompt: 'a rolling green hillside completely covered with countless small cats in every colour, black white grey orange and spotted, cats on rocks cats in grass cats climbing a tree, an old man standing amazed in the middle with his walking stick, bright cheerful daylight',
      blocks: [
        {
          kind: 'text',
          text: 'The old man walked a long way, up hill and down hill. At last he came to a valley full of cats — hundreds of cats, thousands of cats, millions and billions and trillions of cats.',
        },
        {
          kind: 'image',
          art: 'millcats-cats',
          text: 'The valley of cats: hundreds, thousands, millions and billions and trillions.',
        },
        {
          kind: 'text',
          text: '"Oh, kitties," said the old man, "which one of you is the prettiest? I want just one sweet little cat." And every single cat called out, "Take me! Take me! Take me!" One cat came, and then another, and then all of them stood up and began to follow him — hundreds of cats, thousands of cats, millions and billions and trillions of cats, all the way up the hill to the little house.',
        },
        {
          kind: 'note',
          text: 'New word: prettiest — the most pretty one of all. Every cat thought it was the prettiest, and that is where the trouble began.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 3 · Which Cat Is the Prettiest?',
      art: 'millcats-quarrel',
      artPrompt: 'a hillside with almost no grass left, cats facing each other in quarrelling groups with tails high, an old man and an old woman watching wide-eyed from their doorway as the cats seem to vanish into the wind, soft dusky evening colours',
      blocks: [
        {
          kind: 'text',
          text: 'The very old woman looked out of the door. "One cat!" she said. "What shall we do with all of these?" Then the cats began to ask each other, "Who is the prettiest?" And each cat said, "I am." And they began to quarrel.',
        },
        {
          kind: 'image',
          art: 'millcats-quarrel',
          text: 'The cats quarrelled over who was prettiest, until the hill was quiet again.',
        },
        {
          kind: 'text',
          text: 'They ate up all the grass on the hill while they argued. And then, one by one, they went away, and nobody ever saw them again. The old man and the old woman stood at the door and looked at the quiet, empty hill.',
        },
        {
          kind: 'note',
          text: 'Talk together: the cats argued about who was best, and no one was happy. Ask your child: what makes a friend lovely — being the prettiest, or something else?',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 4 · One Small Thin Cat',
      art: 'millcats-kitten',
      artPrompt: 'a small thin shy kitten with patchy fur sitting alone in tall grass near a cottage door, the old man gently lifting it and the old woman offering a saucer of milk, one warm ray of evening sunshine on the kitten, a cozy happy scene',
      blocks: [
        {
          kind: 'text',
          text: 'Then the old man saw one small tuft of grass move. Under it sat one small thin cat — it had been so shy it never said it was the prettiest. "Poor little kitty," said the old people, and they carried it in and fed it warm milk.',
        },
        {
          kind: 'image',
          art: 'millcats-kitten',
          text: 'The one shy little cat, warm at last by the kitchen fire.',
        },
        {
          kind: 'text',
          text: 'Every day the cat had kind words and warm milk and a place by the fire. Its fur grew smooth and glossy, and its eyes grew bright, and it became — you can see it yourself — the loveliest cat in all the world. And it sat on the step and purred, and the house on the hill was not quiet any more.',
        },
        {
          kind: 'note',
          text: 'Talk together: the little cat was loved, and that is what made it lovely. Ask your child: what kind words could we say today to make someone feel loved?',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Millions of Cats',
    author: 'Wanda Gág',
    authorDeathYear: 1946,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Retold for children; plot follows the public-domain picture book. Published 1928; US public domain (pre-1929) and worldwide (Gág d. 1946, 70y pma expired).',
  },
}
