import { describe, expect, it } from 'vitest'
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'

describe('CC story page import', () => {
  it('handles CRLF, empty picture pages and the final metadata delimiter without leaking markdown', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'tao-cc-source-'))
    const source = join(dir, 'source'), output = join(dir, 'packs')
    await mkdir(source); await mkdir(output)
    try {
      const paragraph = 'The small bird sat in a tree and looked at the quiet river. A rabbit came to visit and they talked about the bright moon.'
      const body = Array.from({ length: 6 }, (_, i) => `##\n${i === 3 ? '##\n\n##\n' : ''}${paragraph}`).join('\n\n')
      await writeFile(join(source, '0001_test-story.md'), `# Test story\n\n${body}\n\n##\n* License: [CC-BY]\n* Text: Test Author\n* Language: en\n`.replace(/\n/g, '\r\n'))
      execFileSync(process.execPath, ['scripts/gen-cc-packs.mjs', source, '1', output], { stdio: 'pipe' })
      const pack = await readFile(join(output, 'cc-test-story.ts'), 'utf8')
      expect(pack).not.toContain('##')
      expect(pack).not.toContain('* License:')
      expect(pack.match(/kind: 'text'/g)).toHaveLength(6)
      expect(pack).toContain('Pages 4–6')
    } finally { await rm(dir, { recursive: true, force: true }) }
  })
})
