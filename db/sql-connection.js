require('dotenv').config();
const sql = require('mssql')
const { SQL_SERVER, SQL_SERVER_DATABASE, SQL_USERNAME, SQL_PASSWORD, SQL_PORT } = process.env;

// let myconfig = {
//     server: SQL_SERVER,
//     port: SQL_PORT,
//     user:SQL_USERNAME,
//     password: SQL_PASSWORD,
//     database: SQL_SERVER_DATABASE,
//     options: {
//         trustServerCertificate: true
//     }
// }

let myconfig={
    server:'TB1-16\\NEW_SQL',
    // server:'TB1-19\\NEW_SQL',

    port:1433,
    user:"project",
    password:"1234",
    database:"Buyton",
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


