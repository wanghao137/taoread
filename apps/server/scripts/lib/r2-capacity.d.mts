import type { S3Client } from '@aws-sdk/client-s3'
export function guardedR2Upload<T>(client: S3Client, accountId: string, bytes: number, upload: () => Promise<T>): Promise<T>
