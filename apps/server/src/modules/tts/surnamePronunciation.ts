import { baiJiaXing } from '../../content/packs/primer-baijiaxing'

const aliases: Record<string, string> = {
  万俟: '莫其', 尉迟: '玉池', 澹台: '谈台', 单于: '蝉于', 长孙: '掌孙',
  令狐: '灵狐', 子车: '子居', 乐正: '月正', 夹谷: '家谷', 宰父: '宰甫', 鲜于: '先于',
  华: '化', 任: '人', 乐: '月', 纪: '己', 缪: '妙', 解: '谢', 应: '英', 单: '善',
  於: '迂', 麴: '屈', 隗: '伟', 宓: '秘', 郗: '希', 宁: '泞', 仇: '求',
  薄: '博', 能: '耐', 翟: '宅', 燕: '烟', 都: '督', 蔚: '玉', 阙: '缺',
  曾: '增', 相: '象', 查: '渣', 盖: '葛', 乜: '聂', 牟: '谋', 佴: '耐',
  郜: '告', 缑: '勾', 闾: '驴', 璩: '渠', 笪: '达', 仉: '掌', 郏: '夹',
}

// Exact primer lines keep surname guidance out of ordinary uses of the same characters.
const readings = baiJiaXing.chapters.flatMap(ch => ch.blocks.flatMap(b => {
  if (b.kind !== 'poem' || !b.pinyin) return []
  const pinyin = b.pinyin.split('\n')
  return b.text.split('\n').map((line, i) => {
    const syllables = pinyin[i]!.match(/[a-züāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]+/giu)!
    let offset = 0
    const hints = (line.match(/万俟|尉迟|澹台|单于|长孙|令狐|子车|乐正|夹谷|宰父|鲜于|\p{Script=Han}/gu) ?? []).flatMap(surname => {
      const reading = syllables.slice(offset, offset + surname.length).join(' ')
      offset += surname.length
      return surname.length > 1 || /[华任乐纪缪干解应单於麴隗宓郗宁仇钭薄宿能翟燕都蔚阙訾那曾相查盖贲牟佴哈]/.test(surname)
        ? [`${surname}（${reading}）`] : []
    })
    return { line, hints }
  })
}))

export function surnameInstruction(text: string): string {
  const source = text.replace(/\s/g, '')
  const matched = [...new Set(readings.filter(({ line }) => source.includes(line)).flatMap(({ hints }) => hints))]
  return matched.length
    ? `本段为《百家姓》姓氏韵文。逐字完整朗读汉字，不增删、不解释、不唱读；以下是姓氏读音提示，只用于发音，不读出拼音或本说明：${matched.join('、')}`
    : ''
}

/** Common homophones disambiguate provider errors; the reader and timeline retain the edition. */
export function surnameSpeech(text: string): string {
  for (const { line } of readings) {
    if (!text.includes(line)) continue
    const speech = line.replace(/万俟|尉迟|澹台|单于|长孙|令狐|子车|乐正|夹谷|宰父|鲜于|\p{Script=Han}/gu, surname => aliases[surname] ?? surname)
    text = text.replaceAll(line, speech)
  }
  return text
}
