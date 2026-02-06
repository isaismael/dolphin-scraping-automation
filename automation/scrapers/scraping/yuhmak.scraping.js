const ItemsRepository = require('../../repositories/items/items.repository');
const SellerRepository = require('../../repositories/seller/seller.repository');
const GetPrice = require('../../scrapers/vtex/get.price');
const GetContext = require('../../scrapers/vtex/get.context');

class ScraperYuhmak {
    constructor() {
        this.itemsRepository = new ItemsRepository();
        this.sellerRepository = new SellerRepository();
        this.getPrice = new GetPrice();
        this.getContext = new GetContext();
    }
    // -> inicio funcion scrape
    async scrape() {
        console.log(" - - - - - Inicio de ScraperYuhmak.scrape - - - - - ")
        
        let items = await this.itemsRepository.get_active_items();
        const product = {};

        try {
            for (let item of items) {
                let { listPrice: older_price } = await this.getPrice.get_price(item.sku_id);
                let { basePrice: current_price } = await this.getPrice.get_price(item.sku_id);
                const { Images } = await this.getContext.get_context(item.sku_id);
                let image_url = Images?.[0]?.ImageUrl || "";
                // let { ImageUrl: image_url } = await this.getContext.get_context(item.sku_id);
                let { DetailUrl: seller_item_url} = await this.getContext.get_context(item.sku_id);
                
                Object.assign(product,{
                    item_id: item.id,
                    seller_id: 1,
                    seller_item_url: `https://www.yuhmak.com${seller_item_url}`,
                    older_price: older_price.toString(),
                    current_price: current_price.toString(),
                    off_percent: "",
                    payment_rules: item.commercial_condition_name,
                    shipping_data: "",
                    image_url: image_url,
                    active: item.is_active,
                })
                // ->
                await this.sellerRepository.upsert_product(product);
                //console.log(product)
            }
        } catch (error) {
            console.error("Error en Yuhmak scrape: ", error.message);
        }

        console.log(" - - - - - Fin de ScraperYuhmak.scrape - - - - - ")
    }
    // -> fin funcion scrape
}

module.exports = ScraperYuhmak;