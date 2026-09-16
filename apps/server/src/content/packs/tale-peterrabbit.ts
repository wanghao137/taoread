import type { PackBook } from '../types'

/**
 * The Tale of Peter Rabbit — complete story in three reading chapters (English reader).
 * Text: Project Gutenberg eBook #14838 (Beatrix Potter, 1902). Public domain in the US
 * (pre-1929) and in the UK (Potter died 1943; 70y pma expired 2014). Wording preserved
 * verbatim from the source text; only the illustration markers and line-layout removed.
 */
export const peterRabbit: PackBook = {
  id: 'peter-rabbit',
  title: 'The Tale of Peter Rabbit',
  author: 'Beatrix Potter',
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: 'Four little rabbits live under a big fir-tree. Three are good — and one is Peter, who runs straight to Mr. McGregor’s garden!',
  coverArt: 'mcgregor-garden',
  coverFrom: '#558B2F',
  coverTo: '#AED581',
  source: 'Project Gutenberg eBook #14838, public domain (Potter d. 1943)',
  chapters: [
    {
      title: 'Chapter 1 · Four Little Rabbits',
      art: 'sand-bank',
      blocks: [
        {
          kind: 'text',
          text: 'Once upon a time there were four little Rabbits, and their names were — Flopsy, Mopsy, Cotton-tail, and Peter. They lived with their Mother in a sand-bank, underneath the root of a very big fir-tree.',
        },
        {
          kind: 'image',
          art: 'sand-bank',
          text: 'The big fir-tree, with the rabbits’ home underneath its roots.',
        },
        {
          kind: 'text',
          text: '"Now my dears," said old Mrs. Rabbit one morning, "you may go into the fields or down the lane, but don’t go into Mr. McGregor’s garden: your Father had an accident there; he was put in a pie by Mrs. McGregor."',
        },
        {
          kind: 'note',
          text: 'New word: accident — something that goes wrong without anyone meaning it to.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '"Now run along, and don’t get into mischief. I am going out." Then old Mrs. Rabbit took a basket and her umbrella, and went through the wood to the baker’s. She bought a loaf of brown bread and five currant buns.',
        },
        {
          kind: 'text',
          text: 'Flopsy, Mopsy, and Cottontail, who were good little bunnies, went down the lane to gather blackberries. But Peter, who was very naughty, ran straight away to Mr. McGregor’s garden, and squeezed under the gate!',
        },
        {
          kind: 'text',
          text: 'First he ate some lettuces and some French beans; and then he ate some radishes; and then, feeling rather sick, he went to look for some parsley.',
        },
        {
          kind: 'text',
          text: 'But round the end of a cucumber frame, whom should he meet but Mr. McGregor! Mr. McGregor was on his hands and knees planting out young cabbages, but he jumped up and ran after Peter, waving a rake and calling out, "Stop thief!"',
        },
      ],
    },
    {
      title: 'Chapter 2 · Stop Thief!',
      art: 'mcgregor-garden',
      blocks: [
        {
          kind: 'text',
          text: 'Peter was most dreadfully frightened; he rushed all over the garden, for he had forgotten the way back to the gate. He lost one of his shoes among the cabbages, and the other shoe amongst the potatoes.',
        },
        {
          kind: 'image',
          art: 'mcgregor-garden',
          text: 'Mr. McGregor’s garden, full of cabbages and potatoes.',
        },
        {
          kind: 'text',
          text: 'After losing them, he ran on four legs and went faster, so that I think he might have got away altogether if he had not unfortunately run into a gooseberry net, and got caught by the large buttons on his jacket. It was a blue jacket with brass buttons, quite new.',
        },
        {
          kind: 'text',
          text: 'Peter gave himself up for lost, and shed big tears; but his sobs were overheard by some friendly sparrows, who flew to him in great excitement, and implored him to exert himself.',
        },
        {
          kind: 'note',
          text: 'New word: exert — to try very hard. The sparrows were telling Peter: try hard, you can get free!',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Mr. McGregor came up with a sieve, which he intended to pop upon the top of Peter; but Peter wriggled out just in time, leaving his jacket behind him.',
        },
        {
          kind: 'text',
          text: 'And rushed into the tool-shed, and jumped into a can. It would have been a beautiful thing to hide in, if it had not had so much water in it.',
        },
        {
          kind: 'image',
          art: 'tool-shed',
          text: 'Peter hiding in a can full of water in the tool-shed.',
        },
        {
          kind: 'text',
          text: 'Mr. McGregor was quite sure that Peter was somewhere in the tool-shed, perhaps hidden underneath a flower-pot. He began to turn them over carefully, looking under each. Presently Peter sneezed — "Kertyschoo!" Mr. McGregor was after him in no time.',
        },
        {
          kind: 'text',
          text: 'And tried to put his foot upon Peter, who jumped out of a window, upsetting three plants. The window was too small for Mr. McGregor, and he was tired of running after Peter. He went back to his work.',
        },
        {
          kind: 'text',
          text: 'Peter sat down to rest; he was out of breath and trembling with fright, and he had not the least idea which way to go. Also he was very damp with sitting in that can.',
        },
      ],
    },
    {
      title: 'Chapter 3 · Safe at Last',
      art: 'tool-shed',
      blocks: [
        {
          kind: 'text',
          text: 'After a time he began to wander about, going lippity — lippity — not very fast, and looking all round. He found a door in a wall; but it was locked, and there was no room for a fat little rabbit to squeeze underneath.',
        },
        {
          kind: 'text',
          text: 'An old mouse was running in and out over the stone doorstep, carrying peas and beans to her family in the wood. Peter asked her the way to the gate, but she had such a large pea in her mouth that she could not answer. She only shook her head at him. Peter began to cry.',
        },
        {
          kind: 'text',
          text: 'Then he tried to find his way straight across the garden, but he became more and more puzzled. Presently, he came to a pond where Mr. McGregor filled his water-cans. A white cat was staring at some gold-fish; she sat very, very still, but now and then the tip of her tail twitched as if it were alive.',
        },
        {
          kind: 'note',
          text: 'New word: twitched — gave a quick little jump. A cat’s tail twitches when it is watching something closely.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Peter thought it best to go away without speaking to her; he had heard about cats from his cousin, little Benjamin Bunny.',
        },
        {
          kind: 'text',
          text: 'He went back towards the tool-shed, but suddenly, quite close to him, he heard the noise of a hoe — scr-r-ritch, scratch, scratch, scritch. Peter scuttered underneath the bushes. But presently, as nothing happened, he came out, and climbed upon a wheelbarrow and peeped over.',
        },
        {
          kind: 'text',
          text: 'The first thing he saw was Mr. McGregor hoeing onions. His back was turned towards Peter, and beyond him was the gate! Peter got down very quietly off the wheelbarrow; and started running as fast as he could go, along a straight walk behind some black-currant bushes.',
        },
        {
          kind: 'text',
          text: 'Mr. McGregor caught sight of him at the corner, but Peter did not care. He slipped underneath the gate, and was safe at last in the wood outside the garden.',
        },
        {
          kind: 'text',
          text: 'Peter never stopped running or looked behind him till he got home to the big fir-tree. He was so tired that he flopped down upon the nice soft sand on the floor of the rabbit-hole and shut his eyes.',
        },
        {
          kind: 'text',
          text: 'I am sorry to say that Peter was not very well during the evening. His mother put him to bed, and made some camomile tea; and she gave a dose of it to Peter! "One table-spoonful to be taken at bed-time."',
        },
        {
          kind: 'text',
          text: 'But Flopsy, Mopsy, and Cotton-tail had bread and milk and blackberries for supper.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Tale of Peter Rabbit',
    author: 'Beatrix Potter',
    authorDeathYear: 1943,
    jurisdiction: 'US',
    basis: 'pd-us',
    sourceUrl: 'https://www.gutenberg.org/ebooks/14838',
    note: 'Published 1902; US public domain (pre-1929) and UK public domain (Potter d. 1943). Text taken verbatim from Project Gutenberg eBook #14838; excerpted only by omitting illustration markers.',
  },
}
