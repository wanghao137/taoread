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
    {
      title: 'Chapter 5 · The Talking Cricket',
      art: 'talking-cricket',
      artPrompt: 'a wooden puppet boy sitting on a stool in a tiny cozy kitchen at night, a little green cricket talking to him from the wall, an old man asleep in the corner, warm firelight',
      blocks: [
        {
          kind: 'text',
          text: 'The night before school was to begin, Geppetto fell fast asleep. But Pinocchio could not sleep at all, for he was very, very hungry. And oh dear — he had gone to sleep with his feet resting on a stove, and in the morning his wooden feet had burnt away, like two little sticks!',
        },
        {
          kind: 'image',
          art: 'talking-cricket',
          text: 'The little green cricket, who lived in Geppetto’s room and knew everything.',
        },
        {
          kind: 'text',
          text: '"Father! Father!" cried Pinocchio. Geppetto sat down at his bench at once and carved him two fine new feet. "Tomorrow you will go to school and learn, won\'t you?" said Geppetto. "Yes, yes, of course," said Pinocchio — but he was still terribly hungry.',
        },
        {
          kind: 'note',
          text: 'New word: woe — great sadness and trouble. The cricket said that trouble comes to boys who will not study.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Then a little green cricket spoke to him from the wall. "Woe to those boys who will not go to school," said the cricket. "They grow up into donkeys, and everyone laughs at them." Pinocchio did not like that one bit. He threw a wooden hammer at the wall — and the poor cricket fell down, still and silent.',
        },
        {
          kind: 'text',
          text: 'Pinocchio felt sorry at once. But he was too hungry to be sorry for long. Geppetto woke up and gave him his own breakfast — three pears — and Pinocchio ate them all, even the skins. "Boys are always hungry," said Geppetto. Then he went out to sell his coat, so that his puppet could have a spelling book.',
        },
      ],
    },
    {
      title: 'Chapter 6 · The Field of Miracles',
      art: 'field-miracles',
      artPrompt: 'a wooden puppet boy burying gold coins in a ploughed field at night, a sly fox in fine clothes and a blind cat watching from behind a wooden fence, a green parrot laughing above, moonlight over the furrows',
      blocks: [
        {
          kind: 'text',
          text: 'The Fox and the Cat led Pinocchio to the Field of Miracles, where the Fox said every bush grew gold. Pinocchio dug a little hole in the ploughed field and buried his gold pieces, and watered the spot, and put a stone on top, just as he was told.',
        },
        {
          kind: 'image',
          art: 'field-miracles',
          text: 'The Field of Miracles at night, with a green parrot laughing on the fence.',
        },
        {
          kind: 'text',
          text: '"Wait twenty minutes," said the Fox, "and your gold tree will grow." So Pinocchio went away, singing, and counted the minutes. But when he came back, there was no tree at all. He dug and dug — the gold was gone! A green parrot on the fence laughed and laughed at him.',
        },
        {
          kind: 'note',
          text: 'New word: greedy — wanting money so much that you forget to think. The Fox and the Cat were very greedy indeed.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Pinocchio ran to the town to tell the Judge about his stolen gold. But the Judge was a great old ape, and he did not catch the thieves at all. "A silly boy who buries gold in a field," said the Judge, "must go to prison for four months."',
        },
        {
          kind: 'text',
          text: 'So Pinocchio sat in the dark prison for four long months. It was a hard, cold lesson. "When I get out," he said to himself, "I will be good and go home to my father." And this time he truly meant it — for a while.',
        },
      ],
    },
    {
      title: 'Chapter 7 · The Watchdog',
      art: 'pinocchio-watchdog',
      artPrompt: 'a wooden puppet boy with a big iron collar sitting in a dark wooden doghouse in a moonlit farmyard, grapevines and a farmhouse around, hens asleep in a henhouse, stars in the sky',
      blocks: [
        {
          kind: 'text',
          text: 'When Pinocchio came out of prison, he was hungrier than ever. He ran through a green field with grapevines, and he was just reaching for two lovely purple grapes — when SNAP! A trap for weasels had caught him by the legs.',
        },
        {
          kind: 'image',
          art: 'pinocchio-watchdog',
          text: 'Pinocchio the watchdog, in his dark doghouse under the stars.',
        },
        {
          kind: 'text',
          text: 'A farmer came running with a lantern. "Thief!" he shouted. But Pinocchio told the truth at last. "I did not take your hens," he said. "I was only hungry, and I am so sorry." "Very well," said the farmer. "You shall be my watchdog, and guard my henhouse at night."',
        },
        {
          kind: 'note',
          text: 'New word: honest — telling the truth, even when you are afraid. Being honest saved Pinocchio from trouble.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'So Pinocchio sat in the dark doghouse with a heavy iron collar round his neck, and he felt very small indeed. Then, in the middle of the night, he heard soft little steps — four weasels were creeping towards the henhouse to steal the chickens!',
        },
        {
          kind: 'text',
          text: '"Not tonight," said Pinocchio, and he barked like a real watchdog — Woof! Woof! Woof! The weasels fled, and the farmer came running with his lantern. "You are a good watchdog," he said, and took off the iron collar. Pinocchio shook his hand, and walked home free.',
        },
      ],
    },
    {
      title: 'Chapter 8 · A Gift for the Fairy',
      art: 'fairy-snail',
      artPrompt: 'a wooden puppet boy in a fine new blue suit giving gold coins to a little snail with a green shell on a sunny doorstep, a pretty white cottage with rose bushes behind, bright morning light',
      blocks: [
        {
          kind: 'text',
          text: 'One day Pinocchio ran all the way home, because he wanted to see the Blue Fairy again. But the way was long, and when he got there, a little snail was sitting on the doorstep — very slow, and very tired. "Please go and tell the Fairy I am here," said Pinocchio, and he waited a long, long time.',
        },
        {
          kind: 'image',
          art: 'fairy-snail',
          text: 'The kind snail, carrying Pinocchio’s gold coins to the Blue Fairy.',
        },
        {
          kind: 'text',
          text: 'The snail went, and came back so slowly that Pinocchio had time to fall asleep twice on the step. "The Fairy is ill," said the snail at last, "and she has not one penny to buy her supper." Pinocchio had gold pieces in his pocket. He had promised the Fairy he would not spend them on sweets.',
        },
        {
          kind: 'note',
          text: 'New word: gift — something you give because you love someone. Pinocchio gave away all his money and never asked for it back.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'He did not think for even one minute. "Here," he said, "take her all my gold, every penny, and go as fast as you can." And the snail carried the coins away, slowly, in her little shell.',
        },
        {
          kind: 'text',
          text: 'That night Pinocchio slept on a stone, dreaming of the Fairy, kind and smiling. In the morning came the happy news: the Fairy had taken the gold, and she was well again. Pinocchio clapped his hands with joy. He had no money left at all — and he had never in his life felt richer.',
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
