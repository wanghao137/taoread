@echo off
REM ============================================================
REM 桃阅读部署收尾（最终版，一次 UAC 授权完成全部）
REM 终态：NSSM 服务 taoread-api 是唯一守护（开机自启、崩溃自动重启）
REM       看门狗/启动项被移除，避免双进程抢 8091
REM ============================================================
set MARK=D:\taoread-prod\bin\install-done.txt
if exist "%MARK%" del "%MARK%"
set NSSM=D:\taoread-prod\bin\nssm.exe
set ERR=0

echo [1/4] 配置并启动 taoread-api 服务...
%NSSM% set taoread-api AppDirectory D:\taoread-prod\apps\server
%NSSM% set taoread-api AppStdout D:\taoread-prod\logs\service-out.log
%NSSM% set taoread-api AppStderr D:\taoread-prod\logs\service-err.log
%NSSM% set taoread-api AppRotateFiles 1
%NSSM% set taoread-api AppRotateOnline 1
%NSSM% set taoread-api AppRotateBytes 10485760
%NSSM% set taoread-api Start SERVICE_AUTO_START

echo [2/4] 停用用户级看门狗（服务接管，避免抢 8091）...
taskkill /F /IM cmd.exe /FI "WINDOWTITLE eq watchdog*" >nul 2>&1
wmic process where "CommandLine like '%%watchdog.cmd%%'" call terminate >nul 2>&1
del "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\taoread-watchdog.cmd" >nul 2>&1

echo [3/4] 重启 cloudflared 应用 read.taostudioai.com 配置...
sc stop cloudflared
timeout /t 6 /nobreak >nul
sc start cloudflared
if errorlevel 1 set ERR=1

echo [4/4] 启动 taoread-api...
%NSSM% restart taoread-api
if errorlevel 1 set ERR=1

echo [5/5] 刷新每日备份计划...
schtasks /Create /F /SC DAILY /ST 03:30 /TN "taoread-backup" /TR "D:\taoread-prod\bin\backup.cmd"
if errorlevel 1 set ERR=1

timeout /t 8 /nobreak >nul
sc query taoread-api | find "RUNNING" >nul && echo SERVICE-RUNNING >> "%MARK%" || echo SERVICE-NOT-RUNNING >> "%MARK%"
if "%ERR%"=="0" (echo ALL-OK>> "%MARK%") else (echo HAS-ERRORS>> "%MARK%")
exit
