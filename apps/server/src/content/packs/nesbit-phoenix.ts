import type { PackBook } from '../types'

/**
 * The Phoenix and the Carpet — five chapters retold in simple English
 * for young readers. Original: E. (Edith) Nesbit, published 1904.
 * Public domain in the US (pre-1929) and worldwide (Nesbit died 1924;
 * 70y pma expired). The burned carpet, the golden egg, the Phoenix, the
 * sea at sunset, the cook's wish, the Persian bazaar, and the Phoenix's
 * fiery farewell follow the original novel; wording simplified into
 * short sentences for children aged 6-8.
 */
export const phoenixCarpet: PackBook = {
  id: 'nesbit-phoenix',
  title: 'The Phoenix and the Carpet',
  author: 'E. Nesbit',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'Four children buy an old second-hand carpet to replace one ruined by fireworks - and find a glowing golden egg hidden in its folds. The egg hatches in the fire, and out steps the Phoenix, a bird of flame who knows the carpet can carry them anywhere they wish.',
  coverArt: 'phoenix-carpet',
  coverArtPrompt: 'a magnificent golden bird with sweeping tail feathers hatching from a glowing egg on the patterned folds of an old Turkish carpet in front of a Nursery hearth fire, four children in 1900s nightclothes and a baby watching in wonder, sparks rising, warm firelight filling a cozy Edwardian nursery, magical storybook illustration',
  coverFrom: '#BF360C',
  coverTo: '#FFAB91',
  source: 'The Phoenix and the Carpet (E. Nesbit, 1904), public domain (Nesbit d. 1924)',
  chapters: [
    {
      title: 'Chapter 1 · The Egg in the Carpet',
      art: 'phoenix-hatching',
      artPrompt: 'a golden glowing egg cracking open among the folded fringes of a patterned carpet before a nursery fire, a splendid flame-colored bird unfolding its wings out of the flames, four children in nightgowns holding each other in amazement, a startled cat leaping away, warm orange firelight, magical storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'It began with fireworks in the nursery, which no child should ever touch. The old carpet burned a hole right through its middle, and Father said no more fireworks for a year. So the children bought a big second-hand carpet from the shop, and carried it home themselves.',
        },
        {
          kind: 'image',
          art: 'phoenix-egg',
          text: 'Something glows inside the folds of the new old carpet.',
        },
        {
          kind: 'text',
          text: 'While the carpet lay rolled by the fire, Cyril found a strange egg tucked deep in its folds. The egg was big, golden, and warm. Anthea pushed it gently into the embers - and it cracked open, and a splendid bird of flame stepped out, singing a song like tiny golden bells.',
        },
        {
          kind: 'note',
          text: 'New word: Phoenix - a wonderful bird of fire. When it grows old it burns itself, and a new Phoenix rises from the ashes.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"I am the Phoenix," said the bird, "and this is a magic carpet. Speak your wish, and it will carry you anywhere on earth." The children looked at each other with shining eyes. The burnt nursery carpet had turned out to be the most wonderful thing in the world.',
        },
      ],
    },
    {
      title: 'Chapter 2 · Sunset by the Sea',
      art: 'phoenix-sea-tower',
      artPrompt: 'four children on a carpet flying through a golden sunset sky toward a calm sea, a lonely church tower on a small rocky island below them, gulls and pink clouds, the Phoenix sailing above like a small golden flame, wide evening horizon, warm glowing storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'The very next morning the children folded the carpet and spoke their first wish. "We wish to go to the sea!" And the carpet rose right up through the window and sailed away over the rooftops, with the Phoenix flying above like a little golden flame.',
        },
        {
          kind: 'image',
          art: 'phoenix-landing',
          text: 'The carpet sets them down on a lonely church tower in the sea.',
        },
        {
          kind: 'text',
          text: 'They saw the sea at sunset, just as they had wished - and then the light went out. At night the carpet\'s magic sleeps, and it would not fly. The children spent the whole dark night on the top of a lonely church tower, cold and hungry, huddled together with the Phoenix for company.',
        },
        {
          kind: 'note',
          text: 'Talk together: The children wished but forgot to plan. What should they have thought about before they flew away?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'When the sun rose and warmed the towers and the waves, the carpet woke with a stretch. The children climbed on and flew home just in time for breakfast, very tired, very sandy, and very glad to see their own nursery. The Phoenix hummed a small golden song about learning from a cold night.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Cook\'s Wish',
      art: 'phoenix-cook-queen',
      artPrompt: 'a stout cook in a white apron and cap sitting queenly on a woven mat throne on a palm-fringed island, island women bringing her fruit and fanning her with big leaves, four children peeking from behind a palm tree, turquoise sea and bright sun, funny warm storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'Wishes are dangerous things to say near a magic carpet, as the cook found out. She only grumbled that she wished to be a queen and have people wait on her. The carpet heard - and in a flash the cook was gone, and the nursery stood empty of cakes.',
        },
        {
          kind: 'image',
          art: 'phoenix-palm-island',
          text: 'The cook is a queen now - and queens are not allowed to go home.',
        },
        {
          kind: 'text',
          text: 'The children flew after her and found her on a sunny island, sitting on a mat throne with fruits heaped around. The island people bowed and fanned her and would not let their queen leave. "I want my kitchen back!" wept the cook, who was tired of pineapple and admiring bows.',
        },
        {
          kind: 'note',
          text: 'New word: wish - a hope spoken out loud. With magic around, be careful which wishes you say.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'It took all four children and one golden bird to smuggle a queen onto a carpet and carry her home through the clouds. The cook went straight back to her stove and never grumbled about being a cook again. And the children made a new rule: never, ever speak a wish by accident.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Persian Bazaar',
      art: 'phoenix-persia',
      artPrompt: 'a crowded ancient bazaar with striped awnings, brass lamps and spice sacks hanging everywhere, four children crowded on a carpet among crowds of merchants in turbans, one rich merchant fingering the carpet\'s fringe eagerly, the Phoenix glowing hidden in a basket, dusty golden afternoon light, busy storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'One wish took the children to a real bazaar in faraway Persia, full of silks, spices, and brass lamps. It was wonderful for about one minute. Then a rich merchant saw their magic carpet, cried out that it was the wonder of the age, and offered to buy it.',
        },
        {
          kind: 'image',
          art: 'phoenix-blaze',
          text: 'The Phoenix blazes up, and the bazaar stares and shouts.',
        },
        {
          kind: 'text',
          text: 'Before the children could say no, the merchants crowded close, and the carpet began to rise without them. "Now, Phoenix!" cried Anthea. The Phoenix burst out of its basket in full blazing glory, singing like golden bells, and the whole bazaar fell back in astonishment. The children grabbed the flying carpet\'s edge as it swept them home.',
        },
        {
          kind: 'note',
          text: 'Question for you: The merchant only wanted to buy, not to steal. Still, why was it better to keep the carpet at home?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Safe in the nursery, the Phoenix shook the dust of Persia from its feathers and preened proudly. "No one feasts their eyes on my friend the carpet," it said, "unless the carpet is willing." The children agreed. Some things are worth more than all the spices in a bazaar.',
        },
      ],
    },
    {
      title: 'Chapter 5 · The Phoenix\'s Farewell',
      art: 'phoenix-farewell',
      artPrompt: 'a night sky over an English suburb full of rising fireworks, a golden bird spiraling upward into its own shower of sparks like a living firework, four children and a baby watching from a rooftop with upturned faces, the old carpet folded beside them, deep blue night, bittersweet magical storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'Summer went on, and one dark night a robber crept into the house, quiet as a shadow. He had almost reached the nursery door when the Phoenix woke. The bird burst into full flame and sang its golden song, and the robber fled down the stairs and out into the night, thinking the whole house was on fire.',
        },
        {
          kind: 'image',
          art: 'phoenix-robber',
          text: 'A blazing bird and a golden song send the robber running.',
        },
        {
          kind: 'text',
          text: 'But the Phoenix was growing old, as all Phoenixes do. "It is time," it said gently. "A Phoenix burns, and a new one rises from the egg in two thousand years." The carpet too was wearing thin, its edges fray by fray. The children hugged the bird and did not try to keep it, though their eyes were wet.',
        },
        {
          kind: 'note',
          text: 'Talk together: The Phoenix must burn to be born again. How can letting something go be part of loving it?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'So the Phoenix flew up into the fireworks of a fair, brighter than any rocket, and folded itself into its own flame. The children watched the golden sparks fall like warm rain. Then they went home through the summer dark, carrying their thin, wonderful carpet - and the memory of a friend made of fire.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Phoenix and the Carpet',
    author: 'E. Nesbit',
    authorDeathYear: 1924,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Retold for children; plot follows the public-domain original. Published 1904; worldwide public domain.',
  },
}
