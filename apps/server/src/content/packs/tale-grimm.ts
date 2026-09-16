import type { PackBook } from '../types'

/**
 * Grimm's Fairy Tales — "Little Red-Cap" (Little Red Riding Hood), excerpt.
 * Text: Project Gutenberg eBook #2591 (Jacob & Wilhelm Grimm, translated from German).
 * The Brothers Grimm died 1863 / 1859; the English translation used here is a
 * pre-1929 US public-domain text. Excerpted and lightly modernized in spelling only
 * ("’" quotes) for young readers; sentence wording preserved.
 */
export const littleRedCap: PackBook = {
  id: 'little-red-cap',
  title: 'Little Red Riding Hood',
  author: 'Brothers Grimm',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: 'A little girl in a red hood goes to visit her grandmother. But someone is waiting on the path…',
  coverArt: 'red-riding-hood',
  coverFrom: '#C62828',
  coverTo: '#EF9A9A',
  source: 'Project Gutenberg eBook #2591, public domain (Grimm brothers d. 1859/1863)',
  chapters: [
    {
      title: 'Chapter 1 · The Path Through the Wood',
      art: 'forest-path',
      blocks: [
        {
          kind: 'text',
          text: 'Once upon a time there was a dear little girl, who was loved by every one who looked at her, but most of all by her grandmother. Once she gave the child a little cap of red velvet, and it suited her so well that she would never wear anything else.',
        },
        {
          kind: 'image',
          art: 'red-riding-hood',
          text: 'The little girl in her red cap, walking through the wood.',
        },
        {
          kind: 'text',
          text: 'So she was always called Little Red-Cap. One day her mother said to her: "Come, Little Red-Cap, here is a piece of cake and a bottle of wine. Take them to your grandmother, she is ill and weak, and they will do her good."',
        },
        {
          kind: 'text',
          text: '"And when you go into her room, don’t forget to say good-morning, and don’t peep into every corner before you do it." Little Red-Cap promised to obey her mother.',
        },
        {
          kind: 'text',
          text: 'The grandmother lived out in the wood, half a league from the village, and just as Little Red-Cap entered the wood, a wolf met her. Little Red-Cap did not know what a wicked animal he was, and was not afraid of him.',
        },
        {
          kind: 'note',
          text: 'New word: league — an old way of measuring distance, about how far you can walk in an hour.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"Good-day, Little Red-Cap," said he. "Thank you kindly, wolf." — "Whither away so early, Little Red-Cap?" — "To my grandmother’s." — "What have you got in your basket?" — "Cake and wine."',
        },
        {
          kind: 'text',
          text: '"Where does your grandmother live, Little Red-Cap?" — "A good quarter of a league farther on in the wood. Her house stands under the three large oak-trees."',
        },
        {
          kind: 'text',
          text: 'The wolf thought to himself: "What a tender young creature! She will be a dainty morsel!" So he walked a short time by the side of Little Red-Cap, and then he said: "See, Little Red-Cap, how pretty the flowers are all around us! Listen to the birds singing!"',
        },
        {
          kind: 'text',
          text: 'Little Red-Cap looked up, and saw the sunbeams dancing here and there through the trees, and pretty flowers growing everywhere. She thought: "If I bring grandmother a bunch of flowers, it will make her happy." So she turned off the path, and went deeper into the wood to gather flowers.',
        },
      ],
    },
  ],
  rights: {
    workTitle: "Grimm's Fairy Tales — Little Red-Cap",
    author: 'Jacob & Wilhelm Grimm',
    authorDeathYear: 1863,
    jurisdiction: 'US',
    basis: 'pd-us',
    sourceUrl: 'https://www.gutenberg.org/ebooks/2591',
    note: 'Grimm brothers died 1859 and 1863; this English translation is a pre-1929 US public-domain text from Project Gutenberg eBook #2591. Excerpted only.',
  },
}
