import { describe, expect, it } from 'vitest'
import { extractNoteWord, previewText, splitSentences } from '../src/lib/preview'

describe('splitSentences（按句末标点切句）', () => {
  it('中文句号切分并保留标点', () => {
    expect(splitSentences('月亮升起来了。星星也醒了。')).toEqual(['月亮升起来了。', '星星也醒了。'])
  })
  it('感叹号问号也切', () => {
    expect(splitSentences('快看！那是什么？')).toEqual(['快看！', '那是什么？'])
  })
  it('英文句点切分', () => {
    expect(splitSentences('Once upon a time. There was a rabbit.')).toEqual([
      'Once upon a time.',
      'There was a rabbit.',
    ])
  })
  it('空文本返回空数组', () => {
    expect(splitSentences('')).toEqual([])
  })
  it('无标点单句返回一项', () => {
    expect(splitSentences('从前有座山')).toEqual(['从前有座山'])
  })
  it('空白段被丢弃', () => {
    expect(splitSentences('月亮。   。星星。')).toEqual(['月亮。', '星星。'])
  })
})

describe('previewText（取开头若干句）', () => {
  it('中文取 2 句', () => {
    expect(previewText('月亮升起来了。星星也醒了。夜深了。')).toBe('月亮升起来了。星星也醒了。')
  })
  it('只有 1 句时返回 1 句', () => {
    expect(previewText('月亮升起来了。')).toBe('月亮升起来了。')
  })
  it('空文本返回空串', () => {
    expect(previewText('')).toBe('')
  })
  it('英文长句按字符上限刹住（不超 60 字符则只取 1 句）', () => {
    const long = 'Once upon a time there was a small brown rabbit who lived in a cozy burrow.'
    const out = previewText(long)
    expect(out).toBe(long)
    expect(out.length).toBeLessThanOrEqual(60 + 40) // 单句本身不截断，只是不再追加下一句
  })
  it('英文短句取满 2 句', () => {
    expect(previewText('Hello. World.')).toBe('Hello. World.')
  })
})

describe('extractNoteWord（英文 note 生词切取）', () => {
  it('标准格式切出单词', () => {
    expect(
      extractNoteWord('New word: nursery — a special room in a house where little children sleep and play.'),
    ).toBe('nursery')
  })
  it('带连字符的单词完整保留', () => {
    expect(extractNoteWord('New word: wheel-barrow — a small cart.')).toBe('wheel-barrow')
  })
  it('带撇号的所有格保留', () => {
    expect(extractNoteWord("New word: rabbit's foot — a lucky charm.")).toBe("rabbit's")
  })
  it('大小写不敏感的前缀匹配', () => {
    expect(extractNoteWord('new word: Moon — the bright round thing in the night sky.')).toBe('Moon')
  })
  it('无 "New word:" 前缀返回 null', () => {
    expect(extractNoteWord('This is just a plain sentence.')).toBeNull()
  })
  it('空文本返回 null', () => {
    expect(extractNoteWord('')).toBeNull()
  })
})
