const fetch = require('node-fetch');
const encd = require('./encryptHandler').encd;

const BASEURL = Buffer.from('aHR0cHM6Ly9vYXMubHB1LmluL2FwaS9PbmxpbmVFeGFt', 'base64').toString('ascii');

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

async function fetch_2attempt(reg) {
    var url = `${BASEURL}/GetTestToAttemptDetail?RoleId=3&LoginId=${reg}`;
    var data = await fetch(url, {
        "headers": headers(),
        "method": "GET"
    });
    var resp = await data.json();
    return resp;
}

async function fetch_qids(test_id, set_idx = 1) {
    var url = `${BASEURL}/GetQuestionNumbersDetail?TestId=${test_id}&Set=${set_idx}&LoginId=null`;
    var data = await fetch(url, {
        "headers": headers(),
        "method": "GET"
    });
    var resp = await data.json();
    return resp;
}

async function fetch_answers(test_id, login_id = 12114480) {
    var url = `${BASEURL}/GetResultDetailsForAnalysis?EncTestId=${encodeURIComponent(encd(test_id))}&LoginId=${encodeURIComponent(encd(login_id))}`;
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
    fetch_options,
    fetch_2attempt,
    fetch_qids,
    fetch_answers
};