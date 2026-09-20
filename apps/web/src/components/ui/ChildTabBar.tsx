/**
 * 孩子端持久底部导航（docs/13 P1-2 + docs/26 重构）。
 *
 * 底部导航钉在视口底部，统一线性图标（components/ui/icons），min-h-touch 触达红线。
 * docs/26：首页入口从「月亮」改为「太阳」——阅读是全天候的，睡前只是可选场景；
 * 成就收藏从「夜灯」改为「桃子」（品牌吉祥物，与 taostudio 桃子 logo 呼应）。
 *
 * 只在「非沉浸」阶段展示：阅读器/收尾/庆祝这些全屏流程自己有导航，
 * 钉一条 bar 反而遮挡画面（Lillard 2011：减少与情节无关的视觉噪音）。
 */
import { motion } from 'framer-motion'
import { IconSun, IconShelf, IconPeach } from './icons'

export type ChildTab = 'home' | 'shelf' | 'wall'

export interface ChildTabBarProps {
  active: ChildTab
  /** 桃子墙可收桃子数（0 时隐藏角标，避免空状态下诱导焦虑） */
  peachCount?: number
  onSelect: (tab: ChildTab) => void
}

const TABS: Array<{ key: ChildTab; label: string; icon: (p: { size?: number }) => JSX.Element }> = [
  { key: 'home', label: '首页', icon: IconSun },
  { key: 'shelf', label: '书架', icon: IconShelf },
  { key: 'wall', label: '桃子', icon: IconPeach },
]

export function ChildTabBar({ active, peachCount = 0, onSelect }: ChildTabBarProps) {
  return (
    <nav
      aria-label="孩子端导航"
      className="sticky bottom-0 z-30 -mx-5 flex items-stretch gap-1 border-t-ink border-t-2 bg-paper-100/95 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1.5 backdrop-blur-md"
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
            <span className={isActive ? 'text-terra-500' : 'text-ink-500'} aria-hidden>
              <t.icon size={24} />
            </span>
            <span className={`text-[11px] font-bold ${isActive ? 'text-terra-600' : 'text-ink-500'}`}>
              {t.label}
            </span>
            {/* 选中态：橘红圆点（贴纸感，不抢画面） */}
            {isActive ? (
              <motion.span
                layoutId="child-tab-active"
                className="absolute top-0 h-1 w-8 rounded-full bg-terra-500"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            ) : null}
            {/* 桃子角标：有可收桃子才亮，没有就不显示（空态不诱导） */}
            {t.key === 'wall' && peachCount > 0 ? (
              <span className="absolute right-3 top-1.5 flex min-w-[18px] items-center justify-center rounded-full border-ink border-[1.5px] bg-sun px-1 text-[10px] font-bold text-ink-900">
                {peachCount > 99 ? '99+' : peachCount}
              </span>
            ) : null}
          </button>
        )
      })}
    </nav>
  )
}
