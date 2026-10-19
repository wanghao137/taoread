import { test, expect, type Page, type APIRequestContext } from '@playwright/test'
import { randomUUID } from 'node:crypto'

const root = '/api/phonics/v2'
async function seed(request: APIRequestContext) {
  const familyRes = await request.post('/api/family', { data: { deviceId: randomUUID(), agreeVersion: '2026-09-28-test', parentPin: '864209' } })
  expect(familyRes.status()).toBe(201)
  const parent = await familyRes.json() as { token: string; familyId: string; familyCode: string }
  const headers = { authorization: `Bearer ${parent.token}` }
  const childRes = await request.post(`/api/family/${parent.familyId}/children`, { headers, data: { nickname: '声音小课堂', stage: '6-8' } })
  expect(childRes.status()).toBe(201)
  const child = await childRes.json() as { id: string }
  const joinRes = await request.post('/api/family/join', { data: { familyCode: parent.familyCode, role: 'child', deviceId: randomUUID() } })
  const joined = await joinRes.json() as { token: string }
  const catalog = await (await request.get(`${root}/catalog`, { headers })).json() as { versions: Array<{ versionId: string }> }
  const versionId = catalog.versions[0]!.versionId
  expect((await request.put(`${root}/children/${child.id}/enrollment`, { headers, data: { enabled: true, versionId, entryMode: 'lesson', entryLessonKey: 'L07', expectedRevision: 0 } })).status()).toBe(200)
  return { ...parent, childId: child.id, childToken: joined.token, versionId }
}
async function login(page: Page, s: Awaited<ReturnType<typeof seed>>, parent = false) {
  await page.addInitScript(({ s, parent }) => localStorage.setItem('taoread-session', JSON.stringify({ state: { token: parent ? s.token : s.childToken, familyId: s.familyId, familyCode: s.familyCode, role: parent ? 'parent' : 'child', childId: s.childId, childStage: '6-8', calmMode: false }, version: 1 })), { s, parent })
}
async function listen(page: Page) {
  await page.getByRole('button', { name: /点这里，开始听|再听一次/ }).click()
  await expect(page.getByRole('button', { name: '再听一次', exact: true })).toBeEnabled()
}
async function ack(page: Page) { await listen(page); await page.getByRole('button', { name: '我试过了，继续' }).click(); await page.getByRole('button', { name: '继续', exact: true }).click() }
async function open(page: Page) { await page.goto('/child/phonics'); await page.getByRole('button', { name: /认识 m|第.*m/ }).click() }

for (const width of [390, 768]) test(`完整课堂、失败重试、续页与重读 ${width}px`, async ({ page, request }, info) => {
  await page.setViewportSize({ width, height: 900 })
  const s = await seed(request); await login(page, s)
  const errors: string[] = []
  page.on('pageerror', e => errors.push(e.message))
  await open(page)
  await expect(page.getByRole('button', { name: '我试过了，继续' })).toBeDisabled()
  await ack(page); await ack(page)
  await listen(page)
  await page.getByRole('button', { name: 'a', exact: true }).click()
  await page.getByRole('button', { name: '摆好了' }).click()
  await expect(page.getByText('再听一遍，换个摆法试试。')).toBeVisible()
  await page.getByRole('button', { name: '帮我一下' }).click()
  await page.getByRole('button', { name: '听示范，一起练' }).click()
  await expect(page.getByRole('button', { name: '再试一次', exact: true })).toBeEnabled()
  await page.getByRole('button', { name: '再试一次', exact: true }).click()
  await page.getByRole('button', { name: '先休息' }).click()
  await expect(page.getByText('准备好了，再接着玩')).toBeVisible()
  await page.reload()
  await page.getByRole('button', { name: '接着上次玩' }).click()
  await page.getByRole('button', { name: '接着玩', exact: true }).click()
  await listen(page)
  await page.getByRole('button', { name: 'm', exact: true }).click()
  let failed = false
  await page.route('**/api/phonics/v2/attempts/*/events', async route => {
    if (!failed) { failed = true; await route.fetch(); await route.abort('failed') } else await route.continue()
  })
  await page.getByRole('button', { name: '摆好了' }).click()
  await expect(page.getByRole('button', { name: '重新保存' })).toBeVisible()
  await page.reload()
  const retry = page.waitForResponse(r => r.url().includes('/events') && r.request().method() === 'POST')
  await page.getByRole('button', { name: '重新保存' }).click()
  expect((await (await retry).json()).repeated).toBe(true)
  await page.unroute('**/api/phonics/v2/attempts/*/events')
  await page.getByRole('button', { name: '继续', exact: true }).click()
  await listen(page)
  for (const name of ['m', 'a', 'p']) await page.getByRole('group', { name: '可以摆的字母' }).getByRole('button', { name, exact: true }).click()
  await page.screenshot({ path: info.outputPath(`classroom-${width}.png`), fullPage: true })
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
  expect(overflow).toBe(false)
  await page.getByRole('button', { name: '摆好了' }).click()
  await page.getByRole('button', { name: '继续', exact: true }).click()
  await listen(page); await page.getByRole('button', { name: '我试着读过了' }).click(); await page.getByRole('button', { name: '继续', exact: true }).click()
  await listen(page); await page.getByRole('button', { name: '我试着读过了' }).click(); await page.getByRole('button', { name: '下一页', exact: true }).click()
  await expect(page.getByText('第 2 / 2 页')).toBeVisible()
  await page.reload(); await page.getByRole('button', { name: '接着上次玩' }).click()
  await expect(page.getByText('第 2 / 2 页')).toBeVisible()
  await listen(page); await page.getByRole('button', { name: '想一起读' }).click()
  await page.getByRole('button', { name: '听示范，一起练' }).click()
  await expect(page.getByRole('button', { name: '继续', exact: true })).toBeEnabled()
  await page.getByRole('button', { name: '继续', exact: true }).click()
  await page.getByRole('button', { name: '完成这一段' }).click()
  await expect(page.getByText('今天试过了，也练过了')).toBeVisible()
  await page.getByRole('button', { name: '再读一次', exact: true }).click()
  await expect(page.getByText('第 1 / 2 页')).toBeVisible()
  expect(errors).toEqual([])
  const summary = await (await request.get(`${root}/children/${s.childId}/summary`, { headers: { authorization: `Bearer ${s.token}` } })).json()
  expect(summary.totalAttempts).toBe(2); expect(summary.completedLessonKeys).toHaveLength(1)
  expect(summary.caregiverObservedCount).toBe(0); expect(summary.unobservedOralTaskCount).toBe(3)
})

test('声音失败不开放作答，重试后可听；儿童无观察接口', async ({ page, request }) => {
  const s = await seed(request); await login(page, s)
  await page.route('**/api/media/phonics/**', route => route.abort('failed'))
  await open(page)
  await expect(page.getByRole('button', { name: '重新准备声音和图片' })).toBeVisible()
  await expect(page.getByRole('button', { name: '我试过了，继续' })).toBeDisabled()
  await page.unroute('**/api/media/phonics/**')
  await page.getByRole('button', { name: '重新准备声音和图片' }).click()
  await ack(page)
  const unauthorized = await request.post(`${root}/attempts/not-real/observations`, { headers: { authorization: `Bearer ${s.childToken}` }, data: {} })
  expect(unauthorized.status()).toBe(403)
})

test('家长查看全量摘要、补记更正和暂停开启', async ({ page, request }, info) => {
  const s = await seed(request)
  const headers = { authorization: `Bearer ${s.childToken}` }
  let attempt = (await (await request.post(`${root}/children/${s.childId}/attempts`, { headers, data: { clientAttemptId: randomUUID(), versionId: s.versionId, planKind: 'lesson', resourceKey: 'L07' } })).json()).attempt
  for (let guard = 0; attempt.task && guard < 20; guard++) {
    const kind = attempt.task.kind === 'listen' ? 'step_ack' : ['choice', 'build'].includes(attempt.task.kind) ? 'response_submitted' : 'self_read_reported'
    const payload = kind === 'response_submitted' ? { answerIds: attempt.task.kind === 'choice' ? ['m'] : ['m', 'a', 'p'] } : kind === 'self_read_reported' ? { report: 'tried' } : {}
    const send = async (eventKind: string, eventPayload: object) => (await (await request.post(`${root}/attempts/${attempt.id}/events`, { headers, data: { clientEventId: randomUUID(), expectedRevision: attempt.revision, taskInstanceId: attempt.state.taskInstanceId, kind: eventKind, payload: eventPayload } })).json()).attempt
    attempt = await send(kind, payload)
    attempt = await send(attempt.reader && attempt.state.pageIndex < attempt.reader.pages.length - 1 ? 'reader_page_advanced' : 'step_advanced', {})
  }
  expect((await request.post(`${root}/attempts/${attempt.id}/finish`, { headers, data: { clientEventId: randomUUID(), expectedRevision: attempt.revision } })).status()).toBe(200)
  await login(page, s, true); await page.goto('/parent?tab=内容')
  await expect(page.getByTestId(`phonics-v2-summary-${s.childId}`)).toContainText('开始过 1 段')
  await page.getByText('练习记录与口头观察', { exact: true }).click()
  const row = page.locator('.phonics-observation').first()
  await row.scrollIntoViewIfNeeded()
  await page.screenshot({ path: info.outputPath('parent-before-observation.png'), fullPage: true })
  const observeResponse = () => page.waitForResponse(r => r.url().includes('/observations') && r.request().method() === 'POST', { timeout: 45000 })
  const firstSave = observeResponse()
  await row.getByRole('button', { name: '独立读出', exact: true }).click()
  expect((await firstSave).status()).toBe(200)
  await expect(row.getByRole('button', { name: '更正：需要帮助', exact: true })).toBeEnabled({ timeout: 45000 })
  await expect(row).toContainText('独立尝试读出')
  const correctionSave = observeResponse()
  await row.getByRole('button', { name: '更正：需要帮助', exact: true }).click()
  expect((await correctionSave).status()).toBe(200)
  await expect(row.getByRole('button', { name: '更正：需要帮助', exact: true })).toBeEnabled({ timeout: 45000 })
  await expect(row).toContainText('家长：需要帮助')
  await page.screenshot({ path: info.outputPath('parent-observations-390.png'), fullPage: true })
  const pauseSave = page.waitForResponse(r => r.url().includes('/enrollment') && r.request().method() === 'PUT', { timeout: 45000 })
  await page.getByRole('button', { name: '暂停开启，保留记录' }).click()
  expect((await pauseSave).status()).toBe(200)
  await expect(page.getByRole('button', { name: '保存并开启' })).toBeEnabled({ timeout: 45000 })
  await expect(page.getByText('已暂停英语练习，记录保留', { exact: true })).toBeVisible()
  expect((await (await request.get(`${root}/children/${s.childId}/enrollment`, { headers })).json()).enrollment.enabled).toBe(false)
})
