import type { PackBook } from '../types'

/**
 * The Magic of Oz (L. Frank Baum, 1919) — five chapters retold in simple
 * English for readers aged 6–8. Public domain in the US (published before
 * 1929) and worldwide (Baum died in 1919). Plot and characters (Kiki Aru,
 * Ruggedo the old Nome King, the Wizard of Oz, Dorothy, Gugu the Leopard
 * King, Trot, Cap'n Bill, Button-Bright, the Glass Cat, Ozma) follow the
 * original book; only the wording is shortened and simplified.
 */
export const ozMagic: PackBook = {
  id: 'oz-magic',
  title: 'The Magic of Oz',
  author: 'L. Frank Baum',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'A boy named Kiki Aru learns a secret magic word that can change anything into anything. Together with a grumpy old Nome King, he plots to take over Oz — but a birthday present, a glass cat, and a clever Wizard have other plans.',
  coverArt: 'ozmagic-isle',
  coverArtPrompt: 'a small enchanted island of white sand and one glowing magic flower in the middle of a turquoise lake, a little girl and an old sailor with a wooden leg standing on the shore in wonder, a sleek glass cat beside them, sparkling sunlight on the water, magical storybook illustration',
  coverFrom: '#00838F',
  coverTo: '#B2EBF2',
  source: 'The Magic of Oz (L. Frank Baum, 1919), public domain (Baum d. 1919)',
  chapters: [
    {
      title: 'Chapter 1 · The Secret Word',
      art: 'ozmagic-word',
      artPrompt: 'a small dark-haired boy on a green mountain slope reading an old book of magic under a tree, glowing letters floating above the open pages, soft afternoon mountain light, mysterious but gentle storybook illustration',
      blocks: [
        { kind: 'text', text: 'On a green mountain in Oz lived a boy named Kiki Aru. His father had once known magic, and had hidden one great secret in a book.' },
        { kind: 'text', text: 'The secret was a single strange word. Anyone who said it just right could change a thing into any other thing — a stone into a bird, a boy into a beast.' },
        { kind: 'image', art: 'ozmagic-book', text: 'Kiki Aru finds the old book of magic under the tree.' },
        { kind: 'text', text: 'Kiki learned the word, turned himself into a bird, and flew far away over the edge of the mountain. He thought being powerful would make him happy.' },
        { kind: 'note', text: 'Ask your child: Kiki can change anything into anything. If he felt small and lonely, would magic powers really fix that? Hold that thought for later in the story.', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 2 · The Old Nome King',
      art: 'ozmagic-ruggedo',
      artPrompt: 'a grumpy little old man in a ragged pointed crown sitting on a rock in a wild rocky country talking with a boy who has just turned from a bird back into himself, dusty purple evening light, gently comic storybook illustration',
      blocks: [
        { kind: 'text', text: 'In a rocky corner of Oz lived an old, old stranger. This was Ruggedo, the former Nome King, who had lost his kingdom because he was so wicked.' },
        { kind: 'text', text: 'When Ruggedo heard the magic word, his little eyes lit up. "Change the Princess\'s friends into beasts," he whispered, "and we shall rule all of Oz together!"' },
        { kind: 'image', art: 'ozmagic-plot', text: 'Ruggedo whispers his plan under the rocks.' },
        { kind: 'text', text: 'Kiki agreed, though he felt uneasy. First they went to the great forest, where the beasts were ruled by Gugu the old Leopard King.' },
        { kind: 'note', text: 'Ask your child: Ruggedo wants to make others small so he can feel big. Does that ever work? Watch what happens to him at the end of the story.', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 3 · Gugu the Leopard King',
      art: 'ozmagic-gugu',
      artPrompt: 'a wise old leopard with a golden crown sitting like a judge in a forest clearing, a girl in a blue dress and a little wizard standing calmly before him, woodland animals listening all around, warm green dappled light, gentle forest council storybook scene',
      blocks: [
        { kind: 'text', text: 'That very day, Dorothy and the Wizard had come to the forest too, on a friendly visit for Princess Ozma. They sat in council with Gugu, who was big and wise and kind.' },
        { kind: 'text', text: 'Kiki and Ruggedo tried to trick the beasts. Kiki even changed himself into a monstrous beast to frighten them. But the Wizard was watching, and he saw how the trick was done.' },
        { kind: 'image', art: 'ozmagic-beast', text: 'The friends stand together in the forest clearing.' },
        { kind: 'text', text: '"A wizard listens more than he talks," said the Wizard quietly. He had heard the magic word spoken — and he never forgot anything he heard.' },
        { kind: 'note', text: 'New word: council — a meeting where wise folk talk things over. Gugu listens carefully before he decides. That is why the animals trust their king.', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 4 · The Magic Flower',
      art: 'ozmagic-flower',
      artPrompt: 'a single glowing enchanted flower with shining petals on a small island of white sand in a turquoise lake, a little girl and an old sailor with a wooden knee leaning toward it, a sleek glass cat with pink brains watching, bright sparkling light, magical storybook illustration',
      blocks: [
        { kind: 'text', text: 'Meanwhile, Trot and Cap\'n Bill had gone hunting a birthday gift for Princess Ozma: the famous Magic Flower, which blooms in one place only, an enchanted isle.' },
        { kind: 'text', text: 'But the isle had a trick. Anyone who stood on its sand began to grow roots! Soon Trot and Cap\'n Bill stood rooted fast, like little trees.' },
        { kind: 'image', art: 'ozmagic-roots', text: 'Trot and Cap\'n Bill grow roots on the sandy isle.' },
        { kind: 'text', text: 'The Glass Cat ran at top speed for the Wizard. He arrived just in time, said the right charm, and the roots let go. The Magic Flower came home to Ozma\'s garden, where everyone could enjoy it.' },
        { kind: 'note', text: 'Ask your child: the Glass Cat cannot feel anything, but she runs faster than anyone. What is something small that turns out to be a big help?', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 5 · Two Little Nuts',
      art: 'ozmagic-nuts',
      artPrompt: 'a kindly old wizard in a starred robe holding up two small nuts in his palm, a grumpy old gnome man and a dark-haired boy looking surprised and small beside him, forest animals watching happily, warm golden light, gently funny storybook illustration',
      blocks: [
        { kind: 'text', text: 'Now the Wizard spoke the magic word he had overheard — very slowly and carefully, just right. And whoosh! Kiki Aru and Ruggedo became two little nuts.' },
        { kind: 'text', text: '"They cannot do harm now," said the Wizard, putting them safely in his pocket. "Perhaps a long, quiet rest will teach them to be kinder." The beasts of the forest cheered.' },
        { kind: 'image', art: 'ozmagic-party', text: 'Everyone gathers in Ozma\'s garden for the birthday.' },
        { kind: 'text', text: 'Then came Ozma\'s birthday. Her friends brought gifts, and the Magic Flower stood glowing in its pot, opening a new bloom for every guest.' },
        { kind: 'text', text: 'Kiki had wanted to be powerful, but power had only made him lonely. What he needed had been there all along: friends, kindness, and a place at the birthday table — for everyone but the two little nuts, who were resting.' },
        { kind: 'note', text: 'Ask your child: what did Kiki really want at the end of the story? Talk about a time when being with friends felt better than winning.', art: 'lamp-hint' },
      ],
    },
  ],
  rights: {
    workTitle: 'The Magic of Oz',
    author: 'L. Frank Baum',
    authorDeathYear: 1919,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Retold for children; plot follows the public-domain original. Published 1919; US public domain.',
  },
}
