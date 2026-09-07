import { TaCard } from '../../components/ui'
import type { ChildDto } from '../../lib/api'

/** 多孩家庭：孩子档案选择（单孩自动绑定，不进此屏） */
export function ChildPicker({
  children,
  onPick,
}: {
  children: ChildDto[]
  onPick: (childId: string) => void
}) {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <h2 className="mb-1 text-center text-2xl font-bold">今天是谁的故事时间？</h2>
      <p className="mb-6 text-center text-ink-secondary">点点你的名字，月亮就亮啦</p>
      <div className="flex flex-col gap-3">
        {children.map((c) => (
          <TaCard key={c.id} className="p-0">
            <button
              type="button"
              onClick={() => onPick(c.id)}
              className="min-h-touch flex w-full cursor-pointer items-center justify-center gap-3 rounded-3xl text-xl font-bold"
            >
              <span aria-hidden className="text-3xl">
                {c.stage === '3-5' ? '🧒' : c.stage === '6-8' ? '👧' : '👦'}
              </span>
              {c.nickname}
            </button>
          </TaCard>
        ))}
      </div>
    </div>
  )
}
