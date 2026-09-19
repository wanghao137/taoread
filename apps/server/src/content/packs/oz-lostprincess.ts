import type { PackBook } from '../types'

/**
 * The Lost Princess of Oz (L. Frank Baum, 1917) — five chapters retold in
 * simple English for readers aged 6–8. Public domain in the US (published
 * before 1929) and worldwide (Baum died in 1919). Plot and characters
 * (Ozma, Dorothy, the Wizard, the Cowardly Lion, Cayke the Cookie Cook, the
 * Frogman, Ugu the Shoemaker) follow the original book; only the wording is
 * shortened and simplified.
 */
export const ozLostPrincess: PackBook = {
  id: 'oz-lostprincess',
  title: 'The Lost Princess of Oz',
  author: 'L. Frank Baum',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'One morning Ozma has vanished, and so have the magic picture, the book of records and the Wizard\'s bag of tools. Dorothy, the Wizard and a cookie cook with a golden dishpan set out to search all the wide land of Oz.',
  coverArt: 'lostozma-search',
  coverArtPrompt: 'a girl in a blue checked dress riding a wooden sawhorse through green rolling hills beside a kindly old wizard, a small band of cheerful friends searching the countryside, a little frog gentleman and a woman carrying a shining gold dishpan, bright cheerful daylight, warm storybook illustration',
  coverFrom: '#6A1B9A',
  coverTo: '#B39DDB',
  source: 'The Lost Princess of Oz (L. Frank Baum, 1917), public domain (Baum d. 1919)',
  chapters: [
    {
      title: 'Chapter 1 · Ozma Is Gone',
      art: 'lostozma-palace',
      artPrompt: 'a grand emerald palace bedroom at sunrise with a beautiful empty bed dressed in silks, a girl in a blue checked dress and a little yellow hen looking around anxiously, long soft morning light through tall windows, gentle storybook scene',
      blocks: [
        { kind: 'text', text: 'One bright morning, Dorothy came to wake her friend Ozma. But the royal bed was empty. Princess Ozma of Oz was nowhere in the palace.' },
        { kind: 'text', text: 'That was not all. The Magic Picture, which shows anything you ask, had vanished. The Great Book of Records was gone. Even the Wizard\'s black bag of magic tools had disappeared.' },
        { kind: 'image', art: 'lostozma-picture', text: 'The Magic Picture hangs empty on the palace wall.' },
        { kind: 'text', text: '"Nobody could steal from the Emerald City," said the Wizard, "unless some very strange magic was used. We must find our Princess." Everyone in Oz loved Ozma, and the search began at once.' },
        { kind: 'note', text: 'Ask your child: if your favorite toy vanished overnight, what would you check first? The friends look calmly for clues instead of worrying. That is the best way to solve a mystery.', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 2 · The Cookie Cook\'s Dishpan',
      art: 'lostozma-dishpan',
      artPrompt: 'a small kind-faced frog gentleman in a fine coat standing beside a motherly woman holding a beautiful gold dishpan set with diamonds, a grassy hilltop with little hobgoblin houses behind, bright sunny sky, warm friendly storybook illustration',
      blocks: [
        { kind: 'text', text: 'From a little country of hobgoblins came two strangers. Cayke the Cookie Cook and the great Frogman, who was very proud and very grand.' },
        { kind: 'text', text: '"Our gold dishpan has been stolen," said Cayke, "and it is magic. Whoever sits in it can fly anywhere, and see anything in the world." Without it, she could not bake her cookies in peace.' },
        { kind: 'image', art: 'lostozma-frogman', text: 'The Frogman and Cayke tell their story on the hilltop.' },
        { kind: 'text', text: 'The Wizard nodded. "Magic things have been stolen all over Oz. Perhaps one thief took them all." So the two search parties joined together and set out across the land.' },
        { kind: 'note', text: 'New word: thief — a person who takes things that are not theirs. The Frogman talks very grandly, but he has a kind heart. People can be both funny and helpful at once.', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 3 · Following the Clues',
      art: 'lostozma-journey',
      artPrompt: 'a company of travelers walking through a strange fairy country of tall purple trees and little stone bridges, a girl with a yellow hen on her shoulder, a wizard, a proud frog gentleman and a cookie cook with a gold dishpan, soft afternoon light, whimsical storybook art',
      blocks: [
        { kind: 'text', text: 'Dorothy rode her wooden Sawhorse, and the Cowardly Lion padded along beside. They asked everyone they met. Had anyone seen a thief with a gold dishpan?' },
        { kind: 'text', text: 'At last a wise old woman told them a secret. In a far country lived Ugu the Shoemaker. He had found a book of magic recipes and wished himself great power.' },
        { kind: 'text', text: '"He grew greedy," she said. "With the dishpan\'s magic he could see everything in Oz. Then he stole, and stole, and stole again."' },
        { kind: 'image', art: 'lostozma-road', text: 'The friends follow the winding road toward the west.' },
        { kind: 'note', text: 'Ask your child: Ugu had magic, but he used it for taking. Why do you think taking other people\'s treasures made him unhappy inside?', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 4 · The Wicker Castle',
      art: 'lostozma-castle',
      artPrompt: 'a strange great castle woven entirely of golden wickerwork on a lonely hill, tall twisted towers against a cloudy sky, a girl in a blue dress and a little wizard standing at the gate, wind moving the grass, dramatic but not frightening storybook scene',
      blocks: [
        { kind: 'text', text: 'They found Ugu\'s home: a huge castle woven of wicker, standing alone on a high hill. Inside sat Ugu the Shoemaker, with all the stolen treasures around him.' },
        { kind: 'text', text: '"Go away," he growled. "The dishpan is mine now, and so is the Magic Picture." But Dorothy stepped forward bravely. "The dishpan belongs to Cayke," she said. "Please give it back."' },
        { kind: 'text', text: 'Ugu waved his hands and muttered his magic. But Dorothy held on tight to the dishpan, and the Wizard said the magic words he knew best.' },
        { kind: 'image', art: 'lostozma-battle', text: 'Dorothy holds the golden dishpan while the Wizard speaks his magic.' },
        { kind: 'note', text: 'Ask your child: Dorothy is small, and Ugu is a magician. What gives Dorothy her courage? Talk about how speaking up for what is fair can feel scary and still be right.', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 5 · The Dove Who Wanted to Be Free',
      art: 'lostozma-dove',
      artPrompt: 'a soft grey dove with gentle eyes perched on a golden wicker railing, a magical gold dishpan glowing on the ground below, a girl in a blue dress watching kindly, morning sunlight breaking through clouds, peaceful hopeful storybook illustration',
      blocks: [
        { kind: 'text', text: 'In the middle of the fight, Ugu tried one spell too many. Whoosh! His own magic turned him into a small grey dove.' },
        { kind: 'text', text: 'The dove sat still for a moment. Then something surprising happened. He liked it! As a dove he did not need to steal anything. He could simply fly, and be free.' },
        { kind: 'image', art: 'lostozma-found', text: 'Behind a curtain, the friends find sleeping Ozma at last.' },
        { kind: 'text', text: 'Best of all, they found Ozma asleep behind one of Ugu\'s secret doors. He had put her there with the dishpan\'s magic. The Great Book, the picture and the black bag went home to the palace too.' },
        { kind: 'text', text: 'Cayke baked cookies for everyone, the Frogman told a long grand story, and the little dove sang outside the window. All was well in the Emerald City again.' },
        { kind: 'note', text: 'Ask your child: the dove gave back nothing — but he stopped wanting to take. What is something that made you happy to share instead of keep?', art: 'lamp-hint' },
      ],
    },
  ],
  rights: {
    workTitle: 'The Lost Princess of Oz',
    author: 'L. Frank Baum',
    authorDeathYear: 1919,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Retold for children; plot follows the public-domain original. Published 1917; US public domain.',
  },
}
