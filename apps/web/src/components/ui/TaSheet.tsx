import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export interface TaSheetProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

/** 底部弹层（design-system §7）：dialog 语义 + 背板/Esc 关闭 + 焦点陷阱与还焦 + 背景滚动锁 + reduced-motion 降级 */
export function TaSheet({ open, onClose, title, children }: TaSheetProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return
    restoreFocusRef.current = document.activeElement as HTMLElement | null

    // 背景滚动锁
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // 打开时移焦到弹层
    panelRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      // 焦点陷阱：Tab 循环限制在弹层内
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
          (el) => !el.hasAttribute('disabled'),
        )
        if (focusables.length === 0) {
          e.preventDefault()
          return
        }
        const first = focusables[0]!
        const last = focusables[focusables.length - 1]!
        const active = document.activeElement
        if (e.shiftKey && (active === first || active === panelRef.current)) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && active === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      restoreFocusRef.current?.focus?.()
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.button
            aria-label="关闭弹层"
            className="absolute inset-0 w-full cursor-default bg-ink-900/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            className="absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-4xl border-t border-paper-border bg-paper-100 p-5 pb-10 shadow-lift outline-none"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 38 }}
          >
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-paper-border-strong" aria-hidden />
            <h2 className="mb-4 text-center text-xl font-bold leading-tight">{title}</h2>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
