const ItemsModel = require("../../models/items.model")
const { Op } = require('@sequelize/core');

class ItemsRepository {
    constructor() {
        this.itemsModel = new ItemsModel();
        this.items = this.itemsModel.Items;
    }

    async get_active_items() {
        try {
            const items = await this.items.findAll({
                where: {
                    is_active: 1
                }
            });
            return items;
        } catch (error) {
            console.error("error al ejecutar get_active_items: ", error.message);
            throw error;
        }
    }
}

module.exports = ItemsRepository;