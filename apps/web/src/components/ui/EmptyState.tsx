export interface EmptyStateProps {
  /** 旧设计系统入参（emoji/场景插画/吉祥物情绪）：v8 空态不再渲染旧品牌元素，仅保留签名兼容历史调用 */
  emoji?: string
  art?: string
  mood?: 'happy' | 'sleepy' | 'excited' | 'hint'
  title: string
  hint?: string
  /** 主行动按钮：空态必须有出口，不能是死路（docs/13 P1-1） */
  action?: { label: string; onClick: () => void }
}

/** 空态（v8 贴纸绘本语言）：桃字圆牌 + 展示字标题 + 正向引导文案，不再渲染旧吉祥物/插画 */
export function EmptyState({ emoji, art, mood, title, hint, action }: EmptyStateProps) {
  // 旧入参仅作签名兼容；v8 统一用桃字圆牌
  void emoji
  void art
  void mood
  return (
    <div className="panel" role="status" style={{ textAlign: 'center', padding: '30px 20px' }}>
      <span aria-hidden className="avatar big" style={{ margin: '0 auto 12px' }}>
        桃
      </span>
      <p style={{ fontFamily: 'var(--display)', fontSize: 20, fontWeight: 700, margin: 0 }}>{title}</p>
      {hint ? (
        <p style={{ color: 'var(--ink2)', fontSize: 14, marginTop: 6, maxWidth: '46ch', marginLeft: 'auto', marginRight: 'auto' }}>
          {hint}
        </p>
      ) : null}
      {action ? (
        <button type="button" className="sticker-btn primary" style={{ marginTop: 16 }} onClick={action.onClick}>
          {action.label}
        </button>
      ) : null}
    </div>
  )
}
