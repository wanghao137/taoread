import { useState } from 'react'
import { api, ApiError } from '../../lib/api'
import { Loading } from '../../components/ui'

export interface BindWizardProps {
  familyId: string
  token: string
  /** 绑定成功（携带掩码尾号）回调 */
  onBound: (maskedTail: string) => void
}

/**
 * 绑定向导状态机（V8 Phase 6 重构）：v8 贴纸绘本面板（2026-09-21 家长端重构）。
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
    <div className="panel">
      <h3>绑定微信读书</h3>

      {step === 1 && (
        <div>
          <p>第一步：在自己手机上打开「微信读书」App → 我 → 设置</p>
          <p style={{ marginTop: 6 }}>第二步：找到「账号与安全」里的 API Key（需要先开启）</p>
          <p style={{ marginTop: 6 }}>第三步：复制 wrk- 开头的钥匙，回到这里粘贴</p>
          <p className="mono-line" style={{ marginTop: 8, fontSize: 11, lineHeight: 1.7 }}>
            API Key 加密保存到家庭账户，仅用于连接微信读书；页面只显示尾四位。
          </p>
          <button type="button" className="sticker-btn primary block" style={{ marginTop: 14 }} onClick={() => setStep(2)}>
            我拿到钥匙了
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <label htmlFor="api-key" style={{ fontSize: 14, color: 'var(--ink2)', display: 'block' }}>
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
            className="field block"
            style={{ width: '100%', marginTop: 10 }}
          />
          <p style={{ marginTop: 8, fontSize: 14, color: 'var(--ink2)' }}>
            钥匙输入时会隐藏显示，防止旁人看到
          </p>
          {submitting ? (
            <Loading label="正在验证钥匙…" />
          ) : (
            <>
              {error && (
                <p role="alert" className="msg" style={{ marginTop: 10 }}>
                  {error}
                </p>
              )}
              <button
                type="button"
                className="sticker-btn primary block"
                style={{ marginTop: 14 }}
                disabled={!/^wrk-[\w-]{8,}$/.test(apiKey.trim())}
                onClick={() => void submit()}
              >
                绑定
              </button>
              <button type="button" className="linklike" style={{ marginTop: 6 }} onClick={() => setStep(1)}>
                ← 上一步
              </button>
            </>
          )}
        </div>
      )}

      {step === 3 && (
        <div>
          <p style={{ fontWeight: 700 }}>绑定成功</p>
          <p data-testid="masked-tail" style={{ marginTop: 6 }}>
            API Key 已加密保存到家庭账户，仅用于连接微信读书；页面只显示尾四位：{maskedTail}
          </p>
          <div className="setting-row" style={{ marginTop: 12 }}>
            <button type="button" className="sticker-btn sm" onClick={rebind}>
              重新绑定
            </button>
            {/* 解绑接口本版未提供：留禁用按钮并注明，避免死链假动作 */}
            <button type="button" className="sticker-btn sm" disabled title="解绑即将支持">
              解绑（即将支持）
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
