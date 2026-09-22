import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, ApiError, type ChildDto, type FamilySettingsDto } from '../../lib/api'
import { useSession } from '../../stores/session'
import { Loading, ErrorState } from '../../components/ui'
import { BindWizard } from './BindWizard'
import { PageHead } from '../child/V8App'

export interface SettingsPanelProps {
  familyId: string
  token: string
  /** 注销成功 → 清会话回登录 */
  onDeleted: () => void
  /** 数据变化（孩子增删/绑定变化）→ 父级刷新 */
  onChanged: () => void
  /** 外部变更计数（绑定成功后父级刷新视图） */
  revision?: number
}

const BEDTIME_PRESETS = [
  { value: 1260, label: '21:00' },
  { value: 1290, label: '21:30' },
  { value: 1320, label: '22:00' },
  { value: null, label: '跟随默认' },
] as const

const CAP_PRESETS = [
  { value: 300, label: '5 分钟' },
  { value: 600, label: '10 分钟' },
  { value: null, label: '跟随默认' },
] as const

/** 设置页（v8 贴纸绘本）：绑定向导 / 小读者管理 / 休息时间 / 安静模式 / AI 披露 / 注销家庭 */
export function SettingsPanel({ familyId, token, onDeleted, onChanged, revision }: SettingsPanelProps) {
  const navigate = useNavigate()
  const signOut = useSession((s) => s.signOut)
  const setCalmMode = useSession((s) => s.setCalmMode)
  const [view, setView] = useState<FamilyView>({ kind: 'loading' })
  const [settings, setSettings] = useState<FamilySettingsDto | null>(null)
  /** 家长码（T02/F01）：家长加入的第二凭据，仅家长会话可见/可轮换 */
  const [parentCode, setParentCode] = useState<string | null>(null)
  const [codeCopied, setCodeCopied] = useState(false)
  const [newNickname, setNewNickname] = useState('')
  const [newStage, setNewStage] = useState('6-8')
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    void Promise.all([api.familyView(familyId, token), api.getSettings(familyId, token)])
      .then(([viewDto, settingsDto]) => {
        if (!alive) return
        setView({ kind: 'ready', view: viewDto })
        setSettings(settingsDto)
      })
      .catch((err: unknown) => {
        if (alive)
          setView({ kind: 'error', message: err instanceof ApiError ? err.message : undefined })
      })
    // 家长码独立拉取：失败只隐藏家长码卡，不拖垮整页设置（审计教训）
    api
      .getParentCode(familyId, token)
      .then((codeDto) => alive && setParentCode(codeDto.parentCode))
      .catch(() => undefined)
    return () => {
      alive = false
    }
  }, [familyId, token, revision])

  async function run<T>(action: () => Promise<T>, okMessage?: string): Promise<T | undefined> {
    setBusy(true)
    setMessage(null)
    try {
      const result = await action()
      if (okMessage) setMessage(okMessage)
      return result
    } catch (err) {
      setMessage(err instanceof ApiError ? err.message : '操作没有成功，请稍后再试')
      return undefined
    } finally {
      setBusy(false)
    }
  }

  async function handleDeleteFamily() {
    if (!confirmDelete) {
      setConfirmDelete(true)
      return
    }
    setBusy(true)
    try {
      await api.deleteFamily(familyId, token)
      signOut()
      onDeleted()
      navigate('/login', { replace: true })
    } catch (err) {
      setMessage(err instanceof ApiError ? err.message : '注销没有成功，请稍后再试')
      setBusy(false)
    }
  }

  function body() {
    if (view.kind === 'loading') return <Loading label="设置赶来中…" />
    if (view.kind === 'error') return <ErrorState message={view.message} onRetry={onChanged} />

    return (
      <div className="set-grid">
        {/* 家长码（T02/F01）：家长加入的第二凭据，仅家长会话可见；泄露即轮换 */}
        {parentCode ? (
          <div className="panel">
            <h3>家长码</h3>
            <p>另一台家长设备凭此码加入，家庭码只给孩子的设备用</p>
            <p data-testid="parent-code" className="code-display" style={{ fontSize: 30, letterSpacing: '0.2em' }}>
              {parentCode}
            </p>
            <div className="setting-row">
              <button
                type="button"
                className="sticker-btn sm"
                onClick={() => {
                  void navigator.clipboard?.writeText(parentCode).catch(() => undefined)
                  setCodeCopied(true)
                  setTimeout(() => setCodeCopied(false), 1500)
                }}
              >
                {codeCopied ? '✓ 已复制' : '复制'}
              </button>
              <button
                type="button"
                className="sticker-btn sm"
                disabled={busy}
                onClick={() =>
                  void run(() => api.rotateParentCode(familyId, token)).then((r) => {
                    if (r) setParentCode(r.parentCode)
                  })
                }
              >
                重新生成
              </button>
            </div>
            <p className="mono-line" style={{ marginTop: 8, fontSize: 11 }}>
              重新生成后旧家长码立即作废，已加入的设备不受影响
            </p>
          </div>
        ) : null}
        {view.view.binding ? (
          <div className="panel">
            <h3>微信读书</h3>
            <p data-testid="binding-status">
              微信读书已绑定（{view.view.binding.maskedTail}）
              {view.view.binding.status === 'unverified' && ' · 待验证'}
            </p>
            <p className="mono-line" style={{ fontSize: 11 }}>
              API Key 加密保存到家庭账户，仅用于连接微信读书；页面只显示尾四位
            </p>
          </div>
        ) : (
          <BindWizard familyId={familyId} token={token} onBound={() => onChanged()} />
        )}

        <div className="panel">
          <h3>小读者</h3>
          {view.view.children.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
              {view.view.children.map((c: ChildDto) => (
                <div key={c.id} className="kid-row">
                  <span>
                    {c.nickname}（{c.stage}）
                  </span>
                  <button
                    type="button"
                    className="sticker-btn sm"
                    disabled={busy}
                    onClick={() =>
                      void run(
                        () => api.deleteChildDoc(familyId, token, c.id),
                        '已移除',
                      ).then((r) => r !== undefined && onChanged())
                    }
                  >
                    移除
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="setting-row">
            <input
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
              placeholder="昵称"
              maxLength={20}
              aria-label="小读者昵称"
              className="field"
              style={{ width: 132 }}
            />
            <select
              value={newStage}
              onChange={(e) => setNewStage(e.target.value)}
              aria-label="年龄段"
              className="field"
            >
              <option value="3-5">3-5 岁</option>
              <option value="6-8">6-8 岁</option>
              <option value="9-12">9-12 岁</option>
            </select>
            <button
              type="button"
              className="sticker-btn primary sm"
              disabled={newNickname.trim().length < 1 || busy}
              onClick={() =>
                void run(
                  () => api.addChild(familyId, token, newNickname.trim(), newStage),
                  '添加成功',
                ).then((r) => {
                  if (r !== undefined) {
                    setNewNickname('')
                    onChanged()
                  }
                })
              }
            >
              添加
            </button>
          </div>
        </div>

        <div className="panel">
          <h3>
            <span className="tag mint" style={{ marginRight: 8, verticalAlign: 'middle' }}>
              家长可控
            </span>
            休息时间
          </h3>
          <p>
            到点后孩子端会温和收尾（先读完当前这一段，再安心停下），几点收尾由你说了算
          </p>
          <div className="setting-row" style={{ marginTop: 12 }}>
            {BEDTIME_PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                className={`filter ${settings?.bedtimeMin === p.value ? 'on' : ''}`}
                aria-pressed={settings?.bedtimeMin === p.value}
                disabled={busy}
                onClick={() =>
                  void run(() => api.updateSettings(familyId, token, { bedtimeMin: p.value })).then(
                    (r) => r && setSettings(r),
                  )
                }
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="setting-row" style={{ marginTop: 10 }}>
            {CAP_PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                className={`filter ${settings?.overtimeCapSec === p.value ? 'on' : ''}`}
                aria-pressed={settings?.overtimeCapSec === p.value}
                disabled={busy}
                onClick={() =>
                  void run(() =>
                    api.updateSettings(familyId, token, { overtimeCapSec: p.value }),
                  ).then((r) => r && setSettings(r))
                }
              >
                单次 {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="panel">
          <h3>安静模式</h3>
          <p>
            开启后，孩子端所有翻页、摇晃、弹跳都会变成最轻柔的淡入淡出。适合容易晕动或对动态画面敏感的孩子，
            关闭后恢复原来的活泼效果。
          </p>
          <div className="setting-row" style={{ marginTop: 12 }}>
            {[
              { value: false, label: '保持活泼' },
              { value: true, label: '安静模式' },
            ].map((p) => (
              <button
                key={p.label}
                type="button"
                className={`filter ${(settings?.calmMode ?? false) === p.value ? 'on' : ''}`}
                aria-pressed={(settings?.calmMode ?? false) === p.value}
                disabled={busy}
                onClick={() =>
                  void run(() => api.updateSettings(familyId, token, { calmMode: p.value })).then(
                    (r) => {
                      if (r) {
                        setSettings(r)
                        setCalmMode(r.calmMode === true)
                      }
                    },
                  )
                }
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="panel">
          <h3>AI 生成内容说明</h3>
          <p>
            桃阅读中的绘本插画、拟人化朗读配音和「让画面动起来」动画由人工智能生成，文本内容为公版书籍原文。
          </p>
          <ul style={{ margin: '10px 0 0', paddingLeft: 18, fontSize: 14, color: 'var(--ink2)' }}>
            <li>· 插画：AI 绘画模型生成，每幅画在生成时已标注来源</li>
            <li>· 朗读：AI 语音合成，非真人录音</li>
            <li>· 动画：AI 视频模型生成</li>
          </ul>
          <p className="mono-line" style={{ marginTop: 10, fontSize: 11, lineHeight: 1.7 }}>
            依据《人工智能生成合成内容标识办法》（2025 年 9 月 1 日起施行），我们在家长侧向您披露上述内容由人工智能生成。
          </p>
        </div>

        <div className="panel" style={{ background: 'var(--paper)' }}>
          <h3>注销家庭</h3>
          <p>删除全部家庭数据（书架记录、共读记录、成就），不可恢复</p>
          <button
            type="button"
            className={`sticker-btn ${confirmDelete ? 'hot' : ''}`}
            style={{ marginTop: 12 }}
            disabled={busy}
            onClick={() => void handleDeleteFamily()}
          >
            {confirmDelete ? '再点一次确认注销' : '注销家庭'}
          </button>
        </div>

        {message && (
          <p role="status" aria-live="polite" className="msg">
            {message}
          </p>
        )}
      </div>
    )
  }

  return (
    <div>
      <PageHead index="04" title="设置" sub="绑定微信读书、小读者档案、休息时间与家庭注销" />
      {body()}
    </div>
  )
}

type FamilyView =
  | { kind: 'loading' }
  | { kind: 'error'; message?: string }
  | { kind: 'ready'; view: import('../../lib/api').FamilyViewDto }
