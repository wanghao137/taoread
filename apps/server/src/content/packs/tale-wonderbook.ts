import type { PackBook } from '../types'

/**
 * A Wonder-Book for Girls and Boys — four Greek myths as retold by
 * Nathaniel Hawthorne (1851). Text: Nathaniel Hawthorne, 1851. US public domain
 * (published pre-1929) and worldwide (Hawthorne d. 1864, 70y pma expired).
 * Plots follow Hawthorne's retellings, softened for children aged 6-8.
 */
export const wonderBook: PackBook = {
  id: 'tale-wonderbook',
  title: 'A Wonder-Book for Girls and Boys',
  author: 'Nathaniel Hawthorne',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'Four wonder-tales from long ago, retold gently for young readers: Perseus and the Gorgon’s head, King Midas and the golden touch, Pandora and her box, and the boy Bellerophon flying on the winged horse Pegasus.',
  coverArt: 'wonder-midas',
  coverArtPrompt: 'a jovial bearded king in a golden crown standing in a palace room where a rosebush, a table and everything he touches have turned to shining gold, his little daughter watching from the doorway, warm honey-gold light filling the marble hall',
  coverFrom: '#F9A825',
  coverTo: '#FFF59D',
  source: 'A Wonder-Book for Girls and Boys (Nathaniel Hawthorne, 1851), public domain',
  chapters: [
    {
      title: 'Chapter 1 · The Gorgon’s Head',
      art: 'wonder-gorgon',
      artPrompt: 'a young hero holding up a brightly polished bronze shield like a mirror, gazing only at the reflection, on a rocky shore under a swirling grey sky, a pair of glittering winged sandals on his feet, a small pouch slung at his side, dramatic silver-blue light',
      blocks: [
        {
          kind: 'text',
          text: 'On an island lived a boy named Perseus with his mother, and the king of the island wanted Perseus gone so he could be unkind to her. So the king set him a task he thought no one could do: to bring back the head of Medusa the Gorgon — a strange, wild sister of the far West, at whom no one could look and keep their shape, for looking at her turned people to stone.',
        },
        {
          kind: 'text',
          text: 'Perseus set out along the shore with a heavy heart, and there he met a stranger who was quicker and brighter than other men, with a cap of clouds and a pair of shining sandals. "You will need three things," said the stranger, whose name was Quicksilver. "A mirror, for you must never look at the Gorgon — only at her reflection. Wings for your sandals, so you need not walk home. And a pouch that is never too small."',
        },
        {
          kind: 'image',
          art: 'wonder-gorgon',
          text: 'The polished shield held up like a mirror, so the hero looked only at reflections.',
        },
        {
          kind: 'text',
          text: 'Far in the sunset lands Perseus found the three sisters, and he walked backward toward them the whole way, watching only the shield. When the moment was right, and with his eyes never once lifting to look directly, he finished the task Quicksilver had promised to guide him through, and slipped the head into the pouch that was never too small.',
        },
        {
          kind: 'text',
          text: 'He flew home over the sea with the wind in his sandals. And when the unkind king smirked to see him return empty-handed of any ordinary trophy, Perseus set the pouch on the table and turned it upside down. The king looked — and there he stayed, a stone king in a stone chair, frowning forever at nothing. Perseus and his mother went away together, and lived quietly and well.',
        },
        {
          kind: 'note',
          text: 'Talk together: Perseus never looks straight at what would hurt him — he watches the safe reflection instead. Ask your child: what helps you make a good choice when something looks tempting?',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Golden Touch',
      art: 'wonder-midas',
      artPrompt: 'a delighted bearded king touching a stone table that turns to gleaming gold beneath his fingers, golden roses in a golden vase, plates of golden breakfast untouched, warm rich honey-coloured light with a hint of longing on the king’s face',
      blocks: [
        {
          kind: 'text',
          text: 'King Midas loved gold more than anything else in the world. He counted it in the morning and worried about it at night, and if you had asked him what made a day good, he would have said: a day with more gold in it. One afternoon a stranger with a pleasant, twinkling face sat in his garden, and Midas told him all about his love of the yellow metal.',
        },
        {
          kind: 'text',
          text: '"Very well," said the stranger. "From sunrise tomorrow, whatever you touch shall turn to gold." Midas could hardly sleep for joy. At dawn he touched the bedpost — gold. He touched a twig — gold. He touched his breakfast, and the bread and the milk and the rosy apple all hardened into shining metal, and he sat hungry in a golden chair, telling himself it was still a fine morning.',
        },
        {
          kind: 'image',
          art: 'wonder-midas',
          text: 'Everything Midas touched turned to gold — including breakfast.',
        },
        {
          kind: 'text',
          text: 'Then his little daughter came running into the garden, arms out. And Midas, who could not stop himself in time, touched her. She stood quiet and still, a small golden statue with a loving face. Then, for the first time in his life, King Midas understood what gold was worth. He wept, and he beat his breast, and he begged the twinkling stranger to take the gift away, every bit of it.',
        },
        {
          kind: 'text',
          text: '"Go to the river," said the stranger. "Wash your hands, and bring the water back, and sprinkle it on what you treasure." Midas ran and bathed his hands until the sparkle left them, and carried the water back and sprinkled his daughter — and she laughed, warm and living. After that day Midas loved his garden, and his breakfast, and his little girl, far better than any metal, and the river kept a streak of gold sand that nobody minded.',
        },
        {
          kind: 'note',
          text: 'Talk together: Midas finally learns what he truly loves. Ask your child: if everything you touched turned to gold, what would you miss the very first day?',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Paradise of Children',
      art: 'wonder-pandora',
      artPrompt: 'a sunlit meadow at the edge of the world where children play among flowers and gentle animals, a curious girl kneeling before a small carved wooden box with a spark of light escaping under the lid, a boy watching with wide eyes, soft golden afternoon glow',
      blocks: [
        {
          kind: 'text',
          text: 'Long, long ago, when the world was new, the first children played in a meadow where nobody was ever cross and nobody was ever ill. Their names were Pandora and Epimetheus, and their days were all sunshine, games and ripe fruit. Everything they had was shared, and everything shared was plenty.',
        },
        {
          kind: 'text',
          text: 'One day a stranger left a gift at their cottage door: a small carved box. "Keep it carefully," said the note — and nothing more. The children carried it inside, and set it on the shelf, and looked at it. Pandora was sure she could hear the tiniest stirring inside, like a moth against a lampshade. "It must be jewels," she whispered. "Or butterflies." "It is safest closed," said Epimetheus, who was sensible. But the box seemed to whisper, "Open me," just a little.',
        },
        {
          kind: 'image',
          art: 'wonder-pandora',
          text: 'The little carved box on the shelf, whispering its whisper.',
        },
        {
          kind: 'text',
          text: 'At last Pandora’s fingers lifted the lid, just a crack — and out flew a swirl of little winged troubles, sore-tempered and itchy and gloomy, out the window and away over the world. Pandora cried, and Epimetheus was sorry too, and the cottage felt suddenly smaller. Then they heard a tiny voice from inside the box: "Let me out. I am small, but I am stronger than all of them."',
        },
        {
          kind: 'text',
          text: 'They opened the lid all the way, and out fluttered a gentle creature with kind eyes, who settled on Pandora’s knee. "My name is Hope," she said. "The troubles may visit the world now, but I live in every heart that makes room for me, and where I am, they cannot stay forever." The children wiped their eyes, went out into the meadow, and found the sun still warm and their games still there.',
        },
        {
          kind: 'note',
          text: 'New word: curiosity — the wish to know what is inside, behind or beyond. Pandora’s curiosity opened the box, but it also opened it all the way, which is how Hope got out.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Boy on the Flying Horse',
      art: 'wonder-chimera',
      artPrompt: 'a youth in a simple tunic riding a magnificent white winged horse galloping across a cloud-dappled sky above green mountains, his cloak streaming behind, a distant three-headed creature breathing a small curl of flame on a far hilltop, bright breezy morning light',
      blocks: [
        {
          kind: 'text',
          text: 'High on a green mountain lived a winged horse named Pegasus, snowy white, with a mane like sea-foam, who stamped his silver hooves on the rocks for joy. Many princes came with bridles and ropes to catch him, and every one of them fell asleep by the roadside and woke to find the horse far above them, a white speck among the clouds.',
        },
        {
          kind: 'text',
          text: 'A boy named Bellerophon came too, but he carried no rope. He sat quietly on the hillside for days, and in his dreams a wise voice told him the secret: you do not catch Pegasus — you make a friend of him. So he brought the horse a handful of fresh grass and waited, and waited, until Pegasus drifted down, nostrils wide, and ate from the boy’s hand.',
        },
        {
          kind: 'image',
          art: 'wonder-chimera',
          text: 'Pegasus eating from the boy’s hand: no rope, no trick, just patience.',
        },
        {
          kind: 'text',
          text: 'Far away in a valley there lived a trouble called the Chimera — a creature with three heads and a tail like a serpent, who breathed flames and frightened every village near her mountain. Bellerophon wanted to help, and Pegasus wanted to fly, so together they rose into the sky with the morning wind.',
        },
        {
          kind: 'text',
          text: 'Bellerophon did not fight with fury; he fought with sense. He rode above her, out of reach of the flames, and guided Pegasus in wide, patient circles until the Chimera wore herself out breathing fire at the air. Then, watching his moment, the boy ended the trouble for good, and the villages lit their cook-fires that night without one eye on the mountain. Afterward, Bellerophon never used his wonderful friend as a servant. He brushed the white mane, and shared the best apples, and they flew for the joy of it — which was the whole secret all along.',
        },
        {
          kind: 'note',
          text: 'Talk together: everyone tried to catch Pegasus, but Bellerophon made a friend instead. Ask your child: what is the difference between catching a friend and making one?',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'A Wonder-Book for Girls and Boys',
    author: 'Nathaniel Hawthorne',
    authorDeathYear: 1864,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Four Greek myths as retold in Hawthorne’s public-domain collection (1851); frightening detail softened for young readers. US public domain (pre-1929) and worldwide (Hawthorne d. 1864, 70y pma expired).',
  },
}
