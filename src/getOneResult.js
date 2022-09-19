const parseOAS = require("./libs/parseOAS");
const prompt = require("prompt-sync")({ sigint: true });
async function getOneResult(rno = 12114478) {
    if (rno === null) {
        var reg_no = prompt('Enter registration number to get marks of: ');
    }
    else {
        var reg_no = rno;
    }
    await parseOAS.fetch_attempted(reg_no).then(data => {
        parseOAS.fetch_username(reg_no).then(un_data => {
            console.log(`Name: ${un_data}`);
            for (var [i, j] of data.entries()) {
                console.log(`[${i+1}] ${j.TestName}`);
            }
            if (rno === null) {
                var selid = prompt('Select test to get marks: ');
            }
            else {
                selid = 1;
            }
            parseOAS.fetch_result(data[selid-1].TestId, reg_no).then(redata => { 
                console.log(redata);
            });
        });
    });
}

module.exports = {
    getOneResult
};