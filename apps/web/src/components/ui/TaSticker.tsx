import type { ReactNode } from 'react'

export interface TaStickerProps {
  /** 贴纸图形：传图标组件节点（UI 红线不用 emoji 字形） */
  icon: ReactNode
  label: string
  active?: boolean
  onClick?: () => void
}

/** 心情/标签贴纸：可点击时为 button（触达 ≥64px 红线），否则纯展示 chip */
export function TaSticker({ icon, label, active = false, onClick }: TaStickerProps) {
  const base = `inline-flex items-center gap-2 rounded-full border px-4 py-2 text-base transition-colors ${
    active
      ? 'border-terra-500 bg-terra-50 text-terra-700'
      : 'border-paper-border bg-paper-100 text-ink-700'
  }`
  if (!onClick) {
    return (
      <span className={base}>
        <span aria-hidden className="flex h-6 w-6 items-center justify-center">{icon}</span>
        {label}
      </span>
    )
  }
  return (
    <button type="button" onClick={onClick} aria-pressed={active} className={`${base} min-h-touch cursor-pointer`}>
      <span aria-hidden className="flex h-6 w-6 items-center justify-center">{icon}</span>
      {label}
    </button>
  )
}
