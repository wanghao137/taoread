import type { FastifyRequest } from 'fastify'

const segments = new WeakMap<FastifyRequest, string[]>()
export async function timed<T>(request: FastifyRequest, name: 'identity' | 'shelf', run: () => Promise<T>): Promise<T> {
  const start = performance.now()
  try { return await run() } finally {
    const entries = segments.get(request) ?? []
    entries.push(`${name};dur=${(performance.now() - start).toFixed(1)}`)
    segments.set(request, entries)
  }
}
export function serverTiming(request: FastifyRequest, total: number): string {
  return [...(segments.get(request) ?? []), `total;dur=${total.toFixed(1)}`].join(', ')
}
