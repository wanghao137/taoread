import { z } from 'zod'
export const guidanceSchema = z.object({
  version: z.string().min(1).max(128),
  modes: z.array(z.enum(['together', 'self', 'listen'])).min(1).max(3),
  topics: z.array(z.string().trim().min(1).max(30)).max(8),
  advice: z.string().trim().min(3).max(500),
  reviewer: z.string().trim().min(2).max(80),
  evidence: z.string().trim().min(3).max(1000),
  reviewedOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(x => !Number.isNaN(Date.parse(x)) && new Date(x).toISOString().slice(0, 10) === x && x <= new Date().toISOString().slice(0, 10), '审校日期必须为有效的已发生日期'),
})
export type ReadingGuidance = z.infer<typeof guidanceSchema>
export function readGuidance(raw: string | null | undefined, version: string): ReadingGuidance | null {
  try { const value = guidanceSchema.parse(JSON.parse(raw ?? 'null')); return value.version === version ? value : null } catch { return null }
}
