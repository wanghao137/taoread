import type { PackBook } from '../types'

/**
 * The Story of the Amulet — five chapters retold in simple English for
 * young readers. Original: E. (Edith) Nesbit, published 1906. Public
 * domain in the US (pre-1929) and worldwide (Nesbit died 1924; 70y pma
 * expired). The four children, the rescued Psammead, the half Amulet,
 * Rekh-ma-ra the priest, the Queen of Babylon, sunken Atlantis, and the
 * great wish follow the original novel; wording simplified into short
 * sentences for children aged 9-12.
 */
export const amulet: PackBook = {
  id: 'nesbit-amulet',
  title: 'The Story of the Amulet',
  author: 'E. Nesbit',
  lang: 'en',
  category: 'tale',
  ageStage: '9-12',
  intro: 'The four children are in London for the summer, with Father far away at sea and Mother in hospital. Then they rescue their old friend the Psammead from a pet shop - and find a half of a magic Amulet that can open doors through time. If they can find its missing half, it will grant the Great Wish: all safe, all together.',
  coverArt: 'amulet-egypt',
  coverArtPrompt: 'two halves of an ancient moon-shaped amulet of red gold joining together in mid-air, glowing with faint blue light and engraved hieroglyphs, four Edwardian children reaching toward it in wonder, ancient Egyptian temple columns and a moonlit Nile fading in behind them, the small snail-eyed Psammead perched on a shoulder, deep violet night, magical storybook illustration',
  coverFrom: '#00695C',
  coverTo: '#FFD54F',
  source: 'The Story of the Amulet (E. Nesbit, 1906), public domain (Nesbit d. 1924)',
  chapters: [
    {
      title: 'Chapter 1 · The Half Amulet',
      art: 'amulet-shop',
      artPrompt: 'a dusty junk shop lit by one hanging oil lamp, shelves of curious old things, a bent old shopkeeper smiling over the counter at four Edwardian children, one of them holding up a broken moon-shaped amulet of red gold, a tiny creature with snail eyes on stalks peeking from a birdcage in the corner, warm amber light, mysterious storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'That summer the four children had to stay in London with old Nurse. Father was far away at sea, and Mother was in the hospital far south. Anthea, Robert, Cyril, and Jane were lonely, and even the Lamb, the baby, had been carried off to the country.',
        },
        {
          kind: 'image',
          art: 'amulet-psammead',
          text: 'In a pet shop cage sits a familiar creature with eyes on stalks.',
        },
        {
          kind: 'text',
          text: 'Wandering the streets, they found their old friend the Psammead - the brown Sand-fairy with snail eyes - shut in a cage in a dirty pet shop. They bought it free at once, and the grumpy old creature promised them something better than wishes: "There is a charm called the Amulet. It opens doors through time. Find its missing half, and it will grant the Great Wish."',
        },
        {
          kind: 'note',
          text: 'New word: amulet - a lucky charm worn to protect its owner. This one is broken in two, like a moon cut in half.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'In a little junk shop they found just such a half-moon of red gold, and the bent old shopkeeper sold it cheap. But when the children held it up and spoke the magic word, a tall Egyptian priest named Rekh-ma-ra stepped out of the past. He, too, was hunting for the missing half - and now they would hunt together, through doors of time.',
        },
      ],
    },
    {
      title: 'Chapter 2 · Ancient Egypt',
      art: 'amulet-egypt-river',
      artPrompt: 'four children in modern Edwardian clothes standing amazed on the reed bank of the ancient Nile at golden evening, painted wooden boats with tall sails on the water, palm trees and white temple columns behind, villagers in white linen carrying water jars, Rekh-ma-ra in a spotted priest robe greeting a fisherman, warm amber dusk, storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'The Amulet glowed, the walls of the London room faded, and the children stood on the bank of the great river Nile - thousands of years in the past. White temples shone in the sun, and painted boats drifted past with tall sails. Rekh-ma-ra walked ahead like a man coming home.',
        },
        {
          kind: 'image',
          art: 'amulet-rekh',
          text: 'The priest Rekh-ma-ra leads them through his own far-off time.',
        },
        {
          kind: 'text',
          text: 'In Egypt the children learned what the missing half was: the precious other moon, carried away long ago as a gift to the mighty Queen of Babylon. It seemed hopeless to ask a queen for half her treasure. But Rekh-ma-ra smiled. "Babylon is rich in many things," he said, "but no queen has ever seen the future. That, little ones, you can give her."',
        },
        {
          kind: 'note',
          text: 'Question for you: The children have something the ancients could never have - news of the future. What would you show a visitor from three thousand years ago?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'So the Amulet was held up again, and the words were spoken. The hot Egyptian evening dissolved like sugar in water, and the children felt time carrying them forward and east, to the greatest city the world had ever known.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Queen of Babylon',
      art: 'amulet-babylon',
      artPrompt: 'the towering blue-tiled gates of ancient Babylon under a bright sky, a splendid queen in gold with strings of blue beads descending marble steps toward four Edwardian children on a floating carpet of air, painted lions and bulls on the gate walls, crowds of guards with spears, rich daylight, grand storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'Babylon was vast beyond dreaming, with walls so wide that chariots raced along the top of them. The Queen herself came to meet them, dressed in gold and strings of blue beads. She had heard of the strangers who could step through time, and her dark eyes were hungry with wonder.',
        },
        {
          kind: 'image',
          art: 'amulet-queen-london',
          text: 'The Queen looks out at London - and does not believe her eyes.',
        },
        {
          kind: 'text',
          text: 'The children bargained cleverly. The half Amulet for one journey into the future. The Queen held the glowing charm - and in a heartbeat she stood on a London street, staring at omnibuses, shop windows, and crowds of humble people in strange clothes. Kings did not rule here, she learned. Every man was his own master, and every boy might grow up to be anything at all.',
        },
        {
          kind: 'note',
          text: 'Talk together: The Queen rules everyone in Babylon, yet she envies London. What is worth more - being obeyed by all, or being free?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'She came home to Babylon thoughtful, and she kept her word. "Rule your own futures well," she said, pressing the second half of the Amulet into Anthea\'s hand. "For thrones fall, but kindness is a law that never dies." The two halves sang together in the children\'s hands, a small, clear, golden note.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The City Beneath the Sea',
      art: 'amulet-atlantis',
      artPrompt: 'a shining island city of white marble temples and bronze statues on a calm green sea, sudden darkness gathering overhead with giant waves rising, four children clinging together on a marble quay as water floods the streets, one child holding up the glowing amulet, dramatic deep blue and gold, epic but gentle storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'The joined Amulet could show them wonders, and it carried them to a beautiful island city in the middle of the sea - marble temples, bronze statues, gardens over the water. The people were kind and wise. The children thought it the loveliest place they had ever seen.',
        },
        {
          kind: 'image',
          art: 'amulet-waves',
          text: 'The sea rises, and the Psammead pulls the children back through time.',
        },
        {
          kind: 'text',
          text: 'But this city had grown proud and cruel, and the old story says its day was done. The sky went black, and the great sea stood up like a wall. The Psammead shrieked the magic word, and the children felt themselves pulled backward through the closing door of time, the roar of water dying away behind them like thunder under a blanket.',
        },
        {
          kind: 'note',
          text: 'New word: legend - a very old story handed down for ages. Some legends hold pieces of truth, like fossils in stone.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'They came home to the quiet London room, pale and shaking, holding each other tight. "Cities fall," said Rekh-ma-ra gently, "but the good that people do is never lost. It walks on in time longer than any wall." The children never forgot the city beneath the sea, and they loved their own city\'s small warm streets a little more.',
        },
      ],
    },
    {
      title: 'Chapter 5 · The Great Wish',
      art: 'amulet-future',
      artPrompt: 'a joined glowing amulet hanging in the air showing a bright vision of a family reunited in a lamplit parlor - father home, mother well, a baby crawling on the rug - four children gazing up at the vision, the Psammead watching from the armchair, warm golden light against a dim room, tender magical storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'Now both halves of the Amulet were joined, and the time had come for the Great Wish. Father was still far away at sea, and Mother still far away in the hospital. The children stood in a ring around the glowing charm, and together they wished the oldest wish of all: to be all together, and all safe.',
        },
        {
          kind: 'image',
          art: 'amulet-keyhole',
          text: 'Through the Amulet they see a happy future waiting for them.',
        },
        {
          kind: 'text',
          text: 'The Amulet grew bright as a little moon, and in its light they saw a vision of days to come: Father\'s ship sailing safely home, Mother well and smiling again, the Lamb toddling across the rug, and all of them together in one warm room. "It is true," said Rekh-ma-ra. "This is not a dream. This is your future, if you keep faith and love."',
        },
        {
          kind: 'note',
          text: 'Question for you: The Great Wish did not come true in one second, but in its own right time. Why is waiting sometimes part of a wish?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'And so, in their own time, it all came true. Father came home, Mother came well, and the house was full of noise and light again. The Amulet\'s work was done; it faded into a plain, quiet stone, and the Psammead trudged off to sleep for another two thousand years. The children kept the little stone on the shelf - and kept, too, what it had taught them: that time is long, but love is longer.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Story of the Amulet',
    author: 'E. Nesbit',
    authorDeathYear: 1924,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Retold for children; plot follows the public-domain original. Published 1906; worldwide public domain.',
  },
}
