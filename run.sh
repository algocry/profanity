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
echo "4. End test"
echo "5. Get Answer (Question Navigation allowed)"
echo "6. Get Answer (Question Navigation not allowed)"

read -p "Select action: " input
if [ "$input" == "1" ]; then
    npm run result

elif [ "$input" == "2" ]; then
    npm run export

elif [ "$input" == "3" ]; then
    npm run question

elif [ "$input" == "4" ]; then
    npm run end

elif [ "$input" == "5" ]; then
    npm run answer

elif [ "$input" == "6" ]; then
    npm run answern

else
    echo "Wrong option selected"
fi