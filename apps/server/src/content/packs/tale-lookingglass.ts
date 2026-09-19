import type { PackBook } from '../types'

/**
 * Through the Looking-Glass, and What Alice Found There — six chapters retold in
 * simple English for young readers.
 * Original: Lewis Carroll (Charles Lutwidge Dodgson), published 1871. Public domain
 * in the US (pre-1929) and worldwide (Carroll died 1898; 70y pma expired).
 * Chessboard-world plot, the living flowers, Tweedledum and Tweedledee, Humpty Dumpty,
 * and the Lion and the Unicorn follow the original book; wording simplified into short
 * sentences for children aged 9-12.
 */
export const lookingGlass: PackBook = {
  id: 'tale-lookingglass',
  title: 'Through the Looking-Glass',
  author: 'Lewis Carroll',
  lang: 'en',
  category: 'tale',
  ageStage: '9-12',
  intro: 'One quiet evening Alice climbs through the mirror above the fireplace - and steps into a world laid out like a giant chessboard, where flowers talk and eggs sit on walls.',
  coverArt: 'looking-glass-cover',
  coverArtPrompt: 'a girl in a blue dress stepping through a tall golden-framed mirror into a chequered black-and-white chessboard landscape, giant red chess queens and knights in the distance, talking flowers in the foreground, soft dreamy candlelight',
  coverFrom: '#4527A0',
  coverTo: '#B39DDB',
  source: 'Project Gutenberg eBook #12, public domain (Carroll d. 1898)',
  chapters: [
    {
      title: 'Chapter 1 · Through the Mirror',
      art: 'mirror-chessboard',
      artPrompt: 'a drawing-room fireplace at dusk with a tall mirror above it, a black kitten on the rug, and a girl in a blue dress climbing up over the fender toward the mirror, the mirror showing a chessboard meadow instead of the room',
      blocks: [
        {
          kind: 'text',
          text: 'Alice was sitting in a big arm-chair, half talking to her black kitten and half talking to herself. "Let me see," she said. "When you and I were playing just now, you pretended to be the Red Queen. Do you think she would scold me for telling you about her?"',
        },
        {
          kind: 'image',
          art: 'through-looking-glass',
          text: 'Alice climbs through the mirror, and the glass melts away like a bright silver mist.',
        },
        {
          kind: 'text',
          text: 'The kitten only blinked. Alice went on, "Now, Kitty, let us consider who it was that dreamed it all. Either I dreamed it, or the Red King dreamed it. And if the Red King was only dreaming me, then I might go out like a candle when he wakes up!"',
        },
        {
          kind: 'text',
          text: 'Then Alice looked up at the glass over the mantelpiece. The books behind the glass were not the same as the books in the room, and the pictures seemed to want to talk. "I can see through it, and I can even climb over the fender. If I could only get inside the glass house!"',
        },
        {
          kind: 'note',
          text: 'New word: mantelpiece — the shelf above a fireplace, where clocks and vases are kept.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'In another moment Alice was on the fender, and the mirror was beginning to melt away like a bright silvery mist. She slipped through it as easily as through a curtain, and found herself in the room behind the glass.',
        },
        {
          kind: 'text',
          text: 'The room looked almost like the real room, only everything was switched around, and the pictures on the wall were alive. Through a little door Alice saw a beautiful garden, and she ran down the stairs and out into the sunshine, straight into a great chessboard world.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Garden of Live Flowers',
      art: 'looking-glass-flowers',
      artPrompt: 'a flower-bed full of tiger-lilies, roses and daisies with little painted faces, a girl in a blue dress talking to a tiger-lily, and a Red Chess Queen in a red gown standing among the flowers, bright morning sun',
      blocks: [
        {
          kind: 'text',
          text: '"Oh, how glad I am to get here!" said Alice. "I should like to be the Queen, if I might only be a pawn first." The great garden was laid out in squares, just like a giant chessboard, and Alice wanted to reach the Eighth Square, where queens lived.',
        },
        {
          kind: 'image',
          art: 'talking-flowers',
          text: 'The tiger-lilies and roses bend down to look at Alice - for in this garden the flowers can talk.',
        },
        {
          kind: 'text',
          text: 'A Tiger-lily nodded at her. "O Tiger-lily!" said Alice, "I never saw flowers that could talk before. How do you manage it?" The Tiger-lily answered in a sleepy voice, "Why, we talk because the ground is too full of flowers. It makes us so very dry and thirsty, and dryness makes us talk."',
        },
        {
          kind: 'text',
          text: 'The Roses were very cross. "This here girl," said a Red Rose, "she has no more sense than a daisy." The Daisies began to whisper together in a low, trembling voice, "She is a weed, she is a weed!" Alice was rather vexed. "If you do not hold your tongues, I will pick you!" she said, and the Daisies were quiet at once.',
        },
        {
          kind: 'note',
          text: 'New word: vexed — a polite little way of saying angry or annoyed.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Suddenly a small Red Chess Queen came running past, and then stood still and looked at Alice. "You may call me the Red Queen," she said. She took Alice by the hand, and they ran together, faster and faster, until the wind whistled in Alice\'s ears.',
        },
        {
          kind: 'text',
          text: 'When they stopped, the Red Queen said, "Speak when you are spoken to, and curtsey when you meet a king. Now, would you like to be a Queen? Then see that you remember your lessons." And she pointed the way Alice must go, across the squares of the chessboard world.',
        },
      ],
    },
    {
      title: 'Chapter 3 · Tweedledum and Tweedledee',
      art: 'looking-glass-twins',
      artPrompt: 'two round identical little men in schoolboy caps and striped shirts, standing under an old tree in a wood, one pointing at a broken rattle on the ground, a girl in a blue dress watching them with her hands on her hips',
      blocks: [
        {
          kind: 'text',
          text: 'Alice walked on through the wood, and there, under a tree, stood two fat little men, so exactly alike that Alice could not tell which was which. One had "DUM" embroidered on his collar, and the other "DEE".',
        },
        {
          kind: 'image',
          art: 'tweedle-twins',
          text: 'Tweedledum and Tweedledee, as alike as two peas in a pod.',
        },
        {
          kind: 'text',
          text: '"I know what you are thinking about," said Tweedledum, "but it isn\'t so, nohow." "Contrariwise," said Tweedledee, "if it was so, it might be; and if it were so, it would be; but as it isn\'t, it ain\'t. That\'s logic."',
        },
        {
          kind: 'note',
          text: 'New word: contrariwise — "the other way round." Tweedledee uses it whenever his brother finishes a sentence.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Tweedledum picked up a broken rattle from the ground. "You know," he said, "it is very rude to look at a person who has hurt himself, and cry." "If you please," said Alice, "I would rather not hurt anybody."',
        },
        {
          kind: 'text',
          text: '"I am very sorry," said Tweedledum, opening one eye very wide, "but I am afraid I must have a battle with you. It is one of the rules." "What for?" asked Alice. Tweedledee pointed at the poor old rattle. "For this! He has spoilt my nice new rattle, and I must have a battle for it."',
        },
        {
          kind: 'text',
          text: 'But just as they were going to fight, a monstrous crow flew over the wood with a noise like a whirlwind. In a moment Tweedledum and Tweedledee had taken to their heels and hidden themselves, and Alice walked on alone through the whispering trees.',
        },
      ],
    },
    {
      title: 'Chapter 4 · Humpty Dumpty',
      art: 'looking-glass-egg',
      artPrompt: 'a huge round smiling egg wearing a striped cravat and a tiny crown, sitting cross-legged on the top of a narrow high stone wall, a girl in a blue dress standing below looking up at him, green fields stretching behind',
      blocks: [
        {
          kind: 'text',
          text: 'After a while Alice saw an egg. It was a very large egg, and it was sitting on a narrow wall, with its legs crossed and its arms folded, humming a little song to itself.',
        },
        {
          kind: 'image',
          art: 'humpty-egg-wall',
          text: 'Humpty Dumpty on his wall, wearing a cravat and a tiny crown.',
        },
        {
          kind: 'text',
          text: '"How can you sit up there so safely?" asked Alice. "It is very precarious," Humpty Dumpty answered gravely. "It means easy to fall down. When I use a word," Humpty Dumpty said in rather a scornful tone, "it means just what I choose it to mean - neither more nor less."',
        },
        {
          kind: 'note',
          text: 'Question for you: Humpty Dumpty says words mean whatever he wants them to mean. Do you think that would make talking easier, or much harder? Why?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"The question is," said Alice, "whether you can make words mean so many different things." "The question is," said Humpty Dumpty, "which is to be master - that is all."',
        },
        {
          kind: 'text',
          text: 'Then Humpty Dumpty looked pleased. "I am very good at un-birthdays," he said. "A present on an unbirthday is much better than on a birthday, because there are three hundred and sixty-four unbirthdays in a year, and only one birthday!" Alice thought this was very clever.',
        },
        {
          kind: 'text',
          text: 'Suddenly a heavy crash shook the wood. Humpty Dumpty had fallen! Alice ran to the spot, and there lay the broken egg, with the White King and all his horses and all his men running to help him. "I sent a messenger," the King said sadly, "to fetch the horses and the men. But I am afraid they will never put him together again."',
        },
      ],
    },
    {
      title: 'Chapter 5 · The Lion and the Unicorn',
      art: 'looking-glass-lion',
      artPrompt: 'a golden lion and a white unicorn with a shining horn rearing up together in a sunny meadow, a plum cake on the grass between them, soldiers in red uniforms standing in a ring around them, a girl in a blue dress watching',
      blocks: [
        {
          kind: 'text',
          text: 'Alice had not run far when she heard the soldiers shouting. A whole army of soldiers went marching past, and then the White King himself came riding along, rubbing his hands and looking very uneasy.',
        },
        {
          kind: 'image',
          art: 'lion-unicorn-fight',
          text: 'The Lion and the Unicorn fight for the crown, with the plum cake between them.',
        },
        {
          kind: 'text',
          text: '"I thought you were going to have a battle," said Alice. "The Lion and the Unicorn are fighting for the crown," said the King. "The best of the joke is that it is my crown all the while! What a noisy lot they are!"',
        },
        {
          kind: 'text',
          text: 'The Unicorn looked up as Alice came near, and looked so proud and so gentle that Alice forgot to be afraid. "I always thought Unicorns were fabulous monsters!" she said. The Unicorn tossed his head. "I always thought little girls were fabulous monsters," he said. "Alive! I can hardly believe it!"',
        },
        {
          kind: 'note',
          text: 'New word: fabulous — so wonderful or strange that it sounds like a story rather than real life.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"Let us have some plum cake," said the Unicorn, and they all sat down on the grass. But the cake was so light that it would not cut at all - it behaved like a feather. "I don\'t understand," said the Lion, "how the bakers manage to make such light cake. Carry it off, my men!"',
        },
        {
          kind: 'text',
          text: 'Then drums began to beat again. "Now for the battle!" cried the Unicorn, and he and the Lion bounded away together across the meadow, with the soldiers running after them. Alice drew a long breath and went on toward the Eighth Square.',
        },
      ],
    },
    {
      title: 'Chapter 6 · Was It a Dream?',
      art: 'alice-kittens-awake',
      artPrompt: 'a cosy drawing-room at dusk, a girl in a blue dress waking in a big arm-chair holding a black kitten and a white kitten, a tall mirror over the fireplace reflecting the last red light of sunset, scattered chess pieces on the rug',
      blocks: [
        {
          kind: 'text',
          text: 'At last Alice reached the Eighth Square, and there were the Red Queen and the White Queen, and a great crowd of all the chess people. The Red Queen and the White Queen began to ask Alice such strange questions that her head spun round and round.',
        },
        {
          kind: 'image',
          art: 'chess-kings-crown',
          text: 'The two Queens set a golden crown on Alice\'s hair - she is a Queen at last.',
        },
        {
          kind: 'text',
          text: 'Then all the chess people joined hands and danced, faster and faster, until the whole world seemed to be spinning like a top. Alice seized the Red Queen and shook her. "You may as well call me a Queen!" she cried.',
        },
        {
          kind: 'text',
          text: 'The Red Queen\'s voice grew small and thin and far away. "Speak roughly to your little boy," it said, "and smack him for sneezing!" And her face melted away, and the chessboard world, and the Eighth Square, and everything.',
        },
        {
          kind: 'note',
          text: 'Question for you: Alice wakes up holding her kittens. Was the looking-glass world a dream, or did the Red King dream it - and Alice inside it? What do you think?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Alice opened her eyes. She was back in the big arm-chair, and the black kitten was purring in her arms. "Oh, Kitty, how glad I am to see you again! You have been such a long way away, in the looking-glass house!"',
        },
        {
          kind: 'text',
          text: 'And so, as the firelight flickered and the kittens went to sleep, Alice sat and wondered, as we all wonder: which of it was a dream, and which of it was real, and who it was that dreamed it all.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Through the Looking-Glass, and What Alice Found There',
    author: 'Lewis Carroll',
    authorDeathYear: 1898,
    jurisdiction: 'US',
    basis: 'pd-us',
    sourceUrl: 'https://www.gutenberg.org/ebooks/12',
    note: 'Retold in simple English; plot follows the public-domain original.',
  },
}
