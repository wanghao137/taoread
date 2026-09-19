import type { PackBook } from '../types'

/**
 * The Merry Adventures of Robin Hood — five chapters retold for young readers.
 * Text: Howard Pyle, 1883. US public domain (published pre-1929) and worldwide
 * (Pyle d. 1911, 70y pma expired). Episodes follow Pyle's retelling; violence is
 * played for sport and softened for readers aged 9-12.
 */
export const robinHood: PackBook = {
  id: 'tale-robinhood',
  title: 'The Merry Adventures of Robin Hood',
  author: 'Howard Pyle',
  lang: 'en',
  category: 'tale',
  ageStage: '9-12',
  intro: 'How Robin of Locksley took to the greenwood of Sherwood Forest, and gathered the merriest band in England: Little John from the narrow bridge, Friar Tuck from the stream, and the famous golden arrow won at the Sheriff’s own contest in Nottingham Town.',
  coverArt: 'robin-archery',
  coverArtPrompt: 'a bustling medieval archery contest in a sunlit meadow outside stone town walls, a tall archer in Lincoln green drawing a longbow with perfect form, a golden arrow prize glittering on a velvet cushion on a judge’s table, banners and a crowd of townsfolk in bright tunics, festive summer light',
  coverFrom: '#1B5E20',
  coverTo: '#AED581',
  source: 'The Merry Adventures of Robin Hood (Howard Pyle, 1883), public domain',
  chapters: [
    {
      title: 'Chapter 1 · Into Sherwood Forest',
      art: 'robin-oak',
      artPrompt: 'a sun-dappled Sherwood Forest glade around a vast ancient oak, a band of men in Lincoln green cooking over a fire and stringing bows, deer moving quietly between tall ferns, a young archer leaning against the great trunk smiling, warm green-gold light',
      blocks: [
        {
          kind: 'text',
          text: 'In the green north of England, in the days of old kings, there lived a young man named Robin of Locksley, the finest archer in all that country. He was tall, merry, and kind to the poor, and all he wanted was a quiet life with his bow, his friends and his good name.',
        },
        {
          kind: 'text',
          text: 'But the times were hard on quiet lives. The king’s deer filled the forests, and the law said a poor man might not touch them, though his children went hungry. One unlucky day a hot quarrel with the king’s foresters ended with a blow thrown in anger, and Robin found trouble on his heels and a price on his head. So he shouldered his bow, tightened his belt, and walked into Sherwood Forest, where the law rode slowly and the trees kept their own counsel.',
        },
        {
          kind: 'image',
          art: 'robin-oak',
          text: 'The greenwood: home of the free, where the trees kept their own counsel.',
        },
        {
          kind: 'text',
          text: 'Other men with the same trouble found their way to the same trees. Robin greeted each one under the great oak with a cup of ale and a question: "Can you draw a bow, or carry a staff, or make a hungry man laugh?" The band grew — bold yeomen, merry tinkers, wronged farmers — and they lived on the king’s deer and on rich travellers persuaded to lend a purse to a good cause. Robin’s own rule stood above all the rest: no harm to any but the proud, no unkindness to any woman, and nothing taken from the poor.',
        },
        {
          kind: 'note',
          text: 'New word: greenwood — the deep leafy forest where the outlaws lived free. In Sherwood, Robin’s band kept a stricter code of fairness than many a fine court.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 2 · Little John and the Bridge',
      art: 'robin-bridge',
      artPrompt: 'a narrow plank footbridge over a merry brown stream in green woodland, two tall men in the middle of a playful quarterstaff duel, one leaning back mid-strike, willow trees and cowslips on the banks, puffy clouds in a bright summer sky',
      blocks: [
        {
          kind: 'text',
          text: 'One morning Robin, feeling restless, wished for an adventure, and Little Little Luck sent him a narrow bridge over a running brook. On the bridge stood a stranger as tall as two men — seven feet of him and more — with a stout staff across his shoulder. "Give way, fellow," said Robin pleasantly, "the bridge is not wide enough for two." "The bridge is wide enough," said the stranger, "for the man who can keep it."',
        },
        {
          kind: 'text',
          text: 'So they fell to with green cudgels, and it was the finest match ever seen in that county. Round and round they swung in the sunshine, and the brook ran merrily below, until at last the big man’s staff landed such a crack that Robin tumbled backward into the water with a mighty splash.',
        },
        {
          kind: 'image',
          art: 'robin-bridge',
          text: 'The finest quarterstaff match in the county, seven feet of it.',
        },
        {
          kind: 'text',
          text: 'Now a proud man would have been angry. Robin only stood in the stream up to his middle, laughing and wringing out his cap. "Good friend," he called, "you are the best man with a staff I ever met, and I have a mind to keep you." The stranger liked the look of him, and the dinner under the oak, and the rules of the greenwood, and before the week was out he wore Lincoln green with the rest. They named him Little John — for a joke, because he stood seven feet tall — and he became Robin’s right hand in everything that came after.',
        },
        {
          kind: 'note',
          text: 'Talk together: Robin loses the fight on the bridge and gains his best friend. Ask your child: how can losing a game sometimes be better than winning it?',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 3 · Friar Tuck',
      art: 'robin-friar',
      artPrompt: 'a jolly fat friar in brown robes carrying a huge bow, standing knee-deep in a shady stream while a tall archer in Lincoln green climbs dripping onto the bank beside a patient packhorse, overhanging trees and dragonflies over the water, dappled summer light',
      blocks: [
        {
          kind: 'text',
          text: 'Robin heard of a friar who lived alone in a secluded dell by the water, who shot as well as any yeoman and sang as well as any clerk, and cared not a fig for lords. "Here is a man for the greenwood," said Robin, and set off to find him, with a fine cloak to give and nothing but good manners to trade.',
        },
        {
          kind: 'text',
          text: 'He found the friar by a shady stream, and the friar heard him out over a long look. "Carry me over the water," said the friar at last, "and we shall talk." Robin, who was strong and good-humoured, hoisted the great man onto his back and waded in — and halfway across, the friar shifted his weight and tipped the outlaw neatly into the stream.',
        },
        {
          kind: 'image',
          art: 'robin-friar',
          text: 'A fair trade: one back, one stream, one jolly trick repaid with another.',
        },
        {
          kind: 'text',
          text: '"Now you carry me," said Robin when he surfaced, and the friar laughed and bore him over. And when they reached the far bank, Robin drew his horn and blew three notes, and out of the trees came fifty men in Lincoln green with bent bows. The friar never blinked. "Fifty to one is poor sport," he said, strung his own enormous bow, and shot so well that Robin laughed until his sides ached. They shared a dinner of venison and singing, and Friar Tuck kept his dell and his independence — but his name was on the greenwood roll from that day, and the band was the merrier for it.',
        },
        {
          kind: 'note',
          text: 'New word: friar — a wandering monk who lives simply and loves a joke. Tuck’s rule of life: sing well, shoot well, and never bow to a lord you do not respect.',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Golden Arrow',
      art: 'robin-archery',
      artPrompt: 'an archery contest field at the edge of a walled medieval town, a tall archer in a simple dyer’s clothes splitting an arrow already in the centre of the target, the Sheriff of Nottingham leaning forward in his chair astonished, banners fluttering, a golden arrow gleaming on a cushion nearby, bright noon light',
      blocks: [
        {
          kind: 'text',
          text: 'The Sheriff of Nottingham hated Robin Hood as only a proud man can hate a laughing one, and he laid a trap fit for a hunter of men. He proclaimed a grand archery contest in Nottingham Town — the finest bowmen in England, the finest prizes — certain that the famous outlaw could no more stay away than a thrush could stay away from song.',
        },
        {
          kind: 'text',
          text: 'The prize for the best shooting was a shaft of solid gold. And on contest day, sure enough, among the butchers’ apprentices and the travelling dyers came a tanned stranger with rough hands and a steady eye, who traded jokes with the very men who hunted him.',
        },
        {
          kind: 'text',
          text: 'Round after round the stranger shot, and never missed the centre. In the final trial he split a wand, and then, to settle any doubt in the crowd’s mind, he split his own arrow already standing in the very heart of the mark. The field roared. The Sheriff sat forward in amazement — and the stranger, smiling, drew from his cap a feather that no honest archer in Nottingham ever wore, and toasted the Sheriff with it before his very face.',
        },
        {
          kind: 'image',
          art: 'robin-archery',
          text: 'The golden arrow, won fairly in the Sheriff’s own town.',
        },
        {
          kind: 'text',
          text: 'Before the guards could gather their wits, a great shout rose from the crowd — for half of Nottingham secretly loved the bold outlaw — and Robin walked the golden shaft out through the gate at noonday, between the very men sent to catch him. In the greenwood that night they drank to the Sheriff’s health, and meant it, more or less.',
        },
        {
          kind: 'note',
          text: 'Talk together: Robin wins fairly, in plain sight, and the crowd is on his side. Ask your child: why do you think people loved Robin Hood, even the townsfolk?',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: 'Chapter 5 · A Wedding in the Greenwood',
      art: 'robin-feast',
      artPrompt: 'a joyful woodland wedding beneath the great oak, garlands of oak leaves and wild roses, a young singer in brown marrying a girl in a simple gown with a flower crown, a fat friar holding up the ceremony, the outlaw band feasting at long trestle tables, honeyed late-afternoon light through the leaves',
      blocks: [
        {
          kind: 'text',
          text: 'There came to the greenwood a young singer named Allan-a-Dale, with his harp strung and his heart in trouble. He loved a lass of gentle birth, and she loved him — but her father had promised her to an old knight with three times Allan’s gold and none of his songs, and the wedding was set for the morrow.',
        },
        {
          kind: 'text',
          text: 'Now Robin Hood held one rule higher than all the rest: no harm to any woman’s happiness. "Dress me in your coat," he said to Allan, "and lend me your harp. Let us see what the church has to say about it." The next morning the famous Bishop of Hereford came riding to officiate, and found the church door pleasantly blocked by a herd of deer and a crowd of men in Lincoln green who begged him, most courteously, to step inside and do his office quickly.',
        },
        {
          kind: 'image',
          art: 'robin-feast',
          text: 'A wedding under the great oak, with the whole greenwood for a congregation.',
        },
        {
          kind: 'text',
          text: 'The Bishop did as he was asked, and did it well. Friar Tuck joined the hands, Allan sang, and the lass said yes with such a look that half the outlaws blew their noses. Then the whole company carried the couple into the forest, where under the great oak stood long tables, and venison, and honey cakes, and the best music ever heard between two trees.',
        },
        {
          kind: 'text',
          text: 'They danced till the stars came out. And that was the way of the greenwood all the years of Robin’s merry life: the proud undone, the poor fed, the wrong things mended where a bow and a kind heart could mend them — and a song, always, for anyone hungry enough to stay for supper.',
        },
        {
          kind: 'note',
          text: 'Talk together: Robin uses cleverness and kindness together to set things right. Ask your child: what would you have sung at Allan’s wedding, if you had a harp?',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Merry Adventures of Robin Hood',
    author: 'Howard Pyle',
    authorDeathYear: 1911,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Episodes as retold in Pyle’s public-domain collection (1883); violence played for sport and softened for young readers. US public domain (pre-1929) and worldwide (Pyle d. 1911, 70y pma expired).',
  },
}
