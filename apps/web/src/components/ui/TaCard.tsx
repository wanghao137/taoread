import type { HTMLAttributes } from 'react'

/** 唯一卡片容器（design-system §7）：rounded-3xl + night.800 + 细描边 */
export function TaCard({ className = '', children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-3xl border border-night-border bg-night-800/80 p-5 shadow-xl shadow-night-900/40 ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
