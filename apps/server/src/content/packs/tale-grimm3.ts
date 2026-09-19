import type { PackBook } from '../types'

/**
 * Grimm's Fairy Tales, third selection (Jacob & Wilhelm Grimm, 19th century)
 * — four tales retold in simple English for readers aged 6–8: Snow-White and
 * Rose-Red (KHM 161), The Twelve Brothers (KHM 9), The Seven Ravens (KHM 25)
 * and The Singing Bone (KHM 28). The Brothers Grimm died in 1859 and 1863,
 * so these tales are public domain worldwide. None of the four duplicates
 * the library's first two Grimm collections.
 */
export const grimm3More: PackBook = {
  id: 'tale-grimm3',
  title: "Grimm's Fairy Tales III",
  author: 'Jacob & Wilhelm Grimm',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'Four more Grimm tales: a bear who is a prince under a spell, twelve brothers turned into ravens, a sister who walks to the end of the world to save seven brothers, and a singing bone that tells the truth.',
  coverArt: 'grimm3-roses',
  coverArtPrompt: 'two sisters, one with rose-red cheeks in red dress and one fair-haired in white-blue dress, standing in a garden doorway with a great tame bear sitting gently before them, rose bushes and birch trees around, snowy wood behind, warm hearthlight meeting cool snowlight, classic storybook illustration',
  coverFrom: '#283593',
  coverTo: '#E3F2FD',
  source: "Grimm's Fairy Tales (Kinder- und Hausmärchen, Jacob & Wilhelm Grimm, 19th century), worldwide public domain (d. 1859 / 1863)",
  chapters: [
    {
      title: 'Chapter 1 · Snow-White and Rose-Red',
      art: 'grimm3-bear',
      artPrompt: 'a big gentle brown bear sitting patiently at the hearth of a snug cottage kitchen while two young sisters in red and light-blue dresses serve him tea, roses in a window box, snowy wood visible through the window, warm firelight, cozy storybook illustration',
      blocks: [
        { kind: 'text', text: 'A poor widow lived in a little cottage by the wood. In her garden grew two rose bushes, one white and one red, and so her two daughters were called Snow-White and Rose-Red.' },
        { kind: 'text', text: 'They were the dearest children in the world, and they loved each other like two halves of one heart.' },
        { kind: 'image', art: 'grimm3-hearth', text: 'The sisters make the great bear welcome by their fire.' },
        { kind: 'text', text: 'One snowy evening a great shaggy bear knocked at the door. "Only warm my paws," he rumbled gently. The sisters swept the snow off him, and soon the bear was drying himself by the fire like an old friend.' },
        { kind: 'text', text: 'All winter the bear came to warm his paws. In spring he had to go away and guard his treasure from a wicked dwarf — and the girls met that same dwarf, cross as a wasp, again and again in the wood.' },
        { kind: 'note', text: 'Ask your child: how do the sisters treat the frightening bear? Talk about being kind to strangers — and how kindness finds its way back to us.', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 2 · The Twelve Brothers',
      art: 'grimm3-lilies',
      artPrompt: 'a young girl in old peasant dress standing in a mossy glade where twelve white lilies grow in a ring, holding one cut lily, twelve great ravens lifting from the trees above, dappled green forest light, gentle magical storybook scene',
      blocks: [
        { kind: 'text', text: 'A king had twelve sons, and he swore the girl baby, when born, must be sent away — so fierce was his anger that she would be a princess while her brothers were nothing.' },
        { kind: 'text', text: 'So the twelve brothers fled into the dark wood, and found an enchanted little house, where they lived quietly for years. The sister grew up knowing nothing of them — until someone told her.' },
        { kind: 'text', text: 'She ran away to find them, and found the house, and twelve places set at table. In the garden grew twelve white lilies. She picked one — and whoosh! Her brothers turned into twelve ravens and flew away.' },
        { kind: 'image', art: 'grimm3-ravens', text: 'Twelve ravens rise from the enchanted glade.' },
        { kind: 'text', text: 'An old woman told her: only seven years of silence and never a smile could bring them back. She sat by a high tree and span, and never spoke a word.' },
        { kind: 'note', text: 'Ask your child: the sister spoke without knowing what it would do, and spent seven years making it right. What does that cost her — and what does it show about her?', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 3 · The Seven Ravens',
      art: 'grimm3-ravens2',
      artPrompt: 'a small determined girl in a worn cloak climbing a high glass mountain under a sky full of stars, seven black ravens circling the peak, a tiny bone key in her hand, night sky in deep blues with starlight, hopeful fairytale storybook scene',
      blocks: [
        { kind: 'text', text: 'There was once a girl with seven brothers, who had been turned into seven ravens by an angry father\'s careless wish. She said nothing — but she made up her mind.' },
        { kind: 'text', text: 'She walked to the sun, and the sun was too hot. She walked to the moon, and the moon was too cold. At last she came to the stars, and the stars were kind to a little child.' },
        { kind: 'image', art: 'grimm3-stars', text: 'The kind stars give the girl a little bone key.' },
        { kind: 'text', text: 'They gave her a small bone, sharp as a key, and showed her the glass mountain where her brothers kept house. She climbed and climbed, and at the top found seven little plates and seven little cups. She took her ring from her finger and dropped it into the last cup — and when the seven ravens came home to drink, the ring rolled against the youngest\'s beak.' },
        { kind: 'text', text: '"Whose ring is this?" he cried, for it was not his. "Our sister!" they all said, and the wings fell away from their backs, and seven brothers stood in the room, laughing and holding her hands.' },
        { kind: 'note', text: 'Ask your child: the sister walks to the end of the world, step by step. What keeps her going? Talk about love that quietly does hard things.', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 4 · The Singing Bone',
      art: 'grimm3-bone',
      artPrompt: 'a shepherd in simple country clothes on a bridge over a stream at dusk, holding a little flute carved from a white bone, glowing notes of music floating in the air, green meadows and a far castle behind, golden evening light, gentle storybook illustration',
      blocks: [
        { kind: 'text', text: 'A wild boar was ruining a whole country, and the king promised his daughter to whoever could end it. Two brothers set out, the poor simple one and the proud clever one.' },
        { kind: 'text', text: 'The simple brother met a little black dwarf, who gave him a black spearhead and good advice. With it, he met the boar and ended its wild days.' },
        { kind: 'image', art: 'grimm3-boar', text: 'The simple brother ends the boar\'s wild days.' },
        { kind: 'text', text: 'But the proud brother, green with envy, gave his tired sibling drink — and then pushed him off the bridge into the stream below, and went home to claim the prize.' },
        { kind: 'text', text: 'Years later a shepherd found a beautiful white bone under the bridge, and carved it into a mouthpiece for his horn. When he blew it, the bone sang by itself what had really happened under the bridge, long ago. The horn was carried to the castle and sang the truth at a great feast; the false brother could not deny it, and lost everything he had stolen.' },
        { kind: 'note', text: 'Ask your child: the bone sings what really happened. Why do you think the storyteller wanted the truth to be something you cannot stop once it is heard?', art: 'lamp-hint' },
      ],
    },
  ],
  rights: {
    workTitle: "Kinder- und Hausmärchen (Grimm's Fairy Tales)",
    author: 'Jacob & Wilhelm Grimm',
    authorDeathYear: 1863,
    jurisdiction: 'EU',
    basis: 'pd-70',
    note: '19th-century German folk tales, worldwide public domain; retold for children. Snow-White and Rose-Red, The Twelve Brothers, The Seven Ravens, The Singing Bone (KHM 161, 9, 25, 28).',
  },
}
