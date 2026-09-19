import type { PackBook } from '../types'

/**
 * Glinda of Oz (L. Frank Baum, 1920) — five chapters retold in simple
 * English for readers aged 6–8. Public domain in the US (published before
 * 1929) and worldwide (Baum died in 1919). Plot and characters (Ozma,
 * Dorothy, Glinda the Good, the Su-dic of the Flatheads, Coo-ee-oh the
 * Skeezer queen, Lady Aurex, Ervic, the three Adepts) follow the original
 * book; only the wording is shortened and simplified.
 */
export const ozGlinda: PackBook = {
  id: 'oz-glinda',
  title: 'Glinda of Oz',
  author: 'L. Frank Baum',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'Two little peoples quarrel on the edge of Oz: the Flatheads, who keep their brains in cans, and the Skeezers, who live under a glass dome in a lake. Ozma and Dorothy set out to make peace — and Glinda must come to the rescue.',
  coverArt: 'glinda-tower',
  coverArtPrompt: 'a gracious good sorceress in a shimmering rose-pink gown standing on a white marble tower balcony overlooking a round lake with a glass-domed island and a distant mountain, a small girl in a blue dress beside her, sunset light in soft pink and gold, warm grand storybook illustration',
  coverFrom: '#AD1457',
  coverTo: '#F8BBD0',
  source: 'Glinda of Oz (L. Frank Baum, 1920), public domain (Baum d. 1919)',
  chapters: [
    {
      title: 'Chapter 1 · News of War',
      art: 'glinda-news',
      artPrompt: 'a magical book of records lying open on a marble table glowing with soft light, a kind fairy princess and a girl in a blue checked dress reading it together by a tall window, morning sunshine, gentle concerned storybook scene',
      blocks: [
        { kind: 'text', text: 'In her magic book, Glinda the Good read troubling news. Two small peoples of Oz were getting ready for war.' },
        { kind: 'text', text: 'On a mountain lived the Flatheads. They were queer folk who carried their brains in tin cans, strapped to their heads. Their ruler was called the Su-dic.' },
        { kind: 'text', text: 'In a lake lived the Skeezers, inside a great glass dome that could sink under the water. Their queen was Coo-ee-oh, who was as vain as a peacock.' },
        { kind: 'image', art: 'glinda-book', text: 'Glinda reads of trouble in her magic book.' },
        { kind: 'text', text: '"Someone must stop this quarrel," said Princess Ozma. "I shall go myself, and Dorothy shall come with me." So the two friends set out for the far corner of Oz.' },
        { kind: 'note', text: 'Ask your child: the two peoples are very different — cans and domes, mountain and lake. Does being different make people enemies? Talk about what does.', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 2 · The Glass Dome',
      art: 'glinda-dome',
      artPrompt: 'a shining glass dome rising from a round blue lake with steps leading down inside to a little city of curved streets, a vain queen in a green gown on the shore, a fairy princess and a girl arriving, bright clear daylight, sparkling storybook illustration',
      blocks: [
        { kind: 'text', text: 'Ozma and Dorothy came to the lake, where the glass island glittered like a jewel. Queen Coo-ee-oh was not glad to see them. She wanted no one telling her what to do.' },
        { kind: 'text', text: '"Let the war begin with me!" said the vain queen. She spoke a magic word, and the glass dome sank slowly under the water, with Ozma and Dorothy inside.' },
        { kind: 'image', art: 'glinda-sink', text: 'The glass dome sinks under the blue lake water.' },
        { kind: 'text', text: 'Inside, the Skeezers went about their day under the glass, watching fish swim past the walls. It was beautiful — but Ozma was a prisoner, and she did not like that at all.' },
        { kind: 'note', text: 'New word: vain — thinking too much about your own looks. Coo-ee-oh loves mirrors and praise. Ask your child what she might learn in this story.', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 3 · The Diamond Swan',
      art: 'glinda-swan',
      artPrompt: 'a great white swan with diamond-bright feathers flapping away over a lake toward distant hills, a surprised queen mid-transformation with one hand still raised in a green gown on the shore, moonlight on the water, magical silvery storybook scene',
      blocks: [
        { kind: 'text', text: 'Queen Coo-ee-oh sailed out to fight the Flatheads herself. But the Su-dic had a secret. Long ago he had stolen magic from three wise Adepts, and he knew a trick against her.' },
        { kind: 'text', text: 'He spoke the spell — and the proud queen became a beautiful Diamond Swan! She forgot all her magic and all her meanness. She flew over the lake, singing to herself.' },
        { kind: 'image', art: 'glinda-swanshore', text: 'The Diamond Swan flies away over the quiet water.' },
        { kind: 'text', text: 'Now the dome could not be raised, for only Coo-ee-oh had known the word. Ozma, Dorothy and all the Skeezers stayed under the glass, and the Su-dic hammered on the lake\'s edge.' },
        { kind: 'note', text: 'Ask your child: Coo-ee-oh thought being grand and strong was everything. Now she is a swan who has forgotten it all. What do you think she feels as she flies?', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 4 · Glinda to the Rescue',
      art: 'glinda-rescue',
      artPrompt: 'a gracious sorceress in rose-pink standing at the shore of a round lake with raised hands and glowing light, a girl in a blue dress and friends watching as a huge glass dome rises from the water, evening sky in rose and gold, hopeful grand storybook illustration',
      blocks: [
        { kind: 'text', text: 'Word flew across Oz, and Glinda came at last with all her friends. Good magic is patient, but it is also strong. Glinda raised the great dome out of the water and set Ozma and Dorothy free.' },
        { kind: 'text', text: 'The Su-dic\'s stolen magic was taken away from him. Without it he was only a quarrelsome old man, and the Flatheads chose kinder ways of living.' },
        { kind: 'text', text: 'Then came the gentlest rescue of all. In the palace garden, a kind young Skeezer named Ervic had been caring for three little golden fish in a tub of clear water.' },
        { kind: 'image', art: 'glinda-fish', text: 'Ervic carries the tub of golden fish to the shore.' },
        { kind: 'text', text: 'The three fish were really the three wise Adepts, changed long ago by the vain queen. Glinda spoke her charm — and three wise women stood on the shore once more.' },
        { kind: 'note', text: 'Ask your child: Ervic is not a wizard at all — he is just kind and steady. Why is that exactly what the three fish needed? Talk about small kindnesses that matter.', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 5 · Peace on the Lake',
      art: 'glinda-peace',
      artPrompt: 'a happy lakeside gathering at golden hour, two little peoples — mountain folk with bright tin cans and lake folk in soft green — sharing bread at long tables on the shore, a fairy princess and a sorceress smiling together, a white swan gliding past, warm peaceful light, joyful storybook scene',
      blocks: [
        { kind: 'text', text: 'The wise Adepts became teachers and guides to the Flatheads. The Su-dic\'s extra brain-cans were given back, so every Flathead had exactly the brains that were his own.' },
        { kind: 'text', text: 'The kind lady Aurex ruled the Skeezers now, and their glass island stayed safely above the water. The Diamond Swan glided on the lake all day, singing her swan song in the sunshine.' },
        { kind: 'image', art: 'glinda-homecoming', text: 'Ozma and Dorothy wave goodbye from the lakeshore.' },
        { kind: 'text', text: '"Two peoples who quarreled are now friends," said Ozma, "because someone listened, and someone helped." Then she and Dorothy flew home across the green land of Oz.' },
        { kind: 'text', text: 'And Glinda the Good went back to her tower, where her magic book filled up again — this time with peaceful, happy pages.' },
        { kind: 'note', text: 'Ask your child: how did peace really happen here — with magic, or with kindness, listening and fair shares? Can you find all three in the story?', art: 'lamp-hint' },
      ],
    },
  ],
  rights: {
    workTitle: 'Glinda of Oz',
    author: 'L. Frank Baum',
    authorDeathYear: 1919,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Retold for children; plot follows the public-domain original. Published 1920; US public domain.',
  },
}
