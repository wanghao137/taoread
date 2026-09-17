import { motion } from 'framer-motion'
import { SceneArt, TaoMascot } from '../art/SceneArt'

/** 加载态（design-system §7 + docs/13 P0-2）：月亮呼吸 + 吉祥物陪伴 + 正向文案 + aria-busy
 *
 * 不识字孩子看不懂「月亮正在升起」这行字——吉祥物是给他们的信号：
 * 「小桃在陪着你，等一下就好」。呼吸节奏刻意 ≥1.6s 低频（Lillard 2011）。 */
export function Loading({ label = '月亮正在升起…' }: { label?: string }) {
  return (
    <div aria-busy="true" aria-live="polite" className="flex flex-col items-center gap-4 py-16">
      <motion.div
        aria-hidden
        className="h-16 w-16 overflow-hidden rounded-full shadow-[0_0_40px_rgba(255,217,122,0.35)]"
        animate={{ scale: [1, 1.12, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <SceneArt scene="loading-moon" />
      </motion.div>
      <TaoMascot mood="sleepy" className="h-14 w-14" />
      <p className="text-ink-secondary">{label}</p>
    </div>
  )
}
