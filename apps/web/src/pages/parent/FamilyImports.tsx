import { useCallback, useEffect, useState } from 'react'
import { api, ApiError, type ImportedBookDto, type PhonicsSummaryDto } from '../../lib/api'
import type { ChildDto } from '../../lib/api'

const MAX_SIZE = 8 * 1024 * 1024

export function FamilyImports({ token }: { token: string }) {
  const [books, setBooks] = useState<ImportedBookDto[]>([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [lang, setLang] = useState<'zh' | 'en'>('zh')
  const [ageStage, setAgeStage] = useState<'3-5' | '6-8' | '9-12'>('6-8')
  const [file, setFile] = useState<File | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [publicBooks, setPublicBooks] = useState<Array<{ id: string; title: string; author: string }>>([])
  useEffect(() => { void api.publicDomainBooks(token).then((result) => setPublicBooks(result.books)).catch(() => {}) }, [token])
  const refresh = useCallback(() => api.importedBooks(token).then((res) => setBooks(res.books)).catch((err: unknown) => setMessage(err instanceof Error ? err.message : '书架加载失败')), [token])
  useEffect(() => { void refresh() }, [refresh])
  async function addPublic(id: string) { setBusy(true); setMessage(''); try { const result = await api.importPublicDomain(token, id, ageStage === '3-5' ? '6-8' : ageStage); setMessage(result.duplicate ? '这本书已在家庭书架' : `已导入 ${result.chapterCount} 章`); await refresh() } catch (err) { setMessage(err instanceof Error ? err.message : '公版书源暂不可用') } finally { setBusy(false) } }
  async function upload(event: React.FormEvent) {
    event.preventDefault()
    if (!file || !confirmed) return
    if (file.size > MAX_SIZE) { setMessage('文件不能超过 8 MB'); return }
    setBusy(true); setMessage('')
    try {
      const bytes = new Uint8Array(await file.arrayBuffer())
      const isText = /\.txt$/i.test(file.name)
      const text = isText ? new TextDecoder('utf-8', { fatal: true }).decode(bytes) : undefined
      let fileBase64: string | undefined
      if (!isText) { let binary = ''; for (let i = 0; i < bytes.length; i += 8192) binary += String.fromCharCode(...bytes.subarray(i, i + 8192)); fileBase64 = btoa(binary) }
      const result = await api.importTextBook(token, { title, author, lang, ageStage, sourceName: file.name, text, fileBase64, rightsConfirmed: true })
      setMessage(result.duplicate ? '这本书已经导入过' : `已导入 ${result.chapterCount} 章`)
      setFile(null); setConfirmed(false)
      await refresh()
    } catch (err) { setMessage(err instanceof ApiError ? err.message : err instanceof TypeError ? '文件不是有效的 UTF-8 文本' : '导入失败') }
    finally { setBusy(false) }
  }
  async function remove(book: ImportedBookDto) {
    if (!window.confirm(`删除《${book.title}》及全部章节？`)) return
    try { await api.removeImportedBook(token, book.id); await refresh() } catch (err) { setMessage(err instanceof Error ? err.message : '删除失败') }
  }
  return <section className="panel" style={{ marginTop: 16 }}>
    <h3>家庭私有电子书</h3>
    <p>支持你有权供家庭阅读的 UTF-8 TXT、文本型 EPUB/PDF（EPUB 最多 8 MB、PDF 最多 4 MB；扫描 PDF 需先 OCR）。书籍只在本家庭可见；按孩子年龄段展示。</p>
    <form onSubmit={(event) => void upload(event)} style={{ display: 'grid', gap: 12 }}>
      <label>书名 <input required maxLength={120} value={title} onChange={(event) => setTitle(event.target.value)} /></label>
      <label>作者 <input maxLength={100} value={author} onChange={(event) => setAuthor(event.target.value)} /></label>
      <label>语言 <select value={lang} onChange={(event) => setLang(event.target.value as 'zh' | 'en')}><option value="zh">中文</option><option value="en">英文</option></select></label>
      <label>适龄 <select value={ageStage} onChange={(event) => setAgeStage(event.target.value as '3-5' | '6-8' | '9-12')}><option>3-5</option><option>6-8</option><option>9-12</option></select></label>
      <label>选择电子书 <input required type="file" accept=".txt,.epub,.pdf,text/plain,application/epub+zip,application/pdf" onChange={(event) => setFile(event.target.files?.[0] ?? null)} /></label>
      <label><input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} /> 我确认拥有这份文本的家庭阅读使用权</label>
      <button className="sticker-btn primary" type="submit" disabled={busy || !file || !confirmed}>{busy ? '正在导入…' : '导入家庭书架'}</button>
    </form>
    <div><h4>公版书源</h4><p>从 Project Gutenberg 下载已核对的原始英文经典文学；并非自然拼读分级读物。</p>{publicBooks.map((book) => <p key={book.id}>{book.title} · {book.author} <button type="button" disabled={busy} onClick={() => void addPublic(book.id)}>导入家庭书架</button></p>)}</div>
    {message && <p role="status">{message}</p>}
    <ul>{books.map((book) => <li key={book.id}>{book.title} · {book.ageStage} · {book.chapterCount} 章 <button type="button" onClick={() => void remove(book)}>删除</button></li>)}</ul>
  </section>
}

export function ParentPhonics({ token, children }: { token: string; children: ChildDto[] }) {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({})
  const [summaries, setSummaries] = useState<Record<string, PhonicsSummaryDto>>({})
  const [message, setMessage] = useState('')
  useEffect(() => { let live = true; void Promise.all(children.map((child) => api.phonicsEnrollment(token, child.id).then((state) => [child.id, state.enabled] as const))).then((rows) => { if (live) setEnabled(Object.fromEntries(rows)) }).catch((err: unknown) => { if (live) setMessage(err instanceof Error ? err.message : '状态获取失败') }); return () => { live = false } }, [token, children])
  useEffect(() => { if (!children.length) return; let live = true; void Promise.all(children.map((child) => api.phonicsSummary(token, child.id).then((summary) => [child.id, summary] as const).catch(() => [child.id, null] as const))).then((rows) => { if (live) setSummaries(Object.fromEntries(rows.filter((row) => row[1])) as Record<string, PhonicsSummaryDto>) }); return () => { live = false } }, [token, children])
  return <section className="panel" style={{ marginTop: 16 }}><h3>英语自然拼读 · 内测草稿</h3><p>8 课字形与合成/分音练习草稿（GB 口音顺序）；音素音频与教学审校还没完成，正式课程发布前保持草稿与默认关闭。这里的记录只是练习次数，不代表拼读能力评估。</p>
    {children.map((child) => {
      const summary = summaries[child.id]
      const finished = summary?.attempts.filter((attempt) => attempt.status === 'completed').length ?? 0
      const paused = summary?.attempts.filter((attempt) => attempt.status === 'paused').length ?? 0
      return (
        <div key={child.id} style={{ margin: 8 }}>
          <label style={{ display: 'block' }}>
            <input type="checkbox" checked={enabled[child.id] ?? false} onChange={(event) => { const next = event.target.checked; void api.setPhonicsEnrollment(token, child.id, next).then(() => setEnabled((old) => ({ ...old, [child.id]: next }))).catch((err: unknown) => setMessage(err instanceof Error ? err.message : '设置失败')) }} /> {child.nickname}：允许查看内测试题
          </label>
          {summary ? (
            <p className="mono-line" style={{ fontSize: 12, margin: '4px 0 0 24px' }} data-testid={`phonics-summary-${child.id}`}>
              练过 {summary.attempts.length} 次（完成 {finished} · 暂停 {paused}）{summary.attempts[0] ? ` · 最近：${summary.attempts[0].lessonId.replace(/^draft-en-l0?/, '第')}课` : ''}
            </p>
          ) : null}
        </div>
      )
    })}
    {message && <p role="status">{message}</p>}
  </section>
}

