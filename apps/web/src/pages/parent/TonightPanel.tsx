import { useCallback, useEffect, useRef, useState } from 'react'
import { IconBookOpen } from '../../components/ui/icons'
import { api, ApiError, type ChildDto, type ReadingCardDto } from '../../lib/api'
import { Loading, ErrorState, TaCard, TaSticker } from '../../components/ui'

export interface TonightPanelProps {
  token: string
  childrenList: ChildDto[]
}

interface ChildTonight {
  child: ChildDto
  state: 'loading' | 'idle' | 'reading' | 'error'
  card?: ReadingCardDto['card']
  message?: string
}

/** 今晚页（第 9 夜）：每个孩子今晚的共读状态 + 家长侧共读卡（讲什么/问什么/聊什么） */
export function TonightPanel({ token, childrenList }: TonightPanelProps) {
  const [rows, setRows] = useState<ChildTonight[]>(
    childrenList.map((child) => ({ child, state: 'loading' })),
  )

  // N9-201：挂载/刷新即拉取；卸载与刷新按钮触发时置 false，陈旧响应不再覆盖状态
  const aliveRef = useRef({ value: true })

  const load = useCallback(() => {
    aliveRef.current = { value: true }
    const alive = aliveRef.current
    setRows(childrenList.map((child) => ({ child, state: 'loading' })))
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
  }, [childrenList, token])

  const loadRef = useRef(load)
  loadRef.current = load
  useEffect(() => {
    loadRef.current()
    return () => {
      aliveRef.current.value = false
    }
  }, [load])

  function reload() {
    load()
  }

  if (childrenList.length === 0) {
    return (
      <p className="text-base text-ink-700">
        还没有小读者档案——去设置里添加，今晚就能开始
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-ink-700">今晚的共读卡</h3>
        <button
          type="button"
          onClick={reload}
          className="min-h-[3rem] cursor-pointer rounded-xl px-4 text-base text-terra-600"
        >
          刷新
        </button>
      </div>

      {rows.map((row) => (
        <TaCard key={row.child.id}>
          <p className="mb-2 text-lg font-bold">
            {row.child.nickname}（{row.child.stage}）
          </p>
          {row.state === 'loading' && <Loading label="看一眼今晚…" />}
          {row.state === 'error' && <ErrorState message={row.message} onRetry={reload} />}
          {row.state === 'idle' && (
            <p className="text-base text-ink-700">
              今晚还没开始——请小读者在他们的设备上点亮月亮
            </p>
          )}
          {row.state === 'reading' && row.card && (
            <div className="flex flex-col gap-3 text-base leading-relaxed">
              <p className="font-bold text-terra-600">《{row.card.bookTitle}》</p>
              <div>
                <p className="flex items-center gap-1.5 font-bold"><IconBookOpen size={16} /> 讲什么</p>
                <ul className="mt-1 list-disc pl-5 text-ink-700">
                  {row.card.tellPoints.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-bold">💬 问什么</p>
                <ul className="mt-1 list-disc pl-5 text-ink-700">
                  {row.card.questions.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
              </div>
              {row.card.hook && (
                <div>
                  <p className="font-bold">🍵 聊什么</p>
                  <p className="mt-1 text-ink-700">{row.card.hook}</p>
                </div>
              )}
              <div className="flex flex-wrap gap-2 pt-1">
                <TaSticker emoji="🌿" label="讲完就可以收尾啦" />
              </div>
            </div>
          )}
        </TaCard>
      ))}
    </div>
  )
}
