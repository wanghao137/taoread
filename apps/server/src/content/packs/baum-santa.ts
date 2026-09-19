import type { PackBook } from '../types'

/**
 * The Life and Adventures of Santa Claus — L. Frank Baum (1856–1919),
 * first published 1902. Retold for young readers in six chapters: the baby
 * found in the Forest of Burzee, the boy who asks about the world beyond,
 * the first wooden toys, the gifts that travel by night, the mischief of the
 * Awgwas, and the gift of immortality granted to the kindest man in the world.
 * Source: The Life and Adventures of Santa Claus (L. Frank Baum, 1902),
 * public domain in the US (published pre-1929).
 */
export const santaClaus: PackBook = {
  id: 'baum-santa',
  title: 'The Life and Adventures of Santa Claus',
  author: 'L. Frank Baum',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro:
    'Deep in the Forest of Burzee, a wood nymph finds a lost baby in the snow and names him Claus. When he grows up and sees that mortal children have no one to bring them joy, he begins to make toys — and so the story of Santa Claus begins, from the first wooden cat to the sleigh that flies every Christmas Eve.',
  coverArt: 'santa-forest',
  coverArtPrompt:
    'A young toymaker with kind eyes and a lantern walks through a vast enchanted forest of enormous mossy trees at dusk, carrying a satchel of carved wooden toys; fireflies and tiny glowing fairies drift between the ferns, and a white-bearded forest king watches from afar. Emerald depths with warm lantern gold, mysterious but friendly, classic fairy-tale illustration.',
  coverFrom: '#5C6BC0',
  coverTo: '#FFCCBC',
  source: 'The Life and Adventures of Santa Claus (L. Frank Baum, 1902), public domain',
  chapters: [
    {
      title: 'Chapter 1 · A Baby in Burzee',
      art: 'santa-baby',
      artPrompt:
        'Moonlight in an ancient enchanted forest: a graceful wood nymph in a gown of leaf-green kneels in a ferny glade, lifting a bundled baby found asleep on the moss, while soft round fairies and a tall white-bearded forest king lean in gently around her. Enormous glowing mushrooms and fireflies, silver-green light with warm highlights, tender fairy-tale illustration.',
      blocks: [
        {
          kind: 'text',
          text: 'Far, far away lies the Forest of Burzee, where the trees are older than the mountains and the fairies keep the world kind.',
        },
        {
          kind: 'text',
          text: 'One moonlit night, a wood nymph named Necile heard a tiny cry. In the moss, all alone, lay a baby.',
        },
        {
          kind: 'text',
          text: 'Necile lifted him up. "I will keep him," she said, and her heart said yes before her words were done.',
        },
        {
          kind: 'image',
          art: 'santa-baby',
          text: 'Necile finds the baby in the moonlit ferns of Burzee.',
        },
        {
          kind: 'note',
          text: 'New word: nymph — a gentle fairy of the woods, in old stories.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The forest king gave the boy a name: Claus, which means "little one." And all Burzee loved him.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Boy Who Asked About the World',
      art: 'santa-boy',
      artPrompt:
        'At the forest edge at sunrise, a tall white-bearded forest king in a cloak of bark and lichen points with a great staff toward a distant valley of farms and chimneys, while a curious boy in a rustic tunic looks out wide-eyed. Mist pools in the valley, first light gilding rooftops. Hopeful rose-gold dawn palette, expansive storybook view.',
      blocks: [
        {
          kind: 'text',
          text: 'Claus grew up happy in Burzee, playing with fairies and talking to the beasts. But one day he asked, "What lies beyond the forest?"',
        },
        {
          kind: 'text',
          text: '"Mortals live there," said Ak, the Master Woodsman. "Come and see."',
        },
        {
          kind: 'text',
          text: 'They walked to the edge of Burzee, and Ak showed Claus the world of men: the farms, the towns, and the children.',
        },
        {
          kind: 'image',
          art: 'santa-boy',
          text: 'Ak shows Claus the world beyond the forest, full of children.',
        },
        {
          kind: 'note',
          text: 'New word: mortal — a person who lives and grows, unlike the fairies.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Claus saw that the children worked hard and had nothing to play with, and no one had time to make them glad. "Then I will be the one," said Claus quietly. And he left Burzee to live among them.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The First Toys',
      art: 'santa-toys',
      artPrompt:
        'A cozy log cabin workshop at evening: a kind young man whittles a little wooden cat with a pocketknife, shavings curling around his bench, shelves of carved animals and painted wooden soldiers behind him; a child’s mitten hangs by the hearth. Firelight and candle glow, honey-warm wood tones, loving detailed storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'Claus built a little house in the Laughing Valley, and he thought and thought about the children.',
        },
        {
          kind: 'text',
          text: 'One evening he whittled a piece of wood, and the wood became a little cat with a curled tail. "Why," he laughed, "this is a toy!"',
        },
        {
          kind: 'text',
          text: 'He carried it through the snow to a lonely farmhouse, and put it in the hand of a little boy named Weekum. The boy’s face lit up like a lamp.',
        },
        {
          kind: 'image',
          art: 'santa-toys',
          text: 'Claus gives the first toy, a wooden cat, to a wondering boy.',
        },
        {
          kind: 'note',
          text: 'New word: whittle — to carve wood slowly with a small knife.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Claus walked home through the starlight, happier than the boy. For he had found his life’s work: making children glad.',
        },
      ],
    },
    {
      title: 'Chapter 4 · Gifts by Night',
      art: 'santa-night',
      artPrompt:
        'A snowy village under a vast starry sky: a broad cheerful toymaker in a fur-trimmed coat loads a sledge with sacks of toys beside two patient deer, stockings hanging on every mantel shining warm through cottage windows; his shadow stretches long across blue moonlit snow. Deep indigo night with rose and gold accents, magical serene storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'Soon Claus had more toys than he could carry in his arms. So he made a sledge, and the friendly deer of the forest offered to pull it.',
        },
        {
          kind: 'text',
          text: '"Children sleep at night," he thought. "I will travel when the stars are out."',
        },
        {
          kind: 'text',
          text: 'Down the chimneys and through the doors he slipped, filling stockings and setting toys beside sleeping children. In the morning there was wonder everywhere.',
        },
        {
          kind: 'image',
          art: 'santa-night',
          text: 'The sledge waits under the stars, sacks full of toys.',
        },
        {
          kind: 'note',
          text: 'Ask your child: why do you think Claus chose nighttime for his gifts?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The children made a name for their kind friend: Santa Claus. And Santa Claus answered every letter, for he read children’s hearts like open books.',
        },
      ],
    },
    {
      title: 'Chapter 5 · The Mischief Makers',
      art: 'santa-trick',
      artPrompt:
        'A moonlit storeroom where sacks of toys lie toppled and scattered, and a swarm of small goblin-like sprites with pointed ears tumble and scurry in the shadows clutching wooden horses and dolls; through the doorway, a line of helpers — a fairy, a gnome, a ryl with a lantern — arrive with lamps raised. Mischief but no menace, deep violet-blue light with warm lamp beams, playful storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'Not everyone in the world loved children. The Awgwas, a band of sneaky spirits, hated joy of any kind.',
        },
        {
          kind: 'text',
          text: 'One night they crept into the storeroom and hid the toys — every single one — and Santa Claus sat sad by his empty sledge.',
        },
        {
          kind: 'text',
          text: 'But kindness has many friends. The fairies of Burzee flew to tell Ak, and the gnomes and knooks and ryls came trooping with their lanterns.',
        },
        {
          kind: 'image',
          art: 'santa-trick',
          text: 'The helpers of Burzee arrive with lanterns to find the lost toys.',
        },
        {
          kind: 'note',
          text: 'Ask your child: how did Santa’s friends help him? Who helps you?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'They searched root and burrow until every toy was found, and the Awgwas ran away where no lantern shines. And that year, no stocking was empty.',
        },
      ],
    },
    {
      title: 'Chapter 6 · The Gift Given Back',
      art: 'santa-council',
      artPrompt:
        'A great twilight council in the heart of Burzee: immortal figures gathered in a moonlit ring — a tall forest king with a staff, radiant fairies, gentle woodland sprites — before them stands a white-bearded toymaker in a fur coat, lantern in hand, while a mantle of soft light settles over his shoulders like falling snow. Cathedral of ancient trees overhead, silver-gold light, solemn and tender fairy-tale illustration.',
      blocks: [
        {
          kind: 'text',
          text: 'The years went by, and Santa Claus grew old and white-haired, still making toys, still filling stockings, still keeping every promise.',
        },
        {
          kind: 'text',
          text: 'The immortals of Burzee watched him and said, "The world must never lose this friend of children."',
        },
        {
          kind: 'text',
          text: 'So they gathered in the heart of the forest and placed upon his shoulders the Mantle of Immortality, so that he would live as long as children need him.',
        },
        {
          kind: 'image',
          art: 'santa-council',
          text: 'The immortals give Santa the Mantle of Immortality.',
        },
        {
          kind: 'note',
          text: 'New word: immortal — living for ever and ever.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"You gave all your gifts away," said Ak, "and see — the world has given them back to you, a hundredfold." And Santa Claus smiled, for it was true. And it is true still, every Christmas Eve.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Life and Adventures of Santa Claus',
    author: 'L. Frank Baum',
    authorDeathYear: 1919,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Retold for young readers. Published 1902; US public domain (pre-1929) and PD in the EU (Baum d. 1919, 70y pma expired 1990).',
  },
}
