@echo off
title Gerador de Executavel - Filipe
echo ====================================================
echo   A PREPARAR A GERACAO DO EXECUTAVEL (.EXE)
echo ====================================================
echo.

:: 1. Instalar o pacote 'pkg' globalmente (caso nao esteja instalado)
echo [1/3] A instalar o empacotador 'pkg' globalmente...
call npm install -g pkg

:: 2. Instalar as dependencias locais para garantir que estao atualizadas
echo [2/3] A verificar dependencias locais...
call npm install

:: 3. Gerar o executavel para Windows
echo [3/3] A compilar o projeto para um unico .exe...
call pkg server.js --targets node18-win-x64 --output "PainelComercial.exe" --public

echo.
echo ====================================================
echo   SUCESSO! O ficheiro 'PainelComercial.exe' foi criado.
echo ====================================================
pause
