/**
 * 孩子端首次运行引导（docs/13 P1-1）。
 *
 * 回答第四轮的第一性问题：「一个 4 岁、不识字的孩子第一次被塞了一台设备，
 * 有人教他吗？」之前答案是「没有」——无档案是死路，有档案直接进仪式闸门。
 *
 * 三步：月亮（今晚的故事在这里开始）→ 封面（点书架选书，不识字可以按小喇叭试听）
 *       → 喇叭（每一页都能听，听到睡着也没关系）。
 * localStorage 标记一次性，再进不烦；家长在设置里可重看（清标记）。
 *
 * 文案刻意零焦虑：不提「任务」「打卡」「必须」，只说「可以」「试试」。
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SceneArt, TaoMascot } from '../../components/art/SceneArt'

const STORAGE_KEY = 'taoread:onboarding-seen'

/** 孩子端是否已看过引导（SSR/node 环境无 localStorage，当作已看过，不阻塞主流程） */
export function onboardingSeen(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return true
  }
}

/** 家长侧「再看一遍」清除标记 */
export function resetOnboarding(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // 隐私模式/禁用存储：静默降级，引导不展示也不报错
  }
}

interface Step {
  art: string
  mood: 'happy' | 'sleepy' | 'excited'
  title: string
  hint: string
}

const STEPS: Step[] = [
  {
    art: 'moon-gate',
    mood: 'sleepy',
    title: '欢迎来到桃阅读',
    hint: '每个晚上，这里都会有一段故事等着你',
  },
  {
    art: 'nursery-window',
    mood: 'happy',
    title: '点一点书架，挑一本喜欢的',
    hint: '不认识字也没关系，每本书都能按小喇叭先试听一下',
  },
  {
    art: 'lamp-first',
    mood: 'excited',
    title: '翻开书，每一页都可以听',
    hint: '听着听着睡着了也没事，月亮会帮你记着读到哪里',
  },
]

export interface OnboardingTourProps {
  onDone: () => void
}

export function OnboardingTour({ onDone }: OnboardingTourProps) {
  const [step, setStep] = useState(0)
  const current = STEPS[step]!
  const isLast = step === STEPS.length - 1

  const next = () => {
    if (isLast) {
      try {
        localStorage.setItem(STORAGE_KEY, '1')
      } catch {
        // 存不下就存不下，这次看过了就行
      }
      onDone()
      return
    }
    setStep((s) => s + 1)
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 py-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative h-44 w-44 overflow-hidden rounded-3xl shadow-xl ring-1 ring-paper-border">
            <SceneArt scene={current.art} />
          </div>
          <TaoMascot mood={current.mood} className="h-12 w-12" />
          <div className="text-center">
            <p className="text-xl font-bold leading-relaxed text-ink-900">{current.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">{current.hint}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 步骤点 */}
      <div className="flex gap-2" aria-label={`第 ${step + 1} 步，共 ${STEPS.length} 步`}>
        {STEPS.map((_, i) => (
          <span
            key={i}
            className={`h-2 rounded-full transition-all ${i === step ? 'w-6 bg-terra-500' : 'w-2 bg-paper-border'}`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={next}
        className="min-h-touch w-full max-w-xs rounded-full bg-terra px-6 text-base font-bold text-white shadow-lg"
      >
        {isLast ? '出发，去听故事' : '下一步'}
      </button>

      {!isLast ? (
        <button
          type="button"
          onClick={() => {
            try {
              localStorage.setItem(STORAGE_KEY, '1')
            } catch {
              // 同上
            }
            onDone()
          }}
          className="min-h-touch px-4 text-sm text-ink-700"
        >
          跳过
        </button>
      ) : null}
    </div>
  )
}
