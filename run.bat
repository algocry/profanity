@echo off
echo Profanity v0.1
echo Author: 0x0is1
if exist node_modules\ (
  echo npm packages found! 
) else (
  echo npm packages not found. Installing...
  npm install
)
echo 1. Get one result
echo 2. Get all results
echo 3. Get Question Paper
echo 4. End test
echo 5. Get answer - question navigation allowed
echo 6. Get answer - question navigation not allowed

set /p input=Select action: 
if %input%==1 (
    npm run result
    pause
) 
if %input%==2 (
    npm run export
    pause
) 
if %input%==3 (
    npm run question
    pause
)
if %input%==4 (
    npm run end
    pause
)
if %input%==5 (
    npm run answer
    pause
)
if %input%==6 (
    npm run answern
    pause
) else (
    echo Wrong option selected
    pause
)
pause