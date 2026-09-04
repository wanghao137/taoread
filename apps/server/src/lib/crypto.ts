import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scrypt as scryptCallback,
} from 'node:crypto'
import { promisify } from 'node:util'
import { CryptoError } from './errors'

/**
 * 微信读书 API Key 的静态加密（AES-256-GCM + scrypt 派生密钥）。
 * 密文格式：v1.<salt_b64>.<iv_b64>.<tag_b64>.<ct_b64>
 * 主密钥来自环境变量 TAO_MASTER_KEY，永不明文落库。
 */

const scrypt = promisify(scryptCallback) as (
  password: string,
  salt: Buffer,
  keylen: number,
) => Promise<Buffer>

const VERSION = 'v1'
const SEGMENT_COUNT = 5

function deriveKey(masterKey: string, salt: Buffer): Promise<Buffer> {
  return scrypt(masterKey, salt, 32)
}

export async function encryptSecret(plaintext: string, masterKey: string): Promise<string> {
  if (masterKey.length < 16) {
    throw new CryptoError('TAO_MASTER_KEY 至少需要 16 个字符')
  }
  const salt = randomBytes(16)
  const iv = randomBytes(12)
  const key = await deriveKey(masterKey, salt)
  const cipher = createCipheriv('aes-256-gcm', key, iv)
  const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()
  return [
    VERSION,
    salt.toString('base64'),
    iv.toString('base64'),
    tag.toString('base64'),
    ciphertext.toString('base64'),
  ].join('.')
}

export async function decryptSecret(payload: string, masterKey: string): Promise<string> {
  const parts = payload.split('.')
  if (parts.length !== SEGMENT_COUNT || parts[0] !== VERSION) {
    throw new CryptoError('密文格式不合法')
  }
  const [, saltB64, ivB64, tagB64, ctB64] = parts
  if (!saltB64 || !ivB64 || !tagB64 || !ctB64) {
    throw new CryptoError('密文格式不合法')
  }
  try {
    const salt = Buffer.from(saltB64, 'base64')
    const key = await deriveKey(masterKey, salt)
    const decipher = createDecipheriv(
      'aes-256-gcm',
      key,
      Buffer.from(ivB64, 'base64'),
    )
    decipher.setAuthTag(Buffer.from(tagB64, 'base64'))
    const plain = Buffer.concat([
      decipher.update(Buffer.from(ctB64, 'base64')),
      decipher.final(),
    ])
    return plain.toString('utf8')
  } catch {
    // 损坏、被篡改或主密钥不匹配，统一模糊处理，不泄露具体原因
    throw new CryptoError('解密失败：密文损坏或主密钥不匹配')
  }
}

/** key 尾 4 位展示（如 ****MQAA），用于家长端确认绑定的是哪把 key */
export function maskKey(apiKey: string): string {
  if (apiKey.length <= 4) return '****'
  return `****${apiKey.slice(-4)}`
}
