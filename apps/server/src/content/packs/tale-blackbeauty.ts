import type { PackBook } from '../types'

/**
 * Black Beauty — four chapters retold for young English readers.
 * Text: Project Gutenberg eBook #271 (Anna Sewell, 1877). Public domain worldwide
 * (Sewell died 1878; 70y pma expired). The book is told in the horse's own words;
 * plot follows the original, wording simplified into short sentences for children
 * aged 6–8.
 */
export const blackBeauty: PackBook = {
  id: 'black-beauty',
  title: 'Black Beauty',
  author: 'Anna Sewell',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'A handsome black horse tells the story of his own life — kind masters and cruel ones, great houses and London cabs — and why every horse deserves to be treated with love.',
  coverArt: 'meadow-pond',
  coverArtPrompt: 'a glossy black horse with a white star on his forehead standing by a pond in a green meadow, a kind old man in a cap holding out an apple, other horses grazing under oak trees in the background',
  coverFrom: '#4E342E',
  coverTo: '#A1887F',
  source: 'Project Gutenberg eBook #271, public domain (Sewell d. 1878)',
  chapters: [
    {
      title: 'Chapter 1 · My First Home',
      art: 'meadow-pond',
      artPrompt: 'a glossy black colt with a white star standing beside a pond in a green meadow, shady trees and water-lilies, a wise older mare grazing nearby',
      blocks: [
        {
          kind: 'text',
          text: 'The first place that I can remember well was a large pleasant meadow with a pond of clear water in it. Some shady trees leaned over it, and rushes and water-lilies grew at the deep end. I was a young colt, and I lived there with my mother.',
        },
        {
          kind: 'image',
          art: 'meadow-pond',
          text: 'The meadow with the pond, where Black Beauty was born.',
        },
        {
          kind: 'text',
          text: 'My mother’s name was Duchess, but our master called her Pet. She was a wise old horse, and when the other colts were rude or greedy, she would say to me, "I hope you will grow up gentle and good, and never learn bad ways."',
        },
        {
          kind: 'note',
          text: 'New word: colt — a young boy horse, not yet grown up.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'When I was old enough to be trained, the master came to look at me. "He is a good one," he said, "and he shall have kind treatment." He put on my saddle and bridle so gently that I was not frightened at all.',
        },
        {
          kind: 'text',
          text: 'Then one day came the great news. The master had sold me to Squire Gordon, who lived at Birtwick Park, a great house far away. My mother bent her head and said, "Do your best wherever you go, and keep up your good name."',
        },
      ],
    },
    {
      title: 'Chapter 2 · Birtwick Park',
      art: 'birtwick-stable',
      artPrompt: 'a warm stable interior with horses in wooden stalls full of straw, a black horse, a grey pony and a chestnut mare, a groom stroking the mare’s neck',
      blocks: [
        {
          kind: 'text',
          text: 'Birtwick Park was a fine place. In the stable I met two new friends. One was Merrylegs, a fat little grey pony whom the children loved to ride. The other was Ginger, a tall chestnut mare with a long, beautiful neck.',
        },
        {
          kind: 'image',
          art: 'birtwick-stable',
          text: 'The warm stable at Birtwick Park, with the horses in their stalls.',
        },
        {
          kind: 'text',
          text: 'Ginger was often cross. She would lay back her ears and snap at anyone who came near. "Nobody was ever kind to me when I was young," she told me one day. "I was beaten and kicked, and so I learned to bite and kick back."',
        },
        {
          kind: 'note',
          text: 'New word: stable — the building where horses live, are fed, and kept warm.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'James Howard, the head groom, was very gentle with Ginger. He spoke softly and stroked her, and gave her the best hay. Little by little she grew quiet, and in time she and I became great friends and pulled the carriage together.',
        },
        {
          kind: 'text',
          text: 'Those were happy years. Squire Gordon and his wife were kind, the grooms were good men, and the children patted me every day. But all good things come to an end, and one day the mistress was ordered away to a warmer country, and the horses had to be sold.',
        },
      ],
    },
    {
      title: 'Chapter 3 · Harness and Reins',
      art: 'bearing-rein',
      artPrompt: 'a black horse pulling a carriage along a country lane with his head held uncomfortably high by a tight strap, rain clouds gathering above',
      blocks: [
        {
          kind: 'text',
          text: 'My new home was Earlshall Park. There the fashion was to make horses hold their heads up very high, with a strap called the bearing rein pulled tight. It held my head up so far that I could not see the road before me.',
        },
        {
          kind: 'image',
          art: 'bearing-rein',
          text: 'A horse pulling a carriage with his head held up high.',
        },
        {
          kind: 'note',
          text: 'New word: rein — the long strap that runs from the rider’s hand to the horse’s mouth.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'It hurt my neck and it made it hard to breathe. Ginger suffered too, and she grew angry and reckless again. "If I cannot have my head down," she said, "I will not go at all."',
        },
        {
          kind: 'text',
          text: 'One day the Earl’s good friend, a kind lady, saw us. "How can you use the bearing rein?" she asked. "It is a cruel fashion." She asked that it be taken off for our afternoon drive, and for a whole afternoon I felt like a young colt again.',
        },
        {
          kind: 'text',
          text: 'But the fashion did not change. And one night, as we were driven home through the rain with our heads held up tight, Ginger stumbled and fell. That was the end of her work as a carriage horse, and we were both sold away.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Hard Years',
      art: 'london-cab',
      artPrompt: 'a black horse in worn harness pulling a hansom cab down a misty cobblestone London street, a kind cabman holding the reins, gas lamps glowing',
      blocks: [
        {
          kind: 'text',
          text: 'After that I passed through many hands. I was a hired carriage horse, then a cab horse in London. The streets were cold and hard, and the work was heavy, and my knees grew stiff.',
        },
        {
          kind: 'image',
          art: 'london-cab',
          text: 'Black Beauty pulling a hansom cab through the London streets.',
        },
        {
          kind: 'note',
          text: 'New word: cab — a horse-drawn carriage that carries people for money, like a taxi.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'My last London master was Jerry Barker, a cabman. He was poor, but he was the kindest man I ever knew. He gave me the best food he could buy, and a good blanket at night, and he never struck me with the whip.',
        },
        {
          kind: 'text',
          text: 'One bitter winter Jerry became ill and could not work at all. He had to sell his horses to pay the rent, and I went to a farm. There a good farmer nursed my sores and let me run free in a grassy field for a whole summer.',
        },
        {
          kind: 'text',
          text: 'At last I was brought to a sunny meadow to be sold. Three ladies bought me — and as they looked at my white star and my swishing tail, their groom came running across the grass. "It is Black Beauty!" he cried. "I knew him when he was a colt at Birtwick Park!" And in that meadow I stayed, loved and well cared for, to the end of my days.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Black Beauty',
    author: 'Anna Sewell',
    authorDeathYear: 1878,
    jurisdiction: 'EU',
    basis: 'pd-70',
    sourceUrl: 'https://www.gutenberg.org/ebooks/271',
    note: 'Published 1877; public domain worldwide (Sewell d. 1878, 70y pma expired). Plot follows Project Gutenberg eBook #271; wording simplified into short sentences for young English readers.',
  },
}
