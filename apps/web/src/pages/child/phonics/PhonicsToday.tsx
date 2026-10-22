import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { PhonicsNextDto } from '@taoread/shared'
import { useSession } from '../../../stores/session'
import { phonicsApi } from './api'
import { useVisibleOnce } from '../../../lib/useVisibleOnce'

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
  return <div ref={ref} className="today-secondary"><Link className="text-action min-h-[56px]" style={{ display: 'inline-flex', alignItems: 'center' }} to="/child/phonics">{next && !['disabled', 'unavailable'].includes(next.reason) ? `英语 · ${next.label}` : '英语声音小课堂'} →</Link></div>
}
