import { describe, expect, it } from 'vitest'
import { spawnSync } from 'node:child_process'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { wordVoiceJobs } from '../scripts/lib/phonicsWordVoice'

describe('phonics word voice candidates', () => {
  const words = [{ id: 'w-cat', text: 'cat' }, { id: 'w-hat', text: 'hat' }]
  const options = { accent: 'US' as const, model: 'model', voice: 'voice', courseHash: 'hash' }
  it('selects only known words and ties inputs to requested accent and voice', () => {
    const [job] = wordVoiceJobs(words, options, new Set(['w-cat']))
    expect(job).toMatchObject({ id: 'w-cat', word: 'cat' })
    expect(job!.instruction).toContain('American')
    expect(job!.inputHash).not.toBe(wordVoiceJobs(words, { ...options, voice: 'other' })[0]!.inputHash)
    expect(() => wordVoiceJobs(words, options, new Set(['w-unknown']))).toThrow('Unknown word id')
  })

  it('acquires the output lock before reading or changing an existing ledger', async () => {
    const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
    const output = path.join(root, 'output')
    await mkdir(output, { recursive: true })
    const temp = await mkdtemp(path.join(output, 'phonics-voice-lock-'))
    try {
      const out = path.join(temp, 'audio')
      await mkdir(out)
      await writeFile(path.join(out, '.generation.lock'), '')
      await writeFile(path.join(out, 'word-audio-candidates.json'), 'unchanged')
      const env = path.join(temp, 'provider.env')
      await writeFile(env, 'MIMO_BASE=http://127.0.0.1:9\nMIMO_API_KEY=offline-test-placeholder\n')
      const result = spawnSync(process.execPath, ['--import', 'tsx', path.join(root, 'apps/server/scripts/produce-phonics-word-variants.mts'), '--out', out, '--env-file', env, '--ids', 'w-cat'], { cwd: root, encoding: 'utf8', timeout: 30000 })
      expect(result.status).not.toBe(0)
      expect(result.stderr).toContain('EEXIST')
      expect(await readFile(path.join(out, 'word-audio-candidates.json'), 'utf8')).toBe('unchanged')
    } finally {
      if (path.dirname(temp) === output) await rm(temp, { recursive: true, force: true })
    }
  }, 40000)
})
