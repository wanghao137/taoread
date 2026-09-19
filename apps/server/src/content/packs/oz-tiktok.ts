import type { PackBook } from '../types'

/**
 * Tik-Tok of Oz — L. Frank Baum (1856–1919), first published 1914. Retold in
 * five chapters in simple English for readers aged 6-8: shipwrecked Betsy
 * Bobbin and her mule Hank wind up Tik-Tok the copper man, march with Queen
 * Ann's tiny army, tumble through the Hollow Tube to the other side of the
 * world, and come home the long way — through Oz. Source: public domain text
 * (published 1914, US pre-1929; Baum d. 1919).
 */
export const ozTiktok: PackBook = {
  id: 'oz-tiktok',
  title: 'Tik-Tok of Oz',
  author: 'L. Frank Baum',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'Betsy Bobbin and her mule Hank are shipwrecked on a strange shore, where they find a copper man who has run down. With Queen Ann\'s tiny army and the Shaggy Man, they tumble to the other side of the world — and march home through Oz.',
  coverArt: 'tiktok-copper',
  coverArtPrompt: 'a round copper mechanical man with three wind-up keys in his back standing kindly on a tropical beach, a small girl in a travel coat and a grey mule beside him, turquoise waves and palm trees behind, copper plates glowing in warm late-afternoon sun, gentle sand and shell details, friendly storybook illustration',
  coverFrom: '#B45309',
  coverTo: '#FDBA74',
  source: 'Tik-Tok of Oz (L. Frank Baum, 1914), public domain (Baum d. 1919)',
  chapters: [
    {
      title: 'Chapter 1 · Betsy Bobbin and Hank',
      art: 'tiktok-shore',
      artPrompt: 'a small girl in a travel coat and a grey mule with a sandy mane wading ashore from a broken shipwreck on a tropical beach, driftwood and crates in the surf, a gleaming still copper man standing like a statue among the palms ahead, bright morning light on turquoise water, hopeful storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'Betsy Bobbin sailed the ocean with her old friend Hank, a small grey mule. One night a storm cracked the ship like a walnut, and Betsy clung to Hank\'s neck as the waves carried them in.',
        },
        {
          kind: 'image',
          art: 'tiktok-shore',
          text: 'Betsy and Hank wade ashore to a strange new land.',
        },
        {
          kind: 'text',
          text: 'They came ashore at dawn, soggy but safe. Among the palms stood a man made all of copper, still as a statue. A plate on his back said: Tik-Tok — and beside it hung three little keys.',
        },
        {
          kind: 'note',
          text: 'New word: wind up — to turn a key so a clockwork toy can move. Guess together what three keys might start: thinking, speaking, walking.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Betsy turned the keys, one by one. Click, click, click. "I am your ser-vant," said Tik-Tok, in a slow, tick-tock voice. "Where shall we walk?" Betsy laughed for the first time since the storm.',
        },
      ],
    },
    {
      title: 'Chapter 2 · Queen Ann\'s Army',
      art: 'tiktok-army',
      artPrompt: 'a comic little army marching through a green valley — a plump queen in a paper crown on a donkey, officers with grand plumed hats riding behind, one small honest private at the rear carrying the flags, a copper man, a girl and a mule joining the line, tall ferns and volcanic peaks, bright cheerful daylight, humorous storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'The road led to Oogaboo, a small valley ruled by Queen Ann Soforth. The Queen had raised an army of sixteen officers — and just one private, named Files. "We shall conquer the world!" she cried.',
        },
        {
          kind: 'image',
          art: 'tiktok-army',
          text: 'Queen Ann\'s army, with one private and no soldiers.',
        },
        {
          kind: 'text',
          text: 'Tik-Tok was counted into the army as a private. Betsy and Hank marched too, because nobody could think of a reason to leave them behind. The Shaggy Man joined at the gate, carrying a little golden Love Magnet.',
        },
        {
          kind: 'note',
          text: 'Ask your child: what makes an army? The Queen had officers but no soldiers. Talk about what the army was really missing.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"I am not marching to conquer," said the Shaggy Man quietly. "I am looking for my brother, who was taken underground by the Nome King." The Queen snorted — but the road to the Nome King\'s kingdom was the road she wanted anyway.',
        },
      ],
    },
    {
      title: 'Chapter 3 · Down the Hollow Tube',
      art: 'tiktok-tube',
      artPrompt: 'friends sliding helplessly down an enormous glowing glass tube through the darkness inside the earth, a girl and a mule and a copper man tumbling among officers and flags, soft blue and violet light rippling along the curved walls, stars of cave light rushing past, breathless but wondrous storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'In the underground kingdom sat the Nome King on his throne of gold. He heard the Shaggy Man ask for his brother, and his eyes grew narrow. "The brother?" he said. "I remember him. He asked too many questions."',
        },
        {
          kind: 'image',
          art: 'tiktok-tube',
          text: 'The Hollow Tube swallows the whole party.',
        },
        {
          kind: 'text',
          text: '"Enough visitors," snapped the King, and pulled a lever. The floor opened, and down slid the whole party — Betsy, Hank, Tik-Tok, the Queen, the officers, and the Shaggy Man — into the Hollow Tube that runs through the middle of the world.',
        },
        {
          kind: 'note',
          text: 'Hold on tight like Betsy. What would it feel like to slide toward the very centre of the earth? Think of three words together.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'They slid and slid, around the bend of the world. Then, softly, they landed in a heap of flags and officers on the other side — in a country no one from the surface had ever seen.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Other Side of the World',
      art: 'tiktok-jinjin',
      artPrompt: 'a serene crystal hall on a strange sunlit world, a tall calm ruler with kind ancient eyes seated among soft lights, travellers including a small girl and a copper man standing respectfully before him, tall three-legged locals and one-horned townsfolk watching from the doors, pearlescent light everywhere, dignified storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'That country belonged to the Great Jinjin, Tititi-Hoochoo, who hears everything that passes through the Tube. "Someone has used the Tube against my law," he said calmly. "Someone will undo it."',
        },
        {
          kind: 'image',
          art: 'tiktok-jinjin',
          text: 'The Great Jinjin hears everything under the earth.',
        },
        {
          kind: 'text',
          text: 'He was not angry with Betsy and her friends. But the Nome King had broken the oldest law of the Tube, and the Jinjin knew exactly how to answer. He called for Quox — a very young dragon with an enchanted lozenge on his back.',
        },
        {
          kind: 'note',
          text: 'New word: lozenge — a flat, sweet-shaped charm. Quox carries his like a medal. Draw what a dragon medal might look like.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"Send the dragon through the Tube," said the Jinjin, "and let the tunnel carry him home." Quox yawned, blinked his sleepy eyes, and slid away into the dark, humming a small dragon song.',
        },
      ],
    },
    {
      title: 'Chapter 5 · Quox and the New King',
      art: 'tiktok-quox',
      artPrompt: 'a friendly young dragon with a glowing lozenge on its back sliding back up a great glass tube into a golden cavern, a stout gnome king below clutching his head as the charm takes his memory away, kind nomes bowing to a new calm-faced king, warm ruby and gold light, hopeful storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'Quox popped out of the Tube right in the Nome King\'s throne room. The lozenge on his back split open like a sunrise — and the Nome King forgot every wicked plan he had ever had.',
        },
        {
          kind: 'image',
          art: 'tiktok-quox',
          text: 'Quox arrives, and the old king forgets his anger.',
        },
        {
          kind: 'text',
          text: '"What was I angry about?" the old king asked, puzzled. Nobody could remember either. So the kind nome Kaliko was crowned, and the first thing the new king did was open every door and every dungeon.',
        },
        {
          kind: 'note',
          text: 'Talk about it: nobody was hurt, and everybody went home. What is the kindest way you know to end a quarrel?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Down a quiet stairway came the Shaggy Man\'s brother, wearing a metal mask no more. And Ozma of Oz, who had watched everything in her Magic Picture, unrolled a magic carpet over the desert, so Betsy and Hank could walk to Oz.',
        },
        {
          kind: 'text',
          text: 'Betsy looked at the Emerald City, and at Dorothy waving on the wall, and made up her mind on the spot. "We are staying," she told Hank. And Tik-Tok clicked his copper heels, which was his way of cheering.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Tik-Tok of Oz',
    author: 'L. Frank Baum',
    authorDeathYear: 1919,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Published 1914; US public domain (pre-1929). Retold for children aged 6-8; plot follows the public-domain original.',
  },
}
