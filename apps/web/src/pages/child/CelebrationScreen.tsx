import { motion } from 'framer-motion'
import type { UnlockDto } from '../../lib/api'
import { UNLOCK_EMOJI, unlockCopy } from '../../lib/finish'
import { TaCard, TaButton } from '../../components/ui'

export interface CelebrationScreenProps {
  unlocked: UnlockDto[]
  /** 回到月亮门（会话已收尾，门屏将是全新的一晚） */
  onBack: () => void
}

/** 收尾庆祝：纪念式成就展示（无兑换语义，docs/02 §3.4） */
export function CelebrationScreen({ unlocked, onBack }: CelebrationScreenProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
      <motion.span
        aria-hidden
        className="text-7xl"
        initial={{ rotate: -20, scale: 0.5, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 14 }}
      >
        🌙
      </motion.span>

      <h2 className="text-2xl font-bold leading-relaxed">
        今晚的故事
        <br />
        <span className="text-moon-400">稳稳收好啦</span>
      </h2>

      {unlocked.length > 0 && (
        <div className="flex w-full max-w-sm flex-col gap-3" aria-live="polite">
          {unlocked.map((u, i) => (
            <motion.div
              key={`${u.kind}-${u.value}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.25 }}
            >
              <TaCard className="flex items-center gap-4">
                <span aria-hidden className="text-4xl">
                  {UNLOCK_EMOJI[u.kind] ?? '⭐'}
                </span>
                <span className="text-left text-lg font-bold leading-snug">
                  {unlockCopy(u)}
                </span>
              </TaCard>
            </motion.div>
          ))}
        </div>
      )}

      {unlocked.length === 0 && (
        <p className="text-base text-ink-secondary">每一次共读，都在点亮属于你们的小宇宙</p>
      )}

      <TaButton className="mt-2" onClick={onBack}>
        回到月亮
      </TaButton>
    </div>
  )
}
