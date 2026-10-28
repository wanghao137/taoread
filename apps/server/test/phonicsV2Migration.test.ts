import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { createDb } from '../src/lib/db'

describe('phonics additive migration', () => {
  for (const populated of [false, true]) it(`preserves legacy rows and cascades event corrections (legacy=${populated})`, async () => {
    const root = await mkdtemp(path.join(tmpdir(), 'tao-phonics-migration-'))
    const db = createDb(`file:${path.join(root, 'migration.db').replaceAll('\\', '/')}`)
    try {
      await db.$executeRawUnsafe('PRAGMA foreign_keys=ON')
      await db.$executeRawUnsafe('CREATE TABLE Family (id TEXT PRIMARY KEY)')
      await db.$executeRawUnsafe('CREATE TABLE ChildProfile (id TEXT PRIMARY KEY, familyId TEXT NOT NULL REFERENCES Family(id) ON DELETE CASCADE)')
      const execute = async (name: string) => {
        const sql = await readFile(path.join(process.cwd(), 'prisma/migrations', name, 'migration.sql'), 'utf8')
        // These checked migrations contain only DDL, no triggers or string semicolons.
        for (const statement of sql.replace(/^\s*--.*$/gm, '').split(';').map(s => s.trim()).filter(Boolean)) await db.$executeRawUnsafe(statement)
      }
      await execute('20260923130000_imported_books_phonics_draft')
      await db.$executeRawUnsafe("INSERT INTO Family VALUES ('f')")
      await db.$executeRawUnsafe("INSERT INTO ChildProfile VALUES ('c','f')")
      if (populated) {
        await db.$executeRawUnsafe("INSERT INTO PhonicsEnrollment(id,childId,enabled,updatedAt) VALUES ('e','c',true,CURRENT_TIMESTAMP)")
        await db.$executeRawUnsafe("INSERT INTO PhonicsAttempt(id,childId,clientAttemptId,lessonId,status) VALUES ('old','c','legacy-id','draft-en-l01','paused')")
        await db.$executeRawUnsafe("INSERT INTO PhonicsResponse(id,attemptId,itemId,answerId,correct) VALUES ('response','old','question','s',false)")
      }
      const before = await db.$queryRawUnsafe('SELECT * FROM PhonicsResponse')
      await execute('20261019090000_phonics_v2_foundation')
      await execute('20261019100000_phonics_v2_enrollment_gate')
      await execute('20261027090000_phonics_practice_answers')
      await execute('20261027091000_phonics_word_favorites')
      await execute('20261027092000_phonics_fsrs_schedule')
      await execute('20261027100000_phonics_word_settings')
      await execute('20261027101000_phonics_typing_results')
      await execute('20261027102000_phonics_reading_progress')
      await execute('20261027103000_phonics_practice_duration')
      await execute('20261027104000_phonics_word_session')
      expect(await db.$queryRawUnsafe('SELECT * FROM PhonicsResponse')).toEqual(before)
      if (populated) {
        expect(await db.phonicsAttempt.findUnique({ where: { id: 'old' } })).toMatchObject({ status: 'paused', protocolVersion: 1, revision: 0, activeKey: null, stateJson: null })
        expect(await db.phonicsEnrollment.findUnique({ where: { childId: 'c' } })).toMatchObject({ enabled: true, v2Enabled: false, courseVersionId: null, revision: 0, wordSettingsJson: '{}', wordSettingsRevision: 0 })
      }
      await db.phonicsCourseRelease.create({ data: { versionId: 'public-course', courseId: 'public', contentHash: 'a'.repeat(64), accent: 'GB' } })
      await db.phonicsTypingResult.create({ data: { childId: 'c', courseVersionId: 'public-course', clientSessionId: 'typing', requestHash: 'a', mode: 'word', source: 'path', items: 1, correctCharacters: 3, attemptedCharacters: 3, acceptedCharacters: 3, elapsedMs: 1000 } })
      await db.phonicsReadingProgress.create({ data: { childId: 'c', courseVersionId: 'public-course', readerId: 'reader', page: 1 } })
      await db.phonicsWordSession.create({ data: { childId: 'c', courseVersionId: 'public-course', stateJson: null } })
      await db.phonicsWordSessionMutation.create({ data: { childId: 'c', clientEventId: 'event', requestHash: 'a', revision: 1 } })
      const attempt = await db.phonicsAttempt.create({ data: { childId: 'c', clientAttemptId: 'v2', lessonId: 'L01', protocolVersion: 2, activeKey: 'v2:c' } })
      const first = await db.phonicsLearningEvent.create({ data: { attemptId: attempt.id, clientEventId: '1', requestHash: 'a', serverSequence: 1, kind: 'caregiver_observation', actorRole: 'parent', payloadJson: '{}', resultJson: '{}' } })
      await db.phonicsLearningEvent.create({ data: { attemptId: attempt.id, clientEventId: '2', requestHash: 'b', serverSequence: 2, kind: 'caregiver_observation', actorRole: 'parent', payloadJson: '{}', resultJson: '{}', supersedesEventId: first.id } })
      await db.$executeRawUnsafe("DELETE FROM Family WHERE id='f'")
      expect(await db.phonicsLearningEvent.count()).toBe(0)
      expect(await db.phonicsAttempt.count()).toBe(0)
      expect(await db.phonicsResponse.count()).toBe(0)
      expect(await db.phonicsTypingResult.count()).toBe(0)
      expect(await db.phonicsReadingProgress.count()).toBe(0)
      expect(await db.phonicsWordSession.count()).toBe(0)
      expect(await db.phonicsWordSessionMutation.count()).toBe(0)
      expect(await db.phonicsCourseRelease.count()).toBe(1)
      expect(await db.$queryRawUnsafe('PRAGMA foreign_key_check')).toEqual([])
    } finally { await db.$disconnect(); await rm(root, { recursive: true, force: true }) }
  })
})
