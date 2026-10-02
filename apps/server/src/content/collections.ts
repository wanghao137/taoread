/**
 * 主题书单（docs/34 P1-12，docs/09 B4 遗留落项）：策展式合集。
 * 定义是「筛选条件 + 定数」，不写死书 id——书库扩容/下架时书单自动跟随，
 * 不会出现悬空引用。渲染顺序按书名稳定排序，孩子端按适龄过滤后再截取。
 */

export interface CollectionFilter {
  category?: string[]
  ageStage?: string[]
  idPrefix?: string[]
}

export interface CollectionDef {
  id: string
  title: string
  subtitle: string
  filter: CollectionFilter
  take: number
}

export const COLLECTIONS: CollectionDef[] = [
  { id: 'bedtime-poems', title: '睡前轻轻读', subtitle: '读一首小诗，做个好梦', filter: { category: ['poetry'] }, take: 12 },
  { id: 'quick-stories', title: '故事时光', subtitle: '挑一篇感兴趣的，慢慢读', filter: { category: ['story'] }, take: 12 },
  { id: 'classic-tales', title: '经典童话', subtitle: '爸爸妈妈小时候也读过的故事', filter: { category: ['tale'] }, take: 12 },
  { id: 'wonder-why', title: '十万个为什么', subtitle: '好奇宝宝的最爱', filter: { idPrefix: ['why-'] }, take: 6 },
  { id: 'first-steps', title: '刚开始识字', subtitle: '给最小的读者', filter: { ageStage: ['3-5'] }, take: 12 },
  { id: 'mengxue', title: '蒙学经典', subtitle: '三字经、声律启蒙……', filter: { category: ['primer'] }, take: 12 },
]

export function findCollection(id: string): CollectionDef | undefined {
  return COLLECTIONS.find((c) => c.id === id)
}

/** 把筛选条件翻译成 Prisma where（书名稳定排序由调用方追加）；分支间 OR */
export function collectionWhere(def: CollectionDef): {
  OR?: Array<Record<string, unknown>>
} {
  const branches: Array<Record<string, unknown>> = []
  if (def.filter.category) branches.push({ category: { in: def.filter.category } })
  if (def.filter.ageStage) branches.push({ ageStage: { in: def.filter.ageStage } })
  if (def.filter.idPrefix) {
    branches.push({ OR: def.filter.idPrefix.map((p) => ({ id: { startsWith: p } })) })
  }
  return branches.length > 0 ? { OR: branches } : {}
}
