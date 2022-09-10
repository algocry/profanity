const fetch = require('node-fetch');

eval(require('fs').readFileSync('./libs/encryptHandler.js', 'utf8'));

const headers = (lact, act) => {
    return {
        "content-type": "application/json; charset=utf-8",
        "x-requested-with": "XMLHttpRequest",
        "cookie": `lpu_token={\"lpu_access_token\":\"${lact}\"}; token={\"access_token\":\"${act}\"};`,
        "Referer": "https://oas.lpu.in/StudentHome",
    }
};

async function fetch_attempted(reg, lact, act) {
    var url = `https://oas.lpu.in/api/OnlineExam/GetAttemptedTestForStudent?LoginId=${reg}`;
    var data = await fetch(url, {
        "headers": headers(lact, act),
        "method": "GET"
    });
    var resp = await data.json();
    return resp;
}

async function fetch_result(tid, reg, lact, act) {
    var url = `https://oas.lpu.in/api/OnlineExam/GetTestDetailForResultAnalysis?EncTestId=${encodeURI(encd(tid))}&LoginId=${encodeURI(encd(reg))}`;
    var data = await fetch(url, {
        "headers": headers(lact, act),
        "method": "GET"
    });
    var resp = await data.json();
    return resp;
}

async function fetch_username(reg, lact, act) {
    var url = `https://oas.lpu.in/api/OnlineExam/GetUserName?LoginId=${encodeURI(encd(reg))}`;
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
    fetch_username
};