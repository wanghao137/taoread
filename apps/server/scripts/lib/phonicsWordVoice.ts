import { digest } from '../../src/modules/phonics/v2/courseRegistry'

export function wordVoiceJobs(words: Array<{ id: string; text: string }>, options: { accent: 'GB' | 'US'; model: string; voice: string; courseHash: string }, selected?: Set<string>) {
  if (selected && [...selected].some(id => !words.some(word => word.id === id))) throw new Error('Unknown word id')
  return words.filter(word => !selected || selected.has(word.id)).map(word => {
    const instruction = `Say only the supplied word once in clear, natural ${options.accent === 'US' ? 'American' : 'southern British'} English. No spelling, explanation, music or extra words.`
    const inputHash = digest({ word: word.text, instruction, ...options })
    return { id: word.id, word: word.text, instruction, inputHash }
  })
}
