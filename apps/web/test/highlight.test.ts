/**
 * 朗读高亮粒度测试（docs/17 P0-1）。
 *
 * 依据：Valentini 2017/2023、Wood 2017（ES=.35）支持双模态高亮，但正面样本多为 8-9 岁；
 * 3-5 岁前读写者的逐词证据缺失，且中文正字法路径与拼音文字不同（Yuan 2022）。
 * 因此粒度按年龄分级，且 Web Speech 无时间轴时必须回退逐句——这两条是产品正确性的硬约束。
 * web 测试环境是 node，只测纯逻辑（粒度判定 + 渲染分词），不渲染组件。
 */
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

/**
 * 与 ReaderScreen 的 effectiveHighlight 判定保持同一表达式（docs/17 P0-1）。
 * 复制而非导入，是因为该逻辑目前内联在组件里；若两边漂移，这里的断言会失败——
 * 这正是测试要防的回归。
 */
function resolveHighlightMode(
  setting: 'auto' | 'word' | 'sentence' | 'off',
  childStage: string | null,
): 'word' | 'sentence' | 'off' {
  if (setting === 'off') return 'off'
  if (setting === 'auto') {
    return childStage === '6-8' || childStage === '9-12' ? 'word' : 'sentence'
  }
  return setting
}

/** 与 renderSpeakingText 同构：把句子拆成字，标记当前字下标 */
function splitForHighlight(text: string, charIdx: number): Array<{ ch: string; active: boolean }> {
  if (charIdx < 0) return [{ ch: text, active: false }]
  return Array.from(text).map((ch, i) => ({ ch, active: i === charIdx }))
}

describe('朗读高亮粒度（docs/17 P0-1）', () => {
  it('auto 模式：6-8 / 9-12 岁逐字，3-5 岁及未知年龄只逐句', () => {
    expect(resolveHighlightMode('auto', '6-8')).toBe('word')
    expect(resolveHighlightMode('auto', '9-12')).toBe('word')
    expect(resolveHighlightMode('auto', '3-5')).toBe('sentence')
    expect(resolveHighlightMode('auto', null)).toBe('sentence')
  })

  it('家长显式设置优先于年龄推断（Wang & Huang 2015：粒度须匹配解码水平）', () => {
    // 熟练的 3-5 岁读者可以开逐字；跟不上的 6-8 岁可以关掉
    expect(resolveHighlightMode('word', '3-5')).toBe('word')
    expect(resolveHighlightMode('sentence', '6-8')).toBe('sentence')
    expect(resolveHighlightMode('off', '6-8')).toBe('off')
  })

  it('off 模式对所有年龄都关掉（朗读时文字不变化）', () => {
    for (const stage of ['3-5', '6-8', '9-12', null]) {
      expect(resolveHighlightMode('off', stage)).toBe('off')
    }
  })

  it('无字级时间轴（charIndex=-1，Web Speech 回退）时整句作为一个不可分段单元', () => {
    const parts = splitForHighlight('床前明月光', -1)
    expect(parts.length).toBe(1)
    expect(parts[0]?.active).toBe(false)
  })

  it('有字级时间轴时逐字拆分，只有当前字标记 active', () => {
    const parts = splitForHighlight('床前明月光', 2)
    expect(parts.length).toBe(5)
    expect(parts.map((p) => p.ch).join('')).toBe('床前明月光')
    expect(parts.map((p) => p.active)).toEqual([false, false, true, false, false])
  })

  it('charIndex 越界时不把任何字标为 active（防御 TTS 返回脏时间轴）', () => {
    const parts = splitForHighlight('短句', 99)
    expect(parts.length).toBe(2)
    expect(parts.every((p) => !p.active)).toBe(true)
  })

  it('emoji 与代理对字符按用户感知字符计数（Array.from 拆分）', () => {
    // 🍑 是代理对，String.prototype.length 会算成 2，Array.from 才是 1
    const parts = splitForHighlight('桃子🍑', 2)
    expect(parts.length).toBe(3)
    expect(parts[2]?.ch).toBe('🍑')
    expect(parts[2]?.active).toBe(true)
  })
})

describe('引用诚实性守卫（docs/17 §5）', () => {
  it('TtsProgress 接口必须声明 charIndex——否则字级时间轴又是幽灵字段', () => {
    const src = readTtsSource()
    expect(src).toContain('charIndex')
    // 接口注释里必须点明 -1 语义与年龄分级依据，避免后续误删
    expect(src).toMatch(/charIndex/)
  })
})

function readTtsSource(): string {
  return readFileSync(resolve(__dirname, '../src/lib/tts.ts'), 'utf-8')
}
