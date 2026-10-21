// 用法：node scripts/publish-mobile.mjs <版本号，如 0.1.0>
// 前置：已完成 assembleRelease（apps/mobile/android/app/build/outputs/apk/release/app-release.apk）；
//       R2 凭据在 apps/server/.env.dist（CF_DIST_ACCOUNT_ID / CF_DIST_API_TOKEN，不入 git）。
// 职责（appUpdate.ts 头注释的约定）：校验入参版本 = .env.mobile 的 VITE_APP_VERSION =
//       apps/mobile/package.json 版本，三者一致后上传 APK（含 latest.apk 固定名别名，
//       供 download.html 的「下载 APK」按钮使用）与 version.json（含 sha256 与
//       RELEASE.md 摘要）到 taoread-dist 桶。
import { createHash } from 'node:crypto'
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'

const version = process.argv[2]
if (!version) throw new Error('用法：node scripts/publish-mobile.mjs <版本>')
const apk = 'apps/mobile/android/app/build/outputs/apk/release/app-release.apk'
const env = readFileSync('apps/server/.env.dist', 'utf8')
const acc = env.match(/CF_DIST_ACCOUNT_ID=(.*)/)?.[1].trim()
const token = env.match(/CF_DIST_API_TOKEN=(.*)/)?.[1].trim()
if (!acc || !token) throw new Error('apps/server/.env.dist 缺少 CF_DIST_ACCOUNT_ID / CF_DIST_API_TOKEN')

// 版本一致性（App 发版红线）：提示条比较的就是这三处的版本号
const viteVersion = readFileSync('apps/web/.env.mobile', 'utf8').match(/VITE_APP_VERSION=(.*)/)?.[1].trim()
const pkgVersion = JSON.parse(readFileSync('apps/mobile/package.json', 'utf8')).version
for (const [name, v] of [
  ['apps/web/.env.mobile VITE_APP_VERSION', viteVersion],
  ['apps/mobile/package.json version', pkgVersion],
]) {
  if (v !== version) throw new Error(`版本不一致：入参 ${version} != ${name} ${v}`)
}

const sha256 = createHash('sha256').update(readFileSync(apk)).digest('hex')
const run = (cmd) => execSync(cmd, { stdio: 'inherit', env: { ...process.env, CLOUDFLARE_API_TOKEN: token, CLOUDFLARE_ACCOUNT_ID: acc } })

run(`npx wrangler@latest r2 object put "taoread-dist/android/TaoRead-${version}-release.apk" --file "${apk}" --remote`)
// 固定名别名：版本号解耦，下载页固定指向 latest.apk（带扩展名过 worker 白名单），与版本号上传同源（同一个文件）
run(`npx wrangler@latest r2 object put "taoread-dist/android/latest.apk" --file "${apk}" --content-type "application/vnd.android.package-archive" --remote`)
const manifest = {
  version,
  url: `https://dl.taostudioai.com/android/TaoRead-${version}-release.apk`,
  sha256,
  notes: readFileSync('RELEASE.md', 'utf8').split('## v' + version + '（')[1]?.split('## ')[0]?.trim() ?? '',
}
writeFileSync('apps/mobile/.version.json.tmp', JSON.stringify(manifest))
try {
  run(`npx wrangler@latest r2 object put "taoread-dist/app/version.json" --file "apps/mobile/.version.json.tmp" --content-type "application/json; charset=utf-8" --remote`)
} finally {
  rmSync('apps/mobile/.version.json.tmp', { force: true })
}
console.log('published', version, sha256)
