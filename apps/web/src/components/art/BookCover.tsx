/**
 * 书籍封面（docs/13 P0-D）。
 *
 * 优先展示 AI 生成的绘本风插画（coverArtUrl），无记录时回退 SceneArt SVG。
 * 切换对调用方完全透明：同一个 aspect 容器，同样的圆角与阴影。
 *
 * 加载失败时（网络/文件损坏）静默回退 SVG，不给孩子看错误态。
 */
import { useState } from 'react'
import { motion } from 'framer-motion'
import { SceneArt } from './SceneArt'
import { AiBadge } from './AiBadge'
import { useReducedMotion } from '../../lib/motion'

export interface BookCoverProps {
  /** AI 插画 URL；null/undefined 时用 SVG 场景 */
  urlPath: string | null | undefined
  scene: string
  from?: string | null
  to?: string | null
  lang: string
  /** 图片描述（无障碍） */
  alt: string
  className?: string
}

export function BookCover({ urlPath, scene, from, to, lang, alt, className }: BookCoverProps) {
  const [imgFailed, setImgFailed] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const showImage = Boolean(urlPath) && !imgFailed
  const reduced = useReducedMotion()

  if (!showImage) {
    return <SceneArt scene={scene} from={from} to={to} lang={lang} />
  }
  return (
    <div className="relative h-full w-full overflow-hidden bg-paper-300">
      {/* 占位底：插画懒加载/加载中时也是「有设计的一格」，不出白板 */}
      <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
        <svg viewBox="0 0 24 24" className="h-1/3 w-1/3 text-kraft-400/50" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2z" />
          <path d="M8 7h7M8 11h6" />
        </svg>
      </div>
      {/*
        Ken Burns 极慢摇移（Vooks 式「活起来的画」）：14 秒一个周期，缩放只有 6%、
        平移只有 3%。慢到孩子意识不到镜头在动，但画面始终是「活的」。
        前庭敏感 / 晕动症孩子开启系统「减少动态效果」时完全静止。
      */}
      <motion.img
        src={urlPath as string}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover ${className ?? ''}`}
        onError={() => setImgFailed(true)}
        onLoad={() => setImgLoaded(true)}
        {...(reduced
          ? {}
          : {
              animate: { scale: [1.04, 1.1, 1.04], x: ['-1.5%', '1.5%', '-1.5%'] },
              transition: {
                duration: 14,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'mirror' as const,
              },
            })}
      />
      {/* AI 标识只在插画真实加载后出现（UI 复盘：懒加载占位不挂标），并降噪为轻量胶囊 */}
      {imgLoaded ? <AiBadge /> : null}
    </div>
  )
}
