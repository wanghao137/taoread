import type { PackBook } from '../types'

/**
 * The Happy Prince and Other Tales — four tales retold in simple English.
 * Text: Project Gutenberg eBook #902 (Oscar Wilde, 1888). Public domain in the US
 * (pre-1929) and worldwide (Wilde d. 1900; 70y pma expired). Plots follow the
 * original stories; wording simplified into short sentences for young readers.
 */
export const happyPrince: PackBook = {
  id: 'tale-happyprince',
  title: 'The Happy Prince and Other Tales',
  author: 'Oscar Wilde',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'A golden prince on a tall column. A little bird who stays behind when his friends fly south. A giant with no friends. And a very proud rocket! Four gentle tales by Oscar Wilde.',
  coverArt: 'happy-prince-city',
  coverArtPrompt: 'a tall stone column in a starlit old city, a golden statue of a prince on top with a ruby in his sword, a small swallow resting on his shoulder, soft lamplight below',
  coverFrom: '#1565C0',
  coverTo: '#90CAF9',
  source: 'Project Gutenberg eBook #902, public domain (Wilde d. 1900)',
  chapters: [
    {
      title: 'Chapter 1 · The Happy Prince',
      art: 'prince-statue',
      artPrompt: 'a golden statue of a prince high on a column above an old city, a ruby in his sword-hilt and sapphires for eyes, a small swallow perched at his feet, one bright tear on the statue’s cheek',
      blocks: [
        {
          kind: 'text',
          text: 'High above the city, on a tall column, stood the statue of the Happy Prince. He was covered all over with fine gold leaf. His eyes were two bright sapphires, and a large red ruby glowed on the handle of his sword. Every day the people looked up and said, "How happy he looks!"',
        },
        {
          kind: 'image',
          art: 'prince-statue',
          text: 'The Happy Prince on his tall column, watching over the city.',
        },
        {
          kind: 'text',
          text: 'One night a little Swallow came to the city. His friends had all flown away to Egypt, for winter was coming. He was tired, and he thought the column would be a fine place to rest. So he settled down between the feet of the Happy Prince.',
        },
        {
          kind: 'note',
          text: 'New word: sapphire — a precious blue stone, deep and clear as the sky.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'But as he tucked his head under his wing, a great drop of water fell on him. He looked up, and saw that the Happy Prince was weeping. "Who are you?" asked the Swallow. "I am the Happy Prince," said the statue. "When I was alive, I had a heart made for gladness. Now I can see all the sad things of my city, and my heart is made of lead, and it weeps."',
        },
        {
          kind: 'text',
          text: 'The Prince begged the little bird to stay one more night and help him. The Swallow took the ruby from the sword-hilt and carried it to a poor seamstress, whose little boy was sick with a fever. Then he took one sapphire eye to a cold young playwright, and the other to a little match-girl in the street. At last the Prince said, "Take the gold from my body, leaf by leaf, and give it to the children who are hungry." And the Swallow did.',
        },
        {
          kind: 'text',
          text: 'Now the Prince had no gold left, and no jewels, and the winter was very hard. The little Swallow loved the Prince too much to leave him. He stayed, and one cold morning he died at the Prince’s feet. At the same moment there was a curious crack inside the statue — the leaden heart had broken in two. The next day the Mayor took down the statue, for it was dull and shabby now. The broken lead heart was thrown onto the dust-heap, and the dead bird lay beside it. "Bring me the two most precious things in the city," said God to an angel. And the angel brought the broken lead heart and the dead bird. "You have chosen rightly," said God. "The little bird shall sing for ever in the garden of Paradise, and the Happy Prince shall praise me in my city of gold."',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Nightingale and the Rose',
      art: 'nightingale-rose',
      artPrompt: 'a small brown nightingale singing on a rose bush under a full moon, one white rose turning deep red in the moonlight, a glistening drop on the bird’s breast, a soft garden of silver shadows',
      blocks: [
        {
          kind: 'text',
          text: '"She said she would dance with me if I brought her a red rose," cried the young Student, "and there is not one red rose in all my garden." High up in the tree, the little Nightingale heard him. She sang softly, for she understood the sadness of love.',
        },
        {
          kind: 'image',
          art: 'nightingale-rose',
          text: 'The Nightingale singing to a rose bush in the silver moonlight.',
        },
        {
          kind: 'text',
          text: 'The Nightingale flew to the white Rose-tree, and then to the yellow one. But neither could give a red rose. At last she came to the red Rose-tree. "If you want a red rose," said the tree, "you must sing to me by moonlight, and press your breast against one of my thorns. All night long you must sing, and the thorn must pierce your heart, and your heart’s blood must colour the rose."',
        },
        {
          kind: 'note',
          text: 'New word: thorn — the sharp little spike that grows on a rose stem. It can prick your finger.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'So the Nightingale sang. She sang of a boy and a girl in the old garden, and the white rose flushed pink. She sang of a love that is stronger than death, and the rose grew deep red. And as she sang, the thorn went deeper and deeper into her heart. A sharp pang of pain shot through her, but still she sang, louder and louder.',
        },
        {
          kind: 'text',
          text: 'At dawn the red rose was finished, and the little Nightingale lay dead in the long grass, with the thorn still in her heart. The Student found the rose and ran to the girl. But she only frowned. "I am afraid it will not go with my dress," she said, "and the Chamberlain’s nephew has sent me real jewels." "You are very ungrateful," said the Student, and he threw the rose into the street, where it fell into a rut.',
        },
        {
          kind: 'text',
          text: '"What a silly thing Love is," said the Student. He went back to his books. But the red rose lay in the gutter, and nobody knew that a little bird had given her life to make it. And that is the story of the Nightingale and the Rose.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Selfish Giant',
      art: 'giant-garden',
      artPrompt: 'a walled garden in spring with one tree still bare and covered with snow, a huge giant standing outside a high stone wall, a tiny boy reaching up toward a green tree, soft spring sunshine',
      blocks: [
        {
          kind: 'text',
          text: 'Every afternoon, when school was over, the children used to go and play in the Giant’s garden. It was a lovely big garden, with soft green grass and peach trees that blossomed in spring. The birds sat in the trees and sang so sweetly that the children stopped their games to listen.',
        },
        {
          kind: 'image',
          art: 'giant-garden',
          text: 'The Giant’s garden, where the children loved to play.',
        },
        {
          kind: 'text',
          text: 'One day the Giant came back. He had been away for seven years. When he saw the children, he cried in a gruff voice, "What are you doing here?" And he built a high wall all round his garden. "My own garden is my own garden," he said. He put up a notice-board: TRESPASSERS WILL BE PROSECUTED.',
        },
        {
          kind: 'note',
          text: 'New word: gruff — a low, rough, cross kind of voice, like a bear waking up.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Then the winter came. The Snow and the Frost and the North Wind and the Hail came too, and they never left the garden. Spring came to all the country, but she stayed away from the Giant’s garden. All the year round it was winter there. The Giant sat by the fire and wondered why the spring was so late. But one morning the Giant heard a linnet singing outside his window. "I believe the spring has come at last!" he said. He jumped out of bed and looked out. The children had crept in through a little hole in the wall, and they were sitting in the branches of the trees. In every tree he could see a little child. And the trees were so glad that they covered themselves with blossoms.',
        },
        {
          kind: 'text',
          text: 'But in one corner of the garden it was still winter. A little boy was trying to climb up the tree, and he could not, for he was too small. The tree begged him to come up, and the poor bird sang to him, but the little boy only cried. "How selfish I have been!" said the Giant. He went out, and the children were frightened and ran away. Only the little boy stayed, for his eyes were so full of tears that he did not see the Giant coming.',
        },
        {
          kind: 'text',
          text: 'The Giant took the little boy gently in his hand and put him up into the tree. And the tree broke at once into blossom, and the birds came and sang. The little boy put his arms round the Giant’s neck and kissed him. That afternoon, the children came back with the spring. When they saw the Giant, they were no longer afraid, for he had knocked down the wall. "It is your garden now, little children," he said. And so it was. Years went by, and the Giant grew old and could not play any more. One winter morning he looked out, and in the farthest corner of his garden stood the little boy again. The Giant ran out, and the boy smiled at him. "Where did you go?" asked the Giant. The boy pointed at the marks in his hands and feet. "You let me play once in your garden," said the boy. "Today you shall come with me to my garden, which is Paradise." And when the other children came, they found the Giant lying dead under the tree, all covered with white blossoms.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Remarkable Rocket',
      art: 'remarkable-rocket',
      artPrompt: 'a tall thin firework rocket leaning against the wall of an old barrel in a moonlit yard, a green frog and a duck watching, paper stars scattered, a sleepy grey cat on the fence',
      blocks: [
        {
          kind: 'text',
          text: 'The King’s son was going to be married, and for three days and three nights fireworks were let off in the great courtyard. In a quiet corner of the yard stood an old barrel. In it lived a family of rockets, and among them was the Remarkable Rocket. "I am a very remarkable rocket," he said, "and I shall go off with a loud bang that everyone will remember."',
        },
        {
          kind: 'image',
          art: 'remarkable-rocket',
          text: 'The Remarkable Rocket talking to the frog and the duck.',
        },
        {
          kind: 'text',
          text: 'The other rockets tried to be cheerful, but the Remarkable Rocket only complained. "I always weep when I am happy," he said. "I am thinking of my dear friends, who will never be let off at all." And a large tear rolled down his cardboard nose and wetted the dry leaves beneath him. His neighbours shook their heads and said nothing.',
        },
        {
          kind: 'note',
          text: 'New word: remarkable — very special and easy to notice. The rocket thought he was the most special firework of all!',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The next morning the workmen came to set up the fireworks. The Remarkable Rocket was left out, for he had not been put in the barrel with the others. He fell into a ditch full of water. "I shall get my clothes wet," he said, "and that will be very unlucky." A frog hopped up and croaked. A duck swam by. Neither of them thought the rocket was remarkable at all.',
        },
        {
          kind: 'text',
          text: 'In the afternoon two little boys found him. "What a fine rocket for Guy Fawkes Day!" they cried, and they took him home and set him up in the garden. When it was dark, they lit his fuse. The rocket flew straight up into the dark sky, higher and higher. "I shall come down in a shower of golden stars!" he thought.',
        },
        {
          kind: 'text',
          text: 'And so he did. He burst into a thousand stars, brighter than any firework that night. But nobody was looking at the sky just then, so nobody saw him. The rocket fell softly down into a ditch, and there he lay. "I knew I should make a great sensation," he said to a stick beside him. And that was the end of the Remarkable Rocket.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Happy Prince and Other Tales',
    author: 'Oscar Wilde',
    authorDeathYear: 1900,
    jurisdiction: 'US',
    basis: 'pd-us',
    sourceUrl: 'https://www.gutenberg.org/ebooks/902',
    note: 'Retold in simple English for young readers; plot follows the public-domain original. Published 1888; US public domain (pre-1929) and worldwide (Wilde d. 1900, 70y pma expired).',
  },
}
