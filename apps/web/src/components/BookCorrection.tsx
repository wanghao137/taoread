import { useState } from 'react'
type Book = { id: string; contentVersion: string; chapters: Array<{ order: number; title: string; blocks: Array<{ order: number; text: string; pinyin: string | null; translation: string | null }> }> }
export function BookCorrection({ book, reviewer, save, disabled = false }: { book: Book; reviewer: string; disabled?: boolean; save: (value: unknown) => Promise<void> }) {
  const [chapter, setChapter] = useState(book.chapters[0]?.order ?? 1)
  const [block, setBlock] = useState(book.chapters[0]?.blocks[0]?.order ?? 1)
  const [draft, setDraft] = useState<{ text: string; pinyin: string; translation: string } | null>(null)
  const [reason, setReason] = useState('')
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)
  const ch = book.chapters.find(x => x.order === chapter)
  const selected = ch?.blocks.find(x => x.order === block)
  const value = draft ?? { text: selected?.text ?? '', pinyin: selected?.pinyin ?? '', translation: selected?.translation ?? '' }
  return <details><summary>修订原文、拼音或白话</summary><p>保存会生成新正文版本并撤回到草稿，清除此前审校批准和阅读建议。重新核查后再发布；旧正文保留在修订历史，可恢复。</p><fieldset className="reading-options" disabled={busy || disabled}><label>章节<select value={chapter} onChange={e => { const order = Number(e.target.value); setChapter(order); setBlock(book.chapters.find(x => x.order === order)?.blocks[0]?.order ?? 1); setDraft(null) }}>{book.chapters.map(x => <option key={x.order} value={x.order}>{x.order}. {x.title}</option>)}</select></label><label>文字块<select value={block} onChange={e => { setBlock(Number(e.target.value)); setDraft(null) }}>{ch?.blocks.map(x => <option key={x.order} value={x.order}>{x.order}. {x.text.slice(0, 24)}</option>)}</select></label>{(['text', 'pinyin', 'translation'] as const).map((name, i) => <label key={name}>{['原文', '逐字拼音（可留空）', '白话或注释（可留空）'][i]}<textarea value={value[name]} maxLength={100000} onChange={e => setDraft({ ...value, [name]: e.target.value })} /></label>)}<label>修改依据与原因<textarea value={reason} maxLength={1000} onChange={e => setReason(e.target.value)} /></label><button className="sticker-btn" disabled={reviewer.trim().length < 2 || reason.trim().length < 3 || !selected} onClick={() => { if (!window.confirm('保存修订并将此书退回草稿？线上读者将暂时无法打开，需重新审校发布。')) return; setBusy(true); void save({ version: book.contentVersion, reviewer, reason, chapter, block, text: value.text, pinyin: value.pinyin || null, translation: value.translation || null }).then(() => setStatus('修订已保存，等待重新审校')).catch(err => setStatus(err instanceof Error ? err.message : '修订未保存')).finally(() => setBusy(false)) }}>保存修订并退回草稿</button></fieldset><p role="status">{status}</p></details>
}
