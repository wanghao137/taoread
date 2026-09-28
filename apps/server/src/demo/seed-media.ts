/**
 * 演示媒体台账播种（N13-002）。
 *
 * 问题：dev.db 里 artAsset 279 行 / videoAsset 203 行，磁盘文件也在 apps/server/media/。
 * 但演示库 demo.db 是独立 sqlite，这两张表是空的 → coverArtUrl/artUrl 恒为 null →
 * 前端回退 SVG 矢量图、TTS 降级 Web Speech、「让画面动起来」不渲染。
 *
 * 解法：从 dev.db 读台账行（含 scene → urlPath 映射），校验磁盘文件确实存在，
 * 幂等 upsert 进演示库。urlPath 是相对静态路由路径，两个库共用同一 media 目录。
 *
 * 不做：不拷贝文件（同目录）、不重新生成（零出网零成本）。
 */
import { existsSync } from 'node:fs'
import { join, isAbsolute } from 'node:path'
import type { PrismaClient } from '@prisma/client'

export interface MediaLedgerResult {
  art: number
  video: number
  skipped: number
}

function fileExists(mediaDir: string, urlPath: string | null): boolean {
  if (!urlPath) return false
  // urlPath 形如 /api/media/art/covers/cover-x.webp；媒体静态服务把 /api/media 映射到 mediaDir
  const rel = urlPath.replace(/^\/api\/media\//, '')
  const abs = isAbsolute(rel) ? rel : join(mediaDir, rel)
  return existsSync(abs)
}

/** dev.db 的实际位置 = Prisma schema 目录（Prisma 对 file: 相对 URL 的解析基准），cwd 是兜底 */
function resolveSqlitePath(url: string): string | null {
  const raw = url.startsWith('file:') ? url.slice(5) : url
  if (!raw || raw.startsWith(':memory:')) return null
  const clean = raw.split('?')[0]!
  if (isAbsolute(clean)) return clean
  // 相对路径：Prisma CLI/migrate 按 schema 目录解析，client 运行时按其生成时记录的
  // schema 目录解析——demo 的 schema 在 cwd/prisma 下，两个基准都探测
  const cwd = process.cwd()
  for (const base of [join(cwd, 'prisma'), cwd]) {
    const candidate = join(base, clean)
    if (existsSync(candidate)) return candidate
  }
  return null
}

/**
 * 从 dev.db 读取媒体台账并播种进演示库。
 *
 * @param db 演示库 Prisma 客户端
 * @param mediaDir 媒体根目录（与生产同一个 apps/server/media）
 * @param sourceUrl 源库连接串，默认 file:./dev.db
 */
export async function seedMediaLedger(
  db: PrismaClient,
  mediaDir: string,
  sourceUrl = 'file:./dev.db',
): Promise<MediaLedgerResult> {
  // 延迟引入，避免演示库与源库相同时的无谓自连
  const { PrismaClient: Prisma } = await import('@prisma/client')
  if (sourceUrl === process.env.TAO_DATABASE_URL) {
    return { art: 0, video: 0, skipped: 0 }
  }
  // 源库文件不存在（CI/全新 checkout 没有 dev.db）：没什么可播种，优雅跳过。
  // 若不拦，Prisma 对 sqlite 连接自动建空文件 → findMany 撞 P2021 → 整个演示服务起不来
  // （2026-09-28：CI e2e 23 连红的根因，本地有 dev.db 恒绿掩盖了它）。
  if (resolveSqlitePath(sourceUrl) === null) {
    return { art: 0, video: 0, skipped: 0 }
  }
  const src = new Prisma({ datasources: { db: { url: sourceUrl } } })

  let art = 0
  let video = 0
  let skipped = 0

  try {
    const arts = await src.artAsset.findMany()
    const artsWithUrl = arts.filter((a) => a.urlPath !== null)
    for (const a of artsWithUrl) {
      if (!fileExists(mediaDir, a.urlPath)) {
        skipped++
        continue
      }
      await db.artAsset.upsert({
        where: { scene: a.scene },
        create: {
          scene: a.scene,
          kind: a.kind,
          urlPath: a.urlPath!,
          width: a.width,
          height: a.height,
          bytes: a.bytes,
          prompt: a.prompt,
          model: a.model,
        },
        update: {
          urlPath: a.urlPath!,
          width: a.width,
          height: a.height,
          bytes: a.bytes,
        },
      })
      art++
    }

    // 只播种已落盘的 completed 视频；排队中的任务不种（演示里点「让画面动起来」会实时建任务）
    const videos = await src.videoAsset.findMany({
      where: { status: 'completed', urlPath: { not: null } },
    })
    for (const v of videos) {
      if (!fileExists(mediaDir, v.urlPath)) {
        skipped++
        continue
      }
      await db.videoAsset.upsert({
        where: { scene: v.scene },
        create: {
          scene: v.scene,
          kind: v.kind,
          taskId: v.taskId,
          status: 'completed',
          prompt: v.prompt,
          seconds: v.seconds,
          urlPath: v.urlPath,
          width: v.width,
          height: v.height,
          bytes: v.bytes,
          model: v.model,
        },
        update: {
          status: 'completed',
          urlPath: v.urlPath,
          bytes: v.bytes,
        },
      })
      video++
    }
  } finally {
    await src.$disconnect()
  }

  return { art, video, skipped }
}
