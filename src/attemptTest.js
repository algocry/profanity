const parseOAS = require("./libs/parseOAS");
const prompt = require("prompt-sync")({ sigint: true });

async function getAnswer(rno) {
    var answers = {};
    if (rno === null) {
        var reg_no = prompt('Enter registration number to get answer of: ');
    }
    else {
        var reg_no = rno;
    }

    await parseOAS.fetch_2attempt(reg_no).then(async data => {
        parseOAS.fetch_username(reg_no).then(async un_data => {
            console.log(`Name: ${un_data}`);
            for (var [i, j] of data.entries()) {
                console.log(`[${i + 1}] ${j.TestName}`);
            }
            if (rno === null) {
                var selid = prompt('Select test to get answers: ');
            }
            else selid = 1;
            var tid = data[selid-1].TestId;

            // var set = prompt('Enter set number: ');
            //// detect set automatically
            await parseOAS.fetchSet(tid, reg_no).then(async setData => {
                var attempt4me = prompt("Attempt this test for you? [y/n]: ");
                if (attempt4me != "y") {
                    reg_no = 12114441; // reg no to attempt, retired ofcourse
                }
                const set = JSON.parse(setData)[0].SetNo;
                var currScore = 0;

                // getting current score
                //await parseOAS.fetch_result(tid, reg_no).then(redata => {
                //currScore = parseInt(redata[0].MarksObtained);
                //});

                await parseOAS.fetch_qids(tid, set).then(async qiddata => {
                    for (let [idx, i] of qiddata.entries()) {
                        await parseOAS.fetch_options(i.QuestionId).then(async opdata => {
                            var correctOpFound = false;
                            for (let j of opdata) {
                                await parseOAS.attemptQuestion(tid, reg_no, set, i.QuestionId, j.OptionId).then(async attemptData => {
                                    await parseOAS.fetch_result(tid, reg_no).then(redata => {
                                        if (parseInt(redata[0].MarksObtained) > currScore) {
                                            currScore = parseInt(redata[0].MarksObtained);
                                            answers[idx] = j.OptionDescription;
                                            correctOpFound = true;
                                            //console.log(idx, j.OptionDescription)
                                        }
                                    });
                                });
                                if (correctOpFound) break;
                            }
                        });
                    }
                    await parseOAS.fetch_endTest(tid, reg_no, set).then(async endtdata => {
                        console.log(endtdata);
                        console.log(answers);
                    });
                });                
            })

        });
    });

}
async function getAnswerNNA(rno) {
    var answers = {};
    if (rno === null) {
        var reg_no = prompt('Enter registration number to get answer of: ');
    }
    else {
        var reg_no = rno;
    }

    await parseOAS.fetch_2attempt(reg_no).then(async data => {
        parseOAS.fetch_username(reg_no).then(async un_data => {
            console.log(`Name: ${un_data}`);
            for (var [i, j] of data.entries()) {
                console.log(`[${i + 1}] ${j.TestName}`);
            }
            if (rno === null) {
                var selid = prompt('Select test to get answers: ');
            }
            else selid = 1;

            var tid = data[selid - 1].TestId;

            // getting current score
            //await parseOAS.fetch_result(tid, reg_no).then(redata => {
            //currScore = parseInt(redata[0].MarksObtained);
            //});
            await parseOAS.fetchSet(tid, reg_no).then(async setData => {
                const set = JSON.parse(setData)[0].SetNo;
                await parseOAS.fetch_qids(tid, set).then(async qiddata => {
                    for (let [idx, i] of qiddata.entries()) {
                        await parseOAS.fetch_options(i.QuestionId).then(async opdata => {
                            var correctOpFound = false;
                            var currScore = 0;
                            for (let j of opdata) {
                                reg_no = Math.ceil(Math.random() * (500 - 2) + 2);
                                await parseOAS.attemptQuestion(tid, reg_no, set, i.QuestionId, j.OptionId).then(async attemptData => {
                                    await parseOAS.fetch_result(tid, reg_no).then(redata => {
                                        if (parseInt(redata[0].MarksObtained) > currScore) {
                                            currScore = parseInt(redata[0].MarksObtained);
                                            answers[idx] = j.OptionDescription;
                                            correctOpFound = true;
                                            //console.log(idx, j.OptionDescription)
                                        }
                                    });
                                });
                                if (correctOpFound) break;
                            }
                        });
                    }
                    await parseOAS.fetch_endTest(tid, reg_no, set).then(async endtdata => {
                        console.log(endtdata);
                        console.log(answers);
                    });
                });
            });
        });
    });

}

module.exports = {
    getAnswer,
    getAnswerNNA
};
