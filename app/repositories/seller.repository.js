const { Seller } = require('../models/index');

class SellerRepository{

    async getActiveSellers(){
        const sellers = await Seller.findAll({
            where: {
                active: 1
            }
        })
        return sellers;
    }

}

module.exports = new SellerRepository();