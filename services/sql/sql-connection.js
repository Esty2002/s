require('dotenv').config();

const sql = require('mssql');

const {SQL_SERVER, SQL_PORT, SQL_USERNAME, SQL_PASSWORD, SQL_DATABASE } = process.env;

let theConfig = {
    server: "TB6-09\\MSSQLSERVER",
    port: SQL_PORT,
    user: SQL_USERNAME,
    password: SQL_PASSWORD,
    database: SQL_DATABASE,
    options: {
        trustServerCertificate: true
    }
};

let connection = null;

const connect = async (config = theConfig) => {
    connection = await sql.connect(config);
    // console.log("connect??: ", { connection });
}

const disconnect = () => {
    connection.close();
}

const getConnection = () => connection;

module.exports = { connect, disconnect, getConnection };
