import { useEffect, useRef, useState } from 'react'
import type { PhonicsAssetDto, PhonicsAtlasWordDto } from '@taoread/shared'
import { IconType, IconVolume } from '../../../components/ui/icons'
import { API_BASE } from '../../../lib/api'
import { uid } from '../../../lib/uid'
import { phonicsApi, type PracticeSummary, type StudySchedule, type TypingMode, type TypingResult, type TypingSource } from './api'
import { PhonicsAudio } from './phonicsAudio'
import { typingDelta, typingLength, typingMatches, typingMetrics } from './typingMetrics'

type Entry = { word: PhonicsAtlasWordDto; target: string; audio: PhonicsAssetDto | null }
type Totals = { correct: number; attempted: number; accepted: number; elapsedMs: number }
const initialTotals = (): Totals => ({ correct: 0, attempted: 0, accepted: 0, elapsedMs: 0 })
const sources: Array<[TypingSource, string]> = [['recent', '最近学过'], ['wrong', '错词'], ['favorite', '收藏'], ['path', '学习路线']]
const modes: Array<[TypingMode, string]> = [['word', '单词打字'], ['sentence', '例句打字'], ['dictation', '句子听写']]

function readPending(key: string): TypingResult | null {
  try {
    const value = JSON.parse(sessionStorage.getItem(key) ?? 'null') as TypingResult | null
    return value && typeof value.clientSessionId === 'string' && typeof value.versionId === 'string' ? value : null
  } catch { return null }
}

export function TypingPractice({ token, childId, versionId, words, schedule, summary, onExit }: {
  token: string; childId: string; versionId: string; words: PhonicsAtlasWordDto[]; schedule: StudySchedule | null; summary: PracticeSummary | null; onExit: () => void
}) {
  const storageKey = `taoread-phonics-typing-pending:${childId}`
  const [source, setSource] = useState<TypingSource>('path')
  const [mode, setMode] = useState<TypingMode | null>(null)
  const [entries, setEntries] = useState<Entry[]>([])
  const [index, setIndex] = useState(0)
  const [value, setValue] = useState('')
  const [totals, setTotals] = useState<Totals>(initialTotals)
  const totalsRef = useRef<Totals>(initialTotals())
  const started = useRef<number | null>(null)
  const finishing = useRef(false)
  const [result, setResult] = useState<TypingResult | null>(() => readPending(storageKey))
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const audio = useRef<PhonicsAudio | null>(null)
  const [audioReady, setAudioReady] = useState(false)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const current = entries[index]
  const currentAudio = mode === 'dictation' ? current?.audio : null
  const eligible = words.filter(word => word.unlocked && word.text)
  const recent = new Set(schedule?.recentWordIds ?? schedule?.learnedWordIds ?? [])
  const pool = eligible.filter(word => source === 'recent' ? recent.has(word.id) : source === 'wrong' ? summary?.wrongWordIds.includes(word.id) : source === 'favorite' ? word.favorite : true)

  useEffect(() => {
    const engine = new PhonicsAudio(); audio.current = engine; setAudioReady(false)
    let live = true
    if (currentAudio?.url) void engine.prepare([currentAudio]).then(() => { if (live) setAudioReady(true) }).catch(() => { if (live) setError('声音暂时没有准备好') })
    return () => { live = false; engine.dispose(); audio.current = null }
  }, [currentAudio?.id, currentAudio?.url]) // eslint-disable-line react-hooks/exhaustive-deps

  function entriesFor(nextMode: TypingMode): Entry[] {
    const candidates = pool.flatMap(word => nextMode === 'word'
      ? [{ word, target: word.text!, audio: null }]
      : word.examples.filter(example => example.text.trim() && (nextMode !== 'dictation' || example.audio?.url)).map(example => ({ word, target: example.text.trim(), audio: example.audio })))
    const seen = new Set<string>()
    return candidates.filter(item => { const key = item.target.toLowerCase(); if (seen.has(key)) return false; seen.add(key); return true }).slice(0, 10)
  }

  function start(nextMode: TypingMode) {
    const next = entriesFor(nextMode)
    if (!next.length) return
    setMode(nextMode); setEntries(next); setIndex(0); setValue(''); setError('')
    totalsRef.current = initialTotals(); setTotals(totalsRef.current); started.current = null; finishing.current = false
  }

  async function saveResult(record: TypingResult) {
    if (saving) return
    setSaving(true); setError('')
    try {
      await phonicsApi.recordTyping(token, childId, record)
      setSaved(true)
      try { sessionStorage.removeItem(storageKey) } catch { /* current result is still visible */ }
    } catch { setError('记录暂时没有保存，请重试') } finally { setSaving(false) }
  }

  function change(next: string) {
    if (!current || !mode || finishing.current || next.length > 500) return
    if (started.current === null && next) started.current = Date.now()
    const delta = typingDelta(value, next, current.target)
    const updated = { ...totalsRef.current, correct: totalsRef.current.correct + delta.correct, attempted: totalsRef.current.attempted + delta.attempted }
    totalsRef.current = updated; setTotals(updated); setValue(next)
    if (!typingMatches(next, current.target)) return
    const finished = { ...updated, accepted: updated.accepted + typingLength(current.target), elapsedMs: updated.elapsedMs + Math.max(1, Math.min(90000, Date.now() - (started.current ?? Date.now()))) }
    totalsRef.current = finished; setTotals(finished); started.current = null; setValue('')
    if (index + 1 < entries.length) { setIndex(index + 1); return }
    finishing.current = true
    const record: TypingResult = { clientSessionId: uid(), versionId, mode, source, items: entries.length, correctCharacters: finished.correct, attemptedCharacters: finished.attempted, acceptedCharacters: finished.accepted, elapsedMs: finished.elapsedMs }
    try { sessionStorage.setItem(storageKey, JSON.stringify(record)) } catch { /* retry remains available while this page is open */ }
    setResult(record); setSaved(false); void saveResult(record)
  }

  async function play() {
    if (!audioReady || !currentAudio || !audio.current || audioPlaying) return
    setAudioPlaying(true); setError('')
    try { await audio.current.play([currentAudio.id]) } catch { setError('声音没有播出来，请再试一次') } finally { setAudioPlaying(false) }
  }

  if (result) {
    const metrics = typingMetrics(result.correctCharacters, result.attemptedCharacters, result.acceptedCharacters, result.elapsedMs)
    return <section className="ph-exercise" aria-label="打字结果">
      <h2>打字完成</h2><p>{result.items} 项 · 准确率 {metrics.accuracy}% · {metrics.wpm} WPM</p>
      <p role="status">{saved ? '记录已保存' : saving ? '正在保存记录' : '记录尚未保存'}</p>
      {error && <p role="alert">{error}</p>}
      {!saved && <button className="ph-cta min-h-[44px]" disabled={saving} onClick={() => void saveResult(result)}>重新保存</button>}
      <button className="ph-ghost-btn min-h-[44px]" disabled={saving} onClick={onExit}>返回练习</button>
    </section>
  }

  if (mode && current) {
    const metrics = typingMetrics(totals.correct, totals.attempted, totals.accepted, totals.elapsedMs)
    return <section className="ph-exercise" aria-label="打字练习">
      <div className="ph-exercise-top"><button className="ph-ghost-btn min-h-[44px]" onClick={onExit}>结束</button><span>{index + 1} / {entries.length}</span></div>
      <h2>{modes.find(item => item[0] === mode)?.[1]}</h2>
      {mode === 'word' && current.word.image?.url && <img className="ph-question-image" src={current.word.image.url.startsWith('/') ? `${API_BASE}${current.word.image.url}` : current.word.image.url} alt="" />}
      <p>{mode === 'word' ? current.word.meaningZh : <><span lang="en-GB">{current.word.text}</span> · {current.word.meaningZh}</>}</p>
      {mode === 'dictation' && <button className="ph-listen min-h-[44px]" disabled={!audioReady || audioPlaying} onClick={() => void play()}><IconVolume size={24} />{audioPlaying ? '播放中' : '听句子'}</button>}
      <p className="ph-typing-target" lang="en-GB">{mode === 'dictation' ? Array.from(current.target).map(character => /[A-Za-z]/.test(character) ? '·' : character).join('') : current.target}</p>
      <input className="ph-typing-input" aria-label="输入英文" value={value} onChange={event => change(event.target.value)} autoComplete="off" autoCapitalize="none" spellCheck={false} />
      <p className="ph-result-count">{metrics.wpm} WPM · 准确率 {metrics.accuracy}%</p>
      {error && <p role="alert">{error}</p>}
    </section>
  }

  return <section aria-label="选择打字练习">
    <div className="ph-exercise-top"><h2 className="ph-tab-title">打字练习</h2><button className="ph-ghost-btn min-h-[44px]" onClick={onExit}>返回</button></div>
    <div className="ph-filters" role="group" aria-label="打字练习范围">{sources.map(([id, label]) => <button key={id} className={`ph-chip min-h-[44px]${source === id ? ' on' : ''}`} aria-pressed={source === id} onClick={() => setSource(id)}>{label}</button>)}</div>
    {modes.map(([id, label]) => <button key={id} className="ph-mode min-h-[44px]" disabled={!entriesFor(id).length} onClick={() => start(id)}><span className="ph-mode-icon">{id === 'dictation' ? <IconVolume size={26} /> : <IconType size={26} />}</span><span><b>{label}</b><small>{entriesFor(id).length} 项</small></span></button>)}
    {!pool.length && <p className="phonics-hint">这个范围还没有可以练习的词。</p>}
  </section>
}
