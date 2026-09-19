import type { PackBook } from '../types'

/**
 * Little Women — five chapters retold in simple English for young readers.
 * Original: Louisa May Alcott, published 1868. Public domain in the US
 * (pre-1929) and worldwide (Alcott died 1888; 70y pma long expired). The
 * March sisters, Laurie next door, the burned storybook, Beth's fever, and
 * Father's homecoming follow the original novel; wording simplified into
 * short sentences for children aged 9-12.
 */
export const littleWomen: PackBook = {
  id: 'alcott-littlewomen',
  title: 'Little Women',
  author: 'Louisa May Alcott',
  lang: 'en',
  category: 'tale',
  ageStage: '9-12',
  intro: 'Four sisters - Meg, Jo, Beth, and Amy - grow up in a small house while their father is away at war. They are poor in money but rich in love, and each girl must learn her own hard lesson before the year turns.',
  coverArt: 'march-sisters',
  coverArtPrompt: 'four sisters in simple 1860s dresses huddled together on a worn red settee in a warm little parlor, one writing in a notebook, one sewing, one holding a cat, a small fire glowing in the hearth, a garland of holly over the mantel, golden lamplight, cozy winter evening, storybook illustration, soft warm colors, gentle and hopeful mood',
  coverFrom: '#8D6E63',
  coverTo: '#FFCC80',
  source: 'Little Women (Louisa May Alcott, 1868), public domain (Alcott d. 1888)',
  chapters: [
    {
      title: 'Chapter 1 · Christmas Without Father',
      art: 'march-hearth',
      artPrompt: 'a cozy parlor on a snowy Christmas morning, four girls in plain wool dresses sitting by a small fire with one orange each, a mother in a gray dress and cap standing beside them, patched stockings hung on the mantel, snow falling past a little window, soft morning light, warm storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'Long ago, in a small New England town, four sisters lived in a little gray house. Meg was gentle and liked pretty things. Jo was loud and loved to write plays. Beth was shy and played the piano. Little Amy drew pictures and dreamed of being an artist. Their father was far away, helping soldiers in the war, so Mother worked and worried and waited.',
        },
        {
          kind: 'image',
          art: 'march-breakfast',
          text: 'The sisters carry their own Christmas breakfast through the snow to the poor Hummel family.',
        },
        {
          kind: 'text',
          text: 'On Christmas morning there were no presents at all. "Not even one," sighed Amy. But Mother came in with news of a poor mother nearby. Her children were cold and hungry. The four girls looked at their breakfast of toast and oranges. Then, all together, they carried it out through the snow to the Hummels. They came home hungry, but strangely light of heart.',
        },
        {
          kind: 'note',
          text: 'Talk together: The March girls had no money for gifts. What presents did they give that day that cost nothing at all?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'That evening Mother found a surprise under each pillow - a small blue book, sent by Father far away. The girls put on plays in the attic, sang by the fire, and read Father\'s letter together. "I know they will be good girls," the letter said. Each sister made a quiet wish to be better in the new year. The house felt poor in money but rich in love.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Boy Next Door',
      art: 'march-mansion',
      artPrompt: 'a girl in a plain green dress talking to a shy boy in a fine suit at a tall window of a grand stone mansion, warm lamplight inside the window, snowy garden between the mansion and a small gray house beyond, evening blue sky, warm and friendly storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'Next door stood a grand mansion with a garden and a glass porch. Old Mr. Laurence lived there with his grandson Laurie. Laurie had tutors, books, and a piano. But he had no sister, no brother, and no friend to play with at all.',
        },
        {
          kind: 'image',
          art: 'march-window-talk',
          text: 'Jo finds Laurie watching the fun from behind his window.',
        },
        {
          kind: 'text',
          text: 'One evening Jo looked up from the snow and saw a sad face at the mansion window. She threw a snowball, and soon the lonely boy came out. They talked and laughed, and Jo found that Laurie was not grand at all, only shy. "You need a whole family," said Jo. "Ours is a jolly one. Come and be in our plays."',
        },
        {
          kind: 'note',
          text: 'Question for you: Laurie had a huge house but no friend. Why do you think one friend mattered more to him than all those fine rooms?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'After that, Laurie was always in and out of the little gray house. He pulled the girls on sleds and acted in Jo\'s attic plays. Old Mr. Laurence watched from his window and began to smile. The two houses on the hill grew close as one.',
        },
      ],
    },
    {
      title: 'Chapter 3 · Jo\'s Hot Temper',
      art: 'march-frozen-pond',
      artPrompt: 'a frozen river in gray winter light, a girl in a red hood fallen through broken ice reaching up with one mittened hand, another girl frozen on the bank in shock, a boy skating fast toward them, bare trees and white snow, tense but gentle storybook illustration, soft cold colors',
      blocks: [
        {
          kind: 'text',
          text: 'Jo was writing a book of fairy stories, and she worked at it every night. Amy begged to come along when Jo and Laurie went to the theater. Jo said no, and Amy grew angry. The next day Amy burned Jo\'s precious storybook in the stove. "You will be sorry!" cried Jo, and her eyes blazed like fire.',
        },
        {
          kind: 'image',
          art: 'march-ashes',
          text: 'Jo stares into the stove where a winter of stories burned to ashes.',
        },
        {
          kind: 'text',
          text: 'The next afternoon the girls went skating on the river. Amy followed, wanting to make peace. Jo, still angry, skated away without her. Then the thin ice cracked, and Amy plunged into the freezing water. For one terrible moment Jo stood still. Then Laurie pushed a plank across the ice, and together they pulled Amy out, cold and shaking.',
        },
        {
          kind: 'note',
          text: 'Talk together: Jo\'s anger lasted one minute, but it hurt for days. When you feel very angry, what helps you wait before you act?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'That night Jo could not sleep for shame. "I almost lost my sister because I was angry," she whispered. Mother took her hand. "I have fought a hot temper all my life too," she said. "We will help each other." Amy said she was sorry too, and the two made peace by the fire.',
        },
      ],
    },
    {
      title: 'Chapter 4 · Beth and the Fever',
      art: 'march-sickroom',
      artPrompt: 'a quiet bedroom lit by one shaded lamp, a pale girl with braided hair asleep under patchwork quilts, a sister in an apron holding a cup of medicine, another sister sitting sadly in a chair, a small vase of dried flowers on the table, deep night shadows at the window, tender and calm storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'Scarlet fever came to the poor Hummel house, and Beth kept going there to help, day after day. Then Beth grew hot and pale, and the doctor shook his head. She had caught the fever herself. Worst of all, Mother was far away in Washington, sitting by Father\'s sickbed.',
        },
        {
          kind: 'image',
          art: 'march-waiting',
          text: 'Meg and Jo take turns watching by Beth\'s bed, night after night.',
        },
        {
          kind: 'text',
          text: 'So Meg and Jo did Mother\'s work and watched by Beth\'s bed. Beth did not complain, but she grew quieter and thinner, and her small hands would not hold her sewing. "She never thinks of herself," whispered Jo. Even Laurie stopped whistling, and old Mr. Laurence sent dainties and kind messages every day.',
        },
        {
          kind: 'note',
          text: 'New word: fever - when the body grows hot from being ill. Rest, cool cloths, and care help it mend.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'One dark night the fever seemed to break, and Beth fell into a long, quiet sleep. The doctor smiled at last. "She will be weak for a long time," he said, "but she will live." When Mother came home and crept to the bedside, Beth opened her eyes and smiled. Old Mr. Laurence sent his own little piano for Beth that very week.',
        },
      ],
    },
    {
      title: 'Chapter 5 · Father Comes Home',
      art: 'march-homecoming',
      artPrompt: 'a father in a worn soldier coat setting down his travel bag in a small parlor doorway, four daughters rushing toward him with outstretched arms, the youngest leading a thin smiling girl by the hand, the mother laughing with tears, firelight and a small Christmas tree, evening warmth, joyful storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'Spring came, and a letter arrived with wonderful news. Father was well, and Father was coming home. The whole house burst into motion. Jo scrubbed and Meg baked and Amy practiced her welcome speech. Beth, still thin, sewed her little gifts and hummed at the piano.',
        },
        {
          kind: 'image',
          art: 'march-gate',
          text: 'The sisters watch the road from the gate, counting every wagon.',
        },
        {
          kind: 'text',
          text: 'At dusk they heard slow steps on the walk. Father stood in the doorway, thin and brown from the war, and for a moment nobody could speak. Then all five of them reached him at once, and the little hall was full of arms and laughter. Beth slipped her hand into his and did not let go all evening.',
        },
        {
          kind: 'note',
          text: 'Question for you: A whole year has changed each sister. How is Jo different now from the girl who lost her temper at the frozen pond?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'They kept Christmas all over again, with a small tree and Father\'s stories. Jo looked around the fire at her family and decided she was rich after all. "Not a splendid house," she said to Laurie, "but the happiest one in town." And everyone who heard her agreed.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Little Women',
    author: 'Louisa May Alcott',
    authorDeathYear: 1888,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Retold for children; plot follows the public-domain original. Published 1868; worldwide public domain.',
  },
}
