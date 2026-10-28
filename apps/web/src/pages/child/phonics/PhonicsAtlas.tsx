import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import type { PhonicsAssetDto, PhonicsAtlasDto, PhonicsAtlasWordDto } from '@taoread/shared'
import { Dialog } from '../../../components/ui/Dialog'
import { IconHeart, IconHeartFilled, IconVolume } from '../../../components/ui/icons'
import { API_BASE } from '../../../lib/api'
import { PhonicsAudio } from './phonicsAudio'
import { PHONICS_TOPICS, phonicsTopic, type PhonicsTopicId } from './phonicsTopics'
import { createWordCardImage } from './wordCardImage'

const absolute = (url: string) => (url.startsWith('/') ? `${API_BASE}${url}` : url)
const PhonicsGalaxy = lazy(() => import('./PhonicsGalaxy').then(module => ({ default: module.PhonicsGalaxy })))

export function AtlasTab({ atlas, blocked, onFavorite }: { atlas: PhonicsAtlasDto | null; blocked: boolean; onFavorite: (id: string, favorite: boolean) => Promise<void> }) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<'all' | 'favorite' | 'unseen' | 'learning' | 'familiar'>('all')
  const [view, setView] = useState<'grid' | 'list' | 'galaxy'>('grid')
  const [lesson, setLesson] = useState('all')
  const [topic, setTopic] = useState<PhonicsTopicId | 'all'>('all')
  const [openId, setOpenId] = useState<string | null>(null)
  const words = useMemo(() => atlas?.words ?? [], [atlas])
  const open = words.find(word => word.id === openId)
  const shown = useMemo(() => words.filter(word => {
    const q = query.trim().toLowerCase()
    return (!q || word.text?.toLowerCase().includes(q) || word.meaningZh?.includes(query.trim())) &&
      (status === 'all' || (status === 'favorite' ? word.favorite : (word.studyState ?? 'unseen') === status)) &&
      (lesson === 'all' || word.lessonKey === lesson) && (topic === 'all' || phonicsTopic(word.id) === topic)
  }), [words, query, status, lesson, topic])
  return <section aria-label="词的图鉴" className="ph-atlas">
    <div className="ph-section-heading"><div><p className="phonics-kicker">WORD ATLAS</p><h2 className="ph-tab-title">单词图鉴</h2></div><span className="ph-tab-sub">{words.length} 个词</span></div>
    <div className="ph-atlas-tools">
      <input className="ph-search min-h-[44px]" type="search" placeholder="搜索单词或中文" value={query}
        onChange={e => setQuery(e.target.value)} aria-label="搜索单词或中文释义" />
      <select className="ph-select" aria-label="按课程筛选" value={lesson} onChange={event => setLesson(event.target.value)}>
        <option value="all">全部课程</option>
        {atlas?.lessons.filter(item => item.wordCount > 0).map(item => <option key={item.id} value={item.id}>{item.titleZh}</option>)}
      </select>
      <select className="ph-select" aria-label="按主题筛选" value={topic} onChange={event => setTopic(event.target.value as PhonicsTopicId | 'all')}>
        <option value="all">全部主题</option>
        {PHONICS_TOPICS.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
      </select>
    </div>
    <div className="ph-filters" role="group" aria-label="词条状态">
      {([['all', '全部'], ['unseen', '未学'], ['learning', '学习中'], ['familiar', '较熟悉'], ['favorite', '收藏']] as const).map(([value, label]) =>
        <button key={value} className={`ph-chip min-h-[44px]${status === value ? ' on' : ''}`} aria-pressed={status === value} onClick={() => setStatus(value)}>{label}</button>)}
    </div>
    <div className="ph-filters" role="group" aria-label="图鉴视图">
      {([['grid', '图片'], ['list', '列表'], ['galaxy', '星图']] as const).map(([value, label]) => <button key={value} className={`ph-chip min-h-[44px]${view === value ? ' on' : ''}`} aria-pressed={view === value} onClick={() => setView(value)}>{label}</button>)}
    </div>
    {!atlas ? <p role="status">正在打开图鉴…</p> : <p className="ph-result-count">{shown.length} 个词</p>}
    {view === 'galaxy' ? <Suspense fallback={<p role="status">正在准备星图…</p>}><PhonicsGalaxy words={shown} onOpen={id => { if (!blocked) setOpenId(id) }} onTopic={setTopic} /></Suspense> : <div className={`ph-atlas-grid${view === 'list' ? ' list' : ''}`}>
      {shown.map(word => <button key={word.id} className="ph-star-card min-h-[44px]" disabled={blocked} onClick={() => setOpenId(word.id)}>
        {word.image?.url ? <img src={absolute(word.image.url)} alt="" loading="lazy" /> : <span className="ph-star-placeholder" aria-hidden="true">Aa</span>}
        <span className="ph-card-copy"><b lang="en-GB">{word.text}</b><span>{word.meaningZh}</span><small>{word.studyState === 'familiar' ? '较熟悉' : word.studyState === 'learning' ? '学习中' : '未学'}</small></span>
      </button>)}
    </div>}
    {atlas && !shown.length && <p className="phonics-hint">没有找到符合条件的单词。</p>}
    {open && <WordSheet key={open.id} word={open} onClose={() => setOpenId(null)} onFavorite={onFavorite} />}
  </section>
}

export function WordSheet({ word, onClose, onFavorite }: { word: PhonicsAtlasWordDto; onClose: () => void; onFavorite: (id: string, favorite: boolean) => Promise<void> }) {
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [shareMessage, setShareMessage] = useState('')
  const [cardImage, setCardImage] = useState<{ blob: Blob; url: string } | null>(null)
  const [generating, setGenerating] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const player = useRef<PhonicsAudio | null>(null)
  const mounted = useRef(true)
  useEffect(() => { mounted.current = true; return () => { mounted.current = false } }, [])
  useEffect(() => () => { if (cardImage) URL.revokeObjectURL(cardImage.url) }, [cardImage])
  // 音频清单签名：收藏切换会换 word 对象但音频不动，按签名避免整包引擎重建与重复下载
  const audioKey = [word.audios.map(a => `${a.id}:${a.url ?? ''}`).join('|'), word.examples.map(e => e.audio?.id ?? '').join('|'), word.lexicon?.example.audio?.id ?? ''].join('#')
  useEffect(() => {
    const engine = new PhonicsAudio()
    player.current = engine
    let live = true
    const lexiconAudio = word.lexicon?.example.audio
    const audios = [...word.audios, ...word.examples.flatMap(example => example.audio ? [example.audio] : []), ...(lexiconAudio ? [lexiconAudio] : [])].filter(a => a.url)
    setReady(false); setError('')
    engine.prepare(audios.map(audio => ({ ...audio, url: absolute(audio.url!) })))
      .then(() => { if (live) setReady(true) })
      .catch(e => { if (live) setError(e instanceof Error ? e.message : '声音还没准备好') })
    return () => { live = false; engine.dispose(); player.current = null }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- 音频签名不变则不重建引擎；attempt 供「再试一次」手动重备
  }, [word.id, audioKey, attempt])
  async function play(audio: PhonicsAssetDto | null | undefined) {
    if (!audio?.url || !player.current || playing) return
    setPlaying(audio.id); setError('')
    try { await player.current.play([audio.id]) } catch { setError('声音没有播出来，请再试一次') } finally { setPlaying(null) }
  }
  async function favorite() {
    if (saving) return
    setSaving(true); setError('')
    try { await onFavorite(word.id, !word.favorite) } catch { setError('收藏没有保存，请再试一次') } finally { setSaving(false) }
  }
  async function share() {
    const text = `${word.text ?? ''} · ${word.meaningZh ?? ''}`
    setShareMessage('')
    try {
      if (navigator.share) await navigator.share({ title: '桃阅读单词卡', text })
      else { await navigator.clipboard.writeText(text); setShareMessage('已复制单词和词义') }
    } catch (error) { if (!(error instanceof DOMException && error.name === 'AbortError')) setShareMessage('分享暂不可用') }
  }
  async function generateCard() {
    if (generating) return
    setGenerating(true); setShareMessage('')
    try { const blob = await createWordCardImage(word); if (mounted.current) setCardImage({ blob, url: URL.createObjectURL(blob) }) }
    catch (error) { if (mounted.current) setShareMessage(error instanceof Error ? error.message : '图片生成失败') } finally { if (mounted.current) setGenerating(false) }
  }
  async function shareCard() {
    if (!cardImage) return
    const file = new File([cardImage.blob], `taoread-${word.id}.png`, { type: 'image/png' })
    try {
      if (navigator.canShare?.({ files: [file] }) && navigator.share) await navigator.share({ files: [file], title: '桃阅读单词卡' })
      else { const link = document.createElement('a'); link.href = cardImage.url; link.download = file.name; link.click(); setShareMessage('已下载图片') }
    } catch (error) { if (!(error instanceof DOMException && error.name === 'AbortError')) setShareMessage('图片分享暂不可用') }
  }
  return <Dialog label={`${word.text ?? ''} 词卡`} onClose={onClose} className="ph-word-dialog">
    {word.image?.url && <img className="ph-word-image" src={absolute(word.image.url)} alt={`${word.text} 的意思配图`} />}
    <div className="ph-word-detail"><div className="ph-word-tools"><span className="ph-word-status">{word.studyState === 'familiar' ? '较熟悉' : word.studyState === 'learning' ? '学习中' : '未学'}</span>
      <button className="ph-icon-button min-h-[44px] min-w-[44px]" aria-label={word.favorite ? '取消收藏' : '收藏单词'} title={word.favorite ? '取消收藏' : '收藏单词'} aria-pressed={word.favorite} disabled={saving} onClick={() => void favorite()}>{word.favorite ? <IconHeartFilled size={22} /> : <IconHeart size={22} />}</button>
      <button className="ph-ghost-btn min-h-[44px]" onClick={() => void share()}>分享</button></div>
      <h3 lang="en-GB">{word.text}</h3><p>{word.meaningZh}</p>
      <button className="ph-ghost-btn min-h-[44px]" disabled={generating} onClick={() => void generateCard()}>{generating ? '正在生成图片' : '生成词卡图片'}</button>
      {cardImage && <div className="ph-card-image-preview"><img src={cardImage.url} alt={`${word.text} 单词卡图片`} /><button className="ph-ghost-btn min-h-[44px]" onClick={() => void shareCard()}>分享或下载图片</button></div>}
      <div className="ph-reading-controls" role="group" aria-label="单词发音">
        {(() => {
          const uk = word.audios.find(a => a.purpose === 'word' && a.accent === 'GB') ?? word.audios.find(a => a.purpose === 'word' && !a.accent)
          const us = word.audios.find(a => a.purpose === 'word' && a.accent === 'US')
          const segment = word.audios.find(a => a.purpose === 'segment')
          const blend = word.audios.find(a => a.purpose === 'blend')
          return <>
            <button disabled={!ready || !uk?.url || Boolean(playing)} onClick={() => void play(uk)} title={word.lexicon?.ukIpa}>
              <IconVolume size={20} />{playing === uk?.id ? '播放中' : '英式'}{!word.audios.some(a => a.accent === 'GB') && <small className="ph-accent-tag">课</small>}
            </button>
            {us && <button disabled={!ready || Boolean(playing)} onClick={() => void play(us)} title={word.lexicon?.usIpa}>
              <IconVolume size={20} />{playing === us.id ? '播放中' : '美式'}
            </button>}
            {segment && <button disabled={!ready || Boolean(playing)} onClick={() => void play(segment)}>
              <IconVolume size={20} />{playing === segment.id ? '播放中' : '分开听'}
            </button>}
            {blend && <button disabled={!ready || Boolean(playing)} onClick={() => void play(blend)}>
              <IconVolume size={20} />{playing === blend.id ? '播放中' : '拼一拼'}
            </button>}
          </>
        })()}
      </div>
      {word.examples.length > 0 && <div className="ph-examples"><h4>在句子里</h4>{word.examples.map(example =>
        <div key={example.text} className="ph-example"><p lang="en-GB">{example.text}</p>
          {example.audio && <button className="ph-icon-button min-h-[44px] min-w-[44px]" title="播放句子" aria-label="播放句子" disabled={!ready || Boolean(playing)} onClick={() => void play(example.audio)}><IconVolume size={22} /></button>}
        </div>)}</div>}
      {word.lexicon && <div className="ph-lexicon">
        <h4>词典里说</h4>
        <p className="ph-ipa" lang="en-GB"><span className="ph-ipa-tag">英</span>{word.lexicon.ukIpa}<span className="ph-ipa-tag">美</span>{word.lexicon.usIpa}</p>
        {word.lexicon.senses.map((sense, index) => <p key={index} className="ph-lex-sense"><i lang="en-GB">{sense.pos}</i>{sense.zh}<span lang="en-GB">{sense.en}</span></p>)}
        <div className="ph-example"><p lang="en-GB">{word.lexicon.example.en}</p><span>{word.lexicon.example.zh}</span>
          {word.lexicon.example.audio && <button className="ph-icon-button min-h-[44px] min-w-[44px]" title="播放词典例句" aria-label="播放词典例句" disabled={!ready || Boolean(playing)} onClick={() => void play(word.lexicon?.example.audio)}><IconVolume size={22} /></button>}
        </div>
        {word.lexicon.tip && <p className="ph-lex-tip">💡 {word.lexicon.tip}</p>}
        {(word.lexicon.collocations.length > 0 || word.lexicon.family.length > 0) && <details className="ph-lex-more">
          <summary className="min-h-[44px]">更多词典信息</summary>
          {word.lexicon.collocations.length > 0 && <p className="ph-lex-col"><b>常用搭配</b>{word.lexicon.collocations.join(' · ')}</p>}
          {word.lexicon.family.length > 0 && <p className="ph-lex-col"><b>词语家族</b>{word.lexicon.family.join(' · ')}</p>}
        </details>}
      </div>}
      {!ready && !error && <p role="status">正在准备声音…</p>}
      {error && <p role="alert">{error} <button className="ph-ghost-btn min-h-[44px]" onClick={() => setAttempt(n => n + 1)}>再试一次</button></p>}
      {shareMessage && <p role="status">{shareMessage}</p>}
    </div>
  </Dialog>
}
