/**
 * 书架「试听一下」的文本取料（docs/13 P0-4）。
 *
 * 不识字孩子的发现逻辑是「按一下，响不响 / 好不好听」，不是读标题。
 * 试听只取开头 2 句：足够判断这个故事的声音好不好听，又不剧透。
 */
const SENTENCE_END = /(?<=[。！？!?.\n])/

/** 纯标点/空白段（切出来的残渣） */
const PUNCT_ONLY = /^[\s。！？!?.,、；;：:·…—\-—-]*$/

/** 按句末标点切句（中英通用）；保留标点，空段与残渣丢弃 */
export function splitSentences(text: string): string[] {
  return text
    .split(SENTENCE_END)
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !PUNCT_ONLY.test(s))
}

/** 是否以拉丁字母为主（决定拼句时要不要补回空格） */
function isLatin(text: string): boolean {
  const letters = text.replace(/[^\p{L}]/gu, '')
  if (letters.length === 0) return false
  const latin = letters.replace(/[^\p{Script=Latin}]/gu, '')
  return latin.length > letters.length / 2
}

/**
 * 取开头若干句作为试听文本。
 * 规则：至少 1 句、最多 max 句；英文一句可能很长，用字符上限（60）提前刹住。
 * 拼句时拉丁文补回句间空格（trim 掉的空格要还回去，否则 "Hello.World."）。
 */
export function previewText(text: string, max = 2): string {
  const sents = splitSentences(text)
  if (sents.length === 0) return ''
  const picked: string[] = []
  let chars = 0
  for (const s of sents) {
    picked.push(s)
    chars += s.length
    if (picked.length >= max || chars >= 60) break
  }
  return picked.join(isLatin(text) ? ' ' : '')
}

/**
 * 英文 note 块切出可朗读的生词（docs/13 P0-5）。
 * CBF 格式约定："New word: nursery — 释义…"；切不出时返回 null（按钮不渲染）。
 */
export function extractNoteWord(text: string): string | null {
  const m = text.match(/new word:\s*([A-Za-z][A-Za-z'-]*)/i)
  return m ? (m[1] ?? null) : null
}
