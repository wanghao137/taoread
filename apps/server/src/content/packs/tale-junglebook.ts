import type { PackBook } from '../types'

/**
 * The Jungle Book — four chapters retold for young English readers.
 * Text: Project Gutenberg eBook #236 (Rudyard Kipling, 1894). Public domain worldwide
 * (Kipling died 1936; 70y pma expired). Plot follows the Mowgli stories; wording
 * simplified into short sentences for children aged 6–8.
 */
export const jungleBook: PackBook = {
  id: 'jungle-book',
  title: 'The Jungle Book',
  author: 'Rudyard Kipling',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'A boy named Mowgli is raised by wolves in the deep jungle. With his friends Bagheera the panther and Baloo the bear, he faces Shere Khan the tiger and learns the Law of the Jungle.',
  coverArt: 'council-rock',
  coverArtPrompt: 'a boy in a red loincloth sitting cross-legged on a great flat rock surrounded by wolves, a black panther and a brown bear watching from the shadows, full moon over dark jungle trees',
  coverFrom: '#00695C',
  coverTo: '#80CBC4',
  source: 'Project Gutenberg eBook #236, public domain (Kipling d. 1936)',
  chapters: [
    {
      title: 'Chapter 1 · Mowgli’s Wolf Pack',
      art: 'council-rock',
      artPrompt: 'a moonlit flat rock above dark jungle, a small brown boy sitting among a circle of wolves, a black panther and a brown bear watching from the shadows',
      blocks: [
        {
          kind: 'text',
          text: 'Father Wolf and Mother Wolf lived in a cave on a hill above the Wainganga River. One night, a little man-cub crawled out of the jungle and right into the middle of the cave.',
        },
        {
          kind: 'image',
          art: 'council-rock',
          text: 'The Council Rock, where the wolves of the Seeonee pack meet by moonlight.',
        },
        {
          kind: 'text',
          text: 'Father Wolf carried the boy in his mouth to the Council Rock. "Look well, O Wolves!" he called. And the wolves looked at the small brown baby with his big trusting eyes.',
        },
        {
          kind: 'note',
          text: 'New word: man-cub — a human baby. Mowgli is a man-cub, and the wolves raise him as one of their own.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Then Shere Khan the lame tiger pushed forward. "The man-cub is mine," he growled. "Give him to me, or I will hunt here always!" But the pack would not give the boy up.',
        },
        {
          kind: 'text',
          text: 'Baloo the bear, the teacher of the Law, spoke for the boy. Bagheera the black panther bought the man-cub’s life with a fat, freshly killed bull. "Take him away," he said, "and teach him the Law of the Jungle."',
        },
        {
          kind: 'text',
          text: 'So Mowgli became a wolf of the Seeonee pack. He grew up with his brothers, and learned to jump and to climb, and the jungle was his home.',
        },
      ],
    },
    {
      title: 'Chapter 2 · Baloo and Bagheera',
      art: 'jungle-night',
      artPrompt: 'a big brown bear and a black panther sitting under tall jungle trees with a boy between them, fireflies and moonlight through the leaves',
      blocks: [
        {
          kind: 'text',
          text: 'When Mowgli was old enough to understand things, Baloo taught him the Law of the Jungle. He taught him the Wood and Water Laws, and the Master Word of the Jungle, which is known to the birds and the snakes.',
        },
        {
          kind: 'image',
          art: 'jungle-night',
          text: 'Baloo the bear teaching Mowgli under the tall jungle trees.',
        },
        {
          kind: 'text',
          text: '"We be of one blood, ye and I," said Mowgli, giving the Master Word. It kept him safe among strangers, for it meant: I am a friend of the jungle, and I belong here.',
        },
        {
          kind: 'note',
          text: 'New word: law — a rule that everyone must obey. The Law of the Jungle keeps peace between the hunting peoples.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Bagheera taught Mowgli to hunt, to move through the grass without a sound, and to climb the great trees. The panther was stern, but he loved the boy more than anything.',
        },
        {
          kind: 'text',
          text: 'One day Bagheera told Mowgli about the Red Flower, which is fire. "When you need it," he said, "you will find it in the huts of men. It is the one thing that every beast of the jungle fears." Mowgli listened, and remembered.',
        },
        {
          kind: 'text',
          text: 'In the evenings Mowgli would lie in the warm grass and listen to the night noises. But sometimes, far away, he heard the cough of Shere Khan, still waiting for his man-cub.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Cold Lairs',
      art: 'monkey-city',
      artPrompt: 'monkeys swinging over a ruined jungle city of broken stone walls and creeper-covered towers, a boy carried above the treetops, a kite circling the sky',
      blocks: [
        {
          kind: 'text',
          text: 'The Bandar-log, the monkey people, had no Law and no memory and no leaders. One day they saw Mowgli resting in the sun, and they thought it would be great fun to carry him off.',
        },
        {
          kind: 'image',
          art: 'monkey-city',
          text: 'The ruined city in the jungle, where the monkeys had their play.',
        },
        {
          kind: 'text',
          text: 'A whole crowd of monkeys swung down from the trees. They grabbed Mowgli by the arms and legs, and carried him up, up, up over the tree-tops, to the Cold Lairs, the lost city of old kings.',
        },
        {
          kind: 'note',
          text: 'New word: ruins — the broken walls and fallen towers of an old, empty city.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'As they passed over a stream, Mowgli cried out the Master Word: "We be of one blood, ye and I!" Chil the Kite heard him far below, and flew to tell Baloo and Bagheera where the monkeys had gone.',
        },
        {
          kind: 'text',
          text: 'Baloo and Bagheera came as fast as they could, and with them came Kaa the great python, who was very old and very wise and very hungry. At the ruined city, Kaa broke through the wall like a falling tree.',
        },
        {
          kind: 'text',
          text: 'The monkeys were terribly afraid of Kaa. They scattered into the ruins and the dark underground rooms, and Kaa and the two big hunters fought them till the stones were quiet. Mowgli ran to Baloo and hugged him tight. He was safe at last.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Red Dogs',
      art: 'red-dogs-river',
      artPrompt: 'a pack of red dogs surging through bamboo by a river, a boy and wolves fighting at the water’s edge, a huge rock hive with bees swarming above',
      blocks: [
        {
          kind: 'text',
          text: 'One year a great trouble came to the jungle. The dholes, the red hunting dogs of the Dekkan, swept through the forest in a huge pack. They killed everything that crossed their path.',
        },
        {
          kind: 'image',
          art: 'red-dogs',
          text: 'The pack of red dogs moving through the bamboo by the river.',
        },
        {
          kind: 'text',
          text: 'Mowgli went to tell the pack, and the wolves asked him for a plan. Mowgli said, "I will lead the dogs to the Bee Rocks, where the wild bees nest. If we fight among the rocks, the bees will fight too."',
        },
        {
          kind: 'note',
          text: 'New word: pack — a big group of hunting animals that run and hunt together.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Mowgli ran out alone to taunt the dholes, then led them over the river toward the Bee Rocks. "Run, Little Brother!" cried Kaa, watching from the water. And Mowgli ran as he had never run before.',
        },
        {
          kind: 'text',
          text: 'When the dholes climbed the rocks, the bees came out in angry clouds. In the confusion Mowgli and the wolves fought them at the river’s edge. One by one the red dogs fell, till none were left to carry the news home.',
        },
        {
          kind: 'text',
          text: 'But Akela, the old wolf who had led the pack, was hurt to death in the fight. "Akh, I die!" he said. Mowgli stayed with him to the last. When the jungle was quiet again, Mowgli knew that his time among the wolves was nearly over, and that one day he must go to the world of men.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Jungle Book',
    author: 'Rudyard Kipling',
    authorDeathYear: 1936,
    jurisdiction: 'EU',
    basis: 'pd-70',
    sourceUrl: 'https://www.gutenberg.org/ebooks/236',
    note: 'Published 1894; public domain worldwide (Kipling d. 1936, 70y pma expired). Mowgli-story plot follows Project Gutenberg eBook #236; wording simplified into short sentences for young English readers.',
  },
}
