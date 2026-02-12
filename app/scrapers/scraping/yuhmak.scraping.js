const SkuServices = require('../../services/sku.services');
const Sellerservices = require('../../services/seller.services');
const ScrapingService = require('../../services/scraping.services');
const GetPrice = require('../../scrapers/vtex/get.price');
const GetContext = require('../../scrapers/vtex/get.context');

class ScraperYuhmak {
    constructor() {
        this.skuServices = SkuServices;
        this.sellerservices = Sellerservices;
        this.scrapingServices = ScrapingService;
        this.getPrice = new GetPrice();
        this.getContext = new GetContext();
    }
    // -> inicio funcion scrape
    async scrape() {
        console.log(" - - - - - Inicio de ScraperYuhmak.scrape - - - - - ")

        let items = await this.skuServices.getSkuAtive();
        const product = {};

        try {
            for (let item of items) {
                let { listPrice: older_price } = await this.getPrice.get_price(item.sku_id);
                let { basePrice: current_price } = await this.getPrice.get_price(item.sku_id);
                const { Images } = await this.getContext.get_context(item.sku_id);
                let image_url = Images?.[0]?.ImageUrl || "";
                // let { ImageUrl: image_url } = await this.getContext.get_context(item.sku_id);
                let { DetailUrl: seller_item_url } = await this.getContext.get_context(item.sku_id);

                Object.assign(product, {
                    product_id: item.product_id,
                    sku_id: item.id,
                    seller_id: 1,
                    seller_item_url: `https://www.yuhmak.com${seller_item_url}`,
                    older_price: `$ ${new Intl.NumberFormat('es-AR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }).format(older_price)}`,
                    current_price: `$ ${new Intl.NumberFormat('es-AR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }).format(current_price)}`,
                    off_percent: `${Math.round(((older_price - current_price) / older_price) * 100)} %`,
                    payment_rules: item.commercial_condition,
                    shipping_data: "",
                    image_url: image_url,
                    product_url: item.detail_url,
                    active: item.is_active,
                })
                // ->
                await this.scrapingServices.createOrUpdateScraping(product);
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