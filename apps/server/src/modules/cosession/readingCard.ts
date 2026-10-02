/**
 * 模板版共读卡生成（docs/02 §2.2）：
 * 讲什么（3 条要点）｜问什么（3 个开放式问题，按年龄段 3-5/6-8/9-12 三档梯度）｜聊什么（话题钩子）。
 * 纯模板、确定性选择（同一本书+孩子稳定输出）；LLM 增强留第 12 夜，模板永远兜底。
 * 文案红线：正向表达，无焦虑话术（docs/02 §3.4）。
 */

export interface ReadingCardInput {
  bookTitle: string
  childStage: string // 3-5 | 6-8 | 9-12
  childId: string
  /** 书籍简介（来自 /book/info 回包 intro，可为空） */
  intro?: string | null
  /** 热门划线原文（来自 /book/bestbookmarks，按热度排序） */
  topBookmarks: readonly string[]
}

export interface ReadingCard {
  bookTitle: string
  stage: string
  tellPoints: string[]
  questions: string[]
  hook: string
  genType: 'template'
}

/** 稳定散列（djb2）：同一本书+孩子每次生成相同卡片，避免"每次打开问题都变"的浮躁感 */
function stableHash(text: string): number {
  let h = 5381
  for (let i = 0; i < text.length; i++) {
    h = ((h << 5) + h + text.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

const STAGE_TIPS: Record<string, string> = {
  '3-5': '读到孩子指着的那个地方时，可以停一停，一起看看那张画。',
  '6-8': '可以让孩子轮流读一小段，声音大小随他，读对读错都没关系。',
  '9-12': '可以各选一个最想聊的问题，先听孩子的答案，再说你的。',
}

function clip(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, max)}……`
}

export function generateReadingCard(input: ReadingCardInput): ReadingCard {
  const seed = stableHash(`${input.bookTitle}:${input.childId}`)
  const questions = [
    '《{title}》里，你想再看一次的是哪一段或哪张图？',
    '读到这里，你发现了什么？可以指给我看。',
    '这段文字让你想到了生活里的什么事？',
    '有没有想问的地方？我们可以一起找找。',
    '你会怎样把刚读到的内容说给家人听？',
    '你最想留下哪一句话？为什么？',
  ]
    .map((q) => q.includes('{title}') ? q.replaceAll('{title}', clip(input.bookTitle, 12)) : `读《${clip(input.bookTitle, 12)}》时，${q}`)
  // 从题库稳定取 3 个不重复的问题：起点由 seed 决定，步进取 2 避免相邻话题扎堆
  const picked: string[] = []
  for (let i = 0; i < 3 && i < questions.length; i++) {
    picked.push(questions[(seed + i * 2) % questions.length]!)
  }

  const tellPoints: string[] = []
  if (input.intro && input.intro.trim().length > 0) {
    tellPoints.push(`《${clip(input.bookTitle, 16)}》讲的是：${clip(input.intro.trim(), 60)}`)
  } else {
    tellPoints.push(`今晚我们一起读《${clip(input.bookTitle, 16)}》，慢慢来，读到哪算哪。`)
  }
  if (input.topBookmarks.length > 0) {
    tellPoints.push(
      `可以从这句话聊起：「${clip(input.topBookmarks[seed % input.topBookmarks.length]!, 40)}」`,
    )
  } else {
    tellPoints.push('读到喜欢的句子，可以一起读出声，读两遍也很好。')
  }
  tellPoints.push(STAGE_TIPS[input.childStage] ?? STAGE_TIPS['6-8']!)

  return {
    bookTitle: input.bookTitle,
    stage: input.childStage,
    tellPoints,
    questions: [...new Set(picked)],
    hook: '把今天读到的一个画面或一句话说给对方听，也可以只听一听。',
    genType: 'template',
  }
}
