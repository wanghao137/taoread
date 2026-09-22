export interface ErrorStateProps {
  /** 服务端返回的中文 message；未传时用通用文案 */
  message?: string
  onRetry?: () => void
}

/** 错误态（v8 贴纸绘本语言）：零指责文案 + 重试，不再渲染旧吉祥物/插画 */
export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div role="alert" className="panel" style={{ textAlign: 'center', padding: '30px 20px' }}>
      <span aria-hidden className="avatar big" style={{ margin: '0 auto 12px', background: 'var(--rose)' }}>
        ！
      </span>
      <p style={{ fontFamily: 'var(--display)', fontSize: 18, fontWeight: 700, margin: 0 }}>
        {message ?? '小桃走神了一下下'}
      </p>
      <p style={{ color: 'var(--ink2)', fontSize: 14, marginTop: 6 }}>再试一次，故事还在等着我们</p>
      {onRetry ? (
        <button type="button" className="sticker-btn primary" style={{ marginTop: 16 }} onClick={onRetry}>
          再试一次
        </button>
      ) : null}
    </div>
  )
}
