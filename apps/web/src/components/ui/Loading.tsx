import { motion } from 'framer-motion'

/** 加载态（design-system §7）：月亮呼吸 + 正向文案 + aria-busy */
export function Loading({ label = '月亮正在升起…' }: { label?: string }) {
  return (
    <div aria-busy="true" aria-live="polite" className="flex flex-col items-center gap-4 py-16">
      <motion.div
        aria-hidden
        className="flex h-16 w-16 items-center justify-center rounded-full bg-moon-300 text-3xl shadow-[0_0_40px_rgba(255,217,122,0.35)]"
        animate={{ scale: [1, 1.12, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        🌙
      </motion.div>
      <p className="text-ink-secondary">{label}</p>
    </div>
  )
}
