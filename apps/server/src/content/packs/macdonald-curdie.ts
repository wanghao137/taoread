import type { PackBook } from '../types'

/**
 * The Princess and Curdie (George MacDonald, 1883) — five chapters retold
 * for readers aged 9–12. MacDonald died in 1905, so the work is public
 * domain worldwide. Plot and characters (Curdie, his mother and father,
 * the great-great-grandmother in her tower, Lina, Princess Irene, the ailing
 * King, the creatures of the mountain) follow the original novel; the
 * wording is shortened and simplified.
 */
export const curdie: PackBook = {
  id: 'macdonald-curdie',
  title: 'The Princess and Curdie',
  author: 'George MacDonald',
  lang: 'en',
  category: 'tale',
  ageStage: '9-12',
  intro: 'The miner\'s boy Curdie is sent for by the mysterious old princess in her tower. She gives him a strange gift: his hands will feel the hidden beast inside anyone who has grown wicked. With a fierce, faithful creature named Lina, he rides to save a kingdom.',
  coverArt: 'curdie-mine',
  coverArtPrompt: 'a boy of about fourteen in rough miner\'s clothes carrying a lantern at the mouth of a mountain mine at dusk, a great gentle dog-like creature with shaggy grey fur beside him, mountains and pines behind in evening light, warm lantern glow against cool blue shadow, classic storybook illustration',
  coverFrom: '#5D4037',
  coverTo: '#D7CCC8',
  source: 'The Princess and Curdie (George MacDonald, 1883), public domain (MacDonald d. 1905)',
  chapters: [
    {
      title: 'Chapter 1 · The Tower Room',
      art: 'curdie-tower',
      artPrompt: 'a high round tower room with rose vines at the window, a silvery-blue fire burning, a graceful old lady with silver hair spinning threads of light, a boy in miner\'s clothes standing respectfully before her, soft radiant glow filling the room, gentle magical storybook scene',
      blocks: [
        { kind: 'text', text: 'Curdie was a miner\'s boy in the mountains. Long ago he had helped a little princess escape the goblins, and he had never forgotten her mysterious great-great-grandmother in the tower.' },
        { kind: 'text', text: 'One evening a silver-white pigeon tapped at his window, and Curdie climbed the winding stair to the tower room. There the old princess sat among rose vines, with a fire of rose-colored flame.' },
        { kind: 'image', art: 'curdie-pigeon', text: 'The white pigeon brings Curdie to the tower.' },
        { kind: 'text', text: '"The King is ill in his capital," she said, "and wicked hands are poisoning him. I am sending you, Curdie, though you are only a miner\'s boy." Curdie felt very small — and very willing.' },
        { kind: 'text', text: 'She kissed his hands, and they burned like embers. From that hour, Curdie\'s hands could feel the truth: anyone who had grown cruel and greedy would feel, under his fingers, like some beast.' },
        { kind: 'note', text: 'Ask your child: the gift is strange — Curdie cannot see goodness, only what people are becoming inside. Why would that help him in a city full of liars?', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 2 · Lina',
      art: 'curdie-lina',
      artPrompt: 'a huge shaggy grey creature with kind amber eyes and soft dark wings folded flat on its back sitting patiently at the door of a stone cottage in moonlight, a boy in miner\'s clothes with a bundle looking out in wonder, his mother behind him, soft silver light, gentle storybook scene',
      blocks: [
        { kind: 'text', text: 'Curdie told his mother everything, and she packed him bread and her own good advice. The next evening a scratching came at the cottage door.' },
        { kind: 'text', text: 'There stood the strangest creature ever seen — big as a mastiff, with a body like a great dog, feathered wings folded flat, and wise amber eyes. "I am Lina," she seemed to say with her whole body. "I am yours."' },
        { kind: 'image', art: 'curdie-door', text: 'Lina waits patiently at the cottage door.' },
        { kind: 'text', text: 'Long ago, cruel makers had stitched Lina together from many beasts. But under all the strangeness was a heart as true as gold. Curdie patted her great head, and off they set together for the capital.' },
        { kind: 'note', text: 'Ask your child: everyone would judge Lina by her odd outside. What does Curdie see instead? Talk about a time someone looked past appearances — theirs or yours.', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 3 · The City of Gwyntystorm',
      art: 'curdie-city',
      artPrompt: 'a grey stone city of steep roofs and a fortified palace on a hill, a boy in miner\'s clothes with a huge grey dog-like creature at his side walking the cobbled street in fog, cold morning light, moody but gentle storybook illustration',
      blocks: [
        { kind: 'text', text: 'The capital, Gwyntystorm, was a grand grey city of learned men and busy markets. But Curdie\'s hands told him a quiet, terrible story. Nearly every grand person he shook hands with felt like a beast under the skin.' },
        { kind: 'text', text: 'The King lay sick in his palace, worse every day, and no one could say why. His little daughter, Princess Irene, kept watch by his bed with her old nurse.' },
        { kind: 'image', art: 'curdie-palace', text: 'Princess Irene keeps watch beside the King\'s bed.' },
        { kind: 'text', text: 'Curdie found the wicked ministers out — but a boy and a strange dog could prove nothing, and the guards threw Curdie into prison for his trouble.' },
        { kind: 'note', text: 'Ask your child: Curdie knows the truth but cannot make anyone believe him. What would you do in his place? Talk about patience when doing right is hard.', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 4 · The Uglies Come Down',
      art: 'curdie-night',
      artPrompt: 'a crowd of gentle but odd mountain creatures — shaggy, winged, awkward — standing quietly in a torchlit palace courtyard at night around a boy with a lantern, a huge grey creature at his side, stone walls and warm firelight, hopeful dramatic storybook scene',
      blocks: [
        { kind: 'text', text: 'Lina was no ordinary friend. She went to the mountain and returned with the strangest army ever gathered — the creatures of the old burrows, odd, shy, and completely faithful to her call.' },
        { kind: 'text', text: 'On the last night, the wicked ministers stirred up the city mob to storm the King\'s house and finish their work. Lina fought like a lion of the old tales, and Curdie held the stair.' },
        { kind: 'image', art: 'curdie-stair', text: 'Curdie and Lina hold the stair against the crowd.' },
        { kind: 'text', text: 'Then the mountain creatures came pouring over the walls. The mob melted away, and the ministers were taken. At last the King could be told the truth — and with the poison stopped, he began to mend.' },
        { kind: 'note', text: 'Ask your child: the "ugly" creatures save the day because they are faithful. What does this say about who the real monsters were in the city?', art: 'lamp-hint' },
      ],
    },
    {
      title: 'Chapter 5 · Home to the Mountain',
      art: 'curdie-home',
      artPrompt: 'a boy in miner\'s clothes and a young princess with golden hair saying goodbye on a green mountain path at sunrise, a huge gentle grey creature beside the boy, a white pigeon circling above mountain pines, bright hopeful morning light, warm storybook farewell scene',
      blocks: [
        { kind: 'text', text: 'The King grew well again. He thanked the miner\'s boy and the strange, dear creatures, and the wicked ministers went away where they could trouble no one.' },
        { kind: 'text', text: 'Princess Irene and Curdie said goodbye like old friends, for that is what they were. The old princess in her tower smiled, and her work was done for a while.' },
        { kind: 'image', art: 'curdie-goodbye', text: 'The friends part on the mountain path at sunrise.' },
        { kind: 'text', text: 'Curdie walked home with Lina at his side, to his mother\'s cottage and the quiet mine. He had gone to the city an ordinary boy, and come home understanding the rarest thing of all: how to know a true heart.' },
        { kind: 'note', text: 'Ask your child: Curdie\'s hands felt beasts — but the story says even a beast-heart can become true again, like Lina\'s. What changed her? Kindness, or company, or both?', art: 'lamp-hint' },
      ],
    },
  ],
  rights: {
    workTitle: 'The Princess and Curdie',
    author: 'George MacDonald',
    authorDeathYear: 1905,
    jurisdiction: 'EU',
    basis: 'pd-70',
    note: 'Retold for children; plot follows the public-domain original. 19th-century Scottish fantasy, public domain worldwide (author died 1905).',
  },
}
