import type { PackBook } from '../types'

/**
 * Cinderella — the Grimm brothers' "Aschenputtel", retold for children aged 3-5
 * in five chapters. Source: Project Gutenberg eBook #2591, "Grimm's Fairy
 * Tales" (Jacob & Wilhelm Grimm). The brothers died in 1859 and 1863; public
 * domain in the EU and worldwide under the 70-years-after-death rule (pd-70).
 * Retold in short, easy English, keeping the hazel tree and the little birds.
 */
export const cinderella: PackBook = {
  id: 'grimm-cinderella',
  title: 'Cinderella',
  author: 'Jacob and Wilhelm Grimm',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: 'A gentle girl with a heart of gold works hard all day for her unkind stepmother and stepsisters. But a little hazel tree, some friendly birds, and one lost shoe are about to change her life!',
  coverArt: 'cinderella-hazel',
  coverArtPrompt: 'a smiling girl in a plain grey dress holding a wooden broom, a white bird perching on a hazel tree behind her, a palace with golden towers in the distance, evening sky',
  coverFrom: '#5E35B1',
  coverTo: '#B39DDB',
  source: 'Project Gutenberg eBook #2591, public domain (Grimm brothers d. 1859/1863)',
  chapters: [
    {
      title: 'Chapter 1 · A New Family',
      art: 'cinderella-hearth',
      artPrompt: 'a girl in a grey dress sitting by the ashes of a kitchen fire, two sisters in fine dresses laughing at her from a doorway, brooms and a black pot nearby',
      blocks: [
        {
          kind: 'text',
          text: 'Once there was a gentle girl whose mother had died. Her father married a new wife, and the new wife had two daughters of her own. They had pretty faces, but unkind hearts.',
        },
        {
          kind: 'image',
          art: 'cinderella-hearth',
          text: 'Cinderella works by the fire while her stepsisters laugh at her.',
        },
        {
          kind: 'note',
          text: 'New word: hearth — the floor around a fire, the warmest place in the house.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The stepsisters took away her nice clothes and gave her an old grey dress and wooden shoes. "You shall be our servant!" they said. From morning to night she scrubbed and swept and carried water.',
        },
        {
          kind: 'text',
          text: 'Because she always looked dusty and sat down by the ashes, they called her Cinderella. But no matter how hard they made her work, Cinderella stayed kind, and she never complained.',
        },
        {
          kind: 'text',
          text: 'Her father was going away on a journey. "What shall I bring back for you?" he asked his daughters. The stepsisters asked for dresses and jewels. Cinderella said quietly, "Father, break off for me the first branch that brushes against your hat on the way home."',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Hazel Tree',
      art: 'cinderella-hazel',
      artPrompt: 'a girl in a grey dress planting a hazel branch on a small grave, white birds flying down to help her, her mother’s name written on a simple wooden cross',
      blocks: [
        {
          kind: 'text',
          text: 'Her father brought her a hazel branch. Cinderella planted it on her mother’s grave and watered it with her tears. It grew into a fine little tree, and every day she went there to pray.',
        },
        {
          kind: 'image',
          art: 'cinderella-hazel',
          text: 'Cinderella plants the hazel branch on her mother’s grave.',
        },
        {
          kind: 'note',
          text: 'New word: grave — the place where someone is buried, often marked with a cross or stone.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'A kind white bird lived in the tree. Whenever Cinderella wished for something, the bird would flutter down and bring it to her.',
        },
        {
          kind: 'text',
          text: 'One day the king sent word that there would be three days of feasts at the palace, and every young girl was invited — for the prince was looking for a bride. The stepsisters were wild with joy.',
        },
        {
          kind: 'text',
          text: '"May I go too?" asked Cinderella. But the stepmother laughed. "You, in your grey dress and wooden shoes? Stay home and clean the kitchen!" And she threw a bowl of lentils into the ashes. "Sort these before we come back — if you can."',
        },
      ],
    },
    {
      title: 'Chapter 3 · Three Wonderful Dresses',
      art: 'cinderella-dresses',
      artPrompt: 'a girl standing under a hazel tree in a dress of shining silver and gold, white doves bringing her beads and a golden slipper, a palace glowing in the night behind her',
      blocks: [
        {
          kind: 'text',
          text: 'The stepsisters went to the palace. Cinderella ran to the hazel tree and cried, "Little tree, shake yourself and give me a dress to wear!" Two white birds flew down and brought her a dress of silver and gold, and shoes embroidered with silk.',
        },
        {
          kind: 'image',
          art: 'cinderella-dresses',
          text: 'The birds give Cinderella a beautiful dress.',
        },
        {
          kind: 'note',
          text: 'New word: embroidered — decorated with pretty patterns sewn in coloured thread.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Cinderella went to the feast, and the prince danced with her all evening. But when he tried to walk her home, she slipped away into the dark — first hiding in a pigeon-house, then up into a pear tree — and ran back to her grey dress.',
        },
        {
          kind: 'text',
          text: 'On the third evening, the prince was clever. He spread pitch on the palace stairs, so when Cinderella ran down, her little golden shoe stuck fast. She left it behind, and the prince picked it up and smiled.',
        },
        {
          kind: 'text',
          text: 'The next morning, the prince rode through the town. "This shoe shall belong to my bride!" he said, and he stopped at the house where Cinderella lived.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Golden Shoe',
      art: 'cinderella-shoe',
      artPrompt: 'a prince in a blue coat kneeling to hold a tiny golden shoe towards a girl in a grey dress, two sisters looking shocked behind her, birds sitting on the roof above',
      blocks: [
        {
          kind: 'text',
          text: 'The eldest stepsister tried on the shoe in her room. It was much too small. Her mother said, "Cut off your toe — when you are queen, you will not need to walk!" So she did, and the shoe went on.',
        },
        {
          kind: 'image',
          art: 'cinderella-shoe',
          text: 'The prince brings the golden shoe to Cinderella’s house.',
        },
        {
          kind: 'note',
          text: 'New word: toe — one of the five small parts at the end of your foot.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The prince took her up on his horse, but as they rode past the hazel tree, two pigeons called out: "Look, look — there is blood within the shoe! The shoe is too tight, the bride is not right!" The prince brought her back, and the second sister tried the shoe — with no better luck.',
        },
        {
          kind: 'text',
          text: '"Is there no other girl in the house?" asked the prince. "Only the kitchen drudge," said the stepmother, "and she is not for a prince." But the prince said, "Let her try it."',
        },
        {
          kind: 'text',
          text: 'Cinderella washed her face and her hands, put her little foot into the shoe — and it fitted as if it had been made for her. The prince looked into her kind eyes and said, "You are my bride!"',
        },
      ],
    },
    {
      title: 'Chapter 5 · The Wedding',
      art: 'cinderella-wedding',
      artPrompt: 'a bride in a white dress and golden crown walking out of a church with a prince, white doves flying around them, a hazel tree blooming in the churchyard, smiling crowd',
      blocks: [
        {
          kind: 'text',
          text: 'The prince and Cinderella were married in the great church. The doves flew around them, singing so sweetly that everyone stopped to listen.',
        },
        {
          kind: 'image',
          art: 'cinderella-wedding',
          text: 'Cinderella and the prince leave the church together.',
        },
        {
          kind: 'note',
          text: 'New word: married — when two people promise to live together and love each other always, in a wedding.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The stepsisters were sorry for the way they had treated her, and Cinderella forgave them with all her heart. She asked them to live in the palace, and she was kind to them every day of their lives.',
        },
        {
          kind: 'text',
          text: 'And the little hazel tree on her mother’s grave bloomed every spring, and the white birds sang — for they had watched over Cinderella from the very first day.',
        },
      ],
    },
  ],
  rights: {
    workTitle: "Grimm's Fairy Tales — Aschenputtel (Cinderella)",
    author: 'Jacob and Wilhelm Grimm',
    authorDeathYear: 1863,
    jurisdiction: 'EU',
    basis: 'pd-70',
    sourceUrl: 'https://www.gutenberg.org/ebooks/2591',
    note: 'Grimm brothers died 1859 and 1863; public domain under the 70-years-after-death rule. Retold for young children in simple English from Project Gutenberg eBook #2591.',
  },
}
