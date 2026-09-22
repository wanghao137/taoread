import type { ChildDto } from '../../lib/api'

/**
 * 多孩家庭：孩子档案选择（单孩自动绑定，不进此屏）。
 * v8 贴纸绘本语言（2026-09-23 重设计）：品牌 mast + 大号贴纸名卡，
 * 首字圆牌头像，替换旧「纸与桃」TaCard 横条。
 */
export function ChildPicker({
  children,
  onPick,
  onExit,
}: {
  children: ChildDto[]
  onPick: (child: { childId: string; stage: string }) => void
  /** 退出到登录页（换家庭）；不传则不渲染出口 */
  onExit?: () => void
}) {
  return (
    <div className="app">
      <div className="wrap login-wrap">
        <header className="login-brand">
          <div className="logo big">
            <img src="/brand/logo-256.png" alt="桃阅读" />
          </div>
          <h1>今天是谁的故事时间？</h1>
          <p className="mono-line" style={{ fontSize: 11 }}>
            点点你的名字，故事就开始啦
          </p>
        </header>

        <div className="pick-grid">
          {children.map((c) => (
            <button
              key={c.id}
              type="button"
              className="pick-card"
              onClick={() => onPick({ childId: c.id, stage: c.stage })}
            >
              <span aria-hidden className="avatar big">
                {c.nickname.slice(0, 1)}
              </span>
              <span className="pick-name">{c.nickname}</span>
            </button>
          ))}
        </div>

        {onExit ? (
          <button type="button" className="linklike" style={{ alignSelf: 'center', marginTop: 6 }} onClick={onExit}>
            退出到登录页（换家庭）
          </button>
        ) : null}
      </div>
    </div>
  )
}
