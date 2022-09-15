const parseOAS = require("./libs/parseOAS");
const loginHandler = require('./libs/loginHandler');
const prompt = require("prompt-sync")({ sigint: true });

var qid = prompt('Enter Question id (default: 634256): ') | 634256;
// 634256
parseOAS.fetch_questions(qid).then(data => {
    parseOAS.fetch_options(qid).then(data_ => {
        console.log(data);
        console.log(data_);
    })
});
