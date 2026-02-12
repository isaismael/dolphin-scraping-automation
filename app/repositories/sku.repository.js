const { Sku, Category } = require('../models/index');
const { Op } = require('sequelize');

class SkuRepository {

    async getSkuAtive() {
        const skus = await Sku.findAll({
            where: {
                levanta_url: 1,
                is_active: 1,
                supplier_code: {
                    [Op.not]: null
                }
            },
            include: [
                {
                    model: Category,
                    as: 'subcategoryCategory',
                    required: true,
                    attributes: ['category_id_vtex', 'name', 'is_active'],
                    where: {
                        is_active: 1
                    }
                }
            ]
        })
        return skus;
    }

}

module.exports = new SkuRepository();