/**
 * 家长端 · 内容中心（V8 Phase 6）：桃书库 / 微信读书 / 纸质书 / 已屏蔽 统一入口。
 * 合并原 ContentLibrary（桃书库进度 + 逐本屏蔽）与 ShelfManager（微信读书书架 + 逐条屏蔽）。
 * 纸质书本版只放说明卡（不放假数据）；搜索为客户端过滤（书名/作者，500ms 防抖）。
 * v8 贴纸绘本语言（2026-09-21 家长端重构）：tab/筛选胶囊 + hub-row 贴纸行，数据逻辑不变。
 */
import { useCallback, useEffect, useState } from 'react'
import {
  api,
  ApiError,
  type ContentFamilyBookDto,
  type ShelfItemDto,
} from '../../lib/api'
import { Loading, ErrorState, EmptyState } from '../../components/ui'
import { SceneArt } from '../../components/art/SceneArt'
import { AiBadge } from '../../components/art/AiBadge'
import { PageHead } from '../child/V8App'
import { remainingMinutes, minutesLabel } from '../../lib/readingTime'

export interface ContentHubProps {
  familyId: string
  token: string
}

type SourceKey = 'tao' | 'weread' | 'paper' | 'blocked'

const SOURCES: Array<{ key: SourceKey; label: string }> = [
  { key: 'tao', label: '桃书库' },
  { key: 'weread', label: '微信读书' },
  { key: 'paper', label: '纸质书' },
  { key: 'blocked', label: '已屏蔽' },
]

const CATEGORY_LABEL: Record<string, string> = {
  poetry: '古诗',
  primer: '蒙学',
  story: '故事',
  tale: '童话',
}
const CATEGORY_KEYS = ['poetry', 'primer', 'story', 'tale'] as const
type CategoryKey = (typeof CATEGORY_KEYS)[number] | 'all'

type SortKey = 'title' | 'progress'
const SORT_LABEL: Record<SortKey, string> = { title: '按书名', progress: '按进度' }

/** 单一来源的加载状态：loading / error / ready 三态齐全（错误可重试） */
type Slice<T> =
  | { kind: 'loading' }
  | { kind: 'error'; message?: string }
  | { kind: 'ready'; data: T }

interface TaoData {
  books: ContentFamilyBookDto[]
  nicknames: Map<string, string>
}

interface WereadData {
  books: ShelfItemDto[]
  albums: ShelfItemDto[]
  /** "kind:bookId" 串集合（服务端屏蔽状态来源，与孩子端书架同口径） */
  blockedIds: string[]
}

/** 列表行统一模型：桃书库与微信读书共用一套渲染 */
interface HubRow {
  key: string
  badge: string
  title: string
  author: string | null
  category: string | null
  blocked: boolean
  /** 桃书库场景封面（有则显示） */
  scene?: { art: string; from: string | null; to: string | null; lang: string }
  /** 微信读书远端封面 URL（有则显示） */
  coverUrl?: string
  /** 孩子的阅读进度（contentFamily 已带 readers；微信读书书架无此数据） */
  readers: Array<{ childId: string; name: string; progress: number; finished: boolean }>
  metaLines: string[]
  /** 桃书库屏蔽走 setContentBlocked */
  contentId?: string
  /** 微信读书屏蔽走 setBlocked */
  weread?: { bookId: string; kind: 'book' | 'album' }
}

/** 贴纸封面：真实 AI 插画优先（与孩子端同源），加载失败回退场景图；两者皆无时保持 demo 原生画框占位 */
function HubCover({ row }: { row: HubRow }) {
  const [imgOk, setImgOk] = useState(true)
  const showImg = Boolean(row.coverUrl) && imgOk
  const showScene = !showImg && Boolean(row.scene)
  const filled = showImg || showScene
  return (
    <div className={`book-cover sky hub-cover ${filled ? 'has-art' : ''}`}>
      {showImg ? (
        <img
          className="cover-art"
          src={row.coverUrl}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setImgOk(false)}
        />
      ) : showScene && row.scene ? (
        <span className="cover-art-wrap">
          <SceneArt scene={row.scene.art} from={row.scene.from} to={row.scene.to} lang={row.scene.lang} />
        </span>
      ) : null}
      <span className="cover-title">{row.title}</span>
      {showImg ? <AiBadge /> : null}
    </div>
  )
}

export function ContentHub({ familyId, token }: ContentHubProps) {  const [source, setSource] = useState<SourceKey>('tao')
  const [tao, setTao] = useState<Slice<TaoData>>({ kind: 'loading' })
  const [weread, setWeread] = useState<Slice<WereadData>>({ kind: 'loading' })
  const [searchInput, setSearchInput] = useState('')
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('title')
  const [category, setCategory] = useState<CategoryKey>('all')
  const [busyKey, setBusyKey] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  // ── 数据加载：两个来源并行，各自独立三态 ──
  const loadTao = useCallback(() => {
    let alive = true
    setTao({ kind: 'loading' })
    api
      .contentFamily(token)
      .then((res) => {
        if (!alive) return
        setTao({
          kind: 'ready',
          data: {
            books: res.books,
            nicknames: new Map(res.children.map((c) => [c.id, c.nickname])),
          },
        })
      })
      .catch((err: unknown) => {
        if (!alive) return
        setTao({ kind: 'error', message: err instanceof ApiError ? err.message : undefined })
      })
    return () => {
      alive = false
    }
  }, [token])

  const loadWeread = useCallback(() => {
    let alive = true
    setWeread({ kind: 'loading' })
    api
      .shelf(familyId, token)
      .then((dto) => {
        if (!alive) return
        setWeread({
          kind: 'ready',
          data: {
            books: dto.books ?? [],
            albums: dto.albums ?? [],
            blockedIds: dto.blockedBookIds ?? [],
          },
        })
      })
      .catch((err: unknown) => {
        if (!alive) return
        setWeread({ kind: 'error', message: err instanceof ApiError ? err.message : undefined })
      })
    return () => {
      alive = false
    }
  }, [familyId, token])

  useEffect(() => loadTao(), [loadTao])
  useEffect(() => loadWeread(), [loadWeread])

  // 搜索 500ms 防抖：输入停顿后才真正过滤
  useEffect(() => {
    const timer = window.setTimeout(() => setQuery(searchInput.trim()), 500)
    return () => window.clearTimeout(timer)
  }, [searchInput])

  function buildTaoRows(data: TaoData): HubRow[] {
    return data.books.map((b) => ({
      key: `tao:${b.id}`,
      badge: '桃书库',
      title: b.title,
      author: b.author,
      category: b.category,
      blocked: b.blocked,
      // 真实 AI 封面（与孩子端书架同源）；场景图仅作兜底
      coverUrl: b.coverArtUrl ?? undefined,
      scene: { art: b.coverArt, from: b.coverFrom, to: b.coverTo, lang: b.lang },
      readers: b.readers.map((r) => ({
        childId: r.childId,
        name: data.nicknames.get(r.childId) ?? '孩子',
        progress: r.progress,
        finished: r.finished,
      })),
      metaLines: [
        `${CATEGORY_LABEL[b.category] ?? b.category} · ${b.lang === 'en' ? '英文' : '中文'} · ${b.ageStage} · ${b.chapterCount} 章`,
        // 预计时长只给家长看（docs/17 P0-2），帮家长选书
        `预计 ${minutesLabel(remainingMinutes(b))} · 约 ${b.words} 字`,
      ],
      contentId: b.id,
    }))
  }

  function buildWereadRows(data: WereadData): HubRow[] {
    const toRow = (it: ShelfItemDto, kind: 'book' | 'album', badge: string): HubRow => ({
      key: `weread:${kind}:${it.bookId}`,
      badge,
      title: it.title,
      author: it.author ?? null,
      category: null,
      blocked: data.blockedIds.includes(`${kind}:${it.bookId}`) || it.blocked === true,
      coverUrl: it.cover,
      readers: [],
      metaLines: [],
      weread: { bookId: it.bookId, kind },
    })
    return [
      ...data.books.map((it) => toRow(it, 'book', '微信读书')),
      ...data.albums.map((it) => toRow(it, 'album', '微信读书 · 听书')),
    ]
  }

  const q = query.toLowerCase()
  function matchQuery(row: HubRow): boolean {
    if (!q) return true
    return row.title.toLowerCase().includes(q) || (row.author ?? '').toLowerCase().includes(q)
  }

  function sortRows(rows: HubRow[]): HubRow[] {
    const sorted = [...rows]
    if (sortKey === 'title') {
      sorted.sort((a, b) => a.title.localeCompare(b.title, 'zh'))
    } else {
      // 按进度：取孩子里的最高进度；还没开读的排最后
      const best = (r: HubRow) => r.readers.reduce((m, x) => Math.max(m, x.progress), -1)
      sorted.sort((a, b) => best(b) - best(a))
    }
    return sorted
  }

  function activeRows(): HubRow[] {
    if (source === 'tao' && tao.kind === 'ready') {
      let rows = buildTaoRows(tao.data).filter(matchQuery)
      if (category !== 'all') rows = rows.filter((r) => r.category === category)
      return sortRows(rows)
    }
    if (source === 'weread' && weread.kind === 'ready') {
      return buildWereadRows(weread.data).filter(matchQuery)
    }
    if (source === 'blocked') {
      const out: HubRow[] = []
      if (tao.kind === 'ready') out.push(...buildTaoRows(tao.data).filter((r) => r.blocked))
      if (weread.kind === 'ready') out.push(...buildWereadRows(weread.data).filter((r) => r.blocked))
      return out.filter(matchQuery)
    }
    return []
  }

  function retryActive() {
    if (source === 'tao') loadTao()
    else if (source === 'weread') loadWeread()
    else if (source === 'blocked') {
      if (tao.kind === 'error') loadTao()
      if (weread.kind === 'error') loadWeread()
    }
  }

  async function toggleBlocked(row: HubRow) {
    if (busyKey) return
    const next = !row.blocked
    setBusyKey(row.key)
    setNotice(null)
    try {
      if (row.contentId) {
        await api.setContentBlocked(row.contentId, next, token)
        setTao((s) => {
          if (s.kind !== 'ready') return s
          return {
            ...s,
            data: {
              ...s.data,
              books: s.data.books.map((b) => (b.id === row.contentId ? { ...b, blocked: next } : b)),
            },
          }
        })
      } else if (row.weread) {
        await api.setBlocked(familyId, row.weread.bookId, token, {
          kind: row.weread.kind,
          blocked: next,
          title: row.title,
        })
        const flag = `${row.weread.kind}:${row.weread.bookId}`
        setWeread((s) => {
          if (s.kind !== 'ready') return s
          return {
            ...s,
            data: {
              ...s.data,
              blockedIds: next
                ? [...s.data.blockedIds, flag]
                : s.data.blockedIds.filter((k) => k !== flag),
            },
          }
        })
      }
    } catch (err) {
      setNotice(err instanceof ApiError ? err.message : '操作没有成功，请稍后再试')
    } finally {
      setBusyKey(null)
    }
  }

  /**
   * 贴纸封面：真实 AI 插画优先（与孩子端同源），加载失败回退场景图；
   * 两者皆无时保持 demo 原生 CSS 画框占位。
   */
  function cover(row: HubRow) {
    return <HubCover row={row} />
  }

  function listArea() {
    if (source === 'paper') {
      // 纸质书记录未接入，先给说明卡——不放假数据
      return (
        <div className="panel">
          <h3>纸质书</h3>
          <p>纸质书记录即将支持。</p>
          <p>到时可以把家里读的纸质绘本也记进来，和桃书库、微信读书放在一起看。</p>
        </div>
      )
    }

    const slices = source === 'tao' ? [tao] : source === 'weread' ? [weread] : [tao, weread]
    if (slices.some((s) => s.kind === 'loading')) {
      return <Loading label={source === 'weread' ? '微信读书书架正在赶来…' : '正在搬书…'} />
    }
    const failed = slices.find((s) => s.kind === 'error')
    if (failed && failed.kind === 'error') {
      const fallback =
        source === 'tao'
          ? '桃书库暂时打不开'
          : source === 'weread'
            ? '微信读书书架暂时打不开'
            : '屏蔽记录暂时打不开'
      return <ErrorState message={failed.message ?? fallback} onRetry={retryActive} />
    }

    const rows = activeRows()
    if (rows.length === 0) {
      if (q) {
        return (
          <EmptyState
            art="bookshelf"
            mood="hint"
            title="没有找到匹配的书"
            hint={`没有书名或作者带「${query}」的记录，换个词试试`}
          />
        )
      }
      if (source === 'tao') {
        return (
          <EmptyState
            art="empty-sprout"
            mood="happy"
            title="桃书库还没有书"
            hint="公版书库由应用统一维护，孩子端书架会自动出现。"
          />
        )
      }
      if (source === 'weread') {
        return (
          <EmptyState
            art="bookshelf"
            mood="hint"
            title="微信读书书架还是空的"
            hint="在小读者的设备上连接微信读书后，书架会出现在这里。"
          />
        )
      }
      return (
        <EmptyState
          art="empty-sprout"
          mood="happy"
          title="还没有屏蔽任何内容"
          hint="不合适的书，在这里按一下就能从孩子端收起来。"
        />
      )
    }

    return (
      <div className="hub-grid">
        {rows.map((row) => (
          <article key={row.key} className="hub-card">
            {cover(row)}
            <div className="hub-title">
              <b>{row.title}</b>
              <span className="tag">{row.badge}</span>
              {row.blocked && <span className="tag rose">已屏蔽</span>}
            </div>
            {row.author && <p className="mono-line">{row.author}</p>}
            {row.metaLines.map((line) => (
              <p key={line} className="mono-line">
                {line}
              </p>
            ))}
            {/* 孩子的进度（contentFamily readers；微信读书书架无此数据则不显示） */}
            {row.readers.map((r) => (
              <div key={r.childId} className="reader-line">
                <span className="mono-line" style={{ width: 42, flexShrink: 0 }}>
                  {r.name}
                </span>
                <div className={`prog ${r.finished ? 'done' : ''}`}>
                  <i style={{ width: `${r.progress}%` }} />
                </div>
                <span className="mono-line" style={{ width: 48, flexShrink: 0, textAlign: 'right' }}>
                  {r.finished ? '读完' : `${r.progress}%`}
                </span>
              </div>
            ))}
            <div className="hub-actions">
              <button type="button" className="sticker-btn sm" disabled={busyKey === row.key} onClick={() => void toggleBlocked(row)}>
                {row.blocked ? '恢复显示' : '屏蔽'}
              </button>
            </div>
          </article>
        ))}
      </div>
    )
  }

  return (
    <div>
      <PageHead index="02" title="内容中心" sub="桃书库、微信读书、纸质书记录与屏蔽管理，都在这里" />

      {/* 来源切换 */}
      <div className="tabs" role="tablist" aria-label="内容来源">
        {SOURCES.map((s) => (
          <button
            key={s.key}
            type="button"
            className={`tab ${source === s.key ? 'on' : ''}`}
            aria-pressed={source === s.key}
            onClick={() => {
              setSource(s.key)
              setNotice(null)
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* 搜索：书名/作者，客户端过滤，500ms 防抖 */}
      {source !== 'paper' && (
        <div className="search-wrap">
          <input
            type="search"
            className="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="搜书名或作者"
            aria-label="按书名或作者搜索"
          />
        </div>
      )}

      {/* 排序 + 分类筛选：桃书库数据带进度与分类（任务 7，200+ 可管理） */}
      {source === 'tao' && (
        <div className="filter-row">
          {(['title', 'progress'] as SortKey[]).map((k) => (
            <button key={k} type="button" className={`filter ${sortKey === k ? 'on' : ''}`} aria-pressed={sortKey === k} onClick={() => setSortKey(k)}>
              {SORT_LABEL[k]}
            </button>
          ))}
          <span className="v-divider" aria-hidden />
          {(['all', ...CATEGORY_KEYS] as CategoryKey[]).map((c) => (
            <button key={c} type="button" className={`filter ${category === c ? 'on' : ''}`} aria-pressed={category === c} onClick={() => setCategory(c)}>
              {c === 'all' ? '全部分类' : CATEGORY_LABEL[c]}
            </button>
          ))}
        </div>
      )}

      {notice && (
        <p role="alert" className="msg">
          {notice}
        </p>
      )}

      <div style={{ marginTop: 10 }}>{listArea()}</div>

      {(source === 'tao' || source === 'blocked') && (
        <p className="mono-line" style={{ marginTop: 12, fontSize: 11, lineHeight: 1.7 }}>
          屏蔽后，孩子端会立刻隐藏这本书，且不会有任何提示——孩子不会感到被否定。
        </p>
      )}
    </div>
  )
}
