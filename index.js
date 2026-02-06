const express = require('express');
const dotenv = require('dotenv');
const app = require('./automation/app');

dotenv.config();

class Server {
    constructor() {
        this.appInstance = new app();
        this.port = process.env.PORT || 3000;
    }
    async Init() {
        express()
            .listen(this.port, () => {
                console.log(`Automatización corriendo en el port ${this.port}...`);
            });
        await this.appInstance.start();
    }
}

const server = new Server();
server.Init();