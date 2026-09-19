import type { PackBook } from '../types'

/**
 * The Little Mermaid — retold for children aged 3-5 in five gentle chapters.
 * Source: Project Gutenberg eBook #27100, "Fairy Tales of Hans Christian
 * Andersen" (1837). Andersen died 1875; public domain in the EU and worldwide
 * under the 70-years-after-death rule (pd-70). Retold in short, easy English;
 * the saddest parts of the original are softened for very young readers.
 */
export const littleMermaid: PackBook = {
  id: 'andersen-mermaid',
  title: 'The Little Mermaid',
  author: 'Hans Christian Andersen',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: 'Down in the deep blue sea lives a little mermaid who dreams of the world above the waves. One day she swims up — and her big adventure begins!',
  coverArt: 'mermaid-sea',
  coverArtPrompt: 'a smiling little mermaid with long golden hair sitting on a rock in the sunshine, a green fish-tail splashing in the blue sea, colourful fish and red coral below, a ship with white sails on the horizon',
  coverFrom: '#00838F',
  coverTo: '#80DEEA',
  source: 'Project Gutenberg eBook #27100, public domain (Andersen d. 1875)',
  chapters: [
    {
      title: 'Chapter 1 · Deep in the Blue Sea',
      art: 'mermaid-garden',
      artPrompt: 'an underwater palace garden full of red coral trees and blue sea-flowers, five little mermaids swimming, sea shells and green seaweed, sunbeams shining down through the water',
      blocks: [
        {
          kind: 'text',
          text: 'Far, far out at sea, the water is as blue as the petals of the loveliest cornflower and as clear as glass. Down there, at the very bottom of the sea, lived the Sea King with his mother and his five daughters.',
        },
        {
          kind: 'image',
          art: 'mermaid-garden',
          text: 'The little mermaids play in their garden of red coral and blue flowers.',
        },
        {
          kind: 'text',
          text: 'Each little princess had her own garden, and each planted it differently. Four of them planted red and blue and orange flowers. But the youngest planted only red flowers — and one red tree that grew tall and soft.',
        },
        {
          kind: 'note',
          text: 'New word: coral — a hard, pretty plant-like rock that grows at the bottom of warm seas.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The youngest princess was the quietest of them all. She was shy, and she loved her red garden and her little marble statue. But most of all she loved to hear her grandmother tell about the world above the waves.',
        },
        {
          kind: 'text',
          text: 'She heard about ships and towns and people, about rain that fell like soft needles, and about pink clouds that sailed across the sky. "When you are fifteen," said her grandmother, "you may swim up and see it all."',
        },
        {
          kind: 'text',
          text: 'Oh, how she wished she were fifteen! Every night she pressed her face against the cold window of the palace, and dreamed of the bright world above.',
        },
      ],
    },
    {
      title: 'Chapter 2 · Up to the World Above',
      art: 'mermaid-surface',
      artPrompt: 'a little mermaid breaking the surface of the water at sunset, pink and gold clouds in the sky, a wooden ship with bright lanterns and a handsome prince on the deck',
      blocks: [
        {
          kind: 'text',
          text: 'At last the day came — the little mermaid was fifteen! Her grandmother put a wreath of white lilies in her hair and kissed her. "Swim up, my child, and see the world."',
        },
        {
          kind: 'image',
          art: 'mermaid-surface',
          text: 'The little mermaid sees a ship with a prince on board.',
        },
        {
          kind: 'text',
          text: 'Up she swam, up and up, until her head rose out of the water. The sun was just going to bed, and the whole sky was pink and gold. She saw a wooden ship with bright lanterns, and on the deck she saw a handsome prince.',
        },
        {
          kind: 'note',
          text: 'New word: deck — the flat floor of a ship, where people walk.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The little mermaid had never seen a person before. She watched the prince all evening as he laughed with his friends, and she thought he was the loveliest thing in the whole world.',
        },
        {
          kind: 'text',
          text: 'When night came she stayed by the ship, singing her sweet sea songs, until she slipped back down to her garden to tell her sisters everything she had seen.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Great Storm',
      art: 'mermaid-storm',
      artPrompt: 'a stormy dark sea with big grey waves and lightning in the sky, a little mermaid holding a drowning boy safely on a piece of broken ship, a yellow beach and a white temple in the distance',
      blocks: [
        {
          kind: 'text',
          text: 'Not many days later, the little mermaid swam up again. This time the sky was black and the wind was wild. A great storm was blowing, and the prince’s ship was in danger.',
        },
        {
          kind: 'text',
          text: 'The waves grew taller and taller. A bolt of lightning split the night. With a terrible crack, the ship broke in two, and the prince was thrown into the dark, cold sea.',
        },
        {
          kind: 'image',
          art: 'mermaid-storm',
          text: 'The little mermaid keeps the prince safe until morning.',
        },
        {
          kind: 'note',
          text: 'New word: lightning — the bright flash of light in the sky during a storm.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The little mermaid was frightened — but she was brave too. She swam to the prince and held his head above the water all night long. "You will not drown while I am here," she whispered.',
        },
        {
          kind: 'text',
          text: 'In the morning the storm was over. She swam to a warm yellow beach beside a white temple, and laid the prince gently in the soft sand, where the morning sun would warm him. Then she hid behind a rock and watched.',
        },
        {
          kind: 'text',
          text: 'Soon a young girl came out of the temple and found the prince. He opened his eyes and smiled at her, thinking she had saved him. The little mermaid was sad, but she was glad too — he was safe.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Sea Witch',
      art: 'mermaid-witch',
      artPrompt: 'a dark undersea cave lit by green glow, an old sea witch with long tangled hair and a cauldron of bubbling blue potion, a little mermaid standing bravely in front of her',
      blocks: [
        {
          kind: 'text',
          text: 'The little mermaid wanted to walk on the land and be with the prince. So she went to see the Sea Witch, who lived in a dark cave at the bottom of the sea.',
        },
        {
          kind: 'image',
          art: 'mermaid-witch',
          text: 'The Sea Witch stirs her bubbling cauldron.',
        },
        {
          kind: 'text',
          text: '"I can give you legs," said the witch, "but you must give me your voice — your sweet singing voice. You will walk on two feet, and you will be the most beautiful girl in the world."',
        },
        {
          kind: 'note',
          text: 'New word: potion — a special drink of magic ingredients, like the witch’s bubbling medicine.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"And one more thing," said the witch. "Promise me you will be kind and true. If you are brave and good, and if you keep a loving heart, then the sea will always be your home, and you will be happy wherever you go."',
        },
        {
          kind: 'text',
          text: 'The little mermaid thought and thought. Then she drank the potion. It tasted like bitter honey, and her tail split into two legs. With that, she swam to the shore and fell asleep on the warm sand.',
        },
        {
          kind: 'text',
          text: 'When she woke up, the prince was standing beside her. "Do not be afraid," he said, and he took her by the hand. From that day she lived in his palace, and danced for him with her kind, bright eyes.',
        },
      ],
    },
    {
      title: 'Chapter 5 · The Sea-Foam Spirit',
      art: 'mermaid-foam',
      artPrompt: 'a gentle spirit made of white sea foam floating above green waves at sunrise, smiling, with sea gulls flying around her, a ship sailing safely below under a golden sky',
      blocks: [
        {
          kind: 'text',
          text: 'The prince was kind to the little mermaid, and she loved him well. But sometimes at night she crept down to the sea, and her sisters swam up to see her, and they sang together the way they used to.',
        },
        {
          kind: 'image',
          art: 'mermaid-foam',
          text: 'The little mermaid becomes a spirit of the sea foam, watching over sailors.',
        },
        {
          kind: 'note',
          text: 'New word: spirit — a gentle, magic being, lighter than air, that can never be hurt.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'One day the Sea Witch’s spell was finished. The little mermaid felt herself grow light — as light as the white foam on the top of a wave. She had kept her promise: she had been brave and kind and true.',
        },
        {
          kind: 'text',
          text: 'She rose up out of the foam, and there she was — a beautiful spirit of the sea! She could fly above the waves on the morning wind, and she could still sing her sweetest songs.',
        },
        {
          kind: 'text',
          text: 'From that day on, the little mermaid watched over the sea and all the ships that sailed on it. When sailors saw the foam dancing in the sun, they knew a kind friend was near, and they were never afraid of the deep blue sea again.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Little Mermaid',
    author: 'Hans Christian Andersen',
    authorDeathYear: 1875,
    jurisdiction: 'EU',
    basis: 'pd-70',
    sourceUrl: 'https://www.gutenberg.org/ebooks/27100',
    note: 'Retold for young children from the 1837 original.',
  },
}
