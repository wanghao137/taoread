import type { PackBook } from '../types'

/**
 * The Frog Prince — the Grimm brothers' tale, retold for children aged 3-5
 * in four chapters. Source: Project Gutenberg eBook #2591, "Grimm's Fairy
 * Tales" (Jacob & Wilhelm Grimm). The brothers died in 1859 and 1863; public
 * domain in the EU and worldwide under the 70-years-after-death rule (pd-70).
 * Retold in short, easy English, with the spell broken by a kept promise.
 */
export const frogPrince: PackBook = {
  id: 'grimm-frogprince',
  title: 'The Frog Prince',
  author: 'Jacob and Wilhelm Grimm',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: 'A princess drops her favourite golden ball into a deep well. A green frog offers to fetch it — but first she must make him a promise. Will she keep her word?',
  coverArt: 'frog-princess',
  coverArtPrompt: 'a little princess in a pink dress and golden crown sitting on the grass by a stone well, a friendly green frog wearing a tiny crown standing at the edge and looking up at her',
  coverFrom: '#2E7D32',
  coverTo: '#A5D6A7',
  source: 'Project Gutenberg eBook #2591, public domain (Grimm brothers d. 1859/1863)',
  chapters: [
    {
      title: 'Chapter 1 · The Golden Ball',
      art: 'frog-well',
      artPrompt: 'a stone well in a forest with moss on its rim, a golden ball sparkling at the bottom, a green frog sitting on the rim looking down, afternoon sun through the leaves',
      blocks: [
        {
          kind: 'text',
          text: 'Once there was a princess who loved nothing more than her golden ball. Every day she played with it in the dark wood, near the king’s castle, and she threw it higher and higher into the air.',
        },
        {
          kind: 'image',
          art: 'frog-well',
          text: 'The princess drops her golden ball into the deep well.',
        },
        {
          kind: 'note',
          text: 'New word: well — a deep round hole in the ground, where people get fresh water.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'One day the ball flew too far. It rolled to the edge of an old well and fell in — plunk! The well was deep, deep, deep, and the water was cold and dark. The princess sat down on the grass and began to cry.',
        },
        {
          kind: 'text',
          text: 'Then a voice said, "What is the matter, princess? Your tears would move a stone." She looked up — and there on the rim of the well sat a big green frog.',
        },
      ],
    },
    {
      title: 'Chapter 2 · A Promise',
      art: 'frog-promise',
      artPrompt: 'a green frog with a lily pad in hand bowing to a princess by a well, the princess pressing her hand to her heart as she makes a promise, golden sun setting behind the trees',
      blocks: [
        {
          kind: 'text',
          text: '"I can fetch your ball," said the frog. "But what will you give me if I do?" "Anything!" cried the princess. "My dresses, my pearls, my golden crown!"',
        },
        {
          kind: 'image',
          art: 'frog-promise',
          text: 'The princess makes a promise to the frog.',
        },
        {
          kind: 'note',
          text: 'New word: promise — when you say you will do something, and then you really do it.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"I do not want your jewels," said the frog. "I only ask this: let me be your companion. Let me sit at your table, eat from your little golden plate, and sleep in your room. If you promise me this, I will bring back your ball."',
        },
        {
          kind: 'text',
          text: 'The princess thought, "That is a silly thing to promise! A frog can do nothing but croak in the water." But she said, "Yes, I promise — if you fetch my ball."',
        },
        {
          kind: 'text',
          text: 'Splash! The frog dived into the well. Soon he came up again with the golden ball in his mouth, and dropped it into the grass. The princess was so happy she picked up her ball and ran away home, forgetting all about the poor frog.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Frog at the Door',
      art: 'frog-table',
      artPrompt: 'a green frog sitting on a golden plate at a long banquet table, a king and a princess looking at him, tall candles and a crown, palace dining room',
      blocks: [
        {
          kind: 'text',
          text: 'The next evening, the princess was eating her supper with the king and all his court. Then — knock, knock, knock — came a sound at the palace door. She opened it, and there stood the frog!',
        },
        {
          kind: 'image',
          art: 'frog-table',
          text: 'The frog eats from the princess’s golden plate.',
        },
        {
          kind: 'note',
          text: 'New word: companion — a friend who stays by your side and keeps you company.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The princess was frightened and shut the door fast. But the king, her father, saw her pale face. "What is that at the door, my child?" She told him the whole story — about the golden ball, and the well, and the promise she had made.',
        },
        {
          kind: 'text',
          text: '"A promise must be kept," said the king gently but firmly. "You gave your word, and you must do as you said." So the princess opened the door, and the frog hopped in after her.',
        },
        {
          kind: 'text',
          text: 'The frog ate from her golden plate, and she gave him water to drink from her little golden cup. Then he said, "I am tired. Carry me to your room and let me sleep on your soft pillow." The princess was unhappy, but her father nodded, and so she did.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Spell Is Broken',
      art: 'frog-prince',
      artPrompt: 'a handsome young prince in green and gold bowing before a princess in a sunny palace room, a frog skin lying on the floor nearby, a golden crown on a cushion, morning light',
      blocks: [
        {
          kind: 'text',
          text: 'In the morning, when the sun came up and the birds began to sing, the princess woke — and there, standing beside her bed, was no frog, but a handsome young prince, with kind brown eyes.',
        },
        {
          kind: 'image',
          art: 'frog-prince',
          text: 'The frog has become a handsome prince.',
        },
        {
          kind: 'note',
          text: 'New word: spell — magic words that change a person into something else, until someone breaks them.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"Do not be afraid," he said, and he told her his story. "A wicked fairy bewitched me long ago. She said I must stay a frog until a princess let me be her companion and keep her promise. You kept your word — and so the spell is broken."',
        },
        {
          kind: 'text',
          text: 'The princess was ashamed of how she had run away, but the prince thanked her. "You were unkind to me at the well," he said, "but in the end you did what was right. That is the thing that matters most."',
        },
        {
          kind: 'text',
          text: 'The king gave them his blessing. The prince took the princess home to his own golden kingdom, where the birds sang in the gardens and the fountains played all day. And they were faithful companions, and true friends, all their lives long.',
        },
      ],
    },
    {
      title: 'Chapter 5 · The Magic Porridge Pot',
      art: 'frog-porridge',
      artPrompt: 'a small wooden pot bubbling over with creamy porridge on a little stove, a girl and her mother smiling by a tiny cottage window, a wise old woman at the door, warm firelight',
      blocks: [
        {
          kind: 'text',
          text: 'In a little village there lived a poor girl and her mother. One day they had nothing at all to eat, so the girl went into the wood to look for berries. There she met a kind old woman. "Here is a little pot for you," she said. "When you are hungry, say: Cook, little pot, cook. And when you have had enough, say: Stop, little pot, stop."',
        },
        {
          kind: 'image',
          art: 'frog-porridge',
          text: 'The little pot cooks sweet porridge for the girl and her mother.',
        },
        {
          kind: 'note',
          text: 'New word: porridge — a soft, warm food made of oats and milk, eaten with a spoon.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The girl thanked her and ran home. The pot cooked and cooked, and the girl and her mother ate sweet porridge every day, and were never hungry again.',
        },
        {
          kind: 'text',
          text: 'But one day the mother wanted porridge while her daughter was out. "Cook, little pot, cook!" she said. The pot cooked, and cooked, and kept on cooking — porridge filled the kitchen, and then the whole house, and then the whole street, until every house in the town was full!',
        },
        {
          kind: 'text',
          text: 'At last the girl came running home. "Stop, little pot, stop!" she cried — and the pot stopped at once. But everyone who wanted to come back into the town had to eat their way through the porridge first. And from that day on, anyone who wanted a bowl of sweet porridge had to ask the little girl first.',
        },
      ],
    },
    {
      title: 'Chapter 6 · The Elves and the Shoemaker',
      art: 'frog-shoemaker',
      artPrompt: 'two tiny smiling elves in nightshirts sewing fine leather shoes by candlelight on a cobbler’s table, scraps of leather and an awl, a snug workshop at midnight',
      blocks: [
        {
          kind: 'text',
          text: 'A shoemaker and his wife were very poor. All he had left was one piece of leather — enough for one last pair of shoes. He cut it out at night and went to bed. In the morning, the shoes stood finished on his table, sewn so finely that they sold for a good price that very day.',
        },
        {
          kind: 'image',
          art: 'frog-shoemaker',
          text: 'The little elves sew the shoes by candlelight.',
        },
        {
          kind: 'note',
          text: 'New word: elf — a tiny, quick, clever person from old stories.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'With the money he bought leather for two pairs. In the morning — two finished pairs again! And so it went on. Whoever bought his shoes could not wear them out, and the shoemaker grew rich.',
        },
        {
          kind: 'text',
          text: '"Someone is helping us," said his wife. "We must thank them." So that night they made tiny coats and tiny trousers and little red shoes, and laid them on the table, and hid behind the door.',
        },
        {
          kind: 'text',
          text: 'At midnight, two little elves hopped up to work — but there on the table lay beautiful tiny clothes! They dressed themselves, singing, "Now we are smart little men, no more we work for you!" And they danced over the chairs and out of the door, and the shoemaker never saw them again. But his good luck stayed with him, and he was happy all his life.',
        },
      ],
    },
    {
      title: 'Chapter 7 · The Wolf and the Seven Little Kids',
      art: 'frog-kids',
      artPrompt: 'a wolf with a flour-white paw stretched through a cottage window while seven little goats hide behind chairs and a clock case inside, a cosy kitchen, afternoon light',
      blocks: [
        {
          kind: 'text',
          text: 'A mother goat had seven little kids, and she loved them as any mother loves her children. One day she had to go into the wood for food. "Beware of the wolf!" she said. "He has a rough voice and black paws. If you hear his voice, or see his black paws, do not open the door!"',
        },
        {
          kind: 'image',
          art: 'frog-kids',
          text: 'The kids see a white paw on the window-sill — but the voice is rough.',
        },
        {
          kind: 'note',
          text: 'New word: chalk — a soft white stone for writing; the wolf chewed it to make his voice sweet.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Soon there came a knock. "Open, children! It is your mother!" — but it was the rough voice of the wolf. "We will not open!" cried the kids. So the wolf chewed a piece of white chalk till his voice was sweet, and knocked again. But the kids saw his black paw on the window-sill. "You are the wolf! Our mother has no black paws!" Then the wolf rolled his paws in white flour till they were quite white, and knocked a third time.',
        },
        {
          kind: 'text',
          text: 'The kids saw the white paws and opened the door — in jumped the wolf! The seven little kids ran and hid: one under the table, one in the bed, one in the oven, one in the cupboard, one behind the door, one in the clock-case. The wolf found six of them and swallowed them down whole. But the youngest, in the clock-case, was not found, and so he was saved.',
        },
        {
          kind: 'text',
          text: 'When the mother goat came home, the youngest kid told her everything, and she wept. Out in the meadow lay the wolf under a tree, fast asleep and snoring — and something moved inside his big belly! Quickly and carefully the mother snipped it open, and out jumped all six little kids, alive and well. They filled the wolf’s belly with big smooth stones instead, and sewed it up neatly. When the wolf woke and tried to run, the stones were so heavy that he staggered away into the deep wood, groaning — and he never troubled the goats again.',
        },
      ],
    },
    {
      title: 'Chapter 8 · The Star Money',
      art: 'frog-star',
      artPrompt: 'a small girl in a simple nightdress standing alone on a moonlit hillside with bare arms open wide, golden stars falling like silver rain around her, tiny shining coins on the grass',
      blocks: [
        {
          kind: 'text',
          text: 'There was once a little girl whose father and mother had died. She was so poor that she had no room to sleep in and no bed, and all she had in the world were the clothes she wore and one piece of bread. But she was kind and good.',
        },
        {
          kind: 'image',
          art: 'frog-star',
          text: 'The stars fall down like silver coins around the little girl.',
        },
        {
          kind: 'note',
          text: 'New word: give away — to give something to someone who needs it more than you do.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'She met a hungry man and gave him her bread. Then she gave her cap to a cold child, and her jacket to another, and in the dark wood she gave away her dress too. Now she had nothing left at all, and she stood in the night, in her little under-dress, looking up at the stars.',
        },
        {
          kind: 'text',
          text: 'And the stars began to fall! Down they came like silver rain, and where they touched the ground they turned into shining coins. And the little girl found she was wearing a new dress of the finest linen, warm and soft.',
        },
        {
          kind: 'text',
          text: 'So the little girl was rich at last — and all her life long she kept on giving, for she had learned that what you give away with a kind heart always comes back to you.',
        },
      ],
    },
  ],
  rights: {
    workTitle: "Grimm's Fairy Tales — The Frog Prince",
    author: 'Jacob and Wilhelm Grimm',
    authorDeathYear: 1863,
    jurisdiction: 'EU',
    basis: 'pd-70',
    sourceUrl: 'https://www.gutenberg.org/ebooks/2591',
    note: 'Grimm brothers died 1859 and 1863; public domain under the 70-years-after-death rule. Retold for young children in simple English from Project Gutenberg eBook #2591.',
  },
}
