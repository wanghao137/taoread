import { z } from 'zod'

const id = z.string().regex(/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,95}$/)
const hash = z.string().regex(/^[a-f0-9]{64}$/)
const range = z.tuple([z.number().int().nonnegative(), z.number().int().positive()])
const assetPurpose = z.enum(['instruction_zh', 'phoneme', 'segment', 'blend', 'word', 'passage', 'image'])

export const mappingSchema = z.object({
  id, spelling: z.string().regex(/^[a-z]+$/), display: z.string().min(1),
  phonemes: z.array(z.object({ ipa: z.string().min(1), kind: z.enum(['vowel', 'consonant']) }).strict()).min(1),
  accent: z.enum(['GB', 'US']), positionCondition: z.enum(['any', 'initial', 'medial', 'final']).default('any'),
}).strict()

export const wordSchema = z.object({
  id, text: z.string().regex(/^[A-Za-z]+$/), meaningZh: z.string().min(1),
  meaningIntroducedAt: id, decodingIntroducedAt: id,
  spans: z.array(z.object({
    ranges: z.array(range).min(1), mappingId: id.optional(),
    exception: z.object({ id, taughtAt: id, phonemeShape: z.string().regex(/^[CV]+$/) }).strict().optional(),
  }).strict().refine(s => Boolean(s.mappingId) !== Boolean(s.exception), 'Exactly one mapping or exception is required')).min(1),
  audioIds: z.object({ segment: id, blend: id, word: id }).strict(),
}).strict()

export const taskSchema = z.object({
  id, kind: z.enum(['listen', 'choice', 'build', 'oral', 'read']),
  skill: z.enum(['operation', 'meaning', 'mapping', 'blend', 'segment', 'oral_reading']),
  role: z.enum(['model', 'guided', 'practice', 'independent']),
  instructionZh: z.string().min(1), instructionAssetId: id, stimulusAssetId: id.optional(),
  displayText: z.string().min(1).optional(), wordId: id.optional(), mappingId: id.optional(), readerId: id.optional(),
  imageAssetId: id.optional(), teachesCapitals: z.array(z.string().regex(/^[A-Z]$/)).default([]),
  choices: z.array(z.object({ id, label: z.string().min(1), mappingId: id.optional() }).strict()),
  judge: z.object({ answerIds: z.array(id).min(1) }).strict().optional(),
  hintAssetIds: z.array(id), easierTaskId: id.optional(), canSkipWithHelp: z.boolean(),
  timeline: z.array(z.object({ atMs: z.number().int().nonnegative(), endMs: z.number().int().positive(), text: z.string().min(1) }).strict()),
}).strict()

export const lessonSchema = z.object({
  id, order: z.number().int().positive(), titleZh: z.string().min(1), prerequisites: z.array(id),
  newMappingIds: z.array(id), capitals: z.array(z.string().regex(/^[A-Z]$/)), exceptions: z.array(id),
  punctuation: z.array(z.enum(['.', ',', '!', '?'])), allowedShapes: z.array(z.string().regex(/^[CV]+$/)),
  taskIds: z.array(id).min(1), readerIds: z.array(id), parentGuideZh: z.string().min(1),
}).strict()

export const readerSchema = z.object({
  id, kind: z.enum(['word_cards', 'caption', 'book']), titleZh: z.string().min(1), introducedAt: id,
  pages: z.array(z.object({ text: z.string().min(1), wordIds: z.array(id).min(1), imageAssetId: id.optional(), audioAssetId: id }).strict()).min(1),
}).strict()

export const assetSchema = z.object({
  id, purpose: assetPurpose, accent: z.enum(['GB', 'US', 'zh']),
  sha256: hash.nullable(), extension: z.enum(['wav', 'mp3', 'webp', 'png']),
  durationMs: z.number().int().positive().nullable(), speakerId: z.string().nullable(),
  revision: z.number().int().positive(), sourceLicense: z.string().nullable(),
  reviewStatus: z.enum(['pending', 'approved', 'rejected']), fixture: z.boolean(),
}).strict()

export const reviewSchema = z.object({
  id, scope: z.enum(['teaching', 'speech', 'rights']), targetId: id, targetHash: hash,
  decision: z.enum(['approved', 'rejected']), reviewer: z.string().min(1), reviewedAt: z.number().int().positive(),
}).strict()

export const courseSchema = z.object({
  manifest: z.object({
    schemaVersion: z.literal(2), courseId: id, versionId: id, accent: z.enum(['GB', 'US']),
    status: z.enum(['draft', 'reviewed']), fixture: z.boolean(), contentHash: hash.nullable(),
    lessonKeys: z.array(id).min(1), entryPlanKeys: z.array(id), assetIds: z.array(id),
  }).strict(),
  mappings: z.array(mappingSchema), words: z.array(wordSchema), tasks: z.array(taskSchema),
  lessons: z.array(lessonSchema).min(1), readers: z.array(readerSchema), assets: z.array(assetSchema),
  reviews: z.array(reviewSchema),
  entryPlans: z.array(z.object({ id, taskIds: z.array(id).min(1) }).strict()),
}).strict()

export type PhonicsCourse = z.infer<typeof courseSchema>
export type PhonicsTask = z.infer<typeof taskSchema>
export type PhonicsLesson = z.infer<typeof lessonSchema>

const command = { clientEventId: z.string().uuid(), expectedRevision: z.number().int().nonnegative() }
const empty = z.object({}).strict()
const eventBase = { ...command, taskInstanceId: z.string().min(1).max(160) }
export const learningEventSchema = z.discriminatedUnion('kind', [
  z.object({ ...eventBase, kind: z.literal('step_ack'), payload: empty }).strict(),
  z.object({ ...eventBase, kind: z.literal('stimulus_replayed'), payload: empty }).strict(),
  z.object({ ...eventBase, kind: z.literal('hint_requested'), payload: empty }).strict(),
  z.object({ ...eventBase, kind: z.literal('response_submitted'), payload: z.object({ answerIds: z.array(id).min(1).max(20) }).strict() }).strict(),
  z.object({ ...eventBase, kind: z.literal('retry_requested'), payload: empty }).strict(),
  z.object({ ...eventBase, kind: z.literal('self_read_reported'), payload: z.object({ report: z.enum(['tried', 'needs_help']) }).strict() }).strict(),
  z.object({ ...eventBase, kind: z.literal('step_advanced'), payload: empty }).strict(),
  z.object({ ...eventBase, kind: z.literal('task_skipped_with_help'), payload: empty }).strict(),
  z.object({ ...eventBase, kind: z.literal('reader_page_advanced'), payload: empty }).strict(),
])
export const controlSchema = z.object({ ...command, reason: z.enum(['restart_requested', 'parent_reset', 'version_change', 'content_unavailable']).optional() }).strict()
export const observationSchema = z.object({
  ...command, taskInstanceId: z.string().min(1).max(160),
  observation: z.enum(['independent', 'with_help', 'not_observed']), supersedesEventId: z.string().min(1).optional(),
}).strict()
export const startSchema = z.object({
  clientAttemptId: z.string().uuid(), versionId: id, planKind: z.enum(['entry', 'lesson', 'review', 'reread']), resourceKey: id.optional(),
}).strict().superRefine((v, c) => {
  if (v.planKind !== 'review' && !v.resourceKey) c.addIssue({ code: z.ZodIssueCode.custom, message: 'resourceKey is required' })
  if (v.planKind === 'review' && v.resourceKey) c.addIssue({ code: z.ZodIssueCode.custom, message: 'Review is selected by the server' })
})
export const enrollmentSchema = z.object({
  enabled: z.boolean(), versionId: id, entryMode: z.enum(['entry', 'lesson']), entryLessonKey: id,
  expectedRevision: z.number().int().nonnegative(),
  closeActive: z.object({ attemptId: z.string().min(1), expectedRevision: z.number().int().nonnegative(), clientEventId: z.string().uuid() }).strict().optional(),
}).strict()
