import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, ApiError, type ChildDto, type FamilySettingsDto } from '../../lib/api'
import { useSession } from '../../stores/session'
import { TaCard, TaButton, Loading, ErrorState } from '../../components/ui'
import { BindWizard } from './BindWizard'
import { resetOnboarding } from '../child/OnboardingTour'

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

/** 设置页：绑定向导 / 小读者管理 / 休息时间 / 注销家庭 */
export function SettingsPanel({ familyId, token, onDeleted, onChanged, revision }: SettingsPanelProps) {
  const navigate = useNavigate()
  const signOut = useSession((s) => s.signOut)
  const setCalmMode = useSession((s) => s.setCalmMode)
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
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start">
        {view.view.binding ? (
          <p className="text-base text-ink-700 lg:col-span-2" data-testid="binding-status">
            微信读书已绑定（{view.view.binding.maskedTail}）
            {view.view.binding.status === 'unverified' && ' · 待验证'}
          </p>
        ) : (
          <div className="lg:col-span-2">
            <BindWizard familyId={familyId} token={token} onBound={() => onChanged()} />
          </div>
        )}

        <TaCard className="shadow-xs">
          <h3 className="mb-3 text-lg font-bold">小读者</h3>
          {view.view.children.length > 0 && (
            <div className="mb-4 flex flex-col gap-2">
              {view.view.children.map((c: ChildDto) => (
                <div
                  key={c.id}
                  className="flex min-h-touch items-center justify-between rounded-2xl border-ink border-2 bg-paper-300/60 px-4"
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
              className="h-12 w-32 rounded-xl border-ink border-2 bg-paper-300 px-3 text-base"
            />
            <select
              value={newStage}
              onChange={(e) => setNewStage(e.target.value)}
              aria-label="年龄段"
              className="h-12 rounded-xl border-ink border-2 bg-paper-300 px-3 text-base"
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
          <h3 className="mb-1 text-lg font-bold">
            <span className="mr-2 inline-block -rotate-2 rounded-lg border-ink border-[1.5px] bg-mint px-1.5 py-0.5 align-middle text-xs font-bold text-ink-900">
              家长可控
            </span>
            休息时间
          </h3>
          <p className="mb-3 text-base text-ink-700">
            到点后孩子端会温和收尾（先读完当前这一段，再安心停下），几点收尾由你说了算
          </p>
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

        <TaCard>
          <h3 className="mb-1 text-lg font-bold">安静模式</h3>
          <p className="mb-3 text-base text-ink-700">
            开启后，孩子端所有翻页、摇晃、弹跳都会变成最轻柔的淡入淡出。适合容易晕动或对动态画面敏感的孩子，
            关闭后恢复原来的活泼效果。
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { value: false, label: '保持活泼' },
              { value: true, label: '安静模式' },
            ].map((p) => (
              <TaButton
                key={p.label}
                size="md"
                variant={(settings?.calmMode ?? false) === p.value ? 'primary' : 'secondary'}
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
              </TaButton>
            ))}
          </div>
        </TaCard>

        <TaCard>
          <h3 className="mb-1 text-lg font-bold">孩子端引导</h3>
          <p className="mb-3 text-base text-ink-700">
            第一次打开桃阅读时，孩子会看到三步小引导（首页、书架、喇叭）。想让孩子再看一遍，按下面这个按钮。
          </p>
          <TaButton
            size="md"
            variant="secondary"
            onClick={() => {
              resetOnboarding()
              setMessage('下次孩子打开时，会重新看到引导')
            }}
          >
            重新播放引导
          </TaButton>
        </TaCard>

        <TaCard>
          <h3 className="mb-2 text-lg font-bold">AI 生成内容说明</h3>
          <p className="mb-3 text-base text-ink-700">
            桃阅读中的绘本插画、拟人化朗读配音和「让画面动起来」动画由人工智能生成，文本内容为公版书籍原文。
          </p>
          <ul className="flex flex-col gap-1.5 text-base text-ink-700">
            <li>· 插画：AI 绘画模型生成，每幅画在生成时已标注来源</li>
            <li>· 朗读：AI 语音合成，非真人录音</li>
            <li>· 动画：AI 视频模型生成</li>
          </ul>
          <p className="mt-3 text-sm text-ink-700/70">
            依据《人工智能生成合成内容标识办法》（2025 年 9 月 1 日起施行），我们在家长侧向您披露上述内容由人工智能生成。
          </p>
        </TaCard>

        <TaCard className="border-terra-300">
          <h3 className="mb-2 text-lg font-bold">注销家庭</h3>
          <p className="mb-3 text-base text-ink-700">
            删除全部家庭数据（书架记录、共读记录、成就），不可恢复
          </p>
          <TaButton variant="secondary" disabled={busy} onClick={() => void handleDeleteFamily()}>
            {confirmDelete ? '再点一次确认注销' : '注销家庭'}
          </TaButton>
        </TaCard>

        {message && (
          <p role="status" aria-live="polite" className="text-center text-base text-terra-600">
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
