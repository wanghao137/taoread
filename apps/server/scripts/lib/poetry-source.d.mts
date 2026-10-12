export function normalizedPoem(text: string): string
export function poemHash(text: string): string
export function searchPoetry(query: string, options?: { mode?: 'online' | 'self-hosted'; origin?: string; page?: number; pageSize?: number; fetcher?: typeof fetch }): Promise<{
  url: string; fetchedAt: string; rawSha256: string; raw: string
  candidates: Array<{ sourceId: number; title: string; author: string; unverifiedDynasty: string | null; text: string; sha256: string; normalizedSha256: string }>
}>
