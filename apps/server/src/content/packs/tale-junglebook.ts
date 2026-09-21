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
    {
      title: 'Chapter 5 · Tiger! Tiger!',
      art: 'jungle-village',
      artPrompt: 'a boy with long hair standing calmly at the head of a herd of water buffalo at a village gate in golden morning light, clay huts and green rice fields behind, a dark ravine in the far hills',
      blocks: [
        {
          kind: 'text',
          text: 'Mowgli grew tall and strong, but the pack could not agree about him, and in the end he went to live among men. In a village by the fields, a kind woman named Messua took him into her house. "You are my own son, lost long ago," she said, and Mowgli slept under a roof for the first time since he was a baby.',
        },
        {
          kind: 'image',
          art: 'jungle-village',
          text: 'Mowgli drives the buffalo out to the fields each morning.',
        },
        {
          kind: 'note',
          text: 'New word: lame — walking badly because a leg is hurt. Shere Khan the tiger was old and lame.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Mowgli learned to speak like men, and the villagers gave him the buffalo herd to drive out to the grass. But he heard a tale: the lame old tiger, Shere Khan, had come back to the ravines by the village, hunting the cattle — and waiting for the man-cub.',
        },
        {
          kind: 'text',
          text: 'So Mowgli made a plan. He split the herd in two — the big bulls in one ravine, the cows and calves in another — and he stood at the mouth of the deep gorge where the tiger hid. When Shere Khan came padding out, Mowgli shouted, and the bulls rushed like a storm down the gorge, and the old tiger went under their hooves, and he did not rise again.',
        },
        {
          kind: 'text',
          text: '"My promise is kept," said Mowgli quietly, to the wolves who had come to watch. He said a kind goodbye to Messua, who wept and held him close. Then he ran back to the free jungle, and the tall grass closed behind him like a door.',
        },
      ],
    },
    {
      title: 'Chapter 6 · Rikki-Tikki-Tavi',
      art: 'jungle-mongoose',
      artPrompt: 'a small brave mongoose with a bottle-brush tail facing a huge spectacled cobra rearing up in a sunny garden of melon beds and flowers, a veranda house behind, dust rising',
      blocks: [
        {
          kind: 'text',
          text: 'A summer flood washed a little mongoose out of his burrow, and he was found half drowned on a garden path. The family dried him and fed him, and he lived under their house. His name was Rikki-tikki-tavi, and his motto was: run and find out.',
        },
        {
          kind: 'image',
          art: 'jungle-mongoose',
          text: 'Rikki-tikki faces the great cobra in the garden.',
        },
        {
          kind: 'note',
          text: 'New word: mongoose — a quick little hunter, famous for being too fast for a snake.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'In the garden lived two big cobras, Nag and his wife Nagaina, and they planned to drive every bird and beast away and fill the garden with their own babies. "The man and the boy must go," they hissed. Rikki-tikki heard them in the dark, and his tail grew bottle-brushy with anger.',
        },
        {
          kind: 'text',
          text: 'There was a great scuffle in the dark house that night, and when the lamp came, the big snake lay quite still, and never troubled the garden again. Then Rikki-tikki found Nagaina’s last egg in the melon bed and carried it out to the porch. Nagaina came rushing for it, and at the mouth of her hole she snatched it up and slid down into the dark — and Rikki-tikki, brave as a lion, went in after her.',
        },
        {
          kind: 'text',
          text: 'It was very dark down there. But when Rikki-tikki came out, his eyes were red as rubies, and he said: "The garden is safe now. She will never come back." And the birds sang in it all day long.',
        },
      ],
    },
    {
      title: 'Chapter 7 · Toomai of the Elephants',
      art: 'jungle-elephants',
      artPrompt: 'a great wild elephant with white tusks standing in a moonlit jungle clearing with a tiny boy on his neck, dozens of elephants of all sizes stamped in a great circle around them, silver grass and fireflies',
      blocks: [
        {
          kind: 'text',
          text: 'Little Toomai was the son of an elephant-driver, and he loved Kala Nag, the wise old elephant, better than anything in the world. He rode him down to the water, he fed him sugar-cane, and at night he slept between his big front feet.',
        },
        {
          kind: 'image',
          art: 'jungle-elephants',
          text: 'The elephants dance in the moonlit clearing, and Toomai watches from the leader’s neck.',
        },
        {
          kind: 'note',
          text: 'Fun word: mahout — the proper name for a man who rides and cares for an elephant.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'One day Little Toomai slipped away and followed the wild elephants into the hills, and the great white-tusked leader picked him up gently and set him on his own neck. That night, in a moonlit clearing, the elephants came from every side — wild ones and tame ones, big ones and babies — walking as softly as shadows. And all night long they stamped and stamped the ground together, round and round, till the earth was hard and smooth as a floor.',
        },
        {
          kind: 'text',
          text: 'Little Toomai sat still as a mouse, wide-eyed, and watched the elephants’ dance — the thing that no man had ever seen. In the morning he ran home and told what he had seen, and when the hunters found the great trampled circle in the hills, they cried: "Toomai of the Elephants!" And that was his name ever after.',
        },
      ],
    },
    {
      title: 'Chapter 8 · Her Majesty’s Servants',
      art: 'jungle-camp',
      artPrompt: 'a moonlit army camp of long white tents and gun carriages, a troop horse, a mule, a camel and a big elephant standing together talking quietly, a small boy listening from his blanket, lantern light',
      blocks: [
        {
          kind: 'text',
          text: 'One night a boy lay awake in a great camp of the army, where tents stood in long rows and the guns shone in the moonlight. All day there had been marching and trumpets and the thunder of guns. He could not sleep, so he listened — and the animals were talking!',
        },
        {
          kind: 'image',
          art: 'jungle-camp',
          text: 'The horse, the mule, the camel and the elephant talk in the moonlit camp.',
        },
        {
          kind: 'note',
          text: 'New word: parade — soldiers marching together, so that everyone can see how steady they are.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The troop-horse said, "When the guns go off, I stand steady, because my rider holds me and I hold myself." The mule said the noise of camp was nothing: "I have carried loads up mountain paths where the rocks come rolling down, and a mule who knows his work does not run." The camel, who had been frightened in the day, made up a silly song about it, and everyone laughed.',
        },
        {
          kind: 'text',
          text: 'Then the elephant spoke, and they all grew quiet. "I am the oldest of us all, and I remember the world before men. The guns are loud, but they cannot hurt us if we keep our heads and do our work."',
        },
        {
          kind: 'text',
          text: '"So that is the secret," thought the boy, as the moon went down. "Being brave is not about never being afraid — it is about standing steady and doing your job." And in the morning, when the trumpets blew, the horses and mules and camels and elephants marched out as steady as stones, and the boy saluted every one of them.',
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
