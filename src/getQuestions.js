const parseOAS = require("./libs/parseOAS");
const prompt = require("prompt-sync")({ sigint: true });
const { v4: uuidv4 } = require('uuid');
var html_to_pdf = require('html-pdf-node');
const fs = require('fs');

const writeData = (fname, data) => { 
    let options = { format: 'A4' };
    let file = { content: data };
    html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
        fs.writeFileSync(fname, pdfBuffer, "binary");
        console.log("File is saved as ", fname);
    });
}


var stylesheet = `        
        
        body{
            position: relative;
            background: rgba(248, 248, 242, 0.714);
        }
        .qbox {
            position: relative;
            display: flex;
            flex-direction: column;
            border: 1px solid rgb(197, 197, 197);
            margin: 10px;
            border-radius: 10px;
            padding: 10px;
            background: white;
        }

        .qbox .qimg {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin: 3px;
        }

        .qbox .qno i {
            background: rgb(0, 98, 202);
            border-radius: 12px;
            padding: 4px;
            color: white;
            font-weight: 700;
        }

        .qbox .que,
        .qbox .qimg {
            padding: 10px;
        }

        .qbox .obox {
            padding: 15px;
            border: 1px solid grey;
            margin: 2px;
            border-radius: 10px;
            background: rgb(251, 249, 249);
        }

        .qbox .obox .ono i {
            background: rgba(153, 183, 253, 0.931);
            border-radius: 50%;
            font-style: normal;
            padding: 5px;
            color: rgb(80, 80, 80);
            font-weight: 600;
        }

        .qbox .obox .opt{
            padding: 15px;
        }

        .c_answer {
            margin: 5px;
            font-size: 15px;
        }

        .c_answer b{
            font-style: normal;
            border-radius: 10px;
            background: grey;
            padding: 5px;
            color: white;
        }
`;

var htmlBoilerPlate = `<html><head><title>Profanity</title><style>${stylesheet}</style></head><body>`;

async function getQuestions(regs = 12114480) {
    if (regs === null) {
        var reg = prompt('Enter registration number to get tests: ') | regs;
    }
    else {
        var reg = regs;
    }
    console.log("[1] From Attempted\n[2] To attempt")
    var fun_idx = prompt("Select from which category you want to access tests (Default: 1): ")
    var fun2exec = [parseOAS.fetch_attempted, parseOAS.fetch_2attempt][parseInt(fun_idx) - 1];
    var test_ids = [];
    await fun2exec(reg).then(async data => {
        for (let [t_idx, test] of data.entries()) {
            console.log(`[${t_idx+1}] ${test.TestName}`);
            test_ids.push(test.TestId);
        }
        var test_idx = prompt("Select test to get questions: ");
        var test_id = test_ids[parseInt(test_idx - 1)];
        await parseOAS.fetchSet(test_id, reg).then(async setData => {
            const set = JSON.parse(setData)[0].SetNo;
            await parseOAS.fetch_qids(test_id, parseInt(set)).then(async qids_data => {
                for (let [qid_idx, qid_data] of qids_data.entries()) {
                    qid = qid_data.QuestionId;
                    await parseOAS.fetch_questions(qid).then(async dataq => {
                        await parseOAS.fetch_options(qid).then(async data_ => {
                            htmlBoilerPlate += `<div class="qbox" id="${dataq[0].QuestionId}"><span class="qno"><i>Question (${qid_idx + 1})</i></span>`;
                            if (dataq[0].ParagraphText != '') {
                                htmlBoilerPlate += `<span class="para">${dataq[0].ParagraphText}</span>`;
                            }
                            if (dataq[0].QuestionDescription != '') {
                                htmlBoilerPlate += `<span class="que">${dataq[0].QuestionDescription}</span>`;
                            }
                            if (dataq[0].QuestionImage != '') {
                                htmlBoilerPlate += `<span class="qimg"><img src="data:image/jpeg;base64,${dataq[0].QuestionImage}"></img></span>`;
                            }
                            for (let [option_idx, option_data] of data_.entries()) {
                                htmlBoilerPlate += `<div class="obox" id="${option_data.OptionId}"><span class="ono"><i>${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[option_idx]}</i></span>`;
                                if (option_data.OptionDescription != '') {
                                    htmlBoilerPlate += `<span class="opt">${option_data.OptionDescription}</span>`;
                                }
                                if (option_data.OptionImage != '') {
                                    htmlBoilerPlate += `<span class="oimg"><img src="data:image/jpeg;base64,${option_data.OptionImage}"></img></span>`;
                                }
                                htmlBoilerPlate += `</div>`;
                            }
                            var answer = "Not Available";
                            htmlBoilerPlate += `<div class="c_answer">Correct Answer: <b>${answer}</b></div></div>`;
                        });
                    });
                }
                htmlBoilerPlate += `</body></html>`;
                writeData(`${test_id}-${uuidv4()}.pdf`, htmlBoilerPlate);
            });
        });
    });
}

module.exports = {
    getQuestions
}