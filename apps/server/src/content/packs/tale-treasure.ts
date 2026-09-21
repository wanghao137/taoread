import type { PackBook } from '../types'

/**
 * Treasure Island — six chapters retold in simple English for young readers.
 * Original: Robert Louis Stevenson, published 1883. Public domain in the US
 * (pre-1929) and worldwide (Stevenson died 1894; 70y pma expired). Plot follows the
 * original novel (Billy Bones and the map, the Hispaniola, the apple barrel, Ben
 * Gunn, the stockade, and the recovery of the ship); killings softened for bedtime
 * reading; wording simplified into short sentences for children aged 9-12.
 */
export const treasureIsland: PackBook = {
  id: 'tale-treasure',
  title: 'Treasure Island',
  author: 'Robert Louis Stevenson',
  lang: 'en',
  category: 'tale',
  ageStage: '9-12',
  intro: 'Jim Hawkins finds a map to Captain Flint\'s buried gold, signed in red ink - and sails aboard the Hispaniola with a crew of cheats, and a cook with one leg named Long John Silver.',
  coverArt: 'treasure-island-cover',
  coverArtPrompt: 'a boy in a red cap at the wheel of a wooden sailing ship, a one-legged cook with a parrot on his shoulder and a crutch watching from the deck, a rolled parchment map with a red cross, an island with palms on the horizon',
  coverFrom: '#0D47A1',
  coverTo: '#64B5F6',
  source: 'Project Gutenberg eBook #120, public domain (Stevenson d. 1894)',
  chapters: [
    {
      title: 'Chapter 1 · The Admiral Benbow',
      art: 'benbow-captain',
      artPrompt: 'a windswept grey inn on a lonely cove with a swinging sign, a seaman in a tattered blue coat and tricorn hat with a sabre cut across one cheek standing at the bar with a sea chest, a boy polishing a glass, grey cliffs and a grey sea',
      blocks: [
        {
          kind: 'text',
          text: 'The old Admiral Benbow Inn stood on a lonely cove of the west of England, and there lived the young Jim Hawkins, helping his mother and father. One grey day a tall, strong, brown old seaman came limping up the road, with a sea chest on a hand-barrow.',
        },
        {
          kind: 'image',
          art: 'admiral-benbow-inn',
          text: 'The old seaman brings his sea chest to the Admiral Benbow Inn.',
        },
        {
          kind: 'text',
          text: '"I\'m a plain man, matey," he said. "Rum, bacon and eggs is what I want, and you can lay to that." He was called the Captain, and he paid in gold, and he spent his days watching the sea with a brass telescope, as if he were waiting for someone - or afraid of someone.',
        },
        {
          kind: 'note',
          text: 'New word: inn - a house by the roadside where travellers may buy food and drink and a bed for the night.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'One day an evil-looking seaman came to the inn, and there were hot words and drawn cutlasses, and the Captain fell down stricken. Then blind old Pew came tapping at the door in the dark, and left in the Captain\'s hand a black spot - the pirates\' summons and judgement.',
        },
        {
          kind: 'text',
          text: 'Jim opened the Captain\'s sea chest to take the money his mother was owed, and his hand fell upon an oilskin packet tied with string. The next moment the pirates came swarming up the beach, and Jim and his mother ran for their lives - with the packet safe under his arm.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Map and the Voyage',
      art: 'bristol-harbour',
      artPrompt: 'a great three-masted wooden ship under full white sails in Bristol harbour, a boy in a red cap looking up from the quay with a parchment map in his hand, a one-legged man with a parrot on his shoulder on the gangplank',
      blocks: [
        {
          kind: 'text',
          text: 'The packet held a chart of an island, with a red cross marked in ink, and beside it the writing of Captain Flint: "Bulk of treasure here." Jim took it to Dr. Livesey and Squire Trelawney, and the Squire was beside himself. "Flint\'s treasure! We shall fit out a ship and sail at once!"',
        },
        {
          kind: 'image',
          art: 'hispaniola-sails',
          text: 'The Hispaniola lies at Bristol, ready for sea.',
        },
        {
          kind: 'text',
          text: 'At Bristol they found the good ship Hispaniola, and the Squire shipped a crew. The cook was a one-legged man named Long John Silver, who had lost his leg in the service of England. He was cheerful, he was clever, and he knew every sailor in the port. Jim liked him at once.',
        },
        {
          kind: 'note',
          text: 'New word: chart - a seaman\'s map of the sea and the islands, showing the soundings and the shoals.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Jim went aboard as cabin-boy, and one fair morning the Hispaniola spread her wings and stood out to sea, with the red crosses on the map and the gold in the thoughts of every man aboard.',
        },
        {
          kind: 'text',
          text: 'But on the eve of sailing, Jim had overheard a dark warning at the Spy-glass tavern, and had warned the Squire in vain. "I have shipped the men," the Squire said. "And I tell you, I do not believe one of them is a cheat." It was the most unfortunate boast in all the voyage.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Apple Barrel',
      art: 'barrel-listening',
      artPrompt: 'the waist of a rolling ship at night, a big wooden apple barrel lashed on deck, a boy in a red cap crouched down inside it peeping over the rim, a one-legged man with a crutch and a ring of rough seamen in the lamplight',
      blocks: [
        {
          kind: 'text',
          text: 'One night, when the ship was becalmed and every soul aboard was hot and thirsty, Jim went on deck to find an apple. The big apple barrel on the waist was nearly empty, so he climbed into it to look for one at the bottom, and the barrel was so deep that he was quite hidden.',
        },
        {
          kind: 'image',
          art: 'apple-barrel-deck',
          text: 'Jim hides in the apple barrel - and hears the crew\'s secret.',
        },
        {
          kind: 'text',
          text: 'Then Long John Silver came and leaned against the barrel, and one by one the other sailors gathered round. Jim heard Silver\'s soft, cunning voice: "There\'s one hundred thousand pounds aboard in gold and silver, lads. It\'s ours - if we can throw the others overboard when we\'ve got it."',
        },
        {
          kind: 'note',
          text: 'New word: becalmed - when there is no wind at all, and a sailing ship lies still on the water like a leaf.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Jim learned the terrible truth: nearly the whole crew were Flint\'s old pirates, and Silver was their captain. Only the Squire, the doctor, the captain, and one or two true men stood between the mutineers and the treasure. And Jim himself had stumbled on the plot.',
        },
        {
          kind: 'text',
          text: 'Jim kept as still as a mouse until Silver moved away, then slipped off to find Dr. Livesey. "Doctor," he whispered, "I have heard every word. The crew mean to take the ship." The doctor\'s face went very grave - but he did not lose his courage. "Thank you, Jim," he said. "Now we know, and we can be ready."',
        },
      ],
    },
    {
      title: 'Chapter 4 · Ben Gunn',
      art: 'gunn-bushes',
      artPrompt: 'a tangled green tropical island with palms and grey rocks, a wild ragged man with sunburned skin and a goat-skin cap crouching behind a bush holding out a roasted goat meat skewer, a boy in a red cap starting back, the ship at anchor in the bay',
      blocks: [
        {
          kind: 'text',
          text: 'At last the island rose out of the sea, grey and green, and Jim\'s heart beat fast. The honest men went ashore - and so did Jim, slipping away into the jungle by himself. There he heard a strange voice singing to itself, and he thought of the curse of Captain Flint.',
        },
        {
          kind: 'image',
          art: 'ben-gunn-marooned',
          text: 'Ben Gunn, the marooned man, jumps out of the bushes.',
        },
        {
          kind: 'text',
          text: 'Out of the bushes leapt a wild man, sunburnt and ragged, with a goat-skin cap and a long beard. "I am Ben Gunn," he said, "and I am poor Ben Gunn, and I have been marooned three years on this island." He was afraid of Silver, and glad of any friend.',
        },
        {
          kind: 'note',
          text: 'New word: marooned - set ashore alone on a desert island with a little food and a gun, and left there by a cruel crew.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Ben Gunn had been one of Flint\'s men, and he knew where the treasure was - for he had found it, and moved it, and hidden it again in his own cave. "You get the doctor and the Squire to my camp," said Ben, "and Ben Gunn\'s your man. I\'m rich, I am, if I can but get home."',
        },
        {
          kind: 'text',
          text: 'But while Jim was gone, the pirates had taken the ship. Gunfire crackled across the island, and Jim ran for the stockade, where the doctor and the Squire and Captain Smollett held the log fort with the union flag flying above it.',
        },
      ],
    },
    {
      title: 'Chapter 5 · The Stockade',
      art: 'stockade-flag',
      artPrompt: 'a square fort of sharpened pine logs with a flagpole flying the union flag, a sandy clearing in a tropical forest, men in blue coats firing muskets over the wall, pirates attacking among the trees, the ship in the distant bay',
      blocks: [
        {
          kind: 'text',
          text: 'The stockade was a square of sharpened pine logs, with a well inside and a log cabin roofed with ship\'s canvas. Here the honest men made their stand, with Jim safe among them. Over the wall flew the union flag, and that was a comfort to every true heart.',
        },
        {
          kind: 'image',
          art: 'palisade-stockade',
          text: 'The stockade under the flag, with the pirates in the trees.',
        },
        {
          kind: 'text',
          text: 'Silver came forward under a flag of truce, leaning on his crutch. "I\'ll make you an offer," he said. "Give us the chart and the gold, and we\'ll put you ashore, safe and sound." "If you had a belly full of courage," said Captain Smollett, "you would be a brave man. As it is, you are a cheat and a mutineer. Begone!"',
        },
        {
          kind: 'note',
          text: 'New word: stockade - a wall of tall sharpened tree-trunks, set up to keep out an enemy. On the island it was the only safe place.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The pirates attacked, and the muskets cracked, and the fight was sharp and short; but the honest men held the wall, and the pirates fell back into the wood. Yet the ship was still in the pirates\' hands, and the stockade could not hold out forever.',
        },
        {
          kind: 'text',
          text: 'Then Jim remembered Ben Gunn\'s little coracle, hidden on the shore. In the dark he slipped out of the stockade, crept down to the beach, and paddled out upon the still water to the Hispaniola - to cut the ship adrift, so that the pirates could not sail her away.',
        },
      ],
    },
    {
      title: 'Chapter 6 · The Treasure and Home',
      art: 'ship-tiller-boy',
      artPrompt: 'a boy at the tiller of a great ship in a tropical bay, the red Jolly Roger torn down and the union flag run up the mast, a one-legged man prisoner in the waist, an island with palms and a smoky fire behind, a following breeze',
      blocks: [
        {
          kind: 'text',
          text: 'Aboard the Hispaniola, Jim found the last pirate, the wild Israel Hands, and by luck and pluck the ship was his. With the morning wind he brought the Hispaniola round into the north inlet and beached her on the sand, and ran to find his friends.',
        },
        {
          kind: 'image',
          art: 'recapture-hispaniola',
          text: 'Jim recaptures the ship, and the union flag flies again.',
        },
        {
          kind: 'text',
          text: 'At the stockade only Silver waited, in a black rage; the other pirates had gone to dig for the gold. "The treasure!" they cried, and dug until the pit was deep - but there was no treasure there. Only an empty hole, and two guineas, and a pick-handle from Ben Gunn\'s cave.',
        },
        {
          kind: 'note',
          text: 'Question for you: The pirates searched for the gold for three years and found nothing, and Ben Gunn found it in a month. Why is it easier to find something when you are alone and quiet?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Then Dr. Livesey, and the Squire, and Ben Gunn stepped out of the wood with their muskets, and the pirates threw down their arms. In Ben Gunn\'s cave, under a rock, lay the treasure of Captain Flint: bars of gold and Spanish dollars and pieces of eight, a fortune for every man.',
        },
        {
          kind: 'text',
          text: 'They loaded the gold into the ship, left the pirates with a spade and a store of food, and sailed away. Ben Gunn got a thousand pounds and a cottage, and Silver slipped away with a bag of coin - and was seen no more. And when at last the Hispaniola came home to England, Jim Hawkins sat by his own fireside, and the gold glinted in the firelight, and he never sailed again.',
        },
      ],
    },
    {
      title: 'Chapter 7 · The Fight in the Rigging',
      art: 'night-cut-adrift',
      artPrompt: 'a great wooden sailing ship drifting at night under a sliver of moon, a small figure at her bow sawing through a thick hawser rope, dark tropical cliffs rising ahead, white water breaking on rocks under the rail, a lantern burning low',
      blocks: [
        {
          kind: 'text',
          text: 'Jim slipped aboard the sleeping Hispaniola and cut her adrift, and the tide carried her slowly out of the bay. But the night was warm, and the boy was worn out, and he dozed at his post - and woke to find the ship driving straight for the cliffs of the north inlet. On deck sat Israel Hands, the fiercest pirate left aboard, with murder in his eye.',
        },
        {
          kind: 'image',
          art: 'jim-hands-mast',
          text: 'Israel Hands climbs the rigging after Jim, a long knife in his teeth.',
        },
        {
          kind: 'note',
          text: 'New word: rigging - all the ropes of a ship that hold up the masts and pull the sails. Up in the rigging, a one-legged man climbs slowly.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Jim scrambled up the rigging, out of a lame man\'s reach. "Now, matey," said Hands, soft as oil, "no more nonsense. Strike your flag." And up he began to climb, a long knife held in his teeth, hand over hand. Jim cocked his two pistols and waited, with the dark sea heaving far below.',
        },
        {
          kind: 'text',
          text: 'The knife flew and pinned Jim\'s sleeve to the mast. He tore himself free - one pistol spoke, and then the other. Israel Hands staggered, let go the rigging, and fell into the sea. Then Jim slid down, bleeding but alive, and the Hispaniola was his. One boy, alone in the night, had won back the whole ship.',
        },
      ],
    },
    {
      title: 'Chapter 8 · The Black Spot',
      art: 'black-spot-circle',
      artPrompt: 'the smoky interior of a log stockade at dawn, rough seamen in a ring around a one-legged man leaning on his crutch, a round black paper circle held out on a grimy palm, a boy in a red cap watching by the cabin door, the union flag down and a black pirate flag up',
      blocks: [
        {
          kind: 'text',
          text: 'When Jim tried to slip back to his friends, he walked straight into the stockade - and found it full of pirates. Long John Silver stood among them, and his eye gleamed when he saw the boy. Young George Merry growled that the prisoner should be done away with at once. But Silver rapped on the table. "I\'m captain here," he said. "No man touches that boy but me."',
        },
        {
          kind: 'image',
          art: 'silver-bible-page',
          text: 'Silver turns the black spot over - and finds a page of the Bible.',
        },
        {
          kind: 'note',
          text: 'New word: black spot - a round black paper given to a pirate when his crew turns against him. It means: we judge you unfit to lead.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Next morning the pirates came sullenly to Silver and gave him the black spot. But Silver was cool as a cricket. "Look what you\'ve cut it from," he said, turning the paper over - and it was a page of the Bible, and the pirates went pale as flour. Then he showed them the chart with the red cross, which the doctor had traded him. "Follow me," said Silver, "and you shall all dig gold."',
        },
        {
          kind: 'text',
          text: 'So the black spot was wiped out, and soon Dr. Livesey himself came under a white flag to tend the sick men. "Why didn\'t you run away, Jim?" the doctor asked quietly. "Because I gave my word to Silver," said Jim, "and I must keep it." The doctor sighed and looked long at the one-legged cook - and went back to his friends to wait for the morning of the dig.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Treasure Island',
    author: 'Robert Louis Stevenson',
    authorDeathYear: 1894,
    jurisdiction: 'US',
    basis: 'pd-us',
    sourceUrl: 'https://www.gutenberg.org/ebooks/120',
    note: 'Retold in simple English; plot follows the public-domain original.',
  },
}
