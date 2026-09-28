/**
 * 识字量速测（docs/34 P1-8）：20 题选字，零 AI、零题库。
 * 第一性原理：孩子的识字量体现为「高频字认识得多」——从适龄中文书正文按
 * 出现频次抽字（出现越多≈越基础），干扰项取低频字带。结果只给「阅读建议」，
 * 不判定能力、不贴标签（红线：不做能力评估，与 phonics draft 同定位）。
 */

import { seededRng } from './quiz'

export interface LiteracyItem {
  char: string
  options: string[]
  answerIndex: number
}

export interface LiteracyTest {
  items: LiteracyItem[]
}

const CJK = /[\u4e00-\u9fa5]/g

export function buildLiteracyTest(opts: {
  seed: string
  /** 适龄中文书正文样本（text 块） */
  sampleTexts: string[]
  count?: number
}): LiteracyTest | null {
  const count = opts.count ?? 20
  const freq = new Map<string, number>()
  for (const text of opts.sampleTexts) {
    for (const match of text.matchAll(CJK)) {
      const ch = match[0]!
      freq.set(ch, (freq.get(ch) ?? 0) + 1)
    }
  }
  const byFreq = [...freq.entries()].sort((a, b) => b[1] - a[1]).map(([ch]) => ch)
  // 目标字取高频带（前 60%），干扰项取低频带（后 40%）；样本不足直接放弃出题
  const split = Math.floor(byFreq.length * 0.6)
  const highBand = byFreq.slice(0, split)
  const lowBand = byFreq.slice(split)
  if (highBand.length < count || lowBand.length < count * 3) return null

  const rng = seededRng(opts.seed)
  const usedTargets = new Set<string>()
  const items: LiteracyItem[] = []
  while (items.length < count && usedTargets.size < highBand.length) {
    const target = highBand[Math.floor(rng() * highBand.length)]!
    if (usedTargets.has(target)) continue
    usedTargets.add(target)
    const distractors = new Set<string>()
    let guard = 0
    while (distractors.size < 3 && guard < lowBand.length) {
      const candidate = lowBand[Math.floor(rng() * lowBand.length)]!
      if (candidate !== target) distractors.add(candidate)
      guard++
    }
    if (distractors.size < 3) continue
    const options = [target, ...distractors]
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1))
      ;[options[i], options[j]] = [options[j]!, options[i]!]
    }
    items.push({ char: target, options, answerIndex: options.indexOf(target) })
  }
  if (items.length < 5) return null
  return { items }
}

/** 结果→阅读建议：只建议「读什么难度」，不评判孩子（记忆性口吻，正向） */
export function literacySuggestion(correctCount: number, total: number): {
  level: 'easy' | 'fit' | 'stretch'
  message: string
} {
  const ratio = total > 0 ? correctCount / total : 0
  if (ratio >= 0.85) {
    return {
      level: 'easy',
      message: '这些字你都认识啦！可以请爸爸妈妈把书架调到下一个年龄段，去认识更多新朋友。',
    }
  }
  if (ratio >= 0.6) {
    return { level: 'fit', message: '读现在的书刚刚好，继续保持每天读一点，字宝宝会越来越熟。' }
  }
  return {
    level: 'stretch',
    message: '没关系，认识多少都没关系。多听朗读、多收生词，书会陪你慢慢长大。',
  }
}
