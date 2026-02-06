const SellersRepository = require('../repositories/sellers/sellers.respository');
const Map = require('./map');

class ScrapersIndex{
    constructor(){
        this.sellersRepository = new SellersRepository();
    }

    async run(){
        let sellers = await this.sellersRepository.get_all_active_sellers();
        for(const seller of sellers){
            let seller_name = seller.name;
            console.log(seller_name);
            if(Map[seller_name]){
                const ScraperClass = Map[seller_name];
                const scraperInstance = new ScraperClass();
                await scraperInstance.scrape();
            }
        }
    }
}

module.exports = ScrapersIndex;