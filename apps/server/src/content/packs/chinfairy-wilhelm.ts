import type { PackBook } from '../types'

/**
 * The Chinese Fairy Book, ed. Richard Wilhelm, trans. Frederick H. Martens
 * (1921) — four tales retold in plain English for readers aged 6–8:
 * "Why Dog and Cat Are Enemies", "The Bird with Nine Heads", "The Cave of
 * the Beasts", and "The Girl with the Horse's Head (the Silkworm Goddess)".
 * The 1921 anthology is public domain in the US (published before 1929);
 * Wilhelm died in 1930, so his edition is public domain there as well. The
 * retellings follow the plots of the collection.
 */
export const chineseFairyBook: PackBook = {
  id: 'chinfairy-wilhelm',
  title: 'The Chinese Fairy Book',
  author: 'Richard Wilhelm (ed.)',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'Four old Chinese tales from a book of fairy stories gathered long ago: a loyal dog and cat on a quest, a brave boy and the nine-headed bird, sisters in a cave of treasure, and the girl who became the goddess of silk.',
  coverArt: 'chinfairy-lantern',
  coverArtPrompt: 'a little girl in a red jacket holding a glowing round paper lantern on a stone path by an old Chinese garden wall at night, a dog and a cat sitting on either side of her, a nine-headed bird as a small shadow far in the sky, warm lantern light against deep blue night, gentle storybook illustration',
  coverFrom: '#B71C1C',
  coverTo: '#FFCC80',
  source: 'The Chinese Fairy Book, ed. Richard Wilhelm, trans. Frederick H. Martens (1921), US public domain (1921 anthology; Wilhelm d. 1930)',
  chapters: [
    {
      title: 'Chapter 1 · Why Dog and Cat Are Enemies (狗猫结仇)',
      art: 'chinfairy-ring',
      artPrompt: 'a loyal brown dog swimming across a river carrying a small cat on his back, the cat holding a shiny gold ring in her mouth, green banks and a little house on the far shore, warm afternoon light, gentle storybook illustration',
      blocks: [
        { kind: 'text', text: 'Long ago a poor couple owned one treasure: a lucky gold ring. Whoever wore it never went hungry. But one day the ring was sold by mistake, and the family grew poorer and poorer.' },
        { kind: 'text', text: 'The house dog and the house cat put their heads together. "We shall fetch it back," they said. The cat caught a mouse, and the mouse nibbled open the chest where the ring was kept.' },
        { kind: 'image', art: 'chinfairy-river', text: 'The dog swims the river with the cat on his back.' },
        { kind: 'text', text: 'On the way home, the river lay between them and the door. The brave dog swam across with the cat on his back. But the clever cat ran ahead over the rooftops and set the ring down by the hearth first.' },
        { kind: 'text', text: 'The family praised the cat and gave her a soft cushion forever. The wet, tired dog got only scoldings for arriving late and dripping. From that day on, dogs have chased cats — all for a ring, a rooftop, and an unfair scolding.' },
        { kind: 'note', text: 'Ask your child: the dog did the swimming, and the cat took the credit. What would be a fair way for the family to reward them both?', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 2 · The Bird with Nine Heads (九头鸟)',
      art: 'chinfairy-bird',
      artPrompt: 'a strange great bird with nine fierce heads sleeping coiled at the back of a rocky cave lit by a shaft of daylight, a brave boy with a basket-rope standing over it, a princess in silks beside him, dramatic but gentle light, storybook adventure scene',
      blocks: [
        { kind: 'text', text: 'The king had one daughter, whom he loved dearly. One day a monster came on whistling wings — the bird with nine heads — and carried her off to a cave high in the red cliffs.' },
        { kind: 'text', text: 'The king promised half his kingdom to whoever set her free. Many princes tried and failed. Then two poor young men came with a rope and a basket, and lowered the bravest one down into the cliff.' },
        { kind: 'image', art: 'chinfairy-cave', text: 'The boy is lowered into the cliff by a rope and basket.' },
        { kind: 'text', text: 'In the cave the nine-headed bird lay fast asleep. The boy struck true, and it never woke again. The princess gave the boy half her hairpin and half her silk handkerchief — proof, if ever proof were needed.' },
        { kind: 'text', text: 'But the jealous friend hauled up the princess first and left the hero below! The boy rode out on the tail of a passing river dragon, and found magic pearls besides. At the palace the two halves of the hairpin fitted together, the liar was driven out, and the hero married the princess.' },
        { kind: 'note', text: 'Ask your child: the friend had helped — then spoiled everything with jealousy. How could he have shared the honor instead?', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 3 · The Cave of the Beasts (兽穴)',
      art: 'chinfairy-beasts',
      artPrompt: 'two young sisters in old Chinese peasant dress standing amazed in a glittering cave full of pearls, gold dishes and treasure, a warm glowing light filling the stone hall, softly sparkling shadows, gentle magical storybook illustration',
      blocks: [
        { kind: 'text', text: 'A father had seven daughters, and the two youngest were the quickest and bravest. One day they followed him far up the mountain paths — and lost their way as the sun went down.' },
        { kind: 'text', text: 'Cold and tired, they found a cave to sleep in. Inside, it glittered like the night sky: pearls, gold dishes, and treasure beyond counting. This was the cave of a wolf and a fox.' },
        { kind: 'image', art: 'chinfairy-kettle', text: 'The sisters lift the heavy kettle lids in the treasure cave.' },
        { kind: 'text', text: 'At night the wolf and fox came home and curled up in their two great kettles by the fire, as beasts do. The sisters pressed the heavy lids down and piled stones on top, and the two beasts could not get out again.' },
        { kind: 'text', text: 'The sisters lived in the treasure cave until their sorrowing father found them at last. They carried home pearls enough for a rich wedding portion, and the wolf and fox troubled the mountain no more.' },
        { kind: 'note', text: 'Ask your child: the sisters stay calm, watch, and think. What three clever things do they do between nightfall and morning?', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 4 · The Girl with the Horse\'s Head (马头娘娘)',
      art: 'chinfairy-silkworm',
      artPrompt: 'a gentle girl in flowing robes transformed into a white silkworm goddess among the dark leaves of a mulberry tree, white cocoons glowing softly on the branches, a small white horse-shape of clouds in the sky above, tender moonlit light, serene storybook illustration',
      blocks: [
        { kind: 'text', text: 'There was a girl whose father went away on a long journey. She missed him so much that she could not eat. Only her beautiful white horse understood her sadness.' },
        { kind: 'text', text: '"If you bring my father home," the girl told the horse, "I will marry no one but you." The horse ran like the wind, found the father, and carried him home across many rivers.' },
        { kind: 'image', art: 'chinfairy-horse', text: 'The white horse brings the father safely home.' },
        { kind: 'text', text: 'But a father may not give his daughter to a horse. He did not keep the promise, and the horse was gone from the courtyard. Its hide hung drying in the sun.' },
        { kind: 'text', text: 'One day the wind lifted the hide, and it wrapped the girl like a soft blanket and carried her to a mulberry tree. There she changed into a small white worm that spun the finest silk in the world. People called her the Goddess of Silkworms, and to this day silkworms spin their silk on mulberry leaves — the same silk that once made a little princess\'s handkerchief.' },
        { kind: 'note', text: 'Ask your child: this is a story that explains something real — where silk comes from. Can you think of other stories that explain why things are the way they are?', art: 'lamp-hint' },
      ],
    },
  ],
  rights: {
    workTitle: 'The Chinese Fairy Book (Chinesische Märchen, ed. Richard Wilhelm)',
    author: 'Richard Wilhelm (ed.)',
    translator: 'Frederick H. Martens',
    authorDeathYear: 1930,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: '1921 anthology in US public domain; stories retold from the collection (Why Dog and Cat Are Enemies; The Bird with Nine Heads; The Cave of the Beasts; The Girl with the Horse\'s Head). Wilhelm died in 1930, so his edition is public domain in the US as well.',
  },
}
