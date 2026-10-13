import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createHash, randomUUID } from 'node:crypto'
import { authHeaders, createChild, createFamilyAsParent, joinFamily, makeApp, type TestHarness } from './helper'
import { relocateAnchor } from '../src/content/anchors'
import { exportRecords, restoreRecords } from '../src/modules/family/records'
import { changeReview, rollbackReview } from '../src/content/review'
import { correctBlock, restoreTextRevision } from '../src/content/corrections'
let h: TestHarness
let token: string
let childToken: string
let childId: string
let otherChild: string
let familyId: string
const bookId = 'assessment-test-book'
beforeAll(async () => {
  h = await makeApp()
  const family = await createFamilyAsParent(h.app, 'assessment-owner')
  token = family.token; familyId = family.familyId
  childToken = (await joinFamily(h.app, family.familyCode, 'child')).token
  childId = await createChild(h.app, token, familyId, '甲', '6-8')
  otherChild = await createChild(h.app, token, familyId, '乙', '3-5')
  await h.db.book.upsert({ where: { id: bookId }, create: { id: bookId, title: '位置测试书', lang: 'zh', category: 'story', ageStage: '6-8', coverArt: 'forest', source: 'test', contentVersion: 'v1' }, update: { contentVersion: 'v1', publicationStatus: 'published', reviewStatus: 'pending', reviewEvidence: null } })
  const chapter = await h.db.chapter.upsert({ where: { bookId_order: { bookId, order: 1 } }, create: { bookId, order: 1, title: '子云' }, update: {} })
  await h.db.block.upsert({ where: { chapterId_order: { chapterId: chapter.id, order: 1 } }, create: { chapterId: chapter.id, order: 1, kind: 'p', text: '山里的树开花了。' }, update: { text: '山里的树开花了。', pinyin: null, translation: null } })
}, 60000)
afterAll(async () => { await h.app.close(); await h.db.$disconnect() })
describe('产品改进的数据和权限契约', () => {
  it('版本2导出恢复保留同名孩子、版本坐标及已同步书签，重复恢复拒绝覆盖', async () => {
    await h.db.childProfile.updateMany({ where: { id: { in: [childId, otherChild] } }, data: { nickname: '同名' } })
    await h.db.readingProgress.upsert({ where: { childId_bookId: { childId, bookId } }, create: { childId, bookId, chapterOrder: 1, blockOrder: 1, contentVersion: 'v1' }, update: {} })
    const importedId = `imp:${randomUUID()}`
    await h.db.importedBook.create({ data: { id: importedId, familyId, title: '家庭恢复样本', author: '合成作者', lang: 'zh', ageStage: '6-8', contentVersion: 2, sha256: 'a'.repeat(64), sourceName: 'sample.txt', format: 'txt', chapters: { create: [{ order: 1, title: '原章', text: '原来的段落。' }] } } })
    await h.db.importedReadingProgress.create({ data: { bookId: importedId, childId: otherChild, order: 1, offset: 3, contentVersion: 2 } })
    const session = await h.db.cosession.create({ data: { familyId, childId: otherChild, bookId: importedId, startedAt: new Date('2026-01-01'), endedAt: new Date('2026-01-01T00:01:00Z'), durationSec: 60, completionVerified: false } })
    await h.db.highlightStar.create({ data: { familyId, childId: otherChild, cosessionId: session.id, source: 'manual', text: '另一位孩子的共读金句' } })
    await h.db.bookHighlight.create({ data: { childId, bookId, chapterOrder: 1, blockOrder: 0, text: '恢复时应保留的金句' } })
    await h.db.wordCard.create({ data: { childId, word: '树', lang: 'zh', bookId: null, sourceBookId: importedId, chapterOrder: 1, blockOrder: 3, context: '原来的段落。' } })
    await h.db.readingBookmark.create({ data: { id: randomUUID(), childId: otherChild, bookId: importedId, source: 'import', version: '2', chapter: 1, position: 3, anchor: '原来的段落。', deleted: true } })
    await h.db.readingBookmark.create({ data: { id: randomUUID(), childId, bookId, source: 'public', version: 'v1', chapter: 1, position: 0, anchor: '山里的树开花了。' } })
    await h.db.achievement.create({ data: { familyId, childId: otherChild, kind: 'night_lamp', value: 1 } })
    await h.db.bookFavorite.create({ data: { childId, bookId } })
    await h.db.readingPlan.create({ data: { childId, days: '[2,4]', note: '可选安排' } })
    const records = await exportRecords(h.db, familyId)
    expect(records.children.map(c => c.ref).filter((x, i, a) => a.indexOf(x) === i)).toHaveLength(2)
    expect(JSON.stringify(records)).not.toContain('token')
    const target = await createFamilyAsParent(h.app, 'restore-target')
    const before = await restoreRecords(h.db, target.familyId, records, true)
    expect(before.preview).toBe(true)
    expect(await h.db.childProfile.count({ where: { familyId: target.familyId } })).toBe(0)
    await restoreRecords(h.db, target.familyId, records, false)
    const result = await exportRecords(h.db, target.familyId)
    expect(result.children.map(c => [c.nickname, c.stage])).toEqual(records.children.map(c => [c.nickname, c.stage]))
    expect(result.progress).toEqual(records.progress)
    expect(result.quotes).toEqual(records.quotes)
    expect(result.bookmarks.map(b => ({ ...b, bookId: b.source === 'import' ? 'restored-import' : b.bookId }))).toEqual(records.bookmarks.map(b => ({ ...b, bookId: b.source === 'import' ? 'restored-import' : b.bookId })))
    expect(result.words[0]).toMatchObject({ bookId: null, context: '原来的段落。', sourceBookId: result.imports[0]!.ref })
    expect(result.imports[0]!.chapters).toEqual(records.imports[0]!.chapters)
    expect(result.importedProgress[0]).toMatchObject({ bookId: result.imports[0]!.ref, contentVersion: 2, offset: 3 })
    expect(result.highlights[0]!.cosessionRef).toBe(result.cosessions[0]!.ref)
    expect(result.highlights[0]!.childRef).toBe(result.cosessions[0]!.childRef)
    expect(result.achievements).toEqual(records.achievements)
    expect(result.favorites).toEqual(records.favorites)
    expect(result.plans).toEqual(records.plans)
    await expect(restoreRecords(h.db, target.familyId, records, false)).rejects.toThrow('空家庭')
  })
  it('恢复拒绝缺失来源、跨孩子关联、重复和损坏文件，目标仍为空', async () => {
    const records = await exportRecords(h.db, familyId)
    const target = await createFamilyAsParent(h.app, 'restore-invalid-target')
    await expect(restoreRecords(h.db, target.familyId, { ...records, progress: [...records.progress, ...records.progress] }, false)).rejects.toThrow('重复')
    await expect(restoreRecords(h.db, target.familyId, { ...records, highlights: records.highlights.map(x => ({ ...x, cosessionRef: 'absent' })) }, false)).rejects.toThrow('共读记录')
    await expect(restoreRecords(h.db, target.familyId, { ...records, bookmarks: records.bookmarks.map(x => ({ ...x, bookId: 'imp:absent', source: 'import' })) }, false)).rejects.toThrow('书签')
    await expect(restoreRecords(h.db, target.familyId, { ...records, plans: records.plans.map(x => ({ ...x, days: '[9]' })) }, false)).rejects.toThrow('安排')
    await expect(restoreRecords(h.db, target.familyId, { ...records, words: records.words.map(x => ({ ...x, sourceBookId: 'missing-public-source' })) }, false)).rejects.toThrow('公共书')
    expect(await h.db.childProfile.count({ where: { familyId: target.familyId } })).toBe(0)
  })
  it('恢复保留待重新定位的已删章节和旧版家庭书标识，并映射成新的家庭书ID', async () => {
    const records = await exportRecords(h.db, familyId)
    const original = records.imports[0]!.ref
    const legacy = 'legacy-import-id'
    const remap = (id: string | null) => id === original ? legacy : id
    const input = { ...records,
      imports: records.imports.map(b => ({ ...b, ref: remap(b.ref)!, mediaOmitted: true })),
      importedProgress: records.importedProgress.map(p => ({ ...p, bookId: remap(p.bookId)!, order: 99, relocationRequired: true })),
      cosessions: records.cosessions.map(s => ({ ...s, bookId: remap(s.bookId) })),
      words: records.words.map(w => ({ ...w, sourceBookId: remap(w.sourceBookId) })),
      bookmarks: records.bookmarks.map(b => ({ ...b, bookId: remap(b.bookId)! })),
    }
    const target = await createFamilyAsParent(h.app, 'restore-relocation-target')
    await restoreRecords(h.db, target.familyId, input, false)
    const result = await exportRecords(h.db, target.familyId)
    expect(result.imports[0]!.ref).toMatch(/^imp:/)
    expect(result.importedProgress[0]).toMatchObject({ order: 99, relocationRequired: true, completed: false, contentVersion: 3 })
    expect(result.words[0]!.sourceBookId).toBe(result.imports[0]!.ref)
  })
  it('同一时间戳的共读记忆跨页不丢失', async () => {
    await h.db.highlightStar.createMany({ data: Array.from({ length: 120 }, (_, i) => ({ childId: otherChild, familyId, text: `跨页记忆${i}`, source: 'manual', createdAt: new Date('2026-02-01') })) })
    const ids = new Set<string>(); let cursor: string | null = null
    do {
      const r: { statusCode: number; json: () => { highlights: Array<{ id: string }>; next: string | null } } = await h.app.inject({ method: 'GET', url: `/api/reading/archive?childId=${otherChild}${cursor ? `&before=${cursor}` : ''}`, headers: authHeaders(childToken) })
      expect(r.statusCode).toBe(200)
      for (const row of r.json().highlights) { expect(ids.has(row.id)).toBe(false); ids.add(row.id) }
      cursor = r.json().next
    } while (cursor)
    expect(ids.size).toBe(121)
  })
  it('机器检查不伪装人工批准，运营状态可撤销，旧版本不可操作', async () => {
    await h.db.rightsLedger.upsert({ where: { bookId }, create: { bookId, workTitle: '测试底本', jurisdiction: 'CN', basis: 'original' }, update: {} })
    const input = { version: 'v1', publicationStatus: 'published' as const, reviewer: '测试审校人', evidence: { approved: false, source: '测试底本', scope: '测试章节原文', reviewedOn: '2026-10-13', notes: '合成测试数据，非真实审批' } }
    await expect(changeReview(h.db, bookId, input)).rejects.toThrow('人工批准')
    await changeReview(h.db, bookId, { ...input, publicationStatus: 'withdrawn' })
    const event = await h.db.bookReviewEvent.findFirstOrThrow({ where: { bookId }, orderBy: { createdAt: 'desc' } })
    await rollbackReview(h.db, bookId, event.id, '测试撤销人')
    expect((await h.db.book.findUniqueOrThrow({ where: { id: bookId } })).publicationStatus).toBe('published')
    await expect(changeReview(h.db, bookId, { ...input, version: 'old' })).rejects.toThrow('版本已变化')
  })
  it('孩子不能请求未限定档案的家庭周报', async () => {
    const r = await h.app.inject({ method: 'GET', url: `/api/reports/weekly?familyId=${familyId}`, headers: authHeaders(childToken) })
    expect(r.statusCode).toBe(400)
  })
  it('书签同步保留删除标记并拒绝旧设备覆盖、串孩子写入', async () => {
    const data = { id: randomUUID(), childId, bookId, source: 'public', version: 'v1', chapter: 1, position: 1, anchor: '山里的树开花了。', deleted: false, baseUpdatedAt: null }
    const created = await h.app.inject({ method: 'PUT', url: '/api/reading/bookmarks', headers: authHeaders(childToken), payload: data })
    expect(created.statusCode).toBe(200)
    const updated = created.json().bookmark.updatedAt
    const removed = await h.app.inject({ method: 'PUT', url: '/api/reading/bookmarks', headers: authHeaders(childToken), payload: { ...data, deleted: true, baseUpdatedAt: updated } })
    expect(removed.json().bookmark.deleted).toBe(true)
    const stale = await h.app.inject({ method: 'PUT', url: '/api/reading/bookmarks', headers: authHeaders(childToken), payload: data })
    expect(stale.statusCode).toBe(409)
    const crossed = await h.app.inject({ method: 'PUT', url: '/api/reading/bookmarks', headers: authHeaders(childToken), payload: { ...data, childId: otherChild } })
    expect(crossed.statusCode).toBe(403)
  })
  it('书签只在原句唯一匹配时迁移到新版本', async () => {
    const id = randomUUID()
    await h.db.readingBookmark.create({ data: { id, childId, bookId, source: 'public', version: 'old', chapter: 99, position: 20, anchor: '山里的树开花了。' } })
    const r = await h.app.inject({ method: 'GET', url: `/api/reading/bookmarks?childId=${childId}&bookId=${bookId}`, headers: authHeaders(childToken) })
    expect(r.json().bookmarks.find((x: { id: string }) => x.id === id)).toMatchObject({ version: 'v1', chapter: 1, position: 0 })
  })
  it('300 条金句分页均可找到、同一时间戳不漏条', async () => {
    const createdAt = new Date('2026-01-01T00:00:00Z')
    await h.db.bookHighlight.createMany({ data: Array.from({ length: 300 }, (_, i) => ({ childId, bookId, chapterOrder: 1, blockOrder: i + 1, text: `金句${i}`, createdAt })) })
    const ids = new Set<string>(); let cursor: string | null = null
    do {
      const r: { statusCode: number; json: () => { total: number; highlights: Array<{ id: string }>; nextCursor: string | null } } = await h.app.inject({ method: 'GET', url: `/api/content/highlights?childId=${childId}&bookId=${bookId}${cursor ? `&before=${cursor}` : ''}`, headers: authHeaders(childToken) })
      expect(r.statusCode).toBe(200); expect(r.json().total).toBe(301)
      for (const row of r.json().highlights) { expect(ids.has(row.id)).toBe(false); ids.add(row.id) }
      cursor = r.json().nextCursor
    } while (cursor)
    expect(ids.size).toBe(301)
  })
  it('可选共读安排仅家长修改，取消不动阅读记录', async () => {
    const payload = { childId, days: [2, 4], note: '一起读' }
    expect((await h.app.inject({ method: 'PUT', url: '/api/reading/plan', headers: authHeaders(childToken), payload })).statusCode).toBe(403)
    expect((await h.app.inject({ method: 'PUT', url: '/api/reading/plan', headers: authHeaders(token), payload })).statusCode).toBe(200)
    const before = await h.db.bookHighlight.count({ where: { childId } })
    await h.app.inject({ method: 'PUT', url: '/api/reading/plan', headers: authHeaders(token), payload: { ...payload, days: [] } })
    expect(await h.db.bookHighlight.count({ where: { childId } })).toBe(before)
  })
  it('同内容重复反馈合并，普通家长不能进入运营队列', async () => {
    const payload = { bookId, version: 'v1', chapter: 1, position: 1, category: 'text', message: '这里需要核查原文' }
    const a = await h.app.inject({ method: 'POST', url: '/api/content/feedback', headers: authHeaders(childToken), payload })
    const b = await h.app.inject({ method: 'POST', url: '/api/content/feedback', headers: authHeaders(childToken), payload })
    expect(a.statusCode).toBe(200); expect(b.json().feedback.id).toBe(a.json().feedback.id)
    expect((await h.app.inject({ method: 'GET', url: '/api/editor/queue', headers: authHeaders(token) })).statusCode).toBe(403)
  })
  it('编辑修订撤回旧批准，恢复原文留新版本，旧请求不可覆盖', async () => {
    const corrected = await correctBlock(h.db, bookId, { version: 'v1', reviewer: '合成编辑', reason: '测试定位及撤回', chapter: 1, block: 1, text: '山里的小树开花了。', pinyin: null, translation: '合成白话' })
    expect(corrected.book).toMatchObject({ publicationStatus: 'draft', reviewStatus: 'pending', reviewEvidence: null })
    expect(corrected.book.contentVersion).not.toBe('v1')
    await expect(correctBlock(h.db, bookId, { version: 'v1', reviewer: '合成编辑', reason: '旧请求应该被拒绝', chapter: 1, block: 1, text: '错误覆盖', pinyin: null, translation: null })).rejects.toThrow('版本已变化')
    const restored = await restoreTextRevision(h.db, bookId, { version: corrected.book.contentVersion, reviewer: '合成编辑', reason: '演练恢复原文', revisionId: corrected.revision.id })
    expect(restored.book.publicationStatus).toBe('draft')
    expect((await h.db.block.findFirstOrThrow({ where: { chapter: { bookId }, order: 1 } })).text).toBe('山里的树开花了。')
    await expect(restoreTextRevision(h.db, bookId, { version: restored.book.contentVersion, reviewer: '合成编辑', reason: '旧修订不可再次覆盖', revisionId: corrected.revision.id })).rejects.toThrow('最近一次')
  })
  it('注销级联删除在线记录并原子保留恢复排除标记，旧令牌失效', async () => {
    const family = await createFamilyAsParent(h.app, 'delete-fixture')
    const selected = await createChild(h.app, family.token, family.familyId)
    await h.db.wordCard.create({ data: { childId: selected, word: '注销测试', lang: 'zh' } })
    const result = await h.app.inject({ method: 'DELETE', url: `/api/family/${family.familyId}`, headers: authHeaders(family.token), payload: { confirmCode: family.familyCode } })
    expect(result.statusCode).toBe(204)
    expect(await h.db.wordCard.count({ where: { childId: selected } })).toBe(0)
    expect(await h.db.familyDeletion.findUnique({ where: { familyHash: createHash('sha256').update(family.familyId).digest('hex') } })).not.toBeNull()
    expect((await h.app.inject({ method: 'GET', url: `/api/family/${family.familyId}`, headers: authHeaders(family.token) })).statusCode).toBe(401)
  })
})
describe('章节锚点迁移', () => {
  it('章节拆分或合并保留正确位置', () => {
    const text = '甲'.repeat(80) + '小树开花了。' + '乙'.repeat(80)
    expect(relocateAnchor(text, 81, [{ text: text.slice(0, 20) }, { text: text.slice(20) }])).toEqual({ order: 2, offset: 61 })
    expect(relocateAnchor(text, 81, [{ text: '前言\n' + text }])).toEqual({ order: 1, offset: 84 })
  })
  it('删除和重复原句要求重新选择，不猜测位置', () => {
    expect(relocateAnchor('原来的内容', 3, [{ text: '已删除' }])).toBeNull()
    expect(relocateAnchor('重复文字', 0, [{ text: '重复文字重复文字' }])).toBeNull()
  })
})
