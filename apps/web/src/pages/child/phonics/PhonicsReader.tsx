import { useEffect, useRef, useState } from 'react'
import type { PhonicsAtlasWordDto } from '@taoread/shared'
import { IconChevronLeft, IconChevronRight, IconMinus, IconPlus, IconVolume } from '../../../components/ui/icons'
import { API_BASE } from '../../../lib/api'
import { phonicsApi, type PhonicsReader as Reader } from './api'
import { WordSheet } from './PhonicsAtlas'
import { PhonicsAudio } from './phonicsAudio'

export function PhonicsReader({ token, childId, readerId, words, onFavorite, onClose, onClassroom }: {
  token: string; childId: string; readerId: string; words: PhonicsAtlasWordDto[]; onFavorite: (id: string, favorite: boolean) => Promise<void>; onClose: () => void; onClassroom: () => void
}) {
  const [reader, setReader] = useState<Reader | null>(null)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [openId, setOpenId] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(false)
  const audio = useRef<PhonicsAudio | null>(null)
  const page = reader?.pages[reader.progress.page]
  const open = words.find(word => word.id === openId)

  useEffect(() => {
    let live = true
    void phonicsApi.reader(token, childId, readerId).then(value => { if (live) setReader(value.reader) }).catch(() => { if (live) setError('小书暂时没有打开，请返回重试') })
    return () => { live = false }
  }, [token, childId, readerId])
  useEffect(() => {
    const engine = new PhonicsAudio(); audio.current = engine; setReady(false)
    let live = true
    if (page?.audio?.url) void engine.prepare([page.audio]).then(() => { if (live) setReady(true) }).catch(() => { if (live) setError('这一页的声音暂时没有准备好') })
    return () => { live = false; engine.dispose(); audio.current = null }
  }, [page?.audio?.id, page?.audio?.url]) // eslint-disable-line react-hooks/exhaustive-deps

  async function update(pageIndex: number, fontSize: number) {
    if (!reader || saving) return
    setSaving(true); setError('')
    try {
      const progress = await phonicsApi.readingProgress(token, childId, readerId, { versionId: reader.versionId, page: pageIndex, fontSize, expectedRevision: reader.progress.revision })
      setReader({ ...reader, progress })
    } catch {
      try { setReader((await phonicsApi.reader(token, childId, readerId)).reader); setError('已恢复最新阅读位置') }
      catch { setError('阅读位置没有保存，请检查网络后再试') }
    } finally { setSaving(false) }
  }
  async function play() {
    if (!page?.audio || !audio.current || !ready || playing) return
    setPlaying(true); setError('')
    try { await audio.current.play([page.audio.id]) } catch { setError('声音没有播出来，请再试一次') } finally { setPlaying(false) }
  }

  return <section className="ph-reader" aria-label="阅读小书">
    <div className="ph-exercise-top"><button className="ph-ghost-btn min-h-[44px]" disabled={saving} onClick={onClose}>返回书房</button><h2>{reader?.title ?? '小书'}</h2></div>
    {!reader && !error && <p role="status">正在打开小书…</p>}
    {reader && page && <>
      <div className="ph-reader-tools" role="group" aria-label="字号">
        <button className="ph-icon-button min-h-[44px] min-w-[44px]" title="缩小字号" aria-label="缩小字号" disabled={saving || reader.progress.fontSize <= 18} onClick={() => void update(reader.progress.page, reader.progress.fontSize - 2)}><IconMinus size={20} /></button>
        <span>{reader.progress.fontSize}</span>
        <button className="ph-icon-button min-h-[44px] min-w-[44px]" title="放大字号" aria-label="放大字号" disabled={saving || reader.progress.fontSize >= 36} onClick={() => void update(reader.progress.page, reader.progress.fontSize + 2)}><IconPlus size={20} /></button>
        <button className="ph-listen min-h-[44px]" disabled={!ready || playing} onClick={() => void play()}><IconVolume size={20} />{playing ? '播放中' : '听这一页'}</button>
      </div>
      {page.image && <img className="ph-reader-image" src={page.image.startsWith('/') ? `${API_BASE}${page.image}` : page.image} alt="" />}
      <p className="ph-reader-text" lang="en-GB" style={{ fontSize: reader.progress.fontSize }}>{page.text.split(/([A-Za-z]+)/).map((part, index) => {
        const word = words.find(item => page.wordIds.includes(item.id) && item.text?.toLowerCase() === part.toLowerCase())
        return word ? <button key={index} className="ph-reader-word min-h-[44px]" aria-label={`查看 ${part} 词卡`} onClick={() => setOpenId(word.id)}>{part}</button> : part
      })}</p>
      <div className="ph-reader-pages">
        <button className="ph-icon-button min-h-[44px] min-w-[44px]" aria-label="上一页" title="上一页" disabled={saving || reader.progress.page === 0} onClick={() => void update(reader.progress.page - 1, reader.progress.fontSize)}><IconChevronLeft size={22} /></button>
        <span>{reader.progress.page + 1} / {reader.pages.length}</span>
        <button className="ph-icon-button min-h-[44px] min-w-[44px]" aria-label="下一页" title="下一页" disabled={saving || reader.progress.page >= reader.pages.length - 1} onClick={() => void update(reader.progress.page + 1, reader.progress.fontSize)}><IconChevronRight size={22} /></button>
      </div>
      <button className="ph-ghost-btn min-h-[44px]" disabled={saving} onClick={onClassroom}>课堂重读</button>
    </>}
    {error && <p role="alert">{error}</p>}
    {open && <WordSheet key={open.id} word={open} onClose={() => setOpenId(null)} onFavorite={onFavorite} />}
  </section>
}
