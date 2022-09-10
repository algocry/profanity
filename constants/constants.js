const AUTH_API_URL_LPU = "https://lpulive.lpu.in/fugu-api/api";
const GHP_BASE_API_URL = "https://api.github.com";

class GHPPaths {
    constructor(username) {
        this.user = `/users/${username}`;
        this.repos = `/users/${username}/repos?per_page=100`;
        this.orgs = `/users/${username}/orgs`;
        this.reposPriv = `/repos/${username}`;
    }
};

class Urls {
    constructor() {
        this.conversation = "/conversation";
        this.chat = "/chat";
        this.user = "/user";
        this.notification = "/notification";
        this.login = "/login";
        this.loginvat = "/loginvat";
    }
};
var headers = {
    "app_version": "1.0.0",
    "content-type": "application/json",
    "device_type": "WEB",
};
module.exports = {
    AUTH_API_URL_LPU,
    Urls,
    headers,
    GHP_BASE_API_URL,
    GHPPaths
};