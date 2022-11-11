echo "Profanity v0.1"
echo "Author: 0x0is1"
DIRECTORY="node_modules"
if [ -d "$DIRECTORY" ]; then
  echo "npm packages found!"
else 
    echo "npm packages not found. Installing..."
    npm install
fi
echo "1. Get one result"
echo "2. Get all results"
echo "3. Get Question Paper"
read -p "Select action: " input
if [ "$input" == "1" ]; then
    npm run result

elif [ "$input" == "2" ]; then
    npm run export

elif [ "$input" == "3" ]; then
    npm run question
else
    echo "Wrong option selected"
fi