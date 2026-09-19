import type { PackBook } from '../types'

/**
 * At the Back of the North Wind — five chapters retold for young English readers.
 * Text: George MacDonald, 1871 (US edition 1909). US public domain (published
 * pre-1929) and worldwide (MacDonald d. 1905, 70y pma expired). Plot follows the
 * original novel; the ending is kept gentle, with no frightening detail, for
 * children aged 6-8.
 */
export const northWind: PackBook = {
  id: 'tale-northwind',
  title: 'At the Back of the North Wind',
  author: 'George MacDonald',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro: 'A little boy named Diamond lives in the hay loft behind a stable, where the wind whistles through a hole in the wall. One night the wind becomes a tall lady — the North Wind — who carries him flying over roofs and sea, and shows him the quiet country at her back.',
  coverArt: 'northwind-loft',
  coverArtPrompt: 'a cozy hay loft at night with a small round hole high in the wooden wall, moonlight and a swirl of stars streaming through the hole into golden straw, a small boy in a nightshirt looking up at it with wonder, gentle blue and gold light',
  coverFrom: '#1A237E',
  coverTo: '#90CAF9',
  source: 'At the Back of the North Wind (George MacDonald, 1871), public domain',
  chapters: [
    {
      title: 'Chapter 1 · The Hay Loft Window',
      art: 'northwind-loft',
      artPrompt: 'a warm hay loft above a stable at night, a boy in a nightshirt curled in golden straw beneath a small round hole in the plank wall, moonlight and drifting starlight spilling through the hole, a big gentle carthorse dozing in the stable below, quiet blue night tones with warm straw gold',
      blocks: [
        {
          kind: 'text',
          text: 'In a big city with grey houses and a cold river, there lived a little boy named Diamond. He had a horse for a neighbour — his father drove a cab, and the horse was called Diamond too, after him. The boy slept in the hay loft above the stable, in a soft bed of straw, and he liked it better than any room in any house.',
        },
        {
          kind: 'text',
          text: 'There was one odd thing about the hay loft. High up in the wall there was a little round hole, and when the wind blew, the hole sang. Sometimes it sang low and sleepy, and sometimes it sang loud enough to wake the whole street.',
        },
        {
          kind: 'image',
          art: 'northwind-loft',
          text: 'The hay loft, where the little hole in the wall sang in the wind.',
        },
        {
          kind: 'text',
          text: '"That wind wants letting in," said the boy, and he lay with his eyes on the hole, listening. His mother, who came up to tuck the blanket, said he must be careful of draughts. But Diamond was not afraid of the wind. He thought it sounded like somebody who had a long way to go and was glad of it.',
        },
        {
          kind: 'note',
          text: 'Talk together: Diamond thinks the wind sounds like a song. Ask your child: on a windy day, listen together — what do you think the wind is saying?',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 2 · The Lady in the Wall',
      art: 'northwind-face',
      artPrompt: 'a tall graceful lady with long streaming hair made of wind and moonlight standing beside a small round hole in a wooden hay loft wall, a boy in a nightshirt looking up at her with a trusting smile, strands of silver light swirling around her, gentle blue night palette',
      blocks: [
        {
          kind: 'text',
          text: 'One night, when the wind was very high, the little round hole grew bigger and bigger, until a lady stood in it, tall and beautiful, with hair that streamed like a river of moonlight. "I am the North Wind," she said. "I have been singing to you for a long time, little Diamond."',
        },
        {
          kind: 'text',
          text: 'She knelt down by his bed of straw, and her hair blew across the loft like a silver curtain. Diamond looked at her and was not afraid at all. "I knew somebody was singing," he said. "Then you may come with me, if you like," said the North Wind, "for I sing best when somebody listens."',
        },
        {
          kind: 'image',
          art: 'northwind-face',
          text: 'The North Wind, who had been singing through the little hole all along.',
        },
        {
          kind: 'text',
          text: 'She gathered him up as gently as if he were a leaf, and carried him out through the wall, and set him on her arm. The whole city lay below, with its chimneys and its lamplight, and the wind moved over the roofs like a great calm sea. Diamond held on to a strand of her hair and looked down at his own little stable, small as a shoebox, and waved to it.',
        },
        {
          kind: 'note',
          text: 'New word: North Wind — the wind that comes from the cold north. She does her work all over the world, and her work is not always easy to understand.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 3 · Flying with the North Wind',
      art: 'northwind-flight',
      artPrompt: 'a boy riding on the arm of a tall wind-lady flying above a moonlit sea and a sleeping city, her silver hair streaming behind like an aurora, ships with tiny lamps far below, clouds parting over deep blue water, vast quiet night sky full of stars',
      blocks: [
        {
          kind: 'text',
          text: 'The North Wind carried Diamond over the city and out to sea. They flew past lighthouses with their slow turning eyes, past ships with lamps at their masts, past seagulls asleep on the waves. Diamond asked a hundred questions, and she answered every one, and some of her answers were songs.',
        },
        {
          kind: 'text',
          text: 'But the North Wind also had work to do, and some of her work was hard. She blew the rain in where rain was wanted. She bent the trees so they grew stronger. And once she went down to a ship in trouble, and did what a wind must do, and Diamond saw that her face looked different to different eyes — sad to some, kind to some — and he did not understand all of it.',
        },
        {
          kind: 'image',
          art: 'northwind-flight',
          text: 'Flying over the sea on the arm of the North Wind, who never once let go.',
        },
        {
          kind: 'text',
          text: 'He reached up and touched her cheek. "You are doing your work," he said, "and your work is good." The North Wind was still for a moment. Then she wrapped him close in her hair. "You trust me, little one," she said. "That is better than understanding. One day you will see that they are cousins — trust and understanding — and they live in the same country."',
        },
        {
          kind: 'note',
          text: 'Talk together: some of the wind’s work is hard, and Diamond chooses to trust her. Ask your child: who helps take care of things we cannot see or understand?',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 4 · Diamond Drives the Cab',
      art: 'northwind-cab',
      artPrompt: 'a small boy in a cap sitting on the driver’s box of a horse-drawn cab beside a big gentle carthorse, London street with gas lamps and brick houses, passengers smiling down at the boy, soft morning light after rain with wet cobblestones shining',
      blocks: [
        {
          kind: 'text',
          text: 'At home, times were hard. Diamond’s father was ill one winter, and there was not much bread in the cupboard. So the little boy put on a cap twice his size and sat up on the cab, and Old Diamond the horse knew just what to do. The boy held the reins, and the horse did the driving, and together they did very well indeed.',
        },
        {
          kind: 'text',
          text: 'People began to ask for the little cab driver with the kind face. He carried a lady with a heavy basket and would not take more than a penny. He sat with a lonely old man while he told his long stories. He sang to his horse at the crossings, and the horse flicked his ears in time.',
        },
        {
          kind: 'image',
          art: 'northwind-cab',
          text: 'Little Diamond on the box, with the best-behaved horse in London.',
        },
        {
          kind: 'text',
          text: 'His neighbours said the wind had blown good luck into the stable. Diamond smiled, because he knew the wind had done no such thing — but he also knew she had taught him something on all those nights of flying: that a small kindness goes a long way, like a wind that starts small and travels round the world.',
        },
        {
          kind: 'note',
          text: 'Talk together: Diamond helps his family the best way he can, small job by small job. Ask your child: what is one small helpful thing you could do this week?',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 5 · The Country at Her Back',
      art: 'northwind-river',
      artPrompt: 'a calm wide silver river flowing gently under a soft glowing sky, a small boy in a little white boat on the still water, tall luminous flowers on the far bank and a warm golden light beyond, the North Wind watching kindly from a cloud-like shape, dreamy peaceful pastel colours',
      blocks: [
        {
          kind: 'text',
          text: 'The North Wind came for Diamond on quiet nights, and one night she came and stood very still. "There is a country at my back," she said, "where I never blow at all. No one can walk there, and no one can sail there — but I will take you, because you are not afraid of me."',
        },
        {
          kind: 'text',
          text: 'She carried him over her own shoulder, and set him down where it is always calm. There was a wide silver river, and a little boat waiting, and the water did not splash but only glided. On the banks grew flowers that shone softly, and the light came from everywhere and hurt nobody’s eyes, and far off somebody was singing, very sweetly, a song that seemed made of all the songs Diamond had ever loved.',
        },
        {
          kind: 'image',
          art: 'northwind-river',
          text: 'The quiet country at the back of the North Wind, where the light is kind.',
        },
        {
          kind: 'text',
          text: 'Diamond floated down the silver river, and it seemed to him that he had been there before and would come again. "It is very like home," he said happily, "only more so." The North Wind smiled with all her hair full of stars. "That," she said, "is because everything lovely is a little bit like this country — and everything lovely leads back to it."',
        },
        {
          kind: 'note',
          text: 'Talk together: in the quiet country, the light comes from everywhere and hurts nobody. Ask your child: what would you pack in a little boat for a trip to the gentlest place you can imagine?',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'At the Back of the North Wind',
    author: 'George MacDonald',
    authorDeathYear: 1905,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Retold for children; plot follows the public-domain original with the ending softened for young readers. Published 1871; US public domain (pre-1929) and worldwide (MacDonald d. 1905, 70y pma expired).',
  },
}
