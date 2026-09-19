import { motion } from 'framer-motion'
import { IconLamp, IconStar, IconBookOpen, IconSparkle } from '../../components/ui/icons'
import type { UnlockDto } from '../../lib/api'
import { unlockCopy } from '../../lib/finish'
import { TaCard, TaButton } from '../../components/ui'
import { SceneArt, TaoMascot } from '../../components/art/SceneArt'
import { MOTION, useReducedMotion } from '../../lib/motion'

export interface CelebrationScreenProps {
  unlocked: UnlockDto[]
  /** 回到月亮门（会话已收尾，门屏将是全新的一晚） */
  onBack: () => void
}

/** 收尾庆祝：纪念式成就展示（无兑换语义，docs/02 §3.4） */
export function CelebrationScreen({ unlocked, onBack }: CelebrationScreenProps) {
  const reduced = useReducedMotion()
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center gap-6 text-center">
      {/*
        庆祝背景（docs/22）：05-celebration 设计概念图（暖光夜灯墙）重度压暗做氛围层——
        庆祝时刻允许画面更「满」，但亮度压住，不刺激睡前情绪。
      */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-16 top-10 h-56 w-56 rounded-full bg-terra-50 blur-3xl" />
        <div className="absolute -right-14 top-1/3 h-48 w-48 rounded-full bg-kraft-300/30 blur-3xl" />
        <div className="absolute bottom-8 left-1/3 h-52 w-52 rounded-full bg-terra-100/60 blur-3xl" />
      </div>
      <motion.div
        aria-hidden
        className="relative h-28 w-28 overflow-hidden rounded-full shadow-[0_0_60px_rgba(242,192,120,0.45)]"
        initial={reduced ? MOTION.pageFade.initial : { rotate: -20, scale: 0.5, opacity: 0 }}
        animate={reduced ? MOTION.pageFade.animate : { rotate: 0, scale: [0.5, 1.04, 1], opacity: 1 }}
        // M3 Emphasized 曲线（「更大、更可见的运动…能量与表达力」）+ 有界过冲：
        // 每场阅读只此一次的庆祝时刻允许一点活泼，但过冲写死在 keyframe 里（4%），
        // 不用欠阻尼弹簧（原 stiffness200/damping14 会产生 ~16% 不可控过冲）
        transition={
          reduced ? MOTION.pageFade.transition : { duration: 0.55, ease: [0.05, 0.7, 0.1, 1], times: [0, 0.7, 1] }
        }
      >
        <SceneArt scene="loading-moon" />
      </motion.div>
      <TaoMascot mood="excited" className="h-12 w-12" />

      <h2 className="text-2xl font-bold leading-relaxed">
        今晚的故事
        <br />
        <span className="text-terra-600">稳稳收好啦</span>
      </h2>

      {unlocked.length > 0 && (
        <div className="flex w-full max-w-sm flex-col gap-3" aria-live="polite">
          {unlocked.map((u, i) => (
            <motion.div
              key={`${u.kind}-${u.value}`}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={reduced ? MOTION.pageFade.transition : { delay: 0.2 + i * 0.25 }}
            >
              <TaCard className="flex items-center gap-4">
                <span
                  aria-hidden
                  className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-terra-50 text-terra-500"
                >
                  {u.kind === 'night_lamp' ? <IconLamp size={26} /> : u.kind === 'streak_best' ? <IconStar size={26} /> : u.kind === 'book_done' ? <IconBookOpen size={26} /> : <IconSparkle size={26} />}
                </span>
                <span className="text-left text-lg font-bold leading-snug">
                  {unlockCopy(u)}
                </span>
              </TaCard>
            </motion.div>
          ))}
        </div>
      )}

      {unlocked.length === 0 && (
        <p className="text-base text-ink-700">每一次共读，都在点亮属于你们的小宇宙</p>
      )}

      <TaButton className="mt-2" onClick={onBack}>
        回到月亮
      </TaButton>
    </div>
  )
}
