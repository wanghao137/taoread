import { GetObjectCommand } from '@aws-sdk/client-s3'

/** One fresh-connection retry for transport failures; HTTP denials never retry. */
export function createBackupReader(clientFactory, bucket) {
  let client = clientFactory()
  let attemptedReads = 0
  return {
    get client() { return client },
    get attemptedReads() { return attemptedReads },
    destroy() { client.destroy() },
    async get(key) {
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          attemptedReads++
          const response = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key }))
          if (!response.Body || !Number.isSafeInteger(response.ContentLength) || response.ContentLength < 0 || response.ContentLength > 100 * 1024 * 1024) throw Object.assign(new Error('Backup object missing or too large'), { restoreCode:'INVALID_BACKUP_RESPONSE' })
          return Buffer.from(await response.Body.transformToByteArray())
        } catch (error) {
          const transport = !error.$metadata?.httpStatusCode && (['ECONNABORTED','ECONNRESET','ETIMEDOUT','EPIPE'].includes(error.code) || error.name === 'TimeoutError')
          if (attempt || !transport) throw error
          client.destroy()
          client = clientFactory()
        }
      }
    },
  }
}
