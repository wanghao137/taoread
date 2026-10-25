/**
 * The Adventures of Tom Sawyer — complete 35-chapter edition, retold in simple English from the original public-domain text.
 * Existing chapters retained; missing chapters completed 2026-10-25 (找故事全量补全).
 */
import type { PackBook } from '../types'

export const tomSawyer: PackBook = {
  "id": "tale-tomsawyer",
  "title": "The Adventures of Tom Sawyer",
  "author": "Mark Twain",
  "lang": "en",
  "category": "tale",
  "ageStage": "9-12",
  "intro": "Tom Sawyer hates Sundays, loves adventures, and can talk any boy in St. Petersburg into doing his work for him. Whitewashing a fence is only the beginning.",
  "coverArt": "tom-sawyer-cover",
  "coverArtPrompt": "a barefoot boy in a straw hat and patched overalls sitting on a bucket at a long whitewashed fence, holding out his brush to another boy who is holding an apple, a Mississippi river steamboat smoking in the distance",
  "coverFrom": "#37474F",
  "coverTo": "#90A4AE",
  "source": "Project Gutenberg eBook #74, public domain (Twain d. 1910)",
  "chapters": [
    {
      "title": "Chapter 1 · The Whitewashed Fence",
      "art": "whitewash-fence",
      "artPrompt": "a long picket fence half covered in white paint, a barefoot boy in a straw hat painting with great artistic flourishes while other boys queue behind him holding apples, a kite and a dead rat on a string, sunny Saturday morning",
      "blocks": [
        {
          "kind": "text",
          "text": "Saturday morning was come, and all the summer world was bright and fresh. Tom Sawyer stood before the fence with a bucket of whitewash and a long-handled brush. He looked at the thirty yards of fence, and the gladness left his heart. Life to him seemed nothing but trouble."
        },
        {
          "kind": "image",
          "art": "tom-brush-bucket",
          "text": "Tom and his bucket of whitewash, and thirty yards of fence to do."
        },
        {
          "kind": "text",
          "text": "Jim came by, and Tom tried to trade the job for a white alley marble. Then Ben Rogers came by, sailing a toy boat and pretending to be a steamboat. Tom dipped his brush and passed it along the fence with a careless, artful sweep. He did not look at Ben. He only stepped back and admired."
        },
        {
          "kind": "note",
          "text": "New word: whitewash - a thin white paint made of lime and water, used for painting fences and cottages.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "\"Say, Tom, let me paint a little,\" said Ben. Tom shook his head. \"Aunt Polly is awfully particular about this fence. It must be done very careful. I reckon there isn't one boy in a thousand that can do it right.\" That only made Ben want it more, and he offered Tom his apple."
        },
        {
          "kind": "text",
          "text": "And so it went all that bright summer morning. Boy after boy came to laugh at Tom, and stayed to whitewash the fence, paying for the privilege with marbles and kites and a dead rat on a string. By the afternoon the fence had three coats of whitewash, Tom was rich in treasures, and he had learned a great law: work is only what a body is obliged to do, and play is whatever a body is not obliged to do."
        }
      ]
    },
    {
      "title": "Chapter 2 · The Pinch-Bug in Church",
      "art": "pinch-bug-church",
      "artPrompt": "a wooden church pew full of boys in Sunday suits squirming, a boy with a pinch-bug between thumb and finger, a small dog wandering in the aisle looking up at the box, a minister in the pulpit in the background, sunbeams from high windows",
      "blocks": [
        {
          "kind": "text",
          "text": "Sunday morning, and Tom had to put on his stiff Sunday clothes and go to church. The sermon was long and hot, and Tom writhed in the pew. But he had brought his prize pinch-bug - a great black beetle that could pinch like a pair of pincers."
        },
        {
          "kind": "image",
          "art": "church-pew-sunday",
          "text": "In the long hot sermon, Tom lets the pinch-bug out of his box."
        },
        {
          "kind": "text",
          "text": "The bug walked slowly down the pew, and Tom's heart beat fast with hope - for a stray poodle had wandered into church, and the poodle was bored too. The dog spied the beetle, wagged his tail, and sniffed. The pinch-bug seized the dog's nose, and the poodle gave a yelp and shot up the aisle."
        },
        {
          "kind": "note",
          "text": "New word: sermon - the long talk the minister gives in church on Sundays. To Tom, it is the longest thing in the week.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "The whole church shook with smothered laughter, and even the minister had to stop and cough. Tom went home with his head high, the hero of the day. He had broken no commandment that could be proved - and he had certainly been awake."
        }
      ]
    },
    {
      "title": "Chapter 3 · Jackson's Island",
      "art": "island-campfire",
      "artPrompt": "a green island in a wide river with a smoky campfire among the trees, three boys in ragged shirts and bandanas fishing from a log, a raft drawn up on the shingle, a steamboat going by on the far shore",
      "blocks": [
        {
          "kind": "text",
          "text": "Tom loved Becky Thatcher, and Becky had been angry with him, and so the whole world was black. With him went his true friend Huckleberry Finn - Huck, the son of the town drunkard, who slept in hogsheads, smoked a pipe, and went where he pleased. Joe Harper came too."
        },
        {
          "kind": "image",
          "art": "jacksons-island",
          "text": "Tom, Huck and Joe Harper make camp on Jackson's Island."
        },
        {
          "kind": "text",
          "text": "They took a raft and a ham and some bacon, and rowed away to Jackson's Island, in the middle of the Mississippi. \"We are pirates!\" said Tom. \"The Black Avenger of the Spanish Main! We'll live here forever, and never go to school again!\""
        },
        {
          "kind": "note",
          "text": "New word: raft - a flat boat made of logs tied together. On the great rivers of America, boys and pirates alike travelled by raft.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "For two days they were happy. They fished and swam and smoked and played at being pirates, and at night they lay by the fire and listened to the river. But on the third day it rained, and they were hungry, and they heard the church bells of St. Petersburg ringing - and knew the whole town was looking for their drowned bodies."
        },
        {
          "kind": "text",
          "text": "The boys crept back across the river in the night and into the church gallery, hidden behind the curtain, to hear their own funeral sermon. And when the minister spoke of the three lost boys, and the people wept, Tom Sawyer rose up from behind the curtain, and the whole church turned its tears to shouts of joy."
        }
      ]
    },
    {
      "title": "Chapter 4 · The Trial",
      "art": "trial-witness-box",
      "artPrompt": "a wooden courtroom full of people, a frightened man in chains between two constables at the bar, a boy in the witness box pointing at a sinister man with a black beard sneaking out at the back, a judge in robes above",
      "blocks": [
        {
          "kind": "text",
          "text": "In the graveyard one midnight, Tom and Huck had seen something terrible. Young Dr. Robinson had quarrelled with Muff Potter, and Injun Joe - a savage half-breed - had struck the doctor down and laid the blame on poor drunken Muff. The boys had sworn each other to silence."
        },
        {
          "kind": "image",
          "art": "courtroom-trial",
          "text": "At the trial of Muff Potter, Tom points at Injun Joe - and Injun Joe is gone."
        },
        {
          "kind": "text",
          "text": "Now Muff Potter was on trial for his life, and Tom could not sleep for thinking of it. On the last day of the trial he went into the witness box and told the truth: he told how he had hidden behind the graves and seen Injun Joe strike the blow, while Muff Potter lay senseless on the ground."
        },
        {
          "kind": "note",
          "text": "New word: witness - a person who has seen something with his own eyes, and comes to court to tell the truth about it.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "Injun Joe sprang for the window like a cat and was gone, and the courtroom roared, and Muff Potter was set free. Tom was the hero of the town, and Huck said he would never have believed a boy could tell. But every night Tom dreamed of Injun Joe, and no gold or glory could buy him a quiet sleep."
        }
      ]
    },
    {
      "title": "Chapter 5 · Lost in the Cave",
      "art": "cave-labyrinth",
      "artPrompt": "a dark limestone cave with stalactites and a still underground lake, a boy and a girl in Sunday clothes holding one candle between them, the flame tiny against the enormous darkness, marks in chalk on the wall",
      "blocks": [
        {
          "kind": "text",
          "text": "Some weeks later came the grand picnic at McDougal's Cave, a vast labyrinth of stone passages under the hill. The children went in with candles and explored the winding tunnels. Tom and Becky went farther and farther down, past the wonder of the stalactites, and behind a waterfall of stone."
        },
        {
          "kind": "image",
          "art": "becky-cave-candle",
          "text": "Tom and Becky, with one candle left, and the cave all about them."
        },
        {
          "kind": "text",
          "text": "Then their last candle went out. They were lost. The blackness was like a weight on their eyes. They shouted, and only the echoes answered. Tom kissed Becky, and she cried, and they slept on the cold stone, not knowing night from day."
        },
        {
          "kind": "note",
          "text": "New word: stalactite - a stone icicle that hangs from the roof of a cave, made drop by drop over thousands of years.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "Tom took a kite string and went crawling down one passage after another, marking the way with chalk. And in one tunnel he saw a hand, holding a candle - and the hand belonged to Injun Joe! Tom's heart stood still. But the cave had many voices, and Injun Joe fled, and Tom crawled back to Becky."
        },
        {
          "kind": "text",
          "text": "At last, faint with hunger, Tom saw a daylight far off, like a star. It was a little hole in the rock, and through it he saw the bright river and the sky. He pulled Becky after him, and they came out into the sunshine, and the town went mad with joy. Judge Thatcher had the great door of the cave locked and barred - and inside it, behind the door, was Injun Joe, who would trouble the town no more."
        }
      ]
    },
    {
      "title": "Chapter 6 · The Treasure and Huck",
      "art": "digging-treasure",
      "artPrompt": "a moonlit clearing under a giant sycamore with a cross marked in smoke on the bark, two boys with picks digging at the roots, an iron box with a padlock sticking out of the loose earth, coins spilling",
      "blocks": [
        {
          "kind": "text",
          "text": "Tom had seen Injun Joe dig in the haunted house, and he knew where to look. Under a great sycamore, marked with a cross of smoke, Tom and Huck dug until the picks rang on iron. It was a strong box, and inside it lay twelve thousand dollars in gold."
        },
        {
          "kind": "image",
          "art": "treasure-cross-mark",
          "text": "Under the cross on the sycamore, the boys find the iron box."
        },
        {
          "kind": "text",
          "text": "The treasure was carried into town in a wagon, and St. Petersburg had never seen such a day. Tom and Huck were rich. Tom's money was put out at interest, and Judge Thatcher clapped him on the shoulder and called him a remarkable boy."
        },
        {
          "kind": "note",
          "text": "New word: interest - the extra money a bank pays you every year for keeping your money safe.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "But Huck was miserable. The Widow Douglas took him in, washed him, combed him, and put him in clean clothes and a stiff collar. He had to sleep in a bed and eat with a fork and go to school - and he could not bear it. He ran away and lived in the hogshead again, ragged and free."
        },
        {
          "kind": "text",
          "text": "Tom found him there. \"Huck,\" he said, \"if you go back to the widow and learn your lessons and behave, I will let you join my robber band - and you shall be the first mate.\" Huck's eyes shone. Robbers sounded better than angels. \"I'll try her a spell longer, Tom,\" he said. And so the two friends went home together under the stars."
        }
      ]
    },
    {
      "title": "Chapter 7 · David and Goliath",
      "art": "sunday-school-tickets",
      "artPrompt": "a small wooden Sunday school room with rows of children in stiff Sunday jackets, a boy standing red-faced before the superintendent holding a blue Bible above his head, a dignified judge with a golden-haired little girl in the front pew, red and yellow paper tickets scattered on a desk",
      "blocks": [
        {
          "kind": "text",
          "text": "Tom's heart was never in his Bible verses, but he wanted the prize. A blue ticket was given for two verses learned, ten blue tickets made a red one, ten red made a yellow, and ten yellow made the grand prize - a beautiful Bible, given out by hand before the whole Sunday school."
        },
        {
          "kind": "image",
          "art": "tom-bible-prize",
          "text": "Tom marches up with his pockets full of tickets to win the Bible."
        },
        {
          "kind": "note",
          "text": "New word: disciple - one of the twelve friends who followed and learned from Jesus. Tom was asked to name the first two of them.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "So Tom traded. His fence-day treasures went for tickets, marble by marble, kite by kite, till his pockets were full. And that very morning a new judge, Mr. Thatcher, sat in the school with his lovely little daughter Becky, and Tom longed to stand in glory before her eyes. Up he marched, and Mr. Walters, the superintendent, could not believe his own spectacles. Tom Sawyer - the Bible prize!"
        },
        {
          "kind": "text",
          "text": "The judge shook his hand and asked him kindly: \"Now, my boy, can you tell me the names of the first two disciples that were called?\" Tom went white, then red, hung his head, and said at last: \"David and Goliath!\" The whole school bit its lips to keep from laughing. \"Let him up,\" sighed the minister, \"he is only a little boy.\" And Tom sat down in glory all the same."
        }
      ]
    },
    {
      "title": "Chapter 8 · The Torn Book",
      "art": "torn-anatomy-book",
      "artPrompt": "a strict village schoolroom with slanting wooden desks and a globe, a large book lying open on the schoolmaster's desk with one page torn out, a golden-haired girl standing pale beside it, a bald schoolmaster with a birch rod glowering, a boy springing up from his seat with his hand raised",
      "blocks": [
        {
          "kind": "text",
          "text": "Mr. Dobbins, the schoolmaster, kept a mystery locked in his desk - a book he guarded like treasure. He was a foolish, kind-hearted man who dreamed of being a doctor, and the book was an anatomy, the book that shows what a person looks like inside. Every child in the school would have given anything for one peep at it."
        },
        {
          "kind": "image",
          "art": "becky-page-tear",
          "text": "Becky peeps into the forbidden book - and the page tears."
        },
        {
          "kind": "note",
          "text": "New word: anatomy - a book that shows the inside of the human body, such as doctors study. To Mr. Dobbins it was his secret pride.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "One noon, when the master was asleep, Becky found the desk unlocked. But just as she bent over the painted picture, Tom stood behind her - and she jumped, snatched at the book, and tore the page half across. She burst out crying. \"Oh, Tom, you will tell!\" she sobbed. \"I won't tell,\" said Tom. \"Let me take it for you, Becky.\""
        },
        {
          "kind": "text",
          "text": "When Mr. Dobbins found the torn page he thundered, \"Who tore this book?\" and went down the rows, girl after boy, and none would speak. Then he came to Becky. She trembled and turned white - and Tom sprang to his feet and cried: \"I done it!\" He took the fierce whipping without a whimper, and afterwards Becky whispered, \"Tom, how could you be so noble!\" And Tom walked home happy, for he had won something better than a prize."
        }
      ]
    },
    {
      "title": "Chapter 9 · The Gilded Dome",
      "art": "tom-gilded-dome",
      "artPrompt": "a crowded village schoolroom on examination evening, children in Sunday clothes reciting on a platform, a bald schoolmaster nodding asleep behind a tilted blackboard, warm lantern light, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "Tom came to school next morning like a conquering hero. Becky smiled at him across the schoolroom, and that smile was better than any prize in the world. The boys looked at him with envy, and the girls looked at him with wonder. But Tom had little time to enjoy it. The last day of the school year was hurrying near, and with it came Examination Day."
        },
        {
          "kind": "image",
          "art": "tom-gilded-dome",
          "text": "The schoolhouse fills with proud parents for the great Examination Day."
        },
        {
          "kind": "text",
          "text": "On that evening the schoolhouse was full from wall to wall. Farmers and their wives sat in the best seats, fanning themselves. The little ones stood up bravely and recited their pieces. Boys in stiff collars spelled against each other for a prize. Girls in ribbons read essays full of long, fine words about Friendship and Faith. The audience clapped everything warmly. It was a grand evening, and St. Petersburg was proud of its children."
        },
        {
          "kind": "note",
          "text": "New word: examination - the great school show at the end of the year, when parents come to hear what the children have learned.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "Mr. Dobbins, the master, had worked hard for weeks training his scholars. He was tired out, and he sat down behind the great blackboard to rest his eyes. Behind that screen nobody could see him, and presently he began to nod. Now some of the boys owed him grudges. They slipped up behind the sleeping master with a pot of gold leaf. Softly they gilded his bald head till it shone like the morning sun. Then they slid back to their seats, innocent as angels."
        },
        {
          "kind": "text",
          "text": "At last the moment came to give out the prizes. Mr. Dobbins rose and bowed to the audience. The candlelight flashed upon his head, and it glittered like a golden dome. The whole house roared. Boys howled, ladies waved their fans, and even the minister held his sides. The poor master rubbed his head and stared at the gold on his hand. So ended the examinations. Tom raced out into the sunlight, and three golden months of vacation lay before him."
        }
      ]
    },
    {
      "title": "Chapter 10 · The Long Vacation",
      "art": "tom-lazy-summer",
      "artPrompt": "a drowsy village street in high summer, a boy lying idle in the shade of a fence rail with a straw hat over his face, shimmering golden afternoon light, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "The first days of vacation were pure delight. Tom swam in the river until his shoulders ached. He fished, and lay in the grass, and did nothing at all. The days were long and hot, and the world belonged to the boys. But even a holiday can grow too long. By and by swimming lost its sweetness, and fishing lost its fun. Tom sat on the fence and yawned at the empty road. Never had time dragged so slowly in St. Petersburg."
        },
        {
          "kind": "image",
          "art": "tom-lazy-summer",
          "text": "The long, lazy days of vacation, when even doing nothing grows dull."
        },
        {
          "kind": "text",
          "text": "Then for one whole day a circus came to town. Tom spent his saved pennies and shouted himself hoarse at the clowns. For days afterwards the boys played circus in the lanes. They turned tubs into horses and fences into arenas. But every boy wanted to be the clown, and that made trouble. Then the circus rolled away down the river, and the pennies went with it. After that the village seemed duller than ever before."
        },
        {
          "kind": "text",
          "text": "Tom and Joe Harper tried playing at robbers in the woods. They wore red handkerchiefs and leapt out at each other from the bushes. But a robber needs somebody to rob. After a week the game wore out, for there was nothing in the town worth taking. Tom grew so low in spirits that he wished he could die, just for a little while. Dying temporarily would at least be an adventure. But as that was out of the question, he sighed and waited for something to happen."
        },
        {
          "kind": "note",
          "text": "Talk together: Tom says even holidays can grow too long. Do you think that is true? What would you do with a whole free summer?",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "Something was coming, though Tom did not know it yet. In the village jail a man waited for his trial. On the river a ferryboat was making ready for a picnic. And high on Cardiff Hill two boys would soon go digging for buried gold. The second half of Tom's summer was to be anything but dull."
        }
      ]
    },
    {
      "title": "Chapter 11 · The Cadets of Temperance",
      "art": "tom-temperance-sash",
      "artPrompt": "a boys' parade on a dusty village street, a proud boy in a scarlet sash and shoulder straps marching at the front beside a drum and banner, bright noon light, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "A new society had been formed in St. Petersburg: the Cadets of Temperance. The members marched in parades wearing red sashes, shoulder straps, and shining belts. Tom had never once thought about temperance in his life. But the fine regalia went straight to his heart. He joined the Cadets at once and signed the pledge. The pledge was a solemn promise never to smoke or chew tobacco again. That very day he strutted down the street, and every boy in town envied him."
        },
        {
          "kind": "image",
          "art": "tom-temperance-sash",
          "text": "Tom marches with the Cadets of Temperance, splendid in his new red sash."
        },
        {
          "kind": "text",
          "text": "His glory lasted several days. Tom wore his sash to the mill and to the post office, even when there was no parade at all. He looked at himself in every shop window. Small boys followed him for a block, and he let them. He wished Becky Thatcher could see him, but Becky was away with her parents for the summer. Then the charm began to fade. A sash is a fine thing, but a promise is a heavy thing. Tom had sworn off his pipe, and summer evenings were long."
        },
        {
          "kind": "note",
          "text": "New word: pledge - a solemn promise. Tom's pledge was to give up tobacco, and he found it very hard to keep.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "At last Tom quietly gave back his sash and resigned from the Cadets. That very evening he sat by the river with his old pipe, smoking in perfect peace. He told Huck that being temperate was harder work than being a pirate. Huck believed him. He had never trusted a sash in his life. A free boy again, Tom decided that glory was cheaper than it looked."
        },
        {
          "kind": "text",
          "text": "So the slow, warm days went by. But while Tom fished and marched and yawned, a shadow hung over the town. In the jail on the square, Muff Potter waited for his trial. It was set for August. And Tom knew something about that midnight in the graveyard that no lawyer knew. At night he turned and tossed, and the bright summer seemed suddenly dark."
        }
      ]
    },
    {
      "title": "Chapter 12 · A Friend in Jail",
      "art": "tom-jail-grating",
      "artPrompt": "a small brick village jail window with iron bars, a boy slipping little gifts through the grating to a ragged, weary man inside, soft evening light, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "Tom had not forgotten the graveyard. He and Huck had sworn a terrible oath, never to tell what they saw that midnight. Injun Joe had struck the doctor down, and laid the blame on poor drunken Muff Potter. Now Muff sat in jail, friendless, and the whole town judged him guilty. Even the newspapers were against him. Nobody remembered that Muff had once been kind to every boy in the village. The reward for Injun Joe brought no hunters, for he was gone like smoke. The whole town counted the days to the trial."
        },
        {
          "kind": "image",
          "art": "tom-jail-grating",
          "text": "Tom brings little gifts to Muff Potter at the barred jail window."
        },
        {
          "kind": "text",
          "text": "Tom's conscience would not let him rest. Every few days he brought small treasures to the jail window. He carried a smooth pipe, a little tobacco, an apple, a marble. Muff Potter always wept when he saw him. “Tom, you have been a friend to me,” the poor man would say. “You have been a true friend, and I won't forget it.” Tom would walk away with his heart breaking. Huck had the same bad nights, but the boys never spoke of them."
        },
        {
          "kind": "note",
          "text": "New word: conscience - the small voice inside you that speaks up when something is wrong. Tom's conscience talked to him all summer.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "For Muff Potter had mended their kites and helped their fishing lines in better days. He was a poor, weak, drunken fellow, but he had never harmed a child. The trial came on like a black cloud. Each night Tom thought more about the witness box, and slept less. He had sworn silence. But an oath sits heavy on a boy in summer, when a man's life is weighing."
        },
        {
          "kind": "text",
          "text": "At last the August morning came. The courtroom filled early, and farmers crowded in from all the country around. Muff Potter was brought in, pale and trembling. The lawyers rose, the judge took his seat, and the great trial began. Somewhere in the crowd sat Tom Sawyer, with his heart hammering. It was the biggest day St. Petersburg could remember."
        }
      ]
    },
    {
      "title": "Chapter 13 · Tom Tells the Truth",
      "art": "tom-trial-truth",
      "artPrompt": "a wooden courtroom packed with villagers, a small boy standing steady in the witness box, a frightened bearded man in chains, a judge high on the bench, tall sunlit windows, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "The trial lasted two days. Witnesses told how the knife was found, and how Muff Potter had been seen near the graveyard that night. It all looked black against the prisoner, and the town said he would surely hang. On the third morning, the lawyer for Muff Potter rose with a strange smile. “We have one more witness,” he said. “Call Thomas Sawyer.” Even the judge leaned forward, polishing his spectacles."
        },
        {
          "kind": "image",
          "art": "tom-trial-truth",
          "text": "Tom climbs into the witness box and tells the truth about the graveyard."
        },
        {
          "kind": "text",
          "text": "A buzz of wonder ran around the room. Tom climbed into the witness box, pale but steady. He told how he and Huck had hidden among the elms that midnight. He told how the three men quarrelled, and how Muff Potter was struck down senseless. The lawyers asked their questions gently, and Tom told it all. “The doctor struck Muff down with the grave-board,” he said. “Then Injun Joe took the knife and struck the doctor down. Muff never moved.”"
        },
        {
          "kind": "note",
          "text": "New word: verdict - the decision of the jury: guilty, or not guilty. The whole room held its breath for the verdict.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "For one moment the courtroom sat frozen in silence. Then every face turned. Injun Joe sprang from his seat, threw a man aside, and leapt through the window. He was gone before the sheriff could raise a hand. The room burst into a roar like thunder. The jury took no time at all. Muff Potter was innocent, and they said so before the echo of the window died away."
        },
        {
          "kind": "text",
          "text": "So Muff Potter walked out of the courtroom a free man, weeping and blessing Tom Sawyer. Tom was the hero of the town, greater than ever before. Old men shook his hand, and the village paper praised him. Old friends clapped him on the back till it ached. But two people in St. Petersburg slept badly that night. Tom and Huck feared one thing above all others. The half-breed had escaped, and nobody knew where he slept. Revenge was a word Injun Joe knew well."
        }
      ]
    },
    {
      "title": "Chapter 14 · The Hero with Bad Dreams",
      "art": "tom-bad-dreams",
      "artPrompt": "a boy tossing in a small bed under a quilt in a dark bedroom, moonlight through the window, a shadowy bearded face drifting in his dream above him, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "Being a hero, Tom discovered, did not make a boy happy. He lay awake at night listening to every sound. Was that the creak of a stair, or a hand at the window? Twice he dreamed that Injun Joe stood over him in the dark. Huck had the same dreams, for he slept in doorways and empty barrels. A reward was offered for the half-breed, but no man dared hunt far for him. Little by little, time is kind to boys, and fear wears thin as a river wears a stone."
        },
        {
          "kind": "image",
          "art": "tom-bad-dreams",
          "text": "A hero by day, Tom lies awake at night and dreams of a shadow with a knife."
        },
        {
          "kind": "note",
          "text": "Talk together: Tom does a brave thing and then feels afraid. Can a brave person still feel afraid? Which is the braver part?",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "The summer days were too bright for long fears. Tom's thoughts crept back to fishing and swimming and idle joy. Boys who had once envied him now copied the very way he walked. Then, one morning, a new idea walked into his head and would not walk out again. He hurried to find Huck Finn, and found him in his old place among the barrels."
        },
        {
          "kind": "text",
          "text": "“Huck,” said Tom, “let's go and dig for buried treasure.” Huck sat up at once, wide awake. “Treasure?” he said. “What is treasure?” “Gold and silver, of course,” said Tom. “Coins in iron boxes, buried in the ground by robbers.” Huck scratched his head. “Who buried it there?” “Robbers do,” said Tom. “They hide it in haunted houses, on islands, and under dead trees. Then they go away and forget, or die. It lies there and waits. Sometimes for a hundred years.”"
        },
        {
          "kind": "text",
          "text": "“Where will we dig?” asked Huck. Tom pointed up the river toward Cardiff Hill. “Under the dead-limb tree,” he said, “the one with the strange look about it. If there is treasure anywhere, it is there. Nobody watches a dead tree but ghosts.” Huck shivered, but he agreed all the same. And so the two partners shook hands on it, and the treasure hunt began."
        }
      ]
    },
    {
      "title": "Chapter 15 · Digging on Cardiff Hill",
      "art": "tom-dead-limb",
      "artPrompt": "two boys with a pick and shovel digging hard under a bare dead tree on a green hill at noon, a river village far below, bright summer light, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "The next day the two partners climbed Cardiff Hill with a pick and a shovel. At the top stood a great dead tree, one limb bare and white against the sky. “Robbers always bury their treasure under a dead limb,” said Tom. “A marked tree means money under it, everybody knows that. Pick there, Huck, pick there!” So they dug and dug in the heat, until their backs ached. The hole grew deep. The treasure did not appear."
        },
        {
          "kind": "image",
          "art": "tom-dead-limb",
          "text": "Tom and Huck dig for treasure under the dead-limb tree on Cardiff Hill."
        },
        {
          "kind": "text",
          "text": "“Where is it?” gasped Huck at last. Tom climbed out of the hole and thought hard. “I know what we did wrong,” he said. “We dug under the limb in the daytime. But a robber hides his gold at midnight, and at midnight the shadow falls in a different place. We must dig where the shadow of the limb falls at midnight.” That night the boys crept back with a lantern and dug again under the cold moonlight. Still they found nothing but stones and earth."
        },
        {
          "kind": "note",
          "text": "New word: shadow - the dark shape a thing throws when a light shines behind it. Midnight shadows point where noon shadows do not.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "Late that night the boys crept home, tired and empty-handed. “It is no use,” said Tom at last. “There is no treasure under that tree.” “I thought so,” said Huck. “But never you mind. There is one more place left, and it is the best of all.” Tom looked over his shoulder and spoke low. “Tomorrow,” he said, “we go to the haunted house on Still-House branch.”"
        },
        {
          "kind": "text",
          "text": "Huck's teeth chattered, but treasure is treasure. All the way home the partners talked of gold and robbers and ghosts. The dead limb had failed them. Perhaps the ghosts kept the better luck. And neither boy guessed how near the real treasure lay, nor who was already carrying it away. They agreed to meet at noon, right after dinner. That night both boys dreamed of iron boxes, and neither slept well."
        }
      ]
    },
    {
      "title": "Chapter 16 · The Haunted House",
      "art": "tom-haunted-house",
      "artPrompt": "a crooked, empty old wooden house with boarded windows on a lonely hillside, two small boys with a pick and shovel standing at the door, grey afternoon light, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "The haunted house stood alone on the Still-House branch, grey and leaning. Nobody had lived in it for years, and nobody wished to. The windows were dark, the fence was gone, and weeds grew in the doorstep. People said that lights had been seen there, and voices too. Tom and Huck stood at the gate for a long minute. “You can stay outside,” said Tom. “That is, if you are afraid.” “Afraid?” said Huck. “Who's afraid?” But his voice was very small."
        },
        {
          "kind": "image",
          "art": "tom-haunted-house",
          "text": "The haunted house on Still-House branch, empty for years and full of stories."
        },
        {
          "kind": "text",
          "text": "They went in, whispering, with their hearts loud in their ears. Downstairs there was nothing but dust, spiders, and old barrels. They dug under the floor by the ruin of the fireplace, and struck nothing at all. “Let's go upstairs,” whispered Tom. “Maybe they hid it up there.” Upstairs they found an old hearth and corners full of shadows. They were about to dig again when Huck caught Tom's arm. “Hush,” he breathed. “Somebody is coming.” The boys crept into a dark corner and lay as still as the dead."
        },
        {
          "kind": "note",
          "text": "New word: haunted - said of a place where ghosts are believed to walk. Nobody in St. Petersburg would sleep in a haunted house for money.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "Two men came in below, talking low. One was rough and ragged. The other wore a slouch hat and green goggles, and his long hair was white as snow. It was the strange old Spaniard, deaf and dumb, who had been seen about the village. The men sat down to rest, and the boys lay still, hardly breathing. Treasure was forgotten. The only gold they wanted now was the gold of the sunlight outside."
        },
        {
          "kind": "text",
          "text": "Then the ragged man spoke of burying a bag of silver under the floor. He took up the pick and began to loosen the earth. From their corner above, the boys watched every stroke of it. And suddenly Huck pressed his face into his arm. The pick had rung upon something made of iron."
        }
      ]
    },
    {
      "title": "Chapter 17 · Real Robbers Seize the Treasure",
      "art": "tom-gold-strongbox",
      "artPrompt": "two rough men in a ruined house lifting an iron strong box out of a hole in the floor, gold coins catching the light, two hidden boys watching wide-eyed from a shadowy corner above, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "Under the floor the men lifted out a strong iron box, heavy with coin. The ragged man's eyes grew round. “There's a power of money here,” he said. The old Spaniard pried the lid open, and gold ran through his fingers like water. It was more money than any man in the county had ever seen. The boys above stared down and forgot how to breathe."
        },
        {
          "kind": "image",
          "art": "tom-gold-strongbox",
          "text": "The robbers lift the iron box of gold from under the haunted-house floor."
        },
        {
          "kind": "text",
          "text": "Then the Spaniard spoke, and the boys' blood ran cold. It was the voice of Injun Joe. “That pick is fresh with earth,” he said slowly. “Somebody has been digging here. Boys, I think. Where are they now?” He looked about the ruined room and started toward the stair. Up above, the two boys lay like dead things. But the ragged man called him back. “Whoever dug has gone long ago,” he said. “The coins are what matter. Let us hide the box and go.”"
        },
        {
          "kind": "note",
          "text": "New word: disguise - clothes and false hair that change a person's looks. Injun Joe's disguise was a white wig and green goggles.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "Injun Joe stood thinking, with his hand on the box. “We'll carry it to my den,” he said at last. “It is safe there. Number Two, under the cross.” “Under the what?” asked the ragged man. “Under the cross,” said Injun Joe. “Never you mind where. You will see when the time comes.” Then the men lifted the box between them and went out. The boys slid down the stairs and looked at each other in the dust and the silence."
        },
        {
          "kind": "text",
          "text": "“Twelve thousand dollars,” whispered Tom, “and we found it first, and they carried it away!” The boys ground their teeth. If they had only kept digging downstairs, the gold would have been theirs that very hour. “Never mind,” said Tom at last. “They took it to Number Two, under the cross. We do not know where that is. But Tom Sawyer means to find out.” From that hour the two became detectives."
        }
      ]
    },
    {
      "title": "Chapter 18 · Number Two at the Tavern",
      "art": "tom-tavern-watch",
      "artPrompt": "a village Temperance tavern at dusk with a lamplit back stairway, a ragged boy hidden behind barrels watching a door at the top of the steps, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "All the next day Tom puzzled over Number Two. At last he struck an idea. “It's a room,” he said. “Rooms have numbers. The Temperance Tavern has a room numbered Two, with a back door and a back stair. Nobody ever seems to go in or out. That is the den, or I'm a fool.” So the boys watched the tavern evening after evening. Nothing moved. On the third night Tom slipped up the dark stair alone."
        },
        {
          "kind": "image",
          "art": "tom-tavern-watch",
          "text": "Tom creeps up the dark back stair of the Temperance Tavern to the door marked Two."
        },
        {
          "kind": "text",
          "text": "The door was not locked. Tom pushed it softly and put his head inside. Then he drew back as if he had touched a snake. On the floor, beside a bottle, lay Injun Joe, dead drunk and fast asleep. The floor creaked once, and Tom stood frozen till the snoring came again. Then he tiptoed down and told Huck. The whole room had smelled of tobacco and spilled liquor."
        },
        {
          "kind": "note",
          "text": "New word: den - the hiding place of a fox or a robber. Injun Joe's den was a room called Number Two.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "They agreed on a plan. Huck should watch the back stair every night. When Injun Joe came out, Huck would run for Tom at once. “Soon or late,” said Tom, “a robber must go home.” “Watching is hungry work,” said Huck, but he watched all the same. For two nights nothing happened, and the boys grew weary. The moon was down, and the streets were empty. Then, on the third night, Huck heard the door creak."
        },
        {
          "kind": "text",
          "text": "Injun Joe came out carrying a bundle under his arm, and turned toward the river. Where Injun Joe went, Huck followed. That was the plan, and Huck's heart thumped like a hammer. But that night nothing went as they had planned. For Injun Joe did not go to the river at all. He climbed the hill toward the big white house of the Widow Douglas. Huck crept after him in the dark, afraid to go on and more afraid to stop."
        }
      ]
    },
    {
      "title": "Chapter 19 · The Revenge on the Hill",
      "art": "tom-widow-hill",
      "artPrompt": "two rough men talking in a dark lane under trees before a white house on a hill, a small boy crouched listening behind a picket fence, one lit window in the distance, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "Huck pressed himself against a garden fence in the black shadow of the trees. Not ten steps away stood the two men from Number Two. The starlight was enough to see them by. “It's a long way to the river,” said the ragged man. “I'm for the river road.” “All right,” said Injun Joe. “But first there is a little business at that house.” He pointed to the widow's bright windows."
        },
        {
          "kind": "image",
          "art": "tom-widow-hill",
          "text": "Huck, hidden by the fence, overhears the two men under the widow's trees."
        },
        {
          "kind": "text",
          "text": "“What business?” asked the ragged man. “Revenge,” said Injun Joe, and the word came out like a hiss. “The widow's late husband was a justice of the peace. He had me horsewhipped in public, like a dog. He is dead, but she shall pay me back.” “You would hurt a woman?” whispered the ragged man. “I don't kill women,” said Injun Joe. “I mean to tie her to her own bed. And I will mark her face, so she remembers me all her life.” The ragged man shivered. “That is wicked work,” he said. “I'll have no part in it.”"
        },
        {
          "kind": "note",
          "text": "New word: revenge - hurting a person to pay them back for a hurt they did you. Revenge is a stone that never stops rolling.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "Huck heard it all from behind the fence, cold with horror. This was worse than graveyards. The ragged man walked a step away, but Injun Joe pulled him back. “You helped me once, and you will help me now,” he said. “I need you at midnight, at this house. Go and fetch the bundle.” The men moved away up the dark road. Huck fled the other way, running like the wind."
        },
        {
          "kind": "text",
          "text": "Whom could he tell? Not the constable, who would ask his name. Not Tom, safely asleep in bed. Injun Joe would kill any boy who betrayed him. But the widow had once fed Huck when he was hungry, and kindness came back to his heart. One brave old man might help. That was the Welshman, Mr. Jones, who lived at the foot of the hill."
        }
      ]
    },
    {
      "title": "Chapter 20 · The Welshman to the Rescue",
      "art": "tom-welshman-guns",
      "artPrompt": "a sturdy white-haired old man and his two grown sons setting out with muskets at night, a ragged boy pointing up a dark hill road, lantern light on determined faces, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "Huck hammered at the Welshman's door until the windows shook. Mr. Jones opened it in his nightshirt, candle in hand. “Please, sir,” gasped Huck, “don't ask me my name. But trouble is coming to the Widow Douglas tonight. Two men will go to her house at midnight to do her harm. Quick, sir, quick!” The old man's eyes flashed. He woke his two sons, tall young men who did not waste words. In a minute three muskets were down from the wall."
        },
        {
          "kind": "image",
          "art": "tom-welshman-guns",
          "text": "The Welshman and his sons march up the hill with muskets, and Huck leads the way."
        },
        {
          "kind": "text",
          "text": "“But who told you this?” asked Mr. Jones, as they started. “If you knew, he'd be killed before morning,” said Huck. “I daren't give my name, sir. Please don't ask.” “You are a strange lad,” said the old man, “and I believe an honest one.” The Welshman asked no more. The three men went up the hill, and Huck showed them where to wait near the widow's lane. Then he hid behind a rock to watch the end of it."
        },
        {
          "kind": "note",
          "text": "Talk together: Huck keeps his name secret because he fears Injun Joe. Why is warning the Welshman anyway a brave thing to do?",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "Midnight came, and with it the two men. There was a challenge in the dark, and then a crack of muskets on both sides. Nobody was hurt. The villains fled down the hill like rabbits and were swallowed by the night. Huck ran the other way, his heart thumping. He had saved the widow, and nobody in the world knew it. Far off a dog barked itself to sleep."
        },
        {
          "kind": "text",
          "text": "The next morning all St. Petersburg talked of the mystery. Who had fired on the Welshman's hill? Who was the ragged boy who came in the night? The widow sent word that she wished to thank her unknown friend. And at the Welshman's table a ragged boy ate the best breakfast of his life. He wondered what he had done to deserve it. The Welshman only smiled into his cup, and said nothing."
        }
      ]
    },
    {
      "title": "Chapter 21 · The Widow's Thanks",
      "art": "tom-widow-thanks",
      "artPrompt": "a warm sitting room with a fire, an elegant widow in black thanking a ragged boy who blushes and studies the floor, an old white-haired Welshman beaming beside them, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "The Widow Douglas came to the Welshman's house that very day. She wished to see the boy who had saved her. When Huck was brought in, ragged and shy, she took both his hands. “So it was you,” she said softly. “You risked your life for me, and you never told me your name.” Huck studied the floor. “It wasn't anything much,” he mumbled. “Anyone would have done it.” But his ears were red with pleasure."
        },
        {
          "kind": "image",
          "art": "tom-widow-thanks",
          "text": "The widow thanks Huck, who studies the floor and turns red."
        },
        {
          "kind": "text",
          "text": "“It was everything,” said the widow. “And I know why you hid your name. You feared that man would harm you. But he has fled the town, and you are safe now. I shall not forget you, Huck. When I can do something for you, I will do it gladly.” The Welshman's eyes twinkled, for he was proud of his part in the night's work. The widow thanked him too, and his brave sons."
        },
        {
          "kind": "note",
          "text": "New word: gratitude - the warm wish to thank and repay a person who has been good to you.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "There was more news that morning. Becky Thatcher had come home from her long visit, and St. Petersburg was gay again. There was to be a grand picnic on the ferryboat, with ice cream and cakes. After the landing, all the children were to visit McDougal's Cave with candles. Every boy and girl in town was invited, and everybody counted the days. There would be boats enough to carry the whole town. Tom heard the news and walked on air for the rest of the day."
        },
        {
          "kind": "text",
          "text": "Only one small cloud hung over Tom's happiness. Injun Joe had not been caught. He had fled into the night, and the hills had swallowed him. Somewhere the half-breed was still alive, and still remembering. But summer was shining, and Becky was home. Tom pushed the dark thought away and went to find his best clothes. He even brushed his hair without being told. It was good to be young in St. Petersburg that week."
        }
      ]
    },
    {
      "title": "Chapter 22 · The Picnic Begins",
      "art": "tom-picnic-cave",
      "artPrompt": "a gay ferryboat full of children in summer clothes sailing on a wide river, baskets of cakes and lemonade on deck, a village and green hills sliding past, bright morning light, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "The picnic morning came at last, blue and gold. The ferryboat was hung with flags, and the children poured aboard with their baskets. Ice cream and lemonade waited on the deck. Tom stayed close to Becky all the way up the river, and Becky was kind to him all the way. Judge Thatcher gave the word, and the boat pushed off from the shore. St. Petersburg waved goodbye from the bank."
        },
        {
          "kind": "image",
          "art": "tom-picnic-cave",
          "text": "The picnic ferryboat goes up the river, hung with flags and full of children."
        },
        {
          "kind": "text",
          "text": "Under the hill the children landed and ran shouting through the woods. Then came the ice cream, more than a village child sees in a year. The ice cream was half gone before the ladies could count the plates. Nobody could remember being so happy. In the afternoon somebody said the great word: the cave. McDougal's Cave lay under the hill, a labyrinth of stone passages miles long. The children took candles and streamed in at the great arched door, laughing at their own echoes."
        },
        {
          "kind": "note",
          "text": "New word: labyrinth - a maze of winding paths, where a person can easily lose the way.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "Inside, the candles made little stars in the blackness. Stalactites hung from the roofs like stone icicles. Passages branched on every side, up and down, this way and that. The bigger children led, and the smaller ones held hands. Presently Tom and Becky slipped away from the others. “Let's find a new passage,” said Tom. “Nobody knows all the turns of this cave.” Becky agreed, as she always did on adventures. At each turn Tom marked a cross of smoke on the rock, so they could find their way back. At least, so he thought."
        },
        {
          "kind": "text",
          "text": "They passed a frozen waterfall of stone and a lake still as glass. Every new wonder pulled them one turn farther. Behind them the party's calling grew fainter, and fainter, and stopped. Tom and Becky laughed at the echoes and did not notice. The great cave had quietly closed its stone arms around them."
        }
      ]
    },
    {
      "title": "Chapter 23 · Deeper and Deeper",
      "art": "tom-cave-darkness",
      "artPrompt": "a boy and a girl alone in a stone passage underground, holding one small candle whose flame is the only light in the huge dark, blank rock walls around them, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "After a while Becky began to count the turns. “Tom,” she said, “we ought to go back now. The others will be waiting.” “Oh, just one more wonder,” said Tom. But one wonder led to another, and the way back grew long. Presently Becky stopped. “Tom,” she said, in a very small voice, “I don't see any smoke marks.” Tom looked at the blank walls, and then at the candle. “We - we'll soon find one,” he said. But his heart had gone cold."
        },
        {
          "kind": "image",
          "art": "tom-cave-darkness",
          "text": "Tom and Becky hunt the walls for the smoke marks that are no longer there."
        },
        {
          "kind": "text",
          "text": "They hurried from passage to passage, hunting for a mark. Every wall was blank stone. Tom shouted, and only his own echo answered, turning his voice into strange laughter. “Let's not shout any more,” said Becky, catching his hand. “It sounds like ghosts.” They walked on. The great cave was silent now, and cold. The candle burned smaller and smaller. Once they heard water dripping, like a slow clock. Their little light was going, and they knew it."
        },
        {
          "kind": "note",
          "text": "New word: echo - a sound that bounces back from walls or hills, like a voice answering itself.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "Then the flame fluttered and sank. Tom lit the last scrap of candle he had saved, and it burned a little while, and went out too. The darkness came down on them like a blanket. Becky cried, and Tom put his arms around her. They had a little cake saved from the picnic, and they ate half and kept half. Then they slept on the cold stone, worn out. Night and day became the same black thing."
        },
        {
          "kind": "text",
          "text": "Far above them the ferryboat sailed for home, gay with flags. Only at suppertime did the town learn that two children were missing. Then the joy went out of St. Petersburg. All that night, and for days after, men and women hunted the cave. They cried the children's names into the dark. For three days cannon had been fired above the cave, hoping the children would hear. But the hill was miles deep, and its passages did not give them back."
        }
      ]
    },
    {
      "title": "Chapter 24 · The Kite String",
      "art": "tom-kite-string",
      "artPrompt": "a boy crawling alone in a narrow stone tunnel holding a long kite string that trails behind him, a weak candle in his other hand, a girl waiting by a spring in a shadowy chamber beyond, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "When Tom woke, hunger was gnawing at him. But he had one hope left: a kite string in his pocket, and a plan in his head. “You stay here by the spring, Becky,” he said. “I will creep along the passages and follow the string. Then I cannot get lost. If I find a way out, I'll come back for you.” Becky held his hand tightly. “You will come back,” she said. “Promise me.” “I promise,” said Tom. And he crawled away into the dark."
        },
        {
          "kind": "image",
          "art": "tom-kite-string",
          "text": "Tom crawls into the black tunnels, holding the kite string that leads back to Becky."
        },
        {
          "kind": "text",
          "text": "Tom crept on and on, feeling with his hands, the string paying out behind him. Passage after passage, turning after turning. At last, in a side tunnel, he saw a hand. A hand holding a candle, with an arm behind it. Tom's heart stood still. Then the whole figure stepped into view, and it was Injun Joe. Tom shrieked with all his might. Injun Joe fled as if the cave itself were chasing him. His footsteps died away. Tom fled too, back along the string, to Becky."
        },
        {
          "kind": "note",
          "text": "Talk together: Tom decides not to tell Becky about the hand with the candle. Why does he keep this fright to himself?",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "“Did you find the way out?” Becky asked. “Not yet,” said Tom. “It's a big cave. I shouted, to hear how big it was.” He could not tell her about the hand. They ate the last of the cake. Tom made the halves as unequal as he dared, and gave Becky the big one. Then he took the string and tried again, and again, until his knees would hardly carry him."
        },
        {
          "kind": "text",
          "text": "He rested, and held Becky's hand, and said the searchers would come soon. Far away in the town, hope was almost dead. People had begun to whisper sad words about the two lost children. But Tom Sawyer had not given up. He was saving his last strength for one more try. His lips were cracked, and his feet were sore."
        }
      ]
    },
    {
      "title": "Chapter 25 · The Star of Daylight",
      "art": "tom-daylight-star",
      "artPrompt": "a thin boy lying flat at the mouth of a tiny hole in a rock wall, reaching toward a dazzling spot of sunlight beyond, a wide river and open sky visible through the hole, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "Once more Tom went out on his hands and knees, with the string almost at its end. He was faint, and the dark pressed on his eyes like a weight. Then he saw it: a speck of daylight, far away, like a star in the blackness. Tom crept toward it, hardly breathing. At the end of the tunnel was a little hole in the rock. He put his face to it and saw the great river rolling in the sunshine. He shouted until his throat was raw. Then he went back for Becky."
        },
        {
          "kind": "image",
          "art": "tom-daylight-star",
          "text": "Tom reaches the little hole, and beyond it the river and the shining sky."
        },
        {
          "kind": "text",
          "text": "“Come, Becky,” he said. “We are saved, and it is only a little way.” It was a hard way, but hope gave them new strength. Tom helped Becky up through the little hole. They came out upon a bluff above the river, blinking in the sun. They had wandered five miles from the great door of the cave. The men in a passing boat would hardly believe their story. But they took the children aboard and rowed for home."
        },
        {
          "kind": "note",
          "text": "New word: rescue - to set a person free from danger. The men in the boat rescued Tom and Becky from the bluff.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "The news ran through St. Petersburg faster than a boy could run. The church bells rang, and the town poured out of its houses in lantern light. Strangers hugged each other in the street. Three days and three nights the children had been under the hill. Now they were home, and the town cried for joy and would not go to bed. The ferryboat dressed herself in flags again."
        },
        {
          "kind": "text",
          "text": "Tom was put to bed, weak as water but happy. Aunt Polly cried over him, and scolded him, and kissed him, all in one breath. For some days Tom and Becky lay still and gathered back their strength. And the neighbors came to the door, day after day, just to hear them tell it. Visitors tiptoed, and spoke as if in church."
        }
      ]
    },
    {
      "title": "Chapter 26 · Behind the Iron Door",
      "art": "tom-iron-door",
      "artPrompt": "a vast cave entrance in a cliff shut by a great new iron door with heavy bolts, an old judge talking to a pale boy propped in a garden chair, morning light on the bluff, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "Tom grew stronger every day, and visitors still came to hear the story. For a week he had been the lion of the village. Every day he told it again, and every day it grew a little grander. The village paper told the whole story, and Tom read it over and over. Becky told her part to the girls. She always added, softly, how Tom had once taken her whipping at school. The two children walked in glory wherever they went."
        },
        {
          "kind": "image",
          "art": "tom-iron-door",
          "text": "Judge Thatcher tells Tom that the great iron door has been bolted - and Tom turns white."
        },
        {
          "kind": "text",
          "text": "One morning Judge Thatcher dropped in, beaming at Tom. “No child will ever be lost in that cave again,” he said. “That cave is a dangerous place for children. I have had the great door shut, and bolted, and locked with iron.” Tom sprang up in his chair. His face went white as paper. “Judge!” he cried. “Injun Joe is in the cave!” For a moment nobody in the room could speak a word. The judge went pale too."
        },
        {
          "kind": "note",
          "text": "Talk together: Tom feared Injun Joe, yet now he is frightened for him too. What is the difference between the two fears?",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "Within half an hour men were rowing for the cave with lanterns, and the judge went with them. All night St. Petersburg waited for news. Some pitied even Injun Joe, shut under the hill with no way out. Others remembered the graveyard, and said nothing. Tom lay awake a long time. He thought of a man alone in the blind dark, calling at a door that would not open. Tom knew that dark. He had walked in it himself. “Even Injun Joe,” he thought, “does not deserve three days of that.”"
        },
        {
          "kind": "text",
          "text": "Tom was sorry for his old enemy, and that was to his honor. But the hill had already given its answer. The town held its breath, and the boats came back with long faces. When the searchers lifted the great bar at dawn, they found they had come too late."
        }
      ]
    },
    {
      "title": "Chapter 27 · The Death of Injun Joe",
      "art": "tom-cave-threshold",
      "artPrompt": "men with lanterns standing silent at a great iron door in a cave, a still figure lying at the foot of the threshold, one ray of lantern light on the stone floor, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "The men lifted the bar and swung the iron door open. Their lanterns made a lane of gold in the dark. Just inside, at the foot of the threshold, Injun Joe lay still. In his last hour he had crept toward the light, as far as his strength would carry him. He died a hand's reach from the open air, and never knew it. The strongest man in the party turned away his face."
        },
        {
          "kind": "image",
          "art": "tom-cave-threshold",
          "text": "At the foot of the iron door the searchers find Injun Joe, still at last."
        },
        {
          "kind": "text",
          "text": "The news went down the river faster than the boats. St. Petersburg had lived in fear of that man for a year. Now the fear was gone forever. Yet the town could not quite rejoice. For the first time all summer, boys slept with their windows open. The reward notices came down from the walls that day. “I was afraid of him all my life,” Tom told Huck. “Now that it's over, I'm sorry for him. Being shut in that dark - I know what that is.”"
        },
        {
          "kind": "note",
          "text": "Talk together: Tom helped catch Injun Joe, and yet he pities him now. What does that tell you about Tom?",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "Injun Joe was buried near the mouth of the cave. People came from miles around, in wagons and boats, almost as to a holiday. Even the children stopped their games to watch the earth fall. But Tom stood apart at the graveside, thinking. Words he had heard in the haunted house kept knocking at his mind: Number Two, under the cross. The answer came as clearly as if the dead man had spoken it."
        },
        {
          "kind": "text",
          "text": "“Number Two was his den,” said Tom, half to himself. “But he never slept there all the time we watched. And under the cross - Huck, I saw him in this cave. He was far from the door, with a candle in his hand.” Huck's eyes grew wide as saucers. “Tom,” he breathed, “you don't think - ” “I do think,” said Tom. “The treasure is in the cave.”"
        }
      ]
    },
    {
      "title": "Chapter 28 · The Secret Under the Cross",
      "art": "tom-smoke-cross",
      "artPrompt": "two boys with a candle before a limestone wall inside a cave, gazing up at a great cross marked in candle smoke on the rock, their faces lit from below, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "Tom's plan was simple. He and Huck would row a skiff to the little hole in the bluff. It was the same hole that had saved Tom's life. The treasure, if it was anywhere, was nearer to that hole than to the great door. Nobody would see them enter, and nobody would ask questions. “If we find it, it is ours,” said Tom. “We saw it first.” So the partners set off down the river, with candles, a knife, and a bag for the gold."
        },
        {
          "kind": "image",
          "art": "tom-smoke-cross",
          "text": "Tom leads Huck through the little hole and into the cave, hunting the cross."
        },
        {
          "kind": "text",
          "text": "Tom knew every turning of his own escape, and he led Huck along it by candle light. They passed the frozen waterfall and the still lake. Huck's teeth chattered at every corner, but he did not turn back. At last Tom stopped at a great rock in a wide passage. “Look,” he said, and held up the candle. There, on the face of the rock, a cross was drawn in smoke."
        },
        {
          "kind": "note",
          "text": "New word: cross - the shape of two lines meeting in the middle. Injun Joe had drawn his in candle smoke.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "“It's a ghost's sign,” whispered Huck, going pale. “No ghost did this,” said Tom. “Ghosts don't smoke candles. A man drew that cross, and a man buried something under it. Dig here.” Tom dug with his knife, and then with a flat piece of board. Huck dug with his hands. The earth came up soft and easy, as if it had been opened before. Not two feet down, they struck wood."
        },
        {
          "kind": "text",
          "text": "The wood was a rude flooring laid over a hole in the rock. Under the boards lay a little chamber in the stone, and there sat the strong box of the haunted house. The boys looked at it a long moment, afraid to touch it, in case it should melt away. “It's found,” whispered Tom at last. “Huck, it's found!” They filled their bag with gold, coin by coin, and staggered back toward the daylight."
        }
      ]
    },
    {
      "title": "Chapter 29 · A Golden Shower",
      "art": "tom-gold-counting",
      "artPrompt": "a lamplit parlor full of astonished guests, a boy pouring a stream of gold coins from a heavy bag onto a table, coins catching the candlelight, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "The Widow Douglas was giving a party that evening for her friends. Lamps were lit from hall to parlor, and the best cake was set out. Aunt Polly was there, and the Thatchers, and half the town. Mr. Jones meant to tell the guests how Huck had saved her from the robbers. Tom and Huck came in late, tired and mysterious, carrying a heavy bag between them. “Set it by the door,” said Tom. “Wait for the word.”"
        },
        {
          "kind": "image",
          "art": "tom-gold-counting",
          "text": "At the widow's party, Tom pours a river of gold coins onto the table."
        },
        {
          "kind": "text",
          "text": "The Welshman told his story, and the guests marveled at Huck. The widow said she had already promised him a home and schooling. “Huck don't need it,” said Tom suddenly. “Huck's rich!” Everybody laughed at the joke. Tom turned to the door. “Fetch in the bag,” he said. The guests thought Tom was making a little speech. And the gold poured out upon the table, coin upon coin, in a shining river."
        },
        {
          "kind": "note",
          "text": "New word: reception - a grand evening party where guests are welcomed and thanked. The widow's reception turned into a treasure show.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "Nobody laughed now. The guests crowded round, and the candlelight ran over the gold like water. “Is it real?” people whispered, over and over. The widow counted it with the judge, and the counting took a long time. “So much money in one heap,” said the judge, “so help me, I never saw.” It came to a little over twelve thousand dollars. Twelve thousand dollars, found by two boys in a cave. Some people pinched the coins to be sure of them. The table nearly bent under it. Such a sight had never been seen in St. Petersburg."
        },
        {
          "kind": "text",
          "text": "The money was carried to the bank the next morning, and the judge himself carried one corner of the bag. Half was Tom's and half was Huck's, for they were partners, fair and true. Every soul in town talked of nothing else that night. Two boys of St. Petersburg, barefoot no longer, were rich beyond any farmer's dreams."
        }
      ]
    },
    {
      "title": "Chapter 30 · Tom's Golden Future",
      "art": "tom-famous-boys",
      "artPrompt": "a village street where two boys walk side by side in new clothes while neighbors stare and point admiringly, an old judge clapping one boy's shoulder, warm afternoon light, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "After that week Tom and Huck were famous in all the country round. People drove in from other towns just to look at them. The village paper printed the stories of their lives, as if they were generals. Even the barrel Huck used to sleep in was mentioned in the paper. Men went about digging under every haunted house in the county, hoping for another such find. The boys were pointed out wherever they went. It was a wonder their hats still fitted their heads."
        },
        {
          "kind": "image",
          "art": "tom-famous-boys",
          "text": "Tom and Huck, the two famous boys, walk down the village street."
        },
        {
          "kind": "text",
          "text": "Judge Thatcher had taken a great liking to Tom. He had seen the boy under the ground, and he knew courage when he saw it. “That boy may be a great lawyer or a great soldier,” he said. “He has the two things that cannot be taught, sense and pluck. When he is ready, I shall help him to the best schooling in the land.” Becky's father shook Tom's hand whenever they met. Aunt Polly could hardly believe her ears."
        },
        {
          "kind": "note",
          "text": "Talk together: money made the boys famous, but courage made them loved. Which would you rather be praised for?",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "The two fortunes were put out at interest, safe in the bank. Each boy now had an income of about a dollar a day. It does not sound like much now. A grown man worked all week for eight dollars then. The boys could buy candy for the whole town if they pleased. Tom enjoyed every minute of his fame. He described the little hole so often he knew the speech by heart."
        },
        {
          "kind": "text",
          "text": "Huck stood at the edge of the crowds, and his face grew longer every day. For the widow's promise had not been forgotten. He was to live in a fine house now, with clean sheets, regular meals, and schooling. And a bath every Saturday, Huck said to himself. He looked at his freedom the way a boy looks at the last day of summer."
        }
      ]
    },
    {
      "title": "Chapter 31 · Huck's New Home",
      "art": "tom-huck-scrubbed",
      "artPrompt": "a scrubbed boy in stiff new clothes squirming on a parlor chair, a kind widow in black showing him a dinner table set with knives and forks, lamplight, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "The Widow Douglas took Huck into her home, as she had promised. He was washed, and combed, and dressed in good new clothes. A bed with sheets was found for him upstairs, all white and smooth. Huck stood in the fine parlor and hardly dared to breathe. “This is your home now,” said the widow kindly. “You shall be my son, and I shall take good care of you.” Huck had never heard such words in his life. He tried to thank her, and could not find the words."
        },
        {
          "kind": "image",
          "art": "tom-huck-scrubbed",
          "text": "Huck, clean and stiff in his new clothes, learns to live in the widow's fine house."
        },
        {
          "kind": "text",
          "text": "But a fine house has fine rules. Meals were served by the bell, and Huck must come when it rang, hungry or not. He must sit up straight, eat with a fork, and listen to a chapter of a good book every evening. He must wear shoes in the street and a collar on Sunday. Worst of all, he must go to school when summer ended. Huck bore it all for three weeks. Three weeks is a long time for a boy who has slept in barrels."
        },
        {
          "kind": "note",
          "text": "New word: patience - the power of bearing hard things quietly and without complaint. Huck needed a great deal of it.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "Tom came by and found Huck sighing at the gate. “I can't stand it, Tom,” Huck whispered. “The widow is good to me, and she means well. They are all very kind, and that is the worst of it. But a body can't stand so much goodness all at once. And school is coming in the fall, Tom. School.” Tom laughed, but he was sorry too. He knew exactly how new shoes pinch, in every kind of way."
        },
        {
          "kind": "text",
          "text": "At night Huck lay between the clean sheets and listened for the sound of rain on barrels. There was none. The sheets were smooth, and the bed was soft, and it did not matter. He could not sleep in them, try as he might. “I slept better in the rain,” he told Tom mournfully."
        }
      ]
    },
    {
      "title": "Chapter 32 · Huck Runs Away",
      "art": "tom-hogshead-again",
      "artPrompt": "a ragged boy sitting contentedly in an empty wooden barrel behind a fence, his fine new clothes hung neatly on a nail nearby, morning light through the trees, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "At the end of three weeks, Huck was gone. The widow sent people looking for him all day, and the police looked too. Tom looked as well, in all the old places. He had left his fine new clothes behind him, every stitch. On the second evening Tom found Huck in the old hogshead behind the slaughter-house, ragged and dirty, comfortable and free."
        },
        {
          "kind": "image",
          "art": "tom-hogshead-again",
          "text": "Tom finds Huck back in the old hogshead, ragged and free."
        },
        {
          "kind": "text",
          "text": "“Huck,” said Tom, “you have frightened the widow half to death.” “I couldn't help it,” said Huck. “The widow eats by a bell, Tom. She goes to bed by a bell. She gets up by a bell. Everything is so awful regular a body can't stand it. The sheets are white, and you have to keep them white. And the fork - Tom, there was a fork for every different thing on the table. And the towels. There was a fresh towel every single day.”"
        },
        {
          "kind": "note",
          "text": "Talk together: the widow's rules are meant with love. Why do they still make Huck unhappy? What would you miss most about freedom?",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "“Well, everybody lives that way,” said Tom. “Rich people, I mean. That is what being rich is.” “Then I don't want to be rich any more,” said Huck. “I had my try at it. It don't suit me, and it ain't no use pretending. I'm different, Tom.” He pulled his rags about him with a proud little air. For once, Tom Sawyer had no answer ready."
        },
        {
          "kind": "text",
          "text": "“The woods are better for me,” said Huck. “I slept better in the rain, up among the barrels. The widow is good, I know it. But I had to wear shoes, and I couldn't smoke, and I had to say lessons. I tried, honest I did. Don't ask me to go back, Tom.” Tom looked at his friend, ragged and free, and fell silent. Freedom sat on him again like an old coat. A boy who cannot sleep in sheets is not a rich boy, whatever the bank says."
        }
      ]
    },
    {
      "title": "Chapter 33 · What Riches Are Worth",
      "art": "tom-barrel-talk",
      "artPrompt": "two boys sitting on empty barrels behind a wooden fence at dusk, one ragged and one in neat clothes, talking seriously, a rising moon over the trees, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "Tom sat down on the edge of the hogshead and thought a while. “Tell me the worst of it,” he said at last. “Well,” said Huck, “I have to wash every day. The water was hot, Tom. Hot, every single morning. I have to sleep in a bed with sheets. I have to wear shoes on Sunday, and a collar the whole day long. It is all fine for people who like it. But I'm different, and it ain't no use trying. And school is coming, Tom. School, with a stool in the corner.”"
        },
        {
          "kind": "image",
          "art": "tom-barrel-talk",
          "text": "Two boys sit on empty barrels behind a fence, talking over Huck's troubles."
        },
        {
          "kind": "text",
          "text": "“But everybody that is anybody lives that way,” said Tom. “It is what being rich means.” “Then being rich ain't what it's cracked up to be,” said Huck. “It's only worry and sweat, Tom. You worry about your money, and you sweat in your good clothes. A barrel and a pipe is worth more than a bank, if you ask me.” Tom laughed until he nearly fell off the barrel. It was the finest speech Huck had ever made."
        },
        {
          "kind": "note",
          "text": "Talk together: Huck says riches bring worry and sweat. What good things can money not buy?",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "But Tom had not come only to talk about riches. He had brought a plan with him, and now he played it. “Huck,” he said, “money is not the only thing in the world. How would you like to belong to a gang?” Huck looked up quickly. “A gang of what?” “Of robbers,” said Tom grandly, “as fine a band as ever rode. Every boy in town will envy you.” Huck's eyes began to shine in the dusk. “Robbers!” he breathed. “Now you're talking. What do I have to do?”"
        },
        {
          "kind": "text",
          "text": "“Ah,” said Tom, “that is the difficulty. That is exactly the difficulty.” And he looked slowly at Huck's rags, from the ragged hat to the bare feet, and shook his head. “What difficulty?” asked Huck, sitting up straight. “What rags? What's wrong with rags?”"
        }
      ]
    },
    {
      "title": "Chapter 34 · The Robber Gang",
      "art": "tom-robber-band",
      "artPrompt": "a ragged boy and a neat boy shaking hands solemnly over an empty barrel by moonlight, as if signing a great contract, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "“The difficulty is this,” said Tom. “We can't let you into the gang in rags. Nobody could. A robber has to be respectable, or the whole band is disgraced.” “No robbers in rags?” said Huck. “None that anybody respects,” said Tom. “A robber is more high-toned than a pirate, as a general thing. In most countries robbers are awful high up in the world - dukes and such.” “Dukes,” said Huck, considering. Even pirates looked up to a good robber, Tom added, warming to his subject."
        },
        {
          "kind": "image",
          "art": "tom-robber-band",
          "text": "Tom explains that even robbers must be respectable, and Huck begins to weaken."
        },
        {
          "kind": "text",
          "text": "Huck thought it over. Dukes were fine people, he had heard, with horses and castles and gold lace. “If I go back to the widow,” he said, “and stand the collar and the bell - can I join?” “You can,” said Tom. “It's a bargain, then,” said Huck. They shook hands on it, twice, to be sure. Then they built castles in the air together, with masks and horses and caverns."
        },
        {
          "kind": "note",
          "text": "New word: bargain - an agreement where each person gives something and gets something. Huck gave up his freedom; he got a robber band.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "“And Tom,” said Huck, with a sudden fear, “you won't ever tell on me? About the widow's house, or anything?” “Tell on my own lieutenant?” cried Tom. “Not if they stretch my neck for it. Robbers never betray robbers. That is the first law of the band.” Huck was satisfied. Then he sighed. “The sheets are going to be the death of me, Tom.” “You'll get used to them,” said Tom. “Everything comes right, if you wait.”"
        },
        {
          "kind": "text",
          "text": "“When does the gang start?” asked Huck. “When the time is ripe,” said Tom grandly. “A band like ours cannot be hurried. There are caves enough along this river for a hundred dens. We shall ride out one day, and St. Petersburg will tremble.” Huck believed every word of it. And so, as the crickets began to sing, the two friends struck the grandest bargain of the summer."
        }
      ]
    },
    {
      "title": "Chapter 35 · The End of a Boy's Story",
      "art": "tom-two-friends",
      "artPrompt": "two boys walking side by side along a river bank at dusk, one neat and one ragged, the lights of a village beginning to shine across the water, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "The two friends walked back toward the widow's house as the stars came out. The frogs sang in the shallows, and the crickets sang in the long grass. A late boat went by with a red light. Huck walked slower and slower as the lamps came nearer. But a bargain was a bargain, and a robber never goes back on his word. At the gate Tom shook his hand once more. “Remember,” he said, “collars, and school, and the band.” Huck groaned, and went in."
        },
        {
          "kind": "image",
          "art": "tom-two-friends",
          "text": "Tom and Huck walk home together under the first stars."
        },
        {
          "kind": "text",
          "text": "And so ended the strangest summer any boy of St. Petersburg ever had. Tom had whitewashed a fence without lifting a brush, and gone to his own funeral. He had been a pirate, a hero, a witness, a detective, a lost child, and a finder of treasure. He was rich now, and famous, and Becky Thatcher smiled on him. Aunt Polly was proud of him at last. He still hated Sundays, and he still loved his freedom. What more could a boy want?"
        },
        {
          "kind": "note",
          "text": "Talk together: which of Tom's adventures did you like best? What would you have done in his place?",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "But this is where the story must stop. It is the history of a boy, and it must end as a boy's story ends. Boys' stories end with the summer, and this one is no different. If it went any further, Tom would have to grow up. Then it would be the history of a man. And that, as Tom himself would tell you, is quite another kind of book."
        },
        {
          "kind": "text",
          "text": "The lamps of St. Petersburg shone on the great river, one by one. In the widow's house a boy lay between clean sheets, wide awake, thinking of masks and horses and buried gold. Somewhere out on the river a night bird called, and was answered. The whole town slept in peace, and the river went on singing. And Tom Sawyer walked home whistling under the stars."
        }
      ]
    }
  ],
  "rights": {
    "workTitle": "The Adventures of Tom Sawyer",
    "author": "Mark Twain",
    "authorDeathYear": 1910,
    "jurisdiction": "US",
    "basis": "pd-us",
    "sourceUrl": "https://www.gutenberg.org/ebooks/74",
    "note": "Retold in simple English; plot follows the public-domain original."
  }
}
