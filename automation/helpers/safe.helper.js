class SafeHelpers{
        async SafeWait(page, selector, timeout = 3000){
        try {
            await page.waitForSelector(selector, { timeout: timeout });
            return true;
        } catch (error) {
            return false;
        }
    }

    async safeClick(page, selector, timeout = 3000){
        try {
            await page.waitForSelector(selector, { timeout: timeout });
            await page.click(selector);
            return true;
        } catch (error) {
            return false
        }
    }
}

module.exports = SafeHelpers;