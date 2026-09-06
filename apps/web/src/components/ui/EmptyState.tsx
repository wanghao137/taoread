export interface EmptyStateProps {
  emoji?: string
  title: string
  hint?: string
}

/** 空态（design-system §7）：正向引导，绝不制造焦虑 */
export function EmptyState({ emoji = '⭐', title, hint }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 py-14 text-center">
      <span aria-hidden className="text-5xl">
        {emoji}
      </span>
      <p className="text-lg font-bold leading-relaxed">{title}</p>
      {hint && <p className="text-ink-secondary">{hint}</p>}
    </div>
  )
}
