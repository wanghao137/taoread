import type { ReactNode } from 'react'
import { Dialog } from './Dialog'

export interface TaSheetProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

/** All sheets share the product dialog visual, focus and scroll contract. */
export function TaSheet({ open, onClose, title, children }: TaSheetProps) {
  if (!open) return null
  return <Dialog label={title} onClose={onClose}>{children}</Dialog>
}
