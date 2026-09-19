import type { PackBook } from '../types'

/**
 * The Second Jungle Book — four Mowgli stories retold for young English readers.
 * Text: Project Gutenberg eBook #266 (Rudyard Kipling, 1895). Public domain
 * worldwide (Kipling died 1936; 70y pma expired). Plot follows the original:
 * Mowgli's adventures after he leaves the wolf pack — driving in the herd,
 * the cobra's treasure, the wild dogs, and his spring running back to men.
 * Wording simplified into short sentences for children aged 6-8.
 */
export const jungleBook2: PackBook = {
  id: 'kipling-jungle2',
  title: 'The Second Jungle Book',
  author: 'Rudyard Kipling',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'Mowgli, the boy of the Seeonee wolves, is growing tall and strong. With Baloo the bear and Bagheera the panther beside him, he faces his last great trials in the jungle — and finds the road that leads back to his own people.',
  coverArt: 'jungle2-council',
  coverArtPrompt: 'a boy in his teens with long hair standing on a flat moonlit rock beside a sleeping grey rock-python, a black panther and a brown bear seated like guardians below, tall silver grass and dark jungle trees under a huge warm moon, storybook painting',
  coverFrom: '#1B5E20',
  coverTo: '#FFD54F',
  source: 'The Second Jungle Book (Rudyard Kipling, 1895), Project Gutenberg eBook #266, public domain (Kipling d. 1936)',
  chapters: [
    {
      title: 'Chapter 1 · Letting In the Jungle',
      art: 'jungle2-village-herd',
      artPrompt: 'a boy with long hair standing tall and calm before a herd of stampeding water buffalo in a cloud of golden dust, a small village of clay huts behind them, a black panther leaping on a bamboo fence, warm dusty afternoon light',
      blocks: [
        {
          kind: 'text',
          text: 'The men of the village had been unkind to Mowgli and to his wolf-family. Mowgli was angry, and anger can make even a good boy think of unkind things. But he did not wish to hurt anyone. He thought and thought, and then he had a plan that would frighten the village without harming a single person.',
        },
        {
          kind: 'image',
          art: 'jungle2-village-herd',
          text: 'Mowgli calls the herd of buffalo, and the ground begins to tremble.',
        },
        {
          kind: 'text',
          text: '"Hathi," he called to the great old elephant, "will you help me?" Hathi had his own old reason to distrust men, and he came with his three sons. Together, very quietly, they pushed down part of the village wall by night.',
        },
        {
          kind: 'note',
          text: 'New word: herd — a big family of animals that travels together. Mowgli has looked after a herd of buffalo all season, so they know his voice and trust him.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'In the morning Mowgli stood on the rocks above the fields and called the herd. The buffalo came like a river of horns and hooves, streaming down the lanes and through the broken wall, and the frightened villagers ran for safety to the far jungle edge. No one was hurt; the animals flowed around the huts and out the other side.',
        },
        {
          kind: 'text',
          text: 'The trampled walls sagged and the bamboo roofs came softly down, and the vines of the jungle began, little by little, to creep in. "The jungle will take this place," said Bagheera, "and men will find better villages, and be kinder there." Mowgli looked at the wreck of the village and felt the anger go out of him like wind from a cave. His work was done, and he turned back to the free jungle.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The King\'s Ankus',
      art: 'jungle2-white-hood',
      artPrompt: 'a lost city of white stone arches half swallowed by creepers, inside a treasure chamber glowing with gold plates and coins, a boy holding a bejewelled elephant-goad, a huge old cobra with pale hood watching from a heap of gold, shafts of green jungle light from a broken roof',
      blocks: [
        {
          kind: 'text',
          text: 'Deep in the jungle stood the Cold Lairs, a lost city older than any memory, where monkeys used to play. Mowgli and Kaa the rock-python found a stone door in the ground, and beneath it lay a hall full of gold — plates and coins and kings\' treasures, sleeping in the dark for hundreds of years.',
        },
        {
          kind: 'image',
          art: 'jungle2-white-hood',
          text: 'The hidden treasure hall, watched over by the White Hood.',
        },
        {
          kind: 'text',
          text: 'A huge old cobra lay coiled on the gold. She was called the White Hood, and she had guarded the treasure so long that her poison had dried away. "This is death," she hissed. "Men have died for this gold, and it has brought them no good."',
        },
        {
          kind: 'note',
          text: 'New word: ankus — an elephant-driver\'s hooked staff, trimmed with jewels like a king\'s toy. In this story, treasure is only heavy metal: it cannot be eaten, played with, or shared.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Mowgli took only one small thing: a bejewelled ankus, bright as a star. He thought it would make a fine toy. But the ankus was unlucky — men saw it shining and reached for it, and by morning a man of the jungle villages lay still beside it, and Mowgli saw that the cobra had spoken true.',
        },
        {
          kind: 'text',
          text: 'So Mowgli carried the ankus back to the Cold Lairs and laid it on the heap of gold. "Take it back," he told the White Hood. "Your watch is almost over, but this treasure shall kill no one more today." And he came away lighter of heart than he had come, for he had nothing — and nothing, he found, weighs nothing at all.',
        },
      ],
    },
    {
      title: 'Chapter 3 · Red Dog',
      art: 'jungle2-red-dogs',
      artPrompt: 'a pack of tawny wild dogs swarming along a rocky river bank under a lowering storm sky, a boy standing calm on a boulder above whirling water, bees swarming in a golden cloud from a cliff-side hive, a black panther waiting in the green shadows, dramatic but storybook-soft light',
      blocks: [
        {
          kind: 'text',
          text: 'One day a stranger came up the dry bed of the Waingunga: Won-tolla the lone wolf, bleeding but standing proud. "The Red Dogs are coming," he warned the pack. "Dholes, from the south — a hundred wild dogs that sweep the jungle like a red flood. They kill for the sake of killing."',
        },
        {
          kind: 'image',
          art: 'jungle2-red-dogs',
          text: 'The red flood of wild dogs pouring along the river bank.',
        },
        {
          kind: 'text',
          text: 'The wolves looked at Mowgli. He was young, but the pack trusted him. "This is our jungle," he said. "We will meet them at the little ravine where the wild bees hang their hive." So the wolves sent the mothers and cubs safe away, and took their places along the cliffs, quiet as stones.',
        },
        {
          kind: 'note',
          text: 'New word: ravine — a deep, narrow valley between hills. Mowgli does not fight the whole flood of dogs at once — he picks the one place where a clever plan can save the pack.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Mowgli ran before the dogs and tickled the great bees\' hive with a stone, and came away laughing with the golden cloud of angry bees behind him. The wild dogs poured into the ravine and the bees fell on them, stinging, and above them on the rocks the wolf pack waited, fresh and strong.',
        },
        {
          kind: 'text',
          text: 'Then Mowgli led the tired, stung dogs down to the river, where the current runs fast over the falls. The river tumbled the red flood about and swept most of them far away, and the few that crawled ashore were so weary that they turned south and never came back. "The pack is safe," said Akela, "and we owe it to a man-cub who thinks before he strikes."',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Spring Running',
      art: 'jungle2-spring-running',
      artPrompt: 'a tall boy with long dark hair running alone along a mossy jungle path at evening, spring flowers opening along the verges, moths in the beam of low golden sunlight, a black panther and a brown bear watching him from a distance with gentle eyes, tender warm light',
      blocks: [
        {
          kind: 'text',
          text: 'Spring came to the jungle, and the sap ran in the trees, and something new ran in Mowgli too. His shoulders were broad now, and his hands were man\'s hands, and when the season called, his feet carried him running — up hill and down valley, all day, for the pure joy of running.',
        },
        {
          kind: 'image',
          art: 'jungle2-spring-running',
          text: 'The spring running, along the mossy paths, alone and full of strange feelings.',
        },
        {
          kind: 'text',
          text: 'The animals were busy with their spring business and did not trouble him, and Mowgli found that a strange thing had happened: he felt lonely. The jungle that had always been enough felt suddenly too quiet, and something inside him leaned toward the lights of men\'s villages far below in the plains.',
        },
        {
          kind: 'note',
          text: 'Growing up can feel like this: big feelings with no name yet, and a pull toward new places. Baloo the bear says it is the "spring running" — the time when everyone grows, and it passes, and it is not sad, only new.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Bagheera walked beside him in the shadows. "Little brother," said the panther gently, "men have their own pack laws, and they are not ours — but a man should live among men." Mowgli was quiet a long time. "I had not thought to leave," he said. "And now, when I run toward the villages, my feet are not sorry."',
        },
        {
          kind: 'text',
          text: 'So on a soft spring evening Mowgli came down the last slope, and the smell of woodsmoke rose to meet him, and a girl by a cattle-gate smiled at him and wished him good evening in the tongue of men. The Jungle People watched him go from the edge of the grass. He looked back once at the dark green wall of his old home, and then he walked on toward the village lights, and his heart was glad.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Second Jungle Book',
    author: 'Rudyard Kipling',
    authorDeathYear: 1936,
    jurisdiction: 'EU',
    basis: 'pd-70',
    sourceUrl: 'https://www.gutenberg.org/ebooks/266',
    note: 'Published 1895; public domain worldwide (Kipling d. 1936, 70y pma expired). Plot follows Project Gutenberg eBook #266; wording simplified into short sentences for young English readers.',
  },
}
