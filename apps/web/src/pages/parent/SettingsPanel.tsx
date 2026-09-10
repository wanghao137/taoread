import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, ApiError, type ChildDto, type FamilySettingsDto } from '../../lib/api'
import { useSession } from '../../stores/session'
import { TaCard, TaButton, Loading, ErrorState } from '../../components/ui'
import { BindWizard } from './BindWizard'

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

/** 设置页（第 9 夜）：绑定向导 / 小读者管理 / 护眼设置 / 注销家庭 */
export function SettingsPanel({ familyId, token, onDeleted, onChanged, revision }: SettingsPanelProps) {
  const navigate = useNavigate()
  const signOut = useSession((s) => s.signOut)
  const [view, setView] = useState<FamilyView>({ kind: 'loading' })
  const [settings, setSettings] = useState<FamilySettingsDto | null>(null)
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
      <div className="flex flex-col gap-4">
        {view.view.binding ? (
          <p className="text-base text-ink-secondary" data-testid="binding-status">
            微信读书已绑定（{view.view.binding.maskedTail}）
            {view.view.binding.status === 'unverified' && ' · 待验证'}
          </p>
        ) : (
          <BindWizard familyId={familyId} token={token} onBound={() => onChanged()} />
        )}

        <TaCard>
          <h3 className="mb-3 text-lg font-bold">小读者</h3>
          {view.view.children.length > 0 && (
            <div className="mb-4 flex flex-col gap-2">
              {view.view.children.map((c: ChildDto) => (
                <div
                  key={c.id}
                  className="flex min-h-touch items-center justify-between rounded-2xl border border-night-border bg-night-700/50 px-4"
                >
                  <span className="text-base">
                    {c.nickname}（{c.stage}）
                  </span>
                  <TaButton
                    size="md"
                    variant="ghost"
                    disabled={busy}
                    onClick={() =>
                      void run(
                        () => api.deleteChildDoc(familyId, token, c.id),
                        '已移除',
                      ).then((r) => r !== undefined && onChanged())
                    }
                  >
                    移除
                  </TaButton>
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-wrap items-center gap-2">
            <input
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
              placeholder="昵称"
              maxLength={20}
              className="h-12 w-32 rounded-xl border border-night-border bg-night-700 px-3 text-base"
            />
            <select
              value={newStage}
              onChange={(e) => setNewStage(e.target.value)}
              aria-label="年龄段"
              className="h-12 rounded-xl border border-night-border bg-night-700 px-3 text-base"
            >
              <option value="3-5">3-5 岁</option>
              <option value="6-8">6-8 岁</option>
              <option value="9-12">9-12 岁</option>
            </select>
            <TaButton
              size="md"
              variant="secondary"
              disabled={newNickname.trim().length < 1 || busy}
              loading={busy}
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
            </TaButton>
          </div>
        </TaCard>

        <TaCard>
          <h3 className="mb-1 text-lg font-bold">护眼设置</h3>
          <p className="mb-3 text-base text-ink-secondary">到点后月亮会去睡觉，孩子端进入晚安模式</p>
          <div className="flex flex-wrap items-center gap-2">
            {BEDTIME_PRESETS.map((p) => (
              <TaButton
                key={p.label}
                size="md"
                variant={settings?.bedtimeMin === p.value ? 'primary' : 'secondary'}
                disabled={busy}
                onClick={() =>
                  void run(() => api.updateSettings(familyId, token, { bedtimeMin: p.value })).then(
                    (r) => r && setSettings(r),
                  )
                }
              >
                {p.label}
              </TaButton>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {CAP_PRESETS.map((p) => (
              <TaButton
                key={p.label}
                size="md"
                variant={settings?.overtimeCapSec === p.value ? 'primary' : 'secondary'}
                disabled={busy}
                onClick={() =>
                  void run(() =>
                    api.updateSettings(familyId, token, { overtimeCapSec: p.value }),
                  ).then((r) => r && setSettings(r))
                }
              >
                单次 {p.label}
              </TaButton>
            ))}
          </div>
        </TaCard>

        <TaCard className="border-peach-500/40">
          <h3 className="mb-2 text-lg font-bold">注销家庭</h3>
          <p className="mb-3 text-base text-ink-secondary">
            删除全部家庭数据（书架记录、共读记录、成就），不可恢复
          </p>
          <TaButton variant="secondary" disabled={busy} onClick={() => void handleDeleteFamily()}>
            {confirmDelete ? '再点一次确认注销' : '注销家庭'}
          </TaButton>
        </TaCard>

        {message && (
          <p role="status" aria-live="polite" className="text-center text-base text-moon-400">
            {message}
          </p>
        )}
      </div>
    )
  }

  return body()
}

type FamilyView =
  | { kind: 'loading' }
  | { kind: 'error'; message?: string }
  | { kind: 'ready'; view: import('../../lib/api').FamilyViewDto }
