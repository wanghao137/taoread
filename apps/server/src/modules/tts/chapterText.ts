/**
 * 整章朗读键空间的单一事实源（2026-09-28 事故根修）。
 *
 * 事故：预生成（mom-warm@0.92@仅 text+poem）与运行时（客户端语速 1@非图全含 note）
 * 各自算键，公共预生成缓存对运行时命中率 0/6665——「9889/9889 上传收官」与
 * 「运行时可命中」是两个集合，从未对账。
 *
 * 契约：下列四个消费方必须且只能经由本模块取得取文口径与音色/语速默认值——
 *   1. 运行时路由  src/modules/tts/routes.ts
 *   2. 预生成      scripts/pregen-tts.mjs
 *   3. 死键清理    scripts/clean-media-r2.mjs（--tts-dead 期望键集）
 *   4. 覆盖率验收  scripts/check-tts-coverage.mjs（收官判据：命中率 ≥99%）
 */
import { DEFAULT_VOICE_ID } from './voices'

/** 参与整章朗读合成的块类型。生词卡（note）与图片不入朗读文本——
 * 与客户端 Web Speech 兜底口径一致，键空间以此为准。 */
export const SPEAK_BLOCK_KINDS = ['text', 'poem'] as const

export interface SpeakBlockLike {
  kind: string
  text: string
}

/** 章节块 → 朗读全文（块文本按序 '\n' 相连；与 chunkText 的输入坐标系一致） */
export function chapterSpeakText(blocks: readonly SpeakBlockLike[]): string {
  return blocks
    .filter((b) => (SPEAK_BLOCK_KINDS as readonly string[]).includes(b.kind))
    .map((b) => b.text)
    .join('\n')
}

/** 按书语言取预生成覆盖的默认音色（客户端未指定音色时运行时与此同源） */
export function speakVoiceId(lang: 'zh' | 'en'): string {
  return lang === 'en' ? 'en-storyteller' : DEFAULT_VOICE_ID
}
