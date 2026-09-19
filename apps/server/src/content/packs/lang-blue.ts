import type { PackBook } from '../types'

/**
 * The Blue Fairy Book (Andrew Lang, ed., 1889) — five tales retold for children,
 * one tale per chapter. The Langs' collection is an 1889 edited translation of
 * public-domain European tales; US public domain (pre-1929) and worldwide
 * (Lang d. 1912, 70y pma expired). Plots follow the 1889 book; wording simplified
 * for readers aged 6-8.
 */
export const langBlue: PackBook = {
  id: 'lang-blue',
  title: 'The Blue Fairy Book',
  author: 'Andrew Lang (ed.)',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'Five favourite tales from Andrew Lang’s famous Blue Fairy Book: Beauty and the Beast, Ali Baba and the Forty Thieves, Toads and Diamonds, The White Cat, and Prince Hyacinth and the Dear Little Princess.',
  coverArt: 'blue-spine',
  coverArtPrompt: 'a beautiful old book with a deep blue cover lying open on a wooden windowsill, golden light and tiny sparkling stars drifting up from its pages forming the shapes of a castle, a rose, a cat and a flying carpet, a sprig of apple blossom resting on the page, warm cosy lamplight',
  coverFrom: '#0D47A1',
  coverTo: '#64B5F6',
  source: 'The Blue Fairy Book (Andrew Lang, ed., 1889), public domain',
  chapters: [
    {
      title: 'Chapter 1 · Beauty and the Beast',
      art: 'blue-beast',
      artPrompt: 'a gentle shaggy beast in a fine embroidered coat standing in a candlelit castle garden among glowing rosebushes, a girl in a simple blue dress reaching toward a single red rose, warm golden windows of the castle behind, soft evening light',
      blocks: [
        {
          kind: 'text',
          text: 'There was once a merchant who had six children, and the youngest was called Beauty, because she was as sweet as she was lovely. One year his ships were lost at sea, and the family had to move to a little cottage in the country, a hundred miles from the fine town house they had loved. Beauty’s sisters complained all day about the mud and the quiet, but Beauty made the fire, swept the floor, fed the hens, and sang while she worked, which made the work go twice as fast.',
        },
        {
          kind: 'text',
          text: 'Then came word that one ship had been found, and the father set out for the harbour. On the way home through the snow he lost his road, and came by chance to a strange castle, where the doors opened by themselves, a fire was lit, and supper appeared as if served by invisible hands. In the morning he remembered his daughter’s request for a rose, and plucked one from the garden. At once a terrible Beast stood before him. "Ungrateful man!" said the Beast. "Take the rose for your daughter — but you must return here yourself, or send one of your children to take your place."',
        },
        {
          kind: 'image',
          art: 'blue-beast',
          text: 'The Beast and the rose, in the enchanted garden of the castle.',
        },
        {
          kind: 'text',
          text: 'Beauty would not let her father go. She rode to the castle, and found her room lit with candles and books she loved, and a mirror that showed her the cottage across the miles whenever she missed home. Every evening the Beast came to ask one question: "Beauty, will you marry me?" And every evening she answered gently, "No, Beast. But I will be your friend." Day by day the friendship grew. The Beast walked with her in his garden and showed her where the nightingales built their nests, and never once grumbled. "I know my face is ugly," he said one night. "That may be," said Beauty, "but lately I hardly notice your face at all. I notice that you are kind."',
        },
        {
          kind: 'note',
          text: 'New word: enchanted — under a magic spell. The castle was enchanted too: its lamps lit themselves, and its gardens glowed even at midnight.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'When Beauty was allowed home for a visit, her jealous sisters coaxed her to stay too long. She dreamed the Beast lay dying of loneliness in the rose garden, and hurried back — and found it true, among the roses he had loved her in. "You shall not die," she wept. "I love you, Beast." At that word the spell broke: the Beast became a handsome prince, who had waited a long, long time to be loved for his heart. The castle filled with light, her family was brought to live there, and they were all as happy as the day is long.',
        },
      ],
    },
    {
      title: 'Chapter 2 · Ali Baba and the Forty Thieves',
      art: 'blue-thieves',
      artPrompt: 'a moonlit rocky desert with a great boulder standing open like a door, glowing treasure spilling from the cave inside, a poor woodcutter with donkeys watching amazed from behind a rock, starry desert night in deep blues and gold',
      blocks: [
        {
          kind: 'text',
          text: 'Ali Baba was a poor woodcutter. Every morning he led his three donkeys into the forest, cut bundles of firewood, and carried them to town to sell, and so he fed his wife and children, and no more. One day, gathering wood deeper in the forest than usual, he heard horses — and hid. Forty robbers rode up to a great rock, and their captain called out, "Open, Sesame!" — and the rock swung open like a door. The robbers went in and out with their sacks, called "Shut, Sesame!" and rode away.',
        },
        {
          kind: 'text',
          text: 'Ali Baba stepped out, said the magic words, and found a cave full of treasure — sacks of gold coin piled to the roof, more money than forty woodcutters would earn in a hundred years. He was honest about needing help only for his family: he measured out just enough gold to live quietly, borrowed a measure from his brother Cassim’s wife to carry it home in, and went his way. But Cassim found grains of gold sticking to the measure, and made his brother tell everything, and his eyes grew as round as coins. Then he hurried to the rock himself, went inside, and when the time came to leave, stood in the dark calling "Open, Barley!" and "Open, Oats!" and every grain except the right one. The rock would not move, and the robbers found him there.',
        },
        {
          kind: 'image',
          art: 'blue-thieves',
          text: 'Open, Sesame! The mountain door that swung on a magic word.',
        },
        {
          kind: 'text',
          text: 'Now the robbers meant to find Ali Baba too, and mark his door by night, for a cave they could no longer open was a cave they meant to take by force. But Morgiana, the quick-witted slave girl of the house, saw the chalk mark at dawn, and chalked every door in the street the same — and the robbers’ plan came to nothing. They tried again with a red mark, and again the clever girl matched every door. At last their captain crept into the town disguised as an oil merchant, with mules carrying jars — and in the jars hid his men. Morgiana, trimming the courtyard lamp after dark, heard a faint voice come from one of the jars: "Is it time?" So she knew the oil was not oil at all, and quietly arranged that not one robber left the courtyard to trouble anyone again. The grateful Ali Baba set Morgiana free, gave her a dowry and a wedding of her own, and lived out his days comfortable and safe — thanks to the best listener in the house.',
        },
        {
          kind: 'note',
          text: 'Talk together: it is careful Morgiana who keeps everyone safe, by noticing what others miss. Ask your child: what small clue did Morgiana spot, and what would you have done?',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 3 · Toads and Diamonds',
      art: 'blue-diamonds',
      artPrompt: 'a girl drawing water from a well at the edge of a twilight forest for a small old woman in a hooded cloak, roses and sparkling gems drifting in the air around the girl’s feet, fireflies, gentle violet and gold evening colours',
      blocks: [
        {
          kind: 'text',
          text: 'A widow had two daughters. The elder was rude and proud, like her mother, and was loved accordingly; the younger, who was sweet and kind and twice as lovely, the mother could not bear to look at. She made the poor girl draw water from the well half a league from home, twice a day, in a great pitcher, and scolded her the whole way there and the whole way back.',
        },
        {
          kind: 'text',
          text: 'One evening at the well an old woman asked the girl for a drink. The kind girl held the pitcher steady with both hands so the tired stranger could drink easily. "You are welcome to all I have," she said, "though it is heavy, and I am sorry it is not milk." The old woman drank, and smiled a very unusual smile, for she was no old woman at all but a fairy who had come down from the forest to see who was kind when nobody was watching. "You are so pretty and so polite," she said, "that I will give you a gift: at every word you speak, a flower or a jewel shall fall. There — that one counts."',
        },
        {
          kind: 'image',
          art: 'blue-diamonds',
          text: 'Kind words, and a gift that fell from them: flowers and jewels.',
        },
        {
          kind: 'text',
          text: 'At home, jewels and roses dropped from the girl’s lips whenever she spoke — one "good morning" and the table was strewn with pearls — and the mother sent the elder daughter to the well at once, to gather the same gift. The rude girl met the old woman and grumbled, and pushed past to drink first, and spoke crossly the whole time. "You have had your gift," said the old woman quietly. "At every word you speak, a toad or a snake shall fall." And so it was, until the whole household was tired of the croaking, and the rude girl wandered off alone, and nobody was very sorry.',
        },
        {
          kind: 'note',
          text: 'New word: gift — here, a magic power. The fairy’s gift did not put words in the girls’ mouths; it only showed everyone what their words had always been like inside.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The kind girl, meanwhile, grew lovelier with every gentle word, and never once used her gift to show off. A young prince, passing the cottage, heard her speak and saw the roses and diamonds fall, and asked her father for her hand — and asked her, first of all, whether she was willing, which pleased her more than the palace did. The wedding was the talk of two kingdoms. They were married in spring, and if you visit the palace still, they say the garden paths shine — because kind words leave a light wherever they land.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The White Cat',
      art: 'blue-whitecat',
      artPrompt: 'a grand underground palace hall lit by a thousand candles, a beautiful white cat with golden eyes seated at a tiny gilt table set with doll-sized silver dishes, a young prince in a feathered cap being seated as her guest, mirrored walls, soft opal light',
      blocks: [
        {
          kind: 'text',
          text: 'A king, growing fanciful in his old age, set his three sons a task: "Find me a little dog so small and lovely that none in the world can match it. Whoever wins shall have my crown — and whoever fails shall have the pleasure of watching his brother win." The two elder princes set out at once with fine horses and fine manners, and a year later came home with dogs on velvet cushions, each the size of a small barn. The youngest prince rode far, and at dusk came to a strange door in a hillside. Behind it wound a corridor of monkey servants holding torches, and at the end sat a White Cat on a cushion of orange velvet, who said, "You are welcome, Prince. I have expected you for a week."',
        },
        {
          kind: 'text',
          text: 'She feasted him on dishes no bigger than a cherry, served on silver no bigger than a thumbnail, and he slept in a bed hardly wider than a glove, and never once felt crowded. In the morning she gave him a little acorn to carry on his journey, and told him the road home. When the brothers brought home their enormous dogs, the youngest opened his acorn — and out stepped a tiny, perfect dog no taller than an ear of wheat, which curtsied to the king. The king, disappointed that he could not yet rest, set a second task: the finest cloth ever woven, fine enough to pass through a needle’s eye. Again the White Cat helped him: her acorn this time unrolled into a web of cloth so light it floated on the air, bright as the dawn, and threaded its own way through the needle’s eye to please the court.',
        },
        {
          kind: 'image',
          art: 'blue-whitecat',
          text: 'The White Cat’s palace, where the dishes were small and the magic was not.',
        },
        {
          kind: 'note',
          text: 'New word: acorn — the small nut of an oak tree. In this story it is also a travelling box of surprises, one treasure to a shell.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The third task was the strangest: the most beautiful princess in the world. "It is time you knew," said the White Cat, "that I am that princess, changed long ago into a cat until someone should love me without counting whiskers. Long before your father was born, fairies quarrelled over my cradle, as fairies will, and one of them lost her temper." She waved her paw; the cat skin fell away; and the youngest prince found himself bowing to a lady more lovely than dawn. The king blessed them with all his heart — for at last he could rest — and the underground palace with its thousand candles rose up into the sunshine, where every wedding guest could find it.',
        },
      ],
    },
    {
      title: 'Chapter 5 · Prince Hyacinth and the Dear Little Princess',
      art: 'blue-hyacinth',
      artPrompt: 'a young prince with a splendid long nose standing before a shimmering crystal palace door that is narrowing to a slit, determined and laughing at himself, a fairy with a wand watching kindly from a cloud of gold dust, sunrise pinks and blues',
      blocks: [
        {
          kind: 'text',
          text: 'In a certain kingdom, a splendid long nose was thought the most beautiful thing in the world, and the people of that country measured each other’s noses with great politeness, and found each measurement more charming than the last. There a prince was born — Hyacinth — with such a nose as had never been seen, and everyone at court told him, hour after hour, that nothing anywhere could be lovelier. The court ladies compared it to a mountain. The court poets wrote it a sonnet. By the age of ten the prince was quite sure that his nose was the finest thing in the world, and that people who could not see it were not looking properly.',
        },
        {
          kind: 'text',
          text: 'Now the Dear Little Princess, whom the prince loved, was kept prisoner in a crystal palace by an old fairy, and Hyacinth rode off to set her free. He asked the way of everyone he met, and everyone he met praised his nose so long that he arrived a week late. When he reached the palace at last, the crystal towers glowed pink in the evening light, and he found a magical doorway that grew narrower and narrower as he walked toward it, until at last it was only a crack — a crack exactly the width of one who had never once, in his whole life, thought about anybody but himself. He tried sideways. He tried holding his breath. The doorway stayed exactly as narrow as his own thoughts.',
        },
        {
          kind: 'image',
          art: 'blue-hyacinth',
          text: 'The doorway that would let through no one who thought only of himself.',
        },
        {
          kind: 'note',
          text: 'Talk together: the prince’s wonderful nose was the one thing standing in his own way. Ask your child: what does it feel like to stop thinking about yourself for a minute and look at someone else?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'So Hyacinth did the bravest thing in the whole story: he stopped worrying about how he looked, laughed at his own fine nose, and pressed gently on — and found that when a person thinks of someone else first, doors that seemed narrow grow wide. Inside, he woke the Dear Little Princess, who had been asleep a hundred years in the crystal light, with all the lamps still burning for her and a breakfast waiting on the table. She looked at his long nose with her clear eyes and thought it charming, which shows how right she was. They talked till the stars came out, and were married in the morning with bells and roses, and both their noses were much admired by everybody — briefly. And the prince was kinder all his days, and the old fairy was never unkind again, which everyone agreed was the handsomest thing about him.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Blue Fairy Book',
    author: 'Andrew Lang (ed.)',
    authorDeathYear: 1912,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Stories as retold in Lang’s colour fairy book (1889), edited and translated from older public-domain European tales. Published 1889; US public domain (pre-1929) and worldwide (Lang d. 1912, 70y pma expired). Plots followed, wording simplified for children.',
  },
}
