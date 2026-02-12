const App = require('./app/app');
const db = require('./app/models');

class Server {
    constructor() {
        this.app = App;
    }

    async init() {
        try {
            await db.sequelize.authenticate();
            console.log("Conexion exitosa!");

            await db.sequelize.sync();
            console.log("Tablas sincronizadas!");

        } catch (error) {
            console.error("Error al inicializar dolphi-scraping-automation: ", error.message);
            process.exit(1);
        }
        await this.app.init();
    }

}

const server = new Server();
server.init();