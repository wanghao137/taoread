import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, ApiError, type ChildDto, type DeviceSessionDto, type FamilySettingsDto } from '../../lib/api'
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

/** 设置页（v8 贴纸绘本）：绑定向导 / 小读者管理 / 安静模式 / AI 披露 / 注销家庭。
 * 2026-09-25：家长码与「休息时间」随阅读时间限制取消一并移除（docs/31）。 */
export function SettingsPanel({ familyId, token, onDeleted, onChanged, revision }: SettingsPanelProps) {
  const navigate = useNavigate()
  const signOut = useSession((s) => s.signOut)
  const setCalmMode = useSession((s) => s.setCalmMode)
  const [view, setView] = useState<FamilyView>({ kind: 'loading' })
  const [settings, setSettings] = useState<FamilySettingsDto | null>(null)
  /** 已登录设备（A1/F04）：列表 + 单设备撤销 */
  const [sessions, setSessions] = useState<DeviceSessionDto[] | null>(null)
  const [newNickname, setNewNickname] = useState('')
  const [newStage, setNewStage] = useState('6-8')
  const [confirmDelete, setConfirmDelete] = useState(false)
  /** 注销二次确认：重输家庭码（知道码的人才能删库，防孩子/访客误触） */
  const [deleteCode, setDeleteCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  // docs/34 P0-9：编辑孩子档案（PATCH 服务端此前无 UI 入口）
  const [editingChild, setEditingChild] = useState<{ id: string; nickname: string; stage: string } | null>(null)
  // docs/34 P1-2：每日阅读提醒上限（分钟；空=不限）
  const [limitDraft, setLimitDraft] = useState('')

  useEffect(() => {
    let alive = true
    void Promise.all([api.familyView(familyId, token), api.getSettings(familyId, token)])
      .then(([viewDto, settingsDto]) => {
        if (!alive) return
        setView({ kind: 'ready', view: viewDto })
        setSettings(settingsDto)
        setLimitDraft(settingsDto.dailyReadingLimitMin ? String(settingsDto.dailyReadingLimitMin) : '')
      })
      .catch((err: unknown) => {
        if (alive)
          setView({ kind: 'error', message: err instanceof ApiError ? err.message : undefined })
      })
    // 设备列表独立拉取：失败只隐藏设备卡
    api
      .listSessions(familyId, token)
      .then((dto) => alive && setSessions(dto.sessions))
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
      await api.deleteFamily(familyId, token, deleteCode.trim())
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
        {/* 已登录设备（A1/F04）：只显示活跃设备（已请出的历史记录不再刷屏）；
            家长可撤销任意设备，撤销后该设备令牌立即失效 */}
        {sessions && sessions.some((s) => !s.revokedAt) ? (
          <div className="panel" data-testid="device-sessions">
            <h3>已登录设备</h3>
            <p>所有设备都凭家庭码加入；发现陌生设备可立即请出</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
              {sessions.filter((s) => !s.revokedAt).map((session) => (
                <div key={session.id} className="kid-row">
                  <span>
                    {session.current ? '本机' : session.role === 'parent' ? '家长设备' : '孩子设备'}
                    {session.deviceId ? ` · ${session.deviceId}` : ''}
                    {session.revokedAt ? ' · 已请出' : ''}
                  </span>
                  {!session.current && !session.revokedAt ? (
                    <button
                      type="button"
                      className="sticker-btn sm"
                      disabled={busy}
                      data-testid={`revoke-${session.role}`}
                      onClick={() =>
                        void run(() => api.revokeSession(familyId, session.id, token), '已请出该设备').then((r) => {
                          if (r !== undefined)
                            setSessions((prev) =>
                              prev ? prev.map((s) => (s.id === session.id ? { ...s, revokedAt: new Date().toISOString() } : s)) : prev,
                            )
                        })
                      }
                    >
                      请出
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
            <p className="mono-line" style={{ marginTop: 8, fontSize: 11 }}>
              被请出的设备会马上退出登录，并从上面的列表收起；再次加入需要家庭码
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
            <button
              type="button"
              className="sticker-btn sm"
              style={{ marginTop: 8 }}
              disabled={busy}
              onClick={() =>
                void run(() => api.unbindWeread(familyId, token), '已解绑，书架将在下次同步后消失').then((r) => {
                  if (r !== undefined) onChanged()
                })
              }
            >
              解绑
            </button>
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
                  {editingChild?.id === c.id ? (
                    <>
                      <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
                        <input
                          value={editingChild.nickname}
                          onChange={(e) => setEditingChild({ ...editingChild, nickname: e.target.value })}
                          maxLength={20}
                          aria-label="修改昵称"
                          className="field"
                          style={{ width: 110 }}
                        />
                        <select
                          value={editingChild.stage}
                          onChange={(e) => setEditingChild({ ...editingChild, stage: e.target.value })}
                          aria-label="修改年龄段"
                          className="field"
                        >
                          <option value="3-5">3-5 岁</option>
                          <option value="6-8">6-8 岁</option>
                          <option value="9-12">9-12 岁</option>
                        </select>
                      </span>
                      <span style={{ display: 'inline-flex', gap: 6 }}>
                        <button
                          type="button"
                          className="sticker-btn primary sm"
                          disabled={busy || editingChild.nickname.trim().length < 1}
                          onClick={() =>
                            void run(
                              () =>
                                api.updateChildDoc(c.id, token, {
                                  nickname: editingChild.nickname.trim(),
                                  stage: editingChild.stage,
                                }),
                              '已保存',
                            ).then((r) => {
                              if (r !== undefined) {
                                setEditingChild(null)
                                onChanged()
                              }
                            })
                          }
                        >
                          保存
                        </button>
                        <button type="button" className="sticker-btn sm" onClick={() => setEditingChild(null)}>
                          取消
                        </button>
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        {c.nickname}（{c.stage}）
                      </span>
                      <span style={{ display: 'inline-flex', gap: 6 }}>
                        <button
                          type="button"
                          className="sticker-btn sm"
                          onClick={() => setEditingChild({ id: c.id, nickname: c.nickname, stage: c.stage })}
                        >
                          编辑
                        </button>
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
                      </span>
                    </>
                  )}
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
          <h3>每日阅读提醒</h3>
          <p>
            约定孩子每天一共读多久。到时间后孩子端会出现一张「该休息啦」的温柔卡片（不强制锁死），连续阅读 25 分钟也会有护眼眨眼提醒。留空 = 不限时。
          </p>
          <div className="setting-row" style={{ marginTop: 12 }}>
            <input
              value={limitDraft}
              onChange={(e) => setLimitDraft(e.target.value.replace(/[^\d]/g, '').slice(0, 3))}
              inputMode="numeric"
              aria-label="每日阅读提醒上限（分钟）"
              placeholder="不限"
              className="field"
              style={{ width: 110 }}
            />
            <span className="mono-label" style={{ alignSelf: 'center' }}>
              分钟 / 天
            </span>
            <button
              type="button"
              className="sticker-btn primary sm"
              disabled={busy}
              onClick={() =>
                void run(() =>
                  api.updateSettings(familyId, token, {
                    dailyReadingLimitMin: limitDraft.trim() === '' ? null : Number.parseInt(limitDraft, 10),
                  }),
                ).then((r) => {
                  if (r) {
                    setSettings(r)
                    setLimitDraft(r.dailyReadingLimitMin ? String(r.dailyReadingLimitMin) : '')
                    setMessage(r.dailyReadingLimitMin ? `已约定每天 ${r.dailyReadingLimitMin} 分钟` : '已改为不限时')
                  }
                })
              }
            >
              保存
            </button>
          </div>
        </div>

        <div className="panel">
          <h3>导出家庭数据</h3>
          <p>把孩子的共读记录、金句、生词导出成一个 JSON 文件——数据是你们自己的。</p>
          <button
            type="button"
            className="sticker-btn"
            style={{ marginTop: 10 }}
            disabled={busy}
            onClick={() =>
              void run(async () => {
                const text = await api.exportFamilyData(familyId, token)
                const blob = new Blob([text], { type: 'application/json' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `taoread-export-${new Date().toISOString().slice(0, 10)}.json`
                a.click()
                URL.revokeObjectURL(url)
                return true
              }, '已开始下载')
            }
          >
            导出 JSON
          </button>
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
          {confirmDelete ? (
            <div className="setting-row" style={{ marginTop: 12 }}>
              <input
                value={deleteCode}
                onChange={(e) => setDeleteCode(e.target.value)}
                placeholder="请输入家庭码确认"
                aria-label="输入家庭码确认注销"
                className="field"
                autoComplete="off"
                maxLength={16}
                style={{ width: 200 }}
              />
              <button
                type="button"
                className="sticker-btn hot"
                disabled={busy || deleteCode.trim().length === 0}
                onClick={() => void handleDeleteFamily()}
              >
                确认注销
              </button>
              <button
                type="button"
                className="sticker-btn sm"
                disabled={busy}
                onClick={() => {
                  setConfirmDelete(false)
                  setDeleteCode('')
                }}
              >
                取消
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="sticker-btn"
              style={{ marginTop: 12 }}
              disabled={busy}
              onClick={() => setConfirmDelete(true)}
            >
              注销家庭
            </button>
          )}
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
      <PageHead index="04" title="设置" sub="绑定微信读书、小读者档案与家庭注销" />
      {body()}
    </div>
  )
}

type FamilyView =
  | { kind: 'loading' }
  | { kind: 'error'; message?: string }
  | { kind: 'ready'; view: import('../../lib/api').FamilyViewDto }
