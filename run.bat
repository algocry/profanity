@echo off
echo Profanity v0.1
echo Author: 0x0is1
if exist node_modules\ (
  echo npm packages found! 
) else (
  echo npm packages not found. Installing...
  npm install
)
echo 1. Get all result
echo 2. Get one results
echo 3. Get Question Paper
echo 4. End test
echo 5. Get answer - question navigation allowed
echo 6. Get answer - question navigation not allowed

set /p input=Select action: 
node App.js %input%
pause