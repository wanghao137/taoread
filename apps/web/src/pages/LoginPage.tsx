import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { api, ApiError } from '../lib/api'
import { ROLE_LABEL, type DeviceRole } from '../lib/roles'
import { useSession } from '../stores/session'
import { IconFamily, IconPeach } from '../components/ui/icons'
import { ReadingIllustration } from '../components/art/ReadingIllustration'
import { AiContentAgreement } from './AiContentAgreement'
import { PRIVACY_VERSION } from './PrivacyPage'
import { BrandLogo } from '../components/ui'

function deviceId(): string {
  // 设备标识仅用于展示与统计（后端 did 字段），本地生成不入库身份；隐私模式下静默降级
  try {
    let did = globalThis.localStorage?.getItem('taoread-device') ?? null
    if (!did) {
      did = `web-${Math.random().toString(36).slice(2, 10)}`
      globalThis.localStorage?.setItem('taoread-device', did)
    }
    return did
  } catch {
    return 'web-ephemeral'
  }
}

type Mode = 'choose' | 'join' | 'create'

/** 登录入口（v8 贴纸绘本语言）：品牌 mast + 贴纸面板 + 药丸按钮，与孩子端/家长端同一套 token */
export function LoginPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const signIn = useSession((s) => s.signIn)
  const [mode, setMode] = useState<Mode>('choose')
  const [code, setCode] = useState('')
  const [role, setRole] = useState<DeviceRole>('parent')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [agreementOpen, setAgreementOpen] = useState(false)
  const [createdCode, setCreatedCode] = useState<{ familyCode: string } | null>(null)
  // docs/34 P1-3：创建家庭=监护人首次登记，必须先勾选同意隐私政策（服务端留痕）
  const [consented, setConsented] = useState(false)
  const [parentPin, setParentPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const pinValid = /^\d{6,12}$/.test(parentPin)

  async function enter(path: '/child' | '/parent', session: { token: string; familyId: string; familyCode: string }) {
    signIn({ token: session.token, familyId: session.familyId, familyCode: session.familyCode, role })
    navigate(path, { replace: true })
  }

  async function handleJoin() {
    setBusy(true)
    setError(null)
    try {
      const session = await api.joinFamily(code.trim().toUpperCase(), role, deviceId(), parentPin)
      setParentPin('')
      await enter(role === 'parent' ? '/parent' : '/child', session)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : '加入没有成功，请稍后再试')
    } finally {
      setBusy(false)
    }
  }

  async function handleCreate() {
    setBusy(true)
    setError(null)
    try {
      if (!pinValid || parentPin !== confirmPin) { setError('请输入 6–12 位数字 PIN，并确认两次输入一致'); return }
      const session = await api.createFamily(deviceId(), PRIVACY_VERSION, parentPin)
      setParentPin('')
      setConfirmPin('')
      setCreatedCode({ familyCode: session.familyCode })
      signIn({
        token: session.token,
        familyId: session.familyId,
        familyCode: session.familyCode,
        role: 'parent',
      })
    } catch (err) {
      setError(err instanceof ApiError ? err.message : '创建没有成功，请稍后再试')
    } finally {
      setBusy(false)
    }
  }

  function roleSticker(r: DeviceRole) {
    return (
      <button key={r} type="button" className={`role-pick ${role === r ? 'on' : ''}`} aria-pressed={role === r} disabled={busy} onClick={() => { setRole(r); setParentPin(''); setError(null) }}>
        <span aria-hidden className="avatar big" style={{ background: role === r ? 'var(--card)' : undefined }}>
          {r === 'parent' ? <IconFamily size={26} /> : <IconPeach size={26} />}
        </span>
        {ROLE_LABEL[r]}
      </button>
    )
  }

  /* R-06（docs/31）：弹层键盘与读屏闭环——打开移焦到关闭钮、Tab 在弹层内圈定、
     Escape 关闭、关闭后焦点回到触发按钮。 */
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)
  useEffect(() => {
    if (!agreementOpen) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    closeBtnRef.current?.focus()
    return () => previouslyFocused?.focus?.()
  }, [agreementOpen])

  function onDialogKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      e.stopPropagation()
      setAgreementOpen(false)
      return
    }
    if (e.key !== 'Tab') return
    const root = dialogRef.current
    if (!root) return
    const focusables = Array.from(
      root.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),
    ).filter((el) => !el.hasAttribute('disabled'))
    if (focusables.length === 0) return
    const first = focusables[0]!
    const last = focusables[focusables.length - 1]!
    const active = document.activeElement
    if (e.shiftKey && (active === first || !root.contains(active))) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && active === last) {
      e.preventDefault()
      first.focus()
    }
  }

  return (
    <div className="app login-app">
      <div className="wrap login-wrap" id="main-content">
        {/* 品牌锚点唯一：桃子 logo 贴纸卡 + 字标（与孩子端 v8 壳同一 mast 语言） */}
        <header className="login-brand">
          <div className="logo big">
            <BrandLogo alt="桃阅读" />
          </div>
          <h1>桃阅读</h1>
          <p className="login-tagline">
            一起读书，慢慢长大
          </p>
          <ReadingIllustration className="login-illustration" />
          <p className="login-caption">把一段安静的时光，留给故事。</p>
        </header>
        <div className="login-flow">
        {searchParams.get('reason') === 'parent-pin' && <p role="status" className="panel">家长登录已更新，请用家庭码和独立家长 PIN 重新登录。旧家庭尚未设置 PIN 时，请联系家庭管理员完成迁移。</p>}

        {createdCode ? (
          <div className="panel" aria-live="polite" style={{ textAlign: 'center' }}>
            <h2>家庭创建好啦</h2>
            <p>孩子使用家庭码加入。家长再次登录时，还需要刚设置的家长 PIN，请单独保管。</p>
            <p className="mono-label" style={{ marginTop: 10 }}>家庭码 · 给孩子加入</p>
            <p data-testid="family-code" className="code-display">
              {createdCode.familyCode}
            </p>
            <button
              type="button"
              className="sticker-btn primary block"
              onClick={() => navigate('/parent', { replace: true })}
            >
              进入家长端
            </button>
          </div>
        ) : mode === 'choose' ? (
          <>
            <div className="panel">
              <h2>一起读书，留下阅读记忆</h2>
              <p>选择这次的故事从谁开始</p>
              <div className="setting-row" style={{ marginTop: 12 }}>
                {(Object.keys(ROLE_LABEL) as DeviceRole[]).map(roleSticker)}
              </div>
              <button type="button" className="sticker-btn primary block" style={{ marginTop: 14 }} onClick={() => setMode('join')}>
                输入家庭码加入
              </button>
            </div>
            <button type="button" className="linklike" onClick={() => setMode('create')}>
              还没有家庭码？创建新家庭 →
            </button>
          </>
        ) : mode === 'join' ? (
          <div className="panel">
            <h2>输入家庭码</h2>
            <p>孩子凭家庭码加入，家长还需要输入独立 PIN。</p>
            <label htmlFor="family-code" className="mono-label" style={{ display: 'block', marginTop: 12 }}>
              家庭码
            </label>
            <input
              id="family-code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              maxLength={8}
              autoComplete="off"
              placeholder="12345678"
              className="field code-input"
              style={{ width: '100%', marginTop: 8 }}
            />
            <div className="setting-row" style={{ marginTop: 12 }}>
              {roleSticker('parent')}
              {roleSticker('child')}
            </div>
            {role === 'parent' && <>
              <label htmlFor="parent-pin" className="mono-label" style={{ display: 'block', marginTop: 12 }}>家长 PIN</label>
              <input id="parent-pin" type="password" inputMode="numeric" autoComplete="current-password" className="field" style={{ width: '100%', marginTop: 8 }} minLength={6} maxLength={12} value={parentPin} onChange={e => setParentPin(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !busy && pinValid && /^[0-9A-HJ-NP-Z]{6,8}$/.test(code.trim())) void handleJoin() }} aria-describedby="parent-pin-help" />
              <p id="parent-pin-help" style={{ fontSize: 13, marginTop: 8 }}>6–12 位数字，仅家长保管。忘记 PIN 或旧家庭首次设置，请联系家庭管理员恢复；家庭码不能重置 PIN。</p>
            </>}
            {error && (
              <p role="alert" className="msg" style={{ marginTop: 12 }}>
                {error}
              </p>
            )}
            <button
              type="button"
              className="sticker-btn primary block"
              style={{ marginTop: 14 }}
              disabled={busy || !/^[0-9A-HJ-NP-Z]{6,8}$/.test(code.trim()) || (role === 'parent' && !pinValid)}
              onClick={handleJoin}
            >
              {busy ? '正在开门…' : '进入桃阅读'}
            </button>
            <button type="button" className="linklike" onClick={() => setMode('choose')}>
              ← 返回
            </button>
          </div>
        ) : (
          <div className="panel">
            <h2>创建新家庭</h2>
            <p>创建后会得到一个 8 位家庭码，家里的平板、手机都能加入</p>
            <label htmlFor="new-parent-pin" className="mono-label" style={{ display: 'block', marginTop: 12 }}>设置家长 PIN</label>
            <input id="new-parent-pin" type="password" inputMode="numeric" autoComplete="new-password" className="field" style={{ width: '100%', marginTop: 8 }} minLength={6} maxLength={12} value={parentPin} onChange={e => setParentPin(e.target.value)} aria-describedby="new-pin-help" />
            <p id="new-pin-help" style={{ fontSize: 13, marginTop: 8 }}>6–12 位数字，供家长登录和管理家庭。请单独保管，不要告诉孩子。</p>
            <label htmlFor="confirm-parent-pin" className="mono-label" style={{ display: 'block', marginTop: 12 }}>再次输入家长 PIN</label>
            <input id="confirm-parent-pin" type="password" inputMode="numeric" autoComplete="new-password" className="field" style={{ width: '100%', marginTop: 8 }} minLength={6} maxLength={12} value={confirmPin} onChange={e => setConfirmPin(e.target.value)} />
            {confirmPin && confirmPin !== parentPin && <p role="status" className="msg">两次 PIN 不一致</p>}
            <label style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginTop: 12, textIndent: 0, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={consented}
                onChange={(e) => setConsented(e.target.checked)}
                style={{ width: 20, height: 20, marginTop: 2, flexShrink: 0 }}
              />
              <span style={{ textIndent: 0 }}>
                我是监护人，已阅读并同意
                <button
                  type="button"
                  className="linklike"
                  style={{ padding: '0 4px' }}
                  onClick={() => navigate('/privacy')}
                >
                  《隐私政策》
                </button>
                （会记录同意版本与时间）
              </span>
            </label>
            {error && (
              <p role="alert" className="msg" style={{ marginTop: 12 }}>
                {error}
              </p>
            )}
            <button
              type="button"
              className="sticker-btn primary block"
              style={{ marginTop: 14 }}
              disabled={busy || !consented || !pinValid || parentPin !== confirmPin}
              onClick={handleCreate}
            >
              {busy ? '正在准备…' : '创建我的家庭'}
            </button>
            <button type="button" className="linklike" onClick={() => setMode('choose')}>
              ← 返回
            </button>
          </div>
        )}

        {mode === 'choose' && (
          <p className="mono-line" style={{ textAlign: 'center', fontSize: 12 }}>
            家庭码只在自己家人之间使用，请放心输入
          </p>
        )}

        <div className="login-explore">
          <button type="button" className="sticker-btn" onClick={() => navigate('/trial')}>无需家庭码，先试读一段</button>
          <button type="button" className="linklike" onClick={() => navigate('/offline')}>打开本机离线书架</button>
        </div>
        <footer className="login-legal">
        <button type="button" className="linklike" style={{ alignSelf: 'center' }} onClick={() => setAgreementOpen(true)}>
          AI 生成内容标识说明
        </button>
        <button type="button" className="linklike" style={{ alignSelf: 'center' }} onClick={() => navigate('/privacy')}>
          隐私政策
        </button>
        </footer>
        </div>
      </div>

      {agreementOpen && (
        <div
          className="sheet-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="AI 生成内容标识说明"
          onKeyDown={onDialogKeyDown}
          onClick={() => setAgreementOpen(false)}
        >
          <div className="sheet-card" ref={dialogRef} onClick={(e) => e.stopPropagation()}>
            <h2>AI 生成内容标识说明</h2>
            <AiContentAgreement />
            <button
              type="button"
              className="sticker-btn primary block"
              style={{ marginTop: 16 }}
              ref={closeBtnRef}
              onClick={() => setAgreementOpen(false)}
            >
              知道啦
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
