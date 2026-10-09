/** Explicit Windows voice fallback for public literary segments. Does not edit source text or call the rejected provider again. */
import { existsSync, readFileSync, writeFileSync, mkdirSync, renameSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { loadConfig } from '../src/config.ts'
import { chunkText } from '../src/modules/tts/client.ts'
import { cacheKey } from '../src/modules/tts/cache.ts'
import { DEFAULT_SPEED } from '../src/modules/tts/voices.ts'
import { chapterSpeakText, speakVoiceId } from '../src/modules/tts/chapterText.ts'
import { parseMp3 } from '../src/modules/tts/mp3duration.ts'

const arg = (name) => process.argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3)
if (process.platform !== 'win32' || !process.argv.includes('--allow-system-voice')) throw new Error('Requires Windows and explicit --allow-system-voice; stop other manifest writers before running')
const ffmpeg = arg('ffmpeg')
if (!ffmpeg || !existsSync(ffmpeg)) throw new Error('Provide --ffmpeg=<verified local executable>')
dotenv.config()
const config = loadConfig()
const db = new PrismaClient({ datasources: { db: { url: config.TAO_DATABASE_URL } } })
const media = config.TAO_MEDIA_DIR || join(process.cwd(), 'media')
const manifestPath = join(media, '.tts-public-state.json')
const state = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : {}
const jobs = new Map()
try {
  for (const book of await db.book.findMany({ where: { lang: 'zh' }, select: { id: true } })) {
    const chapters = await db.chapter.findMany({ where: { bookId: book.id }, include: { blocks: { orderBy: { order: 'asc' } } } })
    for (const ch of chapters) for (const text of chunkText(chapterSpeakText(ch.blocks))) {
      const key = cacheKey(text, speakVoiceId('zh'), DEFAULT_SPEED, 'mp3', 'zh', '__public__', config.TTS_MODEL || 'stepaudio-3-gen-preview')
      const path = join(media, 'tts-public', `${key}.mp3`)
      if (state[key]?.durationMs > 0 && (state[key].uploaded || existsSync(path))) continue
      jobs.set(key, { key, text })
    }
  }
} finally { await db.$disconnect() }
if (jobs.size === 0) { console.log('No public Chinese segments missing'); process.exit(0) }
const tmp = resolve(process.cwd(), '.tao-tmp', `system-tts-${Date.now()}`)
mkdirSync(tmp, { recursive: true })
const jobsPath = join(tmp, 'jobs.json')
writeFileSync(jobsPath, JSON.stringify([...jobs.values()]), 'utf8')
const psPath = join(tmp, 'synthesize.ps1')
writeFileSync(psPath, `param([string]$Jobs,[string]$OutputDirectory)
$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.Speech
$speaker=New-Object System.Speech.Synthesis.SpeechSynthesizer
try {
  $speaker.SelectVoice('Microsoft Huihui Desktop')
  $speaker.Rate=-1
  foreach($job in (Get-Content -LiteralPath $Jobs -Raw -Encoding UTF8 | ConvertFrom-Json)) {
    $speaker.SetOutputToWaveFile((Join-Path $OutputDirectory ($job.key+'.wav')))
    $speaker.Speak([string]$job.text)
    $speaker.SetOutputToNull()
  }
} finally { $speaker.Dispose() }
`, 'utf8')
const spoken = spawnSync('powershell.exe', ['-NoProfile', '-File', psPath, '-Jobs', jobsPath, '-OutputDirectory', tmp], { encoding: 'utf8', timeout: 600_000, windowsHide: true })
if (spoken.status !== 0) throw new Error(`System voice synthesis failed (${spoken.status})`)
mkdirSync(join(media, 'tts-public'), { recursive: true })
for (const { key } of jobs.values()) {
  const mp3 = join(media, 'tts-public', `${key}.mp3`)
  const encoded = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-i', join(tmp, `${key}.wav`), '-codec:a', 'libmp3lame', '-b:a', '96k', '-metadata', 'comment=Automated Chinese narration: Microsoft Huihui Desktop / Windows System.Speech', mp3], { windowsHide: true, timeout: 120_000 })
  if (encoded.status !== 0) throw new Error(`MP3 encoding failed: ${key}`)
  const bytes = readFileSync(mp3)
  const parsed = parseMp3(bytes)
  if (!parsed?.durationMs || bytes.length < 1000) throw new Error(`Invalid narration: ${key}`)
  state[key] = { durationMs: parsed.durationMs, bytes: bytes.length, uploaded: false, provider: 'windows-system-speech', actualVoice: 'Microsoft Huihui Desktop', fallback: true }
  console.log(`System narration ready ${key.slice(0, 8)} ${Math.round(parsed.durationMs)}ms`)
}
const staging = `${manifestPath}.system-${Date.now()}.tmp`
writeFileSync(staging, JSON.stringify(state))
renameSync(staging, manifestPath)
console.log(`Completed ${jobs.size} public Chinese fallback segments; run pregen-tts.mjs --lang=zh --retry-upload next`)
