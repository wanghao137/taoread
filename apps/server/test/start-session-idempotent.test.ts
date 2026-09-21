import { describe, expect, it, vi } from 'vitest'
import { startSession } from '../src/modules/cosession/service'
import type { CosessionDb } from '../src/modules/cosession/service'

/** P2002 恢复分支确定性单测（N6-003 复审补）：
 * stub db 使 create 直接触发部分唯一索引违规（P2002），
 * 断言 startSession 捕获后重读复用返回 reused:true 且不向孩子暴露错误。 */

function makeStubDb(): { db: CosessionDb; findFirstCalls: number } {
  let findFirstCalls = 0
  const db = {
    childProfile: {
      findUnique: vi.fn(async () => ({ id: 'child-1', familyId: 'fam-1' })),
    },
    cosession: {
      // 快路径查无 active → 走 create；create 触发唯一索引违规
      findFirst: vi.fn(async () => {
        findFirstCalls += 1
        if (findFirstCalls === 1) return null
        // P2002 后的重读：竞态对手已建场
        return {
          id: 'sess-raced',
          startedAt: new Date(),
          bookId: 'B-RACE',
          paperTitle: null,
        }
      }),
      create: vi.fn(async () => {
        throw Object.assign(new Error('Unique constraint failed'), { code: 'P2002' })
      }),
    },
    eventLog: {
      create: vi.fn(async () => ({})),
    },
  } as unknown as CosessionDb & { cosession: Record<string, ReturnType<typeof vi.fn>> }
  return { db: db as CosessionDb, findFirstCalls }
}

describe('startSession P2002 恢复分支（并发双开的引擎级防线）', () => {
  it('create 触发 P2002 时捕获并重读复用，返回 reused:true 不抛错', async () => {
    const { db } = makeStubDb()
    const result = await startSession(
      db,
      'fam-1',
      'child',
      // 竞态对手建的是同书会话（跨书场景现在会被 A3.2 守卫以 409 拒绝）
      { childId: 'child-1', bookId: 'B-RACE' },
      () => 1_800_000_000,
    )
    expect(result.reused).toBe(true)
    expect(result.id).toBe('sess-raced')
    expect(result.bookId).toBe('B-RACE')
  })

  it('非 P2002 的 create 失败原样上抛（不吞编程错误）', async () => {
    const db = {
      childProfile: { findUnique: vi.fn(async () => ({ id: 'child-1', familyId: 'fam-1' })) },
      cosession: {
        findFirst: vi.fn(async () => null),
        create: vi.fn(async () => {
          throw Object.assign(new Error('db disk error'), { code: 'P9999' })
        }),
      },
      eventLog: { create: vi.fn(async () => ({})) },
    } as unknown as CosessionDb
    await expect(
      startSession(db, 'fam-1', 'child', { childId: 'child-1', bookId: 'B1' }, () => 1),
    ).rejects.toMatchObject({ code: 'P9999' })
  })
})
