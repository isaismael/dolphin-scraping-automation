const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database.config');

class Sku extends Model { }

Sku.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sku_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true
    },
    name_complete: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    product_ref_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    tax_code: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    sku_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 1,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    detail_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    brand_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    commercial_condition: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    levanta_url: {
        type: DataTypes.TINYINT,
        allowNull: true,
    },
    department: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },

    category: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },

    subcategory: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },
    supplier_code: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'Sku',
    tableName: 'dolphin_skus',
    timestamps: true,
})

module.exports = Sku;