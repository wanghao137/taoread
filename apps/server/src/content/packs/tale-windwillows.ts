import type { PackBook } from '../types'

/**
 * The Wind in the Willows — four chapters retold for young English readers.
 * Text: Project Gutenberg eBook #289 (Kenneth Grahame, 1908). Public domain worldwide
 * (Grahame died 1932; 70y pma expired). Plot follows the original book; wording
 * simplified into short sentences for children aged 6–8.
 */
export const windInWillows: PackBook = {
  id: 'wind-willows',
  title: 'The Wind in the Willows',
  author: 'Kenneth Grahame',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'The Mole leaves his little underground home and finds a whole new world beside the river — boats and picnics, the kindly Water Rat, the wise Badger, and the rich, reckless Mr. Toad.',
  coverArt: 'river-bank',
  coverArtPrompt: 'a small mole and a water rat in a little rowing boat on a slow green river, willow trees trailing their leaves in the water, a picnic basket in the bow, warm summer afternoon',
  coverFrom: '#0277BD',
  coverTo: '#81D4FA',
  source: 'Project Gutenberg eBook #289, public domain (Grahame d. 1932)',
  chapters: [
    {
      title: 'Chapter 1 · The River Bank',
      art: 'river-bank',
      artPrompt: 'a small mole and a water rat in a smart blue rowing boat on a slow green river, willow leaves trailing in the water, a picnic basket open in the bow',
      blocks: [
        {
          kind: 'text',
          text: 'The Mole had been spring-cleaning his whole house. Brushes and dusters, whitewash and ladders — at last he could bear it no longer. He threw down his brush and scrambled up his tunnel, up and up, until his nose popped out into the sun.',
        },
        {
          kind: 'image',
          art: 'river-bank',
          text: 'The Mole’s first sight of the river, bright and quiet in the sun.',
        },
        {
          kind: 'text',
          text: 'He had never seen a river before. It was a sleek, sinuous animal, chasing and chuckling, catching things, throwing them away, and then rushing on to play with something else. The Mole could not look away.',
        },
        {
          kind: 'note',
          text: 'New word: bank — the land at the very edge of a river, where the water stops.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'A Water Rat came rowing by in a smart little blue boat. "Would you like to come for a row?" he said. The Mole stepped in, and they went gliding over the water together.',
        },
        {
          kind: 'text',
          text: 'The Rat had a wonderful picnic basket, packed with cold chicken, cold tongue, cold ham, pickled gherkins, and ginger beer, and lemonade, and bread and butter. The Mole had never had such a splendid meal.',
        },
        {
          kind: 'text',
          text: 'An Otter popped up in the water to say hello. They talked of their friend Mr. Toad, who had taken up a new fancy for a gipsy caravan. "He is always trying something new," said the Rat, "and always giving it up again." The Mole lay back and watched the willows, and was perfectly happy.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Open Road',
      art: 'open-road',
      artPrompt: 'a canary-yellow gipsy caravan pulled by an old grey horse on a dusty country road, a toad in a driving cap singing at the front, summer fields',
      blocks: [
        {
          kind: 'text',
          text: 'One bright summer morning, Toad arrived at Rat’s door in his new gipsy caravan. It was painted canary yellow, picked out with green and red. "This is the life!" cried Toad. "The open road, the fresh air, the dust of the highway! Come with us!"',
        },
        {
          kind: 'image',
          art: 'open-road',
          text: 'Toad’s canary-yellow caravan, pulled by an old grey horse.',
        },
        {
          kind: 'text',
          text: 'So the Rat and the Mole packed their things, and the little caravan rolled out into the world. The horse went clip-clop, and the pots and pans jingled, and Toad sang songs about the road.',
        },
        {
          kind: 'note',
          text: 'New word: motor car — a carriage with no horse, that goes very fast and makes a terrible roar.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Then, from far away, came a low humming sound. It grew louder — BRROOM! A great motor car came rushing past. The horse reared up in fright, and the caravan went over into a ditch with a crash.',
        },
        {
          kind: 'text',
          text: 'The Mole and the Rat picked themselves up and tried to quiet the horse. But Toad sat in the middle of the road, his eyes shining, and his face quite empty of sense. "Poop-poop!" he whispered. "That was the most beautiful thing I have ever seen!"',
        },
        {
          kind: 'text',
          text: 'They sent for another cart and took the wreck home. But the Rat and the Mole looked at each other sadly. They knew Toad. He would want a motor car of his own — and nothing good would come of it.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Wild Wood',
      art: 'wild-wood',
      artPrompt: 'a snowy winter wood with dark bare trees, a mole hiding among beech roots while wicked weasel faces peer from behind trunks, a rat approaching with a lantern',
      blocks: [
        {
          kind: 'text',
          text: 'In the winter, the Mole went out alone to explore the Wild Wood. At first it was quiet and pretty. Then the faces came — little, hard, wicked faces peeping out from behind every tree and stone.',
        },
        {
          kind: 'image',
          art: 'wild-wood',
          text: 'The Wild Wood in winter, dark and full of watching eyes.',
        },
        {
          kind: 'text',
          text: 'The faces whispered. The Mole began to run, then to blunder. He fell into a ditch, and hid among the roots of a great beech tree, shivering. The snow fell thicker and thicker.',
        },
        {
          kind: 'note',
          text: 'New word: panic — a sudden great fear that makes you run without thinking at all.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Just then he heard a small, cheerful piping. It was the Water Rat, with two pistols in his belt and a stout stick in his hand. "Come along, Mole," he said. "We will go to my friend the Badger. He knows every hole in this wood."',
        },
        {
          kind: 'text',
          text: 'They followed a tunnel in the snow and came at last to a great dark door set in a stone wall. The Badger opened it himself, and drew them in out of the cold, for no animal is ever turned away at the Badger’s door.',
        },
        {
          kind: 'text',
          text: 'Inside it was warm and bright. A great fire roared in the kitchen, and the Badger gave them a supper of eggs and bacon and mulled ale. They sat and talked of nothing but Toad and his reckless, dangerous driving.',
        },
      ],
    },
    {
      title: 'Chapter 4 · Mr. Toad',
      art: 'toad-hall',
      artPrompt: 'a great red-brick manor house beside a river, weasels fleeing through its windows, a toad, a rat, a mole and a badger charging through the front door',
      blocks: [
        {
          kind: 'text',
          text: 'Toad had gone from bad to worse. He had crashed seven motor cars, and at last he stole a car that was not his, and drove it like a madman through the streets. The judge sent him to prison — twenty years, the longest sentence he could give.',
        },
        {
          kind: 'image',
          art: 'toad-hall',
          text: 'Toad Hall, the great red-brick house beside the river.',
        },
        {
          kind: 'note',
          text: 'New word: prison — a place with locked doors, where people are kept for doing wrong.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Toad was miserable. But the gaoler’s daughter was kind. She brought him a washerwoman’s bonnet and skirt, and said, "Put these on. My aunt does the washing, and nobody looks twice at a washerwoman." So Toad, in his disguise, walked out of the prison through the great gates.',
        },
        {
          kind: 'text',
          text: 'His adventures home were many. He tricked a train driver and rode on the footplate, he traded horses, and he was thrown into a river by a barge woman — all because he could not stop boasting about being Toad. At last he came back to his own river bank.',
        },
        {
          kind: 'text',
          text: 'There the Rat and the Mole and the Badger were waiting with terrible news. While Toad was away, the weasels and stoats of the Wild Wood had taken over Toad Hall! They were drinking his wine and breaking his chairs.',
        },
        {
          kind: 'text',
          text: 'That night, armed to the teeth, the four friends went down a secret tunnel the Badger had known since he was young. They burst into Toad Hall through the back. The weasels scattered like leaves, and Toad’s home was his own again. After that, Toad still boasted a little — but he never forgot the friends who had saved him.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Wind in the Willows',
    author: 'Kenneth Grahame',
    authorDeathYear: 1932,
    jurisdiction: 'EU',
    basis: 'pd-70',
    sourceUrl: 'https://www.gutenberg.org/ebooks/289',
    note: 'Published 1908; public domain worldwide (Grahame d. 1932, 70y pma expired). Plot follows Project Gutenberg eBook #289; wording simplified into short sentences for young English readers.',
  },
}
