import { useState } from 'react'
import { api, request } from '../lib/api'
type Summary = { children: Array<{ ref: string; nickname: string }>; imports: number; records: number; exclusions: string[] }
export function RecordRestore({ token, familyId, onChanged }: { token: string; familyId: string; onChanged: () => void }) {
  const [records, setRecords] = useState<unknown>(null)
  const [summary, setSummary] = useState<Summary | null>(null)
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)
  async function preview(file?: File) {
    setRecords(null); setSummary(null)
    if (!file) return
    if (file.size > 20 * 1024 * 1024) { setStatus('记录文件超过 20 MB，请联系部署者使用运营恢复工具'); return }
    setBusy(true)
    try {
      const value: unknown = JSON.parse(await file.text())
      const result = await request<{ summary: Summary }>('/api/reading/restore', { token, method: 'POST', body: { preview: true, records: value } })
      setRecords(value); setSummary(result.summary); setStatus('已预览，尚未写入。仅允许恢复到没有小读者和家庭书的空家庭。')
    } catch (err) { setStatus(err instanceof Error ? err.message : '文件无法预览') }
    finally { setBusy(false) }
  }
  async function restore() {
    if (!summary || !window.confirm(`向当前空家庭恢复 ${summary.children.length} 个小读者与 ${summary.records} 条记录？不会恢复账号、原始文件或音视频。`)) return
    setBusy(true)
    try {
      await request('/api/reading/restore', { token, method: 'POST', body: { preview: false, records, confirm: 'RESTORE_TO_EMPTY_FAMILY' } })
      setRecords(null); setSummary(null); setStatus('记录已恢复。原始文件和媒体不在此导出范围内，正文版本变化时请重新选择阅读位置。'); onChanged()
    } catch (err) { setStatus(err instanceof Error ? err.message : '恢复未完成') }
    finally { setBusy(false) }
  }
  async function report() {
    setBusy(true)
    try {
      const data = JSON.parse(await api.exportFamilyData(familyId, token)) as { exportedAt: string; exclusions: string[]; children: Array<{ ref: string; nickname: string; stage: string }>; quotes: Array<{ childRef: string; text: string; bookId: string; chapterOrder: number }>; highlights: Array<{ childRef: string; text: string; createdAt: string }>; progress: Array<{ childRef: string; bookId: string; chapterOrder: number }> }
      const lines = ['桃阅读 · 家庭阅读记录', data.exportedAt, '此报告用于阅读回顾，不能恢复账号、原始文件或媒体。', ...data.exclusions]
      for (const child of data.children) {
        lines.push(`\n${child.nickname}（${child.ref}，${child.stage}）`, ...data.progress.filter(x => x.childRef === child.ref).map(x => `${x.bookId} · 第 ${x.chapterOrder} 章`), ...data.quotes.filter(x => x.childRef === child.ref).map(x => `${x.bookId} · 第 ${x.chapterOrder} 章：${x.text}`), ...data.highlights.filter(x => x.childRef === child.ref).map(x => `${x.createdAt}：${x.text}`))
      }
      const url = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' }))
      const a = document.createElement('a'); a.href = url; a.download = 'taoread-reading-report.txt'; a.click(); URL.revokeObjectURL(url)
    } catch { setStatus('报告未生成，请重试') }
    finally { setBusy(false) }
  }
  return <div><button className="sticker-btn" disabled={busy} onClick={() => void report()}>下载可读记录报告</button><details><summary>恢复版本 2 阅读记录到空家庭</summary><p>包含孩子档案、共读、金句、生词、公共书与家庭书进度、已同步书签、可选安排及家庭书解析文字；同名孩子按独立标识恢复。原始文件、图片和声音需要运营备份。已有家庭不会覆盖或合并。</p><label>选择记录 JSON<input type="file" accept=".json,application/json" disabled={busy} onChange={e => void preview(e.target.files?.[0])} /></label>{summary && <><p>{summary.children.length} 个小读者，{summary.imports} 本家庭文字书，{summary.records} 条阅读记录。</p>{summary.children.map(c => <p key={c.ref}>{c.nickname} · {c.ref}</p>)}<button className="sticker-btn" disabled={busy} onClick={() => void restore()}>确认恢复到当前空家庭</button></>}{status && <p role="status">{status}</p>}</details></div>
}
