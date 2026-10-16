import { useRef, useState } from 'react'
import { API_BASE } from '../lib/api'
import { BookCorrection } from '../components/BookCorrection'
import { OperationsStatus } from '../components/OperationsStatus'
import { UtilityPage } from '../components/UtilityPage'
import { GuidanceEditor } from '../components/GuidanceEditor'
type BookRow = { id: string; title: string; contentVersion: string; reviewStatus: string; publicationStatus: string }
type ReviewBook = { book: BookRow & { chapters: Array<{ order: number; title: string; blocks: Array<{ order: number; text: string; pinyin: string | null; translation: string | null }> }> }; rights: { sourceUrl: string | null; note: string | null } | null; revisions: Array<{ id: string; fromVersion: string; toVersion: string; reviewer: string; reason: string; createdAt: string }>; history: Array<{ id: string; reviewer: string; action: string; createdAt: string }>; auxiliaryFields: Array<{ chapter: number; block: number; missingPinyin: boolean; missingTranslation: boolean }> }
type Feedback = { id: string; bookId: string | null; version: string | null; chapter: number | null; message: string }
export function EditorPage() {
  const [key, setKey] = useState('')
  const identity = useRef(0)
  const selection = useRef(0)
  const [busy, setBusy] = useState(false)
  const operationLock = useRef(false)
  async function runExclusive(action: () => Promise<void>) {
    if (operationLock.current) throw new Error('请等待当前运营操作完成')
    operationLock.current = true
    setBusy(true)
    try { await action() } finally { operationLock.current = false; setBusy(false) }
  }
  function clear(nextKey = '') { identity.current++; selection.current++; setKey(nextKey); setBooks([]); setSelected(null); setFeedback([]); setStatus('') }
  const [books, setBooks] = useState<BookRow[]>([])
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [selected, setSelected] = useState<ReviewBook | null>(null)
  const [reviewer, setReviewer] = useState('')
  const [scope, setScope] = useState('')
  const [source, setSource] = useState('')
  const [notes, setNotes] = useState('')
  const [approved, setApproved] = useState(false)
  const [status, setStatus] = useState('')
  async function operator<T>(path: string, body?: unknown): Promise<T> {
    const epoch = identity.current
    const response = await fetch(`${API_BASE}/api/editor/${path}`, { method: body ? 'PATCH' : 'GET', headers: { 'x-tao-editor-token': key, ...(body ? { 'Content-Type': 'application/json' } : {}) }, body: body ? JSON.stringify(body) : undefined })
    const result = await response.json()
    if (epoch !== identity.current) throw new Error('运营凭据已改变，旧请求结果已忽略')
    if (!response.ok) throw new Error(result.message ?? '运营请求失败')
    return result as T
  }
  async function load() {
    try { const result = await operator<{ books: BookRow[]; feedback: Feedback[] }>('queue'); setBooks(result.books); setFeedback(result.feedback); setStatus('已加载。机器缺口统计仅用于安排复核，不代表已经人工审校。') } catch (err) { setStatus(err instanceof Error ? err.message : '加载失败') }
  }
  async function select(id: string) {
    const epoch = ++selection.current
    try { const book = await operator<ReviewBook>(`books/${encodeURIComponent(id)}`); if (epoch !== selection.current) return; setSelected(book); setSource(book.rights?.sourceUrl ?? ''); setScope(''); setNotes(''); setApproved(false) } catch { setStatus('正文未加载成功，请重试') }
  }
  async function save(publicationStatus: string) {
    if (!selected) return
    const id = selected.book.id
    try {
      await runExclusive(async () => {
        await operator(`books/${encodeURIComponent(id)}`, { version: selected.book.contentVersion, publicationStatus, reviewer, evidence: { approved, source, scope, reviewedOn: new Date().toISOString().slice(0, 10), notes } })
        setStatus('已保存状态与当前版本审校记录。')
        await load(); await select(id)
      })
    } catch (err) { setStatus(err instanceof Error ? err.message : '保存失败') }
  }
  return <UtilityPage className="editor-workbench" title="内容审校工作台" description="仅供内容运营。独立运营凭据只留在当前页面内存，刷新即清除；家庭码无法进入。逐章核查底本、读音与译文，再记录实际审校范围；不要批量勾选通过。"><label>独立运营凭据<input type="password" autoComplete="off" value={key} disabled={busy} onChange={e => clear(e.target.value)} /></label><button className="sticker-btn" disabled={busy} onClick={() => void runExclusive(load).catch(err => setStatus(err.message))}>加载待审队列</button><button className="sticker-btn" disabled={busy} onClick={() => clear()}>退出运营</button>{status && <p role="status">{status}</p>}<OperationsStatus key={key} load={() => operator('operations')} /><details><summary>待处理反馈（{feedback.length}）</summary>{feedback.map(f => <section key={f.id}><p>{f.bookId ?? '功能建议'} · 第 {f.chapter ?? '—'} 章 · {f.version ?? '未指定版本'}</p><p>{f.message}</p><button className="sticker-btn" disabled={busy} onClick={() => { const resolution = window.prompt('填写核查结果及修订版本，不要包含家庭或儿童身份信息'); if (resolution?.trim()) void runExclusive(async () => { await operator(`feedback/${f.id}`, { status: 'resolved', resolution }); await load() }).catch(() => setStatus('处理结果未保存，请重试')) }}>填写处理结果</button></section>)}</details><div className="editor-columns"><aside>{books.map(b => <button className="sentence-choice" key={b.id} disabled={busy} onClick={() => void runExclusive(() => select(b.id)).catch(err => setStatus(err.message))}>{b.title} · {b.reviewStatus === 'reviewed' ? '已留存审校记录' : '待人工复核'} · {b.publicationStatus === 'published' ? '历史已发布' : '未发布'}</button>)}</aside><article>{selected && <><h2>{selected.book.title}</h2><p>版本：{selected.book.contentVersion} · 底本：{selected.rights?.sourceUrl ?? '待补充'} · {selected.rights?.note}</p><p>辅助字段缺口：中文缺拼音 {selected.auxiliaryFields.filter(x => x.missingPinyin).length} 处，缺译文 {selected.auxiliaryFields.filter(x => x.missingTranslation).length} 处。英文不要求中文拼音；可在审校范围说明不适用依据。</p>{selected.book.chapters.map(ch => <details key={ch.order}><summary>第 {ch.order} 章 · {ch.title}</summary>{ch.blocks.map(b => <section key={b.order}><p style={{ whiteSpace: 'pre-line' }}>{b.text}</p>{b.pinyin && <p>{b.pinyin}</p>}{b.translation && <p>{b.translation}</p>}</section>)}</details>)}<fieldset className="reading-options" disabled={busy}><legend>实际人工审校记录</legend><label>审校人<input value={reviewer} maxLength={80} onChange={e => setReviewer(e.target.value)} /></label><label>底本和依据<input value={source} maxLength={500} onChange={e => setSource(e.target.value)} /></label><label>已核查范围<textarea value={scope} maxLength={1000} onChange={e => setScope(e.target.value)} placeholder="逐章写明原文、读音、白话和注释的实际核查范围" /></label><label>修改记录与不适用说明<textarea value={notes} maxLength={2000} onChange={e => setNotes(e.target.value)} /></label><label><input type="checkbox" checked={approved} onChange={e => setApproved(e.target.checked)} />我已对当前版本完成所述人工审校，并明确批准</label></fieldset><div className="hero-actions">{['draft', 'validated', 'reviewed', 'published', 'withdrawn'].map((value, i) => <button className="sticker-btn" key={value} disabled={busy} onClick={() => void save(value)}>{['退回草稿', '标记机器校验', '记录人工审校', '发布', '撤回'][i]}</button>)}</div><BookCorrection key={`${selected.book.id}:${selected.book.contentVersion}`} book={selected.book} reviewer={reviewer} disabled={busy} save={value => runExclusive(async () => { const id = selected.book.id; await operator(`books/${encodeURIComponent(id)}/correction`, value); await load(); await select(id) })} /><GuidanceEditor key={`${selected.book.id}:${selected.book.contentVersion}`} version={selected.book.contentVersion} reviewer={reviewer} disabled={busy} save={value => runExclusive(async () => { const id = selected.book.id; await operator(`books/${encodeURIComponent(id)}/guidance`, value); await load(); await select(id) })} /><button className="sticker-btn" disabled={busy || !selected.history.length || reviewer.trim().length < 2} onClick={() => { if (window.confirm('撤销最近一次状态或阅读建议操作？正文不变，旧版本和后续已变化状态不能撤销。')) void runExclusive(async () => { const id = selected.book.id; await operator(`books/${encodeURIComponent(id)}/rollback`, { eventId: selected.history[0]!.id, reviewer }); await select(id); await load() }).catch(err => setStatus(err instanceof Error ? err.message : '撤销失败')) }}>撤销最近一次操作</button><details><summary>正文修订历史</summary>{selected.revisions.map((revision, index) => <section key={revision.id}><p>{revision.createdAt} · {revision.reviewer} · {revision.reason}</p><p>{revision.fromVersion} → {revision.toVersion}</p>{index === 0 && revision.toVersion === selected.book.contentVersion && <button className="sticker-btn" disabled={busy || reviewer.trim().length < 2} onClick={() => { const reason = window.prompt('恢复最近一次修订前的正文并退回草稿，请填写原因'); if (!reason || reason.trim().length < 3) return; const id = selected.book.id; void runExclusive(async () => { await operator(`books/${encodeURIComponent(id)}/restore-text`, { version: selected.book.contentVersion, revisionId: revision.id, reviewer, reason }); await select(id); await load() }).catch(err => setStatus(err instanceof Error ? err.message : '恢复失败')) }}>恢复修订前正文</button>}</section>)}</details><details><summary>状态变更历史</summary>{selected.history.map(event => <p key={event.id}>{event.createdAt} · {event.reviewer} · {event.action}</p>)}</details></>}</article></div></UtilityPage>
}
