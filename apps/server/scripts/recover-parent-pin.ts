import 'dotenv/config'
import { emitKeypressEvents } from 'node:readline'
import { createDb } from '../src/lib/db'
import { deriveTokenSecret, isValidFamilyCode } from '../src/lib/auth'
import { recoverParentPin, validateParentPin } from '../src/lib/parentPin'

/** 凭据只从交互终端读取；不使用命令行参数、环境变量或输出回显 PIN。 */
async function hiddenInput(label: string): Promise<string> {
  if (!process.stdin.isTTY || !process.stdout.isTTY) throw new Error('需要交互终端')
  process.stdout.write(label)
  emitKeypressEvents(process.stdin)
  process.stdin.setRawMode(true)
  process.stdin.resume()
  return new Promise((resolve, reject) => {
    let value = ''
    const finish = () => {
      process.stdin.off('keypress', onKey)
      process.stdin.setRawMode(false)
      process.stdin.pause()
      process.stdout.write('\n')
    }
    const onKey = (text: string | undefined, key: { name?: string; ctrl?: boolean; meta?: boolean }) => {
      if (key.ctrl && key.name === 'c') { finish(); reject(new Error('已取消')); return }
      if (key.name === 'return' || key.name === 'enter') { finish(); resolve(value); return }
      if (key.name === 'backspace') { value = value.slice(0, -1); return }
      if (text && !key.ctrl && !key.meta && /^[\x20-\x7e]+$/.test(text) && value.length + text.length <= 64) value += text
    }
    process.stdin.on('keypress', onKey)
  })
}

async function main(): Promise<void> {
  const dbUrl = process.env.TAO_DATABASE_URL
  const masterKey = process.env.TAO_MASTER_KEY
  if (!dbUrl || !masterKey || masterKey.length < 16) throw new Error('请先配置服务端数据库和主密钥')
  console.log('本机管理员迁移/恢复：替换家长 PIN 并退出所有家长设备，孩子设备和阅读记录保留。')
  const code = (await hiddenInput('家庭码（不回显）：')).trim().toUpperCase()
  if (!isValidFamilyCode(code)) throw new Error('家庭码格式不正确')
  const pin = await hiddenInput('新家长 PIN，6–12 位数字（不回显）：')
  validateParentPin(pin)
  if (pin !== await hiddenInput('再次输入新 PIN（不回显）：')) throw new Error('两次 PIN 不一致')
  if (await hiddenInput('输入 RESET 确认替换（不回显）：') !== 'RESET') throw new Error('已取消')
  const db = createDb(dbUrl)
  try {
    await recoverParentPin(db, code, pin, deriveTokenSecret(masterKey))
    console.log('家长 PIN 已设置。请使用家庭码和新 PIN 重新登录家长端。')
  } finally {
    await db.$disconnect()
  }
}

main().catch(() => {
  // Prisma 错误可能包含请求字段，不能把异常原文或凭据写进终端日志。
  console.error('未完成恢复。请核对终端输入、数据库迁移、服务配置和家庭是否存在；未输出任何凭据。')
  process.exitCode = 1
})
