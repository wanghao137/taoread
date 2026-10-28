/** 生产部署后端到端验证：child token → next → 课堂首步 → 媒体头 → 词卡（只读+最小写） */
const BASE = 'http://127.0.0.1:8091'
const DEVICE = 'deploy-verify-20261027'
async function call(method, url, token, payload) {
  const res = await fetch(BASE + url, {
    method,
    headers: { ...(token ? { authorization: `Bearer ${token}` } : {}), ...(payload ? { 'content-type': 'application/json' } : {}) },
    body: payload ? JSON.stringify(payload) : undefined,
    signal: AbortSignal.timeout(30000),
  })
  const text = await res.text()
  let json = null
  try { json = JSON.parse(text) } catch { /* non-json */ }
  return { status: res.status, json, text }
}
const issues = []
;(async () => {
  // 健康与版本
  const health = await call('GET', '/api/health')
  if (!health.json?.ok) issues.push('health not ok')
  // child 登录（家庭码 12345678）
  const join = await call('POST', '/api/family/join', undefined, { familyCode: '12345678', role: 'child', deviceId: DEVICE })
  if (join.status !== 200) { console.log('JOIN_FAIL', join.status, join.text.slice(0, 200)); process.exit(1) }
  const token = join.json.token
  const familyId = join.json.familyId
  // join 不带 childId：孩子档案从家庭孩子列表取（登录后选孩子的同源路径）
  const kids = await call('GET', `/api/family/${familyId}/children`, token)
  const childId = kids.json?.children?.[0]?.id ?? kids.json?.[0]?.id
  console.log('children api:', kids.status, 'childId:', childId)
  if (!childId) { console.log('KIDS_BODY', kids.text.slice(0, 200)); process.exit(1) }
  // 拼读 next（enrollment 已开）
  const next = await call('GET', `/api/phonics/v2/children/${childId}/next`, token)
  console.log('next:', JSON.stringify(next.json?.next))
  if (!next.json?.next || ['disabled', 'unavailable'].includes(next.json.next.reason)) issues.push('next=' + JSON.stringify(next.json?.next))
  // catalog 应含 53 课与 selfUse 标记
  const catalog = await call('GET', '/api/phonics/v2/catalog', token)
  const version = catalog.json?.versions?.[0]
  console.log('catalog:', JSON.stringify({ versionId: version?.versionId, selfUse: version?.selfUse, lessons: version?.lessons?.length }))
  if (!version?.selfUse) issues.push('catalog selfUse false')
  if (version?.lessons?.length !== 53) issues.push('catalog lessons=' + version?.lessons?.length)
  // 词卡（entry 模式 L01，尚无完成课 → 起点前无词 → 空列表正常；验证 200）
  const words = await call('GET', `/api/phonics/v2/children/${childId}/words`, token)
  console.log('words:', words.status, 'count:', words.json?.words?.length)
  if (words.status !== 200) issues.push('words ' + words.status)
  // 图鉴（docs/92 新端点）：全量词+书架+路线；未解锁词不得泄露文本
  const atlas = await call('GET', `/api/phonics/v2/children/${childId}/atlas`, token)
  const a = atlas.json?.atlas
  // docs/94 起图鉴全词可浏览（unlocked=练习开放），旧防偷看合同作废；
  // 当前合同：89 词全带文本与释义，词典旁挂齐备，匿名 401，他户空表。
  const lexiconCount = (a?.words ?? []).filter(w => w.lexicon && w.lexicon.ukIpa && w.lexicon.example).length
  const gbAudio = (a?.words ?? []).every(w => !w.wordAudioAccent || w.wordAudioAccent === 'GB')
  console.log('atlas:', atlas.status, JSON.stringify({ words: a?.words?.length, unlocked: a?.words?.filter(w => w.unlocked).length, readers: a?.readers?.length, lessons: a?.lessons?.length }))
  if (atlas.status !== 200) issues.push('atlas ' + atlas.status)
  console.log('lexicon:', lexiconCount, '| accent all GB:', gbAudio)
  if (lexiconCount < 80) issues.push('lexicon entries missing: ' + lexiconCount)
  if (!gbAudio) issues.push('unexpected US accent default')
  // 匿名 atlas 必须拒绝
  const atlasAnon = await call('GET', `/api/phonics/v2/children/${childId}/atlas`)
  if (atlasAnon.status !== 401) issues.push('atlas anon ' + atlasAnon.status)
  else console.log('atlas anon: 401 (gate ok)')
  // 课堂首步：按推荐进入（entry 或 lesson）
  const n = next.json.next
  if (n.versionId && n.planKind) {
    const { randomUUID } = await import('node:crypto')
    const start = await call('POST', `/api/phonics/v2/children/${childId}/attempts`, token, { clientAttemptId: randomUUID(), versionId: n.versionId, planKind: n.planKind, ...(n.resourceKey ? { resourceKey: n.resourceKey } : {}) })
    console.log('start:', start.status, n.planKind, n.resourceKey ?? '')
    if (start.status !== 200) issues.push('start ' + start.status + ' ' + start.text.slice(0, 120))
    else {
      const attempt = start.json.attempt
      const assets = attempt.assets ?? []
      const audio = assets.filter(a => a.purpose !== 'image' && a.url)
      const image = assets.filter(a => a.purpose === 'image' && a.url)
      console.log('task:', attempt.task?.id, attempt.task?.kind, '| display:', attempt.task?.displayText ?? '-', '| audio:', audio.length, '| img:', image.length)
      if (!audio.length) issues.push('first task has no audio')
      if (attempt.task?.skill === 'meaning' && !image.length) issues.push('meaning task has no image')
      // 取一条音频与一张图验头
      for (const a of [audio[0], image[0]].filter(Boolean)) {
        const m = await fetch(BASE + a.url, { headers: { authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(30000) })
        const type = m.headers.get('content-type')
        console.log('media:', a.purpose, m.status, type, (await m.arrayBuffer()).byteLength + 'B')
        if (m.status !== 200) issues.push('media ' + a.purpose + ' ' + m.status)
      }
      // 立即暂停，不留活跃会话
      const { randomUUID: u } = await import('node:crypto')
      const pause = await call('POST', `/api/phonics/v2/attempts/${attempt.id}/pause`, token, { clientEventId: u(), expectedRevision: attempt.revision })
      if (pause.status !== 200) issues.push('pause ' + pause.status)
      else console.log('paused cleanly')
    }
  }
  console.log(JSON.stringify({ issues }))
  if (issues.length) process.exit(1)
})().catch(e => { console.error('ERR', e.message); process.exit(1) })
