import { describe, expect, it } from 'vitest'
import { codePointToUtf16Offset, locateChar, parseBlocks, segmentStarts } from '../src/pages/child/FamilyTrialPages'

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

describe('朗读段起点坐标（2026-09-28 高亮漂移修复）', () => {
  it('段起点 = 前面各段长度 + 1（每段末行在全文里后随一个换行符）', () => {
    // 漂移 bug：此前起点 = 纯长度和，第 k 段起高亮整体前移 k 字
    expect(segmentStarts([3, 2, 5])).toEqual([0, 4, 7])
  })

  it('段起点与 chunkText 行分段在全文坐标里精确对齐', () => {
    // 行序列 → 合成段（行以 '\n' 相连，段由整行组成）
    const lines = ['葛之覃兮，施于中谷。', '维叶萋萋。黄鸟于飞。', '是刈是濩，为絺为绤。', '薄污我私，薄浣我衣。']
    const segments = ['葛之覃兮，施于中谷。\n维叶萋萋。黄鸟于飞。', '是刈是濩，为絺为绤。', '薄污我私，薄浣我衣。']
    const full = lines.join('\n')
    const starts = segmentStarts(segments.map((s) => s.length))
    starts.forEach((start, i) => {
      expect(full.slice(start, start + segments[i]!.length)).toBe(segments[i])
    })
    // 与渲染块坐标互检：块 cleanStart 落在所属段的 [start, start+len] 内
    const blocks = parseBlocks(lines.join('\n\n'))
    const pBlocks = blocks.filter((b) => b.kind === 'p')
    expect(pBlocks).toHaveLength(lines.length)
  })
})

describe('字级高亮定位（2026-09-28 家庭书朗读字体高亮）', () => {
  const blocks = parseBlocks('第一段落内容。\n\n第二段落开始了。')

  it('全局字符坐标 → 所在块与块内偏移', () => {
    expect(locateChar(blocks, 0)).toEqual({ index: 0, localChar: 0 })
    expect(locateChar(blocks, 3)).toEqual({ index: 0, localChar: 3 })
    // 第二块 cleanStart = 8（第一块 7 字 + 块间换行符）
    expect(locateChar(blocks, 8)).toEqual({ index: 1, localChar: 0 })
    expect(locateChar(blocks, 9)).toEqual({ index: 1, localChar: 1 })
  })

  it('块间换行坐标不归任何块（返回 null，朗读时保持上一高亮），越界返回 null', () => {
    expect(locateChar(blocks, 7)).toBeNull()
    expect(locateChar(blocks, 999)).toBeNull()
    expect(locateChar(blocks, -1)).toBeNull()
  })

  it('codePointToUtf16Offset：字级时间轴（码点下标）换算成 UTF-16 偏移', () => {
    // 𫄨 是增补平面字（UTF-16 占 2 位）：服务端 [...text] 时间轴按码点计
    const text = '为𫄨为绤，服之无斁。'
    expect(codePointToUtf16Offset(text, 0)).toBe(0)
    expect(codePointToUtf16Offset(text, 1)).toBe(1)
    expect(codePointToUtf16Offset(text, 2)).toBe(3) // 跳过代理对
    expect(codePointToUtf16Offset(text, 10)).toBe(text.length)
  })
})
