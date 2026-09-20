import { TaButton } from './TaButton'
import { SceneArt, TaoMascot } from '../art/SceneArt'

export interface ErrorStateProps {
  /** 服务端返回的中文 message；未传时用通用文案 */
  message?: string
  onRetry?: () => void
}

/** 错误态（design-system §7 + docs/13 P0-2）：零指责文案 + 重试
 *
 * 不用 emoji（☁️ 对不识字孩子信息量为零）：吉祥物困惑表情 + 小桃子提示画，
 * 孩子看到「小桃在想办法」而不是「一个奇怪的符号」。 */
export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div role="alert" className="flex flex-col items-center gap-4 py-16 text-center">
      <div aria-hidden className="relative">
        <SceneArt scene="lamp-hint" className="h-20 w-20" />
        <div className="absolute -bottom-1 -right-1">
          <TaoMascot mood="hint" className="h-10 w-10" />
        </div>
      </div>
      <div>
        <p className="text-lg font-bold">{message ?? '小桃走神了一下下'}</p>
        <p className="mt-1 text-ink-700">再试一次，故事还在等着我们</p>
      </div>
      {onRetry && (
        <TaButton variant="secondary" size="md" onClick={onRetry}>
          再试一次
        </TaButton>
      )}
    </div>
  )
}
