import type { PackBook } from '../types'

/**
 * Aesop's Fables — five best-loved animal fables retold in short, simple English
 * for children aged 3-5. Each chapter tells one fable and ends with its moral.
 * Source: Project Gutenberg eBook #28, "Aesop's Fables" (Aesop, translated by
 * George Fyler Townsend). Aesop is traditionally said to have died about 564 BCE,
 * and the fables are public domain worldwide (pd-70). Retold in easy sentences.
 */
export const aesopFables: PackBook = {
  id: 'aesop-fables',
  title: 'Aesop’s Fables',
  author: 'Aesop',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: 'Five short animal stories, each with a little lesson at the end. Meet a lion and a mouse, a tortoise and a hare, one very silly fox — and more!',
  coverArt: 'lion-mouse',
  coverArtPrompt: 'a big golden lion lying in the sun on a grassy hill, a tiny brown mouse standing bravely in front of him, acacia trees on the warm savanna, soft afternoon light',
  coverFrom: '#E65100',
  coverTo: '#FFCC80',
  source: 'Project Gutenberg eBook #28, public domain (Aesop, 6th century BCE)',
  chapters: [
    {
      title: 'Chapter 1 · The Lion and the Mouse',
      art: 'lion-sun',
      artPrompt: 'a mighty lion asleep on warm grass under a blue sky, a little mouse tiptoeing across his great paw, golden savanna in the background',
      blocks: [
        {
          kind: 'text',
          text: 'One day a great lion was fast asleep in the sun. His golden mane rose and fell as he snored. A tiny mouse ran out of the long grass — and ran right over the lion’s paw!',
        },
        {
          kind: 'image',
          art: 'lion-sun',
          text: 'The lion wakes up and catches the little mouse in his paw.',
        },
        {
          kind: 'note',
          text: 'New word: paw — an animal’s foot. Lions have big paws, and mice have tiny ones.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The lion woke up with a roar. He put his paw on the little mouse and opened his great jaws. "Please, please let me go!" cried the mouse. "One day I may help you!"',
        },
        {
          kind: 'text',
          text: 'The lion laughed. "How could a tiny mouse help a lion?" But he was kind, and he lifted his paw. The little mouse ran home as fast as she could.',
        },
        {
          kind: 'text',
          text: 'Some days later, the lion was caught in a hunter’s net. He pulled and pulled, but the ropes were too strong. He roared so loud that the trees shook.',
        },
        {
          kind: 'text',
          text: 'The little mouse heard him. She ran to the net and began to gnaw. Snip, snip, snip — one rope after another gave way, and at last the lion was free.',
        },
        {
          kind: 'note',
          text: 'Moral: Even a little friend can be a big help. Kindness is never wasted.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Tortoise and the Hare',
      art: 'tortoise-hare',
      artPrompt: 'a green tortoise walking slowly along a dusty country road, a brown hare with long ears dashing past in a blur, grassy meadow and sunshine',
      blocks: [
        {
          kind: 'text',
          text: 'A hare could run like the wind, and he knew it. "I am the fastest animal of all!" he told everyone he met. "No one can beat me!"',
        },
        {
          kind: 'note',
          text: 'New word: fastest — the one that runs more quickly than all the others.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'A tortoise heard him. "You may be fast," she said slowly, "but I would like a race." The hare laughed so hard he nearly fell over. "A race? With you? Wonderful!"',
        },
        {
          kind: 'image',
          art: 'tortoise-hare',
          text: 'The tortoise and the hare line up to race.',
        },
        {
          kind: 'text',
          text: 'Off they went! The hare ran and ran, and soon he was far, far ahead. He looked back, but he could not even see the tortoise. "I have plenty of time," he thought. "I will rest a little." He lay down under a tree and fell fast asleep.',
        },
        {
          kind: 'text',
          text: 'The tortoise never stopped. Slowly, step by step, she walked on. She passed the sleeping hare. She walked and walked, and at last she crossed the finish line.',
        },
        {
          kind: 'text',
          text: 'When the hare woke up, he ran as fast as he could — but it was too late. The slow tortoise had already won the race.',
        },
        {
          kind: 'note',
          text: 'Moral: Slow and steady wins the race. Keep going, and you will get there.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Boy Who Cried Wolf',
      art: 'boy-sheep',
      artPrompt: 'a shepherd boy in a tunic standing on a green hillside, a flock of fluffy white sheep around him, a wooden crook in his hand, village rooftops in the valley below',
      blocks: [
        {
          kind: 'text',
          text: 'A boy watched his father’s sheep on a hill. All day long he sat with the flock, and nobody came to talk to him. It was very quiet work — and the boy was bored.',
        },
        {
          kind: 'note',
          text: 'New word: flock — a group of sheep that live and walk together.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'One day he thought of a game. He cupped his hands and shouted as loud as he could: "Wolf! Wolf! A wolf is after the sheep!"',
        },
        {
          kind: 'image',
          art: 'boy-sheep',
          text: 'The boy calls for help, and the villagers run up the hill.',
        },
        {
          kind: 'text',
          text: 'The villagers ran up the hill to help him. They looked all around. There was no wolf anywhere — only the boy, laughing. "There is no wolf," he said. "I fooled you!"',
        },
        {
          kind: 'text',
          text: 'A few days later, the boy was bored again. "Wolf! Wolf!" he shouted. Again the kind people ran up the hill. Again there was no wolf. The boy laughed and laughed.',
        },
        {
          kind: 'text',
          text: 'Then one evening a real wolf came out of the dark wood. It was big and grey and hungry. The boy shouted, "Wolf! Wolf! Please help!" But nobody came. Nobody believed him. The wolf snatched a sheep and carried it away.',
        },
        {
          kind: 'note',
          text: 'Moral: No one believes a story-teller, even when he tells the truth. Always say what is true.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Ant and the Grasshopper',
      art: 'ant-grasshopper',
      artPrompt: 'a golden summer meadow, a small brown ant carrying a seed of wheat on her back, a bright green grasshopper sitting on a leaf playing a blade of grass like a fiddle',
      blocks: [
        {
          kind: 'text',
          text: 'All through the hot summer days, an ant worked. She carried heavy seeds of wheat and barley down into her hill, one by one, filling her store-room full of food.',
        },
        {
          kind: 'note',
          text: 'New word: gather — to collect and bring things together, like nuts or seeds for winter.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'A grasshopper watched her. "Why do you work so hard?" he said. "The sun is warm and the grass is sweet. Come and dance with me!" And he rubbed his long legs together and played a little song.',
        },
        {
          kind: 'image',
          art: 'ant-grasshopper',
          text: 'The ant works while the grasshopper plays his song.',
        },
        {
          kind: 'text',
          text: 'The ant only smiled. "Winter is coming, and it will be cold," she said. "I am saving food for the frosty days." The grasshopper did not listen. He sang and played all summer long.',
        },
        {
          kind: 'text',
          text: 'When the snow came, the grasshopper had nothing to eat and nowhere warm to go. Shivering, he knocked at the ant’s door. The ant was sorry for him. "Come in and share my food," she said. "You are welcome to stay."',
        },
        {
          kind: 'text',
          text: 'The grasshopper was glad and thankful. From that winter on, he always worked a little, and played a little too.',
        },
        {
          kind: 'note',
          text: 'Moral: Work first, and then play — you will be glad when the cold days come.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 5 · The Fox and the Grapes',
      art: 'fox-grapes',
      artPrompt: 'a red fox standing on his hind legs under a leafy grape vine, a big bunch of purple grapes hanging high above, green trellis and blue sky',
      blocks: [
        {
          kind: 'text',
          text: 'One hot afternoon, a fox was out for a walk. His tummy rumbled. He had eaten nothing all day, and he wanted something cool and sweet.',
        },
        {
          kind: 'image',
          art: 'fox-grapes',
          text: 'The fox looks up at a big bunch of purple grapes.',
        },
        {
          kind: 'note',
          text: 'New word: vine — a long climbing plant that grapes grow on.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'In a garden he saw a vine, and on the vine hung a big bunch of purple grapes. They looked cool and juicy and full of juice. The fox licked his lips.',
        },
        {
          kind: 'text',
          text: 'He jumped. Snap! His teeth closed on nothing but air. He jumped again — higher this time. Still the grapes were too high. He jumped and jumped, but he could not reach them.',
        },
        {
          kind: 'text',
          text: 'At last the fox was too tired to try again. He sat down, rubbed his sore paws, and tossed his head. "Those grapes are sour and bad," he said. "I would not eat them if I could!" And off he walked.',
        },
        {
          kind: 'note',
          text: 'Moral: It is easy to say you do not want a thing — when you cannot have it.',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Aesop’s Fables',
    author: 'Aesop',
    authorDeathYear: -564,
    jurisdiction: 'EU',
    basis: 'pd-70',
    sourceUrl: 'https://www.gutenberg.org/ebooks/28',
    note: 'Aesop, a Greek storyteller, is said to have died about 564 BCE; his fables have been told for over 2,500 years and are public domain everywhere (pd-70). Retold for young children in simple English from Project Gutenberg eBook #28 (tr. George Fyler Townsend).',
  },
}
