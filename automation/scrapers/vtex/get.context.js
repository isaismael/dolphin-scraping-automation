const VtexAuth = require('../../auth/vtex.auth');
const axios = require('axios');

class GetContext {
    constructor() {
        this.vtexAuth = new VtexAuth();
        this.headers = this.vtexAuth.getVtexAuth();
        this.endpoint = "https://yuhmak.vtexcommercestable.com.br/api/catalog_system/pvt/sku/stockkeepingunitbyid/"
    }
    
    async get_context(sku_id){
        try {
            const response = await axios.get(`${this.endpoint}${sku_id}`, { headers: this.headers });
            return response.data;
        } catch (error) {
            console.error("Error en get_context: ", error.message);
        }
    }
}

module.exports = GetContext;