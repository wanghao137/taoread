import { describe, expect, it } from 'vitest'
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
