import { motion } from 'framer-motion'
import { TaoMascot } from '../../components/art/SceneArt'

export interface BedtimeScreenProps {
  /** 有未收尾会话时给出期待感提示（不催促） */
  hasActive: boolean
  /** 休息窗口内保留收尾通道（读了就要算数——隐性惩罚红线，N8-008） */
  onFinish?: () => void
}

/** 休息时间管控屏（原就寝屏）：正向告别，无惩罚语义——阅读是全天候的，这里只提醒「该休息啦」 */
export function BedtimeScreen({ hasActive, onFinish }: BedtimeScreenProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
      <motion.div
        aria-hidden
        className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-ink border-2 bg-sky shadow-card"
        animate={{ opacity: [1, 0.75, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <TaoMascot mood="sleepy" className="h-24 w-24" />
      </motion.div>

      <h2 className="text-2xl font-bold leading-relaxed">
        休息时间到啦
        <br />
        <span className="text-ink-700">明天再见咯</span>
      </h2>

      <p className="text-base text-ink-700">
        {hasActive
          ? '这次的故事先收在这里，明天接着讲'
          : '明天同一时间，我们继续读书'}
      </p>

      {hasActive && onFinish && (
        <button
          type="button"
          onClick={onFinish}
          className="min-h-touch cursor-pointer rounded-xl px-4 text-base text-ink-700 underline underline-offset-4"
        >
          先把这次的故事收好
        </button>
      )}

      <p className="text-sm text-ink-700">睡饱饱，明天精神满满</p>
    </div>
  )
}
