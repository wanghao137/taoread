import { test, expect, type APIRequestContext, type Page } from '@playwright/test'
import { randomUUID } from 'node:crypto'
import type { PhonicsAttemptDto, PhonicsAtlasWordDto } from '@taoread/shared'

const root = '/api/phonics/v2'
async function seed(request: APIRequestContext) {
  const response = await request.post('/api/family', { data: { deviceId: randomUUID(), agreeVersion: '2026-09-28-test', parentPin: '864209' } })
  expect(response.status()).toBe(201)
  const parent = await response.json() as { token: string; familyId: string; familyCode: string }
  const headers = { authorization: `Bearer ${parent.token}` }
  const child = await (await request.post(`/api/family/${parent.familyId}/children`, { headers, data: { nickname: '课堂测试', stage: '6-8' } })).json() as { id: string }
  const joined = await (await request.post('/api/family/join', { data: { familyCode: parent.familyCode, role: 'child', deviceId: randomUUID() } })).json() as { token: string }
  const catalog = await (await request.get(`${root}/catalog`, { headers })).json() as { versions: Array<{ versionId: string }> }
  const versionId = catalog.versions[0]!.versionId
  expect((await request.put(`${root}/children/${child.id}/enrollment`, { headers, data: { enabled: true, versionId, entryMode: 'lesson', entryLessonKey: 'L07', expectedRevision: 0 } })).status()).toBe(200)
  return { ...parent, childId: child.id, childToken: joined.token, versionId }
}

async function login(page: Page, state: Awaited<ReturnType<typeof seed>>) {
  await page.addInitScript(s => localStorage.setItem('taoread-session', JSON.stringify({ state: { token: s.childToken, familyId: s.familyId, familyCode: s.familyCode, role: 'child', childId: s.childId, childStage: '6-8', calmMode: false }, version: 1 })), state)
}

async function completeLesson(request: APIRequestContext, state: Awaited<ReturnType<typeof seed>>) {
  const headers = { authorization: `Bearer ${state.childToken}` }
  let attempt = (await (await request.post(`${root}/children/${state.childId}/attempts`, { headers, data: { clientAttemptId: randomUUID(), versionId: state.versionId, planKind: 'lesson', resourceKey: 'L07' } })).json()).attempt as PhonicsAttemptDto
  async function event(kind: string, payload: object = {}) {
    const response = await request.post(`${root}/attempts/${attempt.id}/events`, { headers, data: { clientEventId: randomUUID(), expectedRevision: attempt.revision, taskInstanceId: attempt.state.taskInstanceId, kind, payload } })
    expect(response.status()).toBe(200)
    attempt = (await response.json()).attempt as PhonicsAttemptDto
  }
  for (let i = 0; attempt.task && i < 30; i++) {
    if (attempt.task.kind === 'listen') await event('step_ack')
    else if (attempt.task.kind === 'choice') await event('response_submitted', { answerIds: ['m'] })
    else if (attempt.task.kind === 'build') await event('response_submitted', { answerIds: ['m', 'a', 'p'] })
    else await event('self_read_reported', { report: 'tried' })
    await event(attempt.reader && attempt.state.pageIndex < attempt.reader.pages.length - 1 ? 'reader_page_advanced' : 'step_advanced')
  }
  expect(attempt.task).toBeNull()
  expect((await request.post(`${root}/attempts/${attempt.id}/finish`, { headers, data: { clientEventId: randomUUID(), expectedRevision: attempt.revision } })).status()).toBe(200)
}

for (const width of [390, 768, 1280]) test(`图鉴和布局 ${width}px`, async ({ page, request }, info) => {
  await page.setViewportSize({ width, height: 900 })
  const state = await seed(request); await login(page, state)
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/child/phonics?tab=atlas')
  await expect(page.getByRole('heading', { name: '单词图鉴' })).toBeVisible()
  await page.getByRole('searchbox', { name: '搜索单词或中文释义' }).fill('map')
  await page.getByRole('button', { name: /map/ }).click()
  const dialog = page.getByRole('dialog', { name: 'map 词卡' })
  await expect(dialog).toBeVisible()
  await dialog.getByRole('button', { name: '收藏单词' }).click()
  await expect(dialog.getByRole('button', { name: '取消收藏' })).toBeVisible()
  await expect(dialog.getByRole('button', { name: '听整词' })).toBeEnabled()
  await dialog.getByRole('button', { name: '听整词' }).click()
  await expect(dialog.getByRole('button', { name: '听整词' })).toBeEnabled()
  await page.screenshot({ path: info.outputPath(`word-${width}.png`), fullPage: true })
  await dialog.getByRole('button', { name: '关闭map 词卡' }).click()
  await page.getByRole('searchbox', { name: '搜索单词或中文释义' }).fill('')
  await page.getByRole('button', { name: '收藏', exact: true }).click()
  await expect(page.getByRole('button', { name: /map/ })).toBeVisible()
  await page.screenshot({ path: info.outputPath(`atlas-${width}.png`), fullPage: true })
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  expect(errors).toEqual([])
})

test('单词练习断线恢复和 FSRS 学习', async ({ page, request }, info) => {
  await page.setViewportSize({ width: 390, height: 900 })
  const state = await seed(request); await completeLesson(request, state); await login(page, state)
  const headers = { authorization: `Bearer ${state.childToken}` }
  const atlas = (await (await request.get(`${root}/children/${state.childId}/atlas`, { headers })).json()).atlas as { words: PhonicsAtlasWordDto[] }
  await page.goto('/child/phonics')
  await page.getByRole('button', { name: '开始单词学习' }).click()
  await expect(page.getByRole('region', { name: '认识新单词' })).toBeVisible()
  await expect(page.getByRole('button', { name: '继续', exact: true })).toBeEnabled()
  const otherTab = await page.context().newPage()
  await otherTab.goto('/child/phonics?tab=practice')
  await expect(otherTab.getByRole('region', { name: '认识新单词' })).toBeVisible()
  await otherTab.close()
  await page.getByRole('button', { name: '暂停' }).click()
  await page.getByRole('button', { name: '结束上次练习' }).click()
  await page.getByRole('button', { name: /选择词义/ }).click()
  const targetText = await page.locator('.ph-question-word').textContent()
  const target = atlas.words.find(word => word.text === targetText)!
  let lost = false
  await page.route('**/api/phonics/v2/children/*/practice', async route => {
    if (route.request().method() === 'POST' && !lost) { lost = true; await route.fetch(); await route.abort('failed') } else await route.continue()
  })
  await page.getByRole('group', { name: '选择答案' }).getByRole('button', { name: target.meaningZh, exact: true }).click()
  await expect(page.getByRole('button', { name: '重新保存答案' })).toBeVisible()
  await page.reload()
  const retry = page.waitForResponse(response => response.url().endsWith('/practice') && response.request().method() === 'POST')
  await page.getByRole('button', { name: '重新保存答案' }).click()
  expect((await (await retry).json()).repeated).toBe(true)
  await expect(page.getByText('答对了')).toBeVisible()
  await page.unroute('**/api/phonics/v2/children/*/practice')
  expect((await (await request.get(`${root}/children/${state.childId}/practice`, { headers })).json()).total).toBe(1)
  await page.getByRole('button', { name: '暂停' }).click()
  await page.getByRole('button', { name: '结束上次练习' }).click()
  await page.getByRole('button', { name: /今日单词学习/ }).click()
  await expect(page.getByRole('region', { name: '认识新单词' })).toBeVisible()
  expect((await page.locator('.ph-exercise').boundingBox())!.width).toBeGreaterThan(300)
  await expect(page.getByRole('button', { name: '听发音' })).toBeEnabled()
  await page.getByRole('button', { name: '听发音' }).click()
  await expect(page.getByRole('button', { name: '听发音' })).toBeEnabled()
  await page.screenshot({ path: info.outputPath('study-intro.png'), fullPage: true })
  let introduced = 0
  while (await page.getByRole('region', { name: '认识新单词' }).isVisible()) {
    introduced++
    await page.getByRole('button', { name: '继续', exact: true }).click()
  }
  expect(introduced).toBe(4)
  await expect(page.locator('.ph-answer-grid button, .ph-spelling input').first()).toBeEnabled()
  const current = await page.evaluate(key => {
    const session = JSON.parse(localStorage.getItem(key)!) as { index: number; questions: Array<{ wordId: string }> }
    return session.questions[session.index]!.wordId
  }, `taoread-phonics-practice:${state.childId}`)
  const studyWord = atlas.words.find(word => word.id === current)!
  if (await page.getByRole('textbox', { name: '输入单词' }).isVisible()) {
    await page.getByRole('textbox', { name: '输入单词' }).fill(studyWord.text!)
    await page.getByRole('button', { name: '确认' }).click()
  } else {
    const label = await page.getByText('这个词是什么意思？').isVisible() ? studyWord.meaningZh : studyWord.text
    await page.getByRole('group', { name: '选择答案' }).getByRole('button', { name: label, exact: true }).click()
  }
  await expect(page.getByText('答对了')).toBeVisible()
  expect((await (await request.get(`${root}/children/${state.childId}/study-schedule`, { headers })).json()).newWordIds).toHaveLength(3)
  await page.getByRole('button', { name: '暂停' }).click()
  await page.getByRole('button', { name: '图鉴', exact: true }).click()
  await page.getByRole('button', { name: '学习中', exact: true }).click()
  await expect(page.getByRole('button', { name: new RegExp(studyWord.text!) })).toBeVisible()
  await page.getByRole('button', { name: '我的', exact: true }).click()
  await expect(page.getByText('未来 7 天复习')).toBeVisible()
  await page.screenshot({ path: info.outputPath('progress.png'), fullPage: true })
})

test('看图题使用已开放小书的句子挖空', async ({ page, request }, info) => {
  await page.setViewportSize({ width: 390, height: 900 })
  const state = await seed(request); await completeLesson(request, state); await login(page, state)
  const headers = { authorization: `Bearer ${state.childToken}` }
  const session = { id: randomUUID(), versionId: state.versionId, track: 'study', questions: [{ id: randomUUID(), wordId: 'w-sam', mode: 'picture', choices: ['w-sam', 'w-map'], isNew: true }], index: 0, showIntro: false, firstCorrect: 0, feedback: null, pending: null }
  expect((await request.put(`${root}/children/${state.childId}/word-session`, { headers, data: { clientEventId: randomUUID(), expectedRevision: 0, versionId: state.versionId, session } })).status()).toBe(200)
  await page.goto('/child/phonics?tab=practice')
  await expect(page.getByRole('heading', { name: '看图，补全句子' })).toBeVisible()
  await expect(page.getByLabel('空格 sat.')).toHaveText('____ sat.')
  await page.screenshot({ path: info.outputPath('sentence-gap-mobile.png'), fullPage: true })
  await page.getByRole('group', { name: '选择答案' }).getByRole('button', { name: 'Sam', exact: true }).click()
  await expect(page.getByText('答对了')).toBeVisible()
})

test('两个设备续学、冲突与同步回执丢失恢复', async ({ page, request, browser }) => {
  const state = await seed(request); await completeLesson(request, state); await login(page, state)
  await page.goto('/child/phonics?tab=practice')
  await page.getByRole('button', { name: /今日单词学习/ }).click()
  await expect(page.getByRole('region', { name: '认识新单词' })).toBeVisible()
  await expect(page.getByRole('button', { name: '继续', exact: true })).toBeEnabled()
  await page.getByRole('button', { name: '继续', exact: true }).click()
  await expect(page.getByText('2 / 8', { exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: '继续', exact: true })).toBeEnabled()

  const second = await browser.newContext({ locale: 'zh-CN', viewport: { width: 390, height: 900 } })
  const other = await second.newPage(); await login(other, state)
  await other.goto('/child/phonics?tab=practice')
  await expect(other.getByText('2 / 8', { exact: true })).toBeVisible()
  await other.getByRole('button', { name: '继续', exact: true }).click()
  await expect(other.getByText('3 / 8', { exact: true })).toBeVisible()
  await expect(other.getByRole('button', { name: '继续', exact: true })).toBeEnabled()

  await page.getByRole('button', { name: '继续', exact: true }).click()
  await expect(page.getByText('另一设备的进度已更新，本机未同步内容仍保留在此设备。')).toBeVisible()
  await page.getByRole('button', { name: '读取另一设备进度' }).click()
  await expect(page.getByText('3 / 8', { exact: true })).toBeVisible()
  expect(await page.evaluate(child => Object.keys(localStorage).some(key => key.startsWith(`taoread-phonics-practice:${child}:conflict:`)), state.childId)).toBe(true)

  let lost = false
  await page.route('**/api/phonics/v2/children/*/word-session', async route => {
    if (route.request().method() === 'PUT' && !lost) { lost = true; await route.fetch(); await route.abort('failed') } else await route.continue()
  })
  await page.getByRole('button', { name: '继续', exact: true }).click()
  await expect(page.getByText('学习进度暂时没有同步。')).toBeVisible()
  const firstContext = page.context()
  await page.close()
  const reopened = await firstContext.newPage()
  await reopened.goto('/child/phonics?tab=practice')
  await expect(reopened.getByText('4 / 8', { exact: true })).toBeVisible()
  await expect(reopened.getByRole('button', { name: '继续', exact: true })).toBeEnabled()
  await reopened.close()
  await second.close()
})

test('冲突草稿可以恢复，且原云端进度仍可找回', async ({ page, request, browser }) => {
  const state = await seed(request); await completeLesson(request, state); await login(page, state)
  await page.goto('/child/phonics?tab=practice')
  await page.getByRole('button', { name: /今日单词学习/ }).click()
  await expect(page.getByRole('button', { name: '继续', exact: true })).toBeEnabled()
  const second = await browser.newContext({ locale: 'zh-CN', viewport: { width: 390, height: 900 } })
  const other = await second.newPage(); await login(other, state)
  await other.goto('/child/phonics?tab=practice')
  for (const progress of ['2 / 8', '3 / 8']) {
    await other.getByRole('button', { name: '继续', exact: true }).click()
    await expect(other.getByText(progress, { exact: true })).toBeVisible()
    await expect(other.getByRole('button', { name: '继续', exact: true })).toBeEnabled()
  }
  await page.getByRole('button', { name: '继续', exact: true }).click()
  await expect(page.getByText('另一设备的进度已更新，本机未同步内容仍保留在此设备。')).toBeVisible()
  await page.getByRole('button', { name: '读取另一设备进度' }).click()
  await expect(page.getByText('3 / 8', { exact: true })).toBeVisible()
  await page.getByText('本机保留的进度（1）').click()
  await expect(page.getByText(/单词学习 2 \/ 8/)).toBeVisible()
  page.on('dialog', dialog => void dialog.accept())
  const offline = async (route: import('@playwright/test').Route) => route.request().method() === 'GET' ? route.abort('failed') : route.continue()
  await page.route('**/api/phonics/v2/children/*/word-session', offline)
  await page.getByRole('button', { name: '恢复草稿 1' }).click()
  await expect(page.getByText('学习进度暂时没有同步。')).toBeVisible()
  await page.unroute('**/api/phonics/v2/children/*/word-session', offline)
  await page.getByRole('button', { name: '重新同步' }).click()
  await expect(page.getByText('3 / 8', { exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: '恢复草稿 1' })).toBeEnabled()
  let lost = false
  await page.route('**/api/phonics/v2/children/*/word-session', async route => {
    if (route.request().method() === 'PUT' && !lost) { lost = true; await route.fetch(); await route.abort('failed') } else await route.continue()
  })
  await page.getByRole('button', { name: '恢复草稿 1' }).click()
  await expect(page.getByText('学习进度暂时没有同步。')).toBeVisible()
  const context = page.context()
  await page.close()
  const reopened = await context.newPage()
  await reopened.goto('/child/phonics?tab=practice')
  await expect(reopened.getByText('2 / 8', { exact: true })).toBeVisible()
  await reopened.getByText('本机保留的进度（1）').click()
  await expect(reopened.getByText(/单词学习 3 \/ 8/)).toBeVisible()
  await other.reload()
  await expect(other.getByText('2 / 8', { exact: true })).toBeVisible()
  reopened.on('dialog', dialog => void dialog.accept())
  await reopened.getByRole('button', { name: '恢复草稿 1' }).click()
  await expect(reopened.getByText('3 / 8', { exact: true })).toBeVisible()
  await expect(reopened.getByText(/单词学习 2 \/ 8/)).toBeVisible()
  await second.close()
})

test('恢复草稿时另一设备推进不会被覆盖', async ({ page, request, browser }) => {
  const state = await seed(request); await completeLesson(request, state); await login(page, state)
  await page.goto('/child/phonics?tab=practice')
  await page.getByRole('button', { name: /今日单词学习/ }).click()
  await expect(page.getByRole('button', { name: '继续', exact: true })).toBeEnabled()
  await page.evaluate(({ childId, versionId }) => {
    const key = `taoread-phonics-practice:${childId}`
    const session = JSON.parse(localStorage.getItem(key)!) as { index: number }
    session.index = 2
    const clientEventId = crypto.randomUUID()
    const draftKey = `${key}:conflict:${clientEventId}`
    localStorage.setItem(draftKey, JSON.stringify({ clientEventId, expectedRevision: 1, versionId, session }))
    window.dispatchEvent(new StorageEvent('storage', { key: draftKey }))
  }, state)
  await page.getByText('本机保留的进度（1）').click()
  const second = await browser.newContext({ locale: 'zh-CN', viewport: { width: 390, height: 900 } })
  const other = await second.newPage(); await login(other, state)
  await other.goto('/child/phonics?tab=practice')
  await expect(other.getByRole('button', { name: '继续', exact: true })).toBeEnabled()
  await page.route('**/api/phonics/v2/children/*/word-session', async route => {
    if (route.request().method() !== 'GET') return route.continue()
    const response = await route.fetch()
    await other.getByRole('button', { name: '继续', exact: true }).click()
    await expect(other.getByText('2 / 8', { exact: true })).toBeVisible()
    await expect(other.getByRole('button', { name: '继续', exact: true })).toBeEnabled()
    await route.fulfill({ response })
  })
  page.on('dialog', dialog => void dialog.accept())
  await page.getByRole('button', { name: '恢复草稿 1' }).click()
  await expect(page.getByText('另一设备的进度已更新，本机未同步内容仍保留在此设备。')).toBeVisible()
  const headers = { authorization: `Bearer ${state.childToken}` }
  const remote = await (await request.get(`${root}/children/${state.childId}/word-session`, { headers })).json()
  expect(remote.session.index).toBe(1)
  expect(await page.evaluate(child => Object.keys(localStorage).some(key => key.startsWith(`taoread-phonics-practice:${child}:conflict:`)), state.childId)).toBe(true)
  await second.close()
})

test('同一浏览器的两个离线页面分别保留未同步进度', async ({ page, request }) => {
  const state = await seed(request); await completeLesson(request, state); await login(page, state)
  await page.goto('/child/phonics?tab=practice')
  await page.getByRole('button', { name: /今日单词学习/ }).click()
  await expect(page.getByRole('button', { name: '继续', exact: true })).toBeEnabled()
  const other = await page.context().newPage()
  await other.goto('/child/phonics?tab=practice')
  await expect(other.getByRole('button', { name: '继续', exact: true })).toBeEnabled()
  const offline = async (route: import('@playwright/test').Route) => route.request().method() === 'PUT' ? route.abort('failed') : route.continue()
  await page.route('**/api/phonics/v2/children/*/word-session', offline)
  await other.route('**/api/phonics/v2/children/*/word-session', offline)
  await page.getByRole('button', { name: '继续', exact: true }).click()
  await other.getByRole('button', { name: '继续', exact: true }).click()
  await expect(page.getByText('学习进度暂时没有同步。')).toBeVisible()
  await expect(other.getByText('学习进度暂时没有同步。')).toBeVisible()
  expect(await page.evaluate(child => Object.keys(localStorage).filter(key => key.startsWith(`taoread-phonics-practice:${child}:mutation:`)).length, state.childId)).toBe(2)
  await page.unroute('**/api/phonics/v2/children/*/word-session')
  await page.getByRole('button', { name: '重新同步' }).click()
  await expect(page.getByRole('button', { name: '继续', exact: true })).toBeEnabled()
  await other.unroute('**/api/phonics/v2/children/*/word-session')
  await other.getByRole('button', { name: '重新同步' }).click()
  await expect(other.getByText('另一设备的进度已更新，本机未同步内容仍保留在此设备。')).toBeVisible()
  expect(await other.evaluate(child => Object.keys(localStorage).filter(key => key.startsWith(`taoread-phonics-practice:${child}:mutation:`)).length, state.childId)).toBe(1)
  await other.close()
})

test('旧版本本机待确认答案迁移后仍可幂等恢复', async ({ page, request }) => {
  const state = await seed(request); await completeLesson(request, state); await login(page, state)
  const headers = { authorization: `Bearer ${state.childToken}` }
  const questionId = randomUUID()
  const pending = { clientEventId: randomUUID(), questionId, versionId: state.versionId, wordId: 'w-map', mode: 'meaning', track: 'study', answer: 'w-map' }
  expect((await request.post(`${root}/children/${state.childId}/practice`, { headers, data: pending })).status()).toBe(200)
  await page.addInitScript(({ childId, versionId, questionId, pending }) => {
    localStorage.setItem(`taoread-phonics-practice:${childId}`, JSON.stringify({ versionId, track: 'study', questions: [{ id: questionId, wordId: 'w-map', mode: 'meaning', choices: ['w-map', 'w-mat'], isNew: true }], index: 0, showIntro: false, firstCorrect: 0, feedback: null, pending }))
  }, { childId: state.childId, versionId: state.versionId, questionId, pending })
  await page.goto('/child/phonics?tab=practice')
  await expect(page.getByRole('button', { name: '重新保存答案' })).toBeEnabled()
  const receipt = page.waitForResponse(response => response.url().endsWith('/practice') && response.request().method() === 'POST')
  await page.getByRole('button', { name: '重新保存答案' }).click()
  expect((await (await receipt).json()).repeated).toBe(true)
  await expect(page.getByText('答对了')).toBeVisible()
  expect((await (await request.get(`${root}/children/${state.childId}/study-schedule`, { headers })).json()).learnedWordIds).toEqual(['w-map'])
})

test('阅读位置、学习设置和打字记录', async ({ page, request }, info) => {
  await page.setViewportSize({ width: 390, height: 900 })
  const state = await seed(request); await completeLesson(request, state); await login(page, state)
  await page.goto('/child/phonics?tab=shelf')
  await page.getByRole('button', { name: /打开小书/ }).click()
  await expect(page.getByRole('region', { name: '阅读小书' })).toBeVisible()
  await page.getByRole('button', { name: '放大字号' }).click()
  await page.getByRole('button', { name: '下一页' }).click()
  await expect(page.getByText('2 / 2', { exact: true })).toBeVisible()
  await page.getByRole('button', { name: '返回书房' }).click()
  await page.getByRole('button', { name: /打开小书/ }).click()
  await expect(page.getByText('2 / 2', { exact: true })).toBeVisible()
  await expect(page.getByText('26', { exact: true })).toBeVisible()
  const lookup = page.getByRole('button', { name: /^查看 .* 词卡$/ }).first()
  await lookup.click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.getByRole('button', { name: /^关闭.*词卡$/ }).click()
  await page.screenshot({ path: info.outputPath('reader-mobile.png'), fullPage: true })
  await page.getByRole('button', { name: '我的', exact: true }).click()
  await page.getByLabel('每天新词数量').fill('2')
  await page.getByRole('button', { name: '保存设置' }).click()
  await expect(page.getByText('设置已保存')).toBeVisible()
  await page.getByRole('button', { name: '练习', exact: true }).click()
  await page.getByRole('button', { name: /打字练习/ }).click()
  await page.getByRole('button', { name: /例句打字/ }).click()
  let lost = false
  await page.route('**/api/phonics/v2/children/*/typing', async route => {
    if (route.request().method() === 'POST' && !lost) { lost = true; await route.fetch(); await route.abort('failed') } else await route.continue()
  })
  for (let i = 0; i < 10 && await page.getByRole('textbox', { name: '输入英文' }).isVisible(); i++) {
    await page.getByRole('textbox', { name: '输入英文' }).fill((await page.locator('.ph-typing-target').textContent())!)
  }
  await expect(page.getByRole('button', { name: '重新保存' })).toBeVisible()
  await page.getByRole('button', { name: '重新保存' }).click()
  await expect(page.getByText('记录已保存')).toBeVisible()
  await page.unroute('**/api/phonics/v2/children/*/typing')
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
})
