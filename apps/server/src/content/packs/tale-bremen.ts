import type { PackBook } from '../types'

/**
 * The Town Musicians of Bremen — the Grimm brothers' tale, retold for children
 * aged 3-5 in four chapters. Source: Project Gutenberg eBook #2591, "Grimm's
 * Fairy Tales" (Jacob & Wilhelm Grimm). The brothers died in 1859 and 1863;
 * public domain in the EU and worldwide under the 70-years-after-death rule
 * (pd-70). Retold in short, easy English.
 */
export const bremenMusicians: PackBook = {
  id: 'grimm-bremen',
  title: 'The Town Musicians of Bremen',
  author: 'Jacob and Wilhelm Grimm',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: 'Four old friends — a donkey, a dog, a cat, and a rooster — are all told they are too old to be useful. So they set off together to become town musicians. What could possibly go wrong?',
  coverArt: 'bremen-four',
  coverArtPrompt: 'a grey donkey, a brown dog, a striped cat and a red rooster walking down a country road together in the sunshine, a signpost pointing to Bremen, green fields and blue sky',
  coverFrom: '#EF6C00',
  coverTo: '#FFE082',
  source: 'Project Gutenberg eBook #2591, public domain (Grimm brothers d. 1859/1863)',
  chapters: [
    {
      title: 'Chapter 1 · Four Old Friends',
      art: 'bremen-donkey',
      artPrompt: 'a grey donkey standing at a farm gate, a farmer pointing down the road, the donkey looking thoughtful, a wooden barn and green fields behind',
      blocks: [
        {
          kind: 'text',
          text: 'A man once had a donkey who had carried his sacks of grain for many years. But now the donkey was old and slow, and his master said, "You are no use to me any more. If you can find no work, I shall have to let you go."',
        },
        {
          kind: 'image',
          art: 'bremen-donkey',
          text: 'The donkey sets off down the road.',
        },
        {
          kind: 'note',
          text: 'New word: musician — someone who sings or plays an instrument, like a fiddle or a drum.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The donkey did not feel sad for long. "I can still play the lute," he said. (A lute is like a small guitar.) "I will go to the town of Bremen and become a town musician!"',
        },
        {
          kind: 'text',
          text: 'On the road he met an old dog, who was wheezing and tired. "Why are you so out of breath?" asked the donkey. "I am old," said the dog, "and my master has no more work for me. I have run away, but I do not know where to go."',
        },
        {
          kind: 'text',
          text: '"Come with me!" said the donkey. "I am going to Bremen to be a musician. You can play the drum, and I can play the lute." The dog agreed, and they walked on together.',
        },
      ],
    },
    {
      title: 'Chapter 2 · A Cat and a Rooster',
      art: 'bremen-road',
      artPrompt: 'a donkey and a dog meeting a striped cat sitting on a stone wall, and a red rooster crowing on a fence post, country road with yellow flowers, warm afternoon light',
      blocks: [
        {
          kind: 'text',
          text: 'A little further on they met a cat, sitting by the roadside with a sad face. "What is the matter?" asked the donkey. "My mistress says I am too old to catch mice," said the cat, "and she has shut me out of the house."',
        },
        {
          kind: 'image',
          art: 'bremen-road',
          text: 'The four friends meet on the road.',
        },
        {
          kind: 'note',
          text: 'New word: cottage — a small, cosy little house in the country.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"Come with us to Bremen!" said the donkey. "You know the songs of the night — you shall be our singer." The cat was glad, and joined them.',
        },
        {
          kind: 'text',
          text: 'Soon after, they passed a farmyard, and a rooster was crowing with all his might. "Why do you crow so loud?" asked the donkey. "Because Sunday is coming," said the rooster, "and the farmer’s wife says tomorrow I shall be made into soup! So I am singing my last song."',
        },
        {
          kind: 'text',
          text: '"Come with us, red rooster!" said the donkey. "You have a fine strong voice. We are going to Bremen to be town musicians." The rooster flew down from the fence, and the four friends went on together.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Robbers’ Cottage',
      art: 'bremen-window',
      artPrompt: 'a donkey standing with a dog on his back, a cat on the dog’s back, a rooster on the cat’s head, all looking through a lit cottage window at robbers eating a feast, night forest',
      blocks: [
        {
          kind: 'text',
          text: 'They could not reach Bremen before dark, so they decided to sleep in the forest. The rooster flew up to the highest tree to look around. "I see a light!" he cried. "There must be a house nearby."',
        },
        {
          kind: 'image',
          art: 'bremen-window',
          text: 'The four friends stack up to look in the window.',
        },
        {
          kind: 'note',
          text: 'New word: robber — a bad person who takes things that do not belong to him.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'They went to the light and found a cottage. But inside sat a band of robbers, eating a grand feast of meat and cakes and wine! The four friends were hungry — and they did not like robbers one bit.',
        },
        {
          kind: 'text',
          text: '"We shall make music," said the donkey. The donkey put his front hooves on the window-sill, the dog jumped on the donkey’s back, the cat climbed on the dog, and the rooster perched on the cat’s head.',
        },
        {
          kind: 'text',
          text: 'Then, at once, they made their music! The donkey brayed, the dog barked, the cat spitted, and the rooster crowed: "Cock-a-doodle-doo!" The noise was so loud and so terrible that the robbers jumped up in a fright and ran out of the cottage and into the dark wood, thinking a monster was at the door.',
        },
      ],
    },
    {
      title: 'Chapter 4 · A Happy Home',
      art: 'bremen-cottage',
      artPrompt: 'a grey donkey, brown dog, striped cat and red rooster sitting together by a warm fireplace inside a cosy cottage, an empty table with plates of food, moonlight through the window',
      blocks: [
        {
          kind: 'text',
          text: 'The four friends went inside and found the feast the robbers had left. They ate and ate, and then each found a soft place to sleep — the donkey in the yard, the dog by the door, the cat on the warm hearth, and the rooster on the roof.',
        },
        {
          kind: 'image',
          art: 'bremen-cottage',
          text: 'The four friends enjoy their new cottage.',
        },
        {
          kind: 'note',
          text: 'New word: brave — when you are frightened, but you do the right thing anyway.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Late that night, the robbers’ captain crept back with his lantern. He went down into the cellar to fetch wine — and he saw two sharp lights in the dark, and something scratched his face!',
        },
        {
          kind: 'text',
          text: 'He ran out, crying, "There is a witch in the house with eyes like hot coals! A monster bit my leg, and a judge shouted ‘Bring the villain here!’ from the roof!" The robbers were so frightened that they never came back again.',
        },
        {
          kind: 'text',
          text: 'And the four friends lived happily in the little cottage all the days of their lives. They were so comfortable there, you see, that they never did make it all the way to the town of Bremen.',
        },
      ],
    },
    {
      title: 'Chapter 5 · The Hare and the Hedgehog',
      art: 'bremen-hedgehog',
      artPrompt: 'a hedgehog and his wife, who looks exactly like him, standing at the two ends of a long ploughed furrow in a bright field, a dizzy hare sitting exhausted between them, Sunday morning sunshine',
      blocks: [
        {
          kind: 'text',
          text: 'One sunny Sunday morning a hare stood at the end of a field, boasting. "I am the fastest animal in the world!" he cried. By the fence sat a hedgehog. "I could race you," he said, "and win." The hare laughed and laughed. "Done!" he cried. "A golden coin on Sunday morning!"',
        },
        {
          kind: 'image',
          art: 'bremen-hedgehog',
          text: 'The hedgehog stands at his end of the furrow, calm as can be.',
        },
        {
          kind: 'note',
          text: 'New word: furrow — a long, straight line of earth a farmer digs for planting.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'But the hedgehog had a plan. His wife looked just like him. "Run to the far end of the field," he told her, "and stand in the next furrow. When the hare comes, call out: I am here already!" And that is just what she did.',
        },
        {
          kind: 'text',
          text: 'One — two — three! The hare ran like the wind down the furrow, while the hedgehog took two steps and sat down again. At the far end the hare found — the hedgehog’s wife! "I am here already!" she called. The hare ran back — and at the start stood the hedgehog himself, saying, "I am here already!" Up and down, up and down he ran, till his legs shook and his breath was gone.',
        },
        {
          kind: 'text',
          text: '"I give up!" gasped the hare, and he tumbled down on the grass, quite out of breath. The hedgehog picked up his golden coin and walked home with his wife for their Sunday breakfast. And the hare never again said he was the fastest animal in the world.',
        },
      ],
    },
    {
      title: 'Chapter 6 · Hans in Luck',
      art: 'bremen-luck',
      artPrompt: 'a cheerful young man skipping along a country road swinging his empty hands, a small stone splashing into a stone well beside him, his face bright with joy, rolling fields and a distant village',
      blocks: [
        {
          kind: 'text',
          text: 'Hans had worked for his master for seven years. "You have been faithful," said the master. "Here are your wages." And he gave Hans a lump of gold as big as his own head. Hans wrapped it in a cloth, put it on his shoulder, and set off home to his mother, feeling like the luckiest man alive.',
        },
        {
          kind: 'image',
          art: 'bremen-luck',
          text: 'Hans walks home light of heart, having traded gold for happiness.',
        },
        {
          kind: 'note',
          text: 'New word: wages — the pay you get for your work.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Soon the gold felt heavy. A rider went by, and Hans called out, "What luck you have, sitting so easily! I will trade you my gold for your horse!" And he did, and he was glad. But the horse threw him into a ditch, so he was glad again to trade it for a cow. "Milk for my mother every morning — what luck!" Then the cow would not be milked, so he traded her for a goose. "A goose lays eggs — what luck!"',
        },
        {
          kind: 'text',
          text: 'In the town a knife-grinder spun his wheel. "Trade me your goose for my whetstone," he said, "and you will never be poor." But soon the stone was too heavy too. At the well Hans took a long, cool drink, and — plop! — he let the stone drop in. Then he sprang up, free and easy, with tears of joy in his eyes. "How light I feel! How happy I am! Nobody on earth is as lucky as I am."',
        },
        {
          kind: 'text',
          text: 'And he ran the rest of the way home to his mother, with nothing in his hands and everything in his heart.',
        },
      ],
    },
    {
      title: 'Chapter 7 · The Straw, the Coal, and the Bean',
      art: 'bremen-bean',
      artPrompt: 'a long straw laid across a little brook like a bridge, a small red-hot coal walking over it, a round bean watching from the grassy bank, a tiny tailor with needle and thread nearby, storybook meadow',
      blocks: [
        {
          kind: 'text',
          text: 'Once an old woman meant to cook a supper of beans. She threw some straw on the fire, and a bean jumped out of the pan and landed on the floor — and there it met a piece of straw that had slipped out of the hearth, and a red-hot coal that had leapt out too. "We are all three lucky escapees," said the coal. "Let us travel the world together!" And so they set off, side by side.',
        },
        {
          kind: 'image',
          art: 'bremen-bean',
          text: 'The coal walks across the straw, and the bean watches in fear.',
        },
        {
          kind: 'note',
          text: 'New word: brook — a little stream, small enough to step over — almost.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Soon they came to a brook. "I will lie across it like a bridge," said the long straw. So the coal walked over first — but he was still red-hot, and halfway across he hissed and burned the straw right through. The straw broke in two and slipped into the water, and the coal hissed out like a little black star.',
        },
        {
          kind: 'text',
          text: 'The bean, who had waited on the bank, saw it all and laughed and laughed — till she split her sides! There she lay, unable to move, until a friendly young tailor came walking by. He took out his needle and thread and sewed her up again, kind as could be.',
        },
        {
          kind: 'text',
          text: 'And that is why, to this very day, every bean has a little black seam down its middle.',
        },
      ],
    },
    {
      title: 'Chapter 8 · The Queen Bee',
      art: 'bremen-bee',
      artPrompt: 'a kind young man gently holding his brothers back from a beehive in an old tree, a golden bee resting on a sleeping princess’ lips in a moonlit castle room below in the same scene, soft gold and green light',
      blocks: [
        {
          kind: 'text',
          text: 'Two brothers set out to see the world — and their youngest brother, whom everyone called Simpleton, asked to go too. "You are too simple," said the brothers. But he came along. On the way they found an ant hill. "Let me knock it over for fun!" said one brother. "No," said Simpleton, "leave the little people in peace." Then they found two ducks that could not fly, and wanted to catch them — "No, leave them in peace." And when they came to a bee hive full of honey, the brothers wanted to smoke the bees out, but Simpleton stopped them. "Leave the little people in peace," he said.',
        },
        {
          kind: 'image',
          art: 'bremen-bee',
          text: 'Simpleton keeps his brothers from harming the ant hill and the bees.',
        },
        {
          kind: 'note',
          text: 'New word: in peace — left alone, untroubled and safe.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'At last they came to a silent grey castle. In the stable stood stone horses, in the hall sat stone men, and upstairs slept three princesses on their beds. A little voice in the air said: "This castle is enchanted. Three tasks will set it free: gather a thousand pearls from the dark wood, fetch a golden key up from the deep lake, and tell which of the sleeping princesses is the true and kind one."',
        },
        {
          kind: 'text',
          text: 'The brothers tried and failed. But when Simpleton’s turn came, the ants he had saved came marching and gathered every single pearl by morning. The two ducks he had saved dived and brought up the golden key. And for the last task, the queen bee he had saved flew in and settled on the lips of the third princess — for she had never done an unkind thing in her life.',
        },
        {
          kind: 'text',
          text: 'The spell was broken. The stone horses stamped, the stone men laughed, and the castle filled with music. Simpleton married the kind princess and ruled the castle well — and his brothers were the first to cheer, for they had learned to leave the little people in peace.',
        },
      ],
    },
  ],
  rights: {
    workTitle: "Grimm's Fairy Tales — The Town Musicians of Bremen",
    author: 'Jacob and Wilhelm Grimm',
    authorDeathYear: 1863,
    jurisdiction: 'EU',
    basis: 'pd-70',
    sourceUrl: 'https://www.gutenberg.org/ebooks/2591',
    note: 'Grimm brothers died 1859 and 1863; public domain under the 70-years-after-death rule. Retold for young children in simple English from Project Gutenberg eBook #2591.',
  },
}
