const constants = require("../constants/constants");
const fetch = require("node-fetch");

const urls = new constants.Urls();

// function to login via username and password
async function login(username, password, timezone) {
    const login_url = `${constants.AUTH_API_URL_LPU}${urls.user}/v1/userLogin`;
    const response = await fetch(login_url, {
        "headers": constants.headers,
        "body": `{\"password\":\"${password}\",\"username\":\"${username}\",\"domain\":\"lpu.in\",\"time_zone\":${timezone}}`,
        "method": "POST"
    });
    const json = await response.json();
    return json;
}

// function to login via access token provided by the API
async function login_via_access_token(lpu_access_token, access_token, timezone) {
    const login_vat_url = `${constants.AUTH_API_URL_LPU}${urls.user}/v1/loginViaAccessToken`;
    var headers = constants.headers;
    headers["access_token"] = access_token;
    const response = await fetch(login_vat_url, {
        "headers": headers,
        "body": `{\"lpu_access_token\":\"${lpu_access_token}\",\"time_zone\":${timezone}}`,
        "method": "POST"
    });
    const json = await response.json();
    return json;
}

// exporting modules
module.exports = {
    login,
    login_via_access_token
};