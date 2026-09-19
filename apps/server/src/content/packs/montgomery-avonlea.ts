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
