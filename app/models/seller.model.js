const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database.config');

class Seller extends Model { }

Seller.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    seller_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    active: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
    }
}, {
    sequelize,
    modelName: 'Seller',
    tableName: 'dolphin_sellers',
    timestamps: true,
})

module.exports = Seller;