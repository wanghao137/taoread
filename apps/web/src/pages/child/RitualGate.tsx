import { motion } from 'framer-motion'
import { TaCard, TaButton, Loading } from '../../components/ui'
import type { CosessionDto } from '../../lib/api'

export interface RitualGateProps {
  active: CosessionDto | null
  activeTitle: string | null
  checking: boolean
  /** 点亮月亮 → 进入选书流 */
  onStart: () => void
  /** 有未收尾会话：继续去读（出发卡） */
  onResume: () => void
  /** 有未收尾会话：读完啦，直接收尾（第 7 夜 M4） */
  onFinish: () => void
}

/** M1 仪式入口：月亮升起。有未收尾会话时给出「继续去读 / 读完收尾」双通道 */
export function RitualGate({ active, activeTitle, checking, onStart, onResume, onFinish }: RitualGateProps) {
  if (checking) {
    return <Loading label="看看昨晚的故事…" />
  }

  return (
    <div className="flex flex-1 flex-col justify-center gap-8">
      <motion.div
        aria-hidden
        className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-moon-300 text-7xl shadow-[0_0_80px_rgba(255,217,122,0.45)]"
        animate={{ y: [6, -10, 6] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        🌙
      </motion.div>

      {active ? (
        <TaCard className="text-center">
          <p className="text-lg font-bold leading-relaxed">
            {activeTitle ? `《${activeTitle}》` : '今晚的那本书'}
            <br />
            还没讲完呢
          </p>
          <p className="mt-1 text-ink-secondary">故事在老地方等你</p>
          <div className="mt-4 flex flex-col gap-3">
            <TaButton onClick={onResume}>继续去读</TaButton>
            <TaButton variant="secondary" onClick={onFinish}>
              读完啦，去收尾
            </TaButton>
          </div>
        </TaCard>
      ) : (
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold leading-relaxed">
            月亮升起来啦
            <br />
            <span className="text-moon-400">今晚读什么？</span>
          </h2>
          <TaButton className="mx-auto mt-4" onClick={onStart}>
            点亮月亮，去选书
          </TaButton>
        </div>
      )}
    </div>
  )
}
