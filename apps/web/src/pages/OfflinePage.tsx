import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listOfflineBooks, removeOfflineBook, type OfflineBook } from '../lib/offline'

export function OfflinePage() {
  const [books, setBooks] = useState<OfflineBook[]>([])
  const [selected, setSelected] = useState<OfflineBook | null>(null)
  const [error, setError] = useState('')
  const load = () => listOfflineBooks().then(setBooks).catch((e: Error) => setError(e.message))
  useEffect(() => { void load() }, [])
  return <div className="app offline-app"><main id="main-content" className="wrap offline-page">
    <span className="mono-label">本机公共书 · 试点</span>
    <h1>离线书架</h1>
    <p className="offline-intro">把喜欢的书留在这台设备上，暂时没有网络，也能接着看。</p>
    <p>本机共享 · 7 天后失效 · 离线进度暂不同步</p>
    <details className="quiet-disclosure"><summary>查看离线范围与限制</summary><p>仅保存主动选择的公共书，不含家庭书和账号记录。最多 5 本，纯文字每本 5 MB，图文与已有朗读每本 100 MB，总计 250 MB。退出账号不会删除公共下载，请用“从本机删除”清理。离线时不能同步下架或家长屏蔽。</p></details>
    <Link className="sticker-btn primary" to="/">联网返回桃阅读</Link>
    {error && <p role="alert">{error}</p>}
    {selected ? <>
      <button className="sticker-btn" onClick={() => setSelected(null)}>回到离线书架</button>
      <h2>{selected.title}</h2><p>{selected.author}</p>
      <p style={{ whiteSpace: 'pre-line' }}>{selected.source}</p><p>保存版本：{selected.contentVersion} · 人工精审可能尚未完成</p>
      <a className="sticker-btn" href="/offline.html">在独立离线阅读器中读图文与播放朗读</a>
      {selected.chapters.map((c, i) => <section key={i}><h3>{c.title}</h3>{c.paragraphs.map((p, j) => <p key={j} style={{ fontSize: 20, lineHeight: 1.9, whiteSpace: 'pre-line' }}>{p}</p>)}</section>)}
    </> : <div className="speech-list">
      {!books.length && <div className="child-empty"><h2>先留一本书在本机</h2><p>联网时打开喜欢的公共书，在“下载与离线阅读”中选择“保存文字到本机”。</p></div>}
      {books.map((b) => <section key={b.id} className="side-card">
        <h2>{b.title}</h2><p>{b.mediaComplete ? '图文与朗读已完整下载' : '已保存文字，图文与朗读未下载'} · {Math.round((b.bytes ?? 0) / 1024)} KB · 有效至 {new Date(b.expiresAt).toLocaleDateString()}</p>
        <button className="sticker-btn" onClick={() => setSelected(b)}>离线阅读</button>
        <button className="sticker-btn" onClick={() => void removeOfflineBook(b.id).then(load).catch((e: Error) => setError(e.message))}>从本机删除</button>
      </section>)}
    </div>}
  </main></div>
}
