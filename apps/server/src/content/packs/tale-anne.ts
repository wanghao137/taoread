import type { PackBook } from '../types'

/**
 * Anne of Green Gables (L. M. Montgomery, 1908) — five chapters retold in simple
 * English for readers aged 9–12. Text: Project Gutenberg eBook #45. Public domain
 * in the US (pre-1929); Montgomery died in 1942 and the work is also public domain
 * worldwide under the 70-years-post-mortem rule. Plot and characters (Matthew and
 * Marilla Cuthbert, Mrs. Rachel Lynde, Gilbert Blythe, Diana Barry, Minnie May)
 * follow the original book; only the wording is shortened and simplified.
 */
export const anneGreenGables: PackBook = {
  id: 'tale-anne',
  title: 'Anne of Green Gables',
  author: 'L. M. Montgomery',
  lang: 'en',
  category: 'tale',
  ageStage: '9-12',
  intro: 'Matthew and Marilla Cuthbert asked the orphanage for a boy to help on their farm. By mistake they got Anne — a red-haired, talkative girl with a big imagination. Green Gables would never be the same again.',
  coverArt: 'anne-green-gables-cover',
  coverArtPrompt: 'a slender red-haired girl in a plain brown dress standing on a green farm lane between two tall trees, a tidy white farmhouse with green gables and an orchard behind her, warm afternoon light, storybook watercolor',
  coverFrom: '#4A235A',
  coverTo: '#D5F5E3',
  source: 'Project Gutenberg eBook #45, public domain (Montgomery d. 1942)',
  chapters: [
    {
      title: 'Chapter 1 · Matthew Brings Anne Home',
      art: 'anne-bright-river-station',
      artPrompt: 'a shy elderly man in a white collar standing beside a horse-drawn buggy at a small country railway station, a red-haired girl with a faded carpetbag looking up at him, soft evening light, gentle storybook scene',
      blocks: [
        {
          kind: 'text',
          text: 'Matthew Cuthbert was a quiet man. He lived at Green Gables farm with his sister Marilla, and he liked two things in the world: peace and quiet. So all Avonlea stared when he drove his buggy off to Bright River station — to meet an orphan boy from the asylum.',
        },
        {
          kind: 'image',
          art: 'anne-station-platform',
          text: 'Matthew finds a red-haired girl waiting on the platform at Bright River.',
        },
        {
          kind: 'text',
          text: 'But when Matthew reached the station there was no boy. On the platform sat a girl, eleven years old, with red hair in two tight braids and big eyes full of dreams. "I was afraid you wouldn\'t come," she said, and talked all the way home about the trees, the sky, and how she had never had a real home.',
        },
        {
          kind: 'note',
          text: 'New word: orphan — a child whose parents have died. Anne had no mother and father of her own.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Matthew said nothing, but he thought: this girl belongs at Green Gables. Marilla was not so sure. "We asked for a boy," she said. "What can a girl do about the farm?" Anne listened at the parlour door, and her heart sank like a stone.',
        },
        {
          kind: 'text',
          text: 'That night Anne cried into her pillow, sure she would be sent back. But next morning Marilla looked long at the girl, and Matthew said quietly, "We might as well keep her." And so Anne Shirley came to stay at Green Gables.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Apology to Mrs. Rachel Lynde',
      art: 'rachel-lynde-apology',
      artPrompt: 'a determined woman with grey hair in a neat parlour, a red-haired girl standing before her with folded hands making a solemn bow, an older woman by the stove trying not to smile, warm indoor light',
      blocks: [
        {
          kind: 'text',
          text: 'Mrs. Rachel Lynde was the nosiest woman in Avonlea. She came to call and looked Anne over from head to foot. "She\'s terrible skinny," said Mrs. Rachel, "and her hair is as red as carrots." Nobody had ever said that to Anne\'s face.',
        },
        {
          kind: 'image',
          art: 'rachel-lynde-parlour',
          text: 'Anne makes her grand apology to a surprised Mrs. Rachel Lynde.',
        },
        {
          kind: 'text',
          text: 'Anne jumped up, her eyes flashing. "You are a rude, wicked woman!" she cried. "How dare you call me skinny and red-haired!" Marilla sent her to her room and told her she must apologize.',
        },
        {
          kind: 'note',
          text: 'New word: apologize — to say you are sorry for something you did. Anne had a big temper, and an even bigger heart.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Anne marched downstairs and bowed low. "Oh, Mrs. Lynde," she said, "I am the most wicked and ungrateful girl in the world. I have a dreadful temper. Please, please forgive me." Mrs. Rachel was so surprised that she forgave her at once — and Marilla had to hide a smile.',
        },
        {
          kind: 'text',
          text: 'After that day, Mrs. Rachel Lynde said Anne had more sense in her little finger than other girls had in their whole heads. It was the beginning of a long and lasting friendship.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Slate over Gilbert\'s Head',
      art: 'gilbert-slate-avonlea-school',
      artPrompt: 'a sunny old-fashioned schoolroom with wooden desks, a dark-haired boy grinning and holding one end of a red braid, a red-haired girl standing up with a slate raised over her head, other children watching, bright windows',
      blocks: [
        {
          kind: 'text',
          text: 'Anne loved school. She loved reading, and sums, and the game of spelling words down the class. There was one thing she did not love: Gilbert Blythe, the handsomest boy in Avonlea, who sat across the aisle.',
        },
        {
          kind: 'image',
          art: 'avonlea-schoolroom',
          text: 'Anne brings her slate down on Gilbert Blythe\'s head.',
        },
        {
          kind: 'text',
          text: 'One day Gilbert wanted Anne to look at him. He reached across the aisle, caught the end of her long red braid, and whispered, "Carrots! Carrots!" Anne sprang to her feet. "You mean, hateful boy!" she cried — and thwack! She brought her slate down on Gilbert\'s head and cracked it clean across. The slate, that is, not the head.',
        },
        {
          kind: 'note',
          text: 'New word: slate — a small black board children wrote on with chalk, long before paper was cheap.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The teacher kept Anne in after school, and Gilbert tried all that week to make friends. Anne would not look at him. It took a very long time, and a very hard winter, before she forgave him — but that is a story for another day.',
        },
      ],
    },
    {
      title: 'Chapter 4 · Diana and the Raspberry Cordial',
      art: 'diana-raspberry-cordial',
      artPrompt: 'two girls in pinafores in a farmhouse kitchen, one dark-haired and one red-haired, a green glass bottle and two tumblers on the table between them, afternoon sun through the window, cheerful storybook scene',
      blocks: [
        {
          kind: 'text',
          text: 'Anne\'s best friend in all the world was Diana Barry, a girl with dark eyes and black hair. They walked to school together, picked flowers together, and promised to be friends forever. They were "bosom friends," Anne said.',
        },
        {
          kind: 'image',
          art: 'diana-tea-kitchen',
          text: 'Anne pours Diana a tumbler of what she thinks is raspberry cordial.',
        },
        {
          kind: 'text',
          text: 'One afternoon Anne invited Diana for tea. In the cupboard stood a bottle Marilla had always called raspberry cordial. Anne filled Diana\'s tumbler again and again, and Diana drank three full glasses. "I feel very sleepy," said Diana, and went home with her hat over one ear.',
        },
        {
          kind: 'note',
          text: 'New word: cordial — a sweet fruit drink. But the bottle held something stronger than fruit juice — it was currant wine, and it was not for children at all.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Next day Mrs. Barry came to the door. "Diana was sick all night," she said. "Anne Shirley gave her wine." Poor Anne! She had not known. But Mrs. Barry would not listen, and forbade Diana to play with her again.',
        },
        {
          kind: 'text',
          text: 'For weeks Anne and Diana passed each other at school without a word. It was the saddest time Anne had ever known — until the night Diana\'s little sister fell ill, and Anne proved what a true friend she was.',
        },
      ],
    },
    {
      title: 'Chapter 5 · The Rescue of Minnie May Barry',
      art: 'minnie-may-rescue',
      artPrompt: 'a snowy winter night, a red-haired girl in a heavy coat running with a lantern down a country lane toward a lighted farmhouse window, snow on the fir trees, deep blue night sky, dramatic and hopeful',
      blocks: [
        {
          kind: 'text',
          text: 'Late one winter night Anne heard a frantic knock. It was Diana, crying in the snow. "Oh, Anne, do come quick! Minnie May has the croup, and there is nobody to go for the doctor. I am afraid she is dying."',
        },
        {
          kind: 'image',
          art: 'minnie-may-snow-night',
          text: 'Anne runs through the snow to the Barry farmhouse with the ipecac bottle.',
        },
        {
          kind: 'text',
          text: 'Anne had nursed children with the croup before, in the asylum and the hamlets where she had lived. "Wrap her in hot blankets," she said, "and give her ipecac every minute till she is sick." All night long Anne and Diana fought for the little girl, and by dawn Minnie May was breathing easily and sleeping.',
        },
        {
          kind: 'note',
          text: 'New word: croup — a bad winter illness that makes a child cough and struggle for breath. The ipecac was a medicine from the doctor\'s shelf.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'When the doctor came at last, he said Anne had saved the child\'s life. Mrs. Barry took Anne\'s hands and asked her to forgive an old woman\'s stubbornness. From that hour, Diana was Anne\'s friend again — for good.',
        },
        {
          kind: 'text',
          text: 'The years that followed were bright ones: school, and prizes, and a scholarship to Queen\'s College. Gilbert Blythe gave up his own place at Avonlea school so Anne could teach and stay near Marilla. As Anne stood one evening where the road bent toward Green Gables, she knew her life was full of promise. "Tomorrow is always fresh," she thought, "with no mistakes in it yet."',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Anne of Green Gables',
    author: 'L. M. Montgomery',
    authorDeathYear: 1942,
    jurisdiction: 'US',
    basis: 'pd-us',
    sourceUrl: 'https://www.gutenberg.org/ebooks/45',
    note: 'Retold in simple English; plot follows the public-domain original.',
  },
}
