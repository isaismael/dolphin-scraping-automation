const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database.config');

class Category extends Model {}

Category.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category_id_vtex: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_active: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
    },
}, {
    sequelize,
    modelName: 'Category',
    tableName: 'dolphin_categories',
    timestamps: false,
})


module.exports = Category;