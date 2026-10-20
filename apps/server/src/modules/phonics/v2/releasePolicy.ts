import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { z } from 'zod'

export type PhonicsReleaseStage = 'pilot' | 'published'

/** A pilot release never becomes public merely by changing the global rollout. */
export function releaseAccessible(
  release: { status: string; contentHash: string } | null,
  contentHash: string,
  rollout: 'off' | 'pilot' | 'all' | undefined,
  pilotMember: boolean,
): boolean {
  if (!release || release.contentHash !== contentHash || !rollout || rollout === 'off') return false
  if (release.status === 'pilot') return rollout === 'pilot' && pilotMember
  return release.status === 'published' && (rollout === 'all' || (rollout === 'pilot' && pilotMember))
}

const evidenceKinds = ['technical', 'realDevices', 'teachingAndSpeech', 'backupRestore'] as const

/** Validates receipts; it cannot perform or approve the underlying human observations. */
export async function validateReleaseAcceptance(file: string, versionId: string, contentHash: string, stage: PhonicsReleaseStage): Promise<void> {
  const gate = z.object({
    complete: z.literal(true), versionId: z.literal(versionId), contentHash: z.literal(contentHash),
    technical: z.string().min(1), realDevices: z.string().min(1),
    teachingAndSpeech: z.string().min(1), backupRestore: z.string().min(1),
    familyPilot: stage === 'published' ? z.string().min(1) : z.never().optional(),
    approvedBy: z.string().trim().min(1), approvedAt: z.number().int().positive(),
  }).strict().parse(JSON.parse(await readFile(path.resolve(file), 'utf8')))
  const kinds = stage === 'published' ? [...evidenceKinds, 'familyPilot' as const] : evidenceKinds
  for (const kind of kinds) {
    const reference = gate[kind] as string
    const evidence = JSON.parse(await readFile(path.resolve(path.dirname(file), reference), 'utf8'))
    // An existing empty file, old report, or incomplete report is not acceptance evidence.
    z.object({ complete: z.literal(true), versionId: z.literal(versionId), contentHash: z.literal(contentHash),
      kind: z.literal(kind), result: z.literal('passed'),
    }).passthrough().parse(evidence)
  }
}
