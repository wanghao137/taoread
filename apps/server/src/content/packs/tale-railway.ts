import type { PackBook } from '../types'

/**
 * The Railway Children — six chapters retold in simple English for young readers.
 * Original: E. (Edith) Nesbit, published 1906. Public domain in the US (pre-1929)
 * and worldwide (Nesbit died 1924; 70y pma expired). Plot follows the original novel
 * (the move to Three Chimneys, the 9:15, the landslide and the red petticoats, the
 * tunnel rescue, the old gentleman, and Father's return); wording simplified into
 * short sentences for children aged 9-12.
 */
export const railwayChildren: PackBook = {
  id: 'tale-railway',
  title: 'The Railway Children',
  author: 'E. Nesbit',
  lang: 'en',
  category: 'tale',
  ageStage: '9-12',
  intro: 'Roberta, Peter, and Phyllis leave their happy London home for a cottage in the country - and spend their days by the railway, waiting for the 9:15 and for Father to come back.',
  coverArt: 'railway-children-cover',
  coverArtPrompt: 'three children waving handkerchiefs on a green railway bank as a black steam engine with a red flag on the front roars past, a white cottage with smoking chimneys on the hill above, wildflowers and telegraph wires',
  coverFrom: '#004D40',
  coverTo: '#4DB6AC',
  source: 'Project Gutenberg eBook #1874, public domain (Nesbit d. 1924)',
  chapters: [
    {
      title: 'Chapter 1 · Leaving London',
      art: 'london-goodbye',
      artPrompt: 'a London street at dusk with gas lamps and a hansom cab, a tall shuttered house with a sold sign, three children in coats and hats with bundles looking back, a stern man in a cape whispering to their mother at the door',
      blocks: [
        {
          kind: 'text',
          text: 'They were not railway children at the beginning. They lived in a nice red-brick house in a London suburb, with a father who was wonderful, a mother who never told secrets, and a dog named James. They called their mother "the Duchess" because she was so dear and so pretty.',
        },
        {
          kind: 'image',
          art: 'leaving-london',
          text: 'The children say good-bye to their London house, and to Father.',
        },
        {
          kind: 'text',
          text: 'One awful evening two men came to the door, and there were low voices in the study, and then Father went away with them - and he did not come back. Mother cried, and would not say why. "You must be brave," she told the children, "and we must go away to the country."',
        },
        {
          kind: 'note',
          text: 'New word: suburb — the rows of houses built around the edge of a great city, where the streets are quieter and there are gardens.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'They sold the furniture and packed their trunks and took the long train journey north. At last they came to a little white house on a hill, with a big kitchen, a lean-to greenhouse, and three chimneys that smoked. "We will call it Three Chimneys," said Mother.',
        },
        {
          kind: 'text',
          text: 'There was no money for servants, so the children helped to scrub and sweep and cook. At night they were too tired to be unhappy, and in the morning there was always something new - the garden, the village, and best of all, the railway down the hill.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The 9:15',
      art: 'bank-waving',
      artPrompt: 'a green railway bank above a line of rails, three children waving handkerchiefs frantically as a black engine and green carriages of the 9:15 thunder past, smoke streaming back, a porter on the platform saluting with a flag',
      blocks: [
        {
          kind: 'text',
          text: 'Down the hill from Three Chimneys ran the railway. There was a station, and a coal mine, and a cutting where the trains passed so close you could feel the wind of them. Peter\'s greatest treasure was a piece of iron rail he found there - until he was caught and very nearly locked up.',
        },
        {
          kind: 'image',
          art: 'nine-fifteen-wave',
          text: 'The children wave at the 9:15, and the passengers wave back.',
        },
        {
          kind: 'text',
          text: 'The children made friends with the Porter, Perks, who told them all about the trains. Every morning at 9:15 the London train went by, and the children stood on the bank and waved their handkerchiefs. "It is going to London," said Bobbie, "where Father is. If only it could take our love to him."',
        },
        {
          kind: 'note',
          text: 'New word: cutting — a deep trench dug through a hill so the railway can run straight and level through it.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'In the window of one of the first-class carriages there was always an old gentleman with a kind face, who waved back. Soon they were friends, though they had never spoken. The children called him "the old gentleman."',
        },
        {
          kind: 'text',
          text: 'One day Mother was ill, and there was no money for a doctor or for food. The children wrote a letter to the old gentleman, asking him to help them. The next day a great hamper arrived - bread and butter and eggs and jam and a bottle of wine. The old gentleman had answered.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Landslide and the Red Petticoats',
      art: 'landslide-track',
      artPrompt: 'a railway cutting after a landslide, earth and trees heaped across the rails, two girls in red petticoats and a boy in knickers waving desperately from the trackside, the headlight of an express train glaring from the mouth of the cutting',
      blocks: [
        {
          kind: 'text',
          text: 'One wild evening the children sat by the fire, and the house shook, and the earth seemed to groan. In the morning they ran down to the railway and found a terrible sight: half the hill had slid away, and earth and trees and rocks lay heaped across the rails.',
        },
        {
          kind: 'image',
          art: 'landslide-petticoats',
          text: 'The children wave their red petticoats at the express train.',
        },
        {
          kind: 'text',
          text: '"There is a train coming!" cried Peter. "It is the special express, and it will run right into the heap and be smashed!" They had no red flag. But Phyllis and Bobbie had red petticoats under their frocks. Off came the petticoats, and the three children ran along the track and waved them with all their might.',
        },
        {
          kind: 'note',
          text: 'New word: petticoat — a warm underskirt that girls wore beneath their frocks in the old days. On this day, one saved a train.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The great train came roaring on. It did not seem to see them. It was nearly upon them when at last the driver shut off steam and put on the brakes, and the train ground to a stop just twenty yards from the fallen earth. The passengers crowded out and cheered, and the children were heroes.',
        },
        {
          kind: 'text',
          text: 'A few days later a great crowd came to the station, and the children were given gold watches by the directors of the railway. Perks was prouder of them than anybody. But Bobbie only said, "We just did what we could, because the train was in danger."',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Boy in the Tunnel',
      art: 'dark-tunnel',
      artPrompt: 'the soot-black mouth of a railway tunnel with a hand car and lights inside, a boy in a red jersey lying limp on the track being lifted by three children, a lantern held close to his pale face',
      blocks: [
        {
          kind: 'text',
          text: 'The children loved to explore, and one day they walked along the line to the long dark tunnel. Their dog ran in and would not come back. The children went after him, and in the dark they stumbled on something lying across the rails.',
        },
        {
          kind: 'image',
          art: 'tunnel-rescue',
          text: 'In the dark tunnel the children find a boy, hurt and alone.',
        },
        {
          kind: 'text',
          text: 'It was a boy - a boy in a red jersey, with a broken leg, lying white and still. His name was Jim, and he had come to hunt rabbits in the tunnel and had fallen from the tunnel wall. A train might come at any moment!',
        },
        {
          kind: 'note',
          text: 'New word: tunnel — a passage dug through a hill or under a river, so the railway can go straight through instead of climbing over.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Peter and Bobbie ran to the station for help, and Phyllis stayed in the dark, holding Jim\'s hand and talking so he should not be frightened. They got him out and brought him up to Three Chimneys in a luggage trolley, and Mother nursed him as if he were her own son.',
        },
        {
          kind: 'text',
          text: 'Jim\'s grandfather came - and he was the old gentleman of the 9:15! He was so grateful to the children that he became their firm friend. From that day the old gentleman was a part of all their hopes and plans, though they never told him why they waited for Father.',
        },
      ],
    },
    {
      title: 'Chapter 5 · The Old Gentleman\'s Help',
      art: 'christmas-hamper',
      artPrompt: 'a white cottage parlour with a bright fire, a white-haired old gentleman in a fur coat handing a Christmas hamper to three delighted children, a plump woman in a shawl at the door, parcels and a wreath and a lit tree in the corner',
      blocks: [
        {
          kind: 'text',
          text: 'Winter came to Three Chimneys, and the children grew poor and thin. But they kept up their courage. Peter chopped wood, Bobbie sewed, and Phyllis scrubbed. Mother wrote stories late into the night, and they all waited for news of Father.',
        },
        {
          kind: 'image',
          art: 'old-gentleman-parcels',
          text: 'The old gentleman brings a Christmas hamper to Three Chimneys.',
        },
        {
          kind: 'text',
          text: 'At Christmas the old gentleman came with a sleigh full of good things - a turkey and a Christmas pudding, and warm coats and boots for them all, and toys. The children gave Perks a hamper too, made of all their own small gifts, and Perks cried like a child with his wife and children.',
        },
        {
          kind: 'note',
          text: 'New word: hamper — a big basket with a lid, used for carrying food and good things to people.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'One day Bobbie found a newspaper in the garden, and read in it that Father had been found not guilty - that he had been put in prison by a terrible mistake. She ran to the old gentleman and begged him to help. "I will do everything I can," he said, and he took the paper away with him.',
        },
        {
          kind: 'text',
          text: 'The weeks passed like years. Then one evening there came a telegram. Mother read it and turned very pale, and then she began to cry and to laugh at once. "Children!" she said, "Father is coming home!"',
        },
      ],
    },
    {
      title: 'Chapter 6 · Father Comes Home',
      art: 'platform-return',
      artPrompt: 'a misty railway platform at dusk, a train standing with steam, a girl in a blue frock running with open arms toward a tall thin man with a glad tired face stepping down from a carriage, two other children and a porter watching',
      blocks: [
        {
          kind: 'text',
          text: 'The next day was the day of the flower show, and the children went with Perks to the station. But Bobbie\'s heart was not in the show. She lingered on the platform while Peter and Phyllis went to look at the engines.',
        },
        {
          kind: 'image',
          art: 'father-comes-home',
          text: 'Bobbie runs to meet Father, home at last.',
        },
        {
          kind: 'text',
          text: 'A train came in - not the 9:15, but a slow train with only one carriage. The door opened, and a man stepped out - tall, thin, pale, with the dearest face in the world. Bobbie could not breathe. Then she flew along the platform like a bird. "Father! Father! Father!"',
        },
        {
          kind: 'note',
          text: 'Question for you: All through the story the children wave at the 9:15 to send their love to Father. Why do you think Bobbie is the one who meets him first?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'And Father caught her in his arms, and held her so tight that she could feel his heart beating. Peter and Phyllis came running, and then Mother, and the station-master and Perks and the porters all stood still and looked at them, and nobody said a word.',
        },
        {
          kind: 'text',
          text: 'They walked home together through the evening, past the railway and the cutting and the hill, up to the white house where the three chimneys smoked a welcome. Father was home. And they were the Railway Children no longer - only the happiest family in all the world.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Railway Children',
    author: 'E. Nesbit',
    authorDeathYear: 1924,
    jurisdiction: 'US',
    basis: 'pd-us',
    sourceUrl: 'https://www.gutenberg.org/ebooks/1874',
    note: 'Retold in simple English; plot follows the public-domain original.',
  },
}
