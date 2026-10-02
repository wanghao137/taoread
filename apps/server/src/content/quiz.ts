/**
 * 读后小测（docs/34 P1-5）：零 AI 的机械理解检查。
 * 第一性原理：没有逐书题库，就不做「感觉式」伪理解题——唯一可被客观验证的
 * 理解信号是「这个词/词句确实出现在刚读的故事里」。正确答案从本章原文抽取、
 * 干扰项取自同书其他章（可证伪），孩子答对即盖「读懂了」章。
 */

export interface WordQuiz {
  kind: 'word'
  /** 展示用提问 */
  prompt: string
  /** 正确词（回显用） */
  word: string
  options: string[]
  answerIndex: number
}

/** 确定性伪随机（mulberry32）：同一 seed 稳定出同一份题，刷新不变 */
export function seededRng(seed: string): () => number {
  let h = 1779033703 ^ seed.length
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  let a = h >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** 从正文抽候选词：中文取 2-4 字连续汉字，英文取 ≥4 字母词（小写去重） */
export function extractCandidateWords(texts: string[], lang: 'zh' | 'en', limit = 80): string[] {
  const joined = texts.join('\n')
  const pattern = lang === 'zh' ? /[\u4e00-\u9fa5]{2,4}/g : /[A-Za-z]{4,}/g
  const seen = new Set<string>()
  const out: string[] = []
  for (const match of joined.matchAll(pattern)) {
    const word = lang === 'zh' ? match[0] : match[0].toLowerCase()
    if (seen.has(word)) continue
    seen.add(word)
    out.push(word)
    if (out.length >= limit) break
  }
  return out
}

export function buildWordQuiz(opts: {
  bookTitle: string
  chapterOrder: number
  lang: 'zh' | 'en'
  /** 本章 text/poem 块文本（正确答案来源） */
  chapterTexts: string[]
  /** 干扰项池：同书其他章（或其他同龄书）的文本 */
  distractorTexts: string[]
  seed: string
}): WordQuiz | null {
  const rng = seededRng(opts.seed)
  const targets = extractCandidateWords(opts.chapterTexts, opts.lang)
  if (targets.length === 0) return null
  const word = targets[Math.floor(rng() * targets.length)]!
  const chapterJoined = opts.chapterTexts.join('\n')
  const distractors = extractCandidateWords(opts.distractorTexts, opts.lang).filter(
    (w) => w !== word && !chapterJoined.includes(w),
  )
  // 去重干扰项后至少要 2 个才能组 3 选项题
  const unique = [...new Set(distractors)]
  if (unique.length < 2) return null
  const picked: string[] = []
  const pool = [...unique]
  while (picked.length < 2 && pool.length > 0) {
    picked.push(pool.splice(Math.floor(rng() * pool.length), 1)[0]!)
  }
  const options = [word, ...picked]
  // Fisher-Yates 洗牌（确定性）
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[options[i], options[j]] = [options[j]!, options[i]!]
  }
  return {
    kind: 'word',
    prompt:
      opts.lang === 'zh'
        ? `回忆一下：《${opts.bookTitle}》第 ${opts.chapterOrder} 章里，哪段文字出现过？`
        : `Which word appears in Chapter ${opts.chapterOrder} of "${opts.bookTitle}"?`,
    word,
    options,
    answerIndex: options.indexOf(word),
  }
}
