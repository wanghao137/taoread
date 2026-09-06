import { TaButton } from './TaButton'

export interface ErrorStateProps {
  /** 服务端返回的中文 message；未传时用通用文案 */
  message?: string
  onRetry?: () => void
}

/** 错误态（design-system §7）：零指责文案 + 重试 */
export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div role="alert" className="flex flex-col items-center gap-4 py-16 text-center">
      <span aria-hidden className="text-5xl">
        ☁️
      </span>
      <div>
        <p className="text-lg font-bold">{message ?? '星星眨了眨眼，好像走神了'}</p>
        <p className="mt-1 text-ink-secondary">再试一次，故事还在等着我们</p>
      </div>
      {onRetry && (
        <TaButton variant="secondary" size="md" onClick={onRetry}>
          再试一次
        </TaButton>
      )}
    </div>
  )
}
