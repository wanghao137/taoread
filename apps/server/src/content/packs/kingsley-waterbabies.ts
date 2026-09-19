import type { PackBook } from '../types'

/**
 * The Water-Babies — Charles Kingsley (1819–1875), first published 1863.
 * Retold for young readers in six chapters: Tom the little chimney-sweep at
 * Harthover Hall, his fall into the bright river and transformation, life
 * underwater with the water-babies, the two fairies' gentle lessons, the long
 * journey to the Other-End-of-Nowhere, and the pardon of his old master.
 * Harsh episodes are softened; the plot follows the public-domain original.
 * Source: The Water-Babies (Charles Kingsley, 1863), public domain worldwide
 * (Kingsley d. 1875).
 */
export const waterBabies: PackBook = {
  id: 'kingsley-waterbabies',
  title: 'The Water-Babies',
  author: 'Charles Kingsley',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro:
    'Tom is a little chimney-sweep who has never had a bath in his life. After a muddle at Harthover Hall he tumbles into the clearest river in England — and wakes up small and shiny and web-footed, a water-baby. Under the care of two gentle fairies, Tom learns kindness, swims to the end of nowhere to help the master who was unkind to him, and finds that a clean heart grows happier every day.',
  coverArt: 'waterbabies-river',
  coverArtPrompt:
    'A clear sunlit river pool below a mossy waterfall: a small shiny water-baby with webbed hands floats on his back among reeds and water-lilies, tiny fish darting past; dragonflies hover, light shafts break on the pebbly bottom, a fair face watches kindly from the spray. Aqua-and-green palette with pearl highlights, luminous dreamy storybook style.',
  coverFrom: '#4FC3F7',
  coverTo: '#E0F7FA',
  source: 'The Water-Babies (Charles Kingsley, 1863), public domain',
  chapters: [
    {
      title: 'Chapter 1 · The Little Chimney-Sweep',
      art: 'waterbabies-sweep',
      artPrompt:
        'A grand stone manor house in morning light: a small soot-black chimney-sweep boy sits on the ridge of a vast slate roof beside his gruff grown-up master, looking out in wonder at gardens, fountains and a shining river valley below; jackdaws wheel round the chimneys. Cool slate greys warmed by gold morning sun, wistful but hopeful storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'Once there was a little boy called Tom, who cleaned chimneys for a living. He had never been to school, and he had never, ever had a bath.',
        },
        {
          kind: 'text',
          text: 'One day Tom’s master took him to sweep the chimneys of Harthover Hall, the grandest house for forty miles.',
        },
        {
          kind: 'text',
          text: 'Tom climbed up the dark flues and came out on the roof — and stopped, with his mouth open. He had never seen the world so wide.',
        },
        {
          kind: 'image',
          art: 'waterbabies-sweep',
          text: 'Tom, black with soot, sees the wide world from the rooftop.',
        },
        {
          kind: 'note',
          text: 'New word: flue — the long chimney tunnel that carries smoke away.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Then, down in the garden, he saw a little girl in white, as clean as the morning. And Tom, all soot, longed — just once — to be clean like her.',
        },
      ],
    },
    {
      title: 'Chapter 2 · Into the Bright River',
      art: 'waterbabies-river',
      artPrompt:
        'A sparkling river pool in a green meadow valley: a small soot-black boy slips from a flat stone into the clearest water, rings spreading, sunbeams lancing through to the pebbles below, white water-lilies and reeds at the edges; meadowsweet flowers lean over the bank. Brilliant aqua and grass-green with diamond light, cool immersive storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'That day a great muddle happened, and everyone at the Hall thought Tom had done something he never did at all. So Tom ran — over the fields, through the woods, down and down, until he came to a river.',
        },
        {
          kind: 'text',
          text: 'It was the clearest river in all England, running over ribbed golden gravel.',
        },
        {
          kind: 'text',
          text: 'Tom slid into the cool water and washed and washed, and the soot floated away in grey clouds. How clean the river made him feel!',
        },
        {
          kind: 'image',
          art: 'waterbabies-river',
          text: 'Tom washes away the soot in the clearest river in England.',
        },
        {
          kind: 'note',
          text: 'New word: gravel — small loose pebbles, like the river’s own carpet.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'He floated on his back in the sun, drowsy as a fly on a lily pad — and fairies came quietly through the water, and put him gently to sleep, ready for a wonderful change.',
        },
      ],
    },
    {
      title: 'Chapter 3 · A Water-Baby',
      art: 'waterbabies-friends',
      artPrompt:
        'The river bottom in pearlescent light: a small shiny water-baby with webbed fingers floats among a school of laughing little fish and a strict-but-kind motherly caddis-fly in her pebble house, dragonfly nymphs parading by, sunbeams braiding through the clear green water above swaying weeds. Aqua-and-pearl palette, joyful underwater storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'When Tom woke, he was not sooty any more. He was small and smooth and sleek, with little webbed hands — and he could swim like a fish, because that is exactly what he now was: a water-baby.',
        },
        {
          kind: 'text',
          text: 'The river was full of neighbours. Caddis flies in their little pebble houses, dragonfly children learning to fly, and minnows who played tag all day.',
        },
        {
          kind: 'text',
          text: 'At first the fish were shy of Tom, for they had known him on land. But Tom learned their manners: never tease, never grab, always let the smallest fish finish first.',
        },
        {
          kind: 'image',
          art: 'waterbabies-friends',
          text: 'Tom plays tag with the minnows among the water-lilies.',
        },
        {
          kind: 'note',
          text: 'Ask your child: what river manners did Tom learn? What are pool manners at bath time?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'And somewhere far off in the water, other water-babies laughed — and one day soon, Tom would find them all.',
        },
      ],
    },
    {
      title: 'Chapter 4 · Two Fairies, Two Lessons',
      art: 'waterbabies-fairies',
      artPrompt:
        'A quiet cove underwater at dusk: a radiant gentle fairy with hair like goldenweed watches fondly as a small water-baby scrubs a smug little sea-anemone clean with a sponge, while a second fairy with darker, sterner eyes observes from a shadowed rock; pearls of bubbles rise through last rose light. Aqua-violet palette, patient warm storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'Two fairies kept watch over the river. One was gentle and smiling, and taught the water-babies to be kind. The other had sterner eyes, and taught them to be honest.',
        },
        {
          kind: 'text',
          text: 'Tom had one flaw left from his land days: he liked to tease the sea-anemones, poking their soft sides to watch them shut.',
        },
        {
          kind: 'text',
          text: 'So the fairies gave Tom a job: every morning, he must scrub the anemones’ rocks clean and tidy, and mind their stinging hairs, and never poke.',
        },
        {
          kind: 'image',
          art: 'waterbabies-fairies',
          text: 'Tom learns to care for the very anemones he used to tease.',
        },
        {
          kind: 'note',
          text: 'Ask your child: why do you think the fairies made Tom the anemones’ keeper?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'It was slow, soapy work. But one morning the anemones opened their bright crowns at Tom like little suns — and he understood that being trusted is the best fun of all.',
        },
      ],
    },
    {
      title: 'Chapter 5 · The Journey to the Other-End-of-Nowhere',
      art: 'waterbabies-journey',
      artPrompt:
        'A vast underwater seascape: a tiny water-baby swims bravely down a glowing channel between towering coral cliffs and forests of kelp, guided by a line of friendly lobsters waving their feelers, jellyfish like lanterns overhead, storm light far above. Deep teal and amethyst with warm lantern glows, brave epic storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'One day Tom heard news that made his heart squeeze: his old master Grimes had fallen on hard times, all alone by the sea, because of all his cross, unkind ways.',
        },
        {
          kind: 'text',
          text: 'Grimes had never been kind to Tom. But Tom had learned his lesson well. "Kindness is not for counting," he said, and set off for the Other-End-of-Nowhere.',
        },
        {
          kind: 'text',
          text: 'It was a long, long swim — past the last landing-place, past the lobster lines, down where the fairies light the way for the brave.',
        },
        {
          kind: 'image',
          art: 'waterbabies-journey',
          text: 'Tom swims to the end of nowhere, with lobster guides and lantern jellyfish.',
        },
        {
          kind: 'note',
          text: 'New word: brave — being scared and doing the kind thing anyway.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'And the fairies watched from the deep and nodded, for of all the lessons in the sea, this was the one they loved best.',
        },
      ],
    },
    {
      title: 'Chapter 6 · Grimes’s Tear',
      art: 'waterbabies-grimes',
      artPrompt:
        'A calm sky-lit cove: a gruff sooty sweep sits hunched on a rock being bathed by gentle water-nymphs with warm towels, his hard face melting into tears; nearby a small water-baby and a girl in white watch kindly from the shallows, seabirds wheeling in soft morning haze. Silver-and-rose palette, forgiving tender storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'At the Other-End-of-Nowhere, Tom found Grimes sitting grim and sooty by the water, cross with the whole world and loneliest of all.',
        },
        {
          kind: 'text',
          text: 'The gentle water-nymphs bathed Grimes and washed away his grumbles, though he grumbled loudest of anyone, until one big tear rolled down his sooty cheek.',
        },
        {
          kind: 'text',
          text: '"Why, Master," said Tom, "how do you do?" — and Grimes knew his little sweep again, and wept like rain, and was sorry from the bottom of his heart.',
        },
        {
          kind: 'image',
          art: 'waterbabies-grimes',
          text: 'Grimes weeps, and Tom forgives him before he even asks.',
        },
        {
          kind: 'note',
          text: 'Ask your child: Grimes was unkind to Tom. Why did Tom help him anyway?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Then Tom went home through the shining water, and there on the shore stood the little girl in white, grown kind and taller — for it was Ellie, who had watched for him all along. And the water-babies danced till the moon came up.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Water-Babies',
    author: 'Charles Kingsley',
    authorDeathYear: 1875,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Retold for young readers; harsh Victorian episodes softened, plot follows the original. Published 1863; public domain worldwide (Kingsley d. 1875).',
  },
}
