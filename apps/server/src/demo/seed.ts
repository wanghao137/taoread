/**
 * 演示家庭种子（`npm run demo`）：家庭 DEMO8888 + 两个孩子 + 过去两周的共读账本
 * （夜灯/最长连续/读完成就、金句、心情、进度），数据经真实业务路径落库。
 */
import type { PrismaClient } from '@prisma/client'
import { encryptSecret } from '../lib/crypto'

export const DEMO_FAMILY_CODE = 'PEACH888'
const DEMO_KEY = 'wrk-demo-key-0001'

/** 今天 20:30 起，向前推 n 晚的 startedAt */
function nightAt(daysAgo: number, hour = 20, minute = 30): Date {
  const d = new Date()
  d.setDate(d.getDate() - daysAgo)
  d.setHours(hour, minute, 0, 0)
  return d
}

export async function seedDemoFamily(db: PrismaClient): Promise<string> {
  // 幂等：已有演示家庭直接复用
  const existing = await db.family.findUnique({ where: { code: DEMO_FAMILY_CODE } })
  if (existing) return existing.id

  const family = await db.family.create({ data: { code: DEMO_FAMILY_CODE } })
  await db.family.update({ where: { id: family.id }, data: { code: DEMO_FAMILY_CODE } })

  // 绑定（演示 key，探针在 demo 模式恒成功）
  await db.wereadBinding.create({
    data: {
      familyId: family.id,
      ciphertext: await encryptSecret(DEMO_KEY, process.env.TAO_MASTER_KEY ?? 'demo-master-key-0123456789'),
      maskedTail: '****0001',
      status: 'active',
    },
  })

  // 孩子档案
  const tao = await db.childProfile.create({
    data: { familyId: family.id, nickname: '小桃', stage: '6-8' },
  })
  await db.childProfile.create({
    data: { familyId: family.id, nickname: '小柚', stage: '3-5' },
  })

  // BookCache（周报/详情的书名解析源；与 mock 网关目录一致）
  const books = [
    { bookId: '3300103106', title: '脑筋急转弯（套装共6册）', author: '亦凡', category: '童书-幼儿启蒙', deepLink: 'https://weread.qq.com/book-detail?type=1&v=e7f324f0813ab8ec6g016c6c' },
    { bookId: '506698', title: '十万个为什么（全集）', author: '方洲', category: '童书-幼儿启蒙', deepLink: 'https://weread.qq.com/book-detail?type=1&v=45b3278057bb4a45bbd2e61' },
    { bookId: '32858446', title: '西游记（小学生无障碍阅读版）', author: '李伯钦主编 李宏涛改写', category: '童书-儿童文学', deepLink: 'https://weread.qq.com/book-detail?type=1&v=9343238071f5614e9342a3d' },
    { bookId: '9000001', title: '小王子', author: '圣埃克苏佩里', category: '童书-儿童文学', deepLink: 'https://weread.qq.com/book-detail?type=1&v=9000001demo' },
    { bookId: '9000002', title: '夏洛的网', author: 'E.B.怀特', category: '童书-儿童文学', deepLink: 'https://weread.qq.com/book-detail?type=1&v=9000002demo' },
    { bookId: '9000003', title: '窗边的小豆豆', author: '黑柳彻子', category: '童书-儿童文学', deepLink: 'https://weread.qq.com/book-detail?type=1&v=9000003demo' },
  ]
  for (const b of books) {
    await db.bookCache.upsert({
      where: { bookId: b.bookId },
      create: { ...b, intro: null },
      update: { title: b.title },
    })
  }

  // 过去两周的共读账本：小桃每周 4-5 晚，时长 15-35 分钟，书轮换
  const rotation = [books[3], books[0], books[2], books[4], books[1], books[5]]
  const moods = ['happy', 'excited', 'calm', 'sleepy', 'thinking']
  const marks: Array<'little' | 'lot' | 'done'> = ['lot', 'lot', 'done', 'lot', 'little', 'done']
  const dayPlan = [1, 2, 3, 4, 6, 8, 9, 11, 12, 13, 15] // daysAgo：历史到昨天，今晚留给实时会话
  let bookIdx = 0
  let doneCount = 0
  const finishedBooks = new Set<string>()
  let streak = 0
  let bestStreak = 0

  for (const [i, daysAgo] of dayPlan.entries()) {
    const book = rotation[bookIdx % rotation.length]!
    bookIdx += 1
    const startedAt = nightAt(daysAgo)
    const durationSec = 15 * 60 + ((i * 7) % 20) * 60
    const endedAt = new Date(startedAt.getTime() + durationSec * 1000)
    const progressMark = marks[i % marks.length]!

    if (progressMark === 'done' && !finishedBooks.has(book.bookId)) {
      finishedBooks.add(book.bookId)
      doneCount += 1
    }
    streak = i > 0 && dayPlan[i]! - dayPlan[i - 1]! <= 1 ? streak + 1 : 1
    bestStreak = Math.max(bestStreak, streak)

    const session = await db.cosession.create({
      data: {
        familyId: family.id,
        childId: tao.id,
        bookId: book.bookId,
        startedAt,
        endedAt,
        durationSec,
        progressMark,
        mood: moods[i % moods.length]!,
      },
    })

    // 每晚 1-2 句金句（voice 为主，穿插 weread 热门划线）
    const quotePool = [
      { source: 'voice', text: '小王子说，重要的东西用眼睛是看不见的！' },
      { source: 'weread', text: '你在你的玫瑰身上花费的时间，让你的玫瑰变得如此重要。', markCount: 45231 },
      { source: 'voice', text: '夏洛在网上织字救小猪，太厉害了！' },
      { source: 'weread', text: '所有的大人都曾经是小孩，虽然，只有少数人记得。', markCount: 38900 },
    ]
    const quotes = [quotePool[i % quotePool.length]!]
    if (i % 3 === 0) quotes.push(quotePool[(i + 1) % quotePool.length]!)
    for (const q of quotes) {
      await db.highlightStar.create({
        data: {
          familyId: family.id,
          childId: tao.id,
          cosessionId: session.id,
          source: q.source,
          text: q.text,
          markCount: q.source === 'weread' ? (q.markCount ?? null) : null,
        },
      })
    }
  }

  // 夜灯与最长连续（账本级汇总成就，直接落库——种子与运行时解锁共用唯一约束防重）
  const achievements: Array<{ kind: string; value: number }> = [
    ...Array.from({ length: dayPlan.length }, (_, i) => ({ kind: 'night_lamp', value: i + 1 })),
    { kind: 'streak_best', value: bestStreak },
    ...Array.from({ length: doneCount }, (_, i) => ({ kind: 'book_done', value: i + 1 })),
  ]
  for (const a of achievements) {
    try {
      await db.achievement.create({
        data: { familyId: family.id, childId: tao.id, kind: a.kind, value: a.value },
      })
    } catch (err) {
      // 唯一约束命中（重复种子）跳过
      const code = typeof err === 'object' && err !== null && 'code' in err ? (err as { code?: string }).code : undefined
      if (code !== 'P2002') throw err
    }
  }

  return family.id
}
