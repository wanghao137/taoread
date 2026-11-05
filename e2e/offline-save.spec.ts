import { expect, test, type APIRequestContext, type Page } from '@playwright/test'

/**
 * docs/104 路线B M2c 离线内容验证（浏览器语境 = 本地壳同源机制等价）：
 *   1 文字保存：详情页「保存文字到本机」→ IndexedDB 入库 + 7 天离线书架可见
 *   2 断网可读：context.setOffline(true) → /offline.html 渲染章节段落
 *   3 带媒体保存的优雅失败：演示环境无预生成朗读 → 「N 段朗读未准备好」提示（不崩溃、原书保留）
 *
 * 约定沿用 audit.spec：语义断言直接打 /api；登录走 loginAsChild；
 * IndexedDB 断言在页面上下文里 evaluate（taoread-public-offline-v1/books）。
 */

const CODE = '123456'

async function joinAsParent(request: APIRequestContext): Promise<string> {
  const res = await request.post('/api/family/join', {
    data: { familyCode: CODE, role: 'parent', parentPin: '864209', deviceId: 'offline-spec-parent' },
  })
  expect(res.status()).toBe(200)
  return (await res.json() as { token: string }).token
}

/** 从书库找一个 ≤100 章的小书（离线限额内），返回标题（找不到=null） */
async function pickSmallBook(request: APIRequestContext, token: string): Promise<{ id: string; title: string } | null> {
  const res = await request.get('/api/content/books?limit=40', { headers: { Authorization: `Bearer ${token}` } })
  expect(res.status()).toBe(200)
  const { books } = (await res.json()) as { books: Array<{ id: string; title: string; chapterCount?: number }> }
  for (const b of books.filter(x => x.chapterCount)) {
    const d = await request.get(`/api/content/books/${encodeURIComponent(b.id)}`, { headers: { Authorization: `Bearer ${token}` } })
    if (!d.ok()) continue
    const detail = (await d.json()) as { book?: { chapterCount: number } }
    const cc = detail.book?.chapterCount ?? 0
    if (cc > 0 && cc <= 100) return { id: b.id, title: b.title }
    if (cc > 100) break
  }
  return null
}

async function loginAsChild(page: Page): Promise<void> {
  await page.goto('/login')
  await page.getByRole('button', { name: /输入家庭码加入/ }).click()
  await page.locator('#family-code').fill(CODE)
  await page.getByRole('button', { name: '小朋友' }).click()
  await page.getByRole('button', { name: /进入桃阅读/ }).click()
  const picker = page.getByText('今天是谁的故事时间？')
  const home = page.getByRole('heading', { name: /今天读点什么|今天是谁的故事时间/ })
  await expect(picker.or(home)).toBeVisible({ timeout: 30_000 })
  if (await picker.isVisible()) await page.getByRole('button', { name: /小桃/ }).click()
  await page.getByRole('heading', { name: /今天读点什么/ }).waitFor({ timeout: 30_000 })
}

/** 找故事 tab 搜索并打开详情（书卡 aria-label = 打开《书名》） */
async function openDetail(page: Page, title: string): Promise<void> {
  await page.locator('.mobile-nav').getByRole('button', { name: '找故事' }).last().click()
  await page.locator('#shelf-search').fill(title)
  await page.getByRole('button', { name: new RegExp(`打开《${title}》`) }).first().waitFor({ timeout: 15_000 })
  await page.getByRole('button', { name: new RegExp(`打开《${title}》`) }).first().click()
  await expect(page.locator('.book-detail').getByRole('heading', { name: title, exact: true })).toBeVisible({ timeout: 20_000 })
}

async function context_offline_read(page: Page, title: string): Promise<void> {
  await page.goto('/offline.html')
  await page.getByText(title).first().waitFor({ timeout: 20_000 })
  await page.context().setOffline(true)
  await page.locator('section', { hasText: title }).getByRole('button', { name: '阅读' }).click()
  await expect(page.getByRole('button', { name: '返回离线书架' })).toBeVisible({ timeout: 20_000 })
  await expect(page.getByRole('heading', { level: 2 })).toBeVisible({ timeout: 20_000 })
  await page.context().setOffline(false)
}

test.describe('离线内容（M2c）', () => {
  test('文字保存 → IndexedDB 入库 → 断网 offline.html 可读', async ({ page, request }) => {
    const token = await joinAsParent(request)
    const book = await pickSmallBook(request, token)
    test.skip(!book, '演示库没有 ≤100 章的小书')
    await loginAsChild(page)
    await openDetail(page, book!.title)
    const detail = page.locator('.book-detail')
    await detail.getByText('下载与离线阅读').click()
    await expect(detail.getByRole('heading', { name: book!.title, exact: true })).toBeVisible({ timeout: 20_000 })
    await detail.getByRole('button', { name: '保存文字到本机' }).click()
    await expect(page.getByText(/文字已保存/)).toBeVisible({ timeout: 20_000 })
    const saved = await page.evaluate(async () => {
      const db = await new Promise<IDBDatabase>((resolve, reject) => {
        const req = indexedDB.open('taoread-public-offline-v1', 1)
        req.onsuccess = () => resolve(req.result)
        req.onerror = () => reject(req.error)
      })
      const out = await new Promise<number>((resolve) => {
        const tx = db.transaction('books', 'readonly')
        const req2 = tx.objectStore('books').getAll()
        tx.oncomplete = () => resolve((req2.result as Array<{ id: string }>).length)
      })
      db.close()
      return out
    })
    expect(saved).toBeGreaterThan(0)
    await context_offline_read(page, book!.title)
  })

  test('带媒体保存：演示环境无预生成朗读 → 优雅失败提示', async ({ page, request }) => {
    const token = await joinAsParent(request)
    const book = await pickSmallBook(request, token)
    test.skip(!book, '演示库没有 ≤100 章的小书')
    await loginAsChild(page)
    await openDetail(page, book!.title)
    const detail = page.locator('.book-detail')
    await detail.getByText('下载与离线阅读').click()
    await expect(detail.getByRole('heading', { name: book!.title, exact: true })).toBeVisible({ timeout: 20_000 })
    await detail.getByRole('button', { name: '保存图文与已有朗读到本机' }).click()
    await expect(page.getByText(/未准备好|没有下载完整/)).toBeVisible({ timeout: 20_000 })
  })
})
