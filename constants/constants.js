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

module.exports = {
    AUTH_API_URL_LPU,
    Urls,
};