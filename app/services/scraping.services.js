const ScrapingRepository = require('../repositories/scraping.repository');

class ScrapingService{
    constructor(){
        this.scrapingRepository = ScrapingRepository
    }

    async createOrUpdateScraping(data){
        try {
            await this.scrapingRepository.createOrUpdateScraping(data);
            return true;
        } catch (error) {
            console.error("Error en createOrUpdateScraping - Services: ", error.meesage);
            throw error;
        }
    }

}

module.exports = new ScrapingService();