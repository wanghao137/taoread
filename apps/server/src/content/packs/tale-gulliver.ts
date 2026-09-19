import type { PackBook } from '../types'

/**
 * Gulliver's Travels (Jonathan Swift, 1726) — five chapters retold in simple
 * English for readers aged 9–12. Only two voyages are kept, both
 * child-appropriate: Lilliput (Part I) and Brobdingnag, the land of giants
 * (Part II). Text: Project Gutenberg eBook #829. Public domain in the US
 * (pre-1929); Swift died in 1745, so the work is also public domain worldwide.
 * Plot and characters follow the original book; the wording is shortened and
 * simplified.
 */
export const gulliverTravels: PackBook = {
  id: 'tale-gulliver',
  title: "Gulliver's Travels",
  author: 'Jonathan Swift',
  lang: 'en',
  category: 'tale',
  ageStage: '9-12',
  intro: 'Ship\'s surgeon Lemuel Gulliver survives a wreck and wakes up tied to the ground by people six inches tall. Later he is shipwrecked again — this time on an island where the cats are the size of elephants and a baby\'s cradle is a boat.',
  coverArt: 'gulliver-travels-cover',
  coverArtPrompt: 'a ship\'s surgeon in eighteenth-century blue coat lying on a green hillside, tiny soldiers with ladders and ropes climbing over his greatcoat, one small flag planted on his chest, a fleet of little wooden boats in a harbour below, astonishing storybook art',
  coverFrom: '#1B4F72',
  coverTo: '#AED6F1',
  source: 'Project Gutenberg eBook #829, public domain (Swift d. 1745)',
  chapters: [
    {
      title: 'Chapter 1 · Tied in Lilliput',
      art: 'gulliver-awakes-tied-lilliput',
      artPrompt: 'a man in a blue coat waking on a grassy hill with his arms and legs pinned by hundreds of tiny ropes, little soldiers six inches tall with ladders and poles all around him, tiny arrows sticking in his hand, a harbor of little ships behind, astonishing storybook scene',
      blocks: [
        {
          kind: 'text',
          text: 'Lemuel Gulliver was a ship\'s surgeon. In the year 1699 his ship the Antelope struck a rock in a great storm. He swam for his life, and when at last he felt ground under his feet he fell down on the short grass and slept like a dead man.',
        },
        {
          kind: 'image',
          art: 'lilliput-ties-giant',
          text: 'Gulliver wakes to find himself pinned by the little people.',
        },
        {
          kind: 'text',
          text: 'When he opened his eyes he could not stir. His arms, his legs, and even his long hair were tied to the ground with thin strings. Then he felt something walking on his chest — a tiny man, no bigger than his own middle finger, with a bow and arrow in his hands.',
        },
        {
          kind: 'note',
          text: 'New word: surgeon — a doctor who treats sick and hurt sailors on a ship. Gulliver knew medicine, but not little people.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Soon there were hundreds of them. They built little stages and climbed up to speak to him. In their language they called themselves Lilliputians, and their country Lilliput. Gulliver was the tallest thing they had ever seen — a mountain that had come walking out of the sea.',
        },
        {
          kind: 'text',
          text: 'They brought him food — tiny barrels of meat and bread, and wine in little casks — and promised not to hurt him, if he would promise not to hurt them. Gulliver nodded as gently as he could, so as not to blow them over.',
        },
      ],
    },
    {
      title: 'Chapter 2 · Searching Gulliver\'s Pockets',
      art: 'lilliput-searches-pockets',
      artPrompt: 'tiny scholars in long coats with ladders leaning against a giant man\'s open coat, one pointing at a great silver pocket watch, another holding up a huge pistol, ink and paper on the ground beside them, curious and funny storybook scene',
      blocks: [
        {
          kind: 'text',
          text: 'The Emperor of Lilliput sent his wise men to search the great Man-Mountain, as they called him. Gulliver turned out his pockets and let them look at everything. They climbed in and out of his coat on little ladders.',
        },
        {
          kind: 'image',
          art: 'lilliput-wise-men-watch',
          text: 'The Lilliputian scholars examine Gulliver\'s watch and pistols.',
        },
        {
          kind: 'text',
          text: 'They found a great silver watch that ticked like a drum, a comb, a purse of gold coins bigger than their wagon wheels, and two terrible engines of iron that spat fire and smoke. "Do not touch those," said Gulliver. "They are pistols, and they can kill."',
        },
        {
          kind: 'note',
          text: 'New word: pistol — a small gun that one person can hold. To the Lilliputians, Gulliver\'s pistol was a cannon.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The wise men wrote down a long list of it all, and the Emperor kept the sword, the pistol and the ammunition for himself. But Gulliver\'s spectacles and his pocket watch he was allowed to keep — for the scholars loved the ticking best of all.',
        },
        {
          kind: 'text',
          text: '"A giant is a wonderful thing to have in the kingdom," said the Emperor. "We must show him to everybody." So Gulliver was measured from head to foot, and the scholars agreed he was exactly as tall as twelve of them put together.',
        },
      ],
    },
    {
      title: 'Chapter 3 · Freedom and the Little King',
      art: 'gulliver-freed-lilliput',
      artPrompt: 'a giant man kneeling on the seashore with his ankle chained, untying little ropes from a fleet of tiny wooden warships and towing them away through the water, a king with a crown on a balcony watching, sunny and grand storybook scene',
      blocks: [
        {
          kind: 'text',
          text: 'Gulliver petitioned the Emperor for his liberty day after day. At last the council agreed — but only if he swore a great oath: he would not leave the kingdom without permission, he would be a friend to the Lilliputians, and he would help them against their enemies.',
        },
        {
          kind: 'image',
          art: 'lilliput-fleet-towed',
          text: 'Gulliver, now a free man, tows the enemy fleet across the bay.',
        },
        {
          kind: 'text',
          text: 'Gulliver swore, and his chains were struck off. To show his thanks he made the Emperor a gift of honor: the enemy fleet of Blefuscu lay at anchor across the bay, so Gulliver waded out, tied all fifty ships to a single rope, and towed them home like a necklace of toys.',
        },
        {
          kind: 'note',
          text: 'New word: fleet — a great company of warships sailing together. Gulliver carried a whole fleet in one hand.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The Emperor was delighted, and the whole city cheered. Gulliver was given a house built for his size, a tiny table, and a new suit of Lilliputian clothes. For a time he was the happiest and most important man in the kingdom.',
        },
        {
          kind: 'text',
          text: 'But kings are never satisfied. Soon the Emperor asked Gulliver to do a cruel thing to the beaten enemy, and Gulliver refused. From that day his friends at court began to whisper against him.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Egg Quarrel and Leaving Lilliput',
      art: 'lilliput-egg-quarrel',
      artPrompt: 'a giant man at a tiny table cutting the big end of a boiled egg with a knife, courtiers on both sides quarreling with little banners, some cracking eggs at the small end and some at the big end, a king pointing, funny storybook scene',
      blocks: [
        {
          kind: 'text',
          text: 'The people of Lilliput were split in two by a great quarrel, and all about eggs. Long ago the Emperor\'s grandfather cut his finger breaking an egg at the big end, and commanded every subject to break eggs at the small end instead.',
        },
        {
          kind: 'image',
          art: 'lilliput-big-end-egg',
          text: 'Big-Endians and Small-Endians quarrel over how to break an egg.',
        },
        {
          kind: 'text',
          text: 'Many people thought this was a silly law. They broke their eggs at the big end anyway, and the two parties hated each other ever after. The quarrel reached into every house and every street of the kingdom.',
        },
        {
          kind: 'note',
          text: 'New word: quarrel — an angry argument between people. Gulliver saw that great quarrels often begin in very small ways.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Gulliver\'s enemies at court used the egg quarrel to accuse him of being a Big-Endian at heart. His friend warned him: a warrant was out for his eyes! Rather than lose his sight, Gulliver took his little boat and sailed away across the sea to Blefuscu.',
        },
        {
          kind: 'text',
          text: 'There, on the shore, he found a real boat — a captain\'s gig, overturned in the grass, but sound and whole. With help from the people of Blefuscu he fitted it out, said his farewells, and set sail once more over the wide water.',
        },
      ],
    },
    {
      title: 'Chapter 5 · The Giants of Brobdingnag',
      art: 'brobdingnag-giants-baby',
      artPrompt: 'a giant farmer\'s kitchen where a tiny man no bigger than a thumb stands on the great table, an enormous baby reaching for him, a huge cat sitting like a mountain by the fire, a giant girl laughing, warm light and huge scale differences, astonishing storybook scene',
      blocks: [
        {
          kind: 'text',
          text: 'A new storm, a new wreck — and Gulliver swam to a country where everything was enormous. The grass was taller than trees, the corn reached the clouds, and the people were as tall as a church steeple. This was Brobdingnag, the land of giants.',
        },
        {
          kind: 'image',
          art: 'brobdingnag-kitchen-table',
          text: 'The giant baby tries to put Gulliver in its mouth, and the mother catches him in her apron.',
        },
        {
          kind: 'text',
          text: 'A farmer found him, and the farmer\'s little daughter — only forty feet tall, and small for her age — became Gulliver\'s nurse. She made him a bed in a drawer hung from a shelf, taught him the language, and named him Grildrig, the little man.',
        },
        {
          kind: 'note',
          text: 'New word: scale — how big one thing is next to another. In Brobdingnag everything was on a giant scale; Gulliver was the size of a mouse.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The farmer took Gulliver from town to town as a show, and people paid to see the tiny man. At supper a mastiff the size of four elephants came sniffing at the table; a cat as big as a house purred by the fire; and the baby of the house got Gulliver\'s head into its mouth before the mother caught him in her apron.',
        },
        {
          kind: 'text',
          text: 'The Queen heard of the little man and bought him for a great price. In the palace Gulliver had a fine box for a house, a tiny boat to sail on the castle pond, and the little nurse always beside him. When an eagle one day carried his box away over the sea, a passing English ship rescued him — and Gulliver went home to wife and family, glad to be an ordinary man among ordinary people again.',
        },
      ],
    },
  ],
  rights: {
    workTitle: "Gulliver's Travels into Several Remote Nations of the World",
    author: 'Jonathan Swift',
    authorDeathYear: 1745,
    jurisdiction: 'US',
    basis: 'pd-us',
    sourceUrl: 'https://www.gutenberg.org/ebooks/829',
    note: 'Retold in simple English; plot follows the public-domain original.',
  },
}
