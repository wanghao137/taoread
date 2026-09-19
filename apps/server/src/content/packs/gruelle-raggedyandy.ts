import type { PackBook } from '../types'

/**
 * Raggedy Andy Stories — Johnny Gruelle (1880–1938), first published 1920.
 * Retold for young children in four chapters: a package from Grandmother,
 * a welcome bath, a brave night with a little mouse, and a bedtime dance.
 * Source: Raggedy Andy Stories (Johnny Gruelle, 1920), public domain.
 */
export const raggedyAndy: PackBook = {
  id: 'gruelle-raggedyandy',
  title: 'Raggedy Andy Stories',
  author: 'Johnny Gruelle',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro:
    'A package comes all the way from Grandmother, and inside is Andy — a little rag doll in a sailor suit with a broad-brimmed hat. Raggedy Ann and the toys welcome him, scrub him clean, and Andy proves that the smallest doll can be the bravest.',
  coverArt: 'andy-arrival',
  coverArtPrompt:
    'A small boy rag doll in a blue-and-white sailor suit and a wide floppy hat steps out of an open cardboard parcel tied with string, arms wide with joy. A smiling rag doll with red-yarn hair reaches out to greet him on a nursery rug. Paper wrappings and tissue everywhere, cozy playroom, warm evening lamp glow, gentle picture-book style.',
  coverFrom: '#8D6E63',
  coverTo: '#FFE0B2',
  source: 'Raggedy Andy Stories (Johnny Gruelle, 1920), public domain',
  chapters: [
    {
      title: 'Chapter 1 · A Box from Grandmother',
      art: 'andy-box',
      artPrompt:
        'An open cardboard box tied with brown string on a nursery floor, tissue paper spilling out, and a little rag doll in a sailor suit sitting up inside it with a straw hat in his hand. A rag doll with red-yarn hair leans over the edge to look in. Soft window light with floating dust motes, warm and homely, children’s book style.',
      blocks: [
        {
          kind: 'text',
          text: 'One morning a parcel came for the little girl. It was from Grandmother, far away.',
        },
        {
          kind: 'text',
          text: 'Inside was a small rag doll in a sailor suit. "I am Andy," he said, hopping out. "I lived at Grandmother’s house when she was small."',
        },
        {
          kind: 'image',
          art: 'andy-box',
          text: 'Andy steps out of the parcel and tips his hat.',
        },
        {
          kind: 'text',
          text: 'All the toys came running. "Welcome, Andy!" cried Raggedy Ann, hugging him tight. Andy tipped his hat and smiled.',
        },
        {
          kind: 'note',
          text: 'New word: parcel — a box wrapped up and sent in the mail.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'That night, Andy slept between Raggedy Ann and the teddy bear, warm and happy in his new home.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Welcome Bath',
      art: 'andy-bath',
      artPrompt:
        'A cheerful washbasin scene: a little rag doll in a rolled-up sailor suit splashes in a white basin of suds while a rag doll with red-yarn hair scrubs his hat clean and two toys hold a hand towel ready. Soap bubbles drift up and catch the light. Bright morning sunshine from a window, playful and soft, picture-book style.',
      blocks: [
        {
          kind: 'text',
          text: 'Andy’s face was dusty from his long trip. "Let us have a bath!" said Raggedy Ann.',
        },
        {
          kind: 'text',
          text: 'The toys filled the little basin with warm, soapy water. Splash, splash! Andy scrubbed his cheeks. The teddy bear brought the towel.',
        },
        {
          kind: 'image',
          art: 'andy-bath',
          text: 'Splish, splash — Andy gets squeaky clean in the basin.',
        },
        {
          kind: 'text',
          text: 'When he was dry, Andy looked in the mirror. His sailor suit was crisp, and his cheeks were pink and new.',
        },
        {
          kind: 'note',
          text: 'New word: basin — a wide bowl for washing, like a little tub.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"A clean doll is a happy doll," laughed Raggedy Ann. And all the toys agreed.',
        },
      ],
    },
    {
      title: 'Chapter 3 · Andy and the Little Mouse',
      art: 'andy-mouse',
      artPrompt:
        'A moonlit nursery at midnight: a brave little rag doll in a sailor suit stands on the rug, lantern-light from a night lamp, politely offering a cookie crumb to a tiny grey mouse sitting up on its haunches. A rag doll with red-yarn hair and a teddy bear watch from the toy chest. Silver-blue moonlight with one warm pool of lamplight, gentle and sweet.',
      blocks: [
        {
          kind: 'text',
          text: 'At midnight, Andy heard a tiny sound. Scratch, scratch. Out of the wall peeked a little grey mouse.',
        },
        {
          kind: 'text',
          text: 'The toys shivered. But Andy stepped forward and tipped his hat. "Good evening, little mouse. Are you hungry?"',
        },
        {
          kind: 'text',
          text: 'The mouse nodded. Andy pushed over a cookie crumb, big as a dinner to the mouse.',
        },
        {
          kind: 'image',
          art: 'andy-mouse',
          text: 'Andy shares his cookie crumb with the little grey mouse.',
        },
        {
          kind: 'note',
          text: 'Ask your child: how did Andy help the mouse? Was he brave or kind, or both?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"Thank you," squeaked the mouse, nibbling happily. Then she whisked back into her little door, and the toys cheered softly for brave Andy.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Bedtime Dance',
      art: 'andy-dance',
      artPrompt:
        'Toys waltzing in a moonlit nursery: a sailor-suited rag doll bows to a red-yarn-haired rag doll, one hand on his hat, while a teddy bear turns the music of a small clockwork music box. Socks of tin soldiers line the shelf above. Starlight through sheer curtains, milky blue night tones with warm accents, tender picture-book style.',
      blocks: [
        {
          kind: 'text',
          text: 'That night the toys had a welcome dance for Andy. The music box played a waltz, and the teddy bear spun the key.',
        },
        {
          kind: 'text',
          text: 'Andy bowed very low to Raggedy Ann. "May I have this dance?" he asked.',
        },
        {
          kind: 'text',
          text: 'They waltzed across the rug, one, two, three — one, two, three — until every toy was laughing.',
        },
        {
          kind: 'image',
          art: 'andy-dance',
          text: 'Andy and Raggedy Ann waltz under the stars.',
        },
        {
          kind: 'note',
          text: 'Ask your child: how would you welcome a new friend to your home?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'When the music stopped, they all snuggled into the toy chest. "Welcome home, Andy," whispered Raggedy Ann. And the moon smiled through the window.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Raggedy Andy Stories',
    author: 'Johnny Gruelle',
    authorDeathYear: 1938,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Retold for young readers; plot follows the public-domain original. Published 1920; US public domain (pre-1929) and PD in the EU (Gruelle d. 1938, 70y pma expired 2009).',
  },
}
