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
    {
      title: 'Chapter 5 · Bed by Day, Dreams by Night',
      art: 'stevenson-garden:ch5',
      artPrompt: 'a sleepy child in a nightgown peeking through the window at dusk while little birds still hop on a leafy branch, a candle glowing on the sill, and beyond the glass a dreamland of misty violet hills and silver rivers fading into the night, gentle storybook watercolor',
      blocks: [
        {
          kind: 'poem',
          text: 'In winter I get up at night\nAnd dress by yellow candle-light.\nIn summer, quite the other way,\nI have to go to bed by day.',
        },
        {
          kind: 'note',
          text: 'From "Bed in Summer." In winter the child gets up in the dark by candle-light — but in summer it is still bright outside when bedtime comes, and the birds are still hopping. A poem for every child who has peeked out at the sunny evening sky from under the blankets.',
          art: 'lamp-hint',
        },
        {
          kind: 'poem',
          text: 'From breakfast on through all the day\nAt home among my friends I stay,\nBut every night I go abroad\nAfar into the land of Nod.',
        },
        {
          kind: 'note',
          text: 'From "The Land of Nod." Every night the child travels alone to the land of Nod — that is, to sleep — where the strangest things to eat and see are waiting till morning. Where does your sleep take you at night?',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 6 · Rain and Rivers',
      art: 'stevenson-garden:ch6',
      artPrompt: 'a soft grey rain falling on umbrellas and a harbour of little ships, and beside it a small child crouched at a golden sandy river launching a paper boat under green trees, gentle storybook watercolor',
      blocks: [
        {
          kind: 'poem',
          text: 'The rain is raining all around,\nIt falls on field and tree,\nIt rains on the umbrellas here,\nAnd on the ships at sea.',
        },
        {
          kind: 'note',
          text: 'From "Rain." One rain falls on everything at once — fields, trees, umbrellas in the street, and ships far out at sea. On the next rainy day, name all the faraway places the very same rain is visiting.',
          art: 'lamp-hint',
        },
        {
          kind: 'poem',
          text: 'Dark brown is the river,\nGolden is the sand.\nIt flows along forever,\nWith trees on either hand.',
        },
        {
          kind: 'note',
          text: 'From "Where Go the Boats?" A brown river over golden sand carries the child\'s little boats away under the trees, and far downstream other little children will bring them ashore. Float a leaf or a paper boat and watch it sail off on its own long journey.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 7 · Up in the Air',
      art: 'stevenson-garden:ch7',
      artPrompt: 'a bright kite pulling high in a windy blue sky with birds tumbling past, and below a happy child perched in the crown of a cherry tree looking out over gardens and a shining river, blossom petals flying, gentle storybook watercolor',
      blocks: [
        {
          kind: 'poem',
          text: 'I saw you toss the kites on high\nAnd blow the birds about the sky;\nAnd all around I heard you pass,\nLike ladies\' skirts across the grass',
        },
        {
          kind: 'note',
          text: 'From "The Wind." Nobody ever sees the wind — only the kites it tosses, the birds it blows about, and the long grass it combs over. Wave your arms like branches and say the lines while the wind "goes by."',
          art: 'lamp-hint',
        },
        {
          kind: 'poem',
          text: 'Up into the cherry tree\nWho should climb but little me?\nI held the trunk with both my hands\nAnd looked abroad on foreign lands.',
        },
        {
          kind: 'note',
          text: 'From "Foreign Lands." From high in a cherry tree the whole world turns new and foreign: next-door gardens, a shining river like a looking-glass, and roads going to town and to fairyland. Climb somewhere safe and see how far your own foreign lands go.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 8 · A Happy Thought',
      art: 'stevenson-garden:ch8',
      artPrompt: 'a proud child sitting on a nursery rug with crossed arms guarding a heap of beloved toys, a wooden horse a ball and tin soldiers, while through the open window a wide sunlit world of fields rivers and ships gleams beyond the garden wall, gentle storybook watercolor',
      blocks: [
        {
          kind: 'poem',
          text: 'The world is so full of a number of things,\nI\'m sure we should all be as happy as kings.',
        },
        {
          kind: 'note',
          text: 'From "Happy Thought." The whole poem is just two lines long: the world is so full of things that we should all be as happy as kings. Name three things, right now, that make the world feel full to you.',
          art: 'lamp-hint',
        },
        {
          kind: 'poem',
          text: 'When I am grown to man\'s estate\nI shall be very proud and great,\nAnd tell the other girls and boys\nNot to meddle with my toys.',
        },
        {
          kind: 'note',
          text: 'From "Looking Forward." The child daydreams of being a proud grown-up who will warn everyone else not to touch his toys. Grown-ups always smile at this one — many of them remember daydreaming exactly the same thing.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 9 · Little Rules',
      art: 'stevenson-garden:ch9',
      artPrompt: 'a small child kneeling at a bedside saying prayers by candlelight, an orange sitting on a supper plate beside a tin soldier, cosy nursery shadows and warm candle glow, gentle storybook watercolor',
      blocks: [
        {
          kind: 'poem',
          text: 'Every night my prayers I say,\nAnd get my dinner every day;\nAnd every day that I\'ve been good,\nI get an orange after food.',
        },
        {
          kind: 'note',
          text: 'From "System." Prayers at night, dinner every day, and an orange after food on good days — the child explains his tidy little system with a perfectly straight face. What would be in your system? An apple after shoes? A song after bath?',
          art: 'lamp-hint',
        },
        {
          kind: 'poem',
          text: 'The child that is not clean and neat,\nWith lots of toys and things to eat,\nHe is a naughty child, I\'m sure—\nOr else his dear papa is poor.',
        },
        {
          kind: 'note',
          text: 'From "A Good Boy." A naughty child, this rhyme decides, must be naughty — or else his dear papa must be poor. Stevenson is gently poking fun at grown-ups who jump to big conclusions about children they have never met.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 10 · Walk Sedately',
      art: 'stevenson-garden:ch10',
      artPrompt: 'a row of small children walking very primly along a garden path with chins up and hands folded like little grown-ups, a giggling sparrow hopping sideways to watch them, hollyhocks by the wall, gentle storybook watercolor',
      blocks: [
        {
          kind: 'poem',
          text: 'Children, you are very little,\nAnd your bones are very brittle;\nIf you would grow great and stately,\nYou must try to walk sedately.',
        },
        {
          kind: 'note',
          text: 'From "Good and Bad Children." The poem pretends to scold: little children are very little, bones are very brittle, so walk sedately! Try walking sedately across the room once — and then go back the other way in your bounciest, least sedate walk.',
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
