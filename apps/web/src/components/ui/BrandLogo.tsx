import type { ImgHTMLAttributes } from 'react'

type BrandLogoProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> & {
  size?: number
}

/**
 * 品牌贴纸图：webp（9KB）优先，png（55KB）仅老 Safari(<14) 回退。
 * 登录页是每台设备的第一屏，此前 6 处硬编码 png 每次白付 45KB（docs/78）。
 */
export function BrandLogo({ size, width, height, ...rest }: BrandLogoProps) {
  return (
    <picture>
      <source srcSet="/brand/logo-256.webp" type="image/webp" />
      <img src="/brand/logo-256.png" width={width ?? size} height={height ?? size} decoding="async" {...rest} />
    </picture>
  )
}
