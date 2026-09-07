/**
 * 桃阅读前后端共享常量与类型。
 * 时间戳统一 Unix 秒；阅读时长统一秒；展示层负责格式化。
 */

/** 已安装 weread-skills 的版本；网关要求每次请求上报，升级时同步修改 */
export const SKILL_VERSION = '1.0.4'

/** 微信读书 Agent 网关统一入口 */
export const WEREAD_GATEWAY_URL = 'https://i.weread.qq.com/api/agent/gateway'

/** /store/search 的 scope 取值（依据 weread skill search.md） */
export const SEARCH_SCOPE = {
  ALL: 0,
  MP_ACCOUNT: 2,
  ARTICLE: 4,
  AUTHOR: 6,
  EBOOK: 10,
  FULLTEXT: 12,
  BOOKLIST: 13,
  AUDIO: 14,
  WEBNOVEL: 16,
} as const
export type SearchScope = (typeof SEARCH_SCOPE)[keyof typeof SEARCH_SCOPE]

/** 童书类目白名单（双口径，真实回包校准）：中文前缀为主，数字前缀兼容 */
export const CHILD_CATEGORY_PREFIXES = ['童书', '1300000'] as const

/** 共读收尾时孩子的进度三档（M4） */
export const PROGRESS_MARKS = ['little', 'lot', 'done'] as const
export type ProgressMark = (typeof PROGRESS_MARKS)[number]

/** 心情贴纸（自主表达，不计分） */
export const MOODS = ['happy', 'excited', 'calm', 'sleepy', 'thinking'] as const
export type Mood = (typeof MOODS)[number]

/** 金句来源：weread=热门划线点选，voice=孩子口述，manual=家长录入 */
export const HIGHLIGHT_SOURCES = ['weread', 'voice', 'manual'] as const
export type HighlightSource = (typeof HIGHLIGHT_SOURCES)[number]

/** 书架条目类型（/shelf/sync 回包三分区） */
export const SHELF_KINDS = ['book', 'album', 'mp'] as const
export type ShelfKind = (typeof SHELF_KINDS)[number]

/** 孩子发展阶段（共读卡提问梯度的分档依据） */
export const CHILD_STAGES = ['3-5', '6-8', '9-12'] as const
export type ChildStage = (typeof CHILD_STAGES)[number]

/** 成就类型：全部为纪念式，无任何兑换 */
export const ACHIEVEMENT_KINDS = ['night_lamp', 'streak_best', 'book_done'] as const
export type AchievementKind = (typeof ACHIEVEMENT_KINDS)[number]
