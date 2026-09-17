import { execSync } from 'child_process';
import fs from 'fs';
const url = process.argv[2];
const out = process.argv[3] || ('f_' + Date.now() + '.txt');
try {
  const buf = execSync('curl -sL --max-time 40 --compressed -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36" -H "Accept-Language: zh-CN,zh;q=0.9,en;q=0.8" ' + JSON.stringify(url), { maxBuffer: 30 * 1024 * 1024 });
  let html = buf.toString('utf8');
  html = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<!--[\s\S]*?-->/g, ' ');
  let text = html.replace(/<[^>]+>/g, '\n');
  text = text.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#\d+;/g, ' ').replace(/&quot;/g, '"');
  text = text.split('\n').map(s => s.trim()).filter(Boolean).join('\n');
  fs.writeFileSync(out, text);
  console.log('OK ' + url + ' -> ' + out + ' (' + text.length + ' chars)');
} catch (e) { console.log('ERR ' + e.message); }
