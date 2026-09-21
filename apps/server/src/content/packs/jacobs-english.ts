import type { PackBook } from '../types'

/**
 * English Fairy Tales — Joseph Jacobs (1854–1916), first published 1890.
 * Eight tales retold for young readers, one per chapter: Childe Rowland,
 * Cap o' Rushes, The Fish and the Ring, and The Red Etin. Frightening
 * episodes are played as clever escapes; plots follow the public-domain
 * originals.
 * Source: English Fairy Tales (Joseph Jacobs, 1890), public domain
 * (Jacobs d. 1916; EU pma expired 1987).
 */
export const englishFairyTales: PackBook = {
  id: 'jacobs-english',
  title: 'English Fairy Tales',
  author: 'Joseph Jacobs',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro:
    'Eight old English tales of brave hearts and quick wits: a brother who walks round and round a barrow to reach the Dark Tower, a daughter turned away for loving too truly, a youngest son who out-thinks a three-headed giant, three pigs against the wolf, a boy who climbs the beanstalk, a name that must never be spoken, and a chicken who feared the sky was falling. Told as Jacobs told them — merry, plain and full of courage.',
  coverArt: 'engfair-tower',
  coverArtPrompt:
    'A moonlit fairy-tale scene: a young knight in a green tunic stands before a great grassy barrow hill where an antique stone tower rises into the stars, round-windowed and lantern-lit; a swirl of golden elf-light circles the mound, sheep pasture and hedges below, huge harvest moon. Deep blue-and-gold palette, mysterious but friendly, classic storybook style.',
  coverFrom: '#7E57C2',
  coverTo: '#FFCC80',
  source: 'English Fairy Tales (Joseph Jacobs, 1890), public domain',
  chapters: [
    {
      title: 'Chapter 1 · Childe Rowland and the Dark Tower',
      art: 'engfair-rowland',
      artPrompt:
        'A torchlit hall inside a fairy mound: a determined young knight in green strides toward a carved throne where a tall elf-king in shadow-robe and a golden-haired captive girl stand, the hall lined with kneeling horses’ heads of stone; he holds up a magic word in a bubble of light. Amber torch-glow against green-black stone, bold storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'Long ago there lived a maiden named Ellen, whose brothers Burden and Childe Rowland loved her dearly. One day, chasing a ball, Ellen was carried off to the Dark Tower of the King of Elfland.',
        },
        {
          kind: 'text',
          text: 'Her brother Burden went to find her, and never came home. Then the eldest brother went, and never came home either.',
        },
        {
          kind: 'text',
          text: 'So Childe Rowland, the youngest, went to his mother, and then to the wise Merlin of the wood, who gave him good counsel: take the good sword, hold it fast, and — whatever happens — eat nothing, drink nothing, in Elfland.',
        },
        {
          kind: 'image',
          art: 'engfair-rowland',
          text: 'Rowland strides through the elf-king’s hall, sword up, word ready.',
        },
        {
          kind: 'note',
          text: 'New word: barrow — an old grassy hill raised over a king’s tomb, where fairies were said to dance.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Rowland walked twice round the green barrow, and a door flew open. Down he went, and onward, till he came to the tower where the King of Elfland mocked him. But Rowland spoke the mighty word, held his sword true, and the elf-king’s power broke like a dropped egg. Then Rowland took Ellen and his brothers by the hand, and they rode home through the morning, and there was feasting in the hall for a month and a day.',
        },
      ],
    },
    {
      title: 'Chapter 2 · Cap o’ Rushes',
      art: 'engfair-rushes',
      artPrompt:
        'A great manor kitchen at dusk with a wedding feast glowing beyond the door: a slim girl in a hood woven of rushes peeps in, stirring a single bowl of broth; long tables, candle-branches and dancers blur warm in the background, wet rushes and a broom at her feet. Copper-and-honey light against cool blue doorway, tender storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'A rich man asked his three daughters, "How much do you love me?" The eldest said, "As much as my life." The second said, "As much as my gold." The youngest said only, "As fresh meat loves salt."',
        },
        {
          kind: 'text',
          text: 'The father was angry. "You love me no more than salt?" And he turned her out of the house, into the wide world.',
        },
        {
          kind: 'text',
          text: 'The girl wove herself a cloak and hood of rushes, and called herself Cap o’ Rushes, and took a place in a great house, washing, cooking and mending.',
        },
        {
          kind: 'image',
          art: 'engfair-rushes',
          text: 'Cap o’ Rushes stirs the wedding broth, hood low, heart full.',
        },
        {
          kind: 'note',
          text: 'New word: rushes — tall water plants, once woven into mats and cloaks.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Years later she cooked the broth for her father’s own wedding feast — but left out the salt. One taste, and the old man wept. "Ah," he said, "my youngest daughter, who loved me more than all: fresh meat loves salt best of all things." And out from the shadows came Cap o’ Rushes, hood thrown back. And they forgave each other, and the wedding became a feast for the whole parish.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Fish and the Ring',
      art: 'engfair-fish',
      artPrompt:
        'A sunlit river bend below a castle: a magnificent leaping fish flashes in mid-air, a gold ring catching the light on its fin, while a small determined girl wades to catch it with both hands; a stern old lord watches from the castle window, herons startled. Silver water, green banks, gold ring sparkle, lively storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'A great lord was walking by the river when he heard two fishermen wondering over a fine fish they had caught. "Cut it open," said the lord, "and see." Inside was a gold ring.',
        },
        {
          kind: 'text',
          text: 'An old man read the ring’s secret: the girl who wore it would one day marry the lord’s own son. The lord was angry — he had other plans — and he wrote, "She is to be drowned," and sent her off with the letter.',
        },
        {
          kind: 'text',
          text: 'But a kind pair of robbers-in-reverse (well, honest folk, of a sort) swapped the letter for one that read, "She is to be married at once." And so the girl was wed with bells and flowers, and all went merrily.',
        },
        {
          kind: 'image',
          art: 'engfair-fish',
          text: 'The fish leaps with the ring — and the secret leaps with it.',
        },
        {
          kind: 'note',
          text: 'Ask your child: everyone kept trying to change the girl’s fortune. What happened in the end?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'When the lord learned the truth, he raged and raged — but rage is a poor boat. At last he threw up his hands and laughed, for what must be will be; and the girl in the gold ring became the finest lady in the country, and even the old lord came round in the end.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Red Etin',
      art: 'engfair-etin',
      artPrompt:
        'A gloomy giant’s hall lit by a fire of gorse: a young lad in a plaid grips a snagged magic wand of blackthorn while three grotesque heads of a sleeping giant snore on pillows before him, two enchanted brothers — one a raven, one a greyhound — watch hopefully from the shadows. Ember orange against peat-brown dark, brave whispered-adventure storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'There once lived in the north a monster called the Red Etin, who had three heads and a temper for each. Three sons set out to see the world, one after another — and one by one, the Etin turned them into beasts: a raven, a greyhound, and worse.',
        },
        {
          kind: 'text',
          text: 'At last the youngest son set out. On the road he was kind to every living thing he met, and an old woman who knew the Etin’s secrets said, "For kindness given, kindness told: the Etin sleeps three times a night, and by his pillow lies a wand of enchantment. Snap it, and his power ends."',
        },
        {
          kind: 'text',
          text: 'The lad crept into the Etin’s hall, past the three heads snoring like smiths’ bellows, and closed his hand on the wand.',
        },
        {
          kind: 'image',
          art: 'engfair-etin',
          text: 'The youngest son reaches for the wand while the three heads snore.',
        },
        {
          kind: 'note',
          text: 'New word: etin — an old word for a giant, in northern tales.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Snap! went the wand, like ice on a spring pond. The raven and the greyhound stood up as brothers again, and the Etin, with no more power than a wet sack, grumbled off to the hills for ever. And the three brothers walked home to their mother, who never had to bake for two again.',
        },
      ],
    },
    {
      title: 'Chapter 5 · The Story of the Three Little Pigs',
      art: 'engfair-pigs',
      artPrompt:
        'Three cheerful pigs safe inside the doorway of a sturdy brick cottage, a big bad wolf tumbling headfirst from the chimney toward a great steaming kettle in the yard, the little straw house and stick house leaning sadly in the garden behind, bright comic storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'An old sow sent her three little pigs out into the world to seek their fortunes. The first pig met a man with a bundle of straw, and built himself a house of straw. The second pig met a man with a bundle of sticks, and built himself a house of sticks. But the third pig met a man with a load of bricks, and worked and worked till his house of bricks was done.',
        },
        {
          kind: 'text',
          text: 'By and by came a big bad wolf. He knocked at the straw house. "Little pig, let me come in!" "Not by the hair of my chinny-chin-chin!" "Then I’ll huff, and I’ll puff, and I’ll blow your house in!" And huff he did, and puff he did, and the straw house fell down. But the little pig was quick, and ran to his brother’s house of sticks.',
        },
        {
          kind: 'image',
          art: 'engfair-pigs',
          text: 'Down the chimney comes the wolf — splash! — where the kettle waits.',
        },
        {
          kind: 'text',
          text: 'The wolf huffed and puffed that house down too — but the two pigs had already run to the brick house. There the wolf huffed and puffed till he was red in the face, and the house stood fast. So down the chimney he came — splash! — into a great kettle of water the pigs had set boiling. Up the hill went the wolf, howling, and he never troubled the three little pigs again.',
        },
        {
          kind: 'note',
          text: 'New word: huff — to blow out air in a big angry breath. Ask your child: why did the third pig’s house stand fast? Because he did the slow, careful work first.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 6 · Jack and the Beanstalk',
      art: 'engfair-beanstalk',
      artPrompt:
        'An enormous beanstalk winding up into the clouds, a boy climbing swiftly with a golden harp under his arm, far above a huge angry ogre roaring at a cloud-castle door, far below a tiny cottage with an axe leaning by the woodpile, early morning light, lively storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'Jack and his mother were poor, and at last they had nothing left to sell but the cow. So Jack took her to market — and came home with five magic beans. His mother was so cross that she flung the beans out of the window. But in the morning a great beanstalk stood twisting up into the clouds, higher than the highest tree.',
        },
        {
          kind: 'text',
          text: 'Up Jack climbed, and at the top he came to a great house, and in it a great ogre’s wife, who hid him in the oven when the ogre came home. "Fee-fi-fo-fum, I smell the blood of an Englishman!" roared the ogre. But he did not find Jack, and Jack slipped away with a bag of gold.',
        },
        {
          kind: 'image',
          art: 'engfair-beanstalk',
          text: 'Down the beanstalk with the singing harp, and the ogre thundering behind.',
        },
        {
          kind: 'text',
          text: 'Twice more he climbed — and brought back a hen that laid golden eggs, and a harp that sang most beautifully of its own accord. But the third time, the harp cried out "Master! Master!" and the ogre chased Jack down the stalk. "Mother! Bring the axe!" Down came the beanstalk, and down came the ogre — and that was the end of him. Then the golden hen made Jack and his mother rich, and the harp sang in their little house for ever after.',
        },
        {
          kind: 'note',
          text: 'Ask your child: which treasure helped Jack most — the bag of gold, the hen, or the harp? And what would you have done when the harp called out?',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 7 · Tom Tit Tot',
      art: 'engfair-tittot',
      artPrompt:
        'A small comical black creature spinning swiftly at a spinning wheel in a royal chamber by firelight, a tired young queen watching from her chair, eleven scratched tallies on the wall, one candle burning low, cosy moody storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'A girl said she could spin five skeins of thread a night — but that was only her mother’s boasting, and the king heard it. He married her, and then he told her the truth: she must spin five skeins every night, or leave the palace for ever. The poor queen sat crying in her chair, for she could not spin at all.',
        },
        {
          kind: 'text',
          text: 'Then there came a little knock, and in hopped a small, funny-looking black thing with a spinning wheel. "I’ll spin your five skeins every night," said he, "if you have three guesses every day to find my name. Fail at the month’s end, and you are mine." And each night her skeins were spun, and each day she guessed wrong.',
        },
        {
          kind: 'image',
          art: 'engfair-tittot',
          text: 'The little black thing at the wheel, on the very last night of the month.',
        },
        {
          kind: 'text',
          text: 'On the last night the king himself came home and said he had heard a strange thing singing in the wood: "Nimmy nimmy not, my name’s Tom Tit Tot!" Then in hopped the little black thing. "Now, my lady, what is my name?" "Why," said she, sweet as honey, "TOM TIT TOT!" And the little thing gave an awful screech and flew off into the dark, and was never seen again.',
        },
        {
          kind: 'note',
          text: 'New word: skein — a long, loosely wound length of thread. Ask your child: how did the queen learn the name? By listening — patiently, every single day.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 8 · Henny Penny',
      art: 'engfair-henny',
      artPrompt:
        'A comical line of farm birds — hen, rooster, duck, goose and turkey — trotting along a leafy autumn lane behind a flustered hen with an acorn still on her head, a sly fox with a thin smile peeking from a dark cave mouth in the hillside, dappled light, comic storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'One day Henny Penny was pecking in the farmyard when an acorn fell — plump! — right on her head. "The sky is falling!" cried Henny Penny. "I must go and tell the king."',
        },
        {
          kind: 'text',
          text: 'So off she went, and on the way she met Cocky Locky. "Where are you going?" "To tell the king the sky is falling!" "I’ll come with you." Then came Ducky Daddles, then Goosey Loosey, then Turkey Lurkey, and at last a fine long line of birds went trotting down the lane.',
        },
        {
          kind: 'text',
          text: 'In the deep dark wood they met Foxy Loxy. "Going to the king?" said he, very smooth. "Come with me — I know the shortest way." And he led them straight to the mouth of his den.',
        },
        {
          kind: 'image',
          art: 'engfair-henny',
          text: 'The fine long line of birds — and one fox who knows a shortcut.',
        },
        {
          kind: 'text',
          text: 'But Henny Penny peeped first, and saw bones and feathers in the dark. "Run!" she squawked, and the whole line of birds flew, flapped and waddled home faster than ever birds had gone before. And the sky never did fall — but Henny Penny always looked up, and looked twice, ever after.',
        },
        {
          kind: 'note',
          text: 'Ask your child: the sky was not falling — it was only an acorn. How could Henny Penny have found that out sooner?',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'English Fairy Tales',
    author: 'Joseph Jacobs',
    authorDeathYear: 1916,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Eight tales retold for young readers; frightening episodes played as clever escapes. Published 1890; US public domain and PD in the EU (Jacobs d. 1916, 70y pma expired 1987).',
  },
}
