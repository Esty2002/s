const sql = require('mssql')
require('dotenv').config()

const { SQL_USER, SQL_PORT, SQL_DB, SQL_PASSWORD, SQL_SERVER } = process.env

let myconfig = {
    server: "TB6-21\\MSSQLSERVER",  //update me
    port: SQL_PORT,
    user: SQL_USER, //update me
    password: SQL_PASSWORD,  //update me
    database: SQL_DB,
    options: {
        trustServerCertificate: true
    }
};

let connection = null

const sconnect = async (config = myconfig) => {
    connection = await sql.connect(config)
    console.log({ connection })
}

const disconnect = () => {
    connection.close()
}
const getConnection = () => connection
module.exports = { sconnect, disconnect, getConnection }