import { motion } from 'framer-motion'
import { IconPeach } from '../../components/ui/icons'
import { TaCard, TaButton, Loading } from '../../components/ui'
import { SceneArt, TaoMascot } from '../../components/art/SceneArt'
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

/**
 * 阅读家园入口（docs/26 重构）：白天是主场景——太阳、山丘、随时出发。
 * 旧的「月亮仪式门」把阅读锚定在睡前；阅读本就不挑时间，这里改成全天候欢迎屏。
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

  return (
    <div className="flex flex-1 flex-col justify-center gap-8">
      <motion.div
        aria-hidden
        className="relative mx-auto h-32 w-32 overflow-hidden rounded-3xl border-ink border-2 shadow-card"
        animate={{ y: [6, -10, 6] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <SceneArt scene="sunrise-hills" />
      </motion.div>
      {/* 吉祥物小桃：有未收尾会话时眨眼提示，否则开心等着（docs/11 P0-5） */}
      <TaoMascot mood={active ? 'hint' : 'happy'} className="mx-auto h-14 w-14" />

      {active ? (
        <TaCard className="text-center">
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
        <div className="text-center">
          <h2 className="mb-2 font-display text-2xl font-bold leading-relaxed">
            今天读什么故事？
            <br />
            <span className="text-terra-600">挑一本，马上出发</span>
          </h2>
          <TaButton className="mx-auto mt-4" onClick={onStart}>
            去选书
          </TaButton>
        </div>
      )}

      <TaButton variant="ghost" size="md" className="mx-auto" onClick={onWall}>
        <IconPeach size={18} /> 我的桃子
      </TaButton>
    </div>
  )
}
