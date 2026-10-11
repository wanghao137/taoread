export type ContentPosition = { chapterOrder: number; blockOrder: number; completed?: boolean }
export type ProgressSaveState = 'idle' | 'saving' | 'saved' | 'failed' | 'conflict'

/** 单个阅读器的保存队列：合并快速翻页，只有收到上一笔版本后才发下一笔。 */
export class ContentProgressWriter {
  version: string | undefined
  pending: ContentPosition | null = null
  private running: Promise<boolean> | null = null
  private conflict = false

  constructor(
    private readonly readVersion: () => Promise<string>,
    private readonly write: (position: ContentPosition, version: string) => Promise<{ updatedAt: string; stale: boolean }>,
    private readonly onState: (state: ProgressSaveState) => void,
  ) {}

  save(position: ContentPosition): Promise<boolean> {
    this.pending = position
    return this.retry()
  }

  retry(): Promise<boolean> {
    if (this.conflict) return Promise.resolve(false)
    if (this.running) return this.running
    this.running = this.drain().finally(() => { this.running = null })
    return this.running
  }

  private async drain(): Promise<boolean> {
    try {
      this.onState('saving')
      this.version ??= await this.readVersion()
      while (this.pending) {
        const position = this.pending
        const result = await this.write(position, this.version)
        if (result.stale) {
          // 不能用冲突响应中的新版本自动重试旧位置，否则下一次就会覆盖另一设备。
          this.conflict = true
          this.pending = null
          this.onState('conflict')
          return false
        }
        this.version = result.updatedAt
        if (this.pending === position) this.pending = null
      }
      this.onState('saved')
      return true
    } catch {
      this.onState('failed')
      return false
    }
  }
}
