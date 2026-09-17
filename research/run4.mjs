import { execSync } from 'child_process';
import fs from 'fs';
const DIR = 'D:\\codesolo\\taoread\\research';
const qs = process.argv.slice(2);
for (const q of qs) {
  try {
    execSync(`node sosearch.mjs "${q}"`, { cwd: DIR, timeout: 120000, stdio: 'inherit' });
  } catch (e) { console.log('FAIL', q, (e.message || '').split('\n')[0]); }
}
// list the newest files
const files = fs.readdirSync(DIR).filter(f => f.startsWith('so_')).map(f => ({ f, t: fs.statSync(DIR + '\\' + f).mtimeMs })).sort((a, b) => b.t - a.t).slice(0, qs.length);
console.log('--- NEW ---');
for (const x of files) console.log(x.f);
