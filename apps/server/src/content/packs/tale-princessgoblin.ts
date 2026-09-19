import type { PackBook } from '../types'

/**
 * The Princess and the Goblin — five chapters retold for young English readers.
 * Text: George MacDonald, 1872. US public domain (published pre-1929) and worldwide
 * (MacDonald d. 1905, 70y pma expired). Plot follows the original; the goblins are
 * kept more comical than frightening for children aged 6-8.
 */
export const princessGoblin: PackBook = {
  id: 'tale-princessgoblin',
  title: 'The Princess and the Goblin',
  author: 'George MacDonald',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'Princess Irene lives in a castle built on a mountain full of tunnels, and miners’ children know who really walks those tunnels: goblins with soft feet, who hate songs. When the goblins hatch a plan, a miner boy named Curdie and a silvery thread from a mysterious grandmother help Irene save them all.',
  coverArt: 'goblin-tower',
  coverArtPrompt: 'a stone castle tower rising above a mountainside at dusk, a warm lit window at the top where an old lady spins silver thread at a spinning wheel, pine forests and caves in the mountain below, first stars in a deep blue sky, peaceful storybook mood',
  coverFrom: '#4527A0',
  coverTo: '#FFCC80',
  source: 'The Princess and the Goblin (George MacDonald, 1872), public domain',
  chapters: [
    {
      title: 'Chapter 1 · The Princess and the Tower',
      art: 'goblin-tower',
      artPrompt: 'a small golden-haired princess climbing a winding stone stair inside a castle tower, holding a candle, arriving at a round room where a beautiful silver-haired old lady sits spinning shining thread at a wheel, roses in a bowl, warm lamplight against blue twilight through a high window',
      blocks: [
        {
          kind: 'text',
          text: 'On a green mountain, high above a village of miners, stood a great castle. In it lived a little princess named Irene, with blue eyes and hair like gold thread. She had many rooms to play in, but on rainy days, when the halls grew dull, she liked best to run up the stairs of an old tower nobody used.',
        },
        {
          kind: 'text',
          text: 'Up and up the winding stair she went, until she came to a round room she had never seen before. And in it sat the loveliest lady, with silver hair and a spinning wheel, spinning thread that shone like moonlight.',
        },
        {
          kind: 'image',
          art: 'goblin-tower',
          text: 'The tower room, where a lovely lady spun thread that shone like moonlight.',
        },
        {
          kind: 'text',
          text: '"Come in, Irene," said the lady, smiling. "You may call me grandmother." The princess sat down at her feet and watched the shining thread grow. "Why do you spin, grandmother?" she asked. "So that the right people find the right thread," said her grandmother, "when they need to come to me."',
        },
        {
          kind: 'note',
          text: 'New word: spinning — twisting wool or thread so it is strong enough to use. The grandmother’s thread is spun finer and brighter than any other in the world.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 2 · Curdie the Miner Boy',
      art: 'goblin-mine',
      artPrompt: 'a cheerful miner boy about twelve years old with a lantern and pickaxe standing in a candlelit mine tunnel of warm brown rock, singing with his mouth open as a row of comic goblins with big heads and soft bare feet cover their ears and shuffle away into the dark',
      blocks: [
        {
          kind: 'text',
          text: 'Down in the mountain lived the miners, and among them a boy named Curdie, the son of Peter the miner. Curdie was about twelve, strong and merry, and he worked beside his father in the tunnels, chipping rock and singing at the top of his voice.',
        },
        {
          kind: 'text',
          text: 'For underneath the mountain lived the goblins. They had great hard heads and little soft bare feet — toes exactly alike, no nails to speak of — and that was their whole secret. They could bear almost anything except a song, for songs made their poor soft toes tingle. So the miners sang all day long, and the goblins kept their distance and were more a joke than a worry.',
        },
        {
          kind: 'image',
          art: 'goblin-mine',
          text: 'Curdie singing in the tunnel, where goblins flee from the sound of a good tune.',
        },
        {
          kind: 'text',
          text: 'But Curdie was curious as well as merry. He noticed that the goblins had lately been very busy, carrying things through the tunnels at night, and tapping and plotting, and going quiet whenever a lantern came near. Jokes are one thing, he thought. But what are they carrying, and where are they carrying it?',
        },
        {
          kind: 'note',
          text: 'Talk together: the goblins’ weak spot is their soft feet, so the miners sing. Ask your child: what song would you sing to keep goblins far away?',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Goblins’ Secret Plan',
      art: 'goblin-plan',
      artPrompt: 'comic goblins with oversized heads gathered around a lantern in a dark tunnel, whispering behind their hands and pointing at a map scratched on the rock wall, a boy listening around a corner with his lantern shaded, deep purple and amber cave light',
      blocks: [
        {
          kind: 'text',
          text: 'One night Curdie stayed late in the tunnels and crept after the goblins, soft as a cat. In a big hollow cave he found their whole family gathered, whispering over a map scratched into the rock. And he heard two things that were not jokes at all. The goblins meant to dig a secret channel to flood the mine and drown the miners. And their gnome king had a plan for the princess, too.',
        },
        {
          kind: 'text',
          text: 'Curdie listened until his heart thumped, and then his own foot slipped on a wet stone. In a moment the whole cave of goblins turned around. They caught his lantern, and they caught Curdie, and because he laughed at their flat funny feet, they decided to keep him in the dark until he learned some manners.',
        },
        {
          kind: 'image',
          art: 'goblin-plan',
          text: 'The goblins’ secret meeting, overheard by one careful boy.',
        },
        {
          kind: 'text',
          text: 'They took him to their underground home and set him in the dark, feeling very proud of themselves. They did not know that in the castle above, a princess was waking from a dream of a silver thread, or that her grandmother was already winding the end of that thread around her small finger.',
        },
        {
          kind: 'note',
          text: 'New word: channel — a little dug waterway. The goblins’ secret channel was meant to bring the mountain stream right into the miners’ tunnels.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Silver Thread',
      art: 'goblin-thread',
      artPrompt: 'a small princess holding a ball of glowing silver thread walking hand in hand with a surprised miner boy through a dark tunnel, the thread unspooling behind them and shining like moonlight along the rocky floor, a soft pearly glow lighting their two faces',
      blocks: [
        {
          kind: 'text',
          text: 'The princess could not sleep for thinking of the dream, so she crept up the tower stair to her grandmother, who was waiting with the shining ball of thread in her lap. "This thread goes where I want it to go," said her grandmother, "and it will bring you to Curdie. Follow it, and never mind how dark it looks ahead. Only tell no one but Curdie what you have seen tonight."',
        },
        {
          kind: 'text',
          text: 'The thread unspooled from Irene’s finger and led her down the stairs, out a little door, and into the mountain itself — through passages she had never dreamed of, all the way to the room where Curdie sat in the dark. "Princess!" he said, when her thread’s glow lit his face. "You should not be here." "I know the way better than you think," said Irene. "Come."',
        },
        {
          kind: 'image',
          art: 'goblin-thread',
          text: 'One ball of shining thread, and a dark mountain that could not stop it.',
        },
        {
          kind: 'text',
          text: 'They followed the thread hand in hand, and it never once tangled or doubted, and it led them up through the little door and back into the castle at moonrise. Curdie shook his head in wonder. He had heard miners’ songs about goblins all his life, but he had never heard a song about a thread like that.',
        },
        {
          kind: 'note',
          text: 'Talk together: Irene trusts the thread even when the way ahead looks dark. Ask your child: what helps you feel brave when something is dark or new?',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 5 · Water in the Tunnels',
      art: 'goblin-flood',
      artPrompt: 'a bright mountain stream rushing through a dark tunnel, comic goblins with soft bare feet splashing and scrambling away while miners lift lanterns high from a dry side passage, a miner boy waving them to safety, dramatic but playful blue and gold light',
      blocks: [
        {
          kind: 'text',
          text: 'Curdie ran down the mountain in the morning and told the miners everything: the channel, the plan, the flood. "Then we shall sing," said Peter the miner, "and move the barrels, and be ready." So the miners worked and sang louder than ever, and Curdie went back to the tunnels to watch the goblins at their digging.',
        },
        {
          kind: 'text',
          text: 'That night the goblins broke through their channel at last, and the mountain stream rushed in. But the water ran the wrong way for the goblins — down and down into their own halls and houses, washing their maps away and giving their soft bare feet the very worst sort of surprise. Up they scrambled, out of the mountain and away over the hills, so fast that their hard heads rang like kettles.',
        },
        {
          kind: 'image',
          art: 'goblin-flood',
          text: 'The flood that went everywhere except where the miners were waiting.',
        },
        {
          kind: 'text',
          text: 'The miners stood in their dry, lantern-lit passage and laughed until the rocks rang. Curdie laughed loudest of all. And far up in her tower, a grandmother wound her finished thread neatly onto its ball, because the right people had come to the right places after all — and the princess and the miner boy were friends from that day on.',
        },
        {
          kind: 'note',
          text: 'Talk together: everyone helped in their own way — songs, hard work, a silver thread. Ask your child: which helper in this story would you like to be, and why?',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Princess and the Goblin',
    author: 'George MacDonald',
    authorDeathYear: 1905,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Retold for children; plot follows the public-domain original with frightening detail softened. Published 1872; US public domain (pre-1929) and worldwide (MacDonald d. 1905, 70y pma expired).',
  },
}
