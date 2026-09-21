import { motion } from 'framer-motion'
import { IconPeach } from '../../components/ui/icons'
import { TaCard, TaButton, Loading } from '../../components/ui'
import type { CosessionDto } from '../../lib/api'

export interface RitualGateProps {
  active: CosessionDto | null
  activeTitle: string | null
  checking: boolean
  /** 服务端判定：活跃会话超过软封顶 → 温和引导收尾（第 8 夜） */
  overtime?: boolean
  onStart: () => void
  /** 有未收尾会话：继续去读（出发卡） */
  onResume: () => void
  /** 有未收尾会话：读完啦，直接收尾（第 7 夜 M4） */
  onFinish: () => void
  /** 打开桃子成就墙 */
  onWall: () => void
}

/** 门屏漂浮贴纸装饰（纯装饰，aria-hidden；reduced-motion 时静止） */
function FloatSticker({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.span
      aria-hidden
      className={`pointer-events-none absolute rounded-2xl ${className}`}
      animate={{ y: [0, -10, 0], rotate: [-4, 4, -4] }}
      transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}

/**
 * 阅读家园入口（docs/26 重构）：白天是主场景——随时出发。
 * 移动端竖排：品牌桃子贴纸卡 + 标题 + CTA；
 * 宽屏（lg）左右分栏：左侧品牌插画区（桃子 logo + 漂浮贴纸），右侧操作区。
 * 有未收尾会话时给出「继续去读 / 读完收尾」双通道。
 */
export function RitualGate({
  active,
  activeTitle,
  checking,
  overtime = false,
  onStart,
  onResume,
  onFinish,
  onWall,
}: RitualGateProps) {
  if (checking) {
    return <Loading label="看看上次读到哪儿…" />
  }

  const actions = active ? (
    <TaCard className="w-full max-w-md text-center">
      <p className="text-lg font-bold leading-relaxed">
        {activeTitle ? `《${activeTitle}》` : '上次那本书'}
        <br />
        {overtime ? '故事讲完啦' : '还没讲完呢'}
      </p>
      <p className="mt-1 text-ink-700">
        {overtime ? '把这次阅读好好收进纪念册' : '故事在老地方等你'}
      </p>
      <div className="mt-4 flex flex-col gap-3">
        {overtime ? (
          <>
            <TaButton onClick={onFinish}>去收尾</TaButton>
            <TaButton variant="secondary" onClick={onResume}>
              再多读一小段
            </TaButton>
          </>
        ) : (
          <>
            <TaButton onClick={onResume}>继续去读</TaButton>
            <TaButton variant="secondary" onClick={onFinish}>
              读完啦，去收尾
            </TaButton>
          </>
        )}
      </div>
    </TaCard>
  ) : (
    <div className="w-full max-w-md text-center">
      <h2 className="mb-2 font-display text-2xl font-bold leading-relaxed lg:text-4xl">
        今天读什么故事？
        <br />
        <span className="text-terra-600">挑一本，马上出发</span>
      </h2>
      <TaButton className="mx-auto mt-4" onClick={onStart}>
        去选书
      </TaButton>
    </div>
  )

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 lg:flex-row lg:gap-40">
      {/* 品牌区：桃子 logo 贴纸卡 + 漂浮贴纸（贴纸整体撤到卡片轮廓外，不与描边/右卡相交） */}
      <div className="relative flex flex-col items-center">
        <div className="relative">
          <FloatSticker className="left-[-3rem] top-2 h-7 w-7 rounded-full bg-sun lg:left-[-5rem] lg:top-6 lg:h-12 lg:w-12" />
          <FloatSticker className="right-[-2.6rem] top-24 h-5 w-5 rounded-full bg-sky lg:right-[-2rem] lg:top-40 lg:h-9 lg:w-9" delay={0.8} />
          <FloatSticker className="bottom-14 left-[-2.6rem] h-4 w-4 rounded-full bg-rose lg:bottom-28 lg:left-[-3.6rem] lg:h-7 lg:w-7" delay={1.6} />
          <FloatSticker className="bottom-2 right-[-2.2rem] h-6 w-6 rotate-12 rounded-lg bg-mint lg:right-[-1.4rem] lg:h-10 lg:w-10" delay={2.2} />
          <motion.img
            src="/brand/logo-256.png"
            alt="桃阅读"
            className="h-40 w-40 rounded-[2rem] border-ink border-2 bg-paper-200 object-cover shadow-card lg:h-72 lg:w-72 lg:rounded-[2.75rem]"
            animate={{ y: [4, -8, 4], rotate: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {/* 操作区 */}
      <div className="flex w-full flex-col items-center gap-5 lg:w-auto lg:items-start">
        {actions}
        <TaButton variant="secondary" size="md" className="mx-auto lg:mx-0" onClick={onWall}>
          <IconPeach size={18} /> 我的桃子
        </TaButton>
      </div>
    </div>
  )
}
