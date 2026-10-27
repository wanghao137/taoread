// 图鉴：全部词的星星墙——已解锁的点开听三种读法，未解锁的灰星占位（学到的课越多，点亮的越多）。
import { useEffect, useMemo, useRef, useState } from 'react'
import type { PhonicsAtlasDto, PhonicsAtlasWordDto } from '@taoread/shared'
import { API_BASE } from '../../../lib/api'
import { PhonicsAudio } from './phonicsAudio'
import { phonicsSfx } from './phonicsSfx'

const absolute = (url: string) => (url.startsWith('/') ? `${API_BASE}${url}` : url)
const READING_LABELS: Record<string, string> = { segment: '分开听', blend: '拼一拼', word: '听整词' }

export function AtlasTab({ atlas, blocked }: { atlas: PhonicsAtlasDto | null; blocked: boolean }) {
  const [query, setQuery] = useState('')
  const [onlyCollected, setOnlyCollected] = useState(false)
  const [open, setOpen] = useState<PhonicsAtlasWordDto | null>(null)
  const words = atlas?.words ?? []
  const collected = words.filter(w => w.unlocked)
  const shown = useMemo(() => collected.filter(w => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return w.text?.toLowerCase().includes(q) || w.meaningZh?.includes(query.trim())
  }), [collected, query])
  return <section aria-label="词的图鉴">
    <h2 className="ph-tab-title">图鉴 <span className="ph-tab-sub">{collected.length} / {words.length} 颗星已点亮</span></h2>
    <p className="phonics-hint">学会一个词，这里就多一颗星。点星星，听它的声音。</p>
    <div className="ph-atlas-tools">
      <input className="ph-search min-h-[44px]" type="search" placeholder="搜单词或中文" value={query}
        onChange={e => setQuery(e.target.value)} aria-label="搜索单词或中文释义" />
      <button className={`ph-chip min-h-[44px]${onlyCollected ? ' on' : ''}`} aria-pressed={onlyCollected}
        onClick={() => setOnlyCollected(v => !v)}>{onlyCollected ? '只看点亮' : '全部'}</button>
    </div>
    {!atlas && <p role="status">正在打开图鉴…</p>}
    <div className="ph-atlas-grid">
      {(onlyCollected ? shown : [...shown, ...words.filter(w => !w.unlocked)]).map(w => w.unlocked
        ? <button key={w.id} className="ph-star-card min-h-[44px]" disabled={blocked} onClick={() => { phonicsSfx.play('tap'); setOpen(w) }}>
            {w.image?.url ? <img src={absolute(w.image.url)} alt="" loading="lazy" /> : <span className="ph-star-placeholder" aria-hidden="true">★</span>}
            <b lang="en-GB">{w.text}</b>
          </button>
        : <span key={w.id} className="ph-star-card locked" aria-label="还没点亮">
            <span className="ph-star-placeholder" aria-hidden="true">✩</span>
          </span>)}
    </div>
    {atlas && shown.length === 0 && <p className="phonics-hint">{query ? '没找到这个词，换个说法试试。' : '还没有点亮的星。先去「今日」上一课吧。'}</p>}
    {open && <WordSheet word={open} onClose={() => setOpen(null)} />}
  </section>
}

function WordSheet({ word, onClose }: { word: PhonicsAtlasWordDto; onClose: () => void }) {
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState<string | null>(null)
  const [error, setError] = useState('')
  const player = useRef<PhonicsAudio | null>(null)
  const greeted = useRef(false)
  useEffect(() => {
    const engine = new PhonicsAudio()
    player.current = engine
    let live = true
    setReady(false); setError('')
    engine.prepare(word.audios.map(a => ({ ...a, url: a.url ? absolute(a.url) : null })))
      .then(() => {
        if (!live) return
        setReady(true)
        // 词光式「点开就能听」：打开自动读一次整词，之后由孩子自己点
        const whole = word.audios.find(a => a.purpose === 'word')
        if (!greeted.current && whole?.url) {
          greeted.current = true
          setPlaying('word')
          engine.play([whole.id]).catch(() => undefined).finally(() => { if (live) setPlaying(null) })
        }
      })
      .catch(e => { if (live) setError(e instanceof Error ? e.message : '声音还没准备好，请重试') })
    return () => { live = false; engine.dispose(); player.current = null }
  }, [word])
  async function play(purpose: string) {
    const audio = word.audios.find(a => a.purpose === purpose)
    const engine = player.current
    if (!audio?.url || !engine || playing) return
    setPlaying(purpose); setError('')
    try { await engine.play([audio.id]) } catch (e) { setError(e instanceof Error ? e.message : '声音没有播出来，请再点一次') } finally { setPlaying(null) }
  }
  return <div className="phonics-word-sheet" role="dialog" aria-modal="true" aria-label={`${word.text ?? ''} 词卡`} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
    <section className="phonics-sheet phonics-word-card">
      <div className="phonics-top"><h2 lang="en-GB">{word.text}</h2><button className="sticker-btn min-h-[44px]" onClick={onClose}>收起来</button></div>
      {word.image?.url && <img className="phonics-word-image" src={absolute(word.image.url)} alt={`${word.text} 的意思配图`} />}
      <div className="phonics-choices" role="group" aria-label="三种读法">
        {(['segment', 'blend', 'word'] as const).map(purpose => {
          const audio = word.audios.find(a => a.purpose === purpose)
          return <button key={purpose} className="phonics-tile min-h-[64px]" disabled={!ready || !audio?.url || Boolean(playing)}
            aria-label={READING_LABELS[purpose]} onClick={() => void play(purpose)}>
            {playing === purpose ? '…' : `🔊 ${READING_LABELS[purpose]}`}
          </button>
        })}
      </div>
      <p className="phonics-hint">{word.meaningZh}</p>
      {!ready && !error && <p role="status">正在准备声音…</p>}
      {error && <div className="phonics-notice" role="alert">{error}</div>}
    </section>
  </div>
}
