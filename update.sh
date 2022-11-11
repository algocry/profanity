if ! [ -x "$(command -v git)" ]; then
  echo 'Error: git is not installed. Install before running' >&2
  exit 1
else
  echo "Git is installed"
  git pull
fi
