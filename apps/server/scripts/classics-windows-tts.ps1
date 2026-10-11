param(
  [Parameter(Mandatory=$true)][string]$InputJson,
  [Parameter(Mandatory=$true)][string]$OutputDir,
  [Parameter(Mandatory=$true)][string]$Ffmpeg
)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Speech
$outputPath = [IO.Path]::GetFullPath($OutputDir)
New-Item -ItemType Directory -Force -Path $outputPath | Out-Null
$speaker = New-Object System.Speech.Synthesis.SpeechSynthesizer
$speaker.SelectVoice('Microsoft Huihui Desktop')
$sha = [Security.Cryptography.SHA256]::Create()
# SAPI Mandarin phones are whole pinyin syllables followed by tones, not
# English consonant/vowel phones. Keep Unicode construction ASCII-safe for
# Windows PowerShell 5.1, which otherwise treats a BOM-less script as ANSI.
# Reference: https://learn.microsoft.com/en-us/previous-versions/windows/desktop/ee125160(v=vs.85)
function U([int[]]$points) { return -join ($points | ForEach-Object { [char]$_ }) }
$pronunciations = @(
  @{text=(U @(0x54DE)); phones='mou 1'},
  @{text=(U @(0x4D19,0x4D18)); phones='pi 4 ti 1'},
  @{text=(U @(0x6753,0x9E6C)); phones='biao 1 yu 4'},
  @{text=(U @(0x55E8,0x2D,0x55BD)); phones='hai 1 lou 5'},
  @{text=(U @(0x8D6B,0x2D,0x55BD)); phones='he 4 lou 5'},
  @{text=(U @(0x4F9D,0x2D,0x914D)); phones='yi 1 pei 4'},
  @{text=(U @(0x914D,0x2D,0x914D)); phones='pei 4 pei 4'},
  @{text=(U @(0x5361,0x2D,0x514B)); phones='ka 3 ke 4'},
  @{text=(U @(0x82CD,0x9E70)); phones='cang 1 ying 1'},
  @{text=(U @(0x96D5,0x9E2E)); phones='diao 1 xiao 1'},
  @{text=(U @(0x731E,0x7301)); phones='she 1 li 4'},
  @{text=(U @(0x51EF,0x5E03,0x8BB7)); phones='kai 3 bu 4 ne 4'},
  @{text=(U @(0x98CE,0x4F0A,0x52D2)); phones='feng 1 yi 1 le 4'},
  @{text=(U @(0x6307,0x8D23)); phones='zhi 3 ze 2'},
  @{text=(U @(0x5F53,0x699B,0x9E21)); phones='dang 1 zhen 1 ji 1'},
  @{text=(U @(0x5965,0x52D2)); phones='ao 4 le 4'},
  @{text=(U @(0x96EA)); phones='xue 3'},
  @{text=(U @(0x7167)); phones='zhao 4'}
)
try {
  $jobs = Get-Content -LiteralPath $InputJson -Raw -Encoding UTF8 | ConvertFrom-Json
  foreach ($job in $jobs) {
    if ($job.key -notmatch '^[a-f0-9]{64}$' -or [string]::IsNullOrWhiteSpace($job.text)) { throw 'Invalid narration job' }
    $wav = Join-Path $outputPath ($job.key + '.wav')
    $mp3 = Join-Path $outputPath ($job.key + '.mp3')
    $speaker.SetOutputToWaveFile($wav)
    $escaped = [Security.SecurityElement]::Escape($job.text)
    $used = @()
    foreach ($entry in $pronunciations) {
      $original = [Security.SecurityElement]::Escape($entry.text)
      if ($escaped.Contains($original)) {
        $escaped = $escaped.Replace($original, ('<phoneme alphabet="sapi" ph="' + $entry.phones + '">' + $original + '</phoneme>'))
        $used += $entry
      }
    }
    $rate = [Math]::Round((([double]$job.speed) - 1) * 100)
    $ssml = '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="zh-CN"><prosody rate="' + $rate + '%">' + $escaped + '</prosody></speak>'
    $speaker.SpeakSsml($ssml)
    $speaker.SetOutputToNull()
    & $Ffmpeg -hide_banner -loglevel error -xerror -y -i $wav -codec:a libmp3lame -b:a 128k $mp3
    if ($LASTEXITCODE -ne 0) { throw 'Audio encoding failed' }
    $textHash = [BitConverter]::ToString($sha.ComputeHash([Text.Encoding]::UTF8.GetBytes($job.text))).Replace('-', '').ToLowerInvariant()
    $ssmlHash = [BitConverter]::ToString($sha.ComputeHash([Text.Encoding]::UTF8.GetBytes($ssml))).Replace('-', '').ToLowerInvariant()
    $receipt = @{key=$job.key; textSha256=$textHash; provider='windows-sapi'; model='Microsoft Huihui Desktop'; platformVersion=[Environment]::OSVersion.Version.ToString(); speed=[double]$job.speed; bytes=(Get-Item -LiteralPath $mp3).Length; ssmlSha256=$ssmlHash; pronunciationOverrides=$used}
    $receipt | ConvertTo-Json | Set-Content -LiteralPath (Join-Path $outputPath ($job.key + '.json')) -Encoding UTF8
    Write-Output ('Narration generated: ' + $job.key)
  }
} finally {
  $speaker.Dispose()
  $sha.Dispose()
}
