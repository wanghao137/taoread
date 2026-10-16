/** TaoRead's generated picture-book icon family. Keep the original peach brand asset. */
import type { ImgHTMLAttributes } from 'react'

type IconProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'width' | 'height'> & { size?: number }

function icon(name: string) {
  return function ReadingIcon({ size = 22, className = '', ...props }: IconProps) {
    return <img {...props} src={`/art/icons/${name}.webp`} width={size} height={size} className={`tao-icon ${className}`.trim()} alt="" aria-hidden="true" draggable={false} decoding="async" />
  }
}

export const IconMoon = icon('moon')
export const IconSun = icon('sun')
export const IconMoonStar = icon('moon-star')
export const IconBook = icon('book')
export const IconBookOpen = icon('book-open')
export const IconShelf = icon('shelf')
export const IconLamp = icon('lamp')
export const IconStar = icon('star')
export const IconSparkle = icon('sparkle')
export const IconHeart = icon('heart')
export const IconHeartFilled = icon('heart-filled')
export const IconPlay = icon('play')
export const IconPause = icon('pause')
export const IconChevronLeft = icon('chevron-left')
export const IconChevronRight = icon('chevron-right')
export const IconChevronDown = icon('chevron-down')
export const IconArrowLeft = icon('arrow-left')
export const IconArrowRight = icon('arrow-right')
export const IconGear = icon('settings')
export const IconFamily = icon('family')
export const IconSearch = icon('search')
export const IconClose = icon('close')
export const IconCheck = icon('check')
export const IconClock = icon('clock')
export const IconVolume = icon('volume')
export const IconType = icon('type')
export const IconPalette = icon('palette')
export const IconList = icon('list')
export const IconShield = icon('shield')
export const IconCompass = icon('compass')
export const IconPlus = icon('plus')
export const IconMinus = icon('minus')
export const IconUser = icon('user')
export const IconBookmark = icon('bookmark')
export const IconLeaf = icon('leaf')
export const IconChart = icon('footprints')
export const IconRefresh = icon('refresh')

export function IconPeach({ size = 22, className }: IconProps) {
  return <img src="/brand/logo-256.png" width={size} height={size} className={className} alt="" aria-hidden="true" />
}
