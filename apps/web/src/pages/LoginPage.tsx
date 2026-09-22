import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, ApiError } from '../lib/api'
import { ROLE_LABEL, type DeviceRole } from '../lib/roles'
import { useSession } from '../stores/session'
import { IconFamily, IconPeach } from '../components/ui/icons'
import { AiContentAgreement } from './AiContentAgreement'

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
  const signIn = useSession((s) => s.signIn)
  const [mode, setMode] = useState<Mode>('choose')
  const [code, setCode] = useState('')
  const [role, setRole] = useState<DeviceRole>('parent')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [agreementOpen, setAgreementOpen] = useState(false)
  const [createdCode, setCreatedCode] = useState<string | null>(null)

  async function enter(path: '/child' | '/parent', session: { token: string; familyId: string; familyCode: string }) {
    signIn({ token: session.token, familyId: session.familyId, familyCode: session.familyCode, role })
    navigate(path, { replace: true })
  }

  async function handleJoin() {
    setBusy(true)
    setError(null)
    try {
      const session = await api.joinFamily(code.trim().toUpperCase(), role, deviceId())
      await enter(role === 'child' ? '/child' : '/parent', session)
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
      const session = await api.createFamily(deviceId())
      setCreatedCode(session.familyCode)
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

  return (
    <div className="app">
      <div className="wrap login-wrap">
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
            <p>把家庭码念给家里的另一台设备，就能一起加入</p>
            <p data-testid="family-code" className="code-display">
              {createdCode}
            </p>
            <button type="button" className="sticker-btn primary block" onClick={() => navigate('/parent', { replace: true })}>
              进入家长端
            </button>
          </div>
        ) : mode === 'choose' ? (
          <>
            <div className="panel">
              <h2>今天谁来讲故事？</h2>
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
            <p>6-8 位家庭码在创建家庭的设备上</p>
            <label htmlFor="family-code" className="mono-label" style={{ display: 'block', marginTop: 12 }}>
              家庭码
            </label>
            <input
              id="family-code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              maxLength={8}
              autoComplete="off"
              placeholder="ABCD2345"
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
            {error && (
              <p role="alert" className="msg" style={{ marginTop: 12 }}>
                {error}
              </p>
            )}
            <button type="button" className="sticker-btn primary block" style={{ marginTop: 14 }} disabled={busy} onClick={handleCreate}>
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
      </div>

      {agreementOpen && (
        <div
          className="sheet-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="AI 生成内容标识说明"
          onClick={() => setAgreementOpen(false)}
        >
          <div className="sheet-card" onClick={(e) => e.stopPropagation()}>
            <h2>AI 生成内容标识说明</h2>
            <AiContentAgreement />
            <button type="button" className="sticker-btn primary block" style={{ marginTop: 16 }} onClick={() => setAgreementOpen(false)}>
              知道啦
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
