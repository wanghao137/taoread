import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { api, ApiError } from '../lib/api'
import { ROLE_LABEL, type DeviceRole } from '../lib/roles'
import { useSession } from '../stores/session'
import { useReducedMotion } from '../lib/motion'
import { IconFamily, IconPeach } from '../components/ui/icons'
import { TaButton, TaCard, TaSheet, TaSticker } from '../components/ui'
import { TaoMascot } from '../components/art/SceneArt'
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

export function LoginPage() {
  const navigate = useNavigate()
  const signIn = useSession((s) => s.signIn)
  const reduced = useReducedMotion()
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

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center px-5 py-10">
      {/* 纸与桃：柔和有机色块氛围层（docs/22），纯 CSS 零加载、reduced 友好 */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-paper-100">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-terra-50 blur-3xl" />
        <div className="absolute -right-20 top-1/3 h-60 w-60 rounded-full bg-kraft-300/25 blur-3xl" />
        <div className="absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-terra-100/70 blur-3xl" />
      </div>
      <header className="mb-10 text-center">
        {/* 品牌桃子 logo 贴纸：硬墨线 + 硬偏移阴影（neobrutalism 视觉锚点） */}
        <motion.img
          src="/brand/logo-256.png"
          alt="桃阅读"
          className="mx-auto mb-4 h-20 w-20 rounded-3xl border-2 border-ink shadow-card"
          animate={reduced ? undefined : { rotate: [0, -3, 0, 3, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="flex items-center justify-center gap-2">
          <TaoMascot mood="happy" className="h-9 w-9" />
          <h1 className="bg-terra-gradient bg-clip-text font-display text-3xl font-bold tracking-wide text-transparent">
            桃阅读
          </h1>
        </div>
        <p className="mt-2 text-ink-700">孩子的阅读游乐园，白天晚上都能读</p>
      </header>

      {createdCode ? (
        <TaCard aria-live="polite">
          <h2 className="text-center text-xl font-bold">家庭创建好啦</h2>
          <p className="mt-2 text-center text-ink-700">
            把家庭码念给家里的另一台设备，就能一起加入
          </p>
          <p
            data-testid="family-code"
            className="my-6 text-center font-display text-4xl font-bold tracking-[0.3em] text-terra-600"
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
            <p className="mb-4 text-base text-ink-700">选择这次的故事从谁开始</p>
            <div className="flex gap-3">
              {(Object.keys(ROLE_LABEL) as DeviceRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  aria-pressed={role === r}
                  className={`flex-1 cursor-pointer rounded-2xl border-2 p-4 text-center transition-colors ${
                    role === r
                      ? 'border-terra-500 bg-terra-50 shadow-card'
                      : 'border-ink bg-paper-200'
                  }`}
                >
                  <span aria-hidden className="block text-3xl">
                    {r === 'parent' ? <IconFamily size={30} /> : <IconPeach size={30} />}
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
          <p className="mt-1 text-base text-ink-700">8 位家庭码在创建家庭的设备上</p>
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
            className="mt-4 h-16 w-full rounded-2xl border-2 border-ink bg-paper-200 text-center text-2xl font-bold tracking-[0.35em] placeholder:text-ink-700/70 focus:outline-none focus:ring-2 focus:ring-terra-500"
          />
          <div className="mt-4 flex justify-center gap-2">
            <TaSticker icon={<IconFamily size={22} />} label="爸爸妈妈" active={role === 'parent'} onClick={() => setRole('parent')} />
            <TaSticker icon={<IconPeach size={22} />} label="小朋友" active={role === 'child'} onClick={() => setRole('child')} />
          </div>
          {error && (
            <p role="alert" className="mt-4 text-center text-base text-terra-600">
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
          <p className="mt-1 text-base text-ink-700">
            创建后会得到一个 8 位家庭码，家里的平板、手机都能加入
          </p>
          {error && (
            <p role="alert" className="mt-4 text-center text-base text-terra-600">
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
        <p className="mt-8 text-center text-base text-ink-700">
          家庭码只在自己家人之间使用，请放心输入
        </p>
      )}

      {/* 合规（第八条）：使用前可见的 AI 生成内容标识说明 */}
      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => setAgreementOpen(true)}
          className="text-sm text-ink-700 underline underline-offset-2"
        >
          AI 生成内容标识说明
        </button>
      </div>
      <TaSheet open={agreementOpen} onClose={() => setAgreementOpen(false)} title="AI 生成内容标识说明">
        <AiContentAgreement />
        <TaButton className="mt-6 w-full" onClick={() => setAgreementOpen(false)}>
          知道啦
        </TaButton>
      </TaSheet>
    </main>
  )
}
