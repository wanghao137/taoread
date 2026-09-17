// 从保存的 HTML 中抽取正文文本
import fs from 'fs'

function strip(html) {
  let s = html
  s = s.replace(/<script[\s\S]*?<\/script>/gi, ' ')
  s = s.replace(/<style[\s\S]*?<\/style>/gi, ' ')
  s = s.replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
  s = s.replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
  s = s.replace(/<!--[\s\S]*?-->/g, ' ')
  s = s.replace(/<(br|\/p|\/div|\/li|\/h[1-6]|\/pre|\/tr)[^>]*>/gi, '\n')
  s = s.replace(/<li[^>]*>/gi, '\n- ')
  s = s.replace(/<[^>]+>/g, '')
  s = s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&times;/g, 'x')
  s = s.replace(/[ \t]+/g, ' ')
  s = s.replace(/\n\s*\n+/g, '\n')
  return s.trim()
}

for (const f of process.argv.slice(2)) {
  try {
    const raw = fs.readFileSync(f, 'utf8')
    let body = raw
    // MDN: 取 article 主区
    const m = raw.match(/<article[\s\S]*?<\/article>/)
    if (m) body = m[0]
    else {
      const m2 = raw.match(/<main[\s\S]*?<\/main>/)
      if (m2) body = m2[0]
    }
    const txt = strip(body)
    console.log('##### ' + f + ' [' + txt.length + ' chars]')
    console.log(txt.slice(0, 9000))
    console.log('---END---')
  } catch (e) {
    console.log('##### ' + f + ' ERR ' + e.message)
  }
}
