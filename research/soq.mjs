import https from 'https'

function get(u) {
  return new Promise((res, rej) => {
    const r = https.get(u, { headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json' } }, (x) => {
      let d = ''
      x.on('data', (c) => (d += c))
      x.on('end', () => res(d))
    })
    r.on('error', rej)
    r.setTimeout(25000, () => { r.destroy(); rej(new Error('to')) })
  })
}

const queries = process.argv.slice(2)
for (const q of queries) {
  try {
    const d = JSON.parse(await get('https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=votes&q=' + encodeURIComponent(q) + '&site=stackoverflow&pagesize=5'))
    console.log('=== ' + q + ' ===')
    for (const it of d.items || []) console.log('- [' + it.score + '] ' + it.title.replace(/&quot;/g, '"').replace(/&#39;/g, "'").slice(0, 85) + ' | ' + it.link)
  } catch (e) { console.log('ERR', q, e.message) }
}
