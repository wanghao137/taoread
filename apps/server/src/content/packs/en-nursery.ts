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
    {
      title: 'Jack and Jill',
      art: 'nursery-bedtime:ch7',
      artPrompt: 'two children in old-fashioned clothes climbing a grassy hill with a wooden pail, one tumbling down in a heap of laughter, a little cottage at the bottom, sunny storybook watercolor',
      blocks: [
        {
          kind: 'poem',
          text: 'Jack and Jill went up the hill,\nTo fetch a pail of water.\nJack fell down and broke his crown,\nAnd Jill came tumbling after.\n\nUp Jack got, and home did trot,\nAs fast as he could caper,\nHe went to bed to mend his head,\nWith vinegar and brown paper.',
          translation: '杰克和吉尔爬上山，去提一桶水。杰克摔了一跤，磕破了脑袋瓜；吉尔跟在后面，也骨碌碌滚下来。杰克爬起来，一路小跑回了家，用醋和牛皮纸把脑袋包好，赶紧躺上了床。',
        },
        {
          kind: 'note',
          text: 'New word: fetch — to go and get something and bring it back.（去取）New word: crown — the top of the head.（头顶）Here "crown" means the top of Jack\'s head, not a king\'s hat!',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'nursery-bedtime:ch7',
          text: 'Jack and Jill tumble down the hill. 杰克和吉尔从山上滚下来。',
        },
      ],
    },
    {
      title: 'Hickory Dickory Dock',
      art: 'nursery-bedtime:ch8',
      artPrompt: 'a little grey mouse running up the face of a tall grandfather clock, the clock hands pointing to one, cozy hallway with a warm lamp, playful storybook watercolor',
      blocks: [
        {
          kind: 'poem',
          text: 'Hickory dickory dock.\nThe mouse ran up the clock.\nThe clock struck one,\nThe mouse ran down,\nHickory dickory dock.',
          translation: '滴答滴答咚，小老鼠爬上了大挂钟。钟敲了一下，小老鼠吓了一跳，跑了下来。滴答滴答咚。',
        },
        {
          kind: 'note',
          text: 'New word: clock — a machine that tells the time.（时钟）New word: strike — (of a clock) to make its sound for the hour.（报时）The clock struck ONE, so down ran the mouse. What time is YOUR clock at bedtime?',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'nursery-bedtime:ch8',
          text: 'The mouse runs up and down the big clock. 小老鼠在大挂钟上爬上爬下。',
        },
      ],
    },
    {
      title: 'Little Miss Muffet',
      art: 'nursery-bedtime:ch9',
      artPrompt: 'a little girl in a bonnet sitting on a small grassy mound eating from a bowl, a friendly spider sitting down politely beside her, garden flowers all around, cheerful storybook watercolor',
      blocks: [
        {
          kind: 'poem',
          text: 'Little Miss Muffet\nSat on a tuffet,\nEating her curds and whey;\nAlong came a spider,\nWho sat down beside her\nAnd frightened Miss Muffet away.',
          translation: '玛菲特小姑娘，坐在小草墩上，吃着她的凝乳和乳浆。一只蜘蛛爬过来，坐在她身旁，把玛菲特小姑娘吓得跑光光。',
        },
        {
          kind: 'note',
          text: 'New word: tuffet — a small grassy mound or low seat.（草墩）New word: curds and whey — a soft food like cottage cheese.（凝乳）Muffet-tuffet and whey-away: the rhymes hold hands across the lines. Can you hear them?',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'nursery-bedtime:ch9',
          text: 'A spider sits down beside Little Miss Muffet. 蜘蛛坐到了玛菲特小姑娘身旁。',
        },
      ],
    },
    {
      title: 'Hey Diddle Diddle',
      art: 'nursery-bedtime:ch10',
      artPrompt: 'a cow leaping gracefully over a smiling crescent moon while a cat plays a fiddle below, a little dog laughing and a dish running away hand in hand with a spoon, starry night, funny storybook watercolor',
      blocks: [
        {
          kind: 'poem',
          text: 'Hey diddle diddle,\nThe cat and the fiddle,\nThe cow jumped over the moon.\nThe little dog laughed to see such sport,\nAnd the dish ran away with the spoon.',
          translation: '嗨，滴滴答，猫咪拉起了小提琴，奶牛跳过了月亮。小狗看了哈哈笑，盘子拉着汤匙跑掉了。',
        },
        {
          kind: 'note',
          text: 'New word: fiddle — a violin.（小提琴）New word: sport — fun and games.（玩乐）A cow cannot jump over the moon — that is why this is called a nonsense rhyme! Which picture makes you laugh most?',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'nursery-bedtime:ch10',
          text: 'The cow jumps over the moon while the cat plays the fiddle. 奶牛跳过月亮，猫咪拉着小提琴。',
        },
      ],
    },
    {
      title: 'Little Bo-Peep',
      art: 'nursery-bedtime:ch11',
      artPrompt: 'a little shepherdess with a crook and ribbons searching a green meadow, her fluffy sheep walking home in a line wagging their tails, soft evening light, gentle storybook watercolor',
      blocks: [
        {
          kind: 'poem',
          text: 'Little Bo-Peep has lost her sheep,\nAnd can\'t tell where to find them;\nLeave them alone,\nAnd they\'ll come home,\nWagging their tails behind them.',
          translation: '小牧羊女波碧丢了羊，不知道去哪儿找。别着急，不用管，羊儿自己会回家，尾巴摇呀摇。',
        },
        {
          kind: 'note',
          text: 'New word: wag — to move from side to side.（摇摆）Who has lost the sheep? Little Bo-Peep! Say her name slowly: Bo-Peep — can you hear a sheep hiding inside it?',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'nursery-bedtime:ch11',
          text: 'The sheep come home wagging their tails. 羊儿们摇着尾巴回家了。',
        },
      ],
    },
    {
      title: 'One, Two, Buckle My Shoe',
      art: 'nursery-bedtime:ch12',
      artPrompt: 'a counting rhyme spread: a small shoe with a shiny buckle, a little door being knocked, scattered sticks laid in a row, and a big fat hen at the end, bright cheerful storybook watercolor',
      blocks: [
        {
          kind: 'poem',
          text: 'One, two,\nBuckle my shoe;\nThree, four,\nKnock at the door;\nFive, six,\nPick up sticks;\nSeven, eight,\nLay them straight;\nNine, ten,\nA big fat hen.',
          translation: '一、二，扣上我的鞋；三、四，敲敲门；五、六，捡小棍；七、八，摆摆正；九、十，一只肥母鸡。',
        },
        {
          kind: 'note',
          text: 'New word: buckle — to fasten with a clip.（扣好）New word: stick — a small piece of wood.（小棍）This is a counting rhyme! Hold up your fingers and count from one to ten while you say it.',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'nursery-bedtime:ch12',
          text: 'Counting from one to ten, from shoes to a big fat hen. 从一数到十，从鞋子数到大母鸡。',
        },
      ],
    },
    {
      title: 'Row, Row, Row Your Boat',
      art: 'nursery-bedtime:ch13',
      artPrompt: 'a small rowing boat gliding gently down a sparkling stream, a happy child rowing, willow trees and dragonflies along the banks, dreamy soft watercolor',
      blocks: [
        {
          kind: 'poem',
          text: 'Row, row, row your boat,\nGently down the stream.\nMerrily, merrily, merrily, merrily,\nLife is but a dream.',
          translation: '划，划，划小船，轻轻地顺着小溪漂。快活呀，快活呀，快活呀快活呀，生活就像一场梦。',
        },
        {
          kind: 'note',
          text: 'New word: row — to move a boat with oars.（划船）New word: merrily — in a happy way.（快活地）This is a round song: when your friends finish singing "row, row, row", they start again behind you. Try it with someone!',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'nursery-bedtime:ch13',
          text: 'A little boat rows gently down the dreamy stream. 小船轻轻地漂在梦一样的小溪里。',
        },
      ],
    },
    {
      title: 'Three Blind Mice',
      art: 'nursery-bedtime:ch14',
      artPrompt: 'three little grey mice running in a lively line across a farmyard, their little tails in the air, a farmhouse and a carving knife on a distant windowsill, nothing scary, funny storybook watercolor',
      blocks: [
        {
          kind: 'poem',
          text: 'Three blind mice, three blind mice,\nSee how they run, see how they run!\nThey all ran after the farmer\'s wife,\nWho cut off their tails with a carving knife,\nDid you ever see such a thing in your life,\nAs three blind mice?',
          translation: '三只瞎老鼠，三只瞎老鼠，看它们跑，看它们跑！它们一起追农夫的老婆，她用切肉刀割掉了它们的尾巴。你一辈子见过这样的事吗——三只瞎老鼠？',
        },
        {
          kind: 'note',
          text: 'New word: blind — not able to see.（看不见的）New word: carving knife — a long knife for cutting meat.（切肉刀）This old rhyme is a tiny bit scary — old rhymes often are! Say it fast three times: three blind mice!',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'nursery-bedtime:ch14',
          text: 'Three little mice run, run, run. 三只小老鼠跑呀跑。',
        },
      ],
    },
    {
      title: 'Little Jack Horner',
      art: 'nursery-bedtime:ch15',
      artPrompt: 'a little boy in a corner seat by a Christmas tree, thumb in a big golden pie, a shiny purple plum held up proudly, holly and candles around, warm cozy storybook watercolor',
      blocks: [
        {
          kind: 'poem',
          text: 'Little Jack Horner\nSat in the corner,\nEating a Christmas pie;\nHe put in his thumb,\nAnd pulled out a plum,\nAnd said, \'What a good boy am I!\'',
          translation: '小杰克·霍纳，坐在墙角落，吃着一只圣诞派；他把大拇指伸进去，掏出一颗甜李子，说：「我是个多棒的孩子呀！」',
        },
        {
          kind: 'note',
          text: 'New word: pie — a baked food with a pastry top.（馅饼）New word: plum — a sweet, juicy purple fruit.（李子）"What a good boy am I!" — do you think Jack is praising himself just a little too much?',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'nursery-bedtime:ch15',
          text: 'Little Jack Horner pulls a plum from the pie. 小杰克从馅饼里掏出一颗李子。',
        },
      ],
    },
    {
      title: 'London Bridge',
      art: 'nursery-bedtime:ch16',
      artPrompt: 'an old stone bridge over a wide river wobbling and tipping, little boats below and children playing an arch game with their arms on the bank, playful storybook watercolor',
      blocks: [
        {
          kind: 'poem',
          text: 'London Bridge is falling down,\nFalling down, falling down.\nLondon Bridge is falling down,\nMy fair lady.',
          translation: '伦敦桥要塌下来，塌下来，塌下来。伦敦桥要塌下来，我美丽的女士。',
        },
        {
          kind: 'note',
          text: 'New word: bridge — a road over a river.（桥）This rhyme is a game too! Two people hold their arms up like a bridge, and everyone walks under until the arms come down and catch somebody. Have you played it?',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'nursery-bedtime:ch16',
          text: 'London Bridge wobbles over the river. 伦敦桥在河上摇摇晃晃。',
        },
      ],
    },
    {
      title: 'Bye, Baby Bunting',
      art: 'nursery-bedtime:ch17',
      artPrompt: 'a tiny baby wrapped snug in a soft rabbit-fur blanket in a wooden cradle by lamplight, a father with a hunting bag at the cottage door, moonrise outside, tender bedtime watercolor',
      blocks: [
        {
          kind: 'poem',
          text: 'Bye, baby bunting,\nDaddy\'s gone a-hunting,\nGone to get a rabbit skin\nTo wrap his baby bunting in.',
          translation: '睡吧，小宝贝，爸爸打猎去了，去取一张小兔皮，好把他的小宝贝裹起来。',
        },
        {
          kind: 'note',
          text: 'New word: bunting — a little, cuddly thing; here it means a dear little baby.（小宝贝）This is a lullaby — a song for falling asleep. Sing it softly, slower and slower...',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'nursery-bedtime:ch17',
          text: 'Baby bunting is wrapped up snug and warm. 小宝贝被裹得暖暖的。',
        },
      ],
    },
    {
      title: 'Rock-a-Bye Baby',
      art: 'nursery-bedtime:ch18',
      artPrompt: 'a little cradle hanging from the branch of a tall leafy tree, swinging gently in the breeze under a soft evening sky, leaves and ribbons stirring, dreamy bedtime watercolor',
      blocks: [
        {
          kind: 'poem',
          text: 'Rock-a-bye baby, on the treetop,\nWhen the wind blows, the cradle will rock;\nWhen the bough breaks, the cradle will fall,\nAnd down will come baby, cradle and all.',
          translation: '摇啊摇，小宝宝，摇篮挂在树梢上。风儿吹，摇篮摇。树枝断了摇篮掉，宝宝连着摇篮，一起往下掉。',
        },
        {
          kind: 'note',
          text: 'New word: cradle — a small bed for a baby.（摇篮）New word: bough — a big tree branch.（大树枝）Who would hang a cradle on a tree? Only a rhyme! Sing it gently and rock your own arms like a cradle.',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'nursery-bedtime:ch18',
          text: 'A cradle rocks gently on the treetop in the wind. 摇篮在树梢上随风轻轻摇。',
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
