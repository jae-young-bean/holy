@echo off
setlocal enabledelayedexpansion

:: 현재 날짜와 시간으로 커밋 메시지 생성
for /f "tokens=1-4 delims=/ " %%a in ("%date% %time%") do set msg=Auto-commit %%a-%%b-%%c_%%d

git add .
git commit -m "!msg!"
git push

pause 