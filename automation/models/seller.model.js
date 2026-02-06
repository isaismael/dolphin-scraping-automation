const { DataTypes } = require('@sequelize/core');
const Database = require('../db');

class SellerModel {
    constructor() {
        this.db = new Database();
        this.sequelize = this.db.sequelize;
        // ->
        this.Sellers = this.sequelize.define('scraping_scraped', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            item_id: {
                type: DataTypes.INTEGER,
            },
            seller_id: {
                type: DataTypes.INTEGER,
            },
            older_price: {
                type: DataTypes.STRING,
            },
            current_price: {
                type: DataTypes.STRING,
            },
            off_percent: {
                type: DataTypes.STRING,
            },
            payment_rules: {
                type: DataTypes.STRING,
            },
            shipping_data: {
                type: DataTypes.STRING,
            },
            image_url: {
                type: DataTypes.STRING,
            },
            seller_item_url: {
                type: DataTypes.STRING,
            },
            active: {
                type: DataTypes.TINYINT,
            },
            created_at: {
                type: DataTypes.DATE,
            },
            updated_at: {
                type: DataTypes.DATE,
            }
        },
            {
                tableName: 'scraping_scraped',
                timestamps: false,
                freezeTableName: true,
                indexes: [
                    {
                        unique: true,
                        fields: ['item_id', 'seller_id']
                    }
                ]
            })
    }
}

module.exports = SellerModel;