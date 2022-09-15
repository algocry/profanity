const parseOAS = require("./libs/parseOAS");
const prompt = require("prompt-sync")({ sigint: true });

async function getQuestions(dqid = 634256) {
    if (dqid === null) {
        var qid = prompt('Enter Question id (default: 634256): ') | dqid;
    }
    else {
        var qid = dqid;
    }
    await parseOAS.fetch_questions(qid).then(data => {
        parseOAS.fetch_options(qid).then(data_ => {
            console.log(data);
            console.log(data_);
        })
    });
}

module.exports = {
    getQuestions
}