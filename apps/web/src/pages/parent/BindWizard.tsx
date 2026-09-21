import { useState } from 'react'
import { api, ApiError } from '../../lib/api'
import { TaCard, TaButton, Loading } from '../../components/ui'

export interface BindWizardProps {
  familyId: string
  token: string
  /** 绑定成功（携带掩码尾号）回调 */
  onBound: (maskedTail: string) => void
}

/**
 * 绑定向导状态机（V8 Phase 6 重构）：
 * 获取 Key 说明(1) → 输入并绑定(2，提交中禁用) → 正在验证(loading) → 成功(3，显示尾四位 + 重新绑定/解绑)。
 * 失败显示服务端 message，可重试；解绑接口本版未提供，按钮禁用并注明「即将支持」。
 */
export function BindWizard({ familyId, token, onBound }: BindWizardProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [apiKey, setApiKey] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [maskedTail, setMaskedTail] = useState<string | null>(null)

  async function submit() {
    if (submitting) return
    setSubmitting(true)
    setError(null)
    try {
      const result = await api.bindWeread(familyId, token, apiKey.trim())
      setMaskedTail(result.maskedTail)
      setStep(3)
      onBound(result.maskedTail)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : '绑定没有成功，请稍后再试')
    } finally {
      setSubmitting(false)
    }
  }

  function rebind() {
    setApiKey('')
    setError(null)
    setStep(2)
  }

  return (
    <TaCard>
      <h3 className="mb-3 text-lg font-bold">绑定微信读书</h3>

      {step === 1 && (
        <div className="flex flex-col gap-3 text-base text-ink-700">
          <p>第一步：在自己手机上打开「微信读书」App → 我 → 设置</p>
          <p>第二步：找到「账号与安全」里的 API Key（需要先开启）</p>
          <p>第三步：复制 wrk- 开头的钥匙，回到这里粘贴</p>
          <p className="text-sm text-ink-700/80">
            API Key 加密保存到家庭账户，仅用于连接微信读书；页面只显示尾四位。
          </p>
          <TaButton className="mt-2" onClick={() => setStep(2)}>
            我拿到钥匙了
          </TaButton>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-3">
          <label htmlFor="api-key" className="text-base text-ink-700">
            粘贴 wrk- 开头的钥匙（API Key 加密保存到家庭账户，仅用于连接微信读书；页面只显示尾四位）
          </label>
          <input
            id="api-key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            autoComplete="off"
            placeholder="wrk-…"
            disabled={submitting}
            className="h-14 w-full rounded-2xl border border-paper-border bg-paper-300 px-4 text-base disabled:opacity-50"
          />
          <p className="text-base text-ink-700">钥匙输入时会隐藏显示，防止旁人看到</p>
          {submitting ? (
            <Loading label="正在验证钥匙…" />
          ) : (
            <>
              {error && (
                <p role="alert" className="text-base text-terra-600">
                  {error}
                </p>
              )}
              <TaButton
                className="w-full"
                disabled={!/^wrk-[\w-]{8,}$/.test(apiKey.trim())}
                onClick={() => void submit()}
              >
                绑定
              </TaButton>
              <TaButton variant="ghost" size="md" onClick={() => setStep(1)}>
                ← 上一步
              </TaButton>
            </>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-3 text-base text-ink-700">
          <p className="font-bold text-ink-900">绑定成功</p>
          <p data-testid="masked-tail">
            API Key 已加密保存到家庭账户，仅用于连接微信读书；页面只显示尾四位：{maskedTail}
          </p>
          <div className="flex flex-wrap gap-2">
            <TaButton size="md" variant="secondary" onClick={rebind}>
              重新绑定
            </TaButton>
            {/* 解绑接口本版未提供：留禁用按钮并注明，避免死链假动作 */}
            <TaButton size="md" variant="ghost" disabled title="解绑即将支持">
              解绑（即将支持）
            </TaButton>
          </div>
        </div>
      )}
    </TaCard>
  )
}
