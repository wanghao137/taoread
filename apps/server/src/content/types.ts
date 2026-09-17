/**
 * 内容包格式（CBF：Canonical Book Format，docs/07 §3）。
 * 一个包 = 一本书的完整正文，由 seedContent 幂等写入 Book/Chapter/Block/RightsLedger。
 *
 * 写包红线（docs/07 §2）：
 *  - 只收公版（作者卒年 > 保护期）或平台自撰改编（basis=original/adapted）；
 *  - 古诗/蒙学必须逐字核对通行本，不臆造、不「补写」；
 *  - 拼音只标多音字与生僻字时全文标注，避免错误注音反而误导。
 */

export type BlockKind = 'text' | 'poem' | 'note' | 'image'
export type BookLang = 'zh' | 'en'
export type BookCategory = 'poetry' | 'primer' | 'story' | 'tale'
export type AgeStage = '3-5' | '6-8' | '9-12'

export interface PackBlock {
  kind: BlockKind
  /** 正文文本（image 块为图注） */
  text: string
  /** 拼音：按字注音，字与字之间用空格分隔（与 text 一一对应） */
  pinyin?: string
  /** 白话译文 / 英文大意 / 注释 */
  translation?: string
  /** image/note 块的 SVG 场景键（对应 web 端 SceneArt） */
  art?: string
}

export interface PackChapter {
  title: string
  art?: string
  /** AI 题图的画面描述（docs/13 P0-A）；缺省时由章节标题派生 */
  artPrompt?: string
  blocks: PackBlock[]
}

export interface RightsInfo {
  workTitle: string
  author?: string
  /** 作者卒年：PD 判定核心字段 */
  authorDeathYear?: number
  translator?: string
  jurisdiction: 'CN' | 'US' | 'EU'
  /** pd-70（伯尔尼公约/中国 50 年）| pd-us（美国 1929 前）| original（自撰）| adapted（公版改编） */
  basis: 'pd-70' | 'pd-us' | 'original' | 'adapted'
  sourceUrl?: string
  note?: string
}

export interface PackBook {
  /** 稳定 slug；共读会话以 cbf: 前缀引用 */
  id: string
  title: string
  author?: string
  lang: BookLang
  category: BookCategory
  ageStage: AgeStage
  intro?: string
  /** 封面 SVG 场景键 */
  coverArt: string
  /** AI 封面插画的画面描述（docs/13 P0-A）；缺省时回退 intro */
  coverArtPrompt?: string
  coverFrom?: string
  coverTo?: string
  source: string
  chapters: PackChapter[]
  rights: RightsInfo
}
