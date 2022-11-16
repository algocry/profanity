if ! [ -x "$(command -v git)" ]; then
  echo 'Error: git is not installed. Installing' >&2
  sudo apt-get install git
else
  echo "Git is installed"
  git pull
fi
