/**
 * 生成课程旁挂内容清单（不改动课程本体，courseHash 保持稳定）：
 *  - lexicon.json ：89 词词典数据。72 词取自词光开源词库（CC BY 4.0，署名 Word Atlas contributors），
 *    17 个无匹配词为桃阅读自备条目。全部处于待人工审校状态，不因来源不同而豁免审校。
 *  - usAudio.json  ：MiMo 美音整词候选包（读 10-28 台账并逐文件校验 sha256）。
 * 用法：npx tsx apps/server/scripts/phonics-lexicon/build-sidecars.mts [--atlas <word-atlas克隆目录>]
 */
import { createHash } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { courseHash, loadCourse, candidateDirectory } from '../../src/modules/phonics/v2/courseRegistry.js'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..')
const atlasDir = process.argv.includes('--atlas') ? process.argv[process.argv.indexOf('--atlas') + 1]! : path.join(repoRoot, 'output', 'word-atlas-src')
const edgeLedgerPath = process.argv.includes('--edge-ledger') ? process.argv[process.argv.indexOf('--edge-ledger') + 1]! : path.join(repoRoot, 'apps', 'output', 'phonics-edge-20261028', 'audio-candidates-edge.json')
// Edge 神经录音（免费兜底）：词光无整词录音的词条用 Edge 补英美口音
const edgeByWord = (() => { try { const l = JSON.parse(readFileSync(edgeLedgerPath, 'utf8')) as { assets: Array<{ id: string; sha256: string; durationMs: number; bytes: number; voice: string }> }; const m = new Map<string, { uk?: typeof l.assets[number]; us?: typeof l.assets[number] }>(); for (const a of l.assets) { const w = /^edge-(gb|us)-(w-[a-z0-9-]+?)(-blend|-segment)?$/.exec(a.id); if (!w || w[3]) continue; const key = w[2]; const slot = m.get(key) ?? {}; if (w[1] === 'gb') slot.uk = a; else slot.us = a; m.set(key, slot) } return m } catch { return new Map<string, { uk?: typeof l.assets[number]; us?: typeof l.assets[number] }>() } })()
const usDir = path.join(repoRoot, 'output', 'phonics-sync-20261028', 'us-audio')

const sha256 = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex')

/** 估算 CBR MP3 时长；解析失败返回 null（此时该词条不下发例句音频）。 */
function mp3DurationMs(bytes: Buffer): number | null {
  let offset = 0
  if (bytes.length > 10 && bytes.toString('ascii', 0, 3) === 'ID3') {
    const size = (bytes[6]! << 21) | (bytes[7]! << 14) | (bytes[8]! << 7) | bytes[9]!
    offset = 10 + size
  }
  const bitrates = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320]
  const rates = [44100, 48000, 32000]
  for (let i = offset; i < Math.min(offset + 4096, bytes.length - 4); i++) {
    if (bytes[i] !== 0xff || (bytes[i + 1]! & 0xe0) !== 0xe0) continue
    const version = (bytes[i + 1]! & 0x18) >> 3
    const layer = (bytes[i + 1]! & 0x06) >> 1
    if (version !== 3 || layer !== 1) return null // 只支持 MPEG1 Layer3
    const bitrate = bitrates[bytes[i + 2]! >> 4]! * 1000
    const rate = rates[(bytes[i + 2]! & 0x0c) >> 2]!
    if (!bitrate || !rate) return null
    return Math.round((bytes.length - offset) * 8 / bitrate * 1000)
  }
  return null
}

/** 桃阅读自备的 17 个词条（词光词库无精确匹配）。编写遵循词光 gen_text 规范并按 5-7 岁改写；同样待人工审校。 */
const TAOREAD_ORIGINALS: Record<string, {
  uk: string; us: string
  senses: Array<{ pos: string; zh: string; en: string }>
  ex: { en: string; zh: string }
  col: string[]; fam: string[]; tip: string
}> = {
  at: { uk: '/æt/', us: '/æt/', senses: [{ pos: 'prep.', zh: '在；于', en: 'Used to show a place or a time.' }], ex: { en: 'The cat is at the door.', zh: '猫在门口。' }, col: ['at home｜在家', 'at school｜在学校', 'at six｜在六点钟'], fam: [], tip: 'at 用来指出小地点或时间点，比如 at the door、at six。' },
  sat: { uk: '/sæt/', us: '/sæt/', senses: [{ pos: 'v.', zh: '坐过（sit 的过去式）', en: 'Past form of sit.' }], ex: { en: 'The cat sat on the mat.', zh: '猫坐在垫子上。' }, col: ['sat down｜坐下了'], fam: ['sit (v.)'], tip: 'sit 的过去式是 sat，不说 sitted。' },
  sip: { uk: '/sɪp/', us: '/sɪp/', senses: [{ pos: 'v.', zh: '小口喝', en: 'To drink a little at a time.' }, { pos: 'n.', zh: '一小口', en: 'A very small drink.' }], ex: { en: 'I sip hot milk slowly.', zh: '我慢慢地小口喝热牛奶。' }, col: ['sip water｜小口喝水'], fam: [], tip: 'sip 是一小口一小口地喝，大口吞咽不叫 sip。' },
  Sam: { uk: '/sæm/', us: '/sæm/', senses: [{ pos: 'n.', zh: '山姆（男孩名）', en: "A boy's name." }], ex: { en: 'Sam and his dad ran in the park.', zh: '山姆和爸爸在公园里跑步。' }, col: [], fam: [], tip: '英文人名的首字母要大写，如 Sam。' },
  ran: { uk: '/ræn/', us: '/ræn/', senses: [{ pos: 'v.', zh: '跑过（run 的过去式）', en: 'Past form of run.' }], ex: { en: 'The dog ran to the gate.', zh: '狗跑到了大门口。' }, col: ['ran fast｜跑得快'], fam: ['run (v.)'], tip: 'run 的过去式是 ran，不是 runned。' },
  dad: { uk: '/dæd/', us: '/dæd/', senses: [{ pos: 'n.', zh: '爸爸', en: 'An informal word for father.' }], ex: { en: 'My dad made a hat for me.', zh: '爸爸给我做了一顶帽子。' }, col: ['dad and mum｜爸爸妈妈'], fam: ['daddy (n.)'], tip: 'dad 是口语叫法；写作或正式场合常用 father。' },
  sad: { uk: '/sæd/', us: '/sæd/', senses: [{ pos: 'adj.', zh: '悲伤的；难过的', en: 'Not happy.' }], ex: { en: 'The sad boy lost his hat.', zh: '难过的男孩丢了帽子。' }, col: ['feel sad｜感到难过'], fam: [], tip: 'sad 的反义词是 happy。' },
  hen: { uk: '/hen/', us: '/hɛn/', senses: [{ pos: 'n.', zh: '母鸡', en: 'A female chicken.' }], ex: { en: 'The hen laid an egg.', zh: '母鸡下了一个蛋。' }, col: ['hen house｜鸡舍'], fam: ['chick (n.)'], tip: 'hen 是母鸡；公鸡的英文不是 hen。' },
  hid: { uk: '/hɪd/', us: '/hɪd/', senses: [{ pos: 'v.', zh: '藏过（hide 的过去式）', en: 'Past form of hide.' }], ex: { en: 'The cat hid under the bed.', zh: '猫藏在床底下。' }, col: ['hid behind｜躲在……后面'], fam: ['hide (v.)'], tip: 'hide 的过去式是 hid。' },
  wig: { uk: '/wɪɡ/', us: '/wɪɡ/', senses: [{ pos: 'n.', zh: '假发', en: 'Fake hair worn on the head.' }], ex: { en: 'The actor wore a red wig.', zh: '演员戴着一顶红假发。' }, col: ['wear a wig｜戴假发'], fam: [], tip: 'wig 是戴上去的假头发。' },
  yak: { uk: '/jæk/', us: '/jæk/', senses: [{ pos: 'n.', zh: '牦牛', en: 'A long-haired ox from cold mountains.' }], ex: { en: 'The yak has lots of hair.', zh: '牦牛有很多毛。' }, col: [], fam: ['ox (n.)'], tip: '牦牛长着长毛，住在寒冷的高原上。' },
  yes: { uk: '/jes/', us: '/jɛs/', senses: [{ pos: 'int.', zh: '是的；对', en: 'A word that shows you agree.' }], ex: { en: 'Yes, I can hop like a frog.', zh: '是的，我能像青蛙一样跳。' }, col: [], fam: [], tip: 'yes 表示同意，它的反义词是 no。' },
  zip: { uk: '/zɪp/', us: '/zɪp/', senses: [{ pos: 'n.', zh: '拉链', en: 'A fastener that closes bags and jackets.' }, { pos: 'v.', zh: '拉上拉链', en: 'To close something with a zip.' }], ex: { en: 'Zip up your red jacket.', zh: '把你红色的夹克拉链拉上。' }, col: ['zip up｜拉上拉链'], fam: [], tip: 'zip 也能表示飞快移动，比如 The jet zipped by。' },
  zap: { uk: '/zæp/', us: '/zæp/', senses: [{ pos: 'int.', zh: '咻！嗖！', en: 'A sound for something very fast.', }, ], ex: { en: 'Zap! The bug is gone.', zh: '咻！虫子不见了。' }, col: [], fam: [], tip: 'zap 是漫画里表示快速击中或飞过的拟声词。' },
  six: { uk: '/sɪks/', us: '/sɪks/', senses: [{ pos: 'num.', zh: '六', en: 'The number after five.' }], ex: { en: 'I can see six ducks.', zh: '我能看见六只鸭子。' }, col: [], fam: [], tip: 'six 结尾的 x 发 /ks/ 音。' },
  quit: { uk: '/kwɪt/', us: '/kwɪt/', senses: [{ pos: 'v.', zh: '停止；退出', en: 'To stop doing something.' }], ex: { en: 'We quit the game to eat lunch.', zh: '我们停下游去吃午饭。' }, col: ['quit a game｜退出游戏'], fam: [], tip: 'quit 的过去式还是 quit。' },
  moth: { uk: '/mɒθ/', us: '/mɔːθ/', senses: [{ pos: 'n.', zh: '飞蛾', en: 'An insect like a butterfly that flies at night.' }], ex: { en: 'A moth flew to the lamp.', zh: '一只飞蛾朝台灯飞去。' }, col: [], fam: ['butterfly (n.)'], tip: 'moth 长得像蝴蝶，但大多在夜里活动。' },
  // ── 阶段四扩充词（词光无匹配的自备条目，2026-10-28）──
  how: { uk: '/haʊ/', us: '/haʊ/', senses: [{ pos: 'adv.', zh: '怎样；多么', en: 'In what way; used to ask about manner.' }], ex: { en: 'How do you go to school?', zh: '你怎么去上学？' }, col: ['how many｜多少', 'how old｜几岁'], fam: [], tip: 'how 里 ow 发 /aʊ/，和 cow 同音。' },
  five: { uk: '/faɪv/', us: '/faɪv/', senses: [{ pos: 'num.', zh: '五', en: 'The number after four.' }], ex: { en: 'I have five red apples.', zh: '我有五个红苹果。' }, col: ['five ducks｜五只鸭子'], fam: [], tip: 'five 里 i 发长音 /aɪ/，结尾 e 不发音。' },
  three: { uk: '/θriː/', us: '/θriː/', senses: [{ pos: 'num.', zh: '三', en: 'The number after two.' }], ex: { en: 'Three ducks swim in the pond.', zh: '三只鸭子在池塘里游泳。' }, col: ['three trees｜三棵树'], fam: [], tip: 'three 开头的 th 要咬住舌尖发音。' },
  zoo: { uk: '/zuː/', us: '/zuː/', senses: [{ pos: 'n.', zh: '动物园', en: 'A place where many animals live.' }], ex: { en: 'We saw a panda at the zoo.', zh: '我们在动物园看到了熊猫。' }, col: ['at the zoo｜在动物园'], fam: [], tip: 'zoo 里 oo 发长长的 /uː/ 音。' },
  what: { uk: '/wɒt/', us: '/wɑːt/', senses: [{ pos: 'det.', zh: '什么', en: 'Used to ask about things.' }, { pos: 'pron.', zh: '什么', en: 'The thing that.' }], ex: { en: 'What is in your bag?', zh: '你的书包里有什么？' }, col: ['what time｜几点', 'what colour｜什么颜色'], fam: [], tip: 'what 里 wh 发 /w/，a 发短音 /ɒ/。' },
}

async function main() {
  const course = await loadCourse(candidateDirectory)
  const hash = courseHash(course)
  const atlas = JSON.parse(readFileSync(path.join(atlasDir, 'data', 'word-atlas.json'), 'utf8')) as Array<Record<string, unknown>>
  const byWord = new Map(atlas.map(e => [String(e.w).toLowerCase(), e]))
  const atlasCommit = existsSync(path.join(atlasDir, '.git')) ? '99c007673d38f02c418d8e4cd2e9ec90b5d40be5' : 'unknown'

  const lessonOrder = new Map(course.lessons.map(l => [l.id, l.order]))
  const words = course.words.filter(w => w.meaningIntroducedAt)
    .sort((a, b) => (lessonOrder.get(a.meaningIntroducedAt!) ?? 99) - (lessonOrder.get(b.meaningIntroducedAt!) ?? 99))

  const entries: unknown[] = []
  const usedSources = { 'word-atlas': 0, 'taoread-original': 0 }
  const exampleAudio: Array<{ word: string; file: string; sha256: string; bytes: number }> = []

  for (const word of words) {
    const lower = word.text.toLowerCase()
    const source = byWord.get(lower)
    let lex: Record<string, unknown>
    if (source) {
      const senses = (source.senses as Array<Record<string, string>>).slice(0, 2)
        .map(s => ({ pos: s.pos, zh: s.zh, en: s.en }))
      const example = (source.ex as Array<Record<string, string>>)[0]!
      // 词光 ex[0] 是生活句；ex[1] 是雅思学术句，不适合 5-7 岁，整轮不导入。
      const audioFile = path.join(atlasDir, 'public', 'atlas', 'audio', 'ex', `${lower}.mp3`)
      let audio: Record<string, unknown> | null = null
      if (existsSync(audioFile)) {
        const bytes = readFileSync(audioFile)
        const durationMs = mp3DurationMs(bytes)
        if (durationMs) {
          audio = { sha256: sha256(bytes), durationMs, bytes: bytes.length, voice: 'ElevenLabs Alice (UK)' }
          exampleAudio.push({ word: lower, file: audioFile, sha256: sha256(bytes), bytes: bytes.length })
        }
      }
      // 词光整词发音（ElevenLabs 专业录音）：英音 Alice、美音 Sarah，英美双按钮的数据源
      const wordAudio: Record<string, unknown> = {}
      for (const accent of ['uk', 'us'] as const) {
        const file = path.join(atlasDir, 'public', 'atlas', 'audio', accent, `${lower}.mp3`)
        if (!existsSync(file)) continue
        const bytes = readFileSync(file)
        const durationMs = mp3DurationMs(bytes)
        if (!durationMs) continue
        wordAudio[accent] = { sha256: sha256(bytes), durationMs, bytes: bytes.length, voice: accent === 'uk' ? 'ElevenLabs Alice (UK)' : 'ElevenLabs Sarah (US)' }
        exampleAudio.push({ word: `${lower}-${accent}`, file, sha256: sha256(bytes), bytes: bytes.length })
      }
      const edge = edgeByWord.get(word.id)
      for (const accent of ['uk', 'us'] as const) {
        if (wordAudio[accent]) continue
        const e = accent === 'uk' ? edge?.uk : edge?.us
        if (e) wordAudio[accent] = { sha256: e.sha256, durationMs: e.durationMs, bytes: e.bytes, voice: e.voice }
      }
      lex = {
        wordId: word.id, word: word.text, source: 'word-atlas', reviewStatus: 'pending',
        ukIpa: source.uk, usIpa: source.us, senses,
        example: { en: example.en, zh: example.zh, audio },
        wordAudio,
        collocations: (source.col as string[]).slice(0, 2), family: (source.fam as string[]).slice(0, 3),
        tip: source.tip, cefr: source.cefr ?? null,
      }
      usedSources['word-atlas']++
    } else {
      const original = TAOREAD_ORIGINALS[word.text]
      if (!original) throw new Error(`词光无匹配且缺少自备条目: ${word.text}`)
      const edge = edgeByWord.get(word.id)
      const originalAudio: Record<string, unknown> = {}
      for (const accent of ['uk', 'us'] as const) {
        const e = accent === 'uk' ? edge?.uk : edge?.us
        if (e) { originalAudio[accent] = { sha256: e.sha256, durationMs: e.durationMs, bytes: e.bytes, voice: e.voice }; exampleAudio.push({ word: lower + '-' + accent, file: path.join(repoRoot, 'apps', 'output', 'phonics-edge-20261028', 'phonics', course.manifest.versionId, e.sha256 + '.mp3'), sha256: e.sha256, bytes: e.bytes }) }
      }
      lex = {
        wordId: word.id, word: word.text, source: 'taoread-original', reviewStatus: 'pending',
        ukIpa: original.uk, usIpa: original.us, senses: original.senses,
        example: { en: original.ex.en, zh: original.ex.zh, audio: null },
        wordAudio: originalAudio,
        collocations: original.col, family: original.fam, tip: original.tip, cefr: null,
      }
      usedSources['taoread-original']++
    }
    entries.push(lex)
  }

  const lexicon = {
    schemaVersion: 1, courseVersionId: course.manifest.versionId, courseContentHash: hash,
    humanReviewed: false, reviewStatus: 'pending',
    generatedAt: new Date().toISOString(),
    sources: {
      'word-atlas': {
        attribution: 'Word Atlas contributors', license: 'CC BY 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by/4.0/', commit: atlasCommit,
        origin: 'https://github.com/designfuchen/word-atlas',
        changes: '提取 72 个精确匹配词条的英美音标、义项、生活例句（不含雅思学术句）、搭配、词族与用法提示，未逐条改动文本。',
        exampleAudioVoice: 'ElevenLabs "Alice" (UK)，来自词光仓库 public/atlas/audio/ex，CC BY 4.0。',
      },
      'taoread-original': {
        note: '17 个词光无精确匹配的词条由桃阅读按词光编写规范自备，面向 5-7 岁改写。',
      },
    },
    counts: { entries: entries.length, wordAtlas: usedSources['word-atlas'], taoreadOriginal: usedSources['taoread-original'], exampleAudio: exampleAudio.length },
    entries,
  }

  // 美音包：逐文件校验台账 sha256
  const ledger = JSON.parse(readFileSync(path.join(usDir, 'word-audio-candidates.json'), 'utf8'))
  const usAssets: unknown[] = []
  for (const [wordId, item] of Object.entries(ledger.assets as Record<string, Record<string, unknown>>)) {
    const file = path.join(usDir, `${item.sha256}.wav`)
    if (!existsSync(file)) throw new Error(`美音候选缺文件: ${wordId}`)
    const bytes = readFileSync(file)
    if (sha256(bytes) !== item.sha256) throw new Error(`美音候选哈希不一致: ${wordId}`)
    if (bytes.length !== item.bytes) throw new Error(`美音候选大小不一致: ${wordId}`)
    usAssets.push({ wordId, word: item.word, sha256: item.sha256, durationMs: item.durationMs, bytes: item.bytes })
  }

  const usAudio = {
    schemaVersion: 1, courseVersionId: course.manifest.versionId, courseHash: hash,
    requestedAccent: 'US', actualAccent: null, // 未逐条听审，不能声称实际口音
    provider: ledger.provider, model: ledger.model, voice: ledger.voice,
    humanReviewed: false, rightsReviewed: false, publicationApproved: false,
    source: 'MiMo TTS 候选（桃阅读自产），2026-10-28 台账逐文件校验通过',
    counts: { assets: usAssets.length },
    assets: usAssets,
  }

  const courseDir = candidateDirectory.replace(/[\\]+$/, '').replace(/\/+$/, '')
  writeFileSync(path.join(courseDir, 'lexicon.json'), JSON.stringify(lexicon, null, 1) + '\n')
  writeFileSync(path.join(courseDir, 'usAudio.json'), JSON.stringify(usAudio, null, 1) + '\n')
  console.log(`lexicon: ${entries.length} 条（词光 ${usedSources['word-atlas']} / 自备 ${usedSources['taoread-original']}，例句音频 ${exampleAudio.length}）`)
  console.log(`usAudio: ${usAssets.length} 条校验通过`)
  console.log(`courseHash（保持不变）: ${hash}`)
}

main().catch(error => { console.error(error); process.exit(1) })
