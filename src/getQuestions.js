const parseOAS = require("./libs/parseOAS");
const prompt = require("prompt-sync")({ sigint: true });

async function getQuestions(regs=12114478) {
    if (regs === null) {
        var reg = prompt('Enter registration number to get tests: ') | regs;
    }
    else {
        var reg = regs;
    }
    var test_ids = [];
    await parseOAS.fetch_attempted(reg).then(async data => {
        for (let [t_idx, test] of data.entries()) {
            console.log(`[${t_idx+1}] ${test.TestName}`);
            test_ids.push(test.TestId);
        }
        if (regs === null) {
            var test_idx = prompt("Select test to get questions: ");
            var set = prompt("Select set number(default: 1): ") | 1;
        }
        else {
            var test_idx = 52652;
            var set = 1;
        }
        var test_id = test_ids[parseInt(test_idx - 1)];
        await parseOAS.fetch_qids(test_id, parseInt(set)).then(async qids_data => {
            for (let [qid_idx, qid_data] of qids_data.entries()) {
                qid = qid_data.QuestionId;
                await parseOAS.fetch_questions(qid).then(async dataq => {
                    await parseOAS.fetch_options(qid).then(data_ => {
                        var ext_data = dataq[0].QuestionDescription.replace(/<(.|\n)*?>/g, '').replace(/&nbsp;/g, '\n');
                        if (ext_data === '') {
                            ext_data = dataq[0].QuestionImage;
                        }
                        console.log(`\n[${qid_idx + 1}] ${ext_data}`);
                        for (let [option_idx, option_data] of data_.entries()) {
                            console.log(`[${'ABCD'[option_idx]}] ${option_data.OptionDescription}`);
                        }
                    });
                });                
            }
        });
    });
}
module.exports = {
    getQuestions
}