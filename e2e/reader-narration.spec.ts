import { expect, test, type Page } from '@playwright/test'
test.use({ screenshot: 'only-on-failure' })

async function login(page: Page) {
  await page.goto('/login')
  await page.getByRole('button', { name: /输入家庭码加入/ }).click()
  await page.locator('#family-code').fill('123456')
  await page.getByRole('button', { name: '小朋友', exact: true }).click()
  await page.getByRole('button', { name: /进入桃阅读/ }).click()
  await page.getByRole('button', { name: /小桃/ }).click()
  await expect(page.getByRole('heading', { name: /今天读点什么/ })).toBeVisible()
}

// A real, decodable WAV keeps browser playback and the production timeline loop active.
function silence() {
  const bytes = Buffer.alloc(44 + 8000 * 2 * 60)
  bytes.write('RIFF'); bytes.writeUInt32LE(bytes.length - 8, 4); bytes.write('WAVEfmt ', 8)
  bytes.writeUInt32LE(16, 16); bytes.writeUInt16LE(1, 20); bytes.writeUInt16LE(1, 22)
  bytes.writeUInt32LE(8000, 24); bytes.writeUInt32LE(16000, 28)
  bytes.writeUInt16LE(2, 32); bytes.writeUInt16LE(16, 34)
  bytes.write('data', 36); bytes.writeUInt32LE(bytes.length - 44, 40)
  return bytes
}

for (const mode of ['ruby', 'plain', 'highlight-off'] as const) {
  test(`朗读跨页跟随：${mode}，同块与跨块、暂停恢复`, async ({ page }) => {
    test.setTimeout(150_000)
    await page.setViewportSize({ width: 390, height: 700 })
    await page.addInitScript(() => {
      localStorage.setItem('taoread-reader-pagemode', JSON.stringify('page'))
      const NativeAudio = window.Audio
      const players: HTMLAudioElement[] = []
      Object.defineProperty(window, '__readingAudio', { value: players })
      window.Audio = function (src?: string) {
        const audio = new NativeAudio(src)
        players.push(audio)
        return audio
      } as typeof Audio
    })
    const line = '春眠不觉晓，处处闻啼鸟。'
    const text = Array.from({ length: 30 }, () => line).join('\n')
    const pinyin = Array.from({ length: 30 }, () => 'chūn mián bù jué xiǎo， chù chù wén tí niǎo。').join('\n')
    const tail = '故事读到了这里。'
    await page.route('**/api/content/books/*/chapters/1', async route => {
      const original = await route.fetch()
      const json = await original.json()
      const chapter = json.chapter
      chapter.blocks = [
        { id: 'long-spoken', order: 0, kind: mode === 'plain' ? 'text' : 'poem', text, pinyin, translation: '这段解释不参加朗读。' },
        { id: 'tail-spoken', order: 1, kind: 'text', text: tail },
      ]
      chapter.artUrl = null
      await route.fulfill({ json })
    })
    await page.route('**/api/tts/voices', route => route.fulfill({ json: { available: true, voices: [] } }))
    await page.route('**/reader-test.wav', route => {
      const body = silence()
      const range = /bytes=(\d+)-(\d*)/.exec(route.request().headers().range ?? '')
      if (!range) return route.fulfill({ contentType: 'audio/wav', headers: { 'Accept-Ranges': 'bytes' }, body })
      const start = Number(range[1]), end = Math.min(body.length - 1, range[2] ? Number(range[2]) : body.length - 1)
      return route.fulfill({ status: 206, contentType: 'audio/wav', headers: { 'Accept-Ranges': 'bytes', 'Content-Range': `bytes ${start}-${end}/${body.length}` }, body: body.subarray(start, end + 1) })
    })
    const spoken = text + '\n' + tail
    const chars = Array.from(spoken).map((char, i) => ({ char, start: i * 100, end: (i + 1) * 100 }))
    await page.route('**/api/tts/chapter/*/1', route => route.fulfill({ contentType: 'text/event-stream', body:
      `event: segment\ndata: ${JSON.stringify({ index: 0, start: 0, text: spoken, audioUrl: '/reader-test.wav', durationMs: chars.length * 100, chars, cached: true })}\n\nevent: done\ndata: {}\n\n`,
    }))
    await login(page)
    await page.getByRole('button', { name: '找故事 发现下一本喜欢的书', exact: true }).click({ timeout: 15_000 })
    await page.locator('#shelf-search').fill('小桃子的月亮船')
    await page.getByRole('button', { name: '打开《小桃子的月亮船》', exact: true }).click()
    await page.getByRole('button', { name: /开始读|继续读/, exact: true }).click()
    await expect(page.locator('.pager-track')).toBeVisible({ timeout: 60_000 })
    await page.getByRole('button', { name: '阅读设置', exact: true }).click()
    const dialog = page.getByRole('dialog', { name: '阅读设置' })
    await dialog.getByRole('button', { name: '听读', exact: true }).click()
    await dialog.getByRole('button', { name: mode === 'highlight-off' ? '关掉' : '逐字', exact: true }).click()
    await page.keyboard.press('Escape')
    const rubyCount = await page.locator('.poem-ruby rt').count()
    if (mode !== 'plain') {
      expect(rubyCount).toBe(300)
      // Native inline ruby must keep closing punctuation with the preceding character.
      expect(await page.evaluate(() => {
        const rect = (offset: number) => {
          const range = document.createRange()
          range.selectNodeContents(document.querySelector(`[data-reading-offset="${offset}"]`)!.firstChild!)
          return range.getBoundingClientRect()
        }
        return Math.abs(rect(10).top - rect(11).top)
      })).toBeLessThan(2)
    }
    const beforePages = (await page.locator('.pager-page').innerText()).split('/')[1]
    await page.getByRole('button', { name: '朗读本章', exact: true }).click()
    await expect(page.getByRole('button', { name: '暂停朗读', exact: true })).toBeVisible()
    if (mode !== 'plain') await expect(page.locator('.poem-ruby rt')).toHaveCount(rubyCount)
    expect((await page.locator('.pager-page').innerText()).split('/')[1]).toBe(beforePages)
    const moveAudio = async (offset: number) => {
      await page.evaluate(index => {
        const players = (window as unknown as { __readingAudio: HTMLAudioElement[] }).__readingAudio
        const audio = players.find(a => a.currentSrc.endsWith('/reader-test.wav'))!
        audio.playbackRate = 0.0625
        audio.currentTime = index * 0.1 + 0.025
      }, offset)
      await expect.poll(() => page.evaluate(() => (window as unknown as { __readingAudio: HTMLAudioElement[] }).__readingAudio.find(a => a.currentSrc.endsWith('/reader-test.wav'))!.currentTime)).toBeGreaterThanOrEqual(offset * 0.1)
    }
    await moveAudio(250)
    await expect.poll(async () => Number((await page.locator('.pager-page').innerText()).match(/第 (\d+)/)?.[1])).toBeGreaterThan(1)
    if (mode !== 'plain') {
      await expect(page.locator('[data-reading-offset="250"]')).toBeInViewport()
      await expect(page.locator('.poem-ruby rt')).toHaveCount(rubyCount)
    }
    if (mode === 'ruby') {
      for (const width of [820, 1440, 390]) {
        await page.setViewportSize({ width, height: 700 })
        await moveAudio(width === 1440 ? 252 : 251)
        await expect(page.locator(`[data-reading-offset="${width === 1440 ? 252 : 251}"]`)).toBeInViewport()
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
      }
    }
    await page.getByRole('button', { name: '暂停朗读', exact: true }).click()
    const pausedPage = await page.locator('.pager-page').innerText()
    await expect(page.getByRole('button', { name: '继续朗读', exact: true })).toBeVisible()
    expect(await page.locator('.pager-page').innerText()).toBe(pausedPage)
    await page.getByRole('button', { name: '继续朗读', exact: true }).click()
    await moveAudio(text.length + 2)
    await expect(page.locator('.reader-text > p').last()).toBeInViewport()
    await page.screenshot({ path: `output/reader-audit-20261023/narration-${mode}.png` })
    await page.getByRole('button', { name: '停止朗读', exact: true }).click()
    if (mode !== 'plain') await expect(page.locator('.poem-ruby rt')).toHaveCount(rubyCount)
  })
}
