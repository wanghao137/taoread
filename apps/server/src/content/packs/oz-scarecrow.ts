import type { PackBook } from '../types'

/**
 * The Scarecrow of Oz (L. Frank Baum, 1915) — five chapters retold in simple
 * English for readers aged 6–8. Public domain in the US (published before 1929)
 * and worldwide (Baum died in 1919). Plot and characters (Trot, Cap'n Bill,
 * the Ork, Princess Gloria, Pon, King Krewl, Blinkie the witch, the Scarecrow)
 * follow the original book; only the wording is shortened and simplified.
 */
export const ozScarecrow: PackBook = {
  id: 'oz-scarecrow',
  title: 'The Scarecrow of Oz',
  author: 'L. Frank Baum',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'A whirlpool sweeps a little girl and an old sailor under the sea. With a curious bird called the Ork, they find their way into Jinxland, where a witch has frozen a princess\'s heart. The Scarecrow of Oz comes over the gulf to set things right.',
  coverArt: 'scarecrow-boat',
  coverArtPrompt: 'a kindly scarecrow in a patched blue coat and floppy hat sailing in a small wooden rowboat across a bright green sea with a girl in a plaid dress and a bearded old sailor, a queer bird with a propeller tail circling above, soft morning light, warm storybook illustration',
  coverFrom: '#2E7D32',
  coverTo: '#B2DFDB',
  source: 'The Scarecrow of Oz (L. Frank Baum, 1915), public domain (Baum d. 1919)',
  chapters: [
    {
      title: 'Chapter 1 · The Whirlpool',
      art: 'scarecrow-whirlpool',
      artPrompt: 'a little girl in a plaid dress and an old bearded sailor in a yellow oilskin coat rowing a tiny boat on a bright sea, a great spiral whirlpool rising ahead of them, white foam and swirling waves, golden afternoon light, gentle storybook style',
      blocks: [
        { kind: 'text', text: 'Trot was a little girl who loved the sea. Her best friend was Cap\'n Bill, an old sailor with one wooden leg. One calm day they rowed out to watch the waves.' },
        { kind: 'text', text: 'Then a strange whirlpool began to turn. It spun faster and faster, and pulled their little boat right in. Down, down they went — and slid along a dark tunnel under the sea.' },
        { kind: 'image', art: 'scarecrow-cave', text: 'The little boat drifts into a hidden cave under the sea.' },
        { kind: 'text', text: 'The boat popped out into a big quiet cave. The walls sparkled like jewels. "Well, I never," said Cap\'n Bill. "How do we get out of here?"' },
        { kind: 'note', text: 'Ask your child: if a whirlpool carried you somewhere new, what would you look for first? Trot looks around calmly instead of crying — that is a brave thing to do.', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 2 · The Ork',
      art: 'scarecrow-ork',
      artPrompt: 'a strange friendly bird with a round body, small wings and a spinning propeller tail hovering inside a glittering cave, a girl in a plaid dress and an old sailor looking up in wonder, soft glowing light on the cave walls, whimsical storybook art',
      blocks: [
        { kind: 'text', text: 'Soon they heard a whirring sound. Into the cave flew the strangest bird they had ever seen. He had a round body, small wings, and a tail that spun like a fan.' },
        { kind: 'text', text: '"I am an Ork," said the bird, "and I am lost too. Let us be friends and find the way out together." They climbed onto his back, and he flew up a long stone chimney.' },
        { kind: 'image', art: 'scarecrow-chimney', text: 'The Ork carries Trot and Cap\'n Bill up the stone chimney.' },
        { kind: 'text', text: 'At the top they found daylight again. Before them lay a deep gulf, so deep that no bottom could be seen.' },
        { kind: 'note', text: 'New word: gulf — a very deep, wide crack in the land, too wide to jump. The Ork is small, but he can fly where nobody can walk.', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 3 · The Land of Jinxland',
      art: 'scarecrow-jinxland',
      artPrompt: 'a green sunny valley of little houses and cornfields beyond a dark bottomless gulf, a girl in a plaid dress and an old sailor riding on the back of a round bird with a spinning tail, warm afternoon light, cheerful storybook illustration',
      blocks: [
        { kind: 'text', text: 'The Ork flew them across the gulf, one by one. On the other side lay a pretty green country called Jinxland. Fields of corn waved, and little houses sat under the trees.' },
        { kind: 'text', text: 'But Jinxland was not a happy land. King Krewl was a cruel king, and a witch named Blinkie did his wicked work for him.' },
        { kind: 'image', art: 'scarecrow-garden', text: 'Trot and Cap\'n Bill meet Pon in his quiet garden.' },
        { kind: 'text', text: 'They met a gentle young gardener called Pon. He told them about Princess Gloria, the loveliest lady in the land, whom he had loved since they were children.' },
        { kind: 'note', text: 'Ask your child: why do you think Pon looks sad in his beautiful garden? Sometimes people carry a worry with them wherever they go.', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 4 · The Frozen Heart',
      art: 'scarecrow-frozenheart',
      artPrompt: 'a beautiful princess with pale golden hair standing very still in a palace garden, frost patterns sparkling on the flowers around her, a boy gardener and a small girl watching sadly, cold blue light melting into a ray of warm sun, gentle fairytale art',
      blocks: [
        { kind: 'text', text: 'Princess Gloria was kind and clever. But she looked as cold as winter. "My heart is frozen," she said quietly. "I cannot love anyone at all."' },
        { kind: 'text', text: 'Trot was angry when she heard why. Blinkie the witch had put a spell on Gloria. King Krewl wanted the princess to marry someone else, so he told Blinkie to freeze her heart.' },
        { kind: 'image', art: 'scarecrow-witch', text: 'Blinkie the witch hides in her dark hut on the hill.' },
        { kind: 'text', text: 'That night Trot made a plan. "Someone must help Gloria," she said. "Someone brave, and kind, and not afraid of witches." Just then a tall figure came walking over the gulf on a rope bridge.' },
        { kind: 'note', text: 'A frozen heart is not a real ice heart — it is what we say when a person is made unable to feel love. Who do you think is coming to help?', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 5 · The Scarecrow Comes to Jinxland',
      art: 'scarecrow-arrival',
      artPrompt: 'a tall kindly scarecrow in a patched blue coat and wide-brimmed hat arriving in a sunny valley, a girl in plaid and an old sailor running to greet him, a small witch hut on a green hill behind, bright cheerful light, warm storybook illustration',
      blocks: [
        { kind: 'text', text: 'It was the Scarecrow of Oz himself, the old friend of the Emerald City. "I heard there was trouble in Jinxland," he said, "so here I am." Blinkie the witch was so angry that she shrank him small as a toy.' },
        { kind: 'image', art: 'scarecrow-shrunk', text: 'The Scarecrow, shrunk small, still stands tall inside.' },
        { kind: 'text', text: 'But Trot and Cap\'n Bill caught Blinkie and would not let her go until she gave back the Scarecrow\'s size. She also had to melt the spell on Gloria\'s heart.' },
        { kind: 'text', text: 'Then the Scarecrow sprinkled the king with water from the Forbidden Fountain. The water made Krewl forget he had ever been a king. The people chose Pon to rule instead, and Gloria loved him once more.' },
        { kind: 'text', text: '"Now come along," said the Scarecrow. He led Trot and Cap\'n Bill over the gulf to the Emerald City, where Ozma welcomed them with open arms. Jinxland was happy at last.' },
        { kind: 'note', text: 'Ask your child: what gave the Scarecrow his real power — magic, or kindness and good friends? Talk about a time when a kind friend helped you.', art: 'lamp-hint' },
      ],
    },
  ],
  rights: {
    workTitle: 'The Scarecrow of Oz',
    author: 'L. Frank Baum',
    authorDeathYear: 1919,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Retold for children; plot follows the public-domain original. Published 1915; US public domain.',
  },
}
