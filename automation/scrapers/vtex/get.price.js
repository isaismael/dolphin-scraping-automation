const VtexAuth = require('../../auth/vtex.auth');
const axios = require('axios');

class GetPrice {
    constructor() {
        this.vtexAuth = new VtexAuth();
        this.headers = this.vtexAuth.getVtexAuth();
        this.endpoint = "https://api.vtex.com/yuhmak/pricing/prices/"
    }

    async get_price(sku_id) {
        try {
            const response = await axios.get(`${this.endpoint}${sku_id}`, { headers: this.headers });
            return response.data;
        } catch (error) {
            console.error("Error en get_price: ", error.message);
        }
    }

}

module.exports = GetPrice;