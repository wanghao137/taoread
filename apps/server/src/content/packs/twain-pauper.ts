import type { PackBook } from '../types'

/**
 * The Prince and the Pauper — Mark Twain (1835–1910), first published 1881.
 * Retold for young readers (9–12) in seven chapters: the chance meeting of
 * Edward, Prince of Wales, and Tom Canty, the swap, the prince in the streets
 * with Miles Hendon, the pauper in the palace and the Great Seal, hard lessons
 * in justice, the coronation day, and two good kings. Harsh episodes are
 * softened; the plot follows the public-domain original.
 * Source: The Prince and the Pauper (Mark Twain, 1881), public domain.
 */
export const princePauper: PackBook = {
  id: 'twain-pauper',
  title: 'The Prince and the Pauper',
  author: 'Mark Twain',
  lang: 'en',
  category: 'tale',
  ageStage: '9-12',
  intro:
    'In old London live two boys who look exactly alike: Edward, Prince of Wales, wrapped in silk, and Tom Canty, a poor boy who dreams of princes. On a lark they swap clothes — and the guards march the prince out of the palace and the pauper in. Each must live the other’s life, and both learn what it truly means to be a good king.',
  coverArt: 'pauper-throne',
  coverArtPrompt:
    'A grand Tudor throne room in warm candlelight: two identical boys face each other at the foot of the throne, one richly dressed in crimson velvet and ermine, one in ragged servant’s clothes, both laughing as they trade cloaks; heralds and courtiers startle in the background beneath a great banner. Amber and crimson palette, dramatic but merry, historical storybook illustration.',
  coverFrom: '#9575CD',
  coverTo: '#FFE082',
  source: 'The Prince and the Pauper (Mark Twain, 1881), public domain',
  chapters: [
    {
      title: 'Chapter 1 · Two Boys, One Face',
      art: 'pauper-meeting',
      artPrompt:
        'A Tudor palace gate chamber: a prince in crimson velvet and a ragged pauper boy stand nose to nose before a tall silver mirror, marveling at their identical faces; a liveried guard gapes by the arched doorway, tapestries and torchlight behind. Rich jewel tones with warm firelight, astonished and merry mood, detailed historical storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'In the great city of London, long ago, there lived two boys who had never met — though they had the same face.',
        },
        {
          kind: 'text',
          text: 'One was Edward, Prince of Wales, who slept in silk and was waited on by servants. The other was Tom Canty, who slept on straw in Pudding Lane and had never once had enough to eat.',
        },
        {
          kind: 'text',
          text: 'Tom’s one wish was to see a real prince. One day he wandered to the palace gates and pressed his face to the golden bars.',
        },
        {
          kind: 'image',
          art: 'pauper-meeting',
          text: 'The prince and the pauper meet at the palace gate — same face, different clothes.',
        },
        {
          kind: 'note',
          text: 'New word: pauper — a very poor person. Ask your child: what did the two boys share besides a face?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The prince saw him, and instead of calling the guard, threw the gates wide. "You are welcome here," he said. "Come in and play with me."',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Swap',
      art: 'pauper-swap',
      artPrompt:
        'A sumptuous palace chamber: two identical boys in their under-tunics, clothes heaped between them, laugh as each tugs the other’s coat on — the prince pulling on a threadbare jacket, the pauper drowning in crimson velvet; a paneled screen hides them from a daybed, window light streaming in. Warm honeyed interior light, playful conspiratorial mood, historical storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'In the prince’s chambers, the two boys stared at each other in the mirror. "Why, we might be twins!" cried Edward.',
        },
        {
          kind: 'text',
          text: '"Let us swap clothes, just for fun," said Tom. So they did — and the joke seemed funnier with every layer.',
        },
        {
          kind: 'image',
          art: 'pauper-swap',
          text: 'Each boy puts on the other’s clothes, laughing at the mirror.',
        },
        {
          kind: 'text',
          text: 'Then Edward ran out to the gateway to show the guard how the beggar boy looked in velvet. And the guard, seeing only rags, seized the prince by the collar and marched him out of the palace, while all the court bowed to Tom and called him "Your Highness."',
        },
        {
          kind: 'note',
          text: 'New word: court — the king or queen, together with all their nobles and servants.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"I am the prince!" Edward shouted, laughing at first. But no one laughed with him. The gates stayed shut, and the night was cold, and the game was suddenly very real.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Prince in the Streets',
      art: 'pauper-streets',
      artPrompt:
        'A noisy Tudor street at dusk: a bewildered boy in ragged princely bearing dodges carts and market stalls, while a tall shabby knight with a scarred honest face shields him with an outflung arm; lantern light and tavern signs, timber houses leaning close. Muted browns with warm lantern gold, lively but protective mood, historical storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'The prince in rags wandered the streets of London, telling everyone, "I am Edward, Prince of Wales." The crowds only laughed, and his father’s man John Canty drove him along like a servant.',
        },
        {
          kind: 'text',
          text: 'Then a tall gentleman with a kind, scarred face stepped in front of him. It was Miles Hendon, a soldier on his way home from the wars.',
        },
        {
          kind: 'text',
          text: 'Miles did not laugh. He did not quite believe the story either — but he bowed to the boy and called him "Your Majesty," and gave him supper by the fire.',
        },
        {
          kind: 'image',
          art: 'pauper-streets',
          text: 'Miles Hendon shields the ragged prince from the jeering street.',
        },
        {
          kind: 'note',
          text: 'New word: majesty — a grand way of speaking to a king or queen. Why did Miles play along?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'And Miles stood guard all night at the prince’s door, just as a knight should — which is exactly what the prince had needed all day: not a palace, but a friend.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Pauper in the Palace',
      art: 'pauper-palace',
      artPrompt:
        'A glittering state banquet hall: a nervous boy in crimson velvet sits at the head of a long table under a canopy, nobles bowing on either side, a page offering a golden dish; the boy studies a great jeweled seal on the table with secret curiosity. Rivers of candlelight, gold and crimson, comic-tender historical storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'Meanwhile, poor Tom Canty wished with all his heart to give the clothes back. But the court only smiled — surely the prince was joking — and there was no way out.',
        },
        {
          kind: 'text',
          text: 'So Tom decided to do his best. He learned which spoon to use, how to answer the lords, and — most useful of all — how to say, "Let it be as you think best," which made everyone believe him very wise.',
        },
        {
          kind: 'text',
          text: 'Best of all, Tom was kind. When a lord was blamed for a small mistake, Tom remembered hunger and said, "He meant well." The court began to love their gentle prince.',
        },
        {
          kind: 'image',
          art: 'pauper-palace',
          text: 'Tom, very serious, does his princely best at the banquet.',
        },
        {
          kind: 'note',
          text: 'Ask your child: what did Tom do that made the court trust him?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'And Tom found a curious heavy disc in the royal treasure room, the Great Seal of England. Nobody could explain what it was truly for — so Tom quietly used it to crack his nuts, which nobody ever guessed.',
        },
      ],
    },
    {
      title: 'Chapter 5 · Lessons in Justice',
      art: 'pauper-justice',
      artPrompt:
        'A crowded Tudor courtroom seen from behind the throne: a boy king listens intently as a poor old woman pleads her case with open hands, judges in white wigs turning to look at him, shafts of dusty window light crossing the hushed hall. Somber oak tones with one bright ray of light, thoughtful historical storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'Tom, as prince, sat in on the courts — and heard things he had never dreamed of. Men and women punished harshly for stealing bread, for being hungry, for being unlucky.',
        },
        {
          kind: 'text',
          text: 'Tom’s heart ached, for he knew hunger from the inside. "No one should be punished for being poor," he said, and he pardoned them gently, one by one.',
        },
        {
          kind: 'text',
          text: 'Far away, the true prince was learning the same lesson from the other side. Every law that fell on Tom’s shoulders now fell on Edward’s, and Edward wrote down in his heart: When I am king, my laws shall be merciful.',
        },
        {
          kind: 'image',
          art: 'pauper-justice',
          text: 'Tom pardons a poor woman, remembering his own hungry days.',
        },
        {
          kind: 'note',
          text: 'New word: pardon — to forgive someone and cancel their punishment.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Two boys, one lesson, learned from two sides of the same wall: a ruler must feel for the people he rules.',
        },
      ],
    },
    {
      title: 'Chapter 6 · Coronation Day',
      art: 'pauper-coronation',
      artPrompt:
        'Westminster Abbey blazing with candles and banners: a boy in ragged clothes stands at the altar while a boy king in velvet points to him, a heavy jeweled crown lifted high between them by a bishop; Miles Hendon and wide-eyed lords crowd the aisles, sunbeams cutting the incense haze. Gold, crimson and blue, triumphant historical storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'At last came Coronation Day. The real Edward pushed his way into the abbey with Miles Hendon at his side, and cried out, "I am the king!"',
        },
        {
          kind: 'text',
          text: 'The lords did not believe him. But then he was asked the one thing a stranger could never know: "Where is the Great Seal of England?"',
        },
        {
          kind: 'text',
          text: 'Edward told them exactly where it had been hidden. Only Tom could confirm it — and Tom, without a moment’s envy, ran forward and said, "Let the king be crowned. It is Edward, truly Edward!"',
        },
        {
          kind: 'image',
          art: 'pauper-coronation',
          text: 'Tom gives up the crown gladly, and the true king stands forth.',
        },
        {
          kind: 'note',
          text: 'Ask your child: Tom could have stayed king. Why do you think he gave it back so quickly?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'So the crown settled on Edward’s head at last, and the abbey thundered. And the first decree of the new king was to make Tom Canty’s family safe and honourable for ever.',
        },
      ],
    },
    {
      title: 'Chapter 7 · Two Good Kings',
      art: 'pauper-two-kings',
      artPrompt:
        'A serene palace window nook: two boys — one in royal purple, one in fine citizen’s clothes — look out over the sunset rooftops of London together, sharing a handful of roasted chestnuts, a jeweled seal lying on the sill between them; Miles Hendon snoozes peaceably on a bench behind. Rose-gold evening light, warm friendship mood, gentle historical storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'Edward proved a just king, for he had worn the shoes of the poor. The laws grew gentler, the courts grew kinder, and the people loved him.',
        },
        {
          kind: 'text',
          text: 'He made Tom the King’s Ward — a friend of the crown for life, honoured at court, with a fine house and plenty for everyone in Pudding Lane.',
        },
        {
          kind: 'text',
          text: 'Miles Hendon was made an Earl, as a true friend of the king should be, though he never quite stopped calling Edward "Your Majesty" with a smile.',
        },
        {
          kind: 'image',
          art: 'pauper-two-kings',
          text: 'Edward and Tom watch the sunset over the city they both will serve.',
        },
        {
          kind: 'note',
          text: 'Ask your child: what did each boy learn from living the other’s life?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'And on winter evenings, the king and the King’s Ward could be found by the fire, cracking walnuts with the Great Seal of England.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Prince and the Pauper',
    author: 'Mark Twain',
    authorDeathYear: 1910,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Retold for young readers (9–12); harsh episodes softened, plot follows the original. Published 1881; US public domain and PD in the EU (Twain d. 1910, 70y pma expired 1981).',
  },
}
