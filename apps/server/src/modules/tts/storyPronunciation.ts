/**
 * 故事/古典诗文朗读修正层（2026-10-28 发音全量审查）。
 *
 * 审查结论（docs/96）：中文故事书里嵌入的古典诗文是 stepaudio 误读重灾区——
 * 罕读字/文读音（可汗 kèhán、胡骑 jì、天雨粟 yù、脉脉 mò、著 zhuó…）没有
 * 词典保护时按默认音读出。与 poetryPronunciation 同一机制：只替换「语音输入
 * 文本」，展示版与时间轴保留原字；只收全语料无歧义的词/行级条目，避免误伤
 * 普通白话（对照：还/长/重 这类高频多音字不收录，引擎白话语境下正确）。
 *
 * 每条注明：位置、应读、错读风险依据。替换字均为单一读音同音字。
 */
export function storyPronunciation(text: string): string {
  return text
    // folktale-mulan（木兰诗，教材定音）
    .replace(/军帖/g, '军贴') // 帖 tiē（文书），默认误读 tiě
    .replace(/可汗/g, '克寒') // 可汗 kèhán，默认误读 kěhàn
    .replace(/军书十二卷，卷卷有爷名/g, '军书十二倦，倦倦有爷名') // 卷量词 juàn，保险起见随段重建一并消除
    .replace(/愿为市鞍马/g, '愿未市鞍马') // 为 wèi（为此），默认易读 wéi
    .replace(/鞍鞯/g, '鞍尖') // 鞯 jiān，生僻防误读
    .replace(/辔头/g, '配头') // 辔 pèi，生僻防误读
    .replace(/鸣溅溅/g, '鸣尖尖') // 溅溅 jiānjiān（水声），默认误读 jiàn
    .replace(/燕山/g, '烟山') // 燕山 yānshān（山名），防读 yàn
    .replace(/胡骑/g, '胡寄') // 骑 jì（名物：战马/骑兵），默认误读 qí
    .replace(/朔气传金柝/g, '朔气传金唾') // 柝 tuò（打更木梆），生僻防误读
    .replace(/送儿还故乡/g, '送儿环故乡') // 还 huán（回），默认易读 hái
    .replace(/著我旧时裳/g, '浊我旧时常') // 著 zhuó（穿）、裳 cháng（古下衣），双误读
    .replace(/对镜帖花黄/g, '对镜贴花黄') // 帖 tiē（贴），默认误读 tiě
    .replace(/同行十二年/g, '同型十二年') // 同行 xíng（同行军），防读 háng
    // folktale-cowherd（迢迢牵牛星）
    .replace(/纤纤擢素手，札札弄机杼/g, '纤纤浊素手，闸闸弄机柱') // 擢 zhuó、札札 zházhá，生僻防误读
    .replace(/脉脉/g, '莫莫') // 脉脉 mòmò，防读 mài（任何语境均 mò，词级安全）
    // myth-shanhaijing（山海经文言）
    .replace(/姮娥/g, '恒娥') // 姮 héng，生僻防误读
    .replace(/知所辟就/g, '知所避就') // 辟通「避」bì，默认误读 pì
    .replace(/天雨粟/g, '天玉粟') // 雨 yù（名作动：降），默认误读 yǔ
    .replace(/杀鲧/g, '杀滚') // 鲧 gǔn，生僻防误读
    .replace(/鲧复生禹/g, '滚复生禹')
    .replace(/以堙洪水/g, '以因洪水') // 堙 yīn（填塞），生僻防误读
}
