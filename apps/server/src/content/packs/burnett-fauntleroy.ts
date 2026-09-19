import type { PackBook } from '../types'

/**
 * Little Lord Fauntleroy — five chapters retold in simple English for
 * young readers. Original: Frances Hodgson Burnett, published 1886.
 * Public domain in the US (pre-1929) and worldwide (Burnett died 1924;
 * 70y pma expired). Cedric Errol of New York, the cross Earl of
 * Dorincourt, the false heir, and the grand birthday feast follow the
 * original novel; wording simplified into short sentences for children
 * aged 6-8.
 */
export const fauntleroy: PackBook = {
  id: 'burnett-fauntleroy',
  title: 'Little Lord Fauntleroy',
  author: 'Frances Hodgson Burnett',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'Cedric is a friendly boy who lives in New York with his mother. One day a lawyer brings surprising news: Cedric is a little lord, and a cross old Earl in England is his grandfather. Can a small boy with a big heart soften the proudest old man in England?',
  coverArt: 'cedric-shoes',
  coverArtPrompt: 'a small boy with curly hair in a black velvet suit with a wide lace collar sitting on a shop stool trying on shiny new boots, a kind shoemaker kneeling with a pin cushion, a tall stern old lawyer in black waiting at the shop door, a little dog watching, warm lamplight and rain on the window, cozy storybook illustration',
  coverFrom: '#283593',
  coverTo: '#FFAB91',
  source: 'Little Lord Fauntleroy (Frances Hodgson Burnett, 1886), public domain (Burnett d. 1924)',
  chapters: [
    {
      title: 'Chapter 1 · A Boy in New York',
      art: 'cedric-newyork',
      artPrompt: 'a small curly-haired boy in a black velvet suit sitting on a grocery counter talking with a cheerful old shopkeeper in an apron, wooden crates and a big scale around them, a quiet New York street with brick houses seen through the shop window, morning light, warm storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'In a quiet street in New York lived a small boy named Cedric. He had curly hair and very good manners, for his mother taught him to be kind to everyone. His best friend was Mr. Hobbs, the grocer, who let him sit on the counter and talk about politics all morning.',
        },
        {
          kind: 'image',
          art: 'cedric-lawyer',
          text: 'A stern lawyer arrives with news that will change everything.',
        },
        {
          kind: 'text',
          text: 'One morning a tall lawyer named Mr. Havisham knocked at the door. He looked cross, but Cedric shook his hand politely anyway. "My boy," said the lawyer, "you are Lord Fauntleroy now. Your grandfather is the Earl of Dorincourt in England, the richest lord in the country. You are his heir." Cedric only hoped the Earl liked apple turnovers.',
        },
        {
          kind: 'note',
          text: 'New word: heir - the person who will receive a family\'s house, land, and title one day.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The Earl had sent for Cedric but did not want his American mother to come and live in the castle. Cedric thought hard about that. "My mother comes first," he said, politely but firmly. "Dearest and I will come, and we shall visit you often." Even the lawyer smiled a little behind his hand.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Cross Old Earl',
      art: 'cedric-castle',
      artPrompt: 'a small boy in a velvet suit standing bravely in a vast stone hall of an English castle, looking up at a tall old earl in a velvet chair with a stick, tall banners and a huge fireplace behind them, long shadows and firelight, warm hopeful storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'So Cedric and his mother, whom he called Dearest, sailed across the sea to England. The Earl of Dorincourt waited in his great castle. He was proud, and cross, and crosser still because he did not want to like anyone at all.',
        },
        {
          kind: 'image',
          art: 'cedric-meeting',
          text: 'The little lord looks up at the proudest old man in England.',
        },
        {
          kind: 'text',
          text: 'Then the doors opened, and in walked a small boy with curly hair and honest eyes. "How do you do, grandfather?" said Cedric. "I am sorry you have such a bad leg. My friend Mr. Hobbs says a kind word helps almost anything." The Earl stared. In all his long life, nobody had ever talked to him like that.',
        },
        {
          kind: 'note',
          text: 'Talk together: The Earl is rich and grand but not happy. What does Cedric have that the Earl does not?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Cedric went to live in the castle, and Dearest went to a cozy lodge nearby. Every evening the little lord climbed the stairs to sit with the old Earl. He told stories of Mr. Hobbs, of baseball, and of the kind shoemaker Dick. The Earl grumbled, but he began to listen. Slowly, the cross old face grew less cross.',
        },
      ],
    },
    {
      title: 'Chapter 3 · Making Friends Everywhere',
      art: 'cedric-tenants',
      artPrompt: 'a small boy on a shaggy pony riding through a green English village lane, farm families waving from cottage doors, an old farmer lifting his hat, geese crossing the road, a tall castle tower far behind the trees, bright summer morning, cheerful storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'The Earl gave Cedric everything - a pony, and money to spend. But Cedric thought of others first. A poor farmer was about to lose his cow and his home, so Cedric asked the Earl to help him, and the Earl, amazed at himself, said yes. Soon the whole village began to love the little lord.',
        },
        {
          kind: 'image',
          art: 'cedric-higgins',
          text: 'Cedric uses his wish to save a poor farmer\'s home and cow.',
        },
        {
          kind: 'text',
          text: 'Wherever Cedric went, kindness followed like sunshine. He remembered the baker\'s sick child and the old woman with no coal. The tenants said the little lord had a heart of gold, and they told the Earl so. The Earl began to walk in the village more often, and people found him less terrible than before.',
        },
        {
          kind: 'note',
          text: 'Question for you: Cedric never kept his good luck to himself. What would you do with money if you had a great deal of it?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'At night the Earl would say, "Tell me about that grocer, Hobbs, again." And Cedric told it all, with the apple turnovers, and the Earl would laugh till the candle shook. Nobody in the castle could remember the Earl laughing before. The proudest man in England was learning to be glad.',
        },
      ],
    },
    {
      title: 'Chapter 4 · Two Little Lords',
      art: 'cedric-pretender',
      artPrompt: 'a stern woman in a shawl and a sulky boy of the same age standing in a grand castle hall, facing a small curly-haired boy who watches with kind worried eyes, the old earl gripping the arm of his chair, lawyers with papers and candles, storm light through tall windows, dramatic but gentle storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'Then one gray day trouble came to the castle. A woman named Minna arrived with a boy of her own. "My son is the true Lord Fauntleroy!" she cried. If that were so, Cedric was no heir at all. The Earl\'s face went white as paper, and Cedric\'s heart felt small and cold.',
        },
        {
          kind: 'image',
          art: 'cedric-hope',
          text: 'Even in trouble, the little lord sits with the old Earl and holds his hand.',
        },
        {
          kind: 'text',
          text: 'But Cedric did not grow bitter. He sat with his grandfather every evening, just the same. "If I am not a lord," he said, "I am still your grandson, and I shall like you anyway." The old Earl held the small hand tight and did not say a word, for his throat was full.',
        },
        {
          kind: 'note',
          text: 'Talk together: Cedric may lose his castle and title. Why is he still kind? What things stay yours no matter what changes?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Help came from across the sea, from the friends Cedric had never forgotten. Mr. Hobbs the grocer and Dick the bootblack sent papers and letters to the lawyers. They proved that Minna had told a story, and her claim fell to nothing. "Three cheers for Cedric!" said Mr. Hobbs far away in New York. The truth had won, and the little lord was safe.',
        },
      ],
    },
    {
      title: 'Chapter 5 · The Grand Birthday Feast',
      art: 'cedric-feast',
      artPrompt: 'a great castle courtyard festival at dusk, long tables of farm families eating and laughing, garlands and lanterns strung between stone walls, a small boy in velvet waving from a pony beside a tall old earl standing to salute with his hat, fireworks beginning in a violet sky, joyful warm storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'At last came Cedric\'s birthday, and the Earl gave a grand feast. Every tenant for miles came to the castle with their families. There were long tables, roast meats, games for the children, and a great sky full of fireworks at dusk. It was the merriest day the castle had ever seen.',
        },
        {
          kind: 'image',
          art: 'cedric-toast',
          text: 'The old Earl rises to honor the little lord and his mother.',
        },
        {
          kind: 'text',
          text: 'The Earl stood up before all the people, and his voice shook a little. He told them of his grandson\'s kindness, and then he turned and honored Cedric\'s mother, whom he had once wrongly kept at a distance. There were cheers and cheers, and Dearest smiled with tears in her eyes. The proudest Earl in England had become a kind grandfather.',
        },
        {
          kind: 'note',
          text: 'Question for you: One small boy changed a whole castle. What small kindness could you do this week that might change someone\'s day?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'That night Cedric fell asleep in the great castle, with Dearest near and the stars outside the window. He still told stories of Mr. Hobbs and apple turnovers, and the Earl still listened. The little lord had not needed gold or a grand title to win every heart. He had needed only a kind word and a brave, honest heart.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Little Lord Fauntleroy',
    author: 'Frances Hodgson Burnett',
    authorDeathYear: 1924,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Retold for children; plot follows the public-domain original. Published 1886; worldwide public domain.',
  },
}
