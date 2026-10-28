import { fsrs, Rating, type Grade } from 'ts-fsrs'
import { wordSettingsSchema } from './contracts'

export const WORD_SCHEDULE_VERSION = 'ts-fsrs-5.4.2-short-v2'
export const PREVIOUS_WORD_SCHEDULE_VERSION = 'ts-fsrs-5.4.2-daily-v1'
export const DEFAULT_WORD_SETTINGS = { dailyNew: 5, retention: 0.9, autoplay: false, spelling: true, accent: 'GB' as const }
export type WordSettings = ReturnType<typeof readWordSettings>

export function readWordSettings(json: string) {
  try {
    const value = wordSettingsSchema.safeParse(JSON.parse(json))
    return value.success ? { ...value.data, accent: value.data.accent ?? 'GB' } : DEFAULT_WORD_SETTINGS
  } catch { return DEFAULT_WORD_SETTINGS }
}

export function wordGrade(mode: string, correct: boolean, elapsedMs = 0, hinted = false): Grade {
  if (!correct) return Rating.Again
  if (hinted || elapsedMs > (mode === 'spelling' ? 20000 : 9000)) return Rating.Hard
  if (mode === 'spelling' && elapsedMs > 0 && elapsedMs < 6000) return Rating.Easy
  return Rating.Good
}

export function wordScheduler(retention: number) {
  return fsrs({ request_retention: retention, enable_fuzz: true, enable_short_term: true, learning_steps: ['1m', '10m'], relearning_steps: ['10m'] })
}
