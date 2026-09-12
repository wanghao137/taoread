/**
 * 演示模式 mock 网关（`npm run demo`，TAO_DEMO=1）。
 *
 * 设计约束：回包结构与字段口径与真实微信读书 Agent 网关完全一致
 * （weread skill 各说明文档为准），使演示链路=真实链路，仅数据源不同。
 * deepLink 为演示值（本演示即「网关」，回包原值由这里给出，客户端零拼接）。
 * 封面图使用微信读书公开 CDN；离线环境加载失败时前端回退 📖 占位（不破版）。
 */
import type { WereadCall } from '../services/weread/endpoints'

interface MockBook {
  bookId: string
  title: string
  author: string
  intro: string
  cover: string
  category: string
  deepLink: string
}

const COVER = (path: string) => `https://cdn.weread.qq.com/weread/cover/${path}`

const CATALOG: MockBook[] = [
  {
    bookId: '3300103106',
    title: '脑筋急转弯（套装共6册）',
    author: '亦凡',
    intro: '两百多个趣味脑筋急转弯，让孩子在哈哈大笑中动脑筋、练思维，适合亲子共读时的猜谜互动。',
    cover: COVER('51/cpplatform_3domtsq5otfvr6m3bpczak/t6_cpplatform_3domtsq5otfvr6m3bpczak1719209925.jpg'),
    category: '童书-幼儿启蒙',
    deepLink: 'https://weread.qq.com/book-detail?type=1&v=e7f324f0813ab8ec6g016c6c',
  },
  {
    bookId: '506698',
    title: '十万个为什么（全集）',
    author: '方洲',
    intro: '孩子最爱问的十万个为什么，天文地理生物百科，守护每一颗好奇心。',
    cover: COVER('42/YueWen_506698/t6_YueWen_506698.jpg'),
    category: '童书-幼儿启蒙',
    deepLink: 'https://weread.qq.com/book-detail?type=1&v=45b3278057bb4a45bbd2e61',
  },
  {
    bookId: '32858446',
    title: '西游记（小学生无障碍阅读版）',
    author: '李伯钦主编 李宏涛改写',
    intro: '专为小学生改写的西游记，生字注音、难词注释，跟着悟空师徒踏上去西天的路。',
    cover: COVER('34/YueWen_32858446/t6_YueWen_32858446.jpg'),
    category: '童书-儿童文学',
    deepLink: 'https://weread.qq.com/book-detail?type=1&v=9343238071f5614e9342a3d',
  },
  {
    bookId: '9000001',
    title: '小王子',
    author: '圣埃克苏佩里',
    intro: '写给大人的童话。来自 B-612 小行星的小王子，在星际旅行中学会了驯养与告别。',
    cover: COVER('80/cpplatform_9000001/t6_9000001.jpg'),
    category: '童书-儿童文学',
    deepLink: 'https://weread.qq.com/book-detail?type=1&v=9000001demo',
  },
  {
    bookId: '9000002',
    title: '夏洛的网',
    author: 'E.B.怀特',
    intro: '蜘蛛夏洛用网上的文字拯救了小猪威尔伯，一个关于友谊与承诺的温暖故事。',
    cover: COVER('80/cpplatform_9000002/t6_9000002.jpg'),
    category: '童书-儿童文学',
    deepLink: 'https://weread.qq.com/book-detail?type=1&v=9000002demo',
  },
  {
    bookId: '9000003',
    title: '窗边的小豆豆',
    author: '黑柳彻子',
    intro: '因淘气被退学的小豆豆来到巴学园，在小林校长的爱护下，成了一辈子都被童年治愈的人。',
    cover: COVER('80/cpplatform_9000003/t6_9000003.jpg'),
    category: '童书-儿童文学',
    deepLink: 'https://weread.qq.com/book-detail?type=1&v=9000003demo',
  },
]

const RECOMMEND_POOL = ['9000001', '9000002', '9000003']

const BEST_BOOKMARKS: Record<string, Array<{ markText: string; totalCount: number }>> = {
  '9000001': [
    { markText: '重要的东西用眼睛是看不见的，要用心去看。', totalCount: 59878 },
    { markText: '你在你的玫瑰身上花费的时间，让你的玫瑰变得如此重要。', totalCount: 45231 },
    { markText: '所有的大人都曾经是小孩，虽然，只有少数人记得。', totalCount: 38900 },
    { markText: '如果你驯养了我，我们就互相不可缺少了。', totalCount: 27511 },
  ],
  '3300103106': [
    { markText: '什么东西越洗越脏？——水。', totalCount: 12003 },
    { markText: '什么门永远关不上？——球门。', totalCount: 9877 },
  ],
  '9000002': [
    { markText: '你一直是我的朋友，这件事本身就是一件了不起的事。', totalCount: 31204 },
    { markText: '夏洛用自己的生命，织出了一张爱网。', totalCount: 22890 },
  ],
  '9000003': [
    { markText: '世界上最可怕的事情，莫过于有眼睛却发现不了美。', totalCount: 40012 },
  ],
}

const DEFAULT_BOOKMARKS = [
  { markText: '读过一本好书，像交了一个益友。', totalCount: 15600 },
  { markText: '今晚的故事，明晚继续。', totalCount: 8800 },
]

const bookById = (bookId: string) => CATALOG.find((b) => b.bookId === bookId)

/** 演示网关：按 api_name 返回与真实网关同构的回包 */
type DemoReply = Record<string, unknown>
export function createDemoGateway(): WereadCall {
  const call = async (apiName: string, params?: Record<string, unknown>): Promise<DemoReply> => {
    const bookId = String(params?.bookId ?? '')

    switch (apiName) {
      case '/_list':
        return { errcode: 0, apis: [{ api_name: '/demo' }] }

      case '/shelf/sync':
        return {
          books: CATALOG.filter((b) => b.bookId !== '9000002').map((b) => ({
            bookId: b.bookId,
            title: b.title,
            author: b.author,
            cover: b.cover,
            category: b.category,
            finishReading: 0,
            readUpdateTime: Math.floor(Date.now() / 1000) - 86_400,
          })),
          albums: [
            {
              albumId: 462592,
              albumInfo: {
                albumId: 462592,
                name: '庆余年（同名电视剧原著）',
                authorName: '猫腻',
                cover: COVER('592/462592/s_462592.jpg'),
                finish: 1,
                updateTime: Math.floor(Date.now() / 1000) - 7 * 86_400,
              },
            },
          ],
          mp: { show: 1, book: { bookId: 'mpbook', title: '文章收藏' } },
        }

      case '/book/info': {
        const b = bookById(bookId)
        if (!b) return { errcode: -1, errmsg: '书籍不存在' }
        return {
          bookId: b.bookId,
          title: b.title,
          author: b.author,
          intro: b.intro,
          cover: b.cover,
          category: b.category,
          deepLink: b.deepLink,
          newRating: 900,
          newRatingCount: 10000,
          publisher: '演示出版社',
        }
      }

      case '/book/chapterinfo':
        return {
          bookId,
          chapters: [
            { chapterUid: 1, chapterIdx: 0, title: '第一章' },
            { chapterUid: 2, chapterIdx: 1, title: '第二章' },
          ],
        }

      case '/book/getprogress':
        return { bookId, progress: 42, timestamp: Math.floor(Date.now() / 1000) }

      case '/book/recommend':
        return {
          books: RECOMMEND_POOL.map((id) => {
            const b = bookById(id)!
            return {
              bookId: b.bookId,
              title: b.title,
              author: b.author,
              cover: b.cover,
              category: b.category,
              intro: b.intro,
              deepLink: b.deepLink,
            }
          }),
        }

      case '/book/bestbookmarks': {
        const items = BEST_BOOKMARKS[bookId] ?? DEFAULT_BOOKMARKS
        return {
          synckey: 1,
          totalCount: items.length,
          items: items.map((it, i) => ({
            bookId,
            bookmarkId: `${bookId}_demo_${i}`,
            chapterUid: 1,
            markText: it.markText,
            totalCount: it.totalCount,
          })),
          chapters: [{ bookId, chapterUid: 1, chapterIdx: 0, title: '第一章' }],
        }
      }

      case '/readdata/detail':
        return {
          totalReadTime: 27 * 3600 + 42 * 60,
          readDays: 12,
          dayAverageReadTime: 27 * 60,
          preferCategoryWord: '偏好阅读童书',
          readStat: [
            { stat: '读过', counts: '6本' },
            { stat: '读完', counts: '2本' },
            { stat: '阅读', counts: '12天' },
            { stat: '笔记', counts: '15条' },
          ],
        }

      case '/store/search': {
        const keyword = String(params?.keyword ?? '')
        const hits = CATALOG.filter(
          (b) => keyword.length > 0 && (b.title.includes(keyword) || b.author.includes(keyword)),
        ).slice(0, 3)
        return {
          sid: 'demo-search',
          hasMore: 0,
          results: hits.map((b) => ({
            title: '电子书',
            scope: 17,
            scopeCount: 1,
            currentCount: 1,
            books: [
              {
                searchIdx: 1,
                bookInfo: {
                  bookId: b.bookId,
                  title: b.title,
                  author: b.author,
                  cover: b.cover,
                  category: b.category,
                  deepLink: b.deepLink,
                },
                readingCount: 8000,
                newRating: 920,
                newRatingDetail: { title: '神作' },
              },
            ],
          })),
        }
      }

      default:
        return { errcode: 0 }
    }
  }
  return call as WereadCall
}
