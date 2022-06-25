@ECHO OFF
CLS
ECHO === Witcher TRPG Table ===
ECHO --- Creation du serveur ---
ECHO 1.Run dev
ECHO 2.Run build
ECHO 3.Run build-prod
ECHO 4.Eslint
ECHO.

CHOICE /C 1234 /M "Enter your choice:"

:: Note - list ERRORLEVELS in decreasing order
IF ERRORLEVEL 4 GOTO fix
IF ERRORLEVEL 3 GOTO prod
IF ERRORLEVEL 2 GOTO build
IF ERRORLEVEL 1 GOTO dev

:dev
ECHO Run locally in development mode:
npm run dev

:build
ECHO Deploy to production:
npm run build
npm run start

:prod
ECHO Create an optimized production build:
npm run build-prod

:fix
ECHO eslint --fix:
npm eslint --fix

:End