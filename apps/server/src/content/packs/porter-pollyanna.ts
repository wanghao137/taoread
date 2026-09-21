import type { PackBook } from '../types'

/**
 * Pollyanna — four chapters retold for young English readers aged 6-8.
 * Text: Project Gutenberg eBook #1450 (Eleanor H. Porter, 1913). US public domain
 * (published pre-1929); Porter died 1920. Plot follows the original: the orphan
 * Pollyanna comes to live with strict Aunt Polly and teaches the whole town the
 * Glad Game. Wording simplified into short sentences for children.
 */
export const pollyanna: PackBook = {
  id: 'porter-pollyanna',
  title: 'Pollyanna',
  author: 'Eleanor H. Porter',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'Pollyanna Whittier arrives in Beldingsville with one small carpetbag and one very big idea: the Glad Game — finding something to be glad about in everything. By summer\'s end, even her stiffest, stillest aunt is learning to play.',
  coverArt: 'pollyanna-window',
  coverArtPrompt: 'a small girl with sunny braids and a patchwork dress kneeling happily on a window seat of a tall white clapboard house, looking out at green Vermont hills, a sunbeam falling across her freckled face, geraniums on the sill, warm hopeful morning light',
  coverFrom: '#F06292',
  coverTo: '#FFF59D',
  source: 'Pollyanna (Eleanor H. Porter, 1913), public domain (Porter d. 1920)',
  chapters: [
    {
      title: 'Chapter 1 · The Arrival',
      art: 'pollyanna-arrival',
      artPrompt: 'a small girl with a worn straw hat and one little suitcase standing at the end of a dusty lane before a tall prim white house with stiff flowerbeds, an elderly woman in black standing on the porch, gardens and green hills beyond, bright clear morning light',
      blocks: [
        {
          kind: 'text',
          text: 'The little girl came on the train with one small suitcase and a big smile. Her name was Pollyanna Whittier, she was eleven, and she had travelled a very long way to live with her aunt — a lady she had never met.',
        },
        {
          kind: 'image',
          art: 'pollyanna-arrival',
          text: 'Pollyanna at the end of the lane, looking up at Aunt Polly\'s big white house.',
        },
        {
          kind: 'text',
          text: 'Aunt Polly was tall and stiff and very correct. She had taken Pollyanna because it was right, not because she wanted a child. "The attic room will do for her," said Aunt Polly — a room with no pictures and no carpets, high under the roof.',
        },
        {
          kind: 'note',
          text: 'New word: attic — the room just under the roof of a house. Pollyanna finds the attic has a beautiful view, and that is all she sees at first. Looking for the good part is her favourite thing to do.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'But Pollyanna climbed the stairs as if they led to a castle. "Oh, it has a window, and the window has a VIEW!" she cried. She could see the gardens and the hills and the whole sky. "Thank you, Aunt Polly," she said, glowing. Aunt Polly had never in her life been thanked for an attic.',
        },
        {
          kind: 'text',
          text: 'That night Nancy the maid shook her head over the stiff, silent house. But from under the roof came a sound nobody had heard there for years — a little girl, singing.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Glad Game',
      art: 'pollyanna-crutches',
      artPrompt: 'a small girl sitting cross-legged on a farmhouse kitchen floor telling a story to a kind maid in an apron, a pair of tiny old-fashioned crutches propped against the wall beside a missionary barrel, morning sunlight through a pantry window, cosy warm tones',
      blocks: [
        {
          kind: 'text',
          text: '"What is the Glad Game?" Nancy asked one morning. "Oh, it\'s easy!" said Pollyanna. "Father taught it to me. You find something in everything to be glad about." Nancy wanted to know how anyone could play it about, say, being sent to the attic.',
        },
        {
          kind: 'image',
          art: 'pollyanna-crutches',
          text: 'The story of the missionary barrel and the crutches, told on the kitchen floor.',
        },
        {
          kind: 'text',
          text: '"Well," said Pollyanna, "once I wanted a doll more than anything. A barrel of clothes for the poor came, and inside there were no dolls at all — just ladies\' things, and a pair of little crutches at the bottom. I was disappointed. Then Father said: why, be glad! You don\'t NEED those crutches!"',
        },
        {
          kind: 'note',
          text: 'The Glad Game is not pretending. It is looking twice at a thing until you find the good part hiding in it. Try it: what is the glad side of a rainy day?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'So the game began, and it never really stopped. Dinner was bread and milk again — "Glad there IS dinner!" said Pollyanna. She had to skip her Saturday picnic — "Glad it rained yesterday, or it would have rained today!" The house filled, slowly, with the sound of her bright little voice.',
        },
        {
          kind: 'text',
          text: 'Even Aunt Polly was caught. Pollyanna told her, radiantly, how glad she was that her hair was dark, because it reminded her of Aunt Polly. The tall stiff lady went up the stairs very straight, and once inside her room, she looked in the glass a long time — and her eyes were not quite dry.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Game Spreads',
      art: 'pollyanna-visits',
      artPrompt: 'a small girl with a basket of wildflowers sitting beside an elderly lady propped up in a big four-poster bed, a tray with soup and biscuits on the lap table, lace curtains and a vase of clover on the sill, gentle afternoon light through the window',
      blocks: [
        {
          kind: 'text',
          text: 'Beldingsville had people who needed the game. There was Mr. Pendleton, the cross old gentleman in the big house by the common, who chased children off his lawn. Pollyanna went to see him with a basket of cranberries — twice — until the gate opened.',
        },
        {
          kind: 'image',
          art: 'pollyanna-visits',
          text: 'Pollyanna at Mr. Pendleton\'s gate, basket on her arm, patience in her pocket.',
        },
        {
          kind: 'text',
          text: '"Why do you keep coming back?" he grumbled. "You are lonely," said Pollyanna simply, "and being cross is lonelier still." The old gentleman stared, and then he laughed — a rusty, creaky laugh, like a door that had not opened in years. After that, he sent her jam, and flowers, and once a fine pair of gold-banded spectacles he did not need at all.',
        },
        {
          kind: 'note',
          text: 'New word: common — the open grassy square in the middle of a village. A cross face is often a lonely heart wearing a mask. Pollyanna looks under the mask, kindly.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'And there was Mrs. Snow, the "can\'t-eat" lady, who stayed in bed and could find nothing good in any soup. Pollyanna brought her calf\'s foot jelly and taught her the game right there: "Glad you don\'t have to EAT the cauliflower!" And Mrs. Snow laughed for the first time in months, and ate a whole spoonful.',
        },
        {
          kind: 'text',
          text: 'One by one the town learned to play. The grocer played it, the doctor\'s sister played it, even old Mrs. Tarbell, who had not smiled since her childhood, was seen to smile. And Pollyanna skipped through it all, braids flying, making the town glad one person at a time.',
        },
      ],
    },
    {
      title: 'Chapter 4 · Everyone Comes to Play',
      art: 'pollyanna-getwell',
      artPrompt: 'a bright bedroom full of flowers in jars and baskets, cards and fruit on every surface, a small girl propped on pillows with a bandaged leg smiling brilliantly, an elderly woman in black sitting close by holding her hand with tears on her cheeks, sunshine pouring in the window, warm tender light',
      blocks: [
        {
          kind: 'text',
          text: 'Then came the day of the accident. Pollyanna was crossing the road when a motor car came whizzing round the corner, and after that she lay in bed with her leg very still and wrapped, and the doctor\'s face grave. For a while the girl who was glad about everything could find nothing glad at all.',
        },
        {
          kind: 'image',
          art: 'pollyanna-getwell',
          text: 'The bedroom full of flowers, and everyone Pollyanna ever taught to play.',
        },
        {
          kind: 'text',
          text: 'But the town remembered. Flowers came in by the basket — Mr. Pendleton\'s roses, Mrs. Snow\'s hyacinths, posies from people she had never even met. The house smelled like a garden in June. "Why," Pollyanna whispered, "why, there\'s a whole ROOMFUL to be glad about!"',
        },
        {
          kind: 'note',
          text: 'When someone is hurt or sad, you cannot always fix it — but you can show up. The whole town shows up, and that is the Glad Game played by everybody at once.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'And Aunt Polly sat beside the bed, day after day, holding the small hot hand. All her stiffness had melted away like snow in April. "You have been glad about everything," she said softly, "and you made me glad about YOU. I want you to know it, dear."',
        },
        {
          kind: 'text',
          text: 'The leg got better, slowly and surely, and by autumn Pollyanna was tottering about the garden on two canes — real crutches this time, but she was glad of those too, for they meant walking. And the big white house in Beldingsville was a glad house from attic to porch, for everyone had learned the game that never runs out.',
        },
      ],
    },
    {
      title: 'Chapter 5 · Jimmy Bean Wants a Home',
      art: 'pollyanna-jimmy',
      artPrompt: 'a small girl with sunny braids standing on a chair speaking earnestly to a circle of kind matronly ladies in a church hall with lace curtains, a ragged hopeful boy peeking around the doorway, bright midday light',
      blocks: [
        {
          kind: 'text',
          text: 'One day Pollyanna heard about Jimmy Bean. He was a boy with no home and no mother and no father. He slept in a barn loft and wished and wished for a family of his own.',
        },
        {
          kind: 'image',
          art: 'pollyanna-jimmy',
          text: 'Pollyanna pleads Jimmy\'s case before the Ladies\' Aid.',
        },
        {
          kind: 'text',
          text: 'So Pollyanna went to the Ladies\' Aid. The ladies were meeting to talk about helping poor little boys far, far away. "But there is a boy right HERE," said Pollyanna. "A whole boy, all ready to love! Please, couldn\'t one of you want him?"',
        },
        {
          kind: 'note',
          text: 'It is good to be kind to people far away. It is also good to look right next door. Who near you needs a friend?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The ladies sighed and shook their heads. Taking a boy was a very big thing. Pollyanna\'s eyes filled up. But she did not stop playing the game for Jimmy. She told him stories. She saved him apples.',
        },
        {
          kind: 'text',
          text: 'And then, one day, the old gentleman in the big house by the common said a strange thing: "That boy of yours — send him to me. A house is better with a boy in it." And that is how Jimmy Bean got a home at last.',
        },
      ],
    },
    {
      title: 'Chapter 6 · The Kitten and the Dog',
      art: 'pollyanna-pets',
      artPrompt: 'a small girl with braids kneeling on a porch step with a fluffy wet kitten and a shaggy dog, a stiff elderly lady looking down from the top step with the very smallest smile, a maid in an apron in the doorway, bright morning',
      blocks: [
        {
          kind: 'text',
          text: 'One rainy morning Pollyanna heard a tiny sound in the hedge. It was a kitten — wet, hungry, and alone. Of course she brought it home. A few days later, a shaggy dog followed her all the way from town. Of course he came in too.',
        },
        {
          kind: 'image',
          art: 'pollyanna-pets',
          text: 'Two wet strays, one tall aunt, and the smallest smile in Beldingsville.',
        },
        {
          kind: 'text',
          text: 'Aunt Polly drew herself up very tall. "We do not keep animals in this house," she said. Pollyanna thought hard. Then she played the game. "Glad the kitten is so soft, and the dog is so glad — I mean, so happy!"',
        },
        {
          kind: 'note',
          text: 'Making room for one small creature is good practice. Hearts are like that: they grow bigger every time you make room.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Aunt Polly looked at the little wet kitten. She looked a long time. "They may sleep in the kitchen," she said at last, very stiffly. Nancy the maid grinned all day.',
        },
        {
          kind: 'text',
          text: 'That night the dog slept by the stove and the kitten slept on the doormat, and the big still house felt a little warmer than before.',
        },
      ],
    },
    {
      title: 'Chapter 7 · Mr. Pendleton\'s Secret',
      art: 'pollyanna-portrait',
      artPrompt: 'a lonely elderly gentleman in a shadowed library holding an old framed portrait of a gentle smiling young lady, a small girl looking up at it, one shaft of afternoon light across the bookshelves, quiet wistful mood',
      blocks: [
        {
          kind: 'text',
          text: 'Mr. Pendleton, the old gentleman who was cross no more, had a secret. One day he said, "Pollyanna, come and live with ME. Be my little girl. I am rich, and you shall have lovely things."',
        },
        {
          kind: 'image',
          art: 'pollyanna-portrait',
          text: 'The portrait in the library, and a secret a long time old.',
        },
        {
          kind: 'text',
          text: 'Pollyanna loved him. But she loved Aunt Polly best of anybody, and a heart cannot be in two houses. "I can\'t," she said softly. "Aunt Polly needs me. And I need her."',
        },
        {
          kind: 'text',
          text: 'So the old gentleman told his secret at last. Long, long ago, he had loved a young lady. But she married another man, a missionary, and went far away. The young lady in the portrait was Pollyanna\'s own mother.',
        },
        {
          kind: 'note',
          text: 'A cross face is often a sad story wearing a mask. Pollyanna looked under the mask, and found a lonely heart that had waited a long time for kindness.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'After that, Pollyanna went to see him almost every day. She brought him flowers and glad words, and he began to laugh the way lonely people do when their door finally opens.',
        },
      ],
    },
    {
      title: 'Chapter 8 · A Glad House at Last',
      art: 'pollyanna-chilton',
      artPrompt: 'a small girl with braids throwing rose petals on a garden path before a tall lady in white and a kind grey-eyed doctor, a maid in an apron and neighbors smiling on the lawn of a big white house, golden autumn light',
      blocks: [
        {
          kind: 'text',
          text: 'Pollyanna learned something new that summer. Long ago, Aunt Polly had a dear friend, Dr. Chilton. They had a quarrel, many years back, and had not spoken since. Proud people can stay cross a very long time.',
        },
        {
          kind: 'image',
          art: 'pollyanna-chilton',
          text: 'The garden wedding, where the whole town came to play.',
        },
        {
          kind: 'text',
          text: 'But when Pollyanna was hurt, pride suddenly felt very small. Aunt Polly put it down like a heavy stone, and sent for Dr. Chilton. He came. He helped make Pollyanna well. And he and Aunt Polly looked at each other the way people do when the quarrel is over at last.',
        },
        {
          kind: 'note',
          text: 'Pride is heavy. Putting it down is hard — and it lets the love come back in. Is there a sorry you have been carrying?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'That autumn, before the snow flew, Aunt Polly and Dr. Chilton were married in the garden. Pollyanna wore a white dress and carried flowers, and the whole town came.',
        },
        {
          kind: 'text',
          text: 'It was the gladdest game of all, the one where everybody wins.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'Pollyanna',
    author: 'Eleanor H. Porter',
    authorDeathYear: 1920,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Retold for children; plot follows the public-domain original. Published 1913; US public domain.',
  },
}
