/**
 * 纯 JS MP3 时长解析（无 ffmpeg 依赖）。
 * 逐帧扫描帧头，累加帧时长；对 CBR/VBR 都适用。
 * 用于 TTS 字级高亮的时间轴估算（docs/13 P0-C）。
 */

const BITRATES: Record<string, number[]> = {
  // index 0/15 保留，其余为 kbps
  mpeg1_layer3: [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 0],
  mpeg2_layer3: [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, 0],
}
const SAMPLE_RATES: Record<string, number[]> = {
  mpeg1: [44100, 48000, 32000, 0],
  mpeg2: [22050, 24000, 16000, 0],
  mpeg25: [11025, 12000, 8000, 0],
}

export interface Mp3Info {
  durationMs: number
  frames: number
  sampleRate: number
  /** 逐帧起始时间（ms），供时间轴对齐用 */
  frameTimes: number[]
}

/**
 * 解析 MP3 字节流。返回 null 表示不是有效 MP3。
 * 容错：遇到坏帧时跳过字节继续找同步字。
 */
export function parseMp3(buf: Buffer): Mp3Info | null {
  let offset = 0
  // 跳过 ID3v2 标签（前 3 字节 "ID3"）
  const id0 = buf[0]
  const id1 = buf[1]
  const id2 = buf[2]
  if (buf.length > 10 && id0 === 0x49 && id1 === 0x44 && id2 === 0x33) {
    const b6 = buf[6]
    const b7 = buf[7]
    const b8 = buf[8]
    const b9 = buf[9]
    if (b6 !== undefined && b7 !== undefined && b8 !== undefined && b9 !== undefined) {
      const size =
        ((b6 & 0x7f) << 21) | ((b7 & 0x7f) << 14) | ((b8 & 0x7f) << 7) | (b9 & 0x7f)
      offset = 10 + size
    }
  }

  let frames = 0
  let timeMs = 0
  let sampleRate = 0
  const frameTimes: number[] = []

  while (offset + 4 <= buf.length) {
    // 同步字：11 位全 1（0xFF 0xE0 掩码）
    const b0 = buf[offset]
    const b1 = buf[offset + 1]
    const b2 = buf[offset + 2]
    if (b0 === undefined || b1 === undefined || b2 === undefined) break
    if (b0 !== 0xff || (b1 & 0xe0) !== 0xe0) {
      offset += 1
      continue
    }
    const versionBits = (b1 >> 3) & 0x03 // 00=2.5 01=保留 10=MPEG2 11=MPEG1
    const layerBits = (b1 >> 1) & 0x03 // 01=LayerIII
    const bitrateIdx = (b2 >> 4) & 0x0f
    const sampleIdx = (b2 >> 2) & 0x03
    const padding = (b2 >> 1) & 0x01

    if (versionBits === 0b01 || layerBits !== 0b01) {
      offset += 1
      continue
    }
    const verKey = versionBits === 0b11 ? 'mpeg1' : versionBits === 0b10 ? 'mpeg2' : 'mpeg25'
    const brKey = verKey === 'mpeg1' ? 'mpeg1_layer3' : 'mpeg2_layer3'
    const bitrate = BITRATES[brKey]?.[bitrateIdx]
    const sr = (verKey === 'mpeg25' ? SAMPLE_RATES.mpeg25 : SAMPLE_RATES[verKey])?.[sampleIdx]
    if (!bitrate || !sr) {
      offset += 1
      continue
    }

    // Layer III 帧长 = floor(144 * bitrate*1000 / sampleRate) + padding
    const frameLen = Math.floor((144 * bitrate * 1000) / sr) + padding
    if (frameLen <= 0) {
      offset += 1
      continue
    }
    if (sampleRate === 0) sampleRate = sr
    frameTimes.push(Math.round(timeMs))
    // MPEG1 LayerIII 每帧 1152 采样，MPEG2/2.5 为 576
    const samplesPerFrame = versionBits === 0b11 ? 1152 : 576
    timeMs += (samplesPerFrame / sr) * 1000
    frames += 1
    offset += frameLen
  }

  if (frames === 0) return null
  return { durationMs: Math.round(timeMs), frames, sampleRate, frameTimes }
}
