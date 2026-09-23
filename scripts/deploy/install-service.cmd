@echo off
REM ============================================================
REM 桃阅读生产部署 · 一次性管理员脚本（2026-09-23）
REM 需要 UAC 提权：安装 API 服务 + 每日备份计划 + 应用 Tunnel 配置
REM 完成后写 D:\taoread-prod\bin\install-done.txt 供部署方确认
REM ============================================================
setlocal
set MARK=D:\taoread-prod\bin\install-done.txt
if exist "%MARK%" del "%MARK%"

echo [1/4] 安装 taoread-api 服务（NSSM，开机自启+崩溃自动拉起）...
D:\taoread-prod\bin\nssm.exe install taoread-api "C:\Program Files\nodejs\node.exe" "--import tsx src\index.ts" || goto :fail
D:\taoread-prod\bin\nssm.exe set taoread-api AppDirectory D:\taoread-prod\apps\server || goto :fail
D:\taoread-prod\bin\nssm.exe set taoread-api AppStdout D:\taoread-prod\logs\service-out.log || goto :fail
D:\taoread-prod\bin\nssm.exe set taoread-api AppStderr D:\taoread-prod\logs\service-err.log || goto :fail
D:\taoread-prod\bin\nssm.exe set taoread-api AppRotateFiles 1 || goto :fail
D:\taoread-prod\bin\nssm.exe set taoread-api AppRotateOnline 1 || goto :fail
D:\taoread-prod\bin\nssm.exe set taoread-api AppRotateBytes 10485760 || goto :fail
D:\taoread-prod\bin\nssm.exe set taoread-api Start SERVICE_AUTO_START || goto :fail

echo [2/4] 创建每日 03:30 备份计划任务...
schtasks /Create /F /SC DAILY /ST 03:30 /TN "taoread-backup" /TR "D:\taoread-prod\bin\backup.cmd" || goto :fail

echo [3/4] 应用 cloudflared 配置（新增 read.taostudioai.com，保留 cpa）...
copy /Y "C:\ProgramData\cloudflared\config-svc.yml" "C:\ProgramData\cloudflared\config-svc.backup-before-read.yml" || goto :fail
copy /Y "D:\taoread-prod\bin\config-svc.new.yml" "C:\ProgramData\cloudflared\config-svc.yml" || goto :fail
sc stop cloudflared || goto :fail
timeout /t 5 /nobreak >nul
sc start cloudflared || goto :fail

echo [4/4] 启动 taoread-api...
D:\taoread-prod\bin\nssm.exe restart taoread-api || goto :fail

echo ALL-OK > "%MARK%"
echo.
echo ==== 全部完成 ====
exit 0

:fail
echo FAILED > "%MARK%"
echo.
echo ==== 有步骤失败，请截图此窗口 ====
pause
exit 1
