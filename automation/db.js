const { Sequelize } = require('@sequelize/core');
const { MySqlDialect } = require('@sequelize/mysql');
const dotenv = require('dotenv');

dotenv.config();

class Database {
    constructor() {
        this.sequelize = new Sequelize({
            dialect: MySqlDialect,
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: 3306,
        });
    }

    async connect() {
        try {
            await this.sequelize.authenticate();
            console.log('Conexión a la base de datos establecida correctamente.');
        } catch (error) {
            console.error('No se pudo conectar a la base de datos:', error);
        }
    }
}

module.exports = Database;