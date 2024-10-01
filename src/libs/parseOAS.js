const fetch = require('node-fetch');
const encd = require('./encryptHandler').encd;
const fs = require('fs')
const BASEURL = Buffer.from('aHR0cHM6Ly9vYXMubHB1LmluL2FwaS9PbmxpbmVFeGFt', 'base64').toString('ascii');

const headers = () => {
    const oasToken = fs.readFileSync('./src/creds/token.txt', { encoding: 'utf8', flag: 'r' })
    return {
        "content-type": "application/json; charset=utf-8",
        "x-requested-with": "XMLHttpRequest",
        "Referer": BASEURL,
        "cookie": `ASP.NET_SessionId=a; OASvalue=${oasToken}`,
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

async function fetch_testStatus(test_id, login_id = 12114480, set=1) {
    var url = `${BASEURL}/CheckForTestSubmitted?LoginId=${login_id}&TestId=${test_id}&Set=${set}`;
    var data = await fetch(url, {
        "headers": headers(),
        "method": "GET"
    });
    var resp = await data.json();
    return resp;
}

async function fetch_endTest(test_id, login_id = 12114480, set=1) {
    var url = `${BASEURL}/EndTestDetail`;
    var body = {
        TestId: test_id,
        SetNumber: set,
        LoginName: login_id,
        TimeRemaining: "15:15",
        IsExplicitEnd: "true"
    }
    var data = await fetch(url, {
        "headers": headers(),
        "body": JSON.stringify(body),
        "method": "POST"
   });
    var resp = await data.json();
    return resp;
}

async function attemptQuestion(test_id, login_id = 12114480, set = 1, question_id, option_id) {
    var url = `${BASEURL}/SaveTestResponse`;
    var body = {
        TestId: test_id,
        SetNo: set,
        LoginId: login_id,
        QuestionId: question_id,
        OptionId: option_id,
        IsFlagged: "",
        IsRightAnswer: 0,
        AnswerText: "",
        TimeTaken: "13:13"
    }
    var data = await fetch(url, {
        "headers": headers(),
        "body": JSON.stringify(body),
        "method": "POST"
    });
    var resp = await data.json();
    return resp;
}

async function fetchSet(test_id, login_id) {
    let response = await fetch(`${BASEURL}/GetTestSetToAttemptDetail?TestId=${test_id}&LoginId=${login_id}`, {
        method: "GET",
        headers: headers()
    });
    let data = await response.text();
    return data;
}

module.exports = {
    fetch_attempted,
    fetch_result,
    fetch_username,
    fetch_questions,
    fetch_options,
    fetch_2attempt,
    fetch_qids,
    fetch_answers,
    fetch_testStatus,
    fetch_endTest,
    attemptQuestion,
    fetchSet
};