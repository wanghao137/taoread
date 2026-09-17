import { execSync } from 'child_process';
const qs = process.argv.slice(2);
for (const q of qs) {
  try { execSync(`node sosearch.mjs "${q}"`, { timeout: 120000, stdio: 'inherit' }); }
  catch(e) { console.log("FAIL", q, e.message.split('\n')[0]); }
}
