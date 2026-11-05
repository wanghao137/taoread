/**
 * 每日阅读提醒（docs/104 路线B M2d）——纯本机方案。
 *
 * @capacitor/local-notifications（AlarmManager 调度，无 GMS 依赖）。
 * 仅原生构建（VITE_TAO_NATIVE=1 + LocalNotifications 插件在）时激活；
 * 浏览器/PWA 构建零成本。提醒时间为设备本地设置（localStorage），非服务端字段：
 * 家庭自用规模下，跨设备同步提醒时间是过度设计。
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
const LN = (): any =>
  typeof window !== 'undefined' ? (window as any).Capacitor?.Plugins?.LocalNotifications : undefined

export const NATIVE_REMINDER =
  import.meta.env.VITE_TAO_NATIVE === '1' && !!LN()

const KEY = 'taoread-daily-reminder'
const REMINDER_ID = 42

function parseHhmm(hhmm: string): { hour: number; minute: number } | null {
  const m = /^([01]?\d|2[0-3]):([0-5]\d)$/.exec(hhmm.trim())
  if (!m) return null
  return { hour: Number(m[1]), minute: Number(m[2]) }
}

/** 保存并调度每日提醒；失败抛错（调用方 toast） */
export async function scheduleDailyReminder(hhmm: string): Promise<void> {
  const t = parseHhmm(hhmm)
  if (!t) throw new Error('时间格式 HH:MM')
  const p = LN()
  if (!p) throw new Error('本机提醒只在桃阅读 App 里可用')
  const perm = await p.requestPermissions()
  const denied = perm?.display === 'denied'
  if (denied) throw new Error('通知权限被拒：请在系统设置里允许桃阅读发通知')
  await p.cancel({ notifications: [{ id: REMINDER_ID }] })
  await p.schedule({
    notifications: [{
      id: REMINDER_ID,
      title: '桃阅读 · 故事时间',
      body: '今晚的故事时间到了，去打开今天的那本书吧',
      schedule: { on: { hour: t.hour, minute: t.minute }, allowWhileIdle: true },
    }],
  })
  localStorage.setItem(KEY, JSON.stringify({ hhmm: t.hour * 60 + t.minute, raw: hhmm }))
}

export async function cancelDailyReminder(): Promise<void> {
  const p = LN()
  localStorage.removeItem(KEY)
  if (!p) return
  await p.cancel({ notifications: [{ id: REMINDER_ID }] })
}

export function getDailyReminder(): string | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const v = JSON.parse(raw) as { raw?: string }
    return typeof v.raw === 'string' ? v.raw : null
    // eslint-disable-next-line spaced-comment
  } catch { return null }
}

/** 应用启动时幂等重排（AlarmManager 调度已持久，这里是双保险） */
export async function ensureDailyReminderRescheduled(): Promise<void> {
  if (!NATIVE_REMINDER) return
  const raw = getDailyReminder()
  if (!raw) return
  try { await scheduleDailyReminder(raw) } catch { /* 启动重排失败不打扰用户 */ }
}
