const Database = require('./db');
const ScrapersIndex = require('./scrapers/index');
const cron = require('node-cron');

class App {
    constructor() {
        this.db = new Database();
        this.scrapersIndex = new ScrapersIndex();
    }

    async start() {
        await this.db.connect();
        console.log("Se ejecuta lunes, miercoles y viernes a 07:00 am")
        cron.schedule('0 9 * * 1,3,5', async() => {
            console.log("Ejecutando automation-sellers");
            try {
                await this.scrapersIndex.run();
                console.log("==== fin scraping ====")
            } catch (error) {
                console.error("Error al realizar scraping: ", error.message);
            }
        },{
            timezone: "America/Argentina/Buenos_Aires"
        });
    }
}

module.exports = App;