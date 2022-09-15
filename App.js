const dexp = require("./src/exportData");
const oneres = require("./src/getOneResult");
const que = require("./src/getQuestions")

console.log("Profanity v1.0.1");
console.log("Author: 0x0is1");

switch (parseInt(process.argv[2])) {
    case 1:
        dexp.exportData(null);
        break;
    case 2:
        oneres.getOneResult(null);
        break;
    case 3:
        que.getQuestions(null);
}
