import type { PackBook } from '../types'

/**
 * A Little Princess — six chapters retold in simple English for young readers.
 * Original: Frances Hodgson Burnett, published 1905 (expanded from the 1888 novella
 * "Sara Crewe"). Public domain in the US (pre-1929) and worldwide (Burnett died 1924;
 * 70y pma expired). Plot follows the original novel (Miss Minchin's school, Becky, the
 * Indian gentleman next door, the bun-shop, and Sara's restoration); wording simplified
 * into short sentences for children aged 6-8.
 */
export const littlePrincess: PackBook = {
  id: 'tale-littleprincess',
  title: 'A Little Princess',
  author: 'Frances Hodgson Burnett',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'Sara Crewe has everything - fine dresses, a pony, and a doll named Emily. Then one terrible day her father dies, and Sara must work in the school attic. But a princess is a princess, even in rags.',
  coverArt: 'little-princess-cover',
  coverArtPrompt: 'a little girl with black hair and big green eyes in a fine velvet dress and fur-trimmed cloak, holding a doll with a yellow silk parasol, a tall London boarding-school house behind her in the snow',
  coverFrom: '#6A1B9A',
  coverTo: '#CE93D8',
  source: 'Project Gutenberg eBook #146, public domain (Burnett d. 1924)',
  chapters: [
    {
      title: 'Chapter 1 · Sara Arrives',
      art: 'sara-london-cab',
      artPrompt: 'a hansom cab drawn up before a tall grey London seminary house with brass plate "MISS MINCHIN\'S SELECT SEMINARY FOR YOUNG LADIES", a little girl in a fur-trimmed cloak climbing down with a French doll, an Indian man in a turban and a tall English gentleman on the pavement',
      blocks: [
        {
          kind: 'text',
          text: 'Once on a dark winter\'s day, a little girl with queer, old-fashioned eyes sat in a cab with her father, driving through the streets of London. Her name was Sara Crewe, and her father, Captain Crewe, loved her more than anything else in the world.',
        },
        {
          kind: 'image',
          art: 'sara-arrives-london',
          text: 'Sara arrives at Miss Minchin\'s school with her father and her doll Emily.',
        },
        {
          kind: 'text',
          text: '"Sara," said Captain Crewe, "I am going to leave you at school in London. I must sail back to India. Are you sorry?" Sara looked up at him with her big green eyes. "I shall be sorry to leave you," she said, "but I shall like to learn, and I shall pretend I am a princess, so I must be brave."',
        },
        {
          kind: 'note',
          text: 'New word: seminary — an old-fashioned name for a school for girls. Miss Minchin\'s was a very grand and very strict one.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Miss Minchin swept down the stairs in her best silk dress. Captain Crewe had given her a great deal of money, so Sara was to have the finest room, the prettiest clothes, and a pony and carriage of her own. "Sara is a very clever child," he said. "And she has such a strong imagination."',
        },
        {
          kind: 'text',
          text: 'Before he sailed away, Captain Crewe took Sara to a shop and bought her a beautiful French doll with real hair and a yellow silk parasol. "Her name is Emily," said Sara. "She is my last doll, and she will listen to all my secrets." Then her father kissed her and sailed for India, and Sara was left at Miss Minchin\'s.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Birthday and the Bad News',
      art: 'sara-birthday-table',
      artPrompt: 'a long schoolroom table laid with a big iced birthday cake and little cakes and candles, a little girl in a pink silk dress and pink slippers standing beside it, other girls in white pinafores clapping, a stern woman in black at the door',
      blocks: [
        {
          kind: 'text',
          text: 'For two years Sara was the show pupil of the seminary. She was bright at her lessons, she was never rude, and she always told wonderful stories. The other girls loved to hear her tales of princes and tigers and far-away palaces, and Ermengarde and Lottie would sit at her feet.',
        },
        {
          kind: 'image',
          art: 'birthday-feast',
          text: 'The table is laid for Sara\'s eleventh birthday feast.',
        },
        {
          kind: 'text',
          text: 'When Sara\'s eleventh birthday came, Miss Minchin gave her a grand feast. The table was loaded with little cakes and a great iced birthday cake with pink icing. Sara wore a pink silk dress and pink slippers, and she was very happy - for that morning a letter had come from her father in India.',
        },
        {
          kind: 'note',
          text: 'New word: feast — a very grand and plentiful meal, much better than an ordinary dinner.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'But in the middle of the feast the door opened, and Miss Minchin came in with a strange man. Her face was white and hard. "The feast is ended," she said. "Captain Crewe is dead - dead of a jungle fever. And he has left no money. Nothing at all. The diamond mines were a failure."',
        },
        {
          kind: 'text',
          text: 'Sara stood quite still. The pink slippers and the pink silk dress seemed to belong to someone else, in another life. "You have no friends and no home," said Miss Minchin, "and you owe me money. You will stay here, but you shall earn your bread as a servant, or I will turn you out into the street."',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Attic and Becky',
      art: 'sara-attic-fire',
      artPrompt: 'a cold bare attic room under the eaves with a sloping roof and a small grimy window, a thin mattress on an iron bedstead, a black iron stove with a tiny fire, two girls in patched dresses sitting on the floor sharing a piece of bread',
      blocks: [
        {
          kind: 'text',
          text: 'So Sara left her pretty room, and Emily, and her fine clothes, and went to live in the cold attic at the top of the house. She wore a black cotton dress and old shoes, and she ran errands in the rain and taught the smaller girls their lessons.',
        },
        {
          kind: 'image',
          art: 'attic-becky',
          text: 'Sara and Becky share their bread in the cold attic at the top of the house.',
        },
        {
          kind: 'text',
          text: 'There she found a friend. Becky was the scullery-maid - a stunted, awkward girl with a big face and big feet, who scrubbed the kitchen floors from morning to night. Becky had been afraid even to speak to the show pupil, but Sara smiled at her and shared her bread.',
        },
        {
          kind: 'note',
          text: 'New word: scullery-maid — the lowest servant in a great house, who scrubbed pots and floors and carried coal all day long.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'In the long winter evenings the two girls sat together by the failing fire, and Sara told Becky stories of the Bastille, and of prisoners who kept their courage when everything was taken from them. "We are prisoners in the Bastille," whispered Sara, "and we shall escape one day. A princess is always a princess, even in rags."',
        },
        {
          kind: 'text',
          text: 'When she was cold and hungry, Sara would stand at the grimy attic window and look at the houses opposite, and imagine what the people inside were doing. It was her way of forgetting the ache in her heart and the emptiness in her stomach.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Indian Gentleman Next Door',
      art: 'next-door-window',
      artPrompt: 'the warmly lit window of the house next door, a sick gentleman with a dark sad face lying on a sofa wrapped in a shawl, an Indian man in a white turban tending a bright fire, a little monkey on the mantelpiece, a girl watching from a rooftop window',
      blocks: [
        {
          kind: 'text',
          text: 'The house next door to the seminary had been empty for years. But one day a great carriage drew up, and a gentleman was carried in on a litter - an Indian gentleman, with a thin, dark, sorrowful face. He was very ill and very unhappy.',
        },
        {
          kind: 'image',
          art: 'indian-gentleman',
          text: 'The Indian gentleman lies ill next door, and Sara watches from the roof.',
        },
        {
          kind: 'text',
          text: 'Sara climbed out on the leads of the attic roof to see him better. A little monkey in his room chattered at her, and an Indian servant in a white turban brought her food and called her "Missee Sahib." When she was caught in the rain, she was sent down to the house to speak to the gentleman.',
        },
        {
          kind: 'note',
          text: 'New word: litter — a kind of light bed on poles, used to carry a person who is too ill to walk.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The gentleman was Mr. Carrisford, and his servant Ram Dass was very kind to Sara. But Sara did not know - and Mr. Carrisford did not know - that he was looking for her! He had been Captain Crewe\'s best friend, and he had searched all India and all London for his friend\'s lost little girl.',
        },
        {
          kind: 'text',
          text: 'From that day, strange and wonderful things began to happen in Sara\'s cold attic. When she came home tired, she would find a warm bright fire, a soft new blanket, hot soup and bread and little cakes - and Emily sitting among them, as if by magic.',
        },
      ],
    },
    {
      title: 'Chapter 5 · The Bun-Shop',
      art: 'rainy-bun-shop',
      artPrompt: 'a London street in drizzling rain, a bun-shop window full of golden buns, a hungry barefoot girl pressing her face to the glass, a plump kind woman in an apron holding out a paper bag of hot buns, six buns in a row on the counter',
      blocks: [
        {
          kind: 'text',
          text: 'One very cold and wet afternoon, Sara was sent out on an errand with only sixpence in her pocket. She had had nothing to eat all day. The rain ran down her thin shawl, and her old shoes let in the water at every step.',
        },
        {
          kind: 'image',
          art: 'bun-shop-kindness',
          text: 'Sara presses her nose to the bun-shop window, and the kind baker watches her.',
        },
        {
          kind: 'text',
          text: 'Then she saw the bun-shop. In the window were rows and rows of hot buns, golden and puffy, with raisins on top. Sara pressed her nose against the glass, and her mouth watered, and she counted her sixpence again and again.',
        },
        {
          kind: 'note',
          text: 'New word: sixpence — a small old English silver coin. It was enough for six buns, and six buns were a feast.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Sara went in and bought six buns. Outside, in the wet street, she saw a beggar-girl, smaller and thinner and hungrier than herself. Sara stopped. "I am so hungry," she said to herself, "but she is hungrier." And she gave the girl five of her six buns.',
        },
        {
          kind: 'text',
          text: 'The kind baker-woman watched from the door. "Here, child," she called, and she gave Sara six more buns for nothing. Sara ate her one bun slowly, and it was the best thing she had ever tasted. Even in the rain, her heart was warm.',
        },
      ],
    },
    {
      title: 'Chapter 6 · Found Again',
      art: 'sara-restored',
      artPrompt: 'a richly furnished room with a bright fire, a little girl in ragged black cotton dress being embraced by a gentleman in a dressing gown, a doll in a yellow parasol and a little monkey and a plump woman with a bag of buns looking on with joy',
      blocks: [
        {
          kind: 'text',
          text: 'Sara could not understand the magic in her attic. The blankets and the food kept coming, and she shared them with Becky, and they were both warmer and stronger every day. But she did not guess that Ram Dass had climbed over the roof, by Mr. Carrisford\'s orders, to bring them.',
        },
        {
          kind: 'image',
          art: 'sara-found-again',
          text: 'Mr. Carrisford takes Sara in his arms - he has found Captain Crewe\'s little girl at last.',
        },
        {
          kind: 'text',
          text: 'One morning Miss Minchin came storming up the attic stairs. She had heard of the warm fire and the good food, and she was furious. She seized Sara by the shoulder. "You ungrateful, wicked child! You have been stealing and telling lies! You shall be turned out into the street!"',
        },
        {
          kind: 'note',
          text: 'New word: furious — far more angry than cross; so angry you can hardly speak.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Then the door opened, and Mr. Carrisford himself stood there. "She is not a liar," he said, in a voice that made Miss Minchin step back. "She is Captain Crewe\'s daughter - the child I have searched the world for. The diamond mines are not empty. They are rich. Sara is heiress to a great fortune."',
        },
        {
          kind: 'text',
          text: 'Miss Minchin could not speak. Sara went to live next door with the Indian gentleman, who loved her as her father had. She took Becky with her as her own friend and companion, she bought buns for the poor children of the street, and she was always - princess or beggar - the kindest girl in London.',
        },
      ],
    },
    {
      title: 'Chapter 7 · Little Lottie',
      art: 'lottie-schoolroom',
      artPrompt: 'a tall Victorian schoolroom with maps on the walls, a tiny four-year-old girl in a red pinafore lying on the floor kicking and screaming, older girls covering their ears, a dark-haired girl with big green eyes sitting down quietly beside her on the floor',
      blocks: [
        {
          kind: 'text',
          text: 'Of all the little girls at Miss Minchin\'s, none cried louder than Lottie Legh. She was four years old, she had lost her mother, and when anything went wrong she flung herself on the schoolroom floor and screamed till the walls rang. The teachers could do nothing at all with her.',
        },
        {
          kind: 'image',
          art: 'sara-lottie-floor',
          text: 'Sara sits down beside the screaming Lottie, quiet as a queen.',
        },
        {
          kind: 'note',
          text: 'New word: adopt — to take someone into your heart and into your family, and love them as your own forever.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'One day, in the middle of the loudest tantrum ever heard, Sara sat down quietly on the floor beside her. "Lottie," she said, "if you cry and scream, you cannot hear my story." The little girl\'s sobs grew smaller and smaller. "I have no mamma either," Sara went on softly. "So I shall adopt you, and be your mamma, and tell you stories every single day." And Lottie stopped crying and put her arms round Sara\'s neck.',
        },
        {
          kind: 'text',
          text: 'From that day Lottie followed Sara everywhere and called her "my own mamma," and Sara drove her tears away with tales of princes and angels and far-off palaces. "You must be a princess too," said Sara. "Princesses do not scream, even when they are sad." And Lottie believed every word - for with Sara, the pretending always came true.',
        },
      ],
    },
    {
      title: 'Chapter 8 · The Feast in the Attic',
      art: 'attic-feast-night',
      artPrompt: 'a candle-lit attic under the eaves at night, four girls sitting round an open hamper on the floor with buns and tarts and a big jam cake, blankets on their shoulders, a small black stove glowing, one girl laughing with her head thrown back',
      blocks: [
        {
          kind: 'text',
          text: 'One rainy evening Ermengarde climbed up to the attic, staggering under a heavy hamper. It was packed with good things - a pot of meat, buns and tarts, and a great jam cake. "Let us have a feast," she said, "a real one, this very night." So Sara fetched Becky in from behind her curtain, and Lottie came too, and they made a palace of the Bastille.',
        },
        {
          kind: 'image',
          art: 'ermengarde-basket',
          text: 'Ermengarde opens the hamper, and there is a feast in the Bastille.',
        },
        {
          kind: 'note',
          text: 'New word: hamper — a big covered basket, packed so full of good food that the lid can hardly shut.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'But laughter carries in an old house. Miss Minchin flew up the stairs and burst in upon the feast. "What is the meaning of this? Extravagant, wicked children! And Becky - upstairs from the kitchen!" Becky shrank into her corner, and Lottie began to cry. Then Ermengarde stood up, red and stammering, but brave. "The feast is mine," she said. "I brought the basket. Sara is the cleverest girl in this school and my best friend, and if you are cruel to her, I shall tell my papa and never come back."',
        },
        {
          kind: 'text',
          text: 'Miss Minchin drew back a step, for Ermengarde\'s papa paid well for his daughter\'s schooling. The feast was cleared away, but nobody could take away what the friends had found. And Sara, in her ragged black dress, sat by the stove that night and smiled to herself. A princess keeps her feast in her heart, she thought - even when the candles are blown out.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'A Little Princess',
    author: 'Frances Hodgson Burnett',
    authorDeathYear: 1924,
    jurisdiction: 'US',
    basis: 'pd-us',
    sourceUrl: 'https://www.gutenberg.org/ebooks/146',
    note: 'Retold in simple English; plot follows the public-domain original.',
  },
}
