import type { PackBook } from '../types'

/**
 * The Enchanted Castle — five chapters retold in simple English for
 * young readers. Original: E. (Edith) Nesbit, published 1907. Public
 * domain in the US (pre-1929) and worldwide (Nesbit died 1924; 70y pma
 * expired). Gerald, Jimmy, and Kathleen, the "sleeping princess" Mabel,
 * the wishing ring, the paper people, and the moonlit garden of statues
 * follow the original novel; wording simplified into short, gentle
 * sentences for children aged 6-8.
 */
export const enchantedCastle: PackBook = {
  id: 'nesbit-enchanted',
  title: 'The Enchanted Castle',
  author: 'E. Nesbit',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'Gerald, Jimmy, and Kathleen find a secret way into a grand old castle, where a girl called Mabel shows them a treasure room and a silver ring. The ring makes wishes come true - and the children learn that pretend magic, once started, is a tricky friend.',
  coverArt: 'yalding-garden',
  coverArtPrompt: 'a moonlit garden of pale stone statues behind a grand old castle, a sleeping girl in a white dress discovered on a sun-dial pedestal, three children with a lantern stepping through a rose arch, yew hedges and a lake glimmering beyond, full moon and soft silver light, dreamy storybook illustration',
  coverFrom: '#1A237E',
  coverTo: '#B39DDB',
  source: 'The Enchanted Castle (E. Nesbit, 1907), public domain (Nesbit d. 1924)',
  chapters: [
    {
      title: 'Chapter 1 · The Sleeping Princess',
      art: 'yalding-castle-gate',
      artPrompt: 'three Edwardian children in summer clothes peering through a great iron gate of a park at a grand old castle with tall chimneys, a stone wall too high to climb, a row of dark yew trees and a glint of lake beyond, late afternoon sun, curious storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'Gerald, Jimmy, and Kathleen were staying in the little town of Yalding for the school holidays. On the hill above the town stood a grand old castle with gardens, and the gates were locked fast. "There must be a way in," said Gerald, who never gave up on anything.',
        },
        {
          kind: 'image',
          art: 'yalding-passage',
          text: 'A hidden tunnel in the rocks leads right under the wall.',
        },
        {
          kind: 'text',
          text: 'And there was one - a secret passage through the hillside, ending inside the sunken garden. Up they came among the flower beds, and on to the castle itself. In a dim tapestry room they found a girl fast asleep on a chair, pale and still as a picture. "The sleeping princess!" whispered Jimmy, "and she has slept a hundred years!"',
        },
        {
          kind: 'note',
          text: 'New word: castle - a grand old stone house, often with towers and a garden. Real castles were built long, long ago.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'They kissed her hand, and of course she woke up - for she was only Mabel, the housekeeper\'s niece, playing a game. But Mabel did not want the game to end. She led them to the castle treasure room, all gold and silver in the half light, and showed them a plain silver ring. "This is the wishing ring," she said. "Put it on and see."',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Ring of Invisibility',
      art: 'yalding-ring',
      artPrompt: 'a girl in a white dress vanished from sight, only a silver ring hovering in mid-air, three children around her staring open-mouthed in a candlelit treasure room with gold cups and crowns on shelves, deep shadows and one warm candle flame, wonder-filled storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'Mabel slipped the silver ring onto her finger - and vanished. Not hid: vanished, like a candle blown out. The three friends stood in the dark treasure room holding each other, until a small voice said, "I am here! I can see you, but you cannot see me!"',
        },
        {
          kind: 'image',
          art: 'yalding-invisible-games',
          text: 'An invisible Mabel plays tag in the garden, and nobody can catch her.',
        },
        {
          kind: 'text',
          text: 'When the ring came off, Mabel stood there laughing. The children were scared at first, then excited, then full of plans. They played invisible tag and whisper games in the park until the moon rose. "Keep the ring secret," said Mabel, "or the aunts will take it away." So the four of them shared the best secret in the world.',
        },
        {
          kind: 'note',
          text: 'Talk together: Would you like to be invisible for one day? What would you do with it - and what would you promise not to do?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'But the ring was not as simple as they thought. It seemed to listen when anyone spoke a wish, and things wished for had a way of coming true in shapes nobody quite expected. "Wishes are like cats," said Gerald. "They come when they like, not when you call."',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Paper People',
      art: 'yalding-paper-people',
      artPrompt: 'a group of wobbly paper figures with crayon faces and newspaper hats standing awkwardly on a garden path in early morning light, four children backing away with surprised faces, a bandstand and yew hedges behind, one paper figure tipping its hat politely, funny gentle storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'For a garden bazaar game the children made pretend people out of paper - masks with funny crayon faces, coats of newspaper, boots of brown paper. They called them their Ugly-Wuglies, and they stood them in a row to be a make-believe crowd. That night the ring was near them in the dark.',
        },
        {
          kind: 'image',
          art: 'yalding-walking-paper',
          text: 'In the morning, one paper man raises his hat and asks the way to town.',
        },
        {
          kind: 'text',
          text: 'In the morning, the paper people were walking about. They wobbled politely and asked, in papery voices, the way to the town. It was the strangest thing the children had ever seen, and the strangest feeling too. "Pretend has come true," whispered Kathleen, "because of the ring."',
        },
        {
          kind: 'note',
          text: 'New word: pretend - something made up for a game. With magic around, a pretend thing may wake up and become real.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The children were kind to their paper guests, walked them gently to the road, and then quietly let the ring undo the wish. One by one the paper people folded down into still, flat paper again, smiling their crayon smiles. The children promised each other: no more half-wishes left lying around.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Garden Comes Alive',
      art: 'yalding-moon-garden',
      artPrompt: 'a magical garden at full moon where pale stone statues are stepping down from their pedestals and stretching, two children watching amazed from behind a hedge, a huge slow gentle dinosaur-like creature nibbling the leaves of a yew tree, the castle and a glimmering lake beyond, silver moonlight everywhere, dreamy storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'The greatest secret of all was the garden at full moon. On moonlit nights, when the ring was near, the pale stone statues woke. They stepped off their pedestals, bowed to each other, and walked slowly between the flower beds, whispering in voices like wind through leaves.',
        },
        {
          kind: 'image',
          art: 'yalding-dinosaur',
          text: 'A huge stone dinosaur comes to life and only wants leaves for supper.',
        },
        {
          kind: 'text',
          text: 'Even the great stone beast in the garden woke up - a huge, slow creature with gentle eyes, who nibbled the yew trees as if they were cabbage. The children held very still and watched, happy and frightened at once. When the moon went behind a cloud, everything froze softly back to stone, and the garden was quiet as a photograph.',
        },
        {
          kind: 'note',
          text: 'Question for you: The garden is alive only in the moonlight. If you could visit it, what would you ask one of the stone statues?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"This garden is like a dream that borrowed our ring," said Gerald. And slowly the children began to understand that all this magic did not really belong to them. It was only staying for the summer, like a guest in a house of stone and moonlight.',
        },
      ],
    },
    {
      title: 'Chapter 5 · The Last Moon',
      art: 'yalding-moon-farewell',
      artPrompt: 'four children on a lake shore at night, one dropping a small silver ring into dark still water, soft ripples spreading under a huge full moon, the castle gardens and pale statues beyond the trees, a last warm summer evening, gentle bittersweet storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'Summer ran out like sand in a glass. The holidays were ending, and the magic was growing tired, doing small strange things half-heartedly, like a juggler dropping balls. The four friends sat by the lake and talked it over very seriously, as children can.',
        },
        {
          kind: 'image',
          art: 'yalding-ring-into-lake',
          text: 'The ring makes one soft ripple, and the garden goes to sleep.',
        },
        {
          kind: 'text',
          text: '"Magic should not stay where it is not understood," said Mabel. So on the last night they carried the silver ring down to the dark lake and let it fall with one soft ripple. The moon slid behind the trees, and the garden, the statues, and the castle all seemed to lean together and settle, like a child going to sleep.',
        },
        {
          kind: 'note',
          text: 'Talk together: The children give the ring back. Why does saying good-bye to a wonderful thing not spoil the wonderful part?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Next morning the castle was only a grand old house, the statues only stones, and the passage only a dark little tunnel. But nobody was sad as they packed their bags. Some summers hold more than other summers, the four friends agreed - and theirs held a castle, a moon, and a secret that would never wear out.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Enchanted Castle',
    author: 'E. Nesbit',
    authorDeathYear: 1924,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Retold for children; plot follows the public-domain original. Published 1907; worldwide public domain.',
  },
}
