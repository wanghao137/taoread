export interface TaStickerProps {
  emoji: string
  label: string
  active?: boolean
  onClick?: () => void
}

/** 心情/标签贴纸：可点击时为 button（触达 ≥64px 红线），否则纯展示 chip */
export function TaSticker({ emoji, label, active = false, onClick }: TaStickerProps) {
  const base = `inline-flex items-center gap-2 rounded-full border px-4 py-2 text-base transition-colors ${
    active
      ? 'border-terra-500 bg-terra-50 text-terra-700'
      : 'border-paper-border bg-paper-100 text-ink-700'
  }`
  if (!onClick) {
    return (
      <span className={base}>
        <span aria-hidden className="text-xl">{emoji}</span>
        {label}
      </span>
    )
  }
  return (
    <button type="button" onClick={onClick} aria-pressed={active} className={`${base} min-h-touch cursor-pointer`}>
      <span aria-hidden className="text-xl">{emoji}</span>
      {label}
    </button>
  )
}
