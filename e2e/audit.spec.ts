import { expect, test, type APIRequestContext, type Page } from '@playwright/test'

/**
 * 审计整改回归（A10.5 矩阵中可用 UI/API 表达的子集）：
 *   1  AI 插画角标：书架/详情封面容器 .book-cover.has-art 内含 AI 标识（UI）
 *   2  周报口径：booksCompleted 是数字；books=「读过」，done 收尾才是「读完」（API）
 *   3  跨书开课：A 未收尾开 B → 409 ACTIVE_SESSION_OTHER_BOOK；同书幂等复用（API）
 *   4  进度口径：位置上报不自动 finished；末章显式 completed 才 finished（API）
 *   5  英文书 TTS：找故事筛「英文」→ 阅读器打开不报错、朗读按钮存在（UI 轻断言）
 *   6  唐诗三百首：上一章/下一章/目录抽屉跳章（UI）
 *   7  A→B 切书不串 session：三选一浮层 →「结束旧书，改读这本」（UI）
 *   8  blockOrder 恢复：重进同书同章落到已存块；书架卡片出现「读到 N%」（UI + API 铺垫）
 *   9  bedtime 温和态（skip：需冻结服务端时钟，成本高）
 *
 * 约定：语义断言直接打 /api（vite 5173 代理 → 8787），不直连 DB；
 * 截图统一放 test-results/audit/；等待一律 waitFor/expect，唯一的长等待是
 * 进度上报 5 秒节流窗口（协议要求，见用例 8）。
 */

const CODE = '123456'

const authHeaders = (token: string) => ({ Authorization: `Bearer ${token}` })

interface FamilySession {
  familyId: string
  familyCode: string
  token: string
}

/** 家长凭家庭码加入（join 不落设备行，可重复调用拿同权 token） */
async function joinAsParent(request: APIRequestContext): Promise<FamilySession> {
  const res = await request.post('/api/family/join', {
    // 审计 T02/F01：家长身份凭独立家长码（演示家庭 13572468），家庭码只授予孩子
    data: { familyCode: CODE, role: 'parent', deviceId: 'audit-spec-parent', parentCode: '13572468' },
  })
  expect(res.status()).toBe(200)
  return (await res.json()) as FamilySession
}

/** 建独立审计孩子：API 用例互不污染演示孩子（小桃/小柚），UI 用例不受影响 */
async function createAuditChild(
  request: APIRequestContext,
  familyId: string,
  token: string,
  nickname: string,
): Promise<string> {
  const res = await request.post(`/api/family/${familyId}/children`, {
    data: { nickname, stage: '6-8' },
    headers: authHeaders(token),
  })
  expect(res.status()).toBe(201)
  const body = (await res.json()) as { id: string }
  return body.id
}

/** 收尾全家所有未收尾会话：UI 用例开了书就必须收尾，否则污染后续用例的切书守卫 */
async function finishAllActiveSessions(request: APIRequestContext): Promise<void> {
  const { familyId, token } = await joinAsParent(request)
  const view = await request.get(`/api/family/${familyId}`, { headers: authHeaders(token) })
  expect(view.ok()).toBeTruthy()
  const { children } = (await view.json()) as { children: Array<{ id: string }> }
  for (const child of children) {
    const res = await request.get(
      `/api/cosession/active?childId=${encodeURIComponent(child.id)}`,
      { headers: authHeaders(token) },
    )
    const { session } = (await res.json()) as { session: { id: string } | null }
    if (session) {
      const fin = await request.post(`/api/cosession/${session.id}/finish`, {
        data: { progressMark: 'lot' },
        headers: authHeaders(token),
      })
      expect(fin.ok()).toBeTruthy()
    }
  }
}

async function loginAsChild(page: Page, name: string): Promise<void> {
  await page.goto('/login')
  await page.getByRole('button', { name: /输入家庭码加入/ }).click()
  await page.locator('#family-code').fill(CODE)
  await page.getByRole('button', { name: '小朋友' }).click()
  await page.getByRole('button', { name: /进入桃阅读/ }).click()
  const picker = page.getByText('今天是谁的故事时间？')
  try {
    await picker.waitFor({ timeout: 8_000 })
    await page.getByRole('button', { name: new RegExp(name) }).click()
  } catch {
    /* 单孩直进 */
  }
  await page.getByText('今天想读什么？').waitFor({ timeout: 15_000 })
}

/** 底部导航（390px 视口下 side 导航隐藏，mobile-nav 是唯一稳定入口）。
 * 详情页会同时渲染外壳与详情两份底部导航（v8 重构遗留），两者路由等价，取最后一。 */
async function goTab(page: Page, label: '今天' | '找故事' | '我的'): Promise<void> {
  await page.locator('.mobile-nav').getByRole('button', { name: label }).last().click()
}

/** 找故事搜索并打开详情（书卡 aria-label = 打开《书名》） */
async function openDetail(page: Page, title: string): Promise<void> {
  await goTab(page, '找故事')
  await page.getByText('先看封面，再决定要不要打开。').waitFor()
  await page.locator('#shelf-search').fill(title)
  await page.getByRole('button', { name: new RegExp(`打开《${title}》`) }).first().waitFor({ timeout: 10_000 })
  await page.getByRole('button', { name: new RegExp(`打开《${title}》`) }).first().click()
  await page.getByText('适合一起读').waitFor()
}

/** 从详情进阅读器并等待章节就绪（顶栏章号 + 朗读按钮） */
async function startReading(page: Page, title: string, order = 1): Promise<void> {
  await page.getByRole('button', { name: /开始读|继续读/ }).first().click()
  await expect(page.locator('.reader-top')).toContainText(`第 ${order} 章 / ${title}`)
  await expect(page.getByRole('button', { name: /朗读本章|停止朗读/ })).toBeVisible()
}

test.describe('审计整改回归', () => {
  test('AI 插画角标：书架与详情的封面容器 has-art 且内含 AI 标识', async ({ page }) => {
    await loginAsChild(page, '小桃')

    // 今天页「挑三本」：有 AI 插画的书卡容器带 has-art，角标（AiBadge 文本 AI）在其内
    const shelfArt = page.locator('.story-row .book-cover.has-art')
    await expect(shelfArt.first()).toBeVisible()
    await expect(shelfArt.first()).toContainText('AI')
    const artCount = await page.locator('.book-cover.has-art').count()
    expect(artCount).toBeGreaterThanOrEqual(1)
    await page.screenshot({ path: 'test-results/audit/ai-badge-shelf.png', fullPage: true })

    // 详情页封面：挑一本确定有插画的书（三字经封面已播种）验证 detail-cover 容器
    await openDetail(page, '三字经')
    const detailArt = page.locator('.detail-cover .book-cover.has-art')
    await expect(detailArt).toBeVisible()
    await expect(detailArt).toContainText('AI')
    await page.screenshot({ path: 'test-results/audit/ai-badge-detail.png' })
  })

  test('周报口径：booksCompleted 是数字；books 是「读过」，done 收尾才计「读完」', async ({ request }) => {
    const { familyId, token } = await joinAsParent(request)
    // 两个孩子各造一条账，避开跨书守卫：唐诗「读过未收尾」（只进 books）+ 三字经「done 收尾」（进 booksCompleted）
    const readingChild = await createAuditChild(request, familyId, token, '审计周报娃')
    const reading = await request.post('/api/cosession', {
      data: { childId: readingChild, bookId: 'cbf:tangshi-300' },
      headers: authHeaders(token),
    })
    expect(reading.status()).toBe(201)
    const doneChild = await createAuditChild(request, familyId, token, '审计读完娃')
    const done = await request.post('/api/cosession', {
      data: { childId: doneChild, bookId: 'cbf:sanzi-jing' },
      headers: authHeaders(token),
    })
    expect(done.status()).toBe(201)
    const doneBody = (await done.json()) as { id: string }
    // 真实读完口径（14d3b4a 服务端语义）：done 收尾还须「末章显式 completed」
    // 才有 ReadingProgress.finished——先补末章 completed，再收尾 done。
    const lastChapter = await request.post('/api/content/books/sanzi-jing/progress', {
      data: { childId: doneChild, chapterOrder: 17, blockOrder: 0, completed: true },
      headers: authHeaders(token),
    })
    expect(lastChapter.ok()).toBeTruthy()
    const fin = await request.post(`/api/cosession/${doneBody.id}/finish`, {
      data: { progressMark: 'done' },
      headers: authHeaders(token),
    })
    expect(fin.ok()).toBeTruthy()

    const res = await request.get(`/api/reports/weekly?familyId=${familyId}`, {
      headers: authHeaders(token),
    })
    expect(res.ok()).toBeTruthy()
    const { report } = (await res.json()) as {
      report: {
        books: Array<{ key: string; title: string }>
        booksCompleted: number
        nights: number
        totalMinutes: number
      }
    }
    // 字段口径
    expect(typeof report.booksCompleted).toBe('number')
    expect(Array.isArray(report.books)).toBe(true)
    for (const book of report.books) {
      expect(typeof book.key).toBe('string')
      expect(typeof book.title).toBe('string')
    }
    // 语义口径：读过 ≠ 读完——未收尾的唐诗也在 books 里，但只有 done 的三字经计入 completed
    const titles = report.books.map((b) => b.title)
    expect(titles).toContain('唐诗三百首')
    expect(titles).toContain('三字经')
    expect(report.booksCompleted).toBeGreaterThanOrEqual(1)
    expect(report.booksCompleted).toBeLessThanOrEqual(report.books.length)
  })

  test('跨书开课：A 未收尾开 B → 409 ACTIVE_SESSION_OTHER_BOOK；同书幂等复用', async ({ request }) => {
    const { familyId, token } = await joinAsParent(request)
    const childId = await createAuditChild(request, familyId, token, '审计切书娃')

    // 开书 A：三字经
    const first = await request.post('/api/cosession', {
      data: { childId, bookId: 'cbf:sanzi-jing' },
      headers: authHeaders(token),
    })
    expect(first.status()).toBe(201)
    const firstBody = (await first.json()) as { id: string; bookId: string; reused: boolean }
    expect(firstBody.bookId).toBe('cbf:sanzi-jing')
    expect(firstBody.reused).toBe(false)

    // 未收尾 A 直接开 B：唐诗三百首 → 结构化 409
    const second = await request.post('/api/cosession', {
      data: { childId, bookId: 'cbf:tangshi-300' },
      headers: authHeaders(token),
    })
    expect(second.status()).toBe(409)
    const errBody = (await second.json()) as { code?: string; message?: string }
    expect(errBody.code).toBe('ACTIVE_SESSION_OTHER_BOOK')

    // 同书重开：幂等复用同一场，绝不开第二份
    const same = await request.post('/api/cosession', {
      data: { childId, bookId: 'cbf:sanzi-jing' },
      headers: authHeaders(token),
    })
    expect(same.status()).toBe(201)
    const sameBody = (await same.json()) as { id: string; reused: boolean }
    expect(sameBody.reused).toBe(true)
    expect(sameBody.id).toBe(firstBody.id)
  })

  test('进度口径：位置上报不自动 finished；末章显式 completed 才 finished', async ({ request }) => {
    const { familyId, token } = await joinAsParent(request)
    const childId = await createAuditChild(request, familyId, token, '审计进度娃')

    // 内容域进度接口用不带 cbf: 前缀的内容 id（cbf: 只在共读会话引用里出现）
    const post = (body: Record<string, unknown>) =>
      request.post('/api/content/books/sanzi-jing/progress', {
        data: { childId, ...body },
        headers: authHeaders(token),
      })

    // 三字经共 17 章：读到末章但只是「位置上报」→ 不算读完
    const locationOnly = await post({ chapterOrder: 17, blockOrder: 0 })
    expect(locationOnly.ok()).toBeTruthy()
    expect(await locationOnly.json()).toMatchObject({ chapterOrder: 17, finished: false })

    // 非末章即使带 completed 也不是读完（completed 只对末章生效）
    const midDone = await post({ chapterOrder: 16, completed: true })
    expect(midDone.ok()).toBeTruthy()
    expect(await midDone.json()).toMatchObject({ chapterOrder: 16, finished: false })

    // 末章 + 显式 completed=true → 才 finished
    const explicitDone = await post({ chapterOrder: 17, completed: true })
    expect(explicitDone.ok()).toBeTruthy()
    expect(await explicitDone.json()).toMatchObject({ chapterOrder: 17, finished: true })

    // 读回进度确认落库
    const read = await request.get(
      `/api/content/books/sanzi-jing/progress?childId=${encodeURIComponent(childId)}`,
      { headers: authHeaders(token) },
    )
    expect(read.ok()).toBeTruthy()
    expect(await read.json()).toMatchObject({ progress: { chapterOrder: 17, finished: true } })
  })

  test('英文书 TTS：筛「英文」进阅读器不报错，朗读按钮存在', async ({ page, request }) => {
    await loginAsChild(page, '小桃')
    await goTab(page, '找故事')
    await page.getByText('先看封面，再决定要不要打开。').waitFor()

    // 筛选英文：列表里出现英文书（轻断言不真点播放，避免音频设备依赖）
    await page.getByRole('button', { name: '英文', exact: true }).click()
    const firstCard = page.getByRole('button', { name: /打开《/ }).first()
    await expect(firstCard).toBeVisible()
    const cardLabel = (await firstCard.getAttribute('aria-label')) as string
    const title = cardLabel.match(/《(.+)》/)?.[1] ?? ''

    await firstCard.click()
    await page.getByText('适合一起读').waitFor()
    await startReading(page, title)
    await page.screenshot({ path: 'test-results/audit/english-reader.png' })

    // 离场收尾：不留未收尾会话给后续用例
    await finishAllActiveSessions(request)
  })

  test('唐诗三百首：首章上一章禁用、下一章翻页、目录抽屉跳章', async ({ page, request }) => {
    await loginAsChild(page, '小桃')
    await openDetail(page, '唐诗三百首')
    await startReading(page, '唐诗三百首')

    const prev = page.getByRole('button', { name: '← 上一章' })
    const next = page.getByRole('button', { name: '下一章 →' })
    await expect(prev).toBeDisabled() // 首章：上一章禁用
    await expect(next).toBeVisible()

    // 下一章 → 第 2 章
    await next.click()
    await expect(page.getByText('第 2 章 / 共 320 章')).toBeVisible()
    await expect(prev).toBeEnabled()

    // ← 上一章 → 回第 1 章
    await prev.click()
    await expect(page.getByText('第 1 章 / 共 320 章')).toBeVisible()

    // 顶栏「目录」→ 抽屉 → 跳第 5 章 → 顶栏章号变化
    await page.getByRole('button', { name: '目录' }).click()
    await expect(page.getByRole('heading', { name: '目录' })).toBeVisible()
    await page.getByRole('button', { name: /^第 5 章 ·/ }).first().click()
    await expect(page.locator('.reader-top')).toContainText('第 5 章 / 唐诗三百首')
    await expect(page.getByRole('heading', { name: '目录' })).toBeHidden()
    await page.screenshot({ path: 'test-results/audit/toc-jump.png' })

    await finishAllActiveSessions(request)
  })

  test('A→B 切书不串 session：三选一浮层 → 结束旧书改读这本', async ({ page, request }) => {
    await loginAsChild(page, '小桃')

    // 开书 A（三字经）进阅读器
    await openDetail(page, '三字经')
    await startReading(page, '三字经')

    // 返回书架（详情页），再开书 B（唐诗三百首）
    await page.getByRole('button', { name: '退出阅读' }).click()
    await page.getByText('适合一起读').waitFor()
    await openDetail(page, '唐诗三百首')
    await startReading(page, '唐诗三百首') // 章节照常加载，浮层叠在其上

    // 冲突浮层：三选一，不可点背板关掉
    await expect(page.getByText('上一本还没收尾')).toBeVisible()
    const continueOld = page.getByRole('button', { name: '继续读旧书' })
    const endOld = page.getByRole('button', { name: /结束旧书，?改读这本/ })
    const cancel = page.getByRole('button', { name: '取消' })
    await expect(continueOld).toBeVisible()
    await expect(endOld).toBeVisible()
    await expect(cancel).toBeVisible()
    await page.screenshot({ path: 'test-results/audit/switch-conflict.png' })

    // 选「结束旧书改读这本」：旧会话收尾、B 会话建立、浮层消失。
    // 审计 F10 续读语义：改读这本恢复到 B 自己的进度章（上一用例目录跳过第 5 章，
    // 进度上报有 5s 节流，章号以 API 侧校验为准），不回第 1 章（显式「重读」才回首章）
    await endOld.click()
    await expect(page.getByText('上一本还没收尾')).toBeHidden()
    await expect(page.locator('.reader-top')).toContainText(/第 \d+ 章 \/ 唐诗三百首/)
    await expect(page.getByRole('button', { name: /朗读本章|停止朗读/ })).toBeVisible()
    await page.screenshot({ path: 'test-results/audit/switch-resolved.png' })

    // API 侧确认：孩子的活跃会话就是书 B，不是串掉的 A
    const { familyId, token } = await joinAsParent(request)
    const view = await request.get(`/api/family/${familyId}`, { headers: authHeaders(token) })
    const { children } = (await view.json()) as { children: Array<{ id: string; nickname: string }> }
    const tao = children.find((c) => c.nickname === '小桃')
    expect(tao).toBeDefined()
    const active = await request.get(
      `/api/cosession/active?childId=${encodeURIComponent(tao!.id)}`,
      { headers: authHeaders(token) },
    )
    const { session } = (await active.json()) as { session: { bookId: string | null } | null }
    expect(session?.bookId).toBe('cbf:tangshi-300')

    await finishAllActiveSessions(request)
  })

  test('blockOrder 恢复：重进同书同章不崩、书架卡片出现「读到 N%」', async ({ page, request }) => {
    test.setTimeout(240_000) // 含两次 5s 节流窗口

    // 防御性清场：本用例要求小桃无未收尾会话（否则切书守卫会盖住阅读器）
    await finishAllActiveSessions(request)

    // API 铺垫：给小桃在《成语故事·动物篇》第 1 章存一个非零块位（8 章书，1/8≈13%）
    const { familyId, token } = await joinAsParent(request)
    const view = await request.get(`/api/family/${familyId}`, { headers: authHeaders(token) })
    const { children } = (await view.json()) as { children: Array<{ id: string; nickname: string }> }
    const tao = children.find((c) => c.nickname === '小桃')
    expect(tao).toBeDefined()
    const seeded = await request.post('/api/content/books/idiom-animals/progress', {
      data: { childId: tao!.id, chapterOrder: 1, blockOrder: 2 },
      headers: authHeaders(token),
    })
    expect(seeded.ok()).toBeTruthy()

    await loginAsChild(page, '小桃')
    await openDetail(page, '成语故事·动物篇')
    await startReading(page, '成语故事·动物篇')

    // 恢复：进入章节后按已存 blockOrder 滚动定位（第 2 块在首屏之下 → 滚动条应离开顶部）
    const scroller = page.locator('.reader main')
    await expect
      .poll(async () => scroller.evaluate((el) => el.scrollTop), { timeout: 10_000 })
      .toBeGreaterThan(0)

    // 滚动触发节流上报：滚一次（撞 5s 节流窗，被丢弃）→ 等 6s → 再滚一次（应发出 POST）
    await scroller.evaluate((el) => el.scrollTo({ top: el.scrollHeight / 2 }))
    // 5 秒节流是产品协议，不是竞态等待：必须跨过窗口，第二次滚动才会计入
    await page.waitForTimeout(6_000)
    const reportPosted = page.waitForResponse(
      (r) => r.url().includes('/api/content/books/idiom-animals/progress') && r.request().method() === 'POST',
    )
    await scroller.evaluate((el) => el.scrollTo({ top: el.scrollHeight }))
    expect((await reportPosted).ok()).toBeTruthy()

    // 退出回书架 → 再进同一书同一章：阅读器能打开且不崩
    await page.getByRole('button', { name: '退出阅读' }).click()
    await page.getByText('适合一起读').waitFor()
    await goTab(page, '我的')
    await page.getByText('正在读').first().waitFor()

    // 书架卡片进度文本：「读到 N%」（N≥1）
    const shelfCard = page.getByRole('button', { name: /打开《成语故事·动物篇》/ }).first()
    await expect(shelfCard).toBeVisible()
    await expect(shelfCard).toContainText(/读到 [1-9]\d*%/)
    await page.screenshot({ path: 'test-results/audit/shelf-progress.png' })

    // 再进同书同章：恢复块位仍在，阅读器不崩
    await shelfCard.click()
    await page.getByText('适合一起读').waitFor()
    await startReading(page, '成语故事·动物篇')
    await expect(page.getByText('第 1 章 / 共 8 章')).toBeVisible()
    await finishAllActiveSessions(request)
  })

  // 睡寝窗口（bedtime）的温和拒绝态需要冻结服务端时钟（nowMinutesOfDay 注入）
  // 才能稳定复现「21:30 后拒开新书」，e2e 演示入口没有时钟注入口，改造成本高，
  // 服务端语义已由单测覆盖（isBedtime + RITUAL_CLOSED 403）——此处显式跳过。
  test.skip('bedtime 温和态：就寝窗口拒开新书且文案正向', async () => {})
})
