/**
 * 孩子端持久底部导航（docs/13 P1-2）。
 *
 * 之前孩子端只有顶部一个「🍑 桃书架」按钮 + 「换家庭」：
 * 沉浸阅读时头部按钮滑出视野，孩子想回书架/看夜灯只能乱点。
 * 底部导航钉在视口底部，SVG 图标（非 emoji，跨平台渲染一致），min-h-touch 触达红线。
 *
 * 只在「非沉浸」阶段展示：阅读器/收尾/庆祝这些全屏流程自己有导航，
 * 钉一条 bar 反而遮挡画面（Lillard 2011：减少与情节无关的视觉噪音）。
 */
import { motion } from 'framer-motion'

export type ChildTab = 'moon' | 'shelf' | 'wall'

export interface ChildTabBarProps {
  active: ChildTab
  /** 夜灯墙未亮灯数（0 时隐藏角标，避免空状态下诱导焦虑） */
  lampCount?: number
  onSelect: (tab: ChildTab) => void
}

const MOON_ICON = (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 14.5A8.2 8.2 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />
  </svg>
)
const SHELF_ICON = (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h3A1.5 1.5 0 0 1 10 5.5v13A1.5 1.5 0 0 1 8.5 20h-3A1.5 1.5 0 0 1 4 18.5z" />
    <path d="M14 5.5A1.5 1.5 0 0 1 15.5 4h3A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5z" />
    <path d="M6.5 8.5h1.5M6.5 12h1.5M16 8.5h1.5M16 12h1.5" />
  </svg>
)
const WALL_ICON = (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3.2" />
    <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6.2 6.2l1.6 1.6M16.2 16.2l1.6 1.6M17.8 6.2l-1.6 1.6M7.8 16.2l-1.6 1.6" />
  </svg>
)

const TABS: Array<{ key: ChildTab; label: string; icon: JSX.Element }> = [
  { key: 'moon', label: '月亮', icon: MOON_ICON },
  { key: 'shelf', label: '书架', icon: SHELF_ICON },
  { key: 'wall', label: '夜灯', icon: WALL_ICON },
]

export function ChildTabBar({ active, lampCount = 0, onSelect }: ChildTabBarProps) {
  return (
    <nav
      aria-label="孩子端导航"
      className="sticky bottom-0 z-30 -mx-5 flex items-stretch gap-1 border-t border-night-border bg-night-800/95 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1.5 backdrop-blur-md"
    >
      {TABS.map((t) => {
        const isActive = active === t.key
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onSelect(t.key)}
            aria-current={isActive ? 'page' : undefined}
            className="relative flex min-h-touch flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl px-2"
          >
            <span className={isActive ? 'text-peach-300' : 'text-ink-secondary'} aria-hidden>
              {t.icon}
            </span>
            <span className={`text-[11px] font-medium ${isActive ? 'text-peach-300' : 'text-ink-secondary'}`}>
              {t.label}
            </span>
            {/* 选中态：小桃色圆点，不用整条高亮块（低饱和、不抢画面） */}
            {isActive ? (
              <motion.span
                layoutId="child-tab-active"
                className="absolute top-0 h-1 w-8 rounded-full bg-peach-400"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            ) : null}
            {/* 夜灯角标：已有灯才亮，没有就不显示（空态不诱导） */}
            {t.key === 'wall' && lampCount > 0 ? (
              <span className="absolute right-3 top-1.5 flex min-w-[18px] items-center justify-center rounded-full bg-peach-gradient px-1 text-[10px] font-bold text-white">
                {lampCount > 99 ? '99+' : lampCount}
              </span>
            ) : null}
          </button>
        )
      })}
    </nav>
  )
}
