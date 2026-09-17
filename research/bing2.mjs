import { execSync } from 'child_process';
import fs from 'fs';
const q = process.argv[2];
const n = parseInt(process.argv[3] || '10');
const url = 'https://www.bing.com/search?q=' + encodeURIComponent(q) + '&mkt=en-US&setlang=en-US&cc=US';
let body = '';
try {
  const out = execSync('curl -sL --max-time 30 -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36" -H "Accept-Language: en-US,en;q=0.9" ' + JSON.stringify(url), { maxBuffer: 20 * 1024 * 1024 });
  body = out.toString('utf8');
} catch (e) { console.log('ERR ' + e.message); process.exit(1); }
const items = [];
const re = /<h2[^>]*><a [^>]*href="(https?:[^"]+)"[^>]*>([\s\S]*?)<\/a><\/h2>/g;
let m;
while ((m = re.exec(body))) {
  const t = m[2].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim();
  if (t && t.length > 8 && !/dictionary|translate|wiki|百度百科|翻译|爱词霸|cambridge|merriam/i.test(m[1] + t)) items.push({ title: t, url: m[1] });
}
const seen = new Set(), out = [];
for (const it of items) { if (seen.has(it.url)) continue; seen.add(it.url); out.push(it); if (out.length >= n) break; }
console.log('[' + q + '] ' + out.length + ' items');
for (const it of out) console.log('- ' + it.title.slice(0, 85) + ' | ' + it.url.slice(0, 140));
const fn = 'b2_' + q.replace(/[^\w]+/g, '_').slice(0, 50) + '.json';
fs.writeFileSync(fn, JSON.stringify(out, null, 1));
console.log('saved ' + fn);
