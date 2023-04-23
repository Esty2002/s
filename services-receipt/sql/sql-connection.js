require('dotenv').config();
const { SQL_SERVER, SQL_DBNAME, SQL_USERNAME, SQL_PASSWORD, SQL_PORT } = process.env;
const sql = require('mssql');

let myconfig = {
    server: SQL_SERVER,
    port: SQL_PORT,
    user: SQL_USERNAME,
    password: SQL_PASSWORD,
    database: SQL_DBNAME,
    options: {
        trustServerCertificate: true
    }
};

let connection = null;

const connect = async (config = myconfig) => {
    connection = await sql.connect(config);
};

const disconnect = () => {
    connection.close();
};

const getConnection = () => connection;

module.exports = { connect, disconnect, getConnection };
