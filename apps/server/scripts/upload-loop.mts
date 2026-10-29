/** 网络恢复门控循环：每 5 分钟探测，通则跑 bulk-upload 至完成（最多 72 次≈6 小时） */
import { execSync } from 'node:child_process'
for (let i = 1; i <= 72; i++) {
  let out = ''
  try {
    out = execSync('node --import tsx scripts/bulk-upload.mts', {
      cwd: 'D:/taoread-prod/apps/server',
      encoding: 'utf8',
      timeout: 6 * 3600 * 1000,
      stdio: ['ignore', 'pipe', 'pipe'],
    })
  } catch (err: any) {
    out = String(err?.stdout ?? '') + String(err?.stderr ?? err?.message ?? '')
  }
  const tail = out.trim().split('\n').slice(-3).join(' | ')
  console.log(`[attempt ${i}] ${tail.slice(0, 300)}`)
  if (/FINISH/.test(out)) { console.log('UPLOAD-COMPLETE'); break }
  if (/capacity-stop/.test(out) && !/pending=\d/.test(out.split('FINISH')[0] ?? '')) {
    // 撞容量线：已完成本次能传的，剩余等清理；不再空转
    console.log('CAPACITY-LIMIT-REACHED (剩余段等死键清理腾空间后重跑)')
    break
  }
  await new Promise(r => setTimeout(r, 5 * 60 * 1000))
}
