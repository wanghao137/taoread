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
 * 「纸与桃」按钮（docs/22，Cowork 风）：药丸形、纯色、边框承担结构、无重阴影。
 * primary=赤陶实底；ink=墨色实底（强行动，如「开始阅读」）；secondary=细线描边；ghost=纯文字。
 */
const VARIANT_CLASS: Record<Variant, string> = {
  primary: 'bg-terra text-white font-bold hover:bg-terra-600',
  ink: 'bg-ink-900 text-paper-100 font-bold hover:bg-ink-700',
  secondary: 'bg-paper-100 text-ink-900 border border-paper-border-strong hover:bg-paper-200 font-semibold',
  ghost: 'bg-transparent text-ink-700 hover:bg-paper-200 font-semibold',
}

const SIZE_CLASS: Record<Size, string> = {
  // 触达红线（design-system §4）：lg=64px 孩子/主行动；md=48px 家长次要
  lg: 'min-h-touch px-8 text-lg rounded-full',
  md: 'min-h-[3rem] px-5 text-base rounded-full',
}

/** 全产品唯一按钮实现（design-system §7） */
export const TaButton = forwardRef<HTMLButtonElement, TaButtonProps>(function TaButton(
  { variant = 'primary', size = 'lg', loading = false, disabled, className = '', children, ...rest },
  ref,
) {
  return (
    <motion.button
      ref={ref}
      whileTap={disabled || loading ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`relative inline-flex select-none items-center justify-center gap-2 transition-colors ${VARIANT_CLASS[variant]} ${SIZE_CLASS[size]} ${
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
