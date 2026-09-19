import type { PackBook } from '../types'

/**
 * Wynken, Blynken, and Nod — five bedtime poems by Eugene Field (1850–1895),
 * for ages 3–5. Text: "Poems of Childhood", Project Gutenberg eBook #75578,
 * quoted verbatim (only the long "Sugar-Plum Tree" and "The Duel" are trimmed
 * for bedtime length). Field died in 1895; the poems are public domain in the
 * US (pre-1929) and worldwide (70y pma expired). Chinese glosses written by
 * the platform.
 */
export const wynkenBlynken: PackBook = {
  id: 'en-wynken',
  title: 'Wynken, Blynken, and Nod · 摇篮曲',
  author: 'Eugene Field',
  lang: 'en',
  category: 'poetry',
  ageStage: '3-5',
  intro: 'Wynken, Blynken, and Nod one night sailed off in a wooden shoe... 美国童诗之父尤金·菲尔德的五首睡前诗：三个钓鱼的小人儿、糖果树、小蓝孩、吵架的方格狗和碎花猫，还有送梦的摇摆夫人。',
  coverArt: 'wynken-wooden-shoe-night',
  coverArtPrompt: 'three sleepy children sailing in a big wooden shoe over a river of silver light under a smiling crescent moon and little stars like fish, dreamy watercolor bedtime scene, deep blue and gold',
  coverFrom: '#1F618D',
  coverTo: '#D6EAF8',
  source: 'Poems of Childhood, Project Gutenberg #75578, public domain (Field d. 1895)',
  chapters: [
    {
      title: 'Wynken, Blynken, and Nod · 三个钓鱼的小人儿',
      art: 'wynken-wooden-shoe-sail',
      artPrompt: 'a wooden shoe sailing like a boat on a river of pale crystal light, three tiny fishermen with nets of silver and gold, a big friendly moon laughing overhead and stars swimming like fish, dreamy bedtime watercolor',
      blocks: [
        {
          kind: 'poem',
          text: 'Wynken, Blynken, and Nod one night\nSailed off in a wooden shoe--\nSailed on a river of crystal light,\nInto a sea of dew.\n"Where are you going, and what do you wish?"\nThe old moon asked the three.\n"We have come to fish for the herring fish\nThat live in this beautiful sea;\nNets of silver and gold have we!"\nSaid Wynken,\nBlynken,\nAnd Nod.\n\nThe old moon laughed and sang a song,\nAs they rocked in the wooden shoe,\nAnd the wind that sped them all night long\nRuffled the waves of dew.\nThe little stars were the herring fish\nThat lived in that beautiful sea--\n"Now cast your nets wherever you wish--\nNever afeard are we";\nSo cried the stars to the fishermen three:\nWynken,\nBlynken,\nAnd Nod.\n\nAll night long their nets they threw\nTo the stars in the twinkling foam--\nThen down from the skies came the wooden shoe,\nBringing the fishermen home;\n\'Twas all so pretty a sail it seemed\nAs if it could not be,\nAnd some folks thought \'twas a dream they\'d dreamed\nOf sailing that beautiful sea--\nBut I shall name you the fishermen three:\nWynken,\nBlynken,\nAnd Nod.\n\nWynken and Blynken are two little eyes,\nAnd Nod is a little head,\nAnd the wooden shoe that sailed the skies\nIs a wee one\'s trundle-bed.\nSo shut your eyes while mother sings\nOf wonderful sights that be,\nAnd you shall see the beautiful things\nAs you rock in the misty sea,\nWhere the old shoe rocked the fishermen three:\nWynken,\nBlynken,\nAnd Nod.',
          translation: '有一天夜里，温肯、布林肯和诺德乘着一只木头鞋，顺着水晶般发亮的河水，驶进了露水的海洋。月亮问他们：「你们去哪儿，想钓什么呀？」他们回答：「我们来钓这片美丽大海里的鲱鱼，我们还带着银网和金网呢！」月亮笑了起来，唱起歌，风儿送着小鞋儿整夜航行。原来天上眨眼的小星星，就是海里的鲱鱼！到了早上，木头鞋从天上落下来，把三个钓鱼人送回了家。其实呀——温肯和布林肯是两只小眼睛，诺德是一颗小脑袋，那只会飞的木头鞋，就是宝宝的摇篮床。',
        },
        {
          kind: 'note',
          text: 'New word: sailed — to travel on the water in a boat.（航行）New word: net — a bag of string for catching fish.（网）The secret of the poem is in the very last lines: Wynken and Blynken are eyes, and Nod is a sleepy head. Say the three names fast — Wynken-Blynken-Nod!',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'wooden-shoe-moon-stars',
          text: 'The wooden shoe sails the river of light. 木头鞋在光之河上航行。',
        },
      ],
    },
    {
      title: 'The Sugar-Plum Tree · 糖果树',
      art: 'sugar-plum-tree-garden',
      artPrompt: 'a tall candy tree on the shore of a pink lollipop sea in a dreamy garden at night, sugar-plums and marshmallows and candy canes hanging from the branches, a chocolate cat in the tree and a gingerbread dog below, a child in a white nightcap looking up, sweet storybook art',
      blocks: [
        {
          kind: 'poem',
          text: 'Have you ever heard of the Sugar-Plum Tree?\n\'Tis a marvel of great renown!\nIt blooms on the shore of the Lollipop sea\nIn the garden of Shut-Eye Town;\nThe fruit that it bears is so wondrously sweet\n(As those who have tasted it say)\nThat good little children have only to eat\nOf that fruit to be happy next day.\n\nWhen you\'ve got to the tree, you would have a hard time\nTo capture the fruit which I sing;\nThe tree is so tall that no person could climb\nTo the boughs where the sugar-plums swing!\nBut up in that tree sits a chocolate cat,\nAnd a gingerbread dog prowls below--\nAnd this is the way you contrive to get at\nThose sugar-plums tempting you so:\n\nYou say but the word to that gingerbread dog\nAnd he barks with such terrible zest\nThat the chocolate cat is at once all agog,\nAs her swelling proportions attest.\nAnd the chocolate cat goes cavorting around\nFrom this leafy limb unto that,\nAnd the sugar-plums tumble, of course, to the ground--\nHurrah for that chocolate cat!\n\nThere are marshmallows, gumdrops, and peppermint canes,\nWith stripings of scarlet or gold,\nAnd you carry away of the treasure that rains\nAs much as your apron can hold!\nSo come, little child, cuddle closer to me\nIn your dainty white nightcap and gown,\nAnd I\'ll rock you away to that Sugar-Plum Tree\nIn the garden of Shut-Eye Town.',
          translation: '你听说过糖果树吗？它可有名啦！它开在棒棒糖海边、瞌睡镇花园里，结的果子甜得不得了——好孩子只要吃上一颗，第二天就开开心心。可是树那么高，谁也爬不上去呀。别急——树上坐着一只巧克力猫，树下有一只姜饼狗。你只要对姜饼狗说句话，它就汪汪大叫，巧克力猫吓得在枝条间跳来跳去，糖果就噼里啪啦掉了一地！有棉花糖、橡皮糖，还有红色金色的薄荷拐杖糖，能装多少装多少。来，好孩子，靠在我怀里，我摇着你，摇到瞌睡镇那棵糖果树。',
        },
        {
          kind: 'note',
          text: 'New word: renown — being famous.（出名）New word: contrive — to find a clever way to do something.（想办法）Two silly words hide in this poem: Shut-Eye Town means the place you go when your eyes are shut. What would YOUR candy tree grow?',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'lollipop-sea-tree',
          text: 'The Sugar-Plum Tree in the garden of Shut-Eye Town. 瞌睡镇花园里的糖果树。',
        },
      ],
    },
    {
      title: 'Little Boy Blue · 小蓝孩',
      art: 'little-boy-blue-toys',
      artPrompt: 'a dusty old nursery in afternoon light, a little toy dog standing stiff and a toy soldier with a rusted musket beside a small wooden chair, a trundle-bed with a folded quilt, gentle and wistful storybook scene',
      blocks: [
        {
          kind: 'poem',
          text: 'The little toy dog is covered with dust,\nBut sturdy and staunch he stands;\nAnd the little toy soldier is red with rust,\nAnd his musket moulds in his hands.\nTime was when the little toy dog was new,\nAnd the soldier was passing fair;\nAnd that was the time when our Little Boy Blue\nKissed them and put them there.\n\n"Now, don\'t you go till I come," he said,\n"And don\'t you make any noise!"\nSo, toddling off to his trundle-bed,\nHe dreamt of the pretty toys;\nAnd, as he was dreaming, an angel song\nAwakened our Little Boy Blue--\nOh! the years are many, the years are long,\nBut the little toy friends are true!\n\nAye, faithful to Little Boy Blue they stand,\nEach in the same old place--\nAwaiting the touch of a little hand,\nThe smile of a little face;\nAnd they wonder, as waiting the long years through\nIn the dust of that little chair,\nWhat has become of our Little Boy Blue,\nSince he kissed them and put them there.',
          translation: '小玩具狗落满了灰，可他还直直地站着；小玩具士兵生了锈，手里还握着那把枪。从前小狗是崭新的，士兵也漂亮得很——那时候，小蓝孩亲了亲他们，把他们放在那儿。「我不回来，你们不许走，也不许吵！」他说着，就摇摇晃晃去睡了，梦见了那些好玩的玩具。许多许多年过去了，两个小玩具还守在老地方，等着那只小手再来摸一摸，等着那张小脸再笑一笑。小蓝孩去哪儿了呢？自从他亲了亲他们，把他们放在那儿以后……',
        },
        {
          kind: 'note',
          text: 'New word: staunch — firm and steady, not falling down.（坚定的）New word: rust — the rough red-brown that grows on metal left in the air.（锈）The toy dog and the soldier keep their promise to wait. Do you have a toy that has waited for you a long time?',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'toy-dog-soldier-chair',
          text: 'The toy dog and soldier wait by the little chair. 玩具狗和士兵守在小椅子旁。',
        },
      ],
    },
    {
      title: 'The Duel · 方格狗和碎花猫',
      art: 'gingham-dog-calico-cat',
      artPrompt: 'a gingerbread-coloured gingham-patterned dog and a calico cat wrestling on a kitchen table at midnight, bits of gingham and calico cloth flying, an old Dutch clock covering its face with its hands and a blue Chinese plate wailing, funny and chaotic storybook scene',
      blocks: [
        {
          kind: 'poem',
          text: 'The gingham dog and the calico cat\nSide by side on the table sat;\n\'Twas half-past twelve, and (what do you think!)\nNor one nor t\'other had slept a wink!\nThe old Dutch clock and the Chinese plate\nAppeared to know as sure as fate\nThere was going to be a terrible spat.\n(I wasn\'t there; I simply state\nWhat was told to me by the Chinese plate!)\n\nThe gingham dog went "bow-wow-wow!"\nAnd the calico cat replied "mee-ow!"\nThe air was littered, an hour or so,\nWith bits of gingham and calico,\nWhile the old Dutch clock in the chimney-place\nUp with its hands before its face,\nFor it always dreaded a family row!\n(Now mind: I\'m only telling you\nWhat the old Dutch clock declares is true!)\n\nThe Chinese plate looked very blue,\nAnd wailed, "Oh, dear! what shall we do!"\nBut the gingham dog and the calico cat\nWallowed this way and tumbled that,\nEmploying every tooth and claw\nIn the awfullest way you ever saw--\nAnd, oh! how the gingham and calico flew!\n(Don\'t fancy I exaggerate--\nI got my news from the Chinese plate!)\n\nNext morning, where the two had sat\nThey found no trace of dog or cat;\nAnd some folks think unto this day\nThat burglars stole that pair away!\nBut the truth about the cat and pup\nIs this: they ate each other up!\nNow what do you really think of that!\n(The old Dutch clock it told me so,\nAnd that is how I came to know.)',
          translation: '方格狗和碎花猫并排坐在桌子上。半夜十二点半啦，它俩一眼都没合上！老荷兰钟和中国瓷盘心里明白：准要打一场大架。（我可不在场，这些呀，都是瓷盘告诉我的。）方格狗「汪汪汪」叫，碎花猫「喵呜喵呜」应。满天飞的都是碎布头儿——方格的、碎花的，下了一场布条雨！瓷盘急得直叫：「天哪，怎么办才好！」第二天清早，桌子上狗也不见、猫也不见。有人说是小偷把它们偷走了——可钟爷爷告诉我：它俩啊，你吃了我、我吃了你，一起不见啦！',
        },
        {
          kind: 'note',
          text: 'New word: duel — a fight between two, one against one.（决斗）New word: exaggerate — to make a story bigger than the truth.（夸大）Notice who tells the story: the poet was not there at all — he heard it from the clock and the plate! Which one do you believe?',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'clock-plate-duel',
          text: 'The gingham dog and the calico cat have their duel on the table. 方格狗和碎花猫在桌子上打成一团。',
        },
      ],
    },
    {
      title: 'The Rock-a-By Lady · 送梦的摇摆夫人',
      art: 'rockaby-lady-poppies',
      artPrompt: 'a tall gentle lady in a flowing gown covered from head to foot with drooping poppy flowers, tiptoeing into a nursery where a small child sleeps in a cradle, tiny dreams of drums and trumpets and boats floating around her, soft hush-by night light, tender bedtime watercolor',
      blocks: [
        {
          kind: 'poem',
          text: 'The Rock-a-By Lady from Hushaby street\nComes stealing; comes creeping;\nThe poppies they hang from her head to her feet,\nAnd each hath a dream that is tiny and fleet--\nShe bringeth her poppies to you, my sweet,\nWhen she findeth you sleeping!\n\nThere is one little dream of a beautiful drum--\n"Rub-a-dub!" it goeth;\nThere is one little dream of a big sugar-plum,\nAnd lo! thick and fast the other dreams come\nOf popguns that bang, and tin tops that hum,\nAnd a trumpet that bloweth!\n\nAnd dollies peep out of those wee little dreams\nWith laughter and singing;\nAnd boats go a-floating on silvery streams,\nAnd the stars peek-a-boo with their own misty gleams,\nAnd up, up, and up, where the Mother Moon beams,\nThe fairies go winging!\n\nWould you dream all these dreams that are tiny and fleet?\nThey\'ll come to you sleeping;\nSo shut the two eyes that are weary, my sweet,\nFor the Rock-a-By Lady from Hushaby street,\nWith poppies that hang from her head to her feet,\nComes stealing; comes creeping.',
          translation: '悄悄街来的摇摆夫人，踮着脚尖走啊走。她从头到脚挂满了虞美人花，每一朵里都藏着一个又小又快的梦。她带来一只小鼓的梦——咚咚咚！还有一颗大糖果的梦。然后梦就像下雨一样落下来：啪啪响的玩具枪、嗡嗡转的陀螺、会吹号的喇叭！梦里有小娃娃探头探脑，有银色小溪上的小船，有星星在捉迷藏，还有仙女飞呀飞，一直飞到月亮妈妈的光里。快把疲倦的小眼睛闭上吧，摇摆夫人正踮着脚尖，向你走来。',
        },
        {
          kind: 'note',
          text: 'New word: steal — to move without making any sound.（悄悄地走）New word: fleet — quick and light, soon gone.（转瞬即逝的）Hushaby street is not on any map — it is the street you walk down when you fall asleep. What will your dream be tonight?',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'hushaby-poppies-dreams',
          text: 'The Rock-a-By Lady brings dreams of poppies. 摇摆夫人带着虞美人的梦走来。',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Wynken, Blynken, and Nod (five bedtime poems)',
    author: 'Eugene Field (1850–1895)',
    authorDeathYear: 1895,
    jurisdiction: 'US',
    basis: 'pd-us',
    sourceUrl: 'https://www.gutenberg.org/ebooks/75578',
    note: 'Poems of Childhood; Field died 1895 — protection expired worldwide (70y pma) and US pre-1929. Verses verbatim from Project Gutenberg #75578; "The Sugar-Plum Tree" and "The Duel" kept close to the original with long stanzas lightly trimmed for bedtime length; Chinese glosses by the platform',
  },
}
