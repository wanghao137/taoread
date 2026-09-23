@echo off
cd /d D:\taoread-prod\apps\server
node --import tsx scripts/backup-to-r2.mjs >> D:\taoread-prod\logs\backup.log 2>&1
