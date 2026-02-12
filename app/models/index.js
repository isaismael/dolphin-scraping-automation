const sequelize = require('../config/database.config');
const Seller = require('./seller.model');
const Category = require('./category.model');
const Sku = require('./sku.model');
const Scraping = require('./scraping.model')

Scraping.belongsTo(Sku, {
    foreignKey: 'product_id',
    targetKey: 'id',
    as: 'product'
});
Sku.hasMany(Scraping, {
    foreignKey: 'product_id',
    as: 'product'
});


Scraping.belongsTo(Seller, {
    foreignKey: 'seller_id',
    targetKey: 'id',
    as: 'seller'
});
Seller.hasMany(Scraping, {
    foreignKey: 'seller_id',
    as: 'seller'
});


Sku.belongsTo(Category, {
    foreignKey: 'subcategory',
    targetKey: 'category_id_vtex',
    as: 'subcategoryCategory'
});

Category.hasMany(Sku, {
    foreignKey: 'subcategory',
    targetKey: 'category_id_vtex',
    as: 'skus'
});


module.exports = {
    sequelize,
    Seller,
    Category,
    Sku,
    Scraping
}