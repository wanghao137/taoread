import type { PackBook } from '../types'

/**
 * The Tailor of Gloucester — retold in short simple sentences for very young readers.
 * Text: Project Gutenberg eBook (Beatrix Potter, 1903). Public domain in the US
 * (pre-1929) and in the UK (Potter died 1943; 70y pma expired 2014). Plot follows the
 * original story; wording simplified for children aged 3-5.
 */
export const tailorGloucester: PackBook = {
  id: 'tale-tailor',
  title: 'The Tailor of Gloucester',
  author: 'Beatrix Potter',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: 'In an old shop in Gloucester lives a poor tailor. He must make a wedding coat for the Mayor. But he is sick, and he has no more silk. Who can help him?',
  coverArt: 'gloucester-lane',
  coverArtPrompt: 'a little old tailor’s shop with a bow window, spools of coloured thread and a pair of scissors on a wooden table, a tiny grey mouse peeping out of the wainscot, snow on the rooftops',
  coverFrom: '#795548',
  coverTo: '#D7CCC8',
  source: 'Project Gutenberg eBook, public domain (Potter d. 1943)',
  chapters: [
    {
      title: 'Chapter 1 · The Poor Tailor',
      art: 'tailor-shop',
      artPrompt: 'an old tailor in spectacles and a brown coat sitting cross-legged on a table, cutting white satin with big scissors, a ginger cat watching from a chair, a warm fire',
      blocks: [
        {
          kind: 'text',
          text: 'In the old town of Gloucester there lived a tailor. His shop was in a tiny crooked house. He made fine clothes for the great people of the town. But he was very poor.',
        },
        {
          kind: 'image',
          art: 'tailor-shop',
          text: 'The tailor at work in his little shop.',
        },
        {
          kind: 'text',
          text: 'The Mayor of Gloucester was going to be married on Christmas Day. He ordered a fine white coat and a rose-coloured waistcoat. The tailor worked and worked. He cut out the coat. But he was poor and sick, and he had no more twist.',
        },
        {
          kind: 'note',
          text: 'Fun word: twist — the strong silk thread that a tailor uses to sew clothes.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The tailor gave his last pennies to his cat, Simpkin. "Simpkin," he said, "take this money. Buy a penn’orth of bread, and a penn’orth of sausage, and I want a skein of cherry-coloured twist." The tailor was so tired that he went to bed.',
        },
        {
          kind: 'text',
          text: 'When the tailor was asleep, Simpkin went out into the snow. But he did not come back with the twist. He hid it in a little bag, and he hid the bag under the floorboards. Simpkin did not want the tailor to finish the coat.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Little Mice',
      art: 'mice-coat',
      artPrompt: 'three tiny brown mice in little aprons sewing white satin in candlelight, one threading a needle, one trimming thread, one leading the cat away, a thimble on the floor',
      blocks: [
        {
          kind: 'text',
          text: 'In the wainscot of the tailor’s house there lived a family of mice. They knew all about the poor tailor and his coat. And they knew where Simpkin had hidden the twist.',
        },
        {
          kind: 'image',
          art: 'mice-coat',
          text: 'The little mice sewing the white satin coat.',
        },
        {
          kind: 'text',
          text: 'Late that night, out came the mice. They had tiny thimbles and tiny needles. They took the white satin, and they began to sew. Stitch, stitch, stitch. The little mice worked all through the night. And they led Simpkin the cat far away, so that he could not catch them.',
        },
        {
          kind: 'note',
          text: 'Can you hear the mice? Stitch, stitch, stitch! What do you think the mice are singing?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'They made the coat and the rose-coloured waistcoat, all but one buttonhole. And then they ran out of twist. So they left the buttonhole undone, and they ran back into the wainscot.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Wedding Coat',
      art: 'wedding-coat',
      artPrompt: 'a beautiful white satin wedding coat and rose waistcoat hanging in a sunlit shop window, a golden buttonhole in a flowerpot, the tailor and his ginger cat smiling, bright Christmas morning',
      blocks: [
        {
          kind: 'text',
          text: 'On Christmas morning the Mayor came to the shop. "Where is my coat?" he asked. The tailor was frightened, for he thought the coat was not finished.',
        },
        {
          kind: 'image',
          art: 'wedding-coat',
          text: 'The finished wedding coat, hanging in the shop window.',
        },
        {
          kind: 'text',
          text: 'But there on the table lay the coat, and the rose-coloured waistcoat, and they were beautiful. The stitches were so tiny that no man in Gloucester could make such stitches. Only one buttonhole was undone. The Mayor was very glad, and he paid the tailor well.',
        },
        {
          kind: 'note',
          text: 'Fun word: buttonhole — the little slit in a coat where a button goes, and where you can wear a flower!',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'After that the tailor grew strong and well. He never was poor again. And if you ask who made the wedding coat, everyone in Gloucester will tell you: the tailor made the coat, and the little mice made the tailor.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Tailor of Gloucester',
    author: 'Beatrix Potter',
    authorDeathYear: 1943,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Retold in simple English for young readers; plot follows the public-domain original. Published 1903; US public domain (pre-1929) and UK public domain (Potter d. 1943, 70y pma expired).',
  },
}
