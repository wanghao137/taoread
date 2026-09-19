import type { PackBook } from '../types'

/**
 * Appley Dapply's Nursery Rhymes — Beatrix Potter (1866–1943), first
 * published 1917. Six short animal rhymes selected and lightly adapted from
 * the 1917 collection, arranged in three chapters for reading aloud with
 * children aged 3-5. Public domain: published 1913-era text style, US
 * pre-1929; Potter d. 1943, EU life+70 expired 2014.
 */
export const appleyDapply: PackBook = {
  id: 'tale-appleydapply',
  title: 'Appley Dapply\'s Nursery Rhymes',
  author: 'Beatrix Potter',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: 'Six little rhymes about small busy creatures: a mouse in the pantry, a hedgehog with his pins, a mole in black velvet, and more. Short enough to learn by heart at bedtime.',
  coverArt: 'appley-house',
  coverArtPrompt: 'a cosy little country house at dusk with warm yellow windows, a tiny brown mouse peering around the doorstep, a hedgehog and a guinea pig waiting politely by the garden path, ivy on the walls and a lantern by the door, lavender-blue evening sky with early stars, warm storybook watercolour style, snug and gentle mood',
  coverFrom: '#6D4C41',
  coverTo: '#DCEDC8',
  source: 'Appley Dapply\'s Nursery Rhymes (Beatrix Potter, 1917), public domain (Potter d. 1943)',
  chapters: [
    {
      title: 'Chapter 1 · In the Little Brown House',
      art: 'appley-pantry',
      artPrompt: 'a tiny brown mouse standing on a kitchen shelf beside a large ceramic bowl, sniffing at a pan and a milk can, old-fashioned dresser with crockery behind, moonlight through a small latched window, soft silver and warm brown tones, cosy storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'Appley Dapply, a little brown mouse, goes about the house, all sniff and snout; down the cellar stairs there she has a lair, and nobody goes there but Appley Dapply.',
        },
        {
          kind: 'image',
          art: 'appley-pantry',
          text: 'Appley Dapply sniffs along the pantry shelf.',
        },
        {
          kind: 'text',
          text: 'Old Mr. Pricklepin has never a pin to prick his skin; he keeps them all in little tins, with cotton-wool ends, so visitors may come safe in.',
        },
        {
          kind: 'image',
          art: 'appley-hedgehog',
          text: 'Old Mr. Pricklepin keeps his pins in tins.',
        },
        {
          kind: 'note',
          text: 'Clap the rhythm together as you read each line. Rhymes are easier to remember with a little clap on the last word.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 2 · Friends Under the Ground',
      art: 'appley-clover',
      artPrompt: 'a round little guinea pig sitting contentedly in a meadow of grass and clover, bright sunlight on his fur, a fat bumblebee hovering nearby, a stone wall and cottage garden in the background, fresh green and gold morning colours, gentle storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'There was a little guinea pig, who, being little, was not big; he always walked upon his feet, and never fasted when he eat.',
        },
        {
          kind: 'image',
          art: 'appley-clover',
          text: 'The little guinea pig among the clover.',
        },
        {
          kind: 'text',
          text: 'Diggory, Diggory, Delvet! A little old man in black velvet; he lives in a hole in the garden ground, and never a soul knows when he is around.',
        },
        {
          kind: 'image',
          art: 'appley-mole',
          text: 'Diggory Delvet, digging in his black velvet coat.',
        },
        {
          kind: 'note',
          text: 'A mole digs under the ground all day. Ask your child: who else lives in a hole? Rabbits, worms, and sleepy dormice too.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 3 · Pies and Goodnight',
      art: 'appley-pies',
      artPrompt: 'a kindly old sheep in a white cap and apron taking golden pies from a deep stone kitchen oven, warm firelight on the kitchen walls, a small mouse watching from a chair by the table, rolling pins and pastry on the counter, cosy amber evening light, storybook watercolour style',
      blocks: [
        {
          kind: 'text',
          text: 'Dame, get up, and bake your pies, bake your pies, bake your pies; Dame, get up, and bake your pies, on a Sunday morning.',
        },
        {
          kind: 'image',
          art: 'appley-pies',
          text: 'Dame gets up to bake her pies.',
        },
        {
          kind: 'text',
          text: 'The moon is up, the pantry shut, the candles out, the floor swept up; good night, brown mouse, curl up small, and dream of crumbs behind the wall.',
        },
        {
          kind: 'image',
          art: 'appley-lullaby',
          text: 'Goodnight, little mouse, curled up small.',
        },
        {
          kind: 'note',
          text: 'The last rhyme is a lullaby. Whisper it slowly, then let your child whisper the last line back to you.',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Appley Dapply\'s Nursery Rhymes',
    author: 'Beatrix Potter',
    authorDeathYear: 1943,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Published 1917; US public domain (pre-1929) and EU public domain (Potter d. 1943, 70y pma expired 2014). Six rhymes selected and lightly adapted from the 1917 collection for reading aloud.',
  },
}
