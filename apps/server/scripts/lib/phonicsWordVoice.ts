import { digest } from '../../src/modules/phonics/v2/courseRegistry'

export function wordVoiceJobs(words: Array<{ id: string; text: string }>, options: { accent: 'GB' | 'US'; model: string; voice: string; courseHash: string }, selected?: Set<string>) {
  if (selected && [...selected].some(id => !words.some(word => word.id === id))) throw new Error('Unknown word id')
  return words.filter(word => !selected || selected.has(word.id)).map(word => {
    const instruction = `Say only the supplied word once in clear, natural ${options.accent === 'US' ? 'American' : 'southern British'} English. No spelling, explanation, music or extra words.`
    const inputHash = digest({ word: word.text, instruction, ...options })
    return { id: word.id, word: word.text, instruction, inputHash }
  })
}

export function missingExampleVoiceJobs(entries: Array<{ wordId: string; example: { en: string; audio: unknown | null } }>, options: { model: string; voice: string; courseHash: string }) {
  const instruction = 'Read the supplied English sentence once, clearly and naturally, at an unhurried pace for a young child. Use British English; do not add words, music or explanations.'
  return entries.filter(entry => !entry.example.audio).map(entry => {
    const text = entry.example.en.trim()
    if (!text) throw new Error(`Empty example: ${entry.wordId}`)
    return { id: entry.wordId, text, instruction, inputHash: digest({ id: entry.wordId, text, instruction, ...options }) }
  })
}
