import type { PackBook } from '../types'

/**
 * Robinson Crusoe (Daniel Defoe, 1719) — five chapters retold in simple English
 * for readers aged 9–12. Text: Project Gutenberg eBook #12623 (1808 edition).
 * Public domain in the US (pre-1929); Defoe died in 1731, so the work is also
 * public domain worldwide. Plot and characters (Friday, the captain, the
 * mutineers) follow the original book; the cannibal scenes are told gently,
 * and only the wording is shortened and simplified.
 */
export const robinsonCrusoe: PackBook = {
  id: 'tale-robinson',
  title: 'Robinson Crusoe',
  author: 'Daniel Defoe',
  lang: 'en',
  category: 'tale',
  ageStage: '9-12',
  intro: 'A terrible storm wrecks young Robinson Crusoe on an island where no one else lives. With clever hands and a brave heart he builds a home, makes friends with a parrot and a goat — and one day meets another human being at last.',
  coverArt: 'robinson-island-cover',
  coverArtPrompt: 'a lone island in a blue tropical sea, white waves on a sandy shore, a sturdy timber fort with a goatskin door among palm trees, a small fire of smoke rising, a man with a goatskin hat watching the horizon from the beach, warm storybook art',
  coverFrom: '#7E5109',
  coverTo: '#F9E79F',
  source: 'Project Gutenberg eBook #12623 (1808 ed.), public domain (Defoe d. 1731)',
  chapters: [
    {
      title: 'Chapter 1 · The Shipwreck',
      art: 'crusoe-shipwreck-shore',
      artPrompt: 'a small wooden ship breaking apart on jagged rocks in a roaring storm, huge grey-green waves, a young sailor clinging to a broken mast, a sandy beach and palm trees beyond, dramatic but hopeful storybook scene',
      blocks: [
        {
          kind: 'text',
          text: 'Robinson Crusoe was the son of a merchant in the city of York. His father wanted him to stay at home and live a quiet life, but Robinson dreamed of the sea. Again and again he ran away to sail, and trouble followed him wherever he went.',
        },
        {
          kind: 'image',
          art: 'shipwreck-rocks-waves',
          text: 'The ship strikes the rocks in the great storm.',
        },
        {
          kind: 'text',
          text: 'On his worst voyage the ship met a storm like nothing he had ever seen. The waves came over the deck, the masts snapped like sticks, and the crew took to the boats. Robinson\'s boat was thrown up on a sand bar and he was tumbled into the water.',
        },
        {
          kind: 'note',
          text: 'New word: shipwreck — when a ship is broken by the sea. Robinson had shipwrecked before, but never like this.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Robinson swam and struggled until his feet touched sand. He crawled up the beach and lay there, coughing and glad to be alive. When the morning came, he saw he was on an island — and there was no other person anywhere.',
        },
        {
          kind: 'text',
          text: 'He swam out to the wreck while the sea was calm and saved what he could: bread and rice, a chest of tools, two guns and powder, a dog and two cats. "These are my fortune," he said. Now he must learn to live.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Fort and the First Years',
      art: 'crusoe-fort-island',
      artPrompt: 'a grassy slope with a sturdy timber fort half-hidden by tall trees, a goatskin door, a ladder over a low wall, a man in goatskin clothes working in a small field of green corn, a goat and a parrot nearby, sunny and peaceful storybook scene',
      blocks: [
        {
          kind: 'text',
          text: 'Robinson needed a safe place to sleep. He chose a spot against a hill, where a cave ran back into the rock, and a little spring of fresh water ran close by. He drove strong stakes of timber into the ground until he had a wall all around — a little fort, with a ladder he could pull up after him.',
        },
        {
          kind: 'image',
          art: 'crusoe-fort-spring',
          text: 'Robinson\'s fort on the hillside, with the spring and the fields below.',
        },
        {
          kind: 'text',
          text: 'He made a table and a chair, carved shelves into the cave, and kept a journal of every day. He taught himself to hunt goats with his gun, to dry raisins in the sun, and to bake bread from grain he sowed and reaped with his own hands.',
        },
        {
          kind: 'note',
          text: 'New word: sow — to plant seeds in the ground so they will grow. Robinson had no farm shop on the island, so he sowed grain and waited for the rain.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'He tamed a young parrot and taught it to say his name, and he kept a small flock of goats that came when he called. He made himself clothes and a great ugly hat out of goatskin, and a big umbrella to keep off the sun.',
        },
        {
          kind: 'text',
          text: 'The years passed — one, two, then ten. Robinson had food, and shelter, and work. But in the evenings, when the sea was quiet, he was lonely to the very bottom of his heart.',
        },
      ],
    },
    {
      title: 'Chapter 3 · Friday',
      art: 'crusoe-rescue-friday',
      artPrompt: 'a tropical beach at dawn, a bearded man in goatskin clothes standing with a gun, a kneeling young man pressing his head to the sand in thanks, two fallen pursuers in the distance, dramatic warm light, storybook scene',
      blocks: [
        {
          kind: 'text',
          text: 'One morning Robinson saw five canoes drawn up on the sand, and a group of fierce strangers from another island. They had brought two prisoners with them. One of the prisoners saw his chance and ran for his life along the shore, with two of the strangers after him.',
        },
        {
          kind: 'image',
          art: 'friday-kneels-beach',
          text: 'Robinson saves the runner who would be called Friday.',
        },
        {
          kind: 'text',
          text: 'Robinson did not stop to think. He ran down the beach and stood between the runner and his pursuers. The first man fell to Robinson\'s gun, and the second turned and fled. The runner came and knelt at Robinson\'s feet, and set Robinson\'s foot upon his own head, to show he would serve him all his life.',
        },
        {
          kind: 'note',
          text: 'New word: canoe — a light boat made from a hollowed-out tree trunk. The islanders paddled them across the sea.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"It is Friday today," said Robinson, looking at the sun. "So your name shall be Friday." He taught Friday to say Yes and No, and Master, and Please and Thank you; and Friday taught Robinson how to cook fish and find the sweetest fruit.',
        },
        {
          kind: 'text',
          text: 'For the first time in many years Robinson had someone to talk to. Friday was brave, faithful and quick to learn — the best friend a castaway could have.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Footprint',
      art: 'crusoe-footprint-beach',
      artPrompt: 'a wet sandy beach at low tide with one clear human footprint in the foreground, a lone man standing very still and staring at it, tall palms leaning in the wind, distant grey sea, tense and quiet storybook scene',
      blocks: [
        {
          kind: 'text',
          text: 'Years before Robinson met Friday, he had a great fright. He was walking on the far side of the island when he saw, in the wet sand, the print of a man\'s naked foot. It was not his own. He stopped as if he had been shot.',
        },
        {
          kind: 'image',
          art: 'footprint-sand-shore',
          text: 'The single footprint in the sand — Robinson\'s greatest fear.',
        },
        {
          kind: 'text',
          text: 'Robinson hurried home and hid in his fort for days. His thoughts ran wild: was a wild man watching him even now? He dug his wall deeper and thicker, and made a hiding place in the cave behind a curtain of branches.',
        },
        {
          kind: 'note',
          text: 'New word: footprint — the mark a foot leaves in soft ground. One footprint told Robinson he was not alone on the island after all.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'In time Robinson understood the truth: now and then strangers came across the sea in canoes to hold cruel feasts on his shore. He watched them from the rocks, and kept his guns close, and hoped they would never find his fort.',
        },
        {
          kind: 'text',
          text: 'When the day came that he saved Friday, Robinson was ready. He had spent years fearing those canoes — and now one of their own people had become his dearest friend.',
        },
      ],
    },
    {
      title: 'Chapter 5 · The Captain and the Voyage Home',
      art: 'crusoe-captain-rescue',
      artPrompt: 'a ship\'s boat rowing toward a ship at anchor in a blue bay, an English captain and a bearded man in goatskin shaking hands on the beach, mutineers kneeling with bound hands, a parrot on a stake, bright morning light, joyful storybook scene',
      blocks: [
        {
          kind: 'text',
          text: 'One morning an English ship appeared in the bay. But there was no cheer aboard her — her crew had mutinied. The rebels meant to leave their captain and his loyal sailors on Robinson\'s island and sail the ship away.',
        },
        {
          kind: 'image',
          art: 'mutineers-surrender-beach',
          text: 'Robinson and Friday help the captain take back his ship.',
        },
        {
          kind: 'text',
          text: 'Robinson and Friday crept through the wood, freed the captain, and ambushed the mutineers as they came ashore for water. The ringleaders surrendered and begged for mercy. "You shall be left here," said the captain, "with food and tools, to learn what Robinson Crusoe learned."',
        },
        {
          kind: 'note',
          text: 'New word: mutiny — when sailors rise against their own captain and take the ship. Robinson had read of mutiny in books; now he had seen it.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'On a clear December morning, after twenty-eight years on the island, Robinson Crusoe stepped aboard an English ship. Friday went with him, wide-eyed at the great sails. The captain shook his hand and called him the bravest man he had ever met.',
        },
        {
          kind: 'text',
          text: 'At last Robinson saw England again — older, wiser, and rich from the plantations he had left behind. He never forgot the island that had taught him patience, and he came back in later years to visit the people he had left there.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Life and Adventures of Robinson Crusoe',
    author: 'Daniel Defoe',
    authorDeathYear: 1731,
    jurisdiction: 'US',
    basis: 'pd-us',
    sourceUrl: 'https://www.gutenberg.org/ebooks/12623',
    note: 'Retold in simple English; plot follows the public-domain original.',
  },
}
