/** Lab audit only: synthetic family, production web build, no production telemetry. */
import { chromium } from 'playwright'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createRequire } from 'node:module'
import { createHash } from 'node:crypto'
import { cpus } from 'node:os'

const hostCpu = () => cpus().reduce((sum, cpu) => ({ idle: sum.idle + cpu.times.idle, total: sum.total + Object.values(cpu.times).reduce((a, b) => a + b, 0) }), { idle: 0, total: 0 })

const require = createRequire(import.meta.url)
let origin = process.env.TAO_PERF_ORIGIN || 'http://localhost:16241'
const label = process.argv[2] || 'before'
const servers = [{ version: label, origin }, ...(process.env.TAO_PERF_COMPARE_ORIGIN ? [{ version: 'after', origin: process.env.TAO_PERF_COMPARE_ORIGIN }] : [])]
if (servers.some(s => !/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(s.origin))) throw Error('Use isolated local servers, never a real family')
const out = resolve(process.env.TAO_PERF_OUTPUT || `output/playwright/ui-performance-20261014/${label}`)
const rounds = Number(process.env.TAO_PERF_ROUNDS || 3)
const profiles = [
  { name: 'cold-slow', cpu: 4, latency: 100, download: 200000, upload: 100000, warm: false },
  { name: 'warm-slow', cpu: 4, latency: 100, download: 200000, upload: 100000, warm: true },
  { name: 'cold-local', cpu: 1, latency: 0, download: -1, upload: -1, warm: false },
].filter(p => !process.env.TAO_PERF_PROFILE || process.env.TAO_PERF_PROFILE.split(',').includes(p.name))
const cases = [
  { name: 'today', route: '/child/today', ready: '.hero-actions .primary:not([disabled])', content: '.story-card' },
  { name: 'discover', route: '/child/discover', ready: '.story-card', content: '.story-card' },
  { name: 'detail', route: '/child/book/poetry-song-spring', ready: '.book-detail .primary', content: '.chapter-list .chapter' },
  { name: 'reader', route: '/child/book/poetry-song-spring/chapter/1', ready: '.reader-text', content: '.reader-chapter-title' },
  { name: 'reader-long', route: '/child/book/peter-pan/chapter/1', ready: '.reader-text', content: '.reader-chapter-title' },
  { name: 'reader-picture', route: '/child/book/cc-chicken-and-millipede/chapter/1', ready: '.reader-text', content: '.reader-chapter-title' },
  { name: 'listen', route: '/child/listen/public/poetry-song-spring', ready: '.listening-page .primary:not([disabled])', content: '.listening-page h2' },
].filter(c => !process.env.TAO_PERF_CASE || process.env.TAO_PERF_CASE.split(',').includes(c.name))
const vitals = await readFile(resolve(require.resolve('web-vitals'), '../web-vitals.iife.js'), 'utf8')
await mkdir(out, { recursive: true })
const browser = await chromium.launch({ headless: true, executablePath: process.env.TAO_CHROME_PATH || 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe' })
const scriptSha256 = createHash('sha256').update(await readFile(new URL(import.meta.url))).digest('hex')
const result = { label, date: new Date().toISOString(), scriptSha256, readyDefinition: 'meaningful DOM content followed by two animation frames; no forced geometry reads', scenarios: cases, servers, browser: browser.version(), rounds, profiles, viewport: { width: 390, height: 844 }, serviceWorkers: 'blocked', fixture: '277-book isolated demo; generated media and real TTS disabled', samples: [], failures: [] }
try {
  const states = new Map()
  for (const server of servers) {
  origin = server.origin
  const login = await browser.newContext({ serviceWorkers: 'block' })
  const p = await login.newPage()
  await p.goto(`${origin}/login`)
  await p.getByRole('button', { name: '输入家庭码加入', exact: true }).click()
  await p.getByLabel('家庭码', { exact: true }).fill('123456')
  await p.getByRole('button', { name: '小朋友', exact: true }).click()
  await p.getByRole('button', { name: '进入桃阅读', exact: true }).click()
  await p.getByRole('button', { name: /小柚/ }).click()
  await p.locator('.story-card').first().waitFor()
  states.set(origin, await login.storageState()) // memory only, never written to reports
  await login.close()
  }
  for (const profile of profiles) for (let iteration = 0; iteration < rounds; iteration++) for (const c of cases) for (const server of iteration % 2 ? [...servers].reverse() : servers) {
    origin = server.origin
    const storageState = states.get(origin)
    const context = await browser.newContext({ storageState, viewport: result.viewport, isMobile: true, hasTouch: true, serviceWorkers: 'block' })
    // Close only this synthetic child's previous session outside the measured navigation.
    const session = JSON.parse(storageState.origins.find(o => o.origin === origin).localStorage.find(s => s.name === 'taoread-session').value).state
    const headers = { Authorization: `Bearer ${session.token}` }
    const active = await context.request.get(`${origin}/api/cosession/active?childId=${encodeURIComponent(session.childId)}`, { headers })
    if (!active.ok()) throw Error('Cannot prepare isolated active-session fixture')
    const activeSession = (await active.json()).session
    if (activeSession) {
      const closed = await context.request.post(`${origin}/api/cosession/${encodeURIComponent(activeSession.id)}/finish`, { headers, data: {} })
      if (!closed.ok()) throw Error('Cannot close isolated previous session')
    }
    await context.addInitScript({ content: `${vitals}\n;(${function(config, vitalsApi) {
      window.__lab = { vitals: {}, longTasks: [], readyMs: null }
      const save = m => { window.__lab.vitals[m.name] = { value: m.value, rating: m.rating, entries: m.entries.map(e => ({ name: e.name, startTime: e.startTime, duration: e.duration, interactionId: e.interactionId, sources: e.sources?.map(s => ({ node: s.node?.tagName, class: s.node?.className, previous: s.previousRect, current: s.currentRect })) })) } }
      vitalsApi.onLCP(save, { reportAllChanges: true }); vitalsApi.onCLS(save, { reportAllChanges: true }); vitalsApi.onINP(save, { reportAllChanges: true, durationThreshold: 16 })
      new window.PerformanceObserver(list => { window.__lab.longTasks.push(...list.getEntries().map(e => ({ start: e.startTime, duration: e.duration }))) }).observe({ type: 'longtask', buffered: true })
      const observer = new window.MutationObserver(() => {
        const ready = document.querySelector(config.ready), content = document.querySelector(config.content)
        if (ready && content?.textContent?.trim() && !ready.disabled) {
          observer.disconnect()
          // Two frames allow the browser to paint without this observer forcing layout.
          window.requestAnimationFrame(() => window.requestAnimationFrame(() => { window.__lab.readyMs = window.performance.now() }))
        }
      })
      observer.observe(document, { subtree: true, childList: true, attributes: true })
    }.toString()})(${JSON.stringify(c)}, webVitals)` })
    const page = await context.newPage()
    await page.bringToFront()
    const errors = [], failedRequests = []
    page.on('pageerror', e => errors.push(e.message))
    page.on('requestfailed', r => failedRequests.push({ path: new URL(r.url()).pathname, error: r.failure()?.errorText }))
    const cdp = await context.newCDPSession(page)
    const hostStart = hostCpu()
    let tracing = false
    try {
    await cdp.send('Network.enable')
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: profile.latency, downloadThroughput: profile.download, uploadThroughput: profile.upload })
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: profile.cpu })
    if (profile.warm) {
      await page.goto(origin + c.route)
      await page.waitForFunction(() => window.__lab.readyMs !== null)
      await page.waitForTimeout(800)
      await page.goto('about:blank')
    } else await cdp.send('Network.setCacheDisabled', { cacheDisabled: true })
    const traceThis = profile.name === 'cold-slow' && iteration === 0
    if (traceThis) { await cdp.send('Tracing.start', { categories: 'devtools.timeline,loading,blink.user_timing', transferMode: 'ReturnAsStream' }); tracing = true }
    await page.goto(origin + c.route, { waitUntil: 'domcontentloaded' })
    try {
      await page.waitForFunction(() => window.__lab.readyMs !== null, undefined, { timeout: 45000 })
    } catch (error) {
      await writeFile(resolve(out, 'failure.json'), JSON.stringify({ version: server.version, profile: profile.name, case: c.name, iteration, error: error.message, errors, state: await page.evaluate(() => ({ route: window.location.pathname, title: document.title, ready: !!document.querySelector('.hero-actions .primary'), cards: document.querySelectorAll('.story-card').length, lab: window.__lab })) }, null, 2))
      throw error
    }
    await page.waitForTimeout(1200)
    const initial = await page.evaluate(() => ({ readyMs: window.__lab.readyMs, paints: window.performance.getEntriesByType('paint').map(e => ({ name: e.name, ms: e.startTime })), resources: window.performance.getEntriesByType('resource').map(e => ({ path: new URL(e.name).pathname, start: e.startTime, end: e.responseEnd, bytes: e.encodedBodySize, transfer: e.transferSize, decoded: e.decodedBodySize, duration: e.duration, initiator: e.initiatorType })), navigation: window.performance.getEntriesByType('navigation')[0].toJSON(), domNodes: document.querySelectorAll('*').length }))
    // Real browser input exercises each route; audio generation is deliberately excluded.
    if (c.name === 'reader-long') {
      await page.locator('.page-forward:not([disabled])').waitFor()
      await page.evaluate(() => {
        const indicator = document.querySelector('.pager-page'), previous = indicator.textContent
        document.querySelector('.page-forward').addEventListener('click', () => { window.__lab.flipStart = window.performance.now() }, { once: true, capture: true })
        const observer = new window.MutationObserver(() => {
          if (indicator.textContent !== previous) { observer.disconnect(); window.requestAnimationFrame(() => { window.__lab.flipMs = window.performance.now() - window.__lab.flipStart }) }
        })
        observer.observe(indicator, { childList: true, subtree: true, characterData: true })
      })
      await page.locator('.page-forward').click()
      await page.waitForFunction(() => window.__lab.flipMs !== undefined)
    }
    if (c.name === 'today') {
      await page.locator('.mobile-nav').getByRole('button', { name: '找故事', exact: true }).click()
      await page.locator('.story-card').first().waitFor()
      await page.locator('.mobile-nav').getByRole('button', { name: '今天', exact: true }).click()
      await page.locator('.hero-actions .primary').waitFor()
      // Measure actual reader exit -> home -> continue, with a real browser click.
      await page.locator('.hero-actions .primary').click()
      await page.locator('.reader-text').waitFor()
      const expectedReader = new URL(page.url()).pathname
      if (!/\/chapter\/\d+$/.test(expectedReader)) throw Error('Resume fixture did not enter a reader')
      await page.getByRole('button', { name: '退出阅读', exact: true }).click()
      await page.locator('.hero-actions .primary').waitFor()
      await page.evaluate(() => {
        document.querySelector('.hero-actions .primary').addEventListener('click', () => { window.__lab.resumeStart = window.performance.now() }, { once: true, capture: true })
        const observer = new window.MutationObserver(() => {
          const reader = document.querySelector('.reader-text')
          if (reader?.textContent?.trim()) {
            observer.disconnect(); window.requestAnimationFrame(() => window.requestAnimationFrame(() => { window.__lab.resumeMs = window.performance.now() - window.__lab.resumeStart }))
          }
        })
        observer.observe(document.body, { subtree: true, childList: true, attributes: true })
      })
      await page.locator('.hero-actions .primary').click()
      await page.waitForFunction(() => window.__lab.resumeMs !== undefined)
      if (new URL(page.url()).pathname !== expectedReader) throw Error('Resume returned to a different book/chapter')
      await page.evaluate(() => { window.__lab.resumeMatched = true })
    }
    if (c.name === 'discover') await page.locator('.filter').first().click()
    if (c.name === 'detail') await page.locator('.book-detail .primary').first().click()
    if (c.name.startsWith('reader')) await page.getByRole('button', { name: '阅读设置', exact: true }).click()
    if (c.name === 'listen') await page.getByRole('checkbox').click()
    await page.waitForTimeout(1500)
    const hidden = await context.newPage(); await hidden.bringToFront(); await hidden.waitForTimeout(100)
    const metrics = await page.evaluate(() => window.__lab)
    if (traceThis) {
      const complete = new Promise(r => cdp.once('Tracing.tracingComplete', r))
      await cdp.send('Tracing.end')
      tracing = false
      const { stream } = await complete
      let trace = '', eof = false
      while (!eof) { const part = await cdp.send('IO.read', { handle: stream }); trace += part.data; eof = part.eof }
      await cdp.send('IO.close', { handle: stream })
      await writeFile(resolve(out, `trace-${server.version}-${c.name}.json`), trace)
    }
    const hostEnd = hostCpu()
    const hostBusyPercent = 100 * (1 - (hostEnd.idle - hostStart.idle) / Math.max(1, hostEnd.total - hostStart.total))
    const sample = { version: server.version, case: c.name, route: c.route, profile: profile.name, iteration, hostBusyPercent, ...initial, ...metrics, errors, failedRequests }
    result.samples.push(sample)
    console.log(JSON.stringify({ version: server.version, case: c.name, profile: profile.name, iteration, readyMs: Math.round(sample.readyMs), LCP: metrics.vitals.LCP?.value, CLS: metrics.vitals.CLS?.value, INP: metrics.vitals.INP?.value, errors }))
    await writeFile(resolve(out, 'results.json'), JSON.stringify(result, null, 2))
    } catch (error) {
      if (tracing) await cdp.send('Tracing.end').catch(() => undefined)
      const failure = { version: server.version, case: c.name, profile: profile.name, iteration, error: error.message, errors, failedRequests }
      result.failures.push(failure)
      console.log(JSON.stringify({ failure }))
      await writeFile(resolve(out, 'results.json'), JSON.stringify(result, null, 2))
    } finally {
    await context.close()
    }
  }
} finally { await browser.close() }
