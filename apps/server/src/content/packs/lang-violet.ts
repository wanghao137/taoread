import type { PackBook } from '../types'

/**
 * The Violet Fairy Book (Andrew Lang, ed., 1901) — four tales retold for children,
 * one tale per chapter. The Langs' collection is a 1901 edited translation of
 * public-domain tales (Romanian tales collected by Petre Ispirescu; Serbian tales
 * collected in the 19th century); US public domain (pre-1929) and worldwide
 * (Lang d. 1912, 70y pma expired). Plots follow the 1901 book; wording simplified
 * for readers aged 6-8.
 */
export const langViolet: PackBook = {
  id: 'lang-violet',
  title: 'The Violet Fairy Book',
  author: 'Andrew Lang (ed.)',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'Four wonder-tales from far-away lands, collected in Andrew Lang’s Violet Fairy Book: a princess promised to an enchanted pig, a quest for the water of dawn, a poor hunter with a knife that never misses, and a girl who pretended to be a boy to save her brothers.',
  coverArt: 'violet-dawn',
  coverArtPrompt: 'a young prince on a swift dark horse standing at the edge of a glowing well of dawn light in a misty garden, a single bee resting on the horse’s ear, roses and high hedges catching the first rose-gold rays of sunrise, dreamy violet and gold palette',
  coverFrom: '#4A148C',
  coverTo: '#B39DDB',
  source: 'The Violet Fairy Book (Andrew Lang, ed., 1901), public domain',
  chapters: [
    {
      title: 'Chapter 1 · The Enchanted Pig',
      art: 'violet-pig',
      artPrompt: 'a kind-looking great pig in a fine collar standing in a moonlit palace garden beside a princess in a silver gown, a small book lying open on a stone bench, roses climbing a trellis, gentle silver-blue night light with one lit window behind',
      blocks: [
        {
          kind: 'text',
          text: 'A king went away to the wars and left his three daughters at home, with one strict rule: the lowest room in the palace was never to be opened. As soon as his ship was out of sight, the three sisters went straight to that door — as people do — and the eldest found nothing but an empty hall and a little book. She read the first page aloud: "Our eldest sister will marry a pig from the north." The sisters laughed, closed the book, and said nothing.',
        },
        {
          kind: 'text',
          text: 'But wishes have long ears. That very evening a pig knocked at the palace gate, spoke politely, and asked to sit by the eldest princess. Day after day he came, and he was so patient and gentle that she could not be unkind, and at last they were married, and he carried her off to his fine house in the forest. By day he was a pig; but every night, when his wife slept, he became a man — and in the morning a pig again.',
        },
        {
          kind: 'image',
          art: 'violet-pig',
          text: 'The gentle pig at the gate, with a longer story hidden inside him.',
        },
        {
          kind: 'text',
          text: 'One night the princess woke early and saw her husband in his true shape, a fine young man. She was overjoyed — and she woke him by mistake, and the light of her joy broke the little time his enchantment allowed. "Now I must be a pig by day forever," he said sadly, "unless you can free me. You must wear out three pairs of iron shoes, and find the house of the Red Knight." She did not cry for long. She had three pairs of iron shoes made, and set out walking.',
        },
        {
          kind: 'text',
          text: 'She wore out the first pair coming to the Mother Moon, who fed her on sweets and gave her a golden distaff; the second pair coming to the Mother Sun; the third pair coming to the Mother Wind, who knew every road in the world. "The Red Knight’s house lies over the river," said the Wind, "and my brother the Wind blows for you tonight." The river rose into a bridge of wind and carried her across, and there she found her husband — a pig by day, a prince by night, waiting in the Red Knight’s courtyard. She threw her arms around him and would not let go, and her love broke the spell at last: prince by day and by night. They went home to a wedding that lasted three days and three nights, and the little book in the lowest room was given a shelf of its own.',
        },
        {
          kind: 'note',
          text: 'Talk together: the princess walks until three iron pairs of shoes wear out. Ask your child: what is the longest way you have ever walked, and what kept you going?',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Fairy of the Dawn',
      art: 'violet-dawn',
      artPrompt: 'a young prince leading a swift dark horse through a garden where flowers and guardsmen alike stand frozen in sleep, approaching a small well glowing with rose-gold light beneath a giant rosebush, first rays of sunrise breaking over high hedges, violet and gold morning mist',
      blocks: [
        {
          kind: 'text',
          text: 'There was an emperor who grew old, as emperors do, and a wise voice told him of a single cure: the water in the well where the Fairy of the Dawn bathes, for whoever washes in it grows young again. The Fairy of the Dawn lived in a garden at the edge of the world, where the hedges were taller than towers, and every morning she bathed in her well — and no one who ever looked upon her face woke up again; they only slept, politely and forever.',
        },
        {
          kind: 'text',
          text: 'The emperor’s two elder sons set out with fine horses, and were home in no time: they had looked, and slept, and were carried back snoring, to the great sorrow of the court. Then the youngest son, Petru, asked to go. His father gave him the old horse in the farthest stable — shabby to look at, with kind eyes — and the morning he set out, the horse spread wings no one had noticed and flew.',
        },
        {
          kind: 'image',
          art: 'violet-dawn',
          text: 'The old horse, the sleeping garden, and the well of dawn.',
        },
        {
          kind: 'text',
          text: 'On the road Petru spared the life of a little bee that fell into his drinking cup, and it was a lucky thing, for at the garden gate of dawn the bee flew into the horse’s ear and whispered him the way, and buzzed so busily about the Fairy of the Dawn’s head that she never once looked up. The whole garden lay asleep in the first light — flowers, fountains and guardsmen — and Petru led his horse, step by soft step, to the well that glowed like the inside of a rose. He filled his bottle with the water of dawn and did not look at anything he should not, and flew home.',
        },
        {
          kind: 'text',
          text: 'His brothers were waiting with a plan: they swapped his true bottle for one of plain spring water and told the court he had failed. But the water of dawn knows its own work. When the spring water touched the emperor’s beard, nothing happened at all — and when the true bottle was found (the bee had hidden it in the horse’s ear, being thorough), the emperor washed, and stood up young, and the whole empire had a holiday. Petru was given the crown, and the old winged horse got the best oats in the land, and the bee was never bothered by anyone again — indeed, every garden in the palace kept a flowerbed just for bees, by royal order, forever after.',
        },
        {
          kind: 'note',
          text: 'New word: cure — something that makes an illness or trouble better. The best cure in this story was small help, remembered kindness and a horse with hidden wings.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Enchanted Knife',
      art: 'violet-knife',
      artPrompt: 'a poor young hunter in a sheepskin vest standing in a moonlit meadow beside a sly smiling fox, holding up a small old knife that gives off a sliver of blue light, distant giants’ silhouettes on a hilltop under the stars, silvery night blues',
      blocks: [
        {
          kind: 'text',
          text: 'Once there was a poor young man who had one treasure in the world: a small old knife, enchanted long ago, that could not miss. Whatever he threw it at, it struck — and it always came back to his hand, whistling softly, like a friendly bird. The young man made himself a promise, too: he would marry no one who did not have royal blood in her veins, which was a curious promise for a poor man to make, and made everyone who heard it laugh.',
        },
        {
          kind: 'text',
          text: 'He set out to seek his fortune, and took work herding sheep and flocks on the way, and that is where the knife earned its supper. When a pack of wolves came down on the fold at dusk, he did not run: he threw the knife once, quietly, and the pack thought better of it. When a lion threatened the king’s own cattle, the same. And word of a shepherd who never lost so much as a lamb went up the road ahead of him until it reached the palace.',
        },
        {
          kind: 'image',
          art: 'violet-knife',
          text: 'A small old knife, a quiet shepherd, and a very clever fox.',
        },
        {
          kind: 'text',
          text: 'Now between the young man and the princess stood a family of giants who guarded the bridge to the palace, and he might have worn himself out against them all his life. But a fox had watched him spare the wolf’s cubs one hard winter, and the fox decided that a young man who was kind when he could be cruel deserved better luck. So the fox tricked the giants — one at a time, and then together, for a fox needs no knife — until the bridge stood open, and led the young man to the palace gate as neatly as a housekeeper leading a guest to dinner. The guards had never seen a fox carry a visitor’s walking stick before, and could think of no rule against it.',
        },
        {
          kind: 'text',
          text: 'The king was glad to meet the shepherd everyone talked about, and the princess was glad to meet the young man the fox was so proud of, and it turned out royal blood came in a great many temperaments, all of them charming. They were married in the autumn, the fox was given a golden collar and the run of the kitchens, and the enchanted knife hung over the fireplace, whistling softly whenever the wind came down the chimney — which the children said was the sound of it, counting the years till it was needed, and finding so few.',
        },
        {
          kind: 'note',
          text: 'Talk together: the fox helps because the young man was kind when he could have been cruel. Ask your child: what small kindnesses do you think come back to help us later?',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Girl Who Pretended to be a Boy',
      art: 'violet-boy',
      artPrompt: 'a young woman with cropped hair wearing a shining soldier’s cloak and riding boots astride a magnificent black horse, raising a golden apple toward the light at the gate of an enchanted garden, three young men watching amazed from horseback behind her, golden sunset light',
      blocks: [
        {
          kind: 'text',
          text: 'An emperor had three sons and one daughter, Ileana, who rode and shot and read the stars as well as any of them. Now a wicked fairy had laid a curse on the royal house that only one thing could lift: the wonder-working apple of Paradise, which grew in a garden no one had ever found. The three brothers rode out one after another to look for it, and one after another they vanished. So Ileana cut off her hair, put on a soldier’s cloak, called herself a boy, and rode out after them.',
        },
        {
          kind: 'text',
          text: 'She came to the hut of an old hermit who kept the only map worth having, and he would not give it to a fine young officer for nothing. So Ileana split wood, carried water and mended his roof for a week, and he laughed and gave her the map, and told her where to win a better horse than any emperor owned: in the stable of a wizard who traded horses for riddles. She answered the riddles, rode off on the wonder horse, and followed the map over mountains and past glass rivers until she found the enchanted garden, and gathered the golden apple while its guardians slept.',
        },
        {
          kind: 'image',
          art: 'violet-boy',
          text: 'Ileana in her soldier’s cloak, with the wonder horse and the apple of Paradise.',
        },
        {
          kind: 'text',
          text: 'Riding home, she passed the fortress of the same wicked fairy, and heard — of all things — her three brothers singing sadly at the well. Their curse could only be broken by a courage no one in that country had ever seen, so Ileana, who had it to spare, rode straight in, out-thought the fairy’s riddling gate, and led her brothers out into the sunset. And then her secret was a secret no longer, for a fairy sees much, and the wicked fairy had watched her the whole way and seen something better than trickery: a heart that could not be bought or frightened.',
        },
        {
          kind: 'text',
          text: 'So the fairy lifted every spell she had laid — the brothers woke free, the apple shone, and the curse on the royal house ended — and she gave Ileana a gift of her own: that she should be, in truth, exactly who she had shown herself to be. The girl who had pretended to be a boy was a boy from that day on, and the wonder horse never let anyone else on his back. The apple healed the house, the brothers never left out their sister-brother again, and the old hermit got his roof mended twice a year, whether it needed it or not.',
        },
        {
          kind: 'note',
          text: 'Talk together: Ileana is believed for her courage, not her disguise. Ask your child: what did Ileana do in this story that no one else could have done?',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Violet Fairy Book',
    author: 'Andrew Lang (ed.)',
    authorDeathYear: 1912,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Stories as retold in Lang’s colour fairy book (1901), edited and translated from older public-domain European tales (including Romanian tales collected by Petre Ispirescu and Serbian tales). Published 1901; US public domain (pre-1929) and worldwide (Lang d. 1912, 70y pma expired). Plots followed, wording simplified for children.',
  },
}
