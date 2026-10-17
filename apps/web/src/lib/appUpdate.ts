export interface MobileRelease {
  version: string
  url: string
  sha256: string
  notes: string
}

const DIST_BASE = 'https://dl.taostudioai.com'

/** 语义化版本比较：1.10.0 > 1.9.1 */
export function isNewerVersion(candidate: string, current: string): boolean {
  const parse = (v: string) => v.replace(/^v/, '').split('.').map((n) => Number.parseInt(n, 10) || 0)
  const [c, cur] = [parse(candidate), parse(current)]
  for (let i = 0; i < 3; i += 1) {
    if ((c[i] ?? 0) !== (cur[i] ?? 0)) return (c[i] ?? 0) > (cur[i] ?? 0)
  }
  return false
}

export function currentAppVersion(): string {
  return import.meta.env.VITE_APP_VERSION ?? '0.0.0'
}

/** 仅原生壳内检查；web/PWA 返回 null（网页更新随部署自动生效）。
 * 判定不走 @capacitor/core 的 isNativePlatform（apps/web 不依赖 Capacitor）：
 * VITE_TAO_NATIVE=1 只由移动构建（--mode mobile 读 .env.mobile）注入，与
 * main.tsx 的 SW 注册开关同一信号，判定等价且零新增依赖。
 * VITE_APP_VERSION 由 .env.mobile 注入，publish 脚本（Task M1-5 Step 3）负责校验其与
 * apps/mobile/package.json 及发布的 version.json 三者一致 */
export async function checkMobileUpdate(): Promise<MobileRelease | null> {
  if (import.meta.env.VITE_TAO_NATIVE !== '1') return null
  try {
    const res = await fetch(`${DIST_BASE}/app/version.json`, { cache: 'no-store' })
    if (!res.ok) return null
    const release = (await res.json()) as MobileRelease
    return isNewerVersion(release.version, currentAppVersion()) ? release : null
  } catch {
    return null
  }
}
