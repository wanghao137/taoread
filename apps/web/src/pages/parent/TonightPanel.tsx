import { useCallback, useEffect, useRef, useState } from 'react'
import { api, ApiError, type ChildDto, type ReadingCardDto } from '../../lib/api'
import { Loading, ErrorState } from '../../components/ui'

export interface TonightPanelProps {
  token: string
  childrenList: ChildDto[]
  /** 外部刷新计数（ParentHome 每 15s 静默轮询）：变化即原地重拉，不闪整页 loading */
  refreshKey?: number
}

interface ChildTonight {
  child: ChildDto
  state: 'loading' | 'idle' | 'reading' | 'error'
  card?: ReadingCardDto['card']
  message?: string
}

/** 今天页：每个孩子今天的共读状态 + 家长侧共读卡（讲什么/问什么/聊什么，v8 对话气泡） */
export function TonightPanel({ token, childrenList, refreshKey }: TonightPanelProps) {
  const [rows, setRows] = useState<ChildTonight[]>(
    childrenList.map((child) => ({ child, state: 'loading' })),
  )

  // N9-201：挂载/刷新即拉取；卸载与刷新按钮触发时置 false，陈旧响应不再覆盖状态
  const aliveRef = useRef({ value: true })

  const load = useCallback(
    (opts?: { silent?: boolean }) => {
      aliveRef.current = { value: true }
      const alive = aliveRef.current
      // 静默刷新（轮询）：不把行打回 loading，原地等新数据
      if (!opts?.silent) setRows(childrenList.map((child) => ({ child, state: 'loading' })))
      void Promise.all(
        childrenList.map(async (child) => {
          try {
            const { session } = await api.activeCosession(child.id, token)
            if (!alive.value) return
            if (!session) {
              setRows((prev) =>
                prev.map((r) => (r.child.id === child.id ? { child, state: 'idle' } : r)),
              )
              return
            }
            const { card } = await api.readingCard(session.id, token)
            if (!alive.value) return
            setRows((prev) =>
              prev.map((r) => (r.child.id === child.id ? { child, state: 'reading', card } : r)),
            )
          } catch (err) {
            if (!alive.value) return
            // 静默轮询失败不打断当前内容：保住上一轮数据，等下一轮再试
            if (opts?.silent) return
            setRows((prev) =>
              prev.map((r) =>
                r.child.id === child.id
                  ? {
                      child,
                      state: 'error',
                      message: err instanceof ApiError ? err.message : undefined,
                    }
                  : r,
              ),
            )
          }
        }),
      )
    },
    [childrenList, token],
  )

  const loadRef = useRef(load)
  loadRef.current = load
  // 首次挂载/孩子列表变化：全量加载（行级 loading）
  useEffect(() => {
    loadRef.current()
    return () => {
      aliveRef.current.value = false
    }
  }, [load])

  // 外部静默轮询：跳过首挂，计数变化即原地重拉
  const lastRefreshKey = useRef(refreshKey)
  useEffect(() => {
    if (refreshKey === undefined || refreshKey === lastRefreshKey.current) return
    lastRefreshKey.current = refreshKey
    loadRef.current({ silent: true })
  }, [refreshKey])

  function reload() {
    load()
  }

  if (childrenList.length === 0) {
    return (
      <div className="panel">
        <p>还没有小读者档案——去设置里添加，马上就能开始</p>
      </div>
    )
  }

  return (
    <section>
      <div className="section-head">
        <h3>今天的共读卡</h3>
        <button type="button" className="sticker-btn sm" style={{ marginLeft: 'auto' }} onClick={reload}>
          刷新
        </button>
      </div>

      {/* 宽屏：每个孩子一张贴纸卡，两列排开；移动端一列 */}
      <div className="tonight-grid">
        {rows.map((row) => (
          <article key={row.child.id} className="panel">
            <div className="row-head">
              <span aria-hidden className="avatar big">
                {row.child.nickname.slice(0, 1)}
              </span>
              <b>
                {row.child.nickname}（{row.child.stage}）
              </b>
            </div>
            {row.state === 'loading' && <Loading label="看一眼今天…" />}
            {row.state === 'error' && <ErrorState message={row.message} onRetry={reload} />}
            {row.state === 'idle' && (
              <p>今天还没开始——请小读者在自己的设备上按「去选书」</p>
            )}
            {row.state === 'reading' && row.card && (
              <>
                <div className="speech-list">
                  <div className="speech-row">
                    <span aria-hidden className="avatar">
                      讲
                    </span>
                    <div className="speech">
                      <time>讲什么</time>
                      <ul>
                        {row.card.tellPoints.map((t, i) => (
                          <li key={i}>{t.trim()}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="speech-row">
                    <span aria-hidden className="avatar">
                      问
                    </span>
                    <div className="speech">
                      <time>问什么</time>
                      <ul>
                        {row.card.questions.map((q, i) => (
                          <li key={i}>{q.trim()}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {row.card.hook && (
                    <div className="speech-row">
                      <span aria-hidden className="avatar">
                        聊
                      </span>
                      <div className="speech">
                        <time>聊什么</time>
                        <p>{row.card.hook}</p>
                      </div>
                    </div>
                  )}
                </div>
                <p style={{ marginTop: 12 }}>
                  <span className="tag mint">讲完就可以收尾啦</span>
                </p>
              </>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
