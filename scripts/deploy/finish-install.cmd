@echo off
REM 桃阅读部署收尾（第二轮）：服务参数 + 启动 + 备份计划 + Tunnel 重启
set MARK=D:\taoread-prod\bin\install-done.txt
if exist "%MARK%" del "%MARK%"
set NSSM=D:\taoread-prod\bin\nssm.exe
set ERR=0

echo [1/4] 设置 taoread-api 服务参数并启动...
%NSSM% set taoread-api AppDirectory D:\taoread-prod\apps\server
%NSSM% set taoread-api AppStdout D:\taoread-prod\logs\service-out.log
%NSSM% set taoread-api AppStderr D:\taoread-prod\logs\service-err.log
%NSSM% set taoread-api AppRotateFiles 1
%NSSM% set taoread-api AppRotateOnline 1
%NSSM% set taoread-api AppRotateBytes 10485760
%NSSM% set taoread-api Start SERVICE_AUTO_START
%NSSM% start taoread-api
if errorlevel 1 set ERR=1

echo [2/4] 创建每日 03:30 备份计划...
schtasks /Create /F /SC DAILY /ST 03:30 /TN "taoread-backup" /TR "D:\taoread-prod\bin\backup.cmd"
if errorlevel 1 set ERR=1

echo [3/4] 重启 cloudflared（应用 read.taostudioai.com 配置）...
sc stop cloudflared
timeout /t 6 /nobreak >nul
sc start cloudflared
if errorlevel 1 set ERR=1

echo [4/4] 重启 taoread-api...
%NSSM% restart taoread-api
if errorlevel 1 set ERR=1

if "%ERR%"=="0" (echo ALL-OK> "%MARK%") else (echo FAILED> "%MARK%")
exit
