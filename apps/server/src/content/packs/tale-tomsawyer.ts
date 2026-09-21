import type { PackBook } from '../types'

/**
 * The Adventures of Tom Sawyer — six chapters retold in simple English for young
 * readers.
 * Original: Mark Twain (Samuel L. Clemens), published 1876. Public domain in the US
 * (pre-1929) and worldwide (Twain died 1910; 70y pma expired). Selected incidents
 * follow the original novel (the whitewashed fence, the church, Jackson's Island,
 * the trial of Muff Potter, the cave, and Huck's adoption); violence softened for
 * bedtime reading; wording simplified into short sentences for children aged 9-12.
 */
export const tomSawyer: PackBook = {
  id: 'tale-tomsawyer',
  title: 'The Adventures of Tom Sawyer',
  author: 'Mark Twain',
  lang: 'en',
  category: 'tale',
  ageStage: '9-12',
  intro: 'Tom Sawyer hates Sundays, loves adventures, and can talk any boy in St. Petersburg into doing his work for him. Whitewashing a fence is only the beginning.',
  coverArt: 'tom-sawyer-cover',
  coverArtPrompt: 'a barefoot boy in a straw hat and patched overalls sitting on a bucket at a long whitewashed fence, holding out his brush to another boy who is holding an apple, a Mississippi river steamboat smoking in the distance',
  coverFrom: '#37474F',
  coverTo: '#90A4AE',
  source: 'Project Gutenberg eBook #74, public domain (Twain d. 1910)',
  chapters: [
    {
      title: 'Chapter 1 · The Whitewashed Fence',
      art: 'whitewash-fence',
      artPrompt: 'a long picket fence half covered in white paint, a barefoot boy in a straw hat painting with great artistic flourishes while other boys queue behind him holding apples, a kite and a dead rat on a string, sunny Saturday morning',
      blocks: [
        {
          kind: 'text',
          text: 'Saturday morning was come, and all the summer world was bright and fresh. Tom Sawyer stood before the fence with a bucket of whitewash and a long-handled brush. He looked at the thirty yards of fence, and the gladness left his heart. Life to him seemed nothing but trouble.',
        },
        {
          kind: 'image',
          art: 'tom-brush-bucket',
          text: 'Tom and his bucket of whitewash, and thirty yards of fence to do.',
        },
        {
          kind: 'text',
          text: 'Jim came by, and Tom tried to trade the job for a white alley marble. Then Ben Rogers came by, sailing a toy boat and pretending to be a steamboat. Tom dipped his brush and passed it along the fence with a careless, artful sweep. He did not look at Ben. He only stepped back and admired.',
        },
        {
          kind: 'note',
          text: 'New word: whitewash - a thin white paint made of lime and water, used for painting fences and cottages.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"Say, Tom, let me paint a little," said Ben. Tom shook his head. "Aunt Polly is awfully particular about this fence. It must be done very careful. I reckon there isn\'t one boy in a thousand that can do it right." That only made Ben want it more, and he offered Tom his apple.',
        },
        {
          kind: 'text',
          text: 'And so it went all that bright summer morning. Boy after boy came to laugh at Tom, and stayed to whitewash the fence, paying for the privilege with marbles and kites and a dead rat on a string. By the afternoon the fence had three coats of whitewash, Tom was rich in treasures, and he had learned a great law: work is only what a body is obliged to do, and play is whatever a body is not obliged to do.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Pinch-Bug in Church',
      art: 'pinch-bug-church',
      artPrompt: 'a wooden church pew full of boys in Sunday suits squirming, a boy with a pinch-bug between thumb and finger, a small dog wandering in the aisle looking up at the box, a minister in the pulpit in the background, sunbeams from high windows',
      blocks: [
        {
          kind: 'text',
          text: 'Sunday morning, and Tom had to put on his stiff Sunday clothes and go to church. The sermon was long and hot, and Tom writhed in the pew. But he had brought his prize pinch-bug - a great black beetle that could pinch like a pair of pincers.',
        },
        {
          kind: 'image',
          art: 'church-pew-sunday',
          text: 'In the long hot sermon, Tom lets the pinch-bug out of his box.',
        },
        {
          kind: 'text',
          text: 'The bug walked slowly down the pew, and Tom\'s heart beat fast with hope - for a stray poodle had wandered into church, and the poodle was bored too. The dog spied the beetle, wagged his tail, and sniffed. The pinch-bug seized the dog\'s nose, and the poodle gave a yelp and shot up the aisle.',
        },
        {
          kind: 'note',
          text: 'New word: sermon - the long talk the minister gives in church on Sundays. To Tom, it is the longest thing in the week.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The whole church shook with smothered laughter, and even the minister had to stop and cough. Tom went home with his head high, the hero of the day. He had broken no commandment that could be proved - and he had certainly been awake.',
        },
      ],
    },
    {
      title: 'Chapter 3 · Jackson\'s Island',
      art: 'island-campfire',
      artPrompt: 'a green island in a wide river with a smoky campfire among the trees, three boys in ragged shirts and bandanas fishing from a log, a raft drawn up on the shingle, a steamboat going by on the far shore',
      blocks: [
        {
          kind: 'text',
          text: 'Tom loved Becky Thatcher, and Becky had been angry with him, and so the whole world was black. With him went his true friend Huckleberry Finn - Huck, the son of the town drunkard, who slept in hogsheads, smoked a pipe, and went where he pleased. Joe Harper came too.',
        },
        {
          kind: 'image',
          art: 'jacksons-island',
          text: 'Tom, Huck and Joe Harper make camp on Jackson\'s Island.',
        },
        {
          kind: 'text',
          text: 'They took a raft and a ham and some bacon, and rowed away to Jackson\'s Island, in the middle of the Mississippi. "We are pirates!" said Tom. "The Black Avenger of the Spanish Main! We\'ll live here forever, and never go to school again!"',
        },
        {
          kind: 'note',
          text: 'New word: raft - a flat boat made of logs tied together. On the great rivers of America, boys and pirates alike travelled by raft.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'For two days they were happy. They fished and swam and smoked and played at being pirates, and at night they lay by the fire and listened to the river. But on the third day it rained, and they were hungry, and they heard the church bells of St. Petersburg ringing - and knew the whole town was looking for their drowned bodies.',
        },
        {
          kind: 'text',
          text: 'The boys crept back across the river in the night and into the church gallery, hidden behind the curtain, to hear their own funeral sermon. And when the minister spoke of the three lost boys, and the people wept, Tom Sawyer rose up from behind the curtain, and the whole church turned its tears to shouts of joy.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Trial',
      art: 'trial-witness-box',
      artPrompt: 'a wooden courtroom full of people, a frightened man in chains between two constables at the bar, a boy in the witness box pointing at a sinister man with a black beard sneaking out at the back, a judge in robes above',
      blocks: [
        {
          kind: 'text',
          text: 'In the graveyard one midnight, Tom and Huck had seen something terrible. Young Dr. Robinson had quarrelled with Muff Potter, and Injun Joe - a savage half-breed - had struck the doctor down and laid the blame on poor drunken Muff. The boys had sworn each other to silence.',
        },
        {
          kind: 'image',
          art: 'courtroom-trial',
          text: 'At the trial of Muff Potter, Tom points at Injun Joe - and Injun Joe is gone.',
        },
        {
          kind: 'text',
          text: 'Now Muff Potter was on trial for his life, and Tom could not sleep for thinking of it. On the last day of the trial he went into the witness box and told the truth: he told how he had hidden behind the graves and seen Injun Joe strike the blow, while Muff Potter lay senseless on the ground.',
        },
        {
          kind: 'note',
          text: 'New word: witness - a person who has seen something with his own eyes, and comes to court to tell the truth about it.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Injun Joe sprang for the window like a cat and was gone, and the courtroom roared, and Muff Potter was set free. Tom was the hero of the town, and Huck said he would never have believed a boy could tell. But every night Tom dreamed of Injun Joe, and no gold or glory could buy him a quiet sleep.',
        },
      ],
    },
    {
      title: 'Chapter 5 · Lost in the Cave',
      art: 'cave-labyrinth',
      artPrompt: 'a dark limestone cave with stalactites and a still underground lake, a boy and a girl in Sunday clothes holding one candle between them, the flame tiny against the enormous darkness, marks in chalk on the wall',
      blocks: [
        {
          kind: 'text',
          text: 'Some weeks later came the grand picnic at McDougal\'s Cave, a vast labyrinth of stone passages under the hill. The children went in with candles and explored the winding tunnels. Tom and Becky went farther and farther down, past the wonder of the stalactites, and behind a waterfall of stone.',
        },
        {
          kind: 'image',
          art: 'becky-cave-candle',
          text: 'Tom and Becky, with one candle left, and the cave all about them.',
        },
        {
          kind: 'text',
          text: 'Then their last candle went out. They were lost. The blackness was like a weight on their eyes. They shouted, and only the echoes answered. Tom kissed Becky, and she cried, and they slept on the cold stone, not knowing night from day.',
        },
        {
          kind: 'note',
          text: 'New word: stalactite - a stone icicle that hangs from the roof of a cave, made drop by drop over thousands of years.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Tom took a kite string and went crawling down one passage after another, marking the way with chalk. And in one tunnel he saw a hand, holding a candle - and the hand belonged to Injun Joe! Tom\'s heart stood still. But the cave had many voices, and Injun Joe fled, and Tom crawled back to Becky.',
        },
        {
          kind: 'text',
          text: 'At last, faint with hunger, Tom saw a daylight far off, like a star. It was a little hole in the rock, and through it he saw the bright river and the sky. He pulled Becky after him, and they came out into the sunshine, and the town went mad with joy. Judge Thatcher had the great door of the cave locked and barred - and inside it, behind the door, was Injun Joe, who would trouble the town no more.',
        },
      ],
    },
    {
      title: 'Chapter 6 · The Treasure and Huck',
      art: 'digging-treasure',
      artPrompt: 'a moonlit clearing under a giant sycamore with a cross marked in smoke on the bark, two boys with picks digging at the roots, an iron box with a padlock sticking out of the loose earth, coins spilling',
      blocks: [
        {
          kind: 'text',
          text: 'Tom had seen Injun Joe dig in the haunted house, and he knew where to look. Under a great sycamore, marked with a cross of smoke, Tom and Huck dug until the picks rang on iron. It was a strong box, and inside it lay twelve thousand dollars in gold.',
        },
        {
          kind: 'image',
          art: 'treasure-cross-mark',
          text: 'Under the cross on the sycamore, the boys find the iron box.',
        },
        {
          kind: 'text',
          text: 'The treasure was carried into town in a wagon, and St. Petersburg had never seen such a day. Tom and Huck were rich. Tom\'s money was put out at interest, and Judge Thatcher clapped him on the shoulder and called him a remarkable boy.',
        },
        {
          kind: 'note',
          text: 'New word: interest - the extra money a bank pays you every year for keeping your money safe.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'But Huck was miserable. The Widow Douglas took him in, washed him, combed him, and put him in clean clothes and a stiff collar. He had to sleep in a bed and eat with a fork and go to school - and he could not bear it. He ran away and lived in the hogshead again, ragged and free.',
        },
        {
          kind: 'text',
          text: 'Tom found him there. "Huck," he said, "if you go back to the widow and learn your lessons and behave, I will let you join my robber band - and you shall be the first mate." Huck\'s eyes shone. Robbers sounded better than angels. "I\'ll try her a spell longer, Tom," he said. And so the two friends went home together under the stars.',
        },
      ],
    },
    {
      title: 'Chapter 7 · David and Goliath',
      art: 'sunday-school-tickets',
      artPrompt: 'a small wooden Sunday school room with rows of children in stiff Sunday jackets, a boy standing red-faced before the superintendent holding a blue Bible above his head, a dignified judge with a golden-haired little girl in the front pew, red and yellow paper tickets scattered on a desk',
      blocks: [
        {
          kind: 'text',
          text: 'Tom\'s heart was never in his Bible verses, but he wanted the prize. A blue ticket was given for two verses learned, ten blue tickets made a red one, ten red made a yellow, and ten yellow made the grand prize - a beautiful Bible, given out by hand before the whole Sunday school.',
        },
        {
          kind: 'image',
          art: 'tom-bible-prize',
          text: 'Tom marches up with his pockets full of tickets to win the Bible.',
        },
        {
          kind: 'note',
          text: 'New word: disciple - one of the twelve friends who followed and learned from Jesus. Tom was asked to name the first two of them.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'So Tom traded. His fence-day treasures went for tickets, marble by marble, kite by kite, till his pockets were full. And that very morning a new judge, Mr. Thatcher, sat in the school with his lovely little daughter Becky, and Tom longed to stand in glory before her eyes. Up he marched, and Mr. Walters, the superintendent, could not believe his own spectacles. Tom Sawyer - the Bible prize!',
        },
        {
          kind: 'text',
          text: 'The judge shook his hand and asked him kindly: "Now, my boy, can you tell me the names of the first two disciples that were called?" Tom went white, then red, hung his head, and said at last: "David and Goliath!" The whole school bit its lips to keep from laughing. "Let him up," sighed the minister, "he is only a little boy." And Tom sat down in glory all the same.',
        },
      ],
    },
    {
      title: 'Chapter 8 · The Torn Book',
      art: 'torn-anatomy-book',
      artPrompt: 'a strict village schoolroom with slanting wooden desks and a globe, a large book lying open on the schoolmaster\'s desk with one page torn out, a golden-haired girl standing pale beside it, a bald schoolmaster with a birch rod glowering, a boy springing up from his seat with his hand raised',
      blocks: [
        {
          kind: 'text',
          text: 'Mr. Dobbins, the schoolmaster, kept a mystery locked in his desk - a book he guarded like treasure. He was a foolish, kind-hearted man who dreamed of being a doctor, and the book was an anatomy, the book that shows what a person looks like inside. Every child in the school would have given anything for one peep at it.',
        },
        {
          kind: 'image',
          art: 'becky-page-tear',
          text: 'Becky peeps into the forbidden book - and the page tears.',
        },
        {
          kind: 'note',
          text: 'New word: anatomy - a book that shows the inside of the human body, such as doctors study. To Mr. Dobbins it was his secret pride.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'One noon, when the master was asleep, Becky found the desk unlocked. But just as she bent over the painted picture, Tom stood behind her - and she jumped, snatched at the book, and tore the page half across. She burst out crying. "Oh, Tom, you will tell!" she sobbed. "I won\'t tell," said Tom. "Let me take it for you, Becky."',
        },
        {
          kind: 'text',
          text: 'When Mr. Dobbins found the torn page he thundered, "Who tore this book?" and went down the rows, girl after boy, and none would speak. Then he came to Becky. She trembled and turned white - and Tom sprang to his feet and cried: "I done it!" He took the fierce whipping without a whimper, and afterwards Becky whispered, "Tom, how could you be so noble!" And Tom walked home happy, for he had won something better than a prize.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Adventures of Tom Sawyer',
    author: 'Mark Twain',
    authorDeathYear: 1910,
    jurisdiction: 'US',
    basis: 'pd-us',
    sourceUrl: 'https://www.gutenberg.org/ebooks/74',
    note: 'Retold in simple English; plot follows the public-domain original.',
  },
}
