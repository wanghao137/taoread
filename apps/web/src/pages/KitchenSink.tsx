import { useState } from 'react'
import { TaButton, TaCard, TaSheet, TaSticker, Loading, ErrorState, EmptyState } from '../components/ui'

const MOODS = [
  { emoji: '😄', label: '开心' },
  { emoji: '🤩', label: '兴奋' },
  { emoji: '😌', label: '平静' },
  { emoji: '🥱', label: '困困' },
  { emoji: '🤔', label: '在想' },
]

/** 组件演示页（视觉走查基线，验收前移除入口；design-system §10） */
export function KitchenSink() {
  const [mood, setMood] = useState<string>('开心')
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-10">
      <h1 className="mb-1 text-3xl font-bold">设计系统 · 组件一览</h1>
      <p className="mb-8 text-ink-secondary">
        桃阅读 design-system v1 走查基线（对比度/触达/字号红线见 docs/design-system.md）
      </p>

      <div className="flex flex-col gap-8">
        <section aria-labelledby="ks-buttons">
          <h2 id="ks-buttons" className="mb-3 text-xl font-bold">按钮 TaButton</h2>
          <TaCard className="flex flex-wrap items-center gap-4">
            <TaButton>主行动 · 出发</TaButton>
            <TaButton variant="secondary">次要 · 换一本</TaButton>
            <TaButton variant="ghost">幽灵 · 返回</TaButton>
            <TaButton loading>加载中</TaButton>
            <TaButton disabled>不可用</TaButton>
            <TaButton size="md">家长端尺寸 md=48px</TaButton>
          </TaCard>
        </section>

        <section aria-labelledby="ks-stickers">
          <h2 id="ks-stickers" className="mb-3 text-xl font-bold">贴纸 TaSticker（单选示范）</h2>
          <TaCard>
            <p className="mb-3 text-base text-ink-secondary">当前选择：{mood}</p>
            <div className="flex flex-wrap gap-3">
              {MOODS.map((m) => (
                <TaSticker
                  key={m.label}
                  emoji={m.emoji}
                  label={m.label}
                  active={mood === m.label}
                  onClick={() => setMood(m.label)}
                />
              ))}
            </div>
          </TaCard>
        </section>

        <section aria-labelledby="ks-sheet">
          <h2 id="ks-sheet" className="mb-3 text-xl font-bold">弹层 TaSheet</h2>
          <TaCard>
            <TaButton variant="secondary" onClick={() => setSheetOpen(true)}>
              打开底部弹层
            </TaButton>
          </TaCard>
        </section>

        <section aria-labelledby="ks-states">
          <h2 id="ks-states" className="mb-3 text-xl font-bold">状态：加载 / 错误 / 空态</h2>
          <TaCard>
            <Loading />
            <ErrorState message="网络好像睡着了" onRetry={() => {}} />
            <EmptyState emoji="📚" title="书架还空着" hint="第一本故事正在路上" />
          </TaCard>
        </section>

        <section aria-labelledby="ks-tokens">
          <h2 id="ks-tokens" className="mb-3 text-xl font-bold">色板 Tokens</h2>
          <TaCard className="grid grid-cols-4 gap-3 text-center text-xs text-ink-secondary">
            {[
              ['night.900', '#0E1A38', 'bg-night-900'],
              ['night.800', '#16244C', 'bg-night-800'],
              ['night.700', '#223465', 'bg-night-700'],
              ['night.border', '#2E4278', 'bg-night-border'],
              ['peach.300', '#FFD3C4', 'bg-peach-300'],
              ['peach.400', '#FFB3A0', 'bg-peach-400'],
              ['peach.500', '#FF8E75', 'bg-peach-500'],
              ['moon.400', '#FFD97A', 'bg-moon-400'],
            ].map(([name, hex, cls]) => (
              <div key={name}>
                <div aria-hidden className={`h-12 rounded-xl border border-night-border ${cls}`} />
                <p className="mt-1">{name}</p>
                <p>{hex}</p>
              </div>
            ))}
          </TaCard>
        </section>
      </div>

      <TaSheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="今晚的共读卡（示意）">
        <div className="flex flex-col gap-3 text-ink-secondary">
          <p>📖 讲什么：三个讲述要点会出现在这里</p>
          <p>💬 问什么：按年龄段分层的三个开放问题</p>
          <p>🍵 聊什么：一个「爸妈小时候」话题钩子</p>
          <TaButton className="mt-2 w-full" onClick={() => setSheetOpen(false)}>
            好的，收下了
          </TaButton>
        </div>
      </TaSheet>
    </main>
  )
}
