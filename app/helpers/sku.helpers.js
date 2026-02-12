const SkuServices = require('../services/sku.services');

class SkuHelpers {
    constructor() {
        this.skuServices = SkuServices;
    }


}

module.exports = new SkuHelpers();