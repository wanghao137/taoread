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
    {
      title: 'Chapter 5 · The Flag on the Schoolhouse',
      art: 'rebecca-flag',
      artPrompt: 'a one-room schoolhouse with a new flag flying from a tall pole on the roof, a girl reading verses from a paper to a crowd of villagers under red maple trees, boys sitting on the fence, bright autumn morning',
      blocks: [
        {
          kind: 'text',
          text: 'News ran through Riverboro like wind through wheat: the town was going to raise a flag over the schoolhouse — a real flag, with a pole and a ceremony and songs. And when the school needed someone to write verses for the great day, every eye turned toward Rebecca, whose verses had already made Emma Jane Perkins sure she would be famous.',
        },
        {
          kind: 'image',
          art: 'rebecca-flag',
          text: 'The great day: the flag goes up, and Rebecca reads her verses to Riverboro.',
        },
        {
          kind: 'text',
          text: 'Rebecca wrote by candlelight all that week, and crumpled more paper than she kept, and recited lines to the cows until even the cows seemed tired of them. Emma Jane kept watch at the window and said every draft was perfect, which is what true friends are for.',
        },
        {
          kind: 'note',
          text: 'Being asked to stand up in front of everyone is frightening — and saying yes anyway is how courage is practiced, one trembling verse at a time.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'On the great day the flag went up against the sky and the crowd hushed. Rebecca\'s voice shook at first and then rang clear as a bell across the common, and when she finished, Riverboro cheered and cheered.',
        },
        {
          kind: 'text',
          text: 'Word of it even traveled to the city, where a young man with laughing eyes read the verses twice and smiled, and showed them to his friends as a curiosity from the country — though he kept the paper, which was not a thing a person does with a mere curiosity.',
        },
      ],
    },
    {
      title: 'Chapter 6 · Trouble at Sunnybrook',
      art: 'rebecca-fever',
      artPrompt: 'a girl with braids carrying a covered tray up a dark farmhouse stair toward a bedroom door with lamplight under it, a doctor\'s bag by the kitchen door below, rain streaking the window, night-time care',
      blocks: [
        {
          kind: 'text',
          text: 'Then came a letter with dark news: scarlet fever had crept into Sunnybrook Farm, and Rebecca\'s mother, worn out with the little ones, could not manage alone. Rebecca read it twice and was already packing. The brick house had a thousand rules, but Aunt Miranda\'s voice, stiff as it was, said the right thing at last: "Go, child. Family is family."',
        },
        {
          kind: 'image',
          art: 'rebecca-fever',
          text: 'Nurse, cook and comforter, up and down the Sunnybrook stairs all night long.',
        },
        {
          kind: 'text',
          text: 'For weeks Rebecca was nurse, cook and comforter, carrying trays up the stairs and keeping the little ones quiet, brave and washed. She wrote letters home that made Aunt Jane laugh, and in one place made her cry quietly into her handkerchief.',
        },
        {
          kind: 'note',
          text: 'Families show love by showing up. Miles are just miles when somebody needs you — pack your courage along with your toothbrush.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'When the fever had passed and the house was quiet, Rebecca came back to Riverboro thinner and browner and somehow taller. Aunt Miranda asked after the fever every day after that, though she pretended to be merely interested in the weather.',
        },
        {
          kind: 'text',
          text: 'And Rebecca understood that under the stiff black dress, someone had been counting the days.',
        },
      ],
    },
    {
      title: 'Chapter 7 · The Softest Words',
      art: 'rebecca-sickroom',
      artPrompt: 'a tall thin elderly woman propped on pillows in a dim best bedroom, a girl with braids reading aloud from a book by lamplight, a small soft elderly woman keeping watch by the window, blue winter dusk through lace curtains',
      blocks: [
        {
          kind: 'text',
          text: 'The next winter Aunt Miranda fell ill — so ill that the stiff, exact lady took to her bed and the whole brick house went quiet. It was Rebecca who read to her by lamplight, Rebecca who ran through the snow for the doctor, Rebecca who was never once late with the medicine.',
        },
        {
          kind: 'image',
          art: 'rebecca-sickroom',
          text: 'Reading aloud in the best bedroom, where even the shadows seem to listen.',
        },
        {
          kind: 'text',
          text: 'One evening Aunt Miranda beckoned, and took the girl\'s brown hand in her thin one. "You have been a good girl to me, Rebecca," she said — she, who praised so seldom that the words seemed almost another language. Rebecca went down to the kitchen after that and cried into a dish towel, and Aunt Jane pretended not to see.',
        },
        {
          kind: 'note',
          text: 'Some people speak love in actions all their lives and only find the words at the end. Learn to hear both languages — the words and the doing.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'When the lilacs bloomed again, Aunt Miranda\'s chair stood empty. She had gone quietly in her sleep, and all Riverboro came to the brick house, even the people she had scolded hardest — for stiffness like hers had been a kind of honesty, and honesty is loved when it is gone.',
        },
      ],
    },
    {
      title: 'Chapter 8 · The Pink of Perfection',
      art: 'rebecca-wareham',
      artPrompt: 'a girl with braids standing at a garden gate holding a pink silk parasol, waving to a young man in a fine coat beside a waiting carriage, a small soft elderly woman watching from the parlor window, summer morning with white clouds',
      blocks: [
        {
          kind: 'text',
          text: 'The brick house learned new customs that year. Rebecca and Aunt Jane kept it together now, two chairs at the table and laughter allowed after supper. And in the spring a carriage stopped at the gate, and out stepped Mr. Aladdin — Adam Ladd, the young man who had once bought fifty cakes of soap for the pleasure of Rebecca\'s conversation.',
        },
        {
          kind: 'image',
          art: 'rebecca-wareham',
          text: 'The last morning at the gate, with the pink parasol open against the sky.',
        },
        {
          kind: 'text',
          text: 'He had a plan: Rebecca was to go away to school, to books and classes and a bigger world. Aunt Jane packed her trunk with a brave face and wet eyes, and tucked in at the very bottom a strip of rose-colored ribbon, the exact shade of a certain parasol.',
        },
        {
          kind: 'note',
          text: 'Growing up does not mean leaving love behind. Home walks with you, folded at the bottom of a trunk.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'On the morning she left, Rebecca opened the pink parasol one last time in the sun. "The pink of perfection," she said to the brick house, to the elms, to Aunt Jane in the doorway — and went down the road toward her future, with Riverboro\'s whole heart going with her.',
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
