import type { PackBook } from '../types'

/**
 * The Wonderful Adventures of Nils — Selma Lagerlöf (1858–1940), first
 * published 1906. Retold for young readers in six chapters: the tomte's
 * lesson, the flight on Morten the goose, the tricks of fox Smirre, the
 * friendship of eagle Gorgo, the rescue of Morten from the farmyard, and
 * Nils's kind homecoming. Peril is softened to clever escapes.
 * Source: The Wonderful Adventures of Nils (Selma Lagerlöf, 1906),
 * public domain (Lagerlöf d. 1940; EU pma expired 2011).
 */
export const nils: PackBook = {
  id: 'lagerlof-nils',
  title: 'The Wonderful Adventures of Nils',
  author: 'Selma Lagerlöf',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro:
    'Nils Holgersson is a lazy boy who teases the animals on his father’s farm — until a little tomte shrinks him to thumb-size. Carried off on the back of Morten the farm goose, Nils flies across Sweden with the wild geese, learns kindness the hard way, and wins his journey home.',
  coverArt: 'nils-goose',
  coverArtPrompt:
    'A thumb-sized boy in a rustic tunic and pointed cap clings joyfully to the neck of a big white farm goose flying over glittering Scandinavian lakes and pine forests at dawn, a wedge of wild geese stretching ahead in the rosy sky, blue mountains on the horizon. Cool pink-and-blue morning light, sweeping adventure mood, classic storybook illustration.',
  coverFrom: '#66BB6A',
  coverTo: '#E1F5FE',
  source: 'The Wonderful Adventures of Nils (Selma Lagerlöf, 1906), public domain',
  chapters: [
    {
      title: 'Chapter 1 · The Little Tomte',
      art: 'nils-tomte',
      artPrompt:
        'A rustic Swedish farmhouse room at dusk: a thumb-sized boy reaches up at a tiny gnome-like tomte in a red cap who stands on the window sill looking stern but kind, magical sparkles of light rising from the tomte’s open palm; a sleepy farm boy’s bed and spinning wheel in shadow behind. Warm lamplight against blue evening, folk-tale storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'On a farm in southern Sweden lived a boy named Nils, who was clever at teasing but not at helping. He pulled the cat’s tail and chased the geese, and never said thank you.',
        },
        {
          kind: 'text',
          text: 'One Sunday, alone in the house, Nils caught a little tomte — a folk of the old stories, no bigger than a doll.',
        },
        {
          kind: 'text',
          text: '"Let me go," said the tomte, "and I will give you a gift." But Nils only laughed — and the tomte snapped his fingers, and everything grew, grew, grew around Nils.',
        },
        {
          kind: 'image',
          art: 'nils-tomte',
          text: 'The tomte teaches Nils a lesson: now the chairs tower like trees.',
        },
        {
          kind: 'note',
          text: 'New word: tomte — a small house-gnome of Swedish stories, stern but fair.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Nils was now no bigger than a thumb. And — most amazing of all — he could understand what the animals said. "Now you shall learn how teasing feels," said the cat, and went back to sleep.',
        },
      ],
    },
    {
      title: 'Chapter 2 · Morten Takes Wing',
      art: 'nils-flight',
      artPrompt:
        'A spring farmyard at first light: a young white farm goose spreads his wings on the top of the low stone wall as a thumb-sized boy scrambles onto his back, while a wedge of wild grey geese sweeps overhead calling; dew on the grass, birches still bare, pale gold sunrise. Upward-tilted hopeful view, soft storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'In the yard, Nils overheard the wild geese calling: "Follow us over the mountains to Lapland!" And the young farm goose Morten cried, "I am coming too!"',
        },
        {
          kind: 'text',
          text: '"You cannot fly, you are only a farm goose," teased the wild geese. But Morten flapped and flapped, and rose into the air.',
        },
        {
          kind: 'text',
          text: '"Wait!" cried Nils, and scrambled up onto the goose’s back, holding tight to his soft neck feathers.',
        },
        {
          kind: 'image',
          art: 'nils-flight',
          text: 'Nils clings to Morten’s neck as the farm drops away below.',
        },
        {
          kind: 'note',
          text: 'Ask your child: Morten was laughed at for being a farm goose. What did he do?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The farm shrank to a toy below — the little cottage, the yard, the whole world of Nils — and ahead lay Sweden, long and bright as a ribbon in the spring sun.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Fox Smirre',
      art: 'nils-fox',
      artPrompt:
        'A lakeshore at moonrise: a sly thin fox pads silently through reeds toward a line of sleeping wild geese, while a thumb-sized boy stands bold on a rock waving to wake them; moonlight silvers the water and every goose head lifts. Deep blue night with silver highlights, suspense but safe, lively storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'The leader of the wild geese was Akka of Kebnekaise, old and wise. She saw the little boy clinging to Morten and said nothing at first.',
        },
        {
          kind: 'text',
          text: 'That night, a fox named Smirre came slinking along the shore toward the sleeping geese. Nils saw him first.',
        },
        {
          kind: 'text',
          text: '"Fly! Fly!" shouted Nils, waking the flock with his tiny voice. The geese rose in a storm of wings, and Smirre’s teeth clicked shut on empty air.',
        },
        {
          kind: 'image',
          art: 'nils-fox',
          text: 'Nils wakes the flock just in time — Smirre gets only air.',
        },
        {
          kind: 'note',
          text: 'New word: flock — a family group of birds that travels together.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Akka looked at the little boy a long time. "The goose may stay," she said at last. "And the boy who saved my flock may fly with us."',
        },
      ],
    },
    {
      title: 'Chapter 4 · Gorgo the Eagle',
      art: 'nils-eagle',
      artPrompt:
        'High above pine-covered mountains: a great golden eagle soars with a thumb-sized boy standing steady on his back between his wings, both gazing at a sea of morning clouds broken by snowy peaks; a line of geese far below. Vast cerulean sky with rose-tinted clouds, exhilarating but calm, sweeping storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'One day a young eagle named Gorgo swooped down and carried Nils away to his nest on a mountain ledge. The geese cried out in fear for their little friend.',
        },
        {
          kind: 'text',
          text: 'But Gorgo was not hunting. "Fly with me," he said, "and see the world from where only eagles go."',
        },
        {
          kind: 'text',
          text: 'So Nils rode the wind above the clouds, over silver lakes and dark green forests, higher than he had ever dreamed.',
        },
        {
          kind: 'image',
          art: 'nils-eagle',
          text: 'Nils rides Gorgo above the morning clouds.',
        },
        {
          kind: 'note',
          text: 'Ask your child: the geese feared the eagle. How did they learn he was a friend?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'When Gorgo carried Nils back to the flock, Akka nodded slowly. "The sky is wide enough for geese and eagles both," she said. And it was.',
        },
      ],
    },
    {
      title: 'Chapter 5 · Morten Is Caught',
      art: 'nils-rescue',
      artPrompt:
        'A Swedish farmyard in late afternoon: a big white goose sits calm in a wicker basket held by a surprised farmwife, while a thumb-sized boy slips unseen along the wall with a stolen pair of scissors glinting, heading for the twine around the basket; the farm cat watches knowingly from the woodpile. Golden harvest light, secret-adventure mood, warm storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'When the flock flew home over Nils’s farm, Morten was caught — the farm folk picked him up like any tame goose, to clip his wings.',
        },
        {
          kind: 'text',
          text: 'Nils’s heart pounded. A thumb-sized boy versus a whole farmyard — but he had learned boldness from the sky.',
        },
        {
          kind: 'text',
          text: 'He slipped through the cat-door, ran under the table, and with a borrowed pair of scissors snipped the twine around Morten’s basket, and steered the goose out the open door.',
        },
        {
          kind: 'image',
          art: 'nils-rescue',
          text: 'Nils, unseen, frees Morten from the basket.',
        },
        {
          kind: 'note',
          text: 'New word: clip — to trim a bird’s wings so it cannot fly away.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Up they rose into the evening sky together. "You saved me," said Morten. "You are the best friend a goose ever had." And Nils felt taller than he had ever felt, even when he was big.',
        },
      ],
    },
    {
      title: 'Chapter 6 · Home Again',
      art: 'nils-home',
      artPrompt:
        'The same rustic farmhouse at golden sunset: the door opens on a normal-sized boy with wind-tousled hair kneeling to greet a surprised farm cat at eye level, while high overhead a wedge of wild geese and a white goose circle and call goodbye; the little tomte watches from the window sill with a small smile. Amber-and-violet evening light, joyful homecoming, tender storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'At last the flock turned south, and the journey ended at the little farm where Nils began.',
        },
        {
          kind: 'text',
          text: 'Nils stood at his own door, small as a thumb but brave as a knight, and thought of the tomte. "I was cruel, and I am sorry," he said to the cat and the geese and the empty air.',
        },
        {
          kind: 'text',
          text: 'And with that word — sorry — the tomte lifted his spell as gently as he had cast it, and Nils grew and grew to his own true size.',
        },
        {
          kind: 'image',
          art: 'nils-home',
          text: 'Nils, big again, greets the cat as the geese call goodbye.',
        },
        {
          kind: 'note',
          text: 'Ask your child: what really lifted the spell — growing big, or growing kind?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Every spring after that, the wild geese flew over the farm and called, and a boy waved back from the yard — and no creature was ever teased there again.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Wonderful Adventures of Nils',
    author: 'Selma Lagerlöf',
    authorDeathYear: 1940,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Retold for young readers. Published 1906; US public domain (pre-1929) and PD in the EU (Lagerlöf d. 1940, 70y pma expired 2011).',
  },
}
