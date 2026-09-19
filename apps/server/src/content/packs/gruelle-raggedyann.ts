import type { PackBook } from '../types'

/**
 * Raggedy Ann Stories — Johnny Gruelle (1880–1938), first published 1918.
 * Retold for young children in four chapters: the doll with the candy heart,
 * a lost puppy, a kite ride, and a goodnight party in the nursery.
 * Source: Raggedy Ann Stories (Johnny Gruelle, 1918), public domain.
 */
export const raggedyAnn: PackBook = {
  id: 'gruelle-raggedyann',
  title: 'Raggedy Ann Stories',
  author: 'Johnny Gruelle',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro:
    'Raggedy Ann is a soft rag doll with a red-yarn smile and a candy heart sewn inside. In the nursery she watches over the other toys, shares her kindness on every adventure, and comes home to a goodnight party.',
  coverArt: 'raggedy-doll',
  coverArtPrompt:
    'A cheerful rag doll with floppy red-yarn hair, a triangle nose and a red-yarn smile, sitting on a white nursery windowsill, one striped arm waving hello. Around her, soft cotton stuffing peeks from a patched dress. A sunny room with teddy bears and wooden blocks below, sheer curtains stirring. Warm pastel palette, gentle morning light, storybook watercolor style.',
  coverFrom: '#E57373',
  coverTo: '#FFF9C4',
  source: 'Raggedy Ann Stories (Johnny Gruelle, 1918), public domain',
  chapters: [
    {
      title: 'Chapter 1 · The Doll with the Candy Heart',
      art: 'raggedy-nursery',
      artPrompt:
        'A cozy nursery at bedtime: a rag doll with red-yarn hair and a red-yarn smile sits propped against a plump pillow on a little bed, surrounded by a teddy bear, a tin soldier and a stocking-capped monkey. A candy heart with tiny letters glows faintly through a patch on her chest. Warm lamplight, soft shadows, picture-book style.',
      blocks: [
        {
          kind: 'text',
          text: 'Once there was a rag doll named Raggedy Ann. Her hair was made of red yarn. Her face had a little triangle nose and a big smile.',
        },
        {
          kind: 'text',
          text: 'Inside her body was a candy heart. On it were written three little words: I love you.',
        },
        {
          kind: 'image',
          art: 'raggedy-nursery',
          text: 'Raggedy Ann rests on the pillow, with her friends all around.',
        },
        {
          kind: 'text',
          text: 'Every night, when the house was quiet, the toys came out to play. And every night, Raggedy Ann smiled her big red smile.',
        },
        {
          kind: 'note',
          text: 'New word: rag doll — a soft doll sewn from cloth, not made of hard plastic.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Because her heart was full of love, all the other toys loved her too. That is how a rag doll became the queen of the nursery.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Lost Puppy',
      art: 'raggedy-puppy',
      artPrompt:
        'A small spotted puppy curls up under a rosebush in a garden, looking up hopefully. A rag doll with red-yarn hair leans out of an open window, reaching down a fold of her dress as a blanket. Fallen petals on the path, a watering can nearby. Soft afternoon light, warm and kind, children’s book illustration.',
      blocks: [
        {
          kind: 'text',
          text: 'One day a little puppy ran into the garden. He had lost his way home. "Yip, yip!" he cried, and his tail drooped.',
        },
        {
          kind: 'text',
          text: 'Raggedy Ann was sitting on the windowsill. She heard the little puppy and knew he needed help.',
        },
        {
          kind: 'image',
          art: 'raggedy-puppy',
          text: 'Raggedy Ann makes the puppy a cozy bed from a fold of her dress.',
        },
        {
          kind: 'text',
          text: '"Do not cry, little one," she said. "When the little girl comes home, she will find you. She finds everything with her kind eyes."',
        },
        {
          kind: 'note',
          text: 'Ask your child: what kind thing could you do for a lost puppy?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'And sure enough, soon the little girl found the puppy, and carried him home to a bowl of warm milk. The puppy licked Raggedy Ann’s nose to say thank you.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Kite Ride',
      art: 'raggedy-kite',
      artPrompt:
        'A red kite with a long tail flies high in a blue sky over a green meadow, and a tiny rag doll with red-yarn hair clings happily to its string, her yarn hair streaming in the wind like a flag. Below, two children look up and wave. Fluffy clouds, bright spring sunshine, playful storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'One windy day the children flew a kite. Up went the kite, up, up, higher than the trees.',
        },
        {
          kind: 'text',
          text: 'Whoo! A big gust of wind picked up Raggedy Ann. She held tight to the kite string and rode into the sky.',
        },
        {
          kind: 'text',
          text: 'It was not scary at all. She looked down and saw the whole world like a quilt: the green fields, the little houses, the winding stream.',
        },
        {
          kind: 'image',
          art: 'raggedy-kite',
          text: 'Raggedy Ann rides the kite string, high above the meadow.',
        },
        {
          kind: 'note',
          text: 'New word: gust — a quick, strong push of wind.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Then the wind grew tired, and let the kite down softly, just like a leaf. The children caught Raggedy Ann, and hugged her, and the toys at home heard all about the sky.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Goodnight Party',
      art: 'raggedy-party',
      artPrompt:
        'Toys dancing in a moonlit nursery: a rag doll with red-yarn hair leads a waltz with a teddy bear while a tin soldier marches and a stocking-capped monkey claps. A round rug, a toy chest, and a window full of stars. Creamy moonlight through the curtains, cozy and gentle, soft pastel picture-book style.',
      blocks: [
        {
          kind: 'text',
          text: 'Every night after bedtime, the toys had a party. Raggedy Ann waltzed with the teddy bear. The tin soldier marched. The monkey clapped time.',
        },
        {
          kind: 'text',
          text: 'One night the monkey said, "Ann, you always make everyone happy. How do you do it?"',
        },
        {
          kind: 'text',
          text: 'Raggedy Ann smiled her big red smile. "It is my candy heart," she said. "It is full of love, and love never runs out."',
        },
        {
          kind: 'image',
          art: 'raggedy-party',
          text: 'The goodnight party: everyone dances before the moon goes down.',
        },
        {
          kind: 'note',
          text: 'Ask your child: what little kindness could fill your heart tonight?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Then they all heard footsteps. Quick as anything, each toy hopped back to its place. The door opened, and the little girl blew them a kiss. Goodnight, Raggedy Ann. Goodnight, toys.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Raggedy Ann Stories',
    author: 'Johnny Gruelle',
    authorDeathYear: 1938,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Retold for young readers; plot follows the public-domain original. Published 1918; US public domain (pre-1929) and PD in the EU (Gruelle d. 1938, 70y pma expired 2009).',
  },
}
