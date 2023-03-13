const sql = require('mssql');
const {SQL_SERVER,SQL_PORT, SQL_SERVER_DATABASE, SQL_PASSWORD, SQL_USERNAME } = process.env;

let myconfig={
    server:SQL_SERVER,
    port:SQL_PORT,
    user:SQL_USERNAME,
    password:SQL_PASSWORD,
    database:SQL_SERVER_DATABASE,
    options:{
        trustServerCertificate:true
    }
}
let connection = null;

const connect = async (config=myconfig) => {
    connection = await sql.connect(config);
    // console.log({ connection });
}

const disconnect = async() => {
    await connection.close();
}

const getConnection = () => connection;

module.exports = { connect, disconnect, getConnection };


