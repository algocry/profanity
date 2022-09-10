const parseOAS = require("./libs/parseOAS");
const prompt = require("prompt-sync")({ sigint: true });
var reg_no = prompt('Enter registration number to get marks of: ');
parseOAS.fetch_attempted(reg_no).then(data => {
    parseOAS.fetch_username(reg_no).then(un_data => {
        console.log(`Name: ${un_data}`);
        for (var [i, j] of data.entries()) {
            console.log(`[${i+1}] ${j.TestName}`);
        }
        var selid = prompt('Select test to get marks: ');
        parseOAS.fetch_result(data[selid-1].TestId, reg_no).then(redata => { 
            console.log(redata);
        });
    });
});