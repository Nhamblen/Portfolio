# 1. Define the folder path
DIR="/Users/nhamblen/Desktop/Files/portfolio"

# 2. Open the WHOLE folder in VS Code
# Using the full path to the 'code' binary to ensure it launches
code "$DIR"


# 3. Open the GitHub URL
open "https://github.com/Nhamblen/Portfolio"

# 4. Navigate to the folder
cd "$DIR"

# 5. Run Git updates
git checkout main
git pull

# 6. KEEP THE TERMINAL OPEN
# This launches a fresh interactive shell so the window stays active
exec zsh -i