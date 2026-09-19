import type { PackBook } from '../types'

/**
 * Uncle Remus: His Songs and His Sayings (Joel Chandler Harris, 1881) — four
 * Brer Rabbit tales retold in plain modern English for readers aged 6–8,
 * without the original dialect. Harris died in 1908, so the work is public
 * domain worldwide. The tales — The Wonderful Tar-Baby Story, Mr. Rabbit
 * Grossly Outwits Mr. Fox, Old Mr. Rabbit, He's a Good Fisherman, and Mr.
 * Fox Tackles Old Man Tarrypin — follow the originals in plot.
 */
export const uncleRemus: PackBook = {
  id: 'harris-remus',
  title: 'Uncle Remus: Brer Rabbit Tales',
  author: 'Joel Chandler Harris',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'In the evenings on an old plantation, Uncle Remus tells a little boy stories about Brer Rabbit, the cleverest creature in the woods. Brer Rabbit is small, but no trap can hold him — not tar, not teeth, not even a deep dark well.',
  coverArt: 'remus-briar',
  coverArtPrompt: 'a lively grey-brown rabbit with long ears dancing happily in a big patch of prickly bramble bushes, a sly red fox watching from behind a tree, warm Georgia evening light through the pines, funny warm storybook illustration',
  coverFrom: '#E65100',
  coverTo: '#FFE0B2',
  source: 'Uncle Remus: His Songs and His Sayings (Joel Chandler Harris, 1881), public domain (Harris d. 1908)',
  chapters: [
    {
      title: 'Chapter 1 · The Wonderful Tar-Baby',
      art: 'remus-tarbaby',
      artPrompt: 'a figure made of shiny black tar wearing a straw hat, sitting beside a country road in the pines, a cheerful rabbit bowing politely to it, a red fox hiding behind a bush watching, golden afternoon light, gently comic storybook illustration',
      blocks: [
        { kind: 'text', text: 'Brer Fox was tired of being outsmarted by Brer Rabbit. So he made a plan. He mixed up some tar and built a strange little doll, right there by the road. Then he hid in the bushes.' },
        { kind: 'text', text: 'Soon along hopped Brer Rabbit, as bold as you please. He saw the tar-baby sitting very still in the path. "Good evening," said Brer Rabbit, kindly. But the tar-baby said nothing at all.' },
        { kind: 'image', art: 'remus-greeting', text: 'Brer Rabbit greets the silent tar-baby.' },
        { kind: 'text', text: '"How is your family?" asked Brer Rabbit. Still not a word. That made him mad. "Take off your hat when you speak to folks!" And he boxed the tar-baby\'s ear — plump! His paw stuck fast in the sticky tar.' },
        { kind: 'text', text: '"Let go!" said Brer Rabbit, and hit it with the other paw — plump! Then with his feet, and then with his head, till he was stuck all over. Out from the bushes stepped Brer Fox, smiling a big, slow smile.' },
        { kind: 'note', text: 'New word: tar — a thick, black, sticky stuff. Ask your child: why did Brer Rabbit get angrier and angrier? Talk about how getting cross can land us in worse trouble.', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 2 · The Briar Patch',
      art: 'remus-fox',
      artPrompt: 'a red fox with a sly grin pacing around a tar-covered rabbit caught upside down, tall pines and dappled light, the rabbit talking brightly with its ears up, warm southern woodland scene, gently comic storybook illustration',
      blocks: [
        { kind: 'text', text: '"I have you at last," said Brer Fox. He thought and thought about the best punishment. Should he hang Brer Rabbit? Roast him for supper? The rabbit shivered and shook.' },
        { kind: 'text', text: '"Anything you like, Brer Fox," cried Brer Rabbit. "Only, oh please, whatever you do, don\'t fling me in that briar patch! Any fate at all, but spare me the briars!"' },
        { kind: 'image', art: 'remus-plea', text: 'Brer Rabbit begs the fox to spare him the briars.' },
        { kind: 'text', text: 'Well now, that was the very thing Brer Fox had least thought of. He grabbed the stuck rabbit, pulled him free, and flung him slap into the middle of the prickly briar patch.' },
        { kind: 'text', text: 'There was a rustling and a rattling — and Brer Rabbit\'s voice came ringing out: "Born and bred in a briar patch, Brer Fox! Born and bred!" And off he ran, laughing all the way home.' },
        { kind: 'note', text: 'Ask your child: why did Brer Rabbit beg the fox NOT to throw him in the briars? Could Brer Rabbit have run away without his clever trick? Talk about knowing your own strengths.', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 3 · A Good Fisherman',
      art: 'remus-well',
      artPrompt: 'a rabbit sitting contentedly in a wooden bucket deep down a stone well looking up, a surprised fox peering down into the well from above, moon and stars in the night sky, moonlight on the stone rim, gently funny storybook scene',
      blocks: [
        { kind: 'text', text: 'One hot day, the animals were clearing a corn patch, and Brer Rabbit grew tired. He spied an old well with a rope and a bucket. In he climbed, down, down, to a nice cool nap.' },
        { kind: 'text', text: 'Brer Fox followed him and peered over the edge. "Fishing?" called the rabbit from below, "the well is full of fat fish! Jump in the bucket and come right down."' },
        { kind: 'image', art: 'remus-bucket', text: 'Brer Fox climbs into the bucket to come down.' },
        { kind: 'text', text: 'So Brer Fox stepped in. Down went his bucket, and up went Brer Rabbit\'s, for the two buckets passed each other halfway. "Goodbye, Brer Fox," sang the rabbit, "mind your clothes!"' },
        { kind: 'text', text: 'Soon a man came out to the well. Brer Rabbit hollered that a great stranger was down below, muddying the drinking water — and the fox, hauled up soaking wet, got such a scolding that Brer Rabbit laughed all the way home.' },
        { kind: 'note', text: 'Ask your child: how does the bucket trick work, like a seesaw? Try naming what goes down when something else goes up — then find other tricks like it in stories.', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 4 · Old Man Tarrypin',
      art: 'remus-turtle',
      artPrompt: 'a red fox holding a small patient turtle by the shell near a shady pond, the turtle calm and talking, cattails and dragonflies around the water, warm drowsy afternoon light, gently comic storybook illustration',
      blocks: [
        { kind: 'text', text: 'One day Brer Fox caught Old Man Tarrypin, the turtle, and carried him home for dinner. But the turtle just tucked in his legs and waited, calm as Sunday.' },
        { kind: 'text', text: 'Brer Fox thought of punishments. "I\'ll burn you!" he said. "Go ahead," said the turtle, "my shell keeps off the heat, and my family loves a warm fire." The fox frowned.' },
        { kind: 'image', art: 'remus-pond', text: 'The turtle talks calmly from inside his shell.' },
        { kind: 'text', text: 'Then Brer Fox had a fine idea. "Then I\'ll drown you!" he cried. "Oh no!" gasped Old Man Tarrypin. "Anything but the deep pond, Brer Fox! Not drowning — please!"' },
        { kind: 'text', text: 'So Brer Fox swung the turtle as far as he could — splash! — right into the middle of the pond. And old Tarrypin poked out his head, gave a cheerful wave of his flipper, and swam away home through the weeds, smiling like the sun.' },
        { kind: 'note', text: 'Ask your child: what is Old Man Tarrypin\'s trick? He begs for the one thing that would truly save the fox\'s pride. Where else in this book does a trick like that appear?', art: 'lamp-hint' },
      ],
    },
  ],
  rights: {
    workTitle: 'Uncle Remus: His Songs and His Sayings',
    author: 'Joel Chandler Harris',
    authorDeathYear: 1908,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Four Brer Rabbit tales retold in plain modern English without the original dialect; plots follow the public-domain 1881 collection (Harris d. 1908).',
  },
}
