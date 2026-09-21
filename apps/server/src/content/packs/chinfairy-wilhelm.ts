import type { PackBook } from '../types'

/**
 * The Chinese Fairy Book, ed. Richard Wilhelm, trans. Frederick H. Martens
 * (1921) — eight tales retold in plain English for readers aged 6–8:
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
  intro: 'Eight old Chinese tales from a book of fairy stories gathered long ago: a loyal dog and cat on a quest, a brave boy and the nine-headed bird, sisters in a cave of treasure, the girl who became the goddess of silk, the herd boy and the weaving maiden, the lady of the moon, the great flood, and the three rhymsters.',
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
    {
      title: 'Chapter 5 · The Great Flood (大洪水)',
      art: 'chinfairy-flood',
      artPrompt: 'a little wooden ship floating on endless silver floodwater, a boy and his mother aboard with a dog, a cat, a pair of mice, a raven and a swarm of bees in a little cage, rain falling, distant rooftops sinking below the waves, soft grey-gold light, gentle storybook illustration',
      blocks: [
        { kind: 'text', text: 'Long ago a poor widow and her son took in a dirty old beggar-woman when nobody else would. They washed her clean and were kind to her. The old woman smiled. "Bury this jar," she said, "and build a little wooden ship, and hide it away. When the eyes of the two stone lions turn red, dig up the jar and launch your ship."' },
        { kind: 'text', text: 'Every day the boy ran to look at the stone lions. A butcher laughed at him — and one morning, as a joke, painted their eyes red. That very day the sky turned dark, and the rain came down, and the waters rose higher and higher.' },
        { kind: 'image', art: 'chinfairy-flood', text: 'The little ship on the flood, with everyone the boy saved aboard.' },
        { kind: 'text', text: 'The jar, when they dug it up, was full of pearls, and the little ship grew big enough to sail. The old woman stepped aboard and became a shining god, for she had been testing them. The boy and his mother pulled a dog, a cat, two mice, a raven and a swarm of bees out of the water. They saved one drowning man too — though he was not grateful at all!' },
        { kind: 'text', text: 'When the waters sank, the ungrateful man claimed the pearls, and the boy and his mother were locked in jail. But the mice gnawed open the wall, and the dog and cat brought food, and the raven carried a letter from the gods — and the judge set them free. Years later the bees swarmed round a princess\'s hidden litter in the marketplace, and the boy won her hand, and they lived happily ever after.' },
        { kind: 'note', text: 'Ask your child: the boy was kind to a beggar, to animals, and even to an ungrateful man. How did each kindness come back to him?', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 6 · The Herd Boy and the Weaving Maiden (牛郎织女)',
      art: 'chinfairy-cowherd',
      artPrompt: 'a young ox-herd and a maiden in flowing silks standing on opposite banks of a great silver river of stars arching across the night sky, thousands of small magpies forming a bridge of wings between them, a fairy cow watching from a cloud, deep blue and silver starlight, tender storybook illustration',
      blocks: [
        { kind: 'text', text: 'A poor boy of twelve kept his neighbours\' cows for a living. One cow was so beautiful that he knew she must be a fairy cow — and one day she spoke to him! "On the seventh day of the seventh month," she said, "the daughters of the King of Heaven come down to bathe in the Sea of Heaven. The youngest weaves the cloud-silk for the palaces above. She is meant to be your wife."' },
        { kind: 'text', text: 'The fairy cow carried the Herd Boy up to heaven, and there he met the Weaving Maiden, spinning silver clouds by the water. She smiled at his kind, honest face, and an old willow tree on the shore spoke its blessing, and the two of them were married. For a while they were as happy as any two in heaven or on earth.' },
        { kind: 'image', art: 'chinfairy-cowherd', text: 'The bridge of magpies across the Silver River of stars.' },
        { kind: 'text', text: 'But the Weaving Maiden was called back to her loom in the sky. Weeping, she drew a line across the heavens with her hair needle — and the line became the Silver River, the Milky Way, with her on one bank and the Herd Boy on the other, both turned into stars that shine there still.' },
        { kind: 'text', text: 'Yet once a year, on the seventh night of the seventh month, all the magpies of the world fly up and make a bridge of wings, and the two meet in the middle of the sky. On that night it often rains fine soft rain — people say those are their happy tears.' },
        { kind: 'note', text: 'Ask your child: in summer you can find two bright stars on opposite sides of the Milky Way — the Herd Boy and his Weaving Maiden. What would you shout to them across the river?', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 7 · The Lady of the Moon (嫦娥奔月)',
      art: 'chinfairy-moon',
      artPrompt: 'a gentle lady in a rainbow gown and white mantle standing in a crystal moonlit castle beside a fragrant blossoming cassia tree, a white jade rabbit pounding herbs in a marble mortar beside her, the blue earth glowing far below, silver light, serene storybook illustration',
      blocks: [
        { kind: 'text', text: 'Long, long ago ten suns rose in the sky together, and the earth scorched and withered. A mighty archer named Hou Yi bent his great bow and shot down nine of the ten suns, and saved the world. For that, the Queen-Mother of the Jasper Sea gave him a gift: the herb of immortality — enough to live for ever.' },
        { kind: 'text', text: 'Hou Yi hid the herb at home. But his wife, Tschang O, found it while he was out, and — who knows why? maybe she was curious, maybe she was afraid — she ate it. At once her feet left the floor. Up she floated, higher and higher, out of the house, over the clouds, until she came to the castle on the moon. There she has lived ever since, the Lady of the Moon.' },
        { kind: 'image', art: 'chinfairy-moon', text: 'The crystal castle, the cassia tree, and the white rabbit at the mortar.' },
        { kind: 'text', text: 'Once, long after, an emperor of China was carried up to the moon on a bridge made of a wizard\'s bamboo staff. He saw the crystal halls, and the cassia tree, and a man in the tree chopping wood with an axe, and the white rabbit by its marble mortar, pounding the herbs of life. Then the Lady of the Moon came out, with her maidens flying on white birds, and they danced and sang under the tree.' },
        { kind: 'text', text: 'The emperor went home at dawn and had the moon-music written down. And to this day, at the Mid-Autumn Festival, families eat mooncakes and look up at the bright moon — and children look for the cassia tree, the rabbit, and the Lady who lives there.' },
        { kind: 'note', text: 'Ask your child: at the Mid-Autumn Festival, what shapes can you find in the moon? Make up your own story about them.', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 8 · The Three Rhymsters (三女婿对诗)',
      art: 'chinfairy-rhyme',
      artPrompt: 'a festive Chinese courtyard birthday feast under red lanterns, two smug gentlemen in fine robes laughing while a plain farmer stands and speaks, a bright-eyed young woman stepping out from behind a screen with a smile, dishes and teacups on the table, warm lantern light, gentle comic storybook illustration',
      blocks: [
        { kind: 'text', text: 'An old man had three daughters. The eldest married a physician, the second married a magistrate, and the third — the cleverest of all — married a simple farmer. At the old man\'s birthday feast, the three sons-in-law sat down to eat, and the two fine gentlemen decided to make fun of the farmer.' },
        { kind: 'text', text: '"Let us make rhymes," said the physician. "One line about the sky, one about the earth, one about the table, one about the room. Whoever cannot rhyme must bow three times to the others!" The physician rhymed grandly about a phoenix in the sky. The magistrate rhymed grandly too. Then the farmer stood up, cleared his throat, and said: "A leaden bullet in the sky, a tiger on the earth, a pair of scissors on the table, a stable-boy in the room."' },
        { kind: 'text', text: 'The two gentlemen laughed till the cups rattled. "What nonsense!" they cried. "Bow down, farmer!"' },
        { kind: 'image', art: 'chinfairy-rhyme', text: 'The farmer\'s wife steps out from behind the screen to explain everything.' },
        { kind: 'text', text: 'But then the farmer\'s wife came out from behind the screen. "It is no nonsense," she said. "The bullet will shoot down your phoenix. The tiger will eat your oxen. The scissors will cut up your old books. And the stable-boy will marry your housemaid." The gentlemen looked at one another, and their mouths shut like fans. Then the physician laughed loudest of all. "Had you been born a man," he told the farmer\'s wife, "you would have passed the imperial exams long ago!" And the two of them bowed three times, deep and low.' },
        { kind: 'note', text: 'Ask your child: the farmer\'s rhymes sounded silly — until they were explained. Was the farmer really foolish, or just plain-spoken? And who was the cleverest person at the feast?', art: 'lamp-hint' },
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
