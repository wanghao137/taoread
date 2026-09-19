import type { PackBook } from '../types'

/**
 * The Adventures of Pinocchio — four chapters retold for young English readers.
 * Text: Project Gutenberg eBook #6575 (Carlo Collodi, "Le avventure di Pinocchio",
 * translated into English by an anonymous translator). Public domain worldwide
 * (Collodi died 1890; 70y pma expired). Plot follows the original story; wording
 * simplified into short sentences for children aged 6–8.
 */
export const pinocchio: PackBook = {
  id: 'pinocchio',
  title: 'The Adventures of Pinocchio',
  author: 'Carlo Collodi',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'A naughty wooden puppet comes to life and runs away from his poor father Geppetto. Before he can become a real boy, Pinocchio must learn to be good — and every lie he tells makes his nose grow longer!',
  coverArt: 'pinocchio',
  coverArtPrompt: 'a wooden puppet boy with a long pointed nose and a red feather in his cap standing on a village street, a kindly old man with a white beard watching him from a doorway',
  coverFrom: '#C62828',
  coverTo: '#FFCDD2',
  source: 'Project Gutenberg eBook #6575, public domain (Collodi d. 1890)',
  chapters: [
    {
      title: 'Chapter 1 · The Talking Piece of Wood',
      art: 'carpenter-shop',
      artPrompt: 'a carpenter’s workshop full of tools and wood shavings, a kindly old man carving a wooden puppet at his bench, a log that glows faintly',
      blocks: [
        {
          kind: 'text',
          text: 'Once upon a time there was a piece of wood in the shop of Master Cherry the carpenter. It was not fine wood, just a common log for the fire. Master Cherry took up his axe to split it — and a little voice cried out, "Do not hit me so hard!"',
        },
        {
          kind: 'image',
          art: 'carpenter-shop',
          text: 'Master Cherry’s workshop, full of tools and shavings.',
        },
        {
          kind: 'text',
          text: 'The poor carpenter was so frightened that his eyes nearly fell out. Just then his friend Geppetto came to the door. Geppetto was a good old man who made puppets, and Master Cherry gave him the piece of wood as a present.',
        },
        {
          kind: 'note',
          text: 'New word: puppet — a wooden doll that moves. Some puppets dance on strings, and this one could talk!',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Geppetto took the wood home and began to carve. He made the head, the eyes that would not stop rolling, the nose that grew long, and the mouth that could laugh. He made the arms, the hands, and the legs, and named the puppet Pinocchio.',
        },
        {
          kind: 'text',
          text: 'As soon as his feet were finished, Pinocchio kicked his father on the nose. He ran out of the door and down the street, laughing. Poor Geppetto ran after him, but a puppet is much faster than an old man.',
        },
        {
          kind: 'text',
          text: 'A policeman caught Pinocchio by the nose. But when Geppetto tried to lead the puppet home, the people in the street thought Geppetto was a cruel father, and the policeman took poor Geppetto away to prison instead!',
        },
      ],
    },
    {
      title: 'Chapter 2 · Pinocchio Goes to School',
      art: 'school-road',
      artPrompt: 'a wooden puppet boy in a pointed cap with a feather walking down a village road carrying an A-B-C book, rain puddles and a schoolhouse in the distance',
      blocks: [
        {
          kind: 'text',
          text: 'Geppetto came home from prison and forgave Pinocchio. The next morning he said, "You must go to school and learn to read and write." But Pinocchio had no book.',
        },
        {
          kind: 'image',
          art: 'school-road',
          text: 'Pinocchio on the road to school, with his A-B-C book under his arm.',
        },
        {
          kind: 'text',
          text: 'It was raining hard. Geppetto took off his own warm coat and sold it, and bought Pinocchio a spelling book with the A, B, C. "I shall have to be cold," he said, "but my son will have his book."',
        },
        {
          kind: 'note',
          text: 'New word: sacrifice — giving up something you love very much, to help somebody else.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'On the way to school, Pinocchio heard pipes and fifes and drums. A great show was in the town — the Grand Puppet Theatre! Pinocchio could not resist. He sold his spelling book for four pennies and went in.',
        },
        {
          kind: 'text',
          text: 'The puppets on the stage saw Pinocchio and danced down to hug their wooden brother. The puppet-master, Fire-Eater, was so angry he wanted to burn Pinocchio for his supper fire. But when Pinocchio cried for his poor father, Fire-Eater’s heart melted, and he gave Pinocchio five gold pieces to take home.',
        },
        {
          kind: 'text',
          text: 'On the road home, Pinocchio met a lame Fox and a blind Cat. "If you bury your gold in the Field of Miracles," said the Fox, "it will grow into a tree covered in gold coins!" Pinocchio was silly enough to believe them.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Land of Toys',
      art: 'toy-land',
      artPrompt: 'a puppet boy with a nose grown enormously long standing before a blue fairy in a sparkly room, a sly fox and a blind cat peeking from a forest edge',
      blocks: [
        {
          kind: 'text',
          text: 'The Fox and the Cat led Pinocchio deep into the forest. There the Assassins jumped out at him and hung him by the neck from a great oak tree. They took his gold and left him to die.',
        },
        {
          kind: 'image',
          art: 'blue-fairy',
          text: 'The beautiful Blue Fairy, who came to help the wooden puppet.',
        },
        {
          kind: 'text',
          text: 'The beautiful Blue Fairy saved him. She asked where his gold was. Pinocchio was ashamed to tell the truth, so he began to tell lies — and with every lie, his nose grew longer and longer, until he could not get through the door of the room.',
        },
        {
          kind: 'note',
          text: 'New word: lie — saying something you know is not true. Pinocchio’s nose grows longer every time he tells one!',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The Fairy called a thousand woodpeckers to peck his nose back to its proper size, and Pinocchio promised to be good. But when he set out for home, his schoolfriend Candlewick stopped him. "Come to the Land of Toys," he said. "There are no schools, no books, and no teachers. You play all day long!"',
        },
        {
          kind: 'text',
          text: 'Pinocchio went. For five months he did nothing but play games. One morning he woke up and found that he had long hairy donkey ears and a tail — he had been changed into a donkey! And donkeys are sold, and made to work.',
        },
      ],
    },
    {
      title: 'Chapter 4 · Becoming a Real Boy',
      art: 'real-boy',
      artPrompt: 'a wooden puppet and a white-bearded old man climbing out of a huge shark’s jaw into a sunny sea, a little boat nearby, hopeful morning light',
      blocks: [
        {
          kind: 'text',
          text: 'Donkey Pinocchio was sold to the master of a circus, and made to dance and jump through hoops. One day he fell and hurt his leg. The master sold him to a man who wanted a drum made of his skin, and tied a heavy stone around his neck, and threw him into the sea.',
        },
        {
          kind: 'image',
          art: 'shark-sea',
          text: 'The enormous shark that swallowed Geppetto’s little boat.',
        },
        {
          kind: 'text',
          text: 'Down, down sank Pinocchio — but the salt water washed the donkey skin away, and he was a wooden puppet again! He swam for his life, and was swallowed whole by an enormous shark as long as a railway train.',
        },
        {
          kind: 'note',
          text: 'New word: brave — doing what is right, even when you are frightened.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Deep inside the shark’s belly, Pinocchio heard a voice. It was Geppetto! His poor father had been swallowed long ago while he searched the sea for his son. Pinocchio took his father by the hand, and they climbed out past the shark’s three long teeth and swam to the shore.',
        },
        {
          kind: 'text',
          text: 'Back home, Pinocchio worked hard. He drew water for the gardener, he wove baskets, and he studied his books at night by the fire, all to earn a little money and a cup of coffee for his father.',
        },
        {
          kind: 'text',
          text: 'One morning he woke up and found a little wooden puppet lying on a chair, and beside it a beautiful suit of clothes. The Blue Fairy appeared, smiling. "Pinocchio," she said, "you were once a naughty puppet. Now you are good and kind and brave — and so you are a real boy!" And Geppetto never had to be poor or lonely again.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Adventures of Pinocchio',
    author: 'Carlo Collodi',
    authorDeathYear: 1890,
    translator: 'anonymous English translation',
    jurisdiction: 'EU',
    basis: 'pd-70',
    sourceUrl: 'https://www.gutenberg.org/ebooks/6575',
    note: 'Published in Italian 1883; public domain worldwide (Collodi d. 1890, 70y pma expired). English text from Project Gutenberg eBook #6575 (anonymous translation); wording simplified into short sentences for young English readers.',
  },
}
