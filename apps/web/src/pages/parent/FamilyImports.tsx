import { useCallback, useEffect, useState } from 'react'
import { api, ApiError, type ImportedBookDto, type PhonicsSummaryDto } from '../../lib/api'
import type { ChildDto } from '../../lib/api'

const MAX_EPUB_SIZE = 32 * 1024 * 1024
const MAX_OTHER_SIZE = 4 * 1024 * 1024

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
  function toBase64(bytes: Uint8Array): string { let binary = ''; for (let i = 0; i < bytes.length; i += 8192) binary += String.fromCharCode(...bytes.subarray(i, i + 8192)); return btoa(binary) }
  async function upload(event: React.FormEvent) {
    event.preventDefault()
    if (!file || !confirmed) return
    const isEpub = /\.epub$/i.test(file.name)
    if (file.size > (isEpub ? MAX_EPUB_SIZE : MAX_OTHER_SIZE)) { setMessage(isEpub ? 'EPUB 不能超过 32 MB' : '文件不能超过 4 MB'); return }
    setBusy(true)
    try {
      const bytes = new Uint8Array(await file.arrayBuffer())
      const isText = /\.txt$/i.test(file.name)
      let result: { id: string; duplicate: boolean; chapterCount: number }
      if (isText) {
        const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes)
        result = await api.importTextBook(token, { title, author, lang, ageStage, sourceName: file.name, text, rightsConfirmed: true })
      } else if (bytes.length > 4 * 1024 * 1024) {
        // 大文件走分块：家庭上行实测低至 ~13KB/s，256KB 一块（约 26s）独立重试，
        // 会话被服务端清掉（404）就重开会话从头传
        const CHUNK_BYTES = 256 * 1024
        const meta = { title, author: author || undefined, lang, ageStage, sourceName: file.name, totalBytes: bytes.length, totalChunks: Math.ceil(bytes.length / CHUNK_BYTES), rightsConfirmed: true as const }
        let sessionId = (await api.initChunkedImport(token, meta)).sessionId
        let fails = 0
        for (let index = 0; index < meta.totalChunks;) {
          setMessage(`正在上传 ${index + 1}/${meta.totalChunks}…`)
          const data = toBase64(bytes.subarray(index * CHUNK_BYTES, Math.min((index + 1) * CHUNK_BYTES, bytes.length)))
          try {
            await api.uploadImportChunk(token, sessionId, index, data)
            fails = 0
            index++
          } catch (err) {
            if (err instanceof ApiError && err.status === 404) { sessionId = (await api.initChunkedImport(token, meta)).sessionId; index = 0; continue }
            if (++fails > 3) throw err
            await new Promise((resolve) => setTimeout(resolve, 1000 * fails))
          }
        }
        setMessage('正在解析入库…')
        result = await api.completeChunkedImport(token, sessionId)
      } else {
        result = await api.importTextBook(token, { title, author, lang, ageStage, sourceName: file.name, fileBase64: toBase64(bytes), rightsConfirmed: true })
      }
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
  // docs/34 P0-9：EPUB 重新解析（服务端 refresh 端点此前无 UI 入口）——
  // 管线升级后用归档原文按当前管线重建章节与插图
  async function reparse(book: ImportedBookDto) {
    if (!window.confirm(`按当前管线重新解析《${book.title}》？章节与插图会重建。`)) return
    setMessage('正在重新解析…')
    try { const r = await api.refreshImportedBook(token, book.id); setMessage(`已重建 ${r.chapterCount} 章`); await refresh() } catch (err) { setMessage(err instanceof Error ? err.message : '重新解析失败') }
  }
  return <section className="panel" style={{ marginTop: 16 }}>
    <h3>家庭私有电子书</h3>
    <p>支持你有权供家庭阅读的 UTF-8 TXT、文本型 EPUB/PDF（EPUB 最多 32 MB、TXT/PDF 最多 4 MB；扫描 PDF 需先 OCR）。书籍只在本家庭可见；按孩子年龄段展示。</p>
    <form onSubmit={(event) => void upload(event)} style={{ display: 'grid', gap: 12 }}>
      <label>书名 <input required maxLength={120} value={title} onChange={(event) => setTitle(event.target.value)} /></label>
      <label>作者 <input maxLength={100} value={author} onChange={(event) => setAuthor(event.target.value)} /></label>
      <label>语言 <select value={lang} onChange={(event) => setLang(event.target.value as 'zh' | 'en')}><option value="zh">中文</option><option value="en">英文</option></select></label>
      <label>适龄 <select value={ageStage} onChange={(event) => setAgeStage(event.target.value as '3-5' | '6-8' | '9-12')}><option>3-5</option><option>6-8</option><option>9-12</option></select></label>
      <label>选择电子书 <input required type="file" accept=".txt,.epub,.pdf,text/plain,application/epub+zip,application/pdf" onChange={(event) => setFile(event.target.files?.[0] ?? null)} /></label>
      <label><input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} /> 我确认拥有这份文本的家庭阅读使用权</label>
      {file && file.size > 8 * 1024 * 1024 && <p style={{ fontSize: 12, margin: 0, color: '#795548' }}>这本书比较大，上传需要几分钟，请保持页面打开，点一次就好。</p>}
      <button className="sticker-btn primary" type="submit" disabled={busy || !file || !confirmed}>{busy ? '正在导入…' : '导入家庭书架'}</button>
    </form>
    <div><h4>公版书源</h4><p>从 Project Gutenberg 下载已核对的原始英文经典文学；并非自然拼读分级读物。</p>{publicBooks.map((book) => <p key={book.id}>{book.title} · {book.author} <button type="button" disabled={busy} onClick={() => void addPublic(book.id)}>导入家庭书架</button></p>)}</div>
    {message && <p role="status">{message}</p>}
    <ul>{books.map((book) => <li key={book.id}>{book.title} · {book.ageStage} · {book.chapterCount} 章 {(book.format ?? '').toLowerCase() === 'epub' ? <button type="button" onClick={() => void reparse(book)}>重新解析</button> : null} <button type="button" onClick={() => void remove(book)}>删除</button></li>)}</ul>
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

