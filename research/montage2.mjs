import sharp from "sharp";
import fs from "fs";
const groups = {};
for (const f of fs.readdirSync("shots").filter(f => /\.(jpg|png)$/i.test(f))) {
  const key = f.replace(/_\d+\.(jpg|png)$/i, "");
  (groups[key] ||= []).push("shots/" + f);
}
const PORTRAIT_W = 460, LANDSCAPE_H = 500, PAD = 10;
fs.mkdirSync("montages2", { recursive: true });
for (const [key, files] of Object.entries(groups)) {
  const thumbs = [];
  for (const f of files) {
    const img = sharp(f).rotate();
    const m = await img.metadata();
    let buf;
    if (m.width >= m.height) buf = await img.resize({ height: LANDSCAPE_H, withoutEnlargement: true }).toBuffer();
    else buf = await img.resize({ width: PORTRAIT_W, withoutEnlargement: true }).toBuffer();
    thumbs.push(buf);
  }
  const sizes = await Promise.all(thumbs.map(t => sharp(t).metadata()));
  const cols = 2;
  const cellW = Math.max(...sizes.map(s => s.width)) + PAD;
  const cellH = Math.max(...sizes.map(s => s.height)) + PAD;
  const rows = Math.ceil(thumbs.length / cols);
  const W = cellW * cols + PAD, H = cellH * rows + PAD;
  const comps = thumbs.map((t, i) => ({
    input: t,
    left: PAD + (i % cols) * cellW + Math.floor((cellW - sizes[i].width) / 2),
    top: PAD + Math.floor(i / cols) * cellH + Math.floor((cellH - sizes[i].height) / 2),
  }));
  await sharp({ create: { width: W, height: H, channels: 3, background: { r: 230, g: 230, b: 238 } } })
    .composite(comps).jpeg({ quality: 88 }).toFile(`montages2/${key}.jpg`);
  console.log(key, files.length, "->", W + "x" + H, Math.round(fs.statSync(`montages2/${key}.jpg`).size/1024) + "KB");
}
