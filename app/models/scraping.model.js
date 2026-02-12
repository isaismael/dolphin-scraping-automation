const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database.config');

class Scraping extends Model { }

Scraping.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    sku_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    seller_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    older_price: {
        type: DataTypes.STRING,
        allowNull: true
    },
    current_price: {
        type: DataTypes.STRING,
        allowNull: true
    },
    off_percent: {
        type: DataTypes.STRING,
        allowNull: true
    },
    payment_rules: {
        type: DataTypes.STRING,
        allowNull: true
    },
    shipping_data: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    product_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 1,
    },
    edited: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0,
    }
}, {
    sequelize,
    modelName: 'Scraping',
    tableName: 'dolphin_scraping',
    timestamps: true,
})

module.exports = Scraping;