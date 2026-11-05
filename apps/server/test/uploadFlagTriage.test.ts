import { describe, expect, it } from 'vitest'
import { resolveAudioFileName, triage } from '../scripts/lib/upload-flag-triage'

describe('triage', () => {
  it('200 + local in disk -> flip', () => {
    expect(triage({ headOk: true, localExists: true })).toBe('flip')
  })
  it('200 + local absent -> flip', () => {
    expect(triage({ headOk: true, localExists: false })).toBe('flip')
  })
  it('not-ok + local in disk -> keep-pending-upload', () => {
    expect(triage({ headOk: false, localExists: true })).toBe('keep-pending-upload')
  })
  it('not-ok + local absent -> keep-missing', () => {
    expect(triage({ headOk: false, localExists: false })).toBe('keep-missing')
  })
  it('network failure wins over other buckets', () => {
    expect(triage({ headOk: false, network: true, localExists: true })).toBe('keep-network')
    expect(triage({ headOk: false, network: true, localExists: false })).toBe('keep-network')
  })
})

describe('resolveAudioFileName', () => {
  it('no override -> key', () => {
    expect(resolveAudioFileName('abc')).toEqual({ name: 'abc', invalidOverride: false })
  })
  it('valid 64-hex audioKey + model -> audioKey', () => {
    const key = 'a'.repeat(64)
    expect(resolveAudioFileName('orig', { audioKey: key, model: 'mimo' })).toEqual({ name: key, invalidOverride: false })
  })
  it('audioKey without model -> fallback to key, flagged', () => {
    const key = 'b'.repeat(64)
    expect(resolveAudioFileName('orig', { audioKey: key })).toEqual({ name: 'orig', invalidOverride: true })
  })
  it('audioKey not 64-hex -> fallback to key, flagged', () => {
    expect(resolveAudioFileName('orig', { audioKey: 'nothex', model: 'mimo' })).toEqual({ name: 'orig', invalidOverride: true })
  })
})
