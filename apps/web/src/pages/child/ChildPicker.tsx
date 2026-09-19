import { motion } from 'framer-motion'
import { TaCard } from '../../components/ui'
import type { ChildDto } from '../../lib/api'

/** 多孩家庭：孩子档案选择（单孩自动绑定，不进此屏） */
export function ChildPicker({
  children,
  onPick,
}: {
  children: ChildDto[]
  onPick: (child: { childId: string; stage: string }) => void
}) {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-1 text-center text-2xl font-bold"
      >
        今天是谁的故事时间？
      </motion.h2>
      <p className="mb-6 text-center text-ink-700">点点你的名字，月亮就亮啦</p>
      <div className="flex flex-col gap-3">
        {children.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
          >
            <TaCard className="p-0">
              <button
                type="button"
                onClick={() => onPick({ childId: c.id, stage: c.stage })}
                className="min-h-touch flex w-full cursor-pointer items-center justify-center gap-3 rounded-3xl text-xl font-bold"
              >
                {/* 首字头像：暖色底 + 昵称首字，替代 emoji（跨平台渲染一致） */}
                <span
                  aria-hidden
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-terra-50 font-display text-lg text-terra-600"
                >
                  {c.nickname.slice(0, 1)}
                </span>
                {c.nickname}
              </button>
            </TaCard>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
