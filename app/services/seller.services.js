const SellerRepository = require('../repositories/seller.repository');

class SellerServices {
    constructor() {
        this.sellerRepository = SellerRepository;
    }

    async getActiveSellers() {
        const sellers = await this.sellerRepository.getActiveSellers();
        return sellers;
    }

}

module.exports = new SellerServices();