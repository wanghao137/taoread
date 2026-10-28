import type { PhonicsAtlasWordDto } from '@taoread/shared'
import type { PracticeMode } from './api'

export function distinctChoices(target: PhonicsAtlasWordDto, words: PhonicsAtlasWordDto[], mode: PracticeMode): PhonicsAtlasWordDto[] {
  const label = (word: PhonicsAtlasWordDto) => (mode === 'meaning' ? word.meaningZh : word.text)?.trim().toLowerCase() ?? ''
  const used = new Set([label(target)])
  return [target, ...words.filter(word => {
    const value = label(word)
    if (!value || used.has(value)) return false
    used.add(value)
    return true
  })]
}

export function similarWords(target: PhonicsAtlasWordDto, words: PhonicsAtlasWordDto[]): PhonicsAtlasWordDto[] {
  const text = target.text?.toLowerCase() ?? ''
  return distinctChoices(target, words, 'contrast').slice(1).filter(word => {
    const other = word.text?.toLowerCase() ?? ''
    if (!text || Math.abs(text.length - other.length) > 1) return false
    let left = 0, right = 0, changes = 0
    while (left < text.length && right < other.length) {
      if (text[left] === other[right]) { left++; right++; continue }
      if (++changes > 1) return false
      if (text.length >= other.length) left++
      if (other.length >= text.length) right++
    }
    return changes + Number(left < text.length || right < other.length) === 1
  })
}
