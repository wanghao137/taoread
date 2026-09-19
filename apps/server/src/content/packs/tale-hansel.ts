import type { PackBook } from '../types'

/**
 * Hansel and Gretel — the Grimm brothers' tale, retold for children aged 3-5
 * in five chapters. Source: Project Gutenberg eBook #2591, "Grimm's Fairy
 * Tales" (Jacob & Wilhelm Grimm). The brothers died in 1859 and 1863; public
 * domain in the EU and worldwide under the 70-years-after-death rule (pd-70).
 * Retold in short, easy English; the gingerbread house is kept, and the
 * witch's frightening parts are made gentle for very young readers.
 */
export const hanselGretel: PackBook = {
  id: 'grimm-hansel',
  title: 'Hansel and Gretel',
  author: 'Jacob and Wilhelm Grimm',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: 'Hansel and Gretel are lost in a big green forest. Then they see it — a house made of cake and sugar! But the sweetest house in the world is hiding a witch…',
  coverArt: 'hansel-gretel',
  coverArtPrompt: 'a boy and a girl standing open-mouthed in front of a little house with a roof of cake and windows of clear sugar, candy canes growing in the garden like flowers, green forest all around',
  coverFrom: '#00695C',
  coverTo: '#80CBC4',
  source: 'Project Gutenberg eBook #2591, public domain (Grimm brothers d. 1859/1863)',
  chapters: [
    {
      title: 'Chapter 1 · The Poor Woodcutter',
      art: 'hansel-cottage',
      artPrompt: 'a small wooden cottage at the edge of a dark forest, a woodcutter chopping logs, a boy and girl watching with worried faces, grey evening sky',
      blocks: [
        {
          kind: 'text',
          text: 'Once upon a time there lived a poor woodcutter at the edge of a great forest, with his wife and his two children — a boy named Hansel and a girl named Gretel. The family was so poor that often there was no bread at all.',
        },
        {
          kind: 'image',
          art: 'hansel-cottage',
          text: 'The woodcutter’s cottage at the edge of the forest.',
        },
        {
          kind: 'note',
          text: 'New word: woodcutter — a person whose job is to cut down trees and chop wood.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'One night the wife said, "We have no more food. Tomorrow we must take the children deep into the forest and leave them there. We cannot feed four mouths, and two must go hungry."',
        },
        {
          kind: 'text',
          text: 'The woodcutter was very unhappy, but his wife would not listen, and so at last he agreed. Gretel heard it all through the thin wall, and she went to Hansel and cried. "Do not cry, Gretel," said Hansel, and he comforted her as best he could.',
        },
      ],
    },
    {
      title: 'Chapter 2 · A Trail of Pebbles',
      art: 'hansel-pebbles',
      artPrompt: 'a boy in the moonlight scattering white pebbles on a forest path behind him, a girl holding his hand, tall dark trees, a full moon and bright stars',
      blocks: [
        {
          kind: 'text',
          text: 'That same night, Hansel went out of the house and filled his pockets with small white pebbles from the path. "Do not worry, Gretel," he said, "I have thought of something."',
        },
        {
          kind: 'image',
          art: 'hansel-pebbles',
          text: 'Hansel drops pebbles along the way.',
        },
        {
          kind: 'note',
          text: 'New word: pebble — a small, smooth stone, the kind you find by a river or on a path.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'In the morning the parents took the children deep into the forest. Every few steps, Hansel dropped a pebble on the ground. At last they came to a clearing, and the parents built a small fire and went away.',
        },
        {
          kind: 'text',
          text: 'When the moon rose, the pebbles shone like silver in the grass. Hansel took Gretel by the hand, and they followed the shining pebbles all the way home. Their father wept for joy to see them. But their stepmother only frowned.',
        },
        {
          kind: 'text',
          text: 'Not many days later, there was again no bread. "This time we must take them deeper," said the wife. And this time she locked the door, so Hansel could not gather pebbles.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The House of Sweets',
      art: 'hansel-gretel',
      artPrompt: 'a boy and a girl standing open-mouthed in front of a little house with a roof of cake and windows of clear sugar, candy canes growing in the garden like flowers, green forest all around',
      blocks: [
        {
          kind: 'text',
          text: 'This time Hansel crumbled his small piece of bread in his pocket, and dropped the crumbs along the way. But the birds of the forest were hungry too — they ate every crumb, and when night came, the children could not find the way home.',
        },
        {
          kind: 'image',
          art: 'hansel-gretel',
          text: 'The children find a house made of sweets.',
        },
        {
          kind: 'note',
          text: 'New word: crumb — a tiny broken piece of bread or cake.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'They walked for three days, and they were very hungry. Then, in a sunny clearing, they saw a little house — and what a house it was! The walls were made of good cake, the roof was made of gingerbread, and the windows were of clear sugar.',
        },
        {
          kind: 'text',
          text: 'Hansel broke off a piece of the roof, and Gretel nibbled at a window pane. They had never tasted anything so good. Just then, a soft voice called from inside: "Nibble, nibble, little mouse — who is eating at my house?"',
        },
        {
          kind: 'text',
          text: 'Out came an old woman, bent and grey, and she smiled. "Come in, dear children, and eat as much as you like." But the children did not know that she was a witch, and witches love to trick little ones.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Clever Girl',
      art: 'hansel-oven',
      artPrompt: 'a brave girl pushing a big wooden oven door shut while a wicked old woman in a black cloak looks on in surprise, a boy unlocking a shed with a key, warm kitchen with pots and brooms',
      blocks: [
        {
          kind: 'text',
          text: 'The witch was not kind at all. She locked Hansel in a little shed and told Gretel, "You shall work for me. Feed your brother well, and when he is fat and round, I shall eat him!" Gretel wept, but she was also very clever.',
        },
        {
          kind: 'image',
          art: 'hansel-oven',
          text: 'Gretel is clever — and very brave.',
        },
        {
          kind: 'note',
          text: 'New word: oven — a very hot iron box for baking bread and cakes, heated by fire.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Every morning the witch called, "Hansel, put out your finger, so I can feel how fat you are!" But Hansel held out a little bone instead of his finger. The witch had dim old eyes, and she thought the bone was Hansel’s finger.',
        },
        {
          kind: 'text',
          text: 'After four weeks she lost all patience. "Fat or thin, today I shall eat him!" she cried. "Gretel, make the oven hot. Bend down and look inside — is it warm enough?"',
        },
        {
          kind: 'text',
          text: 'Gretel saw her chance. "I do not know how to look," she said. "Where must I put my head?" The witch leaned in to show her — and quick as a flash, Gretel gave her a great push and shut the iron door. "Cook that, wicked witch!"',
        },
      ],
    },
    {
      title: 'Chapter 5 · Home Again',
      art: 'hansel-home',
      artPrompt: 'a boy and a girl running across a sunny field towards a cottage where a woodcutter stands with open arms, white birds flying overhead, blue sky and green trees',
      blocks: [
        {
          kind: 'text',
          text: 'Gretel ran to the shed and unlocked the door. "Hansel, we are free! The witch can never hurt us again!" They hugged each other and danced around the kitchen.',
        },
        {
          kind: 'image',
          art: 'hansel-home',
          text: 'The children run home to their father.',
        },
        {
          kind: 'note',
          text: 'New word: pearls — hard, shiny little white treasures, found inside the shells of oysters.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Before they left, they found the witch’s treasure chest. It was full of pearls and precious stones! Hansel filled his pockets, and Gretel filled her little apron, and they set off through the wood.',
        },
        {
          kind: 'text',
          text: 'They walked for two days, and at last they came to a wide river. "How shall we cross?" asked Hansel. But a kind white duck was swimming there, and it carried them safely across, one at a time.',
        },
        {
          kind: 'text',
          text: 'On the other side the forest looked familiar, and soon they saw the cottage — and their father! He had been sad every day since they were gone, and their stepmother had died of a hard winter. The children opened their aprons, and pearls and jewels spilled over the floor.',
        },
        {
          kind: 'text',
          text: '"Now we shall never be hungry again!" cried Hansel. And they were not. They lived in the little cottage, happy and together, for all the days of their lives.',
        },
      ],
    },
  ],
  rights: {
    workTitle: "Grimm's Fairy Tales — Hansel and Gretel",
    author: 'Jacob and Wilhelm Grimm',
    authorDeathYear: 1863,
    jurisdiction: 'EU',
    basis: 'pd-70',
    sourceUrl: 'https://www.gutenberg.org/ebooks/2591',
    note: 'Grimm brothers died 1859 and 1863; public domain under the 70-years-after-death rule. Retold for young children in simple English from Project Gutenberg eBook #2591.',
  },
}
