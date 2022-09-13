const parseOAS = require("./libs/parseOAS");
const loginHandler = require('./libs/loginHandler');
const prompt = require("prompt-sync")({ sigint: true });

var registrat = prompt('Enter Your registration number: ');
var passw = prompt('Enter your password: ');
var qid = prompt('Enter Question id: ');

loginHandler.login(registrat, passw, 330).then(data => {
    var user_info = data.data.user_info;
    const lact = user_info.lpu_access_token;
    const act = user_info.access_token;
    parseOAS.fetch_questions(lact, act, qid).then(data => {
        parseOAS.fetch_options(lact, act, qid).then(data_ => {
            console.log(data);
            console.log(data_);
        })
    });
});