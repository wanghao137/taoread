import type { PackBook } from '../types'

/**
 * Ozma of Oz (L. Frank Baum, 1907) — six chapters retold in simple English for
 * readers aged 6–8. Text: Project Gutenberg eBook #33361. Public domain in the
 * US (pre-1929) and worldwide (Baum died in 1919). Plot and characters
 * (Dorothy, the yellow hen Billina, Tik-Tok, the Wheelers, Princess Langwidere,
 * the Nome King, Ozma) follow the original book; only the wording is shortened
 * and simplified.
 */
export const ozmaOfOz: PackBook = {
  id: 'tale-ozma',
  title: 'Ozma of Oz',
  author: 'L. Frank Baum',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'A storm at sea washes Dorothy and a little yellow hen onto a strange shore. There she finds a copper man, a vain princess with a closet full of heads, and a Nome King who has turned a whole royal family into ornaments.',
  coverArt: 'ozma-of-oz-cover',
  coverArtPrompt: 'a kind girl in a blue and white checked dress standing in a glittering emerald city beside a fairy princess with a green crown, a yellow hen at their feet and a copper mechanical man behind them, sparkling spires, jewel-bright storybook art',
  coverFrom: '#1A5276',
  coverTo: '#AED6F1',
  source: 'Project Gutenberg eBook #33361, public domain (Baum d. 1919)',
  chapters: [
    {
      title: 'Chapter 1 · The Storm and the Chicken Billina',
      art: 'dorothy-chicken-coop-storm',
      artPrompt: 'a wooden chicken coop floating on great green waves under a stormy sky, a girl in a blue dress and a little yellow hen peering out between the slats, white foam and distant lightning, dramatic but hopeful storybook scene',
      blocks: [
        {
          kind: 'text',
          text: 'Dorothy Gale was sailing on a big ship with her Uncle Henry. One night the wind began to howl and the sea rose up in great green mountains. The ship rolled and pitched, and everyone tied themselves to the rails.',
        },
        {
          kind: 'image',
          art: 'billina-coop-waves',
          text: 'Dorothy and the yellow hen float away in the chicken coop.',
        },
        {
          kind: 'text',
          text: 'A big wave washed over the deck and carried Dorothy away — luckily she fell into a wooden chicken coop that floated beside the ship! Inside was a little yellow hen, who was not a bit frightened.',
        },
        {
          kind: 'note',
          text: 'New word: coop — a small wooden house where chickens live. Dorothy\'s coop became her little boat.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"My name is Billina," said the hen, "and I lay an egg every morning." "My name is Dorothy," said the girl, "and I come from Kansas." They floated all night on the dark sea, and in the morning the coop washed up on a sunny beach.',
        },
        {
          kind: 'text',
          text: 'Dorothy stepped out onto the sand. Behind her was the sea, and before her were trees and rocks and a strange new land. It was the Land of Ev, next door to the Land of Oz.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Wheelers and Tik-Tok',
      art: 'tiktok-wheelers',
      artPrompt: 'a round copper mechanical man with a wind-up key in his back standing on a rocky shore, a girl and a yellow hen behind him, odd wheeled creatures with wheels for hands and feet fleeing in the background, bright curious storybook art',
      blocks: [
        {
          kind: 'text',
          text: 'On a rock by the shore Dorothy read these words: BEWARE THE WHEELERS! "What can the Wheelers be?" she wondered. Soon she found out: strange men with wheels instead of hands and feet, who rolled after her as fast as they could.',
        },
        {
          kind: 'image',
          art: 'tiktok-copper-man',
          text: 'Tik-Tok the copper man stands between Dorothy and the Wheelers.',
        },
        {
          kind: 'text',
          text: 'Dorothy and Billina ran into a little cave — and there stood a man made all of bright copper. On a plate on his back it said: Tik-Tok. "I am your hum-ble ser-vant," said Tik-Tok, in a slow, clicking voice. "Please wind me up."',
        },
        {
          kind: 'note',
          text: 'New word: wind up — to turn a key or handle so a clockwork toy can move. Tik-Tok thinks and speaks and walks, but only when he is wound.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Dorothy found the keys and wound Tik-Tok\'s three wheels — one for thinking, one for speaking, one for walking. Then Tik-Tok marched out and told the Wheelers to behave. The Wheelers were scared of the copper man, and promised to be good.',
        },
        {
          kind: 'text',
          text: '"The royal family of this land is imprisoned by the Nome King," said Tik-Tok. "Only a ruler lives in the palace now — Princess Langwidere." So they set out together along the road to the royal palace of Ev.',
        },
      ],
    },
    {
      title: 'Chapter 3 · Princess Langwidere\'s Head Cabinet',
      art: 'langwidere-head-cabinet',
      artPrompt: 'a grand mirrored room with a tall cabinet whose shelves hold a row of beautiful heads with different hair and faces, a vain princess holding a ruby key on her wrist, a girl and a yellow hen watching in amazement, ornate storybook scene',
      blocks: [
        {
          kind: 'text',
          text: 'Princess Langwidere was very vain. She kept her room full of mirrors so she could admire herself all day long. She was not beautiful — but she owned something wonderful: a cabinet full of heads.',
        },
        {
          kind: 'image',
          art: 'langwidere-mirrors',
          text: 'The cabinet of heads, and Princess Langwidere with her ruby key.',
        },
        {
          kind: 'text',
          text: '"I never wear the same head two days running," the Princess said. "This one has red hair, and that one has black, and that one has golden curls. You may look, but you must not touch." Dorothy thought it was the strangest thing she had ever seen.',
        },
        {
          kind: 'note',
          text: 'New word: cabinet — a cupboard with shelves, often with glass doors so you can see inside.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"Give me your head," said Langwidere suddenly, "and I will give you one of mine." Dorothy was angry. "No!" she said. "I shall keep my own head, thank you!"',
        },
        {
          kind: 'text',
          text: 'Just in time, a grand carriage rolled up to the palace. Out stepped Ozma, the fairy Princess of Oz, with a band of brave friends. Ozma told Langwidere to be polite to her guests — and the Princess, who was really a coward, bowed low and said nothing more.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Nome King\'s Ornaments',
      art: 'nome-king-ornaments',
      artPrompt: 'a glittering underground cavern with ruby-lit pillars, a little fat king in a red robe on a stone throne, shelves of shining ornaments — a golden pot, a emerald cat, a silver horse — beginning to glow and soften, brave children watching, magical storybook art',
      blocks: [
        {
          kind: 'text',
          text: 'The Nome King lived deep underground, in a palace of rock and gold. Long ago he had taken the Queen of Ev and all her children prisoner, and changed them into ornaments for his rooms — a golden pot here, a green cat there, a silver horse on a shelf.',
        },
        {
          kind: 'image',
          art: 'nome-king-cavern',
          text: 'The ornaments in the Nome King\'s cavern begin to come alive.',
        },
        {
          kind: 'text',
          text: 'The Nome King loved riddles. "Guess which ornament was once a person," he said, "and I will give it back to you. Guess wrong, and you will become an ornament too!" One by one Ozma\'s friends guessed, and one by one they were changed — until only Dorothy was left.',
        },
        {
          kind: 'note',
          text: 'New word: ornament — a small pretty object used to decorate a room. The Nome King had a whole palace of them.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Then Dorothy remembered: eggs are poison to nomes! Brave Billina laid an egg right on the Nome King\'s throne, and the King was so afraid he could not move. Dorothy picked up the egg, and her wish was so strong that the magic of the cavern broke.',
        },
        {
          kind: 'text',
          text: 'All at once the ornaments began to soften and grow. The golden pot became a girl, the green cat became a prince, the silver horse became a nobleman — and the Queen of Ev and all her children were free at last.',
        },
      ],
    },
    {
      title: 'Chapter 5 · The Magic Belt',
      art: 'nome-king-magic-belt',
      artPrompt: 'a girl in a blue dress fastening a wide jeweled belt around her waist in a glittering cavern, a little fat king watching sourly from his throne, a yellow hen and a copper man beside her, bright magical light',
      blocks: [
        {
          kind: 'text',
          text: 'The Nome King was beaten, but he was still angry. "Take the royal family and go," he growled, "but leave my palace!" The Queen of Ev thanked Dorothy and Ozma again and again, and all the prisoners climbed up out of the dark cavern.',
        },
        {
          kind: 'image',
          art: 'dorothy-magic-belt',
          text: 'Dorothy puts on the Nome King\'s magic belt.',
        },
        {
          kind: 'text',
          text: 'Before she left, Dorothy looked back. The Nome King\'s magic belt had fallen from his waist in all the fuss. Dorothy picked it up and buckled it around her own waist. "This belt is mine now," she said. The Nome King only scowled.',
        },
        {
          kind: 'note',
          text: 'New word: scowl — to draw your brows together and look cross. The Nome King was very good at scowling.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The belt was a wonderful thing: it could carry its wearer anywhere in the wink of an eye. "I shall wear it always," said Dorothy, "so I can go home to Kansas whenever I wish."',
        },
      ],
    },
    {
      title: 'Chapter 6 · Back to the Emerald City',
      art: 'ozma-emerald-city-return',
      artPrompt: 'a girl in a blue dress and a fairy princess with a green crown walking hand in hand through shining green gates into a city of emerald towers, a yellow hen and a copper man behind them, happy citizens waving flags, brilliant storybook art',
      blocks: [
        {
          kind: 'text',
          text: 'Dorothy said good-bye to the Queen of Ev and all the people of that land. Then Ozma took her hand, and Tik-Tok and Billina came along, and they rode in Ozma\'s carriage all the way to the Emerald City of Oz.',
        },
        {
          kind: 'image',
          art: 'emerald-city-gates',
          text: 'Dorothy and Ozma enter the shining gates of the Emerald City.',
        },
        {
          kind: 'text',
          text: 'The streets were paved with green marble and the houses were set with emeralds. Everyone cheered to see their fairy Princess home again — and to meet Dorothy of Kansas, who had helped free the royal family of Ev.',
        },
        {
          kind: 'note',
          text: 'New word: emerald — a beautiful green jewel. The Emerald City glittered with them from roof to street.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Dorothy stayed as Ozma\'s guest in the palace for many happy days. But at last she thought of Uncle Henry, far away in Kansas. She touched the magic belt, wished herself home, and in a flash of green light she was there — with Billina at her side.',
        },
        {
          kind: 'text',
          text: '"How was your voyage, Dorothy?" asked Uncle Henry. Dorothy smiled. "It was very wet," she said, "but I made some wonderful friends."',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Ozma of Oz',
    author: 'L. Frank Baum',
    authorDeathYear: 1919,
    jurisdiction: 'US',
    basis: 'pd-us',
    sourceUrl: 'https://www.gutenberg.org/ebooks/33361',
    note: 'Retold in simple English; plot follows the public-domain original.',
  },
}
