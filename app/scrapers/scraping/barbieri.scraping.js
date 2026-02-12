const { chromium } = require('playwright');
const CategoryRepository = require('../../repositories/category.repository')
const SkuServices = require('../../services/sku.services');
const Sellerservices = require('../../services/seller.services');
const ScrapingServices = require('../../services/scraping.services');

const TagsBarbieri = require('../tags/barbieri.tags');

class ScraperBarbieri {
    constructor() {
        this.sellerservices = Sellerservices;
        this.skuServices = SkuServices;
        this.scrapingServices = ScrapingServices;
        this.categoryRepository = CategoryRepository;
    }

    async scrape() {
        console.log(" - - - - - Inicio de ScraperBarbieri.scrape - - - - - ");

        const items = await this.skuServices.getSkuAtive();
        const browser = await chromium.launch({ headless: true });
        const context = await browser.newContext();
        const page = await context.newPage();
        const product = {};

        try {
            for (let item of items) {
                const category = await this.categoryRepository.categoryById(item.subcategory);
                const item_for_search = `${category.name} ${item.brand_name} ${item.supplier_code}`;
                try {
                    // ->
                    await page.goto(TagsBarbieri["url"]);
                    await page.waitForSelector('body', { timeout: 3000 });
                    // ->
                    await page.fill(TagsBarbieri["search-input"], item_for_search);
                    await page.click(TagsBarbieri["search-button"]);
                    await page.waitForTimeout(2000);
                    // ->
                    let item_card = await page.$$(TagsBarbieri["item-card"]);
                    if (item_card) {

                        await page.click(TagsBarbieri["item-card"]);
                        await page.waitForTimeout(3000);
                        await page.waitForTimeout(2000);
                        // ->
                        let seller_item_url = await page.url();
                        let older_price = await page.$eval(TagsBarbieri["older_price"], el => el.innerText.trim()).catch(() => null);
                        let current_price = await page.$eval(TagsBarbieri["current_price"], el => el.innerText).catch(() => null);
                        let off_percent = await page.$eval(TagsBarbieri["off_percent"], el => el.innerText).catch(() => null);
                        let payment_rules = await page.$eval(TagsBarbieri["payment_rules"], el => el.innerText).catch(() => null);
                        // =>
                        await page.evaluate(() => {
                            window.scrollBy({
                                top: 400,
                                behavior: "smooth"
                            });
                        });

                        // btn -> collap para cargar input
                        const btn = page.locator(TagsBarbieri["btn_shipping"]);
                        try {
                            await btn.waitFor({ state: 'visible', timeout: 2000 });
                            console.log("Botón visible, presionando...");
                            await btn.click();
                        } catch (e) {
                            console.log("Botón envío NO visible, continúa el flujo.");
                        }

                        // =>
                        const input = page.locator(TagsBarbieri["input_shipping"]);
                        try {
                            await input.waitFor({ state: 'visible', timeout: 2000 });
                            console.log("Input visible, llenando...");
                            await input.fill("4000");
                        } catch (error) {
                            console.log("Input codigo postal No visble, continúa el flujo.")
                        }
                        // ->
                        const calcular_envio = page.locator(TagsBarbieri["calcular-envio"]);
                        try {
                            await calcular_envio.waitFor({ state: 'visible', timeout: 2000 });
                            console.log("Botón visible, presionando...");
                            await calcular_envio.click();
                        } catch (error) {
                            console.log("Botón calcular_envio No visible, continúa el flujo.")
                        }
                        // =>
                        let shipping_data = await page.$eval(TagsBarbieri["shipping_data"], el => el.innerText).catch(() => null);
                        let image_url = await page.$eval(TagsBarbieri["image_url"], el => el.src).catch(() => null);

                        // => objeto final
                        Object.assign(product, {
                            product_id: item.product_id,
                            sku_id: item.id,
                            seller_id: TagsBarbieri["seller_id"],
                            seller_item_url: seller_item_url,
                            older_price: older_price,
                            current_price: current_price,
                            off_percent: off_percent,
                            payment_rules: payment_rules,
                            shipping_data: shipping_data,
                            image_url: image_url,
                            product_url: page.url(),
                            active: item.is_active,
                        });

                        await this.scrapingServices.createOrUpdateScraping(product);
                    }
                    else {
                        console.log(`${item_for_search}: No hay match...`);
                    }
                } catch (error) {
                    console.error(error.message);
                }
            }
        } catch (error) {
            console.error(error.messsage);
        }
        finally {
            await browser.close();
        }
        console.log(" - - - - - Fin de ScraperBarbieri.scrape - - - - - ");
    }
}

module.exports = ScraperBarbieri;