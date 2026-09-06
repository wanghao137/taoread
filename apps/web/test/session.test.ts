import { beforeEach, describe, expect, it } from 'vitest'
import { useSession } from '../src/stores/session'

describe('会话存储（zustand persist，node 环境退化为内存）', () => {
  beforeEach(() => {
    useSession.getState().signOut()
  })

  it('signIn 写入完整会话', () => {
    useSession.getState().signIn({
      token: 'tok-1',
      familyId: 'fam-1',
      familyCode: 'ABCD2345',
      role: 'parent',
    })
    const s = useSession.getState()
    expect(s.token).toBe('tok-1')
    expect(s.familyId).toBe('fam-1')
    expect(s.familyCode).toBe('ABCD2345')
    expect(s.role).toBe('parent')
  })

  it('signOut 清空全部字段', () => {
    useSession.getState().signIn({
      token: 'tok-1',
      familyId: 'fam-1',
      familyCode: 'ABCD2345',
      role: 'child',
    })
    useSession.getState().signOut()
    const s = useSession.getState()
    expect(s.token).toBeNull()
    expect(s.familyId).toBeNull()
    expect(s.familyCode).toBeNull()
    expect(s.role).toBeNull()
  })

  it('角色守卫语义：child 会话可被读出用于路由判断', () => {
    useSession.getState().signIn({
      token: 't',
      familyId: 'f',
      familyCode: 'ABCD2345',
      role: 'child',
    })
    expect(useSession.getState().role === 'child').toBe(true)
  })
})
