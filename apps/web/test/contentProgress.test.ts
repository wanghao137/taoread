import { describe, expect, it } from 'vitest'
import { ContentProgressWriter, type ContentPosition, type ProgressSaveState } from '../src/lib/contentProgress'

describe('公共阅读器进度队列', () => {
  it('快速翻页合并最新位置，后一次只使用前一次已确认版本', async () => {
    let release!: () => void
    const gate = new Promise<void>(resolve => { release = resolve })
    const writes: Array<{ position: ContentPosition; version: string }> = []
    const writer = new ContentProgressWriter(async () => 'v0', async (position, version) => {
      writes.push({ position, version })
      if (writes.length === 1) await gate
      return { updatedAt: `v${writes.length}`, stale: false }
    }, () => {})
    const first = writer.save({ chapterOrder: 1, blockOrder: 1 })
    await Promise.resolve()
    void writer.save({ chapterOrder: 1, blockOrder: 2 })
    void writer.save({ chapterOrder: 2, blockOrder: 4 })
    release()
    expect(await first).toBe(true)
    expect(writes).toEqual([{ position: { chapterOrder: 1, blockOrder: 1 }, version: 'v0' }, { position: { chapterOrder: 2, blockOrder: 4 }, version: 'v1' }])
    expect(writer.version).toBe('v2')
  })

  it('冲突不会显示保存成功、不会借新版本覆盖另一个设备', async () => {
    const states: ProgressSaveState[] = []
    let calls = 0
    const writer = new ContentProgressWriter(async () => 'old', async () => { calls++; return { updatedAt: 'newer-device', stale: true } }, state => states.push(state))
    expect(await writer.save({ chapterOrder: 2, blockOrder: 0 })).toBe(false)
    expect(await writer.retry()).toBe(false)
    expect(await writer.save({ chapterOrder: 3, blockOrder: 1 })).toBe(false)
    expect(calls).toBe(1)
    expect(states).toEqual(['saving', 'conflict'])
    expect(writer.version).toBe('old')
  })

  it('失败保留最新位置和完成动作，重试可以主动回读前章', async () => {
    let fail = true
    const writes: ContentPosition[] = []
    const writer = new ContentProgressWriter(async () => 'v0', async position => { if (fail) throw new Error('offline'); writes.push(position); return { updatedAt: 'v1', stale: false } }, () => {})
    expect(await writer.save({ chapterOrder: 9, blockOrder: 3, completed: true })).toBe(false)
    fail = false
    expect(await writer.retry()).toBe(true)
    expect(await writer.save({ chapterOrder: 1, blockOrder: 0 })).toBe(true)
    expect(writes).toEqual([{ chapterOrder: 9, blockOrder: 3, completed: true }, { chapterOrder: 1, blockOrder: 0 }])
  })
})
