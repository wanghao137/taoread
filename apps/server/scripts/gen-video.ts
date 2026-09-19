/**
 * 批量生成 AI 视频（docs/13 P0-E / docs/15 媒体库扩充）。
 *
 * 用法：cd apps/server && npx tsx scripts/gen-video.ts [--limit 20] [--kind cover|chapter]
 *
 * 行为：
 *  - 遍历 ALL_PACKS 的封面 + 各章题图，为每个场景建一个 agnes-video 任务
 *  - 幂等：VideoAsset 已 completed 或仍在排队的场景跳过
 *  - 只建任务 + 轮询到完成 + 下载 mp4，不走 HTTP 路由（离线脚本）
 *  - 失败不中断：单个场景失败只记日志
 *  - 顺序执行：免费档排队满时退避重试，并发只会把队列塞更满
 *
 * 单个 4 秒视频渲染约 5 分钟；limit 控制本轮跑多少个（默认 20）。
 */
import 'dotenv/config'
import { createDb } from '../src/lib/db'
import { ALL_PACKS } from '../src/content/packs'
import {
  createVideoTask,
  queryVideoTask,
  downloadVideo,
  VideoError,
  type VideoGenDeps,
} from '../src/modules/media/video'
import { loadConfig, videoGenAvailable } from '../src/config'
import { chapterScene, coverScene } from '../src/content/service'
import { join } from 'node:path'

const args = new Set(process.argv.slice(2))
const limitArg = [...args].find((a) => a.startsWith('--limit='))?.slice('--limit='.length)
const LIMIT = limitArg ? Math.max(1, Math.min(200, Number(limitArg))) : 20

/** 轮询间隔：官方对状态查询有 429 限流，间隔至少 6 秒（比路由的 5 秒再保守一点） */
const POLL_INTERVAL_MS = 6_000
/** 单个视频最多轮询 40 分钟（渲染排队满时会很久） */
const POLL_MAX_MS = 40 * 60_000

async function main(): Promise<void> {
  const config = loadConfig()
  if (!videoGenAvailable(config)) {
    console.error('未配置 TAO_VIDEO_BASE / TAO_VIDEO_KEY，无法生成视频')
    process.exit(1)
  }
  const db = createDb(config.TAO_DATABASE_URL)
  const mediaDir = join(process.cwd(), 'media')
  const vd: VideoGenDeps = {
    base: config.TAO_VIDEO_BASE!,
    apiKey: config.TAO_VIDEO_KEY!,
    model: config.TAO_VIDEO_MODEL,
  }

  interface SceneJob {
    scene: string
    description: string
    label: string
  }
  const jobs: SceneJob[] = []
  for (const pack of ALL_PACKS) {
    jobs.push({
      scene: coverScene(pack.id),
      description: pack.coverArtPrompt ?? pack.intro ?? pack.title,
      label: `${pack.title}·封面`,
    })
    for (const ch of pack.chapters) {
      jobs.push({
        scene: chapterScene(pack.id, pack.chapters.indexOf(ch) + 1, ch.art),
        description: ch.artPrompt ?? `${pack.title}·${ch.title}：与内容相符的安静优美画面`,
        label: `${pack.title}·${ch.title}`,
      })
    }
  }

  let ok = 0
  let skip = 0
  let fail = 0
  let done = 0
  const t0 = Date.now()

  for (const job of jobs) {
    if (done >= LIMIT) break
    const existing = await db.videoAsset.findUnique({ where: { scene: job.scene } })
    if (existing && (existing.status === 'completed' || existing.status === 'queued' || existing.status === 'in_progress')) {
      skip++
      continue
    }
    // 已失败的也允许重试（队列满导致的失败值得重跑）
    done++
    console.log(`\n🎬 [${done}/${LIMIT}] ${job.label}（${job.scene}）`)

    const motionPrompt = `${job.description.trim()}，gentle camera slowly panning, soft animation, particles drifting, cinematic children book scene in motion`
    let taskId: string
    try {
      taskId = await createVideoTask(vd, { prompt: motionPrompt, seconds: 4, aspectRatio: '16:9' })
    } catch (err) {
      fail++
      console.log(`  ✗ 建任务失败：${err instanceof VideoError ? err.message : String(err).slice(0, 80)}`)
      continue
    }
    await db.videoAsset.upsert({
      where: { scene: job.scene },
      create: {
        scene: job.scene,
        kind: 'chapter',
        taskId,
        status: 'queued',
        prompt: motionPrompt,
        seconds: 4,
        model: vd.model,
      },
      update: { taskId, status: 'queued', prompt: motionPrompt, error: null, urlPath: null },
    })
    console.log(`  → 任务 ${taskId}，轮询中…`)

    // 轮询到完成或超时
    const deadline = Date.now() + POLL_MAX_MS
    let finished = false
    while (Date.now() < deadline) {
      await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS))
      let info
      try {
        info = await queryVideoTask(vd, taskId)
      } catch (err) {
        // 查询偶发失败不放弃，下一轮再查
        console.log(`  … 查询抖了一下：${err instanceof VideoError ? err.message : '网络错误'}`)
        continue
      }
      if (info.status === 'completed' && info.url) {
        try {
          const out = await downloadVideo(info.url, join(mediaDir, 'videos', `${taskId}.mp4`), vd.fetch ?? fetch)
          await db.videoAsset.update({
            where: { scene: job.scene },
            data: {
              status: 'completed',
              urlPath: `/api/media/videos/${taskId}.mp4`,
              bytes: out.bytes,
              width: 1280,
              height: 720,
            },
          })
          ok++
          console.log(`  ✓ 完成（${(out.bytes / 1024 / 1024).toFixed(1)}MB）`)
        } catch {
          fail++
          await db.videoAsset.update({
            where: { scene: job.scene },
            data: { status: 'failed', error: '渲染完成但下载失败' },
          })
          console.log('  ✗ 渲染完成但下载失败')
        }
        finished = true
        break
      }
      if (info.status === 'failed') {
        fail++
        await db.videoAsset.update({
          where: { scene: job.scene },
          data: { status: 'failed', error: info.error ?? '渲染失败' },
        })
        console.log(`  ✗ 渲染失败：${(info.error ?? '').slice(0, 80)}`)
        finished = true
        break
      }
      console.log(`  … ${info.status} ${info.progress}%`)
    }
    if (!finished) {
      fail++
      console.log('  ✗ 轮询超时（仍在云端排队，下次跑会重试）')
    }
  }

  const sec = ((Date.now() - t0) / 1000 / 60).toFixed(1)
  console.log(`\n完成：成功 ${ok}，跳过 ${skip}，失败 ${fail}（${sec} 分钟）`)
  await db.$disconnect()
}

main().catch((err) => {
  console.error('视频生成脚本失败：', err)
  process.exit(1)
})
