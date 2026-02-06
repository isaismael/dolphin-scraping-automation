const { DataTypes } = require('@sequelize/core');
const Database = require('../db');

class ItemsModel {
    constructor() {
        this.db = new Database();
        this.sequelize = this.db.sequelize;
        // ->
        this.Items = this.sequelize.define('scraping_items', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            product_id: {
                type: DataTypes.INTEGER,
            },
            product_name: {
                type: DataTypes.STRING,
            },
            sku_id: {
                type: DataTypes.INTEGER,
            },
            category_name: {
                type: DataTypes.STRING,
            },
            brand_name: {
                type: DataTypes.STRING,
            },
            link_id: {
                type: DataTypes.STRING,
            },
            ref_id: {
                type: DataTypes.STRING,
            },
            is_active: {
                type: DataTypes.TINYINT,
            },
            commercial_condition_name: {
                type: DataTypes.STRING,
            },
            supplier_id: {
                type: DataTypes.INTEGER,
            }
        },
            {
                tableName: 'scraping_items',
                timestamps: false,
                freezeTableName: true
            });
    }
}

module.exports = ItemsModel;