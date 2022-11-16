@echo off
WHERE git
if %ERRORLEVEL% NEQ 0 (
    echo Git not found! Installing...
    winget install -e --id Git.Git
) else (
    echo Git found
    git pull
    echo Updated successfully
)
pause
