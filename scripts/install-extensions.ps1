# Installs recommended VS Code extensions for this workspace
$extensions = @(
  'esbenp.prettier-vscode',
  'dbaeumer.vscode-eslint',
  'bradlc.vscode-tailwindcss',
  'biomejs.biome',
  'eamodio.gitlens',
  'github.copilot',
  'codeium.codeium',
  'ms-vscode.powershell',
  'visualstudioexptteam.vscodeintellicode'
)

foreach ($ext in $extensions) {
  Write-Host "Installing $ext"
  code --install-extension $ext
}

Write-Host "Done installing extensions."
