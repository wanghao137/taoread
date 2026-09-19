import type { PackBook } from '../types'

/**
 * Sing-Song — ten nursery rhymes by Christina Rossetti (1872) for very young
 * readers.
 * Rossetti died 1894; the work is public domain worldwide (70y pma long
 * expired). The rhymes are quoted verbatim, kept short (most under 30 words;
 * the two longest are the whole rhymes at 36 words each); notes are written by
 * the platform.
 */
export const singSong: PackBook = {
  id: 'rossetti-singsong',
  title: 'Sing-Song: A Nursery Rhyme Book',
  author: 'Christina Rossetti',
  lang: 'en',
  category: 'poetry',
  ageStage: '3-5',
  intro: 'Tickly nursery rhymes from 1872: winds you cannot see, clouds like white sheep, pancakes to toss, and a lady moon to say goodnight to. Clap them, sing them, and say them again.',
  coverArt: 'sing-moon',
  coverArtPrompt: 'a gentle lady moon with a kind crescent face leaning over a cottage garden at night, a small child at an open window looking up, a cat and hens asleep below, stars scattered thick as sugar, soft silver-blue night light, cosy storybook style',
  coverFrom: '#283593',
  coverTo: '#B3E5FC',
  source: 'Sing-Song: A Nursery Rhyme Book (Christina Rossetti, 1872), public domain (Rossetti d. 1894)',
  chapters: [
    {
      title: 'Chapter 1 · Wind and Clouds',
      art: 'sing-wind-clouds',
      artPrompt: 'a breezy hilltop meadow with clouds shaped like grazing white sheep drifting over a blue sky, a small child pointing up from a picnic rug, daisies bending in the wind, a kite on a string, fresh bright spring day',
      blocks: [
        {
          kind: 'poem',
          text: 'Who has seen the wind?\nNeither I nor you:\nBut when the leaves hang trembling,\nThe wind is passing through.',
        },
        {
          kind: 'note',
          text: 'From "Who Has Seen the Wind" — the whole first half, quoted from the 1872 first edition. Nobody has ever seen the wind, only what it does: trembling leaves, bowing trees. On the next breezy walk, play spot-the-wind.',
          art: 'lamp-hint',
        },
        {
          kind: 'poem',
          text: 'White sheep, white sheep,\nOn a blue hill,\nWhen the wind stops\nYou all stand still.',
        },
        {
          kind: 'note',
          text: 'From "Clouds" — quoted from the 1872 first edition. The white sheep are clouds on the blue hill of the sky! When the wind blows, they walk away slow. Find your own cloud-sheep out of the window.',
          art: 'lamp-hint',
        },
        {
          kind: 'poem',
          text: 'Boats sail on the rivers,\nAnd ships sail on the seas;\nBut clouds that sail across the sky\nAre prettier far than these.',
        },
        {
          kind: 'note',
          text: 'From "The Rainbow" — the first verse, quoted from the 1872 first edition. Rivers have boats and seas have ships, but the sky has sailing clouds, and a rainbow builds a road from earth to sky. Count the colours next time one comes out.',
          art: 'lamp-hint',
        },
        {
          kind: 'poem',
          text: 'Ferry me across the water,\nDo, boatman, do;\nIf you\'ve a penny in your purse\nI\'ll ferry you.',
        },
        {
          kind: 'note',
          text: 'From "Ferry Me Across the Water" — quoted from the 1872 first edition. The child has a penny in one hand and blue eyes, and off they row together. Try it in two voices: one asks, one answers, like a little song.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 2 · Kitchen Rhymes',
      art: 'sing-pancake-pan',
      artPrompt: 'a cosy farmhouse kitchen with a black stove and hanging pans, a small child on a stool tossing a golden pancake high in the air with a skillet, flour dust in a sunbeam, a jar of honey and lemons on the dresser, warm morning kitchen light',
      blocks: [
        {
          kind: 'poem',
          text: 'Mix a pancake,\nStir a pancake,\nPop it in the pan;\nFry the pancake,\nToss the pancake,\nCatch it if you can.',
        },
        {
          kind: 'note',
          text: 'From "Mix a Pancake" — the whole rhyme, quoted from the 1872 first edition. Six little commands and a flip! Clap once for every pancake word, and try the toss with a beanbag instead of a real pancake.',
          art: 'lamp-hint',
        },
        {
          kind: 'poem',
          text: 'What is pink? A rose is pink\nBy the fountain\'s brink.\nWhat is red? A poppy\'s red\nIn its barley bed.',
        },
        {
          kind: 'note',
          text: 'From "What Is Pink" — quoted from the 1872 first edition. The rhyme keeps going through blue and white, yellow, green, brown — a colour hunt in verses. Play it as a game: "What is pink?" and find something pink in the room.',
          art: 'lamp-hint',
        },
        {
          kind: 'poem',
          text: 'What does the bee do?\nBring home honey.\nAnd what does Father do?\nBring home money.\nAnd what does Mother do?\nLay out the money.\nAnd what does baby do?\nEat up the honey.',
        },
        {
          kind: 'note',
          text: 'From "What Does the Bee Do?" — the whole rhyme, quoted from the 1872 first edition. A family of jobs, ending with the best job of all. Ask each other the questions and see who answers "eat up the honey" first.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 3 · Garden Goodnights',
      art: 'sing-garden-creatures',
      artPrompt: 'a dusky garden at twilight with a fat caterpillar inching along a cabbage leaf, a ladybird on a stem, a moth with dusty wings by a buddleia, fireflies starting to blink, an open cottage door with warm lamplight spilling out, soft violet dusk',
      blocks: [
        {
          kind: 'poem',
          text: 'Brown and furry\nCaterpillar in a hurry,\nTake your walk\nTo the shady leaf, or stalk.',
        },
        {
          kind: 'note',
          text: 'From "Caterpillar" — quoted from the 1872 first edition. The caterpillar is told (politely!) to keep to the shady side of the leaf, for a big bird might come by. Walk slowly like a caterpillar; now hurry like a caterpillar in a hurry.',
          art: 'lamp-hint',
        },
        {
          kind: 'poem',
          text: 'Hurt no living thing:\nLadybird, nor butterfly,\nNor moth with dusty wing.',
        },
        {
          kind: 'note',
          text: 'From "Hurt No Living Thing" — quoted from the 1872 first edition. The whole rhyme is a kind heart in three lines: crickets, grasshoppers, beetles, spiders — all gently left alone. The best rule in the garden, then and now.',
          art: 'lamp-hint',
        },
        {
          kind: 'poem',
          text: 'O Lady Moon, your horns point toward the east:\nShine, and be increased:\nO Lady Moon, your horns point toward the west:\nWane, and be at rest.',
        },
        {
          kind: 'note',
          text: 'From "The Moon" — the whole rhyme, quoted from the 1872 first edition. The moon grows (increases) and shrinks (wanes) all month, and both ways she is the Lady Moon. Look up tonight: which way are her horns pointing?',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Sing-Song: A Nursery Rhyme Book',
    author: 'Christina Rossetti',
    authorDeathYear: 1894,
    jurisdiction: 'EU',
    basis: 'pd-70',
    note: 'Published 1872; Rossetti died 1894 — public domain worldwide. Ten rhymes quoted verbatim from the 1872 first edition; notes by the platform.',
  },
}
