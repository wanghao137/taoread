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
    {
      title: 'Chapter 2 · What Big Eyes You Have',
      art: 'wolf-bed',
      blocks: [
        {
          kind: 'text',
          text: 'Meanwhile the wolf ran straight to the grandmother’s house and knocked at the door. "Who is there?" — "Little Red-Cap," replied the wolf. "She is bringing cake and wine; open the door."',
        },
        {
          kind: 'text',
          text: '"Lift the latch," called out the grandmother, "I am too weak, and cannot get up." The wolf lifted the latch, the door sprang open, and without saying a word he went straight to the grandmother’s bed, and devoured her. Then he put on her clothes, dressed himself in her cap, laid himself in bed and drew the curtains.',
        },
        {
          kind: 'image',
          art: 'wolf-bed',
          text: 'The wolf in grandmother’s cap, lying in her bed.',
        },
        {
          kind: 'text',
          text: 'Little Red-Cap, however, had been running about picking flowers, and when she had gathered so many that she could carry no more, she remembered her grandmother, and set out on the way to her.',
        },
        {
          kind: 'text',
          text: 'She was surprised to find the cottage-door standing open, and when she went into the room, she had such a strange feeling that she said to herself: "Oh dear! how uneasy I feel today, and at other times I like being with grandmother so much."',
        },
        {
          kind: 'text',
          text: '"Oh! grandmother," she said, "what big ears you have!" — "The better to hear you with, my child," was the reply. "But, grandmother, what big eyes you have!" — "The better to see you with, my dear."',
        },
        {
          kind: 'note',
          text: 'New word: ears — the two parts of your head that you hear with. Everyone’s ears are smaller than the wolf’s!',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"But, grandmother, what large hands you have!" — "The better to hug you with." "Oh! but, grandmother, what a terrible big mouth you have!" — "The better to eat you with!"',
        },
        {
          kind: 'text',
          text: 'And scarcely had the wolf said this, than with one bound he was out of bed and swallowed up Red-Cap.',
        },
        {
          kind: 'text',
          text: 'When the wolf had appeased his appetite, he lay down again in the bed, fell asleep and began to snore very loud. The huntsman was just passing the house, and thought to himself: "How the old woman is snoring! I must just see if she wants anything."',
        },
        {
          kind: 'text',
          text: 'When he came to the bed, he saw that the wolf was lying in it. "Do I find you here, you old sinner!" said he. "I have long sought you!" Then it occurred to him that the wolf might have devoured the grandmother, and that she might still be saved, so he did not fire, but took a pair of scissors, and began to cut open the stomach of the sleeping wolf.',
        },
        {
          kind: 'text',
          text: 'When he had made two snips, he saw the little Red-Cap shining, and then he made two snips more, and the little girl sprang out, crying: "Ah, how frightened I have been! How dark it was inside the wolf"; and after that the aged grandmother came out alive also, but scarcely able to breathe.',
        },
        {
          kind: 'text',
          text: 'Red-Cap, however, quickly fetched great stones with which they filled the wolf’s belly, and when he awoke, he wanted to run away, but the stones were so heavy that he collapsed at once, and fell dead. Then all three were delighted.',
        },
      ],
    },
    {
      title: 'Chapter 3 · Never Leave the Path Again',
      art: 'forest-path',
      blocks: [
        {
          kind: 'text',
          text: 'The grandmother ate the cake and drank the wine which Red-Cap had brought, and revived. But Red-Cap thought to herself: "As long as I live, I will never by myself leave the path, to run into the wood, when my mother has forbidden me to do so."',
        },
        {
          kind: 'image',
          art: 'forest-path',
          text: 'The safe path through the wood, with flowers on both sides.',
        },
        {
          kind: 'text',
          text: 'It also related that once when Red-Cap was again taking cakes to the old grandmother, another wolf spoke to her, and tried to entice her from the path. Red-Cap, however, was on her guard, and went straight forward on her way.',
        },
        {
          kind: 'note',
          text: 'New word: guard — when you are on your guard, you are careful and watchful.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'She told her grandmother that she had met the wolf, and that he had said "good morning" to her, but with such a wicked look in his eyes, that if they had not been on the public road she was certain he would have eaten her up.',
        },
        {
          kind: 'text',
          text: '"Well," said the grandmother, "we will shut the door, that he may not come in." Soon afterwards the wolf knocked, and cried: "Open the door, grandmother, I am Little Red-Cap, and am bringing you some cakes."',
        },
        {
          kind: 'text',
          text: 'But they did not speak, or open the door, so the grey-beard stole twice or thrice round the house, and at last jumped on the roof, intending to wait until Red-Cap went home in the evening, and then to steal after her and devour her in the darkness.',
        },
        {
          kind: 'text',
          text: 'But the grandmother saw what was in his thoughts. In front of the house was a great stone trough, so she said to the child: "Take the pail, Red-Cap; I made some sausages yesterday, so carry the water in which I boiled them to the trough."',
        },
        {
          kind: 'text',
          text: 'Red-Cap carried until the great trough was quite full. Then the smell of the sausages reached the wolf, and he sniffed and peeped down, and at last stretched out his neck so far that he could no longer keep his footing and began to slip, and slipped down from the roof straight into the great trough, and was drowned.',
        },
        {
          kind: 'text',
          text: 'But Red-Cap went joyously home, and no one ever did anything to harm her again.',
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
