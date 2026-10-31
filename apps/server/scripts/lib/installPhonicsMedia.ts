import { createHash } from 'node:crypto'
import { constants, copyFileSync, existsSync, readFileSync } from 'node:fs'

const sha256 = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex')

export function copyVerifiedMedia(source: string, target: string, expectedHash: string): 'copy' | 'skip' {
  if (sha256(readFileSync(source)) !== expectedHash) throw new Error(`Source hash mismatch: ${source}`)
  if (existsSync(target)) {
    if (sha256(readFileSync(target)) !== expectedHash) throw new Error(`Existing target hash mismatch: ${target}`)
    return 'skip'
  }
  copyFileSync(source, target, constants.COPYFILE_EXCL)
  if (sha256(readFileSync(target)) !== expectedHash) throw new Error(`Copied target hash mismatch: ${target}`)
  return 'copy'
}
