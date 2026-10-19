/** Original vector course artwork. Writes files and provenance; never approves or publishes a course. */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { parseArgs } from 'node:util'
import sharp from 'sharp'

const { values } = parseArgs({ options: { out: { type: 'string' } } })
if (!values.out) throw Error('An explicit --out directory is required')
const out = path.resolve(values.out)
const version = 'taoread-phonics-gb-v1'
const dest = path.join(out, 'phonics', version)
const sourceDir = path.join(out, 'sources')
await mkdir(dest, { recursive: true })
await mkdir(sourceDir, { recursive: true })
const assets = JSON.parse(await readFile(new URL('../../apps/server/src/modules/phonics/courses/taoread-phonics-gb-v1/assets.json', import.meta.url), 'utf8'))
const ink = '#44372f', skin = '#db9d73', teal = '#47968c', gold = '#efba4b', red = '#d97660'
const stroke = `stroke="${ink}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`
const p = (d, fill = 'none', extra = '') => `<path d="${d}" fill="${fill}" ${stroke.replace(/([\w-]+)="[^"]*"/g, (full, key) => new RegExp(`\\b${key}=`).test(extra) ? '' : full)} ${extra}/>`
const ellipse = (cx, cy, rx, ry, fill, extra = '') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" ${extra}/>`
const rect = (x, y, w, h, fill, radius = 18) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" ${stroke}/>`
const circle = (x, y, r, fill) => ellipse(x, y, r, r, fill, stroke)
const shadow = (x = 384, y = 635, w = 245) => ellipse(x, y, w, 25, '#e8dfce')
const head = (x = 384, y = 230, scale = 1, sleepy = false) => `<g transform="translate(${x} ${y}) scale(${scale})">${ellipse(-75, 0, 15, 22, skin)}${ellipse(75, 0, 15, 22, skin)}${circle(0, 0, 77, skin)}${p('M-72-20 Q-85-105-12-93 Q70-105 77-25 Q23-42-2-63 Q-28-20-72-20', ink)}${sleepy ? p('M-35 10 Q-23 18-12 10 M15 10 Q27 18 38 10') : `${ellipse(-25, 8, 5, 7, ink)}${ellipse(27, 8, 5, 7, ink)}`}${p('M-15 40 Q2 52 22 37')}${ellipse(-48, 29, 12, 6, '#d8856c')}${ellipse(49, 29, 12, 6, '#d8856c')}</g>`
function seated({ x = 384, y = 205, scale = 1, cup = false, sleeping = false } = {}) {
  return `<g transform="translate(${x} ${y}) scale(${scale})">${p('M-62 246 L-95 347 L-31 351 L7 278 M58 244 L90 347 L30 351 L-6 278', teal)}${rect(-112, 339, 91, 29, ink, 12)}${rect(23, 339, 91, 29, ink, 12)}${p('M-62 97 Q0 74 61 97 L76 246 Q0 275-77 246 Z', gold)}${head(0, 0, 1, sleeping)}${cup ? `${p('M-61 114 Q-100 151-81 177 L-17 128', skin)}${p('M61 114 Q92 135 59 163 L8 131', skin)}${rect(-19, 73, 63, 68, '#f4ede2', 9)}${p('M43 88 Q85 78 73 115 Q64 127 43 119')}` : `${p('M-62 114 Q-105 179-60 211 L-23 224', skin)}${p('M61 114 Q100 178 62 210 L27 225', skin)}`}</g>`
}
const bench = () => `${rect(183, 450, 400, 40, red, 13)}${rect(214, 490, 29, 131, '#b8784b', 8)}${rect(524, 490, 29, 131, '#b8784b', 8)}${rect(198, 327, 369, 73, red, 13)}${p('M219 400 L219 450 M544 400 L544 450')}`
const ball = (x, y, r = 53) => `${circle(x, y, r, red)}${p(`M${x - r * .7} ${y + r * .7} Q${x} ${y - r * .25} ${x + r * .7} ${y - r * .7}`, 'none', 'stroke="#f9e8ce" stroke-width="10"')}`
const leaf = (x, y, rotate = 0) => `<g transform="translate(${x} ${y}) rotate(${rotate})">${p('M0 0 Q-35-45-1-70 Q36-43 0 0', teal)}${p('M0-10 L0-51', 'none', 'stroke="#e4f0d8" stroke-width="3"')}</g>`
const table = () => `${rect(176, 495, 422, 36, '#c39669', 13)}${rect(204, 531, 30, 105, '#c39669', 7)}${rect(540, 531, 30, 105, '#c39669', 7)}`
const sparkle = (x, y) => p(`M${x - 15} ${y} L${x + 15} ${y} M${x} ${y - 15} L${x} ${y + 15}`, 'none', 'stroke="#d1aa51" stroke-width="5"')
const scenes = {
  at: () => `${shadow()}${bench()}${seated({ x: 310, y: 237, scale: .88 })}${p('M177 639 Q310 686 456 635', 'none', 'stroke="#daaa47" stroke-width="10"')}`,
  sat: () => `${shadow()}${bench()}${seated({ y: 214 })}`,
  sit: () => `${shadow()}${bench()}${seated({ y: 214 })}`,
  tap: () => `${shadow()}${rect(261, 438, 237, 160, teal, 26)}${ellipse(379, 442, 120, 38, '#f7e3ba', stroke)}${p('M330 247 L389 247 Q404 251 400 270 L381 337 L417 365 Q439 385 424 399 Q410 409 397 394 L379 377 L369 426 Q365 451 346 449 Q329 446 332 425 L337 363 L311 332 Q296 313 306 290 Z', skin)}${p('M366 462 L389 482 M323 460 L313 484 M433 461 L450 480', 'none', 'stroke="#d1aa51" stroke-width="8"')}`,
  pat: () => `${shadow()}${p('M210 538 Q200 426 293 430 L466 433 Q544 449 541 540 L510 601 L474 600 L477 548 L304 548 L291 600 L255 600 L250 540 Z', '#c6a177')}${p('M210 463 Q145 461 159 399 Q180 383 213 413', '#c6a177')}${circle(500, 424, 73, '#c6a177')}${p('M454 377 Q432 327 478 342 L495 376 M531 377 Q559 334 575 367 L565 416', '#967459')}${ellipse(518, 429, 6, 7, ink)}${ellipse(550, 450, 11, 8, ink)}${p('M516 468 Q531 479 542 468')}${p('M246 247 Q269 220 287 243 L335 309 L403 326 Q433 333 425 351 Q421 368 392 363 L320 356 Q292 351 279 324 Z', skin)}${p('M294 394 L309 382 M356 394 L357 378 M408 397 L420 384', 'none', 'stroke="#d1aa51" stroke-width="7"')}`,
  it: () => `${shadow()}${ball(455, 510, 96)}${p('M177 310 Q152 278 173 262 Q193 251 217 278 L278 337 L366 368 Q396 380 385 399 Q377 411 347 405 L261 385 Q229 378 214 350 Z', skin)}${sparkle(568, 389)}`,
  sip: () => `${shadow()}${bench()}${seated({ y: 233, cup: true })}`,
  tip: () => `${shadow()}<g transform="rotate(-35 384 384)">${rect(335, 247, 98, 350, gold, 8)}${p('M335 247 L384 127 L433 247 Z', '#e6c89c')}${p('M369 163 L384 127 L399 163 Z', ink)}${p('M366 259 L366 580 M403 259 L403 580', 'none', 'stroke="#f8dd89" stroke-width="6"')}</g>${p('M189 211 Q247 173 298 208 M277 186 L300 209 L268 217', 'none', 'stroke="#d97660" stroke-width="10"')}`,
  in: () => `${shadow()}${rect(204, 400, 360, 208, '#c79563', 32)}${ellipse(384, 414, 179, 70, '#9b7052', stroke)}${ball(384, 408, 83)}${p('M205 430 Q384 523 563 430 L555 577 Q382 642 214 577 Z', '#d5aa79')}${p('M222 500 Q384 567 548 500 M218 543 Q384 610 551 543', 'none', 'stroke="#a97a53" stroke-width="4"')}`,
  pin: () => `${shadow()}<g transform="rotate(-28 384 384)">${p('M273 267 L273 517 Q272 585 340 586 Q400 586 400 521 L400 302', 'none', 'stroke="#57757c" stroke-width="29"')}${p('M273 267 Q337 224 400 267 L400 337 L354 337 L354 297 L273 297 Z', '#a5c6c7')}${circle(336, 522, 25, '#a5c6c7')}${p('M273 320 L273 476', 'none', 'stroke="#daeae6" stroke-width="8"')}</g>${sparkle(510, 267)}`,
  nap: () => `${shadow()}${ellipse(387, 536, 208, 96, '#a6b4ca', stroke)}<g transform="translate(385 301) rotate(-14)">${p('M-98 113 Q0 80 99 119 L115 257 Q0 291-112 255 Z', teal)}${head(0, 0, 1, true)}${p('M-88 136 Q-43 184 52 172 M87 132 Q51 190-45 179', skin)}</g>${p('M548 244 Q605 263 579 315 Q630 285 616 240 Q605 207 572 205', '#e8c264')}`,
  pan: () => `${shadow()}${table()}${p('M244 384 Q244 490 374 492 Q511 490 511 384 Z', '#7f9c9a')}${ellipse(377, 386, 136, 44, '#4c6669', stroke)}${ellipse(377, 382, 104, 24, '#c5d5cd')}${p('M506 400 L638 365 Q665 361 669 383 Q671 398 647 407 L521 436 Z', '#c7935c')}`,
  map: () => `${shadow()}${p('M159 250 L309 213 L463 250 L611 213 L611 553 L463 590 L309 553 L159 590 Z', '#f6e4b5')}${p('M309 215 L309 550 M463 252 L463 586', 'none', 'stroke="#bfad87" stroke-width="4"')}${p('M185 491 Q239 392 314 460 T469 356 T584 289', 'none', 'stroke="#b6805f" stroke-width="9" stroke-dasharray="14 17"')}${p('M350 284 Q416 267 430 315 Q444 366 393 376 Q329 381 334 334 Z', '#98c9d3')}${leaf(232, 350, -15)}${leaf(517, 524, 25)}${circle(575, 290, 15, red)}`,
  mat: () => `${shadow()}${p('M223 342 L546 342 L629 563 L141 563 Z', teal)}${p('M246 373 L525 373 L580 529 L190 529 Z', '#9fc4ad')}${p('M257 392 L513 392 M235 436 L531 436 M215 481 L549 481', 'none', 'stroke="#498e81" stroke-width="9"')}${p('M143 573 L131 599 M172 573 L161 599 M202 573 L193 599 M232 573 L225 599 M261 573 L257 599 M291 573 L289 599 M321 573 L320 599 M350 573 L350 599 M380 573 L380 599 M410 573 L411 599 M440 573 L442 599 M470 573 L473 599 M500 573 L505 599 M530 573 L537 599 M560 573 L569 599 M590 573 L601 599 M620 573 L633 599', 'none', 'stroke="#d7b773" stroke-width="7"')}`,
  man: () => `${shadow()}${p('M263 598 L285 377 L480 377 L506 598 Z', teal)}${p('M285 402 L230 540 Q225 562 245 571 L302 455 M480 402 L532 532 Q544 558 523 569 L466 455', skin)}${head(384, 251, 1.3)}${p('M319 290 Q333 353 383 359 Q437 352 451 290 Q414 311 385 317 Q351 315 319 290', '#564437')}${p('M366 303 Q385 311 404 301', 'none', 'stroke="#f2dcc1" stroke-width="4"')}`,
  'sam-in-box': () => `${shadow()}${p('M173 457 L384 384 L591 457 L591 622 L173 622 Z', '#d8af7e')}${p('M305 416 Q384 387 459 416 L467 516 L301 516 Z', gold)}${p('M312 494 Q249 468 252 512 Q264 548 350 539 M454 494 Q516 468 515 512 Q502 548 418 539', teal)}${head(384, 327, .82)}${p('M310 431 Q280 466 323 482 M455 431 Q488 468 442 482', skin)}${p('M173 465 L384 523 L591 465 L591 622 L384 676 L173 622 Z', '#d6a06b')}${p('M384 523 L384 676 M173 465 L130 496 L338 555 L384 523 M591 465 L636 496 L429 555 L384 523', '#e6bf8e')}`,
}
const readerScenes = {
  'r-l02-image-1': 'at', 'r-l02-image-2': 'sat',
  'r-l03-image-1': 'tap', 'r-l03-image-2': 'pat',
  'r-l04-image-1': 'sat', 'r-l04-image-2': 'tap', 'r-l04-image-3': 'pat',
  'r-l05-image-1': 'it', 'r-l05-image-2': 'sit', 'r-l05-image-3': 'sip',
  'r-l06-image-1': 'in', 'r-l06-image-2': 'pin', 'r-l06-image-3': 'nap', 'r-l06-image-4': 'pan',
  'r-l07-image-1': 'sat', 'r-l08-image-1': 'sam-in-box', 'r-l08-image-2': 'sam-in-box',
}
const receipts = []
for (const asset of assets.filter(a => a.purpose === 'image')) {
  const scene = readerScenes[asset.id] ?? asset.id.replace(/^w-/, '').replace(/-meaning-image$/, '')
  if (!Object.hasOwn(scenes, scene)) throw Error(`No illustration for ${asset.id}`)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="768" height="768" viewBox="0 0 768 768"><rect width="768" height="768" rx="44" fill="#fff8e9"/>${ellipse(383, 389, 301, 285, '#f3ecd9')}${scenes[scene]()}</svg>`
  const bytes = await sharp(Buffer.from(svg)).webp({ quality: 91 }).toBuffer()
  const hash = createHash('sha256').update(bytes).digest('hex')
  await writeFile(path.join(dest, `${hash}.webp`), bytes)
  await writeFile(path.join(sourceDir, `${scene}.svg`), svg + '\n')
  receipts.push({ id: asset.id, scene, purpose: 'image', sha256: hash, extension: 'webp', width: 768, height: 768, bytes: bytes.length, source: `sources/${scene}.svg`, sourceLicense: 'Original TaoRead vector artwork; no third-party source artwork or fonts', reviewStatus: 'pending', fixture: false })
}
await writeFile(path.join(out, 'illustrations.json'), JSON.stringify({ complete: true, versionId: version, assets: receipts }, null, 2) + '\n')
const unique = [...new Map(receipts.map(a => [a.scene, a])).values()]
const thumbs = await Promise.all(unique.map(async (a, i) => ({ input: await sharp(path.join(dest, a.sha256 + '.webp')).resize(256, 256).png().toBuffer(), left: (i % 4) * 256, top: Math.floor(i / 4) * 256 })))
await sharp({ create: { width: 1024, height: Math.ceil(unique.length / 4) * 256, channels: 3, background: '#fff8e9' } }).composite(thumbs).png().toFile(path.join(out, 'contact-sheet.png'))
console.log(JSON.stringify({ complete: true, references: receipts.length, scenes: unique.length, uniqueImages: new Set(receipts.map(r => r.sha256)).size, out }))
