import { useState } from 'react'
type Guidance = { modes: Array<'together' | 'self' | 'listen'>; topics: string[]; advice: string; evidence: string }
export function GuidanceEditor({ version, reviewer, save, disabled = false }: { version: string; reviewer: string; disabled?: boolean; save: (value: Guidance & { version: string; reviewer: string; reviewedOn: string }) => Promise<void> }) {
  const [modes, setModes] = useState<Guidance['modes']>(['together'])
  const [topics, setTopics] = useState('')
  const [advice, setAdvice] = useState('')
  const [evidence, setEvidence] = useState('')
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)
  return <details><summary>编辑阅读方式、主题与内容提醒</summary><p>记录实际编辑判断及依据，不自动测量孩子水平。正文版本改变后本建议失效，需要重新复核。</p><fieldset disabled={busy || disabled}><legend>建议阅读方式</legend>{(['together', 'self', 'listen'] as const).map((mode, i) => <label key={mode}><input type="checkbox" checked={modes.includes(mode)} onChange={e => setModes(old => e.target.checked ? [...old, mode] : old.filter(x => x !== mode))} />{['一起读', '自主试读', '先听一听'][i]}</label>)}</fieldset><label>主题（用逗号分隔，最多8个）<input disabled={busy || disabled} maxLength={240} value={topics} onChange={e => setTopics(e.target.value)} /></label><label>使用建议和必要内容提醒<textarea disabled={busy || disabled} maxLength={500} value={advice} onChange={e => setAdvice(e.target.value)} /></label><label>判断依据<textarea disabled={busy || disabled} maxLength={1000} value={evidence} onChange={e => setEvidence(e.target.value)} /></label><button className="sticker-btn" disabled={busy || disabled || !modes.length || advice.trim().length < 3 || evidence.trim().length < 3 || reviewer.trim().length < 2} onClick={() => { setBusy(true); void save({ version, reviewer, reviewedOn: new Date().toISOString().slice(0, 10), modes, topics: topics.split(/[,，]/).map(x => x.trim()).filter(Boolean), advice, evidence }).then(() => setStatus('已保存当前版本的编辑建议')).catch(err => setStatus(err instanceof Error ? err.message : '未保存，请重试')).finally(() => setBusy(false)) }}>保存阅读建议</button><p role="status">{status}</p></details>
}
