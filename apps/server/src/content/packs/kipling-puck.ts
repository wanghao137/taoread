import type { PackBook } from '../types'

/**
 * Puck of Pook's Hill — three tales of Shakespeare-era and older England,
 * retold for readers aged 9-12.
 * Text: Project Gutenberg eBook #557 (Rudyard Kipling, 1906). Public domain
 * worldwide (Kipling died 1936; 70y pma expired in 2007). Plot follows the
 * original: two children acting "A Midsummer Night's Dream" on Midsummer Eve
 * summon Puck, who brings figures of English history to tell their stories.
 * Wording simplified in places for young readers.
 */
export const puckHill: PackBook = {
  id: 'kipling-puck',
  title: "Puck of Pook's Hill",
  author: 'Rudyard Kipling',
  lang: 'en',
  category: 'tale',
  ageStage: '9-12',
  intro: "Two children act Shakespeare's fairy play three times under the old oaks — and Puck himself steps out of the fern. Night after night he brings them the people who once lived by Pook's Hill: a smith of the old gods, a king's master mason, and the little folk of the Marsh.",
  coverArt: 'puck-hill',
  coverArtPrompt: 'a boy and a girl in summer clothes standing among tall ferns beneath three ancient oak trees on a moonlit hillside, a small pointed-eared figure in a cap and moss-green clothes stepping out of a ring of light, fireflies, warm midsummer evening glow over the Sussex downs',
  coverFrom: '#33691E',
  coverTo: '#FFF59D',
  source: "Puck of Pook's Hill (Rudyard Kipling, 1906), Project Gutenberg eBook #557, public domain (Kipling d. 1936)",
  chapters: [
    {
      title: 'Chapter 1 · The Smith of the Old Swords',
      art: 'puck-fern-oaks',
      artPrompt: 'two children rehearsing a fairy play in a leafy ring of ferns under three old oaks, a small sprightly figure in green sitting cross-legged on a mossy root watching them with bright eyes, dappled golden evening light, storybook illustration',
      blocks: [
        {
          kind: 'text',
          text: 'On Midsummer Eve, Dan and Una went to the old ring of ferns below the oaks on Pook\'s Hill. They had learned the fairy play by heart — the very one the great playwright wrote about Oberon and Titania — and they acted it once, and twice, and a third time, just as the old rhyme told them to.',
        },
        {
          kind: 'image',
          art: 'puck-fern-oaks',
          text: 'Three times through the play, under the oaks, while the evening shadows grew long.',
        },
        {
          kind: 'text',
          text: 'When they spoke the last line, a small figure sat on the mossy root before them — a man with pointed ears and skin the colour of beech leaves. "I am Robin Goodfellow," he said, laughing. "Some call me Puck. You have called me across the world, and here I am. I am the oldest Old Thing in England."',
        },
        {
          kind: 'note',
          text: 'Puck is the merry sprite from Shakespeare\'s A Midsummer Night\'s Dream — the same play Dan and Una acted three times. He promises to show the children people from England\'s past who are just as real as they are.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'That night an old sword lay shining on the grass, and beside it stood a tall man in a russet cloak. His name was Sir Hugh, and he told how his sword had first belonged to Weland, the smith of the old northern gods. "A sword remembers its makers," he said, "and this one was forged by a god who wore out his godhead doing kindnesses for men."',
        },
        {
          kind: 'text',
          text: 'Weland had grown old among men, and when the last person stopped praying to him, his work as a god was done. But the sword stayed true, and the men who carried it stayed true too. Dan and Una walked home in the dark, feeling that the hillside was full of quiet friends.',
        },
      ],
    },
    {
      title: 'Chapter 2 · The King\'s Master Mason',
      art: 'puck-mason-tower',
      artPrompt: 'a stonemason in a leather apron standing on wooden scaffolding beside a half-built church tower of warm honey-coloured stone, wooden cranes and chiselled blocks, a small boy handing up a mallet, a crowned king in furs watching from below, clear autumn morning light',
      blocks: [
        {
          kind: 'text',
          text: 'Another evening Puck brought them Sir Harry Dawe, a master mason from the time of the first Tudor king. Harry\'s hands were hard as the stone he cut, and his eyes were quick and kind.',
        },
        {
          kind: 'image',
          art: 'puck-mason-tower',
          text: 'Sir Harry Dawe on his scaffolding, with the new tower rising stone by stone.',
        },
        {
          kind: 'text',
          text: '"I was set to raise the great new tower at Brenchley church," said Harry. "A mason\'s work is to make things that will stand long after he is forgotten. I chose every stone, and I wrote no name on any of them — for the tower itself is my name."',
        },
        {
          kind: 'note',
          text: 'A master mason was both architect and builder, drawing plans and shaping stone. Sir Harry says a craft is best done for the work\'s own sake — not for praise. What would you like to make something for?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Word came that the King himself wished to see the tower. Harry was not afraid. "A king\'s men may command me," he said, "but no one commands good stone." When the King\'s party rode up, the scaffolding stood firm and the mortar was laid fair, and the King looked and nodded, and asked the mason\'s name.',
        },
        {
          kind: 'text',
          text: '"They call me Hal o\' the Draft," said Harry, "because I sit all day over my drawings." The King laughed at the name and praised the tower. And Harry went back to his drawings the very next morning, as glad as a king himself.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Flitting of the Fairies',
      art: 'puck-marsh-flit',
      artPrompt: 'a line of small folk in green and grey carrying tiny bundles and lanterns across a moonlit marsh of tall grass and silver dykes, an old country woman at her cottage door holding a sleeping baby and watching them go, low mist, soft blue and silver moonlight',
      blocks: [
        {
          kind: 'text',
          text: 'The last tale came from a farm worker of the old Marsh, who remembered his grandmother\'s grandmother telling it. It happened in the days of good Queen Bess — the queen in whose time the great playwright wrote his plays.',
        },
        {
          kind: 'image',
          art: 'puck-marsh-flit',
          text: 'The little folk carrying their lanterns across the Marsh, under the moon.',
        },
        {
          kind: 'text',
          text: 'For hundreds of years the fairies had lived on Romney Marsh — in the wool-pits, under the thorns, along the silver dykes. But a new parson came who did not like old ways, and the walls of the church were whitewashed, and the little folk said to one another, "It is time to flit."',
        },
        {
          kind: 'text',
          text: 'So they made ready, very quietly, packing up their little goods and glimmering lanterns, meaning to cross the sea to France, where old ways were still welcome. One old woman of the Marsh, who had been kind to them all her life, watched them go by in the moonlight with their bundles on their backs.',
        },
        {
          kind: 'note',
          text: 'To "flit" is an old word for moving house. The fairies do not leave in anger — they leave because the world above ground is changing, and they go politely, thanking the friends who were kind to them.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'The old woman called out a good-night to them, and the oldest fairy paused and said that wherever little folk flit to, kindness is never forgotten — and that some of them would stay in England after all, hidden and harmless, in quiet places like Pook\'s Hill. And so they do, says Puck, for those who know how to look. Dan and Una sat still among the ferns until the moon was high. "You see," said Puck, cheerfully, "people come and people go, but the Old Things remember." And he tucked them into the shadow of the oaks and sent them home to supper, laughing his small green laugh.',
        },
      ],
    },
  ],
  rights: {
    workTitle: "Puck of Pook's Hill",
    author: 'Rudyard Kipling',
    authorDeathYear: 1936,
    jurisdiction: 'EU',
    basis: 'pd-70',
    sourceUrl: 'https://www.gutenberg.org/ebooks/557',
    note: 'Published 1906; public domain worldwide (Kipling d. 1936, 70y pma expired). Three tales follow Project Gutenberg eBook #557; wording simplified for young readers.',
  },
}
