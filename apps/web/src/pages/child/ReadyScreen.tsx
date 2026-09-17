import { motion } from 'framer-motion'
import { TaCard, TaButton } from '../../components/ui'
import { SceneArt, TaoMascot } from '../../components/art/SceneArt'

export interface ReadyScreenProps {
  title: string
  cover?: string
  bookId?: string
  /** 选定 → 出发卡（3-2-1 倒计时 + 阅读通道） */
  onDepart: () => void
  /** 有 bookId 时可逛金句星球（第 11 夜 M-C） */
  onStarSea?: () => void
}

/** 选定确认：选好啦 → 出发（完整出发仪式在 DepartureScreen，第 7 夜） */
export function ReadyScreen({ title, cover, bookId, onDepart, onStarSea }: ReadyScreenProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
      <motion.div
        aria-hidden
        className="h-24 w-24"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      >
        <TaoMascot mood="excited" className="h-24 w-24" />
      </motion.div>

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
            <SceneArt scene="bookshelf" className="h-full w-full" />
          )}
        </div>
        <TaButton className="w-full" onClick={onDepart}>
          出发去读 →
        </TaButton>
        {bookId && onStarSea && (
          <TaButton variant="ghost" size="md" className="mt-2 w-full" onClick={onStarSea}>
            去金句星球看看
          </TaButton>
        )}
        <p className="mt-3 text-base text-ink-secondary">和爸爸妈妈说一声，一起读吧</p>
      </TaCard>
    </div>
  )
}
