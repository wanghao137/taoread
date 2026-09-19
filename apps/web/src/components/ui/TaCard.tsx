import type { HTMLAttributes } from 'react'

/** 唯一卡片容器（design-system §7 + docs/22）：浅奶油底 + 细线边框 + 极轻浮起阴影 */
export function TaCard({ className = '', children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-3xl border border-paper-border bg-paper-200 p-5 shadow-card ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
