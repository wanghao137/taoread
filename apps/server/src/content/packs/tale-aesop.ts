/**
 * Aesop’s Fables — complete 25-chapter edition, retold in simple English from the original public-domain text.
 * Existing chapters retained; missing chapters completed 2026-10-25 (找故事全量补全).
 */
import type { PackBook } from '../types'

export const aesopFables: PackBook = {
  "id": "aesop-fables",
  "title": "Aesop’s Fables",
  "author": "Aesop",
  "lang": "en",
  "category": "tale",
  "ageStage": "3-5",
  "intro": "Five short animal stories, each with a little lesson at the end. Meet a lion and a mouse, a tortoise and a hare, one very silly fox — and more!",
  "coverArt": "lion-mouse",
  "coverArtPrompt": "a big golden lion lying in the sun on a grassy hill, a tiny brown mouse standing bravely in front of him, acacia trees on the warm savanna, soft afternoon light",
  "coverFrom": "#E65100",
  "coverTo": "#FFCC80",
  "source": "Project Gutenberg eBook #28, public domain (Aesop, 6th century BCE)",
  "chapters": [
    {
      "title": "Chapter 1 · The Lion and the Mouse",
      "art": "lion-sun",
      "artPrompt": "a mighty lion asleep on warm grass under a blue sky, a little mouse tiptoeing across his great paw, golden savanna in the background",
      "blocks": [
        {
          "kind": "text",
          "text": "One day a great lion was fast asleep in the sun. His golden mane rose and fell as he snored. A tiny mouse ran out of the long grass — and ran right over the lion’s paw!"
        },
        {
          "kind": "image",
          "art": "lion-sun",
          "text": "The lion wakes up and catches the little mouse in his paw."
        },
        {
          "kind": "note",
          "text": "New word: paw — an animal’s foot. Lions have big paws, and mice have tiny ones.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "The lion woke up with a roar. He put his paw on the little mouse and opened his great jaws. \"Please, please let me go!\" cried the mouse. \"One day I may help you!\""
        },
        {
          "kind": "text",
          "text": "The lion laughed. \"How could a tiny mouse help a lion?\" But he was kind, and he lifted his paw. The little mouse ran home as fast as she could."
        },
        {
          "kind": "text",
          "text": "Some days later, the lion was caught in a hunter’s net. He pulled and pulled, but the ropes were too strong. He roared so loud that the trees shook."
        },
        {
          "kind": "text",
          "text": "The little mouse heard him. She ran to the net and began to gnaw. Snip, snip, snip — one rope after another gave way, and at last the lion was free."
        },
        {
          "kind": "note",
          "text": "Moral: Even a little friend can be a big help. Kindness is never wasted.",
          "art": "lamp-hint"
        }
      ]
    },
    {
      "title": "Chapter 2 · The Tortoise and the Hare",
      "art": "tortoise-hare",
      "artPrompt": "a green tortoise walking slowly along a dusty country road, a brown hare with long ears dashing past in a blur, grassy meadow and sunshine",
      "blocks": [
        {
          "kind": "text",
          "text": "A hare could run like the wind, and he knew it. \"I am the fastest animal of all!\" he told everyone he met. \"No one can beat me!\""
        },
        {
          "kind": "note",
          "text": "New word: fastest — the one that runs more quickly than all the others.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "A tortoise heard him. \"You may be fast,\" she said slowly, \"but I would like a race.\" The hare laughed so hard he nearly fell over. \"A race? With you? Wonderful!\""
        },
        {
          "kind": "image",
          "art": "tortoise-hare",
          "text": "The tortoise and the hare line up to race."
        },
        {
          "kind": "text",
          "text": "Off they went! The hare ran and ran, and soon he was far, far ahead. He looked back, but he could not even see the tortoise. \"I have plenty of time,\" he thought. \"I will rest a little.\" He lay down under a tree and fell fast asleep."
        },
        {
          "kind": "text",
          "text": "The tortoise never stopped. Slowly, step by step, she walked on. She passed the sleeping hare. She walked and walked, and at last she crossed the finish line."
        },
        {
          "kind": "text",
          "text": "When the hare woke up, he ran as fast as he could — but it was too late. The slow tortoise had already won the race."
        },
        {
          "kind": "note",
          "text": "Moral: Slow and steady wins the race. Keep going, and you will get there.",
          "art": "lamp-hint"
        }
      ]
    },
    {
      "title": "Chapter 3 · The Boy Who Cried Wolf",
      "art": "boy-sheep",
      "artPrompt": "a shepherd boy in a tunic standing on a green hillside, a flock of fluffy white sheep around him, a wooden crook in his hand, village rooftops in the valley below",
      "blocks": [
        {
          "kind": "text",
          "text": "A boy watched his father’s sheep on a hill. All day long he sat with the flock, and nobody came to talk to him. It was very quiet work — and the boy was bored."
        },
        {
          "kind": "note",
          "text": "New word: flock — a group of sheep that live and walk together.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "One day he thought of a game. He cupped his hands and shouted as loud as he could: \"Wolf! Wolf! A wolf is after the sheep!\""
        },
        {
          "kind": "image",
          "art": "boy-sheep",
          "text": "The boy calls for help, and the villagers run up the hill."
        },
        {
          "kind": "text",
          "text": "The villagers ran up the hill to help him. They looked all around. There was no wolf anywhere — only the boy, laughing. \"There is no wolf,\" he said. \"I fooled you!\""
        },
        {
          "kind": "text",
          "text": "A few days later, the boy was bored again. \"Wolf! Wolf!\" he shouted. Again the kind people ran up the hill. Again there was no wolf. The boy laughed and laughed."
        },
        {
          "kind": "text",
          "text": "Then one evening a real wolf came out of the dark wood. It was big and grey and hungry. The boy shouted, \"Wolf! Wolf! Please help!\" But nobody came. Nobody believed him. The wolf snatched a sheep and carried it away."
        },
        {
          "kind": "note",
          "text": "Moral: No one believes a story-teller, even when he tells the truth. Always say what is true.",
          "art": "lamp-hint"
        }
      ]
    },
    {
      "title": "Chapter 4 · The Ant and the Grasshopper",
      "art": "ant-grasshopper",
      "artPrompt": "a golden summer meadow, a small brown ant carrying a seed of wheat on her back, a bright green grasshopper sitting on a leaf playing a blade of grass like a fiddle",
      "blocks": [
        {
          "kind": "text",
          "text": "All through the hot summer days, an ant worked. She carried heavy seeds of wheat and barley down into her hill, one by one, filling her store-room full of food."
        },
        {
          "kind": "note",
          "text": "New word: gather — to collect and bring things together, like nuts or seeds for winter.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "A grasshopper watched her. \"Why do you work so hard?\" he said. \"The sun is warm and the grass is sweet. Come and dance with me!\" And he rubbed his long legs together and played a little song."
        },
        {
          "kind": "image",
          "art": "ant-grasshopper",
          "text": "The ant works while the grasshopper plays his song."
        },
        {
          "kind": "text",
          "text": "The ant only smiled. \"Winter is coming, and it will be cold,\" she said. \"I am saving food for the frosty days.\" The grasshopper did not listen. He sang and played all summer long."
        },
        {
          "kind": "text",
          "text": "When the snow came, the grasshopper had nothing to eat and nowhere warm to go. Shivering, he knocked at the ant’s door. The ant was sorry for him. \"Come in and share my food,\" she said. \"You are welcome to stay.\""
        },
        {
          "kind": "text",
          "text": "The grasshopper was glad and thankful. From that winter on, he always worked a little, and played a little too."
        },
        {
          "kind": "note",
          "text": "Moral: Work first, and then play — you will be glad when the cold days come.",
          "art": "lamp-hint"
        }
      ]
    },
    {
      "title": "Chapter 5 · The Fox and the Grapes",
      "art": "fox-grapes",
      "artPrompt": "a red fox standing on his hind legs under a leafy grape vine, a big bunch of purple grapes hanging high above, green trellis and blue sky",
      "blocks": [
        {
          "kind": "text",
          "text": "One hot afternoon, a fox was out for a walk. His tummy rumbled. He had eaten nothing all day, and he wanted something cool and sweet."
        },
        {
          "kind": "image",
          "art": "fox-grapes",
          "text": "The fox looks up at a big bunch of purple grapes."
        },
        {
          "kind": "note",
          "text": "New word: vine — a long climbing plant that grapes grow on.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "In a garden he saw a vine, and on the vine hung a big bunch of purple grapes. They looked cool and juicy and full of juice. The fox licked his lips."
        },
        {
          "kind": "text",
          "text": "He jumped. Snap! His teeth closed on nothing but air. He jumped again — higher this time. Still the grapes were too high. He jumped and jumped, but he could not reach them."
        },
        {
          "kind": "text",
          "text": "At last the fox was too tired to try again. He sat down, rubbed his sore paws, and tossed his head. \"Those grapes are sour and bad,\" he said. \"I would not eat them if I could!\" And off he walked."
        },
        {
          "kind": "note",
          "text": "Moral: It is easy to say you do not want a thing — when you cannot have it.",
          "art": "lamp-hint"
        }
      ]
    },
    {
      "title": "Chapter 6 · The Crow and the Pitcher",
      "art": "aes-crow-pitcher",
      "artPrompt": "a black crow standing beside a tall clay pitcher on a garden path, dropping a small pebble into it, warm summer light under a leafy fig tree, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "One hot summer day, a crow was very thirsty. He flew from pond to stream to well, and found them all dried up in the heat. At last he came to a quiet garden and saw a tall clay pitcher under a fig tree. It looked cool and old, and the crow fluttered down and peeped inside. His throat was as dry as a stone, and his wings were tired with flying all day. The garden was very still, and the afternoon was burning hot."
        },
        {
          "kind": "note",
          "text": "New word: pitcher — a tall clay jar with a small mouth, for holding water or juice.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "There was water at the bottom, but only a little of it. The crow put his beak down as far as it would go, and still the water was out of reach. He tipped the pitcher this way and that, but it was far too heavy to lift. He pushed and he pulled, but the jar would not fall. He even tried to scoop the water out, but he had nothing to scoop it with. The poor crow sat down beside it in the shade, thirstier than ever."
        },
        {
          "kind": "image",
          "art": "aes-crow-pitcher",
          "text": "The thirsty crow peeps into the tall pitcher and sees the water far below."
        },
        {
          "kind": "text",
          "text": "Then he stopped flapping and began to think. All round the pitcher, little pebbles lay on the garden path, smooth and dry. The crow picked one up in his beak and dropped it into the pitcher. Plip! He picked up another, and another. Plip, plip, plip, all through the sunny afternoon, till his wings ached with working."
        },
        {
          "kind": "text",
          "text": "With every pebble, the water rose a little higher in the jar. The crow watched it climb, and he worked harder than ever, pebble after pebble. At last the water came right up to the top. Then the clever bird put in his beak and drank his fill, cool and sweet. He had saved himself by thinking, and nobody had helped him at all. And off he flew, feeling smarter than any crow in the whole wide garden."
        },
        {
          "kind": "note",
          "text": "Moral: Little by little does the trick. When one way fails, think of another.",
          "art": "lamp-hint"
        }
      ]
    },
    {
      "title": "Chapter 7 · The Fox and the Crow",
      "art": "aes-fox-crow",
      "artPrompt": "a red fox looking up from the grass at a black crow holding a piece of golden cheese in her beak on a high tree branch, sunny morning light, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "One bright morning a crow found a big piece of cheese, fresh and golden, lying by a farmhouse door. She flew up to the high branch of a tree to eat it in peace. The cheese smelled sweet, and she felt very proud of her prize. She sat perched on the branch with the cheese held tight in her black beak. She meant to enjoy every crumb."
        },
        {
          "kind": "note",
          "text": "New word: perch — to sit on a branch or a high place, the way birds do.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "A fox came trotting below and looked up. The smell of the cheese made his mouth water at once. He was hungry too, and the cheese was his favourite thing. So he began to think of a clever way to get it. “Good day, Mistress Crow,” he called up sweetly. “How black and shiny your feathers are! Your eyes are bright, your claws are strong — and how fine you look today!”"
        },
        {
          "kind": "image",
          "art": "aes-fox-crow",
          "text": "The fox praises the crow, who sits high above with the cheese in her beak."
        },
        {
          "kind": "text",
          "text": "The crow listened, and her feathers swelled with pride. She had never been praised so much in all her life. “And you must have a lovely voice too,” said the fox. “Sing me just one little song, Queen of the Birds!” The crow was so pleased that she quite forgot the cheese. She opened her beak wide, and gave her loudest caw."
        },
        {
          "kind": "text",
          "text": "Down fell the cheese — and the fox snapped it up in a moment. “Thank you kindly,” he said. “That was a sweet song, and your cheese is sweeter still.” Then off he trotted into the wood with his dinner. The poor crow sat silent on her branch, hungry and sorry, with no one to blame but herself. For a whole day after, she kept her beak shut whenever anyone praised her."
        },
        {
          "kind": "note",
          "text": "Moral: Beware of flatterers. Sweet words are often after your supper.",
          "art": "lamp-hint"
        }
      ]
    },
    {
      "title": "Chapter 8 · The Wind and the Sun",
      "art": "aes-wind-sun",
      "artPrompt": "a smiling golden sun and a blustery blue wind with puffed cheeks above a traveller in a big brown coat on a country road, soft clear daylight, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "One day the North Wind and the Sun quarrelled about which of them was the stronger. While they were arguing, a traveller came walking along the road below. He wore a big warm coat, wrapped close round him. The road was long and dusty, and the day was cool. “Let us test it fairly,” said the Sun. “Whoever makes the man take off his coat is the strongest of us two.”"
        },
        {
          "kind": "note",
          "text": "New word: quarrel — to argue angrily with someone about something.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "The Wind tried first. He blew and blew, a great cold gust down from the hills. But the harder he blew, the tighter the man held his coat. He buttoned it up to his chin and wrapped it close. The coat flapped and snapped about him in the gale. The Wind puffed and panted until he had no breath left, but the coat stayed on."
        },
        {
          "kind": "image",
          "art": "aes-wind-sun",
          "text": "The Wind blows with puffed cheeks while the traveller pulls his coat tighter."
        },
        {
          "kind": "text",
          "text": "Then it was the Sun’s turn. The Sun smiled gently, and warm beams came down one by one. The man wiped his hot face and walked more slowly. The day grew warmer and warmer, and soon the man was glowing. He undid his buttons, and at last he slipped the coat right off. The traveller smiled up at the sky, glad of the kind weather."
        },
        {
          "kind": "text",
          "text": "The Sun shone kindly on, until the man sat down under a tree in his shirt. So the North Wind had lost the contest. He blew once more, softly this time, and promised to be gentle for a whole week. “You see,” said the Sun, “a little warmth and kindness will do what all the force in the world cannot.” And the Wind had to agree that it was true."
        },
        {
          "kind": "note",
          "text": "Moral: Persuasion is better than force. Gentle warmth goes further than stormy wind.",
          "art": "lamp-hint"
        }
      ]
    },
    {
      "title": "Chapter 9 · The City Mouse and the Country Mouse",
      "art": "aes-mice-town",
      "artPrompt": "two small mice on a grand dining table laid with cakes, cheese and jam, a big cat creeping through the door behind them, warm candlelight, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "Once a country mouse asked his cousin from the city to come to dinner. He brought out all that he had: barley corns, dried peas, and a small bit of cheese rind. The dinner was laid neatly on a clean leaf, and the cousin sat down gladly. “Eat, dear cousin, and welcome,” he said. “I am sorry the dinner is plain, but it is the very best I have.”"
        },
        {
          "kind": "note",
          "text": "New word: barley — a kind of grain that grows in fields, a little like wheat.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "The city mouse nibbled a little and sighed. “My dear friend,” she said, “you live like a poor farmer in a hut. Come to the town and see how I live! White bread and jam every day! There is rich cheese too, and no mouse in the city ever eats plain barley.” So the country mouse agreed, and off they went together."
        },
        {
          "kind": "image",
          "art": "aes-mice-town",
          "text": "The two mice creep up onto a grand table laid with cakes, cheese, and jam."
        },
        {
          "kind": "text",
          "text": "In a fine dining room they climbed up onto the table. There lay rich cakes, honey, cheese, and jam in silver dishes. Everything smelled rich and sweet, and the mice danced about the cloth. “Now this is living!” cried the city mouse. But just then the door flew open, and in came a great cat! The two mice ran for their lives and hid in a crack in the wall."
        },
        {
          "kind": "text",
          "text": "When the cat had gone, they crept back for another taste. But then the cook banged the door, and a big dog barked, and the mice ran again, shaking with fear. “Goodbye, cousin,” said the country mouse at last. “Keep your cakes. Plain food in peace is better than a feast in fear.” And he went back to his barley, happy under the quiet stars."
        },
        {
          "kind": "note",
          "text": "Moral: A quiet supper in peace is better than a grand feast full of frights.",
          "art": "lamp-hint"
        }
      ]
    },
    {
      "title": "Chapter 10 · The Goose That Laid the Golden Eggs",
      "art": "aes-goose-egg",
      "artPrompt": "a white goose sitting on a straw nest with one shining golden egg beside her, a farmer and his wife gazing in wonder in a farmhouse yard, fresh morning light, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "A man and his wife had a wonderful white goose. Every morning the goose laid one great egg of pure gold. The man carried the egg to market and sold it for a fine price. The goose was quiet and gentle, and ate the corn from the children’s hands. Day by day the family grew richer, with a new roof and a full pantry. And all of it came from one goose."
        },
        {
          "kind": "note",
          "text": "New word: pantry — the cool little room or cupboard where food is kept at home.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "But the man and his wife were not content. “Why wait for one egg a day?” they said to each other. “There must be a great lump of gold inside the goose herself. If we cut her open, we shall be rich all at once!” Patience seemed a very slow way to be rich. They would not listen to anyone who asked them to wait."
        },
        {
          "kind": "image",
          "art": "aes-goose-egg",
          "text": "The farmer and his wife stand looking at their white goose on her nest of straw."
        },
        {
          "kind": "text",
          "text": "So one morning they took the goose and killed her, hoping to find all their treasure at once. The sun was hardly up, and the yard was still. They looked inside her, from beak to toe. But there was no gold there at all — nothing but an ordinary goose. The gold had been in the eggs, and the eggs had never been laid."
        },
        {
          "kind": "text",
          "text": "The man and his wife sat down and wept. They had been rich, and now they were poor, and it was all their own doing. And no goose in the world can lay a golden egg after she is gone. The yard felt empty without her, too. Greed had taken their treasure and their happiness too. So they lived on, plain and careful, and never forgot their greedy morning."
        },
        {
          "kind": "note",
          "text": "Moral: Greed loses everything. Grasp for too much, too fast, and you may be left with nothing.",
          "art": "lamp-hint"
        }
      ]
    },
    {
      "title": "Chapter 11 · The Dog and His Shadow",
      "art": "aes-dog-shadow",
      "artPrompt": "a brown dog with a piece of meat in his mouth crossing a narrow wooden bridge, looking down at his own reflection in the clear brook below, dappled sunlight, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "A dog stole a great piece of meat from a butcher’s shop and ran off with it in his mouth. He was proud and happy, for it was a very fine dinner. The meat was fresh and sweet, and the day was bright. He trotted gaily along, with the sun on his back. On his way home he came to a little brook. He had to cross it over a narrow wooden bridge. The bridge was old, and the water ran quiet below."
        },
        {
          "kind": "note",
          "text": "New word: brook — a very small river, small enough to step across.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "As he trotted over the bridge, he happened to look down into the clear water. There below him he saw another dog, and that dog seemed to be carrying a piece of meat too! The meat below looked even bigger than his own. His eyes grew big, and his tail wagged with greed. “I will have that one as well,” thought the greedy dog."
        },
        {
          "kind": "image",
          "art": "aes-dog-shadow",
          "text": "The dog on the bridge stares down at his own reflection in the still water."
        },
        {
          "kind": "text",
          "text": "So he opened his mouth and snapped at the shadow. Splash! The meat he was carrying fell from his jaws and sank deep into the brook. The other dog vanished too, for it had been only his own reflection all along. The water grew still, and the dinner was gone for good. It was a snap, a splash, and a sorry ending, all in one moment."
        },
        {
          "kind": "text",
          "text": "So the dog went home with nothing at all. He had lost his own dinner because he wanted two dinners. A wise dog keeps one dinner and enjoys it well. That is the way of greed. On quiet evenings he still stopped on the bridge and looked down at the water. And he never snapped at shadows again — not once, all the rest of his days."
        },
        {
          "kind": "note",
          "text": "Moral: Do not grasp at shadows, or you may lose the good thing you already have.",
          "art": "lamp-hint"
        }
      ]
    },
    {
      "title": "Chapter 12 · Belling the Cat",
      "art": "aes-bell-cat",
      "artPrompt": "a family of little grey mice holding a meeting behind a wooden wall at night, one mouse holding up a tiny golden bell, a sleeping tabby cat beyond, soft moonlight, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "In an old house there lived a family of mice, and in the same house lived a cat. The cat was sleek and silent, with sharp ears and a soft tread. She caught a mouse nearly every day, and life grew very hard for the little family. The mice crept out only when the cat was far away. So one night they held a meeting behind the wall, to think of a plan together."
        },
        {
          "kind": "note",
          "text": "New word: meeting — a gathering where people, or mice, talk things over together.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "Every mouse gave his idea, and none of them seemed quite right. At last a young mouse stood up and made a fine speech. The young mouse’s whiskers trembled, but his voice was brave. “Our danger is that the cat walks without a sound,” he said. “Let us hang a little bell round her neck. When the bell rings, we shall always have time to run and hide.”"
        },
        {
          "kind": "image",
          "art": "aes-bell-cat",
          "text": "The mice hold their meeting behind the wall, and one holds up a little bell."
        },
        {
          "kind": "text",
          "text": "Every mouse clapped his paws. “A bell for the cat!” they cried. The bell was small and golden, and it rang merrily in the young one’s paw. It was the cleverest plan they had ever heard, and they wondered that nobody had thought of it before. They squeaked with joy and danced till midnight, for they all felt quite safe already."
        },
        {
          "kind": "text",
          "text": "Then an old grey mouse stood up, and the dancing stopped. “The plan is good,” he said. “But tell me, friends — who of us will hang the bell on the cat?” Not one mouse answered. Not the young speaker, not the dancers, not one. The old mouse sat down slowly, shaking his grey head. And so they live in that house to this day — careful, hungry, and un-belled."
        },
        {
          "kind": "note",
          "text": "Moral: It is easy to propose a clever plan, and hard to be the one who does it.",
          "art": "lamp-hint"
        }
      ]
    },
    {
      "title": "Chapter 13 · The Miller, His Son, and the Donkey",
      "art": "aes-miller-donkey",
      "artPrompt": "a miller and his son walking beside a small grey donkey on a dusty road leading to a market town, warm afternoon light, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "A miller and his son were driving their donkey to the market to sell him. They walked along the dusty road beside him, leading him quietly with a rope. The donkey plodded along, and the morning was young and fresh. Soon they met a girl, who laughed at the sight of them. “What silly people!” she cried. “One of you might ride, and let the poor donkey walk!”"
        },
        {
          "kind": "note",
          "text": "New word: market — the place in town where people buy and sell things.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "So the boy climbed up at once, quite pleased with the ride. But an old man passing by frowned at them. The old man shook his stick as he spoke. “Shame on the lazy boy,” he said, “riding while his poor old father walks in the dust!” So they changed places, and the miller rode and the son walked on. The dust of the road rose round the boy’s shoes."
        },
        {
          "kind": "image",
          "art": "aes-miller-donkey",
          "text": "The miller and his son walk the dusty road beside their little grey donkey."
        },
        {
          "kind": "text",
          "text": "A little farther on, some women called out. “Look at that selfish father, riding while his small son walks in the heat!” So the miller lifted his boy up too, and they both rode the donkey together. The donkey groaned a little under the weight. The sun climbed higher, and the road grew dustier. Then other travellers grumbled, “Poor beast! Two riders will wear him out before he reaches market at all.”"
        },
        {
          "kind": "text",
          "text": "What could they do now? The miller and his son tied the donkey’s legs to a pole. They carried him on their shoulders, sweating and red. Everyone they met laughed till they cried. At the bridge the donkey kicked and struggled, fell into the river, and was lost. The market was never reached, and the rope hung empty. And the miller went home with nothing at all."
        },
        {
          "kind": "note",
          "text": "Moral: Try to please everyone, and you will please no one — and may lose your donkey too.",
          "art": "lamp-hint"
        }
      ]
    },
    {
      "title": "Chapter 14 · The Wolf and the Crane",
      "art": "aes-wolf-crane",
      "artPrompt": "a grey wolf standing at the edge of a dark wood while a long-legged crane draws a bone out of his throat with her beak, cool evening light, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "One evening a wolf was gobbling his supper so fast that a bone stuck fast in his throat. He could not swallow it, and he could not cough it out. The pain was dreadful. The bone was long and sharp, and it would not stir. Supper had been good, but now it was sorrow. Howling, he ran up and down the shore, offering a rich reward to anyone who would help him."
        },
        {
          "kind": "note",
          "text": "New word: howling — crying out loud and long, the way a wolf does.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "At last a crane was persuaded to try. The wolf called to her most politely, for his throat was very sore. Her long neck shook a little, but she did not run. She stood brave and still, put her beak down the wolf’s throat, and drew the bone out. “Now give me my reward,” said the crane, when her head was safe again."
        },
        {
          "kind": "image",
          "art": "aes-wolf-crane",
          "text": "The crane pulls the long bone out of the wolf’s throat with her pointed beak."
        },
        {
          "kind": "text",
          "text": "The wolf grinned and licked his lips. “Reward?” he said. “You put your head into a wolf’s mouth, and you took it out again in one piece. That is reward enough for anybody. Be thankful that you were not eaten, and go home.” His supper tasted better now that the bone was gone. And he walked off into the dark wood, yawning."
        },
        {
          "kind": "text",
          "text": "The crane looked at her long beak and flew away without a word. But she told every bird in the marsh about the wolf and his promise. So the wolf learned that a promise from him was worth little. From that day, whenever the wolf passed by the water, every bird flew up into the trees at once. And no crane ever helped him again. The marsh was quiet, and the wolf grew thin and lonely."
        },
        {
          "kind": "note",
          "text": "Moral: Do not expect a reward from the ungrateful. Be glad if you come away safe yourself.",
          "art": "lamp-hint"
        }
      ]
    },
    {
      "title": "Chapter 15 · The Fox and the Stork",
      "art": "aes-fox-stork",
      "artPrompt": "a red fox and a long-legged stork at a little table with a flat dish of soup and a tall glass jar, a cosy cottage kitchen at dusk, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "A fox asked a stork to dinner one day, and the stork gladly came. She came at sunset, hungry and hopeful. The table was set in the garden, under the wide evening sky. But the fox played a trick on her. He put out a big flat dish of soup, and lapped it up easily with his red tongue. The soup was good, but the dish was a shallow one. The stork had only a long pointed bill, and she could barely wet the tip of it."
        },
        {
          "kind": "note",
          "text": "New word: lap — to drink by taking little quick licks with the tongue, as dogs and cats do.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "All the poor stork could do was stand hungry while her supper vanished. The fox sat smiling. “How do you like the soup?” he asked. “Is it not good?” The stork went home with an empty tummy, but she said not one cross word. Then she sat by her nest and thought and thought. She quietly made a little plan of her own."
        },
        {
          "kind": "image",
          "art": "aes-fox-stork",
          "text": "The fox laps soup from a flat dish while the stork stands hungry beside it."
        },
        {
          "kind": "text",
          "text": "A few days later the stork asked the fox to dinner. She brought out a tall glass jar, full to the very neck of fine soup. The soup inside smelled even sweeter than the fox’s had. The stork dipped in her long bill and supped happily. The fox could only lick round the rim, for his nose was far too short to reach the soup inside."
        },
        {
          "kind": "text",
          "text": "So the fox had to go home as hungry as he had made the stork. “Do not be upset,” said the stork sweetly. “One bad turn deserves another. Next time, let us serve our supper in a dish we can both enjoy.” And after that, the two of them were very good friends indeed. And the fox never played tricks at his own table again."
        },
        {
          "kind": "note",
          "text": "Moral: One bad turn deserves another. Treat others the way you would like to be treated.",
          "art": "lamp-hint"
        }
      ]
    },
    {
      "title": "Chapter 16 · The Hare with Many Friends",
      "art": "aes-hare-friends",
      "artPrompt": "a little brown hare looking up pleadingly at a horse and an ox in a farmyard while a pack of hounds chases across the green meadow behind, bright day, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "A hare had friends all over the meadow, and he boasted about them every day. He knew every path and every burrow from the hedge to the hill. “The horse is my friend,” he said, “and the ox, and the goat, and even the men’s calf. He had a name for every one of them. With so many friends, what have I to fear?” And he smiled as he counted his long list of names."
        },
        {
          "kind": "note",
          "text": "New word: boast — to talk too proudly about yourself or what you have.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "One day the hounds came hunting through the meadow, and the hare ran for his life. The hounds were big and swift, and their voices rang over the fields. He reached the farmyard, panting. “Help me, friend Horse!” he cried. But the horse said, “I must carry my master just now,” and trotted away. So the hare looked about for another friend."
        },
        {
          "kind": "image",
          "art": "aes-hare-friends",
          "text": "The little hare looks up at the horse and the ox, while the hounds come nearer."
        },
        {
          "kind": "text",
          "text": "He begged the ox, but the ox was ploughing and could not stop. He begged the goat, who was busy eating on the hill. He begged the calf, who was too young and too afraid. The shadows grew long, and still they refused. Every friend had a reason, and every friend went away, and the hounds came closer and closer."
        },
        {
          "kind": "text",
          "text": "At last the hare doubled and dodged and escaped by a whisker. He sat in his burrow all night, listening to the baying of the hounds far away. He had a hundred friends, he thought, and not one of them had lifted a hoof to help him. It is better to have one friend than a hundred who are only friends in name. It was a long lesson, but he learned it well."
        },
        {
          "kind": "note",
          "text": "Moral: He that has many friends has no friends. One true friend is worth more than a hundred busy ones.",
          "art": "lamp-hint"
        }
      ]
    },
    {
      "title": "Chapter 17 · The Wolf in Sheep’s Clothing",
      "art": "aes-wolf-fleece",
      "artPrompt": "a grey wolf wrapped in a white sheep’s fleece creeping among a flock of sheep at dusk while a shepherd with a lantern comes walking over the grass, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "A wolf had waited a long time to catch a sheep. But the shepherd and his dogs kept such good watch that he never could. The shepherd was careful, and his dogs were watchful. Then one evening the wolf found a sheep’s fleece lying in the field. It was soft and white, and he wrapped it round himself like a coat. Then a wicked thought came to him, and he smiled."
        },
        {
          "kind": "note",
          "text": "New word: fleece — the woolly coat of a sheep, taken off whole.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "That night the wolf crept into the pasture among the flock, right past the shepherd’s eyes. No dog barked, and nobody looked at him twice. In the fold the sheep slept close together, warm and calm. The moon was high, and the grass was silver with dew. To every eye he was a sheep. But under the fleece his heart was still a wolf’s heart, hungry and sly. He smiled to himself in the dark."
        },
        {
          "kind": "image",
          "art": "aes-wolf-fleece",
          "text": "A grey wolf in a white fleece creeps among the flock in the dusk."
        },
        {
          "kind": "text",
          "text": "In the night he led a little lamb away, whispering that he was its mother. The little lamb trotted after him without a fear in the world. The night was still, and every step could be heard. But the shepherd, counting his flock at bedtime, missed one sheep and one lamb. He took up his crook and his lantern and followed the tracks over the dewy grass till he found them."
        },
        {
          "kind": "text",
          "text": "The lantern light fell on the white fleece, and the shepherd knew the wolf at once. The fleece could not hide him from a lantern held close. He shut the lamb safely in the fold and dealt with the wolf as wolves deserve. And after that night the shepherd looked twice at every white coat in his flock. He looked hardest at the ones that seemed the softest."
        },
        {
          "kind": "note",
          "text": "Moral: An evil heart does not change under a white coat. Watch out for wolves in sheep’s clothing.",
          "art": "lamp-hint"
        }
      ]
    },
    {
      "title": "Chapter 18 · The Ass in the Lion’s Skin",
      "art": "aes-ass-lion",
      "artPrompt": "a donkey wearing a lion’s skin standing proudly in a meadow while sheep and goats run away, a fox laughing at the edge of the wood, bright morning light, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "An ass found a lion’s skin lying in a field where the hunters had been. He pulled it over his long ears and tied it under his chin. The skin was heavy and warm, and it smelled of the lion. Then he looked at himself in a quiet pool and laughed. “Now I am a lion!” he said, and trotted off to try his new looks."
        },
        {
          "kind": "note",
          "text": "New word: mane — the long hair that grows round a lion’s neck.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "Every animal he met ran away in terror. The sheep fled from the fold, the goats scrambled up the rocks, and a fox dashed into its hole. Even the dogs hid behind the barn door. Not one animal stayed to see who he really was. The ass stood in the middle of the empty meadow and swelled with pride. “What a great lion I am,” he said to himself, “and how brave they all think me!”"
        },
        {
          "kind": "image",
          "art": "aes-ass-lion",
          "text": "The ass in the lion’s skin stands in the meadow while the small animals flee."
        },
        {
          "kind": "text",
          "text": "But a fox knew the lion well, and she did not run far. She sat at the edge of the wood and watched. She had heard the story from the sheep, and she meant to see for herself. Just then the ass grew so pleased with himself that he lifted up his head and brayed. It was a long, loud, silly hee-haw, and it echoed over all the meadow."
        },
        {
          "kind": "text",
          "text": "The fox laughed till she fell over. “You would have frightened me indeed,” she called, “if you had kept your mouth shut. But I know a donkey’s voice when I hear one.” The animals came back laughing, and the ass pulled off the lion’s skin and slunk away home in shame. And from that day he was glad to be only himself."
        },
        {
          "kind": "note",
          "text": "Moral: Fine clothes may hide a fool for a moment, but silly words will always show him.",
          "art": "lamp-hint"
        }
      ]
    },
    {
      "title": "Chapter 19 · The Old Lion and the Fox",
      "art": "aes-old-lion",
      "artPrompt": "an old grey lion lying still inside a rocky den while animals gather at the entrance, a wise fox pausing outside on the grass, dim cave light, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "A lion had grown so old that he could not hunt any more. His legs were stiff, his teeth were gone, and his breath came slowly. His mane was thin, and his eyes were dim. It was sad to see the great king so weak and grey. So he thought of a trick instead. He lay down in his den and told every animal that he was very ill, too ill to move."
        },
        {
          "kind": "note",
          "text": "New word: den — the home cave where a wild animal sleeps.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "The animals came one by one to visit their sick king. Kind hearts came trotting to the door, one after another. And the lion thanked each one most sweetly. The lion lay still and sighed till they came close. Then his paws shot out. Visitor after visitor went into the den, and visitor after visitor was seen no more. The den grew very quiet, and the old lion grew very comfortable."
        },
        {
          "kind": "image",
          "art": "aes-old-lion",
          "text": "The old lion lies still in his den, watching the animals come to his door."
        },
        {
          "kind": "text",
          "text": "At last the fox came. She walked up to the mouth of the den and stopped, and stood looking carefully at the ground. The shadow of the den lay cool and dark. She did not go one step nearer. “Come in, dear fox,” said the lion, in his gentlest, weakest voice. “You see a sick old king. Come in and comfort me before it is too late.”"
        },
        {
          "kind": "text",
          "text": "“Thank you, Majesty,” said the fox. “I see many footprints going into your den, and I do not see one coming out. I shall visit you from here.” The lion sighed, for his dinner was safe from her. And the fox trotted home across the meadow, telling the news as she went, safe and sound. So the old lion learned that eyes can be as sharp as teeth."
        },
        {
          "kind": "note",
          "text": "Moral: Wise folk learn from the troubles of others, not only from their own.",
          "art": "lamp-hint"
        }
      ]
    },
    {
      "title": "Chapter 20 · The Frogs Who Wanted a King",
      "art": "aes-frogs-king",
      "artPrompt": "green frogs leaping around a big wooden log floating in a quiet pond, tall reeds and a faraway mountain, gentle morning light, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "In a quiet marsh there lived a family of frogs, free to leap and swim and croak all day. The pool was their own, and the reeds were soft and green. They were free, but they did not know it. “We need a king to rule over us,” they croaked. So they sent a message up to Jupiter, the great god on the mountain, to ask for one."
        },
        {
          "kind": "note",
          "text": "New word: content — happy and satisfied with what you already have.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "Jupiter heard, and he smiled at their silliness. He dropped a great log into the pool with a mighty splash. The water rose high, and the reeds shook. The frogs dived under the mud in fright. But after a while one brave frog peeped out, and then another. Soon they all came up to look at their new king. It did not look like a king, but there it lay."
        },
        {
          "kind": "image",
          "art": "aes-frogs-king",
          "text": "The frogs gather round the big wooden log that has fallen into their pool."
        },
        {
          "kind": "text",
          "text": "The log lay perfectly still. It neither spoke nor moved. The shyest frogs soon dared to sit upon it, and the boldest even jumped on the king’s head. The frogs sat round and waited to see what kings do. They wanted a king with a crown and a voice. Before long the frogs grew bored. “This king is only wood!” they croaked, and they sent again to Jupiter, asking for a real king."
        },
        {
          "kind": "text",
          "text": "Now Jupiter lost his patience. He sent down a stork, who stood tall and proud on the shore. The stork bowed politely — and then she began to eat the frogs, one by one, day after day. The reeds hid them, and the stork waited. The frogs wished with all their hearts for their wooden king again, but wishes do not come back. And the marsh was never so quiet again."
        },
        {
          "kind": "note",
          "text": "Moral: Let well enough alone. Be content with what you have, and think before you ask for more.",
          "art": "lamp-hint"
        }
      ]
    },
    {
      "title": "Chapter 21 · The Fox and the Goat",
      "art": "aes-fox-well",
      "artPrompt": "a wet fox standing in a deep round stone well looking up at a horned goat climbing down the wall toward him, a bright circle of sky far above, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "A fox was leaping about the top of an old well one summer evening, and down he fell. The well was deep, and though he swam and scrambled, he could not get out. The rope and the bucket were long gone, and nobody came that way. Before long he was wet, tired, and sorry, with no way at all up the smooth stone sides."
        },
        {
          "kind": "note",
          "text": "New word: well — a deep hole dug in the ground to reach the water below.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "By and by a goat came to the well and looked down. The evening was warm, and the goat was thirsty from the road. “Is the water good down there?” he asked. The fox saw his chance at once. He smiled to himself in the dark of the well. “Good?” he cried. “It is the sweetest water in all the country! Come down and taste it for yourself. There is plenty for us both.”"
        },
        {
          "kind": "image",
          "art": "aes-fox-well",
          "text": "The goat climbs down into the well while the clever fox waits below."
        },
        {
          "kind": "text",
          "text": "The goat could think of nothing but cold, sweet water. Down he jumped — splash! — and he drank his fill. Then he began to wonder how they would both get out again. “Do not worry,” said the fox. “Put your front feet against the wall and lower your horns. I will run up your back, and pull you after me.”"
        },
        {
          "kind": "text",
          "text": "So the goat stood still as a rock. The fox ran lightly up his back and his horns, and out of the well in a trice. “If you had as much sense in your head as hair on your chin,” he called down. “You would never have jumped before thinking of the way out.” And the goat stayed in the well a long, long time. And that is the story of the fox, the goat, and the well."
        },
        {
          "kind": "note",
          "text": "Moral: Look before you leap. Think of the way out before you jump in.",
          "art": "lamp-hint"
        }
      ]
    },
    {
      "title": "Chapter 22 · The Two Crabs",
      "art": "aes-two-crabs",
      "artPrompt": "a mother crab and a small young crab walking sideways along golden sand by the sea, little waves and shells around them, sunny morning, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "On a warm sandy shore there lived a mother crab and her young daughter. The sea was calm, and the shells lay thick upon the sand. The morning sun shone warm, and the tide had gone out. Little tracks ran behind them across the sand. One morning they came out of their hole together and walked sideways down the beach, as crabs do. The mother watched her daughter sidling along, and she grew very cross with what she saw."
        },
        {
          "kind": "note",
          "text": "New word: shore — the sandy or stony land along the edge of the sea.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "“Child,” she said, “why do you always walk sideways, crooked as a bent twig? Walk straight ahead, like a well-brought-up crab, and do not shame your family before the whole beach.” The mother crab lifted a claw, and her face was stern. The waves came in softly, and went out again. The little crab stopped and looked at her mother in surprise, and then she made a quiet answer."
        },
        {
          "kind": "image",
          "art": "aes-two-crabs",
          "text": "The mother crab and the young crab walk side by side on the golden sand."
        },
        {
          "kind": "text",
          "text": "“Mother,” said the young crab, “that is easy for you to say. But try it yourself first. Walk straight ahead, and I shall gladly follow your example.” The little crab waited politely in the shade of a shell. So the mother tried, and tried, and tried again. She huffed and puffed and wiggled, but the harder she tried, the more she went sideways."
        },
        {
          "kind": "text",
          "text": "She tried again and again on the warm sand, and every time she only scuttled sideways, as crabs always have. At last she gave it up, and laughed at herself instead. The mother said no more about walking straight. And the two went on down the beach together, sidling happily side by side. They went just as they were made to go, and they were both quite content with the way crabs go."
        },
        {
          "kind": "note",
          "text": "Moral: Example is the best lesson. Do not teach what you cannot do yourself.",
          "art": "lamp-hint"
        }
      ]
    },
    {
      "title": "Chapter 23 · The Mountains in Labour",
      "art": "aes-mountains",
      "artPrompt": "villagers gathered in a green field pointing up at a great smoking mountain that rumbles and shakes, tiny puffs of smoke above the rocky peaks, dramatic daylight, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "One day a great rumbling was heard among the mountains. Smoke curled up from the peaks, the ground shook, and the trees cracked and swayed. The people in the villages below ran out of their houses. It was said that the mountains were in labour, and about to bring forth. The oldest people could not remember the like of it. Every window was full of faces, and every road was full of people."
        },
        {
          "kind": "note",
          "text": "New word: rumbling — a long deep rolling sound, like far-away thunder.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "“A city is being born!” some said. “A giant!” said others. Everyone came running from far and near to see what wonderful thing would come out. Some brought bread for a long wait, for the day was fine. The morning passed, and the noon passed, and still they waited. They stood in the fields all day, pointing and waiting. Above them the mountains groaned and smoked and thundered on and on."
        },
        {
          "kind": "image",
          "art": "aes-mountains",
          "text": "The villagers watch the mountain, which smokes and groans and rumbles above them."
        },
        {
          "kind": "text",
          "text": "The groaning grew louder, and the smoke grew thicker, till nobody dared to breathe. Even the birds left the trees on the mountainside. The crowd held its breath, and nobody moved an inch. Then the mountain gave one last mighty rumble — and out ran a little mouse. Just one small brown mouse, who whisked across a stone, looked at the crowd, and scampered away into the grass."
        },
        {
          "kind": "text",
          "text": "The people stood staring for a moment, and then went slowly home, shaking their heads. All that noise, all that smoke, all that thunder — and only a mouse. The crowd laughed, and the children laughed loudest of all. And the mountains, having had their say, were quiet again for many a long year. The wise folk smiled as they went. The villages below were very glad of it."
        },
        {
          "kind": "note",
          "text": "Moral: Much noise may mean nothing at all. Do not judge a thing by the size of the fuss.",
          "art": "lamp-hint"
        }
      ]
    },
    {
      "title": "Chapter 24 · The Man and the Wood",
      "art": "aes-man-wood",
      "artPrompt": "a man with a new axe cutting down trees at the edge of a green forest, birds flying up from the falling branches, strong afternoon light, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "A man went into the wood and called out to the trees. His voice was soft, and his face was as smooth as oil. The trees rustled kindly in the light of the morning. “Good trees,” he said, “I have only a little favour to ask. My axe has lost its handle. Please give me one small branch, no more, and I shall be on my way at once.”"
        },
        {
          "kind": "note",
          "text": "New word: favour — a small kindness that you do for someone who asks.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "The trees stood together and talked it over in their whispering leaves. “It is only a little branch,” they said. “What harm can one small stick do to a whole forest?” The leaves whispered uneasily, but they let him have his way. So they agreed, and the man cut off one fine branch. He carried it home, promising to be grateful for ever. And he went away whistling, with the branch over his shoulder."
        },
        {
          "kind": "image",
          "art": "aes-man-wood",
          "text": "The man cuts one small branch from a tree at the edge of the forest."
        },
        {
          "kind": "text",
          "text": "At home he fitted the branch to his axe-head, and made a brand-new handle. The handle fitted well, and the axe was sharp and new. Then back he went into the wood — but not to ask for anything this time. The sound of the axe rang far through the green wood. He swung his mended axe, and boughs began to fall, and trunks began to topple, one after another."
        },
        {
          "kind": "text",
          "text": "The trees creaked and groaned as the man cut them down. “Oh, foolish friends,” sighed the oldest oak, “we gave away our own branch, and with it our whole forest.” And when the man went home at evening, the wood was much thinner than before. The trees had learned their lesson, but too late. The birds flew far and wide, and the wood was silent where they had sung."
        },
        {
          "kind": "note",
          "text": "Moral: What we give to a wicked man may be used against us. Guard the little things, for they may cost us everything.",
          "art": "lamp-hint"
        }
      ]
    },
    {
      "title": "Chapter 25 · The Eagle and the Beetle",
      "art": "aes-eagle-beetle",
      "artPrompt": "a great eagle swooping above a mountain crag while a tiny beetle pushes a little ball up the rocks toward her nest, bright wide sky, storybook illustration",
      "blocks": [
        {
          "kind": "text",
          "text": "One spring morning an eagle came sweeping down a valley after a hare. The hare ran to a hollow log where a little beetle lived. “Help me, friend!” he cried. The valley rang with the cry, and the beetle heard it well. The beetle flew up and begged the eagle: “Spare the hare, great bird, for he has asked my protection.”"
        },
        {
          "kind": "note",
          "text": "New word: protection — keeping someone safe from harm.",
          "art": "lamp-hint"
        },
        {
          "kind": "text",
          "text": "But the eagle was proud, and a beetle seemed very small to her. Her wings were wide, and her beak was strong. “I owe nothing to so little a creature,” she said. And she snatched the hare away and carried him off. The eagle spread her wings, and her shadow crossed the log. The beetle watched from his log, and he did not forget. Even the smallest friend can keep his word."
        },
        {
          "kind": "image",
          "art": "aes-eagle-beetle",
          "text": "The tiny beetle climbs the high rock where the proud eagle has built her nest."
        },
        {
          "kind": "text",
          "text": "The beetle followed the eagle to her nest on the high rock. While she was away, he rolled her eggs out, one by one. The little beetle was slow, but he never stopped, and he never forgot. The eagle built again on a higher crag, and again the little beetle climbed. Not one egg was left for the high nest. Three times the nest was emptied, and the eagle could find no place safe from him."
        },
        {
          "kind": "text",
          "text": "At last the eagle flew to Jupiter and laid her eggs in his lap, where nothing could reach them. But the beetle knew a way too. He rolled a little ball of dust right into Jupiter’s lap, and the god sprang up in surprise. The eggs rolled off and were lost. The eagle wept, and the beetle went home to his log. And the hare was well avenged, though he was never seen again."
        },
        {
          "kind": "note",
          "text": "Moral: Never look down on the small. Even the weakest can stand up for a friend.",
          "art": "lamp-hint"
        }
      ]
    }
  ],
  "rights": {
    "workTitle": "Aesop’s Fables",
    "author": "Aesop",
    "authorDeathYear": -564,
    "jurisdiction": "EU",
    "basis": "pd-70",
    "sourceUrl": "https://www.gutenberg.org/ebooks/28",
    "note": "Aesop, a Greek storyteller, is said to have died about 564 BCE; his fables have been told for over 2,500 years and are public domain everywhere (pd-70). Retold for young children in simple English from Project Gutenberg eBook #28 (tr. George Fyler Townsend)."
  }
}
