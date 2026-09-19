import type { PackBook } from '../types'

/**
 * The House of Arden (E. Nesbit, 1908) — five chapters retold for readers
 * aged 9–12. E. Nesbit died in 1924, so the work is public domain in the US
 * (published before 1929) and worldwide. Plot and characters (Edred and
 * Elfrida Arden, Aunt Edith, the white Mouldiwarp, the smuggling past, the
 * days of the old kings) follow the original novel; the wording is shortened
 * and simplified.
 */
export const houseArden: PackBook = {
  id: 'nesbit-arden',
  title: 'The House of Arden',
  author: 'E. Nesbit',
  lang: 'en',
  category: 'tale',
  ageStage: '9-12',
  intro: 'Edred and Elfrida Arden are poor, but they are the last of an old family. A magical white mole called the Mouldiwarp offers them the lost Arden treasure — if they can find it through the tunnels of time.',
  coverArt: 'arden-tower',
  coverArtPrompt: 'two children, a boy of ten and a girl of twelve in old-fashioned clothes, standing on a grassy mound beside the ivy-covered ruins of an old English castle at dusk, a small white mole on the grass before them, soft purple evening light with one lit tower window, atmospheric but warm storybook illustration',
  coverFrom: '#33691E',
  coverTo: '#C5E1A5',
  source: 'The House of Arden (E. Nesbit, 1908), public domain (Nesbit d. 1924)',
  chapters: [
    {
      title: 'Chapter 1 · The Last of the Ardens',
      art: 'arden-ruins',
      artPrompt: 'a large ivy-grown castle ruin with fallen towers beside a quiet English lane, two children in old-fashioned clothes standing at the rusted gate looking up, a small tidy cottage nearby, autumn afternoon light, warm detailed storybook illustration',
      blocks: [
        { kind: 'text', text: 'Edred Arden was ten, and his sister Elfrida was twelve. They lived quietly with their Aunt Edith, and money was often short. But the children had a long and famous name.' },
        { kind: 'text', text: 'One day a lawyer brought surprising news. A distant relative had died, and left the old Arden castle to Edred. From that day he was Lord Arden, master of a ruin.' },
        { kind: 'image', art: 'arden-gate', text: 'The children visit their new, crumbling castle.' },
        { kind: 'text', text: 'The castle was mostly broken walls, and swallows nested in the towers. Still, it was theirs, and the name of Arden went back hundreds of years.' },
        { kind: 'text', text: 'Old stories said the family once owned a great treasure. It had vanished long ago, and nobody living knew where it was hidden.' },
        { kind: 'note', text: 'New word: heir — the person who inherits a family\'s home and title. Edred inherits the title, but not a single coin to keep the walls standing.', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 2 · The White Mouldiwarp',
      art: 'arden-mole',
      artPrompt: 'a small silvery-white mole sitting upright on a mossy mound in a hollow behind castle ruins, speaking to two surprised children in old-fashioned clothes, soft green twilight with fireflies, gentle magical storybook scene',
      blocks: [
        { kind: 'text', text: 'Behind the castle lay a hollow full of elder trees. There, one evening, the children met the strangest creature — a small white mole, sitting up like a wise little judge.' },
        { kind: 'text', text: '"I am the Mouldiwarp," it said, "guardian of your house. A true Arden may win the treasure — but only through the tunnels of time. I can tunnel where no train has ever run."' },
        { kind: 'image', art: 'arden-hollow', text: 'The white mole speaks in the twilight hollow.' },
        { kind: 'text', text: '"Climb into my tunnel when I scrape the earth," said the Mouldiwarp, "and you will walk in days gone by. Seek the treasure where it was lost, and you may learn where it waits."' },
        { kind: 'note', text: 'Mouldiwarp is an old country word for a mole. Ask your child: the children cannot simply be handed the treasure — they must earn understanding first. Is that fair?', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 3 · The Smugglers\' Marsh',
      art: 'arden-marsh',
      artPrompt: 'two children in old-fashioned clothes hiding behind reeds on a moonlit marsh, long boats sliding silently through the mist with lanterns shaded dark, distant riders on a road, silver blue moonlight, mysterious but exciting storybook scene',
      blocks: [
        { kind: 'text', text: 'The first tunnel took them to the year 1807. The marsh lay silver under the moon, and boats slid through the mist without a light. Smugglers were bringing in their cargo.' },
        { kind: 'text', text: 'Among the quiet men was an Arden of long ago, helping to land the kegs. The children watched from the reeds, their hearts thumping like drums.' },
        { kind: 'image', art: 'arden-boats', text: 'The smugglers\' boats slide through the misty channel.' },
        { kind: 'text', text: 'They heard talk of money hidden and debts unpaid, of hard years and stubborn pride. The Ardens of that day were poor too — and rather proud of it.' },
        { kind: 'text', text: 'When the moon sank, the Mouldiwarp scraped the earth, and the children tumbled back into their own time. "That was our great-great-grandfather\'s day," whispered Elfrida.' },
        { kind: 'note', text: 'Ask your child: the smugglers were breaking the law, yet some were kind to the children. Can a person be brave and generous and still do wrong? Talk it through.', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 4 · The Days of the Old Kings',
      art: 'arden-towerpast',
      artPrompt: 'the same English castle but whole and proud with bright banners in an earlier century, two children in old-fashioned clothes in a torch-lit stone passage, an ancestor with a candle in a doublet hurrying past with a small iron-bound chest, warm torchlight and deep shadows, rich historical storybook scene',
      blocks: [
        { kind: 'text', text: 'The second tunnel carried them much further back, to the days when the castle stood whole, with banners on the towers and horses in the yard.' },
        { kind: 'text', text: 'Those were dangerous times. A man could lose his fortune — or his head — for choosing the wrong side. The Ardens were hiding their gold before soldiers could take it.' },
        { kind: 'image', art: 'arden-chest', text: 'An ancestor hurries through the passage with a chest.' },
        { kind: 'text', text: 'The children saw an Arden of that age hide a small iron-bound chest. But before they could see where, a servant barred the passage, and the moment was gone.' },
        { kind: 'text', text: '"We keep missing the secret," sighed Edred. But Elfrida had begun to notice something: in every age, the Ardens were brave, stubborn, and kind to their own people.' },
        { kind: 'note', text: 'Ask your child: what does the family keep losing and keeping through all these years? Talk about what a family really passes down — money, or character.', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 5 · The Treasure of Arden',
      art: 'arden-chest',
      artPrompt: 'two children in old-fashioned clothes kneeling in a mossy hollow behind castle ruins lifting the heavy lid of an iron-bound chest full of old gold coins, a small white mole sitting beside the hole, a shaft of warm sunlight breaking through the trees, joyful glowing storybook scene',
      blocks: [
        { kind: 'text', text: 'Back in their own time, the children sat in the hollow and thought. Then Elfrida laughed aloud. "Why, all the clue-giving pointed here! It was never far away at all."' },
        { kind: 'text', text: 'The Mouldiwarp scraped the earth one last time — and this time the tunnel opened onto their own hollow, in their own year, right beside a fallen stone.' },
        { kind: 'image', art: 'arden-find', text: 'The children dig where the last tunnel ends.' },
        { kind: 'text', text: 'They dug in the soft earth together, and their spades rang on iron. The old Arden chest came up into the daylight, heavy with coins saved through centuries of trouble.' },
        { kind: 'text', text: 'There was money to mend the walls and wages for the estate, and Aunt Edith could stop counting every penny. And Edred, the new Lord Arden, had learned the truest lesson of the house: an Arden is richest when he works for others, not for himself.' },
        { kind: 'note', text: 'Ask your child: why did the Mouldiwarp make them travel through time first? What did they carry home that was worth more than the coins?', art: 'lamp-hint' },
      ],
    },
  ],
  rights: {
    workTitle: 'The House of Arden',
    author: 'E. Nesbit',
    authorDeathYear: 1924,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Retold for children; plot follows the public-domain original. Published 1908; US public domain, and the author died in 1924.',
  },
}
