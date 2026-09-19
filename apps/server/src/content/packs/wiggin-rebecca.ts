import type { PackBook } from '../types'

/**
 * Rebecca of Sunnybrook Farm — four chapters retold for readers aged 9-12.
 * Text: Project Gutenberg eBook #933 (Kate Douglas Wiggin, 1903). Public domain
 * worldwide (Wiggin died 1923; 70y pma expired). Plot follows the original:
 * Rebecca Rowena Randall leaves her seven-brother-and-sister home at Sunnybrook
 * to live with her aunts in Riverboro, where her imagination wins the town.
 * Wording simplified in places for young readers.
 */
export const rebeccaSunnybrook: PackBook = {
  id: 'wiggin-rebecca',
  title: 'Rebecca of Sunnybrook Farm',
  author: 'Kate Douglas Wiggin',
  lang: 'en',
  category: 'tale',
  ageStage: '9-12',
  intro: 'Rebecca Rowena Randall — eleven years old, all elbows and imagination — rides away from Sunnybrook Farm to live with her two aunts in Riverboro. One aunt is stern as a brick house and the other soft as a warm biscuit, and it takes a very particular girl to make a home in both their hearts.',
  coverArt: 'rebecca-parasol',
  coverArtPrompt: 'a girl of about eleven with braided dark hair holding a fringed pink parasol twirling with delight on a village green, white church spire and brick house behind, her bonnet hanging by its strings down her back, golden late-afternoon summer light',
  coverFrom: '#AD1457',
  coverTo: '#FFE082',
  source: 'Rebecca of Sunnybrook Farm (Kate Douglas Wiggin, 1903), Project Gutenberg eBook #933, public domain (Wiggin d. 1923)',
  chapters: [
    {
      title: 'Chapter 1 · The Ride to Riverboro',
      art: 'rebecca-stagecoach',
      artPrompt: 'an open horse-drawn stagecoach bumping along a dusty country road between stone walls and meadows, a small girl with a black straw bonnet tipped back sitting beside a kind old driver in a white duster, seven children waving from a farmhouse porch far behind, bright summer morning',
      blocks: [
        {
          kind: 'text',
          text: 'Sunnybrook Farm was full to the rafters: seven children, a tired mother, and not much money. So when Aunt Miranda and Aunt Jane of Riverboro offered to take one child and bring her up, the family chose Rebecca — partly because she was eleven and sensible, and partly because, as her mother said, "she has such an imagination that trouble slides off her."',
        },
        {
          kind: 'image',
          art: 'rebecca-stagecoach',
          text: 'Rebecca rides away from Sunnybrook with old Mr. Cobb, the stage driver.',
        },
        {
          kind: 'text',
          text: 'Old Mr. Cobb drove the stage, and he had carried many children to their new homes. But he had never carried one like Rebecca. She asked questions by the dozen, named the clouds, and compared the river to a great silver snake. "I expect Aunt Miranda will want to improve me," she said happily. "I hope she improves my hair first. It will never lie down."',
        },
        {
          kind: 'note',
          text: 'New word: improve — to make better. Rebecca is not afraid of being improved; she just hopes it will not hurt. What would you hope stays exactly the same about you?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'At the top of the long hill Rebecca stood up in the stage and stretched out her arms to the sky. "It\'s the most beautiful sight I ever saw!" she cried, counting the roofs and the elms and the church spire of Riverboro. Mr. Cobb grinned under his beard. His stage had carried freight and flour and fiddles, he said, but never a sight like this one.',
        },
        {
          kind: 'text',
          text: 'The coach rolled down into the village, past the brick house with the lilacs by the door. Rebecca did not know it yet, but that square, shuttered house was to be her whole world for years — and she, in ways nobody guessed, was to be its whole springtime.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Brick House',
      art: 'rebecca-brick-house',
      artPrompt: 'a prim two-storey brick house with green shutters and a stiff little front garden of box hedge and lilacs, a tall thin elderly woman in a black dress and a small soft elderly woman in a shawl standing on the doorstep, a girl with a windblown bonnet looking up at them from the gate, warm afternoon light',
      blocks: [
        {
          kind: 'text',
          text: 'Aunt Miranda was tall, thin, and exact; she believed in doing things properly and saying things seldom. Aunt Jane was small and gentle, with kind eyes that made up for all the words the house did not use. "Remember who you are," Aunt Miranda said at the gate, "and where you are." Rebecca remembered so hard that she sat down on the doorstep step and tried to become as still as furniture.',
        },
        {
          kind: 'image',
          art: 'rebecca-brick-house',
          text: 'The brick house, with Aunt Miranda, Aunt Jane, and one very new girl at the gate.',
        },
        {
          kind: 'text',
          text: 'It was a house of rules. Do not slam the door. Do not waste soap. Do not read at the table. Rebecca broke most of them in the first week, not from naughtiness but from fizzing over — her thoughts simply would not stay sitting down.',
        },
        {
          kind: 'note',
          text: 'Aunt Jane tells Rebecca that Aunt Miranda is hard outside and soft inside, like a winter apple. Some people take a long time to show their sweet part. Being patient with them is its own kind of kindness.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'But there were fine things too. School had forty scholars and a spelling contest, and Rebecca found a friend at once: Emma Jane Perkins, who was good and true and could not spell, and who thought Rebecca\'s poems the finest ever written. The two of them sat together under the big elm at recess, sharing one gingerbread and all their secrets.',
        },
        {
          kind: 'text',
          text: 'At night Rebecca wrote verses by candlelight and read them to Aunt Jane, who laughed until her handkerchief was wet, and one evening Aunt Miranda stayed in the room, pretending to mend, and did not once say the verse-reading should stop. Rebecca noticed. In the brick house, that was nearly a round of applause.',
        },
      ],
    },
    {
      title: 'Chapter 3 · Selling Soap for the Lamp',
      art: 'rebecca-soap-lamp',
      artPrompt: 'two girls on a cottage doorstep, one with braids holding out a wrapped cake of soap while a cheerful travelling man in a linen suit and straw hat opens his sample case, an oil lamp with a glass chimney glowing on the table inside, cooing doves by the door, warm summery light',
      blocks: [
        {
          kind: 'text',
          text: 'The soap company offered a prize for selling three hundred cakes: a fine banquet lamp, with a glass chimney and a shade like a rose. Aunt Jane had admired such a lamp all her life. Rebecca resolved on the spot that Aunt Jane should have it — even though three hundred cakes was more soap than Rebecca had seen in her whole life.',
        },
        {
          kind: 'image',
          art: 'rebecca-soap-lamp',
          text: 'Rebecca makes her first sale, soap and smiles, from the biggest sample case in Maine.',
        },
        {
          kind: 'text',
          text: 'She and Emma Jane went selling through Riverboro and beyond, door to door, with pitches rehearsed on the way. Neighbours bought a cake to be kind, and then another to be rid of the poetry that followed. Still the count crawled. Forty cakes. Sixty. Rebecca lay awake doing arithmetic under the covers.',
        },
        {
          kind: 'note',
          text: 'Rebecca is learning the grown-up arithmetic of big dreams: a large wish is only a great many small steps, taken one after another. What is your three hundred cakes?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Then came the luck. A kind traveller — a young man with a sample case and laughing eyes, whom Rebecca privately named Mr. Aladdin — heard her story and bought fifty cakes on the spot, then carried her order round his whole hotel and ordered a hundred more. "You have sold me soap," he told her, "and bought me the best laugh I have had in a year."',
        },
        {
          kind: 'text',
          text: 'The three hundred were sold, the prize came by the stage in a box packed with excelsior, and the banquet lamp was set on the parlour table with a ceremony. Aunt Jane looked at it a long, long time, and then at Rebecca, and said, "You dear child" — and in the brick house that was a whole oration.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Pink Parasol',
      art: 'rebecca-pink-parasol',
      artPrompt: 'a girl at a parlour window of a brick house holding up a new pink silk parasol with a carved ivory handle, an elderly woman in a shawl smiling from her rocking chair, a wrap-paper and string on the floor, doves on the windowsill outside, soft rosy late light',
      blocks: [
        {
          kind: 'text',
          text: 'Rebecca\'s verses had been printed at last in a country paper, and copied into a city one, and the girl who wrote them walked on air for a week. And when Mr. Aladdin heard of it, he remembered a promise he had made in fun, and sent a parcel by the stage coach addressed, in fine letters, to "Miss Rebecca Rowena Randall, Poet."',
        },
        {
          kind: 'image',
          art: 'rebecca-pink-parasol',
          text: 'The parcel from the city, opened in the parlour with Aunt Jane for witness.',
        },
        {
          kind: 'text',
          text: 'Inside, wrapped in tissue, lay a pink silk parasol with a carved ivory handle — the most beautiful thing Rebecca had ever owned, and far too grand for a girl who mended her own stockings. She held it up to the window and the afternoon came through it like rose-coloured stained glass. "It is the pink of perfection," she breathed, and that phrase entered the family language for good.',
        },
        {
          kind: 'note',
          text: 'A gift can say more than a letter: somebody was thinking of you. Rebecca practices saying thank you with her whole heart — try it the next time something kind happens to you.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Aunt Miranda came in, looked at the parasol, and delivered one long, disapproving speech about vanity. Then she went out — and came back before supper with a strip of wide ribbon, the exact rose colour, to make a new hair bow for church. She laid it down without a word and went about her supper biscuits.',
        },
        {
          kind: 'text',
          text: 'Rebecca understood, and her heart was so full it ached pleasantly. The brick house had rules instead of kisses, but kindness got in somehow — under doors, through keyholes, in the colour of ribbon. And the girl from Sunnybrook was beginning, patiently, to be loved there.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Rebecca of Sunnybrook Farm',
    author: 'Kate Douglas Wiggin',
    authorDeathYear: 1923,
    jurisdiction: 'EU',
    basis: 'pd-70',
    sourceUrl: 'https://www.gutenberg.org/ebooks/933',
    note: 'Published 1903; public domain worldwide (Wiggin d. 1923, 70y pma expired). Plot follows Project Gutenberg eBook #933; retold in simple English for young readers.',
  },
}
