import { describe, it, expect } from 'vitest'
import { buildPrompt } from '../src/modules/media/imagegen'

describe('literary illustration prompt', () => {
  const input = { kind: 'chapter' as const, scene: 'test', description: '小王子在星球上，旁边只有一朵玫瑰和一位成年点灯人。', label: '场景', lang: 'zh' as const }
  it('preserves explicit age, count and setting without adding generic scenery', () => {
    const prompt = buildPrompt({ ...input, literalScene: true })
    expect(prompt).toContain(input.description)
    expect(prompt).toContain('preserve character ages')
    expect(prompt).toContain('object counts')
    expect(prompt).not.toContain('warm lit windows')
    expect(prompt).not.toContain('ages 3-8')
    expect(prompt).not.toContain('rich layered composition')
  })
  it('keeps the established default prompt for other illustrations', () => {
    const prompt = buildPrompt(input)
    expect(prompt).toContain('warm lit windows')
    expect(prompt).toContain('radiant watercolor')
  })
})
