import type { PackBook } from '../types'

/**
 * The Voyages of Doctor Dolittle — five chapters retold for young English readers.
 * Text: Hugh Lofting, 1922 (Newbery Medal, 1923). US public domain (published
 * pre-1929) and worldwide (Lofting d. 1947, 70y pma expired). Plot follows the
 * original novel; wording simplified for readers aged 9-12.
 */
export const dolittleVoyage: PackBook = {
  id: 'tale-dolittlevoyage',
  title: 'The Voyages of Doctor Dolittle',
  author: 'Hugh Lofting',
  lang: 'en',
  category: 'tale',
  ageStage: '9-12',
  intro: 'Tommy Stubbins, a cobbler’s son, becomes Doctor Dolittle’s apprentice and learns the language of animals. Together they sail the little ship Curlew across the world to find the lost naturalist Long Arrow — and come home riding the Great Glass Sea Snail, beneath the waves.',
  coverArt: 'voyage-island',
  coverArtPrompt: 'a green floating island of soft spongy stone drifting on a calm tropical sea, a small sailing ship anchored beside it, a doctor and a boy in a rowing boat heading for a sandy shore where tall native huts stand among palms, warm clear afternoon light',
  coverFrom: '#1565C0',
  coverTo: '#80DEEA',
  source: 'The Voyages of Doctor Dolittle (Hugh Lofting, 1922), public domain',
  chapters: [
    {
      title: 'Chapter 1 · The Boy Who Found the Doctor',
      art: 'voyage-meeting',
      artPrompt: 'a cobbler’s shop interior with hanging tools and leather on a bench, a boy holding a small injured squirrel wrapped in cloth, a tall kind doctor kneeling to look at it, a green parrot watching from a shelf, soft window light',
      blocks: [
        {
          kind: 'text',
          text: 'In Puddleby-on-the-Marsh there lived a cobbler’s son named Tommy Stubbins. He helped his father mend boots, and he liked best of all to wander the river bank with a net and a notebook, watching everything that crept or swam. One autumn morning he found a squirrel lying hurt by the mill path, and he carried it home in his cap, wishing with all his heart that he knew how to mend it.',
        },
        {
          kind: 'text',
          text: '"Take it to Doctor Dolittle," said his mother. So Tommy ran through the town, past the market and the old windmill, to the little house with the big garden. The Doctor himself opened the door — a large, kind man with spectacles — and behind his shoulder a green parrot leaned out to look.',
        },
        {
          kind: 'image',
          art: 'voyage-meeting',
          text: 'A hurt squirrel, a boy with quick hands, and a doctor who had been waiting for a pupil.',
        },
        {
          kind: 'text',
          text: 'The Doctor set the squirrel’s arm with a splint no bigger than a matchstick. "He will write to you when he is better," said the Doctor, quite seriously. "He is very grateful, and squirrels are good correspondents." Tommy stayed for tea in the kitchen, where a duck dried the plates and a pig ate the crusts, and before he went home he had promised to come back the very next day. And the day after that, and the day after that.',
        },
        {
          kind: 'note',
          text: 'New word: apprentice — someone who learns a trade by working beside a master. Tommy was about to become an apprentice naturalist, which means a student of all living things.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 2 · Lessons in Animal Talk',
      art: 'voyage-lessons',
      artPrompt: 'a candlelit study full of books, jars of shells and a aquarium, a boy writing letters at a desk while a green parrot stands on an open dictionary pointing with one claw, a doctor reading over his spectacles in the background, warm lamplight',
      blocks: [
        {
          kind: 'text',
          text: 'The way into animal language, Polynesia the parrot said, was the same as the way into any language: letters first, and patience. So while the squirrel’s arm mended, Tommy sat in the Doctor’s study copying the alphabet, and Polynesia marched along the open dictionary, tapping each word with one claw.',
        },
        {
          kind: 'text',
          text: 'It was slow work. Dog words bend and change their meaning the way a tail moves — one bark has a dozen cousins. But at last, one evening, Tommy asked Jip the dog a question in dog language, and Jip sat up so suddenly that his ears stood straight out. "You said that properly," said Jip. Nobody had ever said anything to him so properly in all his life, and the Doctor laughed until his spectacles fell off.',
        },
        {
          kind: 'image',
          art: 'voyage-lessons',
          text: 'Polynesia’s evening school: one dictionary, one boy, and a great deal of patience.',
        },
        {
          kind: 'text',
          text: 'That winter the Doctor showed Tommy his greatest treasure: a shell from the deep sea, into which he had whispered a question, and from which a voice had answered. Somewhere under the waves lived creatures who spoke a slow, silver language all their own. The Doctor longed to learn it. He also longed to find his friend Long Arrow, the greatest naturalist alive, who had sailed away to the southern seas and vanished. By spring, the little ship Curlew was being loaded with nets, notebooks and barrels of oats.',
        },
        {
          kind: 'note',
          text: 'Talk together: Tommy learned animal language one small word at a time. Ask your child what they would want to ask a dog, a horse or a parrot first, if they could.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Curlew Sets Sail',
      art: 'voyage-curlew',
      artPrompt: 'a small wooden sailing ship with patched sails running before a rolling grey-green storm sea at dusk, a boy hauling a rope beside a round-faced doctor at the wheel, spray flying over the bows, a break in the clouds with one pale star',
      blocks: [
        {
          kind: 'text',
          text: 'The Curlew slipped down the river on a bright morning with a good wind, and aboard her were the Doctor, Tommy, Jip, Polynesia, Chee-Chee, Dab-Dab, Gub-Gub and a young African prince named Bumpo, who had left his books at Oxford to come along as ship’s carpenter. For days the sea lay blue and kind, and Tommy learned the names of ropes and stars.',
        },
        {
          kind: 'text',
          text: 'Then, in the Bay of Biscay, a storm found them. For two days and two nights the little ship ran before the wind with waves climbing over her sides, while the Doctor held the wheel and Polynesia shouted directions in gull language, guiding them out of the worst of it. When the sky cleared, the masts were cracked but everyone was safe, and the sea lay flat as hammered tin.',
        },
        {
          kind: 'image',
          art: 'voyage-curlew',
          text: 'The Curlew running before the storm, steered by a parrot who knew the way.',
        },
        {
          kind: 'text',
          text: 'They were far off their course — and it was the luckiest thing that ever happened. For on the horizon stood an island that did not appear on any chart, a green island riding the sea like a leaf on a pond. Polynesia, who had questioned a passing seabird, called down from the masthead: "It is Spidermonkey Island! It has drifted south! And Long Arrow was last seen going ashore there!" The Doctor’s face went bright as a boy’s. "Put her about," he said. "We are going to see."',
        },
        {
          kind: 'note',
          text: 'New word: chart — a map of the sea, drawn for sailors. Spidermonkey Island was missing from every chart, because the island itself would not keep still.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Floating Island',
      art: 'voyage-island',
      artPrompt: 'a green island of porous floating stone drifting on clear turquoise water, palm trees and grass huts on its shore, friendly islanders waving from the beach while a rowing boat with a doctor and a boy comes ashore, seabirds circling, bright tropical morning',
      blocks: [
        {
          kind: 'text',
          text: 'Spidermonkey Island was made of a soft, spongy stone that floats, and it drifted wherever the great ocean currents chose to carry it. The islanders were used to their travelling home; they fished from its edges and grew corn in its warm soil, and they welcomed the strangers on the beach with roasted fish and laughter.',
        },
        {
          kind: 'text',
          text: 'But when the Doctor asked after Long Arrow, the smiles faded. The great naturalist and his two companions had gone into a sea cave beneath the island months before, to study the deep things inside it, and had not come out. The islanders had lowered ropes and shouted into the dark, and nothing had ever answered.',
        },
        {
          kind: 'image',
          art: 'voyage-island',
          text: 'Spidermonkey Island adrift on the sea, hiding a secret in the rock below.',
        },
        {
          kind: 'text',
          text: 'The Doctor did not sleep that night. At dawn he led a party along the shore to a low arch of rock where the sea breathed in and out. Inside, behind a fall of loose stone, they could hear — very faintly — a tapping. Stone answers stone, if you are patient. For three days the Doctor and Bumpo and the strongest islanders picked and hauled, and on the third afternoon the wall came down, and out of the darkness walked Long Arrow, thin, dusty, and entirely calm, holding a jar of cave moths he had not wished to drop.',
        },
        {
          kind: 'text',
          text: 'Long Arrow spoke a hundred languages of men and birds, and the two naturalists talked for six hours without stopping. "I had heard," said Long Arrow at last, in careful English, "that in England there was a man who spoke to animals. I did not believe it. Now I see the animals believe it, and that is better proof."',
        },
        {
          kind: 'note',
          text: 'Talk together: Long Arrow stayed calm in the dark and kept careful notes about the cave. Ask your child: what would you want to know first if you woke up inside a floating island?',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 5 · The Great Glass Sea Snail',
      art: 'voyage-snail',
      artPrompt: 'an enormous translucent sea snail with a glowing shell like clear glass drifting over a moonlit underwater world, a doctor, a boy and their animal friends sitting inside the shell, glowing jellyfish and silver fish all around, deep blue light with shafts of moonlight from above',
      blocks: [
        {
          kind: 'text',
          text: 'With Long Arrow found, it was time to go home. But the season had turned, and the Curlew lay with a broken mast on an island that was drifting, week by week, toward the cold grey rocks of the far north. The islanders could not steer their island. It seemed the whole journey had led to a beautiful dead end.',
        },
        {
          kind: 'text',
          text: 'Then the Doctor remembered the shell on his study shelf, and the slow silver voice inside it. He rowed out where the water was deepest and called into the sea, in shellfish language, asking very politely for help. The sea went still. And up from the green dark rose the Great Glass Sea Snail, enormous and patient, its shell clear as a window.',
        },
        {
          kind: 'image',
          art: 'voyage-snail',
          text: 'The Great Glass Sea Snail, come up from the deep in answer to a polite question.',
        },
        {
          kind: 'text',
          text: 'They sealed themselves inside the shining shell, and the snail carried them down and away, under the whole ocean — past glowing jellyfish and silver shoals, past a whale feeding her calf, past mountains of coral with gardens on them. Tommy kept his nose to the glass the entire way and slept hardly at all. In fourteen days the snail rose gently to the surface at the mouth of the river below Puddleby, and set them down like a lady setting down a teacup.',
        },
        {
          kind: 'note',
          text: 'Talk together: the Doctor asked for help politely, in the helper’s own language, and got it. Ask your child: what would you say thank you for, if a sea snail carried you home?',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Voyages of Doctor Dolittle',
    author: 'Hugh Lofting',
    authorDeathYear: 1947,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Retold for children; plot follows the public-domain original. Published 1922; US public domain (pre-1929) and worldwide (Lofting d. 1947, 70y pma expired).',
  },
}
