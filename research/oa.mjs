import { execSync } from 'child_process';
import fs from 'fs';
const q = process.argv[2];
const n = parseInt(process.argv[3] || '6');
const url = 'https://api.openalex.org/works?search=' + encodeURIComponent(q) + '&per_page=' + n + '&mailto=research@taoread.example';
let body = '';
try {
  body = execSync('curl -sL --max-time 40 -A "Mozilla/5.0 (research-agent)" ' + JSON.stringify(url), { maxBuffer: 30 * 1024 * 1024 }).toString('utf8');
} catch (e) { console.log('ERR ' + e.message); process.exit(1); }
const d = JSON.parse(body);
console.log('[' + q + '] total=' + d.meta.count);
for (const w of d.results) {
  console.log('### ' + (w.title || '').slice(0, 120));
  console.log('    year=' + w.publication_year + ' | cited=' + w.cited_by_count + ' | venue=' + (w.primary_location && w.primary_location.source ? w.primary_location.source.display_name : '') + ' | doi=' + (w.doi || w.id));
  const abs = w.abstract_inverted_index;
  if (abs) {
    const words = [];
    for (const k of Object.keys(abs)) for (const pos of abs[k]) words[pos] = k;
    console.log('    ABS: ' + words.filter(Boolean).join(' ').slice(0, 420));
  }
  console.log('    URL: ' + w.id);
}
