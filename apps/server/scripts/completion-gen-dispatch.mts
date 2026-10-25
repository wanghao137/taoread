// @ts-nocheck
/**
 * 从 spec.tsv 生成全量派发清单 dispatch.json（每个 part 一条任务记录，含完整任务书）。
 * 用法：npx tsx scripts/completion-gen-dispatch.mts
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), 'completion')
const rows = readFileSync(join(ROOT, 'spec.tsv'), 'utf8').trim().split('\n').slice(1).map(l => l.split('\t'))

/** 原著名/作者/公版说明/目标结构说明（按 id） */
const BOOK_INFO: Record<string, { title: string; author: string; pd: string; structure: string }> = {
  'alcott-littlewomen': { title: 'Little Women', author: 'Louisa May Alcott', pd: '1868/1869 两卷共 47 章', structure: '原著 47 章（卷一 23 章+卷二 24 章），按原著全部 47 章逐章简写' },
  'alcott-littlemen': { title: 'Little Men', author: 'Louisa May Alcott', pd: '1871，原著 21 章', structure: '原著 21 章逐章简写' },
  'alcott-oldfashioned': { title: 'An Old-Fashioned Girl', author: 'Louisa May Alcott', pd: '1870，原著 33 章', structure: '原著 33 章逐章简写' },
  'alice-wonderland': { title: "Alice's Adventures in Wonderland", author: 'Lewis Carroll', pd: '1865，原著 12 章', structure: '原著 12 章逐章简写' },
  'tale-lookingglass': { title: 'Through the Looking-Glass', author: 'Lewis Carroll', pd: '1871，原著 12 章', structure: '原著 12 章逐章简写（最后一章为结局醒来）' },
  'peter-pan': { title: 'Peter and Wendy', author: 'J. M. Barrie', pd: '1911，原著 17 章', structure: '原著 17 章逐章简写' },
  'heidi': { title: 'Heidi', author: 'Johanna Spyri', pd: '1881，原著 23 章（两部合计）', structure: '原著 23 章逐章简写' },
  'tale-secretgarden': { title: 'The Secret Garden', author: 'Frances Hodgson Burnett', pd: '1911，原著 27 章（含 Mister 26/27 尾章）', structure: '原著 27 章逐章简写' },
  'tale-littleprincess': { title: 'A Little Princess', author: 'Frances Hodgson Burnett', pd: '1905，原著 19 章', structure: '原著 19 章逐章简写' },
  'tale-anne': { title: 'Anne of Green Gables', author: 'L. M. Montgomery', pd: '1908，原著 38 章', structure: '原著 38 章逐章简写' },
  'montgomery-avonlea': { title: 'Anne of Avonlea', author: 'L. M. Montgomery', pd: '1909，原著 38 章', structure: '原著 38 章逐章简写' },
  'tale-tomsawyer': { title: 'The Adventures of Tom Sawyer', author: 'Mark Twain', pd: '1876，原著 35 章', structure: '原著 35 章逐章简写' },
  'twain-pauper': { title: 'The Prince and the Pauper', author: 'Mark Twain', pd: '1881，原著 33 章', structure: '原著 33 章逐章简写' },
  'tale-treasure': { title: 'Treasure Island', author: 'Robert Louis Stevenson', pd: '1883，原著 34 章', structure: '原著 34 章逐章简写' },
  'pinocchio': { title: 'The Adventures of Pinocchio', author: 'Carlo Collodi', pd: '1883，原著 36 章', structure: '原著 36 章逐章简写' },
  'porter-pollyanna': { title: 'Pollyanna', author: 'Eleanor H. Porter', pd: '1913，原著 32 章', structure: '原著 32 章逐章简写' },
  'wiggin-rebecca': { title: 'Rebecca of Sunnybrook Farm', author: 'Kate Douglas Wiggin', pd: '1903，原著 23 章', structure: '原著 23 章逐章简写' },
  'black-beauty': { title: 'Black Beauty', author: 'Anna Sewell', pd: '1877，原著 49 章', structure: '原著 49 章逐章简写' },
  'burnett-fauntleroy': { title: 'Little Lord Fauntleroy', author: 'Frances Hodgson Burnett', pd: '1886，原著 15 章', structure: '原著 15 章逐章简写' },
  'tale-dolittle': { title: 'The Story of Doctor Dolittle', author: 'Hugh Lofting', pd: '1920，原著 12 章', structure: '原著 12 章逐章简写' },
  'tale-dolittlevoyage': { title: 'The Voyages of Doctor Dolittle', author: 'Hugh Lofting', pd: '1922，原著 20 章', structure: '原著 20 章逐章简写' },
  'macdonald-curdie': { title: 'The Princess and Curdie', author: 'George MacDonald', pd: '1883，原著 32 章', structure: '原著 32 章逐章简写' },
  'tale-princessgoblin': { title: 'The Princess and the Goblin', author: 'George MacDonald', pd: '1872，原著 32 章', structure: '原著 32 章逐章简写' },
  'kingsley-waterbabies': { title: 'The Water-Babies', author: 'Charles Kingsley', pd: '1863，原著 8 章加尾声', structure: '扩为 9 章：前 8 章按原著、第 9 章为尾声（Tom 长大成为伟大的人）' },
  'lagerlof-nils': { title: 'The Wonderful Adventures of Nils', author: 'Selma Lagerlöf（英译 Velma Swanston Howard）', pd: '1906/1907，原著 55-56 章', structure: '原著 55 章逐章简写（瑞典原作两卷，英译通行本约 55 章）' },
  'kipling-puck': { title: "Puck of Pook's Hill", author: 'Rudyard Kipling', pd: '1906，正文 10 个故事章节+框架（丹与乌娜）', structure: '扩为 11 章：10 个故事章（Weland 的剑起，到 A Doctor of Medicine 等）+第 11 章收尾（告别 Puck）' },
  'kipling-jungle2': { title: 'The Second Jungle Book', author: 'Rudyard Kipling', pd: '1895，原著 15 章（含诗篇，诗篇可略）', structure: "扩为 15 章：故事章逐章简写（How Fear Came、The Miracle of Purun Bhagat、Letting in the Jungle、The Undertakers、The King 的 Ankus、Quiquern、Red Dog、The Spring Running 等），诗篇章并入相邻故事章的 note" },
  'jungle-book': { title: 'The Jungle Book', author: 'Rudyard Kipling', pd: '1894，原著 15 章（Mowgli 故事+其他动物故事）', structure: "原著 15 章逐章简写（含 Mowgli 的 Brothers、Kaa 的 Hunting、Tiger! Tiger!、The White Seal、Rikki-Tikki-Tavi、Toomai of the Elephants、Her Majesty 的 Servants 等，已有 8 章按现有保留续接）" },
  'tale-fivechildren': { title: 'Five Children and It', author: 'E. Nesbit', pd: '1902，原著 9 章', structure: '原著 9 章逐章简写' },
  'nesbit-amulet': { title: 'The Story of the Amulet', author: 'E. Nesbit', pd: '1906，原著 16 章', structure: '原著 16 章逐章简写' },
  'nesbit-arden': { title: 'The House of Arden', author: 'E. Nesbit', pd: '1908，原著 21 章', structure: '原著 21 章逐章简写' },
  'nesbit-enchanted': { title: 'The Enchanted Castle', author: 'E. Nesbit', pd: '1907，原著 12 章', structure: '原著 12 章逐章简写' },
  'nesbit-phoenix': { title: 'The Phoenix and the Carpet', author: 'E. Nesbit', pd: '1904，原著 12 章', structure: '原著 12 章逐章简写' },
  'tale-northwind': { title: 'At the Back of the North Wind', author: 'George MacDonald', pd: '1871，原著 38 章', structure: '原著 38 章逐章简写' },
  'tale-robinson': { title: 'Robinson Crusoe', author: 'Daniel Defoe', pd: '1719，原著为连续叙事', structure: '重组为 16 章：离家出海/萨利港被俘/逃跑巴西/海难孤岛/建家园/病中反思/环岛勘探/脚印/救星期五/教化星期五/英国船叛乱/平叛夺船/离岛回国/途中历险/归来致富/晚年（以原著完整故事弧为准，现有 4 章保留）' },
  'tale-robinhood': { title: 'The Merry Adventures of Robin Hood', author: 'Howard Pyle', pd: '1883，原著 22 章', structure: '原著 22 章逐章简写' },
  'tale-gulliver': { title: "Gulliver's Travels", author: 'Jonathan Swift', pd: '1726，原著四部 39 章', structure: '按四部合并为 16 章（每部 4 章）：小人国 4 章/大人国 4 章/飞岛国 4 章/慧骃国 4 章，以原著完整情节为准' },
  'tale-railway': { title: 'The Railway Children', author: 'E. Nesbit', pd: '1906，原著 15 章', structure: '原著 15 章逐章简写' },
  'baum-santa': { title: 'The Life and Adventures of Santa Claus', author: 'L. Frank Baum', pd: '1902，原著 3 部分共 22 章', structure: '原著 22 章逐章简写（第一部 infancy 6 章+第二部 manhood 12 章+第三部 immortality 4 章，以原著实际章节为准）' },
  'burgess-cottontail': { title: 'The Adventures of Peter Cottontail', author: 'Thornton W. Burgess', pd: '1914，原著 20 章', structure: '原著 20 章逐章简写' },
  'burgess-reddyfox': { title: 'The Adventures of Reddy Fox', author: 'Thornton W. Burgess', pd: '1913，原著 20 章', structure: '原著 20 章逐章简写' },
  'burgess-westwind': { title: 'Old Mother West Wind', author: 'Thornton W. Burgess', pd: '1910，原著 16 篇短故事', structure: '原著 16 篇逐篇简写（一章一篇）' },
  'gruelle-raggedyann': { title: 'Raggedy Ann Stories', author: 'Johnny Gruelle', pd: '1918，原著 12 章', structure: '原著 12 章逐章简写' },
  'gruelle-raggedyandy': { title: 'Raggedy Andy Stories', author: 'Johnny Gruelle', pd: '1920，原著 14 章', structure: '原著 14 章逐章简写' },
  'wind-willows': { title: 'The Wind in the Willows', author: 'Kenneth Grahame', pd: '1908，原著 12 章', structure: '原著 12 章逐章简写' },
  'wizard-oz': { title: 'The Wonderful Wizard of Oz', author: 'L. Frank Baum', pd: '1900，原著 24 章', structure: '原著 24 章逐章简写' },
  'tale-ozma': { title: 'Ozma of Oz', author: 'L. Frank Baum', pd: '1907，原著 22 章', structure: '原著 22 章逐章简写' },
  'oz-dorothy': { title: 'Dorothy and the Wizard in Oz', author: 'L. Frank Baum', pd: '1908，原著 20 章', structure: '原著 20 章逐章简写' },
  'oz-emerald': { title: 'The Emerald City of Oz', author: 'L. Frank Baum', pd: '1910，原著 20 章', structure: '原著 20 章逐章简写' },
  'oz-glinda': { title: 'Glinda of Oz', author: 'L. Frank Baum', pd: '1920，原著 21 章', structure: '原著 21 章逐章简写' },
  'oz-lostprincess': { title: 'The Lost Princess of Oz', author: 'L. Frank Baum', pd: '1917，原著 19 章', structure: '原著 19 章逐章简写' },
  'oz-magic': { title: 'The Magic of Oz', author: 'L. Frank Baum', pd: '1919，原著 21 章', structure: '原著 21 章逐章简写' },
  'oz-patchwork': { title: 'The Patchwork Girl of Oz', author: 'L. Frank Baum', pd: '1913，原著 27 章', structure: '原著 27 章逐章简写' },
  'oz-rinkitink': { title: 'Rinkitink in Oz', author: 'L. Frank Baum', pd: '1916，原著 24 章', structure: '原著 24 章逐章简写' },
  'oz-road': { title: 'The Road to Oz', author: 'L. Frank Baum', pd: '1909，原著 26 章', structure: '原著 26 章逐章简写' },
  'oz-scarecrow': { title: 'The Scarecrow of Oz', author: 'L. Frank Baum', pd: '1915，原著 24 章', structure: '原著 24 章逐章简写' },
  'oz-tiktok': { title: 'Tik-Tok of Oz', author: 'L. Frank Baum', pd: '1914，原著 18 章', structure: '原著 18 章逐章简写' },
  'oz-tinwoodman': { title: 'The Tin Woodman of Oz', author: 'L. Frank Baum', pd: '1918，原著 18 章', structure: '原著 18 章逐章简写' },
  'aesop-fables': { title: "Aesop's Fables", author: 'Aesop（ Townsend 译本传统）', pd: '古希腊寓言，公版', structure: '每章一则寓言，扩到 25 则：先读现有 5 则（Lion and Mouse/Tortoise and Hare/Boy Who Cried Wolf/Ant and Grasshopper/Fox and Grapes），补 20 则经典（如 The Crow and the Pitcher、The Goose That Laid Golden Eggs、The Dog and His Shadow、The Miller His Son and the Donkey、The Wind and the Sun、Belling the Cat、The City Mouse and the Country Mouse、The Lion and the Boar、The Wolf and the Crane、The Fox and the Stork 等，按经典谱系选）' },
  'lang-blue': { title: 'The Blue Fairy Book', author: 'Andrew Lang (ed.)', pd: '1889', structure: '每章一篇，扩到全 37 篇：先读现有 5 篇（Beauty and the Beast/Ali Baba/Toads and Diamonds/The White Cat/Prince Hyacinth），按 1889 年原书篇目顺序补其余 32 篇（The Bronze Ring、Trusty John、The Yellow Dwarf、East of the Sun and West of the Moon、The Forty Thieves、Felicia and the Pot of Pinks、The Terrible Head、Prince Darling、Blue Beard、Cinderella、Puss in Boots、Rumpelstiltzkin、Fortunatus、Hans in Luck、The Master Maid、The Seven Ravens、The Grateful Beasts、The Giant and the Knave 等按原书实际篇目）' },
  'lang-red': { title: 'The Red Fairy Book', author: 'Andrew Lang (ed.)', pd: '1890', structure: '每章一篇，扩到全 37 篇：先读现有 5 篇避免重复，按 1890 年原书篇目补其余 32 篇（The Twelve Dancing Princesses、The Princess Mayblossom、Soria Moria Castle、The Death of Koschei the Deathless、The Black Thief and Knight of the Glen、The Master Thief、Princess Rosette、The Nettle Spinner、The Enchanted Canary、Rapunzel、Jack and the Beanstalk、Graciosa and Percinet 等按原书实际篇目）' },
  'lang-violet': { title: 'The Violet Fairy Book', author: 'Andrew Lang (ed.)', pd: '1901', structure: '每章一篇，扩到全 30 篇：先读现有 4 篇避免重复，按 1901 年原书篇目补其余 26 篇（A Tale of the Tontlawald、The Finest Liar in the World、The Story of Three Wonderful Beggars、Schippeitaro、The Three Princes and their Beasts、The Goat Ears of the Emperor Trojan 等按原书实际篇目）' },
  'jacobs-english': { title: 'English Fairy Tales', author: 'Joseph Jacobs (ed.)', pd: '1890', structure: '每章一篇，扩到全 43 篇：先读现有 8 篇避免重复，按 1890 年原书篇目补其余 35 篇（Tom Tit Tot、The Three Sillies、The Rose-Tree、The Old Woman and Her Pig、How Jack Went to Seek His Fortune、Mr Vinegar、Nix Nought Nothing、Jack Hannaford、Binnorie、Mouse and Mouser、Cap-O-Rushes、Teeny-Tiny、Jack and the Beanstalk、The Story of the Three Little Pigs、The Master and His Pupil、Tattercoats、The Feather of Finist the Falcon、Jack the Giant-Killer 等按原书实际篇目）' },
  'ozaki-japanese': { title: 'Japanese Fairy Tales', author: 'Yei Theodora Ozaki (ed.)', pd: '1903', structure: '每章一篇，扩到全 22 篇：先读现有 8 篇避免重复，按 1903 年原书篇目补其余 14 篇（My Lord Bag of Rice、The Tongue-Cut Sparrow、The Story of Urashima Taro、The Farmer and the Badger、The Shinansha、The Broken Images、The Goblin Spider 等按原书实际篇目）' },
  'chinfairy-wilhelm': { title: 'The Chinese Fairy Book', author: 'Richard Wilhelm 编/Frederick H. Martens 英译', pd: '1921', structure: '每章一篇，扩到 24 篇：先读现有 8 篇避免重复，从 1921 年原书（Nursery Fairy Tales/ Legends of the Gods/ Tales of Saints and Magicians/ Nature and Animal Tales 等）选经典篇目补 16 篇' },
  'harris-remus': { title: 'Uncle Remus: His Songs and His Sayings', author: 'Joel Chandler Harris', pd: '1881', structure: '每章一则动物故事，扩到 25 则：先读现有 4 则避免重复，按 1881 年初版补其余经典（Uncle Remus Initiates the Little Boy、The Wonderful Tar-Baby Story、Why the Negro Is Black?（跳过种族相关篇）、How Mr. Rabbit Was Too Sharp for Mr. Fox、Story of the Drowned-Man tale? 等按 Brer Rabbit/Brer Fox/Brer Bear 动物故事主线选 21 则）' },
  'tale-grimm3': { title: "Grimm's Fairy Tales III", author: 'Brothers Grimm', pd: '1812 德文初版公版', structure: '每章一篇，扩到 12 篇：先读现有 4 篇（Snow-White and Rose-Red/The Twelve Brothers/The Seven Ravens/The Singing Bone），补 8 篇格林经典（如 The Six Swans、Fundevogel、The Frog King?（若与现有 grimm-frogprince 书重复则跳过）、The Twelve Huntsmen、Jorinda and Jorindel、Hansel?（已另有书）、The Valiant Little Tailor、The Mouse the Bird and the Sausage、Mother Holle、The Seven Swabians 等，选与平台已有单篇书不重复的 8 篇）' },
  'tale-andersen2': { title: 'The Nightingale and Other Tales', author: 'Hans Christian Andersen', pd: '安徒生 1875 卒，公版', structure: '每章一篇，扩到 10 篇：先读现有 8 篇避免重复，补 2 篇安徒生经典（不与平台已有 duckling/emperor/mermaid/thumbelina/snowqueen 重复，如 The Steadfast Tin Soldier、The Little Match Girl 等）' },
  'tale-happyprince': { title: 'The Happy Prince and Other Tales', author: 'Oscar Wilde', pd: 'Wilde 1900 卒，公版', structure: '全 5 篇：先读现有 4 篇（Happy Prince/Nightingale/Selfish Giant?/Devoted Friend?——以实际为准），补缺的第 5 篇' },
  'tale-wonderbook': { title: 'A Wonder-Book for Girls and Boys', author: 'Nathaniel Hawthorne', pd: '1851', structure: '全 6 篇希腊神话改写：先读现有 4 篇（The Gorgon Head/The Golden Touch?/The Paradise of Children/The Three Golden Apples——以实际为准），补缺 2 篇（The Chimaera、The Miraculous Pitcher 之类）' },
  'tale-tanglewood': { title: 'Tanglewood Tales', author: 'Nathaniel Hawthorne', pd: '1853', structure: '全 6 篇：先读现有 4 篇（The Minotaur/The Pygmies/The Dragon Teeth/Circe Palace?——以实际为准），补缺 2 篇（The Pomegranate Seeds、The Golden Fleece 之类）' },
  'just-so': { title: 'Just So Stories', author: 'Rudyard Kipling', pd: '1902', structure: '全 13 篇：先读现有 4 篇避免重复，补其余 9 篇（How the Whale Got His Throat、How the Camel Got His Hump、How the Rhinoceros Got His Skin、The Elephant Child、The Sing-Song of Old Man Kangaroo、The Beginning of the Armadillos、How the First Letter Was Written、How the Alphabet Was Made、The Crab That Played with the Sea、The Cat That Walked by Himself、The Butterfly That Stamped——按原书 13 篇补齐缺的）' },
}

const STRUCT_RULES = `**每章结构规范（严格）**：
- "title": "Chapter N · 标题"（合集类可去掉 Chapter 前缀用篇名，与该书现有格式一致）
- "art": 场景键，命名 <书前缀>-<两个词slug>（如 "oz-poppy-field"、"langb-diamond-toads"），全书唯一、不与 pack 现有 art 名重复（读文件核对）、绝不能用 "lamp-hint"
- "artPrompt": 一句话英文画面描述（生图用：人物+场景+光线+风格，结尾 "storybook illustration"）
- "blocks": 4-7 个块，顺序 text 开头 → 中间恰好 1 个 image 块和 1-2 个 note 块 → text 收尾
  - text 块：简写正文，句子简短（每句 ≤20 词），全章 text 总词数 300-800
  - image 块：{ "kind": "image", "art": "<与本章 art 相同>", "text": "一句话图注" }
  - note 块：模仿该书现有 note 风格（New word: … — … / Talk together: … / Moral: …），art 固定 "lamp-hint"
- 文风与该书现有章节完全一致：简单过去时、对话直引、child-friendly`

const tasks: Array<{ bookId: string; partFile: string; range: string; prompt: string }> = []
for (const [id, packFile, curS, targetS, mode, note, partsS] of rows) {
  const info = BOOK_INFO[id]
  if (!info) { console.error(`!! 缺 BOOK_INFO: ${id}`); continue }
  const cur = Number(curS), target = Number(targetS)
  const parts = partsS.split(';')
  for (const range of parts) {
    const [startS, endS] = range.split("-") as [string, string]
    const start = Number(startS), end = Number(endS)
    const isFirst = parts.indexOf(range) === 0
    const pieces: string[] = []
    pieces.push(`你是童书内容编辑，为儿童阅读产品「桃阅读」补全《${info.title}》（${info.author}，公版）的章节简写版。`)
    pieces.push(`先读 D:\\codesolo\\taoread\\apps\\server\\src\\content\\packs\\${packFile}，理解现有文风、块结构、已有章节覆盖的情节与 art 场景命名（你的 art 名不得与之重复）。`)
    if (mode === 'A' && isFirst) {
      pieces.push(`**任务一（rewriteLast，重写第 ${cur} 章）**：现有第 ${cur} 章是全书结局式收尾，需要重写——先读现有最后两章，判断现有第 ${cur} 章覆盖了原著哪些情节；把它重写为只覆盖原著第 ${cur} 章应有情节位置的过渡章（去掉结局收尾），与前面保留章和后面追加章无缝衔接（不跳跃、不重复）。章节标题格式与现有一致：Chapter ${cur} · <标题>。`)
    }
    pieces.push(`**任务${mode === 'A' && isFirst ? '二' : ''}（chapters，第 ${start}-${end} 章）**：${info.structure}。你负责写第 ${start} 到 ${end} 章（共 ${end - start + 1} 章${end === target ? '，其中最后一章为全书结局' : ''}）。以原著公版文本的实际情节为准，忠于原著、不发明情节、不遗漏关键事件。${note}`)
    pieces.push(`**输出**：写一个 JSON 文件（Write 工具）到 D:\\codesolo\\taoread\\apps\\server\\scripts\\completion\\${id}\\parts\\part-${String(start).padStart(2, '0')}.json：`)
    if (mode === 'A' && isFirst) {
      pieces.push('```json\n{ "rewriteLast": { "title": "Chapter ' + cur + ' · ...", "art": "...", "artPrompt": "...", "blocks": [...] }, "newIntro": "（现有 intro 若明确承诺章数/篇目数则更新为全量版描述，否则省略本字段）", "chapters": [ 第' + start + '章 ... 第' + end + '章 ] }\n```')
    } else {
      pieces.push('```json\n{ "chapters": [ 第' + start + '章 ... 第' + end + '章 ] }\n```')
    }
    pieces.push(STRUCT_RULES)
    pieces.push(`**质量红线**：情节忠于原著公版文本；人名/设定用原著原样；不发明角色或事件；JSON 必须合法（无注释、无尾逗号、双引号键）。\n完成后回复一行：已写 part-${String(start).padStart(2, '0')}.json，共 N 章，总词数约 X。`)
    tasks.push({ bookId: id, partFile: `part-${String(start).padStart(2, '0')}.json`, range, prompt: pieces.join('\n\n') })
  }
}

writeFileSync(join(ROOT, 'dispatch.json'), JSON.stringify(tasks, null, 2))
console.log(`共 ${tasks.length} 个派发任务，${rows.length} 本书`)
for (const t of tasks.slice(0, 5)) console.log(`  ${t.bookId} ${t.partFile} (${t.range})`)
