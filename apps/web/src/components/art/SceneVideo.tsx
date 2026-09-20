/**
 * 章节动画（docs/13 P0-E）：把章节题图变成 5 秒动画。
 *
 * 交互：题图右上角「▶ 让画面动起来」按钮 → 创建异步任务 →
 * 友好的等待态（「小画家正在画动画…」+ 进度）→ 完成后题图原地变为视频播放器。
 * 再次打开同一章节：视频已缓存在服务端，秒播。
 *
 * 容错：生成失败/超时给出温和文案，可重试；不阻塞阅读。
 * 未配置视频服务时按钮根本不展示（后端 503 → 前端 probe 后隐藏）。
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { IconPlay } from '../ui/icons'
import { motion, AnimatePresence } from 'framer-motion'
import { AiBadge } from './AiBadge'
import { api, ApiError } from '../../lib/api'

type Phase = 'idle' | 'creating' | 'waiting' | 'ready' | 'error'

export interface SceneVideoProps {
  /** 场景键（与章节题图同键，服务端按此缓存） */
  scene: string
  /** 画面描述（与插画 prompt 同源，保证动起来的是同一幅画） */
  description: string
  /** 题图本身（未生成视频时展示静态插画） */
  children: React.ReactNode
  /** 画幅，与题图容器一致 */
  aspectRatio?: '16:9' | '9:16' | '1:1' | '3:4' | '4:3'
  /** 静态插画 URL：作为视频加载期 poster，避免黑帧（docs/26） */
  poster?: string | null
}

const POLL_INTERVAL_MS = 6000
const MAX_POLLS = 60 // 6 分钟仍未完成则提示

export function SceneVideo({ scene, description, children, aspectRatio = '16:9', poster }: SceneVideoProps) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [enabled, setEnabled] = useState<boolean | null>(null)
  const [paused, setPaused] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const pollTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pollCount = useRef(0)

  /** 启动时探测一次：已有缓存视频直接进 ready；后端 503 则永久隐藏按钮 */
  useEffect(() => {
    let cancelled = false
    api
      .videoStatus(scene)
      .then((res) => {
        if (cancelled) return
        if (res.status === 'completed' && res.videoUrl) {
          setVideoUrl(res.videoUrl)
          setPhase('ready')
          setEnabled(true)
        } else if (res.status === 'failed') {
          setEnabled(true)
        } else if (res.status !== 'queued' && res.status !== 'pending' && res.status !== 'in_progress') {
          setEnabled(true)
        } else {
          // 有进行中任务：恢复轮询
          setEnabled(true)
          setPhase('waiting')
          pollCount.current = 0
          schedulePoll()
        }
      })
      .catch((err) => {
        if (cancelled) return
        // 503 = 服务端未配置视频：永久隐藏按钮
        if (err instanceof ApiError && err.status === 503) {
          setEnabled(false)
        } else if (err instanceof ApiError && err.status === 404) {
          setEnabled(true)
        } else {
          setEnabled(true)
        }
      })
    return () => {
      cancelled = true
      if (pollTimer.current) clearTimeout(pollTimer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene])

  const schedulePoll = useCallback(() => {
    if (pollTimer.current) clearTimeout(pollTimer.current)
    pollTimer.current = setTimeout(() => void pollOnce(), POLL_INTERVAL_MS)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene])

  const pollOnce = useCallback(async () => {
    try {
      const res = await api.videoStatus(scene)
      if (res.status === 'completed' && res.videoUrl) {
        setVideoUrl(res.videoUrl)
        setPhase('ready')
        setErrorMsg(null)
        return
      }
      if (res.status === 'failed') {
        setPhase('error')
        setErrorMsg(res.error ?? '动画没有画成功，可以再试一次')
        return
      }
      pollCount.current += 1
      if (pollCount.current >= MAX_POLLS) {
        setPhase('error')
        setErrorMsg('动画排队太久了，待会儿再来看')
        return
      }
      schedulePoll()
    } catch {
      // 网络抖动：继续轮询，不惊动孩子
      pollCount.current += 1
      if (pollCount.current < MAX_POLLS) schedulePoll()
      else {
        setPhase('error')
        setErrorMsg('动画排队太久了，待会儿再来看')
      }
    }
  }, [scene, schedulePoll])

  const startGeneration = useCallback(async () => {
    setPhase('creating')
    setErrorMsg(null)
    pollCount.current = 0
    try {
      const res = await api.videoGenerate({
        scene,
        description,
        aspectRatio,
        seconds: 5,
      })
      if (res.status === 'completed' && res.videoUrl) {
        setVideoUrl(res.videoUrl)
        setPhase('ready')
        return
      }
      // queued / pending：开始轮询
      setPhase('waiting')
      schedulePoll()
    } catch (err) {
      setPhase('error')
      setErrorMsg(err instanceof ApiError ? err.message : '动画没有画成功，可以再试一次')
    }
  }, [scene, description, aspectRatio, schedulePoll])

  // 未启用（后端无视频配置）时，只渲染静态题图
  const showButton = enabled === true && phase !== 'ready'
  if (enabled === false) return <>{children}</>

  return (
    <div className="relative">
      {/* 视频 ready 后替换静态题图：自动静音循环（动起来的插画），点击画面暂停/继续，不用原生控件 */}
      {phase === 'ready' && videoUrl ? (
        <>
          <button
            type="button"
            aria-label={paused ? '继续播放' : '暂停动画'}
            onClick={() => {
              const v = videoRef.current
              if (!v) return
              if (v.paused) {
                void v.play()
                setPaused(false)
              } else {
                v.pause()
                setPaused(true)
              }
            }}
            className="relative block w-full cursor-pointer overflow-hidden rounded-3xl border-ink border-2 shadow-card"
          >
            <video
              ref={videoRef}
              src={videoUrl}
              poster={poster ?? undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full"
              style={{ aspectRatio: aspectRatio.replace(':', ' / '), backgroundColor: '#FFF0BD' }}
            />
            {paused ? (
              <span
                aria-hidden
                className="absolute inset-0 flex items-center justify-center bg-ink-300/30"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border-ink border-2 bg-paper-200 shadow-sm">
                  <IconPlay size={22} />
                </span>
              </span>
            ) : null}
          </button>
          <AiBadge label="AI 动画" />
        </>
      ) : (
        children
      )}

      {/* 入口按钮：未生成时展示在题图右上角 */}
      {showButton ? (
        <div className="absolute right-3 top-3">
          <button
            type="button"
            onClick={() => void startGeneration()}
            disabled={phase === 'creating' || phase === 'waiting'}
            className="flex min-h-touch items-center gap-1.5 rounded-full px-3 text-xs font-bold text-white shadow-lg backdrop-blur-sm disabled:opacity-80"
            style={{ background: 'rgba(193, 95, 60, 0.92)' }}
            aria-label="让画面动起来"
          >
            {phase === 'idle' || phase === 'error' ? (
              <>
                <IconPlay size={13} /> 让画面动起来
              </>
            ) : phase === 'creating' ? (
              <>正在排队…</>
            ) : (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
                  aria-hidden
                  className="inline-block h-3.5 w-3.5 rounded-full border-2 border-white/40 border-t-white"
                />
                小画家在画动画…
              </>
            )}
          </button>
        </div>
      ) : null}

      {/* 失败提示：温和、可重试、不阻塞阅读 */}
      <AnimatePresence>
        {phase === 'error' && errorMsg ? (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute inset-x-3 bottom-3"
          >
            <p className="rounded-xl bg-black/55 px-3 py-2 text-center text-xs text-white backdrop-blur-sm">
              {errorMsg}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
