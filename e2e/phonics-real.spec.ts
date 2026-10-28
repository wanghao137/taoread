import { test, expect } from '@playwright/test'

for (const width of [390, 1280]) test(`真实插画与 MiMo 发音 ${width}px`, async ({ page, request }, info) => {
  await page.setViewportSize({ width, height: 900 })
  const session = await (await request.get('/__test/session')).json()
  await page.addInitScript(state => localStorage.setItem('taoread-session', JSON.stringify({ state, version: 1 })), session)
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/child/phonics?tab=atlas')
  await page.getByRole('searchbox', { name: '搜索单词或中文释义' }).fill('sat')
  const card = page.getByRole('button', { name: /sat/ }).first()
  await expect(card).toBeVisible()
  const image = card.locator('img').first()
  await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(10)
  await card.click()
  const dialog = page.getByRole('dialog', { name: 'sat 词卡' })
  await expect(dialog.getByRole('button', { name: '听整词' })).toBeEnabled()
  await dialog.getByRole('button', { name: '听整词' }).click()
  await expect(dialog.getByRole('button', { name: '听整词' })).toBeEnabled()
  await dialog.getByRole('button', { name: '生成词卡图片' }).click()
  const generated = dialog.getByRole('img', { name: 'sat 单词卡图片' })
  await expect(generated).toBeVisible()
  const imageStats = await generated.evaluate((img: HTMLImageElement) => {
    const canvas = document.createElement('canvas'); canvas.width = img.naturalWidth; canvas.height = img.naturalHeight
    const ctx = canvas.getContext('2d')!; ctx.drawImage(img, 0, 0)
    const pixels = ctx.getImageData(40, 76, 640, 640).data
    const colors = new Set<string>()
    for (let i = 0; i < pixels.length; i += 400) colors.add(`${pixels[i]}:${pixels[i + 1]}:${pixels[i + 2]}`)
    return { width: img.naturalWidth, height: img.naturalHeight, colors: colors.size }
  })
  expect(imageStats).toMatchObject({ width: 720, height: 960 })
  expect(imageStats.colors).toBeGreaterThan(10)
  await page.screenshot({ path: info.outputPath(`real-word-${width}.png`), fullPage: true })
  await dialog.getByRole('button', { name: '关闭sat 词卡' }).click()
  await page.getByRole('searchbox', { name: '搜索单词或中文释义' }).fill('')
  await page.getByRole('button', { name: '星图', exact: true }).click()
  const canvas = page.locator('.ph-galaxy canvas')
  await expect(canvas).toBeVisible()
  async function pixels() {
    return canvas.evaluate((element: HTMLCanvasElement) => {
      const gl = element.getContext('webgl2')!
      const data = new Uint8Array(element.width * element.height * 4)
      gl.readPixels(0, 0, element.width, element.height, gl.RGBA, gl.UNSIGNED_BYTE, data)
      const rect = element.getBoundingClientRect()
      let count = 0, hash = 0, point: { x: number; y: number } | null = null
      for (let y = 2; y < element.height - 2; y++) for (let x = 2; x < element.width - 2; x++) {
        const index = (y * element.width + x) * 4 + 3
        if (data[index]) { count++; hash = (hash + ((index + 1) * data[index]!)) >>> 0 }
        const clientX = rect.left + x / element.width * rect.width
        const clientY = rect.top + (1 - y / element.height) * rect.height
        if (!point && data[index]! > 200 && data[index - 4]! > 200 && data[index + 4]! > 200 && data[index - element.width * 4]! > 200 && data[index + element.width * 4]! > 200 && document.elementFromPoint(clientX, clientY) === element) point = { x: x / element.width, y: 1 - y / element.height }
      }
      return { count, hash, point }
    })
  }
  const first = await pixels()
  expect(first.count).toBeGreaterThan(30)
  await page.waitForTimeout(400)
  expect((await pixels()).hash).not.toBe(first.hash)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.waitForTimeout(100)
  await canvas.scrollIntoViewIfNeeded()
  const beforeDrag = await pixels()
  const dragBox = await canvas.boundingBox()
  await page.mouse.move(dragBox!.x + dragBox!.width / 2, dragBox!.y + dragBox!.height / 2)
  await page.mouse.down()
  await page.mouse.move(dragBox!.x + dragBox!.width / 2 + 55, dragBox!.y + dragBox!.height / 2 + 20, { steps: 5 })
  await page.mouse.up()
  await page.waitForTimeout(100)
  expect((await pixels()).hash).not.toBe(beforeDrag.hash)
  const beforeZoom = await pixels()
  await page.getByRole('button', { name: '放大星图' }).click()
  await page.waitForTimeout(100)
  expect((await pixels()).hash).not.toBe(beforeZoom.hash)
  await page.getByRole('button', { name: '复位星图' }).click()
  await page.waitForTimeout(100)
  const point = (await pixels()).point
  expect(point).not.toBeNull()
  const box = await canvas.boundingBox()
  await page.mouse.click(box!.x + point!.x * box!.width, box!.y + point!.y * box!.height)
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.getByRole('dialog').getByRole('button', { name: /^关闭/ }).click()
  await page.screenshot({ path: info.outputPath(`galaxy-${width}.png`), fullPage: true })
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  expect(errors).toEqual([])
})
