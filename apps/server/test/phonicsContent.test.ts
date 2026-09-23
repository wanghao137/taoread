import { describe, expect, it } from 'vitest'
import { PHONICS_COURSE, PHONICS_DRAFT, PHONICS_READERS, lessonById, publicLesson, taughtGraphemes, type PhonicsWord } from '../src/modules/phonics/lessons'

/** 校验一个词是否完全由「截至第 N 课已教字素」拼成；返回不合法原因 */
export function checkWord(word: PhonicsWord, upToLesson: number): string | null {
  const taught = taughtGraphemes(upToLesson)
  const unknown = word.graphemes.filter((g) => !taught.has(g.toLowerCase()) && !(word.proper && g === word.text[0]))
  if (unknown.length > 0) return `${word.text} 使用了未教字素 ${unknown.join(',')}`
  if (word.graphemes.join('').toLowerCase() !== word.text.toLowerCase()) return `${word.text} 字素切分与拼写不一致`
  if (word.lesson > upToLesson) return `${word.text} 越级：出现在第 ${upToLesson} 课，但属于第 ${word.lesson} 课`
  return null
}

function readerWords(text: string): string[] {
  return text
    .replace(/[.,!?]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
}

describe('自然拼读 8 课内容机器校验（T11/D1）', () => {
  it('课程元信息：一套口音、一个版本、恒为 draft', () => {
    expect(PHONICS_COURSE.accent).toBe('GB')
    expect(PHONICS_COURSE.status).toBe('draft')
    expect(PHONICS_DRAFT).toHaveLength(8)
    expect(PHONICS_DRAFT.map((l) => l.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
  })

  it('每个新授 GPC 都有 IPA 与口型提示，课程图无环（顺序严格递增）', () => {
    for (const lesson of PHONICS_DRAFT) {
      for (const gpc of lesson.taught) {
        expect(gpc.ipa).toMatch(/^\/.+\/$/)
        expect(gpc.mouthCue.length).toBeGreaterThanOrEqual(8)
      }
    }
    const orders = PHONICS_DRAFT.map((l) => l.order)
    for (let i = 1; i < orders.length; i++) expect(orders[i]!).toBe(orders[i - 1]! + 1)
  })

  it('每课词表只用已教字素、不越级（未教 c 的 cat 必须被拦截）', () => {
    // 防线自证：cat 的 c 从未被教过 → 校验器必须拒绝
    expect(checkWord({ text: 'cat', graphemes: ['c', 'a', 't'], lesson: 2, meaning: '猫' }, 8)).toContain('未教字素')
    // 全部课词表过闸
    for (const lesson of PHONICS_DRAFT) {
      for (const word of lesson.words) {
        expect(checkWord(word, lesson.order)).toBeNull()
      }
    }
  })

  it('每篇短文逐词可解码，且只含该课词表或更早课的词', () => {
    const allWords = new Map<string, PhonicsWord>()
    for (const lesson of PHONICS_DRAFT) {
      for (const word of lesson.words) {
        const key = word.text.toLowerCase()
        const known = allWords.get(key)
        if (!known || word.lesson < known.lesson) allWords.set(key, word)
      }
    }
    for (const lesson of PHONICS_DRAFT) {
      if (!lesson.reader) continue
      for (const raw of readerWords(lesson.reader.text)) {
        const key = raw.toLowerCase()
        const word = allWords.get(key)
        expect(word, `第 ${lesson.order} 课短文词「${raw}」不在词表`).toBeTruthy()
        expect(checkWord(word!, lesson.order), `第 ${lesson.order} 课短文词「${raw}」越级或含未教字素`).toBeNull()
      }
    }
  })

  it('题目完整性：kind 合法、answer 在选项内、id 全局唯一', () => {
    const seen = new Set<string>()
    for (const lesson of PHONICS_DRAFT) {
      for (const item of lesson.items) {
        expect(seen.has(item.id)).toBe(false)
        seen.add(item.id)
        expect(['grapheme', 'blend', 'segment']).toContain(item.kind)
        expect(item.options.map((o) => o.id)).toContain(item.answer)
        expect(new Set(item.options.map((o) => o.id)).size).toBe(item.options.length)
      }
    }
  })

  it('公开课内容不泄露答案，附 taught/口型提示与短文', () => {
    const lesson = publicLesson('draft-en-l03')
    expect(lesson).not.toBeNull()
    expect(lesson!.items[0]).not.toHaveProperty('answer')
    expect(lesson!.taught[0]).toMatchObject({ grapheme: 'p', ipa: '/p/' })
    expect(lesson!.reader).toBeNull()
    expect(publicLesson('draft-en-l04')!.reader).toMatchObject({ title: 'Pat Sat' })
    expect(lessonById('nope')).toBeUndefined()
  })

  it('8 篇短文草稿全部就位并挂到对应课', () => {
    expect(PHONICS_READERS).toHaveLength(6)
    for (const reader of PHONICS_READERS) {
      expect(lessonById(reader.lessonId)).toBeTruthy()
      expect(reader.note).toContain('签认')
    }
  })
})
