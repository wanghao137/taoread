import type { HTMLAttributes } from 'react'

/** 唯一卡片容器（design-system §7 + docs/26）：奶白纸底 + 2px 墨线 + 实心偏移阴影（贴纸卡） */
export function TaCard({ className = '', children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-3xl border-ink border-2 bg-paper-200 p-5 shadow-card ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
