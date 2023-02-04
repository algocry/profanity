const dexp = require("./src/exportData");
const oneres = require("./src/getOneResult");
const que = require("./src/getQuestions");
const endt = require("./src/endTest");
const anst = require("./src/getAnswer");


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
        break;
    case 4:
        endt.endTest(null);
        break;
    case 5:
        anst.getAnswer(null);
        break;
    case 6:
        anst.getAnswerNNA(null);
        break;
    default:
        console.log("Wrong option selected.")
}
