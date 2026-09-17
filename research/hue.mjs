import sharp from 'sharp';
import fs from 'fs';
const DIR = 'D:\\codesolo\\taoread\\research\\';
const files = process.argv.slice(2).map(f => DIR + 'montages\\' + f);
// hue buckets: red orange yellow green cyan blue purple magenta + achromatic
const buckets = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple', 'magenta', 'gray'];
function hueOf(r, g, b) {
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  const d = mx - mn;
  if (d < 28) return 'gray';
  let h = 0;
  if (mx === r) h = ((g - b) / d) % 6;
  else if (mx === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  h *= 60; if (h < 0) h += 360;
  if (h < 15 || h >= 345) return 'red';
  if (h < 45) return 'orange';
  if (h < 70) return 'yellow';
  if (h < 165) return 'green';
  if (h < 200) return 'cyan';
  if (h < 255) return 'blue';
  if (h < 290) return 'purple';
  return 'magenta';
}
(async () => {
  for (const f of files) {
    if (!fs.existsSync(f)) { console.log('MISS', f); continue; }
    const data = await sharp(f).resize(160, 320, { fit: 'fill' }).removeAlpha().raw().toBuffer();
    const c = {}; let n = 0;
    for (let i = 0; i < data.length; i += 3) {
      const k = hueOf(data[i], data[i + 1], data[i + 2]);
      c[k] = (c[k] || 0) + 1; n++;
    }
    const warm = (c.red || 0) + (c.orange || 0) + (c.yellow || 0);
    const cool = (c.blue || 0) + (cyan => 0) && (c.cyan || 0) + (c.purple || 0);
    const out = buckets.map(b => `${b}:${(100 * (c[b] || 0) / n).toFixed(0)}%`).join(' ');
    console.log(f.split('\\').pop().padEnd(22), '| warm%', (100 * warm / n).toFixed(0), '| cool%', (100 * cool / n).toFixed(0), '|', out);
  }
})();

// WCAG contrast for TaoRead night palette
function lin(c) { const s = c / 255; return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4); }
function contrast(a, b) {
  const la = lin(a[0]) * 0.2126 + lin(a[1]) * 0.7152 + lin(a[2]) * 0.0722;
  const lb = lin(b[0]) * 0.2126 + lin(b[1]) * 0.7152 + lin(b[2]) * 0.0722;
  const hi = Math.max(la, lb), lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
}
const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
console.log('\n--- TaoRead WCAG contrast on night bg #0E1A38 ---');
const bg = hex('#0E1A38');
for (const [name, h] of [['bg #0E1A38', '#0E1A38'], ['panel #16264A', '#16264A'], ['peach #FFB3A0', '#FFB3A0'], ['moon #FFD97A', '#FFD97A'], ['white #FFFFFF', '#FFFFFF'], ['muted #8FA2C8', '#8FA2C8']]) {
  console.log(name.padEnd(16), 'vs bg:', contrast(hex(h), bg).toFixed(2));
}
