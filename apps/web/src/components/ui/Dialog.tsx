import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
const activeDialogs: HTMLElement[] = []
const background = new Map<HTMLElement, { inert: boolean; aria: string | null }>()
let originalOverflow = ''
function isolateDialogs() {
  const top = activeDialogs[activeDialogs.length - 1]?.parentElement
  for (const node of [...document.body.children] as HTMLElement[]) {
    if (!background.has(node)) background.set(node, { inert: node.inert, aria: node.getAttribute('aria-hidden') })
    const saved = background.get(node)!
    const hidden = !!top && node !== top
    node.inert = hidden ? true : saved.inert
    if (hidden) node.setAttribute('aria-hidden', 'true')
    else if (saved.aria == null) node.removeAttribute('aria-hidden')
    else node.setAttribute('aria-hidden', saved.aria)
  }
  document.body.style.overflow = top ? 'hidden' : originalOverflow
  if (!top) background.clear()
}

/** One modal contract for reading, family activities and parent confirmation. */
export function Dialog({ label, onClose, children, dismissable = true, className = 'sheet-card' }: {
  label: string; onClose: () => void; children: ReactNode; dismissable?: boolean; className?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const close = useRef(onClose)
  close.current = onClose
  useEffect(() => {
    const panel = ref.current
    if (!panel) return
    const previous = document.activeElement as HTMLElement | null
    if (!activeDialogs.length) originalOverflow = document.body.style.overflow
    activeDialogs.push(panel)
    isolateDialogs()
    const items = () => [...panel.querySelectorAll<HTMLElement>('button:not(:disabled),input:not(:disabled),select,textarea,a[href],[tabindex="0"]')]
      .filter((el) => el.getClientRects().length > 0 && !el.closest('[aria-hidden="true"]'))
    ;(items()[0] ?? panel).focus()
    const key = (e: KeyboardEvent) => {
      if (activeDialogs[activeDialogs.length - 1] !== panel) return
      if (e.key === 'Escape' && dismissable) { e.preventDefault(); e.stopPropagation(); close.current(); return }
      if (e.key !== 'Tab') return
      const controls = items()
      if (!controls.length) { e.preventDefault(); panel.focus(); return }
      const first = controls[0]!, last = controls[controls.length - 1]!
      if (e.shiftKey && (document.activeElement === first || !panel.contains(document.activeElement))) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && (document.activeElement === last || !panel.contains(document.activeElement))) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', key, true)
    return () => {
      document.removeEventListener('keydown', key, true)
      const index = activeDialogs.indexOf(panel)
      if (index >= 0) activeDialogs.splice(index, 1)
      isolateDialogs()
      if (previous?.isConnected && !previous.closest('[inert]')) previous.focus()
    }
  }, [dismissable])
  return createPortal(
    <div className="sheet-backdrop" onClick={(e) => { e.stopPropagation(); if (dismissable && e.target === e.currentTarget) onClose() }}>
      <section ref={ref} role="dialog" aria-modal="true" aria-label={label} tabIndex={-1} className={className}>
        <div className="dialog-heading"><h2>{label}</h2>{dismissable && <button type="button" onClick={onClose} aria-label={`关闭${label}`}>关闭</button>}</div>
        {children}
      </section>
    </div>, document.body,
  )
}
