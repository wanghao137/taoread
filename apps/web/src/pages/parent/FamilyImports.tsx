import { useCallback, useEffect, useRef, useState } from 'react'
import { api, ApiError, type ImportedBookDto, type PhonicsSummaryDto, type ImportPreviewDto } from '../../lib/api'
import { useSession } from '../../stores/session'
import type { ChildDto } from '../../lib/api'
import { ParentPhonicsV2 } from './ParentPhonicsV2'

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
  const familyId = useSession(s => s.familyId)
  const uploadKey = `taoread-upload:${familyId}`
  const abort = useRef<AbortController | null>(null)
  const activeSession = useRef<string | null>(null)
  const uploadEpoch = useRef(0)
  const [saving, setSaving] = useState(false)
  const [preview, setPreview] = useState<ImportPreviewDto | null>(null)
  const [reparsePreview, setReparsePreview] = useState<{ book: ImportedBookDto; data: Awaited<ReturnType<typeof api.previewImportedRefresh>> } | null>(null)
  const prepared = useRef<{ sessionId?: string; body?: Parameters<typeof api.importTextBook>[1] } | null>(null)
  useEffect(() => { const epoch = uploadEpoch; return () => { epoch.current++; abort.current?.abort() } }, [token])
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
    const epoch = ++uploadEpoch.current
    const controller = new AbortController()
    abort.current = controller
    const checkActive = () => { if (epoch !== uploadEpoch.current || controller.signal.aborted) throw new ApiError(0, 'CANCELLED', '已暂停，本次预览尚未加入书架。') }
    try {
      const bytes = new Uint8Array(await file.arrayBuffer())
      checkActive()
      const isText = /\.txt$/i.test(file.name)
      if (isText) {
        const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes)
        const body = { title, author, lang, ageStage, sourceName: file.name, text, rightsConfirmed: true as const }
        const p = await api.previewImport(token, body)
        checkActive()
        prepared.current = { body }; setPreview(p); setMessage('请检查解析预览，再确认加入书架。'); return
      } else {
        // 大文件走分块：家庭上行实测低至 ~13KB/s，256KB 一块（约 26s）独立重试，
        // 会话被服务端清掉（404）就重开会话从头传
        const CHUNK_BYTES = 256 * 1024
        const meta = { title, author: author || undefined, lang, ageStage, sourceName: file.name, totalBytes: bytes.length, totalChunks: Math.ceil(bytes.length / CHUNK_BYTES), rightsConfirmed: true as const }
        const hash = [...new Uint8Array(await crypto.subtle.digest('SHA-256', bytes))].map(x => x.toString(16).padStart(2, '0')).join('')
        const fingerprint = `${file.name}:${hash}`
        checkActive()
        let sessionId = ''
        let received: number[] = []
        try {
          const saved = JSON.parse(localStorage.getItem(uploadKey) ?? 'null') as { fingerprint: string; sessionId: string } | null
          if (saved?.fingerprint === fingerprint) {
            const status = await api.importChunkStatus(token, saved.sessionId)
            checkActive()
            if (status.result) { setMessage(`已加入书架，共 ${status.result.chapterCount} 章`); localStorage.removeItem(uploadKey); await refresh(); return }
            sessionId = saved.sessionId; received = status.received
            setTitle(status.meta.title); setAuthor(status.meta.author ?? ''); setLang(status.meta.lang); setAgeStage(status.meta.ageStage)
          }
        } catch (err) { if (epoch !== uploadEpoch.current || controller.signal.aborted) throw err; /* Expired upload: start a new bounded session. */ }
        if (!sessionId) {
          sessionId = (await api.initChunkedImport(token, meta)).sessionId
          if (epoch !== uploadEpoch.current || controller.signal.aborted) { void api.cancelImport(token, sessionId).catch(() => undefined); checkActive() }
        }
        checkActive()
        activeSession.current = sessionId
        localStorage.setItem(uploadKey, JSON.stringify({ fingerprint, sessionId }))
        let fails = 0
        let restarts = 0
        for (let index = 0; index < meta.totalChunks;) {
          checkActive()
          if (received.includes(index)) { index++; continue }
          setMessage(`正在上传 ${index + 1}/${meta.totalChunks}…`)
          const data = toBase64(bytes.subarray(index * CHUNK_BYTES, Math.min((index + 1) * CHUNK_BYTES, bytes.length)))
          try {
            await api.uploadImportChunk(token, sessionId, index, data, controller.signal)
            fails = 0
            index++
          } catch (err) {
            if (err instanceof ApiError && err.code === 'CANCELLED') throw err
            if (err instanceof ApiError && err.status === 404 && ++restarts <= 2) { sessionId = (await api.initChunkedImport(token, meta)).sessionId; if (epoch !== uploadEpoch.current || controller.signal.aborted) { void api.cancelImport(token, sessionId).catch(() => undefined); checkActive() } activeSession.current = sessionId; localStorage.setItem(uploadKey, JSON.stringify({ fingerprint, sessionId })); received = []; index = 0; continue }
            if (++fails > 3) throw err
            await new Promise((resolve) => setTimeout(resolve, 1000 * fails))
          }
        }
        setMessage('正在准备解析预览…')
        const p = await api.previewChunks(token, sessionId)
        checkActive()
        prepared.current = { sessionId }; setPreview(p); setMessage('请检查解析预览，再确认加入书架。'); return
      }
    } catch (err) { if (epoch === uploadEpoch.current) setMessage(err instanceof ApiError ? err.message : err instanceof TypeError ? '文件不是有效的 UTF-8 文本' : '导入失败') }
    finally { if (epoch === uploadEpoch.current) setBusy(false) }
  }
  async function confirmImport() {
    if (!prepared.current) return
    setBusy(true); setSaving(true)
    try {
      const r = prepared.current.sessionId ? await api.completeChunkedImport(token, prepared.current.sessionId) : await api.importTextBook(token, prepared.current.body!)
      setMessage(r.duplicate ? '这本书已经在书架中' : `已加入 ${r.chapterCount} 章`)
      localStorage.removeItem(uploadKey); activeSession.current = null; prepared.current = null; setPreview(null); setFile(null); setConfirmed(false); await refresh()
    } catch (err) { setMessage(err instanceof Error ? err.message : '保存失败，可重新确认') }
    finally { setBusy(false); setSaving(false) }
  }
  async function cancel() {
    if (saving) { setMessage('正在保存，请等待结果。保存后可在书架删除书目。'); return }
    uploadEpoch.current++
    abort.current?.abort()
    try {
      if (activeSession.current) await api.cancelImport(token, activeSession.current)
      localStorage.removeItem(uploadKey); activeSession.current = null; prepared.current = null; setPreview(null); setMessage('已取消上传；没有加入新书。')
    } catch (err) { setMessage(err instanceof Error ? err.message : '取消未确认，请重试') }
    finally { setBusy(false) }
  }
  async function remove(book: ImportedBookDto) {
    if (!window.confirm(`删除《${book.title}》及全部章节？`)) return
    try { await api.removeImportedBook(token, book.id); await refresh() } catch (err) { setMessage(err instanceof Error ? err.message : '删除失败') }
  }
  // docs/34 P0-9：EPUB 重新解析（服务端 refresh 端点此前无 UI 入口）——
  // 管线升级后用归档原文按当前管线重建章节与插图
  async function reparse(book: ImportedBookDto) {
    setBusy(true); setMessage('正在生成重解析预览；现有正文保持可读…')
    try { const data = await api.previewImportedRefresh(token, book.id); setReparsePreview({ book, data }); setMessage('请确认目录及进度影响，再保存新版本。') } catch (err) { setMessage(err instanceof Error ? err.message : '预览失败，旧正文仍保留') }
    finally { setBusy(false) }
  }
  async function confirmReparse() {
    if (!reparsePreview || busy) return
    setBusy(true); setSaving(true)
    try { const r = await api.refreshImportedBook(token, reparsePreview.book.id, reparsePreview.data); setReparsePreview(null); setMessage(`已保存第 ${r.contentVersion} 版，共 ${r.chapterCount} 章；旧版本可从历史恢复。`); await refresh() } catch (err) { setMessage(err instanceof Error ? err.message : '重解析未保存，旧正文仍保留') }
    finally { setBusy(false); setSaving(false) }
  }
  async function restoreRevision(book: ImportedBookDto) {
    setBusy(true)
    try {
      const [current, history] = await Promise.all([api.importedBook(token, book.id), api.importedRevisions(token, book.id)])
      if (!history.revisions.length) { setMessage('尚未重新解析，没有历史版本。'); return }
      const input = window.prompt(`可恢复的版本：${history.revisions.map(r => r.version).join('、')}。请输入版本号；会生成新版本并重新定位进度。`)
      if (input === null) return
      const version = Number(input)
      if (!history.revisions.some(r => r.version === version)) { setMessage('请选择列出的有效版本。'); return }
      const result = await api.restoreImportedRevision(token, book.id, version, current.book.contentVersion ?? 1)
      setMessage(`已恢复历史正文并保存为第 ${result.contentVersion} 版，请检查阅读位置。`); await refresh()
    } catch (err) { setMessage(err instanceof Error ? err.message : '恢复未成功，现有正文仍保留') }
    finally { setBusy(false) }
  }
  return <section className="panel fam-imports" style={{ marginTop: 16 }}>
    <h3>上传家庭书</h3>
    <p className="fam-hint">支持你有权供家庭阅读的 UTF-8 TXT、文本型 EPUB/PDF（EPUB 最多 32 MB、TXT/PDF 最多 4 MB；扫描 PDF 需先 OCR）。书籍只在本家庭可见，按孩子年龄段展示在孩子的「家庭书架」里。</p>
    <form onSubmit={(event) => void upload(event)} className="fam-form">
      <fieldset disabled={busy || Boolean(preview)} style={{ border: 0, padding: 0, margin: 0 }}>
      <label className="fam-field">
        <span>书名</span>
        <input required maxLength={120} value={title} onChange={(event) => setTitle(event.target.value)} />
      </label>
      <div className="fam-row">
        <label className="fam-field">
          <span>作者（可选）</span>
          <input maxLength={100} value={author} onChange={(event) => setAuthor(event.target.value)} />
        </label>
        <label className="fam-field">
          <span>语言</span>
          <select value={lang} onChange={(event) => setLang(event.target.value as 'zh' | 'en')}><option value="zh">中文</option><option value="en">英文</option></select>
        </label>
        <label className="fam-field">
          <span>适龄</span>
          <select value={ageStage} onChange={(event) => setAgeStage(event.target.value as '3-5' | '6-8' | '9-12')}><option>3-5</option><option>6-8</option><option>9-12</option></select>
        </label>
      </div>
      <label className="fam-field">
        <span>选择电子书</span>
        <input
          required
          type="file"
          accept=".txt,.epub,.pdf,text/plain,application/epub+zip,application/pdf"
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
        />
      </label>
      <label className="fam-rights">
        <input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} />
        <span>我确认拥有这份文本的家庭阅读使用权</span>
      </label>
      {file && file.size > 8 * 1024 * 1024 && <p className="fam-warn">这本书比较大，上传需要几分钟，请保持页面打开，点一次就好。</p>}
      </fieldset>
      <p>暂停后重新选择同一文件可继续；上传会话保存 2 小时，服务重启会清除未完成会话。预览尚未加入书架，资料需要修改时请取消后重新上传。</p>
      <button className="sticker-btn primary" type="submit" disabled={busy || !file || !confirmed || Boolean(preview)}>{busy ? '正在处理…' : '上传并预览'}</button>
      {busy && !saving && <button type="button" className="sticker-btn" onClick={() => abort.current?.abort()}>暂停上传</button>}
      {(busy || preview) && <button type="button" className="sticker-btn" disabled={saving} onClick={() => void cancel()}>取消这次上传</button>}
    </form>
    {preview && <div className="panel" aria-label="解析预览"><h4>解析到 {preview.chapterCount} 章</h4>{preview.warning && <p>{preview.warning}</p>}{preview.chapters.map((ch, i) => <div key={i}><b>{ch.title}</b><p>{ch.excerpt}</p></div>)}<p>仅预览前 10 章。确认正文与分章正确后加入家庭书架。</p><button className="sticker-btn primary" disabled={busy} onClick={() => void confirmImport()}>确认加入书架</button></div>}
    {message && <p role="status" className="fam-msg">{message}</p>}
    {reparsePreview && <section className="panel" aria-label="重解析预览"><h4>《{reparsePreview.book.title}》重解析预览</h4><p>现有第 {reparsePreview.data.baseVersion} 版：{reparsePreview.data.previousChapterCount} 章 → {reparsePreview.data.chapterCount} 章。{reparsePreview.data.relocationRequired} 条进度无法唯一定位，需要孩子重新选择起点。</p>{reparsePreview.data.chapters.map((ch, i) => <section key={i}><b>{ch.title}</b><p>{ch.excerpt}</p></section>)}<p>仅预览前 10 章。保存后旧正文留在版本历史；未成功不会替换现有正文。</p><button className="sticker-btn primary" disabled={busy} onClick={() => void confirmReparse()}>确认保存新版本</button><button className="sticker-btn" disabled={busy} onClick={() => setReparsePreview(null)}>保留现有版本</button></section>}
    {books.length > 0 && (
      <div className="fam-books">
        <h4>已上传的书（{books.length}）</h4>
        <div className="fam-book-grid">
          {books.map((book) => (
            <div className="fam-book" key={book.id}>
              {book.coverUrl
                ? <img src={book.coverUrl} alt="" loading="lazy" />
                : <span className="fam-book-fallback">{book.title.slice(0, 1)}</span>}
              <div className="fam-book-body">
                <b>{book.title}</b>
                <span className="mono-line">{book.author ?? '作者未标注'} · {book.ageStage} · {book.chapterCount} 章</span>
                <div className="fam-book-actions">
                  {(book.format ?? '').toLowerCase() === 'epub' && (
                    <button type="button" className="sticker-btn sm" disabled={busy} onClick={() => void reparse(book)}>预览重新解析</button>
                  )}
                  <button type="button" className="sticker-btn sm" disabled={busy} onClick={() => void restoreRevision(book)}>恢复历史正文</button>
                  <button type="button" className="sticker-btn sm hot" disabled={busy} onClick={() => void remove(book)}>删除</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
    <div className="fam-pd">
      <h4>公版书源</h4>
      <p className="mono-line" style={{ fontSize: 12 }}>从 Project Gutenberg 下载已核对的原始英文经典文学；并非自然拼读分级读物。</p>
      {publicBooks.length === 0 ? <p className="mono-line">暂无可导入的公版书。</p> : publicBooks.map((book) => (
        <div className="fam-pd-row" key={book.id}>
          <span><b>{book.title}</b> · {book.author}</span>
          <button type="button" className="sticker-btn sm" disabled={busy} onClick={() => void addPublic(book.id)}>导入家庭书架</button>
        </div>
      ))}
    </div>
  </section>
}

export function ParentPhonics({ token, children }: { token: string; children: ChildDto[] }) {
  return <><ParentPhonicsV2 token={token} children={children} /><details className="panel" style={{ marginTop: 16 }}><summary>旧版内测草稿设置</summary><LegacyParentPhonics token={token} children={children} /></details></>
}

function LegacyParentPhonics({ token, children }: { token: string; children: ChildDto[] }) {
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

