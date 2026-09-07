import { motion } from 'framer-motion'
import { TaCard } from '../../components/ui'

export interface ReadyScreenProps {
  title: string
  deepLink?: string
}

/** 选定确认：选好啦 → 出发读吧（deepLink 为网关回包原值）。完整出发仪式第 7 夜点亮 */
export function ReadyScreen({ title, deepLink }: ReadyScreenProps) {
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
        {deepLink ? (
          <a
            href={deepLink}
            target="_blank"
            rel="noreferrer"
            className="bg-peach-gradient min-h-touch flex w-full items-center justify-center rounded-2xl text-lg font-bold text-night-900"
          >
            去读吧 →
          </a>
        ) : (
          <p className="text-ink-secondary">翻开纸书，故事开始啦</p>
        )}
        <p className="mt-3 text-base text-ink-secondary">
          读完回到这里，还有今晚的收尾小仪式（即将点亮）
        </p>
      </TaCard>

      <p className="text-base text-ink-secondary">和爸爸妈妈说一声，一起读吧 🍑</p>
    </div>
  )
}
