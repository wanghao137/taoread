import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { z } from 'zod'
import { digest } from './courseRegistry'

const id = z.string().regex(/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,95}$/)
const hash = z.string().regex(/^[a-f0-9]{64}$/)

/** 旁挂媒体引用：只认「物理文件哈希 + 时长 + 体积」，与课程资产同一套校验纪律。 */
const sidecarAudioSchema = z.object({
  sha256: hash, durationMs: z.number().int().positive(), bytes: z.number().int().positive(), voice: z.string().min(1),
  extension: z.enum(['mp3', 'wav']).optional(),
})

export const lexiconEntrySchema = z.object({
  wordId: id, word: z.string().regex(/^[A-Za-z]+$/), source: z.enum(['word-atlas', 'taoread-original']),
  reviewStatus: z.literal('pending'),
  ukIpa: z.string().min(1), usIpa: z.string().min(1),
  senses: z.array(z.object({ pos: z.string(), zh: z.string().min(1), en: z.string().min(1) }).strict()).min(1).max(2),
  example: z.object({ en: z.string().min(1), zh: z.string().min(1), audio: sidecarAudioSchema.nullable() }).strict(),
  /** 词光整词专业录音（英 Alice/美 Sarah）；自备条目无此项 */
  wordAudio: z.object({ uk: sidecarAudioSchema.nullable().optional(), us: sidecarAudioSchema.nullable().optional() }).strict().optional(),
  collocations: z.array(z.string()).max(3), family: z.array(z.string()).max(4),
  tip: z.string(), cefr: z.string().nullable(),
}).strict()

export const lexiconSchema = z.object({
  schemaVersion: z.literal(1), courseVersionId: id, courseContentHash: hash,
  humanReviewed: z.literal(false), reviewStatus: z.literal('pending'),
  generatedAt: z.string(),
  sources: z.record(z.string(), z.unknown()),
  counts: z.object({ entries: z.number().int(), wordAtlas: z.number().int(), taoreadOriginal: z.number().int(), exampleAudio: z.number().int() }).strict(),
  entries: z.array(lexiconEntrySchema),
}).strict()

export const usAudioSchema = z.object({
  schemaVersion: z.literal(1), courseVersionId: id, courseHash: hash,
  requestedAccent: z.literal('US'), actualAccent: z.null(),
  provider: z.string().min(1), model: z.string().min(1), voice: z.string().min(1),
  humanReviewed: z.literal(false), rightsReviewed: z.literal(false), publicationApproved: z.literal(false),
  source: z.string().min(1),
  counts: z.object({ assets: z.number().int() }).strict(),
  assets: z.array(z.object({ wordId: id, word: z.string(), sha256: hash, durationMs: z.number().int().positive(), bytes: z.number().int().positive() }).strict()),
}).strict()

export type LexiconEntry = z.infer<typeof lexiconEntrySchema>
export type CourseLexicon = z.infer<typeof lexiconSchema>
export type CourseUsAudio = z.infer<typeof usAudioSchema>
export interface CourseSidecars { lexicon: CourseLexicon | null; usAudio: CourseUsAudio | null; problems: string[] }

/**
 * 词典/美音包是课程旁挂内容：单独成文件、单独校验，绝不并入课程 schema ——
 * 否则 courseHash 变化会让生产自用家庭（hash 精确锁定）立刻失联。
 * 清单里的 courseContentHash 锁定当前课程版本；课程变更后清单自动作废。
 */
export async function loadSidecars(courseDirectory: string, versionId: string, contentHash: string): Promise<CourseSidecars> {
  const problems: string[] = []
  const load = async <T>(file: string, schema: z.ZodType<T>, hashField: string): Promise<T | null> => {
    let raw: unknown
    try {
      raw = JSON.parse(await readFile(path.join(courseDirectory, file), 'utf8'))
    } catch {
      problems.push(`${file} 缺失（旁挂内容未安装）`)
      return null
    }
    const parsed = schema.safeParse(raw)
    if (!parsed.success) {
      problems.push(`${file} 结构无效: ${parsed.error.issues[0]?.path.join('.')} ${parsed.error.issues[0]?.message}`)
      return null
    }
    if ((parsed.data as Record<string, unknown>)[hashField] !== contentHash) {
      problems.push(`${file} 与当前课程哈希不匹配，内容已作废`)
      return null
    }
    const versionField = (parsed.data as Record<string, unknown>).courseVersionId
    if (versionField !== versionId) {
      problems.push(`${file} 课程版本不匹配: ${String(versionField)}`)
      return null
    }
    return parsed.data
  }
  const lexicon = await load('lexicon.json', lexiconSchema, 'courseContentHash')
  const usAudio = await load('usAudio.json', usAudioSchema, 'courseHash')
  if (lexicon && lexicon.entries.length !== lexicon.counts.entries) problems.push('lexicon.json counts.entries 与实际条数不一致')
  if (lexicon && (lexicon.entries.filter(entry => entry.example.audio).length !== lexicon.counts.exampleAudio ||
    lexicon.entries.filter(entry => entry.source === 'word-atlas').length !== lexicon.counts.wordAtlas ||
    lexicon.entries.filter(entry => entry.source === 'taoread-original').length !== lexicon.counts.taoreadOriginal)) problems.push('lexicon.json counts 与实际内容不一致')
  if (usAudio && usAudio.assets.length !== usAudio.counts.assets) problems.push('usAudio.json counts.assets 与实际条数不一致')
  return { lexicon, usAudio, problems }
}

export function sidecarDigest(sidecars: CourseSidecars): string {
  return digest({ lexicon: sidecars.lexicon, usAudio: sidecars.usAudio })
}
