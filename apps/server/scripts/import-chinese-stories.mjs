/** Import complete, individually licensed Chinese stories; never infer text rights from a site's code license. */
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'

const selected = ['0001', '0004', '0006', '0027', '0087', '0089', '0095', '0110', '0111', '0141', '0147', '0156', '0158', '0201', '0243', '0291', '0294', '0315', '0324', '0064']
const sourceDir = process.argv[2]
const revision = process.argv[3]
if (!sourceDir || !/^[a-f0-9]{40}$/.test(revision ?? '')) throw new Error('Usage: node scripts/import-chinese-stories.mjs <global-asp/zh> <source commit SHA>')
const server = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const sha = (text) => createHash('sha256').update(text).digest('hex')
const packs = []
const evidence = []
const coverSubjects = {
  '0001': '身材特别高的非洲成年男子，头几乎高过小屋屋顶，弯腰才能走进低矮的门，一把太短的锄头靠在旁边，清楚展示身高与物品尺寸的反差。',
  '0004': '非洲乡间道路上三只动物结伴：一只山羊、一只普通棕色家犬、一头水牛；家犬外貌准确，画面体现三位朋友一起走路。',
  '0147': '想象中的动物家人：非洲小男孩和恐龙、鸟、黑猩猩、长颈鹿、猴子、大猩猩、乌龟和蛇在湖边一起生活，温暖友好的奇幻想象。',
  '0201': '非洲民间幻想故事：母亲温柔拥抱她的驴孩子，驴孩子始终是一头灰色小驴，长耳朵和四条腿，保持驴的动物形态；以接纳和关爱为主题。',
  '0006': 'A wordless illustration-only watercolor scene: a friendly eight-legged spider with a clay pot of wisdom on its back climbing an African acacia tree; a smaller spider watches below. The entire composition is pictorial, with continuous foliage in the upper part.',
  '0111': 'A wordless illustration-only watercolor scene: a friendly hippopotamus and a rabbit beside an African river in warm daylight, grass and acacia trees framing the animals. The upper part contains continuous tree foliage and sky.',
}
const sceneSubjects = {
  '0087:3': 'A wordless illustration-only watercolor scene: a little African girl holds an open picture book while her mother and grandmother are busy doing housework nearby. She looks for someone to read to. Show their actions through facial expressions and gestures, with an uninterrupted painted environment.',
  '0201:6': 'A wordless illustration-only watercolor scene: an African mother accepts her gray donkey child and gently feeds it outside a small home. The donkey has long ears and four legs, while the mother is human. Depict affection through gestures in an uninterrupted painted scene.',
}
const characters = {
  '0001': '主角是一位身材特别高的非洲成年男子，身高明显高过低矮的小屋门，成年人外貌，物品太短太小形成有趣反差。',
  '0004': '动物主角严格为一只山羊、一只普通棕色家犬和一头水牛；狗保持普通家犬的外貌。',
  '0006': '阿南西是一只友好的拟人蜘蛛，有八条腿，背着一个陶制砂锅；他的儿子也是小蜘蛛。蜘蛛在树上分享智慧的民间故事，蜘蛛神始终保持蜘蛛形态。',
  '0141': '角色是拟人鸡、千足虫和千足虫妈妈，千足虫身体长且分节，有很多小腿；动物角色踢足球，动物之间的冲突用温和象征画面表现。',
  '0201': '驴孩子是一头灰色小驴，有长耳朵和四条腿，全书始终保持驴的动物形态；母亲和帮助他的老人是非洲成年人，主题是不被理解的小驴逐渐得到接纳。',
}
for (const number of selected) {
  const files = readdirSync(sourceDir).filter((f) => f.startsWith(`${number}_`) && f.endsWith('.md'))
  if (files.length !== 1) throw new Error(`Expected one source for ${number}`)
  const file = files[0]
  const raw = readFileSync(resolve(sourceDir, file), 'utf8')
  const normalized = raw.replace(/\r\n/g, '\n')
  const licenseAt = normalized.indexOf('* License:')
  if (licenseAt < 0) throw new Error(`Missing license: ${file}`)
  const fields = Object.fromEntries([...normalized.slice(licenseAt).matchAll(/^\* (\w+):\s*(.+)$/gm)].map((m) => [m[1], m[2].trim()]))
  if (fields.License !== '[CC-BY]' || fields.Language !== 'zh' || !fields.Text || !fields.Translation) throw new Error(`Unsupported/incomplete attribution: ${file}`)
  const title = normalized.split('\n')[0].replace(/^#\s*/, '').trim()
  const pages = normalized.slice(normalized.indexOf('\n##'), licenseAt).split(/^##\s*$/m).map((p) => p.trim()).filter(Boolean)
  if (!pages.length || pages.some((p) => /^\*/m.test(p))) throw new Error(`Invalid pages: ${file}`)
  const id = `zh-asb-${number}`
  const chapters = []
  for (let i = 0; i < pages.length; i += 3) {
    const group = pages.slice(i, i + 3)
    const scene = `${id}:pages-${i + 1}-${i + group.length}`
    chapters.push({ title: `第 ${i + 1}—${i + group.length} 页`, art: scene,
      artPrompt: sceneSubjects[`${number}:${i}`] ?? `${characters[number] ?? ''}《${title}》故事绘本，人物外貌和衣着在全书保持一致，采用故事的非洲生活环境。画面表现这几页中最主要的动作：${group.join(' ')}。画面温暖友好，避免伤害特写。`,
      blocks: [{ kind: 'image', art: scene, text: `${title} · 第 ${i + 1}—${i + group.length} 页插图` }, ...group.map((text) => ({ kind: 'text', text }))] })
  }
  const sourceUrl = `https://github.com/global-asp/global-asp/blob/${revision}/zh/${encodeURIComponent(file)}`
  const level = ['0111', '0201', '0315'].includes(number) ? '9-12' : pages.join('').length > 350 ? '6-8' : '3-5'
  const readingNotes = {
    '0141': '这是动物民间故事。输赢都不应该成为伤害朋友的理由；争吵时可以先停下来，请大人帮助。故事中的动物做法不能模仿。',
    '0111': '这是解释动物外形的民间想象，不是科学解释。河马的毛发本来就稀少。生气也不能用火伤害别人，可以请大人帮助说清楚。',
    '0201': '这是虚构童话，驴孩子用想象表达了不被理解时的难过。现实里，每个孩子都值得被接纳；生气时不要踢打，可以告诉信任的大人。',
    '0315': '歌声可以安慰别人，但不能治疗眼病。视力问题需要医生诊断，治疗结果也不能保证。我们可以欣赏萨可满的才能，不用视力是否恢复来判断他是否值得尊重。',
  }
  if (readingNotes[number]) chapters.at(-1).blocks.push({ kind: 'note', text: readingNotes[number], art: 'lamp-hint' })
  packs.push({ id, title, author: `${fields.Text} · ${fields.Translation} 译`, lang: 'zh', category: 'story', ageStage: level,
    intro: `${pages[0]}（完整故事，共 ${pages.length} 页；本版每三页合为一节，配桃阅读 AI 插图。）`,
    coverArt: `cover:${id}`, coverArtPrompt: coverSubjects[number] ?? `《${title}》完整故事封面，非洲生活环境，人物与各节一致，画面内容依据：${pages.slice(0, 3).join(' ')}。温暖友好的儿童绘本插画，纯画面。`,
    coverFrom: '#F6C667', coverTo: '#8ED4C2', source: `非洲故事书项目／Global ASP 中文译本，CC BY 4.0，完整 ${pages.length} 页；桃阅读重新编排及 AI 配图`, chapters,
    rights: { workTitle: title, author: fields.Text, translator: fields.Translation, jurisdiction: 'CN', basis: 'cc-by', sourceUrl,
      note: `原文与中文译文授权：Creative Commons Attribution 4.0（https://creativecommons.org/licenses/by/4.0/）。原版插画作者：${fields.Illustration || '源文件未注明'}；本版未复制原插画，插图由桃阅读 AI 生成。保留原译文全部 ${pages.length} 页，未删节；仅重排章节。原故事项目：https://africanstorybook.org/；源版本 ${revision}。` } })
  evidence.push({ id, title, sourceUrl, revision, sourceFile: file, sourceSha256: sha(normalized), sourceLineEndings: 'LF', pages: pages.length, textSha256: sha(pages.join('\n\n')), author: fields.Text, translator: fields.Translation, license: 'CC-BY-4.0' })
}
writeFileSync(resolve(server, 'src/content/packs/chinese-open-stories.ts'), `// Generated by scripts/import-chinese-stories.mjs; complete CC-BY Chinese source texts.\nimport type { PackBook } from '../types'\n\nexport const chineseOpenStories: PackBook[] = ${JSON.stringify(packs, null, 2)}\n`)
const evidenceDir = resolve(server, 'scripts/corpus-data')
mkdirSync(evidenceDir, { recursive: true })
writeFileSync(resolve(evidenceDir, 'chinese-stories-20261009.json'), JSON.stringify(evidence, null, 2) + '\n')
console.log(`Imported ${packs.length} complete Chinese stories, ${evidence.reduce((n, s) => n + s.pages, 0)} source pages, ${packs.reduce((n, p) => n + p.chapters.length + 1, 0)} illustrations required`)
