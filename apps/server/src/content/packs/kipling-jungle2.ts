import type { PackBook } from '../types'

/**
 * The Second Jungle Book — four Mowgli stories retold for young English readers.
 * Text: Project Gutenberg eBook #266 (Rudyard Kipling, 1895). Public domain
 * worldwide (Kipling died 1936; 70y pma expired). Plot follows the original:
 * Mowgli's adventures after he leaves the wolf pack — driving in the herd,
 * the cobra's treasure, the wild dogs, and his spring running back to men.
 * Wording simplified into short sentences for children aged 6-8.
 */
export const jungleBook2: PackBook = {
  id: 'kipling-jungle2',
  title: 'The Second Jungle Book',
  author: 'Rudyard Kipling',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'Mowgli, the boy of the Seeonee wolves, is growing tall and strong. With Baloo the bear and Bagheera the panther beside him, he faces his last great trials in the jungle — and finds the road that leads back to his own people.',
  coverArt: 'jungle2-council',
  coverArtPrompt: 'a boy in his teens with long hair standing on a flat moonlit rock beside a sleeping grey rock-python, a black panther and a brown bear seated like guardians below, tall silver grass and dark jungle trees under a huge warm moon, storybook painting',
  coverFrom: '#1B5E20',
  coverTo: '#FFD54F',
  source: 'The Second Jungle Book (Rudyard Kipling, 1895), Project Gutenberg eBook #266, public domain (Kipling d. 1936)',
  chapters: [
    {
      title: 'Chapter 1 · Letting In the Jungle',
      art: 'jungle2-village-herd',
      artPrompt: 'a boy with long hair standing tall and calm before a herd of stampeding water buffalo in a cloud of golden dust, a small village of clay huts behind them, a black panther leaping on a bamboo fence, warm dusty afternoon light',
      blocks: [
        {
          kind: 'text',
          text: 'The men of the village had been unkind to Mowgli and to his wolf-family. Mowgli was angry, and anger can make even a good boy think of unkind things. But he did not wish to hurt anyone. He thought and thought, and then he had a plan that would frighten the village without harming a single person.',
        },
        {
          kind: 'image',
          art: 'jungle2-village-herd',
          text: 'Mowgli calls the herd of buffalo, and the ground begins to tremble.',
        },
        {
          kind: 'text',
          text: '"Hathi," he called to the great old elephant, "will you help me?" Hathi had his own old reason to distrust men, and he came with his three sons. Together, very quietly, they pushed down part of the village wall by night.',
        },
        {
          kind: 'note',
          text: 'New word: herd — a big family of animals that travels together. Mowgli has looked after a herd of buffalo all season, so they know his voice and trust him.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'In the morning Mowgli stood on the rocks above the fields and called the herd. The buffalo came like a river of horns and hooves, streaming down the lanes and through the broken wall, and the frightened villagers ran for safety to the far jungle edge. No one was hurt; the animals flowed around the huts and out the other side.',
        },
        {
          kind: 'text',
          text: 'The trampled walls sagged and the bamboo roofs came softly down, and the vines of the jungle began, little by little, to creep in. "The jungle will take this place," said Bagheera, "and men will find better villages, and be kinder there." Mowgli looked at the wreck of the village and felt the anger go out of him like wind from a cave. His work was done, and he turned back to the free jungle.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The King\'s Ankus',
      art: 'jungle2-white-hood',
      artPrompt: 'a lost city of white stone arches half swallowed by creepers, inside a treasure chamber glowing with gold plates and coins, a boy holding a bejewelled elephant-goad, a huge old cobra with pale hood watching from a heap of gold, shafts of green jungle light from a broken roof',
      blocks: [
        {
          kind: 'text',
          text: 'Deep in the jungle stood the Cold Lairs, a lost city older than any memory, where monkeys used to play. Mowgli and Kaa the rock-python found a stone door in the ground, and beneath it lay a hall full of gold — plates and coins and kings\' treasures, sleeping in the dark for hundreds of years.',
        },
        {
          kind: 'image',
          art: 'jungle2-white-hood',
          text: 'The hidden treasure hall, watched over by the White Hood.',
        },
        {
          kind: 'text',
          text: 'A huge old cobra lay coiled on the gold. She was called the White Hood, and she had guarded the treasure so long that her poison had dried away. "This is death," she hissed. "Men have died for this gold, and it has brought them no good."',
        },
        {
          kind: 'note',
          text: 'New word: ankus — an elephant-driver\'s hooked staff, trimmed with jewels like a king\'s toy. In this story, treasure is only heavy metal: it cannot be eaten, played with, or shared.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Mowgli took only one small thing: a bejewelled ankus, bright as a star. He thought it would make a fine toy. But the ankus was unlucky — men saw it shining and reached for it, and by morning a man of the jungle villages lay still beside it, and Mowgli saw that the cobra had spoken true.',
        },
        {
          kind: 'text',
          text: 'So Mowgli carried the ankus back to the Cold Lairs and laid it on the heap of gold. "Take it back," he told the White Hood. "Your watch is almost over, but this treasure shall kill no one more today." And he came away lighter of heart than he had come, for he had nothing — and nothing, he found, weighs nothing at all.',
        },
      ],
    },
    {
      title: 'Chapter 3 · Red Dog',
      art: 'jungle2-red-dogs',
      artPrompt: 'a pack of tawny wild dogs swarming along a rocky river bank under a lowering storm sky, a boy standing calm on a boulder above whirling water, bees swarming in a golden cloud from a cliff-side hive, a black panther waiting in the green shadows, dramatic but storybook-soft light',
      blocks: [
        {
          kind: 'text',
          text: 'One day a stranger came up the dry bed of the Waingunga: Won-tolla the lone wolf, bleeding but standing proud. "The Red Dogs are coming," he warned the pack. "Dholes, from the south — a hundred wild dogs that sweep the jungle like a red flood. They kill for the sake of killing."',
        },
        {
          kind: 'image',
          art: 'jungle2-red-dogs',
          text: 'The red flood of wild dogs pouring along the river bank.',
        },
        {
          kind: 'text',
          text: 'The wolves looked at Mowgli. He was young, but the pack trusted him. "This is our jungle," he said. "We will meet them at the little ravine where the wild bees hang their hive." So the wolves sent the mothers and cubs safe away, and took their places along the cliffs, quiet as stones.',
        },
        {
          kind: 'note',
          text: 'New word: ravine — a deep, narrow valley between hills. Mowgli does not fight the whole flood of dogs at once — he picks the one place where a clever plan can save the pack.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Mowgli ran before the dogs and tickled the great bees\' hive with a stone, and came away laughing with the golden cloud of angry bees behind him. The wild dogs poured into the ravine and the bees fell on them, stinging, and above them on the rocks the wolf pack waited, fresh and strong.',
        },
        {
          kind: 'text',
          text: 'Then Mowgli led the tired, stung dogs down to the river, where the current runs fast over the falls. The river tumbled the red flood about and swept most of them far away, and the few that crawled ashore were so weary that they turned south and never came back. "The pack is safe," said Akela, "and we owe it to a man-cub who thinks before he strikes."',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Spring Running',
      art: 'jungle2-spring-running',
      artPrompt: 'a tall boy with long dark hair running alone along a mossy jungle path at evening, spring flowers opening along the verges, moths in the beam of low golden sunlight, a black panther and a brown bear watching him from a distance with gentle eyes, tender warm light',
      blocks: [
        {
          kind: 'text',
          text: 'Spring came to the jungle, and the sap ran in the trees, and something new ran in Mowgli too. His shoulders were broad now, and his hands were man\'s hands, and when the season called, his feet carried him running — up hill and down valley, all day, for the pure joy of running.',
        },
        {
          kind: 'image',
          art: 'jungle2-spring-running',
          text: 'The spring running, along the mossy paths, alone and full of strange feelings.',
        },
        {
          kind: 'text',
          text: 'The animals were busy with their spring business and did not trouble him, and Mowgli found that a strange thing had happened: he felt lonely. The jungle that had always been enough felt suddenly too quiet, and something inside him leaned toward the lights of men\'s villages far below in the plains.',
        },
        {
          kind: 'note',
          text: 'Growing up can feel like this: big feelings with no name yet, and a pull toward new places. Baloo the bear says it is the "spring running" — the time when everyone grows, and it passes, and it is not sad, only new.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Bagheera walked beside him in the shadows. "Little brother," said the panther gently, "men have their own pack laws, and they are not ours — but a man should live among men." Mowgli was quiet a long time. "I had not thought to leave," he said. "And now, when I run toward the villages, my feet are not sorry."',
        },
        {
          kind: 'text',
          text: 'So on a soft spring evening Mowgli came down the last slope, and the smell of woodsmoke rose to meet him, and a girl by a cattle-gate smiled at him and wished him good evening in the tongue of men. The Jungle People watched him go from the edge of the grass. He looked back once at the dark green wall of his old home, and then he walked on toward the village lights, and his heart was glad.',
        },
      ],
    },
    {
      title: 'Chapter 5 · How Fear Came',
      art: 'jungle2-peace-pool',
      artPrompt: 'a shrinking jungle pool under a pale dry sky crowded with drinking animals of every kind — deer, buffalo, boar, a tiger sitting apart in the shadows, a great grey elephant standing tall and telling a story, cracked earth and grey leaves',
      blocks: [
        {
          kind: 'text',
          text: 'There came a year when the rain did not fall. The leaves hung grey, the pools turned to mud, and at last the great river shrank to one quiet pool. All the Jungle People came there to drink — deer and boar, buffalo and wild dogs, bear and tiger — for there is a law older than any tooth: at the Peace Pool, no one may kill.',
        },
        {
          kind: 'image',
          art: 'jungle2-peace-pool',
          text: 'All the Jungle People drink together at the Peace Pool in the year of drought.',
        },
        {
          kind: 'note',
          text: 'New word: drought — a long, long time with no rain.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Night after night they waited together, thin and quiet. And the oldest of them all, Hathi the great grey elephant, told them how fear first came into the jungle. "In the beginning," he said, "Tha the First of the Elephants made the jungle green and full, and there was no hunger and no fear, for no beast ate another. Then one beast, in a dark hour, broke the peace and took a life — and from that killing came hunger, and from hunger came fear, and every creature has carried fear ever since."',
        },
        {
          kind: 'text',
          text: '"And the one who killed first?" they asked. "He wears the mark of it still," said Hathi, "and he walks alone." The Tiger sat apart in the shadow and said nothing. "So remember," said Hathi, "whoever keeps the peace at the pool keeps the jungle kind; and whoever breaks it lets the fear loose again." And the water stayed quiet, and every beast drank without fear till morning.',
        },
      ],
    },
    {
      title: 'Chapter 6 · The Miracle of Purun Bhagat',
      art: 'jungle2-bhagat',
      artPrompt: 'a gentle holy man in a simple cotton cloth sitting by a small fire outside a tiny wooden shrine in pine-clad mountains, a deer with great antlers and a shaggy old bear and two jackals resting trustingly around him, evening light',
      blocks: [
        {
          kind: 'text',
          text: 'In a great city there lived a wise man called Sir Purun Dass. He was a prime minister, with fine houses and honours and servants. But one day he took a staff and a wooden bowl, put on a simple cotton cloth, and walked out of his palace gate for ever. "I have done with riches," he said. He became Purun Bhagat, a holy man, and lived in a little shrine of wood and stone in the pine forests of the high hills.',
        },
        {
          kind: 'image',
          art: 'jungle2-bhagat',
          text: 'Purun Bhagat shares his evening fire with his forest friends.',
        },
        {
          kind: 'note',
          text: 'New word: shrine — a small, quiet holy place in the woods.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'There he sat still, day after day. And one by one the wild things came to him: a fine deer with great antlers, a shaggy old bear, a family of jackals, and the monkeys of the pines. They found that no hand was ever lifted against them there, so they lay by his fire and begged from his bowl, and he called them his people.',
        },
        {
          kind: 'text',
          text: 'One night the mountain muttered and groaned. The deer tugged at his blanket and the bear clawed at the door, and Purun Bhagat understood. "The hill above us is going to fall!" He woke the sleeping village below with cries of warning, and the people ran out into the storm — and in the night the whole hillside came down and crushed the little shrine to splinters. Not one villager was lost.',
        },
        {
          kind: 'text',
          text: '"It was a miracle!" they cried, and they built him a new shrine on safer ground. But Purun Bhagat only smiled, and walked on alone into the farther hills with his staff and his bowl — for he had learned that when a man sits quietly, the wild things will tell him everything they know.',
        },
      ],
    },
    {
      title: 'Chapter 7 · The White Seal',
      art: 'jungle2-white-seal',
      artPrompt: 'a snowy-white seal pup swimming through green-blue sea water between rocky islands with white surf and wheeling gulls, distant fog banks, sunlight sparkling on the waves',
      blocks: [
        {
          kind: 'text',
          text: 'On a beach in the far cold sea, where the waves roll in white foam, the sea seals gather every year. And on that beach, one spring, a seal pup was born as white as fresh snow. His name was Kotick, and there had been no white seal for ten thousand years.',
        },
        {
          kind: 'image',
          art: 'jungle2-white-seal',
          text: 'Kotick swims from island to island, looking for a beach with no men.',
        },
        {
          kind: 'note',
          text: 'New word: pup — a baby seal.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Kotick grew strong and quick, and one day he saw something terrible: men coming down the beach with long clubs, driving the young seals away. The old seals only shrugged. "It has always been so." "Then it need not always be so," said Kotick. And he set off round all the seas to find a beach where no man ever came.',
        },
        {
          kind: 'text',
          text: 'He swam for years — past islands of sea-lions and turtles, through fogs and drifting ice. And at last, guided by a wise old Sea Cow, he found a hidden beach behind green islands, with a warm lagoon, and soft grass, and no path for any boat, and no man within a thousand miles.',
        },
        {
          kind: 'text',
          text: 'Kotick swam home and told the young seals, and the next spring he led them there by thousands. And no man has ever found that beach to this day. There the white seal dances in the foam with all his people, safe and free.',
        },
      ],
    },
    {
      title: 'Chapter 8 · Quiquern',
      art: 'jungle2-quiquern',
      artPrompt: 'a boy in fur clothes and a sled dog following a tall strange two-headed shape striding over moonlit sea-ice, jagged ice ridges and drifting snow, green northern lights in a dark sky',
      blocks: [
        {
          kind: 'text',
          text: 'Far, far to the north, where the sea freezes and the sun does not rise for months, a boy named Kotuko lived with his people through the long white winter. That year the seals stayed away, and the dogs howled with hunger, and the old people told tales of Quiquern, a giant spirit with two heads, who walks the ice in the starving time.',
        },
        {
          kind: 'image',
          art: 'jungle2-quiquern',
          text: 'Kotuko and his dog follow the strange two-headed shape across the ice.',
        },
        {
          kind: 'note',
          text: 'New word: spirit — a strange shape out of old tales, that people say walks in wild places.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'At last Kotuko’s own dogs were let loose to find food for themselves, for there was nothing left to feed them. And one evening, out on the frozen sea, Kotuko saw it: a tall two-headed shape, striding over the ice! He called his strongest dog, and together they followed it — over the rough ice and the snow-drifts, all night long.',
        },
        {
          kind: 'text',
          text: 'In the grey morning light they came up close — and Quiquern was no spirit at all! It was two lost dogs, thin as shadows, walking one behind the other, so close that from far away they looked like one strange creature. The dogs were glad to be caught, and glad of a share of the little food there was.',
        },
        {
          kind: 'text',
          text: 'Then the two lost dogs lifted their noses to the wind and trotted inland, and Kotuko followed, and beyond a ridge of sea-ice they found a great herd of deer feeding on a strip of spring grass. Kotuko ran home with the news, and the hunters came with their spears, and the village had food and hope again. And no one ever feared Quiquern any more — for help had come, after all, on four legs.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Second Jungle Book',
    author: 'Rudyard Kipling',
    authorDeathYear: 1936,
    jurisdiction: 'EU',
    basis: 'pd-70',
    sourceUrl: 'https://www.gutenberg.org/ebooks/266',
    note: 'Published 1895; public domain worldwide (Kipling d. 1936, 70y pma expired). Plot follows Project Gutenberg eBook #266; wording simplified into short sentences for young English readers.',
  },
}
