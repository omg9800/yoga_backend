require('dotenv').config()

let username=process.env.SQL_USERNAME
let password=process.env.SQL_PASSWORD
let sql_host=process.env.SQL_HOST
let port=process.env.SQL_PORT
let db_name=process.env.SQL_DB_NAME

console.log(username,password,sql_host,port,db_name
    );


const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(db_name, username, password, {
    host: sql_host,
    dialect: 'mysql',
    port:port
});

module.exports = sequelize;
global.sequelize=sequelize;