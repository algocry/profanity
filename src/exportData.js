const parseOAS = require("./libs/parseOAS");
const prompt = require("prompt-sync")({ sigint: true });
const reader = require('xlsx')
const fetch = require('node-fetch');
const loginHandler = require('./libs/loginHandler');
var cid = '';

async function getCID(en_user_id, lact, act) {
    var user_data = await fetch(`https://lpulive.lpu.in/fugu-api/api/conversation/getConversations?en_user_id=${en_user_id}&page_start=1`, {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "app_version": "1.0.0",
            "device_type": "WEB",
            "cookie": `lpu_token={\"lpu_access_token\":\"${lact}\"}; token={\"access_token\":\"${act}\"}`,
            "Referer": "https://lpulive.lpu.in/lpu-demo1/messages/3715488",
        },
        "method": "GET"
    });
    var pard = await user_data.json();
    return pard;
}

async function getUsers(en_user_id, start, channel_id, lact, act) {
    var url = `https://lpulive.lpu.in/fugu-api/api/chat/getGroupInfo?channel_id=${channel_id}&en_user_id=${en_user_id}&get_data_type=MEMBERS&user_page_start=${start}`;
    var user_data = await fetch(url, {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "app_version": "1.0.0",
            "device_type": "WEB",
            "cookie": `lpu_token={\"lpu_access_token\":\"${lact}\"}; token={\"access_token\":\"${act}\"}`,
            "Referer": "https://lpulive.lpu.in/",
        },
        "method": "GET"
    });
    var pard = await user_data.json();
    return pard;
}

function export2excel(filename, data) {
    try {        
        const file = reader.utils.book_new();
        const ws = reader.utils.json_to_sheet(data)
        reader.utils.book_append_sheet(file, ws, "Sheet1")
        reader.writeFile(file, filename);
        console.log(`Exported successfully as ${filename}`);
    }
    catch (e) {
        console.log(e);
    }
}
async function exportData(tem=1) {
    if (tem === null) {
        var registrat = prompt('Enter Your registration number: ');
        var passw = prompt('Enter your password: ');
    }
    else {
        return;
    }
    
    await loginHandler.login(registrat, passw, 330).then(async data => {
        var workspace = data.data.workspaces_info[0];
        var user_info = data.data.user_info;
        const lact = user_info.lpu_access_token;
        const act = user_info.access_token;
        const euid = workspace.en_user_id;
        await getCID(euid, lact, act).then(async data => {
            for (var k of data.data.conversation_list) {
                if (k.chat_type == 8) {
                    cid = k.channel_id;
                    break;
                }
            }
            var data_container = [];
            await getUsers(euid, 0, cid, lact, act).then(async udata => {
                await getUsers(euid, 50, cid, lact, act).then(async u2data => {
                    var reg_no = udata.data.chat_members[0].email;
                    await parseOAS.fetch_attempted(reg_no).then(async data => {
                        await parseOAS.fetch_username(reg_no).then(async un_data => {
                            console.log(`Name: ${un_data}`);
                            for (var [i, j] of data.entries()) {
                                console.log(`[${i + 1}] ${j.TestName}`);
                            }
                            var selid = prompt('Select test to export marks: ');
                            var course_id = data[selid - 1].TestId;
                            for (let i of udata.data.chat_members) {
                                if (i.role !== "ADMIN") {
                                    var re_no = i.email;
                                    var full_name = i.full_name.split(" : ")[0];
                                        try {
                                            await parseOAS.fetch_result(course_id, re_no).then(async redata => {
                                                if (redata[0].Message == "Success") {
                                                    data_container.push(
                                                        {
                                                            Name: full_name,
                                                            MarksObtained: redata[0].MarksObtained,
                                                            MarksMax: redata[0].MarksMax,
                                                            Percentile: redata[0].Percentile,
                                                            ResultStatus: redata[0].ResultStatus
                                                        }
                                                    );
                                                }
                                            });
                                        }
                                        catch (e) { }
                                }
                            }
                            for (let j of u2data.data.chat_members) {
                                if (j.role !== "ADMIN") {
                                    var re_no = j.email;
                                    var full_name = j.full_name.split(" : ")[0];
                                        try {
                                            await parseOAS.fetch_result(course_id, re_no).then(async redata => {
                                                if (redata[0].Message == "Success") {
                                                    data_container.push(
                                                        {
                                                            Name: full_name,
                                                            MarksObtained: redata[0].MarksObtained,
                                                            MarksMax: redata[0].MarksMax,
                                                            Percentile: redata[0].Percentile,
                                                            ResultStatus: redata[0].ResultStatus
                                                        }
                                                    );
                                                }
                                            });
                                        }
                                        catch (e) { }
                                    
                                }
                            }
                            export2excel(`${data[selid - 1].TestName}.xlsx`, data_container)
                        });
                    });
                });
            });
        });
    });
}

module.exports = {
    exportData
}
