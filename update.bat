@echo off
WHERE git
if %ERRORLEVEL% NEQ 0 (
    ECHO Git not found
) else (
    echo Git found
    git pull
    echo Updated successfully
)
pause