import { motion } from 'framer-motion'
import { TaCard, TaButton } from '../../components/ui'

export interface ReadyScreenProps {
  title: string
  cover?: string
  /** 选定 → 出发卡（3-2-1 倒计时 + 阅读通道） */
  onDepart: () => void
}

/** 选定确认：选好啦 → 出发（完整出发仪式在 DepartureScreen，第 7 夜） */
export function ReadyScreen({ title, cover, onDepart }: ReadyScreenProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
      <motion.span
        aria-hidden
        className="text-7xl"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      >
        🌟
      </motion.span>

      <h2 className="text-2xl font-bold leading-relaxed">
        选好啦！
        <br />
        <span className="text-moon-400">《{title}》</span>
      </h2>

      <TaCard className="w-full">
        <div className="mx-auto mb-4 h-28 w-24 overflow-hidden rounded-xl bg-night-700">
          {cover ? (
            <img src={cover} alt="" className="h-full w-full object-cover" onError={(e) => { e.currentTarget.style.visibility = 'hidden' }} />
          ) : (
            <span aria-hidden className="flex h-full w-full items-center justify-center text-5xl">
              📖
            </span>
          )}
        </div>
        <TaButton className="w-full" onClick={onDepart}>
          出发去读 →
        </TaButton>
        <p className="mt-3 text-base text-ink-secondary">和爸爸妈妈说一声，一起读吧 🍑</p>
      </TaCard>
    </div>
  )
}
