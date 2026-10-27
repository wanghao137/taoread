// 我的：孩子的学习小账本——点亮了多少星、上了多少课、连续多少天。
import { useSyncExternalStore } from 'react'
import { Link } from 'react-router-dom'
import type { PhonicsAtlasDto } from '@taoread/shared'
import type { PhonicsSummary } from './api'
import { phonicsSfx } from './phonicsSfx'

export function MeTab({ atlas, summary }: { atlas: PhonicsAtlasDto | null; summary: PhonicsSummary | null }) {
  const sfxOn = useSyncExternalStore(phonicsSfx.subscribe, () => phonicsSfx.enabled, () => phonicsSfx.enabled)
  const words = atlas?.words ?? []
  const collected = words.filter(w => w.unlocked).length
  const lessons = atlas?.lessons ?? []
  const completed = lessons.filter(l => l.completed).length
  const practicedDays = new Set((summary?.recentPractice ?? [])
    .filter(p => p.status === 'completed' && p.hadLearningActions)
    .map(p => new Date(p.startedAt).toDateString())).size
  return <section aria-label="我的学习">
    <h2 className="ph-tab-title">我的 <span className="ph-tab-sub">学习小账本</span></h2>
    <div className="ph-me-stats">
      <div className="ph-stat big"><b>{collected}<i>/{words.length}</i></b><span>颗星已点亮</span></div>
      <div className="ph-stat"><b>{completed}<i>/{lessons.length}</i></b><span>课上完</span></div>
      <div className="ph-stat"><b>{practicedDays}</b><span>天练过</span></div>
    </div>
    <div className="ph-me-block">
      <h3>声音设置</h3>
      <button className="ph-mode min-h-[64px]" aria-pressed={sfxOn} onClick={() => phonicsSfx.setPreference(!sfxOn)}>
        <span className="ph-mode-icon" aria-hidden="true">{sfxOn ? '🔔' : '🔕'}</span>
        <span><b>答题音效{ sfxOn ? '开着' : '关了' }</b><small>答对了会有小铃声。</small></span>
      </button>
    </div>
    <div className="ph-me-block">
      <h3>给爸爸妈妈</h3>
      <p className="phonics-hint">学习进度存在家庭账号里，换设备也不会丢。学习报告和课程设置在家长端。</p>
      <Link className="ph-mode min-h-[64px]" to="/child/today">
        <span className="ph-mode-icon" aria-hidden="true">🏠</span>
        <span><b>回到今天</b><small>家长入口在主页右上角。</small></span>
      </Link>
    </div>
  </section>
}
