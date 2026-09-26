REM ============================================================
REM [已废弃] 看门狗旧方案，仅留档不删除。
REM 实际部署走 finish-install.cmd（NSSM 服务方案，docs/30）。
REM ============================================================
@echo off
REM 桃阅读 API 看门狗：崩溃 5 秒自动拉起；日志追加到 service-out.log
cd /d D:\taoread-prod\apps\server
:loop
"C:\Program Files\nodejs\node.exe" --import tsx src\index.ts >> D:\taoread-prod\logs\service-out.log 2>&1
echo [%date% %time%] process exited, restarting in 5s >> D:\taoread-prod\logs\service-out.log
timeout /t 5 /nobreak >nul
goto loop
