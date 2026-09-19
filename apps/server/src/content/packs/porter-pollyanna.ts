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
