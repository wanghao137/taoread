import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const cwd = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const hash = (s: string) => createHash('sha256').update(s).digest('hex')

function check(options: { missing?: boolean; reversed?: boolean; stale?: boolean; placeholder?: boolean; markup?: boolean }) {
  const dir = mkdtempSync(join(tmpdir(), 'taoread-classics-test-'))
  if (dirname(resolve(dir)) !== resolve(tmpdir())) throw Error('Unexpected fixture directory')
  try {
    const paragraphs = [{ id: 'p1', text: 'Once there was a small child.' }, { id: 'p2', text: 'The child returned home.' }]
    const chapter = { order: 1, title: 'A complete story', sourceSha256: hash(paragraphs.map(p => p.text).join('\n\n')), paragraphs }
    const book = { id: 'zh-classic-aesop', title: '测试精选', author: 'Fixture', deathYear: 1800, sourceLang: 'en', expected: 2, scope: 'Test only', chapters: [chapter, { ...chapter, order: 2 }] }
    writeFileSync(join(dir, 'source-corpus.json'), JSON.stringify({ books: [book] }))
    mkdirSync(join(dir, 'translations'))
    for (const ch of book.chapters) {
      if (options.missing && ch.order === 2) continue
      const job = { bookId: book.id, bookTitle: book.title, lang: 'en', title: ch.title, chapter: ch.order, part: 1, paragraphs, poem: false }
      const translated = [{ id: 'p1', zh: options.placeholder ? '以下是全文翻译，此处省略' : '从前，有一个小孩子。' }, { id: 'p2', zh: options.markup ? '孩子回到了家中。"}]}' : '孩子回到了家中。' }]
      if (options.reversed) translated.reverse()
      writeFileSync(join(dir, 'translations', `${book.id}-${ch.order}-1.json`), JSON.stringify({ sourceSha256: options.stale ? 'stale' : hash(JSON.stringify(job)), translation: { title: '完整故事', scene: '小孩子沿着村庄的小路回到家中，阳光照在绿色的草地上。', paragraphs: translated }, review: { ok: true, problems: [] } }))
    }
    const run = spawnSync(process.execPath, ['scripts/import-classics.mjs', dir, '--validate-only'], { cwd, encoding: 'utf8', timeout: 15_000 })
    if (run.error) throw run.error
    const report = JSON.parse(readFileSync(join(dir, 'import-readiness.json'), 'utf8')) as { completeBooks: number; chapters: number; failures: Array<{ reason: string }> }
    return { exitCode: run.status, report }
  } finally {
    // The recursive target is a freshly-created child of the OS temp directory.
    rmSync(dir, { recursive: true, force: true })
  }
}

describe('经典完整正文导入门槛', () => {
  it('即使有通过标签，也拒绝混进朗读正文的 JSON 输出残片', () => {
    const {report}=check({markup:true})
    expect(report.chapters).toBe(0)
    expect(report.failures.every(f=>f.reason==='Translation contains output markup')).toBe(true)
  })
  it('拒绝把多行诗节压成散文，同时保留单行的小节题名', () => {
    const run=spawnSync(process.execPath,['--input-type=module','-e',`
      import { validateTranslation } from './scripts/classics-shared.mjs';
      const job={poem:true,paragraphs:[{id:'p1',text:'1. Good-night'},{id:'p2',text:'The bright lamp is carried in.\\nThe dark returns again.'}]};
      const translation={title:'晚安',scene:'孩子站在明亮的壁炉旁，手中拿着小灯准备走回温暖的卧室。',paragraphs:[{id:'p1',zh:'一、晚安'},{id:'p2',zh:'明亮的灯被拿进来，黑暗又归来了。'}]};
      try { validateTranslation(job,translation);process.exit(2) } catch(e) { if(e.message!=='Poem stanza lost line breaks') throw e }
      translation.paragraphs[1].zh='明亮的灯被拿进来，\\n黑暗又归来了。';
      validateTranslation(job,translation);
    `],{cwd,encoding:'utf8',timeout:15_000});
    expect(run.status,run.stderr).toBe(0)
  })
  it('拒绝中文叙述里未翻译的英文，同时保留中文译名后的原文括注', () => {
    const run=spawnSync(process.execPath,['--input-type=module','-e',`
      import { validateTranslation } from './scripts/classics-shared.mjs';
      const job={paragraphs:[{id:'a',text:'The Mole leaned back blissfully.'}]};
      const meta={title:'河岸',scene:'鼹鼠坐在小船里面，舒舒服服地靠在柔软的垫子上。'};
      try { validateTranslation(job,{...meta,paragraphs:[{id:'a',zh:'鼹鼠 blissfully 靠在垫子上。'}]});process.exit(2) } catch(e) { if(e.message!=='Untranslated Latin word in Chinese narration') throw e }
      validateTranslation(job,{...meta,paragraphs:[{id:'a',zh:'鼹鼠（Mole）舒舒服服地靠在垫子上。'}]});
    `],{cwd,encoding:'utf8',timeout:15_000});
    expect(run.status,run.stderr).toBe(0)
  })
  it('保留单字回答、诗歌小节编号、分隔符及正常的“作为一个”叙述', () => {
    const run = spawnSync(process.execPath, ['--input-type=module', '-e', `
      import { validateTranslation } from './scripts/classics-shared.mjs';
      validateTranslation({paragraphs:[{id:'a',text:'Oui'},{id:'b',text:'1'},{id:'c',text:'*'},{id:'d',text:'As a child, he played.'}]},
        {title:'正文',scene:'孩子在绿树与花朵环绕的院子里面开心玩耍，与故事原文一致。',paragraphs:[{id:'a',zh:'是'},{id:'b',zh:'1'},{id:'c',zh:'*'},{id:'d',zh:'作为一个孩子，他会玩耍。'}]});
    `], { cwd, encoding: 'utf8', timeout: 15_000 })
    expect(run.status, run.stderr).toBe(0)
  })
  it('缺末章时不能把完整的开头当作整本书', () => {
    const { exitCode, report } = check({ missing: true })
    expect(exitCode).toBe(1)
    expect(report.completeBooks).toBe(0)
    expect(report.chapters).toBe(1)
    expect(report.failures[0]?.reason).toBe('translation missing')
  })
  it('来源改变后不能复用旧的审校通过标签', () => {
    const { report } = check({ stale: true })
    expect(report.completeBooks).toBe(0)
    expect(report.chapters).toBe(0)
    expect(report.failures.every(f => f.reason === 'source changed')).toBe(true)
  })
  it('即使段落数相同，正文乱序也拒绝导入', () => {
    const { report } = check({ reversed: true })
    expect(report.completeBooks).toBe(0)
    expect(report.failures.every(f => f.reason === 'Paragraph identity mismatch')).toBe(true)
  })
  it('即使审校标记为通过，也不能把占位内容写进书库', () => {
    const { report } = check({ placeholder: true })
    expect(report.completeBooks).toBe(0)
    expect(report.failures.every(f => f.reason === 'Translation contains placeholder')).toBe(true)
  })
})
