const dexp = require("../src/exportData");
const oneres = require("../src/getOneResult");
const que = require("../src/getQuestions")

console.log("Profanity v1.0.1 (test)");
console.log("Author: 0x0is1");

var passed = 0;
var total = 3;

try {
    dexp.exportData();
    passed++;
} catch (error) {
    console.log(error);
 }

try {
    oneres.getOneResult();
    passed++;
} catch (error) {
    console.log(error);
}
try {
    que.getQuestions();
    passed++;
} catch (error) {
    console.log(error);
}
console.log(`Test cases passed: (${passed}/${total})`);
