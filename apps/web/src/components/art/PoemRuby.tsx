/**
 * 拼音逐字对注（UI 复盘 P1）：把块级 text 与块级 pinyin 按行对齐成「字-音」对。
 * 生成器口径：每行拼音 = 每行汉字逐字注音（标点附着前字、以空格分隔）。
 * 行数不一致时返回 null，调用方保留原文并显示独立拼音段落。
 */
export function alignPoemPinyin(
  text: string,
  pinyin: string,
): Array<Array<{ ch: string; py: string | null; offset: number }>> | null {
  const tLines = text.split('\n')
  const pLines = pinyin.split('\n')
  if (tLines.length !== pLines.length) return null
  const syllables = pLines.map(line => line.trim().split(/\s+/).filter(Boolean))
  if (tLines.some((line, i) => Array.from(line).filter(ch => /\p{Script=Han}/u.test(ch)).length !== syllables[i]!.length)) return null
  let offset = 0
  return tLines.map((line, i) => {
    const tokens = syllables[i]!
    let ti = 0
    const chars = Array.from(line).map((ch) => {
      const start = offset
      offset += ch.length
      if (/\p{Script=Han}/u.test(ch)) {
        // 音节尾部可能带生成时附着的标点（标点本身也会渲染，需剥离避免重复显示）
        const py = (tokens[ti] ?? '').replace(/[^a-zA-Zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüńňǹɡ]*$/, '') || null
        ti += 1
        return { ch, py, offset: start }
      }
      return { ch, py: null, offset: start }
    })
    offset += 1
    return chars
  })
}

/** 逐字 ruby 诗文：拼音跟着单字换行，孩子能把音对回字 */
export function PoemRuby({
  text,
  pinyin,
  color,
  fontSize,
  activeOffset = -1,
}: {
  text: string
  pinyin: string
  color: string
  fontSize: number
  activeOffset?: number
}) {
  const lines = alignPoemPinyin(text, pinyin)
  if (!lines) {
    return (
      <div style={{ color }}>
        <p data-reading-text style={{ fontSize, whiteSpace: 'pre-line' }}>{text}</p>
        <p data-reading-ignore className="whitespace-pre-line text-sm leading-relaxed opacity-70">{pinyin}</p>
      </div>
    )
  }
  return (
    <div data-reading-text className="poem-ruby" style={{ color }}>
      {lines.map((chars, li) => (
        <p
          key={li}
          className="text-center leading-normal"
          style={{ fontSize, textIndent: 0, marginBottom: '0.65em' }}
        >
          {chars.map((c, ci) => {
            const offset = c.offset
            const highlight = {
              fontWeight: activeOffset >= offset && activeOffset < offset + c.ch.length ? 800 : undefined,
              opacity: activeOffset >= offset + c.ch.length ? 0.72 : 1,
            }
            return (
            c.py ? (
              <ruby key={ci} data-reading-offset={offset} style={{ lineHeight: 2, ...highlight }}>
                {c.ch}
                <rt
                  className="select-none"
                  style={{ fontSize: Math.max(13, Math.round(fontSize * 0.58)), letterSpacing: 0 }}
                >
                  {c.py}
                </rt>
              </ruby>
            ) : (
              <span key={ci} data-reading-offset={offset} style={{ lineHeight: 2, ...highlight }}>
                {c.ch}
              </span>
            ))
          })}
        </p>
      ))}
    </div>
  )
}
