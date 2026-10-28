import type { PhonicsAtlasWordDto } from '@taoread/shared'
import type { PracticeMode, StudySchedule } from './api'
import { distinctChoices } from './phonicsChoices'

export type StudyQuestion = { id: string; wordId: string; mode: PracticeMode; choices: string[]; isNew: boolean; intro?: boolean; retry?: boolean }

export function gapSentence(text: string, word: string): string | null {
  if (!/^[A-Za-z]+$/.test(word)) return null
  const result = text.replace(new RegExp(`\\b${word}\\b`, 'gi'), '____')
  return result === text ? null : result
}

function modesFor(word: PhonicsAtlasWordDto, words: PhonicsAtlasWordDto[], spelling: boolean): PracticeMode[] {
  const modes: PracticeMode[] = []
  if (word.image?.url && distinctChoices(word, words, 'picture').length >= 2) modes.push('picture')
  if (distinctChoices(word, words, 'meaning').length >= 2) modes.push('meaning')
  if (word.audios.some(audio => audio.purpose === 'word' && audio.url) && distinctChoices(word, words, 'listen').length >= 2) modes.push('listen')
  if (spelling || modes.length === 0) modes.push('spelling')
  return modes
}

function quiz(word: PhonicsAtlasWordDto, words: PhonicsAtlasWordDto[], isNew: boolean, spelling: boolean, stability: number, id: string, shuffle: <T>(items: T[]) => T[], previous?: PracticeMode): StudyQuestion {
  const all = modesFor(word, words, !isNew && spelling && stability >= 2)
  const alternatives = previous ? all.filter(mode => mode !== previous) : all
  const available = alternatives.length ? alternatives : all
  let hash = 2166136261
  for (const char of `${word.id}:${id}`) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619)
  const roll = (hash >>> 0) % 100
  const hasPicture = all.includes('picture')
  const preferred: PracticeMode = isNew || stability < 2
    ? hasPicture && roll < 45 ? 'picture' : roll < 80 ? 'meaning' : 'listen'
    : spelling && (stability >= 4 || roll < 35)
      ? roll < 75 ? 'spelling' : hasPicture ? 'picture' : 'listen'
      : roll < 50 ? 'listen' : hasPicture ? 'picture' : 'meaning'
  const mode = available.includes(preferred) ? preferred : available[roll % available.length]!
  const distractors = shuffle(distinctChoices(word, words, mode).slice(1)).slice(0, 3)
  return { id, wordId: word.id, mode, isNew, choices: mode === 'spelling' ? [] : shuffle([word.id, ...distractors.map(item => item.id)]) }
}

export function buildStudySteps(words: PhonicsAtlasWordDto[], schedule: StudySchedule, spelling: boolean, makeId: () => string, shuffle: <T>(items: T[]) => T[]): StudyQuestion[] {
  const eligible = words.filter(word => word.unlocked && word.text)
  const byId = new Map(eligible.map(word => [word.id, word]))
  const due = [...new Set(schedule.dueWordIds)].slice(0, 120).flatMap(id => byId.get(id) ?? [])
  const dueIds = new Set(due.map(word => word.id))
  const fresh = [...new Set(schedule.newWordIds)].filter(id => !dueIds.has(id)).flatMap(id => byId.get(id) ?? [])
  const steps = due.map(word => quiz(word, eligible, false, spelling, schedule.stabilities?.[word.id] ?? 0, makeId(), shuffle))
  for (let start = 0; start < fresh.length; start += 5) {
    const group = fresh.slice(start, start + 5).map(word => quiz(word, eligible, true, spelling, 0, makeId(), shuffle))
    steps.push(...group.map(item => ({ ...item, intro: true })), ...shuffle(group))
  }
  return steps
}

export function makeStudyRetry(question: StudyQuestion, words: PhonicsAtlasWordDto[], spelling: boolean, stability: number, shuffle: <T>(items: T[]) => T[]): StudyQuestion | null {
  const eligible = words.filter(word => word.unlocked && word.text)
  const word = eligible.find(item => item.id === question.wordId)
  if (!word) return null
  return { ...quiz(word, eligible, question.isNew, spelling, stability, question.id, shuffle, question.mode), retry: true }
}
