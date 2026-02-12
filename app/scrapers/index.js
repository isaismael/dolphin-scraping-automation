const SellerServices = require('../services/seller.services');
const Map = require('./map');

class ScrapersIndex {
    constructor() {
        this.sellerServices = SellerServices;
    }

    async run() {
        let sellers = await this.sellerServices.getActiveSellers();
        for (const seller of sellers) {
            let seller_name = seller.name;
            console.log(seller_name);
            if (Map[seller_name]) {
                const ScraperClass = Map[seller_name];
                const scraperInstance = new ScraperClass();
                await scraperInstance.scrape();
            }
        }
    }
}

module.exports = new ScrapersIndex;