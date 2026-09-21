import type { PackBook } from '../types'

/**
 * Anne of Avonlea — four chapters retold for readers aged 9-12.
 * Text: Project Gutenberg eBook #47 (L. M. Montgomery, 1909). US public domain
 * (published pre-1929); Montgomery died 1942, so US status is used. Plot follows
 * the original: sixteen-year-old Anne Shirley teaches at the Avonlea school,
 * helps raise the twins, and founds the Village Improvement Society.
 * Wording simplified in places for young readers.
 */
export const anneAvonlea: PackBook = {
  id: 'montgomery-avonlea',
  title: 'Anne of Avonlea',
  author: 'L. M. Montgomery',
  lang: 'en',
  category: 'tale',
  ageStage: '9-12',
  intro: 'Anne Shirley is sixteen, with red hair, a head full of dreams, and a real job at last: teacher of the Avonlea school. Between strict Mr. Harrison, adopted twins, a boy who hates spelling, and a paint pot gone wrong, Anne learns that growing up can be its own kind of adventure.',
  coverArt: 'avonlea-school',
  coverArtPrompt: 'a young woman with red braids and a straw hat standing at the door of a small white country schoolhouse with a bell tower, apple trees in bloom along the fence, a lane winding through green Prince Edward Island fields toward the sea, fresh spring morning light',
  coverFrom: '#2E7D32',
  coverTo: '#FFF9C4',
  source: 'Anne of Avonlea (L. M. Montgomery, 1909), Project Gutenberg eBook #47, US public domain (published 1909)',
  chapters: [
    {
      title: 'Chapter 1 · A Teacher at Sixteen',
      art: 'avonlea-twins-arrive',
      artPrompt: 'a small white farmhouse kitchen with a big stove and geraniums on the sill, a young woman with red braids kneeling to greet a shy little girl and a mischievous gap-toothed boy with a suitcase, an older woman with steel-grey hair watching from the doorway, warm lamplight',
      blocks: [
        {
          kind: 'text',
          text: 'Anne stayed at Green Gables a while longer, for Marilla\'s eyes were not what they had been, and the farm needed her. Then a letter came: Marilla\'s cousin had died, leaving a pair of orphan twins. Could Marilla take them in?',
        },
        {
          kind: 'image',
          art: 'avonlea-twins-arrive',
          text: 'Davy and Dora Keith arrive at Green Gables with one suitcase between them.',
        },
        {
          kind: 'text',
          text: 'So Dora and Davy Keith came to Green Gables. Dora was tidy and quiet and always said her prayers. Davy had a gap in his teeth, questions in his head, and mischief in his heels. "He\'s terrible," Anne told herself after the jam incident — and then he flung his arms round her neck and said he loved her best of anybody, and she found she did not mind so very much.',
        },
        {
          kind: 'note',
          text: 'Anne is sixteen, only a few years older than her biggest pupils. Teaching school in those days meant walking to a one-room schoolhouse, ringing the bell, and teaching every grade at once — a big job for anyone.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'And now Anne had her own big job. The trustees of Avonlea school had asked her to teach. On the first morning she walked down the lane in the fresh light, her heart going pit-a-pat. The bell hung in its little tower, and forty faces would be looking up at her.',
        },
        {
          kind: 'text',
          text: '"I shall be firm," Anne had vowed. "I shall be dignified. Nobody shall dream that I am only sixteen." But when the small ones crowding in told her their small troubles, she forgot to be dignified entirely, and the first day went by as easily as a chapter in a good book.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Cow Next Door',
      art: 'avonlea-cow-lane',
      artPrompt: 'two cows standing placidly in a clover lane between two farmhouses, a young woman with red braids holding a rope and laughing, a portly elderly gentleman in a vest waving his hat from a fence, hollyhocks and a tidy white farmhouse behind, bright summer noon',
      blocks: [
        {
          kind: 'text',
          text: 'Mr. Harrison, the new neighbour, was a stout, brisk man who said exactly what he thought. He and Anne quarrelled merrily all summer — about hens, about weeds, about everything under the sun — and each of them secretly enjoyed it.',
        },
        {
          kind: 'image',
          art: 'avonlea-cow-lane',
          text: 'Anne and Mr. Harrison meet in the lane, with the two wrong cows between them.',
        },
        {
          kind: 'text',
          text: 'One day word came that a red cow had been eating Mr. Harrison\'s clover. "Then I\'ll sell her," said Anne, who owned one small red cow called Dolly — a cow with a genius for getting into gardens. She sold the intruder to a passing drover on the spot, and felt very businesslike indeed.',
        },
        {
          kind: 'note',
          text: 'New word: drover — a man who walks cattle to market for a living. A mix-up about a cow can be put right with the truth and a little laughter. What would you have done first?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'But that evening Mr. Harrison called, and by the light of his lantern Anne saw a red cow in his yard — his own cow, in fact. The cow in the clover had never been Dolly at all, and the cow she had sold was standing, quite content, in Mr. Harrison\'s field.',
        },
        {
          kind: 'text',
          text: 'They had to race to the crossroads to catch the drover before he was out of sight, and Mr. Harrison laughed until his vest shook. Dolly came home to Green Gables, the two neighbours parted better friends than before, and Anne wrote in her diary that the wisest thing she had learned all summer was to ask questions before selling cows.',
        },
      ],
    },
    {
      title: 'Chapter 3 · Anthony Pye\'s New Leaf',
      art: 'avonlea-school-desks',
      artPrompt: 'inside a one-room country schoolhouse of neat rows of wooden desks, a young woman teacher with red braids at the blackboard writing a spelling word in chalk, one sulky boy in a work jacket not writing, sunlight falling through tall windows on a jar of wildflowers, quiet afternoon glow',
      blocks: [
        {
          kind: 'text',
          text: 'Every school has one, and Avonlea\'s was Anthony Pye — a big boy who wore a sulky look and a work jacket, and who had decided in advance that school was for nothing and spelling least of all. "I ain\'t going to mind a girl teacher," he muttered, and did his worst politely.',
        },
        {
          kind: 'image',
          art: 'avonlea-school-desks',
          text: 'The spelling lesson, with one desk very quiet and very stubborn.',
        },
        {
          kind: 'text',
          text: 'Anne tried sternness, and it slid off him like rain off oilskins. She tried extra work, and he grew gloomier. At last she understood: Anthony did not need conquering. He needed something worth being proud of.',
        },
        {
          kind: 'note',
          text: 'Anne learns a teacher\'s secret: being firm is easy, but being patient enough to see why someone acts cold — that is the real work. Is there someone you decided about too quickly?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'So she found it. Anthony knew every bird and beast and stream for miles, so Anne let him tell the class about them, and the class listened, and Anthony stood straighter. The next spelling match, his word came round — and he spelled it right, and the room cheered, and he turned red as a beet and looked unbearably pleased.',
        },
        {
          kind: 'text',
          text: '"I turned over a new leaf," Anthony said gruffly, by way of apology, at the end of the term. Anne laughed and shook his hand as one person of business to another. And she walked home through the golden dusk feeling that the school bell had rung for her own lesson too.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Blue Hall',
      art: 'avonlea-hall-paint',
      artPrompt: 'a small village hall freshly and shockingly painted bright blue with a vivid red roof, a circle of villagers staring in surprise, a young woman with red braids holding a paintbrush and a tin bucket trying not to laugh, a boy and girl by an open paint pot looking guilty, clear comic summer light',
      blocks: [
        {
          kind: 'text',
          text: 'Anne had a splendid idea one winter evening: the village itself could be improved. So the A.V.I.S. — the Avonlea Village Improvement Society — was founded, with rules, officers, and great plans. Its members were Anne, her dearest friend Diana, and a handful of willing neighbours, all certain that Avonlea should be beautiful.',
        },
        {
          kind: 'image',
          art: 'avonlea-hall-paint',
          text: 'The society beholds its improved hall — improvement in every colour of blue.',
        },
        {
          kind: 'text',
          text: 'The Society\'s first great work was the old hall, grey and shabby by the crossroads. "We shall paint it," they resolved. But the paint dealer had sent a colour card that lied by lamplight, and when the job was done, the hall stood forth a fierce, astonishing, unforgettable BLUE.',
        },
        {
          kind: 'note',
          text: 'A paint colour can look one way in a catalogue and quite another on a wall. The A.V.I.S. learns the honest way: when a plan goes wrong, own up, fix it, and keep a good story for the winter evenings.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Avonlea gathered to stare. Some villagers were indignant, some were helpless with laughter, and the Society\'s members took turns wishing the ground would open. Anne, after one horrified look, led the way in doing the right thing: they scraped, they repainted, and they paid for a plain, sensible white.',
        },
        {
          kind: 'text',
          text: 'By summer the hall was white and trim, and the Society had moved on to flowers along the lane and shade trees by the church. Years afterward, Avonlea people still told the tale of the blue hall — and Anne told it best of anyone, laughing until her braids shook.',
        },
      ],
    },
    {
      title: 'Chapter 5 · The Wood Nymph',
      art: 'avonlea-wood-nymph',
      artPrompt: 'a boy with a suitcase and wide grey eyes looking up from a country lane at a young teacher with red braids reading a book beneath tall white birches, dappled spring sunlight, orchards and Prince Edward Island fields behind, fresh morning glow',
      blocks: [
        {
          kind: 'text',
          text: 'Mrs. Rachel Lynde came to live at Green Gables that spring, so that Marilla had company while Anne taught. And it was well the school was ready for surprises, for the biggest one walked in one Monday morning with a suitcase and a serious face: a new boy named Paul Irving, who had come from the great world beyond to live with his grandmother in Avonlea.',
        },
        {
          kind: 'image',
          art: 'avonlea-wood-nymph',
          text: 'Paul beholds the wood nymph of the birches — who turns out to be the new teacher.',
        },
        {
          kind: 'text',
          text: 'Paul had a story to tell before he could even sit down. The day he arrived, his carriage had passed a grove of white birches, and there in the green shadows stood a girl with red hair, reading — "a wood nymph," Paul said solemnly. He had believed in fairies since he was small, and now he knew they lived in Avonlea. Anne, who had once believed the very same thing with her whole heart, did not laugh at him at all.',
        },
        {
          kind: 'note',
          text: 'A friend who sees the world your way is a rare treasure. Paul found a teacher who kept his dreams safe; Anne found a pupil who kept hers.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Paul turned out to be the best scholar in the school and the worst speller, and his essays were so full of fancy that Anne read them aloud on Friday afternoons. Under the birches at recess he planned stories with her, and they agreed that Avonlea, looked at rightly, was as full of wonder as any kingdom in a book.',
        },
        {
          kind: 'text',
          text: '"He is a kindred spirit," Anne wrote in her diary that night, and underlined it twice — for a kindred spirit, she had good reason to know, might be met in the oddest places: a lane, a schoolhouse, or the green shadows of a birch wood.',
        },
      ],
    },
    {
      title: 'Chapter 6 · Davy and the Caramels',
      art: 'avonlea-caramels',
      artPrompt: 'a guilty gap-toothed boy holding small scissors beside a weeping little girl with half-cut curls in a farmhouse kitchen, a paper sack of chocolate caramels open on the table, a young woman with red braids torn between scolding and laughter, evening lamplight',
      blocks: [
        {
          kind: 'text',
          text: 'If Paul was the joy of Anne\'s school, Davy Keith was the joy and terror of her home. One Sunday he came back from Sunday school with two chocolate caramels, and Dora came back with four. Davy ate his two at once. Then he looked at Dora\'s four for a long time, and asked for them, and Dora — who had been told to save them — said no.',
        },
        {
          kind: 'image',
          art: 'avonlea-caramels',
          text: 'The moment nobody could undo, with the scissors still in Davy\'s hand.',
        },
        {
          kind: 'text',
          text: 'What happened next was quick as a flash: Davy found the scissors, and Dora\'s beautiful curls fell to the floor. The whole house was in an uproar. Davy was sorry — sorry all over — but sorry could not sew hair back on, and he was sent to bed knowing that being good must begin somewhere.',
        },
        {
          kind: 'note',
          text: 'When you have done a wrong thing, being sorry is the first step and mending it is the second. Davy did both, in his own gap-toothed way.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'That night Marilla went up to say prayers with the twins and heard Davy\'s own: "Please make me good — but not just yet." She came downstairs shaking with laughter she had to bury in her handkerchief, and even Marilla\'s eyes were wet — with laughing, of course.',
        },
        {
          kind: 'text',
          text: 'In a day or two Davy had given Dora all his marbles and his best jackknife by way of mending things, and peace came back to Green Gables. "He IS terrible," Anne wrote in her diary. "And I could not love him more."',
        },
      ],
    },
    {
      title: 'Chapter 7 · Echo Lodge',
      art: 'avonlea-echo-lodge',
      artPrompt: 'a mossy stone arbor in an overgrown garden full of old roses and wisteria, a small white-haired lady in soft white greeting two young women who have just come through a wood, golden summer dusk, distant grey farmhouse',
      blocks: [
        {
          kind: 'text',
          text: 'One golden July day Anne and Diana walked through the fields to a place people whispered about — Echo Lodge, an old garden gone soft and wild, with a stone arbor in the middle of it. Living there alone was Miss Lavender Lewis, a small lady with white hair and laughing eyes, whom the neighbors called odd because she talked to the echo.',
        },
        {
          kind: 'image',
          art: 'avonlea-echo-lodge',
          text: 'Miss Lavender Lewis, the dreaming lady of Echo Lodge, welcomes Anne and Diana.',
        },
        {
          kind: 'text',
          text: '"An echo answers everybody," Miss Lavender said, "which is more than most people do." Anne and the odd, dear lady became friends that very afternoon, and came again and again. At last Miss Lavender told her story: long ago she had loved a young man, and a foolish quarrel had parted them, and she had stayed here ever after, talking to the echo because it would not answer back.',
        },
        {
          kind: 'note',
          text: 'Lonely people are often just people whose talk has gone unanswered a long time. Sitting and listening is a kind of gift anyone can give.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Then came a wonder. A gentleman called at the gate one evening — Mr. Irving, home across the sea, and Paul Irving\'s father. The echo had kept her secrets all those years, but it could not keep this one: he and Miss Lavender stood looking at each other as if the long ago had come back wearing today\'s light.',
        },
      ],
    },
    {
      title: 'Chapter 8 · The Wedding at Echo Lodge',
      art: 'avonlea-wedding',
      artPrompt: 'a garden wedding under a flowering cherry at an old lodge, a small white-haired bride in soft white and a tall brown-eyed gentleman holding hands, a happy boy scattering rose petals, guests on the lawn, a young teacher with red braids smiling in the front row, bright summer morning',
      blocks: [
        {
          kind: 'text',
          text: 'Of course there was a wedding — a summer wedding in the old garden at Echo Lodge, where the roses had been waiting, so it seemed, for years. Paul Irving walked up the mossy path with his heart thumping like a drum, for the bride was his dearest friend and the groom was his own father, and both his worlds were becoming one.',
        },
        {
          kind: 'image',
          art: 'avonlea-wedding',
          text: 'The vows under the cherry tree, with the echo applauding from the garden wall.',
        },
        {
          kind: 'text',
          text: 'The vows were said under the cherry tree, and when the little company clapped, the echo clapped back, which made Miss Lavender laugh and cry at once. Paul thought it was the finest thing that had ever happened in the history of the world, and nobody present was prepared to argue with him.',
        },
        {
          kind: 'note',
          text: 'Some quarrels can be mended, even after many years — the door is never quite locked. And sometimes a wish a child has wished quietly comes true, because grown-ups finally talk.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Anne walked home through the September evening with the golden light in the lanes, thinking that her year of firsts — first pupils, first twins, first hall gone blue — had ended with a wedding. Whatever else growing up might be, she decided, it was not a thing to be afraid of.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Anne of Avonlea',
    author: 'L. M. Montgomery',
    authorDeathYear: 1942,
    jurisdiction: 'US',
    basis: 'pd-us',
    sourceUrl: 'https://www.gutenberg.org/ebooks/47',
    note: 'Published 1909; US public domain (pre-1929). Plot follows Project Gutenberg eBook #47; retold in simple English for young readers.',
  },
}
