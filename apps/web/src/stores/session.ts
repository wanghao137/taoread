import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { DeviceRole } from '../lib/roles'

export interface SessionState {
  token: string | null
  familyId: string | null
  familyCode: string | null
  role: DeviceRole | null
  /** 孩子档案（孩子端登录后选定/自动绑定；仪式流与共读记录的归属） */
  childId: string | null
  signIn: (s: { token: string; familyId: string; familyCode: string; role: DeviceRole }) => void
  setChildId: (childId: string) => void
  signOut: () => void
}

/** SSR/测试安全的 storage 包装（无 window 时退化为内存） */
const safeStorage = {
  getItem: (name: string): string | null => {
    try {
      return globalThis.localStorage?.getItem(name) ?? null
    } catch {
      return null
    }
  },
  setItem: (name: string, value: string): void => {
    try {
      globalThis.localStorage?.setItem(name, value)
    } catch {
      /* 隐私模式等场景下静默降级为内存态 */
    }
  },
  removeItem: (name: string): void => {
    try {
      globalThis.localStorage?.removeItem(name)
    } catch {
      /* 同上 */
    }
  },
}

export const SESSION_KEY = 'taoread-session'

export const useSession = create<SessionState>()(
  persist(
    (set) => ({
      token: null,
      familyId: null,
      familyCode: null,
      role: null,
      childId: null,
      signIn: ({ token, familyId, familyCode, role }) =>
        set({ token, familyId, familyCode, role, childId: null }),
      setChildId: (childId) => set({ childId }),
      signOut: () =>
        set({ token: null, familyId: null, familyCode: null, role: null, childId: null }),
    }),
    {
      name: SESSION_KEY,
      storage: createJSONStorage(() => safeStorage),
    },
  ),
)
