/**
 * 2026-10-25 找故事全量补全规格生成器。
 * 输入：下方 BOOKS 书单（第一性原理盘点：现有 pack 均为原著 3-8 章节选简写本，
 *   对照公版原著全章数逐本定目标）。
 * 输出：scripts/completion/spec.tsv（id/file/cur/target/mode/parts）+ 每书 meta.json。
 *
 * mode:
 *  A = rewrite-tail  现有末章已写到结局 → 保留前 cur-1 章，重写末章为原著同位置过渡情节，追加至 target
 *  B = append        现有末章在中途 → 原样保留全部 cur 章，追加至 target
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), 'completion')

/** [id, packFile, cur, target, mode, note] */
const BOOKS: Array<[string, string, number, number, 'A' | 'B', string]> = [
  // ── 长篇小说（novel，按原著全章数）──
  ['alcott-littlewomen', 'alcott-littlewomen.ts', 5, 47, 'A', ''],
  ['alcott-littlemen', 'alcott-littlemen.ts', 5, 21, 'A', ''],
  ['alcott-oldfashioned', 'alcott-oldfashioned.ts', 5, 33, 'A', ''],
  ['alice-wonderland', 'tale-alice.ts', 3, 12, 'B', ''],
  ['tale-lookingglass', 'tale-lookingglass.ts', 6, 12, 'A', ''],
  ['peter-pan', 'tale-peterpan.ts', 3, 17, 'B', ''],
  ['heidi', 'tale-heidi.ts', 8, 23, 'A', ''],
  ['tale-secretgarden', 'tale-secretgarden.ts', 8, 27, 'B', ''],
  ['tale-littleprincess', 'tale-littleprincess.ts', 8, 19, 'B', ''],
  ['tale-anne', 'tale-anne.ts', 5, 38, 'A', ''],
  ['montgomery-avonlea', 'montgomery-avonlea.ts', 8, 38, 'A', ''],
  ['tale-tomsawyer', 'tale-tomsawyer.ts', 8, 35, 'B', ''],
  ['twain-pauper', 'twain-pauper.ts', 7, 33, 'A', ''],
  ['tale-treasure', 'tale-treasure.ts', 8, 34, 'B', ''],
  ['pinocchio', 'tale-pinocchio.ts', 8, 36, 'B', ''],
  ['porter-pollyanna', 'porter-pollyanna.ts', 8, 32, 'A', ''],
  ['wiggin-rebecca', 'wiggin-rebecca.ts', 8, 23, 'A', ''],
  ['black-beauty', 'tale-blackbeauty.ts', 4, 49, 'B', ''],
  ['burnett-fauntleroy', 'burnett-fauntleroy.ts', 5, 15, 'A', ''],
  ['tale-dolittle', 'tale-dolittle.ts', 5, 12, 'A', ''],
  ['tale-dolittlevoyage', 'tale-dolittlevoyage.ts', 5, 20, 'A', ''],
  ['macdonald-curdie', 'macdonald-curdie.ts', 5, 32, 'A', ''],
  ['tale-princessgoblin', 'tale-princessgoblin.ts', 5, 32, 'A', ''],
  ['kingsley-waterbabies', 'kingsley-waterbabies.ts', 6, 9, 'A', ''],
  ['lagerlof-nils', 'lagerlof-nils.ts', 6, 55, 'A', ''],
  ['kipling-puck', 'kipling-puck.ts', 3, 11, 'A', ''],
  ['kipling-jungle2', 'kipling-jungle2.ts', 8, 15, 'B', ''],
  ['jungle-book', 'tale-junglebook.ts', 8, 15, 'B', ''],
  ['tale-fivechildren', 'tale-fivechildren.ts', 5, 9, 'A', ''],
  ['nesbit-amulet', 'nesbit-amulet.ts', 5, 16, 'A', ''],
  ['nesbit-arden', 'nesbit-arden.ts', 5, 21, 'A', ''],
  ['nesbit-enchanted', 'nesbit-enchanted.ts', 5, 12, 'A', ''],
  ['nesbit-phoenix', 'nesbit-phoenix.ts', 5, 12, 'A', ''],
  ['tale-northwind', 'tale-northwind.ts', 5, 38, 'B', ''],
  ['tale-robinson', 'tale-robinson.ts', 5, 16, 'A', ''],
  ['tale-robinhood', 'tale-robinhood.ts', 5, 22, 'A', ''],
  ['tale-gulliver', 'tale-gulliver.ts', 5, 16, 'B', '原著 39 章按四部合并为 16 章（每部 4 章）'],
  ['tale-railway', 'tale-railway.ts', 6, 15, 'A', ''],
  ['baum-santa', 'baum-santa.ts', 6, 22, 'A', ''],
  ['burgess-cottontail', 'burgess-cottontail.ts', 6, 20, 'A', ''],
  ['burgess-reddyfox', 'burgess-reddyfox.ts', 6, 20, 'A', ''],
  ['burgess-westwind', 'burgess-westwind.ts', 6, 16, 'A', ''],
  ['gruelle-raggedyann', 'gruelle-raggedyann.ts', 4, 12, 'A', ''],
  ['gruelle-raggedyandy', 'gruelle-raggedyandy.ts', 4, 14, 'A', ''],
  ['wind-willows', 'tale-windwillows.ts', 4, 12, 'B', ''],
  // ── Oz 系列（Baum，每本原著全章数）──
  ['wizard-oz', 'tale-oz.ts', 5, 24, 'A', ''],
  ['tale-ozma', 'tale-ozma.ts', 6, 22, 'A', ''],
  ['oz-dorothy', 'oz-dorothy.ts', 5, 20, 'A', ''],
  ['oz-emerald', 'oz-emerald.ts', 5, 20, 'A', ''],
  ['oz-glinda', 'oz-glinda.ts', 5, 21, 'A', ''],
  ['oz-lostprincess', 'oz-lostprincess.ts', 5, 19, 'A', ''],
  ['oz-magic', 'oz-magic.ts', 5, 21, 'A', ''],
  ['oz-patchwork', 'oz-patchwork.ts', 5, 27, 'A', ''],
  ['oz-rinkitink', 'oz-rinkitink.ts', 5, 24, 'A', ''],
  ['oz-road', 'oz-road.ts', 5, 26, 'A', ''],
  ['oz-scarecrow', 'oz-scarecrow.ts', 5, 24, 'A', ''],
  ['oz-tiktok', 'oz-tiktok.ts', 5, 18, 'A', ''],
  ['oz-tinwoodman', 'oz-tinwoodman.ts', 5, 18, 'A', ''],
  // ── 合集（一章一篇/一则）──
  ['aesop-fables', 'tale-aesop.ts', 5, 25, 'B', '每章一则寓言；补齐经典 20 则（ Tortoise/Grasshopper 等已有 5 则之外）'],
  ['lang-blue', 'lang-blue.ts', 5, 37, 'B', 'The Blue Fairy Book 全 37 篇，一章一篇；先读现有 5 篇避免重复'],
  ['lang-red', 'lang-red.ts', 5, 37, 'B', 'The Red Fairy Book 全 37 篇，一章一篇；先读现有 5 篇避免重复'],
  ['lang-violet', 'lang-violet.ts', 4, 30, 'B', 'The Violet Fairy Book 全 30 篇，一章一篇；先读现有 4 篇避免重复'],
  ['jacobs-english', 'jacobs-english.ts', 8, 43, 'B', 'English Fairy Tales (Jacobs 1890) 全 43 篇，一章一篇；先读现有 8 篇避免重复'],
  ['ozaki-japanese', 'ozaki-japanese.ts', 8, 22, 'B', 'Japanese Fairy Tales (Ozaki 1903) 全 22 篇，一章一篇；先读现有 8 篇避免重复'],
  ['chinfairy-wilhelm', 'chinfairy-wilhelm.ts', 8, 24, 'B', 'The Chinese Fairy Book (Wilhelm/Martens 1921) 补至 24 篇，一章一篇；先读现有 8 篇避免重复，选公版经典篇目'],
  ['harris-remus', 'harris-remus.ts', 4, 25, 'B', 'Uncle Remus (Harris 1881) 初版 25 则动物故事，一章一则；先读现有 4 则避免重复'],
  ['tale-grimm3', 'tale-grimm3.ts', 4, 12, 'B', 'Grimm 童话第三册补至 12 篇，一章一篇；先读现有 4 篇避免重复'],
  ['tale-andersen2', 'tale-andersen2.ts', 8, 10, 'B', '安徒生精选补至 10 篇，一章一篇；先读现有 8 篇避免重复'],
  ['tale-happyprince', 'tale-happyprince.ts', 4, 5, 'B', 'Wilde 1888 全 5 篇；先读现有 4 篇，补缺的那篇'],
  ['tale-wonderbook', 'tale-wonderbook.ts', 4, 6, 'B', 'A Wonder-Book for Girls and Boys 全 6 篇希腊神话；先读现有 4 篇，补缺 2 篇'],
  ['tale-tanglewood', 'tale-tanglewood.ts', 4, 6, 'B', 'Tanglewood Tales 全 6 篇；先读现有 4 篇，补缺 2 篇'],
  ['just-so', 'tale-justso.ts', 4, 13, 'B', 'Just So Stories 全 13 篇；先读现有 4 篇避免重复'],
]

function splitParts(cur: number, target: number, mode: 'A' | 'B'): string {
  // A 类：rewriteLast(1) + 追加 (target-cur) 章 = target-cur+1 章；B 类：追加 target-cur 章
  const total = mode === 'A' ? target - cur + 1 : target - cur
  const parts: string[] = []
  const per = Math.max(6, Math.ceil(total / Math.ceil(total / 13)))
  let s = mode === 'A' ? cur : cur + 1
  while (s <= target) {
    const e = Math.min(target, s + per - 1)
    parts.push(`${s}-${e}`)
    s = e + 1
  }
  return parts.join(';')
}

const lines = ['id\tpackFile\tcur\ttarget\tmode\tnote\tparts']
for (const [id, file, cur, target, mode, note] of BOOKS) {
  const parts = splitParts(cur, target, mode)
  lines.push([id, file, cur, target, mode, note, parts].join('\t'))
  const dir = join(root, id)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'meta.json'), JSON.stringify({ id, packFile: file, cur, target, mode, note, parts: parts.split(';') }, null, 2))
  // parts 占位清单，代理完成一个 part 写 done 标记由 part 文件存在表示
  console.log(`${id}: cur=${cur} target=${target} mode=${mode} parts=${parts}`)
}
writeFileSync(join(root, 'spec.tsv'), lines.join('\n') + '\n')
console.log(`\n共 ${BOOKS.length} 本；新增章合计 ${BOOKS.reduce((n, b) => n + (b[4] === 'A' ? b[3] - b[2] + 1 : b[3] - b[2]), 0)}`)
