/**
 * 微信读书接口的类型化封装（仅封装桃阅读用到的接口；字段口径以 weread skill 各说明文件为准）。
 * call 由调用方注入（真实网关或测试 mock），本层不做缓存与限流。
 */

export type WereadCall = <T = unknown>(
  apiName: string,
  params?: Record<string, unknown>,
) => Promise<T>

export interface StoreSearchParams {
  keyword: string
  scope?: number
  count?: number
  maxIdx?: number
}

export interface ReadDataParams {
  mode?: 'weekly' | 'monthly' | 'annually' | 'overall'
  baseTime?: number
}

export function createWereadEndpoints(call: WereadCall) {
  return {
    /** 网关接口清单（绑定时用于探活） */
    listApis: () => call<{ apis?: unknown[] }>('/_list'),

    storeSearch: (p: StoreSearchParams) => call('/store/search', { ...p }),

    /** 书架同步：回包含 books / albums（听书专辑）/ mp（公众号文章收藏）三个分区 */
    shelfSync: () => call('/shelf/sync'),

    bookInfo: (bookId: string) => call('/book/info', { bookId }),

    chapterInfo: (bookId: string) => call('/book/chapterinfo', { bookId }),

    /** 阅读进度：实时数据，调用层不缓存 */
    getProgress: (bookId: string) => call('/book/getprogress', { bookId }),

    /** 全书热门划线 Top20（含原文与划线人数）；chapterUid=0 表示全部章节 */
    bestBookmarks: (bookId: string, chapterUid = 0) =>
      call('/book/bestbookmarks', { bookId, chapterUid }),

    readDataDetail: (p: ReadDataParams = {}) =>
      call('/readdata/detail', { mode: p.mode ?? 'monthly', baseTime: p.baseTime ?? 0 }),

    bookRecommend: (count = 12) => call('/book/recommend', { count }),

    bookSimilar: (bookId: string, count = 12) =>
      call('/book/similar', { bookId, count }),

    userNotebooks: (count = 20, lastSort?: number) =>
      call('/user/notebooks', {
        count,
        ...(lastSort !== undefined ? { lastSort } : {}),
      }),
  }
}

export type WereadEndpoints = ReturnType<typeof createWereadEndpoints>
