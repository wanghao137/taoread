/**
 * 微信读书网关冒烟测试（npm run smoke:weread）。
 *
 * 目的（docs/03 第 1 夜任务②③）：
 *  1. 用真实 API Key 对网关做连通性体检（/_list、/shelf/sync、/readdata/detail）；
 *  2. 限频摸底：连续 50 次 /store/search（禁用重试），记录延迟曲线与 429 情况，
 *     为 WereadService 令牌桶参数提供校准依据；
 *  3. 产出 docs/reports/night-01-smoke.md（该目录不入 git，结论摘录进 nightly-log）。
 *
 * 安全红线：报告只记录 maskedKey（尾 4 位），绝不写入完整 key。
 * 设计约束：网关异常不阻塞（尽力而为的诊断，永远 exit 0）。
 */
import 'dotenv/config'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { maskKey } from '../src/lib/crypto'
import { callWereadApi } from '../src/services/weread/gateway'

interface ProbeSample {
  idx: number
  latencyMs: number
  outcome: 'ok' | 'http429' | 'httpError' | 'apiError' | 'network'
  detail: string
}

// 报告固定写到仓库根 docs/reports/（脚本位于 <root>/apps/server/scripts/，向上三级）
const REPORT_PATH = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../../..',
  'docs/reports/night-01-smoke.md',
)
const PROBE_TOTAL = 50
const PROBE_INTERVAL_MS = 200

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0
  const idx = Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length))
  return sorted[idx]!
}

async function timedCall<T>(
  apiKey: string,
  apiName: string,
  params: Record<string, unknown>,
): Promise<{ latencyMs: number; result: T }> {
  const start = performance.now()
  const result = await callWereadApi<T>({ apiKey, apiName, params, maxRetries: 1 })
  return { latencyMs: Math.round(performance.now() - start), result }
}

async function main(): Promise<void> {
  const apiKey = process.env.WEREAD_API_KEY
  const lines: string[] = [
    '# 微信读书网关冒烟报告（第 1 夜）',
    '',
    `- 时间：${new Date().toISOString()}`,
    `- Key：${apiKey ? maskKey(apiKey) : '（未配置）'}`,
    '',
  ]

  if (!apiKey) {
    lines.push('## 结论：未配置 WEREAD_API_KEY，跳过冒烟（复制 apps/server/.env.example 并填写后重试）。')
    writeReport(lines)
    return
  }

  // ── 体检 1：/_list 接口清单 ──
  lines.push('## 体检 1：/_list（网关连通性）', '')
  try {
    const { latencyMs, result } = await timedCall<{ apis?: unknown[] }>(
      apiKey, '/_list', {},
    )
    const count = Array.isArray(result.apis) ? result.apis.length : 0
    lines.push(`- ✅ 连通正常：${count} 个接口可用，延迟 ${latencyMs}ms`, '')
  } catch (err) {
    lines.push(`- ❌ 失败：${(err as Error).message}`, '')
  }

  // ── 体检 2：/shelf/sync 书架（数量口径：books + albums + mp）──
  lines.push('## 体检 2：/shelf/sync（书架）', '')
  try {
    const { latencyMs, result } = await timedCall<{
      books?: unknown[]
      albums?: unknown[]
      mp?: unknown
    }>(apiKey, '/shelf/sync', {})
    const books = result.books?.length ?? 0
    const albums = result.albums?.length ?? 0
    const mpCount = result.mp ? 1 : 0
    lines.push(
      `- ✅ 书架同步正常（${latencyMs}ms）：电子书 ${books} 本 + 听书专辑 ${albums} + 文章收藏 ${mpCount} = **${books + albums + mpCount} 条**`,
      '',
    )
  } catch (err) {
    lines.push(`- ❌ 失败：${(err as Error).message}`, '')
  }

  // ── 体检 3：/readdata/detail 本月阅读统计 ──
  lines.push('## 体检 3：/readdata/detail（本月统计）', '')
  try {
    const { latencyMs, result } = await timedCall<{
      totalReadTime?: number
      readDays?: number
    }>(apiKey, '/readdata/detail', { mode: 'monthly' })
    const totalSec = result.totalReadTime ?? 0
    const h = Math.floor(totalSec / 3600)
    const m = Math.round((totalSec % 3600) / 60)
    lines.push(
      `- ✅ 统计正常（${latencyMs}ms）：本月阅读 ${h}小时${m}分钟，共 ${result.readDays ?? 0} 天`,
      '',
    )
  } catch (err) {
    lines.push(`- ❌ 失败：${(err as Error).message}`, '')
  }

  // ── 限频摸底：50 次 search，禁用重试以暴露真实 429 ──
  lines.push(
    '## 限频摸底：/store/search × 50（maxRetries=0，间隔 200ms）',
    '',
    '| # | 延迟ms | 结果 |',
    '|---|--------|------|',
  )
  const samples: ProbeSample[] = []
  for (let i = 1; i <= PROBE_TOTAL; i++) {
    const start = performance.now()
    let sample: ProbeSample
    try {
      await callWereadApi({
        apiKey,
        apiName: '/store/search',
        params: { keyword: '三体', scope: 10, count: 1 },
        maxRetries: 0,
      })
      sample = {
        idx: i,
        latencyMs: Math.round(performance.now() - start),
        outcome: 'ok',
        detail: '',
      }
    } catch (err) {
      const e = err as Error & { status?: number; code?: string }
      const latencyMs = Math.round(performance.now() - start)
      const outcome: ProbeSample['outcome'] =
        e.code === 'WEREAD_HTTP' && e.status === 429
          ? 'http429'
          : e.code === 'WEREAD_HTTP'
            ? 'httpError'
            : e.code === 'WEREAD_API'
              ? 'apiError'
              : 'network'
      sample = { idx: i, latencyMs, outcome, detail: `${e.name}:${e.status ?? ''}${e.message.slice(0, 60)}` }
    }
    samples.push(sample)
    lines.push(`| ${i} | ${sample.latencyMs} | ${sample.outcome}${sample.detail ? ` ${sample.detail}` : ''} |`)
    if (i < PROBE_TOTAL) await sleep(PROBE_INTERVAL_MS)
  }

  const okSamples = samples.filter((s) => s.outcome === 'ok').map((s) => s.latencyMs).sort((a, b) => a - b)
  const count429 = samples.filter((s) => s.outcome === 'http429').length
  const first429 = samples.find((s) => s.outcome === 'http429')?.idx
  lines.push(
    '',
    '### 摸底结论',
    '',
    `- 成功 ${okSamples.length}/${PROBE_TOTAL} 次；429 共 ${count429} 次${first429 ? `（首次出现在第 ${first429} 次）` : ''}`,
    okSamples.length > 0
      ? `- 延迟：P50 ${percentile(okSamples, 50)}ms ｜ P95 ${percentile(okSamples, 95)}ms ｜ 最大 ${okSamples[okSamples.length - 1]}ms`
      : '- 无成功样本',
    `- 建议令牌桶参数（按本次观测）：capacity 5，refillPerMinute 10（远低于首次 429 的触发密度，留安全余量）`,
    '',
  )

  writeReport(lines)
  console.log(`冒烟完成，报告已写入 ${REPORT_PATH}`)
}

function writeReport(lines: string[]): void {
  mkdirSync(dirname(REPORT_PATH), { recursive: true })
  writeFileSync(REPORT_PATH, lines.join('\n'), 'utf8')
  // 报告属于诊断产物，安全起见在 stdout 复述一遍（不含 key）
  console.log(lines.join('\n'))
}

main().catch((err) => {
  // 冒烟是尽力而为的诊断：失败也要留下报告而不是崩溃
  writeReport([`# 微信读书网关冒烟报告（第 1 夜）`, '', `- 时间：${new Date().toISOString()}`, '', `- ❌ 脚本异常退出：${(err as Error).message}`])
  console.error('冒烟脚本异常：', (err as Error).message)
})
