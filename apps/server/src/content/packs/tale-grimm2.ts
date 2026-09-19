import type { PackBook } from '../types'

/**
 * The Fisherman and His Wife — five Grimm tales retold in simple English.
 * Text: Project Gutenberg eBook #2591, "Grimm's Fairy Tales" (Jacob and Wilhelm Grimm).
 * Public domain in the US (pre-1929) and worldwide (the brothers d. 1859/1863; 70y pma
 * expired). Plots follow the original stories; wording simplified into short sentences
 * for young readers.
 */
export const grimmMore: PackBook = {
  id: 'tale-grimm2',
  title: 'The Fisherman and His Wife',
  author: 'Jacob and Wilhelm Grimm',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'A magic fish, a golden goose, a funny little man who can spin straw into gold, and a proud princess who must learn to be kind. Five favourite tales from the Brothers Grimm.',
  coverArt: 'fisherman-hut',
  coverArtPrompt: 'an old fisherman in a wooden boat on a calm grey-green sea, holding up a talking flounder, a small cottage with a thatched roof on the shore behind him, morning mist',
  coverFrom: '#00695C',
  coverTo: '#80CBC4',
  source: 'Project Gutenberg eBook #2591, public domain (Grimm brothers d. 1859/1863)',
  chapters: [
    {
      title: 'Chapter 1 · The Fisherman and His Wife',
      art: 'flounder-sea',
      artPrompt: 'an old fisherman leaning over the side of a small boat, a great flat fish speaking to him from the water, storm clouds gathering at the edge of a grey sea',
      blocks: [
        {
          kind: 'text',
          text: 'Once there was a poor fisherman. He lived with his wife in a dirty old hut by the sea. Every day he went out with his net, and every day he caught what he could.',
        },
        {
          kind: 'image',
          art: 'flounder-sea',
          text: 'The fisherman and the enchanted flounder.',
        },
        {
          kind: 'text',
          text: 'One day he pulled up a great flounder. And the flounder spoke! "I am not a fish at all," he said. "I am an enchanted prince. Please put me back in the water." The fisherman was frightened, and he let the fish go. He went home and told his wife.',
        },
        {
          kind: 'note',
          text: 'New word: flounder — a flat fish that lives on the sandy floor of the sea and has both eyes on the same side of its head.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"You fool!" cried his wife. "You should have asked for something! Go back and tell the fish we want a nicer house." The fisherman went, and the flounder granted the wish. But the wife was never satisfied. First a house, then a great stone castle, then to be King, then to be Emperor, and then to be Pope. Each time the sea grew darker and the waves rose higher.',
        },
        {
          kind: 'text',
          text: 'At last the wife sent him again. "Go!" she cried. "I want to be Lord of the sun and the moon. I want to make the sun and the moon rise myself!" The fisherman went, trembling. The flounder only said, "Go home. She is sitting in your old hut again." And there she was, in the dirty old hut by the sea. And there they stayed for the rest of their days.',
        },
      ],
    },
    {
      title: 'Chapter 2 · Mother Holle',
      art: 'mother-holle',
      artPrompt: 'a kind old woman with long white hair shaking a great featherbed over a garden, white feathers and a shower of gold falling like snow, an apple tree full of red apples, a blue sky',
      blocks: [
        {
          kind: 'text',
          text: 'There was once a widow who had two daughters. One was pretty and good and worked hard. The other was ugly and lazy and never lifted a finger. The mother loved the lazy one best.',
        },
        {
          kind: 'image',
          art: 'mother-holle',
          text: 'Mother Holle shaking her featherbed in the garden.',
        },
        {
          kind: 'text',
          text: 'One day the good girl was spinning by the well, and she pricked her finger. She leaned over the well to wash it, and the spindle fell in. She was so frightened that she jumped in after it. Down, down she fell, into a beautiful green meadow.',
        },
        {
          kind: 'note',
          text: 'New word: spindle — a thin wooden stick used long ago to twist wool into thread.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'She walked on and came to an oven full of bread. "Take me out!" cried the bread. She took it out with the peel. Then she came to an apple tree. "Shake me!" it cried. She shook it till the apples fell. At last she came to a little house, and an old woman with very long teeth looked out. "Come and help me," said the woman. "I am Mother Holle. Shake my featherbed well, and the feathers will fly about like snow in the world above."',
        },
        {
          kind: 'text',
          text: 'The girl worked hard and shook the bed every morning. When she had stayed a year, she grew homesick. Mother Holle took her out, and led her to a great gate. As she passed through, a shower of gold fell upon her, and it clung to her dress. "This is for your good service," said Mother Holle, and the gate shut behind her.',
        },
        {
          kind: 'text',
          text: 'When the lazy sister saw the gold, she wanted some too. She sat by the well and threw her spindle into it on purpose. Down she went, to the oven and the apple tree. But she would not help. She let the bread burn, and she left the apples on the ground. Mother Holle sent her away after one day. And as she passed through the gate, a great kettle of pitch was emptied over her. "This is for your service," said Mother Holle. And the pitch clung to her for the rest of her life.',
        },
      ],
    },
    {
      title: 'Chapter 3 · Rumpelstiltskin',
      art: 'rumple-spinning',
      artPrompt: 'a little man with a long pointed nose jumping up and down in a treasure room, a spinning wheel turning straw into shining gold, a frightened miller’s daughter watching, candlelight',
      blocks: [
        {
          kind: 'text',
          text: 'A miller had a beautiful daughter. One day he said to the King, "My daughter can spin straw into gold." The King thought that was a fine thing. He sent for the girl, put her in a room full of straw, and gave her a spinning wheel. "Spin this into gold by morning," he said, "or you shall die."',
        },
        {
          kind: 'image',
          art: 'rumple-spinning',
          text: 'The little man spinning straw into gold.',
        },
        {
          kind: 'text',
          text: 'The poor girl sat and cried, for she could not spin gold. Then the door opened, and a little man with a long nose came in. "What will you give me if I spin it?" he asked. She gave him her necklace. He sat down and spun, and whirr, whirr, the straw became shining gold. The next night the same thing happened, and she gave him her ring.',
        },
        {
          kind: 'note',
          text: 'New word: straw — the dry yellow stems of grain, left over after the wheat is cut.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The third night, the King filled a bigger room. But the little man asked for more. "I have nothing left," said the girl. "Then promise me your first child when you are Queen," he said. She did not see what else to do, and she promised. The King married her, and soon a little baby was born. The little man came for it, and the Queen wept and begged.',
        },
        {
          kind: 'text',
          text: '"I will give you three days," said the little man. "If you can guess my name, you may keep your child." The Queen sent messengers all over the land. On the third day a messenger came back and said, "I saw a little man on the mountain, jumping on one leg round a fire, and singing: To-day I bake, to-morrow I brew, the next I have the Queen’s child, and glad am I that no one knew, that Rumpelstiltskin is my name."',
        },
        {
          kind: 'text',
          text: 'The Queen smiled. "Is your name Rumpelstiltskin?" she asked. The little man was so angry that he jumped up and stamped his foot so hard it went clean through the floor. Then he pulled himself out, and ran away, and was never seen again. And the Queen and her baby lived happily in the great castle.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Golden Goose',
      art: 'golden-goose',
      artPrompt: 'a simple boy in a grey coat carrying a golden goose under his arm, a row of six people stuck fast to one another in a long line, a village street and laughing children, bright sunshine',
      blocks: [
        {
          kind: 'text',
          text: 'A woodcutter had three sons. The youngest was called Simpleton, because he was good and trusting and never laughed at anyone. One day the oldest brother went into the wood to cut wood. He met a little grey man. "Give me some bread," said the man. But the brother said he had none to spare, and went on.',
        },
        {
          kind: 'image',
          art: 'golden-goose',
          text: 'Simpleton and the golden goose, with everyone stuck behind.',
        },
        {
          kind: 'text',
          text: 'Then Simpleton went. He shared his bread and his beer with the little grey man, and the man showed him a tree with a golden goose in it. Simpleton took the goose out and went on his way. At an inn, three daughters wanted a golden feather. The oldest tried to pull one out, and her hand stuck fast to the goose. The second came to help, and she stuck to her sister. The third came too, and all three ran along together.',
        },
        {
          kind: 'note',
          text: 'New word: stuck — when something is held so tight that it cannot come free.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'On they went, a long line of people stuck to the goose. The parson tried to pull his daughters away, and stuck too. His sexton, a farmer and his wife, two labourers, and even the geese-girl all joined the line. Simpleton walked on, and the line of people ran and stumbled behind him, and everyone who saw them laughed out loud.',
        },
        {
          kind: 'text',
          text: 'In a great city there was a princess who could not laugh. The King said that whoever could make her laugh might marry her. When the princess saw Simpleton and his long line of stuck-together people, she began to laugh, and laughed until she could not stop. But the King was not pleased, and he set Simpleton hard tasks. The little grey man helped him with each one, for Simpleton had been kind to him.',
        },
        {
          kind: 'text',
          text: 'At last the King could find no more excuses. Simpleton married the princess, and they were very happy. And when the old King died, Simpleton ruled the land well, and the golden goose hung in the great hall, where everyone could see it shine.',
        },
      ],
    },
    {
      title: 'Chapter 5 · King Thrushbeard',
      art: 'thrushbeard',
      artPrompt: 'a proud young princess in a fine gown sitting on a throne, a king with a pointed beard looking stern, suitors in the background, golden curtains and a marble floor',
      blocks: [
        {
          kind: 'text',
          text: 'A King had a daughter who was beautiful, but so proud that no man was good enough for her. One after another she turned the suitors away. When a King came with a chin that turned up a little, she said, "What a thrushbeard!" And she laughed at him. Her father was angry.',
        },
        {
          kind: 'image',
          art: 'thrushbeard',
          text: 'The proud princess and the King she called Thrushbeard.',
        },
        {
          kind: 'text',
          text: '"I will marry you to the first beggar that comes to my door!" cried the old King. And so he did. A fiddler came along, and the King gave his daughter to him. The proud princess had to leave her fine gowns and go with the beggar into the wood.',
        },
        {
          kind: 'note',
          text: 'New word: proud — when someone thinks they are better than everyone else. Do you think that is a kind way to feel?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'They came to a forest, and the princess asked whose it was. "It belongs to King Thrushbeard," said the fiddler. "If only I had married him!" she cried. They came to a green meadow, and a fine town, and each time it was the same. The princess was sorry for everything she had said. They lived in a tiny hut, and she had to spin and cook and sell pots in the market.',
        },
        {
          kind: 'text',
          text: 'One day the King of the land held a feast. The princess peeped in at the door, in her ragged dress. King Thrushbeard saw her, and led her out to dance. Then he told her the truth. The fiddler had been King Thrushbeard all along, in disguise, and he had done it to humble her proud heart. The princess wept, and said she had been very wrong.',
        },
        {
          kind: 'text',
          text: '"But I have had my punishment," she said. Then the King sent for her fine clothes, and she was more beautiful than ever. The fiddler came in, dressed as a king, and they were married with great joy. And the princess was never proud again, for she had learned how hard life can be.',
        },
      ],
    },
  ],
  rights: {
    workTitle: "Grimm's Fairy Tales — The Fisherman and His Wife",
    author: 'Jacob and Wilhelm Grimm',
    authorDeathYear: 1863,
    jurisdiction: 'US',
    basis: 'pd-us',
    sourceUrl: 'https://www.gutenberg.org/ebooks/2591',
    note: 'Retold in simple English for young readers; plot follows the public-domain original. US public domain (pre-1929) and worldwide (Grimm brothers d. 1859/1863, 70y pma expired).',
  },
}
