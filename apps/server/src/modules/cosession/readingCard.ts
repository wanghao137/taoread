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

function pick<T>(items: readonly T[], seed: number, offset: number): T {
  return items[(seed + offset) % items.length]!
}

const QUESTIONS_BY_STAGE: Record<string, readonly string[]> = {
  '3-5': [
    '你最喜欢《{title}》里的哪一个画面呀？',
    '如果是你，你想和《{title}》里的谁做好朋友？',
    '故事里哪个地方让你笑出来了？',
    '你猜猜看，故事后面还会发生什么？',
    '《{title}》里的这个地方，你在别的地方见过吗？',
    '要是能给故事里的小家伙送一件礼物，你想送什么？',
  ],
  '6-8': [
    '《{title}》里的小朋友当时是什么心情？你从哪里看出来的？',
    '如果你在故事里，你会怎么帮他？',
    '故事开始和结束的时候，有什么不一样了？',
    '你有没有和《{title}》差不多的经历？当时是什么感觉？',
    '故事里哪句话你最想记下来？为什么呀？',
    '你觉得作者为什么把这个故事留到最后才讲完？',
  ],
  '9-12': [
    '《{title}》里如果要挑一个最重要的选择，你选哪一个？为什么？',
    '你同意故事里那个做法吗？有没有别的办法？',
    '这个故事让你想到了什么别的事？书里或生活里都算。',
    '如果换个角度，从另一个角色的眼睛看这一天，会是什么样？',
    '故事结束之后，你觉得主角接下来最想做什么？',
    '这本书和你之前读过的哪本有点像？哪里不一样？',
  ],
}

const HOOKS: readonly string[] = [
  '爸妈小时候也读过类似的故事，那时候我们……（讲一段你自己的小往事）',
  '我们家的书架上，这本书是哪一天来到我们家的？还记得吗？',
  '如果你来给这本书画一张封面，你会画什么？',
  '今晚故事里的那句话，适合写在我们家的哪扇门上？',
  '明年再读这本书的时候，你猜自己会有什么新发现？',
  '把今晚最喜欢的一个词悄悄告诉对方，不说理由。',
]

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
  const questions = (QUESTIONS_BY_STAGE[input.childStage] ?? QUESTIONS_BY_STAGE['6-8']!)
    .map((q) => q.replaceAll('{title}', clip(input.bookTitle, 12)))
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
      `很多读者都被这句话打动过：「${clip(input.topBookmarks[seed % input.topBookmarks.length]!, 40)}」`,
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
    hook: pick(HOOKS, seed, 3),
    genType: 'template',
  }
}
