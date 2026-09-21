import { motion } from 'framer-motion'

/** 加载态（docs/26 二轮复盘重做）：
 * 品牌桃子 logo 贴纸卡呼吸 + 三颗跳动的贴纸圆点 + 正向文案 + aria-busy。
 * 不再使用小尺寸 SVG 吉祥物（小桃在大留白里显得单薄），品牌 logo 质量稳定。 */
export function Loading({ label = '小桃正在准备…' }: { label?: string }) {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-6 py-20"
    >
      <motion.img
        src="/brand/logo-256.png"
        alt=""
        aria-hidden
        className="h-28 w-28 rounded-[1.75rem] border-ink border-2 bg-paper-200 object-cover shadow-card lg:h-36 lg:w-36"
        animate={{ scale: [1, 1.06, 1], rotate: [-2, 2, -2] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* 三颗贴纸圆点：排队跳动（比纯文字 spinner 对不识字孩子更友好） */}
      <div className="flex gap-2" aria-hidden>
        {['bg-sun', 'bg-sky', 'bg-rose'].map((c, i) => (
          <motion.span
            key={c}
            className={`h-3 w-3 rounded-full border border-ink/60 ${c}`}
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut', delay: i * 0.18 }}
          />
        ))}
      </div>
      <p className="text-base font-bold text-ink-700">{label}</p>
    </div>
  )
}
