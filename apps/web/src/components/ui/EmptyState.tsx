import { SceneArt, TaoMascot } from '../art/SceneArt'
import { TaButton } from './TaButton'

export interface EmptyStateProps {
  /**
   * 旧入口：emoji 图标。**生产页面已弃用**（docs/11 P0-3：空态一律用场景插画 + 吉祥物），
   * 仅 KitchenSink 演示页保留以验证组件兼容性。新调用请传 `art`。
   */
  emoji?: string
  /** 场景插画 key（SceneArt 注册表）；传入时 emoji 被忽略 */
  art?: string
  /** 吉祥物情绪，与插画搭配出现 */
  mood?: 'happy' | 'sleepy' | 'excited' | 'hint'
  title: string
  hint?: string
  /** 主行动按钮：空态必须有出口，不能是死路（docs/13 P1-1） */
  action?: { label: string; onClick: () => void }
}

/**
 * 空态（design-system §7）：正向引导，绝不制造焦虑。
 * 有 `art` 时渲染场景插画 + 小桃吉祥物；否则回退 emoji（仅演示页使用）。
 */
export function EmptyState({ emoji = '⭐', art, mood = 'hint', title, hint, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 py-14 text-center">
      {art ? (
        <>
          <div className="relative h-36 w-36 overflow-hidden rounded-3xl shadow-lg ring-1 ring-white/10">
            <SceneArt scene={art} />
          </div>
          <TaoMascot mood={mood} className="h-11 w-11" />
        </>
      ) : (
        <span aria-hidden className="text-5xl">
          {emoji}
        </span>
      )}
      <p className="text-lg font-bold leading-relaxed">{title}</p>
      {hint && <p className="text-ink-secondary">{hint}</p>}
      {action && (
        <div className="mt-2">
          <TaButton size="lg" variant="primary" onClick={action.onClick}>
            {action.label}
          </TaButton>
        </div>
      )}
    </div>
  )
}
