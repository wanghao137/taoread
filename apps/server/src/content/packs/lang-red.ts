import type { PackBook } from '../types'

/**
 * The Red Fairy Book (Andrew Lang, ed., 1890) — five tales retold for children,
 * one tale per chapter. The Langs' collection is an 1890 edited translation of
 * public-domain European tales; US public domain (pre-1929) and worldwide
 * (Lang d. 1912, 70y pma expired). Plots follow the 1890 book; wording simplified
 * for readers aged 6-8.
 */
export const langRed: PackBook = {
  id: 'lang-red',
  title: 'The Red Fairy Book',
  author: 'Andrew Lang (ed.)',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'Five favourite tales from Andrew Lang’s famous Red Fairy Book: the twelve dancing princesses, Rapunzel in her tower, the golden goose that made a sad princess laugh, the monster Norka underground, and the bushy bride who was not the bride at all.',
  coverArt: 'red-dancers',
  coverArtPrompt: 'twelve princesses in shimmering ball gowns of many colours dancing in a grand silver palace hall beneath a golden tree hung with jewel fruit, worn dancing shoes by a doorway, a young soldier watching unseen from a golden cloak, warm enchanted ballroom light',
  coverFrom: '#B71C1C',
  coverTo: '#FF8A65',
  source: 'The Red Fairy Book (Andrew Lang, ed., 1890), public domain',
  chapters: [
    {
      title: 'Chapter 1 · The Twelve Dancing Princesses',
      art: 'red-dancers',
      artPrompt: 'a magical underground lake lit by willow lanterns, twelve princesses in sparkling gowns rowing a golden boat toward a silver castle, jewelled trees along the banks, a young man in an invisibility cloak standing at the stern of the boat, dreamy blue and silver night light',
      blocks: [
        {
          kind: 'text',
          text: 'A king had twelve daughters, and a puzzle that tired out every clever person in the kingdom. Each night the princesses slept behind locked doors, with the keys in the locks on the inside — and each morning their dancing shoes were worn through, as if they had danced all night. Where did they go? The king promised the crown to any man who could find out — but anyone who failed, after three nights of watching, had to go away and not come back. Princes came from far and wide, watched one night, snored through the second, and went home puzzled.',
        },
        {
          kind: 'text',
          text: 'At last an old soldier, limping home from a war, met a wise old woman by the road, and she gave him a cloak that made him invisible. "Do not drink the wine they bring you," she said, "and pretend to sleep, and listen." So the soldier sat in the eldest princess’s chamber, and the princess brought him a cup of wine in her kindest voice, and he thanked her and did not drink a drop. Soon the twelve sisters whispered and rustled and tapped the floor, and their beds sank away like a lift into a secret avenue of trees — silver trees on one side, golden trees on the other — and the soldier wrapped himself in the cloak and followed, stepping where they stepped.',
        },
        {
          kind: 'image',
          art: 'red-dancers',
          text: 'Down the silver avenue to the lake, with one extra passenger.',
        },
        {
          kind: 'text',
          text: 'The avenue led to a shining lake, where twelve boats waited, and across the water stood a palace of silver and gold with a garden of trees made of diamonds. In the boats the soldier sat with the youngest princess, who wondered all the way over why the boat seemed heavier than usual. "It is the warm night," said her eldest sister, who did not like questions. There the princesses danced with twelve princes until their shoes wore through, night after night, past three o’clock, until the shoes were quite worn out and had to be mended by morning. All the while an invisible soldier gathered proof: a golden branch from a tree of diamonds, a little cup from the palace, and his own two eyes. On the third morning he told the king everything, branch and cup and all. The princesses laughed and admitted it all, for there is no use keeping secrets that wear themselves out every night — and the eldest princess liked the soldier well enough, and he was married to her, and given the kingdom in good time.',
        },
        {
          kind: 'note',
          text: 'Talk together: the soldier watches, waits and gathers proof before he speaks. Ask your child: if you followed twelve princesses to a secret palace, what would you like to see first?',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 2 · Rapunzel',
      art: 'red-rapunzel',
      artPrompt: 'a tall stone tower in a green forest, a girl with an immensely long golden braid cascading from a high window down the ivy-covered wall, a prince standing below catching the glowing hair, soft morning mist and rays of sun through the trees',
      blocks: [
        {
          kind: 'text',
          text: 'There was once a couple who longed for a child, and when at last a baby girl was coming, the mother had one strange wish: to eat rapunzel, the green salad that grew in the garden of an enchantress next door. The wish grew so strong that the mother grew pale and thin without it, and her husband climbed the wall and gathered some for her — again and again, until the enchantress caught him at it, one moonlit night, mid-climb.',
        },
        {
          kind: 'text',
          text: '"You may take all the rapunzel you like," said the enchantress, "but the child will come to me." And so, when the little girl was born, she was named Rapunzel and carried away to live in a tower deep in the forest, with neither stair nor door — only one little window at the very top, where the birds came to visit her. When the enchantress wished to come up, she called, "Rapunzel, Rapunzel, let down your hair!" — for Rapunzel’s hair was as long and bright as a rope of gold.',
        },
        {
          kind: 'image',
          art: 'red-rapunzel',
          text: 'The tower in the forest, and the golden rope of hair.',
        },
        {
          kind: 'text',
          text: 'One day a prince heard Rapunzel singing to herself at the window — such singing that he rode back three days running just to listen — and learned the magic words by watching and waiting. When the enchantress had gone, he called up, and climbed the shining braid. Rapunzel was startled at first, and then not startled at all — for the prince was kind, and asked her to marry him, and she said yes, and after that every visit was a visit between friends. It took a while, and more than one kerchief of silk to make a ladder, and the last strand was nearly ready when the enchantress discovered everything. There was a sad, hard time after that: she cut the hair short, and turned Rapunzel out into the wild country to shift for herself, and the prince, calling up at the tower, met the enchantress with the cut braid instead, and fell from the window into a thorn thicket that scratched his eyes. But he wandered on, singing her songs to himself, until one day he heard her voice again in the distance — and Rapunzel found him, and her tears fell on his eyes like two small stars, and he could see again. They went to his kingdom, where everyone loved Rapunzel, and the tower in the forest stood empty, with ivy growing over the window, forever after.',
        },
        {
          kind: 'note',
          text: 'New word: enchantress — a woman with magic. This one kept promises only in her own grumpy way, which is why it is wise to read the small print of any bargain.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Golden Goose',
      art: 'red-goose',
      artPrompt: 'a country road winding through autumn fields, a simple young man carrying a goose with feathers of shining gold on his back, a procession of people stuck fast one behind another — a milkmaid, a parson, a sexton — all holding each other’s waists with astonished faces, bright crisp fall light',
      blocks: [
        {
          kind: 'text',
          text: 'There were three brothers, and the youngest was called Simpleton, because he asked simple questions and shared his supper too easily. The two elder brothers went into the forest to cut wood, each with a fine pancake and a bottle of wine, and each met a little grey old man who asked for a bite. Each brother said no, and each brother’s axe slipped or his wine turned sour. Simpleton, going out with a plain crust and sour beer, met the same old man — and shared everything, down to the last crumb.',
        },
        {
          kind: 'text',
          text: '"For your kindness," said the old man, "you shall find a golden goose in the root of that old tree." It was true: a goose with feathers of pure gold sat in the roots. Simpleton picked her up, meaning to take her somewhere safe. But at the inn that night, the innkeeper’s daughter tried to sneak just one feather — and found her hand stuck fast to the goose. Her sister tried to pull her free and stuck too. And when the church sexton and the parson came out to see what the fuss was, they stuck as well.',
        },
        {
          kind: 'image',
          art: 'red-goose',
          text: 'One golden goose, and a procession of surprised volunteers.',
        },
        {
          kind: 'text',
          text: 'So Simpleton set off for the town with a goose, and behind the goose came a girl, and behind the girl a sister, and behind the sisters a sexton, and behind the sexton a parson, all in a wiggling line, and everyone in the lanes came out to laugh. Now, the king of that country had a daughter who had never once laughed — and the king had said she would marry whoever made her do it. She saw the golden goose and its parade from her window, and she laughed until the tears came. But the king, not quite ready to lose his daughter, set three trials first: Simpleton must find a man who could drink a whole cellar of wine, and a man who could eat a mountain of bread, and a ship that would sail on dry land as well as water. And each time, it was the little grey old man from the forest who helped: a thirsty giant who had drunk rivers dry, a hungry giant with a mountain-sized appetite, and — on the third day — a little ship, all finished and waiting, with wheels for the road and sails for the wind. The king clapped his hands at the sight of it, the princess laughed again, and Simpleton wiped his boots, came up the stairs, and married the laughing princess, and they lived very merrily indeed.',
        },
        {
          kind: 'note',
          text: 'Talk together: the old man rewards kindness with a golden goose, but it is Simpleton’s gentle heart all along. Ask your child: what made the princess laugh?',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Norka',
      art: 'red-norka',
      artPrompt: 'a vast torchlit cavern deep underground with three marble palaces standing in a row, a young prince with a sword facing an enormous furry monster like a great grey cat with iron teeth, three princesses watching from palace doorways, flickering amber cave light',
      blocks: [
        {
          kind: 'text',
          text: 'A Czar had a beautiful garden, and in it an apple tree that bore golden fruit, which ripened one apple to a branch every night and made the garden famous. But every night something ate the apples, and no watch was ever clever enough to catch it. The Czar’s three sons offered to keep watch. The two elder dozed by warm fires and saw nothing at all; the youngest sat quietly under the tree in the dark, and near dawn he saw a monstrous beast come creeping — a Norka, a great grey thing like a cat grown terrible, with teeth of iron — and he shot it with his bow before it could run, and picked up a gold apple it had dropped.',
        },
        {
          kind: 'text',
          text: 'The wounded Norka slid into a hole in the ground. The prince followed, letting himself down a long rope through the dark, a hundred fathoms, into a wonderful underground country where the sky glowed softly without any sun. There stood three palaces — of copper, of silver, of gold — and in each palace a lovely princess, hiding from the Norka in her iron room. The princess in the copper palace gave him supper and told him where the beast slept, behind a great iron door, and warned him to rest first. The prince waited by that door with his sword ready, and when the Norka at last came snuffling out, they fought, and the prince won, and the underground country was free.',
        },
        {
          kind: 'image',
          art: 'red-norka',
          text: 'The underground country, and the iron door where the Norka slept.',
        },
        {
          kind: 'text',
          text: 'His brothers, waiting above, got tired of holding the rope. They hauled it up and went home to claim the reward, leaving the youngest prince a hundred fathoms under the earth. He was not troubled long. A great friendly eagle lived in that country, and the prince fed him from his own supper, night after night, until the eagle offered to carry him up. "Feed me on the way," said the eagle, "and hold tight." Twice the prince fed him all he carried; the third time he gave the last piece of meat and kept nothing, and the eagle gave one great upward beat of his wings and set him down in his father’s garden, in time to see his brothers’ reward turn to shame. The Czar honoured his youngest son above all, and the three princesses came up from the underground world, and the youngest prince married the youngest princess, and everyone heard the story at every feast forever after.',
        },
        {
          kind: 'note',
          text: 'New word: fathom — an old measure, about as long as a man is tall. A hundred fathoms of rope is a very long way down.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 5 · Bushy Bride',
      art: 'red-bride',
      artPrompt: 'a moonlit riverside castle with a white duck gliding on silver water toward a lit window, inside the window a shadowy girl with an enormous bushy wig of hair, a golden ring gleaming on the windowsill, deep blue night with silver ripples',
      blocks: [
        {
          kind: 'text',
          text: 'There was once a girl who was going across the sea to marry a prince she had never seen, for their fathers had promised it long ago, and the promise was a good one. She travelled with her elder stepsister, who smiled sweetly and thought black thoughts, and watched her the whole voyage the way a cat watches a bird. Halfway over the water, the elder sister pushed the true bride over the side, and took her clothes and her name, and told the prince that this — herself, in borrowed finery — was his bride, though nature had played her a trick: her hair was so bushy that no wind nor comb could ever tame it.',
        },
        {
          kind: 'text',
          text: 'The true bride did not drown. A kind old boatman pulled her out of the water, and the sea-fairy of that coast, pitying her, changed her into a soft white duck, so she could live on the water near the castle and be warm and fed. Every evening she swam to the castle wall, and a young page boy who fed the castle birds noticed her among the others, and saved the best of his barley for her; and she ate from his hand, and was not entirely unhappy — ducks are good at making the best of things.',
        },
        {
          kind: 'image',
          art: 'red-bride',
          text: 'The white duck at the castle wall, and the golden ring on the sill.',
        },
        {
          kind: 'text',
          text: 'Three nights before the wedding, the false bride began to be frightened, for the palace had a way of finding people out. She had bad dreams, and shaved her head to cure them, and looked less like a bride than ever. On the last night the white duck swam up to the window, put her bill to the sill, and became a girl again in the moonlight. The prince, who could not sleep for doubts, saw everything — and saw the sea-fairy place in the true bride’s hand the golden ring she had worn on the ship. In the morning he called both girls before him, with the whole court watching, and nobody hurried him, for the prince looked as if he meant it. "Show me the ring that came across the sea," he said. One hand was bare. The other shone. The bushy bride was sent home to think about honesty, which took her a long time, and the true bride was married to the prince that very day, with the page boy as ring-bearer and the sea glittering all the way to the church.',
        },
        {
          kind: 'note',
          text: 'New word: ring-bearer — the person who carries the wedding rings. This one had helped feed a duck, which turned out to be excellent judgement.',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Red Fairy Book',
    author: 'Andrew Lang (ed.)',
    authorDeathYear: 1912,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Stories as retold in Lang’s colour fairy book (1890), edited and translated from older public-domain European tales. Published 1890; US public domain (pre-1929) and worldwide (Lang d. 1912, 70y pma expired). Plots followed, wording simplified for children.',
  },
}
