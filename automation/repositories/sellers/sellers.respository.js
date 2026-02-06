const SellersModel = require('../../models/sellers.model');
const { Op } = require('@sequelize/core');

class SellersRepository {
    constructor() {
        this.SellersModel = new SellersModel();
        this.sellers = this.SellersModel.Sellers
    }
    async get_all_active_sellers() {
        try {
            const response = await this.sellers.findAll({
                where: {
                    active: 1
                }
            });
            const plainSellers = response.map(seller => seller.get({ plain: true }));
            return plainSellers;
        } catch (error) {
            console.error("error al obtener sellers activos: ", error.message);
            throw error;
        }
    }
}

module.exports = SellersRepository;