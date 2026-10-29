/**
 * 注音驱动发音层（运行时，docs/97）。
 *
 * 数据来自 rubyPronunciation.generated.ts（由内容包注音生成，pos 为 UTF-16 索引）：
 *   - 替换：段文本命中条目行时，按位置把「注音≠默认音」的字换成声调一致的单读音
 *     同音字——确定性修正，不依赖引擎对多音字的判断；应用前校验位置上的原文，
 *     不符即跳过（幂等，允许其它修正层先行生效）。
 *   - 提示：无干净同音字的字符，走姓氏提示同款 instruction 通道。
 *
 * 展示层与时间轴始终使用原文。
 */
import { rubySubEntries, rubyHintEntries } from './rubyPronunciation.generated'

export function rubyPronunciation(text: string): string {
  for (const entry of rubySubEntries) {
    let start = text.indexOf(entry.line)
    if (start < 0) continue
    while (start >= 0) {
      for (const sub of entry.subs) {
        const at = start + sub.pos
        if (text.substr(at, sub.from.length) !== sub.from) continue
        text = text.slice(0, at) + sub.to + text.slice(at + sub.from.length)
      }
      start = text.indexOf(entry.line, start + entry.line.length)
    }
  }
  return text
}

export function rubyInstruction(text: string): string {
  const compact = text.replace(/\s+/g, '')
  const items: string[] = []
  for (const entry of rubyHintEntries) {
    if (!compact.includes(entry.line.replace(/\s+/g, ''))) continue
    for (const [char, pinyin] of entry.items) {
      if (!items.some(([c]) => c === char)) items.push(`${char}（${pinyin}）`)
    }
  }
  return items.length
    ? `以下是多音字读音提示，只用于发音，不读出拼音或本说明：${items.join('、')}`
    : ''
}
