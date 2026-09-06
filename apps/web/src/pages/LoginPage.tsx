import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { api, ApiError } from '../lib/api'
import { ROLE_LABEL, type DeviceRole } from '../lib/roles'
import { useSession } from '../stores/session'
import { TaButton, TaCard, TaSticker } from '../components/ui'

function deviceId(): string {
  // 设备标识仅用于展示与统计（后端 did 字段），本地生成不入库身份
  let did = localStorage.getItem('taoread-device')
  if (!did) {
    did = `web-${Math.random().toString(36).slice(2, 10)}`
    localStorage.setItem('taoread-device', did)
  }
  return did
}

type Mode = 'choose' | 'join' | 'create'

export function LoginPage() {
  const navigate = useNavigate()
  const signIn = useSession((s) => s.signIn)
  const [mode, setMode] = useState<Mode>('choose')
  const [code, setCode] = useState('')
  const [role, setRole] = useState<DeviceRole>('parent')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
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

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center px-5 py-10">
      <header className="mb-10 text-center">
        <motion.div
          aria-hidden
          className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-moon-300 text-4xl shadow-[0_0_50px_rgba(255,217,122,0.35)]"
          animate={{ rotate: [0, -6, 0, 6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          🌙
        </motion.div>
        <h1 className="text-3xl font-bold tracking-wide">桃阅读</h1>
        <p className="mt-2 text-ink-secondary">每晚一个故事，和最爱的人一起</p>
      </header>

      {createdCode ? (
        <TaCard aria-live="polite">
          <h2 className="text-center text-xl font-bold">家庭创建好啦</h2>
          <p className="mt-2 text-center text-ink-secondary">
            把家庭码念给家里的另一台设备，就能一起加入
          </p>
          <p
            data-testid="family-code"
            className="my-6 text-center text-4xl font-bold tracking-[0.3em] text-moon-400"
          >
            {createdCode}
          </p>
          <TaButton className="w-full" onClick={() => navigate('/parent', { replace: true })}>
            进入家长端
          </TaButton>
        </TaCard>
      ) : mode === 'choose' ? (
        <div className="flex flex-col gap-4">
          <TaCard>
            <h2 className="mb-1 text-xl font-bold">我来说是…</h2>
            <p className="mb-4 text-sm text-ink-secondary">选择今晚的故事从谁开始</p>
            <div className="flex gap-3">
              {(Object.keys(ROLE_LABEL) as DeviceRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  aria-pressed={role === r}
                  className={`flex-1 cursor-pointer rounded-2xl border p-4 text-center transition-colors ${
                    role === r
                      ? 'border-peach-400 bg-peach-400/15'
                      : 'border-night-border bg-night-700/50'
                  }`}
                >
                  <span aria-hidden className="block text-3xl">
                    {r === 'parent' ? '👨‍👩‍👧' : '🧒'}
                  </span>
                  <span className="mt-2 block text-lg font-bold">{ROLE_LABEL[r]}</span>
                </button>
              ))}
            </div>
            <TaButton className="mt-4 w-full" onClick={() => setMode('join')}>
              输入家庭码加入
            </TaButton>
          </TaCard>
          <TaButton variant="ghost" size="md" onClick={() => setMode('create')}>
            还没有家庭码？创建新家庭 →
          </TaButton>
        </div>
      ) : mode === 'join' ? (
        <TaCard>
          <h2 className="text-xl font-bold">输入家庭码</h2>
          <p className="mt-1 text-sm text-ink-secondary">8 位家庭码在创建家庭的设备上</p>
          <label htmlFor="family-code" className="sr-only">
            家庭码
          </label>
          <input
            id="family-code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            maxLength={8}
            autoComplete="off"
            placeholder="ABCD2345"
            className="mt-4 h-16 w-full rounded-2xl border border-night-border bg-night-700 text-center text-2xl font-bold tracking-[0.35em] placeholder:text-ink-secondary/40"
          />
          <div className="mt-4 flex justify-center gap-2">
            <TaSticker emoji="👨‍👩‍👧" label="爸爸妈妈" active={role === 'parent'} onClick={() => setRole('parent')} />
            <TaSticker emoji="🧒" label="小朋友" active={role === 'child'} onClick={() => setRole('child')} />
          </div>
          {error && (
            <p role="alert" className="mt-4 text-center text-sm text-peach-300">
              {error}
            </p>
          )}
          <TaButton className="mt-5 w-full" loading={busy} disabled={code.trim().length !== 8} onClick={handleJoin}>
            进入桃阅读
          </TaButton>
          <TaButton variant="ghost" size="md" className="mt-2 w-full" onClick={() => setMode('choose')}>
            ← 返回
          </TaButton>
        </TaCard>
      ) : (
        <TaCard>
          <h2 className="text-xl font-bold">创建新家庭</h2>
          <p className="mt-1 text-sm text-ink-secondary">
            创建后会得到一个 8 位家庭码，家里的平板、手机都能加入
          </p>
          {error && (
            <p role="alert" className="mt-4 text-center text-sm text-peach-300">
              {error}
            </p>
          )}
          <TaButton className="mt-5 w-full" loading={busy} onClick={handleCreate}>
            创建我的家庭
          </TaButton>
          <TaButton variant="ghost" size="md" className="mt-2 w-full" onClick={() => setMode('choose')}>
            ← 返回
          </TaButton>
        </TaCard>
      )}

      {mode === 'choose' && (
        <p className="mt-8 text-center text-sm text-ink-secondary">
          家庭码只在自己家人之间使用，请放心输入
        </p>
      )}
    </main>
  )
}
