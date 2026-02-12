const SkuRepository = require('../repositories/sku.repository');

class SkuServices {
    constructor() {
        this.skuRepository = SkuRepository;
    }

    async getSkuAtive() {
        try {
            const skus = await this.skuRepository.getSkuAtive();
            return skus;
        } catch (error) {
            console.error("Error", error.message);
            throw error;
        }

    }

}


module.exports = new SkuServices();
