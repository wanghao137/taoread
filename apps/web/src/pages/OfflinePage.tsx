import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listOfflineBooks, removeOfflineBook, type OfflineBook } from '../lib/offline'

export function OfflinePage() {
  const [books, setBooks] = useState<OfflineBook[]>([])
  const [selected, setSelected] = useState<OfflineBook | null>(null)
  const [error, setError] = useState('')
  const load = () => listOfflineBooks().then(setBooks).catch((e: Error) => setError(e.message))
  useEffect(() => { void load() }, [])
  return <main id="main-content" className="wrap" style={{ maxWidth: 760, padding: 24 }}>
    <h1>公共书离线书架 · 试点</h1>
    <p>仅保存主动选择的公共书，本机共享、不含家庭书和账号记录。最多 5 本，纯文字每本 5 MB，图文与已有朗读每本 100 MB，总计 250 MB，7 天后失效。退出账号不会删除公共下载，请用“从本机删除”清理。离线时不能同步下架或家长屏蔽。</p>
    <Link to="/">返回桃阅读</Link>
    {error && <p role="alert">{error}</p>}
    {selected ? <>
      <button className="sticker-btn" onClick={() => setSelected(null)}>回到离线书架</button>
      <h2>{selected.title}</h2><p>{selected.author}</p>
      <p style={{ whiteSpace: 'pre-line' }}>{selected.source}</p><p>保存版本：{selected.contentVersion} · 人工精审可能尚未完成</p>
      <a className="sticker-btn" href="/offline.html">在独立离线阅读器中读图文与播放朗读</a>
      {selected.chapters.map((c, i) => <section key={i}><h3>{c.title}</h3>{c.paragraphs.map((p, j) => <p key={j} style={{ fontSize: 20, lineHeight: 1.9, whiteSpace: 'pre-line' }}>{p}</p>)}</section>)}
    </> : <div className="speech-list">
      {!books.length && <p>暂无离线书。联网时在公共书详情页选择“保存文字到本机”。</p>}
      {books.map((b) => <section key={b.id} className="side-card">
        <h2>{b.title}</h2><p>{b.mediaComplete ? '图文与朗读已完整下载' : '已保存文字，图文与朗读未下载'} · {Math.round((b.bytes ?? 0) / 1024)} KB · 有效至 {new Date(b.expiresAt).toLocaleDateString()}</p>
        <button className="sticker-btn" onClick={() => setSelected(b)}>离线阅读</button>
        <button className="sticker-btn" onClick={() => void removeOfflineBook(b.id).then(load).catch((e: Error) => setError(e.message))}>从本机删除</button>
      </section>)}
    </div>}
  </main>
}
