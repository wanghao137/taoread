import { useState } from 'react'
import { TaButton, TaCard, TaSheet, TaSticker, Loading, ErrorState, EmptyState } from '../components/ui'
import { IconMoon, IconBook, IconStar, IconLamp, IconHeart, IconPlay, IconSun, IconSparkle } from '../components/ui/icons'

const MOODS = [
  { icon: <IconSun size={20} />, label: '开心' },
  { icon: <IconSparkle size={20} />, label: '兴奋' },
  { icon: <IconHeart size={20} />, label: '平静' },
  { icon: <IconMoon size={20} />, label: '困困' },
  { icon: <IconBook size={20} />, label: '在想' },
]

/** 组件演示页（视觉走查基线，验收前移除入口；design-system §10） */
export function KitchenSink() {
  const [mood, setMood] = useState<string>('开心')
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-10">
      <h1 className="mb-1 font-display text-3xl font-bold">设计系统 · 组件一览</h1>
      <p className="mb-8 text-ink-700">
        桃阅读「纸与桃」design-system v2 走查基线（对比度/触达/字号红线见 docs/design-system.md）
      </p>

      <div className="flex flex-col gap-8">
        <section aria-labelledby="ks-buttons">
          <h2 id="ks-buttons" className="mb-3 text-xl font-bold">按钮 TaButton</h2>
          <TaCard className="flex flex-wrap items-center gap-4">
            <TaButton>主行动 · 出发</TaButton>
            <TaButton variant="ink">墨色 · 开始阅读</TaButton>
            <TaButton variant="secondary">次要 · 换一本</TaButton>
            <TaButton variant="ghost">幽灵 · 返回</TaButton>
            <TaButton loading>加载中</TaButton>
            <TaButton disabled>不可用</TaButton>
            <TaButton size="md">家长端尺寸 md=48px</TaButton>
          </TaCard>
        </section>

        <section aria-labelledby="ks-icons">
          <h2 id="ks-icons" className="mb-3 text-xl font-bold">图标 Icons（1.5px 线性）</h2>
          <TaCard className="flex flex-wrap items-center gap-5 text-ink-700">
            {[
              { name: 'moon', Icon: IconMoon },
              { name: 'book', Icon: IconBook },
              { name: 'star', Icon: IconStar },
              { name: 'lamp', Icon: IconLamp },
              { name: 'heart', Icon: IconHeart },
              { name: 'play', Icon: IconPlay },
            ].map(({ name, Icon }) => (
              <span key={name} className="flex items-center gap-1.5 text-sm">
                <Icon size={22} />
                {name}
              </span>
            ))}
          </TaCard>
        </section>

        <section aria-labelledby="ks-stickers">
          <h2 id="ks-stickers" className="mb-3 text-xl font-bold">贴纸 TaSticker（单选示范）</h2>
          <TaCard>
            <p className="mb-3 text-base text-ink-700">当前选择：{mood}</p>
            <div className="flex flex-wrap gap-3">
              {MOODS.map((m) => (
                <TaSticker
                  key={m.label}
                  icon={m.icon}
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
            <ErrorState message="网络开小差了" onRetry={() => {}} />
            <EmptyState emoji="📚" title="书架还空着" hint="第一本故事正在路上" />
          </TaCard>
        </section>

        <section aria-labelledby="ks-tokens">
          <h2 id="ks-tokens" className="mb-3 text-xl font-bold">色板 Tokens（纸与桃 v2）</h2>
          <TaCard className="grid grid-cols-4 gap-3 text-center text-xs text-ink-700">
            {[
              ['paper.100', '#FFF4DD', 'bg-paper-100'],
              ['paper.200', '#FFFDF7', 'bg-paper-200'],
              ['paper.300', '#FFF0BD', 'bg-paper-300'],
              ['paper.border', '#E8DCC3', 'bg-paper-border'],
              ['ink.900', '#26201A', 'bg-ink-900'],
              ['ink.700', '#5C5347', 'bg-ink-700'],
              ['ink.500', '#877B6B', 'bg-ink-500'],
              ['ink.300', '#26201A1A', 'bg-ink-300'],
              ['terra.50', '#FFEFE7', 'bg-terra-50'],
              ['terra.100', '#FFD9C9', 'bg-terra-100'],
              ['terra.300', '#FFB07A', 'bg-terra-300'],
              ['terra.500', '#FF5C2B', 'bg-terra-500'],
              ['terra.600', '#EE4518', 'bg-terra-600'],
              ['terra.700', '#C23A10', 'bg-terra-700'],
              ['sun', '#FFD84D', 'bg-sun'],
              ['rose', '#FFB9CC', 'bg-rose'],
              ['sky', '#A5DCFF', 'bg-sky'],
              ['mint', '#B9E6A6', 'bg-mint'],
              ['peach', '#FFB07A', 'bg-peach'],
              ['kraft.300', '#F1E3C4', 'bg-kraft-300'],
              ['kraft.400', '#D4A27F', 'bg-kraft-400'],
              ['kraft.500', '#B9835C', 'bg-kraft-500'],
              ['moss.500', '#5F8F46', 'bg-moss-500'],
              ['moss.100', '#E4F1D9', 'bg-moss-100'],
            ].map(([name, hex, cls]) => (
              <div key={name}>
                <div aria-hidden className={`h-12 rounded-xl border-ink border-2 ${cls}`} />
                <p className="mt-1">{name}</p>
                <p>{hex}</p>
              </div>
            ))}
          </TaCard>
        </section>
      </div>

      <TaSheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="今天的共读卡（示意）">
        <div className="flex flex-col gap-3 text-ink-700">
          <p>讲什么：三个讲述要点会出现在这里</p>
          <p>问什么：按年龄段分层的三个开放问题</p>
          <p>聊什么：一个「爸妈小时候」话题钩子</p>
          <TaButton className="mt-2 w-full" onClick={() => setSheetOpen(false)}>
            好的，收下了
          </TaButton>
        </div>
      </TaSheet>
    </main>
  )
}
