import { useEffect, useState, useSyncExternalStore } from 'react'
import { Link } from 'react-router-dom'
import { IconSun, IconVolume } from '../../../components/ui/icons'
import type { PhonicsAtlasDto } from '@taoread/shared'
import { phonicsApi, type PhonicsSummary, type PracticeSummary, type StudySchedule, type TypingRecord, type WordSettings } from './api'
import { calendarCells, practiceDays } from './phonicsDates'
import { phonicsSfx } from './phonicsSfx'

export function MeTab({ token, childId, atlas, summary }: { token: string; childId: string; atlas: PhonicsAtlasDto | null; summary: PhonicsSummary | null }) {
  const sfxOn = useSyncExternalStore(phonicsSfx.subscribe, () => phonicsSfx.enabled, () => phonicsSfx.enabled)
  const [practice, setPractice] = useState<PracticeSummary | null>(null)
  const [schedule, setSchedule] = useState<StudySchedule | null>(null)
  const [settings, setSettings] = useState<WordSettings | null>(null)
  const [typingRecords, setTypingRecords] = useState<TypingRecord[]>([])
  const [saving, setSaving] = useState(false)
  const [settingsMessage, setSettingsMessage] = useState('')
  useEffect(() => { let live = true; void phonicsApi.practiceSummary(token, childId).then(value => { if (live) setPractice(value) }).catch(() => undefined); return () => { live = false } }, [token, childId])
  useEffect(() => { let live = true; void phonicsApi.studySchedule(token, childId).then(value => { if (live) setSchedule(value) }).catch(() => undefined); return () => { live = false } }, [token, childId])
  useEffect(() => { let live = true; void phonicsApi.wordSettings(token, childId).then(value => { if (live) setSettings(value) }).catch(() => { if (live) setSettingsMessage('学习设置暂时没有取到') }); return () => { live = false } }, [token, childId])
  useEffect(() => { let live = true; void phonicsApi.typingResults(token, childId).then(value => { if (live) setTypingRecords(value.results) }).catch(() => undefined); return () => { live = false } }, [token, childId])
  const words = atlas?.words ?? []
  const collected = words.filter(w => w.unlocked).length
  const learned = words.filter(w => w.studyState === 'learning' || w.studyState === 'familiar').length
  const familiar = words.filter(w => w.studyState === 'familiar').length
  const lessons = atlas?.lessons ?? []
  const completed = lessons.filter(l => l.completed).length
  const practicedDays = practiceDays(summary?.practiceCalendar ?? []).size
  const cells = calendarCells(summary?.practiceCalendar ?? [])
  return <section aria-label="我的学习">
    <h2 className="ph-tab-title">我的 <span className="ph-tab-sub">学习小账本</span></h2>
    <div className="ph-me-stats">
      <div className="ph-stat big"><b>{collected}<i>/{words.length}</i></b><span>词已开放</span></div>
      <div className="ph-stat"><b>{completed}<i>/{lessons.length}</i></b><span>课上完</span></div>
      <div className="ph-stat"><b>{practicedDays}</b><span>天练过</span></div>
    </div>
    <p className="ph-result-count">已学 {learned} 个词 · 较熟悉 {familiar} 个词</p>
    <div className="ph-me-block"><h3>练习记录</h3><p>{practice?.total ? `首次答对 ${practice.correct} / ${practice.total} 题` : '还没有独立练习记录'}</p>{practice && <p>答题 {Math.floor(practice.answerDurationSeconds / 60)} 分 {practice.answerDurationSeconds % 60} 秒 · 打字 {Math.floor(practice.typingDurationSeconds / 60)} 分 {practice.typingDurationSeconds % 60} 秒</p>}</div>
    <div className="ph-me-block"><h3>打字记录</h3><p>{typingRecords[0] ? `最近一次 ${typingRecords[0].wpm} WPM · 准确率 ${typingRecords[0].accuracy}%` : '还没有打字记录'}</p></div>
    <div className="ph-me-block"><h3>过去 20 周</h3><div className="ph-calendar" role="img" aria-label={`过去 20 周有 ${cells.filter(day => day.count).length} 天进行英语活动`}>
      {cells.map(day => <span key={day.day} className={day.count ? 'active' : ''} title={`${day.day}：${day.count} 次`} />)}
    </div></div>
    {schedule && <div className="ph-me-block"><h3>未来 7 天复习</h3><div className="ph-upcoming">{schedule.upcoming.map((day, index) => <div key={day.day}><span>{index === 0 ? '今天' : day.day.slice(5)}</span><b>{day.count}</b></div>)}</div></div>}
    {settings && <form className="ph-me-block ph-settings" onSubmit={event => {
      event.preventDefault()
      setSaving(true); setSettingsMessage('')
      const { revision, ...value } = settings
      void phonicsApi.setWordSettings(token, childId, { ...value, expectedRevision: revision }).then(saved => {
        setSettings(saved); setSettingsMessage('设置已保存')
      }).catch(() => {
        setSettingsMessage('没有保存上，重新取一次设置')
        void phonicsApi.wordSettings(token, childId).then(fresh => { if (fresh) setSettings(fresh) }).catch(() => undefined)
      }).finally(() => setSaving(false))
    }}>
      <fieldset disabled={saving} style={{ border: 'none', margin: 0, padding: 0 }}>
      <h3>单词学习设置</h3>
      <label>每天新词 <input aria-label="每天新词数量" type="number" min="0" max="100" required value={settings.dailyNew} onChange={event => setSettings({ ...settings, dailyNew: Number(event.target.value) })} /></label>
      <label>复习目标 <input aria-label="目标记忆率" type="range" min="70" max="97" value={Math.round(settings.retention * 100)} onChange={event => setSettings({ ...settings, retention: Number(event.target.value) / 100 })} /><span>{Math.round(settings.retention * 100)}%</span></label>
      <div className="ph-accent-row" role="radiogroup" aria-label="整词发音口音">
        <span>整词口音</span>
        {([['GB', '英音'], ['US', '美音']] as const).map(([value, label]) =>
          <button key={value} type="button" className={`ph-chip min-h-[44px]${(settings.accent ?? 'GB') === value ? ' on' : ''}`} role="radio"
            aria-checked={(settings.accent ?? 'GB') === value} onClick={() => setSettings({ ...settings, accent: value })}>{label}</button>)}
      </div>
      {(settings.accent ?? 'GB') === 'US' && <p className="ph-settings-note">美音是电脑合成的候选，还没经过人工听审；先试着用，听着不对就换回英音。</p>}
      <label><input type="checkbox" checked={settings.autoplay} onChange={event => setSettings({ ...settings, autoplay: event.target.checked })} /> 自动播放新词</label>
      <label><input type="checkbox" checked={settings.spelling} onChange={event => setSettings({ ...settings, spelling: event.target.checked })} /> 复习时练习拼写</label>
      <button className="ph-cta min-h-[44px]" disabled={saving}>保存设置</button>
      {settingsMessage && <p role="status">{settingsMessage}</p>}
      </fieldset>
    </form>}
    <div className="ph-me-block">
      <h3>声音设置</h3>
      <button className="ph-mode min-h-[64px]" aria-pressed={sfxOn} onClick={() => phonicsSfx.setPreference(!sfxOn)}>
        <span className="ph-mode-icon"><IconVolume size={26} /></span>
        <span><b>答题音效{ sfxOn ? '开着' : '关了' }</b></span>
      </button>
    </div>
    <div className="ph-me-block">
      <h3>给爸爸妈妈</h3>
      <Link className="ph-mode min-h-[64px]" to="/child/today">
        <span className="ph-mode-icon"><IconSun size={26} /></span>
        <span><b>回到今天</b></span>
      </Link>
    </div>
  </section>
}
