import type { PackBook } from '../types'

/**
 * The Story of Doctor Dolittle — five chapters retold for young English readers.
 * Text: Hugh Lofting, 1920. US public domain (published pre-1929) and worldwide
 * (Lofting d. 1947, 70y pma expired). Plot follows the original novel; wording
 * simplified into short, quiet sentences for children aged 6-8.
 */
export const dolittle: PackBook = {
  id: 'tale-dolittle',
  title: 'The Story of Doctor Dolittle',
  author: 'Hugh Lofting',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'Doctor Dolittle of Puddleby loves animals so much that his house fills up with them. When his parrot teaches him the secret language of beasts, he becomes the one doctor animals can visit — and soon he sails away to help the sick monkeys of Africa.',
  coverArt: 'dolittle-boat',
  coverArtPrompt: 'a kind round-faced doctor in a dark old-fashioned coat standing at the bow of a small wooden sailing ship, a green parrot on his shoulder and a plump duck by the tiller, gentle blue summer sea with soft white wavelets, gulls overhead, warm morning light',
  coverFrom: '#26A69A',
  coverTo: '#AED581',
  source: 'The Story of Doctor Dolittle (Hugh Lofting, 1920), public domain',
  chapters: [
    {
      title: 'Chapter 1 · The Doctor of Puddleby',
      art: 'dolittle-house',
      artPrompt: 'a small brick cottage in an English village with a big tangled garden, a fat doctor in a tall hat surrounded by dogs, ducks, a pig and a rabbit on the doorstep, a crocodile peeking from a fishpond, daffodils and soft afternoon light',
      blocks: [
        {
          kind: 'text',
          text: 'Once upon a time, in a little town called Puddleby-on-the-Marsh, there lived a doctor named John Dolittle. He was a large, kindly man with a round face and spectacles, and he lived in a small brick house with a big garden at the back. He wore a tall hat on Sundays and was very well thought of by everybody.',
        },
        {
          kind: 'text',
          text: 'But the Doctor loved animals. First he kept a goldfish, then a rabbit, then some mice, then a squirrel, then a canary, then a parrot. There was a dog called Jip, a duck called Dab-Dab, a little pig called Gub-Gub, an owl called Too-Too, and — at one time — a crocodile in the fishpond. If you have ever had a pet, you know what happens: there is always something more to feed, and never quite enough room.',
        },
        {
          kind: 'image',
          art: 'dolittle-house',
          text: 'The little house in Puddleby, with every kind of animal waiting politely at the door.',
        },
        {
          kind: 'text',
          text: 'The people who came to be treated began to stop coming. "One cannot be expected to catch a chill in a waiting room with a hedgehog under the chair," they said. The Doctor’s sister Sarah shook her head over the fishpond. But the animals came closer and closer, as if they knew they were wanted, and the Doctor never turned one of them away.',
        },
        {
          kind: 'text',
          text: 'Then one day a man who sold cat’s meat stopped at the gate. "Why don’t you be an animal doctor?" he said. "The animals have nobody. I have seen you with that rabbit — you have a way with them." The Doctor sat still for a long while, looking at the garden. An animal doctor. At his feet, every animal lifted its head at once, and every one of them was smiling.',
        },
        {
          kind: 'note',
          text: 'Talk together: the Doctor loses his human patients but does not stay sad for long. Ask your child: if your house could be full of any animals at all, which ones would you choose?',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 2 · Polynesia’s Secret',
      art: 'dolittle-parrot',
      artPrompt: 'a green parrot with bright eyes perched on the back of an armchair beside a round-faced doctor in spectacles and a black coat, both leaning close as if sharing a secret, a fireplace and shelves of books behind them, evening lamplight',
      blocks: [
        {
          kind: 'text',
          text: 'Polynesia was the Doctor’s oldest friend and his parrot, and she was nearly two hundred years old. One rainy evening she flew to his shoulder and said, very quietly, "Can you keep a secret?" The Doctor looked up from his book. "A secret?" said the Doctor. "Then listen," said Polynesia. "Animals can talk. They talk all the time. They have simply been too polite to tell you, because you never listened."',
        },
        {
          kind: 'text',
          text: 'The Doctor laughed at first, and then he stopped laughing, and then he listened. Polynesia taught him that a dog’s bark can mean a dozen different things, and that the flick of Jip’s tail is a whole sentence. She taught him the words for oats and the words for a warm place by the fire. He wrote it all down in a big book until his pen could hardly keep up.',
        },
        {
          kind: 'image',
          art: 'dolittle-parrot',
          text: 'Polynesia the parrot, two hundred years old and very wise, teaching the Doctor his first animal words.',
        },
        {
          kind: 'text',
          text: 'He went out to the gate and asked the plough horses how their hooves felt. The horses told him their shoes pinched. He asked the old farm dog why she limped, and she showed him the thorn. From that day he took almost no people as patients at all. He was too busy in the garden, on his knees, listening with his spectacles slipping down his nose.',
        },
        {
          kind: 'note',
          text: 'New word: patient — a person or animal who comes to a doctor to be made well. Every animal in Puddleby was about to become one of the Doctor’s patients.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Money was scarce in that house, but nobody minded very much. The hens laid eggs for breakfast. Jip chased away the beggars who were only beggars and no friends. And on quiet evenings the Doctor sat by the fire with a parrot on each armrest of his chair, talking parrot language till bedtime. Polynesia said he had a real gift. "You listen," she said, "and most people never do."',
        },
      ],
    },
    {
      title: 'Chapter 3 · A Message from Africa',
      art: 'dolittle-letter',
      artPrompt: 'a swallow resting on a doctor’s outstretched hand beside a farmhouse window, a monkey in a small vest standing on the garden wall behind, hollyhocks and a thatched roof, late golden afternoon light with long soft shadows',
      blocks: [
        {
          kind: 'text',
          text: 'One warm spring day, a swallow flew all the way from Africa and landed on the Doctor’s hand. It was out of breath with flying. The monkeys in the Land of the Apes were sick — sick by the thousand — and there was no doctor anywhere who could understand them or help them. The swallow asked: would the Doctor come?',
        },
        {
          kind: 'text',
          text: 'That very evening a shy little monkey arrived at the garden gate, wrapped in a shawl. His name was Chee-Chee, and he had walked a long, long way. He told the Doctor about the great green forest and the monkeys shivering in the trees. The Doctor stood up at once and began packing his black bag.',
        },
        {
          kind: 'image',
          art: 'dolittle-letter',
          text: 'A tired swallow and a shy monkey bring the news that a thousand monkeys are ill.',
        },
        {
          kind: 'text',
          text: 'He borrowed a little sailing ship from a fisherman friend, and stowed aboard Dab-Dab, Gub-Gub, Jip, Too-Too, Polynesia and Chee-Chee. His sister Sarah stood at the garden gate and sighed, because brothers do not always do what sisters wish. But the Doctor waved his hat, and the wind filled the sails, and the little ship slipped out of the harbour in the morning light.',
        },
        {
          kind: 'note',
          text: 'Talk together: a whole crew of animals, and each one helps in its own way — the owl to count, the duck to keep house, the dog to smell. Ask your child what job each animal would be best at on a ship.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Land of the Monkeys',
      art: 'dolittle-monkeys',
      artPrompt: 'thousands of small monkeys huddled along the branches of a vast green jungle, a doctor in a dark coat walking below with a black bag, a little monkey in a vest guiding him, vines and big ferns, misty green light filtering through tall trees',
      blocks: [
        {
          kind: 'text',
          text: 'The voyage was long. One night a storm blew up, and after the storm came Barbary pirates in a fast ship, chasing close behind. But the Doctor’s white mice were awake — they crept into the pirates’ ship through a hole and nibbled, and nibbled, and nibbled, until the pirates’ ship went down. Then two kind dolphins pushed the Doctor’s little ship along, day and night, until Africa rose out of the sea.',
        },
        {
          kind: 'text',
          text: 'They rowed ashore in the dark and walked inland into the forest. And there, in the grey morning light, they saw them: thousands of monkeys sitting huddled in the trees, thin and shivering, too weak even to chatter. Chee-Chee stood on a root and called softly, and the whole forest went quiet, because a doctor had come.',
        },
        {
          kind: 'image',
          art: 'dolittle-monkeys',
          text: 'The silent forest of sick monkeys, waiting for the doctor who could understand them.',
        },
        {
          kind: 'text',
          text: 'The Doctor set up his camp in a clearing. He made a great barrel of medicine and asked the swallows to carry word from tree to tree: come in the morning, one by one. The lions came, and the leopards, and the antelopes, and each was treated in its turn. A big old lion lay down with a bad tooth, and the Doctor pulled it out in one quick, gentle turn, and the lion purred like a kettle.',
        },
        {
          kind: 'note',
          text: 'New word: epidemic — an illness that spreads to very many all at once. The monkeys’ epidemic ended the day a doctor arrived who spoke their language.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Within a week the forest began to talk again. Monkeys swung from branch to branch, and mothers carried fat, noisy babies through the leaves. The jungle that had been silent and full of waiting was full of play. Dab-Dab said the Doctor was a marvel. The Doctor said the monkeys had been very patient patients indeed.',
        },
      ],
    },
    {
      title: 'Chapter 5 · The Pushmi-Pullyu',
      art: 'dolittle-cure',
      artPrompt: 'a strange gentle animal like a two-headed antelope, one head at each end, standing proudly in a jungle clearing while monkeys dance in the branches above and a doctor bows to it, warm shafts of sunlight through green leaves',
      blocks: [
        {
          kind: 'text',
          text: 'When the Doctor packed his black bag to go home, the whole forest came to see him off. The monkeys wanted to give him a present, but he asked for nothing. Then the oldest elephants went away together, deep into the jungle, and after three days they came back leading a strange, shy, gentle animal. It had two heads — one at each end — so it could watch for danger whichever way it went. It was a pushmi-pullyu, the rarest animal in the world.',
        },
        {
          kind: 'text',
          text: '"He says," translated Chee-Chee, "that he would be proud to be the Doctor’s patient, if ever the Doctor needs money. He asks only to be shown quietly, and only twice a week." The Doctor bowed, because such a gift deserves a bow. The pushmi-pullyu bowed back with both ends, which took some doing.',
        },
        {
          kind: 'image',
          art: 'dolittle-cure',
          text: 'The pushmi-pullyu, the rarest animal in the world, given out of gratitude.',
        },
        {
          kind: 'text',
          text: 'The little ship sailed home across the summer sea, and Puddleby came in sight just as the apples were turning red. The garden gate was still broken and the fishpond was still green, but the fire was soon lit, and every animal had its own corner to sleep in. From then on, once or twice a week, the pushmi-pullyu stood quietly in the meadow to be admired, and the money bought oats for Gub-Gub and lamp oil for the Doctor’s books.',
        },
        {
          kind: 'note',
          text: 'Talk together: the pushmi-pullyu is shy, so the Doctor promises to show it gently and rarely. Ask your child: what would you tell a shy new friend to help them feel safe?',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Story of Doctor Dolittle',
    author: 'Hugh Lofting',
    authorDeathYear: 1947,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Retold for children; plot follows the public-domain original. Published 1920; US public domain (pre-1929) and worldwide (Lofting d. 1947, 70y pma expired).',
  },
}
