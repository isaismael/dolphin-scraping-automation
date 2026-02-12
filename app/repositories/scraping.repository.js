const { Scraping } = require('../models/index');


class ScrapingRepository {

    async createOrUpdateScraping(data) {
        try {
            let product = await Scraping.findOne({
                where: {
                    product_id: data.product_id,
                    sku_id: data.sku_id,
                    seller_id: data.seller_id,
                    active: 1,
                    edited: 0
                }
            });

            if (product) {
                await Scraping.update(data, {
                    where: {
                        product_id: data.product_id,
                        sku_id: data.sku_id,
                        seller_id: data.seller_id,
                        active: 1,
                        edited: 0
                    }
                });
                console.log("Se actualizó product: ", data.product_id);
                return;
            }
            else {
                await Scraping.create(data);
                console.log("Se creó product: ", data.product_id);
                return;
            }

        } catch (error) {
            console.error("Error en ScrapingRepository - metodo createOrUpdateScraping: ", error.message);
            throw error;
        }
    }

}

module.exports = new ScrapingRepository();