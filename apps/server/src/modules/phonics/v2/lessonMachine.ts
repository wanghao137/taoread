import type { PhonicsEventRequest, PhonicsStepState } from '@taoread/shared'
import type { PhonicsCourse, PhonicsTask } from './contracts'
import { taskTarget } from './contracts'
import { AppError } from '../../../lib/errors'

export interface FrozenPlan {
  versionId: string
  kind: 'entry' | 'lesson' | 'review' | 'reread'
  resourceKey?: string
  courseHash: string
  ruleVersion: string
  lessonKeys: string[]
  stepTaskIds: string[]
  tasks: PhonicsTask[]
  readers: PhonicsCourse['readers']
}

export interface LessonState extends PhonicsStepState {
  round: number
  lastResponseRound: number | null
  activeTaskId: string | null
}

export function taskAt(plan: FrozenPlan, state: LessonState): PhonicsTask | null {
  const id = state.activeTaskId ?? plan.stepTaskIds[state.stepIndex]
  return plan.tasks.find(task => task.id === id) ?? null
}

export function initialState(plan: FrozenPlan, stepIndex = 0): LessonState {
  const activeTaskId = plan.stepTaskIds[stepIndex] ?? null
  return { stepIndex, pageIndex: 0, activeTaskId, round: 0, taskInstanceId: `${stepIndex}:${activeTaskId ?? 'end'}:p0:r0`, hintLevel: 0, responseCount: 0, lastResponseRound: null, resolved: false, correct: null, resolution: null }
}

function invalid(message: string): never { throw new AppError(message, 'TASK_STATE', 409) }

/** Pure reducer: help and first-result semantics live on the server, not in UI scores. */
export function applyLearningEvent(plan: FrozenPlan, previous: LessonState, input: PhonicsEventRequest) {
  const task = taskAt(plan, previous)
  if (!task || input.taskInstanceId !== previous.taskInstanceId) invalid('题目已变化，请恢复最新进度')
  const state = { ...previous }
  const reader = task.readerId ? plan.readers.find(r => r.id === task.readerId) : null
  const hintAsset = (level: number) => reader ? reader.pages[state.pageIndex]?.audioAssetId : task.hintAssetIds[Math.min(level, task.hintAssetIds.length) - 1]
  const result: {
    correct: boolean | null; firstResponse: boolean; evidenceRole: string; taskKind: string;
    skill: string; targetId: string; helpLevel: number; pageIndex: number; assetId?: string; report?: string;
  } = {
    correct: null, firstResponse: false,
    evidenceRole: previous.hintLevel > 0 || previous.responseCount > 0 ? 'practice' : task.role,
    taskKind: task.kind, skill: task.skill, targetId: taskTarget(task),
    helpLevel: previous.hintLevel,
    pageIndex: previous.pageIndex,
  }
  if (input.kind === 'step_advanced') {
    if (!state.resolved) invalid('请先尝试当前活动，或选择一起练')
    if (reader && state.pageIndex < reader.pages.length - 1) invalid('还可以读下一页，或先暂停')
    return { state: initialState(plan, previous.stepIndex + 1), result }
  }
  if (input.kind === 'reader_page_advanced') {
    if (!reader || !state.resolved || state.pageIndex >= reader.pages.length - 1) invalid('当前不能翻到下一页')
    const next = { ...initialState(plan, previous.stepIndex), pageIndex: previous.pageIndex + 1 }
    next.taskInstanceId = `${next.stepIndex}:${next.activeTaskId}:p${next.pageIndex}:r0`
    return { state: next, result }
  }
  if (previous.resolved) invalid('当前活动已经结束，请继续下一步')
  switch (input.kind) {
    case 'step_ack':
      if (task.kind !== 'listen') invalid('这个活动需要实际尝试')
      state.resolved = true; state.resolution = 'ack'
      break
    case 'stimulus_replayed':
      result.assetId = task.stimulusAssetId ?? task.instructionAssetId
      break
    case 'hint_requested': {
      state.hintLevel++
      result.helpLevel = state.hintLevel; result.evidenceRole = 'practice'
      result.assetId = hintAsset(state.hintLevel)
      if (previous.hintLevel >= task.hintAssetIds.length && task.easierTaskId) {
        state.activeTaskId = task.easierTaskId; state.round++; state.lastResponseRound = null
        state.taskInstanceId = `${state.stepIndex}:${state.activeTaskId}:p${state.pageIndex}:r${state.round}`
      }
      break
    }
    case 'response_submitted': {
      if (!task.judge || !['choice', 'build'].includes(task.kind)) invalid('这个活动不自动判断口头正误')
      if (state.lastResponseRound === state.round) invalid('请先选择再试一次')
      if (input.payload.answerIds.some(id => !task.choices.some(choice => choice.id === id))) invalid('答案不属于当前活动')
      const correct = input.payload.answerIds.length === task.judge.answerIds.length && input.payload.answerIds.every((id, i) => task.judge!.answerIds[i] === id)
      result.correct = correct; result.firstResponse = previous.responseCount === 0
      state.responseCount++; state.lastResponseRound = state.round; state.correct = correct
      if (correct) { state.resolved = true; state.resolution = 'response' }
      break
    }
    case 'retry_requested':
      if (state.lastResponseRound !== state.round || state.correct !== false) invalid('当前没有需要重试的答案')
      state.round++; state.lastResponseRound = null; state.correct = null
      state.taskInstanceId = `${state.stepIndex}:${state.activeTaskId}:p${state.pageIndex}:r${state.round}`
      break
    case 'self_read_reported':
      if (!['oral', 'read'].includes(task.kind)) invalid('只有口头活动可以自述')
      result.report = input.payload.report
      if (input.payload.report === 'needs_help') {
        state.hintLevel = Math.max(1, state.hintLevel)
        result.helpLevel = state.hintLevel; result.evidenceRole = 'practice'; result.assetId = hintAsset(1)
      }
      state.resolved = true; state.correct = null; state.resolution = 'self_report'
      break
    case 'task_skipped_with_help':
      if (!task.canSkipWithHelp || state.hintLevel < 1) invalid('请先一起练一遍，再继续')
      state.resolved = true; state.correct = null; state.resolution = 'helped_skip'; result.evidenceRole = 'practice'
      break
  }
  return { state, result }
}
