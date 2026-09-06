import { forwardRef } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'lg' | 'md'

export interface TaButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: Variant
  size?: Size
  loading?: boolean
  children: React.ReactNode
}

const VARIANT_CLASS: Record<Variant, string> = {
  primary: 'bg-peach-gradient text-night-900 font-bold shadow-lg shadow-peach-500/20',
  secondary: 'bg-night-700 text-ink-primary border border-night-border',
  ghost: 'bg-transparent text-ink-secondary',
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
      whileTap={disabled || loading ? undefined : { scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`relative inline-flex select-none items-center justify-center gap-2 transition-opacity ${VARIANT_CLASS[variant]} ${SIZE_CLASS[size]} ${
        disabled || loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
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
