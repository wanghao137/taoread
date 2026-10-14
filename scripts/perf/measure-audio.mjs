/** Click -> application auth/SSE -> real narration -> playing/time progression. */
import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const origin = process.env.TAO_PERF_ORIGIN ?? 'http://127.0.0.1:16243'
if (!/^http:\/\/127\.0\.0\.1:1624[34]$/.test(origin)) throw Error('LOCAL_AUDIO_LAB_REQUIRED')
const out = resolve(process.env.TAO_PERF_OUTPUT ?? 'output/playwright/r24-20261014/audio')
await mkdir(out, { recursive: true })
const metadata = await (await fetch(`${origin}/__r24/metrics`)).json()
const reader = process.env.TAO_PERF_AUDIO_READER === '1'
const stallCdn = process.env.TAO_PERF_AUDIO_STALL_CDN === '1'
const browser = await chromium.launch({ headless: true, executablePath: process.env.TAO_CHROME_PATH ?? 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe' })
const result = { startedAt: new Date().toISOString(), browser: browser.version(), device: 'desktop Chrome mobile emulation; not a physical phone', entry: reader ? 'reader' : 'listening', mode: metadata.mode, useCdn: metadata.useCdn, faultInjection: stallCdn ? 'CDN requests held without a response' : null,
  conditions: { latencyMs: 100, downloadBytesPerSecond: 200000, uploadBytesPerSecond: 100000, cpuSlowdown: 4, cache: 'disabled', serviceWorkers: 'blocked' }, samples: [], failures: [] }
try {
  const login = await browser.newContext({ serviceWorkers: 'block' })
  const p = await login.newPage()
  await p.goto(`${origin}/login`)
  await p.getByRole('button', { name: '输入家庭码加入', exact: true }).click()
  await p.getByLabel('家庭码', { exact: true }).fill('123456')
  await p.getByRole('button', { name: '小朋友', exact: true }).click()
  await p.getByRole('button', { name: '进入桃阅读', exact: true }).click()
  await p.getByRole('button', { name: /小柚/ }).click()
  try { await p.locator('.story-card').first().waitFor() }
  catch {
    await p.screenshot({ path: resolve(out, 'login-failed.png') })
    result.failures.push({ scene: 'synthetic-login', body: (await p.locator('body').innerText()).slice(0, 1000) })
    throw Error('SYNTHETIC_AUDIO_LOGIN_FAILED')
  }
  const state = await login.storageState() // credentials remain in memory
  await login.close()
  const scenes = [1, 2, 3].map(iteration => ({ name: 'public-cache', id: 'poetry-song-spring', order: 1, iteration }))
  if (metadata.mode === 'live-provider' && !reader) scenes.push(...[1, 2, 3].flatMap(order => [
    { name: 'new-generation', id: 'r24-audio-original', order, iteration: order },
    { name: 'family-cache', id: 'r24-audio-original', order, iteration: order },
  ]))
  for (const scene of scenes.filter(s => !process.env.TAO_PERF_AUDIO_CASE || process.env.TAO_PERF_AUDIO_CASE.split(',').includes(s.name))) {
    const context = await browser.newContext({ storageState: state, viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, serviceWorkers: 'block' })
    await context.addInitScript(() => {
      window.__audioLab = { click: null, events: [], audio: null }
      const NativeAudio = window.Audio
      window.Audio = function (...args) {
        const audio = new NativeAudio(...args)
        window.__audioLab.audio = audio
        for (const event of ['loadstart', 'loadedmetadata', 'playing', 'waiting', 'stalled', 'error']) audio.addEventListener(event, () => {
          if (!audio.src || audio.src.startsWith('data:')) return
          window.__audioLab.events.push({ event, ms: window.performance.now(), path: new URL(audio.src, window.location.href).pathname, currentTime: audio.currentTime, muted: audio.muted, volume: audio.volume, error: audio.error?.code })
        })
        return audio
      }
      window.Audio.prototype = NativeAudio.prototype
      Object.setPrototypeOf(window.Audio, NativeAudio)
      document.addEventListener('click', event => { if (event.target instanceof window.Element && event.target.closest('.listening-page .primary, .reader-controls .main-action')) window.__audioLab.click = window.performance.now() }, true)
    })
    const page = await context.newPage()
    if (stallCdn) await page.route(url => url.origin !== origin && url.pathname.startsWith('/tts-public/'), () => { /* Deliberately held until context close. */ })
    const errors = [], segments = [], httpErrors = [], mediaNetwork = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('response', async response => {
      if (response.status() >= 400) httpErrors.push({ path: new URL(response.url()).pathname, status: response.status() })
      if (!new URL(response.url()).pathname.startsWith('/api/tts/chapter/')) return
      try {
        const sse = await response.text()
        for (const event of sse.split('\n\n')) if (event.startsWith('event: segment\n')) {
          const data = JSON.parse(event.split('\ndata: ')[1])
          segments.push({ index: data.index, cached: data.cached, audioPath: new URL(data.audioUrl, origin).pathname })
        }
      } catch { /* The browser may abort the completed test's remaining stream. */ }
    })
    const cdp = await context.newCDPSession(page)
    cdp.on('Network.responseReceived', ({ response }) => {
      if (!new URL(response.url).pathname.includes('/tts')) return
      if (!response.mimeType.startsWith('audio/')) return
      mediaNetwork.push({ path: new URL(response.url).pathname, status: response.status, connectionReused: response.connectionReused, timing: response.timing,
        cacheStatus: response.headers['cf-cache-status'] ?? response.headers['CF-Cache-Status'] ?? null })
    })
    await cdp.send('Network.enable')
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 100, downloadThroughput: 200000, uploadThroughput: 100000 })
    await cdp.send('Network.setCacheDisabled', { cacheDisabled: true })
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 })
    try {
      await page.goto(origin + (reader ? `/child/book/${scene.id}/chapter/${scene.order}` : `/child/listen/public/${scene.id}`))
      const play = page.locator(reader ? '.reader-controls .main-action' : '.listening-page .primary')
      await play.waitFor()
      if (reader) await page.locator('.reader-text').waitFor()
      else await page.getByRole('combobox', { name: /选择开始章节/ }).selectOption(String(scene.order))
      await play.click()
      await page.waitForFunction(() => window.__audioLab.events.some(e => e.event === 'playing'), undefined, { timeout: 90000 })
      await page.waitForFunction(() => window.__audioLab.audio?.currentTime > 0.25, undefined, { timeout: 15000 })
      const sample = await page.evaluate(() => {
        const lab = window.__audioLab, first = lab.events.find(e => e.event === 'playing'), audio = lab.audio
        return { firstPlayingMs: first.ms - lab.click, currentTime: audio.currentTime, muted: audio.muted, volume: audio.volume, events: lab.events.map(e => ({ ...e, ms: e.ms - lab.click })) }
      })
      const expectedCached = scene.name !== 'new-generation'
      if (!segments.length || segments[0].cached !== expectedCached || sample.muted || sample.volume !== 1 || errors.length) throw Error('APPLICATION_AUDIO_PATH_NOT_CONFIRMED')
      if (stallCdn && !sample.events.find(e => e.event === 'playing').path.startsWith('/api/media/')) throw Error('ORIGIN_AUDIO_FALLBACK_NOT_CONFIRMED')
      await page.screenshot({ path: resolve(out, `${scene.name}-${scene.iteration}.png`) })
      result.samples.push({ ...scene, ...sample, segments, errors, mediaNetwork })
      console.log(JSON.stringify({ ...scene, firstPlayingMs: Math.round(sample.firstPlayingMs), cached: expectedCached }))
      if (reader) await play.click()
      else await page.getByRole('button', { name: '停止', exact: true }).click()
      await page.waitForFunction(() => window.__audioLab.audio.paused)
      const stopped = await page.evaluate(() => window.__audioLab.audio.currentTime)
      await page.waitForTimeout(400)
      if (Math.abs(await page.evaluate(() => window.__audioLab.audio.currentTime) - stopped) > 0.05) throw Error('STOP_DID_NOT_SILENCE_AUDIO')
    } catch (error) {
      await page.screenshot({ path: resolve(out, `failed-${scene.name}-${scene.iteration}.png`) })
      result.failures.push({ ...scene, error: error.message, errors, httpErrors, route: new URL(page.url()).pathname, body: (await page.locator('body').innerText()).slice(0, 1200) })
      console.log(JSON.stringify({ ...scene, failed: error.message, httpErrors }))
    }
    finally { await context.close(); await writeFile(resolve(out, 'results.json'), JSON.stringify(result, null, 2)) }
  }
  result.providerMetrics = await (await fetch(`${origin}/__r24/metrics`)).json()
} finally { await browser.close(); await writeFile(resolve(out, 'results.json'), JSON.stringify(result, null, 2)) }
if (result.failures.length) process.exitCode = 1
