import type { PackBook } from '../types'

/**
 * Five Children and It — five chapters retold in simple English for young readers.
 * Original: E. (Edith) Nesbit, published 1902. Public domain in the US (pre-1929)
 * and worldwide (Nesbit died 1924; 70y pma expired). The Psammead (the Sand-fairy),
 * the gravel pit, and the wishes for wings, beauty, gold and growing-up follow the
 * original novel; wording simplified into short sentences for children aged 6-8.
 */
export const fiveChildren: PackBook = {
  id: 'tale-fivechildren',
  title: 'Five Children and It',
  author: 'E. Nesbit',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'Five children dig in a gravel pit and find a brown, furry, snail-eyed creature with bat ears - a Sand-fairy who can grant wishes. Every wish lasts only until sunset... and never works out as they hope.',
  coverArt: 'psammead-cover',
  coverArtPrompt: 'a brown furry creature with bat ears and snail eyes on stalks sitting up in a gravel pit, five children in straw hats digging around it with spades, a white country cottage on the hill above, warm afternoon sun',
  coverFrom: '#5D4037',
  coverTo: '#A1887F',
  source: 'Project Gutenberg eBook #16880, public domain (Nesbit d. 1924)',
  chapters: [
    {
      title: 'Chapter 1 · The Psammead',
      art: 'gravel-pit-fairy',
      artPrompt: 'a sunken gravel pit with old roots and ferns, five children in straw hats digging with spades and hands, a brown furry creature with bat ears and snail eyes on stalks sitting up out of the loose gravel',
      blocks: [
        {
          kind: 'text',
          text: 'There were five children, and they had come to live in a white house in the country, far from London. Their names were Anthea, Robert, Cyril, Jane, and the baby, who was called the Lamb. They were very lonely, and there was nothing to do.',
        },
        {
          kind: 'image',
          art: 'gravel-pit-dig',
          text: 'The children dig in the gravel pit - and something moves.',
        },
        {
          kind: 'text',
          text: 'So they went to dig in the gravel pit. They dug and dug, and the hole grew deep, and the earth fell in. Suddenly Robert gave a shout. "It is alive!" he cried. There in the gravel was something brown and furry - with eyes that stood out on stalks, like a snail\'s, and ears like a bat\'s.',
        },
        {
          kind: 'note',
          text: 'New word: gravel — small rough stones mixed with sand. Gravel pits are dug to get it for making roads.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The thing spoke in a small, thin voice. "What do you want?" it said. The children were frightened, but Anthea answered, "We were only digging. Who are you?" "I am a Psammead," it said - "a Sand-fairy. I can grant wishes."',
        },
        {
          kind: 'text',
          text: 'The Psammead was very old and very cross, for it had slept in the gravel for thousands of years. "You may have one wish a day," it said. "But the wish will last only until sunset. And I warn you - the old wishes never made anyone happy. Still, you had better wish something."',
        },
        {
          kind: 'text',
          text: 'The children looked at each other, and their eyes shone. A wish a day, until sunset! They ran home as fast as they could, their heads so full of plans that they could hardly eat their dinner. Tomorrow they would make their first wish - and they were quite sure it would be the beginning of being happy forever.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Wish for Wings',
      art: 'flying-children',
      artPrompt: 'five children with big soft white birds\' wings flying over a green English countryside with a church tower below, one girl clutching a baby, a churchyard and a lane and a baker\'s cart on the road',
      blocks: [
        {
          kind: 'text',
          text: 'The next morning they ran down to the gravel pit bright and early, and made their very first wish. "I wish we all had beautiful wings," said Anthea, "so we could fly!" The Psammead blew itself out like a balloon, and the wish was made.',
        },
        {
          kind: 'image',
          art: 'wings-wish',
          text: 'With wings on their shoulders, the children fly over the rooftops.',
        },
        {
          kind: 'text',
          text: 'In a moment they were standing in the road, each with a pair of big, soft, white wings on their shoulders. They spread the wings - and up they went, over the houses and the trees and the church tower, with the Lamb in Anthea\'s arms. It was the most wonderful morning of their lives.',
        },
        {
          kind: 'note',
          text: 'New word: sunset - the moment when the sun goes down and the day ends. For the children, it is also the moment when every wish disappears.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'They flew for miles, and they forgot the time. Then the sun began to go down, and the wings grew tired and heavy. The children came down on the top of a church tower, far from home, with no way to climb down - and the baby was hungry and cold.',
        },
        {
          kind: 'text',
          text: 'They sat on the lead roof in the dark, and the bells boomed over their heads, and they were very frightened. At last the verger and the clergyman came up with lanterns and ladders and carried them down, and a kind woman gave them bread and milk. "Never again," said Robert, as they trudged home. But of course, next day, they wished again.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Wish to Be Beautiful',
      art: 'beautiful-strangers',
      artPrompt: 'five impossibly beautiful children in golden ringlets and lace standing in a lane while a village woman stares in astonishment and a boy tugs his mother\'s skirt, an old gardener rubbing his eyes, a sunset sky behind',
      blocks: [
        {
          kind: 'text',
          text: 'The next wish was that they should all be beautiful - as beautiful as the day. The Psammead warned them, but they would not listen. In a flash they changed. Their hair curled like gold, their eyes shone like stars, and their faces were so lovely that they hardly knew themselves.',
        },
        {
          kind: 'image',
          art: 'beautiful-wish',
          text: 'So beautiful that nobody knows them - not even the Lamb.',
        },
        {
          kind: 'text',
          text: 'But beauty brought no happiness. The Lamb took one look at the strangers and roared with fright, and would not be comforted. The villagers stared and whispered, and the old gardener rubbed his eyes, and at the shops no one would serve them, because everyone thought they were some other family\'s beautiful children.',
        },
        {
          kind: 'note',
          text: 'Question for you: The children get exactly what they wish for, and it makes them miserable every time. What does the Psammead already know about wishes that they do not?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'They ran home and hid in the barn, and even the dog growled at them. "I hate being beautiful," said Jane, crying. "Nobody loves us - they only stare." Robert said, "I would rather be plain and be myself than be a beautiful stranger."',
        },
        {
          kind: 'text',
          text: 'Slowly the sun went down. When the last light went, the golden hair and the shining eyes faded away, and they were their own plain selves again. The Lamb ran to Anthea with a crow of joy, and Martha the cook gave them jam for tea. They had never been so glad of anything in all their lives.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Wish for Gold',
      art: 'gold-on-table',
      artPrompt: 'a wooden table heaped with shining gold coins and golden bars, five children staring down at it in a kitchen lit by a lamp, a baby reaching for a coin, an open door and a dark lane beyond',
      blocks: [
        {
          kind: 'text',
          text: 'You would think the children had learned. But one rainy afternoon Robert said, "If only we were rich - really rich - we could buy Father a ship and Mother a pony carriage and servants for everyone." So they wished for gold, and the Psammead gave it.',
        },
        {
          kind: 'image',
          art: 'gold-wish',
          text: 'The table is piled with gold - and it will not buy a loaf of bread.',
        },
        {
          kind: 'text',
          text: 'At first it was splendid. They filled their pockets and went to the shops. But the shopkeepers had never seen such coins, and thought they were forgeries. The police were sent for, and the children ran and hid, and their pockets were so heavy with gold that they could hardly run.',
        },
        {
          kind: 'note',
          text: 'New word: forgery - a false coin, made to look like real money so people will be cheated.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'They were found and taken home, and the whole village talked of nothing else. They could not even give the gold away, for it was too heavy to carry in handfuls. And when the sun went down, every coin turned into gravel and slate and old nails - just as the Psammead had warned.',
        },
        {
          kind: 'text',
          text: '"There is only one thing," said Anthea, as they swept the last of the gravel into the fire, "that we have ever wished for and been glad of. And it was not gold, and it was not beauty, and it was not wings. It was just - being together at home."',
        },
      ],
    },
    {
      title: 'Chapter 5 · The Last Wish',
      art: 'psammead-goodbye',
      artPrompt: 'a gravel pit at golden sunset, five children standing hand in hand facing a small brown furry creature with stalk eyes, the lamb crawling on the grass beside them, long shadows and a soft glowing sky',
      blocks: [
        {
          kind: 'text',
          text: 'Summer came, and Father and Mother came home. The children had one wish left, and they went down to the gravel pit to spend it. The Psammead was greyer and thinner, and very tired. "I have granted your wishes," it said. "Now let me go back to my sleep."',
        },
        {
          kind: 'image',
          art: 'last-wish-grown',
          text: 'The children say good-bye to the Psammead in the evening light.',
        },
        {
          kind: 'text',
          text: '"But what shall we wish?" they asked each other. Wings had left them stuck on a tower. Beauty had made them strangers. Gold had made them thieves in their own village. Even the Lamb\'s wish had ended in a cart and a policeman.',
        },
        {
          kind: 'note',
          text: 'New word: content - quietly happy with what you have, without wishing for anything more.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'So they wished the only wise wish of the whole summer: that Father and Mother should never know anything about the Psammead and the wishes and all the trouble they had caused. The Psammead smiled, for the first and only time.',
        },
        {
          kind: 'text',
          text: '"That is the best wish you have made," it said. "And the last. I am going to sleep now - perhaps for another thousand years. Good-bye." It sank into the gravel like a stone into water, and the children were left alone in the quiet pit.',
        },
        {
          kind: 'text',
          text: 'They walked home through the evening fields, and the sky was full of stars. "We have had our wishes," said Anthea, "and none of them was worth having - except being together. And that," she said, "we never needed to wish for at all."',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Five Children and It',
    author: 'E. Nesbit',
    authorDeathYear: 1924,
    jurisdiction: 'US',
    basis: 'pd-us',
    sourceUrl: 'https://www.gutenberg.org/ebooks/16880',
    note: 'Retold in simple English; plot follows the public-domain original.',
  },
}
