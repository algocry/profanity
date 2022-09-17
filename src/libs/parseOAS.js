const fetch = require('node-fetch');
eval(require('fs').readFileSync('./src/libs/encryptHandler.js', 'utf8'));
const BASEURL = 'https://oas.lpu.in/api/OnlineExam';

const headers = () => {
    return {
        "content-type": "application/json; charset=utf-8",
        "x-requested-with": "XMLHttpRequest",
        "Referer": BASEURL,
    }
};

async function fetch_attempted(reg) {
    var url = `${BASEURL}/GetAttemptedTestForStudent?LoginId=${reg}`;
    var data = await fetch(url, {
        "headers": headers(),
        "method": "GET"
    });
    var resp = await data.json();
    return resp;
}

async function fetch_result(tid, reg) {
    var url = `${BASEURL}/GetTestDetailForResultAnalysis?EncTestId=${encodeURIComponent(encd(tid))}&LoginId=${encodeURIComponent(encd(reg))}`;

    var data = await fetch(url, {
        "headers": headers(),
        "method": "GET"
    });
    var resp = await data.json();
    return resp;
}

async function fetch_username(reg) {
    var url = `${BASEURL}/GetUserName?LoginId=${encodeURIComponent(encd(reg))}`;
    var data = await fetch(url, {
        "headers": headers(),
        "method": "GET"
    });
    var resp = await data.json();
    return resp;
}

async function fetch_questions(q_no) {
    var url = `${BASEURL}/GetQuestionDetailToDisplay?QuestionId=${q_no}`;
    var data = await fetch(url, {
        "headers": headers(),
        "method": "GET"
    });
    var resp = await data.json();
    return resp;
}

async function fetch_options(q_no) {
    var url = `${BASEURL}/GetOptionDetailToDisplay?QuestionId=${q_no}`;
    var data = await fetch(url, {
        "headers": headers(),
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