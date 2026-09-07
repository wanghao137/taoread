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

describe('童书类目白名单（双口径：中文前缀为主 + 数字前缀兼容，N6-001 真实回包校准）', () => {
  it('真实网关回包口径：中文「童书」前缀通过', () => {
    expect(isChildCategory('童书-幼儿启蒙')).toBe(true)
    expect(isChildCategory('童书-儿童文学')).toBe(true)
    expect(isChildCategory('童书')).toBe(true)
  })

  it('数字前缀兼容口径：1300000 系通过', () => {
    expect(isChildCategory('1300000')).toBe(true)
    expect(isChildCategory('1300000123')).toBe(true)
  })

  it('其余一律不进入孩子视图（宁缺勿滥）', () => {
    expect(isChildCategory('1300001')).toBe(false)
    expect(isChildCategory('1000000')).toBe(false)
    // 真实回包中的非童书类目（家长书架实测值域）
    expect(isChildCategory('历史-世界史')).toBe(false)
    expect(isChildCategory('计算机-编程设计')).toBe(false)
    expect(isChildCategory('精品小说-悬疑推理')).toBe(false)
    // 高危相近值：「教」系类目不含「童书」前缀，不得误放行
    expect(isChildCategory('教育学习-育儿')).toBe(false)
    expect(isChildCategory('教育学习-素质教育')).toBe(false)
    expect(isChildCategory('')).toBe(false)
    expect(isChildCategory(undefined)).toBe(false)
    expect(isChildCategory(1300000)).toBe(false)
  })

  it('白名单不含成人类目值（回归锁定）', () => {
    // 微信读书成人类目不得加入白名单；此用例防止未来有人误加
    const adultish = ['2000000', '3000000', '9999999', '精品小说', '漫画']
    for (const c of adultish) {
      expect((CHILD_CATEGORY_PREFIXES as readonly string[]).includes(c)).toBe(false)
    }
  })
})

describe('孩子视图过滤', () => {
  it('books 按白名单+屏蔽过滤（真实中文类目口径）；albums 无类目可判默认全不放行（N3-003）；mp 保留', () => {
    const items = toShelfItems({
      books: [
        book('B1', '童书-幼儿启蒙'),
        book('B2', '1000000'),
        book('B3', '童书-儿童文学'),
        book('B4', '1300000456'),
      ],
      albums: [album('A1'), album('A2')],
      mp: {},
    })
    const child = filterChildShelf(items, new Set(['book:B3']))
    expect(child.books.map((b) => b.bookId)).toEqual(['B1', 'B4'])
    expect(child.albums).toEqual([]) // 听书放行留给夜 9 家长端逐个授权
    expect(child.mp).toEqual({})
    expect(shelfTotal(child)).toBe(3) // 2 书 + 0 专辑 + 1 mp
  })

  it('推荐流：白名单命中且未屏蔽（kind 前缀键）的才返回', () => {
    const recs = [
      book('R1', '童书-儿童文学'),
      book('R2', '教育学习-育儿'),
      book('R3', '1300000999'),
    ]
    expect(filterChildRecommend(recs, new Set(['book:R3'])).map((b) => b.bookId)).toEqual(['R1'])
    // 无 category 的条目不进入孩子推荐流
    expect(filterChildRecommend([book('R9'), book('R8', '童书-幼儿启蒙')], new Set()).map((b) => b.bookId)).toEqual(['R8'])
  })
})
