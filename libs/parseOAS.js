const fetch = require('node-fetch');
eval(require('fs').readFileSync('./libs/encryptHandler.js', 'utf8'));
const BASEURL = 'https://oas.lpu.in/api/OnlineExam';

const headers = (lact, act) => {
    return {
        "content-type": "application/json; charset=utf-8",
        "x-requested-with": "XMLHttpRequest",
        "cookie": `lpu_token={\"lpu_access_token\":\"${lact}\"}; token={\"access_token\":\"${act}\"};`,
        "Referer": BASEURL,
    }
};

async function fetch_attempted(reg, lact, act) {
    var url = `${BASEURL}/GetAttemptedTestForStudent?LoginId=${reg}`;
    var data = await fetch(url, {
        "headers": headers(lact, act),
        "method": "GET"
    });
    var resp = await data.json();
    return resp;
}

async function fetch_result(tid, reg, lact, act) {
    var url = `${BASEURL}/GetTestDetailForResultAnalysis?EncTestId=${encodeURI(encd(tid))}&LoginId=${encodeURI(encd(reg))}`;
    var data = await fetch(url, {
        "headers": headers(lact, act),
        "method": "GET"
    });
    var resp = await data.json();
    return resp;
}

async function fetch_username(reg, lact, act) {
    var url = `${BASEURL}/GetUserName?LoginId=${encodeURI(encd(reg))}`;
    var data = await fetch(url, {
        "headers": headers(lact, act),
        "method": "GET"
    });
    var resp = await data.json();
    return resp;
}

async function fetch_questions(lact, act, q_no) {
    var url = `${BASEURL}/GetQuestionDetailToDisplay?QuestionId=${q_no}`;
    var data = await fetch(url, {
        "headers": headers(lact, act),
        "method": "GET"
    });
    var resp = await data.json();
    return resp;
}

async function fetch_options(lact, act, q_no) {
    var url = `${BASEURL}/GetOptionDetailToDisplay?QuestionId=${q_no}`;
    var data = await fetch(url, {
        "headers": headers(lact, act),
        "method": "GET"
    });
    var resp = await data.json();
    return resp;
}

module.exports = {
    fetch_attempted,
    fetch_result,
    fetch_username,
    fetch_questions,
    fetch_options
};