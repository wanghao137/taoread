import { useState } from 'react'
type Snapshot = { available: boolean; reason?: string; sampledAt?: string; stale?: boolean; caveat?: string; accounts?: Array<{ accountId?: string; coverage: string; bytes?: number; stopBytes?: number; buckets?: Array<{ bucket: string; bytes: number; count: number }> }> }
export function OperationsStatus({ load }: { load: () => Promise<Snapshot> }) {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  return <details className="panel"><summary>存储容量与核查范围</summary><button className="sticker-btn" disabled={busy} onClick={() => { setBusy(true); void load().then(x => { setSnapshot(x); setError('') }).catch(() => { setSnapshot(null); setError('容量快照未加载；不能作为上传许可') }).finally(() => setBusy(false)) }}>读取最近核查快照</button>{error && <p role="alert">{error}</p>}{snapshot && (snapshot.available ? <><p>采样时间：{new Date(snapshot.sampledAt!).toLocaleString()} · {snapshot.stale ? '已过期，需要运营重新核查' : '15 分钟内采样'}</p>{snapshot.accounts?.map((a, i) => <section key={i}><h3>账户 {a.accountId ?? '未核实'}</h3><p>{a.bytes === undefined ? '容量未知' : `${(a.bytes / 1e9).toFixed(3)} GB`}{a.stopBytes && ` · 写入停止阈值 ${(a.stopBytes / 1e9).toFixed(1)} GB`}</p><p>覆盖：{a.coverage === 'all-buckets-and-multipart' ? '全部桶及未完成分块' : '仅专用音频桶；全账户未完成核查'}</p>{a.buckets?.map(b => <p key={b.bucket}>{b.bucket}：{(b.bytes / 1e9).toFixed(3)} GB · {b.count.toLocaleString()} 个对象</p>)}</section>)}<p>{snapshot.caveat}</p></> : <p role="alert">{snapshot.reason}</p>)}</details>
}
