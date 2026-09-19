import type { PackBook } from '../types'

/**
 * The House at Pooh Corner — four chapters retold for very young English readers.
 * Source work: A. A. Milne, 1928 (illustrated by E. H. Shepard).
 * US public domain only (published 1928, pre-1929); Milne died 1956, so the
 * UK/EU term has not expired. Plot follows the original book (Tigger's arrival,
 * the house for Eeyore, Poohsticks); wording is newly written in simple
 * sentences for children aged 3-5.
 */
export const poohCorner: PackBook = {
  id: 'milne-poohcorner',
  title: 'The House at Pooh Corner',
  author: 'A. A. Milne',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: 'A stranger comes bouncing into the Hundred Acre Wood: Tigger, who is bouncy, trouncy, and very hungry. Pooh builds a house for Eeyore, invents a brand-new game on the bridge, and finds out what Tiggers really like to eat.',
  coverArt: 'poohcorner-forest',
  coverArtPrompt: 'a round golden teddy bear in a small red shirt and a tiny pink pig walking together along a sunny forest path of tall pines and gorse bushes, a stripey bouncing tiger cub leaping high behind them, bluebell banks and fir trees, cheerful storybook morning light',
  coverFrom: '#1565C0',
  coverTo: '#A5D6A7',
  source: 'The House at Pooh Corner (A. A. Milne, 1928); retold following the US public-domain plot',
  chapters: [
    {
      title: 'Chapter 1 · A House for Eeyore',
      art: 'poohcorner-stick-house',
      artPrompt: 'a gloomy grey donkey standing beside a neat little house made of crossed sticks in a sheltered clearing, a small pig carrying one last stick and a round golden bear in a red shirt holding a bunch of sticks, snowy fir trees around, soft winter light',
      blocks: [
        {
          kind: 'text',
          text: 'Eeyore the old grey donkey had nowhere to live. He stood in his field in the snow, looking gloomy, which was his favourite thing to do. "No house," he said, "no surprise at all. It is what I expected."',
        },
        {
          kind: 'image',
          art: 'poohcorner-stick-house',
          text: 'Eeyore and his new stick house, in the sheltered place Piglet found.',
        },
        {
          kind: 'text',
          text: 'Pooh and Piglet decided to build him one. Piglet knew a good sheltered spot. Pooh knew a pile of sticks that nobody seemed to be using. Stick by stick, the two of them criss-crossed a little house with two rooms — well, two sides — and a doorway that a donkey could call grand.',
        },
        {
          kind: 'note',
          text: 'A stick house is made of criss-cross: one stick this way, one stick that way, so it holds itself up. You can try the pattern with spoons or pencils!',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"Surprise!" said Pooh and Piglet. Eeyore looked at the house for a long time. Then he said, in his slowest, most surprised voice, that a house was exactly what he had been expecting — though of course he had expected nothing of the kind, and was as pleased as Eeyore could ever be.',
        },
        {
          kind: 'text',
          text: 'Nobody mentioned — then or ever — that the pile of sticks Pooh borrowed had belonged to somebody else. Some mysteries, said Pooh, are best left for a little something at eleven o\'clock.',
        },
      ],
    },
    {
      title: 'Chapter 2 · Tigger Comes to the Forest',
      art: 'poohcorner-tigger-breakfast',
      artPrompt: 'a stripey tiger cub bouncing happily in a snowy clearing while a round golden bear in a red shirt, a small pink pig and a gloomy grey donkey watch, a big pot of honey and a jar of haycorns and thistles set out on a tree stump, tall pines behind, bright cheerful winter morning',
      blocks: [
        {
          kind: 'text',
          text: 'One night a strange sound woke Pooh: Bounce. Bounce. Bounce. In the morning a stranger was sitting on his doorstep — a stripey, smiley creature with a springy tail. "I\'m Tigger," he said. "Tiggers love everything. What\'s for breakfast?"',
        },
        {
          kind: 'image',
          art: 'poohcorner-tigger-breakfast',
          text: 'Tigger\'s first breakfast: honey, haycorns, and thistles.',
        },
        {
          kind: 'text',
          text: 'So they tried everything. Pooh offered honey. Tigger ate a big spoonful and made a face. "Tiggers do not like honey." Piglet offered haycorns. "Tiggers do not like haycorns." Eeyore offered thistles, his very own favourite. "Tiggers," said Tigger sadly, "do not like thistles."',
        },
        {
          kind: 'note',
          text: 'Everyone likes different food — and that is fine! Tigger is sure he loves everything, and he keeps trying until he finds what he really likes. What is your favourite breakfast?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'They went at last to Kanga\'s house, where little Roo was having his strengthening medicine, called Extract of Malt. And Tigger took one lick — and jumped clean over a chair with joy. "Tiggers LIKE Extract of Malt!"',
        },
        {
          kind: 'text',
          text: 'So that is what Tiggers eat, and from then on Tigger bounced through the Forest with Roo, and nobody could be gloomy anywhere near him — not even Eeyore, though he tried.',
        },
      ],
    },
    {
      title: 'Chapter 3 · Tiggers Don\'t Climb Trees',
      art: 'poohcorner-tall-tree',
      artPrompt: 'a stripey tiger cub and a tiny kangaroo joey clinging side by side on a high branch of a very tall pine tree looking down scared, a round golden bear and a small pig looking up from far below, misty green forest depth, soft afternoon light',
      blocks: [
        {
          kind: 'text',
          text: '"Can Tiggers climb trees?" asked Roo. "Tiggers can do EVERYTHING," said Tigger grandly. So up the tall pine they climbed, Roo shouting with joy, Tigger bouncing from branch to branch — until they looked down, and the ground was very, very far away.',
        },
        {
          kind: 'image',
          art: 'poohcorner-tall-tree',
          text: 'Very high up the pine tree, where Tiggers perhaps should not be.',
        },
        {
          kind: 'text',
          text: '"Tiggers," said Tigger in a small voice, "do not climb trees." And they could not climb down at all. Roo\'s mother called from below, and Christopher Robin and Pooh came running with a plan: Pooh\'s big woolly coat, stretched out like a net between them all.',
        },
        {
          kind: 'note',
          text: 'When you get stuck high or scared, calling out is the brave thing — help comes. And it is okay to say "I was wrong": Tigger says it, and everybody still loves Tiggers.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"Jump!" called Christopher Robin, and down came Roo, safe and giggling, into the coat. Then down came Tigger — BOUNCE — missing the coat entirely, landing on Pooh, and rolling everyone into one big laughing heap.',
        },
        {
          kind: 'text',
          text: 'After that, Tigger bounced on the ground where bouncing is safe, and if anyone asked whether Tiggers climb trees, he said, "They do what Tiggers CAN do" — which everyone agreed was quite grand enough.',
        },
      ],
    },
    {
      title: 'Chapter 4 · Pooh Invents a Game',
      art: 'poohcorner-bridge-game',
      artPrompt: 'a wooden footbridge over a sparkling forest river, a round golden bear in a red shirt, a small pink pig and a grey donkey leaning over the railing dropping pine sticks into the water, a boy watching from the bank, autumn leaves on the current, golden afternoon light',
      blocks: [
        {
          kind: 'text',
          text: 'One day, on the wooden bridge, Pooh dropped a fir cone over the side by accident. Plop! It fell in the water. And by the time Pooh had leaned far over the other rail, the cone had come all the way under the bridge and out the other side.',
        },
        {
          kind: 'image',
          art: 'poohcorner-bridge-game',
          text: 'The brand-new game on the bridge: drop, wait, and watch.',
        },
        {
          kind: 'text',
          text: '"That is what a cone does," said Pooh. "It comes out the other side. It will be very useful." And so the new game was invented: everyone drops a stick into the river on the upstream side, then runs to the downstream side, and whose stick comes out FIRST is the winner. They called it Poohsticks.',
        },
        {
          kind: 'note',
          text: 'Poohsticks is a real game you can play on any bridge over slow water: same sticks, same drop, and may the best stick win. Remember to hold hands on the bridge!',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'They played it day after day. Eeyore kept winning — which was strange, because Eeyore never won anything. At last the secret came out: he had been dropping his stick on BOTH sides of the bridge, so one of his sticks was sure to be first.',
        },
        {
          kind: 'text',
          text: '"It was a Clever Trick," said Eeyore, gloomily proud. Everyone agreed that next time they would count the sticks — and the game went on, and the river carried the cones and sticks away under the bridge and out the other side, just as Pooh had known it would.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The House at Pooh Corner',
    author: 'A. A. Milne',
    authorDeathYear: 1956,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Published 1928; US public domain (pre-1929). UK/EU term has not expired; text retold in original simplified wording following the public-domain plot.',
  },
}
