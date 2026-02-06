const { chromium } = require('playwright');
const ItemsRepository = require('../../repositories/items/items.repository');
const SellerRepository = require('../../repositories/seller/seller.repository');
const Tagsfravega = require('../tags/fravega.tags');

class ScraperFravega {
    constructor() {
        this.itemsRepository = new ItemsRepository();
        this.sellerRepository = new SellerRepository();
    }

    async scrape() {
        console.log(" - - - - - Inicio de ScraperFravega.scrape - - - - - ");

        const items = await this.itemsRepository.get_active_items();
        const browser = await chromium.launch({ headless: true });
        const context = await browser.newContext();
        const page = await context.newPage();
        const product = {};

        try {
            for (let item of items) {
                const item_for_search = `${item.category_name} ${item.brand_name} ${item.supplier_id}`;
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
                            item_id: item.id,
                            seller_id: Tagsfravega["seller_id"],
                            seller_item_url: seller_item_url,
                            older_price: older_price,
                            current_price: current_price,
                            off_percent: off_percent,
                            payment_rules: payment_rules,
                            shipping_data: shipping_data,
                            image_url: image_url,
                            active: item.is_active,
                        })
                        // ->
                        await this.sellerRepository.upsert_product(product);
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
