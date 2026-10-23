import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { createElement } from 'react'
import { alignPoemPinyin, PoemRuby } from '../src/components/art/PoemRuby'
import { codePointToUtf16Offset } from '../src/lib/readingPosition'

describe('narrated ruby text', () => {
  it('retains the same ruby layout and original text while highlighting', () => {
    const props = { text: '赵钱孙李，\n周吴郑王。', pinyin: 'zhào qián sūn lǐ，\nzhōu wú zhèng wáng。', fontSize: 26, color: '#222' }
    const idle = renderToStaticMarkup(createElement(PoemRuby, props))
    const playing = renderToStaticMarkup(createElement(PoemRuby, { ...props, activeOffset: 6 }))
    expect((idle.match(/<ruby /g) ?? []).length).toBe(8)
    expect((playing.match(/<ruby /g) ?? []).length).toBe(8)
    expect(playing).toContain('data-reading-offset="6" style="line-height:2;font-weight:800;opacity:1">周<rt')
    expect(playing.replace(/ style="[^"]*"/g, '')).toBe(idle.replace(/ style="[^"]*"/g, ''))
  })

  it('never drops the Chinese original when annotation lines are malformed', () => {
    const markup = renderToStaticMarkup(createElement(PoemRuby, { text: '春眠不觉晓，\n处处闻啼鸟。', pinyin: 'chūn mián', color: '#222', fontSize: 26 }))
    expect(markup).toContain('春眠不觉晓，\n处处闻啼鸟。')
    expect(markup).toContain('chūn mián')
    expect(markup).toContain('data-reading-ignore')
    expect(alignPoemPinyin('春眠不觉晓', 'chūn mián')).toBeNull()
  })

  it('keeps source newlines and supplementary characters in UTF-16 coordinates', () => {
    const text = '𠮷祥，\n你好。'
    const lines = alignPoemPinyin(text, 'jí xiáng，\nnǐ hǎo。')!
    expect(lines.flat().map(c => c.offset)).toEqual([0, 2, 3, 5, 6, 7])
    expect(codePointToUtf16Offset(text, 4)).toBe(5)
    expect(codePointToUtf16Offset(text, 100)).toBe(text.length)
  })
})
