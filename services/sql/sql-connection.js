require('dotenv').config();
const {SQL_SERVER, SQL_DB, SQL_USERNAME, SQL_PASSWORD} = process.env;
const sql = require('mssql');


let myconfig = {
    server: SQL_SERVER,  
    port: 1433,
    user: SQL_USERNAME, 
    password: SQL_PASSWORD,  
    database: SQL_DB,
    options: {
        trustServerCertificate: true
    }
};

let connection = null;

const connect = async (config = myconfig) => {
    connection = await sql.connect(config);
    console.log({ connection });
}

const disconnect = () => {
    connection.close();
}

const getConnection = () => connection;

module.exports = { connect, disconnect, getConnection };