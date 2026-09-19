import type { PackBook } from '../types'

/**
 * Little Men — five chapters retold in simple English for young readers.
 * Original: Louisa May Alcott, published 1871. Public domain in the US
 * (pre-1929) and worldwide (Alcott died 1888). Jo Bhaer's school at
 * Plumfield, shy Nat, wild Dan, the fire, and Nat's first concert follow
 * the original novel; wording simplified into short sentences for
 * children aged 9-12.
 */
export const littleMen: PackBook = {
  id: 'alcott-littlemen',
  title: 'Little Men',
  author: 'Louisa May Alcott',
  lang: 'en',
  category: 'tale',
  ageStage: '9-12',
  intro: 'Jo March, now grown and married, opens a school at Plumfield with her husband, Professor Bhaer. Boys and girls learn with gardens and pets and music - and when two very different boys arrive, the school must show what kind hearts can do.',
  coverArt: 'plumfield-school',
  coverArtPrompt: 'a cheerful old farmhouse on a green hill with a big barn and an orchard, a dozen children in 1870s clothes running down the lawn toward a woman in a gray dress waving from the porch, a small boy with a violin case at the gate, laundry lines and garden plots, bright summer morning, warm storybook illustration',
  coverFrom: '#33691E',
  coverTo: '#C5E1A5',
  source: 'Little Men (Louisa May Alcott, 1871), public domain (Alcott d. 1888)',
  chapters: [
    {
      title: 'Chapter 1 · A Boy Called Nat',
      art: 'plumfield-gate',
      artPrompt: 'a thin boy of about ten holding an old violin case at a wooden garden gate, a kind woman in a gray dress and lace cap hurrying down the path with open arms, an apple orchard and a farmhouse behind her, a tired stray dog at his heels, late afternoon golden light, gentle storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'Plumfield was an old house on a green hill, with an orchard and a big barn. Jo Bhaer, who had once been Jo March, ran it as a school with her husband, Professor Bhaer. Boys and girls lived there together and learned in the strangest, happiest way.',
        },
        {
          kind: 'image',
          art: 'plumfield-arrival',
          text: 'A pale boy with a violin stands alone at the Plumfield gate.',
        },
        {
          kind: 'text',
          text: 'One day a shy boy came down the road, so thin and tired he could hardly walk. His name was Nat, and he had earned his bread playing his violin on city streets. "Welcome," said Mother Bhaer, and took his hand. Nat had never in his life heard anyone say that word to him.',
        },
        {
          kind: 'note',
          text: 'New word: orphan - a child whose father and mother are gone. Nat has no one, until Plumfield takes him in.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Nat was put into a warm bath, then into a soft bed, then into a family of noisy boys. That night he lay in the dark and listened to the crickets. For the first time in years, nobody was unkind to him, and he was not afraid. He fell asleep with his violin case hugged close, like a friend.',
        },
      ],
    },
    {
      title: 'Chapter 2 · Learning the Happy Way',
      art: 'plumfield-garden',
      artPrompt: 'a dozen children in sun hats working in small garden plots beside a big barn, a boy watering carrots with a tin can, a girl feeding hens, another boy walking a pet dog on a rope, a bearded professor in glasses kneeling to plant seeds with two little ones, bright summer noon, cheerful storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'Lessons at Plumfield were not all books. Each child had a garden plot to dig and plant. Each had some pet to feed, from hens to a blind colt. Daisy had a little kitchen where she baked real bread, and Demi asked questions that even the Professor had to think about.',
        },
        {
          kind: 'image',
          art: 'plumfield-market',
          text: 'The children count the cabbages they grew and sold at the little market.',
        },
        {
          kind: 'text',
          text: 'Every Saturday there was a market, where the children sold what they had grown for wooden cents. Nat could not grow much, for his hands were weak. But at evening he took out his violin, and all the boys grew quiet to listen. Music, Mother Bhaer said, was Nat\'s own garden, and it grew better every day.',
        },
        {
          kind: 'note',
          text: 'Question for you: Nat could not dig well, but he had a gift the others loved. What can you do well that no one else in your family can?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Professor Bhaer taught with patience, and if a boy was lazy, he was not beaten but made to think. "We are not here to make scholars only," said Mother Bhaer. "We are here to make good, brave, useful men and women." Even the naughtiest boy found it hard to be bad at Plumfield.',
        },
      ],
    },
    {
      title: 'Chapter 3 · Wild Dan',
      art: 'plumfield-wild-boy',
      artPrompt: 'a rough boy of twelve with tangled dark hair and a checked shirt standing defiant in a farmyard, a healing bandage on his leg, other boys watching from a safe distance, a tired horse being led past by a farmer, autumn wind blowing dry leaves, warm afternoon light, storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'Then came Dan, a boy from the city streets, wild as a young hawk. He told tales of the far West, and the boys listened with open mouths. But Dan broke rules, taught the small ones bad words, and scorned Nat\'s gentle fiddle. "Sissy music," he said, and Nat hid behind his case.',
        },
        {
          kind: 'image',
          art: 'plumfield-runaway',
          text: 'Dan slips out of the barn before dawn and takes to the open road.',
        },
        {
          kind: 'text',
          text: 'When he was scolded, Dan ran away across the country, proud and sullen. He came back with a hurt leg, carried on a farmer\'s wagon, and even then his lips were shut like a trap. But Mother Bhaer never gave up. "A wild colt is the hardest to gentle," she said, "and often the best when tamed."',
        },
        {
          kind: 'note',
          text: 'Talk together: Dan pushes away everyone who is kind to him. Why do you think it is hard for some people to say thank you?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Slowly, Dan softened. He saved his pocket money to buy little Rob a pet lamb. He learned to whistle to the hens instead of throwing stones. And one evening he stood in the yard listening to Nat\'s violin and did not say a single unkind word.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Fire',
      art: 'plumfield-fire',
      artPrompt: 'an old barn in the early evening with thin smoke curling from its loft window, a line of children passing full water pails hand to hand across the yard, a tall professor directing them, a rough-haired boy on the barn roof pouring a pail over the edge, lanterns glowing, tense but brave storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'One dry evening, smoke was seen curling from the loft of the old barn, where the boys kept their treasures. "Fire!" cried little Rob, and his voice was shrill with fright. The Professor ran for the ladder, and Mother Bhaer counted heads and kept the little ones back.',
        },
        {
          kind: 'image',
          art: 'plumfield-bucket-line',
          text: 'The children form a line and pass the water pails hand to hand.',
        },
        {
          kind: 'text',
          text: 'The boys did not scream. They made a line from the well to the barn and passed the pails hand to hand, fast and steady, as they had drilled. Nat, white-faced, handed his pail and went back for more. "Again!" called the Professor. "Steady, my boys!" Up on the roof a wild-haired figure poured pail after pail on the burning hay - Dan, who had come home that very hour.',
        },
        {
          kind: 'note',
          text: 'New word: drill - to practice a thing over and over, so you can do it well even when you are afraid.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The last spark hissed out, and the barn stood safe, blackened only a little. Dan climbed down, soaked and sooty, and the boys cheered him until he blushed. "I only came home in time," he muttered. Mother Bhaer hugged him, sparks, smoke, and all. Nobody ever called him a bad boy again.',
        },
      ],
    },
    {
      title: 'Chapter 5 · Nat\'s Concert',
      art: 'plumfield-concert',
      artPrompt: 'a small town hall full of people in 1870s clothes, a thin boy in a neat new suit standing on stage playing an old violin under a hanging oil lamp, rows of smiling farm families in the audience, a proud woman in a gray dress and a bearded professor in the front row, warm golden evening light, joyful storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'Winter came, and with it a great day. The Professor had heard of a concert in town where even a beginner might earn his first honest money. Nat\'s hands trembled so that he could not button his new coat. "Play as you play for us," whispered Mother Bhaer. "That is all music ever asks."',
        },
        {
          kind: 'image',
          art: 'plumfield-stage',
          text: 'Nat lifts his violin under the lamplight as the hall falls quiet.',
        },
        {
          kind: 'text',
          text: 'The hall was full of strangers, and Nat\'s bow shook on the first note. Then he shut his eyes and thought of Plumfield - the garden, the barn, the boys by the fire - and the music carried him. When the last note faded, the room clapped long and loud. Nat stood amazed. People liked his playing. They liked him.',
        },
        {
          kind: 'note',
          text: 'Question for you: A year ago Nat played in the streets for cold pennies. What three things changed his life since then?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'He came home with his first earnings in his pocket and gave them to Mother Bhaer for the school. "Keep them," she laughed. "You have paid us already, a hundred times." That night there was music at Plumfield, and Dan clapped the loudest of anyone. The school grew year by year, full of boys and girls learning to be good and glad.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Little Men',
    author: 'Louisa May Alcott',
    authorDeathYear: 1888,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Retold for children; plot follows the public-domain original. Published 1871; worldwide public domain.',
  },
}
