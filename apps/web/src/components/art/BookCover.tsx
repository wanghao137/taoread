/**
 * 书籍封面（docs/13 P0-D）。
 *
 * 优先展示 AI 生成的绘本风插画（coverArtUrl），无记录时回退 SceneArt SVG。
 * 切换对调用方完全透明：同一个 aspect 容器，同样的圆角与阴影。
 *
 * 加载失败时（网络/文件损坏）静默回退 SVG，不给孩子看错误态。
 */
import { useState } from 'react'
import { SceneArt } from './SceneArt'
import { AiBadge } from './AiBadge'

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
  const showImage = Boolean(urlPath) && !imgFailed

  if (!showImage) {
    return <SceneArt scene={scene} from={from} to={to} lang={lang} />
  }
  return (
    <div className="relative h-full w-full">
      <img
        src={urlPath as string}
        alt={alt}
        loading="lazy"
        decoding="async"
        // 与 SceneArt 同样的填充方式：容器 aspect 固定，object-cover 裁掉超出的部分
        className={`h-full w-full object-cover ${className ?? ''}`}
        onError={() => setImgFailed(true)}
      />
      <AiBadge />
    </div>
  )
}
