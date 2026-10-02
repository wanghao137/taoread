import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, ApiError } from '../lib/api'
import { ROLE_LABEL, type DeviceRole } from '../lib/roles'
import { useSession } from '../stores/session'
import { IconFamily, IconPeach } from '../components/ui/icons'
import { AiContentAgreement } from './AiContentAgreement'
import { PRIVACY_VERSION } from './PrivacyPage'
import { Dialog } from '../components/ui/Dialog'

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

function randomGate(): { a: number; b: number } {
  return { a: 3 + Math.floor(Math.random() * 7), b: 3 + Math.floor(Math.random() * 7) }
}

type Mode = 'choose' | 'join' | 'create'

/** 登录入口（v8 贴纸绘本语言）：品牌 mast + 贴纸面板 + 药丸按钮，与孩子端/家长端同一套 token */
export function LoginPage() {
  const navigate = useNavigate()
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
  // docs/34 P1-1：家长门——进家长端前答一道乘算题（防孩子误入，不新增凭据）
  const [gate, setGate] = useState<{ a: number; b: number } | null>(null)
  const [gateAnswer, setGateAnswer] = useState('')
  const [gateError, setGateError] = useState<string | null>(null)
  const gatePassRef = useRef<(() => void) | null>(null)

  function askParentGate(action: () => void) {
    gatePassRef.current = action
    setGate(randomGate())
    setGateAnswer('')
    setGateError(null)
  }

  function tryGate() {
    if (!gate) return
    const answer = Number.parseInt(gateAnswer, 10)
    if (answer === gate.a * gate.b) {
      const action = gatePassRef.current
      setGate(null)
      gatePassRef.current = null
      action?.()
    } else {
      setGateError('不对哦，再算一次')
      setGate(randomGate())
      setGateAnswer('')
    }
  }

  async function enter(path: '/child' | '/parent', session: { token: string; familyId: string; familyCode: string }) {
    signIn({ token: session.token, familyId: session.familyId, familyCode: session.familyCode, role })
    navigate(path, { replace: true })
  }

  async function handleJoin() {
    setBusy(true)
    setError(null)
    try {
      const session = await api.joinFamily(code.trim().toUpperCase(), role, deviceId())
      if (role === 'parent') {
        // 家长门（docs/34 P1-1）：单一家庭码形态下，这道题是孩子误入家长端的唯一软闸
        askParentGate(() => {
          signIn({ token: session.token, familyId: session.familyId, familyCode: session.familyCode, role })
          navigate('/parent', { replace: true })
        })
        return
      }
      await enter('/child', session)
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
      const session = await api.createFamily(deviceId(), PRIVACY_VERSION)
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
      <button key={r} type="button" className={`role-pick ${role === r ? 'on' : ''}`} aria-pressed={role === r} onClick={() => setRole(r)}>
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
    <div className="app">
      <div className="wrap login-wrap" id="main-content">
        {/* 品牌锚点唯一：桃子 logo 贴纸卡 + 字标（与孩子端 v8 壳同一 mast 语言） */}
        <header className="login-brand">
          <div className="logo big">
            <img src="/brand/logo-256.png" alt="桃阅读" />
          </div>
          <h1>桃阅读</h1>
          <p className="mono-line" style={{ fontSize: 11 }}>
            贴纸绘本 · 儿童阅读空间
          </p>
        </header>

        {createdCode ? (
          <div className="panel" aria-live="polite" style={{ textAlign: 'center' }}>
            <h2>家庭创建好啦</h2>
            <p>一个家庭码，全家通用——家长选「家长」进入，孩子选「孩子」进入</p>
            <p className="mono-label" style={{ marginTop: 10 }}>家庭码 · 全家通用</p>
            <p data-testid="family-code" className="code-display">
              {createdCode.familyCode}
            </p>
            <button
              type="button"
              className="sticker-btn primary block"
              onClick={() => askParentGate(() => navigate('/parent', { replace: true }))}
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
            <p>家庭码在创建家庭的设备上，家长和孩子用同一个码</p>
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
            {error && (
              <p role="alert" className="msg" style={{ marginTop: 12 }}>
                {error}
              </p>
            )}
            <button
              type="button"
              className="sticker-btn primary block"
              style={{ marginTop: 14 }}
              disabled={busy || !/^[0-9A-HJ-NP-Z]{6,8}$/.test(code.trim())}
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
              disabled={busy || !consented}
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
          <p className="mono-line" style={{ textAlign: 'center', fontSize: 11 }}>
            家庭码只在自己家人之间使用，请放心输入
          </p>
        )}

        {/* 合规（第八条）：使用前可见的 AI 生成内容标识说明 */}
        <button type="button" className="linklike" style={{ alignSelf: 'center' }} onClick={() => setAgreementOpen(true)}>
          AI 生成内容标识说明
        </button>
        <button type="button" className="linklike" style={{ alignSelf: 'center' }} onClick={() => navigate('/privacy')}>
          隐私政策
        </button>
        <button type="button" className="linklike" onClick={() => navigate('/offline')}>打开本机离线书架</button>
      </div>

      {/* 家长门（docs/34 P1-1）：一道乘算题，防孩子拿到家庭码后误入家长端 */}
      {gate ? (
        <Dialog label="家长确认" onClose={() => { setGate(null); gatePassRef.current = null }}>
          <div className="sheet-card" onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center' }}>
            <h2>请大人来回答</h2>
            <p>这道题给爸爸妈妈——小朋友去选「小朋友」就好啦</p>
            <p className="code-display" aria-live="polite">
              {gate.a} × {gate.b} = ?
            </p>
            <input
              className="field code-input"
              style={{ width: '100%', marginTop: 8 }}
              inputMode="numeric"
              autoComplete="off"
              aria-label="计算结果"
              value={gateAnswer}
              onChange={(e) => setGateAnswer(e.target.value.replace(/[^\d]/g, ''))}
              onKeyDown={(e) => {
                if (e.key === 'Enter') tryGate()
              }}
            />
            {gateError && (
              <p role="alert" className="msg" style={{ marginTop: 8 }}>
                {gateError}
              </p>
            )}
            <button type="button" className="sticker-btn primary block" style={{ marginTop: 12 }} disabled={!gateAnswer} onClick={tryGate}>
              确认进入家长端
            </button>
            <button type="button" className="linklike" style={{ marginTop: 8 }} onClick={() => setGate(null)}>
              ← 我先不进了
            </button>
          </div>
        </Dialog>
      ) : null}

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
