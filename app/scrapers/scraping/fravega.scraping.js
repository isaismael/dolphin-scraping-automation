const { chromium } = require('playwright');
const CategoryRepository = require('../../repositories/category.repository')
const SkuServices = require('../../services/sku.services');
const Sellerservices = require('../../services/seller.services');
const ScrapingServices = require('../../services/scraping.services')
const Tagsfravega = require('../tags/fravega.tags');

class ScraperFravega {
    constructor() {
        this.sellerservices = Sellerservices;
        this.skuServices = SkuServices;
        this.scrapingServices = ScrapingServices;
        this.categoryRepository = CategoryRepository;
    }

    async scrape() {
        console.log(" - - - - - Inicio de ScraperFravega.scrape - - - - - ");

        const items = await this.skuServices.getSkuAtive();
        const browser = await chromium.launch({ headless: true });
        const context = await browser.newContext();
        const page = await context.newPage();
        const product = {};

        try {
            for (let item of items) {
                // ->
                const category = await this.categoryRepository.categoryById(item.subcategory);
                const item_for_search = `${category.name} ${item.brand_name} ${item.supplier_code}`;
                // ->
                try {
                    // ->
                    await page.goto(Tagsfravega["url"]);
                    await page.waitForSelector('body', { timeout: 3000 });
                    // ->
                    await page.click(Tagsfravega["btn_area_code"]);
                    await page.fill(Tagsfravega["input_area_code"], "4000");
                    await page.click(Tagsfravega["submit_area_code"]);
                    await page.waitForSelector(Tagsfravega["btn_area_code"], { timeout: 3000 });
                    await page.waitForTimeout(2000);
                    // ->
                    await page.fill(Tagsfravega["input_search"], item_for_search);
                    await page.waitForTimeout(2000);
                    await page.click(Tagsfravega["btn_search"]);
                    await page.waitForTimeout(2000);
                    // ->
                    let card_item = await page.$(Tagsfravega["card_item"]);
                    if (card_item) {
                        console.log(`${item_for_search}: Hay match!`);
                        await page.waitForTimeout(2000);
                        await page.click(Tagsfravega["card_item"]);
                        await page.waitForTimeout(2000);
                        // ->
                        let seller_item_url = await page.url();
                        let older_price = await page.$eval(Tagsfravega["older_price"], el => el.innerText).catch(() => null);
                        let current_price = await page.$eval(Tagsfravega["current_price"], el => el.innerText).catch(() => null);
                        let off_percent = await page.$eval(Tagsfravega["off_percent"], el => el.innerText).catch(() => null);
                        let payment_rules = await page.$eval(Tagsfravega["payment_rules"], el => el.innerText).catch(() => null);
                        let shipping_data = await page.$eval(Tagsfravega["shipping_data"], el => el.innerText).catch(() => null);
                        let image_url = await page.$eval(Tagsfravega["image_url"], el => el.src).catch(() => null);
                        // ->
                        Object.assign(product, {
                            product_id: item.product_id,
                            sku_id: item.id,
                            seller_id: Tagsfravega["seller_id"],
                            seller_item_url: seller_item_url,
                            older_price: older_price,
                            current_price: current_price,
                            off_percent: off_percent,
                            payment_rules: payment_rules,
                            shipping_data: shipping_data,
                            image_url: image_url,
                            product_url: page.url(),
                            active: item.is_active,
                        })
                        // ->
                        await this.scrapingServices.createOrUpdateScraping(product);
                    }
                    else {
                        console.log(`${item_for_search}: No hay match...`);
                    }

                } catch (error) {
                    console.error(`Error con item ${item_for_search}:`, error.message);
                }
            }
        }
        finally {
            await browser.close();
        }
        console.log(" - - - - - Fin de ScraperFravega.scrape - - - - - ");
    }
}

module.exports = ScraperFravega;
