import type { PackBook } from '../types'

/**
 * Cecily Parsley's Nursery Rhymes — Beatrix Potter (1866–1943), first
 * published 1922. Six short rhymes selected and lightly adapted from the
 * 1922 collection (Cecily Parsley, the five pigs, the little garden, and
 * traditional rhymes Potter loved), arranged in three chapters for reading
 * aloud with children aged 3-5. Public domain: published 1922, US pre-1929;
 * Potter d. 1943, EU life+70 expired 2014.
 */
export const cecilyParsley: PackBook = {
  id: 'tale-cecilyparsley',
  title: 'Cecily Parsley\'s Nursery Rhymes',
  author: 'Beatrix Potter',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: 'A second little book of rhymes: Cecily Parsley in her pen, five small pigs, a garden to water, a candle riddle, and a goose on the stairs. It ends with a star for sleepy eyes.',
  coverArt: 'cecily-garden',
  coverArtPrompt: 'a neat walled kitchen garden in late afternoon sun, a plump motherly goose in a bonnet standing among bean rows, five tiny piglets trotting along the path behind her, a watering can and wicker basket on the path, roses climbing the brick wall, honey-coloured light, warm storybook watercolour style',
  coverFrom: '#33691E',
  coverTo: '#C5E1A5',
  source: 'Cecily Parsley\'s Nursery Rhymes (Beatrix Potter, 1922), public domain (Potter d. 1943)',
  chapters: [
    {
      title: 'Chapter 1 · At Cecily\'s Pen',
      art: 'cecily-pen',
      artPrompt: 'a neat wooden pen with a low gate in a cottage garden, a motherly goose wearing an apron waving a wooden spoon as tiny gentlemen in top hats walk away down the path, laundry on a line, hollyhocks by the door, bright cheerful midday light, humorous storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'Cecily Parsley lived in a pen, and brewed good ale for gentlemen; gentlemen came every day, till Cecily Parsley drove them away.',
        },
        {
          kind: 'image',
          art: 'cecily-pen',
          text: 'Cecily Parsley waves the gentlemen goodbye.',
        },
        {
          kind: 'text',
          text: 'This pig went to market; this pig stayed at home; this pig had roast beef; this pig had none; this little pig cried, Wee! wee! wee! all the way home!',
        },
        {
          kind: 'image',
          art: 'cecily-pigs',
          text: 'Five little pigs, one for every toe.',
        },
        {
          kind: 'note',
          text: 'The five pigs are a toe game. Tap each of your child\'s toes for a pig, and tickle the smallest one at "Wee! wee! wee!"',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Little Garden',
      art: 'cecily-seeds',
      artPrompt: 'two small children watering a tiny vegetable patch with a bright green watering can, neat rows of seedlings and one proud sunflower, a rabbit watching from the long grass at the edge, soft summer afternoon light with long shadows, fresh green storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'We have a little garden, a garden of our own; and every day we water it, and watch what we have sown.',
        },
        {
          kind: 'image',
          art: 'cecily-seeds',
          text: 'Every day we water the little garden.',
        },
        {
          kind: 'text',
          text: 'Ninny nanny netticoat, in a white petticoat, and a red nose; the longer she stands, the shorter she grows.',
        },
        {
          kind: 'image',
          art: 'cecily-candle',
          text: 'A little white candle with a red nose.',
        },
        {
          kind: 'note',
          text: 'The netticoat rhyme is a riddle. Let your child guess: what stands in the light, and grows shorter and shorter? A candle!',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 3 · Evening Rhymes',
      art: 'cecily-goose',
      artPrompt: 'a plump white goose with a lantern walking carefully up the stairs of a cosy lamplit house, her wings spread for balance, warm light spilling from bedroom doors, a small mouse peeping around the banister, deep blue evening visible through the window, gentle storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'Goosey, goosey, gander, whither shall I wander? Upstairs, downstairs, and in my lady\'s chamber.',
        },
        {
          kind: 'image',
          art: 'cecily-goose',
          text: 'Goosey wanders upstairs with her lantern.',
        },
        {
          kind: 'text',
          text: 'Twinkle, twinkle, little star, how I wonder what you are; up above the world so high, like a diamond in the sky.',
        },
        {
          kind: 'image',
          art: 'cecily-star',
          text: 'One bright star over the sleeping garden.',
        },
        {
          kind: 'note',
          text: 'End the evening by looking out of the window for one real star. Say goodnight to it, and to the goose, and to each other.',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Cecily Parsley\'s Nursery Rhymes',
    author: 'Beatrix Potter',
    authorDeathYear: 1943,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Published 1922; US public domain (pre-1929) and EU public domain (Potter d. 1943, 70y pma expired 2014). Rhymes selected and lightly adapted from the 1922 collection and traditional sources.',
  },
}
