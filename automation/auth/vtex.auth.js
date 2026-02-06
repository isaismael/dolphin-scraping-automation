const dotenv = require('dotenv');
dotenv.config();

class VtexAuth {
    constructor() {
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-VTEX-API-AppKey": process.env.VTEX_APP_KEY,
            "X-VTEX-API-AppToken": process.env.VTEX_APP_TOKEN,
        };
    }

    getVtexAuth() {
        return this.headers;
    }
}

module.exports = VtexAuth;