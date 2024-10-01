const dexp = require("./src/exportData");
const oneres = require("./src/getOneResult");
const que = require("./src/getQuestions");
const endt = require("./src/endTest");
const anst = require("./src/getAnswer");
const prompt = require("prompt-sync")({ sigint: true });
const fs = require('fs');

var fetch_cookies = async (username, password) => {
    var x = await fetch("https://oas.lpu.in/Home/NewLoginMethod", {
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
            "content-type": "application/x-www-form-urlencoded",
            "Referer": "https://oas.lpu.in/",
        },
        "body": `LoginId=${username}&Password=${encodeURIComponent(password)}`,
        "method": "POST",
        redirect: 'manual',
    });
    var resp = await x.headers.get('Set-Cookie');
    return resp.split('OASvalue=').pop().split(';')[0];
}

const main = async () => {
    console.log("Profanity v1.0.1");
    console.log("Author: 0x0is1");

    var registrat = prompt('Enter Your registration number: ');
    var passw = prompt.hide('Enter your password: ');

    const cookies = await fetch_cookies(registrat, passw);
    fs.writeFileSync('./src/creds/token.txt', cookies);

    switch (parseInt(process.argv[2])) {
        case 1:
            dexp.exportData(passw, registrat);
            break;
        case 2:
            oneres.getOneResult(registrat);
            break;
        case 3:
            que.getQuestions(registrat);
            break;
        case 4:
            endt.endTest(registrat);
            break;
        case 5:
            anst.getAnswer(registrat);
            break;
        case 6:
            anst.getAnswerNNA(registrat);
            break;
        default:
            console.log("Wrong option selected.");
    }
};

main();
