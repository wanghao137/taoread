import { test, expect } from '@playwright/test'
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import type { AddressInfo } from 'node:net'

test.use({ serviceWorkers: 'allow' })

test('existing offline shell upgrades before the next offline visit', async ({ page, context }, testInfo) => {
  const [worker, html, reader, logo] = await Promise.all([
    readFile(resolve('apps/web/public/sw.js'), 'utf8'),
    readFile(resolve('apps/web/public/offline.html'), 'utf8'),
    readFile(resolve('apps/web/public/offline-reader.js'), 'utf8'),
    readFile(resolve('apps/web/public/brand/logo-256.png')),
  ])
  const targetCache = worker.match(/const CACHE = '([^']+)'/)?.[1]
  expect(targetCache).toBeTruthy()
  expect(targetCache).not.toBe('taoread-shell-v7')
  let upgraded = false
  // A previous installed worker and stale precache; all traffic stays on this fixture.
  const previousWorker = `
    self.addEventListener('install', event => event.waitUntil((async () => {
      const cache = await caches.open('taoread-shell-v7');
      await cache.add('/offline.html');
      await self.skipWaiting();
    })()));
    self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
  `
  const server = createServer((request, response) => {
    const path = new URL(request.url || '/', 'http://localhost').pathname
    if (path === '/brand/logo-256.png') {
      response.writeHead(200, { 'Content-Type': 'image/png' })
      response.end(logo)
      return
    }
    const body = path === '/sw.js' ? (upgraded ? worker : previousWorker)
      : path === '/offline.html' ? (upgraded ? html : '<!doctype html><h1>previous offline shell</h1>')
        : path === '/offline-reader.js' ? reader : '<!doctype html><title>Offline upgrade fixture</title>'
    response.writeHead(200, {
      'Content-Type': path.endsWith('.js') ? 'text/javascript; charset=utf-8' : 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    })
    response.end(body)
  })
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve))
  const origin = `http://127.0.0.1:${(server.address() as AddressInfo).port}`
  try {
    await page.goto(origin)
    await page.evaluate(async () => {
      await navigator.serviceWorker.register('/sw.js')
      await navigator.serviceWorker.ready
    })
    await page.waitForFunction(() => !!navigator.serviceWorker.controller)
    expect(await page.evaluate(async () => (await (await caches.open('taoread-shell-v7')).match('/offline.html'))?.text())).toContain('previous offline shell')
    await page.evaluate(async () => {
      const unrelated = await caches.open('unrelated-static-cache')
      await unrelated.put('/sentinel', new Response('keep'))
    })
    upgraded = true
    await page.evaluate(async () => {
      const changed = new Promise<void>(resolve => navigator.serviceWorker.addEventListener('controllerchange', () => resolve(), { once: true }))
      await (await navigator.serviceWorker.getRegistration())!.update()
      await changed
    })
    // controllerchange can precede completion of activate's waitUntil work.
    await expect.poll(() => page.evaluate(() => caches.keys())).not.toContain('taoread-shell-v7')
    const evidence = await page.evaluate(async (cacheName) => ({
      caches: await caches.keys(),
      html: await (await (await caches.open(cacheName!)).match('/offline.html'))?.text(),
      unrelated: await (await (await caches.open('unrelated-static-cache')).match('/sentinel'))?.text(),
    }), targetCache)
    expect(evidence.caches).toContain(targetCache)
    expect(evidence.caches).not.toContain('taoread-shell-v7')
    expect(evidence.html).toBe(html)
    expect(evidence.unrelated).toBe('keep')
    await context.setOffline(true)
    await page.goto(`${origin}/offline`, { waitUntil: 'domcontentloaded' })
    await expect(page.getByRole('heading', { name: '离线书架', exact: true })).toBeVisible()
    await expect.poll(() => page.locator('.offline-brand img').evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0)
    await expect(page.getByRole('link', { name: '联网返回桃阅读', exact: true })).toBeVisible()
    await page.screenshot({ path: testInfo.outputPath('offline-upgraded.png'), fullPage: true })
    await testInfo.attach('cache-upgrade.json', { body: JSON.stringify({ targetCache, caches: evidence.caches, currentHtmlMatched: evidence.html === html, unrelatedCachePreserved: evidence.unrelated === 'keep', offlineNavigation: 'passed' }, null, 2), contentType: 'application/json' })
  } finally {
    await context.setOffline(false)
    server.closeAllConnections()
    await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()))
  }
})
