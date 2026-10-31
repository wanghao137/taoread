import type { S3Client } from '@aws-sdk/client-s3'
export declare const R2_WARNING_BYTES: number
export declare const R2_STOP_BYTES: number
export interface R2BucketInventoryRow { bucket: string; bytes: number; count: number }
export interface R2InventorySnapshot { bytes: number; buckets: R2BucketInventoryRow[] }
export interface R2CapacityOptions {
  accountId: string
  bytes: number
  inventory: () => Promise<R2InventorySnapshot>
  upload: () => Promise<void>
  stopBytes?: number
  waitMs?: number
  maxAgeMs?: number
  directory?: string
  warn?: (message: string) => void
}
export declare function withR2Capacity<T>(options: R2CapacityOptions): Promise<T>
export declare function guardedR2Upload<T>(client: S3Client, accountId: string, bytes: number, upload: () => Promise<T>): Promise<T>
