@echo off
rem TaoRead production finalize: service + cloudflared restart
rem Double-click -> auto elevates via UAC -> writes D:\taoread-prod\bin\finish-done.txt
net session >nul 2>&1
if %errorlevel% neq 0 goto ELEVATE
setlocal
set MARK=D:\taoread-prod\bin\finish-done.txt
set NSSM=D:\taoread-prod\bin\nssm.exe
if exist "%MARK%" del "%MARK%"
set ERR=0

echo [1/3] configure taoread-api service ...
"%NSSM%" set taoread-api AppDirectory D:\taoread-prod\apps\server
"%NSSM%" set taoread-api AppStdout D:\taoread-prod\logs\service-out.log
"%NSSM%" set taoread-api AppStderr D:\taoread-prod\logs\service-err.log
"%NSSM%" set taoread-api AppRotateFiles 1
"%NSSM%" set taoread-api AppRotateOnline 1
"%NSSM%" set taoread-api AppRotateBytes 10485760
"%NSSM%" set taoread-api Start SERVICE_AUTO_START

echo [2/3] stop watchdog, start service ...
wmic process where "CommandLine like '%%watchdog.cmd%%'" call terminate >nul 2>&1
wmic process where "CommandLine like '%%taoread-prod%%'" call terminate >nul 2>&1
del "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\taoread-watchdog.cmd" >nul 2>&1
"%NSSM%" restart taoread-api
if errorlevel 1 set ERR=1

echo [3/3] restart cloudflared for read.taostudioai.com ...
sc stop cloudflared
timeout /t 6 /nobreak >nul
sc start cloudflared
if errorlevel 1 set ERR=1

timeout /t 10 /nobreak >nul
sc query taoread-api | find "RUNNING" >nul && echo SERVICE-RUNNING>>"%MARK%" || echo SERVICE-NOT-RUNNING>>"%MARK%"
sc query cloudflared | find "RUNNING" >nul && echo CF-RUNNING>>"%MARK%" || echo CF-NOT-RUNNING>>"%MARK%"
curl -s -m 5 http://127.0.0.1:8091/api/health | find "ok" >nul && echo API-HEALTHY>>"%MARK%" || echo API-DOWN>>"%MARK%"
if "%ERR%"=="0" (echo ALL-OK>>"%MARK%") else (echo HAS-ERRORS>>"%MARK%")
exit

:ELEVATE
echo Requesting administrator rights (click YES on the UAC popup) ...
powershell -NoProfile -Command "Start-Process -FilePath '%~f0' -Verb RunAs"
exit
