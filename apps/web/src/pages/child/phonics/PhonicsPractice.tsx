// 练习：复习到期就练，没到期就翻词卡——不硬造一轮复习。
import { useEffect, useMemo, useRef, useState } from 'react'
import type { PhonicsNextDto } from '@taoread/shared'
import type { PhonicsAtlasDto, PhonicsAtlasWordDto } from '@taoread/shared'
import { API_BASE } from '../../../lib/api'
import { PhonicsAudio } from './phonicsAudio'

const absolute = (url: string) => (url.startsWith('/') ? `${API_BASE}${url}` : url)

export function PracticeTab({ next, atlas, blocked, onStartReview, onGoShelf }: {
  next: PhonicsNextDto | null
  atlas: PhonicsAtlasDto | null
  blocked: boolean
  onStartReview: () => void
  onGoShelf: () => void
}) {
  const reviewDue = next?.planKind === 'review' || next?.reason === 'spaced_review'
  const words = useMemo(() => (atlas?.words ?? []).filter(w => w.unlocked && w.image?.url), [atlas])
  return <section aria-label="练习">
    <h2 className="ph-tab-title">练习 <span className="ph-tab-sub">让嘴巴也记住它们</span></h2>
    <p className="phonics-hint">练习的记录单独放，不算课的进度。</p>
    <button className="ph-mode min-h-[64px]" disabled={blocked || !reviewDue} onClick={onStartReview} aria-disabled={!reviewDue}>
      <span className="ph-mode-icon" aria-hidden="true">👂</span>
      <span><b>听音辨词</b><small>{reviewDue ? '学过的词到期了，来挑战一遍。' : '今天的复习还没到期，先学新课。'}</small></span>
    </button>
    <WordFlip words={words} blocked={blocked} />
    <button className="ph-mode min-h-[64px]" disabled={blocked} onClick={onGoShelf}>
      <span className="ph-mode-icon" aria-hidden="true">📖</span>
      <span><b>再读小书</b><small>去书房挑一本读过的书。</small></span>
    </button>
  </section>
}

/** 词卡快闪：一张一张翻，翻到自动读整词——孩子自己控制节奏。 */
function WordFlip({ words, blocked }: { words: PhonicsAtlasWordDto[]; blocked: boolean }) {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const player = useRef<PhonicsAudio | null>(null)
  const word = words[index % Math.max(words.length, 1)]
  useEffect(() => {
    const engine = new PhonicsAudio()
    player.current = engine
    return () => { engine.dispose(); player.current = null }
  }, [])
  useEffect(() => {
    const engine = player.current
    const audio = word?.audios.find(a => a.purpose === 'word')
    if (!engine || !audio?.url) return
    let live = true
    setPlaying(true)
    void engine.prepare([{ ...audio, url: absolute(audio.url) }])
      .then(() => engine.play([audio.id]))
      .catch(() => undefined)
      .finally(() => { if (live) setPlaying(false) })
    return () => { live = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- 翻到新词时按词条重播一次；audios 随词条整体更换，无需逐项依赖
  }, [word?.id])
  if (!words.length) return null
  const move = (delta: number) => { if (!blocked) { setIndex(i => (i + delta + words.length) % words.length) } }
  return <div className="ph-flip" role="group" aria-label="词卡快闪">
    <button className="ph-flip-nav min-h-[64px] min-w-[64px]" disabled={blocked} aria-label="上一个" onClick={() => move(-1)}>←</button>
    <div className="ph-flip-card">
      {word?.image?.url && <img src={absolute(word.image.url)} alt="" loading="lazy" />}
      <b lang="en-GB">{word?.text}</b>
      <p className="phonics-hint">{word?.meaningZh}</p>
      <span className="ph-flip-status" aria-live="polite">{playing ? '正在读…' : `${index + 1} / ${words.length}`}</span>
    </div>
    <button className="ph-flip-nav min-h-[64px] min-w-[64px]" disabled={blocked} aria-label="下一个" onClick={() => move(1)}>→</button>
  </div>
}
