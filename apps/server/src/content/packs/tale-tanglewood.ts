import type { PackBook } from '../types'

/**
 * Tanglewood Tales — four Greek myths as retold by Nathaniel Hawthorne (1853).
 * Text: Nathaniel Hawthorne, 1853. US public domain (published pre-1929) and
 * worldwide (Hawthorne d. 1864, 70y pma expired). Plots follow Hawthorne's
 * retellings; violence and grim detail are softened for readers aged 9-12.
 */
export const tanglewood: PackBook = {
  id: 'tale-tanglewood',
  title: 'Tanglewood Tales',
  author: 'Nathaniel Hawthorne',
  lang: 'en',
  category: 'tale',
  ageStage: '9-12',
  intro: 'Four great Greek adventures, retold for young readers: brave Theseus in the Labyrinth, Cadmus and the dragon’s teeth, Hercules and the golden apples, and Jason’s quest for the Golden Fleece — heroes, puzzles and marvelous helpers at every turn.',
  coverArt: 'tangle-labyrinth',
  coverArtPrompt: 'a vast maze of grey stone walls under bright Mediterranean sun, a young hero holding a ball of golden thread walking its winding corridors, a golden-crowned girl watching from a marble balcony above, olive trees and blue sea beyond the maze walls, warm heroic afternoon light',
  coverFrom: '#8D6E63',
  coverTo: '#FFE082',
  source: 'Tanglewood Tales (Nathaniel Hawthorne, 1853), public domain',
  chapters: [
    {
      title: 'Chapter 1 · The Minotaur',
      art: 'tangle-labyrinth',
      artPrompt: 'winding grey stone corridors of a great labyrinth lit by flickering torches, a strong young hero following a golden thread along the floor with a sword at his belt, shadows of pillars crossing the path, one shaft of dusty sunlight from a high shaft above',
      blocks: [
        {
          kind: 'text',
          text: 'Far across the sea lay the island of Crete, where King Minos kept a monster called the Minotaur — a creature with the body of a man and the head of a bull — shut inside a Labyrinth, a building of so many winding corridors that no one who entered could ever find the way out. Every nine years the city of Athens had to send seven young men and seven young women across the sea, and none of them ever came home.',
        },
        {
          kind: 'text',
          text: 'Now the king of Athens had a son named Theseus, strong and quick and kind-hearted. When the sad day of choosing came, Theseus stepped forward. "Father," he said, "let me go among them. I will find a way to end this tribute, or I will not come back myself." The old king wept, but he let his son sail, with black sails going out and white sails promised for the return.',
        },
        {
          kind: 'text',
          text: 'In Crete, the princess Ariadne saw the young hero and pitied him, for she knew the Labyrinth better than anyone. "Take this ball of thread," she whispered. "Tie one end at the door, and let it unroll as you go. The thread will remember the way, even when everything else forgets."',
        },
        {
          kind: 'image',
          art: 'tangle-labyrinth',
          text: 'Ariadne’s golden thread, unrolling down the long dark corridors of the Labyrinth.',
        },
        {
          kind: 'text',
          text: 'Deep in the winding ways the Minotaur came bellowing to meet him. Theseus stood his ground and fought bravely until the monster fell, and then he did a wiser thing than fighting: he followed the thread back, turn by turn, until sunlight poured in at the door. He freed the other captives, set a white sail at the mast, and steered for home over a bright sea — where his father, watching from a cliff, saw the white sail and knew his son was safe.',
        },
        {
          kind: 'note',
          text: 'New word: Labyrinth — a building of passages so twisted that no one can find the way out. The thread mattered more than the sword: it was knowing the way home that saved everyone.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Dragon’s Teeth',
      art: 'tangle-dragonteeth',
      artPrompt: 'a sunlit field outside an ancient walled city, a young prince in a fine cloak sowing dragon teeth from a bronze helmet like a farmer sowing wheat, rows of armed men springing up from the furrows with bronze helmets glinting, green hills and olive groves beyond',
      blocks: [
        {
          kind: 'text',
          text: 'There was once a prince of Phoenicia named Cadmus, whose sister was carried away over the sea, and his father sent him to find her or never come home. Cadmus searched long and asked counsel of the oracle at Delphi, who told him something odd: "Follow the cow that walks ahead of you, and build your city where she lies down."',
        },
        {
          kind: 'text',
          text: 'So Cadmus followed a slow, thoughtful cow through the hills until she lay down in a green valley, and there he resolved to build his city. But a great dragon guarded the spring that watered the valley, and would let no one drink. Cadmus overcame the dragon, and the goddess Athena appeared to him and showed him a farmer’s trick with a soldier’s prize: plough the field, and sow the dragon’s teeth like seed.',
        },
        {
          kind: 'text',
          text: 'The moment the teeth touched the earth, armed men sprang up out of the furrows, bristling like a crop of bronze. "Throw a stone among them," said Athena, and Cadmus did. Each soldier thought his neighbour had thrown it, and they fell to quarrelling so hotly that soon only five were left standing — and those five wisely decided that fighting was poor farming, and put down their arms.',
        },
        {
          kind: 'image',
          art: 'tangle-dragonteeth',
          text: 'Armed men springing from the furrows, like a crop that argued with itself.',
        },
        {
          kind: 'text',
          text: 'Those five men joined Cadmus, and with them he built his city and taught its people letters — the alphabet that would travel from his country to nearly every shore in the world. His sister was found at last, and the city he raised where the cow lay down grew famous, and its name was Thebes.',
        },
        {
          kind: 'note',
          text: 'Talk together: the strangest harvest in any story — teeth that grow into soldiers, who then stop fighting and help build a city. Ask your child: what would you plant in a magic field?',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Three Golden Apples',
      art: 'tangle-apples',
      artPrompt: 'a mighty hero kneeling with the whole sky balanced on his shoulders as a calm giant of a man stoops to pick three shining golden apples from a tree in a twilight garden, the tree hung with orbs of gold light, deep blue evening sky full of early stars',
      blocks: [
        {
          kind: 'text',
          text: 'Hercules was the strongest man in the world, and a king who feared him sent him on the hardest errand he could invent: to fetch three golden apples from a garden at the very edge of the world, where the tree was guarded by a dragon that never slept. Hercules shouldered his club and walked for months, asking the way of everyone he met, and helping everyone he met, for strength was only half of what he carried.',
        },
        {
          kind: 'text',
          text: 'At the edge of the world he came to the garden, and there he found the problem no club could solve: the tree stood inside where only Atlas could go. Atlas was a giant who held the sky upon his shoulders, and he could not pick apples while the sky was on his back.',
        },
        {
          kind: 'text',
          text: '"Give me the sky a moment," said Hercules politely, "and I will pick your apples for you." Atlas handed over the whole weight of heaven, and it settled on the hero’s shoulders like a mountain. Atlas strolled into the garden, picked the three apples — walking past the dozing dragon without a whisper — and came back out to find Hercules standing steady, knees bent, sky held.',
        },
        {
          kind: 'image',
          art: 'tangle-apples',
          text: 'The strongest man in the world, holding the sky and keeping his good humour.',
        },
        {
          kind: 'text',
          text: 'Now Atlas, feeling light for the first time in ages, thought he might simply walk away with his errand done by someone else. But Hercules only said, "Of course. Would you take the sky back for one moment, while I put a soft pad on my shoulders?" And the moment the giant took back the weight, the hero picked up his apples, bowed, and set off for home at a good pace — proof that cleverness can lift what strength alone cannot.',
        },
        {
          kind: 'note',
          text: 'Talk together: Hercules could not lift the sky forever, but he could think for one minute. Ask your child: name a time when a clever idea helped more than muscles.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Golden Fleece',
      art: 'tangle-fleece',
      artPrompt: 'a magnificent ram’s fleece of gleaming gold hanging from the branch of a great oak in a sacred grove at dawn, a dragon coiled asleep at its foot, a young hero reaching up to take it while a swift ship with a dragon prow waits on the river beyond, rose-gold morning light',
      blocks: [
        {
          kind: 'text',
          text: 'In the land of Thessaly there lived a young prince named Jason, whose kingdom had been taken by a jealous uncle. The uncle said he might have his throne back on one condition: he must sail to the far edge of the world and bring back the Golden Fleece, the shining hide of a wonder-ram, guarded in a sacred grove by a dragon that never slept.',
        },
        {
          kind: 'text',
          text: 'Jason had a ship built finer than any before it, the Argo, with a speaking beam in her prow, and he filled her with the bravest heroes of Greece — the Argonauts. They sailed past countries of wonders, rowing and singing, through storms and straits, until at last the Argo’s prow itself called out, "Land ahead!" and there it lay: Colchis, where the fleece hung in the grove.',
        },
        {
          kind: 'text',
          text: 'The king of that land set Jason impossible tasks before he might touch the fleece: to yoke two fire-breathing bulls and plough a field with them in a day. But the king’s daughter Medea was a wise enchantress, and she liked the brave young stranger. "Anoint yourself with this herb at dawn," she said, "and the fire cannot hurt you." Jason ploughed the field from end to end, with the bulls’ breath washing over him like a warm wind.',
        },
        {
          kind: 'image',
          art: 'tangle-fleece',
          text: 'The Golden Fleece in the sacred grove, with the sleepless dragon at its root.',
        },
        {
          kind: 'text',
          text: 'Then Medea gave him a bottle of sleepy herbs for the dragon. The dragon’s drowsy eyes closed — for even a creature that never sleeps cannot argue with true magic — and Jason lifted the Golden Fleece from the oak, and it blazed on his shoulders like a small sun. The Argonauts rowed for home with the dawn behind them, and when the Argo slid into her own harbour, the throne of Thessaly was waiting for her captain, and the fleece was hung where all could see it shine.',
        },
        {
          kind: 'note',
          text: 'New word: Argonaut — one of the heroes who sailed with Jason on the ship Argo. The voyage took years, and every hero aboard became famous for it.',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Tanglewood Tales',
    author: 'Nathaniel Hawthorne',
    authorDeathYear: 1864,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Four Greek myths as retold in Hawthorne’s public-domain collection (1853); violence and grim detail softened for young readers. US public domain (pre-1929) and worldwide (Hawthorne d. 1864, 70y pma expired).',
  },
}
