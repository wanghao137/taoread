import type { PackBook } from '../types'

/**
 * Rinkitink in Oz (L. Frank Baum, 1916) — five chapters retold in simple
 * English for readers aged 6–8. Public domain in the US (published before
 * 1929) and worldwide (Baum died in 1919). Plot and characters (Prince Inga,
 * King Kitticut, Queen Garee, the three pearls, King Rinkitink, Bilbil the
 * goat, the warriors of Regos and Coregos, Kaliko, Ozma) follow the original
 * book; only the wording is shortened and simplified.
 */
export const ozRinkitink: PackBook = {
  id: 'oz-rinkitink',
  title: 'Rinkitink in Oz',
  author: 'L. Frank Baum',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'Warriors raid the quiet island of Pingaree and carry its people away. Little Prince Inga finds the three magic pearls his father once hid, and sets out to save them, with a jolly fat king and a grumpy goat for company.',
  coverArt: 'rinkitink-island',
  coverArtPrompt: 'a small green island with a white stone palace among palm trees surrounded by a bright blue sea, a small boy prince on the shore looking toward three distant ships on the horizon, soft golden morning light, gentle storybook illustration',
  coverFrom: '#1565C0',
  coverTo: '#B3E5FC',
  source: 'Rinkitink in Oz (L. Frank Baum, 1916), public domain (Baum d. 1919)',
  chapters: [
    {
      title: 'Chapter 1 · The Raid on Pingaree',
      art: 'rinkitink-raid',
      artPrompt: 'a peaceful green island with a white marble palace and palm trees, big dark ships with fierce red sails arriving on one side, islanders running toward the hills, bright morning light with long shadows, storybook illustration, not frightening',
      blocks: [
        { kind: 'text', text: 'Pingaree was a small green island in a big blue sea. King Kitticut and Queen Garee lived there with their son, Prince Inga. The people were kind, and nobody had ever fought a war.' },
        { kind: 'text', text: 'One morning, ships full of fierce warriors came from the islands of Regos and Coregos. They took the marble palace and carried the people away to be slaves.' },
        { kind: 'image', art: 'rinkitink-ships', text: 'Warrior ships come to the quiet shore of Pingaree.' },
        { kind: 'text', text: 'Little Inga hid in a hollow tree, just as his father had once shown him. When the ships were gone, he came out alone. The island was very quiet.' },
        { kind: 'note', text: 'Ask your child: what would you look for first, if you were alone in a quiet house? Inga looks for three small pearls. Talk about why he does not lose hope.', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 2 · The Three Pearls',
      art: 'rinkitink-pearls',
      artPrompt: 'a small boy prince kneeling under an old tree, three glowing pearls of blue, pink and white shining in his open hands, soft green leaves and warm light falling through the branches, gentle magical storybook art',
      blocks: [
        { kind: 'text', text: 'Inga remembered his father\'s secret. Three magic pearls lay hidden in the old tree. He felt in the hollow — and there they were.' },
        { kind: 'text', text: 'The blue pearl gave strength. The pink pearl kept its owner from harm. The white pearl gave wise words to speak.' },
        { kind: 'image', art: 'rinkitink-hollow', text: 'The three pearls glow in the hollow of the old tree.' },
        { kind: 'text', text: 'Inga put the blue pearl in one shoe, the pink one in the other, and the white one inside his cap. "Father and Mother are slaves on Regos," he said. "I shall go and find them."' },
        { kind: 'note', text: 'New word: slave — a person made to work without freedom. Inga is small, but the pearls are like courage, care, and kind words — good helpers to carry anywhere.', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 3 · A King and a Goat',
      art: 'rinkitink-goat',
      artPrompt: 'a jolly fat king in a shabby bright coat sitting on the sand of a quiet beach talking to a small grey goat, a little boy prince with a small boat behind them, sparkling blue sea and warm sunshine, funny gentle storybook illustration',
      blocks: [
        { kind: 'text', text: 'While Inga looked at the empty sea, a little boat sailed in. In it sat a very fat, very merry king in a shabby coat. This was King Rinkitink of the Land of Rinkitink.' },
        { kind: 'text', text: 'Beside him stood Bilbil, a grey goat with a very grumpy face. Rinkitink had sailed away from his own kingdom, because he was tired of being serious all day.' },
        { kind: 'text', text: '"Come with me to Regos," said Inga. "My father and mother are prisoners there." The fat king and the grumpy goat looked at the little prince, and agreed at once.' },
        { kind: 'image', art: 'rinkitink-sail', text: 'The little boat sails away toward the rocky island of Regos.' },
        { kind: 'note', text: 'Ask your child: Rinkitink likes to laugh, and Bilbil likes to complain. Can a grumpy friend and a merry friend still be good friends? Talk about how they help Inga.', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 4 · King Gos and Queen Cor',
      art: 'rinkitink-regos',
      artPrompt: 'a little boy prince calmly uprooting a giant stone statue on a rocky island shore while fierce warriors step back amazed, a fat king and a grey goat watching, a marble palace on a cliff behind, bright dramatic daylight, heroic storybook art',
      blocks: [
        { kind: 'text', text: 'King Gos of Regos laughed when he saw a small boy arrive. But with the blue pearl, Inga lifted a great stone and a whole big tree, as easily as picking flowers.' },
        { kind: 'text', text: 'The warriors dropped their swords and ran. Inga walked straight to the prison and set the Pingaree slaves free.' },
        { kind: 'image', art: 'rinkitink-rescue', text: 'Inga frees the prisoners of the rocky island.' },
        { kind: 'text', text: 'Across the water on Coregos, Queen Cor was just as unkind. But nothing could hurt Inga while he wore the pink pearl. Soon he found King Kitticut and Queen Garee among the slaves.' },
        { kind: 'text', text: 'There were warm hugs all round, and King Rinkitink told jokes until everyone laughed. Gos and Cor sailed away in their ship, very quiet and very ashamed.' },
        { kind: 'note', text: 'The pearls stand for strength, safety and wise words. Ask your child: which of the three helps people most in your family? There is no single right answer.', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 5 · Ozma of Oz Comes to Help',
      art: 'rinkitink-ozma',
      artPrompt: 'a kind fairy princess with a small crown standing on a green island shore with a girl in a blue dress and a gentle old wizard, a little boy prince and his family welcoming them, a grey goat nearby, glowing warm evening light, joyful storybook illustration',
      blocks: [
        { kind: 'text', text: 'The two bad rulers ran to the Nome King under the earth. Kaliko, the new Nome King, was kind now, and he did not let them stay. Their ship sailed away and was never seen again.' },
        { kind: 'text', text: 'Then Princess Ozma of Oz came with Dorothy and the Wizard. Ozma\'s magic showed a secret: Bilbil the goat was really a prince, changed long ago by a spell.' },
        { kind: 'image', art: 'rinkitink-bobo', text: 'Ozma\'s magic gives Bilbil his own shape again.' },
        { kind: 'text', text: 'Ozma said the magic words, and Bilbil became Prince Bobo once more. The friends sailed home to Pingaree and built the white palace up again, brighter than before.' },
        { kind: 'text', text: 'Rinkitink stayed a long while to visit, telling jokes every single day. And Inga, the small prince with three small pearls, was happiest of all with his family safe at home.' },
        { kind: 'note', text: 'Ask your child: Inga never fought anyone on the island — the pearls did the work. What could the blue pearl, the pink pearl and the white pearl mean in real life?', art: 'lamp-hint' },
      ],
    },
  ],
  rights: {
    workTitle: 'Rinkitink in Oz',
    author: 'L. Frank Baum',
    authorDeathYear: 1919,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Retold for children; plot follows the public-domain original. Published 1916; US public domain.',
  },
}
