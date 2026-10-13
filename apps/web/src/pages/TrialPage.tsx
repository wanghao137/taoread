import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { request } from '../lib/api'
import { PoemRuby } from '../components/art/PoemRuby'
type TrialBook = { id: string; title: string; author: string | null; source: string; reviewStatus: string; chapters: Array<{ title: string; blocks: Array<{ text: string; pinyin: string | null; translation: string | null; kind: string }> }> }
export function TrialPage() {
  const [books, setBooks] = useState<TrialBook[]>([])
  const [selected, setSelected] = useState(0)
  const [error, setError] = useState('')
  const [retry, setRetry] = useState(0)
  const [font, setFont] = useState(22)
  const [pinyin, setPinyin] = useState(true)
  const [translation, setTranslation] = useState(false)
  useEffect(() => { let live = true; void request<{ books: TrialBook[] }>('/api/content/trial', { token: null }).then(x => { if (live) { setBooks(x.books); setError('') } }).catch(() => { if (live) setError('试读暂未加载，请重试') }); return () => { live = false } }, [retry])
  const book = books[selected]
  return <main id="main-content" className="wrap trial-reader"><h1>先读一小段</h1><p>不需要家庭码。这里是公共书试读，不保存孩子档案、阅读进度或练习结果。</p><div className="setting-row">{books.map((b, i) => <button key={b.id} className="sticker-btn" aria-pressed={i === selected} onClick={() => setSelected(i)}>{b.title}</button>)}</div>{error && <p role="alert">{error}<button className="sticker-btn" onClick={() => setRetry(x => x + 1)}>重试</button></p>}{book && <section className="panel"><h2>{book.chapters[0]?.title}</h2><div className="reading-options"><button className="sticker-btn" onClick={() => setFont(x => x === 22 ? 26 : 22)}>调整字号</button><label><input type="checkbox" checked={pinyin} onChange={e => setPinyin(e.target.checked)} />拼音</label><label><input type="checkbox" checked={translation} onChange={e => setTranslation(e.target.checked)} />白话</label></div>{book.chapters[0]?.blocks.map((b, i) => <div key={i}>{pinyin && b.pinyin ? <PoemRuby text={b.text} pinyin={b.pinyin} fontSize={font} color="var(--ink)" /> : <p style={{ fontSize: font, lineHeight: 1.9, whiteSpace: 'pre-line' }}>{b.text}</p>}{translation && b.translation && <p>{b.translation}</p>}</div>)}<details><summary>来源与审校状态</summary><p>{book.source} · {book.author ?? '作者未标注'}</p><p>{book.reviewStatus === 'reviewed' ? '已有人工审校记录，完整范围见书目来源页' : '人工精审仍在进行，试读不代表全部读音和译文已通过审校'}</p></details><Link className="sticker-btn primary" to="/login" onClick={() => sessionStorage.setItem('taoread-trial-choice', book.id)}>创建或加入家庭，继续读这本</Link></section>}<Link to="/login">返回登录</Link></main>
}
