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
    {
      title: 'Chapter 5 · The Steadfast Tin Soldier',
      art: 'emperor-soldier',
      artPrompt: 'a small one-legged tin soldier standing straight and firm on a nursery table beside a paper castle with a paper ballerina dancing on one leg at its door, warm lamplight, a window blowing open behind',
      blocks: [
        {
          kind: 'text',
          text: 'On his birthday a little boy unwrapped a box of tin soldiers. There were twenty-five, all alike — except one, who had only one leg, because he had been made last and the tin had run out. But he stood as straight and firm as any of the rest.',
        },
        {
          kind: 'image',
          art: 'emperor-soldier',
          text: 'The little one-legged soldier stands firm by the paper castle.',
        },
        {
          kind: 'note',
          text: 'New word: steadfast — standing firm and never giving up, whatever happens.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'On the table stood a paper castle, and at its little door danced a paper ballerina, poised on one leg with the other stretched high. "How like me she is," thought the tin soldier. "I should like to know her." But in the drawer a jack-in-the-box growled, "Stop staring at her!" The soldier said nothing. He only stood more firmly than ever.',
        },
        {
          kind: 'text',
          text: 'In the morning the window blew open, and — out he fell, three floors down to the street! Two boys found him, set him in a paper boat, and sent him sailing down the gutter. The boat rushed through dark pipes and under bridges, until a big fish came and swallowed him in one gulp, into the dark. The soldier held his musket tight and did not stir. He stood fast.',
        },
        {
          kind: 'text',
          text: 'Before long the fish was caught and sold at market — to the very same house! The cook cut it open and cried, "Why, here is the little tin soldier!" And she set him on the table, where the paper ballerina was dancing on her one leg. The little boy saw them and smiled. "You are both so brave and true," he said, "you shall stand side by side." So they stood together, firm and faithful, all the days of their lives.',
        },
      ],
    },
    {
      title: 'Chapter 6 · The Fir Tree',
      art: 'emperor-fir',
      artPrompt: 'a small fir tree in a sunny green forest looking up at tall dark trees, doves on the branches, golden light through the leaves',
      blocks: [
        {
          kind: 'text',
          text: 'Out in the deep wood stood a little fir tree. The sun was warm, the doves cooed, and the wind told him stories. But the little fir was not happy. "I want to be tall, like the great trees!" he said. "When I am tall, I shall be somebody at last."',
        },
        {
          kind: 'image',
          art: 'emperor-fir',
          text: 'The little fir tree in the green wood dreams of growing tall.',
        },
        {
          kind: 'note',
          text: 'New word: fir — a tree with green needles and brown cones that stays green all winter.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Year after year he grew, till he was tall indeed. Then one winter the woodcutters came. "Here is a fine tree for Christmas!" they cried, and down he came. In a grand house they stood him up in a warm room and hung him with candles and gold stars, and the children danced around him. "Now, at last, is my finest hour!" thought the fir.',
        },
        {
          kind: 'text',
          text: 'But after the feast he was carried up to a dark loft, all alone. His needles began to fall, and he thought of the green wood, the warm sun, and the doves. "I never enjoyed anything," he sighed, "while I waited to be tall."',
        },
        {
          kind: 'text',
          text: 'In spring the gardener carried the old tree out and shook his brown cones, and from them fell hundreds of little winged seeds. They sailed over the garden fence and away into the deep green wood. The next spring, tiny fir trees came up there — the old tree’s own children, growing happy in the sun. "Enjoy every day as you find it," said the sun and the wind to the little trees. "Do not wait to be tall to be glad." And the little firs listened, and were glad every single day.',
        },
      ],
    },
    {
      title: 'Chapter 7 · The Flying Trunk',
      art: 'emperor-trunk',
      artPrompt: 'a young man in a feathered hat riding through the clouds inside a big flying wooden trunk with golden buckles, rooftops and church towers far below, a warm sunset sky',
      blocks: [
        {
          kind: 'text',
          text: 'A merchant’s son had once been rich, but he spent his last coin, and his friends forgot him. All that was left him was an old trunk. He packed it — and poof! Up flew the trunk, carrying him over rooftops and chimneys, over hills and clouds and the wide sea, to a far warm country.',
        },
        {
          kind: 'image',
          art: 'emperor-trunk',
          text: 'The magic trunk flies the young man high above the clouds.',
        },
        {
          kind: 'note',
          text: 'New word: trunk — a big, strong box for keeping clothes and treasures.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'There he flew to a high tower, where a princess sat alone, and he told her stories: of kings and robbers, of flying chests and talking tea-kettles. She laughed and clapped her hands, and the king himself came to listen. "If you can please the whole city with a story," said the king, "you shall marry my daughter."',
        },
        {
          kind: 'text',
          text: 'The whole city came to hear him, and they laughed and cried and clapped, and the king gave his blessing. There were feasts and lanterns, and people fired rockets into the sky in his honour.',
        },
        {
          kind: 'text',
          text: 'But one little spark came down — pff — right into the old trunk. The trunk burned like a dry leaf, and there were no more flying days for anyone. "Never mind," said the young man cheerfully. And he went from town to town telling his stories to everyone he met — and that is how the tale of the flying trunk came to be told at all.',
        },
      ],
    },
    {
      title: 'Chapter 8 · What the Old Man Does Is Always Right',
      art: 'emperor-trade',
      artPrompt: 'a kindly old farmer with a walking stick trading his horse for a cow with a smiling farmer on a sunny country road, a big sack of apples in a cart, rolling green fields',
      blocks: [
        {
          kind: 'text',
          text: 'A farmer and his wife lived on a little farm. "Take the horse to town and trade him for something useful," said the wife, "and come home safe. What you do is always right." So the old man kissed her, and set off down the road.',
        },
        {
          kind: 'image',
          art: 'emperor-trade',
          text: 'The old man trades his horse for a cow on the sunny road to town.',
        },
        {
          kind: 'note',
          text: 'New word: trade — to give a thing to someone and get another thing back.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'On the way he met a man leading a cow. "A cow gives milk every morning," thought the old man. "That is lucky for my wife!" And he traded. Then he met a man with a sheep — "wool for winter socks, that is lucky!" — then a goose — "eggs for pancakes, that is lucky!" — then a man with a great sack of apples — "apples for a pie, that is lucky for my wife!" And each time, he traded.',
        },
        {
          kind: 'text',
          text: 'At the inn, two rich travellers laughed till they cried. "Your wife will scold you from here to Sunday!" they said. "If she does not, we will give you a bag of gold." So they all walked together to the little farm.',
        },
        {
          kind: 'text',
          text: 'The old man told his wife everything, trade by trade. And she clapped her hands at every one. "Milk! Wool! Eggs! And apples for a pie — oh, what a good, clever man I married!" And she kissed him on the cheek. The travellers laughed louder than ever, counted out the gold, and cried, "It is true — what the old man does is always right!" And it was, for a kind word is worth more than a sack of gold.',
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
