/**
 * 字级时间轴估算（docs/13 P0-C）。
 *
 * stepaudio-3-gen-preview 不返回 timestamp，但 MP3 时长可以精确解析（逐帧累加）。
 * 策略：用音频实际时长反推每个字的开始时间，按「标点权重」而非均分分配——
 * 标点处自然停顿，停顿权重高于普通字。这比均分更贴合真实朗读节奏。
 * 精度：句级准（靠 boundary 事件），字级是估算（误差 100-300ms 可接受，高亮跟随即可）。
 */

import { parseMp3 } from './mp3duration'

export interface CharTime {
  /** 字符 */
  char: string
  /** 开始时间 ms */
  start: number
  /** 结束时间 ms（= start + duration；前端二分查找用 end 判区间） */
  end: number
}

export interface SegmentTimeline {
  /** 段在章节中的下标 */
  index: number
  /** 段文本 */
  text: string
  /** 该段音频总时长 ms */
  durationMs: number
  /** 字级时间轴（长度 = text.length） */
  chars: CharTime[]
}

/**
 * 标点停顿权重（单位：相当于多少个普通字的时间）。
 * 句末 > 分句 > 逗号 > 无标点。
 */
function punctWeight(ch: string): number {
  if (/[。！？!?]/.test(ch)) return 3.0
  if (/[；;]/.test(ch)) return 2.2
  if (/[，,、]/.test(ch)) return 1.8
  if (/[：:]/.test(ch)) return 1.5
  return 1.0
}

/**
 * 给一段文本 + 已知音频时长，估算字级时间轴。
 * @param text 段文本（已去除首尾空白）
 * @param durationMs 音频实际时长（由 parseMp3 得到）
 */
export function buildCharTimeline(text: string, durationMs: number): CharTime[] {
  const chars = [...text]
  if (chars.length === 0 || durationMs <= 0) return []
  // 总权重：每个字 1 + 标点附加
  let totalWeight = 0
  const weights = chars.map((ch) => {
    const w = punctWeight(ch ?? '')
    totalWeight += w
    return w
  })
  // 标点本身不发声但占时间；为了不让标点吃掉太多，把标点的额外权重折半
  totalWeight = weights.reduce((sum, w) => sum + (w > 1 ? 1 + (w - 1) * 0.5 : w), 0)

  const chars_out: CharTime[] = []
  let elapsed = 0
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i] ?? ''
    const w = weights[i] ?? 1
    const effective = w > 1 ? 1 + (w - 1) * 0.5 : w
    const duration = (effective / totalWeight) * durationMs
    chars_out.push({
      char: ch,
      start: Math.round(elapsed),
      end: Math.round(elapsed + duration),
    })
    elapsed += duration
  }
  // 最后一个字的结束对齐到音频末尾，避免累积误差
  const last = chars_out[chars_out.length - 1]
  if (last) {
    last.end = durationMs
  }
  return chars_out
}

/**
 * 从 MP3 buffer 构建整段时间轴。
 * @returns durationMs 与字级时间轴；解析失败时 durationMs=0
 */
export function timelineFromMp3(text: string, audio: Buffer): { durationMs: number; chars: CharTime[] } {
  const info = parseMp3(audio)
  if (!info) return { durationMs: 0, chars: [] }
  return { durationMs: info.durationMs, chars: buildCharTimeline(text, info.durationMs) }
}
