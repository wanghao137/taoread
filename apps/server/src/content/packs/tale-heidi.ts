import type { PackBook } from '../types'

/**
 * Heidi — four chapters retold for young English readers.
 * Text: Project Gutenberg eBook #144 (Johanna Spyri, "Heidis Lehr- und Wanderjahre",
 * English translation by Helen B. Dole, 1884 English edition). Public domain worldwide
 * (Spyri died 1901; 70y pma expired). Plot follows the original story; wording
 * simplified into short sentences for children aged 6–8.
 */
export const heidi: PackBook = {
  id: 'heidi',
  title: 'Heidi',
  author: 'Johanna Spyri',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'A little Swiss girl goes to live with her strange grandfather high on the mountain, and brings sunshine with her wherever she goes.',
  coverArt: 'alp-hut',
  coverArtPrompt: 'a little girl in a red dress and straw hat standing in a green alpine meadow full of wildflowers, a small wooden hut and tall fir trees behind her, snowy mountain peaks and blue sky above',
  coverFrom: '#5E35B1',
  coverTo: '#B39DDB',
  source: 'Project Gutenberg eBook #144, public domain (Spyri d. 1901)',
  chapters: [
    {
      title: 'Chapter 1 · Up the Mountain to Grandfather',
      art: 'alpine-path',
      artPrompt: 'a little girl in a red dress climbing a steep green mountain path, dark fir trees and snowy peaks above, a wooden hut at the top with an old bearded man outside',
      blocks: [
        {
          kind: 'text',
          text: 'On a bright June morning, Aunt Deta led a little girl up the steep path that wound up the side of the mountain. The girl was Heidi, and she was five years old. She wore a thick red dress, and she had been brought from her old home to be left with her grandfather.',
        },
        {
          kind: 'image',
          art: 'alpine-path',
          text: 'The steep path that led up to the grandfather’s hut.',
        },
        {
          kind: 'text',
          text: 'Higher and higher they climbed. The mountain grew greener, and the fir trees stood up tall and dark against the blue sky. Heidi looked at everything with wide eyes, and she was not a bit tired.',
        },
        {
          kind: 'note',
          text: 'New word: hut — a small, simple house, often made of wood.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'At the very top of the slope stood a little wooden hut, and beside it an old man with a gray beard sat on a bench. The people of the village below said he was strange and cross, and that no one could live with him.',
        },
        {
          kind: 'text',
          text: 'Aunt Deta left Heidi with the old man and hurried away. The grandfather looked at the child for a long time in silence. "What is your name?" he said at last. "Heidi," said the little girl. "I have come to stay with you." The grandfather made a bed of straw, and from that day Heidi had a home on the mountain.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Mountain Pasture',
      art: 'goat-pasture',
      artPrompt: 'a girl in a red dress skipping across a green alpine pasture dotted with yellow and blue flowers, a boy with a flock of white and brown goats, golden sunset on the peaks',
      blocks: [
        {
          kind: 'text',
          text: 'Very early the next morning, Heidi heard a loud whistle. It was Peter, the goat-boy, who came up the mountain every day with his flock. He had many goats — Greenfinch, Little Swan, Little Bear, and the others.',
        },
        {
          kind: 'image',
          art: 'goat-pasture',
          text: 'Peter the goat-boy with his goats on the green pasture.',
        },
        {
          kind: 'text',
          text: 'Heidi was to go with Peter to the high pasture. Grandfather packed her lunch — bread and a big slice of cheese — and filled a little cup with milk, fresh and warm from the goats.',
        },
        {
          kind: 'note',
          text: 'New word: pasture — a green mountain field where animals come to eat the grass.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Up and up they climbed, and Heidi skipped like a young goat, for she was never afraid of anything. At the top, the green slope was covered with little yellow and blue flowers, and the wind was sweet and warm.',
        },
        {
          kind: 'text',
          text: 'When the sun began to go down, the mountainsides turned red and golden. Heidi thought a great fire must be burning on the peaks. "Look, Peter!" she cried. "The mountains are all on fire!" But it was only the last light of the sun, and Heidi watched it until the colors faded away.',
        },
      ],
    },
    {
      title: 'Chapter 3 · Grandfather’s Hut',
      art: 'hay-loft',
      artPrompt: 'a girl asleep on a bed of golden hay under a round attic window, stars and fir branches visible outside, a wooden sleigh leaning against the hut below',
      blocks: [
        {
          kind: 'text',
          text: 'Heidi slept in the loft of the hut, on a bed of sweet dry hay. Through the little round window she could see the sky and the stars, and she could hear the fir trees whispering in the wind. She was the happiest child in all the world.',
        },
        {
          kind: 'image',
          art: 'hay-loft',
          text: 'Heidi’s little bed of hay under the round window.',
        },
        {
          kind: 'note',
          text: 'New word: hay — grass that has been cut and dried, to feed animals or to sleep on.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'When the first snow came, Peter could no longer bring his goats so high. Grandfather made a little wooden sleigh, covered it with a warm blanket, and took Heidi down the mountain to visit Peter’s grandmother.',
        },
        {
          kind: 'text',
          text: 'The old grandmother was nearly blind and could not work. Heidi sat beside her and told her all about the mountains, the goats, and the red sunsets. "You bring the sunshine into my dark room," said the grandmother.',
        },
        {
          kind: 'text',
          text: 'Heidi wanted to read to the grandmother, so grandfather gave her a beautiful book with pictures of shepherds and sheep on the hills. She practiced her letters every evening, until she could read the songs aloud by herself.',
        },
      ],
    },
    {
      title: 'Chapter 4 · Frankfurt',
      art: 'frankfurt-house',
      artPrompt: 'a great gray stone house with rows of tall windows on a city street, a girl in a stiff white dress looking out of an upstairs window toward distant mountains',
      blocks: [
        {
          kind: 'text',
          text: 'One autumn day, Aunt Deta came back to the mountain. "Heidi must go to Frankfurt," she said. "There is a rich lady who wants a companion for her daughter Clara, who cannot walk and sits all day in a wheelchair. Heidi will learn fine things, and wear good clothes."',
        },
        {
          kind: 'image',
          art: 'frankfurt-house',
          text: 'The great stone house in Frankfurt, with its rows of windows.',
        },
        {
          kind: 'note',
          text: 'New word: wheelchair — a chair with wheels, for someone who cannot walk.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'In Frankfurt, Heidi wore a stiff white dress and learned to sit still at table. Clara was gentle and kind, and the two girls soon loved each other. But Heidi missed her mountains. She could not see a single tree from the tall windows, and she grew quiet and sad.',
        },
        {
          kind: 'text',
          text: 'The kind grandmamma came to visit. She read Heidi stories and taught her to pray for what she needed. But Heidi’s heart still ached for the fir trees and the green pasture above the clouds.',
        },
        {
          kind: 'image',
          art: 'alpine-path',
          text: 'Heidi riding home through the snow, with her basket of white bread rolls.',
        },
        {
          kind: 'text',
          text: 'At last Heidi grew so homesick that she walked in her sleep, and the doctor said she must go home at once. She carried a basket of soft white bread rolls — for the grandmother up the mountain, whose teeth could no longer chew hard bread. Heidi kissed Clara good-bye and rode home through the snow, her heart singing.',
        },
      ],
    },
    {
      title: 'Chapter 5 · Home on the Mountain',
      art: 'heidi-hug',
      artPrompt: 'an old man with a grey beard lifting a little girl in a red dress high into the air outside a wooden hut, fir trees and snowy peaks behind, bright happy winter morning',
      blocks: [
        {
          kind: 'text',
          text: 'Up and up the mountain went the sleigh, through the snow, until at the top stood the little hut, with the fir trees roaring in the wind. And there was grandfather, waiting and watching. "Grandfather! Grandfather!" cried Heidi. "I am home, and I am never going away again!"',
        },
        {
          kind: 'image',
          art: 'heidi-hug',
          text: 'The grandfather holding Heidi close, at last together again.',
        },
        {
          kind: 'text',
          text: 'The old man caught her in his arms and held her tight, and for a long time neither of them could say one single word. There were tears in the grandfather’s eyes, and Heidi hugged him till her arms ached. Never again, he promised himself, would they be parted.',
        },
        {
          kind: 'note',
          text: 'New word: homesick — feeling so sad for home that your heart aches. Heidi was homesick in Frankfurt; now she was homesick no more.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Then Heidi remembered her basket. Down she ran to Peter’s house, and put the soft white bread rolls into the grandmother’s hands. "Fresh, soft bread!" said the grandmother, feeling it with her blind old fingers. "And Heidi has come home!" The little room was dark, but it seemed full of sunshine.',
        },
        {
          kind: 'text',
          text: 'The next morning Heidi put on her old red dress, and ran out with Peter and the goats to the green pasture. Grandfather had his little granddaughter back, and he said that mountain air and a happy heart were the best medicine in all the world.',
        },
      ],
    },
    {
      title: 'Chapter 6 · Clara Comes to the Mountain',
      art: 'clara-visit',
      artPrompt: 'a weak girl in a fine dress being carried up a green mountain path by a strong man, a wheelchair left below, a little girl in a red dress dancing ahead among wildflowers, fir trees and snowy peaks',
      blocks: [
        {
          kind: 'text',
          text: 'Summer came, and friends came with it. Clara and her grandmamma travelled all the way from Frankfurt, and strong men carried Clara up the steep green path, because her wheelchair could not climb so high. Heidi ran down to meet them, singing at the top of her voice.',
        },
        {
          kind: 'image',
          art: 'clara-visit',
          text: 'Clara being carried up the mountain, with Heidi dancing ahead among the flowers.',
        },
        {
          kind: 'text',
          text: 'Heidi led Clara at once to her own room, where the round window was full of mountains and the bed was made of hay. Clara lay down in it and laughed. "It smells of flowers," she said. "I have never slept anywhere so nice."',
        },
        {
          kind: 'note',
          text: 'New word: journey — a long trip from one place to another. Clara’s journey took a whole day, and it was worth every step.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The next day Heidi read to Peter’s grandmother, and Clara listened too. Then the two girls sat in the sun and watched the goats, and Peter brought them bowls of sweet warm milk. "The mountain is the most beautiful place in the world," said Clara.',
        },
        {
          kind: 'text',
          text: 'Every day Clara grew stronger in the clean mountain air. She ate with a good appetite, she laughed all day long, and she sat by the little fir trees listening to the wind — and waiting for something wonderful to happen.',
        },
      ],
    },
    {
      title: 'Chapter 7 · Clara Walks',
      art: 'clara-walks',
      artPrompt: 'a girl in a fine dress taking her very first steps on a flower meadow high in the alps, holding the arm of a girl in a red dress, a boy and goats watching with open mouths, blue gentian flowers, bright sunlight on snowy peaks',
      blocks: [
        {
          kind: 'text',
          text: 'One morning Clara wanted to see the flowers on the far slope. But how could a girl in a wheelchair roll over the rough meadow? While Heidi was picking her a bunch of blue flowers, Peter did a very naughty thing: he pushed the empty wheelchair away — and it rolled down the mountain, far out of sight.',
        },
        {
          kind: 'image',
          art: 'clara-walks',
          text: 'Clara taking her very first steps among the flowers, with Heidi holding her arm.',
        },
        {
          kind: 'text',
          text: 'Clara did not cry. "Now I shall have to try," she said. Heidi knelt beside her and said, "Take hold of my arm, just for a moment. The ground is so nice and firm." And Clara stood up — one second, then two — on her own two feet, for the first time in her whole life!',
        },
        {
          kind: 'note',
          text: 'New word: firm — hard and steady, so that you will not sink or fall. The mountain ground was firm under Clara’s feet.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"Hold me, Heidi! Hold me!" cried Clara. And step by step, holding Heidi’s arm, she walked round the little flower field. Three steps. Then five. Then more. Peter stood with his mouth wide open, and the goats stopped eating to stare at her.',
        },
        {
          kind: 'text',
          text: 'Every day after that, Clara walked a little farther, and her thin legs grew strong in the mountain air. "The mountains have made me well," said Clara, "and my best friend in all the world lives on them."',
        },
      ],
    },
    {
      title: 'Chapter 8 · Good News from Frankfurt',
      art: 'heidi-reading',
      artPrompt: 'an old blind grandmother sitting by the fire in a cozy dark cottage, a little girl in a red dress reading aloud from a small book to her, warm firelight, a boy and a goat visible through the open door',
      blocks: [
        {
          kind: 'text',
          text: 'When Clara went home to Frankfurt, she walked into her house on her own two legs. Everyone ran to see, and her father travelled up the mountain to thank grandfather. He shook the old man’s hand again and again. "You have given me back my daughter," he said.',
        },
        {
          kind: 'image',
          art: 'heidi-reading',
          text: 'Heidi reading her little book of songs aloud to the grandmother by the fire.',
        },
        {
          kind: 'note',
          text: 'New word: promise — when you say you will truly do a thing, and then you do it. The grandmamma kept her promise every year.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The kind grandmamma promised to take care of Peter’s mother and grandmother, so that they would never be cold or hungry again. And Heidi knew she would read her little book of songs to the grandmother all winter long, just as she had promised.',
        },
        {
          kind: 'text',
          text: 'So everything was happy at last. Clara could walk; Peter was going to learn his letters too; and grandfather’s heart was light, because his granddaughter was home to stay. When the first snow fell, Heidi sat by the fire at Peter’s house and read to the grandmother until the old woman fell asleep, smiling.',
        },
        {
          kind: 'text',
          text: 'And on fine summer days, Heidi ran up the green pasture with the goats, and the fir trees sang in the wind, and the sunset made the snow shine gold. Up on her mountain Heidi stayed — the happiest child in all the world.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Heidi',
    author: 'Johanna Spyri',
    authorDeathYear: 1901,
    translator: 'Helen B. Dole (English translation, 1884)',
    jurisdiction: 'EU',
    basis: 'pd-70',
    sourceUrl: 'https://www.gutenberg.org/ebooks/144',
    note: 'Published 1881 in German; public domain worldwide (Spyri d. 1901, 70y pma expired). English text from Project Gutenberg eBook #144; wording simplified into short sentences for young English readers.',
  },
}
