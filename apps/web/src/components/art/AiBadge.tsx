/**
 * AI 生成内容角标（docs/13 合规项）。
 *
 * 《人工智能生成合成内容标识办法》（2025-09-01 起施行）要求对人工智能生成内容
 * 做显式标识。孩子端不能贴满警示文案破坏阅读氛围，所以只在插画/动画角落放一枚
 * 小角标；完整披露（哪些内容由 AI 生成、依据哪部法规）放在家长设置页。
 */
export function AiBadge({ label = 'AI 绘制' }: { label?: string }) {
  return (
    <span
      className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-ink-900/70 px-2 py-0.5 text-[10px] font-medium text-paper-100 backdrop-blur-sm"
      aria-hidden="true"
    >
      {label}
    </span>
  )
}
