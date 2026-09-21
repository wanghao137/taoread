import type { PackBook } from '../types'

/**
 * Winnie-the-Pooh — four chapters retold for very young English readers.
 * Text: Project Gutenberg eBook #67098 (A. A. Milne, 1926, illustrated by E. H. Shepard).
 * US public domain (published 1926, pre-1929). Milne died 1956; within 70y pma in the EU.
 * Plot and characters follow the original book; wording simplified into short sentences
 * for children aged 3–5.
 */
export const winniePooh: PackBook = {
  id: 'winnie-pooh',
  title: 'Winnie-the-Pooh',
  author: 'A. A. Milne',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: 'Winnie-the-Pooh is a bear of very little brain — and a very big appetite for honey. Here are eight of his silliest adventures.',
  coverArt: 'pooh-honey',
  coverArtPrompt: 'a round golden teddy bear in a little red shirt standing under a big oak tree, holding a honey pot with a bee buzzing above him, sunny hundred-acre-wood meadow',
  coverFrom: '#D84315',
  coverTo: '#FFCC80',
  source: 'Project Gutenberg eBook #67098, US public domain (published 1926)',
  chapters: [
    {
      title: 'Chapter 1 · Pooh and the Bees',
      art: 'honey-tree',
      artPrompt: 'a round golden bear in a red shirt looking up at a big oak tree full of buzzing bees, a little boy holding a blue balloon beside him',
      blocks: [
        {
          kind: 'text',
          text: 'Winnie-the-Pooh sat in front of a big oak tree. He could hear a loud buzzing noise. "That buzzing means honey," said Pooh, "and honey is what I love best of all."',
        },
        {
          kind: 'image',
          art: 'honey-tree',
          text: 'Pooh looking up at the honey tree, where the bees were buzzing.',
        },
        {
          kind: 'text',
          text: 'Pooh asked his friend Christopher Robin for help. Christopher Robin had a big blue balloon. "You can float up to the top of the tree," he said, "and reach the honey."',
        },
        {
          kind: 'note',
          text: 'New word: disguise — dressing up so nobody knows it is you. Pooh rolled in dark mud to look like a little black cloud!',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'So Pooh hung on to the string of the balloon. He rolled in a muddy puddle first, so the bees would think he was a small black cloud and not a bear at all.',
        },
        {
          kind: 'text',
          text: 'Up he floated, until he was right beside the bees’ front door. But the bees were not the sort of bees who make honey. They were suspicious bees, and they came buzzing out to look at him.',
        },
        {
          kind: 'text',
          text: '"These are the wrong sort of bees," said Pooh. "Christopher Robin, please bring my gun!" But Christopher Robin had a better idea. He shot an arrow at the balloon, and pop! The air came out, and Pooh floated slowly down into Christopher Robin’s arms.',
        },
      ],
    },
    {
      title: 'Chapter 2 · A Visit to Rabbit',
      art: 'pooh-rabbit-hole',
      artPrompt: 'a round bear stuck halfway out of a little door set in a grassy bank, pots of honey inside, a rabbit pushing from behind',
      blocks: [
        {
          kind: 'text',
          text: 'Pooh went to visit his friend Rabbit. Rabbit lived in a hole under the ground, with a door just big enough for a bear.',
        },
        {
          kind: 'image',
          art: 'pooh-rabbit-hole',
          text: 'Rabbit’s front door, set in the side of a little grassy bank.',
        },
        {
          kind: 'text',
          text: '"How about a little something?" said Pooh, hoping for honey. Rabbit brought out two pots of honey and some condensed milk. Pooh ate them all up, and he ate the bread and butter too.',
        },
        {
          kind: 'note',
          text: 'New word: larder — a cupboard or little room where food is kept.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'When it was time to go, Pooh stood up — and could not move. He was stuck in the doorway, for he had grown much too round!',
        },
        {
          kind: 'text',
          text: 'Rabbit pushed and pulled, but Pooh stayed stuck. So Pooh had to stay there for a whole week. Christopher Robin read him stories, and Rabbit used Pooh’s back legs as a towel-horse.',
        },
        {
          kind: 'text',
          text: 'At the end of the week, Christopher Robin took hold of Pooh’s front paws, Rabbit pushed from behind, and out Pooh popped like a cork from a bottle. "Oh, I have popped out again!" said Pooh.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Heffalump',
      art: 'heffalump-trap',
      artPrompt: 'a leaf-covered pit in the woods with a honey jar at the bottom, a small piglet watching, night sky and a bear creeping closer',
      blocks: [
        {
          kind: 'text',
          text: 'One day Pooh and his small friend Piglet dug a Cunning Trap. They wanted to catch a Heffalump, a big animal with a trunk and very long ears. For bait they put a jar of honey in the deepest part of the pit.',
        },
        {
          kind: 'image',
          art: 'heffalump-trap',
          text: 'The Cunning Trap, covered with leaves, with a jar of honey inside.',
        },
        {
          kind: 'text',
          text: 'In the middle of the night, Pooh woke up feeling hungry. "A little taste of honey would be nice," he thought. So he went to the trap in the dark, and put his head right into the jar.',
        },
        {
          kind: 'note',
          text: 'New word: trap — a clever hiding place for catching something. This one had a jar of honey at the bottom.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The jar was much too deep. When Pooh lifted his head, the jar came with it, and he could not see a thing at all. Now Pooh was frightened. He thought the Heffalump had caught him!',
        },
        {
          kind: 'text',
          text: 'Piglet saw a terrible creature with a jar for a head and ran to fetch Christopher Robin. Christopher Robin looked, and he laughed, and he lifted the jar off Pooh’s head. "Silly old Bear!" he said. "There is no Heffalump at all."',
        },
        {
          kind: 'text',
          text: 'Pooh was very glad. He went home for a little something to eat, and the trap was left empty, for no Heffalump ever came.',
        },
      ],
    },
    {
      title: 'Chapter 4 · Eeyore’s Lost Tail',
      art: 'eeyore-tail',
      artPrompt: 'a sad old grey donkey looking over his shoulder at where his tail should be, a bear and a piglet standing by a chestnut tree',
      blocks: [
        {
          kind: 'text',
          text: 'One morning, Eeyore the old grey donkey was looking very sad. "Good morning, Eeyore," said Pooh. "Have you lost something?" "My tail," said Eeyore. "Somebody must have taken it."',
        },
        {
          kind: 'image',
          art: 'eeyore-tail',
          text: 'Eeyore the donkey, looking over his shoulder at where his tail should be.',
        },
        {
          kind: 'text',
          text: 'Pooh and Piglet went to ask Owl. Owl lived in a chestnut tree. To make Owl open his door, they pulled a long rope that hung beside it — and rang a little bell.',
        },
        {
          kind: 'note',
          text: 'New word: bell-rope — the rope you pull to make a bell ring. Pooh thought this one looked very familiar!',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Pooh looked at the bell-rope. It was grey, and it was just the right length. "Owl," he said, "is that Eeyore’s tail?" Owl was quite shocked, but it was true!',
        },
        {
          kind: 'text',
          text: 'They took the tail to Christopher Robin. He took out a hammer and some small nails, and nailed the tail firmly back on Eeyore.',
        },
        {
          kind: 'text',
          text: 'Eeyore swished his tail from side to side, this way and that. He was so happy that he almost smiled. And Pooh went home for a little something to refresh himself, because bears do a lot of hard thinking.',
        },
      ],
    },
    {
      title: 'Chapter 5 · Eeyore’s Birthday',
      art: 'eeyore-birthday',
      artPrompt: 'a sad old grey donkey standing alone in a thistly grassy corner, a round golden bear in a red shirt and a small pink pig hurrying along the path carrying an empty honey pot and a burst red balloon, little blue flowers by the stream',
      blocks: [
        {
          kind: 'text',
          text: 'It was Eeyore’s birthday, and Eeyore stood alone in his thistly corner of the Forest, looking gloomily at his own feet. "Many happy returns of the day, Eeyore!" said Pooh. "Is that Me?" said Eeyore. "I did not know it was My birthday." He had had no present, no party, and no nice surprise at all.',
        },
        {
          kind: 'image',
          art: 'eeyore-birthday',
          text: 'Eeyore in his thistly corner, quite forgetting it was his own birthday.',
        },
        {
          kind: 'text',
          text: 'Pooh ran home for a pot of honey, and Piglet hurried off to blow up a big red balloon. But on the way, Pooh began to feel hungry. He looked at the honey. He looked away. Then — well — he ate every last drop. "How funny," he said, licking the pot. "Where has all the honey gone?"',
        },
        {
          kind: 'note',
          text: 'New word: present — something you give to a friend on a happy day. This present was an empty pot with a big surprise inside!',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Owl wrote A HAPPY BIRTHDAY on the pot, to make it a present again. And Piglet? He tripped on a root, sat on the balloon, and BANG — he burst it. All he had left was a small, flat, broken balloon. So he rolled it up and popped it inside the pot.',
        },
        {
          kind: 'text',
          text: 'Eeyore looked inside the pot, and lifted out the burst balloon, and shook it flat, and put it back in. "A Useful Pot," he said, "with something in it." Pooh and Piglet looked at each other, and grinned. It was the nicest birthday Eeyore had ever had — and he had never had one before.',
        },
      ],
    },
    {
      title: 'Chapter 6 · Kanga and Roo Come to the Forest',
      art: 'kanga-roo-bath',
      artPrompt: 'a tall kind kangaroo holding a big yellow soap beside a wooden bathtub in a sunny forest clearing, a small joey watching with wide eyes, a little pig sitting shyly in the bubbly water, a round bear in a red shirt and a rabbit whispering behind a pine tree',
      blocks: [
        {
          kind: 'text',
          text: 'Two strangers came to the Forest: Kanga, a large kind kangaroo, and her baby, Roo, who jumped about and fell into things. "Here comes a Stranger!" said Rabbit, and he made a plan. "We will take baby Roo away," he said, "and then Kanga will go home, and the Forest will be quiet again."',
        },
        {
          kind: 'image',
          art: 'kanga-roo-bath',
          text: 'Kanga’s bath time in the Forest — with soap, and one very surprised Piglet.',
        },
        {
          kind: 'text',
          text: 'Pooh and Piglet did not like the plan much, but they began it all the same. Piglet hid inside Kanga’s cupboard, holding his breath. Then out he jumped. "Aha!" cried Piglet, hopping about. "Aha!" said Pooh from the doorway. "Now we have got you, Baby Roo!"',
        },
        {
          kind: 'note',
          text: 'New word: hop — a little jump, up and down. Kangas hop, Roos hop, and Piglets hop too — but only one of them says Aha!',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'But Kanga was not frightened at all. She looked at the hopping, squeaking little animal, and said, kindly, "It is bath time." And before Piglet could say a word, she popped him into warm water and washed him with yellow soap, till he was cleaner than he had ever been in all his life.',
        },
        {
          kind: 'text',
          text: '"Aha!" said Kanga at last, drying Piglet’s ears very gently. "It was only a joke," said Pooh, "a Clever Trick — and it did not work." So Kanga and Roo stayed in the Forest after all, and became friends with everyone. And Piglet found that he did not mind a warm bath one bit.',
        },
      ],
    },
    {
      title: 'Chapter 7 · Piglet and the Flood',
      art: 'piglet-flood',
      artPrompt: 'a tiny pink pig floating on a little armchair in brown flood water beside a green bottle with a cork, a round bear in a red shirt and a boy paddling a big blue umbrella held upside down like a boat, treetops above the water, soft grey rainy sky',
      blocks: [
        {
          kind: 'text',
          text: 'It rained and rained and rained, for days and days, until the whole Forest was under water. Piglet sat on a chair in his little house, safe and dry — until the water came in at the window, and the chair began to float, and Piglet floated out, out, out into the big grey flood.',
        },
        {
          kind: 'image',
          art: 'piglet-flood',
          text: 'Piglet, entirely surrounded by water, floating away on his little chair.',
        },
        {
          kind: 'text',
          text: '"Help!" squeaked Piglet. But the Forest was quiet, and nobody heard. So Piglet found a bottle, and a cork, and a pencil, and he wrote in his best writing: "IT\'S PIGLET! HELP! HELP!" He pushed it into the bottle and sent it out to sail. Then he sat very still, and tried not to be frightened.',
        },
        {
          kind: 'note',
          text: 'New word: float — to rest on top of the water and not sink. Chairs can float, bottles can float, and one small pig floated all the way to a Rescue.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Christopher Robin found the bottle by the bridge. "It\'s a Rescue!" he cried, and Pooh came running — rather slowly, for he had been fast asleep. They opened a big blue umbrella and held it upside down, like a boat, and paddled out into the flood to look for Piglet.',
        },
        {
          kind: 'text',
          text: 'Over the water they went, calling Piglet’s name. And there he was, on his little chair, waving his handkerchief in the rain. Piglet climbed aboard the umbrella-boat, and they paddled home together. "A Rescue," said Pooh, "is a very fine thing — especially when it works."',
        },
      ],
    },
    {
      title: 'Chapter 8 · The North Pole',
      art: 'north-pole',
      artPrompt: 'a boy holding up a long straight pine pole beside a sparkling forest stream, a round bear in a red shirt, a small pink pig, a grey donkey, an owl and a tiny kangaroo joey standing round cheering, bright sunny day in a green wood',
      blocks: [
        {
          kind: 'text',
          text: '"We are all going on an Expotition," said Christopher Robin, "to the North Pole, to discover it." Pooh told everybody about it, and spelled it a little wrong. They set off with provisions — that means honey, and haycorns, and thistles to eat on the way.',
        },
        {
          kind: 'image',
          art: 'north-pole',
          text: 'The friends at the North Pole, just after the great discovery.',
        },
        {
          kind: 'text',
          text: 'On and on they marched, until they stopped by a stream for a little rest. Just then — splash! — little Roo fell in the water and sank down, down. But a long straight pole was lying on the bank, and Christopher Robin reached out with it quickly, and pulled Roo safely up by his coat.',
        },
        {
          kind: 'note',
          text: 'New word: discover — to find something that nobody has found before. They found a long pole in the Forest, and named it the North Pole!',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"This pole is a Very Important Thing," said Christopher Robin. "We have discovered it, and so it shall be the North Pole, for ever." They stuck it firmly in the ground by the stream, and cheered — and Eeyore was as proud as only a gloomy donkey can be.',
        },
        {
          kind: 'text',
          text: 'Then Christopher Robin gave a party, with honey and presents, and Eeyore made a speech to say thank you. And when the party was over, they all walked home through the evening light, together in the Forest — which is the very best way for a story to end.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Winnie-the-Pooh',
    author: 'A. A. Milne',
    authorDeathYear: 1956,
    jurisdiction: 'US',
    basis: 'pd-us',
    sourceUrl: 'https://www.gutenberg.org/ebooks/67098',
    note: 'Published 1926; US public domain (pre-1929). Milne died 1956, so the work remains within 70y pma in some EU jurisdictions and is used here under US public-domain status only. Plot follows Project Gutenberg eBook #67098; wording simplified for very young readers.',
  },
}
