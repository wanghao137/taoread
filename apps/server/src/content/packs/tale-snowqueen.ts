import type { PackBook } from '../types'

/**
 * The Snow Queen — retold in six short chapters for young readers.
 * Text: Project Gutenberg eBook #27100 (Hans Christian Andersen). Public domain in the
 * US (pre-1929) and worldwide (Andersen d. 1875; 70y pma expired). The seven tales of
 * the original are retold as a single continuous story; wording simplified into short
 * sentences, with no scary detail, for children aged 9-12.
 */
export const snowQueen: PackBook = {
  id: 'tale-snowqueen',
  title: 'The Snow Queen',
  author: 'Hans Christian Andersen',
  lang: 'en',
  category: 'tale',
  ageStage: '9-12',
  intro: 'A wicked goblin makes a magic mirror that shatters into a thousand splinters. One splinter goes into a boy named Kai, and his heart turns to ice. The Snow Queen carries him away. His brave friend Gerda sets out to find him.',
  coverArt: 'snow-queen-palace',
  coverArtPrompt: 'a great palace of blue and white ice on a frozen northern lake, the Snow Queen in a white fur cloak standing beside her white sleigh, polar bears in the snow, a dark sky full of cold stars',
  coverFrom: '#0D47A1',
  coverTo: '#82B1FF',
  source: 'Project Gutenberg eBook #27100, public domain (Andersen d. 1875)',
  chapters: [
    {
      title: 'Chapter 1 · The Magic Mirror',
      art: 'magic-mirror',
      artPrompt: 'a wicked goblin laughing beside a tall cracked mirror that reflects a crooked green landscape, bright glass splinters drifting down like snow, a dark cave full of shadows',
      blocks: [
        {
          kind: 'text',
          text: 'Once upon a time there was a wicked goblin. He was the most mischievous goblin in all the world. One day he made a magic mirror. In this mirror, everything good and beautiful shrank away to nothing, and everything that was ugly and crooked looked worse than ever.',
        },
        {
          kind: 'image',
          art: 'magic-mirror',
          text: 'The goblin and his magic mirror of crooked reflections.',
        },
        {
          kind: 'text',
          text: 'The goblin was very proud of his mirror. He carried it high up into the sky, but it slipped from his hands. It fell down to the earth, and it broke into a hundred million, a thousand million splinters of glass. The splinters flew all over the world.',
        },
        {
          kind: 'note',
          text: 'New word: splinter — a tiny thin sharp piece of broken glass or wood.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'If a splinter got into an eye, the eye saw everything as ugly. If a splinter got into a heart, the heart turned into a lump of ice. Two of these splinters fell on a big town where two children lived, a little boy named Kai and a little girl named Gerda. They were the best of friends.',
        },
        {
          kind: 'text',
          text: 'One morning, as Kai and Gerda were looking at a picture book, a sharp pain shot through Kai’s eye, and another through his heart. Two splinters had gone in. From that hour his heart grew cold. He made fun of everything Gerda loved. He no longer cared for the roses in their window box, and he said sharp things to his old grandmother. His heart was turning to ice, and he did not know it.',
        },
      ],
    },
    {
      title: 'Chapter 2 · Kai Goes with the Snow Queen',
      art: 'kai-sleigh',
      artPrompt: 'a white sleigh drawn by a white horse gliding over deep snow at dusk, a tall pale lady in white fur holding a small boy beside her, snowflakes swirling like stars, dark fir trees',
      blocks: [
        {
          kind: 'text',
          text: 'The next winter Kai went out to play in the snow. He tied his little sled to a big white sled that glided past, and away it went, faster and faster, out through the town gate. The driver was a tall lady, wrapped in white fur, and her sled was the Snow Queen’s.',
        },
        {
          kind: 'image',
          art: 'kai-sleigh',
          text: 'The Snow Queen’s white sleigh, carrying Kai away into the snow.',
        },
        {
          kind: 'text',
          text: 'The Snow Queen looked down at him. She kissed him once, and his cheeks turned blue with cold. She kissed him again, and his heart turned to a lump of ice. Then she said, "You shall be my little friend." She wrapped him in her fur, and away they went, over hills and lakes, far up into the cold north. Kai never said goodbye to anyone at home.',
        },
        {
          kind: 'note',
          text: 'New word: numb — when your hands or feet are so cold that you cannot feel them at all.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'At home Gerda wept. "Kai is dead," the neighbours said. But Gerda did not believe it. She put on her red shoes and went down to the river. "Have you taken my little friend?" she asked. The river only murmured, and she gave it her red shoes. Then Gerda set out on foot to find Kai.',
        },
        {
          kind: 'text',
          text: 'And so the Snow Queen brought Kai to her palace. It was made all of ice, and the wind never stopped blowing. The Snow Queen told Kai that if he could put together certain figures of ice in the shape of words, he would be his own master again. But the splinter in his heart made him sit still on the frozen lake, working at the ice pieces, cold and silent, all day long.',
        },
      ],
    },
    {
      title: 'Chapter 3 · Gerda’s Long Journey',
      art: 'gerda-river',
      artPrompt: 'a small girl in a blue coat drifting in a little wooden boat down a wide calm river between green banks, tall trees and yellow water-lilies, soft afternoon light, a swallow flying above',
      blocks: [
        {
          kind: 'text',
          text: 'Gerda walked for many days. One evening she came to a river. A little boat lay by the bank, tied to a red rose-bush. Gerda stepped into the boat and pushed it off. The river carried her away, over fields and past little villages, far away from home.',
        },
        {
          kind: 'image',
          art: 'gerda-river',
          text: 'Gerda drifting down the river in her little boat.',
        },
        {
          kind: 'text',
          text: 'The boat came at last to a garden. An old woman with a big hat stood there, and she gave Gerda cherries and apples and told her she might stay. But the old woman had magic, and she combed Gerda’s hair and made her forget all about Kai. The roses in the garden hid themselves away, so that Gerda would not think of him.',
        },
        {
          kind: 'note',
          text: 'New word: forget — when a memory slips out of your mind and you cannot find it again.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'But one day, walking in the garden, Gerda saw a painted rose on the old woman’s hat. Then she ran into the garden, and there, under the earth, the real roses were peeping out. "Roses, have you seen Kai?" she asked. The roses said they had not. And then Gerda remembered everything. She kissed the roses and ran away from the enchanted garden.',
        },
        {
          kind: 'text',
          text: 'In the wood Gerda met a Crow and his tame wife. "We have heard of a boy," they said, "who lives at the palace and sleeps in the princess’s bedroom." The Crow took Gerda to the great house, and there was a boy asleep in a little bed by the window. But when Gerda called "Kai!", the boy only sat up and frowned. It was not Kai. It was a strange little boy, and Gerda had to say she was sorry and creep away again.',
        },
        {
          kind: 'text',
          text: 'The princess was kind. She gave Gerda a warm cloak and a pair of new boots, and a little golden carriage drawn by white horses. "Go and find your friend," she said. And Gerda drove on, north and north, toward the country where the Snow Queen lived.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Robber Girl and the Reindeer',
      art: 'robber-girl',
      artPrompt: 'a fierce little girl in a red cap with a knife in her belt sitting by a campfire in a dark pine wood, a tame reindeer tied to a tree behind her, crows on the branches, a starry sky',
      blocks: [
        {
          kind: 'text',
          text: 'In the dark forest the robbers lived. Their horses were as wild as they were. When they saw the golden carriage, they rushed upon it and pulled Gerda out of the coach. "What a fat little girl!" cried the old robber woman. "She shall be my supper." She drew her long knife.',
        },
        {
          kind: 'image',
          art: 'robber-girl',
          text: 'The robber girl by her campfire in the dark pine wood.',
        },
        {
          kind: 'text',
          text: 'But her little daughter, the robber girl, ran up. "She shall play with me!" cried the little robber. "She shall give me her muff, and she shall sleep in my bed." The old woman only laughed and gave Gerda to her daughter. So Gerda stayed in the robbers’ cave, and every night the robber girl said, "If you are not good, I will put my knife into you."',
        },
        {
          kind: 'note',
          text: 'New word: reindeer — a big gentle deer with wide branching horns, that lives in the far north and pulls sleighs.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'One night Gerda could not sleep. She told the robber girl all about Kai, and how the Snow Queen had carried him away. The robber girl looked at her for a long time. Then she said, "The reindeer in the yard came from the far north. He can tell you the way." She took Gerda to the reindeer and said, "Carry this little girl to the palace of the Snow Queen, where her friend is. And if you do not, I shall be very angry."',
        },
        {
          kind: 'text',
          text: 'The reindeer was glad. He bounded away with Gerda on his back, over the moss and the stones, through the long dark night, toward the north. When morning came they stopped and rested, and the reindeer told Gerda to look up. Far ahead, a cold blue light glimmered on the sky. It was the palace of the Snow Queen.',
        },
      ],
    },
    {
      title: 'Chapter 5 · The Palace of Ice',
      art: 'polar-bears',
      artPrompt: 'two great polar bears playing on a vast plain of blue-white ice, sharp snow mountains behind them, the glittering walls of an ice palace in the distance, a cold green aurora in the sky',
      blocks: [
        {
          kind: 'text',
          text: 'The land grew colder and colder. The reindeer stopped at a little hut, where a wise old woman of the north country lived. She put marks of salve on Gerda’s hands, and wrapped her in a warm fur, and tied a little bag of bread about her neck. "Run on," she said, "and the bears will do you no harm."',
        },
        {
          kind: 'image',
          art: 'polar-bears',
          text: 'The polar bears playing on the ice outside the Snow Queen’s palace.',
        },
        {
          kind: 'text',
          text: 'Then Gerda came to the great plain of ice. Out in the middle of it the Snow Queen’s palace stood, walls and roofs all of frozen water, clear and blue as glass. Round and round it ran the polar bears, playing at the game of the world with great ice pieces, and the wind whistled through the empty windows.',
        },
        {
          kind: 'note',
          text: 'New word: aurora — the soft green light that moves across the dark sky in the far north.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Gerda ran up and said, "Will you take me to the palace?" The polar bears only nodded and waved their great paws, as if to say she might go on. So Gerda came to the door of the palace. She was not afraid. Her heart was so full of love that it was warm inside her, though the wind was sharp as knives.',
        },
        {
          kind: 'text',
          text: 'Inside, on the frozen lake, sat Kai. He was blue with cold, and he did not look up. The Snow Queen had gone away to the mountains, and Kai was trying to lay the flat pieces of ice in the shapes of words. But it was no use, and he was very tired.',
        },
      ],
    },
    {
      title: 'Chapter 6 · The Tears That Melted the Ice',
      art: 'kai-tears',
      artPrompt: 'a small girl in a blue coat kneeling on ice and embracing a cold boy, warm tears on her cheeks falling onto his face, bright ice splinters flying up like sparks, a palace of blue glass behind them',
      blocks: [
        {
          kind: 'text',
          text: 'Gerda ran to him and put her arms round his neck. "Kai! Dear Kai!" she cried. Kai looked up and did not know her, for the splinter was still in his heart. Then Gerda began to weep. Her hot tears fell on his face and sank down into his heart, and the ice splinter melted away.',
        },
        {
          kind: 'image',
          art: 'kai-tears',
          text: 'Gerda’s tears falling on Kai’s face, and the ice splinter melting.',
        },
        {
          kind: 'text',
          text: 'Now Kai knew her again. "Gerda!" he cried, and he held her tight. Then he began to cry too, and the splinter that was in his eye was washed away. He looked at the palace and shuddered, and he said, "How cold it is here! Let us go home."',
        },
        {
          kind: 'note',
          text: 'New word: shudder — a quick little shake of your whole body, like when you step out into the snow.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Kai put the ice pieces together in the shapes of the word ETERNITY, and the Snow Queen’s spell was broken. The polar bears bowed low, the winds lay down, and the reindeer came running with a little sledge. Away they went, south and south, over the hills and the rivers, toward home.',
        },
        {
          kind: 'text',
          text: 'And when they came to the town, the bells were ringing and the sun was shining. Their grandmother was still alive, and the roses in the window box were in full bloom. They ran up the stairs and into the little room, and everything was just as it had been. Kai and Gerda looked at each other, and they knew they were grown up, for they had been through so much together. And the roses on the roof nodded in the warm summer wind.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Snow Queen',
    author: 'Hans Christian Andersen',
    authorDeathYear: 1875,
    jurisdiction: 'US',
    basis: 'pd-us',
    sourceUrl: 'https://www.gutenberg.org/ebooks/27100',
    note: 'Retold in simple English for young readers; plot follows the public-domain original. Published 1844; US public domain (pre-1929) and worldwide (Andersen d. 1875, 70y pma expired).',
  },
}
