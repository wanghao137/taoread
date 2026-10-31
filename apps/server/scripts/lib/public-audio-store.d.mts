/** Types for the plain-JS audio store helper (implementation in .mjs implementation file). */
export declare const AUDIO_BUCKET: string
export declare const AUDIO_KEY: RegExp
export declare function sha256(buffer: Buffer | Uint8Array): string

export interface AudioStoreSettings {
  target: 'r2' | 'b2' | 'r2-worker'
  bucket: string
  accountId?: string
  authorization?: string
  endpoint?: string
  region?: string
  credentials?: { accessKeyId: string; secretAccessKey: string }
}

/** Null when R2 settings are incomplete; callers must handle the null case. */
export declare function audioSettings(env: NodeJS.ProcessEnv): AudioStoreSettings | null
export declare function loadAudioEnvironment(env: NodeJS.ProcessEnv, file?: string): Promise<NodeJS.ProcessEnv>
export declare function audioClient(settings: AudioStoreSettings): unknown
export declare function listAudio(client: unknown, bucket: string): Promise<Array<{ key: string; bytes: number }>>
export declare function getAudio(client: unknown, bucket: string, finalKey: string): Promise<Buffer | null>
export declare function putAudio(client: unknown, settings: AudioStoreSettings, key: string, buffer: Buffer): Promise<void>
