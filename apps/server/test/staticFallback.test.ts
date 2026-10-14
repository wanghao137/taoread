import { beforeAll, describe, expect, it } from 'vitest'
import { mkdtemp, writeFile, mkdir } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createHash } from 'node:crypto'
import { makeApp, type TestHarness } from './helper'

let h: TestHarness
let staticDir: string

beforeAll(async () => {
  staticDir = await mkdtemp(join(tmpdir(), 'taoread-static-'))
  await mkdir(join(staticDir, 'assets'), { recursive: true })
  await writeFile(join(staticDir, 'index.html'), '<!doctype html><html><head></head><body>SPA-SHELL-MARKER<script type="module">window.legacyProbe = true</script><script nomodule data-src="/assets/app-abc123.js">window.legacyEntry = true</script><script src="/assets/app-abc123.js"></script></body></html>')
  await mkdir(join(staticDir, '.vite'))
  await writeFile(join(staticDir, '.vite/manifest.json'), JSON.stringify({ 'src/pages/ChildHome.tsx': { file: 'assets/app-abc123.js' } }))
  await writeFile(join(staticDir, 'assets', 'app-abc123.js'), 'console.log(1)')
  await writeFile(join(staticDir, 'sw.js'), 'self.skipWaiting()')
  await writeFile(join(staticDir, 'offline-reader.js'), 'console.log("offline")')
  h = await makeApp(undefined, { staticDir })
})

describe('同源 SPA 托管（部署期资产生存策略）', () => {
  it('child navigation includes current route preloads as HTTP 200 without caching the shell', async () => {
    const res = await h.app.inject({ method: 'GET', url: '/child/today' })
    expect(res.statusCode).toBe(200)
    expect(res.body).toContain('<link rel="modulepreload" crossorigin href="/assets/app-abc123.js">')
    expect(res.headers['cache-control']).toBe('no-cache')
    expect((await h.app.inject({ method: 'GET', url: '/login' })).body).not.toContain('rel="modulepreload"')
  })
  it('CSP only allows the exact inline bootstrap hash, without unsafe-inline scripts', async () => {
    const res = await h.app.inject({ method: 'GET', url: '/' })
    const csp = String(res.headers['content-security-policy-report-only'])
    expect(csp).toContain(`'sha256-${createHash('sha256').update('window.legacyProbe = true').digest('base64')}'`)
    expect(csp).toContain(`'sha256-${createHash('sha256').update('window.legacyEntry = true').digest('base64')}'`)
    expect(csp.split(';').find(d => d.trim().startsWith('script-src'))).not.toContain('unsafe-inline')
  })
  it('导航路径回退 index.html（deep link 刷新可用）', async () => {
    for (const path of ['/parent', '/child/discover', '/login', '/']) {
      const res = await h.app.inject({ method: 'GET', url: path })
      expect(res.statusCode, path).toBe(200)
      expect(res.headers['content-type']).toContain('text/html')
      expect(res.body).toContain('SPA-SHELL-MARKER')
    }
  })

  it('缺失的静态资源返回 404 JSON，绝不把 HTML 当 JS 回给浏览器（MIME 污染防线）', async () => {
    for (const path of ['/assets/index-OLDHASH.js', '/assets/app-missing.css', '/favicon.ico']) {
      const res = await h.app.inject({ method: 'GET', url: path })
      expect(res.statusCode, path).toBe(404)
      expect(res.headers['content-type']).toContain('application/json')
    }
  })

  it('入口/Service Worker 不缓存；带哈希产物永久缓存', async () => {
    const index = await h.app.inject({ method: 'GET', url: '/index.html' })
    expect(index.headers['cache-control']).toBe('no-cache')
    const sw = await h.app.inject({ method: 'GET', url: '/sw.js' })
    expect(sw.headers['cache-control']).toBe('no-cache')
    const offlineReader = await h.app.inject({ method: 'GET', url: '/offline-reader.js' })
    expect(offlineReader.statusCode).toBe(200)
    expect(offlineReader.headers['cache-control']).toBe('no-cache')
    const hashed = await h.app.inject({ method: 'GET', url: '/assets/app-abc123.js' })
    expect(hashed.headers['cache-control']).toContain('immutable')
    expect(hashed.statusCode).toBe(200)
  })

  it('API 未知路径保持 JSON 404，不被 SPA 回退吞掉', async () => {
    const res = await h.app.inject({ method: 'GET', url: '/api/definitely-missing' })
    expect(res.statusCode).toBe(404)
    expect(res.json()).toMatchObject({ code: 'NOT_FOUND' })
  })
})
