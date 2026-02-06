const { chromium } = require('playwright');
const ItemsRepository = require('../../repositories/items/items.repository');
const SellerRepository = require('../../repositories/seller/seller.repository');
const TagsCastillo = require('../tags/castillo.tags');
const SafeHelpers = require('../../helpers/safe.helper');

class ScraperCastillo {
    constructor() {
        this.itemsRepository = new ItemsRepository();
        this.sellerRepository = new SellerRepository();
        this.safeHelpers = new SafeHelpers();
        this.SafeWait = this.safeHelpers.SafeWait;
        this.safeClick = this.safeHelpers.safeClick;
    }

    async scrape() {
        console.log(" - - - - - Inicio de ScraperCastillo.scrape - - - - - ");

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
                    await page.goto(TagsCastillo["url"]);
                    await page.waitForSelector('body', { timeout: 2000 });
                    await page.waitForTimeout(2000);
                    // ->
                    if (await this.SafeWait(page, TagsCastillo["modal_bienvenidos"], 2000)) {
                        await this.safeClick(page, TagsCastillo["modal_bienvenido_btn"], 2000);
                    }
                    // ->
                    if (await this.SafeWait(page, TagsCastillo["modal_notification"], 2000)) {
                        await this.safeClick(page, TagsCastillo["btn_modal_no"], 2000);
                    }
                    // ->
                    await page.click(TagsCastillo["btn_area_code"]);
                    await page.fill(TagsCastillo["input_area_code"], "4000");
                    await page.click(TagsCastillo["submit_area_code"]);
                    await page.waitForTimeout(2000);
                    // ->
                    await page.fill(TagsCastillo["input_search"], item_for_search);
                    await page.waitForTimeout(2000);
                    await page.click(TagsCastillo["btn_search"]);
                    await page.waitForTimeout(5000);
                    // ->
                    if (await this.SafeWait(page, TagsCastillo["modal_newletter_btn"], 2000)) {
                        await this.safeClick(page, TagsCastillo["modal_newletter_btn"], 2000);
                    }
                    // ->
                    if (await this.SafeWait(page, TagsCastillo["card_item"])) {
                        await this.safeClick(page, TagsCastillo["card_item"], 2000);
                    }
                    // ->
                    await page.waitForTimeout(2000);
                    // ->
                    let seller_item_url = await page.url();
                    let older_price = await page.$eval(TagsCastillo["older_price"], el => el.innerText).catch(() => null);
                    let current_price = await page.$eval(TagsCastillo["current_price"], el => el.innerText).catch(() => null);
                    let off_percent = await page.$eval(TagsCastillo["off_percent"], el => el.innerText).catch(() => null);
                    let payment_rules = await page.$eval(TagsCastillo["payment_rules"], el => el.innerText).catch(() => null);
                    let image_url = await page.$eval(TagsCastillo["image_url"], el => el.src).catch(() => null);
                    // ->   
                    if (await this.SafeWait(page, TagsCastillo["shipping_btn"], 2000)) {
                        await this.safeClick(page, TagsCastillo["shipping_btn"], 2000);
                        await page.waitForTimeout(2000);
                        await page.fill(TagsCastillo["shipping_input"], "4000");
                        await page.waitForTimeout(2000);
                        await page.click(TagsCastillo["shipping_calcular"]);
                        await page.waitForTimeout(2000);
                    }

                    let shipping_data = await page.$eval(
                        `${TagsCastillo["shipping_data"]} li:first-child`,
                        el => el.innerText.trim()
                    ).catch(() => null);


                    Object.assign(product, {
                        item_id: item.id,
                        seller_id: TagsCastillo["seller_id"],
                        seller_item_url: seller_item_url,
                        older_price: older_price,
                        current_price: current_price,
                        off_percent: off_percent,
                        payment_rules: payment_rules,
                        shipping_data: shipping_data,
                        image_url: image_url,
                        active: item.is_active,
                    })

                    await this.sellerRepository.upsert_product(product);

                } catch (error) {
                    console.error(`Error con item ${item_for_search}:`, error.message);
                }
            }
        } catch (error) {

        }
        finally {
            await browser.close();
        }
        console.log(" - - - - - Fin de ScraperCastillo.scrape - - - - - ")
    }
}

module.exports = ScraperCastillo;