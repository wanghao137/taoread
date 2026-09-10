import { useState } from 'react'
import { api, ApiError } from '../../lib/api'
import { TaCard, TaButton, Loading } from '../../components/ui'

export interface BindWizardProps {
  familyId: string
  token: string
  /** 绑定成功（携带掩码尾号）回调 */
  onBound: (maskedTail: string) => void
}

/** 绑定向导（第 9 夜）：三步图文引导，key 只输一次、只回显尾 4 位 */
export function BindWizard({ familyId, token, onBound }: BindWizardProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [apiKey, setApiKey] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function submit() {
    setBusy(true)
    setError(null)
    try {
      const result = await api.bindWeread(familyId, token, apiKey.trim())
      onBound(result.maskedTail)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : '绑定没有成功，请稍后再试')
    } finally {
      setBusy(false)
    }
  }

  return (
    <TaCard>
      <h3 className="mb-3 text-lg font-bold">绑定微信读书</h3>
      {step === 1 && (
        <div className="flex flex-col gap-3 text-base text-ink-secondary">
          <p>第一步：在自己手机上打开「微信读书」App → 我 → 设置</p>
          <p>第二步：找到「账号与安全」里的 API Key（需要先开启）</p>
          <p>第三步：复制 wrk- 开头的钥匙，回到这里粘贴</p>
          <TaButton className="mt-2" onClick={() => setStep(2)}>
            我拿到钥匙了
          </TaButton>
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-col gap-3">
          <label htmlFor="api-key" className="text-base text-ink-secondary">
            粘贴 wrk- 开头的钥匙（只在本机保存，页面上只显示尾 4 位）
          </label>
          <input
            id="api-key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            autoComplete="off"
            placeholder="wrk-…"
            className="h-14 w-full rounded-2xl border border-night-border bg-night-700 px-4 text-base"
          />
          <p className="text-base text-ink-secondary">钥匙输入时会隐藏显示，防止旁人看到</p>
          {error && (
            <p role="alert" className="text-base text-peach-300">
              {error}
            </p>
          )}
          <TaButton
            className="w-full"
            loading={busy}
            disabled={!/^wrk-[\w-]{8,}$/.test(apiKey.trim())}
            onClick={() => void submit()}
          >
            绑定
          </TaButton>
          <TaButton variant="ghost" size="md" onClick={() => setStep(1)}>
            ← 上一步
          </TaButton>
        </div>
      )}
      {step === 3 && <Loading label="正在和微信读书握手…" />}
    </TaCard>
  )
}
