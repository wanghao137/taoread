import { useState } from 'react'
import { api, ApiError } from '../lib/api'
import { useSession } from '../stores/session'

export function ParentPinSettings({ familyId, token }: { familyId: string; token: string }) {
  const [currentPin, setCurrentPin] = useState('')
  const [newPin, setNewPin] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const valid = /^\d{6,12}$/.test(currentPin) && /^\d{6,12}$/.test(newPin) && newPin === confirmation

  async function save(e: React.FormEvent) {
    e.preventDefault()
    if (busy || !valid) return
    setBusy(true)
    setMessage(null)
    setError(null)
    try {
      const result = await api.changeParentPin(familyId, token, currentPin, newPin)
      // 保留当前会话的档案/设置，只替换凭据版本更新后的令牌。
      if (useSession.getState().token === token) useSession.setState({ token: result.token })
      setCurrentPin('')
      setNewPin('')
      setConfirmation('')
      setMessage('家长 PIN 已更改，其他家长设备需要重新登录。孩子设备可以继续阅读。')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'PIN 更改没有成功，请稍后再试')
    } finally {
      setBusy(false)
    }
  }

  return <form className="panel" id="setting-parent-pin" onSubmit={save}>
    <h3>家长 PIN</h3>
    <p>独立 PIN 保护家庭管理。忘记 PIN 请联系家庭管理员恢复，家庭码不能重置 PIN。</p>
    {[
      { id: 'current-pin', label: '当前家长 PIN', value: currentPin, set: setCurrentPin, complete: 'current-password' },
      { id: 'replacement-pin', label: '新家长 PIN', value: newPin, set: setNewPin, complete: 'new-password' },
      { id: 'replacement-pin-confirm', label: '再次输入新 PIN', value: confirmation, set: setConfirmation, complete: 'new-password' },
    ].map(field => <div key={field.id} style={{ marginTop: 12 }}>
      <label htmlFor={field.id} className="mono-label">{field.label}</label>
      <input id={field.id} type="password" inputMode="numeric" autoComplete={field.complete} minLength={6} maxLength={12} required className="field" style={{ display: 'block', width: '100%', marginTop: 8 }} value={field.value} onChange={e => field.set(e.target.value)} disabled={busy} />
    </div>)}
    <p style={{ fontSize: 13, marginTop: 8 }}>新 PIN 需要 6–12 位数字。保存后其他家长设备会退出登录。</p>
    {confirmation && confirmation !== newPin && <p role="status" className="msg">两次新 PIN 不一致</p>}
    {error && <p role="alert" className="msg">{error}</p>}
    {message && <p role="status">{message}</p>}
    <button type="submit" className="sticker-btn primary" style={{ marginTop: 12 }} disabled={busy || !valid}>{busy ? '正在保存…' : '更改家长 PIN'}</button>
  </form>
}
