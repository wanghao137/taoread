import type { PackBook } from '../types'

/**
 * Japanese Fairy Tales — Yei Theodora Ozaki (1871–1932), first published 1908.
 * Eight tales retold for young readers, one per chapter: Momotaro, or the Story
 * of the Son of a Peach; The Urashima Taro (retold with a gentler ending);
 * The Tongue-Cut Sparrow (the sparrow's mishap softened); and The Mouse's
 * Wedding. Plots follow the public-domain originals.
 * Source: Japanese Fairy Tales (Yei Theodora Ozaki, 1908), public domain
 * (Ozaki d. 1932; EU pma expired 2003).
 */
export const japaneseFairyTales: PackBook = {
  id: 'ozaki-japanese',
  title: 'Japanese Fairy Tales',
  author: 'Yei Theodora Ozaki',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro:
    'Eight beloved Japanese tales: Momotaro, born from a peach, who marches to Oni Island with a dog, a monkey and a pheasant; the fisher Urashima Taro, who saves a tortoise and visits the Dragon Palace under the sea; a sparrow who repays an old man’s kindness; and the mouse parents who search the world for the mightiest son-in-law — and find him close to home.',
  coverArt: 'ozaki-peach',
  coverArtPrompt:
    'A giant glowing peach drifts down a sunlit mountain stream toward a smiling old washerwoman who kneels to catch it, pink blossom petals on the water; behind her, far hills, a torii gate and a little thatched farmhouse, peach trees in full bloom on the banks. Warm pink-and-gold spring light, joyful storybook style.',
  coverFrom: '#F06292',
  coverTo: '#FFF9C4',
  source: 'Japanese Fairy Tales (Yei Theodora Ozaki, 1908), public domain',
  chapters: [
    {
      title: 'Chapter 1 · Momotaro, or the Story of the Son of a Peach',
      art: 'ozaki-momotaro',
      artPrompt:
        'A small brave boy in a peach-patterned vest marches up a green mountain path waving a banner, a spotted dog at his heel carrying the satchel, a monkey tumbling playfully alongside and a pheasant flying overhead; cherry trees and a distant island fort in sea mist. Bright adventurous morning light, cheerful dynamic storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'Long ago an old woman went to the river to wash clothes, and down the stream came the biggest peach she had ever seen.',
        },
        {
          kind: 'text',
          text: 'She carried it home, and when she and her old husband cut it open — out stepped a fine baby boy! They named him Momotaro, Son of a Peach, and loved him with all their hearts.',
        },
        {
          kind: 'text',
          text: 'When Momotaro grew up, he heard of the oni — the naughty ogres of Oni Island — who stole the villagers’ treasures. "I will fetch them back," he said, and set off with the best millet dumplings in Japan.',
        },
        {
          kind: 'image',
          art: 'ozaki-momotaro',
          text: 'Momotaro marches to Oni Island with dog, monkey and pheasant.',
        },
        {
          kind: 'note',
          text: 'New word: oni — an ogre, a big noisy troublemaker of Japanese tales.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'A dog, a monkey and a pheasant each begged for a dumpling and joined him. When the oni saw such a determined little band, they gave up their stolen treasure at once, promised to be good, and Momotaro carried the jewels and the silver home in triumph to his old parents.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Urashima Taro',
      art: 'ozaki-urashima',
      artPrompt:
        'An underwater Dragon Palace of coral and mother-of-pearl: a young fisherman in country clothes gazes in wonder at a graceful sea princess who welcomes him beneath towering shell gates, golden fish streaming past like banners, the sea floor glittering with treasure chests; jellyfish lanterns hang in the blue. Luminous aqua-gold palette, dreamy magnificent storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'Urashima Taro was the kindest fisherman on the shore. One day he saw boys teasing a poor tortoise, and bought its freedom with the day’s catch.',
        },
        {
          kind: 'text',
          text: 'The tortoise, most grateful of creatures, said, "Come and see the Dragon Palace under the sea," and carried him down through the blue water.',
        },
        {
          kind: 'text',
          text: 'The palace was more splendid than a dream: walls of coral, gates of pearl, and the Princess Otohime to welcome him. Fish streamed by like banners, and every day was a festival.',
        },
        {
          kind: 'image',
          art: 'ozaki-urashima',
          text: 'Otohime welcomes Urashima Taro to the Dragon Palace.',
        },
        {
          kind: 'note',
          text: 'New word: festival — a day of feasting and celebration.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'After what seemed three happy days, Urashima remembered his old parents and his village, and went home. But under the sea the years flow differently, and three hundred had passed. He opened the princess’s parting gift, the little lacquer box — and white mist swirled round him, and his hair turned silver as foam. And the tortoise rose from the waves and said, "The palace has kept your place by the Princess all these years — come back where your story is remembered." And Urashima climbed on the tortoise’s back and returned to the sea, where they say he smiles to this day, the honoured guest of the Dragon King.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Tongue-Cut Sparrow',
      art: 'ozaki-sparrow',
      artPrompt:
        'A sparrow’s bamboo home inside a hollow tree, door open in welcome: a gentle old man bows as a cheerful sparrow in a tiny kimono offers him a small humble wicker basket, sparrows bowing in a line behind; sun-dappled forest clearing, petals drifting. Soft green-gold light, courteous sweet storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'An old man kept a pet sparrow, and loved it like his own child. But the old woman of the house was cross, and one day she shooed the sparrow so roughly that its little tongue was hurt — and the frightened bird flew away.',
        },
        {
          kind: 'text',
          text: 'The old man searched the forest, calling, until he came to the sparrow’s bamboo home, where the sparrow lived safe and well with all its sparrow family.',
        },
        {
          kind: 'text',
          text: 'The sparrows feasted him kindly and offered him a choice of baskets. "Take the small one," said the sparrow, "it holds what is best."',
        },
        {
          kind: 'image',
          art: 'ozaki-sparrow',
          text: 'The sparrow in her tiny kimono offers the small basket.',
        },
        {
          kind: 'note',
          text: 'Ask your child: the old man took the small basket. Was that greedy or wise?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'In the small basket were gold coins and bolts of silk — enough for a gentle old age. The old woman, hearing this, hurried for the big basket instead; but it held nothing but dry leaves, which scattered to the wind. She went home and apologized to the old man, and the sparrow came back to sing on their eaves every morning after.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Mouse’s Wedding',
      art: 'ozaki-mice',
      artPrompt:
        'A joyful mouse wedding procession under a full moon: bride and groom mice in tiny ceremonial kimono ride in a palanquin of woven grass carried by four mice attendants, lanterns strung between rice stalks, drummers drumming on acorn caps; the full moon smiles over the rice field. Silver-blue night with warm lantern gold, festive whimsical storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'Papa Mouse and Mama Mouse had one beloved daughter, and when she grew up they set out to find the mightiest bridegroom in the world.',
        },
        {
          kind: 'text',
          text: 'They climbed to the Sun. "You are mightiest," they said. But the Sun sighed, "A cloud can cover me — ask the Cloud." And the Cloud said, "The Wind pushes me — ask the Wind." And the Wind said, "I cannot blow through a Wall — ask the Wall."',
        },
        {
          kind: 'text',
          text: 'And the Wall listened politely and said, "I fear only the mouse who lives behind me. Ask him."',
        },
        {
          kind: 'image',
          art: 'ozaki-mice',
          text: 'The mouse parents ride home: the mightiest groom was behind the wall.',
        },
        {
          kind: 'note',
          text: 'Ask your child: which is mightiest — the Sun, the Cloud, the Wind, the Wall, or the little mouse? Why?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'So the mightiest bridegroom in all the world turned out to be the fine young mouse next door. And the wedding was held under the full moon, with lanterns between the rice stalks, and the whole field was invited.',
        },
      ],
    },
    {
      title: 'Chapter 5 · The Happy Hunter and the Skillful Fisher',
      art: 'ozaki-hunter',
      artPrompt:
        'A young man in country dress welcomed into a glowing underwater palace of coral and pearl, a kindly Sea King in white robes holding out a lost golden fish-hook on a shell cushion, golden fish circling like lanterns, luminous blue-green light, magnificent dreamy storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'Long ago two brothers lived by the sea. The elder was the Skillful Fisher, and his line never came home empty. The younger was the Happy Hunter, who roamed the green mountains all day and came home singing.',
        },
        {
          kind: 'text',
          text: 'One day the Happy Hunter said, "Let us trade tools today — you take my bow, and I will take your fish-hook." But on the water the hook slipped from his hand and sank into the sea, and the Skillful Fisher was very angry. "My hook! Find it, or never come back!" And the Happy Hunter sat down by the shore and wept.',
        },
        {
          kind: 'image',
          art: 'ozaki-hunter',
          text: 'The Dragon Palace under the sea, where the lost hook is found at last.',
        },
        {
          kind: 'text',
          text: 'Then an old man of the sea came by. "Why weep, my son? Go down to the Dragon Palace under the waves, and all will be well." So the Happy Hunter went down through the blue water, and the Sea King welcomed him and gave a feast, and his daughter led the dancers for joy.',
        },
        {
          kind: 'text',
          text: 'The Sea King called all the fish of the sea together, and there, in the throat of a great red fish, lay the lost hook! The Happy Hunter carried it home in triumph, gave it back with a hundred sorry words, and the two brothers fished and hunted side by side ever after.',
        },
        {
          kind: 'note',
          text: 'Ask your child: the Happy Hunter lost something that was not his. What did he do next? He said sorry — and made it right.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 6 · The Jelly Fish and the Monkey',
      art: 'ozaki-jellyfish',
      artPrompt:
        'A sad round jellyfish drifting before the Sea King’s coral throne while the crowned Sea King raises his trident in anger, a monkey high in a pine tree on a green island far above the water laughing and waving, blue-green sea light, gentle comic storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'Far down under the sea, in a palace of coral, the Sea King and the Sea Queen lived happily — until the Queen fell ill. The Sea King sent for the wisest doctors of the deep, and they said, "Only one thing can cure her: the liver of a living monkey."',
        },
        {
          kind: 'text',
          text: 'Now, in those days the jelly fish had a fine hard shell, and he could swim to shore as well as paddle the deep. So off he went, and found a monkey in a pine tree on an island. "Come to the Dragon Palace!" said the jelly fish, and carried him out to sea on his broad back.',
        },
        {
          kind: 'text',
          text: 'Halfway over, the monkey asked what the visit was for. The jelly fish was too honest to tell a fib — and out came the truth about the liver. The monkey laughed. "Poor fish! I keep my liver hanging in a pine tree on the shore. Carry me back, and I will fetch it." And the moment the tree was reached, up leaped the monkey, safe in the branches, laughing at the trick.',
        },
        {
          kind: 'image',
          art: 'ozaki-jellyfish',
          text: 'The empty-handed jelly fish faces the Sea King — and loses his bones for it.',
        },
        {
          kind: 'text',
          text: 'The Sea King was so angry that he beat the jelly fish until every bone and bit of shell was gone — and that is why, to this day, jelly fishes drift soft and boneless through the sea, like little umbrellas with nothing inside.',
        },
        {
          kind: 'note',
          text: 'This is a why-story: it tells why jelly fishes are soft today. The little jelly fish kept faith and told the truth — and Japan’s storytellers have loved him for it ever since.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 7 · The Ogre of Rashomon',
      art: 'ozaki-rashomon',
      artPrompt:
        'A huge weathered wooden city gate at twilight, a brave samurai with a drawn sword beside a great shaggy ogre arm lying on the stones, an old woman with a basket transforming into a winged ogre rising into storm clouds with an iron box, lantern glow, dramatic but friendly storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'Long ago in the old capital there stood a great wooden gate called Rashomon — and after dark, everyone gave it a wide berth, for an ogre lived in the shadow of it and troubled the city.',
        },
        {
          kind: 'text',
          text: 'One evening a brave young warrior named Watanabe rode home past the gate. Suddenly a hairy hand reached out of the dark and gripped his helmet. Out flashed his sword — swish! — and the hand and arm dropped to the ground, while the ogre ran howling into the night. Watanabe carried the great arm home and locked it in a strong iron box, and everyone said, "What a hero!"',
        },
        {
          kind: 'image',
          art: 'ozaki-rashomon',
          text: 'The old nurse asks to see the arm — just once.',
        },
        {
          kind: 'text',
          text: 'But the ogre wanted his arm back. One day an old woman came calling — Watanabe’s own old nurse. "Let me see the ogre’s arm," she begged, "just once!" And the moment the box was opened, she seized it, and grew tall, and terrible, and rose up through the roof into the sky on wings of storm.',
        },
        {
          kind: 'text',
          text: 'Watanabe was sad to lose his prize, but the tale says the ogre never dared come back to Rashomon again. And the warriors of the city learned this: after a victory, take care — for a trick may follow a triumph.',
        },
        {
          kind: 'note',
          text: 'New word: triumph — a great victory. Ask your child: what was the old nurse really? And what should Watanabe have checked before he opened the box?',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 8 · The Old Man Who Made Withered Trees to Flower',
      art: 'ozaki-blossom',
      artPrompt:
        'An old man scattering pale grey ash from a wooden box over bare cherry trees that burst into clouds of white blossom as it falls, a delighted lord and servants watching from a veranda, a scowling neighbour far off in the lane, spring morning light, joyful storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'A kind old couple had one faithful friend — their dog Shiro, who went everywhere with the old man. One day Shiro scratched and barked at a corner of the field, crying "Dig here! Dig here!" And there, under the earth, the old man found a chest full of gold.',
        },
        {
          kind: 'text',
          text: 'A cross neighbour heard of it and borrowed Shiro. But under his cross digging there was no gold at all — only mud and old bones. He was so angry that he used the little dog so roughly that Shiro never came home again. The old pair wept, and buried their friend with tears under the garden pine.',
        },
        {
          kind: 'text',
          text: 'The pine grew tall and fine, and from its wood the old man made a little hand-mill. When rice was ground in it, gold dropped out instead! The neighbour borrowed that, too — but out came only filth, so he threw the mill on his fire. Then the old man gathered the ashes in a box.',
        },
        {
          kind: 'image',
          art: 'ozaki-blossom',
          text: 'The magic ashes fall — and the bare trees burst into flower.',
        },
        {
          kind: 'text',
          text: 'Now it happened that the lord of the land was sad, for his cherry trees would not bloom. The old man scattered his ashes — and every withered tree burst into flower at once! The lord heaped gifts upon him. The greedy neighbour tried the very same trick, but his ashes only filled the great man’s eyes with dust, and he was driven from the road in disgrace.',
        },
        {
          kind: 'note',
          text: 'Ask your child: the same ashes made trees bloom for the kind man and only dust for the greedy one. Why, do you think?',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Japanese Fairy Tales',
    author: 'Yei Theodora Ozaki',
    authorDeathYear: 1932,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Eight tales retold for young readers. Published 1908; US public domain (pre-1929) and PD in the EU (Ozaki d. 1932, 70y pma expired 2003). The Urashima Taro ending is softened to a gentle homecoming in the sea palace.',
  },
}
