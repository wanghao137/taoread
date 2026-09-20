import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TaCard, TaButton } from '../../components/ui'
import { IconBookOpen } from '../../components/ui/icons'
import { SceneArt } from '../../components/art/SceneArt'

export interface DepartureScreenProps {
  title: string
  cover?: string
  deepLink?: string
  /** 纸质书会话：无 deepLink，展示纸书出发文案 */
  isPaper?: boolean
  /** 自研公版书（cbf:）：主按钮直达自研阅读器（无此通道时回退微信书提示） */
  onStartReader?: () => void
  /** 读完回来 → 进入收尾流 */
  onFinish: () => void
}

/** M3 出发卡：3-2-1 出发仪式 + 阅读通道。
 * deepLink 只使用网关回包原值；新开标签由用户手势触发（规避弹窗拦截）。 */
export function DepartureScreen({
  title,
  cover,
  deepLink,
  isPaper = false,
  onStartReader,
  onFinish,
}: DepartureScreenProps) {
  const [count, setCount] = useState(3)

  useEffect(() => {
    if (count === 0) return
    const timer = setTimeout(() => setCount((c) => c - 1), 700)
    return () => clearTimeout(timer)
  }, [count])

  const counting = count > 0

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
      {/* 3-2-1 出发倒计时（纯仪式，不承载跳转；跳转由用户手势点按钮） */}
      <div className="relative flex h-40 w-40 items-center justify-center">
        <AnimatePresence mode="wait">
          {counting ? (
            <motion.div
              key={count}
              aria-hidden
              className="absolute text-8xl font-bold text-terra-600"
              initial={{ scale: 1.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {count}
            </motion.div>
          ) : (
            <motion.div
              key="go"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 16 }}
              className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-3xl border border-paper-border bg-paper-200 shadow-lift"
            >
              {/* 只渲染本站媒体封面（外链 CDN 会被 ORB 拦成坏图且泄露孩子 IP），否则 SVG 回退 */}
              {cover && cover.startsWith('/api/') ? (
                <img src={cover} alt="" className="h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} />
              ) : (
                <SceneArt scene="bookshelf" className="h-full w-full" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: counting ? 0 : 1, y: counting ? 10 : 0 }}
        transition={{ delay: counting ? 0 : 0.15 }}
        className={`w-full max-w-sm ${counting ? 'pointer-events-none' : ''}`}
      >
        <h2 className="mb-1 text-xl font-bold leading-relaxed">
          出发！<span className="text-terra-600">《{title}》</span>
        </h2>
        <p className="mb-5 text-base text-ink-700">
          {isPaper ? '翻开纸书，故事开始啦' : '和爸爸妈妈一起，故事时间到'}
        </p>

        <TaCard className="flex flex-col gap-3">
          {!isPaper && deepLink && (
            <a
              href={deepLink}
              target="_blank"
              rel="noreferrer"
              className="bg-terra min-h-touch flex w-full items-center justify-center gap-2 rounded-full text-lg font-bold text-white"
            >
              <IconBookOpen size={18} /> 去微信读书读
            </a>
          )}
          {!isPaper && onStartReader && (
            <TaButton className="w-full" onClick={onStartReader}>
              <IconBookOpen size={18} /> 开始阅读
            </TaButton>
          )}
          {isPaper && (
            <div className="min-h-touch flex w-full items-center justify-center rounded-2xl border border-paper-border bg-paper-300 text-lg font-bold">
              翻开纸书吧
            </div>
          )}
          {!isPaper && !deepLink && !onStartReader && (
            <p className="min-h-touch flex w-full items-center justify-center rounded-2xl border border-paper-border bg-paper-300 px-4 text-center text-base text-ink-700">
              请爸爸妈妈在微信读书里找到这本《{title}》
            </p>
          )}
          <TaButton variant="secondary" onClick={onFinish}>
            读完回来了 → 去收尾
          </TaButton>
        </TaCard>

        <p className="mt-4 text-base text-ink-700">
          读完回到这里，这次的收尾小仪式等着你
        </p>
      </motion.div>
    </div>
  )
}
