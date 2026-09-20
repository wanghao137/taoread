/**
 * 桃阅读线性图标系统（docs/22「纸与桃」）：
 * 统一 24 视框 / 1.5 描边 / 圆头圆角，currentColor 着色。
 * 语义命名，UI 按钮/导航一律用图标组件，不再使用 emoji。
 */
import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function base({ size = 20, strokeWidth = 1.5, ...rest }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    ...rest,
  } as const
}

export function IconMoon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M20.4 14.2A8.4 8.4 0 0 1 9.8 3.6a8.4 8.4 0 1 0 10.6 10.6Z" />
    </svg>
  )
}

/** 太阳：白天阅读主场景（docs/26），替代月亮成为首页入口图标 */
export function IconSun(p: IconProps) {
  return (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7" />
    </svg>
  )
}

/** 桃子：品牌吉祥物图标（taostudio 品牌桃），成就收藏隐喻 */
export function IconPeach(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M12 8.5c-1.2-1.5-3-2.3-4.6-1.6-2.1.9-3 3.6-1.9 6.2 1.1 2.7 3.6 5.4 6.5 6.9 2.9-1.5 5.4-4.2 6.5-6.9 1.1-2.6.2-5.3-1.9-6.2-1.6-.7-3.4.1-4.6 1.6Z" />
      <path d="M12 8.5c.2-2.2 1.4-3.9 3.6-4.8" />
      <path d="M15.6 3.7c1.8-.4 3.2 0 4.4 1-1.2 1.1-2.6 1.5-4.4 1-.3-.6-.3-1.3 0-2Z" />
    </svg>
  )
}

export function IconMoonStar(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M18.5 14.6A7.6 7.6 0 0 1 9.4 5.5a7.6 7.6 0 1 0 9.1 9.1Z" />
      <path d="M19 3.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8Z" />
    </svg>
  )
}

export function IconBook(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21V5.5Z" />
      <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" />
    </svg>
  )
}

export function IconBookOpen(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M12 6.5C10.5 4.9 8.2 4 4 4v14.5c4.2 0 6.5.9 8 2.5 1.5-1.6 3.8-2.5 8-2.5V4c-4.2 0-6.5.9-8 2.5Z" />
      <path d="M12 6.5V21" />
    </svg>
  )
}

export function IconShelf(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M4 4h16v16H4z" />
      <path d="M9 4v16M14 4v16" />
      <path d="M4 9h5M9 14h5M14 9h6" />
    </svg>
  )
}

export function IconLamp(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M9 10.5a5 5 0 1 1 6 0c-.8.6-1 1.2-1 2h-4c0-.8-.2-1.4-1-2Z" />
      <path d="M10 16h4M10.8 19h2.4" />
    </svg>
  )
}

export function IconStar(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M12 3.5l2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8L12 3.5Z" />
    </svg>
  )
}

export function IconSparkle(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M12 4l1.8 4.7L18.5 10.5l-4.7 1.8L12 17l-1.8-4.7L5.5 10.5l4.7-1.8L12 4Z" />
      <path d="M18.5 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2Z" />
    </svg>
  )
}

export function IconHeart(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M12 20s-7.5-4.6-7.5-9.8A4.2 4.2 0 0 1 12 7.6a4.2 4.2 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z" />
    </svg>
  )
}

export function IconHeartFilled(p: IconProps) {
  return (
    <svg {...base(p)} fill="currentColor" stroke="none">
      <path d="M12 20s-7.5-4.6-7.5-9.8A4.2 4.2 0 0 1 12 7.6a4.2 4.2 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z" />
    </svg>
  )
}

export function IconPlay(p: IconProps) {
  return (
    <svg {...base(p)} fill="currentColor" stroke="none">
      <path d="M8 5.8v12.4c0 .8.9 1.3 1.6.9l9.6-6.2a1 1 0 0 0 0-1.7L9.6 4.9A1 1 0 0 0 8 5.8Z" />
    </svg>
  )
}

export function IconPause(p: IconProps) {
  return (
    <svg {...base(p)} fill="currentColor" stroke="none">
      <rect x="7" y="5" width="3.4" height="14" rx="1" />
      <rect x="13.6" y="5" width="3.4" height="14" rx="1" />
    </svg>
  )
}

export function IconChevronLeft(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M14.5 6l-6 6 6 6" />
    </svg>
  )
}

export function IconChevronRight(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M9.5 6l6 6-6 6" />
    </svg>
  )
}

export function IconChevronDown(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M6 9.5l6 6 6-6" />
    </svg>
  )
}

export function IconArrowLeft(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M19 12H5" />
      <path d="M11 6l-6 6 6 6" />
    </svg>
  )
}

export function IconGear(p: IconProps) {
  return (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3.5l1 2.2 2.4-.5 1 2.1 2.2 1-.5 2.4 1.4 2-1.4 2 .5 2.4-2.2 1-1 2.1-2.4-.5-1 2.2-1-2.2-2.4.5-1-2.1-2.2-1 .5-2.4-1.4-2 1.4-2-.5-2.4 2.2-1 1-2.1 2.4.5 1-2.2Z" />
    </svg>
  )
}

export function IconFamily(p: IconProps) {
  return (
    <svg {...base(p)}>
      <circle cx="8.5" cy="8" r="2.8" />
      <circle cx="16.5" cy="9.5" r="2.2" />
      <path d="M3.5 19c.6-3 2.6-4.5 5-4.5s4.4 1.5 5 4.5" />
      <path d="M15.5 19c-.2-1.7-.9-2.9-2-3.7 1-1.4 4.6-1.7 5.9.5.5.8.7 1.9.8 3.2" />
    </svg>
  )
}

export function IconSearch(p: IconProps) {
  return (
    <svg {...base(p)}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20l-4.4-4.4" />
    </svg>
  )
}

export function IconClose(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

export function IconCheck(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  )
}

export function IconClock(p: IconProps) {
  return (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  )
}

export function IconVolume(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M4 10v4h3l4.5 3.8V6.2L7 10H4Z" />
      <path d="M15.5 9.5a3.5 3.5 0 0 1 0 5" />
      <path d="M18 7.5a7 7 0 0 1 0 9" />
    </svg>
  )
}

export function IconType(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M4 7V5h10v2" />
      <path d="M9 5v14M6.5 19h5" />
      <path d="M15 11v-1.2h5.5V11M17.7 9.8V19M16.2 19h3" />
    </svg>
  )
}

export function IconPalette(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.4 0 2-.8 2-1.7 0-.8-.6-1.3-.6-2.1 0-1 .8-1.7 2-1.7h1.8a3.3 3.3 0 0 0 3.3-3.3C20.4 7 16.7 3.5 12 3.5Z" />
      <circle cx="8" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="7.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="9.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="7.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconList(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M8 6h12M8 12h12M8 18h12" />
      <circle cx="4" cy="6" r="1" fill="currentColor" stroke="none" />
      <circle cx="4" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="4" cy="18" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconShield(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M12 3.5l7 2.5v5.5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-2.5Z" />
      <path d="M9 11.8l2 2 4-4.2" />
    </svg>
  )
}

export function IconCompass(p: IconProps) {
  return (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2Z" />
    </svg>
  )
}

export function IconPlus(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function IconMinus(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M5 12h14" />
    </svg>
  )
}
