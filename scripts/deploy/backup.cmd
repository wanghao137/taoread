@echo off
cd /d D:\taoread-prod\apps\server
node --import tsx scripts/backup-to-r2.mjs --archive-only >> D:\taoread-prod\logs\backup.log 2>&1
if errorlevel 1 exit /b 1
powershell.exe -NoProfile -ExecutionPolicy Bypass -File D:\taoread-prod\bin\backup-consistent.ps1 >> D:\taoread-prod\logs\backup.log 2>&1
