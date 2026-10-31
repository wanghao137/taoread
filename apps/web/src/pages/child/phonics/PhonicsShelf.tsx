// 书房：小书架——跟课上走，上完哪课，哪本书就解锁可以再读。按课次分组摆放（词光式书架）。
import type { PhonicsAtlasDto, PhonicsAtlasReaderDto } from '@taoread/shared'
import { useMemo, useState } from 'react'
import { API_BASE } from '../../../lib/api'
import { PhonicsReader } from './PhonicsReader'

const absolute = (url: string) => (url.startsWith('/') ? `${API_BASE}${url}` : url)

export function ShelfTab({ token, childId, atlas, versionOf, blocked, nextBusy, onReread, onGoShelfStudy, onFavorite }: {
  token: string
  childId: string
  atlas: PhonicsAtlasDto | null
  versionOf: (readerId: string) => string | undefined
  blocked: boolean
  nextBusy: boolean
  onReread: (readerId: string, versionId: string) => void
  onGoShelfStudy: () => void
  onFavorite: (id: string, favorite: boolean) => Promise<void>
}) {
  const [openId, setOpenId] = useState<string | null>(null)
  const readers = useMemo(() => atlas?.readers ?? [], [atlas])
  const groups = useMemo(() => {
    const order = new Map((atlas?.lessons ?? []).map(l => [l.id, l.order]))
    const byLesson = new Map<string, PhonicsAtlasReaderDto[]>()
    for (const reader of readers) {
      const key = reader.lessonKey ?? 'extra'
      if (!byLesson.has(key)) byLesson.set(key, [])
      byLesson.get(key)!.push(reader)
    }
    return [...byLesson.entries()]
      .sort((a, b) => (order.get(a[0]) ?? 999) - (order.get(b[0]) ?? 999))
      .map(([key, items]) => ({
        key,
        title: key === 'extra' ? '课外书' : atlas?.lessons.find(l => l.id === key)?.titleZh ?? key,
        items,
        open: items.filter(item => item.unlocked).length,
      }))
  }, [atlas, readers])
  const openCount = readers.filter(r => r.unlocked).length
  if (openId && atlas) return <PhonicsReader token={token} childId={childId} readerId={openId} words={atlas.words} onFavorite={onFavorite} onClose={() => setOpenId(null)} onClassroom={() => { const versionId = versionOf(openId); if (versionId) onReread(openId, versionId) }} />
  return <section aria-label="小书架">
    <h2 className="ph-tab-title">书房 <span className="ph-tab-sub">能读 {openCount} / {readers.length} 本</span></h2>
    {!atlas && <p role="status">正在摆书架…</p>}
    {groups.map(group => <div key={group.key} className="ph-shelf-group">
      <h3 className="ph-shelf-group-title">{group.title} <span>{group.open} / {group.items.length} 本</span></h3>
      <div className="ph-shelf-grid">
        {group.items.map(r =>
          <button key={r.id} className="ph-book min-h-[44px]" disabled={blocked || nextBusy || !versionOf(r.id)}
              onClick={() => setOpenId(r.id)}>
              {r.cover?.url ? <img src={absolute(r.cover.url)} alt="" loading="lazy" /> : <span className="ph-book-cover-fallback" aria-hidden="true">📖</span>}
              <b>{r.titleZh}</b>
              <span className="ph-book-meta">{r.pages} 页</span>
              <span className="ph-book-action">打开小书</span>
            </button>)}
      </div>
    </div>)}
    {atlas && openCount > 0 && nextBusy && <div className="phonics-notice"><p>刚才的课还没收尾。先回「今日」接着上完，再来读小书。</p><button className="sticker-btn hot min-h-[44px]" onClick={onGoShelfStudy}>回今日</button></div>}
  </section>
}
