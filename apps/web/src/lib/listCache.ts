/**
 * 列表页内存缓存（docs/107 W-1/W-2）。
 *
 * 第一性诊断（docs/107）：孩子端 tab 切换的「慢」不是字节（书架 JSON gzip 后 4-50KB），
 * 是「清空→占位→等隧道 RTT→再渲染」的循环。gzip 已开（docs/35 B1），封面修复后
 * 剩下的成本就是重复往返。所以：模块级缓存 + SWR 语义——
 *   命中 → 立即渲染（不 blank、不占位）；过期 → 后台静默重验，回来原位替换。
 * 会话级（内存）缓存即够：跨启动的新鲜度由「回前台 >60s 静默刷新」兜底。
 * 键必须含 token+childId，换家庭/换孩子零泄漏。
 */

const caches = new Map<string, { data: unknown; at: number }>()

/** 上限：防搜索词堆积。2 作用域（home/shelf）+ 8-14 个筛选组合（心情/语言/书单/搜索词）
 * 不会互挤；最坏 ~5MB 内存（WebView 可承受）。LRU 语义。 */
const MAX_KEYS = 16

export function getCachedList<T>(key: string): { data: T; at: number } | null {
  const hit = caches.get(key)
  if (!hit) return null
  // LRU：命中即搬到 Map 尾部
  caches.delete(key)
  caches.set(key, hit)
  return hit as { data: T; at: number }
}

export function setCachedList(key: string, data: unknown): void {
  const hit = caches.get(key)
  if (hit) caches.delete(key)
  caches.set(key, { data, at: Date.now() })
  if (caches.size > MAX_KEYS) {
    const oldest = caches.keys().next().value
    if (oldest !== undefined) caches.delete(oldest)
  }
}

export function clearCachedList(key: string): void {
  caches.delete(key)
}
