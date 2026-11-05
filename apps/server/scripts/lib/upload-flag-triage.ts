/**
 * 音频翻旗分诊核心（2026-11-01 性能传输收口轮 docs/102）。
 *
 * 契约（docs/superpowers/plans/2026-11-01-perf-transport-closeout.md 附录）：
 * - triage 决策表：network 优先 keep-network；headOk flip；否则本地在盘 keep-pending-upload / 缺 keep-missing
 * - headOk = R2 CDN HEAD 200 且 content-length > 0（只翻验证过的键：损坏的音频比慢的音频更糟）
 * - resolveAudioFileName 与运行时 publicSegmentAudioKey 语义一致：
 *   audioKey 64-hex 且有 model → audioKey；否则 key（非法 override 记 invalid 清单，不阻断）
 */
export type TriageAction = 'flip' | 'keep-pending-upload' | 'keep-missing' | 'keep-network'

export interface TriageInput {
  headOk: boolean
  network?: boolean
  localExists: boolean
}

export function triage(input: TriageInput): TriageAction {
  if (input.network) return 'keep-network'
  if (input.headOk) return 'flip'
  return input.localExists ? 'keep-pending-upload' : 'keep-missing'
}

const HEX64 = /^[a-f0-9]{64}$/

export interface FileNameResolution {
  name: string
  invalidOverride: boolean
}

export function resolveAudioFileName(key: string, info?: { audioKey?: unknown; model?: unknown }): FileNameResolution {
  const override = info?.audioKey
  if (override === undefined || override === null) return { name: key, invalidOverride: false }
  const valid =
    typeof override === 'string' &&
    HEX64.test(override) &&
    typeof info?.model === 'string' &&
    info.model.length > 0
  if (valid) return { name: override, invalidOverride: false }
  return { name: key, invalidOverride: true }
}
