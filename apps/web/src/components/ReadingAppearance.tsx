import type { ReactNode } from 'react'
import type { ReadingTheme } from '../lib/readingTheme'

/** The same control hierarchy in public and family readers. */
export function ReadingOption({ label, children }: { label: string; children: ReactNode }) {
  return <fieldset className="reading-option"><legend>{label}</legend><div className="reading-choices">{children}</div></fieldset>
}

export function ReadingAppearance({ theme, setTheme, font, setFont, fontFamily, setFontFamily, lineHeight, setLineHeight, pageMode, setPageMode, dimImages, setDimImages, onModeApplied }: {
  theme: ReadingTheme; setTheme: (value: ReadingTheme) => void
  font: number; setFont: (value: number) => void
  fontFamily: 'serif' | 'sans'; setFontFamily: (value: 'serif' | 'sans') => void
  lineHeight: number; setLineHeight: (value: number) => void
  pageMode: 'page' | 'scroll'; setPageMode: (value: 'page' | 'scroll') => void
  dimImages: boolean; setDimImages: (value: boolean) => void
  /** 用户点「左右翻页」时回调：宿主应关闭设置弹层——面板不关会挡住翻页钮（docs/79 实测） */
  onModeApplied?: () => void
}) {
  // docs/79：只有切到「左右翻页」才收起面板——翻页模式的翻页钮会被本面板遮挡；
  // 「上下滚动」不挡任何控件，保持面板开着供连续微调（upgrade.spec 依赖此契约）。
  const chooseMode = (value: 'page' | 'scroll') => {
    setPageMode(value)
    if (value === 'page') onModeApplied?.()
  }
  return <div className="reading-appearance">
    <p className="reading-hint">按你喜欢的方式读，调整后立即生效。</p>
    <ReadingOption label="主题">
      {(['paper', 'sepia', 'night'] as const).map(value => <button key={value} className={`theme-choice theme-${value} min-h-[44px]`} aria-pressed={theme === value} onClick={() => setTheme(value)}><span className="theme-swatch" aria-hidden="true">Aa</span>{value === 'paper' ? '纸白' : value === 'sepia' ? '暖纸' : '夜间'}</button>)}
    </ReadingOption>
    <ReadingOption label="字号">
      <button aria-label="缩小字号" disabled={font <= 18} onClick={() => setFont(Math.max(18, font - 2))}>小一点</button>
      <output className="reading-font-value" aria-live="polite" aria-label="当前字号">{font}</output>
      <button aria-label="放大字号" disabled={font >= 30} onClick={() => setFont(Math.min(30, font + 2))}>大一点</button>
    </ReadingOption>
    <ReadingOption label="字体">
      {(['serif', 'sans'] as const).map(value => <button key={value} aria-pressed={fontFamily === value} onClick={() => setFontFamily(value)}>{value === 'serif' ? '书本字体' : '清晰字体'}</button>)}
    </ReadingOption>
    <ReadingOption label="行距">
      {[1.7, 1.9, 2.1].map((value, index) => <button key={value} aria-pressed={lineHeight === value} onClick={() => setLineHeight(value)}>{['紧凑', '舒适', '宽松'][index]}</button>)}
    </ReadingOption>
    <ReadingOption label="阅读方式">
      <button aria-pressed={pageMode === 'page'} onClick={() => chooseMode('page')}>左右翻页</button>
      <button aria-pressed={pageMode === 'scroll'} onClick={() => chooseMode('scroll')}>上下滚动</button>
    </ReadingOption>
    <label className="reading-toggle"><span>夜间调暗插图<small>只在夜间主题下生效</small></span><input type="checkbox" checked={dimImages} onChange={e => setDimImages(e.target.checked)} /></label>
  </div>
}
