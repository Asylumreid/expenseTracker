require('dotenv').config();

const config = {
    devOrProd: process.env.NODE_ENV,
    uri: process.env.MYSQL_URI,
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
    db_name: process.env.DB_NAME,
    db_port: process.env.DB_PORT,
    db_dialect: process.env.DB_DIALECT,
    db_host: process.env.DB_HOST,
    passSecret: process.env.passSecret,
    passSalt: process.env.passSalt,
};


module.exports = config;