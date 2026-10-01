/**
 * docs/35 A4：生成后自动推送 R2——公共插画生成落盘后即上传公共桶，
 * 消除「新生成资产要走本地冷穿透直到下次人工 sync」的窗口。
 *
 * 边界：fire-and-forget——失败只记日志不阻断响应（sync-media-r2.mjs 幂等可重跑，
 * 是本机制失败时的兜底）；未配置 R2 凭据时静默跳过；fam: 私有素材绝不上传。
 */
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

let client: S3Client | null | undefined

function getClient(): S3Client | null {
  if (client !== undefined) return client
  client = null
  try {
    // 与 sync-media-r2.mjs 同源：.env 已由入口加载；.env.r2 在 apps/server 目录。
    // 值剥引号（dotenv 同语义——对抗审查 P2-5：手写解析遇 "value" 会把引号带进凭据）
    for (const p of ['.env.r2', join(process.cwd(), '.env.r2')]) {
      if (existsSync(p)) {
        for (const line of readFileSync(p, 'utf8').split('\n')) {
          const m = /^([A-Z0-9_]+)=(.*)$/.exec(line.trim())
          const value = (m?.[2] ?? '').trim().replace(/^["'](.*)["']$/, '$1')
          if (m && m[1] && process.env[m[1]] === undefined) process.env[m[1]] = value
        }
      }
    }
    const accountId = process.env.R2_ACCOUNT_ID
    const accessKey = process.env.R2_ACCESS_KEY_ID
    const secretKey = process.env.R2_SECRET_ACCESS_KEY
    if (!accountId || !accessKey || !secretKey) return null
    client = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: { accessKeyId: accessKey, secretAccessKey: secretKey },
    })
  } catch {
    client = null
  }
  return client
}

const bucket = () => process.env.TAO_R2_MEDIA_BUCKET || 'taoread-media'

/**
 * 推送一组公共媒体文件（mediaDir 相对路径）到 R2。fire-and-forget：
 * 调用方不 await 结果（内部已捕获全部异常），返回启动的 Promise 仅供测试。
 */
export function pushPublicFilesToR2(mediaDir: string, relPaths: string[]): Promise<void> {
  const s3 = getClient()
  if (!s3 || relPaths.length === 0) return Promise.resolve()
  return (async () => {
    for (const rel of relPaths) {
      // 对抗审查 P2-3：fam 判定与 sync 脚本同源——按 basename 前缀（文件名形如
      // fam-<fid>-…webp；rel 形如 art/covers/fam-….webp，按 rel.startsWith 永远拦不住）
      const base = rel.replaceAll('\\', '/').split('/').pop() ?? ''
      if (base.startsWith('fam-')) continue
      try {
        const abs = join(mediaDir, rel)
        if (!existsSync(abs)) continue
        const { readFile } = await import('node:fs/promises')
        const body = await readFile(abs)
        await s3.send(
          new PutObjectCommand({
            Bucket: bucket(),
            Key: rel.replace(/\\/g, '/'),
            Body: body,
            ContentType: rel.endsWith('.webp') ? 'image/webp' : rel.endsWith('.mp3') ? 'audio/mpeg' : 'application/octet-stream',
          }),
        )
      } catch (err) {
        console.log(
          JSON.stringify({
            r2push: 'failed',
            rel,
            err: err instanceof Error ? err.message : String(err),
          }),
        )
      }
    }
  })()
}
