import { createHash } from 'node:crypto'
import { readFile, realpath } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { PhonicsTaskDto } from '@taoread/shared'
import { courseSchema, type PhonicsCourse, type PhonicsLesson, type PhonicsTask } from './contracts'

export function canonicalJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(',')}]`
  if (value !== null && typeof value === 'object') {
    return `{${Object.entries(value).sort(([a], [b]) => a.localeCompare(b, 'en')).map(([key, v]) => `${JSON.stringify(key)}:${canonicalJson(v)}`).join(',')}}`
  }
  return JSON.stringify(value)
}

export const digest = (value: unknown): string => createHash('sha256').update(canonicalJson(value)).digest('hex')

export function courseHash(course: PhonicsCourse): string {
  const { contentHash: _contentHash, status: _status, ...manifest } = course.manifest
  return digest({
    ...course, manifest, reviews: [],
    assets: course.assets.map(({ reviewStatus: _reviewStatus, ...asset }) => asset),
  })
}

export function publicTask(task: PhonicsTask): PhonicsTaskDto {
  const { judge: _judge, hintAssetIds: _hints, easierTaskId: _easier, readerId: _reader, ...dto } = task
  // Deliberate whitelist: adding a private field never silently adds it to a DTO.
  return {
    id: dto.id, kind: dto.kind, skill: dto.skill, role: dto.role, instructionZh: dto.instructionZh,
    instructionAssetId: dto.instructionAssetId, stimulusAssetId: dto.stimulusAssetId,
    displayText: dto.displayText, wordId: dto.wordId, mappingId: dto.mappingId,
    imageAssetId: dto.imageAssetId,
    choices: dto.choices.map(({ id, label }) => ({ id, label })), timeline: dto.timeline,
    canSkipWithHelp: dto.canSkipWithHelp,
  }
}

const files = ['manifest', 'mappings', 'words', 'lessons', 'tasks', 'readers', 'assets', 'reviews', 'entryPlans'] as const
export async function loadCourse(directory: string): Promise<PhonicsCourse> {
  const entries = await Promise.all(files.map(async key => [key, JSON.parse(await readFile(path.join(directory, `${key}.json`), 'utf8'))] as const))
  return courseSchema.parse(Object.fromEntries(entries))
}

export const candidateDirectory = fileURLToPath(new URL('../courses/taoread-phonics-gb-v1/', import.meta.url))

export interface ContentIssue { code: string; location: string; message: string; severity: 'error' | 'warning' }
export interface ContentValidation {
  complete: boolean
  ok: boolean
  releaseReady: boolean
  mode: 'development' | 'release'
  versionId: string | null
  contentHash: string | null
  counts: { lessons: number; words: number; tasks: number; readers: number; assets: number; verifiedAssets: number }
  issues: ContentIssue[]
}

/** Private inspection permits outstanding human reviews, never invalid or missing content. */
export function selfUseReady(report: ContentValidation): boolean {
  const pendingReviews = new Set(['NOT_REVIEWED', 'TEACHING_REVIEW', 'ASSET_PENDING', 'RIGHTS_REVIEW', 'SPEECH_REVIEW'])
  return report.complete && report.counts.assets > 0 && report.counts.verifiedAssets === report.counts.assets
    && report.issues.every(issue => pendingReviews.has(issue.code))
}

export async function validateCourse(input: unknown, options: { mode: 'development' | 'release'; mediaRoot?: string }): Promise<ContentValidation> {
  const report: ContentValidation = {
    complete: true, ok: false, releaseReady: false, mode: options.mode, versionId: null, contentHash: null,
    counts: { lessons: 0, words: 0, tasks: 0, readers: 0, assets: 0, verifiedAssets: 0 }, issues: [],
  }
  let releaseBlocked = false
  const issue = (code: string, location: string, message: string, releaseOnly = false) => {
    if (releaseOnly) releaseBlocked = true
    report.issues.push({ code, location, message, severity: releaseOnly && options.mode === 'development' ? 'warning' : 'error' })
  }
  const parsed = courseSchema.safeParse(input)
  if (!parsed.success) {
    for (const error of parsed.error.issues) issue('SCHEMA', error.path.join('.'), error.message)
    return report
  }
  const c = parsed.data
  report.versionId = c.manifest.versionId
  report.contentHash = courseHash(c)
  report.counts = { lessons: c.lessons.length, words: c.words.length, tasks: c.tasks.length, readers: c.readers.length, assets: c.assets.length, verifiedAssets: 0 }
  const index = <T extends { id: string }>(entries: T[], namespace: string): Map<string, T> => {
    const map = new Map<string, T>()
    for (const entry of entries) {
      if (map.has(entry.id)) issue('DUPLICATE_ID', `${namespace}.${entry.id}`, 'ID is duplicated')
      map.set(entry.id, entry)
    }
    return map
  }
  const lessons = index(c.lessons, 'lessons'), mappings = index(c.mappings, 'mappings')
  const words = index(c.words, 'words'), tasks = index(c.tasks, 'tasks'), readers = index(c.readers, 'readers')
  const assets = index(c.assets, 'assets'), entries = index(c.entryPlans, 'entryPlans')
  index(c.reviews, 'reviews')
  for (const [keys, actual, name] of [[c.manifest.lessonKeys, lessons, 'lessonKeys'], [c.manifest.assetIds, assets, 'assetIds'], [c.manifest.entryPlanKeys, entries, 'entryPlanKeys']] as const) {
    if (new Set(keys).size !== keys.length || keys.length !== actual.size || keys.some(key => !actual.has(key))) issue('MANIFEST_INDEX', name, 'Manifest must list each object exactly once')
  }
  if (c.manifest.lessonKeys.some((key, i) => c.lessons[i]?.id !== key)) issue('LESSON_ORDER', 'manifest.lessonKeys', 'Manifest and lesson order differ')
  const orders = new Set<number>()
  for (const lesson of c.lessons) {
    if (orders.has(lesson.order)) issue('LESSON_ORDER', lesson.id, 'Lesson order is duplicated')
    orders.add(lesson.order)
  }
  const parents = new Map<string, Set<string>>()
  const visiting = new Set<string>()
  const ancestors = (key: string): Set<string> => {
    if (parents.has(key)) return parents.get(key)!
    if (visiting.has(key)) { issue('PREREQUISITE_CYCLE', key, 'Lesson prerequisites form a cycle'); return new Set() }
    const lesson = lessons.get(key)
    if (!lesson) { issue('UNKNOWN_LESSON', key, 'Lesson does not exist'); return new Set() }
    visiting.add(key)
    const result = new Set<string>([key])
    for (const p of lesson.prerequisites) {
      if ((lessons.get(p)?.order ?? Infinity) >= lesson.order) issue('PREREQUISITE_ORDER', key, `Prerequisite ${p} must come first`)
      for (const ancestor of ancestors(p)) result.add(ancestor)
    }
    visiting.delete(key); parents.set(key, result)
    return result
  }
  for (const lesson of c.lessons) ancestors(lesson.id)
  const known = (lesson: PhonicsLesson, field: 'newMappingIds' | 'capitals' | 'exceptions' | 'punctuation') => new Set([...ancestors(lesson.id)].flatMap(key => lessons.get(key)?.[field] ?? []))
  const taughtMappings = new Set<string>()
  for (const lesson of c.lessons) for (const mappingId of lesson.newMappingIds) {
    if (!mappings.has(mappingId)) issue('UNKNOWN_MAPPING', lesson.id, mappingId)
    if (taughtMappings.has(mappingId)) issue('REPEATED_NEW_MAPPING', lesson.id, mappingId)
    taughtMappings.add(mappingId)
  }
  for (const mapping of c.mappings) if (mapping.accent !== c.manifest.accent) issue('ACCENT', mapping.id, 'Mapping accent differs from course')

  const checkWord = (wordId: string, lesson: PhonicsLesson, location: string) => {
    const word = words.get(wordId)
    if (!word) { issue('UNKNOWN_WORD', location, wordId); return }
    if (!ancestors(lesson.id).has(word.decodingIntroducedAt)) issue('WORD_BEFORE_INTRODUCTION', location, wordId)
    const available = known(lesson, 'newMappingIds')
    const covered = Array.from({ length: word.text.length }, () => 0)
    const shapes: Array<{ start: number; shape: string }> = []
    for (const span of word.spans) {
      let spelling = '', previous = -1
      for (const [start, end] of span.ranges) {
        if (start >= end || end > word.text.length || start < previous) issue('WORD_RANGE', location, `${wordId}: invalid range`)
        for (let p = start; p < Math.min(end, word.text.length); p++) covered[p] = (covered[p] ?? 0) + 1
        spelling += word.text.slice(start, end).toLowerCase(); previous = end
      }
      const start = span.ranges[0]![0]
      if (span.mappingId) {
        const mapping = mappings.get(span.mappingId)
        if (!mapping) { issue('UNKNOWN_MAPPING', location, span.mappingId); continue }
        if (spelling !== mapping.spelling) issue('SPELLING_MISMATCH', location, `${wordId}: ${spelling} does not match ${mapping.spelling}`)
        if (!available.has(mapping.id)) issue('UNTAUGHT_MAPPING', location, `${wordId}: ${mapping.id}`)
        const last = span.ranges[span.ranges.length - 1]![1]
        if ((mapping.positionCondition === 'initial' && start !== 0) || (mapping.positionCondition === 'final' && last !== word.text.length) || (mapping.positionCondition === 'medial' && (start === 0 || last === word.text.length))) issue('MAPPING_POSITION', location, wordId)
        shapes.push({ start, shape: mapping.phonemes.map(p => p.kind === 'vowel' ? 'V' : 'C').join('') })
      } else if (span.exception) {
        if (!known(lesson, 'exceptions').has(span.exception.id) || !ancestors(lesson.id).has(span.exception.taughtAt)) issue('UNTAUGHT_EXCEPTION', location, wordId)
        shapes.push({ start, shape: span.exception.phonemeShape })
      }
    }
    if (covered.some(count => count !== 1)) issue('WORD_COVERAGE', location, `${wordId}: every letter needs exactly one mapping`)
    const shape = shapes.sort((a, b) => a.start - b.start).map(s => s.shape).join('')
    if (!lesson.allowedShapes.includes(shape)) issue('UNTREATED_WORD_SHAPE', location, `${wordId}: ${shape}`)
    for (const capital of word.text.match(/[A-Z]/g) ?? []) if (!known(lesson, 'capitals').has(capital)) issue('UNTAUGHT_CAPITAL', location, `${wordId}: ${capital}`)
  }
  const requireAsset = (assetId: string, location: string, purpose?: PhonicsCourse['assets'][number]['purpose']) => {
    const asset = assets.get(assetId)
    if (!asset) issue('UNKNOWN_ASSET', location, assetId)
    else if (purpose && asset.purpose !== purpose) issue('ASSET_PURPOSE', location, `${assetId} must be ${purpose}`)
    return asset
  }
  for (const word of c.words) {
    if (!lessons.has(word.meaningIntroducedAt)) issue('UNKNOWN_MEANING_LESSON', word.id, word.meaningIntroducedAt)
    const lesson = lessons.get(word.decodingIntroducedAt)
    if (lesson) checkWord(word.id, lesson, `words.${word.id}`)
    else issue('UNKNOWN_LESSON', word.id, word.decodingIntroducedAt)
    for (const purpose of ['segment', 'blend', 'word'] as const) requireAsset(word.audioIds[purpose], word.id, purpose)
  }
  for (const task of c.tasks) {
    requireAsset(task.instructionAssetId, task.id, 'instruction_zh')
    const stimulus = task.stimulusAssetId ? requireAsset(task.stimulusAssetId, task.id) : undefined
    if (task.imageAssetId) requireAsset(task.imageAssetId, task.id, 'image')
    for (const hint of task.hintAssetIds) {
      if (requireAsset(hint, task.id)?.purpose === 'image') issue('HINT_PURPOSE', task.id, 'Audio hints cannot reference an image')
    }
    if (['choice', 'build'].includes(task.kind)) {
      if (!task.judge || task.judge.answerIds.some(answer => !task.choices.some(c => c.id === answer))) issue('INVALID_ANSWER', task.id, 'Answer must use available choices')
      if (task.kind === 'choice' && task.judge?.answerIds.length !== 1) issue('INVALID_ANSWER', task.id, 'Choice needs one answer')
      if (task.kind === 'build' && task.wordId && task.judge && task.judge.answerIds.map(id => task.choices.find(c => c.id === id)?.label).join('').toLowerCase() !== words.get(task.wordId)?.text.toLowerCase()) issue('BUILD_SPELLING', task.id, 'Tiles do not spell target word')
    } else if (task.judge) issue('UNEXPECTED_JUDGE', task.id, 'This task does not produce automatic correctness')
    if (new Set(task.choices.map(c => c.id)).size !== task.choices.length) issue('DUPLICATE_CHOICE', task.id, 'Choice IDs must be unique')
    if (task.role === 'independent' && ['oral', 'read'].includes(task.kind) && (task.stimulusAssetId || task.imageAssetId || task.kind === 'read')) issue('ANSWER_EXPOSURE', task.id, 'Independent oral reading must not start with target audio, image or contextual reader')
    if (task.easierTaskId) {
      const easier = tasks.get(task.easierTaskId)
      if (!easier || easier.skill !== task.skill || easier.wordId !== task.wordId || easier.mappingId !== task.mappingId) issue('EASIER_TARGET', task.id, 'Easier task must keep the same learning target')
    }
    let previousEnd = 0
    for (const cue of task.timeline) {
      if (cue.atMs < previousEnd || cue.endMs <= cue.atMs || (stimulus?.durationMs && cue.endMs > stimulus.durationMs)) issue('TIMELINE', task.id, 'Timeline overlaps or exceeds the stimulus')
      previousEnd = cue.endMs
    }
  }
  for (const task of c.tasks) {
    const visited = new Set<string>([task.id]); let next = task.easierTaskId
    while (next) {
      if (visited.has(next)) { issue('EASIER_CYCLE', task.id, 'Easier tasks form a cycle'); break }
      visited.add(next); next = tasks.get(next)?.easierTaskId
    }
  }
  for (const lesson of c.lessons) {
    const lessonTasks = lesson.taskIds.map(id => tasks.get(id))
    const capitalsBefore = new Set([...ancestors(lesson.id)].filter(id => id !== lesson.id).flatMap(id => lessons.get(id)?.capitals ?? []))
    for (const taskId of lesson.taskIds) if (!tasks.has(taskId)) issue('UNKNOWN_TASK', lesson.id, taskId)
    for (const task of lessonTasks) {
      if (!task) continue
      for (const capital of task.teachesCapitals) {
        if (!lesson.capitals.includes(capital)) issue('CAPITAL_TEACHING', task.id, capital)
        capitalsBefore.add(capital)
      }
      const printed = task.displayText ?? (task.readerId ? readers.get(task.readerId)?.pages.map(p => p.text).join(' ') : '') ?? ''
      for (const capital of printed.match(/[A-Z]/g) ?? []) if (!capitalsBefore.has(capital)) issue('CAPITAL_STEP_ORDER', task.id, capital)
      if (task.wordId && task.skill !== 'meaning') checkWord(task.wordId, lesson, `${lesson.id}.${task.id}`)
      if (task.mappingId && !known(lesson, 'newMappingIds').has(task.mappingId)) issue('UNTAUGHT_MAPPING', task.id, task.mappingId)
      for (const choice of task.choices) if (choice.mappingId && !known(lesson, 'newMappingIds').has(choice.mappingId)) issue('UNTAUGHT_DISTRACTOR', task.id, choice.mappingId)
      if (task.role === 'independent' && task.wordId && lessonTasks.some(other => other && other.id !== task.id && other.wordId === task.wordId && ['model', 'guided'].includes(other.role))) issue('REHEARSED_INDEPENDENT_WORD', task.id, task.wordId)
      if (task.readerId && !readers.has(task.readerId)) issue('UNKNOWN_READER', task.id, task.readerId)
      if (task.displayText) {
        const allowed = [task.wordId ? words.get(task.wordId)?.text : null, task.mappingId ? mappings.get(task.mappingId)?.display : null]
        if (!allowed.includes(task.displayText)) issue('UNVALIDATED_DISPLAY_TEXT', task.id, 'English display text must reference its word or mapping')
      }
    }
    for (const capital of lesson.capitals) if (!capitalsBefore.has(capital)) issue('MISSING_CAPITAL_TEACHING', lesson.id, capital)
    for (const readerId of lesson.readerIds) {
      const reader = readers.get(readerId)
      if (!reader) { issue('UNKNOWN_READER', lesson.id, readerId); continue }
      if (!ancestors(lesson.id).has(reader.introducedAt)) issue('EARLY_READER', lesson.id, readerId)
      for (const page of reader.pages) {
        const tokens = page.text.match(/[A-Za-z]+/g) ?? []
        if (tokens.join(' ') !== page.wordIds.map(id => words.get(id)?.text ?? '?').join(' ')) issue('READER_TOKENS', readerId, 'Every printed word must match its exact word entry, including case')
        for (const wordId of page.wordIds) checkWord(wordId, lesson, `${lesson.id}.${readerId}`)
        const punctuation = page.text.replace(/[A-Za-z\s]/g, '')
        for (const p of punctuation) if (!known(lesson, 'punctuation').has(p)) issue('UNTAUGHT_PUNCTUATION', readerId, p)
        requireAsset(page.audioAssetId, readerId, reader.kind === 'word_cards' ? 'word' : 'passage')
        if (page.imageAssetId) requireAsset(page.imageAssetId, readerId, 'image')
      }
    }
  }
  for (const entry of c.entryPlans) for (const taskId of entry.taskIds) {
    const task = tasks.get(taskId)
    if (!task || task.role === 'independent' || task.displayText) issue('ENTRY_TASK', entry.id, 'Entry plans must use non-decoding guided activities')
  }

  if (c.manifest.fixture) issue('FIXTURE', 'manifest', 'Test fixture is not publishable', true)
  if (c.manifest.status !== 'reviewed') issue('NOT_REVIEWED', 'manifest', 'Course is not reviewed', true)
  if (c.manifest.contentHash !== report.contentHash) issue('COURSE_HASH', 'manifest', 'Stored content hash is missing or stale', true)
  const approved = (scope: 'teaching' | 'speech' | 'rights', targetId: string, targetHash: string) => {
    const matching = c.reviews.filter(r => r.scope === scope && r.targetId === targetId && r.targetHash === targetHash).sort((a, b) => b.reviewedAt - a.reviewedAt)
    return matching[0]?.decision === 'approved'
  }
  if (!approved('teaching', c.manifest.versionId, report.contentHash!)) issue('TEACHING_REVIEW', 'reviews', 'Exact course hash needs teaching signoff', true)
  for (const asset of c.assets) {
    const audio = asset.purpose !== 'image'
    if ((asset.purpose === 'instruction_zh' && asset.accent !== 'zh') || (asset.purpose !== 'instruction_zh' && audio && asset.accent !== c.manifest.accent)) issue('ASSET_ACCENT', asset.id, 'Asset accent/purpose mismatch')
    if ((audio && !['wav', 'mp3'].includes(asset.extension)) || (!audio && !['png', 'webp'].includes(asset.extension))) issue('ASSET_EXTENSION', asset.id, 'File type does not match its purpose')
    if (asset.fixture) issue('FIXTURE', asset.id, 'Fixture asset is not publishable', true)
    if (!asset.sha256 || !asset.sourceLicense || asset.reviewStatus !== 'approved' || (audio && (!asset.durationMs || !asset.speakerId))) issue('ASSET_PENDING', asset.id, 'Asset metadata and approval are incomplete', true)
    if (asset.sha256) {
      if (!approved('rights', asset.id, asset.sha256)) issue('RIGHTS_REVIEW', asset.id, 'Asset hash needs rights review', true)
      if (audio && !approved('speech', asset.id, asset.sha256)) issue('SPEECH_REVIEW', asset.id, 'Audio hash needs listening review', true)
    }
    if (!asset.sha256 || !options.mediaRoot) { issue('ASSET_NOT_VERIFIED', asset.id, 'Physical asset has not been verified', true); continue }
    const root = path.resolve(options.mediaRoot, 'phonics', c.manifest.versionId)
    const file = path.join(root, `${asset.sha256}.${asset.extension}`)
    try {
      const resolvedMediaRoot = await realpath(options.mediaRoot)
      const resolvedRoot = await realpath(root), resolvedFile = await realpath(file)
      const versionRelative = path.relative(resolvedMediaRoot, resolvedRoot)
      if (versionRelative.startsWith('..') || path.isAbsolute(versionRelative)) { issue('ASSET_PATH', asset.id, 'Version root escapes media root'); continue }
      const relative = path.relative(resolvedRoot, resolvedFile)
      if (relative.startsWith('..') || path.isAbsolute(relative)) { issue('ASSET_PATH', asset.id, 'Asset escapes version root'); continue }
      const bytes = await readFile(resolvedFile)
      if (createHash('sha256').update(bytes).digest('hex') !== asset.sha256) issue('ASSET_HASH', asset.id, 'File hash mismatch')
      else {
        const signatureOk = asset.extension === 'wav' ? bytes.length > 44 && bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WAVE'
          : asset.extension === 'mp3' ? bytes.length > 10 && (bytes.toString('ascii', 0, 3) === 'ID3' || (bytes[0] === 0xff && (bytes[1]! & 0xe0) === 0xe0))
          : asset.extension === 'png' ? bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
          : bytes.length > 12 && bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP'
        if (!signatureOk) issue('ASSET_SIGNATURE', asset.id, 'File signature does not match its extension')
        else report.counts.verifiedAssets++
      }
    } catch { issue('ASSET_MISSING', asset.id, 'Physical asset could not be read', true) }
  }
  report.ok = !report.issues.some(i => i.severity === 'error')
  report.releaseReady = report.ok && !releaseBlocked
  return report
}
