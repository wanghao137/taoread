import type { PhonicsSummary } from './api'

type Calendar = PhonicsSummary['practiceCalendar']
const chinaDay = (date: Date) => new Date(date.getTime() + 8 * 3600_000).toISOString().slice(0, 10)
const dateOf = (day: string) => new Date(`${day}T00:00:00Z`)
const keyOf = (date: Date) => date.toISOString().slice(0, 10)

export function practiceDays(calendar: Calendar): Set<string> {
  return new Set(calendar.filter(day => day.count > 0).map(day => day.day))
}

export function weekStrip(calendar: Calendar, now = new Date()): Array<{ day: string; count: number; today: boolean }> {
  const counts = new Map(calendar.map(day => [day.day, day.count]))
  const today = dateOf(chinaDay(now))
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today)
    date.setUTCDate(date.getUTCDate() - (6 - i))
    return { day: '日一二三四五六'[date.getUTCDay()]!, count: counts.get(keyOf(date)) ?? 0, today: i === 6 }
  })
}

export function streakOf(calendar: Calendar, now = new Date()): number {
  const days = practiceDays(calendar)
  const cursor = dateOf(chinaDay(now))
  if (!days.has(keyOf(cursor))) cursor.setUTCDate(cursor.getUTCDate() - 1)
  let streak = 0
  while (days.has(keyOf(cursor))) { streak++; cursor.setUTCDate(cursor.getUTCDate() - 1) }
  return streak
}

export function calendarCells(calendar: Calendar, now = new Date()): Array<{ day: string; count: number }> {
  const counts = new Map(calendar.map(day => [day.day, day.count]))
  const today = dateOf(chinaDay(now))
  return Array.from({ length: 140 }, (_, i) => {
    const date = new Date(today)
    date.setUTCDate(date.getUTCDate() - (139 - i))
    const day = keyOf(date)
    return { day, count: counts.get(day) ?? 0 }
  })
}
