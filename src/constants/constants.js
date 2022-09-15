const AUTH_API_URL_LPU = "https://lpulive.lpu.in/fugu-api/api";

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
    headers
};