import type { PackBook } from '../types'

/**
 * The Patchwork Girl of Oz — L. Frank Baum (1856–1919), first published 1913.
 * Retold in five chapters in simple English for readers aged 6-8: a clumsy
 * spell turns two people to marble, and small Ojo must gather four curious
 * ingredients to cure them — helped by a patchwork girl and a glass cat.
 * Source: public domain text (published 1913, US pre-1929; Baum d. 1919).
 */
export const ozPatchwork: PackBook = {
  id: 'oz-patchwork',
  title: 'The Patchwork Girl of Oz',
  author: 'L. Frank Baum',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'A spilled bottle turns Uncle Nunkie to marble, and only four strange ingredients can cure him. So Ojo sets out with a giggling patchwork girl and a see-through glass cat — and finds that being called Unlucky does not have to last.',
  coverArt: 'patchwork-girl',
  coverArtPrompt: 'a lively girl made of colourful patchwork cloth with a mismatched button eye and wild yarn hair, caught mid-dance on a forest path, one arm flung up, patches of red yellow purple and green cloth catching the light, a small boy and a glass cat watching with delight, dappled woodland sunbeams, exuberant storybook illustration',
  coverFrom: '#C2185B',
  coverTo: '#FFCCBC',
  source: 'The Patchwork Girl of Oz (L. Frank Baum, 1913), public domain (Baum d. 1919)',
  chapters: [
    {
      title: 'Chapter 1 · The Crooked Magician',
      art: 'patchwork-studio',
      artPrompt: 'a cluttered stone magician\'s workshop with shelves of bottles, a crooked little magician stirring a copper kettle, a lifeless patchwork girl leaning against the wall waiting for magic, a small boy and an old man watching from the doorway, sparks and green vapour over the kettle, moody lamplight with one bright window, magical storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'Ojo the Poor lived with Uncle Nunkie in a small house in the woods. They had little, but they had each other. One day they visited Dr. Pipt, the Crooked Magician, who makes magic very, very slowly.',
        },
        {
          kind: 'text',
          text: 'On his shelf stood two bottles: the Powder of Life, which wakes things up, and the Liquid of Petrifaction, which turns things to stone.',
        },
        {
          kind: 'image',
          art: 'patchwork-studio',
          text: 'A slip of the elbow — and the bottle falls.',
        },
        {
          kind: 'text',
          text: 'Just as the Powder of Life was finished, Ojo stumbled. The bottle of Liquid of Petrifaction tipped, splashed — and Uncle Nunkie turned to grey marble where he stood.',
        },
        {
          kind: 'note',
          text: 'Talk about it: Ojo did not mean it. Accidents happen to everyone. What helps most after an accident — shouting, or a plan?',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 2 · Scraps and Bungle',
      art: 'patchwork-scraps',
      artPrompt: 'a patchwork girl in many-coloured cloth leaping joyfully off a workbench, yarn hair flying, a transparent glass cat with a visible pink heart and rolling eyes beside her, the magician\'s wife frozen as a marble statue in the background, papers scattering, bright morning light through the workshop window, lively storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'There was just enough Powder of Life for one more thing. The magician\'s wife meant it for her new patchwork servant — but when the powder touched her, the Patchwork Girl sat up and began to dance.',
        },
        {
          kind: 'image',
          art: 'patchwork-scraps',
          text: 'Scraps wakes up ready to dance.',
        },
        {
          kind: 'text',
          text: '"Call me Scraps," she cried. "My brain is full of pins and needles, and I feel wonderful!" With her came Bungle the Glass Cat, who is see-through, with pink brains you can watch working.',
        },
        {
          kind: 'note',
          text: 'New word: patchwork — cloth made of many small pieces sewn together. Every piece is different, and that is what makes it beautiful.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The magician wrote the cure on a paper: a six-leaved clover, three hairs from a Woozy\'s tail, water from a dark well, and the left wing of a yellow butterfly. Ojo folded the paper, said goodbye to the marble statue, and set off with Scraps and Bungle.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Woozy and the Dark Well',
      art: 'patchwork-woozy',
      artPrompt: 'a cube-shaped blue-green beast with kind square eyes standing calmly in a forest clearing, a patchwork girl carefully trying to pluck three hairs from its square tail while a glass cat watches from a stump, a small boy holding the cure list, mossy trees and honeybees, gentle green forest light, friendly storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'In a deep forest they met the Woozy, a square blue-green beast who guards honeybees and speaks very politely. "Three hairs from my tail?" he said. "You may try." They pulled, and pulled — but not one hair came loose.',
        },
        {
          kind: 'image',
          art: 'patchwork-woozy',
          text: 'The Woozy agrees to come along.',
        },
        {
          kind: 'text',
          text: '"Then I had better come with you," said the Woozy, and he did. Next they found the dark well, deep inside a mountain. Scraps was lowered down on a rope, and brought up a flask of water so dark it looked like night.',
        },
        {
          kind: 'note',
          text: 'Two things found, two to go. Count them together on your fingers: clover, hairs, water, wing.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Ojo ticked two things off his list. "Halfway," he said, and his heart felt lighter than it had since the accident. Even Bungle the Glass Cat was pleased, and Bungle was rarely pleased about anything.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Yellow Butterfly',
      art: 'patchwork-butterfly',
      artPrompt: 'a single golden butterfly resting on a thistle above a meadow path, a small boy reaching out one careful hand and stopping, a shining tin man stepping between him and the butterfly with one raised finger, a patchwork girl and a glass cat behind, warm late-afternoon meadow light with the butterfly glowing like a small sun, tender storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'In the Winkie Country they found the last yellow butterflies, glowing like little golden lamps. Ojo crept close, hand out — and stopped. "Please," said a voice like a bell. It was the Tin Woodman, who protects every butterfly in Oz.',
        },
        {
          kind: 'image',
          art: 'patchwork-butterfly',
          text: 'Ojo\'s hand stops just short of the golden wing.',
        },
        {
          kind: 'text',
          text: '"The wing of a butterfly cannot be taken," said the Tin Woodman gently. "Not even for a cure." Ojo\'s eyes stung. He had come so far, and now the list was broken.',
        },
        {
          kind: 'note',
          text: 'Talk about it: Ojo could not take the wing, even for his uncle. Some rules protect small living things. Which small things would you protect?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"Come with me to the Emerald City," said the Tin Woodman. "The Ruler of Oz will know what to do." So Ojo walked on, holding his folded paper, and hoping very hard.',
        },
      ],
    },
    {
      title: 'Chapter 5 · Ojo the Lucky',
      art: 'patchwork-ozma',
      artPrompt: 'a warm emerald throne room where a fairy princess in green smiles kindly at a small boy holding his folded cure list, the marble uncle and the magician\'s wife standing freshly alive beside their own pedestals, a patchwork girl mid-cartwheel, a glass cat and a square blue beast watching, joyful golden light, heartwarming storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'In the Emerald City, Ozma had watched the whole journey in her Magic Picture. "You are not in trouble," she told Ojo. "You are early. I have already arranged the rest."',
        },
        {
          kind: 'image',
          art: 'patchwork-ozma',
          text: 'Two marble statues wake up in the throne room.',
        },
        {
          kind: 'text',
          text: 'Dr. Pipt was brought before Ozma, and his powders were taken away, for magic needs a permit in Oz. Then Ozma sprinkled the last of the Powder of Life — and Uncle Nunkie stepped off his pedestal, alive and blinking.',
        },
        {
          kind: 'note',
          text: 'New word: permit — official permission to do something special. Even magicians in Oz must follow the rules.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"No one is Unlucky here," said Ozma, and Ojo was Ojo the Lucky from that day on. Scraps stayed in the Emerald City, dancing whenever she liked. And nobody ever told her she was made of scraps — only that she was made of joy.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Patchwork Girl of Oz',
    author: 'L. Frank Baum',
    authorDeathYear: 1919,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Published 1913; US public domain (pre-1929). Retold for children aged 6-8; plot follows the public-domain original.',
  },
}
