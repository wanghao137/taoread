import sharp from "sharp";
import fs from "fs";
const groups = {};
for (const f of fs.readdirSync("shots").filter(f => /\.(jpg|png)$/i.test(f))) {
  const key = f.replace(/_\d+\.(jpg|png)$/i, "");
  (groups[key] ||= []).push("shots/" + f);
}
const THUMB_W = 360, PAD = 8, BG = { r: 235, g: 235, b: 240 };
fs.mkdirSync("montages", { recursive: true });
for (const [key, files] of Object.entries(groups)) {
  const thumbs = [];
  for (const f of files) {
    const img = sharp(f).rotate();
    const meta = await img.metadata();
    const w = meta.width > meta.height ? THUMB_W : Math.round(THUMB_W * meta.width / meta.height * (meta.width>meta.height?1:1));
    const tw = meta.width >= meta.height ? THUMB_W : Math.round(THUMB_W * 0.52); // portrait narrow
    thumbs.push(await sharp(f).rotate().resize({ width: meta.width >= meta.height ? THUMB_W*2 : Math.round(THUMB_W*0.55), withoutEnlargement: true }).toBuffer());
  }
  // layout: rows of 3
  const cols = 3;
  const rows = Math.ceil(thumbs.length / cols);
  const metas = thumbs.map(t => sharp(t).metadata());
  const sizes = await Promise.all(metas);
  const cellW = Math.max(...sizes.map(s => s.width)) + PAD;
  const cellH = Math.max(...sizes.map(s => s.height)) + PAD;
  const W = cellW * cols + PAD, H = cellH * rows + PAD;
  const comps = thumbs.map((t, i) => ({
    input: t,
    left: PAD + (i % cols) * cellW + Math.floor((cellW - sizes[i].width) / 2),
    top: PAD + Math.floor(i / cols) * cellH + Math.floor((cellH - sizes[i].height) / 2),
  }));
  await sharp({ create: { width: W, height: H, channels: 3, background: BG } })
    .composite(comps).jpeg({ quality: 82 }).toFile(`montages/${key}.jpg`);
  console.log(key, files.length, "->", W + "x" + H);
}
