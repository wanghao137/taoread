import type { PackBook } from '../types'

/**
 * The Animals of Uganda — African Storybook Project, CC-BY.
 * Source: global-asp/asp-source (en/0258_the-animals-of-uganda.md); credits kept in rights ledger.
 * Pages lightly re-flowed for the reader layout; story text unaltered.
 */
export const ccAsbTheAnimalsOfUganda: PackBook = {
  id: "cc-the-animals-of-uganda",
  title: "The Animals of Uganda",
  author: "Wendy Parry",
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: "This is the giraffe. It has a very long neck. It eats leafs from tall trees. What colour is the giraffe?",
  coverArt: "asb008-cover",
  coverArtPrompt: "This is the giraffe. It has a very long neck. It eats leafs . soft warm children's picture-book illustration, friendly characters, gentle pastel colors, clean composition",
  coverFrom: "#A1887F",
  coverTo: "#C5E1A5",
  source: "African Storybook Project (CC-BY): en/0258_the-animals-of-uganda.md, global-asp/asp-source",
  chapters: [
  {
    title: "Pages 1–3",
    art: "asb008-ch1",
    artPrompt: "This is the giraffe. It has a very long neck. It eats leafs from tall trees. What colour is the giraffe? This. soft warm children's picture-book illustration, friendly characters, gentle pastel colors, clean composition",
    blocks: [
      {
        kind: 'text',
        text: "This is the giraffe. It has a very long neck. It eats leafs from tall trees. What colour is the giraffe?"
      },
      {
        kind: 'text',
        text: "This is the elephant. The males have white tusks. They have large ears. Elephants have long trunks that they use to pick leaves off the tall trees. Elephants eat grasses and leaves. What colour is the elephant?"
      },
      {
        kind: 'text',
        text: "This is the crocodile. It lives in the rivers and lakes. It has a long tail. It can open its wide mouth to eat fish and other animals. What colour is the crocodile?"
      },
      {
        kind: 'image',
        art: "asb008-ch1",
        text: "This is the giraffe"
      },
      {
        kind: 'note',
        text: "Before the next page, make up your own ending together!",
        art: "lamp-hint"
      }
    ]
  },
  {
    title: "Pages 4–6",
    art: "asb008-ch2",
    artPrompt: "This is the lion. He has big teeth which he uses to catch his food. The male lions have a mane.Where is. soft warm children's picture-book illustration, friendly characters, gentle pastel colors, clean composition",
    blocks: [
      {
        kind: 'text',
        text: "This is the lion. He has big teeth which he uses to catch his food. The male lions have a mane.Where is the mane on this lion?"
      },
      {
        kind: 'text',
        text: "This is the crested crane. It is the symbol of Uganda. It has long legs and a crown. What colour is the crested crane?"
      },
      {
        kind: 'text',
        text: "This is the water buffalo. It eats grasses and lives near rivers and lakes. What are the things on the top of its head called?"
      },
      {
        kind: 'image',
        art: "asb008-ch2",
        text: "This is the lion"
      },
      {
        kind: 'note',
        text: "What do you think happens next? Guess before you turn the page!",
        art: "lamp-hint"
      }
    ]
  },
  {
    title: "Pages 7–9",
    art: "asb008-ch3",
    artPrompt: "These animals are called zebras. They have black and white strips. What other animals look like a zebra? Here are two different. soft warm children's picture-book illustration, friendly characters, gentle pastel colors, clean composition",
    blocks: [
      {
        kind: 'text',
        text: "These animals are called zebras. They have black and white strips. What other animals look like a zebra?"
      },
      {
        kind: 'text',
        text: "Here are two different animals. Here is a mother warthog with her babies. Warthogs have tusks too. Which animal looks like the warthog? The other animal is the cob. It eats grasses. What colouor is the cob?"
      },
      {
        kind: 'text',
        text: "What are these two animal friends? Where do they live? Which one would you eat? ##"
      },
      {
        kind: 'image',
        art: "asb008-ch3",
        text: "These animals are called zebras"
      },
      {
        kind: 'note',
        text: "Talk about it: which part of the story did you like best?",
        art: "lamp-hint"
      }
    ]
  }
],
  rights: {
    workTitle: "The Animals of Uganda",
    author: "Wendy Parry",
    jurisdiction: 'EU',
    basis: 'cc-by',
    sourceUrl: "https://github.com/global-asp/asp-source/blob/main/en/0258_the-animals-of-uganda.md",
    note: "Text licensed CC-BY via the African Storybook Project; Wendy Parry; illustrator Rob Owen. Story text used unaltered; illustration credit retained though our artwork is newly generated.",
  },
}
