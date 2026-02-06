const { DataTypes } = require('@sequelize/core');
const Database = require('../db');

class SellersModel {
    constructor() {
        this.db = new Database();
        this.sequelize = this.db.sequelize;
        // ->
        this.Sellers = this.sequelize.define('scraping_sellers', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
            },
            scraping_url: {
                type: DataTypes.STRING,
            },
            active: {
                type: DataTypes.TINYINT,
            },
        },
            {
                tableName: 'scraping_sellers',
                timestamps: false,
                freezeTableName: true
            })
    }
}

module.exports = SellersModel;