import { expect, test } from '@playwright/test'

/**
 * docs/35 D2：性能回归门——防未来退化。
 *   1) 书架 API 必须 gzip 压缩（B1）；
 *   2) 阅读器图片块必须用 reader 变体路径（A1：.reader.webp 后缀；demo 环境未配公共域，
 *      断言变体路径语义而非域名，生产域名由 audit-art-variants.mjs 的 R2 抽查覆盖）。
 */
const CODE = '123456'

test.describe('性能回归门（docs/35）', () => {
  test('书架 API gzip + 图片块 reader 变体', async ({ page, request }) => {
    // 登录拿 token（UI 流程拿会话，供 APIrequest 复用）
    await page.goto('/login')
    await page.getByRole('button', { name: /输入家庭码加入/ }).click()
    await page.locator('#family-code').fill(CODE)
    await page.getByRole('button', { name: '小朋友' }).click()
    await page.getByRole('button', { name: /进入桃阅读/ }).click()
    const picker = page.getByText('今天是谁的故事时间？')
    try {
      await picker.waitFor({ timeout: 6000 })
      await page.getByRole('button', { name: /小桃/ }).click()
    } catch {
      /* 单孩直进 */
    }
    await page.getByText('今天想读什么？').waitFor()

    const session = await page.evaluate(() => {
      const raw = JSON.parse(localStorage.getItem('taoread-session') ?? '{}')
      return raw.state ?? raw
    })
    expect(session.token).toBeTruthy()

    // 1) gzip 门：带 accept-encoding 的书架回包必须压缩
    const res = await request.get(`/api/content/books?childId=${session.childId}`, {
      headers: { authorization: `Bearer ${session.token}`, 'accept-encoding': 'gzip' },
    })
    expect(res.status()).toBe(200)
    expect(res.headers()['content-encoding']).toBe('gzip')

    // 2) 阅读器图块变体门：找一本带 image 块的书（CC 绘本必有）直接查 API 契约
    const books = (await res.json()).books as Array<{ id: string; chapterCount: number }>
    const probeOrder = ['cc-', 'why-', 'original-']
    let checked = false
    outer: for (const prefix of probeOrder) {
      for (const b of books) {
        if (!b.id.startsWith(prefix)) continue
        const ch = await request.get(`/api/content/books/${b.id}/chapters/1`, {
          headers: { authorization: `Bearer ${session.token}` },
        })
        if (ch.status() !== 200) continue
        const blocks = ((await ch.json()).chapter.blocks ?? []) as Array<{ kind: string; art: string | null; artReaderUrl: string | null }>
        const img = blocks.find((x) => x.kind === 'image' && x.art)
        if (img) {
          expect(img.artReaderUrl ?? '').toMatch(/\.reader\.webp$/)
          checked = true
          break outer
        }
      }
    }
    // 演示库必有 CC/原创绘本；找不到带图块的书本身就是回归
    expect(checked).toBe(true)
  })
})
