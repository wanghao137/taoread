import { describe, expect, it, vi, afterEach } from 'vitest'
import { authHeaders, createFamilyAsParent, makeApp } from './helper'

describe('公版目录的权限和白名单', () => {
  it('未登录拒绝，家长可见白名单，未知编号不出网', async () => {
    const h = await makeApp()
    const parent = await createFamilyAsParent(h.app, 'public-domain-parent')
    expect((await h.app.inject({ method: 'GET', url: '/api/content/imports/public-domain' })).statusCode).toBe(401)
    const catalog = await h.app.inject({ method: 'GET', url: '/api/content/imports/public-domain', headers: authHeaders(parent.token) })
    expect(catalog.json().books).toMatchObject([{ id: 'gutenberg-11' }])
    const unknown = await h.app.inject({ method: 'POST', url: '/api/content/imports/public-domain/unknown', headers: authHeaders(parent.token), payload: { ageStage: '6-8' } })
    expect(unknown.statusCode).toBe(404)
    await h.app.close(); await h.db.$disconnect()
  })
})

describe('公版一键导入（imp: 前缀 id，出网注入假 fetch）', () => {
  const bookText = [
    'CHAPTER I',
    '',
    'Alice was beginning to get very tired of sitting by her sister on the bank.',
    '',
    'CHAPTER II',
    '',
    'So she was considering in her own mind, as well as she could, for the hot day.',
  ].join('\n')

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('导入成功后 id 带 imp: 前缀（消费方只认 imp:，与手工导入同构）', async () => {
    vi.stubGlobal('fetch', (() =>
      Promise.resolve(new Response(bookText, { status: 200, headers: { 'content-type': 'text/plain' } }))) as unknown as typeof fetch)
    const h = await makeApp()
    try {
      const parent = await createFamilyAsParent(h.app, 'public-domain-imp')
      const res = await h.app.inject({
        method: 'POST',
        url: '/api/content/imports/public-domain/gutenberg-11',
        headers: authHeaders(parent.token),
        payload: { ageStage: '6-8' },
      })
      expect(res.statusCode).toBe(201)
      expect(res.json().id).toMatch(/^imp:/)
      expect(res.json().chapterCount).toBe(2)

      // 同内容重复导入：按 sha256 幂等命中既有行（同 imp: id）
      const again = await h.app.inject({
        method: 'POST',
        url: '/api/content/imports/public-domain/gutenberg-11',
        headers: authHeaders(parent.token),
        payload: { ageStage: '6-8' },
      })
      expect(again.json().duplicate).toBe(true)
      expect(again.json().id).toBe(res.json().id)
    } finally {
      await h.app.close()
      await h.db.$disconnect()
    }
  })
})
