import type { PackBook } from '../types'

/**
 * Nursery Rhymes · Bedtime Verses — six classic English nursery rhymes for ages 3-5.
 * Sources: "Twinkle, Twinkle, Little Star" (Jane Taylor, d. 1824, The Star, 1806);
 * "Mary Had a Little Lamb" (Sarah Josepha Hale, d. 1879, 1830); "Humpty Dumpty",
 * "Baa, Baa, Black Sheep" (1744), "Jack Be Nimble", "Star Light, Star Bright" —
 * traditional rhymes first printed in the 18th–19th centuries. All public domain.
 * Chinese glosses written by the platform.
 */
export const nurseryBedtime: PackBook = {
  id: 'nursery-bedtime',
  title: 'Nursery Rhymes · 晚安童谣',
  author: 'Jane Taylor / Sarah Hale / traditional',
  lang: 'en',
  category: 'poetry',
  ageStage: '3-5',
  intro: 'Twinkle twinkle little star… 六首英语世界传了几百年的晚安童谣，短、押韵、好上口。',
  coverArt: 'star-lamb-night',
  coverArtPrompt: 'a gentle night scene with a fluffy white lamb sitting on a grassy hill under a big smiling star and crescent moon, soft watercolor children book style, warm colors',
  coverFrom: '#B9835C',
  coverTo: '#F6E2D6',
  source: 'Public domain English nursery rhymes (pre-1930 printings)',
  chapters: [
    {
      title: 'Twinkle, Twinkle, Little Star',
      art: 'twinkle-star',
      artPrompt: 'a big golden star twinkling above a sleeping village, tiny child at the window looking up, watercolor bedtime style',
      blocks: [
        {
          kind: 'poem',
          text: 'Twinkle, twinkle, little star,\nHow I wonder what you are!\nUp above the world so high,\nLike a diamond in the sky.\nTwinkle, twinkle, little star,\nHow I wonder what you are!',
          translation: '一闪一闪小星星，你到底是什么呀？挂在天空那么高，像颗钻石亮晶晶。一闪一闪小星星，你到底是什么呀？',
        },
        {
          kind: 'note',
          text: 'New word: twinkle — to shine on and off, on and off, like a star.（一闪一闪）This poem was written by Jane Taylor more than two hundred years ago. Find the word "star" — can you spot it twice?',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'twinkle-star',
          text: 'A little star twinkles above the sleeping village. 小星星在村庄上面眨眼睛。',
        },
      ],
    },
    {
      title: 'Mary Had a Little Lamb',
      art: 'mary-lamb',
      artPrompt: 'a little white lamb following a girl in a bonnet to a small red schoolhouse, spring flowers along the path, storybook watercolor',
      blocks: [
        {
          kind: 'poem',
          text: 'Mary had a little lamb,\nIts fleece was white as snow;\nAnd everywhere that Mary went,\nThe lamb was sure to go.\nIt followed her to school one day,\nWhich was against the rule;\nIt made the children laugh and play,\nTo see a lamb at school.',
          translation: '玛丽有只小羊羔，它的毛像雪一样白。玛丽走到哪里，小羊羔一定跟到哪里。有一天它跟去了学校，这可是违反规定的；孩子们看见学校里来了一只小羊，都笑呀玩呀乐开了花。',
        },
        {
          kind: 'note',
          text: 'New word: fleece — the woolly coat of a sheep.（羊毛）New word: follow — to go after someone.（跟着）Why was the lamb "sure" to go? Because it loved Mary!',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'mary-lamb',
          text: 'The little lamb follows Mary all the way to school. 小羊一路跟着玛丽去学校。',
        },
      ],
    },
    {
      title: 'Humpty Dumpty',
      art: 'humpty-wall',
      artPrompt: 'a cute round egg character with a gentle smile sitting on a low brick garden wall, tiny toy horses nearby, soft afternoon light, nothing scary',
      blocks: [
        {
          kind: 'poem',
          text: 'Humpty Dumpty sat on a wall,\nHumpty Dumpty had a great fall.\nAll the king\'s horses and all the king\'s men\nCouldn\'t put Humpty together again.',
          translation: '矮胖子坐在墙头上，矮胖子摔了一大跤。国王的马儿全来了，国王的士兵全来了，也没法把矮胖子拼回原来的样。',
        },
        {
          kind: 'note',
          text: 'New word: fall — to drop down suddenly.（跌落）Humpty Dumpty is an egg — that\'s why he can\'t be put together! What sits on a wall and rolls? A round egg, of course.',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'humpty-wall',
          text: 'Humpty sits on the garden wall. 矮胖子坐在花园的墙头上。',
        },
      ],
    },
    {
      title: 'Baa, Baa, Black Sheep',
      art: 'black-sheep-bags',
      artPrompt: 'a fluffy black sheep standing beside three wool bags in different sizes on a green meadow, a small cart nearby, cheerful storybook style',
      blocks: [
        {
          kind: 'poem',
          text: 'Baa, baa, black sheep,\nHave you any wool?\nYes sir, yes sir,\nThree bags full.\nOne for the master,\nAnd one for the dame,\nAnd one for the little boy\nWho lives down the lane.',
          translation: '咩，咩，黑绵羊，你有羊毛吗？有的有的，先生，我有整整三袋呢。一袋给主人，一袋给夫人，还有一袋，送给小巷尽头住着的小男孩。',
        },
        {
          kind: 'note',
          text: 'New word: wool — the soft hair of a sheep, used to make warm clothes.（羊毛线）Count the bags: one, two, three! How many bags are full?',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'black-sheep-bags',
          text: 'The black sheep shares its three bags of wool. 黑绵羊分它的三袋羊毛。',
        },
      ],
    },
    {
      title: 'Jack Be Nimble',
      art: 'jack-candle',
      artPrompt: 'a cheerful boy in old-fashioned clothes leaping over a candlestick on the floor, sparks of warm light, cozy room, playful storybook style',
      blocks: [
        {
          kind: 'poem',
          text: 'Jack be nimble,\nJack be quick,\nJack jump over\nThe candlestick.',
          translation: '杰克，灵活点，杰克，快快的，杰克跳过去——跳过那烛台！',
        },
        {
          kind: 'note',
          text: 'New word: nimble — quick and light in moving.（灵活的、敏捷的）It\'s a jumping rhyme! Say it while clapping: nimble-quick-candlestick — can you hear how they rhyme?',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'jack-candle',
          text: 'Jack jumps over the candlestick — whee! 杰克跳过了烛台，飞起来啦！',
        },
      ],
    },
    {
      title: 'Star Light, Star Bright',
      art: 'first-star-wish',
      artPrompt: 'a child at an open window at dusk making a wish on the first bright star in a deep blue-pink sky, cozy blanket, gentle watercolor night scene',
      blocks: [
        {
          kind: 'poem',
          text: 'Star light, star bright,\nFirst star I see tonight;\nI wish I may,\nI wish I might,\nHave this wish I wish tonight.',
          translation: '星星亮，星星闪，今晚我看见的第一颗星；愿我许的愿，今晚的心愿，都能实现。',
        },
        {
          kind: 'note',
          text: 'New word: wish — something you hope for very much.（愿望）This is a bedtime rhyme from long, long ago. What would you wish on the first star tonight?',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'first-star-wish',
          text: 'The first star of the night hears a little wish. 夜里的第一颗星星听见了小小的愿望。',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Nursery Rhymes · Bedtime Verses (six rhymes)',
    author: 'Jane Taylor (d. 1824), Sarah Josepha Hale (d. 1879), traditional',
    authorDeathYear: 1879,
    jurisdiction: 'US',
    basis: 'pd-us',
    sourceUrl: 'https://www.gutenberg.org',
    note: 'Twinkle (Taylor, 1806) and Mary (Hale, 1830) pre-date all US copyright; Humpty Dumpty, Baa Baa Black Sheep (1744), Jack Be Nimble, Star Light are traditional rhymes in the public domain; Chinese glosses by the platform',
  },
}
