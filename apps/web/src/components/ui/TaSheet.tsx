import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export interface TaSheetProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

/** 底部弹层（design-system §7）：dialog 语义 + 背板/Esc 关闭 + reduced-motion 自动降级 */
export function TaSheet({ open, onClose, title, children }: TaSheetProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.button
            aria-label="关闭弹层"
            className="absolute inset-0 w-full cursor-default bg-night-900/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-4xl border-t border-night-border bg-night-800 p-5 pb-10"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 38 }}
          >
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-night-border" aria-hidden />
            <h2 className="mb-4 text-center text-xl font-bold leading-tight">{title}</h2>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
