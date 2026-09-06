import { describe, expect, it } from 'vitest'
import {
  CHILD_CATEGORY_PREFIXES,
  filterChildRecommend,
  filterChildShelf,
  isChildCategory,
  shelfTotal,
  toShelfItems,
} from '../src/modules/weread/shelf'

const book = (id: string, category?: string) => ({ bookId: id, title: `书${id}`, category })
const album = (id: string) => ({ albumInfo: { albumId: id, name: `专辑${id}` } })

describe('书架口径（shelf.md：三区和）', () => {
  it('总数 = books + albums + mp 非空计 1', () => {
    const items = toShelfItems({
      books: [book('B1'), book('B2')],
      albums: [album('A1')],
      mp: {},
      bookCount: 2,
    })
    expect(shelfTotal(items)).toBe(4)
  })

  it('mp 为 null/缺失不计入；bookCount 服务端计数不参与口径', () => {
    expect(shelfTotal(toShelfItems({ books: [book('B1')], albums: [], mp: null, bookCount: 999 }))).toBe(1)
    expect(shelfTotal(toShelfItems({ books: [book('B1')], albums: [] }))).toBe(1)
  })

  it('回包缺字段/类型异常时防御为空集，不抛错', () => {
    const items = toShelfItems(null)
    expect(items.books).toEqual([])
    expect(items.albums).toEqual([])
    expect(items.mp).toBeNull()
    const dirty = toShelfItems({ books: [book('B1'), null, 42, 'x'], albums: 'not-array' })
    expect(dirty.books).toHaveLength(1)
    expect(dirty.albums).toEqual([])
  })
})

describe('童书类目白名单', () => {
  it('命中 1300000 前缀通过；其余一律不进入孩子视图（宁缺勿滥）', () => {
    expect(isChildCategory('1300000')).toBe(true)
    expect(isChildCategory('1300000123')).toBe(true)
    expect(isChildCategory('1300001')).toBe(false)
    expect(isChildCategory('1000000')).toBe(false)
    expect(isChildCategory('')).toBe(false)
    expect(isChildCategory(undefined)).toBe(false)
    expect(isChildCategory(1300000)).toBe(false)
  })

  it('白名单不含成人类目值（回归锁定）', () => {
    // 微信读书成人类目不得加入白名单；此用例防止未来有人误加
    const adultish = ['2000000', '3000000', '9999999']
    for (const c of adultish) {
      expect((CHILD_CATEGORY_PREFIXES as readonly string[]).includes(c)).toBe(false)
    }
  })
})

describe('孩子视图过滤', () => {
  it('books 按白名单+屏蔽过滤；albums 无类目可判默认全不放行（N3-003 宁缺勿滥）；mp 保留', () => {
    const items = toShelfItems({
      books: [book('B1', '1300000'), book('B2', '1000000'), book('B3', '1300000456')],
      albums: [album('A1'), album('A2')],
      mp: {},
    })
    const child = filterChildShelf(items, new Set(['book:B3']))
    expect(child.books.map((b) => b.bookId)).toEqual(['B1'])
    expect(child.albums).toEqual([]) // 听书放行留给夜 9 家长端逐个授权
    expect(child.mp).toEqual({})
    expect(shelfTotal(child)).toBe(2) // 1 书 + 0 专辑 + 1 mp
  })

  it('推荐流：白名单命中且未屏蔽（kind 前缀键）的才返回', () => {
    const recs = [book('R1', '1300000'), book('R2', '2000000'), book('R3', '1300000999')]
    expect(filterChildRecommend(recs, new Set(['book:R3'])).map((b) => b.bookId)).toEqual(['R1'])
    // 无 category 的条目不进入孩子推荐流
    expect(filterChildRecommend([book('R9'), book('R8', '1300000321')], new Set()).map((b) => b.bookId)).toEqual(['R8'])
  })
})
