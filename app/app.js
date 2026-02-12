const ScrapersIndex = require('./scrapers/index');

class App {
    constructor() {
        //this.skuServices = SkuServices;
        this.ScrapersIndex = ScrapersIndex;
    }

    async init() {
        try {
            await this.ScrapersIndex.run();
        } catch (error) {
            console.error("Error al iniciar Scraping: ", error.message);
            throw error;
        }
        // try {
        //     let product = await this.skuServices.getSkuAtive()
        //     for (let i = 0; i < product.length; i++) {
        //         let subcategory = product[i].subcategoryCategory.name;
        //         let brand = product[i].brand_name;
        //         let supplier = product[i].supplier_code;
        //         let search = `${subcategory} ${brand} ${supplier}`
        //         console.log(search);
        //     }
        // } catch (error) {
        //     console.error("Error en incializar Sacraping: ", error.message);
        //     process.exit(1);
        // }
    }
}

module.exports = new App;