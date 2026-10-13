import { readFile } from 'node:fs/promises'
import { z } from 'zod'
const snapshot = z.object({ sampledAt: z.string().datetime(), readOnly: z.literal(true), accounts: z.array(z.object({ accountId: z.string().max(64).optional(), bucket: z.string().max(100).optional(), coverage: z.string().max(100), bytes: z.number().nonnegative().optional(), count: z.number().nonnegative().optional(), stopBytes: z.number().positive().optional(), warningBytes: z.number().positive().optional(), wholeAccountVerified: z.boolean().optional(), verified: z.boolean().optional(), buckets: z.array(z.object({ bucket: z.string().max(100), bytes: z.number().nonnegative(), count: z.number().nonnegative() })).optional() })).max(10) })
export async function operationEvidence() {
  const path = process.env.TAO_OPS_EVIDENCE_PATH
  if (!path) return { available: false, reason: '尚未配置容量核查快照；容量未知，不能据此开始上传' }
  try {
    const bytes = await readFile(path)
    if (bytes.length > 256000) throw new Error('Snapshot too large')
    const value = snapshot.parse(JSON.parse(bytes.toString('utf8')))
    const ageMs = Date.now() - Date.parse(value.sampledAt)
    return { available: true, stale: ageMs < 0 || ageMs > 15 * 60000, ...value, caveat: '容量是采样值。旧账户保护为本机写入预约；其他主机、手工上传和新增桶必须另行核查。音频桶网关限制不能代替未完成分块及全账户核查。' }
  } catch { return { available: false, reason: '容量核查快照无效或不可读；容量未知，不能据此开始上传' } }
}
