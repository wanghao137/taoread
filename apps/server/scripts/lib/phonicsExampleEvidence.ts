import { createHash } from 'node:crypto'

export function sameExampleInput(a: { wordId: string; word: string; example: { en: string } }, b: { wordId: string; word: string; example: { en: string } } | undefined): boolean {
  return Boolean(b && a.wordId === b.wordId && a.word === b.word && a.example.en === b.example.en)
}

export function exampleEvidenceMatches(text: string, sha256: string, evidence: { audioSha256: string; textSha256: string; transcript: string; textMatches: boolean; peak: number; humanReviewed: boolean }): boolean {
  const normalize = (value: string) => (value.toLowerCase().match(/[a-z]+/g) ?? []).join('')
  const expected = createHash('sha256').update(text).digest('hex')
  return evidence.humanReviewed === false && evidence.audioSha256 === sha256 && evidence.textSha256 === expected &&
    evidence.textMatches && evidence.peak > 0.001 && normalize(text) !== '' && normalize(text) === normalize(evidence.transcript)
}

export function exampleWavMatches(bytes: Buffer, sha256: string, durationMs: number, expectedBytes: number): boolean {
  if (bytes.length !== expectedBytes || bytes.length <= 44 || createHash('sha256').update(bytes).digest('hex') !== sha256 ||
    bytes.toString('ascii', 0, 4) !== 'RIFF' || bytes.readUInt32LE(4) + 8 !== bytes.length ||
    bytes.toString('ascii', 8, 16) !== 'WAVEfmt ' || bytes.readUInt32LE(16) !== 16 ||
    bytes.readUInt16LE(20) !== 1 || bytes.readUInt16LE(22) !== 1 || bytes.readUInt32LE(24) !== 24000 ||
    bytes.readUInt32LE(28) !== 48000 || bytes.readUInt16LE(34) !== 16 ||
    bytes.toString('ascii', 36, 40) !== 'data' || bytes.readUInt32LE(40) !== bytes.length - 44 ||
    (bytes.length - 44) % 2 !== 0 || Math.round((bytes.length - 44) / 48) !== durationMs) return false
  for (let i = 44; i < bytes.length; i += 2) if (Math.abs(bytes.readInt16LE(i)) > 32) return true
  return false
}
