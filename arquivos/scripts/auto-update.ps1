if (-not (Get-Module -ListAvailable -Name PSWindowsUpdate)) {
    Write-Host "Instalando módulo PSWindowsUpdate..."
    Install-PackageProvider -Name NuGet -Force
    Install-Module -Name PSWindowsUpdate -Force
}

Import-Module PSWindowsUpdate

Write-Host "Procurando por atualizações..."
Get-WindowsUpdate -AcceptAll -Install -AutoReboot