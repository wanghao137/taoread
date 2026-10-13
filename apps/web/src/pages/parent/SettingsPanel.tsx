import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, ApiError, type ChildDto, type DeviceSessionDto, type FamilySettingsDto } from '../../lib/api'
import { useSession } from '../../stores/session'
import { Loading, ErrorState } from '../../components/ui'
import { BindWizard } from './BindWizard'
import { PageHead } from '../child/V8App'
import { FeedbackForm, FeedbackHistory, WeeklyPlan } from '../../components/ReadingSupport'
import { RecordRestore } from '../../components/RecordRestore'

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
  const [sessionsError, setSessionsError] = useState(false)
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
    setSessions(null)
    setSessionsError(false)
    api
      .listSessions(familyId, token)
      .then((dto) => alive && setSessions(dto.sessions))
      .catch(() => { if (alive) setSessionsError(true) })
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
        <nav className="settings-jump" aria-label="设置分类"><a href="#setting-readers">小读者</a><a href="#setting-reading">阅读习惯</a><a href="#setting-data">数据与隐私</a><a href="#setting-danger">注销家庭</a></nav>
        {sessionsError && <div role="alert" className="panel">设备列表没有加载成功。<button className="sticker-btn" onClick={onChanged}>重新加载</button></div>}
        {/* 已登录设备（A1/F04）：只显示活跃设备（已请出的历史记录不再刷屏）；
            家长可撤销任意设备，撤销后该设备令牌立即失效 */}
        {sessions && sessions.some((s) => !s.revokedAt) ? (
          <div className="panel" data-testid="device-sessions">
            <h3>已登录设备</h3>
            <p>所有设备都凭家庭码加入。最多保留 20 个活跃设备，继续加入时最早的设备会退出；发现陌生设备可立即请出。</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
              {sessions.filter((s) => !s.revokedAt).map((session) => (
                <div key={session.id} className="kid-row">
                  <span>
                    {session.label ?? (session.current ? '本机' : session.role === 'parent' ? '家长设备' : '孩子设备')}
                    {session.current ? ' · 当前设备' : ''}
                    <small style={{ display: 'block' }}>最近活动：{new Date(session.lastSeenAt ?? session.createdAt).toLocaleString('zh-CN')}</small>
                    {session.revokedAt ? ' · 已请出' : ''}
                  </span>
                  <button className="sticker-btn sm" disabled={busy} onClick={() => { const label = window.prompt('给设备起个名字（如：客厅平板）', session.label ?? ''); if (label?.trim()) void run(() => api.nameDevice(familyId, session.id, label.trim(), token)).then(r => { if (r) onChanged() }) }}>命名</button>
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
            <p className="mono-line" style={{ marginTop: 8, fontSize: 12 }}>
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
            <p className="mono-line" style={{ fontSize: 12 }}>
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

          <div className="panel" id="setting-readers">
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

        <div className="panel" id="setting-reading">
          <h3>每日阅读提醒</h3>
          <p>
            按阅读活动开始到收尾之间经过的时间提醒休息，包含听读、暂停及未收尾时的离开时间；跨午夜只计入当天部分。这不是注意力或实际盯屏时长测量。提醒不会强制停止阅读，留空表示不限时。
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

        <div className="panel" id="setting-data">
          <h3>导出家庭数据</h3>
          <p>版本 2 JSON 包含孩子档案、阅读记录、精确位置、已同步书签和家庭书解析文字，可恢复到空家庭。不含原始上传文件、插画、音频和登录凭据；完整系统恢复需要运营备份。请妥善保管包含家庭阅读内容的导出文件。</p>
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
          <RecordRestore token={token} familyId={familyId} onChanged={onChanged} />
        </div>

        <div className="panel">
          <h3>AI 生成内容说明</h3>
          <p>
            插画、合成朗读和动画可能由 AI 生成。正文包括公版原作、译文、节选、改编与原创，部分译文使用 AI 辅助；每本书的来源说明和审校状态分别展示，机器校验不等于人工审校。
          </p>
          <ul style={{ margin: '10px 0 0', paddingLeft: 18, fontSize: 14, color: 'var(--ink2)' }}>
            <li>· 插画：AI 绘画模型生成，每幅画在生成时已标注来源</li>
            <li>· 朗读：AI 语音合成，非真人录音</li>
            <li>· 动画：AI 视频模型生成</li>
          </ul>
          <p className="mono-line" style={{ marginTop: 10, fontSize: 12, lineHeight: 1.7 }}>
            依据《人工智能生成合成内容标识办法》（2025 年 9 月 1 日起施行），我们在家长侧向您披露上述内容由人工智能生成。
          </p>
        </div>

        <FeedbackForm token={token} />
        <FeedbackHistory token={token} />
        {view.view.children.map(child => <div key={child.id}><h3>{child.nickname}的共读安排</h3><WeeklyPlan token={token} childId={child.id} /></div>)}
        <div className="panel settings-danger" id="setting-danger" style={{ background: 'var(--paper)' }}>
          <h3>注销家庭</h3>
          <p>注销当前家庭，删除线上数据库中的家庭书正文与阅读记录，撤销媒体访问权，并使所有设备退出。原始上传文件、媒体和历史备份需由部署者清理，目前备份没有自动到期删除期限。其他设备上的离线副本需自行清除。操作不可撤销，请先导出需要的记录。</p>
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
