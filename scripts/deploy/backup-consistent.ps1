$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath 'D:\taoread-prod\apps\server'
$backupMutex = [System.Threading.Mutex]::new($false, 'Global\TaoReadConsistentBackupV1')
$lockTaken = $false
$wasRunning = $false
$previousCoordinator = $env:TAO_BACKUP_COORDINATED
try {
  try { $lockTaken = $backupMutex.WaitOne(0) } catch [System.Threading.AbandonedMutexException] { $lockTaken = $true }
  if (-not $lockTaken) { throw 'Another backup or release is running' }
  $wasRunning = (Get-Service taoread-api).Status -eq 'Running'
  if ($wasRunning) {
    & 'D:\taoread-prod\bin\nssm.exe' stop taoread-api
    if ($LASTEXITCODE -ne 0) { throw 'Could not stop API for consistent backup' }
  }
  (Get-Service taoread-api).WaitForStatus('Stopped', [TimeSpan]::FromSeconds(30))
  $env:TAO_BACKUP_COORDINATED = '1'
  & node --import tsx scripts/backup-to-r2.mjs --quiescent
  if ($LASTEXITCODE -ne 0) { throw 'Consistent backup failed' }
} finally {
  try {
    if ($lockTaken -and $wasRunning) {
      & 'D:\taoread-prod\bin\nssm.exe' start taoread-api
      if ($LASTEXITCODE -ne 0) { throw 'API restart failed after backup' }
    }
  } finally {
    $env:TAO_BACKUP_COORDINATED = $previousCoordinator
    if ($lockTaken) { $backupMutex.ReleaseMutex() }
    $backupMutex.Dispose()
  }
}
