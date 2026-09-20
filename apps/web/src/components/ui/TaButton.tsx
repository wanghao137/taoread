import { forwardRef } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

type Variant = 'primary' | 'ink' | 'secondary' | 'ghost'
type Size = 'lg' | 'md'

export interface TaButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: Variant
  size?: Size
  loading?: boolean
  children: React.ReactNode
}

/**
 * 「贴纸绘本」按钮（docs/26，codex-resets 风 neobrutalism）：
 * 高饱和实底 + 2px 墨线描边 + 实心偏移阴影；按下时位移到底、阴影归零（按压手感）。
 * primary=橘红；ink=墨色实底（强行动）；secondary=奶白描边；ghost=纯文字。
 */
const VARIANT_CLASS: Record<Variant, string> = {
  primary:
    'bg-terra text-white font-bold border-ink border-2 shadow-sm hover:bg-terra-600 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none',
  ink: 'bg-ink-900 text-paper-100 font-bold border-ink border-2 shadow-sm hover:bg-ink-700 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none',
  secondary:
    'bg-paper-200 text-ink-900 border-ink border-2 shadow-xs font-bold hover:bg-sun-light active:translate-x-[2px] active:translate-y-[2px] active:shadow-none',
  ghost: 'bg-transparent text-ink-700 hover:bg-paper-300 font-semibold',
}

const SIZE_CLASS: Record<Size, string> = {
  // 触达红线（design-system §4）：lg=64px 孩子/主行动；md=48px 家长次要
  lg: 'min-h-touch px-8 text-lg rounded-2xl',
  md: 'min-h-[3rem] px-5 text-base rounded-xl',
}

/** 全产品唯一按钮实现（design-system §7） */
export const TaButton = forwardRef<HTMLButtonElement, TaButtonProps>(function TaButton(
  { variant = 'primary', size = 'lg', loading = false, disabled, className = '', children, ...rest },
  ref,
) {
  return (
    <motion.button
      ref={ref}
      whileTap={disabled || loading ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`relative inline-flex select-none items-center justify-center gap-2 transition-all ${VARIANT_CLASS[variant]} ${SIZE_CLASS[size]} ${
        disabled || loading ? 'cursor-not-allowed opacity-50 shadow-none' : 'cursor-pointer'
      } ${className}`}
      {...rest}
    >
      {/* loading 时保留文本（可访问名称不丢失），spinner 叠加居中 */}
      <span className={loading ? 'opacity-0' : ''}>{children}</span>
      {loading && (
        <span
          aria-hidden
          className="absolute h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
    </motion.button>
  )
})
