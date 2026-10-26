import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { PhonicsNextDto } from '@taoread/shared'
import { useSession } from '../../../stores/session'
import { phonicsApi } from './api'
import { useVisibleOnce } from '../../../lib/useVisibleOnce'

/** 今天页的英语卡：贴纸大卡而不是文字链（docs/90 入口显眼化）。未开启时引导孩子找家长。 */
export function PhonicsToday({ enabled = false }: { enabled?: boolean }) {
  const { ref, visible } = useVisibleOnce()
  const { token, childId } = useSession()
  const [next, setNext] = useState<PhonicsNextDto | null>(null)
  useEffect(() => {
    let live = true
    setNext(null)
    if (enabled && visible && token && childId) void phonicsApi.next(token, childId).then(r => { if (live) setNext(r.next) }).catch(() => undefined)
    return () => { live = false }
  }, [token, childId, enabled, visible])
  const actionable = Boolean(enabled && next && !['disabled', 'unavailable'].includes(next.reason))
  const subtitle = !enabled ? '请家长帮忙开启'
    : actionable ? next!.label
    : '现在先休息一下，等等再来看'
  return <div ref={ref} className="today-secondary">
    <Link className="phonics-entry min-h-[88px]" to="/child/phonics">
      <span className="phonics-entry-badge" aria-hidden="true">🔊</span>
      <span className="phonics-entry-body">
        <b>英语声音小课堂</b>
        <span>{subtitle}</span>
      </span>
      <span className="phonics-entry-go" aria-hidden="true">→</span>
    </Link>
  </div>
}
