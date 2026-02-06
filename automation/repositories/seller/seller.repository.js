const SellerModel = require('../../models/seller.model');
const ItemsModel = require('../../models/items.model');
const { Op } = require('@sequelize/core');

class SellerRepository {
    constructor() {
        this.sellerModel = new SellerModel();
        this.seller = this.sellerModel.Sellers;
    }

    async upsert_product(product) {
        try {
            let item_existing = await this.seller.findOne({
                where: {
                    item_id: product.item_id,
                    seller_id: product.seller_id
                }
            });
            if (item_existing) {
                await this.seller.update(product, {
                    where: {
                        item_id: product.item_id,
                        seller_id: product.seller_id
                    }
                })
                console.log("Se actualizó el producto!")
                return;
            }
            else {
                await this.seller.create(product);
                console.log("Se creó el producto!")
            }
        } catch (error) {
            console.error("Error con upsert_product: ", error.message);
            throw error;
        }
    }
}

module.exports = SellerRepository;