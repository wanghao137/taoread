import type { PackBook } from '../types'

/**
 * The Secret Garden — six chapters retold in simple English for young readers.
 * Original: Frances Hodgson Burnett, published 1911. Public domain in the US
 * (pre-1929) and worldwide (Burnett died 1924; 70y pma expired).
 * Plot follows the original novel (Misselthwaite Manor, the hidden key, Dickon and
 * the robin, Colin, and Archibald Craven's return); wording simplified into short
 * sentences for children aged 9-12.
 */
export const secretGarden: PackBook = {
  id: 'tale-secretgarden',
  title: 'The Secret Garden',
  author: 'Frances Hodgson Burnett',
  lang: 'en',
  category: 'tale',
  ageStage: '9-12',
  intro: 'Sent to a great grey house on the moor, sour little Mary Lennox hears a story of a garden locked for ten years - and a robin who may show her the door.',
  coverArt: 'secret-garden-cover',
  coverArtPrompt: 'an old ivy-covered stone wall with a small green door half hidden in vines, a robin redbreast perched on the wall, a girl in a dark cloak reaching toward the door, golden rose light behind the wall',
  coverFrom: '#1B5E20',
  coverTo: '#8BC34A',
  source: 'Project Gutenberg eBook #113, public domain (Burnett d. 1924)',
  chapters: [
    {
      title: 'Chapter 1 · Misselthwaite Manor',
      art: 'misselthwaite-moor',
      artPrompt: 'a bleak grey moor under a low grey sky, a carriage and horses on a rough country road, a large gloomy stone manor house with a hundred empty windows in the distance',
      blocks: [
        {
          kind: 'text',
          text: 'When Mary Lennox was sent to Misselthwaite Manor in Yorkshire, everybody said she was the most disagreeable-looking child ever seen. She had a little thin face, thin yellow hair, and a thin cross mouth. She was thin because she was always ill, and she was cross because nobody had ever taught her to be good.',
        },
        {
          kind: 'image',
          art: 'carriage-on-moors',
          text: 'The carriage carries Mary across the wide grey Yorkshire moor.',
        },
        {
          kind: 'text',
          text: 'In India, where she was born, her father had always been busy and ill, and her mother had always been busy and beautiful, and the servants had always let Mary do exactly as she pleased. "Poor little thin thing," they said. "Nobody wants her."',
        },
        {
          kind: 'note',
          text: 'New word: disagreeable — not at all pleasant to look at or to be with.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Mrs. Medlock, the housekeeper, took charge of Mary on the long journey. "Your uncle, Mr. Craven, will not trouble himself about you," she said. "He never troubles himself about no one. He is a hunchback, and a sour man, and he has shut himself up in the house for ten years."',
        },
        {
          kind: 'text',
          text: 'They drove through the dark, and the wind howled across the moor like a wild animal. At last the carriage stopped before a great house with a hundred rooms, nearly all of them empty and dark. "Here you are," said Mrs. Medlock, "and I hope you will like it - though I doubt you will."',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Hidden Key',
      art: 'garden-ivy-door',
      artPrompt: 'a high old stone wall thick with ivy and bare rose canes, a girl in a blue coat standing on tiptoe reaching up into the ivy, a rusty old key glinting in her hand, pale winter sunshine',
      blocks: [
        {
          kind: 'text',
          text: 'Mary had nothing to do at Misselthwaite, so she went out into the gardens every day. The walled gardens were large and grey, with old fruit trees and bare rose bushes, and one wall stretched so far that Mary could not see the end of it.',
        },
        {
          kind: 'image',
          art: 'ivy-hidden-door',
          text: 'Mary pushes aside the ivy and finds a door buried in the green.',
        },
        {
          kind: 'text',
          text: 'The old gardener, Ben Weatherstaff, told her about the robin redbreast who lived in the garden. "He knows me," said Ben, gruffly. "He knows everybody that\'s friendly. There\'s more to that bird than most folk give him credit for."',
        },
        {
          kind: 'note',
          text: 'New word: gruffly — in a rough, grumbly, cross sort of voice, that often hides a kind heart.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'One day the robin hopped on to a little pile of freshly turned earth. Mary ran to see what he was doing, and there, half buried in the soil, she saw something rusted and old. She pulled it out. It was a key!',
        },
        {
          kind: 'text',
          text: 'Mary\'s heart beat fast. She was sure this was the key to the secret garden - the garden Mr. Craven had locked the day his wife died, and thrown the key away. The robin sat on a branch and sang, as if to say, "This way! This way!"',
        },
      ],
    },
    {
      title: 'Chapter 3 · Dickon and the Robin',
      art: 'moor-boy-dickon',
      artPrompt: 'a sturdy moorland boy with bright blue eyes and rusty clothes sitting on the grass with a robin perched on his knee, a bow and arrows and a tame fox cub beside him, a girl in a blue coat watching in wonder',
      blocks: [
        {
          kind: 'text',
          text: 'Mary wanted someone to talk to, and she wanted to know how to make things grow. Martha, the young chambermaid, told her about her brother Dickon, who was twelve years old and knew every plant and bird and animal on the moor.',
        },
        {
          kind: 'image',
          art: 'dickon-robin',
          text: 'Dickon sits on the grass with the robin on his knee, and Mary watches.',
        },
        {
          kind: 'text',
          text: 'One morning Mary saw a boy walking up the long drive with a bundle on his shoulder. He had bright blue eyes and a rosy face, and two fox cubs and a tame rook followed at his heels. "Are you Dickon?" asked Mary. "Aye, that\'s me," he said, with a broad grin.',
        },
        {
          kind: 'note',
          text: 'New word: moor — wide, wild, open country covered with grass and heather and few trees. Mary has never seen one before.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Mary took Dickon to the wall where she had found the key, and the robin flew before them. "I have found the key," she whispered, "and the door is somewhere here under the ivy. Will you help me?" Dickon\'s eyes shone. "That I will," he said.',
        },
        {
          kind: 'text',
          text: 'Together they felt along the ivy, and presently Dickon\'s fingers touched a latch. The ivy curtain swung back, and there was a small green door. Mary put the key in the lock, turned it, and pushed. The door swung open, and they stepped inside the secret garden.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Garden Comes Alive',
      art: 'awakening-garden',
      artPrompt: 'a walled garden in early spring, green shoots and snowdrops and purple crocuses pushing up through dead leaves, a boy and a girl on their knees working in the soil, rose canes leafing out above them, soft sunlight',
      blocks: [
        {
          kind: 'text',
          text: 'Inside the wall it was the strangest, quietest place in the world. The rose bushes were all bare and grey, but here and there little green shoots were pushing up through the dead leaves. "It\'s not dead," said Dickon. "It\'s only gone to sleep. We can wake it up."',
        },
        {
          kind: 'image',
          art: 'garden-coming-alive',
          text: 'The first green shoots of spring push up through the dead leaves.',
        },
        {
          kind: 'text',
          text: 'Dickon showed Mary how to weed and rake and loosen the earth around the tiny plants, and how to tell a real plant from a weed. Mary had never used her hands before, and she was clumsy at first, but she worked until her back ached and her cheeks were red.',
        },
        {
          kind: 'note',
          text: 'Question for you: Why do you think working in the garden makes Mary feel happier? What is changing inside her, as well as outside?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Every day Mary was up with the sun. She grew stronger and hungrier and brighter, and she laughed sometimes without knowing it. Ben Weatherstaff watched her over the wall. "The fresh air has got into her," he grunted. "She\'s a different child from the skinny little tyrant that came here."',
        },
        {
          kind: 'text',
          text: 'As the days grew warmer, the garden woke up. Snowdrops and crocuses came up first, then daffodils, and at last the rose bushes put out tiny red leaf-buds. "There will be hundreds of roses," said Dickon, "if we keep the slugs away and give the roots air."',
        },
      ],
    },
    {
      title: 'Chapter 5 · The Boy in the House',
      art: 'colin-sickroom',
      artPrompt: 'a rich dark nursery room with closed curtains, a thin pale boy with big dark eyes lying propped on pillows in a grand bed, a girl in a blue dress standing at the foot of the bed looking astonished',
      blocks: [
        {
          kind: 'text',
          text: 'One night Mary heard a faint crying sound coming through the long corridors. She followed it, and at the end of a passage she came upon a room with a light under the door. Inside, a thin, pale boy lay in a great bed, his big dark eyes full of tears.',
        },
        {
          kind: 'image',
          art: 'colin-dark-room',
          text: 'Colin, in his grand bed, with the curtains drawn against the daylight.',
        },
        {
          kind: 'text',
          text: '"Who are you?" whispered the boy. "Are you a ghost?" "No, I am Mary Lennox," she said. "Mr. Craven is my uncle." The boy sat up. "Then you are my cousin!" he cried. "I am Colin. Nobody ever tells me anything. They think I am going to die, and they are all afraid of me."',
        },
        {
          kind: 'note',
          text: 'New word: tantrum — a great storm of crying and shouting and anger, often from someone who is frightened rather than naughty.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Colin had been in that room for ten years. His father could not bear to look at him, because Colin\'s mother had died the very day he was born, and Colin himself was afraid of nothing so much as fresh air and being left alone.',
        },
        {
          kind: 'text',
          text: 'Mary told Colin about the moor, and the robin, and the garden she was bringing back to life - and at last, after much begging, she told him about the secret garden. "If I could go out there," said Colin, "perhaps I should get well. I will go. I will!"',
        },
      ],
    },
    {
      title: 'Chapter 6 · The Door Opens',
      art: 'garden-door-reunion',
      artPrompt: 'an ivy-hidden door standing open in a stone wall, a frail boy wrapped in a blanket in a wheeled chair pushed by a boy and a girl, a robin singing above, roses in full bloom behind the wall, a man in black standing frozen with wonder in the doorway',
      blocks: [
        {
          kind: 'text',
          text: 'Dickon pushed Colin\'s wheeled chair across the park in the early morning, while Mary walked beside them. When they reached the green door, Mary drew back the ivy. "Here it is," she said softly. "Push me in!" said Colin, and the chair rolled over the threshold.',
        },
        {
          kind: 'image',
          art: 'garden-door-open',
          text: 'The door swings wide, and Colin sees the garden for the first time.',
        },
        {
          kind: 'text',
          text: 'Colin looked about him. The garden was a wonder of green leaves and pink and white roses, and the birds were singing, and the sun lay warm on the grass. "I shall get well!" he said, in a voice that shook. "I shall live forever and ever and ever!"',
        },
        {
          kind: 'note',
          text: 'New word: threshold — the stone or wooden strip you step across when you go through a doorway.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'That spring Colin learned to stand, and then to walk, holding Dickon\'s arm. He dug in the earth with his own thin hands, and the strength came into his legs, and the colour into his face. Ben Weatherstaff looked over the wall and took off his cap. "You\'re a credit to the garden," he said, and blew his nose.',
        },
        {
          kind: 'text',
          text: 'Mr. Craven had been wandering far away for ten years, but one night he dreamed of his lost wife, who smiled and called him home. He came back to Misselthwaite at once, and walked out through the park to the garden wall. The door stood open. A boy ran across the grass to meet him - tall and straight and strong. "Father!" he cried. "I am Colin. I am well!" And Archibald Craven took his son in his arms.',
        },
      ],
    },
    {
      title: 'Chapter 7 · The Magic',
      art: 'magic-rose-tree',
      artPrompt: 'a rose tree in full pink bloom in a walled garden, a thin boy standing upright beneath it with his arms flung wide and his eyes shut, a moor boy and a girl standing close with clasped hands, a fox and a lamb and a squirrel sitting still on the grass, a robin singing on a branch, warm morning light',
      blocks: [
        {
          kind: 'text',
          text: 'Colin had a new science now. "We shall make an experiment," he said. "I am the first boy who ever tried it. We shall call it Magic." So every morning, while the garden was still full of birds, the three children came in at the green door, and Colin stood up on his own two feet beneath the rose tree.',
        },
        {
          kind: 'image',
          art: 'colin-magic-chant',
          text: 'Colin chants under the rose tree: "The Magic is in me!"',
        },
        {
          kind: 'note',
          text: 'New word: chant — to say the same words over and over, soft and slow, like a little song.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Dickon sang first, in his moor voice, and the fox and the lamb and the squirrel came and sat quite still to listen. Then Colin threw back his head and chanted: "The Magic is in me! The Magic is making me strong! The sun is shining, and the Magic is in the garden, and in Dickon, and in Mary, and in me!" They said it again and again, till Colin burst out laughing - and laughter, they found, was the best medicine of all.',
        },
        {
          kind: 'text',
          text: 'After that, Colin walked a little farther every day, and dug in the earth with his own hands, and ate like a farmer, and his big eyes grew bright as stars. "We are all Magic together," said Mary. And the garden seemed to hear them, for it put out new roses every single week.',
        },
      ],
    },
    {
      title: 'Chapter 8 · Mrs. Sowerby',
      art: 'sowerby-garden-basket',
      artPrompt: 'a sturdy rosy-cheeked countrywoman in a sunbonnet with a covered basket on her arm and a lamb frisking at her heels, standing among roses in a walled garden, a tall boy and two children gathered round her, warm bread and a jug of new milk in her hands, golden afternoon light',
      blocks: [
        {
          kind: 'text',
          text: 'One golden afternoon, a sturdy woman came across the moor to the secret garden, with a covered basket on her arm and a lamb frisking at her heels. It was Mrs. Sowerby, Dickon\'s mother, who had a houseful of children and never much money, but a heart as warm as an oven.',
        },
        {
          kind: 'image',
          art: 'milk-and-buns',
          text: 'Fresh milk and warm buns, and a story of Colin\'s mother.',
        },
        {
          kind: 'note',
          text: 'New word: bun — in Yorkshire, a little round loaf of sweet bread, best when it is still warm from the oven.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'She brought new milk and warm buns, and the children ate in the sunshine till the basket was empty. Colin looked up into her kind brown face. "Thou art the young master," she said softly, "and thou hast thy mother\'s eyes. I knew her well." And she told him how his mother had loved this very garden, and had tended these very roses, in the years before the door was locked.',
        },
        {
          kind: 'text',
          text: 'Colin\'s eyes filled with tears, and then with light. "Where you tend a rose, my lad," said Mrs. Sowerby, "a thistle cannot grow." And he understood at last. He stood up straight among the roses, the young master of Misselthwaite, tall and glad, and the robins sang round him - for the garden had given him his life, as it had given his mother hers.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Secret Garden',
    author: 'Frances Hodgson Burnett',
    authorDeathYear: 1924,
    jurisdiction: 'US',
    basis: 'pd-us',
    sourceUrl: 'https://www.gutenberg.org/ebooks/113',
    note: 'Retold in simple English; plot follows the public-domain original.',
  },
}
