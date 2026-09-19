import type { PackBook } from '../types'

/**
 * A Child's Garden of Verses — twelve poems by Robert Louis Stevenson (1885)
 * for very young readers.
 * Stevenson died 1894; the work is public domain worldwide (70y pma long
 * expired). Each poem is quoted verbatim in an excerpt of 30 words or fewer,
 * chosen from the first edition (Project Gutenberg #25609); notes are written
 * by the platform. Selection avoids overlap with the existing 'en-verses' pack.
 */
export const childsGarden: PackBook = {
  id: 'stevenson-garden',
  title: "A Child's Garden of Verses",
  author: 'Robert Louis Stevenson',
  lang: 'en',
  category: 'poetry',
  ageStage: '3-5',
  intro: 'A little garden of poems about being small: a shadow that will not behave, a ship built of chairs, a swing that flies, and the wind that comes marching in the night. Say them out loud — they were made for that.',
  coverArt: 'garden-shadow',
  coverArtPrompt: 'a small child in a nightgown chasing their own long shadow across a sunlit lawn, a red watering can and hollyhocks by a stone wall, a kitten pouncing on the shadow, warm buttery morning light, gentle storybook watercolor',
  coverFrom: '#00695C',
  coverTo: '#FFF176',
  source: "A Child's Garden of Verses (Robert Louis Stevenson, 1885), Project Gutenberg #25609, public domain (Stevenson d. 1894)",
  chapters: [
    {
      title: 'Chapter 1 · Let\'s Pretend',
      art: 'garden-playtime',
      artPrompt: 'a ship made of four kitchen chairs with a broom mast and a sheet sail standing on a carpet sea, two children aboard with wooden spoons for oars, a laundry basket island nearby, afternoon sun through lace curtains, warm nursery colours',
      blocks: [
        {
          kind: 'poem',
          text: 'We built a ship upon the stairs\nAll made of the back-bedroom chairs,',
        },
        {
          kind: 'note',
          text: 'From "A Good Play." Four chairs become a ship, and the stairs become the sea, and one little sailor steps on a nail and must be carried off to bed — which is all part of the play. What can your chairs become?',
          art: 'lamp-hint',
        },
        {
          kind: 'poem',
          text: 'Three of us afloat in the meadow by the swing,\nThree of us aboard in the basket on the lea.',
        },
        {
          kind: 'note',
          text: 'From "Pirate Story." A hay basket on the lawn is a boat, the grass is the roaring sea, and the wind in the spring grass is the ocean waves. Stevenson wrote this for children who knew that mowing day ends all voyages.',
          art: 'lamp-hint',
        },
        {
          kind: 'poem',
          text: 'When children are playing alone on the green,\nIn comes sometimes the Unseen Playmate.',
        },
        {
          kind: 'note',
          text: 'From "The Unseen Playmate." He cannot be seen, but he knows every game, and when children leave a toy out in the rain, it is he who hides it safe. A poem for the friend you have met without knowing it.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 2 · My Shadow and the Cow',
      art: 'garden-shadow-follow',
      artPrompt: 'a child in a sunhat marching along a garden path with a tall black shadow stretching beside them across a daisy lawn, a friendly red-and-white cow browsing by a wooden fence beyond the wall, buttercups, bright cheerful noon light',
      blocks: [
        {
          kind: 'poem',
          text: 'I have a little shadow that goes in and out with me,\nAnd what can be the use of him is more than I can see.',
        },
        {
          kind: 'note',
          text: 'From "My Shadow." The shadow grows tall as an India-rubber ball and stays in bed late in the morning — laziest shadow ever! On a sunny day, jump and watch your shadow jump with you.',
          art: 'lamp-hint',
        },
        {
          kind: 'poem',
          text: 'The friendly cow, all red and white,\nI love with all my heart:\nShe gives me cream with all her might,\nTo eat with apple-tart.',
        },
        {
          kind: 'note',
          text: 'From "The Cow." The cow wanders off to eat lily and garlic and dill — but she gives cream all the same. A thank-you poem for the cow behind your breakfast.',
          art: 'lamp-hint',
        },
        {
          kind: 'poem',
          text: 'What are you able to build with your blocks,\nCastles and palaces, temples and docks?',
        },
        {
          kind: 'note',
          text: 'From "Block City." A child builds a whole city on the parlour floor — kirk and mill and palace — and though it is swept away, it stands for ever in the mind. Knock it down tonight; it will still be there tomorrow.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 3 · In Bed and Up Early',
      art: 'garden-cozy-bed',
      artPrompt: 'a child propped on two pillows in a brass bed with tin soldiers and a toy train arranged on the patchwork counterpane, a curtain glowing with morning sun, a sparrow on the windowsill, soft warm bedside light',
      blocks: [
        {
          kind: 'poem',
          text: 'When I was sick and lay a-bed,\nI had two pillows at my head,\nAnd all my toys beside me lay,\nTo keep me happy all the day.',
        },
        {
          kind: 'note',
          text: 'From "The Land of Counterpane." The counterpane is the big quilt, and the child makes it a land: watch-houses, cities, hills and valleys in the blanket folds. A sick day can be a whole country, if you have toys and two pillows.',
          art: 'lamp-hint',
        },
        {
          kind: 'poem',
          text: 'A birdie with a yellow bill\nHopped upon my window sill,\nCocked his shining eye and said:\n"Ain\'t you \'shamed, you sleepy-head!"',
        },
        {
          kind: 'note',
          text: 'From "Time to Rise." The whole poem is a wake-up call from a very cheeky bird. Say the last line extra loud, and see who laughs first.',
          art: 'lamp-hint',
        },
        {
          kind: 'poem',
          text: 'A child should always say\nWhat\'s true,\nAnd speak when he is spoken to,',
        },
        {
          kind: 'note',
          text: 'From "Whole Duty of Children." The little poem sounds like a very polite rulebook — but the joke is in the last line, which points out that the poem-writer himself does not always manage it. Rules are easy to say and hard to do!',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 4 · Swing, Sea, and Wind',
      art: 'garden-swing-sky',
      artPrompt: 'a child on a wooden swing hung from a big apple tree branch swinging high against a blue sky with white clouds, cows in a green meadow below, a river winding away, wind in the blossoms, joyful bright spring light',
      blocks: [
        {
          kind: 'poem',
          text: 'How do you like to go up in a swing,\nUp in the air so blue?',
        },
        {
          kind: 'note',
          text: 'From "The Swing." Swinging is the flying of childhood — up over the wall, over rivers and trees, "up in the air and down on the ground." Count your swings: up-blue, down-brown, up-blue, down-brown.',
          art: 'lamp-hint',
        },
        {
          kind: 'poem',
          text: 'When I was down beside the sea,\nA wooden spade they gave to me\nTo dig the sandy shore.',
        },
        {
          kind: 'note',
          text: 'From "At the Seaside." One spade, one shore, and holes "empty like a cup" — and in a few lines the whole day goes by, the way beach days do. What do you dig first, at the sea?',
          art: 'lamp-hint',
        },
        {
          kind: 'poem',
          text: 'Whenever the moon and stars are set,\nWhenever the wind is high,\nAll night long in the dark and wet,\nA man goes riding by.',
        },
        {
          kind: 'note',
          text: 'From "Windy Nights." On stormy nights the child lies in bed and hears hoofbeats in the wind — tap-tap on the window, gallop down the lane. Listen next time the wind is high: is that the rider going by?',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: "A Child's Garden of Verses (twelve poems)",
    author: 'Robert Louis Stevenson',
    authorDeathYear: 1894,
    jurisdiction: 'EU',
    basis: 'pd-70',
    sourceUrl: 'https://www.gutenberg.org/ebooks/25609',
    note: "First edition 1885; Stevenson died 1894 — public domain worldwide. Twelve poems quoted verbatim in excerpts of 30 words or fewer from Project Gutenberg #25609; notes by the platform. Selection does not overlap the existing 'en-verses' pack.",
  },
}
