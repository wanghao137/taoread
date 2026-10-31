import { z } from 'zod'

const id = z.string().regex(/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,95}$/)
const hash = z.string().regex(/^[a-f0-9]{64}$/)
const range = z.tuple([z.number().int().nonnegative(), z.number().int().positive()])
const assetPurpose = z.enum(['instruction_zh', 'letter_name', 'phoneme', 'segment', 'blend', 'word', 'passage', 'image'])

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
  skill: z.enum(['operation', 'meaning', 'letter_name', 'mapping', 'blend', 'segment', 'oral_reading']),
  role: z.enum(['model', 'guided', 'practice', 'independent']),
  instructionZh: z.string().min(1), instructionAssetId: id, stimulusAssetId: id.optional(),
  displayText: z.string().min(1).optional(), wordId: id.optional(), mappingId: id.optional(), readerId: id.optional(),
  letterName: z.string().regex(/^[A-Z]$/).optional(),
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

export function taskTarget(task: PhonicsTask): string {
  return task.letterName ? `letter-${task.letterName.toLowerCase()}` : task.wordId ?? task.mappingId ?? task.readerId ?? task.id
}

const command = { clientEventId: z.string().uuid(), expectedRevision: z.number().int().nonnegative() }
export const practiceAnswerSchema = z.object({
  clientEventId: z.string().uuid(), questionId: z.string().uuid(), versionId: id, wordId: id,
  mode: z.enum(['picture', 'meaning', 'listen', 'spelling', 'contrast']), track: z.enum(['practice', 'study']), answer: z.string().trim().min(1).max(100),
  elapsedMs: z.number().int().min(0).max(90000).optional(), hinted: z.boolean().optional(),
}).strict()
const wordQuestionSchema = z.object({
  id: z.string().uuid(), wordId: id, mode: z.enum(['picture', 'meaning', 'listen', 'spelling', 'contrast']),
  choices: z.array(id).max(4), isNew: z.boolean(), intro: z.boolean().optional(), retry: z.boolean().optional(),
}).strict()
export const wordSessionStateSchema = z.object({
  id: z.string().uuid(), versionId: id, track: z.enum(['practice', 'study']),
  questions: z.array(wordQuestionSchema).min(1).max(800), index: z.number().int().nonnegative(), showIntro: z.boolean(),
  firstCorrect: z.number().int().nonnegative().max(220), feedback: z.enum(['correct', 'incorrect']).nullable(), pending: practiceAnswerSchema.nullable(),
}).strict().superRefine((session, ctx) => {
  if (session.index > session.questions.length) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Invalid index' })
  const seen = new Map<string, { wordId: string; mode: string }>()
  for (const question of session.questions) {
    const previous = seen.get(question.id)
    if (previous && (previous.wordId !== question.wordId || (session.track === 'practice' && previous.mode !== question.mode))) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Question changed' })
    seen.set(question.id, { wordId: question.wordId, mode: question.mode })
    if (new Set(question.choices).size !== question.choices.length || (question.mode !== 'spelling' && (question.choices.length < 2 || !question.choices.includes(question.wordId)))) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Invalid choices' })
    if ((question.intro || question.retry) && session.track !== 'study') ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Invalid study step' })
    if ((question.intro && !question.isNew) || (question.intro && question.retry)) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Invalid introduction' })
  }
  const current = session.questions[session.index]
  if (session.pending && (!current || current.intro || session.feedback || session.pending.questionId !== current.id || session.pending.wordId !== current.wordId || session.pending.mode !== current.mode || session.pending.track !== session.track || session.pending.versionId !== session.versionId || (current.mode !== 'spelling' && !current.choices.includes(session.pending.answer)))) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Pending answer does not match question' })
})
export const wordSessionUpdateSchema = z.object({ clientEventId: z.string().uuid(), expectedRevision: z.number().int().nonnegative(), versionId: id, session: wordSessionStateSchema.nullable() }).strict().refine(input => !input.session || input.session.versionId === input.versionId)
export const wordSettingsSchema = z.object({
  dailyNew: z.number().int().min(0).max(100), retention: z.number().min(0.7).max(0.97),
  autoplay: z.boolean(), spelling: z.boolean(),
  /** 整词发音口音；美音包待审，仅自用家庭开放。缺省按 GB 兼容旧存档与旧备份。 */
  accent: z.enum(['GB', 'US']).optional(),
}).strict()
export const wordSettingsUpdateSchema = wordSettingsSchema.extend({ expectedRevision: z.number().int().nonnegative() }).strict()
export const typingResultSchema = z.object({
  clientSessionId: z.string().uuid(), versionId: id, mode: z.enum(['word', 'sentence', 'dictation']),
  source: z.enum(['recent', 'wrong', 'favorite', 'path']), items: z.number().int().min(1).max(100),
  correctCharacters: z.number().int().nonnegative().max(100000), attemptedCharacters: z.number().int().positive().max(100000),
  acceptedCharacters: z.number().int().positive().max(100000), elapsedMs: z.number().int().positive().max(9000000),
}).strict().refine(value => value.correctCharacters <= value.attemptedCharacters && value.acceptedCharacters <= value.attemptedCharacters && value.elapsedMs <= value.items * 90000)
export const readingProgressSchema = z.object({ versionId: id, page: z.number().int().nonnegative(), fontSize: z.number().int().min(18).max(36), expectedRevision: z.number().int().nonnegative() }).strict()
const isoDate = z.string().datetime()
const cardSchema = z.object({
  due: isoDate, stability: z.number().finite().nonnegative().max(365000), difficulty: z.number().finite().min(0).max(10),
  elapsed_days: z.number().int().nonnegative().max(365000), scheduled_days: z.number().int().nonnegative().max(365000),
  learning_steps: z.number().int().nonnegative().max(100), reps: z.number().int().nonnegative().max(100000),
  lapses: z.number().int().nonnegative().max(100000), state: z.number().int().min(1).max(3), last_review: isoDate,
}).strict().refine(card => card.reps > 0 && card.lapses <= card.reps && card.stability > 0 && card.difficulty >= 1 && Date.parse(card.due) >= Date.parse(card.last_review))
export const wordBackupSchema = z.object({
  app: z.literal('taoread-phonics-word-backup'), version: z.literal(1), childId: z.string().min(1).max(100), courseVersionId: id, contentHash: hash, exportedAt: isoDate,
  settings: wordSettingsSchema,
  schedules: z.array(z.object({ wordId: id, algorithm: z.enum(['ts-fsrs-5.4.2-daily-v1', 'ts-fsrs-5.4.2-short-v2']), card: cardSchema, updatedAt: isoDate }).strict()).max(5000),
  favorites: z.array(id).max(5000),
  answers: z.array(z.object({ clientEventId: z.string().uuid(), questionId: z.string().uuid(), wordId: id, mode: z.enum(['picture', 'meaning', 'listen', 'spelling', 'contrast']), track: z.enum(['practice', 'study']), requestHash: hash, correct: z.boolean(), firstAttempt: z.boolean(), elapsedMs: z.number().int().min(0).max(90000).nullable(), reviewLogJson: z.string().max(20000).nullable(), createdAt: isoDate }).strict()).max(10000),
  typing: z.array(z.object({ clientSessionId: z.string().uuid(), requestHash: hash, mode: z.enum(['word', 'sentence', 'dictation']), source: z.enum(['recent', 'wrong', 'favorite', 'path']), items: z.number().int().min(1).max(100), correctCharacters: z.number().int().nonnegative().max(100000), attemptedCharacters: z.number().int().positive().max(100000), acceptedCharacters: z.number().int().positive().max(100000), elapsedMs: z.number().int().positive().max(9000000), createdAt: isoDate }).strict().refine(value => value.correctCharacters <= value.attemptedCharacters && value.acceptedCharacters <= value.attemptedCharacters && value.elapsedMs <= value.items * 90000)).max(10000),
  reading: z.array(z.object({ readerId: id, page: z.number().int().nonnegative(), fontSize: z.number().int().min(18).max(36), updatedAt: isoDate }).strict()).max(5000),
}).strict()
export const favoriteSchema = z.object({ versionId: id, favorite: z.boolean() }).strict()
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
