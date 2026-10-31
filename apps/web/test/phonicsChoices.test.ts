import { describe, expect, it } from 'vitest'
import type { PhonicsAtlasWordDto } from '@taoread/shared'
import { distinctChoices, similarWords } from '../src/pages/child/phonics/phonicsChoices'

const word = (id: string, text: string, meaningZh: string): PhonicsAtlasWordDto => ({ id, text, meaningZh, unlocked: true, favorite: false, image: null, audios: [], examples: [] })

describe('phonics practice choices', () => {
  it('does not offer visually identical meanings as competing answers', () => {
    const target = word('a', 'cat', '猫')
    const words = [target, word('b', 'kitty', '猫'), word('c', 'dog', '狗'), word('d', 'pup', '狗')]
    expect(distinctChoices(target, words, 'meaning').map(item => item.id)).toEqual(['a', 'c'])
    expect(distinctChoices(target, words, 'picture').map(item => item.id)).toEqual(['a', 'b', 'c', 'd'])
  })
  it('finds words that differ by one letter without including identical or distant spellings', () => {
    const target = word('a', 'cat', '猫')
    expect(similarWords(target, [target, word('b', 'cap', '帽子'), word('c', 'cats', '猫们'), word('d', 'at', '在'), word('e', 'dog', '狗'), word('f', 'CAT', '猫')]).map(item => item.id)).toEqual(['b', 'c', 'd'])
  })
})
