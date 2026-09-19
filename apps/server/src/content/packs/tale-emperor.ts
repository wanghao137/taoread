import type { PackBook } from '../types'

/**
 * The Emperor's New Clothes — retold for children aged 3-5 in four chapters.
 * Source: Project Gutenberg eBook #27100, "Fairy Tales of Hans Christian
 * Andersen" (1837). Andersen died 1875; public domain in the EU and worldwide
 * under the 70-years-after-death rule (pd-70). Retold in short, easy English.
 */
export const emperorsNewClothes: PackBook = {
  id: 'andersen-emperor',
  title: 'The Emperor’s New Clothes',
  author: 'Hans Christian Andersen',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: 'An emperor loves new clothes more than anything in the world. One day two strangers arrive with the most wonderful cloth you have ever seen — or have you?',
  coverArt: 'emperor-clothes',
  coverArtPrompt: 'a proud emperor in a golden crown and purple cape standing in front of a tall mirror in a palace room, two grinning weavers holding up an empty loom, courtiers bowing',
  coverFrom: '#283593',
  coverTo: '#7986CB',
  source: 'Project Gutenberg eBook #27100, public domain (Andersen d. 1875)',
  chapters: [
    {
      title: 'Chapter 1 · The Emperor and His Wardrobe',
      art: 'emperor-wardrobe',
      artPrompt: 'a huge palace room full of wardrobes and chests of colourful silk, velvet and gold-trimmed coats, an emperor holding a red coat against himself in a gold-framed mirror',
      blocks: [
        {
          kind: 'text',
          text: 'Many years ago there lived an emperor who cared only about one thing — new clothes. He had a coat for every hour of the day, and he spent all his money on grand, bright, beautiful clothes.',
        },
        {
          kind: 'image',
          art: 'emperor-wardrobe',
          text: 'The emperor tries on yet another new coat.',
        },
        {
          kind: 'note',
          text: 'New word: wardrobe — a big cupboard where you keep your clothes.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'He did not care for his soldiers or his theatre or his people. He only wanted to show off his fine new clothes. The people of the town heard the bells in his palace ring, and said, "There goes the emperor to his dressing-room!"',
        },
        {
          kind: 'text',
          text: 'One day two strangers came to the city. They said they were weavers, and they could weave the most beautiful cloth in the world.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Magic Cloth',
      art: 'emperor-loom',
      artPrompt: 'two weavers pretending to work at an empty wooden loom, bright red and gold thread nearby, an old minister with his eyes tight shut nodding and smiling nervously',
      blocks: [
        {
          kind: 'text',
          text: '"Our cloth is magic!" said the weavers. "It is as light as a spider’s web, and it shines like gold. And best of all — anyone who is silly or not fit for his job cannot see it at all!"',
        },
        {
          kind: 'image',
          art: 'emperor-loom',
          text: 'The weavers pretend to weave their magic cloth.',
        },
        {
          kind: 'note',
          text: 'New word: loom — the big wooden frame that weavers use to make cloth.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The emperor was delighted. "If I wear that cloth, I will know who is silly and who is not!" He gave the weavers bags of gold, and they shut themselves in a room and pretended to weave all day long.',
        },
        {
          kind: 'text',
          text: 'The emperor sent his oldest minister to look. The minister opened the door — and saw nothing but an empty loom. "I cannot see a thing!" he thought, and he was frightened. "But I must not say so, or everyone will think I am silly."',
        },
        {
          kind: 'text',
          text: '"Oh, what beautiful cloth!" he lied, and he went back and told the emperor how wonderful it was. The emperor sent more ministers, and every one of them saw nothing — and every one of them said the cloth was lovely.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Grand Procession',
      art: 'emperor-procession',
      artPrompt: 'an emperor in a crown and red sash walking proudly through a town street as if in grand clothes, courtiers holding up an invisible train, crowds of people pointing and whispering, blue sky',
      blocks: [
        {
          kind: 'text',
          text: 'At last the big day came. The weavers held up their hands as if they carried a suit of clothes. "Here are the trousers, the coat, and the cloak!" they said. The emperor took off his own clothes and "put on" the magic ones.',
        },
        {
          kind: 'image',
          art: 'emperor-procession',
          text: 'The emperor walks through the town in his "new clothes".',
        },
        {
          kind: 'note',
          text: 'New word: procession — a long line of people walking together in a grand parade.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Out in the street, all the people stood and watched. "How beautiful the emperor’s clothes are!" they said — because nobody wanted to be the first to say they could see nothing at all.',
        },
        {
          kind: 'text',
          text: 'But in the crowd, a little child looked and looked. "But he has nothing on!" the child cried, in his clear little voice. "He has nothing on!" The people began to whisper, and then to laugh.',
        },
        {
          kind: 'text',
          text: 'The emperor heard the child. He looked down at himself, and he knew the child was right. But he held his head high, and the procession went on just as grandly as before.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Truth Is Worth More Than Gold',
      art: 'emperor-child',
      artPrompt: 'an emperor kneeling down in a town square to shake hands with a small child who points at him, weavers running away with bags of gold in the background, crowd smiling',
      blocks: [
        {
          kind: 'text',
          text: 'That evening, the emperor sent for the child. "You were the only brave one," he said. "Tell me — did you really see nothing on me at all?"',
        },
        {
          kind: 'image',
          art: 'emperor-child',
          text: 'The emperor thanks the brave little child.',
        },
        {
          kind: 'note',
          text: 'New word: truth — saying what is really so, even when it is hard.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"Nothing at all, Your Majesty," said the child. "The weavers took your gold and gave you air." The emperor laughed — and then he laughed harder, because he knew it was true.',
        },
        {
          kind: 'text',
          text: 'The emperor gave a great feast for the child, and the weavers were sent far away with empty pockets and a long lecture. From that day on, the emperor always asked for the truth — and he still loved his clothes, but not as much as he loved his brave little subjects.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Emperor’s New Clothes',
    author: 'Hans Christian Andersen',
    authorDeathYear: 1875,
    jurisdiction: 'EU',
    basis: 'pd-70',
    sourceUrl: 'https://www.gutenberg.org/ebooks/27100',
    note: 'Retold for young children from the 1837 original.',
  },
}
