import type { PackBook } from '../types'

/**
 * The Emerald City of Oz — L. Frank Baum (1856–1919), first published 1910.
 * Retold in five chapters in simple English for readers aged 6-8: Dorothy
 * brings Aunt Em and Uncle Henry to live in Oz, while the Nome King digs a
 * secret tunnel toward the Emerald City — and the Scarecrow finds the
 * gentlest way to stop him. Source: public domain text (published 1910,
 * US pre-1929; Baum d. 1919).
 */
export const ozEmerald: PackBook = {
  id: 'oz-emerald',
  title: 'The Emerald City of Oz',
  author: 'L. Frank Baum',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'Times are hard on the Kansas farm, so Dorothy brings Aunt Em and Uncle Henry to live in Oz. Far away, the Nome King digs a secret tunnel toward the Emerald City — and the Scarecrow has a clever, quiet plan.',
  coverArt: 'emerald-city',
  coverArtPrompt: 'a shining city of emerald towers seen across green meadows at golden hour, a girl in a gingham dress leading an older farm couple up a flower-lined road toward the gates, a scarecrow in patched clothes and a tin woodman waving welcome, butterflies and poppies in the grass, warm radiant light on emerald walls, welcoming storybook illustration',
  coverFrom: '#1B5E20',
  coverTo: '#81C784',
  source: 'The Emerald City of Oz (L. Frank Baum, 1910), public domain (Baum d. 1919)',
  chapters: [
    {
      title: 'Chapter 1 · Hard Times in Kansas',
      art: 'emerald-family',
      artPrompt: 'a grey dusty Kansas farmyard with wind bending the bare trees, an older farm couple with worried kind faces standing by their porch, a girl in a gingham dress holding a jewelled belt that casts soft green light over the grey scene, a pale rainbow of colour touching the fields, tender storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'On the Kansas farm, times had grown hard. The wind took the topsoil, and the well ran low. Aunt Em and Uncle Henry worked from dawn to dark, and still had little.',
        },
        {
          kind: 'image',
          art: 'emerald-family',
          text: 'Dorothy has a wonderful idea for her aunt and uncle.',
        },
        {
          kind: 'text',
          text: '"Come to Oz with me," said Dorothy, holding up her magic belt. "There is no wind there, and no worry. Ozma will love you." Uncle Henry looked at Aunt Em, and Aunt Em looked at the grey sky. "Let us go," they said.',
        },
        {
          kind: 'note',
          text: 'Ask your child: if you could take someone you love to a magical place, who would you take, and where?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The belt sparkled, the farm whirled away like weather, and when the sparkles settled, they stood on green grass. Ahead, the Emerald City shone like a jewel. Aunt Em sat down on the grass, surprised. "Well, I never," she said.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Wonders of Oz',
      art: 'emerald-wonders',
      artPrompt: 'a joyful procession through an emerald city street, an older couple riding a wooden sawhorse that trots in mid-air, a girl in gingham walking beside them, a scarecrow and a tin woodman and a cowardly lion waving to cheering emerald citizens, flower baskets on jewelled balconies, bright festive light, delightful storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'Dorothy showed them everything. They rode the Sawhorse, a wooden horse that never tires. They met the Scarecrow, wise and patched; the Tin Woodman, kind and shining; and the Cowardly Lion, gentle as a lamb.',
        },
        {
          kind: 'image',
          art: 'emerald-wonders',
          text: 'Aunt Em and Uncle Henry ride the Sawhorse through the city.',
        },
        {
          kind: 'text',
          text: 'The houses were set with emeralds, and nobody locked a door. Nobody was rich, and nobody was poor. In the kitchens, the food cooked itself, and in the gardens the flowers nodded to passers-by.',
        },
        {
          kind: 'note',
          text: 'New word: emerald — a precious green jewel. Count together how many green things you can see from where you sit.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"I could get used to this," said Aunt Em, as the Sawhorse trotted past the fountains. Uncle Henry laughed for the first time in months. Nobody mentioned Kansas at all that evening.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Nome King\'s Tunnel',
      art: 'emerald-tunnel',
      artPrompt: 'a vast underground tunnel of rock and faint ruby glow stretching toward a distant pinpoint of daylight, a stout gnome king in a red robes pointing angrily, ranks of odd allies behind him — squat soldiers with enormous hollow heads, big grey giants, and shadowy hooded figures with fierce eyes, picks and shovels, dim torchlight, brooding storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'Far under the earth, the Nome King was sulking. He had never forgiven the people of Oz — something about a certain egg, long ago. "I will conquer the Emerald City," he growled, "and make its people my slaves."',
        },
        {
          kind: 'image',
          art: 'emerald-tunnel',
          text: 'The Nome King\'s allies dig beneath the Deadly Desert.',
        },
        {
          kind: 'text',
          text: 'He called strange friends: Whimsies with enormous hollow heads, Growleywogs tall as windmills, and the fierce Phanfasms. Day and night they dug a tunnel under the Deadly Desert, straight toward Oz.',
        },
        {
          kind: 'note',
          text: 'New word: conquer — to take over a place by force. In stories, would-be conquerors usually find clever people waiting.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'In the Emerald City, Ozma watched it all in her Magic Picture. The friends gathered quietly in the palace. "No need for swords," said the Scarecrow slowly. "I know what nomes cannot bear. Let us fetch a little water."',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Water of Oblivion',
      art: 'emerald-fountain',
      artPrompt: 'a serene marble fountain in an emerald courtyard, a scarecrow tipping a golden bowl of clear water down a stone stairway into darkness, the water shimmering as it flows, friends standing quietly around, soft green-gold light, calm and unhurried storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'In the palace garden was the Forbidden Fountain. Its water was the Water of Oblivion: one drink, and you forget every anger and every plan. The Scarecrow had it carried, bowl by bowl, and poured into the tunnel.',
        },
        {
          kind: 'image',
          art: 'emerald-fountain',
          text: 'Quiet water flows down the tunnel to meet the diggers.',
        },
        {
          kind: 'text',
          text: 'The water ran softly along the dark passage until it met the diggers. The invaders drank because they were thirsty. And then they stood still, and looked around, and forgot why they had come.',
        },
        {
          kind: 'note',
          text: 'Talk about it: the Scarecrow won without hurting anyone. Can you remember a quarrel that felt smaller the next morning?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"What is this place?" asked the Nome King, scratching his head. Nobody could say — not even him. Ozma came kindly to the tunnel mouth and showed them the road home. They went away peaceful, like a storm that never was.',
        },
      ],
    },
    {
      title: 'Chapter 5 · Home in Oz',
      art: 'emerald-stay',
      artPrompt: 'a cosy emerald palace sitting room in the evening, an older couple settled in deep armchairs by a warm fire, a girl in gingham curled on the rug with a purple kitten, a scarecrow reading aloud by lamplight, rain making silver patterns on the window while the room glows amber, contented storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'The tunnel was sealed up with strong magic, and the desert kept its quiet. In the Emerald City, there was tea, and music, and no hurry at all.',
        },
        {
          kind: 'image',
          art: 'emerald-stay',
          text: 'Aunt Em and Uncle Henry decide to stay in Oz.',
        },
        {
          kind: 'text',
          text: '"Do you miss Kansas?" asked Dorothy one evening. Aunt Em looked at the fire, and at the rain on the window, and at her own two hands, resting. "The farm was hard work and worry," she said. "This feels like home."',
        },
        {
          kind: 'note',
          text: 'Ask your child: what makes a place feel like home? Is it a person, a sound, a smell, or a chair by the fire?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'So Aunt Em and Uncle Henry stayed in the Emerald City for good. And Dorothy, who once longed to run away from her grey prairie, found that her family had come to her. They all lived happily, in a land where nobody needed to be afraid.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Emerald City of Oz',
    author: 'L. Frank Baum',
    authorDeathYear: 1919,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Published 1910; US public domain (pre-1929). Retold for children aged 6-8; plot follows the public-domain original.',
  },
}
