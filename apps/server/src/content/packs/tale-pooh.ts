import type { PackBook } from '../types'

/**
 * Winnie-the-Pooh — four chapters retold for very young English readers.
 * Text: Project Gutenberg eBook #67098 (A. A. Milne, 1926, illustrated by E. H. Shepard).
 * US public domain (published 1926, pre-1929). Milne died 1956; within 70y pma in the EU.
 * Plot and characters follow the original book; wording simplified into short sentences
 * for children aged 3–5.
 */
export const winniePooh: PackBook = {
  id: 'winnie-pooh',
  title: 'Winnie-the-Pooh',
  author: 'A. A. Milne',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: 'Winnie-the-Pooh is a bear of very little brain — and a very big appetite for honey. Here are four of his silliest adventures.',
  coverArt: 'pooh-honey',
  coverArtPrompt: 'a round golden teddy bear in a little red shirt standing under a big oak tree, holding a honey pot with a bee buzzing above him, sunny hundred-acre-wood meadow',
  coverFrom: '#D84315',
  coverTo: '#FFCC80',
  source: 'Project Gutenberg eBook #67098, US public domain (published 1926)',
  chapters: [
    {
      title: 'Chapter 1 · Pooh and the Bees',
      art: 'honey-tree',
      artPrompt: 'a round golden bear in a red shirt looking up at a big oak tree full of buzzing bees, a little boy holding a blue balloon beside him',
      blocks: [
        {
          kind: 'text',
          text: 'Winnie-the-Pooh sat in front of a big oak tree. He could hear a loud buzzing noise. "That buzzing means honey," said Pooh, "and honey is what I love best of all."',
        },
        {
          kind: 'image',
          art: 'honey-tree',
          text: 'Pooh looking up at the honey tree, where the bees were buzzing.',
        },
        {
          kind: 'text',
          text: 'Pooh asked his friend Christopher Robin for help. Christopher Robin had a big blue balloon. "You can float up to the top of the tree," he said, "and reach the honey."',
        },
        {
          kind: 'note',
          text: 'New word: disguise — dressing up so nobody knows it is you. Pooh rolled in dark mud to look like a little black cloud!',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'So Pooh hung on to the string of the balloon. He rolled in a muddy puddle first, so the bees would think he was a small black cloud and not a bear at all.',
        },
        {
          kind: 'text',
          text: 'Up he floated, until he was right beside the bees’ front door. But the bees were not the sort of bees who make honey. They were suspicious bees, and they came buzzing out to look at him.',
        },
        {
          kind: 'text',
          text: '"These are the wrong sort of bees," said Pooh. "Christopher Robin, please bring my gun!" But Christopher Robin had a better idea. He shot an arrow at the balloon, and pop! The air came out, and Pooh floated slowly down into Christopher Robin’s arms.',
        },
      ],
    },
    {
      title: 'Chapter 2 · A Visit to Rabbit',
      art: 'pooh-rabbit-hole',
      artPrompt: 'a round bear stuck halfway out of a little door set in a grassy bank, pots of honey inside, a rabbit pushing from behind',
      blocks: [
        {
          kind: 'text',
          text: 'Pooh went to visit his friend Rabbit. Rabbit lived in a hole under the ground, with a door just big enough for a bear.',
        },
        {
          kind: 'image',
          art: 'pooh-rabbit-hole',
          text: 'Rabbit’s front door, set in the side of a little grassy bank.',
        },
        {
          kind: 'text',
          text: '"How about a little something?" said Pooh, hoping for honey. Rabbit brought out two pots of honey and some condensed milk. Pooh ate them all up, and he ate the bread and butter too.',
        },
        {
          kind: 'note',
          text: 'New word: larder — a cupboard or little room where food is kept.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'When it was time to go, Pooh stood up — and could not move. He was stuck in the doorway, for he had grown much too round!',
        },
        {
          kind: 'text',
          text: 'Rabbit pushed and pulled, but Pooh stayed stuck. So Pooh had to stay there for a whole week. Christopher Robin read him stories, and Rabbit used Pooh’s back legs as a towel-horse.',
        },
        {
          kind: 'text',
          text: 'At the end of the week, Christopher Robin took hold of Pooh’s front paws, Rabbit pushed from behind, and out Pooh popped like a cork from a bottle. "Oh, I have popped out again!" said Pooh.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Heffalump',
      art: 'heffalump-trap',
      artPrompt: 'a leaf-covered pit in the woods with a honey jar at the bottom, a small piglet watching, night sky and a bear creeping closer',
      blocks: [
        {
          kind: 'text',
          text: 'One day Pooh and his small friend Piglet dug a Cunning Trap. They wanted to catch a Heffalump, a big animal with a trunk and very long ears. For bait they put a jar of honey in the deepest part of the pit.',
        },
        {
          kind: 'image',
          art: 'heffalump-trap',
          text: 'The Cunning Trap, covered with leaves, with a jar of honey inside.',
        },
        {
          kind: 'text',
          text: 'In the middle of the night, Pooh woke up feeling hungry. "A little taste of honey would be nice," he thought. So he went to the trap in the dark, and put his head right into the jar.',
        },
        {
          kind: 'note',
          text: 'New word: trap — a clever hiding place for catching something. This one had a jar of honey at the bottom.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The jar was much too deep. When Pooh lifted his head, the jar came with it, and he could not see a thing at all. Now Pooh was frightened. He thought the Heffalump had caught him!',
        },
        {
          kind: 'text',
          text: 'Piglet saw a terrible creature with a jar for a head and ran to fetch Christopher Robin. Christopher Robin looked, and he laughed, and he lifted the jar off Pooh’s head. "Silly old Bear!" he said. "There is no Heffalump at all."',
        },
        {
          kind: 'text',
          text: 'Pooh was very glad. He went home for a little something to eat, and the trap was left empty, for no Heffalump ever came.',
        },
      ],
    },
    {
      title: 'Chapter 4 · Eeyore’s Lost Tail',
      art: 'eeyore-tail',
      artPrompt: 'a sad old grey donkey looking over his shoulder at where his tail should be, a bear and a piglet standing by a chestnut tree',
      blocks: [
        {
          kind: 'text',
          text: 'One morning, Eeyore the old grey donkey was looking very sad. "Good morning, Eeyore," said Pooh. "Have you lost something?" "My tail," said Eeyore. "Somebody must have taken it."',
        },
        {
          kind: 'image',
          art: 'eeyore-tail',
          text: 'Eeyore the donkey, looking over his shoulder at where his tail should be.',
        },
        {
          kind: 'text',
          text: 'Pooh and Piglet went to ask Owl. Owl lived in a chestnut tree. To make Owl open his door, they pulled a long rope that hung beside it — and rang a little bell.',
        },
        {
          kind: 'note',
          text: 'New word: bell-rope — the rope you pull to make a bell ring. Pooh thought this one looked very familiar!',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Pooh looked at the bell-rope. It was grey, and it was just the right length. "Owl," he said, "is that Eeyore’s tail?" Owl was quite shocked, but it was true!',
        },
        {
          kind: 'text',
          text: 'They took the tail to Christopher Robin. He took out a hammer and some small nails, and nailed the tail firmly back on Eeyore.',
        },
        {
          kind: 'text',
          text: 'Eeyore swished his tail from side to side, this way and that. He was so happy that he almost smiled. And Pooh went home for a little something to refresh himself, because bears do a lot of hard thinking.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Winnie-the-Pooh',
    author: 'A. A. Milne',
    authorDeathYear: 1956,
    jurisdiction: 'US',
    basis: 'pd-us',
    sourceUrl: 'https://www.gutenberg.org/ebooks/67098',
    note: 'Published 1926; US public domain (pre-1929). Milne died 1956, so the work remains within 70y pma in some EU jurisdictions and is used here under US public-domain status only. Plot follows Project Gutenberg eBook #67098; wording simplified for very young readers.',
  },
}
