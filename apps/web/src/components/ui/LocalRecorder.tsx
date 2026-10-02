import { useEffect, useRef, useState } from 'react'

/** Optional practice, held in memory only; no upload and no pronunciation score. */
export function LocalRecorder() {
  const [state, setState] = useState<'idle' | 'requesting' | 'recording' | 'ready'>('idle')
  const [url, setUrl] = useState<string | null>(null)
  const [error, setError] = useState('')
  const recorder = useRef<MediaRecorder | null>(null)
  const stream = useRef<MediaStream | null>(null)
  const alive = useRef(true)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const objectUrl = useRef<string | null>(null)
  const release = () => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = null
    stream.current?.getTracks().forEach((track) => track.stop())
    stream.current = null
  }
  useEffect(() => {
    alive.current = true
    return () => {
      alive.current = false
      if (recorder.current?.state === 'recording') recorder.current.stop()
      release()
      if (objectUrl.current) URL.revokeObjectURL(objectUrl.current)
    }
  }, [])
  function remove() {
    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current)
    objectUrl.current = null
    setUrl(null)
    setState('idle')
  }
  async function start() {
    if (state === 'requesting' || state === 'recording') return
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setError('这个浏览器暂不支持录音，可以直接读给家人听。')
      return
    }
    setError('')
    remove()
    setState('requesting')
    try {
      const input = await navigator.mediaDevices.getUserMedia({ audio: true })
      if (!alive.current) { input.getTracks().forEach((track) => track.stop()); return }
      stream.current = input
      const chunks: Blob[] = []
      let failed = false
      const r = new MediaRecorder(input)
      recorder.current = r
      r.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data) }
      r.onstop = () => {
        release()
        if (!alive.current) return
        if (failed) { setState('idle'); return }
        if (!chunks.length) { setState('idle'); setError('没有录到声音，请再试一次。'); return }
        const next = URL.createObjectURL(new Blob(chunks, { type: r.mimeType }))
        objectUrl.current = next
        setUrl(next)
        setState('ready')
      }
      r.onerror = () => { failed = true; release(); if (alive.current) { setState('idle'); setError('录音中断了，请再试一次。') } }
      r.start()
      setState('recording')
      timer.current = setTimeout(() => { if (r.state === 'recording') r.stop() }, 60_000)
    } catch {
      release()
      if (alive.current) { setState('idle'); setError('麦克风未打开，请检查浏览器权限。') }
    }
  }
  return <section aria-label="本地跟读录音">
    <h3>读一段，听听自己</h3>
    <p className="mono-label">最长 1 分钟；仅在当前页面保留，不上传、不评分。关闭面板或换人后删除。</p>
    <div className="setting-row">
      <button onClick={() => void start()} disabled={state === 'requesting' || state === 'recording'}>{state === 'requesting' ? '等待麦克风授权…' : '开始录音'}</button>
      {state === 'recording' && <button onClick={() => recorder.current?.stop()}>停止录音</button>}
      {url && <button onClick={remove}>删除录音</button>}
    </div>
    {url && <audio controls src={url} aria-label="回放自己的录音" style={{ width: '100%', marginTop: 12 }} />}
    {error && <p role="alert">{error}</p>}
    <p role="status">{state === 'recording' ? '正在录音，点停止结束' : ''}</p>
  </section>
}
