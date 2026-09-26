/**
 * 拼音逐字对注（UI 复盘 P1）：把块级 text 与块级 pinyin 按行对齐成「字-音」对。
 * 生成器口径：每行拼音 = 每行汉字逐字注音（标点附着前字、以空格分隔）。
 * 行数不一致或音节缺漏时返回 null，调用方回退为整行拼音段落。
 */
export function alignPoemPinyin(
  text: string,
  pinyin: string,
): Array<Array<{ ch: string; py: string | null }>> | null {
  const tLines = text.split('\n')
  const pLines = pinyin.split('\n')
  if (tLines.length !== pLines.length) return null
  return tLines.map((line, i) => {
    const tokens = (pLines[i] ?? '').trim().split(/\s+/).filter(Boolean)
    let ti = 0
    return Array.from(line).map((ch) => {
      if (/\p{Script=Han}/u.test(ch)) {
        // 音节尾部可能带生成时附着的标点（标点本身也会渲染，需剥离避免重复显示）
        const py = (tokens[ti] ?? '').replace(/[^a-zA-Zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüńňǹɡ]*$/, '') || null
        ti += 1
        return { ch, py }
      }
      return { ch, py: null }
    })
  })
}

/** 逐字 ruby 诗文：拼音跟着单字换行，孩子能把音对回字 */
export function PoemRuby({
  text,
  pinyin,
  color,
  fontSize,
}: {
  text: string
  pinyin: string
  color: string
  fontSize: number
}) {
  const lines = alignPoemPinyin(text, pinyin)
  if (!lines) {
    return (
      <p className="whitespace-pre-line text-sm leading-relaxed opacity-70" style={{ color }}>
        {pinyin}
      </p>
    )
  }
  return (
    <div className="mt-1 space-y-2" style={{ color }}>
      {lines.map((chars, li) => (
        <p
          key={li}
          className="flex flex-wrap items-baseline justify-center gap-x-1 leading-normal"
          style={{ fontSize: fontSize * 0.62 }}
        >
          {chars.map((c, ci) =>
            c.py ? (
              <ruby key={ci} style={{ lineHeight: 2 }}>
                {c.ch}
                <rt
                  className="select-none"
                  style={{ fontSize: '0.6em', opacity: 0.72, letterSpacing: 0, transform: 'translateY(1px)' }}
                >
                  {c.py}
                </rt>
              </ruby>
            ) : (
              <span key={ci} style={{ lineHeight: 2 }}>
                {c.ch}
              </span>
            ),
          )}
        </p>
      ))}
    </div>
  )
}
