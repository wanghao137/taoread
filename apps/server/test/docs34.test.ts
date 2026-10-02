/**
 * docs/34 缺失功能清单（2026-09-28）服务端专项测试：
 *   1) 隐私同意留痕（P1-3）：创建家庭必须携带同意版本，缺省 400；
 *   2) 每日阅读提醒（P1-2）：dailyLimitMode 纯函数 + window 端点联动；
 *   3) 周报按角色裁剪（P0-10）：孩子角色不回传书目清单/寄语；
 *   4) 读后小测（P1-5）：机械出题确定性 + 干扰项可证伪；
 *   5) 识字量速测（P1-8）：20 题 4 选项 + 建议阈值。
 */
import { describe, expect, it } from 'vitest'
import { buildWordQuiz } from '../src/content/quiz'
import { buildLiteracyTest, literacySuggestion } from '../src/content/literacy'
import { dailyLimitMode } from '../src/modules/ritual/routes'
import {
  createChild,
  createFamilyAsParent,
  joinFamily,
  authHeaders,
  makeApp,
} from './helper'

describe('P1-3 隐私同意留痕', () => {
  it('缺 agreeVersion 拒绝创建（400）', async () => {
    const h = await makeApp()
    const res = await h.app.inject({ method: 'POST', url: '/api/family', payload: { deviceId: 'd1' } })
    expect(res.statusCode).toBe(400)
  })
  it('携带 agreeVersion 创建成功并写入 privacy_consent 事件', async () => {
    const h = await makeApp()
    const res = await h.app.inject({
      method: 'POST',
      url: '/api/family',
      payload: { deviceId: 'd1', agreeVersion: '2026-09-28' },
    })
    expect(res.statusCode).toBe(201)
    const { familyId } = res.json() as { familyId: string }
    const events = await h.db.eventLog.findMany({ where: { familyId, event: 'privacy_consent' } })
    expect(events).toHaveLength(1)
    expect(events[0]!.role).toBe('parent')
  })
})

describe('P1-2 每日阅读提醒', () => {
  it('dailyLimitMode：null/未到量 open，到量 daily_limit', () => {
    expect(dailyLimitMode(null, 10_000_000)).toBe('open')
    expect(dailyLimitMode(0, 10_000_000)).toBe('open')
    expect(dailyLimitMode(20, 20 * 60 - 1)).toBe('open')
    expect(dailyLimitMode(20, 20 * 60)).toBe('daily_limit')
    expect(dailyLimitMode(20, 20 * 60 + 3600)).toBe('daily_limit')
  })
  it('window 端点回传 limitMin 与 usedMin；设置页可写', async () => {
    const h = await makeApp()
    const parent = await createFamilyAsParent(h.app)
    const childId = await createChild(h.app, parent.token, parent.familyId)
    await h.app.inject({
      method: 'PATCH',
      url: `/api/family/${parent.familyId}/settings`,
      headers: authHeaders(parent.token),
      payload: { dailyReadingLimitMin: 30 },
    })
    const child = await joinFamily(h.app, parent.familyCode, 'child')
    const res = await h.app.inject({
      method: 'GET',
      url: `/api/ritual/window?childId=${childId}`,
      headers: authHeaders(child.token),
    })
    expect(res.statusCode).toBe(200)
    const body = res.json() as { mode: string; limitMin: number | null; usedMin: number }
    expect(body.mode).toBe('open')
    expect(body.limitMin).toBe(30)
    expect(body.usedMin).toBe(0)
  })
})

describe('P0-10 周报按角色裁剪', () => {
  it('孩子角色拿不到书目清单与寄语；家长角色拿得到', async () => {
    const h = await makeApp()
    const parent = await createFamilyAsParent(h.app)
    const child = await joinFamily(h.app, parent.familyCode, 'child')
    const childRes = await h.app.inject({
      method: 'GET',
      url: `/api/reports/weekly?familyId=${parent.familyId}`,
      headers: authHeaders(child.token),
    })
    expect(childRes.statusCode).toBe(200)
    const childReport = (childRes.json() as { report: Record<string, unknown> }).report
    expect(childReport).not.toHaveProperty('books')
    expect(childReport).not.toHaveProperty('nextWeekHint')
    expect(childReport).toHaveProperty('nights')
    expect(childReport).toHaveProperty('highlights')
    const parentRes = await h.app.inject({
      method: 'GET',
      url: `/api/reports/weekly?familyId=${parent.familyId}`,
      headers: authHeaders(parent.token),
    })
    const parentReport = (parentRes.json() as { report: Record<string, unknown> }).report
    expect(parentReport).toHaveProperty('books')
    expect(parentReport).toHaveProperty('nextWeekHint')
  })
})

describe('P1-5 读后小测（机械出题）', () => {
  it('确定性 seed 出同一份题；正确答案来自本章；干扰项不在本章出现', () => {
    const chapterTexts = ['小桃子在树下捡到了一颗会发光的桃子。', '风把桃子的光吹得一闪一闪。']
    const distractorTexts = ['老爷爷提着灯笼走进森林深处。', '远处的山坡上开满了野菊花。']
    const a = buildWordQuiz({
      bookTitle: '发光的桃子',
      chapterOrder: 2,
      lang: 'zh',
      chapterTexts,
      distractorTexts,
      seed: 'seed-1',
    })
    const b = buildWordQuiz({
      bookTitle: '发光的桃子',
      chapterOrder: 2,
      lang: 'zh',
      chapterTexts,
      distractorTexts,
      seed: 'seed-1',
    })
    expect(a).not.toBeNull()
    expect(a).toEqual(b)
    expect(a!.options).toHaveLength(3)
    expect(a!.options[a!.answerIndex]).toBe(a!.word)
    const joined = chapterTexts.join('')
    expect(joined).toContain(a!.word)
    const others = a!.options.filter((o) => o !== a!.word)
    for (const o of others) expect(joined).not.toContain(o)
  })
  it('干扰项不足时返回 null（不出可证伪性无法保证的题）', () => {
    const quiz = buildWordQuiz({
      bookTitle: '书',
      chapterOrder: 1,
      lang: 'zh',
      chapterTexts: ['正文只有一个词。'],
      distractorTexts: ['无'],
      seed: 's',
    })
    expect(quiz).toBeNull()
  })
})

describe('P1-8 识字量速测', () => {
  it('出 20 题、4 选项、答案在选项内、确定性', () => {
    // 200 个互异汉字，频次从高到低递减（高频带/低频带自然形成）
    const sample = Array.from({ length: 200 }, (_, i) => String.fromCharCode(0x4e00 + i).repeat(200 - i)).join('')
    const seed = 'child:week'
    const a = buildLiteracyTest({ seed, sampleTexts: [sample] })
    const b = buildLiteracyTest({ seed, sampleTexts: [sample] })
    expect(a).not.toBeNull()
    expect(a).toEqual(b)
    expect(a!.items).toHaveLength(20)
    for (const item of a!.items) {
      expect(item.options).toHaveLength(4)
      expect(item.options[item.answerIndex]).toBe(item.char)
      expect(new Set(item.options).size).toBe(4)
    }
  })
  it('配对结果不推断识字量、能力或建议换年龄段', () => {
    for (const score of [0, 8, 14, 18, 20]) {
      expect(literacySuggestion(score, 20).level).toBe('fit')
      expect(literacySuggestion(score, 20).message).toContain('不代表识字量')
      expect(literacySuggestion(score, 20).message).not.toContain('下一个年龄段')
    }
  })
})
