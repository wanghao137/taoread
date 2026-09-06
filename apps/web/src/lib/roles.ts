/** 角色字面量（与后端 auth.ts 对齐；独立声明避免 web 直接依赖 server 代码） */
export type DeviceRole = 'parent' | 'child'

export const ROLE_LABEL: Record<DeviceRole, string> = {
  parent: '爸爸妈妈',
  child: '小朋友',
}
