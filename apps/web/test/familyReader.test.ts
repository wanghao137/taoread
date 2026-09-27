import { describe, expect, it } from 'vitest'
import { parseBlocks } from '../src/pages/child/FamilyTrialPages'

/** 服务端朗读合成全文的坐标空间：去标记 → 行 trim → 丢空行 → '\n' 连接（与 chunkText 输入一致） */
function serverFullText(text: string): string {
  return text.replace(/\[\[img:[^\]]+\]\]/g, '').split('\n').map((line) => line.trim()).filter(Boolean).join('\n')
}

describe('家庭书阅读块解析', () => {
  it('纯标记行不占坐标，段落坐标与服务端全文对齐', () => {
    const text = '第一段。\n\n[[img:img-000.webp]]\n\n第二段开头。'
    const blocks = parseBlocks(text)
    expect(blocks[0]).toMatchObject({ kind: 'p', text: '第一段。', cleanStart: 0, cleanLen: 4 })
    expect(blocks[1]).toMatchObject({ kind: 'img', key: 'img-000.webp' })
    expect(blocks[2]).toMatchObject({ kind: 'p', cleanStart: 5, cleanLen: 6 })
    const last = blocks[blocks.length - 1]!
    if (last.kind === 'p') expect(last.cleanStart + last.cleanLen).toBe(serverFullText(text).length)
  })

  it('空行与连续标记行安全，坐标单调', () => {
    const text = '甲段落。\n\n乙段落。\n\n[[img:a.webp]]\n[[img:b.webp]]\n\n丙段落。'
    const blocks = parseBlocks(text)
    expect(blocks.filter((block) => block.kind === 'img')).toHaveLength(2)
    expect((blocks.filter((block) => block.kind === 'p') as Array<{ kind: 'p'; text: string }>).map((block) => block.text)).toEqual(['甲段落。', '乙段落。', '丙段落。'])
    let last = -1
    for (const block of blocks) {
      if (block.kind === 'p') {
        expect(block.cleanStart).toBeGreaterThan(last)
        last = block.cleanStart
      }
    }
    const lastBlock = blocks[blocks.length - 1]!
    if (lastBlock.kind === 'p') expect(lastBlock.cleanStart + lastBlock.cleanLen).toBe(serverFullText(text).length)
  })
})
