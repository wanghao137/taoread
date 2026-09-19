import type { PackBook } from '../types'

/**
 * The Tin Woodman of Oz (L. Frank Baum, 1918) — five chapters retold in
 * simple English for readers aged 6–8. Public domain in the US (published
 * before 1929) and worldwide (Baum died in 1919). Plot and characters (Woot
 * the Wanderer, the Tin Woodman, the Scarecrow, Captain Fyter the Tin
 * Soldier, Polychrome, Mrs. Yoop, Ku-Klip, Nimmie Amee) follow the original
 * book; only the wording is shortened and simplified.
 */
export const ozTinwoodman: PackBook = {
  id: 'oz-tinwoodman',
  title: 'The Tin Woodman of Oz',
  author: 'L. Frank Baum',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'A wandering boy asks the Tin Woodman a simple question: what became of the girl he once loved? So the Tin Man, the Scarecrow and the boy set off through strange lands to find her — and meet a giantess who loves to change shapes.',
  coverArt: 'tinwood-forest',
  coverArtPrompt: 'a tall tin man shining in the sun walking through a green forest path beside a scarecrow in a patched blue coat and a small traveling boy with a knapsack, tall friendly trees and dappled golden light, cheerful storybook illustration',
  coverFrom: '#455A64',
  coverTo: '#B0BEC5',
  source: 'The Tin Woodman of Oz (L. Frank Baum, 1918), public domain (Baum d. 1919)',
  chapters: [
    {
      title: 'Chapter 1 · The Tin Castle',
      art: 'tinwood-castle',
      artPrompt: 'a cozy castle built of gleaming tin blocks with tin furniture and tin flowers in tin vases, a small boy traveler sitting by a tin fire talking with a tall kind tin man, warm light glinting softly on the metal, gentle storybook interior scene',
      blocks: [
        { kind: 'text', text: 'One day a boy called Woot came walking through Oz. He knocked at a castle that shone like a mirror. It was built of tin, down to the very doorknobs.' },
        { kind: 'text', text: 'The Tin Woodman welcomed him and told his own story. Long ago he was a woodman made of flesh. He loved a Munchkin girl named Nimmie Amee.' },
        { kind: 'text', text: 'But a wicked witch enchanted his axe. Every time he swung it, it chopped off a piece of him! A friendly tinsmith made him new parts, one by one — until he was all tin.' },
        { kind: 'image', art: 'tinwood-axe', text: 'The enchanted axe rests by the tin fire.' },
        { kind: 'note', text: 'New word: tinsmith — someone who makes things out of tin. The Tin Woodman thinks he has no heart, but Woot will soon see how kind he really is.', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 2 · A Question from Woot',
      art: 'tinwood-question',
      artPrompt: 'a small boy traveler looking up curiously at a tall tin man and a scarecrow in a blue coat sitting on a green hillock, tall trees around, soft evening light with long shadows, thoughtful warm storybook scene',
      blocks: [
        { kind: 'text', text: '"Whatever became of Nimmie Amee?" asked Woot. The Tin Woodman had no idea. He had simply never gone back to ask.' },
        { kind: 'text', text: '"Then let us find her," said Woot. The Scarecrow came along too, because he hated to see a friend wonder about anything. Off the three of them went through the Munchkin forest.' },
        { kind: 'image', art: 'tinwood-path', text: 'The three friends walk together under the tall trees.' },
        { kind: 'text', text: 'In the woods they met a surprise: another tin man! He was Captain Fyter, a soldier who had also loved Nimmie Amee — and had also been chopped into tin by an enchanted sword.' },
        { kind: 'text', text: '"Then we are two tin sweethearts," laughed the captain. And all four went on together to look for the girl.' },
        { kind: 'note', text: 'Ask your child: why do you think the Tin Woodman never went back to find Nimmie Amee before? Sometimes people wait a very long time to ask a simple question.', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 3 · Mrs. Yoop the Giantess',
      art: 'tinwood-yoop',
      artPrompt: 'a huge cozy stone castle hall with a very tall woman in a sparkling dress smiling down at tiny visitors, a small boy and his friends looking up, a little golden canary bird on a chair, oversized furniture, warm lamplight, gently funny storybook scene',
      blocks: [
        { kind: 'text', text: 'In a lonely valley stood the castle of Mrs. Yoop, a giantess who loved magic changes best of all. She welcomed the travelers for the night — and locked the doors.' },
        { kind: 'text', text: '"You shall stay as my guests," she said, "in whatever shapes I like." She waved her hand, and Woot the boy became a little green monkey!' },
        { kind: 'image', art: 'tinwood-monkey', text: 'Woot wakes up small and furry and green.' },
        { kind: 'text', text: 'On the windowsill sat a little canary. "I am Polychrome," she chirped softly, "daughter of the Rainbow. She changed me too." The friends helped each other slip away at sunrise.' },
        { kind: 'note', text: 'Ask your child: how would you feel if you woke up with fur and a tail? Woot stays cheerful and keeps going. What helps him stay brave?', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 4 · The Tinsmith\'s Shop',
      art: 'tinwood-tinsmith',
      artPrompt: 'a cluttered tinsmith workshop full of tin arms, tin legs and shining tools, an old tinsmith with round spectacles talking with a tin man, a scarecrow and a small green monkey, sunbeams through a dusty window, warm detailed storybook scene',
      blocks: [
        { kind: 'text', text: 'On the way they stopped at the shop of Ku-Klip, the tinsmith who had made the Tin Woodman\'s tin body long ago. Shelves of spare tin parts glittered everywhere.' },
        { kind: 'text', text: 'Ku-Klip told them a strange thing. Nimmie Amee still lived near the mountain — and she was soon to be married!' },
        { kind: 'text', text: 'The green monkey hopped about the shop asking questions, for Woot had not lost his voice, only his shape. Polychrome the canary sang on his shoulder.' },
        { kind: 'image', art: 'tinwood-shop', text: 'Ku-Klip the tinsmith tells his story among the tin parts.' },
        { kind: 'note', text: 'Ask your child: Woot is still a monkey, but his friends like him just the same. What do we love about friends — their shape, or their heart?', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 5 · Nimmie Amee\'s House',
      art: 'tinwood-wedding',
      artPrompt: 'a tidy little cottage garden with flowering beans and a clothesline, a kind Munchkin woman with a cheerful face welcoming a crowd of strange guests — two tin men, a scarecrow, a small green monkey and a girl in rainbow colors — bright happy afternoon light, warm storybook scene',
      blocks: [
        { kind: 'text', text: 'At last they came to a tidy cottage with a garden full of flowers. Nimmie Amee herself opened the door. She was very surprised to see two tin men and a monkey on her doorstep!' },
        { kind: 'text', text: 'She laughed and made them all welcome. Years ago she had married a quiet good man, and she was happy. The Tin Woodman saw it at once.' },
        { kind: 'text', text: '"Then all is well," he said kindly. "A heart is for making other people happy — and you are happy." Both tin men agreed that her happiness was the best ending of all.' },
        { kind: 'image', art: 'tinwood-goodbye', text: 'The friends say goodbye at Nimmie Amee\'s garden gate.' },
        { kind: 'text', text: 'Back in the Emerald City, the magic of Oz gave Woot his own boy shape again. He waved goodbye to his shining friend and set off once more to see the world.' },
        { kind: 'note', text: 'Ask your child: the Tin Woodman goes home without marrying anyone. Is he sad about it? Talk about how wanting someone to be happy can be its own happy ending.', art: 'lamp-hint' },
      ],
    },
  ],
  rights: {
    workTitle: 'The Tin Woodman of Oz',
    author: 'L. Frank Baum',
    authorDeathYear: 1919,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Retold for children; plot follows the public-domain original. Published 1918; US public domain.',
  },
}
