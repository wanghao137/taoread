import { motion } from 'framer-motion'
import { TaoMascot } from '../../components/art/SceneArt'

export interface BedtimeScreenProps {
  /** 有未收尾会话时给出期待感提示（不催促） */
  hasActive: boolean
  /** 就寝窗口内保留收尾通道（读了就要算数——隐性惩罚红线，N8-008） */
  onFinish?: () => void
}

/** 睡觉模式（第 8 夜护眼限制）：月亮睡了——正向告别，无惩罚语义 */
export function BedtimeScreen({ hasActive, onFinish }: BedtimeScreenProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
      <motion.div
        aria-hidden
        className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-paper-300 shadow-inner"
        animate={{ opacity: [1, 0.75, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <TaoMascot mood="sleepy" className="h-24 w-24" />
      </motion.div>

      <h2 className="text-2xl font-bold leading-relaxed">
        月亮睡觉啦
        <br />
        <span className="text-ink-700">星星也打了个哈欠</span>
      </h2>

      <p className="text-base text-ink-700">
        {hasActive
          ? '今晚的故事先睡在这里，明晚接着讲'
          : '明晚同一时间，我们继续读书'}
      </p>

      {hasActive && onFinish && (
        <button
          type="button"
          onClick={onFinish}
          className="min-h-touch cursor-pointer rounded-xl px-4 text-base text-ink-700 underline underline-offset-4"
        >
          先把今晚的故事收好
        </button>
      )}

      <p className="text-sm text-ink-700">晚安，做个有故事的好梦</p>
    </div>
  )
}
