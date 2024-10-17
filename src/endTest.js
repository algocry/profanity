const parseOAS = require("./libs/parseOAS");
const prompt = require("prompt-sync")({ sigint: true });
async function endTest(rno = 12114478) {
    if (rno === null) {
        var reg_no = prompt('Enter registration number to get marks of: ');
    }
    else {
        var reg_no = rno;
    }
    await parseOAS.fetch_attempted(reg_no).then(data => {
        parseOAS.fetch_username(reg_no).then(async un_data => {
            console.log(`Name: ${un_data}`);
            for (var [i, j] of data.entries()) {
                console.log(`[${i + 1}] ${j.TestName}`);
            }
            var selid = prompt('Select test to get marks: ');
            var set = prompt("Enter set number: ");
            await parseOAS.fetch_endTest(data[selid-1], reg_no, set).then(async endtdata => {
                if (endtdata == "-1") {
                    console.log("Ended successfully");
                    return;
                }
                console.log("Something went wrong.");
            });
        });
    });
}

module.exports = {
    endTest
};