/**
 * 公共媒体外发基址（2026-09-25 性能方案）。
 *
 * 配置 TAO_MEDIA_PUBLIC_BASE（如 https://media.taostudioai.com，R2 自定义域）后，
 * 公共资产（书库插图缩图/阅读器档、预生成朗读音频）直接由 Cloudflare 边缘/R2 提供，
 * 不再消耗家庭宽带上行；未配置时回落源站 /api/media/ 公共分支，行为等价。
 */
export function publicMediaBase(): string {
  const base = process.env.TAO_MEDIA_PUBLIC_BASE
  return base ? base.replace(/\/+$/, '') : ''
}

/** relPath 为媒体目录相对路径（art/covers/x.webp、tts-public/y.mp3） */
export function publicMediaUrl(relPath: string): string {
  const base = publicMediaBase()
  return base ? `${base}/${relPath}` : `/api/media/${relPath}`
}
