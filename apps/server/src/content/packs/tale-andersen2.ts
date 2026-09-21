import type { PackBook } from '../types'

/**
 * The Nightingale and Other Tales — four tales retold in simple English.
 * Text: Project Gutenberg eBook #27100 (Hans Christian Andersen). Public domain in the
 * US (pre-1929) and worldwide (Andersen d. 1875; 70y pma expired). Plots follow the
 * original stories; wording simplified into short sentences for young readers.
 */
export const andersenMore: PackBook = {
  id: 'tale-andersen2',
  title: 'The Nightingale and Other Tales',
  author: 'Hans Christian Andersen',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'A little grey bird whose song can chase away Death. A match girl on a snowy New Year’s Eve. A soldier and three magic dogs. And a princess who could feel a tiny pea through twenty mattresses!',
  coverArt: 'nightingale-palace',
  coverArtPrompt: 'a little grey bird singing on a branch outside a Chinese palace window, a golden cage hanging open inside, cherry blossoms, a soft golden moon',
  coverFrom: '#6A1B9A',
  coverTo: '#CE93D8',
  source: 'Project Gutenberg eBook #27100, public domain (Andersen d. 1875)',
  chapters: [
    {
      title: 'Chapter 1 · The Nightingale',
      art: 'nightingale-sage',
      artPrompt: 'a small grey nightingale singing in a flowering sage bush by a high palace wall, an open golden book on a marble seat, soft morning light',
      blocks: [
        {
          kind: 'text',
          text: 'In China, in the garden of the Emperor, lived a little Nightingale. She was a plain grey bird, but her song was the most beautiful thing in all the world. Travellers came from far away to hear her, and poets wrote books about her song.',
        },
        {
          kind: 'image',
          art: 'nightingale-sage',
          text: 'The plain little Nightingale, singing in the palace garden.',
        },
        {
          kind: 'note',
          text: 'New word: plain — not decorated and not fancy. The nightingale looked plain, but her voice was wonderful.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'One day the Emperor heard of the bird. "Bring me the Nightingale!" he commanded. The servants searched the garden, and at last they found her in the sage bushes. She came to the palace and sang. The Emperor was so happy that tears came into his eyes. The nightingale was allowed to come and go as she pleased.',
        },
        {
          kind: 'text',
          text: 'Then one day a present came from the Emperor of Japan: a mechanical nightingale, covered all over with diamonds and rubies. It could sing the same tune over and over, and it never grew tired. Everyone praised the new bird, and the real Nightingale was forgotten. Sadly, she flew away to her green wood.',
        },
        {
          kind: 'text',
          text: 'One evening the mechanical bird broke with a "Whirr!" and could sing no more. Years passed. The Emperor grew ill, and Death came into his great hall. The courtiers had all run away. The Emperor lay alone, and cold, and frightened.',
        },
        {
          kind: 'text',
          text: 'Then, at the window, came a little song. The real Nightingale had come back! She sang of the quiet churchyard, of the roses and the warm sun, and Death listened, and listened, and at last he turned into a cold white mist and floated away out of the window. The Emperor opened his eyes and smiled. "Sweet little bird," he said, "stay with me always, and I will give you a golden slipper to wear." But the Nightingale said, "I cannot live in a cage. Let me come when I please. I will sit on the branch by your window and sing to you, and I will ask only this: that you remember me, and remember all the good things you have seen." And so it was, and the Emperor ruled wisely for many years.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Little Match Girl',
      art: 'match-girl',
      artPrompt: 'a small barefoot girl in a thin grey dress huddled between two snow-covered houses on a New Year’s Eve, a bright warm glow rising from a single match in her hands, snowflakes falling',
      blocks: [
        {
          kind: 'text',
          text: 'It was New Year’s Eve, and it was terribly cold. The snow fell fast in the dark streets. A poor little girl walked along, barefoot and shivering. In her old apron she carried a bundle of matches. All day she had cried, "Matches for sale!" But nobody had bought any.',
        },
        {
          kind: 'image',
          art: 'match-girl',
          text: 'The little match girl in the snow, lighting her first match.',
        },
        {
          kind: 'text',
          text: 'She sat down in a corner between two houses. Her little hands were numb with cold. She drew one match out of the bundle, and struck it against the wall, and it burned with a warm clear flame. It seemed to her as if she were sitting before a great bright iron stove. She stretched out her feet to warm them, and the fire went out, and the stove was gone.',
        },
        {
          kind: 'note',
          text: 'The match was magic! Think of a warm thing you would like to see if you were cold. What would you wish for?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'She struck a second match. Now she saw a feast on the table: roast goose stuffed with apples, and steaming plum pudding. But the match went out, and only the cold wall was there. A third match, and there stood a Christmas tree, taller and brighter than any she had ever seen, with thousands of candles. The lights rose higher and higher, till they were stars in the sky.',
        },
        {
          kind: 'text',
          text: 'Then the little girl struck all the matches she had left, one after another. In the great brightness she saw her grandmother, kind and gentle, smiling down at her. "Grandmother!" cried the little girl. "Take me with you! I know you will go away when the matches go out." She held the matches in both hands, and her grandmother took her up in her arms, and they flew away, high and higher, to a place where there is no cold, and no hunger, and no fear.',
        },
        {
          kind: 'text',
          text: 'In the morning, the people found the little girl in the corner, with a whole bundle of burnt matches around her. "The poor child tried to keep warm," they said. But nobody knew what beautiful things she had seen, nor into what glory she had gone with her grandmother. And the new sun rose, and the new year began.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Tinderbox',
      art: 'tinderbox-dogs',
      artPrompt: 'a soldier in a red coat standing at the entrance of a hollow old tree in a dark forest, three little dogs with eyes big as saucers peeping out, gold coins glimmering inside',
      blocks: [
        {
          kind: 'text',
          text: 'A soldier came marching home along the high road. He had served long and hard, and now he had nothing at all. As he walked, he met an old witch. "There is a hollow tree just ahead," she said. "Climb down inside, and you will find three rooms full of money. But bring me an old tinderbox that lies there."',
        },
        {
          kind: 'image',
          art: 'tinderbox-dogs',
          text: 'The soldier and the three dogs in the hollow tree.',
        },
        {
          kind: 'note',
          text: 'New word: tinderbox — a little box of dry cloth and flint used in old days to strike a light for a fire.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The soldier climbed down and filled his pockets with gold. On the way out, he asked the witch what she wanted with the tinderbox. She would not say. So he cut off her head, kept the tinderbox, and went into the town. Now he had money, and he bought fine clothes and good dinners for everyone.',
        },
        {
          kind: 'text',
          text: 'In the town there was a beautiful princess, locked up in a tower. The King and Queen kept her there all alone. The soldier wanted to see her. He struck a light on the tinderbox, and click! A little dog with eyes as big as saucers ran up. "What are my master’s orders?" said the dog. "Bring me the princess," said the soldier. And the dog ran off and brought her, asleep on his back.',
        },
        {
          kind: 'text',
          text: 'The dog came every night, until one morning the Queen saw where the princess had been. The soldier was taken and locked up in prison. The King said he must be hanged in the morning. The soldier begged a boy to run to his room and fetch the tinderbox. The boy brought it, and the soldier struck fire, once, twice, three times. Out came the three great dogs, with eyes like saucers, like mill-wheels, and like the round tower of Copenhagen.',
        },
        {
          kind: 'text',
          text: '"Take care of me!" cried the soldier. The dogs jumped on the judges and the King and the Queen, and threw them all up into the air. Nobody dared to say a word. Then the soldier married the princess, and the three dogs sat at the table and ate off golden plates. And everyone lived happily ever after.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Princess and the Pea',
      art: 'pea-mattress',
      artPrompt: 'a tall stack of twenty mattresses and twenty eider-down quilts in a palace bedchamber, a small green pea at the very bottom, a tired princess on top in a long white nightgown, rain at the window',
      blocks: [
        {
          kind: 'text',
          text: 'There was once a prince who wanted to marry a princess. But she had to be a real princess. He travelled all over the world to find one. There were plenty of princesses, but he could never be quite sure. There was always something not quite right. So he came home again, very sad.',
        },
        {
          kind: 'image',
          art: 'pea-mattress',
          text: 'The pile of mattresses, with the little pea at the bottom.',
        },
        {
          kind: 'text',
          text: 'One evening a terrible storm came on. The rain poured down and the lightning flashed. Then there was a knock at the town gate. The King went out and opened it. There stood a princess, in such a state! The water ran down her hair and her clothes and out at her heels. But she said she was a real princess.',
        },
        {
          kind: 'note',
          text: 'Fun word: eider-down — the soft warm feathers from an eider duck, used to make the cosiest quilts.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"We shall soon see about that," thought the old Queen. She did not say a word. She went into the bedroom, took off all the bedclothes, and laid a little green pea on the bare boards. Then she put twenty mattresses on top of the pea, and twenty eider-down quilts on top of the mattresses. There the princess was to sleep.',
        },
        {
          kind: 'text',
          text: 'In the morning they asked her how she had slept. "Oh, most terribly!" said the princess. "I have hardly closed my eyes all night. Goodness knows what was in the bed. I lay on something so hard that I am black and blue all over." Now they could see she was a real princess, for no one but a true princess could be so sensitive as to feel a pea through twenty mattresses and twenty quilts.',
        },
        {
          kind: 'text',
          text: 'The prince married her, for now he knew he had found a real princess. And the pea was put into the royal museum, where it may still be seen today. And that is a true story.',
        },
      ],
    },
    {
      title: 'Chapter 5 · The Wild Swans',
      art: 'andersen2-swans',
      artPrompt: 'a gentle girl with long braided hair kneeling on a rocky shore under a sunset sky, eleven great white swans flying down from rosy clouds to land around her, the sea sparkling gold',
      blocks: [
        {
          kind: 'text',
          text: 'A king had eleven sons and one daughter, Eliza. But their new stepmother was wicked. She sent little Eliza away to a farm in the country, and she turned her eleven brothers into wild swans, and they flew away over the sea, crying sadly.',
        },
        {
          kind: 'image',
          art: 'andersen2-swans',
          text: 'The eleven wild swans fly down to Eliza at sunset.',
        },
        {
          kind: 'note',
          text: 'New word: nettle — a tall wild plant with a little sting; its threads can be spun into linen.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Eliza grew up and came home — and one day, at sunset, eleven white swans flew down to her and became her brothers until sunrise. "We fly all day," they said, "and we may only be ourselves for one short hour." The swans carried Eliza over the wide sea to a warm country, and she did not sleep until they had landed safely.',
        },
        {
          kind: 'text',
          text: 'Then Eliza had a dream. "Weave eleven shirts of nettle-linen," the dream said, "and throw them over the swans, and the spell will break. But from this day until it is done, you must not speak one word." So Eliza gathered nettles with her bare hands, and her hands stung and burned, but she never stopped spinning and weaving.',
        },
        {
          kind: 'text',
          text: 'In that country a young king found her and loved her, and they were married. But Eliza never spoke, and the people whispered that she must be a witch, for they had found nettles in her room. At last they seized her, one morning, and carried her away to be judged.',
        },
        {
          kind: 'text',
          text: 'On the road, eleven white swans came down out of the sky and settled around her cart. Eliza threw the shirts over them — ten, eleven! — and the swans stood up as princes, her brothers alive and well. Only the youngest kept one swan’s wing, for one sleeve was not finished. "Now I may speak!" cried Eliza, and she told them everything, and all the people wept for joy. The king took her hand, and there was peace in the kingdom for ever after.',
        },
      ],
    },
    {
      title: 'Chapter 6 · The Shepherdess and the Chimney-Sweep',
      art: 'andersen2-shepherdess',
      artPrompt: 'two small porcelain figures, a shepherdess in a pink dress with a crook and a chimney-sweep with a tiny ladder, standing side by side on a carved wooden mantelpiece above a stove, warm evening light',
      blocks: [
        {
          kind: 'text',
          text: 'On an old mantelpiece stood pretty carved figures: an old Chinaman nodding his head, a proud general with a goat’s leg — and, standing close together, a little porcelain shepherdess and a little chimney-sweep with his ladder. They loved each other dearly.',
        },
        {
          kind: 'image',
          art: 'andersen2-shepherdess',
          text: 'The shepherdess and the chimney-sweep, close together on the mantelpiece.',
        },
        {
          kind: 'note',
          text: 'New word: porcelain — fine white clay shaped and baked till it shines like a shell; it breaks easily.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'But the old Chinaman had made up his mind. "The shepherdess shall marry the general," he said. "He keeps a grand house of his own." The shepherdess began to cry, but the chimney-sweep stood firm. "Do not be afraid," he said. "We will run away together." And he set his ladder against the wall, and up they climbed, and out through the dark pipe of the great stove.',
        },
        {
          kind: 'text',
          text: 'From the roof they looked out at the whole wide world. It was so big, and they were so small, and there was so much sky. "I cannot," whispered the shepherdess. "It is all too much. Take me home." So home they climbed, back through the stove pipe — and in their fright they knocked the old Chinaman off the table. Crack! He broke into three pieces.',
        },
        {
          kind: 'text',
          text: 'Everyone glued him together again, but the joint showed at his neck, and after that he never again said whom the shepherdess must marry. And there the little shepherdess and the little chimney-sweep stand to this day, side by side, loving each other with all their small porcelain hearts.',
        },
      ],
    },
    {
      title: 'Chapter 7 · The Snow Man',
      art: 'andersen2-snowman',
      artPrompt: 'a big friendly snowman with coal eyes and a tin saucepan hat in a snowy yard at dusk, gazing at the warm red glow of a stove shining from a cottage window, a yard dog sitting beside him, pale moonlight',
      blocks: [
        {
          kind: 'text',
          text: '"Hurrah!" cried the boys. It was a bright frosty morning, and they had rolled the snow into a big round man, with coals for his eyes and an old tin saucepan for his hat. "What a beautiful world," said the snow man, looking about. "And what is that bright thing in the sky?" "That is the moon," said the yard dog. "It rose just now. Yesterday you could see the sun."',
        },
        {
          kind: 'image',
          art: 'andersen2-snowman',
          text: 'The snow man gazes at the warm red glow in the window.',
        },
        {
          kind: 'note',
          text: 'New word: stove — a big iron box with a fire inside, that keeps a house warm.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"What is that red glow in the window?" asked the snow man. "That is the stove," said the dog. "It shines just like that at night." "How it shines," said the snow man. "I long for it so." "Not a good wish," said the dog, who had once slept by a stove in its warm corner. "You cannot go in. If the fire came near you, you would not be a snow man any more."',
        },
        {
          kind: 'text',
          text: 'But all that day the snow man looked at the window, and he thought of nothing else but the stove. The next day was milder, and the day after was milder still. The snow man drooped a little, and said nothing at all.',
        },
        {
          kind: 'text',
          text: 'Then one morning there was only a puddle on the grass where the snow man had stood, and the broom-stick he had been built around lying quietly beside it. "Ah," said the yard dog gently. "He loved the fire, and fire is not a friend to snow. Love melts faster than ice." And when the next winter came, the boys built a new snow man on the very same spot.',
        },
      ],
    },
    {
      title: 'Chapter 8 · The Darning Needle',
      art: 'andersen2-needle',
      artPrompt: 'a long slender darning needle with a shining black wax head lying proud and glittering in a sunlit puddle by a gutter, a fish bone and a small eggshell beside it, bubbles and golden light on the water',
      blocks: [
        {
          kind: 'text',
          text: 'There was once a darning needle who thought herself so fine that she believed she was a sewing needle. "Mind you hold me properly!" she said whenever she was taken out. "I am made of steel, and I belong in a fine lady’s work-basket."',
        },
        {
          kind: 'image',
          art: 'andersen2-needle',
          text: 'The darning needle floats along the gutter, proud as a queen.',
        },
        {
          kind: 'note',
          text: 'New word: darning needle — a long, thin steel pin for mending holes in stockings.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'But one day the cook’s hand slipped, and — plink! — the needle fell into the sink, and from the sink into the gutter. "Now I am travelling into the wide world!" she said, and floated along quite proudly, past sticks and straws and bits of leaf. A fish bone floated by and stared at her. "Do not come so close," she said. "You might think we are alike. We are not. I am far too fine for this world."',
        },
        {
          kind: 'text',
          text: 'At last she was washed into a dark corner where an old eggshell lay. "I am too fine for the world," she told the eggshell. "I shall break before I bend!" And when, one day, the cook poured hot water out into the corner, the steaming water crept round the needle. Her shining wax melted away, she grew soft and small — crack! — and she broke in two.',
        },
        {
          kind: 'text',
          text: 'Nobody ever picked her up again. For a thing that is too proud to be useful is soon forgotten. She only lay there thinking, "I was too fine for the world," very quietly, ever after.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Nightingale and Other Tales',
    author: 'Hans Christian Andersen',
    authorDeathYear: 1875,
    jurisdiction: 'US',
    basis: 'pd-us',
    sourceUrl: 'https://www.gutenberg.org/ebooks/27100',
    note: 'Retold in simple English for young readers; plot follows the public-domain original. Tales published 1835-1844; US public domain (pre-1929) and worldwide (Andersen d. 1875, 70y pma expired).',
  },
}
