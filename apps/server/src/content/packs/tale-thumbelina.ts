import type { PackBook } from '../types'

/**
 * Thumbelina — retold for children aged 3-5 in five gentle chapters.
 * Source: Project Gutenberg eBook #27100, "Fairy Tales of Hans Christian
 * Andersen" (1835). Andersen died 1875; public domain in the EU and worldwide
 * under the 70-years-after-death rule (pd-70). Retold in short, easy English.
 */
export const thumbelina: PackBook = {
  id: 'andersen-thumbelina',
  title: 'Thumbelina',
  author: 'Hans Christian Andersen',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: 'A tiny girl no bigger than your thumb is born inside a beautiful flower. Her adventure takes her from a pond, to a mouse hole, to a warm land of sunshine and flowers!',
  coverArt: 'thumbelina-flower',
  coverArtPrompt: 'a tiny smiling girl the size of a thumb standing inside the pink petals of a large tulip on a table, a woman watching with wonder, a walnut shell and blue petals nearby',
  coverFrom: '#C2185B',
  coverTo: '#F48FB1',
  source: 'Project Gutenberg eBook #27100, public domain (Andersen d. 1875)',
  chapters: [
    {
      title: 'Chapter 1 · The Girl in the Flower',
      art: 'thumbelina-tulip',
      artPrompt: 'a woman planting a barleycorn in a flower pot, then a big pink tulip opening to show a tiny girl inside, yellow sunshine through a window',
      blocks: [
        {
          kind: 'text',
          text: 'Once there was a woman who wanted a little child more than anything in the world. She went to a wise fairy, who gave her a barleycorn. "Plant it in a pot," she said, "and see what comes."',
        },
        {
          kind: 'image',
          art: 'thumbelina-tulip',
          text: 'The woman plants the barleycorn, and a big tulip grows.',
        },
        {
          kind: 'note',
          text: 'New word: barleycorn — a small seed of barley, the grain that bread is made from.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The woman planted the seed, and in a few days a beautiful tulip grew. Its petals were pink, and it smelled sweet as rose. "What a lovely flower!" she said, and she kissed it — and the flower opened!',
        },
        {
          kind: 'text',
          text: 'Inside sat a tiny, tiny girl, no bigger than a thumb. She had bright eyes and a gentle face. The woman was overjoyed, and made her a bed in a blue petal, with a rose-leaf for a blanket. She called her Thumbelina.',
        },
        {
          kind: 'text',
          text: 'Thumbelina was happy. She drank dew from the leaves and sang songs softer than a whisper. But one night, as she slept in her pretty bed, a big green toad hopped in through the open window!',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Toad and the Lily Leaf',
      art: 'thumbelina-toad',
      artPrompt: 'a big green toad on the edge of a blue pond, a tiny girl sitting on a big green lily leaf in the middle of the water, fish in the water biting through the leaf stem, yellow butterflies above',
      blocks: [
        {
          kind: 'text',
          text: '"She will make a fine wife for my son!" said the toad, and she hopped off with Thumbelina’s bed into the garden. She set the bed on a big green lily leaf in the middle of the pond.',
        },
        {
          kind: 'image',
          art: 'thumbelina-toad',
          text: 'Thumbelina is stuck on a lily leaf in the middle of the pond.',
        },
        {
          kind: 'note',
          text: 'New word: lily — a water flower with big flat green leaves that float on a pond.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'When Thumbelina woke up and saw the cold water all around her, she cried. The toad swam up and said, "Croak, croak — do not cry. My son is very handsome!" But Thumbelina did not want to marry a toad at all.',
        },
        {
          kind: 'text',
          text: 'The little fish in the pond felt sorry for her. They nibbled the stem of the leaf until it snapped, and the leaf floated away down the stream, past pink and white flowers on the bank.',
        },
        {
          kind: 'text',
          text: 'A butterfly flew down, and Thumbelina tied her sash to it. The butterfly pulled the leaf along like a little boat, and Thumbelina smiled as she sailed away to freedom.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Field Mouse and the Mole',
      art: 'thumbelina-mouse',
      artPrompt: 'a warm underground room with a little stove, a brown field mouse in a shawl welcoming a tiny girl, roots hanging from the ceiling, a candle on a wooden table',
      blocks: [
        {
          kind: 'text',
          text: 'Summer passed, and the cold autumn came. Thumbelina had no warm house. One day she found a little hole in a field, and inside it lived a kind old field mouse.',
        },
        {
          kind: 'image',
          art: 'thumbelina-mouse',
          text: 'The field mouse gives Thumbelina a warm home.',
        },
        {
          kind: 'note',
          text: 'New word: underground — under the ground, where mice and moles dig their homes.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"You are welcome to stay with me," said the mouse. "You can help me keep the room tidy, and I will tell you stories." Thumbelina was glad to be warm and safe.',
        },
        {
          kind: 'text',
          text: 'The mouse’s neighbour, a mole, came to visit. He wore a black coat and had a fine long tunnel. "I have a dead swallow in my tunnel," he told her. "It sings no more." Thumbelina listened — and heard a tiny heartbeat. The swallow was only sleeping!',
        },
        {
          kind: 'text',
          text: 'Every day Thumbelina wove a blanket of dry grass and laid it over the swallow, so it would not be cold underground.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Swallow',
      art: 'thumbelina-swallow',
      artPrompt: 'a tiny girl in a green leaf dress standing on a swallow’s back, the swallow flying up out of a dark tunnel towards a blue sky with white clouds',
      blocks: [
        {
          kind: 'text',
          text: 'Spring came, and the swallow woke up. "Thank you, kind little girl," he said. "You kept me warm all winter. Would you like to fly away with me, to the warm country where the sun always shines?"',
        },
        {
          kind: 'image',
          art: 'thumbelina-swallow',
          text: 'The swallow carries Thumbelina up into the sky.',
        },
        {
          kind: 'note',
          text: 'New word: swallow — a small bird with a forked tail that flies far away in winter.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The field mouse was sad to see her go, but she kissed Thumbelina and said, "Have a wonderful journey." Up they flew, higher and higher, over green fields and white clouds and towns with red roofs.',
        },
        {
          kind: 'text',
          text: 'At last they came to a warm country. There were vines heavy with grapes and oranges golden on the trees. In a wood of white flowers, the swallow set Thumbelina down on a soft petal.',
        },
        {
          kind: 'text',
          text: '"This is your new home," said the swallow. And as Thumbelina looked around, a little man no taller than herself came walking out of the flowers, with a golden crown on his head.',
        },
      ],
    },
    {
      title: 'Chapter 5 · The Prince of the Flowers',
      art: 'thumbelina-prince',
      artPrompt: 'a tiny girl with gauzy white wings holding hands with a small flower prince in a golden crown, both standing among giant red and yellow flowers, swallow flying above, blue sky',
      blocks: [
        {
          kind: 'text',
          text: '"Welcome," said the little man. "I am the prince of all the flowers." He bowed low, and asked Thumbelina to stay and be the queen of the flowers.',
        },
        {
          kind: 'image',
          art: 'thumbelina-prince',
          text: 'Thumbelina and the flower prince are crowned among the flowers.',
        },
        {
          kind: 'note',
          text: 'New word: crown — the circle of gold that a prince or a queen wears on the head.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Thumbelina said yes — and every flower in the garden opened to give her a gift. A white flower gave her a pair of gauzy wings, so she could fly from bloom to bloom.',
        },
        {
          kind: 'text',
          text: 'The swallow sang his sweetest song at the wedding, and then he flew back north to tell the field mouse the happy news. The field mouse was glad, and she smiled for the first time all spring.',
        },
        {
          kind: 'text',
          text: 'And Thumbelina, who had been lost and cold and far from home, never had to be frightened again. She lived among the flowers, and sang her soft songs, and was loved by everyone.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Thumbelina',
    author: 'Hans Christian Andersen',
    authorDeathYear: 1875,
    jurisdiction: 'EU',
    basis: 'pd-70',
    sourceUrl: 'https://www.gutenberg.org/ebooks/27100',
    note: 'Retold for young children from the 1835 original.',
  },
}
