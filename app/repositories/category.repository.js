const { Category } = require('../models/index');

class CategoryRepository{

    async categoryById(id){
        const category = await Category.findOne({
            where: {
                category_id_vtex: id
            }
        })
        return category;
    }

}

module.exports = new CategoryRepository();