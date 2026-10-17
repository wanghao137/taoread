import type { ReactNode } from 'react'
import { IconChevronDown } from './icons'

export function DisclosureSummary({ icon, title, hint }: { icon: ReactNode; title: string; hint: string }) {
  return <summary className="disclosure-summary">
    <span className="disclosure-icon" aria-hidden="true">{icon}</span>
    <span className="disclosure-copy"><span className="disclosure-title">{title}</span><span className="disclosure-hint">{hint}</span></span>
    <IconChevronDown className="disclosure-chevron" size={18} />
  </summary>
}
