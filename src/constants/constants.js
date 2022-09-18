const AUTH_API_URL_LPU = Buffer.from('aHR0cHM6Ly9scHVsaXZlLmxwdS5pbi9mdWd1LWFwaS9hcGk=', 'base64').toString('ascii');

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