// 书房：小书架——跟课上走，上完哪课，哪本书就解锁可以再读。
import type { PhonicsAtlasDto } from '@taoread/shared'
import { API_BASE } from '../../../lib/api'

const absolute = (url: string) => (url.startsWith('/') ? `${API_BASE}${url}` : url)

export function ShelfTab({ atlas, versionOf, blocked, nextBusy, onReread, onGoShelfStudy }: {
  atlas: PhonicsAtlasDto | null
  versionOf: (readerId: string) => string | undefined
  blocked: boolean
  nextBusy: boolean
  onReread: (readerId: string, versionId: string) => void
  onGoShelfStudy: () => void
}) {
  const readers = atlas?.readers ?? []
  const lessonTitle = (key: string | null) => atlas?.lessons.find(l => l.id === key)?.titleZh
  const openCount = readers.filter(r => r.unlocked).length
  return <section aria-label="小书架">
    <h2 className="ph-tab-title">书房 <span className="ph-tab-sub">能读 {openCount} / {readers.length} 本</span></h2>
    <p className="phonics-hint">上完课，书就归你。点一本，再读一遍。</p>
    {!atlas && <p role="status">正在摆书架…</p>}
    <div className="ph-shelf-grid">
      {readers.map(r => r.unlocked
        ? <button key={r.id} className="ph-book min-h-[44px]" disabled={blocked || nextBusy || !versionOf(r.id)}
            onClick={() => { const versionId = versionOf(r.id); if (versionId) onReread(r.id, versionId) }}>
            {r.cover?.url ? <img src={absolute(r.cover.url)} alt="" loading="lazy" /> : <span className="ph-book-cover-fallback" aria-hidden="true">📖</span>}
            <b>{r.titleZh}</b>
            <span className="ph-book-meta">{r.pages} 页</span>
            <span className="ph-book-action">再读一遍</span>
          </button>
        : <span key={r.id} className="ph-book locked" aria-label="还没解锁">
            <span className="ph-book-lock" aria-hidden="true">🔒</span>
            <b>{r.titleZh}</b>
            <span className="ph-book-meta">{lessonTitle(r.lessonKey) ? `上完「${lessonTitle(r.lessonKey)}」解锁` : '继续上课解锁'}</span>
          </span>)}
    </div>
    {atlas && openCount === 0 && <div className="phonics-notice"><p>第一本小书在等着你。先去「今日」把课上完。</p><button className="sticker-btn hot min-h-[44px]" onClick={onGoShelfStudy}>去上课</button></div>}
  </section>
}
