import { useEffect, useRef, useState } from 'react'
import type { PhonicsWordCardDto } from '@taoread/shared'
import { API_BASE } from '../../../lib/api'
import { phonicsApi } from './api'
import { PhonicsAudio } from './phonicsAudio'
import { phonicsSfx } from './phonicsSfx'

const absolute = (url: string) => (url.startsWith('/') ? `${API_BASE}${url}` : url)
/** 三个喇叭按钮的语义固定，不随机改变教学用途（docs/69 音频分层要求）。 */
const READING_LABELS: Record<string, string> = { segment: '分开听', blend: '拼一拼', word: '听整词' }

export function WordCards({ token, childId, blocked }: { token: string; childId: string; blocked: boolean }) {
  const [words, setWords] = useState<PhonicsWordCardDto[] | null>(null)
  const [open, setOpen] = useState<PhonicsWordCardDto | null>(null)
  const live = useRef(true)
  useEffect(() => {
    live.current = true
    phonicsApi.words(token, childId).then(r => { if (live.current) setWords(r.words) }).catch(() => { if (live.current) setWords([]) })
    return () => { live.current = false }
  }, [token, childId])
  if (!words?.length) return null
  return <section className="phonics-readers" aria-label="我的词卡">
    <h2>我的词卡<span className="phonics-card-count">已收集 {words.length} 张</span></h2>
    <p className="phonics-hint">点一张卡，听它的声音，看它的意思。</p>
    <div className="phonics-card-grid">
      {words.map(word => (
        <button className="phonics-card min-h-[44px]" key={word.id} disabled={blocked} onClick={() => { phonicsSfx.play('tap'); setOpen(word) }}>
          {word.image?.url
            ? <img src={absolute(word.image.url)} alt="" loading="lazy" />
            : <span className="phonics-card-letter" lang="en-GB">{word.text[0]?.toUpperCase()}</span>}
          <b lang="en-GB">{word.text}</b>
        </button>
      ))}
    </div>
    {open && <WordCardSheet card={open} onClose={() => setOpen(null)} />}
  </section>
}

function WordCardSheet({ card, onClose }: { card: PhonicsWordCardDto; onClose: () => void }) {
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
    engine.prepare(card.audios.map(a => ({ ...a, url: a.url ? absolute(a.url) : null })))
      .then(() => {
        if (!live) return
        setReady(true)
        // 词光式「点开就能听」：卡片打开自动读一次整词，之后由孩子自己点
        if (!greeted.current && card.audios.some(a => a.purpose === 'word' && a.url)) {
          greeted.current = true
          setPlaying('word')
          engine.play([card.audios.find(a => a.purpose === 'word')!.id]).catch(() => undefined).finally(() => { if (live) setPlaying(null) })
        }
      })
      .catch(e => { if (live) setError(e instanceof Error ? e.message : '声音还没准备好，请重试') })
    return () => { live = false; engine.dispose(); player.current = null }
  }, [card])
  async function play(purpose: string) {
    const audio = card.audios.find(a => a.purpose === purpose)
    const engine = player.current
    if (!audio?.url || !engine || playing) return
    setPlaying(purpose); setError('')
    try { await engine.play([audio.id]) } catch (e) { setError(e instanceof Error ? e.message : '声音没有播出来，请再点一次') } finally { setPlaying(null) }
  }
  return <div className="phonics-word-sheet" role="dialog" aria-modal="true" aria-label={`${card.text} 词卡`} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
    <section className="phonics-sheet phonics-word-card">
      <div className="phonics-top"><h2 lang="en-GB">{card.text}</h2><button className="sticker-btn" onClick={onClose}>收起来</button></div>
      {card.image?.url && <img className="phonics-word-image" src={absolute(card.image.url)} alt={`${card.text} 的意思配图`} />}
      <div className="phonics-choices" role="group" aria-label="三种读法">
        {(['segment', 'blend', 'word'] as const).map(purpose => {
          const audio = card.audios.find(a => a.purpose === purpose)
          return <button key={purpose} className="phonics-tile min-h-[64px]" disabled={!ready || !audio?.url || Boolean(playing)}
            aria-label={READING_LABELS[purpose]} onClick={() => void play(purpose)}>
            {playing === purpose ? '…' : `🔊 ${READING_LABELS[purpose]}`}
          </button>
        })}
      </div>
      <p className="phonics-hint">{card.meaningZh}</p>
      {!ready && !error && <p role="status">正在准备声音…</p>}
      {error && <div className="phonics-notice" role="alert">{error}</div>}
      {ready && !error && <p className="phonics-hint">先分开听，再拼一拼，最后听整词。</p>}
    </section>
  </div>
}
