@echo off
title Limpeza do Sistema - By It Cloud Solutions
color 0A

echo =====================================
echo     LIMPANDO SISTEMA WINDOWS
echo =====================================
echo.

:: Apagar arquivos temporários do usuário
echo Limpando arquivos temporarios do usuario...
del /s /q "%TEMP%\*.*"
rd /s /q "%TEMP%"

:: Apagar arquivos temporários do sistema
echo Limpando arquivos temporarios do sistema...
del /s /f /q "C:\Windows\Temp\*.*"
rd /s /q "C:\Windows\Temp"

:: Limpar cache do Windows Update
echo Limpando cache do Windows Update...
net stop wuauserv
net stop bits
rd /s /q "C:\Windows\SoftwareDistribution"
rd /s /q "C:\Windows\System32\catroot2"
net start wuauserv
net start bits

:: Limpar logs do Windows
echo Limpando logs do Windows...
for /F "tokens=*" %%G in ('wevtutil el') DO wevtutil cl "%%G"

:: (Opcional) Limpar cache do Edge
echo Limpando cache do Microsoft Edge...
rd /s /q "%LocalAppData%\Microsoft\Edge\User Data\Default\Cache"

:: Executar limpeza de disco silenciosa
echo Executando limpeza de disco...
cleanmgr /sagerun:1

echo.
echo =====================================
echo  LIMPEZA CONCLUIDA!
echo =====================================
pause
