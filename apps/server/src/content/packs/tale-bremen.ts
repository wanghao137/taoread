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
