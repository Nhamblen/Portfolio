# ====== Configuration ======
$serverPath = 'C:\Users\npack\Desktop\Files\portfolio'

# ====== Build commands for each terminal tab ======
$gitServer   = "cmd /k `"cd /d `"$serverPath`" && git checkout main && git fetch -v && git pull -v`""

# ====== Run Windows Terminal with proper argument list ======
Start-Process wt.exe -ArgumentList @(
    "new-tab", "--title", "Git", $gitServer
)

# ====== Open Browser Pages ======
Start-Process "https://github.com/Nhamblen/Portfolio"

# ====== Open VS Code index.html ======
Start-Process "code" -ArgumentList "`"$serverPath`" `"$serverPath\index.html`""
