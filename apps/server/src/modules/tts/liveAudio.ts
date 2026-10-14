import { randomBytes } from 'node:crypto'
import { Readable } from 'node:stream'
import { TtsError } from './client'

/** Short-lived replay buffers for already authorized synthesis, never a second provider call. */
export class LiveAudioStore {
  private entries = new Map<string, LiveAudio>()

  constructor(private readonly maxEntries = 32, private readonly ttlMs = 120_000, private readonly maxBytes = 2 * 1024 * 1024) {}

  create(familyId: string, sessionId: string): LiveAudio | undefined {
    // A full registry falls back to completed-segment playback instead of dropping words.
    if (this.entries.size >= this.maxEntries) return undefined
    const id = randomBytes(18).toString('hex')
    const entry = new LiveAudio(id, familyId, sessionId, this.maxBytes)
    this.entries.set(id, entry)
    const timer = setTimeout(() => {
      this.entries.delete(id)
      entry.expire()
    }, this.ttlMs)
    timer.unref()
    entry.dispose = () => { clearTimeout(timer); this.entries.delete(id); entry.expire() }
    return entry
  }

  get(id: string): LiveAudio | undefined { return this.entries.get(id) }

  close(): void {
    for (const entry of this.entries.values()) entry.dispose()
  }
}

export class LiveAudio {
  private chunks: Buffer[] = []
  private bytes = 0
  private done = false
  private failed = false
  private streams = new Set<Readable>()
  private waiters = new Set<() => void>()
  dispose: () => void = () => undefined

  constructor(readonly id: string, readonly familyId: string, readonly sessionId: string, private readonly maxBytes: number) {}

  append(chunk: Buffer): void {
    if (this.done || this.bytes + chunk.length > this.maxBytes) throw new TtsError('朗读音频超过限制', '')
    this.bytes += chunk.length
    this.chunks.push(chunk)
    this.wake()
  }

  complete(): void { this.done = true; this.wake() }

  expire(): void {
    this.failed = true
    this.done = true
    this.chunks = []
    this.wake()
    for (const stream of this.streams) stream.destroy(new Error('Narration stream expired'))
  }

  private wake(): void {
    const waiting = [...this.waiters]
    this.waiters.clear()
    for (const wake of waiting) wake()
  }

  /** Only push when requested; each consumer retains an index and a bounded stream buffer. */
  open(): Readable | null {
    if (this.failed || this.streams.size >= 4) return null
    let index = 0
    const pump = () => {
      if (stream.destroyed) return
      if (this.failed) { stream.destroy(new Error('Narration stream expired')); return }
      while (index < this.chunks.length) if (!stream.push(this.chunks[index++]!)) return
      if (this.done) stream.push(null)
      else this.waiters.add(pump)
    }
    const stream = new Readable({
      highWaterMark: 16 * 1024,
      read: pump,
      destroy: (error, callback) => {
        this.waiters.delete(pump)
        this.streams.delete(stream)
        callback(error)
      },
    })
    this.streams.add(stream)
    return stream
  }
}
