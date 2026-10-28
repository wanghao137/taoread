import { useCallback, useEffect, useRef, useState } from 'react'
import { ApiError } from '../../../lib/api'
import { uid } from '../../../lib/uid'
import { phonicsApi, type WordSession, type WordSessionMutation } from './api'

function readSession(raw: string | null): WordSession | null {
  try {
    const value = JSON.parse(raw ?? 'null') as WordSession | null
    if (!value || !['practice', 'study'].includes(value.track) || !Array.isArray(value.questions) ||
      !value.questions.every(question => typeof question.id === 'string' && typeof question.wordId === 'string' && Array.isArray(question.choices)) ||
      typeof value.versionId !== 'string' || !Number.isInteger(value.index) || value.index < 0 || value.index > value.questions.length) return null
    return { ...value, id: typeof value.id === 'string' ? value.id : uid() }
  } catch { return null }
}

function readMutation(key: string): WordSessionMutation | null {
  try {
    const value = JSON.parse(localStorage.getItem(key) ?? 'null') as WordSessionMutation | null
    if (!value || typeof value.clientEventId !== 'string' || !Number.isInteger(value.expectedRevision) || typeof value.versionId !== 'string') return null
    const session = value.session === null ? null : readSession(JSON.stringify(value.session))
    return value.session !== null && !session ? null : { ...value, session }
  } catch { return null }
}

export function useWordSession(token: string, childId: string, versionId: string | null) {
  const key = `taoread-phonics-practice:${childId}`
  const prefix = `${key}:mutation:`
  const draftPrefix = `${key}:conflict:`
  const tab = useRef<string | null>(null)
  if (!tab.current) tab.current = uid()
  const mutationKey = `${prefix}${tab.current}`
  const pendingKey = useRef(mutationKey)
  const [session, setSession] = useState<WordSession | null>(null)
  const current = useRef<WordSession | null>(null)
  const revision = useRef(0)
  const pending = useRef<WordSessionMutation | null>(null)
  const lock = useRef(false)
  const live = useRef(false)
  const [ready, setReady] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [issue, setIssue] = useState<'' | 'network' | 'conflict' | 'storage'>('')
  const [drafts, setDrafts] = useState<Array<{ key: string; mutation: WordSessionMutation | null }>>([])

  const refreshDrafts = useCallback(() => {
    try {
      setDrafts(Object.keys(localStorage).filter(item => item.startsWith(draftPrefix)).sort().map(item => ({ key: item, mutation: readMutation(item) })))
    } catch { setIssue('storage') }
  }, [draftPrefix])

  const adopt = useCallback((next: WordSession | null, nextRevision: number) => {
    current.current = next; revision.current = nextRevision
    if (live.current) setSession(next)
    try {
      if (next) localStorage.setItem(key, JSON.stringify(next)); else localStorage.removeItem(key)
      sessionStorage.removeItem(key)
    } catch { /* the server remains authoritative */ }
  }, [key])

  const send = useCallback(async (mutation: WordSessionMutation) => {
    if (lock.current) return false
    lock.current = true
    if (live.current) { setSyncing(true); setIssue('') }
    try {
      const result = await phonicsApi.setWordSession(token, childId, mutation)
      if (!live.current) return false
      if (result.revision !== result.appliedRevision) { setIssue('conflict'); return false }
      const restoreKey = `${key}:restoring:${mutation.clientEventId}`
      const restoredDraft = localStorage.getItem(restoreKey)
      if (restoredDraft?.startsWith(draftPrefix)) localStorage.removeItem(restoredDraft)
      localStorage.removeItem(restoreKey)
      if (readMutation(pendingKey.current)?.clientEventId === mutation.clientEventId) localStorage.removeItem(pendingKey.current)
      pending.current = null
      adopt(result.session, result.revision); refreshDrafts()
      return true
    } catch (error) {
      if (live.current) setIssue(error instanceof ApiError && error.status === 409 ? 'conflict' : error instanceof ApiError && error.status === 400 ? 'storage' : 'network')
      return false
    } finally { lock.current = false; if (live.current) setSyncing(false) }
  }, [adopt, childId, draftPrefix, key, refreshDrafts, token])

  const load = useCallback(async () => {
    if (!versionId || lock.current) return
    if (live.current) { setReady(false); setIssue('') }
    let selectedKey = mutationKey
    try {
      const legacyMutation = sessionStorage.getItem(`${key}:mutation`)
      if (legacyMutation && !localStorage.getItem(mutationKey)) {
        localStorage.setItem(mutationKey, legacyMutation)
        sessionStorage.removeItem(`${key}:mutation`)
      }
      const candidates = Object.keys(localStorage).filter(item => item.startsWith(prefix)).sort()
      if (!candidates.includes(mutationKey) && candidates.length) selectedKey = candidates[0]!
      pendingKey.current = selectedKey
      if (localStorage.getItem(selectedKey) && !readMutation(selectedKey)) {
        if (live.current) { setIssue('storage'); setReady(true) }
        return
      }
    } catch { if (live.current) { setIssue('storage'); setReady(true) } return }
    const unsent = readMutation(selectedKey)
    if (unsent) {
      pending.current = unsent; current.current = unsent.session
      if (live.current) setSession(unsent.session)
      await send(unsent)
      if (live.current) setReady(true)
      return
    }
    try {
      const remote = await phonicsApi.wordSession(token, childId)
      if (!live.current) return
      revision.current = remote.revision
      let legacy: WordSession | null = null
      try { legacy = readSession(sessionStorage.getItem(key) ?? localStorage.getItem(key)) } catch { /* no local recovery */ }
      if (legacy && legacy.versionId === versionId && remote.revision === 0 && !remote.session) {
        const mutation: WordSessionMutation = { clientEventId: uid(), expectedRevision: 0, versionId, session: legacy }
        try { pendingKey.current = mutationKey; localStorage.setItem(mutationKey, JSON.stringify(mutation)) }
        catch { setIssue('storage'); setSession(legacy); current.current = legacy; setReady(true); return }
        pending.current = mutation; current.current = legacy; setSession(legacy)
        await send(mutation)
      } else if (legacy?.pending && (!remote.session || legacy.id !== remote.session.id)) {
        const mutation: WordSessionMutation = { clientEventId: uid(), expectedRevision: 0, versionId, session: legacy }
        try { pendingKey.current = mutationKey; localStorage.setItem(mutationKey, JSON.stringify(mutation)) }
        catch { setIssue('storage'); setSession(legacy); current.current = legacy; setReady(true); return }
        pending.current = mutation; current.current = legacy; setSession(legacy); setIssue('conflict')
      } else adopt(remote.session, remote.revision)
    } catch { if (live.current) setIssue('network') }
    if (live.current) setReady(true)
  }, [adopt, childId, key, mutationKey, prefix, send, token, versionId])

  useEffect(() => {
    live.current = true; refreshDrafts(); void load()
    const onStorage = (event: StorageEvent) => { if (!event.key || event.key.startsWith(draftPrefix)) refreshDrafts() }
    window.addEventListener('storage', onStorage)
    return () => { live.current = false; window.removeEventListener('storage', onStorage) }
  }, [draftPrefix, load, refreshDrafts])

  const save = useCallback(async (next: WordSession | null) => {
    if (!ready || !versionId || lock.current || pending.current) return false
    const mutation: WordSessionMutation = { clientEventId: uid(), expectedRevision: revision.current, versionId, session: next }
    try { pendingKey.current = mutationKey; localStorage.setItem(mutationKey, JSON.stringify(mutation)) }
    catch { setIssue('storage'); return false }
    pending.current = mutation; current.current = next; setSession(next)
    return send(mutation)
  }, [mutationKey, ready, send, versionId])

  const retry = useCallback(async () => {
    const mutation = pending.current ?? readMutation(pendingKey.current)
    if (mutation) { pending.current = mutation; return send(mutation) }
    await load(); return false
  }, [load, send])

  const useRemote = useCallback(async () => {
    if (lock.current) return false
    lock.current = true; setSyncing(true)
    try {
      const remote = await phonicsApi.wordSession(token, childId)
      try {
        const unsent = pending.current ?? readMutation(pendingKey.current)
        const raw = localStorage.getItem(pendingKey.current)
        const stored = readMutation(pendingKey.current)
        if (unsent && stored && unsent.clientEventId !== stored.clientEventId) {
          localStorage.setItem(`${key}:conflict:${unsent.clientEventId}`, JSON.stringify(unsent))
        } else {
          if (raw) localStorage.setItem(`${key}:conflict:${unsent?.clientEventId ?? uid()}`, raw)
          localStorage.removeItem(pendingKey.current)
        }
        pending.current = null
      } catch { setIssue('storage'); return false }
      adopt(remote.session, remote.revision); refreshDrafts(); setIssue(''); setReady(true)
      return true
    } catch { setIssue('network'); return false }
    finally { lock.current = false; if (live.current) setSyncing(false) }
  }, [adopt, childId, key, refreshDrafts, token])

  const restoreDraft = useCallback(async (draftKey: string) => {
    if (!ready || !versionId || lock.current || pending.current || issue) return false
    const draft = readMutation(draftKey)
    if (!draft || !draftKey.startsWith(draftPrefix) || draft.versionId !== versionId) return false
    lock.current = true; setSyncing(true)
    try {
      let remote: Awaited<ReturnType<typeof phonicsApi.wordSession>>
      try { remote = await phonicsApi.wordSession(token, childId) }
      catch { setIssue('network'); return false }
      const mutation: WordSessionMutation = { clientEventId: uid(), expectedRevision: remote.revision, versionId, session: draft.session }
      try {
        if (remote.session && JSON.stringify(remote.session) !== JSON.stringify(draft.session)) {
          const backup: WordSessionMutation = { clientEventId: uid(), expectedRevision: remote.revision, versionId, session: remote.session }
          localStorage.setItem(`${draftPrefix}${backup.clientEventId}`, JSON.stringify(backup))
        }
        pendingKey.current = mutationKey
        localStorage.setItem(`${key}:restoring:${mutation.clientEventId}`, draftKey)
        localStorage.setItem(mutationKey, JSON.stringify(mutation))
      } catch { setIssue('storage'); return false }
      pending.current = mutation; current.current = mutation.session; setSession(mutation.session)
      refreshDrafts()
      lock.current = false
      return await send(mutation)
    } finally { lock.current = false; if (live.current) setSyncing(false) }
  }, [childId, draftPrefix, issue, key, mutationKey, ready, refreshDrafts, send, token, versionId])

  const discardDraft = useCallback((draftKey: string) => {
    if (!draftKey.startsWith(draftPrefix)) return
    try { localStorage.removeItem(draftKey); refreshDrafts() } catch { setIssue('storage') }
  }, [draftPrefix, refreshDrafts])

  return { session, current, ready, syncing, issue, drafts, save, retry, useRemote, restoreDraft, discardDraft }
}
