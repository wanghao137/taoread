import { beforeAll, describe, expect, it } from 'vitest'
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { routePreloads } from '../src/lib/routePreloads'

describe('route chunk preloads', () => {
  let root: string
  beforeAll(async () => {
    root = await mkdtemp(join(tmpdir(), 'taoread-preload-test-'))
    await mkdir(join(root, '.vite'))
    await writeFile(join(root, 'index.html'), '<html><head><script>existing CSP hash</script></head><body>app</body></html>')
    await writeFile(join(root, '.vite/manifest.json'), JSON.stringify({
      '_ChildHome-current.js': { file: 'assets/ChildHome-current.js', name: 'ChildHome', imports: ['shared'] },
      '_ChildHome-legacy-old.js': { file: 'assets/ChildHome-legacy-old.js', name: 'ChildHome' },
      'src/pages/child/ReaderPage.tsx': { file: 'assets/ReaderPage-current.js', imports: ['shared'] },
      'src/pages/child/ListeningPage.tsx': { file: 'assets/ListeningPage-current.js' },
      'src/pages/child/phonics/PhonicsPage.tsx': { file: 'assets/PhonicsPage-current.js' },
      'src/pages/child/FamilyTrialPages.tsx': { file: 'assets/FamilyTrialPages-current.js' },
      'src/pages/ParentHome.tsx': { file: 'assets/ParentHome-current.js' },
      shared: { file: 'assets/shared-current.js', imports: ['shared'] },
    }))
  })
  it('preloads exact child route and shared chunks once without fetching other screens', async () => {
    const render = await routePreloads(root)
    const html = render('/child/book/public-book/chapter/1')!
    expect(html).toContain('/assets/ChildHome-current.js')
    expect(html).toContain('/assets/ReaderPage-current.js')
    expect(html.match(/href="\/assets\/shared-current.js"/g)).toHaveLength(1)
    expect(html).not.toContain('ListeningPage')
    expect(html).not.toContain('ParentHome')
    expect(html).not.toContain('-legacy-')
    expect(html).toContain('<script>existing CSP hash</script>')
    expect(render('/child/today')).not.toContain('ReaderPage')
    expect(render('/child/listen/public/book')).toContain('ListeningPage')
    expect(render('/child/phonics')).toContain('PhonicsPage')
    expect(render('/child/phonics')).not.toContain('FamilyTrialPages')
    expect(render('/child/phonics/draft')).toContain('FamilyTrialPages')
    expect(render('/login')).toBeUndefined()
    expect(render('/parent')).toBeUndefined()
  })
  it('old builds without a manifest keep the existing HTML path', async () => {
    const render = await routePreloads(join(root, 'missing-build'))
    expect(render('/child/today')).toBeUndefined()
  })
  it('rejects unsafe artifact paths instead of placing them in HTML', async () => {
    await writeFile(join(root, '.vite/manifest.json'), JSON.stringify({ 'src/pages/ChildHome.tsx': { file: '../private/file.js' } }))
    expect((await routePreloads(root))('/child/today')).toBeUndefined()
  })
})
