import type { FastifyInstance } from 'fastify'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { IpRateLimiter, ipRateLimit } from './ipRateLimit'
const reports = new Map<string, { directive: string; origin: string; page: string; count: number; lastSeenAt: string }>()
function origin(value: unknown): string {
  if (typeof value !== 'string') return 'unknown'
  if (['inline', 'eval', 'data', 'blob'].includes(value)) return value
  try { return new URL(value).origin } catch { return 'unknown' }
}
export function cspSummary() { return [...reports.values()] }
export async function inlineScriptSources(staticDir?: string): Promise<string> {
  if (!staticDir) return ''
  const html = await readFile(join(staticDir, 'index.html'), 'utf8')
  const hashes = new Set<string>()
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)) {
    if (/(?:^|\s)src\s*=/i.test(match[1]!) || !match[2]?.trim()) continue
    hashes.add(`'sha256-${createHash('sha256').update(match[2]).digest('base64')}'`)
  }
  return [...hashes].join(' ')
}
function pagePattern(value: unknown): string {
  try {
    const pathname = new URL(String(value)).pathname
    // Only retain fixed UI routes; content and family identifiers never enter reports.
    const fixed = ['/', '/login', '/trial', '/parent', '/privacy', '/ai-content', '/offline', '/editor', '/child', '/child/discover', '/child/my', '/child/family-books']
    if (fixed.includes(pathname)) return pathname
    if (/^\/child\/(?:book|family-book)\/[^/]+\/chapter\/\d+$/.test(pathname)) return '/child/book/:id/chapter/:order'
    if (/^\/child\/(?:book|family-book)\/[^/]+$/.test(pathname)) return '/child/book/:id'
    if (pathname.startsWith('/child/listen/')) return '/child/listen/:source/:id'
    return '/other'
  } catch { return '/unknown' }
}
export function mediaCspOrigin(): string {
  const configured = process.env.TAO_MEDIA_PUBLIC_BASE
  if (!configured) return 'https://media.taostudioai.com'
  const url = new URL(configured)
  if (url.protocol !== 'https:' || url.username || url.password) throw new Error('TAO_MEDIA_PUBLIC_BASE must be a public HTTPS URL')
  return url.origin
}
export function mediaCspSources(): string {
  const values = [mediaCspOrigin()]
  if (process.env.TAO_TTS_PUBLIC_BASE) {
    const url = new URL(process.env.TAO_TTS_PUBLIC_BASE)
    if (url.protocol !== 'https:' || url.username || url.password) throw new Error('TAO_TTS_PUBLIC_BASE must be a public HTTPS URL')
    values.push(url.origin)
  }
  return [...new Set(values)].join(' ')
}
export function registerCspReports(app: FastifyInstance): void {
  app.addContentTypeParser('application/csp-report', { parseAs: 'string' }, (_request, body, done) => {
    try { done(null, JSON.parse(String(body))) } catch { done(null, {}) }
  })
  const limiter = new IpRateLimiter({ capacity: 30, refillPerMinute: 30 })
  app.post('/api/security/csp-report', { bodyLimit: 16384, preHandler: ipRateLimit(limiter) }, async (request, reply) => {
    const value = request.body as { 'csp-report'?: Record<string, unknown> }
    const report = value?.['csp-report']
    if (report) {
      const directive = String(report['effective-directive'] ?? report['violated-directive'] ?? 'unknown').replace(/[^a-z-]/g, '').slice(0, 64)
      // Never retain query strings, signed URLs, fragments, cookies or script samples.
      const blocked = origin(report['blocked-uri'])
      const page = pagePattern(report['document-uri'])
      const key = `${directive}|${blocked}|${page}`
      if (reports.size < 100 || reports.has(key)) {
        const previous = reports.get(key)
        const entry = { directive, origin: blocked, page, count: (previous?.count ?? 0) + 1, lastSeenAt: new Date().toISOString() }
        reports.set(key, entry)
        if (!previous) console.warn(JSON.stringify({ event: 'csp_violation', ...entry }))
      }
    }
    return reply.code(204).send()
  })
}
